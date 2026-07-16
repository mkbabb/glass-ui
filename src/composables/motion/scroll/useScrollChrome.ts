// useScrollChrome — the floating-chrome collapse-state machine.
//
// Scroll down a page with a floating chrome bar (a dock, a header) and it shrinks
// smoothly into a compact form as content rises past it; scroll up and it expands back;
// flick fast and it toggles immediately; STOP scrolling and it SNAPS to the nearest
// fully-collapsed-or-expanded state — never frozen half-collapsed at rest. The shrink is
// a COMPOSITOR `transform: scale/translateY` + an `opacity` quiet (the `.scroll-chrome`
// recipe reads the `--chrome-collapse-t` custom this writes); the box never reflows per
// scroll frame.
//
// THE ONE READER. `useScrollChrome` is a THIN collapse-state machine OVER
// `useScrollTrigger` — it does not re-derive a scroll
// read (no second `addEventListener("scroll")`, no second rAF coalesce; the reader owns
// the SAME `createScrollReader` core). It reads the reader's `direction`/`velocity`/
// `progress`/`recalculate` and ramps `collapseT` 0..1 on direction + range; the optional
// `velocityGate` short-circuits to the endpoint on a flick; on scroll-STOP (a debounced
// no-tick window — the iOS `onMomentumScrollEnd` analogue) `collapseT` SNAPS to 0 or 1
// past `snapMidpoint` (no half-state at rest).
//
// PERSISTENT BY DEFAULT (the iOS-27 lesson). `collapseOnScroll` defaults FALSE — a bare
// `useScrollChrome` does NOT collapse (`collapseT` stays 0). iOS 26 auto-collapsed and
// was criticized ("controls appearing and disappearing force users to constantly
// re-scan"); iOS 27 made the bar persistent ("two taps is always worse than one").
// Collapse is the explicit `{ collapseOnScroll: true }` opt-in.
//
// PRM (the discrete-state-survives model, the useFadingScroll precedent). Under
// `prefers-reduced-motion: reduce` the `collapseT` ramp drops to a DISCRETE snap (the
// `collapsed` state stays correct — a collapse is partly a legibility/space cue); the
// interpolation frames drop, the snap is instant, the chrome is NEVER stuck half-collapsed.
//
// VUE-ONLY (off the SCC trap). Imports `vue` ONLY — no `@vueuse/core`, no
// `@mkbabb/keyframes.js` — so it ships on the engine-free `/motion-core` subpath (the
// `useScrollTrigger`/`usePointerVelocityField`/`useLiquidFlex` precedent). The dock-search
// consumer reaches it there.

