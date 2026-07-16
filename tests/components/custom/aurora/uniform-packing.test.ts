import { describe, expect, it } from "vitest";
import { DEFAULT_AURORA_CONFIG, MAX_NUCLEI } from "@glass/components/aurora/constants/presets";
import { nucleiPrior } from "@glass/components/aurora/composables/atoms";
import {
    AURORA_CURSOR_UNIFORM_REST,
    createUniformBridge,
} from "@glass/components/aurora/composables/uniformBridge";
import type { UniformLocations } from "@glass/components/aurora/composables/glSetup";
import {
    AURORA_WGPU_UNIFORM_BYTES,
    createAuroraWGPUUniformScratch,
    packAuroraWGPUUniforms,
} from "@glass/components/aurora/composables/uniformBridgeWGPU";
import {
    AURORA_IMAGE_WGPU_UNIFORM_BYTES,
    createAuroraImageWGPUScratch,
    packAuroraImageWGPUUniforms,
} from "@glass/components/aurora/composables/uniformBridgeWGPUImage";
import { AURORA_WGSL } from "@glass/components/aurora/constants/shaders/aurora.wgsl";

const config = {
    ...DEFAULT_AURORA_CONFIG,
    warpMode: "curl" as const,
    nuclei: nucleiPrior(MAX_NUCLEI, "scattered").map((nucleus, index) => ({
        ...nucleus,
        radius: 0.2 + index * 0.05,
        paletteBias: index / (MAX_NUCLEI - 1),
        valueBias: -0.21 + index * 0.06,
        driftRadius: index * 0.01,
        driftPhase: index * 0.7,
        elongation: 1 + index * 0.25,
        angle: -140 + index * 40,
    })),
};

