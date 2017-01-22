import { fork, call, put, take } from 'redux-saga/effects'
import { seed, add, onTorrentAdd } from 'services/torrents'

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

      const torrent = yield call(seed, name, filesList)

      const {
        length,
        magnetURI,
        infoHash: key,
        files: filesTorrent,
        created: createdDate
      } = torrent
      const created = createdDate.getTime()
      const files = filterFilesProps(filesTorrent)

      const topic = { created, body, keywords, name, tags, key, length, magnetURI, files }

      yield put(addTopic(key, topic))
      yield put(addTorrent(key, torrent))
    } catch (err) {
      yield put(errorMessage(err, CREATE_TOPIC))
    }
  }
}

export function* listenAddTorrent() {
  try {
    const channel = yield call(onTorrentAdd)
    while (true) {
      const torrent = yield take(channel)
      yield put(addTorrent(torrent.infoHash, torrent))
    }
  } catch (err) {
    yield put(errorMessage(err, 'listenAddTorrent'))
  }
}

export default function* torrents() {
  yield [
    fork(create),
    fork(listenAddTorrent)
  ]
}
