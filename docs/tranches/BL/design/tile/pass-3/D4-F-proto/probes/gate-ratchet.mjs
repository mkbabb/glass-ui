#!/usr/bin/env node
// D4-F pass-3 prototype · probes/gate-ratchet.mjs · G-BUNDLE-RATCHET's own verdict on a measured unpacked total.
// Imports the gate's function (scripts/verify-export-types.mjs, ratchetEvidence) from the worktree and feeds it the
// totals floor-v2/probes/bundle.sh measured: HEAD's datum, HEAD + floor v2 (FLOOR-V2 §5) and HEAD + floor v2 + the
// route (logs-s3/bundle.log). Writes nothing.
//   node gate-ratchet.mjs <worktree> <unpacked bytes>...
import path from "node:path";
import { pathToFileURL } from "node:url";

const [wt, ...totals] = process.argv.slice(2);
const { ratchetEvidence } = await import(pathToFileURL(path.join(wt, "scripts/verify-export-types.mjs")).href);
for (const t of totals) {
    try {
        console.log(`${t} ${JSON.stringify(ratchetEvidence(wt, Number(t)))}`);
    } catch (e) {
        console.log(`${t} THROWS: ${e.message}`);
    }
}
