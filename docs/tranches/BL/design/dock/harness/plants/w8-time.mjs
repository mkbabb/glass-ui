// plants/w8-time.mjs · H6-5 (pass-6/H6.md): W-8 counted in time, on synthetic strips through lib.mjs analyseMorph.
//
//   node plants/w8-time.mjs          exit 0 when every row holds
//
// A strip on the pinned dock rung, time-normalised to land exactly at the rung's clock (as the fixture's episodes do),
// logged every 16.7 ms; after the landing frame the log carries three more entries before the flag closes:
//   crowded  three entries in 21.4 ms (pass-5/H5.md §2: the fixture's `lead-remove`, 1.3 display frames): PASS
//   late     three entries in 50 ms (three display frames): FAIL `window`
// and the pass-5 rule (log entries counted, ≤ 2) as the plant's control: it reads `crowded` FAIL.
import { analyseMorph, springSpec, springErr, DOCK_RUNG } from "../lib.mjs";

const rung = DOCK_RUNG, spec = springSpec(rung), T = spec.settleS * 1000;
const w0 = (2 * Math.PI) / rung.response, z = rung.dampingFraction;
const L0 = 56, L1 = 356, e0 = L0 - L1, eT = springErr(w0, z, e0, 0, T / 1000);
const len = (t) => (t >= T ? L1 : L1 + springErr(w0, z, e0, 0, t / 1000) - eT * (t / T));
function strip(after) {
    const fr = [{ t: -16.7, e: [0, 0, L0, 56], m: false }];
    let t = 0;
    for (; t < T; t += 16.7) fr.push({ t, e: [0, 0, len(t), 56], m: true });
    fr.push({ t: T, e: [0, 0, L1, 56], m: true });   // the landing frame
    for (const dt of after) fr.push({ t: T + dt, e: [0, 0, L1, 56], m: dt < after.at(-1) });
    for (let k = 1; k <= 6; k++) fr.push({ t: T + after.at(-1) + 16.7 * k, e: [0, 0, L1, 56], m: false });
    return fr;
}
const rows = [];
const ok = (name, cond, got) => { rows.push(cond); console.log(`${cond ? "OK  " : "BAD "} SYN  ${name}  ${got}`); };
const crowded = analyseMorph(strip([7.1, 14.3, 21.4]), rung, { ax: "x", seats: false });
const late = analyseMorph(strip([16.7, 33.3, 50]), rung, { ax: "x", seats: false });
ok("crowded", crowded.window.ok, `window ${crowded.window.ok ? "holds" : "FAILS"}: ${crowded.window.closeMinusLandFrames} entries, ${crowded.window.closeMinusLandMs} ms after landing (bound 2 × ${crowded.window.frameMs} ms)${crowded.window.why ? " — " + crowded.window.why : ""}`);
ok("late", !late.window.ok && /W-8/.test(late.window.why), `window ${late.window.ok ? "HOLDS" : "fails"}: ${late.window.why}`);
// the pass-5 rule as the control: it counted entries, so the crowded strip read 3 > 2 and failed
ok("pass5-control", crowded.window.closeMinusLandFrames > 2, `the pass-5 rule (entries ≤ 2) reads the crowded strip ${crowded.window.closeMinusLandFrames > 2 ? "FAIL (3 entries)" : "pass"}`);
console.log(`${rows.every(Boolean) ? "SYN W8-TIME PASS" : "SYN W8-TIME FAIL"}  ${rows.filter(Boolean).length}/${rows.length}`);
process.exitCode = rows.every(Boolean) ? 0 : 1;
