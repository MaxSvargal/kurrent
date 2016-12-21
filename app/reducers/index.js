// @flow
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import topics from './topics'

const rootReducer = combineReducers({
  routing,
  topics
})

export default rootReducer
