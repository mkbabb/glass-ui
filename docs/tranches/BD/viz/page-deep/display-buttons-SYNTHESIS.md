# display/buttons — Pass-E SYNTHESIS (binding per-page verdict)

**Route:** `/display/buttons` · **SFC:** `demo/stories/display/buttons.vue` (196 lines) · **Import label:** `@mkbabb/glass-ui/button`
**Inputs reconciled:** `display-buttons-{demo,design,component}.md` (the 3 Pass-E auditor contexts).

---

## 1 · Reconciliation — where the three agree, where they diverge

**Unanimous (all three, high confidence):**
- **The COMPONENT is the gold standard, the PAGE is a spec-sheet.** The component audit is emphatic and the other two concur: `Button.vue` is the library's reference interactive primitive — full four-state contract, interruptible `useSpringPress` (0.15/ζ0.86), `useLiquidFlex` press-squish, `v-specular` gleam, one-drive-two-legs press-coupled specular, 6/6 glass composite, compositor-only + Safari-clean + zero-legacy. **There is NO `src/` defect on the protagonist.** Every actionable defect is in the DEMO PAGE.
- **The glass-over-field staging is FALSE.** Demo + design both prove via live DOM that the two `<ShowcaseFrame tier="field">` rows (`glass register`, `raw .glass-btn`) drop the plate but sit over flat cream — `auroraInFields:[false,false]`, only ONE `<canvas>` on the page (the CTA). The glass variants refract flat cream = the invisible-lozenge the SFC's own comment claims to fix. This is a §L1 violation in the demo that exists to teach §L1.
- **One plate, no per-section cards.** All 9 sections live in a single `story-hero-card` separated by `--configurator-divider` hairlines. The user's verbatim ask ("each sub-section in its OWN glassy card") is the opposite of the shipped divider-stack.
- **Zero dock-API leverage.** No `<SegmentedTabs>`, no `<DockLayerGroup>`/`<DockStack mode="facets">`, no in-page `<GlassDock>`. The user's "leverage the dock APIs (contextual switching/animating)" ask is wholly unmet (design grades it **F**).
- **The four-state row is FAKED.** `scale-[0.97]` + `bg-[var(--glass-bg-resting)]` static classes labeled "Hover (sim.)"/"Active (sim.)" — a static paste pretending to be a live state, on the page whose protagonist ships the real interruptible spring.
- **Import-label chip PASSES; the SFC import is the demo-internal relative `src/` norm.** Demo + component agree the user-facing chip `@mkbabb/glass-ui/button` is correct. Design flags the LABEL-vs-actual-import divergence as a cross-page standardization concern, not a per-page bug.

**Divergence (resolved):**
- **Component report's optimism vs demo/design's severity.** The component audit frames the demo asks as a low-stakes "MODIFY (demo, zero src)" and leans toward folding them into the existing `BD.W-PAGE-HEADER-FOLD`/`BD.W-PAGE-OFFTOKEN-SWEEP`. The demo + design reports treat them as the PAGE's defining failure (~85% of user asks unmet; design scorecard D/F across glass-fidelity, animation-affordance, dock-leverage). **Resolution:** the demo asks are NOT a header/off-token concern — they are a structural re-architecture (field-staging + per-section cards + a dock contextual stage). `BD.W-PAGE-HEADER-FOLD` folds the page-IDENTITY header paste (eyebrow+rail+chip) and `BD.W-PAGE-OFFTOKEN-SWEEP` sweeps `text-zinc-900`/`text-white` literals — NEITHER touches body structure, field-staging, or dock composition. Stretching them to cover this would overload waves with a precise disjoint scope. The structural work needs its OWN wave with a real gate.
- **Double-header.** Design flags a double-eyebrow/double-title collision (chrome `DISPLAY · BUTTONS` + `<h1>Buttons`, then the first `<section>` repeats `DISPLAY · BUTTONS` + `<h2>Launch the sequence`). Demo notes the same as "inconsistent section structure" (B3). **Resolution:** this is partly the `BD.W-PAGE-HEADER-FOLD` PH3 concern, BUT the first section here is a HAND-ROLLED bare-section CTA cluster OUTSIDE the StorySection chassis — not the enrolled `borderLeft:`+IconChip page-identity paste `BD.W-PAGE-HEADER-FOLD` folds. So the CTA double-header is a NEW-wave concern, not covered by the existing fold.

---

## 2 · Defects RANKED by impact

