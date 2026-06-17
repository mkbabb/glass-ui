<script setup lang="ts">
import { computed, type HTMLAttributes, type CSSProperties } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { cn } from "../../../utils";
import { useSpecularTracking } from "../../../composables/glass";
import { useStalePropWarning } from "../_shared/useStalePropWarning";
// BA.W-SURFACE-AXIS — Card's `veil` surface arm routes through the SHARED
// resolver so the `veil-surface` decoration class has ONE source (the same class
// Card emitted inline today — a refactor onto the shared seam, byte-identical).
// `cartoon` stays a Card-LOCAL superset member (NOT a {glass·veil·opaque} axis
// rung), and `opaque` is a Card TIER (the `.glass-opaque` escape on the resting
// rung), so Card composes its base tier itself and reaches the shared resolver
// only for the `veil` decoration. The `:data-surface="surface"` binding (below)
// is what the CSS seam reads — Card was already the reference axis.
import { surfaceClass } from "../_shared/useSurfaceAxis";

/**
 * The glass surface ladder. Maps 1:1 to `.glass-{tier}` in glass.css after the
 * v0.8.0 R3-spec rename:
 *
 *   wash     — lightest (~0.30α)        : inline workspace chrome, scroll-pane host
 *   quiet    — light    (~0.50α)        : ambient panels, secondary surfaces
 *   resting  — canonical (~0.65α)       : the protagonist plate (default)
 *   floating — heavy   (~0.80α)         : popover-class, login surfaces
 *   overlay  — heaviest (~0.95α + blur) : modal-on-modal, dialog over content
 *   opaque   — `--glass-level:0` escape : the solid-card opt-out (AX.W54), maps to
 *              `.glass-opaque` through the same `glass-${tier}` rung as the rest
 */
export type CardTier =
    | "wash"
    | "quiet"
    | "resting"
    | "floating"
    | "overlay"
    | "opaque";

/**
 * Surface decoration register — orthogonal to `tier`/`shadow`/`grain`.
 *
 *   glass    — the tier's plain glass rung (default)
 *   cartoon  — the Memphis-sticker decoration layered on top of the resolved
 *              tier: 2px border, offset-stamp shadow, hover-lift. Composes onto
 *              ANY tier; the retired `<CartoonCard>` was `tier="quiet" surface="cartoon"`.
 *   veil     — the text-legibility PLATE (R5-7). The wash/quiet glass fill +
 *              blur with the border AND rim/highlight STRIPPED (border:none,
 *              box-shadow:none — the boxed look reads as a "dividing line" on a
 *              text plate). An optional radial feather axis (`--veil-feather`,
 *              default none) fades the plate edges into the backdrop. Conceptually
 *              the W55 adaptive-legibility tint applied as a LOCAL plate over a
 *              busy/bright backdrop. Token-first (`--veil-*` rungs). It routes the
 *              glass material through the `--glass-*` ladder, so `--glass-level` /
 *              the W55 bright-bucket retune it in lockstep with every glass surface.
 */
export type CardSurface = "glass" | "cartoon" | "veil";

/**
 * Specular catch-light register (AX.W09) — the pointer-anchored moving lens on a
 * glass card.
 *
 *   off    — NO catch-light (default). The clean resting panel: a data/content
 *            `surface="glass"` card over any backplate reads flat — no centred
 *            white bloom, no pointer wiring. The §24 three-consumer-confirmed
 *            default for the common content-card case.
 *   subtle — the token-ladder lens: the pointer-anchored catch-light wakes on
 *            hover/active at the SUBTLE `--glass-specular-intensity-*` magnitudes.
 *            The explicit opt-in for a hero/chrome surface.
 *   full   — the brighter pre-tune rung set, for the busy-backdrop case the recipe
 *            was originally authored over (a local intensity-token override).
 */
export type CardSpecular = "off" | "subtle" | "full";

interface Props extends PrimitiveProps {
    /** Surface tier; selects one rung of the glass ladder. Default `resting`. */
    tier?: CardTier;
    /** Surface decoration register. `glass` (default) renders the tier's glass
     *  rung; `cartoon` overlays the `cartoon-surface` decoration utility (2px
     *  border, offset-stamp shadow, hover-lift); `veil` overlays the borderless,
     *  rimless `veil-surface` text-legibility plate (the wash/quiet glass fill +
     *  blur with the boxed border + rim STRIPPED, an optional `--veil-feather`
     *  radial edge fade). Orthogonal to `tier`/`shadow`/`grain` — exactly like
     *  `shadow` and `grain`; NOT a `tier` rung. */
    surface?: CardSurface;
    /** Surface drop shadow via `--shadow-card`. Off for cards nested inside cards. */
    shadow?: boolean;
    /** `::after` paper-grain overlay. Off for scroll panes (the grain conflicts
     *  with overflow:auto repaints). */
    grain?: boolean;
    /** Specular catch-light register (AX.W09). `off` (default) keeps the card
     *  CLEAN — no pointer-anchored lens, clean over any backplate (the §24
     *  three-consumer-confirmed default for a data/content card). `subtle` wakes
     *  the pointer-anchored moving catch-light at the token-ladder magnitudes (a
     *  hero/chrome opt-in); `full` runs the brighter pre-tune rung set for a busy
     *  backdrop. Only `glass` surfaces wire it; `cartoon` owns its own sticker lift. */
    specular?: CardSpecular;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    surface: "glass",
    shadow: true,
    grain: true,
    specular: "off",
    as: "div",
});

