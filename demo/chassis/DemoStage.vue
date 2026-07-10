<script setup lang="ts">
// DemoStage — the STAGE demo KIND (BG.W-STORY-PAGE-API §4-D taxonomy).
//
// A full-bleed live FIELD hosting a demo — the studio pattern (the aurora / viz
// hero, a big glass surface over the page substrate). The stage frame TRANSMITS
// the page field the StoryPage chassis mounts (it reads the field kind via the
// `DEMO_FIELD_KEY` context — NO second GL context, the one-GL-per-route budget);
// a `#stage` slot fills the live specimen area, and a `#controls` slot floats a
// `glass-floating` control panel OVER the field (the conformity: glass over the
// warm field, never a flat plate). The bare `<slot/>` carries notes below.
//
// A demo-private chassis primitive — NOT a library export.
import { computed, inject, type HTMLAttributes } from "vue";
import { cn } from "@glass/utils/cn";
import StorySection from "../stories/StorySection.vue";
import { DEMO_FIELD_KEY } from "./subtype-context";

const props = withDefaults(
    defineProps<{
        heading?: string;
        label?: string;
        blurb?: string;
        /** The stage height envelope the field flexes inside. */
        heightClass?: string;
        class?: HTMLAttributes["class"];
    }>(),
    { heightClass: "h-[min(62vh,560px)]" },
);

// Read the page's manifest-declared field (provided by StoryPage) so the stage
// knows what it floats over — degrades to `undefined` outside a StoryPage.
const pageField = inject(DEMO_FIELD_KEY, undefined);
const fieldKind = computed(() => {
    const f = pageField?.value;
    return typeof f === "string" ? f : (f?.kind ?? "none");
});
</script>

<template>
    <StorySection :heading="heading" :label="label" :blurb="blurb">
        <!-- The stage frame — a large rounded aperture reaching the field pixels
             (the aurora "rounded" fix: the radius reaches the live field, not just
             a panel frame). Transparent by construction so the page field reads
             through; `data-field` records the field kind for the field-aware
             styling hooks. -->
        <div
            :class="
                cn(
                    'demo-stage relative overflow-hidden rounded-panel shadow-cartoon',
                    heightClass,
                    props.class,
                )
            "
            :data-field="fieldKind"
        >
            <!-- The live specimen area (the field / viz fills it). -->
            <div class="demo-stage__field absolute inset-0">
                <slot name="stage" />
            </div>

            <!-- The controls float as a glass-floating panel OVER the field (the
                 conformity: glass over the warm field). Absent → the stage is the
                 bare field. -->
            <div
                v-if="$slots.controls"
                class="demo-stage__controls glass-floating rounded-card absolute end-4 top-4 flex max-w-[18rem] flex-col gap-3 p-4"
            >
                <slot name="controls" />
            </div>
        </div>

        <!-- Notes / the comprehensive gallery flow BELOW the stage. -->
        <slot />
    </StorySection>
</template>
