import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";
import type { DeckCore } from "./useDeck";

/* useDeckSnap — the substrate's INERTIAL TRAVEL arm, on the platform's own snap.
   LAW 11 partitions motion into two vocabularies that never mix: TRAVEL is
   inertial and EXPANSION is fired. This is the travel half wherever the strip
   actually scrolls, and the platform already owns it — momentum, rubber-banding,
   trackpad and touch scrubbing, and the snap itself all come free and correct in
   both engines. A tween library re-implementing scroll physics is the third
   vocabulary LAW 11 forbids; it is not imported here, and the strip does the
   scrolling.

   THE SETTLED INDEX comes from `scrollsnapchange` where the engine fires it, and
   from ONE IntersectionObserver where it does not. There is no scroll-position
   arithmetic in the commit path: an index is committed because the platform said a
   snap target changed, or because a member is observed to hold the viewport.

   THE CONTINUOUS CHANNEL is fed from the same scroll the platform is already
   dispatching — a fractional member position plus its derivative — so the
   member-projection arm has a real timeline instead of a stepped one. The feed is
   the deck core's OPTIONAL channel: a deck driven by transforms rather than scroll
   simply never mounts this arm.

   Scroll-position reads are `scrollLeft`/`scrollTop` and a cached member extent —
   never a per-frame `getBoundingClientRect` over the members. */

export interface UseDeckSnapOptions {
    /** The scroll container (the strip). Its element children are the members. */
    strip: Ref<HTMLElement | null>;
    /** The core this arm drives and is driven by. */
    deck: DeckCore;
    /**
     * Feed the core's continuous position/velocity channel off the live scroll.
     * Default true; a consumer whose seam admits no continuous scalar turns it off.
     */
    continuous?: boolean;
}

export interface UseDeckSnap {
    /** Scroll a member into view. `smooth` rides the platform's own inertia. */
    scrollTo(index: number, behavior?: ScrollBehavior): void;
    /** Re-measure the member extent (a resize, a member count change). */
    measure(): void;
}

interface SnapChangeEvent extends Event {
    snapTargetInline: Element | null;
    snapTargetBlock: Element | null;
}

export function useDeckSnap(options: UseDeckSnapOptions): UseDeckSnap {
    const { strip, deck } = options;
    const feedContinuous = options.continuous !== false;

    /** The member extent along the axis, in px — measured, never per frame. */
    let extent = 0;
    /** Suppress the commit path while a programmatic scroll is settling. */
    let programmatic = 0;
    let lastPosition = 0;
    let lastTime = 0;
    let observer: IntersectionObserver | null = null;

    const members = (): HTMLElement[] => {
        const el = strip.value;
        return el ? (Array.from(el.children) as HTMLElement[]) : [];
    };

    function measure(): void {
        const el = strip.value;
        if (!el) return;
        const kids = members();
        const first = kids[0];
        if (!first) {
            extent = 0;
            return;
        }
        // The PITCH, not the member's own box: a gutter between members makes the
        // two different, and every snap position is a multiple of the pitch.
        const vertical = deck.axis.value === "vertical";
        const second = kids[1];
        if (second) {
            extent = vertical
                ? second.offsetTop - first.offsetTop
                : second.offsetLeft - first.offsetLeft;
        }
        if (!extent) {
            const box = first.getBoundingClientRect();
            extent = vertical ? box.height : box.width;
        }
    }

    function offset(): number {
        const el = strip.value;
        if (!el) return 0;
        return deck.axis.value === "vertical" ? el.scrollTop : el.scrollLeft;
    }

    function commit(index: number): void {
        if (programmatic > 0) return;
        deck.go(index);
    }

    function onScroll(): void {
        if (!feedContinuous || extent <= 0) return;
        const now = performance.now();
        const position = offset() / extent;
        const dt = lastTime ? (now - lastTime) / 1000 : 0;
        const velocity = dt > 0 ? (position - lastPosition) / dt : 0;
        lastPosition = position;
        lastTime = now;
        deck.feed(position, velocity);
    }

    function onSnapChange(event: Event): void {
        const e = event as SnapChangeEvent;
        const target =
            deck.axis.value === "vertical" ? e.snapTargetBlock : e.snapTargetInline;
        if (!target) return;
        const i = members().indexOf(target as HTMLElement);
        if (i >= 0) commit(i);
    }

    function observe(): void {
        const el = strip.value;
        if (!el || typeof IntersectionObserver === "undefined") return;
        observer?.disconnect();
        observer = new IntersectionObserver(
            (entries) => {
                let best: IntersectionObserverEntry | null = null;
                for (const entry of entries) {
                    if (!best || entry.intersectionRatio > best.intersectionRatio)
                        best = entry;
                }
                if (!best || best.intersectionRatio < 0.55) return;
                const i = members().indexOf(best.target as HTMLElement);
                if (i >= 0) commit(i);
            },
            { root: el, threshold: [0.55, 0.75, 1] },
        );
        for (const member of members()) observer.observe(member);
    }

    function scrollTo(index: number, behavior: ScrollBehavior = "smooth"): void {
        const el = strip.value;
        if (!el || extent <= 0) return;
        const to = index * extent;
        if (Math.abs(offset() - to) < 1) return;
        programmatic += 1;
        el.scrollTo(
            deck.axis.value === "vertical"
                ? { top: to, behavior }
                : { left: to, behavior },
        );
        // Release the suppression once the platform has settled the scroll. The
        // `scrollend` event is the honest signal; the timeout is its floor for an
        // engine that never fires one (a zero-distance programmatic scroll).
        const release = () => {
            programmatic = Math.max(0, programmatic - 1);
            el.removeEventListener("scrollend", release);
        };
        el.addEventListener("scrollend", release, { once: true });
        setTimeout(release, 900);
    }

    // The index authority drives the strip; the strip commits the index back. The
    // guard above is what keeps that from being a loop.
    watch(
        () => deck.index.value,
        (i) => scrollTo(i),
    );
    watch(() => deck.total.value, () => {
        measure();
        observe();
    });

    onMounted(() => {
        const el = strip.value;
        if (!el) return;
        measure();
        // `scrollsnapchange` is the platform's own settled-snap signal; the
        // observer is the ONE fallback for an engine that has not shipped it.
        if ("onscrollsnapchange" in el) {
            el.addEventListener("scrollsnapchange", onSnapChange);
        } else {
            observe();
        }
        el.addEventListener("scroll", onScroll, { passive: true });
        scrollTo(deck.index.value, "instant");
    });

    onBeforeUnmount(() => {
        const el = strip.value;
        el?.removeEventListener("scrollsnapchange", onSnapChange);
        el?.removeEventListener("scroll", onScroll);
        observer?.disconnect();
        observer = null;
    });

    return { scrollTo, measure };
}
