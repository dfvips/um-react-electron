export function splitN(str: string, sep: string, maxN: number) {
  if (maxN <= 1) {
    return [str];
  }

  const chunks: string[] = [];
  const lenSep = sep.length;
  let searchIdx = 0;
  for (; maxN > 1; maxN--) {
    const nextIdx = str.indexOf(sep, searchIdx);
    if (nextIdx === -1) {
      break;
    }
    chunks.push(str.slice(searchIdx, nextIdx));
    searchIdx = nextIdx + lenSep;
  }

  chunks.push(str.slice(searchIdx));
  return chunks;
}
