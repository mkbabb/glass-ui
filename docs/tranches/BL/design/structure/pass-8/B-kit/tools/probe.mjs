#!/usr/bin/env node
// probe.mjs — the plants the pass-2 battery (pass-2/kit/B-crit/battery.mjs) cannot express on
// the pass-3 tree, run as in-memory overlays through the landed gate (nothing is written).
//   I7'     the battery's I7 plants its @import at the first "@import" text in
//           src/styles/index.css, which is now inside the header comment, so it plants
//           nothing; I7' plants the same private dock sheet after the first live @import
//   N-misc  B-07: a module named `misc`
//   N-use   B-07: a file named `use.ts` (`detents/use.ts`)
//   node tools/probe.mjs <migrated tree>
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.argv[2]);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const read = (p) => readFileSync(join(root, p), "utf8");
const C = "src/components";
const idx = read("src/styles/index.css");
const firstLive = idx.search(/^@import /m);
if (firstLive < 0) throw new Error("probe: no live @import in src/styles/index.css");
const plants = [
    ["I7'", "B3", "core.css", { "src/styles/index.css": `${idx.slice(0, firstLive)}@import "../components/dock/styles/core.css";\n${idx.slice(firstLive)}` }],
    ["N-misc", "B15", "misc", { [`${C}/dock/misc/x.ts`]: "export const x = 1;\n", [`${C}/dock/misc/index.ts`]: 'export { x } from "./x";\n' }],
    ["N-use", "B15", "use.ts", { [`${C}/slider/detents/use.ts`]: "export const u = 1;\n" }],
];
const base = seal(root);
const bs = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
for (const [id, clause, mark, overlay] of plants) {
    const r = seal(root, { overlay });
    const gained = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !bs[k].has(x))]).filter(([, v]) => v.length));
    const hit = (gained[clause] ?? []).some((x) => x.includes(mark));
    console.log(`${hit ? "CAUGHT" : "MISSED"} ${id} [${clause}] :: ${JSON.stringify(Object.fromEntries(Object.entries(gained).map(([k, v]) => [k, v.slice(0, 2)])))}`);
}
