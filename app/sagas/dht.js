import { fork, call, put, take, select, throttle } from 'redux-saga/effects'

import Kad from 'services/kad'
import TorrentDHT from 'services/dht'
import search from 'services/searcher'
import { compress, decompress } from 'services/zlib'
import { selectSearchIndex, getMissedTopics } from 'sagas/selectors'

import { errorMessage } from 'actions/utils'
import { addTopic, setSearchIndex, setSearchResult, setPeersNum } from 'actions/topics'
import { SET_SEARCH_INDEX, SET_TOPIC, DO_SEARCH, ADD_TOPIC } from 'actions/types'

import bootstrapList from 'bootstrap.json'

const params = { address: '127.0.0.1', port: 1333, stun: false }
const kad = new Kad(params)
const dht = new TorrentDHT()

export function* listenStoreChannel() {
  try {
    const channel = yield call(kad.receiveStoreChannel)

    while (true) {
      const { message: { params: { item } } } = yield take(channel)
      const value = yield call(decompress, item.value)
      yield put(addTopic(item.key, value))
    }
  } catch (err) {
    yield put(errorMessage(err, 'kadReceiveStoreChannel'))
  }
}

export function* getSearchIndex() {
  try {
    const compressed = yield call(kad.get, 'searchIndex')
    const searchIndex = yield call(decompress, compressed)
    yield put(setSearchIndex(searchIndex))
    // fetch all topics from searchIndex
    // for (const key in searchIndex) yield fork(getTopic, key)
  } catch (err) {
    yield put(errorMessage(err, SET_SEARCH_INDEX))
  }
}

export function* requestPeersNum(key, magnetURI) {
  const peersNum = yield call(dht.lookupPeers, magnetURI)
  yield put(setPeersNum(key, peersNum))
}

export function* getTopic(key) {
  try {
    const compressed = yield call(kad.get, key)
    const topic = yield call(decompress, compressed)
    yield put(addTopic(key, topic))
    yield call(requestPeersNum, key, topic.magnetURI)
  } catch (err) {
    yield put(errorMessage(err, SET_TOPIC))
  }
}

export function* doSearchHandle({ value }) {
  try {
    if (value.length < 3) return

    const meta = yield select(selectSearchIndex)
    const searchResult = search(meta, value)
    yield put(setSearchResult(searchResult))

    const missed = yield select(getMissedTopics, searchResult)
    for (const key in missed) yield fork(getTopic, missed[key])
  } catch (err) {
    yield put(errorMessage(err, DO_SEARCH))
  }
}

export function* connectPeer(address, port) {
  try {
    yield call(kad.connect, { address, port })
    yield fork(peerConnectState, true)
  } catch (err) {
    yield put(errorMessage(err, 'connectPeer'))
    yield fork(peerConnectState, false)
  }
}

let connectErrorsNum = 0
let connectedNum = 0
const peersNum = bootstrapList.length

export function* peerConnectState(state: bool) {
  if (state) connectedNum += 1
  else connectErrorsNum += 1

  if (connectErrorsNum === peersNum) {
    yield put(errorMessage(true, 'allPeersConnectFailed'))
  }

  if (connectedNum >= 1) {
    yield fork(getSearchIndex)
  }
}


export function* connectBootstrapPeers() {
  try {
    for (const peer of bootstrapList) {
      const [ address, port ] = peer.split(':')
      yield fork(connectPeer, address, Number(port))
    }
  } catch (err) {
    yield put(errorMessage(err, 'initialDHT'))
  }
}

export function* searchSaga() {
  yield throttle(600, DO_SEARCH, doSearchHandle)
}

export function* putTopicWatcher() {
  while (true) {
    try {
      const { key, topic } = yield take(ADD_TOPIC)

      // send topic
      const compressedTopic = yield call(compress, topic)
      yield call(kad.put, key, compressedTopic)

      // send search index
      const searchIndex = yield select(selectSearchIndex)
      const compressedSearchIndex = yield call(compress, searchIndex)
      yield call(kad.put, 'searchIndex', compressedSearchIndex)
    } catch (err) {
      yield put(errorMessage(err), ADD_TOPIC)
    }
  }
}

export default function* startupSagas() {
  yield [
    fork(connectBootstrapPeers),
    fork(listenStoreChannel),
    fork(searchSaga),
    fork(putTopicWatcher)
  ]
}
