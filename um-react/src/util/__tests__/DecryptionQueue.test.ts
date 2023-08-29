import { DECRYPTION_WORKER_ACTION_NAME } from '~/decrypt-worker/constants';
import { WorkerClientBus } from '../WorkerEventBus';
import { DecryptionQueue } from '../DecryptionQueue';

vi.mock('../WorkerEventBus', () => {
  class MyWorkerClientBus {
    request() {
      throw new Error('request not mocked');
    }
  }

  return { WorkerClientBus: MyWorkerClientBus };
});

test('should be able to forward request to worker client bus', async () => {
  // This class is mocked
  const bus = new WorkerClientBus<DECRYPTION_WORKER_ACTION_NAME>(null as never);
  vi.spyOn(bus, 'request').mockImplementation(
    async (actionName: DECRYPTION_WORKER_ACTION_NAME, payload: unknown): Promise<unknown> => {
      return { actionName, payload };
    }
  );

  const queue = new DecryptionQueue(bus, 1);
  await expect(queue.add({ id: 'file://1', blobURI: 'blob://mock-file' })).resolves.toEqual({
    actionName: DECRYPTION_WORKER_ACTION_NAME.DECRYPT,
    payload: {
      blobURI: 'blob://mock-file',
      id: 'file://1',
    },
  });
});
