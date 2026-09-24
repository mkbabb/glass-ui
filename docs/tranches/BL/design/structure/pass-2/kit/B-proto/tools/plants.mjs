#!/usr/bin/env node
// plants.mjs — the seat's plant battery for seal.mjs (a regression battery, not the critic's
// intent battery: F-9). Each plant is an in-memory overlay on the F-1 tree; it is CAUGHT when
// its expected clause gains a line naming the planted path. A legal probe passes when no
// clause gains any line.
//   node plants.mjs --root WT --out plants.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const out = args[args.indexOf("--out") + 1];
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8");
const C = "src/components";
const many = (dir, n) => Object.fromEntries(Array.from({ length: n }, (_, i) => [`${dir}/plantMany${i}.ts`, `export const plantMany${i} = ${i};\n`]));
const PLANTS = [
    { id: "P01", clause: "B0", mark: "plantA", what: "an import that resolves nowhere", overlay: { [`${C}/button/plantA.ts`]: 'import { x } from "./nope";\nexport const plantA = x;\n' } },
    { id: "P02", clause: "B0", mark: "plant-walk", what: "a test walks src/components outside the harness", overlay: { "tests/plant-walk.test.ts": 'import { readdirSync } from "node:fs";\nexport const names = readdirSync("src/components");\n' } },
    { id: "P03", clause: "B1", mark: "plantB", what: "a deep import past the dock/search door", overlay: { [`${C}/button/plantB.ts`]: 'import { useDockSearch } from "../dock/search/useDockSearch";\nexport const plantB = useDockSearch;\n' } },
    { id: "P04", clause: "B1", mark: "plantC", what: "a member imports its own door", overlay: { [`${C}/button/plantC.ts`]: 'import { Button } from ".";\nexport const plantC = Button;\n' } },
    { id: "P05", clause: "B2", mark: "demo/plantD", what: "the demo reads a private kernel file", overlay: { "demo/plantD.ts": 'import { cn } from "../src/components/_shared/class-names";\nexport const plantD = cn;\n' } },
    { id: "P06", clause: "B3", mark: "button/plant.css", what: "a CSS import past the slider CSS door", overlay: { [`${C}/button/plant.css`]: '@import "../slider/styles.css";\n' } },
    { id: "P07", clause: "B4", mark: "accordion", what: "a value cycle accordion <-> avatar through their doors", overlay: { [`${C}/accordion/plantE.ts`]: 'import { Avatar } from "../avatar";\nexport const plantE = Avatar;\n', [`${C}/avatar/plantF.ts`]: 'import { Accordion } from "../accordion";\nexport const plantF = Accordion;\n' } },
    { id: "P08", clause: "B5", mark: "aurora/composables/index.ts", what: "a door inside a kind slot", overlay: { [`${C}/aurora/composables/index.ts`]: 'export { useAurora } from "./useAurora";\n' } },
    { id: "P09", clause: "B6", mark: "src/components/badge/", what: "13 direct files in one dir", overlay: many(`${C}/badge`, 11) },
    { id: "P10", clause: "B6", mark: "plantLong", what: "a 501-line source file", overlay: { [`${C}/badge/plantLong.ts`]: `${Array.from({ length: 501 }, (_, i) => `export const l${i} = ${i};`).join("\n")}\n` } },
    { id: "P11", clause: "B7", mark: "dock/plantmod", what: "a door-less dir the dock deep-imports (C-6)", overlay: { [`${C}/dock/plantmod/probe.ts`]: "export const probe = 1;\n", [`${C}/dock/plantImporter.ts`]: 'import { probe } from "./plantmod/probe";\nexport const plantImporter = probe;\n' } },
    { id: "P12", clause: "B8", mark: "plantG", what: "the kernel reads a unit", overlay: { "src/composables/dom/plantG.ts": 'import { Button } from "../../components/button";\nexport const plantG = Button;\n' } },
    { id: "P13", clause: "B8", mark: "src/composables/dom/index.ts", what: "a kernel entry re-exports a unit file", overlay: { "src/composables/dom/index.ts": `${read("src/composables/dom/index.ts")}export { useDockSearch } from "../../components/dock/search/useDockSearch";\n` } },
    { id: "P14", clause: "B9", mark: "badge/index.ts", what: "a unit door re-exports outside its subtree", overlay: { [`${C}/badge/index.ts`]: `${read(`${C}/badge/index.ts`)}export { cn } from "../_shared";\n` } },
    { id: "P15", clause: "B10", mark: "plantH", what: "a kernel file only dock reads, left in the kernel", overlay: { "src/composables/dom/plantH.ts": "export const plantH = 1;\n", [`${C}/dock/plantI.ts`]: 'import { plantH } from "../../composables/dom/plantH";\nexport const plantI = plantH;\n' } },
    { id: "P16", clause: "B11", mark: "badge/plantmod/index.ts", what: "an empty door", overlay: { [`${C}/badge/plantmod/x.ts`]: "export const x = 1;\n", [`${C}/badge/plantmod/index.ts`]: "// nothing crosses\n" } },
    { id: "P17", clause: "B11", mark: "useFuzzySearch2", what: "door growth outside the pin", overlay: { [`${C}/dock/search/index.ts`]: `${read(`${C}/dock/search/index.ts`)}export { useFuzzySearch as useFuzzySearch2 } from "./useFuzzySearch";\n` } },
    { id: "P18", clause: "B12", mark: "plantRelay", what: "a relay (a non-door re-export)", overlay: { [`${C}/badge/plantRelay.ts`]: 'export { badgeVariants } from "./badge";\n' } },
    { id: "P19", clause: "B12", mark: "badge/badge.d.ts", what: "a declaration mirror", overlay: { [`${C}/badge/badge.d.ts`]: "export declare const badgeVariants: unknown;\n" } },
    { id: "P20", clause: "B13", mark: "plant-bin", what: "a script imports a bin", overlay: { "scripts/plant-bin.mjs": 'import "./verify-export-types.mjs";\n' } },
    { id: "P21", clause: "B14", mark: "slider/index.css", what: "a rule inside a CSS door", overlay: { [`${C}/slider/index.css`]: `${read(`${C}/slider/index.css`)}.plant { color: red; }\n` } },
    { id: "P22", clause: "B14", mark: "dock/search/index.ts", what: "code inside a JS door", overlay: { [`${C}/dock/search/index.ts`]: `${read(`${C}/dock/search/index.ts`)}export const plantK = 1;\n` } },
    { id: "P23", clause: "B15", mark: "part-1", what: "a part-1 module", overlay: { [`${C}/badge/part-1/x.ts`]: "export const x = 1;\n", [`${C}/badge/part-1/index.ts`]: 'export { x } from "./x";\n' } },
    { id: "P24", clause: "B15", mark: "badge/badge", what: "a module that repeats its parent", overlay: { [`${C}/badge/badge/y.ts`]: "export const y = 1;\n", [`${C}/badge/badge/index.ts`]: 'export { y } from "./y";\n' } },
    { id: "L01", legal: true, what: "a member reads a sibling module through its door", overlay: { [`${C}/dock/plantL.ts`]: 'import { useDockSearch } from "./search";\nexport const plantL = useDockSearch;\n' } },
    { id: "L02", legal: true, what: "the demo reads a published entry by the package name", overlay: { "demo/plantM.ts": 'import { Button } from "@mkbabb/glass-ui/button";\nexport const plantM = Button;\n' } },
];
const base = seal(root);
const baseSets = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
const rows = [];
for (const p of PLANTS) {
    const r = seal(root, { overlay: p.overlay });
    const gained = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !baseSets[k].has(x))]).filter(([, v]) => v.length));
    const caught = p.legal ? Object.keys(gained).length === 0 : (gained[p.clause] ?? []).some((x) => x.includes(p.mark));
    rows.push({ id: p.id, clause: p.clause ?? "legal", what: p.what, caught, gainedIn: Object.fromEntries(Object.entries(gained).map(([k, v]) => [k, v.length])), first: Object.values(gained).flat().slice(0, 2) });
    console.log(`${caught ? (p.legal ? "PASS " : "CAUGHT") : (p.legal ? "FALSE+" : "MISSED")} ${p.id} ${p.clause ?? "legal"} ${p.what} ${JSON.stringify(rows.at(-1).gainedIn)}`);
}
writeFileSync(out, `${JSON.stringify({ base: base.counts, rows }, null, 1)}\n`);
const bad = rows.filter((r) => !r.caught);
console.log(`plants: ${rows.length}, ${rows.filter((r) => r.caught && r.clause !== "legal").length} caught, ${rows.filter((r) => r.clause === "legal" && r.caught).length} legal probes clean, ${bad.length} failed`);
