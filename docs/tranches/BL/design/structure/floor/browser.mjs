#!/usr/bin/env node
// browser.mjs — F-10: the one browser seat. π (the pixel-floor readbacks) and Playwright
// run here and nowhere else, one run at a time on this machine, against a demo server the
// seat starts itself from the tree it judges.
//
//   node browser.mjs --root <tree> [--specs a.spec.ts,b.spec.ts] [--moved list.json]…
//                    [--changed src/x.css]… [--base-report base.json] [--select-only]
//                    [--project chromium-headless-new] [--pi-plant all --floors aurora,blob]
//                    [--out report.json] [--wait 1800]
//
// Serialized. A machine-wide lock (a directory made atomically under the OS temp dir,
// holding its owner's pid, tree and start time) admits one run; a second waits for it
// (polling, up to --wait seconds, then refuses), and a lock whose owner is dead is taken
// over and logged. Two seats never drive browsers at once (the browser-seat singleton).
//
// Its own server. The seat spawns `vite` in the tree on a free port it chose and hands that
// origin to Playwright, so the config's `reuseExistingServer` can only ever attach to this
// seat's server, never to another session's demo on the default port.
//
// Bands, by the graph (P4-F4). The changed files are every file a `--moved` list moves (both
// its paths) and every `--changed` file a row edited; each file's band is its top unit. A
// spec of the Playwright program (F-1's `test-program` edges; `_`-prefixed capture specs
// excluded) joins a band when it, or a tests-visual helper it reads, does any of:
//   reads    has an F-1 edge to a changed file;
//   classes  names, as a whole token, a class the file's selectors (or recipes) carry, or a
//            class whose every wearer wears one of them (lib/recipes.mjs: `glass-chip` for
//            chip/accent-tone.css);
//   paths    names the file's path, its basename, or its unit dir (`components/chip/`);
//   name     carries the unit in its file name (the pass-3 rule, kept as one reason).
// The π pixel floor (`substrate-paints-color.spec.ts`) runs on every call. `--specs` names
// specs outright. `--select-only` reports the selection and exits without a browser.
//
// Base-green. With `--base-report` (this seat's report of the same specs on the base tree),
// every band reports its base-green count (tests that passed at base) and its new failures
// (base-green tests that fail now). A band with no base-green test says it has no browser
// signal: a 0-new-failure delta there is not evidence.
//
// Verdict from the machine report, never an exit code: without a base report, GREEN when
// every selected test ran and passed (at least one ran); with one, GREEN when no base-green
// test failed and every selected test ran. With --pi-plant the planted arm is read by the
// tree's own π verifier (pi-gate-verify --expect=planted-red over --floors), and GREEN means
// every named floor bit. Exit 0 on the expected arm, else 1.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, join, posix, resolve } from "node:path";
import { buildGraph } from "./lib/graph.mjs";
import { zoneOf } from "./lib/tree.mjs";
import { classOwners, classRecipes, classesOf, impliedBy } from "./lib/recipes.mjs";

const args = process.argv.slice(2);
const all = (k) => args.flatMap((a, i) => (a === k ? [args[i + 1]] : []));
const opt = (k) => all(k)[0] ?? null;
const root = resolve(opt("--root") ?? process.cwd());
const project = opt("--project") ?? "chromium-headless-new";
const plant = opt("--pi-plant");
const waitS = Number(opt("--wait") ?? 1800);
const out = resolve(opt("--out") ?? join(root, "tests-visual/.cache/browser-seat.json"));
const LOCK = join(tmpdir(), "glass-ui-browser-seat.lock");
const PI_FLOOR = "substrate-paints-color.spec.ts";
const log = (m) => console.log(`[browser-seat ${new Date().toISOString()}] ${m}`);

// ---- the spec selection -------------------------------------------------------------
const specsDir = join(root, "tests-visual");
const g = buildGraph(root);
const programSpecs = [...new Set(g.edges.filter((e) => e.kind === "test-program" && e.via === "glob" && e.to).map((e) => e.to))]
    .filter((f) => !basename(f).startsWith("_")).sort();
