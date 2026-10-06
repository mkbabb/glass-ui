#!/usr/bin/env node
// selftest.mjs · H-1: every witness must PASS on the clean fixture and, for every planted violation aimed at it,
// FAIL with the planted cell among its failing lines (or, for a control, still PASS), in Chromium and in Playwright
// WebKit. A fault whose planted cell has no input in an engine (`engines` in FAULTS, or a witness whose cells in
// that engine are all UNMEASURED) is printed N/A with the reason, never counted OK.
//   node selftest.mjs [--out <dir>] [--only E-2,E-6] [--engines chromium,webkit] [--faults e2-prog,e6-dim]
// Exit 1 if any run is BROKEN: a witness that fails its clean fixture, passes a planted FAIL, fails a control, or
// fails a plant on some other cell than the planted one.
import { parseArgs } from "./lib.mjs";
import { WITNESSES, runOne } from "./run.mjs";
import { FAULTS } from "./fixtures.mjs";

const a = parseArgs();
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const onlyFaults = typeof a.faults === "string" ? new Set(a.faults.split(",")) : null;
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
const out = typeof a.out === "string" ? ["--out", a.out] : [];
// Chromium-only inputs: the held touch (a long-tap gesture) exists in Chromium alone (H-4)
const ENGINE_ONLY = { "E-5": ["chromium"], "e3-gutter": ["chromium"] };
let broken = 0, runs = 0, na = 0; const retried = [];
const failLines = (o) => o.split("\n").filter((l) => /^\s+FAIL\s/.test(l));
for (const [id, file] of WITNESSES) {
  if (only && !only.has(id)) continue;
  for (const engine of engines) {
    const tag = `${id} ${engine.padEnd(8)}`;
    const witnessNA = ENGINE_ONLY[id] && !ENGINE_ONLY[id].includes(engine);
    if (!onlyFaults) {
      const clean = runOne(file, ["--fixture", "--engine", engine, ...out]); runs++;
      if (clean.retried) retried.push(`${tag.trim()} clean: ${clean.retried}`);
      const ok = clean.code === 0 || (witnessNA && clean.code === 3);
      if (!ok) broken++;
      console.log(`${ok ? (witnessNA ? "N/A   " : "OK    ") : "BROKEN"} ${tag} clean exit ${clean.code} · ${clean.last.trim()}`);
      if (!ok) for (const l of failLines(clean.out).slice(0, 6)) console.log(`         ${l.trim()}`);
    }
    for (const [name, fl] of Object.entries(FAULTS)) {
      if (!fl.witnesses.includes(id) || (onlyFaults && !onlyFaults.has(name))) continue;
      const faultNA = witnessNA || (ENGINE_ONLY[name] && !ENGINE_ONLY[name].includes(engine));
      const r = runOne(file, ["--fixture", "--fault", name, "--engine", engine, ...out]); runs++;
      if (r.retried) retried.push(`${tag.trim()} ${name}: ${r.retried}`);
      const expectPass = fl.expect === "pass";
      const fails = failLines(r.out);
      const hit = !fl.cell || fails.some((l) => fl.cell.test(l));
      if (faultNA) {
        na++;
        console.log(`N/A    ${tag} ${expectPass ? "control" : "fault  "} ${name} exit ${r.code}: the planted cell has no input in Playwright ${engine} (H-4) · ${r.last.trim()}`);
        continue;
      }
      const ok = expectPass ? r.code === 0 : r.code === 1 && hit;
      if (!ok) broken++;
      console.log(`${ok ? "OK    " : "BROKEN"} ${tag} ${expectPass ? "control" : "fault  "} ${name} (${fl.why}) exit ${r.code}${!expectPass && r.code === 1 && !hit ? ` · the planted cell ${fl.cell} is not among the ${fails.length} failing lines` : ""}`);
      if (!ok) for (const l of (expectPass ? fails : fails.length ? fails : r.out.split("\n").slice(-4)).slice(0, 6)) console.log(`         ${l.trim()}`);
      else if (!expectPass) console.log(`         first planted FAIL: ${fails.find((l) => !fl.cell || fl.cell.test(l))?.trim().slice(0, 240)}`);
    }
  }
}
if (retried.length) console.log(`engine-closed re-runs (${retried.length}): ${retried.join("; ")}`);
console.log(broken ? `selftest: ${broken} of ${runs} runs BROKEN (${na} N/A)` : `selftest: ${runs} runs, ${na} N/A; every witness passes its fixture, fails each planted violation on the planted cell, and passes each control, in every engine with an input for it`);
process.exit(broken ? 1 : 0);
