<script setup lang="ts">
// The unified glass-material matrix. Every named band surface (the five ladder
// rungs + card + the floating/overlay registers Dialog/Sheet/Popover compose)
// reads the SAME catch-light + rim from one `.glass-material` mixin; the three
// SOTA folds (squircle, chromatic fringe, adaptive tint) ride that
// grammar behind capability checks and tokens. The matrix is staged over a
// shipped high-frequency Aurora backdrop so the specular + rim + folds read
// against busy color (glass does not read on flat cream).
//
// This story BINDS the shipped seams it narrates: the moving catch-light is
// composed off `useSpecularTracking` (the DRY pointer-write seam), the adaptive
// tint sets BOTH `--glass-veil-ink` + a non-zero `--glass-veil-rung` so
// the `color-mix(in oklab, …)` actually bites, the squircle reads on the
// dialog/sheet register (cards stay round by policy), and the deliberately-subtle
// rim is shown against an on/off contrast device.
import { computed, onMounted, onScopeDispose, ref, useTemplateRef } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import {
    useSpecularTracking,
    Button,
    Alert,
    AlertTitle,
    AlertDescription,
} from "@glass/index";
//  Arm 2 — the DEMO exerciser for the sampled-luminance observer
// (path B: demo-private — the composable is OFF the public glass barrel, imported
// directly here as the content-glass DEMO mount that exercises the live sampling path;
// the binary consumer is the dock). It writes `--glass-backdrop-luma` + the bucket on a
// glass-card over the page's live Aurora substrate so the dynamic darken TRACKS the
// painted backdrop (the iOS-27 register). A demo mount is NOT a binary consumer (the
// own-story exclusion: it exercises the composable, it does not by
// itself clear the public ≥2-binary bar.
import { useGlassBackdropLuminance } from "@glass/composables/glass/useGlassBackdropLuminance";
import {
    Info,
    CircleAlert,
    TriangleAlert,
    CircleCheck,
    Sparkles,
} from "@lucide/vue";

// The named band surfaces — the five ladder rungs + the card register. Each is
// a bare `.glass-<rung>` plate (the mixin supplies the `::before` specular + the
// rim); the floating/overlay rungs are the substrate Dialog/Sheet/Popover ride.
const rungs = ["wash", "quiet", "resting", "floating", "overlay"] as const;

// The five alert arms, neutral first — `null` is the un-toned surface, which under the
// ruled identity is the same plate as the other four wearing no status ink.
//
// Each arm carries its GLYPH, and that is not decoration here: under neutral-glass +
// status-ink the glyph IS the status channel, so a specimen row without one shows five
// identical plates and demonstrates the opposite of what it claims. The first capture of
// this section proved exactly that and the glyphs are the cure.
const alertArms = [
    { tone: null, icon: Sparkles },
    { tone: "info", icon: Info },
    { tone: "success", icon: CircleCheck },
    { tone: "warning", icon: TriangleAlert },
    { tone: "destructive", icon: CircleAlert },
] as const;

// The shipped DRY moving-specular seam. ONE instance drives the whole
// headline band — `specularStyle` (the `--mouse-x/--mouse-y` host write) +
// `onPointerMove` (the pointer-position write) bind across every plate, so the
// "pointer-anchored catch-light" is live on hover and safe under reduced motion (the
// seam skips the write under `prefers-reduced-motion: reduce`; the recipe pins
// the centred 50% fallback). NO hand-rolled --mouse-x math, NO per-plate copy.
const { specularStyle, onPointerMove } = useSpecularTracking();

