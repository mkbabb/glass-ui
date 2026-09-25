// plants.mjs — critique-B intent battery, pass 3. Written before reading B-kit / B-proto / xj docs.
// plants(ctx) → [{ id, item, expect, mark, what, files: { path: content } }]
//   expect: a clause id ("B10"), "*" (any clause naming the mark), or null (legal: must gain nothing).
// ctx = { find(basename, hint?) → repo path, read(path), exists(path), ls(dir), rel(fromFile, toPath) }
import { dirname, basename } from "node:path";

const long = (k) => Array.from({ length: k }, (_, i) => `export const kN${i} = ${i};`).join("\n") + "\n";
const SFC = '<script setup lang="ts">\nconst a = 1;\n</script>\n<template><div class="plant-sfc">{{ a }}</div></template>\n';
const noExt = (p) => p.replace(/\.(ts|mts)$/, "");

export function plants(ctx) {
    const { find, read, exists, ls, rel } = ctx;
    const dirOfComp = (sfc) => dirname(find(sfc));
    const CHIP = dirOfComp("Chip.vue"), BADGE = dirOfComp("Badge.vue"), SLIDER = dirOfComp("Slider.vue");
    const DOCK = dirOfComp("GlassDock.vue");
    const door = (d) => `${d}/index.ts`;
    const imp = (from, to) => { const r = noExt(rel(from, to)); return r.endsWith("/index") ? r.slice(0, -6) || "." : r; };
    const chipDoor = door(CHIP), badgeDoor = door(BADGE), sliderDoor = door(SLIDER), dockDoor = door(DOCK);
    const dockCss = exists(`${DOCK}/index.css`) ? `${DOCK}/index.css` : null;
    const sliderCss = ls(SLIDER).filter((f) => f.endsWith(".css")).map((f) => `${SLIDER}/${f}`)[0];
    const dockPrivateCss = find("core.css", "dock");
    const dockSearch = find("useDockSearch.ts");
    const dockConstants = find("constants.ts", "dock");
    const breakpoint = find("useBreakpoint.ts");
    const DOM = dirname(breakpoint);
    const chipVariants = find("chipVariants.ts");
    const minify = find("minify-css.mjs");
    const SLIB = dirname(minify);
    const SSTRUCT = dirname(find("graph.mjs", "scripts/structure"));
    const profile = find("profile-bundle.mjs");
    const verifyTypes = find("verify-export-types.mjs");
    const regenSpring = find("regen-spring-tokens.mjs");
    const glassDoor = exists("src/styles/glass/index.css") ? "src/styles/glass/index.css" : find("glass.css", "src/styles");
    const ciYml = ".github/workflows/ci.yml";
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });

    // ---- shared floor items reached through the gate ----
    add("I6", "S-06/B-03", "*", "plantI6", "self-name import of the package from src",
        { [`${CHIP}/plantI6.ts`]: 'import { Badge } from "@mkbabb/glass-ui/badge";\nexport const plantI6 = Badge;\n' });
    add("I32", "S-07", "*", "plant-walk-a", "join(process.cwd(), 'src/components/' + n) read in tests",
        { "tests/plant-walk-a.test.ts": 'import { readFileSync } from "node:fs";\nimport { join } from "node:path";\nexport const r = (n: string) => readFileSync(join(process.cwd(), "src/components/" + n), "utf8");\n' });
    add("I32b", "S-07", "*", "plant-walk-b", "template-literal src path read in tests",
        { "tests/plant-walk-b.test.ts": 'import { readFileSync } from "node:fs";\nexport const r = (n: string) => readFileSync(`src/components/${n}/index.ts`, "utf8");\n' });
    add("I32c", "S-07", "*", "plant-walk-c", "resolve(import.meta.dirname, '..', 'src/components', n) read in tests",
        { "tests/plant-walk-c.test.ts": 'import { readFileSync } from "node:fs";\nimport { resolve } from "node:path";\nexport const r = (n: string) => readFileSync(resolve(import.meta.dirname, "../src/components", n, "index.ts"), "utf8");\n' });

    // ---- B-04: R-3 tests with their subject ----
    add("I11", "B-04", "*", "plant-chip-only", "single-subject (chip) test left in tests/",
        { "tests/plant-chip-only.test.ts": `import { Chip } from "../${noExt(chipDoor).replace(/\/index$/, "")}";\nimport { it, expect } from "vitest";\nit("x", () => expect(Chip).toBeTruthy());\n` });
    add("I12", "B-04", "*", "plant-slider-only", "test in chip/__tests__ whose one subject is slider",
        { [`${CHIP}/__tests__/plant-slider-only.test.ts`]: `import { Slider } from "${imp(`${CHIP}/__tests__/x.ts`, sliderDoor)}";\nimport { it, expect } from "vitest";\nit("x", () => expect(Slider).toBeTruthy());\n` });
    add("L2", "B-04", null, "plant-chip-legal", "legal: chip test in chip/__tests__ reading its own module",
        { [`${CHIP}/__tests__/plant-chip-legal.test.ts`]: `import { Chip } from "..";\nimport { it, expect } from "vitest";\nit("x", () => expect(Chip).toBeTruthy());\n` });

    // ---- B-05: scripts-zone placement ----
    add("I38", "B-05", "B10", "plantI38", "a scripts/lib file read only by the structure module",
        { [`${SLIB}/plantI38.mjs`]: "export const plantI38 = 1;\n",
          [`${SSTRUCT}/plantI38r.mjs`]: `import { plantI38 } from "${rel(`${SSTRUCT}/x.mjs`, `${SLIB}/plantI38.mjs`)}";\nexport const plantI38r = plantI38;\n` });

    // ---- B-06: bins from CI YAML ----
    const ci = read(ciYml);
    const ciPlant = ci.replace(/(\n\s*steps:\s*\n)/, `$1            - run: node scripts/plant-ci-bin.mjs\n`);
    add("Y1", "B-06", "B13", "plant-ci-bin", "a bin named only in CI YAML, imported by another bin",
        { [ciYml]: ciPlant, "scripts/plant-ci-bin.mjs": "export const ciBin = 1;\n",
          [regenSpring]: `import "${rel(regenSpring, "scripts/plant-ci-bin.mjs")}";\n` + read(regenSpring) });
    add("LY", "B-06", null, "plant-ci-bin", "legal: a CI-only bin, no importer",
        { [ciYml]: ciPlant, "scripts/plant-ci-bin.mjs": "export const ciBin = 1;\n" });

    // ---- B-07: names ----
    for (const [id, seg] of [["N-utils", "utils"], ["N-v2", "v2"], ["N-misc", "misc"]]) {
        add(id, "B-07", "B15", `${DOCK}/${seg}`, `placeholder module name ${seg}`,
            { [`${DOCK}/${seg}/x.ts`]: "export const x = 1;\n", [`${DOCK}/${seg}/index.ts`]: 'export { x } from "./x";\n',
              [`${DOCK}/plant${id.slice(2)}.ts`]: `import { x } from "./${seg}";\nexport const p = x;\n` });
    }
    add("N-use", "B-07", "B15", "use.ts", "file named only `use.ts`",
        { [`${SLIDER}/use.ts`]: "export const useIt = () => 1;\n", [`${SLIDER}/plantNuse.ts`]: 'import { useIt } from "./use";\nexport const p = useIt;\n' });
    add("N-foreign", "B-07", "B15", "useDockHold", "slider file named for another unit (slider/useDockHold.ts)",
        { [`${SLIDER}/useDockHold.ts`]: "export const useDockHoldX = () => 1;\n", [`${SLIDER}/plantNforeign.ts`]: 'import { useDockHoldX } from "./useDockHold";\nexport const p = useDockHoldX;\n' });

    // ---- B-02 / S-02: kernel entry re-exports a unit file ----
    add("K1", "B-02", "B8", "slider", "kernel door re-exports a unit file",
        { [door(DOM)]: read(door(DOM)) + `export { Slider as PlantSlider } from "${imp(door(DOM), sliderDoor)}";\n` });

    // ---- B-08: CSS placement (P3-R2) ----
    if (sliderCss) add("C1", "B-08", "B10", "slider-thumb-plant.css", "style-kernel sheet loaded only by slider",
        { "src/styles/slider-thumb-plant.css": ".slider-thumb-plant{color:red}\n",
          [sliderCss]: `@import "${rel(sliderCss, "src/styles/slider-thumb-plant.css")}";\n` + read(sliderCss) });

    // ---- B-09: style kernel doors ----
    add("G1", "B-09", "B14", basename(dirname(glassDoor)) === "glass" ? "glass/index.css" : "glass.css", "a rule inside the glass CSS door",
        { [glassDoor]: read(glassDoor) + ".plant-rule{color:red}\n" });
    add("G2", "B-09", "B7", "plantdir", "doorless dir under styles/glass, imported by the glass door",
        { "src/styles/glass/plantdir/a.css": ".plant-a{color:red}\n",
          [glassDoor]: read(glassDoor).replace(/(@import[^\n]*\n)(?![\s\S]*@import)/, `$1@import "${rel(glassDoor, "src/styles/glass/plantdir/a.css")}";\n`) });

    // ---- B-01 teeth: each clause must be able to go non-zero ----
    add("T-B0", "B-01", "B0", "gone.css", "CSS import of a missing sheet (masked fallback)",
        sliderCss ? { [sliderCss]: read(sliderCss) + '@import "./gone.css";\n' } : {});
    add("T-B1", "B-01", "B1", "plantTB1", "slider deep-imports a dock internal past dock's door",
        { [`${SLIDER}/plantTB1.ts`]: `import * as m from "${imp(`${SLIDER}/x.ts`, dockSearch)}";\nexport const plantTB1 = m;\n` });
    add("T-B2", "B-01", "B2", "plantTB2", "demo imports a src internal past a door",
        { "demo/plantTB2.ts": `import * as m from "${imp("demo/x.ts", chipVariants)}";\nexport const plantTB2 = m;\n` });
    if (sliderCss && dockPrivateCss) add("T-B3", "B-01", "B3", basename(dockPrivateCss), "slider sheet imports a private dock sheet",
        { [sliderCss]: `@import "${rel(sliderCss, dockPrivateCss)}";\n` + read(sliderCss) });
    add("T-B4", "B-01", "B4", "plantTB4", "sibling cycle chip <-> badge through doors",
        { [`${CHIP}/plantTB4a.ts`]: `import { Badge } from "${imp(`${CHIP}/x.ts`, badgeDoor)}";\nexport const plantTB4a = Badge;\n`,
          [`${BADGE}/plantTB4b.ts`]: `import { Chip } from "${imp(`${BADGE}/x.ts`, chipDoor)}";\nexport const plantTB4b = Chip;\n` });
    add("T-B5", "B-01", "B5", "composables/hold", "dir inside a kind slot",
        { [`${DOCK}/composables/hold/useHold.ts`]: "export const useHold = 1;\n",
          [`${DOCK}/plantTB5.ts`]: 'import { useHold } from "./composables/hold/useHold";\nexport const plantTB5 = useHold;\n' });
    add("T-B6", "B-01", "B6", CHIP, "13+ direct files in chip",
        Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`${CHIP}/plantTB6_${i}.ts`, `export const p${i} = ${i};\n`])));
    add("T-B6b", "B-01", "B6", "chipVariants.ts", "hand-written file over 500 lines",
        { [chipVariants]: read(chipVariants) + long(520) });
    add("T-B7", "B-01", "B7", "chip/extra", "doorless code dir deep-imported",
        { [`${CHIP}/extra/x.ts`]: "export const x = 1;\n", [`${CHIP}/plantTB7.ts`]: 'import { x } from "./extra/x";\nexport const plantTB7 = x;\n' });
    add("T-B8", "B-01", "B8", basename(breakpoint), "kernel type-imports a unit",
        { [breakpoint]: `import type * as Dock from "${imp(breakpoint, dockDoor)}";\nexport type PlantDock = typeof Dock;\n` + read(breakpoint) });
    add("T-B8b", "B-01", "B8", "plantTB8b", "src reads demo",
        { [`${CHIP}/plantTB8b.ts`]: `import * as m from "${rel(`${CHIP}/x.ts`, "demo/router")}";\nexport const plantTB8b = m;\n` });
    add("T-B9", "B-01", "B9", "Chip", "dual door: badge door republishes Chip",
        { [badgeDoor]: read(badgeDoor) + `export { Chip } from "${imp(badgeDoor, chipDoor)}";\n` });
    add("T-B10", "B-01", "B10", "useSliderOnly", "kernel composable read only by slider",
        { [`${DOM}/useSliderOnly.ts`]: "export function useSliderOnly(){ return 1; }\n",
          [`${SLIDER}/plantTB10.ts`]: `import { useSliderOnly } from "${imp(`${SLIDER}/x.ts`, `${DOM}/useSliderOnly.ts`)}";\nexport const plantTB10 = useSliderOnly;\n` });
    add("T-B11", "B-01", "B11", "Pill", "alias name on a door",
        { [chipDoor]: read(chipDoor) + 'export { default as Pill } from "./Chip.vue";\n' });
    if (dockConstants) add("T-B12", "B-01", "B12", "constants.legacy", "legacy relay",
        { [`${dirname(dockConstants)}/constants.legacy.ts`]: 'export * from "./constants";\n',
          [`${dirname(dockConstants)}/plantTB12.ts`]: 'import * as k from "./constants.legacy";\nexport const plantTB12 = k;\n' });
    add("T-B13", "B-01", "B13", basename(verifyTypes), "bin imports a bin",
        { [profile]: `import "${rel(profile, verifyTypes)}";\n` + read(profile) });
    add("T-B14", "B-01", "B14", "index.ts", "code in a JS door",
        { [chipDoor]: read(chipDoor) + 'export const CHIP_PLANT = "x";\n' });
    if (dockCss) add("T-B14c", "B-01", "B14", "index.css", "rule in a CSS door",
        { [dockCss]: read(dockCss) + ".plant-x{color:red}\n" });
    add("T-B15", "B-01", "B15", "part-1", "part-1 module",
        { [`${DOCK}/part-1/x.ts`]: "export const x = 1;\n", [`${DOCK}/part-1/index.ts`]: 'export { x } from "./x";\n',
          [`${DOCK}/plantTB15.ts`]: 'import { x } from "./part-1";\nexport const p = x;\n' });

    // ---- legal ----
    add("L1", "legal", null, "plantL1", "slider reads dock through its door",
        { [`${SLIDER}/plantL1.ts`]: `import * as D from "${imp(`${SLIDER}/x.ts`, dockDoor)}";\nexport const plantL1 = D;\n` });
    add("LC", "legal", null, "useSliderLocal", "slider-local composable read only by slider",
        { [`${SLIDER}/useSliderLocal.ts`]: "export const useSliderLocal = () => 1;\n",
          [`${SLIDER}/plantLC.ts`]: 'import { useSliderLocal } from "./useSliderLocal";\nexport const plantLC = useSliderLocal;\n' });
    return P;
}
