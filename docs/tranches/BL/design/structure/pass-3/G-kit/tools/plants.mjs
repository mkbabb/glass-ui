#!/usr/bin/env node
// plants.mjs — the D1-G plant battery on the migrated tree. A plant is an in-memory overlay
// (path -> text; the tree on disk is never written), judged by the landed gate
// (scripts/structure/eponym/eponym.mjs --overlay). A plant BITES when every clause it names
// rises above the unplanted count. Plant ids follow the pass-2 G-crit battery
// (pass-2/kit/G-crit/tools/plants.mjs) re-pathed to the migrated layout; B-14 and B-22 are the
// REGISTRY G-07 cases. P07a also reads the law directly: the wiring file L2.4 finds.
//   node plants.mjs --root <migrated tree> --out <result.json>
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const GATE = join(root, "scripts/structure/eponym/eponym.mjs");
const C = "src/components/";
const read = (p) => readFileSync(join(root, p), "utf8");
const listUnder = (d) => execFileSync("git", ["-C", root, "ls-files", "-co", "--exclude-standard", d], { encoding: "utf8" }).split("\n").filter((f) => f && existsSync(join(root, f)));
const inScript = (p, line) => { const t = read(p); const m = t.match(/<script setup lang="ts"[^>]*>\n/); if (!m) throw new Error(`${p}: no <script setup>`); return t.replace(m[0], `${m[0]}${line}\n`); };

