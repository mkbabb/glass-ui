// gesture-frame-recorder — the gesture FRAME-SERIES recorder instrument
// (BG.W-GESTURE-FRAME-RECORDER, paint-INSTRUMENT — the settled-still C18 gap).
//
// C18 (`?capture=<route>` in demo/main.ts) captures ONE at-rest SETTLED-STILL
// frame: it warms the field, neutralizes the entrance, snaps a single PNG. That
// is the right instrument for a static surface — but a GESTURE is not static. A
// drag / press / fling / V↔H morph MOVES, may OVERSHOOT (the iOS-27 bounce — the
// "liquid-weight universal" edict), then SETTLES to a still. A single settled
// frame can prove the ENDPOINT and nothing else: it cannot tell a live spring
// from a dead snap, an over-damped drag from a taffy-pull, a gesture that rests
// from one that jitters forever. That is the gap this leaf closes.
//
// This is the PURE, device-free-testable analysis + recording-protocol core. It
// does NOT drive a browser (the C18 harness / wkshot own the pointer injection +
// the deterministic `renderAt` frame protocol); it operates on a per-frame
// REDUCED SIGNAL — one scalar per recorded frame (a `--stretch`, an indicator
// centre px, a meanL over a region) — and verifies the three properties a gesture
// frame-series must exhibit:
//   • MOTION-present   — the series actually moves (a dead snap / a still-only
//                        capture reds; the settled-still-only blind spot).
//   • SETTLED-to-still — the tail frames rest within a tolerance of the endpoint
//                        (no residual jitter, no never-arriving overshoot).
//   • OVERSHOOT        — the travel crosses BEYOND the settled endpoint then
//                        returns (the spring bounce — the liquid-weight read).
//
// The PNG-reduce path (`recordFrameSeries`) composes the SINGLE
// `reflect-capture-verify` decoder (`pngRegionStats`) to reduce a captured PNG
// frame to its scalar signal — NO second PNG decoder (the single-decoder
// discipline the whole capture-rigor family holds). Named exports only.

import { pngRegionStats } from "../reflect-capture-verify.mjs";

/**
 * The deterministic frame CLOCK — the recorder half. C18's settle-then-snap has
 * NO frame clock (one frame, wall-clock warm-up); a gesture needs a REPRODUCIBLE
 * multi-frame schedule so two recordings of the same gesture step through the
 * identical timeline (the byte-reproducibility the `renderAt(t)` protocol wants).
 * Returns `count` timestamps `startMs, startMs+stepMs, …` — a pure function of
 * its args, zero wall-clock read.
 *
 * @param {number} count  frame count (≥ 2 — a gesture is multi-frame)
 * @param {number} stepMs per-frame step (the fixed clock tick)
 * @param {number} [startMs=0]
 * @returns {number[]}
 */
export function frameSchedule(count, stepMs, startMs = 0) {
    const n = Math.max(0, Math.floor(count));
    const step = Number.isFinite(stepMs) ? stepMs : 0;
    const t0 = Number.isFinite(startMs) ? startMs : 0;
    return Array.from({ length: n }, (_, i) => t0 + i * step);
}

/** The consecutive absolute inter-frame deltas of a signal (the motion trace). */
export function frameDeltas(signal) {
    const s = Array.isArray(signal) ? signal : [];
    const d = [];
    for (let i = 1; i < s.length; i++) d.push(Math.abs(s[i] - s[i - 1]));
    return d;
}

/** The full travel span of a signal (max − min) — the gross motion amplitude. */
export function travelSpan(signal) {
    const s = (Array.isArray(signal) ? signal : []).filter((v) => Number.isFinite(v));
    if (s.length === 0) return 0;
    return Math.max(...s) - Math.min(...s);
}

/**
 * MOTION-present verdict. A gesture that never moves (a dead snap, or a
 * settled-still-only capture mislabeled a gesture) reds: its peak inter-frame
 * delta AND its travel span both sit below the floors. This is the settled-still
 * blind spot C18 alone cannot see.
 *
 * @param {number[]} signal
 * @param {{motionFloor?:number, travelFloor?:number}} [opts]
 * @returns {{present:boolean, peakDelta:number, travel:number}}
 */
export function motionVerdict(signal, opts = {}) {
    const motionFloor = opts.motionFloor ?? 0.5;
    const travelFloor = opts.travelFloor ?? 1;
    const deltas = frameDeltas(signal);
    const peakDelta = deltas.length ? Math.max(...deltas) : 0;
    const travel = travelSpan(signal);
    return { present: peakDelta >= motionFloor && travel >= travelFloor, peakDelta, travel };
}

