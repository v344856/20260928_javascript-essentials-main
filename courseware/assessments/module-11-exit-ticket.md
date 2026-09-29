# Module 11 Exit Ticket: JSON

**Module 11** · JSON syntax and the serialization round trip: turning JavaScript values into text with `JSON.stringify` and back with `JSON.parse`.
**~5 minutes · Not graded · Anonymous is fine**

> No wrong answers to feel bad about here. This is just a quick gut-check so we know what landed. Jot down what comes to mind and move on.

## Quick Recap (3 questions)

1. **(multiple choice)** You have a JavaScript object in memory and you want to save it into `localStorage`, which only holds strings. Which function turns the object into a JSON string?
   - A) `JSON.parse(obj)`
   - B) `JSON.stringify(obj)`
   - C) `JSON.toString(obj)`
   - D) `JSON.serialize(obj)`

2. **(short answer)** Name at least two JavaScript values that do **not** survive `JSON.stringify`, meaning they get dropped or silently turned into something else.

3. **(explain in your own words)** JSON is described as a "language-independent standard" even though it grew out of JavaScript. In a sentence or two, why is a plain-text format like this useful for exchanging data between different systems?

## Muddiest Point

- What's the one thing from this module that's still fuzzy? (Syntax rules, stringify/parse, serialization gotchas, or anything else.)

## Connect It

- What data-interchange formats have you used in your previous language, such as XML, YAML, protobuf, or CSV? Pick one and note one way it differs from JSON (verbosity, arrays, schemas, comments, or whatever stands out).

<details><summary><strong>Instructor Answer Key</strong> (formative, for reading the room, not grading)</summary>

- **Q1:** **B.** `JSON.stringify` serializes a value to text; `JSON.parse` (A) does the reverse (string → value). `JSON.toString` (C) and `JSON.serialize` (D) are not real methods, which is a common trap for folks used to other languages' naming.
- **Q2:** Any two of: `undefined`, functions, and symbols (silently omitted from objects, become `null` inside arrays); `NaN` and `Infinity` (not valid JSON numbers); `Date` objects (turned into strings and not revived); circular references (throw an error). Accept close variants and partial credit for naming the "dates come back as strings" pitfall.
- **Q3 (open-ended, what to listen for):** A solid answer touches on JSON being plain **text** (not live code), so any language can read and write it; that it's lightweight/compact; and that it maps naturally onto objects and arrays. Bonus if they mention APIs, config files, or browser storage as real-world uses.

**Muddiest Point / Connect It:** The most common muddy spot is confusing an in-memory **object** with a JSON **string**, so remind them `stringify` produces text and `parse` produces a value. The other frequent one is the unsupported-types surprise (dates, `undefined`, functions, circular refs). Connect-It answers tell you which prior formats to contrast against: learners from XML-heavy backgrounds often key on verbosity and closing tags, while YAML/protobuf folks may raise comments, schemas, or binary encoding, all fair contrasts the chapter sets up.

</details>
