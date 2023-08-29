import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { KWM_KEY } from './kwm.key';
import { DecryptCommandOptions } from '~/decrypt-worker/types';
import { makeQMCv2KeyCrypto } from '~/decrypt-worker/util/qmc2KeyCrypto';
import { fetchParakeet } from '@jixun/libparakeet';
import { stringToUTF8Bytes } from '~/decrypt-worker/util/utf8Encoder';

// v1 only
export class KWMCrypto implements CryptoBase {
  cryptoName = 'KWM';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer, opts: DecryptCommandOptions): Promise<Blob> {
    const kwm2key = opts.kwm2key ?? '';

    const parakeet = await fetchParakeet();
    const keyCrypto = makeQMCv2KeyCrypto(parakeet);
    return transformBlob(buffer, (p) => p.make.KuwoKWMv2(KWM_KEY, stringToUTF8Bytes(kwm2key), keyCrypto), {
      cleanup: () => keyCrypto.delete(),
      parakeet,
    });
  }

  public static make() {
    return new KWMCrypto();
  }
}
