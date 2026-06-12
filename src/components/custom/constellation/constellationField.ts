// The constellation field engine CORE: a pure, framework-free proximity graph.
// Nodes drift on constant velocities and bounce off the bounds; any two within
// `link` px are joined by a hairline whose opacity falls off with distance, so
// the lattice continually re-triangulates. Pointer steering leans the web toward
// the cursor; taps drop expanding ripples.
//
// This module owns the SHARED TYPES + the engine core: `seedField`/`refitField`/
// `stepField`. The pointer-INTERACTION machinery lives in
// `./constellationInteraction`; the FOUR NEUTRAL draw passes + the palette read
// live in `./constellationDraw` (both import only TYPES from here — no runtime
// cycle). There is NO branded skin pass: a focal mark / callout is a
// consumer-supplied `drawOverlay` after the neutral passes; zero deck-domain
// content lives here.

import {
    stepWell,
    warpStep,
    warpSettled,
    setWarpTarget,
    pickWanderTarget,
    stepPinnedDrift,
} from "./constellationInteraction";

// The reference width the `k` scale factor is keyed to (CSS px) lives in the
// feature-dir constants home; re-exported here for the package barrel path.
export { BASE_WIDTH } from "./constants";

// The SHARED field/palette/warp/wander/well/pinned-drift/props TYPE shapes live
// in the co-located `./constellationTypes` (BA.W-CARVE2 — the ~308 lines of
// interface declarations split off the step engine). The step functions below
// read the field/node/pointer shapes from there; the whole `Constellation*`
// type set is RE-EXPORTED here so the sibling draw/interaction/constants
// modules + the composables keep importing types `from "./constellationField"`
// unchanged — the carve moves the declarations without touching the import seam
// (no public-surface change).
export type * from "./constellationTypes";
import type {
    ConstellationNode,
    ConstellationField,
    ConstellationPointer,
} from "./constellationTypes";

/**
 * Seed `count` drifting nodes inside `w × h`. `rng` is a `() => number` in
 * `[0, 1)` (the glass-ui `mulberry32`/`Math.random`); a seeded `rng` lays out a
 * reproducible field. Every node drifts; a focal node IS pinnable (AX.W17) — the
 * `field.focalIndex` designation + the engine-owned `warp` spring chase a node,
 * but the underlying node still drifts (warp re-points an EXISTING node, never
 * adds one, so node count is conserved).
 */
export function seedField(
    rng: () => number,
    count: number,
    w: number,
    h: number,
    speed: number,
): ConstellationNode[] {
    const nodes: ConstellationNode[] = [];
    for (let i = 0; i < count; i++) {
        const a = rng() * Math.PI * 2;
        nodes.push({
            x: rng() * w,
            y: rng() * h,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            r: 1.6 + rng() * 1.6,
            dim: rng() < 0.45,
        });
    }
    return nodes;
}

/**
 * Re-fit the existing lattice to a NEW canvas size, proportionally, ON the
 * size-change frame (AY.W-CON1). Without it a field seeded at a transitional
 * size (the canvas measures mid responsive-scale — the deck slide-enter case)
 * keeps its small-canvas positions and DRIFTS out to fill the larger box at
 * `speed` px/frame — the visible "takes a while to expand out" lag the slides
 * bespoke copy fixed. Scales node + warp positions by the per-axis dimension
 * ratio; velocities are UNTOUCHED (they are base-width direction vectors
 * `k`-scaled at step time — scaling them would HEAT the field, breaking the
 * cool-down invariant). No-op on first layout (`prev ≤ 0`; the seed path owns
 * it) or unchanged dims.
 */
export function refitField(
    field: ConstellationField,
    prevW: number,
    prevH: number,
): void {
    if (!(prevW > 0) || !(prevH > 0)) return;
    if (prevW === field.w && prevH === field.h) return;
    const sx = field.w / prevW;
    const sy = field.h / prevH;
    for (const p of field.nodes) {
        p.x *= sx;
        p.y *= sy;
    }
    field.warp.x *= sx;
    field.warp.y *= sy;
}

/**
 * Advance the field one step: drift + wall-bounce every node, then (if the
 * pointer is live) lean nodes within reach toward the cursor WITHOUT changing
 * their speed (the slow geometric drift is preserved). `k` is the scale factor.
 *
 * `dt` (seconds since the previous frame) advances the focal-node warp spring
 * via `warpStep` INSIDE this single per-frame call (AX.W17) — NO second rAF,
 * NO `useSpring`. The warp rides the substrate's ONE parked rAF; a `dt` of `0`
 * (omitted / first frame) leaves the spring untouched.
 *
 * `now` (ms; default `0` — every existing caller stays green) + `rng` (default
 * `Math.random`) drive the optional auto-DRIFT cadence (AY.W-CON1): AFTER the
 * warp step, if `field.wander` is set and `now > 0`, the cadence re-points
 * `setWarpTarget` to a random node when it elapses AND the spring has settled
 * (a click-warp in flight pre-empts the cadence — `warpSettled` reports false).
 */
