import '@testing-library/jest-dom';

// FIXME: Use something like jsdom-worker?
//   see: https://github.com/developit/jsdom-worker
if (!global.Worker) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).Worker = class MockWorker {
    events: Record<string, (e: unknown) => void> = Object.create(null);

    onmessage = undefined;
    addEventListener(name: string, e: unknown) {
      if (Object.hasOwn(this.events, name)) {
        this.events[name](e);
      }
    }
  };
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
