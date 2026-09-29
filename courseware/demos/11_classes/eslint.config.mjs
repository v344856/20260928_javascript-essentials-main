// The ESLint config from Module 01 · "Linters and Formatters"
// (../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).
// Flat config, so the file must be .mjs; see the chapter's callout on why.
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
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
];
