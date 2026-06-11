# USER-AUDIT 2026-06-11 — ROUND 4 (04:36–04:39, BINDING; mid-Batch-3 live audit on :5210)

The user audited the live tree between Batch 2 (landed) and Batch 3 (stage A executing). Screenshots:
`04.36.58` read (banked below); the four temp-dir captures TCC-blocked — prose is the record.

## R4 defect ledger

| id | surface | the user's words (condensed) + the banked read | routing |
|---|---|---|---|
| R4-1 | DockRail (W-RAIL-EXTEND) | "Rails are totally broken — they should extend OUTSIDE of the dock itself. The animations are janky." The 04.36.58 read: the sidebar rail shows NO visible hairline extending beyond the dock; instead a BLACK BLOB artifact clips at the dock's bottom edge (a dark half-circle — likely the DockRail end-icon painting unstyled/mispositioned, or the slot clipping wrong). The wave's claim ("39px beyond, captured") is CONTRADICTED on the live shell — the row RE-OPENS per the status legend. | R4-RAIL corrective (post-Batch-3) |
| R4-2 | demo options IA | "wtf are these other options even" / "wtf is this" — two surfaces of confusing/incongruous options (TCC-blocked screenshots; likely the rail.vue/layers.vue post-taxonomy demo sections and/or the contextual-layer facets the W-DOCK-CONTEXT wave added to the shell docks). The corrective lane re-walks the dock demo IA + the shell facet groups and prunes/renames anything that reads as noise to a first-time auditor. | R4-RAIL corrective (the demo-IA arm) |
| R4-3 | the gear (REFINES R3-4) | The gear must NOT expose `/composables/use-token-color` — it opens the **Preset Editor** as the gear's content, with the **dark-mode toggle component at the TOP** (not the bottom). This REFINES R3-4: the FLOATING FAB still dies, but the PresetEditor itself IS the gear view (not a generic settings panel that replaced it); the dark-toggle placement decision (bottom-of-rail, AY 13:27) is superseded INSIDE the gear view — top. | R4-SHELL corrective (re-grounds on W-SHELL-CONFIG's stage-B output) |
| R4-4 | the Preset Editor controls | "Some of these preset options are not even proper glassy/pill tabs or selects" — the editor's option rows must compose the house registers: SegmentedTabs (pill/segmented) for enums, the glass Select for long lists, glass switches — no bare buttons/radios/native selects. | R4-SHELL corrective |

## Constraints

- Batch-3 stage B (W-SHELL-CONFIG) was authored BEFORE R4 — its landed output is the corrective's
  re-ground base, not a finished surface.
- The R4-RAIL corrective re-opens W-RAIL-EXTEND's live-verified row (the legend rule); its DELTA
  must include the SHELL rail (the surface the user audits), not only the story mounts.
- Jank: the corrective frame-samples the rail/dock animations on the shell (the user's word
  "janky" — instrument before tuning).
