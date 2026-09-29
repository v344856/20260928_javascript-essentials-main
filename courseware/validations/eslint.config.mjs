// Flat ESLint config. The course teaches ESLint + Prettier (Module 01); this
// enforces them on the repo's own program code: this validation harness.
//
// It lives here, not at the repo root, because the root of a courseware repo is
// student-facing: students open each demo and activity as its own project, and a
// stray root package.json / lint config would look like part of the course.
//
// This config covers the harness ONLY. Every demo and activity carries its own
// `eslint.config.mjs`: a copy of the one taught in Module 01: scoped to that
// folder. Those are deliberately gentler: teaching code is hand-authored to
// illustrate ideas (unused demo variables, deliberate `var`, a commented
// fall-through), so it is held to the chapter's rules, not to these.
// Don't point this config at `courseware/demos/`, `activities/`, or `docs/`.
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/**', 'test-results/**', 'playwright-report/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
];
