# motion/springs — FRONTEND-DESIGN critique (Pass-E, design lens)

Page: `demo/stories/motion/springs.vue` · live `http://localhost:5173/motion/springs`
Captures: `_shot-springs-light.png` · `_shot-springs-dark.png` · `_shot-springs-playground.png`
North star: DESIGN.md (§L1 six-layer composite · §L2 spring physics · the 7 tiers · glass-cannot-sample-glass) · motion-canon.md (P1–P6) · design-idioms.md · the dock APIs.

Verdict in one line: a page that *teaches springs honestly but performs them inertly* — the cardinal sin is a motion-demo whose own surfaces have almost no motion, wrapped in a duplicate-titled, single-card, opaque-slab scaffold that contradicts every precept it documents.

---

## 1. VISUAL HIERARCHY — the eye lands twice, then nowhere

- **The double-masthead (P0, the headline defect).** The chrome renders `StoryHeader`'s page `<h1>` "Spring Orchestrator" (display, ink), and *then the SFC hand-rolls its OWN `<header>`* with `section-label` "Motion · Spring Orchestrator" + a `text-display-3` violet "Springs" (lines 157–165). The eye lands on a giant ink title, scrolls 120px, and lands on a SECOND smaller violet title that says nearly the same thing. This is the exact W-HIERARCHY2 / D1-4 reading-order inversion the chassis was built to kill — the descriptor shown TWICE, the eyebrow duplicated verbatim (`MOTION · SPRING ORCHESTRATOR` appears in both the chrome and the SFC). The in-SFC masthead must be DELETED; the page title is `StoryHeader`'s job. The violet display event the SFC wanted belongs on the chrome `<h1>` via the manifest (the W-SUFFUSE3 motion-masthead idiom is *already* a chassis affordance — the SFC is re-forking it).
- **The audacious √φ ladder is under-spent.** DESIGN.md is TYPOGRAPHY-FORWARD; this is a *motion* page where the hero data is numeric (response, ζ, overshoot %). The `text-display-mega`/`-audacious` tiers (their fast.com-peg home is exactly "a metric/number value") never appear. The overshoot readout `-0.5%` is `fira-code text-foreground` body — a 14px footnote where a `text-display-mega` LIVE number should headline the playground. The eye has no large numeric anchor; the most interesting value on the page is the smallest type on it.
- **Flat section weight.** Both `StorySection`s use `label` (mono eyebrow) only — no `heading` rung. So "Named registers" and "Spring playground" read as captions, not sections (the AZ.W-HIERARCHY caption-not-heading trap). With the page already title-confused, there is no secondary tier to organize the two demos.

## 2. STRUCTURE — one big card, no glassy sub-cards (the user's explicit ask, unmet)

The user's binding directive: *each sub-section in its OWN glassy card; the main card BIGGER.* This page does the opposite.

- **Everything lives in ONE `StoryPage` glass card.** The two `StorySection`s are bare `flex flex-col gap-6` columns stacked inside the single chassis card, separated by the auto-hairline (`delimited`). There is no per-demo glassy card; the "Named registers" stage and the "Spring playground" are visually one undifferentiated column. Each should be its OWN `glass-resting`/`glass-quiet` sub-card (the W-STORY-PAGE-STANDARD `<DemoSpecimen>`/`<DemoInteraction>` taxonomy) so the two distinct teaching surfaces read as two distinct objects.
- **The stages are OPAQUE SLABS, not glass — the anti-precept.** The "Named registers" stage is `bg-background/40 paper-grain-overlay` (line 198) and the range cells are `glass-quiet` (good) but sit ON the opaque stage. The playground travel rail is `bg-[var(--surface-tint-1)]` (line 264) — a flat brand-overlay slab. On a *motion+glass* library, the demo surface a spring animates across should be a `glass-resting` tier over a live field, so the moving card's shadow and the backdrop refraction READ. Per DESIGN.md §L1: a surface that omits the six layers "reads iOS-7-flat, not iOS-26-liquid" — these slabs are iOS-7-flat by construction (BG-2 black-plate class, the ShowcaseFrame `tier="field"` fix exists and is unused here).
- **The animated "spring" card itself is NOT glass.** The hero specimen — the thing that demonstrates the spring — is `bg: oklch(var(--demo-l) 0.18 317.5)` `text-white shadow-cartoon` (lines 204–210): a solid violet rounded rect with a cartoon offset shadow. It is the ONE element on a glass-library motion page that should be a refractive glass tile bending the backdrop as it flies, and it is a flat purple sticker. This is the single highest-leverage visual upgrade on the page.