import {
    onBeforeUnmount,
    ref,
    toValue,
    watch,
    type ComponentPublicInstance,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { useScrollTrigger } from "./useScrollTrigger";
import { useReducedMotion } from "../core/useReducedMotion";
import { asElement } from "../core/asElement";

export interface UseScrollChromeOptions {
    /** Opt-in: collapse on scroll. DEFAULT FALSE — persistent-by-default (the iOS-27 lesson). */
    collapseOnScroll?: boolean;
    /** The flip-delta debounce (px) before a direction flip commits. Default 8 (the reader's). */
    flipDeltaPx?: number;
    /**
     * Optional velocity gate (px/s): a flick over this collapses/expands IMMEDIATELY,
     * a slow drag respects the threshold. Default off (undefined).
     */
    velocityGate?: number;
    /** Snap-to-nearest commits past this fraction of the collapse range on scroll-STOP. Default 0.5. */
    snapMidpoint?: number;
    /**
     * The scroll distance over which the chrome travels 0→1 collapsed (px). Default 116
     * (the citymall headerHeight×2 reference) — the trigger-point span.
     */
    collapseRangePx?: number;
    /**
     * The chrome element (a dock, a header). When provided, the composable WRITES
     * `--chrome-collapse-t` onto it directly (the JS leg of the dual-path single-writer)
     * so the `.scroll-chrome` recipe reads it with no consumer `:style` plumbing. When
     * absent, the consumer reads the `collapseT` ref and applies it itself.
     */
    chromeRef?: MaybeRefOrGetter<HTMLElement | ComponentPublicInstance | null>;
    /** Honor `prefers-reduced-motion: reduce` (drop the ramp to a discrete snap). Default true. */
    respectReducedMotion?: boolean;
    /**
     * The scroll-STOP debounce window (ms) — the no-tick window after which the snap
     * commits (the `onMomentumScrollEnd` analogue). Default 140 (a calm post-scroll beat).
     */
    scrollStopMs?: number;
}

export interface UseScrollChromeReturn {
    /** 0..1 collapse fraction (drives the consumer's transform/opacity ramp). */
    collapseT: Ref<number>;
    /** True once collapseT past snapMidpoint (the discrete state). */
    collapsed: Ref<boolean>;
    /** Committed scroll direction (from the reader). */
    direction: Ref<"down" | "up" | null>;
    /** Force a re-read + re-evaluate (post-resize). */
    recalculate: () => void;
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/**
 * The floating-chrome collapse-state machine. COMPOSES `useScrollTrigger` (the ONE
 * scroll reader); ramps `collapseT` on direction + `collapseRangePx`; the optional
 * `velocityGate` short-circuits on a flick; snaps to the nearest endpoint on scroll-stop.
 * Writes `--chrome-collapse-t` onto `chromeRef` (when given). PERSISTENT by default
 * (`collapseOnScroll: false`).
 *
 * @example
 * ```ts
 * const header = ref<HTMLElement | null>(null)
 * useScrollChrome(() => window, { collapseOnScroll: true, chromeRef: header })
 * // header.style sets --chrome-collapse-t; the .scroll-chrome recipe reads it.
 * ```
 */
export function useScrollChrome(
    scrollContainer: MaybeRefOrGetter<HTMLElement | Window | null>,
    opts: UseScrollChromeOptions = {},
): UseScrollChromeReturn {
    const {
        collapseOnScroll = false,
        flipDeltaPx = 8,
        velocityGate,
        snapMidpoint = 0.5,
        collapseRangePx = 116,
        chromeRef,
        respectReducedMotion = true,
        scrollStopMs = 140,
    } = opts;

    const collapseT = ref(0);
    const collapsed = ref(false);

    const reduced = respectReducedMotion ? useReducedMotion() : ref(false);

    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    // The scroll position at which the current ramp leg anchored (the from-position for
    // the direction-driven range ramp).
    let rampAnchorPos: number | null = null;

    // Resolve the chrome element from the optional ref (the write target for the custom).
    // The ref may point at a component (`<GlassDock>`) — resolve its root via `asElement`.
    // A component with a FRAGMENT root (a leading comment/text sibling) has a non-element
    // `$el`, so `asElement` returns null and the collapse cannot paint: warn loud (once) so
    // the dead write surfaces instead of silently no-opping (a masked primary).
    let warnedUnresolvable = false;
    function resolveChrome(): HTMLElement | null {
        if (chromeRef == null) return null;
        const raw = toValue(chromeRef);
        const el = asElement(raw);
        if (el == null && raw != null && !warnedUnresolvable) {
            warnedUnresolvable = true;
            console.warn(
                "[useScrollChrome] chromeRef resolved to a non-element (a fragment-root " +
                    "component exposes a non-element `$el`); `--chrome-collapse-t` will not " +
                    "paint. Pass an element ref or expose the component's root element.",
            );
        }
        return el;
    }

    // Write `collapseT` to the state + (when a chrome target exists) the custom property.
    // ONE writer — the JS leg of the dual-path single-writer (the native CSS ramp, on a
    // supporting engine, writes the same custom off `animation-timeline: scroll(self)`).
    function apply(t: number): void {
        const next = reduced.value ? (t >= snapMidpoint ? 1 : 0) : clamp01(t);
        collapseT.value = next;
        collapsed.value = next >= snapMidpoint;
        const el = resolveChrome();
        el?.style.setProperty("--chrome-collapse-t", String(next));
    }

    // The scroll-STOP snap (the onMomentumScrollEnd analogue): a debounced no-tick window
    // after which `collapseT` SNAPS to 0 or 1 past `snapMidpoint` (no half-state at rest).
    function scheduleSnap(): void {
        if (stopTimer) clearTimeout(stopTimer);
        // Under PRM the value is already a discrete endpoint (apply() snaps it), so the
        // post-scroll snap is a no-op — but we still clear/settle the leg.
        stopTimer = setTimeout(() => {
            stopTimer = null;
            const settled = collapseT.value >= snapMidpoint ? 1 : 0;
            rampAnchorPos = null; // the next direction leg re-anchors
            apply(settled);
        }, scrollStopMs);
    }

    // The reader — the ONE scroll read. We compose it and react to its
    // direction/velocity in this watcher (NO second listener). `trackProgress: false` —
    // this machine drives `collapseT` off the RANGE-relative scroll delta, not the
    // reader's extent-relative 0..1 progress (a chrome collapses over a fixed px span,
    // independent of the page length).
    const { direction, velocity, recalculate } = useScrollTrigger(scrollContainer, {
        flipDeltaPx,
        trackProgress: false,
        respectReducedMotion,
        onCross: () => {
            /* the chrome reads direction/velocity, not declared trigger-points */
        },
    });

    // The direction-driven ramp. On each committed direction the machine accumulates the
    // scroll delta against `collapseRangePx`: scrolling DOWN ramps `collapseT` 0→1,
    // scrolling UP ramps it 1→0. PERSISTENT by default — when `collapseOnScroll` is false
    // the ramp never engages (`collapseT` stays 0). It is driven off the reader's
    // `direction` + the live scroll position (read fresh each tick); a `velocityGate`
    // flick short-circuits to the endpoint.
    function onDirectionTick(dir: "down" | "up" | null, pos: number, vel: number): void {
        if (!collapseOnScroll || dir == null) return;
        // The flick short-circuit: a fast scroll over the gate snaps to the endpoint.
        if (velocityGate != null && Math.abs(vel) >= velocityGate) {
            rampAnchorPos = null;
            apply(dir === "down" ? 1 : 0);
            scheduleSnap();
            return;
        }
        // The range ramp: seed the anchor so `raw` equals the live fraction at the seed
        // position, then track `collapseT` MONOTONICALLY in scroll position. `pos` already
        // carries the direction sign (`scrollTop` rises scrolling down, falls scrolling up),
        // so ONE formula ramps both legs — scrolling down raises `collapseT`, scrolling up
        // lowers it. (A per-direction `1 - x` inversion would double-count that sign and
        // send the up leg the wrong way.) The direction watch re-seats the anchor on a flip
        // so a re-expand starts immediately from the clamped extreme, with no dead travel
        // clearing accumulated over-scroll.
        if (rampAnchorPos == null) {
            rampAnchorPos = pos - collapseT.value * collapseRangePx;
        }
        const span = collapseRangePx > 0 ? collapseRangePx : 1;
        const raw = (pos - rampAnchorPos) / span;
        apply(raw);
        scheduleSnap();
    }

    // Bridge the reader's direction/velocity onto the ramp. The reader updates
    // `direction`/`velocity` off its OWN rAF tick (the SAME `createScrollReader` core),
    // so watching them is the no-second-listener seam — we read the live scroll position
    // off the container at the moment of the change. We resolve the position the same way
    // the reader does (scrollTop / scrollY) so the two read the SAME source.
    function readPos(): number {
        const src = toValue(scrollContainer);
        if (src instanceof HTMLElement) return src.scrollTop;
        if (typeof window !== "undefined") return window.scrollY || window.pageYOffset || 0;
        return 0;
    }
    // Velocity changes on every reader tick; direction changes on a committed flip. We
    // watch BOTH (the velocity watch carries the per-tick ramp; the direction watch
    // re-anchors the leg on a flip).
    watch(
        () => direction.value,
        () => {
            rampAnchorPos = null; // a direction flip re-anchors the leg
        },
    );
    const stopReducedMotionWatch = watch(
        reduced,
        () => apply(collapseT.value),
        { flush: "sync" },
    );
    watch(
        () => velocity.value,
        (vel) => {
            onDirectionTick(direction.value, readPos(), vel);
        },
    );

    function recalc(): void {
        recalculate();
        rampAnchorPos = null;
        // Re-settle the discrete state (post-resize the px span may have shifted).
        apply(collapseT.value);
    }

    onBeforeUnmount(() => {
        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = null;
        stopReducedMotionWatch();
    });

    return { collapseT, collapsed, direction, recalculate: recalc };
}
