<script setup lang="ts">
// BB.W-EASING-PRIMITIVE — the ONE published curve-authoring component (the C-3 fold
// landed). The two demo editors (BezierEditor / StepsEditor) re-home onto this; the
// kf donor (EasingEditor/EasingCurveCanvas) stays in the kf demo (the cross-repo
// fence) and is the DESIGN REFERENCE for the props-in/events-out, state-shape-
// agnostic shape.
//
// THE BOUNDARY LAW: curve MATH = value.js (CSSCubicBezier / steppedEase / bezier-
// Presets / jumpTerms, composed via useEasingPicker) · playback = a one-shot rAF
// (the kf Oscillator slots into the `loop` seam when it ships) · the editor
// COMPONENT = glass-ui. This SFC re-implements NO math — every curve callable is a
// value.js import (through the composable).
//
// The canvas chrome is Tailwind utilities + token custom-properties (the tailwind-
// first law; the BezierEditor/StepsEditor idiom carried in), NEVER raw pasted CSS.
// The curve strokes `--motion-accent` — the motion family's single color event;
// the root folds it into the component-local `--easing-curve-accent` with the
// library's OWN `--viz-legendre` violet twin as the fallback, so every accent
// site reads the bare `(--easing-curve-accent)` shorthand while the consumer can
// still override `--motion-accent` from any ancestor (the ppmycota fence: a demo
// hue NEVER enters a library token, and the primitive is self-sufficient
// standalone).
import { computed, onUnmounted, ref, useTemplateRef, watch } from "vue";
import { Check, Copy } from "@lucide/vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
import { Slider } from "../slider";
import {
    useEasingPicker,
    type EasingPickerMode,
    type EasingPickerValue,
    type JumpTerm,
} from "./composables/useEasingPicker";
import {
    COPY_FEEDBACK_MS,
    HANDLE_HIT_RADIUS,
    HANDLE_HIT_RADIUS_TOUCH,
    SVG_FLIP,
    STEP_COUNT_MAX,
    STEP_COUNT_MIN,
} from "./constants";

const props = withDefaults(
    defineProps<{
        /** The curve-authoring mode — `"bezier"` (draggable cubic-bezier) or
         *  `"steps"` (the steppedEase staircase). */
        mode?: EasingPickerMode;
        /** The initial bezier preset key. */
        preset?: string;
        /** The initial step count. */
        steps?: number;
        /** The initial step jump term. */
        term?: JumpTerm;
        /** Show the copy-the-literal readout affordance (default true). */
        readout?: boolean;
        /** Show the playback travel-dot control (default true). */
        playback?: boolean;
        /** A11y label for the canvas. */
        label?: string;
    }>(),
    {
        mode: "bezier",
        preset: undefined,
        steps: undefined,
        term: undefined,
        readout: true,
        playback: true,
        label: "Easing curve",
    },
);

// The v-model is the full authored-curve payload (mode + css literal + the live
// value.js callable + raw params) — props-in/events-out, state-shape-agnostic (the
// kf EasingEditor reference shape).
const model = defineModel<EasingPickerValue>();

const picker = useEasingPicker({
    initialMode: props.mode,
    initialPreset: props.preset,
    initialSteps: props.steps,
    initialTerm: props.term,
});

const {
    mode,
    preset,
    points,
    presetNames,
    selectPreset,
    setHandle,
    steps,
    term,
    terms,
    easingFn,
    readout: readoutLiteral,
    reparseOk,
    value,
    handlesSvg,
    bezierPathD,
    stepPathD,
    viewBox,
    progress,
    playTravel,
    stopTravel,
} = picker;

// Keep the composable mode in lockstep with the prop (a parent flipping
// :mode="steps" re-points the editor — the two donor arms on ONE primitive).
watch(
    () => props.mode,
    (m) => {
        mode.value = m;
    },
);

// Emit the v-model on every authored change.
watch(value, (v) => (model.value = v), { immediate: true });

onUnmounted(stopTravel);

// ── bezier drag (self-contained pointer-capture, no external seam) ─────────────
const svgEl = useTemplateRef<SVGSVGElement>("svgEl");
const dragIndex = ref<0 | 1 | null>(null);

function pointerToSvg(ev: PointerEvent): { x: number; y: number } {
    const svg = svgEl.value;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inv = ctm.inverse();
    const sx = inv.a * ev.clientX + inv.c * ev.clientY + inv.e;
    const sy = inv.b * ev.clientX + inv.d * ev.clientY + inv.f;
    return { x: sx, y: SVG_FLIP(sy) };
}

