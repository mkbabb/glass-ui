// AW.W8 — the interaction PRM-suppression suite.
//
// Every interactive axis (cursor-as-light, velocity-burst, scroll, the WebGPU wake)
// routes through the MASTER TEMPO SCALAR — the single suppression seam PRM + the
// DockBackgroundToggle pause converge on. This suite asserts the tempo-scalar
// contract on the CPU cursor model (the GPU axes' suppression is structural — the
// tempo gates the injection in the shader uniforms / the wake advect pass):
//
//   - tempo=0 (PRM) FREEZES the velocity + burst — advanceCursor with tempo=0 zeroes
//     them (the field collapses to stillness under reduce).
//   - tempo=1 retains them (the axis animates when not suppressed).
//   - injectCursorVelocity adds a transient burst (the flick → swirl-burst); the
//     burst is bounded [0,1].
//   - the velocity is delta-clamped (a teleport does not spike a giant burst).

import { describe, expect, it } from "vitest";
import {
    createCursorState,
    advanceCursor,
    injectCursorVelocity,
} from "../../../../src/components/custom/aurora/composables/cursorModel";

describe("AW.W8.1 — the master tempo scalar freezes the interactive field under PRM", () => {
    it("tempo=0 (reduced-motion) FREEZES the velocity + burst to stillness", () => {
        const c = createCursorState();
        injectCursorVelocity(c, 0.08, -0.05); // a flick
        expect(c.burst).toBeGreaterThan(0);
        expect(Math.hypot(c.velX, c.velY)).toBeGreaterThan(0);
        // One advance under tempo=0 zeroes both (the suppression seam). Use abs to
        // accept the signed-zero (-0) the multiply-by-zero produces.
        advanceCursor(c, 0);
        expect(c.burst).toBe(0);
        expect(Math.abs(c.velX)).toBe(0);
        expect(Math.abs(c.velY)).toBe(0);
    });

    it("tempo=1 RETAINS the velocity + burst (the axis animates when not suppressed)", () => {
        const c = createCursorState();
        injectCursorVelocity(c, 0.08, -0.05);
        const burst0 = c.burst;
        advanceCursor(c, 1);
        // The burst decays (×0.96) but is NOT zeroed — the flick eases out over ~1s.
        expect(c.burst).toBeGreaterThan(0);
        expect(c.burst).toBeLessThan(burst0);
    });

    it("the burst decays toward zero over ~1s at tempo=1 (the flick eases out)", () => {
        const c = createCursorState();
        injectCursorVelocity(c, 0.1, 0); // a strong flick
        for (let i = 0; i < 60; i++) advanceCursor(c, 1); // ~1s at 60fps
        expect(c.burst).toBeLessThan(0.15); // ≈0.96^60 ≈ 0.09 of the initial
    });

    it("injectCursorVelocity clamps the per-move delta (a teleport does not spike a giant burst)", () => {
        const c = createCursorState();
        injectCursorVelocity(c, 5.0, 5.0); // a teleport (off-screen → on)
        // velocity is delta-clamped to ±0.12, so the burst stays bounded.
        expect(c.burst).toBeLessThanOrEqual(1);
        expect(Math.abs(c.velX)).toBeLessThanOrEqual(0.12 * 0.31); // eased fraction of the clamp
    });

    it("a partial tempo (0<tempo<1) scales the retained fraction (the integration step, not the clock)", () => {
        const c1 = createCursorState();
        const c2 = createCursorState();
        injectCursorVelocity(c1, 0.08, 0);
        injectCursorVelocity(c2, 0.08, 0);
        advanceCursor(c1, 1.0);
        advanceCursor(c2, 0.5);
        // The half-tempo cursor retains LESS burst (tempo multiplies the retained fraction).
        expect(c2.burst).toBeLessThan(c1.burst);
    });
});
