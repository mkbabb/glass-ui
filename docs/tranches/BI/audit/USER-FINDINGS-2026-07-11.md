# USER FINDINGS REGISTRY — the 2026-07-11 post-BG audit (BINDING)

The user audited the built dist demo (`:5200`, HEAD `dfaa2510`, the BG+BH CUT-READY tree) and returned
the findings below, verbatim-quoted. **Every row here MUST receive a terminal disposition in the BI
tranche: an owning wave, a fold, or a retire-with-rationale. Silent drops are forbidden.**

Screenshots banked at `docs/tranches/BI/audit/user-findings-2026-07-11/ss-*.png` (copied from the
volatile TemporaryItems paths the same hour, scaled 1400w). Annotations are the orchestrator's reading
of each capture.

Process directives (the tranche-formulation + design-loop prompts) are registered at the bottom (§P).

## Legend

- **Family** — defect-mechanism grouping (two findings sharing a mechanism share a family).
- **Class** — DEFECT (broken paint/behaviour) · DESIGN (needs the convergent design loop) ·
  PRUNE (retire/move) · REFINE (calibration) · PROCESS (audit/verification mandate).

---

## A. Geometry & rounding idiom

| id | quote (verbatim) | surface | evidence | class |
|----|------------------|---------|----------|-------|
| UF-A1 | "For all of our design language—audit all areas like this—this super rounded … Section is totally wrong and un-idiomatic. This needs to be rounded more like a card." | configurator "Derive from color" section; ToggleGroup pill wrap | ss-04, ss-05 — stacked full-capsule pills inside a capsule-wrapped section; outer wrap radius doesn't relate to inner pills | DESIGN |
| UF-A2 | "Container rounding is totally wrong here." | vertical SegmentedTabs (Profile/Billing/Team/API Keys) | ss-19 — the vertical track's capsule wrap balloons around the stack; radius unrelated to content | DEFECT |
| UF-A3 | "The drawer is not rounded, and the fade in/out animation needs perfecting." | the demo gear Configurator sheet | ss-23 — square-cornered panel at screen edge | DEFECT |
| UF-A4 | "This section is not rounded either." | Configurator "Appearance" section block | ss-24 — square hairline-bordered section inside the rounded sheet | DEFECT |
| UF-A5 | "Why is this indented?" | Configurator section body | ss-25 — the section block insets from the sheet title for no structural reason | DEFECT |
| UF-A6 | "Doesn't seem to be aligned properly." | /display/badge — the "rose" badge | ss-12 — glyph baseline sits low in the pill; optical centering off | DEFECT |
| UF-A7 | "Borders on these are totally wrong." | metal-rim cards (gold/bronze/rainbow) on the metal story | ss-07 — the `.metal-*-border` border-image SQUARES the corners on a rounded card (the exact defect BorderProgress's masked-conic avoided) | DEFECT |
| UF-A8 | "Artifacts on the bottom left corners of these buttons?" | solid buttons over blue backdrop (compositions story) | ss-08 — a hard dark shadow slab peeks at the bottom-left corner of each pill | DEFECT |
| UF-A9 | (2026-07-12 follow-up, verbatim) "Mark me. There are artifacts in these button corners in many uis." | capsule controls LIBRARY-WIDE (screenshot: the fourier-studio preset chips, light mode) | ss-26 — each pill shows a dark CRESCENT protruding past its LEFT end-cap. MECHANISM (widens UF-A8/GEO-7): the hard 0-blur offset shadow register (`--shadow-cartoon-*` down-left stamps) behind a CAPSULE — on a rectangle the offset copy tucks under the corner radius; on a fully-rounded pill ANY hard offset protrudes as a moon-sliver. The shadow grammar (D-GLASS geometry law #4) gains the capsule rule: hard-offset stamps are geometry-gated (never on pill/capsule shapes; press-window-gated everywhere per UF-A8) or the offset shadow is re-expressed so the stamp is CLIPPED to the control's own silhouette. Census owed: every `--shadow-cartoon-*`/offset-stamp consumer × its border-radius class. | DEFECT |

**Mechanism hypothesis (to verify):** the library has no CONCENTRIC-RADIUS grammar (inner radius =
outer radius − inset) nor a capsule-vs-card decision rule; sections/tracks default to capsule where a
card radius is idiomatic; border-image is used where a masked-conic border is the house pattern.

## B. Glass system — simplification, calibration, duplication

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-B1 | "I feel like we have too many glass substrates. We need a grand simplification to have less—which are the important ones? Which are duplicative? Which are used?" | /substrates/glass-material + the whole glass surface set | — | DESIGN |
| UF-B2 | "glass-panel—this is superceded by the glass card system, no? And to be pruned?" | /substrates/glass-panel | — | PRUNE |
| UF-B3 | "Do these use our standard glass material facilities? The blur could be muted ever so slightly." | glass/glass-wash/pressed buttons | ss-09 | REFINE |
| UF-B4 | "Yeah the blur on the buttons could be dialed back globally just a bit." | all glass buttons | ss-13 | REFINE |
| UF-B5 | "A core problem we keep seeing: we have many of these duplicated systems that go by multiple names (panes vs cards; glass types that are similar, etc). We must audit for this in a multi-dimensional approach." | library-wide | — | PROCESS |
| UF-B6 | "Ensure, and with a grand workflow, that we're not duplicating effort (glass material, etc) across the workspace: a recurring theme is re-inventing and not using proper DRY and encapsulation principles for MANY components (not just glass—brainstorm across every component, style, system). KISS. DRY." | workspace-wide | — | PROCESS |

## C. Dock suite — greenfield reinvention

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-C1 | "The entire dock suite needs to be re-invented from ios27 first principles and made idiomatic for the web. All of it. Every dock facility. Greenfield it. We have too many duplicated systems within this module and an infinite amount of superfluous code." | src dock family + all dock stories | — | DESIGN |
| UF-C2 | "The rail implementation is broken and needs to be re-designed from first principles." | DockStack facets/stack rail | ss-03 — fanned chips overlap the dock body, misaligned geometry | DESIGN |
| UF-C3 | "Essentially all of /dock/liquid-playground is broken in safari at the least. As is all of /dock/dock-gallery." | those routes, Safari | — | DEFECT |
| UF-C4 | "/dock/overview animations are sluggish and not smooth." | dock overview | — | DEFECT |
| UF-C5 | "Dock morphing does not work at all." | the in-situ shell morph / morph stories | — | DEFECT |
| UF-C6 | "When hovering over a button at the end of a dock, it should not clip the hover like this—afford enough room from first principles. No workarounds or sizing hacks." | dock end controls | ss-17 — end tab's hover plate clipped flat by the scroll port | DEFECT |
| UF-C7 | "Dock hover items clip improperly." | dock controls generally | ss-21 — hover plate flattened top+bottom by the dock clip | DEFECT |
| UF-C8 | "ux: when you click on an element in a scrolled dock, it should properly scroll you to see more of what's to the left or right (depending on how many elements remain and are hidden)." | scrolled bottom dock | ss-16 — clipped labels both ends, no scroll-into-view | DESIGN |
| UF-C9 | "What is possible within the bounds of modern, SOTA, webdesign? Most of this needs pruning and re-designing from the ground up." | dock band | — | DESIGN |

## D. Scroll progress rail

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-D1 | "The scrolling progressbar needs a great deal of refinement, should be rainbow, thinner, and rounded." | the dock-border scroll progress | ss-02 — chunky flat gray band on the vertical dock rim | REFINE |

## E. Procedural substrates

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-E1 | "All background auroras should have slightly more vibrant and interesting colors … /foundations/intro is good, but could have a few more notes of pink—like the setting sun. This should be a proper preset, too, setting sun." | all shell/story auroras | — | DESIGN |
| UF-E2 | "All auroras should have proper interactability." | every aurora mount | — | DESIGN |
| UF-E3 | "The interaction with the goo blob is not smooth, intuitive, or robust. This needs to be re-worked from first principles, and have proper demo with satellite blobs." | /substrates/blob | — | DESIGN |
| UF-E4 | "/substrates/aurora is good, but the core chosen aurora space should be larger." | aurora studio | — | REFINE |
| UF-E5 | "/substrates/constellation is good, but several demos are duplicative. And the core background constellation must be interactive—all background visualizations in any demo page should be." | constellation story | — | DESIGN |
| UF-E6 | "/substrates/fourier-field is a mess and the interactivity needs to be reworked from first principles. What we had before this tranche was better. It should follow your cursor to be biased in that direction, more subtle, and gracefully fourier draw towards that. Similar for the blob, weighted and biased. Faster movements (velocity, acceleration, etc) should influence this too." | fourier-field | — | DESIGN |
| UF-E7 | "fourier-field performance is god awful." | fourier-field | — | DEFECT |
| UF-E8 | "Dot flow field, concentric, dot matrix—all to be deleted. You've failed 30+ attempts to implement these." | dot-flow-field, concentric, dot-matrix (components + stories + gates) | — | PRUNE |
| UF-E9 | "All of the preview images hereof are stunningly low quality, and must be real components instead." | /substrates index tiles | — | DEFECT |
| UF-E10 | (2026-07-11 follow-up, verbatim) "the loading screen and animation for pages, that the fade in from a repulsive gray color, like on /foundations/intro is totally wrong. The aurora start animation should be based on the colors thereof and be properly, beautifully defined." | every field-bearing page's entrance; /foundations/intro flagship | Orchestrator diagnosis: (a) the capable-path aurora placeholder is the CHEAP flat `linear-gradient(135deg, …)` band (Aurora.vue:143-144 admits it; the luminance-faithful `auroraFallbackGround` raster exists but serves ONLY the software-raster path); (b) `gl-route-enter` fades the WHOLE route root atomically from `opacity:0` (transitions.css:311) over a hero page whose shell field is SUPPRESSED (focal.ts), so first frames composite against the bare page bg, not the field's colors; (c) the GL canvas cross-fade lands after arm, stacking a third tone shift. → THE AURORA ENTRANCE REGISTER: first paint = the palette-derived nuclei-composite ground (promote `auroraFallbackGround` to the capable path's first frame, or a palette radial composition — never the flat band), and the entrance = a defined bloom choreography (palette ground visible from frame 0; the live canvas warms INTO it; the page content enters OVER the already-colored field — never an atomic neutral fade). Owner: D-VIZ (the ground) + D-MOTION (the route-enter register split: field vs content). Live repro owed in round 2. | DEFECT + DESIGN |

## F. Demo storybook meta-system

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-F1 | "These preview buttons should have literal, live, actual components, curated from those sections. Not giant, superfluous, wasted icon space." | landing CATEGORIES bento tiles | ss-01 — empty brown tile with a lone compass icon | DESIGN |
| UF-F2 | "On all pages … The title should not only fade out, but it should shrink on scroll. This should be a standard facility: overarchingly, we should have a meta-component system built out and used for storybook pages. Codified and the like—is this not extant?" | every story page | — | DESIGN |
| UF-F3 | "If we're to have these code sections, they should be properly sized (horizontally and vertically), syntax highlighted with highlight.js and a theme (look to keyframes.js for how we do this, or value.js OUR library) and fully standardized to be in every page." | story code blocks | ss-10 — unhighlighted mono block, full-width, cramped | DESIGN |
| UF-F4 | "There's just far too much meta text on essentially every page like: /navigation/toc-tracking" + "far too much text and meta language on this page" (tabs) | most stories | ss-18, ss-20 | DEFECT |
| UF-F5 | "We should NEVER ever reference meta processes, tranches, kf, etc on any demo page. Mark and audit for this, too." | all demo copy | ss-18 ("kf Draggable substrate"), ss-23 ("post-W54 design axes") | PROCESS |
| UF-F6 | "These and other items should be wrapped in a glass-ui veil card to demarcate and suffuse design hierarchy." | toc-tracking demo body (and peers) | ss-20 — bare demo panes on the page field | DESIGN |
| UF-F7 | "We need to re-design pages like this and better use the space. Proper dropdown demos. No outrageously sized components that unreasonably take up the full width of space. Audit every component page demo for proper affordance to show the various permutations of usage." | /containers/context-menu et al. | ss-15 — full-width "Open menu" trigger + mono state-readout strip | DESIGN |
| UF-F8 | "Why do we have elements that are so outrageously sized." | popover "Dimensions" trigger etc. | ss-14 — full-width anchored trigger button | DEFECT |
| UF-F9 | "Pages like /forms/inputs have good scroll mechanics and animations, but should be slightly better, bi-directional, and refined. We should plan to draw in dividing lines, properly demarcate sections with cards." | forms band + all story bodies | — | DESIGN |
| UF-F10 | "several demos are duplicative" (constellation); "prune so many of these superfluous components" (compositions) | story bodies | — | PRUNE |

## G. Motion language

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-G1 | "Do a general animation audit and ensure that our timing curves, smoothness, are a bit tighter, responsive, with options for longer etc." | library-wide | — | DESIGN |
| UF-G2 | "Animations on these could be refined to be more like our dropdowns appearing … Homogenous animation language for items like this." | /containers/popover | — | REFINE |
| UF-G3 | "The slight bounce of the dropdown menu could be refined." | /containers/dropdown-menu | — | REFINE |
| UF-G4 | "Animation of this could be tightened a bit. Same with /containers/hover-card." | /containers/context-menu, hover-card | — | REFINE |
| UF-G5 | "I don't like how these indent on click." | /containers/accordion | — | DEFECT |
| UF-G6 | "We should plan to have refined drawing animations—and codify this to not be adhoc … The draw in animation for the dividing line in the header is a bit too bouncy. Needs smoothing." | /containers/sheet + every draw-in | — | DESIGN |
| UF-G7 | "/containers/drawer is laggy and weak." | drawer | — | DEFECT |
| UF-G8 | "/containers/command—seems to jitter back and forth?" | command palette | — | DEFECT |
| UF-G9 | "Animation and performance hereof: /compositions/drawer-live-behind are awful." | drawer-live-behind | — | DEFECT |
| UF-G10 | "the fade in/out animation needs perfecting" (gear sheet) | configurator sheet | ss-23 | REFINE |

## H. Tabs & toggles

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-H1 | "Pill — eyeglass (the iOS-27 loupe) should become the default tabs option. We should have a config to adjust the vertical sizing of the pill. We don't need a million fucking variants that are essentially the same thing." | SegmentedTabs | — | DESIGN |
| UF-H2 | "These are not draggable." | the tabs `:draggable` demo | ss-18 | DEFECT |
| UF-H3 | (vertical tabs container rounding — see UF-A2) | | ss-19 | DEFECT |

## I. Carousel / pager

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-I1 | "/navigation/carousel is absolutely broken and needs to be re-designed from the ground up. The currently selected deck dot should MORPH from one dot to another. Greenfield this with several workflows. … is just totally broken." | carousel + PagerDots | — | DESIGN |

## J. Component-demo content defects

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-J1 | "These sliders are good, but they could be better—we should replicate the color picker sliders 1:1 from value.js" | configurator LCH sliders | ss-06 | DESIGN |
| UF-J2 | "this seems to do nothing." | the grain Switch (paper/glass config demo) | ss-11 | DEFECT |
| UF-J3 | "Do these cards properly match up with their variants—what of the veil card?" | /display/card | — | PROCESS |
| UF-J4 | "this progress bar looks awful." | BorderProgress bottom-edge demo on /data | ss-22 — full-width thin rect, pastel ring + mono meta caption | DEFECT |
| UF-J5 | "/containers/expandable-container—needs fixing from first principles. And esc doesn't globally work." | expandable-container | — | DEFECT |
| UF-J6 | "Why have hover popover, hover, and popover—is this necessary? What are your thoughts. Regardless, this page needs to be re-designed." | hover-popover vs popover vs hover-card | — | PRUNE |

## K. Prune / overfit

| id | quote | surface | evidence | class |
|----|-------|---------|----------|-------|
| UF-K1 | "/data/metrics needs to be pruned—this is overfit and must be moved to speedtest's repo if need be." | metric-cell/metric-stack/metrics story | — | PRUNE |
| UF-K2 | "What even is /compositions/hero—this likely needs to be removed or made not a full category item, a sub-page instead." | compositions/hero | — | PRUNE |
| UF-K3 | "/compositions/math-paper is overfit and needs to be removed." | math-paper | — | PRUNE |
| UF-K4 | "Performance on /compositions/auth-shell is miserable." | auth-shell | — | DEFECT |
| UF-K5 | "We need to prune so many of these superfluous components." | compositions band | — | PRUNE |

## §P. Process directives (binding on the BI tranche formation itself)

| id | directive |
|----|-----------|
| UF-P1 | 32-agent deep audit of the original plan + waves + all landed changes; recapitulate ALL prompts/plans/precepts hitherto; every ask addressed or ledgered with an owner. Registry of finding families; adversarial throughout; two consecutive clean passes to close. |
| UF-P2 | Every chronically deferred item: DECIDED rows (build/fold/retire). Re-booking forbidden. A ≥2-close chronic is a disease row with its own wave. |
| UF-P3 | Design problems route through the convergent multiagent design loop (portfolio → research → synthesize → prototype → critique → agglomerate; ≥3 passes; 100% = zero gaps + fresh adversarial audit + two clean passes). |
| UF-P4 | Fable owns orchestration/synthesis/design (with DesignSync); Opus/Sonnet take fanout, explicit model per spawn; 3-concurrent rate wall. |
| UF-P5 | Deliverable: the fully-formed next tranche — plan folder, wave specs, born-RED gates, π/DELTA obligations, dispositions for every chronic/deferred/prompt-recap row. "BH/BI are to be updated, upgraded, unioned, and reformed." |
| UF-P6 | NO legacy code, NO aliases/shims/dual paths/masking fallbacks; idiomatic gestalt approaches only. |
| UF-P7 | **The Kronecker factorization directive (2026-07-11 follow-up, verbatim):** "should hover-popover not just become hover? That functionality default for hover? Melded into a perfected union? This discipline should be applied and examined in a multidimensional kronecker product approach for ALL of our components—how can we distill these into their perfected and robust, KISS-forward, and accessible states—with proper synonym de-duplication." → Every component decomposes into orthogonal axes; the component set should be the PRODUCT of a small axis set, not N bespoke names; a behavior like hover-open is an AXIS VALUE (trigger: hover), never a component. Registered as design problem D-FACTOR; the anchored-overlay family (Popover/HoverCard/HoverPopover/Tooltip/IconTooltip + the menu family) is the flagship case. Mechanism-distinctness (FAM-10 law) is the guard: an axis stays an axis unless a cell owns a genuinely distinct mechanism (ARIA pattern, focus model). |

## Cross-cutting reading (orchestrator)

Recurring mechanisms the family grouping surfaces:

1. **No concentric-radius / capsule-vs-card grammar** → family A (8 rows).
2. **Glass surface taxonomy sprawl + duplicate naming** → family B (+ UF-J3, UF-J6): the multi-name
   duplication disease (panes/cards/panels/veils; glass-material vs glass-panel vs card tiers).
3. **The dock band failed its gestalt despite per-mechanism greens** → family C: the third consecutive
   tranche re-opening dock fundamentals (clip, morph, rail, Safari) — a disease family demanding
   greenfield, not repair.
4. **Demo-as-spec-sheet instead of demo-as-designed-specimen** → family F: meta text, dead space,
   full-width slabs, no live previews, no codified story chassis.
5. **Per-surface animation dialects** → family G: the motion canon exists on paper but the painted
   dialects diverge (bounce inconsistency, draw-in ad-hoc, laggy sheets).
6. **Viz ambition exceeding the paint bar** → family E: three vizzes condemned after 30+ attempts;
   the survivors need interactivity physics, not more variants.