/**
 * SETTLED-to-still verdict. The gesture reaches rest iff the last `tailCount`
 * frames all sit within `settleTol` of the endpoint (the final frame). A jittery
 * tail (a never-arriving spring, a wobbling drag) exceeds the tolerance and reds.
 * The endpoint IS the settled-still frame the C18 harness would have captured —
 * so the recorder verifies the frame-series LANDS on that still.
 *
 * @param {number[]} signal
 * @param {{tailCount?:number, settleTol?:number}} [opts]
 * @returns {{settled:boolean, endpoint:number, tailMaxDeviation:number, tailCount:number}}
 */
export function settledVerdict(signal, opts = {}) {
    const s = Array.isArray(signal) ? signal.filter((v) => Number.isFinite(v)) : [];
    const settleTol = opts.settleTol ?? 0.5;
    const tailCount = Math.max(2, Math.min(opts.tailCount ?? 3, s.length));
    if (s.length < 2) {
        return { settled: false, endpoint: s[0] ?? NaN, tailMaxDeviation: Infinity, tailCount };
    }
    const endpoint = s[s.length - 1];
    const tail = s.slice(s.length - tailCount);
    const tailMaxDeviation = Math.max(...tail.map((v) => Math.abs(v - endpoint)));
    return { settled: tailMaxDeviation <= settleTol, endpoint, tailMaxDeviation, tailCount };
}

/**
 * OVERSHOOT verdict — the iOS-27 spring bounce / liquid-weight read. The travel
 * crosses BEYOND the settled endpoint (in the direction of travel) then returns:
 * the extreme of the signal in the travel direction exceeds the endpoint by more
 * than `band`. A monotone no-overshoot arrival (ease-out, PRM-snapped) has its
 * extreme AT the endpoint → `overshoot:false`. Directional off `sign(endpoint −
 * start)` so a collapse (downward travel) reads its trough, an expand its peak.
 *
 * @param {number[]} signal
 * @param {{band?:number}} [opts]
 * @returns {{overshoot:boolean, direction:number, peakBeyond:number, endpoint:number}}
 */
export function overshootVerdict(signal, opts = {}) {
    const s = Array.isArray(signal) ? signal.filter((v) => Number.isFinite(v)) : [];
    const band = opts.band ?? 0.5;
    if (s.length < 2) return { overshoot: false, direction: 0, peakBeyond: 0, endpoint: s[0] ?? NaN };
    const start = s[0];
    const endpoint = s[s.length - 1];
    const direction = Math.sign(endpoint - start);
    // A no-net-travel gesture (start ≈ endpoint) reads its larger absolute excursion.
    const extreme = direction >= 0 ? Math.max(...s) : Math.min(...s);
    const peakBeyond = direction >= 0 ? extreme - endpoint : endpoint - extreme;
    return { overshoot: peakBeyond > band, direction, peakBeyond, endpoint };
}

/**
 * The composite gesture-frame verdict — the three properties rolled into one
 * read plus the derived deltas. `liquid` is the headline: a live, weighty
 * gesture MOVES and SETTLES (overshoot is register-dependent, so it is reported
 * but not required — a calm no-overshoot drag is still liquid).
 *
 * @param {number[]} signal
 * @param {object} [opts] — passed through to the three sub-verdicts.
 * @returns {{liquid:boolean, motion:object, settled:object, overshoot:object, frames:number}}
 */
export function gestureFrameVerdict(signal, opts = {}) {
    const motion = motionVerdict(signal, opts);
    const settled = settledVerdict(signal, opts);
    const overshoot = overshootVerdict(signal, opts);
    return {
        liquid: motion.present && settled.settled,
        motion,
        settled,
        overshoot,
        frames: Array.isArray(signal) ? signal.length : 0,
    };
}

/** The default per-frame reducer — the OKLab mean-L of the region (a legibility/
 *  fill scalar). A caller wanting a different axis (chroma, alpha) passes its own. */
export const meanLReducer = (stats) => (stats ? stats.meanL : NaN);

/**
 * The PNG-reduce RECORDER — decode a frame-series of captured PNGs over a region
 * and reduce each to its scalar signal, composing the SINGLE
 * `reflect-capture-verify` decoder (NO second PNG decoder). Returns the signal
 * plus the raw stats (for a caller wanting more than the reduced axis). A frame
 * that fails to decode reduces to `NaN` (the down-stream verdicts treat it as a
 * dropped frame, never a silent zero — no masking fallback).
 *
 * @param {string[]} pngPaths   ordered absolute frame paths
 * @param {{x:number,y:number,w:number,h:number}} region  fractional region
 * @param {(stats:object|null)=>number} [reduce=meanLReducer]
 * @returns {{signal:number[], frames:(object|null)[]}}
 */
export function recordFrameSeries(pngPaths, region, reduce = meanLReducer) {
    const paths = Array.isArray(pngPaths) ? pngPaths : [];
    const frames = paths.map((p) => pngRegionStats(p, region));
    const signal = frames.map((f) => reduce(f));
    return { signal, frames };
}
