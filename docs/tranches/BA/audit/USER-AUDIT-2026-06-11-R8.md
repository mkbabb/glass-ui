# USER-AUDIT 2026-06-11 — ROUND 8 (23:06–23:21, BINDING — the post-AZ-close audit; the BA seed)

The user audited :5210 on the closed master tree (the published 3.13.0 content). Eighteen
grounded reads + seven standing directives. Every capture is banked at `ground/R8-*.png`
(the volatile TemporaryItems paths copied same-night). NOTE: most captures are DARK MODE —
a cross-cutting cluster (R8-11/12/13/15/19) reads as the demo's dark register being flat,
near-black, and glass-invisible relative to the light register.

## The reads

| id | surface · capture | the user's words + the orchestrator's grounded read |
|---|---|---|
| R8-1 | the dock rail seat (`R8-01-dock-rail-misaligned-{a,b}.png`) | "The dock rail is totally mis-aligned — it should be placed where the dividing line for the ℱ is, or in the dividing line for the sidebar in the bottom dock. The rail should extend partially outside of the other side of the docks, too." READ: the facet chips float DISCONNECTED above the bottom dock / beside the sidebar with only a thin line; the anchor must be the dock's own DIVIDER seam (the ℱ separator on the sidebar; the sidebar-toggle separator on the bottom dock), and the hairline must overrun BOTH sides of the dock. |
| R8-2 | the dock morph + layering demos | "What of our dock morphing into vertical/horizontal views — we should have a facility to demonstrate the robust dock liquid glass facilities, which would smoothly interpolate and animate a vertical dock to be horizontal and vice versa — too, we should have a robust set of facilities to demo our dock layering and contextual switching system within these demo docks." READ: the V↔H morph exists only on the showcase story; the SHELL/demo docks must demonstrate it + the layering/contextual system in-situ. |
| R8-3 | the gear Configurator dark switch (`R8-03-darkmode-toggle-broken.png`) | "dark mode toggle doesn't work here, and it's not even the proper darkmode toggle button/icon." READ: the APPEARANCE → Dark mode row renders a plain `<Switch>` that does not flip the mode; the proper control is the animated `DarkModeToggle` sun/moon. |
| R8-4 | the aurora (+ all) configurators (`R8-04-aurora-configurator-occlusion-{a,b}.png`) | "The configurators for both the blob and aurora and all other configurators need to be refined such that we do not have visual occlusion, and more dividing lines — better design and affordance hierarchy." READ: the DERIVE FROM COLOR chip row clips ANALOGOUS/COMPLEMENT/TRIAD at the card edge; the Seed slider is an undifferentiated full-width blue slab; sections run together without dividers. |
| R8-5 | the aurora preset preview (`R8-05-speedtest-preview-dim.png`) | "The speedtest preview item should NOT be dim like this." READ: the Speedtest preset card's live thumbnail renders dark/muted. |
| R8-6 | dock control clipping + the rail fan-out contract (`R8-06-dock-buttons-cutoff-rail-fanout.png`) | "The dock round buttons are partially cut off — as are the rail items: the RAIL items should be alongside, up against, the rail when they fan out — otherwise they all collapse and the rail shrinks, but still SLIGHTLY protrudes — this is SOMEWHAT akin to the macOS dock fan out, though not curved." READ: the round hover plate on a dock control is clipped by the pill bounds; the rail's expand/collapse contract: chips fan out flush against the rail line; collapsed = chips retract INTO the rail, which keeps a slight protrusion. |
| R8-7 | the goo studio (`R8-07-goo-configurator-broken.png`) | "The goo configurator is almost entirely broken, the hover over effects are far too quick and jittery, and the blobbing/satellite feature of the blobs are broken." READ: the Interaction/Mood rows render LABELS WITH NO CONTROLS (the sliders missing/invisible); the satellite floats fully detached with no gooey merge; hover is jittery. |
| R8-8 | the preset strip (`R8-08-fading-scroll-list.png`) | "This sort of element should be a glass-ui component, like a fading scroll list or something — abstract this properly — but it's currently bugged, too: we should NOT have faded elements when we're not scrolled… at the edges of the list. This must be compatible with vertical scrolling, too." READ: the mood preset row fades 'Shy' at rest with no overflow in that direction; the edge-fade must be scroll-state-driven; the pattern abstracts to a library FADING-SCROLL component (h + v). |
| R8-9 | the dock section model (`R8-09-docks-lack-sections.png`) | "The docks now COMPLETELY lack sections: they should have the core areas of the rail, then a few sections, then the arrows for nav. All of the menus — abstract this into a re-usable component for layering and such within the demo." READ: the bottom dock is one undifferentiated run (sidebar-toggle · ‹ › · « »); the section model (rail core + sections + nav) is gone; the layer menus need a reusable demo abstraction. |
| R8-10 | padding + the fourier demos (`R8-10-padding-fourier-demos.png`) | "These items don't have enough padding on the bottom — audit for all areas like this. The fourier field component needs better demos, a configurator, and more options thereof. For more robust, beautiful, and interesting procedural fourier animations of both epicycles AND summed harmonics, like within fourier-analysis's web demo." READ: the HERO/FINAL captions crowd the card bottom; the field demos are sparse vs the fourier-analysis web reference (~/Programming/fourier-analysis). |
| R8-11 | the glass-material story dark (`R8-11-black-bg-hides-glass.png`) | "I cannot even see the glassy effect of all of these items because of the pointless black background. Remove that. And we should have proper demos for all of our cards, our card variants, our veil variant, etc, with proper aurora backgrounds to demonstrate glassy-ness." READ: the ladder rungs sit on a near-black plate that kills the read; card/variant/veil demos owe aurora-backed stagings. |
| R8-12 | toasts + the global variant census (`R8-12-toasts-not-glassy.png`) | "Why are the toasters not glassy — ALL of our components should be glassy by default and be consistent in their variants. Audit for all instances of this sort of idiom, generally, across ALL components, buttons, dropdowns, popovers, toasts, etc — list them all. They should have glass, veil, etc variants." READ: the toast is an opaque dark slab. The census is BINDING: every floating/feedback surface × {glass, veil, …} variant coverage, listed exhaustively. |
| R8-13 | flat demo affordances (`R8-13-button-large-uninteresting.png`, `R8-13-not-glassy-b.png`) | "why is this button so large and uninteresting" (the full-width flat 'Fire a toast' pill) + "this is not glassy at all" (the solid flat green deploy Notification). |
| R8-14 | the sectioned Progress (`R8-14-progress-sectioned-broken.png`) | "The sectioned variant of the progress bar is totally broken and should be a proper blended gradient with distinct segments." READ: hard per-segment color cells with mis-joined seams + a dead dark notch at a boundary; the design is a CONTINUOUS blended gradient that still reads distinct segments. |
| R8-15 | page backgrounds | "EVERY core page should have an interesting background, be it a fourier field, a different aurora, a constellation, or any other sort of interesting procedural background item, with subtlety and within our idioms, paper grid, too. No blank or boring black/white backgrounds." (e.g. /feedback/alert). |
| R8-16 | the curve-gallery picker on dark (`R8-16-awful-scrolling-item.png`) | "This looks awful and should be a better scrolling item, perhaps another dock." READ: the 12-family underline strip reads as a flat grey band on dark; re-conceive as a richer scrolling control (a dock-like strip is on the table). |
| R8-17 | the plot play control (`R8-17-play-button.png`) | "What even is this play button." READ: an amorphous white blob with a clipped triangle + 'Play' text colliding — illegible as a control. |
| R8-18 | the CTA hover (`R8-18-disco-hover.png`) | "Remove the disco effect everywhere. And smooth out the hover animations." READ: the disco-grain/sparkle-sweep (`btn-audacious` family) RETIRES globally; the hover register smooths. |
| R8-19 | the glass blur, globally | "The glass blur for every glass element is just a hair too much. Dial that back everywhere." READ: a global calibration pass on the `--glass-blur-*` ladder — a small uniform reduction, one knob-family edit, never per-site. |

