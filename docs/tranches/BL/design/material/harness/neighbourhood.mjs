#!/usr/bin/env node
// neighbourhood.mjs · H11-2 (pass 11, REGISTRY P10-5, R-30's reading aid): the neighbourhood of every token a patch
// re-values, printed, never gated. Pass 10's critic found three printed lines a value change made false without naming
// the changed token: a comment naming an alias that falls back to it (dock icon-button.css:95, :104), the comment block
// above its declaration (sizing.css:256-257), and a sentence stating a ladder relation (overlay-plate.css:271-273). A
// seat's R-26 pass reads these per R-30; this prints them so the reading is finite and the same for every seat.
//   re-valued      a custom property declared in a src/ stylesheet (.css, a .vue file's style) on the removed side and
//                  on the added side of one file's hunks, with a different value (whitespace aside). A multi-line value
//                  is read whole; a token the patch only adds or only deletes is not re-valued (DEL reads deletions)
//   (a) declared   every declaration of a re-valued token in a touched file, with the comment block above it: up past
//                  the rule's own code lines (its selector, sibling declarations) to the nearest comment lines, then
//                  every contiguous comment line
//   (b) fallback   every touched-file line holding var(--A, …) whose fallback names a re-valued token (A an alias), with
//                  the comment block above that line; and every touched-file prose line naming the alias A
//   (c) relation   every touched-file prose sentence carrying "bound" or a rung name. A rung name is a name segment
//                  shared by two or more re-valued families of one file (a family: three or more re-valued tokens of
//                  one file whose names differ in one segment, DEL's H9-2 rule over every value, not only scalars)
// Scope: the touched files that exist in the tree (R-21's set). Prose is DEL's proseLines (comments, test titles,
// markdown). It reads no frozen word and adds none: sweep-frozen.json is not opened, and nothing here gates a row.
// H10-1's refusal holds: no tree, no patch, or 0 touched files read prints `nothing read` and exits 2. Otherwise it
// prints every line once, as `file:line [why; …] | text`, sorted by file and line, and exits 0 with `PRINT (…)`.
//   node neighbourhood.mjs --root <patched tree> --patch <file.patch>
import fs from "node:fs";
import path from "node:path";
import { cli } from "./lib.mjs";
import { textFiles, patchPaths, proseLines } from "./deleted-mechanisms.mjs";

