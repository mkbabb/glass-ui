#!/usr/bin/env node
// record-step.mjs — author-side: record the step just applied to the tree in frozen/SEQUENCE.json.
//   node record-step.mjs --root <wt> --start <sha>                 (before step 0: the base digest)
//   node record-step.mjs --root <wt> --id S2-1 --kind moves|row|floor-rows --file frozen/x.json --why "…"
import { resolve } from "node:path";
import { recordStep, startSeq } from "./lib/sequence.mjs";
const a = process.argv.slice(2);
const opt = (k) => (a.includes(k) ? a[a.indexOf(k) + 1] : null);
const root = resolve(opt("--root"));
if (opt("--start")) { const s = startSeq(root, opt("--start")); console.log(`chain started at ${s.baseSha}, base ${s.base.slice(0, 16)}…`); }
else console.log(`${opt("--id")} → ${recordStep(root, { id: opt("--id"), kind: opt("--kind"), file: opt("--file"), why: opt("--why") }).slice(0, 16)}…`);
