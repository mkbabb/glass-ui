import { afterEach, describe, expect, it, vi } from "vitest";
import { usePointerVelocityField } from "../../../src/composables/motion/usePointerVelocityField";
import { mountComposable } from "../../utils/mountComposable";

// usePointerVelocityField is a PUSH-API physics model: the renderer feeds it
// `tick(delta)` from its OWN frame loop (no own rAF here). These tests drive the
// derivation chain (position → velocity → acceleration) with synthetic ticks, and
// assert the PRM tick(0) freeze. The painted truth (a viz reading the field) rides
// the W-REFLECT3 π once the born-WebGPU viz land; this is the headless math half.

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
});
