// demo/configurator/preset-editor/types.ts — public + module-internal types.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Types-only module; no runtime side effects.

import type { Ref } from "vue";
import type { PresetId } from "../../presets/manifest";

export type Density = "cozy" | "comfortable" | "compact";

export interface FontSlots {
    serif: string;
    sans: string;
    display: string;
    mono: string;
}

/**
 * Full default-config shape — used ONLY for UI pre-population and reset
 * baselines. Never persisted, never written to `:root`.
 */
export interface ConfigBaseline {
    preset: PresetId | "custom";
    font: FontSlots;
    scaleBase: number;
    hueShift: number;
    grain: number;
    density: Density;
    radius: number;
    cartoonShadow: boolean;
    dark: boolean;
}

/**
 * Sparse, persisted delta. A field absent from the delta means the library
 * token is authoritative for that field. A present field means the user
 * explicitly set it (via preset selection or individual control).
 */
export interface ConfigDelta {
    preset?: PresetId | "custom";
    font?: Partial<FontSlots>;
    scaleBase?: number;
    hueShift?: number;
    grain?: number;
    density?: Density;
    radius?: number;
    cartoonShadow?: boolean;
    dark?: boolean;
}

export interface FontOption {
    readonly id: string;
    readonly label: string;
    readonly stack: string;
}

export type DeltaKey = keyof ConfigDelta;

/**
 * The subset of `ConfigBaseline` keys backed by a CSS-variable writer in
 * `css-writers.ts` (everything except `preset`, `font`, and `dark`).
 */
export type WritableField =
    | "scaleBase"
    | "hueShift"
    | "grain"
    | "density"
    | "radius"
    | "cartoonShadow";

export interface PresetEditor {
    /** Sparse reactive delta — only fields the user has touched. */
    readonly delta: ConfigDelta;
    /** Baseline values (for UI pre-population + reset). Never mutated. */
    readonly defaults: ConfigBaseline;
    readonly isDark: Ref<boolean>;
    /** Read the effective value — delta wins, baseline fallback. */
    effective<K extends keyof ConfigBaseline>(key: K): ConfigBaseline[K];
    /** Effective value for a single font slot. */
    effectiveFont(slot: keyof FontSlots): string;
    /**
     * Set a field. Equal-to-default clears the delta entry and strips the
     * inline CSS property. Anything else stores and writes.
     */
    setField<K extends keyof ConfigBaseline>(key: K, value: ConfigBaseline[K]): void;
    /** Set one font slot; equal-to-default clears just that slot. */
    setFont(slot: keyof FontSlots, stack: string): void;
    /** Clear one field back to library-default behaviour. */
    clearField(key: DeltaKey): void;
    /** Clear everything; removes every inline property we ever wrote. */
    reset(): void;
    /**
     * Preset selection. Tags delta.preset; individual field deltas are not
     * touched so the user's explicit overrides survive a preset switch.
     */
    setPreset(id: PresetId | "custom"): void;
}
