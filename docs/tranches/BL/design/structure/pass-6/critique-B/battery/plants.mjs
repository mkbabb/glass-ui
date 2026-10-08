// plants.mjs · critique-B pass 6 · the REGISTRY §P5-8.4 plants. Written and hashed BEFORE reading pass-6/B-kit or
// pass-6/B-proto.md. Contract: plants(ctx) -> [{ id, item, expect, mark, what, files } | { id, item, skip }].
//   expect: a clause id, "*" (any gained line naming `mark`), or null (legal control: must gain no line naming it).
// Clause ids are the pass-5 seal's (B15 names, B16 tests' subject, B17 no masking fallback); the adapter maps a renamed
// clause onto them and decides nothing else. Every target is discovered on the tree under judgement. Every plant writes
// NEW files only, and every mark is unique and appears in the planted path.
import { dirname, basename } from "node:path";

const noExt = (p) => p.replace(/\.(ts|mts|mjs|js|vue)$/, "");
const vt = 'import { it, expect } from "vitest";\n';

export function plants(ctx) {
    const { find, findAll, exists, ls, dirs, rel, read, all } = ctx;
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    const skip = (id, item, why) => P.push({ id, item, skip: why });
    const spec = (from, to) => { let r = noExt(rel(from, to)); if (r.endsWith("/index")) r = r.slice(0, -6) || "."; return r; };
    const door = (d) => (exists(`${d}/index.ts`) ? `${d}/index.ts` : null);

    const CHIP = dirname(find("Chip.vue")), SLIDER = dirname(find("Slider.vue"));
    const DOCK = dirname(find("GlassDock.vue"));
    const chipDoor = door(CHIP);

    // ============ 1 · S-14: every X5 shape of cB5-R §4.3 (and §P5-8.3 route · S-14's list), each zone ============
    // X5 shapes: a named loader called with an argument (literal and parameter target); a swallowed read through a reader
    // the tree defines (tree.read, T.read), returned or emptied; the promise form readFile(...).catch(h).
    const X = {
        LDARG: (n, ts, t) => `const load = (_k${ts ? ": string" : ""}) => import(${t});\nexport const ${n} = (k${ts ? ": string" : ""}) => load(k).catch(() => undefined);\n`,
        LDARGN: (n, ts, t) => `const loadMod = (_k${ts ? ": string" : ""}) => import(${t});\nexport async function ${n}(k${ts ? ": string" : ""}) {\n    return loadMod(k).catch(() => null);\n}\n`,
        TREERET: (n, ts, p) => `export const ${n} = (tree${ts ? ": { read(p: string): string }" : ""}, p${ts ? ": string" : ""}) => {\n    try {\n        return tree.read(${p});\n    } catch {\n        return "";\n    }\n};\n`,
        TREEEMPTY: (n, ts, p) => `export const ${n} = (tree${ts ? ": { read(p: string): string }" : ""}, p${ts ? ": string" : ""}) => {\n    let x${ts ? ": { entries: unknown[] }" : ""} = { entries: [] };\n    try { x = JSON.parse(tree.read(${p})); } catch { /* absent = empty */ }\n    return x;\n};\n`,
        TREAD: (n, ts, p) => `export function ${n}(T${ts ? ": { read(p: string): string }" : ""}, p${ts ? ": string" : ""}) {\n    try {\n        return T.read(${p});\n    } catch (e) {\n        return null;\n    }\n}\n`,
        PROMISE: (n, ts, p) => `import { readFile } from "node:fs/promises";\nexport const ${n} = (p${ts ? ": string" : ""}) => readFile(${p}, "utf8").catch(() => "");\n`,
        PROMISEE: (n, ts, p) => `import { readFile } from "node:fs/promises";\nexport const ${n} = (p${ts ? ": string" : ""}) => readFile(${p}, "utf8").catch((e) => { void e; return null; });\n`,
    };
    const zones = {
        src: { dir: SLIDER, ext: "ts", ts: true, live: chipDoor ? `"${spec(`${SLIDER}/x.ts`, chipDoor)}"` : null },
        demo: { dir: "demo", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
        scripts: { dir: "scripts", ext: "mjs", ts: false, live: '"node:path"' },
        tests: { dir: "tests", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
        "tests-visual": { dir: "tests-visual", ext: "ts", ts: true, live: '"@mkbabb/glass-ui/chip"' },
    };
    for (const [z, Z] of Object.entries(zones)) {
        const zt = z.replace("-", "");
        for (const [shape, f] of Object.entries(X)) for (const pk of ["lit", "par"]) {
            const n = `zq6${zt}${shape}${pk}`;
            const isLoad = shape.startsWith("LDARG");
            const t = isLoad ? (pk === "lit" ? Z.live : "/* @vite-ignore */ _k") : (pk === "lit" ? '"package.json"' : "p");
            if (!t) { skip(`X6-${z}-${shape}-${pk}`, "S-14", "no live literal target in this zone"); continue; }
            add(`X6-${z}-${shape}-${pk}`, "S-14", "B17", n, `${z}: ${shape} on a ${pk === "lit" ? "literal" : "parameter"} ${isLoad ? "target" : "path"}`,
                { [`${Z.dir}/${n}.${Z.ext}`]: f(n, Z.ts, t) });
        }
        // legal controls: the same readers with no fallback, and a promise catch that rethrows with context
        const c1 = `zq6${zt}CtlLoader`, c2 = `zq6${zt}CtlTree`, c3 = `zq6${zt}CtlPromise`;
        if (Z.live) add(`X6-${z}-CTL-loader`, "S-14 control", null, c1, `${z}: legal named loader called with an argument, no catch`,
            { [`${Z.dir}/${c1}.${Z.ext}`]: `const load = (_k${Z.ts ? ": string" : ""}) => import(${Z.live});\nexport const ${c1} = (k${Z.ts ? ": string" : ""}) => load(k);\n` });
        add(`X6-${z}-CTL-tree`, "S-14 control", null, c2, `${z}: legal tree.read with no catch`,
            { [`${Z.dir}/${c2}.${Z.ext}`]: `export const ${c2} = (tree${Z.ts ? ": { read(p: string): string }" : ""}, p${Z.ts ? ": string" : ""}) => tree.read(p);\n` });
        add(`X6-${z}-CTL-promise`, "S-14 control", null, c3, `${z}: legal readFile(...).catch that rethrows with context`,
            { [`${Z.dir}/${c3}.${Z.ext}`]: `import { readFile } from "node:fs/promises";\nexport const ${c3} = (p${Z.ts ? ": string" : ""}) => readFile(p, "utf8").catch((e) => {\n    throw new Error(\`cannot read \${p}: \${String(e)}\`);\n});\n` });
    }

    // ============ 2 · placeholder split names and placeholder test stems (B-07) ============
    const named = ["part-1.ts", "GlassDock-2.ts", "GlassDock2.ts", "GlassDockPart2.ts", "bs11.ts", "GlassDockSplit.ts"];
    for (const f of named) {
        const path = `${DOCK}/${f}`;
        if (exists(path)) { skip(`PH6-${path}`, "B-07", `${path} already exists on the tree`); continue; }
        add(`PH6-${path}`, "B-07", "B15", path, `split module given placeholder name ${f}`,
            { [path]: `export const zqPh6${noExt(f).replace(/[^A-Za-z0-9]/g, "")} = 1;\n` });
    }
    // the same names in the other code zones (B15 judges all five zones since pass 4)
    const fullest = (z) => dirs(z).map((d) => `${z}/${d}`).filter((d) => ls(d).length > 0).sort((a, b) => ls(b).length - ls(a).length)[0] ?? z;
    for (const [z, f] of [["scripts", "part-1.mjs"], ["demo", "GlassDock2.ts"], ["tests", "bs11.ts"], ["tests-visual", "GlassDockSplit.ts"]]) {
        const path = `${fullest(z)}/${f}`;
        if (exists(path)) { skip(`PH6-${path}`, "B-07", "exists"); continue; }
        add(`PH6-${path}`, "B-07", "B15", path, `${z}: placeholder name ${f}`, { [path]: `export const zqPh6z${z.replace("-", "")} = 1;\n` });
    }
    // placeholder TEST stems: unit tests, a top-level test, and a Playwright spec
    const chipT = `${CHIP}/__tests__`;
    const tstems = [
        [chipT, "Chip2.test.ts", "vitest"], [chipT, "part-1.test.ts", "vitest"], [`${SLIDER}/__tests__`, "SliderSplit.test.ts", "vitest"],
        [fullest("tests"), "bs11.test.ts", "vitest"], [`${DOCK}/__tests__`, "GlassDock-2.test.ts", "vitest"],
    ];
    for (const [d, f] of tstems) {
        const path = `${d}/${f}`;
        if (exists(path)) { skip(`PHT6-${path}`, "B-07", "exists"); continue; }
        add(`PHT6-${path}`, "B-07", "B15", path, `placeholder test stem ${f}`, { [path]: `${vt}it("ph", () => expect(1).toBe(1));\n` });
    }
    // a placeholder Playwright stem beside a real spec, the suffuse2/motion2 shape: <existing stem> + digit
    const tvSpecs = all.filter((p) => p.startsWith("tests-visual/") && /\.spec\.ts$/.test(p)).sort();
    if (tvSpecs.length) {
        const s0 = tvSpecs[0];
        const st = basename(s0).replace(/\.spec\.ts$/, "");
        const path = `${dirname(s0)}/${st}7.spec.ts`;
        if (!exists(path)) add(`PHT6-${path}`, "B-07", "B15", path, `Playwright spec stem ${st}7 beside ${basename(s0)}`,
            { [path]: `import { test, expect } from "@playwright/test";\ntest("ph", async ({ page }) => { await page.goto("/"); await expect(page).toHaveTitle(/./); });\n` });
    } else skip("PHT6-tv", "B-07", "no tests-visual spec on the tree");
    // legal name controls: a concept name in the dock dir and a concept test stem
    add("PH6-CTL-src", "B-07 control", null, `${DOCK}/zqDockReachArc.ts`, "legal: a concept-named split module",
        { [`${DOCK}/zqDockReachArc.ts`]: "export const zqDockReachArc = 1;\n" });
    add("PH6-CTL-test", "B-07 control", null, `${chipT}/zqChipToneRamp.test.ts`, "legal: a concept-named unit test",
        { [`${chipT}/zqChipToneRamp.test.ts`]: `${vt}it("c", () => expect(1).toBe(1));\n` });

    // ============ 3 · Playwright program membership and P5-R5's subject reading (B-10, B-S16) ============
    const pw = (n, goto) => `import { test, expect } from "@playwright/test";\ntest("${n}", async ({ page }) => {\n    await page.goto(${goto});\n    await expect(page.locator("body")).toBeVisible();\n});\n`;
    add("PW6-out-tv", "B-10 (B-S16)", "*", "zq6PwOutside", "a Playwright test file in tests-visual whose name the program does not match",
        { "tests-visual/zq6PwOutside.ts": pw("zq6PwOutside", '"/"') });
    add("PW6-out-unit", "B-10 (B-S16)", "*", "zq6PwUnitOut", "a Playwright test file in chip's slot under a name the program does not match",
        { [`${chipT}/zq6PwUnitOut.vis.ts`]: pw("zq6PwUnitOut", '"/"') });
    add("PW6-out-demo", "B-10 (B-S16)", "*", "zq6PwDemo", "a Playwright spec in the demo zone",
        { "demo/zq6PwDemo.spec.ts": pw("zq6PwDemo", '"/"') });
    // the story path a chip spec opens, copied from the tree (P5-R5: the subject is read through the story manifest)
    const gotoOf = (p) => (read(p).match(/page\.goto\(\s*([`"'][^`"']*[`"'])\s*[,)]/) || [])[1] ?? null;
    const chipSpecs = all.filter((p) => p.startsWith(`${chipT}/`) && /\.(visual|spec)\.ts$/.test(p));
    let chipGoto = null;
    for (const p of chipSpecs) { const g = gotoOf(p); if (g && /chip/i.test(g)) { chipGoto = g; break; } }
    if (!chipGoto) for (const p of all.filter((x) => /\.(visual|spec)\.ts$/.test(x))) { const g = gotoOf(p); if (g && /chip/i.test(g)) { chipGoto = g; break; } }
    if (chipGoto) {
        add("PW6-legal-unit", "B-10 legal", null, "zq6ChipPage", `legal: a page-driving chip visual spec in chip's slot, goto ${chipGoto}`,
            { [`${chipT}/zq6ChipPage.visual.ts`]: pw("zq6ChipPage", chipGoto) });
        add("PW6-wrong-unit", "B-10 (P5-R5)", "*", "zq6WrongUnit", `a visual spec driving chip's story (${chipGoto}) in slider's slot`,
            { [`${SLIDER}/__tests__/zq6WrongUnit.visual.ts`]: pw("zq6WrongUnit", chipGoto) });
        const tvd = dirname(tvSpecs[0] ?? "tests-visual/x");
        add("PW6-tv-one-unit", "B-10 (P5-R5)", "*", "zq6TvChipOnly", `a tests-visual spec whose one subject is chip (${chipGoto})`,
            { [`${tvd}/zq6TvChipOnly.spec.ts`]: pw("zq6TvChipOnly", chipGoto) });
    } else skip("PW6-unit", "B-10", "no goto naming chip found on the tree");
    return P;
}