// A consumer-provided dominant backdrop color drives the adaptive tint. The
// tint BITES only when BOTH knobs are set — `--glass-veil-ink` (the sampled
// hue) AND a non-zero `--glass-veil-rung` (the ≤30% house ceiling). "none"
// resolves strength 0% (the genuine zero-delta default); the aurora samples
// resolve a non-zero strength so the `color-mix(in oklab, …)` actually biases.
const tintSamples = [
    { label: "none (warm-white)", source: "", strength: "0%" },
    { label: "aurora rose", source: "oklch(0.7 0.12 20)", strength: "22%" },
    { label: "aurora teal", source: "oklch(0.72 0.1 200)", strength: "22%" },
] as const;
const tint = ref<(typeof tintSamples)[number]>(tintSamples[0]);

// A local Canvas2D field makes the live path deterministic: the card samples exactly
// this source, alternating dark and light pixels at a pace the 4 Hz sampler can show.
const liveCardEl = useTemplateRef<HTMLElement>("liveCardEl");
const liveCanvas = useTemplateRef<HTMLCanvasElement>("liveCanvas");
const { sample: backdropSample } = useGlassBackdropLuminance(liveCardEl, {
    live: true,
    backgroundCanvas: () => liveCanvas.value,
});
const sampleNow = ref(Date.now());
let liveFieldTimer: number | undefined;

