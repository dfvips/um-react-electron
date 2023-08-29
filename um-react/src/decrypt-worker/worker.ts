import { WorkerServerBus } from '~/util/WorkerEventBus';
import { DECRYPTION_WORKER_ACTION_NAME } from './constants';

import { getSDKVersion } from '@jixun/libparakeet';

import { workerDecryptHandler } from './worker/handler/decrypt';

const bus = new WorkerServerBus();
onmessage = bus.onmessage;

bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, workerDecryptHandler);
bus.addEventHandler(DECRYPTION_WORKER_ACTION_NAME.VERSION, getSDKVersion);
