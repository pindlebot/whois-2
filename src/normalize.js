const net = require('net')
const punycode = require('punycode')
const SERVERS = require('./fixtures/servers.json')

const defaultOptions = {
  server: null,
  follow: 0,
  proxy: null,
  verbose: false,
  bind: null,
  format: 'text'
}

module.exports = (addr, options = {}) => {
  let tld
  options = { ...defaultOptions, ...options }
  let {
    follow = 2,
    timeout = 6000,
    server,
    proxy
  } = options

  if (!server) {
    if (net.isIP(addr) !== 0) {
      server = SERVERS['_']['ip']
    } else {
      tld = punycode.toASCII(addr)
      while (true) {
        server = SERVERS[tld]
        if (!tld || server) {
          break
        }
        tld = tld.replace(/^.+?(\.|$)/, '')
      }
    }
  }
  if (typeof server === 'string') {
    let [host, port] = server.split(':')
    server = {
      host,
      port
    }
  }
  if (typeof proxy === 'string') {
    let [ip, port] = proxy.split(':')
    proxy = {
      ipaddress: ip,
      port: parseInt(port)
    }
  }
  if (proxy) {
    proxy.type = options.proxy.type || 5
  }

  server.port = server.port || 43
  server.query = server.query || '$addr\r\n'
  return {
    ...options,
    follow,
    timeout,
    proxy,
    tld,
    server
  }
}
