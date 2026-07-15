<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes, type CSSProperties } from "vue";
import type { PrimitiveProps } from "reka-ui";
import { cn } from "../_shared/class-names";
import { vSpecular } from "../../composables/glass";
import { useLiquidPress } from "../../composables/motion/useLiquidPress";
import { useStalePropWarning } from "../_shared/useStalePropWarning";
// BI.W-SURFACE-EXTRACT — Card composes the bare (tier × decoration) plate
// `<Surface>` (the extracted primitive) + its header/content/footer slots + the
// golden-φ padding ladder + the Card-LOCAL superset (`cartoon`, `grid`, `selection`,
// the press/specular gesture enrichments). `<Surface>` owns the glass tier ×
// {glass·veil·opaque·clear} decoration + deep/shadow/grain; NO component-private
// surface recipe survives. `cartoon` stays a Card-LOCAL superset member (NOT a
// {glass·veil·opaque} axis rung, the grammar fence), and `opaque`/`deep` LEFT the
// tier union onto the surface axis / a boolean (`<Card surface="opaque">` /
// `<Card deep>` — clean break, no `tier="opaque"` alias). The `:data-surface`
// binding is what the CSS seam reads.
import Surface from "../surface/Surface.vue";
import type { Surface as SurfaceKind } from "../_shared/useSurfaceAxis";
// BH.W-MOTION-AXIS — the ONE motion-weight axis (the four-boolean scatter collapse).
// Card's `pressable` boolean dies onto `motion`: the press CAPABILITY now derives
// from interactivity (an interactive `as`/`href`/`role` root) AND `motion !== "off"`
// — a bare static plate never presses because it has no interaction to enrich.
import type { Motion } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";

/**
 * The glass surface ladder — the 5-rung base tier (BI.W-SURFACE-EXTRACT collapsed
 * `opaque`/`deep` OUT of this union). Maps 1:1 to `.glass-{tier}` in glass.css and is
 * now value-identical to the `SurfaceTier` grammar vocabulary:
 *
 *   wash     — lightest (~0.30α)        : inline workspace chrome, scroll-pane host
 *   quiet    — light    (~0.50α)        : ambient panels, secondary surfaces
 *   resting  — canonical (~0.65α)       : the protagonist plate (default)
 *   floating — heavy   (~0.80α)         : popover-class, login surfaces
 *   overlay  — heaviest (~0.95α + blur) : modal-on-modal, dialog over content
 *
 * The solid-card escape is now `<Card surface="opaque">` (the `--glass-level:0`
 * decoration on the surface axis, not a tier), and the maximal iOS-27 deep-glass
 * register is `<Card deep>` (the boolean — `.glass-floating glass-deep`, BB.W-DEEP-GLASS).
 * Both are clean breaks: no `tier="opaque"` / `tier="deep"` alias (MIGRATION row).
 */
export type CardTier =
    | "wash"
    | "quiet"
    | "resting"
    | "floating"
    | "overlay";

/**
 * Surface decoration register — the SHARED {glass·veil·opaque·clear} axis (the
 * `Surface` grammar) PLUS Card's local `cartoon` superset (BI.W-SURFACE-EXTRACT:
 * `CardSurface = Surface | "cartoon"`; `opaque`/`clear` joined the union as the
 * `tier="opaque"` collapse landing + the clear register). Orthogonal to
 * `tier`/`shadow`/`grain`.
 *
 *   glass    — the tier's plain glass rung (default)
 *   veil     — the text-legibility PLATE (R5-7). The wash/quiet glass fill + blur
 *              with the border AND rim/highlight STRIPPED. An optional radial
 *              feather axis (`--veil-feather`, default none). Routes the glass
 *              material through the `--glass-*` ladder, so `--glass-level` / the
 *              W55 bright-bucket retune it in lockstep with every glass surface.
 *   opaque   — the `--glass-level:0` solid-card escape (the prior `tier="opaque"`
 *              rung's clean-break successor): a solid `--card` plate through the ONE
 *              level knob, the tint axis zeroed.
 *   clear    — the scrim-coupled maximally-translucent Apple-Clear plate
 *              (BE.W-CLEAR-VARIANT).
 *   cartoon  — the Card-LOCAL Memphis-sticker decoration (NOT a `Surface` axis
 *              member — the grammar fence): 2px border, offset-stamp shadow,
 *              hover-lift. Composes onto ANY tier over the glass base.
 */
