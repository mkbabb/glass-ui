# AX.W59 — Slider redesign: the INTEGRATED-CYLINDER glass standard + the track-height SQUIRCLE spectrum (the EXACTLY-TWO cardinality kept; the LOOK re-authored)

**Band** B · GRAPHICS / glass-IDENTITY · **Severity** minor (a LOOK overhaul on the slider atom — the convergence-2 SOTA idiom: liquid-glass material + squircle design language reach the slider)
· **dependsOn** AX.W52 (the liquid-glass material — the standard fill's glass cylinder reads the W52 backdrop + edge rim) + AX.W56 (the squircle token axis — the spectrum thumb reads `--corner-k-squircle` via a new `--corner-shape-thumb`)
· **Charter** the convergence-2 SOTA pivot (`docs/tranches/AX/audit/USER-DEFECTS-2026-06-08-pass2.md` G1/G3 — glass-FIRST-CLASS + squircles reach every atom; the slider is the last interactive primitive still on the prior flat/circle look)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. The implementer session lands the §FileBounds edits +
> the gate reconcile; the orchestrator drives the §HardGate π live drag/render readback via
> chrome-devtools-mcp (the cardinal AX lesson — the agent has no browser). Per the hardened agent git
> clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **integrated cylinder** is the standard look: the `.slider-range` fill is ONE continuous
> glass rounded-pill pulled left/right; its rounded LEADING edge IS the grab. The reka `SliderThumb` stays
> mounted (a11y/keyboard/focus) but is styled as the cylinder's slim **leading cap** (a faint specular
> grip flush at the fill edge, the track height tall, a pill radius shared with the fill so the seam is
> invisible) — NOT a detached 50% circle. The **track-height squircle** is the spectrum thumb: a near-square
> footprint the FULL track height whose corners read as the iOS superellipse via `corner-shape` (the W56
> axis), spanning the gradient track rather than floating as a circle.

---

## State (the prior look — what this wave abrogates)

The slider already ships EXACTLY TWO recipes (`proof:slider-two-only`: KEYSET + ORPHAN-SCAN + the prior
ROUNDED-KNOB clause). The CARDINALITY is correct + kept; the LOOK is the gap:

- **Standard was a detached 50% circle.** `.slider-thumb` was `width == height, border-radius: 50%` — a
  floating circular knob sitting in a flat `--primary` fill bar. It read as a separate disc on a track, not
  the iOS continuous integrated cylinder the glass-first-class pivot wants. The fill (`.slider-range`) was a
  flat solid bar with no glass material.
- **Spectrum was a small ringed circle.** The spectrum thumb was a `0.85×` bordered disc floating on the
  gradient track — a circle, not the track-height squircle of the iOS color-picker idiom.

The redesign keeps the EXACTLY-TWO cardinality (the `proof:slider-two-only` KEYSET + ORPHAN-SCAN clauses are
UNCHANGED) and RE-AUTHORS each LOOK, with the gate's third clause RECONCILED from the 50%-circle ROUNDED-KNOB
contract to the new design contract (a clean break — the integrated cylinder + track-height squircle are NOT
a 50% circle).

---

## Goal

Two glass-first-class slider looks, EXACTLY two, the cardinality machine-locked:

1. **standard (DEFAULT) — the integrated-cylinder glass slider.** The thumb is fully integrated into the
   filled track: ONE continuous rounded glass cylinder pulled left/right, NO visible demarcation between
   thumb and fill. The fill is a glass rounded-pill (W52 backdrop blur + edge rim, tinted to `--primary`)
   whose rounded LEADING edge is the grab — NOT a separate circle. The reka `SliderThumb` stays for
   a11y/keyboard/focus but is styled as the fill's leading cap (a faint specular grip at the edge for
   affordance, no detached circle). The four-state contract rides the box-shadow halo + the iOS press
   spring on the transform channel. `keepDockOpen` + `.focus-ring` KEPT.
2. **spectrum — the value.js gradient track + a track-height squircle thumb.** The track is the
   consumer-supplied `--slider-track-bg` linear-gradient (the value.js LCH/hue ramp), the range transparent
   (the gradient IS the fill), and the thumb is a SQUIRCLE the HEIGHT of the track — `corner-shape:
   superellipse(var(--corner-k-squircle))` via a `--corner-shape-thumb` alias, `@supports`-gated over a
   `--radius-lg` round fallback. It spans the full track height, not a floating circle.

