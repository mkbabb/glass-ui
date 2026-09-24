#!/usr/bin/env node
// W-D · D3-D's witness: the tokens are the solver's output. A clean solver run over the corpus reproduces
// tokens/glass.solved.css byte for byte, and the battery is green on every corpus cell in both engines.
//   Leg 1: <worktree>/src/styles/tokens/glass.solved.css exists and its first line names its solver,
//          `/* solver: <command> */`; the command runs in the worktree with D3_SOLVE_OUT=<scratch file>, and the
//          file it writes equals the committed one byte for byte.
//   Leg 2: M-1..M-8 over the battery capture (default: this capture) with --gate chromium,webkit all exit 0.
//   node wd-solved-tokens.mjs <capdir> [--worktree <path>] [--battery <capdir>]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { cli, loadCapture, report, HERE } from "./lib.mjs";

const a = cli({ worktree: { type: "string" }, battery: { type: "string" } }), cap = loadCapture(a._[0]);
const wt = a.worktree || cap.meta?.worktree, lines = [];
let rows = 0, fails = 0; const add = (ok) => { rows++; if (!ok) fails++; };
const file = wt && path.join(wt, "src/styles/tokens/glass.solved.css");
if (!file || !fs.existsSync(file)) {
  add(false);
  const hand = wt && fs.existsSync(path.join(wt, "src/styles/tokens/glass.css")) ? fs.readFileSync(path.join(wt, "src/styles/tokens/glass.css"), "utf8").split("\n").map((l, i) => [i + 1, l]).filter(([, l]) => /--glass-veil-(base|step):/.test(l)).map(([i, l]) => `glass.css:${i} ${l.trim()}`) : [];
  lines.push(`solver: RED by absence: ${wt ? "src/styles/tokens/glass.solved.css does not exist" : "no worktree (pass --worktree)"}${hand.length ? `; the ladder is hand-set (${hand.join("; ")})` : ""} ✗`);
} else {
  const head = fs.readFileSync(file, "utf8").split("\n")[0], m = head.match(/^\/\*\s*solver:\s*(.+?)\s*\*\//);
  if (!m) { add(false); lines.push(`solver: glass.solved.css names no solver on its first line (${head.slice(0, 80)}) ✗`); }
  else {
    const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "d3-solve-")), "glass.solved.css");
    let ok = false, note = "";
    try { execFileSync("sh", ["-c", m[1]], { cwd: wt, env: { ...process.env, D3_SOLVE_OUT: out }, stdio: "pipe", timeout: 30 * 60 * 1000 }); ok = fs.existsSync(out) && Buffer.compare(fs.readFileSync(out), fs.readFileSync(file)) === 0; note = ok ? "byte-identical" : fs.existsSync(out) ? "differs from the committed file" : "wrote nothing"; }
    catch (e) { note = "solver failed: " + String(e.message).split("\n")[0]; }
    add(ok); lines.push(`solver \`${m[1]}\`: ${note}${ok ? "" : " ✗"}`);
  }
}
const battery = path.resolve(a.battery || cap.capdir);
for (const m of ["m1-no-grey", "m2-text-contrast", "m3-non-text", "m4-dock-register", "m5-live-dock", "m6-separable-ladder", "m7-halos-whole", "m8-chrome-calm"]) {
  const r = spawnSync(process.execPath, [path.join(HERE, `${m}.mjs`), battery, "--gate", "chromium,webkit"], { encoding: "utf8" });
  const verdict = (r.stdout || "").trim().split("\n").pop();
  add(r.status === 0); lines.push(`battery ${m} (gate chromium+webkit): ${verdict}${r.status === 0 ? "" : " ✗"}`);
}
report(cap, { id: "W-D", title: "D3-D · the tokens are the solver's output (byte-identical re-solve; battery green in both engines)", lines, gateRows: rows, gateFails: fails, gate: ["chromium", "webkit"] });
