<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type Component,
    type CSSProperties,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../_shared/class-names";
import { vSpecular } from "../../composables/glass";
import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";
import { springPreset } from "../../composables/motion/spring/springPresets";

/**
 * <DockControl> is the single dock control, with icon and tab geometry selected by
 * a `shape` discriminant:
 *
 *   • `shape="icon"` (default) — fixed-square icon control with glass hover,
 *     interruptible spring press,
 *     pointer-anchored specular gleam, the selectable `active` glass-capsule seat.
 *   • `shape="tab"` — auto-sized text-tab control with
 *     the de-red'd glass hover register + the pointer-following gleam.
 *
 * ONE FACE, the folded safe-inset. Both shapes read the shared `.glass-capsule`
 * face (glass/glass-capsule.css): the painted plate insets via the dock-scoped
 * `--dock-control-safe-inset` fold, while the HIT CELL stays the full
 * `--dock-control-size` (≥44px on coarse via the density clamp) — hit box ≠ paint
 * box. `overflow: visible` keeps the painted inset unclipped.
 *
 * Role rides the consumer: an `active` control stamps `aria-pressed` (the
 * AT-selectable semantic) + `data-active` (the CSS hook reading the
 * `--dock-control-active-bg` "selected reads as glass" tier — never a saturated
 * brand hue). A dock built on `useSelectionGroup` threads the
 * role-per-mode (radio/tab/pressed) at the group level.
 */
const props = withDefaults(
    defineProps<{
        /**
         * The control shape — `icon` (default, fixed-square) or `tab` (auto-sized
         * text tab). The fold's ONE axis.
         */
        shape?: "icon" | "tab";
        /** Compact icon variant: auto-sized instead of fixed square (icon shape). */
        compact?: boolean;
        /**
         * Selected/toggled state. Stamps `aria-pressed` + `data-active`; the icon
         * shape composes the `.glass-capsule` selected seat.
         */
        active?: boolean;
        /** Button type (default "button" to prevent form submission). */
        type?: ButtonHTMLAttributes["type"];
        /**
         * Disabled state (the four-state contract). A boundary nav control stays
         * PRESENT but disabled so the row geometry holds, never DOM-absent.
         */
        disabled?: boolean;
        /** Host tag/component (reka-ui Primitive `as`; default "button"). */
        as?: string | Component;
        /** Merge props onto a slotted child instead of rendering a host tag. */
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    {
        shape: "icon",
        compact: false,
        active: false,
        type: "button",
        disabled: false,
        as: "button",
        asChild: false,
    },
);

const isTab = computed(() => props.shape === "tab");

// The icon shape composes the full glass-capsule register (hover-lift + press +
// the selected `.glass-capsule` seat); the tab shape reads its own de-red'd glass
// hover register (`.dock-tab-button`, dock-controls/tab-button.css). Both carry
// `glass-specular-track` for the moving `::before` catch-light the directive feeds.
const classes = computed(() =>
    isTab.value
        ? cn("dock-tab-button glass-specular-track", props.class)
        : cn(
              "dock-icon-button glass-specular-track glass-capsule-hover",
              { "glass-capsule": props.active },
              { "dock-icon-button--compact": props.compact },
              props.class,
          ),
);

// The selectable-state attributes. `aria-pressed` is the AT-selectable semantic;
// `data-active` is the CSS hook the `[data-active]` glass register reads. Both
// omitted when `active` is unset. Spread through `$attrs` so they land on the
// rendered host regardless of the `as`/`as-child` Primitive host.
const stateAttrs = computed(() => ({
    ...(props.active ? { "aria-pressed": "true", "data-active": "" } : {}),
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
const hostAttrs = computed(() =>
    !props.asChild && props.as === "button" ? { type: props.type } : {},
);

// The ONE interruptible spring-press (the icon shape). `useLiquidPress` composes
// its private spring driver reaches kf `SpringProgress`, so a rapid re-press
// re-seats the LIVE (position, velocity) — the iOS velocity-continuous contract.
// It reads the `press` SPRING_PRESETS row and writes `--dock-press-t` the
// dock-controls CSS reads to couple darken/specular to the spring physics. The
// CSS `:active` register stays the no-JS, PRM floor; `useLiquidPress` is
// PRM-instant + compositor-only. The tab shape reads its own CSS press register.
const PRESS = springPreset("press");
const press = useLiquidPress({
    disabled: () => props.disabled || isTab.value,
    squish: true,
    response: PRESS.response,
    dampingFraction: PRESS.dampingFraction,
    pressVar: "--dock-press-t",
    shrinkDepth: 0.04,
    maxStretch: 1.03,
});

const hostStyle = computed<CSSProperties>(() =>
    isTab.value ? {} : { ...press.pressStyle.value },
);

function blockDisabledActivation(event: MouseEvent): void {
    if (!props.disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
}

// the dock control auto-arms the pointer-following gleam via the
// tier-root `v-specular` directive (ONE position-write source, zero call-site wiring).
// The icon shape wires the interruptible spring-press; the tab shape reads its own CSS
// press/hover register. The template is SINGLE-ROOT (no leading comment node) so attr
// fall-through + VTU `.attributes()` behave exactly as the retired DockIconButton did.
</script>

<template>
    <Primitive
        v-specular
        :as="as"
        :as-child="asChild"
        v-bind="{ ...hostAttrs, ...stateAttrs }"
        :class="classes"
        :style="hostStyle"
        :data-press-armed="!isTab && press.armed ? '' : undefined"
        @pointerdown="press.handlers.onPointerdown"
        @pointerup="press.handlers.onPointerup"
        @pointercancel="press.handlers.onPointercancel"
        @pointerleave="press.handlers.onPointerleave"
        @pointerenter="press.handlers.onPointerenter"
        @keydown="press.handlers.onKeydown"
        @keyup="press.handlers.onKeyup"
        @blur="press.handlers.onBlur"
        @click.capture="blockDisabledActivation"
    >
        <slot />
    </Primitive>
</template>
