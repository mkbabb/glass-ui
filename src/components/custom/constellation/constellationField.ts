// The constellation field engine CORE: a pure, framework-free proximity graph.
// Nodes drift on constant velocities and bounce off the bounds; any two within
// `link` px are joined by a hairline whose opacity falls off with distance, so
// the lattice continually re-triangulates. Pointer steering leans the web toward
// the cursor; taps drop expanding ripples.
//
// This module owns the SHARED TYPES + the engine core: `seedField`/`refitField`/
// `stepField`. The pointer-INTERACTION machinery (the gravity-well force, the
// focal-node warp spring, the auto-drift cadence + their tuning configs) lives in
// `./constellationInteraction`; the FOUR NEUTRAL draw passes + the palette read
// live in `./constellationDraw`. `stepField` imports the interaction steppers as
// DIRECT calls; both sibling modules import only the TYPES from here (`import
// type` — no runtime cycle). There is NO branded skin pass: a focal mark / callout
// is a consumer-supplied `drawOverlay` that runs AFTER the neutral passes. Zero
// deck-domain content lives here.

import {
    stepWell,
    warpStep,
    warpSettled,
    setWarpTarget,
    pickWanderTarget,
} from "./constellationInteraction";

// The reference width the `k` scale factor is keyed to (CSS px) lives in the
// feature-dir constants home; re-exported here for the package barrel path.
export { BASE_WIDTH } from "./constants";

export interface ConstellationNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    dim: boolean;
}

export interface ConstellationRipple {
    x: number;
    y: number;
    /** `performance.now()` at first draw; -1 until stamped. */
    start: number;
}

/** The pointer position in canvas-local CSS px (`-1` = inactive). */
export interface ConstellationPointer {
    x: number;
    y: number;
}

/**
 * The neutral palette + legibility weights resolved off the canvas custom
 * properties (the FULL `--constellation-*` set — AX.W17). `node`/`nodeDim`/
 * `line` are the colors; `edgeAlpha`/`edgeFocusAlpha`/`alpha` are the per-mode
 * legibility multipliers (replacing the `0.17`/`0.24` magic literals).
 */
export interface ConstellationPalette {
    node: string;
    nodeDim: string;
    line: string;
    /** The hairline-edge alpha multiplier (was the `0.17` literal). */
    edgeAlpha: number;
    /** The focus-proximity edge multiplier (consumer skins may read it). */
    edgeFocusAlpha: number;
    /** The field-yields-to-type translucency knob (the global field dimmer). */
    alpha: number;
}

/**
 * The per-axis critically-damped warp spring on the focal node (AX.W17). The
 * focal mark's position is `(x, y)`; `vx`/`vy` its velocity; `targetIdx` the
 * LIVE node index it chases (re-read each frame so it tracks a DRIFTING target,
 * not a frozen click-time snapshot). `-1` = no active warp (the focal mark
 * rides its node's drift directly — the identity-ride at settle).
 */
export interface ConstellationWarp {
    x: number;
    y: number;
    vx: number;
    vy: number;
    /** The chased node's INDEX (live target), or -1 when inactive. */
    targetIdx: number;
}

/**
 * The auto-DRIFT target-source (AY.W-CON1 — the 2nd half of the AX.W17 "drift +
 * warp are ONE mechanic" thesis). The warp re-points its focal node to a
 * periodically-chosen RANDOM node on a jittered cadence: the SAME warp spring,
 * a different target-PICKER (a click for warp, this cadence for drift). No new
 * rAF, no second mechanic — `stepField` steps this cadence inline, re-pointing
 * `setWarpTarget` to a picked node only when the spring has SETTLED (so a
 * click-warp in flight always pre-empts the cadence). PRM is enforced by the
 * CALLER (the component does not advance the cadence under reduced-motion — the
 * `stepField` call lives inside the `!reducedMotion` block — so the focal mark
 * stays at its seed: the WARP precedent, NOT fire-but-freeze).
 */
export interface ConstellationWander {
    /** ms timestamp of the next auto re-target; -1 until armed on the first stepped frame. */
    nextAt: number;
    /** the minimum idle (ms) between auto re-targets. */
    minIdle: number;
    /** the random extra idle (ms) added per cadence (so the rhythm is not metronomic). */
    jitter: number;
}

/**
 * The warp-spring tuning the integrator reads (AY.W-CON2). Tokenised numeric (the
 * `--constellation-warp-*` cohort) so a consumer retunes the warp WITHOUT editing
 * src — read ONCE on mount via `parseFloat`, threaded onto the field.
 *
 * `response` is the keyframes.js `(response, dampingFraction)` model's ANGULAR
 * PERIOD (the SwiftUI `.spring(response:)` axis): `ω₀ = 2π/response`. It is NOT a
 * settle-duration — at ζ=1 the 2%-settle lands at `t₂ ≈ 5.83/ω₀ ≈ 0.93·response`
 * (the `(1 + ω₀t)e^(−ω₀t)` critically-damped envelope). Documented here + in the
 * `--constellation-warp-response` token comment so the token semantics are honest
 * at ANY ζ (the AY.W-CON2 ω-reconcile; the engine keeps the keyframes.js convention,
 * mints NO second ω formula).
 */
