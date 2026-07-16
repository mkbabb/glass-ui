// BB.W-EASING-PRIMITIVE — the shared <EasingPicker> editor state (the C-3 fold's
// composable half). The two demo editors (BezierEditor / StepsEditor) re-home onto
// this ONE primitive — no fourth fork.
//
// Curve math belongs to value.js; this editor owns only its authoring chassis and
// a bounded normalized one-shot preview. The preview is UI feedback, not reusable
// physical/keyframes playback. This composable reaches for all curve math:
//   · the bezier curve callable is value.js `CubicBezier`;
//   · the staircase callable is value.js `steppedEase(n, term)`;
//   · the bezier preset catalogue is value.js `bezierPresets`;
//   · the staircase jump-term family is value.js `jumpTerms`.
// It re-implements NEITHER a cubic-bezier Newton-solver NOR a staircase evaluator
// (direct owner imports; no local solver or catalogue mirror).

import {
    computed,
    onScopeDispose,
    ref,
    watch,
    type ComputedRef,
    type Ref,
} from "vue";
import { useReducedMotion } from "../../../composables/motion/useReducedMotion";
import {
    CubicBezier,
    steppedEase,
    jumpTerms,
    bezierPresets,
} from "@mkbabb/value.js/easing";
import { parseTimingFunction } from "@mkbabb/value.js/css";
import {
    CUSTOM_PRESET,
    DEFAULT_BEZIER_PRESET,
    DEFAULT_STEP_COUNT,
    DEFAULT_STEP_TERM,
    MAX_OVERSHOOT,
    STEP_PLOT_SAMPLES,
    SVG_FLIP,
    TRAVEL_DURATION_MS,
    VIEW_PAD,
    VIEWBOX_FIT_SAMPLES,
} from "../constants";

/** The two curve-authoring modes — the two donor arms unified. */
export type EasingPickerMode = "bezier" | "steps";

/** A `(t: number) => number` easing callable — the value.js family shape. */
export type EasingFn = (t: number) => number;

/** The bezier control-point quad `[x1, y1, x2, y2]`. */
export type BezierPoints = [number, number, number, number];

/** A canonical CSS step jump term. */
export type JumpTerm = (typeof jumpTerms)[number];

/** The picker's v-model payload — the live curve callable + its re-parseable
 *  CSS literal + the mode, so a consumer can read back the authored curve. */
export interface EasingPickerValue {
    readonly mode: EasingPickerMode;
    /** The complete re-parseable CSS literal (`cubic-bezier(…)` / `steps(…)`). */
    readonly css: string;
    /** The live value.js easing callable the literal evaluates to. */
    readonly fn: EasingFn;
    /** The bezier control points (bezier mode). */
    readonly points: BezierPoints;
    /** The step jump count (steps mode). */
    readonly steps: number;
    /** The step jump term (steps mode). */
    readonly term: JumpTerm;
}

export interface UseEasingPickerOptions {
    /** The initial mode (default `"bezier"`). */
    initialMode?: EasingPickerMode;
    /** The initial bezier preset key (default `"ease-out-back"`). */
    initialPreset?: string;
    /** The initial step count (default 4). */
    initialSteps?: number;
    /** The initial step term (default `"jump-end"`). */
    initialTerm?: JumpTerm;
}

