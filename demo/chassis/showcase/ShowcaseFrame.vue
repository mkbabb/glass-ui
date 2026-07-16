<script setup lang="ts">
import { computed, useSlots, type HTMLAttributes } from "vue";
import { Surface } from "@glass/components/surface";
import { cn } from "@glass/components/_shared/class-names";

type Pad = "none" | "xs" | "sm" | "md" | "lg" | "xl";

interface ShowcaseFrameProps {
    pad?: Pad;
    tier?: "resting" | "quiet" | "field";
    grain?: boolean;
    caption?: string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ShowcaseFrameProps>(), {
    pad: "md",
    tier: "resting",
    grain: false,
});
const slots = useSlots();

const PAD_CLASS: Record<Pad, string> = {
    none: "p-0",
    xs: "p-3",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
    xl: "p-10",
};

const padClass = computed(() => PAD_CLASS[props.pad]);
const plate = computed(() => (props.tier === "field" ? "div" : Surface));
const surfaceProps = computed(() =>
    props.tier === "field"
        ? {}
        : {
              material: "content" as const,
              tier: props.tier,
              surface: props.tier === "quiet" ? ("veil" as const) : ("opaque" as const),
              shadow: props.tier === "resting",
              grain: props.grain,
          },
);
const hasCaption = computed(() => Boolean(props.caption || slots.caption));
</script>

<template>
    <component
        :is="plate"
        v-bind="surfaceProps"
        :class="
            cn(
                'min-w-0 rounded-card',
                tier === 'field' && 'showcase-frame-field',
                hasCaption ? 'showcase-frame--captioned' : padClass,
                tier === 'field' && grain && 'paper-grain-overlay',
                props.class,
            )
        "
    >
        <div v-if="hasCaption" :class="padClass"><slot /></div>
        <slot v-else />

        <div v-if="hasCaption" class="showcase-frame-caption">
            <slot name="caption">{{ caption }}</slot>
        </div>
    </component>
</template>

<style scoped>
.showcase-frame--captioned {
    --showcase-caption-gap: 0.75rem;
    padding-block-end: var(--showcase-caption-gap);
}

.showcase-frame-caption {
    margin-block-start: var(--showcase-caption-gap);
    padding-inline: 1.25rem;
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-mono-caption);
    line-height: 1.4;
}

.showcase-frame-field {
    background: transparent;
}
</style>
