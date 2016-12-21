import { fork } from 'redux-saga/effects'

import dht from './dht'

export default function* root() {
  yield [
    fork(dht)
  ]
}