export type CardSurface = SurfaceKind | "cartoon";

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

/**
 * Decoration variant — the ONE new Atlas component (BC.W-SELECTION-CARD, the I5
 * selection card). Default UNSET: a bare `<Card>` is byte-identical to HEAD; the
 * variant is additive default-OFF (the no-op floor). `selection` binds
 * `:data-variant="selection"` on the root and ROUTES the chromatic-rim (A-2,
 * `--glass-accent`) + selected metal-shimmer (A-3, `.metal-*-border`) decoration
 * through the SHARED BUILT seams — it mints NO new sub-system. The shape mirrors
 * the `surface` axis exactly: a data-attr the CSS seam reads, ORTHOGONAL to
 * `tier`/`surface`/`motion` (a `variant="selection" surface="glass"
 * tier="resting" as="button"` card is valid). The hue is a CONSUMER value
 * (`data-hue`/`data-hue-strength` per-instance); NO consumer hue enters a token.
 */
export type CardVariant = "selection";

/** The earned metal for a SELECTED selection-card (gold default — BA.W-PHASE-PALETTE
 *  "gold is earned" for the chosen item). Composes the BUILT `.metal-{name}-border`
 *  utility; NO forked keyframe, NO baked metal color. */
export type CardMetal = "gold" | "silver" | "bronze";

