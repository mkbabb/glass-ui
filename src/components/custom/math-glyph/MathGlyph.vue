<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

export type MathGlyphFont = "display" | "serif" | "mono";

export interface MathGlyphAxes {
    /** Fraunces WONK axis (0 disables wonk). */
    wonk?: 0 | 1;
    /** Fraunces SOFT axis (0–100). */
    soft?: number;
    /** Fraunces wdth axis (typical 100–125). */
    wdth?: number;
}

export interface MathGlyphProps {
    /** The character to render — e.g. `f`, `∂`, `Σ`, `∫`.
     *  The default slot, when present, overrides this prop. */
    char?: string;
    /** Font stack to read. `display` → Fraunces, `serif` → Computer Modern,
     *  `mono` → Fira Code. */
    font?: MathGlyphFont;
    /** Font weight (CSS numeric). */
    weight?: number;
    /** Fraunces variable axes (WONK / SOFT / wdth). */
    axes?: MathGlyphAxes;
    /** Class forwarded to the glyph span. */
    class?: HTMLAttributes["class"];
}

/**
 * <MathGlyph> — typography-as-icon: render a single glyph with a
 * display-font and per-axis tuning. Variable-font axes are composed via
 * inline CSS custom properties so the scoped style can keep one
 * `font-variation-settings` declaration without a class explosion.
 */
const props = withDefaults(defineProps<MathGlyphProps>(), {
    font: "display",
    weight: 400,
});

const fontStack = computed(() => {
    switch (props.font) {
        case "serif":
            return "var(--font-serif)";
        case "mono":
            return "var(--font-mono)";
        case "display":
        default:
            return "var(--font-display)";
    }
});

const styleVars = computed<CSSProperties>(() => {
    const vars: Record<string, string | number> = {
        "--font-stack": fontStack.value,
        "--mg-weight": props.weight,
    };
    const axes = props.axes;
    if (axes) {
        if (axes.wonk !== undefined) vars["--mg-wonk"] = axes.wonk;
        if (axes.soft !== undefined) vars["--mg-soft"] = axes.soft;
        if (axes.wdth !== undefined) vars["--mg-wdth"] = axes.wdth;
    }
    return vars as CSSProperties;
});

const classes = computed(() => cn("math-glyph", props.class));
</script>

<template>
    <span :class="classes" :style="styleVars">
        <slot>{{ char }}</slot>
    </span>
</template>

<style scoped>
.math-glyph {
    font-family: var(--font-stack);
    font-size: 1.35em;
    line-height: 1;
    font-style: italic;
    font-weight: var(--mg-weight, 400);
    font-variation-settings:
        "WONK" var(--mg-wonk, 1),
        "SOFT" var(--mg-soft, 0),
        "wdth" var(--mg-wdth, 100);
    display: inline-block;
    vertical-align: -0.05em;
}
</style>
