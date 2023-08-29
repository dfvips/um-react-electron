import type { DecryptCommandOptions } from '~/decrypt-worker/types';

export interface CryptoBase {
  cryptoName: string;
  checkByDecryptHeader: boolean;

  /**
   * If set, this new extension will be used instead.
   * Useful for non-audio format, e.g. qrc to lrc/xml.
   */
  overrideExtension?: string;

  checkBySignature?: (buffer: ArrayBuffer, options: DecryptCommandOptions) => Promise<boolean>;
  decrypt(buffer: ArrayBuffer, options: DecryptCommandOptions): Promise<Blob | ArrayBuffer>;
}

export type CryptoFactory = () => CryptoBase;
