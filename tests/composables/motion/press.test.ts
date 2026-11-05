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

    // B7c C3-5: the cap read at rest. Z0's /sci phone profile put 248 ms of load on
    // `effectiveCap`'s `getComputedStyle` read, once per pressable control after its
    // template ref bound. At rest the stretch is 1 whatever the cap, so no read is owed.
    it("reads no computed style and tracks no element while at rest", async () => {
        const host = ref<HTMLElement | null>(null);
        const spy = vi.spyOn(window, "getComputedStyle");
        const mounted = mountComposable(() =>
            useLiquidPress({ el: host, response: 0.2, dampingFraction: 1 }),
        );

        const restStyle = mounted.result.pressStyle.value;
        expect(restStyle.scale).toBeUndefined();

        // The template ref binds after the first render: the press style must not
        // invalidate (no second render) and must not read the element's style.
        const el = document.createElement("button");
        document.body.appendChild(el);
        host.value = el;
        await nextTick();
        expect(mounted.result.pressStyle.value).toBe(restStyle);
        expect(spy).not.toHaveBeenCalledWith(el);

        // A press still couples the cap to the element's live weight.
        mounted.result.press();
        await settle(4);
        expect(mounted.result.pressStyle.value.scale).toBeDefined();
        expect(spy).toHaveBeenCalledWith(el);

        mounted.unmount();
        el.remove();
    });

    // B7c C3-5: the per-control `:root` tempo read. Every spring read `--motion-tempo`
    // off `:root` at construction, one forced style read per pressable control.
    it("reads the root tempo once for a batch of controls mounted in one task", async () => {
        const spy = vi.spyOn(window, "getComputedStyle");
        const mounted = Array.from({ length: 12 }, () =>
            mountComposable(() => useLiquidPress({ squish: false })),
        );
        const rootReads = spy.mock.calls.filter(
            ([el]) => el === document.documentElement,
        ).length;
        expect(rootReads).toBe(1);

        // A tempo set between tasks still reaches the next mount.
        await Promise.resolve();
        document.documentElement.style.setProperty("--motion-tempo", "0.5");
        const later = mountComposable(() => useLiquidPress({ squish: false }));
        expect(
            spy.mock.calls.filter(([el]) => el === document.documentElement).length,
        ).toBe(2);

        document.documentElement.style.removeProperty("--motion-tempo");
        later.unmount();
        for (const m of mounted) m.unmount();
    });
});
