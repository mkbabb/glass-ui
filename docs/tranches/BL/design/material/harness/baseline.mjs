#!/usr/bin/env node
// baseline.mjs · the per-witness, per-engine, per-theme table of a finished run (the H2 baseline, and any route's run
// against it). Every witness of run.mjs WITNESSES is re-run on the capture once per gate engine × theme, gated on that
// engine and restricted with --cells to that engine and theme, so each row of the table is one witness's verdict on one
// engine's cells in one theme. The witness results are written into a mirror directory (cells.json copied, png/
// symlinked) so the run's own results/ stay as run.mjs left them.
//   node baseline.mjs <capdir> [--out <file.json>] [--only M-2,W-G]
// Prints a Markdown table: witness | engine | theme | verdict (gated rows failed of measured). A witness that reads no
// cells of an engine and theme prints "—" (it has no rows there: e.g. M-1 dark, M-7's halo in one theme only).
// W-B and the signal legs read live windows; T is a report (exit 0 unless --expect).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { HERE, cli, list } from "./lib.mjs";
import { WITNESSES } from "./run.mjs";

const a = cli({ out: { type: "string" }, only: { type: "string" } });
if (!a._[0]) { console.error("usage: node baseline.mjs <capdir> [--out file.json]"); process.exit(2); }
const capdir = path.resolve(a._[0]), mirror = capdir + "-baseline";
fs.rmSync(mirror, { recursive: true, force: true }); fs.mkdirSync(mirror, { recursive: true });
fs.copyFileSync(path.join(capdir, "cells.json"), path.join(mirror, "cells.json"));
fs.symlinkSync(path.join(capdir, "png"), path.join(mirror, "png"));
const only = list(a.only, null), rows = [];
for (const [id, script] of WITNESSES.filter(([id]) => !only || only.includes(id))) for (const engine of ["chromium", "webkit"]) for (const theme of ["light", "dark"]) {
  const r = spawnSync(process.execPath, [path.join(HERE, `${script}.mjs`), mirror, "--gate", engine, "--cells", `^${engine} ${theme} `], { encoding: "utf8", maxBuffer: 256 << 20 });
  const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop() || "";
  const m = verdict.match(/^(PASS|FAIL) \((?:(\d+) of )?(\d+) gated rows\)/), none = /no gated rows/.test(verdict);
  const row = { id, engine, theme, exit: r.status, verdict, gateRows: m ? +m[3] : 0, gateFails: m ? (m[1] === "PASS" ? 0 : +(m[2] ?? m[3])) : null, none };
  rows.push(row);
  fs.writeFileSync(path.join(mirror, `${id}-${engine}-${theme}.log`), out);
  console.error(`${id} ${engine} ${theme}: ${verdict}`);
}
const cellTxt = (r) => (r.none ? "—" : r.gateFails === 0 ? `PASS ${r.gateRows}` : `FAIL ${r.gateFails}/${r.gateRows}`);
console.log("| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |\n|---|---|---|---|---|");
for (const id of [...new Set(rows.map((r) => r.id))]) {
  const g = (e, t) => cellTxt(rows.find((r) => r.id === id && r.engine === e && r.theme === t));
  console.log(`| ${id} | ${g("chromium", "light")} | ${g("chromium", "dark")} | ${g("webkit", "light")} | ${g("webkit", "dark")} |`);
}
if (a.out) fs.writeFileSync(path.resolve(a.out), JSON.stringify({ capdir, rows }, null, 1));
