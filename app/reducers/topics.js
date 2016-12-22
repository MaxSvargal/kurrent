import { combineReducers } from 'redux'
import { SET_TOPICS, SET_SEARCH_RESULT } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const topics = (state = {}, { type, payload }: reducerArgs) =>
  type === SET_TOPICS ? payload : state

export const finded = (state = [], { type, payload }: reducerArgs) =>
  type === SET_SEARCH_RESULT ? payload : state

export default combineReducers({ topics, finded })
