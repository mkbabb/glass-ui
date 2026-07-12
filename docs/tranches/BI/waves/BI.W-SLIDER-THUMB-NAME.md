# BI.W-SLIDER-THUMB-NAME — every Slider thumb carries an accessible name

Band B8 (prunes + consumer-truth / a11y). Born-RED at HEAD.

## §Mandate

Discharges:
- **A11Y-2** [P1] (FAM-15) — EVERY Slider thumb is nameless (axe `aria-input-field-name` ×22 on
  `/substrates/aurora`); the stale-reka-binding class (the binding pathway exists but no name flows).

## §Design

Decided mechanism (ROUND-1 FAM-15, source-verified — a decidable a11y fix, no design loop). `Slider.vue:189-192`
already forwards `:aria-label="$attrs['aria-label'] as string ?? undefined"` onto `SliderThumb`, so the thumb
HAS the binding pathway — the defect is that the DEMO Sliders (the 22 aurora-studio / configurator LCH sliders)
never PASS a name, and a bare `<Slider>` produces a nameless spinbutton. Two coupled fixes:

- **The library ergonomic (the never-nameless floor).** `LabeledSlider` (the `LabeledField` slider wrapper)
  FORWARDS its own `<Label>` text to the thumb's accessible name (`aria-labelledby` → the label id, or
  `aria-label` from the label text), so a labeled field NEVER yields a nameless thumb — the naming rides the
  label the field already carries (no new prop). A bare `<Slider>` with neither a wrapper label nor an
  `aria-label` gets a dev-warn (the DX signal; not a runtime name invention).
- **The demo fix.** Every demo `<Slider>` (aurora studio + configurator LCH + the enrolled 22) supplies a name
  — via the `LabeledSlider`/`<Label for>` association (the idiomatic path) or an explicit `aria-label`. No raw
  nameless `<Slider>` survives on a user-facing route.

## §Work

- `src/components/custom/labeled-field/LabeledSlider.vue` (+ the shared `LabeledField` id plumbing) — forward the
  field's `<Label>` to the slotted `<Slider>` thumb via `aria-labelledby` (the label's id) so the thumb name is
  the field label; a slider with no label and no `aria-label` dev-warns.
- `demo/stories/substrates/aurora.vue` + the configurator LCH sliders + the enrolled sliders — supply an
  accessible name (LabeledSlider association or explicit `aria-label`) on every `<Slider>`.
- `Slider.vue` — no engine change (the `:aria-label` forward at L192 already exists; the wrapper feeds it).

## §Acceptance

Gate: **`proof:a11y`** (the slider arm — device-free source arm asserting the LabeledSlider forward + a live
π axe assert).
- **BORN-RED at HEAD**: axe `aria-input-field-name` fires on `/substrates/aurora` (≥22 nameless thumbs).
- S1 — `LabeledSlider` forwards the field label to the thumb accessible name (source arm).
- S2 (π) — axe `aria-input-field-name` = 0 violations on `/substrates/aurora` and the configurator routes.
- Self-test bite: a `LabeledSlider` that drops the label→thumb forward reds S1.

## §π/DELTA

`tests-visual/a11y-slider.spec.ts` (NEW, LOCAL-only, rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)):
- run axe on `/substrates/aurora` + the configurator LCH-slider routes: ZERO `aria-input-field-name`
  violations (was ≥22); every thumb resolves an accessible name equal to its field label. BOTH modes,
  Chromium + real WebKit.

## §Obligations

- No cross-repo ask (library ergonomic + demo fix; `Slider` public prop surface unchanged). Consumers that
  render a bare `<Slider>` without a label now receive a dev-warn — a DX improvement, not a break.

## §Dispositions

- Terminalizes **A11Y-2** (FAM-15): BUILT (LabeledSlider forward + demo names). Liveness probe: a nameless
  Slider thumb on an enrolled route REDs the π axe arm.
- Notes the CHRONIC §1a **ax:labeled-slider-readout** RETIRE (the numeric-readout register is superseded by the
  UF-J1 value.js-color-picker-slider work, per the ledger) — this wave touches the NAME, not the readout;
  recorded, no re-book.
