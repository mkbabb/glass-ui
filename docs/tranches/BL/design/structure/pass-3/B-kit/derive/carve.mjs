#!/usr/bin/env node
// carve.mjs — DERIVE step B-S3 (LAW §3-§4): the module carve.
//   1. The dominance proposer (lib/dominance.mjs) proposes each module under a single-owner
//      root; authored/names.json names, collapses or declines it (a proposal with no decision
//      stops the run: a person names every module). A module needs 2 or more files.
//   2. The authored peer-set carve (names.json `authored`) is added.
//   3. LAW §4, the base rule: a parent reads its child modules (its door re-exports them), so
//      a parent-level file a child value-reads would close a parent <-> child cycle, which
//      FD-2 refuses. Such files (and every parent-level file they value-read, to closure)
//      move to one sibling module per parent, its name authored in names.json `bases`.
//   4. An anchored file moves only within its anchor dir (LAW §1); a pinned file never moves
//      (authored/pinned.json, LAW §7). Each unit's moves are dry-run alone on the floor engine;
//      a unit FD-2 refuses is declined with the pair it would add. The accepted list is applied
//      by the engine and frozen (F-9).
//   node derive/carve.mjs --root <wt> [--dry] [--units a,b]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadFloor, arg } from "../lib/floor.mjs";
import { proposeUnit } from "../lib/dominance.mjs";
import { bAnchor } from "../lib/law.mjs";

