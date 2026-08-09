// The pager worm's wiring — geometry, the elongation band, and the paint.
//
// THE GEOMETRY IS MEASURED ONCE AND THEN ARITHMETIC. The predecessor read the live
// bed pip's bounding rect for every centre it needed, plus two token reads and a
// root font-size resolve inside the per-frame paint — five style reads a frame,
// under a header claiming zero. A rail is a uniform grid: one origin and one pitch
// describe every cell in it, so both are measured at mount, at resize, and when
// the window's length changes, and a centre is `origin + rank · pitch` after that.
// The paint reads no style at all.
//
// That memo also makes the paint FLIP-IMMUNE, which matters more than the frames
// it saves: when the window slides, the bed pips are transformed for the duration
// of the slide, so a rect read during it returns the ANIMATING position and the
// worm chases a target that is itself moving. The analytic centre is the settled
// one, which is the one the worm is actually going to.
//
// THE BED/BUTTON DRIFT IS STRUCTURALLY DEAD. It was two gap literals — a hardcoded
// `.375rem` on the bed and a `gap-1.5` utility on the buttons — measuring the same
// rail differently, worth eight pixels of misalignment at the window edges in both
// engines. There is one gap token now, both layers read it, and the worm measures
// the bed it paints over.

import type { ComputedRef, Ref } from "vue";
import { nextTick, onMounted, watch } from "vue";
import {
    useLeadTrail,
    type LeadTrailEdges,
} from "../../composables/motion/morph/useLeadTrail";
import { useLiquidFlex } from "../../composables/motion/spring/useLiquidFlex";
import { useResizeObserver } from "../../composables/dom/useResizeObserver";

/** Fallback pip diameter (px) when the rail has not laid out yet. */
export const DEFAULT_DOT_PX = 12;
/** Fallback cell pitch (px) — the 24 px hit cell plus the 4 px rail gap. */
export const DEFAULT_PITCH_PX = 28;
/** Fallback squish cap when `--pager-worm-max-stretch` cannot be read. */
export const DEFAULT_MAX_STRETCH = 1.2;

/**
 * The elongation ceiling for a hop of `span` px over a rail of `pitch` px:
 * `clamp(pitch, |span|·0.55, 3·pitch)`.
 *
 * A neighbour hop bridges exactly one pitch; an eleven-cell hop stretches to three
 * and READS as eleven. The predecessor's fixed 36 px clamp saturated on every hop
 * of three or more, so a three-cell hop and an eleven-cell hop painted the same
 * rigid lozenge — the elongation stopped carrying information at the exact point
 * it started mattering.
 */
export function elongationCeil(span: number, pitch: number): number {
    const lo = pitch;
    const hi = 3 * pitch;
    const want = Math.abs(span) * 0.55;
    return want < lo ? lo : want > hi ? hi : want;
}

export interface UsePagerWormRefs {
    /** The rail root — the token reads + the resize re-seat anchor to this box. */
    rootEl: Ref<HTMLElement | null>;
    /** The worm layer — the masses' positioning context (the coordinate origin). */
    wormLayerEl: Ref<HTMLElement | null>;
    /** The two round pip-bodies + the bridging neck (the three worm masses). */
    bodyAEl: Ref<HTMLElement | null>;
    bodyBEl: Ref<HTMLElement | null>;
    neckEl: Ref<HTMLElement | null>;
    /** The bed pip map (keyed by member index) — the grid the memo measures. */
    bedDotEls: Map<number, HTMLElement>;
    /** The currently-shown (windowed) member indices. */
    shown: ComputedRef<number[]>;
    /** Whether the rail axis is vertical. */
    vertical: ComputedRef<boolean>;
    /** The active 0-based index. */
    active: Ref<number>;
}

interface RailGeometry {
    /** The on-axis centre of the FIRST shown cell, relative to the worm layer. */
    origin: number;
    /** The distance between adjacent cell centres. */
    pitch: number;
    /** The pip diameter — the worm body's D. */
    dot: number;
    /** The squish cap, resolved once. */
    maxStretch: number;
}

/**
 * Wire the pager's two-edge worm: the rail geometry memo, the elongation band, the
 * barbell projection and the driver's watchers. All motion is compositor-only, and
 * the per-frame path reads no style.
 */
