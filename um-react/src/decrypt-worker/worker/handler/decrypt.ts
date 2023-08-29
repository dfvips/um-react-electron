import { Parakeet, fetchParakeet } from '@jixun/libparakeet';
import { timedLogger, withGroupedLogs as withTimeGroupedLogs } from '~/util/logUtils';
import type { DecryptCommandOptions, DecryptCommandPayload } from '~/decrypt-worker/types';
import { allCryptoFactories } from '../../crypto/CryptoFactory';
import { toArrayBuffer, toBlob } from '~/decrypt-worker/util/buffer';
import { CryptoBase, CryptoFactory } from '~/decrypt-worker/crypto/CryptoBase';
import { UnsupportedSourceFile } from '~/decrypt-worker/util/DecryptError';

// Use first 4MiB of the file to perform check.
const TEST_FILE_HEADER_LEN = 4 * 1024 * 1024;

class DecryptCommandHandler {
  private label: string;

  constructor(
    label: string,
    private parakeet: Parakeet,
    private buffer: ArrayBuffer,
    private options: DecryptCommandOptions
  ) {
    this.label = `DecryptCommandHandler(${label})`;
  }

  log<R>(label: string, fn: () => R): R {
    return timedLogger(`${this.label}: ${label}`, fn);
  }

  async decrypt(factories: CryptoFactory[]) {
    for (const factory of factories) {
      const decryptor = factory();

      try {
        const result = await this.decryptFile(decryptor);
        if (result === null) {
          continue;
        }
        return result;
      } catch (error) {
        if (error instanceof UnsupportedSourceFile) {
          console.debug('WARN: decryptor does not recognize source file, wrong crypto?', error);
        } else {
          console.error('decrypt failed with unknown error: ', error);
        }
      }
    }

    throw new UnsupportedSourceFile('could not decrypt file: no working decryptor found');
  }

  async decryptFile(crypto: CryptoBase) {
    if (crypto.checkBySignature && !(await crypto.checkBySignature(this.buffer, this.options))) {
      return null;
    }

    if (crypto.checkByDecryptHeader && !(await this.acceptByDecryptFileHeader(crypto))) {
      return null;
    }

    const decrypted = await this.log(`decrypt (${crypto.cryptoName})`, () => crypto.decrypt(this.buffer, this.options));

    // Check if we had a successful decryption
    const audioExt = crypto.overrideExtension ?? (await this.detectAudioExtension(decrypted));
    if (crypto.checkByDecryptHeader && audioExt === 'bin') {
      return null;
    }

    return { decrypted: URL.createObjectURL(toBlob(decrypted)), ext: audioExt };
  }

  async detectAudioExtension(data: Blob | ArrayBuffer): Promise<string> {
    return this.log(`detect-audio-ext`, async () => {
      const header = await toArrayBuffer(data.slice(0, TEST_FILE_HEADER_LEN));
      return this.parakeet.detectAudioExtension(header);
    });
  }

  async acceptByDecryptFileHeader(crypto: CryptoBase): Promise<boolean> {
    // File too small, ignore.
    if (this.buffer.byteLength <= TEST_FILE_HEADER_LEN) {
      return true;
    }

    // Check by decrypt max first 8MiB
    const decryptedBuffer = await this.log(`${crypto.cryptoName}/decrypt-header-test`, async () =>
      toArrayBuffer(await crypto.decrypt(this.buffer.slice(0, TEST_FILE_HEADER_LEN), this.options))
    );

    return this.parakeet.detectAudioExtension(decryptedBuffer) !== 'bin';
  }
}

export const workerDecryptHandler = async ({ id, blobURI, options }: DecryptCommandPayload) => {
  const label = `decrypt(${id})`;
  return withTimeGroupedLogs(label, async () => {
    const parakeet = await timedLogger(`${label}/init`, fetchParakeet);
    const blob = await timedLogger(`${label}/fetch-src`, async () => fetch(blobURI).then((r) => r.blob()));
    const buffer = await timedLogger(`${label}/read-src`, async () => blob.arrayBuffer());

    const handler = new DecryptCommandHandler(id, parakeet, buffer, options);
    return handler.decrypt(allCryptoFactories);
  });
};
