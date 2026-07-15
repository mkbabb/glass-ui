<script setup lang="ts">
// VizStudio — the ONE shared viz-studio chassis (BC.W-VIZ-CONFIGURATOR-SUITE).
//
// THE DEFECT (USER-DEFECTS §C/§E): the procedural-suite studios were wildly
// uneven — aurora was a rich `useConfiguratorState` studio while concentric had a
// two-state Switch; some studios put controls below the stage, some bolted a grid
// behind a card (the condemned "double-card-with-grid"), some bury TWO headers IN
// the card. The user mandate: "for each viz … a full configurator + a comprehensive
// demo suite" and "ALL configurators: controls on the RIGHT on desktop" and "ONE
// card with the aurora or a procedural animation."
//
// THE FIX — the single-writer chassis discipline (CLAUDE.md "Demo storybook
// chassis"). VizStudio is the ONE shape EVERY viz studio composes, never a per-viz
// re-fork of the configurator-right + rounded + hero-subpath CSS. It bundles:
//   1. <StoryPage> — the BC.W-PAGE-CHASSIS hero cluster (the audacious display <h1>
//      that SHRINKS on scroll + the explicit @mkbabb/glass-ui/<viz> Fira-Code
//      subpath chip ON TOP of the card, never IN it — W-HIERARCHY2). The page
//      header is the chassis's; this wrapper hosts the studio body.
//   2. <Configurator asideSide="right"> — the BC.W-CONFIG-RIGHT library two-column
//      inspector: the live specimen STAGE on the LEFT (flex-1), the CONTROLS column
//      on the RIGHT on desktop (the precompiled [data-slot=configurator] grid in
//      configurator.css), stacking BELOW on mobile. The wrapper LAYS the studio out
//      using the library component; it does NOT re-author the layout (CONFIG-RIGHT
//      owns it).
//   3. The ROUNDED clip — `rounded-panel overflow-hidden` is the <Configurator>
//      root's (the panel reads as one rounded glass inspector); the #stage slot the
//      viz fills carries `rounded-card overflow-hidden` reaching the canvas pixels
//      (the aurora.md §0.4 "not rounded" fix — the radius reaches the live field,
//      not just the panel frame).
//
// A studio is then just `<VizStudio><template #stage>…</template>
// <template #controls>…</template></VizStudio>` — the configurator-right + rounded +
// hero-subpath shape is the chassis's, the viz's own axes are the #controls slot.
//
// A demo-private chassis primitive — NOT a library export.
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
        /**
         * The StorySection heading — the studio's name (rendered as the
         * canonical `text-subheading` section rung above the studio body). The
         * page-level audacious display <h1> + the subpath chip are the StoryPage
         * chassis's (read from the manifest row); this is the in-body section
         * label.
         */
        heading?: string;
        /** The StorySection eyebrow caption (the mono register, below the heading). */
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

// The ONE rounded studio frame: the panel takes the `rounded-panel overflow-hidden`
// from <Configurator>'s own containerClass; the studio adds the height envelope +
// the shadow-cartoon offset stamp (the aurora-studio look). The fullscreen
// `rounded-none` expanded state is the host's concern (ExpandableContainer), not
// this chassis.
const configuratorClass = computed(() =>
    cn("viz-studio shadow-cartoon", props.heightClass, props.configuratorClass),
);
</script>

<template>
    <!-- BC.W-PAGE-CHASSIS — the page hero (audacious display <h1> that shrinks on
         scroll + the explicit Fira-Code subpath chip) is StoryPage's, read from the
         manifest row. This wrapper hosts the studio body inside the chassis. -->
    <StoryPage>
        <StorySection :heading="heading" :label="label" :blurb="blurb">
            <!-- BG.W-CHASSIS-ADOPT-OR-RETIRE — NO #masthead slot. The page identity is
                 the ONE StoryHeader cluster StoryPage renders (eyebrow → subpath →
                 audacious display <h1> → blurb, rendered ONCE). The retired masthead
                 seam let a studio inject a SECOND display-scale title beside it — the
                 forbidden double-header (the aurora "Aurora" + "Aurora Studio" collision);
                 the seam is removed at the chassis root so no viz can re-author its
                 identity. The studio's in-body section label is the StorySection
                 `heading`/`label`/`blurb` rung above; its color event lives in the viz
                 itself, never a competing masthead title. -->

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
                     color inputs are <ColorSwatch>; a pause/play control + reduced-motion
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
