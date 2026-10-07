// plants.mjs · critique-B pass 5 · the REGISTRY §P4-8.4 plants. Written and hashed BEFORE reading pass-5/B-kit or
// pass-5/B-proto.md. Contract: plants(ctx) -> [{ id, item, expect, mark, what, files } | { id, item, skip }].
//   expect: a clause id, "*" (any gained line naming `mark`), or null (legal control: must gain no line naming it).
// Every target is discovered on the tree under judgement; nothing assumes the route's layout. Every plant writes NEW
// files only (so --group may co-plant them), and every mark is unique and appears in the planted path.
import { dirname, basename } from "node:path";

const noExt = (p) => p.replace(/\.(ts|mts|mjs|js|vue)$/, "");
const vt = 'import { it, expect } from "vitest";\n';

export function plants(ctx) {
    const { find, findAll, exists, ls, dirs, rel, all } = ctx;
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    const skip = (id, item, why) => P.push({ id, item, skip: why });
    const spec = (from, to) => { let r = noExt(rel(from, to)); if (r.endsWith("/index")) r = r.slice(0, -6) || "."; return r; };
    const tryFind = (b, h) => { try { return find(b, h); } catch { return null; } };
    const door = (d) => (exists(`${d}/index.ts`) ? `${d}/index.ts` : null);

    const CHIP = dirname(find("Chip.vue")), SLIDER = dirname(find("Slider.vue"));
    const DOCK = dirname(find("GlassDock.vue"));
    const chipDoor = door(CHIP);

    // ===================== 1 · S-14: every masking shape, literal and parameter path, in each zone =====================
    // fs shapes (a silent return on a missing file) and load shapes (a swallowed load of a live target).
    const FS = {
        RET:   (n, a, p) => `import { existsSync, readFileSync } from "node:fs";\nexport function ${n}(${a}) {\n    if (!existsSync(${p})) return;\n    return readFileSync(${p}, "utf8");\n}\n`,
        RETN:  (n, a, p) => `import { existsSync, readFileSync } from "node:fs";\nexport const ${n} = (${a}) => { if (!existsSync(${p})) { return null; } return readFileSync(${p}, "utf8"); };\n`,
        TERN:  (n, a, p) => `import { existsSync, readFileSync } from "node:fs";\nexport const ${n} = (${a}) => (existsSync(${p}) ? readFileSync(${p}, "utf8") : "");\n`,
        POS:   (n, a, p) => `import { existsSync, readFileSync } from "node:fs";\nexport function ${n}(${a}) {\n    if (existsSync(${p})) return readFileSync(${p}, "utf8");\n    return "";\n}\n`,
        POSB:  (n, a, p) => `import { existsSync, readFileSync } from "node:fs";\nexport function ${n}(${a}) {\n    if (existsSync(${p})) {\n        const t = readFileSync(${p}, "utf8");\n        return t;\n    }\n    return null;\n}\n`,
        TRY:   (n, a, p) => `import { readFileSync } from "node:fs";\nexport function ${n}(${a}) {\n    try {\n        return readFileSync(${p}, "utf8");\n    } catch {\n        return "";\n    }\n}\n`,
        TRYE:  (n, a, p) => `import { readFileSync } from "node:fs";\nexport function ${n}(${a}) {\n    let t = "";\n    try { t = readFileSync(${p}, "utf8"); } catch (e) { /* ignore */ }\n    return t;\n}\n`,
        ASYNC: (n, a, p) => `import { readFile } from "node:fs/promises";\nexport const ${n} = (${a}) => readFile(${p}, "utf8").catch(() => "");\n`,
    };
    const LOAD = {
        CATCH:  (n, a, t) => `export const ${n} = (${a}) => import(${t}).catch(() => null);\n`,
        CATCHU: (n, a, t) => `export const ${n} = (${a}) => import(${t}).catch(() => undefined);\n`,
        THEN2:  (n, a, t) => `export const ${n} = (${a}) => import(${t}).then((m) => m, () => null);\n`,
        FNVAL:  (n, a, t) => `const load = (${a}) => import(${t});\nexport const ${n} = (${a}) => load(${a.split(":")[0] || ""}).catch(() => undefined);\n`,
        FNMAP:  (n, a, t) => `const loaders = [(${a}) => import(${t})];\nexport const ${n} = (${a}) => loaders.map((c) => c(${a.split(":")[0] || ""}).catch(() => undefined));\n`,
        TRYAW:  (n, a, t) => `export async function ${n}(${a}) {\n    try {\n        return await import(${t});\n    } catch {\n        return null;\n    }\n}\n`,
    };
    // zone homes: a file in an existing dir of the zone. src: inside a unit (slider). tests/tests-visual: the zone root.
    const zones = {
        src: { dir: SLIDER, ext: "ts", ts: true, live: chipDoor ? `"${spec(`${SLIDER}/x.ts`, chipDoor)}"` : null },
        demo: { dir: "demo", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
        scripts: { dir: "scripts", ext: "mjs", ts: false, live: '"node:path"' },
        tests: { dir: "tests", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
        "tests-visual": { dir: "tests-visual", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
    };
    for (const [z, Z] of Object.entries(zones)) {
        const zt = z.replace("-", "");
        const argT = Z.ts ? "p: string" : "p";
        for (const [shape, f] of Object.entries(FS)) for (const [pk, a, p] of [["lit", "", '"package.json"'], ["par", argT, "p"]]) {
            const n = `zq${zt}Fs${shape}${pk}`;
            add(`S14-${z}-FS-${shape}-${pk}`, "S-14", "B17", n, `${z}: ${shape} on a ${pk === "lit" ? "literal" : "parameter"} path`,
                { [`${Z.dir}/${n}.${Z.ext}`]: f(n, a, p) });
        }
        for (const [shape, f] of Object.entries(LOAD)) for (const [pk, a, t] of [["lit", "", Z.live], ["par", argT, "/* @vite-ignore */ p"]]) {
            const n = `zq${zt}Ld${shape}${pk}`;
            if (!t) { skip(`S14-${z}-LD-${shape}-${pk}`, "S-14", "no live literal target in this zone"); continue; }
            add(`S14-${z}-LD-${shape}-${pk}`, "S-14", "B17", n, `${z}: ${shape} load on a ${pk === "lit" ? "literal" : "parameter"} target`,
                { [`${Z.dir}/${n}.${Z.ext}`]: f(n, a, t) });
        }
        // legal controls: the same reads and loads with no fallback (must stay clean of a line naming them)
        const c1 = `zq${zt}CtlRead`, c2 = `zq${zt}CtlLoad`, c3 = `zq${zt}CtlRethrow`;
        add(`S14-${z}-CTL-read`, "S-14 control", null, c1, `${z}: legal plain read`,
            { [`${Z.dir}/${c1}.${Z.ext}`]: `import { readFileSync } from "node:fs";\nexport const ${c1} = (${argT}) => readFileSync(p, "utf8");\n` });
        if (Z.live) add(`S14-${z}-CTL-load`, "S-14 control", null, c2, `${z}: legal plain load`,
            { [`${Z.dir}/${c2}.${Z.ext}`]: `export const ${c2} = () => import(${Z.live});\n` });
        add(`S14-${z}-CTL-rethrow`, "S-14 control", null, c3, `${z}: legal try/catch that rethrows with context`,
            { [`${Z.dir}/${c3}.${Z.ext}`]: `import { readFileSync } from "node:fs";\nexport function ${c3}(${argT}) {\n    try {\n        return readFileSync(p, "utf8");\n    } catch (e) {\n        throw new Error(\`cannot read \${p}: \${String(e)}\`);\n    }\n}\n` });
    }

    // ===================== 2 · a split file's new module given a placeholder name =====================
    // The split home is GlassDock.vue's dir (P4-R5 orders it split first), plus one tests dir and one demo dir.
    const tdir = dirs("tests").map((d) => `tests/${d}`).filter((d) => ls(d).length > 0).sort((a, b) => ls(b).length - ls(a).length)[0] ?? "tests";
    const ddir = dirs("demo").map((d) => `demo/${d}`).filter((d) => ls(d).length > 0).sort((a, b) => ls(b).length - ls(a).length)[0] ?? "demo";
    const ph = [
        [DOCK, "GlassDock-2.ts"], [DOCK, "part-1.ts"], [DOCK, "GlassDockPart2.ts"], [DOCK, "helpers.ts"], [DOCK, "utils.ts"],
        [DOCK, "misc.ts"], [DOCK, "GlassDock2.ts"], [DOCK, "bs11.ts"], [DOCK, "GlassDockSplit.ts"], [DOCK, "common.ts"],
        [tdir, "part-2.test.ts"], [tdir, "helpers3.ts"], [ddir, "misc2.ts"], [ddir, "utils.ts"],
    ];
    for (const [d, f] of ph) {
        const path = `${d}/${f}`;
        if (exists(path)) { skip(`PH5-${path}`, "B-07/B-10", `${path} already exists on the tree (reviewed or real)`); continue; }
        const body = f.endsWith(".test.ts") ? `${vt}it("ph", () => expect(1).toBe(1));\n` : `export const zqPh${noExt(f).replace(/[^A-Za-z0-9]/g, "")} = 1;\n`;
        add(`PH5-${path}`, "B-07/B-10", "*", path, `split module given placeholder name ${path}`, { [path]: body });
    }
    // placeholder DIR as a split module
    add(`PH5-dir-${DOCK}/part2`, "B-07/B-10", "*", `${DOCK}/part2`, "split module dir with a placeholder name",
        { [`${DOCK}/part2/zqPartTwo.ts`]: "export const zqPartTwo = 1;\n", [`${DOCK}/part2/index.ts`]: 'export { zqPartTwo } from "./zqPartTwo";\n' });

    // ===================== 3 · a carved visual spec that leaves the Playwright program =====================
    // judged by the gate here; the program itself is read by probes/pw-program.mjs (tree-probes.sh)
    const pw = (n) => `import { test, expect } from "@playwright/test";\ntest("${n}", async ({ page }) => { await page.goto("/"); await expect(page).toHaveTitle(/./); });\n`;
    add("VIS-out-name", "B-10 (B-S16)", "*", "zqCarveOut", "unit visual spec with a name outside the program's match",
        { [`${CHIP}/__tests__/zqCarveOut.vis.ts`]: pw("zqCarveOut") });
    add("VIS-out-slot", "B-10 (B-S16)", "*", "zqCarveRoot", "unit visual spec outside its __tests__ slot",
        { [`${CHIP}/zqCarveRoot.visual.ts`]: pw("zqCarveRoot") });
    add("VIS-orphan", "B-10 (B-S16)", "*", "zqCarveOrphan", "Playwright test file in tests-visual with a non-spec name",
        { "tests-visual/zqCarveOrphan.ts": pw("zqCarveOrphan") });
    add("VIS-in-L", "legal", null, "zqCarveIn", "legal: unit visual spec in its slot by the route's convention",
        { [`${CHIP}/__tests__/zqCarveIn.visual.ts`]: pw("zqCarveIn") });

    // ===================== 4 · a directory over 12 after the splits =====================
    // the fullest dir per zone that is at or under 12 direct files, filled to 13; and GlassDock's own dir
    const SLOTS = new Set(["composables", "__tests__", "styles"]);
    const codeDirs = [...new Set(all.map((p) => dirname(p)))].filter((d) => /^(src|demo|scripts|tests|tests-visual)(\/|$)/.test(d));
    const direct = (d) => ls(d).length;
    for (const z of ["src", "demo", "scripts", "tests", "tests-visual"]) {
        const cand = codeDirs.filter((d) => (d === z || d.startsWith(`${z}/`)) && !SLOTS.has(basename(d)) && direct(d) <= 12 && direct(d) >= 1)
            .sort((a, b) => direct(b) - direct(a))[0];
        if (!cand) { skip(`DIR13-${z}`, "B-01/B-10", "no dir <= 12 in zone"); continue; }
        const need = 13 - direct(cand);
        const ext = z === "scripts" ? "mjs" : "ts";
        add(`DIR13-${z}`, "B-01/B-10 (B6)", "*", cand, `${cand} filled from ${direct(cand)} to 13 direct files`,
            Object.fromEntries(Array.from({ length: need }, (_, i) => [`${cand}/zqFill${z.replace("-", "")}${i}.${ext}`, `export const zqFill${i} = ${i};\n`])));
    }
    if (direct(DOCK) <= 12) add("DIR13-dock", "B-01/B-10 (B6)", "*", DOCK, `GlassDock's dir filled to 13 after the split`,
        Object.fromEntries(Array.from({ length: 13 - direct(DOCK) }, (_, i) => [`${DOCK}/zqDockFill${i}.ts`, `export const zqDockFill${i} = ${i};\n`])));
    // a kind slot over 12 after the split (P3-R3, P4-R5): dock/__tests__ filled to 13
    const DT = `${DOCK}/__tests__`;
    if (direct(DT) <= 12) add("SLOT13-dock", "S-03 (P3-R3/P4-R5)", "*", DT, `${DT} filled to 13`,
        Object.fromEntries(Array.from({ length: 13 - direct(DT) }, (_, i) => [`${DT}/zqSlot${i}.test.ts`, `${vt}it("s${i}", () => expect(${i}).toBe(${i}));\n`])));

    // ===================== 5 · a B2 reach re-pointed to a private =====================
    // private target: a chip interior .ts file that is not its door; a nested door that no entry publishes
    const priv = ls(CHIP).filter((f) => /\.ts$/.test(f) && f !== "index.ts" && !f.endsWith(".d.ts")).map((f) => `${CHIP}/${f}`)[0];
    const nested = (() => {
        for (const s of dirs(DOCK).filter((s) => !SLOTS.has(s))) if (door(`${DOCK}/${s}`)) return `${DOCK}/${s}/index.ts`;
        return null;
    })();
    const sym = "*";
    if (priv) {
        const Z = [["demo", "demo"], ["tests", "tests"], ["tests-visual", "tests-visual"], ["scripts", "scripts"]];
        for (const [z, d] of Z) {
            const zt = z.replace("-", "");
            const ext = z === "scripts" ? "mjs" : "ts";
            const s = spec(`${d}/x.ts`, priv);
            const nm = (k) => `zqB2${zt}${k}`;
            add(`B2-${z}-rel`, "B-01 (B2, P4-R1/R2)", "B2", nm("Rel"), `${z} imports a chip private by a relative path`,
                { [`${d}/${nm("Rel")}.${ext}`]: `import * as m from "${s}";\nexport const ${nm("Rel")} = m;\n` });
            add(`B2-${z}-type`, "B-01 (B2)", "B2", nm("Type"), `${z} type-only import of a chip private`,
                { [`${d}/${nm("Type")}.${ext === "mjs" ? "ts" : ext}`]: `import type * as m from "${s}";\nexport type ${nm("Type")} = typeof m;\n` });
            add(`B2-${z}-dyn`, "B-01 (B2)", "B2", nm("Dyn"), `${z} dynamic import of a chip private`,
                { [`${d}/${nm("Dyn")}.${ext}`]: `export const ${nm("Dyn")} = () => import("${s}");\n` });
            add(`B2-${z}-reex`, "B-01 (B2)", "B2", nm("Reex"), `${z} re-exports a chip private`,
                { [`${d}/${nm("Reex")}.${ext}`]: `export * from "${s}";\nexport const ${nm("Reex")} = 1;\n` });
            add(`B2-${z}-raw`, "B-01 (B2)", "B2", nm("Raw"), `${z} ?raw import of a chip private`,
                { [`${d}/${nm("Raw")}.${ext}`]: `import t from "${s}.ts?raw";\nexport const ${nm("Raw")} = t;\n` });
            if (nested) add(`B2-${z}-nested`, "B-01 (B2)", "B2", nm("Nest"), `${z} reaches a nested door no entry publishes`,
                { [`${d}/${nm("Nest")}.${ext}`]: `import * as m from "${spec(`${d}/x.ts`, nested)}";\nexport const ${nm("Nest")} = m;\n` });
            add(`B2-${z}-deep`, "B-01 (B2)", "B2", nm("Deep"), `${z} imports a private by a package deep path`,
                { [`${d}/${nm("Deep")}.${ext}`]: `import * as m from "@mkbabb/glass-ui/${noExt(priv)}";\nexport const ${nm("Deep")} = m;\n` });
            add(`B2-${z}-entry-L`, "legal", null, nm("EntryL"), `legal: ${z} imports the public chip entry`,
                { [`${d}/${nm("EntryL")}.${ext}`]: `import * as m from "@mkbabb/glass-ui/chip";\nexport const ${nm("EntryL")} = m;\n` });
        }
        add("B2-tests-mock", "B-01 (B2)", "B2", "zqB2testsMock", "a test outside the unit vi.mock()s a chip private",
            { "tests/zqB2testsMock.test.ts": `import { vi, it, expect } from "vitest";\nvi.mock("${spec("tests/x.ts", priv)}", () => ({}));\nit("m", () => expect(1).toBe(1));\n` });
        add("B2-demo-glob", "B-01 (B2)", "B2", "zqB2demoGlob", "demo import.meta.glob over a unit's privates",
            { "demo/zqB2demoGlob.ts": `export const zqB2demoGlob = import.meta.glob("${spec("demo/x.ts", CHIP)}/*.ts");\n` });
        add("B2-unit-test-L", "legal", null, "zqB2unitL", "legal: chip/__tests__ reads a chip private (inside its unit)",
            { [`${CHIP}/__tests__/zqB2unitL.test.ts`]: `import * as m from "${spec(`${CHIP}/__tests__/x.ts`, priv)}";\n${vt}it("u", () => expect(m).toBeTruthy());\n` });
    } else skip("B2-*", "B-01 (B2)", "no chip private .ts found");
    return P;
}
