import type { CryptoBase } from '../CryptoBase';

export class TransparentCrypto implements CryptoBase {
  cryptoName = 'Transparent';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return new Blob([buffer]);
  }

  public static make() {
    return new TransparentCrypto();
  }
}
