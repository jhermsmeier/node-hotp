var assert = require("assert");
var { truncate } = require("../lib/utils");

describe("HOTP", () => {
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
