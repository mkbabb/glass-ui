// The `<EasingPicker>` editor state — the ONE curve-authoring chassis.
//
// THE OWNERSHIP BOUNDARY, unchanged and load-bearing: curve MATH is value.js, editor
// COMPONENT is glass-ui. This file reaches for
//   · the bezier callable — value.js `CubicBezier`;
//   · the staircase callable — value.js `steppedEase(n, term)`;
//   · the preset catalogue — value.js `bezierPresets`;
//   · the jump-term family — value.js `jumpTerms`;
//   · the literal round-trip — value.js `parseTimingFunction`.
// It re-implements no cubic-bezier solver and no staircase evaluator.
//
// TWO GEOMETRY RULES ARE THIS FILE'S OWN, AND BOTH ARE EXACT.
// (1) The frame no longer fits itself to the curve. `viewBox` is the CONSTANT
//     `VIEW_BOX`, so the extremum that used to move the coordinate system is now
//     reported instead: `excursion` solves `B′(t) = 0` — a quadratic, closed form,
//     zero samples — and says whether the drawn curve leaves the frame. A handle
//     past the frame PINS to the edge along its own leader while `points` keeps the
//     authored value. Nothing here samples a curve to decide where to put the box.
// (2) The staircase is CONSTRUCTED, not sampled. A step function's shape is n treads
//     joined by risers at exactly `i/n`; sampling it at 241 points is why the riser
//     could never read crisp. Each tread's value is read off the owner's callable at
//     the tread midpoint, so the plot is the value.js twin by construction and costs
//     ≤ 2n+1 path commands (25 at the `STEP_COUNT_MAX` of 12).

import {
    computed,
    onScopeDispose,
    ref,
    watch,
    type ComputedRef,
    type Ref,
} from "vue";
import { useReducedMotion } from "../../composables/motion/core/useReducedMotion";
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
    FRAME_MAX,
    FRAME_MIN,
    MAX_OVERSHOOT,
    SVG_FLIP,
    STEP_COUNT_MAX,
    STEP_COUNT_MIN,
    TRAVEL_DURATION_MS,
} from "./constants";

/** The two curve-authoring modes — the two donor arms unified. */
export type EasingPickerMode = "bezier" | "steps";

/** A `(t: number) => number` easing callable — the value.js family shape. */
export type EasingFn = (t: number) => number;

/** The bezier control-point quad `[x1, y1, x2, y2]`. */
export type BezierPoints = [number, number, number, number];

/** A canonical CSS step jump term. */
export type JumpTerm = (typeof jumpTerms)[number];

/** A point in the plot's SVG space (x rightwards, y downwards). */
export interface CurvePoint {
    readonly x: number;
    readonly y: number;
}

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
    /** The initial authored curve. Any subset; the rest takes the family default. */
    initial?: Partial<EasingPickerValue>;
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
    // ── the curves (the REAL value.js twins) ─────────────────────────────────────
    /** The bezier callable, live in both modes (the ghost stroke reads it). */
    bezierFn: ComputedRef<EasingFn>;
    /** The staircase callable, live in both modes. */
    stepFn: ComputedRef<EasingFn>;
    /** The callable for the ACTIVE mode — the one the readout and the dot follow. */
    easingFn: ComputedRef<EasingFn>;
    /** The complete re-parseable readout literal for the active mode. */
    readout: ComputedRef<string>;
    /** Whether the authored readout round-trips through Value's CSS parser. */
    reparseOk: ComputedRef<boolean>;
    /** The full v-model payload (mode + css + fn + raw params). */
    value: ComputedRef<EasingPickerValue>;
    // ── plot geometry, in the CONSTANT frame ─────────────────────────────────────
    /** The AUTHORED handle coords in SVG space — may sit outside the frame. */
    handlesSvg: ComputedRef<CurvePoint[]>;
    /** Where the handles PAINT: on their own leader, clamped to the frame edge. */
    handlePins: ComputedRef<CurvePoint[]>;
    /** The two leader anchors, `(0,1)` and `(1,0)` in SVG space. */
    leaderAnchors: readonly CurvePoint[];
    /** The bezier path `d` (`M 0 1 C …`) — the authored control points, unclamped. */
    bezierPathD: ComputedRef<string>;
    /** The staircase path `d` — constructed from the callable, never sampled. */
    stepPathD: ComputedRef<string>;
    /** The active curve's exact extrema and whether it leaves the constant frame. */
    excursion: ComputedRef<{ min: number; max: number; clipped: boolean }>;
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

/** SVG-space leader anchors: handle 0 leaves the curve's start, handle 1 its end. */
const LEADER_ANCHORS: readonly CurvePoint[] = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
];

