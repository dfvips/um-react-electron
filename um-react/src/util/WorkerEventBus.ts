import { nanoid } from 'nanoid';
import { DecryptError } from '~/decrypt-worker/util/DecryptError';

type WorkerServerHandler<P, R> = (payload: P) => R | Promise<R>;

interface SerializedError {
  message: string;
  stack?: string;
  code?: string;
}

interface WorkerClientRequestPayload<P = unknown> {
  id: string;
  action: string;
  payload: P;
}

interface WorkerServerResponsePayload<R = unknown> {
  id: string;
  result: R;
  error: SerializedError;
}

export class WorkerClientBus<T = string> {
  private idPromiseMap = new Map<string, [(data: never) => void, (error: Error) => void]>();

  constructor(private worker: Worker) {
    worker.addEventListener('message', this.eventHandler);
  }

  eventHandler = (e: MessageEvent<WorkerServerResponsePayload>) => {
    const { id, result, error } = e.data;
    const actionPromise = this.idPromiseMap.get(id);
    if (!actionPromise) {
      console.error('cound not fetch worker promise for action: %s', id);
      return;
    }
    this.idPromiseMap.delete(id);

    const [resolve, reject] = actionPromise;
    if (error) {
      const wrappedError = new Error(error.message, { cause: error });
      wrappedError.stack = error.stack;
      Object.assign(wrappedError, { code: error.code ?? null });
      reject(wrappedError);
    } else {
      resolve(result as never);
    }
  };

  async request<R, P>(actionName: T, payload: P): Promise<R> {
    return new Promise((resolve, reject) => {
      const id = `request://${actionName}/${nanoid()}`;
      this.idPromiseMap.set(id, [resolve, reject]);
      this.worker.postMessage({
        id,
        action: actionName,
        payload,
      });
    });
  }
}

export class WorkerServerBus {
  private handlers = new Map<string, WorkerServerHandler<unknown, unknown>>();

  addEventHandler<R, P>(actionName: string, handler: WorkerServerHandler<P, R>) {
    this.handlers.set(actionName, handler as WorkerServerHandler<unknown, unknown>);
  }

  onmessage = async (e: MessageEvent<WorkerClientRequestPayload>) => {
    const { id, action, payload } = e.data;
    const handler = this.handlers.get(action);

    let result = null;
    let error = null;

    if (!handler) {
      error = new Error('Handler missing for action ' + action);
    } else {
      try {
        result = await handler(payload);
      } catch (err: unknown) {
        if (err instanceof DecryptError) {
          error = err.toJSON();
        } else {
          error = err;
        }
      }
    }

    postMessage({ id, result, error });
  };
}
