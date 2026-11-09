# INBOUND O-150 R-t-1 into 10.1.5 (orchestrator note, 2026-11-04)

From value.js via `value-js-e7` (relay `~/Programming/value.js/docs/tranches/X/relay/X-ALL-BK-UI-AUDIT-ADDENDUM-2026-09-23-FW14U.md`). Every later critic and fix seat of 10.1.5 treats this as IN SCOPE.

**Table rules paint in the text colour.** `src/components/table/TableRow.vue:14` and `TableHeader.vue:11` set a border width but bind no border colour, and nothing in `src/styles` sets a base `border-color`, so the rules resolve to `currentColor`.

Cure: the rules read `--border`, the same token every other glass hairline reads. That is two class edits, with no token moved and no API change.

Gate, both engines, light and dark: the computed `border-*-color` of every Table row and header rule equals the resolved `--border` (RED on v10.1.4, where it equals the cell's `color`). The DataTable release specs stay GREEN.