function easingValue(
    operation: string,
    result: ReturnType<typeof CubicBezier>,
): EasingFn {
    if (!result.ok) throw new Error(`${operation}: ${result.error.code}`);
    return result.value;
}

/** Path coordinates at plot precision — four decimals is 0.01px at a 320px canvas. */
function coord(n: number): string {
    return String(+n.toFixed(4));
}

/**
 * The exact extrema of `B(t) = 3(1−t)²t·y1 + 3(1−t)t²·y2 + t³` on [0,1].
 *
 * `B′(t)` is a QUADRATIC, so its roots are closed-form and the extrema are exact.
 * The frame never has to be fitted, and the excursion never has to be guessed:
 * at `y1 = y2 = 1.6` the interior maximum is `1.3692` at `t = 0.6202`, and with a
 * single handle high (`1.6 / 0`) the interior maximum is `0.756` — under the
 * endpoint's `1.0`, so one raised handle can never leave the frame. Both handles
 * must exceed `y ≈ 1.2` before the curve crosses `FRAME_MAX` (at exactly 1.2 the
 * maximum is 1.099).
 */
function bezierExtrema(y1: number, y2: number): { min: number; max: number } {
    const at = (t: number): number => {
        const u = 1 - t;
        return 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
    };
    const a = 9 * y1 - 9 * y2 + 3;
    const b = 6 * y2 - 12 * y1;
    const c = 3 * y1;

    const stationary: number[] = [];
    if (Math.abs(a) < 1e-12) {
        if (Math.abs(b) > 1e-12) stationary.push(-c / b);
    } else {
        const discriminant = b * b - 4 * a * c;
        if (discriminant >= 0) {
            const root = Math.sqrt(discriminant);
            stationary.push((-b + root) / (2 * a), (-b - root) / (2 * a));
        }
    }

    const ys = [0, 1];
    for (const t of stationary) if (t > 0 && t < 1) ys.push(at(t));
    return { min: Math.min(...ys), max: Math.max(...ys) };
}

/** Walk the leader from its anchor to the authored handle and stop at the frame. */
function pinToFrame(anchor: CurvePoint, handle: CurvePoint): CurvePoint {
    const dx = handle.x - anchor.x;
    const dy = handle.y - anchor.y;
    let travel = 1;
    const limit = (delta: number, from: number, edge: number): void => {
        if (Math.abs(delta) < 1e-12) return;
        travel = Math.min(travel, (edge - from) / delta);
    };
    if (handle.x < FRAME_MIN) limit(dx, anchor.x, FRAME_MIN);
    if (handle.x > FRAME_MAX) limit(dx, anchor.x, FRAME_MAX);
    if (handle.y < FRAME_MIN) limit(dy, anchor.y, FRAME_MIN);
    if (handle.y > FRAME_MAX) limit(dy, anchor.y, FRAME_MAX);
    // An UNPINNED handle is returned as authored, not reconstructed. `anchor + (h −
    // anchor) × 1` is the identity in exact arithmetic and is NOT the identity in
    // binary floating point: `1 + ((1 − 0.94) − 1)` misses `1 − 0.94` by 5.55e-17, and
    // the `data-pinned` marker compares the two for equality. That one ulp painted the
    // pinned state on EIGHT of value.js's thirty catalogue presets — ease-out-quad,
    // -quart, -quint, -expo, -circ, ease-in-out-quart, -quint, -circ — every one of
    // them strictly inside the frame. The short-circuit is the truthful statement as
    // well as the fix: a handle that crosses nothing IS its authored point.
    if (travel === 1) return handle;
    return { x: anchor.x + dx * travel, y: anchor.y + dy * travel };
}

/**
 * The `<EasingPicker>` editor state. Composes the value.js math; owns the chassis
 * (control points, the literal, the constant-frame geometry, the rAF travel).
 */
