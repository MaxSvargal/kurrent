export const selectSearchIndex = state => state.topics.searchIndex
export const getMissedTopics = (state, ids) => ids.filter(id => !state.topics.ids.includes(id))
