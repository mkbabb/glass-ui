#!/usr/bin/env node
// run.mjs · the whole battery on one worktree: build, capture every cell of every scene (lib.mjs SCENE_GROUNDS), the
// live windows, the motion windows, the 100 s drift windows (H3-12), the unshimmed-WebKit probe, the three colour-retune
// variants (H3-8) and the field-claim scenes' unclaimed variant (H3-7), then every witness.
// Each witness's full output lands in <capdir>/results/<id>.log.
//   node run.mjs <worktree> [--label head] [--engines chromium,webkit] [--skip-build] [--skip-capture] [--live-ms 9000] [--demo]
//     [--query claim=honest]   extra URL parameters for every page (the specimen page's consumer switches)
// --demo also builds the worktree's demo for the owner-glance story pair (glance.mjs --story-base/--story-route).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, HERE, RETUNES, FIELD_CLAIM_SCENES, cli } from "./lib.mjs";
import { buildSpecimens, buildDemo } from "./build.mjs";
import { capture } from "./capture.mjs";

// The battery: M-1..M-9 as revised by H2 and H3, M-1x (H3-1, reported until Q-11), M-2m with the drift leg (H3-12), M-2h
// (H3-5), O-66 (H3-9), STACK (H3-11), the route witnesses (W-A for floor v2, W-C and W-S for C″, W-G for D3-G; W-B, W-D,
// W-E and W-F stay as banked or retired families left them), the transmission report T (H-12, ungated) and the
// instrument's own raw check (H-1). H5 (pass 5) adds LIT (H5-2, the lighting literals, REPORTED) and HOV (H5-3, no
// :hover paints a value built on --fill-selected; static, read from the capture's worktree).
export const WITNESSES = [
  ["RAW", "raw-clean"],
  ["M-1", "m1-no-grey"], ["M-1x", "m1x-off-paper"], ["M-2", "m2-text-contrast"], ["M-2m", "m2-motion"], ["M-2h", "m2-held-window"], ["M-3", "m3-non-text"], ["M-4", "m4-dock-register"],
  ["M-5", "m5-live-dock"], ["M-6", "m6-separable-ladder"], ["M-7", "m7-halos-whole"], ["M-8", "m8-chrome-calm"], ["M-9", "m9-state-registers"],
  ["O-66", "o66-field-row"], ["STACK", "stack-host"], ["W-A", "wa-no-signal"], ["W-S", "ws-claim-stamp"], ["W-B", "wb-substrate-publishes"], ["W-C", "wc-ink-follows"], ["W-D", "wd-solved-tokens"],
  ["W-E", "we-ink-ground"], ["W-F", "wf-field-yields"], ["W-G", "wg-hue-through"], ["T", "t-transmission"],
  ["LIT", "lighting-literals"], ["HOV", "hover-fill-selected"],
];

export function runWitnesses(capdir, extraArgs = []) {
  fs.mkdirSync(path.join(capdir, "results"), { recursive: true });
  const out = [];
  for (const [id, script] of WITNESSES) {
    const r = spawnSync(process.execPath, [path.join(HERE, `${script}.mjs`), capdir, ...extraArgs], { encoding: "utf8", maxBuffer: 256 << 20 });
    fs.writeFileSync(path.join(capdir, "results", `${id}.log`), (r.stdout || "") + (r.stderr || ""));
    const verdict = (r.stdout || "").trim().split("\n").pop() || (r.stderr || "").trim().split("\n").pop();
    out.push({ id, script, exit: r.status, verdict });
    console.log(`${id.padEnd(4)} exit ${r.status} · ${verdict}`);
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const a = cli({ label: { type: "string" }, engines: { type: "string" }, "skip-build": { type: "boolean" }, "skip-capture": { type: "boolean" }, "live-ms": { type: "string" }, demo: { type: "boolean" }, query: { type: "string" } });
  if (!a._[0]) { console.error("usage: node run.mjs <worktree> [--label head]"); process.exit(2); }
  const label = a.label || "head", capdir = path.join(OUT, "caps", label), dist = path.join(OUT, "builds", label, "dist");
  if (!a["skip-build"]) { const { meta } = await buildSpecimens(a._[0], label); console.log(`built ${label} @ ${meta.sha}`); if (a.demo) console.log(`built demo → ${await buildDemo(a._[0], label)}`); }
  if (!a["skip-capture"]) {
    await capture(dist, { out: capdir, engines: a.engines, live: true, liveMs: a["live-ms"], motion: true, drift: true, probeUnshimmed: true, worktree: path.resolve(a._[0]), query: a.query });
    for (const [variant, css] of Object.entries(RETUNES)) {
      const f = path.join(OUT, `${variant}.css`); fs.writeFileSync(f, css);
      await capture(dist, { out: capdir, engines: a.engines, grounds: "paper", scenes: "ladder,dialog", variant, inject: f, query: a.query });
    }
    await capture(dist, { out: capdir, engines: a.engines, grounds: "aurora", scenes: FIELD_CLAIM_SCENES.join(","), variant: "noclaim", query: ["claim=none", a.query].filter(Boolean).join("&") });   // the first claim= wins
  }
  const res = runWitnesses(capdir);
  fs.writeFileSync(path.join(capdir, "results", "summary.json"), JSON.stringify(res, null, 1));
}
