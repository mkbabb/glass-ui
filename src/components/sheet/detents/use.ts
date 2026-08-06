// The sheet's detent engine — one spring, one scalar, one writer.
//
// A detent is a SIZE, not a translate. The scalar `t` is the fraction of the anchored
// axis the sheet occupies (0 = dismissed, 1 = the whole viewport), the stylesheet reads
// it as `block-size: calc(var(--detent-t) * 100dvh)`, and everything else falls out:
// the actions sit on the visible edge at every rung, `0` is a legal rung so a
// drag-to-dismiss has somewhere to land, the frost samples a stationary box, and the
// span a drag maps against is the VIEWPORT — a constant, so the gesture needs no
// `getBoundingClientRect` on any path at all.
//
// The scalar is a Vue ref bound through the render, not an inline style written onto a
// live-resolved element. That is not a preference: the shipped engine wrote onto a root
// it re-resolved every frame precisely because reka forwards its content through a
// `<Presence>` swap, and the whole model↔paint sever class exists downstream of that
// choice. Bound through the render there is no element to lose.
//
// REGISTERS, read from the canon at construction and never as a literal: open and close
// are room-sized growth (`bloom`), rung-to-rung travel is coordinated travel (`dock`).
// A leg change re-seats a fresh spring at the live `(value, velocity)`, so the
// trajectory stays continuous across the register change.

