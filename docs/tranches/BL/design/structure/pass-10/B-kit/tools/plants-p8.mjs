#!/usr/bin/env node
// plants-p8.mjs — pass 8's plant battery (§P7-6.4). Nothing is written to the trees it reads:
// gate plants are in-memory overlays; a CLI plant whose throw must happen while the gate's
// modules evaluate runs a COPY of the floor runtime (scripts/structure, package.json) under the
// OS temp dir, which it removes; tally plants rewrite committed reports into the temp dir.
//   node tools/plants-p8.mjs --root <migrated, built tree> --unbuilt <migrated, unbuilt tree>
//        --reports <dir holding base-rekeyed.json, route.json, selection.json> --out <json>
// Plants:
//   EXIT   every phase the gate passes through, each exits 2 with `seal: no verdict` (S-14):
//          module evaluation (a package.json that does not parse; the floor runtime, the clause
//          module and B18's reader each throwing as it loads), the run (an overlay that is not
//          JSON, a refused option, a --root that names nothing, a missing pin, B18's table
//          gone), record write (--json and --write-pin under a regular file); the clean tree 0;
//          a RED overlay 1
//   KF     the peer class through the gate (P7-R1), each against the clean verdict: KF-new
//          (./motion-core publishes a new keyframes.js leaf), KF-existing (it publishes
//          useSpring), KF-leaf (a leaf it publishes gains a keyframes.js import), KF-deep (that
//          leaf imports a new file that imports keyframes.js), KF-root (a root name, Badge,
//          gains one: the root's held breaks do not hide a new name), KF-vueuse (a ./motion-core
//          leaf gains @vueuse/core) — B18; KF-CTL (the leaf loads vue) — nothing
//   PROBE  the peer probe on the unbuilt tree: exit 2, `the build is missing`; on the built tree
//          against the base report: exit 0
//   TALLY  browser-tally on rewritten copies of the committed reports: a base-green key removed
//          from the route report (ABSENT, RED, exit 1); a key failing a base rerun (FLAKY, out of
//          the bar); a key failing only on the route with the base passing every rerun (NEW,
//          RED); the reports unchanged (GREEN or the committed verdict)
//   SELECT the moved specs the graph's bands do not select (`browser.mjs --select-only`
//          without --specs) are selected by name (with specs.txt): w38-binding among them
import { spawnSync } from "node:child_process";
import { appendFileSync, cpSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { arg } from "../lib/floor.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const unbuilt = resolve(arg(args, "--unbuilt"));
const reports = resolve(arg(args, "--reports"));
const out = resolve(arg(args, "--out"));
const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CLI = "scripts/structure/seal/seal.mjs";
const { seal } = await import(pathToFileURL(join(root, "scripts/structure/seal/index.mjs")).href);
const read = (p) => readFileSync(join(root, p), "utf8");
const results = [];
const note = (r) => { results.push(r); console.log(`${r.ok ? "PASS" : "FAIL"} ${r.kind} ${r.id}: ${r.read}`); };
const tmp = mkdtempSync(join(tmpdir(), "p8-plants-"));
const node = (cli, a, cwd) => spawnSync(process.execPath, [cli, ...a], { encoding: "utf8", maxBuffer: 1 << 27, cwd });

try {
    // ---- EXIT: every phase
    const copy = (name, mutate) => {
        const r = join(tmp, name);
        cpSync(join(root, "scripts/structure"), join(r, "scripts/structure"), { recursive: true });
        writeFileSync(join(r, "package.json"), read("package.json"));
        mutate?.(r);
        return r;
    };
    const bad = join(tmp, "bad.json"), red = join(tmp, "red.json"), noREADME = join(tmp, "noreadme.json");
    writeFileSync(bad, "{ not json");
    writeFileSync(red, JSON.stringify({ "demo/zqSealExit.ts": 'import "../src/components/dock/GlassDock.vue";\n' }));
    writeFileSync(noREADME, JSON.stringify({ "src/README.md": read("src/README.md").replace("Heavy-peer exclusions", "Heavy-peer table, renamed") }));
    const exits = [
        { id: "clean tree", cli: join(root, CLI), a: ["--root", root], expect: 0 },
        { id: "a RED overlay (a demo import of a private file)", cli: join(root, CLI), a: ["--root", root, "--overlay", red], expect: 1 },
        { id: "import: package.json does not parse", cli: join(copy("pkg", (r) => writeFileSync(join(r, "package.json"), '{ "name": "@mkbabb/glass-ui", BROKEN\n')), CLI), a: ["--root", root], expect: 2 },
        { id: "import: a floor module throws as it loads (lib/tree/tree.mjs; pass 10: S74d moved it from lib/tree.mjs)", cli: join(copy("tree", (r) => appendFileSync(join(r, "scripts/structure/lib/tree/tree.mjs"), '\nthrow new Error("zq8: the floor throws as it loads");\n')), CLI), a: ["--root", root], expect: 2, msg: "zq8: the floor throws" },
        { id: "import: the clause module throws as it loads", cli: join(copy("clauses", (r) => appendFileSync(join(r, "scripts/structure/seal/clauses.mjs"), '\nthrow new Error("zq8: clauses throw as they load");\n')), CLI), a: ["--root", root], expect: 2, msg: "zq8: clauses throw" },
        { id: "import: B18's reader throws as it loads", cli: join(copy("peer", (r) => appendFileSync(join(r, "scripts/structure/seal/peer.mjs"), '\nthrow new Error("zq8: peer throws as it loads");\n')), CLI), a: ["--root", root], expect: 2, msg: "zq8: peer throws" },
        { id: "run: an overlay that is not JSON", cli: join(root, CLI), a: ["--root", root, "--overlay", bad], expect: 2 },
        { id: "run: a refused option (--pin)", cli: join(root, CLI), a: ["--root", root, "--pin", "x.json"], expect: 2 },
        { id: "run: --root names nothing", cli: join(root, CLI), a: ["--root", join(tmp, "does-not-exist")], expect: 2 },
        { id: "run: the pin is missing", cli: join(root, CLI), a: ["--root", copy("nopin", (r) => unlinkSync(join(r, "scripts/structure/records/seal-pin.json")))], expect: 2, msg: "is missing" },
        { id: "run: B18's table is gone from src/README.md", cli: join(root, CLI), a: ["--root", root, "--overlay", noREADME], expect: 2, msg: "Heavy-peer exclusions" },
        { id: "record write: --json under a regular file", cli: join(root, CLI), a: ["--root", root, "--json", join(bad, "v.json")], expect: 2 },
        { id: "record write: --write-pin under a regular file", cli: join(root, CLI), a: ["--root", root, "--write-pin", join(bad, "pin.json")], expect: 2 },
    ];
    for (const e of exits) {
        const run = node(e.cli, e.a);
        const loud = e.expect !== 2 || (run.stderr.includes("seal: no verdict") && (!e.msg || run.stderr.includes(e.msg)));
        const first = run.stderr.split("\n").find((l) => l.trim()) ?? "";
        note({ kind: "EXIT", id: e.id, expect: e.expect, exit: run.status, ok: run.status === e.expect && loud, read: `exit ${run.status} (expect ${e.expect})${e.expect === 2 ? ` · ${first.slice(0, 140)}` : ""}` });
    }

    // ---- KF: the peer class through the gate
    const clean = seal(root, {});
    const mc = "src/composables/motion/motion-core.ts", leaf = "src/composables/motion/core/useYieldToMain.ts";
    const kf = [
        { id: "KF-new: ./motion-core publishes a new keyframes.js leaf", files: { "src/composables/motion/core/zqKf.ts": 'import { SmoothProgress } from "@mkbabb/keyframes.js";\nexport const zqKf = () => SmoothProgress;\n', [mc]: `${read(mc)}export { zqKf } from "./core/zqKf";\n` }, expect: "B18", line: "./motion-core (declared free of @mkbabb/keyframes.js)" },
        { id: "KF-existing: ./motion-core publishes useSpring", files: { [mc]: `${read(mc)}export { useSpring } from "./spring";\n` }, expect: "B18", line: "./motion-core (declared free of @mkbabb/keyframes.js)" },
        { id: "KF-leaf: a leaf ./motion-core publishes gains a keyframes.js import", files: { [leaf]: `import "@mkbabb/keyframes.js";\n${read(leaf)}` }, expect: "B18", only: true, line: "./motion-core (declared free of @mkbabb/keyframes.js)" },
        { id: "KF-deep: that leaf imports a new file that imports keyframes.js", files: { "src/composables/motion/core/zqDeep.ts": 'import "@mkbabb/keyframes.js";\nexport const zqDeep = 1;\n', [leaf]: `import "./zqDeep";\n${read(leaf)}` }, expect: "B18", line: "./motion-core (declared free of @mkbabb/keyframes.js)" },
        { id: "KF-root: Badge, on the root, gains a keyframes.js import (the root's holds do not hide a new name)", files: { "src/components/badge/badgeVariants.ts": `import "@mkbabb/keyframes.js";\n${read("src/components/badge/badgeVariants.ts")}` }, expect: "B18", only: true, line: ". (declared free of @mkbabb/keyframes.js) publishes a name whose module reaches it: Badge" },
        { id: "KF-vueuse: a ./motion-core leaf gains @vueuse/core", files: { [leaf]: `import "@vueuse/core";\n${read(leaf)}` }, expect: "B18", only: true, line: "./motion-core (declared free of @vueuse/core)" },
        { id: "KF-CTL: the same leaf loads vue only", files: { [leaf]: `import "vue";\n${read(leaf)}` }, expect: null },
    ];
    for (const p of kf) {
        let r, error = null;
        try { r = seal(root, { overlay: p.files }); } catch (e) { error = e.message; }
        const redSet = r ? Object.keys(r.counts).filter((k) => r.counts[k] > (clean.counts[k] ?? 0)) : [];
        const lines = r ? r.V.B18 : [];
        const ok = !error && (p.expect ? redSet.includes(p.expect) && (!p.only || redSet.length === 1) && lines.some((l) => l.startsWith(p.line)) : !redSet.includes("B18"));
        note({ kind: "KF", id: p.id, red: redSet, b18: lines, ok, read: `red [${redSet.join(",")}]${error ? ` error ${error}` : ""}${lines.length ? ` · ${lines[0].slice(0, 150)}` : ""}` });
    }

    // ---- PROBE: the dist arm on an unbuilt tree, and on the built one
    const PROBE = join(KIT, "tools/peer-closure.mjs"), BASE = join(KIT, "results/p10/peer-closure-base.json");
    const pu = node(PROBE, ["--root", unbuilt, "--base", BASE]);
    note({ kind: "PROBE", id: "the probe on an unbuilt tree", exit: pu.status, ok: pu.status === 2 && pu.stderr.includes("the build is missing"), read: `exit ${pu.status} · ${(pu.stderr.split("\n")[0] ?? "").slice(0, 160)}` });
    const pb = node(PROBE, ["--root", root, "--base", BASE]);
    note({ kind: "PROBE", id: "the probe on the built tree", exit: pb.status, ok: pb.status === 0 && /peer-closure: GREEN/.test(pb.stdout), read: `exit ${pb.status} · ${pb.stdout.trim().split("\n").at(-1)}` });

    // ---- TALLY: rewritten copies of the committed reports
    const TALLY = join(KIT, "tools/browser-tally.mjs");
    const B = JSON.parse(readFileSync(join(reports, "base-rekeyed.json"), "utf8")), R = JSON.parse(readFileSync(join(reports, "route.json"), "utf8"));
    const w = (name, doc) => { const p = join(tmp, name); writeFileSync(p, JSON.stringify(doc)); return p; };
    const tally = (a) => { const t = node(TALLY, a); return { exit: t.status, out: t.stdout, err: t.stderr }; };
    const asIs = tally(["--base", join(reports, "base-rekeyed.json"), "--route", join(reports, "route.json")]);
    const greenKey = (rep, pred = () => true) => rep.results.find((x) => x.status === "expected" && pred(x) && R.results.some((y) => y.spec === x.spec && y.title === x.title && y.status === "expected"));
    const g1 = greenKey(B);
    const routeMinus = w("route-minus.json", { ...R, results: R.results.filter((x) => !(x.spec === g1.spec && x.title === g1.title)) });
    const t1 = tally(["--base", join(reports, "base-rekeyed.json"), "--route", routeMinus]);
    note({ kind: "TALLY", id: "a base-green key removed from the route report", exit: t1.exit, ok: t1.exit === 1 && t1.out.includes(`ABSENT ${g1.spec} :: ${g1.title} #1`), read: `exit ${t1.exit} · ${t1.out.split("\n").find((l) => l.startsWith("ABSENT")) ?? "no ABSENT line"}` });
    const g2 = greenKey(B, (x) => x !== g1 && x.spec !== g1.spec);
    const flip = (rep, k, s) => ({ ...rep, results: rep.results.map((x) => (x.spec === k.spec && x.title === k.title ? { ...x, status: s } : x)) });
    const routeFail = w("route-fail.json", flip(R, g2, "unexpected"));
    const baseRerunFail = w("base-rerun-fail.json", { ...flip(B, g2, "unexpected"), results: flip(B, g2, "unexpected").results.filter((x) => x.spec === g2.spec) });
    const baseRerunPass = w("base-rerun-pass.json", { ...B, results: B.results.filter((x) => x.spec === g2.spec) });
    const routeRerun = w("route-rerun.json", { ...R, results: flip(R, g2, "unexpected").results.filter((x) => x.spec === g2.spec) });
    const t2 = tally(["--base", join(reports, "base-rekeyed.json"), "--route", routeFail, "--base-rerun", baseRerunPass, "--route-rerun", routeRerun, "--base-rerun", baseRerunFail, "--route-rerun", routeRerun]);
    note({ kind: "TALLY", id: "a key that fails a base rerun is flaky, out of the bar", exit: t2.exit, ok: t2.out.includes(`FLAKY ${g2.spec} :: ${g2.title} #1`) && !t2.out.includes(`NEW ${g2.spec} :: ${g2.title}`), read: `exit ${t2.exit} · ${t2.out.split("\n").find((l) => l.startsWith("FLAKY")) ?? "no FLAKY line"}` });
    const t3 = tally(["--base", join(reports, "base-rekeyed.json"), "--route", routeFail, "--base-rerun", baseRerunPass, "--route-rerun", routeRerun, "--base-rerun", baseRerunPass, "--route-rerun", routeRerun]);
    note({ kind: "TALLY", id: "a key the base passes in every run and the route fails is new", exit: t3.exit, ok: t3.exit === 1 && t3.out.includes(`NEW ${g2.spec} :: ${g2.title} #1`), read: `exit ${t3.exit} · ${t3.out.split("\n").find((l) => l.startsWith("NEW")) ?? "no NEW line"}` });
    note({ kind: "TALLY", id: "the committed reports as they are", exit: asIs.exit, ok: asIs.exit === 0 || asIs.exit === 1, read: `exit ${asIs.exit} · ${asIs.out.split("\n").find((l) => l.startsWith("verdict")) ?? asIs.err.slice(0, 160)}` });

    // ---- SELECT: band-less moved specs are selected by name
    const sel = JSON.parse(readFileSync(join(reports, "selection.json"), "utf8"));
    const byName = sel.selection.filter((s) => !s.bands.length && s.reasons.every((r) => r === "named"));
    const CH = readFileSync(join(reports, "changed.txt"), "utf8").split("\n").filter(Boolean).flatMap((p) => ["--changed", p]);
    const noNames = join(tmp, "select-without-specs.json");
    const s0 = node(join(root, "scripts/structure/browser.mjs"), ["--root", root, "--moved", join(reports, "moved.json"), ...CH, "--select-only", "--out", noNames], root);
    const without = s0.status === 0 ? JSON.parse(readFileSync(noNames, "utf8")).specs : [];
    const missed = byName.map((s) => s.spec).filter((s) => !without.includes(s));
    note({ kind: "SELECT", id: "a moved spec no band selects is selected by name", ok: s0.status === 0 && missed.includes("tests-visual/aurora/w38-binding.spec.ts") && missed.every((s) => sel.specs.includes(s)), read: `bands alone select ${without.length}; by name ${sel.specs.length}; selected only by name ${missed.length}: ${missed.join(", ")}` });
} finally { rmSync(tmp, { recursive: true, force: true }); }

const summary = { plants: results.length, passed: results.filter((r) => r.ok).length, results };
writeFileSync(out, `${JSON.stringify(summary, null, 1)}\n`);
console.log(`battery ${summary.passed}/${summary.plants}`);
process.exitCode = summary.passed === summary.plants ? 0 : 1;
