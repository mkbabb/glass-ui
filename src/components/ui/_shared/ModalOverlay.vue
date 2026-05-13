<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogOverlay } from "reka-ui";
import { cn } from "../../../utils";

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
    >
        <slot />
    </DialogOverlay>
</template>
