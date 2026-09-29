# Debugging JavaScript

Every program misbehaves eventually. **Debugging** is the skill of finding out *why*: watching what your
code actually does versus what you expected. JavaScript gives you a range of tools, from the humble
`console.log` to full step-through debuggers in the browser and in VS Code. This chapter covers all of
them so you can pick the right tool for the bug in front of you.

---

## The `console` Object

The fastest way to see what your code is doing is to print it. The **`console`** object works the same in
the browser and in Node.js, and it offers far more than just `log`:

```js
console.log("Basic message", 42);   // general-purpose output
console.info("Some information");    // like log, marked as info
console.warn("Something looks off"); // yellow warning
console.error("Something failed");   // red error (with a stack trace)
```

A few less-obvious methods are worth knowing because they save real time:

```js
// Show an object as a sortable table
console.table([
  { name: "Ada", score: 90 },
  { name: "Grace", score: 95 },
]);

// Group related messages together
console.group("User details");
console.log("Name: Ada");
console.log("Role: Admin");
console.groupEnd();

// Measure how long something takes
console.time("loop");
for (let i = 0; i < 1_000_000; i++) {}
console.timeEnd("loop"); // loop: 3.4ms

// Print only when a condition fails
console.assert(1 + 1 === 3, "Math is broken"); // logs the message
```

`console.log` is fine for quick checks, but for anything more than a line or two, the interactive
debuggers below let you *pause* and *inspect* without editing your code at all.

---

## The `debugger` Statement

JavaScript has a built-in keyword that pauses execution: **`debugger`**. When the browser DevTools (or a
Node debugger) is open and your code hits this line, it **stops**, letting you look around before
continuing:

```js
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    debugger; // execution pauses here when DevTools is open
    total += item.price;
  }
  return total;
}
```

If no debugger is attached, the statement is ignored, so it is harmless, but remember to remove
it before shipping, since a stray `debugger` will freeze the code for anyone with DevTools open.

---

## Debugging in the Browser with DevTools

Browser **DevTools** (open with **F12**) is where you debug code that runs on a page. The tab you want for
debugging is **Sources**. Here are the pieces you will use most.

### Breakpoints

A **breakpoint** tells the browser to pause on a specific line, the same idea as the `debugger`
statement, but you set it by **clicking the line number** in the Sources panel, with no code change
needed. When execution reaches that line, the page freezes and you can inspect everything.

You can also set:

- **Conditional breakpoints**: right-click a line number and give a condition, so it only pauses when
  (for example) `i === 5`.
- **DOM breakpoints**: pause when an element changes, useful for tracking down what code alters the page.

### Stepping Through Code

Once paused, a row of controls lets you move through the program one piece at a time:

- **Resume** (▶): continue until the next breakpoint.
- **Step over**: run the current line and stop on the next one, without diving into function calls.
- **Step into**: go *inside* the function called on the current line.
- **Step out**: finish the current function and stop where it was called from.

### Watch and Scope

While paused, two panels show you the program's state:

- **Scope** lists every variable currently in scope and its value, with no `console.log` required.
- **Watch** lets you add specific expressions (like `item.price` or `total * 2`) and see them update as
  you step, so you can keep an eye on exactly the values you care about.

### The Call Stack

The **Call Stack** panel shows the chain of function calls that led to the current line: who called whom,
from the top down. Click any frame to jump to that point and inspect its variables. This answers the
question "how did the code even get here?", which is often the whole mystery.

---

## Debugging Node.js in VS Code

For code that runs in Node.js, the most comfortable place to debug is **inside VS Code**: you set
breakpoints in the same editor where you write the code, and inspect variables without leaving it.

### Set a Breakpoint

Open your `.js` file and click in the **gutter** just left of a line number. A red dot appears, which
marks a breakpoint. You can set as many as you like.

### Start Debugging

The quickest path: open the file you want to run and press **F5**. VS Code asks which environment to use;
choose **Node.js**, and it launches your script with the debugger attached, pausing at your first
breakpoint.

