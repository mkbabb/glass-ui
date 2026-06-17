# W-CONTROL-TOKENS-DELTA — the P2 control-token refinement cluster

**Freshness header**
- Capture date: 2026-06-17
- HEAD sha (pre-wave RE-GROUND base): `6840a643` (the wave spec authored against `f3c4170e`; the §0 RE-GROUND re-located every cite at `6840a643` — all five defects reproduced, no line-drift fix needed beyond the sha note)
- Demo routes: `/forms/toggle` (the single + multiple ToggleGroups), `/data/metric-stack` (the MetricRow column), `/feedback/toast` (the Toaster viewport)
- Viewports: mobile 390×844 · desktop 1280×800
- Modes: light + dark
- π spec: `tests-visual/control-tokens.spec.ts` (enrolled by-disk; the binding live capture rides W-REFLECT3, Batch 7)

## What shipped — five control-register refinements (token-first / component-over-class)

The seam across all five: **a control a consumer must reach is exposed as a token / prop / published primitive, never an internal a `:deep()` overrides** (Design Axis 2). No new register, no new color.

### W1 — the ToggleGroupItem `card` variant paints `--radius-card`, not `--radius-button` (N11)

`toggleVariants` (`src/components/ui/toggle/index.ts`) — the `card` variant arm now leads with `rounded-card`. CVA emits the `variants` classes AFTER the base string, so `rounded-card` wins the source-order race against the base `rounded-button` (the same mechanism the existing `h-auto` compoundVariant relies on). `default`/`outline` keep the base `rounded-button` — a button shape gets a button radius.

- Pre: the `p-8` glass-card tile inherited the base 10px `rounded-button` corner.
- Post: the tile paints the 1rem `--radius-card` (`= --radius-2xl`) corner matching its `glass-card` surface vocabulary.
- π readback: an injected `.rounded-card` probe resolves `border-top-left-radius ≈ 16px` (1rem), strictly greater than the `.rounded-button` 10px probe, both modes.

### W2 — the single-select chooser threads radio semantics (the role-per-type discipline)

`ToggleGroup.vue` + `ToggleGroupItem.vue` — the `type="single"` arm reads as a radio group to AT; the `type="multiple"` arm keeps reka's native toggle-strip semantic.

