# forms/slider — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/forms/slider.vue` · live `http://localhost:5173/forms/slider`
**Lens:** world-class frontend-design (distinctive, production-grade, anti-generic-AI), measured against `DESIGN.md` (the iOS-26/27 Liquid Glass north star), `docs/precepts/{design-idioms,motion-canon,affordance-map}.md`, and the user's BD mandate.
**Captured:** 1440×900, both the top band (header + standard + viz-fourier + range) and the lower band (spectrum + disabled + matrix), light register. DOM-probed the computed paint of every `.slider-range`.

---

## TL;DR verdict

This page is a **flat spec-sheet stacked in one undifferentiated cream card**, and it is the single most damning counter-example to the entire library on the live site: it is a page *about glass* that contains **zero visible glass**. Every "glass" slider fill computes to an opaque charcoal slab (`oklab(0.216 …/0.88)`) because there is **no backdrop to refract** — the page rides the flat `grid`/`paper` substrate, not the colorful aurora the mandate demands. One of the six demo sections (`viz-fourier fill`) is **silently broken** — the section labeled "fourier red" paints the same charcoal as standard, a live binding no-op. The typography-forward √φ ladder is invisible inside the body (every sub-section header is the same 12px mono caption). Nothing is in its own card; nothing breathes; nothing animates beyond the page-build entrance; the dock is decorative wallpaper, not a participant. It reads **generic-AI-template**, not bespoke-premium.

---

## 1. The cardinal failure — glass with nothing behind it (DESIGN §L1)

`DESIGN.md §L1` is unambiguous: a Liquid Glass surface is a **six-layer optical composite** — backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain — and a primitive that omits a layer "reads as iOS-7-flat, not iOS-26-liquid." The standard slider's `.slider-range` *does* compose the layers correctly in source (`backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)`, `--glass-material-rim`, under-shadow). But on this page **layer 1 is dead**: the slider sits over a flat cream `ShowcaseFrame`/`StoryHero` plate, so `backdrop-filter` has nothing to bend. The DOM proves it — the fill computes to `oklab(0.216128 … / 0.88)`: a near-opaque dark bar. The "concentrated light" reading DESIGN §L1 calls the soul of the material is simply **absent**.

This is exactly the documented anti-pattern in CLAUDE.md's own glass-first canon: *"The glass blur is imperceptible over a flat substrate (nothing behind to blur) — the rich per-page backgrounds that make glass POP land in the page-redesign."* That redesign never reached this page. The user mandate — **"glass demos over COLORFUL aurora backgrounds"** — is the literal fix, and it is binding here above all other pages, because a slider's entire visual personality lives in its fill.

