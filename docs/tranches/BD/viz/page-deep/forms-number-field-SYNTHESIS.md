# forms/number-field — Pass-E SYNTHESIS (the binding per-page verdict)

**Route:** `/forms/number-field` · **SFC:** `demo/stories/forms/number-field.vue` (161 lines) · **Import label:** `@mkbabb/glass-ui/forms` (the public subpath alongside Input/Textarea/Combobox — NOT the deep `../../../src/components/ui/number-field` the SFC currently uses; the rendered chip already resolves `@mkbabb/glass-ui/number-field`, which is the canonical consumer-facing truth).
**Synthesized from:** `forms-number-field-{demo,design,component}.md` (3 separate-context Pass-E auditors).
**Manifest row:** `s("forms", "number-field", "Number Field")` (manifest.ts:727) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"`, `variant="page"`, `heroScale="4"`.

---

## 0 · The reconciled picture (where the three lenses AGREE)

This page is a **structural TWIN of `forms/inputs` and `forms/textarea`** — the three auditors converge on the SAME systemic diagnosis those siblings carry, and it must converge on the SAME band waves, NOT a bespoke redesign:

- **The component is correct + lovely in isolation; the PAGE spends almost none of the library's identity.** Seven stepper states (integer · percent · stepped · disabled · the three a11y label-binding channels) demonstrated honestly as **two flat transparent grids on a near-invisible cream wash** — no per-section card, no aurora, no dock contextual-switch, no protagonist, ~354–700px dead horizontal void, near-zero authored page motion.
- **TWO failure strata that must NOT conflate into one wave:**
  - **COMPONENT stratum (src, real paint).** The `.input-pill` well is the shared **3-of-6-layer glass composite** (backdrop-blur ✓ + surface-tint ✓; edge rim, inner catch-light, grain MISSING — a flat-bordered slab) with a **COLOR-only four-state** (one bezier; no `useSpringPress`/`--press-t`, no `vSpecular` gleam, no `.glass-reveal` entrance). VERBATIM the inputs/textarea finding — the well IS the same register.
  - **DEMO stratum (page, zero src paint).** Flat-grid wash, single-chassis-card stack, no cards/aurora/dock/protagonist, dead horizontal void, the floating-value dead-channel micro-defect, design-meta copy in the blurb.

- **THREE number-field-SPECIFIC findings the siblings do NOT carry** (the real reason this page is not a pure dupe):
  1. **The held-repeat affordance is motion-dead.** reka `NumberFieldIncrement`/`Decrement` auto-repeat on press-and-hold (the spinbutton ramp) with ZERO visual feedback — a held stepper looks identical to rest while the value ramps. The defining spinbutton interaction has no motion. (component §1.)
  2. **The VALUE does not reel.** The displayed number swaps instantly on step; the library ships `useAnimatedNumber` + `<AnimatedDigit>` (the single-glyph odometer reel) + `useCountup` for EXACTLY this — the NumberField value is their canonical consumer and it is unwired. This is the page's signature affordance (the value is the protagonist) and it is absent. (all three: demo §1/3, design §2/5, component §1.)
  3. **The steppers ignore the field `size` rung.** `NumberFieldIncrement`/`Decrement` hard-`size="icon"` (the `--control-h-md` rung) with no `ControlSize` thread — a `sm`/`lg` field gets mis-proportioned steppers. (component §5.)

**No genuine conflicts across the three reports** — they are complementary (demo = composition gap, design = staging/hierarchy gap, component = material + stepper-motion gap). The page's ONE genuine strength is unanimous: the **three a11y label-binding channels** (`<Label for>`→id / `aria-labelledby` / `aria-label`, lines 114-157) are the real teaching value, exceed `inputs.vue`, and the block-comment contract (lines 108-113) should be surfaced into a visible caption, not deleted.

---

## 1 · RANKED changes (by impact)

