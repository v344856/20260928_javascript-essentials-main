# Teaching Guide: JavaScript & TypeScript Essentials

The day-by-day flow for the 5-day, instructor-led delivery: how the outline sections, the **35
demo + activity pairs**, the doc chapters, and the exit tickets fit into each day. This is the
instructor's map; students use the [root README](../../README.md) outline and the folder indexes.

## The teaching rhythm

- **Live coding + live drawing.** Build each demo in front of the class while explaining, then set the
  students loose on the **paired activity** (same concept, a different fresh challenge). The written
  [docs](../docs/README.md) are reference, not a script.
- **Draw it, don't just show it.** The thirty [diagrams](../diagrams/README.md) are the *finished*
  versions of what you sketch; they are already in the reading and on the slides, so you are free to
  build the drawing up live and let the printed one be what students take away. The
  [course map](./COURSE-MAP.md) lists which diagram belongs to which pair; the diagrams index has a
  *Where each one pays off* section on when to reach for each.
- **~1 pair per hour, deliberately.** A demo performed unhurried (~20 min, with questions and a drawing
  on the board) plus its activity worked and reviewed (~20-25 min) fills most of an hour. Across ~32
  instructional hours the **30 core pairs** leave real room for discussion, tangents, and debugging
  whatever the room actually gets stuck on, which is where the value of a live class is.
- **Machine setup is *not* class time.** Student machines are provisioned ahead of the course by
  someone else, using [`setup/setup-student-machines.md`](../setup/setup-student-machines.md). You do
  **not** spend Day-1 morning installing Node, VS Code, or Chrome. What you *do* still teach is outline
  **§I.C-G** covers the VS Code tour, ESLint and Prettier, and the two debuggers (browser and VS Code),
  which is instruction, not installation, and comes from [Module 01](../docs/README.md). Budget
  **~1 hour** on Day 1 for introductions, a two-minute sanity check that every machine really is ready
  (`node -v`, VS Code opens), and that tooling material. If a machine turns out not to be provisioned,
  hand the student the setup doc and pair them up rather than stopping the room.
- **Pairs `01`-`30` are the course. Pairs `31`-`35` are held in reserve.** The thirty core pairs are
  what every delivery covers. The five reserve pairs are there for a room that moves faster than
  expected: run them in number order as time allows, at the end of the day whose material they extend
  (see each day below). Nothing later depends on them, so stopping at `30` leaves no loose ends.

  **Four of the five carry outline or assessment weight**, so if you never reach them, know what has
  gone uncovered; the docs still carry all of it, and students have the docs:

  | Reserve pair | Extends | Outline | Exit-ticket question |
  |------|---------|---------|----------------------|
  | `31` maps-and-sets | Day 2 | IV.G Maps and sets | **M09 Q3**: "when would you reach for a `Map`?" |
  | `32` dates-and-intl | Day 1 | IV.F JavaScript dates | M09 muddiest point |
  | `33` recursion | Day 1 | - | - |
  | `34` dynamic-import | Day 4 | IX.D Dynamic modules | **M06 Q2**: how `import()` differs |
  | `35` ts-narrowing | Day 5 | - | **M12 Q2**: narrowing a `string \| number` |

  If a reserve pair goes unrun, the cheapest fix is **two minutes of live mention** while you are in
  the neighboring core pair: say what a `Map` is for during `03` objects, show one `import()` during
  `20` modules, narrow one `unknown` during `27`. That closes the outline item and leaves the ticket
  question answerable without spending the full pair.
- **Every activity has a Stretch goal.** Fast finishers extend the activity instead of waiting. The
  stretch work is never in `solution/`, so it cannot spoil the reference answer.
- **The pair numbers follow *topic modules*, not the calendar.** A single day pulls pairs from several
  number ranges (e.g. Day 1 uses `01`, `02`, `04`, `05`, `08`, and `24`). That's expected; see
  each day's pair list below.
- **Pacing is an average, not a metronome.** The days are balanced to land within a few minutes of each
  other (see *Where the time goes* below), so no day depends on borrowing from another. Days 1-3 run
  closest to the line; Days 4 and 5 carry the slack deliberately, which is why their reserve pairs
  (`34`, `35`) are the two you are most likely to actually reach. If a day still overruns, push the
  **last** pair of the day forward rather than compressing two, and prefer deferring a pair to
  skipping its activity, because the activity is where the learning lands.

## Daily clock (Mon-Fri)

