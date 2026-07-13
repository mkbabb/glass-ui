<script setup lang="ts">
// Surface.vue — the bare (tier × decoration) glass plate primitive
// (BI.W-SURFACE-EXTRACT).
//
// The house minted `--glass-level` (the opacity knob, AX.W54), `--glass-tint-*`
// (the legibility seam, AX.W55), and the ONE {glass·veil·opaque·clear}
// surface-decoration grammar (`_shared/useSurfaceAxis.ts` + `glass/surface-axis.css`,
// BA.W-SURFACE-AXIS / BH.W-AXIS-GRAMMAR). This is the missing COMPONENT half — the
// bare glass plate every content/floating surface is: a base glass tier (one rung of
// the `.glass-{wash,quiet,resting,floating,overlay}` ladder) × a decoration
// (glass·veil·opaque·clear via `decorationClass`), plus the `deep`-glass opt-in and
// the shadow/grain axes. NO component composes its own tier×decoration recipe any
// more — `<Surface>` (and the `decorationClass` seam it shares with the reka-portaled
// overlays) is the ONE door.
//
// `<Card>` composes THIS + its header/content/footer slots + the golden-φ padding
// ladder + the Card-LOCAL superset (`cartoon`, `grid`, `selection`, the press +
// specular gesture enrichments). `cartoon` is NOT a `Surface` member (the axis-grammar
// fence, gate-locked) — it rides Card's own `CardSurface` superset.
//
// PASSTHROUGH: `inheritAttrs: false` + `v-bind="$attrs"` LAST, so a composing parent's
// fallthrough attrs (Card's `data-slot="card"`, `data-grid`, `data-pressable`,
// `data-motion`, `:style`, the press pointer handlers) + a `v-specular` directive land
// on the ONE root element AFTER this primitive's own bindings — the plate stays ONE
// DOM node (byte-identical to Card's prior single-Primitive root).
import { computed, type HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";
import {
    decorationClass,
    type Surface as SurfaceKind,
    type SurfaceTier,
} from "../_shared/useSurfaceAxis";

defineOptions({ inheritAttrs: false });

export interface SurfaceProps extends PrimitiveProps {
    /** The base glass-ladder rung the plate paints over. Default `resting`. */
    tier?: SurfaceTier;
    /** The surface-decoration rung (the ONE shared axis): `glass` (default, the
     *  plain tier rung) · `veil` (borderless/rimless text-legibility plate) ·
     *  `opaque` (the `--glass-level:0` solid-card escape) · `clear` (the
     *  scrim-coupled maximally-translucent Apple-Clear plate). Resolved through
     *  `decorationClass()` — the ONE decoration source. */
    surface?: SurfaceKind;
    /** The BB.W-DEEP-GLASS opt-in maximal iOS-27 tier (Apple saturate-1.5/blur-16px):
     *  a `.glass-deep` decoration ON the `floating` base rung. Default `false` — a
     *  bare plate rides the calm content default. */
    deep?: boolean;
    /** Surface drop shadow via `--shadow-card`. `veil` strips it by design (the
     *  rimless plate is shadowless). Default `false` (the minimal bare plate). */
    shadow?: boolean;
    /** The `::after` paper-grain overlay. Default `false`. When off, the grain
     *  pseudo is hidden (`[&::after]:hidden`) — a scroll pane / cartoon plate opts
     *  out (the grain conflicts with overflow:auto repaints / the cast). */
    grain?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SurfaceProps>(), {
    tier: "resting",
    surface: "glass",
    deep: false,
    shadow: false,
    grain: false,
    as: "div",
});

// The base glass tier. `deep` maps to the deep DECORATION on the floating rung
// (mirroring the `.glass-opaque`/`.glass-deep` compose pattern); every other tier
// maps 1:1 to `.glass-${tier}`.
const baseTier = computed(() =>
    props.deep ? "glass-floating glass-deep" : `glass-${props.tier}`,
);
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        data-slot="surface"
        :data-tier="tier"
        :data-surface="surface"
        :data-grain="grain"
        :class="
            cn(
                baseTier,
                // The decoration class ALONE (no base-tier prefix) — the ONE source.
                decorationClass(surface),
                // The drop shadow rides glass/opaque/deep/clear; `veil` is shadowless.
                shadow && surface !== 'veil' && 'shadow-card',
                // Grain off → hide the paper-grain `::after`.
                !grain && '[&::after]:hidden',
                props.class,
            )
        "
        v-bind="$attrs"
    >
        <slot />
    </Primitive>
</template>
