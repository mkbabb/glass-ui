# forms/number-field — COMPONENT deep audit (Pass-E)

**Page:** `forms/number-field` · **Import (standardize the label):** `@mkbabb/glass-ui/forms` (NOT the deep path `../../../src/components/ui/number-field` the demo currently uses; the public surface is the `/forms` subpath alongside Input/Textarea/Combobox)
**Components audited (real src):**
- `src/components/ui/number-field/NumberField.vue` (NumberFieldRoot wrapper — `grid gap-1.5`)
- `src/components/ui/number-field/NumberFieldContent.vue` (the `relative` positioning box)
- `src/components/ui/number-field/NumberFieldInput.vue` (the `.input-pill` field; AUDITED in depth by the sibling `forms-inputs-component.md`)
- `src/components/ui/number-field/NumberFieldIncrement.vue` / `NumberFieldDecrement.vue` (the ±  steppers — ghost `<Button size="icon">` over reka `NumberFieldIncrement`/`Decrement`)
- shared: `src/styles/glass/control-surfaces.css` (`.input-pill`), `_shared/useControlSize.ts`, `button/index.ts` (the ghost variant the steppers compose)

This audit is SCOPED to the NumberField-SPECIFIC composite — the **stepper buttons + the absolute-overlay layout** — because the shared `.input-pill` field is already covered in full by `forms-inputs-component.md` (3/6 composite, no spring/specular/entrance). I do not re-litigate the field; I cover what is NEW to this page.

---

## 1 · ANIMATION

**The field** inherits the inputs-audit verdict verbatim: COLOR-only four-state (single bezier on bg/border/box-shadow/color/opacity, `control-surfaces.css:58-63`), NO spring, NO specular, NO entrance. See `forms-inputs-component.md §1`.

**The steppers (NumberField-specific) — partial press, dead hold-repeat, dead specular:**
- **Press spring PRESENT (good).** `NumberFieldIncrement/Decrement` render `<Button variant="ghost" size="icon">`, so they inherit the base CVA `'btn-pill tap-squish … active:scale-(--scale-press-btn)'` (`button/index.ts:17`) — the press rides the `--spring-snappy` channel via `.tap-squish` (AW.W25 ONE-press-source). So a single +/− tap DOES spring-squish. This is the one register the steppers get right.
- **DEAD: the hold-to-repeat affordance.** reka `NumberFieldIncrement`/`Decrement` fire a continuous auto-repeat on press-and-hold (the spinbutton ramp). There is ZERO visual feedback for the held-repeat state — no sustained-press scale-hold, no value-tick pulse, no `data-pressed` glow. A held stepper looks identical to rest while the value ramps. This is the single largest NumberField-specific animation gap (a core spinbutton affordance with no motion).
- **DEAD: no specular / liquid-hover on the ghost steppers.** `ghost` is `bg-transparent` (`button/index.ts:103`) — it does NOT compose `btn-glass`/`v-specular`, so the W-LIQUIDHOVER tier-root gleam never reaches them. The steppers are flat tint-swap chrome ON a glass field — the lit-glass register stops at the field edge.
- **DEAD: no value-change animation.** When the value increments, the displayed number SWAPS instantly. The library SHIPS `useAnimatedNumber` + `<AnimatedDigit>` (the single-glyph reel) — the NumberField value is the canonical consumer of an animated digit roll on step, and it is unwired.
- **Verdict:** the steppers are half-met (tap-press springs; hold-repeat + specular + digit-roll are inert). The four-state contract is met in COLOR for the field and in SCALE for a single stepper tap, but the spinbutton's defining HOLD interaction has no motion.

## 2 · PROCEDURAL VIZ
N/A — no aurora/blob/fourier. The COLORFUL-aurora-backdrop ask is a demo/page concern (the field+steppers must read as liquid glass over a live `<Aurora>`), which routes back to §1/§6: the ghost steppers and the field are both flat composites, so over a busy field the stepper glyphs and the well silhouette lose the lit-glass read.

