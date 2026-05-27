export interface FontOption {
    name: string;
    family: string;
    category: "sans" | "serif" | "mono";
    axes: string;
    personality: string;
}

// AM-W7-η — the demo dogfoods the PUBLISHED brand faces. The display/serif
// option is Plus Jakarta Sans (glass-ui's brand display + serif face, OFL
// 1.1, shipped via the `./styles/fonts` export); the mono option is Fira
// Code (the canonical mono, same export). The legacy Fraunces option was
// retired — it is off the brand-font canon and glass-ui never shipped it.
// The "Plus Jakarta Sans Fallback" / "Fira Code Fallback" faces are the
// Capsize-calibrated system wrappers glass-ui ships alongside each face.
export const FONTS: FontOption[] = [
    {
        name: "Plus Jakarta Sans",
        family: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", system-ui, sans-serif',
        category: "sans",
        axes: "wght 200-800",
        personality:
            "glass-ui's published brand display + serif face. Self-hosted OFL 1.1 variable woff2, paired with a Capsize-calibrated fallback so the swap is no-shift.",
    },
    {
        name: "Fira Code",
        family: '"Fira Code", "Fira Code Fallback", "Fira Mono", monospace',
        category: "mono",
        axes: "wght 300-700",
        personality:
            "glass-ui's published canonical mono. Self-hosted OFL variable woff2 with programming ligatures and tabular numerics.",
    },
    {
        name: "System UI",
        family: "system-ui, -apple-system, sans-serif",
        category: "sans",
        axes: "—",
        personality: "Platform-native sans-serif. Zero network cost, maximum familiarity.",
    },
    {
        name: "ui-monospace",
        family: "ui-monospace, 'SF Mono', 'Cascadia Code', monospace",
        category: "mono",
        axes: "—",
        personality: "Platform-native monospace for code and tabular data.",
    },
];

export function applyFont(font: FontOption) {
    document.documentElement.style.setProperty("--font-display", font.family);
    document.documentElement.style.setProperty("--font-body", font.family);
}
