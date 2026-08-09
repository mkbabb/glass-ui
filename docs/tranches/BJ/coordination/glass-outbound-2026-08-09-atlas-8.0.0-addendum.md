# glass-ui → atlas — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (atlas cell `:406`) — full ledger **CWT-3 §4**, cited, never restated ·
**precedent** the #85 outbound form.

Standing gate first, cited: **DockCrest π10 BLOCKS the 8.0.0 adopt** (TR:406). This
addendum is the inbound half atlas consumes in ITS tranche once that gate clears; the
consumer-updates ruling holds and **no edits were made in either atlas tree**. Repo
state at the census (the §C two-line law — legacy: Atlas 4/Glass 6 · active: Atlas
7/Glass 7):

| checkout | branch | dirty | live tranche | glass-ui pins |
|---|---|---|---|---|
| `/Users/mkbabb/Programming/atlas` (ledger `atlas-working-mirror`, the legacy line) | `master` | 0 | none at HEAD (`1e2b911` 2026-07-15; no `docs/tranches/`) | `package.json:121` `^6.0.0` · `:144` `6.0.0` |
| `/Users/mkbabb/Programming/.p-totality/atlas` (ledger `atlas-active`) | `p/totality` | 0 | **Q** (HEAD `6dd96b9` 2026-07-22) | `package.json:111` `^7.0.0` · `:139` `7.0.0` |

---

## 1 · `./dropdown-menu` → `./menu` (6: 4 module-import + 2 string-literal)

One-line specifier edit; the fourteen `DropdownMenu*` SFC names are UNCHANGED
(`MIGRATION.md:20`); `.dropdown-menu__*` / `data-slot` namespaces rename to `.menu__*`
if hand-styled (`MIGRATION.md:35-40`).

atlas master:
- `src/platform/chrome/dock/DockSettings.vue:21` — `} from "@mkbabb/glass-ui/dropdown-menu";`
- `src/charts/frame/VizPlate.vue:35` — `} from "@mkbabb/glass-ui/dropdown-menu";`

atlas-active:
- `src/platform/chrome/dock/DockSettings.vue:20` — `} from "@mkbabb/glass-ui/dropdown-menu";`
- `src/charts/frame/VizPlate.vue:34` — `} from "@mkbabb/glass-ui/dropdown-menu";`
- string-literal (§2): `tests/component/foot-dock-legend.spec.ts:109` + `tests/component/viz-plate-source-grid.spec.ts:114`

## 2 · STRING-LITERAL CLASS (own section) — the vi.mock pair

Two of the constellation's five blind-spot edges (row66 RECORD §A1) are atlas-active's:

- `tests/component/foot-dock-legend.spec.ts:109` — `vi.mock("@mkbabb/glass-ui/dropdown-menu", inert);`
- `tests/component/viz-plate-source-grid.spec.ts:114` — `vi.mock("@mkbabb/glass-ui/dropdown-menu", inert);`

A `vi.mock` on a dead specifier does not throw — it silently mocks nothing and the real
module loads (or fails) underneath. Re-point both to `"@mkbabb/glass-ui/menu"` in the
same commit as §1's import edits.

## 3 · `grain` — REMOVED from the whole library (1 edge, mirrored)

- master `src/editorial/StoryCard.vue:83` / active `src/editorial/StoryCard.vue:82` —
  `:grain="false"` on the glass-ui `<Card>` (import at `StoryCard.vue:3`). Delete the
  attribute (`MIGRATION.md:440`). Under `vueCompilerOptions.checkUnknownProps` a
  retained `<Card grain>` is a **hard typecheck error**; without the flag, a silent
  no-op.

**The homonym, qualified on the record**: atlas's own Glyph grain API is NOT this prop —
`Glyph.vue:194/:192` (`:data-grain`), `EntityIcon.vue:162/:173/:183`
(`:grain="descriptor.grain"` etc.), `SelectionSetPane.vue:227/:231/:275`,
`SelectionDrilldownPanel.vue:339-493` are atlas's entity-grain semantics and survive
untouched. This API is also the source of every "grain" hit in sci-report (the
constellation-remainder page states that finding).

## 4 · master-only: `./controls` → `./dark-mode-toggle` (2) — the mirror divergence

- master `src/platform/chrome/dock/DockSettings.vue:23` + `src/platform/chrome/dock/components/DockFoot.vue:23`
  — `import { DarkModeToggle } from "@mkbabb/glass-ui/controls";` — `./controls` is
  absent from the 8.0.0 map; the door is `./dark-mode-toggle`. **atlas-active already
  migrated** (`DockSettings.vue:22`, `DockFoot.vue:23` import from
  `/dark-mode-toggle`) — adopt the active line's form.

## 5 · The new peer

`vue-component-type-helpers: ^3.0.3` lands in `peerDependencies` at the adopt.

## 6 · Beyond the batch classes — export-map-diff findings at this fresh census (stated + routed, per the row's standing law)

These are not this batch's classes; they are what the ship-time re-walk saw, recorded so
the adopt does not discover them cold. Owners are already ruled at TR:406.

- **`./drawer` is absent from the 8.0.0 map** — live at master
  `src/platform/provenance/VizAppendixDock.vue:11` · `src/charts/readout/ReadoutSheet.vue:37`
  · `src/filter/ui/FilterPanel.vue:29`, active `:9`/`:37`/`:17`, + active vi.mock
  literals `foot-dock-legend.spec.ts:110` / `viz-plate-source-grid.spec.ts:115`.
  Successor shape: compose `<Dialog>` (from `./dialog`) around `<SheetContent side
  :detents>` (from `./sheet`); the old `DrawerClose`/`DrawerTrigger` aliases were
  already `DialogClose`/`DialogTrigger` (`MIGRATION.md:592`; `src/index.ts:302-309`).
- **`./completion-seal` is absent** — master `src/design/recipes/completion.ts:5` +
  `src/skin/category.ts:2`, active `:5`/`:1`. RULED: the relay destination is
  **atlas itself** (TR:406 ⊕⁴ DECK-RELOCATION §1 — atlas already re-exports + wraps
  `resolveCompletionSeal`; sci re-points to `@mkbabb/atlas`; G-5 CANCELLED, glass opens
  no replacement).
- **`./paper-backdrop` is absent** — `src/platform/chrome/background/Atmosphere.vue:64`
  both trees. The §C paper-backdrop relay row (atlas + speedtest) owns it.

## Not restated here

StatusDot ×3 MIGRATION (#87's deliverable), Card `selected`, the `register="glass"`
phantom ×3, the deck re-hearing pair (`DashboardEssay.vue` + `useStageDeck`), U-12's
six by-name lines, the ⊕⁷ HERALD FOLD 19/19, A-8's `--radius-plate` rename-or-die —
**TERMINAL-ROSTER.md:406 + CWT-3 §4**, cited whole.

## Sum checks (authoring-seat re-walk of the halted cluster C, detectors stated in the row RECORD)

dropdown-menu 6 = the pinned 16 minus the 10 enumerated at clusters A/B/D, roots
`atlas` + `atlas-active` closing the pinned 6 ✓ · grain 1 = pinned atlas 1 ✓ ·
string-literal 2 of the pinned 5 ✓ · forms/sheet/api/specular/TagsInput 0 ✓.

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.
