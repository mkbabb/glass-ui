# BI.W-CHIP-FOLD — ToggleChip + SelectableChip fold into ONE `Chip` (subpath-only, value.js-boundary)

Band B8 (Kronecker factorization). Design: D-FACTOR FACTOR-B chips cluster (PASS-1; PASS-4B factor proto —
the Chip value.js payload MEASURED at 26KB gzip, decided subpath-only + dynamic-import boundary).

## §Mandate

Discharges: UF-P7 (the Kronecker factorization applied to the chip cluster). Registry: FAM-10 mechanism-
distinctness (ToggleChip's `variant` is literally a name-synonym of SelectableChip's `shape`; both are one
interactive lozenge over one CVA).

## §Design

Decided (PASS-1 + PASS-4B proto):

- ToggleChip + SelectableChip FOLD into ONE **`Chip`** with `shape: pill | cell` × `tone` (ToggleChip's
  `variant` → `shape` is a pure name-synonym rename — the CVA merges compile-time). Badge SURVIVES (static,
  non-interactive). IconChip is a DISTINCT name over a distinct mechanism (ruling 6 — the IconPop rename is
  REJECTED, resolved-by-distinctness); it is NOT folded.
- **The value.js quarantine (the measured 26KB gzip decision):** `SelectableChip.vue:27` statically imports
  `useAccentTone`, and `useAccentTone.ts:22` statically imports value.js (`OKLCHColor`/`safeAccentColor`/
  `rawOklchToOklab`) — so the chip chunk is value.js-BEARING in its static graph despite the runtime
  `return ''` short-circuit on `var()` tones. The fix (the proven BC.W-AX-BP-LAZY/spectrum-walk pattern):
  a sync value.js-FREE shell + a dynamic `import('./accent-tone-solve')` leaf loaded ONLY on a concrete
  `#hex`/`oklch(…)` tone. So a plain-boolean toggle `Chip` (a `var()` tone) stays ~1KB value.js-free.
- **`Chip` ships subpath-ONLY** (`/chip`, OFF the root barrel) — the value.js-bearing leaf never rides the
  vueuse/value-free root barrel (the /border-progress subpath-only precedent).

## §Work

- `src/components/custom/chip/Chip.vue` (+ `chipVariants.ts` merging the two CVAs + `index.ts` + README) —
  `shape: pill|cell` × `tone` × `surface`. `/chip` subpath; OFF the root barrel; `ChipProps` on `/api`.
- SPLIT `src/composables/color/useAccentTone.ts` → a sync value.js-free shell (the `var()` pass-through +
  the `import('./accent-tone-solve')` boundary + a load-once cache) + `accent-tone-solve.ts` (the
  value.js-bearing dynamic leaf). `SelectableChip`/`Chip` import the shell.
- DELETE `src/components/custom/toggle-chip/` + `src/components/custom/selectable-chip/` (ToggleChip.vue,
  SelectableChip.vue, chipVariants.ts, READMEs, index) + the `./toggle-chip` (`package.json:634`) +
  `./selectable-chip` (`package.json:606`) subpaths.

## §Acceptance

Gate: **`proof:fold-delete`** (chip clause, W-AXES-GATES) + **`proof:bp-lazy`**-style value.js-boundary clause.
- chip clause (BORN-RED at HEAD — toggle-chip + selectable-chip dirs/subpaths live): both dirs dir-absent,
  both subpaths subpath-absent, no live `ToggleChip`/`SelectableChip` import in `src/`; survivor `Chip`
  present → GREEN.
- value.js-boundary clause (BORN-RED — value.js is in the eager chip graph today, ~26KB): the `/chip` eager
  static graph is value.js-FREE (the static-only critical-path walk); `accent-tone-solve.ts` is reached
  ONLY by `import()`; the `var()` fast path is value.js-free + byte-identical → GREEN.
- Self-test bites: a synthetic re-added ToggleChip dir REDs fold-delete; a static value.js import in the
  chip shell REDs the boundary clause.

## §π/DELTA

Byte-diff: the `Chip shape=pill` ≡ the retired ToggleChip, `Chip shape=cell` ≡ SelectableChip, both modes
(0 delta — the CVA merge is compile-time). The value.js-boundary is a bundle-size assert (device-free), not
a paint π. DELTA: `W-CHIP-FOLD-DELTA.md`.

## §Obligations

- The value.js `accent-tone-solve` split is a real build (not a plain toggle) — verify the dynamic leaf
  loads on a concrete-tone chip; the plain toggle Chip stays value.js-free on `/chip`.
- Cross-repo Chip consumers → the migration ledger (W-FACTOR-ASKS); confirm via the invariant-11 probe.

## §Dispositions

- Terminalizes the ToggleChip + SelectableChip fold: **FOLDED-TERMINAL** onto ONE `Chip (shape × tone)`.
- IconChip: **KEPT** (resolved-by-distinctness, ruling 6 — the IconPop rename REJECTED). Badge: **SURVIVES**.
- The `useAccentTone` value.js-quarantine: **LANDED** (the BC.W-AX-BP-LAZY pattern). Clean break, no alias.
