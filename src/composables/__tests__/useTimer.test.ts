import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useTimer, type UseTimerControls } from "../reactive/useTimer";

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

describe("useTimer", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("supports manual cleanup outside Vue setup without no-active-scope warnings", () => {
        vi.useFakeTimers();
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const callback = vi.fn();

        const timer = useTimer(callback, 100);

        expect(timer.isActive.value).toBe(true);
        timer.stop();
        expect(timer.isActive.value).toBe(false);

        vi.advanceTimersByTime(100);

        expect(callback).not.toHaveBeenCalled();
        expect(hasActiveScopeWarning(warn)).toBe(false);
    });

    it("fires once and marks itself inactive after the timeout", () => {
        vi.useFakeTimers();
        const callback = vi.fn();

        const timer = useTimer(callback, 100);

        vi.advanceTimersByTime(99);
        expect(callback).not.toHaveBeenCalled();
        expect(timer.isActive.value).toBe(true);

        vi.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(timer.isActive.value).toBe(false);

        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it("can be started and rescheduled explicitly", () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const timer = useTimer(callback, 100, { immediate: false });

        expect(timer.isActive.value).toBe(false);
        vi.advanceTimersByTime(100);
        expect(callback).not.toHaveBeenCalled();

        timer.start();
        vi.advanceTimersByTime(100);
        expect(callback).toHaveBeenCalledTimes(1);

        timer.start(50);
        vi.advanceTimersByTime(25);
        timer.restart(75);
        vi.advanceTimersByTime(74);
        expect(callback).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it("cleans up pending timeouts when the owning effect scope stops", () => {
        vi.useFakeTimers();
        const callback = vi.fn();
        const scope = effectScope();
        let timer: UseTimerControls | undefined;

        scope.run(() => {
            timer = useTimer(callback, 100);
        });

        expect(timer?.isActive.value).toBe(true);
        scope.stop();
        expect(timer?.isActive.value).toBe(false);

        vi.advanceTimersByTime(100);
        expect(callback).not.toHaveBeenCalled();
    });
});
