<script setup lang="ts">
// DemoInteraction — the INTERACTIVE demo KIND (BG.W-STORY-PAGE-API §4-D taxonomy).
//
// A glassy card hosting the LIBRARY's OWN interactives — a controls column of
// real `<Button>` / `<Slider>` / `<Switch>` / picker rows, NEVER a hand-rolled
// `bg-card/70 backdrop-blur` lozenge (the audit's "a glass-ui demo bypasses its
// own glass primitives" defect). It EXTENDS `<DemoSpecimen>` (the glassy-card +
// header conformity base) on the `floating` interactive-glass tier and lays the
// slot out as a vertical controls rhythm.
//
// A demo-private chassis primitive — NOT a library export.
import type { HTMLAttributes } from "vue";
import DemoSpecimen from "./DemoSpecimen.vue";

defineProps<{
    heading?: string;
    label?: string;
    blurb?: string;
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <!-- The interactive glass tier (`floating`, forward of the resting content
         plate) so the controls read as a lifted glass panel. The header + rule +
         field-transmission conformity are DemoSpecimen's. -->
    <DemoSpecimen
        tier="floating"
        :heading="heading"
        :label="label"
        :blurb="blurb"
        :class="$props.class"
    >
        <div class="demo-interaction flex flex-col gap-3">
            <slot />
        </div>
    </DemoSpecimen>
</template>
