import { fork, call, put, take, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

import Kad from 'services/kad'
import { compress, decompress } from 'services/zlib'
import { selectSearchIndex, getMissedTopics } from 'sagas/selectors'

import { setSearchIndex, setTopic, setSearchResult } from 'actions/topics'
import { errorMessage } from 'actions/utils'
import { SET_SEARCH_INDEX, SET_TOPIC, DO_SEARCH, CREATE_TOPIC } from 'actions/types'

const bootstrap = { address: '127.0.0.1', port: 1330 }
const params = { address: '127.0.0.1', port: 1333 }
const kad = new Kad(params)

function kadReceiveStoreChannel() {
  return eventChannel(emitter => {
    const handler = resp => emitter(resp)
    kad.events.on('STORE', handler)
    return () => kad.events.removeListener('STORE', handler)
  })
}

export function* listenStoreChannel() {
  try {
    const channel = yield call(kadReceiveStoreChannel)

    while (true) {
      const { message: { params: { item } } } = yield take(channel)
      const value = yield call(decompress, item.value)
      yield put(setTopic(item.key, value))
    }
  } catch (err) {
    yield put(errorMessage('kadReceiveStoreChannel', err))
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
    yield put(errorMessage(SET_SEARCH_INDEX, err))
  }
}

export function* getTopic(key) {
  try {
    const compressed = yield call(kad.get, key)
    const topic = yield call(decompress, compressed)
    yield put(setTopic(key, topic))
  } catch (err) {
    yield put(errorMessage(SET_TOPIC, err))
  }
}

export function* initial() {
  try {
    yield call(kad.connect, bootstrap)
    yield fork(getSearchIndex)
    yield fork(listenStoreChannel)
  } catch (err) {
    yield put(errorMessage('initial', err))
  }
}

export function* search() {
  while (true) {
    try {
      const { value } = yield take(DO_SEARCH)
      const meta = yield select(selectSearchIndex)
      const finded = Object.keys(meta).reduce((arr, id) =>
        (meta[id].includes(value) ? [ ...arr, id ] : arr), [])
      yield put(setSearchResult(finded))

      const missed = yield select(getMissedTopics, finded)
      for (const key in missed) yield fork(getTopic, key)
    } catch (err) {
      yield put(errorMessage(DO_SEARCH, err))
    }
  }
}

export function* create() {
  while (true) {
    try {
      const { key, value } = yield take(CREATE_TOPIC)
      const copressed = yield call(compress, value)
      yield call(kad.put, key, copressed)
    } catch (err) {
      yield put(errorMessage(CREATE_TOPIC, err))
    }
  }
}

export default function* dht() {
  yield [
    fork(initial),
    fork(search),
    fork(create)
  ]
}
