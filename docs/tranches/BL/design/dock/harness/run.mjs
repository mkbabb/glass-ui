// run.mjs: every witness against one build, then a table (H2; H3 adds ST stall.mjs and FM film.mjs,
// and an OWNER-BLOCKED column: cells whose only failure waits on Q-12 or Q-4, never counted).
//
//   node run.mjs --build <dir> [--adapter <file>] [--out <dir>] [--only W1,W2] [--no-unshimmed] [--safari]
//
// Witnesses run one after another (timing is load-sensitive; other seats' browsers
// count). For a build whose adapter carries the WebKit crash shim, every witness runs
// in Chromium and Playwright WebKit +shim, then AGAIN in Playwright WebKit without the
// shim, so every WebKit cell records its unshimmed result beside the shimmed one (the
// crash is never masked). --safari adds the H-8 target, which reports UNMEASURED until
// the owner ticks the checkbox. The adapter is linted first (H-6). Exits non-zero when
// any witness fails in the shimmed pass.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HERE, parseArgs, outDir, loadAvg, counts } from "./lib.mjs";

const args = parseArgs();
if (!args.build) { console.error("usage: node run.mjs --build <dir> [--adapter <file>] [--out <dir>] [--only W1,W2] [--no-unshimmed] [--safari]"); process.exit(2); }
const SCRIPT = { W1: "w1-corner.mjs", W2: "w2-run.mjs", W3: "w3-morph.mjs", W4: "w4-state.mjs", W5: "w5-rim.mjs", W6: "w6-collapsed-form.mjs", W7: "w7-edge.mjs", W8: "w8-motion.mjs", R6: "r6-probe.mjs", ST: "stall.mjs", FM: "film.mjs", R5: "r5-hit.mjs", CF: "c-facility.mjs", L1: "l1-light.mjs" };   // H4: PR (prose.mjs) reads a source tree, not a build: pass-4/H4-baseline.sh runs it
const only = args.only ? String(args.only).split(",") : Object.keys(SCRIPT);
const adapterFile = args.adapter ?? path.join(HERE, "adapter-head.mjs");
const law = spawnSync(process.execPath, [path.join(HERE, "adapter-law.mjs"), adapterFile], { encoding: "utf8" });
process.stdout.write(law.stdout);
const adapter = await import(pathToFileURL(path.resolve(adapterFile)).href);
const passes = [{ label: "chromium, webkit+shim", engine: "chromium,webkit", extra: [] }];
if (adapter.webkitShim && !args["no-unshimmed"]) passes.push({ label: "webkit unshimmed", engine: "webkit", extra: ["--no-webkit-shim"] });
const table = [];
for (const w of only) {
    for (const p of passes) {
        const argv = [path.join(HERE, SCRIPT[w]), "--build", args.build, "--engine", p.engine, ...p.extra];
        for (const k of ["adapter", "out"]) if (args[k]) argv.push("--" + k, args[k]);
        const t0 = Date.now(), load0 = loadAvg();
        const r = spawnSync(process.execPath, argv, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], maxBuffer: 1 << 26 });
        process.stdout.write(r.stdout);
        let cells = [];
        try { cells = JSON.parse(fs.readFileSync(path.join(outDir({ out: args.out, build: args.build, "no-webkit-shim": p.extra.length > 0 }, w), `${w}.json`), "utf8")).cells; } catch { }
        for (const e of p.engine.split(",")) {
            const ce = cells.filter((c) => c.engine === e);
            const cs = ce.filter(counts);
            table.push({ w, pass: p.label, engine: e + (p.extra.length ? " unshimmed" : e === "webkit" && adapter.webkitShim ? " +shim" : ""), n: cs.length, ok: cs.filter((c) => c.pass).length, ob: ce.filter((c) => c.ownerBlocked && !c.pass).length, um: ce.filter((c) => c.unmeasured).length, crashed: cs.filter((c) => c.crashed).length, code: r.status, s: Math.round((Date.now() - t0) / 1000), load: `${load0}→${loadAvg()}` });
        }
    }
}
if (args.safari) {
    const s = spawnSync(process.execPath, [path.join(HERE, "safari.mjs")], { encoding: "utf8" });
    console.log(s.stdout.trim());
    for (const w of only) table.push({ w, pass: "safari", engine: "Safari", n: 0, ok: 0, crashed: 0, code: s.status, s: 0, load: String(loadAvg()), note: s.status === 0 ? "enabled: run each witness with --engine safari" : "UNMEASURED (owner's safaridriver checkbox)" });
}
console.log("\nwitness  engine                   cells passing   owner-blocked  unmeasured  crashed   s     load");
for (const t of table) console.log(`${t.w.padEnd(8)} ${t.engine.padEnd(24)} ${t.note ?? `${t.ok}/${t.n}`.padEnd(15)} ${String(t.ob ?? 0).padEnd(14)} ${String(t.um ?? 0).padEnd(11)} ${String(t.crashed).padEnd(9)} ${String(t.s).padEnd(5)} ${t.load}`);
if (args.out) fs.writeFileSync(path.join(args.out, `run-${path.basename(args.build)}.json`), JSON.stringify({ when: new Date().toISOString(), build: args.build, adapterLaw: law.stdout.trim(), table }, null, 1));
process.exitCode = table.filter((t) => t.pass === "chromium, webkit+shim").every((t) => t.ok === t.n) ? 0 : 1;
