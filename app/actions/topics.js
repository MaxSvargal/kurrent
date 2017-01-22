import { action } from 'actions/utils'
import * as actions from 'actions/types'

/* for reducers */
export const setPeersNum = (key, peersNum) =>
  action(actions.SET_PEERS_NUM, { payload: { key, peersNum } })

export const setSearchIndex = payload =>
  action(actions.SET_SEARCH_INDEX, { payload })

export const setSearchResult = payload =>
  action(actions.SET_SEARCH_RESULT, { payload })

/* for sagas */
export const search = value =>
  action(actions.DO_SEARCH, { value })

export const createTopic = props =>
  action(actions.CREATE_TOPIC, { props })

export const addTopic = (key, topic) =>
  action(actions.ADD_TOPIC, { key, topic })
