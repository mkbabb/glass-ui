#!/usr/bin/env node
// AY.W-DOCK2 — the DEVICE-FREE born-RED witness for the re-authored lockstep gate.
//
// The live `proof:dock-animation-live` runs the morph on a real device; the born-RED
// proof a clean runner CAN execute is the PURE `detectAnimation` detector fed two
// synthetic timelines:
//
//   (1) HEAD-faithful (GREEN): the box rides --dock-morph-t on one clock AND the
//       LAST entering child opacity onset trails the box onset by ≈ the captured
//       36–96 ms (well inside the deliberate-stagger budget). detectAnimation →
//       zero violations.
//
//   (2) SYNTHETIC-LAG (RED): the SAME box morph, but the entering child onset is
//       pushed PAST the LOCKSTEP_BUDGET_MS budget (a re-added per-child SECOND clock
//       — the `transition: opacity 300ms ease 200ms` regression the
//       tests-visual/fixtures/dock-entering-child-lag.html fixture reproduces in a
//       real browser). detectAnimation → the lockstep violation.
//
// This is the FALSIFIABLE born-RED proof for HG1: the re-authored gate REDs on lag
// and GREENs at HEAD on the ENTERING-CHILD onset (NOT the tautological box-vs-scalar
// check, which is demoted to a non-binding structural fact). Run with `--head` for
// the GREEN arm or no arg for the born-RED arm.

import { detectAnimation } from "./proof-dock-animation-live.mjs";

const FRAME = 1000 / 60;

// A spring-ish 0→1 ramp over ~650ms, sampled per rAF frame — faithful to the real
// --dock-morph-t ring (rises over ~20+ frames, peaks ~1.045).
function springRamp(durationMs = 650) {
    const times = [];
    const morphTs = [];
    const widths = [];
    const from = 56;
    const to = 480;
    let t = 0;
    while (t <= durationMs + 4 * FRAME) {
        const x = Math.min(t / durationMs, 1);
        const eased = 1 - Math.pow(1 - x, 3);
        const overshoot = x < 1 ? eased + 0.045 * Math.sin(Math.PI * x) : 1;
        times.push(t);
        morphTs.push(overshoot);
        widths.push(from + (to - from) * overshoot);
        t += FRAME;
    }
    return { times, morphTs, widths };
}

// The entering child opacity: 0 until `onsetMs`, then ramps to 1 over `rampMs`.
function enteringChild(times, onsetMs, rampMs = 5 * FRAME) {
    return times.map((t) => {
        if (t < onsetMs) return 0;
        return Math.min((t - onsetMs) / rampMs, 1);
    });
}

function buildResult({ childOnsetMs }) {
    const { times, morphTs, widths } = springRamp();
    // The box width onsets at frame 1 (~16.7ms); the entering child onsets at
    // childOnsetMs (the deliberate stagger crossing for the HEAD arm, or a pushed-out
    // second-clock onset for the lag arm).
    const enteringChildOpacities = enteringChild(times, childOnsetMs);
    // The leaving summary pane fades 1→0 on the scalar (faithful, moves over many
    // frames — the best-effort fact, not asserted).
    const childOpacities = morphTs.map((mt) => Math.max(0, 1 - mt));
    return {
        vtForcedOff: true,
        flip: {
            W0: widths[0],
            T0: 0,
            C0: 1,
            W1: widths[widths.length - 1],
            times,
            widths,
            morphTs,
            childOpacities,
            enteringChildOpacities,
            enteringChildSampled: true,
        },
        retarget: { widths: [], times: [] },
    };
}

const head = process.argv.includes("--head");

// HEAD: child onsets ~60 ms after the box (the captured deliberate stagger, well
// inside the ~537 ms budget). LAG: child onsets ~700 ms after the box (a per-child
// 200 ms-delayed second clock layered over the morph — PAST the budget).
const childOnsetMs = head ? FRAME + 60 : FRAME + 700;
const result = buildResult({ childOnsetMs });
const { facts, violations } = detectAnimation(result);

const lockstepViolation = violations.find((v) =>
    v.includes("trails the box-width onset"),
);

console.log(
    `proof:dock-lockstep-bornred — ${head ? "HEAD arm (expect GREEN)" : "SYNTHETIC-LAG arm (expect RED)"}`,
);
console.log(`  box onset             : ${facts.widthOnsetMs}ms`);
console.log(`  entering child onset  : ${facts.enteringChildOnsetMs}ms`);
console.log(`  child → box onset Δ   : ${facts.lastChildVsBoxOnsetDeltaMs}ms`);
console.log(`  lockstep budget       : ${facts.lockstepBudgetMs}ms`);
console.log(`  width/scalar onset Δ  : ${facts.onsetDeltaMs}ms (structural sanity — non-binding)`);
if (violations.length) {
    console.log("\n  violations:");
    for (const v of violations) console.log(`    x ${v}`);
}

if (head) {
    // GREEN arm: NO lockstep violation expected.
    if (lockstepViolation) {
        console.error(
            "\n  FAIL: the HEAD arm RED on the lockstep witness — the budget is too tight (would red the deliberate stagger).",
        );
        process.exit(1);
    }
    console.log("\n  PASS: HEAD entering-child onset within budget (GREEN).");
    process.exit(0);
} else {
    // BORN-RED arm: the lockstep violation MUST fire.
    if (!lockstepViolation) {
        console.error(
            "\n  FAIL: the SYNTHETIC-LAG arm did NOT red on the lockstep witness — the gate is still blind to the entering-child lag (the D1 tautology).",
        );
        process.exit(1);
    }
    console.log(
        "\n  BORN-RED CONFIRMED: the re-authored gate REDs on the entering-child lag (HG1).",
    );
    // Exit 0 so the born-RED proof itself is a PASSING witness in CI (it proves the
    // gate WOULD red on the regression; a non-zero exit here would block CI).
    process.exit(0);
}
