// demo/configurator/preset-editor/defaults.ts — default presets, constants,
// and CSS-variable name tables.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Const-only module; no runtime side effects.

import type { ConfigBaseline, Density, FontOption, FontSlots, WritableField } from "./types";

export const STORAGE_KEY = "glass-ui-demo-config";
export const PRESET_LINK_ID = "glass-ui-demo-preset-link";

// The shipped-canon font picker. Every stack names ONLY a self-hosted face
// (Plus Jakarta Sans / Fira Code — declared in src/styles/fonts.css +
// demo/demo.css), its Capsize-calibrated "* Fallback" wrapper, or a generic
// system keyword. No option advertises a face the browser cannot paint.
export const FONT_OPTIONS: readonly FontOption[] = [
    {
        id: "plus-jakarta-sans",
        label: "Plus Jakarta Sans",
        stack: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
    },
    {
        id: "fira-code",
        label: "Fira Code",
        stack: '"Fira Code", "Fira Code Fallback", "Fira Mono", monospace',
    },
    {
        id: "system",
        label: "System UI",
        stack: "system-ui, -apple-system, sans-serif",
    },
    {
        id: "ui-monospace",
        label: "ui-monospace",
        stack: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
    },
] as const;

export const DEFAULT_CONFIG: ConfigBaseline = {
    preset: "default",
    font: {
        serif: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
        sans: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
        display: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
        mono: '"Fira Code", "Fira Code Fallback", "Fira Mono", monospace',
    },
    scaleBase: 16,
    hueShift: 0,
    grain: 0.035,
    density: "comfortable",
    radius: 10,
    cartoonShadow: true,
    dark: false,
};

// Story surfaces keep their authored comfortable spacing as CSS fallbacks.
// These values are deltas added on top, so an empty/default configurator
// delta remains visually identical to library tokens.
export const DENSITY_SCALE: Record<Density, { pad: string; gap: string }> = {
    cozy: { pad: "0.25rem", gap: "0.125rem" },
    comfortable: { pad: "0rem", gap: "0rem" },
    compact: { pad: "-0.25rem", gap: "-0.125rem" },
};

export const FONT_SLOT_VARS: Record<keyof FontSlots, string> = {
    serif: "--font-serif",
    sans: "--font-sans",
    display: "--font-display",
    mono: "--font-mono",
};

export const FIELD_CSS_VARS = {
    scaleBase: ["--type-body"],
    hueShift: ["--hue-shift"],
    grain: ["--glass-grain-opacity"],
    density: ["--density-pad", "--density-gap"],
    radius: ["--radius"],
    cartoonShadow: ["--shadow-card", "--shadow-card-hover"],
} as const satisfies Record<WritableField, readonly string[]>;
