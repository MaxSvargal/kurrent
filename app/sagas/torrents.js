import { fork, call, put, take } from 'redux-saga/effects'
import { createTorrent, parseTorrent, createMagnet } from 'services/torrent'

import { putTopic } from 'actions/topics'
import { errorMessage } from 'actions/utils'
import { CREATE_TOPIC } from 'actions/types'

export function* getTorrentProps(inputFiles, name) {
  const torrent = yield createTorrent(inputFiles, name)
  const parsed = parseTorrent(torrent)
  const { infoHash, files, length } = parsed
  const magnet = createMagnet(infoHash, name)
  const created = parsed.created.getTime()
  const key = infoHash

  return { key, magnet, length, files, created }
}

export function* create() {
  while (true) {
    try {
      const { props } = yield take(CREATE_TOPIC)
      const { body, keywords, name, tags, files } = props

      const torrentProps = yield call(getTorrentProps, files, name)
      const topic = { ...torrentProps, name, body, keywords, tags }

      yield put(putTopic(torrentProps.key, topic))
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