interface Props extends PrimitiveProps {
    /** Surface tier; selects one rung of the glass ladder. Default `resting`. */
    tier?: CardTier;
    /** Surface decoration register (the shared `Surface` axis + Card's `cartoon`
     *  superset). `glass` (default) renders the tier's glass rung; `veil` overlays
     *  the borderless/rimless text-legibility plate; `opaque` is the
     *  `--glass-level:0` solid-card escape (the `tier="opaque"` collapse landing);
     *  `clear` the scrim-coupled Apple-Clear plate; `cartoon` overlays the
     *  Card-LOCAL Memphis-sticker decoration. Orthogonal to `tier`/`shadow`/`grain`. */
    surface?: CardSurface;
    /** BB.W-DEEP-GLASS — the maximal iOS-27 deep-glass opt-in (Apple
     *  saturate-1.5/blur-16px): the `.glass-deep` decoration on the `floating` base
     *  rung. Default `false` (the calm content default, byte-unchanged). The
     *  clean-break successor of the retired `tier="deep"` rung. */
    deep?: boolean;
    /** Surface drop shadow via `--shadow-card`. Off for cards nested inside cards. */
    shadow?: boolean;
    /** `::after` paper-grain overlay. Off for scroll panes (the grain conflicts
     *  with overflow:auto repaints). */
    grain?: boolean;
    /** BB.W-PAPER-GRID-TEXTURE — the GEOMETRIC paper register: a `::after`
     *  blueprint/graph-paper grid felt THROUGH the card interior (the math/grid
     *  brand pillar, read through the plate rather than only in the page
     *  margin). Default **OFF** — a bare card is byte-identical to HEAD; a
     *  document-register card opts in. ORTHOGONAL to `grain` (organic) — a card
     *  may carry BOTH the turbulence grain and the geometric grid. The register
     *  doctrine (paper-register cards opt in, instrument-glass surfaces do NOT)
     *  is a CONSUMER choice the default-OFF honors by construction. */
    grid?: boolean;
    /** Specular catch-light register (AX.W09). `off` (default) keeps the card
     *  CLEAN — no pointer-anchored lens, clean over any backplate (the §24
     *  three-consumer-confirmed default for a data/content card). `subtle` wakes
     *  the pointer-anchored moving catch-light at the token-ladder magnitudes (a
     *  hero/chrome opt-in); `full` runs the brighter pre-tune rung set for a busy
     *  backdrop. Only `glass` surfaces wire it; `cartoon` owns its own sticker lift. */
    specular?: CardSpecular;
    /** BH.W-MOTION-AXIS — the ONE motion-weight axis (the `pressable` boolean's
     *  clean-break successor). `full` (default) — the FULL liquid register, gesture
     *  enrichments armed (zero-delta at default). `reduced` — the JS press physics
     *  degrade to the `.tap-squish` `:active` CSS floor (the SAME state PRM produces).
     *  `off` — the press unbinds AND `--motion-weight: 0` zeroes the cartoon channels;
     *  the click still selects. PRM forces `full → reduced` regardless (a11y absolute).
     *
     *  The press CAPABILITY derives from INTERACTIVITY, not this axis: a Card presses
     *  IFF it renders interactive (`as="button"`/`as="a"`/`href`/`role="button"` on the
     *  root) AND `motion !== "off"`. A bare static `<Card>` never presses because it has
     *  no interaction to enrich — the "static plate never presses" fence holds by
     *  DERIVATION, not by a default. The press is `useLiquidPress` (the interruptible
     *  coupled spring-press — Card is the SECOND `useSpringPress` binary, Button first),
     *  compositor-only (`scale` + `--card-press-t`); the `.glass-press` CSS `:active`
     *  scale is the no-JS / SSR floor. */
    motion?: Motion;
    /** BC.W-SELECTION-CARD — the selection decoration axis (the ONE new Atlas
     *  component). `selection` ROUTES the per-instance data-hue rim (A-2) +
     *  the selected metal-shimmer border (A-3) through the BUILT seams; default
     *  UNSET (a bare Card is byte-identical to HEAD). ORTHOGONAL to
     *  `tier`/`surface`/`motion`. */
    variant?: CardVariant;
    /** BC.W-SELECTION-CARD — the chosen state of a `variant="selection"` card.
     *  When `true` the card composes the earned `.metal-${metal}-border` swept
     *  rim + lifts the accent-strength toward `--selection-accent-strength-selected`
     *  (rim-not-fill — the plate stays warm-cream translucent). The consumer wires
     *  the matching `aria-selected`/`aria-checked` role contract on the card. */
    selected?: boolean;
    /** BC.W-SELECTION-CARD — the metal of the SELECTED-state swept rim. `gold`
     *  (default) is earned for the chosen item; `silver`/`bronze` are the other
     *  two BUILT `.metal-*-border` quads. Only read when `variant="selection"` +
     *  `selected`. */
    metal?: CardMetal;
    /** BC.W-SELECTION-CARD — the per-instance data hue (a complete `<color>`) a
     *  `variant="selection"` card tints its RIM + catch-light glint toward (the
     *  A-2 `--glass-accent` consumer). The hue NEVER tints the plate background
     *  (the distinct-axis fence); unset → the neutral `transparent` no-op floor. */
    dataHue?: string;
    /** BC.W-SELECTION-CARD — the bounded accent strength override (a `<percentage>`,
     *  e.g. `"20%"`). Unset → the calm `--selection-accent-strength` default
     *  (≤ the W-GLASS-ACCENT rim ceiling). Bounded — a whisper at the rim, never a
     *  flooded plate. */
    dataHueStrength?: string;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tier: "resting",
    surface: "glass",
    deep: false,
    shadow: true,
    grain: true,
    grid: false,
    specular: "off",
    metal: "gold",
    as: "div",
});

// BI.W-SURFACE-EXTRACT — the plate decoration passed to `<Surface>`. `cartoon` is
// Card-LOCAL (NOT a `Surface` member), so the plate rides the plain `glass` base
// and the `.cartoon-surface` decoration is composed in Card's class below; the
// REAL `surface` value still flows to `:data-surface` (the CSS seam reads
// `[data-surface="cartoon"]` to withhold the glass-specular/paper-texture rules).
const surfaceForPlate = computed<SurfaceKind>(() =>
    props.surface === "cartoon" ? "glass" : props.surface,
);
// The drop shadow rides glass/opaque/deep/clear; `veil` is shadowless (handled in
// `<Surface>`), and `cartoon` owns its own offset-stamp — so withhold `--shadow-card`
// there (byte-identical to the prior `shadow && surface === 'glass'` gate: opaque/deep
// were `surface="glass"` TIERS then, so they kept the shadow; veil/cartoon dropped it).
const plateShadow = computed(() => props.shadow && props.surface !== "cartoon");

