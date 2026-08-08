<script setup lang="ts">
// `<EasingPicker>` — the curve EDITOR: `<EasingCurve>` plus a handle overlay, one
// control row, and a `v-model` carrying the authored curve.
//
// ONE EDITOR, TWO STROKES. The active mode is drawn in full ink and the other mode's
// curve is held back as a ghost, so both readings sit in the SAME frame instead of in
// two panels that used to render 9% apart while the page invited comparison. There is
// exactly ONE plot, ONE print of the literal, and ONE column: the second panel was
// where the void lived, and it no longer exists to hold one.
//
// The frame is constant (`VIEW_BOX`) and the overlay shares it, so the two SVGs map
// pixel-for-pixel by construction — no measured sync, no CTM that moves under a
// dragging finger. Handles past the frame pin to its edge along their own leader
// while the authored value keeps going, and the curve's own excursion is REPORTED
// (`data-curve-clipped` + the crossed edge in accent), never silently cropped.
//
// Curve math is value.js; this SFC re-implements none of it.
import {
    computed,
    onUnmounted,
    ref,
    useId,
    useTemplateRef,
    watch,
    type HTMLAttributes,
} from "vue";
import { Check, Copy, Play, RotateCcw, Square } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { Button } from "../button";
import DotRing from "../_shared/feedback/DotRing.vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
import { Slider } from "../slider";
import { SegmentedTabs, type SegmentedTabOption } from "../tabs";
import { useClipboard } from "../../composables/dom/useClipboard";
import EasingCurve, { type EasingStroke } from "./EasingCurve.vue";
import { useEasingPicker, type EasingPickerValue, type JumpTerm } from "./usePicker";
import {
    COPY_ATTEMPT_TIMEOUT_MS,
    COPY_FEEDBACK_MS,
    CUSTOM_PRESET,
    HANDLE_HIT_RADIUS_PX,
    HANDLE_HIT_RADIUS_TOUCH_PX,
    MAX_OVERSHOOT,
    STEP_COUNT_MAX,
    STEP_COUNT_MIN,
    SVG_FLIP,
    VIEW_BOX,
} from "./constants";

/** `card` seats the editor on the resting rung; `bare` renders no plate at all —
 *  the escape a consumer used to buy with `backdrop-filter: none` and `!important`. */
export type EasingSurface = "card" | "bare";

const props = withDefaults(
    defineProps<{
        /** The initial authored curve. Any subset; the rest takes the family default. */
        initial?: Partial<EasingPickerValue>;
        /** Show the playback transport and its travelling dot (default true). */
        playback?: boolean;
        /** A11y label for the plot. */
        label?: string;
        /** The material the editor sits on. */
        surface?: EasingSurface;
        class?: HTMLAttributes["class"];
    }>(),
    {
        initial: undefined,
        playback: true,
        label: "Easing curve",
        surface: "card",
        class: undefined,
    },
);

// The v-model is the full authored-curve payload (mode + css literal + the live
// value.js callable + raw params) — props-in/events-out, state-shape-agnostic.
const model = defineModel<EasingPickerValue>();

const picker = useEasingPicker({ initial: props.initial });

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
    handlePins,
    leaderAnchors,
    bezierPathD,
    stepPathD,
    excursion,
    progress,
    playing,
    playbackState,
    reducedMotion,
    playTravel,
    cancelTravel,
    stopTravel,
} = picker;

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

// ── the plot ──────────────────────────────────────────────────────────────────
// Both curves, always. The active one is the subject; the other is the same page's
// other reading, held back — which is what a side-by-side comparison was for, minus
// the second frame that never agreed with the first.
const strokes = computed<EasingStroke[]>(() =>
    mode.value === "steps"
        ? [
              { d: bezierPathD.value, tone: "ghost" },
              { d: stepPathD.value, tone: "ink" },
          ]
        : [
              { d: stepPathD.value, tone: "ghost" },
              { d: bezierPathD.value, tone: "ink" },
          ],
);

