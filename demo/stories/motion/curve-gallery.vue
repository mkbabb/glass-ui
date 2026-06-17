<script setup lang="ts">
// Curve Gallery (AZ.W-MOTION-SUITE → REDRESS AZ.W-MOTION2 / R7) — the FULL motion
// curve canon rendered live, 1:1 ISOMORPHIC to the keyframes easing inventory and
// grouped as keyframes groups it: Standard / Sine / Quad / Cubic / Expo / Circ /
// Back / Bounce / Steps / Linear() / Springs / Custom. Every row plots its REAL JS
// twin (NO fake hint-SVG, NO hand-rolled sampler) — see curve-families.ts for the
// binding twin-source split.
//
// R7 REDRESS:
//   · THE STROKE — the plots read THICK: a CONFIDENT non-scaling 3px stroke with
//     round caps/joins over a real 0/1 coordinate frame (the keyframes ghost-curve
//     idiom; the BezierEditor's 0.035-unit register is the gold standard this
//     thumbnail had regressed off).
//   · THE REGISTER — the pane reads VIVID, not grey-on-grey: the dead
//     `--surface-tint-1/-2` reads (the ladder starts at -4) are re-pointed to DEFINED
//     rungs so the chips/rails/header actually paint, the load-bearing copy is lifted
//     off `--muted-foreground` to `--foreground`, and the page declares a calm `grid`
//     substrate (manifest row) so the glass POPs.
//   · THE PICKER (BA.W-DEMO-AFFORDANCES) — the family selector is the dock-like
//     glass CHIP RACK: each family a glass chip, the SELECTED chip lifting to the
//     var(--glass-bg-floating) plate tier (the dock's "selected reads as glass"
//     --dock-control-active-bg register), composing <FadingScroll axis="x"> for the
//     horizontal-overflow arm. The PLATE is the active signal — structurally immune
//     to the R8-16 contrast-color luminance inversion the prior underline picker
//     suffered. All 12 families preserved as the PRIMARY IA; a <Select> is the
//     extreme-narrow floor.
//
// The plots + driven dots read ONE coherent purple — `--motion-accent` (the glass-ui
// `--viz-legendre` violet twin), the motion family's single color event; the THICK
// stroke in it IS the point.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import StoryPlayButton from "../StoryPlayButton.vue";
import { computed, onUnmounted, ref } from "vue";
import { Play } from "@lucide/vue";
import { FadingScroll } from "../../../src/components/custom/fading-scroll";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../src/components/ui/select";
import { cn } from "../../../src/utils/cn";
import { CURVE_FAMILIES, type CurveRow } from "./curve-families";
// BB.W-EASING-PRIMITIVE — the C-3 fold LANDED. The two demo editors (BezierEditor +
// StepsEditor) re-home onto the ONE published <EasingPicker> primitive (the
// /easing subpath). The curve-gallery is consumer #1 by construction — it binds the
// picker in BOTH modes (bezier + steps). The demo SFC forks are DELETED (clean
// break, no alias — the no-fourth-fork discipline made code).
// BB.W-EASING-PRIMITIVE — the two names are ONE primitive family sharing the
// useEasingPicker composable: <EasingPicker> is the bare editor, <EasingConfigurator>
// is the SAME picker seated in a <ConfiguratorLayer>/<ConfiguratorRow> shell (the
// picker-on-the-Configurator register — the value.js GradientPane consumer shape).
// The Custom family demonstrates both so the chassis-seated register has a live story.
import {
    EasingConfigurator,
    EasingPicker,
} from "../../../src/components/custom/easing";

const CUSTOM_FAMILY = "Custom";
// BA.W-FOURIER-STUDIO / REC-6 — the Steps family hosts the live steppedEase(n,
// term) sub-editor ABOVE its static reference rows.
const STEPS_FAMILY = "Steps";
// The 12 W-MOTION2 isomorphism families + the live Custom editor = the PRIMARY
// IA (presentation-only; all 12 preserved). The picker renders them as the glass
// chip rack (the dock-like "selected reads as glass" register).
const FAMILY_TABS = [
    ...CURVE_FAMILIES.map((f) => ({ value: f.family, label: f.family })),
    { value: CUSTOM_FAMILY, label: CUSTOM_FAMILY },
];

const activeFamily = ref<string>(CURVE_FAMILIES[0]!.family);

function selectFamily(value: string): void {
    activeFamily.value = value;
}

