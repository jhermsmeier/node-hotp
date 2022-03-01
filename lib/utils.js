const crypto = require("crypto");

/**
 * HOTP truncate function
 * @param {Buffer} hmac
 * @param {number} digits
 * @returns {number}
 */
function truncate(hmac, digits) {
  const offset = hmac[hmac.length - 1] & 0x0f;

  const value =
    ((hmac[offset + 0] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  return value % 10 ** digits;
  // return ( hmac.readUInt32BE( hmac[ hmac.length - 1 ] & 0x0F ) & 0x7FFFFFFF ) % ( 10 ** digits )
}

/**
 * Prepend pad to reach desired length.
 * @param {number|string} value Data to pad.
 * @param {number} length Data length.
 * @returns {string} Padded data
 */
function zeropad(value, digits = 16) {
  const fill = "0".repeat(digits);
  return (fill + value).slice(-digits);
}

/**
 * @typedef {object} HotpOptions
 * @properties {string} [algorithm = 'SHA1'] HMac algorithm to use
 * @properties {number} [digits = 6] Max size for the HOTP code
 */

/**
 * HMAC-Based One-Time Password (HOTP)
 * @param {Buffer|string} key
 * @param {Buffer|string|Number} data
 * @param {HotpOptions} [options]
 * @returns {string} token
 */
function generateToken(key, data, options) {
  const algorithm = options?.algorithm || "sha1";
  const digits = options?.digits || 6;

  const hmac = crypto.createHmac(algorithm, key).update(data).digest();

  return zeropad(truncate(hmac, digits), digits);
}

module.exports = { generateToken, truncate, zeropad };
