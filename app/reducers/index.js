// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import topics from './topics'
import torrents from './torrents'

const rootReducer = combineReducers({
  routing,
  topics,
  torrents
})

export default rootReducer
