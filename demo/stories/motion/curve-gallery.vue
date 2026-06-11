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
//   · THE PICKER — the family selector is the canonical `<SegmentedTabs
//     variant="underline">` panel-nav register at the section-heading scale, the
//     families the PRIMARY IA (`:responsive` → `<Select>` on narrow widths).
//
// The plots + driven dots read ONE coherent purple — `--motion-accent` (the glass-ui
// `--viz-legendre` violet twin), the motion family's single color event; the THICK
// stroke in it IS the point.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { computed, onUnmounted, ref } from "vue";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { cn } from "../../../src/utils/cn";
import { CURVE_FAMILIES, type CurveRow } from "./curve-families";
import BezierEditor from "./curve-gallery/BezierEditor.vue";

const CUSTOM_FAMILY = "Custom";
const FAMILY_TABS = [
    ...CURVE_FAMILIES.map((f) => ({ value: f.family, label: f.family })),
    { value: CUSTOM_FAMILY, label: CUSTOM_FAMILY },
];

const activeFamily = ref<string>(CURVE_FAMILIES[0]!.family);

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
        <StorySection
            label="The curve canon"
            blurb="The FULL motion taxonomy — 1:1 with the keyframes easing inventory: the four CSS Standard bezier keywords, the value.js analytic ease* families (Sine / Quad / Cubic + smooth-step-3 / Expo / Circ), the Back overshoot curves, the Bounce family, the Steps generators, the CSS linear() multi-stop form, and the iOS spring presets — each plot driven by its REAL JS twin. Pick a family; press a card to fire its dot off the twin (springs and back-curves overshoot past the track then settle)."
        >
            <!-- THE PICKER — the canonical underline panel-nav register at the
                 section-heading scale, the families the PRIMARY IA. Collapses to a
                 <Select> below 768px (the 12-way strip's narrow-width affordance). -->
            <div class="mb-5">
                <SegmentedTabs
                    :options="FAMILY_TABS"
                    :model-value="activeFamily"
                    variant="underline"
                    :responsive="{ breakpoint: '768px', ariaLabel: 'Curve family', triggerClass: 'text-subheading' }"
                    class="curve-family-picker text-subheading font-semibold"
                    @update:model-value="(v: string | string[]) => (activeFamily = Array.isArray(v) ? v[0]! : v)"
                />
            </div>

            <!-- The active family heading rung (W-HIERARCHY: section heading → body) -->
            <h2 class="text-subheading mb-1">{{ activeFamily }}</h2>
            <p class="mb-5 max-w-prose text-small text-muted-foreground">{{ activeBlurb }}</p>

            <!-- Custom family → the live editable bezier editor -->
            <BezierEditor v-if="activeFamily === CUSTOM_FAMILY" />

            <template v-else>
                <div class="mb-4">
                    <button
                        type="button"
                        class="btn-pill glass-btn rounded-pill px-4 py-2 text-sm font-medium"
                        @click="playAll"
                    >
                        ▶ Play family
                    </button>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                    <button
                        v-for="row in activeRows"
                        :key="row.name"
                        type="button"
                        class="glass-card rounded-card p-4 text-left transition-transform hover:scale-[1.01]"
                        @click="play(row)"
                    >
                        <div class="mb-2 flex items-baseline justify-between gap-2">
                            <code class="text-sm font-semibold text-foreground">{{ row.name }}</code>
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
/* THE PICKER at the section-heading scale (R7-3) — the families are the PRIMARY IA,
   so the underline tabs read at the section rung (text-subheading 20.4px / 600) with
   generous block-padding so the strip is navigation, not a cramped chip row. Demo-
   local: the gallery's own register tune, the SegmentedTabs base stays unchanged. */
.curve-family-picker :deep(.segmented-tab) {
    font-size: var(--type-subheading);
    font-weight: 600;
    padding-block: 0.6rem;
    padding-inline: 0.85rem;
    line-height: 1.25;
}
</style>
