# BI.W-LIVE-TILES — the landing bento tiles are REAL scaled components (0-GL budget)

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F1** "These preview buttons should have literal, live, actual components, curated from those sections. Not giant, superfluous, wasted icon space." (ss-01 — empty brown tile with a lone compass icon).
- **FAM-14** (landing arm): landing tiles = per-story Canvas2D STILLS keyed off per-CATEGORY `previewKind` (`category-hero.ts` glyph/field/control/surface/metric), so sibling stories paint the SAME silhouette + a repeated IconChip — the user wants LIVE per-story components.
- **G5** (`story/PASS-1.md` §6): the tile mechanism reconcile + cost — the resolution ladder proven on real tiles, the fence verified live, the 40-tile aggregate measured, the full-landing CV park.

## Design

STORY-C mechanism owner (`story/PASS-1.md` §4.3): per-STORY tile via the resolution ladder — **manifest marquee `SpecimenSpec` (auto, data pages) → co-located `<id>.tile.vue` (authored, bespoke pages) → frozen viz still (`vizPreviewStill`/`auroraFallbackGround`) for GL viz**. The landing mounts **0 GL contexts** (every GL-viz tile is the frozen data-URI raster — an honest single-paint, NOT a masking fallback) and **0 tab stops inside tiles** (whole tile = ONE RouterLink, title = the one accessible name). Specimens render at REST (no own rAF on a landing). Fit is container-query units at real layout size — `transform: scale` only as a last resort (text blur; pass-3 G5-FIT: cq-fit crisp vs scale-blur).

RETIRE (clean break, no alias): `category-hero.ts`'s per-category `previewKind` specimen fallback → per-story tiles; the lead IconChip demoted to a corner identity mark. `SectionPreviewCard` renders the resolved tile as HERO inside the fenced stage.

The 8-item fence (`story/PASS-1.md` §4.3, every tile): `inert` · `aria-hidden` on decorative sub-content · `pointer-events: none` · `container-type` fit (over transform-scale blur) · `contain` · 0-GL frozen still · no-select · rest-state.

The full-landing CV park (the pass-4 obligation, ABSENT at HEAD): `SectionPreviewCard` gains `content-visibility: auto` + `contain: content` + intrinsic-size reserve — the park is what makes ~131 tiles clear (the 40-tile A/B showed CV made no difference at 40; the cost stays visible-tile-bounded not total-tile-bounded only at full landing).

## Work

- `demo/chassis/landing/SectionPreviewCard.vue` — render the resolved per-story tile as hero inside the fenced stage (the full 8-item fence); demote IconChip to a corner mark; add `content-visibility: auto` + `contain: content` + intrinsic reserve.
- `demo/chassis/landing/SectionLanding.vue` — resolve the per-story tile via the ladder (drop the shared per-category `previewKind` field slot).
- `demo/chassis/hero/category-hero.ts` — RETIRE the `previewKind` specimen fallback arm (clean break; the `{icon, sectionHue, heroPalette, bgKind}` category identity stays).
- NEW `demo/stories/<cat>/<id>.tile.vue` (bespoke-page tiles) + the manifest `tile?: () => Promise<Component>` field via the existing `makeLazy`/`import.meta.glob` pattern.
- Reuse `demo/chassis/landing/vizPreviewStill.ts` (the frozen-still ladder rung; already 0-GL by construction).

## Acceptance

Gate: **`proof:story-tiles`** (NEW, born-RED) — GREEN at close (BORN-RED at HEAD: `previewKind` per-category silhouette live; CV absent on SectionPreviewCard).

Clauses:
- T1 the landing mounts **0 GL contexts** (a live `getContext('webgl2')`/`getContext('webgpu')` count == 0 on the landing route).
- T2 each tile is a REAL scaled per-story component (or a frozen still for GL viz) via the ladder — NO shared per-category `previewKind` silhouette; every manifest row resolves a tile or a still (no stale-tile hole).
- T3 the 8-item fence present on every tile (inert · aria-hidden · pointer-events:none · container-type fit · contain · 0-GL still · no-select · rest-state).
- T4 0 tab stops inside a tile (whole tile = ONE RouterLink; Tab never enters a tile).
- T5 `SectionPreviewCard` carries `content-visibility: auto` + `contain: content` + intrinsic reserve.
- Self-test bites: a planted live `<Aurora>` in a tile reds T1; a planted focusable child reds T4; a `previewKind`-silhouette re-introduction reds T2.

## π/DELTA

- **Live per-story tiles** — the /display landing renders a Button variant cluster, a real Card, and a mini GlassDock (the heaviest case) as REAL scaled components; fit is crisp (cq-units, not scale-blur); IconChip demoted; both modes.
- **The 0-GL landing** — `getContext('webgl2')` count == 0 on the full landing (GL viz = frozen still).
- **The 40-tile aggregate** (measured, Chromium): 40 tiles / 3 heavy GlassDocks / viewport 1280×800 — CV-on frame median 7.5ms / p95 9.4ms, heap 36-43MB (~44% budget headroom); 30/30 CV blocks skipped. The stable-Safari confirmation is owed (below).

## Obligations

- **STABLE-Safari** (SAF-1): the 40-tile aggregate frame-time + the content-visibility scroll/park on real Safari.app — the CV/overflow mechanisms are Baseline (Safari 18+); the pass-4 numbers are Chromium.
- **Full ~131-tile park**: land the SectionPreviewCard CV park + measure the real 131-tile heap (~131MB projected at ~1MB/tile) + confirm the frame cost stays visible-tile-bounded — the park is only load-bearing at full landing.

## Dispositions

- Terminalizes **WS4-03** (category landing LIVE previews). `category-hero.ts` `previewKind` specimen arm RETIRED (clean break, no alias).
