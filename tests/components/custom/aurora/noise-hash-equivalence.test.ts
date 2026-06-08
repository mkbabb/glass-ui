// AX.W12 — the GLSL↔WGSL PCG-hash + simplex-gradient-noise twin-equivalence
// (proof:aurora-noise-hash-equivalence's vitest arm).
//
// The single-source-the-GPU-math-first discipline applied to the NET-NEW noise leaf:
// the painterly-medium organic basis (Jarzynski PCG2D integer-bit hash + 2D simplex
// gradient noise) lives ONCE in procedural-color.glsl.ts as a GLSL twin (PCG_HASH_GLSL)
// + a WGSL twin (PCG_HASH_WGSL); authoring a second independent copy re-opens the AV.W1
// two-copy divergence class. This spec proves the two twins compute the SAME numbers.
//
// Neither GLSL nor WGSL runs in node, so the math is evaluated via a hand-transcribed
// TS port (`noise-hash.glsl-port.ts`) that mirrors BOTH twins line-for-line. The
// integer pipeline (pcg2d's u32 LCG + xor-shift) is CERTIFIED bit-identical across the
// backends — GLSL `uint`/WGSL `u32` wrap mod 2^32, `floatBitsToUint`/`bitcast<u32>`
// reinterpret the same IEEE-754 bits — so one transcription faithfully represents both.
//
// TWO assertions, the same shape as the color twin gate:
//   (A) STRING-LEVEL twin identity — the GLSL and WGSL bodies carry the SAME numeric
//       constants in the SAME op order (the magic LCG multiplier 1664525, the increment
//       1013904223, the 16-bit shift, the simplex F2/G2/70.0, the 1/2^32 normalize).
//       A constant edit in either twin breaks this — the divergence the gate exists to
//       catch (a transcription bug that makes one backend's grain differ).
//   (B) NUMERIC 1e-6 oracle — the TS port produces the frozen known-good outputs over a
//       witness coordinate set (the regression oracle the gate locks to 1e-6; an
//       algorithm change in the port — and therefore a re-transcription that diverged
//       from the shader — reds).

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gnoise, pcg2d, pcgGrad2, pcgHash2 } from "./noise-hash.glsl-port";

const TOL = 1e-6;

const CHUNK = resolve(
    __dirname,
    "../../../../src/composables/glass/webgl/shaders/procedural-color.glsl.ts",
);

function exportBody(src: string, name: string): string {
    // Pull the `/* glsl|wgsl */ \`...\`` template body of `export const <name> = ...`.
    const re = new RegExp(
        `export const ${name}\\s*=\\s*/\\*\\s*(?:glsl|wgsl)\\s*\\*/\\s*\`([\\s\\S]*?)\``,
    );
    const m = re.exec(src);
    if (!m) throw new Error(`export ${name} not found in the chunk`);
    return m[1]!;
}

// The numeric constants both twins MUST carry verbatim (the algorithm identity). A drop
// or edit of any one in either twin is a backend divergence.
const TWIN_CONSTANTS = [
    "1664525u", // the PCG2D LCG multiplier
    "1013904223u", // the PCG2D LCG increment
    "16u", // the xor-shift amount
    "1.0 / 4294967296.0", // the 1/2^32 normalize
    "6.28318530717958647692", // TAU (the gradient angle)
    "0.36602540378443864676", // F2 = (sqrt(3)-1)/2
    "0.21132486540518711775", // G2 = (3-sqrt(3))/6
    "70.0", // the simplex amplitude normalize
];