| # | Defect | Severity | User-ask hit |
|---|---|---|---|
| **D1** | **Glass demoed over flat cream** — `tier="field"` rows have NO field behind them; the page's central teaching purpose (lit glass over color) is dead-on-arrival, against the SFC's own thesis. | **Critical** | "glass demos over COLORFUL aurora backgrounds" |
| **D2** | **One plate, no per-section glassy cards** — 9 sections in one divider-stacked cream card. | **Critical** | "each sub-section in its OWN glassy card" |
| **D3** | **Zero dock-API leverage** — no tabs/dock/contextual-switch; eight static strips instead of one big dock-switched stage. | **High** | "leverage the dock APIs" + "deftly use a series of glass-ui components" |
| **D4** | **Main area too small** — pageH 806px (under one viewport), every row a left-hugging sliver with ~60% dead cream to the right; no large central demo stage. | **High** | "main card area BIGGER (more screen space)" |
| **D5** | **Faked four-state row + 5/8 sections inert** — `scale-[0.97]` sim classes instead of a live press harness; no per-element gravity-rise entrance. | **High** | "HIGH animation affordance for EVERY component" |
| **D6** | **Double-header on the CTA section** + ladder collapses to monotone 20px after the hero (no mega/audacious activation on any focal specimen). | **Medium** | typography-forward / hierarchy |
| **D7** | **Superfluous language** — 14-line header design-essay (now actively MISLEADING re: field-staging), token-jargon blurbs, 3× repeated BG-2 thesis, apologetic "shown simulated" filler. | **Medium** | "tighten superfluous language" |
| **D8** | **Color-event over-proportion** — ~3 competing events (aurora + viz-basis row + the over-loud `destructive`); destructive renders as 2nd-loudest thing on the page despite being labeled "a quiet specimen". | **Low** | suffusion proportion |
| **D9** | **Stale SFC comment** `Button.vue:66` (`0.25/0.7` → runtime `0.15/0.86`). | **Cosmetic (src)** | — already flagged in `BD.W-BUTTON-GLASS-IOS-NOTE` |

D1+D2+D3+D4 are ONE entangled re-architecture: stage the body over a shared aurora field, give each section its own glass card over that field, switch the registers with a dock contextual rail, and make the stage big. They cannot be folded into three separate header/sweep waves — they need one structural wave.

---

## 3 · Tranche actions

### NEW — `BD.W-DISPLAY-BUTTONS-STAGE` (Band 4, demo-private, zero src paint)

**The core re-architecture wave** addressing D1–D6. Scope:

1. **Shared aurora field (D1).** Re-stage the whole section column over ONE shared `<Aurora>` field via the shipped `<DockStage>` pattern (the budget already spends exactly one GL context on the CTA — reuse it page-wide, net-zero GL cost). The `tier="field"` frames then refract live color instead of flat cream. Kills the §L1 contradiction.
2. **Per-section glass cards (D2).** Wrap each `<StorySection>` body in a `.glass-resting`/`.glass-quiet` card (lowest tier that floats over the field). Drop the single-card divider-stack. Cards-over-aurora = the showcase reads as the product.
3. **Dock contextual stage (D3+D4).** Replace the eight stacked left-hugging strips with ONE large central stage whose register (Glass · Opaque · Sizes · Chromatic · States) is switched by a `<DockStack mode="facets">` contextual rail OR `<SegmentedTabs variant="pill">` — leverage the contextual-switch/animate dock APIs the user named. One big animated canvas, dock-switched, filling the card width and growing the page past one viewport.
4. **Live four-state harness (D5).** Replace the faked `scale-[0.97]` sim row with ONE real `<Button :liquid>` exercising the live `useSpringPress` interruptible squish + `v-specular` gleam-track + `.glass-lens` refraction (the `:liquid` axis is currently bound NOWHERE on the page — the headline refraction is invisible). Give specimen rows the W-HIERARCHY2 staggered gravity-rise entrance.
5. **Kill the CTA double-header + activate the ladder (D6).** Suppress the first section's redundant eyebrow+title (the hero owns the page descriptor once); promote ONE focal specimen word to `text-display-mega`/`-audacious` (§Suffuse activation).

**Gate:** `proof:storybook-meta` new clause **M15 — display-buttons stage** (born-RED on HEAD), device-free arms:
- M15-1: the section column composes `<DockStage>`/a shared `<Aurora>` AND `auroraInFields` is non-empty (the field-staging is real, not `tier="field"`-over-cream) — RED on HEAD (`auroraInFields:[false,false]`).
- M15-2: ≥N per-section glass cards present (`glass-resting`/`glass-quiet` count ≥ section count − hero), the single-divider-stack GONE — RED on HEAD (`glass-card:0`).
- M15-3: a dock contextual primitive (`<DockStack mode="facets">`/`<SegmentedTabs>`/`<DockLayerGroup>`) composed in-page — RED on HEAD (zero).
- M15-4: the faked four-state sim classes (`scale-[0.97]`/`bg-[var(--glass-bg-resting)]` labeled "sim") GONE; a live `:liquid` Button bound — RED on HEAD.
- + a self-test bite per clause (a synthetic re-introduced flat-field/divider-stack/sim-row reds).

**Paint verification:** `proof:ba-gestalt` `page-band` verdict on a FRESH capture of `/display/buttons` (both modes × desktop+mobile, `:5199`) — the glass specimens read over LIVE color, each section its own floating card, the dock-switched stage animates, the live `:liquid` Button refracts + presses. The SFC's `surface-paths` drift auto-revokes the `page-band` PASS (G7) until re-captured. **No source-green close.** This is the wave that converts the design scorecard's D/F glass-fidelity + dock-leverage rows.

### MODIFY — `BD.W-PAGE-OFFTOKEN-SWEEP`

