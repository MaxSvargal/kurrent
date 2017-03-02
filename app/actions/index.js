import { createAction } from 'redux-act'
import * as types from 'actions/types'

export const addTopic = createAction(types.ADD_TOPIC, (key, topic) => ({ key, topic }))
export const addTorrent = createAction(types.ADD_TORRENT)
export const createTopic = createAction(types.CREATE_TOPIC)
export const downloadMagnet = createAction(types.DOWNLOAD_MAGNET)
export const errorMessage = createAction(types.ERROR_MESSAGE, (msg, type) => ({ msg, type }))
export const doSearch = createAction(types.DO_SEARCH)
export const setPeersNum = createAction(types.SET_PEERS_NUM)
export const setSearchIndex = createAction(types.SET_SEARCH_INDEX)
export const setSearchResult = createAction(types.SET_SEARCH_RESULT)
