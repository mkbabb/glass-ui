// The run's ACTIVE MARK — one selected plate per navigation run, gliding between seats.
//
// A run used as navigation marks its destination with `aria-current` (RouterLink sets it
// natively; `useDockRun.openIndexOf` and run.css's open seat read the same predicate).
// Each seat used to paint its own selected plate, so a change of destination cut: one
// plate vanished and another appeared. This composable paints ONE plate for the run (the
// inert `.dock-run-mark` element the run renders while `marked`, run.css) and moves it
// from the seat it leaves to the seat it reaches on the dock spring.
//
// THE MARK IS NOT A SEAT. It is a child of the run, so every enumeration of the run's
// children reads `isRunSeat` (below), the one place script says so.
//
// THE MARK RIDES THE RUN'S OWN COORDINATES. Its box is the run's scrolled content box, so
// a run that scrolls carries the mark with it natively: no scroll listener, no per-scroll
// write. Script writes only when the destination changes or a seat resizes.
//
// WHY IT TRACKS THE ARRIVING SEAT LIVE. The open seat widens as it is reached (run.css,
// the volume transfer on `--spring-dock`), so the arriving seat's final box does not exist
// yet when the change lands. Each frame the mark reads the arriving seat's live box L(t)
// and draws `start + (L(t) − start) · p(t)`, where p is the dock spring from 0 to 1. At
// p = 1 it is exactly on the seat, whatever the seat's own transition did meanwhile.
//
// THE MARK'S INLINE OFFSET IS LOGICAL. It is written from the run's inline-start edge
// and painted at `inset-inline-start`, so a run whose direction flips on a live page
// mirrors its mark with its seats, with no measure: a direction change resizes nothing.
// The edge is the RUN's inline start, read from the run's own direction: the element the
// offset is applied on. A seat with a `dir` of its own (a language switch) lies in the
// run's coordinates like any other.
//
// THE FIRST MEASURE WAITS ONE FRAME. Reading a seat's box in the mount task would force
// the new dock's layout there; the first animation frame runs before the first paint, so
// the mark is still on its seat in the first frame anyone sees.
//
// A seat inside its own scroller (a tab strip in a fading scroll region) is not on the
// run's coordinates, so it keeps its own plate and the run draws no mark.

import { onMounted, onUnmounted, readonly, ref, type Ref } from "vue";

import { DOCK_SPRING } from "../constants";
import { useDockSpring } from "./useDockSpring";

export interface UseDockRunMarkOptions {
    /** The run, `.dock-run`: the mark's containing block and scroll port. */
    runEl: Ref<HTMLElement | null>;
}

/** The class of the run's mark element (run.css, THE ACTIVE MARK). */
const DOCK_RUN_MARK_CLASS = "dock-run-mark";

/** False for the run's mark, the one child of the run that is not a seat. */
export function isRunSeat(el: Element): boolean {
    return !el.classList.contains(DOCK_RUN_MARK_CLASS);
}

const CURRENT = '[aria-current]:not([aria-current="false"])';

interface Box {
    x: number;
    y: number;
    w: number;
    h: number;
    r: number;
}

/** True when an element between `el` and `run` clips or scrolls its content. */
function insideOwnScroller(el: HTMLElement, run: HTMLElement): boolean {
    for (let node = el.parentElement; node && node !== run; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (style.overflowX !== "visible" || style.overflowY !== "visible") return true;
    }
    return false;
}

/** The run's destination: the first rendered `aria-current` element on its coordinates. */
function destinationOf(run: HTMLElement): HTMLElement | null {
    for (const el of run.querySelectorAll<HTMLElement>(CURRENT)) {
        if (el.getClientRects().length === 0) continue;
        return insideOwnScroller(el, run) ? null : el;
    }
    return null;
}

const px = (value: string): number => {
    const n = Number.parseFloat(value);
    return Number.isFinite(n) ? n : 0;
};

/**
 * The seat's PAINTED plate in the run's scrolled content coordinates: the box its own
 * selected background would fill (its `background-clip` box), at the corner that box
 * takes from the seat's radius. `x` is the offset from the run's inline-start edge.
 */
function plateOf(run: HTMLElement, seat: HTMLElement, rtl: boolean): Box {
    const port = run.getBoundingClientRect();
    const rect = seat.getBoundingClientRect();
    const style = getComputedStyle(seat);
    const clip = style.backgroundClip;
    const border = clip === "border-box" ? 0 : 1;
    const padding = clip === "content-box" ? 1 : 0;
    const left = border * px(style.borderLeftWidth) + padding * px(style.paddingLeft);
    const right = border * px(style.borderRightWidth) + padding * px(style.paddingRight);
    const top = border * px(style.borderTopWidth) + padding * px(style.paddingTop);
    const bottom = border * px(style.borderBottomWidth) + padding * px(style.paddingBottom);
    const radius = style.borderTopLeftRadius.endsWith("%")
        ? (px(style.borderTopLeftRadius) / 100) * rect.width
        : px(style.borderTopLeftRadius);
    // Right to left, the inline-start edge is the padding box's right edge, and
    // `scrollLeft` runs from 0 at that edge to negative values toward the end.
    const x =
        rtl
            ? port.left + run.clientLeft + run.clientWidth - rect.right - run.scrollLeft + right
            : rect.left - port.left - run.clientLeft + run.scrollLeft + left;
    return {
        x,
        y: rect.top - port.top - run.clientTop + run.scrollTop + top,
        w: Math.max(0, rect.width - left - right),
        h: Math.max(0, rect.height - top - bottom),
        r: Math.max(0, radius - Math.max(left, top)),
    };
}

