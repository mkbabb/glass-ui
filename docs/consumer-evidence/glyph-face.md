# Consumer Evidence — `GlyphFace`

**Source**: `src/components/custom/glyph-face/`
**Originating tranche**: P (cross-repo speedtest tranche; landed in glass-ui without owning a glass-ui-side wire-or-retire pass)
**Glass-ui wire-or-retire pass**: I.W1 Lane B (this audit)
**Verdict**: **WIRE** (≥ 2 sites — 2 in-repo, 4 cross-repo)

## Consumers at HEAD

| # | File | Line | Site type |
|---|---|---|---|
| 1 | `demo/stories/primitives/glyph-face.vue` | 3, 14, 20, 30, 40, 56, 63, 70, 77, 95, 102, 114, 124, 135 | in-repo demo (canonical primitive story) |
| 2 | `demo/stories/compositions/instrument-chassis.vue` | 9, 174, 228 | in-repo demo (composition-level use inside `<InstrumentChassis>`) |
| 3 | `src/components/custom/disco-glyph/DiscoGlyph.vue` | 3, 23, 25, 28, 81, 82 | in-repo non-demo (sibling primitive consumes `GlyphFaceSilhouetteKey` injection slot) |
| 4 | `../speedtest/src/components/dock/SettingsCog.vue` | 10, 12, 59 | cross-repo non-demo |
| 5 | `../speedtest/src/components/speedtest/PrimaryAction.vue` | 7, 9, 17 | cross-repo non-demo |
| 6 | `../speedtest/src/components/speedtest/ActionCluster.vue` | 14, 20, 33, 39, 53, 59, 69 | cross-repo non-demo (3 `<GlyphFace>` instances) |
| 7 | `../speedtest/src/components/speedtest/icons/index.ts` | 10 | cross-repo doc-comment reference |
| 8 | `../speedtest/src/components/speedtest/icons/lucide-silhouettes.ts` | 6, 18 | cross-repo doc-comment reference |
| 9 | `../speedtest/src/__tests__/App.surveyEntry.test.ts` | 85 | cross-repo test (stub) |

## Verification command

```bash
rg -l 'GlyphFace|GlyphFaceSilhouetteKey' \
   src/ demo/ \
   ../speedtest/src 2>/dev/null
```

## Public API surface used

- `GlyphFace` (default export from `./GlyphFace.vue`)
  - Props observed in consumers: `tint`, `active`, `silhouette`, `class`
  - Slot: default (icon path / `<DiscoGlyph>` descendant)
- `GlyphFaceSilhouetteKey` (named export from `./keys.ts`) — `inject()` slot keyed by sibling primitives (`DiscoGlyph` is the in-repo example) so descendants can hand a silhouette path upward.
- Subpath import: `@mkbabb/glass-ui/glyph-face` (consumed by speedtest)

## Notes

- The injection-slot pattern (`GlyphFaceSilhouetteKey`) makes `GlyphFace` part of the public injection contract for descendant primitives — `DiscoGlyph.vue:82` is the named in-repo consumer; `useResizeObserver`-style tightness.
- 3 distinct cross-repo `.vue` consumers + 2 in-repo (`disco-glyph` sibling + composition story) = 5 distinct callers; far past the ≥ 2 bar.
- The Q.W3 cap-modes/silhouette/facetAxis extension (commit `2414abc`) is exercised by both demo stories and speedtest `ActionCluster.vue`'s 3-instance arrangement.
