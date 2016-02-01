
/// <reference path='../node_modules/bitcoinjs-lib/type-definitions/bitcoinjs.d.ts'/>

import bitcoinjs = require('bitcoinjs-lib');

export class Address {
  _publicKey: string;
  _privateKey: string;
  _temporalPrivateKey: string;

  constructor(key?: string) {
    if (Address.isPublicKey(key)) {
      this._publicKey = key;
    } else {
      let keyPair = key ? bitcoinjs.ECPair.fromWIF(key) : bitcoinjs.ECPair.makeRandom();
      this._publicKey = keyPair.getAddress();
      this._privateKey = keyPair.toWIF();
    }
  }

  get publicKey(): string {
    return this._publicKey;
  }

  get privateKey(): string {
    return this._privateKey;
  }

  get watchOnly(): boolean {
    return !this.privateKey;
  }

  encrypt(cipher): Address {
    if (!this.watchOnly) {
      this._temporalPrivateKey = cipher(this.privateKey);
      if (!this._temporalPrivateKey) throw 'ERR_ENCRYPT';
    }
    return this;
  }

  decrypt(cipher): Address {
    if (!this.watchOnly) {
      this._temporalPrivateKey = cipher(this.privateKey);
      if (!this._temporalPrivateKey) throw 'ERR_DECRYPT';
    }
    return this;
  }

  persist(): void {
    if (this._temporalPrivateKey) {
      this._privateKey = this._temporalPrivateKey;
      delete this._temporalPrivateKey;
    }
  }

  inspect(): string {
    return this.toString();
  }

  toString(): string {
    return `Address { ${this.publicKey} }`;
  }

  static isPublicKey(key: string): boolean {
    try       { return bitcoinjs.address.fromBase58Check(key).version === 0; }
    catch (e) { return false; }
  }

  static factory(key: string): Address {
    return new Address(key);
  }

}
