<script setup lang="ts">
// The FOREGROUND Fourier studio (BA.W-FOURIER-STUDIO) — the aurora/blob-studio
// idiom applied to the fourier band. The ambient <FourierField> stays a recessive
// background (substrates/fourier-field.vue); THIS is the interactive center of
// gravity (R8-10, the two-register split the user named):
//
//   • a 1..K harmonic-count slider TRUNCATING the spectrum, so the summed curve
//     visibly ASSEMBLES term by term (the fourier-analysis reference signature —
//     partialSumAt, BA-FOUR-2);
//   • epicycle visibility + count as ORTHOGONAL axes (BA-FOUR-3 — the dual
//     register the primitive's variant enum collapsed);
//   • a curated shape-trace (ℱ wordmark / heart / star) fed through dftFromPoints
//     — the forward DFT's STUDIO consumer face (BA-FOUR-4): the brand mark drawn
//     by its own Fourier epicycles;
//   • a CONTROLLABLE clock on the house play transport (play/pause + a
//     <GlassTimeline> scrubber + a speed <Select>) feeding FourierField's new
//     injectable `clock` getter AND the foreground stage's draw (BA-FOUR-5) —
//     the clock advances off useRAFLoop (the house motion substrate), NEVER a
//     hand-rolled raw requestAnimationFrame loop.
//
// One GL-per-route budget: the stage + the ambient companion are Canvas2D, not a
// shader — the fourier route keeps its single live Canvas2D context here.
import { computed, reactive, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import FourierStudioStage from "./FourierStudioStage.vue";
import { FourierField } from "../../../src/components/custom/fourier-field";
import {
    makeEllipticSpectrum,
    type BasisComponent,
} from "../../../src/components/custom/fourier-field";
import { mulberry32, hashString } from "../../../src/utils/prng";
import { defaultBlobColorResolver } from "../../../src/composables/color";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
import { GlassTimeline } from "../../../src/components/custom/timeline";
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
import { useRAFLoop } from "../../../src/composables/motion/useRAFLoop";
import { FOURIER_SHAPES, getFourierShape } from "./fourier-paths";

// ── The studio config — the ORTHOGONAL axes (BA-FOUR-3) ───────────────────────
type SpectrumSource = "elliptic-hero" | "elliptic-final" | string; // shape keys join in

interface FourierStudioCfg {
    /** The spectrum source — a generated elliptic spectrum OR a curated shape key. */
    source: SpectrumSource;
    /** Harmonic count N — truncates the summed curve (the assembling axis). */
    harmonics: number;
    /** Show the rotating epicycle chain (orthogonal to N). */
    showEpicycles: boolean;
    /** How many epicycle arms to draw (≤ N; orthogonal to the curve). */
    epicycleCount: number;
    /** The brand color token (the library viz palette — NOT a demo-local hue). */
    color: string;
}

// The brand viz colors (the SHIPPED library tokens — BA inv-1: NO demo-local hue
// into the field; the studio reads --viz-fourier/--viz-chebyshev/--viz-legendre).
const COLOR_OPTIONS = [
    { label: "Fourier (warm)", value: "var(--viz-fourier)" },
    { label: "Chebyshev (cool)", value: "var(--viz-chebyshev)" },
    { label: "Legendre (violet)", value: "var(--viz-legendre)" },
];

const SOURCE_OPTIONS = [
    { label: "Elliptic — hero", value: "elliptic-hero" },
    { label: "Elliptic — final (dense)", value: "elliptic-final" },
    ...FOURIER_SHAPES.map((s) => ({ label: `Trace ${s.label}`, value: s.key })),
];

// Two stable generated elliptic spectra (the "Ambient ellipse" / "Dense
// reconstruction" presets — today's hero/final spectra, deterministic seeds so a
// capture reproduces). The curated shapes carry their own DFT spectra.
const ELLIPTIC_HERO = makeEllipticSpectrum(mulberry32(hashString("studio-hero")), {
    harmonics: 5,
    harmonicScale: 0.24,
});
const ELLIPTIC_FINAL = makeEllipticSpectrum(mulberry32(hashString("studio-final")), {
    harmonics: 11,
    harmonicScale: 0.17,
});

// ── The presets (per-preset clones, the aurora idiom — each a named editable
//    baseline a tuning session returns to; BA-FOUR-1/6, scope 6). ─────────────
const presets: readonly ConfiguratorPreset<FourierStudioCfg>[] = [
    {
        key: "ambient",
        label: "Ambient ellipse",
        sub: "few phasors · epicycles on",
        config: {
            source: "elliptic-hero",
            harmonics: 4,
            showEpicycles: true,
            epicycleCount: 4,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "dense",
        label: "Dense reconstruction",
        sub: "many phasors · curve only",
        config: {
            source: "elliptic-final",
            harmonics: 12,
            showEpicycles: false,
            epicycleCount: 8,
            color: "var(--viz-chebyshev)",
        },
    },
    {
        key: "brand",
        label: "Brand mark ℱ",
        sub: "traced by its own DFT",
        config: {
            source: "f-mark",
            harmonics: 24,
            showEpicycles: true,
            epicycleCount: 18,
            color: "var(--viz-fourier)",
        },
    },
    {
        key: "summing",
        label: "Summing harmonics",
        sub: "watch it assemble",
        config: {
            source: "elliptic-final",
            harmonics: 2,
            showEpicycles: true,
            epicycleCount: 8,
            color: "var(--viz-legendre)",
        },
    },
];

const studio = useConfiguratorState<FourierStudioCfg>({
    presets,
    initialPreset: "ambient",
    cloneMode: "per-preset",
});

const sourceOpen = ref(false);
const colorOpen = ref(false);

// The active spectrum (a generated elliptic OR a curated shape's DFT). The N
// slider maxes at the available term count of the active spectrum.
const activeSpectrum = computed<readonly BasisComponent[]>(() => {
    const src = studio.config.source;
    if (src === "elliptic-hero") return ELLIPTIC_HERO;
    if (src === "elliptic-final") return ELLIPTIC_FINAL;
    return getFourierShape(src).spectrum;
});
const maxHarmonics = computed(() => Math.max(1, activeSpectrum.value.length));

// ── The controllable clock (BA-FOUR-5) — a `t` ref advanced off useRAFLoop at
//    the chosen speed, frozen on pause, settable by the scrubber. NO raw
//    requestAnimationFrame in this body — the house substrate owns the loop. ──
const t = ref(0);
const paused = ref(false);
const speed = ref("1×");
const SPEED_OPTIONS = ["0.25×", "0.5×", "1×", "2×"];
const speedFactor = computed(() => {
    const m = speed.value.match(/^([\d.]+)/);
    return m ? Number(m[1]) : 1;
});
// The base period (one full traversal at 1× speed), in seconds.
const PERIOD_S = 14;

const rafLoop = useRAFLoop(
    ({ delta }) => {
        if (paused.value) return;
        const dt = delta / 1000;
        t.value = (t.value + (dt * speedFactor.value) / PERIOD_S) % 1;
    },
    { immediate: true },
);
void rafLoop;

// The clock getter the stage + the ambient companion read (FourierField's new
// injectable seam). Pause freezes `t`; the scrubber writes it directly.
const clock = (): number => t.value;

// The scrubber writes the clock position (a scrub freezes the playhead there; the
// loop resumes from it when un-paused).
function onScrub(v: number): void {
    t.value = v;
}

// The transport pause reflects into the ambient companion's freeze too (the
// companion keeps the studio clock in lockstep so both registers freeze together).
const liveStatus = computed(() => (paused.value ? "paused" : "playing"));
const tLabel = computed(() => `t ${t.value.toFixed(3)}`);

// The stage props — the live config + the clock. Reactive so every configurator
// edit + clock tick reaches the stage draw.
const stageProps = reactive({
    get spectrum() {
        return activeSpectrum.value;
    },
    get harmonics() {
        return Math.min(studio.config.harmonics, maxHarmonics.value);
    },
    get showEpicycles() {
        return studio.config.showEpicycles;
    },
    get epicycleCount() {
        return studio.config.epicycleCount;
    },
    get color() {
        return studio.config.color;
    },
});

// Keep the N slider within the active spectrum's term budget when a source swap
// shrinks it.
watch(maxHarmonics, (mx) => {
    if (studio.config.harmonics > mx) studio.config.harmonics = mx;
});
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 (b) — the studio title at the DISPLAY register with the
             --motion-accent violet as the ONE color text-event (the studio's
             unifying identity on the masthead). The basis-palette <Select> teaches
             the --viz-* hues (the component-feature content — reference-class), so
             the title-violet is the page event, not a competing family. -->
        <header class="flex flex-col gap-1">
            <span class="section-label">Substrates · Fourier Studio</span>
            <span
                class="text-display-3 font-display leading-tight"
                :style="{ color: 'var(--motion-accent)' }"
            >
                Fourier Studio
            </span>
        </header>

        <StorySection
            label="Fourier studio — harmonics · epicycles · shape-trace · clock"
            blurb="The foreground interactive register (the ambient field is the recessive
                background below). Drag N to TRUNCATE the spectrum and watch the summed curve
                assemble term by term; toggle the epicycle chain independently of the sum; pick a
                shape source to trace the ℱ wordmark / heart / star by its own forward DFT; and
                drive a controllable clock — play / pause / scrub / speed — on the house
                transport. One Canvas2D context."
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
                        <div class="relative flex h-full w-full flex-col">
                            <div class="relative min-h-0 flex-1 overflow-hidden">
                                <FourierStudioStage
                                    :spectrum="stageProps.spectrum"
                                    :harmonics="stageProps.harmonics"
                                    :show-epicycles="stageProps.showEpicycles"
                                    :epicycle-count="stageProps.epicycleCount"
                                    :color="stageProps.color"
                                    :clock="clock"
                                />
                                <div
                                    class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                                    data-testid="fourier-studio-status"
                                >
                                    <span class="text-micro font-mono text-muted-foreground">
                                        N {{ stageProps.harmonics }} / {{ maxHarmonics }}
                                    </span>
                                    <span class="text-micro font-mono text-muted-foreground/60">
                                        {{ liveStatus }} · {{ tLabel }}
                                    </span>
                                </div>
                            </div>
                            <!-- The play TRANSPORT (BA-FOUR-5). The FIXED glass
                                 play/pause control is DockBackgroundToggle (the
                                 library's shipped glass Pause↔Play register —
                                 NOT a rainbow-blob button, R8-17). When
                                 W-DEMO-AFFORDANCES lands its dedicated play
                                 register, the orchestrator re-points this control
                                 (declared in §Dependencies; the v-model:paused
                                 contract is the stable seam). -->
                            <div
                                class="flex items-center gap-3 border-t border-border/30 px-3 py-2"
                                data-testid="fourier-studio-transport"
                            >
                                <DockBackgroundToggle v-model:paused="paused" />
                                <div class="min-w-0 flex-1">
                                    <GlassTimeline
                                        variant="scrubber"
                                        :model-value="t"
                                        :label="tLabel"
                                        @update:model-value="onScrub"
                                    />
                                </div>
                                <div class="w-28 shrink-0">
                                    <LabeledSelect
                                        v-model="speed"
                                        v-model:is-open="colorOpen"
                                        :items="SPEED_OPTIONS"
                                        label="Speed"
                                        hide-label
                                        tooltip="Clock speed — scales how fast the epicycle chain advances."
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Spectrum" sub="--harmonics" dividers>
                            <ConfiguratorRow label="Source" name="source">
                                <LabeledSelect
                                    v-model="studio.config.source"
                                    v-model:is-open="sourceOpen"
                                    :items="SOURCE_OPTIONS.map((o) => o.value)"
                                    label="Source"
                                    hide-label
                                    tooltip="A generated elliptic spectrum, or a curated shape traced by its own forward DFT (dftFromPoints)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Harmonics (N)" name="harmonics">
                                <LabeledSlider
                                    v-model="studio.config.harmonics"
                                    :min="1"
                                    :max="maxHarmonics"
                                    :step="1"
                                    label="Harmonics"
                                    hide-label
                                    tooltip="The partial-sum term count — TRUNCATE the spectrum and watch the curve assemble: 1 = a single ellipse, climbing to the full reconstruction."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Epicycles" sub="orthogonal to N" dividers>
                            <ConfiguratorRow label="Show chain" name="showEpicycles">
                                <label class="flex items-center gap-2 text-small">
                                    <input
                                        v-model="studio.config.showEpicycles"
                                        type="checkbox"
                                        class="accent-[var(--viz-fourier)]"
                                        aria-label="Show epicycle chain"
                                    />
                                    <span class="text-muted-foreground">rotating chain</span>
                                </label>
                            </ConfiguratorRow>
                            <ConfiguratorRow
                                v-if="studio.config.showEpicycles"
                                label="Arms drawn"
                                name="epicycleCount"
                            >
                                <LabeledSlider
                                    v-model="studio.config.epicycleCount"
                                    :min="1"
                                    :max="maxHarmonics"
                                    :step="1"
                                    label="Epicycle arms"
                                    hide-label
                                    tooltip="How many epicycle arms to draw — independent of N (the orthogonal axis)."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Color" sub="--viz-*" dividers>
                            <ConfiguratorRow label="Brand hue" name="color">
                                <LabeledSelect
                                    v-model="studio.config.color"
                                    v-model:is-open="colorOpen"
                                    :items="COLOR_OPTIONS.map((o) => o.value)"
                                    label="Brand hue"
                                    hide-label
                                    tooltip="The curve hue — the shipped library viz palette (Fourier warm / Chebyshev cool / Legendre violet)."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="The ambient face — same clock, recessive register"
            blurb="The recessive background <FourierField> reading the SAME controllable clock as
                the studio above (its new injectable clock seam): pause the transport and BOTH
                freeze together. This is the ambient register the showcase keeps — see the full
                ambient story under Fourier Field."
        >
            <ShowcaseFrame pad="none">
                <div
                    class="relative aspect-[16/6] overflow-hidden rounded-card border border-border/40"
                    data-testid="fourier-studio-ambient"
                >
                    <FourierField
                        variant="hero"
                        :color="studio.config.color"
                        :color-resolver="defaultBlobColorResolver"
                        :clock="clock"
                        seed="studio-ambient"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
