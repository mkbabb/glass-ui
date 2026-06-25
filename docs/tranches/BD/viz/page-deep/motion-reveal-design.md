# motion/reveal — FRONTEND-DESIGN deep critique (Pass-E)

Page: `demo/stories/motion/reveal.vue` · live `http://localhost:5173/motion/reveal`
Subpath label: `@mkbabb/glass-ui/motion-core` (correct, already standardized)
Background register (manifest): `constellation` · variant `page` (chrome `<h1>` hero)
Lens: iOS-26/27 Liquid Glass north star (DESIGN.md §L1–§L5) + the audacious √φ ladder + GLASS+PAPER + HIGH animation affordance per component.

---

## TL;DR

The page is *architecturally honest but visually inert.* It correctly composes the two shipped reveal primitives (`vReveal` directive + `useLiquidReveal` leaf), but it presents them as two stacked sections inside ONE big glass card over a near-DEAD constellation field, with the rows reading as **gray slabs** in light mode (a §L1 tint-floor + §Warm-chroma-floor failure on this surface) and the flagship `primary-audacious` CTA rendering **identical to a default Button**. It demonstrates the API; it does not *sell* the iOS-27 move. This is a `complete_with_misses`-grade demo surface: the bloom works, the gestalt does not read premium.

The page is also a content-demonstration mismatch with its own North Star: a page about *reveal* — entrances, blooms, materialization — is the single best place in the entire storybook to be MAXIMALLY alive, and it is currently the calmest. Every defect below traces to that irony.

---

## 1. VISUAL HIERARCHY — does the eye land right?

**The page-level hierarchy is correct; the in-card hierarchy is flat.**

- ✅ The chrome `<h1>` "v-reveal" lands at the audacious display rung (the √φ ladder, `text-display-4`) — the eye lands on the wordmark first. Good. The Fira-Code subpath chip below is the right secondary register.
- ⚠️ **The two `StorySection heading`s ("v-reveal · staggered entrance" / "useLiquidReveal · bloom from source") sit at `text-subheading` (20.4px / 600) inside ONE shared card.** With a 40px section gap and a single hairline delimiter between them, the two demos read as one undifferentiated scroll. The user's explicit ask — *"each sub-section in its OWN glassy card"* — is unmet: I measured both sections nested in a single 1088px `glass` card (`section.story-sections > 2× StorySection`). The §L1 *"reach for the lowest tier"* rule is being honored at the wrong granularity — the whole page is one `resting`/`quiet` plate; the demos want to be two `floating` specimen cards floating over the field.
- ⚠️ **The six `Discover…Iterate` rows are the visual mass of the page, and they are the least interesting thing on it.** They're a list-of-labels with a violet dot. They out-weigh the actual subject (the bloom). The eye lands on a gray ladder, not on a reveal.
- ❌ **The `useLiquidReveal` flagship is buried at the BOTTOM, below the fold,** behind six rows of filler. The hero move of the page — the iOS-27 bloom-from-source — is the thing a visitor has to scroll past everything to find. Hierarchy inversion: the *secondary* directive (`vReveal`) leads; the *flagship* leaf (`useLiquidReveal`, the W-LIQUID-REVEAL headline) trails.

**Verdict:** typography ladder is used at the page chrome but NOT inside the card — the in-card register is monotone subheading + small + slabs. The audacious ladder never appears on the demo content where it should anchor each specimen.

## 2. AFFORDANCE — clear interactive cues?

