# dock/morph-showcase — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/dock/morph-showcase.vue` · live `http://localhost:5173/dock/morph-showcase`
**Lens:** world-class frontend designer, frontend-design skill (distinctive, production-grade, anti-generic-AI) APPLIED to glass-ui's own iOS-26/27 Liquid-Glass + paper language.
**North star:** DESIGN.md §L1–§L5 · design-idioms / motion-canon / affordance-map · the dock APIs.
**Captured:** light + dark, vertical (rest) + horizontal (post-morph), VT-crossfade default + liquid-teardrop preview.

---

## TL;DR

This page works mechanically — the morph fires, the dock is real glass over a real aurora, the import-path chip is present, the hero ladder is audacious. But as a *designed surface* it is a **single beige spec-sheet card with a tiny gray dock floating in a sea of body copy**. It violates the user's four explicit asks (one glassy card per sub-section · bigger stage · COLORFUL aurora · leverage the dock APIs) and three DESIGN.md precepts (the §L1 six-layer composite reads as a flat tinted slab, not lensed glass; the §L4 strong-tier "every primitive is alive" is absent — nothing has an entrance, the dock controls are inert gray; the §L3 tap-squish never demonstrated). The money-shot is buried below two paragraphs of perf-fork prose. The page **explains** the morph; it does not **stage** it.

---

## 1. Visual hierarchy — the eye lands WRONG

**The hero is right; everything below it collapses.** The `Vertical ↔ Horizontal Morph` masthead is exactly the audacious √φ register DESIGN.md §Typography promises (`--type-display-3`+, Plus-Jakarta-near, the `↔` glyph as a typographic event — genuinely distinctive). That is the one premium moment on the page.

