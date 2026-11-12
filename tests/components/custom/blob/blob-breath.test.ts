import { effectScope, ref } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob/types";
import { POS_SCALE } from "@glass/components/blob/constants";
import { createBlobSimulation } from "@glass/components/blob/composables/blobSimulation";
import {
    createBlobWGPUUniformScratch,
    packBlobWGPUUniforms,
} from "@glass/components/blob/composables/uniformBridgeWGPU";
import {
    uploadBlobUniforms,
    type MetaballUniformLocations,
} from "@glass/components/blob/composables/uploadBlobUniforms";
import { useBlobMood } from "@glass/components/blob/composables/useBlobMood";
import { useBlobPointer } from "@glass/components/blob/composables/useBlobPointer";
import { useBlobSatellites } from "@glass/components/blob/composables/useBlobSatellites";

// The body's painted reach in canvas UV, radius + |breath| + edge noise, must stay
// inside the layout wrapper's half-width (0.5 in body space).
const BOX = 0.5 * POS_SCALE;
const SIDE = 200;
const config = BLOB_CONFIG_DEFAULTS;
const canvas = Object.assign(document.createElement("canvas"), { width: 320, height: 320 });

function glReach(run: () => void, values: Map<string, number>): number {
    run();
    return values.get("uBodyRadius")! + Math.abs(values.get("uPulseAmp")!) + values.get("uNoiseAmp")!;
}

const scopes: ReturnType<typeof effectScope>[] = [];
afterEach(() => {
    for (const s of scopes.splice(0)) s.stop();
    document.body.innerHTML = "";
});

/** A blob engine on a 200px box, driven frame by frame, its reach read from both legs. */
function engine() {
    const scope = effectScope();
    scopes.push(scope);
    const host = document.createElement("div");
    host.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: SIDE, height: SIDE, right: SIDE, bottom: SIDE, x: 0, y: 0 }) as DOMRect;
    document.body.append(host);
    return scope.run(() => {
        const raw = useBlobPointer(ref(host));
        let kicks = 0;
        const pointer = { ...raw, click: (amp: number) => (kicks++, raw.click(amp)) };
        const satellites = useBlobSatellites(config, "#e36a4b");
        const sim = createBlobSimulation({
            color: ref("#e36a4b"),
            rimColor: ref("#ffffff"),
            paletteStops: ref([]),
            mood: useBlobMood(),
            pointer,
            satellites,
            config,
            getReducedMotion: () => false,
            wake: () => {},
        });
        const values = new Map<string, number>();
        const gl = new Proxy(
            { uniform1f: (l: string, v: number) => values.set(l, v) },
            { get: (t, k) => (k in t ? t[k as "uniform1f"] : () => {}) },
        ) as unknown as WebGL2RenderingContext;
        const locations = new Proxy(
            {},
            { get: (_, k) => (k === "U" ? new Proxy({}, { get: (_, n) => String(n) }) : []) },
        ) as unknown as MetaballUniformLocations;
        let t = 1;
        let peak = 0;
        const step = (x?: number, y?: number) => {
            if (x !== undefined && y !== undefined) {
                host.dispatchEvent(
                    new PointerEvent("pointermove", { clientX: ((x + 1) / 2) * SIDE, clientY: ((y + 1) / 2) * SIDE }),
                );
            }
            t += 1 / 60;
            const frame = sim.resolveFrame(t);
            const f32 = packBlobWGPUUniforms(createBlobWGPUUniformScratch(), canvas, config, pointer, satellites, frame).f32;
            const gpu = f32[1]! + Math.abs(f32[3]!) + f32[4]!;
            const webgl = glReach(
                () => uploadBlobUniforms(gl, {} as WebGLProgram, {} as WebGLVertexArrayObject, locations, canvas, config, pointer, satellites, frame),
                values,
            );
            peak = Math.max(peak, gpu, webgl);
        };
        const frames = (ms: number) => Math.round((ms / 1000) * 60);
        return {
            step,
            frames,
            rest: (ms: number) => {
                for (let i = 0; i < frames(ms); i++) step();
            },
            release: () => pointer.click(config.interaction.clickImpulse),
            peak: () => peak,
            kicks: () => kicks,
        };
    })!;
}

const ease = (u: number) => (1 - Math.cos(Math.PI * u)) / 2;

describe("Blob body reach", () => {
    it("a 600 ms sweep across the body kicks once and stays inside the box", () => {
        const e = engine();
        const n = e.frames(600);
        for (let i = 0; i <= n; i++) e.step(-0.9 + 1.8 * ease(i / n), 0.1);
        e.rest(400);
        expect.soft(e.kicks()).toBeLessThanOrEqual(2);
        expect(e.peak()).toBeLessThanOrEqual(BOX + 1e-6);
    });

    it("a drag of three strokes, then its release, stays inside the box", () => {
        const e = engine();
        const n = e.frames(200);
        for (const [a, b] of [[-0.6, 0.6], [0.6, -0.6], [-0.6, 0.6]] as const) {
            for (let i = 0; i <= n; i++) e.step(a + (b - a) * ease(i / n), -0.2);
        }
        expect.soft(e.kicks()).toBeLessThanOrEqual(6);
        e.release();
        e.rest(400);
        expect(e.peak()).toBeLessThanOrEqual(BOX + 1e-6);
    });

    it("a release on a still body stays inside the box", () => {
        const e = engine();
        e.step(0, 0);
        e.rest(200);
        e.release();
        e.rest(400);
        expect(e.peak()).toBeLessThanOrEqual(BOX + 1e-6);
        expect(e.peak()).toBeGreaterThan(config.geometry.bodyRadius * POS_SCALE);
    });
});
