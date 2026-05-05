<!--
  primitives/blob — design-language showcase for the canon `<Blob>` primitive.
  Bold-maximalist commitment per docs/tranches/G/G.md Design POV and
  docs/tranches/G/blob/waves/Wβ3.md. Sections, top-to-bottom:
    1. Hero specimen          — single 20rem blob, breath-cadence DisplayHero
    2. Mood gallery           — five moods × Fraunces-italic captions
    3. Color spectrum         — fifteen blobs across rainbow + viz + gold
    4. Configuration playground — Slider + NumberField + ToggleGroup wired to :config
    5. Multi-instance composition — 9-blob grid, visibility-gated by scroll
    6. Accessibility states   — PRM-frozen / RT-disc / contrast-more border
    7. Watercolor swatch family — sm/md/lg/xl `<Swatch variant="watercolor">`
    8. SVG defs mount         — local filter pack + rainbow-gradient mount
-->
<script setup lang="ts">
import { computed, ref } from "vue";

import StoryPage from "../StoryPage.vue";
import { Blob } from "@/components/custom/blob";
import { Swatch } from "@/components/custom/swatch";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { Slider } from "@/components/ui/slider";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import {
    BLOB_CONFIG_DEFAULTS,
    type BlobConfig,
    type BlobMood,
} from "@/components/custom/blob";

// ── Section 2: mood gallery ────────────────────────────────────────────────
interface MoodSpec {
    mood: BlobMood;
    color: string;
    blurb: string;
}
const MOODS: MoodSpec[] = [
    {
        mood: "idle",
        color: "hsl(43 74% 49%)",
        blurb: "Quiet breath, slow orbit. The resting specimen.",
    },
    {
        mood: "happy",
        color: "hsl(35 70% 42%)",
        blurb: "Warm hue shift, brisker pulse, generous wobble.",
    },
    {
        mood: "curious",
        color: "hsl(194 62% 36%)",
        blurb: "Pulled toward the cursor; hue range opens up.",
    },
    {
        mood: "sleepy",
        color: "hsl(256 44% 52%)",
        blurb: "Half-speed orbits, dimmer body, no chase.",
    },
    {
        mood: "excited",
        color: "hsl(6 72% 49%)",
        blurb: "Hottest cadence — wide hue, eager merge rate.",
    },
];

// ── Section 3: color spectrum ──────────────────────────────────────────────
const SPECTRUM: { name: string; color: string }[] = [
    { name: "rainbow-red", color: "hsl(0 85% 60%)" },
    { name: "rainbow-orange", color: "hsl(30 90% 55%)" },
    { name: "rainbow-yellow", color: "hsl(55 90% 55%)" },
    { name: "rainbow-green", color: "hsl(130 70% 50%)" },
    { name: "rainbow-blue", color: "hsl(210 80% 55%)" },
    { name: "rainbow-indigo", color: "hsl(260 70% 60%)" },
    { name: "rainbow-violet", color: "hsl(300 75% 60%)" },
    { name: "viz-fourier", color: "hsl(6 72% 49%)" },
    { name: "viz-chebyshev", color: "hsl(224 58% 46%)" },
    { name: "viz-legendre", color: "hsl(286 46% 47%)" },
    { name: "viz-amber", color: "hsl(35 70% 42%)" },
    { name: "viz-green", color: "hsl(163 46% 35%)" },
    { name: "gold-dark", color: "hsl(34 87% 38%)" },
    { name: "gold", color: "hsl(43 74% 49%)" },
    { name: "gold-light", color: "hsl(51 100% 50%)" },
];

// ── Section 4: configuration playground ────────────────────────────────────
const playgroundColor = ref<string>("hsl(43 74% 49%)");
const satelliteCount = ref<number>(BLOB_CONFIG_DEFAULTS.satelliteCount);
const smoothK = ref<number[]>([BLOB_CONFIG_DEFAULTS.smoothK]);
const eccentricity = ref<number[]>([BLOB_CONFIG_DEFAULTS.eccentricity]);
const pulseFreq = ref<number[]>([BLOB_CONFIG_DEFAULTS.pulseFreq]);
const noiseAmp = ref<number[]>([BLOB_CONFIG_DEFAULTS.noiseAmp]);
const chromaticAberration = ref<number[]>([
    BLOB_CONFIG_DEFAULTS.chromaticAberration,
]);
const playgroundMood = ref<BlobMood>("curious");

const playgroundConfig = computed<Partial<BlobConfig>>(() => ({
    satelliteCount: satelliteCount.value,
    smoothK: smoothK.value[0]!,
    eccentricity: eccentricity.value[0]!,
    pulseFreq: pulseFreq.value[0]!,
    noiseAmp: noiseAmp.value[0]!,
}));