describe("P046 — eight-zone WebGPU uniform packing", () => {
    it("keeps every configured zone effect identical across WebGL2 and WebGPU", () => {
        const integers = new Map<string, number>();
        const arrays = new Map<string, Float32Array>();
        const gl = {
            useProgram() {},
            uniform1i(location: string, value: number) {
                integers.set(location, value);
            },
            uniform1f() {},
            uniform2f() {},
            uniform3f() {},
            uniform1fv(location: string, value: Float32Array) {
                arrays.set(location, new Float32Array(value));
            },
            uniform3fv() {},
            uniform2fv(location: string, value: Float32Array) {
                arrays.set(location, new Float32Array(value));
            },
        } as unknown as WebGL2RenderingContext;
        const uniforms = new Proxy({}, { get: (_, key) => String(key) }) as UniformLocations;
        const wgpu = createAuroraWGPUUniformScratch();

        createUniformBridge(gl, {} as WebGLProgram, uniforms)(config);
        packAuroraWGPUUniforms(wgpu, config, AURORA_CURSOR_UNIFORM_REST, 2.5);

        expect(integers.get("uNucleiCount")).toBe(MAX_NUCLEI);
        expect(wgpu.i32[21]).toBe(MAX_NUCLEI);
        expect(wgpu.i32[22]).toBe(integers.get("uWarpMode"));

        const glArray = (name: string) => arrays.get(name)!;
        for (let index = 0; index < MAX_NUCLEI; index++) {
            const nuc0 = 60 + index * 4;
            const nuc1 = 92 + index * 4;
            const nuc2 = 124 + index * 4;
            expect(wgpu.f32[nuc0]).toBeCloseTo(glArray("uNucleiPos")[index * 2]!);
            expect(wgpu.f32[nuc0 + 1]).toBeCloseTo(glArray("uNucleiPos")[index * 2 + 1]!);
            expect(wgpu.f32[nuc0 + 2]).toBeCloseTo(glArray("uNucleiRadius")[index]!);
            expect(wgpu.f32[nuc0 + 3]).toBeCloseTo(glArray("uNucleiPaletteBias")[index]!);
            expect(wgpu.f32[nuc1]).toBeCloseTo(glArray("uNucleiValueBias")[index]!);
            expect(wgpu.f32[nuc1 + 1]).toBeCloseTo(glArray("uNucleiDriftRadius")[index]!);
            expect(wgpu.f32[nuc1 + 2]).toBeCloseTo(glArray("uNucleiDriftPhase")[index]!);
            expect(wgpu.f32[nuc1 + 3]).toBeCloseTo(glArray("uNucleiElong")[index]!);
            expect(wgpu.f32[nuc2]).toBeCloseTo(glArray("uNucleiAngle")[index]!);
        }
    });

    it("routes the fourth warp mode through the WebGPU-primary curl field", () => {
        expect(AURORA_WGSL).toContain("else if (warpMode == 3)");
        expect(AURORA_WGSL).toContain("warp = curlFBM(fp)");
    });

    it("packs the palette layout into 672 bytes at the declared offsets", () => {
        const scratch = createAuroraWGPUUniformScratch();
        packAuroraWGPUUniforms(scratch, config, AURORA_CURSOR_UNIFORM_REST, 2.5);

        expect(AURORA_WGPU_UNIFORM_BYTES).toBe(672);
        expect(scratch.buffer.byteLength).toBe(672);
        expect(scratch.i32[21]).toBe(MAX_NUCLEI);
        expect(scratch.f32[60 + 7 * 4]).toBeCloseTo(config.nuclei[7]!.x);
        expect(scratch.f32[92 + 7 * 4]).toBeCloseTo(config.nuclei[7]!.valueBias);
        expect(scratch.f32[124 + 7 * 4]).toBeCloseTo(
            (-(config.nuclei[7]!.angle ?? 0) * Math.PI) / 180,
        );
        expect(scratch.f32[156]).toBeCloseTo(config.strokeAmount);
        expect(scratch.f32[160]).toBeCloseTo(config.wetEdge);
        expect(scratch.f32[164]).toBeCloseTo(config.kuwaharaRadius ?? 0.01);
    });

    it("packs the image layout into 352 bytes at the declared offsets", () => {
        const scratch = createAuroraImageWGPUScratch();
        packAuroraImageWGPUUniforms(scratch, config, AURORA_CURSOR_UNIFORM_REST, 2.5, 1.5);

        expect(AURORA_IMAGE_WGPU_UNIFORM_BYTES).toBe(352);
        expect(scratch.buffer.byteLength).toBe(352);
        expect(scratch.i32[20]).toBe(MAX_NUCLEI);
        expect(scratch.f32[24 + 7 * 4]).toBeCloseTo(config.nuclei[7]!.x);
        expect(scratch.f32[56 + 7 * 4]).toBeCloseTo(config.nuclei[7]!.driftRadius);
    });

    it("keeps live output opaque while capture retains authored alpha on both engines", () => {
        const floats = new Map<string, number>();
        const gl = {
            useProgram() {},
            uniform1i() {},
            uniform1f(location: string, value: number) {
                floats.set(location, value);
            },
            uniform2f() {},
            uniform3f() {},
            uniform1fv() {},
            uniform2fv() {},
            uniform3fv() {},
        } as unknown as WebGL2RenderingContext;
        const uniforms = new Proxy({}, { get: (_, key) => String(key) }) as UniformLocations;
        const lowAlpha = { ...config, alpha: 0.26 };

        createUniformBridge(gl, {} as WebGLProgram, uniforms, true)(lowAlpha);
        expect(floats.get("uAlpha")).toBe(1);

        const palette = createAuroraWGPUUniformScratch();
        const image = createAuroraImageWGPUScratch();
        packAuroraWGPUUniforms(
            palette,
            lowAlpha,
            AURORA_CURSOR_UNIFORM_REST,
            2.5,
            1,
        );
        packAuroraImageWGPUUniforms(
            image,
            lowAlpha,
            AURORA_CURSOR_UNIFORM_REST,
            2.5,
            1.5,
            1,
        );
        expect(palette.f32[8]).toBe(1);
        expect(image.f32[10]).toBe(1);

        packAuroraWGPUUniforms(palette, lowAlpha, AURORA_CURSOR_UNIFORM_REST, 2.5);
        packAuroraImageWGPUUniforms(
            image,
            lowAlpha,
            AURORA_CURSOR_UNIFORM_REST,
            2.5,
            1.5,
        );
        expect(palette.f32[8]).toBeCloseTo(0.26);
        expect(image.f32[10]).toBeCloseTo(0.26);
    });
});
