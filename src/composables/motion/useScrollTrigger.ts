// useScrollTrigger — the ONE scroll reader (BC.W-SCROLL-TRIGGER).
//
// Point it at a scroll source (the window, a scroll container, or an element's own
// scroll) and it gives you back two things off the SAME rAF-coalesced read (the
// shared `createScrollReader` core): a continuous `progress` ref (0..1) for ramps,
// AND discrete crossing events — `onCross(threshold, direction)`, `onEnter`,
// `onLeave` — that fire ONCE when the scroll position passes a declared
// trigger-point in a given direction (with a flip-delta debounce so a 1px jitter
// never re-fires). The dock, a page header, an InfiniteScroll sentinel, a ToC
// tracker — every chrome that reacts to scroll consumes this ONE reader; nobody adds
// a fourth `addEventListener("scroll")`.
//
// THE DUAL-PATH SINGLE-WRITER. On a native-scroll-timeline engine the continuous
// `progress` ramp rides `scroll()`/`view()` on the compositor (the
// `.scroll-progress` CSS recipe writes `@property --scroll-t` — ZERO JS); the JS
// `progress` writer attaches NOTHING (the `useScrollProgress.ts:80` early-return
// precedent — the two never both write). The discrete crossing events CANNOT ride a
// CSS scroll-timeline (a timeline drives a property, it does not emit an event), so
// the JS reader's rAF tick evaluates the triggers on EVERY engine (native or
// fallback) over the SAME `createScrollReader` tick — never a second listener. This
// is the legitimate JS-on-a-native-engine case: the ramp is native, the EVENTS are
// JS, one reader.
//
// PRM (the discrete-events-survive model, the useFadingScroll precedent). Under
// `prefers-reduced-motion: reduce` the continuous `progress` ramp drops to a
// DISCRETE snap (the native CSS ramp's interpolation drops via the outer PRM gate;
// the JS `progress` snaps to the nearest endpoint) — but `onCross`/`onEnter`/
// `onLeave` STILL fire (a trigger-point is a STATE signal, not a flourish; only the
// interpolation between states drops). The crossing-event path is NOT inside the
// PRM-no-preference gate.
//
// VUE-ONLY (off the SCC trap). Imports `vue` ONLY — no `@vueuse/core`, no
// `@mkbabb/keyframes.js` — so it ships on the engine-free `/motion-core` subpath (the
// `usePointerVelocityField`/`useScrollProgress`/`useLiquidFlex` precedent). The
// dock-search consumer reaches it there.

