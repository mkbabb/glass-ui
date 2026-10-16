#!/usr/bin/env node
// selftest.mjs · every witness must PASS on the minimal fixture and, for every planted violation aimed at it, FAIL
// with the planted cell among its failing lines (or, for a control plant, still PASS), in Chromium and in Playwright
// WebKit (T-8 runs both engines itself).
//   node selftest.mjs [--out <dir>] [--only T-1,W-E] [--engines chromium,webkit] [--faults t1-late,t6-prog]
// A witness that fails its clean fixture, passes a planted FAIL, fails a planted control, or fails a plant on some
// other cell than the planted one, is BROKEN; exit 1 if any is. A run whose engine closed under load is re-run
// once by runOne (NOT-REPRODUCED or REPRODUCED, printed on its line and counted at the end).
import { parseArgs, HARNESS } from "./lib.mjs";
import { WITNESSES, runOne, familyOf } from "./run.mjs";
import { FAULTS } from "./fixtures.mjs";

const a = parseArgs();
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const onlyFaults = typeof a.faults === "string" ? new Set(a.faults.split(",")) : null;
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
const out = typeof a.out === "string" ? ["--out", a.out] : [];
let broken = 0, runs = 0; const retried = [];
console.log(`selftest · harness ${HARNESS.rev} ${HARNESS.hash} (${HARNESS.files} files)`);
const failLines = (o) => o.split("\n").filter((l) => /^\s+FAIL\s/.test(l));
for (const [id, file, generic, opts = {}] of WITNESSES) {
  if (only && !only.has(id)) continue;
  for (const engine of generic ? engines : ["both"]) {
    const eng = engine === "webkit" ? ["--engine", "webkit"] : [];
    const tag = `${id.padEnd(4)} ${engine.padEnd(8)}`;
    const fam0 = familyOf(id, opts), cleanFamily = fam0 ? ["--family", fam0] : [];
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
      const flv = f.flavor ? ["--flavor", f.flavor] : []; // H4-1: a plant that gates only on a development flavour
      const r = runOne(file, ["--fixture", ...fam, "--fault", name, ...flv, ...eng, ...out], f.env ?? {}); runs++;
      if (r.retried) retried.push(`${tag.trim()} ${name}: ${r.retried}`);
      const expectPass = f.expect === "pass";
      // H3-1: `expect: "error"` plants a stall: the witness must stop loud (exit 2) with the planted line in its output
      const fails = f.expect === "error" ? r.out.split("\n").filter((l) => /HARNESS ERROR/.test(l)) : failLines(r.out);
      const hit = !f.cell || fails.some((l) => f.cell.test(l));
      const noteRe = f.note?.[engine];
      const noted = !noteRe || noteRe.test(r.out);
      const ok = expectPass ? r.code === 0 && noted : f.expect === "error" ? r.code === 2 && hit : r.code === 1 && hit;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} ${tag} ${expectPass ? "control" : "fault  "} ${name} (${f.why}) exit ${r.code}${!expectPass && r.code === 1 && !hit ? ` · the planted cell ${f.cell} is not among the ${fails.length} failing lines` : ""}${expectPass && noteRe ? ` · note ${noted ? "present" : "ABSENT"}: ${(r.out.match(noteRe) ?? ["—"])[0]}` : ""} · ${r.last}`);
      if (!ok) for (const l of (expectPass ? fails : fails.length ? fails : r.out.split("\n")).slice(0, 4)) console.log(`         ${l.trim()}`);
      else if (!expectPass) console.log(`         first planted FAIL: ${fails.find((l) => !f.cell || f.cell.test(l))?.trim().slice(0, 220)}`);
    }
  }
}
if (retried.length) console.log(`engine-closed re-runs (${retried.length}): ${retried.join("; ")}`);
console.log(broken ? `selftest: ${broken} of ${runs} runs BROKEN` : `selftest: ${runs} runs; every witness passes its fixture, fails each planted violation on the planted cell, and passes each control, in every engine`);
process.exit(broken ? 1 : 0);
