// AX.W57 (P7) — demo hero-radial reauthor helper.
//
// The Class-A demo heros (hero / intro / paper-glass / auth-shell) hand-rolled
// multi-stop radial-gradient washes keyed off the `--section-color-*` brand
// ramp. P7 replaces those static radials with a LIVE `<Aurora>` painterly
// drift that keeps the SAME page-identity hues — so each hero gains life
// (drift) + idiom (one shared shipped substrate) without losing the
// brand-color seam.
//
// Aurora's `config.palette` is a JS `OklchStop[]` (the shader reads stops, not
// `var(--section-color-*)`), so this factory mirrors the section-ramp HUES
// (tokens.css §colors: rose 359.8, indigo 265.5, amber 69.6, …) into lighter-
// L painterly stops. A consumer re-tinting the wash overrides the palette here
// (the demo-side analogue of overriding `--section-color-*`).
//
// `renderMode="auto"` resolves to the CSS-gradient placeholder
// (`paletteToCssGradient`) on low-power / reduced-motion / save-data devices —
// itself a radial/linear wash, so the replacement is strictly >= the prior
// static radial on every device. One live GL context per mounted route only
// (the demo router mounts ONE story page at a time — within the WebGL budget).

import type { AuroraConfig } from "@glass/components/custom/aurora";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/custom/aurora";
import { cssToOklch } from "@glass/composables/color";

/** A painterly hero stop mirroring a `--section-color-*` brand hue, lifted to
 *  a pastel-wash L/C the static radial blooms used. */
export type HeroStop = { L: number; C: number; h: number };

/** The brand section-ramp hues this demo's heros paint with (tokens.css §colors). */
const BASE_HERO_PALETTES = {
    /** hero.vue / intro.vue — rose → indigo → amber (section-color-0/2/5). */
    "rose-indigo-amber": [
        { L: 0.78, C: 0.13, h: 359.8 }, // rose      (--section-color-0)
        { L: 0.74, C: 0.12, h: 265.5 }, // indigo    (--section-color-2)
        { L: 0.86, C: 0.1, h: 69.6 }, // amber     (--section-color-5)
        { L: 0.92, C: 0.04, h: 30.0 }, // warm cream tail
    ],
    /** paper-glass.vue — amber → indigo → rose (section-color-5/2/0 order). */
    "amber-indigo-rose": [
        { L: 0.86, C: 0.1, h: 69.6 }, // amber     (--section-color-5)
        { L: 0.74, C: 0.12, h: 265.5 }, // indigo    (--section-color-2)
        { L: 0.78, C: 0.13, h: 359.8 }, // rose      (--section-color-0)
        { L: 0.93, C: 0.03, h: 80.0 }, // cream tail
    ],
    /** auth-shell.vue brand panel — purple → tomato (section-color-1/6). */
    "purple-tomato": [
        { L: 0.74, C: 0.12, h: 305.9 }, // purple    (--section-color-1)
        { L: 0.76, C: 0.13, h: 30.4 }, // tomato    (--section-color-6)
        { L: 0.9, C: 0.04, h: 350.0 }, // warm tail
    ],
} satisfies Record<string, HeroStop[]>;

