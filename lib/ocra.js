const {
  parseSuite,
  convertQuestion,
  convertTimestamp,
  convertInt,
} = require("./ocra_utils");
const { generateToken } = require("./utils");

/**
 * @typedef {object} DataInput
 * @properties {number?} counter
 * @properties {number|string} question
 * @properties {string?} password (in hexadecimal)
 * @properties {string?} sessionInfo
 * @properties {number?} timestamp (in milliseconds)
 */

/**
 * Compute OCRA code.
 * @param {Buffer} key
 * @param {string} ocraSuite
 * @param {DataInput} data
 * @return {string} Generated OCRA code.
 */
function ocra(key, ocraSuite, data) {
  const details = parseSuite(ocraSuite);
  const dataInputDetails = details.dataInput;
  // TODO: validate inputs

  const counterBuffer = dataInputDetails.useCounter
    ? convertInt(data.counter, 8)
    : Buffer.alloc(0);

  const questionBuffer = convertQuestion(data.question, dataInputDetails);

  const passwordBuffer = dataInputDetails.usePassword
    ? Buffer.from(data.password, "hex")
    : Buffer.alloc(0);

  const sessionBuffer = dataInputDetails.useSession
    ? Buffer.from(data.sessionInfo)
    : Buffer.alloc(0);

  const timestampBuffer = convertTimestamp(data.timestamp, dataInputDetails);

  const input = Buffer.concat([
    counterBuffer,
    questionBuffer,
    passwordBuffer,
    sessionBuffer,
    timestampBuffer,
  ]);

  const dataInput = Buffer.concat([
    Buffer.from(ocraSuite),
    Buffer.from([0x00]),
    input,
  ]);

  return generateToken(key, dataInput, details);
}

module.exports = ocra;
