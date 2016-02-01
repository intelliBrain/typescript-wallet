
import { Wallet } from './Wallet';

interface IWalletJSON {
  guid: string;
  sharedKey: string;
  double_encryption: boolean;
  options: {
    pbkdf2_iterations: number;
    fee_per_kb: number;
    html5_notifications: boolean;
    logout_time: number;
  };
  address_book: {}[];
  tx_notes: {};
  tx_names: {}[];
  keys: string[];
  paidTo: {};
}

export class BlockchainWallet extends Wallet {
  _guid: string;
  _sharedKey: string;
  _doubleEncryption: boolean;
  _pbkdf2Iterations: number;
  _feePerKB: number;
  _html5Notifications: boolean;
  _logoutTime: number;
  _addressBook: {}[];
  _txNotes: {};

  constructor(wallet: IWalletJSON) {
    super(wallet.keys);
    this._guid = wallet.guid;
    this._sharedKey = wallet.sharedKey;
    this._doubleEncryption = wallet.double_encryption;
    this._pbkdf2Iterations = wallet.options.pbkdf2_iterations;
    this._feePerKB = wallet.options.fee_per_kb;
    this._html5Notifications = wallet.options.html5_notifications;
    this._logoutTime = wallet.options.logout_time;
    this._addressBook = wallet.address_book;
    this._txNotes = wallet.tx_notes;
  }

  get guid(): string {
    return this._guid;
  }

  get sharedKey(): string {
    return this._sharedKey;
  }

  get doubleEncryption(): boolean {
    return this._doubleEncryption;
  }

  get pbkdf2Iterations(): number {
    return this._pbkdf2Iterations;
  }

  get feePerKB(): number {
    return this._feePerKB;
  }

  get logoutTime(): number {
    return this._logoutTime;
  }

}
