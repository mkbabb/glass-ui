# foundations/colors — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page:** `demo/stories/foundations/colors.vue` · live `http://localhost:5173/foundations/colors`
**Lens:** the frontend-design skill bar (distinctive, production-grade, AVOID generic-AI) APPLIED to glass-ui's own language — DESIGN.md §L1–L5, design-idioms / motion-canon / affordance-map, the dock system.
**Captures:** `_cap-colors-{light,dark,dark-lower}.png` + `_cap-colors-full-light.png` (this dir), 1440×900, both modes.

This is the **color foundation page — the page whose entire subject IS color**: the 13-stop `--section-color` rainbow, the `--viz-*` basis hues, and the documentary role tokens. The bar is therefore specific and high: a page about color, in a system whose pitch is "warm cream + the 13-stop ramp + suffusion proportion," must itself be a masterclass in color-as-material. It currently reads as a **competent spec-sheet** — accurate, legible, monochrome-disciplined — but **not** as a bespoke glass-ui artifact, and it leverages **zero glass-ui components** on the page that exists to showcase the system's color primitives.

---

## What is already RIGHT (do not regress)

- **The monochrome discipline is correct + on-doctrine.** The core role grid stays documentary-flat (warm-cream/role tokens are identity, not a color event); the rainbow leads as the focal moment (W-DEMO-DESIGN). This is the one-color-event proportion respected — the SFC comments earn their length here. Do NOT "fix" the role grid by tinting it.
- **The viz-basis tiles are the page's one genuinely distinctive move.** The display-register letters `ℱ / T / P / A / G` at `text-display-2` (measured 53.3px), italic, `WONK 1 / SOFT 0`, each inked in its `--viz-*` hue with a 3px top accent bar — this is typography-forward, bespoke, and unmistakably glass-ui. It is the template the rest of the page should rise to.
- **The path label is the correct convention.** The chip reads `/foundations/colors` (the demo-route form, not `@mkbabb/glass-ui/...`) — correct, because this is a demo-only foundations page with no single exported component. It is already standardized for its kind; do not "fix" it to a `@mkbabb` subpath.
- **The √φ ladder is present at the page head.** "Colors" resolves a measured **109.7px** `text-display-4` `<h1>` (Plus Jakarta Sans, brand face) — audacious and correct as the page title.
- **The dark register is honest.** Swatches dim, `--primary` resolves the legendre-violet (W-DARK-MATERIAL), dividers survive as hairlines on `--configurator-divider`. No gray collapse.

---

## TOP design problems (ranked, opinionated, concrete)

### 1. THE GLASS DEMOS OVER NOTHING — no aurora field, so the §L1 lensing is inert (the headline mandate)
The single largest gap against the mandate ("glass demos over COLORFUL aurora backgrounds"). Verified: `document.querySelectorAll('canvas').length === 0`; the page background is `story-bg-paper paper-grain-overlay` — a **static warm-paper wash, not a colorful aurora**. The body sits in ONE `glass-resting` card (`backdrop-filter: blur(10px) saturate(1.05)`, `bg oklab(.934 .. / .664)`) — a real six-layer glass plate — but **there is nothing behind it to lens**. DESIGN.md §L1 is explicit: "Liquid Glass *bends and concentrates* light … glass-ui surfaces are lensing layers, not blur swatches." A blur over a flat paper sheet is the iOS-7-flat read the precept condemns; in **dark mode it is worse** — the card reads as a near-black slab on a dead void (`_cap-colors-dark.png`), the exact "charcoal slab on a dead void" failure W-DARK-MATERIAL was built to kill, re-introduced at the page-composition layer. The page about *color* shows its glass over the one backdrop with no color.
**Fix:** declare a **colorful `<Aurora>`** as the page background (the manifest `background` row → a live field, ONE GL context per route per the budget). The body glass card and every sub-section card then lens a real chromatic field — the §L1 composite demonstrated, not asserted. A color page over a color field is also thematically exact: the aurora can even seed from the `--section-color` ramp the page documents.

### 2. EACH SUB-SECTION IS NOT ITS OWN GLASSY CARD — the user-named structure ask is unmet (W-STORY-PAGE-STANDARD)
Verified: the three sub-sections (`Section ramp · 13 stops`, `Viz basis`, `Core roles`) are **bare `<section>` elements** — `hasGlassClass:false`, `backdrop-filter:none`, `background:transparent`, separated only by faint `story-sections--delimited` hairlines. The user mandate is explicit: "each sub-section in its OWN glassy card; the main card area BIGGER." Right now there is ONE outer plate and three undifferentiated transparent stacks inside it — the page reads as a single scroll of loosely-ruled lists, not as a composed set of glass specimens. The hairline-delimiter is the *minimum* (USER-DEFECTS §C "hr lines OR in different cards") — this page wants the **cards** arm.
**Fix:** promote each sub-section to its OWN glass card (the forthcoming `<DemoSpecimen>` sub-type / a `glass-quiet` or `glass-resting` inner plate), each lensing the aurora from move #1, each with its own header-rule + grain. Then enlarge the outer composition (the "main card BIGGER" ask): give the section-ramp specimen the dominant span (it is the focal artifact) with the viz-basis and core-roles as supporting cards — a bento rhythm, not a flat stack. Glass-cannot-sample-glass (§L1) is the constraint to respect: the inner cards and the outer card must share the ONE composition container, not stack two independent `backdrop-filter` plates — so the inner specimens should be `glass-quiet`/`veil` rungs composed inside the single outer container, or the outer drops its own filter and the children carry it.

