import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DAMPING, SNAP_THRESHOLD, useAnimatedNumber } from "../../src/composables/motion";

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

    // Regression test for the phase-boundary "rewind" bug (audit U.W0.A5 §1).
    // When a progress consumer drops the target from 100 → 0 (e.g. across a
    // speedtest engine phase boundary), the displayed value must never sit
    // outside [0, 100]. Pre-fix, the SmoothProgress carried a stale 100 in
    // its internal currentValue and damped backward through the rail; the
    // post-fix internal scaling keeps the smoother in [0, 1] so the clamp
    // contract holds across the transition.
    it("clamps progress mode to [0, 100] across phase boundaries", async () => {
        vi.useFakeTimers();
        const target = ref(0);
        const onValue = vi.fn<(value: number) => void>();
        const animated = useAnimatedNumber(target, {
            mode: "progress",
            damping: 0.18,
            snapThreshold: 0.5,
            onValue,
        });

        target.value = 100;
        await nextTick();
        vi.runAllTimers();
        expect(animated.current.value).toBe(100);

        // Phase boundary: target drops to 0; displayed value must damp
        // forward toward 0 without ever exceeding 100.
        target.value = 0;
        await nextTick();
        // Step a few frames; on each call the value must stay in [0, 100].
        for (let i = 0; i < 8; i++) {
            vi.advanceTimersByTime(16);
        }
        for (const call of onValue.mock.calls) {
            const v = call[0];
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThanOrEqual(100);
        }
        vi.runAllTimers();
        expect(animated.current.value).toBe(0);

        animated.dispose();
    });
});