For anything beyond a one-off, save the settings in a **`launch.json`** file so you can start debugging
the same way every time. Open the **Run and Debug** view (the play-with-bug icon, or `Ctrl+Shift+D`),
click **create a launch.json file**, and VS Code writes a `.vscode/launch.json` you can adjust:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug current file",
      "program": "${workspaceFolder}/${relativeFile}"
    }
  ]
}
```

`"program"` points at the script to run, here whichever file is open (`${relativeFile}`). Save it, and
your configuration appears in the dropdown at the top of the Run and Debug view; press the green arrow to
start.

### Step Controls

When execution pauses at a breakpoint, VS Code shows a floating toolbar with the **same controls** as the
browser: continue, step over, step into, step out, restart, and stop. On the left, the **Variables**,
**Watch**, and **Call Stack** panels give you exactly the inspection tools described above, so the skills
transfer directly between the browser and Node.

---

## Measuring Performance with DevTools

Debugging asks *why is this wrong?*; **profiling** asks *why is this slow?* When code is correct but
sluggish, DevTools has tools for measuring instead of guessing. The golden rule is always to
**measure before optimizing**, because the slow part is rarely where you expect.

### Quick timing in code

For a single stretch of code, the `console.time` timer from earlier is the fastest measure:

```js
console.time("build-list");
buildBigList();
console.timeEnd("build-list"); // build-list: 128ms
```

For finer control, **`performance.now()`** returns a high-resolution timestamp (fractional
milliseconds) that you can subtract to time any span:

```js
const start = performance.now();
doWork();
const elapsed = performance.now() - start;
console.log(`doWork took ${elapsed.toFixed(1)}ms`);
```

### The Performance panel

For a whole page, including rendering, event handlers, and async work, open **DevTools → Performance**.
Click **Record**, exercise the slow interaction, then stop. DevTools produces a timeline you can read:

- **The flame chart** shows which functions ran and how long each took, stacked by who called whom;
  the widest bars are where the time went.
- **The main-thread track** reveals long tasks that block the page (a solid block of scripting is why the
  UI froze), tying directly back to the single-threaded **event loop**.
- **Call tree / bottom-up** views total the time per function, so you can find the real hot spot rather
  than the first thing you suspected.

The **Memory** panel is the companion tool for the *other* kind of slowness: take heap snapshots to find
objects that never get released (a memory leak) when a page grows heavier the longer it runs.

The workflow is the same every time: **measure, find the biggest cost, fix that one thing, then measure
again** to confirm it actually helped.

---

## A Practical Approach

When something is wrong, a reliable order of attack:

1. **Read the error message and its stack trace**: it usually names the file and line.
2. **Reproduce it reliably**: know the exact steps that trigger the bug.
3. **Set a breakpoint near the problem** and step through, watching the variables.
4. **Check your assumptions**: the bug is almost always a value that is not what you thought it was.

Reach for `console.log` for a quick peek, and for a real breakpoint-and-step session when the quick peek
is not enough.

---

## Summary

- The **`console`** object does more than `log`: use `table`, `group`, `time`, `assert`, `warn`, and
  `error` to get clearer output.
- The **`debugger`** statement pauses execution when DevTools is open; remove it before shipping.
- In the browser, use **DevTools → Sources**: set **breakpoints**, **step** through code (over/into/out),
  read the **Scope** and **Watch** panels, and follow the **Call Stack** to see how you got there.
- In **VS Code**, debug Node.js by clicking a gutter breakpoint and pressing **F5**; save a
  **`launch.json`** for repeatable runs. The Variables, Watch, and Call Stack panels mirror the browser.
- To find *slow* (not wrong) code, **measure first**: time spans with `console.time` /
  `performance.now()`, and use **DevTools → Performance** (the flame chart and main-thread track) to see
  where the time really goes before optimizing.
- A dependable routine: read the error, reproduce it, break near it, step through, and check your
  assumptions about each value.