### 3. ZERO GLASS-UI COMPONENTS ON THE PAGE — the "deftly uses a series of components" mandate is fully absent
Verified in the body: `dock:0, tabs:0, button:0, color-swatch:0`. **The page about color does not use `<ColorSwatch>`** — the library's own first-class color-input primitive (`@mkbabb/glass-ui/color-swatch`, BA.W-CONFIG-CHASSIS, the proportioned chip + hex affordance that exists precisely to "replace the raw `<input type=color w-full>` slabs"). Instead every swatch is a raw `<div :style="{ background: var(--section-color-N) }">` with `cursor:auto` and no interaction. This is the deepest irony on the corpus: the color-foundations page hand-rolls dead color rectangles while the system ships a designed color primitive. The mandate ("docks / procedural-anims / cards / tabs / buttons") is met by `<StoryPage>` + `<StorySection>` + `<ShowcaseFrame>` (three demo-chassis primitives) and zero library color/interaction components.
**Fix:** (a) render every rainbow stop + role token as a real `<ColorSwatch>` (the chip + hex readout + copy affordance — now the swatch is alive, click-to-copy, hover-lit, the four-state contract); (b) add a **`<SegmentedTabs>`** to switch the ramp's read between `hue · OKLCH · contrast-vs-paper` views (the tabs mandate, and genuinely useful for a color page); (c) leverage the **dock APIs** — a `<DockStack mode="facets">` whose facet chips ARE the token families (Section ramp / Viz basis / Core roles / Surface tints), each carrying its `--glass-accent` context hue (BE.W-DOCK-RAIL-REALIZE + BB.W-GLASS-ACCENT), contextually switching which specimen card is in focus. That single dock move satisfies the contextual-switching/animating headline AND makes the index navigable.

