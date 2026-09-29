// Folder discovery + classification for the courseware's runnable trees.
//
// Both demos and activities are numbered `NN_slug` folders that share the SAME
// name per pair (e.g. demos/01_types <-> activities/01_types). A "run dir" is a
// directory that holds an entry point: a demo folder, or an activity's
// begin/ · end/ · solution/ subfolder.
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url)); // validations/lib
export const COURSEWARE = resolve(HERE, '..', '..'); // courseware/
export const DEMOS_DIR = join(COURSEWARE, 'demos');
export const ACTIVITIES_DIR = join(COURSEWARE, 'activities');
export const SLIDES_MD_DIR = join(COURSEWARE, 'slides', 'md');

const FOLDER_RE = /^\d{2}_/;
const DECK_RE = /^(\d{2})-(.+)-Slides\.md$/;

function listNumberedFolders(dir) {
  return readdirSync(dir)
    .filter((n) => FOLDER_RE.test(n))
    .filter((n) => statSync(join(dir, n)).isDirectory())
    .sort();
}

export function demoFolders() {
  return listNumberedFolders(DEMOS_DIR);
}

export function activityFolders() {
  return listNumberedFolders(ACTIVITIES_DIR);
}

// Classify a run dir by the entry file it contains.
//   browser -> index.html (inline <script>, served over http)
//   ts      -> index.ts   (run with tsx)
//   node    -> index.js   (run with node; ESM vs CJS decided by the folder's package.json)
export function classify(runDir) {
  if (existsSync(join(runDir, 'index.html'))) return 'browser';
  if (existsSync(join(runDir, 'index.ts'))) return 'ts';
  if (existsSync(join(runDir, 'index.js'))) return 'node';
  return 'unknown';
}

const ENTRY = { browser: 'index.html', ts: 'index.ts', node: 'index.js' };
export function entryFile(kind) {
  return ENTRY[kind];
}

// The two-digit leading number of a folder name, as an integer.
export function folderNumber(name) {
  return parseInt(name.slice(0, 2), 10);
}

// --- Slide decks -------------------------------------------------------------
// One deck per pair: `slides/md/NN-<slug>-Slides.md` shares its number AND slug
// with `demos/NN_<slug>/` and `activities/NN_<slug>/`.

// Every `NN-<slug>-Slides.md` in slides/md, sorted.
export function slideDecks() {
  if (!existsSync(SLIDES_MD_DIR)) return [];
  return readdirSync(SLIDES_MD_DIR)
    .filter((n) => DECK_RE.test(n))
    .sort();
}

// `17-promises-Slides.md` -> `17_promises`, so a deck can be compared directly
// against the demo/activity folder sets. Returns null for a non-deck filename.
export function deckPairName(deckFile) {
  const m = DECK_RE.exec(deckFile);
  return m ? `${m[1]}_${m[2]}` : null;
}
