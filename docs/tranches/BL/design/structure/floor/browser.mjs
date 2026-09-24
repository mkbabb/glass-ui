#!/usr/bin/env node
// browser.mjs — F-10: the one browser seat. π (the pixel-floor readbacks) and Playwright
// run here and nowhere else, one run at a time on this machine, against a demo server the
// seat starts itself from the tree it judges.
//
//   node browser.mjs --root <tree> [--specs a.spec.ts,b.spec.ts] [--moved list.json]…
//                    [--project chromium-headless-new] [--pi-plant all --floors aurora,blob]
//                    [--out report.json]
//                    [--wait 1800]
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
// Bands. `--moved` takes a route's move lists: every moved file's top unit (`dock`,
// `aurora`, …) selects the specs whose file name carries it, and the π pixel floor
// (`substrate-paints-color.spec.ts`) runs on every call. `--specs` names specs outright.
//
// Verdict from the machine report, never an exit code: GREEN when every selected test
// ran and passed (at least one ran), RED otherwise. With --pi-plant the planted arm is
// read by the tree's own π verifier (pi-gate-verify --expect=planted-red over --floors),
// and GREEN means every named floor bit. Exit 0 on the expected arm, else 1.
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

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
const allSpecs = readdirSync(specsDir).filter((f) => f.endsWith(".spec.ts") && !f.startsWith("_")).sort();
const selected = new Set(all("--specs").flatMap((s) => s.split(",")).filter(Boolean));
const bands = new Set();
for (const list of all("--moved")) {
    for (const m of JSON.parse(readFileSync(list, "utf8")).moves ?? []) {
        for (const p of [m.from, m.to]) {
            const parts = p.split("/");
            const unit = parts[0] === "src" && ["components", "composables"].includes(parts[1]) ? parts[2] : parts[0] === "src" ? parts[1] : null;
            if (unit && !unit.includes(".")) bands.add(unit.replace(/^_/, ""));
        }
    }
    for (const b of bands) for (const s of allSpecs) if (s.includes(b)) selected.add(s);
}
if (!selected.size && !bands.size && !all("--specs").length) selected.add(PI_FLOOR);
selected.add(PI_FLOOR);
for (const s of selected) if (!allSpecs.includes(s)) { console.error(`browser-seat: no spec ${s} in ${specsDir}`); process.exit(2); }
const specs = [...selected].sort();

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
log(`demo server ${url} (pid ${server.pid}, cwd ${root}); ${specs.length} spec(s): ${specs.join(", ")}${bands.size ? ` [bands ${[...bands].join(", ")}]` : ""}`);

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
const verdict = plant ? (planted ? "GREEN (the planted floors bit)" : "RED (a planted floor did not bite)") : ran.length > 0 && passed.length === ran.length ? "GREEN" : "RED";
const doc = { $schema: "browser-seat/1", root, project, plant, specs, bands: [...bands], url, waitedS: waited, ranS: (Date.now() - started) / 1000, stats: r.stats, tests: tests.length, ran: ran.length, passed: passed.length, failed: failed.length, skipped: tests.length - ran.length, verdict, failures: failed.map((t) => `${t.spec} :: ${t.title}`) };
writeFileSync(out, `${JSON.stringify(doc, null, 1)}\n`);
rmSync(report, { force: true });
log(`${verdict}: ${passed.length}/${ran.length} passed, ${failed.length} failed, ${doc.skipped} skipped in ${doc.ranS.toFixed(0)}s → ${out}`);
for (const f of doc.failures) log(`  FAILED ${f}`);
process.exit(verdict.startsWith("GREEN") ? 0 : 1);