### 4. ANIMATION AFFORDANCE IS NEAR-ZERO — the page is inert against the iOS-27 bar (motion-canon P1–P6, §L3)
The mandate is "HIGH animation affordance for EVERY component." Measured state:
- **Swatches are dead** — `cursor:auto`, `transition:all` (the catch-all smell motion-canon flags), no hover, no press, no entrance. A color chip that cannot be clicked, copied, or lit on hover is the antithesis of "every element alive."
- **The viz glyph has `animationName:none`** — the `ℱ/T/P/A/G` letters, the page's best assets, are static. They should draw-on or spring-scale in on entrance (the SUFFUSE3 IconChip-reveal precedent, on the `--spring-snappy` clock).
- **The core-role frames** carry `transition: transform, translate, scale, rotate` and a 1px hover translate but **no `:active` scale-press** (§L3 mandates the `--scale-press` 0.96 squish for every interactive primitive — and these frames *look* liftable, so they advertise an interaction they don't deliver).
- The `.scroll-cascade` entrance IS wired (`animation: gl-cascade-build`, `animation-timeline: view()`) — good — but it is the only motion on the page, and it animates whole bare sections, not individual designed cards.
**Fix:** route every swatch through `<ColorSwatch>` (four-state + press-squish for free); give the viz glyphs a spring-clocked draw/scale entrance (P2/P3, `--ease-out` no-overshoot for the type, coupled opacity); add `:active scale(--scale-press)` to any liftable frame; stagger the rainbow stops on the cascade (already half-there via `--col`) so the ramp **assembles** stop-by-stop, a chromatic wave.

### 5. SUFFUSION + DISTINCTIVENESS — the rainbow is rendered too timidly for the page that pitches it
The 13-stop ramp is the brand's vibrant register and the focal artifact of this exact page, yet it is rendered as **76px-wide × 96px-tall flat rounded rectangles in a thin row** — pleasant, but it reads like any design-token export (Figma/Storybook generic). On the one page licensed to spend the full ramp, the stops deserve to be the hero: larger, glass-lensed (each stop a glass chip tinting the aurora behind it via `--glass-accent`), labeled with their OKLCH coordinates, and arranged with the √φ rhythm rather than a flat `gap-2` row. Right now the most colorful thing in the system is presented at its least distinctive.
**Fix:** make the ramp a **glass spectrum** — each stop a `<ColorSwatch>` (or a `--glass-accent`-rimmed glass chip) over the live aurora, larger, with the stop index + OKLCH readout in the mono-caption register, on the √φ block-over-inline padding ladder (BB.W-CARD-PAD). The viz-basis tiles already prove the page can be bespoke; bring the rainbow up to that bar instead of leaving it a token-export row.

### 6. SPACING/RHYTHM — competent but not golden; the head eats more than its share
At 1440×900 the real scroller is `scrollH 1478 / clientH 806` — the grid IS reachable (~670px scroll), so the fold is acceptable. But the rhythm is flat: the sub-sections are `gap`-stacked with no √φ relationship, the swatch grids use uniform `gap-2`/`gap-3`/`gap-4` with no card-padding ladder, and the outer card's generous `--card-pad-*` sqrt-φ ladder (present on the body card) is wasted because the inner content is a flat list. The "Colors" `<h1>` + blurb consume a tall band before the first specimen; the blurb ("Warm cream, 13-stop section palette, viz basis.") is fine but the section-ramp `<p>` repeats "the brand's vibrant register; the role tokens below stay documentary-monochrome" — internal-doc framing in visible copy.
**Fix:** apply the BB.W-CARD-PAD sqrt-φ ladder to the inner specimen cards (from move #2); tighten the section-ramp prose to one line (the documentary-monochrome rationale is a code comment, not visible copy — see #7).

### 7. SUPERFLUOUS LANGUAGE (user-named, minor)
- Section-ramp prose: "The brand's vibrant register; the role tokens below stay documentary-monochrome." — the second clause is internal rationale leaking into the UI. Cut to: "The chapter palette — `--section-color-0..12`, exposed as `bg-section-N`." (one line, code-voiced).
- "Warm cream, 13-stop section palette, viz basis." (the page blurb) is fine — keep.
- The SFC comments are verbose but acceptable (they're code). The visible copy should be ruthless: a color page speaks in swatches, not paragraphs.

---

## The top design moves to make this page EXCEPTIONAL

1. **Declare a colorful `<Aurora>` page background** (seeded from the `--section-color` ramp the page documents) — so every glass surface lenses a real chromatic field (§L1). ONE GL context per route. Nothing else reads as glass-ui until the glass has something to bend.
2. **Promote each sub-section to its own glassy specimen card** (W-STORY-PAGE-STANDARD `<DemoSpecimen>`), sharing the ONE composition container (glass-cannot-sample-glass, §L1), with the section-ramp card as the dominant bento span — the "each sub-section its own card; main area BIGGER" ask, with √φ padding (BB.W-CARD-PAD).
3. **Render every swatch as `<ColorSwatch>`** (the library's own color primitive the page ironically omits) — click-to-copy, hover-lit, four-state + `--scale-press` squish (§L3), each a `--glass-accent`-rimmed glass chip over the aurora. The dead `<div>` rectangles become alive, distinctly-glass-ui color tiles.
4. **Introduce a `<DockStack mode="facets">` family switcher** (Section ramp / Viz basis / Core roles / Surface tints) with per-facet `--glass-accent` context hues (BE.W-DOCK-RAIL-REALIZE + BB.W-GLASS-ACCENT) — the contextual-switching/animating dock mandate, made literal on a color page.
5. **Give the viz-basis glyphs + the rainbow stops their signature entrance** — spring-clocked draw/scale-in on `--spring-snappy` (P3 coupled opacity), the ramp assembling stop-by-stop as a chromatic wave; add `<SegmentedTabs>` to toggle hue / OKLCH / contrast views (the tabs mandate + real utility).
6. **Tighten the visible copy** — one-line section-ramp prose, the documentary-monochrome rationale demoted to a code comment. A color page speaks in swatches.

---

## Verdict (5 lines)

1. The monochrome discipline (documentary role grid + focal rainbow) and the bespoke viz-basis display-glyph tiles (`ℱ/T/P/A/G` at 53px, hue-inked, accent-barred) are genuinely on-doctrine and world-class — but they are the page's only distinctive moves.
2. The headline mandate fails: there is NO aurora (`canvas.length===0`, background is static `story-bg-paper`), so the body's real `glass-resting` plate lenses nothing — the §L1 lensing precept is inert, and in dark mode it reads as a charcoal slab on a void.
3. The "each sub-section its own glassy card" + "main area BIGGER" structure ask is unmet: the three sub-sections are bare transparent `<section>`s separated by hairlines, not cards.
4. The page about color leverages ZERO glass-ui components (dock/tabs/button/color-swatch all 0) — it hand-rolls dead `<div>` swatches while omitting the system's own `<ColorSwatch>` primitive; animation affordance is near-zero (swatches `cursor:auto`/`transition:all`, viz glyphs static, no §L3 press-squish).
5. Net: an accurate, disciplined spec-sheet that is not yet a bespoke glass-ui artifact — CONVERGENCE ~35%; needs aurora-field + per-section glass cards + `<ColorSwatch>`/dock/tabs composition + the entrance/press affordance before the color-foundations page itself demonstrates the color system it documents.
