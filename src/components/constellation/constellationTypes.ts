// The constellation SHARED TYPES — the proximity-graph field state, palette,
// warp/wander/well/pinned-drift state shapes, and the `<Constellation>` consumer
// prop surface.
//
// Carved from constellationField.ts (BA.W-CARVE2) — the ~308 lines of type
// interfaces split off the step engine (`seedField`/`refitField`/`stepField`
// stay in constellationField.ts). The draw/interaction siblings + the engine
// core import these TYPES (no runtime cycle — a pure type module). The package
// barrel (`index.ts`) re-exports the `Constellation*` types from here; the
// public surface is unchanged.

export interface ConstellationNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    dim: boolean;
    /**
     * BC.W-VIZ-CONSTELLATION — the seeded parallax DEPTH (`z ∈ [0,1]`, §6). The pointer
     * offsets the node's SCREEN position by `parallax · z · (pointer − center)` so the flat
     * lattice reads as having depth (the Awwwards "living network" register). Seeded in
     * `seedField`; perturbs the GPU node-position write only (never a layout property). A
     * field literal that omits it is treated as `z = 0.5` (the mid-plane, no parallax bias).
     */
    z?: number;
}

/**
 * BC.W-VIZ-CONSTELLATION — ONE edge of the proximity graph, the row the CPU all-pairs scan
 * (`buildEdges`) writes each frame into the instanced-lines storage buffer. `a`/`b` are the
 * two endpoint positions in canvas-local CSS px; `alpha` is the distance-falloff weight
 * (`1 − d²/reach²`, the `drawEdges` math) the segment-quad fragment multiplies; `accent`
 * (0/1) flags the accented-node tether (the flagged-node edge tint); `focus` (0/1) flags
 * the pointer-web tether (the cursor's incident edges). The WGSL/GLSL render transcribes
 * the SHAPE, never re-derives the scan (the ONE math source stays JS).
 */
