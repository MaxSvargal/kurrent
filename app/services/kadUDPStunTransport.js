/* eslint no-underscore-dangle: 0 */
import kad from 'kad'
import { StunClient, transports } from 'stun-js'
import ip from 'ip'
import dgram from 'dgram'

export default class KadUDPStunTransport extends kad.transports.UDP {
  _open(done) {
    return ip.isPublic(this._contact.address) ?
      this.prototype._open.call(this, done) :
      this.createSocket.call(this, done)
  }

  _send(data, contact) {
    console.log('send to', contact, 'from', this._contact)
    super._send(data, contact)
  }

  createSocket(done) {
    const { address, port } = { address: 'stun1.l.google.com', port: 19302 }
    const socket = dgram.createSocket('udp4', { reuseAddr: false }, this.receive.bind(this))

    socket.on('listening', () => {
      const transport = new transports.UDP(socket)
      const client = new StunClient(address, port, transport)

      const sendBindRequest = () => {
        client.bindP().then(mappedAddress => {
          this._contact.address = mappedAddress.address
          this._contact.port = mappedAddress.port
          this._socket = socket

          const token = '12345'
          socket.on('message', done)
          return socket.send(token, 0, token.length, mappedAddress.port, mappedAddress.address)
        })
        .catch(err => console.error({ err }))
      }
      sendBindRequest(client, socket)
    })

    socket.bind(this._contact.port)
  }
}
