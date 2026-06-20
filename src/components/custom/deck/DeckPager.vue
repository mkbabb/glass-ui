<script setup lang="ts">
import PagerDots from "../pager-dots/PagerDots.vue";

/* DeckPager — the deck's windowed dot register. A THIN wrapper over `<PagerDots>`'s
   already-factored `pagerWindow` oracle (BA.W-PAGER lifted the windowing math + the
   per-index focus-survival into PagerDots), carrying ONLY the deck's PRESENTATION
   aria register: `role="group"`/`aria-current` (vs PagerDots' `role="tablist"`/
   `aria-selected`), selected via the `pattern="group"` axis. ZERO re-implementation
   of `pagerWindow` — the math is sourced from the ONE PagerDots definition.

   The 24px WCAG-2.5.8 hit target, the active-dot elongation morph, the dimmed
   `is-edge` window cues, and the keyboard focus-survival across a window recompute
   (the focused dot scrolling out moves focus to the active dot, NEVER to <body>)
   all ride the composed PagerDots machinery unchanged. */

const props = withDefaults(
    defineProps<{
        /** Total slide count. */
        total: number;
        /** Window to `fit` dots centered on the active dot. Off → show every dot. */
        windowFit?: number;
        /** Encapsulate the rail in the glass pager pill chassis. Default false —
            a deck owns its own ambient glass host, so the dots sit FLUSH on it. */
        ring?: boolean;
        /** Accessible name for the rail group. */
        ariaLabel?: string;
    }>(),
    { ring: false, ariaLabel: "Slides" },
);

const emit = defineEmits<{ (e: "select", index: number): void }>();

/** v-model:index — the active 0-based slide index. */
const index = defineModel<number>("index", { default: 0 });
</script>

<template>
    <PagerDots
        v-model:active="index"
        pattern="group"
        :count="props.total"
        :window-fit="props.windowFit"
        :ring="props.ring"
        :aria-label="props.ariaLabel"
        @select="(i: number) => emit('select', i)"
    />
</template>
