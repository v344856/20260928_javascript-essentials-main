# Activity: Generic Helpers and a Task Tracker

Same concepts as the demo (generic functions, constraints, a generic class, then the built-in utility types), applied to a small helper library and a task tracker. You will write reusable code that keeps its types, then derive several new shapes from one `Task` interface without restating any of it.

**Estimated time:** 15-20 minutes

## Setup

Your working files are in `end/`. Open `end/index.ts` and complete the TODOs.
Run `npm start` to execute your code (`npm run solution` runs the reference answer).
The finished reference solution is in `solution/`.

> These run straight through `tsx`, with no build step. Type errors will not stop `tsx` from running the file, so read the editor's squiggles too.

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## Tasks

### Task 1: A generic function

Write `firstOrNull<T>(items: T[]): T | null` returning the first element, or `null` when the array is empty. Note that the second call passes the type explicitly (`firstOrNull<string>([])`) because an empty array gives TypeScript nothing to infer from.

**Expected output:**
```
10
null
```

### Task 2: A constrained generic

Write `pluckNames<T extends { name: string }>(items: T[]): string[]`. The `extends` constraint is what lets you safely read `item.name` inside; without it, TypeScript has no idea a `T` has a name.

**Expected output:**
```
[ 'Falcons', 'Jets' ]
```

### Task 3: A generic class

Write `class Stack<T>` with a private `items: T[]`, a `push(item: T)`, a `pop(): T | undefined`, and a `get size()`. Create a `Stack<number>` and push three values.

**Expected output:**
```
popped: 3
size: 2
```

### Task 4: Partial for a patch update

Write `patchTask(task: Task, changes: Partial<Task>): Task` that spreads `changes` over `task`. `Partial<Task>` makes every field optional, so a caller can supply only what changed.

**Expected output:**
```
done? true
```

### Task 5: Pick and Omit

Derive `TaskSummary` as `Pick<Task, "id" | "title">` and `NewTask` as `Omit<Task, "id">`, the shape you accept before the server assigns an id. Build one value of each and log them.

**Expected output:**
```
summary: { id: 1, title: 'Write report' }
draft title: Book venue
```

### Task 6: Record for a lookup table

Declare `type Status = "todo" | "doing" | "done"` and a `counts: Record<Status, number>`. `Record` forces you to supply every key in the union; leave one out and it will not compile.

**Expected output:**
```
doing count: 2
```

## What You'll Learn

- Writing a generic function and letting TypeScript infer the type parameter.
- When you have to supply the type argument explicitly.
- Constraining a type parameter with `extends` so the body can use a property.
- Building a generic class that keeps its element type.
- `Partial<T>` for updates carrying only changed fields.
- `Pick` and `Omit` deriving smaller shapes from an existing type.
- `Record<Keys, Value>` requiring every key in a union of literals.

## Stretch goal

*Optional, for fast finishers. The reference `solution/` intentionally does **not** include this.*

Write `groupBy<T, K extends keyof T>(items: T[], key: K)` that returns a `Map` from each distinct value of that property to the array of items carrying it. The `K extends keyof T` constraint is what makes `items[0][key]` type-safe and stops a typo'd property name compiling. Then use it to group tasks by `done`, and try passing a key that does not exist to watch the compiler reject it.

Sample output:

```
Map(2) { false => [ 'Write report' ], true => [ 'Book venue' ] }
```

## Related reading

- [Generics](../../docs/Module-12-TypeScript/05-generics.md)
- [Utility Types](../../docs/Module-12-TypeScript/06-utility-types.md)
- Diagram: [How a Type Parameter Flows](../../diagrams/png/generics-type-flow.png)
- Diagram: [Utility Types as Transforms](../../diagrams/png/utility-types.png)