import {
    onBeforeUnmount,
    onMounted,
    ref,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { supportsScrollTimeline } from "./supportsCssTimeline";
import { createScrollReader, type ScrollReader, type ScrollSource } from "./scrollReader";

/**
 * A declared trigger-point on the scroll source: a pixel offset, a 0..1 progress
 * fraction (resolved against the source's scrollable extent), or a named element
 * whose top crosses the source.
 */
export interface TriggerPoint {
    /**
     * A pixel offset on the scroll source, OR a 0..1 progress fraction (resolved
     * against the source's scrollable extent), OR a named element whose top crosses
     * the source.
     */
    at:
        | number
        | { fraction: number }
        | { element: MaybeRefOrGetter<HTMLElement | null> };
    /** Fire on which crossing direction. Default "both". */
    direction?: "down" | "up" | "both";
    /** Stable id for the event payload + de-dup. */
    id?: string;
}

export interface UseScrollTriggerOptions {
    triggers?: TriggerPoint[];
    /**
     * The flip-delta debounce (px) before a DIRECTION flip commits — the anti-thrash,
     * mirroring the dock's HOVER_INTENT_MS=60ms hysteresis. Default 8 (the RN
     * reference).
     */
    flipDeltaPx?: number;
    /** Resolve the continuous `progress` ref against the source (0..1). Default true. */
    trackProgress?: boolean;
    /** Honor `prefers-reduced-motion: reduce` (snap `progress` to discrete endpoints). Default true. */
    respectReducedMotion?: boolean;
    /** Crossed a trigger in the committed direction (fires ONCE per crossing). */
    onCross?: (id: string, dir: "down" | "up", scrollPos: number) => void;
    /** Crossed a trigger scrolling INTO its region (past it, in `down`). */
    onEnter?: (id: string) => void;
    /** Crossed OUT of a trigger's region (back before it, in `up`). */
    onLeave?: (id: string) => void;
}

export interface UseScrollTriggerReturn {
    /** Continuous 0..1 scroll progress off the SAME rAF read (native-timeline-gated). */
    progress: Ref<number>;
    /** Current scroll direction (committed past flipDeltaPx). */
    direction: Ref<"down" | "up" | null>;
    /** Current scroll velocity (px/s, framerate-independent — Δpos / Δt). */
    velocity: Ref<number>;
    /** Force a re-read + re-evaluate every trigger (post-resize/layout). */
    recalculate: () => void;
}

const PRM_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * True when the engine supports native scroll-driven animations. On a supporting
 * engine the `.scroll-progress` CSS recipe owns the continuous `progress` axis on
 * the compositor (writing `@property --scroll-t`), so the JS `progress` writer
 * attaches NOTHING — the dual-path single-writer. The discrete crossing events run
 * the JS rAF tick on EVERY engine (events can't ride a CSS timeline).
 */
const NATIVE_SCROLL_TIMELINE = supportsScrollTimeline();

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Resolve a trigger's `at` to a pixel offset on the source (extent-relative for fractions). */
function resolveTriggerPx(at: TriggerPoint["at"], reader: ScrollReader): number | null {
    if (typeof at === "number") return at;
    if ("fraction" in at) return clamp01(at.fraction) * reader.extent();
    // An element trigger: the source-relative top of the element. For a window
    // source the element's `offsetTop` (document-flow position) is the scroll px at
    // which its top reaches the viewport top; for a container source the element's
    // offset within the scroll port. We use the bounding-rect top + current scroll
    // (the px the source must reach to bring the element top to the source top).
    const el = toValue(at.element);
    if (!el) return null;
    const target = reader.target;
    if (target instanceof HTMLElement) {
        // Container source: the element's top relative to the container's content top.
        const elTop = el.getBoundingClientRect().top;
        const portTop = target.getBoundingClientRect().top;
        return reader.position() + (elTop - portTop);
    }
    // Window source: the element's document-flow top.
    return reader.position() + el.getBoundingClientRect().top;
}

/**
 * The ONE scroll reader. Composes `createScrollReader` (the shared rAF-coalesced
 * core); resolves triggers to px; emits direction/velocity/crossing; native-timeline-
 * gated continuous ramp.
 *
 * @example
 * ```ts
 * const { progress, direction, velocity } = useScrollTrigger(() => window, {
 *   triggers: [{ at: 120, id: "shrink", direction: "down" }],
 *   onCross(id, dir, pos) {  // fires once when crossing 120px scrolling down
 *     if (id === "shrink" && dir === "down") collapseChrome()
 *   },
 * })
 * ```
 */
export function useScrollTrigger(
    scrollSource: MaybeRefOrGetter<HTMLElement | Window | null>,
    opts: UseScrollTriggerOptions = {},
): UseScrollTriggerReturn {
    const {
        triggers = [],
        flipDeltaPx = 8,
        trackProgress = true,
        respectReducedMotion = true,
        onCross,
        onEnter,
        onLeave,
    } = opts;

    const progress = ref(0);
    const direction = ref<"down" | "up" | null>(null);
    const velocity = ref(0);

    // ── The cached PRM ref (the AV.W7 substrate pattern) — ONE matchMedia + change
    // listener for the reader's lifetime. PRM snaps the continuous ramp to a discrete
    // endpoint; the crossing events fire REGARDLESS (the useFadingScroll model).
    const canMatch =
        typeof window !== "undefined" && typeof window.matchMedia === "function";
    const prmQuery = canMatch ? window.matchMedia(PRM_QUERY) : null;
    let reduced = respectReducedMotion && (prmQuery?.matches ?? false);
    const onPrmChange = (e: MediaQueryListEvent): void => {
        reduced = respectReducedMotion && e.matches;
    };
    prmQuery?.addEventListener("change", onPrmChange);

    let reader: ScrollReader | null = null;
    // Per-trigger crossing state: whether the source is currently PAST the trigger
    // (de-dup so a crossing fires once, and enter/leave pair correctly).
    const passed = new Map<string, boolean>();
    let lastPos = 0;
    let lastTime = 0;
    // The direction-flip accumulator: a flip commits only once the position has moved
    // `flipDeltaPx` AGAINST the current committed direction (the anti-thrash).
    let pendingDir: "down" | "up" | null = null;
    let pendingFromPos = 0;

    function triggerId(t: TriggerPoint, i: number): string {
        return t.id ?? `trigger-${i}`;
    }

    function evaluate(now: number): void {
        if (!reader) return;
        const pos = reader.position();

        // ── Continuous progress (dual-path single-writer). On a native engine the CSS
        // recipe owns the ramp (writes --scroll-t) — the JS writer attaches NOTHING; we
        // only write `progress.value` on the fallback engine. Under PRM the JS ramp
        // snaps to the nearest endpoint (the interpolation drops; the discrete state
        // stays correct).
        if (trackProgress && !NATIVE_SCROLL_TIMELINE) {
            const extent = reader.extent();
            const raw = extent > 0 ? pos / extent : 0;
            progress.value = reduced ? Math.round(clamp01(raw)) : clamp01(raw);
        }

        // ── Velocity (Δpos / Δt, px/s — framerate-independent so 60/120Hz read the
        // same physical velocity, the usePointerVelocityField per-second discipline).
        const dt = lastTime > 0 ? (now - lastTime) / 1000 : 0;
        if (dt > 0) velocity.value = (pos - lastPos) / dt;

        // ── Direction with the flip-delta debounce. The instantaneous delta proposes a
        // direction; it COMMITS only once the position has moved `flipDeltaPx` against
        // the current committed direction (a 1px jitter never toggles `direction`).
        const instant: "down" | "up" | null =
            pos > lastPos ? "down" : pos < lastPos ? "up" : null;
        if (instant && instant !== direction.value) {
            // Anchor the pending-flip origin at the point the proposal began (the last
            // position before the reversal). A flip commits once the cumulative move
            // AGAINST the committed direction reaches flipDeltaPx — so a single large
            // jump commits this tick, while a 1px jitter never toggles.
            if (pendingDir !== instant) {
                pendingDir = instant;
                pendingFromPos = lastPos;
            }
            if (Math.abs(pos - pendingFromPos) >= flipDeltaPx) {
                direction.value = instant;
                pendingDir = null;
            }
        } else if (instant === direction.value) {
            pendingDir = null;
        }

        // ── Crossing events. A trigger fires once when the source PASSES its resolved
        // px. `passed` de-dups (a hover-back-and-forth fires enter→leave→enter, not a
        // storm); the crossing direction is read off the position delta (so a tiny
        // jitter at the boundary does not re-fire — the trigger is below `flipDeltaPx`
        // tolerance only matters for the `direction` ref, the crossing itself is the
        // strict past/not-past flip). The crossing events fire under PRM too (the
        // useFadingScroll discrete-survives model) — they are NOT gated on `reduced`.
        for (let i = 0; i < triggers.length; i++) {
            const t = triggers[i];
            const px = resolveTriggerPx(t.at, reader);
            if (px == null) continue;
            const id = triggerId(t, i);
            const wasPast = passed.get(id) ?? lastPos >= px;
            const isPast = pos >= px;
            if (isPast === wasPast) continue; // no crossing this tick
            passed.set(id, isPast);
            const crossDir: "down" | "up" = isPast ? "down" : "up";
            const wantDir = t.direction ?? "both";
            if (wantDir !== "both" && wantDir !== crossDir) continue;
            onCross?.(id, crossDir, pos);
            if (crossDir === "down") onEnter?.(id);
            else onLeave?.(id);
        }

        lastPos = pos;
        lastTime = now;
    }

    function tick(r: ScrollReader): void {
        evaluate(typeof performance !== "undefined" ? performance.now() : Date.now());
        void r;
    }

    function recalculate(): void {
        if (!reader) return;
        // Re-read without firing a crossing storm: re-seed `passed` to the current
        // past/not-past state (a post-resize re-evaluate, not a re-cross), then write
        // the continuous progress.
        const pos = reader.position();
        for (let i = 0; i < triggers.length; i++) {
            const t = triggers[i];
            const px = resolveTriggerPx(t.at, reader);
            if (px == null) continue;
            passed.set(triggerId(t, i), pos >= px);
        }
        lastPos = pos;
        if (trackProgress && !NATIVE_SCROLL_TIMELINE) {
            const extent = reader.extent();
            const raw = extent > 0 ? pos / extent : 0;
            progress.value = reduced ? Math.round(clamp01(raw)) : clamp01(raw);
        }
        reader.schedule();
    }

    function attach(source: ScrollSource): void {
        reader?.stop();
        reader = createScrollReader(source, tick);
        lastPos = reader.position();
        lastTime = 0;
        // Seed each trigger's past/not-past state so the first scroll computes a real
        // crossing, not a spurious one against an unseeded default.
        for (let i = 0; i < triggers.length; i++) {
            const t = triggers[i];
            const px = resolveTriggerPx(t.at, reader);
            if (px != null) passed.set(triggerId(t, i), lastPos >= px);
        }
        recalculate();
    }

    onMounted(() => {
        attach(toValue(scrollSource));
    });

    // Re-target re-attach (a source ref that resolves after mount).
    watch(
        () => toValue(scrollSource),
        (source) => attach(source),
        { flush: "post" },
    );

    onBeforeUnmount(() => {
        reader?.stop();
        reader = null;
        prmQuery?.removeEventListener("change", onPrmChange);
    });

    return { progress, direction, velocity, recalculate };
}
