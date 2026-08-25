// storyTile — the landing-tile PREVIEW STRATEGY, declared per story.
//
// A landing card resolves ONE of three strategies, most-specific first:
//
//   1. authored  — a co-located `<cat>/<id>.tile.vue` bespoke vignette (the manifest
//                  `tile` loader). The live-component tile for a page whose marquee is
//                  worth curating (a Button variant cluster, a real Card, a mini
//                  GlassDock). Lazy — loaded only when the tile renders (code-split).
//   2. still     — a GL-viz route (`/substrates/<id>`) resolves a frozen `vizPreviewStill`
//                  data-URI raster. The one honest 0-GL answer for a live-GL target on a
//                  multi-tile landing (a single parked paint, NOT a masking fallback).
//   3. none      — the story declares NO preview. The card is its title and its lede,
//                  and it carries no media region at all.
//
// [struck 2026-08-10, BK #58 W-PREVIEW-CARD] The `identity` rung — "the story's own
// title as a quiet typographic specimen" — is GONE, with no alias. It printed the
// story's name inside the well while the card printed the same name in the `<span>`
// directly beneath it, so 70 of 80 cards were a title stacked on itself inside an
// otherwise empty box. That is the "empty preview voids + duplicated card titles"
// defect of record (UF-F1), and it is one defect, not two: the void IS the duplicate.
// The ratified re-read of G-TILE-COVERAGE (⊕², TERMINAL-ROSTER:208) governs — *every
// story resolves to a DECLARED preview strategy*, never *every story has a bespoke
// tile* — and it names the alternatives outright: "a family specimen, an honest frozen
// still, or NO PREVIEW is preferable to duplicate title art."
//
// Two claims this file used to make are struck with it, because the strike is what
// makes them false: ~~"The landing bento tiles are REAL scaled components, curated per
// story — never a shared per-category silhouette"~~ (the catalog's cards are CATEGORIES,
// and a category's declared preview is its headline story's — see `resolveCategoryTile`),
// and ~~"A page reaches this until it earns a `.tile.vue`"~~ (nothing is reached; a page
// with no tile and no still declares `none` and shows none).
//
// THE CENSUS BEHIND THE 70, measured at this cut (four detectors, never one number):
// 11 categories · 80 manifest story rows · 4 `demo/stories/**/*.tile.vue` · 6
// `VIZ_PREVIEW_STILLS` routes ⇒ 4 authored + 6 still + 70 none = 80. `still` needs a
// DOM — `vizPreviewStill` rasters through a `<canvas>` and returns null when `document`
// is undefined — so an SSR-side tally reports 0 stills and 76 none. That is a property
// of the probe, not of the tree; the registry keys are the honest still detector.
//
// The ladder mounts 0 GL contexts on the landing by construction (rung 2 is the
// frozen raster; rung 1 is CSS-only DOM). A demo-private helper — NOT a library export.
import type { Component } from "vue";
import type { Category, Story } from "../../stories/manifest";
import { vizPreviewStill } from "./vizPreviewStill";

/** The resolved preview strategy for a card — a closed union the card dispatches on. */
export type TileResolution =
    | { kind: "authored"; loader: () => Promise<Component> }
    | { kind: "still"; src: string }
    | { kind: "none" };

/** The one `none`, shared — it carries no payload, so a second object would be noise. */
const NO_PREVIEW: TileResolution = { kind: "none" };

/**
 * Resolve a story's declared preview strategy. `categoryId` + the story row are the
 * only inputs; the `route` (`/cat/id`) keys the frozen-still registry. Total by
 * construction — every row resolves, and `none` is a declaration rather than a floor.
 */
export function resolveStoryTile(categoryId: string, story: Story): TileResolution {
    // 1. authored — the co-located `.tile.vue` live-component vignette wins.
    if (story.tile) return { kind: "authored", loader: story.tile };

    // 2. still — a GL-viz route paints its frozen data-URI raster (0-GL).
    const src = vizPreviewStill(`/${categoryId}/${story.id}`);
    if (src) return { kind: "still", src };

    // 3. none — the story declares no preview, and the card shows none.
    return NO_PREVIEW;
}

/**
 * Resolve a CATEGORY card's preview — the catalog's half of the same ladder.
 *
 * [BK #58] The catalog used to hand `SectionPreviewCard` an `identityTile(category)`
 * literal, bypassing the ladder entirely, so the front door was eleven title-slabs
 * regardless of what any story had authored. A category's honest preview is its own
 * HEADLINE story's. So `/display` previews the Buttons tile, `/substrates` the aurora
 * still, and a category whose headline declares no preview declares none itself. This
 * is the "family specimen" arm of the ⊕² strike: one authored vignette standing for its
 * family, never a per-category silhouette invented here.
 *
 * THE HEADLINE IS THE D2 MAIN, READ — not `stories[0]` and not `id !== "intro"`.
 * `assignDepths` decides which row is the marquee in ONE place, and it is NOT always
 * the first: in `foundations` the first row is the D0 front door and the main is
 * `colors`. Reading `depth === "D2"` reads that decision; reading position restates it,
 * and `intro.vue` restated it a third way (`story.id !== "intro"` — the front-door rule
 * hardcoded at a call site). One rule, read from the manifest's own assignment. The
 * `?? stories[0]` tail is the total-function floor for a category whose depths have not
 * been assigned yet, not a second policy.
 */
export function resolveCategoryTile(category: Category): TileResolution {
    const headline =
        category.stories.find((story) => story.depth === "D2") ?? category.stories[0];
    return headline ? resolveStoryTile(category.id, headline) : NO_PREVIEW;
}
