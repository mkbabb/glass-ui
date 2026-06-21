// BE.W-HAPTIC-COUPLE — useHaptic: feature-detected navigator.vibrate coupled to the
// platform's confirm-moments (snap / detent / completion).
//
// THE iOS-27 BETTERS-CLAIM. On Apple hardware a control SNAP — a drag releasing into a
// detent, a toggle flipping, a download completing — confirms with a crisp Taptic pulse:
// the gesture lands in the BODY, not only the eye. The web has no Taptic API, but
// `navigator.vibrate` is the cross-platform proxy — genuinely useful on Android/Chrome,
// a clean no-op on iOS Safari (where `vibrate` is unsupported). So the coupling is SAFE
// everywhere and FELT where the platform allows.
//
// VUE-ONLY, ROOT-BARREL-SAFE (the SCC-trap discipline). This leaf imports `vue` ONLY —
// NO `@mkbabb/keyframes.js`, NO `@vueuse/core` — so it ships on the engine-free
// `/motion-core` surface (and reaches the root barrel through it, the
// `useLiquidFlex`/`usePointerVelocityField` precedent). A keyframes/vueuse import would
// force the heavy peer onto `/motion-core` (H1 gate-fenced).
//
// NO NEW GESTURE ENGINE. `useHaptic` adds NO pointer listener, NO rAF, NO velocity
// sampler. `pulse()` is a pure imperative call the consumer fires from inside an EXISTING
// snap callback (`useDragMorph.onSnap`, the W-DOCK-FISSION detent settle,
// `CompletionSeal.play`) — the body-confirm rides the callback the library already owns.
//
// NO AUTO-SUPPRESS UNDER PRM (the recorded distinction). A haptic pulse is motion-adjacent
// but `prefers-reduced-motion` is a VISUAL-vestibular signal, not a haptic one — a pulse
// is not a vestibular trigger, so it does NOT auto-suppress under PRM. The suppression
// axis is the consumer `enabled` opt-out + the browser's own permission model. Conflating
// haptic with visual-motion would wrongly gag the body-confirm for a user who only asked
// to reduce VISUAL motion.
//
// NO BUZZ, NO LOOP. Every named pattern is a bounded sub-100ms tick (the §6 calm register
// applied to the haptic axis — H3 gate-fenced); never a continuous/looping vibrate (an
// annoyance, not a confirm).

import { toValue, type MaybeRefOrGetter } from "vue";

/**
 * The named haptic register — each maps to a small, bounded `navigator.vibrate` ms
 * vocabulary (all sub-100ms total, never a buzz). The standard short-pattern set:
 *   · `tap`        — a single crisp tick (a button press confirm).
 *   · `snap`       — a fling/drag landing into a slot.
 *   · `detent`     — a tiny double-tick (a piece seating into a detent).
 *   · `completion` — the earned-moment confirm (a download done, a personal-best).
 *   · `error`      — a short three-pulse warn.
 */
export type HapticPattern = "tap" | "snap" | "detent" | "completion" | "error";

/** The bounded ms vocabulary — every total ≤ 100ms (the calm register; H3). */
const HAPTIC_PATTERNS: Readonly<Record<HapticPattern, readonly number[]>> = {
    tap: [8],
    snap: [12],
    detent: [6, 18, 6],
    completion: [10, 40, 18],
    error: [20, 30, 20],
};

export interface UseHapticOptions {
    /**
     * The consumer opt-out (the suppression axis — NOT PRM). When falsy, `pulse()` is a
     * clean no-op. A `MaybeRefOrGetter` so a live reactive flag is honored per-call.
     * Default `true`.
     */
    enabled?: MaybeRefOrGetter<boolean>;
}

export interface UseHapticReturn {
    /**
     * The feature-detect — `true` iff `navigator.vibrate` is a callable function (false on
     * iOS Safari + SSR + any non-vibrate engine). A consumer reads it to branch a visual
     * fallback if it wants one.
     */
    readonly supported: boolean;
    /**
     * Fire a haptic pulse — a named `HapticPattern`, a single duration (ms), or a raw
     * `number[]` vibrate pattern. A NO-OP when unsupported or `enabled` is falsy (so iOS
     * Safari + SSR + an opted-out consumer get a clean no-op, never a throw). Pure
     * imperative — fire it from inside an existing snap callback.
     */
    pulse: (pattern: HapticPattern | number | number[]) => void;
}

/** The SSR + feature-detect floor — `navigator.vibrate` is a callable function. */
function detectSupported(): boolean {
    return (
        typeof navigator !== "undefined" &&
        typeof navigator.vibrate === "function"
    );
}

/**
 * Resolve a `pulse()` argument to the bounded ms vocabulary. A named pattern reads the
 * register; a number/array is passed through (the consumer's own bounded pattern).
 */
function resolvePattern(
    pattern: HapticPattern | number | number[],
): number | number[] {
    if (typeof pattern === "string") {
        // HAPTIC_PATTERNS is a Readonly<number[]> — clone to the mutable shape
        // `navigator.vibrate` wants.
        return [...HAPTIC_PATTERNS[pattern]];
    }
    return pattern;
}

/**
 * The library's ONE haptic primitive — a thin, feature-detected `navigator.vibrate`
 * wrapper with a bounded named-pattern register. Feature-detects to a clean no-op on iOS
 * Safari + SSR; never throws. See the module header for the no-engine / no-PRM-suppress /
 * no-buzz rationale.
 *
 * @example
 * ```ts
 * const haptic = useHaptic({ enabled: () => props.enableHaptic })
 * // inside an existing snap callback:
 * onSnap(() => haptic.pulse("snap"))
 * ```
 */
export function useHaptic(options: UseHapticOptions = {}): UseHapticReturn {
    const supported = detectSupported();
    const enabledOpt = options.enabled ?? true;

    function pulse(pattern: HapticPattern | number | number[]): void {
        // The opt-out axis (the consumer flag) — resolved per-call so a live ref is
        // honored. NOT a PRM read (a haptic is not a vestibular trigger).
        if (!toValue(enabledOpt)) return;
        // The feature-detect floor — a clean no-op on iOS Safari + SSR + any
        // non-vibrate engine, never a throw.
        if (!supported) return;
        try {
            navigator.vibrate(resolvePattern(pattern));
        } catch {
            // A spec-violating engine (a vibrate that throws on a valid pattern) must
            // never bubble — the body-confirm is a delight, never a liability.
        }
    }

    return { supported, pulse };
}
