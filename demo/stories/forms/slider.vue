<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import {
    Slider,
    type SliderSize,
    type SliderVariant,
} from "@glass/components/slider";
import { cn } from "@glass/components/_shared/class-names";
// The leaf path, not the aurora barrel: the barrel's first line re-exports
// Aurora.vue and would drag the live component into this route's graph for a
// backdrop that never arms a device (the AppShell import takes the same leaf).
import { auroraFallbackGround } from "@glass/components/aurora/composables/auroraFallbackGround";
import { heroAuroraConfig, type HeroPaletteKey } from "../../chassis/hero/aurora-hero";

// ── The Q-4 specimen substrate (FROST Q-2/Q-4 — the #56 receiver row) ────────
// A glass track over a flat page measures NOTHING: a blur radius over a flat field
// is invisible, so a material π taken on this route is inadmissible by
// σ-degeneracy — and the slider track/range pair is exactly what the banked
// transmission rows are read off. Every slider below therefore sits in a
// FIELD-WELL: the house idiom the configurator gallery already ships
// (`components/configurator/styles.css` §3: "the well is the COLOURFUL field; the
// warm-glass capsule frames it"), painted by the same device-free
// `auroraFallbackGround` raster the aurora preset cards bake
// (`substrates/aurora/usePresetThumbnails.ts`). It is STATIC — one CPU field
// sample at setup, no GL context, nothing animating, so nothing for PRM to pause.
//
// The field is this category's OWN hero palette (hue + chroma KEPT — the
// per-category identity the manifest declares), with its L band re-registered for a
// plate. Light folds the pastel hero wash DOWN into a band a 7-11px blur can
// visibly bite; dark is the house luminous-dark model (`aurora-hero.ts`
// §shellAuroraConfigDark — low L, warm hue, chroma kept) on a WIDER band, because
// the page-wide shell wash must stay recessive under prose and a specimen well
// carries none.
function plateField(palette: HeroPaletteKey, lo: number, hi: number) {
    const base = heroAuroraConfig(palette);
    const span = Math.max(1, base.palette.length - 1);
    return auroraFallbackGround(
        {
            ...base,
            palette: base.palette.map((stop, i) => ({
                ...stop,
                L: lo + ((hi - lo) * i) / span,
            })),
        },
        // 12 × 12 field samples (the preset cards bake 10): finer texels keep real
        // structure inside a crop the size of one slider track.
        { grid: 12 },
    );
}

const wellLight = plateField("cat-forms", 0.58, 0.97);
const wellDark = plateField("cat-forms", 0.04, 0.64);
const wellStyle = {
    "--well-field": wellLight.backgroundImage,
    "--well-field-color": wellLight.backgroundColor,
    "--well-field-dark": wellDark.backgroundImage,
    "--well-field-color-dark": wellDark.backgroundColor,
};

const volume = ref<number[]>([42]);
const balance = ref<number[]>([65]);
const range = ref<number[]>([22, 78]);
const spectrum = ref<number[]>([50]);
const disabled = ref<number[]>([30]);
const rtl = ref<number[]>([38]);
const inverted = ref<number[]>([38]);
const vertical = ref<number[]>([54]);
const verticalInverted = ref<number[]>([54]);
const invalid = ref<number[]>([84]);
const keyboard = ref<number[]>([40]);
const touch = ref<number[]>([55]);
const reduced = ref<number[]>([48]);

const irregularMarks = [14, 37, 68, 89] as const;
const rangeMarks = [10, 25, 50, 75, 90] as const;

// Variant × size matrix (2 variants × 3 sizes = 6 cells).
// Each cell binds an independent reactive value so drag interactions
// don't cross-couple. Hard gate requires every cell renders.
const variants: SliderVariant[] = ["scrubber", "spectrum"];
const sizes: SliderSize[] = ["sm", "md", "lg"];

type MatrixKey = `${(typeof variants)[number]}__${(typeof sizes)[number]}`;
const matrix = ref<Record<MatrixKey, number[]>>(
    Object.fromEntries(
        variants.flatMap((variant) =>
            sizes.map((size) => [`${variant}__${size}` as MatrixKey, [40]] as const),
        ),
    ) as unknown as Record<MatrixKey, number[]>,
);
</script>

