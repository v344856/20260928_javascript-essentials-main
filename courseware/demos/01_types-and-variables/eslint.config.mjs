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
      // Both of these fire on code that is deliberately written that way,
      // because demonstrating it IS the demo:
      //   `let x = 2; x = 3;`  shows that let can be reassigned, so the first
      //   value is meant to go unused.
      "no-useless-assignment": "off",
      //   the BigInt line uses a literal too large for a Number on purpose, to
      //   show the precision loss that motivates BigInt.
      "no-loss-of-precision": "off",
    },
  },
];
