import { effectScope, nextTick, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSpring } from "../../src/composables/motion";

describe("useSpring", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("initialises at the configured initial value with zero velocity", () => {
        const target = ref(0);
        const spring = useSpring(target, { initial: 42 });

        // Before any rAF tick, value reflects the initial seed even though
        // the target watcher fired immediately at 0 (the engine integrates
        // toward target across frames, not synchronously).
        expect(spring.value.value).toBe(42);
        expect(spring.velocity.value).toBe(0);

        spring.dispose();
    });

    it("drives value toward target across rAF ticks", async () => {
        const target = ref(0);
        const spring = useSpring(target, {
            response: 0.3,
            dampingFraction: 1.0, // critically damped — monotonic, no overshoot
            settleThreshold: 1e-4,
            velocitySettleThreshold: 1e-4,
        });

        target.value = 100;
        await nextTick();

        // Run several rAF ticks — the engine should integrate value toward 100.
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }

        // Critically damped should arrive close to the target in <1s.
        expect(spring.value.value).toBeGreaterThan(99);
        expect(spring.value.value).toBeLessThanOrEqual(100);
        spring.dispose();
    });

    it("isSettled toggles correctly across the trajectory", async () => {
        const target = ref(0);
        const spring = useSpring(target, {
            response: 0.3,
            dampingFraction: 1.0,
            settleThreshold: 1e-3,
            velocitySettleThreshold: 1e-3,
        });

        // Start fully settled at initial.
        expect(spring.isSettled.value).toBe(true);

        // New target unsettles the spring on the next rAF tick.
        target.value = 50;
        await nextTick();
        await vi.advanceTimersByTimeAsync(16);
        expect(spring.isSettled.value).toBe(false);

        // Drive to completion — eventually settled.
        for (let i = 0; i < 120; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(spring.isSettled.value).toBe(true);
        expect(spring.value.value).toBeCloseTo(50, 1);

        spring.dispose();
    });

    it("tracks velocity through the trajectory", async () => {
        const target = ref(0);
        const spring = useSpring(target, {
            response: 0.4,
            dampingFraction: 0.7, // ringy — non-zero velocity at the peak
        });

        target.value = 100;
        await nextTick();

        // Sample velocity a few ticks in — should be non-zero while flying.
        await vi.advanceTimersByTimeAsync(16);
        await vi.advanceTimersByTimeAsync(16);
        expect(Math.abs(spring.velocity.value)).toBeGreaterThan(0);

        // After settling, velocity returns to 0.
        for (let i = 0; i < 240; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(spring.velocity.value).toBe(0);

        spring.dispose();
    });

    it("snap immediately jumps value to target", async () => {
        const target = ref(0);
        const spring = useSpring(target, {
            response: 0.5,
            dampingFraction: 0.6,
        });

        target.value = 75;
        await nextTick();
        await vi.advanceTimersByTimeAsync(16);

        // Mid-flight.
        expect(spring.value.value).not.toBe(75);

        spring.snap();
        expect(spring.value.value).toBe(75);
        expect(spring.velocity.value).toBe(0);

        spring.dispose();
    });

    it("reset returns to a chosen value", () => {
        const target = ref(0);
        const spring = useSpring(target, { initial: 50 });

        spring.reset(10);
        expect(spring.value.value).toBe(10);
        expect(spring.velocity.value).toBe(0);

        spring.dispose();
    });

    it("disposes spring on scope unmount", () => {
        const target = ref(0);
        let spring: ReturnType<typeof useSpring>;
        const scope = effectScope();
        scope.run(() => {
            spring = useSpring(target);
        });

        // Spy on rAF cancellation behaviour — after scope stops, no further
        // frame callbacks should mutate the value.
        scope.stop();
        const captured = spring!.value.value;
        target.value = 1000;
        // The watcher is detached; even after timers, nothing should move.
        vi.advanceTimersByTime(160);
        expect(spring!.value.value).toBe(captured);
    });

    it("honours prefers-reduced-motion by snapping to target", async () => {
        // Stub matchMedia to report reduced-motion preferred. happy-dom's
        // MediaQueryList constructor is private, so we satisfy the structural
        // contract directly (the engine reads `.matches` only).
        const mql: MediaQueryList = {
            matches: true,
            media: "(prefers-reduced-motion: reduce)",
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(() => true),
        };
        const matchMediaStub = vi.fn(() => mql);
        vi.stubGlobal("matchMedia", matchMediaStub);
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            writable: true,
            value: matchMediaStub,
        });

        const target = ref(0);
        const spring = useSpring(target, {
            response: 0.5,
            dampingFraction: 0.6,
            respectReducedMotion: true,
        });

        target.value = 250;
        await nextTick();

        // PRM fast-path: target re-seat in the engine snaps to target
        // immediately without any rAF integration.
        expect(spring.value.value).toBe(250);
        expect(spring.velocity.value).toBe(0);
        expect(spring.isSettled.value).toBe(true);

        spring.dispose();
    });

    it("ignores null/undefined targets", async () => {
        const target = ref<number | null>(null);
        const spring = useSpring(target, { initial: 5 });

        await nextTick();
        await vi.advanceTimersByTimeAsync(16);
        expect(spring.value.value).toBe(5);

        target.value = 20;
        await nextTick();
        for (let i = 0; i < 60; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(spring.value.value).toBeCloseTo(20, 0);

        spring.dispose();
    });

    it("accepts a getter for the target source", async () => {
        const a = ref(0);
        const b = ref(10);
        const spring = useSpring(() => a.value + b.value, {
            response: 0.3,
            dampingFraction: 1.0,
        });

        // Initial target derived from getter.
        a.value = 40;
        await nextTick();
        for (let i = 0; i < 120; i++) {
            await vi.advanceTimersByTimeAsync(16);
        }
        expect(spring.value.value).toBeCloseTo(50, 0);

        spring.dispose();
    });
});
