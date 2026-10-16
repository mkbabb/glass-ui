#!/usr/bin/env node
// fd4-probe.mjs --root <tree> [--report <browser-seat/2 report>] · critique-B pass 6 · S-10 (P6-F2), §P5-8.4.
// Written and hashed BEFORE reading pass-6/B-kit or B-proto.md. It calls the tree's own FD-4 coverage arm
// (scripts/structure/cascade.mjs coverRisks) with pass 4's risky pair (--accent-band-strength on .accent-tone x
// .glass-chip). The report is the seat's own when --report is given (preferred); otherwise one is built in the
// browser-seat/2 shape FLOOR-P6 §1 states (results and bands keyed by the spec's path from the config's testDir).
//   A   the carved chip readback spec, where the tree holds it: expect covered=true
//   G   the same report after the spec file is MOVED out from under it (renamed in place): expect a loud throw naming it
//   G2  the spec deleted outright: expect a loud throw
//   U   the same report with no $schema: expect a throw (an unversioned report is never read)
// The spec is restored byte-for-byte before exit. Prints `FD4 <arm> <PASS|FAIL> <detail>`.
import { readFileSync, writeFileSync, renameSync, existsSync, readdirSync } from "node:fs";
import { join, resolve, dirname, posix, relative } from "node:path";
import { pathToFileURL } from "node:url";

const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const root = resolve(arg("--root"));
const S = (p) => pathToFileURL(join(root, "scripts/structure", p)).href;
const C = await import(S("cascade.mjs"));
const R = await import(S("lib/recipes.mjs"));
const T = await import(S("lib/tree/tree.mjs"));
// amendment 1: the landed floor runtime publishes SEAT_REPORT through its lib door (lib/index.mjs), not lib/scan/
const PW = await import(S("lib/index.mjs"));
// find the readback spec: a program-shaped visual file that names both --accent-band-strength and glass-chip
const cands = [];
(function walk(d) { for (const e of readdirSync(join(root, d), { withFileTypes: true })) {
    if (["node_modules", ".git", "dist", "dist-demo", "docs"].includes(e.name) || e.isSymbolicLink()) continue;
    const p = d ? `${d}/${e.name}` : e.name;
    if (e.isDirectory()) walk(p); else if (/\.(visual|spec)\.ts$/.test(p)) { const t = readFileSync(join(root, p), "utf8"); if (/--accent-band-strength/.test(t) && /glass-chip/.test(t)) cands.push(p); }
} })("");
console.log(`readback candidates: ${cands.join(", ") || "none"}`);
const SPEC = cands.find((p) => p.includes("/chip/")) ?? cands[0];
if (!SPEC) { console.log("FD4 A FAIL no spec on the tree reads --accent-band-strength on .glass-chip"); process.exit(1); }
let report;
if (arg("--report")) report = JSON.parse(readFileSync(resolve(arg("--report")), "utf8"));
else {
    const cfg = ["playwright.config.ts", "tests-visual/playwright.config.ts"].find((c) => existsSync(join(root, c)));
    const td = (readFileSync(join(root, cfg), "utf8").match(/testDir\s*:\s*["'`]([^"'`]+)["'`]/) || [])[1] ?? ".";
    const testDir = posix.normalize(posix.join(posix.dirname(cfg), td));
    const key = posix.relative(testDir, SPEC);
    report = { $schema: PW.SEAT_REPORT, root, testDir, baseReport: true, results: [{ spec: key, title: "readback", status: "expected" }], bands: [{ band: "chip", specs: [key], baseGreen: 1 }], newFailures: [] };
    console.log(`built report: config ${cfg} testDir=${testDir} key=${key}`);
}
const run = (rep) => {
    const tree = T.openTree(root); const { owners } = R.classOwners(tree); const recipes = R.classRecipes(tree);
    const risks = [{ props: ["--accent-band-strength"], classes: ["accent-tone", "glass-chip"] }];
    try { C.coverRisks(risks, [rep], tree, { recipes, owners }); } catch (e) { return { threw: String(e.message) }; }
    return { covered: risks[0].covered, evidence: risks[0].evidence.length, refuted: (risks[0].refuted ?? []).length };
};
let ok = true;
const say = (arm, pass, d) => { ok &&= pass; console.log(`FD4 ${arm} ${pass ? "PASS" : "FAIL"} ${d}`); };
const a = run(report); say("A", a.covered === true, JSON.stringify(a));
const abs = join(root, SPEC), away = `${abs}.crit-moved`;
const bytes = readFileSync(abs);
renameSync(abs, away);
try {
    const g = run(report); say("G", !!g.threw && g.threw.includes(posix.basename(SPEC)), JSON.stringify(g));
} finally { renameSync(away, abs); }
renameSync(abs, away);
try { const g2 = run(report); say("G2", !!g2.threw, JSON.stringify(g2)); } finally { renameSync(away, abs); }
const u = run({ ...report, $schema: undefined }); say("U", !!u.threw, JSON.stringify(u));
say("RESTORE", readFileSync(abs).equals(bytes), SPEC);
process.exit(ok ? 0 : 1);
