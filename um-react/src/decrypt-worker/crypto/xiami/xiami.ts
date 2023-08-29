// Xiami file header
// offset  description
//   0x00  "ifmt"
//   0x04  Format name, e.g. "FLAC".
//   0x08  0xfe, 0xfe, 0xfe, 0xfe
//   0x0C  (3 bytes) Little-endian, size of data to copy without modification.
//         e.g. [ 8a 19 00 ] = 6538 bytes of plaintext data.
//   0x0F  (1 byte) File key, applied to
//   0x10  Plaintext data
//   ????  Encrypted data

import type { CryptoBase } from '../CryptoBase';

// little endian
const XIAMI_FILE_MAGIC = 0x746d6669;
const XIAMI_EXPECTED_PADDING = 0xfefefefe;

const u8Sub = (a: number, b: number) => {
  if (a > b) {
    return a - b;
  }

  return a + 0x100 - b;
};

export class XiamiCrypto implements CryptoBase {
  cryptoName = 'Xiami';
  checkByDecryptHeader = false;

  async checkBySignature(buffer: ArrayBuffer): Promise<boolean> {
    const header = new DataView(buffer);

    return header.getUint32(0x00, true) === XIAMI_FILE_MAGIC && header.getUint32(0x08, true) === XIAMI_EXPECTED_PADDING;
  }

  async decrypt(src: ArrayBuffer): Promise<ArrayBuffer> {
    const headerBuffer = src.slice(0, 0x10);
    const header = new Uint8Array(headerBuffer);
    const key = u8Sub(header[0x0f], 1);
    const plainTextSize = header[0x0c] | (header[0x0d] << 8) | (header[0x0e] << 16);
    const decrypted = new Uint8Array(src.slice(0x10));
    for (let i = decrypted.byteLength - 1; i >= plainTextSize; i--) {
      decrypted[i] = u8Sub(key, decrypted[i]);
    }
    return decrypted;
  }

  public static make() {
    return new XiamiCrypto();
  }
}
