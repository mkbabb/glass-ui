# glass-ui → muster — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (muster cell `:414`) — full ledger **CWT-3 §4**, cited, never restated ·
**precedent** the #85 outbound form.

✦³ standing law first: **muster is a PROTOTYPE repo — its consumer counts never bind a
disposition** (SL-3); every row below is relay/migration evidence only. Consumer-updates
ruling: 8.0.0 is published (`v8.0.0` at `17a11bc5`); muster updates via a marked
addendum in ITS tranche. **No edits were made in muster.** Repo state at the census:
`master` · dirty 90 · live tranche **K** (A–K) · `frontend/package.json:19`
`"@mkbabb/glass-ui": "^3.1.0"`.

---

## 1 · `./forms` → `./input` + root/`./dom` (6 module-import edges)

`MIGRATION.md:21`; `useUserInvalidAria` lives at the root barrel (`src/index.ts:449`)
and `./dom` (`composables/dom/index.ts:46`):

- `frontend/src/main.ts:2` — `import { useUserInvalidAria } from "@mkbabb/glass-ui/forms";` → root or `./dom`
- `frontend/src/components/settings/SettingsDialog.vue:38` — `import { Input } from "@mkbabb/glass-ui/forms";` → `./input`
- `frontend/src/components/voter/OriginPrefsPopover.vue:35` — `import { Input } …` → `./input`
- `frontend/src/components/voter/VoterRow.vue:22` — `import { Input } …` → `./input`
- `frontend/src/components/command/CommandPalette.vue:51` — `import { Input } …` → `./input`
- `frontend/src/components/share/ShareButton.vue:33` — `import { Input } …` → `./input`

## 2 · `./sheet` — the REPAIR class (2), specifier-level

- `frontend/src/components/verdict/WhyThisWonSheet.vue:31` — `} from "@mkbabb/glass-ui/sheet";`
- `frontend/src/components/share/ShareButton.vue:29` — `} from "@mkbabb/glass-ui/sheet";`

Both statements import `Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription`
(read on disk at the authoring seat). Pre-8.0.0 the `./sheet` specifier **resolved to
nothing** — these were live breaks. 8.0.0 mints the subpath (`MIGRATION.md:22`,
RT-38D), repairing the SPECIFIER — but the barrel ships **`SheetContent`
(+ `SheetContentProps`, detent/motion helpers) only** (`src/components/sheet/index.ts`,
17 lines). The other four symbols take their Dialog twins: `Sheet`/`SheetHeader`/
`SheetTitle`/`SheetDescription` → `Dialog`/`DialogHeader`/`DialogTitle`/
`DialogDescription` from `./dialog`, composing `<Dialog>` around `<SheetContent side>`
(`src/index.ts:302-309`; `MIGRATION.md:1607`).

## 3 · dead `./api` (1)

- `frontend/src/composables/useAuroraConfig.ts:47` — `import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "@mkbabb/glass-ui/api";`
  — the subpath died at 5.0.0 (`MIGRATION.md:768-785`). The aurora config surface's
  8.0.0 door is `./aurora` (both atlas checkouts already import it there,
  `useAuroraConfig.ts:57`); verify the two symbol names at the adopt.

## 4 · ToggleChip record (2 — §C cell rows, ⊘ pinned at TR:414)

- `frontend/src/components/voter/OriginPrefsPopover.vue:36` · `frontend/src/components/voter/VoterRow.vue:21`
  — `./toggle-chip` was folded onto the one `<Chip>` family at **5.0.0**
  (`MIGRATION.md:992`); the door is `./chip`.

## 5 · STRING-LITERAL CLASS

**Zero** in muster (the five constellation blind-spot edges live at atlas-active, words,
speedtest — row66 RECORD §A1).

## 6 · Removals + the peer

grain 0 · specular 0 · TagsInput 0 in muster. The `vue-component-type-helpers ^3.0.3`
peer lands at the adopt. For any retained removed prop elsewhere: under
`vueCompilerOptions.checkUnknownProps` it is a hard typecheck error; without the flag, a
silent no-op — flip the flag or sweep by grep.

## Not restated here

The muster extras — instrument-chassis (`WinnerHero.vue:46-47`), configurator ×7,
metric-badge/cell/stack (✦³ family-apotheosis → `./metric`), the `data-test`-on-Teleport
row — are **TERMINAL-ROSTER.md:414 + CWT-3 §4**, cited whole; every row relay/migration
evidence only (SL-3).

## Sum check (cluster D, quoted)

"6+2+1 = pinned 6+2+1 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.
