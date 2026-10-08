#!/usr/bin/env node
// publish.mjs — DERIVE (pass 6, P4-R2/P5-R3): publish named names on their owning entries as
// one frozen row. The authored input (authored/p6-publish.mjs) gives the exact-text edits to
// the doors and MIGRATION.md (derive/edits.mjs's shape) and `added`, the surface-pin growth it
// claims per entry. The run writes the edits, builds the library, reads the built surface with
// the floor's surface reader (F-9), and admits exactly that growth: no export key changes, no
// entry loses a name, and every entry gains exactly the names `added` gives it. Anything else
// stops the run with the tree put back. The surface pin is then re-pinned by the floor's own
// `surface.mjs pin`, and the doors, MIGRATION.md and the pin land as one row (lib/row.mjs).
//   node derive/publish.mjs --root <wt> --authored authored/p6-publish.mjs --id S64 --out frozen/S64-publish.json
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const doc = await import(pathToFileURL(join(KIT, arg(args, "--authored"))).href);
const PIN = "scripts/structure/records/surface-pin.json";
const SURFACE = join(root, "scripts/structure/surface.mjs");
const count = (t, s) => t.split(s).length - 1;

// the intended texts, from the authored edits (each `from` exactly once)
const intended = {};
const stop = [];
for (const { file, from, to } of doc.edits) {
    const text = (intended[file] ??= readFileSync(join(root, file), "utf8"));
    if (count(text, from) !== 1) { stop.push(`${file}: ${count(text, from)} match(es) for ${JSON.stringify(from.slice(0, 70))}`); continue; }
    intended[file] = text.replace(from, () => to);
}
if (stop.length) { console.error(`publish: stopped\n  ${stop.join("\n  ")}`); process.exit(1); }

const prior = Object.fromEntries(Object.keys(intended).map((f) => [f, readFileSync(join(root, f), "utf8")]));
const pinBefore = readFileSync(join(root, PIN), "utf8");
let pinAfter;
try {
    for (const [f, t] of Object.entries(intended)) writeFileSync(join(root, f), t);
    execFileSync(join(root, "node_modules/.bin/vite"), ["build"], { cwd: root, stdio: "ignore", maxBuffer: 1 << 28 });
    const { readSurface } = await import(pathToFileURL(SURFACE).href);
    const pin = JSON.parse(pinBefore);
    const now = await readSurface(root, join(root, "dist"));
    const bad = [];
    const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
    if (!same(pin.exportKeys, now.exportKeys)) bad.push("export keys changed");
    if (!same(pin.typesVersionsKeys, now.typesVersionsKeys)) bad.push("typesVersions keys changed");
    for (const k of new Set([...Object.keys(pin.entries), ...Object.keys(now.entries)])) {
        const p = pin.entries[k], e = now.entries[k];
        if (!p || !e) { bad.push(`${k}: entry ${p ? "removed" : "added"}`); continue; }
        for (const part of ["runtime", "types"]) {
            const want = [...p[part], ...(doc.added[k]?.[part] ?? [])].sort();
            const lost = p[part].filter((n) => !e[part].includes(n));
            const extra = e[part].filter((n) => !want.includes(n));
            const missing = want.filter((n) => !e[part].includes(n));
            if (lost.length) bad.push(`${k} ${part}: loses ${lost.join(", ")}`);
            if (extra.length) bad.push(`${k} ${part}: gains unnamed ${extra.join(", ")}`);
            if (missing.length) bad.push(`${k} ${part}: does not gain ${missing.join(", ")}`);
        }
    }
    if (bad.length) throw new Error(`publish: the built surface differs from the named growth\n  ${bad.join("\n  ")}`);
    execFileSync("node", [SURFACE, "pin", "--root", root], { stdio: "ignore" });
    pinAfter = readFileSync(join(root, PIN), "utf8");
} finally {
    for (const [f, t] of Object.entries(prior)) writeFileSync(join(root, f), t);
    writeFileSync(join(root, PIN), pinBefore);
}
const n = Object.values(doc.added).reduce((a, x) => a + new Set([...x.runtime, ...x.types]).size, 0);
const row = { ...makeRow(root, doc.why, { ...intended, [PIN]: pinAfter }), reasons: doc.edits.map(({ file, why }) => ({ file, why })), added: doc.added };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), names: n }));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why: doc.why });
if (!existsSync(join(root, "dist"))) throw new Error("publish: no dist after the build");
