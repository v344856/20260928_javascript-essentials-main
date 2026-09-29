// Tier 2: script smoke tests. Actually RUN every Node and TypeScript demo and
// every activity solution/, and assert it exits cleanly (code 0), doesn't time
// out, and prints something. Browser folders (index.html) are skipped here.
// They are exercised by the Playwright E2E in Tier 3.
//
// begin/ and end/ are deliberately NOT run: they are scaffolds with TODOs that
// may be intentionally incomplete. Tier 1 already pins them (begin == end).
import { describe, it, expect } from 'vitest';
import { join } from 'node:path';
import {
  DEMOS_DIR,
  ACTIVITIES_DIR,
  demoFolders,
  activityFolders,
  classify,
  entryFile,
} from '../lib/discover.mjs';
import { runEntry, tsxAvailable } from '../lib/run-script.mjs';

// Build the list of runnable script targets: every demo folder and every
// activity solution/ whose entry point is node or ts.
function scriptTargets() {
  const targets = [];

  for (const name of demoFolders()) {
    const dir = join(DEMOS_DIR, name);
    const kind = classify(dir);
    if (kind === 'node' || kind === 'ts') {
      targets.push({ label: `demo ${name}`, dir, kind, entry: entryFile(kind) });
    }
  }

  for (const name of activityFolders()) {
    const dir = join(ACTIVITIES_DIR, name, 'solution');
    const kind = classify(dir);
    if (kind === 'node' || kind === 'ts') {
      targets.push({ label: `activity ${name} · solution`, dir, kind, entry: entryFile(kind) });
    }
  }

  return targets;
}

const targets = scriptTargets();
const hasTs = targets.some((t) => t.kind === 'ts');

describe('Tier 2 · scripts run cleanly', () => {
  if (hasTs && !tsxAvailable()) {
    it('tsx is installed for TypeScript targets', () => {
      throw new Error('tsx CLI not found: run `npm install` in courseware/validations');
    });
  }

  for (const t of targets) {
    it(`${t.label} (${t.kind}) runs cleanly (exit 0, no timeout)`, async () => {
      const res = await runEntry(t.dir, t.kind, t.entry, { timeout: 25000 });

      expect(res.timedOut, `${t.label} timed out (possible unbounded timer/loop)`).toBe(false);
      expect(
        res.code,
        `${t.label} exited ${res.code}\n--- stderr ---\n${res.stderr.slice(0, 800)}`,
      ).toBe(0);
      // Note: we do NOT require stdout. A few demos (e.g. 02_variable-declarations)
      // teach purely through code and comments the instructor steps through, and
      // legitimately print nothing. "Runs without error" is the contract here.
    });
  }
});
