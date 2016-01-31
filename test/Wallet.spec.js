
var expect = require('chai').expect;

var Wallet = require('../compiled/Wallet').Wallet;

var keys = [
  '1FEhNgioR6W8Ed1B72kEZDPt8Cu1WgHw8g',
  '1SbsBiSdYDJmW8yW2vmQiu43ucQTkSW8S'
];

var privs = [
  '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM',
  '5JjsfGd225bmNNPXZ6b7vGwnTee6a6t1djSKN2ZwXFnajrm6QSz'
];

describe('Wallet', function () {

  it('should initialize', function () {
    var wallet = new Wallet(privs);
    expect(wallet.keys).to.deep.equal(keys);
  });

});
