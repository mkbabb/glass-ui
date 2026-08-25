// The dock RUN — reach, roving tabindex, and the live-region announcement.
//
// [2026-08-24 · BK #47 W3 LATTICE + W6 REACH/KEYBOARD] One composable owns the three
// behaviours the lattice makes closed-form, because all three are the same arithmetic
// read three ways: where a seat rests, which seat holds the tab stop, and what the
// user is told when the dock moves under them.
//
// WHAT IS *NOT* HERE, and why that is the point. No flick projector, no detent table,
// no item census, no bias filter, no rubber band, no per-detent damping. The run is a
// native snap scroller (`scroll-snap-type: mandatory` + `scroll-padding: P/2`,
// run.css) so the platform owns momentum and rest, and a JS gesture owner cannot
// coexist with it — `touchmove` is non-cancelable once native scroll begins, so
// claiming the gesture means `touch-action: none`, which un-scrollers the run and
// takes reach and `overscroll-behavior` with it. What remains for JS is exactly the
// part the platform has no opinion about: WHICH seat to bring into view, and when.
//
// THE ANCHOR. Seat i (1-based) rests at
//
//     (i−1)·P + [openIdx < i]·(m−1)·P − P/2      clamped to [0, scrollMax]
//
// P = `--dock-pitch`, m = `--dock-open-pitches`. The first term is the lattice; the
// second is the open seat's extra (m−1) pitches pushing every LATER seat along — drop
// it and reach is wrong for every seat after the open one, which is the mutation that
// bites G-DOCK-REACH. The −P/2 term is the modular correction: with `scroll-padding:
// P/2` an interior rest is ≡ P/2 (mod P), so the anchor computed WITHOUT it is not a
// snap position and the engine drags the glide off it the moment it settles.
//
// The clamp is what makes the terminals flush (0 and scrollMax, ≡ 0 mod P by
// definition) rather than half-peeked — completeness at the ends, peek in the middle.

import { onMounted, onUnmounted, watch, type ComputedRef, type Ref } from "vue";

import { FOCUSABLE_SELECTOR } from "../../_shared/focus";
import { DOCK_SPRING } from "../constants";
import { useDockSpring } from "./useDockSpring";

export interface UseDockRunOptions {
    /** The scroll port — `.dock-run`, the element the seats are children of. */
    runEl: Ref<HTMLElement | null>;
    /** The `role="status"` node reach announces through. */
    statusEl: Ref<HTMLElement | null>;
    /** Resolved layout axis; selects the scroll axis and the arrow-key pair. */
    orientation: ComputedRef<"horizontal" | "vertical">;
}

export interface UseDockRunReturn {
    /**
     * Bring `seat` fully into view at its lattice anchor, on the DOCK spring. Exposed
     * so a consumer driving selection programmatically reaches the same anchor the
     * pointer and keyboard paths do — one reach, three callers.
     */
    reach: (seat: HTMLElement) => void;
    /** Re-derive the tab stop. Called on mount, on focus moves, and on content change. */
    syncRoving: () => void;
}

/** Read a registered custom property off `el` as a finite number of px (or units). */
function readScalar(el: HTMLElement, prop: string): number {
    const raw = getComputedStyle(el).getPropertyValue(prop).trim();
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : 0;
}

/**
 * The run's SEATS — its direct element children, in document order. Direct children
 * only: a seat is a lattice cell, and a focusable descendant *inside* one (a menu item
 * in an open popover, an input in the search slot) is not a second seat. Taking
 * `querySelectorAll` here would put the tab stop inside a seat and desynchronise the
 * roving index from the pitch index the anchor is computed from.
 */
function seatsOf(run: HTMLElement): HTMLElement[] {
    return Array.from(run.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement,
    );
}

/**
 * The OPEN seat's index, or −1. The open seat is the selected destination, and the one
 * thing every expression of "selected" in this tree agrees on is `aria-current` — which
 * `RouterLink` sets natively and which GF-DOCK ratifies over `role="tab"` for a dock
 * whose seats are routes. Read as a NEGATION of the false poles so any truthy token
 * (`"page"`, `"true"`, `"step"`) counts.
 */
function openIndexOf(seats: HTMLElement[]): number {
    return seats.findIndex((seat) => {
        const marked = seat.matches("[aria-current]")
            ? seat
            : seat.querySelector("[aria-current]");
        const current = marked?.getAttribute("aria-current");
        return current != null && current !== "false";
    });
}

