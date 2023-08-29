import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import type { DecryptCommandOptions } from '~/decrypt-worker/types.ts';
import { SEED, ENC_V2_KEY_1, ENC_V2_KEY_2 } from './qmc_v2.key.ts';
import { fetchParakeet } from '@jixun/libparakeet';
import { stringToUTF8Bytes } from '~/decrypt-worker/util/utf8Encoder.ts';
import { makeQMCv2KeyCrypto } from '~/decrypt-worker/util/qmc2KeyCrypto.ts';

export class QMC2Crypto implements CryptoBase {
  cryptoName = 'QMC/v2';
  checkByDecryptHeader = false;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    const parakeet = await fetchParakeet();
    const footerParser = parakeet.make.QMCv2FooterParser(SEED, ENC_V2_KEY_1, ENC_V2_KEY_2);
    return transformBlob(buffer, (p) => p.make.QMCv2(footerParser), {
      parakeet,
      cleanup: () => footerParser.delete(),
    });
  }

  public static make() {
    return new QMC2Crypto();
  }
}

export class QMC2CryptoWithKey implements CryptoBase {
  cryptoName = 'QMC/v2 (key)';
  checkByDecryptHeader = true;

  async checkBySignature(_buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<boolean> {
    return Boolean(options.qmc2Key);
  }

  async decrypt(buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<Blob> {
    if (!options.qmc2Key) {
      throw new Error('key was not provided');
    }

    const parakeet = await fetchParakeet();
    const key = stringToUTF8Bytes(options.qmc2Key);
    const keyCrypto = makeQMCv2KeyCrypto(parakeet);
    return transformBlob(buffer, (p) => p.make.QMCv2EKey(key, keyCrypto), {
      parakeet,
      cleanup: () => keyCrypto.delete(),
    });
  }

  public static make() {
    return new QMC2CryptoWithKey();
  }
}
