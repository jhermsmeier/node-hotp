# HOTP TOTP
[![npm](https://img.shields.io/npm/v/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![npm license](https://img.shields.io/npm/l/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![npm downloads](https://img.shields.io/npm/dm/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![build status](https://img.shields.io/travis/jhermsmeier/node-hotp/master.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-hotp)

HMAC-Based One-Time Password (HOTP), and Time-Based One-Time Password (TOTP) Algorithms

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save hotp
```

## Changelog

- **v3.0.0**: Removed CLI utilities – now to be found at [jhermsmeier / hotp-totp-cli](https://github.com/jhermsmeier/hotp-totp-cli)
- **v2.0.0**: Added TOTP implementation
- **v1.0.0**: Initial release

## Usage

### HOTP

#### hotp( key, counter[, options] )

- `key` {Buffer|String}
- `counter` {Buffer|String|Number}
- `options` {Object}
  - `algorithm` {Number} **Default:** `'sha1'`
  - `digits` {Number} **Default:** `6`
- Returns {String}

#### Example

```js
var hotp = require( 'hotp' )

var key = 'a very secret key'
var counter = 0

var token = hotp( key, counter, { digits: 8 })

console.log( token ) // > '78035651'
```

### TOTP

#### hotp.totp( key[, options] )

- `key` {Buffer|String}
- `options` {Object}
  - `algorithm` {Number} **Default:** `'sha1'`
  - `digits` {Number} **Default:** `6`
  - `time` {Number} **Default:** `(Date.now() / 1000)`
  - `timeStep` {Number} **Default:** `30`
  - `t0` {Number} **Default:** `0`
- Returns {String}

#### Example

```js
var hotp = require( 'hotp' )

var key = 'a very secret key'
var token = hotp.totp( key, { digits: 8 })

console.log( token ) // > '86247382'
```

## References

- [RFC 4226, HOTP: An HMAC-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc4226)
- [RFC 6238, TOTP: Time-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc6238)
