var crypto = require( 'crypto' )

function zeropad( value ) {
  return ( zeropad.fill + value ).slice( -16 )
}

zeropad.fill = '0'.repeat( 16 )

function getCounter( value ) {
  var buffer = Buffer.alloc( 8 )
  if( Number.isFinite( value ) || typeof value === 'bigint' ) {
    buffer.write( zeropad( value.toString( 16 ) ), 0, 'hex' )
  } else if( Buffer.isBuffer( value ) ) {
    value.copy( buffer )
  } else if( typeof value === 'string' ) {
    buffer.write( zeropad( value ), 0, 'hex' )
  } else {
    throw new Error( `Unexpected counter value type ${typeof value}` )
  }
  return buffer
}

/**
 * HMAC-Based One-Time Password (HOTP)
 * @param {Buffer|String} key
 * @param {Buffer|String|Number} counter
 * @param {Number} [digits=6]
 * @returns {Number} token
 */
function hotp( key, counter, digits ) {
  var hmac = crypto.createHmac( 'sha1', key )
    .update( getCounter( counter ) ).digest()
  return truncate( hmac, digits || 6 )
}

/**
 * HOTP truncate function
 * @param {Buffer} hmac
 * @param {Number} digits
 * @returns {Number}
 */
function truncate( hmac, digits ) {
  // var offset = hmac[ 19 ] & 0x0F
  // var value = ( hmac[ offset + 0 ] & 0x7F ) << 24 |
  //   ( hmac[ offset + 1 ] & 0xFF ) << 16 |
  //   ( hmac[ offset + 2 ] & 0xFF ) <<  8 |
  //   ( hmac[ offset + 3 ] & 0xFF )
  // return value % ( 10 ** digits )
  return ( hmac.readUInt32BE( hmac[ 19 ] & 0x0F ) & 0x7FFFFFFF ) % ( 10 ** digits )
}

module.exports = hotp
module.exports.truncate = truncate