function onDown(ev: PointerEvent): void {
    if (mode.value !== "bezier") return;
    const { x, y } = pointerToSvg(ev);
    const r = ev.pointerType === "touch" ? HANDLE_HIT_RADIUS_TOUCH : HANDLE_HIT_RADIUS;
    const hs = [
        { x: points.value[0], y: points.value[1] },
        { x: points.value[2], y: points.value[3] },
    ];
    let idx: 0 | 1 | null = null;
    let best = Infinity;
    for (let i = 0; i < 2; i++) {
        const d = Math.hypot(hs[i]!.x - x, hs[i]!.y - y);
        if (d < r && d < best) {
            best = d;
            idx = i as 0 | 1;
        }
    }
    if (idx === null) return;
    ev.preventDefault();
    dragIndex.value = idx;
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
}

function onMove(ev: PointerEvent): void {
    if (dragIndex.value === null) return;
    const { x, y } = pointerToSvg(ev);
    setHandle(dragIndex.value, x, y);
}

function onUp(): void {
    dragIndex.value = null;
}

// ── copy state ────────────────────────────────────────────────────────────────
const copied = ref(false);
async function copy(): Promise<void> {
    try {
        await navigator.clipboard.writeText(readoutLiteral.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), COPY_FEEDBACK_MS);
    } catch {
        // fail-explicit: a befitting swallow — the Clipboard API is unavailable
        // (insecure context / permission denied / no navigator.clipboard). The copy
        // is a convenience affordance, not a contract: `copied` stays false so the
        // "copied!" feedback simply never fires; the readout literal is still on
        // screen for a manual select-copy. No state to recover, nothing to throw.
    }
}

// The bezier canvas viewBox (clamps overshoot) vs the steps canvas frame (a 0/1
// unit box with a gentle pad).
const canvasViewBox = computed(() =>
    mode.value === "bezier"
        ? `0 ${viewBox.value.minY} 1 ${viewBox.value.height}`
        : "-0.05 -0.1 1.1 1.2",
);

// The `n`-count control is the dogfooded glass-ui <Slider> (the affordance-mapped
// scrubber, not a raw <input type="range">). reka's SliderRoot v-models a
// number[], so this bridges the array ↔ the scalar `steps` ref the composable owns.
const stepsModel = computed<number[]>({
    get: () => [steps.value],
    set: (v) => {
        steps.value = v[0] ?? steps.value;
    },
});
</script>

