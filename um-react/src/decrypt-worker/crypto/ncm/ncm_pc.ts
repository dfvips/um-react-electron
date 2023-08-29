import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { NCM_KEY, NCM_MAGIC_HEADER } from './ncm_pc.key';

export class NCMCrypto implements CryptoBase {
  cryptoName = 'NCM/PC';
  checkByDecryptHeader = false;

  async checkBySignature(buffer: ArrayBuffer) {
    const view = new DataView(buffer, 0, NCM_MAGIC_HEADER.byteLength);
    return NCM_MAGIC_HEADER.every((value, i) => value === view.getUint8(i));
  }

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) => p.make.NeteaseNCM(NCM_KEY));
  }

  public static make() {
    return new NCMCrypto();
  }
}
