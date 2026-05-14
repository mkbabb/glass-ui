// demo/configurator/preset-editor/defaults.ts — default presets, constants,
// and CSS-variable name tables.
//
// O.W3 Lane C — split from the prior `usePresetEditor.ts` god-module per Rβ.
// Const-only module; no runtime side effects.

import type { ConfigBaseline, Density, FontOption, FontSlots, WritableField } from "./types";

export const STORAGE_KEY = "glass-ui-demo-config";
export const PRESET_LINK_ID = "glass-ui-demo-preset-link";

export const FONT_OPTIONS: readonly FontOption[] = [
    {
        id: "cm-serif",
        label: "Computer Modern Serif",
        stack: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
    },
    {
        id: "fraunces",
        label: "Fraunces",
        stack: '"Fraunces", Georgia, serif',
    },
    {
        id: "general-sans",
        label: "General Sans",
        stack: '"General Sans", "Inter", system-ui, sans-serif',
    },
    {
        id: "inter",
        label: "Inter",
        stack: '"Inter", system-ui, sans-serif',
    },
    {
        id: "jetbrains-mono",
        label: "JetBrains Mono",
        stack: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
    },
    {
        id: "fira-code",
        label: "Fira Code",
        stack: '"Fira Code", ui-monospace, monospace',
    },
    {
        id: "system",
        label: "System",
        stack: "system-ui, -apple-system, sans-serif",
    },
] as const;

export const DEFAULT_CONFIG: ConfigBaseline = {
    preset: "default",
    font: {
        serif: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
        sans: '"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif',
        display: '"Fraunces", Georgia, serif',
        mono: '"Fira Code", "Fira Mono", monospace',
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