// BH.W-MOTION-AXIS — the resolved motion state (PRM-clamped; `armed` gates the JS
// enrichment, `dataMotion`/`hostStyle` are the zero-delta-at-`full` binds).
const motionAxis = useMotionAxis(() => props.motion);

// BH.W-MOTION-AXIS — the press CAPABILITY derives from INTERACTIVITY, not the axis.
// A Card presses IFF it renders interactive (an explicit `as`/`href`/`role` signal —
// NEVER listener-sniffing, so an analytics `@click` on a static card does not make it
// press) AND `motion !== "off"`. `href`/`role` fall through Card's transparent
// `$attrs` (Card has no `inheritAttrs:false`), so they are read off `useAttrs()`.
const attrs = useAttrs();
const isInteractive = computed(() => {
    const asTag = props.as;
    if (asTag === "button" || asTag === "a") return true;
    if (attrs.href != null) return true;
    const role = attrs.role;
    if (role === "button" || role === "link") return true;
    return false;
});
const pressable = computed(
    () => isInteractive.value && motionAxis.resolved.value !== "off",
);

// BB.W-LIQUIDHOVER — the pointer-anchored moving-specular gleam routes through the
// SAME tier-root seam as the interactive controls (the `v-specular` directive wrapping
// the ONE position-write core), but Card is NOT inherently interactive — the gleam is
// an explicit `specular` prop affordance, NOT an always-on control register. So Card
// keeps its CONDITIONAL opt-in: `v-specular="specularArmed"` arms the directive only
// when `specular` is opted in on a glass surface (the directive's reactive value flips
// the listener on/off). No hand-composed `@pointermove`/`useSpecularTracking` triplet
// survives — ONE position-write source, ONE delivery, the gated case stays gated.

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

// BB.W-PRESS-UNIFY — the interactive press register (consumer #2). Wired ONLY when
// `pressable` (a tappable list-card); a static content plate never presses. The driver
// is the SAME `useLiquidPress` Button composes — the interruptible coupled spring-press
// leg reads). BG.W-ANIMATION-CONGRUENCE (A9 one-spring-family): the press clock is the
// SHARED `press` SPRING_PRESETS row (`useSpringPress`'s default = `springPreset("press")`
// = {0.2, 0.8}) — the OFF-table {0.28, 0.78} literal is RETIRED so Card presses on the
// EXACT clock Button does (one spring family, one source, no per-surface spring fork).
// The per-surface REGISTER stays the *amplitude* (a card is a larger surface, so the
// shrink is a touch shallower — 0.02 → 0.98 at full press — via `shrinkDepth`, NOT a
// second spring clock). PRM-instant + compositor-only by construction (inherited from
// `useLiquidPress`). The driver is ALWAYS constructed (a composable cannot mount
// conditionally), but the handlers + the press `:style` only reach the host when
// `pressable` — the rest-state press value is 0 so an un-pressable card is byte-
// identical to HEAD (no `scale`, no `--card-press-t` paint).
const press = useLiquidPress({
    pressVar: "--card-press-t",
    shrinkDepth: 0.02,
    maxStretch: 1.03,
});

