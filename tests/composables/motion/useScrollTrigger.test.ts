import { afterEach, describe, expect, it, vi } from "vitest";
import { useScrollTrigger } from "@glass/composables/motion/scroll/useScrollTrigger";
import type { TriggerPoint } from "@glass/composables/motion/scroll/useScrollTrigger";
import { mountComposable } from "../../utils/mountComposable";

// useScrollTrigger is a pure scroll→event mapper (no GPU): a continuous progress ref
// off the same rAF read + discrete onCross/onEnter/onLeave trigger-point events,
// direction (committed past the flip-delta) + per-second velocity. The painted truth
// (the chrome reading the reader) rides the π; this is the headless
// math half.

// A bounded scroll-port stub: a div whose scrollTop we drive + whose scroll metrics
// we control. happy-dom does not lay out, so we stub the read-only scroll geometry.
function makeScrollPort(opts: { scrollHeight: number; clientHeight: number }): HTMLElement {
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
    Object.defineProperty(el, "scrollHeight", {
        get: () => opts.scrollHeight,
        configurable: true,
    });
    Object.defineProperty(el, "clientHeight", {
        get: () => opts.clientHeight,
        configurable: true,
    });
    return el;
}

// Drive the port to a scroll position and flush the reader's coalesced tick. The reader
// schedules via requestAnimationFrame; we flush it synchronously.
async function scrollTo(el: HTMLElement, pos: number): Promise<void> {
    el.scrollTop = pos;
    el.dispatchEvent(new Event("scroll"));
    await flushRaf();
}

// Flush a pending rAF frame (happy-dom rAF resolves on a macrotask).
function flushRaf(): Promise<void> {
    return new Promise((r) => requestAnimationFrame(() => r()));
}

afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
});

