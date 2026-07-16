# BI.W-REGISTER-TABLE — the named motion registers over the ONE `.glass-reveal` recipe

Band B7 (motion register). Follows W-SPRING-PARITY (reads the parity-fixed clocks). Design: D-MOTION PASS-1
(§2.1 the register table, §2.2 the binding mechanism, §2.6 the universal literal-ban) + PASS-4B critique
(91% — the register table calibrated with the KEY CORRECTION) + MOTION-LADDER §2/§5 + SUFFUSION-MAP R3/R4/
M4/M5/M6/M7.

## §Mandate

Discharges: **UF-G1** (general animation audit → the register collapse; timing curves tighter + responsive —
the "options for longer" clause is served by the sibling **W-TEMPO**), **UF-G2** (popover enters like the
dropdown — homogeneous animation language), **UF-G3** (dropdown bounce refined), **UF-G4** (context-menu +
hover-card tightened). SUFFUSION-MAP M4 (overlay enter), M5 (transient), M6 (exits), M7 (rhythm asymmetries),
R3 (enter recipe body), R4 (named clocks).

## §Design

Decided (PASS-1 hybrid + PASS-4B calibration; **THE KEY CORRECTION: the parity fix (W-SPRING-PARITY), not
response-shortening, lands the enters in-band** — keep the 400 ms clock, fix the curve):

- **The register table — `src/styles/tokens/motion-registers.css` (the one net-new token file)**, `@import`ed
  AFTER `scheme-spring.css` (reads the parity-fixed `--spring-*` / `--spring-*-duration`, READ-ONLY here — the
  W-GLASS-CAL fence). Each register is a semantic name → a bundle `{clock, curve, scale, rise, blur}`:
  - `enter-overlay` — snappy curve, `--spring-snappy-duration`, scale 0.94, blur **6px** (blur is the
    dominant overlay channel, MOTION-LADDER M4). Q024 retunes only the scale-from value; the spring,
    clock, blur, rise, and coupled reveal grammar remain unchanged. t90 ~212 ms/+3.2% (in the iOS
    130–370 ms materialize band post-parity).
  - `enter-menu` — `--spring-smooth`, tighter clock, scale 0.96, blur 2px. t90 ~239 ms/+0.2%. **THIS IS the
    "dropdown bounce refined" fix (UF-G3) + the "popover like the dropdown" homogeneity (UF-G2).**
  - `enter-tooltip` — `--ease-out-expo` (NO overshoot), fastest decelerating arrival, scale 0.97, 0 rise/blur.
    **THIS IS "tooltip/hover-card tightened" (UF-G4).**
  - `enter-transient` — **NEW spring row `(0.62, 0.90)`** → t90 337 ms/+0.2%, deeper scale-from (~0.5), heavier
    blur; the gentle-class CENTER-SEED bloom (MOTION-LADDER M5). Toast is its sole current consumer. Minted in
    `springPresets.ts` + regen (composes on W-SPRING-PARITY's regen fix; widen `SPRING_LINES_RE`/
    `SPRING_DURATION_LINES_RE`).
  - `exit` — a NAMED exit clock (`--exit-overlay-duration ~150 ms` / `--exit-transient-duration ~100 ms`) on
    `--ease-out` (NO overshoot, P2). **Tightens the exit 200 ms → ~150/100 ms (M6), closing the reveal.css
    comment-vs-value drift (`--duration-fast` = 0.2 s; the comment claims ≤150 ms).** Minted as its OWN token,
    NOT a re-tune of the shared `--duration-fast` (which would re-time everything).
  - `press` / `morph` / `cascade` — NAMES over shipped recipes (zero paint change).
