#!/usr/bin/env node
// prose-sweep.mjs · H9-6 (pass 9, REGISTRY P8-2.2 R-21 (b)): the prose rows' frozen sweep list, printed. Over every
// prose line (deleted-mechanisms.mjs proseLines: comments, test titles, markdown) of every file the patch touches that
// exists in the tree, print each line that carries (1) a word of sweep-frozen.json, in DEL's word form (a word start,
// its inflections; "retint" is not "tint"), (2) a name of the declaration, exact or in its word form, or (3) a changed
// ladder's old tuple or a rung's old number after its word (the rung reading). Each printed line carries its context
// (the lines around it) so a reader rules it from the listing.
// The row reads this list as read when every printed line is ruled true or has been rewritten. --rulings names the
// lines read: [{ at: "file:line", says: "<text the line still carries>", verdict, why }]. With --rulings the run FAILs on
// any printed line no ruling covers (unread), and on any ruling whose line no longer prints or no longer carries its
// `says` text (stale). Without --rulings it is a list: exit 0, verdict LIST.
// H10-2 (pass 10, REGISTRY P9-5, R-26): each ruling carries `verdict`, "true" or "reported".
//   "true"       every clause of the line, and of the sentence it belongs to, is true; `why` names what makes each so
//   "reported"   a clause is false, was false before the patch, and the patch did not write it. The line prints in its
//                own tally (REPORTED, for the landing docs pass), gates nothing, and goes stale like any ruling
// A ruling with no verdict, another verdict, no `at`, `says` or `why`, or verdict "true" with a `why` that carries the
// word REPORTED (the pass-9 workaround) is refused: exit 2, nothing read. The record never calls a false line true.
// H10-1's refusal holds here too: 0 touched files read prints `nothing read` and exits 2.
// H11-1 (pass 11, REGISTRY P10-5): the exit code is set through process.exitCode, never process.exit, so a pipe reader
// gets the tally and the verdict line (pass 10 lost them in 2 of 12 piped runs).
//   node prose-sweep.mjs --root <tree> --patch <file.patch> [--declare <decl.json>] [--list sweep-frozen.json] [--rulings <json>] [--context 1]
import fs from "node:fs";
import path from "node:path";
import { cli, HERE } from "./lib.mjs";
import { textFiles, patchPaths, proseLines, wordForm, exactForm, words, changedValues, families, tupleHits, rungHits } from "./deleted-mechanisms.mjs";

// H10-2: the rulings file's shape. Returns the refusals (empty when every entry is well formed).
export const VERDICTS = Object.freeze(["true", "reported"]);
export function refusals(rulings) {
  if (!Array.isArray(rulings)) return ["the rulings file is not a list"];
  return rulings.flatMap((x, k) => {
    const at = `ruling ${k}${x && x.at ? ` (${x.at})` : ""}`, out = [];
    for (const f of ["at", "says", "why"]) if (!x || typeof x[f] !== "string" || !x[f].trim()) out.push(`${at}: no \`${f}\``);
    if (!x || !VERDICTS.includes(x.verdict)) out.push(`${at}: verdict ${JSON.stringify(x && x.verdict)} is not one of ${VERDICTS.map((v) => `"${v}"`).join(", ")}`);
    else if (x.verdict === "true" && /\bREPORTED\b/.test(x.why || "")) out.push(`${at}: verdict "true" with a \`why\` that reports a clause (REPORTED): file it as "reported"`);
    return out;
  });
}

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

