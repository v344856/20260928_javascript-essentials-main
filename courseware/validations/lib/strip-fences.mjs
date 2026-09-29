// Blank out everything in a Markdown file that is NOT prose, while preserving
// the exact line and column of every character that remains. Prose checks (the
// language tier) can then scan the result and report a `file:line:column` that
// still points at the right place in the real file.
//
// "Not prose" means: fenced code blocks, indented code blocks, inline code
// spans, HTML comments, YAML front matter, Markdown table delimiter rows, link
// and image targets, and bare URLs. A `grey` inside a CSS snippet, an
// `--no-build` flag, and the em dash in a box-drawing diagram are all code, and
// none of them is a spelling or punctuation defect.
//
// Every blanked character becomes a space, so offsets never shift.

const blank = (s) => s.replace(/[^\n]/g, ' ');

// Inline constructs, applied line by line to lines that survived the block pass.
function stripInline(line) {
  let out = line;
  // Inline code spans, longest fence first so ``a ` b`` is handled correctly.
  out = out.replace(/(`+)(?:(?!\1).)*\1/g, blank);
  // Image and link targets: keep the visible text, blank the URL/title.
  out = out.replace(
    /(!?\[[^\]]*\]\()([^)]*)(\))/g,
    (m, open, url, close) => open + blank(url) + close,
  );
  // Reference-style link definitions and bare/autolinked URLs.
  out = out.replace(/<[^>\s]+:[^>\s]*>/g, blank);
  out = out.replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, blank);
  return out;
}

// A Markdown table's delimiter row (|---|:--:|) is punctuation, not prose.
const TABLE_DELIM = /^\s*\|?[\s:|-]+\|[\s:|-]*$/;

export function stripFences(text) {
  const lines = text.split('\n');
  const out = new Array(lines.length);

  let fence = null; // the opening fence's marker, when inside a fenced block
  let inComment = false;
  let inFrontMatter = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\r$/, '');
    const cr = raw.endsWith('\r') ? '\r' : '';
    const keep = (s) => (out[i] = s + cr);

    // YAML front matter: only when `---` is the very first line of the file.
    if (i === 0 && /^---\s*$/.test(line)) {
      inFrontMatter = true;
      keep(blank(line));
      continue;
    }
    if (inFrontMatter) {
      if (/^(---|\.\.\.)\s*$/.test(line)) inFrontMatter = false;
      keep(blank(line));
      continue;
    }

    // Fenced code blocks (``` or ~~~), closed only by a fence at least as long.
    if (fence) {
      keep(blank(line));
      const close = line.match(/^\s*(`{3,}|~{3,})\s*$/);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) fence = null;
      continue;
    }
    const open = line.match(/^\s*(`{3,}|~{3,})/);
    if (open) {
      fence = open[1];
      keep(blank(line));
      continue;
    }

    // HTML comments, which may span lines.
    if (inComment) {
      keep(blank(line));
      if (line.includes('-->')) inComment = false;
      continue;
    }
    if (/<!--/.test(line) && !/-->/.test(line)) {
      inComment = true;
      keep(blank(line));
      continue;
    }

    // Indented code blocks and table delimiter rows.
    if (/^ {4,}\S/.test(line) || TABLE_DELIM.test(line)) {
      keep(blank(line));
      continue;
    }

    keep(stripInline(line.replace(/<!--.*?-->/g, blank)));
  }

  return out.join('\n');
}
