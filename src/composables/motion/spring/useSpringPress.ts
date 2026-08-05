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
// Lands of the AL SLIM plan alongside `useSpring`.

import { ref } from "vue";
import { useSpring, type UseSpringOptions, type SpringRef } from "./useSpring";
import { springPreset } from "./springPresets";

// The press defaults read the `press` SPRING_PRESETS row — the one source, never a
// local literal. The row answers the finger inside the tap window and lands DEAD: its
// liveliness is the volume-preserving squish and the light that follows, never a
// positional rebound (LAW 0). Drift-proof — a retune edits the table row and this
// default re-derives.
const PRESS = springPreset("press");

export interface UseSpringPressOptions extends UseSpringOptions {
    /**
     * Spring `response` — defaults to the `press` row's own, the tap-press window:
     * faster than the generic `useSpring` bare default so the feedback lands with a
     * hair of inertial carry.
     */
    response?: number;
    /**
     * Spring `dampingFraction` — defaults to the `press` row's own ζ, which lands the
     * press dead rather than ringing.
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
        response: options.response ?? PRESS.response,
        dampingFraction: options.dampingFraction ?? PRESS.dampingFraction,
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