const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const F = await loadFloor(root);
const N = JSON.parse(readFileSync(join(KIT, "authored/names.json"), "utf8"));
const PINNED = new Set(JSON.parse(readFileSync(join(KIT, "authored/pinned.json"), "utf8")).files);
const g = F.buildGraph(root);
const O = F.makeOrigins(g);
const anchor = bAnchor(F, g);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const doors = new Set([...g.record.js.map(([, s]) => s), ...g.record.css.map(([, t]) => t.source).filter(Boolean), ...g.record.doors, ...g.tree.files.filter((f) => /(^|\/)index\.(ts|css)$/.test(f) && f.startsWith("src/"))]);
const only = arg(args, "--units")?.split(",") ?? null;
const units = (only ?? [...new Set(g.tree.files.filter((f) => /^src\/(components|composables)\/[^/]+\//.test(f)).map((f) => f.split("/").slice(0, 3).join("/")))]).filter((u) => u !== "src/components/_shared").sort();
const VALUE = F.VALUE_KINDS;
const valueReads = new Map();
for (const e of g.edges) if (VALUE.has(e.kind) && !e.typeOnly && e.to && !e.dir) { if (!valueReads.has(e.from)) valueReads.set(e.from, new Set()); valueReads.get(e.from).add(e.to); }
const unitOf = F.dirUnits().unitOf; // a kind slot belongs to the dir that holds it (FD-3)

const proposal = [];
const plans = [];
const declined = [];
const unnamed = [];
const authoredByUnit = new Map();
for (const m of N.authored) { const u = m.from.split("/").slice(0, 3).join("/"); if (!authoredByUnit.has(u)) authoredByUnit.set(u, []); authoredByUnit.get(u).push(m); }
for (const U of units) {
    const p = proposeUnit(F, g, O, U, { doors, isSlot: F.isSlot });
    if (p.dirs.length) proposal.push({ unit: U, dirs: p.dirs.map((d) => ({ root: posix.relative(U, d.root), dir: posix.relative(U, d.dir), members: d.members.map((m) => posix.relative(U, m)) })) });
    // a decision is keyed by the root's path in the unit when first proposed; on a re-run over a
    // carved tree the root is found by its file name (unique in its unit)
    const decRaw = N.decisions[U] ?? {};
    const dec = new Proxy(decRaw, { get: (t, k) => t[k] ?? Object.entries(t).find(([x]) => posix.basename(x) === posix.basename(String(k)))?.[1] });
    const sorted = [...p.dirs].sort((a, b) => a.dir.length - b.dir.length);
    const finalDir = new Map();
    for (const d of sorted) {
        const key = posix.relative(U, d.root);
        const decision = dec[key];
        if (!decision) { unnamed.push(`${U}: ${key} (default ${posix.basename(d.dir)})`); finalDir.set(d.dir, null); continue; }
        const parentProposal = sorted.filter((x) => x !== d && d.dir.startsWith(`${x.dir}/`)).pop();
        const parentFinal = parentProposal ? finalDir.get(parentProposal.dir) : U;
        if (parentFinal === null || decision.keep) { finalDir.set(d.dir, null); if (decision.keep) declined.push({ unit: U, root: key, why: decision.why }); continue; }
        finalDir.set(d.dir, decision.collapse ? parentFinal : `${parentFinal}/${decision.name ?? posix.basename(d.dir)}`);
    }
    // 1. proposed members → the final dir of the innermost accepted proposal holding them
    const target = new Map();
    const place = (from, to, why) => {
        if (PINNED.has(from)) return `pinned ${from}`;
        const a = anchor(from);
        if (a && !under(to, a)) return `anchored ${from} (in ${a})`;
        if (to !== from) target.set(from, { to, why });
        return null;
    };
    for (const d of sorted) {
        const fd = finalDir.get(d.dir);
        if (fd === null) continue;
        for (const m of d.members) {
            const inner = sorted.filter((x) => x.members.includes(m) && finalDir.get(x.dir) !== null).pop();
            if (inner !== d) continue;
            const rootAs = d.root === m ? dec[posix.relative(U, d.root)]?.rootAs : null;
            place(m, `${fd}/${rootAs ?? posix.basename(m)}`, `dominance: ${posix.relative(U, d.root)}`);
        }
    }
    // a proposed module needs 2 or more files landing in it
    const count = new Map();
    for (const { to } of target.values()) count.set(posix.dirname(to), (count.get(posix.dirname(to)) ?? 0) + 1);
    for (const [from, { to }] of [...target]) {
        const d = posix.dirname(to);
        const present = g.tree.files.filter((f) => posix.dirname(f) === d && !target.has(f)).length;
        if ((count.get(d) ?? 0) + present < 2) target.delete(from);
    }
    // 2. the authored peer-set carve
    for (const m of authoredByUnit.get(U) ?? []) if (g.tree.isFile(m.from)) place(m.from, m.to, `authored: ${m.why}`);
    // 3. LAW §4, the base rule, to a fixpoint
    const at = (f) => target.get(f)?.to ?? f;
    const bases = N.bases?.[U] ?? {};
    const needBase = [];
    for (let changed = true, guard = 0; changed && guard < 12; guard++) {
        changed = false;
        const files = g.tree.files.filter((f) => under(f, U) && /\.(ts|mts|vue)$/.test(f) && !/(^|\/)__tests__\//.test(f));
        const dirOfF = (f) => unitOf(at(f));
        const parents = new Set();
        for (const f of files) { const d = dirOfF(f); if (d !== U) parents.add(posix.dirname(d)); }
        for (const P of parents) {
            if (!under(P, U)) continue;
            // children of P: unit dirs directly below P holding files
            const inChild = (f) => { const d = dirOfF(f); return d !== P && under(d, P) ? `${P}/${posix.relative(P, d).split("/")[0]}` : null; };
            const atP = (f) => dirOfF(f) === P;
            const pReads = new Set();
            for (const f of files) if (atP(f)) for (const t of valueReads.get(f) ?? []) { const c = inChild(t); if (c) pReads.add(c); }
            const pull = new Set();
            for (const f of files) { const c = inChild(f); if (!c || !pReads.has(c)) continue; for (const t of valueReads.get(f) ?? []) if (atP(t) && !doors.has(t)) pull.add(t); }
            for (let grow = true; grow;) { grow = false; for (const f of [...pull]) for (const t of valueReads.get(f) ?? []) if (atP(t) && !doors.has(t) && !pull.has(t)) { pull.add(t); grow = true; } }
            if (!pull.size) continue;
            const name = bases[posix.relative(U, P) || "."];
            if (!name) { needBase.push(`${U}: base for ${posix.relative(U, P) || "."} (would take ${[...pull].map((f) => posix.basename(f)).join(", ")})`); continue; }
            for (const f of pull) { const why = place(f, `${P}/${name}/${posix.basename(f)}`, `LAW §4 base of ${posix.relative(U, P) || U}`); if (why) needBase.push(`${U}: ${why}`); else changed = true; }
        }
    }
    if (needBase.length) unnamed.push(...needBase);
    if (target.size) plans.push({ unit: U, moves: [...target].map(([from, { to, why }]) => ({ from, to, why })) });
}
writeFileSync(join(KIT, "frozen/S3-proposal.json"), `${JSON.stringify({ step: "B-S3 dominance proposal (frozen, F-9)", proposal }, null, 1)}\n`);
if (unnamed.length) console.error(`carve: ${unnamed.length} decision(s) owed:\n  ${[...new Set(unnamed)].join("\n  ")}`);
if (unnamed.length && !args.includes("--partial")) process.exit(1);

// FD-2 per unit, then the accepted list as a whole
const accepted = [], refused = [];
for (const plan of plans) {
    const r = F.runMoves(root, plan.moves.map(({ from, to }) => ({ from, to })), { dry: true });
    if (r.phase === "plan") refused.push({ unit: plan.unit, plan: r.errors.slice(0, 3) });
    else if (r.scc?.grown?.length) refused.push({ unit: plan.unit, moves: plan.moves.length, added: r.scc.addedPairs, first: r.scc.firstAdded });
    else if (r.residue?.length) refused.push({ unit: plan.unit, residue: r.residue.slice(0, 3) });
    else accepted.push(plan);
}
const list = accepted.flatMap((x) => x.moves.map(({ from, to }) => ({ from, to })));
const dry = F.runMoves(root, list, { dry: true });
const scanDeltas = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ scanner: d.scanner, spec: d.spec, file: d.file, reason: `B-S3 carve: ${d.file} -> ${d.to}; the scanner's sensitivity is judged by the test run` }));
const summary = { accepted: accepted.map((x) => `${x.unit} (${x.moves.length})`), refused, declined: declined.map((d) => `${d.unit}: ${d.root}`), moves: list.length, dry: { residue: dry.residue?.length ?? 0, sccAdded: dry.scc?.addedPairs ?? 0, scanDeltas: scanDeltas.length } };
if (args.includes("--dry") || dry.scc?.grown?.length || !list.length) { console.log(JSON.stringify({ ...summary, plans: args.includes("--verbose") ? plans : undefined }, null, 1)); process.exit(dry.scc?.grown?.length ? 1 : 0); }
const r = F.runMoves(root, list, { declaredScanDeltas: scanDeltas });
summary.engine = { ok: r.ok, phase: r.phase, filesEdited: r.filesEdited, rewrites: r.rewrites, lost: r.image?.lost?.slice(0, 5), gained: r.image?.gained?.slice(0, 5), scc: r.scc ? { before: r.scc.before, after: r.scc.after, addedPairs: r.scc.addedPairs } : null, digest: r.digest };
if (r.ok) writeFileSync(join(KIT, `frozen/${arg(args, "--name", "S3-carve")}.json`), `${JSON.stringify({ step: "B-S3 module carve (frozen, F-9)", moves: list, scanDeltas, reasons: accepted.flatMap((x) => x.moves.map(({ from, why }) => ({ from, why }))), refused, declined }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 1));
process.exit(r.ok ? 0 : 1);
