// Tier 1: fast structural invariants (no code execution).
//
//   * demos and activities form matching, contiguously numbered sets
//   * every activity has README.md, package.json, begin/, end/, solution/
//   * every activity's begin/ and end/ are BYTE-FOR-BYTE identical
//   * every demo has a README.md and a recognizable entry point
//   * every demo/activity README links to an existing doc chapter (Related reading)
//   * every slide deck pairs 1:1 with a demo/activity and fits the page budget
//   * no file that ships to students links to a path the export strips
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import {
  COURSEWARE,
  DEMOS_DIR,
  ACTIVITIES_DIR,
  SLIDES_MD_DIR,
  demoFolders,
  activityFolders,
  slideDecks,
  deckPairName,
  classify,
  folderNumber,
} from '../lib/discover.mjs';
import { diffDirs } from '../lib/compare.mjs';

const demos = demoFolders();
const activities = activityFolders();

describe('Tier 1 · pairing & numbering', () => {
  it('there is at least one demo and one activity', () => {
    expect(demos.length).toBeGreaterThan(0);
    expect(activities.length).toBeGreaterThan(0);
  });

  it('the demo and activity folder sets are identical', () => {
    expect(activities).toEqual(demos);
  });

  it('folders are numbered contiguously starting at 01', () => {
    const nums = demos.map(folderNumber);
    const expected = nums.map((_, i) => i + 1);
    expect(nums).toEqual(expected);
  });
});

describe('Tier 1 · activity structure', () => {
  for (const name of activities) {
    const dir = join(ACTIVITIES_DIR, name);

    it(`${name} has README, package.json, begin/, end/, solution/`, () => {
      for (const required of ['README.md', 'package.json', 'begin', 'end', 'solution']) {
        expect(existsSync(join(dir, required)), `missing ${required}`).toBe(true);
      }
    });

    it(`${name} · begin/ and end/ are byte-for-byte identical`, () => {
      const { onlyInA, onlyInB, differ } = diffDirs(join(dir, 'begin'), join(dir, 'end'));
      expect(
        { onlyInBegin: onlyInA, onlyInEnd: onlyInB, contentDiffers: differ },
        'end/ must be a pristine copy of begin/',
      ).toEqual({ onlyInBegin: [], onlyInEnd: [], contentDiffers: [] });
    });

    it(`${name} · solution/ has a recognizable entry point`, () => {
      expect(classify(join(dir, 'solution'))).not.toBe('unknown');
    });
  }
});

describe('Tier 1 · demo structure', () => {
  for (const name of demos) {
    const dir = join(DEMOS_DIR, name);
    it(`${name} has README.md and a recognizable entry point`, () => {
      expect(existsSync(join(dir, 'README.md')), 'missing README.md').toBe(true);
      expect(classify(dir)).not.toBe('unknown');
    });
  }
});

// One deck per pair, sharing its number AND slug. Nothing else covers this:
// the slide pipeline is glob-driven and happily builds a deck that pairs with
// no demo, or skips a pair that has no deck. Both are silent until class.
//
// The 14-slide ceiling is checked here too, because the Marp theme CLIPS
// content that overflows rather than shrinking it: a 16th slide does not
// fail the build, it just quietly disappears off the bottom of the deck.
const MAX_CONTENT_SLIDES = 14; // + the auto-generated title slide = 15 pages

