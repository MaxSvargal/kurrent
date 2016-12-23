import { fork } from 'redux-saga/effects'

import dht from './dht'
import torrent from './torrent'

export default function* root() {
  yield [
    fork(dht),
    fork(torrent)
  ]
}