const activeRows = computed<readonly CurveRow[]>(
    () => CURVE_FAMILIES.find((f) => f.family === activeFamily.value)?.rows ?? [],
);
const activeBlurb = computed(() => {
    if (activeFamily.value === CUSTOM_FAMILY)
        return "Drag the control points to author a curve live — the path is the real CSSCubicBezier twin from value.js, the same evaluator the library samples.";
    return CURVE_FAMILIES.find((f) => f.family === activeFamily.value)?.blurb ?? "";
});

const TRAVEL = 280; // px
const DUR = 1100; // ms

// ── The plot geometry — a real 0/1 coordinate frame (IDIOM-7). The viewBox is a
// 0..1 unit box (1 → top, 0 → bottom) with a generous overshoot band so springs and
// back-curves dip below 0 / past 1 and the shape reads against its frame. The stroke
// is `vector-effect:non-scaling-stroke` 3px (pinned regardless of the render box —
// the keyframes register), so the curve reads THICK.
const PLOT_W = 1;
const PLOT_H = 1;
const OVERSHOOT = 0.32; // the visible band above 1 / below 0 (springs/back overshoot)
// SVG-Y over the frame: bezier-y (0 bottom → 1 top) maps to SVG-y (0 top → grows down).
function plotPoints(row: CurveRow): string {
    const N = 64;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        const y = row.fn(t); // may overshoot <0 or >1
        const py = (1 - y) * PLOT_H; // 0 → bottom, 1 → top
        pts.push(`${(t * PLOT_W).toFixed(4)},${py.toFixed(4)}`);
    }
    return pts.join(" ");
}
// The frame in unit coords (with the overshoot band): top of the visible box, the t
// baseline at y=0, and the 0.25/0.5/0.75 gridlines.
const FRAME_TOP = -OVERSHOOT;
const FRAME_H = 1 + 2 * OVERSHOOT;
const GRID = [0.25, 0.5, 0.75];

const dotRefs = ref<Record<string, HTMLElement | null>>({});
const raf = ref<Record<string, number>>({});

function setDotRef(name: string, el: Element | null): void {
    dotRefs.value[name] = el as HTMLElement | null;
}

// Honor reduced-motion — the dot snaps to its settled position, no rAF travel.
const prefersReducedMotion = (): boolean =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

// Drive a dot by sampling the REAL JS twin per rAF — the JS-half is the motion
// source (not a CSS easing string). Spring/back overshoot is visible.
function play(row: CurveRow): void {
    const el = dotRefs.value[row.name];
    if (!el) return;
    if (raf.value[row.name]) cancelAnimationFrame(raf.value[row.name]);
    if (prefersReducedMotion()) {
        el.style.transform = `translateX(${(row.fn(1) * TRAVEL).toFixed(2)}px)`;
        return;
    }
    const start = performance.now();
    const step = (now: number) => {
        const t = Math.min(1, (now - start) / DUR);
        const y = row.fn(t);
        el.style.transform = `translateX(${(y * TRAVEL).toFixed(2)}px)`;
        if (t < 1) {
            raf.value[row.name] = requestAnimationFrame(step);
        } else {
            el.style.transform = `translateX(${(row.fn(1) * TRAVEL).toFixed(2)}px)`;
        }
    };
    raf.value[row.name] = requestAnimationFrame(step);
}

function playAll(): void {
    for (const r of activeRows.value) play(r);
}

onUnmounted(() => {
    for (const id of Object.values(raf.value)) cancelAnimationFrame(id);
});

// The kind pill backplate — re-pointed off the DEAD `--surface-tint-1/-2` reads onto
// DEFINED rungs (the ladder starts at -4). Spring/step pills read the stronger -12
// presence tier; bezier/analytic read the quieter -8. The text is `--foreground`
// (load-bearing, lifted off muted).
const KIND_TINT: Record<CurveRow["kind"], string> = {
    spring: "bg-[var(--surface-tint-12)] text-foreground",
    bezier: "bg-[var(--surface-tint-8)] text-foreground",
    analytic: "bg-[var(--surface-tint-8)] text-foreground",
    step: "bg-[var(--surface-tint-12)] text-foreground",
};

// The §6 easing-doctrine legend — which easing fits which job.
const doctrine: { kind: string; easing: string }[] = [
    { kind: "Surface (bg / border / color / shadow / opacity)", easing: "--ease-standard (bezier — never a spring on a colour)" },
    { kind: "Transform — hover / press / active", easing: "--spring-smooth (the one interactive scale register)" },
    { kind: "Enter (mount / popover / dialog in)", easing: "--spring-bouncy / --spring-snappy" },
    { kind: "Exit (unmount / close)", easing: "--ease-out / --ease-standard (NO overshoot past gone)" },
    { kind: "Position-tracked (specular pointer follow)", easing: "--ease-standard" },
];

