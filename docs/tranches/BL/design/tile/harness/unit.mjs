#!/usr/bin/env node
// UNIT · H4-3 · the unit driver every route seat runs its vitest cases and plants through (REGISTRY §P3-6.2 H4-3).
// Pass 3's drivers ran without their configs (`D4-Dp-spec/probes/unit-plants.sh` needed `../vitest.wt.config.mjs`,
// which no seat banked) and printed nothing while exiting 0 (`D′c` §5). This driver carries its config
// (`vitest.wt.config.ts`, copied to the worktree root for the run and removed after), reads vitest's JSON report, and
// refuses a vacuous run: zero cases run is a harness error, never a pass.
//   node unit.mjs <worktree> [-t <name pattern>] [--sub '<file>|<old>|<new>' ...] [--label l] [--out <dir>] <test files…>
//   node unit.mjs <worktree> --selftest [--out <dir>]
// --sub plants a mutation in the worktree (the anchor must be non-empty and occur, or the run stops loud) and restores
// the file after. Quote each --sub as one argument: a shell that splits it leaves an empty anchor, which is refused.
// Exit 0: ≥ 1 case ran and none failed. Exit 1: a case failed. Exit 2: zero cases ran (VACUOUS), a plant anchor is
// missing, the config is absent, or vitest produced no report. Every run prints the load at start and end, the
// config's sha1 and the harness hash, and writes its JSON under <out>/runs/unit/.
//
// H5-3 · ONE DRIVER PER WORKTREE, AND A RESTORE THAT IS CHECKED (REGISTRY §P4-6.2; `D′c` §5.1). Pass 4's D′ critic ran
// two plant stages on one worktree at once; each restored its plant to the text it had read at start, so each wrote
// the other's plant back and four plants stacked in the sheet. Now:
//   LOCK      the driver takes `<worktree>/.h5-unit.lock` (O_EXCL; it records the pid and the command) before it reads
//             or plants anything. A second driver on the same worktree while the first lives stops at once, exit 2,
//             naming the holder. A lock whose pid is dead is broken with a note, and the restore copy it left behind is
//             written back first (a driver killed mid-plant leaves its plant in place otherwise)
//   COPY      before the first --sub, every file a plant touches is copied to `<worktree>/.h5-unit-restore/` (with a
//             manifest), and the restore writes those copies back, never a text read later
//   CHECK     the worktree's `git diff HEAD` (bytes) and `git status --porcelain`, and each planted file's sha1, are taken
//             before the first plant and again after the restore; any difference is exit 2, "restore mismatch",
//             with the paths that differ. A worktree another writer touched mid-run fails loud instead of passing
// The lock, the copy and the config copy live in the worktree and are removed at the end.
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { HERE, HARNESS, load, outRoot } from "./lib.mjs";

const CONFIG = path.join(HERE, "vitest.wt.config.ts");
const CFG_NAME = "vitest.h4.config.ts";

function parse(argv) {
  const a = { subs: [], files: [], t: null, label: null, out: null, selftest: false, wt: null };
  for (let i = 0; i < argv.length; i++) {
    const x = argv[i];
    if (x === "-t") a.t = argv[++i];
    else if (x === "--sub") a.subs.push(argv[++i]);
    else if (x === "--label") a.label = argv[++i];
    else if (x === "--out") a.out = argv[++i];
    else if (x === "--selftest") a.selftest = true;
    else if (!a.wt) a.wt = path.resolve(x);
    else a.files.push(x);
  }
  return a;
}