const allSpecs = programSpecs.map((f) => posix.relative("tests-visual", f));
const unitOf = (p) => {
    const parts = p.split("/");
    const unit = parts[0] === "src" && ["components", "composables"].includes(parts[1]) ? parts[2] : parts[0] === "src" ? parts[1] : null;
    return unit && !unit.includes(".") ? unit.replace(/^_/, "") : unit ? unit.replace(/\.[^.]+$/, "") : null;
};
const changed = []; // { path (in this tree), paths (every name it had), band }
for (const list of all("--moved")) for (const m of JSON.parse(readFileSync(list, "utf8")).moves ?? []) {
    const here = g.tree.isFile(m.to) ? m.to : m.from;
    changed.push({ path: here, paths: [m.from, m.to], band: unitOf(m.from) ?? unitOf(m.to) });
}
for (const p of all("--changed")) changed.push({ path: p, paths: [p], band: unitOf(p) });
const selected = new Map(); // spec → { bands: Set, reasons: [] }
const pick = (spec, band, reason) => {
    if (!selected.has(spec)) selected.set(spec, { bands: new Set(), reasons: [] });
    const s = selected.get(spec);
    if (band) s.bands.add(band);
    if (reason) s.reasons.push(reason);
};
for (const s of all("--specs").flatMap((x) => x.split(",")).filter(Boolean)) pick(s, null, "named");
if (changed.length) {
    const recipes = classRecipes(g.tree);
    const own = classOwners(g.tree);
    // what each spec reads: its own text and edges, and those of the tests-visual helpers it reaches
    const reach = new Map();
    for (const spec of programSpecs) {
        const seen = new Set([spec]);
        const queue = [spec];
        const reads = new Set();
        while (queue.length) {
            const f = queue.shift();
            for (const e of g.refsOf.get(f) ?? []) {
                if (!e.to || e.dir) continue;
                reads.add(e.to);
                if (zoneOf(e.to) === "tests-visual" && !programSpecs.includes(e.to) && !seen.has(e.to) && /\.(ts|mts|js|mjs)$/.test(e.to)) { seen.add(e.to); queue.push(e.to); }
            }
        }
        reach.set(spec, { reads, text: [...seen].map((f) => { try { return g.tree.read(f); } catch { return ""; } }).join("\n") });
    }
    const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (const c of changed) {
        const own0 = g.tree.isFile(c.path) ? classesOf(g.tree, c.path, own, recipes) : new Set();
        const classes = new Set([...own0, ...impliedBy(own0, recipes, own.owners)]);
        const classRe = classes.size ? new RegExp(`(?<![-\\w])(${[...classes].map(esc).join("|")})(?![-\\w])`) : null;
        const needles = [...new Set([...c.paths, ...c.paths.map((p) => basename(p)), ...(c.band && c.path.startsWith("src/components/") ? [`components/${c.path.split("/")[2]}/`] : [])])];
        c.classes = [...classes].sort();
        for (const spec of programSpecs) {
            const name = posix.relative("tests-visual", spec);
            const { reads, text } = reach.get(spec);
            const r = [];
            if (c.paths.some((p) => reads.has(p))) r.push("reads");
            const hit = classRe && classRe.exec(text);
            if (hit) r.push(`classes(.${hit[1]})`);
            const needle = needles.find((n) => text.includes(n));
            if (needle) r.push(`paths(${needle})`);
            if (c.band && basename(name).includes(c.band)) r.push("name");
            if (r.length) pick(name, c.band, `${c.path}: ${r.join(" ")}`);
        }
    }
}
pick(PI_FLOOR, null, "the π pixel floor (every call)");
for (const s of selected.keys()) if (!allSpecs.includes(s)) { console.error(`browser-seat: no spec ${s} in the Playwright program under ${specsDir}`); process.exit(2); }
const specs = [...selected.keys()].sort();
const selection = specs.map((s) => ({ spec: s, bands: [...selected.get(s).bands], reasons: selected.get(s).reasons }));
const bandNames = [...new Set(changed.map((c) => c.band).filter(Boolean))].sort();
if (args.includes("--select-only")) {
    const doc = { $schema: "browser-seat-selection/1", root, changed: changed.map(({ path, paths, band, classes }) => ({ path, paths, band, classes })), bands: bandNames.map((b) => ({ band: b, specs: selection.filter((x) => x.bands.includes(b)).map((x) => x.spec) })), specs, selection };
    writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
    for (const b of doc.bands) log(`band ${b.band}: ${b.specs.length} spec(s)${b.specs.length ? `: ${b.specs.join(", ")}` : " (no spec reads it)"}`);
    log(`${specs.length} spec(s) selected → ${out}`);
    process.exit(0);
}

