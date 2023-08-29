import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '~/store';

import type { DecryptionResult } from '~/decrypt-worker/constants';
import type { DecryptCommandOptions } from '~/decrypt-worker/types';
import { decryptionQueue } from '~/decrypt-worker/client';
import { DecryptErrorType } from '~/decrypt-worker/util/DecryptError';
import { selectQMCv2KeyByFileName, selectKWMv2Key } from '../settings/settingsSelector';

export enum ProcessState {
  QUEUED = 'QUEUED',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export enum ListingMode {
  LIST = 'LIST',
  CARD = 'CARD',
}

export interface AudioMetadata {
  name: string;
  artist: string;
  album: string;
  albumArtist: string;
  cover: string; // blob uri
}

export interface DecryptedAudioFile {
  fileName: string;
  raw: string; // blob uri
  ext: string;
  decrypted: string; // blob uri
  state: ProcessState;
  errorMessage: null | string;
  errorCode: null | DecryptErrorType | string;
  metadata: null | AudioMetadata;
}

export interface FileListingState {
  files: Record<string, DecryptedAudioFile>;
  displayMode: ListingMode;
}
const initialState: FileListingState = {
  files: Object.create(null),
  displayMode: ListingMode.LIST,
};

export const processFile = createAsyncThunk<
  DecryptionResult,
  { fileId: string },
  { rejectValue: { message: string; stack?: string } }
>('fileListing/processFile', async ({ fileId }, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const file = selectFiles(state)[fileId];
  if (!file) {
    const { message, stack } = new Error('ERROR: File not found');
    return thunkAPI.rejectWithValue({ message, stack });
  }

  const onPreProcess = () => {
    thunkAPI.dispatch(setFileAsProcessing({ id: fileId }));
  };

  const fileHeader = await fetch(file.raw, {
    headers: {
      Range: 'bytes=0-1023',
    },
  })
    .then((r) => r.blob())
    .then((r) => r.arrayBuffer());

  const options: DecryptCommandOptions = {
    qmc2Key: selectQMCv2KeyByFileName(state, file.fileName),
    kwm2key: selectKWMv2Key(state, new DataView(fileHeader)),
  };
  return decryptionQueue.add({ id: fileId, blobURI: file.raw, options }, onPreProcess);
});

export const fileListingSlice = createSlice({
  name: 'fileListing',
  initialState,
  reducers: {
    addNewFile: (state, { payload }: PayloadAction<{ id: string; fileName: string; blobURI: string }>) => {
      state.files[payload.id] = {
        fileName: payload.fileName,
        raw: payload.blobURI,
        decrypted: '',
        ext: '',
        state: ProcessState.QUEUED,
        errorMessage: null,
        errorCode: null,
        metadata: null,
      };
    },
    setDecryptedContent: (state, { payload }: PayloadAction<{ id: string; decryptedBlobURI: string }>) => {
      const file = state.files[payload.id];
      if (file) {
        file.decrypted = payload.decryptedBlobURI;
      }
    },
    setFileAsProcessing: (state, { payload }: PayloadAction<{ id: string }>) => {
      const file = state.files[payload.id];
      if (file) {
        file.state = ProcessState.PROCESSING;
      }
    },
    deleteFile: (state, { payload }: PayloadAction<{ id: string }>) => {
      if (state.files[payload.id]) {
        const file = state.files[payload.id];
        if (file.decrypted) {
          URL.revokeObjectURL(file.decrypted);
        }
        if (file.raw) {
          URL.revokeObjectURL(file.raw);
        }
        delete state.files[payload.id];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(processFile.fulfilled, (state, action) => {
      const { fileId } = action.meta.arg;
      const file = state.files[fileId];
      if (!file) return;

      file.state = ProcessState.COMPLETE;
      file.decrypted = action.payload.decrypted;
      file.ext = action.payload.ext;
      // TODO: populate file metadata
    });

    builder.addCase(processFile.rejected, (state, action) => {
      const { fileId } = action.meta.arg;
      const file = state.files[fileId];
      if (!file) return;

      file.errorMessage = action.error.message ?? 'unknown error';
      file.errorCode = action.error.code ?? null;
      file.state = ProcessState.ERROR;
    });
  },
});

export const { addNewFile, setFileAsProcessing, setDecryptedContent, deleteFile } = fileListingSlice.actions;

export const selectFileCount = (state: RootState) => state.fileListing.files.length;
export const selectFiles = (state: RootState) => state.fileListing.files;
export const selectFileListingMode = (state: RootState) => state.fileListing.displayMode;

export default fileListingSlice.reducer;
