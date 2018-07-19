const net = require('net')
const normalize = require('./normalize')
const lookup = require('./lookup')
const handleProxy = require('./handle-proxy')

const whois = (addr, options) => {
  return new Promise(async (resolve, reject) => {
    let socket
    options = normalize(addr, options)
    if (options.proxy) {
      return handleProxy(addr, options)
        .then(resolve)
        .catch(reject)
    }
    socket = net.connect({
      host: options.server.host,
      port: options.server.port,
      localAddress: options.bind || undefined
    })
    if (options.timeout) {
      socket.setTimeout(options.timeout)
    }
    lookup(addr, options, socket)
      .catch(reject)
      .then(resolve)
  })
}

module.exports = whois
