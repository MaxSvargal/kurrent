import kad from 'kad'
import EventEmitter from 'events'

export default class Kad {
  constructor(props: { address: string, port: number }): {} {
    const self = kad.contacts.AddressPortContact(props)
    const transport = kad.transports.UDP(self)
    const storage = new kad.storage.LocalStorage('kad')

    this.dht = new kad.Node({ transport, storage })
    this.events = new EventEmitter()
    this.registerReceiveHook(transport)

    return this
  }

  registerReceiveHook = transport => {
    transport.before('receive', (message, contact, next) => {
      message.method &&
        this.events.emit(message.method, { message, contact })
      return next()
    })
  }

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