onMounted(() => {
    let light = false;
    const paint = () => {
        const canvas = liveCanvas.value;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;
        light = !light;
        context.fillStyle = light ? "rgb(245 204 132)" : "rgb(26 61 91)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    paint();
    liveFieldTimer = window.setInterval(() => {
        sampleNow.value = Date.now();
        paint();
    }, 700);
});

onScopeDispose(() => {
    if (liveFieldTimer !== undefined) window.clearInterval(liveFieldTimer);
});

const sampleAge = computed(() => {
    const current = backdropSample.value;
    return current.state === "pending" ? null : sampleNow.value - current.sampledAt;
});

// the THIRD disjoint glass axis: the per-INSTANCE chromatic-rim
// tint. Each swatch sets `--glass-accent: <data-hue>; --glass-accent-strength: <N%>`
// per instance through inline style, without hand-threading separate border and
// catch-light colors. The data
// hues are the demo's OWN palette (presets-in-consumers — the library token default
// is the NEUTRAL transparent identity; a consumer's DATA hue never enters the lib).
// The accent tints the RIM (silhouette edge) + the::before catch-light glint with
// the datum's color; an UNSET surface beside it stays byte-identical warm-cream glass.
const accentSamples = [
    { label: "series · rose", hue: "oklch(0.68 0.19 18)" },
    { label: "series · amber", hue: "oklch(0.78 0.16 75)" },
    { label: "series · teal", hue: "oklch(0.72 0.13 195)" },
    { label: "series · violet", hue: "oklch(0.62 0.2 295)" },
] as const;
// the per-instance accent strength ceiling — a rim WHISPER, not a flooded plate.
const ACCENT_STRENGTH = "48%";
</script>

<template>
    <StoryPage>
        <!-- The Aurora substrate is staged FULL-BLEED by the page chassis (the
             `background: aurora` + `hero: true` manifest row → StoryHero's
             full-bleed mode), so every glass plate below reads against a live
             bright painterly field — the whole point of this page (B13). -->
        <StorySection
            label="unified material — moving specular + rim across the band"
            blurb="Hover any plate and the edge gleam follows the cursor, then settles softly back into the material when you leave."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap gap-6">
                    <div
                        v-for="rung in rungs"
                        :key="rung"
                        :class="`glass-${rung}`"
                        class="flex h-28 w-44 items-center justify-center rounded-card text-small font-medium"
                        data-specular-plate
                        :style="specularStyle"
                        @pointermove="onPointerMove"
                    >
                        glass-{{ rung }}
                    </div>
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-small font-medium"
                        data-specular-plate
                        :style="specularStyle"
                        @pointermove="onPointerMove"
                    >
                        glass-card
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="dynamic backdrop luminance — the iOS-27 sampled observer"
            blurb="This card samples its named live canvas on a throttled ≤4 Hz loop. The readout exposes source, state, age, luminance, and target coordinates; a live request with no readable canvas is explicitly unavailable rather than silently using a static/default value."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap items-center gap-6">
                    <div
                        class="relative h-28 w-56 overflow-hidden rounded-card"
                    >
                        <canvas
                            ref="liveCanvas"
                            width="224"
                            height="112"
                            class="pointer-events-none absolute inset-0 h-full w-full"
                            data-material-live-canvas
                            aria-hidden="true"
                        />
                        <div
                            ref="liveCardEl"
                            data-glass-sample="live"
                            class="glass-card relative flex size-full flex-col items-center justify-center gap-1 rounded-card px-3 text-center text-small font-medium"
                        >
                            <span>live canvas sample</span>
                            <span class="text-mono-small text-muted-foreground">
                                {{ backdropSample.state }} ·
                                {{ backdropSample.source }} ·
                                {{ sampleAge === null ? "—" : `${sampleAge}ms` }}
                            </span>
                            <span
                                v-if="backdropSample.state === 'sampled'"
                                class="text-mono-small text-muted-foreground"
                            >
                                {{ backdropSample.luma.toFixed(3) }} ·
                                {{ Math.round(backdropSample.targetRect.x) }},{{
                                    Math.round(backdropSample.targetRect.y)
                                }}
                            </span>
                            <span
                                v-else-if="backdropSample.state === 'unavailable'"
                                class="text-mono-small text-muted-foreground"
                            >
                                {{ backdropSample.reason }}
                            </span>
                        </div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- The ALERT specimens live HERE, not only on `/feedback/alert`, and the reason
             is measurable: that route's substrate has luminance σ ≈ 1.2-1.7 with almost
             no high-frequency detail, so a plate's blur radius and its tint are both
             invisible against it. A capture taken there cannot distinguish a 1px rung
             from a 7px one and reads any material change as "no change needed". This
             page stages the live Aurora field and is the one place the sampled-luminance
             observer is wired outside the dock, so it is where the alert's rung and its
             earned-darken clamp can actually be photographed.

             Five arms, one plate: under the ruled Alert identity the tone is carried by
             the glyph and the ink, and every tone rides the SAME neutral quiet rung — so
             these five specimens should differ in ink and in nothing else. -->
        <StorySection
            label="alert on a busy substrate — one neutral rung, five status inks"
            blurb="Every tone shares one neutral quiet plate; the colour is the glyph and the ink. Watch the plate darken as the painterly field brightens behind it — the tint is earned from the measured backdrop, not declared per tone."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-col gap-4">
                    <Alert v-for="arm in alertArms" :key="arm.tone ?? 'neutral'" :tone="arm.tone">
                        <component :is="arm.icon" />
                        <AlertTitle>{{ arm.tone ?? "neutral" }}</AlertTitle>
                        <AlertDescription>
                            The plate is the quiet rung; the status is the ink.
                        </AlertDescription>
                    </Alert>

                    <!-- The NESTED cell. An alert inside a floating host proves two
                         things in one frame that no isolated capture can: the
                         one-backdrop-sample-per-plate law (a rung nested in a rung
                         resolves `--glass-cell-backdrop-filter: none`, so the inner
                         plate carries no second lens) and the bright-backdrop bucket
                         engaging through the floating ancestor that declares it. -->
                    <div class="glass-floating rounded-card p-4">
                        <Alert tone="info">
                            <Info />
                            <AlertTitle>nested in a floating host</AlertTitle>
                            <AlertDescription>
                                One backdrop sample per plate — the inner surface takes
                                no second lens.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="subtle rim — the one key-driven contrast device"
            blurb="The rim is ONE static catch-light on the key-facing edge at 10% α (8% in dark — a dark plate reads because the page behind it is dark, not because the ring is brighter), plus a warm under-shadow grounding the shade edges. Side-by-side: a plate carrying the rim vs the same plate with it suppressed."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-resting flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card bg-foreground/[0.18] text-small font-medium"
                        data-rim-device="on"
                    >
                        <span>rim ON</span>
                        <span class="text-mono-small text-muted-foreground"
                            >--glass-edge-light</span
                        >
                    </div>
                    <div
                        class="glass-resting flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card bg-foreground/[0.18] text-small font-medium"
                        data-rim-device="off"
                        :style="{ '--glass-edge-light': '0 0 0 0 transparent' }"
                    >
                        <span>rim OFF</span>
                        <span class="text-caption text-muted-foreground"
                            >suppressed</span
                        >
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="glass-accent — the per-instance chromatic rim+glint axis"
            blurb="The third glass axis (level · tint · accent). A consumer data hue OKLab-tints the surface's rim (silhouette edge) and the ::before catch-light glint — set per instance (--glass-accent: <hue>; --glass-accent-strength: <N%>), so a data-keyed colored hover is a one-line seam. Distinct from the whole-plate tint axis (--glass-veil-ink): the accent rides the rim and glint only, never the plate background. Each swatch carries its own series hue; the unset plate beside them stays plain warm-cream glass."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <!-- consumer #1 — the data-hue swatch GRID: each cell sets its OWN
                     --glass-accent per-instance, so each rim+glint glows a DISTINCT
                     series hue (the per-instance proof). -->
                <div class="flex flex-wrap gap-6">
                    <div
                        v-for="s in accentSamples"
                        :key="s.label"
                        class="glass-floating flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card text-small font-medium"
                        data-accent-swatch
                        :data-accent-hue="s.hue"
                        :style="{
                            '--glass-accent': s.hue,
                            '--glass-accent-strength': ACCENT_STRENGTH,
                        }"
                        :data-specular-plate="true"
                        @pointermove="onPointerMove"
                    >
                        <span>{{ s.label }}</span>
                        <span class="text-mono-small text-muted-foreground"
                            >--glass-accent</span
                        >
                    </div>
                </div>
                <!-- consumer #2 — the map-shaped data-hue surface (a HoverCard-
                     shaped accented plate) BESIDE the unset neutral plate: the
                     accented one glows the datum hue at rim + glint, the unset one
                     reads exactly today's warm-cream glass (the byte-identical
                     neutral fallback, the on/off contrast device). -->
                <div class="mt-6 flex flex-wrap gap-6">
                    <div
                        class="glass-floating flex h-28 w-56 flex-col items-center justify-center gap-1 rounded-card text-small font-medium"
                        data-accent-device="on"
                        :style="{
                            '--glass-accent': 'oklch(0.62 0.2 295)',
                            '--glass-accent-strength': ACCENT_STRENGTH,
                        }"
                    >
                        <span>accent ON</span>
                        <span class="text-caption text-muted-foreground"
                            >data hue · violet</span
                        >
                    </div>
                    <div
                        class="glass-floating flex h-28 w-56 flex-col items-center justify-center gap-1 rounded-card text-small font-medium"
                        data-accent-device="off"
                    >
                        <span>accent OFF</span>
                        <span class="text-caption text-muted-foreground"
                            >unset · warm-cream</span
                        >
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Squircle corners (Chrome 139+, progressively enhanced)"
            blurb="Supporting engines paint the iOS-26 superellipse corner on the dialog/sheet register where it reads. Cards and pills stay round by policy — the superellipse is imperceptible at a 16px card radius, and round corners are the cross-engine fallback."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="flex flex-wrap items-end gap-6">
                    <!-- This is the same `.glass-floating.rounded-dialog` compound
                         used by DialogContent: a superellipse on supporting engines
                         and a round-corner fallback elsewhere. -->
                    <div
                        class="glass-floating rounded-dialog flex h-28 w-44 items-center justify-center text-small font-medium"
                    >
                        squircle (dialog register)
                    </div>
                    <div
                        class="glass-card flex h-28 w-44 items-center justify-center text-small font-medium"
                    >
                        round (.glass-card)
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="the plate ink — one chromatic writer"
            blurb="A plate has exactly one chromatic writer on its body: the veil ink. Re-point --glass-veil-ink and the whole rung follows, at every level and under the earned-darken clamp. There is no second tint axis mixing the same plate toward the same place, and no painted fringe at the edge — chroma at the rim is what saturate() delivers through a real radius."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <div class="mb-4 flex flex-wrap items-center gap-2">
                    <span class="text-caption text-muted-foreground"
                        >tint sample:</span
                    >
                    <Button
                        v-for="s in tintSamples"
                        :key="s.label"
                        size="sm"
                        :data-tint-sample="s.source"
                        :aria-pressed="tint.label === s.label"
                        @click="tint = s"
                    >
                        {{ s.label }}
                    </Button>
                </div>
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating flex h-28 w-44 items-center justify-center rounded-card text-small font-medium"
                        data-tint-plate
                        :style="{
                            '--glass-veil-ink': tint.source || undefined,
                        }"
                    >
                        veil ink
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="The brand-metal triad — gold · silver · bronze"
            blurb="Three brand metals: gold (warm-yellow), silver (cool-steel), bronze (warm-brown). The .metal-gold/.metal-silver/.metal-bronze text classes sweep a slow patina; the .metal-*-border rim and the prismatic .metal-rainbow-rim read on a glass plate. Reduced motion keeps the metal static — it reads as metal without the slide."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <!-- The medal triad — the text-clip register (consumer #1). -->
                <div class="flex flex-wrap items-center gap-8" data-metal-triad>
                    <span class="metal-gold text-display-2 font-black" data-metal="gold"
                        >Au</span
                    >
                    <span class="metal-silver text-display-2 font-black" data-metal="silver"
                        >Ag</span
                    >
                    <span class="metal-bronze text-display-2 font-black" data-metal="bronze"
                        >Bz</span
                    >
                </div>
                <!-- The swept metallic RIM (.metal-*-border) + the prismatic rainbow
                     rim — the badge/§N6-border register (consumer #2). -->
                <div class="mt-6 flex flex-wrap items-center gap-6">
                    <div
                        class="metal-gold-border flex h-20 w-32 items-center justify-center rounded-card text-small font-medium"
                        data-metal-border="gold"
                    >
                        gold rim
                    </div>
                    <div
                        class="metal-bronze-border flex h-20 w-32 items-center justify-center rounded-card text-small font-medium"
                        data-metal-border="bronze"
                    >
                        bronze rim
                    </div>
                    <div
                        class="glass-floating metal-rainbow-rim flex h-20 w-32 items-center justify-center rounded-card text-small font-medium"
                        data-metal-rainbow
                    >
                        rainbow rim
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="The opt-in deep-glass tier — .glass-deep"
            blurb="The maximal Liquid-Glass register above the calm default: compose Surface with deep, or add .glass-deep to a bare material. The backdrop reads softer and more saturated while the calm content default remains unchanged."
        >
            <ShowcaseFrame pad="lg" tier="field">
                <!-- the deep-vs-calm contrast device: the.glass-deep plate reads
                     visibly more diffuse + more saturated than the calm
                     .glass-floating default over the SAME live aurora. -->
                <div class="flex flex-wrap gap-6">
                    <div
                        class="glass-floating glass-deep flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card text-small font-medium"
                        data-glass-deep="on"
                    >
                        <span>.glass-deep</span>
                        <span class="text-mono-small text-muted-foreground"
                            >Apple deep · 16px/1.5</span
                        >
                    </div>
                    <div
                        class="glass-floating flex h-28 w-44 flex-col items-center justify-center gap-1 rounded-card text-small font-medium"
                        data-glass-deep="off"
                    >
                        <span>calm default</span>
                        <span class="text-mono-small text-muted-foreground"
                            >floating · 13px/1.18</span
                        >
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
