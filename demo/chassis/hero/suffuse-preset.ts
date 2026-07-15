import {
    DEFAULT_LIQUID_GRID_CONFIG,
    type LiquidGridConfig,
} from "@glass/components/liquid-grid";

/** The calm, non-interactive liquid-grid ground shared by the page chassis and story. */
export const LIQUID_GRID_PRESET_SUFFUSE: LiquidGridConfig = {
    ...DEFAULT_LIQUID_GRID_CONFIG,
    cellSize: 96,
    fieldAlpha: 0.12,
    twistMax: 0.22,
    waveOmega: 0.4,
    interactive: false,
};