describe('Tier 1 · slide decks', () => {
  const decks = slideDecks();

  it('every pair has exactly one deck, and every deck has a pair', () => {
    expect(decks.map(deckPairName).sort()).toEqual(demos);
  });

  for (const deck of decks) {
    const file = join(SLIDES_MD_DIR, deck);

    it(`${deck} · starts with front matter and fits the page budget`, () => {
      const text = readFileSync(file, 'utf8');
      const lines = text.split(/\r?\n/);

      // preprocess.mjs fails SILENTLY if front matter is not the very first
      // line: the deck renders as "Untitled" with the body as content.
      expect(lines[0], 'front matter must start on line 1 (no blank line or BOM)').toBe('---');

      const slides = lines.filter((l) => l.startsWith('## ')).length;
      expect(slides, 'deck has no content slides').toBeGreaterThan(0);
      expect(
        slides,
        `${slides} content slides exceeds the ${MAX_CONTENT_SLIDES}-slide budget ` +
          `(title slide + ${MAX_CONTENT_SLIDES} = 15 rendered pages)`,
      ).toBeLessThanOrEqual(MAX_CONTENT_SLIDES);

      // Pair decks carry no `#` dividers: the auto title slide already names
      // the topic, and dropping the divider buys back a page.
      const dividers = lines.filter((l) => /^# /.test(l)).length;
      expect(dividers, 'pair decks must not use `#` divider slides').toBe(0);
    });
  }
});

// Links resolve inside THIS repo but the students get a different one:
// `course-export` strips the instructor folder, the harness and the build
// tooling. A link from a file that ships to a path that does not is a dead link
// on the student's landing page, and nothing else notices: the source repo is
// always complete. Read the rules straight out of manifest.rs so this cannot
// drift from the exporter.
const MANIFEST = join(COURSEWARE, 'utils', 'course-export', 'src', 'manifest.rs');
const EXCLUDED_PREFIXES = [
  ...readFileSync(MANIFEST, 'utf8').matchAll(/Rule\s*\{\s*prefix:\s*"([^"]+)"/g),
].map((m) => m[1]);
const REPO_ROOT = resolve(COURSEWARE, '..');
const toRepoRel = (abs) => relative(REPO_ROOT, abs).split(sep).join('/');
const excludedBy = (rel) =>
  EXCLUDED_PREFIXES.find((p) => (p.endsWith('/') ? rel.startsWith(p) : rel === p));

function shippingMarkdown(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'target', 'dist', 'test-results'].includes(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) shippingMarkdown(p, acc);
    else if (e.name.endsWith('.md') && !excludedBy(toRepoRel(p))) acc.push(p);
  }
  return acc;
}

describe('Tier 1 · student export', () => {
  it('reads the exclusion rules from manifest.rs', () => {
    expect(EXCLUDED_PREFIXES.length).toBeGreaterThan(5);
    expect(EXCLUDED_PREFIXES).toContain('courseware/instructor/');
  });

  it('no shipping file links to a path the export strips', () => {
    const dead = [];
    for (const f of shippingMarkdown(REPO_ROOT)) {
      readFileSync(f, 'utf8')
        .split(/\r?\n/)
        .forEach((line, i) => {
          for (const m of line.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)) {
            const target = m[2];
            if (/^(https?:|mailto:|#)/.test(target)) continue;
            const [pathPart] = target.split('#');
            if (!pathPart) continue;
            const rule = excludedBy(toRepoRel(resolve(dirname(f), decodeURIComponent(pathPart))));
            if (rule) dead.push(`${toRepoRel(f)}:${i + 1} -> ${target} (stripped by "${rule}")`);
          }
        });
    }
    expect(
      dead,
      `these links are dead in the exported student repo:\n  ${dead.join('\n  ')}`,
    ).toEqual([]);
  });
});

// Every demo and activity README must point back to a real doc chapter, so the
// three stacks (docs / demos / activities) stay cross-linked.
const DOC_LINK_RE = /\]\((\.\.\/\.\.\/docs\/[^)]+\.md)\)/;

describe('Tier 1 · doc cross-links', () => {
  const targets = [
    ...demos.map((n) => ({ label: `demo ${n}`, readme: join(DEMOS_DIR, n, 'README.md') })),
    ...activities.map((n) => ({
      label: `activity ${n}`,
      readme: join(ACTIVITIES_DIR, n, 'README.md'),
    })),
  ];
  for (const t of targets) {
    it(`${t.label} · README links to an existing doc chapter`, () => {
      const text = readFileSync(t.readme, 'utf8');
      const m = text.match(DOC_LINK_RE);
      expect(m, 'README must link to a ../../docs/*.md chapter (Related reading)').toBeTruthy();
      const linked = resolve(dirname(t.readme), m[1]);
      expect(existsSync(linked), `linked doc chapter not found: ${m[1]}`).toBe(true);
    });
  }
});
