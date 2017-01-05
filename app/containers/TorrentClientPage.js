import { connect } from 'react-redux'
import TorrentClient from 'components/TorrentClient'

export default connect(
  ({ torrents: { entities, ids } }) => ({ entities, ids })
)(TorrentClient)