const LOCK = ".h5-unit.lock", RESTORE = ".h5-unit-restore";
const sha1 = (b) => createHash("sha1").update(b).digest("hex");
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };
/** the worktree's state as git sees it, plus each named file's bytes: compared before the first plant and after the restore */
function state(wt, rels) {
  const git = (args) => { try { return execFileSync("git", ["-C", wt, ...args], { encoding: "buffer", maxBuffer: 512 << 20 }); } catch (e) { return Buffer.from(`git ${args.join(" ")} failed: ${e.message}`); } };
  const status = git(["status", "--porcelain", "--untracked-files=all"]).toString().split("\n").filter((l) => l && !l.includes(LOCK) && !l.includes(RESTORE) && !l.includes(CFG_NAME) && !l.includes(".h4-unit-") && !l.includes(".vite-cache/")).join("\n"); // the driver's own files and its vitest cache
  return { diff: sha1(git(["diff", "HEAD", "--binary"])), status: sha1(status), statusText: status, files: Object.fromEntries(rels.map((r) => { const p = path.join(wt, r); return [r, fs.existsSync(p) ? sha1(fs.readFileSync(p)) : "(absent)"]; })) };
}
/** take the worktree's unit lock, or say who holds it; a dead holder's restore copy is written back first */
function takeLock(wt, label) {
  const lp = path.join(wt, LOCK), notes = [];
  for (let k = 0; k < 2; k++) {
    try { fs.writeFileSync(lp, JSON.stringify({ pid: process.pid, label, argv: process.argv.slice(2), at: new Date().toISOString() }), { flag: "wx" }); return { ok: true, notes }; }
    catch (e) { if (e.code !== "EEXIST") throw e; }
    let held = {}; try { held = JSON.parse(fs.readFileSync(lp, "utf8")); } catch {}
    if (held.pid && alive(held.pid)) return { ok: false, why: `another unit.mjs holds this worktree (pid ${held.pid}, label ${held.label}, since ${held.at}): one driver per worktree, or its plants stack (D′c §5.1)` };
    const rd = path.join(wt, RESTORE);
    if (fs.existsSync(path.join(rd, "manifest.json"))) {
      const man = JSON.parse(fs.readFileSync(path.join(rd, "manifest.json"), "utf8"));
      for (const [rel, copy] of Object.entries(man)) fs.copyFileSync(path.join(rd, copy), path.join(wt, rel));
      notes.push(`broke a dead driver's lock (pid ${held.pid ?? "?"}) and wrote back its restore copy of ${Object.keys(man).join(", ")}`);
    } else notes.push(`broke a dead driver's lock (pid ${held.pid ?? "?"}); it left no restore copy`);
    fs.rmSync(rd, { recursive: true, force: true }); fs.rmSync(lp, { force: true });
  }
  return { ok: false, why: "could not take the unit lock" };
}