const playgroundStyle = computed(() => ({
    "--blob-chromatic-aberration": String(chromaticAberration.value[0]!),
}));

// ── Section 5: nine-blob composition ───────────────────────────────────────
const NINE: { mood: BlobMood; color: string }[] = [
    { mood: "idle", color: "hsl(43 74% 49%)" },
    { mood: "happy", color: "hsl(334 63% 47%)" },
    { mood: "curious", color: "hsl(224 58% 46%)" },
    { mood: "excited", color: "hsl(6 72% 49%)" },
    { mood: "sleepy", color: "hsl(256 44% 52%)" },
    { mood: "happy", color: "hsl(163 46% 35%)" },
    { mood: "curious", color: "hsl(286 46% 47%)" },
    { mood: "idle", color: "hsl(35 70% 42%)" },
    { mood: "excited", color: "hsl(342 62% 44%)" },
];

// ── Section 7: watercolor swatch sizes ─────────────────────────────────────
const WATERCOLORS: {
    size: "sm" | "md" | "lg" | "xl";
    color: string;
    label: string;
}[] = [
    { size: "sm", color: "hsl(43 74% 49%)", label: "sm · 1.5rem" },
    { size: "md", color: "hsl(6 72% 49%)", label: "md · 2rem" },
    { size: "lg", color: "hsl(224 58% 46%)", label: "lg · 3rem" },
    { size: "xl", color: "hsl(286 46% 47%)", label: "xl · 4rem" },
];
</script>

