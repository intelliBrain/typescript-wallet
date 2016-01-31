
import bitcoinjs = require('bitcoinjs-lib');

export class Address {
  _keyPair: any;

  constructor(key: string) {
    this._keyPair = bitcoinjs.ECPair.fromWIF(key);
  }

  get publicKey(): string {
    return this._keyPair.getAddress();
  }

  get privateKey(): string {
    return this._keyPair.toWIF();
  }

  inspect(): string {
    return this.toString();
  }

  toString(): string {
    return `Address { ${this.publicKey} }`;
  }

  static factory(key: string): Address {
    return new Address(key);
  }

}