# foundations/intro — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page:** `demo/stories/foundations/intro.vue` · live `http://localhost:5173/foundations/intro`
**Lens:** the frontend-design skill bar (distinctive, production-grade, AVOID generic-AI) APPLIED to glass-ui's own language — DESIGN.md §L1–L4, design-idioms / motion-canon / affordance-map, the dock system.
**Captures:** `_cap-foundations-intro-{light,grid,mid,dark}.png` (this dir), 1440×900, both modes.

This is the **storybook front door — the D0 root of the whole title-size hierarchy** (CLAUDE.md BC.W-HERO-AUDACIOUS). It is the first impression of the entire system. The bar is therefore the highest on the corpus: this page must read as the thesis statement of "Glass, paper, and the golden ratio," not merely an index.

---

## What is already RIGHT (do not regress)

- **The hero typography is genuinely audacious + correct.** `text-display-mega` resolves a measured **177.4px** `<h1>` ("Glass, paper, and the golden ratio."), the √φ ladder's D0 peak. This is the single best move on the page — it is bespoke, confident, and exactly the typography-forward thesis DESIGN.md promises. Plus Jakarta Sans at this scale reads as a brand face, not a default.
- **The aurora backdrop is real + colorful, both modes.** Light is a pink→periwinkle→peach painterly drift; dark is a mauve→cobalt→amber luminous field. This is the "glass demos over COLORFUL aurora backgrounds" mandate satisfied at the substrate. The ONE-GL-per-route budget is honored (the chassis paints one aurora; the thumbs are inert).
- **The category cards ARE six-layer glass.** Measured `backdrop-filter: blur(10px) saturate(1.3) brightness(1.14)`, a translucent tint, a rim border, a shadow — the §L1 composite is present and the aurora reads THROUGH them (`glass-resting` + `paper-grain-overlay`). The 4-col bento with a `lead` span (Display wider) gives a lead/rest rhythm, not eight identical boxes.
- **The IconChip POP is alive.** Each card's chip carries `reveal` + `bloom` + a distinct `--section-color-N` hue — the one-color-event suffusion done right (warm-ink body, one chromatic event per card).
- **The Fira-Code subpath chip is present** (`@mkbabb/glass-ui/button` etc.) — the route-identity affordance.

---

## TOP design problems (ranked, opinionated, concrete)

### 1. THE HERO IS NOT GLASS — the page's thesis violates its own north star (§L1)
The single largest defect. The hero `<h1>` + eyebrow + prose sit **directly on the raw aurora with NO glass plate** — verified: `hero.closest('[class*="glass-"]') === false`, the hero `<section>` is a bare `px-2 py-12`. The page that SAYS "Glass, paper, and the golden ratio" demonstrates **paper-less, glass-less raw text on a gradient**. This is the generic-AI-template tell: big type on a mesh gradient is the single most over-produced 2024 hero. DESIGN.md §L1 is explicit — every surface that wants to read as the system composes the six-layer composite; the front door is where that must be most true. The category grid below is glassy; the HERO, the focal moment, is not. The eye lands on un-plated text floating on color.
**Fix:** seat the hero cluster in its OWN hero glass card — `glass-resting` (or the opt-in `.glass-deep` for the maximal iOS-27 refractive read, BB.W-DEEP-GLASS) + `paper-grain-overlay`, with the rim + catch-light + shadow. The display `<h1>` reads THROUGH the plate over the live aurora — that IS the thesis (glass + paper + golden ratio, demonstrated, not asserted). Use the W55 `--glass-tint-*` bright-bucket so the warm-ink display type clears AA over the busy field (right now it relies on raw luminance luck — the "golden" of "golden ratio" already grazes the peach band in light mode).

