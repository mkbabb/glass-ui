// useLeadTrail — the two-edge morph driver, and the law it runs on.
//
// A morphing indicator is not a point that slides: it has TWO edges, and the gap
// between them IS its elongation. The question is what sets that gap, and the
// predecessor answered it with a second integrator — a critically-damped
// exponential follower chasing the live lead with a 270 ms time constant.
//
// THAT ANSWER IS ARITHMETICALLY UNABLE TO ARRIVE, which is the whole reason this
// is a greenfield and not a retune. An exponential follower approaches its target
// and never reaches it, so the settle costs `τ·ln(gap/ε)` no matter what τ is: a
// 16.9 px peak gap against a 0.3 px settle band is a full second of hairline neck
// AFTER both bodies have visibly landed — measured at ninety percent of the hop's
// duration, and the hop itself ran fourteen hundred milliseconds against a
// two-hundred-and-twenty millisecond register. Lowering τ moves the number and
// keeps the shape. No τ removes a logarithm.
//
// THE LAW, instead:
//
//     trail = lead − clamp(v_lead · τ_e, ±ceil)
//
// ELONGATION IS VELOCITY. The gap peaks at peak velocity — early, where the eye
// is — and is EXACTLY ZERO the frame the lead lands, because the lead's velocity
// is zero there. The tail cannot exist by construction; there is nothing to
// settle, so there is no second settle to wait for. Interruption stays free: a
// retarget mid-flight carries the live velocity, and the elongation follows it
// without being told. There is one integrator now, and one clock.
//
// THE CEILING IS A BAND, not a constant: `clamp(pitch, |Δ|·0.55, 3·pitch)`. A
// neighbour hop bridges one pitch and an eleven-cell hop stretches to three — so
// an eleven-cell hop READS as eleven, which a fixed 36 px clamp made impossible
// (every hop of three or more saturated into the same rigid lozenge).
//
// THE SPRING IS THE GOVERNED `dock` ROW, read from the preset table at
// construction — the coordinated-travel register, which is exactly this job.
// The predecessor's hand-rolled 0.68 / ζ0.64 was a third set of spring numbers
// living anonymously inside a composable, and its ζ belonged to a `bouncy` row
// the register retired: 7.1% overshoot against a measured corpus ceiling of 4.7%.
//
// TWO CONSUMERS, ONE LAW. `trailOffset` is exported because the carousel's
// interior content-lag is the same bounded velocity lag over a different quantity
// (LAW 3 — content trails its housing). One law, stated once.
//
// VUE-ONLY (off the SCC trap): imports `vue` and the preset TABLE only — no
// `@vueuse/core`, no `@mkbabb/keyframes.js`. The integrator is hand-rolled; no
// spring engine is introduced.

import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";
import { FRAME_MS } from "../core/constants";
import { useReducedMotion } from "../core/useReducedMotion";
import { springPreset } from "../spring/springPresets";

// The elongation time constant, in seconds — `gap = |v|·τ_e` at the peak. NAMED but
// module-private: it is this module's default for `options.tau` and has no reader
// anywhere else, and an export with no external site is not API. The name is the point;
// the export was the overfit.
const LEAD_TRAIL_TAU_E_S = 0.08;

// Semi-implicit Euler sub-steps: a stiff spring needs a fine `h` for stability.
const SUBSTEPS = 8;
// Settled bands: within these px / px-per-second the morph has re-formed → park.
// TWO clauses, not three — the third asked the trail to converge separately, and
// under this law the trail is a function of the velocity the second clause already
// bounds.
const SETTLE_POS_EPS = 0.3;
const SETTLE_VEL_EPS = 2;
// Clamp a long inter-frame gap (a backgrounded tab) so the spring never explodes.
const MAX_DT_MS = 40;

/**
 * The bounded velocity lag — `clamp(v·τ, ±ceil)`. The worm's trail edge and the
 * carousel's interior content-lag are the same law over different quantities.
 */
export function trailOffset(velocity: number, tau: number, ceil: number): number {
    const raw = velocity * tau;
    return raw > ceil ? ceil : raw < -ceil ? -ceil : raw;
}

export interface UseLeadTrailOptions {
    /**
     * The lag ceiling in px, re-read per frame so it can be a live geometry band
     * (`clamp(pitch, |Δ|·0.55, 3·pitch)`). A plain number is a fixed ceiling.
     */
    ceil?: number | (() => number);
    /** The elongation time constant, seconds. Default 0.08. */
    tau?: number;
    /** Honor `prefers-reduced-motion: reduce` → `drive` seats instantly. Default true. */
    respectReducedMotion?: boolean;
    /**
     * The per-frame writer. Called each rAF tick with the live numeric edges — the
     * consumer projects its silhouette off `lo`/`hi`. Also called once on `seat`
     * so a static mount paints correctly.
     */
    onFrame?: (edges: LeadTrailEdges) => void;
}

