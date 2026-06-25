# foundations/radii — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/foundations/radii.vue` · live `http://localhost:5173/foundations/radii`
**Lens:** world-class frontend designer; iOS-26/27 Liquid Glass north star (DESIGN.md), GLASS+PAPER morphism, typography-forward √φ ladder, HIGH animation affordance, AVOID generic-AI aesthetics.
**Captured:** full-page 1440×900 light. Verdict: a competent flat spec-sheet, NOT a bespoke premium specimen. It violates the page's own design language on nearly every axis the user named.

---

## 0. What the page IS right now (the honest read)

Two `StorySection`s ("Scale" / "Semantic aliases") inside ONE outer `StoryHero` `resting` card over the inherited `foundations→paper` static wash. Each section is a `flex-wrap` / `grid` of `h-20 w-20` `bg-card border-border shadow-cartoon` squares + a `text-small` label + a `text-mono-caption` hint. That is the ENTIRE page. The swatches are off-white-on-near-white (cream `--card` over cream paper wash), the only chroma on the page is the dock's red `ℱ` wordmark. The boxes are inert — `.scroll-cascade` gives a one-time entrance and then nothing is alive. This is the canonical "token spec-sheet" — and the radii axis (the SHAPE axis, DESIGN.md's third orthogonal variant) is the one foundation that should be the MOST kinetic and the MOST glassy, because shape only reads when it's lit and when it moves.

---

## 1. VISUAL HIERARCHY — the eye lands flat, then nowhere

- **The display ladder is used ONCE and then abandoned.** "Radii" rides the audacious `text-display-4` chrome `<h1>` (good — the W-PAGE-CHASSIS rung). But below the title the page collapses to a single body rung: two `text-subheading` section headings ("Scale" / "Semantic aliases") and a flat field of identical `text-small` labels. There is no SECOND focal moment. DESIGN.md's typography-forward identity (the √φ `text-display-mega`/`-hero`/`-audacious` tail) is INERT on a page literally ABOUT geometric proportion. The radii ladder IS a proportional sequence — it is begging for one giant `pill` or `2xl` specimen rendered at `text-display`-scale as the page's hero gesture.
- **Two equal-weight rows = no hierarchy.** "Scale" (the raw token ladder) and "Semantic aliases" (the role-named ladder) are rendered IDENTICALLY — same swatch size, same grid, same caption rung. But these are NOT peers: Scale is the primitive vocabulary, Semantic is the applied vocabulary. A world-class page makes Scale the QUIET reference strip and Semantic the LOUD applied showcase (real cards/buttons/docks wearing their radius), or vice-versa — never two clones stacked.
- **The 80×80 swatch is too small to read shape.** At `h-20 w-20` (80px), `rounded-xs` (2px) vs `rounded-sm` (4px) vs `rounded-md` (6px) are visually INDISTINGUISHABLE in the capture — the first three squares read as the same square. The whole POINT of the page (you can SEE the radius difference) fails at this scale. The corner is the content; the corner needs to be BIG.

## 2. AFFORDANCE — zero interactive cues, and that's a missed teaching opportunity

- Every swatch is a dead `<div>`. There is no hover, no click-to-copy the token, no cursor change, no focus ring. A token-tour page's PRIMARY affordance should be **click-to-copy** (`rounded-card` → clipboard) with a tooltip — the affordance-map.md interaction vocabulary (the five primitives) is entirely absent here.
- The semantic aliases name real components ("cards", "buttons", "glass pill dock") but show ABSTRACT squares, not the components. A designer reads "dock — glass pill dock" beside a cream square and learns nothing. The affordance to LEARN (hover the `dock` swatch → it morphs into an actual mini `<GlassDock>` silhouette) is the whole game and it isn't played.

## 3. ANIMATION AFFORDANCE — fails the iOS-27 bar hard

- The page has ONE animation: the `.scroll-cascade` entrance (a single coupled transform+opacity build). After that, the page is **frozen**. The user's bar is "HIGH animation affordance for EVERY component." Here: zero hover, zero press, zero state, zero ambient life.
- This is the most damning gap given the SUBJECT. Radii are a SHAPE axis; shape transitions are the single most satisfying thing CSS `@property`-typed `border-radius` interpolation can do. A live `border-radius` morph sweeping `xs → pill` on a `--spring-bouncy` clock (DESIGN.md §L2) — a square liquefying into a circle — would make this page unforgettable. Instead the corners are static. The `--spring-snappy`/`--spring-bouncy` vocabulary the library SHIPS is unused on the one page where shape-spring is the literal topic.
- No press-squish (W-PRESS-UNIFY `useSpringPress`), no `useLiquidFlex` volume-preserving squish, no specular catch-light tracking (W-LIQUIDHOVER tier-root auto-arm). The swatches are `bg-card` divs, not glass surfaces, so they cannot even RECEIVE the liquid-hover gleam.

## 4. POLISH + DISTINCTIVENESS — reads generic-AI-template