Then the eye falls off a cliff. Below the hero sits **one enormous peach card** (`min-h-[22rem]`, ~1006×352) that contains, stacked top-to-bottom: a `text-subheading` heading → **two full paragraphs of perf-fork prose** → a control row → and only THEN, at the very bottom, the actual morphing dock. The protagonist of the page — the liquid-glass dock teardrop — is the **last and smallest thing** in its own showcase. By the time the eye reaches it, it has read 9 lines of "it clears the 60fps frame budget under a 4× CPU throttle." This is the **inverse of staging** (Disney #3, DESIGN.md §L4 weak-tier — staging is the consumer's job, and this consumer fails it): the focal element should be lit and isolated; here it is the footnote.

**The in-card heading is under-powered.** `Vertical ↔ horizontal liquid-glass morph` renders at `--type-subheading` (20.4px / 600) — a *card-title* rung (DESIGN.md §Typography: "Card titles, labels"). On a page whose entire premise is typographic audacity, the section that contains the live demo gets the quietest heading rung available. The hero already says "Vertical ↔ Horizontal Morph"; the card then repeats it nearly verbatim at a whisper. **Redundant AND weak.**

**No focal contrast inside the stage.** Once you find the dock, nothing draws the eye TO it — no spotlight, no scale, no vignette, no caption pointing at it. The §L1 "monotone Z-stack" (Aurora → Dock) is present in markup but not in *composition*: the dock does not read as elevated above the field, because the field is a flat peach wash with no depth cue behind the glass.

## 2. The four user asks — graded

| Ask | Verdict | Evidence |
|---|---|---|
| **Each sub-section in its OWN glassy card** | ✗ FAIL | There is exactly ONE card (the peach stage), and it is NOT glassy — it is an opaque peach `bg`. The intro prose, the controls, the readout, and the dock are ALL crammed inside it. There are no sub-section cards. |
| **Main card area BIGGER (more screen space)** | ✗ FAIL | The stage is `min-h-[22rem]` and ~half-buried under prose; the dock occupies maybe 12% of the card. The hero + two paragraphs above the fold eat the screen; the demo is below-fold on a laptop. |
| **Glass over COLORFUL aurora** | ✗ FAIL | The aurora is monochrome warm-peach in BOTH modes (light: cream→peach; dark: brown→sepia). PROCEDURAL-SUITE + the `--section-color-0..12` 13-stop ramp exist and are unused. This is the *calmest possible* aurora — a single warm hue. "Colorful" means the teal/violet/amber multi-nuclei field the aurora atom can paint. |
| **Leverage the dock APIs (contextual switching / animating)** | ✗ PARTIAL | The V↔H morph IS a real dock-API showcase (good). But `DockLayerGroup`/`DockLayer` contextual switching, `DockSection` tripartite chassis, `DockStack` facet rail, `useContextualDockLayers`, the collapse/expand morph, the rail — NONE are shown. The dock is 5 inert `DockIconButton`s. The page demos ONE API and narrates it; it doesn't *use a series of components deftly*. |

**Two asks land:** the import-path chip `@mkbabb/glass-ui/dock` is present and correctly standardized; the morph itself is bidirectional and real. The other six are open.

## 3. Affordance — weak cues, inert controls

- **The dock controls give NO interactive cue.** Each `DockIconButton` carries `class="text-muted-foreground"` — they render as low-contrast gray glyphs on the glass, reading as *disabled decoration*, not pressable controls. DESIGN.md §L3: "Every interactive primitive squishes on press." These never invite a press because they don't read as live. The dock-nav `--dock-fg-on-aurora` register (CLAUDE.md dock-rail §) exists precisely to lift glyphs to AA over a field — unused here.
- **The `Switch` + `Label` pair is fine but orphaned** — "Liquid teardrop (preview)" sits in a flat inline row with the morph button and a mono readout, all jammed on one line that visually collides with the floating shell dock at the bottom edge (see capture: the bottom dock-nav overlaps the control row).
- **The `--dock-morph-t` `<code>` chip** is a nice touch (mono token-in-prose), but it's the only affordance signal that the page is *about* a live scalar — and it's buried mid-paragraph.
- **The button is the one correct affordance:** `<Button>` with the `ArrowLeftRight` icon + "Morph to {{facing}}" dynamic label is clear, glassy, and labels its own next-state. Keep it — but it should be the FOCAL control, not one of three competing inline items.

## 4. Animation affordance — the page is STATIC at the iOS-27 bar

This is the most damning gap for a *liquid-glass motion showcase*.

- **Zero entrance choreography.** Nothing arrives. CLAUDE.md ships `.scroll-build` (page-build), `.scroll-cascade` (section-cascade), the `StoryHeader` 3-stage GRAVITY rise (eyebrow→title→blurb) — this page consumes NONE of them. The hero and card just *exist*. DESIGN.md §L4 strong-tier "Timing/Slow-in-slow-out" is unhonored at the page level.
- **The dock controls have no hover, no press, no entrance.** They are the deadest elements on a page whose thesis is "HIGH animation affordance for EVERY component." The §L1 specular catch-light auto-arm (`vSpecular`, W-LIQUIDHOVER) means a bare `<DockIconButton>` *should* gleam pointer-following — but as gray muted glyphs over a flat field, that gleam reads against nothing.
- **The morph itself is the ONE animation, and it's gated behind the calm default.** The shipped path is a VT crossfade — correct for perf, but it reads as a dissolve, not a *morph*. The amorphous teardrop (the thing the user actually asked for, the §L4 "Appeal" / blob-morph register) is hidden behind a Switch labeled "(preview)." The most distinctive motion on the page is opt-in and apologized for in two paragraphs.
- **The aurora "breathing" is sub-perceptual.** Even with the live field, the backdrop barely moves — so the glass has nothing kinetic to lens, defeating §L1's "real-time refractive surface" premise.

**Net:** a motion showcase where the only thing that moves is one button-triggered dissolve. At the iOS-27 bar this is a failing grade — iOS-27 surfaces breathe, gleam, squish, and arrive *constantly*.

## 5. Polish + distinctiveness — generic-template tell

The hero is bespoke; the body is **generic-AI-template**: a big rounded card, a heading, two gray paragraphs, a button row, a demo box. Swap the copy and this is every component-library demo page. The peach monochrome reads as "I picked one accent color and tinted everything" — the exact generic-AI move the frontend-design skill warns against. glass-ui's *distinctive* assets (the 13-stop section rainbow, the procedural viz suite, the paper-grain, the metal-shimmer, the IconChip pops, the audacious mega/hero tiers) are entirely absent from the body. The page does not *look like glass-ui*; it looks like a Tailwind starter that imported one card.

**The opaque peach stage is an active §L1 violation.** DESIGN.md §L1 "glass cannot sample glass" + the BA.W-STAGE `tier="field"` fix exist precisely so a glass demo floats over the LIVE field, not over an opaque plate. Here the stage card is an opaque peach `bg` — the dock's glass is reading against a *flat tint*, not against the aurora. The aurora canvas is behind the WHOLE stage, but the inner content sits on an opaque band, so the six-layer composite has nothing real to refract. The glass reads as iOS-7-flat (the exact §L1 anti-pattern), because backdrop-blur over a flat color is a no-op.

## 6. iOS-27 / paper / glass north-star fidelity

- **§L1 six-layer composite:** dock has blur(9px) + tint + 1.5px rim — but over a flat field, layers 1/2 (blur+saturate) and 6 (grain) do nothing perceptible. Reads as 3 of 6 layers. **Partial.**
- **§L2 spring physics:** the morph rides `--dock-morph-t` / `DOCK_SPRING` — correct. But the VT-crossfade default is a *bezier dissolve*, not a spring; the spring only drives the gated preview. **Partial.**
- **§L3 tap choreography:** not demonstrated anywhere. The dock controls don't squish on the live page (muted, inert). **Absent.**
- **§L4 motion tiers:** strong-tier "every primitive ships motion" — unhonored (static dock, no entrances). **Fail.**
- **§L5 a11y brackets:** the substrate honors PRM/reduced-transparency by construction (inherited from the dock/aurora primitives) — the one precept that passes for free. **Pass.**
- **PAPER morphism:** entirely absent. The user asked GLASS + PAPER both. There is no paper-grain, no blueprint grid, no ink-rail, no math-paper register anywhere — the page is all (failed) glass, no paper.

## 7. Spacing / rhythm / color

- **Golden-ratio rhythm:** the hero→blurb gap is good; inside the stage card the rhythm is flat — uniform paragraph spacing, no φ-stepped cadence, no breathing room around the focal dock. The W-CARD-PAD sqrt-φ block ladder exists and isn't expressed.
- **Color suffusion proportion (one-color-event rule, AZ.W-SUFFUSE):** the page has ZERO deliberate color event — the dock band's §-color identity (`--section-color`) is unused, the glyphs are gray, the only "color" is the accidental monochrome peach wash. It's not over-colored; it's *under*-evented. The dock band should carry its ONE section hue (a navigation/dock identity) on an eyebrow + an IconChip + the active-control accent — present nowhere.
- **The bottom shell-dock collides** with the in-card control row (capture shows overlap) — a spacing/z collision that reads as broken.

---

## TOP DESIGN MOVES (ranked — make this exceptional)

1. **Invert the layout: STAGE-FIRST, prose-as-caption.** Make the morph stage the hero of the body — `min-h-[34rem]+`, the dock centered and large, with the explanatory prose demoted to a slim `<ShowcaseFrame caption>` band BELOW or a collapsible `<HoverPopover>` "How it works." The §L4-staging fix: light the protagonist, dim the narration. (Satisfies "bigger card" + "eye lands right.")
2. **One glassy `<Card surface="glass" tier="floating">` per sub-section over a `tier="field"` stage.** Break the monolith into: a *Morph stage* card, a *Contextual-switching* card (`DockLayerGroup`), a *Collapse/expand* card, a *Rail/DockStack facet* card — each a real glass plate floating over the LIVE aurora (BA.W-STAGE `tier="field"`, never an opaque peach band). This satisfies "each sub-section in its own glassy card" AND "deftly uses a series of components." (§L1 glass-cannot-sample-glass: one composition container, monotone z-stack.)
3. **Make the aurora COLORFUL.** Drive the `<DockStage>`/`<Aurora>` with a multi-nuclei warm→cool brand palette (teal/violet/amber off `--section-color-*`), `breathing`→`drifting` register so the field actually MOVES. The glass then has a rich, kinetic, multi-hue backdrop to lens — the §L1 "concentrated light" reading finally lands. (Satisfies "COLORFUL aurora" + fixes the 3-of-6-layers gap.)
4. **Wake every dock control: entrance + hover + press.** Lift `DockIconButton` glyphs off `text-muted-foreground` to the `--dock-fg-on-aurora` AA register; let the `vSpecular` auto-arm gleam read; add a `.scroll-cascade` staggered entrance to the cards and a `StoryHeader` GRAVITY rise to the hero. Demonstrate the §L3 tap-squish live. (Satisfies "HIGH animation affordance for EVERY component.")
5. **Demo the dock's CONTEXTUAL-SWITCHING APIs, not just the V↔H morph.** Add a `DockLayerGroup` with 3 `DockLayer`s and a switcher rail; show `useContextualDockLayers` route-facet switching; show the collapse↔expand chrome morph. The page should be a *tour of the dock system*, not a single-trick perf essay. (Satisfies "leverage the dock APIs / contextual switching/animating.")
6. **Promote the teardrop to default-visible, tighten the prose.** The amorphous metaball morph (§L4 "Appeal", the thing the user named) should be SHOWN, not gated behind a "(preview)" Switch and two paragraphs. Keep the perf note as one mono-caption line. Cut the two perf-fork paragraphs to two sentences. Add the dock band's ONE color event (eyebrow + IconChip in the dock section hue). (Satisfies "tighten superfluous language" + the suffusion proportion + restores distinctiveness.)
7. **Fix the bottom shell-dock collision** — reserve `--dock-content-safe-inset` scroll-padding on the stage so the in-card control row never overlaps the fixed nav dock.

---

## 5-LINE VERDICT

1. The audacious hero masthead is genuinely premium (§Typography √φ ladder, the `↔` as a typographic event) — and it is the ONLY bespoke moment; the body is a generic-AI single-card spec-sheet.
2. SIX of the user's asks are unmet: no per-section glassy cards (one opaque peach monolith), the stage is small + buried under perf prose, the aurora is monochrome (not COLORFUL), and only ONE dock API is shown — the morph is *narrated*, not *staged*.
3. The §L1 six-layer composite reads as 3-of-6 — the opaque peach stage is an active "glass-cannot-sample-glass" violation: the dock's blur lenses a flat tint, not the live field (BA.W-STAGE `tier="field"` is the existing fix, unused).
4. Animation affordance fails the iOS-27 bar: zero entrances, inert muted-gray dock controls, no live tap-squish, and the amorphous teardrop (the §L4 "Appeal" the user asked for) is hidden behind a "(preview)" toggle.
5. Top moves: invert to STAGE-FIRST with one glass `<Card>` per sub-section over a COLORFUL kinetic aurora, wake every control (entrance/hover/squish), tour the contextual-switching dock APIs, and cut the perf-fork prose to two sentences — turn the essay into a showcase.
