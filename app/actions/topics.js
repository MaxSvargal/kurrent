import { action } from 'actions/utils'
import * as actions from 'actions/types'

/* for reducers */
export const setTopic = (key, value) => action(actions.SET_TOPIC, { payload: { key, value } })
export const setSearchIndex = payload => action(actions.SET_SEARCH_INDEX, { payload })
export const setSearchResult = payload => action(actions.SET_SEARCH_RESULT, { payload })

/* for sagas */
export const search = value => action(actions.DO_SEARCH, { value })
export const createTopic = (key, value) => action(actions.CREATE_TOPIC, { key, value })
