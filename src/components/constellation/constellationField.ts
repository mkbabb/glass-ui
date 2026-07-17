// The constellation field engine CORE: a pure, framework-free proximity graph.
// Nodes drift on constant velocities and bounce off the bounds; any two within
// `link` px are joined by a hairline whose opacity falls off with distance, so
// the lattice continually re-triangulates. Pointer steering leans the web toward
// the cursor; taps drop expanding ripples.
//
// This module owns the SHARED TYPES + the engine core: `seedField`/`refitField`/
// `stepField` + the CPU edge SET scan (`buildEdges`/`appendPointerWeb`) + the
// parallax-offset helper. The pointer-INTERACTION machinery
// lives in `./constellationInteraction`; the palette read + the visual-size floor live
// in `./constellationRender`. This engine is the one math source the Canvas2D renderer
// consumes. Zero deck-domain content lives here.

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
import { NODE_R_MIN, NODE_R_SPREAD } from "./constants";

// The SHARED field/palette/warp/wander/well/pinned-drift/props TYPE shapes live
// in the co-located `./constellationTypes`. The step functions below
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
 * reproducible field. Every node drifts; a focal node is pinnable — the
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
            r: NODE_R_MIN + rng() * NODE_R_SPREAD,
            dim: rng() < 0.45,
            // Seeded parallax depth. z ∈ [0,1]; the
            // pointer offsets the node's SCREEN position by parallax·z·(pointer−center)
            // so the flat lattice reads as having depth (paint position only).
            z: rng(),
        });
    }
    return nodes;
}

/**
 * Re-fit the existing lattice to a NEW canvas size, proportionally, ON the
 * size-change frame. Without it a field seeded at a transitional
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
 * via `warpStep` inside this single per-frame call — no second rAF,
 * NO `useSpring`. The warp rides the substrate's ONE parked rAF; a `dt` of `0`
 * (omitted / first frame) leaves the spring untouched.
 *
 * `now` (ms; default `0` — every existing caller stays green) + `rng` (default
 * `Math.random`) drive the optional auto-drift cadence: after the
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
    pointerVel: ConstellationPointer | null = null,
): void {
    const { nodes, w, h } = field;
    // The pinned node is held by every step pass — its drift,
    // wall-bounce, pointer-steer, and gravity-well are all skipped so it stays at its
    // seeded anchor (the gentle `pinnedDrift` mode is the ONLY thing that moves it).
    // `pinnedIndex === -1` (the default) skips no node → the plain field.
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
        // Velocity-aware lean. The existing position lean
        // (`pull = (1 − d/infl)·0.08`) reads only position; the shared usePointerVelocity
        // field supplies a per-frame pointer velocity (canvas-local px/frame, fed by
        // useConstellation off the smoothed pointer). A FAST sweep (`velMag` large) drags a
        // stronger directional lean (the nodes follow the cursor's MOMENTUM, biased along
        // the sweep direction), a slow hover is the gentle local gather (velMag ≈ 0 →
        // the position-only lean). The magnitude scale is bounded
        // (≤ VEL_LEAN_CAP) so a flick never slingshots; the |v|→sp renorm preserves the
        // slow geometric drift speed (the cool-down invariant holds). pointerVel null (no
        // shared field) → velBoost 0 → the position-only lean.
        const velMag = pointerVel ? Math.hypot(pointerVel.x, pointerVel.y) : 0;
        const VEL_LEAN_GAIN = 0.05; // per (px/frame) of sweep speed
        const VEL_LEAN_CAP = 0.16; // the bounded extra lean magnitude (anti-slingshot)
        const velBoost = Math.min(velMag * VEL_LEAN_GAIN, VEL_LEAN_CAP);
        // The unit sweep direction (the momentum bias axis); zero when not sweeping.
        const sweepN = velMag > 1e-4 && pointerVel ? velMag : 0;
        const swx = sweepN > 0 && pointerVel ? pointerVel.x / sweepN : 0;
        const swy = sweepN > 0 && pointerVel ? pointerVel.y / sweepN : 0;
        for (let i = 0; i < nodes.length; i++) {
            if (i === pinned) continue;
            const p = nodes[i];
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d > 0.5 && d < infl) {
                const sp = Math.hypot(p.vx, p.vy) || speed;
                const prox = 1 - d / infl;
                // The base position pull (byte-identical at velBoost 0) + the
                // velocity-biased momentum lean along the sweep direction.
                const pull = prox * 0.08;
                const lean = prox * velBoost;
                const nvx = p.vx + ((dx / d) * pull + swx * lean) * sp;
                const nvy = p.vy + ((dy / d) * pull + swy * lean) * sp;
                const nsp = Math.hypot(nvx, nvy) || 1;
                p.vx = (nvx / nsp) * sp;
                p.vy = (nvy / nsp) * sp;
            }
        }
    }
    // The gravity-well force pass — a held-pointer inverse-square pull
    // composed ON the same frame (no new rAF). The well ADDS velocity while held
    // (the field heats — the perturb), with the no-singularity floor + the
    // no-slingshot clamp; an ALWAYS-ON `|v|→speed` ease-back renormalises the field
    // back toward `speed` (the field-cools invariant), so once the well releases
    // (`target → 0`, `strength` eases to 0) the lattice re-settles. Absent
    // (`field.well` undefined) → the entire pass + ease-back are skipped, so the
    // default render is the plain pre-well field.
    stepWell(field, k, speed, dt);

    // The autonomous pinned-anchor drift gently eases the pinned
    // node around its seeded anchor on a jittered cadence (a closed-form easeInOutQuad
    // over `now`; no integrator, no second rAF). DISTINCT from `wander` (which
    // re-targets the warp among random nodes). Absent (`field.pinnedDrift` undefined)
    // OR no pinned node → no-op → the plain field. Runs BEFORE warpStep so a
    // warp chasing the pinned node tracks its drifted position this frame.
    stepPinnedDrift(field, now, rng);

    // Advance the focal-node warp spring on the same frame. The drift
    // happened above, so the LIVE target node has already moved this frame — the
    // spring chases its post-step position (it tracks a moving target, not a
    // frozen snapshot). One rAF, no useSpring.
    warpStep(field, dt);

    // Warp auto-release clears a spring that has settled on its target
    // (the `warpSettled` band), clear `targetIdx` so the focal node releases the
    // spring and rides its node's raw drift (the identity-ride), freeing the spring
    // for the next warp. Gated by the opt-in `warpAutoRelease` flag; default OFF keeps
    // the held-target behaviour (the warp chases its node forever — byte-identical).
    if (field.warpAutoRelease && field.warp.targetIdx >= 0 && warpSettled(field)) {
        field.warp.targetIdx = -1;
    }

    // The auto-drift cadence is the second target source on the same
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

// ── CPU edge-set scan ────────────────────────────────────────────────────────
//
// The distance-threshold ε-proximity graph: every two nodes within `reach = link·k` are
// joined by an edge whose `alpha = 1 − d²/reach²` falls off with distance. This is the
// `drawEdges` math is a PURE, node-testable export the render loop calls once per frame;
// Canvas2D paints these rows and never re-derives the scan.
//
// At count=64 the O(N²)/2 ≈ 2k pairs/frame is trivial. `accentIndex ≥ 0` flags the edges
// incident on the accented node (the flagged-node tether); the writer caps total edges at
// `eMax` (the paint-density budget) by dropping the WEAKEST overflow.

import type { ConstellationEdge } from "./constellationTypes";

/**
 * Scan the proximity graph and return its edge SET (the `1 − d²/reach²` distance-falloff
 * weight per pair within `reach = link·k`). `accentIndex ≥ 0` marks the edges incident on
 * that node (the flagged-node tether). Pure + node-testable; the render loop calls it each
 * frame and hands the result directly to the Canvas2D edge pass.
 *
 * `eMax` caps the result. A denser neighborhood keeps its strongest links.
 */
