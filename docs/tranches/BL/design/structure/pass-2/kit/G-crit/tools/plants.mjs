// Critic battery runner: plant, judge with a gate, undo. node plants.mjs <root> <gate.mjs> <out.json> [ids]
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname } from "node:path";
const [root, gate, out, only] = process.argv.slice(2);
const { runMoves } = await import(`${root}/docs/tranches/BL/design/structure/floor/lib/move.mjs`);
const P = (f) => `${root}/${f}`;
const runGate = () => JSON.parse(execFileSync("node", [gate, root], { encoding: "utf8", maxBuffer: 1 << 28 }));
const status = () => execFileSync("git", ["-C", root, "status", "--porcelain"], { encoding: "utf8" });
// undo stack helpers
let undo = [];
const write = (f, text) => { const had = existsSync(P(f)); const old = had ? readFileSync(P(f), "utf8") : null; mkdirSync(dirname(P(f)), { recursive: true }); writeFileSync(P(f), text); undo.push(() => { if (had) writeFileSync(P(f), old); else rmSync(P(f)); }); };
const edit = (f, fn) => { const old = readFileSync(P(f), "utf8"); const nw = fn(old); if (nw === old) throw new Error(`edit no-op ${f}`); writeFileSync(P(f), nw); undo.push(() => writeFileSync(P(f), old)); };
const afterScript = (text, line) => { const m = text.match(/<script setup lang="ts"(?:\s+[\w-]+="[^"]*")*\s*>\n/); if (!m) throw new Error("no script setup"); return text.replace(m[0], m[0] + line + "\n"); };
const move = (moves) => {
  const dry = runMoves(root, moves, { dry: true, declaredScanDeltas: [] });
  if (dry.errors) throw new Error("plan " + JSON.stringify(dry.errors).slice(0, 300));
  const decl = (dry.scanDeltas?.undeclared ?? []).map((d) => ({ ...d, reason: "plant" }));
  const r = runMoves(root, moves, { declaredScanDeltas: decl });
  if (!r.ok) throw new Error(`engine refused: ${r.phase} lost=${JSON.stringify(r.image?.lost ?? []).slice(0, 300)} residue=${r.residue?.length}`);
  undo.push(() => { const back = moves.map((m) => ({ from: m.to, to: m.from })).reverse(); const d2 = runMoves(root, back, { dry: true, declaredScanDeltas: [] }); const r2 = runMoves(root, back, { declaredScanDeltas: (d2.scanDeltas?.undeclared ?? []).map((d) => ({ ...d, reason: "unplant" })) }); if (!r2.ok) throw new Error("UNDO FAILED " + r2.phase); });
};
const C = "src/components/";
const imp = (f, line) => edit(f, (t) => afterScript(t, line));
const plants = {
  P01: () => move([{ from: C + "dock/search/match.ts", to: C + "dock/match.ts" }]),
  P02: () => move([{ from: C + "dock/glass-dock/useDockClickIntegrity.ts", to: C + "dock/misc/useDockClickIntegrity.ts" }, { from: C + "dock/glass-dock/useDockShellProps.ts", to: C + "dock/misc/useDockShellProps.ts" }]),
  P03: () => move([{ from: C + "skeleton/Skeleton.vue", to: C + "data-table/Skeleton.vue" }]),
  P04: () => move([{ from: C + "dock/glass-dock/GlassDock.vue", to: C + "dock/glass-dock/DockShellView.vue" }]),
  P05: () => { const n = []; for (let i = 1; i <= 11; i++) { const id = `p${String(i).padStart(2, "0")}`; write(C + `badge/${id}.ts`, `export const ${id} = ${i};\n`); n.push(id); } imp(C + "badge/Badge.vue", n.map((id) => `import { ${id} } from "./${id}";`).join("\n") + `\nvoid [${n.join(", ")}];`); },
  P06: () => move(["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"].map((s) => ({ from: C + `accordion/${s}.vue`, to: C + `${s}.vue` }))),
  P07a: () => { write(C + "dock/registry.ts", `import DockSeparator from "./DockSeparator.vue";\nimport DockTrigger from "./DockTrigger.vue";\nimport DockControl from "./DockControl.vue";\nexport const registry = { DockSeparator, DockTrigger, DockControl };\n`); imp(C + "dock/glass-dock/GlassDock.vue", `import { registry } from "../registry";\nvoid registry;`); },
  P07b: () => { plants.P07a(); move([{ from: C + "dock/registry.ts", to: C + "dock/registry/registry.ts" }, ...["DockSeparator", "DockTrigger", "DockControl"].map((s) => ({ from: C + `dock/${s}.vue`, to: C + `dock/registry/${s}.vue` }))]); },
  P08: () => edit(C + "dock/constants.ts", (t) => `import "./does-not-exist";\n` + t),
  P09: () => move([{ from: C + "slider/useDragVelocity.ts", to: "src/composables/dom/useDragVelocity.ts" }]),
  P10: () => move([{ from: C + "_shared/ModalOverlay.vue", to: C + "dialog/ModalOverlay.vue" }]),
  P11: () => edit("demo/stories/dock/controls.vue", (t) => t.replace(`import { computed, ref } from "vue";\n`, `import { computed, ref } from "vue";\nimport { useDockSpring } from "../../../src/components/dock/composables/useDockSpring";\nvoid useDockSpring;\n`)),
  P12: () => edit(C + "slider/index.ts", (t) => t + `export { GlassDock } from "../dock";\n`),
  P13: () => write("tests/components/badge-plant.test.ts", `import { describe, it, expect } from "vitest";\nimport { Badge } from "../../src/components/badge";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n`),
  P14: () => write(C + "slider/__tests__/dock-plant.test.ts", `import { describe, it, expect } from "vitest";\nimport { GlassDock } from "../../dock";\ndescribe("d", () => it("x", () => expect(GlassDock).toBeTruthy()));\n`),
  P15: () => edit(C + "badge/index.ts", (t) => t + Array.from({ length: 520 }, (_, i) => `// pad ${i}`).join("\n") + "\n"),
  P16: () => imp(C + "badge/Badge.vue", `import { Button } from "@mkbabb/glass-ui/button";\nvoid Button;`),
  P17: () => edit("demo/demo.css", (t) => `@import "../src/components/dock/styles/run.css";\n` + t),
  P18: () => imp(C + "badge/Badge.vue", `import { useDockSpring } from "../dock/composables/useDockSpring";\nvoid useDockSpring;`),
  P19: () => { write(C + "dock/utils/format.ts", `export const fmt = (s: string) => s.trim();\n`); write(C + "dock/utils/pad.ts", `export const pad = (s: string) => " " + s;\n`); write(C + "dock/utils/utils.ts", `import { fmt } from "./format";\nimport { pad } from "./pad";\nexport const tidy = (s: string) => pad(fmt(s));\n`); imp(C + "dock/DockControl.vue", `import { tidy } from "./utils/utils";\nvoid tidy;`); },
  P20: () => { write(C + "dock/GlassDockLegacy.ts", `export { default } from "./glass-dock/GlassDock.vue";\n`); edit(C + "dock/index.ts", (t) => t + `export { default as GlassDockLegacy } from "./GlassDockLegacy";\n`); },
  P21: () => imp(C + "dock/DockControl.vue", `const _fallback = import("./nope-missing").catch(() => null);\nvoid _fallback;`),
  P22: () => { write(C + "skeleton/DataTableSkeleton.vue", `<template><div class="dt-skel" /></template>\n`); imp(C + "data-table/DataTable.vue", `import DataTableSkeleton from "../skeleton/DataTableSkeleton.vue";\nvoid DataTableSkeleton;`); },
  P23: () => { const n = []; for (let i = 1; i <= 8; i++) { write(C + `dock/composables/useDockPlant${i}.ts`, `export function useDockPlant${i}() { return ${i}; }\n`); n.push(`useDockPlant${i}`); } imp(C + "dock/DockControl.vue", n.map((x) => `import { ${x} } from "./composables/${x}";`).join("\n") + `\nvoid [${n.join(", ")}];`); },
  P24: () => { write(C + "badge/badge-label/BadgeLabel.vue", `<template><span class="badge-label" /></template>\n`); imp(C + "badge/Badge.vue", `import BadgeLabel from "./badge-label/BadgeLabel.vue";\nvoid BadgeLabel;`); },
  P25: () => move(readdirSync(P(C + "dock/search")).map((f) => ({ from: C + `dock/search/${f}`, to: C + `dock/wrap/search/${f}` }))),
  P26: () => imp(C + "badge/Badge.vue", `const _u = new URL("../dock/search/match.ts", import.meta.url);\nvoid _u;`),
  P27: () => move([{ from: C + "data-table/styles.css", to: "src/styles/data-table.css" }]),
  P28: () => { write("scripts/foo-helper.mjs", `export const foo = 1;\n`); edit("scripts/profile-bundle.mjs", (t) => { const i = t.indexOf("\nimport "); return t.slice(0, i + 1) + `import { foo } from "./foo-helper.mjs";\nvoid foo;\n` + t.slice(i + 1); }); },
  P29: () => { for (let i = 1; i <= 4; i++) write(`demo/stories/dock/plant-${i}.vue`, `<template><div /></template>\n`); },
  P30: () => imp(C + "badge/Badge.vue", `import type { SearchResult } from "../dock/search/types";\ntype _R = SearchResult;`),
};
const base = runGate(); const st0 = status();
const res = [];
for (const id of Object.keys(plants).filter((k) => !only || only.split(",").includes(k))) {
  undo = []; let row = { id };
  try {
    plants[id]();
    const r = runGate();
    row.rose = {}; row.fresh = {};
    for (const k of Object.keys(r.counts)) { const b = new Set(base.items[k]); const fresh = r.items[k].filter((x) => !b.has(x)); if (r.counts[k] !== base.counts[k] || fresh.length) { row.rose[k] = `${base.counts[k]}→${r.counts[k]}`; row.fresh[k] = fresh.slice(0, 6); } }
  } catch (e) { row.error = String(e.message).slice(0, 400); }
  for (const u of undo.reverse()) { try { u(); } catch (e) { row.undoError = String(e.message); } }
  const st = status(); if (st !== st0) { row.dirtyAfterUndo = true; console.error("DIRTY after", id); }
  res.push(row); console.log(JSON.stringify(row).slice(0, 900));
  writeFileSync(out, JSON.stringify(res, null, 1));
}
const fin = runGate(); console.log("baseline restored:", JSON.stringify(fin.counts) === JSON.stringify(base.counts));
