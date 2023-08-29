import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';

export class MiguCrypto implements CryptoBase {
  cryptoName = 'Migu3D/Keyless';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) => p.make.Migu3D());
  }

  public static make() {
    return new MiguCrypto();
  }
}
