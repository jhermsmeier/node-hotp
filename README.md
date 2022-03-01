# HOTP - TOTP - OCRA

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

- `key` {Buffer|string}
- `counter` {Buffer|string|number}
- `options` {Object}
  - `algorithm` {number} **Default:** `'sha1'`
  - `digits` {number} **Default:** `6`
- Returns {string}

#### Example

```js
const hotp = require("hotp");

const key = "a very secret key";
const counter = 0;

const token = hotp(key, counter, { digits: 8 });

console.log(token); // > '78035651'
```

### TOTP

#### hotp.totp( key[, options] )

- `key` {Buffer|string}
- `options` {Object}
  - `algorithm` {number} **Default:** `'sha1'`
  - `digits` {number} **Default:** `6`
  - `time` {number} **Default:** `(Date.now() / 1000)`
  - `timeStep` {number} **Default:** `30`
  - `t0` {number} **Default:** `0`
- Returns {string}

#### Example

```js
const hotp = require("hotp");

const key = "a very secret key";
const token = hotp.totp(key, { digits: 8 });

console.log(token); // > '86247382'
```

### OCRA

#### ocra( key, counter[, options] )

- `key` {Buffer|string}
- `ocraSuite` {string}
- `data` {Object}
  - `counter` {number?}
  - `question` {number|string}
  - `password` {string?} (in hexadecimal)
  - `sessionInfo` {string?}
  - `timestamp` {number?} (in milliseconds)
- Returns {string}

#### Example

```js
const hotp = require("hotp");

const key = "a very secret key";
const ocraSuite = "OCRA-1:HOTP-SHA512-8:QA10-T1M";
const data = { question: "SIG1000000", timestamp: 1206446760000 };

const token = hotp.ocra(key, ocraSuite, data);

console.log(token); // > '77537423'
```

## References

- [RFC 4226, HOTP: An HMAC-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc4226)
- [RFC 6238, TOTP: Time-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc6238)
- [RFC 6287, OCRA: OATH Challenge-Response Algorithm](https://tools.ietf.org/html/rfc6287)
