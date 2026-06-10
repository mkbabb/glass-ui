<script setup lang="ts">
// Curve Gallery (AY.W-MOTION2) — the CSS↔JS curve TABLE rendered live. Every
// `MOTION_CURVES` row drives a dot AND plots its curve, with the CSS token name
// and the JS twin name side by side — the two halves of ONE motion system. The
// §6 easing-doctrine "which easing for which job" table is the story's legend.
//
// The dots are driven by the JS twin (the `MOTION_CURVES[token].js` callable),
// NOT a CSS easing string — this is the JS-half witness (the foundations/motion
// page is the CSS-half tour). Spring rows sample the keyframes.js `Easing.fn`;
// bezier rows the value.js `TimingFunction` directly.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { onUnmounted, ref } from "vue";
import {
    MOTION_CURVES_CANONICAL,
    type MotionCurve,
} from "../../../src/composables/motion/curves";
import { cn } from "../../../src/utils/cn";

// The JS name for a curve (the doctrine table's right column made concrete).
const JS_NAME: Record<string, string> = {
    "--spring-smooth": "springTimingFunction(0.5, 0.86)",
    "--spring-snappy": "springTimingFunction(0.35, 0.65)",
    "--spring-bouncy": "springTimingFunction(0.5, 0.45)",
    "--spring-gentle": "springTimingFunction(0.7, 1.0)",
    "--spring-dock": "springTimingFunction(0.32, 0.7)",
    "--motion-ease-standard": "CSSCubicBezier(.4,0,.2,1)",
    "--motion-ease-out": "CSSCubicBezier(0,0,.2,1)",
    "--motion-ease-in": "CSSCubicBezier(.4,0,1,1)",
    "--motion-ease-out-expo": "easeOutExpo",
    "--motion-ease-apple": "CSSCubicBezier(.25,.1,.25,1)",
};

const curves = MOTION_CURVES_CANONICAL;
const TRAVEL = 280; // px
const DUR = 1100; // ms

// Sample a row's JS twin at progress t∈[0,1] (spring → Easing.fn; bezier → fn).
function sample(curve: MotionCurve, t: number): number {
    const js = curve.js as { fn?: (t: number) => number } | ((t: number) => number);
    return typeof js === "function" ? js(t) : (js.fn?.(t) ?? t);
}

// Pre-compute each curve's plot polyline (the small-multiple plot) from the twin.
function plotPoints(curve: MotionCurve): string {
    const W = 120;
    const H = 56;
    const N = 48;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
        const t = i / N;
        const y = sample(curve, t); // value (may overshoot >1 for springs)
        // map y∈[~0, ~1.2] into the box, inverted (SVG y grows down), padded.
        const py = H - 6 - y * (H - 12);
        pts.push(`${(t * W).toFixed(1)},${py.toFixed(1)}`);
    }
    return pts.join(" ");
}

const dotRefs = ref<Record<string, HTMLElement | null>>({});
const raf = ref<Record<string, number>>({});

function setDotRef(token: string, el: Element | null): void {
    dotRefs.value[token] = el as HTMLElement | null;
}

// Drive a dot by sampling the JS twin per rAF — the JS-half is the source of the
// motion (not a CSS easing). Spring overshoot is visible (the dot travels past
// TRAVEL then settles).
function play(curve: MotionCurve): void {
    const el = dotRefs.value[curve.token];
    if (!el) return;
    if (raf.value[curve.token]) cancelAnimationFrame(raf.value[curve.token]);
    const start = performance.now();
    const step = (now: number) => {
        const t = Math.min(1, (now - start) / DUR);
        const y = sample(curve, t);
        el.style.transform = `translateX(${(y * TRAVEL).toFixed(2)}px)`;
        if (t < 1) {
            raf.value[curve.token] = requestAnimationFrame(step);
        } else {
            // settle exactly at the end value.
            el.style.transform = `translateX(${(sample(curve, 1) * TRAVEL).toFixed(2)}px)`;
        }
    };
    raf.value[curve.token] = requestAnimationFrame(step);
}

function playAll(): void {
    for (const c of curves) play(c);
}

onUnmounted(() => {
    for (const id of Object.values(raf.value)) cancelAnimationFrame(id);
});

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
            label="The curve set"
            blurb="The CSS↔JS curve table, live — every MOTION_CURVES row drives a dot off its JS twin (springs sample the keyframes.js Easing, beziers the value.js callable). Press Play to fire the whole grid; spring rows overshoot past the track then settle."
        >
            <div class="mb-4">
                <button
                    type="button"
                    class="btn-pill glass-btn rounded-pill px-4 py-2 text-sm font-medium"
                    @click="playAll"
                >
                    ▶ Play all
                </button>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
                <button
                    v-for="curve in curves"
                    :key="curve.token"
                    type="button"
                    class="glass-card rounded-card p-4 text-left transition-transform hover:scale-[1.01]"
                    @click="play(curve)"
                >
                    <div class="mb-2 flex items-baseline justify-between gap-2">
                        <code class="text-sm font-semibold text-foreground">{{ curve.token }}</code>
                        <span
                            :class="cn(
                                'rounded-pill px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide',
                                curve.kind === 'spring'
                                    ? 'bg-[var(--surface-tint-2)] text-foreground'
                                    : 'bg-[var(--surface-tint-1)] text-muted-foreground',
                            )"
                        >{{ curve.kind }}</span>
                    </div>
                    <code class="mb-2 block text-xs text-muted-foreground">{{ JS_NAME[curve.token] ?? "—" }}</code>
                    <p class="mb-3 text-xs text-muted-foreground">{{ curve.note }}</p>

                    <!-- the plot (the curve shape from the JS twin) -->
                    <svg viewBox="0 0 120 56" class="mb-3 h-14 w-full">
                        <line x1="0" y1="50" x2="120" y2="50" class="stroke-border" stroke-width="0.5" />
                        <line x1="0" y1="12" x2="120" y2="12" class="stroke-border/40" stroke-width="0.5" stroke-dasharray="2 2" />
                        <polyline
                            :points="plotPoints(curve)"
                            fill="none"
                            class="stroke-[var(--primary)]"
                            stroke-width="1.5"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <!-- the driven dot (the JS twin animates translateX) -->
                    <div class="relative h-3 w-full overflow-visible rounded-pill bg-[var(--surface-tint-1)]">
                        <div
                            :ref="(el) => setDotRef(curve.token, el as Element | null)"
                            class="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-pill bg-[var(--primary)]"
                            style="will-change: transform"
                        />
                    </div>
                </button>
            </div>
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
                        <tr v-for="row in doctrine" :key="row.kind" class="border-t border-border/40">
                            <td class="px-4 py-2 text-foreground">{{ row.kind }}</td>
                            <td class="px-4 py-2"><code class="text-xs text-muted-foreground">{{ row.easing }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StorySection>
    </StoryPage>
</template>
