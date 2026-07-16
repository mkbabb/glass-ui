<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type StyleValue } from "vue";
import type { SurfaceTier } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import Surface, { type SurfaceProps } from "../surface/Surface.vue";

defineOptions({ inheritAttrs: false });

export type CardTier = SurfaceTier;
export type CardSize = "sm" | "md";
export type CardVariant = "selection";
export type CardMetal = "gold" | "silver" | "bronze";

/** A semantic content group. Material concerns are forwarded to Surface. */
export interface CardProps extends SurfaceProps {
    size?: CardSize;
    /** Static Memphis edge treatment; it does not add command behavior. */
    cartoon?: boolean;
    /** Static engineering-grid texture. */
    grid?: boolean;
    variant?: CardVariant;
    selected?: boolean;
    metal?: CardMetal;
    dataHue?: string;
    dataHueStrength?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
    material: "elevated",
    surface: "glass",
    deep: false,
    shadow: true,
    grain: true,
    specular: "off",
    size: "md",
    cartoon: false,
    grid: false,
    selected: false,
    metal: "gold",
    as: "div",
});
const attrs = useAttrs();

const selectionStyle = computed<CSSProperties | undefined>(() => {
    if (props.variant !== "selection" || props.dataHue == null) return undefined;
    return {
        "--glass-accent": props.dataHue,
        ...(props.dataHueStrength == null
            ? {}
            : { "--glass-accent-strength": props.dataHueStrength }),
    } as CSSProperties;
});

const hostStyle = computed<StyleValue>(() => [
    attrs.style as StyleValue,
    selectionStyle.value,
]);

const metalBorderClass = computed(() =>
    props.variant === "selection" && props.selected
        ? `metal-${props.metal}-border`
        : undefined,
);
</script>

<template>
    <Surface
        v-bind="$attrs"
        data-slot="card"
        :material="material"
        :tier="tier"
        :surface="surface"
        :deep="deep"
        :shadow="shadow && !cartoon"
        :grain="grain"
        :specular="specular"
        :as="as"
        :data-size="size"
        :data-cartoon="cartoon || undefined"
        :data-grid="grid || undefined"
        :data-variant="variant"
        :data-selected="variant === 'selection' && selected ? 'true' : undefined"
        :style="hostStyle"
        :class="
            cn(
                'card rounded-card text-card-foreground scrollbar-hidden',
                cartoon && 'cartoon-surface',
                grid && 'paper-grid',
                metalBorderClass,
                props.class,
            )
        "
    >
        <slot />
    </Surface>
</template>