<template>
    <StoryPage :style="wellStyle">
        <!-- Scrubber — the integrated-cylinder glass slider: the fill is one
             continuous glass pill whose rounded leading edge is the grab. With
             label + value readout. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">scrubber</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Volume</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">
                    {{ volume[0] }}%
                </span>
            </div>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="volume"
                    :max="100"
                    :step="1"
                    :marks="irregularMarks"
                    aria-label="Volume"
                />
            </div>
        </section>

        <!-- Custom fourier-red fill via descendant selectors. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">viz-fourier fill</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Balance</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">
                    {{ balance[0] }}
                </span>
            </div>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="balance"
                    :max="100"
                    :step="1"
                    aria-label="Balance"
                    :class="
                        cn(
                            '[&_.slider-track]:bg-viz-fourier/25',
                            '[&_.slider-range]:bg-viz-fourier',
                        )
                    "
                />
            </div>
        </section>

        <!-- Range mode: two thumbs bound a window. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">range · two thumbs</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Price window</span>
                <span class="text-mono-small text-muted-foreground tabular-nums">
                    ${{ range[0] }} – ${{ range[1] }}
                </span>
            </div>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="range"
                    :max="100"
                    :step="1"
                    :marks="rangeMarks"
                    aria-label="Price range"
                />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <p class="text-small text-muted-foreground">checkpoint directions</p>
            <div class="grid gap-5 md:grid-cols-2">
                <div class="grid gap-2">
                    <span class="text-small text-foreground">RTL</span>
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <Slider
                            v-model="rtl"
                            dir="rtl"
                            :marks="irregularMarks"
                            aria-label="RTL checkpoints"
                        />
                    </div>
                </div>
                <div class="grid gap-2">
                    <span class="text-small text-foreground">Inverted</span>
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <Slider
                            v-model="inverted"
                            inverted
                            :marks="irregularMarks"
                            aria-label="Inverted checkpoints"
                        />
                    </div>
                </div>
            </div>
            <div class="flex min-h-56 justify-center gap-12">
                <div class="grid justify-items-center gap-2">
                    <span class="text-small text-foreground">Vertical</span>
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <Slider
                            v-model="vertical"
                            orientation="vertical"
                            :marks="irregularMarks"
                            aria-label="Vertical checkpoints"
                        />
                    </div>
                </div>
                <div class="grid justify-items-center gap-2">
                    <span class="text-small text-foreground">Inverted vertical · spectrum</span>
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <Slider
                            v-model="verticalInverted"
                            orientation="vertical"
                            variant="spectrum"
                            inverted
                            :marks="irregularMarks"
                            aria-label="Inverted vertical checkpoints"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Spectrum variant — value.js gradient track + a track-height
             SQUIRCLE thumb (the iOS color-picker idiom). The track background
             is consumer-supplied via the Slider's typed `--glass-slider-track-background` input. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">spectrum variant — gradient track</p>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="spectrum"
                    variant="spectrum"
                    :max="100"
                    :step="1"
                    aria-label="Spectrum"
                    :style="{
                        '--glass-slider-track-background':
                            'linear-gradient(to right, var(--viz-fourier), var(--viz-legendre), var(--viz-chebyshev))',
                    }"
                />
            </div>
        </section>

        <!-- Disabled. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">disabled</p>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="disabled"
                    :max="100"
                    :step="1"
                    disabled
                    aria-label="Disabled slider"
                />
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">invalid</p>
            <div class="specimen-well">
                <div class="grid-bg" aria-hidden="true"></div>
                <Slider
                    v-model="invalid"
                    invalid
                    aria-label="Invalid threshold"
                    aria-describedby="slider-invalid-message"
                />
            </div>
            <p id="slider-invalid-message" class="text-small text-destructive">
                Choose a threshold below 80.
            </p>
        </section>

        <section class="grid gap-5 md:grid-cols-3">
            <div class="grid gap-3">
                <p class="text-small text-muted-foreground">keyboard</p>
                <div class="specimen-well">
                    <div class="grid-bg" aria-hidden="true"></div>
                    <Slider
                        v-model="keyboard"
                        :step="10"
                        aria-label="Keyboard stepped value"
                    />
                </div>
            </div>
            <div class="grid gap-3">
                <p class="text-small text-muted-foreground">touch</p>
                <div class="specimen-well">
                    <div class="grid-bg" aria-hidden="true"></div>
                    <Slider v-model="touch" aria-label="Coarse touch value" />
                </div>
            </div>
            <div class="grid gap-3">
                <p class="text-small text-muted-foreground">reduced motion</p>
                <div class="specimen-well">
                    <div class="grid-bg" aria-hidden="true"></div>
                    <Slider
                        v-model="reduced"
                        motion="reduced"
                        aria-label="Reduced-motion value"
                    />
                </div>
            </div>
        </section>

        <!-- Variant × size matrix. -->
        <section class="flex flex-col gap-4">
            <p class="text-small text-muted-foreground">variant × size matrix</p>
            <div class="grid grid-cols-[auto_1fr_1fr_1fr] items-center gap-x-6 gap-y-5">
                <div></div>
                <div
                    v-for="size in sizes"
                    :key="`hd-${size}`"
                    class="text-mono-small text-muted-foreground"
                >
                    {{ size }}
                </div>
                <template v-for="variant in variants" :key="variant">
                    <div class="text-mono-small text-muted-foreground">
                        {{ variant }}
                    </div>
                    <div
                        v-for="size in sizes"
                        :key="`${variant}__${size}`"
                        class="specimen-well"
                    >
                        <div class="grid-bg" aria-hidden="true"></div>
                        <Slider
                            v-model="matrix[`${variant}__${size}`]"
                            :variant="variant"
                            :size="size"
                            :max="100"
                            :step="1"
                            :aria-label="`${variant} ${size}`"
                        />
                    </div>
                </template>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
