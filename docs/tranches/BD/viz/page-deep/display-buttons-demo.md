# Pass-E — display/buttons META-STORYBOOK DEMO audit

- **Route**: `/display/buttons` · **SFC**: `demo/stories/display/buttons.vue` (196 lines) · **Import label**: `@mkbabb/glass-ui/button`
- **Live**: http://localhost:5173/display/buttons (verified — full-page screenshots `_cap-display-buttons-full.png` / `-wide.png` + DOM census)
- **Manifest row**: `s("display", "buttons", "Buttons")` (manifest.ts:752) — bare, no options → inherits `CATEGORY_DEFAULT_BG.display = "paper"` (manifest.ts:185), `variant="page"`, default `heroScale`. Subpath chip `@mkbabb/glass-ui/button` (manifest.ts:245).
- **Verdict**: ONE saturated hero (the CTA Aurora) then a flat single-card spec-sheet. The demo's own comments repeatedly claim the glass rows are "staged over the live field," but the live DOM proves they are NOT — they float over flat cream paper. The structure, the field-staging, and the screen-space asks are all unmet below the fold.

---

## Live DOM census (in-article, excludes global shell dock)

```
buttons: 32   sections: 9   in-page docks: 0   tabs: 0   procAnim(canvas): 1
cards: 4  →  1 outer story-hero-card (resting, α .664, blur 10px sat 1.4)
              + 1 CTA aurora wrapper (.rounded-card, transparent)
              + 2 tier="field" ShowcaseFrames (border-transparent bg-transparent)
article width: 1152px    page height: 806px  (fits one viewport — does NOT fill screen)
page bg: .paper-underpaint fixed inset-0 bg-background  (flat cream)
aurora canvases inside the field frames: [false, false]   ← the central defect
```

All 9 sections live INSIDE the single outer `story-hero-card`, separated by `--configurator-divider` hairlines (`delimited: true` — the auto `.story-sections--delimited` seam). The ONLY colorful field on the page is the single CTA Aurora canvas (1067×534) in the hero `<section>` (buttons.vue:75-86).

---

## (1) DEMO CONGRUENCE — component at its BEST + full API?

**PARTIAL — the CTA hero is strong; the rest is a flat catalogue.**

- **The CTA hero is the one good beat** (buttons.vue:75-86): `primary-audacious` + `gold-audacious` at `size="lg"` over a live `PRESETS.OPENAI_SKY` Aurora. The lit glass actually reads here. This is the model the rest of the page fails to follow.
- **API breadth is catalogue-thin.** The page enumerates variants (opaqueVariants ×8, glassVariants ×2), sizes ×4, viz-bg ×3, cartoon ×4 — but as STATIC rows. The rich W-BUTTON-GLASS material the North Star demands (the `useSpringPress` interruptible squish, the `--glass-btn-press-t` coupled specular/brightness leg, the `:liquid` `.glass-lens` refraction edge, the gleam tracking the pointer) is NEVER demonstrated as an affordance — no `:liquid` prop is bound anywhere on the page, so the headline refraction axis is invisible.
- **The four-state row is FAKED** (buttons.vue:155-160): "Hover (sim.)" hand-pins `bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]` and "Active (sim.)" hand-pins `scale-[0.97]`. These are dead static fakes of states the live button already produces on real interaction. Demoing a hard-coded `scale-[0.97]` instead of letting the user press a real button and feel the spring squish is the exact anti-pattern (show the real four-state contract, not a frozen mock). The blurb even apologizes for it ("shown simulated for reference," buttons.vue:153).
- **No contextual switching / dock API.** Zero in-page dock, zero tabs, zero `<SegmentedTabs>` to switch between variant families or to morph the preview. The user's binding ask — "leverage the dock APIs (contextual switching/animating)" — is wholly absent. A strong buttons page would seat the variant families behind a `<DockLayerGroup>` or a `<SegmentedTabs>` and animate between them.

## (2) COMPONENT ABILITY — deftly composes a SERIES of glass-ui components?

**FAIL — thin.** In-article glass-ui surface = `{Button (many), Aurora ×1, ShowcaseFrame ×2}` + the demo chassis (StoryPage/StorySection). No Card-per-section, no Dock, no Tabs, no procedural-anim beyond the single CTA aurora, no metric/badge/chip companions. It is a button catalogue, not a composed scene. The North Star "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" is met only by `{buttons, one aurora}`.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL below the hero — and the demo's comments are FALSE.** This is the headline defect.

