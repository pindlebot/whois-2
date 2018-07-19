const whois = require('./whois')

const RE = /(?:ReferralServer|Registrar Whois|Whois Server|WHOIS Server|Registrar WHOIS Server):[^\S\n]*(?:r?whois:\/\/)?(.*)/

const followRedirects = (data, addr, options) => {
  return new Promise(async (resolve, reject) => {
    let match = data.replace(/\r/gm, '').match(RE)
    if ((match !== null) && match[2] !== options.server.host) {
      options.follow = options.follow - 1
      options.server = match[2]

      let parts = await whois(addr, options).catch(reject)
      if (options.verbose) {
        resolve(
          [{
            server: options.server,
            data: data
          }].concat(parts)
        )
      } else {
        resolve(parts)
      }
    }
  })
}

module.exports = followRedirects
