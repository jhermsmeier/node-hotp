var assert = require( 'assert' )
var hotp = require( '..' )
var totp = hotp.totp

describe( 'HOTP', function() {

  context( 'RFC 6238', function() {

    var keySHA1 = '12345678901234567890'
    var keySHA256 = '12345678901234567890123456789012'
    var keySHA512 = '1234567890123456789012345678901234567890123456789012345678901234'

    var values = [
      { key: keySHA1, time: 59, t: 0x0000000000000001, token: '94287082', algorithm: 'sha1' },
      { key: keySHA256, time: 59, t: 0x0000000000000001, token: '46119246', algorithm: 'sha256' },
      { key: keySHA512, time: 59, t: 0x0000000000000001, token: '90693936', algorithm: 'sha512' },
      { key: keySHA1, time: 1111111109, t: 0x00000000023523EC, token: '07081804', algorithm: 'sha1' },
      { key: keySHA256, time: 1111111109, t: 0x00000000023523EC, token: '68084774', algorithm: 'sha256' },
      { key: keySHA512, time: 1111111109, t: 0x00000000023523EC, token: '25091201', algorithm: 'sha512' },
      { key: keySHA1, time: 1111111111, t: 0x00000000023523ED, token: '14050471', algorithm: 'sha1' },
      { key: keySHA256, time: 1111111111, t: 0x00000000023523ED, token: '67062674', algorithm: 'sha256' },
      { key: keySHA512, time: 1111111111, t: 0x00000000023523ED, token: '99943326', algorithm: 'sha512' },
      { key: keySHA1, time: 1234567890, t: 0x000000000273EF07, token: '89005924', algorithm: 'sha1' },
      { key: keySHA256, time: 1234567890, t: 0x000000000273EF07, token: '91819424', algorithm: 'sha256' },
      { key: keySHA512, time: 1234567890, t: 0x000000000273EF07, token: '93441116', algorithm: 'sha512' },
      { key: keySHA1, time: 2000000000, t: 0x0000000003F940AA, token: '69279037', algorithm: 'sha1' },
      { key: keySHA256, time: 2000000000, t: 0x0000000003F940AA, token: '90698825', algorithm: 'sha256' },
      { key: keySHA512, time: 2000000000, t: 0x0000000003F940AA, token: '38618901', algorithm: 'sha512' },
      { key: keySHA1, time: 20000000000, t: 0x0000000027BC86AA, token: '65353130', algorithm: 'sha1' },
      { key: keySHA256, time: 20000000000, t: 0x0000000027BC86AA, token: '77737706', algorithm: 'sha256' },
      { key: keySHA512, time: 20000000000, t: 0x0000000027BC86AA, token: '47863826', algorithm: 'sha512' },
    ]

    context( 'Section 4.2', function() {
      values.forEach( function( test ) {
        specify( `${test.time} -> ${test.t}`, function() {
          assert.strictEqual( totp.t( test.time, 0, 30 ), test.t )
        })
      })
    })

    context( 'Appendix B.  Test Vectors', function() {

      values.forEach( function( test ) {
        specify( `${test.algorithm}(${test.time}): ${test.token}`, function() {
          var token = totp( test.key, {
            time: test.time,
            algorithm: test.algorithm,
            digits: test.token.length,
          })
          assert.strictEqual( token, test.token )
        })
      })

    })

  })

})


