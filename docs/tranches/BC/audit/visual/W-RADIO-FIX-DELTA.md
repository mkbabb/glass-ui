# BC.W-RADIO-FIX — DELTA (radios toggle on every input path + a clear glass selected-state)

The §F headline binding bug ("ALL radio buttons don't work + no proper toggle states")
closed on TWO coordinated axes at the ONE component: the BINDING (the tap reaches reka on
every input path) + the LEGIBILITY (outline → filled glass disc with a contrast centre dot).

## The gestalt (what a reader sees)
Open `/forms/checks` and the RadioGroup behaves like a real iOS-27 radio set: tap any
option — by mouse, by touch, by keyboard arrow — and it IMMEDIATELY snaps selected, the
prior releases, exactly one filled dot per group. The selected ring reads as a clear,
glass-tinted filled disc (`--control-checked-bg`, the glass-`--primary` over the floating
tier) with a legible warm-cream centre dot (`--primary-foreground`) — a real material step,
not a near-invisible dark hairline you squint to tell from the unselected siblings. The
disabled `drone` option stays inert + dim. Dark mode: the chromatic violet `--primary` fill
+ the dark-ink `--primary-foreground` dot read by construction. Nothing "does nothing when
clicked" — the headline §F bug is gone on every input path.

## The root cause (the binding no-op) + the fix
The reka chain was sound (`RadioGroup.vue` `useForwardPropsEmits` forwards `modelValue`
correctly; reka's `Radio.vue` binds `onClick` on the host `<button>`). The live no-op was
the SURFACE STACK: `@utility touch-hit-area`'s `::before` hit overlay carried
`pointer-events: auto`, so on a coarse pointer the absolutely-positioned 44px pseudo became
the topmost hit target across the whole box and INTERCEPTED the real pointer event before it
reached the host's listener — the silent no-op the MEMORY `glass_ui_binding_verification`
chronic names (invisible to vue-tsc + units, only a live tap catches it). The fix flips the
pseudo to `pointer-events: none` (the swallow-fix): the pointer falls through to the host so
the tap reaches reka on EVERY input path, while the 44px GEOMETRY still satisfies the
WCAG-2.5.5 readback (getComputedStyle reads `min-width/height`, not pointer-events — the
floor is the HIT box, never a pointer-swallowing overlay). This is the same integrity
discipline the Slider's own `.slider-thumb.touch-hit-area::before` override (AY.W-SCALE2)
already discovered, now ONE source for the whole six-atom hit-area family.

## The four source moves (this wave's half)
- **A — the shared selection register (minted ONCE).** `tokens/scale-paper.css` mints
  `--control-ring` (the unchecked outline, ~12% warm-ink — the NAMED selection-atom exception
  above the ≤4% post-BLACK-BAR rim, so a 16px circle still reads as a DEFINED ring without the
  dark `--primary` hairline) + `--control-checked-bg` (the selected glass-fill,
  `color-mix(in srgb, var(--primary) 88%, var(--glass-bg-floating))` — the recipe lives AT
  the token, declared the `--focus-ring-shadow`/`--invalid-ring` way). Both warm-derived
  (no gray, BA.W-NO-GRAY).
- **B — the radio reads the register.** `RadioGroupItem.vue`'s unchecked ring is
  `border-(--control-ring)`; `data-[state=checked]` paints `bg-(--control-checked-bg)` +
  `border-(--control-checked-bg)` (outline → filled glass disc) + `text-primary-foreground`
  (the contrast dot ink). The `<Circle>` reads `fill-current` so it inherits the host's
  checked ink (one-source). `tap-squish focus-ring touch-hit-area` +
  `disabled:opacity-disabled` survive the re-skin.
- **C — Checkbox re-points onto the SAME token.** `Checkbox.vue`'s inline
  `color-mix(... --primary 88% ...)` literal (checked + indeterminate) is replaced by
  `bg-(--control-checked-bg)` — the recipe is minted ONCE, read by both (the anti-paste bite).
  One selection-fill register across the checks family; a re-tint is one edit.
- **D — the swallow-fix.** `@utility touch-hit-area`'s coarse `::before` pseudo is
  `pointer-events: none` (was `auto`). The 44px floor stays (geometry); the pointer reaches
  reka.

## a11y contract preserved (reka-OWNED, not re-authored)
- role + state: reka renders `role="radio"` + `aria-checked` + `aria-disabled` on `drone`;
  the SFC authors NEITHER (it inherits reka — no conflicting `role`/`aria-pressed`/
  `aria-selected`). The group is reka's `role="radiogroup"` with roving focus.
- the contrast dot is decorative (no role/aria/tabindex on `<Circle>` — the state is
  announced via `aria-checked`, not the glyph).
- `.focus-ring` (the `--focus-ring-shadow` token utility) survives the re-skin (the keyboard
  cue beside the pointer affordance).
- the 44px WCAG-2.5.5 hit floor survives (the geometry) while the pointer reaches reka.

## Fences honored
- Clean break, no alias: the `border-primary`/`text-primary` outline + the inline 88%-literal
  are DELETED, re-pointed onto `--control-ring`/`--control-checked-bg`; no legacy alias.
- Warm-not-tinted (BA.W-NO-GRAY): ring + dot stay `--primary`/`--foreground`-derived.
- Coordinates with BC.W-CONTROL-SMOOTH (this wave owns the STATE: fill/dot/ring; that wave
  owns the CLOCK: the transition register) — the fill cross-fades on the existing
  `transition-control` (background-color/color/box-shadow/border-color); no double-author.
- Coordinates with BC.W-BLACK-BAR: `--control-ring` is the named selection-atom exception
  (a defined-but-soft outline), recorded so it does not re-introduce the dark-hairline class.
- Byte-fenced: the Switch track (`.glass-wash`), the GL shaders, the `--glass-level`/tint
  axes — untouched. This wave touches only the radio/checkbox ring+fill+dot + the shared
  hit-area pseudo.

## Machine gate — `proof:radio-fix` (born-RED on HEAD → GREEN)
Born-RED on HEAD: 10 violations (R1 the register absent + Checkbox's inline literal + neither
read; R2 the checked dot vanishes on a same-hue fill; R3 the hit pseudo `pointer-events:auto`
swallow). GREEN at this wave's edits; 7 self-test bites all flag (the anti-paste second
literal, the missing read, the same-hue dot, the pointer-auto swallow, a planted aria-pressed,
a dropped focus-ring, a demo ring fork). SOURCE arm `["local","ci","release"]`, validated by
the executor.