## 3. BACKGROUND — a faint constellation, not the colorful aurora the ask names

- The live background is `constellation-canvas` (verified) — sparse grey dots, near-invisible in light, faint in dark. The user's ask: *glass demos over COLORFUL aurora backgrounds.* The motion-family violet identity (`--motion-accent`/`--viz-legendre`) is the natural aurora seed — a violet-tuned `<Aurora>` (offscreen-paused, one-GL-per-route) would make the glass tiles POP as liquid glass and unify the page's color story. The constellation reads as "we put *a* background here" not "this glass lives over a designed field." Either lift the constellation to a violet aurora, or at minimum colorize the constellation to the motion-violet so the field carries the family hue.

## 4. ANIMATION AFFORDANCE — a motion page that is itself static (the deepest failure)

Per the brief: *every element ALIVE at the iOS-27 bar — entrance, hover, press, state.* Audit, control by control:

- **Entrance:** the page rides `.scroll-build` from the chassis (the only motion the SFC gets for free). The two demos, the stages, the range cells, the seed-chips — none stagger in. No `.scroll-cascade` on the section bodies.
- **The `Select` register-picker:** stock — no liquid-open bloom on its content (it should ride `.glass-reveal`, which it does via the menu band, but the trigger has no press-squish authored here).
- **The seed-register chips (lines 288–296):** `transition-colors hover:bg-[var(--surface-tint-1)]` — a bare color-fade, NO scale, NO press, NO spring. On a spring page these chips should be the showcase of `useSpringPress` — grab/press/squish. They are dead pills.
- **The `linear()` readout + copy button (lines 300–310):** `transition-colors` only. The copy → check swap is instant; no spring pop on the check, no `metal-glow` earned-confirm beat. A premium copy affordance morphs.
- **The travel demos themselves:** the "spring" card animates via `useNumericTransition` (correct, honest), but it is a one-shot `translateX` with a flat fill — no coupled brightness/specular leg (motion-canon P3 fade-coupled-to-transform), no scale/squish (`useLiquidFlex` is RIGHT THERE in the family), no settle catch-light. The playground dot is a raw `bg-[var(--motion-accent)]` circle on a bare `requestAnimationFrame(translateX)` — it doesn't even reuse the library spring it's demonstrating; it's a hand-rolled rAF (line 124–135). A spring demo whose playground hand-rolls rAF instead of binding `useSpring` is teaching the wrong lesson.
- **Press/active:** the `Button variant="secondary"` Reset and the `StoryPlayButton` carry the library press floor — the only true four-state affordances on the page, and they're the least interesting controls.

The dock APIs (contextual switching/animating) the user named are entirely absent — the page never composes a dock, never demonstrates dock-morph driven by a spring, never uses the dock as the contextual surface for the register selector (the register `Select` is the canonical case for a `<DockLayerGroup>` rail or a `<DockStack mode="facets">` — pick a spring register from a dock rail, watch it morph).

## 5. POLISH + DISTINCTIVENESS — reads as a competent template, not bespoke-premium

- The layout is the generic-AI dashboard shape: title, label, dropdown+buttons row, a bordered preview box, a 3-col stat grid, a two-pane controls/readout split. Nothing about the COMPOSITION says "this is THE spring library." A world-class spring page would let the spring physics author the layout — chips that overshoot in, a register select whose panel blooms with the selected register's OWN curve, a playground where dragging ζ visibly re-shapes a live curve plot in real time.
- **No curve visualization.** This is a spring page with NO plotted curve. The `linear()` stops are shown as raw text (lines 300–301) — correct for teaching the token, but a designer expects to SEE the curve. The `<EasingPicker>`/`<EasingConfigurator>` primitive (BB.W-EASING-PRIMITIVE) plots the real value.js twin over the `--motion-accent` violet — it is the EXACT primitive this page should compose, and it doesn't. The page documents springs in prose+numbers where it should plot them.
- **Color suffusion is correct but timid.** The violet is spent on the (duplicate) masthead, the travel dot, the rail border at 35%, the copy-check glyph — within the one-color-event rule, good. But it never becomes a designed gradient or an aurora seed; it's an accent dab, not the page's identity.

