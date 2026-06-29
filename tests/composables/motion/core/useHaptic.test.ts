import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useHaptic } from "@glass/composables/motion/core/useHaptic";

// useHaptic is a thin, feature-detected navigator.vibrate wrapper. These tests stub
// navigator.vibrate and assert: (1) supported reflects the feature-detect; (2) pulse()
// maps the named register to the bounded ms vocabulary; (3) it is a clean no-op when
// unsupported / opted-out / SSR (never a throw). There is NO π — the body-confirm is
// felt, not seen (the haptic axis is non-visual; BE.W-HAPTIC-COUPLE).

const ORIGINAL_VIBRATE = (
    navigator as unknown as { vibrate?: unknown }
).vibrate;

function stubVibrate(): ReturnType<typeof vi.fn> {
    const fn = vi.fn(() => true);
    (navigator as unknown as { vibrate: unknown }).vibrate = fn;
    return fn;
}

function removeVibrate(): void {
    delete (navigator as unknown as { vibrate?: unknown }).vibrate;
}

afterEach(() => {
    if (ORIGINAL_VIBRATE === undefined) removeVibrate();
    else (navigator as unknown as { vibrate: unknown }).vibrate = ORIGINAL_VIBRATE;
    vi.restoreAllMocks();
});

describe("useHaptic — feature-detect + the named-pattern register", () => {
    it("reports supported when navigator.vibrate is a function", () => {
        stubVibrate();
        const { supported } = useHaptic();
        expect(supported).toBe(true);
    });

    it("reports unsupported when navigator.vibrate is absent (the iOS-Safari floor)", () => {
        removeVibrate();
        const { supported } = useHaptic();
        expect(supported).toBe(false);
    });

    it("maps the named patterns to the bounded ms vocabulary", () => {
        const fn = stubVibrate();
        const { pulse } = useHaptic();

        pulse("snap");
        expect(fn).toHaveBeenLastCalledWith([12]);

        pulse("tap");
        expect(fn).toHaveBeenLastCalledWith([8]);

        pulse("detent");
        expect(fn).toHaveBeenLastCalledWith([6, 18, 6]);

        pulse("completion");
        expect(fn).toHaveBeenLastCalledWith([10, 40, 18]);

        pulse("error");
        expect(fn).toHaveBeenLastCalledWith([20, 30, 20]);
    });

    it("passes a raw number / number[] pattern through", () => {
        const fn = stubVibrate();
        const { pulse } = useHaptic();
        pulse(30);
        expect(fn).toHaveBeenLastCalledWith(30);
        pulse([10, 20, 10]);
        expect(fn).toHaveBeenLastCalledWith([10, 20, 10]);
    });

    it("every named pattern's total ms is bounded sub-100ms (the calm register)", () => {
        const fn = stubVibrate();
        const { pulse } = useHaptic();
        for (const pattern of ["tap", "snap", "detent", "completion", "error"] as const) {
            fn.mockClear();
            pulse(pattern);
            const arg = fn.mock.calls[0][0] as number[];
            const total = arg.reduce((a, b) => a + b, 0);
            expect(total).toBeLessThanOrEqual(100);
        }
    });
});

describe("useHaptic — the safe-everywhere no-op floor", () => {
    it("is a clean no-op (no throw) when unsupported", () => {
        removeVibrate();
        const { pulse } = useHaptic();
        expect(() => pulse("snap")).not.toThrow();
    });

    it("is a no-op when enabled is false (the consumer opt-out axis)", () => {
        const fn = stubVibrate();
        const { pulse } = useHaptic({ enabled: false });
        pulse("snap");
        expect(fn).not.toHaveBeenCalled();
    });

    it("honors a live reactive enabled flag per-call", () => {
        const fn = stubVibrate();
        const enabled = ref(false);
        const { pulse } = useHaptic({ enabled });
        pulse("snap");
        expect(fn).not.toHaveBeenCalled();
        enabled.value = true;
        pulse("snap");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("honors an enabled getter per-call", () => {
        const fn = stubVibrate();
        let on = false;
        const { pulse } = useHaptic({ enabled: () => on });
        pulse("snap");
        expect(fn).not.toHaveBeenCalled();
        on = true;
        pulse("snap");
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("does NOT throw when navigator.vibrate itself throws (the spec-violating engine)", () => {
        (navigator as unknown as { vibrate: unknown }).vibrate = () => {
            throw new Error("vibrate refused");
        };
        const { pulse } = useHaptic();
        expect(() => pulse("snap")).not.toThrow();
    });
});
