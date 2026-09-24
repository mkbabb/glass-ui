import { readFileSync } from "node:fs"; import { join, resolve } from "node:path"; import { pathToFileURL } from "node:url";
const root = resolve("."); const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal.mjs")));
const { buildGraph } = await import(pathToFileURL(join(root, "docs/tranches/BL/design/structure/floor/lib/graph.mjs")));
const read = (p) => readFileSync(join(root, p), "utf8"); const C = "src/components";
const base = seal(root); const bs = Object.fromEntries(Object.entries(base.V).map(([k, v]) => [k, new Set(v)]));
const run = (id, ov) => { const r = seal(root, { overlay: ov }); const g = Object.fromEntries(Object.entries(r.V).map(([k, v]) => [k, v.filter((x) => !bs[k].has(x))]).filter(([, v]) => v.length)); console.log(id, JSON.stringify(g).slice(0, 700)); };
// I7 full: which B3 lines mention core.css
{ const r = seal(root, { overlay: { "src/styles/index.css": read("src/styles/index.css").replace(/(@import[^\n]*\n)/, `$1@import "../components/dock/styles/core.css";\n`) } }); console.log("I7 core.css lines:", r.V.B3.filter((x) => x.includes("core.css"))); }
// I6 edge
{ const g = buildGraph(root, { overlay: { [`${C}/chip/plantI6.ts`]: 'import { Badge } from "@mkbabb/glass-ui/badge";\nexport const plantI6 = Badge;\n' } }); console.log("I6 edges:", g.edges.filter((e) => e.from.endsWith("plantI6.ts")).map((e) => `${e.kind} -> ${e.to}`)); }
// I32 census
{ const g = buildGraph(root, { overlay: { "tests/unit/plant-walk2.test.ts": 'import { readFileSync } from "node:fs";\nimport { join } from "node:path";\nexport const r = (n: string) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n' } }); console.log("I32 edges:", g.edges.filter((e) => e.from.includes("plant-walk2")).map((e) => `${e.kind} -> ${e.to}`), "census:", g.census.filter((c) => c.from.includes("plant-walk2"))); }
run("I32b readFileSync(`src/components/${n}`)", { "tests/unit/plant-walk3.test.ts": 'import { readFileSync } from "node:fs";\nexport const r = (n: string) => readFileSync(`src/components/${n}/index.ts`, "utf8");\n' });
run("I32c readFileSync(resolve(__dirname,'../../src/components',n))", { "tests/unit/plant-walk4.test.ts": 'import { readFileSync } from "node:fs";\nimport { resolve } from "node:path";\nexport const r = (n: string) => readFileSync(resolve(import.meta.dirname, "../../src/components", n, "index.ts"), "utf8");\n' });
run("L3 correct colocated test", { [`${C}/chip/__tests__/chip.test.ts`]: 'import { Chip } from "..";\nimport { it, expect } from "vitest";\nit("x", () => expect(Chip).toBeTruthy());\n' });
run("L3b colocated test reading a sibling module internal", { [`${C}/chip/__tests__/chip2.test.ts`]: 'import { badgeVariants } from "../../badge/badge";\nimport { it, expect } from "vitest";\nit("x", () => expect(badgeVariants).toBeTruthy());\n' });
run("I35 kernel entry re-exports a unit file via export *", { "src/composables/dom/index.ts": read("src/composables/dom/index.ts") + 'export * from "../../components/slider/useDockHold";\n' });
run("I36 second copy (dual path) of a composable under a new name", { [`${C}/slider/useDockHoldCopy.ts`]: read(`${C}/slider/useDockHold.ts`), [`${C}/slider/plantI36.ts`]: 'import { useDockHold } from "./useDockHoldCopy";\nexport const plantI36 = useDockHold;\n' });
run("I37 constants file in kernel read by one unit", { "src/composables/sliderConstants.ts": "export const SLIDER_K = 3;\n", [`${C}/slider/plantI37.ts`]: 'import { SLIDER_K } from "../../composables/sliderConstants";\nexport const plantI37 = SLIDER_K;\n' });
run("I38 scripts: a module helper in scripts/lib read by one script left in lib", { "scripts/lib/plantOnlyOne.mjs": "export const one = 1;\n", "scripts/regen-spring-tokens.mjs": 'import { one } from "./lib/plantOnlyOne.mjs";\n' + read("scripts/regen-spring-tokens.mjs") });
