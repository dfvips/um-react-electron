export function formatHex(value: number, len = 8) {
  return '0x' + (value | 0).toString(16).padStart(len, '0');
}
