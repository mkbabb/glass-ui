import { afterEach, describe, expect, it, vi } from "vitest";
import { useStagger } from "../useStagger";
import { mountComposable } from "../../../tests/utils/mountComposable";

describe("useStagger", () => {
    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllTimers();
    });

    it("flips revealed[i] true on the staggered timeline", () => {
        vi.useFakeTimers();

        const { result, unmount } = mountComposable(() =>
            useStagger({
                items: 3,
                delayMs: 100,
                initialDelayMs: 50,
                immediate: true,
            }),
        );

        expect(result.revealed.value).toEqual([false, false, false]);

        vi.advanceTimersByTime(50);
        expect(result.revealed.value[0]).toBe(true);
        expect(result.revealed.value[1]).toBe(false);

        vi.advanceTimersByTime(100);
        expect(result.revealed.value[1]).toBe(true);
        expect(result.revealed.value[2]).toBe(false);

        vi.advanceTimersByTime(100);
        expect(result.revealed.value[2]).toBe(true);
        expect(result.isComplete.value).toBe(true);

        unmount();
    });

    it("does not auto-start when immediate=false", () => {
        vi.useFakeTimers();

        const { result, unmount } = mountComposable(() =>
            useStagger({
                items: 2,
                delayMs: 80,
                immediate: false,
            }),
        );

        vi.advanceTimersByTime(500);
        expect(result.revealed.value).toEqual([false, false]);

        result.start();
        vi.advanceTimersByTime(500);
        expect(result.revealed.value).toEqual([true, true]);

        unmount();
    });

    it("reset() clears pending timers and rolls revealed back to all-false", () => {
        vi.useFakeTimers();

        const { result, unmount } = mountComposable(() =>
            useStagger({
                items: 4,
                delayMs: 80,
                immediate: true,
            }),
        );

        vi.advanceTimersByTime(80);
        expect(result.revealed.value[0]).toBe(true);

        result.reset();
        expect(result.revealed.value).toEqual([false, false, false, false]);
        expect(result.isComplete.value).toBe(false);

        vi.advanceTimersByTime(1000);
        // Pending timers cleared — nothing else flips after reset.
        expect(result.revealed.value).toEqual([false, false, false, false]);

        unmount();
    });

    it("clears all timers on scope dispose", () => {
        vi.useFakeTimers();
        const clearSpy = vi.spyOn(globalThis, "clearTimeout");

        const { unmount } = mountComposable(() =>
            useStagger({ items: 5, delayMs: 80, immediate: true }),
        );

        unmount();

        expect(clearSpy).toHaveBeenCalled();
        clearSpy.mockRestore();
    });

    it("treats an items=0 cascade as already complete", () => {
        vi.useFakeTimers();

        const { result, unmount } = mountComposable(() =>
            useStagger({ items: 0, delayMs: 80, immediate: true }),
        );

        expect(result.revealed.value).toEqual([]);
        expect(result.isComplete.value).toBe(true);

        unmount();
    });
});
