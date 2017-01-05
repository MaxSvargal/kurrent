import parse from 'parse-torrent'
import WebTorrent from 'webtorrent'

const client = new WebTorrent({ webSeeds: false })

export const parseTorrent = torrent => parse(torrent)
export const createMagnet = (infoHash, name) => parse.toMagnetURI({ infoHash, dn: name })

export const seedTorrent = (name, files) =>
  new Promise(resolve =>
    client.seed(files, { name, createdBy: 'kurrent' }, torrent =>
      resolve(torrent)))
