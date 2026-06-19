// The constellation INTERACTION machinery — the pointer-driven well + warp +
// wander clusters carved out of the field engine. ONE pointer-interaction
// concern: the held-pointer gravity-well force, the focal-node warp spring, and
// the auto-drift cadence that re-targets the warp on a jittered clock. The engine
// core (`constellationField.ts`) imports these as DIRECT function calls inside its
// per-frame `stepField`; this module imports only the field TYPES from the core
// (`import type` — no runtime cycle). NO logic edits: the function bodies are the
// byte-for-byte lift of the prior in-engine cluster.

import type {
    ConstellationField,
    ConstellationPinnedDrift,
    ConstellationWarpConfig,
    ConstellationWellConfig,
} from "./constellationField";
import {
    DEFAULT_WANDER_IDLE,
    DEFAULT_WANDER_JITTER,
    DEFAULT_WELL_CONFIG,
    WARP_RESPONSE,
    WARP_ZETA,
    DEFAULT_PINNED_DRIFT_FRAC,
    DEFAULT_PINNED_DRIFT_DUR,
    DEFAULT_PINNED_DRIFT_IDLE,
    DEFAULT_PINNED_DRIFT_JITTER,
} from "./constants";

// The CONFIG-DEFAULT constants (the warp spring + gravity-well + wander cadence
// defaults the `--constellation-*` tokens override) live in the feature-dir constants
// home; re-exported here for the package barrel path. The algorithm-LOCAL physics
// tuning below (the well cool/ramp rates, the dt-clamp, the settle band) stays
// INTERNAL — it travels with the algorithm, not the package config surface.
export { DEFAULT_WANDER_IDLE, DEFAULT_WANDER_JITTER, DEFAULT_WELL_CONFIG, WARP_RESPONSE, WARP_ZETA };
export {
    DEFAULT_PINNED_DRIFT_FRAC,
    DEFAULT_PINNED_DRIFT_DUR,
    DEFAULT_PINNED_DRIFT_IDLE,
    DEFAULT_PINNED_DRIFT_JITTER,
};

/**
 * Read the NUMERIC interaction-tuning tokens (the warp spring + the gravity-well
 * gains) off a canvas's resolved custom properties — ONCE on mount (AY.W-CON2),
 * via `parseFloat`, NOT per-frame `getComputedStyle` (the hot loop stays clean).
 * Returns `{ warp, well }` configs the field carries; every member falls back to
 * the shipped default when the token is absent (an SSR / no-token mount reads the
 * byte-identical spring). The tokens are PLAIN numbers (`0.55`, `12000`), immune
 * to the W30 `light-dark()`-into-Canvas2D leak (they never reach a `fillStyle`).
 */
export function readInteractionConfig(canvas: HTMLCanvasElement): {
    warp: ConstellationWarpConfig;
    well: ConstellationWellConfig;
    wander: { minIdle: number; jitter: number };
} {
    const warp: ConstellationWarpConfig = { response: WARP_RESPONSE, zeta: WARP_ZETA };
    const well: ConstellationWellConfig = { ...DEFAULT_WELL_CONFIG };
    const wander = { minIdle: DEFAULT_WANDER_IDLE, jitter: DEFAULT_WANDER_JITTER };
    if (typeof window === "undefined") return { warp, well, wander };
    const cs = getComputedStyle(canvas);
    const readNum = (name: string, fallback: number): number => {
        const raw = cs.getPropertyValue(name).trim();
        if (!raw) return fallback;
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? n : fallback;
    };
    warp.response = readNum("--constellation-warp-response", WARP_RESPONSE);
    warp.zeta = readNum("--constellation-warp-zeta", WARP_ZETA);
    well.gain = readNum("--constellation-well-gain", DEFAULT_WELL_CONFIG.gain);
    well.reach = readNum("--constellation-well-reach", DEFAULT_WELL_CONFIG.reach);
    well.ramp = readNum("--constellation-well-ramp", DEFAULT_WELL_CONFIG.ramp);
    well.maxSpeed = readNum("--constellation-well-max-speed", DEFAULT_WELL_CONFIG.maxSpeed);
    well.holdMs = readNum("--constellation-well-hold-ms", DEFAULT_WELL_CONFIG.holdMs);
    wander.minIdle = readNum("--constellation-wander-idle", DEFAULT_WANDER_IDLE);
    wander.jitter = readNum("--constellation-wander-jitter", DEFAULT_WANDER_JITTER);
    return { warp, well, wander };
}

