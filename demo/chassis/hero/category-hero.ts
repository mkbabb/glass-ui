/** Each section's hue index, which tints the shell's field on its routes. */
const SECTION_HUE: Record<string, number> = {
    foundations: 5,
    substrates: 6,
    forms: 8,
    display: 5,
    containers: 10,
    navigation: 0,
    dock: 6,
    data: 8,
    feedback: 8,
    motion: 10,
    compositions: 4,
};

export function categoryHue(id: string): number {
    return SECTION_HUE[id] ?? 7;
}
