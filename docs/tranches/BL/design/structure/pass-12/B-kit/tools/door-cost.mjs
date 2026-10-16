#!/usr/bin/env node
// door-cost.mjs — B-12 / S-23: the cost of B7's "a door in every sealed code dir" against G's
// reading, "an eponymous root or an index door" (G-kit LAW L3, E3), on one tree: B's migrated
// tree. For every module the landed gate counts (seal meta), its doors are read (JS index.ts /
// index.mjs, CSS index.css; an entry source that is the module's index is a door the package
// needs anyway and is counted apart). A module whose dir also holds an eponymous root by G's
// L3.1 rootName (re-stated here from G-kit/eponym/units.mjs; that file imports a floor path
// the B tree moved) could stand without the door under G's reading: those doors are the
// avoidable part. Read-only.
//   node tools/door-cost.mjs <migrated tree>
import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.argv[2]);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const pin = JSON.parse(readFileSync(join(root, "scripts/structure/records/seal-pin.json"), "utf8"));
const record = JSON.parse(readFileSync(join(root, "scripts/structure/records/entry-record.json"), "utf8"));
const ENTRY = new Set(record.js.map(([, s]) => s));
const verdict = seal(root);

// G-kit/eponym/units.mjs rootName (L3.1), unchanged
const STAGES = new Set(["frag", "vert", "wgsl", "glsl", "comp"]);
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
function rootName(file, unitName) {
    const b = basename(file);
    if (/^index\./.test(b)) return basename(dirname(file));
    let s = kebab(b.replace(/\.(vue|ts|mts|mjs|js|css)$/, "")).replace(/\./g, "-");
    s = s.replace(/^use-/, "");
    if (unitName && s.startsWith(`${unitName}-`)) { const rest = s.slice(unitName.length + 1); if (!STAGES.has(rest)) s = rest; }
    return s;
}
const unitOf = (d) => /^src\/components\/([^/]+)/.exec(d)?.[1] ?? null;
const rows = [];
for (const m of pin.modules) {
    let names;
    try { names = readdirSync(join(root, m)).filter((f) => statSync(join(root, m, f)).isFile()); } catch { continue; }
    const doors = names.filter((f) => /^index\.(ts|mjs|css)$/.test(f)).map((f) => posix.join(m, f));
    const eponymous = names.some((f) => !/^index\./.test(f) && !/\.(md|json)$/.test(f) && rootName(f, unitOf(m)) === basename(m));
    for (const d of doors) {
        const text = readFileSync(join(root, d), "utf8");
        const code = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("//") && !l.trim().startsWith("/*") && !l.trim().startsWith("*"));
        rows.push({ door: d, entry: ENTRY.has(d), bytes: Buffer.byteLength(text), statements: (text.match(/^(export|@import|@layer)\b/gm) ?? []).length, codeLines: code.length, eponymous });
    }
}
const sum = (xs, k) => xs.reduce((a, r) => a + r[k], 0);
const doorsOnly = rows.filter((r) => !r.entry);
const avoidable = doorsOnly.filter((r) => r.eponymous);
const oneStatement = doorsOnly.filter((r) => r.statements <= 1);
console.log(JSON.stringify({
    modules: pin.modules.length,
    doors: { total: rows.length, entrySources: rows.length - doorsOnly.length, internal: doorsOnly.length, js: doorsOnly.filter((r) => !r.door.endsWith(".css")).length, css: doorsOnly.filter((r) => r.door.endsWith(".css")).length, bytes: sum(doorsOnly, "bytes"), exportStatements: sum(doorsOnly, "statements") },
    underG: { avoidable: avoidable.length, avoidableBytes: sum(avoidable, "bytes"), avoidableDoors: avoidable.map((r) => r.door) },
    oneStatementDoors: oneStatement.length,
    sealTotal: Object.values(verdict.counts).reduce((a, b) => a + b, 0),
}, null, 1));