<template>
    <StoryPage>
        <!-- single-mount filter pack + rainbow gradient consumed by every
             section below — proves the §11 lock that consumers mount once -->
        <svg
            class="svg-filters"
            aria-hidden="true"
            focusable="false"
            style="position: absolute; width: 0; height: 0; overflow: hidden"
        >
            <defs>
                <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.02"
                        numOctaves="2"
                        seed="1"
                        result="noise"
                    />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                </filter>
                <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="4"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feColorMatrix in="noise" type="saturate" values="0" />
                    <feBlend mode="multiply" in2="SourceGraphic" />
                </filter>
                <filter id="pencil-wobble" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="3"
                        seed="2"
                        result="noise"
                    />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>
                <filter id="canvas-grain" x="0" y="0" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.4"
                        numOctaves="3"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feColorMatrix in="noise" type="saturate" values="0" />
                    <feBlend mode="multiply" in2="SourceGraphic" />
                </filter>
                <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="var(--rainbow-red)" />
                    <stop offset="16%" stop-color="var(--rainbow-orange)" />
                    <stop offset="33%" stop-color="var(--rainbow-yellow)" />
                    <stop offset="50%" stop-color="var(--rainbow-green)" />
                    <stop offset="66%" stop-color="var(--rainbow-blue)" />
                    <stop offset="83%" stop-color="var(--rainbow-indigo)" />
                    <stop offset="100%" stop-color="var(--rainbow-violet)" />
                </linearGradient>
            </defs>
        </svg>

        <!-- ── 1. HERO SPECIMEN ────────────────────────────────────────── -->
        <CreamSurface
            tone="warm"
            class="relative overflow-hidden"
            :class="'p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]'"
        >
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-50"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 70% 55% at 22% 18%, var(--rainbow-pastel-yellow) 0%, transparent 60%),
                        radial-gradient(ellipse 65% 55% at 80% 82%, var(--rainbow-pastel-violet) 0%, transparent 60%),
                        radial-gradient(ellipse 90% 70% at 50% 110%, var(--rainbow-pastel-blue) 0%, transparent 60%)
                    `,
                }"
            />

            <div
                class="relative flex flex-col items-center gap-[var(--space-phi-3)] text-center"
            >
                <p class="section-label">primitives · &lt;Blob&gt; · v1.0</p>
                <Blob
                    color="hsl(43 74% 49%)"
                    mood="curious"
                    size="20rem"
                    :pointer-attract="true"
                />

                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    class="hero-title leading-[0.92]"
                >
                    A&nbsp;living&nbsp;specimen.
                </DisplayHero>

                <p class="text-prose-lettrine max-w-2xl text-foreground/85">
                    The Blob is a watercolor body with three orbiting satellites — a
                    smooth-min metaball field, breathing at one-over-phi-squared,
                    pulled gently toward the cursor. It scales coherently from a
                    1.5rem swatch to this twenty-rem hero, and reads as the same
                    character every time. Five moods, twenty-five tunable fields,
                    one accent color — that is the whole API.
                </p>

                <FlourishDivider
                    tone="rainbow"
                    class="my-[var(--space-phi-2)] w-full max-w-md"
                />

                <p class="text-mono-caption text-muted-foreground">
                    DisplayHero · CreamSurface tone="warm" · &lt;Blob mood="curious"
                    size="20rem" :pointer-attract&gt;
                </p>
            </div>
        </CreamSurface>

        <!-- ── 2. MOOD GALLERY ─────────────────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">vocabulary · five moods</p>
                <DisplayHero size="display-3" variation="wonk">
                    Mood is a blend, not a transition.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Each mood is an eleven-field overlay on
                    <code class="fira-code">BlobConfig</code>. The blend curve is
                    <code class="fira-code">--ease-apple-spring</code>; every
                    halfway point is well-defined.
                </p>
            </header>
            <div
                class="grid grid-cols-2 gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] pb-[var(--space-phi-5)] shadow-cartoon md:grid-cols-5"
            >
                <figure
                    v-for="m in MOODS"
                    :key="m.mood"
                    class="flex flex-col items-center gap-[var(--space-phi-2)] text-center"
                >
                    <Blob :color="m.color" :mood="m.mood" size="6rem">
                        <template #label>{{ m.mood }}</template>
                    </Blob>
                    <figcaption
                        class="text-mono-small max-w-[14ch] text-muted-foreground"
                    >
                        {{ m.blurb }}
                    </figcaption>
                </figure>
            </div>
        </section>

        <!-- ── 3. COLOR SPECTRUM ───────────────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">accent contract · fifteen hues</p>
                <DisplayHero size="display-3" variation="wonk">
                    A single accent, fifteen identities.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Rainbow vivid → viz basis → gold family. The blob inherits the
                    accent into both body and satellites; the only consumer
                    contract is one HSL string.
                </p>
            </header>
            <div
                class="rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <div
                    class="flex flex-wrap items-end justify-center gap-x-[var(--space-phi-2)] gap-y-[var(--space-phi-3)]"
                >
                    <figure
                        v-for="c in SPECTRUM"
                        :key="c.name"
                        class="flex flex-col items-center gap-1.5"
                    >
                        <Blob :color="c.color" mood="idle" size="3rem" />
                        <figcaption
                            class="fira-code text-mono-caption text-muted-foreground"
                        >
                            {{ c.name }}
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>

        <!-- ── 4. CONFIGURATION PLAYGROUND ─────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">playground · phi-anchored defaults</p>
                <DisplayHero size="display-3" variation="wonk">
                    Twenty-five fields. Six worth touching.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    The defaults are golden where it matters. Pin a mood, scrub a
                    field, watch the specimen react. The orange tick on every
                    slider is the canon golden default.
                </p>
            </header>
            <div
                class="grid gap-[var(--space-phi-4)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon md:grid-cols-[18rem_1fr]"
            >
                <div
                    class="flex items-center justify-center"
                    :style="playgroundStyle"
                >
                    <Blob
                        :color="playgroundColor"
                        :mood="playgroundMood"
                        size="12rem"
                        :config="playgroundConfig"
                    />
                </div>

                <div class="flex flex-col gap-[var(--space-phi-3)]">
                    <!-- mood selector -->
                    <div class="flex flex-col gap-2">
                        <Label class="text-small text-foreground"
                            >mood</Label
                        >
                        <ToggleGroup
                            v-model="playgroundMood"
                            type="single"
                            variant="outline"
                        >
                            <ToggleGroupItem
                                v-for="m in MOODS"
                                :key="m.mood"
                                :value="m.mood"
                            >
                                {{ m.mood }}
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    <!-- satelliteCount as NumberField -->
                    <div class="flex flex-col gap-2">
                        <Label
                            for="blob-cfg-sats"
                            class="text-small text-foreground"
                            >satelliteCount</Label
                        >
                        <NumberField
                            id="blob-cfg-sats"
                            v-model="satelliteCount"
                            :min="0"
                            :max="8"
                            :step="1"
                        >
                            <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput />
                                <NumberFieldIncrement />
                            </NumberFieldContent>
                        </NumberField>
                        <p class="text-mono-caption text-muted-foreground">
                            default · 3 (mood-blended)
                        </p>
                    </div>

                    <!-- smoothK -->
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between">
                            <Label class="text-small text-foreground"
                                >smoothK</Label
                            >
                            <span
                                class="text-mono-caption text-muted-foreground tabular-nums"
                                >{{ smoothK[0]!.toFixed(3) }}</span
                            >
                        </div>
                        <Slider
                            v-model="smoothK"
                            :min="0.05"
                            :max="0.4"
                            :step="0.005"
                            class="[&_[data-orientation]]:bg-gold/25 [&_[data-slot=range]]:bg-gold"
                            aria-label="smoothK"
                        />
                        <p class="text-mono-caption text-muted-foreground">
                            golden default · 0.191 ≈ 1/(2φ²)
                        </p>
                    </div>

                    <!-- eccentricity -->
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between">
                            <Label class="text-small text-foreground"
                                >eccentricity</Label
                            >
                            <span
                                class="text-mono-caption text-muted-foreground tabular-nums"
                                >{{ eccentricity[0]!.toFixed(3) }}</span
                            >
                        </div>
                        <Slider
                            v-model="eccentricity"
                            :min="0"
                            :max="0.6"
                            :step="0.005"
                            class="[&_[data-orientation]]:bg-gold/25 [&_[data-slot=range]]:bg-gold"
                            aria-label="eccentricity"
                        />
                        <p class="text-mono-caption text-muted-foreground">
                            golden default · 0.250 = φ⁻²/2.618
                        </p>
                    </div>

                    <!-- pulseFreq -->
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between">
                            <Label class="text-small text-foreground"
                                >pulseFreq</Label
                            >
                            <span
                                class="text-mono-caption text-muted-foreground tabular-nums"
                                >{{ pulseFreq[0]!.toFixed(3) }} Hz</span
                            >
                        </div>
                        <Slider
                            v-model="pulseFreq"
                            :min="0.05"
                            :max="1.0"
                            :step="0.01"
                            class="[&_[data-orientation]]:bg-gold/25 [&_[data-slot=range]]:bg-gold"
                            aria-label="pulseFreq"
                        />
                        <p class="text-mono-caption text-muted-foreground">
                            golden default · 0.300 ≈ 1/φ²
                        </p>
                    </div>

                    <!-- noiseAmp -->
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between">
                            <Label class="text-small text-foreground"
                                >noiseAmp</Label
                            >
                            <span
                                class="text-mono-caption text-muted-foreground tabular-nums"
                                >{{ noiseAmp[0]!.toFixed(3) }}</span
                            >
                        </div>
                        <Slider
                            v-model="noiseAmp"
                            :min="0"
                            :max="0.08"
                            :step="0.001"
                            aria-label="noiseAmp"
                        />
                        <p class="text-mono-caption text-muted-foreground">
                            character default · 0.025
                        </p>
                    </div>

                    <!-- chromaticAberration via CSS variable (SPEC §11.2) -->
                    <div class="flex flex-col gap-2">
                        <div class="flex items-baseline justify-between">
                            <Label class="text-small text-foreground"
                                >chromaticAberration</Label
                            >
                            <span
                                class="text-mono-caption text-muted-foreground tabular-nums"
                                >{{ chromaticAberration[0]!.toFixed(4) }}</span
                            >
                        </div>
                        <Slider
                            v-model="chromaticAberration"
                            :min="0"
                            :max="0.005"
                            :step="0.0001"
                            aria-label="chromaticAberration"
                        />
                        <p class="text-mono-caption text-muted-foreground">
                            CSS variable · default 0.002 · zero is valid
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── 5. MULTI-INSTANCE COMPOSITION ───────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">composition · nine specimens</p>
                <DisplayHero size="display-3" variation="wonk">
                    Nine instances, one rAF.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Visibility-gated by IntersectionObserver. Scroll past — the
                    blob's rAF subscription pauses and resumes as it crosses the
                    viewport. Coalesced through the shared
                    <code class="fira-code">useRAFLoop</code> driver.
                </p>
            </header>
            <div
                class="grid grid-cols-3 gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon"
            >
                <div
                    v-for="(b, i) in NINE"
                    :key="`nine-${i}`"
                    class="flex items-center justify-center"
                >
                    <Blob
                        :color="b.color"
                        :mood="b.mood"
                        size="5rem"
                        :seed="1618 + i"
                    />
                </div>
            </div>
        </section>

        <!-- ── 6. ACCESSIBILITY STATES ─────────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">accessibility · three contracts</p>
                <DisplayHero size="display-3" variation="wonk">
                    Frozen, opaque, bordered — still beautiful.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Every accessibility mode keeps the blob recognizable. PRM
                    halts the loop on a frozen specimen; reduced-transparency
                    swaps the metaball for a cartoon-shadowed disc; contrast-more
                    doubles the border-mix from 12% to 24%.
                </p>
            </header>
            <div
                class="grid grid-cols-1 gap-[var(--space-phi-4)] rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon md:grid-cols-3"
            >
                <figure class="flex flex-col items-center gap-3 text-center">
                    <Blob
                        color="hsl(43 74% 49%)"
                        mood="idle"
                        size="6rem"
                        reduced-motion="static"
                    />
                    <figcaption
                        class="font-display text-prose italic text-foreground"
                        :style="{
                            fontVariationSettings: '\'WONK\' 1, \'SOFT\' 100',
                        }"
                    >
                        Reduced motion · frozen
                    </figcaption>
                    <p class="text-mono-caption max-w-[28ch] text-muted-foreground">
                        Forced via
                        <code class="fira-code">reduced-motion="static"</code>.
                        macOS Reduce Motion triggers the same path.
                    </p>
                </figure>

                <figure class="flex flex-col items-center gap-3 text-center">
                    <Blob color="hsl(6 72% 49%)" mood="happy" size="6rem" />
                    <figcaption
                        class="font-display text-prose italic text-foreground"
                        :style="{
                            fontVariationSettings: '\'WONK\' 1, \'SOFT\' 100',
                        }"
                    >
                        Reduced transparency · disc
                    </figcaption>
                    <p class="text-mono-caption max-w-[28ch] text-muted-foreground">
                        Toggle macOS Reduce Transparency: the metaball compositing
                        falls back to a cartoon-shadowed disc.
                    </p>
                </figure>

                <figure class="flex flex-col items-center gap-3 text-center">
                    <Blob color="hsl(224 58% 46%)" mood="curious" size="6rem" />
                    <figcaption
                        class="font-display text-prose italic text-foreground"
                        :style="{
                            fontVariationSettings: '\'WONK\' 1, \'SOFT\' 100',
                        }"
                    >
                        Increase contrast · thicker edge
                    </figcaption>
                    <p class="text-mono-caption max-w-[28ch] text-muted-foreground">
                        macOS Increase Contrast steps
                        <code class="fira-code">--blob-border-mix</code> from 12%
                        to 24%.
                    </p>
                </figure>
            </div>
        </section>

        <!-- ── 7. WATERCOLOR SWATCH FAMILY ─────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">sibling · &lt;Swatch variant="watercolor"&gt;</p>
                <DisplayHero size="display-3" variation="wonk">
                    Same recipe, smaller scale.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    The watercolor swatch consumes
                    <code class="fira-code">useWatercolorBlob</code> — a
                    Mulberry32-seeded oscillating border-radius that boils through
                    the
                    <code class="fira-code">#watercolor</code> SVG filter. No
                    canvas, no GL — same character, less budget.
                </p>
            </header>
            <div
                class="flex flex-wrap items-end justify-center gap-[var(--space-phi-4)] rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon"
            >
                <figure
                    v-for="w in WATERCOLORS"
                    :key="w.size"
                    class="flex flex-col items-center gap-2"
                >
                    <Swatch
                        :color="w.color"
                        :size="w.size"
                        variant="watercolor"
                        :seed="1618"
                    />
                    <figcaption
                        class="fira-code text-mono-caption text-muted-foreground"
                    >
                        {{ w.label }}
                    </figcaption>
                </figure>
            </div>
        </section>

        <!-- ── 8. SVG DEFS MOUNT REMINDER ──────────────────────────────── -->
        <section class="flex flex-col gap-2">
            <FlourishDivider tone="gold" />
            <p class="text-prose-lettrine text-foreground/85">
                A hidden <code class="fira-code">&lt;svg&gt;</code> at the top of
                this story mounts the design-system filter pack
                (<code class="fira-code">#watercolor</code>,
                <code class="fira-code">#paper-grain</code>,
                <code class="fira-code">#pencil-wobble</code>,
                <code class="fira-code">#canvas-grain</code>) plus the
                <code class="fira-code">#rainbow-gradient</code> linear gradient.
                Every section above consumes them implicitly through CSS
                <code class="fira-code">filter: url(#watercolor)</code> and
                <code class="fira-code">stroke: url(#rainbow-gradient)</code>.
                Zero runtime cost beyond the parse.
            </p>
        </section>
    </StoryPage>
</template>

<style scoped>
/* Hero title shares breath cadence with the specimen — `idle-bob` is the
   shared 1/φ² keyframe canon ships in animations.css. PRM disables the
   animation per the keyframe's own media query. */
.hero-title {
    animation: idle-bob 6.18s var(--ease-apple-spring) infinite;
    transform-origin: center;
}
</style>