/** One vitest run in the worktree: { code, ran, passed, failed, skipped, verdict, line }. */
export function runUnit(wt, { files = [], t = null, subs = [], label = "unit", out = null, _tamper = null } = {}) {
  const loadStart = load();
  const sha = createHash("sha1").update(fs.readFileSync(CONFIG)).digest("hex").slice(0, 8);
  const report = path.join(wt, `.h4-unit-${process.pid}-${Date.now()}.json`);
  const cfg = path.join(wt, CFG_NAME);
  const notes = [];
  const finish = (r) => {
    const res = { label, harness: HARNESS, config: { file: "vitest.wt.config.ts", sha1: sha }, worktree: wt, files, t, subs, loadStart, loadEnd: load(), notes, ...r };
    res.line = `UNIT ${res.verdict} · ${label} · ${res.ran ?? 0} case(s) ran: ${res.passed ?? 0} passed, ${res.failed ?? 0} failed, ${res.skipped ?? 0} skipped${res.why ? ` · ${res.why}` : ""}${notes.length ? ` · ${notes.join("; ")}` : ""} · config vitest.wt.config.ts ${sha} · harness ${HARNESS.rev} ${HARNESS.hash} · load ${loadStart} → ${res.loadEnd}`;
    if (out) { const dir = path.join(out, "runs", "unit"); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${label}.json`), JSON.stringify(res, null, 1)); }
    return res;
  };
  const lock = takeLock(wt, label);
  if (!lock.ok) return finish({ code: 2, verdict: "HARNESS ERROR", why: lock.why });
  notes.push(...lock.notes);
  const rd = path.join(wt, RESTORE);
  const planted = [];
  let before = null, result = null;
  try {
    // parse every plant and check every anchor before anything is written
    const plan = [];
    for (const s of subs) {
      const parts = s.split("|"), [file, old, neu] = parts;
      if (parts.length !== 3 || !old) return (result = finish({ code: 2, verdict: "HARNESS ERROR", why: `a plant is '<file>|<old>|<new>' with a non-empty anchor; got ${parts.length} part(s) ${JSON.stringify(s).slice(0, 80)} (quote it as one argument)` }));
      plan.push({ file, old, neu });
    }
    const rels = [...new Set(plan.map((x) => x.file))];
    before = state(wt, rels);
    // the restore copy, taken before the first plant
    if (rels.length) {
      fs.mkdirSync(rd, { recursive: true });
      const man = {};
      rels.forEach((rel, k) => { const p = path.join(wt, rel); if (fs.existsSync(p)) { fs.copyFileSync(p, path.join(rd, `f${k}`)); man[rel] = `f${k}`; } });
      fs.writeFileSync(path.join(rd, "manifest.json"), JSON.stringify(man));
    }
    for (const { file, old, neu } of plan) {
      const p = path.join(wt, file);
      const body = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
      if (body === null || !body.includes(old)) return (result = finish({ code: 2, verdict: "HARNESS ERROR", why: `plant anchor missing in ${file}: ${JSON.stringify(old).slice(0, 80)}` }));
      fs.writeFileSync(p, body.replace(old, neu));
      planted.push(file);
    }
    fs.copyFileSync(CONFIG, cfg);
    const args = [path.join(wt, "node_modules/vitest/vitest.mjs"), "run", "--config", CFG_NAME, "--reporter=json", `--outputFile=${report}`, ...(t ? ["-t", t] : []), ...files];
    const r = spawnSync(process.execPath, args, { cwd: wt, encoding: "utf8", maxBuffer: 256 << 20, timeout: 20 * 60 * 1000 });
    if (!fs.existsSync(report)) return finish({ code: 2, verdict: "HARNESS ERROR", why: `vitest wrote no report (exit ${r.status}): ${(r.stderr || r.stdout || "").trim().split("\n").slice(-3).join(" / ").slice(0, 300)}` });
    const j = JSON.parse(fs.readFileSync(report, "utf8"));
    const passed = j.numPassedTests ?? 0, failed = j.numFailedTests ?? 0, skipped = (j.numPendingTests ?? 0) + (j.numTodoTests ?? 0);
    const ran = passed + failed;
    const failures = (j.testResults ?? []).flatMap((f) => (f.assertionResults ?? []).filter((x) => x.status === "failed").map((x) => x.fullName)).slice(0, 8);
    if (_tamper) { const p = path.join(wt, _tamper.file); fs.appendFileSync(p, _tamper.append); } // the self-test's concurrent writer
    if (ran === 0) return (result = finish({ code: 2, verdict: "VACUOUS", ran, passed, failed, skipped, why: `zero cases ran (${j.numTotalTests ?? 0} collected, ${skipped} skipped): a driver that ran nothing is not a pass` }));
    return (result = finish({ code: failed ? 1 : 0, verdict: failed ? "FAIL" : "PASS", ran, passed, failed, skipped, failures, why: failed ? `failing: ${failures.join("; ").slice(0, 300)}` : "" }));
  } finally {
    // restore from the copy taken before the first plant, then check the worktree against what git saw before
    if (fs.existsSync(path.join(rd, "manifest.json"))) {
      const man = JSON.parse(fs.readFileSync(path.join(rd, "manifest.json"), "utf8"));
      for (const [rel, copy] of Object.entries(man)) fs.copyFileSync(path.join(rd, copy), path.join(wt, rel));
    }
    fs.rmSync(cfg, { force: true }); fs.rmSync(report, { force: true });
    if (before) {
      const after = state(wt, Object.keys(before.files));
      const bad = [];
      if (after.diff !== before.diff) bad.push("git diff HEAD");
      if (after.status !== before.status) bad.push(`git status (${after.statusText.split("\n").filter((l) => !before.statusText.split("\n").includes(l)).slice(0, 3).join(", ") || "entries removed"})`);
      for (const [rel, h] of Object.entries(before.files)) if (after.files[rel] !== h) bad.push(rel);
      if (bad.length && result) {
        const why = `restore mismatch: after the restore the worktree differs from before the first plant in ${bad.join("; ")} (planted ${planted.join(", ") || "nothing"}): a second writer or a stacked plant`;
        Object.assign(result, { code: 2, verdict: "HARNESS ERROR", why, restoreMismatch: bad });
        result.line = `UNIT HARNESS ERROR · ${label} · ${why} · harness ${HARNESS.rev} ${HARNESS.hash}`;
        if (out) fs.writeFileSync(path.join(out, "runs", "unit", `${label}.json`), JSON.stringify(result, null, 1));
      } else if (result) result.restore = `checked: git diff HEAD, git status and ${Object.keys(before.files).length} planted file(s) equal before and after`;
    }
    fs.rmSync(rd, { recursive: true, force: true });
    fs.rmSync(path.join(wt, LOCK), { force: true });
  }
}

/** The self-test: a planted test file in the worktree, read four ways (clean, zero cases, a failing plant, a missing anchor). */
function selftest(wt, out) {
  const rel = "tests/__h4_unit_selftest.test.ts";
  const file = path.join(wt, rel);
  fs.writeFileSync(file, `import { describe, it, expect } from "vitest";\ndescribe("h4 unit selftest", () => {\n    it("h4 passes", () => { expect(1).toBe(1); });\n});\n`);
  const runs = [
    ["clean", { files: [rel], t: "h4 passes" }, 0],
    ["zero cases (a -t pattern that matches nothing)", { files: [rel], t: "h4 no such case" }, 2],
    ["planted failure (--sub flips the assertion)", { files: [rel], t: "h4 passes", subs: [`${rel}|toBe(1)|toBe(2)`] }, 1],
    ["missing plant anchor", { files: [rel], subs: [`${rel}|no-such-anchor|x`] }, 2],
    ["empty plant anchor (an unquoted --sub split by the shell)", { files: [rel], subs: [`${rel}|`] }, 2],
    ["clean again (the plant was restored)", { files: [rel], t: "h4 passes" }, 0],
    // H5-3
    ["a second driver while a live one holds the worktree (H5-3)", { files: [rel], t: "h4 passes", subs: [`${rel}|toBe(1)|toBe(3)`], _held: true }, 2],
    ["a dead driver's lock and its restore copy (H5-3): the copy is written back, the run proceeds", { files: [rel], t: "h4 passes", _dead: true }, 0],
    ["a concurrent writer touches a tracked file mid-run (H5-3): the restore check fails loud", { files: [rel], t: "h4 passes", subs: [`${rel}|toBe(1)|toBe(1)`], _tamper: { file: "vitest.config.ts", append: "\n// h5 tamper\n" } }, 2],
    ["clean at the end (nothing left planted, no lock, no copy)", { files: [rel], t: "h4 passes" }, 0],
  ];
  let broken = 0;
  const cfgPath = path.join(wt, "vitest.config.ts"), cfgBody = fs.readFileSync(cfgPath);
  try {
    runs.forEach(([what, o0, want], k) => {
      const { _held, _dead, ...o } = o0;
      let holder = null, extra = "";
      if (_held) { // a live holder: a child process that sleeps, recorded in the lock
        holder = spawn(process.execPath, ["-e", "setTimeout(() => {}, 60000)"], { stdio: "ignore" });
        fs.writeFileSync(path.join(wt, LOCK), JSON.stringify({ pid: holder.pid, label: "selftest-holder", at: new Date().toISOString() }));
      }
      if (_dead) { // a dead holder that left its plant in the file and its restore copy beside it
        const dead = spawnSync(process.execPath, ["-e", "process.stdout.write(String(process.pid))"], { encoding: "utf8" });
        fs.writeFileSync(path.join(wt, LOCK), JSON.stringify({ pid: Number(dead.stdout), label: "selftest-dead", at: new Date().toISOString() }));
        fs.mkdirSync(path.join(wt, RESTORE), { recursive: true });
        fs.copyFileSync(file, path.join(wt, RESTORE, "f0"));
        fs.writeFileSync(path.join(wt, RESTORE, "manifest.json"), JSON.stringify({ [rel]: "f0" }));
        fs.writeFileSync(file, fs.readFileSync(file, "utf8").replace("toBe(1)", "toBe(4)")); // the plant it never restored
      }
      const r = runUnit(wt, { ...o, label: `selftest-${k}`, out });
      if (holder) { holder.kill(); fs.rmSync(path.join(wt, LOCK), { force: true }); extra = ` · the planted file after the refused run: ${fs.readFileSync(file, "utf8").includes("toBe(3)") ? "PLANTED (BROKEN)" : "untouched"}`; }
      if (o.subs?.length || _dead) extra += ` · ${r.restore ?? r.why ?? ""}`.slice(0, 220);
      fs.writeFileSync(cfgPath, cfgBody); // undo the tamper case's concurrent write
      const ok = r.code === want && !extra.includes("BROKEN");
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} UNIT ${what} · exit ${r.code} (want ${want}) · ${r.line}${extra}`);
    });
    const left = [LOCK, RESTORE, CFG_NAME].filter((f) => fs.existsSync(path.join(wt, f)));
    if (left.length) { broken++; console.log(`BROKEN UNIT the driver left ${left.join(", ")} in the worktree`); }
  } finally { fs.rmSync(file, { force: true }); fs.writeFileSync(cfgPath, cfgBody); fs.rmSync(path.join(wt, LOCK), { force: true }); fs.rmSync(path.join(wt, RESTORE), { recursive: true, force: true }); }
  console.log(broken ? `unit selftest: ${broken} of ${runs.length} BROKEN` : `unit selftest: ${runs.length} runs; the driver passes a real case, refuses a zero-case run, fails a planted case, stops on a missing anchor, restores its plants from its copy, refuses a second driver on a held worktree, recovers a dead driver's plant, and fails loud when the worktree changed under it`);
  return broken ? 1 : 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parse(process.argv.slice(2));
  if (!a.wt || !fs.existsSync(path.join(a.wt, "vitest.config.ts"))) { console.error("usage: node unit.mjs <worktree with vitest.config.ts> [...] (see the header)"); process.exit(2); }
  const out = a.out ? path.resolve(a.out) : outRoot({});
  if (a.selftest) process.exit(selftest(a.wt, out));
  const r = runUnit(a.wt, { files: a.files, t: a.t, subs: a.subs, label: a.label ?? "unit", out });
  console.log(r.line);
  process.exit(r.code);
}