### 2. EVERY ELEMENT IS STATIC — animation affordance is near-zero (motion-canon P1–P6)
The user mandate is "HIGH animation affordance for EVERY component." This page is almost inert:
- The hero `<h1>` has **no dedicated entrance** (`animationName: none`) — it rides only the generic page `gl-cascade-build`. The D0 hero of the entire storybook deserves the signature entrance: **`<SplitChars>` per-glyph stagger** (BC.W-SPLIT-CHARS, on the root barrel) or the W-HIERARCHY2 3-stage gravity-rise, on the no-overshoot `--ease-out` (the audacious title arrives with gravity, never bounces — motion-canon P2).
- The category thumbnails are **dead glyphs** — `.intro-cat-thumb` is a static `place-items: center` glyph over a 3% tint, `animationName: none`, `transition: all` (a non-specified catch-all, itself a smell). These are the page's biggest missed opportunity: the front door to *substrates / motion / dock* shows a **frozen lucide icon** where it should show a budget-safe taste of the destination. A user hovering "Motion" or "Dock" should feel the system breathe.
- Cards animate **only `transform, box-shadow`** on hover (a 1px translate) — there is no **press squish** (§L3 mandates `scale(0.96)` on `:active` for every interactive primitive; these are RouterLinks, fully interactive, and ship no tap-squish). No `useLiquidReveal` bloom on the card entrance either.
**Fix:** (a) hero → SplitChars or gravity-rise entrance; (b) thumbs → a per-category alive preview (a hover-engaged micro-aurora ramp, a CSS-only blob silhouette breath, a spring-driven icon parallax — compositor-only, PRM-carved, one-paint-at-rest); (c) cards → add `:active` scale-press (the §L3 universal squish) + a `useLiquidReveal`/`.scroll-cascade` staggered entrance so the grid assembles rather than appears.

### 3. SPACING/RHYTHM — the hero eats the fold; the grid is unreachable above the fold
At 1440×900 the hero `<h1>` + prose fill the ENTIRE first viewport and then some — the "the golden ratio." line and the blurb are below the fold, and the category grid (the page's actual UTILITY) requires a 600px+ scroll. A front-door index where you cannot SEE a single category without scrolling fails its job. The 177px peak is right for *impact* but wrong for *density at this viewport* — and the user explicitly asked "the main card area BIGGER (more screen space)," which here means the GRID deserves more of the fold, not the hero monologue.
**Fix:** tighten the hero to clear the fold — either drop the hero plate to a contained max-block-size so ≥1 grid row peeks (the iOS-27 large-title-that-invites-scroll), or make the hero + first grid row a single above-the-fold composition. Honor the golden-ratio spacing canon (BB.W-CARD-PAD: the sqrt-φ block-over-inline ladder) on the hero plate itself rather than the flat `py-12 md:py-20`.

### 4. NO DOCK API LEVERAGE — the mandate's headline is absent (the dock system)
The user mandate: "leverage the dock APIs (contextual switching/animating); each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)." The only dock on this page is the **demo SHELL's collapsed sidebar dock** (`demo-sidebar-dock … collapsed`) — incidental chrome, not a deliberate composition. The front door is the ideal stage for the dock as a HERO primitive: a `<DockStack mode="facets">` (BE.W-DOCK-RAIL-REALIZE) whose facet chips ARE the 11 categories, each carrying its `--glass-accent` context hue — clicking a facet contextually switches/navigates. That single move would (a) satisfy the dock-API mandate, (b) demonstrate the contextual-switching/morph the page is supposed to advertise, and (c) make the index itself a glass-ui composition rather than a plain bento grid of `<RouterLink>`s.
**Fix:** introduce a real dock composition — either a `<DockStack mode="facets">` category switcher seated against the hero, OR keep the bento grid AND add a contextual dock that morphs as you hover categories (the W-DOCK-MORPH-FAMILY chrome-continuous morph). The page should "deftly use a series of glass-ui components"; right now it uses StoryPage + SectionPreviewCard + IconChip — three — and demonstrates zero procedural-anim, zero tabs, zero buttons, zero dock-as-feature.

### 5. POLISH / DISTINCTIVENESS — the grid reads generic; the suffusion is timid
The bento grid is competent but currently reads closer to a generic admin-template card grid than a bespoke glass system: uniform 7rem inert thumbnails, identical card heights (save the lead span), a flat caption stack. The §L1 grain overlay is present but the cards lack the per-card distinctiveness the system can afford — the section hue lives ONLY in the tiny IconChip, so at a glance all 11 cards are the same warm-cream plate. The suffusion proportion is *under*-spent here, not over: one chip-sized color event per card on a page whose entire pitch is "the 13-stop section-color ramp."
**Fix:** let each card's hue suffuse one more channel within proportion — the `--glass-accent` per-instance chromatic RIM (BB.W-GLASS-ACCENT) keyed to the card's `--section-color-N`, so the *rim + catch-light* carries the category hue (still one color event, the AA-safe whisper, never a plate fill). The grid becomes a warm spectrum of glass tiles, each lit by its own context hue — distinctly glass-ui, impossible to mistake for a Tailwind starter.

### 6. PATH-LABEL STANDARDIZATION (cross-cutting, user-named)
The subpath chips show `@mkbabb/glass-ui/button`, `@mkbabb/glass-ui/dock`, etc. — the EXPORTED-component convention, correct here. But note `dock` maps to `@mkbabb/glass-ui/dock` while the dock category LANDING is a demo route; confirm the front-door chips all use the ONE convention (exported `@mkbabb/glass-ui/<subpath>` for real exports; a demo-only `/cat/slug` for non-exports). This page is the reference for the standard — it must be exemplary.

### 7. SUPERFLUOUS LANGUAGE (user-named, minor)
- The eyebrow `ℱ glass-ui · storybook` is good. The hero blurb "A design system built around warm cream, cartoon offset shadows, and the published Plus Jakarta Sans brand face for prose and ornament. Tailwind-native, Vue 3.5, reka-ui primitives under the hood." is **two sentences doing the work of one** — "published … brand face for prose and ornament" is internal-doc language. Tighten to one confident line: the under-the-hood stack belongs in a chip row or footer, not the hero. The SFC's prose comments are also verbose (fine — they're code comments — but the visible copy should be ruthless).

