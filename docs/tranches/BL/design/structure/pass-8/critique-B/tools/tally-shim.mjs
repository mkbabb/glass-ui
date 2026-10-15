#!/usr/bin/env node
// tally-shim.mjs <base-rekeyed.json> <route.json> · critique-B pass 8 · written AFTER the battery hash (invocation glue
// only, not part of the hash). The hashed browser-plants.mjs calls its tally tool positionally; the pass-8 kit's
// tools/browser-tally.mjs takes --base/--route and the P7-R2 rerun reports. This forwards both reports and, unless
// SHIM_NO_RERUNS=1, the committed rerun reports in RERUN_DIR (base-*.rekeyed.json as --base-rerun, route-*.json as
// --route-rerun), so T0 equals the committed tally. stdout, stderr and the exit code pass through unchanged.
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const TALLY = process.env.TALLY ?? resolve(HERE, "../../B-kit/tools/browser-tally.mjs");
const RR = process.env.RERUN_DIR ?? resolve(HERE, "../../B-kit/results/p8/browser/reruns");
const [b, r] = process.argv.slice(2);
const extra = [];
if (process.env.SHIM_NO_RERUNS !== "1") for (const f of readdirSync(RR).sort()) {
    if (/^base-.*\.rekeyed\.json$/.test(f)) extra.push("--base-rerun", join(RR, f));
    else if (/^route-.*\.json$/.test(f)) extra.push("--route-rerun", join(RR, f));
}
const out = spawnSync("node", [TALLY, "--base", b, "--route", r, ...extra], { stdio: "inherit" });
process.exit(out.status ?? 2);
