const { generateToken, zeropad } = require("./utils");

function getCounter(value) {
  const buffer = Buffer.alloc(8);

  if (Number.isFinite(value) || typeof value === "bigint") {
    buffer.write(zeropad(value.toString(16)), 0, "hex");
  } else if (Buffer.isBuffer(value)) {
    value.copy(buffer);
  } else if (typeof value === "string") {
    buffer.write(zeropad(value), 0, "hex");
  } else {
    throw new Error(`Unexpected counter value type ${typeof value}`);
  }

  return buffer;
}

/**
 * HMAC-Based One-Time Password (HOTP)
 * @param {Buffer|string} key
 * @param {Buffer|string|number} counter
 * @param {Object} [options]
 * @param {string} [options.algorithm='sha1']
 * @param {Number} [options.digits=6]
 * @returns {string} token
 */
function hotp(key, counter, options) {
  return generateToken(key, getCounter(counter), options);
}

module.exports = hotp;
module.exports.totp = require("./totp");
