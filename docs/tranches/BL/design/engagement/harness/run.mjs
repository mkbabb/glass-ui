#!/usr/bin/env node
// run.mjs · the whole battery against one build (or the fixture), one line per witness and engine.
//   node run.mjs --build <dir> --wt <worktree> [--out <dir>] [--only E-2,E-5] [--engines chromium,webkit]
//   node run.mjs --fixture [--fault <id>] [--engines …]
// Each witness runs as its own process (its own exit code) under the D5 lock, serialized. A process that ends in a
// HARNESS ERROR because its engine closed (another seat's load) is re-run once: the re-run's verdict stands with
// NOT-REPRODUCED, or the crash stands with REPRODUCED (the D4 runOne pattern, tile/harness/run.mjs:26-39).
// Exit 0 only when every run exits 0.
import path from "node:path";
import { spawnSync } from "node:child_process";
import { HERE, parseArgs, load } from "./lib.mjs";

export const WITNESSES = [
  ["E-1", "e1-census.mjs"], ["E-2", "e2-commit.mjs"], ["E-3", "e3-slider.mjs"], ["E-4", "e4-momentum.mjs"],
  ["E-5", "e5-touch.mjs"], ["E-6", "e6-idle.mjs"], ["E-7", "e7-one-writer.mjs"], ["E-8", "e8-clock.mjs"], ["E-9", "e9-prm.mjs"],
  ["E-10", "e10-continuity.mjs"], ["E-11", "e11-fail-loud.mjs"], ["E-12", "e12-floor.mjs"],
];
const VERDICT = / (PASS|FAIL|UNMEASURED) · \d+ pass/;
function spawn(file, argv) {
  const r = spawnSync(process.execPath, [path.join(HERE, file), ...argv], { encoding: "utf8", maxBuffer: 64 << 20 });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const last = out.trim().split("\n").reverse().find((l) => VERDICT.test(l) || /HARNESS ERROR/.test(l)) ?? "(no verdict line)";
  return { code: r.status, last, out };
}
const engineClosed = (l) => /closed|crash|disconnected|CELL TIMEOUT|deadline|Timeout \d+ms exceeded|raw WebKit|Cannot find page proxy/i.test(l);
export function runOne(file, argv) {
  const r = spawn(file, argv);
  if (r.code !== 2 || !engineClosed(r.last)) return { ...r, retried: null };
  const again = spawn(file, argv);
  const note = `engine closed during the first run (${r.last.trim().slice(0, 160)}; load ${load()} at the re-run's end)`;
  if (again.code === 2 && engineClosed(again.last)) return { ...again, last: `${again.last} · REPRODUCED on re-run: ${note}`, retried: "reproduced" };
  return { ...again, last: `${again.last} · NOT-REPRODUCED: ${note}`, retried: "not-reproduced" };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
  const pass = [];
  for (const k of ["build", "out", "fault", "wt", "deadline", "scenes", "commit-arms", "unowned", "migration"]) if (typeof a[k] === "string") pass.push(`--${k}`, a[k]);
  if (a.fixture) pass.push("--fixture");
  let bad = 0;
  for (const [id, file] of WITNESSES) {
    if (only && !only.has(id)) continue;
    for (const engine of engines) {
      const t0 = Date.now();
      const r = runOne(file, [...pass, "--engine", engine]);
      if (r.code !== 0) bad++;
      const ls = (r.out.match(/load ([\d./]+) at start/) ?? [])[1] ?? "?";
      console.log(`${id} ${engine.padEnd(8)} exit ${r.code} · ${r.last.trim()} · ${((Date.now() - t0) / 1000).toFixed(0)} s, load at start ${ls}`);
      if (typeof a.verbose === "boolean" || r.code === 2) for (const l of r.out.split("\n").filter((x) => /^\s+(FAIL|UNMEASURED|HARNESS)/.test(x))) console.log(`    ${l.trim()}`);
    }
  }
  process.exit(bad ? 1 : 0);
}
