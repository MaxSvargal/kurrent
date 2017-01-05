import { fork, call, put, take } from 'redux-saga/effects'
import { seedTorrent } from 'services/torrent'

import { addTopic } from 'actions/topics'
import { addTorrent } from 'actions/torrents'
import { errorMessage } from 'actions/utils'
import { CREATE_TOPIC } from 'actions/types'

const filterFilesProps = files =>
  files.map(({ length, name, offset }) => ({ length, name, offset }))

export function* create() {
  while (true) {
    try {
      const { props } = yield take(CREATE_TOPIC)
      const { body, keywords, name, tags, files: filesList } = props

      const torrent = yield call(seedTorrent, name, filesList)
      const { length, magnetURI, infoHash: key, files: filesTorrent } = torrent
      const files = filterFilesProps(filesTorrent)

      const topic = { body, keywords, name, tags, key, length, magnetURI, files }

      yield put(addTopic(key, topic))
      yield put(addTorrent(key, torrent))
    } catch (err) {
      yield put(errorMessage(err, CREATE_TOPIC))
    }
  }
}

export default function* torrents() {
  yield [
    fork(create)
  ]
}
