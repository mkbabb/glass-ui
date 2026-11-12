import { BODY_BOX_HALF, POS_SCALE } from "../constants";
import type { BlobConfig, MoodParams } from "../types";

/**
 * The body's breath and edge-noise amplitudes in canvas UV, for the WebGL2 and WebGPU
 * upload legs alike. The breath is the mood's idle throb plus the click pulse, held to
 * the room the box leaves: radius + |breath| + noise never passes `BODY_BOX_HALF`.
 */
export function resolveBodyBreath(
    config: BlobConfig,
    params: MoodParams,
    pulse: number,
): { pulseAmp: number; noiseAmp: number } {
    const { geometry, membrane, interaction } = config;
    const noise = (membrane.noiseAmp * params.noiseAmp) / 0.025;
    const room = Math.max(0, BODY_BOX_HALF - geometry.bodyRadius - noise);
    const breath =
        (membrane.pulseAmp * params.pulseAmp) / 0.015 + pulse * interaction.clickImpulse;
    return {
        pulseAmp: Math.max(-room, Math.min(room, breath)) * POS_SCALE,
        noiseAmp: noise * POS_SCALE,
    };
}
