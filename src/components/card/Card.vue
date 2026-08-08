<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import Surface, { type SurfaceProps } from "../surface/Surface.vue";

defineOptions({ inheritAttrs: false });

export type CardSize = "sm" | "md";

/**
 * A semantic content group. Material concerns are forwarded to Surface; the card
 * owns proportion, anatomy, and — when `selected` is present — engagement.
 *
 * `material` is SEVERED (DAG, via `_shared/surface`): the card is the elevated
 * role by construction, which is Surface's own default, so the axis added a knob
 * and no capacity. `cartoon` / `grid` / `metal` / `variant` / `dataHue` /
 * `dataHueStrength` are struck: three of them wrote a class a consumer can write
 * (`cartoon-surface`, `paper-grid`), and `variant`+`dataHue`+`selected` were one
 * state wearing three props. A per-instance rim hue is `--glass-accent`, written
 * by the consumer on the element.
 */
export interface CardProps extends Omit<SurfaceProps, "material"> {
    size?: CardSize;
    /** Presence makes the card an option: role, tabindex, aria-selected, states. */
    selected?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
    size: "md",
    shadow: true,
    /* Declared so Vue's BOOLEAN CASTING does not fire. An absent `Boolean` prop
       resolves to `false`, not `undefined` — which would make every card in the
       library an option with a tab stop. A declared `undefined` default wins over
       the cast, and absence stays absence. */
    selected: undefined,
});

/* PRESENCE, not truth, is the signal: `selected` unset leaves a card inert prose;
   `selected="false"` is an unselected OPTION, which owes a role and a tab stop. */
const selectable = computed(() => props.selected !== undefined);
</script>

<template>
    <Surface
        v-bind="$attrs"
        data-slot="card"
        :tier="tier"
        :surface="surface"
        :deep="deep"
        :shadow="shadow"
        :grain="grain"
        :specular="specular"
        :as="as"
        :data-size="size"
        :data-selected="selected ? 'true' : undefined"
        :role="selectable ? 'option' : undefined"
        :tabindex="selectable ? 0 : undefined"
        :aria-selected="selectable ? (selected ? 'true' : 'false') : undefined"
        :class="cn('card', props.class)"
    >
        <slot />
    </Surface>
</template>
