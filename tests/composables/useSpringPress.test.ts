import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpringPress } from "@glass/composables/motion";

describe("useSpringPress", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("initialises released at value 0", () => {
        const press = useSpringPress();
        expect(press.value.value).toBe(0);
        expect(press.velocity.value).toBe(0);
        press.dispose();
    });

    it("press transitions value toward 1", async () => {
        const press = useSpringPress({
            response: 0.2,
            dampingFraction: 1.0,
        });

        press.press();
        // Drive enough frames to overshoot the perception threshold.
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeGreaterThan(0.95);
        expect(press.value.value).toBeLessThanOrEqual(1);

        press.dispose();
    });

    it("release transitions value back toward 0", async () => {
        const press = useSpringPress({
            response: 0.2,
            dampingFraction: 1.0,
        });

        press.press();
        for (let i = 0; i < 80; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeCloseTo(1, 1);

        press.release();
        for (let i = 0; i < 80; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeLessThan(0.05);

        press.dispose();
    });

    it("hold-and-release sequence is continuous through the target swap", async () => {
        const press = useSpringPress({
            response: 0.3,
            dampingFraction: 0.7, // underdamped so mid-flight has non-zero velocity
        });

        press.press();
        await vi.advanceTimersByTimeAsync(16);
        await vi.advanceTimersByTimeAsync(16);
        const midPressValue = press.value.value;
        const midPressVelocity = press.velocity.value;

        // Mid-flight release re-seats the closed-form solution from the
        // current (value, velocity) — no jump.
        press.release();
        await vi.advanceTimersByTimeAsync(16);

        // Velocity should still be non-zero and value should be moving
        // continuously from the pressed peak back toward 0.
        expect(press.value.value).toBeLessThan(midPressValue + 0.1);
        expect(midPressVelocity).not.toBe(0);

        // Eventually settles back at rest.
        for (let i = 0; i < 240; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeLessThan(0.01);
        expect(press.velocity.value).toBe(0);

        press.dispose();
    });

    it("handlers fire press/release on pointer events", async () => {
        const press = useSpringPress({
            response: 0.2,
            dampingFraction: 1.0,
        });

        press.handlers.onPointerdown();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeGreaterThan(0.9);

        press.handlers.onPointerup();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeLessThan(0.1);

        // pointercancel and pointerleave also release.
        press.handlers.onPointerdown();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeGreaterThan(0.9);

        press.handlers.onPointercancel();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeLessThan(0.1);

        press.handlers.onPointerdown();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        press.handlers.onPointerleave();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(press.value.value).toBeLessThan(0.1);

        press.dispose();
    });

    it("repeated press is idempotent (no double-fire)", async () => {
        const press = useSpringPress({
            response: 0.2,
            dampingFraction: 1.0,
        });

        press.press();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        const settled = press.value.value;

        press.press(); // re-fire while at target — should be a no-op.
        await vi.advanceTimersByTimeAsync(16);
        expect(press.value.value).toBe(settled);

        press.dispose();
    });
});