export interface UseEasingPickerReturn {
    // ── mode ──────────────────────────────────────────────────────────────────
    mode: Ref<EasingPickerMode>;
    // ── bezier state ───────────────────────────────────────────────────────────
    preset: Ref<string>;
    points: Ref<BezierPoints>;
    presetNames: readonly string[];
    selectPreset: (name: string) => void;
    setHandle: (index: 0 | 1, x: number, y: number) => void;
    // ── steps state ────────────────────────────────────────────────────────────
    steps: Ref<number>;
    term: Ref<JumpTerm>;
    terms: readonly JumpTerm[];
    // ── the curve (the REAL value.js twin) ───────────────────────────────────────
    /** The live easing callable for the active mode — re-derived on every edit. */
    easingFn: ComputedRef<EasingFn>;
    /** The complete re-parseable readout literal for the active mode. */
    readout: ComputedRef<string>;
    /** Whether the authored readout round-trips through Value's CSS parser. */
    reparseOk: ComputedRef<boolean>;
    /** The full v-model payload (mode + css + fn + raw params). */
    value: ComputedRef<EasingPickerValue>;
    // ── SVG plot geometry (the chassis) ──────────────────────────────────────────
    /** Two SVG-space handle coords `[{x,y},{x,y}]` (bezier mode). */
    handlesSvg: ComputedRef<{ x: number; y: number }[]>;
    /** The bezier path `d` (`M 0 1 C …`). */
    bezierPathD: ComputedRef<string>;
    /** The sampled staircase path `d` (steps mode). */
    stepPathD: ComputedRef<string>;
    /** The bezier-canvas viewBox `{ minY, height }` clamping overshoot. */
    viewBox: ComputedRef<{ minY: number; height: number }>;
    // ── playback (bounded editor-local normalized one-shot) ──────────────────────
    progress: Ref<number>;
    playing: Ref<boolean>;
    playbackState: ComputedRef<"idle" | "playing" | "complete">;
    reducedMotion: Readonly<Ref<boolean>>;
    playTravel: () => void;
    cancelTravel: () => void;
    stopTravel: () => void;
}

const PRESET_NAMES = Object.keys(bezierPresets);

function easingValue(
    operation: string,
    result: ReturnType<typeof CubicBezier>,
): EasingFn {
    if (!result.ok) throw new Error(`${operation}: ${result.error.code}`);
    return result.value;
}

/**
 * The <EasingPicker> shared editor state. Composes the value.js math; owns the
 * chassis (control points, the literal, the rAF travel). Used by the EasingPicker
 * SFC + (composed through it) the EasingConfigurator register — ONE source.
 */
