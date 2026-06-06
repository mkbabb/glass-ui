<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";
import { useStalePropWarning } from "../_shared/useStalePropWarning";

/**
 * The five-tier glass surface ladder. Maps 1:1 to `.glass-{tier}` in glass.css
 * after the v0.8.0 R3-spec rename:
 *
 *   wash     — lightest (~0.30α)        : inline workspace chrome, scroll-pane host
 *   quiet    — light    (~0.50α)        : ambient panels, secondary surfaces
 *   resting  — canonical (~0.65α)       : the protagonist plate (default)
 *   floating — heavy   (~0.80α)         : popover-class, login surfaces
 *   overlay  — heaviest (~0.95α + blur) : modal-on-modal, dialog over content
 */
export type CardTier = "wash" | "quiet" | "resting" | "floating" | "overlay";

/**
 * Surface decoration register — orthogonal to `tier`/`shadow`/`grain`.
 *
 *   glass    — the tier's plain glass rung (default)
 *   cartoon  — the Memphis-sticker decoration layered on top of the resolved
 *              tier: 2px border, offset-stamp shadow, hover-lift. Composes onto
 *              ANY tier; the retired `<CartoonCard>` was `tier="quiet" surface="cartoon"`.
 */
export type CardSurface = "glass" | "cartoon";

interface Props extends PrimitiveProps {
    /** Surface tier; selects one rung of the glass ladder. Default `resting`. */
    tier?: CardTier;
    /** Surface decoration register. `glass` (default) renders the tier's glass
     *  rung; `cartoon` overlays the `cartoon-surface` decoration utility (2px
     *  border, offset-stamp shadow, hover-lift). Orthogonal to `tier`/`shadow`/
     *  `grain` — exactly like `shadow` and `grain`; NOT a `tier` rung. */
    surface?: CardSurface;
    /** Surface drop shadow via `--shadow-card`. Off for cards nested inside cards. */
    shadow?: boolean;
    /** `::after` paper-grain overlay. Off for scroll panes (the grain conflicts
     *  with overflow:auto repaints). */
    grain?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    surface: "glass",
    shadow: true,
    grain: true,
    as: "div",
});

// invariant 31 — dev-WARN on stale prop names (`variant`, `flush`). Card's
// surface is driven entirely by `tier`/`shadow`/`grain`; a swallowed
// `variant="pane"` silently falls back to `tier:"resting" + shadow:true`
// (the Qα R3 hard-drop-shadow regression). Production builds are silent.
useStalePropWarning("Card");
</script>

<template>
    <Primitive
        data-slot="card"
        :data-tier="tier"
        :data-surface="surface"
        :data-grain="grain"
        :as="as"
        :as-child="asChild"
        :class="
            cn(
                'rounded-card text-card-foreground scrollbar-hidden',
                `glass-${tier}`,
                // AV.W15 — glass cards opt into the moving specular (the
                // pointer-anchored catch-light). The consumer wires the
                // --mouse-x/--mouse-y write on hover; without it the var()
                // fallback paints a centred catch-light. cartoon cards stay
                // flat (the specular is a glass-surface fold, not a sticker).
                surface === 'glass' && 'glass-specular-track',
                surface === 'cartoon' && 'cartoon-surface',
                shadow && surface === 'glass' && 'shadow-card',
                !grain && '[&::after]:hidden',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