<template>
    <div
        class="grid gap-4 lg:grid-cols-[1fr_18rem]"
        :data-mode="mode"
        data-testid="easing-picker"
        style="--easing-curve-accent: var(--motion-accent, var(--viz-legendre))"
    >
        <!-- the editable curve canvas (bezier draggable / steps staircase) -->
        <div class="glass-card relative overflow-hidden rounded-card p-3">
            <svg
                ref="svgEl"
                class="block w-full touch-none select-none"
                :viewBox="canvasViewBox"
                preserveAspectRatio="xMidYMid meet"
                style="aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto"
                :aria-label="label"
                role="img"
                @pointerdown="onDown"
                @pointermove="onMove"
                @pointerup="onUp"
                @pointercancel="onUp"
            >
                <!-- bounding box + diagonal reference -->
                <rect x="0" y="0" width="1" height="1" fill="none" class="stroke-border" stroke-width="0.012" />
                <line x1="0" y1="1" x2="1" y2="0" class="stroke-muted-foreground/30" stroke-width="0.006" stroke-dasharray="0.02 0.015" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gx' + v" :x1="v" y1="0" :x2="v" y2="1" class="stroke-border/40" stroke-width="0.006" />
                <line v-for="v in [0.25, 0.5, 0.75]" :key="'gy' + v" x1="0" :y1="v" x2="1" :y2="v" class="stroke-border/40" stroke-width="0.006" />

                <!-- axis labels -->
                <text x="0.05" y="0.95" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="start">0</text>
                <text x="0.95" y="0.12" class="fill-muted-foreground/60" style="font-size: 0.05px; font-family: var(--font-mono)" text-anchor="end">1</text>

                <!-- BEZIER: handle lines + draggable handles -->
                <template v-if="mode === 'bezier'">
                    <line :x1="0" :y1="1" :x2="handlesSvg[0]!.x" :y2="handlesSvg[0]!.y" class="stroke-muted-foreground/50" stroke-width="0.02" stroke-dasharray="0.03 0.02" />
                    <line :x1="1" :y1="0" :x2="handlesSvg[1]!.x" :y2="handlesSvg[1]!.y" class="stroke-muted-foreground/50" stroke-width="0.02" stroke-dasharray="0.03 0.02" />
                    <path :d="bezierPathD" fill="none" class="stroke-(--easing-curve-accent)" stroke-width="0.035" stroke-linecap="round" />
                </template>

                <!-- STEPS: the sampled staircase (the REAL value.js steppedEase twin) -->
                <template v-else>
                    <path :d="stepPathD" fill="none" class="stroke-(--easing-curve-accent)" stroke-width="0.025" stroke-linejoin="miter" stroke-linecap="butt" />
                </template>

                <!-- endpoints (fixed) -->
                <circle cx="0" cy="1" r="0.018" class="fill-muted-foreground/50" />
                <circle cx="1" cy="0" r="0.018" class="fill-muted-foreground/50" />

                <!-- bezier draggable handles -->
                <template v-if="mode === 'bezier'">
                    <circle :cx="handlesSvg[0]!.x" :cy="handlesSvg[0]!.y" r="0.04" class="fill-foreground stroke-background" stroke-width="0.02" style="cursor: move" />
                    <circle :cx="handlesSvg[1]!.x" :cy="handlesSvg[1]!.y" r="0.04" class="fill-foreground stroke-background" stroke-width="0.02" style="cursor: move" />
                </template>

                <!-- travelling dot (the playback arm) -->
                <circle v-if="playback" :cx="progress" :cy="1 - easingFn(progress)" r="0.03" class="fill-(--easing-curve-accent)" />
            </svg>
        </div>

        <!-- the controls column -->
        <div class="flex flex-col gap-4">
            <!-- BEZIER preset dropdown -->
            <div v-if="mode === 'bezier'" class="flex flex-col gap-2">
                <span class="text-mono-caption text-muted-foreground">Preset</span>
                <Select :model-value="preset" @update:model-value="(v) => selectPreset(String(v))">
                    <!-- BI.W-SLIDER-THUMB-NAME (proof:a11y EasingPicker arm) — the preset
                         combobox carries a real accessible name. The visible "Preset"
                         caption above is a bare <span> (not a <label for>), so without
                         this the SelectTrigger's name was only its selected value — the
                         R→S→T chronic. The Jump-term trigger (steps mode) is already named. -->
                    <SelectTrigger aria-label="Easing preset">
                        <SelectValue placeholder="Pick a curve" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="name in presetNames" :key="name" :value="name">
                            {{ name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- STEPS n + term controls -->
            <template v-else>
                <div class="flex flex-col gap-2">
                    <span class="text-mono-caption text-muted-foreground">Steps (n) — {{ steps }}</span>
                    <!-- the dogfooded glass-ui <Slider> (the affordance-mapped
                         scrubber) drives the live value.js steppedEase(n, term) -->
                    <Slider
                        v-model="stepsModel"
                        :min="STEP_COUNT_MIN"
                        :max="STEP_COUNT_MAX"
                        :step="1"
                        aria-label="Step count"
                        data-testid="easing-steps-n"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-mono-caption text-muted-foreground">Jump term</span>
                    <Select :model-value="term" @update:model-value="(v) => (term = String(v) as JumpTerm)">
                        <SelectTrigger aria-label="Jump term">
                            <SelectValue placeholder="Pick a jump term" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="t in terms" :key="t" :value="t">
                                {{ t }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </template>

            <!-- the complete re-parseable readout + copy. data-reparse-ok proves the
                 steps literal round-trips through value.js parseSteps (the
                 boundary-law surface, readable by the π spec). -->
            <div
                v-if="readout"
                class="glass-card flex items-center gap-2 rounded-card px-3 py-2"
                :data-reparse-ok="reparseOk"
                data-testid="easing-readout"
            >
                <code class="min-w-0 flex-1 truncate text-xs text-foreground" :title="readoutLiteral">{{ readoutLiteral }}</code>
                <button
                    type="button"
                    class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-(--surface-tint-8) hover:text-foreground"
                    :aria-label="copied ? 'Copied' : 'Copy curve literal'"
                    @click="copy"
                >
                    <Check v-if="copied" class="size-4 text-(--easing-curve-accent)" />
                    <Copy v-else class="size-4" />
                </button>
            </div>

            <!-- the playback travel control -->
            <button
                v-if="playback"
                type="button"
                class="btn-pill glass-btn rounded-pill px-3 py-2 text-sm text-foreground"
                @click="playTravel"
            >
                {{ mode === "steps" ? "Climb the staircase" : "Trace the curve" }}
            </button>

            <slot name="footer" :value="value" />
        </div>
    </div>
</template>