/** The two-edge state a single frame hands the consumer. */
export interface LeadTrailEdges {
    /** The lead edge (px) — springs toward the drive target. */
    lead: number;
    /** The trail edge (px) — the lead, offset by the bounded velocity lag. */
    trail: number;
    /** The lead's velocity (px/s) — the elongation's own cause. */
    velocity: number;
    /** `min(lead, trail)` — direction-agnostic. */
    lo: number;
    /** `max(lead, trail)`. */
    hi: number;
    /** True once the edges have re-formed on the target. */
    settled: boolean;
}

export interface UseLeadTrail {
    /** The live lead edge (updated per frame). */
    readonly lead: Readonly<Ref<number>>;
    /** The live trail edge (updated per frame). */
    readonly trail: Readonly<Ref<number>>;
    /** True while the morph has re-formed on the target (the rAF is parked). */
    readonly settled: Readonly<Ref<boolean>>;
    /**
     * Retarget the lead edge (px). The velocity carries — a retarget mid-flight
     * continues from the LIVE `(position, velocity)`, so interruption is free.
     * Under PRM this SEATS instantly (zero in-between frames).
     */
    drive(target: number): void;
    /** Snap BOTH edges to `value` instantly (mount / resize / PRM). Paints once. */
    seat(value: number): void;
    /** Tear down the rAF + shared-preference watch (auto-run on scope dispose). */
    dispose(): void;
}

/**
 * The two-edge morph driver — a governed spring LEAD and a velocity-derived TRAIL
 * in ONE rAF, with ZERO per-frame style reads. See the module header for the law.
 *
 * @example
 * ```ts
 * const worm = useLeadTrail({
 *   ceil: () => elongationCeil(),          // clamp(pitch, |Δ|·0.55, 3·pitch)
 *   onFrame: ({ lo, hi }) => paintBarbell(lo, hi),
 * })
 * worm.seat(centerOf(active))   // mount
 * worm.drive(centerOf(next))    // hop — the gap peaks with the velocity, then is 0
 * ```
 */
export function useLeadTrail(options: UseLeadTrailOptions = {}): UseLeadTrail {
    // The governed coordinated-travel row, read from the table — never a literal,
    // and never a remembered one.
    const preset = springPreset("dock");
    const omega = (2 * Math.PI) / preset.response;
    const damping = preset.dampingFraction;

    const tau = options.tau ?? LEAD_TRAIL_TAU_E_S;
    const ceilOf = (): number =>
        typeof options.ceil === "function"
            ? options.ceil()
            : (options.ceil ?? Number.POSITIVE_INFINITY);
    const respectPRM = options.respectReducedMotion !== false;
    const onFrame = options.onFrame;

    const lead = ref(0);
    const trail = ref(0);
    const settled = ref(true);

    let x = 0; // lead position
    let v = 0; // lead velocity
    let target = 0;
    let rafId = 0;
    let lastNow = 0;
    const reduced = respectPRM ? useReducedMotion() : ref(false);

    const canRaf =
        typeof window !== "undefined" &&
        typeof window.requestAnimationFrame === "function";

    function edges(): LeadTrailEdges {
        const t = x - trailOffset(v, tau, ceilOf());
        return {
            lead: x,
            trail: t,
            velocity: v,
            lo: Math.min(x, t),
            hi: Math.max(x, t),
            settled: settled.value,
        };
    }

    function publish(): void {
        const e = edges();
        lead.value = e.lead;
        trail.value = e.trail;
        onFrame?.(e);
    }

    function isAtRest(): boolean {
        return Math.abs(x - target) < SETTLE_POS_EPS && Math.abs(v) < SETTLE_VEL_EPS;
    }

    function stop(): void {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    function step(now: number): void {
        // First tick has no previous timestamp to difference: assume one frame.
        const dtMs = lastNow ? Math.min(now - lastNow, MAX_DT_MS) : FRAME_MS;
        lastNow = now;
        const dt = dtMs / 1000;

        const h = dt / SUBSTEPS;
        for (let i = 0; i < SUBSTEPS; i++) {
            const a = -omega * omega * (x - target) - 2 * damping * omega * v;
            v += a * h;
            x += v * h;
        }

        publish();

        if (isAtRest()) {
            // seat dead-on to kill the sub-px residual, then park. The gap is
            // already zero here: the velocity is.
            x = target;
            v = 0;
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
        // PRM — seat instantly, zero in-between frames (no spring, no elongation).
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