export interface ConstellationWarpConfig {
    /** keyframes.js angular period (s) — `ω₀ = 2π/response`, NOT a settle-duration. */
    response: number;
    /** damping ratio ζ — 1 critically damped (a focal mark must NOT ring). */
    zeta: number;
}

/**
 * The gravity-well tuning (AY.W-CON2). The held-pointer pull is an inverse-square
 * force composed into `stepField` (no new rAF). Tokenised numeric (the
 * `--constellation-well-*` cohort) so a consumer retunes the well WITHOUT editing
 * src. All distances are base-width px (`k`-scaled at step time).
 */
export interface ConstellationWellConfig {
    /** the inverse-square pull gain (the force scale at unit distance). */
    gain: number;
    /** the reach (base-width px) — nodes beyond it are untouched (the O(within-reach) cost floor). */
    reach: number;
    /**
     * the ARM ramp rate (1/s) — `strength` eases toward `target = 1` at this rate
     * while HELD (the gentle bloom the token tunes). The RELEASE is NOT this rate:
     * it is the fixed brisk {@link WELL_RELEASE_RAMP} (the field-cools invariant —
     * not consumer-tunable, F8.2). A consumer slowing this token slows the ARM
     * bloom only; the release stays brisk so the cool gate holds.
     */
    ramp: number;
    /** the per-node speed cap (base-width px/frame) — the no-slingshot clamp. */
    maxSpeed: number;
    /** the singularity floor (px) — a node AT the cursor gets a bounded pull, never `∞`. */
    soften: number;
    /** ms the pointer is held before the well arms. */
    holdMs: number;
}

/**
 * The gravity-well live STATE (AY.W-CON2). `(x, y)` is the held pointer in
 * canvas-local px (`-1` = inactive); `strength` is the eased pull 0→1 (ramps to
 * `target` at `cfg.ramp`/s); `target` is the strength the ramp eases toward (1
 * while held, 0 on release). A transient force — the field renormalises back to
 * `speed` after release (the field-cools invariant).
 */
export interface ConstellationWell {
    /** canvas-local px of the held pointer; `-1` = inactive. */
    x: number;
    y: number;
    /** the eased pull strength 0→1 (ramps to `target` at `cfg.ramp`/s). */
    strength: number;
    /** the strength the ramp is easing toward: 1 while held, 0 on release. */
    target: number;
    /** the well tuning (gain/reach/ramp/maxSpeed/soften). */
    cfg: ConstellationWellConfig;
}

/**
 * The field state the component exposes to its `drawOverlay` consumer so a
 * skin can pin itself to a real field node. `k` is the `width / BASE_WIDTH`
 * scale, `dpr` the device-pixel ratio applied by the substrate.
 *
 * The focal node (AX.W17) is a FIRST-CLASS library concept: `focalIndex` names
 * which node is focal (consumer-owned via `warpTo`), and the engine OWNS its
 * position via the `warp` spring stepped inside `stepField`. A `drawOverlay`
 * paints the focal mark at `field.warp.{x,y}` (the spring-eased position) —
 * node-position mutation `drawOverlay` structurally cannot express, resolved by
 * ONE first-class concept (warp + drift unify; no second parallel hook).
 */
export interface ConstellationField {
    nodes: ConstellationNode[];
    /** The host canvas — for `getComputedStyle` token reads in an overlay. */
    canvas: HTMLCanvasElement | null;
    w: number;
    h: number;
    k: number;
    dpr: number;
    /**
     * The designated focal node's INDEX, or `-1` when none is pinned. Re-points
     * on each `warpTo`; node count is conserved (it is a designation, not a new
     * node). A `drawOverlay` reads `field.warp.{x,y}` for the spring-eased mark.
     */
    focalIndex: number;
    /** The per-axis warp spring the engine steps inside `stepField` (AX.W17). */
    warp: ConstellationWarp;
    /**
     * The warp-spring tuning `warpStep` reads (AY.W-CON2). Optional — absent
     * falls back to the shipped `{ response: 0.55, zeta: 1.0 }` defaults (the
     * byte-identical HEAD spring). A tokenised override (read on mount) reaches
     * the integrator through this member.
     */
    warpCfg?: ConstellationWarpConfig;
    /**
     * The optional auto-DRIFT cadence (AY.W-CON1). When set, `stepField`
     * periodically re-points the warp to a random node (the wander source on the
     * SAME spring). Absent (`undefined`) leaves the field BYTE-IDENTICAL to the
     * pre-wander HEAD — `stepField` skips the cadence block entirely.
     */
    wander?: ConstellationWander;
    /**
     * The optional gravity-well (AY.W-CON2). When set, `stepField` composes a
     * held-pointer inverse-square pull force (no new rAF) — `well.target → 1`
     * while held, `→ 0` on release, the field renormalising back to `speed` once
     * the well cools. Absent (`undefined`) leaves the field BYTE-IDENTICAL to the
     * pre-well HEAD — `stepField` skips the force pass entirely.
     */
    well?: ConstellationWell;
}