## The standing directives (verbatim-binding)

1. **The 32-agent deep audit**: "DEEPLY audit with 32 agents in parallel our original plan and
   waves thereof, alongside all changes made herein."
2. **The path forward**: "Devise a path forward: audit the hitherto made changes and the
   remaining plan; recapitulate our original prompts, plans, and precepts: NO quick solutions,
   NO workarounds: idiomatic, gestalt approaches… architectural transpositions in the sake of
   elegance, simplicity, and performance above all… NO legacy code."
3. **The deferral folds**: "Delineate any chronically deferred items and fold them into this
   new tranche. Delineate any deferred items and fold them into this tranche."
4. **The prompts recap**: "Recap ALL of our prompts and requests hitherto and ensure they've
   been addressed."
5. **The phase fence**: "This is NOT an implementation phase. Tranche development only."
6. **The model discipline**: "Use your core model for orchestration, design, synthesis, but
   defer to Opus or Sonnet for workflow fanout."
7. **The frontend-design audit**: "run a frontend design plugin audit of our ui — all UI
   panes… How might we better structure and suffuse proper design hierarchy… Check for any
   obvious visual incongruences… better suffuse our design language of glass, grid, math,
   large and audacious typography, with colorful audacious pops, like those found in our
   icons (how might we increase this, too? within a sense of proportion), and our animation
   targets… What glass-ui idioms might we adopt — what glass-ui items… might we smoothen,
   refine, hone, and abstract out… Look for gaps."

## Routing

This document SEEDS the BA tranche. The 32-lane fleet (opus fanout) covers: the 19 grounded
defect clusters (live + source root-cause each), the prompts/plans/precepts recapitulation,
the deferred-items census (chronic + recent), the four frontend-design pane sweeps, and the
hierarchy/suffusion/pops/idiom-gap/animation analyses. The synthesis (the core model) forms
the BA tranche per TRANCHE-AND-WAVE-SPEC: wave specs only — no implementation.
