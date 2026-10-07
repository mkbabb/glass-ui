// fd4-cover-probe.mjs --root <replayed tree> · critique-B pass 5 · written AFTER the battery hash (not part of it).
// Can FD-4's coverage arm (scripts/structure/cascade.mjs coverRisks) still count the chip readback spec as evidence
// on the migrated tree? It calls the tree's own coverRisks with one risky pair on --accent-band-strength
// (.accent-tone x .glass-chip, pass 4's plant pair) and a browser report shaped exactly as the tree's browser.mjs
// writes it: results keyed by basename(spec) (browser.mjs walk), bands carrying the selection's spec paths
// (browser.mjs bandReport: selection .spec values, relative to tests-visual/). Arms:
//   A  the carved readback spec where the chain put it (src/components/chip/__tests__/chip-accent-band.visual.ts)
//   B  arm A, with the band listing the basename instead (isolates the text-read defect from the band lookup)
//   C  control: the same spec text copied to tests-visual/<basename> (the pre-carve location), band by basename
// A risk is covered only when evidence is non-empty. The copy in C is removed before exit.
import { pathToFileURL } from "node:url";
import { join, resolve, basename } from "node:path";
import { copyFileSync, rmSync, existsSync, readFileSync } from "node:fs";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const C = await import(pathToFileURL(join(root, "scripts/structure/cascade.mjs")));
const L = await import(pathToFileURL(join(root, "scripts/structure/lib/index.mjs")));
const SPEC = "src/components/chip/__tests__/chip-accent-band.visual.ts";
if (!existsSync(join(root, SPEC))) { console.log(`NO-SPEC ${SPEC}`); process.exit(2); }
const text = readFileSync(join(root, SPEC), "utf8");
console.log(`spec ${SPEC}: names --accent-band-strength ${/--accent-band-strength/.test(text)}, names glass-chip ${/glass-chip/.test(text)}, names accent-tone ${/accent-tone/.test(text)}`);
const base = basename(SPEC);
const run = (label, bandSpec) => {
    const tree = L.openTree(root); const { owners } = L.classOwners(tree); const recipes = L.classRecipes(tree);
    const risks = [{ props: ["--accent-band-strength"], classes: ["accent-tone", "glass-chip"] }];
    const reports = [{ root, baseReport: true, results: [{ spec: base, title: "readback", status: "expected" }], bands: [{ band: "chip", specs: [bandSpec], baseGreen: 3 }], newFailures: [] }];
    C.coverRisks(risks, reports, tree, { recipes, owners });
    const r = risks[0];
    console.log(`ARM ${label}: covered=${r.covered} evidence=${r.evidence.length} namedOnlyTheClass=${r.namedOnlyTheClass.length} refuted=${(r.refuted ?? []).length}`);
    return r.covered;
};
const a = run("A carved, band path as browser.mjs writes it", `../${SPEC}`);
const b = run("B carved, band by basename", base);
const copy = join(root, "tests-visual", base);
copyFileSync(join(root, SPEC), copy);
let c;
try { c = run("C control: spec at tests-visual/<basename>, band by basename", base); } finally { rmSync(copy); }
console.log(`FD4-COVER ${!a && c ? "FAIL: the carved readback spec cannot be evidence; the same text at the pre-carve path can" : a ? "PASS" : "INCONCLUSIVE (control not covered)"}`);
