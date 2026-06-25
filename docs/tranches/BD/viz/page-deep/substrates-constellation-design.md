# substrates/constellation — FRONTEND-DESIGN deep critique (Pass-E)

Route: `demo/stories/substrates/constellation.vue` · live `http://localhost:5173/substrates/constellation`
Lens: the frontend-design skill (distinctive, production-grade, anti-generic-AI) APPLIED to glass-ui's own language.
North star: DESIGN.md (iOS-26/27 Liquid Glass six-layer composite · 7 tiers · glass-cannot-sample-glass · spring physics), `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`, `PROCEDURAL-SUITE.md`.

Captured at 1440×900, light mode, `prefers-reduced-motion: false`.

---

## 0. TWO BLOCKING DEFECTS — the page does not function as designed

Before any taste critique: **this page is broken in two ways that dominate every other consideration.** A world-class designer does not get to "hierarchy and rhythm" until the thing paints.

### 0.1 EVERY constellation canvas is DEAD — zero pixels, zero nodes (BLOCKER)
Live readback (`__constellationWarp.field`, plus a full `getImageData` alpha scan of all 10 canvases):
- All 10 `<canvas class="constellation-canvas">` on the route have backing store **`300×150`** (the unset HTML default) and paint **0 non-transparent pixels** — `maxAlpha = 0` across 45,000 sampled pixels per canvas.
- The exposed field reads `w:0, h:0, nodes:0, k:1` even after the host is scrolled to viewport center and given **1.2s** to settle.
- The substrate's `ResizeObserver` never fired a non-zero measure, so `createCanvasLifecycle` never sized the backing store and never seeded nodes. The cards are **empty cream rectangles**. The hero background canvas (CSS box `1152×5795`) has the same `300×150` dead backing store.

This is the cardinal lesson made flesh ([feedback_live_pi_oklab_paint_arm], [feedback_live_verify_capture]): a headless-green gate certifies the field MATH; the live route paints NOTHING. The "drifting nodes joined by distance-falloff hairlines," the `--primary` pulse ring, the click-warp spring, the gravity-well, the supernova, the accent-edge pinned anomaly — **none of it is visible.** Eight glassy demo cards each frame a blank cream void. The page's entire reason to exist (showing the Constellation procedural viz) is absent in this browser session. Root-cause it (a 0×0 initial measure under the demo-main-scroller / StoryHero stacking, the substrate's deferred-arm racing a zero-extent flex box — note the SFC's own `resizeTo()` test-seam comment already fights a "flex parent stretches it so a plain inline width no longer shrinks the box" problem; the same zero-extent class is biting first paint) before ANY visual polish lands. Until then the critique below is aspirational.

### 0.2 The giant `<h1>` is a scroll-PINNED overlay that occludes the content (BLOCKER)
The `text-display`-scale "Constellation" hero `<h1>` (computed `font-size: 244.8px`) stays fixed at the top of the scroll viewport and **bleeds directly over the section content as you scroll** — captured sitting on top of the "click-to-warp focal node" blurb (totally illegible, letters crossing the prose) and again on top of the "opacityCeiling 1.0 / 0.4" labels. The hero is `position: static` in the DOM but the StoryHero mounts it as a route-background masthead that the body scrolls UNDER, with no z-order/scrim separation, so the audacious title collides with every section it passes. This is the inverse of the W-HIERARCHY2 GRAVITY-entrance intent — instead of "eyebrow → title → blurb arrives with gravity, then yields," the title never yields and crushes the reading column. **A typography-forward identity that makes its own hero unreadable is worse than a timid one.**

---

## 1. VISUAL HIERARCHY — the eye lands nowhere, then on the wrong thing

Even setting the blockers aside, the structural critique:

- **One flat scroll of EIGHT near-identical 420px cards.** The page is a vertical stack of eight `ShowcaseFrame pad="none"` rectangles, all the same height, all the same cream `bg-card` plate, all captioned with the same `bg-card/80 rounded-pill` micro-label bottom-left. There is **zero hierarchy among the demos** — the flagship hero lattice, the click-warp, the gravity-well, the supernova are presented as equals in a monotone list. The eye has no focal anchor, no "this is THE demo," no progressive disclosure. This is the generic-AI "render every variant as a row" anti-pattern the frontend-design skill explicitly warns against, and it directly contradicts the user's brief ("the main card area BIGGER — more screen space").
- **The √φ audacious ladder is used ONCE (the hero) and then abandoned.** Below the masthead it's all `text-sm` blurbs and mono eyebrow labels. The `text-display-mega`/`-audacious` tiers, the per-section heading rung (`text-subheading`, W-HIERARCHY2's `<StorySection heading>`), the editorial-specimen treatment that `typography.vue` got under W-DEMO-DESIGN — none of it reaches here. Section labels are flat mono `proximity-graph lattice` eyebrows with no `text-subheading` `<h2>` weight. The page is NOT typography-forward; it's typography-forward-for-one-word-then-a-spec-sheet.
- **Blurbs are walls of grey 14px prose.** Each `StorySection` leads with a 3-5 line `text-muted-foreground` paragraph dense with API nouns (`pointerReactive`, `warpOnClick`, `opacityCeiling`, `field.warp.{x,y}`, `?freeze`, `drawOverlay`). This is reference-doc copy, not demo choreography. The user's brief — "tighten superfluous language" — is exactly right: these read like the wave-spec changelog leaked into the UI.

