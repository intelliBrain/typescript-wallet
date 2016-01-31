
var expect = require('chai').expect;

var Address = require('../compiled/Address').Address;

var key   = '1FEhNgioR6W8Ed1B72kEZDPt8Cu1WgHw8g'
  , priv  = '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM';

describe('Address', function () {

  it('should initialize', function () {
    var address = new Address(priv);
    expect(address.privateKey).to.equal(priv);
    expect(address.publicKey).to.equal(key);
  });

});
