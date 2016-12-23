// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import TopicPage from './containers/TopicPage'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='/topic/:id' component={ TopicPage } />
  </Route>
)
