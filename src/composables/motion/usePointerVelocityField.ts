// BB.B4 (W-VIZ-POINTER) — usePointerVelocityField: the shared viz-pointer-physics
// composable the procedural-viz family reads for pointer DYNAMICS (position +
// velocity + acceleration), minted EARLY so the born-WebGPU viz chain
// (W-GPU-SUBSTRATE → W-FLOWFIELD → W-CONCENTRIC) consume it at birth.
//
// THE NO-OWN-rAF DISCIPLINE (load-bearing). The viz renderer ALREADY owns the
// frame loop — the canvas lifecycle (`createCanvasLifecycle`, the AU.W6 carve the
// WebGL2/Canvas2D/WebGPU backends all compose) delivers `(now, delta)` per frame.
// This composable owns NO second rAF: it is a PUSH-API physics model the renderer
// FEEDS via `tick(delta)` from inside its existing frame callback (the
// `cursorModel.ts` `advanceCursor(tempo)` precedent generalized — the field eases
// one step per renderer frame, never on a private loop). Forking a second rAF here
// would break the one-loop / proof:offscreen-pause discipline (an offscreen-parked
// renderer would still run this composable's loop). The raw pointer POSITION is the
// only event-driven write (a `pointermove` listener, the createSpecularWriter
// precedent); the velocity + acceleration are DERIVED in `tick`, never measured by
// a private loop.
//
// THE DERIVED CHAIN (position → velocity → acceleration). Each `tick(delta)`:
//   1. eases the smoothed position toward the live pointer target (a snappy lerp),
//   2. derives the per-tick velocity = (new smoothed pos − prev smoothed pos), eased,
//   3. derives the acceleration = (new velocity − prev velocity), eased (the ACCEL
//      TERM the relay names — the second derivative the curl/flow viz read for a
//      pointer "push" impulse distinct from steady drag),
//   4. decays a transient `burst` a fast flick injects (the swirl-impulse term).
// Velocity + acceleration are in normalized-host units (0..1 across the host box) per
// SECOND (the `delta`-normalized derivative, so the field is frame-rate independent —
// a 120Hz and a 60Hz renderer read the same physical velocity).
//
// PRM = tick(0) FREEZE (deterministic). Under `prefers-reduced-motion: reduce` the
// field FREEZES: the pointer-position write is skipped (the createSpecularWriter PRM
// gate) AND `tick` advances with an effective `tempo`/`delta` of 0 — the velocity +
// acceleration + burst snap to zero and stay there (no live velocity). The viz reads
// a still field; the dynamics are off. The PRM signal is a SINGLE cached `matchMedia`
// listener minted once (the AV.W7 useWebGLCanvas substrate pattern), never a fresh
// matchMedia per event.
//
// VUE-ONLY (off the SCC trap). The composable imports `vue` ONLY — no `@vueuse/core`,
// no `@mkbabb/keyframes.js` — so it ships on the engine-free `/motion-core` subpath
// AND the root barrel (the cursorModel precedent is module-local; this one is the
// PUBLISHED generalization). The smoothing is a hand-rolled critically-damped lerp
// (no spring engine), so no keyframes edge is introduced.

import { onScopeDispose, readonly, ref, type Ref } from "vue";

/** A 2-vector in normalized-host space (0..1 across the host box). */
export interface PointerVec2 {
    x: number;
    y: number;
}

export interface UsePointerVelocityFieldOptions {
    /**
     * The smoothing rate for the eased POSITION (0..1 per second-equivalent; higher
     * = snappier approach). Default 0.22 (the cursorModel `CURSOR_POS_LERP` snappy
     * register). The viz reads `position`/`smoothedPosition`; the velocity is its
     * derivative.
     */
    positionLerp?: number;
    /**
     * The smoothing rate for the derived VELOCITY (0..1; higher = velocity tracks the
     * live delta faster, lower = a longer momentum tail). Default 0.3 (the cursorModel
     * `CURSOR_VELOCITY_LERP`).
     */
    velocityLerp?: number;
    /**
     * The smoothing rate for the derived ACCELERATION (0..1). Default 0.3 — the accel
     * term tracks the velocity-delta on the same register as the velocity itself.
     */
    accelerationLerp?: number;
    /**
     * The per-tick burst decay multiplier (the transient swirl-impulse a fast flick
     * injects, decaying over ~1s). Default 0.96 (the cursorModel
     * `CURSOR_BURST_DECAY_PER_FRAME`, ≈0.96^60≈0.09 after 1s at 60fps).
     */
    burstDecay?: number;
    /**
     * Honor `prefers-reduced-motion: reduce` → `tick(0)` freeze (no live velocity).
     * Default true. (A deterministic viz capture that ACCEPTS live dynamics opts out.)
     */
    respectReducedMotion?: boolean;
}

