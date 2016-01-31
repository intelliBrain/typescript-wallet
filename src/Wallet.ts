
import { Address } from './Address';

export class Wallet {
  addresses: Address[];

  constructor(addresses: string[]) {
    this.addresses = addresses.map(Address.factory);
  }

}
