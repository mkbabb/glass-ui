# Pass-E deep audit — forms/toggle component(s)

**Page:** `demo/stories/forms/toggle.vue` · **import:** `@mkbabb/glass-ui/toggle-group`
**Real src under audit:**
- `src/components/ui/toggle-group/{ToggleGroup,ToggleGroupItem}.vue` + `toggleGroupContext.ts`
- `src/components/ui/toggle/{Toggle.vue,index.ts}` (the `toggleVariants` CVA — the shared paint source ToggleGroupItem composes)
- supporting CSS: `src/styles/utilities/btn.css` (`@utility transition-control`), `src/styles/utilities/base.css` (`.tap-squish`), `src/styles/glass/control-surfaces.css` (`.control-surface`), `src/styles/glass/material.css` (the `::before` catch-light + six-layer composite roster), `src/styles/glass/surfaces.css`.

The page ALSO demos `Toggle`, `ToggleChip` (`custom/toggle-chip`), `IconChip` — but the import-named protagonist is `toggle-group`, so the audit centers `toggleVariants` (the ONE CVA both `Toggle` and `ToggleGroupItem` paint through) and the group wrapper.

---

## 1 · ANIMATION — affordance audit

**What's present (GOOD):**
- The four-state contract IS threaded on `toggleVariants`: rest (`bg-transparent`) · hover (`hover:bg-muted` / `outline`→`.control-surface:hover`) · selected (`data-[state=on]:bg-accent`) · press (`.tap-squish:active { scale: var(--scale-press) }`) · disabled (`disabled:opacity-disabled disabled:pointer-events-none`) · focus (`.focus-ring`).
- Press physics ARE idiomatic: `.tap-squish` rides `scale var(--duration-fast) var(--spring-smooth)` (the canonical ONE scale register, motion-canon P1 transform→spring) with a PRM `:active { scale: 1 }` carve. Surface legs ride `transition-control` (the quick `--duration-control` 0.12s iOS beat, bezier `--ease-standard` — motion-canon P1 surface→bezier). The split is correct and recently re-timed (BC.W-CONTROL-SMOOTH killed the laggy 0.2s).