---

## The top design moves to make this page EXCEPTIONAL

1. **Seat the hero in a glass-deep card over the aurora** (§L1 six-layer + `.glass-deep` BB.W-DEEP-GLASS + `paper-grain-overlay`) — the thesis demonstrated, not asserted. This is move #1; nothing else matters until the hero is glass.
2. **Give the hero its signature entrance** — `<SplitChars>` per-glyph gravity-stagger on `--ease-out` (no overshoot, motion-canon P2). The D0 title must arrive like the system's opening statement.
3. **Make the category thumbs alive + tasteful** — a per-category compositor-only micro-preview (hover-engaged, PRM-carved, one-paint-at-rest), replacing the dead glyph. The front door should preview the destination's energy.
4. **Introduce the dock as a feature** — a `<DockStack mode="facets">` category switcher with per-facet `--glass-accent` context hues (BE.W-DOCK-RAIL-REALIZE + BB.W-GLASS-ACCENT), satisfying the contextual-switching/animating mandate and making the index a real composition.
5. **Suffuse each card's RIM with its section hue** (BB.W-GLASS-ACCENT per-instance chromatic rim) + add the §L3 press-squish to every card — the grid becomes a distinctly-glass-ui warm spectrum, alive on press.
6. **Re-balance the fold** — tighten the hero so ≥1 grid row peeks above the fold (the iOS-27 large-title-invites-scroll), honoring the BB.W-CARD-PAD sqrt-φ ladder on the hero plate. Tighten the blurb to one line.

---

## Verdict (5 lines)

1. The hero typography (177px `text-display-mega`) + the colorful both-mode aurora are world-class — but the HERO TEXT IS NOT GLASS (`closest('.glass-*') === false`), so the page that preaches "Glass, paper, golden ratio" demonstrates raw type on a mesh gradient — the generic-AI hero tell, and the #1 fix.
2. Animation affordance is near-zero against the iOS-27 bar: the D0 hero has no entrance, the 11 category thumbs are dead static glyphs, and the cards ship no §L3 press-squish — "HIGH animation for EVERY element" is unmet.
3. The dock-API mandate is entirely absent (only the incidental collapsed shell dock); the page uses ~3 components and demonstrates zero procedural-anim/tabs/buttons/dock-as-feature — far below "deftly uses a series of glass-ui components."
4. Spacing fails the fold (177px hero eats the whole first viewport; the grid — the page's utility — needs a 600px scroll), and suffusion is UNDER-spent (one chip-sized color event per card on the page that pitches the 13-stop ramp).
5. Net: a strong typographic + substrate foundation undercut by a non-glass hero, static affordance, and an absent dock — CONVERGENCE ~40%; needs the glass-hero + entrance + alive-thumbs + dock-facet moves before it reads as the bespoke thesis of the system.
