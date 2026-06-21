# Liquid playground — dock-demo subsumption plan

_The user's ask: "This playground should plan to subsume our current dock demo set in
the storybook, congruent with our actual story book pages." This maps each existing
dock story to the playground's coverage so the subsumption is honest, not a silent
prune. NON-binding plan — execution awaits greenlight._

## The playground today (`demo/stories/dock/liquid-playground.vue`)

One `useLiquidMorph` + one `useLiquidRail`, real glass-ui primitives, over a live aurora.
Verified desktop + mobile (390px), light + dark, PRM-safe. Modes: **expand** (→ Maps
Places sheet), **split** (goo arm at θ), **union** (N→1), **now-playing** (→ Apple Music
player); the **rail** carousel-stack section; the **orientation** (V⇄H) toggle.

## Coverage matrix — the 7 dock stories

| story | facility | playground coverage | verdict |
|---|---|---|---|
| `morph-showcase.vue` | V↔H orientation morph | **orientation toggle** (V⇄H, verified) | **SUBSUMED** |
| `rail.vue` | DockRail divider-seam strip | **liquid-rail** carousel-stack (a DISTINCT, richer rail) | PARTIAL — the liquid-rail is a superset carousel; the DockRail's divider-seam anchor is not yet ported |
| `overview.vue` | nav-pattern dock (home-left, separators, nav items) | — | NOT COVERED (the playground is a morph showcase, not a nav dock) |
| `layers.vue` | DockLayerGroup multi-layer + switcher rail | — | NOT COVERED |
| `sections.vue` | DockSection tripartite chassis | — | NOT COVERED |
| `dock-search.vue` | the dock fuzzy-search facility | — | NOT COVERED (the player is the closest analogue) |
| `cta-receive.vue` | external CTA morphs INTO a dock control | — | NOT COVERED (`useDockCtaReceive`, a distinct seam) |

## The honest conclusion

The playground **adds** a liquid-morph control-interface showcase and **subsumes**
`morph-showcase`; it is currently **additive**, not a full replacement for the dock demo
set. The 5 NOT-COVERED stories demonstrate distinct dock FACILITIES (nav pattern, layers,
sections, search, CTA-receive) the morph playground does not exercise.

**Two honest paths to full subsumption (user's call):**

1. **Extend the playground** to also host the nav/layers/sections/search/cta facilities
   as additional sections (so it becomes THE comprehensive dock page) — a larger build,
   then retire the 5 stories.
2. **Keep the facility stories**, position the playground as the LEAD liquid-morph story
   (already registered first), and retire ONLY `morph-showcase` (genuinely subsumed by
   the orientation toggle).

Path 2 is the smaller, lower-risk move and is recommended as the first step; Path 1 is
the full subsumption the ask names, sequenced as its own focused effort.

## Productionization (the other track)

These demo composables (`useLiquidMorph`, `useLiquidRail`) are PROTOTYPE-grade (the morph
animates `width/height`; a library primitive needs the compositor-safe reserve+scale).
The specced **BE tranche** (39 waves, `docs/tranches/BE/`) is the path to land them as
hardened, gestalt-gated library primitives. Greenlight-gated.