// H11-1 (pass 11): the CLI returns its exit code into process.exitCode and never calls process.exit, so a pipe
// reader gets the whole report (lib.mjs also writes it synchronously).
function main() {
  const a = cli({ root: { type: "string" }, patch: { type: "string" }, declare: { type: "string" }, list: { type: "string" }, rulings: { type: "string" }, context: { type: "string" } });
  console.log("SWEEP · R-21 (b): every prose line of every touched file that carries a frozen word, a declared name, or a changed ladder's old tuple or rung number, printed with its context (static; H9-6, H10-1, H10-2)");
  if (!a.root || !a.patch) { console.log("usage: node prose-sweep.mjs --root <tree> --patch <file.patch> [--declare <decl.json>] [--list <json>] [--rulings <json>] [--context N]\nFAIL (nothing read: no tree or no patch)"); return 2; }
  const root = path.resolve(a.root), list = JSON.parse(fs.readFileSync(path.resolve(a.list || path.join(HERE, "sweep-frozen.json")), "utf8"));
  const decl = a.declare ? JSON.parse(fs.readFileSync(path.resolve(a.declare), "utf8")) : null, ctx = +(a.context ?? 1);
  const r = sweep({ root, patchText: fs.readFileSync(path.resolve(a.patch), "utf8"), decl, list });
  console.log(`tree: ${root} · patch ${path.basename(a.patch)}: ${r.touched.length} touched files exist · ${r.files} read as text · list: ${list.words.length} words + ${decl ? decl.names.length : 0} declared names + the changed ladders`);
  if (!r.files) { console.log(`0 touched files read under ${root}: nothing read\nFAIL (nothing read: ${fs.existsSync(root) ? "no touched file exists in the tree" : "the tree does not exist"})`); return 2; }
  const rulings = a.rulings ? JSON.parse(fs.readFileSync(path.resolve(a.rulings), "utf8")) : null;
  const bad = rulings ? refusals(rulings) : [];
  if (bad.length) { for (const b of bad) console.log(`✗ refused ${b}`); console.log(`FAIL (rulings refused: ${bad.length} malformed of ${Array.isArray(rulings) ? rulings.length : 0}; nothing read)`); return 2; }
  let unread = 0;
  const used = new Set(), rep = [];
  for (const l of r.lines) {
    const i = l.where.lastIndexOf(":"), rel = l.where.slice(0, i), n = +l.where.slice(i + 1), src = r.byFile[rel].split("\n");
    const ruled = rulings && rulings.findIndex((x) => x.at === l.where && src[n - 1].includes(x.says));
    if (rulings && ruled >= 0) { used.add(ruled); if (rulings[ruled].verdict === "reported") rep.push(rulings[ruled]); }
    const mark = !rulings ? "·" : ruled < 0 ? "✗ unread" : rulings[ruled].verdict === "reported" ? "◦ reported" : "✓ true";
    if (rulings && ruled < 0) unread++;
    console.log(`${mark} ${l.where} [${[...l.whys].join("; ")}]${rulings && ruled >= 0 ? ` (${rulings[ruled].why})` : ""}`);
    for (let k = Math.max(1, n - ctx); k <= Math.min(src.length, n + ctx); k++) console.log(`    ${k === n ? ">" : " "} ${String(k).padStart(5)} | ${src[k - 1].slice(0, 200)}`);
  }
  const stale = rulings ? rulings.filter((_, k) => !used.has(k)) : [];
  for (const s of stale) console.log(`✗ stale ${s.verdict} ruling ${s.at} "${s.says}": the line no longer prints or no longer says it (${s.why})`);
  if (rulings) { console.log(`REPORTED (not gated; a false clause the patch did not write, for the landing docs pass): ${rep.length}`); for (const x of rep) console.log(`  [reported] ${x.at} (${x.why})`); }
  const files = new Set(r.lines.map((l) => l.where.slice(0, l.where.lastIndexOf(":"))));
  console.log(`SWEEP lines=${r.lines.length} files=${files.size}${rulings ? ` ruled=${used.size} true=${used.size - rep.length} reported=${rep.length} unread=${unread} stale=${stale.length}` : ""}`);
  if (!rulings) { console.log(`LIST (${r.lines.length} lines to read; no rulings given)`); return 0; }
  console.log(unread || stale.length ? `FAIL (${unread} unread, ${stale.length} stale of ${r.lines.length} lines)` : `PASS (${r.lines.length} lines: ${used.size - rep.length} ruled true, ${rep.length} reported)`);
  return unread || stale.length ? 1 : 0;
}
if (import.meta.url === `file://${process.argv[1]}`) process.exitCode = main();
