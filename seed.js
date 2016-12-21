const kad = require('kad')

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

dht.put('sections', {
  1: 'First section',
  2: 'Second section'
}, cb)

dht.put('topicsOfSection_1', {
  5281416: {
    title: 'Hypertoad - God please destroy humanity',
    likes: 3,
    dislikes: 1
  },
  5246821: {
    title: 'VA - Tribute To The Pogues',
    likes: 1,
    dislikes: 0
  },
  5231061: {
    title: 'Creation VI - Myth About Flat World',
    likes: 10,
    dislikes: 2
  }
}, cb)

dht.put('metaSearch', {
  5281416: '(Progressive metal) Hypertoad - God please destroy humanity - 2016',
  5246821: '(Irish-Punk/Celtic-Punk) VA - Tribute To The Pogues - 2016',
  5231061: '(Ambient, Drone, Ritual) Creation VI - Myth About Flat World - 2015'
}, cb)

dht.put('5281416', {
  title: 'Hypertoad - God please destroy humanity',
  desc: 'One-man band из Санкт-Петербурга. Диапазон стилей простирается от пост-рока до мат-метала.',
  likes: 3,
  dislikes: 1,
  magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
}, cb)

dht.put('5246821', {
  title: 'VA - Tribute To The Pogues',
  desc: 'Первый международный трибьют отцам кельтского панка THE POGUES!!! Даже языковые барьеры не помеха, когда дело касается этой, поистине легендарной команды... Не один кавер не звучал нигде ранее! 27 банд со всего мира (США, Италия, Польша, Англия, Словения, Чехия, Индонезия, Украина, Беларусь и Россия) исполнили на 5 языках кавер-версии самых знаменитых пьяных ирландских баллад эпохи булавок, рваных пиджаков и взъерошенных голов!',
  likes: 1,
  dislikes: 0,
  magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
}, cb)

dht.put('5231061', {
  title: 'Creation VI - Myth About Flat World',
  desc: 'Было бытие. Тьма вещей во множестве пустила корневища и корни, образовались ветви и листья, зеленый лук и подземные грибы. Сочная трава ярко заблестела, насекомые встрепенулись, черви зашевелились, все задвигалось и задышало. И это уже можно было подержать в руке и измерить...',
  likes: 10,
  dislikes: 2,
  magnet: 'magnet:?xt=urn:ed2k:31D6CFE0D16AE931B73C59D7E0C089C0&xl=0&dn=zero_len.fil&xt=urn:bitprint:3I42H3S6NNFQ2MSVX7XZKYAYSCX5QBYJ.LWPNACQDBZRYXW3VHJVCJ64QBZNGHOHHHZWCLNQ&xt=urn:md5:D41D8CD98F00B204E9800998ECF8427E&dn'
}, cb)
