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
// The open leg is the one place the size holds still: the box takes the rung it opens to
// on its first frame (`size`) and the scalar says how much of it is up, so the sheet
// rises into place by a translate with its head and its actions where they will rest.
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
//
// REDUCED MOTION: the spring lands the box on its rung at once, and the sheet fades in
// and out instead, over the travel row's exit clock held to at most `--duration-fast`,
// on `--exit-curve`, as a sliding sheet does. The box holds where it stands while it
// fades out.

import { computed, onScopeDispose, ref, watch, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { motionTempo } from "../../../composables/motion/core/motionTempo";
import { readReducedMotion } from "../../../composables/motion/core/useReducedMotion";
import { readExitClock, runExitClock } from "../../../composables/motion/spring/exitClock";
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
    /**
     * The fraction the box is sized at. While the sheet rises into place on its open leg
     * it is the rung it rises to, and `t` is how much of that box is up; at any other
     * time it is `t`.
     */
    size: Readonly<Ref<number>>;
    /** The sheet's opacity while it fades in or out under reduced motion; null otherwise. */
    opacity: Readonly<Ref<number | null>>;
    /** Mount hold — true until the close has run: the dismissing spring reaching 0, or
     *  the fade out under reduced motion. */
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
    // The rung the box holds while the sheet rises into place, or null when the box is
    // the scalar. The rise ends when its leg settles, on a drag or on a rung change; a
    // close during the rise slides the box back down at that size.
    const rising = ref<number | null>(null);
    const size = computed(() => rising.value ?? t.value);
    const present = ref(open.value);
    const dragging = ref(false);
    const opacity = ref<number | null>(null);
    // Where the running fade heads, or null when none runs.
    let fadeTo: 0 | 1 | null = null;
    let stopFade = () => {};

    /** Under reduced motion, fades the sheet to `to` from the opacity it shows, then calls
     *  `done`. False where motion is not reduced or no stylesheet resolves the clock. */
    function fade(to: 0 | 1, done: () => void): boolean {
        if (!readReducedMotion()) return false;
        const clock = readExitClock(LEG_PRESET.travel, true);
        if (!clock || typeof requestAnimationFrame !== "function") return false;
        stopFade();
        const from = opacity.value ?? 1 - to;
        fadeTo = to;
        opacity.value = from;
        stopFade = runExitClock(
            clock,
            (k) => (opacity.value = from + (to - from) * k),
            () => {
                fadeTo = null;
                done();
            },
        );
        return true;
    }

    function clearFade() {
        stopFade();
        fadeTo = null;
        opacity.value = null;
    }

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
        if (rising.value !== null && spring?.settled) rising.value = null;
        if (!open.value && spring?.target === 0 && spring.settled) present.value = false;
    }

    /**
     * Settle toward `fraction` on `nextLeg`, preserving the live (value, velocity). With
     * `hold`, the box keeps that rung's size while the scalar settles.
     */
    function settle(fraction: number, nextLeg: Leg, hold: number | null = null) {
        rising.value = hold;
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

    /**
     * The close. Under reduced motion the box stays where it stands and the sheet fades
     * out, then the scalar goes to 0 and the mount is released; otherwise the scalar
     * settles to 0 on the travel leg.
     */
    function leave() {
        if (fadeTo === 0) return;
        const faded = fade(0, () => {
            spring?.dispose();
            spring = null;
            leg = null;
            rising.value = null;
            t.value = 0;
            present.value = false;
        });
        if (faded) {
            spring?.stop();
            return;
        }
        settle(0, "travel", rising.value);
        if (spring?.settled) present.value = false;
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
        rising.value = null;
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
        // The drag wrote the scalar past the spring, so the spring is seated where the
        // finger left the sheet, moving as the finger moved: the settle, or the close,
        // runs on from there instead of from the rung the drag started at.
        seatSpring(target === 0 ? "travel" : "rung", t.value, velocity);
        if (target === 0) {
            requestClose();
            leave();
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
                const rung = seatedRung();
                settle(rung, "travel", rung);
                if (!fade(1, () => (opacity.value = null))) clearFade();
                return;
            }
            if (!present.value) return;
            releaseDrag();
            if (!spring) {
                clearFade();
                t.value = 0;
                rising.value = null;
                present.value = false;
                return;
            }
            leave();
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
        stopFade();
        spring?.dispose();
        spring = null;
    });

    return { t, size, opacity, present, dragging, snapTo, onPointerdown };
}
