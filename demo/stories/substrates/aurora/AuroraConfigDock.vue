<script setup lang="ts">
import { nextTick, reactive, watch } from "vue";
import { RefreshCw } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { ConfiguratorLayer } from "@glass/components/configurator";
import { FadingScroll } from "@glass/components/fading-scroll";
import {
    resolveAtoms,
    configToAtoms,
    type AuroraConfig,
    type AuroraAtoms,
} from "@glass/components/aurora";
import AuroraColorSection from "./sections/AuroraColorSection.vue";
import AuroraCompositionSection from "./sections/AuroraCompositionSection.vue";
import AuroraMotionSection from "./sections/AuroraMotionSection.vue";
import FlowLayer from "./config/FlowLayer.vue";
import TextureLayer from "./config/TextureLayer.vue";
import CompositionLayer from "./config/CompositionLayer.vue";
import NucleiLayer from "./config/NucleiLayer.vue";

/**
 * The aurora studio controls column — ONE cohesive progressive-disclosure
 * stack, rebuilt on the library's own `<ConfiguratorLayer>` sections (B21).
 *
 * The prior surface forked into a top-level "Atoms ↔ Advanced" pill toggle:
 * a cramped flat atoms scroll on one face, a bare collapsible-stack on the
 * other. That split fragmented the control surface (the user's "janky mess,
 * doesn't have the same configurability"). The rebuild UNIFIES the two faces
 * into a single column where each section carries BOTH its few intuitive
 * knobs (the atoms — seeded FROM the preset, refining over its baseline) AND
 * its deep parameters (the raw config fields), so every historical control is
 * reachable in one scroll with a clear Color → Composition → Motion → … →
 * Nuclei hierarchy:
 *
 *   - Color        (open)      seed · harmony · energy + the per-stop OKLCh
 *                              palette editor (derive + sortable stops).
 *   - Composition  (open)      medium (+ texture + oil stroke sub-modes) ·
 *                              zones count · arrangement.
 *   - Motion       (open)      motion register + drift/breath deep sliders.
 *   - Warp & Noise (collapsed) organic boundary atom + warp/softmax/variance.
 *   - Flow         (collapsed) pattern · focal · angle · curl.
 *   - Texture      (collapsed) the full medium-texture slider bank.
 *   - Nuclei       (collapsed) the per-nucleus editor.
 *
 * Data flow (unchanged engine): the atom controls edit an `AuroraAtoms`
 * object; on any atom change `resolveAtoms(atoms, presetBaseline)` is copied
 * field-by-field onto the live `props.config`, so the ≤7-knob projection
 * REFINES the preset rather than clobbering it (the D4 seed-from-preset fix).
 * The deep sliders edit `props.config` fields directly. Both write the one
 * reactive config the canvas + preset-dirty detection read.
 */

const props = defineProps<{
    config: AuroraConfig;
    /**
     * Retained for the host's threaded layer state. The column is now a stack
     * of independently-collapsible sections (no single "active layer"), so this
     * is no longer read internally; kept on the interface so host wiring stays
     * stable.
     */
    activeLayer?: string;
    /**
     * The active preset key. A change ⇒ a genuine preset SWITCH (not an atom
     * edit): the atoms surface re-seeds FROM the new preset's config via
     * `configToAtoms`, so the atoms read the live preset and the first atom
     * touch REFINES rather than clobbering to the wispy-sky default.
     */
    presetKey?: string;
}>();

const emit = defineEmits<{
    (e: "update:activeLayer", v: string): void;
    (e: "reset"): void;
}>();

// The atom surface — the ≤7 control elements. SEEDED FROM the active preset's
// config (`configToAtoms`), so the atoms read the live preset on mount + every
// switch; editing one writes the resolved config back onto props.config.
const atoms = reactive<AuroraAtoms>(configToAtoms(props.config));

/** A stable deep snapshot of the preset BASELINE (taken on seed). The atoms
 *  resolve OVER this, so the ~21 non-atom fields the ≤7-knob projection does
 *  not carry SURVIVE every atom touch — the first edit REFINES the preset
 *  rather than clobbering it to the wispy-sky default. */
