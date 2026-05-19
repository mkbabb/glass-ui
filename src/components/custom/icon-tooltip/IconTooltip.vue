<template>
    <TooltipProvider :delay-duration="250">
        <Tooltip>
            <!--
                Q.W3 Lane G (Q-cos-13) — the slotted child IS the trigger.

                O.W6 Lane D wrapped the slot in a `<span class="icon-tooltip-
                trigger">` styled `inline-flex; min-width/min-height: 44px`
                to force a WCAG 2.5.5 (44×44) hit-area. That span turned the
                slotted child into a flex item, which strips `width:100%`
                semantics — keyframes.js PlaybackRibbon's `<Slider
                variant="timeline">` collapsed to a 16px thumb-only nub.

                Path C revert: no wrap-span. `as-child` forwards the
                trigger props directly onto the slotted element, so a
                stretching child (Slider/Input) keeps its `w-full` and an
                interactive child (Button) keeps its own four-state +
                ≥44px target contract. Bare decorative glyphs that need a
                hit-area carry it themselves (utility on the glyph) — the
                same per-component padding/min-size contract every other
                interactive primitive owns.
            -->
            <TooltipTrigger as-child>
                <slot />
            </TooltipTrigger>
            <TooltipContent class="font-display text-base">{{ text }}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip";

defineProps<{
    text: string;
}>();
</script>