- **The binding mechanism — tokenize the ONE recipe, bind by name.** Mint two knobs on `.glass-reveal`
  (`reveal.css:68-72` currently HARDCODE `--spring-snappy`/`-duration`): `--reveal-spring` / `--reveal-clock`.
  The register-choice axis is **`data-reveal="overlay|menu|tooltip|transient"`** — **RENAMED off PASS-1's
  proposed `data-motion`** because `data-motion` is ALREADY the shipped BH.W-MOTION-AXIS reduction axis
  (full/reduced/off, `useMotionAxis.ts`); the collision is real (SUFFUSION-MAP M4/R3 "the renamed register-
  binding attr"). `.glass-reveal[data-reveal="menu"]` swaps ONLY the knob vars; the recipe BODY (`@starting-
  style` from-state `reveal.css:82-105`, data-state legs, coupled channels, PRM carve `:210`) stays ONE.
  Default (no attr) = `enter-overlay`.
- **The `.glass-top-layer` fold (the FOURTH register RETIRED).** `animations.css:381-470`'s native 0.62 s
  `@starting-style` enter is collapsed onto the register bundle (it gains the same coupled `filter` blur-settle
  + register clock); one enter grammar, no fourth recipe. HoverPopover's `glass-top-layer` read re-points.
- **Select / Command / Combobox bindings** — `SelectContent`, `ComboboxList`, Command → `data-reveal="menu"`
  (the enter-menu proof surfaces — the R2 dropdown-bounce fix witnesses; the rest of the 11-SFC roster lands in
  W-ENTER-EXIT-LANDING).
- **Dead-recipe deletes** — the `transitions.css` Vue-`<Transition>` recipes with 0 `src/` consumers:
  `dialog-scale` (`:71-99`), `dropdown` (`:111-122`), `pop`, `fade-slide` (`:130-166`) — census-gated (delete
  the recipe + its `demo/stories/foundations/motion.vue` showcase tile). **`pane-swap` is LIVE (dock —
  `DockLayerGroup`/`dockMorphContext`) and is KEPT.**

## §Work

- NEW `src/styles/tokens/motion-registers.css` (~40 lines of custom properties, not a framework).
- `src/styles/glass/reveal.css:68-72` — tokenize curve/clock (`--reveal-spring`/`--reveal-clock`); add the
  `data-reveal` register variants (knob-var swaps only); mint the named exit clocks; blur-from 4→6–8px overlay.
- `src/composables/motion/spring/springPresets.ts` + `scripts/regen-spring-tokens.mjs` — add the `transient`
  `(0.62,0.90)` row (regen emits its `linear()` + `-duration`).
- `src/components/ui/toast/Toast.vue:77` + `src/components/ui/notification/Notification.vue:77,93` — bind
  `enter-transient` (retire the `animate-in`/`slide-in-from-*-full` + the own `transition` — clean break).
- `src/components/ui/select/SelectContent.vue`, `combobox/ComboboxList.vue`, `command/*` → `data-reveal="menu"`.
- `src/styles/transitions.css` — delete the census-confirmed dead recipes + `demo/.../motion.vue` tiles.
- `src/styles/animations.css:381-470` — fold `.glass-top-layer` enter onto the register.

## §Acceptance

Gate: **`proof:animation-coherence`** EXTENDED IN PLACE (3 arms, PASS-1 §2.6):
- **(a) universal literal-ban** — WIDEN the DURATION-BAND arm from the anchor set to ALL `src/styles/**/*.css`
  + all `src/**/*.vue` `<style>` blocks, exempting the token homes (`scheme-motion.css`, `scheme-spring.css`,
  `motion-registers.css`) + the continuous-loop `animation:`-period exemption.
- **(b) TEMPLATE-DURATION arm** — `.vue` `<template>` scan for Tailwind `duration-[Nms]`/`duration-N`/`ease-
  […]`/`delay-[Nms]` → RED (compose a register).
- **(c) REGISTER-BINDING positive arm** — every enrolled overlay content SFC carries `.glass-reveal`
  (+ optional `data-reveal`); a raw entrance transition on an overlay REDs. (The full roster lands in
  W-ENTER-EXIT-LANDING; this arm is minted here.)
- **BORN-RED at HEAD**: `reveal.css:68` hardcodes `--spring-snappy` (untokenized — no `data-reveal` axis
  possible); the dead `transitions.css` recipes live; Toast rides `animate-in`. Each arm ships a planted-
  violation self-test bite.

## §π/DELTA

**The overlay enter registers visibly DISTINCT** frame-series — `enter-overlay` (Dialog) vs `enter-menu`
(dropdown, the refined bounce) vs `enter-tooltip` (tooltip) vs `enter-transient` (Toast center-seed bloom); the
dropdown bounce refined (UF-G3); the exit tighten. **G1 — Safari `@starting-style` var-swap honesty**: does
Safari resolve the SWAPPED register custom properties (`--reveal-spring`/`--reveal-clock`/scale/blur) inside
`@starting-style` at first paint on reka's mount-already-open path (closed on genuine WebKit at pass-3;
re-verify on device) — THE gating risk for the binding mechanism. Chrome + Safari, both modes. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)
(`proof:ba-gestalt` overlay-band). DELTA: `W-REGISTER-TABLE-DELTA.md`.

## §Obligations

- G1 Safari `@starting-style` var-swap device capture. If it fails, the fallback is per-register
  `@starting-style` blocks (same table, fatter CSS — a known honest fallback, not a redesign).
- G10 Popover assignment (focal `enter-overlay` vs `enter-menu` — the ask reads both ways) — decided by the
  side-by-side capture, applied in W-ENTER-EXIT-LANDING.
- MIGRATION rows: the `data-reveal` axis (additive); the retired `transitions.css` recipes (clean break, no
  alias) → W-FACTOR-ASKS / MIGRATION.md.

## §Dispositions

- The FOURTH register (`.glass-top-layer` 0.62 s native enter): **FOLDED** onto the register bundle.
- `dialog-scale` / `dropdown` / `pop` / `fade-slide` `transitions.css` recipes: **RETIRED** (census-gated,
  clean break, no alias). `pane-swap`: **KEPT** (live dock consumer).
- PASS-1's `data-motion` register-axis proposal: **SUPERSEDED** by `data-reveal` (the BH.W-MOTION-AXIS
  collision resolved — `data-motion` stays the reduction axis, wired in W-TEMPO).
