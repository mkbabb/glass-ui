#!/usr/bin/env node
// prose-sweep.mjs · H9-6 (pass 9, REGISTRY P8-2.2 R-21 (b)): the prose rows' frozen sweep list, printed. Over every
// prose line (deleted-mechanisms.mjs proseLines: comments, test titles, markdown) of every file the patch touches that
// exists in the tree, print each line that carries (1) a word of sweep-frozen.json, in DEL's word form (a word start,
// its inflections; "retint" is not "tint"), (2) a name of the declaration, exact or in its word form, or (3) a changed
// ladder's old tuple or a rung's old number after its word (the rung reading). Each printed line carries its context
// (the lines around it) so a reader rules it from the listing.
// The row reads this list as read when every printed line is ruled true or has been rewritten. --rulings names the
// lines ruled true: [{ at: "file:line", says: "<text the line still carries>", why }]. With --rulings the run FAILs on
// any printed line no ruling covers (unread), and on any ruling whose line no longer prints or no longer carries its
// `says` text (stale). Without --rulings it is a list: exit 0, verdict LIST.
//   node prose-sweep.mjs --root <tree> --patch <file.patch> [--declare <decl.json>] [--list sweep-frozen.json] [--rulings <json>] [--context 1]
import fs from "node:fs";
import path from "node:path";
import { cli, HERE } from "./lib.mjs";
import { textFiles, patchPaths, proseLines, wordForm, exactForm, words, changedValues, families, tupleHits, rungHits } from "./deleted-mechanisms.mjs";

// A frozen word's pattern: one word takes DEL's inflections from a word start; a phrase is DEL's word form.
export function frozenPattern(w) {
  if (/\s/.test(w.trim())) return wordForm(w);
  const [x] = words(w), esc = x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const alts = [esc + "(?:s|es|d|ed|ing|ings|er|ers)?"];
  if (x.endsWith("e")) alts.push(esc.slice(0, -1) + "(?:ing|ings|ed|er|ers)");
  return new RegExp(`(?<![A-Za-z0-9])(?:${alts.join("|")})(?![a-z0-9])`, "gi");
}

export function sweep({ root, patchText, decl, list }) {
  const touched = patchPaths(patchText).filter((p) => { const f = path.join(root, p); return fs.existsSync(f) && fs.statSync(f).isFile(); });
  const files = textFiles(root, touched, []);
  const pats = [...list.words.map((w) => ({ why: `word "${w}"`, re: frozenPattern(w) })),
    ...(decl?.names || []).flatMap((n) => [exactForm(n), (decl.exact || []).some((e) => e.name === n && !e.at) ? null : wordForm(n)].filter(Boolean).map((re) => ({ why: `name "${n}"`, re })))];
  const out = new Map();
  const put = (where, why, text) => { if (!out.has(where)) out.set(where, { where, whys: new Set(), text }); out.get(where).whys.add(why); };
  for (const [rel, text] of files) proseLines(rel, text).forEach((p, i) => {
    if (!p) return;
    for (const { why, re } of pats) { re.lastIndex = 0; if (re.test(p)) put(`${rel}:${i + 1}`, why, p.trim()); }
  });
  for (const fam of families(changedValues(patchText))) {
    for (const x of tupleHits(fam, files)) put(x.where, `tuple ${fam.name} ${fam.tuple.join("/")}`, x.text);
    for (const x of rungHits(fam, files)) put(x.where, `rung ${x.rung} "${x.text}"`, x.text);
  }
  const byFile = Object.fromEntries(files);
  return { touched, files: files.length, lines: [...out.values()].sort((x, y) => (x.where < y.where ? -1 : x.where > y.where ? 1 : 0)), byFile };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ root: { type: "string" }, patch: { type: "string" }, declare: { type: "string" }, list: { type: "string" }, rulings: { type: "string" }, context: { type: "string" } });
  console.log("SWEEP · R-21 (b): every prose line of every touched file that carries a frozen word, a declared name, or a changed ladder's old tuple or rung number, printed with its context (static; H9-6)");
  if (!a.root || !a.patch) { console.log("usage: node prose-sweep.mjs --root <tree> --patch <file.patch> [--declare <decl.json>] [--list <json>] [--rulings <json>] [--context N]\nFAIL (nothing read: no tree or no patch)"); process.exit(2); }
  const root = path.resolve(a.root), list = JSON.parse(fs.readFileSync(path.resolve(a.list || path.join(HERE, "sweep-frozen.json")), "utf8"));
  const decl = a.declare ? JSON.parse(fs.readFileSync(path.resolve(a.declare), "utf8")) : null, ctx = +(a.context ?? 1);
  const r = sweep({ root, patchText: fs.readFileSync(path.resolve(a.patch), "utf8"), decl, list });
  console.log(`tree: ${root} · patch ${path.basename(a.patch)}: ${r.touched.length} touched files exist · ${r.files} read as text · list: ${list.words.length} words + ${decl ? decl.names.length : 0} declared names + the changed ladders`);
  const rulings = a.rulings ? JSON.parse(fs.readFileSync(path.resolve(a.rulings), "utf8")) : null;
  let unread = 0;
  const used = new Set();
  for (const l of r.lines) {
    const i = l.where.lastIndexOf(":"), rel = l.where.slice(0, i), n = +l.where.slice(i + 1), src = r.byFile[rel].split("\n");
    const ruled = rulings && rulings.findIndex((x) => x.at === l.where && src[n - 1].includes(x.says));
    if (rulings && ruled >= 0) used.add(ruled);
    const mark = !rulings ? "·" : ruled >= 0 ? "✓ true" : "✗ unread";
    if (rulings && ruled < 0) unread++;
    console.log(`${mark} ${l.where} [${[...l.whys].join("; ")}]${rulings && ruled >= 0 ? ` (${rulings[ruled].why})` : ""}`);
    for (let k = Math.max(1, n - ctx); k <= Math.min(src.length, n + ctx); k++) console.log(`    ${k === n ? ">" : " "} ${String(k).padStart(5)} | ${src[k - 1].slice(0, 200)}`);
  }
  const stale = rulings ? rulings.filter((_, k) => !used.has(k)) : [];
  for (const s of stale) console.log(`✗ stale ruling ${s.at} "${s.says}": the line no longer prints or no longer says it (${s.why})`);
  const files = new Set(r.lines.map((l) => l.where.slice(0, l.where.lastIndexOf(":"))));
  console.log(`SWEEP lines=${r.lines.length} files=${files.size}${rulings ? ` ruled=${used.size} unread=${unread} stale=${stale.length}` : ""}`);
  if (!rulings) { console.log(`LIST (${r.lines.length} lines to read; no rulings given)`); process.exit(0); }
  console.log(unread || stale.length ? `FAIL (${unread} unread, ${stale.length} stale of ${r.lines.length} lines)` : `PASS (${r.lines.length} lines, each ruled true)`);
  process.exit(unread || stale.length ? 1 : 0);
}
