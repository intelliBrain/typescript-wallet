
/// <reference path='../typings/node/node.d.ts'/>

import crypto = require('crypto');
import { Iso10126 } from './padding';

export var AES = {
  CBC : 'aes-256-cbc',
  OFB : 'aes-256-ofb',
  ECB : 'aes-256-ecb'
};

export var ALGORITHMS = {
  SHA1    : 'sha1',
  SHA256  : 'sha256'
};

export function decryptSecretWithSecondPassword(
  secret: string, password: string, sharedKey: string, iterations: number) {
  return decryptAes(secret, sharedKey + password, iterations);
}

export function encryptSecretWithSecondPassword(
  base58: string, password: string, sharedKey: string, iterations: number) {
  return encrypt(base58, sharedKey + password, iterations);
}

export function cipherFunction(
  password: string, sharedKey: string, iterations: number, operation: string) {
  var id = function (msg) { return msg; };
  if (!password || !sharedKey || !iterations) { return id; }
  else {
    switch(operation) {
      case 'enc':
        return function (msg) {
          return encryptSecretWithSecondPassword(msg, password, sharedKey, iterations);
        };
      case 'dec':
        return function (msg) {
          return decryptSecretWithSecondPassword(msg, password, sharedKey, iterations);
        };
      default:
        return id;
    };
  }
}

export function encrypt(
  data: string, password: string, iterations: number) {
  var SALT_BYTES  = 16
    , KEY_BIT_LEN = 256;

  var salt  = crypto.randomBytes(SALT_BYTES)
    , key   = stretchPassword(password, salt, iterations, KEY_BIT_LEN / 8);

  var cipher = crypto.createCipheriv(AES.CBC, key, salt);
  cipher.setAutoPadding(false);

  var dataBuffer  = new Buffer(data, 'utf8')
    , dataPadded  = Iso10126.pad(dataBuffer, KEY_BIT_LEN);

  var encrypted = Buffer.concat([ cipher.update(dataPadded), cipher.final() ])
    , payload   = salt.toString('hex') + encrypted.toString('hex');

  return new Buffer(payload, 'hex').toString('base64');
}

export function decryptAes(
  data: string, password: string, iterations: number, options?: any) {
  options = options || {};
  var SALT_BYTES  = 16
    , KEY_BIT_LEN = 256;

  var dataHex = new Buffer(data, 'base64').toString('hex')
    , salt    = new Buffer(dataHex.slice(0, SALT_BYTES * 2), 'hex')
    , payload = dataHex.slice(SALT_BYTES * 2)
    , key     = stretchPassword(password, salt, iterations, KEY_BIT_LEN / 8);

  var decipher = crypto.createDecipheriv(options.mode || AES.CBC, key, salt);
  decipher.setAutoPadding(false);

  var decryptedBase64 = decipher.update(payload, 'hex', 'base64') + decipher.final('base64')
    , decryptedBytes  = new Buffer(decryptedBase64, 'base64')
    , unpaddedBytes   = (options.padding || Iso10126).unpad(decryptedBytes);

  return unpaddedBytes.toString('utf8');
}

export function stretchPassword(
  password: string, salt: Buffer, iterations: number, keylen: number, algorithm?: string) {
  algorithm = algorithm || ALGORITHMS.SHA1;
  var iv = salt.toString('binary');
  return crypto.pbkdf2Sync(password, iv, iterations, keylen, algorithm);
}
