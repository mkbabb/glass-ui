// The Blob page's editor state: its presets, and how one maps onto a BlobConfig.
import type { ConfiguratorPreset } from "@glass/components/configurator";
import {
    BLOB_CONFIG_DEFAULTS,
    type BlobConfig,
    type BlobMerge,
    type BlobMood,
} from "@glass/components/blob";
import { deriveBlobPalette, oklchStopToHex, type ColorHarmony } from "@glass/composables/color";

export interface BlobStudio {
    /** Pointer lean: −1 shies away, +1 leans in. */
    attraction: number;
    clickImpulse: number;
    /** Scales the pointer lean and the squash together, from calm to loud. */
    responsiveness: number;
    mood: BlobMood;
    /** The palette's seed, `#rrggbb`. */
    seed: string;
    harmony: ColorHarmony;
    satelliteCount: number;
    orbitRadius: number;
    satelliteRadius: number;
    eccentricity: number;
    smoothK: number;
    merge: BlobMerge;
    lit: boolean;
    morphT: number;
    shadow: boolean;
    shadowSoftness: number;
}

const GEOMETRY = {
    satelliteCount: 4,
    orbitRadius: 0.3,
    satelliteRadius: 0.1,
    eccentricity: 0.04,
    smoothK: 0.06,
    merge: BLOB_CONFIG_DEFAULTS.membrane.merge,
} as const;

const DRESSED = {
    lit: BLOB_CONFIG_DEFAULTS.surface.lit,
    morphT: BLOB_CONFIG_DEFAULTS.morphT,
    shadow: BLOB_CONFIG_DEFAULTS.surface.shadow,
    shadowSoftness: BLOB_CONFIG_DEFAULTS.surface.shadowSoftness,
} as const;

function preset(key: string, label: string, config: Omit<BlobStudio, keyof typeof GEOMETRY | keyof typeof DRESSED> & Partial<BlobStudio>): ConfiguratorPreset<BlobStudio> {
    return { key, label, config: { ...GEOMETRY, ...DRESSED, ...config } };
}

export const BLOB_PRESETS: readonly ConfiguratorPreset<BlobStudio>[] = [
    preset("calm", "Calm", { attraction: 0.35, clickImpulse: 0.5, responsiveness: 0, mood: "curious", seed: "#d9bf98", harmony: "analogous" }),
    preset("serene", "Serene", { attraction: 0.08, clickImpulse: 0.3, responsiveness: 0.1, mood: "idle", seed: "#8fd3d6", harmony: "analogous" }),
    preset("excited", "Excited", { attraction: 0.8, clickImpulse: 0.9, responsiveness: 0.7, mood: "excited", seed: "#d4504a", harmony: "analogous" }),
    preset("playful", "Playful", { attraction: 0.4, clickImpulse: 1.2, responsiveness: 0.9, mood: "happy", seed: "#f0a04b", harmony: "analogous" }),
    preset("shy", "Shy", { attraction: -0.8, clickImpulse: 0.3, responsiveness: 0.2, mood: "sleepy", seed: "#3f7fd9", harmony: "complementary" }),
    preset("plain", "Plain", { attraction: 0.35, clickImpulse: 0.5, responsiveness: 0, mood: "idle", seed: "#d9bf98", harmony: "analogous", lit: false, morphT: 0, shadow: false }),
];

// The seed's chroma is capped so a vivid seed stays a warm bead, not a neon one.
const CHROMA_CEILING = 0.15;
const CALM = BLOB_CONFIG_DEFAULTS.interaction;

/**
 * Writes the editor's values into a BlobConfig in place. A Blob reads its config
 * object for its whole life, so the page keeps one reactive config and edits it.
 */
export function applyBlobStudio(target: BlobConfig, s: BlobStudio): void {
    const r = s.responsiveness;
    target.morphT = s.morphT;
    Object.assign(target.geometry, {
        satelliteCount: s.satelliteCount,
        orbitRadius: s.orbitRadius,
        satelliteRadius: s.satelliteRadius,
        eccentricity: s.eccentricity,
    });
    Object.assign(target.surface, {
        lit: s.lit,
        shadow: s.shadow,
        shadowSoftness: s.shadowSoftness,
    });
    Object.assign(target.membrane, { smoothK: s.smoothK, merge: s.merge });
    Object.assign(target.interaction, {
        pointerAttraction: s.attraction,
        clickImpulse: s.clickImpulse,
        pointerStrength: CALM.pointerStrength + r * (0.45 - CALM.pointerStrength),
        stretch: CALM.stretch + r * (2 - CALM.stretch),
    });
    target.color.paletteStops = deriveBlobPalette(s.seed, {
        stopCount: 3,
        harmony: s.harmony,
        chromaCeiling: CHROMA_CEILING,
    }).map(oklchStopToHex);
}

/** A fresh BlobConfig holding the editor's values. */
export function toBlobConfig(s: BlobStudio): BlobConfig {
    const c = structuredClone(BLOB_CONFIG_DEFAULTS) as BlobConfig;
    applyBlobStudio(c, s);
    return c;
}
