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
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
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

/** One vitest run in the worktree: { code, ran, passed, failed, skipped, verdict, line }. */
export function runUnit(wt, { files = [], t = null, subs = [], label = "unit", out = null } = {}) {
  const loadStart = load();
  const sha = createHash("sha1").update(fs.readFileSync(CONFIG)).digest("hex").slice(0, 8);
  const saved = [];
  const report = path.join(wt, `.h4-unit-${process.pid}-${Date.now()}.json`);
  const cfg = path.join(wt, CFG_NAME);
  const finish = (r) => {
    const res = { label, harness: HARNESS, config: { file: "vitest.wt.config.ts", sha1: sha }, worktree: wt, files, t, subs, loadStart, loadEnd: load(), ...r };
    res.line = `UNIT ${res.verdict} · ${label} · ${res.ran ?? 0} case(s) ran: ${res.passed ?? 0} passed, ${res.failed ?? 0} failed, ${res.skipped ?? 0} skipped${res.why ? ` · ${res.why}` : ""} · config vitest.wt.config.ts ${sha} · harness ${HARNESS.rev} ${HARNESS.hash} · load ${loadStart} → ${res.loadEnd}`;
    if (out) { const dir = path.join(out, "runs", "unit"); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${label}.json`), JSON.stringify(res, null, 1)); }
    return res;
  };
  try {
    for (const s of subs) {
      const parts = s.split("|"), [file, old, neu] = parts;
      if (parts.length !== 3 || !old) return finish({ code: 2, verdict: "HARNESS ERROR", why: `a plant is '<file>|<old>|<new>' with a non-empty anchor; got ${parts.length} part(s) ${JSON.stringify(s).slice(0, 80)} (quote it as one argument)` });
      const p = path.join(wt, file);
      const body = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null;
      if (body === null || !body.includes(old)) return finish({ code: 2, verdict: "HARNESS ERROR", why: `plant anchor missing in ${file}: ${JSON.stringify(old).slice(0, 80)}` });
      saved.push([p, body]);
      fs.writeFileSync(p, body.replace(old, neu));
    }
    fs.copyFileSync(CONFIG, cfg);
    const args = [path.join(wt, "node_modules/vitest/vitest.mjs"), "run", "--config", CFG_NAME, "--reporter=json", `--outputFile=${report}`, ...(t ? ["-t", t] : []), ...files];
    const r = spawnSync(process.execPath, args, { cwd: wt, encoding: "utf8", maxBuffer: 256 << 20, timeout: 20 * 60 * 1000 });
    if (!fs.existsSync(report)) return finish({ code: 2, verdict: "HARNESS ERROR", why: `vitest wrote no report (exit ${r.status}): ${(r.stderr || r.stdout || "").trim().split("\n").slice(-3).join(" / ").slice(0, 300)}` });
    const j = JSON.parse(fs.readFileSync(report, "utf8"));
    const passed = j.numPassedTests ?? 0, failed = j.numFailedTests ?? 0, skipped = (j.numPendingTests ?? 0) + (j.numTodoTests ?? 0);
    const ran = passed + failed;
    const failures = (j.testResults ?? []).flatMap((f) => (f.assertionResults ?? []).filter((x) => x.status === "failed").map((x) => x.fullName)).slice(0, 8);
    if (ran === 0) return finish({ code: 2, verdict: "VACUOUS", ran, passed, failed, skipped, why: `zero cases ran (${j.numTotalTests ?? 0} collected, ${skipped} skipped): a driver that ran nothing is not a pass` });
    return finish({ code: failed ? 1 : 0, verdict: failed ? "FAIL" : "PASS", ran, passed, failed, skipped, failures, why: failed ? `failing: ${failures.join("; ").slice(0, 300)}` : "" });
  } finally {
    for (const [p, body] of saved) fs.writeFileSync(p, body);
    fs.rmSync(cfg, { force: true }); fs.rmSync(report, { force: true });
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
  ];
  let broken = 0;
  try {
    runs.forEach(([what, o, want], k) => {
      const r = runUnit(wt, { ...o, label: `selftest-${k}`, out });
      const ok = r.code === want;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} UNIT ${what} · exit ${r.code} (want ${want}) · ${r.line}`);
    });
  } finally { fs.rmSync(file, { force: true }); }
  console.log(broken ? `unit selftest: ${broken} of ${runs.length} BROKEN` : `unit selftest: ${runs.length} runs; the driver passes a real case, refuses a zero-case run, fails a planted case, stops on a missing anchor, and restores its plants`);
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
