<script setup lang="ts">
import { ref, type HTMLAttributes, type CSSProperties } from "vue";
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
    /** Opt-in interactive register (AW.W24). A glass card with `hover` wakes the
     *  dormant pointer-anchored specular catch-light: it tracks the cursor across
     *  the surface (the AV.W15 moving-glass illuminate) instead of the centred
     *  var() floor. Static cards (default) keep the centred catch-light and never
     *  attach the listener. `cartoon` surfaces own their own sticker lift. */
    hover?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    surface: "glass",
    shadow: true,
    grain: true,
    hover: false,
    as: "div",
});

// AW.W24 — the dormant specular seam: the SAME pointer-write DockIconButton uses
// (--mouse-x/--mouse-y as % of the box; glass-specular-track.css paints the glow).
// Gated behind `hover` so static cards never attach the listener and keep the
// centred var() floor. Style-only (no reflow/re-render); PRM is owned CSS-side.
const specularStyle = ref<CSSProperties>({});
function trackSpecular(event: PointerEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    specularStyle.value = {
        "--mouse-x": `${x.toFixed(2)}%`,
        "--mouse-y": `${y.toFixed(2)}%`,
    } as CSSProperties;
}

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
        :style="hover ? specularStyle : undefined"
        @pointermove="hover && trackSpecular($event)"
        :class="
            cn(
                'rounded-card text-card-foreground scrollbar-hidden',
                // AW.W24 — mint the `--card-spacing` knob on the card root. The
                // three subcomponents drive their padding from it, so one
                // override retunes all of them. Default `--spacing(6)` preserves
                // the existing `p-6` rhythm at zero visual delta; `data-size=sm`
                // tightens it one step (the shadcn-2025 `data-size` card knob).
                '[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]',
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
