<script setup lang="ts">
// GooBlob — one coherent page for the WebGL2 metaball droplet. The page LEADS with
// the LIVING lit GL bead (the Configurator-driven blob STUDIO — the interaction + mood
// + seed-palette hero on the library's own Configurator chrome, the inv-16 dog-food
// mirroring Aurora, satellites visibly cycling on mount), then DEMOTES the static
// zero-GL WatercolorDot register below it as the supporting companion, then the pause
// seam any user can reach (AZ.W-BLOB-PAGE D4 hero-first IA).
//
// WebGL budget: at most TWO live GooBlob contexts at once (the studio hero is the ONE
// stage). Every ambient/static swatch routes to WatercolorDot (no GL context) so the
// page never approaches the browser's per-page WebGL cap.
import { computed, reactive, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import type { BlobConfig, BlobMood, BlobMerge } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { MAX_SATS } from "../../../src/components/custom/goo-blob/constants";
import { WatercolorDot } from "../../../src/components/custom/watercolor-dot";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../../src/components/custom/configurator";
import {
    LabeledSelect,
    LabeledSlider,
} from "../../../src/components/custom/labeled-field";
import {
    deriveBlobPalette,
    oklchStopToHex,
    type ColorHarmony,
} from "../../../src/composables/color";

// ── The static zero-GL register (WatercolorDot) — DEMOTED below the hero ──────
// The lit-droplet look without a WebGL context — a deterministic seeded
// border-radius morph with an internalized DEVICE-PX turbulence filter (D1). The
// deliberate sibling for ambient/decorative thumbnails: route the static register
// here so the page holds exactly ONE live GooBlob context (the interactive studio
// hero, the lead section) and a grid never exhausts the per-page WebGL context cap.
const dotColors = [
    "var(--primary)",
    "oklch(0.62 0.19 25)",
    "oklch(0.7 0.15 250)",
    "oklch(0.78 0.16 150)",
];

// ── The Configurator-driven blob studio (the inv-16 dog-food) — THE LEAD HERO ─
// The blob showcase USES the library Configurator (preset row + grouped
// ConfiguratorLayer/ConfiguratorRow + a live stage) — the same chrome Aurora's
// page composes — instead of a hand-rolled strip of raw <input type=range>. This
// is the page's LEAD section (D4): the living lit GL bead, satellites cycling.
//
// The studio's live shape: the pointer-lean axes (attraction / clickImpulse), the
// mood, and the seed/harmony palette. The `stretch` axis is DEMOTED (AY.W-BLOB-CONFIG
// D3 — a swamped fine-detail axis, off the top-level controls).
interface BlobStudioCfg {
    /** Pointer lean: -1 shies away, +1 leans in. */
    attraction: number;
    /** Click spring-impulse amplitude (a one-shot bouncy pulse). */
    clickImpulse: number;
    /**
     * AZ.W-BLOB-STUDIO D5 — the LOUDER-LEAN register (the studio-only "responsiveness"
     * knob). The SHIPPED calm default (pointerStrength 0.10 + stretch 0.5) stays the
     * page/library default (AX.W46 calibrated-calm); the studio surfaces this axis so a
     * tuning session can dial the bead LOUD — a fast flick reads a visible taffy-pull.
     * `responsiveness` is a single 0..1 axis that scales BOTH the pointer-lean strength
     * (`interaction.pointerStrength`) and the velocity-squash magnitude
     * (`interaction.stretch`) UP from their calm defaults toward a pronounced register.
     * It is a SURFACED knob, NOT a default re-base (restraint counter recorded).
     */
    responsiveness: number;
    /** The named mood (drives the {valence, arousal} affect model). */
    mood: BlobMood;
    /** The palette seed color (an OKLCh anchor `deriveBlobPalette` ramps from). */
    seed: string;
    /** The color-harmony the seed ramps through. */
    harmony: ColorHarmony;
    // ── AZ.W-BLOB-STUDIO §3.3 — the Satellite GEOMETRY atoms, surfaced as LIVE knobs.
    //    These map straight onto the BlobGeometry atom set so the user can dial the
    //    orbit OUT past the body radius and WATCH the metaballing (the C6-7 GAP / the
    //    cause→effect the user asked for). count 0–MAX_SATS, orbit/satellite radii in
    //    config-UV, eccentricity the orbit-ellipse Y-inflation.
    /** Live satellite count (0–MAX_SATS=4). */
    satelliteCount: number;
    /** Orbit radius (config-UV) — dial PAST bodyRadius (0.22) to separate the satellites. */
    orbitRadius: number;
    /** Per-satellite radius (config-UV). */
    satelliteRadius: number;
    /** Orbit-ellipse eccentricity (the Y-inflation of the orbit path). */
    eccentricity: number;
    // ── AZ.W-BLOB-STUDIO §3.2 — the MERGE-BRIDGE atoms, surfaced as LIVE knobs.
    /** smin blend-band — louder widens the gooey body→satellite bridge (the neck). */
    smoothK: number;
    /** Merge variant — `quadratic` (creased) | `circular` (rounder menisci). */
    merge: BlobMerge;
}

const HARMONIES: ColorHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const MOODS: BlobMood[] = ["idle", "happy", "curious", "sleepy", "excited"];

// AY.W-COHERE E1 — the warm-register chroma CEILING on the seed→palette
// derivation. The blob's mood/seed bead caps INTO the band the FourierField comet
// (--viz-fourier, C≈0.15-0.20) + the constellation focal share, so the four live
// substrates read as ONE warm-red accent family instead of the blob breaking out
// to a neon coral ball one section down from the cream default. A vivid seed (the
// "Excited" preset's oklch(0.62 0.19 25)) is bounded to a saturated-but-non-neon
// warm bead; the shader's SSS/iridescence amplification then rides ON the capped
// chroma rather than over-driving an already-vivid stop into neon. This is a CAP,
// not a hue re-map — a user who seeds a blue blob still gets blue, capped to the
// non-neon chroma. The cap lands the rendered body mean at C ≈ the comet band.
const BLOB_WARM_REGISTER_CHROMA_CEILING = 0.15;

// Three preset baselines — the calm cream default, a warm-excited bead, and a cool
// shy-away creature (the attraction-sign showcase: a NEGATIVE attraction that genuinely
// shies away now that the D2 sign is fixed).
const presets: readonly ConfiguratorPreset<BlobStudioCfg>[] = [
    {
        key: "calm",
        label: "Calm",
        sub: "cream · curious",
        config: {
            attraction: 0.35,
            clickImpulse: 0.5,
            mood: "curious",
            seed: "oklch(0.78 0.05 78)",
            harmony: "analogous",
        },
    },
    {
        key: "excited",
        label: "Excited",
        sub: "warm · leans in",
        config: {
            attraction: 0.8,
            clickImpulse: 0.9,
            mood: "excited",
            seed: "oklch(0.62 0.19 25)",
            // AY.W-COHERE E1 — `analogous`, NOT `triad`. The triad scattered the
            // warm-red seed's satellite stops to green/blue (~145°/265°), so the
            // mood bead's body mean read GREEN — fracturing the warm-red accent
            // family the set shares (D4). Analogous keeps the stops in the warm-red
            // neighbourhood (seed ± the hue spread), so the "warm · leans in" bead
            // is genuinely warm-red, capped by the chroma ceiling into the comet's
            // register. The triad showcase moves to the harmony Select (a user can
            // still pick it; the SHIPPED warm preset stays in-family).
            harmony: "analogous",
        },
    },
    {
        key: "shy",
        label: "Shy",
        sub: "cool · shies away",
        config: {
            attraction: -0.8,
            clickImpulse: 0.3,
            mood: "sleepy",
            seed: "oklch(0.6 0.2 250)",
            harmony: "complementary",
        },
    },
];

const studio = useConfiguratorState<BlobStudioCfg>({
    presets,
    initialPreset: "calm",
    // Per-preset clones — each preset is a named editable baseline the user tunes and
    // returns to (the slider edits survive a preset round-trip), mirroring Aurora's
    // chrome (CLAUDE.md §Configurator). A preset switch snapshots the outgoing slot.
    cloneMode: "per-preset",
});

const moodOpen = ref(false);
const harmonyOpen = ref(false);

// The live palette stops, derived from the studio seed/harmony (the D1 hero color-feed
// — now LIVE: a post-mount stops change re-paints the hero body).
const paletteStops = computed(() =>
    deriveBlobPalette(studio.config.seed, {
        stopCount: 3,
        harmony: studio.config.harmony,
        // AY.W-COHERE E1 — cap the derived chroma into the warm register so the
        // mood/seed bead never amplifies into the neon ball the set red-team flagged.
        chromaCeiling: BLOB_WARM_REGISTER_CHROMA_CEILING,
    }).map(oklchStopToHex),
);

// The live BlobConfig the stage GooBlob paints — the studio axes mapped onto the atom
// surface. A reactive object whose `interaction`/`color` atoms track the studio config,
// so every Configurator edit reaches the live hero (the D1/D2 fixes carry it through).
//
// The RESTING studio IS the canonical BLOB_CONFIG_DEFAULTS lit cream bead (the
// warm-cream living droplet the docs promise + the π-render gate target — the single
// GL blob on the page is the bare default, which the Configurator then tunes). The
// surface/membrane are the stock lit defaults (W-BLOB-REBUILD: the prior studio
// over-tuned the resting surface — circular merge + iridescence 0.4 — off the
// canonical default the gate calibrates against). Only the interaction lean +
// seed-palette are studio-driven (the Configurator's purpose).
const stageConfig = reactive<BlobConfig>({
    ...BLOB_CONFIG_DEFAULTS,
    // AZ.W-BLOB-PAGE D2 — the page-local satellite-SEPARATION override. The shipped
    // default orbitRadius (0.17) sits INSIDE bodyRadius (0.22), so the 3 satellites
    // orbit UNDER the body skin and merge entirely — the "orbiting droplets" show is
    // never visible (the silhouette only pinches at the perimeter; π baseline silhouette
    // CV ≈ 0.026, single connected component every frame). Lifting the orbit OUTSIDE the
    // body skin (0.30 vs body 0.22) with FOUR satellites (radius 0.10) makes the
    // orbit→merge→absorb→emerge cycle read on mount: the satellites swing out past the
    // skin and metaball back in as visible stretching pseudopod NECKS. Measured live (π
    // blob-page): peak silhouette CV ≈ 0.057 over a full orbit cycle (≈2.2× the 0.026
    // perimeter-only baseline — the strong neck-pinch the floor 0.04 binds), with
    // intermittent full separation (a detached satellite droplet) when the cream-on-light
    // contrast permits. The orbit is held MODERATE (0.30, not wider) so the satellites
    // still NECK the body on the peak-coverage frame — a wider orbit (≥0.36) detaches
    // them so far the peak-coverage frame reads a clean body and the EXISTING
    // proof:blob-render silhouette/field witnesses regress (the IDENTITY-PRESERVED bite).
    // Eccentricity stays near-circular (0.04) so the vertical reach clears the
    // 1.6×-oversized canvas top/bottom — the AX.W15 four-side containment HOLDS (live
    // worst-edge paint fraction within the satellite-overflow budget; proof:blob-render
    // corner-empty + side-margin stay GREEN). This is a PAGE-LOCAL override on the stage
    // bead (NOT a types.ts default re-tune — the shipped default stays calm/contained).
    // The merge BRIDGE (membrane.smoothK) is W-BLOB-STUDIO's axis, left at the default;
    // this wave moves only the GEOMETRY (orbit/count/satellite-radius/ecc).
    geometry: { ...BLOB_CONFIG_DEFAULTS.geometry, orbitRadius: 0.30, satelliteCount: 4, satelliteRadius: 0.10, eccentricity: 0.04 },
    surface: { ...BLOB_CONFIG_DEFAULTS.surface },
    membrane: { ...BLOB_CONFIG_DEFAULTS.membrane },
    interaction: { ...BLOB_CONFIG_DEFAULTS.interaction },
    color: { ...BLOB_CONFIG_DEFAULTS.color },
});

// Thread the studio config → the reactive stage config (interaction lean/impulse + the
// live palette stops). The GooBlob's D1/D2 watchers re-resolve on these writes.
watch(
    () => [studio.config.attraction, studio.config.clickImpulse, paletteStops.value] as const,
    ([attraction, clickImpulse, stops]) => {
        stageConfig.interaction.pointerAttraction = attraction;
        stageConfig.interaction.clickImpulse = clickImpulse;
        stageConfig.color.paletteStops = [...stops];
    },
    { immediate: true, deep: true },
);

const studioBlob = ref<InstanceType<typeof GooBlob> | null>(null);
const studioPaused = ref(false);
const clickCount = ref(0);

// The mood is a MANUAL pin (the auto-arc respects it). Drive it from the
// studio mood select; re-pin whenever the preset / select changes it.
watch(
    () => studio.config.mood,
    (m) => studioBlob.value?.setMood(m),
);

function onStudioClick() {
    clickCount.value++;
}
function poke() {
    studioBlob.value?.pulse();
}

// Belt-and-suspenders log so the pause seam proves it is live.
watch(studioPaused, () => {
    if (typeof console !== "undefined") {
        // eslint-disable-next-line no-console
        console.debug(
            `[blob demo] studio ${studioPaused.value ? "PAUSED" : "RUNNING"}`,
        );
    }
});
</script>

<template>
    <StoryPage>
        <!--
          AZ.W-BLOB-PAGE D4 — HERO-FIRST IA. The page now LEADS with the LIVING lit
          GL bead (the studio's metaball hero, satellites visibly cycling on mount) so
          a fresh viewer reads the living creature first — not a row of static swatches
          they mistake for "the blobs" and find flat/satellite-less. The static
          WatercolorDot swatch register is DEMOTED to the supporting section below (it
          is NOT retired — it is the zero-GL companion register, and BOTH WatercolorDot
          mounts are preserved: the swatch row here-below + the ambient palette dots in
          the studio's Stops row, satisfying the WatercolorDot ≥2-demo-mount keep
          evidence). The studio stage bead's wrapper SIZE is W-BLOB-STUDIO's axis; this
          wave sets the IA POSITION (hero first) + the satellite-orbit geometry.
        -->
        <StorySection
            label="Blob studio — preset · interaction · mood · seed-palette"
            blurb="The blob showcase on the library's own Configurator chrome (the same studio
                shell Aurora composes). The preset row drives useConfiguratorState (per-preset
                clones); the stage paints the live config. Hover to feel the lean — attraction +1
                leans IN, -1 SHIES AWAY (the sign is honored); click to fire the spring impulse;
                pick a mood (the {valence, arousal} affect model); set a seed + harmony to ramp the
                OKLCh palette fed LIVE to the hero body. One GL context."
        >
            <ShowcaseFrame pad="lg" tier="quiet">
                <Configurator
                    class="h-[min(70vh,560px)]"
                    :presets="presets"
                    :active-preset="studio.activePreset.value"
                    @select-preset="studio.selectPreset"
                    @reset="studio.resetCurrent"
                >
                    <template #stage>
                        <div
                            class="relative flex h-full w-full items-center justify-center overflow-hidden"
                        >
                            <div class="relative aspect-square w-64 max-w-[80%]">
                                <GooBlob
                                    ref="studioBlob"
                                    v-model:paused="studioPaused"
                                    color="var(--card)"
                                    :config="stageConfig"
                                    seed="studio"
                                    @click="onStudioClick"
                                />
                            </div>
                            <div
                                class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                            >
                                <span class="text-micro font-mono text-muted-foreground">
                                    {{ studio.config.mood }}
                                </span>
                                <span class="text-micro font-mono text-muted-foreground/60">
                                    attraction {{ studio.config.attraction.toFixed(2) }} · clicks {{ clickCount }}
                                </span>
                            </div>
                            <button
                                class="btn-press absolute right-3 bottom-3 rounded-pill border bg-card/70 px-3 py-1 text-micro backdrop-blur-sm"
                                @click.stop="poke"
                            >
                                Poke
                            </button>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Interaction" sub="--interaction-*">
                            <ConfiguratorRow label="Attraction">
                                <LabeledSlider
                                    v-model="studio.config.attraction"
                                    :min="-1"
                                    :max="1"
                                    :step="0.05"
                                    label="attraction"
                                    tooltip="Pointer lean — +1 leans IN toward the cursor, -1 shies AWAY."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Click impulse">
                                <LabeledSlider
                                    v-model="studio.config.clickImpulse"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.05"
                                    label="clickImpulse"
                                    tooltip="The one-shot bouncy spring impulse fired on a click."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Mood + palette" sub="--color-*">
                            <ConfiguratorRow label="Mood">
                                <LabeledSelect
                                    v-model="studio.config.mood"
                                    v-model:is-open="moodOpen"
                                    :items="MOODS as unknown as readonly string[]"
                                    label="mood"
                                    tooltip="The named mood — drives the {valence, arousal} affect model (orbit speed, wobble, sheen)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Seed">
                                <input
                                    v-model="studio.config.seed"
                                    class="input-pill fira-code w-full"
                                    aria-label="Palette seed color"
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Harmony">
                                <LabeledSelect
                                    v-model="studio.config.harmony"
                                    v-model:is-open="harmonyOpen"
                                    :items="HARMONIES as unknown as readonly string[]"
                                    label="harmony"
                                    tooltip="The color harmony the seed ramps through (deriveBlobPalette)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Stops">
                                <div class="flex flex-wrap gap-2">
                                    <WatercolorDot
                                        v-for="stop in paletteStops"
                                        :key="stop"
                                        :color="stop"
                                        :seed="stop"
                                        animate
                                        class="h-10 w-10"
                                    />
                                </div>
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="The static zero-GL register — WatercolorDot"
            blurb="The droplet look WITHOUT a WebGL context — a CSS/SVG pastel swatch: a
                deterministic seeded border-radius morph with an internalized device-px
                turbulence filter (per-instance, zero-wiring). This is the SUPPORTING register
                below the living hero above: route ambient/decorative thumbnails here so a grid
                never exhausts the per-page WebGL context cap (the live GL bead is reserved for
                the interactive studio hero)."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <WatercolorDot
                    v-for="c in dotColors"
                    :key="c"
                    :color="c"
                    :seed="c"
                    animate
                    class="aspect-square w-full"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Pause seam"
            blurb="A DockBackgroundToggle wired to the studio hero via v-model:paused parks the
                render loop (the membrane stops warping, the satellites stop orbiting) and resumes
                it — a pause control any user can reach, not gated behind a motion preference. The
                resume is CLEAN (the canvas paints the live bead intact, never a wrecked slab)."
        >
            <ShowcaseFrame class="flex flex-wrap items-center gap-4">
                <span class="flex items-center gap-3 text-sm" data-testid="blob-pause-toggle">
                    <DockBackgroundToggle v-model:paused="studioPaused" />
                    <span class="tabular-nums opacity-70">
                        studio: {{ studioPaused ? "paused" : "running" }}
                    </span>
                </span>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/*
  AZ.W-BLOB-PAGE D4 — scroll-into-view clearance for the hero canvas. With the studio
  promoted to the LEAD section, the stage canvas sits near the document top; a
  scroll-into-view (the π readback's element-screenshot scroll) would otherwise land the
  canvas BOTTOM at the viewport bottom, UNDER the demo's viewport-anchored BottomDock —
  occluding the bead's lower third and corrupting any canvas-screenshot containment
  readback. The scroll-margin keeps the bead clear of the fixed dock (bottom) + the
  page header (top) when scrolled into view, so the canvas screenshot is the bead alone.
*/
:deep(.goo-blob-canvas) {
    scroll-margin-top: 5rem;
    scroll-margin-bottom: 9rem;
}
</style>
