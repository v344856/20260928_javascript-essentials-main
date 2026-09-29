# Course Map: JavaScript & TypeScript Essentials

The single place where all five artifact types are joined up. For any row you can see the **slide deck**
to project, the **doc chapters** that back it, the **demo** to perform, the **activity** to set, and the
**diagram** to draw.

Use the [teaching guide](./TEACHING-GUIDE.md) to plan a *day*; use this map to prepare a *topic*.

**Legend**: `M09-02` = [`docs/Module-09-Built-In-Objects/02-string-methods.md`](../docs/Module-09-Built-In-Objects/02-string-methods.md).
Demo, activity **and slide deck** all share a number: `24` = [`demos/24_…`](../demos/) +
[`activities/24_…`](../activities/) + [`slides/md/24-…-Slides.md`](../slides/md/).
Diagrams are named by slug and live in [`diagrams/`](../diagrams/README.md) as SVG source with PNG and
PDF exports; the PNG is what the docs and slides embed.

---

## Day 1: JavaScript Core

| Pair | Topic | Slides | Docs | Diagram |
|------|-------|--------|------|---------|
| `01` | Types and variables | [01](../slides/md/01-types-and-variables-Slides.md) | M02-02, M02-03 | [value vs reference](../diagrams/png/value-vs-reference.png) · [hoisting & TDZ](../diagrams/png/hoisting-and-tdz.png) |
| `02` | Operators and strings | [02](../slides/md/02-operators-and-strings-Slides.md) | M02-02, M09-02 | [coercion & equality](../diagrams/png/coercion-and-equality.png) |
| `04` | Conditionals | [04](../slides/md/04-conditionals-Slides.md) | M02-04 | - |
| `05` | Loops | [05](../slides/md/05-loops-Slides.md) | M02-05 | - |
| `08` | Functions | [08](../slides/md/08-functions-Slides.md) | M03-02 | [scope & closures](../diagrams/png/scope-chain-and-closures.png) |
| `24` | Strings, numbers, Math | [24](../slides/md/24-string-number-math-methods-Slides.md) | M09-02, M09-03, M09-04 | - |
| `32` | Dates *(reserve)* | [32](../slides/md/32-dates-and-intl-Slides.md) | M09-05 | [date & time model](../diagrams/png/date-time-model.png) |
| `33` | Recursion *(fully optional)* | [33](../slides/md/33-recursion-Slides.md) | M03-02 | [recursion call tree](../diagrams/png/recursion-call-tree.png) |

**Exit tickets:** [M01](../assessments/module-01-exit-ticket.md) · [M02](../assessments/module-02-exit-ticket.md)

---

## Day 2: Objects, Arrays, the DOM & Forms

| Pair | Topic | Slides | Docs | Diagram |
|------|-------|--------|------|---------|
| `03` | Objects | [03](../slides/md/03-objects-Slides.md) | M02-06 | [value vs reference](../diagrams/png/value-vs-reference.png) |
| `06` | Arrays | [06](../slides/md/06-arrays-Slides.md) | M03-01 | [map/filter/reduce](../diagrams/png/array-pipeline.png) |
| `07` | map / filter / reduce | [07](../slides/md/07-arrays-map-filter-reduce-Slides.md) | M03-01 | [map/filter/reduce](../diagrams/png/array-pipeline.png) |
| `09` | Destructuring, rest, spread | [09](../slides/md/09-destructuring-rest-spread-Slides.md) | M03-03 | [destructuring shapes](../diagrams/png/destructuring-shapes.png) · [value vs reference](../diagrams/png/value-vs-reference.png) |
| `21` | window, document, location, selecting, **geolocation** | [21](../slides/md/21-dom-window-and-selecting-Slides.md) | M07-01, M07-02, M07-03, M07-04, M08-02 | [DOM tree](../diagrams/png/dom-tree.png) · [page & script lifecycle](../diagrams/png/page-and-script-lifecycle.png) |
| `22` | DOM events, delegation, styling | [22](../slides/md/22-dom-events-and-styling-Slides.md) | M07-05, M07-06, M07-07 | [DOM event path](../diagrams/png/dom-event-path.png) |
| `25` | Forms: validation and FormData | [25](../slides/md/25-forms-and-validation-Slides.md) | M10-01, M10-02, M10-03 | [form submit lifecycle](../diagrams/png/form-submit-lifecycle.png) · [regex anatomy](../diagrams/png/regex-anatomy.png) |
| `31` | Maps and Sets *(reserve)* | [31](../slides/md/31-maps-and-sets-Slides.md) | M09-06 | [Map/Set vs object](../diagrams/png/map-set-vs-object.png) |

