
var expect = require('chai').expect;

var BlockchainAddress = require('../compiled/BlockchainAddress').BlockchainAddress;

var addressJSON = {
  addr: '1FEhNgioR6W8Ed1B72kEZDPt8Cu1WgHw8g',
  priv: '5JXoutqCU5BZ8NXduUmyurw1Yk5XqndkENwpWq96Cpetk6GCmFM',
  tag: 0,
  label: 'test_address',
  created_time: 1447772631997,
  created_device_name: 'javascript_web',
  created_device_version: '3.0'
};

describe('BlockchainAddress', function () {
  var address;

  beforeEach(function () {
    address = new BlockchainAddress(addressJSON);
  });

  it('should inherit private and public keys', function () {
    expect(address.publicKey).to.equal(addressJSON.addr);
    expect(address.privateKey).to.equal(addressJSON.priv);
  });

  it('should be active', function () {
    expect(address.active).to.equal(true);
    expect(address.archived).to.equal(false);
  });

  it('should have the correct label', function () {
    expect(address.label).to.equal(addressJSON.label);
  });

});