## PAINT (pending-orchestrator-capture)
The live π paint is the ORCHESTRATOR's (the cardinal split). PENDING CAPTURE at
`/forms/checks` BOTH modes:
- a before/after: tapping an option immediately selects it (one filled dot/group), the
  selected ring is a clear filled glass disc with a legible centre dot, the disabled option
  inert+dim.
- a short GIF: a mouse tap, a coarse-emulation touch tap, and an arrow-key move each toggling
  the selection — the toggle on EVERY input path (the §F headline false on all three).
- getComputedStyle: the checked ring's resolved `background-color` is the glass-`--primary`
  fill (α between the unchecked outline and a solid plate — translucent) + the dot resolves
  `--primary-foreground`, both modes; the unchecked ring resolves a visible `--control-ring`
  outline. The hit box resolves ≥44×44px on the coarse-pointer project while the visual ring
  stays 16px. WebKit identical (plain reka button + CSS fill, no `backdrop-filter:url()`).
- the binding π (`tests-visual/radio-fix.spec.ts`): a REAL mouse click, a REAL touch tap, a
  REAL ArrowDown each flip `aria-checked` true on the target / false on the prior, exactly ONE
  checked per group (the chronic-killer e2e — born-RED on HEAD's bare-click no-op); PRM the
  press-snap instant + the `aria-checked` flip + the fill still confirm.
