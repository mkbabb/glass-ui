#!/usr/bin/env node
// DEL · H6-1 (pass 6), H7-2 (pass 7), H8-1 (pass 8): a mechanism a patch deletes or a value it changes is not described
// as live in any file the patch touches, nor anywhere under src/, demo/ or tests/.
// H6-1: a deletion falsifies untouched prose too, so DEL reads EVERY text file under its roots (node_modules and
// binaries skipped), not only the touched files. Each patch declares the names it deletes in a JSON file
// ({ patch, names: [], exact: [] }); declare-removed.mjs builds that list from a patch's removed lines.
// H7-2: every name also matches in its WORD FORM (wordForm below):
//   an identifier         exact, as written (case-sensitive), and, when it splits into two or more words
//                         (`backdropMode`, `--glass-backdrop-luma`, `data-backdrop-mode`), as those words
//   a name with a space   a phrase: its words (split on spaces and hyphens)
// Words match case-insensitively, from a word start, joined by any run (or none) of whitespace, comment leaders
// (* // #), hyphens and underscores. Each word takes its inflections: -s -es -d -ed -ing -ings -er -ers, a final e
// dropped before -ing/-ed/-er, a final consonant doubled. A single-word identifier stays exact only.
// H8-1 (REGISTRY P7-2.2 R-17): the row reads "every touched file", so DEL's scope is the row's own text.
//   scope arm          the roots are src/, demo/ and tests/, plus every path the patch's `diff --git` headers name that
//                      exists in the tree (the paths `git apply --numstat` lists; a deleted file is gone and not read)
//   changed-value arm  with --patch: each custom property whose declared value the patch changes in a src/ file (a
//                      removed `--x: v` and an added `--x: v′` in the same file, v not among the added values) gives
//                      its old literals (the numbers and dimensions of v that no added value carries; v itself when it
//                      has none and is one word). A comment or test-title line in scope that carries an old literal
//                      together with a word of `--x`'s name is a hit. P-3: prose names a rung by its token
//   REPORTED arm       the repo-root *.md and docs/canon/ are read under both arms and printed, never gated (they are
//                      not touched files; the landing's docs pass owns them)
// H9 (pass 9, REGISTRY P8-5 H9-1..H9-3, R-21):
//   homonyms (H9-1)    a deleted concept whose phrase is also a live homonym ("tint seam") is declared with `at` site
//                      entries for the live sites. They are kept beside the phrase in the concepts file (`homonyms`), and
//                      declare-removed.mjs carries them into the declaration's `exact`, so a stale homonym site FAILs too
//   tuple arm (H9-2)   a family is three or more changed tokens of one file that differ in one name segment
//                      (`--glass-blur-{wash,quiet,…}-radius`). Its old values in declaration order, with or without the
//                      unit, joined by `/` or `·` ("10/14/16/20/22px"), on a prose line is a hit: one gated row per family
//   rung reading       a family rung's own word followed by its old number with no other number between ("the plain
//                      overlay paints 22") is printed for R-21 (b)'s reading and never gated: tense decides it, and a
//                      word sweep cannot read tense (P8-5 H9-2)
//   arm-aware (H9-3)   a changed value is keyed by the file and selector that declare it. A value hit whose line cites
//                      (by file name or selector) an arm that still declares the old literal is true and not a hit
//                      ("`--glass-veil-step` 0.04, tokens/dark-arm.css" when only the `:root` arm moved); it prints as
//                      `arm-true`
// The exact list (a declaration's `exact: [{ name, why, at? }]`, owned by the seat that declares, read by the critic):
//   no `at`            an identifier whose word form is ordinary live prose ("composited over" for `compositeOver`) is
//                      read exact only. Only an identifier can be listed; a phrase is its own word form
//   `at: "file:line"`  (or "file:a-b") one site read in context and exempt for that name, in either arm: a test line
//                      that asserts the deletion, a token comment that reports what the old value measured. A site
//                      entry that exempts no hit is stale and FAILs, so the list cannot outlive the lines it names
// One gated row per name and per changed token; each hit prints file:line once.
//   node deleted-mechanisms.mjs --root <tree> --declare <names.json> [--patch <file.patch>]
import fs from "node:fs";
import path from "node:path";
import { cli } from "./lib.mjs";

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// The words of a name: an identifier splits on its leading -- / data- / ., on - and _, and on camel humps.
export function words(name) {
  const n = name.trim();
  if (/\s/.test(n)) return n.split(/[\s-]+/).filter(Boolean).map((w) => w.toLowerCase());
  return n.replace(/^(--|\.|@)/, "").replace(/^data-/, "data ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_-]+/).filter(Boolean).map((w) => w.toLowerCase()).filter((w, i) => !(i === 0 && w === "data" && /^data-/.test(n)));
}
const INFL = "(?:s|es|d|ed|ing|ings|er|ers)?";
const wordRe = (w) => {
  const alts = [esc(w) + INFL];
  if (w.endsWith("e")) alts.push(esc(w.slice(0, -1)) + "(?:ing|ings|ed|er|ers)");
  if (/[^aeiou][aeiou][bdgklmnprt]$/.test(w)) alts.push(esc(w + w.at(-1)) + "(?:ing|ings|ed|er|ers)");
  return `(?:${alts.join("|")})`;
};
const SEP = "(?:[\\s*#_-]|//)*";
// The word-form pattern of a name, or null where it has none (a single-word identifier).
export function wordForm(name) {
  const ws = words(name);
  if (!/\s/.test(name.trim()) && ws.length < 2) return null;
  return new RegExp("(?<![A-Za-z0-9])" + ws.map(wordRe).join(SEP) + "(?![a-z0-9])", "gi");
}
export const exactForm = (name) => (/\s/.test(name.trim()) ? null : new RegExp(esc(name.trim()), "g"));

const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.name === "node_modules" ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : []);
const readText = (root, list) => list.map((f) => [f, fs.readFileSync(f)]).filter(([, b]) => !b.subarray(0, 8192).includes(0)).map(([f, b]) => [path.relative(root, f), b.toString("utf8")]);
// The gated scope: src/, demo/, tests/, and every path the patch names that exists in the tree (H8-1's scope arm).
export const ROOTS = ["src", "demo", "tests"];
export function textFiles(root, extra = [], roots = ROOTS) {
  const all = new Set(roots.flatMap((r) => walk(path.join(root, r))));
  for (const p of extra) { const f = path.join(root, p); if (fs.existsSync(f) && fs.statSync(f).isFile()) all.add(f); }
  return readText(root, [...all].sort());
}
// The REPORTED scope: the repo-root markdown and docs/canon/, minus anything the gated scope already reads.
export function reportedFiles(root, gated) {
  const have = new Set(gated.map(([rel]) => rel));
  const top = fs.existsSync(root) ? fs.readdirSync(root).filter((f) => f.endsWith(".md")).map((f) => path.join(root, f)) : [];
  return readText(root, [...top, ...walk(path.join(root, "docs", "canon"))].filter((f) => !have.has(path.relative(root, f))));
}
// The paths a patch's `diff --git` headers name (b/ side), as `git apply --numstat` lists them.
export const patchPaths = (patchText) => [...new Set([...patchText.matchAll(/^diff --git a\/\S+ b\/(\S+)$/gm)].map((m) => m[1]))];

