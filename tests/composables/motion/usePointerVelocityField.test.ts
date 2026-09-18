import { afterEach, describe, expect, it, vi } from "vitest";
import { usePointerVelocityField } from "@glass/composables/motion/pointer/usePointerVelocityField";
import { mountComposable } from "../../utils/mountComposable";

// usePointerVelocityField is a PUSH-API physics model: the renderer feeds it
// `tick(delta)` from its OWN frame loop (no own rAF here). These tests drive the
// derivation chain (position → velocity → acceleration) with synthetic ticks, and
// assert the PRM tick(0) freeze. The painted truth (a viz reading the field) rides
// the π once the born-WebGPU viz land; this is the headless math half.

// Install / uninstall a matchMedia stub so the PRM-reduced path is reachable.
function installMatchMedia(reduced: boolean): void {
    (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia = (
        query: string,
    ) =>
        ({
            matches: reduced && /prefers-reduced-motion/.test(query),
            media: query,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
            onchange: null,
        }) as unknown as MediaQueryList;
}

// A matchMedia stub that RETAINS its change listener, so the OS preference can be
// flipped MID-SESSION — the shared `useReducedMotion` ref is driven by that event, and
// the stub above (a fresh no-op listener each call) can only seat a preference, never
// turn one on.
function installLiveMatchMedia(): (reduced: boolean) => void {
    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    const mql = {
        matches: false,
        media: "(prefers-reduced-motion: reduce)",
        addEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => {
            listeners.add(fn);
        },
        removeEventListener: (_: string, fn: (event: MediaQueryListEvent) => void) => {
            listeners.delete(fn);
        },
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
    } as unknown as MediaQueryList;
    (window as unknown as { matchMedia: (q: string) => MediaQueryList }).matchMedia =
        () => mql;
    return (reduced: boolean) => {
        (mql as unknown as { matches: boolean }).matches = reduced;
        for (const fn of listeners)
            fn({ matches: reduced, currentTarget: mql } as unknown as MediaQueryListEvent);
    };
}

describe("usePointerVelocityField", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("starts at rest (centred, zero velocity/accel/burst)", () => {
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        expect(result.position.value).toEqual({ x: 0.5, y: 0.5 });
        expect(result.velocity.value).toEqual({ x: 0, y: 0 });
        expect(result.acceleration.value).toEqual({ x: 0, y: 0 });
        expect(result.speed.value).toBe(0);
        expect(result.burst.value).toBe(0);
        unmount();
    });

    it("derives a non-zero velocity from a moving pointer across ticks (the push-API)", () => {
        installMatchMedia(false);
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        // Sweep the pointer rightward across several frames; each frame the renderer
        // feeds tick(delta). The smoothed position chases the target → a positive vx.
        let x = 0.2;
        for (let i = 0; i < 20; i++) {
            x = Math.min(0.9, x + 0.03);
            result.setPointer(x, 0.5);
            result.tick(16); // ~60fps frame
        }
        expect(result.velocity.value.x).toBeGreaterThan(0);
        expect(result.velocity.value.y).toBeCloseTo(0, 2);
        expect(result.speed.value).toBeGreaterThan(0);
        unmount();
    });

    it("derives an acceleration impulse when the pointer starts moving (the accel term)", () => {
        installMatchMedia(false);
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        // Hold still, then accelerate — the velocity ramps up, so acceleration > 0 on
        // the onset (the second derivative the curl/flow viz read for a "push").
        result.setPointer(0.5, 0.5);
        result.tick(16);
        result.tick(16);
        // Now move sharply.
        result.setPointer(0.7, 0.5);
        result.tick(16);
        result.setPointer(0.9, 0.5);
        result.tick(16);
        expect(Math.abs(result.acceleration.value.x)).toBeGreaterThan(0);
        unmount();
    });

    it("freezes to rest under tick(0) — the deterministic no-live-velocity step", () => {
        installMatchMedia(false);
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        // Build up some velocity.
        let x = 0.2;
        for (let i = 0; i < 10; i++) {
            x += 0.05;
            result.setPointer(x, 0.5);
            result.tick(16);
        }
        expect(result.speed.value).toBeGreaterThan(0);
        // A zero-delta tick is the freeze — velocity/accel/burst snap to rest.
        result.tick(0);
        expect(result.velocity.value).toEqual({ x: 0, y: 0 });
        expect(result.acceleration.value).toEqual({ x: 0, y: 0 });
        expect(result.burst.value).toBe(0);
        unmount();
    });

    it("freezes under prefers-reduced-motion (the PRM tick(0) discipline)", () => {
        installMatchMedia(true);
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        // Under PRM the position write is skipped and tick freezes — no live velocity.
        result.setPointer(0.9, 0.1);
        result.tick(16);
        result.tick(16);
        expect(result.velocity.value).toEqual({ x: 0, y: 0 });
        expect(result.acceleration.value).toEqual({ x: 0, y: 0 });
        expect(result.speed.value).toBe(0);
        // The raw position stays at its default (the PRM-gated write was skipped).
        expect(result.position.value).toEqual({ x: 0.5, y: 0.5 });
        unmount();
    });

    it("is frame-rate independent — same physical velocity at 60Hz and 120Hz", () => {
        installMatchMedia(false);
        const run = (deltaMs: number) => {
            const { result, unmount } = mountComposable(() =>
                usePointerVelocityField(),
            );
            // Advance the SAME wall-clock duration (~320ms) at the given frame rate,
            // moving the pointer at the same per-ms speed.
            const totalMs = 320;
            const speedPerMs = 0.001; // normalized units / ms
            let elapsed = 0;
            let x = 0.2;
            while (elapsed < totalMs) {
                x = Math.min(0.95, x + speedPerMs * deltaMs);
                result.setPointer(x, 0.5);
                result.tick(deltaMs);
                elapsed += deltaMs;
            }
            const v = result.velocity.value.x;
            unmount();
            return v;
        };
        const v60 = run(16); // ~60fps
        const v120 = run(8); // ~120fps
        // The per-second derivative should be close across frame rates (within a
        // loose band — the smoothing differs slightly but the physical velocity does
        // not double).
        expect(v60).toBeGreaterThan(0);
        expect(v120).toBeGreaterThan(0);
        const ratio = v120 / v60;
        expect(ratio).toBeGreaterThan(0.5);
        expect(ratio).toBeLessThan(2.0);
    });

    it("active flips on enter/leave", () => {
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        expect(result.active.value).toBe(false);
        result.onPointerEnter();
        expect(result.active.value).toBe(true);
        result.onPointerLeave();
        expect(result.active.value).toBe(false);
        unmount();
    });

    it("clamps the pointer target into 0..1", () => {
        installMatchMedia(false);
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        result.setPointer(1.5, -0.3);
        expect(result.position.value).toEqual({ x: 1, y: 0 });
        unmount();
    });

    // O-26-INT-1 — `reset()` HOLDS a raised engagement envelope by design (a freeze is
    // not a re-center), and `tick()` early-returns under PRM before the envelope is
    // advanced. So a mid-session PRM turn-on with the cursor engaged froze the envelope
    // NON-ZERO and the cursor glow stayed on screen instead of decaying to rest. The one
    // static PRM frame must be the rest frame.
    it("zeroes the engagement envelope when PRM turns on mid-session", () => {
        const setReduced = installLiveMatchMedia();
        const { result, unmount } = mountComposable(() => usePointerVelocityField());
        result.setActive(true);
        result.setPointer(0.7, 0.3);
        for (let i = 0; i < 30; i++) result.tick(16);
        expect(result.engagement.value).toBeGreaterThan(0.5);

        setReduced(true);
        expect(result.engagement.value).toBe(0);
        // And the frozen frame stays at rest — the PRM tick cannot raise it again.
        result.tick(16);
        expect(result.engagement.value).toBe(0);
        unmount();
    });
});
