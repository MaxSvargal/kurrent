// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import TopicPage from './containers/TopicPage'
import NewTopicPage from './containers/NewTopicPage'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='/topics/new' component={ NewTopicPage } />
    <Route path='/topics/:id' component={ TopicPage } />
  </Route>
)
