import { action } from 'actions/utils'
import * as actions from 'actions/types'

export const addTorrent = (key, torrent) =>
  action(actions.ADD_TORRENT, { payload: { key, torrent } })

export const removeTorrent = () => {}