/**
 * The `<Constellation>` consumer prop surface (the public type a consumer types
 * a wrapper against). The `drawOverlay` seam is the branded-skin injection — it
 * runs AFTER the neutral passes with the live field.
 */
export interface ConstellationProps {
    /** Node count. Default 64. */
    count?: number;
    /** Link distance in px (the falloff reach). Default 132. */
    link?: number;
    /** Drift speed. Default 0.16. */
    speed?: number;
    /**
     * AY.W-COHERE E3 — the per-instance outer-envelope RECESSION knob (the aurora
     * `opacityCeiling` / fourier `intensity` sibling — ONE recession vocabulary
     * across the four live substrates). Scales the painted edge/node/web/ripple
     * alpha OVER the mode-tuned `--constellation-alpha` base so the lattice can
     * RECEDE behind content (0.4–0.6 in a hero). Default `1` is byte-identical to
     * HEAD.
     */
    opacityCeiling?: number;
    /** Seed for a reproducible field (number or hashed string); omit for `Math.random`. */
    seed?: number | string;
    /** Steer-toward-cursor + tap ripples. Default true; auto-off under reduced-motion. */
    pointerReactive?: boolean;
    /**
     * Click-to-warp (AX.W17): a click warps the focal node to the nearest
     * drifting node + springs it there. INDEPENDENT of `pointerReactive` (warp
     * works on a non-ripple lattice). Default false; auto-off under
     * reduced-motion (the focal mark stays put — the stated PRM policy).
     */
    warpOnClick?: boolean;
    /**
     * Auto-DRIFT (AY.W-CON1): a periodic auto-pick re-points the focal node to a
     * random node on a jittered cadence — the wander source on the SAME warp
     * spring (no second mechanic). `true` uses the default cadence (8–16s, the
     * slides rhythm); `{ minIdle, jitter }` tunes it. Default OFF (absent →
     * byte-identical to HEAD). PRM-gated by the WARP precedent (the cadence never
     * advances under reduced-motion — the focal stays at its seed).
     */
    wander?: boolean | { minIdle?: number; jitter?: number };
    /**
     * Pointer-held GRAVITY-WELL (AY.W-CON2): hold the pointer and the lattice is
     * pulled toward it (an inverse-square force on the same engine, no new rAF);
     * release and the field cools back to `speed`. INDEPENDENT of `warpOnClick`
     * and `pointerReactive` (a consumer can hold-to-pull on a non-ripple,
     * non-warp lattice). `true` uses the tokenised defaults; an object tunes the
     * gains. Default OFF (absent → byte-identical to HEAD). PRM-gated by the WARP
     * precedent (the held-timer is not registered under reduced-motion).
     */
    gravityWell?:
        | boolean
        | {
              holdMs?: number;
              gain?: number;
              reach?: number;
              ramp?: number;
              maxSpeed?: number;
              soften?: number;
          };
    /**
     * Deterministic-capture freeze (AY.W-CON3): when `true`, lays out ONE
     * reproducible STATIC frame (no `stepField`, no ripple / warp / wander / well
     * advance) and hands `drawOverlay` a FROZEN `now` so a phase-driven skin
     * resolves to a fixed value. Omit to AUTO-DERIVE from `location.search`
     * matching `export | print | freeze` (the deploy-pipeline contract); an
     * explicit `false` forces live even under a capture URL. Set `seed` for a
     * field stable ACROSS runs. Unifies with the reduced-motion one-static-frame
     * path (`freeze || reducedMotion` is the single static-frame predicate).
     */
    freeze?: boolean;
    class?: string;
    /** The skin seam — paints the consumer's focal mark on the live field. */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}

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
    for (let i = 0; i < nodes.length; i++) {
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

    // Advance the focal-node warp spring on the SAME frame (AX.W17). The drift
    // happened above, so the LIVE target node has already moved this frame — the
    // spring chases its post-step position (it tracks a moving target, not a
    // frozen snapshot). One rAF, no useSpring.
    warpStep(field, dt);

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
