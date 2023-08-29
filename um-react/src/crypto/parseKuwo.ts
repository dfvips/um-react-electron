import { bytesToUTF8String } from '~/decrypt-worker/util/utf8Encoder';
import { strlen } from './strlen';

export interface KuwoHeader {
  rid: string; // uint64
  encVersion: 1 | 2; // uint32
  quality: string;
}

export function parseKuwoHeader(view: DataView): KuwoHeader | null {
  const magic = view.buffer.slice(view.byteOffset, view.byteOffset + 0x10);
  if (bytesToUTF8String(magic) !== 'yeelion-kuwo-tme') {
    return null; // not kuwo-encrypted file
  }

  const qualityBytes = new Uint8Array(view.buffer.slice(view.byteOffset + 0x30, view.byteOffset + 0x40));
  const qualityLen = strlen(qualityBytes);
  const quality = bytesToUTF8String(qualityBytes.slice(0, qualityLen));

  return {
    encVersion: view.getUint32(0x10, true) as 1 | 2,
    rid: view.getUint32(0x18, true).toString(),
    quality,
  };
}
