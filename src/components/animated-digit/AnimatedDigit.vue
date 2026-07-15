<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { useAnimatedNumber } from "../../composables/motion/useAnimatedNumber";

/**
 * AnimatedDigit — a numeric display that damps toward its target via
 * `useAnimatedNumber`, formats per consumer-supplied formatter, and ships
 * the tabular-numerals + ss01 + lnum font-feature register so consumers
 * stop hand-wiring those rules per site.
 *
 * AC.W6d — promoted from speedtest's hand-wired
 * `useAnimatedNumber(metric) → result.formatted` + `<span class="tabular-
 * nums">{{ result.formatted.value }}</span>` pattern. Two-line replacement.
 *
 * Consumers pass:
 *  - `value`: the target. The composable damps; on null the displayed
 *    digit clears to the placeholder.
 *  - `format`: optional formatter (`(v: number) => string`). Defaults to
 *    `String(Math.round(v))`.
 *  - `placeholder`: glyph for null/empty (default "—").
 *  - `digitCount`: optional knob exposed to the consumer via the
 *    `--digit-count` CSS custom property on the host. A consumer's
 *    width-clamp can read this so the value cell shrinks proportionally
 *    as the rendered digits widen. When omitted the primitive computes
 *    it from the formatted string length.
 *  - `mode`: `"absolute"` (default) or `"progress"` — passes through to
 *    `useAnimatedNumber`.
 *
 * AZ.W-METRIC-UNIFY — AnimatedDigit keeps its OWN local `placeholder: "—"`
 * default (NOT the shared `coalesceMetric` leaf). It is a distinct animated
 * single-glyph reel, not a static value-display card: it damps the FORMATTED
 * number toward its target and its empty-check fires only on `null`/`undefined`
 * (its `value` is `number | null | undefined` — there is no `""` empty string to
 * coalesce). Folding it onto the value-card core would conflate two different
 * surfaces. The keep is deliberate.
 */

export type AnimatedDigitMode = "absolute" | "progress";

export interface AnimatedDigitProps {
    value: number | null | undefined;
    format?: (v: number) => string;
    placeholder?: string;
    /**
     * Override the auto-derived digit-count. When unset the primitive
     * publishes the formatted-string length to `--digit-count` so a
     * consumer's width-clamp reads from a single source of truth.
     */
    digitCount?: number;
    /** Tag forwarded to `useAnimatedNumber`. */
    mode?: AnimatedDigitMode;
    /** Damping factor; forwarded to `useAnimatedNumber`. */
    damping?: number;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AnimatedDigitProps>(), {
    placeholder: "—",
    mode: "absolute",
});

const animated = useAnimatedNumber(() => props.value ?? null, {
    mode: props.mode,
    damping: props.damping,
});

const formatted = computed(() => {
    if (props.value === null || props.value === undefined) return props.placeholder;
    const current = animated.current.value;
    if (props.format) return props.format(current);
    return String(Math.round(current));
});

const derivedDigitCount = computed(() => {
    if (typeof props.digitCount === "number") return props.digitCount;
    // Count rendered chars excluding the decimal separator; falls back to
    // the formatted-string length so consumers that render "—" get a
    // single-glyph count rather than zero.
    const str = formatted.value;
    return Math.max(1, str.replace(/[^\d]/g, "").length || str.length);
});
</script>

<template>
    <span
        :class="cn('animated-digit tabular-nums', $props.class)"
        :style="{ '--digit-count': String(derivedDigitCount) }"
        :data-is-animating="animated.isAnimating.value ? 'true' : 'false'"
    >
        {{ formatted }}
    </span>
</template>

<style scoped>
.animated-digit {
    /* Tabular-numerals + stylistic set 1 + lining numerals — the
       speedtest hero number register lifted to primitive scope. */
    font-feature-settings: "ss01", "tnum", "lnum";
    font-variant-numeric: tabular-nums lining-nums;
}
</style>
