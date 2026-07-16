// useLeadTrail — the two-edge lead/trail integrator.
//
// The driver behind the liquid dot-MORPH worm (the pager indicator). A morphing
// indicator is not a single point that slides — it has TWO edges: a LEAD edge that
// springs toward the target and a TRAIL edge that lags behind and catches up. The
// gap between the edges IS the worm's live
// elongation; when the trail catches the lead the worm re-forms on the target.
// "Release at arrival" is EMERGENT (the trail catching the lead), never a timer.
//
// THE MECHANISM (ONE rAF, keyframes-FREE):
//   • lead  — a hand-rolled damped spring (semi-implicit Euler), sub-stepped for
//     stability at the pager-owned response 0.68 / ζ 0.64 (NO keyframes import).
//     `drive(target)` retargets it; the velocity carries (interruption is FREE).
//   • trail — a critically-damped EXPONENTIAL follower in the SAME step:
//     `trail += (lead − trail)·(1 − exp(−dt/τ))`, τ ≈ 270ms. It owns no spring; it
//     eases toward the LIVE lead, so a fast retarget stretches the gap then the
//     trail reels in.
//   • lo/hi — `min`/`max` of the two edges: DIRECTION-AGNOSTIC (a forward hop and a
//     backward hop paint the same barbell; the trailing body just swaps ends).
//
// The loop PARKS when settled (lead≈target, |v|≈0, lead≈trail) — no perpetual rAF
// (offscreen-friendly by construction; nothing runs when the worm rests). `drive` /
// `seat` re-arm it. This is ONE rAF and ZERO per-frame `getComputedStyle` — the
// consumer writes its own DOM inside `onFrame` off the numeric edges the step hands.
//
// PRM (motion-canon P6): under `prefers-reduced-motion: reduce` `drive` SEATS the
// edges at the target instantly (zero in-between frames, no spring) — the worm is
// ONE body on the target; only the consumer's fade survives. The PRM signal is a
// SINGLE shared reduced-motion authority.
//
// VUE-ONLY (off the SCC trap): imports `vue` only — no `@vueuse/core`, no
// `@mkbabb/keyframes.js` — so it ships on the engine-free `/motion-core` subpath AND
// the root barrel (the `usePointerVelocityField` / `useLiquidFlex` precedent). The
// integrator is hand-rolled; no spring engine is introduced.

import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";
import { useReducedMotion } from "../core/useReducedMotion";

// Pager-owned lead response and damping for the hand-rolled spring — NOT a
// keyframes `SpringProgress` (the SCC-trap + keyframes-free fence).
const LEAD_RESPONSE = 0.68; // 2π/response = the natural frequency
const LEAD_DAMPING = 0.64;
// The trailing follower's time constant (~270ms) — the LAG that mints the elongation.
const TRAIL_TAU_S = 0.27;
// Semi-implicit Euler sub-steps: the stiff dock spring needs a fine `h` for stability.
const SUBSTEPS = 8;
// Settled bands: within these px / px-per-second the worm has re-formed → park.
const SETTLE_POS_EPS = 0.3;
const SETTLE_VEL_EPS = 2;
// Clamp a long inter-frame gap (a backgrounded tab) so the spring never explodes.
const MAX_DT_MS = 40;

export interface UseLeadTrailOptions {
    /** The lead spring response (2π/response = the natural frequency). Default 0.68. */
    response?: number;
    /** The lead spring damping ratio ζ. Default 0.64. */
    damping?: number;
    /** The trailing follower time constant, seconds. Default 0.27 (≈270ms). */
    trailTau?: number;
    /** Honor `prefers-reduced-motion: reduce` → `drive` seats instantly. Default true. */
    respectReducedMotion?: boolean;
    /**
     * The per-frame writer the consumer supplies (the DOM-write path, NO reactive
     * thrash). Called each rAF tick with the live numeric edges — the consumer
     * projects its silhouette (for example, a barbell) off `lo`/`hi`. Also called
     * once on `seat` so a static mount paints correctly.
     */
    onFrame?: (edges: LeadTrailEdges) => void;
}

/** The two-edge state a single frame hands the consumer. */
export interface LeadTrailEdges {
    /** The lead edge (px) — springs toward the drive target. */
    lead: number;
    /** The trail edge (px) — lags then catches the lead. */
    trail: number;
    /** `min(lead, trail)` — the trailing silhouette edge (direction-agnostic). */
    lo: number;
    /** `max(lead, trail)` — the leading silhouette edge (direction-agnostic). */
    hi: number;
    /** True once the edges have re-formed on the target (the emergent release). */
    settled: boolean;
}

