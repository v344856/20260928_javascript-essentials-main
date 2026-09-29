// Tier 1: language mechanics (no code execution).
//
// Enforces the mechanical half of *Voice, register, and mechanics* in AGENTS.md.
// Two scopes, because the rules are not identical for prose and for code:
//
//   1. EVERY Markdown file in the repository. No em dash, no en dash, no `--`
//      standing in for one, and no British spelling, in PROSE only.
//   2. Every source file students or the instructor actually read: the demo and
//      activity folders, the setup scripts, and the export tool. No British
//      spelling anywhere in them, and additionally no dashes in the demo and
//      activity sources, whose comments are projected in class.
//
// For Markdown, "in prose" is the whole point. lib/strip-fences.mjs blanks
// fenced blocks, inline code spans, YAML front matter, HTML comments, table
// rules, link targets and bare URLs first, preserving line and column so a
// failure still points at the real spot. `--no-build` is a flag and a
// box-drawing diagram is full of dashes; neither is a defect.
//
// The word list enumerates EXACT inflections on purpose. A prefix pattern like
// /realis\w*/ matches "realistic", /analys\w*/ matches "analysis", and
// /programme/ as a prefix matches "programmer": false positives that would
// teach everyone to ignore this check. Two deliberate omissions: "analyses"
// (the correct American plural of "analysis") and "shall" (a register choice,
// not a spelling, and common in quoted specifications).
//
// This harness is NOT scanned for British spellings, because the forbidden
// words are its own data. That exemption is exactly three files, listed in
// SELF_EXEMPT, and it is why the source scope is course content rather than
// "everything".
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { COURSEWARE } from '../lib/discover.mjs';
import { stripFences } from '../lib/strip-fences.mjs';

const REPO_ROOT = resolve(COURSEWARE, '..');

// Never walked: VCS internals, installed packages, build output, and scratch
// directories the slide pipeline writes inside the mounted volume.
const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'target',
  'test-results',
  'playwright-report',
  '.marp-src',
]);

// Generated, and byte-identical to its two sources by construction: checking it
// would double-report every finding in AGENTS.course.md and AGENTS.base.md.
const SKIP_FILES = new Set(['AGENTS.md']);

// The three files that must be allowed to name the forbidden words: the list
// itself, and the two places that explain why the list is spelled out.
const SELF_EXEMPT = new Set([
  'courseware/validations/tiers/tier1-language.test.mjs',
  'courseware/validations/lib/strip-fences.mjs',
  'courseware/validations/README.md',
]);

// Source trees that are course content. courseware/validations is deliberately
// absent: it is the harness, not something a student reads.
const SOURCE_ROOTS = [
  'courseware/demos',
  'courseware/activities',
  'courseware/setup',
  'courseware/utils',
  'standards/utils',
];
// Of those, the two whose comments get projected in class, so they are held to
// the no-dash rule as well.
const PROJECTED_ROOTS = ['courseware/demos', 'courseware/activities'];

const SOURCE_EXT = /\.(js|mjs|cjs|ts|tsx|html|css|json|rs|sh|ps1)$/;

// Opt out of the next line. For quoted third-party prose that must keep its
// original spelling or punctuation and cannot live inside a fence.
const IGNORE_NEXT = '<!-- language-check-ignore -->';