export interface UsePointerVelocityField {
    /** True while the pointer is over the host (down between enter and leave). */
    readonly active: Readonly<Ref<boolean>>;
    /** The RAW live pointer target in normalized-host space (0..1), pre-smoothing. */
    readonly position: Readonly<Ref<PointerVec2>>;
    /** The eased/smoothed pointer position the velocity derives from (0..1). */
    readonly smoothedPosition: Readonly<Ref<PointerVec2>>;
    /** The smoothed pointer VELOCITY (normalized-host units per second). */
    readonly velocity: Readonly<Ref<PointerVec2>>;
    /** The scalar velocity magnitude (`hypot(velocity)`), the common viz read. */
    readonly speed: Readonly<Ref<number>>;
    /** The smoothed pointer ACCELERATION (the second derivative — the accel term). */
    readonly acceleration: Readonly<Ref<PointerVec2>>;
    /** The transient flick-burst impulse (0..1, decays over ~1s). */
    readonly burst: Readonly<Ref<number>>;
    /**
     * The `@pointermove` handler — schedules NO frame; it only stashes the raw target
     * (PRM-gated). The renderer's `tick` does the smoothing/derivation on its OWN
     * frame. Bind on the host (or call `setPointer` directly from a custom listener).
     */
    onPointerMove: (event: PointerEvent) => void;
    /** Bind on the host `@pointerenter` (sets `active`). */
    onPointerEnter: () => void;
    /** Bind on the host `@pointerleave` (clears `active`; the field decays to rest). */
    onPointerLeave: () => void;
    /**
     * Set the raw pointer target directly in normalized-host space (0..1) — for a
     * viz that already owns its pointer→uv mapping (a WebGPU surface reading
     * clip-space coords). PRM-gated like `onPointerMove`.
     */
    setPointer: (xNorm: number, yNorm: number) => void;
    /**
     * Advance the physics ONE renderer frame. The viz calls this from INSIDE its
     * existing frame callback with the frame `delta` (ms). NO own rAF — the renderer
     * owns the loop. Under PRM (or an explicit `tick(0)`) the field freezes to rest
     * (no live velocity). Returns the live field (so a renderer can read inline).
     */
    tick: (deltaMs: number) => void;
    /** Snap the whole field to rest (position held, velocity/accel/burst zeroed). */
    reset: () => void;
    /** Tear down the cached PRM listener (auto-run on scope dispose). */
    dispose: () => void;
}

const PRM_QUERY = "(prefers-reduced-motion: reduce)";

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * The shared viz-pointer-physics field — pointer POSITION + derived VELOCITY +
 * derived ACCELERATION (the accel term), advanced by the renderer's frame `tick`
 * (NO own rAF), frozen under PRM (`tick(0)`). The procedural-viz family reads the
 * field for pointer dynamics; the position is event-driven, the derivatives are
 * computed in `tick`.
 *
 * @example
 * ```ts
 * const field = usePointerVelocityField()
 * // in the renderer's frame callback (the ONE loop the canvas lifecycle owns):
 * function onFrame({ delta }) {
 *   field.tick(delta)                       // advance the physics, no second rAF
 *   uploadUniforms({ vel: field.velocity.value, accel: field.acceleration.value })
 * }
 * ```
 */