**The reka attr-merge reveal (recorded — the Triumvirate binding-shape branch).** reka hardcodes `role="group"` on its inner Primitive, and its `Slot` merges the CHILD's props OVER the incoming `$attrs` (`mergeProps(attrs, child.props)` — `node_modules/reka-ui/dist/Primitive/Slot.js:16`). A `:role="radiogroup"` fall-through attr on `<ToggleGroupRoot>` therefore **LOSES** to reka's `group` (verified by a `@vue/test-utils` mount: root role stayed `group`). The idiomatic override rides **`as-child` over our OWN root `<div>`**: reka merges its roving-focus/`dir`/`tabindex` props onto our div whose explicit `:role="groupRole"` wins. `groupRole` computes `single → "radiogroup"`, else `"group"` (the multiple arm keeps reka's correct grouping role). NOT a forked component — the role-per-type discipline lives on the ONE wrapper.

`ToggleGroupItem.vue` injects reka's re-exported `injectToggleGroupRootContext(null)` (the `null` fallback so a bare item never throws), reads `isSingle` (gates the role) + `modelValue` (the LIVE selection), and on the single arm v-binds `{ role: 'radio', 'aria-checked': itemChecked, 'aria-pressed': undefined }`. The `aria-pressed: undefined` removal is load-bearing: reka's inner Toggle stamps `aria-pressed`, which is **invalid on a `role="radio"`** (axe `aria-allowed-attr`); suppressing it leaves the radio reading with `aria-checked` ALONE.

- π readback (verified via `@vue/test-utils` mount, the device-free render proof; the live π rides W-REFLECT3):
  - single root → `role="radiogroup"`; items → `role="radio"` + `aria-checked` (item 0 `false`, item 1 `true` — the live selection), `aria-pressed` ABSENT, exactly one checked.
  - multiple root → `role="group"`; items → no radio role, `aria-pressed` survives (`true`/`false` per selection).

### W3 — the MetricRow consumer tokens (the cert-grid reach)

`MetricRow.vue` + `src/styles/tokens/scale-paper.css` §17 METRIC:
- `.metric-row__label` reads `text-align: var(--metric-row-label-align, left)` — the ONLY `text-align` declaration on the rule, so a consumer override always wins. Default `left` (byte-identical).
- `.metric-row__icon` reads `color: var(--metric-row-icon-color, inherit)`. The per-row `phaseColor` prop seeds `--metric-row-icon-color` inline (the prior inline `color: phaseColor` becomes a token write) so today's phase-tinted icons are unchanged; un-set → `inherit` (the prior un-tinted glyph).
- Both tokens declared in the `--metric-row-*` documented home (`--metric-row-label-align: left` + `--metric-row-icon-color: inherit`).

- π readback: a consumer setting `--metric-row-label-align: right` on an ANCESTOR (no `:deep`) resolves the internal `.metric-row__label` `text-align: right`; the default (unset) resolves `left`. `--metric-row-icon-color` retints the glyph.

### W4 — the a11y pair (Toaster live-region + published FocusScope)

- `Toaster.vue` — the `ToastViewport` (reka carries `role="region"` but NOT `aria-live`) is now `aria-live="polite" aria-atomic="false"` (the announce-on-toast contract; reka-internal confirm: `node_modules/reka-ui/dist/Toast/ToastViewport.js:127` carries `role: "region"` only).
- `<FocusScope>` published — `src/components/ui/focus-scope/{FocusScope.vue,index.ts}` (a thin pass-through composing reka's `FocusScope`: `trapped`/`loop`/`as`/`asChild` props + `mountAutoFocus`/`unmountAutoFocus` emits forwarded), `src/subpaths/focus-scope.ts` (the `/focus-scope` mirror), `src/components/ui/index.ts` (the ui barrel re-export → reaches the root barrel). The substrate-single discipline: glass-ui's focus-trap IS reka's, never a hand-rolled trap.

### W5 — the no-`:deep`-needed predicate (the precept bar, machine-locked)

The MetricRow tokens are read WITH a fallback so a consumer `:root`/parent/per-row override cascades into the internal WITHOUT a `:deep()`; the canonical consumer (`demo/stories/data/metric-stack.vue`) needs no `:deep(.metric-row__*)` for the label-align/icon-color cases (confirmed: zero `:deep`/token reach at HEAD — the trap). This is the wave's reason for being.

## The gate — born-RED → GREEN

`scripts/proof-control-tokens.mjs` (`proof:control-tokens`) — the device-free SOURCE arm, five witnesses, comment-strip-first house pattern (mirrors `proof-menu-glass.mjs`).

- **Born-RED CONFIRMED**: against the pre-wave HEAD (`6840a643`) sources the detector returns **15 violations** across all five witnesses (verified via `git show HEAD:<path>` fed to the pure detector).
- **GREEN at close**: 0 violations.
- **Self-test bite** (`--self-test`): the good corpus passes; each of 8 mutations REDs its clause — strip `rounded-card` (W1), re-add `rounded-button` to the card arm (W1), a static `aria-checked` literal (W2), drop the `aria-pressed` suppression (W2), drop the label-align fallback (W3), strip the Toaster `aria-live` (W4), a hand-rolled FocusScope without the reka import (W4), a consumer `:deep(.metric-row__label)` (W5).

## Fences held

- GL shader fence: none touched.
- ppmycota/demo colors: no library token gains a demo hue (the MetricRow tokens default to the existing cascade — `left`/`inherit`).
- ≥2-consumer bar: FocusScope is the a11y-pair completion the ask names; the 2nd-consumer is the dialog/survey focus-trap by-construction (the speedtest WV survey/thank-you) — booked, the a11y register is the documented exception class (recorded in PROGRESS).
- No backwards-compat shims: the byte-identical-at-defaults discipline (the MetricRow tokens, the card arm's other variants, the multiple-arm semantics) — a refinement adds reach, it never shifts an existing consumer's paint.
- Foreign-tree fence: speedtest is the CONSUMER; this wave builds the library primitive only.
