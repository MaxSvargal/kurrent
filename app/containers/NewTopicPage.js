import { connect } from 'react-redux'
import { createTopic } from 'actions/topics'
import NewTopic from 'components/NewTopic'

export default connect(null, { createTopic })(NewTopic)