| # | Change | Stratum | Impact | Why |
|---|---|---|---|---|
| **1** | **Arm the input control as a full liquid-glass surface** — re-base `.input-pill` onto the `.glass-material` rim+core+grain composite (3/6→6/6) + `vSpecular` tier-root gleam + a focus/press spring (`useSpringPress`/`--control-press-t`) + a `.glass-reveal` entrance, ALL reusing shipped Button/dock primitives (no fork). | COMPONENT (src) | **Highest** | The well is the protagonist of EVERY forms page; a flat-slab half-composite cannot read as liquid glass over any aurora. The single finding all three reports + both sibling pages independently surface. **SHARED — armed once, inputs/textarea/number-field all inherit.** |
| **2** | **Make the VALUE reel + the steppers live** — wire `<AnimatedDigit>`/`useAnimatedNumber` so the value odometer-reels on step (poster-scale on the hero); add held-repeat motion (sustained `data-pressed` glow + value-tick pulse on the reka auto-repeat ramp); give the ghost steppers a tier-appropriate gleam; thread `ControlSize` → Increment/Decrement. | COMPONENT (src) | **High** | The number-field-SPECIFIC arm — the most kinetic, most type-forward moment a stepper page owns, currently entirely inert. The defining spinbutton HOLD interaction has zero motion. |
| **3** | **Aurora-behind-protagonist + veil-card-per-section** — switch the forms-band off the flat `grid`; run a vivid multi-nuclei aurora behind the HERO stepper (offscreen-paused, one GL context, budget-safe); frame each demo in a `surface="veil"` (`.glass-wash`) card so the backdrop reads THROUGH onto the well. | DEMO (page) | **High** | The highest-leverage fidelity fix shared with every forms page + the dock flagship: gives the lens color to refract AND satisfies "own glassy card" + "main area bigger" + "glass over live field" at once, no occlusion (the §L1 permeable-veil transposition over "opaque-plate-occludes" vs "bare-grid-no-card"). |
| **4** | **Protagonist hierarchy + dock contextual-switch + bigger area** — promote ONE stepper to a HERO card at ~1.5-2× scale with a poster-rung value (`text-display-mega`+ reeling on step); demote the other six to a tight supporting matrix; seat a `DockStack mode="facets"`/`DockLayerGroup` swapping the protagonist across states (count → percent → currency → unit → disabled) with a live crossfade; lift the 1086px cap + kill the `max-w` straitjacket + pin the floating value flush. | DEMO (page) | **High** | Answers "leverage the dock APIs (contextual switching/animating)" + "main card area BIGGER" + the protagonist hierarchy the page wholly lacks; the floating-value dead-channel is the worst micro-detail (screams in dark mode). |
| **5** | **Broaden `formatOptions` past `percent`** — add a `currency` ($) and a `unit` (kg/px) stepper (the richest unshown reka API); surface the a11y label-binding block-comment (lines 108-113) into a visible caption. | DEMO (page) | **Medium** | The number-field-specific API-coverage gap; the label-binding contract is the page's real teaching value — make it visible. |
| **6** | **Page arrives + standardize + tighten** — wire `.scroll-cascade` gravity-entrance per-cell; standardize the import label to `@mkbabb/glass-ui/forms`; tighten the blurb's design-meta clause ("…the ONE color event") to a product line; delete the internal-changelog SFC header comment; keep the already-terse value-captions. | DEMO (page) | **Medium** | The user's explicit "standardize the import-path label" + "tighten superfluous language" asks. Mechanical, low-risk. Note: the rendered chip ALREADY passes — no in-prose third dialect to fix (unlike inputs.vue). |
| **7** | **`.control-surface` webkit-source hygiene** — drop the lone hand-authored `-webkit-backdrop-filter` source pair; let the build inject it; re-assert `proof:webkit-backdrop`. | COMPONENT (src) | **Low** | Not a Safari bug (the build is idempotent); a latent re-bite a future Lightning-CSS dedup could trip. Hygiene only. Shared carry from the inputs/textarea audits. |

---

## 2 · TRANCHE ACTIONS (per change)

The decisive structural call: **number-field is a twin — it FOLDS into the two net-new waves the sibling syntheses already propose** (`BD.W-CONTROL-LIQUID` src + a Band-16 forms-stage demo wave). Neither exists as a wave-spec file yet (both proposed by `forms-inputs-SYNTHESIS.md` / `forms-textarea-SYNTHESIS.md`); the correct move is to make number-field a NAMED consumer of those waves and add only its **stepper-specific clauses** — NOT to mint a third src/demo pair. Minting bespoke number-field waves would re-fork the exact register inputs/textarea share.

