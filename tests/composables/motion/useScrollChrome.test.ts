import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useScrollChrome } from "@glass/composables/motion/scroll/useScrollChrome";
import { mountComposable } from "../../utils/mountComposable";

// The reader derives velocity as Δpos/Δt off the rAF timestamp; happy-dom does not
// advance that timestamp across frames, so velocity would stay 0 and the ramp watch
// never fire. Inject a monotonic frame clock so the reader sees real Δt (and the ramp
// engages) — this is timing scaffolding, not a stub of the code under test.
let realRaf: typeof requestAnimationFrame;
let frameClock = 0;
beforeEach(() => {
    realRaf = globalThis.requestAnimationFrame;
    frameClock = 1000;
    globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
        realRaf(() => {
            frameClock += 16;
            cb(frameClock);
        })) as typeof requestAnimationFrame;
});

// useScrollChrome is a collapse-state machine OVER useScrollTrigger: it ramps
// `--chrome-collapse-t` 0→1 as the port scrolls DOWN and 1→0 as it scrolls UP. The
// painted shrink rides its π; this is the headless ramp-direction math. The up leg is
// the regression this pins: `collapseT` must FALL scrolling up, from any partial start
// (a sign-inverted up leg climbs to 1 instead — invisible until the dock root resolved).

// A bounded scroll-port stub (happy-dom does not lay out): a div whose scrollTop we drive.
function makeScrollPort(): HTMLElement {
    const el = document.createElement("div");
    document.body.appendChild(el);
    let top = 0;
    Object.defineProperty(el, "scrollTop", {
        get: () => top,
        set: (v: number) => {
            top = v;
        },
        configurable: true,
    });
    Object.defineProperty(el, "scrollHeight", { get: () => 2000, configurable: true });
    Object.defineProperty(el, "clientHeight", { get: () => 400, configurable: true });
    return el;
}

function flushRaf(): Promise<void> {
    return new Promise((r) => requestAnimationFrame(() => r()));
}

async function scrollTo(el: HTMLElement, pos: number): Promise<void> {
    el.scrollTop = pos;
    el.dispatchEvent(new Event("scroll"));
    await flushRaf();
}

afterEach(() => {
    globalThis.requestAnimationFrame = realRaf;
    document.body.innerHTML = "";
});

describe("useScrollChrome ramp direction", () => {
    it("collapses 0→1 scrolling DOWN and re-expands 1→0 scrolling UP (from a partial)", async () => {
        const port = makeScrollPort();
        const { result, unmount } = mountComposable(() =>
            useScrollChrome(port, {
                collapseOnScroll: true,
                collapseRangePx: 100,
                respectReducedMotion: false,
                // Push the scroll-stop snap far out so it never fires mid-assertion and
                // masks the ramp value with an endpoint snap.
                scrollStopMs: 100_000,
            }),
        );
        await flushRaf(); // mount attach

        // DOWN leg. The first tick has no Δt (velocity 0, no ramp); the first ramping
        // tick seeds the anchor at collapseT 0; subsequent ticks ramp up.
        await scrollTo(port, 20); // prime (velocity 0)
        await scrollTo(port, 50); // first ramp tick → seeds the anchor
        await scrollTo(port, 100); // +50 past the seed over a 100px range → ~0.5
        const collapsedPartial = result.collapseT.value;
        expect(collapsedPartial).toBeGreaterThan(0.3);
        expect(collapsedPartial).toBeLessThan(0.75);

        // UP leg from the partial: after the flip re-anchors, each up step must LOWER
        // collapseT (the sign-inversion pin — a `1 - delta` up leg would climb toward 1).
        await scrollTo(port, 75); // −25 up past the flip delta → direction commits "up", re-anchors
        await scrollTo(port, 50);
        const afterUp1 = result.collapseT.value;
        await scrollTo(port, 30);
        const afterUp2 = result.collapseT.value;

        expect(afterUp1).toBeLessThan(collapsedPartial);
        expect(afterUp2).toBeLessThan(afterUp1);

        unmount();
    });

    it("re-expands IMMEDIATELY from a FAR over-scroll (the re-anchor-on-flip, no dead travel)", async () => {
        const port = makeScrollPort();
        const { result, unmount } = mountComposable(() =>
            useScrollChrome(port, {
                collapseOnScroll: true,
                collapseRangePx: 100,
                respectReducedMotion: false,
                scrollStopMs: 100_000,
            }),
        );
        await flushRaf();

        // Prime, seed at 60 (raw hits 1 by pos 160), then over-scroll FAR past clamp — the
        // anchor-relative fraction saturates at pos 160, so 600 is ~440px of dead over-scroll.
        await scrollTo(port, 20); // prime
        await scrollTo(port, 60); // seed
        await scrollTo(port, 300); // clamps at 1
        await scrollTo(port, 600); // far over-scroll
        expect(result.collapseT.value).toBe(1);

        // Reverse and sweep up a MODEST distance (600 → 380, only 220px). The direction
        // flip re-anchors at the extreme, so collapseT re-expands well below 1 within that
        // sweep. WITHOUT the re-anchor the anchor stays at 60, so collapseT would clamp at
        // 1 until pos falls below 160 — the up leg would have to clear ~440px of dead travel
        // first, leaving it pinned at 1 here. This pins the re-anchor, not the ramp alone.
        for (const y of [560, 500, 460, 420, 380]) await scrollTo(port, y);
        expect(result.collapseT.value).toBeLessThan(0.9);

        unmount();
    });
});
