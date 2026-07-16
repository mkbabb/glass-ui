<script setup lang="ts">
// Demo-private shared viz studio: StoryPage owns route identity, StorySection
// names the subject, and Configurator owns stage-left/controls-right layout.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";
import StoryPage from "../../../chassis/page/StoryPage.vue";
import StorySection from "../../../chassis/section/StorySection.vue";
import {
    Configurator,
    type ConfiguratorGalleryPlacement,
    type ConfiguratorPreset,
    type ConfiguratorScrollMode,
} from "@glass/components/configurator";

const props = withDefaults(
    defineProps<{
        /** The studio's in-body StorySection heading. */
        heading?: string;
        /** Optional compact StorySection label. */
        label?: string;
        /** The StorySection blurb (the dense descriptor under the heading). */
        blurb?: string;
        /**
         * Optional preset table — projected to the <Configurator> preset row.
         * Omit when the studio drives its own preset chrome via the `#presets`
         * slot (aurora's PresetPickerRow, blob's weighted row).
         */
        presets?: readonly ConfiguratorPreset<unknown>[];
        /** The active preset key (display only). */
        activePreset?: string;
        /**
         * Where the preset gallery sits — forwarded to `<Configurator>`. Default
         * `"aside"` (the inspector idiom, byte-identical to before). `"top"` pins
         * the presets as a LARGE full-width scrollable ribbon across the top of the
         * studio (the aurora studio's F7.6 register — the stage + controls reclaim
         * the full height below it). The chassis OWNS the passthrough (single-writer
         * — it threads the axis to the ONE library `<Configurator>`); a studio only
         * sets the axis, never a per-studio gallery re-fork.
         */
        galleryPlacement?: ConfiguratorGalleryPlacement;
        /** Scroll behaviour for the controls column. Default `auto`. */
        scrollMode?: ConfiguratorScrollMode;
        /**
         * The studio height envelope — the fixed-height frame the stage flexes
         * inside. BI.W-AURORA-VIBRANCY (UF-E4) bumped the default from `min(78vh,720px)`
         * to `min(86vh,880px)` — the "core chosen aurora space larger" read (the studio
         * canvas grows). Pass a tighter rung for a smaller viz.
         */
        heightClass?: string;
        /** Forwarded class string for the <Configurator> root (merged via cn). */
        configuratorClass?: HTMLAttributes["class"];
    }>(),
    {
        scrollMode: "auto",
        heightClass: "h-[min(86vh,880px)]",
        galleryPlacement: "aside",
    },
);

const emit = defineEmits<{
    (e: "select-preset", key: string): void;
    (e: "reset"): void;
}>();

// The ONE rounded studio frame: Configurator owns the panel clip; the studio adds
// only its height envelope and shadow-cartoon offset stamp.
const configuratorClass = computed(() =>
    cn("viz-studio shadow-cartoon", props.heightClass, props.configuratorClass),
);
</script>

<template>
    <StoryPage>
        <StorySection :heading="heading" :label="label" :blurb="blurb">
            <!-- BC.W-CONFIG-RIGHT — stage LEFT, controls RIGHT on desktop. The
                 `aside-side="right"` is the <Configurator> default, pinned here so
                 the studio's controls-right placement is a recorded contract the π
                 asserts. The desktop two-column grid ships as the precompiled
                 [data-slot=configurator] rule in configurator.css (never the dead
                 arbitrary utility). Below `lg` the controls stack below the stage. -->
            <Configurator
                :aside-side="'right'"
                :gallery-placement="galleryPlacement"
                :scroll-mode="scrollMode"
                :presets="presets"
                :active-preset="activePreset"
                :class="configuratorClass"
                @select-preset="(k: string) => emit('select-preset', k)"
                @reset="() => emit('reset')"
            >
                <!-- The live specimen stage (LEFT on desktop). The viz fills it; the
                     #stage content carries its OWN `rounded-card overflow-hidden`
                     reaching the canvas pixels (the aurora.md §0.4 rounded fix). -->
                <template #stage>
                    <slot name="stage" />
                </template>

                <!-- The full configurator (RIGHT on desktop). EVERY tunable axis is a
                     live <ConfiguratorRow>, grouped into <ConfiguratorLayer> sections;
                     color inputs are proportioned native swatches; a pause/play control + reduced-motion
                     respect ride here. The viz owns its axes; the chassis owns the
                     layout. -->
                <template #controls>
                    <slot name="controls" />
                </template>

                <!-- Optional preset-row override (aurora's PresetPickerRow / blob's
                     weighted row). When absent the <Configurator> default chip row
                     renders the `presets` prop. -->
                <template v-if="$slots.presets" #presets="presetScope">
                    <slot name="presets" v-bind="presetScope" />
                </template>

                <!-- Optional footer (reset affordance hook). -->
                <template v-if="$slots.footer" #footer="footerScope">
                    <slot name="footer" v-bind="footerScope" />
                </template>
            </Configurator>

            <!-- The studio notes / hint prose + the comprehensive demo gallery flow
                 BELOW the studio frame (the per-viz §7 suite — every state walked). -->
            <slot />
        </StorySection>
    </StoryPage>
</template>