/** The seat's own focusable, or the seat itself when it is one. */
function focusTargetOf(seat: HTMLElement): HTMLElement | null {
    if (seat.matches(FOCUSABLE_SELECTOR)) return seat;
    return seat.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
}

export function useDockRun(options: UseDockRunOptions): UseDockRunReturn {
    const { runEl, statusEl, orientation } = options;

    // ONE spring for every glide. A second reach that arrives mid-glide RE-TARGETS this
    // spring from its live (value, velocity) rather than racing a second episode — the
    // interruptible-physics continuity, and the reason a fast tab-through reads as one
    // continuous travel instead of a stutter of restarts.
    const glide = useDockSpring({
        response: DOCK_SPRING.response,
        dampingFraction: DOCK_SPRING.dampingFraction,
    });

    function vertical(): boolean {
        return orientation.value === "vertical";
    }

    function scrollPos(run: HTMLElement): number {
        return vertical() ? run.scrollTop : run.scrollLeft;
    }

    function writeScroll(run: HTMLElement, value: number): void {
        if (vertical()) run.scrollTop = value;
        else run.scrollLeft = value;
    }

    function scrollMax(run: HTMLElement): number {
        return vertical()
            ? run.scrollHeight - run.clientHeight
            : run.scrollWidth - run.clientWidth;
    }

    /** The closed-form anchor for `seat`. See the header for the derivation. */
    function anchorFor(run: HTMLElement, seat: HTMLElement): number {
        const seats = seatsOf(run);
        const i = seats.indexOf(seat);
        if (i < 0) return scrollPos(run);

        const pitch = readScalar(run, "--dock-pitch");
        // A zero pitch means the dock has not painted (jsdom, an engine that dropped
        // the registration). There is no lattice to anchor to, so hold position — a
        // guessed anchor would move the port to an arbitrary offset, which is worse
        // than not reaching at all.
        if (pitch <= 0) return scrollPos(run);

        const m = Math.max(1, readScalar(run, "--dock-open-pitches"));
        const openIdx = openIndexOf(seats);
        const openExtra = openIdx >= 0 && openIdx < i ? (m - 1) * pitch : 0;

        const raw = i * pitch + openExtra - pitch / 2;
        return Math.min(Math.max(raw, 0), scrollMax(run));
    }

    /**
     * True when `seat` is not FULLY inside the port. Reach fires on partial visibility,
     * not on absence: a seat cut by the peek is exactly the case the lattice creates on
     * purpose at every interior rest, and it is exactly the case a user cannot click.
     */
    function occluded(run: HTMLElement, seat: HTMLElement): boolean {
        const port = run.getBoundingClientRect();
        const box = seat.getBoundingClientRect();
        // Sub-pixel tolerance: a flush seat routinely measures a fraction outside its
        // port under fractional device ratios, and reaching for it would glide by ~0px
        // on every focus — motion with no cause.
        const slack = 1;
        return vertical()
            ? box.top < port.top - slack || box.bottom > port.bottom + slack
            : box.left < port.left - slack || box.right > port.right + slack;
    }

    function announce(seat: HTMLElement): void {
        const status = statusEl.value;
        if (!status) return;
        const target = focusTargetOf(seat) ?? seat;
        const name =
            target.getAttribute("aria-label") ??
            target.getAttribute("title") ??
            target.textContent?.trim();
        // An empty announcement is worse than none: it re-fires the live region with no
        // content, which some ATs read as a blank interruption.
        if (name) status.textContent = name;
    }

    function reach(seat: HTMLElement): void {
        const run = runEl.value;
        if (!run) return;
        announce(seat);
        if (!occluded(run, seat)) return;
        const from = scrollPos(run);
        const to = anchorFor(run, seat);
        if (Math.abs(to - from) < 1) return;
        // The spring writes a 0→1 progress; the position is the lerp. `useDockSpring` is
        // armed `respectReducedMotion: true`, so under `reduce` this JUMPS in one frame
        // — the destination is identical, only the travel is removed.
        glide.playTo(0, 1, {
            onFrame: (t) => {
                const el = runEl.value;
                if (el) writeScroll(el, from + (to - from) * t);
            },
        });
    }

    /**
     * ROVING TABINDEX. Exactly one seat is in the tab order; the rest are reachable by
     * arrow key. The RED this replaces was total — every focusable seat carried
     * `tabIndex 0` across all five docks (13/13, 9/9, 7/7, 5/5, 15/15) and `keydown`
     * was bound 0/0 — so tabbing through a route dock cost one stop per destination and
     * arrow keys did nothing, which is neither the toolbar pattern nor any other one.
     *
     * The stop follows the OPEN seat when there is one (returning to a dock puts focus
     * on where you are, not on where the list begins) and the first seat otherwise.
     */
    function syncRoving(): void {
        const run = runEl.value;
        if (!run) return;
        const seats = seatsOf(run);
        if (seats.length === 0) return;
        const openIdx = openIndexOf(seats);
        // A seat that already holds focus keeps the stop — re-seating it to the open
        // seat mid-interaction would fight the user's own arrow keys.
        const focusedIdx = seats.findIndex((seat) => seat.contains(document.activeElement));
        const stop = focusedIdx >= 0 ? focusedIdx : openIdx >= 0 ? openIdx : 0;
        seats.forEach((seat, idx) => {
            const target = focusTargetOf(seat);
            if (!target) return;
            target.tabIndex = idx === stop ? 0 : -1;
        });
    }

    function moveTo(seats: HTMLElement[], idx: number): void {
        const seat = seats[idx];
        if (!seat) return;
        const target = focusTargetOf(seat);
        if (!target) return;
        // Glide FIRST, focus second. `focus()` on an occluded child triggers the
        // engine's own scroll-into-view, which lands at the engine's anchor rather than
        // the lattice's and then fights the spring for the same scroll offset.
        // `preventScroll` refuses that, and reach owns the travel.
        reach(seat);
        target.tabIndex = 0;
        target.focus({ preventScroll: true });
        syncRoving();
    }

    function onKeydown(event: KeyboardEvent): void {
        const run = runEl.value;
        if (!run) return;
        const seats = seatsOf(run);
        if (seats.length === 0) return;
        const from = seats.findIndex((seat) => seat.contains(event.target as Node));
        if (from < 0) return;

        const [prev, next] = vertical()
            ? (["ArrowUp", "ArrowDown"] as const)
            : (["ArrowLeft", "ArrowRight"] as const);

        let to: number;
        switch (event.key) {
            case prev:
                to = from - 1;
                break;
            case next:
                to = from + 1;
                break;
            case "Home":
                to = 0;
                break;
            case "End":
                to = seats.length - 1;
                break;
            default:
                return;
        }
        // No wrap. A toolbar's ends are real: wrapping a route dock sends the user from
        // the last destination to the first on one keypress with no cue that it
        // happened, and the lattice's terminals are exactly where "flush = completeness"
        // is being taught by the cap.
        if (to < 0 || to >= seats.length) return;
        event.preventDefault();
        moveTo(seats, to);
    }

    /**
     * REACH ON ACTIVATION, in CAPTURE on the run's own subtree. Capture-phase on the
     * run — not a `DockContext` widening and not a public `seat` member — is the whole
     * mechanism: it is strictly fewer public bytes than the refused context member, it
     * needs no cooperation from the seats, and it works for a seat a consumer authored
     * five components deep.
     */
    function onActivate(event: Event): void {
        const run = runEl.value;
        if (!run) return;
        const seat = seatsOf(run).find((s) => s.contains(event.target as Node));
        if (seat) reach(seat);
    }

    let mo: MutationObserver | null = null;

    onMounted(() => {
        const run = runEl.value;
        if (!run) return;
        run.addEventListener("keydown", onKeydown);
        run.addEventListener("click", onActivate, { capture: true });
        run.addEventListener("focusin", onActivate, { capture: true });
        syncRoving();
        // The seat set is consumer content: it changes when a route list changes, when a
        // face swaps, when `aria-current` moves. Re-derive the tab stop on those, and on
        // nothing else — no scroll listener, no resize observer, because the lattice
        // makes both irrelevant (the anchor is arithmetic, not a measurement).
        mo = new MutationObserver(() => syncRoving());
        mo.observe(run, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["aria-current"],
        });
    });

    onUnmounted(() => {
        const run = runEl.value;
        run?.removeEventListener("keydown", onKeydown);
        run?.removeEventListener("click", onActivate, { capture: true });
        run?.removeEventListener("focusin", onActivate, { capture: true });
        mo?.disconnect();
        glide.dispose();
    });

    // A vertical dock and a horizontal one take different arrow pairs and different
    // scroll axes; a dock that flips orientation re-derives its stop rather than keeping
    // a tab order that now reads across the wrong axis.
    watch(orientation, () => syncRoving());

    return { reach, syncRoving };
}
