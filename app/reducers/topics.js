import { combineReducers } from 'redux'
import { ADD_TOPIC, SET_SEARCH_RESULT, SET_SEARCH_INDEX, SET_PEERS_NUM } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const entities = (state = {}, { type, key, topic }) =>
  type === ADD_TOPIC ? { ...state, [key]: topic } : state

export const ids = (state = [], { type, key }: reducerArgs) =>
  type === ADD_TOPIC ? [ ...new Set([ ...state, key ]) ] : state

export const finded = (state = [], { type, payload }: reducerArgs) =>
  type === SET_SEARCH_RESULT ? payload : state

export const searchIndex = (state = {}, { type, payload, key, topic }: reducerArgs) => {
  switch (type) {
    case SET_SEARCH_INDEX: return payload
    case ADD_TOPIC: return { ...state, [key]: topic.keywords }
    default: return state
  }
}

export const peersNum = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_PEERS_NUM ? { ...state, [payload.key]: payload.peersNum } : state

export default combineReducers({ entities, ids, searchIndex, finded, peersNum })
