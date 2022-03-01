const assert = require("assert");
const hotp = require("..");

describe("HOTP", () => {
  context("RFC 4226", () => {
    context("Appendix D - HOTP Algorithm: Test Values", () => {
      const key = "12345678901234567890";
      const values = [
        { counter: 0, hex: "4c93cf18", number: 1284755224, value: "755224" },
        { counter: 1, hex: "41397eea", number: 1094287082, value: "287082" },
        { counter: 2, hex: "82fef30", number: 137359152, value: "359152" },
        { counter: 3, hex: "66ef7655", number: 1726969429, value: "969429" },
        { counter: 4, hex: "61c5938a", number: 1640338314, value: "338314" },
        { counter: 5, hex: "33c083d4", number: 868254676, value: "254676" },
        { counter: 6, hex: "7256c032", number: 1918287922, value: "287922" },
        { counter: 7, hex: "4e5b397", number: 82162583, value: "162583" },
        { counter: 8, hex: "2823443f", number: 673399871, value: "399871" },
        { counter: 9, hex: "2679dc69", number: 645520489, value: "520489" },
      ];

      values.forEach(function (test) {
        specify(`${test.counter}: ${test.value}`, () => {
          assert.strictEqual(hotp(key, test.counter, 6), test.value);
        });
      });
    });
  });
});
