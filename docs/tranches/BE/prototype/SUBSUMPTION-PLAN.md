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
| `morph-showcase.vue` | V↔H orientation morph | **orientation toggle** (V⇄H, now ANIMATED — box reshape) | **PARTIAL** — CORRECTED: the orientation toggle was an instant SNAP (audit-caught), now fixed to animate the box reshape (232×64⇄64×232, spring-clocked). The playground NOW occludes the row⇄column flip too — via a mode-scoped content cross-fade ([data-reorienting] opacity dip) while the box reshapes, the cheap CSS-only version of morph-showcase's goo/View-Transitions occlusion. So the V↔H is now functionally equivalent (topology occluded both ways); the only delta is the VISUAL mechanism — morph-showcase's goo-MERGE is a richer specific visual than the playground's fade. Whether that goo visual is worth a dedicated story (keep) or the playground's crossfade-occluded V↔H is sufficient (retire) is your call — but it is now genuinely close to subsumed. |
| `rail.vue` | DockRail divider-seam strip | **liquid-rail** carousel-stack (a DISTINCT, richer rail) | PARTIAL — the liquid-rail is a superset carousel; the DockRail's divider-seam anchor is not yet ported |
| `overview.vue` | nav-pattern dock (home-left, separators, nav items) | — | NOT COVERED (the playground is a morph showcase, not a nav dock) |
| `layers.vue` | DockLayerGroup multi-layer + switcher rail | — | NOT COVERED |
| `sections.vue` | DockSection tripartite chassis | — | NOT COVERED |
| `dock-search.vue` | the dock fuzzy-search facility | — | NOT COVERED (the player is the closest analogue) |
| `cta-receive.vue` | external CTA morphs INTO a dock control | — | NOT COVERED (`useDockCtaReceive`, a distinct seam) |

## The honest conclusion

The playground **adds** a liquid-morph control-interface showcase and is **additive**, not
a full replacement for the dock demo set. CORRECTED (audit finding): the playground does
NOT fully subsume `morph-showcase` — its V↔H orientation is now ANIMATED (the box-reshape
fix) but does NOT occlude the row⇄column topology change the way morph-showcase's
goo-bridge / View-Transitions does, so morph-showcase remains the richer V↔H demo. The 5
NOT-COVERED stories demonstrate distinct dock FACILITIES (nav pattern, layers, sections,
search, CTA-receive) the morph playground does not exercise. So NONE of the 7 dock stories
is cleanly subsumed at HEAD — the playground is purely additive (the lead liquid-morph
story), and retiring any existing story would lose coverage.

**Two honest paths (user's call) — REVISED after the V↔H audit finding:**

1. **Extend the playground** to also host the nav/layers/sections/search/cta facilities
   as additional sections (so it becomes THE comprehensive dock page) — a larger build,
   then retire the covered stories.
2. **Keep ALL facility stories**, position the playground as the LEAD liquid-morph story
   (already registered first), retire NOTHING yet. (The earlier "retire morph-showcase"
   recommendation was WITHDRAWN, then PARTIALLY re-enabled: the playground's V↔H now
   OCCLUDES the row⇄column topology change via a content crossfade — the prerequisite is
   met. morph-showcase is now genuinely close to subsumed; the only remaining delta is its
   goo-MERGE visual (richer than the playground's fade). Retiring it is now a clean
   judgment call: keep it for the goo visual, or retire it as covered by the playground.)

Path 2 (keep everything, playground is additive lead) is now the recommended default —
zero coverage loss. Path 1 is the full subsumption the ask names, a focused future effort.
NOTHING should be retired without your greenlight; the playground is purely additive today.

## Productionization (the other track)

These demo composables (`useLiquidMorph`, `useLiquidRail`) are PROTOTYPE-grade (the morph
animates `width/height`; a library primitive needs the compositor-safe reserve+scale).
The specced **BE tranche** (39 waves, `docs/tranches/BE/`) is the path to land them as
hardened, gestalt-gated library primitives. Greenlight-gated.