/* ── The Q-4 specimen well ───────────────────────────────────────────────────
   The structured backdrop the glass reads through. TWO static house layers, both
   painted BEHIND the specimen — and nothing on the ancestor chain takes a filter,
   blend, opacity or isolation, so each glass box keeps the page as its backdrop
   root (the backdrop must sit behind the glass in stacking, never filter an
   ancestor):

     · the FIELD — the device-free `auroraFallbackGround` raster on the well's own
       background, sized by the §3 field-well rule's `cover` / `center` / smooth
       upscale (`components/configurator/styles.css`), so the tiny raster's
       per-quadrant mean luminance survives the bilinear stretch. It carries the
       LOW-frequency structure the transmission arm reads.
     · the RULING — the shipped `.grid-bg` blueprint wash (`chassis/hero/story-hero.css`),
       its two DOCUMENTED strength knobs dialled up for a plate
       (`tokens/scale-paper.css` names `--grid-line` / `--grid-line-major` the
       consumer strength knobs). The pitch rhythm is the shared one, untouched. It
       carries the HIGH frequency a blur radius can actually destroy. */
.specimen-well {
    position: relative;
    border-radius: var(--radius-card);
    padding: clamp(0.75rem, 1.5vw, 1.125rem);
    background-color: var(--well-field-color);
    background-image: var(--well-field);
    background-size: cover;
    background-position: center;
    image-rendering: auto;
}

/* Plain `.dark` ancestor — a scoped `:global(.dark)` silently drops from the
   emitted CSS. */
.dark .specimen-well {
    background-color: var(--well-field-color-dark);
    background-image: var(--well-field-dark);
}

.specimen-well > .grid-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    --grid-line: color-mix(in srgb, var(--foreground) 18%, transparent);
    --grid-line-major: color-mix(in srgb, var(--foreground) 42%, transparent);
}

/* The specimen paints above the ruling plane; the ruling stays in the backdrop. */
.specimen-well > :not(.grid-bg) {
    position: relative;
    z-index: 1;
}
</style>
