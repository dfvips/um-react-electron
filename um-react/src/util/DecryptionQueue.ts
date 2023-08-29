import type { DecryptCommandPayload } from '~/decrypt-worker/types';
import { DECRYPTION_WORKER_ACTION_NAME, DecryptionResult } from '~/decrypt-worker/constants';

import { ConcurrentQueue } from './ConcurrentQueue';
import { WorkerClientBus } from './WorkerEventBus';

export class DecryptionQueue extends ConcurrentQueue<DecryptCommandPayload, DecryptionResult> {
  constructor(private workerClientBus: WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>, maxQueue?: number) {
    super(maxQueue);
  }

  async handler(item: DecryptCommandPayload): Promise<DecryptionResult> {
    return this.workerClientBus.request(DECRYPTION_WORKER_ACTION_NAME.DECRYPT, item);
  }
}
