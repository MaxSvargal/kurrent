const kad = require('kad')
const zlib = require('zlib')

const cb = () => {}

const dht = new kad.Node({
  transport: kad.transports.UDP(
    kad.contacts.AddressPortContact({
      address: '127.0.0.1',
      port: 1330
    })
  ),
  storage: kad.storage.MemStore()
})

const topics = {
  '0c737f02449f8f669e694e3f11ff44c7f74b9e42': {
    title: '(Progressive metal) Hypertoad - God please destroy humanity - 2016',
    header: 'Hypertoad - God please destroy humanity',
    desc: 'One-man band из Санкт-Петербурга. Диапазон стилей простирается от пост-рока до мат-метала.',
    tags: [ 'music', 'rock', 'math-metal' ],
    created: 1482366017955,
    updated: 1482366025578,
    likes: 3,
    dislikes: 1,
    magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
  },
  '5a086977df384b52839ec80a6692740a055a76e7': {
    title: '(Irish-Punk/Celtic-Punk) VA - Tribute To The Pogues - 2016',
    header: 'Hypertoad - God please destroy humanity',
    desc: 'One-man band из Санкт-Петербурга. Диапазон стилей простирается от пост-рока до мат-метала.',
    tags: [ 'music', 'rock', 'math-metal' ],
    created: 1482366032420,
    updated: 1482366037716,
    likes: 3,
    dislikes: 1,
    magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
  },
  '97b519972dd497d9a3624dd736477d9c5cd42b75': {
    title: '(Ambient, Drone, Ritual) Creation VI - Myth About Flat World - 2015',
    header: 'Creation VI - Myth About Flat World',
    desc: 'Было бытие. Тьма вещей во множестве пустила корневища и корни, образовались ветви и листья, зеленый лук и подземные грибы. Сочная трава ярко заблестела, насекомые встрепенулись, черви зашевелились, все задвигалось и задышало. И это уже можно было подержать в руке и измерить...',
    tags: [ 'music', 'rock', 'folk' ],
    created: 1482365986356,
    updated: 1482366000260,
    likes: 10,
    dislikes: 2,
    magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
  }
}

const input = new Buffer(JSON.stringify(topics), 'utf8')

zlib.deflateRaw(input, (err, buffer) =>
  dht.put('topics', buffer.toString('base64'), cb))