---

## Scope (the gestalt — re-author both looks, no workaround, no alias, the cardinality kept)

Two folds, both token-routed, a clean break (no alias; the prior 50%-circle thumb is abrogated, not aliased):

1. **The integrated-cylinder glass standard.** Re-author `.slider-range` into a glass rounded-pill: the W52
   liquid-glass material (`backdrop-filter` blur + the unified `--glass-material-rim` edge rim + an
   under-shadow floor), tinted toward `--primary` via `color-mix(in oklab, …)` so the backdrop bleeds
   through (the glass identity), `border-radius: var(--radius-pill)`. Re-author `.slider-thumb` into the
   cylinder's leading CAP: a slim vertical capsule (`~0.46×` the size-token wide), the track HEIGHT tall
   (`height: 100%`), `border-radius: var(--radius-pill)` (the SAME pill as the fill — the seam is invisible),
   a faint top-down `--background` specular gradient over the `--primary` tint (the grip), no border ring.
   The press spring squishes the cap on `scaleX` (`--scale-press-btn`); the hover/held halos KEEP the
   `--surface-tint-*` rungs. Consumers retint via `--slider-range-bg` / `--slider-thumb-bg`, retune the glass
   via `--slider-range-blur` / `--slider-range-shadow`.

2. **The track-height squircle spectrum.** KEEP the tall gradient capsule track (`--slider-track-bg`) + the
   transparent range. Re-author the spectrum `.slider-thumb` into the track-height squircle: `height: 100%`,
   a near-square footprint (`~1.1×` the size-token wide so the superellipse silhouette READS at the box's
   radius), `border-radius: var(--radius-lg)` (the cross-engine round CONTRACT), and `corner-shape:
   var(--corner-shape-thumb)` INSIDE an `@supports (corner-shape: superellipse(2))` gate (the Chrome-139 PE
   tier — the SAME literal-feature query the W56 big-dock squircle rides; `var()` is not `@supports`-
   evaluable). Mint `--corner-shape-thumb: superellipse(var(--corner-k-squircle))` in `theme.css` alongside
   the W56 semantic shape aliases (ONE `k` vocabulary — no second definition). A consumer dials the thumb to
   round (a circular knob) or to soft by re-pointing `--corner-shape-thumb`.

### KEEP — the load-bearing contracts (do NOT touch)