// ---- the lock ------------------------------------------------------------------------
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };
function acquire() {
    const t0 = Date.now();
    for (;;) {
        try {
            mkdirSync(LOCK);
            writeFileSync(join(LOCK, "owner.json"), JSON.stringify({ pid: process.pid, root, specs, started: new Date().toISOString() }));
            return (Date.now() - t0) / 1000;
        } catch (e) {
            if (e.code !== "EEXIST") throw e;
            let owner = null;
            try { owner = JSON.parse(readFileSync(join(LOCK, "owner.json"), "utf8")); } catch { /* being written */ }
            if (owner && !alive(owner.pid)) { log(`stale lock of dead pid ${owner.pid} (${owner.root}) taken over`); rmSync(LOCK, { recursive: true, force: true }); continue; }
            if ((Date.now() - t0) / 1000 > waitS) { console.error(`browser-seat: the seat is held by pid ${owner?.pid} (${owner?.root}) past --wait ${waitS}s; refusing`); process.exit(3); }
            execFileSync("sleep", ["2"]);
        }
    }
}
const release = () => { try { const o = JSON.parse(readFileSync(join(LOCK, "owner.json"), "utf8")); if (o.pid === process.pid) rmSync(LOCK, { recursive: true, force: true }); } catch { /* not ours */ } };

// ---- the server ----------------------------------------------------------------------
const freePort = () => new Promise((ok, no) => { const s = createServer(); s.unref(); s.on("error", no); s.listen(0, "localhost", () => { const { port } = s.address(); s.close(() => ok(port)); }); });
async function up(url, ms) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        try { const r = await fetch(url); if (r.ok) return true; } catch { /* not yet */ }
        await new Promise((r) => setTimeout(r, 500));
    }
    return false;
}

const waited = acquire();
let server = null;
const stop = () => { if (server && server.exitCode === null) { try { process.kill(-server.pid, "SIGTERM"); } catch { /* gone */ } } release(); };
process.on("exit", stop);
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => { stop(); process.exit(130); });
log(`seat acquired after ${waited.toFixed(1)}s: ${root}`);
const started = Date.now();
const port = await freePort();
const url = `http://localhost:${port}`;
server = spawn(join(root, "node_modules/.bin/vite"), ["--host", "localhost", "--port", String(port), "--strictPort"], { cwd: root, env: { ...process.env, BROWSER: "none" }, stdio: ["ignore", "ignore", "pipe"], detached: true });
let serverErr = "";
server.stderr.on("data", (d) => { serverErr += d; });
if (!(await up(url, 120_000))) { console.error(`browser-seat: the demo server on ${url} did not come up\n${serverErr.slice(-800)}`); process.exit(4); }
log(`demo server ${url} (pid ${server.pid}, cwd ${root}); ${specs.length} spec(s): ${specs.join(", ")}${bandNames.length ? ` [bands ${bandNames.join(", ")}]` : ""}`);

