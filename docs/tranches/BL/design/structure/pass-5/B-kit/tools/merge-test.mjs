#!/usr/bin/env node
// merge-test.mjs — S-13 (REGISTRY §P2-6.4, the merge test): cross-judging. B's seal runs on G's
// migrated tree, and G's gate (E0–E7 and its shared clauses) runs on B's. Each gate is copied
// from its kit into the OS temp directory with its floor imports pointed at the JUDGED tree's
// own floor files (the two trees keep the same floor code at different paths: B moved the F-1
// graph into scripts/structure/lib/graph/, S19), so neither tree gains a file. Both gates
// resolve typescript and postcss from the judged tree's package.json.
// B's pin on G's tree: B11's pin arm compares a tree against its own reviewed pin, which G's
// tree does not have; the pin is taken from the gate's own reading of G's tree (pinNow) with
// B's reviewed names and holds, so B11 judges only its structural arms there. Every other
// clause is judged as written.
//   node tools/merge-test.mjs --b <B tree> --g <G tree> --out <result.json>
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const B = opt("--b"), G = opt("--g"), out = opt("--out");
const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const GKIT = resolve(KIT, "../G-kit/eponym");
const url = (p) => pathToFileURL(p).href;
const once = (text, from, to, what) => { if (text.split(from).length !== 2) throw new Error(`merge-test: ${what}: ${from} not found once`); return text.replace(from, () => to); };
const tmp = mkdtempSync(join(tmpdir(), "b-merge-"));
const total = (c) => Object.values(c).reduce((a, b) => a + b, 0);
try {
    // ---- B's seal on G's tree
    const lib = (f) => url(join(G, "scripts/structure/lib", f));
    writeFileSync(join(tmp, "floor.mjs"), [
        `export { buildGraph, VALUE_KINDS } from "${lib("graph.mjs")}";`,
        `export { CONTAINERS, isSlot, placeAll, proposedPath } from "${lib("placement.mjs")}";`,
        `export { makeOrigins } from "${lib("symbols.mjs")}";`,
        `export { sccGrowth } from "${lib("move.mjs")}";`,
    ].join("\n") + "\n");
    writeFileSync(join(tmp, "seal.mjs"), once(readFileSync(join(KIT, "gate/seal.mjs"), "utf8"), '"../lib/index.mjs"', '"./floor.mjs"', "B gate"));
    copyFileSync(join(KIT, "lib/law.mjs"), join(tmp, "law.mjs"));
    const { seal } = await import(url(join(tmp, "seal.mjs")));
    const review = JSON.parse(readFileSync(join(KIT, "authored/seal-review.json"), "utf8"));
    const first = seal(G, { pin: { modules: [], doors: {}, names: review.names, holds: review.holds } });
    const bOnG = seal(G, { pin: { ...first.pinNow, names: review.names, holds: {} } });
    // ---- G's gate on B's tree
    const gdir = join(tmp, "eponym");
    rmSync(gdir, { recursive: true, force: true });
    const blib = (f) => url(join(B, "scripts/structure/lib", f === "graph.mjs" ? "graph/graph.mjs" : f));
    (await import("node:fs")).mkdirSync(gdir);
    for (const f of readdirSync(GKIT)) {
        let text = readFileSync(join(GKIT, f), "utf8");
        if (f.endsWith(".mjs")) text = text.replace(/"\.\.\/lib\/([a-z-]+\.mjs)"/g, (_, n) => `"${blib(n)}"`);
        writeFileSync(join(gdir, f), text);
    }
    const { judge } = await import(url(join(gdir, "eponym.mjs")));
    const gOnB = judge(B);
    const gOnG = judge(G);
    const pick = (r) => ({ total: total(r.counts), counts: r.counts, first: Object.fromEntries(Object.entries(r.V).filter(([, v]) => v.length).map(([k, v]) => [k, v.slice(0, 6)])) });
    const result = { bOnG: pick(bOnG), gOnB: pick(gOnB), gOnG: { total: total(gOnG.counts), counts: gOnG.counts } };
    writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
    console.log(JSON.stringify({ bOnG: result.bOnG.counts, gOnB: result.gOnB.counts, gOnG: result.gOnG.counts }));
} finally { rmSync(tmp, { recursive: true, force: true }); }