- The two glass-demo rows (`Glass register`, buttons.vue:92-108; `Raw .glass-btn`, buttons.vue:113-127) use `<ShowcaseFrame tier="field">`. The `field` tier correctly drops the opaque plate (`border-transparent bg-transparent`, DOM-confirmed) — but there is **NO live field behind it**. The frames sit over the OUTER story card's translucent paper, which sits over the flat `paper-underpaint bg-background` cream page. DOM probe: `auroraInFields: [false, false]`. So the `glass` / `glass-wash` buttons refract flat cream — a pale lozenge on cream, the EXACT failure mode the section blurb claims to fix ("lit glass over the busy backdrop, not a pale lozenge on a flat plate," buttons.vue:94).
- The SFC header comment (buttons.vue:2-15) and section blurbs assert the glass rows are "staged over a LIVE field" / "staged over the field so the icon button's real backdrop blur reads." **The live page contradicts this** — `tier="field"` removes the plate but supplies no field; only the hand-rolled CTA `<div>` (buttons.vue:75-86) actually mounts an Aurora. The two `ShowcaseFrame tier="field"` rows are field-LESS.
- **Root cause + fix**: the page needs its colorful field to extend BEHIND the glass-variant rows, not just behind the CTA. Either (a) wrap the glass-register + glass-btn rows in the same Aurora-backed stage as the CTA (one shared GL context — `<DockStage>`-style backdrop), or (b) move the manifest to an aurora hero so the whole page field is live (the budget fence is ONE GL context per route — currently the page already spends exactly one on the CTA, so reusing it as a page-wide backdrop costs nothing extra).
- PAPER morphism: the page IS over the paper register (apt for the opaque atoms), but at ~11% grid/paper α it reads as flat cream — not a deliberate paper specimen.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**FAIL on both — the two structure asks the user made verbatim.**

- **One card, not per-section.** All 9 sections live inside the single `story-hero-card` separated by hairline dividers (`delimited: true`). The user's explicit ask — "each sub-section in its OWN glassy card" — is the opposite of the shipped divider-stack idiom. The hero CTA `<section>` (buttons.vue:59-87) is even OUTSIDE any card wrapper, an inconsistent third structure (bare section → outer card → field frames).
- **Main card area not BIG / does not fill the screen.** `pageH = 806px` at a 1100px viewport — the page is SHORTER than one screen, with a large empty band below the last row. Every demo row is a small left-aligned cluster (`flex-wrap gap-3`) inside a 1152px card, leaving the right ~60% of every row as dead space (visible in `_cap-display-buttons-wide.png`). The user asks the "main card area BIGGER (more screen space)" — the content neither fills the card width nor the viewport height; it reads cramped-in-a-corner.

## (5) PATH-LABEL standardization

**PASS.** The chip renders `@mkbabb/glass-ui/button` (manifest.ts:245, screenshot-confirmed). No in-body dev-path label leaks. The SFC imports via deep relative `../../../src/components/ui/button` (buttons.vue:20) which is the demo-internal norm — the user-facing chip is correct and standardized.

## (6) LANGUAGE — superfluous prose to tighten

- **The header comment block (buttons.vue:2-15) is a 14-line design-rationale essay** narrating BG-2 / CTA-inversion / W55 history — internal tranche jargon, and now actively MISLEADING (it claims the field staging works; it does not). Trim to a 2-line what-it-shows note.
- **buttons.vue:62-67 CTA blurb** leaks token internals into user copy: "the `--glass-specular` edge catch-light and a restrained `--scale-hover-btn` lift on the library's spring register." Tighten to plain language ("a calm liquid-glass CTA with a spring-driven hover lift").
- **buttons.vue:94 / 115 blurbs** assert "lit glass over the busy backdrop, not a pale lozenge on a flat plate" — a claim the page does not honor. Either fix the staging or stop claiming it.
- **buttons.vue:153** "Hover and active emerge from pointer interaction — shown simulated for reference" — apologetic filler that flags the row is fake; replace the fake row with a real interactive button.
- **buttons.vue:68-74 / 110-112 / 129-132** inline comments repeat the BG-2 thesis three more times — superfluous internal narration in a demo SFC.

## (7) BUGS / dead demo

- **B1 (central) — `tier="field"` rows have no field.** buttons.vue:92-127: both glass-demo ShowcaseFrames are field-less (`auroraInFields:[false,false]`). The glass variants refract flat cream — the morphism the section exists to show does not read. Functional dead-demo against its stated purpose.
- **B2 — faked four-state row.** buttons.vue:155-160: "Hover (sim.)"/"Active (sim.)" are static hand-pinned classes, not live states. Dead/misleading demo of the four-state contract.
- **B3 — inconsistent section structure.** The CTA hero (buttons.vue:59-87) is a bare `<section>` with a hand-rolled `<p class="section-label">`/`<h2 class="text-title">` cluster OUTSIDE the StorySection chassis the rest of the page uses — three different section idioms on one page (bare section, StorySection-in-card, field-frame). No crash, but a structural inconsistency.
- No console errors observed; the CTA Aurora canvas mounts and animates (1067×534, live).

---

## Recommendation (gestalt, North-Star aligned)

Re-stage the whole page over ONE page-wide live Aurora (reuse the single GL budget): promote the manifest row to an aurora hero OR wrap the glass-register + glass-btn rows in a shared Aurora-backed `<DockStage>`-style stage so the glass actually refracts a colorful field. Give each sub-section its OWN glassy card (drop the single-card divider-stack). Replace the faked four-state row with a real interactive `<Button :liquid>` exercising the press-squish + lens refraction. Add a `<SegmentedTabs>` or `<DockLayerGroup>` to switch between variant families (the contextual-switching ask). Widen rows to fill the card; let the page grow past one viewport. Trim the 14-line header essay and the token-jargon blurbs.