// ── Gravity-well force (AY.W-CON2) ───────────────────────────────────────────
/** Below this strength the well force is sub-perceptual — skip the O(count) pass. */
const WELL_EPS = 1e-3;
/**
 * The `|v|→speed` ease-back rate (per second), ASYMMETRIC by well phase (the
 * shape-(ii) cool-down). While the well is HELD it is GENTLE
 * ({@link WELL_COOL_HELD}/s) so the inverse-square force out-paces it and the field
 * HEATS to a bounded equilibrium (the perturb the π gate reads); once RELEASED it is
 * BRISK ({@link WELL_COOL_RELEASED}/s) so the lattice re-settles to within a few % of
 * `speed` inside the ≥30-frame window (the field-cools invariant). The asymmetry is
 * what lets BOTH invariants hold at once — a single mid rate either masks the perturb
 * (too brisk) or never cools (too gentle). Preferred over the steer's hard
 * `|v|=speed` renorm because the well MUST be able to heat the field while held.
 *
 * GENTLED 1.5→0.6 (BC.W-VIZ-CONSTELLATION): the GPU-substrate migration runs the frame
 * loop at the real device refresh (~130fps), halving the per-frame `dt` vs the unit
 * dt=1/60. The held force injects LESS velocity per frame at that cadence, so a held-cool
 * fast enough to keep the field calm at 60fps over-cancelled the heat at 130fps — the
 * held-peak mean |v| collapsed to ~9% over rest (below the egg-live π gate's ≥20% floor).
 * A gentler held-cool lets the (now faster-ramping, stronger-gain) force build the
 * perturb the gate reads, while the BRISKER WELL_COOL_RELEASED (below) owns the
 * cool-down so the field still re-settles to within the ±5% COOL_TOL on release.
 *
 * WELL_COOL_RELEASED LIFTED 7.0→11.0 (BC.W-VIZ-CONSTELLATION): the same GPU-substrate
 * high-refresh cadence that starved the perturb also slowed the cool in WALL-CLOCK
 * frames — at the headless gate's throttled rAF the released ease-back rendered fewer
 * effective cool iterations within the 60-frame desktop window, so the larger perturb
 * (the stronger gain) read HOT (~7% off rest > ±5%) at the sample. A brisker released
 * ease renorms the lattice inside the window REGARDLESS of frame cadence (HELD perturb
 * untouched — this rate fires ONLY after release, `target ≤ 0`). The WELL_RELEASE_RAMP
 * strength-decay derivation (below) is unchanged: it still clears the force inside ~15
 * frames, leaving the brisker ease the rest of the window to renorm.
 */
const WELL_COOL_HELD = 0.6;
const WELL_COOL_RELEASED = 11.0;
/**
 * The strength-ramp rate (per second) is ASYMMETRIC by phase, MIRRORING the cool
 * asymmetry. The ARM rate is `cfg.ramp` (the token — a gentle ≈0.25s ease so the
 * pull blooms in, not snaps). The RELEASE rate is a brisk {@link WELL_RELEASE_RAMP}
 * floor (independent of `cfg.ramp`) so on release the pull DROPS below
 * {@link WELL_EPS} within a handful of frames — the inverse-square force STOPS
 * injecting velocity, and the brisk {@link WELL_COOL_RELEASED} `|v|→speed` ease
 * then renorms the lattice to within a few % of `speed` inside the ≥30-frame
 * window (the field-cools invariant). A symmetric `cfg.ramp` release decays the
 * pull too slowly — the force keeps heating the field past the 30-frame sample,
 * so the field reads HOT at any canvas where the held equilibrium |v| sits above
 * the tolerance (the live-vs-unit `k`-scale divergence the π gate caught).
 *
 * THE 22.0 DERIVATION (F8.2 F1.3 — so the next tuner does not treat it as free):
 * `strength` decays as `(1 − min(rate/60, 1))^n` per frame at 60 fps. At
 * `rate = 22/s` the per-frame factor is `(1 − 22/60) ≈ 0.633`, so `strength`
 * falls below {@link WELL_EPS} (1e-3) in `n ≈ ln(1e-3)/ln(0.633) ≈ 15` frames —
 * about HALF the ≥30-frame cool sample. That leaves the remaining ~15+ frames for
 * the {@link WELL_COOL_RELEASED} `|v|→speed` ease to renorm the lattice inside the
 * window. A slower rate (e.g. the 4/s ARM token → ~110 frames to clear EPS) keeps
 * the force injecting velocity well past the sample → the field reads HOT. This is
 * why the release ramp is a FIXED const (F8.2), NOT the consumer `cfg.ramp` token:
 * it guards the cool invariant, so a consumer must NOT be able to slow it past the
 * §6-clause-2 cool gate.
 */
