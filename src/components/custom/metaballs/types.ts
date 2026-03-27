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
