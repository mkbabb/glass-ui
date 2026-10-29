// B7c C3-4: the live backdrop observer runs no frame loop.
//
// B7B-ATLAS §3 found the dock's live sampler requesting an animation frame every
// frame for as long as a field canvas existed, throttled to a 4 Hz sample, while the
// field (painted once since B7) gave it nothing to follow. The observer now samples
// when the field announces a frame, the page scrolls, the theme changes, or a
// transition on the field ends; nothing runs between those events.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref, watch } from "vue";
import { useGlassBackdropLuminance } from "@glass/composables/glass/useGlassBackdropLuminance";
import { announceFieldPaint } from "@glass/composables/glass/fieldPaint";
import { mountComposable } from "../../utils/mountComposable";

describe("useGlassBackdropLuminance · live re-sampling", () => {
    let canvas: HTMLCanvasElement;
    let surface: HTMLElement;

    beforeEach(() => {
        vi.useFakeTimers();
        canvas = document.createElement("canvas");
        surface = document.createElement("div");
        document.body.append(canvas, surface);
    });

    afterEach(() => {
        canvas.remove();
        surface.remove();
        document.documentElement.classList.remove("dark");
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    async function mountObserver() {
        const target = ref<HTMLElement | null>(null);
        let samples = 0;
        const mounted = mountComposable(() => {
            const controls = useGlassBackdropLuminance(target, {
                backgroundCanvas: () => canvas,
            });
            watch(controls.sample, () => samples++, { flush: "sync" });
            return controls;
        });
        target.value = surface;
        await nextTick();
        await vi.advanceTimersByTimeAsync(0);
        return { mounted, count: () => samples };
    }

    it("requests no animation frame while the field is still", async () => {
        const raf = vi.spyOn(window, "requestAnimationFrame");
        const { mounted, count } = await mountObserver();
        const afterMount = count();
        expect(afterMount).toBeGreaterThanOrEqual(1);

        await vi.advanceTimersByTimeAsync(2000);

        expect(raf).not.toHaveBeenCalled();
        expect(count()).toBe(afterMount);
        mounted.unmount();
    });

    it("samples when the field paints, at most 4 times a second, and reads the last paint", async () => {
        const { mounted, count } = await mountObserver();
        const base = count();

        // One second of a field painting at 60 Hz.
        for (let i = 0; i < 60; i++) {
            announceFieldPaint(canvas);
            await vi.advanceTimersByTimeAsync(1000 / 60);
        }
        await vi.advanceTimersByTimeAsync(250);
        const painted = count() - base;
        expect(painted).toBeGreaterThanOrEqual(4);
        expect(painted).toBeLessThanOrEqual(5);

        // A paint on another canvas is not this surface's field.
        const other = document.createElement("canvas");
        document.body.append(other);
        const before = count();
        announceFieldPaint(other);
        await vi.advanceTimersByTimeAsync(500);
        expect(count()).toBe(before);
        other.remove();
        mounted.unmount();
    });

    it("samples after a scroll and after a theme change", async () => {
        const { mounted, count } = await mountObserver();
        await vi.advanceTimersByTimeAsync(500);

        let before = count();
        document.dispatchEvent(new Event("scroll"));
        await vi.advanceTimersByTimeAsync(300);
        expect(count()).toBe(before + 1);

        before = count();
        document.documentElement.classList.add("dark");
        await vi.advanceTimersByTimeAsync(300);
        expect(count()).toBe(before + 1);
        mounted.unmount();
    });

    it("stops listening once disposed", async () => {
        const { mounted, count } = await mountObserver();
        mounted.unmount();
        const before = count();
        announceFieldPaint(canvas);
        document.dispatchEvent(new Event("scroll"));
        await vi.advanceTimersByTimeAsync(500);
        expect(count()).toBe(before);
    });
});