export function usePagerWorm(refs: UsePagerWormRefs): void {
    const {
        rootEl,
        wormLayerEl,
        bodyAEl,
        bodyBEl,
        neckEl,
        bedDotEls,
        shown,
        vertical,
        active,
    } = refs;

    const geometry: RailGeometry = {
        origin: 0,
        pitch: DEFAULT_PITCH_PX,
        dot: DEFAULT_DOT_PX,
        maxStretch: DEFAULT_MAX_STRETCH,
    };

    /** Re-measure the grid. Mount / resize / window-length change ONLY. */
    function measure(): void {
        const layer = wormLayerEl.value;
        const list = shown.value;
        if (!layer || list.length === 0) return;

        const first = bedDotEls.get(list[0]!);
        if (!first) return;
        const vert = vertical.value;
        const layerOffset = vert ? layer.offsetTop : layer.offsetLeft;
        const centreOf = (el: HTMLElement) =>
            (vert ? el.offsetTop + el.offsetHeight / 2 : el.offsetLeft + el.offsetWidth / 2) -
            layerOffset;

        geometry.origin = centreOf(first);

        const second = list.length > 1 ? bedDotEls.get(list[1]!) : undefined;
        if (second) geometry.pitch = centreOf(second) - geometry.origin;
        if (!geometry.pitch) geometry.pitch = DEFAULT_PITCH_PX;

        // The pip diameter and the cap are the rail's two token-borne numbers, and
        // they are resolved HERE — once — rather than inside the paint.
        const style = getComputedStyle(rootEl.value ?? layer);
        const dot = parseFloat(style.getPropertyValue("--pager-dot-size"));
        if (Number.isFinite(dot) && dot > 0) geometry.dot = dot;
        const cap = parseFloat(style.getPropertyValue("--pager-worm-max-stretch"));
        geometry.maxStretch =
            Number.isFinite(cap) && cap > 1 ? cap : DEFAULT_MAX_STRETCH;
    }

    // The squish — the ONE shared engine, on its saturating velocity law. The
    // elongation IS the velocity under this driver, so feeding the gap in pitches
    // feeds the velocity: a one-cell hop swells visibly less than an eleven-cell
    // one, which the predecessor's pinned cap made impossible to see.
    const liquidSquish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width",
        maxStretch: () => geometry.maxStretch,
    });

    /** The on-axis painted centre (px, relative to the worm layer) of member `i`. */
    function centerOf(i: number): number | null {
        const list = shown.value;
        if (list.length === 0) return null;
        const rank = list.indexOf(i);
        // A member outside the window anchors on the nearest one inside it.
        const at =
            rank >= 0
                ? rank
                : list.reduce(
                      (best, index, k) =>
                          Math.abs(index - i) < Math.abs(list[best]! - i) ? k : best,
                      0,
                  );
        return geometry.origin + at * geometry.pitch;
    }

    /** The live elongation ceiling — the band, off the hop actually in flight. */
    let span = 0;
    function ceil(): number {
        return elongationCeil(span, geometry.pitch);
    }

    // ENGAGE-ONLY COMPOSITOR HINT. A permanent `will-change` is a permanent layer
    // on a control that is at rest almost all of the time; it is armed while the
    // worm is in flight and released the frame it parks.
    let armed = false;
    function arm(on: boolean, masses: HTMLElement[]): void {
        if (on === armed) return;
        armed = on;
        for (const el of masses) el.style.willChange = on ? "transform" : "";
    }

    /** Project + paint the barbell off the two edges. Zero style reads. */
    function paintWorm(edges: LeadTrailEdges): void {
        const bodyA = bodyAEl.value;
        const bodyB = bodyBEl.value;
        const neck = neckEl.value;
        const layer = wormLayerEl.value;
        if (!bodyA || !bodyB || !neck || !layer) return;

        arm(!edges.settled, [bodyA, bodyB, neck]);
        const vert = vertical.value;
        const D = geometry.dot;
        const gap = edges.hi - edges.lo;
        const cA = edges.lo;
        const cB = edges.hi;

        liquidSquish.squish(geometry.pitch > 0 ? gap / geometry.pitch : 0);
        layer.style.setProperty("--stretch", liquidSquish.stretch.value.toFixed(4));

        bodyA.style.translate = translatePx(cA, vert);
        bodyB.style.translate = translatePx(cB, vert);

        // THE NECK IS A STADIUM'S WAIST, and at full girth it is not a waist at all:
        // a rect of the bodies' own diameter bridging two circles of that diameter
        // IS a stadium, exactly, with no filter and no clip. The predecessor spent
        // an SVG blur-and-threshold graph plus a Bézier clip-path to buy one or two
        // pixels of concavity on a thirteen-pixel body, painting a hardcoded 0.7
        // girth constant on a hundred percent of frames while its own documentation
        // described a well that never welled.
        const spanScale = D > 0 ? Math.max(gap / D, 0.0001) : 0.0001;
        neck.style.translate = translatePx((cA + cB) / 2, vert);
        neck.style.scale = vert ? `1 ${spanScale.toFixed(4)}` : `${spanScale.toFixed(4)} 1`;
        neck.style.opacity = gap > 0.5 ? "1" : "0";
    }

    /** Compose the on-axis `translate` string (the cross axis stays centred by CSS). */
    function translatePx(center: number, vert: boolean): string {
        return vert ? `0 ${center.toFixed(2)}px` : `${center.toFixed(2)}px 0`;
    }

    const worm = useLeadTrail({ ceil, onFrame: paintWorm });

    /** Seat on the active pip (mount / resize — never an animation event). */
    function seatActive(): void {
        measure();
        const c = centerOf(active.value);
        if (c != null) {
            span = 0;
            worm.seat(c);
        }
    }
    /** Drive to the active pip; the hop's own length sets the elongation band. */
    function driveActive(): void {
        const c = centerOf(active.value);
        if (c == null) return;
        span = c - worm.lead.value;
        worm.drive(c);
    }

    watch(active, () => {
        void nextTick(driveActive);
    });
    // A window slide moves every painted centre. Re-measure, then drive: the memo
    // is what makes this correct while the bed is still FLIPping.
    watch(
        () => shown.value.length,
        () => {
            void nextTick(seatActive);
        },
    );
    watch(shown, () => {
        void nextTick(() => {
            measure();
            driveActive();
        });
    });
    useResizeObserver(rootEl, () => {
        void nextTick(seatActive);
    });

    onMounted(() => {
        void nextTick(seatActive);
    });
}
