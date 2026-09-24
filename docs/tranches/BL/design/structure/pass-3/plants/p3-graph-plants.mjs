#!/usr/bin/env node
// p3-graph-plants.mjs — the in-memory half of the P3 floor battery. Each plant is an
// overlay on a tree (no disk write) and a predicate on what the floor under test reports.
// Run it twice at one commit: against HEAD's floor ("before": each plant must be MISSED)
// and against the P3 floor ("after": each plant must be CAUGHT).
//   node p3-graph-plants.mjs --floor <floor dir> --root <tree>
// The floor dir is loaded dynamically, so the same battery reads either floor.
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
const F = resolve(opt("--floor"));
const { buildGraph, loadDeps } = await import(join(F, "lib/graph.mjs"));
const placement = await import(join(F, "lib/placement.mjs"));
const read = (p) => readFileSync(join(root, p), "utf8");
const append = (p, text) => ({ [p]: `${read(p)}\n${text}\n` });
const inScriptSetup = (p, text) => ({ [p]: read(p).replace(/(<script\b[^>]*setup[^>]*>)/, `$1\n${text}\n`) });

/** placement rows under the floor's own reading, with its anchor when it has one */
const place = (g) => placement.placeAll(g, placement.dirUnits(), { zones: ["src"], anchor: placement.publicationAnchor ? placement.publicationAnchor(g) : null }).rows;
const row = (rows, f) => rows.find((r) => r.file === f) ?? { class: "(absent)" };

