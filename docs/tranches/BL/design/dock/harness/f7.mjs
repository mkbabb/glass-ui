// F7 · the whole unit suite on a route tree, repo gates included (H5-10, pass-5/H5.md). Engine-independent.
//
//   node f7.mjs <tree> [--out <dir>]                  run the tree's own checks, then judge them
//   node f7.mjs --report <vitest.json> [--steps <steps.json>] [--out <dir>]     judge recorded results
//   node f7.mjs --fixture pass|unitred|gatered|gateskip|tscred [--out <dir>]  the self-test's synthetic results
//
// In the tree, in order (each step's exit and the tail of its log are recorded; the run itself goes under the
// machine guard, one heavy run at a time):
//   lib        npx vite build              (the library build: dist/)
//   demo       npm run demo:dist:build     (dist-demo/, which gate:boot-graph's BUILD arm measures)
//   typecheck  npm run typecheck          (vue-tsc on the source and on the tests). After the lib build: a test that
//              imports the package by its own name (`@mkbabb/glass-ui/fourier-math`) resolves through package.json
//              exports to dist/ types, so on a fresh tree a typecheck before the build reads TS2307 (entry 2: HEAD's
//              F7 read typecheck red for that reason alone, F7-head-order1/)
//   units      npx vitest run --maxWorkers=2 --reporter=default --reporter=json --outputFile=<out>/vitest.json
// The builds come first so every gate reads a fresh build: gate:boot-graph's build arm FAILS LOUD on an absent or a
// stale dist-demo/ (tests/gates/boot-graph.test.ts), so a suite run before the builds reads that gate red for the
// wrong reason. Pass 4 read F7 from the dock suites alone and the repo's own gate:boot-graph was red on G's tree
// (508,427 B against 503,808 B, G-crit §5); F7 now reads the whole suite.
//
// Cells (engine "source"):
//   f7·typecheck   the typecheck step exits 0
//   f7·build       the lib and demo builds exit 0
//   f7·units       every test outside tests/gates/ passes (a test that is skipped is not a failure; `it.fails` passes)
//   f7·gate·<name> one per tests/gates/<name>.test.ts: every assertion passes. A gate whose assertions all skipped,
//                  or boot-graph without its "build arm" assertions run, is UNMEASURED, never PASS
// The vite caches live under the tree's own node_modules/: the seat makes <tree>/node_modules a directory of
// per-package symlinks into the checkout's, so `node_modules/.vite` is the tree's, not the checkout's.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { parseArgs, loadAvg, HERE } from "./lib.mjs";

const args = parseArgs();
const outRoot = path.resolve(args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(os.tmpdir(), "dock-harness"));
const label = args.fixture ? `fixture-${args.fixture}` : args.report ? path.basename(path.dirname(path.resolve(args.report))) : path.basename(path.resolve(args.positional[0] ?? "tree"));
const dir = path.join(outRoot, "runs", `F7-${label}`);
fs.mkdirSync(dir, { recursive: true });

let steps = {}, report = null;
if (args.fixture) {
    const f = path.join(HERE, "plants", `f7-${args.fixture}.json`);
    const fx = JSON.parse(fs.readFileSync(f, "utf8"));
    steps = fx.steps; report = fx.report;
} else if (args.report) {
    report = JSON.parse(fs.readFileSync(path.resolve(args.report), "utf8"));
    steps = args.steps ? JSON.parse(fs.readFileSync(path.resolve(args.steps), "utf8")) : {};
} else {
    const tree = path.resolve(args.positional[0] ?? "");
    if (!fs.existsSync(path.join(tree, "package.json"))) { console.error("usage: node f7.mjs <tree> | --report <vitest.json> | --fixture <name>"); process.exit(2); }
    const json = path.join(dir, "vitest.json");
    fs.rmSync(json, { force: true });
    const plan = [
        ["lib", "npx", ["vite", "build"]],
        ["demo", "npm", ["run", "demo:dist:build"]],
        ["typecheck", "npm", ["run", "typecheck"]],
        ["units", "npx", ["vitest", "run", "--maxWorkers=2", "--reporter=default", "--reporter=json", `--outputFile=${json}`]],
    ];
    for (const [k, cmd, argv] of plan) {
        const t0 = Date.now(), l0 = loadAvg();
        const r = spawnSync(cmd, argv, { cwd: tree, encoding: "utf8", maxBuffer: 1 << 28, env: { ...process.env, CI: "1", FORCE_COLOR: "0" } });
        const log = (r.stdout || "") + (r.stderr || "");
        fs.writeFileSync(path.join(dir, `${k}.log`), log);
        steps[k] = { exit: r.status, ms: Date.now() - t0, load: [l0, loadAvg()], tail: log.trim().split("\n").slice(-6).join(" | ").slice(0, 600) };
        console.log(`STEP  F7  ${k}  exit ${r.status}  ${Math.round((Date.now() - t0) / 1000)} s  [load ${l0}-${loadAvg()}]`);
    }
    fs.writeFileSync(path.join(dir, "steps.json"), JSON.stringify(steps, null, 1));
    try { report = JSON.parse(fs.readFileSync(json, "utf8")); } catch { report = null; }
}