const WELL_RELEASE_RAMP = 22.0;

/**
 * Advance the gravity-well one `dt` (AY.W-CON2). A transient held-pointer force
 * composed inside `stepField` (NO new rAF): ease `well.strength` toward
 * `well.target` (1 held / 0 released) at `cfg.ramp`/s; while active, add an
 * inverse-square pull toward the held point onto each node within `cfg.reach`
 * (the `max(d, soften)` no-singularity floor + the `cfg.maxSpeed` no-slingshot
 * clamp); ALWAYS ease every node's |v| back toward `speed` (the field-cools
 * invariant — so a released well re-settles). No-ops (entirely skipped) when
 * `field.well` is undefined → the default render is byte-identical to HEAD.
 *
 * `dt` is clamped to {@link WARP_DT_CLAMP} (the same park-resume guard the warp
 * uses) so a tab-throttle gap cannot slingshot the field in one giant step.
 */
export function stepWell(
    field: ConstellationField,
    k: number,
    speed: number,
    dt: number,
): void {
    const well = field.well;
    if (!well || !(dt > 0)) return;
    const h = Math.min(dt, WARP_DT_CLAMP);
    const cfg = well.cfg;
    // Ease the pull strength toward its target (1 held, 0 released) — a bounded
    // approach so a long frame cannot overshoot the [0,1] ramp. The ARM rate is
    // the `cfg.ramp` token (gentle bloom); the RELEASE rate is the brisk
    // WELL_RELEASE_RAMP floor so the pull drops below WELL_EPS in a handful of
    // frames and the force STOPS injecting velocity (the cool-down precondition).
    const rampRate = well.target > 0 ? cfg.ramp : WELL_RELEASE_RAMP;
    const ramp = Math.min(rampRate * h, 1);
    well.strength += (well.target - well.strength) * ramp;
    if (well.strength < WELL_EPS) well.strength = well.target <= 0 ? 0 : well.strength;

    const { nodes } = field;
    const reach = cfg.reach * k;
    const reach2 = reach * reach;
    const cap = cfg.maxSpeed * k;
    // The cool-back fraction this frame (the |v|→speed ease toward `speed`),
    // ASYMMETRIC: gentle while held (`target > 0` → the field heats), brisk once
    // released (`target ≤ 0` → the field cools fast). See the WELL_COOL_* doc.
    const coolRate = well.target > 0 ? WELL_COOL_HELD : WELL_COOL_RELEASED;
    const cool = Math.min(coolRate * h, 1);
    const active = well.strength > WELL_EPS && well.x >= 0;
    // The PINNED node (AZ.W-CON-GEN G1) is exempt from the well pull AND the |v|→speed
    // ease-back — it holds its anchor (the gentle `pinnedDrift` is the only mover).
    const pinned = field.pinnedIndex;
    for (let i = 0; i < nodes.length; i++) {
        if (i === pinned) continue;
        const p = nodes[i];
        if (active) {
            const dx = well.x - p.x;
            const dy = well.y - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 <= reach2) {
                const d = Math.max(Math.sqrt(d2), cfg.soften); // singularity floor
                const a = (cfg.gain * well.strength) / (d * d); // inverse-square pull
                let nvx = p.vx + (dx / d) * a * h;
                let nvy = p.vy + (dy / d) * a * h;
                const nsp = Math.hypot(nvx, nvy);
                if (nsp > cap) {
                    nvx = (nvx / nsp) * cap; // no-slingshot clamp
                    nvy = (nvy / nsp) * cap;
                }
                p.vx = nvx;
                p.vy = nvy;
            }
        }
        // |v|→speed ease-back (the field-cools invariant). Pulls each node's speed
        // a `cool` fraction toward `speed` every frame — while the well is held the
        // force out-paces it (the field heats), once released it wins (the field
        // cools back to `speed`). A node at rest (|v|≈0) is nudged up to `speed`.
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 1e-9) {
            const eased = sp + (speed - sp) * cool;
            const scale = eased / sp;
            p.vx *= scale;
            p.vy *= scale;
        }
    }
}

