# BI.W-MENU-TRIGGER — ContextMenu folds onto Menu as `trigger=context`

Band B8 (Kronecker factorization). Follows W-OVERLAY-UNION's fold pattern. Design: D-FACTOR FACTOR-B menu
cluster (PASS-1; PASS-4B factor proto — Menu[trigger] the cleanest fold, proves the pattern generalizes
past overlays).

## §Mandate

Discharges: UF-P7 (the Kronecker factorization applied to the menu cluster). Registry: FAM-10 mechanism-
distinctness law (ContextMenu owns no distinct mechanism vs DropdownMenu: identical roving-focus/typeahead,
items already share ONE `menuItemVariants`).

## §Design

Decided (PASS-1 menu cluster): ContextMenu FOLDS onto the Menu family as a `trigger` axis value
(`trigger="context"` — right-click/long-press anchoring) vs the default `trigger="click"`. Same reka
roving-focus + typeahead + `menuItemVariants` rows; the trigger is paint/anchoring, not mechanism. Select
(listbox) and Combobox (combobox) BOTH SURVIVE (distinct ARIA roles + keyboard models — the census law
protects them). The trigger-axis fold is the SAME shape as the overlay `trigger` axis (one discipline, two
families).

## §Work

- `src/components/ui/dropdown-menu/` (the Menu survivor) — add the `trigger: "click" | "context"` axis; the
  `context` value binds the right-click/long-press anchor (the reka `ContextMenuTrigger` anchoring folds
  into the Menu root's trigger branch).
- DELETE `src/components/ui/context-menu/` (ContextMenu* + index) + the `./context-menu` subpath
  (`package.json:382`) as a NAME. The `ContextMenuContent.vue:40` surfaceClass call moves to the Menu path.
- `/api` + MIGRATION.md rows → W-FACTOR-ASKS.

## §Acceptance

Gate: **`proof:fold-delete`** (menu clause, authored in W-AXES-GATES).
- menu clause (BORN-RED at HEAD — ContextMenu dir + subpath live): `ui/context-menu/` dir-absent,
  `/context-menu` subpath-absent, no live `ContextMenu` import in `src/`; survivor Menu[trigger] present →
  GREEN.
- axes membership: `TRIGGERS` tuple (from W-AXES-GATES) includes `context`; the roving-focus/typeahead
  parity is asserted unchanged (both trigger values share ONE menu engine).
- Self-test bite: a synthetic re-added ContextMenu dir REDs the menu clause.

## §π/DELTA

**Menu[trigger] roving-focus + edge parity** π: the `trigger=context` right-click open + roving Arrow/Home/
End + typeahead reads identically to `trigger=click`, Chrome + WebKit, BOTH modes. DELTA:
`W-MENU-TRIGGER-DELTA.md`. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)).

## §Obligations

- None beyond the fold-delete + the migration rows (W-FACTOR-ASKS). No cross-repo consumer of ContextMenu
  found in the round-2b roster (confirm at execution via the invariant-11 probe).

## §Dispositions

- Terminalizes the ContextMenu fold: **FOLDED-TERMINAL** onto `Menu trigger=context`. Clean break, no alias.
- Command survives as its own root (the CONTESTED cell resolved SURVIVE per the census — a distinct
  command-palette mechanism); NOT folded here.

## §Inbound acceptance constraints (the 2026-07-12 marking pass)

- **value.js L11 — dropdown-menu glass tokens**: the menu surface exposes `--dropdown-menu-bg/
  border/shadow`-class consumer-retunable tokens (or the equivalent under this wave's factored
  grammar — the NAME follows the factor, the retune AXIS is the ask). One menu token surface,
  consumer-reachable, recorded in the outbound at land.
