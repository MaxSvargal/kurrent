// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import topics from './topics'
import torrents from './torrents'
import errors from './errors'

const rootReducer = combineReducers({
  routing,
  topics,
  torrents,
  errors
})

export default rootReducer