// BC.W-HERO-AUDACIOUS Part B — the 13-stop `--section-color-N` ramp as the
// per-category hero-palette source (the untapped per-category hue source the
// deferral named). The literals are the LIGHT-mode library token values
// (tokens/color-radius.css §6) read AS DATA — `sectionColorToHeroPalette` parses
// each through `cssToOklch` (value.js — `proof:single-color-core` holds, ZERO
// re-rolled OKLCh math) and LIFTS the dark jewel L (≈0.49–0.60) into the
// pastel-wash band the existing hero stops use, so a category hero reads DISTINCT
// (substrates=aurora-blue, motion=constellation-violet, forms=grid-teal …) while
// staying the calm painterly drift a text-dense hero wants.
export const SECTION_COLOR_OKLCH: readonly string[] = [
    "oklch(0.552 0.192 359.8)", //  0 rose
    "oklch(0.502 0.165 305.9)", //  1 purple
    "oklch(0.484 0.163 265.5)", //  2 indigo
    "oklch(0.542 0.089 222.8)", //  3 teal-cyan
    "oklch(0.551 0.088 171.1)", //  4 forest
    "oklch(0.530 0.124 69.6)", //   5 amber
    "oklch(0.579 0.201 30.4)", //   6 tomato-red
    "oklch(0.532 0.180 317.5)", //  7 violet
    "oklch(0.520 0.176 8.4)", //    8 ruby
    "oklch(0.492 0.038 239.6)", //  9 slate-blue
    "oklch(0.556 0.103 128.8)", // 10 olive
    "oklch(0.601 0.092 208.0)", // 11 ocean
    "oklch(0.513 0.163 291.9)", // 12 periwinkle
];

// BG.W-FIELD-ACCENT-RECONCILE — the section hue DEGREES, derived ONCE from
// SECTION_COLOR_OKLCH via the `/color` leaf `cssToOklch` (value.js — no re-rolled
// OKLCh math). This SINGLE source replaces the verbatim `SECTION_HUE_DEG` literal
// table warm-field.ts carried (the duplicate is FOLDED — one degree source, one
// warm projection). Precomputed once (not per-call).
const SECTION_HUE_DEG_DERIVED: readonly number[] = SECTION_COLOR_OKLCH.map(
    (s) => cssToOklch(s).h,
);

/** The section ramp hue DEGREE for a ramp index (the `--section-color-N` index,
 *  modulo 13). The ONE degree source the warm projection reads — derived from the
 *  SECTION_COLOR_OKLCH ramp through `cssToOklch`, never a parallel literal table. */
export function sectionHueDeg(idx: number): number {
    return SECTION_HUE_DEG_DERIVED[((idx % 13) + 13) % 13]!;
}

// The pastel-wash L/C band the existing painterly hero stops occupy (HERO_PALETTES
// above run L 0.74–0.93, C 0.03–0.13) — a jewel section hue is LIFTED into it so the
// hero is a gentle drift, never the saturated chart ink.
const HERO_WASH_L = 0.8; // the lifted lightness for the dominant stop
const HERO_WASH_C_CAP = 0.13; // the chroma ceiling (the calm-drift bound)
const HERO_CREAM_TAIL: HeroStop = { L: 0.92, C: 0.04, h: 30.0 }; // the warm-cream settle

// BD.W-SECTION-HUE-WARM-FENCE — warm-project a raw color-wheel degree into the
// warm aurora band [25,95]. A monotone fold around the warm anchor (amber ~62)
// that keeps the 12 categories DISTINCT while landing every dominant stop warm —
// the teal/navy hues (the user-screenshot defect) collapse toward terracotta/sand
// and CANNOT paint cool. The same projection shape as `warm-field.ts`'s
// `projectWarm` (the field floor) so the chassis reads coherent; the +18°
// neighbour stop below keeps the SPECIMEN aurora a polychrome spread DISTINCT
// from the flat field floor (the F7 distinct-from-field fold).
export const WARM_LO = 25;
export const WARM_HI = 95;
/** Warm-project a raw color-wheel degree into the warm band [25,95] — the SINGLE
 *  warm projection (BG.W-FIELD-ACCENT-RECONCILE folded warm-field.ts's identical
 *  `projectWarm` onto this). Reds → coral floor; the warm wedge passes; cool folds
 *  across the amber→sand span (never teal/navy). */
export function warmProjectHue(deg: number): number {
    const h = ((deg % 360) + 360) % 360;
    if (h >= 340 || h < 25) return 38; // reds → coral-terracotta floor
    if (h <= 95) return h; // already in band
    const t = (h - 95) / (340 - 95); // 0 green-edge → 1 magenta-edge
    return WARM_LO + 20 + t * (WARM_HI - (WARM_LO + 20));
}
const clampWarm = (h: number): number =>
    Math.max(WARM_LO, Math.min(WARM_HI, h));

