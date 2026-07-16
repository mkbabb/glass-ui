/**
 * useHandMark.ts — the headless reactive core (L2/L3/L4; SPEC §9).
 * ─────────────────────────────────────────────────────────────────────────────
 * Sits between the props and the SFC template so a future React/web-component skin
 * reuses L1–L4. It orchestrates: resolve brush → shapeGeom → ink → animation. It
 * owns NO DOM (the SFC anchors/measures/mounts the filter); it owns the reactive
 * pipeline + the draw-on, boil state machine.
 *
 * Two draw-on mechanisms, picked by a FIELD (never an instrument `if`):
 *   - clean ink (no grain): `stroke-dashoffset` on `pathLength="1"` — the slides
 *     recipe, geometry-agnostic, compositor-cheap, no filter to re-raster.
 *   - grained ink (crayon): a `clip-path: inset()` WIPE — the filter rasters ONCE
 *     and the reveal mutates only the clip (`ds-crayon-handmark §5.1`). NEVER
 *     dashoffset under a filter (it would re-raster the graph per frame — the Δ4
 *     gate).
 *
 * PRM: every draw-on collapses to instant (finished static state); boil no-ops
 * (`useLineBoil.start()` early-returns under reduced motion).
 */
import { computed, ref, type Ref } from "vue";
import { useLineBoil } from "@mkbabb/pencil-boil";
import { resolveBrush, type Brush, type BrushName } from "../brush";
import { NOISE_WOBBLE_REF, VB_H } from "../constants";

/**
 * The boil clock surface the SFC binds — the `useLineBoil` return shape, declared
 * structurally over glass-ui's OWN `Ref` (pencil-boil ships a nested `@vue`, so its
 * `Ref` symbol differs; the no-op stub is built with this `ref`, hence the surface
 * is named here rather than `ReturnType<typeof useLineBoil>`).
 */
export interface BoilClock {
    currentFrame: Ref<number>;
    start: () => void;
    stop: () => void;
}

/**
 * The zero-cost boil stub a NON-boiling mark gets instead of a real `useLineBoil`.
 * `start`/`stop` are no-ops and `currentFrame` is a frozen `0` — the mark never
 * subscribes to the singleton RAF scheduler (it never even constructs the clock).
 * A static mark reads as static BY CONSTRUCTION, not merely scheduled-away.
 */
const NOOP_BOIL: BoilClock = {
    currentFrame: ref(0),
    start: () => {},
    stop: () => {},
};
import { boilLines, serialize, shapeGeom, type ShapeGeom } from "../geometry";
import { ink, type SVGFragment } from "../ink";
import { hasGrain } from "../texture";
import type { HandAnimation, HandMarkProps, HandShape, MarkBox } from "../types";

export interface UseHandMarkInput {
    brush: BrushName | Partial<Brush>;
    shape: HandShape;
    color: string;
    seed: number;
    overrides?: Partial<Brush>;
    animation: HandAnimation;
    boilFps: number;
    boilFrames: number;
    roughness: number | null;
    segments: number | null;
    jagged: boolean;
    /** NATURAL underline morphology (C-2) — procedural off the house-seeded engine. */
    natural: boolean;
    /** NATURAL-underline excursion knob ( (c)); `null` ⇒ derive from brush wobble. */
    amplitude: number | null;
    box: MarkBox | null;
    path: string | null;
    filterId: string;
    /**
     * The MEASURED text baseline as a fraction of the `.hm` box height (text-mode
     * underline anchor). `null` until the SFC measures it (ResizeObserver +
     * `document.fonts.ready`) — geometry falls back to the legacy constant for that
     * one pre-measure frame. Ignored in positioned (`box`) mode.
     */
    baselineFrac: number | null;
    /**
     * The aspect-correct marking-space height: `VB_W * boxAspect`, using the
     * SFC-measured `.hm` box aspect so `preserveAspectRatio="none"`
     * scales the text-mode wobble SHAPE uniformly (the humps stop crushing flat on a short
     * word). Defaults to `VB_H`; used ONLY for the measured text-mode marks (the positioned/
     * box path keeps `VB_H` byte-for-byte).
     */
    vbH: number;
}

/**
 * Normalise raw HandMarkProps (with their defaults applied) into the core input.
 * `baselineFrac` is the SFC's MEASURED text baseline (text-mode underline anchor) —
 * passed in (not a prop) because it is a runtime measurement, `null` until measured.
 */
export function normalizeProps(
    props: HandMarkProps,
    filterId: string,
    baselineFrac: number | null = null,
    vbH: number = VB_H,
): UseHandMarkInput {
    return {
        brush: props.brush ?? "pen",
        shape: props.shape ?? "underline",
        color: props.color ?? "currentColor",
        seed: props.seed ?? 1,
        overrides: props.overrides,
        animation: props.animation ?? "none",
        boilFps: props.boilFps ?? 8,
        boilFrames: props.boilFrames ?? 3,
        roughness: props.roughness ?? null,
        segments: props.segments ?? null,
        jagged: props.jagged ?? false,
        // the `boil` brush auto-engages the natural morphology; an explicit prop wins.
        natural: props.natural ?? props.brush === "boil",
        amplitude: props.amplitude ?? null,
        box: props.box ?? null,
        path: props.path ?? null,
        filterId,
        baselineFrac,
        vbH,
    };
}

