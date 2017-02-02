import { fork, call, put, take, select, throttle } from 'redux-saga/effects'

import Kad from 'services/kad'
import TorrentDHT from 'services/dht'
import { compress, decompress } from 'services/zlib'
import { selectSearchIndex, getMissedTopics } from 'sagas/selectors'

import { errorMessage } from 'actions/utils'
import { addTopic, setSearchIndex, setSearchResult, setPeersNum } from 'actions/topics'
import { SET_SEARCH_INDEX, SET_TOPIC, DO_SEARCH, ADD_TOPIC, ERROR_MESSAGE } from 'actions/types'

import bootstrapList from 'bootstrap.json'

const params = { address: '127.0.0.1', port: 1333 }
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

export function* getTopicsFromIndex(searchIndex) {
  /* eslint guard-for-in: 0 */
  /* eslint no-restricted-syntax: 0 */
  for (const key in searchIndex) yield fork(getTopic, key)
}

export function* getSearchIndex() {
  try {
    const compressed = yield call(kad.get, 'searchIndex')
    const searchIndex = yield call(decompress, compressed)
    yield put(setSearchIndex(searchIndex))
    // yield fork(getTopicsFromIndex, searchIndex)
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
    const searchRegExp = new RegExp(`(?=${value}){3,}.*$`, 'i')
    const finded = Object.keys(meta).reduce((arr, id) =>
      (meta[id].search(searchRegExp) !== -1 ? [ ...arr, id ] : arr), [])
    yield put(setSearchResult(finded))

    const missed = yield select(getMissedTopics, finded)
    for (const key in missed) yield fork(getTopic, missed[key])
  } catch (err) {
    yield put(errorMessage(err, DO_SEARCH))
  }
}

export function* connectPeer(address, port) {
  try {
    yield call(kad.connect, { address, port })
  } catch (err) {
    yield put(errorMessage(err, 'connectPeer'))
  }
}

export function* awaitPeersConnectErrors() {
  let connectErrorsNum = 0
  while (true) {
    const { errorActionType } = yield take(ERROR_MESSAGE)
    if (errorActionType === 'connectPeer') connectErrorsNum += 1
    if (connectErrorsNum >= bootstrapList.length) {
      yield put(errorMessage(true, 'allPeersConnectFailed'))
    }
  }
}


export function* initial() {
  try {
    for (const peer of bootstrapList) {
      const [ address, port ] = peer.split(':')
      yield fork(connectPeer, address, Number(port))
    }
    yield fork(awaitPeersConnectErrors)

    yield fork(getSearchIndex)
    yield fork(listenStoreChannel)
  } catch (err) {
    yield put(errorMessage(err, 'initialDHT'))
  }
}

export function* search() {
  yield throttle(600, DO_SEARCH, doSearchHandle)
}

export function* putTopicWatcher() {
  while (true) {
    const { key, topic } = yield take(ADD_TOPIC)
    const compressed = yield call(compress, topic)
    yield call(kad.put, key, compressed)
  }
}

export default function* startupSagas() {
  yield [
    fork(initial),
    fork(search),
    fork(putTopicWatcher)
  ]
}