export function useEasingPicker(
    options: UseEasingPickerOptions = {},
): UseEasingPickerReturn {
    const mode = ref<EasingPickerMode>(options.initialMode ?? "bezier");

    // ── bezier ───────────────────────────────────────────────────────────────
    const preset = ref<string>(options.initialPreset ?? DEFAULT_BEZIER_PRESET);
    const seedKey = (
        preset.value in bezierPresets ? preset.value : DEFAULT_BEZIER_PRESET
    ) as keyof typeof bezierPresets;
    const points = ref<BezierPoints>([...bezierPresets[seedKey]] as BezierPoints);

    function selectPreset(name: string): void {
        preset.value = name;
        const p = bezierPresets[name as keyof typeof bezierPresets];
        if (p) points.value = [...p] as BezierPoints;
    }

    /** Move a control handle (0 or 1) to clamped (x in [0,1], y in overshoot band). */
    function setHandle(index: 0 | 1, x: number, y: number): void {
        const cx = Math.max(0, Math.min(1, x));
        const cy = Math.max(-MAX_OVERSHOOT, Math.min(1 + MAX_OVERSHOOT, y));
        const next: BezierPoints = [...points.value];
        next[index * 2] = +cx.toFixed(3);
        next[index * 2 + 1] = +cy.toFixed(3);
        points.value = next;
        preset.value = CUSTOM_PRESET;
    }

    // ── steps ────────────────────────────────────────────────────────────────
    const steps = ref<number>(options.initialSteps ?? DEFAULT_STEP_COUNT);
    const term = ref<JumpTerm>(options.initialTerm ?? DEFAULT_STEP_TERM);

    // ── the REAL value.js twin (mode-aware) ────────────────────────────────────
    // Both constructors are failure-explicit; this closed editor supplies valid
    // domains and surfaces any producer contradiction instead of substituting identity.
    const easingFn = computed<EasingFn>(() => {
        if (mode.value === "steps") {
            return easingValue(
                "EasingPicker:steppedEase",
                steppedEase(steps.value, term.value),
            );
        }
        const [x1, y1, x2, y2] = points.value;
        return easingValue(
            "EasingPicker:CubicBezier",
            CubicBezier(x1, y1, x2, y2),
        );
    });

    const readout = computed<string>(() => {
        if (mode.value === "steps") return `steps(${steps.value}, ${term.value})`;
        const [x1, y1, x2, y2] = points.value.map((n) => +n.toFixed(3));
        return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    });

    // Both authored modes reparse through the sole CSS timing-text owner.
    const reparseOk = computed<boolean>(() => {
        const parsed = parseTimingFunction(readout.value);
        if (!parsed.ok) return false;
        const value = parsed.value;
        if (mode.value === "steps") {
            return value.kind === "steps"
                && value.count === steps.value
                && value.position === term.value;
        }
        return value.kind === "cubic-bezier"
            && value.x1 === points.value[0]
            && value.y1 === points.value[1]
            && value.x2 === points.value[2]
            && value.y2 === points.value[3];
    });

    const value = computed<EasingPickerValue>(() => ({
        mode: mode.value,
        css: readout.value,
        fn: easingFn.value,
        points: [...points.value] as BezierPoints,
        steps: steps.value,
        term: term.value,
    }));

    // ── SVG plot geometry ──────────────────────────────────────────────────────
    const handlesSvg = computed(() => {
        const [x1, y1, x2, y2] = points.value;
        return [
            { x: x1, y: SVG_FLIP(y1) },
            { x: x2, y: SVG_FLIP(y2) },
        ];
    });

    const bezierPathD = computed(() => {
        const [c1, c2] = handlesSvg.value;
        return `M 0 1 C ${c1!.x} ${c1!.y}, ${c2!.x} ${c2!.y}, 1 0`;
    });

    const stepPathD = computed(() => {
        const fn = easingFn.value;
        let d = "";
        for (let i = 0; i <= STEP_PLOT_SAMPLES; i++) {
            const t = i / STEP_PLOT_SAMPLES;
            const y = SVG_FLIP(fn(t));
            d += i === 0 ? `M ${t} ${y}` : ` L ${t} ${y}`;
        }
        return d;
    });

    const viewBox = computed(() => {
        const ys: number[] = [0, 1, handlesSvg.value[0]!.y, handlesSvg.value[1]!.y];
        for (let i = 0; i <= VIEWBOX_FIT_SAMPLES; i++) {
            ys.push(SVG_FLIP(easingFn.value(i / VIEWBOX_FIT_SAMPLES)));
        }
        const minY = Math.max(Math.min(...ys), -MAX_OVERSHOOT) - VIEW_PAD;
        const maxY = Math.min(Math.max(...ys), 1 + MAX_OVERSHOOT) + VIEW_PAD;
        return { minY, height: maxY - minY };
    });

    // ── playback ───────────────────────────────────────────────────────────────
    // A normalized one-shot is proportionate editor feedback. It is intentionally
    // local and distinct from reusable/physical keyframes playback.
    const progress = ref(0);
    const playing = ref(false);
    const playbackState = computed<"idle" | "playing" | "complete">(() =>
        playing.value ? "playing" : progress.value >= 1 ? "complete" : "idle",
    );
    let rafId = 0;
    let runId = 0;
    const reducedMotion = useReducedMotion();
    function stopTravel(): void {
        runId++;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        playing.value = false;
    }
    function cancelTravel(): void {
        stopTravel();
        progress.value = 0;
    }
    const stopReducedMotionWatch = watch(
        reducedMotion,
        (reduced) => {
            if (reduced && playing.value) {
                stopTravel();
                progress.value = 1;
            }
        },
        { flush: "sync" },
    );
    function playTravel(): void {
        stopTravel();
        progress.value = 0;
        if (reducedMotion.value) {
            progress.value = 1;
            return;
        }
        playing.value = true;
        const activeRun = runId;
        const start = performance.now();
        const tick = (now: number) => {
            if (activeRun !== runId) return;
            const t = Math.min(1, (now - start) / TRAVEL_DURATION_MS);
            progress.value = t;
            if (t < 1) rafId = requestAnimationFrame(tick);
            else {
                rafId = 0;
                playing.value = false;
            }
        };
        rafId = requestAnimationFrame(tick);
    }
    onScopeDispose(() => {
        stopReducedMotionWatch();
        stopTravel();
    });

    return {
        mode,
        preset,
        points,
        presetNames: PRESET_NAMES,
        selectPreset,
        setHandle,
        steps,
        term,
        terms: jumpTerms,
        easingFn,
        readout,
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
    };
}
