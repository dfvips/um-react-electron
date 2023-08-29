type NextTickFn = (callback: () => void) => void;

/* c8 ignore start */
const nextTickFn =
  typeof setImmediate !== 'undefined'
    ? (setImmediate as NextTickFn)
    : typeof requestAnimationFrame !== 'undefined'
    ? (requestAnimationFrame as NextTickFn)
    : (setTimeout as NextTickFn);
/* c8 ignore stop */

export async function nextTickAsync() {
  return new Promise<void>((resolve) => nextTickFn(resolve));
}
