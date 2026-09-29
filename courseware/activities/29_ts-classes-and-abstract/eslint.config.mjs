// The ESLint config from Module 01 · "Linters and Formatters"
// (../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).
// Flat config, so the file must be .mjs; see the chapter's callout on why.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // begin/ is a pristine copy of end/; linting both doubles every message.
  { ignores: ["begin/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      // typescript-eslint replaces the core rule with a TS-aware one. The block
      // above re-enables the core rule for every file, so turn it back off here
      // or each unused symbol is reported twice.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
