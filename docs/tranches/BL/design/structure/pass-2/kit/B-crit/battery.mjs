// battery.mjs — the critic's intent battery (B-critique §1) planted as overlays on the migrated tree.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]); const out = process.argv[3];
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8");
const C = "src/components";
const n = (dir, k, pre) => Object.fromEntries(Array.from({ length: k }, (_, i) => [`${dir}/${pre}${i}.ts`, `export const ${pre}${i} = ${i};\n`]));
const long = (k) => Array.from({ length: k }, (_, i) => `export const kN${i} = ${i};`).join("\n") + "\n";
const SFC = '<script setup lang="ts">\nconst a = 1;\n</script>\n<template><div class="dts">{{ a }}</div></template>\n';
const B = [
 ["I1","B10","useSliderThumbGlow","global composable read by one component",{ "src/composables/dom/useSliderThumbGlow.ts":"export function useSliderThumbGlow(){ return 1; }\n", [`${C}/slider/plantI1.ts`]:'import { useSliderThumbGlow } from "../../composables/dom/useSliderThumbGlow";\nexport const plantI1 = useSliderThumbGlow;\n' }],
 ["I2","B10","useSliderThumbGlow","I1 published through the kernel door",{ "src/composables/dom/useSliderThumbGlow.ts":"export function useSliderThumbGlow(){ return 1; }\n", "src/composables/dom/index.ts": read("src/composables/dom/index.ts")+'export * from "./useSliderThumbGlow";\n', [`${C}/slider/plantI2.ts`]:'import { useSliderThumbGlow } from "../../composables/dom";\nexport const plantI2 = useSliderThumbGlow;\n' }],
 ["I3","B10","useDockGhost","dock composable read only by slider",{ [`${C}/dock/composables/useDockGhost.ts`]:"export const useDockGhost = () => 1;\n", [`${C}/slider/plantI3.ts`]:'import { useDockGhost } from "../dock/composables/useDockGhost";\nexport const plantI3 = useDockGhost;\n' }],
 ["I4","B1","plantI4","relative deep import past dock/legibility door",{ [`${C}/slider/plantI4.ts`]:'import { useGlassBackdropLuminance } from "../dock/legibility/useGlassBackdropLuminance";\nexport const plantI4 = useGlassBackdropLuminance;\n' }],
 ["I4b","B1","plantI4b","@/ alias deep import past a door",{ [`${C}/slider/plantI4b.ts`]:'import { useGlassBackdropLuminance } from "@/components/dock/legibility/useGlassBackdropLuminance";\nexport const plantI4b = useGlassBackdropLuminance;\n' }],
 ["I5","B1","plantI5","member imports its own door",{ [`${C}/chip/plantI5.ts`]:'import { Chip } from "./index";\nexport const plantI5 = Chip;\n' }],
 ["I6","B1","plantI6","self-name import of the package from src",{ [`${C}/chip/plantI6.ts`]:'import { Badge } from "@mkbabb/glass-ui/badge";\nexport const plantI6 = Badge;\n' }],
 ["I7","B3","core.css","style kernel @imports a private dock sheet",{ "src/styles/index.css": read("src/styles/index.css").replace(/(@import[^\n]*\n)/, `$1@import "../components/dock/styles/core.css";\n`) }],
 ["I7b","B3","slider/styles.css","a kernel leaf sheet @imports a component's private sheet",{ "src/styles/view-transition.css": '@import "../components/slider/styles.css";\n'+read("src/styles/view-transition.css") }],
 ["I8","B6","src/components/chip/","13 direct files",n(`${C}/chip`,8,"plantI8_")],
 ["I9","B6","chipVariants.ts","file > 500 lines",{ [`${C}/chip/chipVariants.ts`]: read(`${C}/chip/chipVariants.ts`)+long(520) }],
 ["I10","B6","regen-spring-tokens","script > 500 lines",{ "scripts/regen-spring-tokens.mjs": read("scripts/regen-spring-tokens.mjs")+long(520) }],
 ["I11","R-3","plant-chip-only","test whose one subject is chip, left in tests/",{ "tests/unit/plant-chip-only.test.ts":'import { Chip } from "../../src/components/chip";\nimport { it, expect } from "vitest";\nit("x", () => expect(Chip).toBeTruthy());\n' }],
 ["I11b","B2","plant-chip-deep","test in tests/ deep-reads chip internals",{ "tests/unit/plant-chip-deep.test.ts":'import { chipVariants } from "../../src/components/chip/chipVariants";\nimport { it, expect } from "vitest";\nit("x", () => expect(chipVariants).toBeTruthy());\n' }],
 ["I12","R-3","plant-slider-only","test colocated in chip whose subject is slider",{ [`${C}/chip/__tests__/plant-slider-only.test.ts`]:'import { Slider } from "../../slider";\nimport { it, expect } from "vitest";\nit("x", () => expect(Slider).toBeTruthy());\n' }],
 ["I13","B9","Chip","dual door: badge door republishes Chip",{ [`${C}/badge/index.ts`]: read(`${C}/badge/index.ts`)+'export { Chip } from "../chip";\n' }],
 ["I14","B11","Pill","alias name on a door",{ [`${C}/chip/index.ts`]: read(`${C}/chip/index.ts`)+'export { default as Pill } from "./Chip.vue";\n' }],
 ["I15","B15","part-1","part-1 module",{ [`${C}/dock/part-1/x.ts`]:"export const x = 1;\n", [`${C}/dock/part-1/index.ts`]:'export { x } from "./x";\n' }],
 ["I15b","B15","dock/utils","placeholder name utils",{ [`${C}/dock/utils/x.ts`]:"export const x = 1;\n", [`${C}/dock/utils/index.ts`]:'export { x } from "./x";\n' }],
 ["I15c","B15","dock/v2","placeholder name v2",{ [`${C}/dock/v2/x.ts`]:"export const x = 1;\n", [`${C}/dock/v2/index.ts`]:'export { x } from "./x";\n' }],
 ["I16","B15","menu/menu","module repeats parent",{ [`${C}/menu/menu/x.ts`]:"export const x = 1;\n", [`${C}/menu/menu/index.ts`]:'export { x } from "./x";\n' }],
 ["I17","B1","plantI17","masked fallback: dynamic-template deep import with catch",{ [`${C}/slider/plantI17.ts`]:"export const plantI17 = (n: string) => import(`../dock/composables/${n}.ts`).catch(() => null);\n" }],
 ["I17b","B0","gone.css","masked fallback: CSS import of a missing sheet",{ [`${C}/slider/index.css`]: read(`${C}/slider/index.css`)+'@import "./gone.css";\n' }],
 ["I17c","B1","plantI17c","masked fallback: try deep import, fall back to door",{ [`${C}/slider/plantI17c.ts`]:'export async function plantI17c(){ try { return (await import("../dock/legibility/useGlassBackdropLuminance")).useGlassBackdropLuminance; } catch { return (await import("../dock")).GlassDock; } }\n' }],
 ["I18","B10","DataTableSkeleton","skeleton in skeleton/ read only by data-table",{ [`${C}/skeleton/DataTableSkeleton.vue`]:SFC, [`${C}/data-table/plantI18.ts`]:'import DataTableSkeleton from "../skeleton/DataTableSkeleton.vue";\nexport const plantI18 = DataTableSkeleton;\n' }],
 ["I19","B10","DataTableSkeleton","skeleton in _shared read only by data-table",{ [`${C}/_shared/DataTableSkeleton.vue`]:SFC, [`${C}/data-table/plantI19.ts`]:'import DataTableSkeleton from "../_shared/DataTableSkeleton.vue";\nexport const plantI19 = DataTableSkeleton;\n' }],
 ["I20","B10","slider-thumb.css","stylesheet in style kernel loaded only by slider",{ "src/styles/slider-thumb.css":".slider-thumb-x{color:red}\n", [`${C}/slider/index.css`]: read(`${C}/slider/index.css`)+'@import "../../styles/slider-thumb.css";\n' }],
 ["I21","B7","dock/ghost","doorless dir deep-imported",{ [`${C}/dock/ghost/useGhost.ts`]:"export const useGhost = 1;\n", [`${C}/dock/plantI21.ts`]:'import { useGhost } from "./ghost/useGhost";\nexport const plantI21 = useGhost;\n' }],
 ["I22","B8","useBreakpoint","kernel type-imports a unit",{ "src/composables/dom/useBreakpoint.ts": 'import type * as Dock from "../../components/dock";\nexport type PlantDock = typeof Dock;\n'+read("src/composables/dom/useBreakpoint.ts") }],
 ["I23","B8","demo","src reads demo",{ [`${C}/chip/plantI23.ts`]:'import * as m from "../../../demo/router";\nexport const plantI23 = m;\n' }],
 ["I24","B4","chip","sibling cycle chip <-> badge",{ [`${C}/chip/plantI24a.ts`]:'import { Badge } from "../badge";\nexport const plantI24a = Badge;\n', [`${C}/badge/plantI24b.ts`]:'import { Chip } from "../chip";\nexport const plantI24b = Chip;\n' }],
 ["I25","B14","chip/index.ts","code in a JS door",{ [`${C}/chip/index.ts`]: read(`${C}/chip/index.ts`)+'export const CHIP_DEFAULT = "x";\n' }],
 ["I26","B14","dock/index.css","rule in a CSS door",{ [`${C}/dock/index.css`]: read(`${C}/dock/index.css`)+".x{color:red}\n" }],
 ["I27","B12","constants.legacy","legacy shim relay",{ [`${C}/dock/constants.legacy.ts`]:'export * from "./constants";\n', [`${C}/dock/plantI27.ts`]:'import * as k from "./constants.legacy";\nexport const plantI27 = k;\n' }],
 ["I28","B5","composables/hold","dir inside a kind slot",{ [`${C}/dock/composables/hold/useHold.ts`]:"export const useHold = 1;\n", [`${C}/dock/plantI28.ts`]:'import { useHold } from "./composables/hold/useHold";\nexport const plantI28 = useHold;\n' }],
 ["I29","B13","verify-export-types","bin imports a bin",{ "scripts/profile-bundle.mjs": 'import "./verify-export-types.mjs";\n'+read("scripts/profile-bundle.mjs") }],
 ["I30","B8","useDockHold","kernel entry re-exports a unit file",{ "src/composables/dom/index.ts": read("src/composables/dom/index.ts")+'export { useDockHold } from "../../components/slider/useDockHold";\n' }],
 ["I31","B2","plantI31","demo past a door",{ "demo/plantI31.ts":'import { useDockHold } from "../src/components/slider/useDockHold";\nexport const plantI31 = useDockHold;\n' }],
 ["I32","B0","plant-walk2","computed-path read in tests",{ "tests/unit/plant-walk2.test.ts":'import { readFileSync } from "node:fs";\nimport { join } from "node:path";\nexport const r = (n: string) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n' }],
 ["I33","B7","chip/extra","undeclared index.ts",{ [`${C}/chip/extra/x.ts`]:"export const x = 1;\n", [`${C}/chip/extra/index.ts`]:'export { x } from "./x";\n', [`${C}/chip/plantI33.ts`]:'import { x } from "./extra";\nexport const plantI33 = x;\n' }],
 ["I34","B6","demo/stories/data/","13 files in a story category",n("demo/stories/data",4,"plantI34_")],
 ["L1",null,null,"slider reads dock through its door",{ [`${C}/slider/plantL1.ts`]:'import { GlassDock } from "../dock";\nexport const plantL1 = GlassDock;\n' }],
 ["L2",null,null,"colocated slider-local composable",{ [`${C}/slider/useSliderLocal.ts`]:"export const useSliderLocal = () => 1;\n", [`${C}/slider/plantL2.ts`]:'import { useSliderLocal } from "./useSliderLocal";\nexport const plantL2 = useSliderLocal;\n' }],
];
const base = seal(root); const bs = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
const rows = [];
for (const [id, clause, mark, what, overlay] of B) {
  const r = seal(root, { overlay });
  const gained = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !bs[k].has(x))]).filter(([, v]) => v.length));
  const any = Object.keys(gained).length > 0;
  const inExpected = clause && (gained[clause] ?? []).some((x) => x.includes(mark));
  const legal = clause === null;
  rows.push({ id, clause, what, legal, any, inExpected, gained: Object.fromEntries(Object.entries(gained).map(([k, v]) => [k, v.slice(0, 3)])) });
  console.log(`${legal ? (any ? "FALSE+" : "CLEAN ") : inExpected ? "CAUGHT" : any ? "OTHER " : "MISSED"} ${id} [${clause}] ${what} :: ${JSON.stringify(Object.fromEntries(Object.entries(gained).map(([k, v]) => [k, v.length])))}`);
}
writeFileSync(out, JSON.stringify({ base: base.counts, rows }, null, 1));
