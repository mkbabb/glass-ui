# Q.W3 Lane A — dock `data-density` split-brain consolidation

**Task ID**: Q-coh-1 (per Qβ-F1 / Qβ-T1)
**Bounds**: `src/styles/dock.css` + `src/styles/utilities.css` only.
**Status**: COMPLETE.

## Charter

`.glass-dock[data-density="*"]` was declared in **two** files:

- `dock.css` lines 61-116 — the canonical four density rungs (`--dock-padding-*`,
  `--dock-control-size`, `--dock-layer-*`, `--dock-tab-padding-*`).
- `utilities.css` lines 375-411 — the SAME four `.glass-dock[data-density="*"]`
  selectors setting `--dock-tab-h-{compact,comfortable,spacious,audacious}` +
  `--dock-tab-h`, plus two `@media` blocks setting `--dock-label-size` for the
  audacious tier.

The split worked **only by cascade-order accident** — `index.css` imports
`utilities.css` (line 73) after `dock.css` (line 68). The token assignments lived
invisibly away from the dock-styles authority file; the `dock.css` `.dock-tab-button`
comment even documented that its own `--dock-tab-h` knob was "set elsewhere
(utilities.css)" — the fracture made explicit in the authority file itself.

Charter: migrate the `utilities.css` dock-density block into `dock.css` so ALL dock
density tokens live at the canonical dock-styles home; remove the cascade-order
dependency entirely.

## What moved

From `utilities.css` → `dock.css` (inserted immediately after the `audacious`
density rung at the `.glass-dock[data-density]` cluster, before `.glass-dock::after`):

1. The four `--dock-tab-h` density-keyed height rungs:
   - `compact` → `--dock-tab-h-compact: 32px`
   - `comfortable` → `--dock-tab-h-comfortable: 38px`
   - `spacious` → `--dock-tab-h-spacious: 44px`
   - `audacious` → `--dock-tab-h-audacious: var(--dock-density-audacious-tab-min-height, 3.5rem)`
   Each sets `--dock-tab-h` to its tier value.
2. The two audacious-tier `--dock-label-size` `@media` carves:
   - `(max-width: 479px)` → `--dock-label-size: 14px`
   - `(min-width: 480px) and (max-width: 719px)` → `--dock-label-size: 15px`

The migrated block carries refreshed comments citing Q.W3 Lane A as the
consolidation site and retaining the original R3-spec / audit-E P0-3 /
audit-D D-Rec-5 provenance.

In `utilities.css` the removed block is replaced by a 5-line marker comment
recording the consolidation and pointing to `dock.css`.

The stale `dock.css` `.dock-tab-button` comment that read *"When a parent
`<GlassDock density="…">` sets `--dock-tab-h` (utilities.css)"* was rewritten to
state the density rungs live in the same file (the `.glass-dock[data-density="…"]`
blocks above) and that Q.W3 Lane A closed the cascade-order split-brain.

## The cascade-order dependency removed

Before: `--dock-tab-h` resolution depended on `utilities.css` being imported AFTER
`dock.css`. Had a consumer (or a future re-order of `index.css`) flipped the import
order, the `--dock-tab-h` rungs would still resolve — but the split-brain meant the
density token home was non-obvious and any future edit to the `dock.css` density
rungs would silently fail to account for the `--dock-tab-h` half living elsewhere.

After: every `.glass-dock[data-density="*"]` declaration — padding, control-size,
layer geometry, tab-padding, **and** `--dock-tab-h` + `--dock-label-size` — lives in
`dock.css`. The `--dock-tab-h` consumer (`.dock-tab-button { min-height: var(--dock-tab-h, …) }`)
is in the same file. Custom-property resolution is order-independent across distinct
rules; there are no equal-specificity overrides between files anymore. The
`index.css` import order is now irrelevant to dock density token resolution.

## Verification

- `npm run typecheck` — GREEN (`vue-tsc --noEmit`, no errors).
- `npx vitest run` — GREEN (32 files, 377 tests passed).
- Fleet-wide grep (`data-density` + `--dock-tab-h` + `--dock-label-size` across
  `src/**/*.{css,vue,ts}`): all `--dock-tab-h` / `--dock-label-size` *declarations*
  and all `.glass-dock[data-density]` *selectors* are now in `dock.css`. The two
  residual `utilities.css` hits are inside the marker comment (no live rules).
- No `.vue` / `.ts` source depends on the `utilities.css` location — the only Vue
  reference (`DockTabButton.vue` lines 46-50) is a provenance comment already
  pointing at `dock.css` as "the canonical dock-styles home"; no change needed.
- `dock-group.css` `.dock-group[data-density="*"]` is a DIFFERENT primitive
  (`.dock-group`, not `.glass-dock`) — out of scope, untouched.

## Follow-up (out of bounds for this lane)

`typography.css` lines 409-411 (the `@utility dock-label` recipe comment) still
reads *"utilities.css §audacious mobile carve declares `--dock-label-size`"* — now
stale, the carve lives in `dock.css`. `typography.css` is owned by another W3 lane;
this doc-drift is flagged for the W3 doc-drift / CLAUDE.md refresh pass. It is a
comment-only staleness — the `var(--dock-label-size, …)` consumption itself is
correct and unaffected.

## Verdict

PASS. Hard gate (a) — *"dock `data-density` consolidated to `dock.css`; zero
cascade-order dependency"* — satisfied. The dock density split-brain (Qβ-F1) is
closed; dock now holds the "one CSS authority file" discipline across its full
density token surface.
