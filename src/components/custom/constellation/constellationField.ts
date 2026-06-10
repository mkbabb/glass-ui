// AW.W17 — the constellation field engine: a pure, framework-free proximity
// graph. Nodes drift on constant velocities and bounce off the bounds; any two
// within `link` px are joined by a hairline whose opacity falls off with
// distance, so the lattice continually re-triangulates. Pointer steering leans
// the web toward the cursor; taps drop expanding ripples.
//
// This is the MECHANICAL half of the field engine — the FOUR NEUTRAL passes
// (edges, nodes, pointer-web, ripples). There is NO branded skin pass: a focal
// mark / callout is a consumer-supplied `drawOverlay` that runs AFTER these
// passes. Zero deck-domain content lives here.
//
// The palette reads CSS custom properties off the canvas — the FULL
// `--constellation-*` legibility set (node / node-dim / line + the edge-alpha
// multipliers + the field-yields-to-type `--constellation-alpha` knob) with
// neutral fallbacks, so a consumer override or a dark-mode flip re-tints AND
// re-weights the lattice. The tokens are PLAIN-hsl per arm (AX.W17) — Canvas2D
// silently rejects a `light-dark()` value, so the `:root`/`.dark` cascade
// carries two literals, never a `light-dark()` function (the W30 cardinal leak).

/** Reference width the `k` scale factor is keyed to (CSS px). */
export const BASE_WIDTH = 1280;

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
 * Auto-DRIFT cadence DEFAULTS (AY.W-CON1 source; tokenised in AY.W-CON2). The
 * `--constellation-wander-idle`/`-wander-jitter` tokens override these on mount via
 * `readInteractionConfig` (the SAME numeric `--constellation-*` cohort as the warp
 * spring + the well gains); a prop `{ minIdle, jitter }` still wins over the token.
 * The 8s/8s default rhythm re-targets the focal mark every 8–16s (the slides cadence).
 */
export const DEFAULT_WANDER_IDLE = 8000; // ms — min idle between auto re-targets
export const DEFAULT_WANDER_JITTER = 8000; // ms — random extra idle per cadence

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

export const DEFAULT_PALETTE: ConstellationPalette = {
    node: "#b4afa3",
    nodeDim: "#cdc8bd",
    line: "#1c1714",
    // The fallbacks mirror the §5c light-arm token defaults so an SSR / no-token
    // mount still reads recessive-but-legible (the H.W4 floor fix).
    edgeAlpha: 0.22,
    edgeFocusAlpha: 0.34,
    alpha: 0.8,
};

/**
 * Resolve the FULL neutral palette + legibility weights off a canvas's resolved
 * custom properties (AX.W17). The colors AND the alpha multipliers route through
 * the same `getComputedStyle` probe, so a dark-mode flip re-resolves BOTH the
 * `:root`/`.dark` color arms AND the per-mode alpha defaults in one read.
 */
export function readPalette(canvas: HTMLCanvasElement): ConstellationPalette {
    if (typeof window === "undefined") return { ...DEFAULT_PALETTE };
    const cs = getComputedStyle(canvas);
    const read = (name: string, fallback: string): string =>
        cs.getPropertyValue(name).trim() || fallback;
    const readNum = (name: string, fallback: number): number => {
        const raw = cs.getPropertyValue(name).trim();
        if (!raw) return fallback;
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? n : fallback;
    };
    return {
        node: read("--constellation-node", DEFAULT_PALETTE.node),
        nodeDim: read("--constellation-node-dim", DEFAULT_PALETTE.nodeDim),
        line: read("--constellation-line", DEFAULT_PALETTE.line),
        edgeAlpha: readNum("--constellation-edge-alpha", DEFAULT_PALETTE.edgeAlpha),
        edgeFocusAlpha: readNum(
            "--constellation-edge-focus-alpha",
            DEFAULT_PALETTE.edgeFocusAlpha,
        ),
        alpha: readNum("--constellation-alpha", DEFAULT_PALETTE.alpha),
    };
}

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