const travel = computed<number | null>(() =>
    props.playback && playbackState.value !== "idle" ? easingFn.value(progress.value) : null,
);

// ── the handle overlay (self-contained pointer capture, no external seam) ──────
const overlayEl = useTemplateRef<SVGSVGElement>("overlayEl");
const handleInstructionsId = useId();
const dragIndex = ref<0 | 1 | null>(null);

function pointerToCurve(ev: PointerEvent): { x: number; y: number } | null {
    const ctm = overlayEl.value?.getScreenCTM();
    if (!ctm) return null;
    const inverse = ctm.inverse();
    const sx = inverse.a * ev.clientX + inverse.c * ev.clientY + inverse.e;
    const sy = inverse.b * ev.clientX + inverse.d * ev.clientY + inverse.f;
    return { x: sx, y: SVG_FLIP(sy) };
}

/** Hit testing happens in CSS PIXELS against the painted pin — you grab what you
 *  see, and the target never shrinks with the frame. */
function nearestHandle(ev: PointerEvent): 0 | 1 | null {
    const ctm = overlayEl.value?.getScreenCTM();
    if (!ctm) return null;
    const radius =
        ev.pointerType === "touch" ? HANDLE_HIT_RADIUS_TOUCH_PX : HANDLE_HIT_RADIUS_PX;
    let found: 0 | 1 | null = null;
    let best = Infinity;
    handlePins.value.forEach((pin, index) => {
        const px = ctm.a * pin.x + ctm.c * pin.y + ctm.e;
        const py = ctm.b * pin.x + ctm.d * pin.y + ctm.f;
        const distance = Math.hypot(px - ev.clientX, py - ev.clientY);
        if (distance < radius && distance < best) {
            best = distance;
            found = index as 0 | 1;
        }
    });
    return found;
}

function onDown(ev: PointerEvent): void {
    if (mode.value !== "bezier") return;
    const index = nearestHandle(ev);
    if (index === null) return;
    ev.preventDefault();
    dragIndex.value = index;
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
}

function onMove(ev: PointerEvent): void {
    if (dragIndex.value === null) return;
    const point = pointerToCurve(ev);
    if (point) setHandle(dragIndex.value, point.x, point.y);
}

function onUp(): void {
    dragIndex.value = null;
}

// ── the draw-on sweep — a new curve INKS ITSELF IN rather than teleporting ─────
// The plot's engagement affordance, and the reason it is not decoration: this editor
// redraws the same square for every curve it is asked to show, so without the sweep a
// preset change and a no-op are the same event to the eye. `EasingCurve` owns the
// mechanism (a `clip-path` wipe — see the measurement in that file for why the
// dashoffset arm is dead under `vector-effect`); this owns the CLOCK, because only the
// editor knows the difference between a new curve arriving and a curve being edited.
//
// PRM, the arm that matters: no sweep is armed at all. `drawn` never leaves `true`,
// so a reduced-motion reader gets the finished plot on the SAME frame the curve
// changes — one frame, no spatial travel — instead of a fast version of the travel.
const drawn = ref(true);
let drawFrame = 0;

function sweep(): void {
    if (drawFrame) cancelAnimationFrame(drawFrame);
    drawFrame = 0;
    if (reducedMotion.value) {
        drawn.value = true;
        return;
    }
    drawn.value = false;
    // TWO frames, and the second one is not padding. A transition interpolates from
    // the last COMMITTED computed style, and rAF callbacks run BEFORE style
    // recalculation — so flipping back on the very next callback lands the un-drawn
    // and drawn states in one recalculation and the browser has nothing to sweep
    // from. Measured, not reasoned: the first cut of this did exactly that and
    // painted a dead 0px → 0px while `data-drawing` flickered correctly for one
    // frame. The intervening paint is what makes the sweep exist.
    drawFrame = requestAnimationFrame(() => {
        drawFrame = requestAnimationFrame(() => {
            drawFrame = 0;
            drawn.value = true;
        });
    });
}

