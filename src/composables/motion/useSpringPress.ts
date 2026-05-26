// Press-state spring composable — binds spring target to 0/1 on pointer
// down/up. The output `value` is a 0..1 (with overshoot) ref consumers
// bind to `transform: scale(...)`, `opacity`, etc. for iOS-style tap
// squish on Button / Card / list-row primitives.
//
// Sister of `useSpring`: same engine, but the target is pinned to the
// press state rather than a free-form numeric. Pointer-only by design
// (precept: keyboard focus rides its own non-spring `--motion-ease-apple`
// curve — see X4 §5 risk 5 on tap-press double-fire avoidance).
//
// Lands W9-β of the AL SLIM plan alongside `useSpring`.

import { ref } from "vue";
import { useSpring, type UseSpringOptions, type SpringRef } from "./useSpring";

export interface UseSpringPressOptions extends UseSpringOptions {
    /**
     * Spring `response`. Default 0.25s (iOS tap-press canonical; faster
     * than the default `useSpring` 0.5s to keep press feedback under the
     * 100ms perception threshold).
     */
    response?: number;
    /**
     * Spring `dampingFraction`. Default 0.7 (overshoots ~5% — feels
     * springy but doesn't ring).
     */
    dampingFraction?: number;
}

export interface SpringPressRef extends SpringRef {
    /** Call on `pointerdown`. Drives target to 1. */
    press: () => void;
    /** Call on `pointerup` / `pointercancel` / `pointerleave`. Drives target to 0. */
    release: () => void;
    /** Convenience: handlers ready to spread onto an element. */
    handlers: {
        onPointerdown: () => void;
        onPointerup: () => void;
        onPointercancel: () => void;
        onPointerleave: () => void;
    };
}

/**
 * Spring-physics press feedback. Returns a `value` ref animating between
 * 0 (released) and 1 (pressed) with iOS-style overshoot, plus handlers
 * to wire into an element's pointer events.
 *
 * @example
 * ```vue
 * <script setup>
 * const { value, handlers } = useSpringPress()
 * </script>
 * <template>
 *   <button
 *     v-bind="handlers"
 *     :style="{ transform: `scale(${1 - value * 0.05})` }"
 *   />
 * </template>
 * ```
 */
export function useSpringPress(
    options: UseSpringPressOptions = {},
): SpringPressRef {
    // Local writable target ref; the underlying useSpring watches it.
    const target = ref(0);

    const spring = useSpring(target, {
        response: options.response ?? 0.25,
        dampingFraction: options.dampingFraction ?? 0.7,
        initial: options.initial ?? 0,
        initialVelocity: options.initialVelocity,
        settleThreshold: options.settleThreshold,
        velocitySettleThreshold: options.velocitySettleThreshold,
        respectReducedMotion: options.respectReducedMotion,
        onValue: options.onValue,
    });

    function press(): void {
        target.value = 1;
    }

    function release(): void {
        target.value = 0;
    }

    return {
        ...spring,
        press,
        release,
        handlers: {
            onPointerdown: press,
            onPointerup: release,
            onPointercancel: release,
            onPointerleave: release,
        },
    };
}
