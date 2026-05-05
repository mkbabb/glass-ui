<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "@utils";

/**
 * <IconStamp> — frame primitive for Lucide icons (or any inline SVG).
 *
 * `frame="stamp"` wraps the slot in `.icon-stamp` (cream-warm tile +
 * 2px border + cartoon-sm shadow); `frame="emboss"` applies the
 * `.icon-emboss` drop-shadow filter; `frame="plain"` forwards the
 * sized container only. `accent` retints the stamp via
 * `--icon-stamp-color` and bumps `--icon-stamp-border-mix` to 35% so
 * the border picks up the section hue.
 *
 * Sizes consume the generated `.icon-{xs..mega}` utilities — both the
 * frame and the slotted icon receive the size class so a Lucide icon
 * with `:size="undefined"` fills the frame.
 */
export type IconStampSize =
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "mega";

export type IconStampFrame = "stamp" | "emboss" | "plain";

export type IconStampAccent =
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

export interface IconStampProps {
    /** Icon size. Maps to `.icon-{size}`. */
    size?: IconStampSize;
    /** Frame variant. */
    frame?: IconStampFrame;
    /** Section accent — retints the stamp via custom-property overrides. */
    accent?: IconStampAccent;
    /** Additional classes merged via `cn()`. */
    class?: string;
}

const props = withDefaults(defineProps<IconStampProps>(), {
    size: "md",
    frame: "stamp",
});

const frameClass = computed(() => {
    if (props.frame === "stamp") return "icon-stamp";
    if (props.frame === "emboss") return "icon-emboss";
    return null;
});

const sizeClass = computed(() => `icon-${props.size}`);

const stampClass = computed(() =>
    cn(frameClass.value, sizeClass.value, props.class),
);

const accentStyle = computed<CSSProperties | undefined>(() => {
    if (!props.accent) return undefined;
    const idx = props.accent.replace("section-", "");
    return {
        "--icon-stamp-color": `var(--section-color-${idx})`,
        "--icon-stamp-border-mix": "35%",
    } as CSSProperties;
});
</script>

<template>
    <span :class="stampClass" :style="accentStyle">
        <slot />
    </span>
</template>
