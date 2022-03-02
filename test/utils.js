var assert = require("assert");
var { truncate } = require("../lib/utils");
const {
  parseSuite,
  convertQuestion,
  convertTimestamp,
  convertInt,
  QuestionType,
  TimeStep,
} = require("../lib/ocra_utils");

describe("HOTP utils", () => {
  context("RFC 4226", () => {
    context("Section 5.4", () => {
      specify("Truncate function", () => {
        var hmac = Buffer.from(
          "1f8698690e02ca16618550ef7f19da8e945b555a",
          "hex"
        );
        var value = truncate(hmac, 6);
        var expected = 872921;

        assert.strictEqual(value, expected);
      });
    });
  });
});

describe("OCRA utils", () => {
  context("RFC 6287", () => {
    context("Parse OCRA suite", () => {
      specify("Question only", () => {
        const expectedAlgorithm = "SHA1";
        const expectedDigits = 6;
        const expectedDataInput = {
          useQuestion: true,
          questionDetails: { type: 0, length: 8 },
        };

        const ocraSuite = "OCRA-1:HOTP-SHA1-6:QN08";
        const value = parseSuite(ocraSuite);

        assert.strictEqual(value.algorithm, expectedAlgorithm);
        assert.strictEqual(value.digits, expectedDigits);
        assert.deepEqual(value.dataInput, expectedDataInput);
      });

      specify("Full defined", () => {
        const expectedAlgorithm = "SHA512";
        const expectedDigits = 8;
        const expectedDataInput = {
          useCounter: true,
          useQuestion: true,
          questionDetails: { type: QuestionType.N, length: 8 },
          usePassword: true,
          passwordHash: "SHA256",
          useSession: true,
          sessionLength: 3,
          useTimestamp: true,
          timestampStep: 2 * TimeStep.M,
        };

        const ocraSuite = "OCRA-1:HOTP-SHA512-8:C-QN08-PSHA256-S003-T2M";
        const value = parseSuite(ocraSuite);

        assert.strictEqual(value.algorithm, expectedAlgorithm);
        assert.strictEqual(value.digits, expectedDigits);
        assert.deepEqual(value.dataInput, expectedDataInput);
      });
    });

    context("Convert Question", () => {
      specify("No question", () => {
        assert.deepEqual(
          convertQuestion("", { useQuestion: false }),
          Buffer.alloc(0)
        );
      });

      specify("Empty string", () => {
        assert.deepEqual(
          convertQuestion("", {
            useQuestion: true,
            questionDetails: { type: QuestionType.A },
          }),
          Buffer.alloc(128)
        );
      });

      specify("Number", () => {
        const data = 11111;
        const dataInput = {
          useQuestion: true,
          questionDetails: { type: QuestionType.N },
        };
        const expected = Buffer.alloc(128);
        expected.fill(Buffer.from([43, 103]), 0, 2);

        assert.deepEqual(convertQuestion(data, dataInput), expected);
      });

      specify("Complex number", () => {
        const data = 22222222;
        const dataInput = {
          useQuestion: true,
          questionDetails: { type: QuestionType.N },
        };
        const expected = Buffer.alloc(128);
        expected.fill(Buffer.from("153158e0", "hex"), 0, 4);

        assert.deepEqual(convertQuestion(data, dataInput), expected);
      });

      specify("Alphanumeric", () => {
        const data = "hello";
        const dataInput = {
          useQuestion: true,
          questionDetails: { type: QuestionType.A },
        };
        const expected = Buffer.alloc(128);
        expected.fill(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 0, 5);

        assert.deepEqual(convertQuestion(data, dataInput), expected);
      });

      specify("Hexadecimal", () => {
        const data = "2B67";
        const dataInput = {
          useQuestion: true,
          questionDetails: { type: QuestionType.H },
        };
        const expected = Buffer.alloc(128);
        expected.fill(Buffer.from([43, 103]), 0, 2);

        assert.deepEqual(convertQuestion(data, dataInput), expected);
      });
    });

    context("Convert timestamp", () => {
      const timestamp = 1646142938;

      specify("No timestamp", () => {
        assert.deepEqual(
          convertTimestamp(timestamp, { useTimestamp: false }),
          Buffer.alloc(0)
        );
      });

      specify("Normal conversion", () => {
        const dataInput = {
          useTimestamp: true,
          timestampStep: 1 * TimeStep.M,
        };
        const expected = Buffer.alloc(8);
        expected.fill(Buffer.from("6B2B", "hex"), 6);

        assert.deepEqual(convertTimestamp(timestamp, dataInput), expected);
      });
    });

    context("Convert int", () => {
      const value = 1234;

      const length = 8;
      const expected = Buffer.alloc(length);
      expected.fill(Buffer.from("04D2", "hex"), length - 2);

      assert.deepEqual(convertInt(value, length), expected);
    });
  });
});
