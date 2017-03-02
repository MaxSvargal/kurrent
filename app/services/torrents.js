import parse from 'parse-torrent'
import WebTorrent from 'webtorrent'
import { eventChannel } from 'redux-saga'

const client = new WebTorrent({ webSeeds: false })

export const parseTorrent = torrent => parse(torrent)
export const createMagnet = (infoHash, name) => parse.toMagnetURI({ infoHash, dn: name })

export const seed = (name, files) =>
  new Promise(resolve =>
    client.seed(files, { name, createdBy: 'kurrent' }, torrent =>
      resolve(torrent)))

export const add = torrentId =>
  new Promise(resolve =>
    client.add(torrentId, torrent =>
      resolve(torrent)))

export const onTorrentAdd = () => eventChannel(emitter => {
  client.on('torrent', emitter)
  return () => {} // no unsubscriber
})

export const onTorrentError = () => eventChannel(emitter => {
  client.on('error', emitter)
  return () => {} // no unsubscriber
})
