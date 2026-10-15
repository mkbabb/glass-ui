#!/usr/bin/env node
// flake-cases.mjs --out <dir> · critique-B pass 8 · S-12 under P7-R2 (a): "A key is base-green when it passes on the
// floor base in every run. A key that fails on the base under an alternating rerun (3 per tree) is flaky: recorded and
// kept out of the bar." Written and hashed BEFORE reading pass-8/B-kit, so the EXPECTED verdicts below are fixed
// before the route's flake tool or LAW text is seen. Only the invocation glue (which file names and flags the route's
// tool takes) is written after reading, and is disclosed as such.
//
// Each case is one key `tests-visual/zq8/flake.spec.ts :: <case>` with a status per run:
//   base main run, then the alternating reruns base-1, route-1, base-2, route-2, base-3, route-3; route main run.
// Writes browser-seat/2 reports: base.json, route.json, rerun-base-{1,2,3}.json, rerun-route-{1,2,3}.json, and
// EXPECT.json { case: { baseGreen, inBar, newFailure, flaky } } from the ruling's text alone:
//   F1 base P / PPP, route F / FFF        base-green, in the bar, a NEW failure                       (regression)
//   F2 base P / PFP, route F / FFF        NOT base-green (fails once on the base): flaky, OUT of the bar, recorded
//   F3 base P / FFF, route F / FFF        flaky (fails on the base under rerun), OUT of the bar, recorded
//   F4 base F / FFF, route F / FFF        not base-green, not flaky-green, out of the bar, no new failure
//   F5 base P / PPP, route P / PPP        base-green, in the bar, held
//   F6 base P / PPP, route F / PPP        base-green, in the bar; the ruling defines no route-side forgiveness:
//                                          RECORD whatever LAW states (a pass-8 LAW that forgives must say so)
//   F7 base P / (no reruns), route F      the protocol was not run for a key the route fails: must NOT read held;
//                                          PASS when the tool reports it as a new failure or as "rerun owed"/an error
//   F8 base P / PPP, route ABSENT          base-green and absent from the route: not held (P7-G2 meets P7-R2)
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const O = resolve(arg("--out")); mkdirSync(O, { recursive: true });
const S = "tests-visual/zq8/flake.spec.ts";
const p = "expected", f = "unexpected", x = null;
// [baseMain, [b1,b2,b3], routeMain, [r1,r2,r3]]
const C = {
    F1: [p, [p, p, p], f, [f, f, f]], F2: [p, [p, f, p], f, [f, f, f]], F3: [p, [f, f, f], f, [f, f, f]],
    F4: [f, [f, f, f], f, [f, f, f]], F5: [p, [p, p, p], p, [p, p, p]], F6: [p, [p, p, p], f, [p, p, p]],
    F7: [p, [x, x, x], f, [x, x, x]], F8: [p, [p, p, p], x, [x, x, x]],
};
const EXPECT = {
    F1: { baseGreen: true, inBar: true, newFailure: true, flaky: false },
    F2: { baseGreen: false, inBar: false, newFailure: false, flaky: true },
    F3: { baseGreen: false, inBar: false, newFailure: false, flaky: true },
    F4: { baseGreen: false, inBar: false, newFailure: false, flaky: false },
    F5: { baseGreen: true, inBar: true, newFailure: false, flaky: false },
    F6: { baseGreen: true, inBar: true, newFailure: "RECORD", flaky: false },
    F7: { baseGreen: "RECORD", inBar: "RECORD", newFailure: "NOT-HELD", flaky: "RECORD" },
    F8: { baseGreen: true, inBar: true, newFailure: true, flaky: false },
};
const rep = (pick) => ({ $schema: "browser-seat/2", results: Object.entries(C).filter(([, c]) => pick(c) !== x).map(([id, c]) => ({ spec: S, title: id, status: pick(c) })), bands: [{ band: "zq8", specs: [S] }] });
writeFileSync(join(O, "base.json"), JSON.stringify(rep((c) => c[0]), null, 1));
writeFileSync(join(O, "route.json"), JSON.stringify(rep((c) => c[2]), null, 1));
for (const i of [0, 1, 2]) {
    writeFileSync(join(O, `rerun-base-${i + 1}.json`), JSON.stringify(rep((c) => c[1][i]), null, 1));
    writeFileSync(join(O, `rerun-route-${i + 1}.json`), JSON.stringify(rep((c) => c[3][i]), null, 1));
}
writeFileSync(join(O, "EXPECT.json"), JSON.stringify(EXPECT, null, 1));
console.log(`FLAKE cases ${Object.keys(C).length} written to ${O}`);
