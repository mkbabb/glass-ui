# foundations/paper-texture — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/foundations/paper-texture.vue` · live `http://localhost:5173/foundations/paper-texture`
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) × this project's iOS-26/27 Liquid-Glass + PAPER north star.
**Verdict in one line:** this is the page that owns the PAPER half of the GLASS+PAPER duality, and it shows paper as a spec-sheet — five flat sections of identical warm-cream panels + a bulleted prop list + a static `<input type=range>` — when paper-morphism is a *tactile material* that should be felt (grain that breathes, a leaf you can turn, a slider that warps the texture in real time). It is the canonical "documentary of a material" instead of "a thing made of the material."

---

## 0. What the page is supposed to be

PaperBackdrop is the SVG-turbulence grain layer — the non-glass half of the system's signature **GLASS + PAPER both** mandate (Pass-E north star). Per **DESIGN.md** the grain is the *sixth optical layer* of the composite and the substance of the paper tier; per `docs/precepts/design-idioms.md` the `--paper-*` cascade is the canonical retint seam. This page is where a designer comes to BELIEVE paper is a real material in the system — to see clean-vs-aged turbulence, the warm/cool/bone retint, and the grain composited UNDER live glass. Right now it tabulates the API instead of demonstrating the substance.

---

## 1. VISUAL HIERARCHY — the eye lands on a poster, then on nothing

**The hero eats the fold (the systemic foundations defect).** The `text-display` `<h1>` "Paper Texture" renders huge and consumes nearly the entire first viewport at 1440×900 — you scroll a full screen of empty warm-cream before the first specimen. The audacious √φ ladder (CLAUDE.md *audacious-type uplift*) is spent as a **poster** on a specimen page, where the ladder should be *demonstrated inside the cards*, not blown up to delay content. This is the exact §1 finding from the sibling `foundations/paper-glass` audit — a cross-page systemic, not a one-off.

**Five peer sections, zero escalation.** `frequency` → `--paper-* retint` → `texture-system cascade` (a bullet list) → `opacity knob` → `layered composition`. Every section is the same rung — a `<StorySection>` eyebrow + blurb + a roughly-equal panel grid. There is no *hero specimen* the eye is pulled to, no climax. The most important demonstration (paper UNDER glass, the duality the system promises) is the LAST section and is the weakest (a bare `<h3>` over grain, no glass). The eye never lands on a protagonist because there isn't one — it just reads down a list (violates the *data-protagonist* / one-focal-specimen discipline).

**Section labels read as captions, not headings.** `text-mono-caption` eyebrows are correct vocabulary, but with no `<StorySection heading>` subheading rung (CLAUDE.md *W-HIERARCHY* canonical `text-subheading` register) every section opens at caption weight — the hierarchy is *flat* where the system identity is *golden-proportioned*.

## 2. AFFORDANCE — one real control, everything else inert

Per **docs/precepts/affordance-map.md** every surface should telegraph its interaction. Here there is exactly ONE interactive element on the whole page — the opacity `<input type="range">` — and it is a **raw unstyled browser slider** (§4), not the library's own `<Slider>`. Everything else (the clean/aged panels, the warm/cool/bone swatches, the composition card) is a static `<div>`. For a page about a *physical material*, the absence of any "touch me / turn me / tune me" cue is the defining miss. The library SHIPS `vSpecular` (tier-root catch-light, CLAUDE.md *W-LIQUIDHOVER*), `<Slider>`, `<SegmentedTabs>`, `<DockStack>` — none appear on the page that should showcase them.

## 3. ANIMATION AFFORDANCE — essentially zero, far below the iOS-27 bar

**Entrance:** the page inherits `.scroll-build`/`.scroll-cascade` (CLAUDE.md *W-SCROLL-MOTION*) for chrome, so sections fade-rise on scroll — but the SPECIMENS themselves do not stagger as a deliberate beat, and nothing blooms-in. The clean-vs-aged panels, the retint swatches, the composition card all just *appear*.