export interface UseLeadTrail {
    /** The live lead edge (updated per frame; the consumer usually reads `onFrame`). */
    readonly lead: Readonly<Ref<number>>;
    /** The live trail edge (updated per frame). */
    readonly trail: Readonly<Ref<number>>;
    /** True while the worm has re-formed on the target (the rAF is parked). */
    readonly settled: Readonly<Ref<boolean>>;
    /**
     * Retarget the lead edge (px). The velocity carries — a retarget mid-flight
     * re-seats the target, the spring continues from its LIVE `(position, velocity)`
     * so interruption is free. Under PRM this SEATS instantly (zero in-between frames).
     * The `drive(fractionalIndex→px)` seam consumed by carousel drag scrubbing.
     */
    drive(target: number): void;
    /** Snap BOTH edges to `value` instantly (mount / resize / PRM). Paints once. */
    seat(value: number): void;
    /** Tear down the rAF + shared-preference watch (auto-run on scope dispose). */
    dispose(): void;
}

/**
 * The two-edge lead/trail integrator — a spring LEAD + a damped TRAIL follower in
 * ONE rAF. The gap between the edges is the morph's live elongation; the trail
 * catching the lead is the emergent release. keyframes-FREE + vueuse-FREE. See the
 * module header for the pager-worm rationale.
 *
 * @example
 * ```ts
 * const worm = useLeadTrail({
 *   onFrame({ lo, hi }) {
 *     // project the barbell off the two edges (no getComputedStyle)
 *     paintBarbell(lo, hi)
 *   },
 * })
 * worm.seat(centerOf(active))   // mount
 * worm.drive(centerOf(next))    // hop — the lead springs, the trail lags then reels in
 * ```
 */
export function useLeadTrail(options: UseLeadTrailOptions = {}): UseLeadTrail {
    const response = options.response ?? LEAD_RESPONSE;
    const damping = options.damping ?? LEAD_DAMPING;
    const trailTau = options.trailTau ?? TRAIL_TAU_S;
    const respectPRM = options.respectReducedMotion !== false;
    const onFrame = options.onFrame;

    const omega = (2 * Math.PI) / response; // the natural angular frequency

    const lead = ref(0);
    const trail = ref(0);
    const settled = ref(true);

    let x = 0; // lead position
    let v = 0; // lead velocity
    let t = 0; // trail position
    let target = 0;
    let rafId = 0;
    let lastNow = 0;
    const reduced = respectPRM ? useReducedMotion() : ref(false);

    const canRaf =
        typeof window !== "undefined" &&
        typeof window.requestAnimationFrame === "function";

    function currentEdges(): LeadTrailEdges {
        return {
            lead: x,
            trail: t,
            lo: Math.min(x, t),
            hi: Math.max(x, t),
            settled: settled.value,
        };
    }

    function publish(): void {
        lead.value = x;
        trail.value = t;
        onFrame?.(currentEdges());
    }

    function isAtRest(): boolean {
        return (
            Math.abs(x - target) < SETTLE_POS_EPS &&
            Math.abs(v) < SETTLE_VEL_EPS &&
            Math.abs(x - t) < SETTLE_POS_EPS
        );
    }

    function stop(): void {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    function step(now: number): void {
        const dtMs = lastNow ? Math.min(now - lastNow, MAX_DT_MS) : 1000 / 60;
        lastNow = now;
        const dt = dtMs / 1000;

        // lead — semi-implicit Euler, sub-stepped for stiff-spring stability.
        const h = dt / SUBSTEPS;
        for (let i = 0; i < SUBSTEPS; i++) {
            const a = -omega * omega * (x - target) - 2 * damping * omega * v;
            v += a * h;
            x += v * h;
        }
        // trail — a critically-damped exponential follower toward the LIVE lead.
        t += (x - t) * (1 - Math.exp(-dt / trailTau));

        publish();

        if (isAtRest()) {
            // seat dead-on to kill the sub-px residual, then park (the emergent release).
            x = target;
            v = 0;
            t = target;
            settled.value = true;
            publish();
            stop();
            return;
        }
        rafId = requestAnimationFrame(step);
    }

    function ensureLoop(): void {
        if (!canRaf) {
            publish();
            return;
        }
        if (rafId) return;
        lastNow = 0;
        rafId = requestAnimationFrame(step);
    }

    function drive(next: number): void {
        if (!Number.isFinite(next)) return;
        target = next;
        // PRM (P6) — seat instantly, zero in-between frames (no spring, no elongation).
        if (reduced.value) {
            seat(next);
            return;
        }
        settled.value = false;
        ensureLoop();
    }

    function seat(value: number): void {
        if (!Number.isFinite(value)) return;
        stop();
        target = value;
        x = value;
        v = 0;
        t = value;
        settled.value = true;
        publish();
    }

    const stopReducedMotionWatch = watch(
        reduced,
        (next) => {
            if (next) seat(target);
        },
        { flush: "sync" },
    );

    function dispose(): void {
        stop();
        stopReducedMotionWatch();
    }

    onScopeDispose(dispose);

    return {
        lead: readonly(lead) as Readonly<Ref<number>>,
        trail: readonly(trail) as Readonly<Ref<number>>,
        settled: readonly(settled) as Readonly<Ref<boolean>>,
        drive,
        seat,
        dispose,
    };
}
