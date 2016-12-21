import { fork, call, put, take, select } from 'redux-saga/effects'
import Kad from 'services/kad'
import { setSearchMeta, setTopics, setSearchResult } from 'actions/topics'
import { errorMessage } from 'actions/utils'
import { getSearchMeta } from 'sagas/selectors'
import { SET_SEARCH_META, SET_TOPICS, DO_SEARCH } from 'actions/types'

const bootstrap = {
  address: '127.0.0.1',
  port: 1330
}

export function* fetchMetaSearch(get) {
  try {
    const meta = yield call(get, 'metaSearch')
    yield put(setSearchMeta(meta))
  } catch (err) {
    yield put(errorMessage(SET_SEARCH_META, err))
  }
}

export function* fetchTopics(get) {
  try {
    const topics = yield call(get, 'topics')
    yield put(setTopics(topics))
  } catch (err) {
    yield put(errorMessage(SET_TOPICS, err))
  }
}

export function* initial() {
  try {
    const params = { address: '127.0.0.1', port: 1333 }
    const { connect, get } = new Kad(params)
    yield call(connect, bootstrap)
    yield [
      fork(fetchMetaSearch, get),
      fork(fetchTopics, get)
    ]
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

export default function* dht() {
  yield [
    fork(initial),
    fork(search)
  ]
}