## 3 · PERFORMANCE
- **Compositor-safe.** Field animates only paint/composite props (bg/border/box-shadow/color/opacity); steppers animate `scale` (compositor) via `.tap-squish`. No layout-thrash.
- **`NumberFieldContent` absolute-overlay layout (good).** The steppers are `position: absolute` (`-translate-y-1/2 left-0`/`right-0`) over a `relative` box with `has-[…]:pl-5`/`pr-5` flank-padding on the input (`NumberFieldContent.vue:11`) — the steppers OVERLAY the pill, they do not participate in flow, so a stepper press triggers no reflow of the field. Clean idiomatic shadcn overlay.
- **N-blurred-wells cost.** Each NumberField paints a real `backdrop-filter` blur (quiet-tier, `--control-surface-blur`); the page renders 8 fields → 8 blurred wells over the (demo) aurora. Acceptable (quiet 8px) but scales with field count — same nit as the inputs audit.
- No rAF / canvas / offscreen-pause concern. N/A.

## 4 · SAFARI COMPATIBILITY
- **Clean.** The field `backdrop-filter` (`control-surfaces.css:49`) ships unprefixed in source; the build (`vite.style-assets.ts`) injects the `-webkit-backdrop-filter` pair into dist, `proof:webkit-backdrop`-enforced. Safari ≤17 paints the well blur.
- **`inputmode="decimal"` default** (`NumberFieldInput.vue:28`) — correct, Safari-honored mobile-keyboard hint.
- No `field-sizing` on NumberField (that is Textarea-only), so no Chromium-only path here.
- Steppers are plain `transform: scale` + `translate` — universally supported.

