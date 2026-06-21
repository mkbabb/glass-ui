// BE.W-CELEBRATE-BURST — the headless math/seam half of useCelebrationBurst.
//
// The PAINTED truth (the petal frame-series with the warm-cream glass fill, the terminal
// petals-gone + cascade-settled, the PRM single-paint, BOTH modes) is the binding π
// `tests-visual/celebration-burst.spec.ts` (LOCAL-only, real-GPU, the webkit project).
// THIS is the deterministic seam half: the PRM snap-path (NO drifting petals spawned, the
// destination chip-bloom-in cascade fires its `--d`-staggered reveal, onSettled fires),
// the active burst (the overlay + N petals spawn, then are removed on settle), and the
// compositor-only write contract (the petal inline style writes transform/opacity/filter
// ONLY — never a layout property). The PRM path is fully synchronous so no rAF is needed;
// the active path drives a fake rAF clock.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useCelebrationBurst } from "../../../src/composables/motion/useCelebrationBurst";
import { mountComposable } from "../../utils/mountComposable";

function installMatchMedia(reduced: boolean): void {
    (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia = (
        query: string,
    ) =>
        ({
            matches: reduced && /prefers-reduced-motion/.test(query),
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
        }) as unknown as MediaQueryList;
}

// happy-dom does not lay out — stub getBoundingClientRect so the origin/parent measure runs.
function stubRect(el: HTMLElement, r: Partial<DOMRect>): void {
    el.getBoundingClientRect = () =>
        ({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            toJSON: () => ({}),
            ...r,
        }) as DOMRect;
}

afterEach(() => {
    vi.restoreAllMocks();
    document.querySelectorAll(".glass-celebration-overlay").forEach((n) => n.remove());
});

describe("useCelebrationBurst — the PRM snap-path confirms terminal-only", () => {
    beforeEach(() => installMatchMedia(true)); // reduced — the deterministic snap path

    it("spawns NO drifting petals + fires ONLY the destination cascade under PRM", () => {
        const originEl = document.createElement("div");
        const destEl = document.createElement("div");
        const child = document.createElement("span");
        child.setAttribute("data-reveal", "");
        destEl.appendChild(child);
        document.body.appendChild(originEl);
        document.body.appendChild(destEl);
        stubRect(originEl, { width: 40, height: 20 });

        const origin = ref<HTMLElement | null>(originEl);
        const destination = ref<HTMLElement | null>(destEl);
        let settled = false;
        const { result } = mountComposable(() =>
            useCelebrationBurst(origin, {
                destination,
                onSettled: () => (settled = true),
            }),
        );

        result.burst();

        // No petals spawned (the radial motion is OFF under reduce).
        expect(document.querySelectorAll(".glass-celebration-petal").length).toBe(0);
        // The destination cascade fired (the content still APPEARS — the `--d` is set).
        expect(child.style.getPropertyValue("--d")).toBe("0");
        // The earned moment confirms terminal-only.
        expect(settled).toBe(true);

        originEl.remove();
        destEl.remove();
    });
});

describe("useCelebrationBurst — the active burst spawns + removes petals", () => {
    let raf: ReturnType<typeof vi.fn>;
    let queued: FrameRequestCallback[];
    let now: number;

    beforeEach(() => {
        installMatchMedia(false); // no-preference — the active radial path
        queued = [];
        now = 0;
        raf = vi.fn((cb: FrameRequestCallback) => {
            queued.push(cb);
            return queued.length;
        });
        (globalThis as unknown as { requestAnimationFrame: unknown }).requestAnimationFrame = raf;
        (globalThis as unknown as { cancelAnimationFrame: unknown }).cancelAnimationFrame =
            () => {};
    });

    // Drain the fake rAF clock by `ms`, invoking each queued callback once with the
    // advancing timestamp (so the spring `eased(raw)` reaches 1 and the loop settles).
    function tick(ms: number): void {
        now += ms;
        const batch = queued;
        queued = [];
        for (const cb of batch) cb(now);
    }

    it("spawns the overlay + N petals at the first frame, writes ONLY compositor channels", () => {
        const originEl = document.createElement("div");
        document.body.appendChild(originEl);
        stubRect(originEl, { width: 40, height: 20, left: 10, top: 10 });

        const origin = ref<HTMLElement | null>(originEl);
        const { result } = mountComposable(() =>
            useCelebrationBurst(origin, { count: 8, radius: 50 }),
        );

        result.burst();
        // The overlay + 8 petals are in the DOM.
        expect(document.querySelectorAll(".glass-celebration-overlay").length).toBe(1);
        const petals = document.querySelectorAll<HTMLElement>(".glass-celebration-petal");
        expect(petals.length).toBe(8);

        // Drive one frame — each petal's inline style carries ONLY compositor channels.
        tick(16);
        const p = petals[0];
        expect(p.style.transform).toMatch(/translate\(/);
        expect(p.style.opacity).not.toBe("");
        expect(p.style.filter).toMatch(/blur\(/);
        // The compositor-only contract: the per-frame loop animates NO reflow-set layout
        // property — width/height/padding/margin/inset are never written inline (the petal
        // is statically seated at the origin via left/top:0 in setup, then driven ONLY by
        // the transform/opacity/filter compositor channels). The reflow-storm set:
        for (const prop of ["width", "height", "padding", "margin", "inset"]) {
            expect(p.style.getPropertyValue(prop)).toBe("");
        }

        originEl.remove();
    });

    it("removes the overlay (no stale DOM) + fires the settle cascade on settle", () => {
        const originEl = document.createElement("div");
        const destEl = document.createElement("div");
        const child = document.createElement("span");
        child.setAttribute("data-reveal", "");
        destEl.appendChild(child);
        document.body.appendChild(originEl);
        document.body.appendChild(destEl);
        stubRect(originEl, { width: 40, height: 20 });

        const origin = ref<HTMLElement | null>(originEl);
        const destination = ref<HTMLElement | null>(destEl);
        let settled = false;
        const { result } = mountComposable(() =>
            useCelebrationBurst(origin, {
                count: 6,
                destination,
                onSettled: () => (settled = true),
            }),
        );

        result.burst();
        expect(document.querySelectorAll(".glass-celebration-petal").length).toBe(6);

        // Prime startTs at the first frame, then drive past the bouncy settle horizon
        // (response 0.5 × 4 = 2000ms) so the spring `eased(raw)` reaches 1 and the loop
        // removes the overlay + fires the cascade.
        tick(16);
        tick(2500);

        // The overlay is removed (no stale DOM).
        expect(document.querySelectorAll(".glass-celebration-overlay").length).toBe(0);
        // The destination cascade fired + onSettled fired.
        expect(child.style.getPropertyValue("--d")).toBe("0");
        expect(settled).toBe(true);

        originEl.remove();
        destEl.remove();
    });

    it("is a no-op when the origin is unmounted", () => {
        const origin = ref<HTMLElement | null>(null);
        const { result } = mountComposable(() => useCelebrationBurst(origin));
        expect(() => result.burst()).not.toThrow();
        expect(document.querySelectorAll(".glass-celebration-overlay").length).toBe(0);
    });
});
