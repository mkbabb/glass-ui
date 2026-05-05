# W5 — value.js consumer migration ledger

**Status**: pre-loaded by Wβ0 with Blob/Swatch/SvgFilters rows; full ledger finalized in main G.W5 (drift-row coverage from lane F + Wβ3 reachability proof).

**Consumer path**: `/Users/mkbabb/Programming/value.js`
**Lane research source**: `docs/tranches/G/research/F-value-js.md`
**Pinned baseline drift count at HEAD (W0.γ)**: 61 unique-row.

---

## Pre-loaded section — Blob/Swatch/SvgFilters migration (Wβ0)

These rows are the value.js-specific migration targets that the sub-tranche β release enables. They are not edits applied in this tranche — per G's W5 discipline, this ledger names what the value.js follow-up tranche will do; no consumer-repo edits land in G.

### Files to delete (consumer follow-up)

| drift # | site | current pattern | canonical replacement | canon source | projected delta |
|---:|---|---|---|---|---:|
| β-1 | `demo/@/components/custom/goo-blob/GooBlob.vue` (123 lines) | bespoke `<canvas>` + `useMetaballRenderer` mount | `<Blob>` from `@mkbabb/glass-ui` | `src/components/custom/blob/Blob.vue` (Wβ2) | -123 lines |
| β-2 | `demo/@/components/custom/goo-blob/types.ts` (136 lines) | `BlobConfig` + `BlobMood` interfaces | re-import from `@mkbabb/glass-ui` | `src/components/custom/blob/index.ts` `BlobConfig`, `BlobMood` types (Wβ2) | -136 lines |
| β-3 | `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts` (319 lines) | bespoke WebGL pipeline | re-import canon | `src/composables/blob/useMetaballRenderer.ts` (Wβ1) | -319 lines |
| β-4 | `demo/@/components/custom/goo-blob/composables/useBlobMood.ts` (136 lines) | bespoke mood blending | re-import canon | `src/composables/blob/useBlobMood.ts` (Wβ1) | -136 lines |
| β-5 | `demo/@/components/custom/goo-blob/composables/useBlobPointer.ts` (69 lines) | bespoke pointer NDC mapping | re-import canon | `src/composables/blob/useBlobPointer.ts` (Wβ1) | -69 lines |
| β-6 | `demo/@/components/custom/goo-blob/composables/useBlobSatellites.ts` (294 lines) | bespoke state machine + non-deterministic seeding | re-import canon (Mulberry32 deterministic) | `src/composables/blob/useBlobSatellites.ts` (Wβ1) | -294 lines |
| β-7 | `demo/@/components/custom/goo-blob/index.ts` | local barrel | drop | — | -N lines |
| β-8 | `demo/@/components/custom/svg-filters/SvgFilters.vue` (29 lines) | local mount of `<defs>` filter pack | re-import canon | `src/components/custom/svg-filters/SvgFilters.vue` (Wβ2) | -29 lines |
| β-9 | `demo/@/components/custom/watercolor-dot/WatercolorDot.vue` (107 lines) | bespoke watercolor dot | `<Swatch variant="watercolor">` | `src/components/custom/swatch/Swatch.vue` (Wβ2) | -107 lines |
| β-10 | `demo/@/components/custom/watercolor-dot/composables/useWatercolorBlob.ts` (136 lines) | bespoke composable | re-import canon | `src/composables/blob/useWatercolorBlob.ts` (Wβ1) | -136 lines |
| β-11 | `demo/@/components/custom/watercolor-dot/index.ts` | local barrel | drop | — | -N lines |
| β-12 | `demo/@/composables/prng.ts` (Mulberry32) | bespoke PRNG | re-import canon | `src/composables/utils/mulberry32.ts` (Wβ1) | -~30 lines |

**Total retired**: ≥ 1349 lines (file-line aggregate above) per SPEC.md §10.

### Files to keep, rewrite as canon-thin shells

| drift # | site | current shape | post-migration shape | canon source |
|---:|---|---|---|---|
| β-13 | `demo/@/components/custom/color-picker/visual/HeroBlob.vue` (92 lines) | full GooBlob wrapper with picker-coupled mood and satellite color overrides | ~30-line wrapper around canon `<Blob>` (sketched in SPEC.md §10) | `src/components/custom/blob/Blob.vue` (Wβ2) |

This file is the value.js wrapper that maps the picked palette to satellite colors — `useAppColorModel` stays consumer-side (color-math is value.js domain per F-lane risk register). Net delta: ≈ -62 lines.

### Configuration migrations

| drift # | site | current | post-migration | rationale |
|---:|---|---|---|---|
| β-14 | every consumer site using `provide(BLOB_CONFIG_KEY, …)` | provide/inject channel | `:config` prop binding | SPEC.md §3 (configuration via prop only; no provide/inject channel) |
| β-15 | 4-mood color-cycling via consumer `useBlobMood` wrapper | bespoke params | canon `useBlobMood`; consumer override of `params` only if mapping diverges | SPEC.md §5 (5-mood param table) |

### Silent-failure / undefined-token cleanup (cross-cuts; resolved by main G.W2, named here for completeness)

| drift # | site | current | post-migration | resolution wave |
|---:|---|---|---|---|
| β-16 | `.gold-shimmer` text variant referenced (silently broken — no canonical class) | bespoke class | rename to `.text-shimmer-gold` | main G.W2 |
| β-17 | `.dashed-well` referenced (silently broken — no canonical class) | bespoke class | rename to `.well-dashed` | main G.W2 |
| β-18 | `.stagger-children` referenced (silently broken — no canonical class) | bespoke class | resolved per W0 silent-failure decision (W2 ship or W5 retire — see W0-silent-failures.md S3) | main G.W2 / W5 |
| β-19 | `--ease-spring` referenced at value.js sites (token name conflict; canon `--ease-spring` is `--spring-snappy` alias since v0.4) | undefined or wrong-shape | confirm canon `--ease-spring` resolves correctly OR rename consumer-side to `--spring-bouncy` if value.js intent was bouncy | consumer-side |
| β-20 | `--color-muted-foreground` typo (3 sites) | wrong token name | rename to `--muted-foreground` | consumer-side |

---

## Section to be filled in main G.W5

The remaining drift rows from `docs/tranches/G/research/F-value-js.md` (color tokens, accent shadows, slug/login pill buttons, `.underline-tabs`, `<DockLayerGroup :keepOpenWhile>`, `--shadow-cartoon-accent` recipe usage, etc.) land in W5's main pass. The Blob rows above are a head-start, not the whole ledger.

Projected post-migration drift count (Blob rows alone): **-20 unique drift rows**. Remaining ledger rows in main W5 are projected to absorb the remaining 41 unique drift rows from value.js's W0.γ baseline of 61.

---

## Authority

Pre-load authority: G.β.Wβ0 (2026-05-04).
Final ledger authority: G.W5 orchestrator close.
