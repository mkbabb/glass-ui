# metric-cell (MetricCell) — KEEP-SHARED verdict

The earlier constellation audit and the user directive both anticipated REPATRIATE on the
speedtest-specificity lens. The TODAY census overturns that: MetricCell has a **genuine,
generic, non-speedtest app consumer** — muster's `TravelMatrix.vue` renders it for
drive-time data. That blocks a clean repatriation. MetricCell is a generic
icon+label+value+unit tile, not bespoke to the speed-test instrument domain.

## Consumer census

All reads dated 2026-06-07. Doc/audit JSON hits (lighthouse `metric-cell.js` chunk names)
are build artefacts, not consumers, and are excluded from the table.

| repo | file:line | symbol | render-count | class |
|------|-----------|--------|--------------|-------|
| speedtest | `src/components/dashboard/ResultDetailSheet.vue:7` (import), `:42,:48,:54,:60` (render) | `MetricCell` | 4 (download / upload / ping / jitter cards) | (a) speedtest |
| muster | `frontend/src/components/verdict/TravelMatrix.vue:27` (import), `:88` (render) | `MetricCell` | 1 (per-leg drive-time cell, `appearance="compact"`, `unit="min"`) | **(b) GENUINE non-speedtest app** |
| fourier-analysis | — | — | 0 | — |
| value.js | — | — | 0 | — |
| keyframes.js | — | — | 0 | — |
| words | — | — | 0 | — |
| glass-ui internal (src/, ex-own-dir) | none — no other glass-ui component composes `<MetricCell>` (grep over `src/` minus `custom/metric-cell/` returns only the `api/index.ts:197` doc comment + the `src/subpaths/metric-cell.ts` re-export barrel) | — | 0 | — (c) none |
| glass-ui demo | none — no demo story imports or renders `<MetricCell>` (grep over `demo/` returns zero hits) | — | 0 | — (d) none |

Surface entries (the publication footprint, not consumers):
- `src/components/custom/metric-cell/{MetricCell.vue,index.ts}` — the family.
- `src/subpaths/metric-cell.ts` — `export * from "../components/custom/metric-cell"`.
- `src/api/index.ts:200-203` — `export type { MetricCellAppearance, MetricCellProps }`.
- `package.json:64-65` (`typesVersions["metric-cell"]`) + `:313-315` (`"./metric-cell"` export).

## Verdict + rationale

KEEP-SHARED.

1. **A genuine non-speedtest app consumes it.** muster's `TravelMatrix.vue:88` renders
   `<MetricCell appearance="compact" :icon="Car" :value="...travel_time_min" unit="min">`.
   This is travel-time, not network speed — the cell is doing its generic job
   (icon + label + value + unit on a tile). Two independent app domains (speedtest network
   metrics; muster drive-time matrix) is exactly the ≥2-genuine-generic-consumer bar the
   library invariant demands. Repatriating to speedtest would orphan muster.

2. **Not bespoke to the speed-test domain.** MetricCell holds zero speedtest vocabulary —
   no `download`/`upload`/`ping`/`jitter` member, no Mbps/ms baked unit, no
   speedtest-named prop. Its own doc header (`MetricCell.vue:34-36`) states the generic
   gestalt ("any dashboard / detail-sheet / summary surface composing icon + label +
   value + unit on a tile"). muster realizing that promise in a non-speedtest app
   confirms the genericity is real, not aspirational. Contrast `MetricStack`/`MetricRow`,
   which hard-reference speedtest by name in source — MetricCell does not.

3. **The context's "composes MetricBadge" premise is FALSE.** MetricCell does NOT import
   or render MetricBadge — `grep MetricBadge MetricCell.vue` returns nothing. It is a
   self-contained tile (`<div class="glass-wash rounded-lg p-3">` + label row + value
   row). So there is no MetricBadge coupling to repatriate, and no specificity signal from
   that direction.

The specificity lens the user prescribed therefore reads NEGATIVE for MetricCell: it is a
generic primitive with a second real app consumer. It stays shared.

## Move plan

None. KEEP-SHARED — no dir, subpath, api-entry, or package.json export leaves glass-ui.
speedtest's `ResultDetailSheet.vue:7` import is unchanged.

(For contrast — were this REPATRIATE, the leaving footprint would be exactly the four
surface entries enumerated above, landing as `speedtest/src/components/dashboard/MetricCell.vue`
with `ResultDetailSheet.vue:7` rewritten to a relative import. That move is NOT taken
because it would break muster's `TravelMatrix.vue` import.)

## Blocking coordination

muster (`frontend/src/components/verdict/TravelMatrix.vue:27`, pin `@mkbabb/glass-ui:^3.1.0`)
is the blocking non-speedtest consumer. It is not a "coordination cost" to be paid — it is
a dispositive KEEP signal. Any future attempt to repatriate MetricCell to speedtest would
have to FIRST either (a) repatriate it to muster too (a fork, violating the no-duplication
posture) or (b) provide muster a native equivalent. Neither is warranted: the cell is
generic and earning its keep in two domains. No action needed; flag this consumer so a
later sweep does not re-propose the move.

## Summary

MetricCell verdict: **KEEP-SHARED**. Census: 2 genuine app consumers — speedtest
`ResultDetailSheet.vue:7` (×4 download/upload/ping/jitter) AND muster
`TravelMatrix.vue:27,:88` (×1, drive-time `appearance="compact" unit="min"`). Zero
fourier/value.js/keyframes/words consumers; zero glass-ui-internal compositions; zero demo
renders. The muster consumer is dispositive: a generic non-speedtest app rendering the cell
for travel-time data proves the primitive is generic, not speed-test-bespoke. The context's
"composes MetricBadge" premise is FALSE — MetricCell imports no MetricBadge; it is a
self-contained icon+label+value+unit glass-wash tile with no speedtest vocabulary in its
props or source (unlike MetricStack/MetricRow, which name speedtest in source). User's
specificity lens reads NEGATIVE here. No move: dir/subpath/api-entry/package.json-export all
stay; speedtest's import is untouched. Blocking coordinator to record: muster
`TravelMatrix.vue` (pin ^3.1.0) — flag so a later sweep does not re-propose repatriation.

Digest: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/repatriation/metric-cell.md
