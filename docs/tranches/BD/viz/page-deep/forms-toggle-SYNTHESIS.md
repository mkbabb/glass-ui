# forms/toggle — Pass-E SYNTHESIS (the binding per-page verdict)

- **Page:** `demo/stories/forms/toggle.vue` (151 lines) · **import:** `@mkbabb/glass-ui/toggle-group`
- **SFC protagonist:** `toggleVariants` CVA (the ONE paint source `Toggle` + `ToggleGroupItem` both compose) + the group wrapper; the page also demos `ToggleChip`/`IconChip`.
- **Live:** `http://localhost:5173/forms/toggle` · `CATEGORY_DEFAULT_BG.forms = "grid"` (no aurora) · body card `glass-resting` over a flat near-white page.
- **Sources reconciled:** `forms-toggle-{demo,design,component}.md`.

---

## 0 · One-breath verdict (the three lenses, reconciled)

All three auditors converge with ZERO contradiction: **well-built primitives in an unfinished composition.** The page is a correct, disciplined spec-sheet — a single tall `glass-resting` card holding six gap-stacked `section-label → control → mono-readout` rows over a FLAT cream wash, so the DESIGN.md six-layer Liquid-Glass composite has no colorful backdrop to refract and collapses to an off-white rectangle. It is the generic-AI-template aesthetic the north star exists to avoid. The gap is split clean across two layers:

- **PAGE layer (demo-private, the dominant gap):** no aurora field, one shared card not per-section glass cards, no dock contextual-switch, no `SegmentedTabs`, no bigger main area, near-zero animation affordance, a duplicated in-card header (re-introducing the D1-4 double-`<h1>` inversion), meta-commentary copy, and a P0 dead-demo bug (three identical red cell swatches).
- **SRC layer (real paint, the de-shadcn hole):** the `default` variant has **0 of 6 glass layers** (flat shadcn `bg-accent`/`bg-muted` fills, no `::before` catch-light, no rim, no blur); `outline` has 2 of 6; only `card` is whole. The cell-variant selected state is a dead R10-5 GRAY SLAB. Plus a `card`-variant dual-path press literal (`scale-95`) and missing entrance/selection-glide animation.

The ONE converged strong element: the audacious `text-display-4` masthead `<h1>`. Keep it; build the page up to its bar.

---

## 1 · Reconciled findings (deduped, conflicts resolved)

**No conflicts between the three reports.** They independently name the same defects; the component lens adds the SRC-paint detail (the 6-layer census hole) the demo/design lenses see only as "flat/invisible glass." Merged + ranked:

| # | Finding | Lens(es) | Layer | Impact |
|---|---------|----------|-------|--------|
| **A** | `default` toggle variant has **0/6 glass layers** (flat `bg-accent`/`bg-muted`, no `::before` catch-light/rim/blur); `outline` 2/6; selected fill is shadcn flat-accent, not "selected reads as glass" | component (F5/F6) | SRC | **highest** |
| **B** | Flat cream page — **no colorful field** behind the glass; six-layer composite cannot read (`canvasCount:0`) | all 3 | demo | **highest** |
| **C** | One shared tall card, six bare `<section>`s — **not per-section glass cards**; main area BIG but EMPTY (~55% dead right gutter) | all 3 | demo | high |
| **D** | **Cell-variant selected state = dead R10-5 GRAY SLAB** (`~oklab(0.78)` opaque box) — the W-NO-GRAY/W-REGISTER-IOS defect on-page | design, demo | SRC + demo | high |
| **E** | **P0 dead-demo bug** — `warm/cool/mono` cells each render an identical `bg-viz-fourier` red dot (`toggle.vue:138`); off-identity hue too | all 3 | demo | high (visible-wrong) |
| **F** | **Near-zero animation** at the north-star bar — no entrance stagger, no `vSpecular` liquid-hover gleam, hard-cut mono readouts, no gliding/squishing selection indicator, no `useDragMorph` | all 3 (F1/F2) | SRC + demo | high |
| **G** | **No dock / no `SegmentedTabs` / no procedural-anim / no card series** — the user's "deftly use a series of components + leverage dock APIs" ask wholly unmet | demo, design | demo | high |
| **H** | **Duplicated header** — the chrome `<h1>` + the hand-rolled in-card `<header>` (IconChip + blurb) restate the descriptor (D1-4 double-title inversion re-introduced) | all 3 | demo | med |
| **I** | **Meta-commentary copy** — "the section identity is the ONE color event" leaks design-system process into product copy (also `toggle-chip.vue:55`) | demo, design | demo | low |
| **J** | **No `text-subheading` section rung** — every section is a `--type-caption` mono whisper; bypasses `<StorySection heading>` (AZ.W-HIERARCHY) | design | demo | low |
| **K** | `card` variant press = **dual-path** (`active:scale-95` + bespoke transition instead of `.tap-squish` + `transition-control`) | component (F3) | SRC | low |
| **L** | **Import-path label / deep relative imports** — page header reads `Forms · Toggle`; imports via `../../../src/...` not the published `/toggle-group` subpath | component (F7) | demo | low |
| **M** | N backdrop-filters on a dense outline group | component (F4) | — | note-only |