export interface ConstellationEdge {
    ax: number;
    ay: number;
    bx: number;
    by: number;
    /** The distance-falloff weight `1 − d²/reach²` (the drawEdges math). */
    alpha: number;
    /** 1 when the edge is incident on the accented node (the tether tint), else 0. */
    accent: number;
    /** 1 when the edge is a pointer-web tether (the cursor's incident edge), else 0. */
    focus: number;
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
    /**
     * The ACCENT-edge skin tint (AZ.W-CON-GEN G3) — the flagged-node EDGE color the
     * optional `drawEdges(…, accentIndex)` pass strokes for edges incident on the
     * accented node. Reads `--constellation-accent` (the consumer-preset boundary —
     * the library ships a neutral default; a consumer aliases it to its brand hue).
     */
    accent: string;
    /**
     * The neutral-edge alpha FLOOR (AZ.W-CON-GEN G3) — added to a distance-faded
     * neutral hairline's alpha so it clears the perceptual/sampling floor across its
     * full length on a bright ground (the "web doesn't read in light mode" fix).
     * Default `0` is byte-identical (no floor). Reads `--constellation-edge-floor`.
     */
    edgeFloor: number;
    /**
     * The ACCENT-incident edge alpha multiplier (AZ.W-CON-GEN G3) — the per-mode
     * weight for an edge touching the accented node. Reads
     * `--constellation-edge-accent-alpha`; the accented edges read a touch louder
     * than the neutral lattice (the flagged-node tether).
     */
    edgeAccentAlpha: number;
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
 * The autonomous PINNED-ANCHOR drift state (AZ.W-CON-GEN G5) — the gentle wander of
 * the PINNED node (`field.pinnedIndex`) around its seeded ANCHOR. DISTINCT from
 * `wander` (which re-targets the WARP spring among random nodes): this eases ONE
 * designated node a small fraction around its rest position on a jittered cadence,
 * so a flagged point breathes its neighborhood without leaving the dead-space it was
 * anchored in. Stepped inside `stepField` (no second rAF) via a closed-form
 * easeInOutQuad over `now` — no integrator. Absent (`undefined`) → `stepField` skips
 * the block (byte-identical to HEAD).
 */
export interface ConstellationPinnedDrift {
    /** The anchor (the pinned node's rest position) the drift eases around (px). */
    anchorX: number;
    anchorY: number;
    /** ms timestamp of the next leg; -1 until armed on the first stepped frame. */
    nextAt: number;
    /** ms timestamp the current leg started; -1 between legs (resting at the anchor). */
    legStart: number;
    /** the current leg's from/to (px) — the eased segment endpoints. */
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    /** the ± fraction of the canvas the drift wanders around the anchor. */
    wanderFrac: number;
    /** the per-leg easeInOutQuad duration (ms). */
    durMs: number;
    /** the minimum rest (ms) between legs. */
    minIdle: number;
    /** the random extra rest (ms) per leg (so the rhythm is not metronomic). */
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
    /** R5-8 — SIZES draw at `kVisOf(field)`; TRUE `k` keeps positions/reach. */
    kFloor?: number;
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
    /**
     * The PINNED node designation (AZ.W-CON-GEN G1) — the index of a node `stepField`
     * does NOT drift/bounce/steer/pull, so it HOLDS its seeded position (the flagged
     * flagged node the consumer pins). `-1` (the default) = no pin → every node drifts
     * (byte-identical to HEAD). A designation, NOT a new node — node count is
     * conserved. The optional `pinnedDrift` gently wanders it around its anchor; the
     * optional `drawEdges(…, accentIndex)` tints its incident edges.
     */
    pinnedIndex: number;
    /**
     * The optional autonomous PINNED-ANCHOR drift (AZ.W-CON-GEN G5). When set AND a
     * node is pinned, `stepField` gently eases the pinned node around its anchor on a
     * jittered cadence (a closed-form easeInOutQuad — no second rAF). Absent
     * (`undefined`) → the pinned node holds dead-still at its anchor (byte-identical).
     */
    pinnedDrift?: ConstellationPinnedDrift;
    /**
     * Warp AUTO-RELEASE (AZ.W-CON-GEN G6). When `true`, `stepField` clears the warp's
     * `targetIdx` (→ -1) once the spring has SETTLED on its target — the focal node
     * releases the spring and rides its node's RAW drift (the identity-ride), freeing
     * the spring for the next warp. Default `false`/undefined keeps the held-target
     * behaviour (the warp chases its node forever — byte-identical to HEAD).
     */
    warpAutoRelease?: boolean;
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
     * BC.W-VIZ-CONSTELLATION (§6) — the pointer-PARALLAX depth. Each node carries a seeded
     * depth `z ∈ [0,1]`; the pointer offsets node screen positions by `parallax · z ·
     * (pointer − center)` so the flat lattice reads as having depth (the Awwwards "living
     * network" register). Additive default-on at a SUB-PERCEPTUAL 0.08 (a hair of depth, not
     * a behavior break); 0 = the flat lattice. GPU-only (perturbs the node-position write,
     * never a layout property). Frozen under reduced-motion / `freeze`.
     */
    parallax?: number;
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
     * PINNED node designation (AZ.W-CON-GEN G1): a node held by every step pass (it
     * does not drift / bounce / steer / feel the well). `false`/absent → no pin;
     * `true` → node 0; a number → that index. The flagged-node pin the consumer holds.
     */
    pinned?: boolean | number;
    /**
     * ACCENT-edge skin (AZ.W-CON-GEN G2): edges incident on the pinned (else focal)
     * node stroke the `--constellation-accent` tint — the flagged-node tether. Default
     * OFF (the neutral single-color pass).
     */
    accentEdges?: boolean;
    /**
     * Autonomous PINNED-ANCHOR drift (AZ.W-CON-GEN G5): the pinned node gently wanders
     * its seeded anchor on a jittered cadence (DISTINCT from `wander`, which re-targets
     * the warp). Default OFF (the pin holds dead-still). PRM-gated.
     */
    pinnedDrift?:
        | boolean
        | { wanderFrac?: number; durMs?: number; minIdle?: number; jitter?: number };
    /**
     * Warp AUTO-RELEASE (AZ.W-CON-GEN G6): a settled warp clears its target so the
     * focal rides its node's raw drift (the identity-ride). Default OFF (the warp holds
     * its target forever). Read the settled signal via the `warpSettled()` expose.
     */
    warpAutoRelease?: boolean;
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
    /**
     * The interactive-BACKGROUND feed (BI.W-CONSTELLATION-DEDUPE). A full-bleed
     * `pointer-events:none` background constellation cannot listen for its own
     * pointer, so it reads the route chassis's ONE window pointer broadcaster
     * (`useRoutePointer`, provided by the route chassis) and feeds a SUBTLE pointer
     * WELL — the attractor/engagement over the shared field, projected by
     * `constellationWellMapping` and applied by the KEPT per-node well integrator
     * (`constellationWell.ts`, byte-frozen — the pointer feeds it, it does not
     * replace it). The background influence is subtle (~2–6%, longer half-life);
     * the canvas STAYS `pointer-events:none` (the broadcaster is the source). Default
     * OFF — a foreground demo owns its own host listeners; only a background sets this.
     */
    backgroundInteractive?: boolean;
    class?: string;
    /** The skin seam — paints the consumer's focal mark on the live field. */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}
