import { fork, call, put, take, select } from 'redux-saga/effects'
import Kad from 'services/kad'
import { compress, decompress } from 'services/zlib'
import { getSearchMeta } from 'sagas/selectors'

import { setTopics, setSearchResult } from 'actions/topics'
import { errorMessage } from 'actions/utils'
import { SET_TOPICS, DO_SEARCH, CREATE_TOPIC } from 'actions/types'

const bootstrap = { address: '127.0.0.1', port: 1330 }
const params = { address: '127.0.0.1', port: 1333 }
const kad = new Kad(params)

export function* fetchTopics() {
  try {
    const compressed = yield call(kad.get, 'topics')
    const topics = yield call(decompress, compressed)
    yield put(setTopics(topics))
  } catch (err) {
    yield put(errorMessage(SET_TOPICS, err))
  }
}

export function* initial() {
  try {
    yield call(kad.connect, bootstrap)
    yield fork(fetchTopics)
  } catch (err) {
    yield put(errorMessage('initial', err))
  }
}

export function* search() {
  while (true) {
    try {
      const { value } = yield take(DO_SEARCH)
      const meta = yield select(getSearchMeta)
      const finded = Object.keys(meta).reduce((arr, id) =>
        (meta[id].includes(value) ? [ ...arr, id ] : arr), [])
      yield put(setSearchResult(finded))
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
