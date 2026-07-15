// BB.W-EASING-PRIMITIVE — the shared <EasingPicker> editor state (the C-3 fold's
// composable half). The two demo editors (BezierEditor / StepsEditor) re-home onto
// this ONE primitive — no fourth fork.
//
// THE BOUNDARY LAW (kf-AFFIRMED at KF-TO-GLASSUI-BB-ASKS.md:48, the load-bearing
// fence): curve MATH = value.js · playback/spring = keyframes.js · the editor
// COMPONENT = glass-ui. So this composable OWNS only the chassis state — the live
// control points / step count + term, the re-parseable CSS literal, the rAF travel
// dot — and REACHES for its math:
//   · the bezier curve callable is value.js `CSSCubicBezier`;
//   · the staircase callable is value.js `steppedEase(n, term)`;
//   · the bezier preset catalogue is value.js `bezierPresets`;
//   · the staircase jump-term family is value.js `jumpTerms`.
// It re-implements NEITHER a cubic-bezier Newton-solver NOR a staircase evaluator
// (the curves.ts NO-FORK discipline, now in a published component).

import { computed, onScopeDispose, ref, type ComputedRef, type Ref } from "vue";
import {
    CSSCubicBezier,
    steppedEase,
    jumpTerms,
    bezierPresets,
    parseSteps,
} from "@mkbabb/value.js";
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

/** A value.js step jump-term (`jump-start`/`end`/`both`/`none` + aliases). */
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
    /** The initial step term (default `"end"`). */
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
    /** Whether the steps-mode readout round-trips through value.js `parseSteps`
     *  back to the live (n, term) — the boundary-law proof that the painted
     *  staircase IS a re-parseable value.js literal, not a hand-rolled string
     *  the catalogue cannot read back. `true` in bezier mode (no steps literal). */
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
    // ── playback (the one-shot rAF travel dot; the kf Oscillator loop seam) ───────
    progress: Ref<number>;
    playTravel: () => void;
    stopTravel: () => void;
}

const PRESET_NAMES = Object.keys(bezierPresets);

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
    const seedKey = (preset.value in bezierPresets
        ? preset.value
        : DEFAULT_BEZIER_PRESET) as keyof typeof bezierPresets;
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
    // The bezier callable: value.js CSSCubicBezier(x1,y1,x2,y2). The staircase:
    // value.js steppedEase(n, term) (which returns undefined only for an unknown
    // term — never reached, the dropdown is closed over jumpTerms — but the
    // identity fallback keeps the callable total for the type system).
    const easingFn = computed<EasingFn>(() => {
        if (mode.value === "steps") {
            return steppedEase(steps.value, term.value) ?? ((t) => t);
        }
        const [x1, y1, x2, y2] = points.value;
        return CSSCubicBezier(x1, y1, x2, y2);
    });

    const readout = computed<string>(() => {
        if (mode.value === "steps") return `steps(${steps.value}, ${term.value})`;
        const [x1, y1, x2, y2] = points.value.map((n) => +n.toFixed(3));
        return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    });

    // The boundary-law round-trip: in steps mode the readout `steps(n, term)` is
    // fed back through value.js `parseSteps` (the catalogue's OWN reader) and the
    // recovered (count, jumpTerm) must equal the live (n, term). So the staircase
    // the editor paints IS a re-parseable value.js literal — never a hand-rolled
    // string the catalogue cannot read back. Bezier mode has no steps literal
    // (trivially `true`).
    const reparseOk = computed<boolean>(() => {
        if (mode.value !== "steps") return true;
        const back = parseSteps(readout.value);
        return back != null && back.count === steps.value && back.jumpTerm === term.value;
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

    // ── playback (one-shot rAF travel; the kf Oscillator loop seam) ─────────────
    const progress = ref(0);
    let rafId = 0;
    const reducedMotion = ref(false);
    const motionQuery =
        typeof window === "undefined" || typeof window.matchMedia !== "function"
            ? null
            : window.matchMedia("(prefers-reduced-motion: reduce)");
    function stopTravel(): void {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
    }
    const syncReducedMotion = (event: MediaQueryListEvent | MediaQueryList) => {
        reducedMotion.value = event.matches;
        if (event.matches) {
            stopTravel();
            progress.value = 1;
        }
    };
    if (motionQuery) {
        syncReducedMotion(motionQuery);
        motionQuery.addEventListener("change", syncReducedMotion);
        onScopeDispose(() =>
            motionQuery.removeEventListener("change", syncReducedMotion),
        );
    }
    function playTravel(): void {
        stopTravel();
        if (reducedMotion.value) {
            progress.value = 1;
            return;
        }
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / TRAVEL_DURATION_MS);
            progress.value = t;
            if (t < 1) rafId = requestAnimationFrame(tick);
            else rafId = 0;
        };
        rafId = requestAnimationFrame(tick);
    }

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
        playTravel,
        stopTravel,
    };
}
