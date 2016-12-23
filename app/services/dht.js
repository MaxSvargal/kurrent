import DHT from 'bittorrent-dht'
import magnet from 'magnet-uri'

export default class TorrentDHT {
  constructor(): {} {
    this.dht = new DHT()
    return this
  }

  lookupPeers = (uri): Promise =>
    new Promise((resolve, reject) =>
      this.dht.lookup(magnet(uri).infoHash, (err, peersNum) =>
        err ? reject(err) : resolve(peersNum)))
}
