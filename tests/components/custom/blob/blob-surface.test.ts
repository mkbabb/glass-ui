import { ref } from "vue";
import { describe, expect, it } from "vitest";
import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob/types";
import { MOOD_TARGETS, POS_SCALE } from "@glass/components/blob/constants";
import { resolveBlobSurface } from "@glass/components/blob/composables/resolveBlobSurface";
import {
    createBlobWGPUUniformScratch,
    packBlobWGPUUniforms,
} from "@glass/components/blob/composables/uniformBridgeWGPU";
import {
    resolveBlobSettledFrame,
    type BlobFrameState,
} from "@glass/components/blob/composables/blobSimulation";
import {
    uploadBlobUniforms,
    type MetaballUniformLocations,
} from "@glass/components/blob/composables/uploadBlobUniforms";
import type { BlobPointer } from "@glass/components/blob/composables/useBlobPointer";
import type { BlobSatelliteSystem } from "@glass/components/blob/composables/useBlobSatellites";

const canvas = Object.assign(document.createElement("canvas"), {
    width: 400,
    height: 300,
});
const frame: BlobFrameState = {
    params: MOOD_TARGETS.idle,
    rgb: [0.2, 0.3, 0.4],
    simTimeMs: 1250,
    timeSec: 2.5,
    resolveColor: () => [0.5, 0.6, 0.7],
    rimColor: "#fff",
    paletteStops: [],
};
const pointer = {
    pointer: ref({ x: 0, y: 0 }),
    velocity: ref({ x: 0, y: 0 }),
    pulse: ref(0),
    active: ref(false),
    trailSources: () => ({ sources: [], count: 0 }),
} as unknown as BlobPointer;
const satellites = { sources: [] } as unknown as BlobSatelliteSystem;

function packed(morphT: number): Float32Array {
    const config = { ...BLOB_CONFIG_DEFAULTS, morphT };
    return packBlobWGPUUniforms(
        createBlobWGPUUniformScratch(),
        canvas,
        config,
        pointer,
        satellites,
        frame,
    ).f32;
}

function uploaded(morphT: number): Map<string, number> {
    const values = new Map<string, number>();
    const gl = {
        useProgram() {},
        bindVertexArray() {},
        uniform1f(location: string, value: number) {
            values.set(location, value);
        },
        uniform1i() {},
        uniform2f() {},
        uniform3f() {},
        clearColor() {},
        clear() {},
        drawArrays() {},
        COLOR_BUFFER_BIT: 0,
        TRIANGLES: 0,
    } as unknown as WebGL2RenderingContext;
    const locations = {
        U: new Proxy({}, { get: (_, key) => String(key) }),
        satPosLocs: [],
        satRadLocs: [],
        satOpLocs: [],
        satColorLocs: [],
        satColorAmtLocs: [],
        trailPosLocs: [],
        trailRadLocs: [],
        paletteLocs: [],
    } as unknown as MetaballUniformLocations;
    uploadBlobUniforms(
        gl,
        {} as WebGLProgram,
        {} as WebGLVertexArrayObject,
        locations,
        canvas,
        { ...BLOB_CONFIG_DEFAULTS, morphT },
        pointer,
        satellites,
        frame,
    );
    return values;
}

describe("Blob surface axis", () => {
    it("clamps one morph value and derives dressing from that same decision", () => {
        expect(resolveBlobSurface({ ...BLOB_CONFIG_DEFAULTS, morphT: -1 })).toEqual({
            morphT: 0,
            dressed: false,
        });
        expect(resolveBlobSurface({ ...BLOB_CONFIG_DEFAULTS, morphT: 0.4 })).toEqual({
            morphT: 0.4,
            dressed: true,
        });
        expect(resolveBlobSurface({ ...BLOB_CONFIG_DEFAULTS, morphT: 2 })).toEqual({
            morphT: 1,
            dressed: true,
        });
    });

    it("packs clamped morph, stage, light, and shadow coherently", () => {
        const flat = packed(-1);
        expect(flat[39]).toBe(0); // base.w = morphT
        expect(flat[31]).toBe(1); // s7.w = flat stage
        expect(flat[11]).toBe(0); // s2.w = lit
        expect(flat[50]).toBe(0); // res.z = shadow

        const dressed = packed(2);
        expect(dressed[39]).toBe(1);
        expect(dressed[31]).toBe(0);
        expect(dressed[11]).toBe(1);
        expect(dressed[50]).toBe(1);

        const flatGL = uploaded(-1);
        expect(flatGL.get("uMorphT")).toBe(0);
        expect(flatGL.get("uStage")).toBe(1);
        expect(flatGL.get("uLit")).toBe(0);
        expect(flatGL.get("uShadow")).toBe(0);

        const dressedGL = uploaded(2);
        expect(dressedGL.get("uMorphT")).toBe(1);
        expect(dressedGL.get("uStage")).toBe(0);
        expect(dressedGL.get("uLit")).toBe(1);
        expect(dressedGL.get("uShadow")).toBe(1);
    });

    it("preserves the calibrated body radius in the packed geometry", () => {
        expect(BLOB_CONFIG_DEFAULTS.geometry.bodyRadius).toBe(0.22);
        expect(packed(1)[1]).toBeCloseTo(0.22 * POS_SCALE, 6);
        expect(uploaded(1).get("uBodyRadius")).toBeCloseTo(0.22 * POS_SCALE, 6);
    });
});

describe("Blob settled frame", () => {
    it("stays absent until a drawn frame and lifecycle-owned backing size both exist", () => {
        const size = { w: 400, h: 300, dpr: 2, changed: false };
        expect(resolveBlobSettledFrame(null, size)).toBeNull();
        expect(resolveBlobSettledFrame(frame, null)).toBeNull();
        expect(resolveBlobSettledFrame(frame, size)).toEqual({
            timeSec: 2.5,
            simulationTimeMs: 1250,
            buffer: { width: 400, height: 300, dpr: 2 },
            simulationOrigin: { x: 0.5, y: 0.5 },
        });
    });
});
