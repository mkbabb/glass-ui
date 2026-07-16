import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useLiquidPress } from "@glass/composables/motion";
import { mountComposable } from "../../utils/mountComposable";

describe("useLiquidPress", () => {
    beforeEach(() => vi.useFakeTimers());

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    async function settle(frames = 90): Promise<void> {
        for (let i = 0; i < frames; i++) await vi.advanceTimersByTimeAsync(16);
    }

    it("owns the pointer press and release lifecycle", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.2, dampingFraction: 1, squish: false }),
        );

        expect(mounted.result.armed.value).toBe(true);
        mounted.result.handlers.onPointerdown();
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);
        expect(mounted.result.pressStyle.value.scale).toBeDefined();

        mounted.result.handlers.onPointerup();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        expect(mounted.result.pressStyle.value.scale).toBeUndefined();
        mounted.unmount();
    });

    it("handles keyboard activation and releases on blur", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.2, dampingFraction: 1 }),
        );

        mounted.result.handlers.onKeydown(
            new KeyboardEvent("keydown", { key: "Enter" }),
        );
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);

        mounted.result.handlers.onBlur();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        mounted.unmount();
    });

    it("releases a held press when disabled", async () => {
        const disabled = ref(false);
        const mounted = mountComposable(() =>
            useLiquidPress({
                response: 0.2,
                dampingFraction: 1,
                disabled,
            }),
        );

        mounted.result.press();
        await settle();
        expect(mounted.result.value.value).toBeGreaterThan(0.95);

        disabled.value = true;
        await nextTick();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);

        mounted.result.press();
        await settle();
        expect(mounted.result.value.value).toBeLessThan(0.05);
        mounted.unmount();
    });

    it("re-seats an interrupted release without a value jump", async () => {
        const mounted = mountComposable(() =>
            useLiquidPress({ response: 0.3, dampingFraction: 0.7 }),
        );

        mounted.result.press();
        await vi.advanceTimersByTimeAsync(64);
        mounted.result.release();
        await vi.advanceTimersByTimeAsync(32);
        const beforeReseat = mounted.result.value.value;
        mounted.result.press();
        const afterReseat = mounted.result.value.value;

        expect(afterReseat).toBeCloseTo(beforeReseat, 6);
        await settle(180);
        expect(mounted.result.value.value).toBeGreaterThan(0.95);
        mounted.unmount();
    });
});
