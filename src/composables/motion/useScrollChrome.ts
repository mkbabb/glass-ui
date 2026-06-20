// useScrollChrome — the floating-chrome COLLAPSE-STATE machine (BC.W-SCROLL-CHROME).
//
// Scroll down a page with a floating chrome bar (a dock, a header) and it shrinks
// smoothly into a compact form as content rises past it; scroll up and it expands back;
// flick fast and it toggles immediately; STOP scrolling and it SNAPS to the nearest
// fully-collapsed-or-expanded state — never frozen half-collapsed at rest. The shrink is
// a COMPOSITOR `transform: scale/translateY` + an `opacity` quiet (the `.scroll-chrome`
// recipe reads the `--chrome-collapse-t` custom this writes); the box never reflows per
// scroll frame (the proof:no-layout-animation floor).
//
// THE ONE READER. `useScrollChrome` is a THIN collapse-state machine OVER
// `useScrollTrigger` (the BC.W-SCROLL-TRIGGER reader) — it does NOT re-derive a scroll
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
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { useScrollTrigger } from "./useScrollTrigger";

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
    chromeRef?: MaybeRefOrGetter<HTMLElement | null>;
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

const PRM_QUERY = "(prefers-reduced-motion: reduce)";

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

    // ── The cached PRM ref (the AV.W7 substrate pattern) — ONE matchMedia + change
    // listener for the machine's lifetime. PRM drops the ramp to a discrete snap; the
    // `collapsed` STATE stays correct (the useFadingScroll discrete-survives model).
    const canMatch =
        typeof window !== "undefined" && typeof window.matchMedia === "function";
    const prmQuery = canMatch ? window.matchMedia(PRM_QUERY) : null;
    let reduced = respectReducedMotion && (prmQuery?.matches ?? false);
    const onPrmChange = (e: MediaQueryListEvent): void => {
        reduced = respectReducedMotion && e.matches;
        apply(collapseT.value);
    };
    prmQuery?.addEventListener("change", onPrmChange);

    let stopTimer: ReturnType<typeof setTimeout> | null = null;
    // The scroll position at which the current ramp leg anchored (the from-position for
    // the direction-driven range ramp).
    let rampAnchorPos: number | null = null;

    // Resolve the chrome element from the optional ref (the write target for the custom).
    function resolveChrome(): HTMLElement | null {
        if (chromeRef == null) return null;
        return toValue(chromeRef) ?? null;
    }

    // Write `collapseT` to the state + (when a chrome target exists) the custom property.
    // ONE writer — the JS leg of the dual-path single-writer (the native CSS ramp, on a
    // supporting engine, writes the same custom off `animation-timeline: scroll(self)`).
    function apply(t: number): void {
        const next = reduced ? (t >= snapMidpoint ? 1 : 0) : clamp01(t);
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
        // The range ramp: anchor the leg at the position the current direction began,
        // then ramp by the signed delta over `collapseRangePx`.
        if (rampAnchorPos == null) {
            // Seed the anchor so a DOWN leg ramps UP from the current collapseT and an UP
            // leg ramps DOWN from it (the leg continues the live fraction, never resets).
            rampAnchorPos =
                pos - (dir === "down" ? collapseT.value : 1 - collapseT.value) * collapseRangePx;
        }
        const span = collapseRangePx > 0 ? collapseRangePx : 1;
        const raw =
            dir === "down"
                ? (pos - rampAnchorPos) / span
                : 1 - (pos - rampAnchorPos) / span;
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
        prmQuery?.removeEventListener("change", onPrmChange);
    });

    return { collapseT, collapsed, direction, recalculate: recalc };
}
