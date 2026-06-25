# dock/overview — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/dock/overview.vue` · live `http://localhost:5173/dock/overview`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon P1–P7, affordance-map).
**Captured**: 1440×900 light + dark, full-page, computed-style probes (`_cap/`).

This is the **hallmark dock page** — the flagship the user explicitly brainstormed. It must read as the single most premium surface in the storybook. Today it reads as a **competent spec-sheet of dock features over a flat peach wash**, not a bespoke iOS-27 liquid-glass showcase. The substrate is right; the *staging, hierarchy, animation life, and dock-API leverage are under-spent*.

---

## 1. The verdict up front

The page demonstrates the dock's *mechanics* (collapse, media transport, triggers, slider-hold, overflow-wrap, grid, pause) honestly and correctly. But it demonstrates them as **eleven near-identical centered pills on one undifferentiated orange field**, narrated by long paragraphs. The frontend-design failures are systemic, not cosmetic:

- The **aurora is monochrome** (a single warm-peach/brown wash — `r/g/b` read one hue, zero colorful nuclei life). The brief's "glass demos over COLORFUL aurora backgrounds" is the whole point of glass, and it is unmet. Glass over a one-color field reads as a tinted pill, not a lensing layer (§L1 — "surfaces are lensing layers, not blur swatches"; the lens has nothing to refract).
- **No card-per-section.** 6 of 11 sections sit in a transparent `.dock-stage-tile` (hairline-only frame); 3 sit in a *bare* `flex justify-center` with NO frame at all; 1 is pure prose. The user's "each sub-section in its OWN glassy card" is unmet, and the hosts are *inconsistent* — three different container treatments down one column.
- **The main area is NOT bigger** — it is *smaller*. The article is capped at 1152px on a 1440px viewport (290px of dead margin). The user asked for MORE screen space; the page gives less.
- **The dock's headline APIs — contextual switching, layer morph, the facet rail — are entirely absent** (`DockLayerGroup`=0, no live `DockStack`/`DockSection` carousel). The page that is supposed to *leverage the dock APIs (contextual switching/animating)* shows zero contextual switching. The richest dock capability is demonstrated on *other* pages (layers, rail, sections), leaving the FLAGSHIP page as the shallow one.
- **Animation affordance is mechanism-only.** The docks morph on hover (good), but nothing else on the page is alive: the eleven tiles are static frames, there is no entrance choreography landing on the demos, no inter-demo rhythm. At the iOS-27 bar (motion-canon P7 "everything is the same liquid"), a flagship page should *breathe*.

---

## 2. VISUAL HIERARCHY — the eye lands flat after the title

**What works.** The `Overview` H1 resolves to **86px Plus Jakarta Sans** (`--type-display-4` rung) — the audacious √φ ladder IS used for the hero, and it lands. The eyebrow (`DOCK · OVERVIEW`) + the Fira-Code subpath chip (`@mkbabb/glass-ui/dock`) is the correct three-rung cluster (StoryHeader, W-HIERARCHY2). Section `<h2>`s resolve to a consistent 20.4px `text-subheading`. The typographic *scaffolding* is correct.

**What fails.** After the title, **every section is the same weight**. Eleven 20.4px headings, eleven centered pills, eleven muted-grey paragraphs — there is no focal demo, no "this is the one to look at." The frontend-design bar demands a *protagonist*: the dock's signature move (the collapse→expand morph, or a contextual layer switch) should be staged HERO-scale, large and central, with the utility demos (separators, triggers) as supporting satellites. Instead the signature demo (Collapsible) is the same size as Notes.

The typography ladder is **used at the page chrome but never inside the body**. DESIGN.md's "kinetically typographic / TYPOGRAPHY-forward" identity stops at the H1. A flagship dock page could let a `text-display-mega` numeral or a single audacious word anchor a section (e.g. a giant "DOCK" wordmark behind the morph demo, the `--type-display-mega` poster rung the library ships for exactly this). Today the interior is 100% body-and-caption.

**Move**: stage ONE protagonist demo at 2× scale (the live collapse↔expand morph or a contextual-switch dock), give it a poster-rung typographic anchor, and demote the feature-checklist demos to a tighter supporting grid.

---

## 3. STAGING / GLASS FIDELITY — the lens has nothing to refract

This is the **single highest-leverage failure**. DESIGN.md §L1 is unambiguous: glass *bends and concentrates light*; the six-layer composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) only reads as iOS-26-liquid **over content worth refracting**. §L5's worst-case-contrast rule assumes a *kinetic, varied* backdrop.

The live field is a **single flat warm hue** (the `DEFAULT_AURORA_CONFIG` calm wash at `opacityCeiling 0.42`). Over it:

