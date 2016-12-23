import { connect } from 'react-redux'
import { search, createTopic } from 'actions/topics'
import Home from 'components/Home'

export default connect(
  ({ topics: { entities, ids, finded } }) => ({ entities, ids, finded }),
  { search, createTopic }
)(Home)
