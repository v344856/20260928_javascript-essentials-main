import { defineConfig } from '@playwright/test';
import { copyFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url)); // validations/
const COURSEWARE = resolve(HERE, '..'); // courseware/

// json-server persists POSTs (the form demos add records) back to its file, so
// we never let it write the committed seed. Regenerate a fresh, gitignored
// runtime copy from db.seed.json at config-load time: before json-server starts.
const SEED_DB = join(HERE, 'e2e', 'fixtures', 'db.seed.json');
const RUNTIME_DB = join(HERE, 'e2e', 'fixtures', 'db.json');
copyFileSync(SEED_DB, RUNTIME_DB);

// Tier 3 serves the whole courseware tree once on :8080 (so any folder's
// index.html is reachable by URL) and a single json-server on :3000 backing the
// fetch demo/activity 23. The demo fetches /colors and the activity fetches
// /books (same concept, different content), so json-server is pointed at a
// COMBINED fixture (e2e/fixtures/db.json) that carries both collections.
// NOTE: the readiness probe below waits on /colors; if the fetch pair ever
// stops using that collection, change the url too or Playwright will hang.
export default defineConfig({
  testDir: join(HERE, 'e2e'),
  testMatch: '**/*.spec.mjs',
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:8080',
    // Any page exposing a #locate button gets clicked by the spec; granting
    // permission + a fixed position keeps geolocation from erroring in a
    // headless browser. (No pair ships one today: this is here so adding a
    // geolocation page back does not require touching the config.)
    permissions: ['geolocation'],
    geolocation: { latitude: 47.6062, longitude: -122.3321 },
    trace: 'off',
  },
  webServer: [
    {
      command: 'npx http-server . -p 8080 -c-1 --silent',
      cwd: COURSEWARE,
      url: 'http://localhost:8080',
      reuseExistingServer: true,
      timeout: 30000,
    },
    {
      command: 'npx json-server e2e/fixtures/db.json --port 3000',
      cwd: HERE,
      url: 'http://localhost:3000/colors',
      reuseExistingServer: true,
      timeout: 30000,
    },
  ],
});
