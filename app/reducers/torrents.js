import { combineReducers } from 'redux'
import { ADD_TORRENT } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const entities = (state = {}, { type, payload }: reducerArgs) =>
  type === ADD_TORRENT ? { ...state, [payload.key]: payload.torrent } : state

export const ids = (state = [], { type, payload }: reducerArgs) =>
  type === ADD_TORRENT ? [ ...new Set([ ...state, payload.key ]) ] : state

export default combineReducers({ entities, ids })
