// Recursive byte-for-byte directory comparison. Used to enforce that every
// activity's begin/ and end/ folders are identical (end/ ships as a pristine
// copy of begin/ for students to work in).
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

// Never compared: machine-generated or OS noise, not authored content. Each
// activity is its own npm project, so a student running `npm install` from
// inside begin/ or end/ (rather than the activity root) would otherwise drop
// thousands of files into this diff and fail the check for no real reason.
const IGNORED = new Set(['node_modules', 'package-lock.json', 'dist', '.DS_Store']);

// Every file path under `root`, relative and forward-slashed, sorted.
export function listFilesRecursive(root) {
  const out = [];
  function walk(cur) {
    for (const name of readdirSync(cur).sort()) {
      if (IGNORED.has(name)) continue;
      const p = join(cur, name);
      if (statSync(p).isDirectory()) walk(p);
      else out.push(relative(root, p).split('\\').join('/'));
    }
  }
  if (existsSync(root)) walk(root);
  return out.sort();
}

// Compare two directories. Returns the files present in only one side and the
// files present in both but whose bytes differ. An empty result on all three
// means the trees are byte-for-byte identical.
export function diffDirs(a, b) {
  const filesA = listFilesRecursive(a);
  const filesB = listFilesRecursive(b);
  const setA = new Set(filesA);
  const setB = new Set(filesB);

  const onlyInA = filesA.filter((f) => !setB.has(f));
  const onlyInB = filesB.filter((f) => !setA.has(f));

  const differ = [];
  for (const f of filesA) {
    if (!setB.has(f)) continue;
    const bytesA = readFileSync(join(a, f));
    const bytesB = readFileSync(join(b, f));
    if (!bytesA.equals(bytesB)) differ.push(f);
  }

  return { onlyInA, onlyInB, differ };
}
