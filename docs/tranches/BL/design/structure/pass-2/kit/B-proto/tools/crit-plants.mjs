// crit-plants.mjs — the pass-1 D1-B critic's plants (pass-1/D1-B-critique.md §2, C-1..C-16) transcribed
// onto the migrated tree's paths and run as in-memory overlays against seal.mjs. CAUGHT = some
// clause gains a line naming the plant's path; a control is CAUGHT likewise.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
const root = resolve(process.argv[2]); const out = process.argv[3];
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8");
const C = "src/components";
const PL = [
  ["C-1", "useKeyboardShortcuts", { "src/composables/keyboard/useKeyboardShortcuts.ts": read("src/composables/keyboard/useKeyboardShortcuts.ts") + 'import { Metric } from "../../components/metric";\nexport const zzC1 = Metric;\n' }],
  ["C-1b", "useSidebarState", { "src/composables/sidebar/useSidebarState.ts": read("src/composables/sidebar/useSidebarState.ts") + 'import { Metric } from "../../components/metric";\nexport const zzC1b = Metric;\n' }],
  ["C-2", "composables/color/index.ts", { "src/composables/color/index.ts": read("src/composables/color/index.ts") + 'export type { DockState } from "../../components/dock";\n' }],
  ["C-3", "metric/index.ts", { [`${C}/metric/index.ts`]: read(`${C}/metric/index.ts`) + 'export { GlassDock } from "../dock";\n' }],
  ["C-4", "useZzDockOnly", { "src/composables/dom/useZzDockOnly.ts": "export const useZzDockOnly = () => 1;\n", "src/composables/dom/index.ts": read("src/composables/dom/index.ts") + 'export { useZzDockOnly } from "./useZzDockOnly";\n', [`${C}/dock/zzUse.ts`]: 'import { useZzDockOnly } from "../../composables/dom";\nexport const zzUse = useZzDockOnly;\n' }],
  ["C-5", "ZzDockPip", { [`${C}/_shared/ZzDockPip.vue`]: "<template><i /></template>\n", [`${C}/_shared/index.ts`]: read(`${C}/_shared/index.ts`) + 'export { default as ZzDockPip } from "./ZzDockPip.vue";\n', [`${C}/dock/zzPip.ts`]: 'import { ZzDockPip } from "../_shared";\nexport const zzPip = ZzDockPip;\n' }],
  ["C-6", "zz-pip", { [`${C}/zz-pip/pip.ts`]: "export const pip = 1;\n", [`${C}/dock/zzDeep.ts`]: 'import { pip } from "../zz-pip/pip";\nexport const zzDeep = pip;\n' }],
  ["C-7", "zzBig", { [`${C}/chip/zzBig.ts`]: "// @generated\n" + Array.from({ length: 900 }, (_, i) => `export const b${i} = ${i};`).join("\n") + "\n" }],
  ["C-8", "demo/zz-plant", { "demo/zz-plant.ts": "export const load = (n: string) => import(`../src/components/dock/composables/${n}.ts`);\n" }],
  ["C-9", "zz-read.test", { "tests/zz-read.test.ts": 'import { readFileSync } from "node:fs";\nexport const a = readFileSync(new URL("../src/components/dock/composables/useDockState.ts", import.meta.url));\n' }],
  ["C-10", "chipVariants", { [`${C}/chip/chipVariants.ts`]: read(`${C}/chip/chipVariants.ts`) + 'import "../../../demo/router";\n' }],
  ["C-11", "chip/zz.css", { [`${C}/chip/zz.css`]: '@import "../../styles/glass/shapes/mark.css";\n' }],
  ["C-12", "demo/zz-flat", Object.fromEntries(Array.from({ length: 30 }, (_, i) => [`demo/zz-flat/f${i}.ts`, `export const f${i} = ${i};\n`]))],
  ["C-13", "src/components/chip/", Object.fromEntries(Array.from({ length: 20 }, (_, i) => [`${C}/chip/zz${i}.test.ts`, `export const t${i} = ${i};\n`]))],
  ["C-14", "class-names", { [`${C}/_shared/class-names.ts`]: read(`${C}/_shared/class-names.ts`) + 'import type { DockState } from "../dock";\nexport type ZzC14 = DockState;\n' }],
  ["C-15", "ModalOverlay", { [`${C}/dock/zzRaw.ts`]: 'import raw from "../_shared/overlay/ModalOverlay.vue?raw";\nexport const zzRaw = raw;\n' }],
  ["C-16", "zz-mock.test", { "tests/zz-mock.test.ts": 'import { vi } from "vitest";\nvi.mock("../src/components/dock/composables/useDockState");\n' }],
];
const base = seal(root); const bs = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
const rows = [];
for (const [id, mark, overlay] of PL) {
  const r = seal(root, { overlay });
  const gained = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !bs[k].has(x))]).filter(([, v]) => v.length));
  const hit = Object.entries(gained).filter(([, v]) => v.some((x) => x.includes(mark))).map(([k]) => k);
  rows.push({ id, caught: hit.length > 0, clauses: hit, first: Object.values(gained).flat().filter((x) => x.includes(mark)).slice(0, 2) });
  console.log(`${hit.length ? "CAUGHT" : "MISSED"} ${id} ${hit.join(",")} ${rows.at(-1).first[0]?.slice(0, 170) ?? ""}`);
}
writeFileSync(out, JSON.stringify(rows, null, 1));
console.log(`crit plants: ${rows.length}, caught ${rows.filter((r) => r.caught).length}`);