/**
 * Derive a painterly hero palette from a `--section-color-N` ramp index — the
 * per-category distinctness source (BC.W-HERO-AUDACIOUS Part B). Composes the
 * `/color` leaf `cssToOklch` (value.js — no re-rolled OKLCh math) to read the
 * section hue, WARM-PROJECTS it into [25,95] (the warm-fence — no teal/navy
 * specimen by construction), then lifts it into the pastel-wash band a calm hero
 * drifts in: a 3-stop {hue · a warmer neighbour · warm-cream tail} ramp on the
 * ONE warm hue (NOT a rainbow — the dominant stop carries the category identity).
 */
export function sectionColorToHeroPalette(n: number): HeroStop[] {
    const css = SECTION_COLOR_OKLCH[((n % 13) + 13) % 13]!;
    const { h, C } = cssToOklch(css);
    const c = Math.min(C, HERO_WASH_C_CAP);
    const warmH = warmProjectHue(h); // the warm-fenced dominant hue
    return [
        { L: HERO_WASH_L, C: c, h: warmH }, // the category hue — the dominant warm wash
        // a warmer-neighbour stop for a polychrome spread (clamped warm so the
        // specimen reads DISTINCT-from-field yet never cools out of the fence).
        { L: HERO_WASH_L + 0.06, C: c * 0.78, h: clampWarm(warmH + 18) },
        { ...HERO_CREAM_TAIL }, // the warm-cream settle (the shared identity tail)
    ];
}

/** The per-category section hue index → the hero palette KEY. The 11 categories
 *  each get a DISTINCT section hue (the `CATEGORY_HERO` map in category-hero.ts
 *  is the single source; this mirror is keyed by the same index so the palette
 *  catalogue carries one entry per category). The `as const` keeps the literal
 *  keys so `HeroPaletteKey` carries the 11 `cat-<id>` entries. */
const CATEGORY_PALETTE_HUES = {
    "cat-foundations": 7, // violet  — the system root
    "cat-substrates": 3, // teal    — the GL field band (aurora-blue family)
    "cat-forms": 2, // indigo  — the input register
    "cat-display": 5, // amber   — the atomic primitives
    "cat-containers": 9, // slate   — the glass surfaces
    "cat-navigation": 11, // ocean   — the nav chrome
    "cat-dock": 6, // tomato  — the headline primitive
    "cat-data": 1, // purple  — the ledger band
    "cat-feedback": 8, // ruby    — the status band
    "cat-motion": 12, // periwinkle — the drift band (constellation-violet family)
    "cat-compositions": 4, // forest  — the real scenes
} as const;

type CategoryPaletteKey = keyof typeof CATEGORY_PALETTE_HUES;

// Compose the base painterly palettes with the 11 per-category section-derived
// palettes (one keyed entry per category) so `HeroPaletteKey` carries both the
// named editorial palettes AND the per-category distinct fields. The mapped-type
// build preserves the literal `cat-<id>` keys (a bare `Object.fromEntries` widens
// to `Record<string, …>` and erases them).
const CATEGORY_HERO_PALETTES = Object.fromEntries(
    (Object.keys(CATEGORY_PALETTE_HUES) as CategoryPaletteKey[]).map((key) => [
        key,
        sectionColorToHeroPalette(CATEGORY_PALETTE_HUES[key]),
    ]),
) as Record<CategoryPaletteKey, HeroStop[]>;

const HERO_PALETTES = {
    ...BASE_HERO_PALETTES,
    ...CATEGORY_HERO_PALETTES,
} satisfies Record<string, HeroStop[]>;

export type HeroPaletteKey = keyof typeof HERO_PALETTES;