UNCHANGED: the EXACTLY-TWO `{standard, spectrum}` keyset (the cardinality is the contract; this wave is a
LOOK overhaul, not a variant add/remove); the `keepDockOpen` dock-hold contract (`useDockHold` + the
`data-held` halo intensification — the slider stays the only consumer); the `.focus-ring` utility; the size
axis (`sm`/`md`/`lg` via `--slider-track-height`/`--slider-thumb-size`); the reka `SliderRoot`/`SliderTrack`/
`SliderRange`/`SliderThumb` substrate + the native touch-arbitration listeners + the spectrum `thumbAlignment:
'contain'` (the squircle is contained within the capsule so it never overshoots the tall track); the
`--corner-k-*` token band (W56's — this wave only ADDS the `--corner-shape-thumb` alias on it).

---

## SOTA grounding

- **iOS continuous slider (the integrated cylinder).** The iOS volume/brightness slider reads as a single
  continuous capsule whose fill swells left/right; the "thumb" is the fill's leading edge, not a detached
  disc. The glass-first-class pivot (G1) wants the slider to read as liquid glass — the W52 material (blur +
  edge rim, NOT the deleted central screen-disc) on the fill cylinder is the legible glass identity.
- **iOS color picker (the track-height squircle).** The iOS/macOS color-picker thumb is a rounded-square
  the height of the gradient track, not a floating circle — the squircle silhouette (W56's `corner-shape:
  superellipse(2)`) is the idiomatic web transposition, `@supports`-gated over the round fallback
  (Chrome-139+ only, ~65% global; Safari/Firefox round, no broken paint).
- **No clip-path squircle fallback (W56 DECISION, inherited).** The cross-engine clip-path figma-squircle is
  REJECTED (it hard-clips the box, severing shadow/halo); the `border-radius` round fallback is honest +
  zero-cost. The thumb rides the same policy.

---

## FileBounds (the EXACT files this wave touches — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/theme.css` | **MINT** `--corner-shape-thumb: superellipse(var(--corner-k-squircle))` alongside the W56 semantic `--corner-shape-{card,pill,panel,bigdock}` aliases (the leading plain `@theme`; rides the ONE `--corner-k-squircle` vocabulary). |
| `src/components/ui/slider/Slider.vue` | **RE-AUTHOR** the scoped CSS: `.slider-range` → the glass cylinder (W52 `backdrop-filter` blur + `--glass-material-rim` + under-shadow floor, `--primary`-tinted `color-mix`, `--radius-pill`); `.slider-thumb` → the leading cap (slim, `height: 100%`, `--radius-pill`, faint `--background` specular grip, no border, `scaleX` press squish); the spectrum thumb → the track-height squircle (`height: 100%`, near-square footprint, `--radius-lg` round contract + the `@supports (corner-shape: superellipse(2))` PE tier reading `var(--corner-shape-thumb)`). KEEP the script (the dock-hold + touch-arbitration), the template, the size axis, the held/hover halos, `.focus-ring`. |
| `src/components/ui/slider/index.ts` | Update the `sliderVariants` doc comment to the AX.W59 looks (integrated cylinder + track-height squircle). KEYSET + size axis unchanged. |
| `scripts/proof-slider-two-only.mjs` | **RECONCILE** clause (3) ROUNDED-KNOB → CYLINDER-CAP (pill radius NOT 50%, `height: 100%`, no border paint, `.slider-range` has `backdrop-filter`); **ADD** clause (4) SQUIRCLE-SPECTRUM (the `corner-shape: var(--corner-shape-thumb)` decl lives ONLY inside `@supports (corner-shape: superellipse(2))` over the round fallback, `height: 100%`). KEEP (1) KEYSET + (2) ORPHAN-SCAN verbatim. |
| `scripts/gates.mjs` | Update the `proof:slider-two-only` GATES note to the reconciled four clauses. |
| `demo/stories/primitives/slider.vue` | Update the standard + spectrum section comments to the AX.W59 looks (comment-only; the variant × size matrix + props unchanged). |
| `docs/tranches/AX/waves/AX.W59-slider-redesign.md` | **THIS doc.** |
| `docs/tranches/AX/audit/W59-slider-redesign.json` | **NEW** — the audit artefact (the prior-look → new-look disposition + the gate reconcile + the π live readback record). |

**OUT of bounds:** the `--corner-k-*` band (W56's — this wave ADDS `--corner-shape-thumb` on it, does not
re-define `k`); the W52 `.glass-material::before` specular recipe (the slider consumes the material tokens,
does not re-author them); the `useDockHold`/`useTouchGate` composables (consumed, not edited); the size-axis
geometry tokens; the `api/index.ts` `SliderVariants` export (the TYPE is unchanged — same two keys).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs AX.W52 (liquid-glass material) — CONSUMES, not edits.** The standard fill reads the W52
  `--glass-material-rim` + `backdrop-filter` material tokens; it does NOT touch the `.glass-material::before`
  recipe or the specular cohort.
- **vs AX.W56 (squircle token axis) — EXTENDS the axis with ONE alias.** This wave mints
  `--corner-shape-thumb` on the W56 `--corner-k-squircle` vocabulary (no second `k`); it does not touch the
  W56 card/pill/panel/bigdock aliases or the dock.css/glass.css corner-shape sites.
- **vs AX.W03/W05 (dock-hold + spring vocab) — KEEPS the contracts.** `keepDockOpen` + the `--slider-thumb-
  spring`/`--spring-dock` register are unchanged; the press-squish moves from `scale` to `scaleX` (the cap is
  a slim capsule, so the squish reads on the X axis), still on `--scale-press-btn`.

---

## HardGate (born-RED→GREEN + the MANDATORY π live readback)

**Headless / source gate — `proof:slider-two-only` (RECONCILED).** The four-clause source-parse gate:

- **(1) KEYSET (KEPT).** `sliderVariants` lists exactly `['standard','spectrum']`.
- **(2) ORPHAN-SCAN (KEPT).** No `[data-variant="X"]` for X ∉ keyset.
- **(3) CYLINDER-CAP (RECONCILED off ROUNDED-KNOB).** The base `.slider-thumb` resolves a pill radius
  (`--radius-pill`/9999px — NOT 50%, the floating-circle tell), `height: 100%` (track-height — the fill's
  leading edge, not a floating disc), no `border:` paint; AND `.slider-range` carries a `backdrop-filter`
  (the glass cylinder). **Bite:** revert the thumb to a 50% floating circle / strip the fill `backdrop-filter`
  → RED.
- **(4) SQUIRCLE-SPECTRUM (NEW).** The spectrum thumb's `corner-shape: var(--corner-shape-thumb)` decl sits
  ONLY inside `@supports (corner-shape: superellipse(2))` over a `border-radius` round contract, with
  `height: 100%`. **Bite:** drop the `corner-shape` decl, leak it outside the gate, or float the squircle off
  the track height → RED.

The gate FAILS on the prior 50%-circle/circle-disc look and PASSES on the patched tree (verified — clause-3
bite + clause-4 bite both red, the restored design green).

**π live readback (NON-NEGOTIABLE per AX.W00 — the cardinal AX lesson; the orchestrator drives it via
chrome-devtools-mcp @ `localhost:5173` over `/primitives/slider`, light AND dark):**

- **Standard reads as ONE integrated cylinder.** Drag a standard slider: the fill + cap read as a single
  continuous glass cylinder pulled left/right, NO visible seam between thumb and fill; the rounded leading
  edge IS the grab; the fill is glass (the backdrop bleeds through, the edge rim reads). Hover lifts a faint
  cap halo; press squishes the cap; no detached circle anywhere.
- **Spectrum reads as a track-height squircle.** The spectrum thumb is a rounded-SQUARE the FULL track
  height (`getComputedStyle(thumb).cornerShape === 'superellipse(2)'` on Chrome-139), spanning the gradient
  track, NOT a floating circle; on a non-supporting engine it falls back to the `--radius-lg` round arc (no
  broken paint — the cross-engine contract honest).
- **No regression.** `keepDockOpen` still pins an enclosing dock open mid-drag (the `data-held` halo
  intensifies); `.focus-ring` paints on keyboard focus; the size axis (sm/md/lg) scales both looks; the
  range mode (two thumbs) reads two cylinder caps bounding the window.

The wave does NOT close on the headless gate alone — the executed π drag/render readback (captured in
`W59-slider-redesign.json`) is the binding close criterion.

---

## Cadence (sub-step order)

1. Mint `--corner-shape-thumb` in `theme.css`.
2. Re-author `Slider.vue` scoped CSS (the cylinder fill + cap + the squircle spectrum thumb). Typecheck.
3. Reconcile `proof-slider-two-only.mjs` clause (3) + add clause (4); update the `gates.mjs` note. Confirm
   the gate PASSES on the patched tree + BITES on each regression.
4. Update the `index.ts` doc comment + the demo story comments.
5. Build; confirm `dist/styles/theme.css` carries `--corner-shape-thumb` + the SFC scoped CSS emits.
6. Self-gate (typecheck/build/test/proof:slider-two-only/proof:gate-script-parity/proof:resolution/
   verify-export-types); write `W59-slider-redesign.json`; hand the π live readback to the orchestrator.

---

## PreceptAlignment

- **token-first (J invariant).** Both looks are token-routed: the fill tint/blur/shadow via `--slider-range-
  *`, the cap via `--slider-thumb-*`, the squircle via `--corner-shape-thumb` on the W56 `--corner-k-*` band.
- **clean break / no-backwards-compat (MEMORY).** The prior 50%-circle thumb is ABROGATED, not aliased; the
  gate's ROUNDED-KNOB clause is reconciled (not kept beside a new one).
- **EXACTLY-TWO cardinality (proof:slider-two-only KEYSET).** The wave is a LOOK overhaul; the keyset +
  ORPHAN-SCAN clauses are untouched.
- **Safari-compatibility (HARD).** The squircle is `@supports (corner-shape: superellipse(2))`-gated over a
  `--radius-lg` round CONTRACT; the fill carries `-webkit-backdrop-filter` (the autoprefixer also emits it).
- **no-overfitting (Design-Axis-3).** `--corner-shape-thumb` ships with its consumer (the spectrum thumb
  reads it); no speculative per-surface squircle.
- **π visual-runtime lane (AX.W00).** Closes on the executed π drag/render readback, not the source gate
  alone.
