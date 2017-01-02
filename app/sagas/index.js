import { fork } from 'redux-saga/effects'

import dht from './dht'
import torrents from './torrents'

export default function* root() {
  yield [
    fork(dht),
    fork(torrents)
  ]
}
