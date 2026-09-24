// crit-plants.mjs — plant the frozen intent battery into the worktree one at a time and judge each
// with every EXTANT executable: F-1 (graph), F-3 (entries guard + package compare), F-7 (placement,
// unanchored as the floor ships it), R-5 (bounds.mjs), src value SCCs. Restores every file after each.
//   node crit-plants.mjs <wt> <out.json>
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const W = process.argv[2];
const OUT = process.argv[3];
const F = join(W, "docs/tranches/BL/design/structure/floor");
const { buildGraph, valueSccs } = await import(join(F, "lib/graph.mjs"));
const { dirUnits, placeAll } = await import(join(F, "lib/placement.mjs"));
const { openTree } = await import(join(F, "lib/tree.mjs"));
const { loadRecord, validateRecord, compareToPackage } = await import(join(F, "lib/entries.mjs"));

function judge() {
    const g = buildGraph(W);
    const viol = g.violations.map((v) => `${v.kind} ${v.from}:${v.line ?? ""} ${v.spec ?? ""}`);
    const p = placeAll(g, dirUnits(), { zones: ["src"] });
    const place = p.rows.filter((r) => ["move", "global", "unread"].includes(r.class)).map((r) => `${r.class} ${r.file} <- ${(r.readerUnits ?? []).join(",")}`);
    const sccs = valueSccs(g, "src").map((c) => c.slice().sort().join("|"));
    const tree = openTree(W);
    const rec = loadRecord(tree);
    const guard = validateRecord(rec, tree).map((x) => JSON.stringify(x));
    const cmp = compareToPackage(rec, JSON.parse(readFileSync(join(W, "package.json"), "utf8")));
    const f3 = cmp.exportsByteEqual && cmp.typesVersionsByteEqual ? [] : ["F-3 package drift"];
    execFileSync("node", [join(F, "bounds.mjs"), "--root", W, "--json", join(dirname(OUT), "b.json")], { stdio: "ignore" });
    const b = JSON.parse(readFileSync(join(dirname(OUT), "b.json"), "utf8"));
    const bound = [...b.overDirs.map((d) => `dir ${d.dir} ${d.files}`), ...b.long.map((f) => `file ${f.file} ${f.lines}`)];
    return { "F-1": viol, "F-7": place, scc: sccs, "F-3": [...guard, ...f3], bound };
}
const diff = (a, b) => Object.fromEntries(Object.keys(b).map((k) => [k, b[k].filter((x) => !a[k].includes(x))]).filter(([, v]) => v.length));

