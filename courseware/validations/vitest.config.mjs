import { defineConfig } from 'vitest/config';

// Vitest runs Tier 1 (structure) and Tier 2 (script smoke). The Playwright E2E
// specs live under e2e/ and are run by Playwright, NOT Vitest, so we scope the
// include to tiers/ and explicitly exclude e2e/ (whose *.spec.mjs would otherwise
// be picked up by Vitest's default glob).
export default defineConfig({
  test: {
    include: ['tiers/**/*.test.mjs'],
    exclude: ['e2e/**', 'node_modules/**'],
    testTimeout: 30000,
    hookTimeout: 30000,
    // The Tier 2 script runs spawn child processes; keep them serial-ish so a
    // machine isn't swamped by 100+ concurrent node processes.
    pool: 'threads',
    poolOptions: { threads: { minThreads: 1, maxThreads: 4 } },
    reporters: 'default',
  },
});
