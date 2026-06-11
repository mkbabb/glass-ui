<script setup lang="ts">
// Curve Gallery (AZ.W-MOTION-SUITE) — the FULL motion curve canon rendered live,
// grouped by the keyframes 10-family taxonomy (Standard / Sine / Quad / Cubic /
// Expo / Circ / Back / Bounce / Steps / Custom). Every row plots its REAL JS twin
// (NO fake hint-SVG, NO hand-rolled sampler): the glass-ui canonical springs +
// bezier cores via MOTION_CURVES, the analytic ease* set via curves.ts, Back via
// value.js bezierPresets → CSSCubicBezier, Bounce via the value.js bounce*Ease
// siblings, Steps via the value.js step generators. The Custom family is the live
// editable cubic-bezier (the bezier-editor port).
//
// The plots + driven dots read ONE coherent purple — `--motion-accent` (the
// glass-ui `--viz-legendre` violet twin), the motion family's single color event.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { computed, onUnmounted, ref } from "vue";
import { SegmentedTabs } from "../../../src/components/custom/tabs";
import { cn } from "../../../src/utils/cn";
import { CURVE_FAMILIES, type CurveRow } from "./curve-families";
import BezierEditor from "./BezierEditor.vue";

const FAMILY_TABS = [
    ...CURVE_FAMILIES.map((f) => ({ value: f.family, label: f.family })),
    { value: "Custom", label: "Custom" },
];

const activeFamily = ref<string>(CURVE_FAMILIES[0]!.family);

const activeRows = computed<readonly CurveRow[]>(
    () => CURVE_FAMILIES.find((f) => f.family === activeFamily.value)?.rows ?? [],
);
const activeBlurb = computed(
    () => CURVE_FAMILIES.find((f) => f.family === activeFamily.value)?.blurb ?? "",
);

const TRAVEL = 280; // px
const DUR = 1100; // ms

// Pre-compute a row's plot polyline from its REAL twin. The viewBox allows
// overshoot (springs, back-curves dip below 0 / past 1).
const PLOT_W = 120;
const PLOT_H = 64;
function plotPoints(row: CurveRow): string {
    const N = 48;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        const y = row.fn(t); // may overshoot <0 or >1
        // y=0 → bottom track (PLOT_H-8), y=1 → top track (12); clamp overshoot range.
        const py = (PLOT_H - 8) - y * (PLOT_H - 20);
        pts.push(`${(t * PLOT_W).toFixed(1)},${py.toFixed(1)}`);
    }
    return pts.join(" ");
}

const dotRefs = ref<Record<string, HTMLElement | null>>({});
const raf = ref<Record<string, number>>({});

function setDotRef(name: string, el: Element | null): void {
    dotRefs.value[name] = el as HTMLElement | null;
}

// Drive a dot by sampling the REAL JS twin per rAF — the JS-half is the motion
// source (not a CSS easing string). Spring/back overshoot is visible.
function play(row: CurveRow): void {
    const el = dotRefs.value[row.name];
    if (!el) return;
    if (raf.value[row.name]) cancelAnimationFrame(raf.value[row.name]);
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

const KIND_TINT: Record<CurveRow["kind"], string> = {
    spring: "bg-[var(--surface-tint-2)] text-foreground",
    bezier: "bg-[var(--surface-tint-1)] text-muted-foreground",
    analytic: "bg-[var(--surface-tint-1)] text-muted-foreground",
    step: "bg-[var(--surface-tint-2)] text-foreground",
};

// The §6 easing-doctrine legend — which easing fits which job.
const doctrine: { kind: string; easing: string }[] = [
    { kind: "Surface (bg / border / color / shadow / opacity)", easing: "--ease-standard (bezier — never a spring on a colour)" },
    { kind: "Transform — hover / press / active", easing: "--spring-smooth (the one interactive scale register)" },
    { kind: "Enter (mount / popover / dialog in)", easing: "--spring-bouncy / --spring-snappy" },
    { kind: "Exit (unmount / close)", easing: "--ease-out / --ease-standard (NO overshoot past gone)" },
    { kind: "Position-tracked (specular pointer follow)", easing: "--ease-standard" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="The curve canon"
            blurb="The FULL motion taxonomy — the glass-ui canonical springs + bezier cores, the value.js analytic ease* set (Sine/Quad/Cubic/Expo/Circ), the Back overshoot curves, the Bounce family, and the Steps generators — each plot driven by its REAL JS twin. Pick a family; press a card to fire its dot off the twin (springs and back-curves overshoot past the track then settle)."
        >
            <div class="mb-4">
                <SegmentedTabs
                    :options="FAMILY_TABS"
                    :model-value="activeFamily"
                    variant="pill"
                    @update:model-value="(v: string | string[]) => (activeFamily = Array.isArray(v) ? v[0]! : v)"
                />
            </div>

            <p class="mb-4 text-small text-muted-foreground">{{ activeBlurb }}</p>

            <!-- Custom family → the live editable bezier editor -->
            <BezierEditor v-if="activeFamily === 'Custom'" />

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

                <div class="grid gap-3 sm:grid-cols-2">
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
                        <code class="mb-2 block truncate text-xs text-muted-foreground">{{ row.jsName }}</code>
                        <p class="mb-3 text-xs text-muted-foreground">{{ row.note }}</p>

                        <!-- the plot (the curve shape from the REAL JS twin) -->
                        <svg :viewBox="`0 0 ${PLOT_W} ${PLOT_H}`" class="mb-3 h-16 w-full">
                            <line x1="0" :y1="PLOT_H - 8" :x2="PLOT_W" :y2="PLOT_H - 8" class="stroke-border" stroke-width="0.5" />
                            <line x1="0" y1="12" :x2="PLOT_W" y2="12" class="stroke-border/40" stroke-width="0.5" stroke-dasharray="2 2" />
                            <polyline
                                :points="plotPoints(row)"
                                fill="none"
                                class="stroke-[var(--motion-accent)]"
                                stroke-width="1.75"
                                stroke-linejoin="round"
                            />
                        </svg>

                        <!-- the driven dot (the REAL twin animates translateX) -->
                        <div class="relative h-3 w-full overflow-visible rounded-pill bg-[var(--surface-tint-1)]">
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
                        <tr class="bg-[var(--surface-tint-1)] text-left">
                            <th class="px-4 py-2 font-semibold">Transition kind</th>
                            <th class="px-4 py-2 font-semibold">Easing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rowd in doctrine" :key="rowd.kind" class="border-t border-border/40">
                            <td class="px-4 py-2 text-foreground">{{ rowd.kind }}</td>
                            <td class="px-4 py-2"><code class="text-xs text-muted-foreground">{{ rowd.easing }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StorySection>
    </StoryPage>
</template>
