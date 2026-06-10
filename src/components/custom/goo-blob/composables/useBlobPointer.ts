import { ref, watch, onUnmounted, readonly, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";

/** Compile-time trail length — mirrors `TRAIL_N` in metaball.frag.ts. */
export const TRAIL_N = 15;

/** A single trail sample — a decaying-radius metaball source the shader smin-merges. */
export interface TrailSample {
    x: number;
    y: number;
    radius: number;
}

/**
 * The blob pointer/interaction machine (W10). Tracks the pointer over a host
 * element (normalised to [-1, 1] about the element centre) and resolves it with a
 * FRAME-RATE-INDEPENDENT critically-damped spring fed the renderer's per-frame
 * `dtMs` (NOT a fixed-α lerp — the prior `SMOOTH_FACTOR = 0.12` was framerate
 * dependent). The spring is `@mkbabb/keyframes.js` `SpringProgress` driven through
 * its `tickDt(dtMs)` seam by the SUBSTRATE's single rAF — it does NOT call
 * `SpringProgress.play()` (that would start a parallel rAF, the
 * single-substrate-loop violation `proof:blob-interaction-prm` forbids).
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
 */
export function useBlobPointer(el: Ref<HTMLElement | null>) {
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
    // Underdamped: omega sets the ring frequency, zeta < 1 the bounce.
    const PULSE_OMEGA = 18; // rad/s
    const PULSE_ZETA = 0.35; // underdamped

    function onPointerMove(e: PointerEvent) {
        const target = el.value;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        active.value = true;
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
        // Tickable step the shared RAFPlayback loop drives) — the 2.x `tick(seconds)`
        // seam was renamed + re-based to ms. Pass the ms-clamped delta directly.
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
     * — a snapshot the renderer uploads each frame. `count` is the live length.
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

    /** Drain the one-shot click flag — true once after each `click()` (W11.c mood). */
    function consumeClick(): boolean {
        const c = clickPending;
        clickPending = false;
        return c;
    }

    // ms since the last pointer activity — drives the mood `sleepy` drift (W11.c).
    let idleMs = 0;

    /**
     * Compose the DETERMINISTIC reduced-motion rest pose (W10): the spring snapped
     * to centre, zero velocity, the trail collapsed, the pulse zeroed. The
     * SUBSTRATE decides WHEN to freeze (it owns PRM); the renderer calls this on the
     * one static frame it paints so the rest pose is bit-deterministic (no leaked
     * mid-gesture residual). NO matchMedia here.
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
     * AX.W16 (arm 2) — the pointer is AT REST (the quiescence loop may park) when
     * EVERY motion source has settled: the pointer is inactive (not over the blob, so
     * the spring is relaxing toward / sitting at centre), the spring velocity is below
     * eps, the spring has reached centre (|value| < eps), the trail has collapsed, AND
     * the click pulse is zero. An ACTIVE pointer is never at rest (the spring is
     * following the cursor), so a held hover keeps the loop alive — no false-park.
     */
    const REST_EPS = 1e-3;
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
        /** The live click-impulse pulse value (folds into uPulseAmp). */
        pulse: readonly(pulseRef),
        /** ms since the last pointer activity (W11.c mood idle drift). */
        idleMs: () => idleMs,
        tick,
        trailSources,
        click,
        consumeClick,
        rest,
        /** AX.W16 — the quiescence at-rest predicate the renderer's demand gate reads. */
        isAtRest,
    };
}

export type BlobPointer = ReturnType<typeof useBlobPointer>;
