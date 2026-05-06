# Consumer Evidence — `DiscoGlyph`

**Source**: `src/components/custom/disco-glyph/`
**Originating tranche**: P (cross-repo speedtest tranche; landed in glass-ui without owning a glass-ui-side wire-or-retire pass)
**Glass-ui wire-or-retire pass**: I.W1 Lane B (this audit)
**Verdict**: **WIRE** (≥ 2 sites — 1 in-repo demo, 4 cross-repo)

## Consumers at HEAD

| # | File | Line | Site type |
|---|---|---|---|
| 1 | `demo/stories/primitives/disco-glyph.vue` | 3, 42, 68, 74, 80, 86, 92, 98, 119, 122 | in-repo demo (8 distinct `<DiscoGlyph>` instances exercising silhouette × phase-color × facet-axis matrix) |
| 2 | `../speedtest/src/components/speedtest/icons/PlayDisco.vue` | 5, 9, 17 | cross-repo non-demo |
| 3 | `../speedtest/src/components/speedtest/icons/CheckDisco.vue` | 4, 7, 15 | cross-repo non-demo |
| 4 | `../speedtest/src/components/speedtest/icons/ArrowRightDisco.vue` | 4, 7, 15 | cross-repo non-demo |
| 5 | `../speedtest/src/components/speedtest/icons/RotateCcwDisco.vue` | 4, 7, 15 | cross-repo non-demo |
| 6 | `demo/stories/primitives/glyph-face.vue` | 150 | in-repo demo (doc-comment cross-reference) |

## Verification command

```bash
rg -l 'DiscoGlyph' src/ demo/ ../speedtest/src 2>/dev/null
```

## Public API surface used

- `DiscoGlyph` (default export from `./DiscoGlyph.vue`)
  - Props observed in consumers: `silhouette`, `active`, `phase-color`, `facet-axis` (`"diagonal" | "vertical" | "horizontal"`)
  - Imports `GlyphFaceSilhouetteKey` from sibling `glyph-face` package (Q.W3.A.1 silhouette hand-off injection contract).
- Subpath import: `@mkbabb/glass-ui/disco-glyph` (consumed by all 4 speedtest disco-glyph icon wrappers)

## Notes

- 4 distinct cross-repo wrapper components (one per Lucide silhouette: Play, Check, ArrowRight, RotateCcw) consume `<DiscoGlyph>` directly via `@mkbabb/glass-ui/disco-glyph`. Each is a non-demo runtime caller.
- The in-repo demo at `demo/stories/primitives/disco-glyph.vue` exercises the silhouette × phase-color × facet-axis matrix (8 instances).
- DiscoGlyph also participates in the `GlyphFace` injection contract via `inject(GlyphFaceSilhouetteKey, null)` (DiscoGlyph.vue:82), making it the canonical descendant primitive for silhouette hand-off.
- Far past the ≥ 2 bar; no retirement risk.