// H8-1's changed-value arm: { token, from, to, literals, file } for each custom property whose declared value the
// patch changes in a src/ file. A declaration is a whole line (`--x: v;`), so a token quoted in a comment is not one.
// The arm reads scalar values (a number or a dimension: `0.48`, `16px`, `40%`), the value prose quotes for a rung; a
// composite value (a colour, a color-mix) has no one literal a sentence would carry, and is not read.
const DECL = /^\s*(--[a-z][a-z0-9-]*[a-z0-9])\s*:\s*([^;{}]+?)\s*(?:!important\s*)?;/;
const SCALAR = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|deg|ms|s|%)?$/;
export function changedValues(patchText) {
  const out = [];
  let file = null, rm = new Map(), add = new Map();
  const flush = () => {
    for (const [token, olds] of rm) {
      const news = add.get(token);
      if (news) for (const v of olds) if (!news.has(v) && SCALAR.test(v)) out.push({ token, from: v, to: [...news].join(" | "), literals: [v], file });
    }
    rm = new Map(); add = new Map();
  };
  for (const l of patchText.split("\n")) {
    if (l.startsWith("diff --git ")) { flush(); const m = l.match(/ b\/(\S+)$/); file = m && /^src\//.test(m[1]) ? m[1] : null; continue; }
    if (!file || l.startsWith("---") || l.startsWith("+++")) continue;
    const side = l[0] === "-" ? rm : l[0] === "+" ? add : null, m = side && l.slice(1).match(DECL);
    if (!m) continue;
    if (!side.has(m[1])) side.set(m[1], new Set());
    side.get(m[1]).add(m[2]);
  }
  flush();
  return out;
}

// The prose of a file, per line: a markdown file is all prose; elsewhere block comments (/* */ and <!-- -->), line
// comments (// after whitespace or punctuation, so a URL's scheme is not one) and test titles (the string argument of
// it/test/describe). Returns one string per line, empty where the line holds no prose.
const TITLE = /\b(?:it|test|describe)(?:\.(?:skip|only|todo|concurrent))?\(\s*(["'`])((?:\\.|(?!\1)[^\\])*)\1/g;
const COMMENT = /\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|(?<=^|[\s;,(){}])\/\/[^\n]*/g;
export function proseLines(rel, text) {
  const lines = text.split("\n");
  if (rel.endsWith(".md")) return lines;
  const out = lines.map(() => ""), starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === "\n") starts.push(i + 1);
  const lineAt = (i) => { let lo = 0, hi = starts.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (starts[mid] <= i) lo = mid; else hi = mid - 1; } return lo; };
  for (const re of [COMMENT, TITLE]) for (const m of text.matchAll(re)) {
    const a = m.index, b = a + m[0].length;
    for (let ln = lineAt(a); ln <= lineAt(Math.max(a, b - 1)); ln++) out[ln] += " " + text.slice(Math.max(a, starts[ln]), Math.min(b, (starts[ln + 1] ?? text.length + 1) - 1));
  }
  return out;
}

// Every hit of a name in the files, once per file:line, with the matched text.
export function hits(name, files, exactOnly = false) {
  const res = [exactForm(name), exactOnly ? null : wordForm(name)].filter(Boolean), out = new Map();
  for (const [rel, text] of files) for (const re of res) for (const m of text.matchAll(re)) {
    const line = text.slice(0, m.index).split("\n").length, k = `${rel}:${line}`;
    if (!out.has(k)) out.set(k, m[0].replace(/\s+/g, " "));
  }
  return [...out].map(([where, text]) => ({ where, text }));
}
// Every prose line that carries one of a changed token's old literals and every word of its name (in any order, each
// in its inflections). One word is not enough: "radius" or "glass" beside "16px" reads every --radius-* table row
// (pass-8 H8.md §1 measures it); the name's words together are the rung, and a sentence about the rung names them.
// H9-3: a hit whose line cites an arm (file name or selector) that still declares the old literal is true, and is
// returned apart as `armTrue`.
export function valueHits(ch, files, arms = []) {
  const lits = ch.literals.map((l) => new RegExp(`(?<![\\w.])${esc(l)}(?![\\w%]|\\.\\d)`)), ws = words(ch.token).map((w) => new RegExp(`(?<![A-Za-z0-9])${wordRe(w)}(?![a-z0-9])`, "i"));
  const kept = arms.filter((x) => x.token === ch.token && x.value === ch.from);
  const out = [];
  for (const [rel, text] of files) proseLines(rel, text).forEach((p, i) => {
    if (!p) return;
    const lit = lits.find((r) => r.test(p));
    if (!lit || !ws.every((r) => r.test(p))) return;
    const cited = kept.find((x) => citesArm(p, x));
    out.push({ where: `${rel}:${i + 1}`, text: `${p.match(lit)[0]} · ${ws.map((r) => p.match(r)[0]).join(" ")}`, armTrue: cited ? `${cited.file}:${cited.line} (${cited.selector}) declares ${ch.from}` : null });
  });
  return out;
}

// H9-3: every declaration of each changed token in the patched tree, with its file, line and enclosing selector.
// Only stylesheet text is read (.css, and a .vue file's <style> blocks); a comment is not a declaration.
const STYLE = /\.(css|vue)$/;
export function declaredArms(tokens, files) {
  const want = new Set(tokens), out = [];
  for (const [rel, text] of files) {
    if (!STYLE.test(rel)) continue;
    const src = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")), stack = [];
    let sel = "", line = 1;
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (c === "\n") { line++; continue; }
      if (c === "{") { stack.push(sel.trim().replace(/\s+/g, " ")); sel = ""; continue; }
      if (c === "}") { stack.pop(); sel = ""; continue; }
      if (c === ";") { sel = ""; continue; }
      if (c === "-" && src[i + 1] === "-" && /[\s;{]/.test(src[i - 1] ?? "\n")) {
        const m = src.slice(i).match(/^(--[a-z][a-z0-9-]*[a-z0-9])\s*:\s*([^;{}]+?)\s*(?:!important\s*)?;/);
        if (m && want.has(m[1])) out.push({ token: m[1], value: m[2], file: rel, line, selector: stack.at(-1) || "(top)" });
        if (m) { line += m[0].split("\n").length - 1; i += m[0].length - 1; sel = ""; continue; }
      }
      sel += c;
    }
  }
  return out;
}
// A line cites an arm by the arm file's name (`dark-arm.css`, `tokens/dark-arm.css`) or by its selector when the
// selector is not `:root` (`.dark`).
export function citesArm(line, arm) {
  if (line.includes(path.basename(arm.file))) return true;
  return arm.selector !== ":root" && arm.selector !== "(top)" && arm.selector.split(",").some((s) => s.trim().length > 2 && line.includes(s.trim()));
}

// H9-2: the families of a patch's changed values. Three or more changed tokens of one file whose names differ in one
// segment form a family; its tuple is their old values in declaration order. Only a scalar ladder is read.
export function families(changed) {
  const groups = new Map();
  for (const c of changed) {
    const segs = c.token.slice(2).split("-");
    for (let k = 0; k < segs.length; k++) {
      const key = `${c.file}|${segs.slice(0, k).join("-")}|${segs.slice(k + 1).join("-")}|${k}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ ...c, seg: segs[k] });
    }
  }
  const out = [];
  for (const [key, rungs] of groups) {
    if (rungs.length < 3) continue;
    const [file, pre, post] = key.split("|");
    const name = `--${pre ? pre + "-" : ""}*${post ? "-" + post : ""}`;
    const nums = rungs.map((r) => r.from.match(/^(-?[\d.]+)([a-z%]*)$/)).filter(Boolean);
    if (nums.length !== rungs.length) continue;
    out.push({ name, file, rungs: rungs.map((r, i) => ({ seg: r.seg, token: r.token, from: r.from, num: nums[i][1], unit: nums[i][2] })), tuple: nums.map((n) => n[1]), unit: nums[0][2], to: rungs.map((r) => r.to.match(/^-?[\d.]+/)?.[0] ?? r.to) });
  }
  return out;
}
// The old tuple on a prose line, in order, each number with or without the unit, separated by `/` or `·`.
export function tupleHits(fam, files) {
  const u = fam.unit ? `(?:${esc(fam.unit)})?` : "";
  const re = new RegExp(`(?<![\\w.])${fam.tuple.map((n) => esc(n) + u).join("\\s*[/·]\\s*")}(?![\\w%]|\\.\\d)`);
  const out = [];
  for (const [rel, text] of files) proseLines(rel, text).forEach((p, i) => { const m = p && p.match(re); if (m) out.push({ where: `${rel}:${i + 1}`, text: m[0] }); });
  return out;
}
// The rung reading (printed for R-21 (b), not gated): a rung's word, then its old number, no other number between.
export function rungHits(fam, files) {
  const out = [];
  for (const [rel, text] of files) proseLines(rel, text).forEach((p, i) => {
    if (!p) return;
    for (const r of fam.rungs) {
      const re = new RegExp(`(?<![A-Za-z0-9])${wordRe(r.seg)}(?![a-z0-9])[^\\d;:.]{0,24}?(?<![\\w.])(${esc(r.num)})(?:${esc(r.unit || "")})?(?![\\w%]|\\.\\d)`, "i");
      const m = p.match(re);
      if (m) out.push({ where: `${rel}:${i + 1}`, text: m[0].replace(/\s+/g, " "), rung: r.token });
    }
  });
  return out;
}

// Site exemptions (`at`): "file:line" or "file:a-b".
const parseAt = (at) => { const m = at.match(/^(.+):(\d+)(?:-(\d+))?$/); if (!m) throw new Error(`bad site "${at}"`); return { file: m[1], a: +m[2], b: +(m[3] || m[2]) }; };
export function exempt(sites, name, where) {
  const i = where.lastIndexOf(":"), file = where.slice(0, i), line = +where.slice(i + 1);
  return sites.find((s) => s.name === name && s.file === file && line >= s.a && line <= s.b) || null;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ root: { type: "string" }, declare: { type: "string" }, patch: { type: "string" } });
  console.log("DEL · no file in scope (src/, demo/, tests/, every path the patch touches) describes a mechanism the patch deletes, in any word form, or a value or ladder it changes (static; H6-1, H7-2, H8-1, H9-1..H9-3)");
  if (!a.root || !a.declare) { console.log("usage: node deleted-mechanisms.mjs --root <tree> --declare <names.json> [--patch <file.patch>]\nFAIL (no gated rows measured: no tree or no declaration)"); process.exit(2); }
  const root = path.resolve(a.root), decl = JSON.parse(fs.readFileSync(path.resolve(a.declare), "utf8"));
  const patchText = a.patch ? fs.readFileSync(path.resolve(a.patch), "utf8") : "";
  const touched = patchPaths(patchText), files = textFiles(root, touched), reported = reportedFiles(root, files);
  const entries = decl.exact || [];
  const exact = new Map(entries.filter((e) => !e.at).map((e) => [e.name, e.why]));
  const sites = entries.filter((e) => e.at).map((e) => ({ ...e, ...parseAt(e.at), used: 0 }));
  for (const n of exact.keys()) if (/\s/.test(n.trim())) { console.log(`exact-only entry "${n}" is a phrase: a phrase is its own word form\nFAIL (declaration refused)`); process.exit(2); }
  const outside = touched.filter((p) => !ROOTS.some((r) => p.startsWith(r + "/")));
  const inScope = new Set(files.map(([rel]) => rel));
  console.log(`tree: ${root} · ${files.length} text files in scope (src/, demo/, tests/${outside.length ? `, plus ${outside.filter((p) => inScope.has(p)).length} of ${outside.length} touched paths outside them that exist` : ""}) · reported: ${reported.length} files · declaration: ${decl.patch || path.basename(a.declare)} · ${decl.names.length} names, ${exact.size} exact only, ${sites.length} sites read in context`);
  if (a.patch) console.log(`patch: ${path.basename(a.patch)} · ${touched.length} paths · ${touched.filter((p) => inScope.has(p)).length} exist in the tree and are read`);
  let fails = 0, hitsAll = 0;
  const where = new Set(), rep = [];
  const row = (label, h, why) => {
    const kept = [];
    for (const x of h) { const s = exempt(sites, label.name, x.where); if (s) { s.used++; console.log(`    · exempt ${x.where} "${x.text}" (${s.why})`); } else kept.push(x); }
    hitsAll += kept.length; for (const x of kept) where.add(x.where.split(":")[0]);
    if (!kept.length) { console.log(`  ✓ ${label.text}: 0${why}`); return; }
    fails++;
    console.log(`  ✗ ${label.text}${why}: ${kept.length} · ${kept.map((x) => `${x.where} "${x.text}"`).join(" ")}`);
  };
  const report = (label, h) => { for (const x of h) { const s = exempt(sites, label.name, x.where); if (s) s.used++; else rep.push(`${label.text} · ${x.where} "${x.text}"`); } };
  for (const name of decl.names) {
    const ex = exact.has(name), why = ex ? ` (exact only: ${exact.get(name)})` : "";
    row({ name, text: `"${name}"` }, hits(name, files, ex), why);
    report({ name, text: `"${name}"` }, hits(name, reported, ex));
  }
  const changed = a.patch ? changedValues(patchText) : [], fams = families(changed);
  const arms = declaredArms(changed.map((c) => c.token), files);
  if (a.patch) console.log(`changed values: ${changed.length} declarations in src/ · ${[...new Set(changed.map((c) => c.token))].length} tokens · ${fams.length} families · ${arms.filter((x) => changed.some((c) => c.token === x.token && c.from === x.value)).length} arms still at an old value`);
  let armTrue = 0;
  for (const ch of changed) {
    const label = { name: ch.token, text: `${ch.token}: ${ch.from} → ${ch.to} (literal ${ch.literals.join(", ")}; ${ch.file})` };
    const h = valueHits(ch, files, arms);
    for (const x of h.filter((x) => x.armTrue)) { armTrue++; console.log(`    · arm-true ${x.where} "${x.text}" (cites ${x.armTrue})`); }
    row(label, h.filter((x) => !x.armTrue), "");
    report(label, valueHits(ch, reported, arms).filter((x) => !x.armTrue));
  }
  const rung = [];
  for (const fam of fams) {
    const label = { name: fam.name, text: `${fam.name} tuple ${fam.tuple.join("/")}${fam.unit} → ${fam.to.join("/")}${fam.unit} (${fam.file})` };
    row(label, tupleHits(fam, files), "");
    report(label, tupleHits(fam, reported));
    for (const x of rungHits(fam, files)) rung.push(`${x.rung}: ${x.where} "${x.text}"`);
  }
  if (fams.length) { console.log(`RUNG READING (not gated; R-21 (b) reads each line's tense): ${rung.length}`); for (const r of rung) console.log(`  [R-21 b] ${r}`); }
  const stale = sites.filter((s) => !s.used);
  for (const s of stale) { fails++; console.log(`  ✗ exempt site ${s.at} for "${s.name}" exempts no hit: stale (${s.why})`); }
  console.log(`REPORTED (not gated; repo-root *.md and docs/canon/): ${rep.length}`);
  for (const r of rep) console.log(`  [reported] ${r}`);
  const rows = decl.names.length + changed.length + fams.length + sites.length;
  console.log(`DELETED-MECHANISMS names=${decl.names.length} hits=${hitsAll} files=${where.size} changed=${changed.length} families=${fams.length} sites=${sites.length} arm-true=${armTrue} rung=${rung.length} reported=${rep.length} · ${[...where].sort().join(" ")}`);
  console.log(fails ? `FAIL (${fails} of ${rows} gated rows)` : `PASS (${rows} gated rows)`);
  process.exit(fails ? 1 : 0);
}
