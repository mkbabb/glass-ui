// The Constellation page's editor state and its presets.
import type { ConfiguratorPreset } from "@glass/components/configurator";

export interface ConstellationStudio {
    count: number;
    link: number;
    /** How strongly the field paints, 0 to 1. */
    ceiling: number;
    pointer: boolean;
    warp: boolean;
    wander: boolean;
    well: boolean;
    pinned: boolean;
    accent: boolean;
}

const BASE: ConstellationStudio = {
    count: 60,
    link: 144,
    ceiling: 1,
    pointer: true,
    warp: false,
    wander: false,
    well: false,
    pinned: false,
    accent: false,
};

const preset = (key: string, label: string, over: Partial<ConstellationStudio>): ConfiguratorPreset<ConstellationStudio> => ({
    key,
    label,
    config: { ...BASE, ...over },
});

export const CONSTELLATION_PRESETS: readonly ConfiguratorPreset<ConstellationStudio>[] = [
    preset("drift", "Drift", {}),
    preset("warp", "Warp", { pointer: false, warp: true }),
    preset("wander", "Wander", { pointer: false, wander: true }),
    preset("well", "Gravity well", { pointer: false, well: true, count: 64 }),
    preset("pinned", "Pinned", { pointer: false, pinned: true, accent: true, warp: true }),
];