const STYLE = /\.(css|vue)$/;
const blank = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const norm = (v) => v.replace(/\s+/g, " ").replace(/\(\s/g, "(").replace(/\s\)/g, ")").trim();
const DECLS = /(^|[\s;{])(--[a-z][a-z0-9-]*[a-z0-9])\s*:\s*([^;{}]+?)\s*(?:!important\s*)?;/g;
// Every declaration in a stylesheet text (comments blanked first, so a quoted `--x: v;` is not one), with its line.
export function declarations(text) {
  const src = blank(text), out = [];
  for (const m of src.matchAll(DECLS)) out.push({ token: m[2], value: norm(m[3]), line: src.slice(0, m.index + m[1].length).split("\n").length });
  return out;
}
// The re-valued tokens of a patch: per src/ stylesheet, the declarations of each hunk's old side (context + removed) and
// new side (context + added); a token on both sides whose value set differs.
export function revalued(patchText) {
  const out = [];
  let file = null, hunks = [], cur = null;
  const flush = () => {
    if (file) {
      const old = new Map(), nu = new Map();
      for (const h of hunks) for (const [side, txt] of [[old, h.old], [nu, h.new]]) for (const d of declarations(txt.join("\n"))) { if (!side.has(d.token)) side.set(d.token, new Set()); side.get(d.token).add(d.value); }
      for (const [token, from] of old) {
        const to = nu.get(token);
        if (to && ([...from].some((v) => !to.has(v)) || [...to].some((v) => !from.has(v)))) out.push({ token, file, from: [...from], to: [...to] });
      }
    }
    hunks = []; cur = null;
  };
  for (const l of patchText.split("\n")) {
    if (l.startsWith("diff --git ")) { flush(); const m = l.match(/ b\/(\S+)$/); file = m && /^src\//.test(m[1]) && STYLE.test(m[1]) ? m[1] : null; continue; }
    if (!file) continue;
    if (l.startsWith("@@")) { cur = { old: [], new: [] }; hunks.push(cur); continue; }
    if (!cur || l.startsWith("\\")) continue;
    if (l[0] === " ") { cur.old.push(l.slice(1)); cur.new.push(l.slice(1)); } else if (l[0] === "-") cur.old.push(l.slice(1)); else if (l[0] === "+") cur.new.push(l.slice(1));
  }
  flush();
  return out;
}
// The rung names: segments shared by two or more re-valued families of one file.
export function rungNames(rv) {
  const groups = new Map();
  for (const r of rv) {
    const segs = r.token.slice(2).split("-");
    for (let k = 0; k < segs.length; k++) {
      const key = `${r.file}|${segs.slice(0, k).join("-")}|${segs.slice(k + 1).join("-")}|${k}`;
      if (!groups.has(key)) groups.set(key, new Set());
      groups.get(key).add(segs[k]);
    }
  }
  const seen = new Map();
  for (const [key, segs] of groups) {
    if (segs.size < 3) continue;
    const file = key.split("|")[0];
    for (const s of segs) { const k = `${file}|${s}`; seen.set(k, (seen.get(k) || 0) + 1); }
  }
  return [...new Set([...seen].filter(([, n]) => n >= 2).map(([k]) => k.split("|")[1]))].sort();
}
// The comment block above line i (0-based): past the rule's own code lines, then the contiguous comment lines. A blank
// line ends both walks. Returns [a, b] (0-based, inclusive) or null.
export function blockAbove(prose, src, i) {
  let k = i - 1;
  while (k >= 0 && !prose[k] && src[k].trim()) k--;
  const end = k;
  while (k >= 0 && prose[k]) k--;
  return end > k ? [k + 1, end] : null;
}
// The sentence around a hit on prose line i (from column `from` to column `to`), inside its run of worded prose lines
// (a line of bare comment leaders, `//` or ` * `, ends the run). A sentence ends at . ! or ? before a space or the
// line's end. Up: unless a sentence ends before the hit on line i, take the line before, and keep going while the line
// taken carries no sentence end. Down: the same, after the hit.
const END = /[.!?]["'`)\]]*(?:\s|$)/;
const worded = (p) => /[A-Za-z0-9]/.test(p || "");
export function sentenceOf(prose, i, from = 0, to = prose[i].length) {
  let a = i, b = i;
  if (!END.test(prose[i].slice(0, from))) while (a > 0 && worded(prose[a - 1])) { a--; if (END.test(prose[a])) break; }
  if (!END.test(prose[i].slice(to))) while (worded(prose[b + 1])) { b++; if (END.test(prose[b])) break; }
  return [a, b];
}
// Every var(--A, fallback) in a text whose fallback names one of `tokens`: { alias, target, line }.
export function fallbacks(text, tokens) {
  const src = blank(text), out = [];
  for (const m of src.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*,/g)) {
    let depth = 1, j = m.index + m[0].length;
    for (; j < src.length && depth; j++) { if (src[j] === "(") depth++; else if (src[j] === ")") depth--; }
    const fb = src.slice(m.index + m[0].length, j - 1);
    for (const t of tokens) if (t !== m[1] && new RegExp(`var\\(\\s*${t.replace(/[-]/g, "\\-")}(?![\\w-])`).test(fb)) out.push({ alias: m[1], target: t, line: src.slice(0, m.index).split("\n").length });
  }
  return out;
}

export function neighbourhood({ root, patchText }) {
  const touched = patchPaths(patchText).filter((p) => { const f = path.join(root, p); return fs.existsSync(f) && fs.statSync(f).isFile(); });
  const files = textFiles(root, touched, []);
  const rv = revalued(patchText), tokens = [...new Set(rv.map((r) => r.token))], rungs = rungNames(rv);
  const out = new Map(), tally = { declared: 0, fallback: 0, alias: 0, relation: 0 };
  const put = (rel, i, why, src) => { const k = `${rel}:${i + 1}`; if (!out.has(k)) out.set(k, { rel, n: i + 1, whys: new Set(), text: src[i] }); out.get(k).whys.add(why); };
  const putBlock = (rel, prose, src, i, why) => { const b = blockAbove(prose, src, i); if (b) for (let k = b[0]; k <= b[1]; k++) put(rel, k, why, src); };
  const aliases = new Map();
  for (const [rel, text] of files) {
    if (!STYLE.test(rel)) continue;
    const src = text.split("\n"), prose = proseLines(rel, text);
    for (const d of declarations(text)) if (tokens.includes(d.token)) {
      tally.declared++;
      put(rel, d.line - 1, `declares ${d.token}`, src);
      putBlock(rel, prose, src, d.line - 1, `above the ${d.token} declaration (:${d.line})`);
    }
    for (const f of fallbacks(text, tokens)) {
      tally.fallback++;
      if (!aliases.has(f.alias)) aliases.set(f.alias, new Set());
      aliases.get(f.alias).add(`${f.target} (${rel}:${f.line})`);
      put(rel, f.line - 1, `var(${f.alias}) falls back to ${f.target}`, src);
      putBlock(rel, prose, src, f.line - 1, `above var(${f.alias}, var(${f.target})) (:${f.line})`);
    }
  }
  const aliasRes = [...aliases.keys()].map((a) => [a, new RegExp(`(?<![\\w-])${a.replace(/[-]/g, "\\-")}(?![\\w-])`)]);
  const relRe = new RegExp(`(?<![A-Za-z0-9-])(bound|${rungs.join("|") || "(?!)"})s?(?![A-Za-z0-9-])`, "gi");
  for (const [rel, text] of files) {
    const src = text.split("\n"), prose = proseLines(rel, text);
    prose.forEach((p, i) => {
      if (!p) return;
      for (const [a, re] of aliasRes) if (re.test(p)) { tally.alias++; put(rel, i, `names the alias ${a}`, src); }
      const ms = [...p.matchAll(relRe)], hit = [...new Set(ms.map((m) => m[1].toLowerCase()))];
      if (!hit.length) return;
      tally.relation++;
      const [a, b] = sentenceOf(prose, i, ms[0].index, ms.at(-1).index + ms.at(-1)[0].length);
      for (let k = a; k <= b; k++) put(rel, k, k === i ? `carries ${hit.map((h) => `"${h}"`).join(", ")}` : `sentence of :${i + 1}`, src);
    });
  }
  const lines = [...out.values()].sort((x, y) => (x.rel < y.rel ? -1 : x.rel > y.rel ? 1 : x.n - y.n));
  return { touched, files: files.length, rv, rungs, aliases, lines, tally };
}

// H11-1: the CLI returns its exit code into process.exitCode and never calls process.exit.
function main() {
  const a = cli({ root: { type: "string" }, patch: { type: "string" } });
  console.log("NEIGHBOURHOOD · R-30's reading aid (H11-2): for each token the patch re-values, its declarations and the comment block above each, every var() falling back to it and the prose naming that alias, and every sentence carrying \"bound\" or a rung name, over the touched files (printed, never gated)");
  if (!a.root || !a.patch) { console.log("usage: node neighbourhood.mjs --root <tree> --patch <file.patch>\nFAIL (nothing read: no tree or no patch)"); return 2; }
  const root = path.resolve(a.root), r = neighbourhood({ root, patchText: fs.readFileSync(path.resolve(a.patch), "utf8") });
  console.log(`tree: ${root} · patch ${path.basename(a.patch)}: ${r.touched.length} touched files exist · ${r.files} read as text`);
  if (!r.files) { console.log(`0 touched files read under ${root}: nothing read\nFAIL (nothing read: ${fs.existsSync(root) ? "no touched file exists in the tree" : "the tree does not exist"})`); return 2; }
  console.log(`re-valued: ${r.rv.length} declarations of ${new Set(r.rv.map((x) => x.token)).size} tokens`);
  for (const x of r.rv) console.log(`  ${x.token} (${x.file}): ${x.from.join(" | ")} → ${x.to.join(" | ")}`.slice(0, 240));
  console.log(`aliases (var(--A, …) falling back to a re-valued token): ${r.aliases.size}`);
  for (const [al, ts] of r.aliases) console.log(`  ${al} → ${[...ts].join(", ")}`);
  console.log(`rung names (segments of two or more re-valued families of one file): ${r.rungs.join(", ") || "none"}; and "bound"`);
  for (const l of r.lines) console.log(`${l.rel}:${l.n} [${[...l.whys].join("; ")}] | ${l.text.slice(0, 200)}`);
  const files = new Set(r.lines.map((l) => l.rel));
  console.log(`NEIGHBOURHOOD lines=${r.lines.length} files=${files.size} declared=${r.tally.declared} fallback=${r.tally.fallback} alias-prose=${r.tally.alias} relation=${r.tally.relation}`);
  console.log(`PRINT (${r.lines.length} lines in ${files.size} files; not gated)`);
  return 0;
}
if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();
