# BI.W-ACCORDION-PRESS — accordion indent kill + the press-register bounded-control rule

Band B7 (motion register). Design: D-MOTION PASS-1 §2.5 R1 + §4 G9 (the press-register census) + SUFFUSION-MAP
R22 (press = bounded-control only).

## §Mandate

Discharges: **UF-G5** ("I don't like how these indent on click." — /containers/accordion). SUFFUSION-MAP R22
(the accordion `tap-squish` on a full-width row; the `transition-control` clobber). D-MOTION G9 (the press-
register census).

## §Design

Decided (PASS-1 R1, re-verified at HEAD):

- **The defect.** `AccordionTrigger.vue:27` composes `tap-squish` on a `flex flex-1 items-center justify-
  between … px-1 py-4` FULL-WIDTH row. `:active` scale ~0.96 about the row's center on a ~600px header reads as
  a horizontal "indent"/jump — a press register is misapplied to a full-width disclosure row.
- **The fix (clean break, no alias).** DROP `tap-squish` from `AccordionTrigger`. Press feedback is the surface
  register already on the trigger: `transition-control` (the `:active` surface tint) + `transition-disclosure`
  (the chevron rotate). Dropping `tap-squish` ALSO fixes the `transition-control` clobber (R22 — `tap-squish`'s
  scale-only `transition` shorthand clobbers `transition-control`'s surface legs; with it gone the surface tint
  transitions coherently).
- **The RULE minted:** the press register is a **BOUNDED-CONTROL register** — buttons, chips, small toggles —
  NEVER a full-width-row/disclosure register (a scale about a wide center reads as a positional jump). The dock
  press bounded-control law (D7) is D-DOCK's surface; this wave owns the LIBRARY-WIDE rule + the accordion.
- **The census (G9).** The `tap-squish`/press-scale consumers at HEAD: `AccordionTrigger` (the defect),
  `CollapsibleTrigger` (`:25` — bounded `rounded-control`, no `flex-1`/`justify-between`; OK), `Button`, `Card`,
  `Checkbox`, `RadioGroupItem`, `SelectTrigger`, `TabsTrigger`, + the configurator/labeled-field/pager-dots
  atoms. The gate asserts none is a full-width disclosure row.

## §Work

- `src/components/ui/accordion/AccordionTrigger.vue:27` — remove `tap-squish` from the `cn(...)` class (keep
  `transition-control` + the `transition-disclosure` chevron).
- The census roster recorded in the gate (`AccordionTrigger` fixed; the bounded consumers pass).

## §Acceptance

Gate: **`proof:press-register`** (NEW, born-RED) — no full-width disclosure row (a class carrying `flex-1` +
`justify-between` together with `tap-squish` / an `:active` scale-press) binds the press register; press =
bounded controls only.
- **BORN-RED at HEAD**: `AccordionTrigger.vue:27` = `tap-squish` on a `flex flex-1 … justify-between` row.
- Self-test bite: a synthetic full-width `tap-squish` disclosure row REDs; a bounded `tap-squish` control (a
  Button) stays GREEN (the detector distinguishes bounded from full-width, not merely "has tap-squish").

## §π/DELTA

**Accordion press** — NO horizontal jump/indent on click (the ~600px header does not scale about its center);
the surface tint + chevron rotate press feedback reads. Chrome + Safari, both modes. DELTA:
`W-ACCORDION-PRESS-DELTA.md`.

## §Obligations

- The dock press bounded-control law (D7) is D-DOCK's press register (the dock's own `--dock-control-press-bg`
  + the lens-departure feedback) — this wave owns the library-wide RULE + the accordion; D-DOCK applies it to
  the dock (cross-band note, no overlap).

## §Dispositions

- Accordion `tap-squish`: **RETIRED** (clean break, no alias — press = `transition-control` + the chevron).
- The **press-register bounded-control RULE**: minted + census-locked (`proof:press-register`).
- The `transition-control` clobber (R22): CLOSED (dropping `tap-squish` restores the coherent surface legs).