function snapshot(c: AuroraConfig): AuroraConfig {
    return JSON.parse(JSON.stringify(c)) as AuroraConfig;
}
let presetBaseline: AuroraConfig = snapshot(props.config);
// The seeded seed/harmony at baseline. The seed atom RE-DERIVES the palette
// (its purpose), so over a preset baseline we only re-derive when the user
// actually MOVES a color-source atom (seed/harmony) — an UNTOUCHED seed keeps
// the preset's hand-authored palette intact.
let seededSeed = atoms.seed;
let seededHarmony = atoms.harmony;
// The seeded zones at baseline. `configToAtoms` recovers ONLY the zone COUNT (the
// arrangement + the hand-authored nuclei coordinates are NOT recoverable — lossy by
// design), so re-resolving the zones atom over the baseline would REPLACE a preset's
// bespoke nuclei with the generic `nucleiPrior` rule-of-thirds table — the same
// lossy-recovery clobber the seed/harmony guard closes for the palette. So we only
// re-resolve zones when the user actually MOVES the count/arrangement; an UNTOUCHED
// zones atom keeps the preset's hand-authored nuclei intact (the per-preset look
// survives a first touch on a DIFFERENT atom — the W-AUR-STUDIO clobber fix).
let seededZonesCount = atoms.zones?.count;
let seededZonesArrangement = atoms.zones?.arrangement;
// The seeded medium at baseline. The medium atom's `amount` recovers ONLY
// `strokeAmount` (the shared signature knob); `applyTexture` then DERIVES the
// medium's other texture fields FROM that amount (e.g. vangogh's `impasto` and
// `canvasGrain`), which DIVERGE from a preset's hand-tuned values (Van Gogh
// authors impasto 0.48 / canvasGrain 0.03, but applyTexture would re-derive
// impasto 0.85 / canvasGrain 0.051 from the recovered strokeAmount 0.85). So an
// UNTOUCHED medium atom is stripped — the preset's hand-tuned texture fields
// survive a first touch on a DIFFERENT atom.
let seededMediumKind = atoms.medium?.kind;
let seededMediumAmount =
    atoms.medium && atoms.medium.kind !== "smooth" ? atoms.medium.amount : undefined;

/** Resolve the atoms OVER the preset baseline + copy onto the live reactive in
 *  place (preserve proxy identity so the canvas/deep layers keep reactivity). */
function applyAtoms() {
    const colorSourceMoved =
        atoms.seed !== seededSeed || atoms.harmony !== seededHarmony;
    const zonesMoved =
        atoms.zones?.count !== seededZonesCount ||
        atoms.zones?.arrangement !== seededZonesArrangement;
    const currentMediumAmount =
        atoms.medium && atoms.medium.kind !== "smooth" ? atoms.medium.amount : undefined;
    const mediumMoved =
        atoms.medium?.kind !== seededMediumKind ||
        currentMediumAmount !== seededMediumAmount;
    const next: AuroraAtoms = {
        ...atoms,
        zones: { ...atoms.zones! },
        medium: { ...atoms.medium! },
        ...(colorSourceMoved ? {} : { seed: undefined, harmony: undefined }),
        // Strip the UNTOUCHED zones atom so the baseline's hand-authored nuclei
        // survive (the lossy `configToAtoms` count-only recovery would otherwise
        // clobber them with the generic rule-of-thirds prior).
        ...(zonesMoved ? {} : { zones: undefined }),
        // Strip the UNTOUCHED medium atom so the baseline's hand-tuned texture
        // fields (impasto/canvasGrain) survive (applyTexture would otherwise
        // re-derive them from the lossy strokeAmount-only recovery).
        ...(mediumMoved ? {} : { medium: undefined }),
    };
    const resolved = resolveAtoms(next, presetBaseline);
    Object.assign(props.config, resolved);
}

// Drive the canvas whenever any atom changes (deep — the zones/medium nested
// objects). Suppressed while re-seeding FROM a preset switch (the seed is a
// config→atoms read, not an atoms→config write).
let seeding = false;
watch(
    atoms,
    () => {
        if (seeding) return;
        applyAtoms();
    },
    { deep: true },
);

/** Re-seed the atoms surface from the live config (on a genuine preset switch).
 *  The new config becomes the baseline the subsequent atom edits refine OVER. */
