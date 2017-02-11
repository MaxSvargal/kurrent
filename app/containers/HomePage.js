import { connect } from 'react-redux'
import { search } from 'actions/topics'
import Home from 'components/Home'

export default connect(
  ({
    topics: { entities, ids, finded, searchIndex, peersNum },
    errors: { allPeersConnectFailed }
  }) =>
    ({
      entities,
      ids,
      finded,
      peersNum,
      allPeersConnectFailed,
      searchIndexLen: Object.keys(searchIndex).length
    }),
  { search }
)(Home)
