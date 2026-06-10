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
    ConstellationWarpConfig,
    ConstellationWellConfig,
} from "./constellationField";
import {
    DEFAULT_WANDER_IDLE,
    DEFAULT_WANDER_JITTER,
    DEFAULT_WELL_CONFIG,
    WARP_RESPONSE,
    WARP_ZETA,
} from "./constants";

// The CONFIG-DEFAULT constants (the warp spring + gravity-well + wander cadence
// defaults the `--constellation-*` tokens override) live in the feature-dir constants
// home; re-exported here for the package barrel path. The algorithm-LOCAL physics
// tuning below (the well cool/ramp rates, the dt-clamp, the settle band) stays
// INTERNAL — it travels with the algorithm, not the package config surface.
export { DEFAULT_WANDER_IDLE, DEFAULT_WANDER_JITTER, DEFAULT_WELL_CONFIG, WARP_RESPONSE, WARP_ZETA };

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
 */
const WELL_COOL_HELD = 1.5;
const WELL_COOL_RELEASED = 7.0;
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
    for (let i = 0; i < nodes.length; i++) {
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
