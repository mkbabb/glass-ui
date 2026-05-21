/**
 * Layout register for `<MetaballCanvas>`'s canvas root.
 *
 * `"viewport"` (default) — the canvas paints as a viewport-cover backdrop:
 * `position: fixed; inset: 0; z-index: -10`. Use this for hero / storybook /
 * standalone-page backdrops where the Metaballs surface IS the page substrate.
 *
 * `"local"` — the publisher drops the viewport-cover utility trio (`fixed`,
 * `inset-0`, `-z-10`) so the canvas reads as a plain inline element sized via
 * `inline-size: 100%; block-size: 100%`. The consumer owns `position`,
 * `inset`, `z-index`, and any clipping (e.g. `border-radius: 50%`) via a
 * scoped rule on a class merged onto the canvas root. Use this when the
 * Metaballs is a LOCAL backdrop pinned behind a sibling element (a badge,
 * a dial, a card region) — not a viewport-cover.
 *
 * The shader math already honestly handles arbitrary aspect ratios (the
 * fragment shader applies `aspect = u_resolution.x / u_resolution.y`), so
 * the new register is purely a CSS positioning concern — no shader edits.
 *
 * AJ-W1-β.
 */
export type MetaballPositioning = "viewport" | "local";

export interface MetaballConfig {
    /** Number of blobs (default 8, max 16 for shader uniform limit) */
    blobCount?: number;
    /** Animation speed multiplier (default 0.08) */
    speed?: number;
    /** Density threshold for surface rendering (default 1.0, higher = sharper edges) */
    threshold?: number;
    /** Base blob radius as fraction of viewport (default 0.12) */
    baseRadius?: number;
    /** Orbital drift amplitude as fraction of viewport (default 0.3) */
    orbitAmplitude?: number;
    /** CSS color strings for blob colors (cycles if fewer than blobCount) */
    colors?: string[];
    /** Background alpha (0 = fully transparent, default 0) */
    bgAlpha?: number;
    /** Edge softness — smoothstep range as fraction of threshold (default 0.3) */
    edgeSoftness?: number;
}

export const DEFAULT_METABALL_CONFIG: Required<MetaballConfig> = {
    blobCount: 8,
    speed: 0.08,
    threshold: 1.0,
    baseRadius: 0.12,
    orbitAmplitude: 0.3,
    colors: ["#E31937", "#FF6B35", "#FFA726", "#EF5350"],
    bgAlpha: 0,
    edgeSoftness: 0.3,
};
