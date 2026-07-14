// category-hero.ts — the per-category hero descriptor map (BC.W-HERO-AUDACIOUS
// Part B). EVERY category landing + every front-door redirect card reads its
// identity from ONE source: the `CATEGORY_HERO` map. Each of the 11 categories
// gets a DISTINCT {icon, sectionHue, heroPalette, bgKind} so you instantly know
// WHERE you are — substrates wears a Droplet + an aurora-blue field, motion wears
// Sparkles + a constellation-violet field, forms wears a FormInput + a grid-teal
// field.
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
//   - One GL context per route (BA.W-STAGE): `bgKind` honors the budget — live
//     GL clustered on the GL-budget bands, the dense bands ride the static
//     grid/paper wash. The bento landing tiles are 0-GL by construction (the
//     per-story tile ladder — BI.W-LIVE-TILES — resolves a live DOM component or a
//     frozen data-URI still, never a second running context).

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
}

/**
 * The 11 newly-begotten section landings' primary consumer (Part E). Each
 * category → its DISTINCT identity. The `sectionHue` is the ONE color event; the
 * `heroPalette` key matches the `category-hero.ts`-registered per-category aurora
 * palette in `aurora-hero.ts` (the `cat-<id>` keys); `bgKind` reconciles with the
 * Band-4 `CATEGORY_DEFAULT_BG` one-GL budget.
 */
// BD.W-SECTION-HUE-WARM-FENCE (consumed here) — the `sectionHue` ramp INDEX is
// the ONE color event (the IconChip POP backplate + the eyebrow + the derived
// palette). Every `sectionHue` seats on a WARM ramp slot whose degree ∈ {red <25
// / >340} ∪ [25,95] ∪ warm-green — teal/navy is impossible BY CONSTRUCTION at the
// index, before any clamp. The warm ramp slots (by degree): 6 tomato 30.4 · 8 ruby
// 8.4 · 0 rose 359.8 · 5 amber 69.6 · 10 olive 128.8 (warm-green) · 4 forest 171.1
// (the coolest still-warm green tail). Each category keeps a DISTINCT warm slot so
// the landings stay legible-apart (distinct ≠ rainbow-noise — the restraint holds).
export const CATEGORY_HERO: Record<string, CategoryHero> = {
    foundations: {
        icon: Compass,
        sectionHue: 5, // amber — the system root (warmed off violet-7)
        heroPalette: "cat-foundations",
        bgKind: "paper",
    },
    substrates: {
        icon: Droplet,
        sectionHue: 6, // tomato — the GL field band (warmed off teal-3)
        heroPalette: "cat-substrates",
        bgKind: "aurora",
    },
    forms: {
        icon: FormInput,
        sectionHue: 8, // ruby — the input register (warmed off indigo-2)
        heroPalette: "cat-forms",
        bgKind: "grid",
    },
    display: {
        icon: Shapes,
        sectionHue: 5, // amber — the atomic primitives (already warm)
        heroPalette: "cat-display",
        bgKind: "paper",
    },
    containers: {
        icon: Boxes,
        sectionHue: 10, // olive — the glass surfaces (warmed off slate-9)
        heroPalette: "cat-containers",
        bgKind: "grid",
    },
    navigation: {
        icon: Navigation,
        sectionHue: 0, // rose — the nav chrome (warmed off ocean-11)
        heroPalette: "cat-navigation",
        bgKind: "aurora",
    },
    dock: {
        icon: PanelBottom,
        sectionHue: 6, // tomato — the headline primitive (already warm)
        heroPalette: "cat-dock",
        bgKind: "grid",
    },
    data: {
        icon: Database,
        sectionHue: 8, // ruby — the ledger band (warmed off purple-1)
        heroPalette: "cat-data",
        bgKind: "grid",
    },
    feedback: {
        icon: Bell,
        sectionHue: 8, // ruby — the status band (already warm)
        heroPalette: "cat-feedback",
        bgKind: "paper",
    },
    motion: {
        icon: Sparkles,
        sectionHue: 10, // olive — the drift band (warmed off periwinkle-12)
        heroPalette: "cat-motion",
        bgKind: "constellation",
    },
    compositions: {
        icon: LayoutDashboard,
        sectionHue: 4, // forest — the real scenes (already warm-tail)
        heroPalette: "cat-compositions",
        bgKind: "grid",
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
