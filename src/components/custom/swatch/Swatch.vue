<!-- @mkbabb/glass-ui — see docs/tranches/G/blob/SPEC.md -->
<script setup lang="ts">
import { computed } from "vue";

import { useWatercolorBlob } from "../../../composables/blob/useWatercolorBlob";
import { cn } from "../../../utils/cn";

export interface SwatchProps {
    /** CSS color string for the swatch fill. */
    color: string;
    /** Size in token units. Default "md". */
    size?: "sm" | "md" | "lg" | "xl";
    /** Variant — controls the visual recipe. Default "solid". */
    variant?: "solid" | "cartoon" | "watercolor";
    /** Animate watercolor variant; only meaningful for variant="watercolor". Default true. */
    animated?: boolean;
    /** PRNG seed for watercolor variant. Default 1618. */
    seed?: number;
}

const props = withDefaults(defineProps<SwatchProps>(), {
    size: "md",
    variant: "solid",
    animated: true,
    seed: 1618,
});

const sizeMap = {
    sm: "1.5rem",
    md: "2rem",
    lg: "3rem",
    xl: "4rem",
} as const;

const sizeValue = computed(() => sizeMap[props.size]);
const variantClass = computed(() => `swatch--${props.variant}`);

// Watercolor border-radius oscillator. Only subscribe when variant matches.
const watercolorRadius =
    props.variant === "watercolor"
        ? useWatercolorBlob({ seed: props.seed, intensity: 1 })
        : null;

const styleVars = computed(() => ({
    "--swatch-color": props.color,
    "--swatch-size": sizeValue.value,
    ...(watercolorRadius?.value ? { borderRadius: watercolorRadius.value } : {}),
}));
</script>

<template>
    <div :class="cn('swatch', variantClass)" :style="styleVars" />
</template>

<style scoped>
.swatch {
    width: var(--swatch-size);
    height: var(--swatch-size);
    background: var(--swatch-color);
    flex-shrink: 0;
    transition:
        transform var(--duration-fast) var(--ease-apple-spring),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.swatch--solid {
    border-radius: var(--radius-md);
    border: 1px solid color-mix(in srgb, var(--swatch-color) 40%, var(--foreground));
}

.swatch--cartoon {
    border-radius: var(--radius-md);
    border: 2px solid color-mix(in srgb, var(--swatch-color) 40%, var(--foreground));
    box-shadow: var(--shadow-cartoon-sm);
}

.swatch--watercolor {
    border: none;
    filter: url(#watercolor);
}

@media (prefers-reduced-transparency: reduce) {
    .swatch--watercolor {
        filter: none;
        border-radius: 50%;
    }
}
</style>
