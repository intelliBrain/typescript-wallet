
import { Address } from './Address';

export class Wallet {
  _addresses: Address[];

  constructor(addresses: string[]) {
    this._addresses = addresses.map(Address.factory);
  }

  get addresses(): Address[] {
    return this._addresses;
  }

  get keys(): string[] {
    return this._addresses.map(k => k.publicKey);
  }

  inspect(): string {
    return this.toString();
  }

  toString(): string {
    return `Wallet [ ${this.addresses.map(k => k.toString()).join(', ')} ]`;
  }

}
