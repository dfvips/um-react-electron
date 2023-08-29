import { transformBlob } from '~/decrypt-worker/util/transformBlob';
import type { CryptoBase } from '../CryptoBase';
import { KGM_SLOT_1_KEY, KGM_TYPE_4_FILE_KEY_EXPANSION_TABLE, KGM_TYPE_4_SLOT_KEY_EXPANSION_TABLE } from './kgm_pc.key';

export class KGMCrypto implements CryptoBase {
  cryptoName = 'KGM/PC';
  checkByDecryptHeader = true;

  async decrypt(buffer: ArrayBuffer): Promise<Blob> {
    return transformBlob(buffer, (p) =>
      p.make.KugouKGM(KGM_SLOT_1_KEY, KGM_TYPE_4_SLOT_KEY_EXPANSION_TABLE, KGM_TYPE_4_FILE_KEY_EXPANSION_TABLE)
    );
  }

  public static make() {
    return new KGMCrypto();
  }
}
