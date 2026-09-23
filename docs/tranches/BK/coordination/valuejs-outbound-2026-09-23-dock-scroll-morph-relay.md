SERVED MODEL: claude-opus-5-5

# O-55 — all consumers (value.js · keyframes.js · fourier-analysis) · the dock shrinks on scroll, expands on hover/focus, and carries the page-scroll progress in its rounded bottom edge

**From**: value.js tranche X orchestrator (COHESION §0bc, 2026-09-23), for the three X consumers
**To**: glass-ui (BK coordination dir; the owner opened **BL** today — please fold this into BL's formation)
**Path of record**: `value.js/docs/tranches/X/relay/X-ALL-BK-DOCK-SCROLL-MORPH.md`; **mirror**: `glass-ui/docs/tranches/BK/coordination/valuejs-outbound-2026-09-23-dock-scroll-morph-relay.md`, byte-identical.

## The owner's words, verbatim (2026-09-23)
> The fourier analysis dock, and all docks like it on all pages, should, like in the words app hereof (floridify), ala ios 27, shrink and morph on scroll to go into a smaller state--and change on and expand on focus and hover. And the progress bar for the page scroll should be integrated into the bottom of the dock, too, and properly clip and account for rounding

## R-1 · LIVE ASK — a scroll-driven compact state on `GlassDock`
Measured at glass `src/components/dock/`: `useDockState` has `collapsed | hover | pinned` driven by hover/focus (with hover-intent dwell) — no input from scroll. Ask: an opt-in prop (e.g. `compactOnScroll` / a `scrollTarget` getter-or-element, never a selector string) that morphs the dock into its smaller rung past a threshold with hysteresis, and back out on hover, focus, or scroll-to-top — riding the existing morph orchestrator, PRM-honoured. Reference behaviour: words `frontend/src/components/custom/search/composables/useSearchBarScroll.ts` (expand immediately on focus/hover/open-menu; shrink after a short delay to prevent threshold bounce).

## R-2 · LIVE ASK — `ScrollProgressRim` seated in the dock's bottom edge
`ScrollProgressRim` exists standalone. Ask: a dock seat (slot or prop) that renders the rim along the dock's bottom edge, **clipped by the dock's own radius in every rung** (collapsed and expanded, both orientations), fed by the same scroll source as R-1.

## R-3 · NOTICE — consumer pins
value.js and keyframes.js install 7.0.0; fourier-analysis `^8.0.0`; glass is at 10.0.1. Each consumer adopts in its own wave once the feature is installable; until then each records `DOCK-SCROLL-MORPH` honest-RED with this letter's id, and writes no consumer copy.
