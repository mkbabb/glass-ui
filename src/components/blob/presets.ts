// BI.W-BLOB-SEAMS — the blob CONFIG-preset leaf (GAP-L5 / value.js T-communiqué §4).
//
// The value.js-FREE config surface: named presets + the derived-palette ink-floor
// bracket, all plain serializable data + pure math (NO `<Blob>` SFC, NO renderer, NO
// `/color` value.js reach). This is the source that backs the `/blob/config` value.js-free
// subpath (the RP-2 one-window eager-budget win) — a consumer importing JUST the config
// shape + a hero preset never drags value.js onto its critical path. It re-exports the
// atom types/defaults from `./types` (see `../../../subpaths/blob-config.ts`).

import type { BlobConfig } from "./types";
import { BLOB_CONFIG_DEFAULTS } from "./types";

// ── The derived-palette ink-floor bracket (D8 / value.js GAP-L5) ────────────────────
//
// `deriveBlobPalette` (`/color`) walks a seed into a body→satellite OKLCh ramp whose
// deepest (body) stop can collapse toward an illegible near-black on a dark seed. The
// `lightnessFloor` config atom clamps that body stop to a legible OKLab-L floor. The
// bracket is the value.js-recorded D8 range [0.12, 0.20] OKLab L: below 0.12 the body
// reads as a black slab (the ink-floor defect), above 0.20 the deep body loses its
// weight against the lighter satellites. The default sits mid-bracket at 0.15.

/** The D8 OKLab-L ink-floor bracket — `[min, max]` (BI.W-BLOB-SEAMS / value.js GAP-L5). */
export const LIGHTNESS_FLOOR_BRACKET: readonly [number, number] = [0.12, 0.2];

/** The default derived-palette OKLab-L floor (mid-bracket). */
export const LIGHTNESS_FLOOR_DEFAULT = 0.15;

/**
 * Clamp a lightness-floor value into the {@link LIGHTNESS_FLOOR_BRACKET} `[0.12, 0.20]`.
 * A non-finite / omitted value resolves to {@link LIGHTNESS_FLOOR_DEFAULT} (0.15). Pass
 * the result to `deriveBlobPalette`'s `lightnessFloor` so a consumer/HERO body never
 * derives below the ink floor NOR above the deep-body ceiling — the bracket is the
 * contract, the atom is the knob.
 */
export function clampLightnessFloor(v: number = LIGHTNESS_FLOOR_DEFAULT): number {
    const [lo, hi] = LIGHTNESS_FLOOR_BRACKET;
    const n = Number.isFinite(v) ? v : LIGHTNESS_FLOOR_DEFAULT;
    return Math.min(hi, Math.max(lo, n));
}

// ── BLOB_HERO — the calibrated hero preset (the DEFAULT_AURORA_CONFIG twin) ──────────
//
// The hero-scale living-bead configuration the demo re-derives by hand today (the studio
// `STUDIO_GEO_BASE` separation geometry). Exported so a consumer mounting a large focal
// blob imports the shipped calibration rather than re-deriving the orbit/satellite/merge
// numbers: the separation geometry (orbit 0.30 > body 0.22, 4 satellites, near-circular
// eccentricity) that makes the orbit→merge→absorb→emerge metaball show READ on a large
// canvas, a modestly louder gooey merge bridge (smoothK 0.06, lean-safe with the circular
// merge), and the ink-floored warm-cream palette. Everything else inherits
// BLOB_CONFIG_DEFAULTS (the calm interaction lean, the lit-cream surface, the warm palette
// stops). This is the shipped PRIMITIVE preset (the presets-in-consumers fence binds
// consumer HUES, not a named engine preset a consumer imports).
export const BLOB_HERO: BlobConfig = {
    ...BLOB_CONFIG_DEFAULTS,
    geometry: {
        ...BLOB_CONFIG_DEFAULTS.geometry,
        satelliteCount: 4,
        orbitRadius: 0.3,
        satelliteRadius: 0.1,
        eccentricity: 0.04,
    },
    membrane: {
        ...BLOB_CONFIG_DEFAULTS.membrane,
        smoothK: 0.06,
    },
    color: {
        ...BLOB_CONFIG_DEFAULTS.color,
        lightnessFloor: LIGHTNESS_FLOOR_DEFAULT,
    },
};