**Path-label (ask 7) is already correct** in the chrome chip (`@mkbabb/glass-ui/toggle-group`, matches `manifest.ts:240`) — the standardization fix (L) is the deep relative IMPORT, not the rendered label.

---

## 2 · Ranked changes + tranche actions

The findings partition cleanly into the BD forms-band spine (the band-wide SRC + demo waves the sibling forms syntheses already mint) + this page's own specimen + targeted fixes. **No phantom waves** — every action names a real or band-shared wave.

### RANK 1 — The `default`/`outline` toggle gets the six-layer composite + selected-reads-as-glass [SRC · highest]
→ **FOLD into `BD.W-CONTROL-LIQUID`** (the band-wide SRC composite/gleam/press wave the inputs/textarea/combobox/select syntheses already charter: arm the `.input-pill`/`.control-surface` register — 6/6 composite + `vSpecular` gleam + focus/press spring + `.glass-reveal` entrance, armed ONCE across the whole forms band). The toggle is a SUBSET member: extend the `material.css` `::before`/`::after` roster to the toggle CVA `data-[state]` selectors so toggle items get the catch-light + rim, and re-point the `default` selected fill off `bg-accent` onto a `--glass-bg-*` tier ("selected reads as glass", W-REGISTER-IOS) — kills finding **A** AND **D** (the cell gray-slab is the same `bg-accent`/`--surface-tint` residual). Closes finding **F** (the `vSpecular` liquid-hover gleam is armed here too).
→ **MODIFY `BD.W-DESHADCN-CANON`** — the `proof:no-shadcn-default` census has a genuine hole: it reskinned `toggle outline` but the `default` variant's `data-[state=on]:bg-accent` selected residual slipped (the D1 rest-state sweep doesn't catch it because rest is `bg-transparent`). Add `toggle` `default` as a 2nd reskin-target row and widen D1 to catch the `data-[state=on]:bg-accent` SELECTED-state residual, not just rest tokens. (`BD.W-CONTROL-LIQUID` does the PAINT; this MODIFY records the census fact.)

### RANK 2 — Each subsection in its OWN glass card, over ONE colorful aurora [demo · highest]
→ **FOLD into `BD.W-FORMS-PAGE-COMPOSE`** (the band-wide demo-stage wave — the textarea synthesis scopes it across the forms text-entry pages; the inputs synthesis named the sibling `BD.W-FORMS-INPUTS-STAGE`). Enroll `forms/toggle` as a member page: stage a `<DockStage>`-style bento — ONE shared offscreen-paused `<Aurora>` (warm-teal seed matching the `--section-color-3` forms identity) behind a 2-up grid of `<ShowcaseFrame tier="field">` / `surface="glass"` cards (the opt-in `.glass-deep` tier per BD.W-DEEP-GLASS-20PX for the hero card), ONE card per register (single-toggle · group-multiple · group-single · chip · cell). Now the six-layer composite refracts a colorful field; the bento fills the 72rem width (kills **B** + **C**). Honors one-GL-per-route (the shared offscreen-paused field). This SUPERSEDES `BD.W-FORMS-CARD-FOLD`'s minor `label.vue`/`multi-select.vue` arms only where they overlap — toggle.vue is NOT in CARD-FOLD's scope, so no collision.