import { onScopeDispose, ref, watch, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { motionTempo } from "../../../composables/motion/core/motionTempo";
import { springPreset } from "../../../composables/motion/spring/springPresets";
import { nearestRung, resolveRelease } from "./projection";
import type { SidePlacement } from "../motion";

/** The two legs, each naming the canon row it rides. */
const LEG_PRESET = { travel: "bloom", rung: "dock" } as const;
type Leg = keyof typeof LEG_PRESET;

export interface UseSheetDetentsOptions {
    /** The reka root's open state. */
    open: Readonly<Ref<boolean>>;
    /** The anchored edge — decides the drag axis and its toward-open sign. */
    side: () => SidePlacement;
    /** The ascending, non-empty detent ladder. */
    ladder: () => readonly number[];
    /** The active rung (`v-model:detent`); the engine writes the settled rung back. */
    detent: Ref<number | null>;
    /** Ask the host to close (routes through the consumer's `v-model:open`). */
    requestClose: () => void;
}

export interface UseSheetDetentsReturn {
    /** The live size fraction. Bound as `--detent-t`; also the scrim's input. */
    t: Readonly<Ref<number>>;
    /** Mount hold — true until the dismissing spring reaches 0. */
    present: Readonly<Ref<boolean>>;
    /** True while a pointer drag is in flight. */
    dragging: Readonly<Ref<boolean>>;
    /** Settle to the nearest rung (the keyboard + external-write seam). */
    snapTo(fraction: number): void;
    /** Bind on the sheet root; decides for itself whether the press is a drag. */
    onPointerdown(event: PointerEvent): void;
}

/** Controls own their gestures; a drag never starts on one. */
const INTERACTIVE = "button, a[href], input, select, textarea, [contenteditable=true]";
/** The two surfaces that drag unconditionally: the grip, and the header above it. */
const DRAG_HANDLES = '[data-slot="sheet-detent-handle"], [data-slot="dialog-header"]';

/** Toward-open is a sign on one axis; a `bottom` sheet opens as the pointer rises. */
function axisCoord(side: SidePlacement, event: PointerEvent): number {
    switch (side) {
        case "bottom":
            return -event.clientY;
        case "top":
            return event.clientY;
        case "left":
            return event.clientX;
        case "right":
            return -event.clientX;
    }
}

/**
 * One fraction of travel in pixels. `t` is a fraction OF THE VIEWPORT, so the span is
 * the viewport — constant for the gesture, identical at every rung, and never measured
 * off a box that the gesture is itself resizing.
 */
function dragSpan(side: SidePlacement): number {
    if (typeof window === "undefined") return 1;
    const px = side === "left" || side === "right" ? window.innerWidth : window.innerHeight;
    return px || 1;
}

/**
 * Whether a press inside the body may drag the sheet. It may when the body is already
 * at its leading edge — the iOS contract: pull a settled list and the sheet follows,
 * pull a scrolled one and the list scrolls.
 */
function scrollIsAtLeadingEdge(from: EventTarget | null, root: HTMLElement): boolean {
    let node = from instanceof Element ? from : null;
    while (node && node !== root) {
        if (node.scrollHeight > node.clientHeight && node.scrollTop > 0) return false;
        node = node.parentElement;
    }
    return true;
}

export function useSheetDetents(
    options: UseSheetDetentsOptions,
): UseSheetDetentsReturn {
    const { open, side, ladder, detent, requestClose } = options;

    const t = ref(0);
    const present = ref(open.value);
    const dragging = ref(false);

    let spring: SpringProgress | null = null;
    let leg: Leg | null = null;
    let tempo = 1;

    /** The register a leg rides, tempo-scaled at construction (the CSS↔JS one clock). */
    function seatSpring(next: Leg, value: number, velocity: number): SpringProgress {
        const row = springPreset(LEG_PRESET[next]);
        spring?.dispose();
        spring = new SpringProgress({
            response: row.response * tempo,
            dampingFraction: row.dampingFraction,
            initial: value,
            initialVelocity: velocity,
            respectReducedMotion: true,
        });
        leg = next;
        return spring;
    }

    function onFrame(value: number) {
        t.value = value;
        if (!open.value && spring?.target === 0 && spring.settled) present.value = false;
    }

    /** Settle toward `fraction` on `nextLeg`, preserving the live (value, velocity). */
    function settle(fraction: number, nextLeg: Leg) {
        const live = t.value;
        const velocity = spring?.velocity ?? 0;
        const s =
            spring && leg === nextLeg ? spring : seatSpring(nextLeg, live, velocity);
        s.target = fraction;
        s.play(onFrame);
        if (fraction > 0) detent.value = fraction;
    }

    function snapTo(fraction: number) {
        settle(nearestRung(fraction, ladder()), "rung");
    }

    /** The rung an open sheet seats at: the model's, else the ladder's fullest. */
    function seatedRung(): number {
        const rungs = ladder();
        const raw = detent.value;
        if (typeof raw === "number" && Number.isFinite(raw))
            return nearestRung(raw, rungs);
        return rungs[rungs.length - 1]!;
    }

    // ── the drag ──────────────────────────────────────────────────────────────
    let pointerId: number | null = null;
    let root: HTMLElement | null = null;
    let startCoord = 0;
    let startT = 0;
    let lastCoord = 0;
    let lastTime = 0;
    let velocity = 0; // fraction/s, toward-open positive
    let span = 1;

    function onPointerdown(event: PointerEvent) {
        if (event.button !== 0 || pointerId !== null) return;
        const host = event.currentTarget as HTMLElement | null;
        if (!host) return;
        const from = event.target instanceof Element ? event.target : null;
        if (!from) return;
        if (from.closest(INTERACTIVE) && !from.closest(DRAG_HANDLES)) return;
        if (!from.closest(DRAG_HANDLES) && !scrollIsAtLeadingEdge(from, host)) return;

        spring?.stop();
        root = host;
        pointerId = event.pointerId;
        dragging.value = true;
        span = dragSpan(side());
        startCoord = axisCoord(side(), event);
        lastCoord = startCoord;
        lastTime = event.timeStamp;
        startT = t.value;
        velocity = 0;
        host.setPointerCapture?.(event.pointerId);
        host.addEventListener("pointermove", onPointermove);
        host.addEventListener("pointerup", onPointerup);
        host.addEventListener("pointercancel", onPointerup);
    }

    function onPointermove(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        const coord = axisCoord(side(), event);
        const dt = (event.timeStamp - lastTime) / 1000;
        if (dt > 0) velocity = (coord - lastCoord) / dt / span;
        lastCoord = coord;
        lastTime = event.timeStamp;
        // The clamp floors at ZERO, not at the first rung. A drag that cannot reach the
        // dismissed position is a drag whose dismiss branch is unreachable.
        const rungs = ladder();
        const max = rungs[rungs.length - 1]!;
        t.value = Math.min(max, Math.max(0, startT + (coord - startCoord) / span));
    }

    function onPointerup(event: PointerEvent) {
        if (event.pointerId !== pointerId) return;
        releaseDrag();
        // The throw coasts on the register that will catch it, tempo-scaled with it —
        // so a consumer who slows the library slows the fling by the same factor.
        const row = springPreset(LEG_PRESET.rung);
        const target = resolveRelease(t.value, velocity, ladder(), {
            response: row.response * tempo,
            dampingFraction: row.dampingFraction,
            settleBand: row.settleBand,
        });
        if (target === 0) {
            requestClose();
            settle(0, "travel");
            return;
        }
        settle(target, "rung");
    }

    function releaseDrag() {
        if (pointerId === null || !root) return;
        root.releasePointerCapture?.(pointerId);
        root.removeEventListener("pointermove", onPointermove);
        root.removeEventListener("pointerup", onPointerup);
        root.removeEventListener("pointercancel", onPointerup);
        pointerId = null;
        dragging.value = false;
        root = null;
    }

    // ── the open/close edges ──────────────────────────────────────────────────
    watch(
        open,
        (isOpen) => {
            if (isOpen) {
                present.value = true;
                tempo = motionTempo();
                if (!spring) {
                    t.value = 0;
                    seatSpring("travel", 0, 0);
                }
                settle(seatedRung(), "travel");
                return;
            }
            if (!present.value) return;
            releaseDrag();
            if (!spring) {
                t.value = 0;
                present.value = false;
                return;
            }
            settle(0, "travel");
            if (spring.settled) present.value = false;
        },
        { immediate: true, flush: "sync" },
    );

    // An external `v-model:detent` write on an open sheet re-snaps it — the engine owns
    // the rung math, so the model and the paint round-trip through one authority.
    watch(detent, (raw) => {
        if (!open.value || dragging.value) return;
        if (typeof raw !== "number" || !Number.isFinite(raw)) return;
        const rung = nearestRung(raw, ladder());
        if (!spring || Math.abs(spring.target - rung) > 1e-3) settle(rung, "rung");
    });

    onScopeDispose(() => {
        releaseDrag();
        spring?.dispose();
        spring = null;
    });

    return { t, present, dragging, snapTo, onPointerdown };
}
