import { connect } from 'react-redux'
import { search } from 'actions/topics'
import Home from 'components/Home'

export default connect(
  ({ topics: { topics, finded } }) => ({ topics, finded }),
  { search }
)(Home)
