// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import TopicPage from './containers/TopicPage'
import AwaitTopicPage from './containers/AwaitTopicPage'
import NewTopicPage from './containers/NewTopicPage'
import TorrentClientPage from './containers/TorrentClientPage'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='/topics/new' component={ NewTopicPage } />
    <Route path='/topics/:id' component={ TopicPage } />
    <Route path='/await_topic/:name' component={ AwaitTopicPage } />
    <Route path='/torrents' component={ TorrentClientPage } />
  </Route>
)