export function usePointerVelocityField(
    options: UsePointerVelocityFieldOptions = {},
): UsePointerVelocityField {
    const positionLerp = options.positionLerp ?? 0.22;
    const velocityLerp = options.velocityLerp ?? 0.3;
    const accelerationLerp = options.accelerationLerp ?? 0.3;
    const burstDecay = options.burstDecay ?? 0.96;
    const respectPRM = options.respectReducedMotion !== false;

    // ── The cached PRM ref (AV.W7 substrate pattern) — ONE matchMedia + change
    // listener for the field's lifetime, NOT a fresh matchMedia per pointer event.
    const canMatch =
        typeof window !== "undefined" && typeof window.matchMedia === "function";
    const prmQuery = canMatch ? window.matchMedia(PRM_QUERY) : null;
    let reduced = prmQuery?.matches ?? false;
    const onPrmChange = (e: MediaQueryListEvent): void => {
        reduced = e.matches;
        // A flip TO reduced freezes the field immediately (no lingering velocity).
        if (reduced) reset();
    };
    prmQuery?.addEventListener("change", onPrmChange);

    const active = ref(false);
    const position = ref<PointerVec2>({ x: 0.5, y: 0.5 });
    const smoothedPosition = ref<PointerVec2>({ x: 0.5, y: 0.5 });
    const velocity = ref<PointerVec2>({ x: 0, y: 0 });
    const speed = ref(0);
    const acceleration = ref<PointerVec2>({ x: 0, y: 0 });
    const burst = ref(0);

    function reset(): void {
        velocity.value = { x: 0, y: 0 };
        speed.value = 0;
        acceleration.value = { x: 0, y: 0 };
        burst.value = 0;
        // Hold the smoothed position at the live target (a reset is a freeze, not a
        // re-center) — the dynamics zero, the placement stays.
        smoothedPosition.value = { ...position.value };
    }

    function setPointer(xNorm: number, yNorm: number): void {
        // PRM: skip the live target write (the field stays at rest — the dynamics are
        // off). The position ref keeps its last value so a static viz reads a stable
        // placement, never a jump.
        if (respectPRM && reduced) return;
        position.value = { x: clamp01(xNorm), y: clamp01(yNorm) };
    }

    function onPointerMove(event: PointerEvent): void {
        if (respectPRM && reduced) return;
        const target = event.currentTarget as HTMLElement | null;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        setPointer(
            (event.clientX - rect.left) / rect.width,
            (event.clientY - rect.top) / rect.height,
        );
    }

    function onPointerEnter(): void {
        active.value = true;
    }
    function onPointerLeave(): void {
        active.value = false;
    }

    // Advance the physics ONE renderer frame. The viz owns the rAF; this is the
    // push-step. `deltaMs` of 0 (or PRM) is the deterministic FREEZE — the field
    // snaps to rest. The derivatives are normalized to per-SECOND so the field is
    // frame-rate independent.
    function tick(deltaMs: number): void {
        // PRM or a zero step → freeze. No live velocity (the tick(0) discipline).
        if ((respectPRM && reduced) || !(deltaMs > 0)) {
            reset();
            return;
        }
        const dt = deltaMs / 1000; // seconds
        const prevSmoothed = smoothedPosition.value;
        const prevVelocity = velocity.value;

        // 1. Ease the smoothed position toward the live target. The lerp is the
        //    framerate-independent form `1 - (1 - k)^(dt*60)` so a single `positionLerp`
        //    means the same approach at any frame rate (≈positionLerp at 60fps).
        const posK = 1 - Math.pow(1 - positionLerp, dt * 60);
        const sx = prevSmoothed.x + (position.value.x - prevSmoothed.x) * posK;
        const sy = prevSmoothed.y + (position.value.y - prevSmoothed.y) * posK;

        // 2. Derive the per-second velocity from the smoothed-position delta, eased.
        const rawVx = (sx - prevSmoothed.x) / dt;
        const rawVy = (sy - prevSmoothed.y) / dt;
        const velK = 1 - Math.pow(1 - velocityLerp, dt * 60);
        const vx = prevVelocity.x + (rawVx - prevVelocity.x) * velK;
        const vy = prevVelocity.y + (rawVy - prevVelocity.y) * velK;

        // 3. Derive the per-second acceleration from the velocity delta, eased (the
        //    ACCEL TERM — the second derivative the curl/flow viz read for a pointer
        //    "push" impulse distinct from steady drag).
        const rawAx = (vx - prevVelocity.x) / dt;
        const rawAy = (vy - prevVelocity.y) / dt;
        const accelK = 1 - Math.pow(1 - accelerationLerp, dt * 60);
        const ax = acceleration.value.x + (rawAx - acceleration.value.x) * accelK;
        const ay = acceleration.value.y + (rawAy - acceleration.value.y) * accelK;

        // 4. A fast flick injects a transient burst; it decays each frame (~1s tail).
        const moveSpeed = Math.hypot(vx, vy);
        const decayK = Math.pow(burstDecay, dt * 60);
        const nextBurst = Math.min(1, burst.value * decayK + moveSpeed * dt * 4.0);

        smoothedPosition.value = { x: sx, y: sy };
        velocity.value = { x: vx, y: vy };
        speed.value = moveSpeed;
        acceleration.value = { x: ax, y: ay };
        burst.value = nextBurst;
    }

    function dispose(): void {
        prmQuery?.removeEventListener("change", onPrmChange);
    }

    onScopeDispose(dispose);

    return {
        active: readonly(active) as Readonly<Ref<boolean>>,
        position: readonly(position) as Readonly<Ref<PointerVec2>>,
        smoothedPosition: readonly(smoothedPosition) as Readonly<Ref<PointerVec2>>,
        velocity: readonly(velocity) as Readonly<Ref<PointerVec2>>,
        speed: readonly(speed) as Readonly<Ref<number>>,
        acceleration: readonly(acceleration) as Readonly<Ref<PointerVec2>>,
        burst: readonly(burst) as Readonly<Ref<number>>,
        onPointerMove,
        onPointerEnter,
        onPointerLeave,
        setPointer,
        tick,
        reset,
        dispose,
    };
}
