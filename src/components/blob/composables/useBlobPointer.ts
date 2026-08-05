import { ref, watch, onUnmounted, readonly, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { PULSE_OMEGA, PULSE_ZETA, REST_EPS, TRAIL_N } from "../constants";

/** A single trail sample — a decaying-radius metaball source the shader smin-merges. */
export interface TrailSample {
    x: number;
    y: number;
    radius: number;
}

/**
 * The blob pointer/interaction machine tracks the pointer over a host
 * element (normalised to [-1, 1] about the element centre) and resolves it with a
 * FRAME-RATE-INDEPENDENT critically-damped spring fed the renderer's per-frame
 * `dtMs`, rather than a frame-rate-dependent fixed-α lerp. The spring is
 * `@mkbabb/keyframes.js` `SpringProgress` driven through
 * its `tickDt(dtMs)` seam by the SUBSTRATE's single rAF — it does NOT call
 * `SpringProgress.play()` (that would start a parallel rAF, the
 * single-substrate-loop contract forbids).
 *
 * Exposes the smoothed `pointer` position AND its `velocity` (the spring's own
 * per-frame velocity, units/s in normalized space), plus a decaying-radius `trail`
 * buffer (the elastic pseudopod reaching toward the cursor and snapping back).
 *
 * Under `prefers-reduced-motion` the substrate freezes the rAF, so `tick` is not
 * called and every axis holds its rest value — there is NO parallel matchMedia
 * here (the substrate owns PRM). The deterministic rest pose: the spring at the
 * pointer target (or centre when inactive), zero velocity, the trail collapsed
 * onto the body.
 *
 * The SDF-shaped hit test. The
 * listener box is a SQUARE, but the blob silhouette is the body DISC (the satellites
 * orbit OUTSIDE the box). `options.hitRadius()` returns the silhouette radius in the
 * normalized [-1, 1] space; `hitTest(clientX, clientY)` is the authoritative predicate
 * the engage + click gates read, and `onPointerMove` engages the attract ONLY inside
 * it — so hovering the empty box margin never lunges the blob, and the caller lets a
 * corner click FALL THROUGH to a sibling card (the `.goo-blob-hit` clip-path is the
 * compositor-level twin). With `hitRadius` unset, the whole box engages; a shaped
 * consumer passes a tighter silhouette radius.
 */
export function useBlobPointer(
    el: Ref<HTMLElement | null>,
    options: { hitRadius?: () => number } = {},
) {
    const { hitRadius } = options;
    const pointer = ref({ x: 0, y: 0 });
    const velocity = ref({ x: 0, y: 0 });
    const active = ref(false);
    const pulseRef = ref(0);

    let rawX = 0;
    let rawY = 0;

    // Two critically-damped springs (x, y). `response` ~0.18s is a snappy-but-
    // weighty settle; `dampingFraction` 1.0 is critical (no overshoot on the
    // follow — the click impulse is the bounce channel, not this). `SpringProgress`
    // starts at `initial` (default 0) — there is no `from`/`to` option pair (those
    // keys were silently ignored; the target is driven per-frame via `.target`).
    const springOpts = { response: 0.18, dampingFraction: 1.0 };
    const springX = new SpringProgress(springOpts);
    const springY = new SpringProgress(springOpts);

    // The trail ring buffer — TRAIL_N most-recent smoothed positions. Later samples
    // (older) paint smaller metaballs so the limb tapers into a tail.
    const trail: TrailSample[] = Array.from({ length: TRAIL_N }, () => ({
        x: 0,
        y: 0,
        radius: 0,
    }));
    let trailHead = 0;
    let trailLen = 0;

    // Click-impulse channel — a one-shot UNDERDAMPED harmonic oscillator (overshoot
    // then settle) integrated SEMI-IMPLICIT (symplectic) Euler `v += a*dt; x +=
    // v*dt` (explicit Euler blows up at low frame rate). `pulse` rides the body
    // radius; it is CLAMPED to > -0.9 so bodyR never inverts. A click kicks the
    // velocity; the spring rings back to 0.
    let pulse = 0;
    let pulseVel = 0;
    // Underdamped spring constants (PULSE_OMEGA/PULSE_ZETA) live in../constants.

    // the SDF engage radius in the listener's normalized [-1, 1] space. The
    // blob silhouette ≈ the body disc (satellites orbit OUTSIDE the listener box);
    // `hitRadius()` returns that radius, UNSET → Infinity (the whole box is always
    // active). `pulse` swells the body on a click, so the
    // engage radius widens with it (a click on the just-swollen edge still lands).
    function sdfRadius(): number {
        const r = hitRadius ? hitRadius() : Infinity;
        return r * (1 + Math.max(0, pulse));
    }

    /**
     * The SDF-shaped hit-test (the L5 pointer-shaping ask): is a CLIENT point INSIDE
     * the blob silhouette? The root square must NOT intercept sibling-card clicks —
     * outside the SDF the caller lets the event fall through (the `.goo-blob-hit`
     * clip-path is the compositor-level twin; this is the authoritative JS predicate the
     * engage + click gates read). Returns false when unmounted, zero-sized.
     */
    function hitTest(clientX: number, clientY: number): boolean {
        const target = el.value;
        if (!target) return false;
        const rect = target.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
        return Math.hypot(nx, ny) <= sdfRadius();
    }

    function onPointerMove(e: PointerEvent) {
        const target = el.value;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        // Engage the attract/wake ONLY inside the SDF — a pointer over the empty box
        // margin (inside the listener, outside the silhouette) does NOT lunge the blob
        // toward it (the "reads liquid + intentional" bar). The far corners never reach
        // here (the clipped `.goo-blob-hit` + `pointer-events:none` root let them fall
        // through to a sibling). UNSET hitRadius → Infinity → the whole box engages.
        active.value = Math.hypot(rawX, rawY) <= sdfRadius();
    }

    function onPointerLeave() {
        active.value = false;
    }

    let cleanup: (() => void) | null = null;

    watch(
        el,
        (newEl) => {
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
            if (newEl) {
                newEl.addEventListener("pointermove", onPointerMove);
                newEl.addEventListener("pointerleave", onPointerLeave);
                cleanup = () => {
                    newEl.removeEventListener("pointermove", onPointerMove);
                    newEl.removeEventListener("pointerleave", onPointerLeave);
                };
            }
        },
        { immediate: true },
    );

    onUnmounted(() => cleanup?.());

    /**
     * Advance the interaction one frame. `dtMs` is the substrate's per-frame delta;
     * the first post-park `dtMs` can be seconds, so it is CLAMPED to ~50ms (the
     * first-dt clamp — without it the spring/trail JUMP after an offscreen/PRM
     * re-arm). When the pointer is inactive the spring targets centre (the blob
     * relaxes home).
     */
    function tick(dtMs = 16) {
        const dtClampedMs = Math.min(dtMs, 50); // first-dt clamped, milliseconds
        const dt = dtClampedMs / 1000; // seconds — the symplectic-Euler pulse integrator math

        // Idle timer for the mood arc — reset on activity, accumulate otherwise.
        if (active.value) idleMs = 0;
        else idleMs += Math.min(dtMs, 50);

        // Target: the raw pointer when active, centre when not.
        const tx = active.value ? rawX : 0;
        const ty = active.value ? rawY : 0;
        springX.target = tx;
        springY.target = ty;
        // keyframes.js 4.x: `tickDt(dt)` advances by MILLISECONDS (the canonical
        // Tickable step the shared RAFPlayback loop drives). Pass the ms-clamped
        // delta directly.
        springX.tickDt(dtClampedMs);
        springY.tickDt(dtClampedMs);

        pointer.value = { x: springX.value, y: springY.value };
        velocity.value = { x: springX.velocity, y: springY.velocity };

        // Click-impulse — SEMI-IMPLICIT (symplectic) Euler on the damped harmonic
        // oscillator x'' = -omega^2 x - 2*zeta*omega x'. Update velocity FIRST, then
        // position (the symplectic order; explicit Euler diverges at low fps).
        if (pulse !== 0 || pulseVel !== 0) {
            const accel = -PULSE_OMEGA * PULSE_OMEGA * pulse - 2 * PULSE_ZETA * PULSE_OMEGA * pulseVel;
            pulseVel += accel * dt;
            pulse += pulseVel * dt;
            if (pulse < -0.9) pulse = -0.9; // never invert bodyR
            // Settle: snap to 0 once both are tiny.
            if (Math.abs(pulse) < 1e-4 && Math.abs(pulseVel) < 1e-4) {
                pulse = 0;
                pulseVel = 0;
            }
        }
        pulseRef.value = pulse;

        // Push the smoothed position into the trail ring (only while reaching —
        // when settled at rest the trail decays and collapses onto the body).
        const speed = Math.hypot(springX.velocity, springY.velocity);
        if (active.value || speed > 0.05) {
            trailHead = (trailHead + 1) % TRAIL_N;
            trail[trailHead]!.x = springX.value;
            trail[trailHead]!.y = springY.value;
            trailLen = Math.min(trailLen + 1, TRAIL_N);
        } else if (trailLen > 0) {
            // Collapse the trail one slot per frame so it snaps back to the body.
            trailLen = Math.max(0, trailLen - 1);
        }
    }

    /**
     * The live trail sources, newest first, with a decaying radius (`r *= 1 - i/N`)
     * a snapshot the renderer uploads each frame. `count` is the live length.
     * Trail entries are in the SAME normalized [-1, 1] space as `pointer`; the
     * renderer maps them to body space.
     */
    function trailSources(baseRadius: number): { sources: TrailSample[]; count: number } {
        const sources: TrailSample[] = [];
        for (let i = 0; i < trailLen; i++) {
            const slot = (trailHead - i + TRAIL_N * 2) % TRAIL_N;
            const s = trail[slot]!;
            sources.push({ x: s.x, y: s.y, radius: baseRadius * (1 - i / TRAIL_N) });
        }
        return { sources, count: trailLen };
    }

    /**
     * Fire a one-shot click impulse — kicks the pulse oscillator's velocity so the
     * body overshoots then rings back. `amp` is the impulse strength (the config
     * `clickImpulse`). Idempotent re-fires re-kick the same channel (no new path).
     */
    let clickPending = false;
    function click(amp: number) {
        pulseVel += amp * PULSE_OMEGA;
        clickPending = true;
    }

    /** Drain the one-shot click flag; true once after each `click()`. */
    function consumeClick(): boolean {
        const c = clickPending;
        clickPending = false;
        return c;
    }

    // Milliseconds since the last pointer activity; drives the `sleepy` drift.
    let idleMs = 0;

    /**
     * Compose a deterministic reduced-motion rest pose: spring centered, velocity
     * zero, trail collapsed, and pulse cleared. The substrate owns the preference;
     * the renderer calls this for its static frame so gesture state cannot leak.
     */
    function rest() {
        springX.reset(0, 0); // value 0, velocity 0
        springY.reset(0, 0);
        springX.target = 0;
        springY.target = 0;
        pointer.value = { x: 0, y: 0 };
        velocity.value = { x: 0, y: 0 };
        pulse = 0;
        pulseVel = 0;
        pulseRef.value = 0;
        trailLen = 0;
    }

    /**
     * The pointer is at rest (and the quiescence loop may park) when
     * EVERY motion source has settled: the pointer is inactive (not over the blob, so
     * the spring is relaxing toward, sitting at centre), the spring velocity is below
     * eps, the spring has reached centre (|value| < eps), the trail has collapsed, AND
     * the click pulse is zero. An ACTIVE pointer is never at rest (the spring is
     * following the cursor), so a held hover keeps the loop alive — no false-park.
     */
    function isAtRest(): boolean {
        if (active.value) return false;
        const speed = Math.hypot(springX.velocity, springY.velocity);
        if (speed > REST_EPS) return false;
        if (Math.abs(springX.value) > REST_EPS || Math.abs(springY.value) > REST_EPS)
            return false;
        if (trailLen > 0) return false;
        if (pulse !== 0 || pulseVel !== 0) return false;
        return true;
    }

    return {
        pointer: readonly(pointer),
        velocity: readonly(velocity),
        active: readonly(active),
        /**
         * the RAW pointer target (pre-spring, [-1,1] body space). The
         * shared `usePointerVelocityField` reads THIS (not the smoothed `pointer`) so the
         * field is the ONE smoothing stage — the double-smooth (feeding the spring output
         * into the field, which smooths it AGAIN) is dead. The blob's own body spring reads
         * `rawX`/`rawY` too (parallel, not serial), so no lag compounds.
         */
        rawPointer: (): { x: number; y: number } => ({ x: rawX, y: rawY }),
        /** The live click-impulse pulse value (folds into uPulseAmp). */
        pulse: readonly(pulseRef),
        /** Milliseconds since the last pointer activity, used by mood idle drift. */
        idleMs: () => idleMs,
        tick,
        trailSources,
        click,
        consumeClick,
        rest,
        /** Quiescence predicate read by the renderer's demand gate. */
        isAtRest,
        /** the SDF-shaped hit-test (is a client point inside the blob silhouette?). */
        hitTest,
    };
}

export type BlobPointer = ReturnType<typeof useBlobPointer>;
