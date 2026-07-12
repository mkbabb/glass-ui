# BI.W-ENTER-EXIT-LANDING — the overlay-SFC in-situ register binding map

Band B7 (motion register). Follows W-REGISTER-TABLE (binds the registers it mints) + W-TEMPO. Design: D-MOTION
PASS-1 §2.1/§2.2 (the register-to-surface assignment) + PASS-4B proto (the landing map CLOSED — the file-by-
file in-situ binding plan) + G10 (the assignment table).

## §Mandate

Discharges: **the landing map** (D-MOTION G10 — the register-to-surface assignment table, "the in-situ binding
map for the wave specs", PASS-3-AGGLOMERATION), **UF-G10** (the gear/configurator Sheet "fade in/out animation
needs perfecting" — the SheetContent enter/exit binding + exit tighten in-situ). SUFFUSION-MAP M4–M7 (applied
per-surface).

## §Design

Decided (PASS-1 §2.1 assignment + G10 capture). Each enrolled overlay content SFC binds its register via
`data-reveal` (+ keeps `.glass-reveal`); the exit clock (W-REGISTER-TABLE's named `--exit-overlay-duration`
150 ms / `--exit-transient-duration` 100 ms) applies per-surface. **THE COMPLETE ASSIGNMENT TABLE** (this wave
is the authoritative roster; W-REGISTER-TABLE already bound Select/Command/Combobox as the enter-menu witness):

| register (`data-reveal`) | surfaces |
|---|---|
| `overlay` (default, no attr) | `DialogContent`, `SheetContent` |
| `menu` | `DropdownMenuContent`, `DropdownMenuSubContent`, `ContextMenuContent`, `ContextMenuSubContent`, `SelectContent`†, `ComboboxList`†, `command/*`† |
| `tooltip` | `TooltipContent`, `HoverCardContent` |
| `transient` | `Toast`, `Notification` (retire the `animate-in`/own-transition recipes onto `enter-transient` — M5) |
| capture-decided | `PopoverContent` — **G10**: the ask reads "popover should enter like the dropdown" (→ `menu`) vs focal (`overlay`); decided by the side-by-side capture, then recorded here |

† bound in W-REGISTER-TABLE (the enter-menu proof surfaces); this wave completes the roster + records the
canon. `HoverPopover.vue` (custom): its enter rides the **hover trigger axis** of the D-FACTOR union overlay —
its `data-reveal` binding coordinates with **W-OVERLAY-UNION** (not re-authored here).

- **The recipe body is untouched** — every SFC changes exactly ONE attribute; the library keeps the behavior
  (PASS-1 §2.2). Default (no attr) = `enter-overlay` = byte-identical to today.
- **UF-G10 (gear Sheet):** `SheetContent` is `enter-overlay`; the "fade in/out perfecting" is the parity-fixed
  enter curve + the tightened named exit clock (200→150 ms) landing in-situ.

## §Work

- Add `data-reveal="<register>"` (1 line each) to: `DialogContent.vue`, `SheetContent.vue`,
  `PopoverContent.vue` (post-G10), `DropdownMenuContent.vue` + `DropdownMenuSubContent.vue`,
  `ContextMenuContent.vue` + `ContextMenuSubContent.vue`, `TooltipContent.vue`, `HoverCardContent.vue`.
- `Toast.vue:77` + `Notification.vue:77,93` — bind `enter-transient` (the M5 transient recipe swap, if not
  already landed in W-REGISTER-TABLE's transient mint — this wave OWNS the in-situ binding).
- Record the assignment table as canon (`docs/precepts/motion-canon.md` §register-table).

## §Acceptance

Gate: **`proof:animation-coherence`** REGISTER-BINDING positive arm (minted in W-REGISTER-TABLE) — the
assignment table above is the gate's ROSTER: every enrolled overlay content SFC carries `.glass-reveal` + its
assigned `data-reveal`; a raw entrance transition on an enrolled overlay REDs; a roster surface missing its
binding REDs.
- **BORN-RED at HEAD**: Toast rides `animate-in` (not `enter-transient`); the overlays are default-only (no
  `data-reveal`). Self-test bite: a synthetic enrolled overlay with a raw `transition` (no `.glass-reveal`)
  reds.

## §π/DELTA

**The full overlay band** captured — each surface enters in its assigned register: homogeneous-yet-distinct
(UF-G2 popover reads like the dropdown), the gear Sheet fade in/out perfected (UF-G10), the Toast/Notification
transient center-seed bloom, every exit tightened to ~150/100 ms with 0 overshoot. Chrome + Safari, both modes.
Rides W-REFLECT (`proof:ba-gestalt` overlay-band verdict). DELTA: `W-ENTER-EXIT-LANDING-DELTA.md`.

## §Obligations

- **G10 Popover** focal-vs-menu capture decision (the assignment-table cell) — resolved before this wave's π.
- **HoverPopover** `data-reveal` binding coordinates with W-OVERLAY-UNION (D-FACTOR) — the hover trigger axis
  owns HoverPopover's surface; this wave does not re-author it (cross-wave note).

## §Dispositions

- The register-to-surface assignment table: recorded as CANON (`motion-canon.md`).
- Toast / Notification `animate-in` + own-transition recipes: **RETIRED** onto `enter-transient` (clean break,
  no alias).
