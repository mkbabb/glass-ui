import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useInterval, type UseIntervalControls } from "../useInterval";

interface ConsoleWarnSpy {
    mock: {
        calls: unknown[][];
    };
}

function hasActiveScopeWarning(warn: ConsoleWarnSpy): boolean {
    return warn.mock.calls.some((call) =>
        String(call[0]).includes(
            "onScopeDispose() is called when there is no active effect scope",
        ),
    );
}

describe("useInterval", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("supports manual cleanup outside Vue setup without no-active-scope warnings", () => {
        vi.useFakeTimers();
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const callback = vi.fn();

        const interval = useInterval(callback, 100);

        expect(interval.isActive.value).toBe(true);
        vi.advanceTimersByTime(250);
        expect(callback).toHaveBeenCalledTimes(2);

        interval.clear();
        expect(interval.isActive.value).toBe(false);
        vi.advanceTimersByTime(300);

        expect(callback).toHaveBeenCalledTimes(2);
        expect(hasActiveScopeWarning(warn)).toBe(false);
    });

    it("can be started and rescheduled explicitly", () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const interval = useInterval(callback, 100, { immediate: false });

        expect(interval.isActive.value).toBe(false);
        vi.advanceTimersByTime(100);
        expect(callback).not.toHaveBeenCalled();

        interval.start();
        vi.advanceTimersByTime(200);
        expect(callback).toHaveBeenCalledTimes(2);

        interval.restart(50);
        vi.advanceTimersByTime(149);
        expect(callback).toHaveBeenCalledTimes(4);

        vi.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(5);
    });

    it("cleans up running intervals when the owning effect scope stops", () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const scope = effectScope();
        let interval: UseIntervalControls | undefined;

        scope.run(() => {
            interval = useInterval(callback, 100);
        });

        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(1);

        scope.stop();
        expect(interval?.isActive.value).toBe(false);
        vi.advanceTimersByTime(300);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
