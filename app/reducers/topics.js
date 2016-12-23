import { combineReducers } from 'redux'
import { SET_TOPIC, SET_SEARCH_RESULT, SET_SEARCH_INDEX } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const entities = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_TOPIC ? { ...state, [payload.key]: payload.value } : state

export const ids = (state = [], { type, payload }: reducerArgs) =>
  type === SET_TOPIC ? [ ...new Set([ ...state, payload.key ]) ] : state

export const finded = (state = [], { type, payload }: reducerArgs) =>
  type === SET_SEARCH_RESULT ? payload : state

export const searchIndex = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_SEARCH_INDEX ? payload : state

export default combineReducers({ entities, ids, searchIndex, finded })
