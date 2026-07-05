<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type Component,
    type CSSProperties,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";
import { useLiquidPress } from "../../../composables/motion/useLiquidPress";
import { springPreset } from "../../../composables/motion/springPresets";

/**
 * <DockIconButton> — fixed-square icon button for use inside GlassDock.
 *
 * Emits the dock icon-button class contract. Interactive styling is owned by
 * src/styles/dock.css so all dock controls share one public style authority.
 *
 * Use `as`/`as-child` to render as a <RouterLink> or <a> without a wrapper:
 * `as="a"` swaps the host tag, `as-child` merges the dock class onto a slotted
 * child (the reka-ui Primitive idiom). `type` is emitted only on a <button>
 * host (an anchor/RouterLink carries no `type`).
 *
 * BB.W-LIQUIDHOVER — the pointer-anchored moving-specular gleam AUTO-ARMS via the
 * `v-specular` directive (the tier-root delivery wrapping the ONE position-write
 * core, `createSpecularWriter`). The prior hand-composed `useSpecularTracking` +
 * `:style="specularStyle"` + `@pointermove="onPointerMove"` triplet RETIRED onto it:
 * the dock control gleams pointer-following with ZERO call-site wiring. The
 * `.dock-icon-button` `::before` (material.css) paints + lifts intensity on hover/
 * active; the directive supplies the position. PRM-aware by construction (the wrapped
 * core skips the write under reduce; the CSS bracket pins the catch-light static).
 */