const BRITISH = [
  // -ise / -isation
  'organise',
  'organises',
  'organised',
  'organising',
  'organisation',
  'organisations',
  'organisational',
  'realise',
  'realises',
  'realised',
  'realising',
  'recognise',
  'recognises',
  'recognised',
  'recognising',
  'prioritise',
  'prioritises',
  'prioritised',
  'prioritising',
  'summarise',
  'summarises',
  'summarised',
  'summarising',
  'customise',
  'customises',
  'customised',
  'customising',
  'optimise',
  'optimises',
  'optimised',
  'optimising',
  'optimisation',
  'specialise',
  'specialises',
  'specialised',
  'specialising',
  'categorise',
  'categorises',
  'categorised',
  'categorising',
  'minimise',
  'minimises',
  'minimised',
  'minimising',
  'maximise',
  'maximises',
  'maximised',
  'maximising',
  'standardise',
  'standardises',
  'standardised',
  'standardising',
  'utilise',
  'utilises',
  'utilised',
  'utilising',
  'visualise',
  'visualises',
  'visualised',
  'visualising',
  'emphasise',
  'emphasises',
  'emphasised',
  'emphasising',
  'apologise',
  'apologises',
  'apologised',
  'apologising',
  'rasterise',
  'rasterises',
  'rasterised',
  'rasterising',
  'serialise',
  'serialises',
  'serialised',
  'serialising',
  'deserialise',
  'analyse',
  'analysed',
  'analysing',
  'analysable',
  // -our
  'behaviour',
  'behaviours',
  'behavioural',
  'colour',
  'colours',
  'coloured',
  'colouring',
  'favour',
  'favours',
  'favoured',
  'honour',
  'honours',
  'honoured',
  'labour',
  'labours',
  'laboured',
  'neighbour',
  'neighbours',
  'neighbouring',
  'rumour',
  'rumours',
  'endeavour',
  'endeavours',
  'armour',
  'harbour',
  'flavour',
  'flavours',
  // -re
  'centre',
  'centres',
  'centred',
  'centring',
  'metre',
  'metres',
  'litre',
  'litres',
  'fibre',
  'fibres',
  'theatre',
  'theatres',
  // doubled consonants
  'labelled',
  'labelling',
  'modelled',
  'modelling',
  'travelled',
  'travelling',
  'traveller',
  'travellers',
  'cancelled',
  'cancelling',
  'cancellation',
  'fuelled',
  'fuelling',
  'signalled',
  'signalling',
  'marvellous',
  'levelled',
  'levelling',
  'dialled',
  // one-offs
  'defence',
  'offence',
  'licence',
  'licences',
  'practise',
  'practised',
  'practising',
  'pretence',
  'programme',
  'programmes',
  'grey',
  'greyed',
  'greying',
  'fulfil',
  'fulfils',
  'fulfilment',
  'enrol',
  'enrols',
  'enrolment',
  'instalment',
  'skilful',
  'wilful',
  'judgement',
  'acknowledgement',
  'learnt',
  'spelt',
  'burnt',
  'dreamt',
  'maths',
  'sceptical',
  'scepticism',
  'storey',
  'storeys',
  'tyre',
  'tyres',
  'aluminium',
  'whilst',
  'amongst',
];
// Compounds where the British half is glued to another word, so \b would miss it.
const BRITISH_COMPOUNDS = ['greyscale', 'colourblind', 'colourless', 'colourful', 'behaviourism'];

const BRITISH_RE = new RegExp(`\\b(${BRITISH.join('|')})\\b`, 'gi');
const COMPOUND_RE = new RegExp(`(${BRITISH_COMPOUNDS.join('|')})`, 'gi');
// An em or en dash anywhere, or a `--` that is not part of a CLI flag or an
// identifier (`--save-dev`, `foo--bar`) and not a `<!-- -->` comment fence.
const DASH_RE = /[\u2014\u2013]|(?<![-\w!])--(?![-\w>])/g;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const rel = (p) => relative(REPO_ROOT, p).split('\\').join('/');

function scan(file, regexes, { prose }) {
  const text = readFileSync(file, 'utf8');
  const raw = text.split('\n').map((l) => l.replace(/\r$/, ''));
  const lines = prose
    ? stripFences(text)
        .split('\n')
        .map((l) => l.replace(/\r$/, ''))
    : raw;
  const path = rel(file);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && raw[i - 1].trim() === IGNORE_NEXT) continue;
    for (const re of regexes) {
      re.lastIndex = 0;
      for (const m of lines[i].matchAll(re)) {
        out.push(`${path}:${i + 1}:${m.index + 1}  ${JSON.stringify(m[0])}  |  ${raw[i].trim()}`);
      }
    }
  }
  return out;
}

const markdown = walk(REPO_ROOT).filter(
  (p) => p.endsWith('.md') && !SKIP_FILES.has(p.split(/[\\/]/).pop()),
);
const sources = SOURCE_ROOTS.flatMap((r) => walk(join(REPO_ROOT, r))).filter((p) =>
  SOURCE_EXT.test(p),
);

describe('Tier 1 · language mechanics · Markdown prose', () => {
  it('finds Markdown to check', () => {
    expect(markdown.length).toBeGreaterThan(50);
  });

  for (const file of markdown) {
    const path = rel(file);
    const res = SELF_EXEMPT.has(path) ? [DASH_RE] : [DASH_RE, BRITISH_RE, COMPOUND_RE];
    it(`${path} · no dashes or British spellings in prose`, () => {
      const hits = scan(file, res, { prose: true });
      expect(hits, `\n${hits.join('\n')}\n`).toEqual([]);
    });
  }
});

describe('Tier 1 · language mechanics · course source files', () => {
  it('finds source files to check', () => {
    expect(sources.length).toBeGreaterThan(50);
  });

  for (const file of sources) {
    const path = rel(file);
    if (SELF_EXEMPT.has(path)) continue;
    const projected = PROJECTED_ROOTS.some((r) => path.startsWith(`${r}/`));
    const res = projected ? [DASH_RE, BRITISH_RE, COMPOUND_RE] : [BRITISH_RE, COMPOUND_RE];
    const what = projected ? 'no dashes or British spellings' : 'no British spellings';
    it(`${path} · ${what}`, () => {
      const hits = scan(file, res, { prose: false });
      expect(hits, `\n${hits.join('\n')}\n`).toEqual([]);
    });
  }
});