| Block | Time (ET) |
|-------|-----------|
| Session 1 | 8:30-9:35 |
| Break | 9:35-9:45 |
| Session 2 | 9:45-10:50 |
| Break | 10:50-11:00 |
| Session 3 | 11:00-12:00 |
| Lunch | 12:00-1:00 |
| Session 4 | 1:00-2:05 |
| Break | 2:05-2:15 |
| Session 5 | 2:15-3:20 |
| Break | 3:20-3:30 |
| Session 6 | 3:30-4:30 |

380 instructional minutes/day ≈ 6.3 hours × 5 ≈ **32 hours**.

### Where the time goes

Each day's 380 minutes, minus what is not a pair, divided by the core pairs that day carries. The
target is the **45-50 minutes** a pair needs (demo ~20 + activity worked and reviewed ~20-25):

| Day | Minutes | Non-pair time | Left for pairs | Core pairs | Per pair |
|-----|---------|---------------|----------------|------------|----------|
| 1 | 380 | ~60 orientation + §I.C-G · 10 tickets (M01, M02) | 310 | 6 | **~52 min** |
| 2 | 380 | 20 tickets (M03, M07, M09, M10) | 360 | 7 | **~51 min** |
| 3 | 380 | 10 tickets (M04, M11) | 370 | 7 | **~53 min** |
| 4 | 380 | 15 tickets (M05, M06, M08) | 365 | 6 | **~61 min** |
| 5 | 380 | ~30 TypeScript framing · 5 ticket (M12) | 345 | 4 | **~86 min** |
| | | | **1750** | **30** | ~58 avg |

Every day clears the 45-50 minute bar, Days 1-3 with a few minutes to spare and Days 4-5 with an
hour or more of genuine slack across the day. **Spend that slack on the reserve pairs**, not on
running long: `34` at the end of Day 4 and `35` at the end of Day 5 both fit, and each closes an
outline item and an exit-ticket question (see the reserve table above).

> The 12 exit tickets cost ~5 minutes each, an hour across the week. They are already subtracted
> above, so do not treat them as free.

## Exit tickets

Run the [exit ticket](../assessments/README.md) for a module **when that module wraps** (not per day,
some modules span two days). The table under each day lists the tickets that come due. They are
formative, ~5 minutes, and never graded.

---

## Day 1: JavaScript Core

**Orientation, then the language fundamentals.** Machines are already provisioned, so the first hour is
introductions, a quick readiness check, and the VS Code / linters / debuggers material (§I.C-G); the
rest is types, operators, the built-in string/number/Math objects, control flow, and functions.

