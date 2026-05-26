// Live-target spring composable wrapping keyframes.js SpringProgress.
//
// Sibling of `useAnimatedNumber` (first-order exponential smoothing via
// SmoothProgress). Where `useAnimatedNumber` damps toward a target with no
// overshoot, `useSpring` integrates a second-order damped harmonic
// oscillator — overshoot, oscillation, parametric `(response, ζ)`.
//
// The engine owns the rAF loop (`SpringProgress.play(onFrame)`); this
// composable wires Vue reactivity, target-source tracking, the
// prefers-reduced-motion fast-path, and lifecycle cleanup on scope dispose.
//
// Lands W9-β of the AL SLIM plan. Consumes W9-α (SpringProgress publisher
// in `@mkbabb/keyframes.js`).

import { SpringProgress } from "@mkbabb/keyframes.js";
import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    shallowRef,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";

export interface UseSpringOptions {
    /**
     * Angular period of oscillation in seconds. Roughly: how long the spring
     * takes to swing through one cycle if undamped. Default 0.5 (iOS smooth).
     */
    response?: number;
    /**
     * Damping ratio ζ. `1` is critically damped (fastest settle, no
     * overshoot); `< 1` rings (overshoots target); `> 1` is overdamped
     * (sluggish, monotone). Default 0.86 (iOS smooth preset).
     */
    dampingFraction?: number;
    /** Starting position. Default 0. */
    initial?: number;
    /** Starting velocity (units/s). Default 0. */
    initialVelocity?: number;
    /**
     * Position settle threshold. When |value - target| AND |velocity| both
     * drop below their respective thresholds, the spring snaps to target
     * and stops integrating. Default 1e-3.
     */
    settleThreshold?: number;
    /** Velocity settle threshold (units/s). Default 1e-3. */
    velocitySettleThreshold?: number;
    /**
     * Honor `prefers-reduced-motion: reduce` by snapping to target
     * immediately rather than springing. Default true.
     */
    respectReducedMotion?: boolean;
    /** Per-frame side-effect hook. Receives the current spring value. */
    onValue?: (value: number, velocity: number) => void;
}

export interface SpringRef {
    /** Reactive spring position. Bind in templates. */
    value: Readonly<Ref<number>>;
    /** Reactive spring velocity (units/s). */
    velocity: Readonly<Ref<number>>;
    /** True when the spring has settled at target. */
    isSettled: Readonly<Ref<boolean>>;
    /** Force value to target immediately and stop the loop. */
    snap: () => void;
    /** Reset value + velocity (default 0/0), then stop the loop. */
    reset: (value?: number, velocity?: number) => void;
    /** Stop the spring and detach the target watcher. */
    dispose: () => void;
}

/**
 * Track a live numeric target with iOS-style spring physics.
 *
 * Wraps `SpringProgress.play(onFrame)` from `@mkbabb/keyframes.js`. The
 * engine owns rAF + analytic ODE integration; this composable wires the
 * reactive surface, target-source tracking, and PRM fast-path.
 *
 * @example
 * ```ts
 * const target = ref(0)
 * const { value, isSettled } = useSpring(target, {
 *   response: 0.4,
 *   dampingFraction: 0.7,
 * })
 * // ...
 * target.value = 100  // value damps toward 100 with overshoot per ζ
 * ```
 */
export function useSpring(
    target: MaybeRefOrGetter<number | null | undefined>,
    options: UseSpringOptions = {},
): SpringRef {
    const initial = options.initial ?? 0;
    const initialVelocity = options.initialVelocity ?? 0;

    const value = ref(initial);
    const velocity = ref(initialVelocity);
    const isSettled = ref(initialVelocity === 0);

    const spring = shallowRef(
        new SpringProgress({
            response: options.response ?? 0.5,
            dampingFraction: options.dampingFraction ?? 0.86,
            initial,
            initialVelocity,
            settleThreshold: options.settleThreshold ?? 1e-3,
            velocitySettleThreshold: options.velocitySettleThreshold ?? 1e-3,
            respectReducedMotion: options.respectReducedMotion !== false,
        }),
    );

    // `subscribe` is the unified mirror — fires on every state change
    // including the rAF tick (via `play`), the prefers-reduced-motion
    // fast-path snap inside `target` setter, and `snap`/`reset`. Using it
    // as the single sync point means the Vue refs stay accurate across
    // all engine paths, not just the rAF loop.
    const unsubscribe = spring.value.subscribe((v, vel) => {
        value.value = v;
        velocity.value = vel;
        isSettled.value = spring.value.settled;
        options.onValue?.(v, vel);
    });

    // `play(noopCallback)` arms the engine's rAF lifecycle (auto-start on
    // target re-seat, auto-stop on settle). The callback itself is a no-op
    // — we read state through `subscribe` above so the Vue refs stay in
    // sync across every engine path (rAF tick, PRM snap, target re-seat,
    // snap/reset). The `_onFrame` slot is non-undefined which is the
    // engine's auto-resume gate (see SpringProgress.reseatTarget).
    const noop = (): void => {};
    spring.value.play(noop);

    const stopTargetWatch = watch(
        () => toValue(target),
        (nextTarget) => {
            if (nextTarget == null) return;
            spring.value.target = nextTarget;
        },
        { immediate: true },
    );

    function syncRefs(): void {
        value.value = spring.value.value;
        velocity.value = spring.value.velocity;
        isSettled.value = spring.value.settled;
    }

    function dispose(): void {
        stopTargetWatch();
        unsubscribe();
        spring.value.dispose();
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return {
        value: readonly(value),
        velocity: readonly(velocity),
        isSettled: readonly(isSettled),
        snap: () => {
            spring.value.snap();
            syncRefs();
        },
        reset: (resetValue, resetVelocity) => {
            spring.value.reset(resetValue ?? 0, resetVelocity ?? 0);
            syncRefs();
        },
        dispose,
    };
}
