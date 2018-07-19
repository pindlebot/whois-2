const whois = require('./whois')
const parse = require('./parse')

module.exports = (addr, options) => {
  return whois(addr, options)
    .then(data =>
      options && options.format && options.format === 'json'
        ? parse(data)
        : data
    )
}
