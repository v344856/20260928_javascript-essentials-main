// Tier 2: TypeScript type-checking. The TS pairs run under `tsx`, which strips
// types WITHOUT type-checking, so tier2-scripts only proves they run. This tier
// type-checks every TS demo and activity solution in strict mode with `tsc`, so
// a reference solution with a type error actually fails the harness.
import { describe, it, expect } from 'vitest';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { runScript } from '../lib/run-script.mjs';

const HERE = dirname(fileURLToPath(import.meta.url)); // validations/tiers
const VALIDATIONS = join(HERE, '..');
const require = createRequire(import.meta.url);
// Resolve tsc through the package root, NOT `require.resolve('typescript/bin/tsc')`:
// TypeScript 7 added an `exports` map that does not list `./bin/tsc`, so the direct
// subpath resolve throws ERR_PACKAGE_PATH_NOT_EXPORTED. `./package.json` is exported
// by every version, so going via the package root works on TS 5, 6 and 7 alike.
const TSC = join(dirname(require.resolve('typescript/package.json')), 'bin', 'tsc');
const PROJECT = join(VALIDATIONS, 'tsconfig.typecheck.json');

describe('Tier 2 · TypeScript type-checks (strict)', () => {
  it('all TS demos and solutions pass `tsc --noEmit --strict`', async () => {
    const res = await runScript(process.execPath, [TSC, '-p', PROJECT], {
      cwd: VALIDATIONS,
      timeout: 90000,
    });
    expect(res.timedOut, 'tsc timed out').toBe(false);
    expect(
      res.code,
      `tsc found type errors:\n${res.stdout.slice(0, 2000)}${res.stderr.slice(0, 500)}`,
    ).toBe(0);
  }, 100000);
});