const props = withDefaults(
    defineProps<{
        /** Compact variant: auto-sized instead of fixed 2.5rem square. */
        compact?: boolean;
        /**
         * Selected/toggled state (BC.W-DOCK-ENGINE cross-repo fold — fourier-M #10).
         * The icon button is otherwise STATELESS (hover/press only); a consumer
         * building a selectable dock control (a filter toggle, a mode picker) had to
         * hand-roll the active register. Setting `active` stamps `aria-pressed` (the
         * load-bearing AT-selectable semantic) + `data-active` (the CSS hook reading
         * the existing `--dock-control-active-bg` "selected reads as glass" tier —
         * NEVER a saturated brand hue, per W-REGISTER-IOS). Ergonomic sugar over the
         * shipped register; no new token, no new paint.
         */
        active?: boolean;
        /** Button type attribute (default: "button" to prevent form submission). */
        type?: ButtonHTMLAttributes["type"];
        /**
         * Disabled state (the four-state contract). A boundary nav control (a
         * prev/next at the first/last item) stays PRESENT but disabled so the row
         * geometry holds, never DOM-absent (the "flaky" read). On a <button> host it
         * lands the native `disabled` attribute + `aria-disabled`; the CSS reads the
         * `:disabled` register (the shared `.dock-icon-button:disabled` dim + the
         * `pointer-events:none` press-suppress).
         */
        disabled?: boolean;
        /** Host tag/component (reka-ui Primitive `as`; default "button"). */
        as?: string | Component;
        /** Merge props onto a slotted child instead of rendering a host tag. */
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    {
        compact: false,
        active: false,
        type: "button",
        disabled: false,
        as: "button",
        asChild: false,
    },
);

// BD.W-DOCK-CORE (P4 deferred) — the selected pill COMPOSES the shared
// `.glass-capsule` register (the ONE glassy lifted-lozenge recipe, BD.W-TAB-IOS-CAPSULE)
// now that the `--glass-capsule-fill` override hook ships. `.glass-capsule-hover` is
// composed ALWAYS (it only adds the specular-lift + press-snap transitions — inert at
// rest, no resting fill), and `.glass-capsule` is added ONLY when `active` so the
// selected control reads as the lifted warm-glass capsule (the dock-controls.css
// `[data-active]` rule re-points `--glass-capsule-fill` to the selected glass tier).
// A stateless icon button stays transparent at rest (no capsule plate).
const classes = computed(() =>
    cn(
        "dock-icon-button glass-specular-track glass-capsule-hover",
        { "glass-capsule": props.active },
        { "dock-icon-button--compact": props.compact },
        props.class,
    ),
);

// The selectable-state attributes (the #10 fold). `aria-pressed` is the AT-selectable
// semantic; `data-active` is the CSS hook the `.dock-icon-button[data-active]` glass
// register reads. Both omitted when `active` is unset (a stateless button carries no
// pressed semantic). Spread through `$attrs` so they land on the rendered host
// regardless of the `as`/`as-child` Primitive host.
const stateAttrs = computed(() => ({
    ...(props.active ? { "aria-pressed": "true", "data-active": "" } : {}),
    // The disabled register (the four-state contract). The native `disabled` attr only
    // applies on a <button> host; `aria-disabled` carries the semantic on any host.
    ...(props.disabled
        ? {
              ...(props.as === "button" && !props.asChild
                  ? { disabled: true }
                  : {}),
              "aria-disabled": "true",
          }
        : {}),
}));

// `type` is a <button>-only attribute; emit it only when the host is a button.
// It is spread through `$attrs` (not bound on <Primitive> directly — reka's
// Primitive only types `as`/`as-child`) so it lands on the rendered host.
const hostAttrs = computed(() =>
    !props.asChild && props.as === "button" ? { type: props.type } : {},
);

// BG.W-LIQUID-WEIGHT-DEFAULT (F5.2, row 2) — the dock control press is the ONE
// interruptible spring-press (the paint-judge dock-hover-press repair). `useLiquidPress`
// composes `useSpringPress` → `useSpring` → kf `SpringProgress`, so a rapid re-press re-seats
// the LIVE (position, velocity) — the iOS velocity-continuous contract, NOT a CSS `:active`
// restart. It reads the `press` SPRING_PRESETS row (response 0.2 / ζ 0.8 — the ≤2-frame
// answer + the +1.5% alive rebound; the ONE source, never a local literal) and writes the
// `--dock-press-t` 0..1 drive the dock-controls CSS reads to COUPLE the darken/specular
// feedback to the spring physics (the `::before` gleam settles with the alive rebound on
// release — dock-controls/icon-button.css). `shrinkDepth: 0.04` makes the JS reciprocal
// squish AGREE with the CSS `:active { scale: var(--scale-press-dock) }` = 0.96 floor (the
// JS is the ENHANCEMENT: a volume-preserving reciprocal deform over the same shrink). The
// CSS `:active` register stays the no-JS / PRM floor — `useLiquidPress` is PRM-instant +
// compositor-only by construction (the DOCK_SPRING {0.68,0.64} morph clock is untouched;
// this is the DISTINCT press register, springPreset('press')).
const PRESS = springPreset("press");
const press = useLiquidPress({
    squish: true,
    response: PRESS.response,
    dampingFraction: PRESS.dampingFraction,
    pressVar: "--dock-press-t",
    shrinkDepth: 0.04,
    maxStretch: 1.03,
});

// The press `:style` overrides the CSS `:active`/hover `scale` only while ENGAGED (the
// single-source press — the inline reciprocal squish beats the stylesheet), then yields
// back to the cascade at rest (`pressStyle` omits `scale` below the engage threshold, so
// hover + selected-active scale win at rest). It carries the `--dock-press-t` drive +
// `--flex-vel`. The `v-specular` directive writes `--mouse-x/y` imperatively on the SAME
// element (a distinct key set), so the two coexist — the Button.vue precedent.
const hostStyle = computed<CSSProperties>(() => ({ ...press.pressStyle.value }));
</script>

<template>
    <Primitive
        v-specular
        :as="as"
        :as-child="asChild"
        v-bind="{ ...hostAttrs, ...stateAttrs }"
        :class="classes"
        :style="hostStyle"
        @pointerdown="press.press"
        @pointerup="press.release"
        @pointercancel="press.release"
        @pointerleave="press.release"
    >
        <slot />
    </Primitive>
</template>