watch([mode, preset, steps, term], () => {
    // A drag is a continuous edit of ONE curve, not the arrival of a new one, and the
    // first pointermove of every drag writes `custom` to `preset`. Re-inking under the
    // finger would fight the gesture it is supposed to answer.
    if (dragIndex.value !== null) return;
    sweep();
});

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
        case "PageDown": nextY -= 0.25; break;
        case "PageUp": nextY += 0.25; break;
        case "Home": nextX = 0; break;
        case "End": nextX = 1; break;
        default: return;
    }
    ev.preventDefault();
    setHandle(index, nextX, nextY);
}

// ── the mode switch ───────────────────────────────────────────────────────────
const MODE_OPTIONS: SegmentedTabOption[] = [
    { label: "Bezier", value: "bezier" },
    { label: "Steps", value: "steps" },
];
const modeModel = computed<string>({
    get: () => mode.value,
    set: (next) => {
        mode.value = next === "steps" ? "steps" : "bezier";
    },
});

// reka's SliderRoot v-models a number[]; this bridges the array ↔ the scalar ref.
const stepsModel = computed<number[]>({
    get: () => [steps.value],
    set: (next) => {
        steps.value = next[0] ?? steps.value;
    },
});

// ── the literal chip (THE copy control — the one print) ───────────────────────
const readoutEl = useTemplateRef<HTMLElement>("readoutEl");
const { status: copyStatus, copy: writeLiteral } = useClipboard({
    resetMs: COPY_FEEDBACK_MS,
    timeoutMs: COPY_ATTEMPT_TIMEOUT_MS,
});

type CopyState = "idle" | "pending" | "copied" | "failed";
const copyState = computed<CopyState>(() => {
    switch (copyStatus.value) {
        case "success":
            return "copied";
        case "failure":
            return "failed";
        default:
            return copyStatus.value;
    }
});

function copy(): void {
    if (copyStatus.value === "pending") return;
    void writeLiteral(readoutLiteral.value);
}

