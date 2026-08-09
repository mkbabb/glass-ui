# glass-ui → value.js — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (value cell `:407`) — full ledger **CWT-3 §4**, cited, never restated ·
**precedent** the #85 outbound form (whose §2 is this repo's easing inbound half, MARKED
ADDENDUM, NOT OPTIONAL — adopt the two together).

Consumer-updates ruling: 8.0.0 is published (`v8.0.0` at `17a11bc5`); value.js updates
via a marked addendum in ITS tranche. **No edits were made in value.js.** Repo state at
the census: branch `tranche-u` · dirty 12 · live tranche **X** (A–X) · `package.json:83`
`"@mkbabb/glass-ui": "^7.0.0"`.

---

## 1 · `./forms` → `./input` (1 module-import edge)

`MIGRATION.md:21` — the four doors are `./input`/`./textarea`/`./checkbox`/`./radio-group`:

- `demo/ui/input/index.ts:1` — `export { Input } from "@mkbabb/glass-ui/forms";` → `./input`

## 2 · `grain` — REMOVED from the whole library (1 prop edge)

- `demo/picker/controls/ComponentSliders/ComponentSliders.vue:29` — `:grain="false"` on
  a glass-ui `<Card>`. Delete the attribute (`MIGRATION.md:440`). Under
  `vueCompilerOptions.checkUnknownProps` a retained `<Card grain>` is a **hard typecheck
  error**; without the flag, a silent no-op.

Homonym/observational hits qualified OUT by the enumerator: `ComponentSliders.vue:10`
(comment) · `demo/styles/shell.css:160` (comment) ·
`e2e/smoke/oracles/o19-netting-luma.spec.ts:23` + `gradient-pixels.ts:43` ("paper-grain"
prose) · `o7-card-census.spec.ts:104/224/234` — the o7 oracle READS `el.dataset.grain`
(observation, not the seam). Forward note on that oracle: at 8.0.0 the `data-grain`
attribute never renders, so its grain column reads `undefined` — re-pin the oracle's
expectation at the adopt rather than reading the absence as a regression.

## 3 · STRING-LITERAL CLASS

**Zero** in this repo (the five constellation blind-spot edges live at atlas-active,
words, speedtest — row66 RECORD §A1).

## 4 · Zero-classes + the peer

dropdown-menu 0 · sheet 0 · dead `./api` 0 · specular 0 · TagsInput 0. The
`vue-component-type-helpers ^3.0.3` peer lands in `peerDependencies` at the adopt.

## Not restated here

The select re-export ×3, easing ×6 (#85 §2 — the live `role` regression, the three
seat-law retirements, `data-testid`→`data-slot`), the `--slider-track-bg` ×4 relay **now
BREAKING at 8.0.0** (the typed track seam landed `abb1eba2`, no alias — o19 A-5), A-16
RTL (consume `dir`/`inverted`), A-18 WatercolorSwatch into #84's indicator slot, A-15
`paintedTintOf` retirement, A-10 `useSliderAnnouncements.ts` deletion at the #35 adopt —
**TERMINAL-ROSTER.md:407 + CWT-3 §4 + the #85 addendum**, cited whole.

## Sum check (cluster D, quoted)

"1+1 = pinned 1+1 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.

> QUALIFY-OUT (verify pass): 7 files under `docs/tranches/V/megatranche/audit/` import glass-ui subpaths incl. `./dropdown-menu` (`probe-L4-barrel/sub-entry.js:1`) — audit-record fixtures outside the pinned census (not built code); the zero-claim above is for live code only.