// BC.W-SELECTION-CARD — the per-instance chromatic-rim ACCENT write (A-2 consume).
// A `variant="selection"` card SETS `--glass-accent`/`--glass-accent-strength` on the
// host off the consumer's `data-hue`/`data-hue-strength`, so the EXISTING rim + border
// + catch-light glint (glass/rim.css + glass/material.css — the BUILT seams) tint toward
// the data hue through the ONE landed `color-mix`. This authors NO new rim recipe — it
// is the second per-instance `--glass-accent` consumer the BB.W-GLASS-ACCENT ≥2-bar
// names. When `data-hue` is UNSET the host writes NOTHING (the neutral `transparent`/
// `0%` @property defaults stand → byte-identical to a bare Card, the A-2 no-op floor).
// The strength leg ROUTES through `cards.css`'s `[data-variant="selection"]` token (the
// calm unselected ~16% → selected ~28% lift) — the host write only sets the HUE +
// optionally an explicit per-instance strength override; selection NEVER writes
// `--glass-tint-source`/`--glass-tint-strength` (the distinct-axis fence) and NEVER
// paints a `--foreground`/brand opaque plate fill (the rim-not-fill discipline lives in
// cards.css). The accent strength default + the selected lift are CSS tokens so the
// rim-not-fill bound is gate-checkable in source, not buried in a JS literal.
const selectionStyle = computed<CSSProperties>(() => {
    if (props.variant !== "selection" || props.dataHue == null) return {};
    return {
        "--glass-accent": props.dataHue,
        ...(props.dataHueStrength != null
            ? { "--glass-accent-strength": props.dataHueStrength }
            : {}),
    } as CSSProperties;
});

// BC.W-SELECTION-CARD — the SELECTED-state metal-shimmer BORDER class (A-3 consume).
// A `variant="selection"` card that is `:selected` composes the EARNED
// `.metal-${metal}-border` swept rim (gold default, BA.W-PHASE-PALETTE "gold is
// earned"), the BUILT utility — NO forked keyframe, NO baked metal color
// (utilities/metal.css is the single source). UNSELECTED selection cards carry NO
// metal border (the chromatic `--glass-accent` rim alone). PRM-static is inherited
// from the utility (the sweep gated by no-preference).
const metalBorderClass = computed<string | false>(() =>
    props.variant === "selection" && props.selected
        ? `metal-${props.metal}-border`
        : false,
);

// The host style carries the `full`-rung specular intensity-token override (the
// position write is the directive's job now — a direct `el.style` host write) MERGED
// with the selection accent write + the press squish/drive when `pressable`. The press
// `:style` overrides the CSS `.glass-press:active` scale floor while engaged (the
// single-source press); a non-pressable bare card carries none of it.
const hostStyle = computed<CSSProperties | undefined>(() => {
    const specular = specularArmed.value ? specularTokenStyle.value : undefined;
    const accent = selectionStyle.value;
    // BH.W-MOTION-AXIS — the `--motion-weight: 0` off-write (undefined at full/reduced,
    // the zero-delta no-op floor) merges into the host style beside specular/accent.
    const motion = motionAxis.hostStyle.value as CSSProperties | undefined;
    const base =
        specular || Object.keys(accent).length || motion
            ? { ...(specular ?? {}), ...accent, ...(motion ?? {}) }
            : undefined;
    if (!pressable.value) return base;
    return { ...(base ?? {}), ...press.pressStyle.value };
});

// invariant 31 — dev-WARN on stale prop names. BC.W-SELECTION-CARD promotes
// `variant` to a LIVE declared prop (`variant="selection"`, the I5 selection card),
// so a passed `variant=` is now EXTRACTED as the prop and no longer falls through to
// `$attrs` — `variant` is dropped from Card's watched stale-name list (the swallowed-
// prop WARN no longer fires on the live `selection` value). `flush` stays watched (it
// was never a glass-ui prop). The other axes (`tier`/`surface`/`shadow`/`grain`) drive
// the rest of the surface; production builds are silent.
useStalePropWarning("Card", ["flush"]);
</script>

<!-- BI.W-SURFACE-EXTRACT — Card composes the extracted bare plate `<Surface>`.
     `<Surface>` owns the glass tier × {glass·veil·opaque·clear} decoration +
     deep/shadow/grain (through the ONE `decorationClass` seam); Card threads its
     local chrome (padding ladder, specular, cartoon, grid, press, selection) as
     fallthrough class/attrs/directive onto the ONE root. `cartoon` rides the plain
     glass base (`surfaceForPlate`) with the REAL `surface` on `:data-surface` (the
     CSS seam reads `[data-surface="cartoon"]` to withhold the glass rules).
     NOTE: this comment lives OUTSIDE <template> — an in-template root comment turns
     the render into a fragment (comment + element), breaking single-root attr
     inheritance + `wrapper.element` in the unit harness. -->
