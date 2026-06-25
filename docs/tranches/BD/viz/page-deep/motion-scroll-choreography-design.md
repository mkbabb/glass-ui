# motion/scroll-choreography — FRONTEND-DESIGN deep critique (Pass-E)

**Page**: `demo/stories/motion/scroll-choreography.vue` · live `http://localhost:5173/motion/scroll-choreography`
**Lens**: world-class frontend designer, the frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) applied to glass-ui's own language.
**North star**: `DESIGN.md` (§L1 six-layer Liquid Glass composite + seven tiers + glass-cannot-sample-glass + §L2 spring physics) · `motion-canon.md` (P1–P7) · `affordance-map.md` (the five pointer primitives) · `PROCEDURAL-SUITE.md` · the dock system (DockStack/DockSection/contextual-switching/morph).
**Captures**: `_capture/scroll-choreo-{light-full,light-mid,light-bottom,dark-mid}.png` (1440×900, both modes, 3 scroll depths).

---

## The one-sentence verdict

A *motion* page that cannot show its motion in a still frame is the hardest demo brief in the storybook — and this page surrenders to it: three flat caption-led sections stacked inside ONE washed card, a hero-scale gray "Pinned" slab over a **dead near-black void with no aurora**, and acres of empty `.scroll-pin` temporal scrollage at the bottom. It is technically faithful to the registers and visually inert — the precise "canon-on-paper / muddy-in-render" gap the `proof:ba-gestalt` bar exists to kill.

---

## What I measured (hard evidence, not impression)

Live `getComputedStyle` readback at HEAD (dark + light):

| Fact | Value | Verdict |
|---|---|---|
| Canvases on the route | **1** (constellation dots, faint) | The motion category default bg is `constellation`, NOT aurora. There is **NO colorful aurora** behind any glass. |
| Cascade card vs Pinned card recipe | **identical** `glass-card` (oklab L≈0.40 dark, α 0.63, `blur(8px) saturate(1.35) brightness(1.16)`) | No tier differentiation. Same plate three+ times. |
| `--glass-accent` on any card | **unset** (0%) | The BB.W-GLASS-ACCENT per-instance chromatic rim is never used — every rim is warm-ink neutral. |
| `--motion-accent` suffusion | present only as a **2px dot** (`size-2 rounded-pill`) | The page's ONE color event is a speck. The violet identity is invisible. |
| `.scroll-pin` container | transparent box, 1px 40%-α border, `min-h-[60vh]` sticky stage in a tall container | The dead acres: ~60vh of empty off-white at the bottom (light-bottom.png is almost entirely blank). |
| Hero `<h1>` | 86px (`text-display-4`) | The audacious ladder IS present at the hero — the one thing working. |

Over a flat constellation backdrop the glass blur has **nothing to refract** (DESIGN.md §L1: "glass-ui surfaces are lensing layers, not blur swatches" — a lens over a flat field reads as a gray swatch). The cards collapse to gray exactly as the W-NO-GRAY / W-DARK-MATERIAL lessons predicted. This is the same defect class those waves shipped to cure, re-introduced at the page-composition layer.

---

## VISUAL HIERARCHY — does the eye land right?

**Partial.** The hero is correct: the 86px `text-display-4` "Scroll Choreography" with the Fira-Code subpath chip is a genuine audacious-ladder masthead (DESIGN.md §Typography √φ ladder, the one north-star win). The collapse-on-scroll sticky register is present.

But below the hero the hierarchy **flattens to a single plane**:
- All three sections are `StorySection heading="…"` at the SAME `text-subheading` (20.4px) rung, in the SAME flat flow, separated by a hairline `--configurator-divider`. There is no weight progression, no spatial contrast — three identical caption-led blocks. The eye has nowhere to *land*; it scans a uniform list.
- The body copy is `text-prose text-muted-foreground max-w-prose` — long explanatory paragraphs that out-mass every visual. The page reads as a **spec sheet with a big title**, not a designed specimen (the exact anti-pattern W-DEMO-DESIGN names: "DESIGNED specimens, not flat spec-sheets").
- The "Pinned" `text-display-4` inside the showcase is the ONLY second focal beat — and it is marooned inside a gray slab, so its scale reads as empty bombast rather than a designed crescendo.

**The typography-forward ladder is used ONCE (hero) and never again as a hierarchy device.** A page about the SOTA scroll register should stage the cascade numerals, the phase labels, the capability badges as *typographic events*, not as muted-prose footnotes.

---

## AFFORDANCE — clear interactive cues?

