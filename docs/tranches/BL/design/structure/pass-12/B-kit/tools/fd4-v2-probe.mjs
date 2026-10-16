#!/usr/bin/env node
// fd4-v2-probe.mjs — FD-4's coverage arm (P6-F2) read through a browser-seat/2 report, the shape
// scripts/structure/browser.mjs writes on the migrated tree: testDir is the program's rootDir
// (".") and each result's spec is its path from there. Arm A: the carved chip readback spec,
// keyed from testDir, must be counted as evidence for its band's risk. Arm A': a spec the tree
// does not hold must throw (a moved spec fails loud; it never reads as empty).
// The critic's own probe (pass-5/critique-B/tools/fd4-cover-probe.mjs) builds an unversioned
// report, which the floor refuses by design (FLOOR-P6); this probe is the /2 arm beside it.
//   node tools/fd4-v2-probe.mjs <migrated tree> [testDir]
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.argv[2]);
const testDir = process.argv[3] ?? ".";
const C = await import(pathToFileURL(join(root, "scripts/structure/cascade.mjs")));
const L = await import(pathToFileURL(join(root, "scripts/structure/lib/index.mjs")));
const SPEC = "src/components/chip/__tests__/chip-accent-band.visual.ts";
const tree = L.openTree(root);
const { owners } = L.classOwners(tree);
const recipes = L.classRecipes(tree);
const key = testDir === "." ? SPEC : join("..", SPEC);
for (const [label, spec] of [["A /2, carved spec keyed from testDir", key], ["A' /2, a spec the tree does not hold", "tests-visual/nope.spec.ts"]]) {
    const risks = [{ props: ["--accent-band-strength"], classes: ["accent-tone", "glass-chip"] }];
    const reports = [{ $schema: C.SEAT_REPORT ?? "browser-seat/2", root, testDir, baseReport: true, results: [{ spec, title: "readback", status: "expected" }], bands: [{ band: "chip", specs: [spec], baseGreen: 3 }], newFailures: [] }];
    try {
        C.coverRisks(risks, reports, tree, { recipes, owners });
        console.log(`ARM ${label}: covered=${risks[0].covered} evidence=${risks[0].evidence.length}`);
    } catch (e) {
        console.log(`ARM ${label}: throws: ${e.message.slice(0, 160)}`);
    }
}