## 5 · IDIOMATIC / NO-LEGACY
- **Strong:** `inheritAttrs:false` + `v-bind="$attrs"` on the input lands the accessible-name attrs on the focusable spinbutton (the documented 3-channel label contract, exercised by the demo). The increment/decrement compose the shipped `<Button variant="ghost" size="icon">` rather than a hand-rolled stepper — correct component-over-class reuse. `useControlSize` token-substitution axis is clean.
- **Smell — the steppers ignore the field's `size`.** `NumberFieldInput` threads a `ControlSize` prop, but `NumberFieldIncrement`/`Decrement` hard-`size="icon"` (the `--control-h-md` rung) with no size thread — so a `size="sm"`/`"lg"` field gets mis-proportioned steppers (the glyph box does not track the field height). A size-aware stepper rung is owed.
- **Smell — `size-icon-sm` glyph (`Increment.vue:28`) is a bare util,** not the `--ui-glyph` cohort the base CVA's `[&_svg:not([class*=size-])]:size-(--ui-glyph)` would otherwise supply — the explicit `size-icon-sm` (0.875rem) wins, which is fine, but it is a second glyph-size source beside the cohort. Minor.
- **No dead code, no dual-path, no workaround** in the NumberField SFCs themselves.
- **Demo:** import-path uses the deep `../../../src/...` path, not `@mkbabb/glass-ui/forms` — non-idiomatic (the page's import label must standardize). The demo is a flat 2-col/3-col grid of bare fields, NOT each sub-section in its own glassy `<Card>`, NOT over an aurora, NOT leveraging the dock APIs — all four user asks unmet.

## 6 · THE GLASS SIX-LAYER COMPOSITE
- **Field:** 3/6 (backdrop-blur ✓ · surface-tint ✓ · drop-shadow only as the focus/invalid ring ✗-resting · NO edge rim, NO inner catch-light, NO grain) — verbatim the inputs-audit finding; the pill is a flat-bordered slab, not a `.glass-material` surface.
- **Steppers:** 0/6 — `ghost` is `bg-transparent` with no glass layer at all. They are non-glass chrome sitting ON a half-glass field. Over the page's intended aurora the whole composite reads as a flat slab with two flat glyphs, not lit liquid glass.

---

## BD-tranche mapping (cite the wave)

| Finding | Action | BD wave |
|---|---|---|
| Field: COLOR-only four-state, no spring/specular/entrance; 3/6 composite | **AUGMENT (new src wave)** | `BD.W-CONTROL-LIQUID` (proposed in `forms-inputs-component.md §mapping`) — arms the `.input-pill` register with `vSpecular` gleam + focus/press spring (`--control-press-t`) + `.glass-reveal` entrance + the rim/core/grain layering. NumberField inherits it for free (shared recipe). Coordinate rim with `BD.W-GLASS-LENS-CHROMA`. |
| Steppers: dead hold-to-repeat affordance (no held-state motion) | **AUGMENT** | EXTEND `BD.W-CONTROL-LIQUID` (or a `BD.W-STEPPER-AFFORDANCE` clause) — a sustained-press `data-pressed` glow + value-tick pulse on the reka held-repeat ramp, compositor-only/PRM-gated. The defining spinbutton interaction currently has zero motion. |
| Steppers: no specular (ghost `bg-transparent` skips `v-specular`) | **AUGMENT** | same `BD.W-CONTROL-LIQUID` — give the stepper-on-glass a tier-appropriate hover gleam, or compose `btn-glass`-lite so the steppers read as part of the lit well, not flat chrome. |
| Value swaps instantly; `useAnimatedNumber`/`<AnimatedDigit>` unwired | **AUGMENT** | new clause — wire the NumberField display to the shipped `<AnimatedDigit>` reel on step (the canonical consumer of the digit-roll primitive; reuse, no fork). Optional opt-in prop `:animate-digit`. |
| Steppers hard-`size="icon"`, ignore the field `size` rung | **MODIFY** | thread `ControlSize` from NumberFieldInput → Increment/Decrement so a `sm`/`lg` field gets proportioned steppers; fold into `BD.W-CONTROL-LIQUID` or `BD.W-BC-COMPONENT-CANON`. |
| `.control-surface` lone hand-authored webkit pair (shared-recipe hygiene) | **MODIFY** | `BD.W-DESHADCN-CANON` hygiene clause — drop the source webkit pair, let the build inject; re-assert `proof:webkit-backdrop`. (Carried from inputs audit.) |
| Demo: each sub-section own glassy Card / BIGGER main area / dock contextual-switch / over aurora / `@mkbabb/glass-ui/forms` import-label / tighten copy | **MODIFY (demo)** | EXTEND `BD.W-FORMS-CARD-FOLD` (currently DEMO-ONLY, zero src paint, folds residual `rounded-card` triplets) to ALSO redesign the number-field page: each NumberField group into its own `<Card>` over a shared offscreen-paused `<Aurora>` (the `<DockStage>` precedent), bigger main area, the `@mkbabb/glass-ui/forms` import label, dock-API contextual switching of the 8 fields, and tightened captions. |

---

## 5-LINE VERDICT
1. NumberField's steppers get ONE animation register right (the single-tap press-spring, inherited from the ghost Button's `.tap-squish active:scale-(--scale-press-btn)`) but leave the spinbutton's DEFINING interaction — press-and-HOLD auto-repeat — with ZERO motion, no specular (ghost is `bg-transparent`, skips `v-specular`), and the value swaps instantly while the shipped `<AnimatedDigit>` reel sits unwired.
2. The field is the shared `.input-pill` half-composite (3/6: backdrop-blur + surface-tint only; no rim/catch-light/grain, no resting shadow) and the ghost steppers are 0/6 — so the whole control reads as a flat slab with two flat glyphs, never lit liquid glass over the page's intended aurora.
3. Performance and Safari are clean: the absolute-overlay stepper layout (NumberFieldContent `relative` + `has-[]:pl-5`/`pr-5`) triggers no reflow on press, transitions are compositor-only, and the unprefixed `backdrop-filter` is build-injected with the webkit pair (`proof:webkit-backdrop`).
4. Idiomatic except two smells: the steppers hard-`size="icon"` and ignore the field's `ControlSize` rung (mis-proportioned at `sm`/`lg`), and the demo imports via the deep `src/...` path instead of the `@mkbabb/glass-ui/forms` public subpath; no dead code/dual-path/workaround in the SFCs.
5. ACTION: AUGMENT the proposed src wave `BD.W-CONTROL-LIQUID` (specular + focus/press spring + entrance + rim/core/grain — shared with Input, inherited free) and add a NumberField-specific clause for the held-repeat affordance + `<AnimatedDigit>` digit-roll + size-aware steppers; MODIFY `BD.W-DESHADCN-CANON` for the `.control-surface` webkit hygiene; and EXTEND `BD.W-FORMS-CARD-FOLD` for the demo redesign (per-group glassy Cards, bigger main area, aurora backdrop, dock contextual-switch, `/forms` import label, tightened copy).