**What's MISSING / dead (FINDINGS):**
- **F1 (HIGH) — no ENTRANCE animation.** A `<ToggleGroup>` of three items pops in with zero stagger/reveal. motion-canon P2 (enter-bouncy) + the W-SUFFUSE3 `icon-chip-reveal` spring-clock entrance are the house idiom; the toggle strip has NONE. No `vReveal`, no `--char-index`-style stagger, no spring-mount. This is the "HIGH animation affordance for EVERY component" gap verbatim — the toggle is the LEAST animated control on the page (ToggleChip/IconChip both bloom; the toggle-group is inert at mount).
- **F2 (MED) — no SELECTED-indicator morph.** A `type="single"` group is a radio chooser, but selection is a binary `bg-accent` swap per-cell — there is NO travelling/morphing indicator (contrast SegmentedTabs' elastic squish indicator on `--spring-snappy`). An iOS-27 segmented selector glides its plate between cells; the toggle-group hard-cuts the fill. The shared-element selection-glide is the missing affordance.
- **F3 (LOW) — the `card` variant press is OFF-register.** The `card` compoundVariant hardcodes `active:scale-95` + its OWN `transition-[…] duration-fast ease-standard` instead of composing `.tap-squish` + `transition-control` like the base. A second scale literal (`scale-95`) beside the token register `--scale-press` — a dual-path the W-PRESS-UNIFY single-scale discipline forbids.

## 2 · PROCEDURAL VIZ
N/A — toggle-group is a pure control primitive, no aurora/blob/fourier substrate. (The user's "glass demos over COLORFUL aurora" ask is a PAGE-COMPOSITION concern, §5, not a component concern.)

## 3 · PERFORMANCE
- **Compositor-only: PASS.** Press animates `scale` (longhand, not `transform`) + surface `background-color`/`box-shadow` only. No layout property animates (`proof:no-layout-animation` clean). `card` variant uses `transform-gpu`.
- No rAF, no offscreen-pause concern (no canvas). No layout thrash. `cn()` dedup is the only per-render cost — negligible.
- **F4 (LOW) — `.control-surface` (outline variant) carries `backdrop-filter` on EVERY item.** A 3-item outline group stacks 3 backdrop-filter passes. Acceptable at this count, but a large `<ToggleGroup>` of N outline items is N backdrop-filter layers — note for dense consumers (glass-cannot-sample-glass + the per-pass raster cost). Not a defect here; a scaling caveat.

## 4 · SAFARI COMPATIBILITY
- **PASS.** `.control-surface` ships `-webkit-backdrop-filter` beside `backdrop-filter` (control-surfaces.css:82). `:focus-visible`, `scale` longhand, `color-mix(in oklab/srgb)`, `data-[state]` attr selectors — all Safari-Baseline. The `::before` catch-light (where it applies) uses registered `@property --specular-*` — Safari 16.4+ Baseline. No Safari-specific gap.

## 5 · IDIOMATIC / NO-LEGACY
- **F5 (HIGH) — the glass SIX-LAYER composite is ABSENT on the `default` + `outline` variants.** This is the headline. `material.css`'s `::before` moving-specular catch-light + the `::after` rim/grain stack are scoped to a fixed roster — the five `.glass-*` ladder rungs, `.glass-card`, `.glass-specular-track`, and the four `.dock-*` controls. **A bare toggle item (`.tap-squish` + `hover:bg-muted` + `bg-accent`) is on NONE of them.** So the default toggle has: backdrop-blur ✗ (none), surface tint ✗ (flat `bg-muted`/`bg-accent`), edge rim ✗, inner catch-light ✗ (no `::before`), drop shadow ✗, grain ✗ — ZERO of the six optical layers. It is a flat shadcn-accent fill wearing a spring press. The `card` variant gets the composite (via `.glass-card`); the `outline` variant gets 2 of 6 (blur + tint via `.control-surface`, no rim/catch-light/shadow/grain); the **`default` variant gets none**.
- **F6 (MED) — the `default` variant is the surviving shadcn-neutral residual.** `proof:no-shadcn-default` (BC.W-DESHADCN) flagged + re-pointed `toggle outline` onto `.control-surface`, but the `default` variant's `data-[state=on]:bg-accent data-[state=on]:text-accent-foreground` + `hover:bg-muted` is the textbook shadcn flat-accent toggle, UNTOUCHED. The DESHADCN census put `toggle` on the reskin-target list but the reskin landed on `outline` ONLY — `default` slipped (it's `bg-transparent` at rest so the forbidden-token sweep D1 doesn't catch the rest state; the `bg-accent` selected fill is the live residual). This is a genuine census hole.
- **F7 (LOW) — import-path label drift.** The page header reads `Forms · Toggle` but the protagonist import is `@mkbabb/glass-ui/toggle-group`. The user's "standardize the import-path label" ask: the label should name the subpath (`/toggle-group`), and the demo imports from deep relative paths (`../../../src/components/ui/toggle-group`) rather than the published subpath — non-idiomatic for a demo that documents the public surface.

## 6 · GLASS SIX-LAYER COMPOSITE — verdict
Present ONLY on `variant="card"` (full, via `.glass-card`). `outline` = 2/6 (blur+tint). `default` = 0/6. The control the page leads with (`type=single`/`multiple` strips, all `default`/`outline`) is the LEAST glassy surface in the library — it does not read as iOS-26 Liquid Glass.

---

## Findings → BD tranche disposition

| # | Finding | Action | Wave |
|---|---------|--------|------|
| F5 | default/outline toggle has 0–2 of 6 glass layers | **AUGMENT** — add the toggle CVA selectors to the `material.css` `::before`/`::after` roster so `data-[state]` toggle items get the catch-light + rim; re-point `default` selected fill off `bg-accent` onto a `--glass-bg-*` tier (the "selected reads as glass" W-REGISTER-IOS model). | **MODIFY BD.W-DESHADCN-CANON** (extend the census: `default` variant is a 2nd reskin-target, not census-closed) |
| F6 | `default` variant = surviving shadcn flat-accent residual | **MODIFY** — the no-shadcn census D4 closure must move `toggle` `default` arm onto reskin-target; the `bg-accent`/`bg-muted` flat fills retire onto the glass-quiet/floating tier. | **MODIFY BD.W-DESHADCN-CANON** (D1 sweep must catch the `data-[state=on]:bg-accent` selected residual, not just rest-state tokens) |
| F1 | no entrance animation | **AUGMENT** — thread the W-SUFFUSE3 spring-clock reveal (or a `vReveal` stagger) onto the toggle item; HIGH-affordance bar. | **NEW WAVE** (no current BD wave owns control-entrance; book `BD.W-CONTROL-ENTRANCE` beside the icon-chip-reveal idiom) |
| F2 | no selected-indicator glide (single arm) | **AUGMENT** — a travelling selected-plate on `--spring-snappy` (the SegmentedTabs indicator idiom, transposed onto the radio arm). | **NEW WAVE** / FOLD onto the SegmentedTabs `useTabIndicator` register (architectural transposition, not a 2nd engine) |
| F3 | `card` variant `active:scale-95` + own transition = dual-path | **PRUNE** — delete the `scale-95` literal + bespoke transition; compose `.tap-squish` + `transition-control` like the base (one scale register). | **MODIFY BD.W-BC-COMPONENT-CANON** (the W-PRESS-UNIFY single-scale discipline) |
| F4 | N backdrop-filters on dense outline group | **note only** — document the scaling caveat; no fix at this count. | — |
| F7 | import-path label + deep relative import | **MODIFY** — label `/toggle-group`; the page-composition ask (own glassy cards, bigger main area, aurora bg, dock contextual-switch) is a demo-page concern. | **FOLD onto BD.W-FORMS-CARD-FOLD** (extend its forms-page scope to the aurora-bg + per-section glassy-card + label standardization) |

**Page-composition asks (own cards / bigger main / aurora bg / dock APIs / tighten language):** all DEMO-side → extend **BD.W-FORMS-CARD-FOLD** (currently scoped to label/multi-select/dialog; widen to `forms/toggle` + flip the forms-band `CATEGORY_DEFAULT_BG` from `grid` to a contained aurora for the glass-demo pages, honoring one-GL-per-route). Zero src paint for those; F5/F6/F1/F2/F3 are the SRC-paint findings.