function selectLiteral(): void {
    const el = readoutEl.value;
    const selection = window.getSelection();
    if (!el || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
}

const copyMessage = computed(() => ({
    idle: "",
    pending: "Copying curve literal…",
    copied: "Copied curve literal.",
    failed: "Clipboard unavailable. Select the full literal to copy manually.",
})[copyState.value]);

const copyLabel = computed(() => {
    switch (copyState.value) {
        case "failed":
            return "Retry copy curve literal";
        case "copied":
            return "Copied";
        case "pending":
            return "Copying curve literal";
        default:
            return "Copy curve literal";
    }
});

// ── the transport — ONE vocabulary, ONE source ────────────────────────────────
// The control's label and the status region read the SAME computed, so a second
// verb cannot be introduced on one side without the other. FIVE vocabularies lived
// here — two mode-specific verb phrases, a restart word, a replay-plus-noun, and a
// three-state preview line — for one control with three states. These are the three
// words that remain, and the list of what they replaced is in the wave record, not
// in the file that is supposed to have stopped saying them.
const transport = computed<"Preview" | "Cancel" | "Replay">(() =>
    playing.value ? "Cancel" : playbackState.value === "complete" ? "Replay" : "Preview",
);

function onTransport(): void {
    if (playing.value) cancelTravel();
    else playTravel();
}

onUnmounted(() => {
    stopTravel();
    if (drawFrame) cancelAnimationFrame(drawFrame);
});
</script>

<template>
    <div
        data-slot="easing-picker"
        :class="
            cn(
                'flex flex-col gap-3',
                props.surface === 'card' && 'glass-resting rounded-card p-3',
                props.class,
            )
        "
        :data-mode="mode"
        :data-preset="preset"
        :data-surface="props.surface"
        :data-copy-state="copyState"
        :data-playback-state="playbackState"
        :data-curve-clipped="excursion.clipped ? '' : undefined"
        :data-reduced-motion="reducedMotion ? '' : undefined"
        :data-drawing="drawn ? undefined : ''"
    >
        <!-- the plot + the handle overlay, sharing ONE constant frame -->
        <div class="relative">
            <EasingCurve
                :strokes="strokes"
                :progress="progress"
                :travel="travel"
                :clipped="excursion.clipped"
                :drawn="drawn"
                :label="label"
            />

            <span :id="handleInstructionsId" class="sr-only">
                Left and Right change x from 0 to 1. Up and Down change y from -0.6 to
                1.6. Hold Shift for larger steps; Page Up and Page Down step further.
            </span>

            <svg
                v-if="mode === 'bezier'"
                ref="overlayEl"
                data-slot="easing-handles"
                class="absolute inset-0 block size-full touch-none select-none"
                :viewBox="VIEW_BOX"
                preserveAspectRatio="xMidYMid meet"
                @pointerdown="onDown"
                @pointermove="onMove"
                @pointerup="onUp"
                @pointercancel="onUp"
            >
                <!-- the leaders, truthful: each stops where its handle paints -->
                <line v-for="(pin, index) in handlePins" :key="'leader' + index" :x1="leaderAnchors[index]!.x" :y1="leaderAnchors[index]!.y" :x2="pin.x" :y2="pin.y" class="stroke-muted-foreground/50" stroke-width="1" stroke-dasharray="4 3" vector-effect="non-scaling-stroke" />
                <!-- THE PRESS ANSWER. `.tap-squish` is composed, not re-derived: the
                     `--scale-press` rung, the `--spring-press` clock and the
                     transform-origin all arrive from the one house register. Two
                     things are this lane's to add. `transform-box: fill-box` — an SVG
                     element transforms about the VIEW BOX by default, so the utility's
                     `center center` would squish the handle toward the middle of the
                     plot instead of its own centre. And `data-press-armed`, the house
                     marker for "JS owns the scale": a pointer-captured drag suppresses
                     `:active` outright, so the CSS leg would be a mechanism that never
                     fires — the drag state IS the press truth here. PRM keeps the
                     press but drops the travel: the scale lands on one frame. -->
                <circle
                    v-for="(pin, index) in handlePins"
                    :key="'handle' + index"
                    :cx="pin.x"
                    :cy="pin.y"
                    r="0.04"
                    :class="[
                        'focus-ring tap-squish fill-foreground stroke-background',
                        '[transform-box:fill-box] motion-reduce:transition-none',
                        dragIndex === index
                            ? 'cursor-grabbing scale-(--scale-press)'
                            : 'cursor-grab',
                    ]"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                    data-press-armed=""
                    :data-pressed="dragIndex === index ? '' : undefined"
                    role="slider"
                    tabindex="0"
                    :data-pinned="
                        handlesSvg[index]!.y !== pin.y || handlesSvg[index]!.x !== pin.x
                            ? ''
                            : undefined
                    "
                    :aria-label="`Bezier control point ${index + 1}`"
                    :aria-valuemin="-MAX_OVERSHOOT"
                    :aria-valuemax="1 + MAX_OVERSHOOT"
                    :aria-valuenow="points[index * 2 + 1]"
                    :aria-valuetext="`x ${points[index * 2]!.toFixed(3)}, y ${points[index * 2 + 1]!.toFixed(3)}`"
                    :aria-describedby="handleInstructionsId"
                    @keydown="onHandleKeydown(index as 0 | 1, $event)"
                />
            </svg>
        </div>

        <!-- ONE control row, height-invariant across both modes -->
        <div
            data-slot="easing-controls"
            class="flex flex-wrap items-center gap-2 [&>*]:min-h-10"
        >
            <SegmentedTabs
                v-model="modeModel"
                :options="MODE_OPTIONS"
                aria-label="Curve mode"
                class="shrink-0"
            />

            <div v-if="mode === 'bezier'" class="flex min-w-40 flex-1 items-center">
                <Select
                    :model-value="preset"
                    @update:model-value="(v) => selectPreset(String(v))"
                >
                    <SelectTrigger aria-label="Easing preset" class="w-full">
                        <SelectValue placeholder="Pick a curve" />
                    </SelectTrigger>
                    <SelectContent>
                        <!-- The live-edited curve is a real entry, so the control is
                             never a placeholder while a curve is loaded. `"custom"`
                             is not one of value.js's 30 catalogue keys, and every
                             drag writes it. -->
                        <SelectItem v-if="preset === CUSTOM_PRESET" :value="CUSTOM_PRESET">
                            Custom
                        </SelectItem>
                        <SelectItem v-for="name in presetNames" :key="name" :value="name">
                            {{ name }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div v-else class="flex min-w-40 flex-1 items-center gap-2">
                <Slider
                    v-model="stepsModel"
                    :min="STEP_COUNT_MIN"
                    :max="STEP_COUNT_MAX"
                    :step="1"
                    aria-label="Step count"
                    class="min-w-16 flex-1"
                />
                <Select
                    :model-value="term"
                    @update:model-value="(v) => (term = String(v) as JumpTerm)"
                >
                    <SelectTrigger aria-label="Jump term" class="w-36 shrink-0">
                        <SelectValue placeholder="Jump term" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="t in terms" :key="t" :value="t">
                            {{ t }}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <!-- THE LITERAL CHIP IS THE COPY CONTROL. One print of the literal in the
                 whole editor, and it is the thing you click to take it. -->
            <Button
                emphasis="quiet"
                class="min-w-0 gap-2"
                :aria-label="copyLabel"
                :aria-disabled="copyState === 'pending' || undefined"
                :data-reparse-ok="reparseOk"
                @click="copy"
            >
                <code ref="readoutEl" class="min-w-0 truncate text-micro select-text">{{
                    readoutLiteral
                }}</code>
                <DotRing v-if="copyState === 'pending'" class="size-4 shrink-0" />
                <Check v-else-if="copyState === 'copied'" class="size-4 shrink-0" aria-hidden="true" />
                <Copy v-else class="size-4 shrink-0" aria-hidden="true" />
            </Button>

            <template v-if="playback">
                <Button class="shrink-0" @click="onTransport">
                    <Square v-if="playing" aria-hidden="true" />
                    <RotateCcw v-else-if="playbackState === 'complete'" aria-hidden="true" />
                    <Play v-else aria-hidden="true" />
                    {{ transport }}
                </Button>
                <!-- Always mounted. It used to be `v-if`'d out at idle, so the first
                     state change was announced into a region that did not exist. -->
                <span
                    data-slot="easing-transport-status"
                    role="status"
                    aria-live="polite"
                    class="text-mono-caption text-muted-foreground"
                >
                    {{ transport }}
                </span>
            </template>
        </div>

        <!-- The clipboard's own channel — a DIFFERENT subject from the transport, so
             it gets its own region rather than being folded into a vocabulary it does
             not belong to. Always mounted and empty at rest: a live region that
             appears with its first message announces nothing. -->
        <span
            data-slot="easing-copy-status"
            role="status"
            aria-live="polite"
            class="sr-only"
        >
            {{ copyMessage }}
        </span>

        <!-- The visible half of a copy FAILURE, with the manual path. -->
        <div
            v-if="copyState === 'failed'"
            class="flex flex-wrap items-center gap-2 text-mono-caption text-destructive"
        >
            {{ copyMessage }}
            <Button emphasis="quiet" size="sm" class="shrink-0" @click="selectLiteral">
                Select literal
            </Button>
        </div>
    </div>
</template>