// AX.W09 — the pointer-anchored moving-specular seam, lifted to the DRY
// `useSpecularTracking` composable (was the verbatim inline `trackSpecular` copy
// shared with DockIconButton). PRM-aware + style-only.
const { specularStyle, onPointerMove } = useSpecularTracking();

// The catch-light is wired only when `specular` is opted in on a glass surface.
const specularArmed = computed(
    () => props.surface === "glass" && props.specular !== "off",
);

// `full` runs the brighter opt-in rung set for a busy backdrop by overriding the
// intensity-token cohort locally on the host (the token-first axis — the magnitude
// stays a token, not a hardcode); `subtle` rides the defaults. `off`/cartoon carry
// nothing. AX.W52 D19 — re-derived DOWN (`0.08/0.45/0.6` → `0.04/0.18/0.26`) so even
// the brightest opt-in is a contained gleam over the bounded `--glass-specular-size`
// geometry, not the prior near-opaque whole-tile white screen.
const specularTokenStyle = computed<CSSProperties>(() =>
    props.specular === "full"
        ? ({
              "--glass-specular-intensity-rest": "0.04",
              "--glass-specular-intensity-hover": "0.18",
              "--glass-specular-intensity-active": "0.26",
          } as CSSProperties)
        : {},
);

const hostStyle = computed<CSSProperties | undefined>(() =>
    specularArmed.value
        ? { ...specularTokenStyle.value, ...specularStyle.value }
        : undefined,
);

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
        :style="hostStyle"
        @pointermove="specularArmed && onPointerMove($event)"
        :class="
            cn(
                'rounded-card text-card-foreground scrollbar-hidden',
                // BB.W-CARD-PAD — the GOLDEN sqrt-φ/φ padding ladder, minted on
                // the card root. The single anchor is `--card-pad-inline`
                // (`--spacing(6)` = 24px; `data-size=sm` tightens it to
                // `--spacing(4)` = 16px) — the ONE preserved side margin every
                // other rung derives from in calc(), so a single override retunes
                // the whole ladder. The sqrt-φ (1.272) / φ (1.618) / φ² (2.618)
                // constants are EXPRESSED in the calc chains — never a flat
                // resolved-rem rebake:
                //   --card-pad-block       = inline × 1.272 (~30.5px) — the
                //       sqrt-φ-lifted top/bottom: the block axis breathes ABOVE
                //       the inline so the heading CLEARS the top edge (the prior
                //       uniform 1:1 axis hugged the heading to the border).
                //   --card-pad-section-gap = --card-pad-block — the SINGLE interior
                //       header→content breath (CardHeader zeroes its block-end so
                //       CardContent owns this gap, killing the 48px double-pad).
                //   --card-pad-footer      = block ÷ 1.618 (~18.9px) — the
                //       φ-stepped settling footer cadence.
                //   --card-pad-title-gap   = inline ÷ 2.618 (~9.2px) — the
                //       φ²-tight intra-header gap (replaces the flat gap-y-1.5).
                // CLEAN BREAK: the prior `--card-spacing` knob is GONE, no alias.
                '[--card-pad-inline:--spacing(6)] [--card-pad-block:calc(var(--card-pad-inline)*1.272)] [--card-pad-section-gap:var(--card-pad-block)] [--card-pad-footer:calc(var(--card-pad-block)/1.618)] [--card-pad-title-gap:calc(var(--card-pad-inline)/2.618)] data-[size=sm]:[--card-pad-inline:--spacing(4)]',
                // AX.W54 — `opaque` is the `--glass-level:0` escape, NOT a base
                // rung: `.glass-opaque` only sets the level scalar, so it must
                // ride a base tier class to keep the glass edge/rim/under-shadow
                // (a solid `--card` plate with a glass edge, not a bare div —
                // see glass.css §opaque-escape). It composes onto the canonical
                // `resting` rung. Every other tier maps 1:1 to its `glass-${tier}`.
                tier === 'opaque' ? 'glass-resting glass-opaque' : `glass-${tier}`,
                // AX.W09 — wire-or-omit. The pointer-anchored moving catch-light
                // (`glass-specular-track`) is emitted ONLY when `specular` is
                // opted in on a glass surface; an `off` (default) glass card does
                // NOT carry the track class, so it reads CLEAN over any backplate.
                // cartoon cards stay flat (the specular is a glass-surface fold,
                // not a sticker).
                specularArmed && 'glass-specular-track',
                surface === 'cartoon' && 'cartoon-surface',
                // R5-7 — the veil text-plate. Composes the borderless/rimless
                // `veil-surface` decoration ON TOP of the resolved tier (the
                // `@utility` wins by layer order, so its `border:none`/
                // `box-shadow:none`/`background:var(--veil-bg)` strip the rung's
                // boxed look). It routes the glass material through the
                // `--glass-*` ladder (cohesion-sanctioned); the `shadow` prop is a
                // no-op here (veil's rim is stripped by design — the box-shadow:
                // none clause below covers it). BA.W-SURFACE-AXIS — the veil
                // decoration class now comes from the SHARED resolver so its string
                // has ONE source library-wide (byte-identical to the prior inline
                // `'veil-surface'`); the resolver's base-tier prefix is dropped
                // here since Card composes `glass-${tier}` itself above.
                surface === 'veil' &&
                    surfaceClass('veil').replace(/^glass-\w+\s+/, ''),
                shadow && surface === 'glass' && 'shadow-card',
                !grain && '[&::after]:hidden',
                props.class,
            )
        "
    >
        <slot />
    </Primitive>
</template>
