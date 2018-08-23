## whois-2

![https://raw.githubusercontent.com/unshift/whois-2/master/hyper.gif](https://raw.githubusercontent.com/unshift/whois-2/master/hyper.gif)

```bash
npm i whois-2 --save
```

## Why not `whois`?

This is a rewrite of the fantastic module [whois](https://www.npmjs.com/package/whois) by Ridwan. 

Features:

- uses plain JS instead of CoffeeScript
- promises instead of callbacks
- optionally return json instead of plain text
- eliminates unnecessary dependencies (underscore.js)


## Try it out

Test it out [here](https://api-staging.namewhisk.com/namewhisk.com).

The format is https://api-staging.namewhisk.com/{domain}

## Usage

```js

const whois = require('whois-2')

whois('youtube.com', { format: 'json' }).then(data => {
  console.log(data)
  { 
    domain_name: 'YOUTUBE.COM',
    registry_domain_id: '142504053_DOMAIN_COM-VRSN',
    registrar_whois_server: 'whois.markmonitor.com',
    registrar_url: 'http://www.markmonitor.com',
    updated_date: '2018-01-14T10:29:29Z',
    creation_date: '2005-02-15T05:13:12Z',
    registry_expiry_date: '2019-02-15T05:13:12Z',
    registrar: 'MarkMonitor Inc.',
    registrar_iana_id: '292',
    registrar_abuse_contact_email: 'abusecomplaints@markmonitor.com',
    registrar_abuse_contact_phone: '+1.2083895740',
    domain_status:
    [ 'clientDeleteProhibited https://icann.org/epp#clientDeleteProhibited',
      'clientTransferProhibited https://icann.org/epp#clientTransferProhibited',
      'clientUpdateProhibited https://icann.org/epp#clientUpdateProhibited',
      'serverDeleteProhibited https://icann.org/epp#serverDeleteProhibited',
      'serverTransferProhibited https://icann.org/epp#serverTransferProhibited',
      'serverUpdateProhibited https://icann.org/epp#serverUpdateProhibited' ],
    name_server:
    [ 'NS1.GOOGLE.COM',
      'NS2.GOOGLE.COM',
      'NS3.GOOGLE.COM',
      'NS4.GOOGLE.COM' ],
    dnssec: 'unsigned',
    url_of_the_icann_whois_inaccuracy_complaint_form: 'https://www.icann.org/wicf/'
  }
})

```