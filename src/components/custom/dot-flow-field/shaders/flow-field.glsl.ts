// BB.W-VIZ-SUITE (W-FLOWFIELD) — the WebGL2/Canvas2D FALLBACK (the ~5-10%-tail path).
//
// THE FALLBACK DECISION (recorded honestly — the §3a Triumvirate outcome). The WebGPU
// primary advects N particles in a COMPUTE pass + draws instanced billboard quads. The
// WebGL2 transform-feedback equivalent (a vertex-shader advection ping-ponged to a
// feedback buffer + an instanced-array draw) reproduces the field but is materially more
// code for the SAME visual; per the §scope-4 risk the SOTA-simpler, parity-honest path is
// a CPU-STEPPED Canvas2D point cloud — the fourier-field / constellation precedent
// (`useCanvas2D` over the SAME `createCanvasLifecycle` leaf). It steps the SAME
// `flowField.ts` `sampleVelocity()` evaluator the WGSL kernel transcribes (the ONE math
// source — no second advection law), so the fallback field is the SAME flow; only the
// per-particle GPU-instancing is traded for `ctx.arc` dots. The parity status is recorded
// `degraded` in the parity table (NOT a silent mismatch — the visual flow is equivalent;
// the per-particle size/density variance is coarser at the CPU step count).
//
// This module is NOT a `.glsl.ts` shader-string (the dir-layout slot name is kept for the
// colocation `isShader` marker + the README contract); it is the Canvas2D stepper the
// `setupGL` callback composes. It owns NO scheduling — the canvas lifecycle leaf delivers
// the frame.

import type { FlowFieldConfig } from "../constants";
import { MAX_PARTICLES } from "../constants";
import { sampleVelocity, type Vec2, type WaveComponent } from "../composables/flowField";

/** A CPU particle (the Canvas2D-stepped twin of the WGSL storage Particle). */
export interface CpuParticle {
    pos: Vec2;
    age: number;
    seed: number;
}

/** Deterministic 0..1 hash (the JS twin of the WGSL `hash21`, seed-driven re-spawn). */
function hash01(a: number, b: number): number {
    let x = Math.sin(a * 71.13 + b * 13.7) * 43758.5453;
    x = x - Math.floor(x);
    return x;
}

/**
 * The CPU particle field — alloc + seed + step + paint, over the Canvas2D substrate.
 * `step(dt, timeSec)` advects every particle through the SAME `sampleVelocity` evaluator
 * the WGSL compute kernel transcribes; `paint(ctx)` draws the soft dots. The fallback's
 * `degraded` parity is the CPU step count vs the GPU's per-particle instancing — the same
 * flow, a coarser density.
 */
export function createCpuFlowField(config: FlowFieldConfig) {
    const count = Math.min(Math.max(config.particleCount, 1), MAX_PARTICLES);
    const half = 0.85;
    const particles: CpuParticle[] = [];

    function reseed(seed: number, age: number): Vec2 {
        const r1 = hash01(seed, age);
        const r2 = hash01(seed + 4, age + 2);
        return { x: (r1 * 2 - 1) * half, y: (r2 * 2 - 1) * half };
    }

    for (let i = 0; i < count; i++) {
        const seed = (i + 1) * 0.6180339887;
        const p = reseed(seed, i * 0.137);
        particles.push({ pos: p, age: hash01(seed, 7) * 6, seed });
    }

    const waves: WaveComponent[] = config.waveComponents;

    function step(dt: number, timeSec: number): void {
        const windSpeed = config.windSpeed;
        const curl = config.curlStrength;
        for (const pr of particles) {
            const v = sampleVelocity(pr.pos, timeSec, waves, windSpeed, curl);
            pr.pos.x += v.x * dt;
            pr.pos.y += v.y * dt;
            pr.age += dt;
            if (
                Math.abs(pr.pos.x) > half ||
                Math.abs(pr.pos.y) > half ||
                pr.age > 6.0
            ) {
                pr.pos = reseed(pr.seed, pr.age);
                pr.age = 0;
            }
        }
    }

    /**
     * Paint the dots. `dotColor` is the resolved CSS color string (the demo's palette
     * resolved via the ColorResolver). The dots size by velocity (denser-where-calm),
     * mirroring the WGSL render pass. `wCss`/`hCss` are the CSS-px canvas extent.
     */
    function paint(
        ctx: CanvasRenderingContext2D,
        wCss: number,
        hCss: number,
        timeSec: number,
        dotColor: string,
    ): void {
        ctx.clearRect(0, 0, wCss, hCss);
        const cx = wCss / 2;
        const cy = hCss / 2;
        const scale = Math.min(wCss, hCss) / (2 * half);
        ctx.fillStyle = dotColor;
        const windSpeed = config.windSpeed;
        const curl = config.curlStrength;
        for (const pr of particles) {
            const v = sampleVelocity(pr.pos, timeSec, waves, windSpeed, curl);
            const speed = Math.hypot(v.x, v.y);
            const speedNorm = Math.min(speed / 2.0, 1);
            const r = config.dotSize * (1 - speedNorm * config.dotSizeVelocity);
            const a = 1 - speedNorm * 0.35;
            const px = cx + pr.pos.x * scale;
            const py = cy + pr.pos.y * scale;
            ctx.globalAlpha = Math.max(a, 0.1);
            ctx.beginPath();
            ctx.arc(px, py, Math.max(r, 0.4), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    return { particles, step, paint };
}