const plants = {
    P07a: { what: "a wiring file (L2.4): dock/registry.ts registers three SFCs as object-literal values; GlassDock reads it", expect: [], overlay: () => ({
        [`${C}dock/registry.ts`]: `import DockSeparator from "./DockSeparator.vue";\nimport DockTrigger from "./DockTrigger.vue";\nimport DockControl from "./DockControl.vue";\nexport const registry = { DockSeparator, DockTrigger, DockControl };\n`,
        [`${C}dock/GlassDock.vue`]: inScript(`${C}dock/GlassDock.vue`, `import { registry } from "./registry";\nvoid registry;`),
    }) },
    P18: { what: "a reach past a unit's door: badge reads dock's private composable (L4.1)", expect: ["B1"], overlay: () => ({
        [`${C}badge/Badge.vue`]: inScript(`${C}badge/Badge.vue`, `import { useDockSpring } from "../dock/composables/useDockSpring";\nvoid useDockSpring;`),
    }) },
    P19: { what: "a placeholder dir and file name: dock/utils/utils.ts (E3P)", expect: ["E3P"], overlay: () => ({
        [`${C}dock/utils/format.ts`]: `export const fmt = (s: string) => s.trim();\n`,
        [`${C}dock/utils/pad.ts`]: `export const pad = (s: string) => " " + s;\n`,
        [`${C}dock/utils/utils.ts`]: `import { fmt } from "./format";\nimport { pad } from "./pad";\nexport const tidy = (s: string) => pad(fmt(s));\n`,
        [`${C}dock/DockControl.vue`]: inScript(`${C}dock/DockControl.vue`, `import { tidy } from "./utils/utils";\nvoid tidy;`),
    }) },
    P20: { what: "a relay: dock/GlassDockLegacy.ts re-exports GlassDock and the door publishes it again (L4.3, L4.6)", expect: ["B12"], overlay: () => ({
        [`${C}dock/GlassDockLegacy.ts`]: `export { default } from "./GlassDock.vue";\n`,
        [`${C}dock/index.ts`]: `${read(`${C}dock/index.ts`)}export { default as GlassDockLegacy } from "./GlassDockLegacy";\n`,
    }) },
    P21: { what: "a masking fallback: a dynamic import of a missing module caught to null (E0, fail-closed)", expect: ["E0"], overlay: () => ({
        [`${C}dock/DockControl.vue`]: inScript(`${C}dock/DockControl.vue`, `const _fallback = import("./nope-missing").catch(() => null);\nvoid _fallback;`),
    }) },
    P28: { what: "a scripts helper one bin alone loads, loose at the zone root (L6.1)", expect: ["S1"], overlay: () => {
        const t = read("scripts/profile-bundle.mjs"); const i = t.indexOf("\nimport ");
        return { "scripts/foo-helper.mjs": `export const foo = 1;\n`, "scripts/profile-bundle.mjs": `${t.slice(0, i + 1)}import { foo } from "./foo-helper.mjs";\nvoid foo;\n${t.slice(i + 1)}` };
    } },
    P12: { what: "direction: the kernel reads a component unit (L4.2)", expect: ["B8"], overlay: () => ({
        "src/composables/dom/plantKernelReach.ts": `import { GlassDock } from "../../components/dock";\nexport const reach = GlassDock;\n`,
    }) },
    "B-14": { what: "a CSS door's @source glob out of its own subtree (L4.4, P3-R8)", expect: ["B14"], overlay: () => ({
        [`${C}dock/styles/controls/index.css`]: `${read(`${C}dock/styles/controls/index.css`)}@source "../../../badge/**/*.vue";\n`,
    }) },
    "B-22": { what: "a <style src> carve into another unit's sheet (L4.1 reads sfc-style-src)", expect: ["B1"], overlay: () => ({
        [`${C}badge/Badge.vue`]: `${read(`${C}badge/Badge.vue`)}\n<style src="../dock/styles/run.css"></style>\n`,
    }) },
    P15: { what: "a file over the 500-line bound (L7.0)", expect: ["E4"], overlay: () => ({
        [`${C}badge/badgeVariants.ts`]: `${read(`${C}badge/badgeVariants.ts`)}${Array.from({ length: 520 }, (_, i) => `// pad ${i}`).join("\n")}\n`,
    }) },
    P14: { what: "a test in the wrong unit's slot: slider/__tests__ tests only the dock (L5.2)", expect: ["E7"], overlay: () => ({
        [`${C}slider/__tests__/dock-plant.test.ts`]: `import { describe, it, expect } from "vitest";\nimport { GlassDock } from "../../dock";\ndescribe("d", () => it("x", () => expect(GlassDock).toBeTruthy()));\n`,
    }) },
    "P-carve": { what: "the menu carve undone: menu/items/DropdownMenuItem.vue back at the menu root, importers re-pointed (L7.2)", expect: ["E3N", "E2"], overlay: () => {
        const from = `${C}menu/items/DropdownMenuItem.vue`;
        const ov = { [from]: null, [`${C}menu/DropdownMenuItem.vue`]: read(from).replaceAll('from "../', 'from "./').replaceAll("from '../", "from './") };
        for (const f of listUnder(`${C}menu`)) if (f !== from && /\.(ts|vue)$/.test(f) && read(f).includes("DropdownMenuItem.vue")) {
            const rel = f.startsWith(`${C}menu/items/`) ? "../DropdownMenuItem.vue" : "./DropdownMenuItem.vue";
            ov[f] = read(f).replace(/["'][./]*(items\/)?DropdownMenuItem\.vue["']/g, `"${rel}"`);
        }
        return ov;
    } },
    "P-css-carve": { what: "the style carve undone: glass/transitions/dissolve.css back at styles/glass/, the aggregator re-pointed (L7.2)", expect: ["E3N"], overlay: () => {
        const from = "src/styles/glass/transitions/dissolve.css";
        const agg = listUnder("src/styles").find((f) => f.endsWith(".css") && read(f).includes("glass/transitions/dissolve.css"));
        return { [from]: null, "src/styles/glass/dissolve.css": read(from).replaceAll('"../../', '"../'), [agg]: read(agg).replace("glass/transitions/dissolve.css", "glass/dissolve.css") };
    } },
    "P12-r6": { what: "one symbol on two doors: slider's entry re-exports GlassDock (L4.7, R-6)", expect: ["E5"], overlay: () => ({
        [`${C}slider/index.ts`]: `${read(`${C}slider/index.ts`)}export { GlassDock } from "../dock";\n`,
    }) },
    "P11-demo": { what: "a demo story imports a dock composable past the door (L4.5, R-10)", expect: ["E6"], overlay: () => {
        const story = "demo/stories/dock/overview.vue";
        return { [story]: inScript(story, `import { useDockSpring } from "@glass/components/dock/composables/useDockSpring";\nvoid useDockSpring;`) };
    } },
    P13: { what: "a single-subject test left in the harness (L5.2)", expect: ["E7"], overlay: () => ({
        "tests/components/badge-plant.test.ts": `import { describe, it, expect } from "vitest";\nimport { Badge } from "../../src/components/badge";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n`,
    }) },
};

const dir = mkdtempSync(join(tmpdir(), "g-plants-"));
function judge(overlay) {
    const f = join(dir, "overlay.json");
    writeFileSync(f, JSON.stringify(overlay));
    let out;
    try { out = execFileSync("node", [GATE, "--root", root, "--json", "-", ...(overlay ? ["--overlay", f] : [])], { encoding: "utf8", maxBuffer: 1 << 28 }); }
    catch (e) { out = e.stdout; }
    return JSON.parse(out);
}
const base = judge({});
const results = [];
for (const [id, p] of Object.entries(plants)) {
    const ov = p.overlay();
    const r = judge(ov);
    const rose = Object.keys(r.counts).filter((k) => r.counts[k] > base.counts[k]);
    const lines = Object.fromEntries(rose.map((k) => [k, r.V[k].filter((l) => !base.V[k].includes(l)).slice(0, 4)]));
    const row = { id, what: p.what, expect: p.expect, rose, bites: p.expect.every((k) => rose.includes(k)), lines };
    if (id === "P07a") {
        const L = await import(join(root, "scripts/structure/eponym/index.mjs"));
        const ts = createRequire(join(root, "package.json"))("typescript");
        const ctx = L.context(root, { overlay: ov });
        const s2 = L.stage2(ctx, { ts, units: [`${C}dock`] });
        const Lx = s2.layouts.find((x) => x.U === `${C}dock`);
        row.wiring = [...Lx.wiring].filter(([, n]) => n >= 3).map(([f, n]) => `${f} (${n} registrations)`);
        row.registeredOwners = ["DockSeparator", "DockTrigger", "DockControl"].map((s) => `${s}.vue owned by ${(typeof Lx.owner === "function" ? Lx.owner(`${C}dock/${s}.vue`) : Lx.owner.get(`${C}dock/${s}.vue`)) ?? "?"}`);
        row.bites = row.wiring.length === 1;
    }
    results.push(row);
    console.log(`${row.bites ? "BITES" : "MISSES"} ${id} rose ${rose.join(",") || "-"}${row.wiring ? ` wiring ${row.wiring.join("; ")}` : ""}`);
}
writeFileSync(resolve(opt("--out")), `${JSON.stringify({ base: base.counts, results }, null, 1)}\n`);
