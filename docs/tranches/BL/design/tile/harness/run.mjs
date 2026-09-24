#!/usr/bin/env node
// run.mjs · run the whole battery against one build (or the fixture) and print one line per witness.
//   node run.mjs --build <dir> [--out <dir>] [--only T-1,W-A] [--webkit]
//   node run.mjs --fixture [--family e] [--fault <id>]
// Each witness runs as its own process (its own exit code). --webkit re-runs the engine-generic witnesses in
// Playwright WebKit as well. Exit 0 only when every witness run exits 0.
import path from "node:path";
import { spawnSync } from "node:child_process";
import { HERE, parseArgs } from "./lib.mjs";

export const WITNESSES = [
  ["T-1", "t1-corner-stops.mjs", true], ["T-2", "t2-one-line-stadium.mjs", true], ["T-3", "t3-selected-separates.mjs", true],
  ["T-4", "t4-ring-whole.mjs", true], ["T-5", "t5-one-of-n-keys.mjs", false], ["T-6", "t6-engagement.mjs", true],
  ["T-7", "t7-no-consumer-paint.mjs", false], ["T-8", "t8-both-engines.mjs", false],
  ["W-A", "wa-curvature-content.mjs", true], ["W-B", "wb-choice-card.mjs", false], ["W-C", "wc-selection-behaviour.mjs", false],
  ["W-D", "wd-declared-cell.mjs", true], ["W-E", "we-one-line.mjs", true],
]; // [id, file, engine-generic]

/** Run one witness; returns { id, engine, code, tally }. */
export function runOne(file, argv) {
  const r = spawnSync(process.execPath, [path.join(HERE, file), ...argv], { encoding: "utf8", maxBuffer: 64 << 20 });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const last = out.trim().split("\n").reverse().find((l) => / (PASS|FAIL) · /.test(l) || /HARNESS ERROR/.test(l)) ?? "(no verdict line)";
  return { code: r.status, last, out };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const pass = [];
  for (const k of ["build", "out", "family", "fault"]) if (typeof a[k] === "string") pass.push(`--${k}`, a[k]);
  if (a.fixture) pass.push("--fixture");
  let bad = 0;
  for (const [id, file, generic] of WITNESSES) {
    if (only && !only.has(id)) continue;
    for (const engine of a.webkit && generic ? ["chromium", "webkit"] : ["chromium"]) {
      const r = runOne(file, [...pass, ...(engine === "webkit" ? ["--engine", "webkit"] : [])]);
      if (r.code !== 0) bad++;
      console.log(`${id.padEnd(4)} ${engine.padEnd(8)} exit ${r.code} · ${r.last}`);
    }
  }
  process.exit(bad ? 1 : 0);
}
