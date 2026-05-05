<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Bookmark, Crown } from "lucide-vue-next";
import { cn } from "../../../utils/cn";

/**
 * <TierBadge> — small tier indicator combining a Crown / Bookmark glyph
 * with a tier-specific color. `featured` / `gold` / `platinum` use the
 * crown; `saved` / `bronze` / `silver` use the bookmark. The tier color
 * is exposed both as the icon `color` and as a `--tier-color` custom
 * property on the wrapper so consumer styles can echo it.
 */
export type TierBadgeTier =
    | "featured"
    | "saved"
    | "bronze"
    | "silver"
    | "gold"
    | "platinum";

export type TierBadgeSize = "sm" | "md" | "lg";

export interface TierBadgeProps {
    tier: TierBadgeTier;
    size?: TierBadgeSize;
    class?: string;
}

const props = withDefaults(defineProps<TierBadgeProps>(), {
    size: "md",
});

defineOptions({ name: "TierBadge" });

const useCrown = computed(
    () =>
        props.tier === "featured" ||
        props.tier === "gold" ||
        props.tier === "platinum",
);

const tierColor = computed(() => {
    switch (props.tier) {
        case "featured":
            return "var(--tier-featured)";
        case "saved":
            return "var(--tier-saved)";
        case "bronze":
            return "var(--gold-dark)";
        case "silver":
            return "color-mix(in srgb, var(--neutral-4) 60%, white)";
        case "gold":
            return "var(--gold)";
        case "platinum":
            return "color-mix(in srgb, var(--neutral-3) 90%, white)";
    }
    return "currentColor";
});

const sizeClass = computed(() => `icon-${props.size}`);

const wrapperStyle = computed<CSSProperties>(() => ({
    "--tier-color": tierColor.value,
    color: "var(--tier-color)",
}));
</script>

<template>
    <span
        :class="cn('tier-badge inline-flex items-center', sizeClass, props.class)"
        :style="wrapperStyle"
        :aria-label="`${tier} tier`"
        role="img"
    >
        <Crown v-if="useCrown" :class="sizeClass" aria-hidden="true" />
        <Bookmark v-else :class="sizeClass" aria-hidden="true" />
    </span>
</template>
