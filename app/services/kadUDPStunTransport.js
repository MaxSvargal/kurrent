/* eslint no-underscore-dangle: 0 */
import kad from 'kad'
import { StunClient, transports } from 'stun-js'
import ip from 'ip'
import dgram from 'dgram'

const stunServer = { address: 'stun1.l.google.com', port: 19302 }

export default class KadUDPStunTransport extends kad.transports.UDP {
  _open(done) {
    return ip.isPublic(this._contact.address) ?
      this.prototype._open.call(this, done) :
      this.createSocket.call(this, done)
  }

  _send(data, contact) {
    super._send(data, contact)
  }

  createSocket(done) {
    const socket = dgram.createSocket('udp4', this.receive.bind(this))

    socket.on('listening', () => {
      const transport = new transports.UDP(socket)
      const client = new StunClient(stunServer.address, stunServer.port, transport)

      const sendBindRequest = () => {
        client.bindP().then(({ address, port }) => {
          this._contact.address = address
          this._contact.port = port
          this._socket = socket
          client.closeP()
          return done()
        })
        .catch(err =>
          console.error({ err }))
      }
      sendBindRequest(client, socket)
    })

    socket.bind(this._contact.port)
  }
}
