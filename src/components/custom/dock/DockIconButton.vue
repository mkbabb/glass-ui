<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type Component,
    type HTMLAttributes,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";
import { vSpecular } from "../../../composables/glass";

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
        /** Host tag/component (reka-ui Primitive `as`; default "button"). */
        as?: string | Component;
        /** Merge props onto a slotted child instead of rendering a host tag. */
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { compact: false, active: false, type: "button", as: "button", asChild: false },
);

const classes = computed(() =>
    cn(
        "dock-icon-button glass-specular-track",
        { "dock-icon-button--compact": props.compact },
        props.class,
    ),
);

// The selectable-state attributes (the #10 fold). `aria-pressed` is the AT-selectable
// semantic; `data-active` is the CSS hook the `.dock-icon-button[data-active]` glass
// register reads. Both omitted when `active` is unset (a stateless button carries no
// pressed semantic). Spread through `$attrs` so they land on the rendered host
// regardless of the `as`/`as-child` Primitive host.
const stateAttrs = computed(() =>
    props.active ? { "aria-pressed": "true", "data-active": "" } : {},
);

// `type` is a <button>-only attribute; emit it only when the host is a button.
// It is spread through `$attrs` (not bound on <Primitive> directly — reka's
// Primitive only types `as`/`as-child`) so it lands on the rendered host.
const hostAttrs = computed(() =>
    !props.asChild && props.as === "button" ? { type: props.type } : {},
);
</script>

<template>
    <Primitive
        v-specular
        :as="as"
        :as-child="asChild"
        v-bind="{ ...hostAttrs, ...stateAttrs }"
        :class="classes"
    >
        <slot />
    </Primitive>
</template>
