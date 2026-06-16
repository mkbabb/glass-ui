<script setup lang="ts">
// StepsEditor — the live `steppedEase(n, term)` sub-editor for the curve
// gallery's Steps family (BA.W-FOURIER-STUDIO / REC-6, the W-MOTION3 G7 defer).
//
// ARM B (the conservative interim — BA-VJS-6 / C-3 fold). This is the DEMO-ONLY
// interim home for the deferred steps generator: a live `n` jump-count control + a
// 7-way `term` selector over the REAL value.js `steppedEase` twin (the same
// staircase evaluator the gallery's static Steps rows sample). The PUBLISHED-
// primitive fold — `<EasingPicker>`/`<EasingConfigurator>` on a `/easing` subpath
// reconciling the kf trio + this in-house twin + the value.js gradient pane
// (consumer #2) — is BOOKED to the NET-NEW W-EASING-PRIMITIVE successor wave
// (cross-repo, co-scheduled with the kf donor study; the §Named successors row).
// The published-primitive scope (a net-new public component + subpath + cross-repo
// donor reconciliation) materially exceeds the Batch-6 window, so this ships as the
// clearly-marked interim and the fold is its named successor — NOT a gate failure
// (the cross-repo fence-respect close-path). The steps sub-editor lands HERE, not a
// fourth demo-only fork: when W-EASING-PRIMITIVE publishes the picker, this logic
// re-homes INTO it (the C-3 no-fourth-fork discipline).
//
// It mirrors the in-house `BezierEditor.vue` idiom (the Tailwind-first SVG plot,
// the value.js twin, the curve reading --motion-accent — the motion family's
// single color event), NOT kf's `useDragCapture` seam (the boundary law: curve
// MATH = value.js · the editor COMPONENT = glass-ui).
import { computed, ref } from "vue";
import { steppedEase, jumpTerms } from "@mkbabb/value.js";
import StoryPlayButton from "../../StoryPlayButton.vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../src/components/ui/select";

// The 7-way jump-term axis — the value.js step-position families (the canonical
// CSS `steps()` jump-terms + the legacy start/end/both aliases).
const TERMS = jumpTerms;
type JumpTerm = (typeof jumpTerms)[number];

const n = ref(4);
const term = ref<JumpTerm>("end");

// The REAL value.js twin — re-built whenever n / term change.
const easingFn = computed(() => steppedEase(n.value, term.value));

// The complete re-parseable readout literal (the CSS steps() form).
const readout = computed(() => `steps(${n.value}, ${term.value})`);

// ── SVG geometry (bezier-Y 0 bottom/1 top → SVG-Y 0 top, grows down). ─────────
// Sample the staircase densely so the riser/tread reads crisp; the polyline
// captures the discrete jumps (a sampled staircase, not a smoothed curve).
const PLOT_SAMPLES = 240;
const stepPathD = computed(() => {
    const fn = easingFn.value;
    let d = "";
    for (let i = 0; i <= PLOT_SAMPLES; i++) {
        const t = i / PLOT_SAMPLES;
        const y = 1 - fn(t); // SVG-Y
        d += i === 0 ? `M ${t} ${y}` : ` L ${t} ${y}`;
    }
    return d;
});

// The travelling dot follows the staircase.
const progress = ref(0);
let rafId = 0;
function playTravel(): void {
    cancelAnimationFrame(rafId);
    const start = performance.now();
    const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        progress.value = t;
        if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
}
</script>

<template>
    <div class="grid gap-4 lg:grid-cols-[1fr_18rem]" data-testid="steps-editor">
        <!-- the live staircase plot -->
        <div class="glass-card relative overflow-hidden rounded-card p-3">
            <svg
                class="block w-full select-none"
                viewBox="-0.05 -0.1 1.1 1.2"
                preserveAspectRatio="xMidYMid meet"
                style="aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto"
            >
                <!-- bounding box + diagonal reference -->
                <rect x="0" y="0" width="1" height="1" fill="none" class="stroke-border" stroke-width="0.012" />
                <line x1="0" y1="1" x2="1" y2="0" class="stroke-muted-foreground/30" stroke-width="0.006" stroke-dasharray="0.02 0.015" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gx' + v" :x1="v" y1="0" :x2="v" y2="1" class="stroke-border/40" stroke-width="0.006" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gy' + v" x1="0" :y1="v" x2="1" :y2="v" class="stroke-border/40" stroke-width="0.006" />

                <!-- axis labels -->
                <text x="0.05" y="0.95" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="start">0</text>
                <text x="0.95" y="0.12" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="end">1</text>

                <!-- the staircase (the REAL value.js steppedEase twin) -->
                <path :d="stepPathD" fill="none" class="stroke-[var(--motion-accent)]" stroke-width="0.025" stroke-linejoin="miter" stroke-linecap="butt" />

                <!-- endpoints -->
                <circle cx="0" cy="1" r="0.018" class="fill-muted-foreground/50" />
                <circle cx="1" cy="0" r="0.018" class="fill-muted-foreground/50" />

                <!-- travelling dot -->
                <circle :cx="progress" :cy="1 - easingFn(progress)" r="0.03" class="fill-[var(--motion-accent)]" />
            </svg>
        </div>

        <!-- the controls column: n slider + term dropdown + readout -->
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <span class="text-mono-caption text-muted-foreground">Steps (n) — {{ n }}</span>
                <input
                    v-model.number="n"
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    class="w-full accent-[var(--motion-accent)]"
                    aria-label="Step count"
                />
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-mono-caption text-muted-foreground">Jump term</span>
                <Select :model-value="term" @update:model-value="(v) => (term = String(v) as JumpTerm)">
                    <SelectTrigger>
                        <SelectValue placeholder="Pick a jump term" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="t in TERMS" :key="t" :value="t">
                            {{ t }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- the complete re-parseable readout -->
            <div class="glass-card flex items-center gap-2 rounded-card px-3 py-2">
                <code class="min-w-0 flex-1 truncate text-xs text-foreground" :title="readout">{{ readout }}</code>
            </div>

            <StoryPlayButton label="Climb the staircase" @play="playTravel" />

            <p class="text-xs text-muted-foreground">
                Drag <code class="text-foreground">n</code> and pick a jump term — the plot is the
                real <code class="text-foreground">steppedEase</code> twin from value.js, the same
                staircase the gallery's static Steps rows sample. The published
                <code class="text-foreground">&lt;EasingPicker&gt;</code> primitive (the C-3 fold)
                is the named successor; this is the demo-only interim.
            </p>
        </div>
    </div>
</template>
