import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import key from './qmc_v1.key.ts';

export class QMC1Crypto implements CryptoBase {
  cryptoName = 'QMC/v1';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) => p.make.QMCv1(key));
  }

  public static make() {
    return new QMC1Crypto();
  }
}
