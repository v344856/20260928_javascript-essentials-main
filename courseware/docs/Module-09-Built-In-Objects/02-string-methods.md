# Working with Strings

Text is everywhere: names, messages, file paths, and user input. The `String` type gives you a rich set
of methods for searching, extracting, and transforming text. This chapter covers the ones you will
reach for constantly.

One idea underpins all of them: **strings are immutable**. Every method that "changes" a string
actually returns a **new** string, leaving the original untouched.

---

## Length and indexing

`length` is a property (no parentheses). Characters are accessed by zero-based index.

```js
let coffee = "espresso";

coffee.length; // 8

coffee[0];     // "e"  (first character)
coffee[7];     // "o"  (last character)
coffee[100];   // undefined (out of range)

coffee.charAt(1); // "s"  - older equivalent of coffee[1]
```

A common pattern is grabbing the last character:

```js
coffee[coffee.length - 1]; // "o"
coffee.at(-1);             // "o"  - at() accepts negative indexes
```

---

## Strings are immutable

You cannot change a character in place. The assignment below silently does nothing.

```js
let word = "hello";
word[0] = "H";    // ignored - no error in non-strict mode
console.log(word); // "hello"  (unchanged)
```

To "change" a string, build a new one:

```js
let word = "hello";
let capitalized = "H" + word.slice(1);
console.log(capitalized); // "Hello"
console.log(word);        // "hello" (original untouched)
```

Keep this in mind for every method below: **the return value is the result**; the original variable
does not change unless you reassign it.

---

## Extracting substrings: `slice` and `substring`

Both pull out a portion of a string using a start and (optional) end index. The end index is
**exclusive**.

```js
let text = "Summit Coffee";

text.slice(0, 6);  // "Summit"
text.slice(7);     // "Coffee"  (to the end)
```

`slice` accepts **negative** indexes, counting from the end, which is often handy:

```js
text.slice(-6);    // "Coffee"  (last 6 characters)
text.slice(-6, -1); // "Coffe"
```

`substring` is similar but does **not** understand negative numbers (it treats them as `0`), and it
swaps the arguments if start is greater than end. Prefer `slice` in new code; you will see
`substring` in older code.

```js
"Summit Coffee".substring(0, 6); // "Summit"
"Summit Coffee".substring(-3);   // "Summit Coffee" (negative -> 0)
```

---

## Searching within a string

```js
let title = "The Summit Coffee Roasters";

title.indexOf("Coffee");  // 11   (index where it starts)
title.indexOf("Tea");     // -1   (not found)
title.lastIndexOf("o");   // 19   (searches from the right)
```

Modern code usually prefers the boolean-returning methods, which read more clearly:

```js
title.includes("Coffee");   // true
title.startsWith("The");    // true
title.endsWith("Roasters"); // true
```

All of these are case-sensitive:

```js
title.includes("coffee"); // false  ("coffee" != "Coffee")
```

A reliable case-insensitive search lowercases both sides first:

```js
title.toLowerCase().includes("coffee"); // true
```

---

## Changing case

```js
"Latte".toUpperCase(); // "LATTE"
"Latte".toLowerCase(); // "latte"
```

These return new strings and are the standard way to normalize text before comparing it.

---

## Cleaning up whitespace: `trim`, `padStart`, `padEnd`

`trim` removes whitespace from both ends, which matters when handling user input from form fields:

```js
let input = "   alice@example.com   ";
input.trim(); // "alice@example.com"

// trimStart() and trimEnd() remove from just one side.
```

Padding grows a string to a target length by adding characters to the start or end. Great for lining
up numbers or building fixed-width output:

```js
"5".padStart(3, "0");   // "005"   (pad the front to length 3)
"42".padStart(3, "0");  // "042"
"7".padEnd(3, ".");     // "7.."

// A simple time formatter:
let minutes = 9;
`00:${String(minutes).padStart(2, "0")}`; // "00:09"
```

---

## Splitting and joining

`split` breaks a string into an **array** of pieces at each occurrence of a separator.

```js
let csv = "espresso,latte,mocha";
csv.split(","); // ["espresso", "latte", "mocha"]

"a-b-c".split("-");  // ["a", "b", "c"]
"hello".split("");   // ["h", "e", "l", "l", "o"]  (into characters)
"one two   three".split(/\s+/); // ["one", "two", "three"] (split on runs of whitespace)
```

The reverse operation, `join`, lives on arrays and turns them back into a string:

```js
["espresso", "latte", "mocha"].join(" | "); // "espresso | latte | mocha"
```

---

## Replacing text: `replace` and `replaceAll`

`replace` swaps the **first** match only when given a plain string:

```js
"a cat and a cat".replace("cat", "dog"); // "a dog and a cat"
```

`replaceAll` swaps **every** occurrence, and it is the clear, modern choice:

```js
"a cat and a cat".replaceAll("cat", "dog"); // "a dog and a dog"

let path = "C:\\Users\\eric";
path.replaceAll("\\", "/"); // "C:/Users/eric"
```

Because strings are immutable, both return a new string and leave the original alone.

---

## Repeating

`repeat` concatenates a string with itself N times:

```js
"ab".repeat(3);  // "ababab"
"=".repeat(10);  // "=========="  (a quick divider line)
"la".repeat(0);  // ""
```

---

## Template literals for building strings

While not a "method," backtick **template literals** are the modern way to assemble text with
embedded values, replacing clumsy `+` concatenation:

```js
let name = "Alice";
let count = 3;

// Old way:
"Hi " + name + ", you have " + count + " orders.";
// Modern way:
`Hi ${name}, you have ${count} orders.`; // "Hi Alice, you have 3 orders."
```

They also span multiple lines without `\n`.

---

## Summary

* Strings are **immutable**: every method returns a **new** string, and the original is unchanged.
* `length` and `[index]` (or `.at(-1)`) read size and characters.
* `slice` extracts substrings and supports **negative** indexes; prefer it over `substring`.
* Search with `indexOf`/`lastIndexOf` or the clearer `includes`/`startsWith`/`endsWith` (all
  case-sensitive).
* `toUpperCase`/`toLowerCase` normalize case; `trim` cleans input; `padStart`/`padEnd` format
  fixed-width output.
* `split` makes an array; `join` puts it back together; `replaceAll` swaps every match; `repeat`
  duplicates.
* Use **template literals** (`` `...${x}...` ``) to build strings cleanly.
