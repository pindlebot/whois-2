const whois = require('../src/index')
jest.setTimeout(30000)

const sleep = () => new Promise((resolve, reject) => setTimeout(resolve, 3000))

it('should work with google.com', () => {
  expect.assertions(1)
  return whois('google.com')
    .then(data => {
      expect(data.toLowerCase().indexOf('domain name: google.com')).toBeGreaterThanOrEqual(0)
    })
})

it('should work with 50.116.8.109', () => {
  expect.assertions(1)
  return whois('50.116.8.109')
    .then(data => {
      expect(
        data.toLowerCase().indexOf('netname:        linode-us')
      ).toBeGreaterThanOrEqual(0)
    })
})

it('should work with 2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d', () => {
  expect.assertions(1)

  return whois('2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d')
    .then(data => {
      expect(
        data.toLowerCase().indexOf('nethandle:      net6-2001-c00-1')
      ).toBeGreaterThanOrEqual(0)
    })
})

it('should honor specified WHOIS server', () => {
  expect.assertions(2)

  return whois('gandi.net', {
    server: 'whois.gandi.net'
  }).then(data => {
    data = data.toLowerCase()
    expect(
      data.indexOf('whois server: whois.gandi.net')
    ).toBeGreaterThanOrEqual(0)
    expect(
      data.indexOf('domain name: gandi.net')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should honor specified WHOIS server with port override', () => {
  expect.assertions(2)

  return whois('tucows.com', {
    server: 'whois.tucows.com:43'
  }).then(data => {
    data = data.toLowerCase()
    expect(
      data.indexOf('whois server: whois.tucows.com')
    ).toBeGreaterThanOrEqual(0)
    expect(
      data.indexOf('domain name: tucows.com')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should follow specified number of redirects for domain', () => {
  expect.assertions(1)

  return whois('google.com', {
    follow: 1
  }).then(data => {
    expect(
      data.toLowerCase().indexOf('domain name: google.com')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should follow specified number of redirects for IP address', () => {
  expect.assertions(1)

  return whois('176.58.115.202', {
    follow: 1
  }).then(data => {
    expect(
      data.toLowerCase().indexOf('nethandle:      net-176-0-0-0-0')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should work with nic.sh', () => {
  expect.assertions(1)

  return whois('nic.sh')
    .then(data => {
      expect(
        data.toLowerCase().indexOf('registry domain id: d503300000040403495-lrms')
      ).toBeGreaterThanOrEqual(0)
    })
})

it('should work with nic.io', () => {
  expect.assertions(1)

  return whois('nic.io')
    .then(data => {
      expect(
        data.toLowerCase().indexOf('registry domain id: d503300000040453277-lrms')
      ).toBeGreaterThanOrEqual(0)
    })
})

it('should work with nic.ac', () => {
  expect.assertions(1)

  return whois('nic.ac')
    .then(data => {
      expect(
        data.toLowerCase().indexOf('registry domain id: d503300000040632620-lrms')
      ).toBeGreaterThanOrEqual(0)
    })
})

it('should work with nic.tm', () => {
  expect.assertions(1)

  return whois('nic.tm').then(data => {
    expect(data.toLowerCase().indexOf('status : permanent/reserved')).toBeGreaterThanOrEqual(0)
  })
})

it('should work with nic.global', () => {
  expect.assertions(1)

  return whois('nic.global').then(data => {
    expect(
      data.toLowerCase().indexOf('registry domain id: d2836144-agrs')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should work with srs.net.nz', () => {
  expect.assertions(1)

  return whois('srs.net.nz').then(data => {
    expect(data.toLowerCase().indexOf('domain_name: srs.net.nz')).toBeGreaterThanOrEqual(0)
  })
})

it('should work with redundant follow', () => {
  expect.assertions(1)

  return whois('google.com', {
    follow: 5
  }).then(data => {
    expect(data.toLowerCase().indexOf('domain name: google.com')).toBeGreaterThanOrEqual(0)
  })
})

it('should work with küche.de', () => {
  expect.assertions(2)

  return whois('küche.de').then(data => {
    expect(data.toLowerCase().indexOf('domain: küche.de'))
      .toBeGreaterThanOrEqual(0)
    expect(data.toLowerCase().indexOf('status: connect'))
      .toBeGreaterThanOrEqual(0)
  })
})

it('should work with google.co.jp in english', () => {
  expect.assertions(1)

  return whois('google.co.jp').then(data => {
    expect(
      data.toLowerCase().indexOf('a. [domain name]                google.co.jp')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should work with registry.pro', () => {
  expect.assertions(1)

  return whois('registry.pro').then(data => {
    expect(
      data.toLowerCase().indexOf('domain id: d107300000000006392-lrms')
    ).toBeGreaterThanOrEqual(0)
  })
})

it('should fail with google.com due to timeout', () => {
  expect.assertions(1)

  return whois('google.com', {
    timeout: 1
  }).catch(err => {
    expect(err.message).toMatch('lookup: timeout')
  })
})

it('should succeed with google.com with timeout', () => {
  expect.assertions(1)

  return whois('google.com', {
    timeout: 10000
  }).then(data => {
    expect(data.toLowerCase().indexOf('domain name: google.com')).toBeGreaterThanOrEqual(0)
  })
})

it('should work with åre.no', () => {
  expect.assertions(1)

  return whois('åre.no').then(data => {
    expect(data.toLowerCase().indexOf('åre.no')).toBeGreaterThanOrEqual(0)
  })
})
