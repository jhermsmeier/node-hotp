var assert = require( 'assert' )
var hotp = require( '..' )

describe( 'HOTP', function() {

  context( 'RFC 4226', function() {

    context( 'Section 5.4', function() {

      specify( 'hotp.truncate()', function() {

        var hmac = Buffer.from( '1f8698690e02ca16618550ef7f19da8e945b555a', 'hex' )
        var value = hotp.truncate( hmac, 6 )
        var expected = 872921

        assert.strictEqual( value, expected )

      })

    })

    context( 'Appendix D - HOTP Algorithm: Test Values', function() {

      var key = '12345678901234567890'
      var values = [
        { counter: 0, hex: '4c93cf18', number: 1284755224, value: '755224' },
        { counter: 1, hex: '41397eea', number: 1094287082, value: '287082' },
        { counter: 2, hex: '82fef30', number: 137359152, value: '359152' },
        { counter: 3, hex: '66ef7655', number: 1726969429, value: '969429' },
        { counter: 4, hex: '61c5938a', number: 1640338314, value: '338314' },
        { counter: 5, hex: '33c083d4', number: 868254676, value: '254676' },
        { counter: 6, hex: '7256c032', number: 1918287922, value: '287922' },
        { counter: 7, hex: '4e5b397', number: 82162583, value: '162583' },
        { counter: 8, hex: '2823443f', number: 673399871, value: '399871' },
        { counter: 9, hex: '2679dc69', number: 645520489, value: '520489' },
      ]

      values.forEach( function( test ) {
        specify( `${test.counter}: ${test.value}`, function() {
          assert.strictEqual( hotp( key, test.counter, 6 ), test.value )
        })
      })

    })

  })

})
