// E9b — the useGlobalDark post-flip SETTLE hook (E1 §2g).
//
// The contract: `onFlipSettled(cb)` registers a callback that runs in ONE
// coalesced task AFTER each dark↔light flip's instant chrome paint, so a consumer
// batches its N expensive re-theme operations (the atlas's N-chart merge-setOption
// palette tween) into a single beat instead of N watcher storms on the critical
// frame. No View Transition anywhere in this path (PRM-safe). This proof asserts:
//   1. a flip schedules the settle ONCE (not per-watcher), carrying the new value;
//   2. N subscribers all drain in the SAME task (the batch);
//   3. a burst of flips coalesces to the LAST value's single drain;
//   4. unsubscribe stops future settles; no settle fires on construction.
//
// `createGlobalState` memoizes the singleton across the module — these tests share
// ONE instance, so each registers + unsubscribes its own callbacks and reads the
// live flag rather than asserting a pristine initial value.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useGlobalDark } from "../../../src/composables/dark/useGlobalDark";

describe("useGlobalDark — onFlipSettled post-flip batch (E9b / §2g)", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        document.documentElement.className = "";
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("a flip fires the settle ONCE in a post-flip task, with the new value", async () => {
        const { isDark, onFlipSettled } = useGlobalDark();
        const settle = vi.fn();
        const off = onFlipSettled(settle);

        const before = isDark.value;
        isDark.value = !before;

        // The class toggle is synchronous; the settle is NOT yet drained (it is
        // scheduled for the post-flip task — the "instant chrome, then batch"
        // ordering).
        expect(settle).not.toHaveBeenCalled();

        // Flush the post-flip task (the rAF shim is a setTimeout(0) in the suite).
        await vi.runAllTimersAsync();
        expect(settle).toHaveBeenCalledTimes(1);
        expect(settle).toHaveBeenCalledWith(!before);

        off();
    });

    it("N subscribers all drain in the SAME post-flip task (the batch, not N tasks)", async () => {
        const { isDark, onFlipSettled } = useGlobalDark();
        const order: string[] = [];
        const a = vi.fn(() => order.push("a"));
        const b = vi.fn(() => order.push("b"));
        const c = vi.fn(() => order.push("c"));
        const offs = [onFlipSettled(a), onFlipSettled(b), onFlipSettled(c)];

        isDark.value = !isDark.value;
        await vi.runAllTimersAsync();

        // All three drained, exactly once each, in one beat.
        expect(a).toHaveBeenCalledTimes(1);
        expect(b).toHaveBeenCalledTimes(1);
        expect(c).toHaveBeenCalledTimes(1);
        expect(order).toEqual(["a", "b", "c"]);

        offs.forEach((off) => off());
    });

    it("a burst of flips coalesces to the LAST value's single drain", async () => {
        const { isDark, onFlipSettled } = useGlobalDark();
        const settle = vi.fn();
        const off = onFlipSettled(settle);

        const start = isDark.value;
        // Flip, flip back, flip again — three synchronous class toggles before the
        // post-flip task drains.
        isDark.value = !start;
        isDark.value = start;
        isDark.value = !start;

        await vi.runAllTimersAsync();

        // ONE drain, carrying the FINAL value (the charts settle to where the flag
        // landed, not to each intermediate state).
        expect(settle).toHaveBeenCalledTimes(1);
        expect(settle).toHaveBeenCalledWith(!start);

        off();
    });

    it("unsubscribe stops future settles", async () => {
        const { isDark, onFlipSettled } = useGlobalDark();
        const settle = vi.fn();
        const off = onFlipSettled(settle);
        off();

        isDark.value = !isDark.value;
        await vi.runAllTimersAsync();
        expect(settle).not.toHaveBeenCalled();
    });

    it("does NOT use a View Transition anywhere in the flip path (PRM-safe by construction)", () => {
        // The settle path must never reach for `document.startViewTransition` — the
        // E9b root was a full-page VT that stalled on the N-canvas storm. A spy
        // proves the flip + settle never invoke it.
        const vtSpy = vi.fn();
        (document as unknown as { startViewTransition?: unknown }).startViewTransition = vtSpy;

        const { isDark, onFlipSettled } = useGlobalDark();
        const off = onFlipSettled(() => {});
        isDark.value = !isDark.value;
        vi.runAllTimers();

        expect(vtSpy).not.toHaveBeenCalled();
        off();
        delete (document as unknown as { startViewTransition?: unknown }).startViewTransition;
    });
});