const load = loadAvg();
const cells = [];
const add = (cell, pass, failed, summary, extra = {}, unmeasured = false) => { cells.push({ engine: "source", cell, pass, failed, unmeasured: unmeasured || undefined, summary, load, ...extra }); console.log(`${pass ? "PASS" : unmeasured ? "UNMEASURED" : "FAIL"}  F7  source  ${cell}  ${summary}  [load ${load}]`); };
const ex = (k) => steps[k]?.exit;
add("f7·typecheck", ex("typecheck") === 0, ex("typecheck") === 0 ? [] : ["typecheck"], `typecheck exit ${ex("typecheck") ?? "not run"}${ex("typecheck") ? ": " + (steps.typecheck?.tail ?? "") : ""}`);
add("f7·build", ex("lib") === 0 && ex("demo") === 0, ex("lib") === 0 && ex("demo") === 0 ? [] : ["build"], `lib build exit ${ex("lib") ?? "not run"}, demo dist build exit ${ex("demo") ?? "not run"}`);
if (!report?.testResults) add("f7·units", false, ["units"], `no vitest report (units exit ${ex("units") ?? "not run"}${steps.units?.tail ? ": " + steps.units.tail : ""})`);
else {
    const rel = (f) => f.replace(/^.*?(?=tests\/|scripts\/)/, "");
    const isGate = (f) => /(^|\/)tests\/gates\/[^/]+\.test\.ts$/.test(rel(f));
    const files = report.testResults;
    const failing = (fr) => (fr.assertionResults ?? []).filter((a) => a.status === "failed").map((a) => a.fullName ?? a.title);
    const unitFiles = files.filter((fr) => !isGate(fr.name));
    const unitBad = unitFiles.filter((fr) => fr.status === "failed" || failing(fr).length);
    const nT = unitFiles.reduce((n, fr) => n + (fr.assertionResults?.length ?? 0), 0);
    add("f7·units", unitBad.length === 0, unitBad.length ? ["units"] : [], `${unitFiles.length} test file(s) outside tests/gates/, ${nT} test(s); ${unitBad.length} file(s) failing${unitBad.length ? ": " + unitBad.slice(0, 4).map((fr) => `${rel(fr.name)} (${failing(fr).slice(0, 2).join("; ").slice(0, 160) || fr.message?.slice(0, 160) || "failed"})`).join(", ") : ""}`, { failingFiles: unitBad.map((fr) => rel(fr.name)) });
    for (const fr of files.filter((x) => isGate(x.name)).sort((a, b) => a.name.localeCompare(b.name))) {
        const name = path.basename(fr.name).replace(/\.test\.ts$/, "");
        const as = fr.assertionResults ?? [], ran = as.filter((a) => a.status === "passed" || a.status === "failed"), bad = failing(fr);
        const buildArm = as.filter((a) => (a.ancestorTitles ?? []).join(" ").includes("build arm"));
        const armSkipped = name === "boot-graph" && (!buildArm.length || buildArm.every((a) => a.status !== "passed" && a.status !== "failed"));
        const unm = !bad.length && fr.status !== "failed" && (!ran.length || armSkipped);
        add(`f7·gate·${name}`, !bad.length && fr.status !== "failed" && !unm, bad.length || fr.status === "failed" ? ["gate"] : [], `${as.length} assertion(s), ${ran.length} ran, ${bad.length} failing${bad.length ? ": " + bad.slice(0, 2).join("; ").slice(0, 300) : ""}${name === "boot-graph" ? `; build arm ${buildArm.length ? buildArm.filter((a) => a.status === "passed" || a.status === "failed").length + "/" + buildArm.length + " ran" : "ABSENT"}` : ""}${unm ? " (UNMEASURED: nothing of it ran)" : ""}`, { failing: bad.slice(0, 6) }, unm);
    }
}
fs.writeFileSync(path.join(dir, "F7.json"), JSON.stringify({ witness: "F7", target: label, when: new Date().toISOString(), load, steps, cells }, null, 1));
const red = cells.filter((c) => !c.pass && !c.unmeasured);
console.log(`${red.length ? "FAIL" : "PASS"}  F7  ${label}  ${cells.filter((c) => c.pass).length}/${cells.length} cells pass${cells.some((c) => c.unmeasured) ? `, ${cells.filter((c) => c.unmeasured).length} UNMEASURED` : ""}  (json: ${path.join(dir, "F7.json")})`);
process.exitCode = red.length ? 1 : 0;
