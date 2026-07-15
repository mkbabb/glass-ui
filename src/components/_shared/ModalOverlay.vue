<script setup lang="ts">
import { computed, type CSSProperties, type HTMLAttributes } from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "./class-names";

/**
 * ModalOverlay — canonical wrapper for Dialog / Sheet / AlertDialog scrim
 * declarations (V.W3.T4 / A5 §4). Three near-bit-identical class strings
 * (DialogContent, DialogScrollContent, SheetContent) collapse onto one
 * primitive parameterised by:
 *
 * - `scrim`: `glass` (default — `bg-overlay-scrim`) | `dim`
 *   (`bg-overlay-scrim-strong`) | `clear` (`bg-overlay-scrim-subtle`)
 * - `animate`: `fade` (default — composes `.sheet-animate`) | `scale`
 *   | `slide` | `none` (Drawer / vaul-vue case)
 * - `layout`: `centered` (default flat overlay) | `edge` (reserved alias —
 *   maps to no-op today; held for future right/bottom edge-pinned overlays
 *   per A5 §4.4 forward-reservation) | `scroll` (the DialogScrollContent
 *   pattern: grid place-items-center overflow-y-auto so content scrolls
 *   inside the scrim)
 * - `scrimAnimation` (AJ-W4-δ): a CSS `animation` shorthand value forwarded
 *   to the portaled overlay element via the typed `--scrim-animation`
 *   cascade variable. Consumers that need a long-running scrim-breath
 *   (e.g. CellularWarningDialog's slow opacity pulse) cannot reach the
 *   portaled overlay through their scoped CSS — reka-ui's DialogPortal
 *   teleports it outside the consumer's component subtree. The publisher
 *   owns the bridge: the prop value lands as `--scrim-animation` on the
 *   overlay's inline style, and the rule
 *   `[data-scrim-animation] { animation: var(--scrim-animation, none) }`
 *   in the canonical animations.css consumes it.
 *
 * Drawer / vaul-vue stays carved per A5 §4.4 — its transform-driven motion
 * conflicts with `.sheet-animate`'s data-state animation, and the
 * vaul-vue overlay is a different reka-ui primitive entirely.
 */

interface ModalOverlayProps {
    class?: HTMLAttributes["class"];
    /**
     * Scrim intensity. `glass` reads `--overlay-scrim` (the default Dialog /
     * Sheet paint); `clear` reads `--overlay-scrim-subtle` (DialogScrollContent
     * — quieter so chassis content shows through); `dim` reads
     * `--overlay-scrim-strong` (Drawer / heavy-modal host).
     */
    scrim?: "glass" | "clear" | "dim";
    /**
     * Animation grammar. `fade` enables the canonical `.sheet-animate`
     * data-state pair (Dialog, Sheet); `none` skips it for hosts whose
     * portal library drives its own motion.
     */
    animate?: "fade" | "scale" | "slide" | "none";
    /**
     * Layout — `centered` is the default flat overlay. `scroll` adds
     * `grid place-items-center overflow-y-auto` so content scrolls inside
     * the scrim (DialogScrollContent's "scrollable centred dialog" pattern).
     * `edge` is a forward-reserved alias that maps to no-op today (held for
     * future right/bottom edge-pinned overlays per A5 §4.4).
     */
    layout?: "centered" | "edge" | "scroll";
    /**
     * Optional CSS `animation` shorthand applied to the portaled overlay
     * via the `--scrim-animation` typed cascade variable. Pairs with the
     * `[data-scrim-animation] { animation: var(--scrim-animation, none) }`
     * rule in `animations.css` so consumers can drive a long-running
     * scrim-breath without owning the portal traversal. Composes with the
     * `animate="fade"` data-state enter/exit (the fade rides
     * `tw-animate-css` keyframes on `data-[state]`; the scrim-breath
     * rides the typed variable on `data-scrim-animation` — distinct
     * selectors, no cascade fight).
     *
     * Example: `scrimAnimation="scrim-breath 6s ease-in-out infinite"`
     * — pairs with a `@keyframes scrim-breath` declared at the consumer
     * (or in `animations.css` if the rhythm is canonical).
     *
     * AJ-W4-δ.
     */
    scrimAnimation?: string;
}

const props = withDefaults(defineProps<ModalOverlayProps>(), {
    scrim: "glass",
    animate: "fade",
    layout: "centered",
});

const scrimClass = {
    glass: "bg-overlay-scrim",
    clear: "bg-overlay-scrim-subtle",
    dim: "bg-overlay-scrim-strong",
} as const;

const animateClass = {
    fade: "sheet-animate",
    scale: "sheet-animate",
    slide: "sheet-animate",
    none: "",
} as const;

const layoutClass = {
    centered: "",
    edge: "",
    scroll: "grid place-items-center overflow-y-auto",
} as const;

/**
 * AJ-W4-δ — inject the typed `--scrim-animation` cascade variable so the
 * canonical animations.css rule can consume it. We bypass the broken
 * portal cascade by writing the variable directly to the overlay's inline
 * style; the `data-scrim-animation` attribute keys the consuming rule so
 * the variable does nothing unless the consumer opts in (no surprise
 * animations on the default scrim).
 */
const scrimStyle = computed<CSSProperties | undefined>(() => {
    if (!props.scrimAnimation) return undefined;
    return { "--scrim-animation": props.scrimAnimation } as CSSProperties;
});
</script>

<template>
    <DialogOverlay
        :class="
            cn(
                'fixed inset-0 z-overlay [backdrop-filter:var(--glass-blur-wash)]',
                scrimClass[props.scrim],
                layoutClass[props.layout],
                animateClass[props.animate],
                props.class,
            )
        "
        :style="scrimStyle"
        :data-scrim-animation="props.scrimAnimation ? '' : undefined"
    >
        <slot />
    </DialogOverlay>
</template>
