<script setup lang="ts" generic="T extends SearchableItem = SearchableItem">
// SiriDockCapability — the Siri glass island as a DOCK CAPABILITY (BG.W-SIRI-DOCK-CAPABILITY).
//
// Siri is NOT a subpath component — it is a DOCK capability that lives BESIDE the dock via
// the `.glass-dock-frame`/`#rail` escape (box-inviolate: the island reads the dock's pill
// as its bloom source but never touches the dock's own box). This SFC is the island CHROME;
// `useSiriDock` is the seam that composes the three shipped substrates (the ONE `useDockSpring`
// form-morph, the `useLiquidReveal` source-rect bloom, the existing `useDockSearch` pipeline).
//
// FORMS-ARE-DATA. The four morphological forms (dormant pill → listening orb → thinking
// capsule → responding panel) are the `SIRI_FORMS` DATA ladder (constants.ts). ONE
// `--siri-island-t` scalar glides through their √φ-ladder slots; the CSS crossfades the
// overlapping content layers inside the clip-aperture (siri.css). No four hand-coded
// geometries, no second spring, no per-form keyframe set — the morph is the ONE scalar.
//
// COMPOSITOR-ONLY + PRM. The form crossfade + the bloom write ONLY transform/opacity/filter
// (proof:no-layout-animation holds); `useDockSpring`'s respectReducedMotion jumps the scalar
// and `useLiquidReveal` snaps the bloom to settled under `prefers-reduced-motion: reduce`.

import { computed, useTemplateRef, type ComponentPublicInstance } from "vue";
import { useSiriDock } from "./composables/useSiriDock";
import type { UseDockSearchOptions } from "./composables/useDockSearch";
import type { SearchableItem } from "../search/composables";
import { SIRI_FORMS } from "./constants";

const props = defineProps<{
    /** The trigger the island blooms FROM — the collapsed dock pill / the "Search or Ask"
     *  affordance (an element or component ref). Passed to `useLiquidReveal`. */
    trigger?: HTMLElement | ComponentPublicInstance | null;
    /** The Search-or-Ask pipeline source — composes the EXISTING `useDockSearch` (ONE
     *  pipeline). Omit for an island with no search field. */
    searchOptions?: UseDockSearchOptions<T>;
    /** The starting island-bloom blur radius (the iOS-27 decongest). Default 6. */
    blur?: number;
}>();

const islandRef = useTemplateRef<HTMLElement>("islandRef");

// The seam — composes the ONE dock spring (form morph) + the liquid-reveal bloom + the
// dock-search pipeline. `useSiriDock` NEVER instantiates a `SpringProgress` (the factory
// owns the sole create site).
const siri = useSiriDock<T>({
    island: islandRef,
    trigger: computed(() => props.trigger ?? null),
    search: props.searchOptions,
    blur: props.blur,
});

// The four form layers, DATA-driven — the CSS reads each layer's `--siri-slot`/`--siri-scale`
// to crossfade it against the live `--siri-island-t` (siri.css). Rendered from SIRI_FORMS so
// the layer set can never drift from the data ladder.
const forms = SIRI_FORMS;

// Expose the capability handle so the consumer drives engage/think/respond/dismiss + reads
// the form/level/search — the demo (and any consumer) owns the trigger wiring.
defineExpose({
    form: siri.form,
    level: siri.level,
    liveMessage: siri.liveMessage,
    isEngaged: siri.isEngaged,
    setForm: siri.setForm,
    engage: siri.engage,
    think: siri.think,
    respond: siri.respond,
    dismiss: siri.dismiss,
    search: siri.search,
});
</script>

<template>
    <div
        ref="islandRef"
        class="siri-island glass-floating"
        :class="`siri-form-${siri.form.value}`"
        role="status"
        aria-live="polite"
        :data-engaged="siri.isEngaged.value || undefined"
    >
        <!-- the live announcement (visually hidden — the island's paint is the affordance). -->
        <span class="sr-only">{{ siri.liveMessage.value }}</span>

        <!-- the warm under-glow — a radial warm-cream bloom behind the island that ramps
             its intensity with `--siri-island-t` (the "lit from within" iOS-27 register). -->
        <div class="siri-underglow" aria-hidden="true" />

        <!-- the CLIP-APERTURE — holds the overlapping form layers; overflow:clip so the
             morph reads as ONE surface reshaping, not four stacked plates spilling out. -->
        <div class="siri-aperture">
            <!-- the waveform BED — the demo-private `<SiriWaveform :level>` rides here; its
                 opacity ramps up as the island engages (dormant → active). The capability
                 ships the seam; the GL is demo-private (no library WebGL). -->
            <div class="siri-wave-bed" aria-hidden="true">
                <slot name="waveform" :level="siri.level.value" />
            </div>

            <!-- the four form CONTENT layers — one per `SIRI_FORMS` descriptor, each keyed
                 to its scalar slot + √φ scale; the CSS crossfades them against `--siri-island-t`. -->
            <div
                v-for="f in forms"
                :key="f.id"
                class="siri-form"
                :class="`siri-form--${f.id}`"
                :style="{ '--siri-slot': f.slot, '--siri-scale': f.scale }"
            >
                <slot
                    :name="f.id"
                    :form="f"
                    :level="siri.level.value"
                    :search="siri.search"
                >
                    <span class="siri-form-label">{{ f.label }}</span>
                </slot>
            </div>
        </div>
    </div>
</template>