**Exit tickets:** [M03](../assessments/module-03-exit-ticket.md) · [M07](../assessments/module-07-exit-ticket.md) · [M09](../assessments/module-09-exit-ticket.md) · [M10](../assessments/module-10-exit-ticket.md)

---

## Day 3: Objects, `this`, Prototypes, Closures & JSON

| Pair | Topic | Slides | Docs | Diagram |
|------|-------|--------|------|---------|
| `10` | Closures | [10](../slides/md/10-closures-Slides.md) | M03-04 | [scope & closures](../diagrams/png/scope-chain-and-closures.png) |
| `11` | Classes and encapsulation | [11](../slides/md/11-classes-Slides.md) | M04-01 | [class anatomy](../diagrams/png/class-anatomy.png) · [prototype chain](../diagrams/png/prototype-chain.png) |
| `12` | Inheritance, overriding, statics | [12](../slides/md/12-classes-inheritance-Slides.md) | M04-01, M04-04 | [prototype chain](../diagrams/png/prototype-chain.png) · [class anatomy](../diagrams/png/class-anatomy.png) |
| `13` | Call-site vs lexical `this` | [13](../slides/md/13-this-binding-Slides.md) | M04-02 | [how `this` is decided](../diagrams/png/this-binding.png) |
| `14` | Constructors and prototypes | [14](../slides/md/14-constructors-and-prototypes-Slides.md) | M04-04 | [prototype chain](../diagrams/png/prototype-chain.png) |
| `15` | Error handling | [15](../slides/md/15-error-handling-Slides.md) | M04-03 | [error propagation](../diagrams/png/error-propagation.png) |
| `26` | JSON | [26](../slides/md/26-json-Slides.md) | M11-01 | [JSON round trip](../diagrams/png/json-round-trip.png) |

**Exit tickets:** [M04](../assessments/module-04-exit-ticket.md) · [M11](../assessments/module-11-exit-ticket.md)

---

## Day 4: Asynchronous JavaScript, Modules & Fetch

| Pair | Topic | Slides | Docs | Diagram |
|------|-------|--------|------|---------|
| `16` | Callbacks and timers | [16](../slides/md/16-callbacks-and-timers-Slides.md) | M05-01, M05-02, M05-05 | [event loop](../diagrams/png/event-loop.png) · [async progression](../diagrams/png/async-progression.png) |
| `17` | Promises | [17](../slides/md/17-promises-Slides.md) | M05-02, M05-03 | [promise states](../diagrams/png/promise-states.png) · [event loop](../diagrams/png/event-loop.png) · [async progression](../diagrams/png/async-progression.png) |
| `18` | async / await | [18](../slides/md/18-async-await-Slides.md) | M05-03, M05-04 | [async progression](../diagrams/png/async-progression.png) · [promise states](../diagrams/png/promise-states.png) · [sequential vs concurrent](../diagrams/png/sequential-vs-concurrent.png) |
| `19` | Concurrent promises | [19](../slides/md/19-concurrent-promises-Slides.md) | M05-03 | [sequential vs concurrent](../diagrams/png/sequential-vs-concurrent.png) · [event loop](../diagrams/png/event-loop.png) |
| `20` | Modules (ES + CommonJS, **and browser modules**) | [20](../slides/md/20-modules-Slides.md) | M06-01, M06-02, M06-04, M06-05 | [module graph](../diagrams/png/module-graph.png) · [page & script lifecycle](../diagrams/png/page-and-script-lifecycle.png) |
| `23` | The Fetch API | [23](../slides/md/23-fetch-api-Slides.md) | M08-01 | [fetch lifecycle](../diagrams/png/fetch-lifecycle.png) · [event loop](../diagrams/png/event-loop.png) |
| `34` | Dynamic import *(reserve)* | [34](../slides/md/34-dynamic-import-Slides.md) | M06-03 | [module graph](../diagrams/png/module-graph.png) |

