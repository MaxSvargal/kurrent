import { connect } from 'react-redux'
import { createTopic } from 'actions'
import NewTopic from 'components/NewTopic'

export default connect(null, { createTopic })(NewTopic)
