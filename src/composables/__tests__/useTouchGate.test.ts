import { afterEach, describe, expect, it, vi } from "vitest";
import { useTouchGate } from "../useTouchGate";

describe("useTouchGate", () => {
    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
        delete (window as Window & { ontouchstart?: unknown }).ontouchstart;
    });

    function enableTouchDevice(): void {
        Object.defineProperty(window, "ontouchstart", {
            configurable: true,
            value: null,
        });
    }

    it("passes desktop pointers through immediately", () => {
        const gate = useTouchGate();
        const el = document.createElement("div");

        expect(gate.isTouchDevice).toBe(false);
        expect(gate.handleTouchStart(el, 0)).toBe(true);
    });

    it("activates touch controls after a tap window", () => {
        vi.useFakeTimers();
        enableTouchDevice();
        const gate = useTouchGate();
        const el = document.createElement("div");

        expect(gate.handleTouchStart(el, 10)).toBe(false);
        expect(gate.isActive.value).toBe(false);

        vi.advanceTimersByTime(150);

        expect(gate.isActive.value).toBe(true);
        expect(el.style.touchAction).toBe("none");
    });

    it("cancels pending activation when a touch turns into scroll", () => {
        vi.useFakeTimers();
        enableTouchDevice();
        const gate = useTouchGate();
        const el = document.createElement("div");

        gate.handleTouchStart(el, 10);
        gate.handleScrollCheck({
            touches: [{ clientY: 40 }],
        } as unknown as TouchEvent);
        vi.advanceTimersByTime(150);

        expect(gate.isActive.value).toBe(false);
        expect(el.style.touchAction).toBe("");
    });

    it("returns the public interaction controls", () => {
        const gate = useTouchGate();

        expect(gate).toEqual(
            expect.objectContaining({
                isActive: expect.any(Object),
                isTouchDevice: expect.any(Boolean),
                handleTouchStart: expect.any(Function),
                handleScrollCheck: expect.any(Function),
                handleTouchEnd: expect.any(Function),
                resetTimer: expect.any(Function),
                deactivate: expect.any(Function),
                suppressDeactivate: expect.any(Function),
            }),
        );
    });
});
