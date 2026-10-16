#!/usr/bin/env node
// plants-p6.mjs — pass 6's plant battery, run against the migrated tree through the landed gate's
// overlay (nothing is written to the tree). Each plant is a set of in-memory files; the battery
// reads the clauses the gate reports with the plant against the clean tree's verdict, and a
// plant passes when exactly the clauses it names go red (a legal plant names none).
//   node tools/plants-p6.mjs <migrated tree> <out.json>
// Plants:
//   X5    the S-14 forms (P5 §8.3) in each of the five zones: a named loader called with an
//         argument, a swallowed read through a reader the file defines, the promise .catch
//         form, a swallowed fs/promises read, and pass 5's shapes (ternary, positive guard,
//         catch-return, empty catch, then(ok, h), a bound loader) — B17; the loader's
//         `import(n)` is a computed specifier, which B0 reads as well
//   N*    placeholder and slice names (part-1, GlassDock-2, GlassDock2, GlassDockPart2, bs11,
//         GlassDockSplit) and a numbered test stem (category2.spec.ts) — B15
//   PW    a Playwright test file the program does not collect (a page spec saved as .ts beside
//         its unit, the chip readback renamed out of the *.visual.ts pattern) — B16
//   PWL   a legal page-driving spec: sortable-list's own *.visual.ts opening its story — none
//   SUBJ  a page-driving spec in tests-visual whose one story drives one unit — B16
//   B2    a demo import of a private module — B2; a demo import of a published name — none
//   KT    a colocated test in the kernel container's slot that reads one of its modules
//         (_shared/overlay) — B16; one that reads only its own files — none
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [rootArg, out] = process.argv.slice(2);
const root = resolve(rootArg);
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href); // pass 8: the clauses are read through the door; seal.mjs is the CLI

const x5 = `import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
function readJson(p: string) { return JSON.parse(readFileSync(p, "utf8")); }
const loadText = (p: string) => readFileSync(p, "utf8");
const loadMod = (n: string) => import(n);
export function namedLoader(p: string) { try { return loadText(p); } catch { return ""; } }
export function definedReader(p: string) { try { return readJson(p); } catch { return null; } }
export function promiseCatch(p: string) { return readFile(p, "utf8").catch(() => ""); }
export function loaderArg(n: string) { return loadMod(n).catch(() => null); }
export function ternParam(p: string) { return existsSync(p) ? readFileSync(p, "utf8") : ""; }
export function posParam(p: string, acc: string) { if (existsSync(p)) { return readFileSync(p, "utf8"); } return acc; }
export function catchRetParam(p: string) { try { return readFileSync(p, "utf8"); } catch { return null; } }
export function catchEmptyParam(p: string) { let t = "x"; try { t = readFileSync(p, "utf8"); } catch {} return t; }
export function thenLit() { return import("node:path").then((m) => m, () => null); }
`;
const v = (f) => `export const ${f} = 1;\n`;
const pwSpec = (route) => `import { expect, test } from "@playwright/test";\ntest("planted", async ({ page }) => { await page.goto("${route}"); await expect(page.locator("body")).toBeVisible(); });\n`;
const plants = [
    ...["src/components/button/s14plant.ts", "demo/composables/s14plant.ts", "tests/harness/s14plant.ts", "tests-visual/paint/s14plant.ts", "scripts/minify/s14plant.ts"].map((p) => ({ id: `X5 ${p}`, files: { [p]: x5 }, expect: ["B0", "B17"] })),
    ...[["part-1", "src/components/button/part-1.ts"], ["GlassDock-2", "src/components/button/GlassDock-2.ts"], ["GlassDock2", "src/components/button/GlassDock2.ts"], ["GlassDockPart2", "src/components/button/GlassDockPart2.ts"], ["bs11", "src/components/button/bs11.ts"], ["GlassDockSplit", "src/components/button/GlassDockSplit.ts"]]
        .map(([n, p]) => ({ id: `N ${n}`, files: { [p]: v("planted") }, expect: ["B15"] })),
    { id: "N test stem category2.spec.ts", files: { "tests-visual/storybook/configurator/category2.spec.ts": `import { expect, test } from "@playwright/test";\ntest("planted", () => expect(1).toBe(1));\n` }, expect: ["B15"] },
    { id: "PW orphan: a page spec saved as .ts", files: { "src/components/sortable-list/__tests__/sortable-orphan.ts": pwSpec("/data/sortable-list") }, expect: ["B16"] },
    { id: "PW orphan: the chip readback renamed out of *.visual.ts", files: { "src/components/chip/__tests__/chip-accent-band.visual.ts": null, "src/components/chip/__tests__/chip-accent-band.ts": "@@chip" }, expect: ["B16"] },
    { id: "PWL legal page-driving *.visual.ts", files: { "src/components/sortable-list/__tests__/sortable-planted.visual.ts": pwSpec("/data/sortable-list") }, expect: [] },
    { id: "SUBJ a one-unit page spec in tests-visual", files: { "tests-visual/components/collections/sortable-planted.spec.ts": pwSpec("/data/sortable-list") }, expect: ["B16"] },
    { id: "B2 demo reads a private module", files: { "demo/composables/b2plant.ts": `import { useHoldToken } from "@glass/components/_shared/overlay";\nexport const k = useHoldToken;\n` }, expect: ["B2"] },
    { id: "B2L demo reads a published name", files: { "demo/composables/b2legal.ts": `import { useDockState } from "@glass/components/dock";\nexport const k = useDockState;\n` }, expect: [] },
    { id: "KT kernel-slot test reads a _shared module", files: { "src/components/_shared/__tests__/overlay-plant.test.ts": `import { it, expect } from "vitest";\nimport { useHoldToken } from "../overlay";\nit("p", () => expect(useHoldToken).toBeTypeOf("function"));\n` }, expect: ["B16"] },
    { id: "KTL kernel-slot test reads its own files", files: { "src/components/_shared/__tests__/axes-plant.test.ts": `import { it, expect } from "vitest";\nimport { cn } from "../class-names";\nit("p", () => expect(cn("a")).toBe("a"));\n` }, expect: [] },
];

const clean = seal(root, {}).counts;
const results = [];
for (const p of plants) {
    const files = { ...p.files };
    for (const [k, t] of Object.entries(files)) if (t === "@@chip") files[k] = (await import("node:fs")).readFileSync(join(root, "src/components/chip/__tests__/chip-accent-band.visual.ts"), "utf8");
    let counts, error = null;
    try { counts = seal(root, { overlay: files }).counts; } catch (e) { error = e.message; }
    const red = counts ? Object.keys(counts).filter((k) => counts[k] > (clean[k] ?? 0)) : [];
    const ok = !error && red.length === p.expect.length && p.expect.every((k) => red.includes(k));
    results.push({ id: p.id, expect: p.expect, red, ok, ...(error ? { error } : {}) });
    console.log(`${ok ? "PASS" : "FAIL"} ${p.id}: expect [${p.expect.join(",")}] red [${red.join(",")}]${error ? ` error ${error}` : ""}`);
}
const summary = { clean, plants: results.length, passed: results.filter((r) => r.ok).length, results };
writeFileSync(out, `${JSON.stringify(summary, null, 1)}\n`);
console.log(`battery ${summary.passed}/${summary.plants}`);
