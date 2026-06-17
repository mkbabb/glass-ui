<script lang="ts">
import type { HTMLAttributes } from "vue";

/** Props for `<ScrollCardHeader>` — the larger-header-items scroll-shrink header. */
export interface ScrollCardHeaderProps {
    /** A consumer that wants the header NOT pinned passes `:sticky="false"`. */
    sticky?: boolean;
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import CardHeader from "./CardHeader.vue";
import { cn } from "../../../utils";

/**
 * <ScrollCardHeader> — the LARGER-header-items scroll-shrink header
 * (BB.W-SCROLL-CARD).
 *
 * The hero-rung header the user named ("LARGER header items that as you scroll
 * shrink"). It composes `<CardHeader shrink>` (so it reuses the SAME
 * compositor-safe `card-*-shrink` lanes minted in CardHeader.vue — NO second
 * keyframe set) and lifts the slotted `<CardTitle>` to the hero rung
 * `--type-display-1` (φ², ~2.6rem) at REST. The lane-2 scale ratio
 * (`--card-title-shrink-ratio`) is unchanged, so the larger start size makes
 * the shrink read MORE dramatically while the text still lays out ONCE — the
 * shrink is the composited scale, never a per-frame font-size re-measure.
 *
 * It is `sticky top-0` by default (the standard scroll-card affordance: the
 * header pins to the scroll-port top and compresses), so the lane-4 background
 * lift (the `::before` backplate fading transparent → painted) reads as the
 * header sticks. A consumer overrides via `class`.
 *
 * Drop it inside a `<ScrollCard>` (which owns the `.card-scroll-host`
 * scroll-port + the named timeline) — ZERO consumer rAF/scroll-listener.
 */
const props = defineProps<ScrollCardHeaderProps>();
</script>

<template>
    <CardHeader
        shrink
        data-slot="scroll-card-header"
        :class="
            cn(
                'scroll-card-header',
                props.sticky !== false && 'sticky top-0 z-10',
                props.class,
            )
        "
    >
        <slot />
    </CardHeader>
</template>

<style scoped>
/* The hero rung — the slotted <CardTitle> rests at --type-display-1 (φ², the
   LARGER header item), so the lane-2 shrink (the unchanged
   --card-title-shrink-ratio scale) reads dramatically. The title lays out ONCE
   at the hero rung; the scroll-timeline only composites the scale. :slotted()
   reaches the consumer-passed <CardTitle> (the precise Vue idiom, the
   CardHeader.vue scoped-slot fix mirrored here). */
.scroll-card-header > :slotted([data-slot="card-title"]) {
    font-size: var(--type-display-1);
    line-height: var(--type-leading-heading);
}
</style>
