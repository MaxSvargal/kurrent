import kad from 'kad'
import os from 'os'

export default class Kad {
  constructor(props: { address: string, port: number }): {} {
    this.selfContact = kad.contacts.AddressPortContact(props)
    const transport = kad.transports.UDP(this.selfContact)
    const storage = kad.storage.FS(`${os.tmpdir()}/kad`)
    this.dht = new kad.Node({ transport, storage })
    return this
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