### RANK 3 — Leverage the dock contextual-switch (the user's explicit ask) [demo · high]
→ **FOLD into `BD.W-FORMS-PAGE-COMPOSE`** (same page-stage wave). Mount a `<DockLayerGroup>` (or `<DockStack mode="facets">`, BE.W-DOCK-RAIL-REALIZE) whose layers/facets ARE the toggle families — the rail contextually switches which register is foregrounded with the dock crossfade + size FLIP; facet chips carry per-family accent hues via `--glass-accent` (BB.W-GLASS-ACCENT per-instance chromatic rim). The toggle-group IS the canonical "switch one surface" control — the deftest dock fit on the whole forms band. Add `SegmentedTabs` to switch material registers (outline/card/chip/cell), surfacing the currently-invisible `variant="card"` tile + radio-semantics arm (kills **G**).

### RANK 4 — Wire the entrance + selection-glide + alive readouts [SRC + demo · high]
→ **FOLD the SRC arms into `BD.W-CONTROL-LIQUID`** — the entrance reveal (W-SUFFUSE3 `icon-chip-reveal` spring-clock / `vReveal` stagger onto the toggle item — finding F1) and the **selection-glide indicator** (a travelling selected-plate on `--spring-snappy` + `useLiquidFlex` reciprocal-squish — transpose the SegmentedTabs `useTabIndicator` register onto the `type="single"` radio arm, NOT a 2nd engine — finding F2). These are the band-wide "every control alive" arms.
→ **FOLD the demo arms into `BD.W-FORMS-PAGE-COMPOSE`** — the entrance cascade staging + a `<Transition>`/`useAnimatedNumber` on the mono state-readouts so state changes are alive, not hard-cut.

