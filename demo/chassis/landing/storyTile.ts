// storyTile — the per-STORY landing-tile resolution ladder (BI.W-LIVE-TILES).
//
// The landing bento tiles are REAL scaled components, curated per story — never a
// shared per-category silhouette (the retired `category-hero.ts` previewKind arm).
// A tile resolves down ONE ladder, most-specific rung first:
//
//   1. authored  — a co-located `<cat>/<id>.tile.vue` bespoke vignette (the manifest
//                  `tile` loader). The live-component tile for a page whose marquee is
//                  worth curating (a Button variant cluster, a real Card, a mini
//                  GlassDock). Lazy — loaded only when the tile renders (code-split).
//   2. still     — a GL-viz route (`/substrates/<id>`) resolves a frozen `vizPreviewStill`
//                  data-URI raster. The one honest 0-GL answer for a live-GL target on a
//                  multi-tile landing (a single parked paint, NOT a masking fallback).
//   3. identity  — the terminal floor: the story's own title as a quiet
//                  typographic specimen.
//                  Per-STORY distinct (the title differs), 0-GL, honest — never the
//                  repeated compass glyph. A page reaches this until it earns a
//                  `.tile.vue` (the full per-story authoring is the extrapolated G5
//                  obligation; the manifest carries no importable body to auto-render,
//                  the SFC owns it — so a rich auto-marquee is a co-located tile, not a
//                  landing-side SFC eager-import that would break code-splitting).
//
// The ladder mounts 0 GL contexts on the landing by construction (rung 2 is the
// frozen raster; rungs 1/3 are CSS-only DOM). A demo-private helper — NOT a library
// export.
import type { Component } from "vue";
import type { Story } from "../../stories/manifest";
import { vizPreviewStill } from "./vizPreviewStill";

/** The resolved tile for a story — a discriminated union the card dispatches on. */
export type TileResolution =
    | { kind: "authored"; loader: () => Promise<Component> }
    | { kind: "still"; src: string }
    | { kind: "identity"; title: string };

/**
 * Resolve a story's landing tile via the ladder. `categoryId` + the story row are
 * the only inputs; the `route` (`/cat/id`) keys the frozen-still registry. Total by
 * construction — every row resolves a tile (rung 3 is the terminal floor), so the
 * landing never carries a stale-tile hole.
 */
export function resolveStoryTile(categoryId: string, story: Story): TileResolution {
    // 1. authored — the co-located `.tile.vue` live-component vignette wins.
    if (story.tile) return { kind: "authored", loader: story.tile };

    // 2. still — a GL-viz route paints its frozen data-URI raster (0-GL).
    const src = vizPreviewStill(`/${categoryId}/${story.id}`);
    if (src) return { kind: "still", src };

    // 3. identity — the terminal per-story floor (a real glass typographic specimen).
    return { kind: "identity", title: story.title };
}
