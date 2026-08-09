# glass-ui → speedtest — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C — full per-repo ledger **CWT-3 §4** (`:1865` speedtest row; grid-setter S-3
`:31`; specular C-3 `:1812`; `:grid` relay `:1846`), cited, never restated · **precedent**
the #85 outbound form.

Consumer-updates ruling: glass-ui 8.0.0 is published (tag `v8.0.0` at `17a11bc5`);
speedtest updates via a marked addendum in ITS tranche. **No edits were made in
speedtest.** Repo state at the census: `master` · dirty 16 (all AX docs) · HEAD
`7212e733` 2026-07-17 · live tranche **AX** · declares `@mkbabb/glass-ui: ^4.0.1`
(`package.json:93`) · **`vue-component-type-helpers` NOT declared** — the `^3.0.3` peer
lands as a new requirement at the adopt.

---

## 1 · `./forms` → `./input` / `./textarea` (10 module-import edges)

`./forms` retired (`MIGRATION.md:21`); the four doors are `./input` · `./textarea` ·
`./checkbox` · `./radio-group`. `useUserInvalidAria` moved to the root barrel
(`src/index.ts:449`) and `./dom` (`composables/dom/index.ts:46`) — either door works.

- `src/components/dashboard/SubnetSyncDialog.vue:68` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/views/AdminOverviewView.vue:154` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/admin/AdminSessionsTable.vue:16` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/dashboard/SubnetAddDialog.vue:85` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/AppSettingsButton.vue:96` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/survey/AddressAutocomplete.vue:102` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/dashboard/ResultsFilters.vue:158` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/dashboard/IPLookupManager.vue:93` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `src/components/survey/SurveyField.vue:161` — `import { Input, Textarea } from "@mkbabb/glass-ui/forms";` → `./input` + `./textarea`
- `src/views/AdminLoginView.vue:119` — `import { Input, useUserInvalidAria } from "@mkbabb/glass-ui/forms";` → `./input` + root (or `./dom`)

## 2 · `./dropdown-menu` → `./menu` (2)

One-line specifier edit; the fourteen `DropdownMenu*` SFC names are UNCHANGED
(`MIGRATION.md:20`). Hand-styled `.dropdown-menu__*` classes / `data-slot` values rename
to `.menu__*` (`MIGRATION.md:35-40`).

- `src/components/admin/AdminSessionsTable.vue:12` — `} from "@mkbabb/glass-ui/dropdown-menu";`
- `src/components/dashboard/ResultsTable.vue:11` — `} from "@mkbabb/glass-ui/dropdown-menu";`

## 3 · `./sheet` — the REPAIR class (1), specifier-level

- `src/components/dashboard/ResultDetailSheet.vue:3` — `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@mkbabb/glass-ui/sheet";`

Pre-8.0.0 the `./sheet` specifier **resolved to nothing** — this import has been a live
break the whole time. 8.0.0 mints the subpath (`MIGRATION.md:22`, RT-38D), so the
SPECIFIER now works — but the barrel ships **`SheetContent` (+ `SheetContentProps`,
detent/motion helpers) only** (`src/components/sheet/index.ts`, 17 lines). The other
four symbols migrate to their Dialog twins: `Sheet`/`SheetHeader`/`SheetTitle`/
`SheetDescription` → `Dialog`/`DialogHeader`/`DialogTitle`/`DialogDescription` from
`./dialog`, composing `<Dialog>` around `<SheetContent side>` (`src/index.ts:302-309`;
`MIGRATION.md:1607` is the symbol map). The repair is real and the import as written
still needs the four-symbol edit.

## 4 · STRING-LITERAL CLASS — `vite.config.mjs` `optimizeDeps.include` (own section)

An `optimizeDeps.include` entry on a dead specifier fails the pre-bundle (row66 RECORD
§A1). The include array carries six glass-ui subpath literals; the whole block re-points
at the adopt:

- `:1033` — `"@mkbabb/glass-ui/api",` → DELETE (the subpath died at 5.0.0; §7 below)
- `:1039` — `"@mkbabb/glass-ui/forms",` → the pinned blind-spot edge; re-point per §1
- `:1042` — `"@mkbabb/glass-ui/instrument-chassis",` → **the EXTRA fifth chassis
  reference**, absent from both the pinned blind-spot census and the chassis ×4 —
  flagged by cluster A; dies with the chassis DELETE (§8)
- `:1044` / `:1045` / `:1046` — `metric-badge` / `metric-cell` / `metric-stack` → the
  family door is `./metric` at 8.0.0 (§8)

## 5 · `grain` — REMOVED from the whole library (7 prop edges)

`MIGRATION.md:440`: delete the attribute. Under `vueCompilerOptions.checkUnknownProps` a
retained `<Card grain>` is a **hard typecheck error**; WITHOUT that flag it is a silent
no-op — the stale-binding trap — so flip the flag or sweep by grep.

- `src/components/dashboard/ResultsTable.vue:103` — `:grain="false"`
- `src/components/dashboard/DashboardMapControls.vue:97` — `:grain="false"`
- `src/components/dashboard/StatsCards.vue:7` — `:grain="false"`
- `src/components/dashboard/ResultsFilters.vue:4` — `:grain="false"`
- `src/components/dashboard/IPLookupManager.vue:2` — `<Card tier="wash" :grain="false" …>`
- `src/components/survey/SurveyWizard.vue:59` — `:grain="false"`
- `src/components/survey/SurveyReview.vue:43` — `:grain="false"`