### Change #1 → **FOLD into `BD.W-CONTROL-LIQUID`** (the shared Band-16 src wave; NamedConsumer: NumberField)

`BD.W-CONTROL-LIQUID` is the proposed-but-unwritten Band-16 src wave that arms the shared `.input-pill` register (rim+core+grain composite + `vSpecular` gleam + `useSpringPress`/`--control-press-t` + `.glass-reveal` entrance). NumberFieldInput.vue:48 already composes `input-pill`, so **it inherits the entire arm for free via the shared seam** — number-field adds ZERO new scope to change #1; it is enrolled as the 3rd of the four named consumers (Input/Textarea/NumberField/Combobox) in the wave's CL5 shared-seam clause. No separate wave, no separate gate. (The gate `proof:control-liquid` CL1-CL5 + the `proof:ba-gestalt` glass-feedback verdict + `control-liquid.spec.ts` π are owned by the wave; number-field rides them.)

### Change #2 (the value-reel + held-repeat + size-aware steppers) → **AUGMENT `BD.W-CONTROL-LIQUID` with a NumberField-specific clause `CL6`**

This is the genuinely number-field-NEW src work and it has NO home in the current 42-wave BD set. It is a clause-AUGMENT (not a new wave) because it composes the SAME shipped primitives the parent wave activates and shares its gate file + its `proof:ba-gestalt` verdict:

**Scope (src/, reuse — NO fork):**
- Wire the NumberField value display to the shipped `<AnimatedDigit>` / `useAnimatedNumber` odometer reel on step (the canonical consumer of the digit-roll primitive — reuse, no fork). An opt-in `:animate-digit` prop (default the existing instant snap for back-compat, or default-on if the π confirms no jank — the wave decides), the reel landing with the `--spring-snappy` overshoot, PRM → instant snap.
- Held-repeat motion: a sustained `data-pressed` glow + a value-tick pulse keyed to the reka auto-repeat ramp (compositor-only `filter`/`opacity`, PRM-gated) — the defining spinbutton interaction gains feedback.
- Give the ghost steppers a tier-appropriate hover gleam (compose `btn-glass`-lite or the `vSpecular` arm so the steppers read as part of the lit well, not flat `bg-transparent` chrome ON a glass field).
- Thread `ControlSize` from NumberFieldInput → Increment/Decrement so a `sm`/`lg` field gets proportioned steppers (the hard-`size="icon"` smell — component §5).

**Gate — extend `proof:control-liquid` with born-RED `CL6` clauses:**
- CL6a the NumberField value composes `<AnimatedDigit>`/`useAnimatedNumber` (born-RED at HEAD — instant swap); compositor-only + PRM-instant cross-assert.
- CL6b the held-repeat carries a `data-pressed` motion register (born-RED — no sustained-press feedback); PRM-gated.
- CL6c the steppers thread `ControlSize` (born-RED — hard `size="icon"`) + a self-test bite (a synthetic size-blind stepper MUST red).
- Paint: the `proof:ba-gestalt` glass-feedback verdict + a `control-liquid.spec.ts` stepper arm (the digit reels on step, the held-repeat glows, the gleam on hover, both modes — LOCAL-only).

### Changes #3 + #4 + #5 + #6 (demo legs) → **NEW: `BD.W-FORMS-NUMBER-FIELD-STAGE`** (Band-16 demo wave, sibling to `BD.W-FORMS-INPUTS-STAGE`)

