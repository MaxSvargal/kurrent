import { combineReducers } from 'redux'
import { ADD_TORRENT } from 'actions/types'

type reducerArgs = { type: string, payload: ?{} }

export const entities = (state = {}, { type, payload }: reducerArgs) =>
  type === ADD_TORRENT ? { ...state, [payload.key]: payload.torrent } : state

export default combineReducers({ entities })
