function isPromise<T = unknown>(p: unknown): p is Promise<T> {
  return !!p && typeof p === 'object' && 'then' in p && 'catch' in p && 'finally' in p;
}

export function wrapFunctionCall<R = unknown>(pre: () => void, post: () => void, fn: () => R): R {
  pre();

  try {
    const result = fn();

    if (isPromise(result)) {
      result.finally(post);
    }

    return result;
  } catch (e) {
    post();
    throw e;
  }
}
