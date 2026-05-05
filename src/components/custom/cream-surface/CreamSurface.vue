<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@utils";

/**
 * <CreamSurface> — exposes the `.cream-surface` recipe (cards.css) as a
 * named noun. The cream tier is canon's warm-cream identity surfaced as
 * a consumable surface tier; `tone="warm" | "cool"` swaps the
 * background to `--cream-warm` / `--cream-cool` via `[data-tone]`.
 *
 * Padding is shipped by `.cream-surface` itself (`var(--space-phi-3)`);
 * the `padded` prop is a hint when consumers want to layer additional
 * `p-phi-3` on top — most callers leave it `false` since the recipe
 * already pads.
 */
export interface CreamSurfaceProps {
    /** Optional warm/cool tonal override. Maps to `[data-tone]` on the surface. */
    tone?: "warm" | "cool";
    /** Layer an extra `p-phi-3` rung on top of the recipe's intrinsic padding. */
    padded?: boolean;
    /** Additional classes merged via `cn()`. */
    class?: string;
}

const props = defineProps<CreamSurfaceProps>();

const surfaceClass = computed(() =>
    cn("cream-surface", props.padded && "p-phi-3", props.class),
);
</script>

<template>
    <div :class="surfaceClass" :data-tone="tone">
        <slot name="header" />
        <slot />
    </div>
</template>
