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
// BD.W-SECTION-HUE-WARM-FENCE (consumed here) — the `sectionHue` ramp INDEX is
// the ONE color event (the IconChip POP backplate + the eyebrow + the specimen's
// derived palette). The prior index set seated SIX categories on COOL ramp slots
// — substrates=3 (teal 222.8), forms=2 (indigo 265.5), navigation=11 (ocean 208),
// motion=12 (periwinkle 291.9), containers=9 (slate 239.6), data=1 (purple 305.9),
// foundations=7 (violet 317.5) — so the chip + the `field`/`metric`/`surface`
// specimen palette painted teal/navy in [180,270], which the warm brief forbids
// (the user-screenshot teal). THE FENCE: every `sectionHue` now seats on a WARM
// ramp slot whose degree ∈ {red <25 / >340} ∪ [25,95] ∪ warm-green — teal/navy is
// impossible BY CONSTRUCTION at the index, before any clamp. The warm ramp slots
// (by degree): 6 tomato 30.4 · 8 ruby 8.4 · 0 rose 359.8 · 5 amber 69.6 · 10
// olive 128.8 (warm-green) · 4 forest 171.1 (the coolest still-warm green tail).
// Each category keeps a DISTINCT warm slot so the landings stay legible-apart
// (distinct ≠ rainbow-noise — the one-color-event restraint holds).
export const CATEGORY_HERO: Record<string, CategoryHero> = {
    foundations: {
        icon: Compass,
        sectionHue: 5, // amber — the system root (warmed off violet-7)
        heroPalette: "cat-foundations",
        bgKind: "paper",
        previewKind: "glyph",
    },
    substrates: {
        icon: Droplet,
        sectionHue: 6, // tomato — the GL field band (warmed off teal-3)
        heroPalette: "cat-substrates",
        bgKind: "aurora",
        previewKind: "field",
    },
    forms: {
        icon: FormInput,
        sectionHue: 8, // ruby — the input register (warmed off indigo-2)
        heroPalette: "cat-forms",
        bgKind: "grid",
        previewKind: "control",
    },
    display: {
        icon: Shapes,
        sectionHue: 5, // amber — the atomic primitives (already warm)
        heroPalette: "cat-display",
        bgKind: "paper",
        previewKind: "surface",
    },
    containers: {
        icon: Boxes,
        sectionHue: 10, // olive — the glass surfaces (warmed off slate-9)
        heroPalette: "cat-containers",
        bgKind: "grid",
        previewKind: "surface",
    },
    navigation: {
        icon: Navigation,
        sectionHue: 0, // rose — the nav chrome (warmed off ocean-11)
        heroPalette: "cat-navigation",
        bgKind: "aurora",
        previewKind: "control",
    },
    dock: {
        icon: PanelBottom,
        sectionHue: 6, // tomato — the headline primitive (already warm)
        heroPalette: "cat-dock",
        bgKind: "grid",
        previewKind: "surface",
    },
    data: {
        icon: Database,
        sectionHue: 8, // ruby — the ledger band (warmed off purple-1)
        heroPalette: "cat-data",
        bgKind: "grid",
        previewKind: "metric",
    },
    feedback: {
        icon: Bell,
        sectionHue: 8, // ruby — the status band (already warm)
        heroPalette: "cat-feedback",
        bgKind: "paper",
        previewKind: "surface",
    },
    motion: {
        icon: Sparkles,
        sectionHue: 10, // olive — the drift band (warmed off periwinkle-12)
        heroPalette: "cat-motion",
        bgKind: "constellation",
        previewKind: "field",
    },
    compositions: {
        icon: LayoutDashboard,
        sectionHue: 4, // forest — the real scenes (already warm-tail)
        heroPalette: "cat-compositions",
        bgKind: "grid",
        previewKind: "surface",
    },
};

/** Resolve a category's hero descriptor (the section landing + front-door source). */
export function categoryHero(id: string): CategoryHero | undefined {
    return CATEGORY_HERO[id];
}

// ═══════════════════════════════════════════════════════════════════════
// BD.W-BENTO-SPECIMEN — the live specimen registry (the gray-window cure).
// ───────────────────────────────────────────────────────────────────────
// The bento `#preview` window was a GRAY box + a placeholder droplet glyph,
// repeated 11× (the user-screenshot defect: "useless large GRAY placeholders").
// The cure: each card mounts a LIVE miniature of its category's marquee
// component over the warm §3 field — a widget that SHOWS its component, never
// an app-icon glyph (the iOS-27 home-screen truth).
//
// DRY: the specimen KIND is read from the category's existing `previewKind`
// (ONE switch, no second source of truth — the F4 fold DROPS the manifest
// `specimen?` override). This registry only carries the per-kind FROZEN PROPS
// the dispatcher needs (the control row's pre-set value, the metric's figure +
// semantic delta) — data the `previewKind` enum cannot itself express.
// ═══════════════════════════════════════════════════════════════════════

/** The frozen props a specimen renders with (per `previewKind`). A bounded,
 *  inert, single-paint descriptor — never a second running GL context. */
export interface SpecimenSpec {
    /** The dispatch kind — read straight off the category `previewKind`. */
    kind: PreviewKind;
    /** `control`: the pre-set slider fill (an ARRAY — reka modelValue is an
     *  array; a bare `62` paints ZERO thumbs, the binding-verification trap). */
    sliderValue?: number[];
    /** `metric`: the headline figure + unit + the SEMANTIC delta (green up /
     *  red down — carved OUT of the warm-fence, a named exception). */
    metricValue?: string | number;
    metricUnit?: string;
    metricDelta?: { value: string; dir: "up" | "down" };
}

/** The ONE per-category specimen spec — keyed off the SAME `previewKind` the
 *  category already declares (DRY). The control + metric kinds carry their
 *  frozen props; field/surface/glyph derive everything from the kind + hue. */
export function categorySpecimen(id: string): SpecimenSpec {
    const kind = categoryHero(id)?.previewKind ?? "glyph";
    switch (kind) {
        case "control":
            return { kind, sliderValue: [62] };
        case "metric":
            return {
                kind,
                metricValue: "99.95",
                metricUnit: "%",
                metricDelta: { value: "+2.4", dir: "up" },
            };
        default:
            return { kind };
    }
}

/** The per-category section hue — the ONE color event (the chip + eyebrow). The
 *  front door + the section landing read THIS, never a hand-rolled SECTION_HUE
 *  duplicate. Falls back to the violet system-root hue for an unknown id. */
export function categoryHue(id: string): number {
    return CATEGORY_HERO[id]?.sectionHue ?? 7;
}