describe("useScrollTrigger", () => {
    it("fires onCross EXACTLY ONCE scrolling down past a px trigger, once back up", async () => {
        const port = makeScrollPort({ scrollHeight: 2000, clientHeight: 400 });
        const crossings: { id: string; dir: string; pos: number }[] = [];
        const triggers: TriggerPoint[] = [{ at: 200, id: "shrink", direction: "both" }];

        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, {
                triggers,
                onCross: (id, dir, pos) => crossings.push({ id, dir, pos }),
            }),
        );

        await flushRaf(); // mount attach

        // Scroll down past 200 — onCross(down) fires once.
        await scrollTo(port, 250);
        // Scroll further down (already past) — no re-fire.
        await scrollTo(port, 400);
        expect(crossings.filter((c) => c.id === "shrink" && c.dir === "down")).toHaveLength(1);

        // Scroll back up past 200 — onCross(up) fires once.
        await scrollTo(port, 100);
        expect(crossings.filter((c) => c.id === "shrink" && c.dir === "up")).toHaveLength(1);

        // The direction ref tracks the committed direction.
        expect(result.direction.value).toBe("up");

        unmount();
    });

    it("a sub-flipDelta jitter at a trigger fires NOTHING (the anti-thrash) + direction does not toggle", async () => {
        const port = makeScrollPort({ scrollHeight: 2000, clientHeight: 400 });
        const crossings: string[] = [];

        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, {
                flipDeltaPx: 8,
                triggers: [{ at: 300, id: "mid" }],
                onCross: (id) => crossings.push(id),
            }),
        );
        await flushRaf();

        // Seat just below the trigger, establish a down direction.
        await scrollTo(port, 290);
        await scrollTo(port, 296);
        const dirAfterDown = result.direction.value;

        // A 4px jitter back-and-forth across nothing (296 → 294 → 297) — below 8px:
        // no crossing of the 300 trigger, and the direction does not toggle on the
        // 2px reversal.
        await scrollTo(port, 294);
        await scrollTo(port, 297);

        // Never crossed 300, so no crossing fired.
        expect(crossings).toHaveLength(0);
        // The 2px reversal (296→294) is below the 8px flip-delta — direction stays put.
        expect(result.direction.value).toBe(dirAfterDown);

        unmount();
    });

    it("direction flips only past flipDeltaPx", async () => {
        const port = makeScrollPort({ scrollHeight: 2000, clientHeight: 400 });
        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, { flipDeltaPx: 8, trackProgress: false }),
        );
        await flushRaf();

        // Establish a clear down direction.
        await scrollTo(port, 50);
        await scrollTo(port, 100);
        expect(result.direction.value).toBe("down");

        // A 5px reversal (100 → 95) is below 8 — direction stays down.
        await scrollTo(port, 95);
        expect(result.direction.value).toBe("down");

        // A 20px reversal commits the flip to up.
        await scrollTo(port, 75);
        expect(result.direction.value).toBe("up");

        unmount();
    });

    it("velocity reads a per-second px/s magnitude (framerate-independent)", async () => {
        const port = makeScrollPort({ scrollHeight: 2000, clientHeight: 400 });
        let now = 1000;
        vi.spyOn(performance, "now").mockImplementation(() => now);

        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, { trackProgress: false }),
        );
        await flushRaf();

        // First tick seeds lastPos/lastTime.
        now = 1000;
        await scrollTo(port, 0);
        // Second tick: 100px over 100ms → 1000 px/s.
        now = 1100;
        await scrollTo(port, 100);
        expect(result.velocity.value).toBeCloseTo(1000, -1);

        unmount();
    });

    it("progress resolves 0..1 against the source extent (fallback engine)", async () => {
        // scrollHeight 1400, clientHeight 400 → extent 1000.
        const port = makeScrollPort({ scrollHeight: 1400, clientHeight: 400 });
        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, {}),
        );
        await flushRaf();

        await scrollTo(port, 0);
        expect(result.progress.value).toBeCloseTo(0, 2);
        await scrollTo(port, 500);
        expect(result.progress.value).toBeCloseTo(0.5, 2);
        await scrollTo(port, 1000);
        expect(result.progress.value).toBeCloseTo(1, 2);

        unmount();
    });

    it("PRM snaps progress to discrete endpoints WHILE onCross still fires (trigger survives PRM)", async () => {
        // matchMedia → reduced.
        (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia = (
            query: string,
        ) =>
            ({
                matches: /prefers-reduced-motion/.test(query),
                media: query,
                addEventListener: () => {},
                removeEventListener: () => {},
                addListener: () => {},
                removeListener: () => {},
                dispatchEvent: () => false,
                onchange: null,
            }) as unknown as MediaQueryList;

        const port = makeScrollPort({ scrollHeight: 1400, clientHeight: 400 });
        const crossings: string[] = [];
        const { result, unmount } = mountComposable(() =>
            useScrollTrigger(port, {
                triggers: [{ at: 200, id: "shrink" }],
                onCross: (id) => crossings.push(id),
            }),
        );
        await flushRaf();

        // Mid-extent scroll (0.45 raw) → under PRM the ramp SNAPS to a discrete endpoint
        // (0 or 1), never the 0.45 interpolation.
        await scrollTo(port, 450);
        expect([0, 1]).toContain(result.progress.value);

        // The crossing STILL fires (the trigger-point is a state signal — survives PRM).
        expect(crossings).toContain("shrink");

        unmount();
    });

    it("onEnter/onLeave fire as the source enters/leaves a region (de-dup by id, no storm)", async () => {
        const port = makeScrollPort({ scrollHeight: 2000, clientHeight: 400 });
        const events: string[] = [];
        const { unmount } = mountComposable(() =>
            useScrollTrigger(port, {
                triggers: [{ at: 200, id: "region" }],
                onEnter: (id) => events.push(`enter:${id}`),
                onLeave: (id) => events.push(`leave:${id}`),
            }),
        );
        await flushRaf();

        await scrollTo(port, 0); // below the region
        await scrollTo(port, 250); // entered
        await scrollTo(port, 100); // left
        await scrollTo(port, 300); // entered again

        // A back-and-forth fires enter→leave→enter, NOT a storm.
        expect(events).toEqual(["enter:region", "leave:region", "enter:region"]);

        unmount();
    });
});
