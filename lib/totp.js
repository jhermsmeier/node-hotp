var crypto = require( 'crypto' )
var hotp = require( './hotp' )

/**
 * Time-Based One-Time Password (TOTP)
 * @param {Buffer|String} key
 * @param {Object} [options]
 * @param {Number} [options.time=(Date.now() / 1000)]
 * @param {Number} [options.timeStep=30]
 * @param {Number} [options.t0=0]
 * @param {Number} [options.digits=6]
 * @param {Number} [options.algorithm='sha1']
 * @returns {String}
 */
function totp( key, options ) {

  var time = options && options.time != null ?
    options.time : ( Date.now() / 1000 )
  var timeStep = options && options.timeStep || 30
  var t0 = options && options.t0 != null ?
    options.t0 : 0
  var digits = options && options.digits || 6
  var algorithm = options && options.algorithm || 'sha1'

  var counter = totp.t( time, t0, timeStep )

  return hotp( key, counter, { algorithm, digits })

}

/**
 * Time-step function
 * @param {Number} t
 * @param {Number} t0
 * @param {Number} ts
 * @returns {Number}
 */
totp.t = function( t, t0, ts ) {
  return Math.floor( ( t - t0 ) / ts )
}

module.exports = totp
