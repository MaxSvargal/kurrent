import { connect } from 'react-redux'
import AwaitTopic from 'components/AwaitTopic'

export default connect(
  ({ topics: { entities, ids } }, { params: { name } }) =>
    ({ name, entities, id: ids.find(id => entities[id].name === name) })
)(AwaitTopic)
