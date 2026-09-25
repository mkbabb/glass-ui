#!/usr/bin/env node
// battery.mjs — the pass-2 critics' batteries (pass-2/kit/B-crit/battery.mjs, G-crit/tools/
// plants.mjs, Dp-crit/crit-plants.mjs) run as overlays on ONE tree, each plant judged by:
//   seal   — B's gate as the tree carries it (scripts/structure/seal/index.mjs, B7 door in every dir);
//   sealG  — the same seal under G's unit declaration: B7 dropped, B1 kept only for an edge that
//            enters a component unit from outside it (G's B1, LAW L4.1), plus G's E3 (eponymous
//            root or door, LAW L3.3) from the staged G gate;
//   gate   — G's gate in full (stage-g.mjs), and its merge set.
// A plant's catch is any line absent from the unplanted baseline. The plant definitions are
// read from the critics' files themselves (their source text is evaluated with write/edit
// bound to an overlay map, never the disk); a plant that moves files through the engine, or
// edits a path the judged tree does not hold, is reported `n/a` with the reason. Nothing is
// written into the judged tree.
//   node battery.mjs --tree <tree> --stage <scratch dir> --out <json> [--only B-crit,G-crit,Dp-crit]
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { MERGE, stageG } from "./stage-g.mjs";

const { dirname } = posix;
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const tree = resolve(opt("--tree")), stage = resolve(opt("--stage")), out = resolve(opt("--out"));
const only = opt("--only")?.split(",") ?? ["B-crit", "G-crit", "Dp-crit"];
const KIT = resolve(import.meta.dirname, "../../pass-2/kit");
const G = await stageG(tree, stage);
const L = await import(pathToFileURL(join(G.dir, "index.mjs")).href);
const { seal } = await import(pathToFileURL(join(tree, "scripts/structure/seal/index.mjs")).href);

// ------------------------------------------------------------ plant loading (overlay-bound)
const disk = (p) => readFileSync(join(tree, p), "utf8");
function overlayApi() {
    const ov = {};
    const cur = (p) => (p in ov ? ov[p] : disk(p));
    return {
        ov,
        read: (p) => disk(p),
        write: (p, t) => { ov[p] = t; },
        edit: (p, fn) => { if (!(p in ov) && !existsSync(join(tree, p))) throw new Error(`n/a: ${p} is not in this tree`); const o = cur(p); const n = fn(o); if (n === o) throw new Error(`n/a: edit of ${p} is a no-op here`); ov[p] = n; },
    };
}
const slice = (text, from, to) => { const a = text.indexOf(from); const b = text.indexOf(to, a); if (a < 0 || b < 0) throw new Error(`battery: cannot find ${from}`); return text.slice(a, b + 1); };
function bCrit() {
    const src = readFileSync(join(KIT, "B-crit/battery.mjs"), "utf8");
    const body = slice(src, "const C = ", "];\nconst base");
    return (read) => new Function("read", `${body}; return B;`)(read)
        .map(([id, clause, mark, what, overlay]) => ({ id: `B-crit:${id}`, clause, what, legal: clause === null, build: () => overlay }));
}
function gCrit() {
    const src = readFileSync(join(KIT, "G-crit/tools/plants.mjs"), "utf8");
    const helpers = slice(src, "const afterScript", "};\n");
    const body = slice(src, "const C = ", "};\nconst base");
    const ids = [...body.matchAll(/^\s{2}(P\d+[ab]?):/gm)].map((m) => m[1]);
    return ids.map((id) => ({ id: `G-crit:${id}`, clause: null, what: "G-crit plant", legal: false, build: () => {
        const api = overlayApi();
        const move = () => { throw new Error("n/a: an engine move plant (the overlay judge moves no file)"); };
        const readdirSync = () => { throw new Error("n/a: reads a dir listing for an engine move"); };
        const P = (f) => join(tree, f);
        const plants = new Function("write", "edit", "move", "readdirSync", "P", `${helpers}\n${body}; return plants;`)(api.write, api.edit, move, readdirSync, P);
        plants[id]();
        return api.ov;
    } }));
}
function dpCrit() {
    const src = readFileSync(join(KIT, "Dp-crit/crit-plants.mjs"), "utf8");
    const pre = slice(src, "const scriptInsert", "\n");
    const body = slice(src, "const BADGE", "};\nconst base");
    const ids = [...body.matchAll(/^\s{4}([IL]\d+):/gm)].map((m) => m[1]);
    return ids.map((id) => ({ id: `Dp-crit:${id}`, clause: null, what: "Dp-crit intent plant", legal: id.startsWith("L"), build: () => {
        const api = overlayApi();
        const plants = new Function("write", "edit", `${pre}\n${body}; return plants;`)(api.write, api.edit);
        plants[id]();
        return api.ov;
    } }));
}
const plants = [...(only.includes("B-crit") ? bCrit()(disk) : []), ...(only.includes("G-crit") ? gCrit() : []), ...(only.includes("Dp-crit") ? dpCrit() : [])];