- Cream squares with a faint cartoon shadow on a cream plate. Take away the `ℱ` dock and this could be ANY design-system token page from a Tailwind starter. It is the OPPOSITE of bespoke. The DESIGN.md six-layer Liquid Glass composite (backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain) is NOWHERE — the swatches are flat-shaded plastic, exactly the "iOS-7-flat, not iOS-26-liquid" failure DESIGN.md §L1 names.
- **GLASS is not demonstrated on a glass-library's own foundation page.** The swatches are OPAQUE `bg-card`. The user's explicit bar — "glass demos over COLORFUL aurora backgrounds" — is violated: there is no aurora (the row inherits `paper`), and the swatches are opaque, so even if there WERE an aurora, nothing would transmit it. A radius is the SILHOUETTE of a glass tile; it should be shown as a glass tile over live color so the corner reads as a lit liquid edge.
- The single flat outer card is the "everything in one undelimited slab" anti-pattern. The user explicitly asks: **each sub-section in its OWN glassy card**. Currently both sections share one `resting` plate separated by a hairline.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Glass tier ladder unused.** DESIGN.md promulgates 7 tiers; this page uses exactly one (`resting`, the outer card) and demonstrates none of them. A radii page is the natural place to show each semantic alias ON its real tier (card=`resting`, panel=`quiet`, dialog=`overlay`, dock=`dock`) so radius AND tier read together.
- **Paper morphism half-present, glass morphism absent.** The `paper-grain-overlay` wash is there (faint), but the GLASS half — the six-layer composite — is entirely missing from the specimens. The page should show GLASS+PAPER as a deliberate pairing: paper-backed reference strip, glass-tile applied showcase.
- **Dock APIs entirely unleveraged.** The user names this specifically: "leverage the dock APIs (contextual switching/animating)." The radii page has the perfect use: a `<DockStack mode="facets">` or `<DockLayerGroup>` to switch the showcase CONTEXT (Scale ↔ Semantic ↔ live-component-preview), with the dock's morph/contextual-switch animating between views. Zero dock composition exists on the page beyond the global nav dock.

## 6. SPACING / RHYTHM (golden-ratio) + COLOR (suffusion proportion)

- The `gap-4` flat grid is uniform 1:1 — no √φ block rhythm (W-CARD-PAD ships a sqrt-φ padding ladder the page ignores). The main card area is NOT bigger as the user asks — it's a fixed slab with generous dead margin around it; the content under-fills its own plate.
- COLOR: the suffusion proportion (AZ.W-SUFFUSE, ONE deliberate color event per surface) is UNDER-spent here to the point of being absent — the page is monochrome cream. A foundations page is allowed its ONE event: the `--section-color` ramp or a `<IconChip :section>` focal pop per section, or — far better — the COLORFUL aurora the user demands behind glass swatches, so the color event is the LIGHT the glass bends, not a tint.

---

## TOP DESIGN MOVES (concrete, prioritized)

1. **Put a COLORFUL aurora behind the page and make every swatch GLASS.** Change the manifest row from inherited `paper` to `aurora` (rose-indigo-amber). Re-render each radius specimen as a real `glass-resting`/`glass-floating` tile (the six-layer composite, DESIGN.md §L1) over the live field, so the corner reads as a LIT liquid edge transmitting color — the literal "glass demos over colorful aurora" mandate. (§4, §5)
2. **Each sub-section in its OWN glassy card, and make the canvas BIGGER.** Split "Scale" and "Semantic aliases" into two distinct `<Card tier="floating">` glass plates (the user's explicit ask), each filling more width; retire the single flat slab. Differentiate weight: Scale = quiet reference strip, Semantic = loud applied showcase. (§1, §4)
3. **Animate the SHAPE — the page's reason to exist.** Add a live `border-radius` morph: a hero specimen that liquefies `xs → pill` on a `--spring-bouncy` clock (`@property`-typed interpolation), and per-swatch hover that springs the corner up one rung with a `useLiquidFlex` squish + W-LIQUIDHOVER specular gleam. This is the iOS-27 moment the page is missing. (§3)
4. **Leverage the dock APIs for contextual switching.** Compose a `<DockLayerGroup>` / `<DockStack mode="facets">` to swap the showcase context — Scale tokens ↔ Semantic aliases ↔ live-component preview (each alias wearing its radius on a REAL Button/Card/Dock) — with the dock's morph animating the transition. Turns the page into a deft series of glass-ui components, per the user's bar. (§2, §5)
5. **Typography-forward + click-to-copy affordance.** Promote ONE giant `pill`/`2xl` specimen to a `text-display`-scale hero gesture (use the audacious √φ tail the page abandons). Make every swatch click-to-copy its token (`rounded-card` → clipboard) with the affordance-map tooltip primitive — the token-tour's primary affordance. (§1, §2)
6. **Standardize the import-path label + tighten language.** Keep the Fira-Code `/foundations/radii` chip as the ONE canonical route-identity label (it's already there — make it the standard pattern across the deep-dive set). Tighten blurbs: "Radius tokens from xs to pill." → the swatches ARE the tokens; let a one-line caption carry it, drop redundant role prose into hover. (§6)