## 6. SPACING / RHYTHM

- Generally fine — `gap-6`/`gap-4`/`gap-3` on the √φ-adjacent scale. The card padding is the BB.W-CARD-PAD ladder (chassis-owned). The one rhythm break: the stat grid (`grid-cols-3`) and the controls/readout split (`lg:grid-cols-[1fr_18rem]`) are arbitrary geometric splits, not φ-derived; on a golden-ratio library a 1fr/φ⁻¹ split would be more deliberate.

## 7. COPY — superfluous, over-precise, jargon-dense (the "tighten language" ask)

- The "Named registers" blurb (lines 168–169) is 3 sentences of internal vocabulary: "driven off the single-source SPRING_PRESETS table — each fires the SAME springTimingFunction twin springLinearStops solves the CSS linear() token from. No local spring solver: the demo teaches the canonical curves, so it can never drift from the vocabulary." This is a *commit message*, not demo copy. A user does not care that there is no local spring solver. → "Four shipped spring registers. Pick one, play it."
- The playground blurb (line 236) is similarly machine-facing ("feeds the pair straight to springTimingFunction and reads back the exact CSS linear() stops springLinearStops emits"). → "Author a spring live. Drag response and damping; copy the CSS."
- The path label `@mkbabb/glass-ui/motion` (chrome chip) is correct and standardized — KEEP. (No `/motion/springs` local-label drift here; this page is on the right convention.)

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Delete the in-SFC masthead (lines 157–165).** Let `StoryHeader` own the title; route the motion-violet display event onto the chrome `<h1>` via the manifest. Kills the double-title P0. (W-HIERARCHY2 / W-PAGE-CHASSIS.)
2. **Each demo → its OWN glassy sub-card; make the stage BIGGER.** Wrap "Named registers" and "Spring playground" each in a `glass-resting` `<DemoSpecimen>`/`<DemoInteraction>` (W-STORY-PAGE-STANDARD). Enlarge the travel stage (it's the protagonist) and give it more vertical room.
3. **Make the animated specimen a REAL glass tile.** Replace the `bg: oklch(...) text-white shadow-cartoon` sticker (lines 204–210) with a `.glass-resting`/`.glass-lens` tile carrying the six-layer composite — so it bends the backdrop as it flies, and couple a brightness/specular leg to the spring (`--*-press-t` drive, motion-canon P3). This is the single highest-leverage move.
4. **Live field, violet aurora.** Swap the faint constellation for a `--motion-accent`-seeded `<Aurora>` (offscreen-paused, one-GL-per-route), and drop the opaque `bg-background/40` / `bg-[var(--surface-tint-1)]` slabs to `tier="field"` glass so the aurora reads THROUGH the demo surfaces (DESIGN.md §L1; BG-2 fix).
5. **Plot the curve — compose `<EasingPicker>`/`<EasingConfigurator>`.** The playground should SHOW the spring curve over the violet, not just print `linear()` text. This is the family's own primitive (BB.W-EASING-PRIMITIVE); composing it deletes the hand-rolled rAF (lines 124–135) and the raw-text readout in one move.
6. **Bind the dock APIs.** Make the register selector a `<DockStack mode="facets">` or `<DockLayerGroup>` rail — pick a spring register from a dock, the dock morphs/animates on the selected register's own curve (contextual switching, the user's explicit ask). The dock IS a spring consumer (`DOCK_SPRING`); demonstrating it here closes the loop.
7. **Animate every control.** Seed-chips → `useSpringPress` grab/squish (a spring page must press like a spring); copy-check → spring pop + `metal-glow` confirm; section bodies → `.scroll-cascade` stagger-in; the playground dot → bind the actual `useSpring` it's demonstrating, not raw rAF.
8. **Headline the live number.** Promote the overshoot %/response/ζ to a `text-display-mega` live readout (the metric/number tier's home) so the playground has a large numeric anchor that re-shapes as you drag.
9. **Tighten copy.** Replace both blurbs with one human sentence each; the internal vocabulary moves to a code comment, off the rendered surface.
10. **Add the `heading` rung.** Give each section the canonical `text-subheading` `<h2>` so the two demos read as sections, not captions.
