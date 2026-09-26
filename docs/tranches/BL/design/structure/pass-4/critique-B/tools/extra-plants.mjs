// extra-plants.mjs · written AFTER the battery hash and after reading LAW §10 and the gate: variants of S-14's two forms
// that LAW §10 names as declared limits, plus two door-ruling variants. Not part of the hashed battery; findings from
// these go to outside_checklist unless they map to a listed item. Same contract as battery/plants.mjs; run with the
// battery's run-plants.mjs from a scratch copy with this file in place of plants.mjs.
import { dirname } from "node:path";
export function plants(ctx) {
    const { find, rel } = ctx;
    const SLIDER = dirname(find("Slider.vue"));
    const live = find("chipVariants.ts");
    const spec = (from, to) => rel(from, to).replace(/\.ts$/, "");
    const P = [];
    const add = (id, item, expect, mark, what, files) => P.push({ id, item, expect, mark, what, files });
    add("X-TERN", "S-14", "*", "plantXtern", "existsSync(p) ? readFileSync(p) : \"\" (ternary silent fallback)",
        { "scripts/plantXtern.mjs": 'import { existsSync, readFileSync } from "node:fs";\nexport const plantXtern = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");\n' });
    add("X-TRYREAD", "S-14", "*", "plantXtryread", "try { readFileSync } catch { return \"\" }",
        { "scripts/plantXtryread.mjs": 'import { readFileSync } from "node:fs";\nexport function plantXtryread(p) { try { return readFileSync(p, "utf8"); } catch { return ""; } }\n' });
    add("X-THEN2", "S-14", "*", "plantXthen2", "import(live).then(ok, () => null)",
        { [`${SLIDER}/plantXthen2.ts`]: `export const plantXthen2 = () => import("${spec(`${SLIDER}/x.ts`, live)}").then((m) => m, () => null);\n` });
    add("X-FNVAL", "S-14", "*", "plantXfnval", "const c = () => import(live); c().catch(() => null)",
        { [`${SLIDER}/plantXfnval.ts`]: `const c = () => import("${spec(`${SLIDER}/x.ts`, live)}");\nexport const plantXfnval = () => c().catch(() => null);\n` });
    add("X-TRYAWAIT", "S-14", "*", "plantXtryawait", "try { await import(live) } catch { return null }",
        { [`${SLIDER}/plantXtryawait.ts`]: `export async function plantXtryawait() { try { return await import("${spec(`${SLIDER}/x.ts`, live)}"); } catch { return null; } }\n` });
    add("X-ELSE", "S-14", "*", "plantXelse", "if (existsSync(p)) { return read } return null (positive-guard form)",
        { "scripts/plantXelse.mjs": 'import { existsSync, readFileSync } from "node:fs";\nexport function plantXelse(p) { if (existsSync(p)) { return readFileSync(p, "utf8"); } return null; }\n' });
    // the battery's PH-foreign collided with a real, pin-reviewed file (slider/useDockHold.ts); this is the same probe
    // on a name the tree does not hold
    add("X-FOREIGN", "B-07", "*", "useChipGlow", "slider file named for another unit (chip), not reviewed",
        { [`${SLIDER}/useChipGlow.ts`]: "export const useChipGlow = () => 1;\n",
          [`${SLIDER}/plantXforeign.ts`]: 'import { useChipGlow } from "./useChipGlow";\nexport const p = useChipGlow;\n' });
    // B-05: the battery's SCR plant did not issue (it looked for minify-css.mjs; the tree holds scripts/minify/minify-css.ts).
    // A scripts-zone file read only by another scripts module must be placed by B10.
    add("X-SCR", "B-05", "B10", "plantXscr", "scripts/structure/lib file read only by scripts/minify",
        { "scripts/structure/lib/plantXscr.mjs": "export const plantXscr = 1;\n",
          "scripts/minify/plantXscrUse.ts": '// @ts-nocheck\nimport { plantXscr } from "../structure/lib/plantXscr.mjs";\nexport const u = plantXscr;\n' });
    // S-14, the two live shapes on the replayed tree, planted without the incidental B0/B1 reach the variants above had:
    // scripts/profile-bundle.mjs:292 (a ternary over a present literal file) and demo/router.ts:117 (a loader value
    // whose load is swallowed), each through a legal path.
    add("X-TERN-LIT", "S-14", "*", "plantXternLit", "existsSync(<literal>) ? readFileSync(<literal>) : \"\" over a present file",
        { "scripts/plantXternLit.mjs": 'import { existsSync, readFileSync } from "node:fs";\nexport const plantXternLit = () => (existsSync("package.json") ? readFileSync("package.json", "utf8") : "");\n' });
    add("X-FNVAL-D", "S-14", "*", "plantXfnvalD", "demo: const c = () => import(public entry); c().catch(() => undefined)",
        { "demo/plantXfnvalD.ts": 'const c = () => import("@mkbabb/glass-ui/chip");\nexport const plantXfnvalD = () => c().catch(() => undefined);\n' });
    return P;
}