**The move:** stage the whole body over a live `<Aurora>` field (the `<DockStage>` precedent in `demo/stories/dock/DockStage.vue` — ONE shared, offscreen-paused aurora behind the column, one GL context per route per the budget). Drop each demo onto a transparent `tier="field"` host (BA.W-STAGE's BG-2 black-plate fix — `ShowcaseFrame tier="field"` already exists for exactly this). The instant a saturated aurora paints behind the cream, the `saturate(1.05) brightness(1.02)` channel comes alive and the charcoal slab becomes a translucent, backdrop-bending glass cylinder — the iOS-26 read the component was *built* for and has never once been allowed to show.

## 2. The silent binding no-op — a broken demo shipping live (memory: glass-ui binding verification)

Section 2 is labeled `viz-fourier fill` and captioned "Custom fourier-red fill via descendant selectors." It is supposed to demonstrate retinting the cylinder to the brand `--viz-fourier` red. **It does not.** The DOM probe returns the range bg as `oklab(0.216 …/0.88)` — identical charcoal to the standard slider — while `--viz-fourier` resolves to `oklch(0.579 0.201 30.4)` (a vivid red). The arbitrary-selector override `[&_.slider-range]:bg-viz-fourier` **loses** to the scoped `.slider-range { background: color-mix(in oklab, var(--slider-range-bg, var(--primary)) 88% …) }` and never paints. (The *track* override partially won — `0.5`-alpha cream — so the section half-applied, which is worse: it looks intentional.)

This is the precise failure class in MEMORY (`feedback_glass_ui_binding_verification`): a Tailwind/reka binding that vue-tsc + units pass but **only a live render catches**. A page demonstrating the library's own retint seam should not contain a dead retint. The correct idiom is already shipped and named: the standard fill reads `--slider-range-bg`, so the section should pass `:style="{ '--slider-range-bg': 'var(--viz-fourier)' }"` (token-first, the way the spectrum section already correctly drives `--slider-track-bg`) — **not** a specificity-fragile `[&_…]:bg-*` arbitrary selector that the scoped `background` shorthand outranks.

## 3. Visual hierarchy — the typography-forward ladder is squandered (DESIGN §Typography)

The page owns one genuinely beautiful typographic moment: the `Slider` chrome `<h1>` in the audacious display rung, with the Fira-Code `@mkbabb/glass-ui/slider` subpath chip beneath it. That is the StoryHeader cluster doing its job, and it is the *only* place the √φ ladder is visible.

Inside the body card, hierarchy collapses to a **monotone**: every sub-section header (`standard`, `viz-fourier fill`, `range · two thumbs`, `spectrum variant`, `disabled`, `variant × size matrix`) is the identical `.section-label` 12px uppercase mono caption. The per-row labels (`Volume`, `Balance`, `Price window`) are `text-small` (14px). The value readouts (`42%`, `65`, `$22 – $78`) are the same `text-mono-caption`. So the eye lands **nowhere** — there is no focal slider, no hero specimen, no rung that says "look here first." This violates the demo-design precept (`BB.W-DEMO-DESIGN`: the core panes are *designed specimens*, not flat spec-sheets) and the user's "TYPOGRAPHY-forward" bar.

**The move:** promote ONE specimen to focal — the standard "Volume" slider should be the hero of the page, rendered larger (`lg` size), over the aurora, with its value in a real display rung (`text-display-2`/`-3` tabular-nums, the fast.com-peg idiom CLAUDE.md reserves for metric values). The matrix/disabled/edge cases recede to a quieter rung. Use the `--type-subheading` (20.4px / 600) `<h2>` register (`StorySection heading`, AZ.W-HIERARCHY's canonical section rung) for the sub-section heads instead of six identical mono captions — the ladder has eight rungs; this page uses two.

## 4. Each sub-section in its OWN glassy card; the main area BIGGER (user mandate)

Today all six sections live in **one** `StoryHero` card, hairline-delimited (`story-sections--delimited`). The user is explicit: **"each sub-section in its OWN glassy card; the main card area BIGGER (more screen space)."** The current single-card-with-hairlines is the *undelimited gap-stack* the chassis was built to avoid, but at the wrong granularity — the fix for "sections blur together" was hairlines; the BD bar is a step further: each demo is its own `glass-resting`/`glass-quiet` plate floating over the aurora, with golden-ratio interior padding (the `--card-pad-*` φ-ladder, BB.W-CARD-PAD).

This also fixes the glass problem structurally: a card *over the aurora* is itself a glass surface that refracts, so the page becomes a **composition of nested glass plates** (the §L1 "glass cannot sample glass" rule respected via the single aurora composition container) rather than flat captions on cream. And it earns the BIGGER main area — the article is currently `--story-page-max-inline` bounded with vast dead margin (the left third of the viewport is empty grey gutter around the vertical dock); the body card should claim far more of the 1440px width, the demos breathing in a 2-column bento over the field rather than a narrow stacked column.

## 5. Animation affordance — static at the iOS-27 bar (DESIGN §L2/§L3/§L4, motion-canon)

Per `DESIGN.md §L3` ("**Tap-squish is universal.** Buttons squish. **Sliders squish.**") and `motion-canon.md` (every element ALIVE — entrance, hover, press, state), the iOS-27 bar is *high animation affordance for every component*. This page is **inert**:

- **Entrance:** the `.scroll-build` / `.scroll-cascade` page-build fires once on mount (good, the one alive thing) — but the sections are so visually flat the cascade reads as content simply appearing, not assembling.
- **Hover:** the source *has* a hover rim-lift (`:hover .slider-range { … 0 0 0 1px var(--surface-tint-8) }`) but over the flat substrate it is imperceptible — a 1px tint shift on a charcoal bar reads as nothing. No scale, no specular bloom, no cursor-following gleam (the `glass-specular-track` class is on the thumb but the standard thumb is invisible, so the W-LIQUIDHOVER pointer-gleam never shows).
- **Press:** `:active .slider-range { transform: scale(0.97) }` exists but is `--scale-press-btn` (0.97, the softer outlier) where `DESIGN §L3` makes 0.96 canonical, and again it is invisible without a live drag.
- **State:** `data-held` intensifies the rim — but there is no dock-hold demo wired on this page to *show* it.

**The move:** make every slider demonstrate its own life. The hero "Volume" slider's value should **count up** on mount (`useCountup`/`useAnimatedNumber`) into its display readout. The spectrum thumb should bloom its halo on hover with the specular gleam. The fill should carry a visible press-squish (0.96). And the page should *demonstrate the keep-dock-open contract* it advertises in its own blurb — a slider physically inside a `<GlassDock>` that holds the dock open mid-drag (the `demo/stories/compositions/dock-with-slider.vue` cross-substrate story exists; this page references "keep-dock-open" in its caption but never shows it — a demo that names a feature it doesn't exercise).

## 6. Leverage the dock APIs (user mandate)

The mandate: **"leverage the dock APIs (contextual switching/animating); each page deftly uses a series of glass-ui components."** Right now the only dock on the page is the demo *shell* dock (the vertical sidebar + bottom nav) — chrome, not content. The slider page should **compose** a dock as a first-class participant: a `<GlassDock>` housing the live "Volume"/"Balance" sliders as a media-transport / mixer strip (the canonical slider-in-dock case), with the keep-dock-open hold actually firing, and `DockLayerGroup` contextual-switching between the standard recipe and the spectrum color-picker recipe (the AZ contextual-dock pattern). That single move satisfies "leverage the dock APIs," "deftly uses a series of components," and the keep-dock-open demonstration at once.

## 7. Color & suffusion proportion (AZ.W-SUFFUSE)

The suffusion is *technically* correct — the forms-band `--section-color-3` teal is the ONE color event (the IconChip + the eyebrow tint + the border-left rail), body ink untinted. But the proportion reads **timid, not deliberate**: the teal lives entirely in a small header chip the eye skips past, and then the page is six charcoal bars on cream — a monochrome wash with one tiny teal dot. The "one color event" idiom is meant to be a *focal pop*, not a vestigial tag. Over the aurora, with a focal hero slider, the teal identity should carry through to the hero fill (`--slider-range-bg: var(--section-color-3)`) so the page's ONE color event *is the thing you came to see* — the slider — not a 36px chip in the corner. The broken `viz-fourier` red and the `viz-fourier→legendre→chebyshev` spectrum gradient are the only saturated color on the page and they're buried below the fold.

## 8. Spacing / rhythm (golden-ratio)

The inter-section rhythm is the tokenized `--story-page-section-gap` (fine). But within a section the `flex flex-col gap-3` is a flat 12px — no φ-relationship between the header→label→control→readout. The matrix grid (`gap-x-6 gap-y-5`) is arbitrary px, not on the φ ladder. The biggest rhythm failure is the **macro**: the body card's left edge starts a third of the way across the viewport (clearing the vertical dock) but the dock is only ~80px wide — leaving a vast dead grey gutter. The composition is unbalanced: narrow content column, huge empty margin, decorative dock floating in the void.

## 9. Polish & distinctiveness — does it look bespoke or generic-AI?

**Generic.** Strip the StoryHeader and this is indistinguishable from a default shadcn/Radix slider story: gray bars, mono captions, a stack of sections in a card. Nothing here says *glass-ui* — the one library whose identity is liquid glass over kinetic backdrops, audacious √φ type, paper+glass dual morphism, procedural aurora. The page has access to all of it (`/aurora`, the audacious ladder, the spectrum value.js gradient, the dock morph) and uses **none** of it as a designed composition. The lone spectrum gradient slider is the one moment of distinctiveness — and it's the fifth section, below the fold, the same size as everything else.

---

## TOP design moves (priority-ordered, concrete)

1. **Stage the body over a live `<Aurora>` field** (the `<DockStage>` pattern, one offscreen-paused GL context). This single move resurrects the dead glass on every slider — the charcoal slabs become refractive cylinders. *Without this, the page is a glass demo with no glass.* (DESIGN §L1, BA.W-STAGE, user mandate.)
2. **Fix the live binding no-op:** the `viz-fourier fill` section must drive `--slider-range-bg: var(--viz-fourier)` (token-first), not the losing `[&_.slider-range]:bg-*` arbitrary selector. A broken demo cannot ship. (memory: binding-verification.)
3. **Each sub-section in its OWN glass card** over the aurora, in a 2-column bento that claims the BIGGER main area the mandate demands — nested glass plates with φ interior padding (`--card-pad-*`), respecting the single-composition-container rule (§L1). (User mandate.)
4. **Promote ONE focal hero slider** (the "Volume" standard, `lg`, with a `text-display-2/-3` count-up value in the section-3 teal) so the typography-forward ladder and the suffusion color event *land on the protagonist*, not a corner chip. (DESIGN §Typography, AZ.W-SUFFUSE, BB.W-DEMO-DESIGN.)
5. **Make every slider ALIVE** at the iOS-27 bar: value count-up on mount, hover specular bloom, the canonical 0.96 press-squish, and a real `<GlassDock>` mixer strip demonstrating the keep-dock-open hold + `DockLayerGroup` contextual-switch between standard/spectrum recipes — satisfying "leverage the dock APIs" and the page's own keep-dock-open blurb. (DESIGN §L2/§L3/§L4, motion-canon, user mandate.)
6. **Tighten the prose & standardize the chip:** the inline-comment captions ("the section identity is the ONE color event") are internal-jargon leaking to the viewer — replace with terse user-facing copy. The `@mkbabb/glass-ui/slider` subpath chip is already correct/standardized (good); keep that pattern, drop the redundant `FORMS · SLIDER` eyebrow that repeats twice (chrome header AND in-card header).

---

### 5-line verdict
1. A page *about glass* with **zero visible glass** — every slider fill computes to an opaque `oklab(0.216 …/0.88)` charcoal slab because it rides a flat cream substrate with no aurora behind to refract (DESIGN §L1 layer-1 dead); the mandated colorful-aurora staging is the load-bearing fix.
2. The `viz-fourier fill` section is a **silent live binding no-op** — labeled red, paints charcoal — the exact vue-tsc-passes/only-render-catches class; it must drive `--slider-range-bg` token-first, not a losing `[&_…]:bg-*` arbitrary selector.
3. Hierarchy is **monotone** (the audacious √φ ladder appears only in the chrome `<h1>`; six identical 12px mono captions inside) — promote ONE focal hero slider with a display-rung count-up value carrying the section-3 teal event.
4. **Static at the iOS-27 bar** — sliders that DESIGN §L3 says must squish/bloom/track-the-pointer show nothing over the flat plate; wire entrance count-up, hover specular, 0.96 press, and a real keep-dock-open dock-mixer the blurb already promises.
5. Restructure to the BD mandate — **each sub-section in its own glass card** over the aurora in a 2-column bento that claims the BIGGER main area, leveraging `<GlassDock>`/`DockLayerGroup` contextual-switching — turning a generic-AI spec-sheet into a bespoke liquid-glass composition.
