#!/usr/bin/env node
// DEL · H6-1 (pass 6), H7-2 (pass 7): a mechanism a patch deletes is not described as live anywhere in the tree. The
// prose sweep read only the sentences a ruling named, so the earned darken's description outlived it in five touched
// files and one untouched one (pass-5 Crit A-1, REGISTRY P5-2.2 R-10). A deletion falsifies untouched prose too, so this
// reads EVERY file under src/ and demo/ (text files; node_modules and binaries skipped), not only the files the patch
// touches. Each patch declares the names it deletes in a JSON file ({ patch, names: [] }); declare-removed.mjs builds
// that list from a patch's removed lines (REGISTRY P6-2.2 R-15 (iii)).
// H7-2 (Crit A-1 of pass 6): one spelling per name let "backdrop mode" outlive `backdropMode` and "adaptive tinting"
// outlive "adaptive tint". Every name now also matches in its WORD FORM (wordForm below):
//   an identifier         exact, as written (case-sensitive), and, when it splits into two or more words
//                         (`backdropMode`, `--glass-backdrop-luma`, `data-backdrop-mode`), as those words
//   a name with a space   a phrase: its words (split on spaces and hyphens)
// Words match case-insensitively, from a word start, joined by any run (or none) of whitespace, comment leaders
// (* // #), hyphens and underscores, so a phrase broken over two comment lines, a kebab or a camel spelling is found.
// Each word takes its inflections: -s -es -d -ed -ing -ings -er -ers, a final e dropped before -ing/-ed/-er
// ("sample" → "sampling"), a final consonant doubled ("map" → "mapping"). A single-word identifier stays exact only (a
// lone common word would read every sentence that uses it). One gated row per name; each hit prints file:line once.
// A declaration may hold `exact: [{ name, why }]`: an identifier whose word form is ordinary live prose ("composited
// over" for `compositeOver`) is read exact only, and the reason is printed on its row. Only an identifier can be listed;
// a phrase is its own word form. The seat that declares owns each entry, and the critic reads them.
//   node deleted-mechanisms.mjs --root <tree> --declare <names.json>
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
export function textFiles(root) {
  return [...walk(path.join(root, "src")), ...walk(path.join(root, "demo"))].map((f) => [f, fs.readFileSync(f)]).filter(([, b]) => !b.subarray(0, 8192).includes(0)).map(([f, b]) => [path.relative(root, f), b.toString("utf8")]);
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ root: { type: "string" }, declare: { type: "string" } });
  console.log("DEL · no file under src/ or demo/ describes a mechanism the patch deletes, in any word form (static; H6-1, H7-2)");
  if (!a.root || !a.declare) { console.log("usage: node deleted-mechanisms.mjs --root <tree> --declare <names.json>\nFAIL (no gated rows measured: no tree or no declaration)"); process.exit(2); }
  const root = path.resolve(a.root), decl = JSON.parse(fs.readFileSync(path.resolve(a.declare), "utf8"));
  const files = textFiles(root), exact = new Map((decl.exact || []).map((e) => [e.name, e.why]));
  for (const n of exact.keys()) if (/\s/.test(n.trim())) { console.log(`exact-only entry "${n}" is a phrase: a phrase is its own word form\nFAIL (declaration refused)`); process.exit(2); }
  console.log(`tree: ${root} · ${files.length} text files under src/ and demo/ · declaration: ${decl.patch || path.basename(a.declare)} · ${decl.names.length} names, ${exact.size} exact only`);
  let fails = 0, hitsAll = 0;
  const where = new Set();
  for (const name of decl.names) {
    const h = hits(name, files, exact.has(name)), why = exact.has(name) ? ` (exact only: ${exact.get(name)})` : "";
    hitsAll += h.length; for (const x of h) where.add(x.where.split(":")[0]);
    if (!h.length) { console.log(`  ✓ "${name}": 0${why}`); continue; }
    fails++;
    console.log(`  ✗ "${name}"${why}: ${h.length} · ${h.map((x) => `${x.where} "${x.text}"`).join(" ")}`);
  }
  console.log(`DELETED-MECHANISMS names=${decl.names.length} hits=${hitsAll} files=${where.size} · ${[...where].sort().join(" ")}`);
  console.log(fails ? `FAIL (${fails} of ${decl.names.length} gated rows)` : `PASS (${decl.names.length} gated rows)`);
  process.exit(fails ? 1 : 0);
}
