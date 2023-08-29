export enum DECRYPTION_WORKER_ACTION_NAME {
  DECRYPT = 'DECRYPT',
  VERSION = 'VERSION',
}

export interface DecryptionResult {
  decrypted: string; // blob uri
  ext: string;
}
