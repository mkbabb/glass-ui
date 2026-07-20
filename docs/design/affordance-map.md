# affordance-map — the interaction-affordance idiom (BC.W-AFFORDANCE-MAP)

The binding canon home for "every interactive element answers the pointer the same
liquid way." Every interactive element in glass-ui draws from ONE closed set of FIVE
affordance primitives, all riding the EASED springs (`BC.W-SPRING-EASE`) on their OWN
per-spring clock with the coupled fade, all compositor-only (`proof:no-layout-animation`),
all PRM-carved. The motion vocabulary is closed: a SIXTH pointer cue would need its own
wave (the proportion fence, `motion-canon.md` "morph the meaningful transition, never
everywhere-jitter").

This doc is SINGLE-SOURCED into the gate: `proof:affordance-map` READS the per-element
MAP table below and reds an interactive element that is unmapped OR mapped-but-inert OR
desynced/abrupt (gate + canon cannot drift — the `proof:precept-current` precedent).

## The five primitives (the closed vocabulary)

Each is ONE delivery — the CUE the user reads, the PRIMITIVE that delivers it, the EASED
register it rides (its `--spring-<name>-duration` clock + the coupled-fade partner), the
PRM behavior.

1. **HOVER-LIFT** — *"this is touchable."* A sub-perceptual scale lift
   (`--scale-hover-btn` 1.05 / `--scale-hover-dock` 1.1 / `--scale-hover` 1.08,
   `tokens/scale-paper.css`) on `--spring-smooth`, the surface bg shifting to the next
   glass tier, the gleam waking — the three legs as ONE motion (the `transition-control`
   utility `utilities/btn.css` carries border/shadow/transform/color TOGETHER so they
   co-time). PRM: the scale/translate drops, the bg/color leg keeps.
2. **GLEAM-TRACK** — *"the light bends toward my finger"* (apple-ios27.md §1.2). The
   specular catch-light following the pointer: ONE position-write source
   `createSpecularWriter` (`useSpecularTracking.ts`) delivered as the `v-specular`
   directive (`vSpecular.ts`, zero-wiring tier-root auto-arm) or `useSpecularPointer`
   (the angle-adding rim glint). It feeds the host `--mouse-x/y` write; the
   `.glass-material::before` recipe maps it onto `--specular-x/y` and reads the
   `--glass-specular-intensity-{rest,hover,active}` rungs (rest 0 → hover 0.1 → active
   0.16, `glass/material.css`) so the gleam WAKES on hover and ILLUMINATES under the
   touch-point on press (the touch-illumination coupling). The position-tracked leg rides
   `--ease-standard`. PRM: the gleam pins to the centred 50% rest (no live tracking).
3. **PRESS-SQUISH** — *"I activated it"* + touch-illumination (apple-ios27.md §2.5). The
   iOS interruptible coupled spring-press: `--scale-press` 0.96 on the `press` register
   (response 0.15 / ζ 0.86, minted by `BC.W-SPRING-EASE`, the `--spring-press` twin), the
   coupled `--*-press-t` brightness/gleam-illumination leg on the SAME spring scalar
   (`useSpringPress.ts` → `useLiquidPress.ts` → the `useLiquidFlex` reciprocal X/Y
   squish, capped LOW). The CSS `.tap-squish:active` is the no-JS floor. PRM:
   `SpringProgress.respectReducedMotion` snaps the value (the gesture confirms, physics
   off).
4. **DRAG-MORPH** — *grab → follow ~1:1 → gel-squish → fling-to-nearest* (`useDragMorph.ts`
   — kf `Draggable` + `SpringProgress` (eased `snappy`) + `useLiquidFlex` capped ≤
   `--tab-indicator-max-stretch` + `decayRest` nearest-snap), for elements that EARN a
   pull (the tab pill, the DockLayerGroup rail, the Slider track, the SortableHandle) —
   NOT every element (the proportion fence). PRM: the gesture still functions, the squish
   is off, the release is an instant nearest-snap.
5. **FOCUS-RING** — *the keyboard-reachable cue,* the non-motion a11y affordance distinct
   from hover. The `.focus-ring` utility keyed off `--focus-ring-shadow`
   (`utilities/base.css`), consumed at every interactive atom's CVA base. EVERY
   keyboard-operable element carries it (WCAG 2.4.7 / 2.1.1). NOT a motion register; it
   is the always-present a11y floor beside the four motion affordances — F is NEVER `—`
   on an operable element.

**The sixth register is OUT of this set by design (the reveal-surface bloom).** The
top-layer reveal surfaces (Tooltip/Popover/Dialog/Drawer/HoverCard/menu content) carry
the `.glass-reveal` SURFACE-BLOOM (`glass/reveal.css` + `useLiquidReveal`) — a SURFACE
that APPEARS, not an ELEMENT a pointer touches. It is recorded in the map (the
reveal-surface row) so the gate does not red a Dialog for "no hover-lift," but it is NOT
one of the five pointer affordances; it carries the bloom + focus-trap as its own floor.
The TRIGGER that opens it is on the map as a Button/AccordionTrigger row.

## The per-element MAP (the binding assignment)

Columns: **H** = HOVER-LIFT · **G** = GLEAM-TRACK · **P** = PRESS-SQUISH · **D** =
DRAG-MORPH · **F** = FOCUS-RING. A `✓` cites the wired class/token; a `—` is
recorded-not-befitting (the proportion fence — a checkbox has no gleam, a hairline does
not squish); **GAP** is the inert/desynced cell the gate reds. The `dir` cell names the
component package the gate walks (the affordance class is read across the dir's files —
the SFC template + the CVA `index.ts`).

| element class | dir | H | G | P | D | F | delivering primitive(s) / source |
|---|---|---|---|---|---|---|---|
| **Button** (glass: default/glass/primary-audacious) | ui/button | ✓ `scale-hover` | ✓ `v-specular` auto-arm | ✓ `useSpringPress`+`tap-squish` `--glass-btn-press-t` | — | ✓ `.focus-ring` | `useSpringPress.ts`·`vSpecular.ts`·`index.ts` CVA base; press reads the eased `press` register (`BC.W-SPRING-EASE`) |
| **Button** (solid/destructive/link/secondary/outline/ghost) | ui/button | ✓ `scale-hover` | — (opaque, no glass-tier `::before`) | ✓ `.tap-squish` `:active` + `useSpringPress` | — | ✓ `.focus-ring` | `index.ts` `transition-control`; the gleam is glass-tier-only (recorded) |
| **DockIconButton** | custom/dock | ✓ `--scale-hover-dock` | ✓ `v-specular` | ✓ `tap-squish`/`:active` | — | ✓ `.focus-ring` | `DockIconButton.vue`·`dock/styles/controls/icon-button.css` |
| **DockTabButton / DockSelectTrigger / DockDropdownTrigger** | custom/dock | ✓ `--scale-hover-dock` | ✓ `v-specular` | ✓ `:active` press | — | ✓ `.focus-ring` (`dock.css`) | `dock/styles/controls/triggers.css`·`dock/styles/controls/tab-button.css` |
| **DarkModeToggle** | custom/dock | ✓ `--scale-hover-dock` | ✓ `v-specular` | ✓ `:active` press | — | ✓ `.focus-ring` (`dark-mode-toggle.css`) | `dark-mode-toggle/dark-mode-toggle.css` |
| **SegmentedTabs pill indicator** (variant="pill") | ui/tabs | ✓ glass plate | ✓ tier `::before` | ✓ squish-on-travel `--stretch` | ✓ `:draggable` (`useDragMorph`) | ✓ roving-tabindex | `useTabIndicator.ts`·`useDragMorph.ts`; reads the eased `snappy` |
| **SegmentedTabs underline indicator** (variant="underline") | ui/tabs | — (a hairline does not lift) | — | — (a hairline does not squish) | — | ✓ roving-tabindex | the ink mark SLIDES on `--spring-snappy` (recorded — the paper material) |
| **menu row** (Dropdown/Context/Select/Combobox/Command items) | ui/dropdown-menu, ui/context-menu, ui/select, ui/combobox, ui/command | ✓ `--menu-row-lift` -1px on `--spring-smooth` | — (a row is quiet — gleam reserved for the trigger) | — (select-on-click, no squish) | — | ✓ `data-highlighted` + `.focus-ring` | `menu.css` (the lift rides `--spring-smooth`, co-timed with the bg tint) |
| **Card** (:pressable, default-OFF opt-in) | ui/card | ✓ (opt-in `cartoon-surface` hover-lift) | ✓ `v-specular` (gated) | ✓ `useLiquidPress` `--card-press-t` → `.glass-press` | — | ✓ `.focus-ring` | `Card.vue`·`cards.css`·`useLiquidPress.ts` (Button #1, Card #2 of `useSpringPress`) |
| **Switch** | ui/switch | ✓ track surface hover | ✓ `.glass-specular-track` (thumb gleam) | ✓ thumb spring `translate var(--spring-snappy-duration) var(--spring-snappy)` | — | ✓ `.focus-ring` | `Switch.vue` (`transition-control`); the live-click reka catch is the π's |
| **Checkbox** | ui/checkbox | ✓ `transition-control` surface | — (16px box, no gleam core) | ✓ `.tap-squish` `:active` | — | ✓ `.focus-ring` | `Checkbox.vue` (`group tap-squish focus-ring transition-control`) |
| **Radio** (RadioGroupItem) | ui/radio-group | ✓ `transition-control` | — (too small) | ✓ `.tap-squish` `:active` | — | ✓ `.focus-ring` (role=radio) | `RadioGroupItem.vue` (`tap-squish focus-ring`) |
| **ToggleGroupItem** (default variant) | ui/toggle-group | ✓ quiet glass hover fill | — (a small chip) | ✓ `.tap-squish` `active:scale-95` | — | ✓ `.focus-ring` | `ToggleGroupItem.vue` (`tap-squish focus-ring`) + `toggle-group/styles.css` (the hover fill) — there is no standalone `toggle/` family |
| **ToggleGroupItem** (variant="card") | ui/toggle-group | ✓ tile hover | — | ✓ `.tap-squish` | — | ✓ `.focus-ring` (role=radio single-arm) | `toggle-group/` |
| **Slider thumb** | ui/slider | ✓ the halo (`data-held`) | — (small dot) | ✓ the drag-grab (pointer-capture) | ✓ the track drag (native pointer-drag) | ✓ `.focus-ring` | `Slider.vue` (`glass-specular-track`); the thumb DRAG is the affordance |
| **DockLayerGroup switcher rail** | custom/dock | ✓ chip hover | — (a rail chip is small) | — (switch-on-click) | ✓ `:draggable` pull-to-switch (`useDragMorph`, #2) | ✓ roving-tabindex | `DockLayerGroup.vue` |
| **AccordionTrigger** (clickable header) | ui/accordion | ✓ `transition-control` hover | — | ✓ `.tap-squish` `:active` | — | ✓ `.focus-ring` | `AccordionTrigger.vue` (`tap-squish focus-ring transition-control`); the content REVEAL is the surface-bloom |
| **CollapsibleTrigger** (clickable header) | ui/collapsible | ✓ `transition-control` hover | — | ✓ `.tap-squish` `:active` | — | ✓ `.focus-ring` | `CollapsibleTrigger.vue` (`tap-squish focus-ring transition-control`); the content REVEAL is the surface-bloom (the AccordionTrigger twin) |
| **composed-Button host** (CarouselNext/Previous, DataTable sort+pagination, MultiSelect chips, NumberField steppers) | ui/carousel, ui/data-table, ui/multi-select, ui/number-field | ✓ (inherits Button `scale-hover`) | ✓ (Button glass gleam) | ✓ (inherits Button `useSpringPress`+`tap-squish`) | — | ✓ (inherits Button `.focus-ring`) | the operable child composes `<Button>` (`from '../button'`) → it IS a Button, inheriting the full Button floor (the routing fence — no second affordance engine) |
| **Tooltip / Popover / HoverCard / Dialog / Drawer / Sheet content** (top-layer reveals) | ui/tooltip, ui/popover, ui/hover-card, ui/dialog, ui/drawer, ui/sheet | — (a surface BLOOMS, it does not hover-lift) | — | — | (Drawer: ✓ snap-drag) | ✓ (the trigger carries focus; the surface traps it) | `glass/reveal.css`·`useLiquidReveal.ts` — the SIXTH-register SURFACE-BLOOM (recorded, off the five-pointer-affordance set) |

A `—` cell is recorded-not-befitting (the proportion fence — the gate does NOT demand
every affordance on every element, it demands the MAPPED floor). The reveal-surface row
is the sixth-register EXEMPTION (the surface traps focus + the trigger carries the ring);
it is NOT counted against the "no inert pointer-element" floor.

## The wiring rules (what the gate asserts)

- **No inert interactive element.** Every mapped element class carries AT LEAST hover-lift
  + focus-ring (the floor); the glass-variant elements carry gleam-track; the press-able
  carry press-squish on the eased register. An interactive element with a `✓` cell whose
  source carries NO such class reds (the map-says-yes / source-says-no catch).
- **The FOCUS-RING is the HARD a11y floor (WCAG 2.4.7 / 2.1.1, never `—`).** Every
  keyboard-operable (non-reveal-surface) element resolves a visible focus indicator
  (`.focus-ring`'s `--focus-ring-shadow`, OR reka's roving-tabindex focus). F is NEVER
  `—` on an operable element; only the reveal-surface sixth-register set is exempt.
- **No desynced AND no abrupt affordance (the §F lag root + the no-abrupt bar).** The
  hover-visual channel (bg/border/color/shadow + scale) rides ONE register (`--spring-smooth`),
  NOT a fast-color-bezier desynced from a slow-scale-spring; an affordance SPATIAL leg
  rides its mapped EASED register (`--spring-smooth` hover / `--spring-press` press / the
  eased `snappy` drag / `--ease-standard` gleam-track), never a raw `linear`/`ease-in`
  accelerating bezier or a `--spring-*` on a generic `--duration-*` (the affordance-scoped
  restatement of `BC.W-SPRING-EASE` S6).
- **The closed five-primitive vocabulary.** The affordances compose `vSpecular` /
  `useSpecularTracking` / `useLiquidPress` / `useSpringPress` / `useDragMorph` /
  `--scale-hover-*` / `.focus-ring` — no sixth hand-rolled affordance engine.
- **The reka stale-binding e2e check** (MEMORY feedback_glass_ui_binding_verification): the
  affordance is verified LIVE (a real pointer hover/press/click in the π), not a source
  assert — a `:pressed`/`v-model` that silently no-ops is caught only by the e2e.

## Booked-successor gaps (recorded, NOT this wave's footprint)

A rationale-bearing exemption (the `proof:no-layout-animation` named-allowlist idiom): an
interactive element that ships a REAL affordance gap whose FIX is a component edit booked
to a successor wave. The gate RECORDS it (so it is never a silent escape — a NEW gap not
on this list reds) but does not red it; the successor closes it in place (no alias).

- **`ui/notification` dismiss button** — `Notification.vue:23` paints a RAW `<button
  @click>` with `transition-colors hover:bg-white/10` and NO `.focus-ring` / `.tap-squish`
  (an inert dismiss, the WCAG 2.4.7 focus gap + no press affordance). **The fix:** re-point
  the dismiss onto `<Button variant="ghost" size="icon">` (the composed-Button floor), the
  SAME routing the carousel/data-table/multi-select hosts already take. BOOKED to the
  Band-6 control-smooth successor (`BC.W-CONTROL-SMOOTH`) — `Notification.vue` is out of
  `BC.W-AFFORDANCE-MAP`'s footprint (the map + the gate land here; the component re-point
  lands there). Recorded so the gate proves the gap is KNOWN, not missed.
- **`ui/tags-input` item + delete button** — `TagsInputItemDelete.vue:19` paints the
  delete control with `touch-hit-area` but NO `.focus-ring`/`.tap-squish`, and
  `TagsInputItem.vue:19` still carries the residual shadcn-neutral focus tokens
  (`ring-ring ring-2 ring-offset-*`) the `proof:deshadcn` reskin gate is born-RED on.
  **The fix:** route the delete onto `<Button variant="ghost" size="icon">` + re-point the
  item focus onto `.focus-ring`. BOOKED to the Band-6 reskin owner (`BC.W-CONTROL-SMOOTH` /
  `BC.W-DESHADCN`) — `tags-input/` is out of this wave's footprint. Recorded so the gap is
  KNOWN; `proof:deshadcn` already tracks the shadcn-token half (the PARTIAL-until-owners-land
  structural pressure).

## Cross-references

- `BC.W-SPRING-EASE` — the EASED curve SHAPE source (the `press` register the press-squish
  reads; the eased `snappy`/`smooth`/`bouncy`/`gentle`/`dock`).
- `BC.W-MOTION-ONE-CLOCK` — the source-spine + clock (`SPRING_PRESETS` → the
  `--spring-<name>-duration` per-spring clocks).
- `motion-canon.md` — §6 register tiers (Position-tracked → `--ease-standard`; SPATIAL →
  `--spring-*`); P3 fade-coupled-to-transform; P5 compositor-only; P6 PRM carve.
