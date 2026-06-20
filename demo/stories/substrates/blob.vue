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
import { FadingScroll } from "../../../src/components/custom/fading-scroll";
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
    LabeledSwitch,
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
// Warm-cream identity palette (BC.W-VIZ-WATERCOLOR §E / BC.W-TEAL-NAVY-PURGE — NO
// teal-on-navy reference; the demo default is the warm amber/cream/coral family, hue
// ~30-70). A consumer brings its OWN palette (presets-in-consumers); the dot bakes no
// hue (it takes `color` as a prop) so it is compliant by construction — the warm
// default is asserted here.
const dotColors = [
    "var(--primary)",
    "oklch(0.72 0.15 55)", // warm amber
    "oklch(0.66 0.17 35)", // terracotta coral
    "oklch(0.82 0.1 75)", // pale cream-gold
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
     * page/library default (the calibrated-calm register); the studio surfaces this axis so a
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
    // ── BC.W-GOOBLOB-MEATBALL §6 Surface — the STAGE-2 lit/shadow axes, surfaced LIVE.
    /** Lit-glass surface (Blinn-Phong glint + Fresnel rim) — STAGE-2 dressing. */
    lit: boolean;
    /** The procedural 2D SDF soft contact shadow following the silhouette (STAGE-2). */
    shadow: boolean;
    /** Soft-shadow penumbra hardness (4–48; a higher value = a harder penumbra). */
    shadowSoftness: number;
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
const MERGES: BlobMerge[] = ["quadratic", "circular"];

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
// The shared GEOMETRY baseline the studio presets seed from — the orbit-OUTSIDE-body
// separation geometry (orbit 0.30 > body 0.22, 4 satellites, radius 0.10, near-circular
// ecc) that makes the metaball orbit→merge→absorb→emerge show read on the LARGE hero
// (the same separation W-BLOB-PAGE lands on the page default, here a per-preset baseline
// the user dials live). The merge bridge: the studio seeds a modestly LOUDER smoothK
// (0.06) than the lean-safe library default (0.05) — a PAGE-LOCAL override (like
// W-BLOB-PAGE's orbit override) so the STUDIO bead shows a WIDER gooey bridge (the §6
// merge-bridge-rounder read) while staying under the gated calm-lean ceiling
// (the studio bead IS the gated page bead — one GL context — so the studio smoothK is
// bounded by the same lean-centroid ceiling the library default is; 0.06 + circular
// measures lean ≈ 0.099, clear of the 0.10 ceiling, while 0.08 over-inflated it). The
// LIVE smoothK knob (0.02–0.16) lets a tuning session dial the bridge much WIDER to WATCH
// the neck — the gate only bounds the RESTING/auto-flick default, not the user's dial.
// The `circular` merge variant is the library default (the C6-6 rounder-menisci re-base,
// lean-safe); the studio inherits it.
const STUDIO_GEO_BASE = {
    satelliteCount: 4,
    // The orbit stays at 0.30 (> bodyRadius 0.22 — the orbit-outside-body
    // relationship + the four-side containment ceiling both
    // hold; lower than 0.30 inflated the merged footprint past containment). The
    // BA.W-GOO-REDRESS bridge-hold is carried NOT by tightening this orbit but by
    // the worst-case smin band widen (uploadBlobUniforms.ts) + the capped
    // per-satellite orbit-random/wobble envelope (useBlobSatellites.ts), which
    // keep the satellite near-edge inside the smin reach across the WHOLE orbit so
    // the gooey neck is the DEFAULT visible state (single connected silhouette,
    // high-CV necking pseudopod) — the satellite never floats as an unrelated disc.
    orbitRadius: 0.3,
    satelliteRadius: 0.1,
    eccentricity: 0.04,
    smoothK: 0.06,
    merge: BLOB_CONFIG_DEFAULTS.membrane.merge,
    // BC.W-GOOBLOB-MEATBALL — the STAGE-2 lit/shadow surface baseline (the meatball
    // default: lit-glass ON, the procedural soft contact shadow ON, mid-penumbra).
    lit: BLOB_CONFIG_DEFAULTS.surface.lit,
    shadow: BLOB_CONFIG_DEFAULTS.surface.shadow,
    shadowSoftness: BLOB_CONFIG_DEFAULTS.surface.shadowSoftness,
} as const;

const presets: readonly ConfiguratorPreset<BlobStudioCfg>[] = [
    {
        key: "calm",
        label: "Calm",
        sub: "cream · curious",
        config: {
            attraction: 0.35,
            clickImpulse: 0.5,
            responsiveness: 0,
            mood: "curious",
            seed: "oklch(0.78 0.05 78)",
            harmony: "analogous",
            ...STUDIO_GEO_BASE,
        },
    },
    {
        key: "excited",
        label: "Excited",
        sub: "warm · leans in",
        config: {
            attraction: 0.8,
            clickImpulse: 0.9,
            // The excited preset reaches the louder lean register — a lively bead that
            // leans HARD and taffy-pulls on a flick (the D5 surfaced register in use).
            responsiveness: 0.7,
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
            ...STUDIO_GEO_BASE,
        },
    },
    {
        key: "shy",
        label: "Shy",
        sub: "cool · shies away",
        config: {
            attraction: -0.8,
            clickImpulse: 0.3,
            responsiveness: 0.2,
            mood: "sleepy",
            seed: "oklch(0.6 0.2 250)",
            harmony: "complementary",
            ...STUDIO_GEO_BASE,
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
const mergeOpen = ref(false);

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
// AZ.W-BLOB-STUDIO §3.5 — the louder-lean register mapping. `responsiveness` (0..1) is
// the studio-only knob; it scales the SHIPPED calm interaction defaults UP toward a
// pronounced register. pointerStrength rides 0.10 (calm default) → 0.45 (a loud lean the
// whole creature follows); stretch rides 0.5 (the swamped-whisper default) → 2.0 (a
// visible taffy-pull — the shader's tanh saturation caps the elongation at 1+stretch, so
// stretch 2.0 gives up to ~3× elongation on a fast flick where 0.5 reads at the noise
// floor). The CALM preset (responsiveness 0) is byte-identical to the library default;
// the louder register is reached ONLY by dialing the knob (NOT a default re-base — the
// shipped page/library default stays the calibrated-calm register). Restraint counter:
// ONE surfaced axis, no parallel uncoupling path (the existing stretch axis is the
// velocity-squash channel — this just gives the studio a louder ceiling to reach it).
const CALM_POINTER_STRENGTH = BLOB_CONFIG_DEFAULTS.interaction.pointerStrength; // 0.10
const CALM_STRETCH = BLOB_CONFIG_DEFAULTS.interaction.stretch; // 0.5
function leanStrength(r: number): number {
    return CALM_POINTER_STRENGTH + r * (0.45 - CALM_POINTER_STRENGTH);
}
function leanStretch(r: number): number {
    return CALM_STRETCH + r * (2.0 - CALM_STRETCH);
}

const stageConfig = reactive<BlobConfig>({
    ...BLOB_CONFIG_DEFAULTS,
    // The stage bead's geometry/membrane/interaction are STUDIO-DRIVEN (the live knobs
    // below). Seed the reactive atoms from the initial (calm) preset's values so the
    // mount paints the studio's separation geometry (orbit 0.30 OUTSIDE body 0.22, 4
    // satellites) reading the metaball orbit→merge→absorb→emerge show on the LARGE hero
    // — the SAME separation W-BLOB-PAGE lands on the page default (W-BLOB-PAGE owns the
    // page-IA position + the page-default orbit; this wave owns the studio's live
    // geometry knobs that drive THIS hero mount). The watch below threads every studio
    // edit onto these atoms. Surface/color start at the canonical lit-cream defaults; the
    // membrane smoothK/merge start at the new 0.09/circular library default the studio
    // knobs then retune. The four-side containment HOLDS at the seed geometry (the same
    // corner-empty/side-margin witnesses the page bead measured green).
    geometry: {
        ...BLOB_CONFIG_DEFAULTS.geometry,
        orbitRadius: studio.config.orbitRadius,
        satelliteCount: studio.config.satelliteCount,
        satelliteRadius: studio.config.satelliteRadius,
        eccentricity: studio.config.eccentricity,
    },
    surface: {
        ...BLOB_CONFIG_DEFAULTS.surface,
        lit: studio.config.lit,
        shadow: studio.config.shadow,
        shadowSoftness: studio.config.shadowSoftness,
    },
    membrane: {
        ...BLOB_CONFIG_DEFAULTS.membrane,
        smoothK: studio.config.smoothK,
        merge: studio.config.merge,
    },
    interaction: {
        ...BLOB_CONFIG_DEFAULTS.interaction,
        pointerStrength: leanStrength(studio.config.responsiveness),
        stretch: leanStretch(studio.config.responsiveness),
    },
    color: { ...BLOB_CONFIG_DEFAULTS.color },
});

// Thread the studio config → the reactive stage config. Every studio axis writes the
// corresponding atom so each Configurator edit reaches the live hero (the D1/D2 watchers
// re-resolve on these writes). Interaction lean/impulse + the louder-lean register, the
// live geometry (count/orbit/satellite-radius/ecc — the C6-7 cause→effect knobs), the
// merge bridge (smoothK/merge), and the live palette stops.
watch(
    () =>
        [
            studio.config.attraction,
            studio.config.clickImpulse,
            studio.config.responsiveness,
            studio.config.satelliteCount,
            studio.config.orbitRadius,
            studio.config.satelliteRadius,
            studio.config.eccentricity,
            studio.config.smoothK,
            studio.config.merge,
            studio.config.lit,
            studio.config.shadow,
            studio.config.shadowSoftness,
            paletteStops.value,
        ] as const,
    ([attraction, clickImpulse, responsiveness, satCount, orbit, satRadius, ecc, smoothK, merge, lit, shadow, shadowSoftness, stops]) => {
        stageConfig.interaction.pointerAttraction = attraction;
        stageConfig.interaction.clickImpulse = clickImpulse;
        stageConfig.interaction.pointerStrength = leanStrength(responsiveness);
        stageConfig.interaction.stretch = leanStretch(responsiveness);
        stageConfig.geometry.satelliteCount = satCount;
        stageConfig.geometry.orbitRadius = orbit;
        stageConfig.geometry.satelliteRadius = satRadius;
        stageConfig.geometry.eccentricity = ecc;
        stageConfig.membrane.smoothK = smoothK;
        stageConfig.membrane.merge = merge;
        stageConfig.surface.lit = lit;
        stageConfig.surface.shadow = shadow;
        stageConfig.surface.shadowSoftness = shadowSoftness;
        stageConfig.color.paletteStops = [...stops];
    },
    { immediate: true, deep: true },
);

// BC.W-GOOBLOB-PLAIN — the STAGE-1 plain-blob register. The first-principles floor:
// the canonical separation geometry (orbit 0.30 OUTSIDE body 0.22, 4 satellites) so the
// orbit→merge→absorb→emerge meatball show reads, with `variant: "blob"` setting the
// shader's `uStage` gate to the shadowless lightless fill-only path (NO lit dressing —
// the teaching contrast with the lit studio hero above). `surface.lit` is left at the
// default; the `uStage` gate strips the lit block regardless.
const plainConfig: BlobConfig = {
    ...BLOB_CONFIG_DEFAULTS,
    variant: "blob",
    geometry: {
        ...BLOB_CONFIG_DEFAULTS.geometry,
        satelliteCount: 4,
        orbitRadius: 0.3,
        satelliteRadius: 0.1,
        eccentricity: 0.04,
    },
    membrane: {
        ...BLOB_CONFIG_DEFAULTS.membrane,
        smoothK: 0.06,
    },
};

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
        <!-- BB.W-SUFFUSE3 (b) — the studio title at the DISPLAY register with the
             --motion-accent violet as the ONE color text-event (the studio's
             unifying identity on the masthead, never a body <p>/<h2>). -->
        <header class="flex flex-col gap-1">
            <span class="section-label">Substrates · Blob Studio</span>
            <span
                class="text-display-3 font-display leading-tight"
                :style="{ color: 'var(--motion-accent)' }"
            >
                Blob Studio
            </span>
        </header>

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
                    <!--
                      AZ.W-BLOB-STUDIO §3.6 — the PRIMARY preset affordance (the weighted
                      preset row). The default Configurator preset row is plain `text-xs
                      font-medium` chips; the studio overrides the `#presets` slot to make
                      the preset row read as the TOP of the hierarchy: a larger weighted
                      label + the preset's `sub` descriptor visible inline, the active chip
                      a glass-tier pill (the glass-first selected register) — the preset is
                      the first thing the eye lands on, then the layered sliders below.
                    -->
                    <template #presets="{ presets: ps, activePreset }">
                        <FadingScroll
                            axis="x"
                            class="flex gap-2 scrollbar-hidden"
                            role="tablist"
                            aria-label="Blob presets"
                        >
                            <button
                                v-for="p in ps"
                                :key="p.key"
                                type="button"
                                role="tab"
                                :aria-selected="p.key === activePreset"
                                :data-active="p.key === activePreset || undefined"
                                :class="[
                                    'tap-squish focus-ring transition-control flex shrink-0 flex-col items-start gap-0.5 rounded-panel border px-3.5 py-2 text-left',
                                    p.key === activePreset
                                        ? 'glass-quiet border-border/60 text-foreground'
                                        : 'border-border/40 bg-card/40 text-foreground hover:bg-card/70',
                                ]"
                                @click="studio.selectPreset(p.key)"
                            >
                                <span class="text-small font-semibold leading-tight">{{ p.label }}</span>
                                <span
                                    v-if="p.sub"
                                    class="text-micro font-mono leading-tight text-muted-foreground"
                                    >{{ p.sub }}</span
                                >
                            </button>
                        </FadingScroll>
                    </template>
                    <template #stage>
                        <div
                            class="relative flex h-full w-full items-center justify-center overflow-hidden"
                        >
                            <!--
                              AZ.W-BLOB-STUDIO §3.1 (D1) + AZ.W-BLOB-REDRESS — the LARGE
                              centered hero, sized off the SMALLER stage axis so it stays a
                              true SQUARE with margin on BOTH axes regardless of the stage's
                              aspect. The prior `h-[min(78%,30rem)] max-w-[88%]` drove the
                              square off HEIGHT alone, so on a PORTRAIT stage (the mobile
                              single-column band, stage 240w × 288h) the `max-w-[88%]` width
                              cap (211px) clamped BELOW the 225px height — the box went
                              NON-square and the 1.6×-overflow canvas clipped tight to the
                              wrapper, pushing the orbiting satellites onto the frame edge
                              (the four-side containment check read 0.97 — red). Now
                              the box wants full width but is capped at `max-w`/`max-h` (78%
                              of each axis, ≤30rem), and `aspect-square` resolves it to the
                              LARGEST square fitting both caps = min(78% w, 78% h) — so the
                              necking satellites keep their margin on every viewport.
                            -->
                            <div
                                class="relative aspect-square w-full max-h-[78%] max-w-[min(78%,30rem)]"
                            >
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
                    <!--
                      AZ.W-BLOB-STUDIO §3.6 — the primary→secondary→tertiary hierarchy.
                      `dividers` enabled on every layer (the per-section hairline), and
                      the layer ORDER reads top-down by importance: PRIMARY Interaction
                      (how the creature responds to YOU — the first axis a tuning session
                      reaches), SECONDARY Mood + palette (its affect + color identity),
                      TERTIARY Geometry / Satellites (the structural geometry the user
                      dials to WATCH the metaballing — the deepest knob).
                    -->
                    <template #controls>
                        <ConfiguratorLayer label="Interaction" sub="--interaction-*" dividers>
                            <ConfiguratorRow label="Attraction" name="attraction">
                                <LabeledSlider
                                    v-model="studio.config.attraction"
                                    :min="-1"
                                    :max="1"
                                    :step="0.05"
                                    label="Attraction"
                                    hide-label
                                    tooltip="Pointer lean — +1 leans IN toward the cursor, -1 shies AWAY."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Click impulse" name="clickImpulse">
                                <LabeledSlider
                                    v-model="studio.config.clickImpulse"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.05"
                                    label="Click impulse"
                                    hide-label
                                    tooltip="The one-shot bouncy spring impulse fired on a click."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Responsiveness" name="responsiveness">
                                <LabeledSlider
                                    v-model="studio.config.responsiveness"
                                    :min="0"
                                    :max="1"
                                    :step="0.05"
                                    label="Responsiveness"
                                    hide-label
                                    tooltip="The LOUDER-lean register — scales the pointer-lean strength + the velocity squash-stretch UP from the calm default. At 1 a fast flick reads a visible taffy-pull; 0 is the shipped calm bead."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Mood + palette" sub="--color-*" dividers>
                            <ConfiguratorRow label="Mood" name="mood">
                                <LabeledSelect
                                    v-model="studio.config.mood"
                                    v-model:is-open="moodOpen"
                                    :items="MOODS as unknown as readonly string[]"
                                    label="Mood"
                                    hide-label
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
                            <ConfiguratorRow label="Harmony" name="harmony">
                                <LabeledSelect
                                    v-model="studio.config.harmony"
                                    v-model:is-open="harmonyOpen"
                                    :items="HARMONIES as unknown as readonly string[]"
                                    label="Harmony"
                                    hide-label
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
                        <!--
                          BC.W-GOOBLOB-MEATBALL §6 Surface — the STAGE-2 lit/shadow axes
                          surfaced LIVE: the lit-glass dressing, the procedural soft contact
                          shadow that follows the silhouette, and the penumbra-hardness slider.
                          Toggling shadow OFF reveals the un-grounded creature; the softness
                          slider widens/tightens the contact band.
                        -->
                        <ConfiguratorLayer label="Surface (STAGE 2)" sub="--surface-*" dividers>
                            <ConfiguratorRow label="Lit glass" name="lit">
                                <LabeledSwitch
                                    v-model:checked="studio.config.lit"
                                    label="Lit glass"
                                    hide-label
                                    tooltip="The lit-glass dressing (Blinn-Phong glint + Fresnel rim) — the STAGE-2 surface."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Soft shadow" name="shadow">
                                <LabeledSwitch
                                    v-model:checked="studio.config.shadow"
                                    label="Soft shadow"
                                    hide-label
                                    tooltip="The procedural 2D SDF soft contact shadow following the irregular silhouette (NOT a hard disc shadow)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Shadow softness" name="shadowSoftness">
                                <LabeledSlider
                                    v-model="studio.config.shadowSoftness"
                                    :min="4"
                                    :max="48"
                                    :step="1"
                                    label="Shadow softness"
                                    hide-label
                                    tooltip="The penumbra hardness — higher is a harder, tighter shadow band."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <!--
                          AZ.W-BLOB-STUDIO §3.3 + §3.2 — the TERTIARY Geometry / Satellites
                          layer. The C6-7 GAP: the satellite/orbit geometry was unsurfaced,
                          so the user could never dial the orbit out and WATCH the
                          metaballing. These four geometry knobs + the two merge-bridge
                          knobs make the orbit→merge→absorb→emerge cause→effect a LIVE
                          tuning experience: raise Orbit past the body radius (0.22) and the
                          satellites separate into orbiting droplets; widen smoothK and the
                          body→satellite bridge stretches a gooey NECK as a satellite
                          metaballs in (circular merge rounds the seam crease).
                        -->
                        <ConfiguratorLayer label="Geometry / Satellites" sub="--geometry-* · --membrane-*" dividers>
                            <ConfiguratorRow label="Satellites" name="satelliteCount">
                                <LabeledSlider
                                    v-model="studio.config.satelliteCount"
                                    :min="0"
                                    :max="MAX_SATS"
                                    :step="1"
                                    label="Satellites"
                                    hide-label
                                    tooltip="How many satellites orbit the body (0–4)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Orbit radius" name="orbitRadius">
                                <LabeledSlider
                                    v-model="studio.config.orbitRadius"
                                    :min="0.1"
                                    :max="0.42"
                                    :step="0.01"
                                    label="Orbit radius"
                                    hide-label
                                    tooltip="The orbit radius. Body radius is ~0.22 — dial PAST it to separate the satellites into orbiting droplets and WATCH the metaballing."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Satellite radius" name="satelliteRadius">
                                <LabeledSlider
                                    v-model="studio.config.satelliteRadius"
                                    :min="0.04"
                                    :max="0.16"
                                    :step="0.005"
                                    label="Satellite radius"
                                    hide-label
                                    tooltip="Each satellite's radius."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Eccentricity" name="eccentricity">
                                <LabeledSlider
                                    v-model="studio.config.eccentricity"
                                    :min="0"
                                    :max="0.3"
                                    :step="0.01"
                                    label="Eccentricity"
                                    hide-label
                                    tooltip="The orbit-ellipse Y-inflation — 0 is a circular orbit, higher stretches it vertically."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Merge bridge" name="smoothK">
                                <LabeledSlider
                                    v-model="studio.config.smoothK"
                                    :min="0.02"
                                    :max="0.16"
                                    :step="0.005"
                                    label="Merge bridge"
                                    hide-label
                                    tooltip="The smin blend-band — wider stretches a gooier body→satellite NECK as a satellite metaballs in (vs a hard pop)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Merge variant" name="merge">
                                <LabeledSelect
                                    v-model="studio.config.merge"
                                    v-model:is-open="mergeOpen"
                                    :items="MERGES as unknown as readonly string[]"
                                    label="Merge variant"
                                    hide-label
                                    tooltip="quadratic = cheap, slightly creased; circular = a true quarter-circle fillet at the seam (rounder menisci)."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="STAGE 1 — the plain blob, from first principles"
            blurb="The minimal verifiable floor (variant='blob'): SDF circle + smin satellites +
                fwidth-AA + warm-cream fill — NO specular, NO shadow, NO iridescence. Deliberately
                FLAT. This is the 'it renders, it meatballs, it works on Safari' floor that proves
                the field is alive before STAGE 2 dresses it. A satellite passing near the body MERGES
                into one gooey amorphous shape (the smooth liquid neck), then separates — one connected
                silhouette, never two unrelated discs. WGSL-primary on the shared substrate."
        >
            <ShowcaseFrame class="flex items-center justify-center">
                <div class="relative aspect-square w-[min(60%,22rem)]">
                    <GooBlob
                        variant="blob"
                        color="var(--card)"
                        :config="plainConfig"
                        seed="plain"
                        data-testid="goo-blob-plain"
                    />
                </div>
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
            label="The ghost register — WatercolorDot variant=ghost"
            blurb="The empty-palette-slot / placeholder affordance: the SAME seeded blob
                silhouette traced as a DASHED outline — an SVG ellipse stroke-dasharray
                carrying the same wet filter, so the displacement wobbles the dashes INTO the
                organic outline (a dashed OUTLINE following the silhouette, NOT a solid ring
                and NOT a CSS dashed rectangle). A ghost of a given color+seed traces the SAME
                irregular outline the solid swatch of that seed fills — paired here so the
                silhouette match reads at a glance (solid LEFT, ghost RIGHT of each seed)."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div
                    v-for="c in dotColors"
                    :key="`ghost-${c}`"
                    class="flex items-center gap-2"
                    data-testid="watercolor-ghost-pair"
                >
                    <WatercolorDot
                        :color="c"
                        :seed="c"
                        class="aspect-square w-1/2"
                    />
                    <WatercolorDot
                        :color="c"
                        :seed="c"
                        variant="ghost"
                        class="aspect-square w-1/2"
                    />
                </div>
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