/**
 * The per-page background descriptor a story row declares. The string shorthand
 * names one of the five substrates; the object form tunes the Aurora palette or
 * the recede-behind-content opacity ceiling.
 *
 *   "paper"         — a quiet warm-cream grain wash.
 *   "grid"          — a token-driven blueprint ruled grid (static CSS, the zero-GL default).
 *   "liquid-grid"   — the SUFFUSION register: a near-invisible LIQUID paper-grid
 *                     (a low-fieldAlpha, large-pitch, slow-warp <PaperGrid>) full-bleed
 *                     behind page content (BC.W-VIZ-PAPERGRID — §E "suffuse it
 *                     throughout the site as a subtle background element"; the opt-in
 *                     one-GL-per-route hero upgrade of the static `grid` kind).
 *   "aurora"        — a live painterly drift on the brand hues.
 *   "constellation" — a drifting proximity-graph lattice.
 *   "fourier"       — a reconstructing elliptic Fourier curve.
 *
 * A GooBlob is a CONTAINED creature (fixed aspect-ratio), NOT a full-bleed
 * page-field — so it is deliberately NOT a background kind (W-BLOB-REBUILD).
 */
export type StoryBackgroundKind =
    | "paper"
    | "grid"
    | "liquid-grid"
    | "aurora"
    | "constellation"
    | "fourier";

export type StoryBackground =
    | StoryBackgroundKind
    | {
          kind: StoryBackgroundKind;
          /** Aurora palette (the "aurora" kind only). */
          palette?: HeroPaletteKey;
          /** Opacity ceiling — how far the live substrate recedes (0..1). */
          intensity?: number;
      };

/**
 * Build an `AuroraConfig` for a demo hero from a named brand palette. The
 * nuclei + warp + medium ride the calm `DEFAULT_AURORA_CONFIG` so the drift is
 * a gentle painterly wash (the hero is text-dense — pair with
 * `opacityCeiling` on the `<Aurora>` so the drift recedes behind the prose).
 */
export function heroAuroraConfig(palette: HeroPaletteKey): AuroraConfig {
    return {
        ...DEFAULT_AURORA_CONFIG,
        palette: HERO_PALETTES[palette].map((s) => ({ ...s })),
        // A slightly slower breath + gentler drift than the studio default —
        // a hero backdrop should drift, not animate at it.
        breathPeriod: 48,
        nucleiDrift: 0.012,
        paletteDrift: 0.012,
        saturation: 0.95,
    };
}

/**
 * BG.W-FIELD-AURORA (M2) — the SHELL field config: the ONE recessive aurora that
 * paints behind every NON-focal route, replacing the retired `.paper-field` CSS
 * plane. The hue is the route's `warmFieldHue(categoryId)` (already warm-projected
 * into [25,95]); the shell re-uploads it on the persisted node per route.
 *
 * The material is RECESSIVE — "sunrise behind frosted glass", NOT the brand-vivid
 * studio register. TWO mandatory legs:
 *   - `vividness: 0` — neuters the shader re-pigment FLOOR (aurora.frag VIVID_TARGET
 *     0.115 lifts every pale fragment to C≥0.115 whenever uVividness>0); without it
 *     the recessive palette is re-saturated past the C≤0.10 ceiling.
 *   - an EXPLICIT recessive C 0.04–0.07 palette (NOT a hue-rotation of
 *     `DEFAULT_AURORA_CONFIG`, whose C 0.16/0.13/0.095 zones paint C>0.10 at the
 *     worst-cool sand projections). Measured OKLab C max well under the 0.10 ceiling.
 * The drift is the calm hero band (breathPeriod 48, low nuclei/palette drift) so the
 * field reads effectively static (WCAG 2.2.2 by being non-animated — no pause
 * control owed on the shell field; the in-/substrates focal auroras keep theirs).
 */
