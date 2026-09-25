#!/usr/bin/env node
// critique-B seat 2 · plant runner. Frozen with the battery (see ../../BATTERY-HASH.txt).
// usage: node run-plants.mjs --tree <replayed tree> --adapter <adapter.mjs> --work <scratch dir> [--only id,id]
// The adapter exports: gate(tree) -> {exit, lines:[{clause,text}]}; move(tree, from, to) -> {exit, out}.
// Each plant runs on a fresh copy of the tree (rsync, node_modules symlinked). Verdict = multiset diff of
// (clause, text) lines, planted minus baseline.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, appendFileSync, rmSync, symlinkSync } from "node:fs";
import { join, dirname, relative, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? a.concat([[v.slice(2), all[i + 1]]]) : a), []));
const here = dirname(new URL(import.meta.url).pathname);
const spec = JSON.parse(readFileSync(join(here, "plants.json"), "utf8"));
const adapter = await import(pathToFileURL(args.adapter).href);
const only = args.only ? new Set(args.only.split(",")) : null;
const work = args.work;
mkdirSync(work, { recursive: true });

function walk(root, rel = "", out = []) {
  for (const e of readdirSync(join(root, rel), { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".git" || e.name === "dist" || e.name === "dist-demo") continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walk(root, r, out); else out.push(r);
  }
  return out;
}
let fileIndex = null;
function files(tree) { return (fileIndex ??= walk(tree)); }

function expand(tree, s) {
  let prev;
  do {
    prev = s;
    s = s.replace(/\{\{dir:([^{}|]+)\}\}/g, (_, b) => {
      const hits = files(tree).filter((f) => f.startsWith("src/") && basename(f) === b);
      if (hits.length !== 1) throw new Error(`{{dir:${b}}} matched ${hits.length}: ${hits.join(", ")}`);
      return dirname(hits[0]);
    });
    s = s.replace(/\{\{firstcss:([^{}|]+)\}\}/g, (_, p) => {
      const hit = files(tree).filter((f) => f.startsWith(p + "/") && f.endsWith(".css") && basename(f) !== "index.css").sort()[0];
      if (!hit) throw new Error(`no css under ${p}`);
      return hit;
    });
    s = s.replace(/\{\{firstindexcss:([^{}|]+)\}\}/g, (_, p) => {
      const hit = files(tree).filter((f) => f.startsWith(p + "/") && basename(f) === "index.css").sort()[0];
      if (!hit) throw new Error(`no index.css under ${p}`);
      return hit;
    });
    s = s.replace(/\{\{rel:([^{}|]+)\|([^{}|]+)\}\}/g, (_, from, to) => {
      let r = relative(dirname(from), to);
      if (!r.startsWith(".")) r = "./" + r;
      return r;
    });
  } while (s !== prev);
  return s;
}

function freshCopy(tree, name) {
  const dst = join(work, name);
  rmSync(dst, { recursive: true, force: true });
  execFileSync("rsync", ["-a", "--exclude", "node_modules", "--exclude", ".git", `${tree}/`, `${dst}/`]);
  for (const nm of ["node_modules", "tests-visual/node_modules"]) {
    const src = join(tree, nm);
    if (existsSync(src)) { rmSync(join(dst, nm), { recursive: true, force: true }); symlinkSync(execFileSync("realpath", [src]).toString().trim(), join(dst, nm)); }
  }
  // the gate may call git (ls-files); give the copy the tree's git pointer when it is a worktree file
  if (existsSync(join(tree, ".git")) && statSync(join(tree, ".git")).isFile()) writeFileSync(join(dst, ".git"), readFileSync(join(tree, ".git")));
  return dst;
}

function apply(dst, op) {
  const p = op.path ? expand(dst, op.path) : null;
  switch (op.op) {
    case "write": case "mkdirWrite":
      mkdirSync(dirname(join(dst, p)), { recursive: true }); writeFileSync(join(dst, p), expand(dst, op.content)); return p;
    case "append": appendFileSync(join(dst, p), expand(dst, op.text)); return p;
    case "insertAfterRegex": {
      const t = readFileSync(join(dst, p), "utf8"); const m = new RegExp(op.regex).exec(t);
      if (!m) throw new Error(`regex ${op.regex} not in ${p}`);
      writeFileSync(join(dst, p), t.slice(0, m.index + m[0].length) + expand(dst, op.text) + t.slice(m.index + m[0].length)); return p;
    }
    case "writeLines": {
      mkdirSync(dirname(join(dst, p)), { recursive: true });
      writeFileSync(join(dst, p), Array.from({ length: op.lines }, (_, i) => op.line.replaceAll("{{i}}", String(i))).join("\n") + "\n"); return p;
    }
    case "writeMany": {
      const d = expand(dst, op.dir); mkdirSync(join(dst, d), { recursive: true });
      for (let i = 0; i < op.count; i++) writeFileSync(join(dst, d, op.name.replaceAll("{{i}}", String(i))), op.content.replaceAll("{{i}}", String(i)));
      return d;
    }
    case "yamlStep": {
      const lines = readFileSync(join(dst, p), "utf8").split("\n");
      const k = lines.findIndex((l) => /^\s*steps:\s*$/.test(l)); if (k < 0) throw new Error("no steps:");
      let j = k + 1; while (!lines[j].trim()) j++;
      const ind = lines[j].match(/^\s*/)[0];
      lines.splice(j, 0, ind + op.text); writeFileSync(join(dst, p), lines.join("\n")); return p;
    }
    default: throw new Error(`op ${op.op}`);
  }
}

const key = (l) => `${l.clause}\u0000${l.text}`;
function diff(base, planted) {
  const m = new Map(); for (const l of base) m.set(key(l), (m.get(key(l)) ?? 0) + 1);
  const added = [];
  for (const l of planted) { const k = key(l); const c = m.get(k) ?? 0; if (c > 0) m.set(k, c - 1); else added.push(l); }
  return added;
}

const results = [];
fileIndex = null;
const baseDst = freshCopy(args.tree, "base");
const base = await adapter.gate(baseDst);
results.push({ id: "BASE", exit: base.exit, lines: base.lines.length, byClause: tally(base.lines) });
function tally(ls) { const t = {}; for (const l of ls) t[l.clause] = (t[l.clause] ?? 0) + 1; return t; }

for (const pl of spec.plants) {
  if (only && !only.has(pl.id)) continue;
  const dst = freshCopy(args.tree, pl.id);
  fileIndex = null;
  let touched = [];
  try { for (const op of pl.ops) touched.push(apply(dst, op)); }
  catch (e) { results.push({ id: pl.id, items: pl.items, verdict: "PLANT-ERROR", error: String(e.message) }); continue; }
  const g = await adapter.gate(dst);
  const added = diff(base.lines, g.lines);
  const clauses = [...new Set(added.map((l) => l.clause))];
  let verdict;
  if (pl.legal) verdict = added.length ? "FALSE-POSITIVE" : "CLEAN";
  else if (pl.notIn) verdict = clauses.some((c) => pl.notIn.includes(c)) ? "CONTROL-FIRED" : "CONTROL-QUIET";
  else if (!added.length) verdict = "MISSED";
  else verdict = clauses.some((c) => pl.intended.includes(c)) ? "INTENDED" : "OTHER";
  results.push({ id: pl.id, items: pl.items, intended: pl.intended ?? null, verdict, exit: g.exit, clauses, touched, added: added.slice(0, 12) });
  rmSync(dst, { recursive: true, force: true });
}

for (const mp of spec.moveProbes ?? []) {
  if (only && !only.has(mp.id)) continue;
  const dst = freshCopy(args.tree, mp.id); fileIndex = null;
  let from, to;
  try { from = expand(dst, mp.move.from); to = expand(dst, mp.move.to); }
  catch (e) { results.push({ id: mp.id, items: mp.items, verdict: "PLANT-ERROR", error: String(e.message) }); continue; }
  const r = await adapter.move(dst, from, to);
  const refused = r.exit !== 0 && /FD-2|CO-CYCLIC|moduleScc|refus/i.test(r.out);
  results.push({ id: mp.id, items: mp.items, verdict: refused ? "REFUSED" : (r.exit === 0 ? "APPLIED" : "FAILED-OTHER"), exit: r.exit, from, to, out: r.out.slice(-1500) });
  rmSync(dst, { recursive: true, force: true });
}

rmSync(baseDst, { recursive: true, force: true });
const out = args.out ?? join(work, "plant-results.json");
writeFileSync(out, JSON.stringify(results, null, 2));
for (const r of results) console.log([r.id, r.verdict ?? "", r.exit ?? "", (r.clauses ?? []).join("+"), r.error ?? ""].join("\t"));
