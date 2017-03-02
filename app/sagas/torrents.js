import { fork, call, put, take } from 'redux-saga/effects'
import { seed, add, onTorrentAdd, onTorrentError } from 'services/torrents'
import { addTopic, createTopic, addTorrent, downloadMagnet, errorMessage } from 'actions'

const filterFilesProps = files =>
  files.map(({ length, name, offset }) => ({ length, name, offset }))

export function* create() {
  while (true) {
    try {
      const { payload } = yield take(createTopic)
      const { body, keywords, name, tags, files: filesList } = payload

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
      yield put(errorMessage(err, createTopic.getType()))
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


export function* downloadMagnetSaga() {
  while (true) {
    try {
      const { payload: { magnetURI } } = yield take(downloadMagnet)
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
    fork(downloadMagnetSaga)
  ]
}