export function buildEdges(
    field: ConstellationField,
    link: number,
    accentIndex = -1,
    eMax = Infinity,
): ConstellationEdge[] {
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    const edges: ConstellationEdge[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > reach2) continue;
            const alpha = 1 - d2 / reach2;
            const accent =
                accentIndex >= 0 && (i === accentIndex || j === accentIndex) ? 1 : 0;
            edges.push({
                ax: a.x,
                ay: a.y,
                bx: b.x,
                by: b.y,
                alpha,
                accent,
                focus: 0,
            });
        }
    }
    // Budget cap — drop the weakest overflow (the strongest lattice survives).
    if (edges.length > eMax) {
        edges.sort((p, q) => q.alpha - p.alpha);
        edges.length = eMax;
    }
    return edges;
}

/**
 * Append the POINTER-WEB tether edges to an existing edge set (the `drawPointerWeb` math): the cursor is a "virtual node" whose incident edges (to every node within
 * `reach`) carry `focus = 1` (the render strokes them at the focus alpha). No-op when the
 * pointer is inactive (`x < 0`). The `eMax` budget is shared with the ambient set.
 */
export function appendPointerWeb(
    edges: ConstellationEdge[],
    field: ConstellationField,
    link: number,
    pointer: ConstellationPointer | null,
    eMax = Infinity,
): void {
    if (!pointer || pointer.x < 0) return;
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    for (const p of nodes) {
        if (edges.length >= eMax) break;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > reach2) continue;
        edges.push({
            ax: pointer.x,
            ay: pointer.y,
            bx: p.x,
            by: p.y,
            alpha: 1 - d2 / reach2,
            accent: 0,
            focus: 1,
        });
    }
}

/**
 * The parallax-offset SCREEN position for a node (§6). Offsets the node by
 * `parallax · z · (pointer − center)` — a cheap pointer-parallax giving the flat lattice
 * apparent depth (deeper nodes — higher `z` — shift more, the Awwwards "living network"
 * register). When the pointer is inactive the offset is 0 (the flat lattice). Pure; the
 * renderer maps each node's `(x,y)` through this before painting the dot.
 */
export function parallaxNodePos(
    node: ConstellationNode,
    pointer: ConstellationPointer | null,
    w: number,
    h: number,
    parallax: number,
): { x: number; y: number } {
    if (!pointer || pointer.x < 0 || parallax <= 0) return { x: node.x, y: node.y };
    const z = node.z ?? 0.5;
    const cx = w / 2;
    const cy = h / 2;
    // The pointer-relative shift, scaled by depth + the parallax knob (clamped to a hair so
    // the lattice never shears off the card).
    const ox = ((pointer.x - cx) / Math.max(w, 1)) * parallax * z * w;
    const oy = ((pointer.y - cy) / Math.max(h, 1)) * parallax * z * h;
    return { x: node.x + ox, y: node.y + oy };
}
