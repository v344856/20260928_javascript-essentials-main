// Tier 2: output correctness. tier2-scripts proves a solution RUNS; this proves
// it produces the RIGHT output. For every Node/TS activity solution, each
// "Expected output" block in its README must appear (contiguously) in the
// solution's actual terminal output (stdout + stderr merged in execution order,
// so `console.error` lines count). A README may hold several blocks (one per
// task); each must be found.
//
// Browser solutions (no stdout) are skipped: they're covered by Tier 3.
import { describe, it, expect } from 'vitest';
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ACTIVITIES_DIR, activityFolders, classify } from '../lib/discover.mjs';
import { TSX_CLI } from '../lib/run-script.mjs';

function norm(s) {
  return s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '');
}

// Every fenced block that follows an "Expected output" marker in the README.
//
// The text is normalized to LF FIRST. On Windows, git's core.autocrlf=true
// checks these files out with CRLF, and the pattern below requires a literal
// \n after the fence, so matching raw text would silently find zero blocks
// and quietly drop this entire tier's coverage.
function expectedBlocks(readme) {
  const text = readFileSync(readme, 'utf8').replace(/\r\n/g, '\n');
  const re = /expected output[^\n]*\n+```[a-z]*\n([\s\S]*?)```/gi;
  const blocks = [];
  let m;
  while ((m = re.exec(text))) blocks.push(norm(m[1]));
  return blocks;
}

// Run the solution with stderr merged into stdout in execution order (`2>&1`),
// so console.error output is included exactly where a user would see it.
function runMerged(dir, kind, timeout = 25000) {
  const node = process.execPath;
  const cmd =
    kind === 'ts' ? `"${node}" "${TSX_CLI}" "index.ts" 2>&1` : `"${node}" "index.js" 2>&1`;
  return new Promise((resolve) => {
    const child = spawn(cmd, { cwd: dir, shell: true });
    let out = '';
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeout);
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (out += d));
    child.on('close', () => {
      clearTimeout(timer);
      resolve({ out: norm(out), timedOut });
    });
    child.on('error', () => {
      clearTimeout(timer);
      resolve({ out: norm(out), timedOut });
    });
  });
}

const targets = [];
for (const name of activityFolders()) {
  const dir = join(ACTIVITIES_DIR, name, 'solution');
  const kind = classify(dir);
  if (kind !== 'node' && kind !== 'ts') continue;
  const blocks = expectedBlocks(join(ACTIVITIES_DIR, name, 'README.md'));
  if (blocks.length) targets.push({ name, dir, kind, blocks });
}

describe('Tier 2 · activity solution output matches README', () => {
  // Guard against silent coverage loss: if parsing ever stops finding blocks
  // (a changed README convention, a line-ending regression), this tier would
  // otherwise generate no tests and look like it passed.
  it('found activity solutions with Expected-output blocks to check', () => {
    expect(
      targets.length,
      'No Expected-output blocks were parsed from any activity README: the parser or the README convention has drifted.',
    ).toBeGreaterThan(0);
  });

  for (const t of targets) {
    it(`${t.name} · output contains its ${t.blocks.length} Expected-output block(s)`, async () => {
      const { out, timedOut } = await runMerged(t.dir, t.kind);
      expect(timedOut, `${t.name} timed out`).toBe(false);
      for (const block of t.blocks) {
        expect(
          out.includes(block),
          `${t.name}: an Expected-output block was not found in the solution's output\n--- expected block ---\n${block}\n--- actual output ---\n${out}`,
        ).toBe(true);
      }
    }, 30000);
  }
});