// ── Focal node + warp spring (AX.W17) ────────────────────────────────────────
// The design thesis: drift and warp are THE SAME mechanic — "spring the focal
// node toward a target NODE" — differing only in what PICKS the target (a click
// for warp, a periodic auto-pick for drift). ONE focal-node position spring + a
// pluggable target-source (`field.warp.targetIdx`). NO `useSpring` (it spawns a
// second rAF bound to a reactive ref, which would DEFEAT the parked-substrate
// offscreen/tab-hidden/PRM freeze the whole `useCanvas2D` substrate provides) —
// instead a dt-stepped 2nd-order critically-damped integrator advanced inside
// the substrate's ONE rAF. The keyframes.js `(response, dampingFraction)` PARAM
// model is reused (ω₀ = 2π/response, ζ = dampingFraction) but NOT its rAF.

// The warp-spring DEFAULTS (`WARP_RESPONSE`/`WARP_ZETA`) live in `./constants`.
//
// `WARP_RESPONSE` is the keyframes.js `(response, dampingFraction)` model's ANGULAR
// PERIOD (the SwiftUI `.spring(response:)` axis), `ω₀ = 2π/response` — NOT a
// settle-duration. At ζ=1 the 2%-settle lands at `t₂ ≈ 5.83/ω₀ ≈ 0.93·response`
// (the `(1 + ω₀t)e^(−ω₀t)` critically-damped envelope); the shipped 0.55 settles
// at ≈0.51s. This is the AY.W-CON2 ω-reconcile: the engine keeps the keyframes.js
// `ω₀ = 2π/response` convention (the shared house model — `regen-spring-tokens.mjs`,
// `keyframes.d.ts:860-882`) and mints NO second ω formula; the SEMANTIC honesty
// (period, not settle) lives in this doc + the token comment + the settle-time unit
// assertion, so a consumer setting the token gets the documented behaviour at ANY ζ.

/** dt clamp (s) — guards a tab-throttle / offscreen-park-resume gap from teleporting. */
const WARP_DT_CLAMP = 0.05; // ≈50ms; a clamped dt resolves the park-mid-warp teleport for free.

/**
 * The nearest DRIFTING node to `(px, py)` in canvas-local px — a linear O(count)
 * min-d² scan (count 64 default — negligible; matches the O(count²) edge pass).
 * "Lattice point" = the nearest drifting NODE (the constellation has NO fixed
 * lattice). `excludeIdx` drops a node from the candidate set (the focal node
 * excludes ITSELF, so a cursor-on-focal warp no-ops). Returns `-1` if no
 * eligible node exists (empty field, or only the excluded node).
 */
export function nearestNode(
    field: ConstellationField,
    px: number,
    py: number,
    excludeIdx = -1,
): number {
    const { nodes } = field;
    let best = -1;
    let bestD2 = Infinity;
    for (let i = 0; i < nodes.length; i++) {
        if (i === excludeIdx) continue;
        const n = nodes[i];
        const dx = n.x - px;
        const dy = n.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
            bestD2 = d2;
            best = i;
        }
    }
    return best;
}

/**
 * Advance the focal-node warp spring one `dt` (seconds). A per-axis 2nd-order
 * critically-damped integrator over `field.warp.{x,y}` toward the LIVE position
 * of `field.nodes[field.warp.targetIdx]` — re-read EACH frame, so the spring
 * CHASES a drifting target and arrives ON it (the identity-ride). No-ops when no
 * warp is active (`targetIdx < 0`). `dt` is clamped to {@link WARP_DT_CLAMP} so a
 * tab-throttle / offscreen-park-resume gap cannot teleport the mark.
 *
 *   x += v·dt ;  v += (−2ζω·v − ω²·(x − target))·dt
 *
 * Reads `(response, ζ)` from `field.warpCfg` (the tokenised override — AY.W-CON2),
 * falling back to the shipped `WARP_RESPONSE`/`WARP_ZETA` defaults. `ω = 2π/response`
 * is the keyframes.js `(response, dampingFraction)` convention (the SHARED house
 * model — `ω₀` is the angular frequency, `response` its ANGULAR PERIOD, NOT a
 * settle-duration; at ζ=1 the 2%-settle is `t₂ ≈ 5.83/ω₀ ≈ 0.93·response`). NO
 * second ω formula is minted (the ω-reconcile). NOT its rAF — the FORBID-useSpring
 * contract (a second rAF would defeat the parked-substrate one-path freeze).
 */
