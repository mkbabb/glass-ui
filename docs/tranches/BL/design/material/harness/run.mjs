#!/usr/bin/env node
// run.mjs · the whole battery on one worktree: build, capture every cell (plus the live windows and the consumer
// retune variant), then every witness. Each witness's full output lands in <capdir>/results/<id>.log.
//   node run.mjs <worktree> [--label head] [--engines chromium,webkit] [--skip-build] [--skip-capture] [--live-ms 9000]
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, HERE, RETUNE_CSS, cli } from "./lib.mjs";
import { buildSpecimens } from "./build.mjs";
import { capture } from "./capture.mjs";

export const WITNESSES = [
  ["M-1", "m1-no-grey"], ["M-2", "m2-text-contrast"], ["M-3", "m3-non-text"], ["M-4", "m4-dock-register"],
  ["M-5", "m5-live-dock"], ["M-6", "m6-separable-ladder"], ["M-7", "m7-halos-whole"], ["M-8", "m8-chrome-calm"],
  ["W-A", "wa-no-signal"], ["W-B", "wb-substrate-publishes"], ["W-C", "wc-ink-follows"], ["W-D", "wd-solved-tokens"],
  ["W-E", "we-ink-ground"], ["W-F", "wf-field-yields"],
];

export function runWitnesses(capdir, extraArgs = []) {
  fs.mkdirSync(path.join(capdir, "results"), { recursive: true });
  const out = [];
  for (const [id, script] of WITNESSES) {
    const r = spawnSync(process.execPath, [path.join(HERE, `${script}.mjs`), capdir, ...extraArgs], { encoding: "utf8", maxBuffer: 64 << 20 });
    fs.writeFileSync(path.join(capdir, "results", `${id}.log`), (r.stdout || "") + (r.stderr || ""));
    const verdict = (r.stdout || "").trim().split("\n").pop() || (r.stderr || "").trim().split("\n").pop();
    out.push({ id, script, exit: r.status, verdict });
    console.log(`${id.padEnd(4)} exit ${r.status} · ${verdict}`);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ label: { type: "string" }, engines: { type: "string" }, "skip-build": { type: "boolean" }, "skip-capture": { type: "boolean" }, "live-ms": { type: "string" } });
  if (!a._[0]) { console.error("usage: node run.mjs <worktree> [--label head]"); process.exit(2); }
  const label = a.label || "head", capdir = path.join(OUT, "caps", label), dist = path.join(OUT, "builds", label, "dist");
  if (!a["skip-build"]) { const { meta } = await buildSpecimens(a._[0], label); console.log(`built ${label} @ ${meta.sha}`); }
  if (!a["skip-capture"]) {
    await capture(dist, { out: capdir, engines: a.engines, live: true, liveMs: a["live-ms"], worktree: path.resolve(a._[0]) });
    const retune = path.join(OUT, "retune.css"); fs.writeFileSync(retune, RETUNE_CSS);
    await capture(dist, { out: capdir, engines: a.engines, grounds: "paper", scenes: "ladder,dialog", variant: "retune", inject: retune });
  }
  const res = runWitnesses(capdir);
  fs.writeFileSync(path.join(capdir, "results", "summary.json"), JSON.stringify(res, null, 1));
}
