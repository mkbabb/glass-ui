<script setup lang="ts">
// BB.W-EASING-PRIMITIVE — the ONE published curve-authoring component (the C-3 fold
// landed). The two demo editors (BezierEditor / StepsEditor) re-home onto this; the
// kf donor (EasingEditor/EasingCurveCanvas) stays in the kf demo (the cross-repo
// fence) and is the DESIGN REFERENCE for the props-in/events-out, state-shape-
// agnostic shape.
//
// Curve math belongs to value.js. The component owns a bounded editor-local
// normalized one-shot preview, distinct from reusable physical/keyframes playback.
// This SFC re-implements no curve math.
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
import { computed, onUnmounted, ref, useId, useTemplateRef, watch } from "vue";
import { Check, Copy, LoaderCircle, Play, RotateCcw, Square } from "@lucide/vue";
import { Button } from "../button";
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
    COPY_ATTEMPT_TIMEOUT_MS,
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
    playing,
    playbackState,
    reducedMotion,
    playTravel,
    cancelTravel,
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

function sameValue(
    left: EasingPickerValue | undefined,
    right: EasingPickerValue,
): boolean {
    return !!left
        && Array.isArray(left.points)
        && left.points.length === 4
        && left.mode === right.mode
        && left.css === right.css
        && left.fn === right.fn
        && left.steps === right.steps
        && left.term === right.term
        && left.points.every((point, index) => point === right.points[index]);
}

let lastWritten: EasingPickerValue | undefined;

function writeModel(next: EasingPickerValue): void {
    if (sameValue(model.value, next) || sameValue(lastWritten, next)) return;
    lastWritten = next;
    model.value = next;
}

function applyModel(next: EasingPickerValue | undefined): void {
    if (!next) return;
    if (sameValue(lastWritten, next)) {
        lastWritten = undefined;
        return;
    }

    mode.value = next.mode === "steps" ? "steps" : "bezier";
    if (
        Array.isArray(next.points)
        && next.points.length === 4
        && next.points.every(Number.isFinite)
        && next.points.some((point, index) => point !== points.value[index])
    ) {
        setHandle(0, next.points[0]!, next.points[1]!);
        setHandle(1, next.points[2]!, next.points[3]!);
    }
    if (Number.isFinite(next.steps)) {
        steps.value = Math.max(
            STEP_COUNT_MIN,
            Math.min(STEP_COUNT_MAX, Math.round(next.steps)),
        );
    }
    if (terms.includes(next.term)) term.value = next.term;

    const canonical = value.value;
    if (!sameValue(next, canonical)) writeModel(canonical);
}

// v-model is a genuine two-way authoring surface. Raw authoring fields flow in;
// css and fn always flow back from the canonical value.js-derived state.
watch(model, applyModel, { deep: true, immediate: true });
watch(value, writeModel, { immediate: true });

// ── bezier drag (self-contained pointer-capture, no external seam) ─────────────
const svgEl = useTemplateRef<SVGSVGElement>("svgEl");
const handleInstructionsId = useId();
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

function onHandleKeydown(index: 0 | 1, ev: KeyboardEvent): void {
    const offset = index * 2;
    const x = points.value[offset]!;
    const y = points.value[offset + 1]!;
    const step = ev.shiftKey ? 0.1 : 0.01;
    let nextX = x;
    let nextY = y;
    switch (ev.key) {
        case "ArrowLeft": nextX -= step; break;
        case "ArrowRight": nextX += step; break;
        case "ArrowDown": nextY -= step; break;
        case "ArrowUp": nextY += step; break;
        case "Home": nextX = 0; break;
        case "End": nextX = 1; break;
        default: return;
    }
    ev.preventDefault();
    setHandle(index, nextX, nextY);
}

// ── copy state ────────────────────────────────────────────────────────────────
type CopyState = "idle" | "pending" | "copied" | "failed";
const copyState = ref<CopyState>("idle");
const readoutEl = useTemplateRef<HTMLElement>("readoutEl");
let copyAttempt = 0;
let copyResetTimer: ReturnType<typeof setTimeout> | undefined;
let copyTimeoutTimer: ReturnType<typeof setTimeout> | undefined;

function clearCopyTimers(): void {
    if (copyResetTimer !== undefined) clearTimeout(copyResetTimer);
    if (copyTimeoutTimer !== undefined) clearTimeout(copyTimeoutTimer);
    copyResetTimer = undefined;
    copyTimeoutTimer = undefined;
}

async function copy(): Promise<void> {
    clearCopyTimers();
    const attempt = ++copyAttempt;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    copyState.value = "pending";
    try {
        const clipboard = navigator.clipboard;
        if (!clipboard?.writeText) throw new Error("Clipboard unavailable");
        await Promise.race([
            clipboard.writeText(readoutLiteral.value),
            new Promise<never>((_, reject) => {
                timeout = setTimeout(
                    () => reject(new Error("Clipboard timed out")),
                    COPY_ATTEMPT_TIMEOUT_MS,
                );
                copyTimeoutTimer = timeout;
            }),
        ]);
        if (attempt !== copyAttempt) return;
        copyState.value = "copied";
        copyResetTimer = setTimeout(() => {
            if (attempt === copyAttempt) copyState.value = "idle";
        }, COPY_FEEDBACK_MS);
    } catch {
        if (attempt === copyAttempt) copyState.value = "failed";
    } finally {
        if (timeout !== undefined) clearTimeout(timeout);
        if (copyTimeoutTimer === timeout) copyTimeoutTimer = undefined;
    }
}

