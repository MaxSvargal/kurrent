import { action } from 'actions/utils'
import { SET_SEARCH_META, SET_TOPICS, DO_SEARCH, SET_SEARCH_RESULT } from 'actions/types'

export const setSearchMeta = meta => action(SET_SEARCH_META, { payload: meta })
export const setTopics = topics => action(SET_TOPICS, { payload: topics })
export const search = value => action(DO_SEARCH, { value })
export const setSearchResult = ids => action(SET_SEARCH_RESULT, { payload: ids })
