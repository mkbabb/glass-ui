<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@utils";

/**
 * <DisplayHero> — composes the `text-display-{3,mega,ultra}` rungs with
 * an optional variation override (`stretch` bumps `wdth`) or layered
 * `.depth-text` (offset-shadow stack). Default `variation="wonk"` keeps
 * the per-rung axes baked into the W1 token cascade — nothing inline.
 *
 * Per-rung Fraunces `WONK / SOFT / wdth` axes already live in
 * `--font-display-{size}-variation-settings`; this primitive only
 * supplements them when `stretch` is requested (wdth +10 above default).
 */
export type DisplayHeroSize = "display-3" | "display-mega" | "display-ultra";

export type DisplayHeroVariation = "wonk" | "stretch" | "depth";

export type DisplayHeroAs = "h1" | "h2" | "h3" | "h4" | "div";

export interface DisplayHeroProps {
    /** Display rung. Maps to `text-display-{3,mega,ultra}`. */
    size?: DisplayHeroSize;
    /** Variation: `wonk` (default), `stretch` (extra wdth), `depth` (.depth-text). */
    variation?: DisplayHeroVariation;
    /** Heading element. */
    as?: DisplayHeroAs;
    /** Additional classes merged via `cn()`. */
    class?: string;
}

const props = defineProps<DisplayHeroProps>();

const tag = computed<DisplayHeroAs>(() => props.as ?? "h1");

const sizeClass = computed(() => {
    const size = props.size ?? "display-3";
    return `text-${size}`;
});

const variationClass = computed(() =>
    props.variation === "depth" ? "depth-text" : null,
);

/**
 * `stretch` widens the active rung's variation-settings by +10 on
 * `wdth` (105→115, 112→122, 115→125) while keeping `WONK` and `SOFT`
 * at the per-rung defaults from typography.css.
 */
const stretchStyle = computed<Record<string, string> | undefined>(() => {
    if (props.variation !== "stretch") return undefined;
    const size = props.size ?? "display-3";
    const stretchSettings: Record<DisplayHeroSize, string> = {
        "display-3": '"WONK" 1, "SOFT" 50, "wdth" 115',
        "display-mega": '"WONK" 1, "SOFT" 100, "wdth" 122',
        "display-ultra": '"WONK" 1, "SOFT" 100, "wdth" 125',
    };
    return {
        [`--font-${size === "display-3" ? "display-3" : size}-variation-settings`]:
            stretchSettings[size],
        "font-variation-settings": stretchSettings[size],
    };
});

const heroClass = computed(() => cn(sizeClass.value, variationClass.value, props.class));
</script>

<template>
    <component :is="tag" :class="heroClass" :style="stretchStyle">
        <slot />
    </component>
</template>
