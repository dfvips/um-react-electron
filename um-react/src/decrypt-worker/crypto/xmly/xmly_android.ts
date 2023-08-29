import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase.js';
import { XimalayaAndroidKey, XimalayaX2MKey, XimalayaX3MKey } from './xmly_android.key.js';

export class XimalayaAndroidCrypto implements CryptoBase {
  cryptoName = 'Ximalaya/Android';
  checkByDecryptHeader = true;
  constructor(private key: XimalayaAndroidKey) {}

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    const { contentKey, init, step } = this.key;
    return transformBlob(buffer, (p) => {
      const transformer = p.make.XimalayaAndroid(init, step, contentKey);
      if (!transformer) {
        throw new Error('could not make xmly transformer, is key invalid?');
      }

      return transformer;
    });
  }

  public static makeX2M() {
    return new XimalayaAndroidCrypto(XimalayaX2MKey);
  }

  public static makeX3M() {
    return new XimalayaAndroidCrypto(XimalayaX3MKey);
  }
}