Homonyms qualified OUT by the enumerator (not glass-ui's prop): `auroraConfig.ts:221`
`canvasGrain: 0` / `:248` `paperGrain: 0`, `Dock.vue:189/677` "disco-grain" comments,
`network-information.d.ts:21`, prose in `pop-grammar.css:33/42`, `index.css` ×4,
`useEChartsTheme.ts` ×2, `ThankYou.vue:42`, `SurveyWizard.vue:47/49`.

## 6 · `specular` — REMOVED with `SurfaceSpecular` (1)

- `src/components/dashboard/charts/MetricGaugeCards.vue:9` — `specular="subtle"` on a
  glass-ui `<Card>` — CWT-3 C-3's "one live external setter". Delete the prop
  (`MIGRATION.md:441`, `:516`; hard typecheck error under `checkUnknownProps`); the
  "full" register re-creates by writing `--glass-specular-intensity-rest/-hover/-active`
  on the element. The same tag carries `:grid="true"` at `:10` — the CWT-3 S-3
  grid→`class="paper-grid"` relay row rides this edit.

## 7 · dead `./api` (2)

The subpath died at 5.0.0 (`MIGRATION.md:768-785`); these were live falsifiers of
"consumers are current" (TR row 76):

- `src/features/speedtest/ui/PhaseTimeline.vue:52` — `import type { TimelineSegment } from "@mkbabb/glass-ui/api";` → `./timeline` is the natural 8.0.0 door; verify the symbol at the adopt
- `vite.config.mjs:1033` — the string literal (§4)

## 8 · §C-ledger rows this batch carries as enumeration (owners already ruled)

**instrument-chassis** (✦³ DELETE CONFIRMED; speedtest migrates at its own bump) — 4
module-import edges + the uncounted `:1042` literal (§4) + `src/design/register.css:155`
`.instrument-chassis,` selector coupling; the F18/ASK-1 DELETE strands the prose
coupling at `tokens.css:21/137/1104`, `index.css:15/17`, `App.vue` §comments:

- `src/App.vue:257` — `import { InstrumentChassis } from "@mkbabb/glass-ui/instrument-chassis";` (tags `:98`/`:155`)
- `src/composables/useRouteTransition.ts:34` — `} from "@mkbabb/glass-ui/instrument-chassis";` (types `:32-33`)
- `src/views/MapView.vue:53` — (tags `:20`/`:45`)
- `src/views/ChartsView.vue:132` — (tags `:51`/`:78`/`:87`/`:119`)

**metric-family** (✦³ family-apotheosis MIGRATION → `./metric`) — cluster A reproduces
the pinned ×41 as 5+3+17+12+4:

- module-import ×5: `src/features/speedtest/ui/ResultStack.vue:172` (`MetricRow, MetricStack` from `/metric-stack`) · `SpeedtestResults.vue:641` (`MetricBadge` from `/metric-badge`) · `SharedResultView.vue:104` (`MetricCell` from `/metric-cell`) · `src/components/dashboard/ResultDetailSheet.vue:7` (`MetricCell`) · `src/components/survey/SurveyResultDock.vue:166` (`MetricBadge`)
- string-literal ×3: `vite.config.mjs:1044/1045/1046` (§4)
- template tags ×17: `ResultStack.vue:18/88/101/165` (MetricStack ×4) + `:28/87/111/164` (MetricRow ×4) · `SpeedtestResults.vue:566` · `SurveyResultDock.vue:105` · `SharedResultView.vue:67/73/80` (MetricCell ×3) · `ResultDetailSheet.vue:42/48/54/60` (MetricCell ×4)
- CSS selector/var-read lines ×12 (`ResultStack.vue` scoped): `:336` · `:340` · `:400/:411/:429/:430/:468` · `:494/:498` · `:500/:502` · `:520`
- `register.css` token writes ×4: `:165/:166` + `:188/:189` (`--metric-row-unit-color` / `--metric-row-label-color`)

BEYOND the 41, real coupling the adopt must still touch (cluster A): `ResultStack.vue`
inline-style token writes ×6 (`:43-45`, `:126-128`) + scoped `--metric-row-*-clamp-*`
writes ×28 (`:401-438`, `:476-479`) deep-coupling the primitive's internal clamp
contract; prose ~29 lines.

The rest of the speedtest cell — grid→`.paper-grid`, X5, U-13's four lines, the ⊕⁷
BK-dispositions fold — is **CWT-3 §4 + TERMINAL-ROSTER.md:409**, cited whole.

## 9 · Sum checks (cluster A, quoted)

"10+1 forms + 2 dd + 1 sheet = 14 = pinned 14 ✓" · "grain 7 = pinned 7 ✓" · "specular 1
= pinned 1 ✓" · "dead ./api 2 = pinned 2 ✓" · "instrument-chassis 4 = pinned ×4 ✓ (+ the
uncounted 5th at `:1042`, flagged)" · "metric-family 5+3+17+12+4 = 41 ✓".

## Owed back to glass-ui

Nothing blocking. Anything broken beyond these rows replies on this thread and enters
#76's routed table.
