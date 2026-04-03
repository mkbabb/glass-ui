export interface FontOption {
    name: string;
    family: string;
    category: "sans" | "serif" | "mono";
    axes: string;
    personality: string;
}

export const FONTS: FontOption[] = [
    {
        name: "Fraunces",
        family: '"Fraunces", serif',
        category: "serif",
        axes: "opsz 9-144, wght 100-900, SOFT 0-100, WONK 0-1",
        personality: "Expressive old-style with optical size, softness, and wonkiness axes.",
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
