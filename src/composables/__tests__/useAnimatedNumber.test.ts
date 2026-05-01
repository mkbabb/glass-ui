import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DAMPING, SNAP_THRESHOLD, useAnimatedNumber } from "../motion";

describe("useAnimatedNumber", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("keeps absolute mode compatible by default", () => {
        const target = ref(25);
        const animated = useAnimatedNumber(target, {
            damping: 1,
            snapThreshold: 0.01,
        });

        animated.snap();

        expect(animated.current.value).toBe(25);
        animated.dispose();
    });

    it("accepts progress targets as 0..100 and clamps outside values", async () => {
        vi.useFakeTimers();
        const target = ref(130);
        const onValue = vi.fn();
        const animated = useAnimatedNumber(target, {
            mode: "progress",
            damping: 1,
            snapThreshold: 0.01,
            initial: -10,
            onValue,
        });

        expect(animated.current.value).toBe(0);

        vi.runAllTimers();
        expect(animated.current.value).toBe(100);
        expect(onValue).toHaveBeenLastCalledWith(100);

        target.value = -20;
        await nextTick();
        vi.runAllTimers();

        expect(animated.current.value).toBe(0);
        expect(onValue).toHaveBeenLastCalledWith(0);

        target.value = 42;
        await nextTick();
        vi.runAllTimers();

        expect(animated.current.value).toBe(42);
        animated.reset(150);
        expect(animated.current.value).toBe(100);

        animated.dispose();
    });

    it("uses exported progress motion constants by default", async () => {
        vi.useFakeTimers();
        const target = ref(0.4);
        const animated = useAnimatedNumber(target, {
            mode: "progress",
        });

        expect(DAMPING.domProgress).toBe(0.18);
        expect(SNAP_THRESHOLD.domProgress).toBe(0.5);

        await nextTick();
        vi.runAllTimers();

        expect(animated.current.value).toBe(0.4);
        animated.dispose();
    });
});