`forms/number-field` is owned by no existing BD wave (only `BD.W-PAGE-HEADER-FOLD` touches its header; `BD.W-FORMS-CARD-FOLD` explicitly scopes to label/multi-select/dialog — NOT number-field). The demo-side moves are a coherent single-page redesign too large for a fold-clause of `BD.W-FORMS-CARD-FOLD` (a 3-file mechanical fold). **Decision: a NET-NEW per-page demo wave**, parallel to the proposed `BD.W-FORMS-INPUTS-STAGE` and the textarea stage wave — the three forms text-entry pages each get their own demo-stage wave (they share the src arm, not the page composition; a single stage wave cannot carry three distinct per-page compositions, and the brief's "each page deftly uses a SERIES of glass-ui components" is a per-page bar). The three stage waves share a gate TEMPLATE (`proof:forms-*-stage`, the FS1-FS5 shape) so the discipline is single-sourced.

**Scope (demo/stories/number-field.vue, zero src paint):**
- Per-section `surface="veil"` (`.glass-wash`) cards (BA.W-SURFACE-AXIS — the permeable veil that admits the backdrop, no occlusion; glass-cannot-sample-glass honored — veil cards + wells share ONE composition container).
- A vivid multi-nuclei `<Aurora>` behind the protagonist (manifest row off `grid`, OR a hero-local aurora over `<DockStage>`/`<StoryHero>`; offscreen-paused, ONE GL context per route — verify dark-mode chroma survives, don't collapse to black).
- A protagonist stepper at ~1.5-2× scale with a poster-rung value (`text-display-mega`+, reeling via change #2's `<AnimatedDigit>` on step — the demo CONSUMES the src arm); the other six states demoted to a tight supporting matrix on the calm wash (the §L1 tier-selection discipline — save the spend for the hero).
- A `DockStack mode="facets"`/`DockLayerGroup` swapping the protagonist across states (count → percent → currency → unit → disabled) with a live crossfade — the named contextual-switch capability the page wholly lacks.
- Broaden `formatOptions`: add `currency` ($) + `unit` (kg/px) steppers (change #5); surface the label-binding block-comment into a visible caption.
- `.scroll-cascade` gravity-entrance landing per-cell; lift the 1086px cap; kill the `max-w` straitjacket; PIN the floating value flush to the input (kill the dead-channel — the worst micro-detail).
- Standardize the import label to `@mkbabb/glass-ui/forms`; tighten the blurb's design-meta clause to a product line; delete the internal-changelog SFC header comment.

**Gate — born-RED → GREEN `proof:forms-number-field-stage`** (the FS1-FS5 per-page composition template):
- FS1 ≥N glass-ui families composed in-article (Card/veil + Dock + NumberField + an aurora canvas; born-RED at HEAD = {NumberField, Label, IconChip} only).
- FS2 per-section veil cards + the protagonist card at a distinct scale (born-RED = one chassis card, seven identical-weight cells).
- FS3 a live aurora canvas behind the protagonist (`canvas` ≥ 1; born-RED = 0) + the one-GL-per-route budget held.
- FS4 the dock contextual-switch wired (a `DockStack`/`DockLayerGroup` swapping the protagonist; born-RED = 0 docks) + the `formatOptions` breadth (currency + unit shown).
- FS5 the standardize+tighten arm (label `@mkbabb/glass-ui/forms`, no design-meta blurb, no changelog comment) + the floating-value-pinned assert + a self-test bite.
- Paint: a `proof:ba-gestalt` **page-band** verdict (`BD.W-GESTALT-ROSTER-GROW` enrolls `number-field.vue` in `page-band.md`'s `surface-paths` so a re-thread drifts the hash → auto-revoke) + a binding `tests-visual/forms-number-field-stage.spec.ts` π (veil cards read as glass over the aurora, the protagonist lenses the live field + reels on step, the dock crossfade switches state, the gravity entrance lands, both modes × desktop+mobile).

### Change #7 (`.control-surface` webkit hygiene) → **FOLD into `BD.W-CONTROL-LIQUID`** (shared hygiene clause)

Identical disposition to the inputs/textarea syntheses: the webkit-source-pair drop is a 1-line src hygiene edit + a `proof:webkit-backdrop` re-assert. It belongs in `BD.W-CONTROL-LIQUID` (which already opens `control-surfaces.css`), NOT the doc-only `BD.W-DESHADCN-CANON`. Single shared edit across the three forms pages — no per-page duplication.

### PRUNE
- **No bespoke number-field src/demo wave pair.** Minting one would re-fork the shared `.input-pill` register inputs/textarea already own — the explicit anti-pattern. number-field rides the shared src wave + adds its CL6 stepper clause, and gets its own demo-stage wave only (the composition is per-page; the material is shared).
- **The path-label fix is a near-no-op.** The rendered chip already resolves `@mkbabb/glass-ui/number-field`; the only change is the SFC's own deep import + the canonical label assertion — fold into FS5, do NOT spend a sweep clause (de-dupe against `BD.W-PAGE-OFFTOKEN-SWEEP` if it claims forms-band import labels).

---

## 3 · CONVERGENCE assessment

**The page needs SEVERAL more loops — NOT close, but cheaper than its siblings on the src axis.** It misses the North-Star bar on nearly every axis (no per-section card, no aurora, no dock, no protagonist, near-zero page motion, half-composite control, design-meta copy) — the same un-converged profile as inputs/textarea. BUT: the **src arm is mostly SHARED** (change #1 inherits the parent `BD.W-CONTROL-LIQUID` for free; only the CL6 stepper clause is number-field-new), so the per-page src cost is just the digit-reel + held-repeat + size-thread clause, not a full register arm.

**Loop estimate: 2-3.**
- **Loop 1** — the shared `BD.W-CONTROL-LIQUID` lands (serves all three forms pages); spec + build the CL6 stepper clause + the net-new `BD.W-FORMS-NUMBER-FIELD-STAGE` demo wave. The src CL6 (digit-reel + held-repeat motion) and the demo (protagonist reeling over aurora) are interdependent — the demo's "value reels at poster scale over a live field" only reads once CL6 wires `<AnimatedDigit>` and the control composite is whole.
- **Loop 2** — paint-verify both `proof:ba-gestalt` verdicts on fresh captures (glass-feedback for the control + CL6, page-band for the demo); re-shoot. The aurora-behind dark-mode chroma-survival + the floating-value-pin are the likeliest re-shoot triggers.
- **Loop 3 (likely)** — the dock-contextual-switch crossfade + the per-cell gravity-entrance timing + the digit-reel-on-held-repeat (the odometer reeling DURING an accelerating auto-repeat is the kind of motion that rarely lands first-capture). The standardize/tighten cleanups (change #6) converge in one pass.

---

## VERDICT (6 lines)

1. **Top-3 changes:** (1) FOLD into NEW `BD.W-CONTROL-LIQUID` — arm `.input-pill` as a full 6/6 liquid-glass surface (rim+core+grain + `vSpecular` gleam + `useSpringPress`/`--control-press-t` + `.glass-reveal` entrance; NumberField inherits free via the shared seam); (2) AUGMENT that wave with the NumberField-specific `CL6` clause — make the VALUE reel (`<AnimatedDigit>`/`useAnimatedNumber`), give the held-repeat motion, thread `ControlSize` to the steppers; (3) aurora-behind-protagonist + `surface="veil"` card-per-section + protagonist hierarchy + `DockStack` contextual-switch + bigger area.
2. **FOLD (change #1):** into the shared net-new `BD.W-CONTROL-LIQUID` (Band-16 src; proposed by the inputs/textarea syntheses, not yet specced) as the 3rd named consumer (Input/Textarea/NumberField/Combobox); zero new src scope — inherits the rim/core/grain/specular/press/entrance arm via the shared `.input-pill` seam.
3. **AUGMENT (change #2):** extend `BD.W-CONTROL-LIQUID` with a NumberField-specific `CL6` clause (digit-reel + held-repeat `data-pressed` motion + ghost-stepper gleam + `ControlSize` thread); gate `proof:control-liquid` CL6a-c + a `control-liquid.spec.ts` stepper arm.
4. **NEW (changes #3-6):** `BD.W-FORMS-NUMBER-FIELD-STAGE` (Band-16 demo, sibling to `BD.W-FORMS-INPUTS-STAGE`; the page is owned by no existing wave) — veil cards + aurora + protagonist + dock switch + currency/unit `formatOptions` breadth + visible label-binding caption + page-arrival + standardize/tighten; gate `proof:forms-number-field-stage` (FS1-FS5) + `proof:ba-gestalt` page-band verdict + π.
5. **FOLD (change #7) / PRUNE:** the `.control-surface` webkit hygiene → a clause in `BD.W-CONTROL-LIQUID` (shared, not the doc-only DESHADCN). PRUNE any bespoke number-field src/demo pair (it would re-fork the shared `.input-pill` register); the path-label fix is a near-no-op (the chip already passes) — fold into FS5.
6. **Convergence: NOT close — 2-3 more loops**, but cheaper than its siblings (the src register is SHARED — only the CL6 stepper clause + the demo composition are number-field-new). The src CL6 and the demo redesign are interdependent (the value reels at poster scale only once `<AnimatedDigit>` is wired); the aurora-dark-chroma, the floating-value-pin, and the digit-reel-during-held-repeat are the likely re-shoot triggers.
