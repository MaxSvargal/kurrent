import kad from 'kad'
import traverse from 'kad-traverse'
import EventEmitter from 'events'
import { eventChannel } from 'redux-saga'

const transportProps = {
  traverse: {
    upnp: { forward: 1330, ttl: 6000 },
    stun: { server: { address: 'stun1.l.google.com', port: 19302 } },
    turn: false
  }
}

export default class Kad {
  constructor(props: { address: string, port: number }): {} {
    const contact = kad.contacts.AddressPortContact(props)
    const NatTransport = traverse.TransportDecorator(kad.transports.UDP)
    const transport = new NatTransport(contact, transportProps)
    const storage = new kad.storage.LocalStorage('kad')

    this.dht = new kad.Node({ transport, storage })
    this.events = new EventEmitter()
    this.transport = transport

    return this
  }

  receiveStoreChannel = () => eventChannel(emitter => {
    this.transport.before('receive', (message, contact, next) => {
      message.method === 'STORE' && emitter(message.method, { message, contact })
      return next()
    })
    return () => {} // no unsubscriber
  })

  connect = (seed: { address: string, port: number }): Promise =>
    new Promise((resolve, reject) =>
      this.dht.connect(seed, err => err ? reject(err) : resolve(this.dht)))

  get = (key): Promise =>
    new Promise((resolve, reject) =>
      this.dht.get(key, (err, value) => err ? reject(err) : resolve(value)))

  put = (key, value): Promise =>
    new Promise((resolve, reject) =>
      this.dht.put(key, value, (err, resp) => err ? reject(err) : resolve(resp)))
}