export function useEasingPicker(
    options: UseEasingPickerOptions = {},
): UseEasingPickerReturn {
    const seed = options.initial ?? {};

    const mode = ref<EasingPickerMode>(seed.mode === "steps" ? "steps" : "bezier");

    // ── bezier ───────────────────────────────────────────────────────────────
    const seedPoints = Array.isArray(seed.points)
        && seed.points.length === 4
        && seed.points.every((n) => Number.isFinite(n))
        ? ([...seed.points] as BezierPoints)
        : undefined;
    const preset = ref<string>(seedPoints ? CUSTOM_PRESET : DEFAULT_BEZIER_PRESET);
    const points = ref<BezierPoints>(
        seedPoints ?? ([...bezierPresets[DEFAULT_BEZIER_PRESET]] as BezierPoints),
    );

    function selectPreset(name: string): void {
        preset.value = name;
        const p = bezierPresets[name as keyof typeof bezierPresets];
        if (p) points.value = [...p] as BezierPoints;
    }

    /** Move a control handle (0 or 1) to clamped (x in [0,1], y in the overshoot band). */
    function setHandle(index: 0 | 1, x: number, y: number): void {
        const cx = Math.max(0, Math.min(1, x));
        const cy = Math.max(-MAX_OVERSHOOT, Math.min(1 + MAX_OVERSHOOT, y));
        const next: BezierPoints = [...points.value];
        next[index * 2] = +cx.toFixed(3);
        next[index * 2 + 1] = +cy.toFixed(3);
        points.value = next;
        preset.value = CUSTOM_PRESET;
    }

    // A seeded quad is authored input like any other: it goes through the SAME clamp
    // the pointer and the keyboard go through, so an out-of-band `initial` is
    // normalized once at construction rather than rendered and corrected later.
    if (seedPoints) {
        setHandle(0, seedPoints[0], seedPoints[1]);
        setHandle(1, seedPoints[2], seedPoints[3]);
    }

    // ── steps ────────────────────────────────────────────────────────────────
    const seedSteps = seed.steps;
    const steps = ref<number>(
        typeof seedSteps === "number" && Number.isFinite(seedSteps)
            ? Math.max(STEP_COUNT_MIN, Math.min(STEP_COUNT_MAX, Math.round(seedSteps)))
            : DEFAULT_STEP_COUNT,
    );
    const term = ref<JumpTerm>(
        seed.term && jumpTerms.includes(seed.term) ? seed.term : DEFAULT_STEP_TERM,
    );

    // ── the REAL value.js twins — BOTH live, in BOTH modes ─────────────────────
    // Both constructors are failure-explicit; this closed editor supplies valid
    // domains and surfaces any producer contradiction instead of substituting identity.
    const bezierFn = computed<EasingFn>(() => {
        const [x1, y1, x2, y2] = points.value;
        return easingValue("EasingPicker:CubicBezier", CubicBezier(x1, y1, x2, y2));
    });
    const stepFn = computed<EasingFn>(() =>
        easingValue("EasingPicker:steppedEase", steppedEase(steps.value, term.value)),
    );
    const easingFn = computed<EasingFn>(() =>
        mode.value === "steps" ? stepFn.value : bezierFn.value,
    );

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

    // ── plot geometry, in the CONSTANT frame ───────────────────────────────────
    const handlesSvg = computed<CurvePoint[]>(() => {
        const [x1, y1, x2, y2] = points.value;
        return [
            { x: x1, y: SVG_FLIP(y1) },
            { x: x2, y: SVG_FLIP(y2) },
        ];
    });

    const handlePins = computed<CurvePoint[]>(() =>
        handlesSvg.value.map((handle, index) =>
            pinToFrame(LEADER_ANCHORS[index]!, handle),
        ),
    );

    const bezierPathD = computed(() => {
        const [c1, c2] = handlesSvg.value;
        return `M 0 1 C ${coord(c1!.x)} ${coord(c1!.y)}, ${coord(c2!.x)} ${coord(c2!.y)}, 1 0`;
    });

    const stepPathD = computed(() => {
        const n = steps.value;
        const fn = stepFn.value;
        // Each tread is CONSTANT across `[i/n, (i+1)/n)`, so one read at its midpoint
        // is the whole tread — the owner's callable decides the height, this decides
        // nothing but where to put the pen.
        let d = "";
        let held = Number.NaN;
        for (let i = 0; i < n; i++) {
            const level = SVG_FLIP(fn((i + 0.5) / n));
            d += i === 0
                ? `M ${coord(i / n)} ${coord(level)}`
                : ` V ${coord(level)}`;
            d += ` H ${coord((i + 1) / n)}`;
            held = level;
        }
        const end = SVG_FLIP(fn(1));
        if (Math.abs(end - held) > 1e-9) d += ` V ${coord(end)}`;
        return d;
    });

    const excursion = computed(() => {
        if (mode.value === "steps") {
            // A CSS staircase is bounded by its own endpoints by construction.
            return { min: 0, max: 1, clipped: false };
        }
        const [, y1, , y2] = points.value;
        const { min, max } = bezierExtrema(y1, y2);
        return { min, max, clipped: min < FRAME_MIN || max > FRAME_MAX };
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
        bezierFn,
        stepFn,
        easingFn,
        readout,
        reparseOk,
        value,
        handlesSvg,
        handlePins,
        leaderAnchors: LEADER_ANCHORS,
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
    };
}
