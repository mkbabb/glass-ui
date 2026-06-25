# forms/slider — Pass-E SYNTHESIS (the binding per-page verdict)

**Page:** `demo/stories/forms/slider.vue` · live `http://localhost:5173/forms/slider` (`:5199` for π)
**Component:** `src/components/ui/slider/Slider.vue` (+ `slider/index.ts`)
**Inputs reconciled:** `forms-slider-{demo,design,component}.md` (3 independent Pass-E auditors, separate contexts)
**Import label:** `@mkbabb/glass-ui/slider` — chip renders CORRECT (all three agree; the SFC's deep-relative import is demo-internal, not a label defect).

---

## 0 · The three reports agree — one page, one diagnosis

All three converge on the SAME cardinal failure and the SAME ranked fixes, from three lenses:

- **demo (congruence/API):** the flagship `keepDockOpen` API is demoed ZERO times; the page is the thinnest possible composition (2 glass-ui surfaces); `viz-fourier fill` is a DEAD feature (BUG-1, hard).
- **design (frontend-craft):** "a page *about glass* with zero visible glass" — every fill computes `oklab(0.216…/0.88)` charcoal because there's no aurora behind to refract; monotone hierarchy; generic-AI-template; same dead `viz-fourier` binding (their §2).
- **component (src-quality):** P4 motion-canon violation (4 sites: `--spring-smooth` paired with generic `--duration-fast`); no `useSpringPress` on the strongest spring-press candidate in the band; layer-6 grain absent on the cylinder; ~120 lines of redundant CSS-comment prose.

**The reconciled root cause is ONE structural fact:** the slider's entire visual identity is its translucent fill, and the fill can only read as glass over a *colorful, refractable* backdrop. The page rides the flat `grid` substrate (forms category default), so layer-1 of the six-layer composite is dead on every demo. Fixing the staging resurrects the glass on all six sections at once — it is load-bearing above everything else on this page.

**No conflicts to resolve** — the three lenses are complementary (demo = what's missing, design = how it reads, component = the src defects). The only DEDUPE: all three independently flag the `viz-fourier fill` dead binding (it appears once below as the single highest-confidence src-or-demo bug).

---

## 1 · Ranked changes (by impact)

### R1 — Stage the body over a live `<Aurora>` field (the load-bearing fix)
*All 3 reports, #1 each.* The `<DockStage>` precedent (ONE shared, offscreen-paused aurora, one GL context per route per the budget) behind the demo column; each demo drops onto a transparent `ShowcaseFrame tier="field"` (BA.W-STAGE's BG-2 black-plate fix — the host already exists). The instant a saturated aurora paints behind the cream, `saturate(1.05) brightness(1.02)` comes alive and the charcoal slab becomes a refractive cylinder — the iOS-26 read the component was built for and has never been allowed to show. **This is the single highest-impact change on the page** and directly serves the user's binding "glass demos over COLORFUL aurora backgrounds" bar.

### R2 — Fix the `viz-fourier fill` dead binding (a broken demo cannot ship)
*demo BUG-1 (hard) + design §2 + component implied.* `slider.vue:88-93` retints via `[&_.slider-range]:bg-viz-fourier`, which LOSES to the unlayered scoped `.slider-range { background: color-mix(…) }` (the unlayered-beats-`@layer` trap, documented across the codebase: AZ.W-DOCK-RAIL / W-MENU-GLASS). The section renders identical charcoal to standard. **Fix:** drive the documented token seam `:style="{ '--slider-range-bg': 'var(--viz-fourier)', '--slider-track-bg': … }"` (the way the spectrum section already correctly drives `--slider-track-bg`). This is the precise `feedback_glass_ui_binding_verification` class (vue-tsc passes, only a live render catches).

### R3 — Each sub-section in its OWN glass card; main area BIGGER; 2-column bento
*design §4 + demo §4 + user mandate verbatim.* Today all 6 sections live in ONE `StoryHero` card hairline-delimited; the body starts ~360px down with a vast dead-grey gutter (the ~80px vertical dock floating in empty margin). **Fix:** each demo → its own `glass-resting`/`glass-quiet` plate over the aurora with `--card-pad-*` φ interior padding (BB.W-CARD-PAD), in a 2-column bento claiming far more of the 1440px width. A card *over the aurora* is itself a refracting glass surface (the single-aurora-composition-container respects glass-cannot-sample-glass) — the page becomes nested glass plates, not flat captions on cream.

### R4 — Promote ONE focal hero slider (typography + suffusion land on the protagonist)
*design §3/§7 + demo §1.* Hierarchy is monotone (the audacious √φ ladder appears ONLY in the chrome `<h1>`; six identical 12px mono captions inside). **Fix:** the standard "Volume" slider becomes the hero — `lg` size, over the aurora, with its value in a real display rung (`text-display-2/-3` tabular-nums, the fast.com-peg idiom) carrying the section-3 teal as `--slider-range-bg`, so the page's ONE color event *is the thing you came to see*. Sub-section heads move to the `--type-subheading` (20.4px/600) `<h2>` register (`StorySection heading`, AZ.W-HIERARCHY) instead of six identical mono captions.

### R5 — Make every slider ALIVE at the iOS-27 bar + leverage the dock APIs
*design §5/§6 + demo §1 + component §1.* Static today (only the page-build entrance moves). **Fix:** value count-up on mount (`useCountup`/`useAnimatedNumber`) into the display readout; hover specular bloom on the spectrum thumb; canonical 0.96 press-squish; and a REAL `<GlassDock>` mixer strip housing the Volume/Balance sliders that actually fires the `keepDockOpen` hold mid-drag, with `DockLayerGroup` contextual-switch between standard ↔ spectrum recipes. ONE move satisfies "leverage the dock APIs," "deftly uses a SERIES of components," and the page's own keep-dock-open blurb it advertises-but-never-shows.

### R6 — Src-paint defects on `Slider.vue` (the component report's bind)
*component §1/§5/§6.* (a) **P4 violation, 4 sites:** `--spring-smooth` paired with `--duration-fast` (0.2s) instead of `--spring-smooth-duration` (0.36s) at `Slider.vue:271,314` (+ the thumb/press legs) — re-times the spring to the wrong wall clock, drags the dead sub-pixel tail motion-canon P4 condemns; the slider was never enrolled in `proof:animation-coherence`'s DURATION-BAND, a genuine miss. (b) **No `useSpringPress`** — a continuously-dragged scrubber is the strongest spring-press candidate in the band yet has the weakest press model (one-shot CSS transition, not interruptible velocity-continuous); W-PRESS-UNIFY booked the dock-control as the third consumer — the slider is the stronger 4th. (c) **Layer-6 grain absent** on the glass cylinder (the one missing optical layer of six) + verify the catch-light paints over the fill, not the collapsed invisible thumb. (d) **PRUNE ~120 lines** of redundant CSS-comment prose (the "you pull the track, thumb invisible" point re-derived across three rules — the user's "tighten superfluous language" bar).

### R7 — Tighten prose + drop the duplicate header (lowest, mostly folds into existing waves)
*demo §6 + design §6 + component §5.* The in-card blurb "the section identity is the ONE color event" is internal audit-jargon leaking to the viewer — delete. The page renders `FORMS · SLIDER` TWICE (chrome header + the SFC's hand-rolled in-card header) — the W-HIERARCHY2 one-ordered-cluster discipline bypassed by the SFC hand-rolling its own header.

---

## 2 · Tranche actions (FOLD / MODIFY / AUGMENT / PRUNE / NEW)

| # | Change | Action | Wave |
|---|---|---|---|
| R7 (header) | The duplicate `FORMS · SLIDER` in-card header paste | **FOLD** | `BD.W-PAGE-HEADER-FOLD` — `forms/slider.vue` IS already in its 36-file enrolled set; the fold deletes the SFC's hand-rolled `<header borderLeft>`+IconChip+span and replaces it with the `<StorySectionHeader>` eyebrow-only call. The duplicate-header defect is structurally closed by the existing wave; no new work — confirm slider.vue is enrolled (it is, per the wave's §2 forms list). |
| R7 (prose) + import label | The in-card jargon blurb + the demo-relative import label note | **MODIFY** | `BD.W-PAGE-HEADER-FOLD` — the blurb text moves into the chassis `blurb` prop (tighten there); the import label is already correct (no action). |
| R3 (own cards) | Each sub-section → its own glass card / bento | **MODIFY → AUGMENT** | `BD.W-FORMS-CARD-FOLD` is the natural home BUT its current §1 scope is narrow (the `label.vue` switch-row + `multi-select.vue` grouped-section + `dialog.vue` confirm-card — it does NOT touch `slider.vue`). **AUGMENT it** to add the slider's 6-section single-card → per-section `<ShowcaseFrame>`/`<Card>` bento fold (a new M14-4 clause + slider.vue enrollment), OR carry it in the NEW staging wave below. Recommend carrying R3 in the NEW wave (R1/R3/R4/R5 are one coherent redesign, not a separable card-fold). |
| R2 (dead binding) | `viz-fourier fill` `[&_.slider-range]:bg-*` no-op → token seam | **NEW** (carried in the redesign wave) | A broken live demo is a defect, not a fold — it belongs with the redesign that re-stages the page (the token seam `--slider-range-bg` is the same seam R4's hero teal uses). Carry in `BD.W-FORMS-SLIDER-STAGE` (NEW, below). |
| R1 + R3 + R4 + R5 | Aurora staging + own-cards bento + focal hero + alive/dock-mixer | **NEW** | **`BD.W-FORMS-SLIDER-STAGE`** — net-new **Band-16** wave (demo-page redesign, zero src paint). The coherent page-redesign: `<DockStage>`-pattern aurora, `tier="field"` per-section bento, focal `lg` hero with display-rung count-up + teal `--slider-range-bg`, hover-bloom/press-squish wired, a real `<GlassDock>` keep-dock-open mixer + `DockLayerGroup` contextual-switch, R2's dead binding fixed in passing. Gate: extend `proof:storybook-meta` with a slider-stage clause (has-aurora-backdrop + per-section-card-count + focal-hero-display-rung + the dead-binding-token-seam assert + keepDockOpen-demonstrated) + the `proof:ba-gestalt` `forms-band`/`page-band` verdict on a FRESH capture (BC anti-disease law — no source-green close). |
| R6a (P4 clock) | `--spring-smooth` + `--duration-fast` mis-pair, 4 sites | **NEW** (src paint) | **`BD.W-SLIDER-SRC-MOTION`** — net-new **Band-17** wave (the single net-new `Slider.vue` SRC wave, the `BD.W-ARIA-ORIENTATION-GUARD` precedent: "the net-new SFC wave the cut owes"). Re-pair to `--spring-smooth-duration`; **enroll the slider in `proof:animation-coherence`'s DURATION-BAND** (the gate that should have red'd it — currently green only because the slider was never enrolled). Born-RED at HEAD. |
| R6b (spring-press) | No `useSpringPress`/`useLiquidPress` — weakest press on strongest candidate | **AUGMENT** | `BD.W-SLIDER-SRC-MOTION` — bind `useLiquidPress`/`useSpringPress` (interruptible velocity-continuous re-seat), the slider as W-PRESS-UNIFY's 4th/booked consumer. Drive the canonical 0.96 press-squish (DESIGN §L3) off the spring, not the 0.97 CSS outlier. |
| R6c (grain layer) | Layer-6 grain absent on the cylinder; catch-light-over-fill verify | **AUGMENT** | `BD.W-SLIDER-SRC-MOTION` (or beside `BD.W-DEEP-GLASS-20PX`) — compose the W-LIQUIDHOVER grain `::after`; relocate/verify the catch-light owner so it paints over the fill not the collapsed thumb. Completes the six-layer composite on the hero glass cylinder. |
| R6d (prose) | ~120 lines redundant scoped-CSS comment prose | **PRUNE** | `BD.W-SLIDER-SRC-MOTION` (doc-only rider on the src wave) — tighten the re-derived "you pull the track" prose; the canonical explanation lives once in `index.ts`/CLAUDE.md. |
| R6e (will-change) | box-shadow animated on hover/held (paint); no `will-change` on press | **MODIFY** (minor) | `BD.W-SLIDER-SRC-MOTION` low-priority rider — `will-change: transform` on `:active`/`[data-held]`; accept the box-shadow step (low-frequency, not a thrash). |

### Net new waves owed (2)
1. **`BD.W-FORMS-SLIDER-STAGE`** (Band-16, demo, zero src) — R1+R3+R4+R5+R2. The page redesign.
2. **`BD.W-SLIDER-SRC-MOTION`** (Band-17, src paint) — R6a-e. The `Slider.vue` motion+composite repair, the `BD.W-ARIA-ORIENTATION-GUARD` net-new-SFC precedent.

### Folds into existing waves (no new work)
- R7 (duplicate header + jargon blurb) → `BD.W-PAGE-HEADER-FOLD` (slider.vue already enrolled).
- R3 (own cards) could MODIFY `BD.W-FORMS-CARD-FOLD` but is better carried in the STAGE wave (one coherent redesign).

---

## 3 · Convergence call

**NOT close — needs ~2 more substantive loops, both NEW waves, but the diagnosis is fully converged (no more audit loops needed).** The three reports agree completely on cause and fix; there is nothing left to *diagnose*. What remains is two real build waves:

1. The demo redesign (`BD.W-FORMS-SLIDER-STAGE`) — the page is currently the single most-damning counter-example to the library on the live site (design §TL;DR): a glass page with zero glass. This is a from-scratch page composition (aurora-staging + bento + focal hero + dock mixer), not a tweak. **One full build loop + one π re-capture loop.**
2. The src repair (`BD.W-SLIDER-SRC-MOTION`) — a real born-RED motion-canon + composite defect on `Slider.vue`, gate-enrollable, with a clear scope. **One build loop.**

After those two waves land + paint-verify (the `proof:ba-gestalt` `forms-band` verdict on a fresh capture), the page converges. The page is **far** from the bar today but the path is unambiguous — no exploratory loops, two scoped builds.

---

### 6-line verdict

1. **Top-3 changes:** (R1) stage the body over a live `<Aurora>` field — the load-bearing fix that resurrects dead glass on all six sections (every fill is currently an opaque `oklab(0.216…/0.88)` charcoal slab); (R2) fix the `viz-fourier fill` DEAD binding (`[&_.slider-range]:bg-*` loses to the unlayered scoped rule — drive `--slider-range-bg` token-first); (R3+R4) each sub-section in its own glass card in a 2-column bento with ONE focal `lg` hero slider carrying a display-rung count-up value + the section-3 teal.
2. **NEW wave 1 — `BD.W-FORMS-SLIDER-STAGE`** (Band-16, demo zero-src): R1+R3+R4+R5+R2, the page redesign with a `proof:storybook-meta` stage-clause + a `forms-band` `proof:ba-gestalt` verdict on fresh capture.
3. **NEW wave 2 — `BD.W-SLIDER-SRC-MOTION`** (Band-17, src paint, the `BD.W-ARIA-ORIENTATION-GUARD` net-new-SFC precedent): R6 — re-pair 4 P4 sites to `--spring-smooth-duration` + enroll in `proof:animation-coherence`; bind `useSpringPress`/`useLiquidPress` (slider = W-PRESS-UNIFY 4th consumer, 0.96 squish); add layer-6 grain; PRUNE ~120 lines comment prose.
4. **FOLD:** R7 (duplicate `FORMS · SLIDER` header + jargon blurb) → `BD.W-PAGE-HEADER-FOLD` (slider.vue already in its 36-file enrolled set — no new work).
5. **MODIFY/AUGMENT:** `BD.W-FORMS-CARD-FOLD` could carry R3's own-cards fold (M14-4 + slider enrollment), but R3 is better carried in the STAGE wave as one coherent redesign; `BD.W-DEEP-GLASS-20PX` is the alt home for R6c grain. **PRUNE:** R6d/R7 superfluous prose.
6. **Convergence:** diagnosis FULLY converged (3 lenses agree, zero conflicts) — no more audit loops; but ~2 substantive BUILD loops owed (the Band-16 demo redesign + the Band-17 src repair). The page is far from bar today; the path is unambiguous and scoped.