D8's viz-basis row label uses `text-zinc-900` over `bg-viz-*` plates — already in this wave's scope (`text-zinc-900`/`text-white` → `text-foreground` over brand-hue plates). The display/buttons viz-basis row is a named target. **No new gate** — fold the call site into the existing sweep census. Also fold the destructive-over-loud proportion fix (D8) here as a copy/variant adjustment if it touches an off-token literal; otherwise it rides `BD.W-DISPLAY-BUTTONS-STAGE` §3.5 suffusion-proportion.

### FOLD — `BD.W-BUTTON-GLASS-IOS-NOTE`

D9 (the stale `Button.vue:66` comment `0.25/0.7`→`0.15/0.86`) is already flagged in `BD.W-BUTTON-GLASS-IOS-NOTE §2` as an observation. Fold the 1-line comment fix into that wave's hygiene clause. Zero runtime impact, SFC byte-fenced by other gates.

### PRUNE — superfluous language (D7), folded into `BD.W-DISPLAY-BUTTONS-STAGE`

The language-tighten is structurally inseparable from the re-architecture (the misleading 14-line header essay must DIE when the field-staging is actually fixed, and the apologetic "shown simulated" filler dies with the faked row). Fold the copy-tighten into the STAGE wave's call-site rewrite rather than minting a separate language wave — the prose changes are a side effect of the structural edits, not a standalone surface. Trim: header essay → 2-line what-it-shows; token-jargon blurbs ("`--glass-specular` edge catch-light…") → plain language; the 3× BG-2 thesis repeats → deleted; "shown simulated for reference" → deleted with the faked row.

### NO src wave (component)

Confirmed by the component audit: Button is the reference implementation. The deep-glass deepening Button consumes for free via `BD.W-DEEP-GLASS-20PX` / `BD.W-GLASS-LENS-CHROMA` (already booked, perf-gated, no Button edit). Import-path-label standardization (a shared chip primitive reading the real published subpath across ALL pages) is a cross-page concern — note it as a candidate for a tranche-wide `BD.W-IMPORT-LABEL-CANON` IF the design report's cross-page observation recurs on other Pass-E pages; do NOT mint it from this one page.

---

## 4 · Convergence assessment

**NOT close — needs the STAGE wave + ≥2 more loops.** This is the most divergent of the Pass-E gap classes: the component is perfect but the page meets ~15% of the user's structural asks. The four critical/high defects (field-staging, per-section cards, dock leverage, big stage) are a single entangled re-architecture, not incremental patches — exactly the gestalt-redesign-over-patch posture the North Star demands. After `BD.W-DISPLAY-BUTTONS-STAGE` lands, expect:
- **Loop 1** to surface the one-GL-budget tension (a page-wide aurora behind per-section glass cards must verify the `glass-cannot-sample-glass` Z-stack reads correctly — the cards float over the field, they don't try to blur each other).
- **Loop 2** to tune the dock-contextual stage proportion (the big central stage vs the variant-family rail; the gravity-rise entrance stagger).

The page is a **template** for the display band — the STAGE wave's pattern (shared field + per-section glass cards + dock contextual stage) likely generalizes to the sibling display pages (badge, typography, colors, icons), so the gate + chassis should be designed reusable, not display/buttons-specific.

---

## 6-LINE VERDICT

1. **Top-3 changes:** (D1) re-stage the whole body over ONE shared `<Aurora>` field so the glass specimens refract live color (the §L1 contradiction — `tier="field"` over flat cream — is the central dead-demo); (D2) give each sub-section its OWN glass card, killing the single divider-stacked cream plate; (D3) replace the eight static strips with ONE big dock-contextual stage (`<DockStack mode="facets">`/`<SegmentedTabs>`) leveraging the named dock APIs.
2. **NEW:** `BD.W-DISPLAY-BUTTONS-STAGE` (Band 4, demo-private) — the entangled D1–D6 re-architecture (shared field + per-section cards + dock stage + live `:liquid` four-state harness + kill CTA double-header + activate ladder), gated by new `proof:storybook-meta` M15 + `proof:ba-gestalt` page-band fresh-capture; PRUNE the superfluous language (D7) into this wave's call-site rewrite.
3. **MODIFY:** `BD.W-PAGE-OFFTOKEN-SWEEP` absorbs the viz-basis `text-zinc-900` + destructive-over-loud proportion (D8) as named call sites, no new gate.
4. **FOLD:** D9 stale `Button.vue:66` comment into `BD.W-BUTTON-GLASS-IOS-NOTE` hygiene clause (cosmetic, byte-fenced).
5. **NO src wave** — Button is the library's gold-standard primitive (full iOS-27 spring contract, 6/6 glass composite, Safari-clean, zero-legacy); deep-glass deepening rides the already-booked `BD.W-DEEP-GLASS-20PX`/`BD.W-GLASS-LENS-CHROMA`.
6. **Convergence: NOT close — STAGE wave + ≥2 loops.** ~85% of the user's structural asks unmet (component perfect, page is a spec-sheet); design the STAGE chassis/gate REUSABLE — it's the template for the sibling display pages.
