# 25. Forms: Validation and FormData

A signup form that covers the whole client-side story. Each field carries a **regular expression** and a message: an email shape, a 10-digit US phone that tolerates parentheses, dots, and dashes, and a password using lookaheads to demand an uppercase, a lowercase, and a digit across 8+ characters. Fields re-validate on every keystroke via the `input` event and again on `submit`, where the handler deliberately checks *every* field rather than short-circuiting so all errors surface at once. Invalid submissions are blocked with `preventDefault()`. Once everything passes, the same handler builds a **`FormData`** from the form and walks it: iterating `entries()`, contrasting `get()` (first value) with `getAll()` (every value, which the checkbox group makes visible), `append()`-ing a field that is not on the form, converting to a plain object with `Object.fromEntries`, and printing both ways you would actually send it.

## Run

```bash
npx http-server -o
```

Open the browser DevTools console (press **F12**) to watch each regex test logged as you type.

This folder is its own project: run `npm install` once,
then `npm run format` formats it with the Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- Writing regular expressions for email, phone, and password rules, and testing with `pattern.test(value)`.
- Password lookaheads (`(?=.*[A-Z])`) requiring several character classes at once.
- Live validation on the `input` event, plus a full sweep on `submit`.
- Blocking an invalid submission with `preventDefault()`, and why you validate every field instead of stopping at the first failure.
- Showing inline errors and toggling `.valid` / `.invalid` classes with `classList`.
- Building a `FormData` from a form in one call, and iterating its `entries()`.
- `get()` versus `getAll()` for a repeated field name like a checkbox group.
- `append()` for data that is not a form field, and `Object.fromEntries` for a plain object.
- The two ways to POST it: the `FormData` directly (multipart, carries files) or JSON with a `Content-Type` header.

## Related reading

- [Form Validation and Regular Expressions](../../docs/Module-10-JavaScript-and-Forms/02-form-validation-and-regular-expressions.md)
- [Working with Forms in JavaScript](../../docs/Module-10-JavaScript-and-Forms/01-working-with-forms.md)
- [The FormData Object](../../docs/Module-10-JavaScript-and-Forms/03-formdata-object.md)
- Diagram: [The Form Submit Lifecycle](../../diagrams/png/form-submit-lifecycle.png)
- Diagram: [Anatomy of a Regular Expression](../../diagrams/png/regex-anatomy.png)