- **Outline sections:** I (Getting Started), II (Types, Variables & Objects: most), III.A-C (Blocks,
  conditionals, looping), IV (Built-In Objects: strings/numbers/Math/**dates**).
- **Docs:** Module 01, Module 02, Module 03 (functions), Module 09 (strings/numbers/Math/**dates**).
- **Pairs (6):** `01` types-and-variables · `02` operators-and-strings · `04` conditionals · `05` loops ·
  `08` functions · `24` string-number-math-methods.
- **Error handling (III.D) is taught on Day 3, not here.** Pair `15` used to sit on this day, but it
  belongs to Module 04 along with classes and `this`, and the M04 exit ticket, titled "Classes, `this`
  & Error Handling", comes due on Day 3. Teaching it here split one module across two days and left a
  ticket asking about material from 48 hours earlier. If the room asks about `try`/`catch` on Day 1,
  say it is Wednesday's topic.
- **The orientation slides live at the front of deck `01`.** "What is JavaScript", ECMAScript and the
  yearly editions, where it runs, and what ES2015 changed (outline §I.A-B) are the first four slides of
  `01-types-and-variables-Slides.md`; open that deck first and keep going straight into types. The rest
  of §I (VS Code, ESLint/Prettier, the debuggers) has no slides on purpose; do it live on a machine.
  Installation itself is not taught; the machines arrive ready.
- **In reserve, if the day runs short:** `32` dates-and-intl (covers outline IV.F, which nothing else
  does), then `33` recursion (extends `08`; in neither the outline nor a ticket, so it is the one pair
  with no cost to skipping). At ~52 min/pair this day has the least room of the week, so plan on
  closing IV.F with the two-minute mention rather than counting on the pair.
- **Exit tickets due:** Module 01 (Getting Started), Module 02 (JavaScript Fundamentals).

## Day 2: Objects, Arrays, the DOM & Forms

**From data structures to the browser.** Objects and arrays, destructuring, then the Browser Object
Model (`window`/`location`), DOM selection/events/manipulation/styling, and working with forms.

- **Outline sections:** II (objects/arrays), IV.G (**Maps and sets**), V (Browser Object Model),
  VI (DOM), VII (Forms), and XI.L (**Geolocation**, which rides along with `window`/`navigator` in
  pair `21`).
- **Docs:** Module 02 (objects), Module 03 (arrays, destructuring), Module 07 (the DOM: window,
  document, location, selecting, manipulating, events, styling), Module 10 (forms), Module 09
  (**Maps/Sets**), Module 08 (**geolocation**).
- **Pairs (7):** `03` objects · `06` arrays · `07` arrays-map-filter-reduce ·
  `09` destructuring-rest-spread · `21` dom-window-and-selecting · `22` dom-events-and-styling ·
  `25` forms-and-validation.
- **In reserve, if the day runs short:** `31` maps-and-sets (outline IV.G, and M09 Q3 asks when you
  would pick a `Map` over an object). If you do not reach it, spend two minutes on `Map` during
  pair `03` objects; that is the natural place for the contrast anyway.
- **Note on pair `21`:** it ends with `navigator.geolocation`, the first *asynchronous* API in the
  course, callbacks rather than a return value. It is a deliberate bridge to Day 4; flag it as
  "we will come back to why this shape exists."
- **Exit tickets due:** Module 03 (Arrays and Functions), Module 07 (The DOM), Module 09 (Built-In
  Objects), Module 10 (JavaScript and Forms).

## Day 3: Objects, `this`, Prototypes, Closures & JSON

**The object model in depth.** Classes and encapsulation, inheritance and statics, how `this` is
decided, constructor functions and prototypes, closures, error handling, and JSON.

- **Outline sections:** VIII (JavaScript Objects), III.D (Error handling), XI (closures, arrow
  functions), X (JSON).
- **Docs:** Module 04 (classes, call-site vs lexical `this`, error handling, function constructors &
  prototypes), Module 03 (closures), Module 11 (JSON).
- **Pairs (7):** `10` closures · `11` classes · `12` classes-inheritance · `13` this-binding ·
  `14` constructors-and-prototypes · `15` error-handling · `26` json.
- **Run `15` error-handling after `14`, before `26` json.** It completes Module 04 immediately before
  that module's exit ticket, and `try`/`catch` around a `JSON.parse` of malformed input is the natural
  hand-off into the JSON pair that follows.
- **Exit tickets due:** Module 04 (Classes, `this` & Error Handling), Module 11 (JSON).

## Day 4: Asynchronous JavaScript, Modules & Fetch

**Async and code organization.** The event loop, callbacks and timers, promises, `async`/`await`,
concurrency, modules (ES and CommonJS), and network calls with `fetch`.

- **Outline sections:** XI (Asynchronous Programming), IX (Code Organization / Modules), and the Fetch
  browser API.
- **Docs:** Module 05 (event loop, callbacks, promises, async/await, timers), Module 06 (modules,
  including **dynamic modules**), Module 08 (Browser APIs: fetch; geolocation was already met in
  pair `21` on Day 2, so recall it here as the callback-style contrast to promises).
- **Pairs (6):** `16` callbacks-and-timers · `17` promises · `18` async-await ·
  `19` concurrent-promises · `20` modules · `23` fetch-api.
- **Call back to Day 1 for outline XI.J (performance developer tools).** The outline lists it in the
  async section, but the material lives in Module 01 (`04-debugging-javascript.md`) and you taught it
  on Day 1. Re-open the Performance panel here, once the event loop is on the board: the long-task
  track is the same "blocking the main thread" idea, now visible. A two-minute callback closes the
  outline item without re-teaching it.
- **Pair `20` is where two outline gaps get closed.** The demo is Node-side (an ES module reaching a
  CommonJS file through `createRequire`), so the *browser* half of code organization has no demo of its
  own: outline **IX.A** (multiple script elements) and browser `<script type="module">` live only in
  [M06-04](../docs/Module-06-JavaScript-Modules/04-browser-modules.md). Spend two minutes loading one of
  the day's exports in a browser with `<script type="module">`; that plus one `import()` call (below)
  closes IX.A and IX.D without leaving the pair.
- **In reserve, if the day runs short:** `34` dynamic-import (outline IX.D, and M06 Q2 asks how
  `import()` differs from a static `import`). At ~61 min/pair this day has real room, so you have a
  good chance of running it properly. If you do not reach it, show one `import()` call at the end of
  pair `20` modules; it is the same file, one line, and it closes both.
- **Exit tickets due:** Module 05 (Asynchronous JavaScript), Module 06 (JavaScript Modules), Module 08
  (Browser APIs).

## Day 5: TypeScript

**Static typing on top of the JavaScript already learned.** Fewer pairs, more discussion: spend the
extra time on the *why* (catching errors before runtime) and on live type-driven refactoring.

- **Outline sections:** XII (TypeScript).
- **Docs:** Module 12 (what is TypeScript; variable & function types; aliases & interfaces; abstract
  classes; generics; utility types).
- **Pairs (4):** `27` ts-type-annotations · `28` ts-interfaces-and-aliases ·
  `29` ts-classes-and-abstract · `30` ts-generics-and-utility-types.
- **The Day-5 framing opens deck `27`.** What TypeScript is, static vs dynamic, strong vs loose, and
  type coercion (outline §XII.A-D) are the first six slides of `27-ts-type-annotations-Slides.md`, so
  the "why are we doing this" pitch and the first annotations are one continuous deck. Budget ~30
  minutes for those six; the coercion slide is where the room reconnects Day 1 to Day 5.
- **In reserve, and Day 5 is where you are most likely to reach it.** Four pairs do not fill the day,
  so `35` ts-narrowing-and-discriminated-unions is the natural close: M12 Q2 asks how you safely use a
  `string | number`, which *is* narrowing, and discriminated unions are the TypeScript pattern learners
  meet most in real code. If you somehow do not get there, narrow one `unknown` during pair `27`, where
  `any`/`unknown` is already on the slide.
- **Exit ticket due:** Module 12 (TypeScript).

---

## At a glance

| Day | Focus | Core pairs | Per pair | In reserve (if time) | Exit tickets |
|-----|-------|------------|----------|----------------------|--------------|
| 1 | JavaScript core | 6: `01` `02` `04` `05` `08` `24` | ~52 min | 32 dates · 33 recursion | M01, M02 |
| 2 | Objects, arrays, DOM & forms | 7: `03` `06` `07` `09` `21` `22` `25` | ~51 min | 31 maps-and-sets | M03, M07, M09, M10 |
| 3 | Objects, `this`, prototypes, closures, errors, JSON | 7: `10` `11` `12` `13` `14` `15` `26` | ~53 min | - | M04, M11 |
| 4 | Async, modules & fetch | 6: `16` `17` `18` `19` `20` `23` | ~61 min | 34 dynamic-import | M05, M06, M08 |
| 5 | TypeScript | 4: `27` `28` `29` `30` | ~86 min | 35 ts-narrowing | M12 |
| | **Total** | **30** | | **5** | **12** |

Days 1-3 run closest to the line at ~51-53 minutes per pair; Days 4 and 5 hold the week's slack, which
is why `34` and `35` are the two reserve pairs most likely to actually run. Day 1 is the tightest and
rarely reaches its two; plan to close IV.F (dates) with a mention, not a pair.

**Outline coverage check.** The **30 core pairs cover the outline except four items**, all of which are
fully covered in the [docs](../docs/README.md) that every student has, and each of which takes about two
minutes to close live:

| Outline item | Why it is uncovered | Close it by |
|---|---|---|
| **IV.F** JavaScript dates | only in reserve pair `32` | mentioning `Date` during `24` (Day 1) |
| **IV.G** Maps and sets | only in reserve pair `31` | contrasting `Map` with an object during `03` (Day 2) |
| **IX.D** Dynamic modules | only in reserve pair `34` | showing one `import()` at the end of `20` (Day 4) |
| **IX.A** Multiple script elements | **no pair at all**: every browser demo uses a plain inline `<script>`, so `<script type="module">` and multi-script pages are doc-only ([M06-04](../docs/Module-06-JavaScript-Modules/04-browser-modules.md)) | during `20` (Day 4), show the same export loaded in a browser via `<script type="module">` and name the one-module-per-file rule |

IX.A is the one to watch, because unlike the other three it has no reserve pair to fall back on:
if you skip the mention, it goes uncovered entirely. Conveniently all three of IX.A, IX.D and the
module material itself land in the same pair, so one slightly extended `20` closes both gaps at once.

What you should not do is leave these unmentioned *and* unrun, because the outline is what the course
promised. Geolocation (XI.L) is covered inside pair `21`, not as a pair of its own; performance
developer tools (XI.J) is covered by the Day-4 callback noted above.

## Related

- [Course outline](../outline/pdf/JavaScriptEssentials_Outline.pdf): the authoritative topic list.
- [Documentation index](../docs/README.md) · [Demos](../demos/README.md) · [Activities](../activities/README.md)
- [Assessments](../assessments/README.md): the exit-ticket suite.
- [Slides](../slides/README.md): one deck per pair, max 15 pages each.