> **M06-04 (browser modules) is a live mention, not a demo.** Pair `20`'s demo is Node-side, so
> `<script type="module">` and outline **IX.A** (multiple script elements) are covered by two minutes of
> live demonstration inside that pair; see the [teaching guide](./TEACHING-GUIDE.md#day-4-asynchronous-javascript-modules--fetch).
> It is the only outline item with no pair behind it at all.

**Exit tickets:** [M05](../assessments/module-05-exit-ticket.md) · [M06](../assessments/module-06-exit-ticket.md) · [M08](../assessments/module-08-exit-ticket.md)

---

## Day 5: TypeScript

| Pair | Topic | Slides | Docs | Diagram |
|------|-------|--------|------|---------|
| `27` | Type annotations | [27](../slides/md/27-ts-type-annotations-Slides.md) | M12-02 | [TypeScript pipeline](../diagrams/png/typescript-pipeline.png) · [coercion & equality](../diagrams/png/coercion-and-equality.png) |
| `28` | Interfaces and type aliases | [28](../slides/md/28-ts-interfaces-and-aliases-Slides.md) | M12-03 | [type space](../diagrams/png/ts-type-space.png) |
| `29` | Classes and abstract classes | [29](../slides/md/29-ts-classes-and-abstract-Slides.md) | M12-04 | [class anatomy](../diagrams/png/class-anatomy.png) · [prototype chain](../diagrams/png/prototype-chain.png) |
| `30` | Generics and utility types | [30](../slides/md/30-ts-generics-and-utility-types-Slides.md) | M12-05, M12-06 | [generic type flow](../diagrams/png/generics-type-flow.png) · [utility types](../diagrams/png/utility-types.png) |
| `35` | Narrowing, discriminated unions *(reserve)* | [35](../slides/md/35-ts-narrowing-and-discriminated-unions-Slides.md) | M12-02, M12-03 | [narrowing & unions](../diagrams/png/narrowing-discriminated-unions.png) · [type space](../diagrams/png/ts-type-space.png) |

**Exit ticket:** [M12](../assessments/module-12-exit-ticket.md)

---

## The other direction: by artifact

### Slide deck → pairs

**One deck per pair, sharing its number and slug**, so there is nothing to look up:

```
pair 17_promises  ->  slides/md/17-promises-Slides.md
```

Each deck renders to at most 15 pages (a title slide plus ≤14 content slides), so a deck is one
sitting rather than something to scroll through. There are no unpaired decks, but two decks open
with framing that belongs to no pair, because it is lecture-shaped and the outline promises it:

| Deck | Opens with | Outline |
|------|------------|---------|
| `01` types-and-variables | What is JavaScript · ECMAScript · where it runs · what ES2015 changed | §I.A-B |
| `27` ts-type-annotations | What is TypeScript · static vs dynamic · strong vs loose · coercion | §XII.A-D |

Both are at 14 slides because of it, so adding to either means cutting from it. The rest of
outline §I (installing Node and VS Code, ESLint/Prettier, the debuggers, §I.C-G) has no slides
by design and is taught live from the docs.

### Diagram → pairs

Thirty diagrams, indexed in [`diagrams/README.md`](../diagrams/README.md). The **Doc** column is the
chapter that embeds it; the **Deck** column is where it appears on a slide.

| Diagram | Doc | Deck | Pairs |
|---------|-----|------|-------|
| [event-loop](../diagrams/png/event-loop.png) | M05-01 | `16` | `16`, `17`, `18`, `19`, `23` |
| [async-progression](../diagrams/png/async-progression.png) | M05-02 | `16`, `18` | `16`, `17`, `18` |
| [promise-states](../diagrams/png/promise-states.png) | M05-03 | `17`, `18` | `17`, `18` |
| [sequential-vs-concurrent](../diagrams/png/sequential-vs-concurrent.png) | M05-04 | `18`, `19` | `18`, `19` |
| [fetch-lifecycle](../diagrams/png/fetch-lifecycle.png) | M08-01 | `23` | `23` |
| [module-graph](../diagrams/png/module-graph.png) | M06-01 | `20`, `34` | `20`, `34` |
| [page-and-script-lifecycle](../diagrams/png/page-and-script-lifecycle.png) | M06-04 | `21` | `20`, `21` |
| [this-binding](../diagrams/png/this-binding.png) | M04-02 | `13` | `13` |
| [prototype-chain](../diagrams/png/prototype-chain.png) | M04-04 | `12`, `14` | `11`, `12`, `14`, `29` |
| [class-anatomy](../diagrams/png/class-anatomy.png) | M04-01 | `11`, `29` | `11`, `12`, `29` |
| [error-propagation](../diagrams/png/error-propagation.png) | M04-03 | `15` | `15` |
| [scope-chain-and-closures](../diagrams/png/scope-chain-and-closures.png) | M03-04 | `08`, `10` | `08`, `10` |
| [hoisting-and-tdz](../diagrams/png/hoisting-and-tdz.png) | M02-03 | `01` | `01` |
| [value-vs-reference](../diagrams/png/value-vs-reference.png) | M02-06 | `01`, `03` | `01`, `03`, `09` |
| [coercion-and-equality](../diagrams/png/coercion-and-equality.png) | M02-02 | `02`, `27` | `02`, `27` |
| [array-pipeline](../diagrams/png/array-pipeline.png) | M03-01 | `06`, `07` | `06`, `07` |
| [destructuring-shapes](../diagrams/png/destructuring-shapes.png) | M03-03 | `09` | `09` |
| [recursion-call-tree](../diagrams/png/recursion-call-tree.png) | M03-02 | `33` | `33` |
| [dom-tree](../diagrams/png/dom-tree.png) | M07-02 | `21` | `21` |
| [dom-event-path](../diagrams/png/dom-event-path.png) | M07-06 | `22` | `22` |
| [form-submit-lifecycle](../diagrams/png/form-submit-lifecycle.png) | M10-01 | `25` | `25` |
| [regex-anatomy](../diagrams/png/regex-anatomy.png) | M10-02 | `25` | `25` |
| [map-set-vs-object](../diagrams/png/map-set-vs-object.png) | M09-06 | `31` | `31` |
| [date-time-model](../diagrams/png/date-time-model.png) | M09-05 | `32` | `32` |
| [json-round-trip](../diagrams/png/json-round-trip.png) | M11-01 | `26` | `26` |
| [typescript-pipeline](../diagrams/png/typescript-pipeline.png) | M12-01 | `27` | `27` |
| [ts-type-space](../diagrams/png/ts-type-space.png) | M12-03 | `28` | `27`, `28`, `35` |
| [narrowing-discriminated-unions](../diagrams/png/narrowing-discriminated-unions.png) | M12-02 | `35` | `35` |
| [generics-type-flow](../diagrams/png/generics-type-flow.png) | M12-05 | `30` | `30` |
| [utility-types](../diagrams/png/utility-types.png) | M12-06 | `30` | `30` |

**Pairs `04`, `05` and `24` have no diagram on purpose**: conditionals, loops and the string/number
methods are code-and-run topics where a picture would only restate the bullets.

### Doc module → pairs

| Module | Pairs |
|--------|-------|
| M01 Getting Started | *(setup and tooling; no pair)* |
| M02 JavaScript Fundamentals | `01`, `02`, `03`, `04`, `05` |
| M03 Arrays and Functions | `06`, `07`, `08`, `09`, `10`, `33` |
| M04 Classes, `this` & Errors | `11`, `12`, `13`, `14`, `15` |
| M05 Asynchronous JavaScript | `16`, `17`, `18`, `19` |
| M06 JavaScript Modules | `20`, `34` |
| M07 The DOM | `21`, `22` |
| M08 Browser APIs | `21`, `23` |
| M09 Built-In Objects | `02`, `24`, `31`, `32` |
| M10 JavaScript and Forms | `25` |
| M11 JSON | `26` |
| M12 TypeScript | `27`, `28`, `29`, `30`, `35` |

---

## Keeping this map honest

This file is the **only** place the five artifact types are cross-referenced, which makes it the first
thing to go stale. Update it in the same change whenever you:

- **add, remove, or renumber a pair**: every table above keys on the pair number;
- **add or retitle a slide deck**: the deck column and the *Slide deck → pairs* table;
- **add, move, or renumber a doc chapter**: the `MNN-NN` codes;
- **add a diagram**: the diagram column, the *Diagram → pairs* table, and
  [`diagrams/README.md`](../diagrams/README.md). Build it with the diagram-builder tool and export
  all three formats (`svg`, `png`, `pdf`) together, or an embedded copy goes stale;
- **move a topic between days**: its row moves to a different day table.

Two sources outrank this map when they disagree: the
[course outline](../outline/md/JavaScriptEssentials_Outline.md) (what the course promises to cover)
and the [exit tickets](../assessments/README.md) (what it then assesses). If a topic appears in either
but has no row here, that is a coverage gap; fix the gap, not the map.

The pair ↔ doc links are also enforced mechanically: `npm run validate` checks that every demo and
activity README's *Related reading* link resolves.

