// Spawn a script and capture its result, with a hard timeout so a hung script
// (e.g. an interval that never clears) fails instead of blocking the suite.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url)); // validations/lib

// tsx's CLI entry: invoked as `node <TSX_CLI> <file.ts>` so we avoid the
// platform-specific .cmd/.ps1 shim in node_modules/.bin and don't need a shell.
export const TSX_CLI = join(HERE, '..', 'node_modules', 'tsx', 'dist', 'cli.mjs');

export function tsxAvailable() {
  return existsSync(TSX_CLI);
}

// runScript(cmd, args, { cwd, timeout }) -> { code, stdout, stderr, timedOut }
export function runScript(cmd, args, { cwd, timeout = 20000 } = {}) {
  return new Promise((resolvePromise) => {
    const child = spawn(cmd, args, { cwd, shell: false });
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeout);

    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('error', (err) => {
      clearTimeout(timer);
      resolvePromise({ code: -1, stdout, stderr: `${stderr}\n${err}`, timedOut });
    });
    child.on('close', (code) => {
      clearTimeout(timer);
      resolvePromise({ code, stdout, stderr, timedOut });
    });
  });
}

// Convenience: run a node/ts entry file living in `runDir`.
export function runEntry(runDir, kind, entry, opts = {}) {
  if (kind === 'ts') {
    return runScript(process.execPath, [TSX_CLI, join(runDir, entry)], { cwd: runDir, ...opts });
  }
  return runScript(process.execPath, [entry], { cwd: runDir, ...opts });
}
