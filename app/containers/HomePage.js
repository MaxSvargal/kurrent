import { connect } from 'react-redux'
import { search, createTopic } from 'actions/topics'
import Home from 'components/Home'

export default connect(
  ({ topics: { entities, ids, finded, peersNum } }) =>
    ({ entities, ids, finded, peersNum }),
  { search, createTopic }
)(Home)