## 2. AFFORDANCE — interaction is hidden in prose, not in the surface

- The genuinely delightful interactions (click-to-warp, **hold** for gravity-well, **double-tap** to detonate a supernova) are signalled ONLY by a tiny `bg-card/80` pill caption and a buried sentence in the blurb. There is no glass button, no pulsing hint, no cursor-coupled affordance beyond a bare `cursor-pointer`/`cursor-grab`. Per `affordance-map.md`, an interactive surface must telegraph its gesture; here a first-time viewer has no idea the field is double-tappable.
- The ONE real control on the page — the `interactive` toggle — is a bare `<Switch>` + `text-sm` label floating naked above the hero card, not seated in any chassis. It should be a `<Configurator>`/`<ConfiguratorRow>` (the library's OWN controls register) or at minimum a dock control, per the user's brief ("leverage the dock APIs"). A raw switch on cream is the least glass-ui-idiomatic affordance possible.
- The `settled`/`warping…` badge (pinned-anomaly card) is the one good state-readout affordance — but it's a `font-mono text-xs` pill that's easy to miss, and with the canvas dead it reads "settled" over a void.

## 3. ANIMATION AFFORDANCE — the cards themselves are STATIC (iOS-27 bar: failed)

The canvases are *supposed* to be alive (drift, spring, pulse), but the **chrome around them is completely inert**, which is precisely where the iOS-27 bar is set:
- **No entrance.** The eight cards do not build in. There is no `.scroll-cascade`/`.scroll-build` (W-SCROLL-MOTION) section-by-section gravity entrance — they're just THERE. The platform ships the exact primitive for this and the page doesn't consume it.
- **No hover life on the cards.** A `ShowcaseFrame` here has no hover lift, no specular gleam, no `--glass-accent` rim warm-up (W-GLASS-ACCENT), no press. Per `motion-canon.md` P1-P6 and W-LIQUIDHOVER's tier-root auto-arm, a premium glass surface gleams under the pointer. These are flat opaque plates with a 1px border.
- **No state transitions.** Toggling `interactive` produces no animated feedback on the card; the warp spring's `settled` flip is the page's only state animation and it's a text swap, not a visual morph.
The result: a page literally ABOUT motion that is, in its UI shell, one of the most static in the suite.

## 4. POLISH + DISTINCTIVENESS — generic, not bespoke

- **Opaque cream plates kill the entire glass thesis.** Every card is `bg-card` (opaque). DESIGN.md's six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) appears NOWHERE — there is no glass, no backdrop, no aurora behind anything. The user's brief is explicit: *"glass demos over COLORFUL aurora backgrounds."* This page is constellation-over-flat-cream — the BG-2 black-plate defect class W-STAGE/`tier="field"` and `<DockStage>` were built to kill, un-fixed here. A glassiness suite demoing its viz on an opaque slab is self-defeating.
- **The captions, the borders, the pill labels — all default chassis, no craft.** Nothing on this page reads as designed; it reads as scaffolded. Compare the intended `typography.vue` editorial-specimen bar.
- One distinctive asset survives: the `@mkbabb/glass-ui/constellation` mono import-path chip under the eyebrow — that IS the standardized label the user asked to keep. Good. (Standardize it across the suite per the brief.)

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

Near-zero. No glass tier is composited (all opaque `bg-card`). No paper register (no `paper-grain-overlay`, no blueprint grid, no `border-l-[3px]` section rail — the `math-paper.vue` gold standard is absent). No aurora/colorful backdrop. No `--glass-accent` chromatic rim. No spring-physics chrome motion. The ONLY north-star-aligned surface is the constellation overlay's own `--primary`/`--constellation-accent` pulse ring — and that's dead.

## 6. SPACING / RHYTHM — uniform, not golden

Eight `420px` cards (two `300px` in the recession grid) stacked with uniform `gap`s. No √φ progression, no W-CARD-PAD sqrt-φ block-over-inline ladder visible (cards are `pad="none"` so the golden padding ladder is bypassed entirely). The rhythm is a metronome, not a cadence. The recession pair (`grid-cols-2`) is the only spatial variation and it's a plain even split.

## 7. COLOR / SUFFUSION PROPORTION

Honest but barren. The page obeys the one-color-event rule by *having almost no color* — the `--constellation-accent` warm-red pulse is the single event, the body stays ink. But "no color" is not the same as "deliberate suffusion." Per W-SUFFUSE, the substrates band's masthead should lift to the `--motion-accent` violet display register as its ONE page-local color event; here the hero is flat ink and the cards are colorless cream. The brief's "glass over colorful aurora" is the missing color strategy: a warm/violet aurora backdrop would BE the suffusion, with the constellation reading as cool structure over it.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **FIX THE PAINT (blocker).** Root-cause the 0×0 substrate measure so the lattice actually renders; fix the StoryHero `<h1>` overlap (scrim/z-order/scroll-away). Nothing below matters until the field paints and the title yields.
2. **One BIG hero stage over a colorful aurora.** Promote the flagship lattice to a near-viewport-height `<DockStage>`-style stage: constellation rendered as cool glass structure OVER a live warm/violet `<Aurora>` backdrop (one GL + one Canvas2D context, the one-per-route budget — DockStage already does exactly this). This single move satisfies "main card BIGGER," "glass over colorful aurora," and restores the six-layer composite (DESIGN.md).
3. **Each sub-demo in its OWN GLASS card (`tier="field"` / `glass-floating`), not opaque cream.** Re-skin the eight `ShowcaseFrame`s as real glass plates floating over the aurora so the backdrop modulates through (W-STAGE BG-2 fix); give each a hover specular + `--glass-accent` rim warm-up (W-GLASS-ACCENT, W-LIQUIDHOVER) and a `.scroll-cascade` gravity entrance (W-SCROLL-MOTION). Every card becomes ALIVE.
4. **Drive section navigation with the DOCK APIs (the brief, verbatim).** Replace the flat eight-card scroll with a `<DockLayerGroup>`/`<DockSection>` contextual switcher: each constellation behaviour (warp · well · supernova · recession · pinned · freeze) is a dock facet; selecting it morphs the BIG stage to that demo (`useContextualDockLayers` + the V↔H morph). This is the "deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" the brief asks for — and it turns a spec-sheet into an instrument.
5. **Re-home the `interactive` switch + per-demo knobs into a `<Configurator>`** seated beside the stage (the library's own controls chassis, W-HIERARCHY vocabulary), with `<SegmentedTabs>` for the demo-mode axis and glass `<Button>`s for the gestures (warp/detonate as explicit affordances, not buried prose).
6. **Make it typography-forward THROUGHOUT.** Give each `StorySection` a `text-subheading` `<h2>` heading rung; lift the substrates masthead to the `--motion-accent` violet display event (W-SUFFUSE); and TIGHTEN every blurb to one editorial sentence — move the API nouns into the Configurator labels and `code` chips, out of the prose wall. Standardize the `@mkbabb/glass-ui/constellation` import chip on every story.

---

## VERDICT (5 lines)
1. BLOCKING: every constellation canvas paints zero pixels (field `w:0,h:0,nodes:0` — dead substrate on a 0×0 initial measure), and the 244px `<h1>` is a scroll-pinned masthead that bleeds over and crushes the section content — the page is non-functional before any taste question.
2. Structurally it's a generic-AI spec-sheet: eight identical 420px OPAQUE cream cards in a monotone scroll, the audacious √φ ladder used once then abandoned, blurbs that are leaked wave-changelog prose — the antithesis of typography-forward.
3. Zero north-star fidelity: no six-layer glass composite, no aurora/colorful backdrop, no paper register, no `--glass-accent` rim, no `.scroll-cascade` entrance — the chrome around a motion viz is itself dead, failing the iOS-27 alive-affordance bar.
4. The fix is architectural, not cosmetic: ONE big constellation-glass-over-live-aurora stage, sub-demos as real glass cards switched by the DOCK contextual-morph APIs, controls re-homed into a `<Configurator>`/`<SegmentedTabs>`, blurbs tightened to one sentence each.
5. Lone bright spot: the standardized `@mkbabb/glass-ui/constellation` mono import chip and the `settled`/`warping…` state badge are correct idioms to keep and propagate suite-wide.
