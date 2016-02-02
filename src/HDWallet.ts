
import { Wallet } from './Wallet';

// not implemented
interface Account {
  xpub: string;
}

export class HDWallet extends Wallet {
  _accounts: Account[];

  constructor(accounts: string[], addresses: string[]) {
    super(addresses);
  }

  get accounts(): Account[] {
    return [];
  }

  get xpubs(): string[] {
    return [];
  }

}
