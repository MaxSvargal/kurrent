/* eslint no-underscore-dangle: 0 */
import kad from 'kad'
import { StunClient, transports } from 'stun-js'
import ip from 'ip'
import dgram from 'dgram'

export default class KadUDPStunTransport extends kad.transports.UDP {
  _open(cb) {
    return ip.isPublic(this._contact.address) ?
      this.prototype._open.call(this, cb) :
      this.openSocket.call(this, cb)
  }

  _send(data, contact) {
    console.log('send from', this._contact)
    super._send(data, contact)
  }

  openSocket(cb) {
    const { address, port } = { address: 'stun1.l.google.com', port: 19302 }
    const socket = dgram.createSocket('udp4')

    socket.on('listening', () => {
      console.log(socket.address())
      const transport = new transports.UDP(socket)
      const client = new StunClient(address, port, transport)
      sendBindRequest(client, socket)
    })

    socket.bind(1333)

    const sendBindRequest = (client) =>
      client.bindP().then(mappedAddress => {
        this._contact.address = mappedAddress.address
        this._contact.port = mappedAddress.port
        this._socket = socket
        cb()
        return true // client.closeP()
      }).catch(err =>
        console.error({ err }))
  }
}