export function stepField(
    field: ConstellationField,
    k: number,
    speed: number,
    pointer: ConstellationPointer | null,
    dt = 0,
    now = 0,
    rng: () => number = Math.random,
): void {
    const { nodes, w, h } = field;
    // The PINNED node (AZ.W-CON-GEN G1) is held by every step pass — its drift,
    // wall-bounce, pointer-steer, and gravity-well are all skipped so it stays at its
    // seeded anchor (the gentle `pinnedDrift` mode is the ONLY thing that moves it).
    // `pinnedIndex === -1` (the default) skips no node → byte-identical to HEAD.
    const pinned = field.pinnedIndex;
    for (let i = 0; i < nodes.length; i++) {
        if (i === pinned) continue;
        const p = nodes[i];
        p.x += p.vx * k;
        p.y += p.vy * k;
        if (p.x < 0) {
            p.x = 0;
            p.vx *= -1;
        } else if (p.x > w) {
            p.x = w;
            p.vx *= -1;
        }
        if (p.y < 0) {
            p.y = 0;
            p.vy *= -1;
        } else if (p.y > h) {
            p.y = h;
            p.vy *= -1;
        }
    }
    if (pointer && pointer.x >= 0) {
        const infl = 180 * k;
        for (let i = 0; i < nodes.length; i++) {
            if (i === pinned) continue;
            const p = nodes[i];
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d > 0.5 && d < infl) {
                const sp = Math.hypot(p.vx, p.vy) || speed;
                const pull = (1 - d / infl) * 0.08;
                const nvx = p.vx + (dx / d) * pull * sp;
                const nvy = p.vy + (dy / d) * pull * sp;
                const nsp = Math.hypot(nvx, nvy) || 1;
                p.vx = (nvx / nsp) * sp;
                p.vy = (nvy / nsp) * sp;
            }
        }
    }
    // The gravity-well force pass (AY.W-CON2) — a held-pointer inverse-square pull
    // composed ON the same frame (no new rAF). The well ADDS velocity while held
    // (the field heats — the perturb), with the no-singularity floor + the
    // no-slingshot clamp; an ALWAYS-ON `|v|→speed` ease-back renormalises the field
    // back toward `speed` (the field-cools invariant), so once the well releases
    // (`target → 0`, `strength` eases to 0) the lattice re-settles. Absent
    // (`field.well` undefined) → the entire pass + ease-back are skipped, so the
    // default render is BYTE-IDENTICAL to the pre-well HEAD.
    stepWell(field, k, speed, dt);

    // The autonomous PINNED-ANCHOR drift (AZ.W-CON-GEN G5) — gently ease the pinned
    // node around its seeded anchor on a jittered cadence (a closed-form easeInOutQuad
    // over `now`; no integrator, no second rAF). DISTINCT from `wander` (which
    // re-targets the warp among random nodes). Absent (`field.pinnedDrift` undefined)
    // OR no pinned node → no-op → byte-identical to HEAD. Runs BEFORE warpStep so a
    // warp chasing the pinned node tracks its drifted position this frame.
    stepPinnedDrift(field, now, rng);

    // Advance the focal-node warp spring on the SAME frame (AX.W17). The drift
    // happened above, so the LIVE target node has already moved this frame — the
    // spring chases its post-step position (it tracks a moving target, not a
    // frozen snapshot). One rAF, no useSpring.
    warpStep(field, dt);

    // Warp AUTO-RELEASE (AZ.W-CON-GEN G6) — once the spring has SETTLED on its target
    // (the `warpSettled` band), clear `targetIdx` so the focal node releases the
    // spring and rides its node's raw drift (the identity-ride), freeing the spring
    // for the next warp. Gated by the opt-in `warpAutoRelease` flag; default OFF keeps
    // the held-target behaviour (the warp chases its node forever — byte-identical).
    if (field.warpAutoRelease && field.warp.targetIdx >= 0 && warpSettled(field)) {
        field.warp.targetIdx = -1;
    }

    // The auto-DRIFT cadence (AY.W-CON1) — the 2nd target-source on the SAME
    // spring, stepped AFTER warpStep so a click-warp already in flight (NOT
    // settled) pre-empts the periodic re-target. `now > 0` gates the cadence
    // (the default `now = 0` callers — the unit warp suite — skip it). The
    // first stepped frame ARMS `nextAt` (no immediate jump); each subsequent
    // elapsed-and-settled frame re-points to a fresh random node.
    if (field.wander && now > 0) {
        const wd = field.wander;
        if (wd.nextAt < 0) {
            wd.nextAt = now + wd.minIdle + rng() * wd.jitter; // armed, no immediate jump
        } else if (now >= wd.nextAt && warpSettled(field)) {
            setWarpTarget(field, pickWanderTarget(field, rng));
            wd.nextAt = now + wd.minIdle + rng() * wd.jitter;
        }
    }
}
