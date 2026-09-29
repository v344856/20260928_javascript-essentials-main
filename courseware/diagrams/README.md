# Diagrams

The thirty concept drawings for this course.

They exist because the course is taught with **live drawing**: each one is the finished reference
version of something the instructor sketches at the whiteboard. Because they now live in the repo,
the same drawing is also the picture in the reading, the picture on the slide, and something a
student can go back to afterwards.

Each is deliberately **general**: no demo folder, activity name, or file name from one exercise
appears on any of them, which is what lets them survive a renumber.

## The files

| Folder | Format | Role |
|--------|--------|------|
| [`svg/`](svg) | `.svg` | **The source.** Built and edited only with the diagram-builder tool |
| [`png/`](png) | `.png` | What the docs, slides and pair READMEs embed |
| [`pdf/`](pdf) | `.pdf` | Vector copies, for printing and handouts |

All three share a basename, and the basename is a **slug, never a number**: `event-loop.svg`, not
`01-event-loop.svg`, so inserting one never renumbers the rest.

From a doc chapter, a slide deck, or a demo/activity README the path is the same, because all three
sit exactly two levels below `courseware/`:

```markdown
![alt text that carries the content](../../diagrams/png/event-loop.png)
```

## The set

`M05-01` = [`docs/Module-05-Asynchronous-JavaScript/01-js-event-loop.md`](../docs/Module-05-Asynchronous-JavaScript/01-js-event-loop.md).

| Diagram | Punchline | Day | Docs | Pairs |
|---------|-----------|-----|------|-------|
| [The Event Loop](png/event-loop.png) | Sync finishes first, then **all** microtasks, then **one** task | 4 | M05-01 | `16`, `17`, `18`, `19`, `23` |
| [The Async Progression](png/async-progression.png) | Same three steps three ways: nested, chained, top-to-bottom | 4 | M05-02 | `16`, `17`, `18` |
| [Promise States](png/promise-states.png) | Settled is permanent, and every `.then` returns a **new** promise | 4 | M05-03 | `17`, `18` |
| [Sequential vs Concurrent](png/sequential-vs-concurrent.png) | Awaiting in a loop is a queue; `Promise.all` is a starting gun | 4 | M05-04 | `18`, `19` |
| [The Fetch Lifecycle](png/fetch-lifecycle.png) | The body is a stream, so `.json()` is a **second** promise | 4 | M08-01 | `23` |
| [The Module Graph](png/module-graph.png) | `import` is resolved before anything runs; `import()` returns a promise | 4 | M06-01 | `20`, `34` |
| [Page and Script Lifecycle](png/page-and-script-lifecycle.png) | Why the element was `null`: the script ran before the parser reached it | 2, 4 | M06-04 | `20`, `21` |
| [How this Is Decided](png/this-binding.png) | Ask the **call site**, not where the function was written | 3 | M04-02 | `13` |
| [The Prototype Chain](png/prototype-chain.png) | Lookup walks **up** until it matches; `class` builds exactly this chain | 3 | M04-04 | `11`, `12`, `14`, `29` |
| [Class Anatomy](png/class-anatomy.png) | Fields on the instance, methods on the prototype, statics on the class | 3 | M04-01 | `11`, `12`, `29` |
| [Error Propagation](png/error-propagation.png) | A throw unwinds to the nearest `catch`; `finally` always runs | 1 | M04-03 | `15` |
| [Scope Chain and Closures](png/scope-chain-and-closures.png) | Lookup goes **outward only**; a closure outlives the call that made it | 1, 3 | M03-04 | `08`, `10` |
| [Hoisting and the TDZ](png/hoisting-and-tdz.png) | `let` and `const` exist before they are usable; that gap is the TDZ | 1 | M02-03 | `01` |
| [Value vs Reference](png/value-vs-reference.png) | Two names, one object, and what spread does not copy | 1, 2 | M02-06 | `01`, `03`, `09` |
| [Coercion and Equality](png/coercion-and-equality.png) | `==` converts before it compares; `===` never does | 1, 5 | M02-02 | `02`, `27` |
| [map, filter, reduce](png/array-pipeline.png) | Same length, then shorter, then one value | 2 | M03-01 | `06`, `07` |
| [Destructuring, Rest and Spread](png/destructuring-shapes.png) | The pattern mirrors the shape; three dots collect, or expand | 2 | M03-03 | `09` |
| [The Recursion Call Tree](png/recursion-call-tree.png) | Calls go down to the base case; nothing returns until the bottom | 1 | M03-02 | `33` |
| [The DOM Tree](png/dom-tree.png) | `window` → `document` → elements and text nodes | 2 | M07-02 | `21` |
| [The DOM Event Path](png/dom-event-path.png) | `target` is what was clicked, `currentTarget` is where you listened | 2 | M07-06 | `22` |
| [The Form Submit Lifecycle](png/form-submit-lifecycle.png) | The browser navigates away unless you stop it | 2 | M10-01 | `25` |
| [Anatomy of a Regular Expression](png/regex-anatomy.png) | One pattern, every part labeled | 2 | M10-02 | `25` |
| [Map and Set vs Object and Array](png/map-set-vs-object.png) | Pick by the key you have: any key → `Map`, no key → `Set` | 2 | M09-06 | `31` |
| [The Date and Time Model](png/date-time-model.png) | A `Date` is one number; the rest is presentation | 1 | M09-05 | `32` |
| [The JSON Round Trip](png/json-round-trip.png) | Object → text → object, and what is lost on the way | 3 | M11-01 | `26` |
| [The TypeScript Pipeline](png/typescript-pipeline.png) | Types are checked, then **erased** | 5 | M12-01 | `27` |
| [The TypeScript Type Space](png/ts-type-space.png) | A type is the **set** of values it allows | 5 | M12-03 | `27`, `28` |
| [Narrowing and Discriminated Unions](png/narrowing-discriminated-unions.png) | Switch on the tag; `never` proves you covered every case | 5 | M12-02 | `35` |
| [How a Type Parameter Flows](png/generics-type-flow.png) | `T` is bound at the call site and flows through to the return | 5 | M12-05 | `30` |
| [Utility Types as Transforms](png/utility-types.png) | One source of truth in, several derived shapes out | 5 | M12-06 | `30` |

