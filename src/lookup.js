const followRedirects = require('./follow-redirects')
const punycode = require('punycode')

const normalizeAddr = (addr, options) => {
  return (
    options.server.punycode !== false &&
    options.punycode !== false
  ) ? punycode.toASCII(addr)
    : addr
}

const lookup = (addr, options, socket) => {
  let { server: { query }, verbose, follow } = options
  return new Promise((resolve, reject) => {
    socket.write(
      query.replace('$addr', normalizeAddr(addr, options))
    )
    let data = ''
    socket.on('data', (chunk) => {
      data += chunk
    })
    socket.on('timeout', () => {
      socket.destroy()
      reject(new Error('lookup: timeout'))
    })
    socket.on('error', (err) => {
      reject(err)
    })
    socket.on('close', async (err) => {
      if (err) {}
      if (follow > 0) {
        await followRedirects(data, addr, options)
          .then(resolve).catch(reject)
        return
      }
      if (verbose) {
        return resolve([{
          server: options.server,
          data: data
        }])
      }
      resolve(data)
    })
  })
}

module.exports = lookup