// ---- the run -------------------------------------------------------------------------
const report = join(specsDir, ".cache", `browser-seat-${process.pid}.json`);
mkdirSync(join(specsDir, ".cache"), { recursive: true });
const env = { ...process.env, GLASS_UI_DEMO_PORT: String(port), GLASS_UI_DEMO_URL: url, PI_REPORT: report };
if (plant) env.PI_PLANT = plant;
try {
    execFileSync(join(root, "node_modules/.bin/playwright"), ["test", ...specs, `--project=${project}`], { cwd: specsDir, env, stdio: "inherit", maxBuffer: 1 << 28 });
} catch { /* the verdict is the report's, never the exit code */ }
if (!existsSync(report)) { console.error(`browser-seat: no machine report at ${report}; RED`); process.exit(1); }
const r = JSON.parse(readFileSync(report, "utf8"));
const tests = [];
const walk = (suite) => {
    for (const s of suite.specs ?? []) for (const t of s.tests ?? []) tests.push({ spec: basename(s.file ?? suite.file ?? ""), title: s.title, status: t.status, results: (t.results ?? []).map((x) => x.status) });
    for (const c of suite.suites ?? []) walk(c);
};
for (const s of r.suites ?? []) walk(s);
const ran = tests.filter((t) => t.status !== "skipped");
const passed = ran.filter((t) => t.status === "expected");
const failed = ran.filter((t) => t.status === "unexpected");
// the planted arm is judged by the tree's own π verifier over the named floors (a plant
// bites only the floors it targets; every other test is expected to pass)
let planted = null;
if (plant) {
    const floors = opt("--floors");
    if (!floors) { console.error("browser-seat: --pi-plant needs --floors (the floors the plant must bite)"); process.exit(2); }
    try {
        execFileSync("node", [join(specsDir, "pi-gate-verify.mjs"), "--expect=planted-red", `--report=${report}`, `--floors=${floors}`, `--plant=${plant}`], { cwd: specsDir, encoding: "utf8" });
        planted = true;
    } catch (e) { planted = false; process.stdout.write(String(e.stdout ?? "")); }
}
// base-green (P4-F4): a band's signal is the tests that passed on the base tree
const key = (t) => `${t.spec} :: ${t.title}`;
const base = opt("--base-report") ? JSON.parse(readFileSync(opt("--base-report"), "utf8")) : null;
const baseGreen = base ? new Set((base.results ?? []).filter((t) => t.status === "expected").map(key)) : null;
const nowStatus = new Map(tests.map((t) => [key(t), t.status]));
const newFailures = baseGreen ? [...baseGreen].filter((k) => specs.includes(k.split(" :: ")[0]) && nowStatus.get(k) !== "expected") : [];
const bandReport = bandNames.map((b) => {
    const bs = selection.filter((x) => x.bands.includes(b)).map((x) => x.spec);
    const green = baseGreen ? [...baseGreen].filter((k) => bs.includes(k.split(" :: ")[0])) : null;
    return { band: b, specs: bs, baseGreen: green ? green.length : null, newFailures: green ? green.filter((k) => nowStatus.get(k) !== "expected") : null, signal: !green ? "no base report" : green.length ? "signal" : "no browser signal" };
});
const everyRan = ran.length > 0; // a skip the spec declares is not a failure
const verdict = plant ? (planted ? "GREEN (the planted floors bit)" : "RED (a planted floor did not bite)") : base ? (everyRan && newFailures.length === 0 ? "GREEN" : "RED") : ran.length > 0 && passed.length === ran.length ? "GREEN" : "RED";
const doc = { $schema: "browser-seat/1", root, project, plant, specs, selection, bands: bandReport, url, waitedS: waited, ranS: (Date.now() - started) / 1000, stats: r.stats, tests: tests.length, ran: ran.length, passed: passed.length, failed: failed.length, skipped: tests.length - ran.length, verdict, baseReport: base ? opt("--base-report") : null, newFailures, failures: failed.map(key), results: tests.map(({ spec, title, status }) => ({ spec, title, status })) };
writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
rmSync(report, { force: true });
log(`${verdict}: ${passed.length}/${ran.length} passed, ${failed.length} failed, ${doc.skipped} skipped in ${doc.ranS.toFixed(0)}s → ${out}`);
for (const b of bandReport) log(`  band ${b.band}: ${b.specs.length} spec(s), base-green ${b.baseGreen ?? "—"}, new failures ${b.newFailures?.length ?? "—"}${b.signal === "no browser signal" ? " — NO BROWSER SIGNAL" : ""}`);
for (const f of doc.failures) log(`  FAILED ${f}${baseGreen?.has(f) ? " (NEW: green at base)" : ""}`);
process.exit(verdict.startsWith("GREEN") ? 0 : 1);
