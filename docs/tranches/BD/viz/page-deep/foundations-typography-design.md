# foundations/typography — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/foundations/typography.vue` · live `http://localhost:5173/foundations/typography`
**Lens:** world-class frontend designer applying the `frontend-design` skill (distinctive, production-grade, AVOID generic-AI aesthetics) to glass-ui's iOS-26/27 Liquid-Glass + paper language.
**North star:** `DESIGN.md` (§L1 six-layer composite · §L2 spring physics · §L3 tap choreography · §L4 motion tiers · §L5 a11y brackets · the 7-tier glass ladder) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md` · the dock system · GLASS+PAPER both · TYPOGRAPHY-forward (√φ ladder).

Captured live: desktop 1440×900 both modes; the `.demo-main-scroller` (sh 4093) walked top→bottom. Computed-style probes inline below.

---

## TL;DR

This is the most important page in the system to get RIGHT — it is the type specimen, and type is the brand. Today it is a **competent but generic type-spec sheet**: one flat cream plate, an 18-row mono-label/sample list, three full-bleed sample words separated by hairlines, and a dead-static surface. It reads like every AI-generated "/typography" route on the internet. It is the antithesis of what the SFC header comment *claims* ("an EDITORIAL TYPE SPECIMEN, not a flat 18-row label/sample table") — the comment describes the aspiration; the render is the table. Against the user's explicit BD bar (own glassy card per sub-section · bigger main card · dock APIs · series-of-components · glass over COLORFUL aurora · standardized import label · tighter language) it misses on nearly every axis. The bones are good (the √φ ladder is real, the peaks are activated, the import chip + subpath label exist); the EXECUTION is flat.

---

## 1. VISUAL HIERARCHY — does the eye land right? is the ladder USED?

**The focal "Aa" is the wrong typeface for a focal moment.** `getComputedStyle` on the focal word returns `font-family: "Plus Jakarta Sans"` and `font-size: 310px`. DESIGN.md §Typography names TWO voices: the brand sans (Plus Jakarta) AND the **ornamental display voice `--font-display` (Fraunces, WONK/SOFT axes)** — "headings with personality." The page's ONE chance to show personality is the hero glyph, and it shows the *neutral grotesque* — even though the markup sets `font-variation-settings: 'WONK' 1, 'SOFT' 0` (Fraunces axes that Plus Jakarta ignores → dead attribute). A type specimen that leads with the system font, not the character font, has buried its own thesis. The signature ℱ at the very bottom is the only Fraunces-display moment, and it's an afterthought 1500px down.

**The ladder is shown as a LIST, not a hierarchy.** "The graded ladder" renders 18 rows of `mono-caption-label-above / ink-sample-below`, vertically stacked, on ONE `quiet` plate (probed: `oklab(0.98 … / 0.4)` — `bg-card/40`). This is the *exact* flat table the comment disclaims. The √φ ladder's whole POINT is the *geometric ratio between steps* — and a single-column vertical list with uniform gaps makes the ratio INVISIBLE. You cannot SEE that display-5 is √φ × display-4 when each sits alone on its own line with the same 24px gap below it. The ratio is the content; the layout hides it.

**The eye lands nowhere with intent.** Top→bottom the page is: neutral-Aa → 3 full-bleed words → 18-row list → 1 glyph. There is no climax, no rhythm change, no moment that says "THIS is the audacious system." Every section is the same temperature.

**What the ladder-forward bar (`frontend-design` + the project's own audacious-type identity) demands:** the page should be a TYPESETTING composition, not a font menu. Lead with a Fraunces display word at `text-display-audacious` that *means* something ("Audacious" set audaciously). Show the ladder as an overlapping, ratio-revealing STACK (the classic specimen-poster move: each rung left-aligned at a shared baseline so the √φ growth steps read as a visible staircase) — not 18 isolated rows.

## 2. AFFORDANCE — clear interactive cues?

**There are essentially none, and the page is *built* to have none.** Every sample is inert text. This is defensible for a pure spec page — but the user's BD ask is explicit: *"each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)."* A type page can be deeply interactive without losing rigor:
- A weight slider (the variable `wght` axis 200..800 is RIGHT THERE in the font — `<Slider>` driving `font-variation-settings`).
- A `<SegmentedTabs>` to flip the specimen between Display / Body / Mono registers (the BA.W-TABS pill material is the affordance the page should be teaching by USING).
- An `<EasingPicker>`-adjacent "type tester" input so the visitor types their own word into the audacious peak.
- The peaks as `<Card :pressable>` (BB.W-PRESS-UNIFY) tiles that squish.

None exist. The page demonstrates the type tokens but demonstrates ZERO of the library's component or motion language — which, on the foundations route a visitor hits first, is a missed first impression.

## 3. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**Almost entirely static — this is the single biggest gap against DESIGN.md.** §L4 says *"every primitive shipping motion must honor"* squash/stretch, slow-in/out, timing, exaggeration. §L3 says *"every interactive primitive squishes on press."* The motion-canon's `.scroll-cascade` / `.scroll-build` registers are wired at the StoryPage chassis (entrance build), so sections *do* fade-rise on scroll — good, that's the one live thing. But:
- **No hover life on anything.** Per `frontend-design`'s "high animation affordance for EVERY component" + DESIGN.md §L4 Appeal, each ladder rung should react to hover (a `--spring-snappy` lift, a specular sweep, the sample swelling toward its next-rung size as a teaser). They're frozen.
- **No press, no state, no kinetic typography.** The page is *named* for type and the project is "kinetically typographic" (DESIGN.md philosophy line 3) — yet nothing kineticizes. A `<TypewriterText>` or `<SplitChars>` (`useCharStagger`, shipped) per-glyph entrance on the focal word is the obvious, owned, on-brand move. The audacious peaks should *arrive* with a §L2 `--spring-bouncy` overshoot ("playful arrival"), not just fade.
- **The variable font is never animated.** The single most distinctive thing a variable-font specimen can do — breathe its `wght`/optical axes on a slow ambient loop, or morph weight on hover — is absent.

At the iOS-27 bar this page is iOS-7-flat: it has surfaces (sort of) but no LIFE.

## 4. POLISH + DISTINCTIVENESS — bespoke-premium or generic-AI-template?

**Generic-AI-template, with good raw materials.** The tells:
- One flat monochrome cream field, edge to edge, top to bottom. No depth, no layering, no glass actually reading as glass.
- The mono-caption-over-sample list is the default ChatGPT-makes-a-typography-page layout.
- The full-bleed sample words floating on the wash with hairline rules between them is clean but anonymous — it could be any design system.
- Nothing signals *this* library: no aurora, no Fraunces personality up front, no glass tier visibly composing the six §L1 layers, no dock contextual-switching, no spring.

**Concrete render bug undercutting polish:** the signature-glyph caption reads `.fourier-f — Plus Jakarta Sans display italic, viz-fourier red`, but `getComputedStyle('.fourier-f').color` returns **`rgb(28, 25, 23)`** — the warm-ink `--foreground`, NOT `--viz-fourier` red. The one designed color moment on the page is silently broken and the caption *lies about it*. (The dock home glyph top-left IS red, so the red token resolves — the `.fourier-f` rule just isn't winning.) This is exactly the "headless-green / visually-broken" class the project's own MEMORY warns about.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

This is where the page is furthest from DESIGN.md.

- **Glass is barely present and never reads as glass.** Probed surfaces: the body host composites to `oklab(0.934 … / 0.664)` (a ~66% cream plate) and the ladder card to `bg-card/40` — but there is **NO live backdrop behind them** (`canvasCount: 0`, `hasAurora: false`). §L1: glass is "a lensing layer, not a blur swatch" and the six-layer composite's whole reason for existing is to *bend backdrop light*. Over a flat cream page there is nothing to bend — so the glass is, by the library's own canon (AX.W54: "the blur is imperceptible over a flat substrate"), invisible. The user's bar — *"glass demos over COLORFUL aurora backgrounds"* — is the literal fix and it is unmet.
- **`glass-cannot-sample-glass` is fine here** (no overlap), but the page never demonstrates the monotone Z-stack the §Composition discipline is proud of.
- **PAPER morphism is underused.** This is the ONE foundations page where the paper register (grain overlay, paper-grid, the §L1 grain micro-texture) belongs as a co-protagonist — type-on-paper is the editorial idiom the SFC comment invokes ("editorial type specimen"). The `ShowcaseFrame :grain` prop exists and is unused. A paper-grain plate under the ladder would instantly read bespoke.
- **The dock is on the page but the page IGNORES it.** Two docks render (`demo-sidebar-dock` vertical + `demo-bottom-dock` horizontal — probed). The user's bar — *"leverage the dock APIs (contextual switching/animating); each page deftly uses ... docks"* — means the type page should USE a `DockLayerGroup` / `DockStack` to switch the specimen register (Display ↔ Text ↔ Mono ↔ Math) with the morph/contextual-switch APIs. Today the dock is inert chrome the page is unaware of.

## 6. SPACING / RHYTHM — golden-ratio

The √φ is honored in the *type sizes* (the tokens are correct) but NOT in the *layout*. The card padding rides the BB.W-CARD-PAD φ-ladder (good, inherited from `<Card>`), but the section-to-section and rung-to-rung spacing is uniform `gap-6`/`gap-10` — no golden cadence between blocks, so the page has even, metronomic rhythm where it should have a φ-stepped one. The audacious peaks each get a `ShowcaseFrame pad="lg"` but they're so large they touch the frame edges (clipped via `overflow-hidden`), which reads as cramped, not generous — the opposite of the "audacious peak breathes" intent.

## 7. COLOR — suffusion proportion

The page honors the **one-color-event rule** strictly (`proof:suffuse` d1: body ink untinted) — arguably *too* strictly. The SFC's stated thesis is "the ONE color event is the type itself" — but the type is all ink, so there IS no color event; the page is fully monochrome except the broken ℱ and the dock glyph. A type specimen CAN stay ink-disciplined and still have ONE earned color moment: the focal Fraunces display word in the `--motion-accent` violet or a `--section-color` (the BA.W-ICON-CHIP one-event vehicle), or the audacious peak set against a colorful aurora (which simultaneously fixes §5). Right now "monochrome by discipline" reads as "monochrome by timidity."

---

## TOP DESIGN MOVES (ranked — make this exceptional)

1. **Put the page over a COLORFUL aurora and let the glass actually lens it.** Wrap the body in a live `<Aurora>` (offscreen-paused, one-GL-per-route — the `<DockStage>` pattern) in a warm-amber/violet brand palette, and host EACH sub-section in its OWN `glass-resting`/`glass-floating` card floating over it. This single move satisfies "glass over colorful aurora," "each sub-section its own glassy card," makes the §L1 six-layer composite finally READ, and kills the flat-template look. (DESIGN.md §L1, §Composition; user bar 1+3+5.)

2. **Lead with FRAUNCES, kinetically.** Replace the neutral "Aa" with a Fraunces `text-display-audacious` focal WORD that breathes its variable axes on a slow `--spring-gentle` ambient loop (or morphs `wght`/WONK on hover), entering via `<SplitChars>`/`useCharStagger` per-glyph stagger on `--spring-bouncy`. This is the kinetic-typography thesis made visible and is fully owned substrate. (DESIGN.md philosophy "kinetically typographic," §L2, §L4 Appeal.)

3. **Re-set the ladder as a ratio-revealing POSTER, not an 18-row list.** Left-align every rung at a shared baseline in an overlapping staircase so the √φ growth is *visible* as geometry; hover any rung → it lifts (`--spring-snappy`) + swells toward its next-rung size with a specular sweep. The ratio becomes the content. (frontend-design "distinctive"; DESIGN.md §L3/§L4.)

4. **Make the page USE the library it documents.** A `<SegmentedTabs variant="pill">` (BA.W-TABS) to switch the specimen between Display / Text / Mono / Math registers — wired to the **dock's** `DockLayerGroup`/`DockStack` contextual-switch API so the dock and the page move together; a `<Slider>` on the `wght` axis; the peaks as `<Card :pressable>` squish tiles. This satisfies "deftly uses a series of components" + "leverage the dock APIs." (user bar 2+4; affordance-map.)

5. **Fix the ℱ red bug, earn ONE color event, tighten the copy.** Make `.fourier-f` actually resolve `--viz-fourier` (the caption must stop lying); give the focal display word the page's single earned color moment (`--motion-accent` violet or a `--section-color`); and tighten the verbose comment-prose + captions (the user's "tighten superfluous language" bar) — the `352px peak — the fast.com number` captions can lose the editorializing. Standardize the import-path label to the canonical chip (it already shows `/foundations/typography` — keep that ONE form across pages). (MEMORY headless-green warning; user bar 6+7.)

---

## VERDICT (5 lines)

1. Competent type-spec sheet, **generic-AI-template execution** — the SFC comment promises an "editorial specimen," the render delivers the flat 18-row mono-label/sample table it disclaims.
2. **North-star miss:** glass never reads as glass (no aurora/backdrop behind it — `canvasCount: 0`), the page leads with the neutral system font instead of the Fraunces display voice, and the dock on screen is ignored — three of the user's BD bars unmet at once.
3. **Dead static** against the iOS-27 bar (§L3/§L4): no hover, no press, no kinetic typography, no variable-axis breathing — on the one page *named* for the project's "kinetically typographic" thesis.
4. **Concrete bug:** `.fourier-f` renders warm-ink (`rgb(28,25,23)`) while its caption claims "viz-fourier red" — the lone designed color moment is broken and self-describes falsely.
5. **The fix is high-leverage and owned:** aurora-behind + per-section glass cards + Fraunces-kinetic focal word + ratio-poster ladder + actually-use-the-components (tabs/slider/dock/pressable-cards) turns this from a font menu into the system's signature page.
