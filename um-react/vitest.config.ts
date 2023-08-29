import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    environment: 'jsdom',
    setupFiles: ['src/test-utils/setup-jest.ts'],
    alias: [
      {
        find: /^~\/(.*)/,
        replacement: 'src/$1',
      },
    ],
    // workaround: sql.js is not ESModule friendly, yet...
    deps: {
      inline: ['sql.js'],
    },
    api: {
      port: 5174, // vite port + 1
    },
    coverage: {
      exclude: [
        // default rules
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',

        // custom ones
        'src/test-utils/**',
      ],
    },
  },
});
