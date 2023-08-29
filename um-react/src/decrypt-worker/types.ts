export interface DecryptCommandOptions {
  qmc2Key?: string;
  kwm2key?: string;
}

export interface DecryptCommandPayload {
  id: string;
  blobURI: string;
  options: DecryptCommandOptions;
}
