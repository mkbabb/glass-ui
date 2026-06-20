// category-hero.ts — the per-category hero descriptor map (BC.W-HERO-AUDACIOUS
// Part B). EVERY category landing + every front-door redirect card reads its
// identity from ONE source: the `CATEGORY_HERO` map. Each of the 11 categories
// gets a DISTINCT {icon, sectionHue, heroPalette, bgKind, previewKind} so you
// instantly know WHERE you are — substrates wears a Droplet + an aurora-blue
// field, motion wears Sparkles + a constellation-violet field, forms wears a
// FormInput + a grid-teal field.
//
// THE ONE-COLOR-EVENT RESTRAINT (the herostudios discipline, the binding
// proportion fence): the per-category `sectionHue` is the ONE color event per
// hero — it tints the <IconChip> backplate + the eyebrow ONLY; the audacious
// display title + the body stay warm ink. Distinct ≠ rainbow-noise.
//
// THE FENCES:
//   - No library token absorbs a demo hue (presets-in-consumers): the map is
//     DEMO manifest data; the `sectionHue` is a `--section-color-N` ramp INDEX,
//     never a minted library token.
//   - No re-rolled color math: the per-category `heroPalette` is derived by
//     `sectionColorToHeroPalette` (aurora-hero.ts), which composes the `/color`
//     leaf `cssToOklch` (value.js) — `proof:single-color-core` holds.
//   - One GL context per route (CLAUDE.md §BA.W-STAGE): `bgKind` honors the
//     budget — live GL clustered on the GL-budget bands, the dense bands ride the
//     static grid/paper wash. The bento previews are budget-safe stills.

import {
    Compass,
    Droplet,
    FormInput,
    Shapes,
    Boxes,
    Navigation,
    PanelBottom,
    Database,
    Bell,
    Sparkles,
    LayoutDashboard,
    type LucideIcon,
} from "@lucide/vue";
import type { HeroPaletteKey, StoryBackgroundKind } from "./aurora-hero";

/**
 * The bento preview KIND — what a `<SectionPreviewCard>` renders in its inline
 * mini-preview (BC.W-HERO-AUDACIOUS Part C). A budget-safe descriptor: the card
 * renders a bounded, inert, single-paint thumbnail of the target's marquee
 * specimen — NEVER a second running GL context on the landing (the one-GL
 * budget). `"glyph"` is the universal floor (the category icon over a tint).
 */
export type PreviewKind = "glyph" | "field" | "control" | "surface" | "metric";

/** The per-category hero descriptor — the section-landing's identity moment. */
export interface CategoryHero {
    /** The category's own lucide glyph — the <IconChip> POP (the D6 icon fix). */
    icon: LucideIcon;
    /** The `--section-color-N` ramp index — the ONE color event (chip + eyebrow). */
    sectionHue: number;
    /** The per-category aurora palette KEY (derived from the section hue). */
    heroPalette: HeroPaletteKey;
    /** The per-category field — honoring the one-GL-per-route budget. */
    bgKind: StoryBackgroundKind;
    /** The bento preview register the cards render (budget-safe still). */
    previewKind: PreviewKind;
}

/**
 * The 11 newly-begotten section landings' primary consumer (Part E). Each
 * category → its DISTINCT identity. The `sectionHue` is the ONE color event; the
 * `heroPalette` key matches the `category-hero.ts`-registered per-category aurora
 * palette in `aurora-hero.ts` (the `cat-<id>` keys); `bgKind` reconciles with the
 * Band-4 `CATEGORY_DEFAULT_BG` one-GL budget.
 */
export const CATEGORY_HERO: Record<string, CategoryHero> = {
    foundations: {
        icon: Compass,
        sectionHue: 7, // violet — the system root
        heroPalette: "cat-foundations",
        bgKind: "paper",
        previewKind: "glyph",
    },
    substrates: {
        icon: Droplet,
        sectionHue: 3, // teal — the aurora-blue GL field band
        heroPalette: "cat-substrates",
        bgKind: "aurora",
        previewKind: "field",
    },
    forms: {
        icon: FormInput,
        sectionHue: 2, // indigo — the input register
        heroPalette: "cat-forms",
        bgKind: "grid",
        previewKind: "control",
    },
    display: {
        icon: Shapes,
        sectionHue: 5, // amber — the atomic primitives
        heroPalette: "cat-display",
        bgKind: "paper",
        previewKind: "surface",
    },
    containers: {
        icon: Boxes,
        sectionHue: 9, // slate — the glass surfaces
        heroPalette: "cat-containers",
        bgKind: "grid",
        previewKind: "surface",
    },
    navigation: {
        icon: Navigation,
        sectionHue: 11, // ocean — the nav chrome
        heroPalette: "cat-navigation",
        bgKind: "aurora",
        previewKind: "control",
    },
    dock: {
        icon: PanelBottom,
        sectionHue: 6, // tomato — the headline primitive
        heroPalette: "cat-dock",
        bgKind: "grid",
        previewKind: "surface",
    },
    data: {
        icon: Database,
        sectionHue: 1, // purple — the ledger band
        heroPalette: "cat-data",
        bgKind: "grid",
        previewKind: "metric",
    },
    feedback: {
        icon: Bell,
        sectionHue: 8, // ruby — the status band
        heroPalette: "cat-feedback",
        bgKind: "paper",
        previewKind: "surface",
    },
    motion: {
        icon: Sparkles,
        sectionHue: 12, // periwinkle — the constellation-violet drift band
        heroPalette: "cat-motion",
        bgKind: "constellation",
        previewKind: "field",
    },
    compositions: {
        icon: LayoutDashboard,
        sectionHue: 4, // forest — the real scenes
        heroPalette: "cat-compositions",
        bgKind: "grid",
        previewKind: "surface",
    },
};

/** Resolve a category's hero descriptor (the section landing + front-door source). */
export function categoryHero(id: string): CategoryHero | undefined {
    return CATEGORY_HERO[id];
}

/** The per-category section hue — the ONE color event (the chip + eyebrow). The
 *  front door + the section landing read THIS, never a hand-rolled SECTION_HUE
 *  duplicate. Falls back to the violet system-root hue for an unknown id. */
export function categoryHue(id: string): number {
    return CATEGORY_HERO[id]?.sectionHue ?? 7;
}
