<script setup lang="ts">
import {
    computed,
    useAttrs,
    type CSSProperties,
    type HTMLAttributes,
    type StyleValue,
} from "vue";
import { Primitive } from "reka-ui";
import { vSpecular } from "../../composables/glass";
import type { Surface as SurfaceAxis, SurfaceTier } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import type { PrimitiveProps } from "../_shared/primitive";
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";

defineOptions({ inheritAttrs: false });

export type SurfaceDecoration = SurfaceAxis;
export type SurfaceMaterial = "content" | "elevated" | "functional" | "overlay";
export type SurfaceSpecular = "off" | "subtle" | "full";

export interface SurfaceProps extends Omit<PrimitiveProps, "asChild"> {
    material?: SurfaceMaterial;
    tier?: SurfaceTier;
    surface?: SurfaceDecoration;
    deep?: boolean;
    shadow?: boolean;
    grain?: boolean;
    specular?: SurfaceSpecular;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SurfaceProps>(), {
    material: "elevated",
    surface: "glass",
    deep: false,
    shadow: false,
    grain: false,
    specular: "off",
    as: "div",
});
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { asChild: _asChild, "as-child": _asChildKebab, ...forwarded } = attrs;
    return forwarded;
});

const MATERIAL_TIERS: Record<SurfaceMaterial, SurfaceTier> = {
    content: "quiet",
    elevated: "resting",
    functional: "floating",
    overlay: "overlay",
};

const deepArmed = computed(() => props.deep && props.surface === "glass");
const effectiveTier = computed<SurfaceTier>(() =>
    deepArmed.value ? "floating" : (props.tier ?? MATERIAL_TIERS[props.material]),
);
const specularArmed = computed(
    () => props.surface === "glass" && props.specular !== "off",
);
const shadowArmed = computed(() => props.shadow && props.surface !== "veil");
const specularStyle = computed<CSSProperties | undefined>(() =>
    specularArmed.value && props.specular === "full"
        ? ({
              "--glass-specular-intensity-rest": "0.04",
              "--glass-specular-intensity-hover": "0.18",
              "--glass-specular-intensity-active": "0.26",
          } as CSSProperties)
        : undefined,
);
const hostStyle = computed<StyleValue>(() => [
    attrs.style as StyleValue,
    specularStyle.value,
]);
</script>

<template>
    <Primitive
        v-bind="forwardedAttrs"
        v-specular="specularArmed"
        :as="as"
        :data-slot="attrs['data-slot'] ?? 'surface'"
        :data-material="material"
        :data-tier="effectiveTier"
        :data-surface="surface"
        :data-deep="deepArmed || undefined"
        :data-shadow="shadowArmed || undefined"
        :data-grain="grain"
        :data-specular="specularArmed ? specular : undefined"
        :style="hostStyle"
        :class="
            cn(
                resolveSurfaceClass(effectiveTier, deepArmed),
                specularArmed && 'glass-specular-track',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
