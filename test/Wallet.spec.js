
var expect = require('chai').expect;

var Wallet = require('../compiled/Wallet').Wallet;
var crypto = require('../compiled/crypto');

var keys = [
  '1FEhNgioR6W8Ed1B72kEZDPt8Cu1WgHw8g',
  '1SbsBiSdYDJmW8yW2vmQiu43ucQTkSW8S'
];

var privs = [
  '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM',
  '5JjsfGd225bmNNPXZ6b7vGwnTee6a6t1djSKN2ZwXFnajrm6QSz'
];

describe('Wallet', function () {
  var wallet;

  beforeEach(function () {
    wallet = new Wallet(privs);
  });

  it('should list the public keys', function () {
    expect(wallet.keys).to.deep.equal(keys);
  });

  it('should get a single address', function () {
    expect(wallet.address(keys[0]).privateKey).to.equal(privs[0]);
  });

});
