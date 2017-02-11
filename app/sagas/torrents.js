import { fork, call, put, take } from 'redux-saga/effects'
import { seed, add, onTorrentAdd, onTorrentError } from 'services/torrents'

import { addTopic } from 'actions/topics'
import { addTorrent } from 'actions/torrents'
import { errorMessage } from 'actions/utils'
import { CREATE_TOPIC, DOWNLOAD_MAGNET } from 'actions/types'

const filterFilesProps = files =>
  files.map(({ length, name, offset }) => ({ length, name, offset }))

export function* create() {
  while (true) {
    try {
      const { props } = yield take(CREATE_TOPIC)
      const { body, keywords, name, tags, files: filesList } = props

      const torrent = yield call(seed, name, filesList)
      console.log(torrent.metadata.toString('base64'))

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

export function* listenTorrentAdd() {
  try {
    const channel = yield call(onTorrentAdd)
    while (true) {
      const torrent = yield take(channel)
      yield put(addTorrent(torrent.infoHash, torrent))
    }
  } catch (err) {
    yield put(errorMessage(err, 'listenTorrentAdd'))
  }
}

export function* listenTorrentError() {
  try {
    const channel = yield call(onTorrentError)
    while (true) {
      const error = yield take(channel)
      console.log({ error })
      // yield put(addTorrent(torrent.infoHash, torrent))
    }
  } catch (err) {
    yield put(errorMessage(err, 'listenTorrentError'))
  }
}


export function* downloadMagnet() {
  while (true) {
    try {
      const { payload: { magnetURI } } = yield take(DOWNLOAD_MAGNET)
      console.log('dl', magnetURI)
      const torrent = yield call(add, magnetURI)
      console.log({ torrent })
    } catch (err) {
      yield put(errorMessage(err, 'downloadMagnet'))
    }
  }
}

export default function* torrents() {
  yield [
    fork(create),
    fork(listenTorrentAdd),
    fork(listenTorrentError),
    fork(downloadMagnet)
  ]
}
