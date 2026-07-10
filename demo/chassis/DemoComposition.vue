<script setup lang="ts">
// DemoComposition — the COMPOSED-SCENE demo KIND (BG.W-STORY-PAGE-API §4-D
// taxonomy).
//
// A glassy scene card composing ≥2 library components into the SURFACE they were
// built for — a settings panel, a gate pattern, an auth shell, an empty-state.
// "The components composed into the surfaces they were built for" (the
// compositions-band idiom). It EXTENDS `<DemoSpecimen>` (the glassy-card + header
// conformity base) on the `resting` content tier and gives the slot a scene
// layout (a calm column the composed pieces stack inside).
//
// A demo-private chassis primitive — NOT a library export.
import type { HTMLAttributes } from "vue";
import DemoSpecimen from "./DemoSpecimen.vue";

withDefaults(
    defineProps<{
        heading?: string;
        label?: string;
        blurb?: string;
        /** The scene's inner padding rung (a full scene wants room). */
        pad?: "sm" | "md" | "lg";
        class?: HTMLAttributes["class"];
    }>(),
    { pad: "lg" },
);
</script>

<template>
    <!-- The resting content tier — a calm scene plate. The header + rule +
         field-transmission conformity are DemoSpecimen's; this kind adds the scene
         column the composed library components stack inside. -->
    <DemoSpecimen
        tier="resting"
        :pad="pad"
        :heading="heading"
        :label="label"
        :blurb="blurb"
        :class="$props.class"
    >
        <div class="demo-composition flex flex-col gap-5">
            <slot />
        </div>
    </DemoSpecimen>
</template>
