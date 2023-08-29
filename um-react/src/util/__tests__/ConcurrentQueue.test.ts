import { ConcurrentQueue } from '../ConcurrentQueue';
import { nextTickAsync } from '../nextTick';

class SimpleQueue<T, R = void> extends ConcurrentQueue<T> {
  handler(_item: T): Promise<R> {
    throw new Error('Method not overridden');
  }
}

test('should be able to process the queue within limit', async () => {
  const inputs: number[] = [];
  const queuedResolver: (() => void)[] = [];
  const queue = new SimpleQueue<number>(3);

  try {
    vi.spyOn(queue, 'handler').mockImplementation((item) => {
      inputs.push(item);
      return new Promise((resolve, _reject) => {
        queuedResolver.push(resolve);
      });
    });

    const promises = [
      // Add some values
      queue.add(1),
      queue.add(2),
      queue.add(3),
      queue.add(4),
      queue.add(5),
    ];

    // Should queue 3 things at once
    expect(queue.handler).toHaveBeenCalledTimes(3);
    expect(inputs).toEqual([1, 2, 3]);

    // Let first 3 go
    for (let i = 0; i < 3; i++) {
      queuedResolver[i]();
      await promises[i];
    }

    // Wait till all fulfilled
    while (queuedResolver.length !== 5) {
      await nextTickAsync();
    }

    // Now it should've queued everything.
    expect(inputs).toEqual([1, 2, 3, 4, 5]);
    expect(queue.handler).toHaveBeenCalledTimes(5);

    // Resolve everything
    queuedResolver.forEach((resolve) => resolve());
    await Promise.all(promises);
  } finally {
    vi.spyOn(queue, 'handler').mockRejectedValue(new Error('handler ran too late'));
    queuedResolver.forEach((resolve) => resolve());
  }
});

test('it should move on to the next item in the queue once failed', async () => {
  const inputs: number[] = [];
  const queuedResolver: (() => void)[] = [];
  const queue = new SimpleQueue<number, number>(3);

  try {
    vi.spyOn(queue, 'handler').mockImplementation((item) => {
      if (item === 3) {
        throw new Error('dummy error');
      }

      inputs.push(item);
      return new Promise((resolve, _reject) => {
        queuedResolver.push(() => resolve(item));
      });
    });

    const promises = [
      // Add some values
      queue.add(1),
      queue.add(2),
    ];
    const errorHandler = vi.fn();
    const badPromise = queue.add(3);
    badPromise.catch(errorHandler);
    promises.push(queue.add(4));
    promises.push(queue.add(5));

    // Let first 2 be fulfilled
    for (let i = 0; i < 2; i++) {
      queuedResolver[i]();
      await promises[i];
    }

    // Wait till all fulfilled
    while (queuedResolver.length !== 4) {
      await nextTickAsync();
    }

    // Should've moved on, as 3 will throw error
    expect(queue.handler).toHaveBeenCalledTimes(5);
    await expect(badPromise).rejects.toThrowError('dummy error');

    queuedResolver.forEach((resolve) => resolve());
    expect(Promise.all(promises)).resolves.toEqual([1, 2, 4, 5]);
  } finally {
    vi.spyOn(queue, 'handler').mockRejectedValue(new Error('handler ran too late'));
    queuedResolver.forEach((resolve) => resolve());
  }
});