/**
 * Warp spring tuning DEFAULTS — gentle critically-damped (no overshoot on a focal
 * mark). The `--constellation-warp-response`/`-zeta` tokens override these on mount
 * via `field.warpCfg` (AY.W-CON2); these stay the byte-identical fallback.
 *
 * `WARP_RESPONSE` is the keyframes.js `(response, dampingFraction)` model's ANGULAR
 * PERIOD (the SwiftUI `.spring(response:)` axis), `ω₀ = 2π/response` — NOT a
 * settle-duration. At ζ=1 the 2%-settle lands at `t₂ ≈ 5.83/ω₀ ≈ 0.93·response`
 * (the `(1 + ω₀t)e^(−ω₀t)` critically-damped envelope); the shipped 0.55 settles
 * at ≈0.51s. This is the AY.W-CON2 ω-reconcile: the engine keeps the keyframes.js
 * `ω₀ = 2π/response` convention (the shared house model — `regen-spring-tokens.mjs`,
 * `keyframes.d.ts:860-882`) and mints NO second ω formula; the SEMANTIC honesty
 * (period, not settle) lives in this doc + the token comment + the settle-time unit
 * assertion, so a consumer setting the token gets the documented behaviour at ANY ζ.
 */
export const WARP_RESPONSE = 0.55; // s — keyframes.js angular period (NOT a settle-duration)
export const WARP_ZETA = 1.0; // critically damped — a focal mark must NOT ring/overshoot
/** dt clamp (s) — guards a tab-throttle / offscreen-park-resume gap from teleporting. */
const WARP_DT_CLAMP = 0.05; // ≈50ms; a clamped dt resolves the park-mid-warp teleport for free.

/**
 * Gravity-well tuning DEFAULTS (AY.W-CON2). The `--constellation-well-*` tokens
 * override these on mount via `field.well.cfg`; these stay the fallback. SET by the
 * §6 egg-live π readback (the field-perturbs-then-cools capture is the binding
 * truth) — a moderate gain over a generous reach, a brisk ramp, a tight no-slingshot
 * speed cap, and the singularity-soften floor.
 */
export const DEFAULT_WELL_CONFIG: ConstellationWellConfig = {
    gain: 14000, // inverse-square force scale — a clear pull over the reach
    reach: 340, // base-width px — the well's influence radius (k-scaled at step)
    ramp: 4.0, // 1/s — the ARM rate (≈0.25s bloom; release is the fixed brisk WELL_RELEASE_RAMP, F8.2)
    maxSpeed: 4.0, // base-width px/frame cap — the no-slingshot clamp
    soften: 8, // px — the singularity floor (a node AT the cursor → bounded pull)
    holdMs: 140, // ms hold before the well arms
};

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

/** Pass 1 — hairline edges between any two nodes within `link` px (alpha falls off with distance). */
export function drawEdges(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
): void {
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The hairline edge alpha = the per-mode `--constellation-edge-alpha`
    // multiplier scaled by the field-yields-to-type `--constellation-alpha`
    // dimmer (AX.W17 — replaces the `0.17` magic literal).
    const edge = palette.edgeAlpha * palette.alpha;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.0 * k;
    for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > reach2) continue;
            const t = 1 - d2 / reach2;
            ctx.globalAlpha = edge * t;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
}

/** Pass 2 — ambient node dots. */
export function drawNodes(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    palette: ConstellationPalette,
): void {
    const { nodes, k } = field;
    for (let m = 0; m < nodes.length; m++) {
        const p = nodes[m];
        ctx.fillStyle = p.dim ? palette.nodeDim : palette.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * k, 0, Math.PI * 2);
        ctx.fill();
    }
}

/** Pass 3 — the cursor joins the web: faint links to nodes within reach + a soft cursor node. */
export function drawPointerWeb(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
    pointer: ConstellationPointer | null,
): void {
    if (!pointer || pointer.x < 0) return;
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The cursor-web links read a touch stronger than the ambient edges (the
    // pointer is the active focus), scaled by the same field-yields-to-type
    // `--constellation-alpha` dimmer (AX.W17 — replaces the `0.24` literal).
    const web = palette.edgeFocusAlpha * palette.alpha;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.0 * k;
    for (const p of nodes) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > reach2) continue;
        ctx.globalAlpha = (1 - d2 / reach2) * web;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = palette.node;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 2.6 * k, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

/** Pass 4 — tap ripples: expanding rings that fade over ~0.9s; consumed entries are spliced. */
export function drawRipples(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    now: number,
    ripples: ConstellationRipple[],
    palette: ConstellationPalette,
): void {
    const { k } = field;
    ctx.strokeStyle = palette.line;
    for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        if (rp.start < 0) rp.start = now;
        const t = (now - rp.start) / 900;
        if (t >= 1) {
            ripples.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = (1 - t) * 0.5;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, (8 + t * 130) * k, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
