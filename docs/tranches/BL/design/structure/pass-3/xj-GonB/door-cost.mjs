#!/usr/bin/env node
// door-cost.mjs — S-23 / B-12 on one tree: B7's "a door in every sealed code dir" (B-kit LAW
// §1, B7) against G's "an eponymous root or a door" (G-kit LAW L3.3/E3). Every door file in
// the sealed zones (`index.ts`, `index.mjs`, `index.css` in a dir that is not a kind slot) is
// read and put in one class:
//   entry     — a JS or CSS entry source: the package needs it under either reading;
//   unitRoot  — a component unit's own door (G's B1 lands every crossing on it: needed by both);
//   nested    — a door below a component unit root. G needs it only when the dir holds no
//               eponymous root (L3.1 rootName with G's authored names, dirNameOf) — E3 accepts
//               the root in its place. `eponymous` marks the ones G's reading can drop;
//   kernel    — a door of a global-zone module (src/composables, src/styles, _shared, fonts)
//               that is not an entry. G's law has no E3 there (L2.9): no door is required;
//   scripts   — a scripts module door. G's L4.3 permits `index.mjs`, requires none.
// For each class: count, bytes, statements (export/@import/@layer/@source lines), one-statement
// doors. Read-only; G's name functions come from the staged G gate (stage-g.mjs).
//   node door-cost.mjs --tree <tree> --stage <scratch dir> --out <json>
import { writeFileSync } from "node:fs";
import { join, posix, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { stageG } from "./stage-g.mjs";

const { dirname, basename } = posix;
const args = process.argv.slice(2);
const opt = (k) => resolve(args[args.indexOf(k) + 1]);
const tree = opt("--tree"), stage = opt("--stage"), out = opt("--out");
const G = await stageG(tree, stage);
const L = await import(pathToFileURL(join(G.dir, "index.mjs")).href);
const { isSlot } = await import(pathToFileURL(join(tree, "scripts/structure/lib/placement.mjs")).href);
const ctx = L.context(tree);
const { T, g } = ctx;
const sealed = (f) => f.startsWith("src/") || f.startsWith("scripts/");
const doorFiles = T.files.filter((f) => sealed(f) && /(^|\/)index\.(ts|mjs|css)$/.test(f) && !isSlot(dirname(f)) && !L.isTest(f) && !/\/__tests__\//.test(f));
const entry = new Set([...ctx.entrySources, ...ctx.cssEntrySources]);
const AGG = new Set(["src/index.ts", "src/components/index.ts", "src/styles/index.css"]);
const rows = [];
for (const d of doorFiles) {
    const dir = dirname(d);
    const text = T.read(d) ?? "";
    const U = L.componentUnitOf(`${dir}/x`);
    let cls;
    if (entry.has(d) || AGG.has(d)) cls = "entry";
    else if (d.startsWith("scripts/")) cls = "scripts";
    else if (U && dir === U) cls = "unitRoot";
    else if (U) cls = "nested";
    else cls = "kernel";
    const own = T.files.filter((f) => dirname(f) === dir && /\.(ts|mts|vue|css|mjs)$/.test(f) && !/^index\./.test(basename(f)) && !L.isTest(f));
    const eponymous = U && dir !== U ? own.some((f) => L.norm(L.dirNameOf(f, U)) === L.norm(basename(dir))) : own.some((f) => L.norm(L.rootName(f, null)) === L.norm(basename(dir)));
    const gAuthored = U && dir !== U ? (L.baseNameOf(U, dirname(dir)) === basename(dir) || L.carveModules().includes(dir)) : false;
    rows.push({ door: d, cls, bytes: Buffer.byteLength(text), statements: (text.match(/^\s*(export|@import|@layer|@source)\b/gm) ?? []).length, lines: text.split("\n").filter((l) => l.trim()).length, eponymous, gAuthored });
}
const sum = (xs) => ({ n: xs.length, bytes: xs.reduce((a, r) => a + r.bytes, 0), statements: xs.reduce((a, r) => a + r.statements, 0), oneStatement: xs.filter((r) => r.statements <= 1).length });
const by = (c) => rows.filter((r) => r.cls === c);
const nested = by("nested");
// what each reading requires
const needB = rows; // B7: every sealed code module has its door (and the entries)
const needG = rows.filter((r) => r.cls === "entry" || r.cls === "unitRoot" || (r.cls === "nested" && !r.eponymous && !r.gAuthored));
const dropG = rows.filter((r) => !needG.includes(r));
const result = {
    tree, doors: sum(rows),
    byClass: Object.fromEntries(["entry", "unitRoot", "nested", "kernel", "scripts"].map((c) => [c, sum(by(c))])),
    nested: { eponymous: sum(nested.filter((r) => r.eponymous)), gAuthoredNotEponymous: sum(nested.filter((r) => !r.eponymous && r.gAuthored)), neither: sum(nested.filter((r) => !r.eponymous && !r.gAuthored)) },
    B7reading: sum(needB), Greading: sum(needG), droppedUnderG: { ...sum(dropG), byClass: Object.fromEntries(["nested", "kernel", "scripts"].map((c) => [c, sum(dropG.filter((r) => r.cls === c))])) },
    rows,
};
writeFileSync(out, `${JSON.stringify(result, null, 1)}\n`);
console.log(JSON.stringify({ doors: result.doors, byClass: result.byClass, nested: result.nested, B7reading: result.B7reading, Greading: result.Greading, droppedUnderG: result.droppedUnderG }, null, 1));
