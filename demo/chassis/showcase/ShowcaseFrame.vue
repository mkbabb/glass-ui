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

/* The six pads re-map onto the ladder — the PROPS are kept (a caller asking for
   `lg` is asking a design question, not a pixel question), the VALUES stop being
   off-series. `p-4`/`p-6`/`p-10` (1rem/1.5rem/2.5rem) sat on none of the six rungs
   and, being static Tailwind utilities, none of them transposed: a frame kept its
   desktop padding on a 390px phone while the page around it stepped down. */
const PAD_CLASS: Record<Pad, string> = {
    none: "p-0",
    xs: "p-(--sp-2)",
    sm: "p-(--sp-3)",
    md: "p-(--sp-4)",
    lg: "p-(--sp-5)",
    xl: "p-(--sp-6)",
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
    --showcase-caption-gap: var(--sp-3);
    padding-block-end: var(--showcase-caption-gap);
}

.showcase-frame-caption {
    margin-block-start: var(--showcase-caption-gap);
    padding-inline: var(--sp-4);
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-mono-caption);
    line-height: 1.4;
}

.showcase-frame-field {
    background: transparent;
}
</style>
