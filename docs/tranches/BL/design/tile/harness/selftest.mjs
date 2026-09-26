#!/usr/bin/env node
// selftest.mjs · every witness must PASS on the minimal fixture and, for every planted violation aimed at it, FAIL
// with the planted cell among its failing lines (or, for a control plant, still PASS), in Chromium and in Playwright
// WebKit (T-8 runs both engines itself).
//   node selftest.mjs [--out <dir>] [--only T-1,W-E] [--engines chromium,webkit] [--faults t1-late,t6-prog]
// A witness that fails its clean fixture, passes a planted FAIL, fails a planted control, or fails a plant on some
// other cell than the planted one, is BROKEN; exit 1 if any is. A run whose engine closed under load is re-run
// once by runOne (NOT-REPRODUCED or REPRODUCED, printed on its line and counted at the end).
import { parseArgs } from "./lib.mjs";
import { WITNESSES, runOne } from "./run.mjs";
import { FAULTS } from "./fixtures.mjs";

const a = parseArgs();
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const onlyFaults = typeof a.faults === "string" ? new Set(a.faults.split(",")) : null;
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
const out = typeof a.out === "string" ? ["--out", a.out] : [];
let broken = 0, runs = 0; const retried = [];
const failLines = (o) => o.split("\n").filter((l) => /^\s+FAIL\s/.test(l));
for (const [id, file, generic] of WITNESSES) {
  if (only && !only.has(id)) continue;
  for (const engine of generic ? engines : ["both"]) {
    const eng = engine === "webkit" ? ["--engine", "webkit"] : [];
    const tag = `${id.padEnd(4)} ${engine.padEnd(8)}`;
    const cleanFamily = id === "W-E" ? ["--family", "e"] : [];
    if (!onlyFaults) {
      const clean = runOne(file, ["--fixture", ...cleanFamily, ...eng, ...out]); runs++;
      if (clean.retried) retried.push(`${tag.trim()} clean: ${clean.retried}`);
      const ok = clean.code === 0;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} ${tag} clean exit ${clean.code} · ${clean.last}`);
      if (!ok) for (const l of failLines(clean.out).slice(0, 4)) console.log(`         ${l.trim()}`);
    }
    for (const [name, f] of Object.entries(FAULTS)) {
      if (!f.witnesses.includes(id) || (onlyFaults && !onlyFaults.has(name))) continue;
      const fam = f.family ? ["--family", f.family] : cleanFamily;
      const r = runOne(file, ["--fixture", ...fam, "--fault", name, ...eng, ...out]); runs++;
      if (r.retried) retried.push(`${tag.trim()} ${name}: ${r.retried}`);
      const expectPass = f.expect === "pass";
      const fails = failLines(r.out);
      const hit = !f.cell || fails.some((l) => f.cell.test(l));
      const ok = expectPass ? r.code === 0 : r.code === 1 && hit;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} ${tag} ${expectPass ? "control" : "fault  "} ${name} (${f.why}) exit ${r.code}${!expectPass && r.code === 1 && !hit ? ` · the planted cell ${f.cell} is not among the ${fails.length} failing lines` : ""} · ${r.last}`);
      if (!ok) for (const l of (expectPass ? fails : fails.length ? fails : r.out.split("\n")).slice(0, 4)) console.log(`         ${l.trim()}`);
      else if (!expectPass) console.log(`         first planted FAIL: ${fails.find((l) => !f.cell || f.cell.test(l))?.trim().slice(0, 220)}`);
    }
  }
}
if (retried.length) console.log(`engine-closed re-runs (${retried.length}): ${retried.join("; ")}`);
console.log(broken ? `selftest: ${broken} of ${runs} runs BROKEN` : `selftest: ${runs} runs; every witness passes its fixture, fails each planted violation on the planted cell, and passes each control, in every engine`);
process.exit(broken ? 1 : 0);
