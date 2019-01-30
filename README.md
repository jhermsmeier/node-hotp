# HOTP
[![npm](https://img.shields.io/npm/v/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![npm license](https://img.shields.io/npm/l/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![npm downloads](https://img.shields.io/npm/dm/hotp.svg?style=flat-square)](https://npmjs.com/package/hotp)
[![build status](https://img.shields.io/travis/jhermsmeier/node-hotp/master.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-hotp)

HMAC-Based One-Time Password (HOTP) Algorithm

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save hotp
```

## Usage

```js
var hotp = require( 'hotp' )

var key = 'a very secret key'
var counter = 0
var digits = 8

var token = hotp( key, counter, digits )
```

```js
console.log( token ) // > 78035651
```

## CLI Usage

```console
hotp <key> <counter> [digits=6]
```

## References

- [RFC 4226, HOTP: An HMAC-Based One-Time Password Algorithm](https://tools.ietf.org/html/rfc4226)