function reseedFromConfig() {
    seeding = true;
    presetBaseline = snapshot(props.config);
    Object.assign(atoms, configToAtoms(props.config));
    seededSeed = atoms.seed;
    seededHarmony = atoms.harmony;
    seededZonesCount = atoms.zones?.count;
    seededZonesArrangement = atoms.zones?.arrangement;
    seededMediumKind = atoms.medium?.kind;
    seededMediumAmount =
        atoms.medium && atoms.medium.kind !== "smooth" ? atoms.medium.amount : undefined;
    void Promise.resolve().then(() => {
        seeding = false;
    });
}

// A preset-key change is a genuine SWITCH — re-seed the atoms from the new
// preset's config so the atom surface is a TRUE projection of the live preset.
watch(
    () => props.presetKey,
    (next, prev) => {
        if (next !== undefined && next !== prev) reseedFromConfig();
    },
);

// Reset restores the preset baseline onto props.config in the host; re-seed the
// atoms from the reverted config so the atom surface stays a true projection.
function onReset() {
    emit("reset");
    void nextTick(reseedFromConfig);
}
</script>

<template>
    <div class="flex h-full flex-col">
        <!-- Header: section title + reset. -->
        <div
            class="flex shrink-0 items-center justify-between gap-2 border-b border-border/40 px-3 py-2.5"
        >
            <div class="flex flex-col">
                <p class="text-small font-semibold text-foreground">Aurora studio</p>
                <p class="text-micro font-mono text-muted-foreground/70">
                    {{ config.palette.length }} stops · {{ config.nuclei.length }} nuclei
                </p>
            </div>
            <Button
                variant="ghost"
                size="sm"
                class="h-7 gap-1.5 px-2 text-caption"
                aria-label="Reset current preset"
                @click="onReset"
            >
                <RefreshCw :size="12" />
                Reset
            </Button>
        </div>

        <!--
          ONE progressive-disclosure column. Each section composes the library
          `<ConfiguratorLayer>` (header label + sub + chevron + animated
          reveal). The quick sections (Color / Composition / Motion) open by
          default; the deep sections start collapsed. The `[data-aurora-atoms-
          surface]` marker rides the whole column (the served-app sentinel reads
          it); the `data-atom` anchors ride the atom controls inside the
          sections.
        -->
        <!-- BA.W-FADING-SCROLL — the vertical controls column is the scroll-STATE
             driven `<FadingScroll axis="y">`: the top edge feathers only past
             `scrollTop > 0` (sharp at rest), the bottom edge only while the
             section list overflows. The root IS the scroll port (FadingScroll--y
             sets `overflow-y: auto`); the `data-aurora-atoms-surface` sentinel +
             the layout/scrollbar utilities ride it. -->
        <!-- BA.W-CONFIG-CHASSIS.2 (CFG-2) — the `overflow-x-clip` is now a general
             cross-axis guard on the vertical scroll port, NOT the MONO-clip mechanism:
             the DERIVE chip group (AuroraColorSection) WRAPS rather than overflowing,
             so no chip is sliced. The clip stays as a defensive guard against any
             stray horizontal overflow on a vertical scroll column (no content
             depends on it to hide a clipped chip). -->
        <FadingScroll
            axis="y"
            class="flex-1 min-h-0 overflow-x-clip scrollbar-thin"
            data-aurora-atoms-surface
        >
            <ConfiguratorLayer label="Color" sub="seed · harmony · palette">
                <AuroraColorSection
                    :atoms="atoms"
                    :config="config"
                />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Composition" sub="medium · zones">
                <AuroraCompositionSection :atoms="atoms" />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Motion" sub="drift · breath">
                <AuroraMotionSection :atoms="atoms" :config="config" />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Warp & noise" sub="organic boundary" :default-open="false">
                <CompositionLayer :config="config" />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Flow" sub="pattern · focal" :default-open="false">
                <FlowLayer :config="config" />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Texture" sub="stroke · grain" :default-open="false">
                <TextureLayer :config="config" />
            </ConfiguratorLayer>

            <ConfiguratorLayer label="Nuclei" sub="per-zone editor" :default-open="false">
                <NucleiLayer :config="config" />
            </ConfiguratorLayer>
        </FadingScroll>
    </div>
</template>