- ⚠️ **The `Replay` button (`variant="default"`) and the `Bloom from here` button (`variant="primary-audacious"`) render visually IDENTICAL** — both are pale `btn-pill` ovals. I confirmed `primary-audacious` resolves `oklab(0.63… / 0.44)` with the plain `btn-pill tap-squish` class set — the calm-glass CTA register (BA.W-GLASS-CAL H2a) has flattened the audacious CTA into a near-invisible glass pill. On a near-white page with no live backdrop, the glass blur has nothing to refract, so the CTA has **zero affordance pop** (DESIGN.md §L1: *"the blur is imperceptible over a flat substrate"* — exactly the failure mode). The page's most important button does not look like the most important button.
- ⚠️ The six rows have **no interactive affordance at all** — they are static `glass-card` plates with a dot. A user cannot tell whether they're clickable (they aren't). On a page about motion, a non-interactive list is a missed affordance: they should at minimum HOVER-LIFT (affordance-map primitive #1) to telegraph "alive."
- ❌ **There is no affordance telling the user the rows are a one-shot entrance** that already played. The `Replay` button is the only signal, and it's spatially divorced from the rows it controls.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

This is the page's deepest irony: **a page ABOUT animation is mostly static after first paint.**

- ✅ The `vReveal` stagger plays on mount/replay (`reveal-rise` 0.5s `--spring-bouncy`, 80ms cascade) — correct, and it's the documented consumer-CSS pattern. Good.
- ✅ The `useLiquidReveal` bloom is real and compositor-only (scale + fade + `filter: blur(4px)→0` on the snappy spring, anchored at the trigger rect) — the §L2 *"if the finger touched a pixel, spring"* rule honored, the iOS-27 materialize-from-source move. This is the one genuinely premium moment.
- ❌ **The six rows have NO hover, NO press, NO state.** Per the affordance-map's HOVER-LIFT primitive (#1) and DESIGN.md §L3 (*"tap-squish is universal… custom chips squish"*), a glass row that a user can look at should answer the pointer. These are dead plates. The user's bar — *"HIGH animation affordance for EVERY component"* — is failed for 6 of the ~9 elements on the page.
- ❌ **The CTAs squish (`tap-squish`) but have no hover-lift or gleam-track** distinguishable on the flat backdrop. The `v-specular` gleam (affordance-map #2) needs a glass tier over a backdrop to read; over flat near-white it's invisible.
- ❌ **The constellation backdrop is alive but invisible** in light mode — I measured the canvas at full opacity but the field washes to ~near-white. The drift (§L4 medium-tier ambient motion) is technically running and perceptually absent. In dark mode it reads correctly (the dots + lines + violet markers pop), confirming the §Stage dark-wash recalibration works but the LIGHT register over constellation is under-tuned.

**Verdict:** ~2 of ~9 elements meet the iOS-27 "alive" bar. The rows are the worst offenders — static on the one page that should be a motion showcase.

## 4. POLISH + DISTINCTIVENESS — bespoke or generic-AI-template?

**Currently reads generic-AI-template in light mode; bespoke-adjacent in dark.**

- The light-mode render — gray pill rows on a near-white page, two identical pale buttons, a single flat card — is the *exact silhouette of a generic Tailwind/shadcn demo*. There's no glass refraction reading, no paper grain reading, no color event beyond a 4px violet dot. This is the "generic AI aesthetic" the frontend-design skill exists to avoid.
- The §L1 six-layer composite is NOT reading on the row plates: tint is gray (`oklab 0.725`, achromatic — the warm-chroma floor BA.W-NO-GRAY is not reaching this content-tier surface over this backdrop), the rim is a 4% whisper (invisible), grain is imperceptible at this scale, the catch-light doesn't read. A surface that omits the layers *"reads as iOS-7-flat, not iOS-26-liquid"* (DESIGN.md §L1, verbatim).
- Dark mode is meaningfully better — the constellation, the rim definition, the violet markers all read — proving the architecture is sound and the LIGHT tuning is the gap.

## 5. COLOR — suffusion proportion

- ✅ The one-color-event rule (W-SUFFUSE) is honored to a fault: the violet `--motion-accent` (the `--viz-legendre` twin) appears ONLY as the leading row dots. One event family, body ink stays neutral. *Technically* correct.
- ❌ **It's TOO restrained for a flagship motion page.** A 6px dot is a homeopathic dose of the motion-band identity. The page is monochrome-gray + one tiny violet pip. Per the suffusion register's own latitude (the motion-band masthead violet, the IconChip `:saturated` 40% focal pop), this page has earned a louder single color event — the title could carry the `--motion-accent` masthead treatment, or the bloom surface could read as a violet-accented glass (W-GLASS-ACCENT per-instance `--glass-accent` rim, which is *built for exactly this*).
- The constellation field is the intended color/atmosphere source and it's washed out in light mode — so the page's primary color vehicle is muted.

## 6. SPACING / RHYTHM — golden-ratio

- ✅ Section gap 40px, card padding on the √φ ladder (W-CARD-PAD `--card-pad-inline:--spacing(6)`), article bounded to `--story-page-max-inline`. The bones are golden.
- ⚠️ **The card is too NARROW for the content and the screen.** At 1088px in a 1440px viewport, with the rows spanning full card width as thin 56px bars, the main demo area feels cramped against the generous outer margins. The user's ask — *"the main card area BIGGER (more screen space)"* — is concrete: the specimen surface should command more of the canvas, especially for a bloom that wants room to materialize into.
- The six identical-height rows create a monotonous vertical rhythm — no √φ modulation, no focal row.

---

## TOP DESIGN MOVES — to make this page exceptional

Ordered by impact. Each cites the precept it serves.

### A. Split into TWO floating specimen cards over a LIVE colorful constellation (the user's #1 + #2 + #5 asks)
Retire the single shared `quiet` card. Give each `StorySection` its OWN `glass-floating` (or `glass-deep`, BB.W-DEEP-GLASS) specimen card, floating directly over the constellation field with NO opaque plate between (the `<ShowcaseFrame tier="field">` / BG-2 black-plate-kill precedent). Tune the LIGHT constellation register up so the field reads as colorful atmosphere, not near-white wash (§Stage light-wash recalibration — the dark arm already proves the target). This single move fixes hierarchy (two distinct demos), distinctiveness (real glass over a live field = the iOS-27 read), and the §L1 *"glass POPs over a rich backdrop"* rule. **Glass-cannot-sample-glass (§L1):** the two specimen cards must NOT overlap at the same z-tier — stack them with field gutters between, one composition container.

### B. Promote `useLiquidReveal` (the bloom) to the HERO position + give it ROOM
Lead with the flagship, not the filler. Move the bloom section ABOVE the `vReveal` ladder (or make it the focal upper-right specimen). Give the materialized surface a real destination size and a `--glass-accent` violet rim (W-GLASS-ACCENT) so the bloom reads as a *colored-glass* materialization, not a gray slab. This is the W-LIQUID-REVEAL headline — it should be the first thing the eye lands on.

### C. Make the six rows ALIVE — HOVER-LIFT + gleam, and cut them to a √φ-modulated set
Wire the affordance-map HOVER-LIFT (#1, `--scale-hover` on `--spring-smooth`) + `v-specular` gleam-track (#2) onto each row so they answer the pointer (DESIGN.md §L3 *"custom chips squish"*). Better: reduce 6→4 rows and let the active/focal row carry the audacious rung + the `:saturated` IconChip pop, so the ladder has a focal beat instead of monotone repetition. A motion page's list must itself be in motion.

### D. Differentiate the `primary-audacious` CTA so it reads as the hero action
Over the live field (move A), the calm-glass CTA will finally refract and the gleam will read. Additionally seat it on `glass-deep` (the opt-in maximal register) or give it the `--glass-accent` violet rim so "Bloom from here" is unmistakably the protagonist control. Right now it's `oklab(0.63/0.44)` — pixel-identical to `default`. The §L1+§L2 *driver-motion* control must look like one.

### E. Leverage the dock APIs (the user's explicit ask — currently UNUSED on this page)
The page imports zero dock surface. The motion band is the ideal place to demo the dock's contextual-switching: e.g. a `<DockStack mode="facets">` rail letting the visitor switch between *vReveal · staggered* / *useLiquidReveal · bloom* / *(future) drag-morph* contexts, each facet carrying its own `--glass-accent` hue (BE.W-DOCK-RAIL-REALIZE), the active facet morphing the specimen card via `useLiquidReveal` itself — *the page demonstrates the reveal by using the reveal to switch its own demos.* That is the architectural-transposition-for-elegance the North Star asks for: the page eats its own dogfood.

### F. Suffuse one LOUDER color event (motion-band violet)
Lift the masthead `<h1>` or the focal specimen card to carry the `--motion-accent` violet as the page's ONE deliberate color event (W-SUFFUSE motion-band masthead idiom) — replacing the homeopathic 6px dots with a proportionate, premium single event. Keep body ink neutral (the d1 floor).

### G. Tighten the superfluous language (the user's ask)
The blurbs are over-written for demo chrome. "The iOS-27 surface that materializes FROM its trigger — scale + fade + a backdrop blur(4px)→0 decongest on the snappy spring, anchored at the trigger's rect. PRM snaps to a fade only." → "Blooms from its trigger's rect — scale, fade, blur-settle on the snappy spring." The `text-small` register is right; the word count is 2× what a specimen caption needs.

---

## North-Star fidelity scorecard

| Precept | State |
|---|---|
| §L1 six-layer glass composite | ❌ light (gray tint, dead rim, no backdrop to refract) · ⚠️ dark (reads) |
| §L1 reach-lowest-tier / glass-over-rich-backdrop | ❌ one flat plate over a washed field |
| §L2 spring-iff-driver | ✅ bloom on snappy, vReveal on bouncy |
| §L3 tap-squish universal | ⚠️ buttons squish, rows inert |
| §L4 ambient drift (medium tier) | ⚠️ running but invisible (light) |
| §L5 a11y brackets (PRM) | ✅ both primitives PRM-carve (fade-only) |
| Audacious √φ ladder | ⚠️ page chrome only, absent in-card |
| Suffusion proportion | ⚠️ correct but homeopathic |
| Dock API leverage | ❌ unused |
| GLASS + PAPER morphism | ❌ neither reads on the demo surface |
| Subpath label standardized | ✅ `@mkbabb/glass-ui/motion-core` |
| Main card BIGGER / per-section cards | ❌ one narrow shared card |
