#!/usr/bin/env node
/*
 * preprocess.mjs: turns an authored deck (../md/NN-*.md) into a Marp-ready
 * Markdown stream on stdout.
 *
 * The authored decks keep the original, tool-agnostic convention (see CLAUDE.md
 * §5): a YAML block with title/subtitle/author, `#` headings as section-divider
 * slides, `##` headings as content slides, and NO `---` rules. Marp instead
 * needs `marp: true` front matter and `---` between every slide. This script
 * bridges the two so authors never hand-write Marp scaffolding.
 *
 * What it does:
 *   1. Reads the leading YAML front matter (title / subtitle / author).
 *   2. Emits Marp front matter (theme, pagination, footer) + a title slide.
 *   3. Inserts a `---` slide break before every `#` / `##` heading.
 *   4. Tags `#` slides with class `section` and the title slide with `title`.
 *   5. Is fence-aware: `#` lines *inside* ``` code fences (e.g. a bash comment)
 *      are left alone, never treated as slide breaks.
 *
 * Usage:  node preprocess.mjs <input.md>   > <output.md>
 */

import { readFileSync } from "node:fs";

const COURSE = "JavaScript & TypeScript Essentials";

const path = process.argv[2];
if (!path) {
  console.error("usage: node preprocess.mjs <input.md>");
  process.exit(1);
}

const raw = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const lines = raw.split("\n");

// --- 1. Peel off the leading YAML front matter, if present ---------------
const meta = {};
let bodyStart = 0;
if (lines[0].trim() === "---") {
  let i = 1;
  for (; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      i++;
      break;
    }
    const m = lines[i].match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (m) {
      let val = m[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      meta[m[1]] = val;
    }
  }
  bodyStart = i;
}

const title = meta.title || "Untitled";
const subtitle = meta.subtitle || "";
const author = meta.author || "";
// The footer shows the course name on every content slide.
const footer = COURSE;

// --- 2. Emit Marp front matter + title slide -----------------------------
const out = [];
out.push("---");
out.push("marp: true");
out.push("theme: courseware");
out.push("paginate: true");
out.push(`footer: "${footer.replace(/"/g, '\\"')}"`);
out.push("---");
out.push("");
out.push("<!-- _class: title -->");
out.push("<!-- _paginate: false -->");
out.push("");
out.push(`# ${title}`);
out.push("");
if (subtitle) {
  out.push(`## ${subtitle}`);
  out.push("");
}
if (author) {
  out.push(author);
  out.push("");
}

// --- 3. Walk the body, inserting slide breaks at headings ----------------
let inFence = false;
for (let i = bodyStart; i < lines.length; i++) {
  const line = lines[i];

  // Track fenced code blocks so headings inside them are left untouched.
  if (/^\s*```/.test(line)) {
    inFence = !inFence;
    out.push(line);
    continue;
  }

  if (!inFence) {
    const h1 = /^# (?!#)/.test(line); // section divider
    const h2 = /^## (?!#)/.test(line); // content slide
    if (h1 || h2) {
      out.push("---");
      out.push("");
      if (h1) {
        out.push("<!-- _class: section -->");
        out.push("<!-- _paginate: false -->");
        out.push("");
      }
      out.push(line);
      continue;
    }
  }

  out.push(line);
}

// Collapse any accidental run of blank lines to keep the output tidy.
const text = out.join("\n").replace(/\n{3,}/g, "\n\n");
process.stdout.write(text.endsWith("\n") ? text : text + "\n");
