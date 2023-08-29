export const utf8Encoder = new TextEncoder();
export const utf8Decoder = new TextDecoder('utf-8');

export function stringToUTF8Bytes(str: string) {
  return utf8Encoder.encode(str);
}

export function bytesToUTF8String(str: BufferSource) {
  return utf8Decoder.decode(str);
}
