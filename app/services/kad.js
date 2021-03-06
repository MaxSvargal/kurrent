import kad from 'kad'
import EventEmitter from 'events'
import { eventChannel } from 'redux-saga'

import KadUDPStunTransport from './kadUDPStunTransport'

export default class Kad {
  constructor({ address, port, stun = true }): {} {
    const contact = kad.contacts.AddressPortContact({ address, port })
    const transport = stun ? new KadUDPStunTransport(contact) : kad.transports.UDP(contact)
    const storage = new kad.storage.LocalStorage('kad')
    const logger = new kad.Logger(3)

    this.dht = new kad.Node({ transport, storage, logger })
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
