# SortableList

## Artefact path

`src/components/custom/sortable-list/` (the published subpath `@mkbabb/glass-ui/sortable-list`).

## Verdict

`keep-current` — **cleared on the re-ground count** (AZ.W-PRUNE2 E4-9). `SortableList` +
`SortableItem` + `SortableHandle` are the drag-reorder family over the `useSortable` composable.
The re-ground census finds 2 real non-story consumers, so it clears the ≥2-consumer bar — KEEP, NOT
a retire.

## Consumer proof (re-runnable; re-grounded AZ.W-PRUNE2 2026-06-11)

**Internal consumers — 2 (non-story demo compositions, NOT its own `<sortable-list>.vue` route).**

```bash
grep -rln 'SortableList' demo/   # the two counted compositions:
#   demo/stories/aurora/config/PaletteLayer.vue        (SortableList + SortableItem — the aurora
#                                                        OKLCh palette-stop reorder)
#   demo/stories/aurora/sections/AuroraColorSection.vue (SortableList + SortableItem — the aurora
#                                                        color-section stop reorder)
```

Both are real aurora-chrome compositions (the drag-reorder of OKLCh color stops), not the showcase
story — so `proof:component-orphan` counts them and reports `sortable-list` at 2 consumers,
`ok: true`. (The `demo/stories/data/sortable-list.vue` + `demo/stories/composables/use-sortable.vue`
own-route/showcase mounts are NOT counted, per the own-story exclusion.)

**External consumers — 0.** No sibling repo composes `SortableList` at HEAD:

```bash
grep -rln 'SortableList|glass-ui/sortable-list' ~/Programming/slides/src ~/Programming/speedtest/src ~/Programming/words/frontend/src   # → NONE
```

## Re-audit proof

This document records the re-ground KEEP for `SortableList` — it clears the bar on the two aurora
demo compositions (the `useSortable` engine's real exercisers). If a future prune finds the aurora
chrome dropped both reorder sites (count → <2) with no external consumer, the verdict re-grades to
`library-orphan` (retire the subpath + the `useSortable` composable's public reach). The component
is the drag-reorder model the aurora palette editor depends on.

## Cross-references

- `docs/consumer-evidence/use-sortable.md` (the composable the family wraps).
- `demo/stories/aurora/config/PaletteLayer.vue` + `demo/stories/aurora/sections/AuroraColorSection.vue` (the two counted compositions).