**Hover / press / state:** ZERO. Against **motion-canon.md** P1 (spring-iff-spatial) / P3 (fade-coupled-to-transform), every specimen here is dead:
- the texture panels never lift, never catch light, never react to the pointer — paper-grain that should *shimmer subtly under a moving catch-light* (the sixth layer) is a frozen image;
- the opacity slider drags a number but the grain doesn't *visibly settle/animate* with spring physics — it's an instant CSS opacity flip, the un-canonized register;
- nothing presses, nothing squishes (`useSpringPress` + `useLiquidFlex`, CLAUDE.md *W-PRESS-UNIFY* — absent);
- no `useLiquidReveal` bloom-from-source (CLAUDE.md *W-LIQUID-REVEAL*) on first paint.

The marquee primitives the library ships are invisible on the page that exists to make people want them.

## 4. POLISH + DISTINCTIVENESS — currently generic-AI-template

- **The "texture-system cascade" section is a bulleted prop-sheet** — `frequency?: "clean" | "aged"` / `opacity?: number | string` / a list of tokens / "Reachable via the … subpath." This is API reference prose stuffed into a visual demo. It teaches nothing the eye can see; it's the *flat bordered list* the frontend-design skill names as the AI tell. **Move:** delete it from the visual page (it belongs in the README/`/api`), or transpose it into a LIVE control surface where each knob is a real affordance you operate.
- **The raw `<input type="range">`** (§2) is the single most un-premium element — a default OS slider with a thin blue/gray track sitting in a glass-ui demo is a jarring tell. It must be `<Slider>` (which also gets the `keepDockOpen` + thumb-halo register for free).
- **The opacity-knob ShowcaseFrame `pad="none"` reads as a detached muddy band.** The blurb + the `opacity=0.50` label sit in a gray strip ABOVE the white frame (visible in capture `_cap-paper-texture-mid.png`) because the frame's inner panel doesn't extend to the controls — the label/control area reads as orphaned chrome, not a designed cell. (`darkish=[]` confirms no literal dark element; it's the `pad="none"` composition + the label-over-wash that muddies it.)
- **The warm/cool/bone retint swatches are nearly indistinguishable at a glance** — `#f4ebd6` / `#e6edf4` / `#f6f1e8` are all ~93% L pale tints; the cool is faintly blue, but over the page's own warm-cream wash the three read as "three almost-white squares." The retint demonstration *under-sells its own range* — it needs a darker neutral stage behind each so the underpaint hue actually pops (the BG-2 plate-contrast lesson, inverted: here the field is TOO light, washing the specimen).
- **No color event anywhere.** The page is monochrome warm-cream top to bottom — which is *honest* for a paper page, but it means the GLASS half of the duality (which wants a colorful backdrop to refract) is never shown. Per the user's headline ask "glass demos over COLORFUL aurora backgrounds," the paper page should demonstrate paper-grain UNDER a glass plate OVER an aurora at least once — the one place the two materials and the color event meet.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY — the duality never resolves

**Paper is shown alone, never under glass.** The whole point of paper in this system is that it's the substrate the glass tiers and content compose OVER (the warm-cream grain that gives the cream its tooth). This page shows paper in isolation on five flat panels — it never once composites a `glass-floating` plate ON the grain, so the GLASS+PAPER duality the system's identity rests on is asserted (the `layered composition` section's blurb says "Pair with Card or ShowcaseFrame") but never *built*. The final "Paper-tier surface" section is the closest and it's just an `<h3>` + `<p>` on grain — no glass, no rim, no catch-light.

**The grain is imperceptible at this scale + opacity.** Over the warm-cream wash at the default `--glass-grain-opacity`, the SVG turbulence is a barely-visible whisper — the clean-vs-aged difference (0.65/4-octave vs 0.5/5-octave) is real in the tokens but *flattens to identical* in the render (the two panels resolve the IDENTICAL bg `color(srgb 0.949 0.938 0.921)` — only the turbulence frequency differs, and at this opacity it's sub-perceptual). The demonstration of a DIFFERENCE shows no difference. **Move:** crank the demo grain opacity well above the production default for the comparison panels (a demo may exaggerate to teach), and put the two side-by-side over a mid-tone field so the octave difference reads.

**No dark register.** PaperBackdrop has a dark arm (the grain over the W-DARK-MATERIAL near-black page), and the page never demonstrates it — a `<SegmentedTabs>` light/dark toggle on the composition card would show the warm-cream-vs-luminous-dark paper register (CLAUDE.md *W-DARK-MATERIAL*).

## 6. SPACING / RHYTHM — even, not golden

`gap-4` grids and uniform `h-56`/`h-44`/`h-40` panel heights are competent but flat. The **W-CARD-PAD** sqrt-φ block-over-inline ladder is not used; panel heights step *arbitrarily* (56→44→40) rather than on a φ cadence. The hero→body transition is a hard cut. The page is rhythmically *metronomic* where the system's identity is *proportioned*.

## 7. IMPORT-PATH LABEL — present and CORRECT (the one thing standardized)

The subpath chip renders `@mkbabb/glass-ui/paper-backdrop` (confirmed in capture) — this is the standardized component-import convention the user wants, and it's right (unlike the route-label `/foundations/paper-glass` the sibling page shows). **Keep this convention; it's the reference.** Minor: the SFC header comment is solid, but the on-page "texture-system cascade" bullet that repeats "Reachable via the `@mkbabb/glass-ui/paper-backdrop` subpath" duplicates the chip — tighten (the *superfluous-language* the user flagged).

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Build the duality: paper-grain UNDER a real glass plate OVER a live aurora — ONCE, as the hero.** Replace the weak final "layered composition" section with a BIG hero `glass-floating` card (the user's "main card area BIGGER") whose stack is, bottom-to-top: a live `<Aurora>` (vivid preset, offscreen-paused via the `<DockStage>`/`useIntersectionPause` budget — one GL context per route) → `<PaperBackdrop>` grain → a `surface="glass"` plate with `vSpecular` catch-light. NOW the six-layer composite (DESIGN.md) reads, the grain gives the glass its tooth, and the GLASS+PAPER mandate visually resolves. This is the single move that turns the page from "paper alone" into "the page that proves paper and glass are one system."

2. **Each sub-section in its OWN glassy card; kill the prop-sheet.** Per the user: wrap each demonstration in a `surface="glass"` card over the aurora — the clean/aged comparison (1), the warm/cool/bone retint (2), the opacity tuner (3), the hero composite (4). DELETE the "texture-system cascade" bullet list entirely (API prose → README/`/api`). Four escalating glassy cards, not five flat peer sections + a list.

3. **Make the opacity knob a LIVE material tuner with the dock APIs.** Replace the raw `<input type=range>` with `<Slider>`, and add a `<DockStack mode="facets">` (CLAUDE.md *W-DOCK-RAIL-REALIZE*) whose facets switch the *texture register* live — `clean` ⇄ `aged` ⇄ a custom `--paper-*-texture` — each facet carrying its register's accent via `--glass-accent` (CLAUDE.md *W-GLASS-ACCENT*), morphing the hero card's grain in real time. This answers "leverage the dock APIs (contextual switching/animating)" and turns a static comparison into an *interactive paper explorer*.

4. **Bring every specimen ALIVE to the iOS-27 bar.** Texture cards: `vSpecular` pointer-tracked catch-light on hover (the grain *shimmers* under a moving light — the sixth layer made dynamic) + `useLiquidReveal` bloom-in entrance + `useSpringPress` squish on press (motion-canon P1/P3; CLAUDE.md *W-LIQUIDHOVER* / *W-LIQUID-REVEAL* / *W-PRESS-UNIFY*). The opacity change should *settle* with spring physics, not snap. The page becomes the marquee for the library's own motion primitives.

5. **Make the clean-vs-aged difference VISIBLE.** Exaggerate the demo grain opacity above the production default for the comparison panels, stage them over a mid-tone (not warm-cream-on-warm-cream) field, and increase scale — so the 4-octave-vs-5-octave turbulence difference the page exists to teach actually reads. A demonstration of a difference must show the difference.

6. **Show the dark paper register.** Add a `<SegmentedTabs>` light/dark toggle on the hero composite so the warm-cream-vs-luminous-dark grain (CLAUDE.md *W-DARK-MATERIAL*) is demonstrated — paper is a material in BOTH modes.

7. **Restore golden rhythm + tighten copy.** Use **W-CARD-PAD** sqrt-φ block-over-inline padding on the glassy cards; step panel heights on a φ cadence not 56→44→40; drop the hero to a tight `<StoryHeader>` cluster (reclaim the fold for the hero specimen); one declarative blurb per card; the subpath chip stays `@mkbabb/glass-ui/paper-backdrop` (the standard).
