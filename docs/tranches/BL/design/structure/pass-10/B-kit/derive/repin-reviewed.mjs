#!/usr/bin/env node
// repin-reviewed.mjs — DERIVE (pass 4): re-pin the floor's surface pin (F-9) after a reviewed
// entry change, as a frozen row. Needs a dist built from the current tree. It runs the floor's
// `surface.mjs check` and admits exactly the change the authored input names (`key`, the new
// entry; `from`, the entry that drops; `names`, what moves): the key added to exports and
// typesVersions, the new entry added holding exactly `names`, and `from` losing exactly
// `names`. Any other line, a name missing, or a name extra stops the run: growth is admitted
// only as the named move of an existing name plus the one ruled key (P3-R5).
//   node derive/repin-reviewed.mjs --root <wt> --expect authored/aurora-config.mjs --from aurora --id S33c --out frozen/S33c-surface-pin.json
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const SURFACE = join(root, "scripts/structure/surface.mjs");
const PIN = "scripts/structure/records/surface-pin.json";
const doc = await import(pathToFileURL(join(KIT, arg(args, "--expect"))).href);
const from = `./${arg(args, "--from")}`, key = `./${doc.key}`;
const names = new Set(doc.names);
const { readSurface } = await import(pathToFileURL(SURFACE).href);
const pin = JSON.parse(readFileSync(join(root, PIN), "utf8"));
const now = await readSurface(root, join(root, "dist"));
const bad = [];
const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
const without = (xs) => xs.filter((x) => !names.has(x));
// exports and typesVersions: exactly the one key added
const addKey = (a, b, k) => { const A = new Set(a); const extra = b.filter((x) => !A.has(x)); if (extra.length !== 1 || extra[0] !== k || b.length !== a.length + 1) bad.push(`${k}: key set differs beyond the one added key (${extra.join(",")})`); };
addKey(pin.exportKeys, now.exportKeys, key);
addKey(pin.typesVersionsKeys, now.typesVersionsKeys, doc.key);
for (const [k, e] of Object.entries(now.entries)) {
    const p = pin.entries[k];
    if (k === key) {
        if (p) { bad.push(`${k}: already pinned`); continue; }
        const got = new Set([...e.runtime, ...e.types]);
        for (const n of names) if (!got.has(n)) bad.push(`${k}: missing ${n}`);
        for (const n of got) if (!names.has(n)) bad.push(`${k}: extra ${n}`);
        continue;
    }
    if (!p) { bad.push(`${k}: a new entry nothing ruled`); continue; }
    if (k === from) {
        for (const part of ["runtime", "types"]) if (!eq(without(p[part]), e[part]) ) bad.push(`${k} ${part}: loses other than the moved names`);
        continue;
    }
    if (!eq(p.runtime, e.runtime) || !eq(p.types, e.types)) bad.push(`${k}: changed`);
}
for (const k of Object.keys(pin.entries)) if (!now.entries[k]) bad.push(`${k}: removed`);
if (bad.length) { console.error(`repin-reviewed: stopped\n  ${bad.slice(0, 40).join("\n  ")}`); process.exit(1); }
const before = readFileSync(join(root, PIN), "utf8");
execFileSync("node", [SURFACE, "pin", "--root", root], { stdio: "ignore" });
const after = readFileSync(join(root, PIN), "utf8");
writeFileSync(join(root, PIN), before);
const why = `B-${arg(args, "--id")} surface re-pin: ${key} added with ${names.size} names, each leaving ${from} (a MIGRATION row per name, P3-R5's added key); nothing else changes`;
const row = { ...makeRow(root, why, { [PIN]: after }), moved: [...names], key };
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify({ ...applyRow(root, row), moved: names.size }));
recordStep(root, { id: arg(args, "--id"), kind: "row", file, why });