function selectLiteral(): void {
    const el = readoutEl.value;
    const selection = window.getSelection();
    if (!el || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
    el.focus();
}

const copyMessage = computed(() => ({
    idle: "",
    pending: "Copying curve literal…",
    copied: "Copied curve literal.",
    failed: "Clipboard unavailable. Select the full literal to copy manually.",
})[copyState.value]);

const playbackLabel = computed(() => {
    const noun = mode.value === "steps" ? "staircase" : "curve";
    if (playing.value) return `Restart ${noun}`;
    if (playbackState.value === "complete") return `Replay ${noun}`;
    return mode.value === "steps" ? "Climb the staircase" : "Trace the curve";
});

onUnmounted(() => {
    copyAttempt++;
    clearCopyTimers();
    stopTravel();
});

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
        :data-copy-state="copyState"
        :data-playback-state="playbackState"
        :data-reduced-motion="reducedMotion ? '' : undefined"
        data-testid="easing-picker"
        style="--easing-curve-accent: var(--motion-accent, var(--viz-legendre))"
    >
        <!-- the editable curve canvas (bezier draggable / steps staircase) -->
        <div class="glass-card relative overflow-hidden rounded-card p-3">
            <span :id="handleInstructionsId" class="sr-only">
                Left and Right change x from 0 to 1. Up and Down change y from -0.6 to 1.6. Hold Shift for larger steps.
            </span>
            <svg
                ref="svgEl"
                class="block w-full touch-none select-none"
                :viewBox="canvasViewBox"
                preserveAspectRatio="xMidYMid meet"
                style="aspect-ratio: 1; block-size: clamp(200px, 38cqi, 320px); margin-inline: auto"
                :aria-label="label"
                role="group"
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
                    <circle
                        v-for="index in ([0, 1] as const)"
                        :key="index"
                        :cx="handlesSvg[index]!.x"
                        :cy="handlesSvg[index]!.y"
                        r="0.04"
                        class="fill-foreground stroke-background focus:outline-none focus-visible:stroke-(--easing-curve-accent) focus-visible:[stroke-width:0.045]"
                        stroke-width="0.02"
                        style="cursor: move"
                        role="slider"
                        tabindex="0"
                        :aria-label="`Bezier control point ${index + 1}`"
                        :aria-valuemin="0"
                        :aria-valuemax="1"
                        :aria-valuenow="points[index * 2]"
                        :aria-valuetext="`x ${points[index * 2]!.toFixed(3)}, y ${points[index * 2 + 1]!.toFixed(3)}`"
                        :aria-describedby="handleInstructionsId"
                        @keydown="onHandleKeydown(index, $event)"
                    />
                </template>

                <!-- travelling dot (the playback arm) -->
                <circle
                    v-if="playback && playbackState !== 'idle'"
                    :cx="progress"
                    :cy="1 - easingFn(progress)"
                    r="0.03"
                    class="fill-(--easing-curve-accent)"
                    data-testid="easing-travel-dot"
                />
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

            <!-- The complete re-parseable readout + copy. Both modes round-trip
                 through value.js parseTimingFunction. -->
            <div
                v-if="readout"
                class="glass-card flex flex-col gap-2 rounded-card px-3 py-2"
                :data-reparse-ok="reparseOk"
                data-testid="easing-readout"
            >
                <div class="flex items-center gap-2">
                    <code ref="readoutEl" tabindex="0" class="min-w-0 flex-1 break-all text-xs text-foreground select-text">{{ readoutLiteral }}</code>
                    <button
                        type="button"
                        class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-(--surface-tint-8) hover:text-foreground disabled:cursor-wait disabled:opacity-disabled"
                        :disabled="copyState === 'pending'"
                        :aria-label="copyState === 'failed' ? 'Retry copy curve literal' : copyState === 'copied' ? 'Copied' : copyState === 'pending' ? 'Copying curve literal' : 'Copy curve literal'"
                        data-testid="easing-copy"
                        @click="copy"
                    >
                        <LoaderCircle v-if="copyState === 'pending'" class="size-4 animate-spin" />
                        <Check v-else-if="copyState === 'copied'" class="size-4 text-(--easing-curve-accent)" />
                        <Copy v-else class="size-4" />
                    </button>
                </div>
                <div v-if="copyState !== 'idle'" class="flex flex-wrap items-center justify-between gap-2 text-mono-caption">
                    <span role="status" aria-live="polite" :class="copyState === 'failed' ? 'text-destructive' : 'text-muted-foreground'">
                        {{ copyMessage }}
                    </span>
                    <Button v-if="copyState === 'failed'" class="shrink-0 px-3 py-1" data-testid="easing-select-literal" @click="selectLiteral">
                        Select literal
                    </Button>
                </div>
            </div>

            <!-- the playback travel control -->
            <div v-if="playback" class="flex flex-wrap items-center gap-2">
                <Button class="w-fit" data-testid="easing-playback" @click="playTravel">
                    <RotateCcw v-if="playing || playbackState === 'complete'" />
                    <Play v-else />
                    {{ playbackLabel }}
                </Button>
                <Button v-if="playing" class="w-fit" data-testid="easing-cancel" @click="cancelTravel">
                    <Square />
                    Cancel preview
                </Button>
                <span class="text-mono-caption text-muted-foreground" role="status" aria-live="polite">
                    {{ playbackState === "playing" ? "Preview playing" : playbackState === "complete" ? "Preview complete" : "Preview idle" }}
                </span>
            </div>

            <slot name="footer" :value="value" />
        </div>
    </div>
</template>
