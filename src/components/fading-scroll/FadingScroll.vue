<script setup lang="ts">
// FadingScroll — the library's single scroll-state-driven edge-fade primitive
// (BA.W-FADING-SCROLL). A thin default-slotted scroll-port wrapper: the root IS
// the scroll port, the default slot IS the scrolled content. The start edge
// feathers ONLY past `scroll > 0`, the end edge ONLY while trailing overflow
// remains — so the at-rest no-overflow edge is SHARP (the R8-08 "Shy" defect,
// where the static `.scroll-fade-*` mask half-erased the first card's chrome at
// rest, is structurally impossible here).
//
// DUAL-PATH, single writer (mirrors `scroll-driven.css` / `useScrollProgress`):
//   - NATIVE PRIMARY: the `.fading-scroll` CSS recipe (utilities/base.css) drives
//     the per-edge `--fade-start` / `--fade-end` mask-width customs off a
//     `scroll(self inline|block)` timeline inside an `@supports
//     (animation-timeline: scroll())` block — ZERO JS on a supporting engine.
//   - JS FALLBACK: `useFadingScroll` writes the SAME customs, feature-detect-gated
//     OFF when the native timeline is supported (no double-feather).
// The CSS axis is selected by `data-fade-axis` (the root attr); the fallback
// reads the same `axis` prop.
import { ref, toRef, watch } from "vue";
import { useFadingScroll } from "./composables/useFadingScroll";

const props = withDefaults(
    defineProps<{
        /** Scroll axis. `"x"` is the horizontal strip, `"y"` the vertical column. Default `"x"`. */
        axis?: "x" | "y";
        /** Feather the start edge once scrolled past the start. Default `true`. */
        fadeStart?: boolean;
        /** Feather the end edge while trailing overflow remains. Default `true`. */
        fadeEnd?: boolean;
    }>(),
    { axis: "x", fadeStart: true, fadeEnd: true },
);

const rootRef = ref<HTMLElement | null>(null);

// The JS fallback. On a native-`scroll(self)`-supporting engine this attaches
// nothing (the CSS recipe is the sole writer); otherwise it writes the per-edge
// customs off the live scroll state. Single writer either way.
const fadingScroll = useFadingScroll(rootRef, {
    axis: toRef(props, "axis"),
    fadeStart: toRef(props, "fadeStart"),
    fadeEnd: toRef(props, "fadeEnd"),
});

watch(
    () => [props.axis, props.fadeStart, props.fadeEnd],
    fadingScroll.measure,
);
</script>

<template>
    <div
        ref="rootRef"
        class="fading-scroll"
        :class="axis === 'y' ? 'fading-scroll--y' : 'fading-scroll--x'"
        :data-fade-axis="axis"
        :data-fade-start="fadeStart ? '' : undefined"
        :data-fade-end="fadeEnd ? '' : undefined"
        role="region"
        aria-label="Scrollable content"
        tabindex="0"
    >
        <slot />
    </div>
</template>