// The glass-ui house Material cores — the LIBRARY's own motion tokens (NOT in the
// keyframes canon, but the tokens the recipes actually consume). Kept here as a named
// aside beneath the doctrine legend rather than smuggled into the keyframes-canon
// Standard family (the §3.4 disposition — visual-load-bearing, never silently dropped).
const houseCores: { token: string; cp: string }[] = [
    { token: "--motion-ease-standard", cp: "CSSCubicBezier(.4, 0, .2, 1)" },
    { token: "--motion-ease-out", cp: "CSSCubicBezier(0, 0, .2, 1)" },
    { token: "--motion-ease-in", cp: "CSSCubicBezier(.4, 0, 1, 1)" },
];
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 (b) — the motion title at the DISPLAY register with the
             --motion-accent violet as the ONE color text-event (the existing
             motion-purple family on the masthead, never a body <p>/<h2>). -->
        <header class="flex flex-col gap-1">
            <span class="section-label">Motion · Curve Gallery</span>
            <span
                class="text-display-3 font-display leading-tight"
                :style="{ color: 'var(--motion-accent)' }"
            >
                Curve Gallery
            </span>
        </header>

        <StorySection
            label="The curve canon"
            blurb="The FULL motion taxonomy — 1:1 with the keyframes easing inventory: the four CSS Standard bezier keywords, the value.js analytic ease* families (Sine / Quad / Cubic + smooth-step-3 / Expo / Circ), the Back overshoot curves, the Bounce family, the Steps generators, the CSS linear() multi-stop form, and the iOS spring presets — each plot driven by its REAL JS twin. Pick a family; press a card to fire its dot off the twin (springs and back-curves overshoot past the track then settle)."
        >
            <!-- THE PICKER — the dock-like glass CHIP RACK (BA.W-DEMO-AFFORDANCES,
                 curve-picker lane). Each family is a glass chip; the SELECTED chip
                 lifts to the var(--glass-bg-floating) tier (the "selected reads as
                 glass" iOS register, the same --dock-control-active-bg model the
                 dock owns), hover to var(--glass-bg-resting). The active signal is a
                 PLATE, not an fg/muted-fg luminance delta — so it is STRUCTURALLY
                 immune to the R8-16 contrast-color inversion (the dimmest-selected
                 defect). The label stays warm-ink --foreground (the W-REGISTER-IOS
                 de-RED'd register). All 12 families preserved as the IA. The rack is
                 a flex row composing <FadingScroll axis="x"> for the horizontal-
                 overflow arm (the fade engages only on real overflow / narrow widths
                 — the dead transparent-strip backdrop-filter is GONE: the chip
                 surfaces carry the glass, not the empty container). The narrow floor
                 is a <Select> below the breakpoint. -->
            <div class="curve-family-picker mb-5">
                <FadingScroll axis="x" class="hidden md:block">
                    <div role="group" aria-label="Curve family" class="curve-chip-rack">
                        <button
                            v-for="tab in FAMILY_TABS"
                            :key="tab.value"
                            type="button"
                            class="curve-chip"
                            :class="{ 'curve-chip--active': activeFamily === tab.value }"
                            :aria-pressed="activeFamily === tab.value"
                            @click="selectFamily(tab.value)"
                        >
                            {{ tab.label }}
                        </button>
                    </div>
                </FadingScroll>

                <!-- The extreme-narrow floor — a <Select> below the breakpoint. -->
                <Select
                    :model-value="activeFamily"
                    class="md:hidden"
                    @update:model-value="(v) => selectFamily(String(v))"
                >
                    <SelectTrigger aria-label="Curve family" class="text-subheading">
                        <SelectValue placeholder="Pick a family" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="tab in FAMILY_TABS" :key="tab.value" :value="tab.value">
                            {{ tab.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- The active family heading rung (W-HIERARCHY: section heading → body) -->
            <h2 class="text-subheading mb-1">{{ activeFamily }}</h2>
            <p class="mb-5 max-w-prose text-small text-muted-foreground">{{ activeBlurb }}</p>

            <!-- Custom family → the published <EasingPicker> in bezier mode (the
                 re-homed BezierEditor — the draggable cubic-bezier arm). -->
            <template v-if="activeFamily === CUSTOM_FAMILY">
                <EasingPicker mode="bezier" />

                <!-- BB.W-EASING-PRIMITIVE — the chassis-seated register: the SAME
                     picker family in a <ConfiguratorLayer>/<ConfiguratorRow> shell
                     (the picker-on-the-Configurator register a consumer reaches for
                     when the curve picker is ONE row in a larger controls column). -->
                <EasingConfigurator
                    class="mt-6 max-w-sm"
                    label="Easing"
                    name="--ease-custom"
                    mode="bezier"
                />
            </template>

            <template v-else>
                <!-- BA.W-DEMO-AFFORDANCES — the play control is the ONE register
                     (content-width <Button> + leading Lucide <Play>), never the
                     .btn-pill+.glass-btn stack that clipped to a 40px blob (R8-17).
                     Sits content-width on its own row. -->
                <div class="mb-4 flex items-center gap-3">
                    <StoryPlayButton label="Play family" @play="playAll" />
                </div>

                <!-- BB.W-EASING-PRIMITIVE — the Steps family hosts the published
                     <EasingPicker> in steps mode (the re-homed StepsEditor — the
                     steppedEase(n, term) staircase arm). It sits ABOVE the static
                     reference rows so a user parameterizes the staircase live, then
                     sees the canon rows below. -->
                <EasingPicker v-if="activeFamily === STEPS_FAMILY" mode="steps" class="mb-5" />

                <div class="grid gap-4 sm:grid-cols-2">
                    <button
                        v-for="row in activeRows"
                        :key="row.name"
                        type="button"
                        class="glass-card rounded-card p-4 text-left transition-transform hover:scale-[1.01]"
                        @click="play(row)"
                    >
                        <div class="mb-2 flex items-baseline justify-between gap-2">
                            <!-- BA.W-DEMO-AFFORDANCES — a discoverable leading <Play>
                                 so the card reads as activatable (press fires the dot
                                 off its twin), not a static plot. -->
                            <span class="flex items-baseline gap-1.5 min-w-0">
                                <Play class="curve-card-play size-3 shrink-0 self-center text-muted-foreground" aria-hidden="true" />
                                <code class="truncate text-sm font-semibold text-foreground">{{ row.name }}</code>
                            </span>
                            <span
                                :class="cn(
                                    'rounded-pill px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide',
                                    KIND_TINT[row.kind],
                                )"
                            >{{ row.kind }}</span>
                        </div>
                        <code class="mb-1 block truncate text-xs text-foreground">{{ row.jsName }}</code>
                        <p class="mb-3 text-xs text-foreground/80">{{ row.note }}</p>

                        <!-- THE PLOT — the curve shape from the REAL JS twin, a THICK
                             non-scaling 3px stroke over a real 0/1 coordinate frame. -->
                        <svg
                            :viewBox="`0 ${FRAME_TOP} ${PLOT_W} ${FRAME_H}`"
                            preserveAspectRatio="none"
                            class="mb-3 h-20 w-full"
                        >
                            <!-- the 0/1 frame: the t-baseline (y=PLOT_H), the unit-top
                                 (y=0), and the 0.25/0.5/0.75 gridlines -->
                            <line x1="0" :y1="PLOT_H" :x2="PLOT_W" :y2="PLOT_H" class="stroke-border" stroke-width="2" vector-effect="non-scaling-stroke" />
                            <line x1="0" y1="0" :x2="PLOT_W" y2="0" class="stroke-border/40" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-dasharray="3 3" />
                            <line v-for="g in GRID" :key="'g' + g" x1="0" :y1="(1 - g) * PLOT_H" :x2="PLOT_W" :y2="(1 - g) * PLOT_H" class="stroke-border/25" stroke-width="1" vector-effect="non-scaling-stroke" />
                            <polyline
                                :points="plotPoints(row)"
                                fill="none"
                                class="stroke-[var(--motion-accent)]"
                                stroke-width="3"
                                vector-effect="non-scaling-stroke"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <!-- the driven dot (the REAL twin animates translateX) -->
                        <div class="relative h-3 w-full overflow-visible rounded-pill bg-[var(--surface-tint-8)]">
                            <div
                                :ref="(el) => setDotRef(row.name, el as Element | null)"
                                class="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-pill bg-[var(--motion-accent)]"
                                style="will-change: transform"
                            />
                        </div>
                    </button>
                </div>
            </template>
        </StorySection>

        <StorySection
            label="Easing doctrine (§6)"
            blurb="The house rule for which easing fits which job — the legend every recipe reaches for. Surface props on a bezier; transform interactions on a spring; enters bouncy/snappy; exits NEVER overshoot."
        >
            <div class="overflow-hidden rounded-card border border-border">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-[var(--surface-tint-10)] text-left">
                            <th class="px-4 py-2 font-semibold text-foreground">Transition kind</th>
                            <th class="px-4 py-2 font-semibold text-foreground">Easing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rowd in doctrine" :key="rowd.kind" class="border-t border-border/40">
                            <td class="px-4 py-2 text-foreground">{{ rowd.kind }}</td>
                            <td class="px-4 py-2"><code class="text-xs text-foreground">{{ rowd.easing }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- The glass-ui house Material cores — the library's OWN motion tokens
                 the recipes consume (distinct from the keyframes-canon Standard
                 keywords; visual-load-bearing, kept as a named aside). -->
            <p class="mt-2 text-mono-caption text-muted-foreground">House Material cores (the library's own bezier tokens — distinct from the CSS Standard keywords above)</p>
            <div class="overflow-hidden rounded-card border border-border">
                <table class="w-full text-sm">
                    <tbody>
                        <tr v-for="core in houseCores" :key="core.token" class="border-t border-border/40 first:border-t-0">
                            <td class="px-4 py-2"><code class="text-xs text-foreground">{{ core.token }}</code></td>
                            <td class="px-4 py-2"><code class="text-xs text-foreground/80">{{ core.cp }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* THE CURVE-FAMILY CHIP RACK (BA.W-DEMO-AFFORDANCES, curve-picker lane) — the
   dock-like glass chip register. Each family is a glass chip; the SELECTED chip
   lifts to the var(--glass-bg-floating) tier (the "selected reads as glass" iOS
   register, the same --dock-control-active-bg model the dock owns), hover to
   var(--glass-bg-resting). The active signal is a PLATE (a glass background), not
   an fg/muted-fg luminance delta — so it is STRUCTURALLY immune to the R8-16
   contrast-color inversion (the selected family was the DIMMEST label because the
   muted inactive tabs were lifted to white while the active --foreground stayed
   below it). Here the selected chip's PLATE luminance is always ABOVE the rest
   chips' (no plate → the field shows through), in BOTH modes. The label stays
   warm-ink --foreground (the W-REGISTER-IOS de-RED'd register), so no saturated
   hue rides an interactive register. Demo-local: a DEMO-side chip rack composing
   the existing dock active-register tokens, NOT a SegmentedTabs variant edit. */
.curve-chip-rack {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5rem;
    /* The rack is a single scroll row; <FadingScroll axis="x"> feathers the
       overflow edges. The 12 short labels fit at desktop; the fade engages only
       on real overflow / narrow widths. */
    padding-block: 0.25rem;
    /* The chips snap when the rack scrolls. */
    scroll-snap-type: x proximity;
}

.curve-chip {
    flex: 0 0 auto;
    scroll-snap-align: start;
    cursor: pointer;
    border-radius: var(--radius-pill);
    border: 1px solid transparent;
    /* REST — no plate: the chip reads as bare text over the field, so the
       selected plate's luminance is unambiguously ABOVE it. */
    background: transparent;
    color: var(--foreground);
    font-size: var(--type-subheading);
    font-weight: 600;
    line-height: 1.2;
    padding-block: 0.45rem;
    padding-inline: 0.85rem;
    white-space: nowrap;
    /* §6 doctrine — the surface legs ride the bezier --ease-standard. */
    transition:
        background var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard);
}

.curve-chip:hover:not(.curve-chip--active) {
    /* HOVER — the resting glass plate (one tier below the active floating). */
    background: var(--glass-bg-resting);
    border-color: var(--glass-border-resting);
}

.curve-chip:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

.curve-chip--active {
    /* SELECTED — the var(--glass-bg-floating) plate lift (the dock's
       --dock-control-active-bg "selected reads as glass" tier). The PLATE is the
       active signal; immune to the contrast-color luminance race. */
    background: var(--dock-control-active-bg, var(--glass-bg-floating));
    border-color: var(--glass-border-floating);
    backdrop-filter: var(--glass-blur-floating);
    color: var(--foreground);
}

/* The per-card discoverable play glyph — quiets at rest, lifts on card hover so
   the card reads as activatable. */
.curve-card-play {
    transition: color var(--duration-fast) var(--ease-standard);
}
button:hover > div .curve-card-play {
    color: var(--foreground);
}
</style>
