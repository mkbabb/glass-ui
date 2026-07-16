// BE.W-BLOOM-UP — the headless math/seam half of useBloomUp.
//
// The PAINTED truth (the bloom frame-series, the field-hue warm across the SAME frames,
// the surface-carries-no-hue, the PRM single-paint) is the binding π
// `tests-visual/bloom-up.spec.ts` (LOCAL-only, real-GPU, both modes, the webkit
// project). THIS is the deterministic seam half: the PRM snap-path (surface seats at
// settled opacity 1 with ZERO transform/blur frames; the field hue lands instantly at
// the bounded target; onBloomed fires), the field-resolution contract (explicit ref >
// `data-glass-field` ancestor walk > parentElement), the bounded-strength clamp (the
// AMBIENT-TINT ≤8% ceiling), and the source-hue read (the explicit fieldHue > the
// `--glass-ambient-hue` off the source). Driven under PRM so no rAF is needed — the
// snap path is fully synchronous and exercises every seam.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useBloomUp } from "@glass/composables/motion/useBloomUp";
import { mountComposable } from "../../utils/mountComposable";

// Install / uninstall a matchMedia stub so the PRM snap-path is reachable deterministically.
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

// happy-dom does not lay out — stub getBoundingClientRect so the morph measure runs.
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

describe("useBloomUp — the PRM snap-path seats the surface + lands the field hue", () => {
    beforeEach(() => installMatchMedia(true)); // reduced — the deterministic snap path
    afterEach(() => vi.restoreAllMocks());

    it("snaps the destination surface to settled (opacity 1, no transform/filter) under PRM", () => {
        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const onBloomed = vi.fn();
        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), {
                fieldHue: "oklch(0.7 0.12 60)",
                field: ref(field),
                onBloomed,
            }),
        );

        result.bloom();

        // The surface SEATS — opacity 1, NO residual transform/filter (zero motion frames).
        expect(destEl.style.opacity).toBe("1");
        expect(destEl.style.transform).toBe("");
        expect(destEl.style.filter).toBe("");
        // The gesture completes (the hand-off fires even under reduce).
        expect(onBloomed).toHaveBeenCalledTimes(1);
        // blooming returns to rest.
        expect(result.blooming.value).toBe(false);
        unmount();
    });

    it("writes the 4th color channel on the FIELD (not the surface), at the bounded target", () => {
        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), {
                fieldHue: "oklch(0.7 0.12 60)",
                field: ref(field),
            }),
        );
        result.bloom();

        // The hue + the bounded strength land on the FIELD.
        expect(field.style.getPropertyValue("--glass-ambient-hue")).toBe(
            "oklch(0.7 0.12 60)",
        );
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("8.000%");
        // The blooming SURFACE carries NO injected hue (the compositor-only floor).
        expect(destEl.style.getPropertyValue("--glass-ambient-hue")).toBe("");
        expect(destEl.style.getPropertyValue("--glass-ambient-strength")).toBe("");
        unmount();
    });

    it("clamps the field strength into the ≤8% warm-cream-identity band", () => {
        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        stubRect(sourceEl, { x: 0, y: 0, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), {
                fieldHue: "oklch(0.7 0.12 60)",
                field: ref(field),
                fieldStrength: 99, // over the ceiling — must clamp to 8
            }),
        );
        result.bloom();
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("8.000%");
        unmount();
    });

    it("reads the source's --glass-ambient-hue when no explicit fieldHue is passed", () => {
        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        sourceEl.style.setProperty("--glass-ambient-hue", "oklch(0.6 0.1 30)");
        stubRect(sourceEl, { x: 0, y: 0, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), { field: ref(field) }),
        );
        result.bloom();
        expect(field.style.getPropertyValue("--glass-ambient-hue")).toBe(
            "oklch(0.6 0.1 30)",
        );
        unmount();
    });

    it("a transparent/absent source hue tints nothing (the neutral no-op)", () => {
        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 0, y: 0, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), {
                fieldHue: "transparent",
                field: ref(field),
            }),
        );
        result.bloom();
        // No hue → the field is not biased (the gray source warms nothing).
        expect(field.style.getPropertyValue("--glass-ambient-hue")).toBe("");
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("");
        unmount();
    });
});

