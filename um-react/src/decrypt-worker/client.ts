import { WorkerClientBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';
import { DecryptionQueue } from '~/util/DecryptionQueue';

// TODO: Worker pool?
export const workerClient = new Worker(new URL('./worker', import.meta.url), { type: 'module' });

// FIXME: report the error so is obvious to the user.
workerClient.addEventListener('error', console.error);

export const workerClientBus = new WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>(workerClient);
export const decryptionQueue = new DecryptionQueue(workerClientBus);