const PLANTS = [
    // P3-F1 · FD-1, P3-R1's reading
    {
        id: "F1-a", item: "P3-F1", what: "a sub-component its own family door publishes stays home (R-9's Skeleton, anchored by skeleton/index.ts)",
        overlay: () => ({}),
        check: (g) => { const r = row(place(g), "src/components/skeleton/Skeleton.vue"); return { caught: r.class === "anchored", saw: `${r.class} → ${r.home}` }; },
    },
    {
        id: "F1-b", item: "P3-F1", what: "a hook a kernel entry publishes stays in src/composables (P3-R1(a): publication anchors in the global zone too)",
        overlay: () => ({}),
        check: (g) => { const r = row(place(g), "src/composables/reactive/useTimer.ts"); return { caught: r.class === "anchored" && r.home === "src/composables/reactive", saw: `${r.class} → ${r.home}` }; },
    },
    {
        id: "F1-c", item: "P3-F1", what: "a slot barrel anchors nothing (X-10): dock/composables/index.ts does not keep useDockHold in dock",
        overlay: () => ({}),
        check: (g) => { const rows = place(g); const r = row(rows, "src/components/dock/composables/useDockHold.ts"); const anchored = rows.filter((x) => x.class === "anchored").length; return { caught: r.class === "move" && r.home === "src/components/slider" && anchored > 0, saw: `${r.class} → ${r.home}; ${anchored} anchored rows` }; },
    },
    {
        id: "F1-d", item: "P3-F1", what: "a declared door no entry reaches publishes nothing: search/index.ts does not anchor useFuzzySearch",
        overlay: () => ({}),
        check: (g) => { const rows = place(g); const r = row(rows, "src/composables/search/useFuzzySearch.ts"); const anchored = rows.filter((x) => x.class === "anchored").length; return { caught: r.class === "move" && anchored > 0, saw: `${r.class} → ${r.home}; ${anchored} anchored rows` }; },
    },
    // P3-F3 · src self-name
    {
        id: "F3-a", item: "P3-F3", what: "B-crit I6: Chip.vue imports Badge by the package's own name",
        overlay: () => inScriptSetup("src/components/chip/Chip.vue", `import { Badge as ZzBadge } from "@mkbabb/glass-ui/badge";\nvoid ZzBadge;`),
        check: (g) => { const v = g.violations.find((x) => x.from === "src/components/chip/Chip.vue" && x.kind === "self-name-in-src"); const e = g.edges.find((x) => x.from === "src/components/chip/Chip.vue" && x.via === "self-name"); return { caught: !!v && !e, saw: v ? `violation ${v.kind} → ${v.target}` : e ? `edge ${e.kind}/self-name → ${e.to}` : "nothing" }; },
    },
    {
        id: "F3-b", item: "P3-F3", what: "a self-name CSS @import from a src sheet",
        overlay: () => ({ "src/components/switch/styles.css": `@import "@mkbabb/glass-ui/styles/theme";\n${read("src/components/switch/styles.css")}` }),
        check: (g) => { const v = g.violations.find((x) => x.from === "src/components/switch/styles.css" && x.kind === "self-name-in-src"); return { caught: !!v, saw: v ? `violation ${v.kind}` : "no violation" }; },
    },
    {
        id: "F3-legal", item: "P3-F3", legal: true, what: "legal: the demo imports a door by self-name (R-10) and stays an edge",
        overlay: () => ({ "demo/zz-door.ts": `export { Badge } from "@mkbabb/glass-ui/badge";\n` }),
        check: (g) => { const e = g.edges.find((x) => x.from === "demo/zz-door.ts" && x.via === "self-name"); return { caught: !!e && !g.violations.some((x) => x.from === "demo/zz-door.ts"), saw: e ? `edge → ${e.to}` : "no edge" }; },
    },
    // P3-F4 · the three computed-read census forms (B-crit I32, I32b, I32c)
    ...[
        ["F4-a", "I32", `import { readFileSync } from "node:fs";\nimport { join } from "node:path";\nexport const r = (n: string) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n`],
        ["F4-b", "I32b", "import { readFileSync } from \"node:fs\";\nexport const r = (n: string) => readFileSync(`src/components/${n}/index.ts`, \"utf8\");\n"],
        ["F4-c", "I32c", `import { readFileSync } from "node:fs";\nimport { resolve } from "node:path";\nexport const r = (n: string) => readFileSync(resolve(import.meta.dirname, "../../src/components", n, "index.ts"), "utf8");\n`],
    ].map(([id, form, text]) => ({
        id, item: "P3-F4", what: `B-crit ${form}: a computed read of src/components/<n> is census, with its base`,
        overlay: () => ({ [`tests/unit/zz-${id}.test.ts`]: text }),
        check: (g) => { const c = g.census.filter((x) => x.from === `tests/unit/zz-${id}.test.ts`); const hit = c.find((x) => x.kind === "computed-read" && x.base === "src/components"); return { caught: !!hit, saw: c.length ? c.map((x) => `${x.kind}${x.base ? `@${x.base}` : ""}`).join(", ") : "no census row" }; },
    })),
    {
        id: "F4-d", item: "P3-F4", what: "found by the F5d tree plant: `resolve(root, \"src/styles/theme.css\")` with `root` a parameter is an edge to the file, not a helper body that swallows the literal (vite.utility-emit.ts:85)",
        overlay: () => ({ "scripts/zz-F4-d.mjs": `import { existsSync } from "node:fs";\nimport { resolve } from "node:path";\nexport function emit(root) {\n    const themePath = resolve(root, "src/styles/theme.css");\n    return existsSync(themePath);\n}\n` }),
        check: (g) => { const e = g.edges.find((x) => x.from === "scripts/zz-F4-d.mjs" && x.to === "src/styles/theme.css"); return { caught: !!e && (e.spans?.length ?? 1) > 0, saw: e ? `edge ${e.kind} → ${e.to}` : "no edge (the literal is swallowed)" }; },
    },
    // P3-F7 · FD-3, one slot predicate
    {
        id: "F7-a", item: "P3-F7 (FD-3)", what: "src/styles/ is a unit, not the slot of src: chip's accent-tone.css, loaded only by glass.css, reads move (to src/styles)",
        overlay: () => ({}),
        check: (g) => { const r = row(place(g), "src/components/chip/accent-tone.css"); return { caught: r.class === "move" && r.home === "src/styles", saw: `${r.class} → ${r.home}` }; },
    },
    {
        id: "F7-b", item: "P3-F7 (FD-3)", what: "bounds and placement share the slot predicate (isSlot exported and used by both)",
        overlay: () => ({}),
        check: () => { const b = readFileSync(join(F, "bounds.mjs"), "utf8"); const ok = typeof placement.isSlot === "function" && /import \{ isSlot \} from "\.\/lib\/placement\.mjs"/.test(b) && placement.isSlot("src/components/dock/composables") && !placement.isSlot("src/styles") && !placement.isSlot("src/composables"); return { caught: ok, saw: typeof placement.isSlot === "function" ? "isSlot present" : "two predicates" }; },
    },
    // P3-F8 · FD-7 program patterns, FD-10 YAML
    {
        id: "F8-b", item: "P3-F8 (FD-7)", what: "B-crit L3: the first colocated test (chip/__tests__/chip.test.ts) raises no violation (no ledger-stale)",
        overlay: () => ({ "src/components/chip/__tests__/chip.test.ts": `import { expect, it } from "vitest";\nimport { Chip } from "..";\nit("chip", () => expect(Chip).toBeTruthy());\n` }),
        check: (g) => ({ caught: g.violations.length === 0, saw: g.violations.length ? g.violations.map((v) => `${v.kind} ${v.from} ${v.spec}`).slice(0, 3).join("; ") : "0 violations" }),
    },
    {
        id: "F8-b2", item: "P3-F8 (FD-7, P3-R6)", what: "a demo @source glob over _shared does not scan a colocated test (no css-source edge to it)",
        overlay: () => ({ "src/components/_shared/__tests__/zz.test.ts": `import { expect, it } from "vitest";\nit("zz", () => expect(1).toBe(1));\n`, "demo/demo.css": read("demo/demo.css").replace(`@source "../src/components/**/index.ts";\n`, `@source "../src/components/**/index.ts";\n@source not "../src/**/__tests__";\n`) }),
        check: (g) => { const e = g.edges.filter((x) => x.from === "demo/demo.css" && x.to === "src/components/_shared/__tests__/zz.test.ts"); return { caught: e.length === 0 && g.violations.length === 0, saw: `${e.length} css-source edge(s) to the test; ${g.violations.length} violation(s)${g.violations.length ? ` (${g.violations[0].kind} ${g.violations[0].spec})` : ""}` }; },
    },
    {
        id: "F8-c", item: "P3-F8 (FD-10)", what: "a CI step naming a script that does not exist",
        overlay: () => append(".github/workflows/ci.yml", "            - run: node scripts/zz-gone.mjs"),
        check: (g) => { const v = g.violations.find((x) => x.from === ".github/workflows/ci.yml" && x.edgeKind === "yaml-command"); return { caught: !!v, saw: v ? `violation ${v.kind} ${v.spec}` : "no violation" }; },
    },
    {
        id: "F8-c2", item: "P3-F8 (FD-10)", what: "a CI step naming a package script that does not exist",
        overlay: () => append(".github/workflows/ci.yml", "            - run: npm run zz-gone"),
        check: (g) => { const v = g.violations.find((x) => x.from === ".github/workflows/ci.yml" && x.edgeKind === "yaml-npm-script"); return { caught: !!v, saw: v ? `violation ${v.kind} ${v.target}` : "no violation" }; },
    },
    {
        id: "F8-c3", item: "P3-F8 (FD-10)", what: "a script named only in CI has a reader (R-8's no-reader delete is safe over scripts/)",
        overlay: () => ({ "scripts/zz-ci-only.mjs": "export const x = 1;\n", ...append(".github/workflows/ci.yml", "            - run: node scripts/zz-ci-only.mjs") }),
        check: (g) => { const e = g.edges.find((x) => x.to === "scripts/zz-ci-only.mjs" && x.kind === "yaml-command"); return { caught: !!e, saw: e ? `edge ${e.from}:${e.line}` : "no reader" }; },
    },
];

const deps = loadDeps(root);
const base = buildGraph(root, { deps });
console.log(`floor ${F}\nroot ${root}\nbaseline: ${base.edges.length} edges, ${base.violations.length} violations, ${base.census.length} census`);
let caught = 0;
for (const p of PLANTS) {
    let r;
    try { r = p.check(buildGraph(root, { overlay: p.overlay(), deps })); } catch (e) { r = { caught: false, saw: `threw: ${String(e.message).slice(0, 120)}` }; }
    if (r.caught) caught++;
    console.log(`${r.caught ? "CAUGHT" : "MISSED"}  ${p.id.padEnd(9)} ${p.item.padEnd(22)} ${p.what} — saw: ${r.saw}`);
}
console.log(`\n${caught}/${PLANTS.length} caught`);
