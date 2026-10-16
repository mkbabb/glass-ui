#!/usr/bin/env node
// run.mjs · run the whole battery against one build (or the fixture) and print one line per witness.
//   node run.mjs --build <dir> [--out <dir>] [--only T-1,W-A] [--webkit] [--wait-quiet <s>]
//   node run.mjs --fixture [--family e] [--fault <id>] [--flavor <f>]
//   node run.mjs --build <dir> --attack <dir> [--webkit]   H4-1: the shared attack set reads a second build of the same
//                                                          worktree, made with --route <harness>/attack-route
// Each witness runs as its own process (its own exit code), serialized: one browser process at a time on this
// machine through lib's lock (H-11). --webkit re-runs every engine-generic witness in Playwright WebKit as well;
// T-8 runs both engines (and real Safari once enabled) itself. Exit 0 only when every gating witness run exits 0:
// REPORT (H4-6) is printed with its exit and left out of the battery's exit.
import path from "node:path";
import { spawnSync } from "node:child_process";
import { HERE, HARNESS, parseArgs, engineClosed, load } from "./lib.mjs";

export const WITNESSES = [
  ["T-1", "t1-corner-stops.mjs", true], ["T-2", "t2-one-line-stadium.mjs", true], ["T-3", "t3-selected-separates.mjs", true],
  ["T-4", "t4-ring-whole.mjs", true], ["T-5", "t5-one-of-n-keys.mjs", true], ["T-6", "t6-engagement.mjs", true],
  ["T-7", "t7-no-consumer-paint.mjs", true], ["T-8", "t8-both-engines.mjs", false],
  ["W-A", "wa-curvature-content.mjs", true], ["W-B", "wb-choice-card.mjs", true], ["W-C", "wc-selection-behaviour.mjs", true],
  ["W-D", "wd-declared-cell.mjs", true], ["W-E", "we-one-line.mjs", true],
  ["CANON", "canon.mjs", true], // H3-4
  ["FACT", "fact-split.mjs", true, { family: "atk", attack: true }], // H4-1
  ["ATTACK", "attack.mjs", true, { family: "atk", attack: true }], // H4-1
  ["CORNER", "corner-refusal.mjs", true, { family: "atk", attack: true }], // H4-1
  ["REPORT", "report-h46.mjs", true, { family: "h46", reported: true }], // H4-6
]; // [id, file, engine-generic, { family: the clean fixture's family, attack: reads the attack build, reported: not gating }]
/** The clean fixture's family per witness: W-E's one-line arm, the H4 attack and report families. */
export const familyOf = (id, opts = {}) => opts.family ?? (id === "W-E" ? "e" : "");

function spawnWitness(file, argv, env = {}) {
  const r = spawnSync(process.execPath, [path.join(HERE, file), ...argv], { encoding: "utf8", maxBuffer: 64 << 20, env: { ...process.env, ...env } });
  const out = (r.stdout ?? "") + (r.stderr ?? "");
  const last = out.trim().split("\n").reverse().find((l) => / (PASS|FAIL) · /.test(l) || /HARNESS ERROR/.test(l)) ?? "(no verdict line)";
  return { code: r.status, last, out };
}
/**
 * Run one witness; returns { code, last, out, retried }. A run that ends in a HARNESS ERROR because its engine
 * closed (the browser died under another seat's load) is re-run once. The re-run's result stands, and the crash is
 * printed beside it as NOT-REPRODUCED; if the re-run crashes too, the crash stands and fails loud (exit 2). A run
 * that exits 0 or 1 is never re-run: a verdict is not retried into another verdict.
 */
export function runOne(file, argv, env = {}) {
  const r = spawnWitness(file, argv, env);
  if (r.code !== 2 || !engineClosed(r.last)) return { ...r, retried: null };
  const again = spawnWitness(file, argv, env);
  const note = `engine closed during the first run (${r.last.trim().slice(0, 160)}; load ${load()} at the re-run's end)`;
  if (again.code === 2 && engineClosed(again.last)) return { ...again, last: `${again.last} · REPRODUCED on re-run: ${note}`, retried: "reproduced" };
  return { ...again, last: `${again.last} · NOT-REPRODUCED: ${note}`, retried: "not-reproduced" };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs();
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const pass = [];
  for (const k of ["out", "family", "fault", "flavor", "wait-quiet"]) if (typeof a[k] === "string") pass.push(`--${k}`, a[k]);
  if (a.fixture) pass.push("--fixture");
  let bad = 0;
  console.log(`harness ${HARNESS.rev} ${HARNESS.hash} (${HARNESS.files} files)`);
  for (const [id, file, generic, opts = {}] of WITNESSES) {
    if (only && !only.has(id)) continue;
    const build = opts.attack ? a.attack : a.build;
    if (!a.fixture && typeof build !== "string") { console.log(`${id.padEnd(4)} skipped · ${opts.attack ? "needs --attack <build made with --route <harness>/attack-route>" : "needs --build"}`); if (!opts.reported) bad++; continue; }
    for (const engine of a.webkit && generic ? ["chromium", "webkit"] : ["chromium"]) {
      const t0 = Date.now();
      const r = runOne(file, [...pass, ...(a.fixture ? [] : ["--build", build]), ...(engine === "webkit" ? ["--engine", "webkit"] : [])]);
      if (r.code !== 0 && !opts.reported) bad++;
      const load = (r.out.match(/load ([\d. /]+) at start/) ?? [])[1] ?? "?";
      console.log(`${id.padEnd(4)} ${engine.padEnd(8)} exit ${r.code}${opts.reported ? " (reported, not gating)" : ""} · ${r.last} · ${((Date.now() - t0) / 1000).toFixed(0)} s, load at start ${load}`);
    }
  }
  process.exit(bad ? 1 : 0);
}
