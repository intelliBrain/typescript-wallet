
import { Address } from './Address';
import { OrderedMap } from 'immutable';

export class Wallet {
  _addresses: OrderedMap<any, any>;

  constructor(addresses: string[]) {
    this._addresses = addresses.map(Address.factory)
      .reduce((acc, a) => acc.set(a.publicKey, a), OrderedMap());
  }

  get addresses(): Address[] {
    return this._addresses.toArray();
  }

  get keys(): string[] {
    return this._addresses.flip().toArray();
  }

  address(publicKey: string): string {
    return this._addresses.get(publicKey);
  }

  inspect(): string {
    return this.toString();
  }

  toString(): string {
    return `Wallet [ ${this.addresses.map(k => k.toString()).join(', ')} ]`;
  }

}
