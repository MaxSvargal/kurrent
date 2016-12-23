import { fork, call, take, put } from 'redux-saga/effects'
import WebTorrentClient from 'services/torrent'

import { setPeersNum } from 'actions/topics'
import { errorMessage } from 'actions/utils'
import { GET_PEERS_NUM } from 'actions/types'

const client = new WebTorrentClient()

export function* watchRequestPeersNum() {
  while (true) {
    try {
      const { key, magnet } = yield take(GET_PEERS_NUM)
      const peersNum = yield call(client.lookupPeers, magnet)
      yield put(setPeersNum(key, peersNum))
    } catch (err) {
      yield put(errorMessage(err, GET_PEERS_NUM))
    }
  }
}

export default function* torrent() {
  yield [
    fork(watchRequestPeersNum)
  ]
}