export function warpStep(field: ConstellationField, dt: number): void {
    const { warp, nodes } = field;
    // No active warp (no spring, or no target) → no-op. The `warp` guard keeps a
    // hand-built field literal that omits the spring from crashing.
    if (!warp || warp.targetIdx < 0 || warp.targetIdx >= nodes.length) return;
    if (!(dt > 0)) return;
    const h = Math.min(dt, WARP_DT_CLAMP);
    // ω/ζ from the tokenised config (AY.W-CON2), else the shipped defaults —
    // `ω = 2π/response` (the keyframes.js angular-period convention, unchanged).
    const response = field.warpCfg?.response ?? WARP_RESPONSE;
    const zeta = field.warpCfg?.zeta ?? WARP_ZETA;
    const omega = (2 * Math.PI) / response;
    const target = nodes[warp.targetIdx];
    // Per-axis critically-damped step (semi-implicit Euler — velocity first,
    // then position, for stability at the clamped dt).
    const ax = -2 * zeta * omega * warp.vx - omega * omega * (warp.x - target.x);
    const ay = -2 * zeta * omega * warp.vy - omega * omega * (warp.y - target.y);
    warp.vx += ax * h;
    warp.vy += ay * h;
    warp.x += warp.vx * h;
    warp.y += warp.vy * h;
}

/**
 * Point the warp at a node INDEX (the live target-source seam). The focal node
 * re-points to `idx`; the spring chases `nodes[idx]`'s LIVE position FROM the
 * focal mark's CURRENT position (`warp.{x,y}`) — a continuous spring-eased path,
 * never a snap. The component seeds `warp.{x,y}` at field-center on first layout,
 * so even the first warp springs from a real start point. `idx < 0` clears the
 * warp (the focal mark is removed). Re-pointing does NOT zero the velocity, so a
 * mid-flight re-target curves smoothly toward the new node.
 */
export function setWarpTarget(field: ConstellationField, idx: number): void {
    const { warp, nodes } = field;
    if (idx < 0 || idx >= nodes.length) {
        warp.targetIdx = -1;
        field.focalIndex = -1;
        return;
    }
    field.focalIndex = idx;
    warp.targetIdx = idx;
}

/**
 * Warp the focal node to the nearest drifting node to a canvas-LOCAL px point
 * (the `warpTo(point)` primitive). The DEGENERATE case — the click's UNCONSTRAINED
 * nearest node is already the current focal (cursor on/closest to the focal mark)
 * — NO-OPS (returns the current focal; a click on yourself does not re-warp). Any
 * OTHER click re-points to the nearest node, with the focal EXCLUDED from the
 * candidate set (you never re-warp to yourself; the next-nearest wins). Returns
 * the chosen node index, or `-1` when no eligible node exists. The component's
 * `warpTo(clientX, clientY)` sugar maps client→local px via `toLocal` first.
 */
export function warpTo(field: ConstellationField, px: number, py: number): number {
    // Degenerate no-op: the click is closest to the focal node itself → no warp.
    const raw = nearestNode(field, px, py, -1);
    if (raw >= 0 && raw === field.focalIndex) return field.focalIndex;
    const idx = nearestNode(field, px, py, field.focalIndex);
    if (idx < 0) return -1;
    setWarpTarget(field, idx);
    return idx;
}

// ── Auto-drift target-source (AY.W-CON1) ─────────────────────────────────────
/**
 * The settle BAND (px) — the warp counts as "arrived" once its gap to the live
 * target node falls within this distance. This is DELIBERATELY generous (not the
 * sub-px the warp-spec's `CONVERGE_PX = 6` at-rest tolerance): a critically-damped
 * spring chasing a CONTINUOUSLY-DRIFTING node holds a small steady-state tracking
 * lag (≈2ζ/ω · v_target, a few px) FOREVER — it never reaches true zero gap. So a
 * "wait for |gap| < 1px AND |v| < 1" gate would stall the cadence permanently on a
 * drifting field. The band cleanly separates the two regimes: a SETTLED-tracking
 * warp holds ≤ a handful of px; a fresh CLICK-warp starts HUNDREDS of px away and
 * is plainly in-flight. The cadence advances only once the tracking lag is inside
 * the band (so a click pre-empts; a drifting-but-arrived warp re-targets).
 */
