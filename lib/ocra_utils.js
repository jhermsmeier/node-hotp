const { zeropad } = require("./utils");

const QuestionType = {
  N: 0,
  A: 1,
  H: 2,
};
Object.freeze(QuestionType);

const TimeStep = {
  S: 1,
  M: 60,
  H: 3600,
};
Object.freeze(TimeStep);

function intToHexBuffer(value, doPadStart = true) {
  const padDirection = doPadStart ? "padStart" : "padEnd";
  let hexValue = value.toString(16);

  if (hexValue.length % 2 !== 0)
    hexValue = hexValue[padDirection](hexValue.length + 1, "0");

  return Buffer.from(hexValue, "hex");
}

function parseDataInput(dataInput) {
  const elements = dataInput.split("-");

  return elements.reduce((obj, elem) => {
    switch (elem[0]) {
      case "C":
        obj.useCounter = true;
        break;

      case "Q":
        obj.useQuestion = true;
        obj.questionDetails = {
          type: QuestionType[elem[1]],
          length: parseInt(elem.slice(2)),
        };
        break;

      case "P":
        obj.usePassword = true;
        obj.passwordHash = elem.slice(1);
        break;

      case "S":
        obj.useSession = true;
        obj.sessionLength = parseInt(elem.slice(1));
        break;

      case "T":
        obj.useTimestamp = true;
        obj.timestampStep =
          parseInt(elem.slice(1, 3)) * TimeStep[elem.slice(-1)];
        break;
    }

    return obj;
  }, {});
}

/**
 * Parse the OCRA suite to extract data.
 * @param {string} ocraSuite OCRA suite to parse.
 * @returns {object} Detailed OCRA suite information.
 */
function parseSuite(ocraSuite) {
  const elements = ocraSuite.split(":");

  const algorithmSplited = elements[1].split("-");
  const algorithm = algorithmSplited[1];
  const digits = parseInt(algorithmSplited[2]);

  return { algorithm, digits, dataInput: parseDataInput(elements[2]) };
}

/**
 * Convert the question into a binary buffer.
 * @param {number|string} question Question value to convert.
 * @param {object} dataInput OCRA suite details to use.
 * @returns {Buffer} The converted question.
 */
function convertQuestion(question, dataInput) {
  if (!dataInput.useQuestion) return Buffer.alloc(0);

  const buffer = Buffer.alloc(128);

  const { type } = dataInput.questionDetails;

  if (type === QuestionType.N) {
    const value = Buffer.from(intToHexBuffer(parseInt(question), false), "hex");
    buffer.fill(value, 0, value.length);
  } else if (type === QuestionType.H) {
    buffer.write(question, "hex");
  } else {
    buffer.write(question);
  }

  return buffer;
}

/**
 * Convert the timestamp into binary buffer.
 * @param {number} timestamp Timestamp to convert in milliseconds.
 * @param {object} dataInput OCRA suite details to use.
 * @returns {Buffer} The converted timestamp.
 */
function convertTimestamp(timestamp, dataInput) {
  if (!dataInput.useTimestamp) return Buffer.alloc(0);

  timestamp = Math.floor(timestamp / (dataInput.timestampStep * 1000));

  return Buffer.from(zeropad(timestamp.toString(16), 16), "hex");
}

/**
 * Convert a number into binary buffer.
 * @param {number} value Value to convert.
 * @param {number} length Desired buffer length.
 * @returns {Buffer} The converted value.
 */
function convertInt(value, length) {
  const data = Buffer.from(intToHexBuffer(value), "hex");

  const buffer = Buffer.alloc(length);
  buffer.fill(data, length - data.length);
  return buffer;
}

module.exports = {
  parseSuite,
  convertQuestion,
  convertTimestamp,
  convertInt,
  QuestionType,
  TimeStep,
};
