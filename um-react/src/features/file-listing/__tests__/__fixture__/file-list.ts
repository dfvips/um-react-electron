import { DecryptedAudioFile, ProcessState } from '../../fileListingSlice';

export const untouchedFile: DecryptedAudioFile = {
  fileName: 'ready.bin',
  raw: 'blob://localhost/file-a',
  decrypted: '',
  ext: '',
  state: ProcessState.QUEUED,
  errorMessage: null,
  errorCode: null,
  metadata: null,
};

export const completedFile: DecryptedAudioFile = {
  fileName: 'hello-b.bin',
  raw: 'blob://localhost/file-b',
  decrypted: 'blob://localhost/file-b-decrypted',
  ext: 'flac',
  state: ProcessState.COMPLETE,
  errorMessage: null,
  errorCode: null,
  metadata: {
    name: 'Für Alice',
    artist: 'Jixun',
    albumArtist: 'Cipher Lovers',
    album: "NOW That's What I Call Cryptography 2023",
    cover: '',
  },
};

export const fileWithError: DecryptedAudioFile = {
  fileName: 'hello-c.bin',
  raw: 'blob://localhost/file-c',
  decrypted: 'blob://localhost/file-c-decrypted',
  ext: 'flac',
  state: ProcessState.ERROR,
  errorMessage: 'Could not decrypt blah blah',
  errorCode: null,
  metadata: null,
};

export const dummyFiles: Record<string, DecryptedAudioFile> = {
  'file://untouched': untouchedFile,
  'file://completed': completedFile,
  'file://error': fileWithError,
};
