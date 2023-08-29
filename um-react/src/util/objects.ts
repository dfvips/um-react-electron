export function* enumObject<T>(obj: Record<string, T> | null | void): Generator<[string, T]> {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      yield [key, obj[key]];
    }
  }
}

export const { hasOwn } = Object;
