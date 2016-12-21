import { combineReducers } from 'redux'
import { SET_SEARCH_META, SET_TOPICS, SET_SEARCH_RESULT } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const searchMeta = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_SEARCH_META ? payload : state

export const topics = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_TOPICS ? payload : state

export const finded = (state = [], { type, payload }: reducerArgs) =>
  type === SET_SEARCH_RESULT ? payload : state

export default combineReducers({ searchMeta, topics, finded })