## Where each one pays off

- **The Event Loop**: draw it the moment someone asks why `setTimeout(fn, 0)` ran last, or why
  `await` did not block the page.
- **The Async Progression**: draw it incrementally. Nest callbacks until the room groans, then
  flatten, then collapse to `await`.
- **Promise States**: the slide that stops "does `.then` change the promise?" Answer: no, it makes
  a new one.
- **Sequential vs Concurrent**: pair it with a stopwatch. Three seconds versus one is the argument.
- **How this Is Decided**: walk it as a decision tree against a real call, top to bottom.
- **The Prototype Chain**: draw it with a constructor function first, then say "`class` builds this."
  That one sentence unifies inheritance, `instanceof` and shadowing.
- **Scope Chain and Closures**: a counter factory, called twice, to show two independent captures.
- **Value vs Reference**: draw the two arrows into one box *before* anyone hits the bug.
- **The DOM Event Path**: trace one click down and back up with your finger before writing code.
- **Page and Script Lifecycle**: the answer to the first "why is my element `null`?" of the week.
- **The TypeScript Pipeline**: open Day 5 with it. Everything else that day follows from erasure.

## Deliberately without a diagram

Pairs `04` conditionals, `05` loops and `24` string/number/`Math` methods have none, and that is a
decision rather than a gap. They are code-and-run topics where a picture would only restate the
bullets. Do not "complete the set".

## Adding or changing a diagram

1. **Build it with the diagram-builder tool**, never by hand. The tool keeps its scene graph inside
   the SVG's metadata, so editing the XML corrupts the source. Build the whole thing in one atomic
   `apply_ops`, then **render it and look at the PNG** before going further.
2. **Export all three formats** to the same basename in `svg/`, `png/` and `pdf/`. Skipping one
   leaves a stale picture embedded somewhere.
3. **Keep it general.** No demo, activity, or file name from one exercise.
4. **Add its row above**, and its entry in the instructor course map, both the per-day diagram
   column and the *Diagram → pairs* table.
5. **Embed it** where it earns its place: the doc chapter, the matching slide, and a *Related
   reading* link in the pair's two READMEs. Alt text must carry the content, not `![diagram]`.

Two known traps, both learned the hard way: the tool's monospace font has programming **ligatures**,
so any text containing `==`, `===`, `!==` or `=>` must use the `sans` font or the operators merge
into one glyph; and connectors are drawn **behind** shapes, so a container an arrow passes through
needs `fill: "none"`.
