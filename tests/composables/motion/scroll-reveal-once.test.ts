// BC.W-MOTION-PRESETS #8 — the `[data-scroll-reveal-once]` latch. The continuous
// `[data-scroll-reveal]` recipe rides a native `view()` timeline that RE-FIRES every
// re-entry (wrong for a virtualized/teleporting list). The `once` latch plays the
// entrance ONCE: the `vScrollRevealOnce` directive adds `data-revealed` on first
// cross + `unobserve`s (the SHIPPED `useStaggerReveal` `once` discipline, reused —
// no second observer engine), and the CSS plays a one-shot `@keyframes` keyed off
// the attr (NOT the live `view()` range).
//
// VERIFIES (a scripted IntersectionObserver — the global mock in tests/setup.ts):
//   · mounted: each child is observed; first cross adds `data-revealed` + unobserves;
//   · a re-entry does NOT re-fire (the attr stays set once, the directive already
//     unobserved — the `once` latch);
//   · unmounted disconnects the observer (no leak).

import { afterEach, describe, expect, it } from "vitest";
import { TestIntersectionObserver } from "../../setup";
import { vScrollRevealOnce } from "../../../src/composables/motion/useStaggerReveal";

function makeScroller(childCount: number): HTMLElement {
    const scroller = document.createElement("div");
    scroller.setAttribute("data-scroll-reveal-once", "");
    for (let i = 0; i < childCount; i++) {
        scroller.appendChild(document.createElement("div"));
    }
    document.body.appendChild(scroller);
    return scroller;
}

describe("[data-scroll-reveal-once] latch (vScrollRevealOnce)", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        TestIntersectionObserver.instances.length = 0;
    });

    it("observes each child on mount (one IntersectionObserver — no second engine)", () => {
        const scroller = makeScroller(3);
        const before = TestIntersectionObserver.instances.length;
        vScrollRevealOnce.mounted(scroller);
        // exactly ONE new observer instance — the reused machinery, not a second engine.
        expect(TestIntersectionObserver.instances.length).toBe(before + 1);
        const observer = TestIntersectionObserver.instances.at(-1)!;
        expect(observer.observe).toHaveBeenCalledTimes(3);
    });

    it("first cross sets data-revealed + unobserves (the once leg)", () => {
        const scroller = makeScroller(1);
        vScrollRevealOnce.mounted(scroller);
        const observer = TestIntersectionObserver.instances.at(-1)!;
        const child = scroller.children[0] as HTMLElement;

        expect(child.hasAttribute("data-revealed")).toBe(false);
        observer.trigger(child, true);
        expect(child.hasAttribute("data-revealed")).toBe(true);
        // the one-shot discipline: it unobserves the element after the first cross.
        expect(observer.unobserve).toHaveBeenCalledWith(child);
    });

    it("a re-entry does NOT re-fire (the entrance plays ONCE)", () => {
        const scroller = makeScroller(1);
        vScrollRevealOnce.mounted(scroller);
        const observer = TestIntersectionObserver.instances.at(-1)!;
        const child = scroller.children[0] as HTMLElement;

        observer.trigger(child, true); // first cross — reveal
        expect(child.hasAttribute("data-revealed")).toBe(true);
        const unobserveCalls = observer.unobserve.mock.calls.length;

        // scroll out then back in: the attr is already set (the CSS one-shot already
        // played), and a re-cross does not toggle it off or re-fire.
        observer.trigger(child, false);
        observer.trigger(child, true);
        expect(child.hasAttribute("data-revealed")).toBe(true);
        // it never re-unobserves / re-fires the entrance — the `once` latch.
        expect(observer.unobserve.mock.calls.length).toBe(unobserveCalls);
    });

    it("reveals immediately when IntersectionObserver is unavailable (SSR/old — terminal state correct)", () => {
        const scroller = makeScroller(2);
        const original = globalThis.IntersectionObserver;
        // @ts-expect-error — simulate the no-IO engine.
        delete globalThis.IntersectionObserver;
        try {
            vScrollRevealOnce.mounted(scroller);
            for (const child of Array.from(scroller.children)) {
                expect((child as HTMLElement).hasAttribute("data-revealed")).toBe(true);
            }
        } finally {
            globalThis.IntersectionObserver = original;
        }
    });

    it("unmounted disconnects the observer (no leak)", () => {
        const scroller = makeScroller(2);
        vScrollRevealOnce.mounted(scroller);
        const observer = TestIntersectionObserver.instances.at(-1)!;
        vScrollRevealOnce.unmounted(scroller);
        expect(observer.disconnect).toHaveBeenCalledTimes(1);
    });
});