const saved = new Map();
const created = [];
function write(p, text) {
    const abs = join(W, p);
    if (existsSync(abs)) { if (!saved.has(p)) saved.set(p, readFileSync(abs, "utf8")); }
    else { created.push(p); mkdirSync(dirname(abs), { recursive: true }); }
    writeFileSync(abs, text);
}
const edit = (p, fn) => write(p, fn(saved.get(p) ?? readFileSync(join(W, p), "utf8")));
const scriptInsert = (src, line) => src.replace(/<script setup lang="ts">\n/, `<script setup lang="ts">\n${line}\n`);
function restore() {
    for (const [p, t] of saved) writeFileSync(join(W, p), t);
    for (const p of created.reverse()) rmSync(join(W, p), { recursive: true, force: true });
    saved.clear(); created.length = 0;
}
const BADGE = "src/components/badge/Badge.vue";
const tsFile = (name) => `export function ${name}() { return 1; }\n`;
const plants = {
    I01: () => { write("src/composables/dom/useBadgePulse.ts", tsFile("useBadgePulse")); edit(BADGE, (s) => scriptInsert(s, 'import { useBadgePulse } from "../../composables/dom/useBadgePulse";\nuseBadgePulse();')); },
    I02: () => { write("src/components/slider/useBadgeTone.ts", tsFile("useBadgeTone")); edit(BADGE, (s) => scriptInsert(s, 'import { useBadgeTone } from "../slider/useBadgeTone";\nuseBadgeTone();')); },
    I03: () => edit(BADGE, (s) => scriptInsert(s, 'import { useDockHold } from "../dock/composables/useDockHold";\nvoid useDockHold;')),
    I04: () => edit(BADGE, (s) => scriptInsert(s, 'import { Button } from "@mkbabb/glass-ui/button";\nvoid Button;')),
    I05: () => { write("src/components/badge/styles.css", '@import "../card/scroll.css";\n'); edit(BADGE, (s) => scriptInsert(s, 'import "./styles.css";')); },
    I06: () => { let imp = ""; for (let i = 1; i <= 13; i++) { const n = String(i).padStart(2, "0"); write(`src/components/badge/part${n}.ts`, `export const p${n} = ${i};\n`); imp += `import { p${n} } from "./part${n}";\nvoid p${n};\n`; } edit(BADGE, (s) => scriptInsert(s, imp)); },
    I07: () => { let t = ""; for (let i = 1; i <= 510; i++) t += `export const b${String(i).padStart(3, "0")} = ${i};\n`; write("src/components/badge/badgeTable.ts", t); edit(BADGE, (s) => scriptInsert(s, 'import { b001 } from "./badgeTable";\nvoid b001;')); },
    I08: () => write("tests/badge-only.test.ts", 'import { describe, it, expect } from "vitest";\nimport { Badge } from "../src/components/badge";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n'),
    I09: () => write("src/components/button/__tests__/badge.test.ts", 'import { describe, it, expect } from "vitest";\nimport { Badge } from "../../badge";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n'),
    I10: () => edit("src/components/chip/index.ts", (s) => s + 'export { Badge } from "../badge";\n'),
    I11: () => { write("src/components/badge/helpers/utils.ts", tsFile("badgeUtil")); edit(BADGE, (s) => scriptInsert(s, 'import { badgeUtil } from "./helpers/utils";\nbadgeUtil();')); },
    I12: () => edit(BADGE, (s) => scriptInsert(s, 'import { defineAsyncComponent } from "vue";\nconst Fancy = defineAsyncComponent(() => import("./BadgeFancy.vue").catch(() => import("./Badge.vue")));\nvoid Fancy;')),
    I13: () => edit("src/components/badge/index.ts", (s) => s + 'export { default as BadgeCompat } from "./Badge.vue";\n'),
    I14: () => { write("src/components/skeleton/CardSkeleton.vue", "<template><div /></template>\n"); edit("src/components/card/Card.vue", (s) => scriptInsert(s, 'import CardSkeleton from "../skeleton/CardSkeleton.vue";\nvoid CardSkeleton;')); },
    I15: () => edit("src/composables/dom/useBreakpoint.ts", (s) => 'import { Button } from "../../components/button";\nvoid Button;\n' + s),
    I16: () => edit("src/styles/tokens.css", (s) => '@import "../components/button/styles.css";\n' + s),
    I17: () => edit("src/styles/glass.css", (s) => s + "\n.bl-plant { color: red; }\n"),
    I18: () => edit("src/components/skeleton/index.ts", (s) => s + "export const SKELETON_PLANT = 3;\n"),
    I19: () => edit(BADGE, (s) => scriptInsert(s, 'import { Button } from "../../index";\nvoid Button;')),
    I20: () => { write("src/composables/dom/cycA.ts", 'import { b } from "./cycB";\nexport const a = () => b();\n'); write("src/composables/dom/cycB.ts", 'import { a } from "./cycA";\nexport const b = (): number => (Math.random() > 2 ? a() : 1);\n'); edit("src/composables/dom/useBreakpoint.ts", (s) => 'import { a as cycA } from "./cycA";\nvoid cycA;\n' + s); },
    I21: () => write("src/components/badge/orphan.ts", tsFile("orphan")),
    I22: () => edit("scripts/profile-bundle.mjs", (s) => (s.startsWith("#!") ? s.replace(/\n/, '\nimport "./comment-census.mjs";\n') : 'import "./comment-census.mjs";\n' + s)),
    I23: () => { write("scripts/plant-a.mjs", "console.log(1);\n"); write("scripts/plant-b.mjs", "console.log(2);\n"); edit("package.json", (s) => s.replace('"scripts": {\n', '"scripts": {\n        "plant:a": "node scripts/plant-a.mjs",\n        "plant:b": "node scripts/plant-b.mjs",\n')); },
    I24: () => { write("src/misc.ts", tsFile("misc")); edit("src/components/button/Button.vue", (s) => scriptInsert(s, 'import { misc } from "../../misc";\nmisc();')); },
    I25: () => { write("src/components/card/CardHeaderIcon.vue", "<template><i /></template>\n"); edit("src/components/card/CardHeader.vue", (s) => scriptInsert(s, 'import CardHeaderIcon from "./CardHeaderIcon.vue";\nvoid CardHeaderIcon;')); },
    I26: () => { write("src/components/dock/composables/useBadgeX.ts", tsFile("useBadgeX")); edit(BADGE, (s) => scriptInsert(s, 'import { useBadgeX } from "../dock/composables/useBadgeX";\nuseBadgeX();')); },
    I27: () => edit("demo/stories/data/search.vue", (s) => scriptInsert(s, 'import { useDockHold } from "@glass/components/dock/composables/useDockHold";\nvoid useDockHold;')),
    I28: () => { write("src/composables/color/badgeConstants.ts", "export const BADGE_K = 2;\n"); edit(BADGE, (s) => scriptInsert(s, 'import { BADGE_K } from "../../composables/color/badgeConstants";\nvoid BADGE_K;')); },
    I29: () => write("src/components/badge/tests/badge.test.ts", 'import { describe, it, expect } from "vitest";\nimport { Badge } from "..";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n'),
    I30: () => { const d = "demo/composables/plantHelper.ts"; write(d, tsFile("plantHelper")); edit(BADGE, (s) => scriptInsert(s, 'import { plantHelper } from "../../../demo/composables/plantHelper";\nplantHelper();')); },
    L1: () => edit(BADGE, (s) => scriptInsert(s, 'import { useBreakpoint } from "../../composables/dom";\nvoid useBreakpoint;')),
    L2: () => write("src/components/badge/__tests__/Badge.test.ts", 'import { describe, it, expect } from "vitest";\nimport { Badge } from "..";\ndescribe("b", () => it("x", () => expect(Badge).toBeTruthy()));\n'),
    L3: () => { write("src/composables/dom/useShared2.ts", tsFile("useShared2")); edit(BADGE, (s) => scriptInsert(s, 'import { useShared2 } from "../../composables/dom/useShared2";\nuseShared2();')); edit("src/components/button/Button.vue", (s) => scriptInsert(s, 'import { useShared2 } from "../../composables/dom/useShared2";\nuseShared2();')); },
};
const base = judge();
const res = { base: Object.fromEntries(Object.entries(base).map(([k, v]) => [k, v.length])), plants: {} };
for (const [id, fn] of Object.entries(plants)) {
    try { fn(); res.plants[id] = diff(base, judge()); } catch (e) { res.plants[id] = { error: String(e).slice(0, 300) }; }
    restore();
    console.log(id, JSON.stringify(res.plants[id]).slice(0, 400));
}
const after = judge();
res.restoredClean = JSON.stringify(after) === JSON.stringify(base);
writeFileSync(OUT, JSON.stringify(res, null, 1));
console.log("base", JSON.stringify(res.base), "restoredClean", res.restoredClean);
