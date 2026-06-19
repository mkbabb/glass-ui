# BC Band 6 (controls) — DELTA (the controls WORK, paint-verified)

**Binding paint proof:** radio-fix + config-right → **42 π pass** both projects (real-GPU + coarse-touch),
both modes. All 5 device-free gates GREEN; `proof:no-shadcn-default` flips fully GREEN.

## What landed
- **RADIO-FIX** — the §F "radios don't work" chronic killed at ROOT: the `@utility touch-hit-area` coarse
  `::before` hit-overlay carried `pointer-events:auto`, becoming the topmost hit target and INTERCEPTING the
  pointer before reka's host onClick. Flipped to `pointer-events:none` (the pointer falls through; the 44px
  WCAG floor stays as pure geometry). Generalized the Slider's local fix to the SHARED utility — Checkbox/
  Switch/RadioGroupItem/TagsInput/MultiSelect all gain the integrity fix. The checked ring reads a clear
  filled glass disc (`--control-checked-bg`, dot-vs-fill lDelta 0.677/0.477). **Radios genuinely toggle on
  mouse + touch + keyboard** (reka roving verified live — select-on-arrow needs the key HELD, a real
  down→hold→up).
- **DROPDOWN-FIX** — the dropdown no-shift (`scrollbar-gutter:stable`, a pure layout reservation), aligned
  (`align:start`), the dot gutter-coupled + aria-hidden. SelectSeparator `bg-muted` re-pointed.
- **CONTROL-SMOOTH** — killed control lag, square→rounded; reads the SPRING-EASE register + AFFORDANCE-MAP
  (one-clock fence, no control-local spring); owns the toggle/tags-input/switch reskins.
- **CONFIG-RIGHT** — all configurators: controls on the RIGHT (two-column aside) on desktop.
- **COMPLETION-SEAL** — the earned-GOLD one-shot seal on the `/completion-seal` subpath (reads
  `--phase-complete-color`/`--color-gold` + `--metal-glow-*`), compositor-only.

## The clean break (no-backwards-compat)
`<Button variant="solid">` RETIRED — the unused back-compat escape hatch (the opaque `bg-primary` fill) is
gone (MIGRATION.md). This removed the LAST `proof:no-shadcn-default` shadcn-neutral residual → fully GREEN.
The loud CTA is now `variant="accent"` (gold-on-glass).

## The live-π caught (both were spec-sim, source correct)
The 8 initial radio-fix failures were spec-sim artifacts, NOT real defects: (1) the keyboard arm used
`keyboard.press()` (keydown+keyup too fast for reka's held-key select-on-focus `setTimeout(0)`) → fixed to a
real held key; (2) the contrast ceiling `<0.97` was mis-calibrated vs the gate-locked `color-mix(--primary
88%)` recipe (resolves 0.976/0.986) — the atom is "a glass-TINTED fill, not a glass PLATE" by design → the
guard re-aimed at the real disease (a raw opaque α=1.0 slab), keeping the lDelta contrast assertion.

## Booked to the CUT (cardinal close)
`proof:ba-gestalt` (the 15-surface PIXEL roster) is the cumulative anti-disease ledger with G7 auto-revoke:
editing any surface-path re-stales that surface's capture until re-captured + re-pixel-read. It spans surfaces
across ALL bands (incl. `viz-procedural` = Band 4, not yet built), so the full roster goes GREEN only at a
stable all-surfaces-built point. The full roster re-capture (render all 15 surfaces live, save light+dark
PNGs, record surface-hashes, verify warm-cream pixels) is the **cardinal CUT-close** (Band 10). Mid-build RED
is by-design (the gate's own message: "born-RED until a wave paints warm-cream + re-captures").
