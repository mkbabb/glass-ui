# motion/typewriter — FRONTEND-DESIGN deep critique (BD page-deep)

**Page:** `demo/stories/motion/typewriter.vue` · live `http://localhost:5173/motion/typewriter`
**Lens:** world-class frontend-design (distinctive, production-grade, anti-generic-AI) applied to glass-ui's iOS-26/27 Liquid-Glass + paper north star (DESIGN.md, design-idioms.md, motion-canon.md, affordance-map.md).
**Captured:** desktop light, full-page + viewport. The constellation backdrop renders behind the StoryPage card; the controls section sits below the fold and is clipped (page never scrolls past the hero+CLI).

---

## VERDICT FIRST

This is a *spec sheet that happens to type*, not a typewriter *experience*. It reads as a competent but generic three-stack-of-bordered-boxes demo — exactly the AI-template silhouette the frontend-design skill warns against. The single TypewriterText is genuinely alive; everything around it is inert opaque cardboard. The page violates four of its OWN house precepts on the surface I can see: the **glass-first canon (AX.W54)** — every box is `bg-card`/`bg-background/50`/`bg-card/60` opaque, ZERO glass tier; the **double-`<h1>` suppression (D1-4)** — the chrome `<h1>` "Typewriter" AND the in-card violet "Typewriter" both render, the exact inversion the StoryHeader cluster (BB.W-HIERARCHY2) was built to kill; the **suffusion one-color-event rule** — fine here, but the hero card hosts the violet WITHOUT any aurora/constellation reading through it (the demo brief's "glass over COLORFUL aurora" is unmet); and the **import-path label** is doing chrome work it shouldn't. The user's seven asks land almost entirely unaddressed by this SFC.

---

## 1. VISUAL HIERARCHY — the eye lands twice, then nowhere

- **The double-title is the cardinal defect.** Two "Typewriter" wordmarks stack within 400px of vertical space: the StoryPage chrome `<h1>` (black, `text-display`-scale) and the section `<header>`'s violet `text-display-3`. The eye lands on the black one, re-lands on the violet one, and registers redundancy, not richness. This is **D1-4 (the double-`<h1>` suppression)** and **BB.W-HIERARCHY2 (the StoryHeader cluster, reading-order eyebrow→title→blurb)** both unhonored. The fix is canonical and already shipped: this page must render its hero `<h1>` as the StoryHeader cluster ONCE — either let StoryPage own it (`variant="page"`) or suppress the chrome header — never both. Right now the SFC hand-rolls its own `<header>` with a `section-label` + a violet `text-display-3` span, duplicating the chrome.
- **The hero phrase IS the right protagonist** — "Built on _audacious type_" at `text-display-3` is the correct typography-forward move, and the violet-on-warm-cream reads. But it is the ONLY thing in the visual hierarchy doing work. Below it the CLI row and the controls grid are flat `text-small`/`text-admin-label` — there is no mid-tier. The page goes display → caption → controls with no √φ step between, so the rhythm collapses.
- **The audacious ladder is under-used.** The brief is explicit: *typography-forward, the audacious sqrt-φ ladder*. The page uses exactly two rungs (`text-display-3` ×2, `text-small`/`text-admin-label` for the rest). The typewriter component is a TYPE showcase — it should walk the ladder: the hero phrase deserves `text-display-2` or `-mega` for a true poster moment, and the section labels should be the `text-mono-caption` eyebrow register (BB.W-EYEBROW-UNION), not the ad-hoc `text-admin-label text-muted-foreground` it currently is.

## 2. AFFORDANCE — adequate, but the controls are an afterthought

- The two `<Slider>`s + two `<Switch>`s + one `<Button variant="secondary">` are correct house controls with clear affordance — that part is fine. But they're crammed into one `bg-card/60` box below the fold (clipped on a 1080p viewport), so the page's interactive surface is *invisible on first paint*. A demo whose whole point is "tune the typing" hides its tuning.
- The "Restart" button is `variant="secondary"` — the calmest possible CTA for the page's single most-meaningful action (re-run the animation). It should be the focal `primary-audacious` glass CTA (the calm glass-first register, BA.W-GLASS-CAL H2a), seated where the eye lands.
- **No dock leverage.** The brief asks to *leverage the dock APIs (contextual switching/animating)* and *deftly use a series of glass-ui components (docks/cards/tabs/buttons)*. This page uses Slider/Switch/Button/Label and nothing else. There is no `<GlassDock>`, no `<DockStack>` contextual rail, no `<SegmentedTabs>` to switch between the hero/CLI/code registers. The controls *should* live in a dock — a contextual control dock floating over the aurora, morphing as you switch which surface you're tuning.

## 3. ANIMATION AFFORDANCE — one component alive, the rest dead

This is the biggest gap against the **iOS-27 bar (motion-canon P1-P6)**. Inventory:

- **TypewriterText**: alive (it's the demo). Good.
- **Cards/sections**: ZERO entrance. No `.scroll-build` page-build, no `.scroll-cascade` section cascade (BB.W-SCROLL-MOTION). The three boxes just *exist* on paint. Every glass-ui StoryPage is supposed to assemble itself chrome→hero→body on the spring-snappy clock; this one is static.
- **Hero card**: no hover, no press, no liquid-reveal bloom. It's a `shadow-cartoon paper-grain-overlay` box — paper morphism is present (good, the grain), but the glass half of "GLASS + PAPER morphism both" is entirely absent and there is no `useLiquidReveal` / `.glass-reveal` entrance.
- **Controls**: Slider/Switch carry their own micro-interactions, but the grid itself has no reveal, no `.scroll-cascade`, no stagger.
- **The `--motion-accent` violet is static.** On the `/motion` family the accent is the ONE color event — but here it never *moves*. The motion page about typing motion has a still accent.

Per **motion-canon P2 (enter-bouncy)** and **P3 (fade-coupled-to-transform)**, every card here owes a coupled transform+opacity entrance on `--spring-snappy` + `--spring-snappy-duration`, staggered. None have it.

## 4. POLISH + DISTINCTIVENESS — generic-AI silhouette

Honest read: **three stacked rounded-bordered boxes with a control grid at the bottom** is the canonical "AI built me a component demo" layout. Nothing here says *bespoke glass-ui*. The distinctive house assets — the 7 glass tiers, the deep-glass refractive register (BB.W-DEEP-GLASS), the dock morph system, the procedural aurora/constellation backdrops, the metal-shimmer/seal flourishes — are all absent from this surface. The constellation IS rendering behind StoryPage, but the cards sit on OPAQUE plates that occlude it (the **BG-2 black-plate fix / ShowcaseFrame `tier="field"`** lesson: a glassiness demo over an opaque `bg-card` plate occludes the page substrate from the glass it demos). So the one premium asset on the page is wasted.

The `@mkbabb/glass-ui/typewriter` import-path pill in the chrome is a nice touch and SHOULD be the standardized label — but it currently competes with the eyebrow `MOTION · TYPEWRITER` and the two titles for the same corner.

## 5. iOS-27 / GLASS / PAPER NORTH-STAR FIDELITY — paper yes, glass no

- **Six-layer optical composite (DESIGN.md): 0 of 6 present on the cards.** No backdrop blur+saturate, no surface tint, no edge rim, no inner catch-light, no glass drop shadow (it's the cartoon offset stamp instead), grain only on the hero. These are `bg-card` opaque plates. For a flagship motion demo this is the wrong material entirely — it should be `.glass-floating` / `surface="glass"` cards over the live constellation, reading the W55 adaptive-legibility tint.
- **glass-cannot-sample-glass** is moot because there's no glass.
- **Paper morphism** is the one fidelity win: `paper-grain-overlay` + `shadow-cartoon` on the hero reads as the warm-cream paper register. Keep it — but as the PAPER tier alternative to glass, deliberately, not as the only material.

## 6. SPACING / RHYTHM — flat, not golden

- The card uses `min-h-48 px-8 py-12` — hand-set, not the **golden card+overlay padding ladder (BB.W-CARD-PAD)** (`--card-pad-inline` + the √φ `--card-pad-block`). Same for `p-5`/`px-4 py-3` on the other boxes — all ad-hoc spacing off the φ ladder.
- The user explicitly asks: *each sub-section in its OWN glassy card; the main card area BIGGER (more screen space)*. The hero IS big-ish (`min-h-48`) but the page wastes the top third on the double-title + import pill, and the controls are clipped below the fold. The hero should dominate the viewport.
- Vertical rhythm between sections is the StoryPage default gap — fine, but with no cascade entrance it reads as uniform stacking, not cadence.

## 7. COLOR / SUFFUSION — correct restraint, unrealized opportunity

- The one-color-event rule (the `/motion` violet `--motion-accent`) is honored: violet on the title + the typed word, ink everywhere else. Good — `proof:suffuse` would pass.
- BUT the demo brief wants *COLORFUL aurora backgrounds*. The page sits on the calm constellation (per the `motion→constellation` CATEGORY_DEFAULT_BG, BA.W-STAGE) — monochrome dots, not colorful aurora. For a flagship typewriter motion page, an actual `<Aurora>` field (warm-cream identity, offscreen-paused, one-GL-per-route) behind glass cards would deliver the "glass demos over colorful aurora" the brief names — and give the violet something to glow against.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Kill the double-title; adopt the StoryHeader cluster (D1-4 / BB.W-HIERARCHY2).** ONE hero `<h1>` as the eyebrow→display-title→blurb gravity-rise cluster. Standardize the `@mkbabb/glass-ui/typewriter` pill as the single import-path label in the cluster, retire the duplicate `MOTION · TYPEWRITER` eyebrow-in-card.

2. **Re-material every card to glass over a live aurora (AX.W54 glass-first + BG-2 field-plate + BA.W-STAGE).** Swap `bg-card`/`bg-background/50`/`bg-card/60` → `surface="glass"` `.glass-floating`/`.glass-quiet` tiers, drop an `<Aurora>` (or keep constellation but un-occlude it) behind, so the glass reads as liquid glass over a colorful field — the six-layer composite finally paints. Keep ONE card on the paper tier (grain + cartoon shadow) as the deliberate PAPER counterpoint, satisfying "GLASS + PAPER both".

3. **Make every element alive (motion-canon P1-P6).** Wrap the section column in `.scroll-build` + `.scroll-cascade` so the page assembles itself; give the hero card a `useLiquidReveal` bloom; couple the violet accent to a subtle motion. Each sub-section enters staggered on `--spring-snappy` + its duration clock. Animation affordance for EVERY component, per the brief.

4. **Move the controls into a contextual dock (the dock-API ask).** Replace the bottom `bg-card/60` grid with a floating `<GlassDock>` (or `<DockStack mode="facets">`) carrying speed/error/cursor/blink + Restart, morphing/contextual-switching between the hero, CLI, and a NEW code-register surface via `<SegmentedTabs>`. This leverages the dock contextual-switching/morph APIs the brief names, unclips the controls, and demonstrates "a series of glass-ui components deftly composed".

5. **Promote the type ladder + the Restart CTA.** Walk the audacious √φ ladder (hero phrase to `text-display-2`/`-mega` for a true poster), use the `text-mono-caption` eyebrow canon (BB.W-EYEBROW-UNION) for labels, adopt the BB.W-CARD-PAD golden padding, and make Restart the focal `primary-audacious` glass CTA seated where the eye lands — the page's single most-meaningful action deserves the loudest calm-glass affordance.