<template>
    <Surface
        v-specular="specularArmed"
        data-slot="card"
        :tier="tier"
        :surface="surfaceForPlate"
        :deep="deep"
        :shadow="plateShadow"
        :grain="grain"
        :data-surface="surface"
        :data-grid="grid"
        :data-pressable="pressable || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :data-variant="variant || undefined"
        :data-selected="
            variant === 'selection' && selected ? 'true' : undefined
        "
        :as="as"
        :as-child="asChild"
        :style="hostStyle"
        @pointerdown="pressable ? press.press() : undefined"
        @pointerup="pressable ? press.release() : undefined"
        @pointercancel="pressable ? press.release() : undefined"
        @pointerleave="pressable ? press.release() : undefined"
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
                // BI.W-SURFACE-EXTRACT — the glass tier × {glass·veil·opaque·clear}
                // decoration + `deep`/`shadow`/`grain` are `<Surface>`'s (composed on
                // the ONE root above via the `:tier`/`:surface`/`:deep`/`:shadow`/`:grain`
                // props). Card threads ONLY its LOCAL chrome below.
                // AX.W09 — wire-or-omit. The pointer-anchored moving catch-light
                // (`glass-specular-track`) is emitted ONLY when `specular` is
                // opted in on a glass surface; an `off` (default) glass card does
                // NOT carry the track class, so it reads CLEAN over any backplate.
                // cartoon cards stay flat (the specular is a glass-surface fold,
                // not a sticker).
                specularArmed && 'glass-specular-track',
                // The Card-LOCAL cartoon Memphis-sticker decoration (NOT a `Surface`
                // axis member — the grammar fence). Composed over the plain glass
                // base `<Surface>` paints; the :data-surface binding carries the real
                // `cartoon` value so the CSS seam withholds the glass rules.
                surface === 'cartoon' && 'cartoon-surface',
                // BB.W-PAPER-GRID-TEXTURE — the additive geometric grid axis,
                // default OFF (a bare card is byte-identical to HEAD). When
                // opted in, composes the `.paper-grid` interior-ground utility
                // (the `data-grid` binding above mirrors the `grain` shape).
                // Orthogonal to `grain`: the two `::after`-less utility carries
                // its own pseudo, so grain + grid compose without contention.
                grid && 'paper-grid',
                // BB.W-PRESS-UNIFY — the interactive press register, default OFF. The
                // `.glass-press` recipe (utilities/base.css) is the CSS `:active` scale
                // floor (the no-JS / SSR press) + the `--card-press-t`-driven brightness
                // leg the `useLiquidPress` drive feeds; `cursor: pointer` + the WCAG
                // touch floor read on the interactive register. A non-pressable card
                // carries none of it (byte-identical to HEAD).
                pressable && 'glass-press tap-squish',
                // BC.W-SELECTION-CARD — the SELECTED-state metal-shimmer BORDER
                // (A-3 consume; the class is computed in <script> off variant +
                // selected + metal). UNSELECTED selection cards carry NO metal border.
                metalBorderClass,
                props.class,
            )
        "
    >
        <!-- BD.W-CARTOON-CASTER — the inert moving-cel-cast child. Emitted ONLY for
             `surface="cartoon"`, it carries the warm `--cartoon-ink` plate that travels
             DOWN-LEFT + spreads on press (reading `--card-press-t × --motion-weight`),
             lagging the body for the late ink recoil. It is `aria-hidden` + inert (a
             pure decoration child, NOT a `::before`/`::after` pseudo — both occupied on
             the glass carrier). z-index:-1 sits it behind the cel face. -->
        <span v-if="surface === 'cartoon'" class="cartoon-cast" aria-hidden="true" />
        <slot />
    </Surface>
</template>
