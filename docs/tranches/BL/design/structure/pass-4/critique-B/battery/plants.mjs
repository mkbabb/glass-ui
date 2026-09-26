// plants.mjs · critique-B pass 4 · seal-judged plants. Written and hashed BEFORE reading pass-4/B-kit or B-proto.md.
// plants(ctx) → [{ id, item, expect, mark, what, files: { path: text } } | { id, item, skip: reason }]
//   expect: a clause id, "*" (any gained line naming `mark`), or null (legal probe: must gain nothing).
// ctx = { find(base, hint?), findAll(pred), read(p), exists(p), ls(dir), dirs(dir), rel(fromFile, toPath) }
// Every target is discovered on the tree under judgement, so the battery does not assume the route's layout.
import { dirname, basename } from "node:path";

const noExt = (p) => p.replace(/\.(ts|mts|mjs|js)$/, "");
const vt = 'import { it, expect } from "vitest";\n';

export function plants(ctx) {
    const { find, findAll, read, exists, ls, dirs, rel } = ctx;
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    const skip = (id, item, why) => P.push({ id, item, skip: why });
    const spec = (from, to) => { let r = noExt(rel(from, to)); if (r.endsWith("/index")) r = r.slice(0, -6) || "."; return r; };
    const tryFind = (b, h) => { try { return find(b, h); } catch { return null; } };
    const door = (d) => (exists(`${d}/index.ts`) ? `${d}/index.ts` : null);

    const CHIP = dirname(find("Chip.vue")), BADGE = dirname(find("Badge.vue")), SLIDER = dirname(find("Slider.vue"));
    const DOCK = dirname(find("GlassDock.vue"));
    const chipDoor = door(CHIP), badgeDoor = door(BADGE), sliderDoor = door(SLIDER), dockDoor = door(DOCK);

    // ---- kernel module: a src dir outside every component unit, with a door and an interior .ts file ----
    const bp = find("useBreakpoint.ts");
    const KDIR = dirname(bp);
    const kDoor = door(KDIR);

    // P1 · §P3-8.4 · unit file reaching a kernel module's interior past its door
    if (kDoor) {
        add("K-INT", "B-01/B-12 door ruling", "*", "plantKint", "slider reads a kernel module's interior file past its door",
            { [`${SLIDER}/plantKint.ts`]: `import { useBreakpoint } from "${spec(`${SLIDER}/x.ts`, bp)}";\nexport const plantKint = useBreakpoint;\n` });
        add("K-INT-T", "B-01/B-12 door ruling", "*", "plantKintT", "type-only read of a kernel interior past its door",
            { [`${SLIDER}/plantKintT.ts`]: `import type * as K from "${spec(`${SLIDER}/x.ts`, bp)}";\nexport type PlantKintT = typeof K;\n` });
        add("K-DOOR-L", "legal", null, "plantKdoor", "legal: slider reads the kernel module through its door",
            { [`${SLIDER}/plantKdoor.ts`]: `import * as K from "${spec(`${SLIDER}/x.ts`, kDoor)}";\nexport const plantKdoor = K;\n` });
    } else skip("K-INT", "B-01/B-12 door ruling", `no door beside ${bp}`);

    // ---- nested modules: a unit holding two sibling sub-dirs with doors, the second with an interior file ----
    const nestedPair = (() => {
        // amendment 1 (after the hash, before any verdict): Sheet.vue is not a file name on the tree, and a hard find
        // threw before any plant ran; the candidate units are now optional. No plant's content changed.
        for (const U of [DOCK, tryFind("Aurora.vue"), tryFind("Sheet.vue", "sheet"), SLIDER, CHIP].filter(Boolean).map((u) => (u.endsWith(".vue") ? dirname(u) : u))) {
            const subs = dirs(U).filter((s) => !["__tests__", "composables", "styles"].includes(s) && door(`${U}/${s}`));
            for (const b of subs) {
                const inner = ls(`${U}/${b}`).filter((f) => /\.ts$/.test(f) && f !== "index.ts" && !f.endsWith(".d.ts"));
                const a = subs.find((s) => s !== b);
                if (a && inner.length) return { U, A: `${U}/${a}`, B: `${U}/${b}`, f: `${U}/${b}/${inner[0]}` };
            }
        }
        return null;
    })();
    // P2 · §P3-8.4 · sibling module reaching a nested module's interior inside one unit
    if (nestedPair) {
        const { A, B, f } = nestedPair;
        add("N-INT", "B-01/B-12 door ruling", "*", "plantNint", `nested ${basename(A)} reads ${basename(B)}'s interior ${basename(f)}`,
            { [`${A}/plantNint.ts`]: `import * as m from "${spec(`${A}/x.ts`, f)}";\nexport const plantNint = m;\n` });
        // P3b · type-only cycle between two nested sibling modules, through their doors
        add("T-CYC-N", "B-01 (B4)", "*", "plantTcycN", `type-only cycle ${basename(A)} <-> ${basename(B)} through doors`,
            { [`${A}/plantTcycNa.ts`]: `import type * as Bm from "${spec(`${A}/x.ts`, `${B}/index.ts`)}";\nexport type PlantTcycNa = typeof Bm;\n`,
              [`${A}/index.ts`]: read(`${A}/index.ts`) + 'export type { PlantTcycNa } from "./plantTcycNa";\n',
              [`${B}/plantTcycNb.ts`]: `import type * as Am from "${spec(`${B}/x.ts`, `${A}/index.ts`)}";\nexport type PlantTcycNb = typeof Am;\n`,
              [`${B}/index.ts`]: read(`${B}/index.ts`) + 'export type { PlantTcycNb } from "./plantTcycNb";\n' });
    } else skip("N-INT", "B-01/B-12 door ruling", "no unit with two door-bearing sibling sub-modules found");

    // P3 · §P3-8.4 · type-only cycle between sibling modules (two units)
    if (chipDoor && badgeDoor) {
        add("T-CYC", "B-01 (B4)", "*", "plantTcyc", "type-only cycle chip <-> badge through their doors",
            { [`${CHIP}/plantTcycA.ts`]: `import type * as B from "${spec(`${CHIP}/x.ts`, badgeDoor)}";\nexport type PlantTcycA = typeof B;\n`,
              [chipDoor]: read(chipDoor) + 'export type { PlantTcycA } from "./plantTcycA";\n',
              [`${BADGE}/plantTcycB.ts`]: `import type * as C from "${spec(`${BADGE}/x.ts`, chipDoor)}";\nexport type PlantTcycB = typeof C;\n`,
              [badgeDoor]: read(badgeDoor) + 'export type { PlantTcycB } from "./plantTcycB";\n' });
        add("V-CYC", "B-01 (B4)", "*", "plantVcyc", "value cycle chip <-> badge through their doors (tooth)",
            { [`${CHIP}/plantVcycA.ts`]: `import { Badge } from "${spec(`${CHIP}/x.ts`, badgeDoor)}";\nexport const plantVcycA = Badge;\n`,
              [chipDoor]: read(chipDoor) + 'export { plantVcycA } from "./plantVcycA";\n',
              [`${BADGE}/plantVcycB.ts`]: `import { Chip } from "${spec(`${BADGE}/x.ts`, chipDoor)}";\nexport const plantVcycB = Chip;\n`,
              [badgeDoor]: read(badgeDoor) + 'export { plantVcycB } from "./plantVcycB";\n' });
    }

    // P4 · §P3-8.4 · same-directory file cycle (cB O-1); B-01 needs the law to count it or state it legal
    add("F-CYC", "B-01 (same-dir cycle)", "*", "plantFcyc", "a.ts <-> b.ts value cycle in one dir (slider)",
        { [`${SLIDER}/plantFcycA.ts`]: 'import { b } from "./plantFcycB";\nexport const a = () => b;\n',
          [`${SLIDER}/plantFcycB.ts`]: 'import { a } from "./plantFcycA";\nexport const b = () => a;\n',
          [`${SLIDER}/plantFcycUse.ts`]: 'import { a } from "./plantFcycA";\nexport const plantFcycUse = a;\n' });
    add("F-CYC-T", "B-01 (same-dir cycle)", "*", "plantFcycT", "type-only a.ts <-> b.ts cycle in one dir (slider)",
        { [`${SLIDER}/plantFcycTA.ts`]: 'import type { TB } from "./plantFcycTB";\nexport type TA = { b?: TB };\n',
          [`${SLIDER}/plantFcycTB.ts`]: 'import type { TA } from "./plantFcycTA";\nexport type TB = { a?: TA };\n' });

    // P5 · §P3-8.4 / S-14 · silent return on a missing file; .catch(() => null) on a live target
    const ue = tryFind("vite.utility-emit.ts");
    const UED = ue ? dirname(ue) : "scripts";
    add("MASK-RET", "S-14", "*", "plantMaskRet", "a build helper returns silently when its input file is missing",
        { [`${UED}/plantMaskRet.ts`]: 'import { existsSync, readFileSync } from "node:fs";\nexport function plantMaskRet(p: string) {\n    if (!existsSync(p)) return;\n    return readFileSync(p, "utf8");\n}\n',
          ...(ue ? { [ue]: `import { plantMaskRet } from "./plantMaskRet";\nvoid plantMaskRet;\n` + read(ue) } : {}) });
    add("MASK-RETN", "S-14", "*", "plantMaskRetN", "a scripts helper returns null on a missing file (early-return form)",
        { "scripts/plantMaskRetN.mjs": 'import { existsSync, readFileSync } from "node:fs";\nexport const plantMaskRetN = (p) => { if (!existsSync(p)) { return null; } return readFileSync(p, "utf8"); };\n' });
    const liveTarget = find("chipVariants.ts");
    add("MASK-CATCH", "S-14", "*", "plantMaskCatch", ".catch(() => null) on a dynamic import of a live target",
        { [`${SLIDER}/plantMaskCatch.ts`]: `export const plantMaskCatch = () => import("${spec(`${SLIDER}/x.ts`, liveTarget)}").catch(() => null);\n` });
    add("MASK-CATCH-D", "S-14", "*", "plantMaskCatchD", ".catch(() => null) on a demo import of a live public entry",
        { "demo/plantMaskCatchD.ts": 'export const plantMaskCatchD = () => import("@mkbabb/glass-ui/chip").catch(() => null);\n' });
    add("MASK-TRY", "S-14", "*", "plantMaskTry", "try { readFileSync } catch { return null } swallowing a load",
        { "scripts/plantMaskTry.mjs": 'import { readFileSync } from "node:fs";\nexport const plantMaskTry = (p) => { try { return readFileSync(p, "utf8"); } catch { return null; } };\n' });

    // P6 · §P3-8.4 / B-07 · placeholder dirs outside src and scripts
    for (const [id, dir, seg] of [["PH-tests", "tests", "utils"], ["PH-demo", "demo", "misc"], ["PH-visual", "tests-visual", "v2"], ["PH-tests-helpers", "tests", "helpers2"]]) {
        const ext = dir === "tests-visual" ? "ts" : "ts";
        add(id, "B-07", "*", `${dir}/${seg}`, `placeholder dir ${dir}/${seg}`,
            { [`${dir}/${seg}/plantPh.${ext}`]: "export const plantPh = 1;\n", [`${dir}/${seg}/index.ts`]: 'export { plantPh } from "./plantPh";\n',
              [`${dir}/plantPhUse${id.slice(3)}.ts`]: `import { plantPh } from "./${seg}";\nexport const u = plantPh;\n` });
    }
    add("PH-src", "B-07 control", "*", `${DOCK}/misc`, "placeholder dir in src (control)",
        { [`${DOCK}/misc/x.ts`]: "export const x = 1;\n", [`${DOCK}/misc/index.ts`]: 'export { x } from "./x";\n',
          [`${DOCK}/plantPhSrc.ts`]: 'import { x } from "./misc";\nexport const p = x;\n' });
    add("PH-file", "B-07", "*", "use.ts", "file named only use.ts in tests",
        { "tests/use.ts": "export const u = 1;\n", "tests/plantPhFile.ts": 'import { u } from "./use";\nexport const p = u;\n' });
    add("PH-foreign", "B-07", "*", "useDockHold", "slider file named for another unit",
        { [`${SLIDER}/useDockHold.ts`]: "export const useDockHoldP = () => 1;\n",
          [`${SLIDER}/plantPhForeign.ts`]: 'import { useDockHoldP } from "./useDockHold";\nexport const p = useDockHoldP;\n' });

    // ---- shared items reached through the gate ----
    add("SELF", "S-06/B-03", "*", "plantSelf", "src imports the package by its own name",
        { [`${CHIP}/plantSelf.ts`]: 'import { Badge } from "@mkbabb/glass-ui/badge";\nexport const plantSelf = Badge;\n' });
    add("WALK", "S-07", "*", "plant-walk", "test reads src through a computed path",
        { "tests/plant-walk.test.ts": 'import { readFileSync } from "node:fs";\nimport { join } from "node:path";\n' + vt + 'const r = (n: string) => readFileSync(join(process.cwd(), "src", "components", n, "index.ts"), "utf8");\nit("w", () => expect(r).toBeTruthy());\n' });
    // B-04 · R-3
    if (chipDoor) add("T-OUT", "B-04", "*", "plant-chip-out", "single-subject chip test outside its unit",
        { "tests/plant-chip-out.test.ts": `import { Chip } from "${spec("tests/x.ts", chipDoor)}";\n${vt}it("x", () => expect(Chip).toBeTruthy());\n` });
    if (sliderDoor) add("T-WRONG", "B-04", "*", "plant-slider-in-chip", "test in chip/__tests__ whose one subject is slider",
        { [`${CHIP}/__tests__/plant-slider-in-chip.test.ts`]: `import { Slider } from "${spec(`${CHIP}/__tests__/x.ts`, sliderDoor)}";\n${vt}it("x", () => expect(Slider).toBeTruthy());\n` });
    add("T-OWN-L", "legal", null, "plant-chip-own", "legal: chip test in chip/__tests__",
        { [`${CHIP}/__tests__/plant-chip-own.test.ts`]: `import { Chip } from "..";\n${vt}it("x", () => expect(Chip).toBeTruthy());\n` });
    // B-05 · scripts placement
    const graphMjs = findAll((p) => p.startsWith("scripts/") && basename(p) === "graph.mjs")[0];
    const minify = tryFind("minify-css.mjs");
    if (graphMjs && minify && dirname(graphMjs) !== dirname(minify)) add("SCR", "B-05", "*", "plantScr", "a scripts lib file read by one other module only",
        { [`${dirname(minify)}/plantScr.mjs`]: "export const plantScr = 1;\n",
          [`${dirname(graphMjs)}/plantScrUse.mjs`]: `import { plantScr } from "${rel(`${dirname(graphMjs)}/x.mjs`, `${dirname(minify)}/plantScr.mjs`)}";\nexport const u = plantScr;\n` });
    // B-02 · kernel door republishes a unit file
    if (kDoor && sliderDoor) add("K-REEX", "B-02", "*", "PlantSliderK", "kernel door re-exports a unit",
        { [kDoor]: read(kDoor) + `export { Slider as PlantSliderK } from "${spec(kDoor, sliderDoor)}";\n` });
    // B-09 · style kernel doors
    const glassDoor = exists("src/styles/glass/index.css") ? "src/styles/glass/index.css" : null;
    const themeDoor = exists("src/styles/theme/index.css") ? "src/styles/theme/index.css" : null;
    for (const [id, d] of [["G-RULE", glassDoor], ["TH-RULE", themeDoor]]) {
        if (d) add(id, "B-09", "*", basename(dirname(d)), `a paint rule inside the ${basename(dirname(d))} CSS door`, { [d]: read(d) + ".plant-door-rule{color:red}\n" });
        else skip(id, "B-09", `no door at src/styles/${id === "G-RULE" ? "glass" : "theme"}/index.css`);
    }
    // B-01 teeth: a door carrying code; a dual door; an alias; 13 direct files; >500 lines; slot >12 (P3-R3)
    if (chipDoor) add("D-CODE", "B-01", "*", "PLANT_DOOR_CODE", "code in a JS door", { [chipDoor]: read(chipDoor) + 'export const PLANT_DOOR_CODE = 1;\n' });
    if (badgeDoor && chipDoor) add("D-DUAL", "B-01/B-02", "*", "Chip", "badge door republishes Chip", { [badgeDoor]: read(badgeDoor) + `export { Chip } from "${spec(badgeDoor, chipDoor)}";\n` });
    add("B-13F", "B-01 (bounds)", "*", "plantThirteen", "13 new direct files in chip",
        Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`${CHIP}/plantThirteen${i}.ts`, `export const t${i} = ${i};\n`])));
    add("B-501", "B-01 (bounds)", "*", "plantLong", "a hand-written file of 501+ lines",
        { [`${CHIP}/plantLong.ts`]: Array.from({ length: 520 }, (_, i) => `export const plantLong${i} = ${i};`).join("\n") + "\n" });
    add("SLOT-13", "S-03 (P3-R3)", "*", "__tests__", "13 new tests in a kind slot (slot bound 12)",
        Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`${BADGE}/__tests__/plantSlot${i}.test.ts`, `${vt}it("s${i}", () => expect(${i}).toBe(${i}));\n`])));
    add("SLOT-501", "S-03 (P3-R3)", "*", "plantSlotLong", "a 501+ line file in a composables slot",
        { [`${DOCK}/composables/plantSlotLong.ts`]: Array.from({ length: 520 }, (_, i) => `export const s${i} = ${i};`).join("\n") + "\n" });
    // legal control: slider-local helper
    add("LOCAL-L", "legal", null, "plantLocal", "legal: slider-local helper read by slider",
        { [`${SLIDER}/plantLocal.ts`]: "export const plantLocal = 1;\n", [`${SLIDER}/plantLocalUse.ts`]: 'import { plantLocal } from "./plantLocal";\nexport const u = plantLocal;\n' });
    return P;
}
