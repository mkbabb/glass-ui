#!/usr/bin/env node
// b-seal-on-g.mjs — D1 pass 3 cross-judge (REGISTRY §P2-6.4, the merge test), direction B → G:
// B's gate (pass-3/B-kit/gate/seal.mjs with B-kit/lib/law.mjs, every clause B0..B16) judges
// G's migrated tree, which the caller has replayed from pass-3/G-kit only (G-kit/tools/replay.sh).
//
// The gate is used as B's kit holds it, byte for byte, except its one floor import
// ("../lib/index.mjs", the floor library door B's own chain creates at S20) is pointed at the
// judged tree's own floor files: G's tree keeps the floor library flat (scripts/structure/lib/
// graph.mjs, …), and has no lib/index.mjs door. The copy lives in the OS temp dir; the judged
// tree gains no file. typescript and postcss resolve from the judged tree's package.json.
//
// B11's pin arm and B10's holds read a pin. Three readings are run and all are reported:
//   literal  — readPin(G): the pin at scripts/structure/records/seal-pin.json (G's tree has none);
//   bpin     — B's own landed pin, rebuilt from B's frozen rows only (S13 create, S25 and S31
//              hunks, each hunk applied exactly once), checked against S31's recorded pin summary;
//   self     — the gate's own reading of G's tree (pinNow) with B's reviewed names and holds
//              (authored/seal-review.json): B11 then judges its structural arms only;
//   self-noholds — as self with holds {} (the reading B-kit/tools/merge-test.mjs used), for
//              reconciliation with B-proto §4 S-13.
//
//   node b-seal-on-g.mjs --g <G tree> --out <result.json>
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const G = opt("--g"), out = opt("--out");
const HERE = dirname(fileURLToPath(import.meta.url));
const BKIT = resolve(HERE, "../B-kit");
const url = (p) => pathToFileURL(p).href;
const once = (text, from, to, what) => { if (text.split(from).length !== 2) throw new Error(`${what}: hunk source not found exactly once`); return text.replace(from, () => to); };

// ---- B's landed pin, from the frozen rows alone
const PIN = "scripts/structure/records/seal-pin.json";
const rowFile = (s) => JSON.parse(readFileSync(join(BKIT, "frozen", s), "utf8"));
let pinText = rowFile("S13-gate.json").files[PIN].create;
for (const s of ["S25-gate.json", "S31-gate.json"]) for (const [f, t] of rowFile(s).files[PIN].hunks) pinText = once(pinText, f, t, `${s} ${PIN}`);
const bPin = JSON.parse(pinText);
const recorded = rowFile("S31-gate.json").pin;
const rebuilt = { modules: bPin.modules.length, doors: Object.keys(bPin.doors).length, names: Object.values(bPin.doors).reduce((a, b) => a + b.length, 0), reviewed: Object.keys(bPin.names ?? {}).length, holds: Object.keys(bPin.holds ?? {}).length };
const pinCheck = { recorded, rebuilt, match: JSON.stringify(recorded) === JSON.stringify(rebuilt) };

// ---- the kit's gate against the landed text: S31's seal.mjs hunk targets are in the kit copy
const kitSeal = readFileSync(join(BKIT, "gate/seal.mjs"), "utf8");
const s31 = rowFile("S31-gate.json").files["scripts/structure/seal/seal.mjs"].hunks;
const sealCheck = { s31Hunks: s31.length, kitHoldsEveryTo: s31.every(([, t]) => kitSeal.includes(t)), kitHoldsNoFrom: s31.every(([f]) => !kitSeal.includes(f)) };

const tmp = mkdtempSync(join(tmpdir(), "xj-BonG-"));
const total = (c) => Object.values(c).reduce((a, b) => a + b, 0);
const result = { judged: G, pinCheck, sealCheck, readings: {} };
try {
    const lib = (f) => url(join(G, "scripts/structure/lib", f));
    writeFileSync(join(tmp, "floor.mjs"), [
        `export { buildGraph, VALUE_KINDS } from "${lib("graph.mjs")}";`,
        `export { CONTAINERS, isSlot, placeAll, proposedPath } from "${lib("placement.mjs")}";`,
        `export { makeOrigins } from "${lib("symbols.mjs")}";`,
        `export { sccGrowth } from "${lib("move.mjs")}";`,
    ].join("\n") + "\n");
    writeFileSync(join(tmp, "seal.mjs"), once(kitSeal, '"../lib/index.mjs"', '"./floor.mjs"', "B gate floor import"));
    copyFileSync(join(BKIT, "lib/law.mjs"), join(tmp, "law.mjs"));
    const { seal, readPin } = await import(url(join(tmp, "seal.mjs")));
    const review = JSON.parse(readFileSync(join(BKIT, "authored/seal-review.json"), "utf8"));
    const keep = (r) => ({ total: r.total, counts: r.counts, meta: r.meta, V: r.V });

    try { readPin(G); result.readings.literal = { ran: true }; } catch (e) { result.readings.literal = { ran: false, error: e.message.replace(G, "<G>") }; }

    result.readings.bpin = keep(seal(G, { pin: bPin }));
    const first = seal(G, { pin: { modules: [], doors: {}, names: review.names, holds: review.holds } });
    result.readings.self = keep(seal(G, { pin: { ...first.pinNow, names: review.names, holds: review.holds } }));
    result.readings["self-noholds"] = keep(seal(G, { pin: { ...first.pinNow, names: review.names, holds: {} } }));
    for (const [k, r] of Object.entries(result.readings)) if (r.counts) r.red = Object.entries(r.counts).filter(([, n]) => n).map(([c, n]) => `${c} ${n}`);
    writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
    console.log(JSON.stringify({ pinCheck, sealCheck, literal: result.readings.literal, ...Object.fromEntries(Object.entries(result.readings).filter(([, r]) => r.counts).map(([k, r]) => [k, { total: r.total, red: r.red }])) }, null, 1));
} finally { rmSync(tmp, { recursive: true, force: true }); }
