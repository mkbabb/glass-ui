<script setup lang="ts">
import {
    computed,
    type ButtonHTMLAttributes,
    type Component,
    type CSSProperties,
    type HTMLAttributes,
    ref,
} from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";

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
 */
const props = withDefaults(
    defineProps<{
        /** Compact variant: auto-sized instead of fixed 2.5rem square. */
        compact?: boolean;
        /** Button type attribute (default: "button" to prevent form submission). */
        type?: ButtonHTMLAttributes["type"];
        /** Host tag/component (reka-ui Primitive `as`; default "button"). */
        as?: string | Component;
        /** Merge props onto a slotted child instead of rendering a host tag. */
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { compact: false, type: "button", as: "button", asChild: false },
);

const classes = computed(() =>
    cn(
        "dock-icon-button glass-specular-track",
        { "dock-icon-button--compact": props.compact },
        props.class,
    ),
);

// AV.W15 — the pointer-anchored moving specular write seam. On pointer-move the
// catch-light position (--mouse-x/--mouse-y, percentages of the control box) is
// written onto the host so glass-specular-track.css paints the travelling glow.
// The CSS half owns the reduced-motion static guard + the centred var() floor;
// this seam only feeds the position. The write is style-only (no reflow, no
// re-render) and pointer-anchored, so it is inert until the user hovers.
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

// `type` is a <button>-only attribute; emit it only when the host is a button.
// It is spread through `$attrs` (not bound on <Primitive> directly — reka's
// Primitive only types `as`/`as-child`) so it lands on the rendered host.
const hostAttrs = computed(() =>
    !props.asChild && props.as === "button" ? { type: props.type } : {},
);
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        v-bind="hostAttrs"
        :class="classes"
        :style="specularStyle"
        @pointermove="trackSpecular"
    >
        <slot />
    </Primitive>
</template>
