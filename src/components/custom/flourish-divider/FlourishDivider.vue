<script setup lang="ts">
import { computed } from "vue";
import { cn } from "@utils";

/**
 * <FlourishDivider> — applies a `.divider-flourish-{tone}` stripe on a
 * tapered (`.divider-h-tapered`) or flat (`.divider-h`) base. The
 * `divider-flourish-*` family lives in utilities.css alongside the base
 * `divider-h` shape; both are W2 deliverables.
 *
 * Section tones (`section-0..12`) tint the stripe through
 * `--section-color-N`; `rainbow` and `gold` use the canon flourish
 * gradients.
 */
export type FlourishDividerTone =
    | "rainbow"
    | "gold"
    | "section-0"
    | "section-1"
    | "section-2"
    | "section-3"
    | "section-4"
    | "section-5"
    | "section-6"
    | "section-7"
    | "section-8"
    | "section-9"
    | "section-10"
    | "section-11"
    | "section-12";

export interface FlourishDividerProps {
    /** Stripe tone. Maps to `.divider-flourish-{tone}`. */
    tone?: FlourishDividerTone;
    /** When true (default), use the tapered base; otherwise the flat base. */
    tapered?: boolean;
    /** Additional classes merged via `cn()`. */
    class?: string;
}

const props = withDefaults(defineProps<FlourishDividerProps>(), {
    tone: "rainbow",
    tapered: true,
});

const dividerClass = computed(() =>
    cn(
        props.tapered ? "divider-h-tapered" : "divider-h",
        `divider-flourish-${props.tone}`,
        props.class,
    ),
);
</script>

<template>
    <div :class="dividerClass" role="separator" />
</template>