export interface HandMarkCore {
    /** the resolved effective brush vector. */
    brush: Ref<Brush>;
    /** the static base geometry (boil re-perturbs THIS). */
    baseGeom: Ref<ShapeGeom>;
    /** the live SVG fragment (paths + filter defs). */
    fragment: Ref<SVGFragment>;
    /** the live `d` (escape-hatch path > boiled geometry > static base). */
    pathD: Ref<string>;
    /** does the brush emit a grain filter? (drives the draw-on mechanism). */
    grained: Ref<boolean>;
    /** the draw-on mechanism for this mark: dashoffset (pen) | clip (crayon). */
    drawKind: Ref<"dashoffset" | "clip">;
    /** does this animation draw on at all? */
    draws: Ref<boolean>;
    /** does this animation boil? */
    boils: Ref<boolean>;
    /** the boil clock (a real `useLineBoil` only when the mark boils; else a no-op stub). */
    boil: BoilClock;
    /** arm/disarm boil (draw-then-boil holds it until the draw finishes). */
    boilArmed: Ref<boolean>;
}

export function useHandMark(input: Ref<UseHandMarkInput>): HandMarkCore {
    const brush = computed<Brush>(() => {
        const o: Partial<Brush> = { ...(input.value.overrides ?? {}) };
        if (input.value.roughness != null) o.roughness = input.value.roughness;
        if (input.value.segments != null) o.segments = input.value.segments;
        return resolveBrush(input.value.brush, o);
    });

    const grained = computed(() => hasGrain(brush.value));

    // base centerlines — recomputed only when geometry inputs change (incl. the
    // measured baselineFrac: the underline re-anchors the instant the measure lands).
    const baseGeom = computed<ShapeGeom>(() => {
        // (c) the amplitude knob: an explicit prop WINS; else derive the excursion from
        // the brush `wobble` scalar (f(wobble)=wobble/ref, 1 at the shipped boil default
        // ⇒ byte-identical), decoupling excursion from stroke weight.
        const ampScale = input.value.amplitude ?? brush.value.wobble / NOISE_WOBBLE_REF;
        return shapeGeom(
            input.value.shape,
            {
                roughness: brush.value.roughness,
                segments: brush.value.segments,
                seed: input.value.seed,
                jagged: input.value.jagged,
            },
            input.value.box,
            input.value.baselineFrac,
            input.value.natural,
            input.value.vbH,
            ampScale,
        );
    });

    const boils = computed(
        () =>
            input.value.animation === "boil" ||
            input.value.animation === "draw-then-boil",
    );
    const draws = computed(
        () =>
            input.value.animation === "draw-on" ||
            input.value.animation === "draw-then-boil",
    );

    // The draw-on mechanism is a FIELD read: grained ink CANNOT dash under a filter
    // (it would re-raster per frame — the Δ4 gate); it wipes via clip-path instead.
    const drawKind = computed<"dashoffset" | "clip">(() =>
        grained.value ? "clip" : "dashoffset",
    );

    const boilArmed = ref(false);
    // NO BOIL FOR NON-BOIL MARKS (E4's second arm, the structural defense): the
    // `useLineBoil` composable is CONSTRUCTED only when the resolved animation
    // actually boils. A `draw-on`/`none`/static mark never instantiates it at all —
    // so it never holds a scheduler subscriber, never runs a `watchEffect`, costs
    // zero. (Composes with the pencil-boil §1 frameCount<=1 guard: defense at both
    // grains.) `animation` is fixed at construction; the prop-flip watch in the SFC
    // is a reset of draw/boil STATE, not a medium swap, so reading it once is sound.
    const canBoil =
        input.value.animation === "boil" ||
        input.value.animation === "draw-then-boil";
    const boil: BoilClock = canBoil
        ? // Lazy boil: the frame count gates to 1 until ARMED (draw-then-boil holds
          // the draw first), so the scheduler subscribes only once the mark genuinely
          // cycles frames — the pencil-boil guard does the rest. (cast: pencil-boil's
          // nested `@vue` `Ref` symbol differs from ours; the surface is identical.)
          (useLineBoil(
              () => (boils.value && boilArmed.value ? input.value.boilFrames : 1),
              () => Math.max(16, 1000 / input.value.boilFps),
          ) as unknown as BoilClock)
        : NOOP_BOIL;

    const pathD = computed(() => {
        if (input.value.path) return input.value.path;
        let lines = baseGeom.value.lines;
        if (boils.value && boilArmed.value) {
            const amt = brush.value.wobble * 0.4 + 0.4;
            const f = boil.currentFrame.value;
            lines = boilLines(baseGeom.value, amt, input.value.seed + f * 31);
        }
        return serialize(lines, input.value.jagged);
    });

    // The current centerlines (boiled when armed, else the static base).
    const liveLines = computed<[number, number][][]>(() => {
        if (input.value.path) return [];
        if (boils.value && boilArmed.value) {
            return boilLines(
                baseGeom.value,
                brush.value.wobble * 0.4 + 0.4,
                input.value.seed + boil.currentFrame.value * 31,
            );
        }
        return baseGeom.value.lines;
    });

    const fragment = computed<SVGFragment>(() => {
        // Ink each centerline; merge the per-pass paths under ONE shared filter def
        // (multi-line shapes — box/bracket — emit several lines, one filter).
        const merged: SVGFragment = { paths: [], filterId: null, defs: [] };
        const lines = liveLines.value.length ? liveLines.value : [[]];
        for (const line of lines) {
            const frag = ink(
                line as [number, number][],
                brush.value,
                input.value.seed,
                input.value.color,
                input.value.filterId,
                input.value.jagged,
            );
            merged.paths.push(...frag.paths);
            if (frag.filterId && !merged.filterId) {
                merged.filterId = frag.filterId;
                merged.defs = frag.defs;
            }
        }
        return merged;
    });

    return {
        brush,
        baseGeom,
        fragment,
        pathD,
        grained,
        drawKind,
        draws,
        boils,
        boil,
        boilArmed,
    };
}
