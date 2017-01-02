import create from 'create-torrent'
import parse from 'parse-torrent'

export const createTorrent = (files, name) =>
  new Promise((resolve, reject) =>
    create(files, { name, createdBy: 'kurrent' }, (err, torrent) =>
      err ? reject(err) : resolve(torrent)))

export const parseTorrent = torrent => parse(torrent)
export const createMagnet = (infoHash, name) => parse.toMagnetURI({ infoHash, dn: name })
