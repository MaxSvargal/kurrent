import { connect } from 'react-redux'
import { downloadMagnet } from 'actions'
import Topic from 'components/Topic'

export default connect(
  ({ topics: { entities } }, { params: { id } }) => ({ topic: entities[id], id }),
  { downloadMagnet }
)(Topic)
