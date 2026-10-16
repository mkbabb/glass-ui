#!/usr/bin/env node
// tally-shim.mjs <base-rekeyed.json> <route.json> · critique-B pass 9 · written and hashed BEFORE reading pass-9/B-kit.
// Pass-8's hashed browser-plants.mjs calls its tally positionally; the tally takes --base/--route plus the P7-R2 rerun
// reports. This forwards both and, unless SHIM_NO_RERUNS=1, every rerun report in RERUN_DIR (base-*.rekeyed.json as
// --base-rerun, route-*.json as --route-rerun). TALLY is the pass-9 kit's tools/browser-tally.mjs. Exit passes through.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
const TALLY = process.env.TALLY, RR = process.env.RERUN_DIR;
if (!TALLY || !RR) { console.error("tally-shim: TALLY and RERUN_DIR are required"); process.exit(2); }
const [b, r] = process.argv.slice(2); const extra = [];
if (process.env.SHIM_NO_RERUNS !== "1") for (const f of readdirSync(RR).sort()) {
    if (/^base-.*\.rekeyed\.json$/.test(f)) extra.push("--base-rerun", join(RR, f));
    else if (/^route-.*\.json$/.test(f)) extra.push("--route-rerun", join(RR, f));
}
const out = spawnSync("node", [TALLY, "--base", b, "--route", r, ...extra], { stdio: "inherit" });
process.exit(out.status ?? 2);