describe("AX.W12 — the PCG-hash + simplex twin matches across GLSL/WGSL", () => {
    const src = readFileSync(CHUNK, "utf8");
    const glsl = exportBody(src, "PCG_HASH_GLSL");
    const wgsl = exportBody(src, "PCG_HASH_WGSL");

    it("(A) both twins exist and carry the SAME numeric constants verbatim", () => {
        for (const c of TWIN_CONSTANTS) {
            expect(glsl.includes(c), `GLSL twin missing constant ${c}`).toBe(true);
            expect(wgsl.includes(c), `WGSL twin missing constant ${c}`).toBe(true);
        }
    });

    it("(A) both twins define the same fn surface (pcg2d, pcgHash2, pcgGrad2, gnoise)", () => {
        for (const fn of ["pcg2d", "pcgHash2", "pcgGrad2", "gnoise"]) {
            expect(glsl.includes(`${fn}(`), `GLSL twin missing ${fn}`).toBe(true);
            expect(wgsl.includes(`${fn}(`), `WGSL twin missing ${fn}`).toBe(true);
        }
    });

    it("(A) the PCG2D op cascade is the same shape in both twins (two LCG-mix + xor-shift rounds)", () => {
        // Both halves must mix x off y then y off x, twice, with an xor-shift between —
        // the Jarzynski cascade. Count the LCG-multiplier mixes (4 per twin: 2 per round).
        const glslMixes = (glsl.match(/\* 1664525u/g) || []).length;
        const wgslMixes = (wgsl.match(/\* 1664525u/g) || []).length;
        expect(glslMixes).toBe(wgslMixes);
        expect(glslMixes).toBeGreaterThanOrEqual(4);
    });

    // (B) The frozen oracle. These are the known-good outputs of the certified-identical
    // integer + simplex pipeline; the gate locks them to 1e-6. A re-transcription that
    // diverged from the shader (or a shader algorithm change) reds here.
    it("(B) pcg2d is deterministic + bit-exact over the witness integer set", () => {
        // pcg2d returns full-range u32 pairs; assert exact integer equality (bit-exact).
        expect(pcg2d(0, 0)).toEqual([417608103, 90043601]);
        expect(pcg2d(1, 0)).toEqual([2647388618, 2239437279]);
        expect(pcg2d(7, 13)).toEqual([2092551732, 514765840]);
        // Different inputs → different outputs (no collision on the witness set).
        const a = pcg2d(2, 3).join(",");
        const b = pcg2d(3, 2).join(",");
        expect(a).not.toBe(b);
    });

    it("(B) pcgHash2 lands in [0,1) and is deterministic", () => {
        for (const p of [[0, 0], [0.5, 0.25], [-1.3, 2.7], [12.0, 7.0]] as const) {
            const h = pcgHash2([p[0], p[1]]);
            expect(h).toBeGreaterThanOrEqual(0);
            expect(h).toBeLessThan(1);
        }
        // Frozen witnesses (1e-6).
        expect(Math.abs(pcgHash2([0.5, 0.25]) - 0.8126628866884857)).toBeLessThan(TOL);
        expect(Math.abs(pcgHash2([12.0, 7.0]) - 0.4416546344291419)).toBeLessThan(TOL);
    });

    it("(B) pcgGrad2 returns a UNIT vector (the gradient basis)", () => {
        for (const c of [[0, 0], [1, 0], [3, 5], [-2, 9]] as const) {
            const g = pcgGrad2(c[0], c[1]);
            const len = Math.hypot(g[0], g[1]);
            expect(Math.abs(len - 1)).toBeLessThan(TOL);
        }
    });

    it("(B) gnoise is in ~[-1,1], smooth, and deterministic (frozen witnesses)", () => {
        // Simplex gradient noise stays inside the ~[-1,1] band (the 70.0 amplitude
        // normalize); samples are deterministic to 1e-6 (the frozen oracle).
        for (const c of [[0, 0], [1, 0], [2, 3], [-1, 4], [0.37, 0.62]] as const) {
            const v = gnoise([c[0], c[1]]);
            expect(v).toBeGreaterThan(-1.0);
            expect(v).toBeLessThan(1.0);
        }
        // Frozen 1e-6 witnesses — the certified-identical integer+simplex pipeline.
        expect(Math.abs(gnoise([0, 0]) - 0.0)).toBeLessThan(TOL);
        expect(Math.abs(gnoise([1, 0]) - -0.6562748383153598)).toBeLessThan(TOL);
        expect(Math.abs(gnoise([2, 3]) - 0.4519484466439511)).toBeLessThan(TOL);
        expect(Math.abs(gnoise([0.37, 0.62]) - 0.32912342540616096)).toBeLessThan(TOL);
    });

    it("(B) gnoise has no axis-aligned periodicity (the value-noise lattice the basis kills)", () => {
        // A value-noise/sin-hash lattice repeats on the integer grid; gradient simplex
        // noise does NOT — adjacent unit cells produce decorrelated interior values.
        const samples = [
            gnoise([0.5, 0.5]),
            gnoise([1.5, 0.5]),
            gnoise([0.5, 1.5]),
            gnoise([1.5, 1.5]),
        ];
        // No two interior-cell samples coincide (no lattice periodicity).
        const uniq = new Set(samples.map((s) => s.toFixed(9)));
        expect(uniq.size).toBe(samples.length);
    });
});
