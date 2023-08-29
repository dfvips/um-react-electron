import { nextTickAsync } from './nextTick';

export abstract class ConcurrentQueue<T, R = unknown> {
  protected items: [T, (result: R) => void, (error: unknown) => void, void | (() => void)][] = [];

  constructor(protected maxConcurrent = 5) {}

  abstract handler(item: T): Promise<R>;

  public async add(item: T, onPreProcess?: () => void): Promise<R> {
    return new Promise((resolve, reject) => {
      this.items.push([item, resolve, reject, onPreProcess]);
      this.runWorkerIfFree();
    });
  }

  private runWorkerIfFree() {
    if (this.maxConcurrent > 0) {
      this.maxConcurrent--;
      this.processQueue()
        /* c8 ignore start: imposible to reach */
        .catch((e) => {
          console.error('process queue with error, continue.', e);
        })
        /* c8 ignore stop: imposible to reach */
        .finally(() => {
          this.maxConcurrent++;
        });
    }
  }

  private async processQueue() {
    let item: (typeof this.items)[0] | void;
    while ((item = this.items.shift())) {
      const [payload, resolve, reject, onPreProcess] = item;

      try {
        onPreProcess?.();

        resolve(await this.handler(payload));
      } catch (error: unknown) {
        reject(error);
      } finally {
        await nextTickAsync();
      }
    }
  }
}
