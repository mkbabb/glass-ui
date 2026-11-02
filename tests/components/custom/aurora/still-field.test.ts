import { describe, expect, it } from "vitest";
import { ref } from "vue";

import {
    DEFAULT_AURORA_CONFIG,
    PAPER_WASH_GROUND,
    STILL_FIELD,
    type AuroraConfig,
} from "@glass/components/aurora";
import { createFrameLoop } from "@glass/components/aurora/composables/frameLoop";

/* U/B8 PF, A7 / P-G2. RED before: no still partial existed, so a consumer zeroed eight
   fields by hand (gregg field.ts) or shipped a drifting field whose loop never parks.
   Mutation: give STILL_FIELD any drift above its floor, or a grain, and this reds. */
describe("STILL_FIELD — a field that draws once", () => {
    const still: AuroraConfig = { ...DEFAULT_AURORA_CONFIG, ...PAPER_WASH_GROUND, ...STILL_FIELD };

    it("zeroes every drift axis and the clocked film grain over any base", () => {
        for (const k of ["nucleiDrift", "paletteDrift", "warpDrift", "breathDepth", "paperGrain"] as const) {
            expect(still[k], k).toBe(0);
        }
    });

    it("keeps the spatial canvas tooth: a still field keeps its texture", () => {
        expect(STILL_FIELD).not.toHaveProperty("canvasGrain");
        expect(still.canvasGrain).toBe(PAPER_WASH_GROUND.canvasGrain);
    });

    it("the frame loop asks for no second frame over the still field at rest", () => {
        const rest = { x: 0, y: 0 };
        const loop = createFrameLoop({
            gl: {} as WebGL2RenderingContext,
            prog: {} as WebGLProgram,
            uniforms: {} as never,
            pointerField: {
                engagement: ref(0),
                speed: ref(0),
                burst: ref(0),
                attractorVelocity: ref(rest),
            } as never,
            getCursorScalars: () => ({ strength: 1, radius: 0.25 }) as never,
            getConfig: () => still,
            getReducedMotion: () => false,
            getRenderTime: (t) => t,
        });
        expect(loop.needsAnimation()).toBe(false);
        // and the default field, for contrast, keeps asking
        const drifting = createFrameLoop({
            gl: {} as WebGL2RenderingContext,
            prog: {} as WebGLProgram,
            uniforms: {} as never,
            pointerField: { engagement: ref(0), speed: ref(0), burst: ref(0), attractorVelocity: ref(rest) } as never,
            getCursorScalars: () => ({ strength: 1, radius: 0.25 }) as never,
            getConfig: () => DEFAULT_AURORA_CONFIG,
            getReducedMotion: () => false,
            getRenderTime: (t) => t,
        });
        expect(drifting.needsAnimation()).toBe(true);
    });
});
