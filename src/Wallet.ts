
import { Address } from './Address';
import { BlockchainAddress } from './BlockchainAddress';
import { OrderedMap } from 'immutable';
import { cipherFunction } from './crypto';

export class Wallet {
  _addresses: OrderedMap<any, any>;

  constructor(addresses: string[]) {
    this._addresses = addresses.map(BlockchainAddress.factory)
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

  encrypt(password: string, sharedKey: string, iterations: number): void {
    let cipher = cipherFunction(password, sharedKey, iterations, 'enc');
    this._addresses.forEach(a => a.encrypt(cipher).persist());
  }

  decrypt(password: string, sharedKey: string, iterations: number): void {
    let cipher = cipherFunction(password, sharedKey, iterations, 'dec');
    this._addresses.forEach(a => a.decrypt(cipher).persist());
  }

  inspect(): string {
    return this.toString();
  }

  toString(): string {
    return `Wallet [ ${this.addresses.map(k => k.toString()).join(', ')} ]`;
  }

}
