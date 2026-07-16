import type { HeroPaletteKey, StoryBackgroundKind } from "./aurora-hero";

interface CategoryField {
    sectionHue: number;
    heroPalette: HeroPaletteKey;
    bgKind: StoryBackgroundKind;
}

/** Demo-only atmosphere. Component identity belongs to each real specimen. */
export const CATEGORY_HERO: Record<string, CategoryField> = {
    foundations: {
        sectionHue: 5,
        heroPalette: "cat-foundations",
        bgKind: "paper",
    },
    substrates: {
        sectionHue: 6,
        heroPalette: "cat-substrates",
        bgKind: "aurora",
    },
    forms: {
        sectionHue: 8,
        heroPalette: "cat-forms",
        bgKind: "grid",
    },
    display: {
        sectionHue: 5,
        heroPalette: "cat-display",
        bgKind: "paper",
    },
    containers: {
        sectionHue: 10,
        heroPalette: "cat-containers",
        bgKind: "grid",
    },
    navigation: {
        sectionHue: 0,
        heroPalette: "cat-navigation",
        bgKind: "aurora",
    },
    dock: {
        sectionHue: 6,
        heroPalette: "cat-dock",
        bgKind: "grid",
    },
    data: {
        sectionHue: 8,
        heroPalette: "cat-data",
        bgKind: "grid",
    },
    feedback: {
        sectionHue: 8,
        heroPalette: "cat-feedback",
        bgKind: "paper",
    },
    motion: {
        sectionHue: 10,
        heroPalette: "cat-motion",
        bgKind: "constellation",
    },
    compositions: {
        sectionHue: 4,
        heroPalette: "cat-compositions",
        bgKind: "grid",
    },
};

export function categoryHue(id: string): number {
    return CATEGORY_HERO[id]?.sectionHue ?? 7;
}