const WARP_SETTLE_BAND = 24;

/**
 * Is the warp spring ARRIVED on its target (AY.W-CON1)? True when there is no
 * active target (`targetIdx < 0`) OR the focal's gap to its LIVE target node is
 * within {@link WARP_SETTLE_BAND}. A click-warp in flight (hundreds of px out)
 * reports NOT arrived, so a user click always PRE-EMPTS the auto-drift cadence
 * (the wander only re-targets a spring that has reached its current node). The
 * gate is POSITION-only by design — a critically-damped spring tracking a drifting
 * node carries a non-zero steady-state velocity forever, so a velocity term would
 * never clear on a live field.
 */
export function warpSettled(field: ConstellationField): boolean {
    const { warp, nodes } = field;
    if (!warp || warp.targetIdx < 0 || warp.targetIdx >= nodes.length) return true;
    const target = nodes[warp.targetIdx];
    return Math.hypot(warp.x - target.x, warp.y - target.y) < WARP_SETTLE_BAND;
}

/**
 * Pick a random eligible node index for the auto-drift re-target (AY.W-CON1) —
 * any node EXCEPT the current `focalIndex` (so the focal actually MOVES). `rng`
 * is the seeded `() => number` in `[0, 1)`. A degenerate field (≤1 node, or only
 * the current focal) returns the current focal, which `setWarpTarget` no-ops
 * cleanly (no crash, no jump).
 */
export function pickWanderTarget(
    field: ConstellationField,
    rng: () => number,
): number {
    const n = field.nodes.length;
    if (n <= 1) return field.focalIndex;
    const focal = field.focalIndex;
    // Pick from the n nodes; if we land on the focal, shift to the next index so
    // the focal always moves (an O(1) bias-free pick over the n-1 eligible set).
    if (focal < 0 || focal >= n) return Math.floor(rng() * n) % n;
    const r = Math.floor(rng() * (n - 1)); // [0, n-2]
    return r < focal ? r : r + 1; // skip the focal slot → an eligible node ≠ focal
}

// ── Autonomous pinned-anchor drift (AZ.W-CON-GEN G5) ─────────────────────────
/**
 * Build the cold `ConstellationPinnedDrift` state (AZ.W-CON-GEN G5) the field carries
 * when `pinnedDrift` is on. The anchor is seeded LATER (on the first sized frame, off
 * the pinned node's layout position) — here it is `(0,0)` until `stepPinnedDrift`
 * stamps it on the first armed leg. The token-read re-points the un-overridden
 * cadence members on mount (the same prop-over-token layering as the well/wander).
 */
export function makePinnedDrift(
    override: {
        wanderFrac?: number;
        durMs?: number;
        minIdle?: number;
        jitter?: number;
    } = {},
): ConstellationPinnedDrift {
    return {
        anchorX: 0,
        anchorY: 0,
        nextAt: -1,
        legStart: -1,
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: 0,
        wanderFrac: override.wanderFrac ?? DEFAULT_PINNED_DRIFT_FRAC,
        durMs: override.durMs ?? DEFAULT_PINNED_DRIFT_DUR,
        minIdle: override.minIdle ?? DEFAULT_PINNED_DRIFT_IDLE,
        jitter: override.jitter ?? DEFAULT_PINNED_DRIFT_JITTER,
    };
}