// ------------------------------------------------------------ the judges
const unitCrossing = (line) => {
    // B1 line: `${from}:${line} -> ${to} …`; G's B1 seals only a component-unit boundary
    const m = /^(\S+?):\d*\s+->\s+(\S+)/.exec(line);
    if (!m) return true;
    const [, from, to] = m;
    const U = L.componentUnitOf(to);
    return !!U && !L.within(from, U) && from.startsWith("src/");
};
function judgeAll(overlay) {
    const s = seal(tree, { overlay });
    const g = G.judge(tree, { overlay });
    const sealG = { ...s.V, B7: [], B1: s.V.B1.filter(unitCrossing), E3: g.V.E3 };
    return { seal: s.V, sealG, gate: g.V };
}
const gained = (base, now) => Object.fromEntries(Object.keys(now).map((k) => [k, now[k].filter((x) => !base[k]?.has(x))]).filter(([, v]) => v.length));
const t0 = Date.now();
const B0 = judgeAll({});
const bases = Object.fromEntries(Object.entries(B0).map(([j, V]) => [j, Object.fromEntries(Object.entries(V).map(([k, v]) => [k, new Set(v)]))]));
const rows = [];
for (const p of plants) {
    let overlay;
    try { overlay = p.build(); } catch (e) { rows.push({ id: p.id, na: String(e.message).slice(0, 200) }); console.log(`N/A    ${p.id} ${String(e.message).slice(0, 120)}`); continue; }
    let J;
    try { J = judgeAll(overlay); } catch (e) { rows.push({ id: p.id, error: String(e.message).slice(0, 300) }); console.log(`ERROR  ${p.id} ${String(e.message).slice(0, 160)}`); continue; }
    const r = { id: p.id, clause: p.clause, legal: p.legal, what: p.what, files: Object.keys(overlay) };
    for (const j of ["seal", "sealG", "gate"]) {
        const gd = gained(bases[j], J[j]);
        r[j] = Object.fromEntries(Object.entries(gd).map(([k, v]) => [k, v.length]));
        r[`${j}Lines`] = Object.fromEntries(Object.entries(gd).map(([k, v]) => [k, v.slice(0, 3)]));
    }
    r.gateMerge = Object.fromEntries(Object.entries(r.gate).filter(([k]) => MERGE.includes(k)));
    r.caught = { seal: Object.keys(r.seal).length > 0, sealG: Object.keys(r.sealG).length > 0, gate: Object.keys(r.gate).length > 0, gateMerge: Object.keys(r.gateMerge).length > 0 };
    rows.push(r);
    console.log(`${p.legal ? "LEGAL " : "PLANT "} ${p.id} seal ${JSON.stringify(r.seal)} | sealG ${JSON.stringify(r.sealG)} | gate ${JSON.stringify(r.gate)}`);
}
const judged = rows.filter((r) => r.caught);
const tally = (pred) => judged.filter((r) => !r.legal && pred(r)).length;
const summary = {
    plants: rows.length, na: rows.filter((r) => r.na).length, errors: rows.filter((r) => r.error).length, judged: judged.length,
    illegalJudged: judged.filter((r) => !r.legal).length, legalJudged: judged.filter((r) => r.legal).length,
    caught: { seal: tally((r) => r.caught.seal), sealG: tally((r) => r.caught.sealG), gate: tally((r) => r.caught.gate), gateMerge: tally((r) => r.caught.gateMerge) },
    doorBought: judged.filter((r) => !r.legal && r.caught.seal && !r.caught.sealG).map((r) => ({ id: r.id, seal: r.seal })),
    eponymyBought: judged.filter((r) => !r.legal && !r.caught.seal && r.caught.sealG).map((r) => ({ id: r.id, sealG: r.sealG })),
    onlyB7orB1: judged.filter((r) => !r.legal && r.caught.seal && Object.keys(r.seal).every((k) => k === "B7" || k === "B1")).map((r) => ({ id: r.id, seal: r.seal, sealG: r.sealG })),
    falsePositives: { seal: judged.filter((r) => r.legal && r.caught.seal).map((r) => r.id), sealG: judged.filter((r) => r.legal && r.caught.sealG).map((r) => r.id), gate: judged.filter((r) => r.legal && r.caught.gate).map((r) => r.id) },
    ms: Date.now() - t0,
};
writeFileSync(out, `${JSON.stringify({ tree, summary, baseline: Object.fromEntries(Object.entries(B0).map(([j, V]) => [j, Object.fromEntries(Object.entries(V).map(([k, v]) => [k, v.length]))])), rows }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 1));