export function shellAuroraConfig(hue: number): AuroraConfig {
    const h = clampWarm(hue);
    return {
        ...DEFAULT_AURORA_CONFIG,
        // The EXPLICIT recessive LIGHT palette — a warm spread on the ONE route hue,
        // all chroma ≤ 0.07 so even the warm-projected worst-cool sand stays under
        // the C≤0.10 ceiling (no conic foil, no brown, no speckle). The L band is
        // LIFTED ~0.02–0.03 brighter than the prior 0.88–0.94 (BG.W-FIELD-AURORA
        // re-paint #3): a brighter recessive field clears the secondary light-mode
        // eyebrow/blurb `--muted-foreground` register over the composited field
        // (3.85:1 → ≥4.5:1) while staying L≥0.85 (the recessive precondition) and
        // unmistakably WARM (the chroma is kept).
        palette: [
            { L: 0.94, C: 0.055, h }, // the route hue — the dominant warm wash
            { L: 0.93, C: 0.065, h: clampWarm(h + 14) }, // a warmer neighbour
            { L: 0.95, C: 0.05, h: clampWarm(h - 10) }, // a cooler-warm neighbour
            { L: 0.96, C: 0.04, h: 40 }, // the warm-cream settle tail
        ],
        vividness: 0,
        breathPeriod: 48,
        nucleiDrift: 0.012,
        paletteDrift: 0.012,
        saturation: 0.95,
    };
}

/**
 * BG.W-FIELD-AURORA (re-paint #1) — the DARK-MODE shell field config: the
 * dark-aware twin of `shellAuroraConfig`. The light palette (L 0.85+) at
 * opacityCeiling 0.5 composites over the near-black W-DARK-MATERIAL dark page to a
 * mid-light warm-BROWN wash (composited L 0.55–0.70) that erases the dark identity
 * AND drops the hero h1 / muted body text far below AA in both engines (the FAIL
 * the re-paint verdict named). This config swaps the palette to a LOW-L WARM-EMBER
 * spread — the W-DARK-MATERIAL luminous-dark transmissive model (the SectionPreviewCard
 * dark preview-field discipline applied to the page-wide shell): low lightness
 * (L 0.17–0.25), warm hue, chroma KEPT (C 0.045–0.07) so the field GLOWS
 * amber/terracotta rather than collapsing to a charcoal slab. At the SAME shell
 * opacityCeiling 0.5 it composites to L ≈ 0.12–0.16 over the dark page — a light
 * hero h1 clears >10:1, the `--muted-foreground` body clears ≥4.5:1 — while reading
 * as a deep warm-ember atmospheric drift, never a light-tan wash.
 *
 * The TWO recessive legs are preserved (vividness:0 + chroma ≤ 0.10, no conic/brown/
 * speckle); only the L band moves DOWN for the dark composite. It rides the same calm
 * drift (breathPeriod 48, low nuclei/palette drift) so it reads effectively static.
 */
export function shellAuroraConfigDark(hue: number): AuroraConfig {
    const h = clampWarm(hue);
    return {
        ...DEFAULT_AURORA_CONFIG,
        // The DARK warm-EMBER recessive palette — low L (the luminous-dark model),
        // warm hue, chroma kept so the dark field GLOWS warm-ember over the near-black
        // page (never a charcoal/metallic slab). composite L ≈ 0.12–0.16 at ceiling 0.5.
        palette: [
            { L: 0.22, C: 0.06, h }, // the route hue — the warm-ember dominant
            { L: 0.25, C: 0.07, h: clampWarm(h + 14) }, // a warmer-ember neighbour (the brightest nuclei)
            { L: 0.19, C: 0.05, h: clampWarm(h - 10) }, // a deeper warm neighbour
            { L: 0.17, C: 0.045, h: 40 }, // the warm-ember settle tail
        ],
        vividness: 0,
        breathPeriod: 48,
        nucleiDrift: 0.012,
        paletteDrift: 0.012,
        saturation: 0.95,
    };
}
