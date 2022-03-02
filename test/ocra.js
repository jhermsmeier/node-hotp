const assert = require("assert");
const hotp = require("..");
const ocra = hotp.ocra;

describe("OCRA", () => {
  context("RFC 6287", () => {
    const Std20BytesKeyHex = Buffer.from(
      "3132333435363738393031323334353637383930",
      "hex"
    );
    const Std32BytesKeyHex = Buffer.from(
      "3132333435363738393031323334353637383930313233343536373839303132",
      "hex"
    );
    const Std64BytesKeyHex = Buffer.from(
      "31323334353637383930313233343536373839303132333435363738393031323334353637383930313233343536373839303132333435363738393031323334",
      "hex"
    );
    const PinSha1Hex = Buffer.from(
      "7110eda4d09e062aa5e4a390b0a572ac0d2c0220",
      "hex"
    );

    context("Appendix C - OCRA: One-Way Challenge", () => {
      context("Test OCRA-1:HOTP-SHA1-6:QN08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA1-6:QN08";

        const values = [
          { question: 00000000, expected: "237653" },
          { question: 11111111, expected: "243178" },
          { question: 22222222, expected: "653583" },
          { question: 33333333, expected: "740991" },
          { question: 44444444, expected: "608993" },
          { question: 55555555, expected: "388898" },
          { question: 66666666, expected: "816933" },
          { question: 77777777, expected: "224598" },
          { question: 88888888, expected: "750600" },
          { question: 99999999, expected: "294470" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = { question: test.question };

            assert.strictEqual(
              ocra(Std20BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA256-8:C-QN08-PSHA1", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:C-QN08-PSHA1";

        const values = [
          {
            counter: parseInt("00000"),
            question: "12345678",
            expected: "65347737",
          },
          {
            counter: parseInt("00001"),
            question: "12345678",
            expected: "86775851",
          },
          {
            counter: parseInt("00002"),
            question: "12345678",
            expected: "78192410",
          },
          {
            counter: parseInt("00003"),
            question: "12345678",
            expected: "71565254",
          },
          {
            counter: parseInt("00004"),
            question: "12345678",
            expected: "10104329",
          },
          {
            counter: parseInt("00005"),
            question: "12345678",
            expected: "65983500",
          },
          {
            counter: parseInt("00006"),
            question: "12345678",
            expected: "70069104",
          },
          {
            counter: parseInt("00007"),
            question: "12345678",
            expected: "91771096",
          },
          {
            counter: parseInt("00008"),
            question: "12345678",
            expected: "75011558",
          },
          {
            counter: parseInt("00009"),
            question: "12345678",
            expected: "08522129",
          },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              counter: test.counter,
              question: test.question,
              password: PinSha1Hex,
            };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA256-8:QN08-PSHA1", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:QN08-PSHA1";

        const values = [
          { question: "00000000", expected: "83238735" },
          { question: "11111111", expected: "01501458" },
          { question: "22222222", expected: "17957585" },
          { question: "33333333", expected: "86776967" },
          { question: "44444444", expected: "86807031" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = { question: test.question, password: PinSha1Hex };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA512-8:C-QN08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA512-8:C-QN08";

        const values = [
          { counter: "00000", question: "00000000", expected: "07016083" },
          { counter: "00001", question: "11111111", expected: "63947962" },
          { counter: "00002", question: "22222222", expected: "70123924" },
          { counter: "00003", question: "33333333", expected: "25341727" },
          { counter: "00004", question: "44444444", expected: "33203315" },
          { counter: "00005", question: "55555555", expected: "34205738" },
          { counter: "00006", question: "66666666", expected: "44343969" },
          { counter: "00007", question: "77777777", expected: "51946085" },
          { counter: "00008", question: "88888888", expected: "20403879" },
          { counter: "00009", question: "99999999", expected: "31409299" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              counter: test.counter,
              question: test.question,
            };

            assert.strictEqual(
              ocra(Std64BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA512-8:QN08-T1M", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA512-8:QN08-T1M";

        const values = [
          {
            question: "00000000",
            timestamp: 1206446760000,
            expected: "95209754",
          },
          {
            question: "11111111",
            timestamp: 1206446760000,
            expected: "55907591",
          },
          {
            question: "22222222",
            timestamp: 1206446760000,
            expected: "22048402",
          },
          {
            question: "33333333",
            timestamp: 1206446760000,
            expected: "24218844",
          },
          {
            question: "44444444",
            timestamp: 1206446760000,
            expected: "36209546",
          },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              question: test.question,
              timestamp: test.timestamp,
            };

            assert.strictEqual(
              ocra(Std64BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });
    });

    context("Appendix C - OCRA: Mutual Challenge", () => {
      context("Test OCRA-1:HOTP-SHA256-8:QA08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:QA08";

        const values = [
          // Server
          { question: "CLI22220SRV11110", expected: "28247970" },
          { question: "CLI22221SRV11111", expected: "01984843" },
          { question: "CLI22222SRV11112", expected: "65387857" },
          { question: "CLI22223SRV11113", expected: "03351211" },
          { question: "CLI22224SRV11114", expected: "83412541" },
          // Client
          { question: "SRV11110CLI22220", expected: "15510767" },
          { question: "SRV11111CLI22221", expected: "90175646" },
          { question: "SRV11112CLI22222", expected: "33777207" },
          { question: "SRV11113CLI22223", expected: "95285278" },
          { question: "SRV11114CLI22224", expected: "28934924" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              question: test.question,
            };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test Server OCRA-1:HOTP-SHA512-8:QA08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA512-8:QA08";

        const values = [
          { question: "CLI22220SRV11110", expected: "79496648" },
          { question: "CLI22221SRV11111", expected: "76831980" },
          { question: "CLI22222SRV11112", expected: "12250499" },
          { question: "CLI22223SRV11113", expected: "90856481" },
          { question: "CLI22224SRV11114", expected: "12761449" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              counter: test.counter,
              question: test.question,
            };

            assert.strictEqual(
              ocra(Std64BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test Client OCRA-1:HOTP-SHA512-8:QA08-PSHA1", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA512-8:QA08-PSHA1";

        const values = [
          { question: "SRV11110CLI22220", expected: "18806276" },
          { question: "SRV11111CLI22221", expected: "70020315" },
          { question: "SRV11112CLI22222", expected: "01600026" },
          { question: "SRV11113CLI22223", expected: "18951020" },
          { question: "SRV11114CLI22224", expected: "32528969" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = { question: test.question, password: PinSha1Hex };

            assert.strictEqual(
              ocra(Std64BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });
    });

    context("Appendix C - OCRA: One-Way Challenge", () => {
      context("Test OCRA-1:HOTP-SHA1-6:QN08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA1-6:QN08";

        const values = [
          { question: 00000000, expected: "237653" },
          { question: 11111111, expected: "243178" },
          { question: 22222222, expected: "653583" },
          { question: 33333333, expected: "740991" },
          { question: 44444444, expected: "608993" },
          { question: 55555555, expected: "388898" },
          { question: 66666666, expected: "816933" },
          { question: 77777777, expected: "224598" },
          { question: 88888888, expected: "750600" },
          { question: 99999999, expected: "294470" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = { question: test.question };

            assert.strictEqual(
              ocra(Std20BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA256-8:C-QN08-PSHA1", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:C-QN08-PSHA1";

        const values = [
          {
            counter: parseInt("00000"),
            question: "12345678",
            expected: "65347737",
          },
          {
            counter: parseInt("00001"),
            question: "12345678",
            expected: "86775851",
          },
          {
            counter: parseInt("00002"),
            question: "12345678",
            expected: "78192410",
          },
          {
            counter: parseInt("00003"),
            question: "12345678",
            expected: "71565254",
          },
          {
            counter: parseInt("00004"),
            question: "12345678",
            expected: "10104329",
          },
          {
            counter: parseInt("00005"),
            question: "12345678",
            expected: "65983500",
          },
          {
            counter: parseInt("00006"),
            question: "12345678",
            expected: "70069104",
          },
          {
            counter: parseInt("00007"),
            question: "12345678",
            expected: "91771096",
          },
          {
            counter: parseInt("00008"),
            question: "12345678",
            expected: "75011558",
          },
          {
            counter: parseInt("00009"),
            question: "12345678",
            expected: "08522129",
          },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              counter: test.counter,
              question: test.question,
              password: PinSha1Hex,
            };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA256-8:QN08-PSHA1", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:QN08-PSHA1";

        const values = [
          { question: "00000000", expected: "83238735" },
          { question: "11111111", expected: "01501458" },
          { question: "22222222", expected: "17957585" },
          { question: "33333333", expected: "86776967" },
          { question: "44444444", expected: "86807031" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = { question: test.question, password: PinSha1Hex };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA256-8:QA08", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA256-8:QA08";

        const values = [
          { question: "SIG10000", expected: "53095496" },
          { question: "SIG11000", expected: "04110475" },
          { question: "SIG12000", expected: "31331128" },
          { question: "SIG13000", expected: "76028668" },
          { question: "SIG14000", expected: "46554205" },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              counter: test.counter,
              question: test.question,
            };

            assert.strictEqual(
              ocra(Std32BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });

      context("Test OCRA-1:HOTP-SHA512-8:QA10-T1M", () => {
        const ocraSuite = "OCRA-1:HOTP-SHA512-8:QA10-T1M";

        const values = [
          {
            question: "SIG1000000",
            timestamp: 1206446760000,
            expected: "77537423",
          },
          {
            question: "SIG1100000",
            timestamp: 1206446760000,
            expected: "31970405",
          },
          {
            question: "SIG1200000",
            timestamp: 1206446760000,
            expected: "10235557",
          },
          {
            question: "SIG1300000",
            timestamp: 1206446760000,
            expected: "95213541",
          },
          {
            question: "SIG1400000",
            timestamp: 1206446760000,
            expected: "65360607",
          },
        ];

        values.forEach((test) => {
          specify(`${test.question}: ${test.expected}`, () => {
            const dataInput = {
              question: test.question,
              timestamp: test.timestamp,
            };

            assert.strictEqual(
              ocra(Std64BytesKeyHex, ocraSuite, dataInput),
              test.expected
            );
          });
        });
      });
    });
  });
});
