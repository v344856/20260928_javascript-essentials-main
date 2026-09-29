# Activity: Profile Form Validation and FormData

Same concepts as the demo (validate fields with `regex.test()` live on `input` and again on `submit`, then collect the form with `FormData`), applied to a new set of fields: a username, a US ZIP code, and a hex color. The validation wiring is already written for you, so your job is to supply the three regex patterns, finish the check, and then collect the submitted data.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.html` and complete the TODOs in the `<script>`.
Run `npm install` once, then `npm start` to serve the page (open DevTools console, F12).
`npm run solution` serves the reference. The finished reference solution is in `solution/`.

> This is a browser activity, so results appear on the page and in the DevTools console, not in the terminal.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: Write the three regex patterns

Fill in the `pattern` for each rule in the `rules` object:

- **username**: 3 to 16 characters, letters, digits, or underscore only. (e.g. `ada_99`)
- **zip**: a US ZIP, meaning exactly 5 digits, optionally followed by a dash and 4 more digits. (e.g. `98101`
  or `98101-1234`)
- **color**: a hex color, meaning a `#` then exactly 6 hex digits (0-9, a-f, A-F). (e.g. `#1a2B3c`)

### Task 2: Finish validateField

In `validateField`, test the field value against its pattern with `pattern.test(value)` and return the boolean result. The `showError` / `clearError` calls around it are already written.

### Task 3: Confirm live + submit validation works

The `input` listeners and the `submit` handler are already wired to call `validateField`. Serve the page and confirm: valid fields turn green, invalid fields turn red with a message, and submitting with all three valid shows the success status. Each check is logged to the console.

**Expected console line when you type a valid username:**
```
username: /^\w{3,16}$/ .test("ada_99") -> true
```

### Task 4: Collect the form with FormData

Once the sweep passes, build a `FormData` straight from the form: one call captures every **named** field, including the `<select>` and both checked checkboxes. Loop `data.entries()` and push a `"key = value"` line for each.

### Task 5: get versus getAll

`languages` is a checkbox group, so the same name appears more than once. Print `data.get('languages')` (only the first value) next to `data.getAll('languages')` (all of them) to see the difference.

### Task 6: Append and convert

`append` a `source` field that is not on the form, then convert everything to a plain object with `Object.fromEntries(data.entries())`. Because `fromEntries` keeps only the **last** value per key, restore `obj.languages` from `getAll` afterwards. Print the object as formatted JSON.

## What You'll Learn

- Writing practical regex patterns for a username, US ZIP code, and hex color
- Checking a value with `regex.test(value)` and returning a pass/fail boolean
- Live validation on the `input` event plus a full re-check on `submit`
- Toggling `invalid`/`valid` classes and inline error messages per field
- Building a `FormData` from a form in one call and iterating its `entries()`
- Why `get` and `getAll` differ for a repeated field name
- Converting a `FormData` to a plain object, and the value `Object.fromEntries` silently drops

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Add a "Confirm ZIP" field that must match the ZIP field exactly. Its rule cannot be a plain regex, because it depends on another field, so extend `rules` to allow an optional `matches` function alongside `pattern`, and have `validateField` run whichever the rule provides. Then disable the submit button whenever any field is invalid, instead of only reporting on submit.

On the page, typing a mismatched confirmation should mark it red immediately and keep the button disabled until both agree.

## Related reading

- [Form Validation and Regular Expressions](../../docs/Module-10-JavaScript-and-Forms/02-form-validation-and-regular-expressions.md)
- [Working with Forms in JavaScript](../../docs/Module-10-JavaScript-and-Forms/01-working-with-forms.md)
- [The FormData Object](../../docs/Module-10-JavaScript-and-Forms/03-formdata-object.md)
- Diagram: [The Form Submit Lifecycle](../../diagrams/png/form-submit-lifecycle.png)
- Diagram: [Anatomy of a Regular Expression](../../diagrams/png/regex-anatomy.png)
