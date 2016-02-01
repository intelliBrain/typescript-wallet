
var expect = require('chai').expect;

var BlockchainWallet = require('../compiled/BlockchainWallet').BlockchainWallet;

var walletJSON = {
  guid: 'asdf',
  sharedKey: 'asdf',
  options: {
    pbkdf2_iterations: 5000
  },
  keys: [
    '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM',
    '5JjsfGd225bmNNPXZ6b7vGwnTee6a6t1djSKN2ZwXFnajrm6QSz'
  ]
};

describe('BlockchainWallet', function () {
  var wallet;

  beforeEach(function () {
    wallet = new BlockchainWallet(walletJSON);
  });

  it('should have a guid', function () {
    expect(wallet.guid).to.equal(walletJSON.guid);
  });

});
