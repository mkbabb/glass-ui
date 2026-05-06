<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/** Named viz-basis accents resolve to their CSS custom property; any other
 *  string is treated as a raw CSS color and assigned directly. The string
 *  catch-all keeps the API permissive without giving up authoring hints. */
export type MathFormulaAccent =
    | "fourier"
    | "chebyshev"
    | "legendre"
    | "amber"
    | "green"
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {});

const VIZ_BASIS_ACCENTS = new Set<MathFormulaAccent>([
    "fourier",
    "chebyshev",
    "legendre",
    "amber",
    "green",
]);

export type MathFormulaDisplayMode = "inline" | "block";

export interface MathFormulaProps {
    /** Block applies `.formula-block`; inline applies `.math-inline-pill`. */
    displayMode?: MathFormulaDisplayMode;
    /** A viz-basis hue name (`fourier`/`chebyshev`/`legendre`/`amber`/`green`)
     *  resolves to `var(--viz-NAME)`; any other string is forwarded verbatim
     *  as a CSS color. The chosen value drives `--accent-color`, which the
     *  `.formula-block` left rule reads. */
    accent?: MathFormulaAccent;
    /** Class forwarded to the root surface. */
    class?: HTMLAttributes["class"];
}

/**
 * <MathFormula> — formula container with optional accent-tinted left rule.
 *
 * In block mode the slot renders inside a `.formula-block` (cream-warm
 * surface + accent-coloured rule). In inline mode the slot renders inside
 * `.math-inline-pill`. An optional `#caption` slot renders a `.text-caption`
 * italic line below the block.
 */
const props = withDefaults(defineProps<MathFormulaProps>(), {
    displayMode: "block",
});

const surfaceClasses = computed(() =>
    cn(
        props.displayMode === "inline" ? "math-inline-pill" : "formula-block",
        props.class,
    ),
);

const accentStyle = computed<CSSProperties>(() => {
    if (!props.accent) return {};
    const value = VIZ_BASIS_ACCENTS.has(props.accent)
        ? `var(--viz-${props.accent})`
        : props.accent;
    return { "--accent-color": value } as CSSProperties;
});
</script>

<template>
    <figure class="math-formula">
        <div :class="surfaceClasses" :style="accentStyle">
            <slot />
        </div>
        <figcaption v-if="$slots.caption" class="text-caption math-formula-caption">
            <slot name="caption" />
        </figcaption>
    </figure>
</template>

<style scoped>
.math-formula {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
}

.math-formula-caption {
    color: var(--muted-foreground);
    text-align: center;
}

.formula-block {
    display: grid;
    place-items: center;
    padding: var(--space-phi-4) var(--space-phi-3);
    background: var(--cream-warm);
    border-radius: var(--radius-2xl);
    border-left: 4px solid var(--accent-color);
    box-shadow: var(--shadow-cartoon-sm);
    font-variant-numeric: tabular-nums;
    line-height: var(--leading-prose);
}

@media (prefers-contrast: more) {
    .formula-block {
        border-left-width: 6px;
        border-left-color: var(--foreground);
    }
}
</style>