describe("useBloomUp — shared morph clock", () => {
    beforeEach(() => installMatchMedia(false));
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("ramps and settles the field on useElementMorph's frame series", async () => {
        const frames: FrameRequestCallback[] = [];
        vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
            frames.push(callback);
            return frames.length;
        });
        vi.stubGlobal("cancelAnimationFrame", vi.fn());

        const field = document.createElement("div");
        const sourceEl = document.createElement("div");
        const destEl = document.createElement("div");
        field.appendChild(destEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });
        const onBloomed = vi.fn();

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), {
                field: ref(field),
                fieldHue: "oklch(0.7 0.12 60)",
                onBloomed,
            }),
        );

        result.bloom();
        expect(frames).toHaveLength(1);
        frames.shift()?.(100);
        frames.shift()?.(1060);
        const mid = Number.parseFloat(
            field.style.getPropertyValue("--glass-ambient-strength"),
        );
        expect(mid).toBeGreaterThan(0);
        expect(mid).toBeLessThanOrEqual(8);

        frames.shift()?.(3000);
        await Promise.resolve();
        await Promise.resolve();
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("8.000%");
        expect(result.blooming.value).toBe(false);
        expect(onBloomed).toHaveBeenCalledTimes(1);
        unmount();
    });
});

describe("useBloomUp — the field-resolution contract (explicit > data-glass-field > parent)", () => {
    beforeEach(() => installMatchMedia(true));
    afterEach(() => vi.restoreAllMocks());

    it("walks up to the nearest [data-glass-field] ancestor when no field ref is passed", () => {
        const grandparent = document.createElement("div");
        grandparent.setAttribute("data-glass-field", "");
        const parent = document.createElement("div");
        const destEl = document.createElement("div");
        const sourceEl = document.createElement("div");
        grandparent.appendChild(parent);
        parent.appendChild(destEl);
        document.body.appendChild(grandparent);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 0, y: 0, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), { fieldHue: "oklch(0.7 0.12 60)" }),
        );
        result.bloom();
        // The marked ancestor — NOT the immediate parent — carries the bias.
        expect(grandparent.style.getPropertyValue("--glass-ambient-hue")).toBe(
            "oklch(0.7 0.12 60)",
        );
        expect(parent.style.getPropertyValue("--glass-ambient-hue")).toBe("");
        unmount();
    });

    it("prime() seats the dest hidden (opacity 0) — the no-mount-flash floor", () => {
        const field = document.createElement("div");
        field.setAttribute("data-glass-field", "");
        const destEl = document.createElement("div");
        const sourceEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), { fieldHue: "oklch(0.7 0.12 60)" }),
        );
        result.prime();
        // The dest shows NOTHING — opacity 0 (the load-bearing no-flash leg). The geometry
        // is collapsed toward the source via the FLIP transform (a transform is written).
        expect(destEl.style.opacity).toBe("0");
        expect(destEl.style.transform).not.toBe("");
        unmount();
    });

    it("auto-primes the dest hidden the moment its ref resolves (no full-size flash)", async () => {
        const field = document.createElement("div");
        field.setAttribute("data-glass-field", "");
        const destEl = document.createElement("div");
        const sourceEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        // The dest ref starts NULL (the v-if-unmounted case), then resolves — the auto-prime
        // watch must seat it hidden BEFORE the consumer ever blooms.
        const destRef = ref<HTMLElement | null>(null);
        const { unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), destRef, { fieldHue: "oklch(0.7 0.12 60)" }),
        );
        destRef.value = destEl; // the v-if mounts the dest
        await nextTick();
        // Seated hidden — never a full-size opacity-1 flash.
        expect(destEl.style.opacity).toBe("0");
        unmount();
    });

    it("autoPrime:false leaves the dest untouched at mount (consumer owns initial state)", async () => {
        const field = document.createElement("div");
        field.setAttribute("data-glass-field", "");
        const destEl = document.createElement("div");
        const sourceEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        document.body.appendChild(sourceEl);
        stubRect(sourceEl, { x: 10, y: 10, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const destRef = ref<HTMLElement | null>(null);
        const { unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), destRef, {
                fieldHue: "oklch(0.7 0.12 60)",
                autoPrime: false,
            }),
        );
        destRef.value = destEl;
        await nextTick();
        // No auto-prime — the dest keeps its un-seated style (the consumer opts out).
        expect(destEl.style.opacity).toBe("");
        unmount();
    });

    it("reset() releases the field bias back to the no-op floor", () => {
        const field = document.createElement("div");
        field.setAttribute("data-glass-field", "");
        const destEl = document.createElement("div");
        const sourceEl = document.createElement("div");
        field.appendChild(destEl);
        document.body.appendChild(field);
        stubRect(sourceEl, { x: 0, y: 0, width: 40, height: 40 });
        stubRect(destEl, { x: 0, y: 0, width: 400, height: 300 });

        const { result, unmount } = mountComposable(() =>
            useBloomUp(ref(sourceEl), ref(destEl), { fieldHue: "oklch(0.7 0.12 60)" }),
        );
        result.bloom();
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("8.000%");
        result.reset();
        // The hue is cleared; the strength returns to 0% (the un-biased warm-cream floor).
        expect(field.style.getPropertyValue("--glass-ambient-hue")).toBe("");
        expect(field.style.getPropertyValue("--glass-ambient-strength")).toBe("0%");
        unmount();
    });
});
