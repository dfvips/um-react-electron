export function strlen(data: Uint8Array): number {
  const n = data.byteLength;
  for (let i = 0; i < n; i++) {
    if (data[i] === 0) {
      return i;
    }
  }
  return n;
}