/** easeInOutQuad — the gentle, symmetric ease the pinned-anchor leg rides. */
function easeInOutQuad(p: number): number {
    return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

// ── BC.W-VIZ-CONSTELLATION — the acceleration→burst (the §6 ACCEL term) ──────────
/** The flick-burst threshold (the shared usePointerVelocityField `burst` 0..1) above which
 *  a fast flick fires the focal warp + a transient ripple (a slow drag never fires). */
export const BURST_FIRE_THRESHOLD = 0.45;

/**
 * Fire a focal BURST off a flick (the §E "reads velocity AND acceleration" mandate). A high
 * `burst` (from the shared `usePointerVelocityField`, the eased flick impulse) warps the
 * focal node toward the cursor (the warp spring snaps it) AND drops an expanding ripple at
 * the focal — the lattice "snaps the focal toward the cursor and drops an expanding ring"
 * (the WGSL ripple instance / the accent-ring overlay). A slow drag (`burst` below the
 * threshold) never fires (a steady hover is the gentle gather, not a snap). Returns true
 * when a burst fired. Composes the EXISTING `warpTo` + the ripple list — no new mechanic,
 * no second rAF (the warp rides the substrate's ONE clock); PRM is enforced by the CALLER
 * (the shared field's `tick(0)` zeroes `burst` under reduce, so this never fires).
 */
export function fireBurst(
    field: ConstellationField,
    pointer: { x: number; y: number },
    burst: number,
    ripples: { x: number; y: number; start: number }[],
): boolean {
    if (!(burst >= BURST_FIRE_THRESHOLD)) return false;
    // Warp the focal node toward the cursor (the snap). warpTo no-ops cleanly on a
    // degenerate field; it re-points the live warp spring (the ONE focal spring).
    warpTo(field, pointer.x, pointer.y);
    // Drop a ripple at the focal's spring-eased position (the expanding ring). `start: -1`
    // is stamped on the first render frame (the ripple list discipline).
    ripples.push({ x: field.warp.x, y: field.warp.y, start: -1 });
    return true;
}

/**
 * Advance the autonomous PINNED-ANCHOR drift one frame (AZ.W-CON-GEN G5). DISTINCT
 * from `wander` (warp re-target): this gently eases the PINNED node around its seeded
 * ANCHOR within `wanderFrac` of the canvas, on a jittered cadence, via a closed-form
 * easeInOutQuad over `now` (no integrator, no second rAF — it rides `stepField`'s ONE
 * per-frame call). No-ops (skipped) when there is no `field.pinnedDrift`, no pinned
 * node, or `now <= 0` (the default unit callers stay green) — so an absent
 * `pinnedDrift` is byte-identical to HEAD.
 *
 * The anchor is captured ON the first armed frame off the pinned node's CURRENT
 * position (its seeded rest), so a consumer that re-anchors the pin (a resize re-fit)
 * gets a fresh anchor on the next leg. Each leg eases from the node's current point to
 * a fresh point within `wanderFrac` of the anchor over `durMs`; between legs the node
 * rests at the leg's end, the next leg arming after `minIdle + rng()*jitter`.
 */
export function stepPinnedDrift(
    field: ConstellationField,
    now: number,
    rng: () => number,
): void {
    const pd = field.pinnedDrift;
    if (!pd || field.pinnedIndex < 0 || field.pinnedIndex >= field.nodes.length) return;
    if (!(now > 0)) return;
    const an = field.nodes[field.pinnedIndex];

    // ARM the cadence on the first stepped frame — capture the anchor off the pinned
    // node's current (seeded) position and schedule the first leg. No immediate jump.
    if (pd.nextAt < 0) {
        pd.anchorX = an.x;
        pd.anchorY = an.y;
        pd.nextAt = now + pd.minIdle + rng() * pd.jitter;
        return;
    }

    // RESTING between legs — start a new leg when the rest elapses. The target is a
    // fresh point within ±wanderFrac of the anchor, clamped to the canvas with a small
    // inset so the pin never drifts off-screen.
    if (pd.legStart < 0) {
        if (now < pd.nextAt) return;
        pd.fromX = an.x;
        pd.fromY = an.y;
        const f = pd.wanderFrac;
        const tx = pd.anchorX + (rng() * 2 - 1) * f * field.w;
        const ty = pd.anchorY + (rng() * 2 - 1) * f * field.h;
        pd.toX = Math.max(0.04 * field.w, Math.min(0.96 * field.w, tx));
        pd.toY = Math.max(0.04 * field.h, Math.min(0.96 * field.h, ty));
        pd.legStart = now;
    }

    // EASING a leg — interpolate the pinned node from→to over durMs (easeInOutQuad).
    const p = Math.min((now - pd.legStart) / pd.durMs, 1);
    const e = easeInOutQuad(p);
    an.x = pd.fromX + (pd.toX - pd.fromX) * e;
    an.y = pd.fromY + (pd.toY - pd.fromY) * e;
    if (p >= 1) {
        pd.legStart = -1;
        pd.nextAt = now + pd.minIdle + rng() * pd.jitter;
    }
}
