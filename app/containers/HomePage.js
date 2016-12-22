import { connect } from 'react-redux'
import { search, createTopic } from 'actions/topics'
import Home from 'components/Home'

export default connect(
  ({ topics: { topics, finded } }) => ({ topics, finded }),
  { search, createTopic }
)(Home)
