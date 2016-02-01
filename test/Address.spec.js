
var expect = require('chai').expect;

var Address = require('../compiled/Address').Address;

var key   = '1FEhNgioR6W8Ed1B72kEZDPt8Cu1WgHw8g'
  , priv  = '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM';

describe('Address', function () {

  it('should get initialized with a priv key', function () {
    var address = new Address(priv);
    expect(address.privateKey).to.equal(priv);
    expect(address.publicKey).to.equal(key);
  });

  it('should work as a watch only address', function () {
    var watch = new Address(key);
    expect(watch.publicKey).to.equal(key);
    expect(watch.watchOnly).to.equal(true);
  });

  it('should generate a new address', function () {
    var generated = new Address();
    expect(generated.publicKey).to.have.length.above(0);
    expect(generated.privateKey).to.have.length.above(0);
  });

});
