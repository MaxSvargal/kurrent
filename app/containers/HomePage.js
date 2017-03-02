import { connect } from 'react-redux'
import { doSearch } from 'actions'
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
  { doSearch }
)(Home)