- The dock glass reads as a translucent peach pill — the backdrop blur has nothing structured to blur, the `saturate()` channel has no chroma to concentrate, the rim/catch-light are the only six-layer legs doing visible work.
- In **dark mode the field collapses to a muddy brown over a near-black void** (captured `_cap/dock-overview-dark.png`) — the dock reads, but the "colorful aurora" is gone entirely; it's a brown gradient.

The brief's directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix. The DockStage should run a **richer, multi-nuclei aurora preset** (the procedural-suite's vivid palettes, not the calm DEFAULT), so the glass actually *lenses* a varied field — warm-to-cool nuclei drifting behind the pill, the blur smearing real color structure, the saturate concentrating it. This is what makes a glass demo read as Apple-grade vs. a tinted div. Keep it offscreen-paused (already by construction) and budget-safe (one GL context per route, already honored).

**Secondary**: the page demonstrates "glass cannot sample glass" (§L1) correctly — the dock-hosted menus teleport out — but it *narrates* this rule (140 words) instead of *showing* it. A flagship should make the rule visible: show the correct teleported menu LIVE beside a captioned note, not a wall of prose about the keyframes-D9 break.

---

## 4. CARD-PER-SECTION + LAYOUT — three host treatments, none of them a card

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER (more screen space).** Today:

| Treatment | Sections | Reads as |
|---|---|---|
| `.dock-stage-tile` (transparent, hairline only) | Collapsible, Media transport, Triggers, Popover, Slider, Tap/click (6) | a faint dashed-frame placeholder |
| bare `flex justify-center` (no frame) | Overflow-wrap, Big-dock, Pause-toggle (3) | a pill floating in void |
| pure prose | Menus-teleport, Notes (2) | a paragraph |