**This is the page's deepest failure: there is NOTHING to touch.** Per `affordance-map.md` the closed vocabulary is five pointer primitives (HOVER-LIFT · GLEAM-TRACK · PRESS-SQUISH · DRAG-MORPH · FOCUS-RING). This page wires **zero** of them:
- The six cascade cards are inert `<div class="glass-card">` — no `:pressable`, no hover-lift, no gleam. They are decorative plates.
- The capability badges are static `<span>` pills (`scroll() supported`, `view() supported`, `timeline-scope supported`) — they read as status chips but afford nothing.
- The "Pinned" stage is a passive sticky element; the user cannot drive it except by scrolling.
- No Button, no Tab, no Dock, no Toggle anywhere on the page.

The user's mandate is explicit — "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons); HIGH animation affordance for EVERY component." This page uses **two** library surfaces (`glass-card` utility, the StoryPage chassis) and zero interactive components. It is the least component-dense page in the motion band.

---

## ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**The cruel irony: a motion page that is mostly static.** The page DOES ride `.scroll-build` (route-enter) and `.scroll-cascade` (section build-in) — both real, both compositor-only, both PRM-safe (motion-canon P5/P6). Those are correct. But:
- In a **still frame** — which is how the gestalt bar and 90% of first-impressions read it — the choreography is invisible. Nothing pulses, hovers, or breathes at rest.
- The `.scroll-pin` showcase is the centerpiece and it is **dead until you scroll**, and even then it only fades a card and drifts text. There is no living element — no `<Aurora>` breathing behind it, no procedural viz advancing, no dock morphing. iOS-27 ambient life (a surface that is alive even when idle) is entirely absent.
- The cascade cards do not even carry a rest-state shimmer or a `:reveal` entrance pop (contrast the W-SUFFUSE3 IconChip spring entrance the colors/icons panes use).

Per `motion-canon.md` P7 ("the iOS-27 'everything is the same liquid' feel") and §L4 Appeal (the strong-tier "distinctive personality — Liquid Glass refraction"): this page should be the **loudest** motion demonstration in the suite and is currently the quietest.

---

## POLISH + DISTINCTIVENESS — bespoke/premium or generic-AI-template?

**Generic.** Strip the hero title and this is indistinguishable from a Tailwind-tutorial "three cards + a sticky section" page. The tells:
- Uniform off-white/charcoal plates, no aurora, no color, no tier depth → the generic-AI flat-card aesthetic the frontend-design skill explicitly warns against.
- A giant gray "Pinned" box centered in negative space — the canonical AI-placeholder look.
- The bottom third of the page is **empty container** (light-bottom.png is ~95% blank off-white). No world-class designer ships acres of dead scrollage as a feature.

The glass-ui language has a magnificent vocabulary this page declines to spend: the seven glass tiers, the `--glass-accent` chromatic rim, the `--glass-depth` opt-in deep tier, the procedural-suite viz, the dock morph. None appear.

---

## iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **§L1 six-layer composite — FAILING.** With no colorful backdrop, layers 1 (blur+saturate) and the refraction reading are inert; the cards read as flat tinted plates (iOS-7-flat, the §L1 explicit failure mode), not iOS-26-liquid lensing.
- **§L1 tier ladder — UNUSED.** Everything is one tier (`glass-card`/resting). DESIGN.md: "over-reach (every card as floating) is the canonical anti-pattern" — the inverse is also flat: every surface at ONE tier gives no §L1 "solid drawing" z-depth (§L4 #11).
- **§L1 glass-cannot-sample-glass — not exercised** (no nested glass to manage, because there's no composition).
- **Paper morphism — absent.** The brief mandates GLASS + PAPER both. This page is all (weak) glass; the `.paper-grain-overlay` / blueprint-grid / Fira-Code-math idiom (the math-paper gold standard) never appears, though the page is text-heavy and would benefit.
- **§L2 spring physics — present in the scroll registers, invisible at rest.** Correct under the hood (P4 per-spring clocks), but no idle spring life.

---

## SPACING / RHYTHM (golden-ratio) & COLOR (suffusion proportion)

- **Rhythm**: the StoryPage `--story-page-section-gap` cadence is fine, but the `.scroll-pin` `min-h-[60vh]` + tall temporal container blows the vertical rhythm wide open — a 60vh empty stage is not golden-ratio breathing, it's a void. The card-padding ladder (W-CARD-PAD sqrt-φ) is respected inside cards.
- **Color/suffusion**: the one-color-event rule (AZ.W-SUFFUSE) is *under*-spent here, not over-spent — the motion-violet `--motion-accent` shows up only as 2px dots. The page reads monochrome-gray, which violates the user's "glass demos over COLORFUL aurora backgrounds" mandate. There is essentially no color event with mass.

---

## Copy / import-path / language hygiene (the user's explicit asks)

- **Import-path label**: the StoryHeader subpath chip renders `/motion/scroll-choreography` (a ROUTE path), but the canonical import is `@mkbabb/glass-ui/motion` (the manifest `motion` package label). The chip should read the package subpath, standardized with every other page's chip.
- **Superfluous language**: the SFC body copy is dense and self-referential ("the SOTA scroll-driven choreography register," "NO setTimeout cascade," "the implicit stagger," "the fixed-stage-advances-time read") — internal-spec voice leaking into demo prose. Tighten to plain, confident captions. The hero blurb is four sentences where one would do.

---

## TOP DESIGN MOVES (ranked — make this page exceptional)

1. **Put a live `<Aurora>` behind the whole page (or at minimum behind the scroll-pin stage), and make the glass POP over it.** This is the single highest-leverage move and a direct user mandate ("glass demos over COLORFUL aurora backgrounds"). Override the motion-category `constellation` default to `aurora` for this route, or wrap the showcase in `<DockStage>` (the shared offscreen-paused aurora chassis). The cards stop being gray the instant there is color to refract (DESIGN.md §L1). One GL context per route (the budget) — the aurora self-stages.

2. **Each sub-section in its OWN glassy card, tiered for depth (user mandate).** Promote the three `StorySection`s out of the single shared card into three distinct glass cards at DIFFERENT tiers — e.g. "The register" on `glass-quiet`, "Section cascade" on `glass-resting`, "Scroll-pinned showcase" on `glass-floating` / `.glass-deep` — so §L1 "solid drawing" z-depth reads. Give each a `--glass-accent` chromatic rim in the motion-violet (BB.W-GLASS-ACCENT) so the cards carry the band identity at the rim, not as a 2px dot.

3. **Make the main showcase card BIGGER and KILL the dead acres (user mandate: "the main card area BIGGER").** The `.scroll-pin` stage is the hero of a *scroll* page — give it real screen presence (a wide, deep-glass `floating`/`deep` card with the aurora reading through), and REPLACE the empty 60vh tail with living content: a `DotFlowField` or `Concentric` procedural viz that ADVANCES as the stage pins (the literal "scrolling advances time inside the scene" thesis, now with something worth advancing). The PROCEDURAL-SUITE viz are the perfect inhabitant of a scroll-pinned temporal stage.

4. **Leverage the dock APIs for contextual switching (user mandate).** Seat a `<GlassDock>` with a `<DockStack mode="facets">` or `<DockLayerGroup>` that switches the live demo between the three registers (build · cascade · pin) — clicking a facet morphs the showcase context (the contextual-switching/morph APIs, DockStage precedent in `dock/overview`). This gives the page interactivity AND demonstrates the dock band on a motion page — exactly the cross-component "series of glass-ui components" the user wants.

5. **Wire the five affordance primitives onto every surface (affordance-map.md).** Make the cascade cards `:pressable` (HOVER-LIFT + PRESS-SQUISH + GLEAM-TRACK + FOCUS-RING); turn the capability badges into real `<Button variant="ghost">` or `<Toggle>` that toggle a live PRM/timeline preview; add a `<StoryPlayButton>` to REPLAY the build/cascade choreography on demand (so the motion is demonstrable without a page reload — a play harness is the right answer to "a motion page can't show motion in a still frame"). Add `:reveal` spring entrances to the cards (W-SUFFUSE3).

6. **Type-forward the cascade and phases (DESIGN.md √φ ladder).** Number the six cascade cards with a `text-display` numeral, not a 2px dot. Render the phase labels ("Phase 1 — reveal," "Phase 2 — settle") as typographic events on the violet, not muted-prose footnotes. Spend the audacious ladder as a hierarchy device, not just on the hero.

7. **Add the paper register for the explanatory copy.** The brief mandates GLASS + PAPER both. Move the dense register-explanation prose onto a `paper-grain-overlay` + Fira-Code section rail (the math-paper idiom) so the *teaching* surface reads as paper and the *demo* surface reads as glass — two materials, clear separation (the W-DEMO-DESIGN documentary/specimen split).

8. **Standardize the subpath chip + tighten copy.** Chip → `@mkbabb/glass-ui/motion`. Cut the SFC body copy to confident one-line captions; retire the internal-spec voice ("SOTA," "NO setTimeout," "implicit stagger") from user-facing demo text.

---

## Precepts cited

DESIGN.md §L1 (six-layer composite, seven tiers, lensing-not-blur, glass-cannot-sample-glass, solid-drawing z-depth) · §L2 (spring physics, idle ambient life) · §L4 (#11 Solid drawing, #12 Appeal) · §Typography (√φ audacious ladder). `motion-canon.md` P3/P4/P5/P6/P7. `affordance-map.md` (the five pointer primitives; no-inert-interactive-element floor). `PROCEDURAL-SUITE.md` (DotFlowField/Concentric as scroll-pinned inhabitants). BB.W-GLASS-ACCENT (per-instance chromatic rim) · BB.W-DEEP-GLASS (`--glass-depth`) · AZ.W-SUFFUSE (one-color-event) · W-DEMO-DESIGN (specimens not spec-sheets) · the DockStage / DockStack / DockLayerGroup contextual-switching chassis.