const mix = (a: Box, b: Box, t: number): Box => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    w: a.w + (b.w - a.w) * t,
    h: a.h + (b.h - a.h) * t,
    r: a.r + (b.r - a.r) * t,
});

export interface UseDockRunMarkReturn {
    /** True while the run draws a mark: the run renders its `.dock-run-mark` element. */
    marked: Readonly<Ref<boolean>>;
}

export function useDockRunMark({ runEl }: UseDockRunMarkOptions): UseDockRunMarkReturn {
    const spring = useDockSpring(DOCK_SPRING);
    const marked = ref(false);
    let seat: HTMLElement | null = null;
    let mark: Box | null = null;
    let from: Box | null = null;

    function paint(run: HTMLElement, box: Box): void {
        mark = box;
        run.style.setProperty("--dock-run-mark-x", `${box.x}px`);
        run.style.setProperty("--dock-run-mark-y", `${box.y}px`);
        run.style.setProperty("--dock-run-mark-w", `${box.w}px`);
        run.style.setProperty("--dock-run-mark-h", `${box.h}px`);
        run.style.setProperty("--dock-run-mark-r", `${box.r}px`);
        marked.value = true;
    }

    function clear(run: HTMLElement): void {
        spring.dispose();
        seat = null;
        mark = null;
        marked.value = false;
    }

    /** The seat's plate, measured from the run's own inline-start edge. */
    const plate = (run: HTMLElement, at: HTMLElement): Box =>
        plateOf(run, at, getComputedStyle(run).direction === "rtl");

    /** Re-read the destination; glide to a new one, re-seat on the same one. */
    function sync(): void {
        const run = runEl.value;
        if (!run) return;
        const next = destinationOf(run);
        if (!next) {
            clear(run);
            return;
        }
        if (next === seat) {
            if (!spring.live) paint(run, plate(run, next));
            return;
        }
        const start = mark;
        seat = next;
        observe(run);
        if (!start) {
            paint(run, plate(run, next));
            return;
        }
        from = start;
        spring.playTo(0, 1, {
            inheritVelocityScale: 0,
            onFrame: (p) => {
                if (seat && from) paint(run, mix(from, plate(run, seat), p));
            },
            onSettle: () => {
                if (seat) paint(run, plate(run, seat));
            },
        });
    }

    let mutations: MutationObserver | null = null;
    let resizes: ResizeObserver | null = null;
    let firstFrame = 0;

    /**
     * Watch every box whose size moves the plate: the run, each of its seats (a seat
     * before the destination that widens or narrows shifts it along the run, though the
     * destination's own size and the run's do not change) and the destination itself.
     */
    function observe(run: HTMLElement): void {
        if (!resizes) return;
        resizes.disconnect();
        resizes.observe(run);
        for (const child of run.children) if (isRunSeat(child)) resizes.observe(child);
        if (seat) resizes.observe(seat);
    }

    onMounted(() => {
        const run = runEl.value;
        if (!run) return;
        // The destination moves when a seat's `aria-current` changes or a seat is added
        // or removed. A change inside a seat (a label whose text ticks) is neither; its
        // size, if it changes, reaches the mark through that seat's resize, whichever
        // seat it is.
        mutations = new MutationObserver((records) => {
            const seats = records.some((r) => r.type === "childList" && r.target === run);
            if (seats) observe(run);
            if (seats || records.some((r) => r.type === "attributes")) sync();
        });
        mutations.observe(run, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["aria-current"],
        });
        // Without a ResizeObserver (an embedded or older host) the mark still lands on
        // each destination change; only a seat's own resize goes unread, as the dock's
        // endpoints do there (dockMorphMeasure.ts).
        if (typeof ResizeObserver !== "undefined") {
            resizes = new ResizeObserver(() => {
                if (!spring.live) sync();
            });
        }
        firstFrame = requestAnimationFrame(() => {
            firstFrame = 0;
            sync();
        });
    });

    onUnmounted(() => {
        cancelAnimationFrame(firstFrame);
        mutations?.disconnect();
        resizes?.disconnect();
        spring.dispose();
    });

    return { marked: readonly(marked) };
}
