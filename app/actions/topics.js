import { action } from 'actions/utils'
import * as actions from 'actions/types'

export const setTopics = topics => action(actions.SET_TOPICS, { payload: topics })
export const search = value => action(actions.DO_SEARCH, { value })
export const setSearchResult = ids => action(actions.SET_SEARCH_RESULT, { payload: ids })
export const createTopic = (key, value) => action(actions.CREATE_TOPIC, { key, value })
