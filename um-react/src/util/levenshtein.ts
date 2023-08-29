// translation of pseudocode from Wikipedia:
import { stringToUTF8Bytes } from '~/decrypt-worker/util/utf8Encoder';

// https://en.wikipedia.org/wiki/Levenshtein_distance#Iterative_with_two_matrix_rows
export function levenshtein(str1: string, str2: string) {
  if (str1 === str2) {
    return 0;
  }

  if (str1.length === 0) {
    return str2.length;
  } else if (str2.length === 0) {
    return str1.length;
  }

  // Convert them to Uint8Array to avoid expensive string APIs.
  const s = stringToUTF8Bytes(str1.normalize().toLowerCase());
  const t = stringToUTF8Bytes(str2.normalize().toLowerCase());
  const m = s.byteLength;
  const n = t.byteLength;

  // create two work vectors of integer distances
  let v0 = new Uint32Array(n + 1);
  let v1 = new Uint32Array(n + 1);

  // initialize v0 (the previous row of distances)
  // this row is A[0][i]: edit distance from an empty s to t;
  // that distance is the number of characters to append to  s to make t.
  for (let i = 0; i <= n; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < m; i++) {
    // calculate v1 (current row distances) from the previous row v0

    // first element of v1 is A[i + 1][0]
    //   edit distance is delete (i + 1) chars from s to match empty t
    v1[0] = i + 1;

    // use formula to fill in the rest of the row
    for (let j = 0; j < n; j++) {
      // calculating costs for A[i + 1][j + 1]
      const deletionCost = v0[j + 1] + 1;
      const insertionCost = v1[j] + 1;
      const substitutionCost = v0[j] + (s[i] === t[j] ? 0 : 1);
      v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost);
    }

    // copy v1 (current row) to v0 (previous row) for next iteration
    // since data in v1 is always invalidated, a swap without copy could be more efficient
    [v0, v1] = [v1, v0];
  }

  // after the last swap, the results of v1 are now in v0
  return v0[n];
}

export function closestByLevenshtein(str: string, candidates: string[]) {
  // Faster than pre-calculate all and pass scores to Math.min.
  const n = candidates.length;
  if (n === 0) {
    throw new Error('empty candidates');
  }

  let lowestIdx = 0;
  let lowestScore = levenshtein(str, candidates[0]);

  for (let i = 1; i < n; i++) {
    const score = levenshtein(str, candidates[i]);
    if (score < lowestScore) {
      lowestScore = score;
      lowestIdx = i;
    }
  }

  return candidates[lowestIdx];
}