### RANK 5 — Kill the double-header + tighten language + section rung [demo · med/low]
→ **FOLD the header dedup into `BD.W-PAGE-HEADER-FOLD`** (it owns the 36-file inline-header → chassis fold; toggle.vue's hand-rolled in-card `<header>` is exactly that paste — finding H).
→ **FOLD the copy-tighten + section-rung into `BD.W-FORMS-PAGE-COMPOSE`** — drop "the section identity is the ONE color event" (finding I; also strip the twin in `toggle-chip.vue:55`), rewrite the blurb to product copy ("On/off marks, exclusive groups, and chip/cell pickers."), and adopt `<StorySection heading>` / `text-subheading` per card title (finding J) as the page is rebuilt. The deep relative imports → published `/toggle-group` subpath (finding L) ride the same rebuild pass.

### RANK 6 — Fix the cell swatches (P0 dead-demo) [demo · high-visibility, low-effort]
→ **FOLD into `BD.W-FORMS-PAGE-COMPOSE`** — give each cell a distinct real hue (warm = `--section-color-9` amber, cool = `--section-color-3` teal, mono = ink) so the palette picker actually picks palettes (finding E). Lands as part of the page rebuild (the swatches re-materialize on the rebuilt cell card); no separate wave.

### RANK 7 — Retire the `card`-variant press dual-path [SRC · low]
→ **PRUNE / FOLD into `BD.W-CONTROL-LIQUID`** — delete the `scale-95` literal + bespoke transition; compose `.tap-squish` + `transition-control` like the base (the W-PRESS-UNIFY single-scale discipline — finding K). Rides the same SRC register pass.

### RANK 8 — Gestalt-roster enroll [MODIFY · close-oracle prerequisite]
→ **MODIFY `BD.W-GESTALT-ROSTER-GROW`** — ensure `forms/toggle` (the redesigned page + the open-dropdown + a toggle spring-in capture note) is enrolled in the BD roster's `surface-paths` so the page redesign + the SRC composite have a fresh-capture `proof:ba-gestalt` verdict home (currently aggregates under `page-band`).

### Note-only — finding M
N backdrop-filters on a dense outline group: document the scaling caveat in `BD.W-CONTROL-LIQUID`; no fix at this count.

---

## 3 · Tranche-action summary

| # | Change | Action | Wave |
|---|--------|--------|------|
| A | default/outline toggle gets 6/6 composite + selected-as-glass | **FOLD** | `BD.W-CONTROL-LIQUID` (SRC) |
| A′ | census records `default` as 2nd reskin-target + D1 catches selected residual | **MODIFY** | `BD.W-DESHADCN-CANON` |
| B/C | per-section glass cards over ONE colorful aurora; fill the void | **FOLD** | `BD.W-FORMS-PAGE-COMPOSE` (demo) |
| D | cell selected gray-slab → glass tier | **FOLD** | `BD.W-CONTROL-LIQUID` (same residual as A) |
| E | fix identical red cell swatches → distinct real hues | **FOLD** | `BD.W-FORMS-PAGE-COMPOSE` |
| F | entrance + liquid-hover gleam + alive readouts | **FOLD** | `BD.W-CONTROL-LIQUID` (src) + `BD.W-FORMS-PAGE-COMPOSE` (demo) |
| F2 | selection-glide indicator on single arm | **FOLD** | `BD.W-CONTROL-LIQUID` (transpose `useTabIndicator`) |
| G | dock contextual-switch + `SegmentedTabs` register switcher | **FOLD** | `BD.W-FORMS-PAGE-COMPOSE` |
| H | kill double-header | **FOLD** | `BD.W-PAGE-HEADER-FOLD` |
| I/J/L | tighten copy · section rung · subpath imports | **FOLD** | `BD.W-FORMS-PAGE-COMPOSE` |
| K | `card` press dual-path | **PRUNE** | `BD.W-CONTROL-LIQUID` |
| M | dense outline backdrop-filter count | **note-only** | `BD.W-CONTROL-LIQUID` |
| 8 | gestalt-roster enroll | **MODIFY** | `BD.W-GESTALT-ROSTER-GROW` |

**ZERO net-new waves owed by this page.** Every finding folds onto the band-wide spine (`BD.W-CONTROL-LIQUID` SRC + `BD.W-FORMS-PAGE-COMPOSE` demo) already minted by the sibling forms syntheses, plus three coordination MODIFYs. The toggle page is a member of that shared band redesign, NOT a per-page bespoke fork — its SRC findings are a strict subset of the band composite arm; its demo findings are a strict subset of the band page-stage wave. **The band must NOT spawn a per-page stage wave for toggle.** (Anti-overfit: `BD.W-CONTROL-LIQUID` ships the canonical composite every form control reads; the page-stage moves — tier=field cards, dock-facet switch, aurora field — are shared chassis moves every weak forms page needs.)

**No PRUNE of dead code** beyond the `card`-press dual-path literal (K, retired onto the token register). The single highest-leverage SRC finding is **A** — the de-shadcn census genuinely missed the `default` variant's selected residual, so the import-named protagonist of this very page is the LEAST glassy control in the library; that is the one finding that escapes the demo layer and demands a census reconcile.

---

## 4 · Convergence call (6-line verdict)

**Top-3 changes:** (1) `default`/`outline` toggle gets the six-layer glass composite + selected-reads-as-glass [FOLD `BD.W-CONTROL-LIQUID` · MODIFY `BD.W-DESHADCN-CANON` census hole]; (2) per-section glass cards over ONE shared colorful aurora + bento that fills the width [FOLD `BD.W-FORMS-PAGE-COMPOSE`]; (3) dock contextual-switch + `SegmentedTabs` register switcher + entrance/selection-glide/alive-readout animation [FOLD `BD.W-FORMS-PAGE-COMPOSE` + `BD.W-CONTROL-LIQUID`].
**Tranche actions:** FOLD ×9 (onto the band spine + `BD.W-PAGE-HEADER-FOLD`), MODIFY ×2 (`BD.W-DESHADCN-CANON` census + `BD.W-GESTALT-ROSTER-GROW` enroll), PRUNE ×1 (the `card` dual-path press); **zero net-new waves** — toggle is a member of the shared forms band redesign, not a bespoke fork.
**Convergence:** NOT close — among the WEAKEST forms pages, missing on BOTH layers (the only forms page with a real de-shadcn SRC hole on its import-named protagonist) PLUS the full page-redesign surface. But the diagnosis is fully converged (three lenses unanimous, no contradictions) and the work is the SAME band spine the sibling forms pages already charter — no per-page taste backlog. Expect ~2-3 loops: loop 1 lands the `BD.W-CONTROL-LIQUID` toggle arm (6/6 composite + selected-as-glass + census reconcile) and the `BD.W-FORMS-PAGE-COMPOSE` skeleton (aurora field + tiered glass cards); loop 2 wires the dock facet-switch + selection-glide indicator + entrance cascade + fixes the cell swatches + copy/header dedup; loop 3 re-earns the `proof:ba-gestalt` verdict on a fresh capture (both modes + the open register + a toggle spring-in frame) via `BD.W-GESTALT-ROSTER-GROW`. Keep the one converged element — the `text-display-4` masthead — and build the page up to its bar.
