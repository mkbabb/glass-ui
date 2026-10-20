#!/usr/bin/env node
// selftest.mjs · H-1: every witness must PASS on the clean fixture and, for every planted violation aimed at it,
// FAIL with the planted cell among its failing lines (or, for a control, still PASS), in Chromium and in Playwright
// WebKit. A fault whose planted cell has no input in an engine (`engines` in FAULTS, or a witness whose cells in
// that engine are all UNMEASURED) is printed N/A with the reason, never counted OK.
//   node selftest.mjs [--out <dir>] [--only E-2,E-6] [--engines chromium,webkit] [--faults e2-prog,e6-dim]
// Exit 1 if any run is BROKEN: a witness that fails its clean fixture, passes a planted FAIL, fails a control, or
// fails a plant on some other cell than the planted one, or UNREAD: a plant whose planted cell failed only as an engine
// close in three runs.
import { parseArgs, isClosed } from "./lib.mjs";
import { WITNESSES, runOne } from "./run.mjs";
import { FAULTS } from "./fixtures.mjs";

const a = parseArgs();
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const onlyFaults = typeof a.faults === "string" ? new Set(a.faults.split(",")) : null;
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
const out = typeof a.out === "string" ? ["--out", a.out] : [];
// A fault whose planted cell has no input in an engine names its engines in FAULTS (`engines`). Since H-4 the held
// touch has an input in both engines (lib.mjs openTouchPage); a touch DRAG does not scroll in macOS WebKit, so the
// scroll-snap strip's plant is Chromium's alone.
const ENGINE_ONLY = Object.fromEntries(Object.entries(FAULTS).filter(([, fl]) => fl.engines).map(([n, fl]) => [n, fl.engines]));
let broken = 0, runs = 0, na = 0; const retried = [];
const failLines = (o) => o.split("\n").filter((l) => /^\s+FAIL\s/.test(l));
// H3 (pass 3): the capture (CK-25) carries a gating cell (its committed frame shows a commit that happened) and so a
// plant (`cap-nocommit`); it is self-tested beside the witnesses, on the fixture's `pop` scene, light, both pointers
for (const [id, file] of [...WITNESSES, ["CAP", "capture.mjs"]]) {
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
      const argv = ["--fixture", "--fault", name, "--engine", engine, ...out, ...(fl.args ?? [])];
      const expectPass = fl.expect === "pass", expectUnm = fl.expect === "unmeasured";
      // A plant is proven only by its planted cell failing on the plant's own reading. A planted cell that FAILs only
      // because its engine closed or hung (ENGINE CLOSED, CELL TIMEOUT: another seat's load) proves nothing about the
      // plant: the fault is re-run up to twice, and a plant still read only that way is UNREAD, never OK (H2 §2.3,
      // `e2-prog` in Chromium at load 133 read OK on `ENGINE CLOSED, REPRODUCED 2/2`).
      const planted = (o) => failLines(o).filter((l) => !fl.cell || fl.cell.test(l));
      const closedOnly = (o) => planted(o).length > 0 && planted(o).every((l) => isClosed(l));
      let r = runOne(file, argv); runs++;
      for (let k = 0; k < 2 && !expectPass && !expectUnm && closedOnly(r.out); k++) { retried.push(`${tag.trim()} ${name}: planted cell read only as an engine close, re-run`); r = runOne(file, argv); }
      if (r.retried) retried.push(`${tag.trim()} ${name}: ${r.retried}`);
      const unread = !expectPass && !expectUnm && closedOnly(r.out);
      const fails = failLines(r.out);
      const unm = r.out.split("\n").filter((l) => /^\s+UNMEASURED\s/.test(l));
      const hit = !fl.cell || fails.some((l) => fl.cell.test(l) && !isClosed(l));
      if (faultNA) {
        na++;
        console.log(`N/A    ${tag} ${expectPass ? "control" : "fault  "} ${name} exit ${r.code}: the planted cell has no input in Playwright ${engine} (FAULTS engines) · ${r.last.trim()}`);
        continue;
      }
      // a control passes; an UNMEASURED plant leaves its cell UNMEASURED with no failing cell (exit 0 or 3); a fault fails
      // with its planted cell among the failing lines
      const ok = expectPass ? r.code === 0 : expectUnm ? (r.code === 0 || r.code === 3) && !fails.length && unm.some((l) => fl.cell.test(l)) : r.code === 1 && hit;
      if (!ok) broken++;
      const kind = expectPass ? "control" : expectUnm ? "unmeas " : "fault  ";
      console.log(`${ok ? "OK    " : unread ? "UNREAD" : "BROKEN"} ${tag} ${kind} ${name} (${fl.why}) exit ${r.code}${unread ? " · the planted cell failed only as an engine close in 3 runs: the plant is unread" : !expectPass && !expectUnm && r.code === 1 && !hit ? ` · the planted cell ${fl.cell} is not among the ${fails.length} failing lines` : ""}`);
      if (!ok) for (const l of (expectPass || expectUnm ? [...fails, ...unm] : fails.length ? fails : r.out.split("\n").slice(-4)).slice(0, 6)) console.log(`         ${l.trim()}`);
      else if (expectUnm) console.log(`         planted UNMEASURED: ${unm.find((l) => fl.cell.test(l))?.trim().slice(0, 240)}`);
      else if (!expectPass) console.log(`         first planted FAIL: ${fails.find((l) => !fl.cell || fl.cell.test(l))?.trim().slice(0, 240)}`);
    }
  }
}
if (retried.length) console.log(`engine-closed re-runs (${retried.length}): ${retried.join("; ")}`);
console.log(broken ? `selftest: ${broken} of ${runs} runs BROKEN or UNREAD (${na} N/A)` : `selftest: ${runs} runs, ${na} N/A; every witness passes its fixture, fails each planted violation on the planted cell, and passes each control, in every engine with an input for it`);
process.exit(broken ? 1 : 0);
