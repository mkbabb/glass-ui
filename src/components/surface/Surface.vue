<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import type { Surface as SurfaceAxis, SurfaceTier } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import type { PrimitiveProps } from "../_shared/primitive";
import { surfaceClass } from "../_shared/surface/resolve";

defineOptions({ inheritAttrs: false });

export type SurfaceDecoration = SurfaceAxis;

/**
 * The plate primitive. ONE prominence axis, three knobs, four emitted
 * attributes.
 *
 * `material` / `SurfaceMaterial` / `MATERIAL_TIERS` are DELETED, not aliased: a
 * four-member bijection onto four of the five tiers is `tier` under a second
 * name, `wash` was unreachable through it, and `tier` silently beat it anyway.
 * Zero external consumers passed it — censused across six sibling repos.
 *
 * `shadow` / `grain` / `specular` are deleted with the three silent JS gates
 * that armed them. On an opaque plate the element-level `backdrop-filter: none`
 * already wins by cascade; a hidden gate that no-ops a prop on a fourth prop's
 * value is a rule the cascade was already keeping. `shadow` survives where it
 * has a real grammar — as CARD's own prop, stamping card's own `data-shadow`.
 *
 * The FOURTH such gate went with them: `deep` used to be armed only when
 * `surface === "glass"`, which is the same rule the cascade was already keeping
 * from the other side. `[data-surface="opaque"]` sets `--glass-level: 0` (so the
 * deep composition resolves `blur(0)`) AND `backdrop-filter: none` at the
 * element; `[data-surface="veil"]` paints its own `--veil-clarity`, derived from
 * the quiet radius, which never reads the bridged rung tokens. Both withhold the
 * depth in PAINT, so `deep` is forwarded honestly and nothing arms it in script.
 */
export interface SurfaceProps extends Omit<PrimitiveProps, "asChild"> {
    /** The ONE prominence axis: wash | quiet | resting | floating | overlay. */
    tier?: SurfaceTier;
    /** Decoration, orthogonal to prominence: glass | veil | opaque. */
    surface?: SurfaceDecoration;
    /** Thickness ON the resolved tier — never a tier jump. */
    deep?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SurfaceProps>(), {
    tier: "resting",
    surface: "glass",
    deep: false,
    as: "div",
});
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { asChild: _asChild, "as-child": _asChildKebab, ...forwarded } = attrs;
    return forwarded;
});
</script>

<template>
    <Primitive
        v-bind="forwardedAttrs"
        :as="as"
        :data-slot="attrs['data-slot'] ?? 'surface'"
        :data-surface="surface"
        :class="cn(surfaceClass(tier, deep), props.class)"
    >
        <slot />
    </Primitive>
</template>
