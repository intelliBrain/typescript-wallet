
import { Address } from './Address';

interface IAddressJSON {
  addr: string;
  priv: string;
  tag: number;
  label: string;
  created_time: number;
  created_device_name: string;
  created_device_version: string;
}

export class BlockchainAddress extends Address {
  _active: boolean;
  _label: string;
  _createdTime: number;
  _createdDeviceName: string;
  _createdDeviceVersion: string;

  constructor(address: IAddressJSON) {
    super(address.priv || address.addr);
    this._active = address.tag === 0;
    this._label = address.label;
    this._createdTime = address.created_time;
    this._createdDeviceName = address.created_device_name;
    this._createdDeviceVersion = address.created_device_version;
  }

  get active(): boolean {
    return this._active;
  }

  get archived(): boolean {
    return !this._active;
  }

  get label(): string {
    return this._label;
  }

  get createdMeta() {
    return {
      time: this._createdTime,
      deviceName: this._createdDeviceName,
      deviceVersion: this._createdDeviceVersion
    };
  }

  static factory(a: IAddressJSON | string): Address {
    return ('object' === typeof a) ?
      new BlockchainAddress(<IAddressJSON>a) : Address.factory(<string>a);
  }

}