Three inconsistent containers down one column is the **generic-AI tell** the frontend-design skill warns against — it reads as "I wrapped each block in whatever was handy." The intent (BA.W-STAGE's "transparent tile so glass floats over the live field") is *architecturally sound* — an opaque `bg-card` plate WOULD occlude the aurora — but the execution stops at a hairline border, which gives the eye no card to land on.

**The resolution is a `surface="veil"` glass tier, not opaque and not bare.** DESIGN.md ships exactly the right primitive: the **Wash/Quiet glass tiers admit the backdrop through** (§L1 tier table — "permeable veil over a kinetic backdrop"). A `.glass-wash`/veil-surface section card frames each demo as a *real glassy card* (rim + catch-light + grain), AND the backdrop reads through it onto the dock — satisfying "own glassy card" AND "glass over the live field" at once, with no occlusion. This is the architectural transposition: stop choosing between "opaque plate (occludes)" and "bare (no card)" — use the veil tier the library already ships for precisely this kinetic-backdrop case.

**The width**: lift the article cap from 1152px toward the full generous width on the dock page specifically (it's the showcase that wants the room), or give the DockStage column a wider bound. 290px of unused viewport on the hallmark page is the opposite of "BIGGER."

---

## 5. ANIMATION AFFORDANCE — mechanism-alive, page-dead

Per affordance-map + motion-canon P7 ("everything is the same liquid"), every element should answer the pointer the same liquid way, and the page should *arrive*.

**Alive (good):** the dock controls carry the full affordance floor — `DockIconButton` hover-lift (`--scale-hover-dock` 1.1), `v-specular` gleam-track, `:active` press-squish (`--scale-press-dock` 0.92), focus-ring. The collapse↔expand morph rides `--spring-dock` on its own clock (P4). The pause-toggle genuinely parks the rAF. The *mechanics* honor the canon.

**Dead (the gap):**
- **No entrance.** The page mounts inside `.scroll-cascade` (1 wrapper present) but the eleven demo tiles do not visibly *build in* — there's no per-demo gravity-rise, no staggered arrival landing on the docks. The flagship should assemble itself (motion-canon "page assembles itself") with each dock demo blooming in on its own `--spring-snappy-duration` beat.
- **No state-life on the demos.** The Select/Dropdown/Slider readouts update text, but the *demo containers* are inert frames. A premium page makes the readout a live animated value (the library ships `useAnimatedNumber`/`useCountup`), makes the active dock-command chip lift, makes the slider-hold visibly tier-shade the substrate (it's described in 113 words but the visual is subtle).
- **No contextual-switch animation** — the dock's marquee animated capability (layer crossfade, V↔H morph, facet-rail fling) appears NOWHERE on the overview. The page demonstrating "the dock APIs (contextual switching/animating)" has zero contextual animation.

**Move**: (a) wire the `.scroll-cascade` gravity-entrance to actually land on the demo tiles; (b) add ONE live contextual-switching dock (a `DockLayerGroup` or `DockStack mode="facets"`) as a protagonist so the page SHOWS the dock morphing context, not just collapsing; (c) animate the readouts.

---

## 6. POLISH / DISTINCTIVENESS — competent, not bespoke

The page avoids the worst generic-AI sins (no gradient-purple-card soup, real tokens, real components). But it does not yet read **bespoke + premium**:

- **Repetition without rhythm.** Eleven centered pills in a vertical stack is a *list*, not a composition. There's no asymmetry, no bento, no scale contrast — the frontend-design skill's "distinctive layout" bar wants the protagonist/satellite or bento arrangement, not a uniform stack.
- **The captions are documentation, not design copy.** "The canonical mis-wire (the keyframes D9 break): a dropdown mounted OUTSIDE the keepOpen+portal contract drops out..." (140 words) is internal-changelog voice, not showcase voice (MEMORY: no grandiloquence, tighten superfluous language). The flagship should read as a *product page* for the dock, not a spec appendix.
- **The hairline tile frames** (`oklab(... / 0.3)` border) are the most generic element on the page — a faint rounded rectangle is the AI-template default. The veil-glass card (§4) replaces it with something that reads as glass-ui.

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the DockStage column gap is `2.5rem` (clamped), the article uses tokenized section rhythm — the *vertical* rhythm is fine and golden-ratio-derived. The failure is **horizontal**: the 290px dead margin + the uniform full-width centering of every pill wastes the room and gives no spatial hierarchy.

**Color suffusion**: the page is **monochromatic to a fault**. The one-color-event rule (AZ.W-SUFFUSE) is *over*-applied here — the dock band's identity color is absent, the aurora is one hue, the captions are grey, the chips are grey. The proportion is so calm it reads inert. The dock band could carry ONE deliberate accent (a `--glass-accent` chromatic rim on the active dock control — the per-instance axis the library ships, BB.W-GLASS-ACCENT) so the *selected* control glows with the band's hue. That's one color event, on the right element, and it would give the eye a focal warm-spot the flat field denies it.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label**: the rendered subpath chip is correct and standardized (`@mkbabb/glass-ui/dock`). BUT the SFC imports via the local relative path (`../../../src/components/custom/dock`) AND carries a **leftover inline import comment** in the template (`<!-- import { DockSelectTrigger, DockDropdownTrigger } from "../../../src/components/custom/dock"; -->`, line 170) — dead, duplicative, and inconsistent with the clean chip. Delete it; the chip is the one canonical label.
- **Superfluous language**: the prose is the heaviest in the storybook — Menus-teleport (140w), Slider (113w), Tap/click (92w), Overflow-wrap (95w). Each over-explains the *mechanism* in changelog voice. Cut every caption to ONE showcase sentence; move the "why" into a code-peek or a tooltip, not a paragraph wall. The Notes section (a bulleted recap of things already shown) is pure redundancy — delete it.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Colorful aurora, not the calm wash.** Swap the DockStage `DEFAULT_AURORA_CONFIG` for a vivid multi-nuclei preset (the procedural-suite palettes) so the glass actually lenses varied color (§L1). Single highest-leverage fix — it makes every dock on the page read as liquid glass instead of a tinted pill. Verify dark-mode chroma survives (don't collapse to brown).
2. **Veil-glass card per section.** Replace the inconsistent tile/bare/prose hosts with ONE `surface="veil"` (`.glass-wash` tier) card per demo — a real glassy card whose backdrop reads through onto the dock (§L1 permeable veil). Satisfies "own glassy card" + "glass over live field" with no occlusion, and kills the three-host inconsistency.
3. **Stage a protagonist + LEVERAGE the contextual APIs.** Promote ONE demo to hero scale — a LIVE contextual-switching dock (`DockLayerGroup` crossfade or `DockStack mode="facets"` rail) — so the flagship page actually shows the dock *morphing context/animating*, the capability the brief names and the page currently lacks entirely. Anchor it with a poster-rung (`--type-display-mega`) typographic mark.
4. **Make the page arrive + the demos live.** Wire the `.scroll-cascade` gravity entrance to land on the demo cards (per-demo `--spring-snappy-duration` stagger, P3/P7); animate the Select/Dropdown/Slider readouts (`useAnimatedNumber`); give the active dock control a `--glass-accent` chromatic-rim focal glow (one color event, BB.W-GLASS-ACCENT).
5. **Bigger + tighter.** Lift the 1152px article cap toward the full viewport on this showcase; arrange the supporting demos as a bento/protagonist-satellite composition (not a uniform vertical stack); cut every caption to one showcase sentence, delete the inline import comment + the redundant Notes section + the pure-prose "Menus teleport" wall (show it live instead).
