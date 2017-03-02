import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { addTopic, setSearchIndex, setSearchResult, setPeersNum } from 'actions'

export const entities = createReducer({
  [addTopic]: (state, { key, topic }) => ({ ...state, [key]: topic })
}, {})

export const ids = createReducer({
  [addTopic]: (state, { key }) => [ ...new Set([ ...state, key ]) ]
}, [])

export const finded = createReducer({
  [setSearchResult]: (state, payload) => payload
}, [])

export const searchIndex = createReducer({
  [setSearchIndex]: (state, payload) => payload,
  [addTopic]: (state, { key, topic }) => ({ ...state, [key]: topic.keywords })
}, {})

export const peersNum = createReducer({
  [setPeersNum]: (state, { key, value }) => ({ ...state, [key]: value })
}, {})

export default combineReducers({ entities, ids, searchIndex, finded, peersNum })
