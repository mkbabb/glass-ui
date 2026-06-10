// The GooBlob compile-time shape budget — the SINGLE source for the array caps the
// JS uploader (`uploadBlobUniforms`), the program builder (`buildMetaballProgram`),
// the pointer trail ring-buffer (`useBlobPointer`), AND the GLSL shader
// (`metaball.frag.ts` / `metaball-uniforms.glsl.ts`) all read. These caps are a
// CONTRACT: a JS const must equal the shader `#define` / fixed-size uniform array
// length or the upload writes off the end of the program. Co-located here (the
// feature-dir `constants.ts` convention) so the contract lives in ONE place rather
// than being re-declared at the top of each composable.

/** Compile-time satellite cap — mirrors `uSat*[N]` in metaball.frag.ts. */
export const MAX_SATS = 4;

/** Compile-time trail length — mirrors the `uTrail*[N]` arrays in metaball.frag.ts. */
export const TRAIL_N = 15;

/** Compile-time palette cap — mirrors `#define MAX_BLOB_STOPS` in metaball-uniforms.glsl.ts. */
export const MAX_BLOB_STOPS = 4;

/**
 * Canvas is CSS-sized 1.6x its layout wrapper (see GooBlob.vue). Positions are in
 * [-0.5, 0.5] normalized space mapped to canvas UVs. To make the layout footprint
 * represent the "visible blob region" and have the extra 60% of canvas serve as
 * overflow margin for satellite orbits, scale all length-like uniforms by
 * 1/1.6 = 0.625.
 */
export const POS_SCALE = 1 / 1.6;

/** The full ordered scalar/vector uniform-name list the program builder caches a location per. */
export const UNIFORM_NAMES = [
    "uResolution",
    "uTime",
    "uBaseColor",
    "uPointer",
    "uPointerActive",
    "uPointerAttraction",
    "uPointerStrength",
    "uBodyRadius",
    "uPulsePhase",
    "uPulseAmp",
    "uNoiseAmp",
    "uNoiseFreq",
    "uNoiseSpeed",
    "uWarpAmp",
    "uSmoothK",
    "uMerge",
    "uMaxReach",
    "uLit",
    "uRimColor",
    "uLightDir",
    "uSpecStrength",
    "uSpecShininess",
    "uRimPower",
    "uRimStrength",
    "uIridescence",
    "uIridHue",
    "uIridSpeed",
    "uSssScale",
    "uSssPower",
    "uCoreGlow",
    "uHueRange",
    "uSatShift",
    "uBrightnessShift",
    "uColorNoiseFreq",
    "uColorNoiseSpeed",
    "uStopCount",
    "uSatCount",
    "uTrailCount",
    "uVelocity",
    "uStretch",
] as const;

export type UniformName = (typeof UNIFORM_NAMES)[number];
