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
    key: '0c737f02449f8f669e694e3f11ff44c7f74b9e42',
    title: '(Progressive metal) Hypertoad - God please destroy humanity - 2016',
    header: 'Hypertoad - God please destroy humanity',
    desc: 'One-man band из Санкт-Петербурга. Диапазон стилей простирается от пост-рока до мат-метала.',
    tags: [ 'music', 'rock', 'math-metal' ],
    created: 1482366017955,
    updated: 1482366025578,
    likes: 3,
    dislikes: 1,
    pic: 'https://dl.dropboxusercontent.com/u/931817/otagai-heart.png',
    magnet: 'magnet:?xt=urn:btih:b482ecc23e6539ad99f7a9582a9e3e71f15eb732&dn=Exxxtrasmall+-Sweet+Little+Treats+-+Cara+Stone+%5B1080p%5D.mp4&tr=udp%3A//tracker.leechers-paradise.org%3A6969&tr=udp%3A//zer0day.ch%3A1337&tr=udp%3A//open.demonii.com%3A1337&tr=udp%3A//tracker.coppersurfer.tk%3A6969&tr=udp%3A//exodus.desync.com%3A6969'
  },
  '5a086977df384b52839ec80a6692740a055a76e7': {
    key: '5a086977df384b52839ec80a6692740a055a76e7',
    title: '(Irish-Punk/Celtic-Punk) VA - Tribute To The Pogues - 2016',
    header: 'Hypertoad - God please destroy humanity',
    desc: 'One-man band из Санкт-Петербурга. Диапазон стилей простирается от пост-рока до мат-метала.',
    tags: [ 'music', 'rock', 'math-metal' ],
    created: 1482366032420,
    updated: 1482366037716,
    likes: 3,
    dislikes: 1,
    pic: 'https://dl.dropboxusercontent.com/u/931817/34125243516.jpg',
    magnet: 'magnet:?xt=urn:btih:b482ecc23e6539ad99f7a9582a9e3e71f15eb732&dn=Exxxtrasmall+-Sweet+Little+Treats+-+Cara+Stone+%5B1080p%5D.mp4&tr=udp%3A//tracker.leechers-paradise.org%3A6969&tr=udp%3A//zer0day.ch%3A1337&tr=udp%3A//open.demonii.com%3A1337&tr=udp%3A//tracker.coppersurfer.tk%3A6969&tr=udp%3A//exodus.desync.com%3A6969'
  },
  '97b519972dd497d9a3624dd736477d9c5cd42b75': {
    key: '97b519972dd497d9a3624dd736477d9c5cd42b75',
    title: '(Ambient, Drone, Ritual) Creation VI - Myth About Flat World - 2015',
    header: 'Creation VI - Myth About Flat World',
    desc: 'Было бытие. Тьма вещей во множестве пустила корневища и корни, образовались ветви и листья, зеленый лук и подземные грибы. Сочная трава ярко заблестела, насекомые встрепенулись, черви зашевелились, все задвигалось и задышало. И это уже можно было подержать в руке и измерить...',
    tags: [ 'music', 'rock', 'folk' ],
    created: 1482365986356,
    updated: 1482366000260,
    likes: 10,
    dislikes: 2,
    pic: 'https://dl.dropboxusercontent.com/u/931817/op.jpg',
    magnet: 'magnet:?xt=urn:btih:b482ecc23e6539ad99f7a9582a9e3e71f15eb732&dn=Exxxtrasmall+-Sweet+Little+Treats+-+Cara+Stone+%5B1080p%5D.mp4&tr=udp%3A//tracker.leechers-paradise.org%3A6969&tr=udp%3A//zer0day.ch%3A1337&tr=udp%3A//open.demonii.com%3A1337&tr=udp%3A//tracker.coppersurfer.tk%3A6969&tr=udp%3A//exodus.desync.com%3A6969'
  }
}

const toBuffer = obj => new Buffer(JSON.stringify(obj), 'utf8')

const searchIndex = Object.keys(topics).reduce((obj, id) =>
  Object.assign({}, obj, { [id]: topics[id].title }), {})

zlib.deflateRaw(toBuffer(searchIndex), (err, buffer) =>
  dht.put('searchIndex', buffer.toString('base64'), cb))

Object.keys(topics).forEach(id =>
  zlib.deflateRaw(toBuffer(topics[id]), (err, buffer) =>
    dht.put(id, buffer.toString('base64'), cb)))
