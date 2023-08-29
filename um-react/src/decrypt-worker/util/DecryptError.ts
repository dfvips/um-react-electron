export enum DecryptErrorType {
  UNSUPPORTED_FILE = 'UNSUPPORTED_FILE',
  UNKNOWN = 'UNKNOWN',
}

export class DecryptError extends Error {
  code = DecryptErrorType.UNKNOWN;

  toJSON() {
    const { name, message, stack, code } = this;
    return { name, message, stack, code };
  }
}

export class UnsupportedSourceFile extends DecryptError {
  code = DecryptErrorType.UNSUPPORTED_FILE;
}
