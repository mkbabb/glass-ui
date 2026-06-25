# W-HEADER-SCALE — the storybook page header is 2× too large (halve it; add the dividing rule)

**Surfaced by:** the user (multiple times) — "The header text is too large — on all pages, it should be that size, but 2× smaller. There should be a dividing line on each page of the storybook below these header sections to have proper design hierarchy." Confirmed across the Pass-E gestalts (intro's 177px `text-display-mega` h1 eats ~70vh; fourier's `text-display-hero` wordmark pushes the studio below the fold; the oversized-hero recurs on 9/11 foundations + most categories).

## The defect
The `StoryPage`/`StoryHero` hero `<h1>` renders at the top display rungs (`text-display-mega` 177px / `text-display-hero` / `text-display-audacious` 352px) for EVERY page's chrome title — so the header consumes the entire first viewport, the demo is below the fold, and there is no hierarchy rule separating header from body.

## The fix (token/chassis, one edit → all pages)
1. The chrome page-title (`StoryHeader`/`StoryHero` `variant="page"`) drops ~2 display rungs — from `text-display-mega/hero` to ~`text-display-2/3` (the √φ ladder, ~½ the current size) — a SINGLE chassis edit (the audacious mega/hero/audacious tiers STAY for the metric/number HERO surfaces + a deliberate hero page's own `<h1>`, their fast.com-peg home — NOT the per-page chrome title). The CEILING rule (BB.W-DEMO-DESIGN) is re-pointed: the mega/audacious tiers activate ONLY on the metric value + a hero card's own title, never the chrome page-title.
2. A DIVIDING RULE below the header section (a `--border-hairline` rule / the `.story-header-rule`) — the design-hierarchy separator the user asks for, on every StoryPage.
3. Couple with W-STICKY-TITLE-CONDENSE (the scroll behaviour) + W-HIERARCHY2 (the cluster order/gravity).

## Gate
`proof:header-scale` (the chrome page-title resolves the ~½ rung, NOT mega/hero, off the StoryHeader; the dividing rule present on every StoryPage; the mega/audacious ceiling re-pointed to metric/hero-card only) + the π (the header clears ≤ ~½ viewport, the rule reads, both modes) + the `proof:ba-gestalt` per-page verdict. Folds into W-STORY-PAGE-STANDARD's conformity invariant #1.
