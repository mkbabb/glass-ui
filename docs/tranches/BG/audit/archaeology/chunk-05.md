# Archaeology chunk 05 — directive extraction

Source: `scratchpad/archaeology/chunks/chunk-05.txt` (169 blocks, 2026-06-10 → 2026-06-17).
This window spans the AY close → AZ tranche (dock-rework + de-red + adaptive-glass) → BA tranche (4.0.0 cut: dark-material, no-gray, glass grammar, gestalt bar) → BB tranche formation (liquid-glass band + WebGPU viz suite + constellation modernize). Most blocks are task-notifications (process noise); the substantive HUMAN directives are extracted below.

Categories: shell-routing-field · dock · glass-material · motion-animation · viz-procedural · components-encapsulation · demo-storybook · siri-new-capability · a11y-perf-safari · design-principles · gates-quality-process · cross-repo · type-typography · color-identity · misc

---

## Directives (chronological)

### D01 — dock animation must not mutate container height
- **gist:** Dock collapse/expand animation must NOT change the container's height; dock animations still need refinement.
- **quote:** "this should not modify the height of the container upon animation--our dock animations still need refinement"
- **date:** 2026-06-10
- **category:** dock
- **theme:** dock-rework / liquid-weight
- **status:** addressed (morph.css padding-block pinned both states; π-verified 0px container Δ)

### D02 — dark-mode toggle: smaller, bottom-placed with divider
- **gist:** The dark-mode toggle icon is too large and is mis-placed at the top; move it to the bottom behind a dividing line.
- **quote:** "the darkmode toggle icon is too large, and should not be at the top--it should be at the bottom with a dividing line thereof"
- **date:** 2026-06-10
- **category:** dock
- **theme:** dock-rework
- **status:** addressed (moved to trailing #collapsed slot behind auto DockSeparator; glyph 40→20px)

### D03 — background play/pause control broken (no shrunken icon)
- **gist:** The background play/pause toggle is broken — it has no shrunken icon when collapsed.
- **quote:** "Background play/pause is broken with no shrunken icon"
- **date:** 2026-06-10
- **category:** dock
- **theme:** a11y-perf-safari (WCAG-2.2.2 pause) / dock-rework
- **status:** addressed (wired #collapsed live-glyph slot to a real contained Aurora pause/resume)

### D04 — completion bar: full reflection audit per item before "complete"
- **gist:** The tranche may only be marked complete after a per-item reflection audit (dock/blob/aurora etc.) that PROVES it; mid-tranche, deploy a triumvirate of research+plan+write+redress until perfection.
- **quote:** "only be marked complete when we have a full audit of each item in a reflection process... deploy a triumvariate of research, plan, tranche write ad hoc, and redress until perfection"
- **date:** 2026-06-11
- **category:** gates-quality-process
- **theme:** gestalt-not-patch / real-paint-verify
- **status:** addressed (codified as W-REFLECT band + proof:az-final clause 10; the gestalt bar)

### D05 — rails must extend OUTSIDE the dock; animations janky
- **gist:** The dock rails are totally broken — they must extend OUTSIDE the dock itself; the animations are janky and the rail options are confusing.
- **quote:** "Rails are totally broken--they should extend OUTSIDE of the dock itself. The animations are janky"
- **date:** 2026-06-11
- **category:** dock
- **theme:** dock-rework / liquid-weight
- **status:** partial (escape mechanism landed but rail stayed broken across R4/R6 — re-opened repeatedly)

### D06 — gear must open the Preset Editor, not a composables page; dark toggle at top
- **gist:** The gear icon must NOT expose the useless use-token-color composables page — it must show the Preset Editor, with the dark-mode toggle at the TOP not the bottom.
- **quote:** "The gear icion should not expose this useless... use-token-color page--but instead show the Preset Editor, which should have the darkmode toggle component at the top, not the bottom"
- **date:** 2026-06-11
- **category:** demo-storybook
- **theme:** configurator-rework
- **status:** addressed (R4-SHELL — gear opens PresetEditor; Appearance/dark row leads at TOP)

### D07 — preset options must be proper glassy pill tabs/selects
- **gist:** Some preset-editor controls are not proper glassy/pill tabs or selects — convert them onto the house register.
- **quote:** "some of these preset options are not even proper glassy/pill tabs or selects"
- **date:** 2026-06-11
- **category:** components-encapsulation
- **theme:** glass-standardize
- **status:** addressed (RadioGroup/bare-button rows → SegmentedTabs)

### D08 — rail still broken; docks far too wide; rail must not change box; floating carousel
- **gist:** The rail is still entirely broken and the docks are far too wide; the rail must overflow OUTSIDE the docks and NEVER increase width/height; the rail items should be like a floating carousel.
- **quote:** "The docks are awful. Far too wide. The rail should overflow OUTSIDE of the docks and NOT!!!!! increase the width or height! The rail items shoud be like a floating carosuel almost?"
- **date:** 2026-06-11
- **category:** dock
- **theme:** dock-rework / box-inviolate
- **status:** partial (R6 redirect → floating-carousel rail; box-inviolate became the binding law, still re-opened later)

### D09 — curve-gallery page: too dark/muted, thin strokes, awful picker, not isomorphic to keyframes.js
- **gist:** The curve-gallery page sucks — pane too dark/muted, curves not thick enough, the picker UI is awful, and it is not comprehensive or isomorphic to keyframes.js's easing items.
- **quote:** "the curves and pane is too dark and muted? the curves are not thick enough, the curve picker UI is awful. And it's not at all comprehsivne and isomprhoc ti keyframes.js's easing items"
- **date:** 2026-06-11
- **category:** motion-animation
- **theme:** motion-suite / real-paint-verify
- **status:** addressed (R7 triumvirate → W-MOTION2: thick non-scaling strokes, vivid register, real picker, 42-curve isomorphism)

### D10 — wake-on-wall cron edict (with embedded completion-bar)
- **gist:** If a usage limit is hit, auto-wake on an interval and resume with the exact continue edict; the standing wall-recovery prompt.
- **quote:** "if we hit a usage limit, the session will automatically wake back up... Continue. Re-deploy all workflows and agents thereof--no exceptions."
- **date:** 2026-06-11
- **category:** gates-quality-process
- **theme:** orchestration-continuity
- **status:** addressed (cron lattice armed) — *mostly process, but the embedded reflection-bar (D04) is load-bearing*

### D11 — dock rail mis-aligned; seat at the dividing line; partial extend on the other side
- **gist:** The dock rail is totally mis-aligned — it should sit where the ℱ dividing line / sidebar dividing line is, and extend partially OUTSIDE the other side of the docks too.
- **quote:** "The dock rail is totally mis-aligned--it should be placed where the dividing line for the F is... The rail should extend partially outside of the other side of the docks, too"
- **date:** 2026-06-12
- **category:** dock
- **theme:** dock-rework / box-inviolate
- **status:** partial (W-DOCK-SECTIONS seated rail at the divider seam; gestalt re-opened it as title-occlusion)

### D12 — demonstrate V↔H dock morph + layering/contextual switching in the demo docks
- **gist:** Build a facility that smoothly interpolates a vertical dock to horizontal and back, and a robust set of facilities to demo dock layering and contextual switching within the demo docks.
- **quote:** "smoothly interpolate and animate a vertical dock to be horizontal and vice versa... a robust set of facilities to demo our dock layering and contextual switching"
- **date:** 2026-06-12
- **category:** dock
- **theme:** dock-rework / liquid-weight
- **status:** addressed (W-MORPH-SHOWCASE + W-DOCK-MORPH-INSITU; VT crossfade default, teardrop perf-gated)

### D13 — dark-mode toggle broken + wrong icon on a surface
- **gist:** The dark-mode toggle doesn't work on this surface and is not even the proper dark-mode toggle button/icon.
- **quote:** "dark mode toggle doesnt work here, and it's not even the proper darkmode toggle button/icon"
- **date:** 2026-06-12
- **category:** components-encapsulation
- **theme:** configurator-rework
- **status:** addressed (canonical DarkModeToggle bound to useGlobalDark; the desynced shadow removed)

### D14 — all configurators: no visual occlusion, more dividers, design/affordance hierarchy
- **gist:** The blob/aurora/all configurators need refinement — no visual occlusion, more dividing lines, better design and affordance hierarchy.
- **quote:** "all other configrators need to be refined such that we do not have visual occlusion, and more dividing lines--better design and affordance hierarchy"
- **date:** 2026-06-12
- **category:** components-encapsulation
- **theme:** configurator-rework / design-hierarchy
- **status:** addressed (W-CONFIG-CHASSIS dividers/width-contract + W-HIERARCHY vocabulary)

### D15 — speedtest preview must not be dim
- **gist:** The speedtest preset preview item should not be dim (it should show the preset color, not its deployment translucency).
- **quote:** "The speedtest preview item should NOT be dim like this"
- **date:** 2026-06-12
- **category:** demo-storybook
- **theme:** color-identity
- **status:** addressed (preview clamps alpha:1 at freezeCfg capture seam)

### D16 — dock round buttons cut off; rail items must fan flush against the rail (macOS-dock-like)
- **gist:** The dock round buttons and rail items are partially cut off; rail items should sit flush against the rail when they fan out (akin to the macOS dock fan-out, but not curved).
- **quote:** "the RAIL items should be alingside, up against, the rail when they fan out... SOMEWHAT akin to the macos dock fan out, though not curved"
- **date:** 2026-06-12
- **category:** dock
- **theme:** dock-rework / liquid-weight
- **status:** partial (DockStack stack mode fan-out; plate-clearance fix for cut-off)

### D17 — goo configurator broken; hover too quick/jittery; blobing/satellite broken
- **gist:** The goo configurator is almost entirely broken, the hover-over effects are far too quick and jittery, and the blobbing/satellite feature is broken.
- **quote:** "The goo configurator is almost entirely broken, the hover over effects are far too quick and jittery, and the blobing/satellite feature of the blobs are broken"
- **date:** 2026-06-12
- **category:** viz-procedural
- **theme:** blob-fix / liquid-weight
- **status:** partial (W-GOO-REDRESS: satellite bridge worst-case widen + pointer-wake; hover smoothing)

### D18 — fading-scroll list should be a glass-ui component; no edge fade when not scrolled; vertical too
- **gist:** Abstract the marquee/scroll element into a proper glass-ui component (a fading scroll list); it's bugged — no faded edges when not scrolled, and it must support vertical scrolling.
- **quote:** "This sort of element should be a glass-ui component, like a fading scroll list... we should NOT have faded elements when we're not scrolled... compatible with vertical scrolling, too"
- **date:** 2026-06-12
- **category:** components-encapsulation
- **theme:** KISS-encapsulation / abstract-it
- **status:** addressed (W-FADING-SCROLL: scroll-state-driven dual-path, both axes, sharp-at-rest)

### D19 — docks lack sections; abstract layering into a reusable component
- **gist:** The docks completely lack sections — they should have core rail areas, then a few sections, then nav arrows; abstract this and all the menus into a re-usable layering component.
- **quote:** "The docks now COMPLETELY lack sections: they should have the core areas of the rail, then a few sections, then the arrows for nav. ALl of the menus--abstract this into a re-suable component for layering"
- **date:** 2026-06-12
- **category:** dock
- **theme:** dock-rework / KISS-encapsulation
- **status:** addressed (W-DOCK-SECTIONS: declarative tripartite DockSection chassis)

### D20 — bottom-padding audit; FourierField needs better demos + configurator + epicycle/harmonic options
- **gist:** Items lack bottom padding (audit all such areas); the FourierField component needs better demos, a configurator, and more options for robust procedural epicycle AND summed-harmonic animations like fourier-analysis's web demo.
- **quote:** "These items don't have enough padding on the bottom... THe fourier field component needs better demos, a configurator, and more options... epicycles AND summed harmonics, like within fourier-analysis's web demo"
- **date:** 2026-06-12
- **category:** viz-procedural
- **theme:** viz-fidelity / configurator-rework
- **status:** addressed (W-FOURIER-STUDIO: partial-sum studio + R5-11 hero-hue)

### D21 — pointless black background hides the glassy effect; remove it
- **gist:** The black background makes the glassy effect invisible — remove it.
- **quote:** "I cannot even see the glassy effect of all of these items because of the pointless black background. Remove that."
- **date:** 2026-06-12
- **category:** demo-storybook
- **theme:** aurora-everywhere / glass-standardize
- **status:** addressed (ShowcaseFrame tier="field" / BG-2 fix; demos over real backgrounds)

### D22 — proper demos for all cards, variants, veil variant, with aurora backgrounds to show glassiness
- **gist:** Provide proper demos for all cards, card variants, the veil variant etc. with proper aurora backgrounds to demonstrate glassiness.
- **quote:** "we should have proper demos for all of our cards, our card variants, our veil variant, etc, with proper aurora backgrounds to demonstrate glassy-ness"
- **date:** 2026-06-12
- **category:** demo-storybook
- **theme:** glass-standardize / aurora-everywhere
- **status:** addressed (W-STAGE / W-DEMO-DESIGN demo redesign)

### D23 — ALL components glassy by default; consistent variants; audit every component (glass/veil)
- **gist:** Toasters and all components should be glassy by default and consistent in their variants — audit every component (buttons, dropdowns, popovers, toasts) and list them all; they should have glass, veil etc. variants.
- **quote:** "ALL of our components should be glassy by default and be consistent in their variants. Audit for all instances... They should have glass, veil, etc variants."
- **date:** 2026-06-12
- **category:** glass-material
- **theme:** glass-standardize
- **status:** addressed (W-SURFACE-AXIS surface=glass|veil|opaque across 11 surfaces; W-FEEDBACK-TONE)

### D24 — that button is too large and uninteresting / not glassy at all
- **gist:** A button is too large and uninteresting and not glassy at all.
- **quote:** "why is this buitton so large an uninteresting... this is not glassy at all"
- **date:** 2026-06-12
- **category:** glass-material
- **theme:** glass-standardize
- **status:** addressed (buttons.vue redesign; primary-audacious glass CTA out-presents destructive)

### D25 — sectioned progressbar broken; must be a blended gradient with distinct segments
- **gist:** The sectioned progress-bar variant is totally broken and should be a proper blended gradient with distinct segments.
- **quote:** "The sectioned variant of the progressbar is totally broken and should be a proper blended gradient with distinct segments"
- **date:** 2026-06-12
- **category:** components-encapsulation
- **theme:** glass-standardize
- **status:** addressed (W-PROGRESS-GRADIENT: one single-fill gradient, distinct segments + blend)

### D26 — EVERY core page must have an interesting procedural background; no blank/boring black/white
- **gist:** Every core page should carry an interesting background (fourier field, aurora, constellation, paper grid) within the idioms; no blank or boring black/white backgrounds.
- **quote:** "EVERY core page should have an interesting background... No blank or boring black/white backgrounds"
- **date:** 2026-06-12
- **category:** demo-storybook
- **theme:** aurora-everywhere
- **status:** addressed (W-STAGE per-category CATEGORY_DEFAULT_BG map, zero keyless)

### D27 — "Remove the disco effect everywhere. And smooth out the hover animations."
- **gist:** Remove the disco effect everywhere and smooth out the hover animations.
- **quote:** "Remove the disco effect everywhere. And smooth out the hover animations."
- **date:** 2026-06-12
- **category:** motion-animation
- **theme:** no-disco / liquid-weight
- **status:** addressed (W-GLASS-CAL H2a disco retirement; btn-audacious deleted, gold survives calm)

### D28 — glass blur is a hair too much; dial it back everywhere
- **gist:** The glass blur for every glass element is a hair too much — dial it back everywhere.
- **quote:** "The glass blur for every glass element is just a hair too much. Dial that back everywhere."
- **date:** 2026-06-12
- **category:** glass-material
- **theme:** no-blur / glass-standardize
- **status:** addressed (W-GLASS-CAL Unit 1: six blur radii dialed ~15-20% uniformly)

### D29 — 32-agent deep audit; gestalt path forward; NO quick solutions/workarounds; architectural transpositions for elegance
- **gist:** Deeply audit (32 agents) the plan + waves + changes; devise a gestalt path forward — idiomatic, gestalt approaches, architectural transpositions for elegance/simplicity/performance, no quick solutions/workarounds.
- **quote:** "architectural transpositions in the sake of elegance, simplicity, and performance above all are both necessary and desirable"
- **date:** 2026-06-12
- **category:** design-principles
- **theme:** gestalt-not-patch
- **status:** addressed (recurring; seeded the AZ/BA/BB tranches)

### D30 — NO legacy code
- **gist:** No legacy code — clean breaks, no aliases/shims.
- **quote:** "NO legacy code."
- **date:** 2026-06-12
- **category:** design-principles
- **theme:** no-legacy
- **status:** addressed (binding house law throughout)

### D31 — delineate chronically-deferred + deferred items, fold into the tranche
- **gist:** Delineate any chronically-deferred and deferred items and fold them into the new tranche; recap all prompts to ensure they've been addressed.
- **quote:** "Delineate any chronically deferred items and fold them into this new tranche... Recap ALL of our prompts and requests hitherto and ensure they've been addressed."
- **date:** 2026-06-12
- **category:** gates-quality-process
- **theme:** anti-amnesia / fold-deferrals
- **status:** addressed (disposition register + deferred-census)

### D32 — frontend-design plugin audit of all UI panes
- **gist:** Run a frontend-design plugin audit of the UI — all UI panes.
- **quote:** "run a frontend design plugin audit of our ui--all UI panes"
- **date:** 2026-06-12
- **category:** gates-quality-process
- **theme:** design-audit
- **status:** addressed (recurring; FD-delta lanes)

### D33 — better structure/suffuse design hierarchy; check visual incongruences
- **gist:** Better structure and suffuse proper design hierarchy of elements; check for obvious visual incongruences.
- **quote:** "How might we better structure and suffuse proper design hierarchy of elements? Check for any obvious visual incongruences."
- **date:** 2026-06-12
- **category:** design-principles
- **theme:** design-hierarchy
- **status:** addressed (W-HIERARCHY / W-HIERARCHY2)

### D34 — suffuse the design language (glass, grid, math, audacious type, colorful pops like the icons) within proportion
- **gist:** Better suffuse the design language of glass/grid/math/large audacious typography with colorful audacious pops (like the icons — increase within a sense of proportion) and animation targets.
- **quote:** "suffuse our design language of glass, grid, math, large and audacious typography, with colorful audacious pops, like those found in our icons... within a sense of proportion"
- **date:** 2026-06-12
- **category:** design-principles
- **theme:** cartoon-punch / suffusion / proportion
- **status:** addressed (W-SUFFUSE / W-SUFFUSE2 / W-ICON-CHIP)

### D35 — find glass-ui idioms to smoothen/refine/abstract; look for gaps
- **gist:** Identify glass-ui idioms/items to smoothen, refine, hone, abstract out, or refine within an existing component; look for gaps.
- **quote:** "what glass-ui items, if totally befitting, might we smoothen, refine, hone, and abstract out... Look for gaps."
- **date:** 2026-06-12
- **category:** components-encapsulation
- **theme:** KISS-encapsulation / abstract-it
- **status:** addressed (recurring abstraction directive)

### D36 — Why are slides glass items so gray? Have slides items (deck) been folded into the tranche?
- **gist:** The glass items in the slides repo render gray — why? And have the slides items (deck etc.) been folded into this tranche?
- **quote:** "Why are our glass items in the slides repo so gray? And have our slides items--deck, etc--been folded into this tranche."
- **date:** 2026-06-12
- **category:** color-identity
- **theme:** gray-cure
- **status:** addressed (root-caused to the 20% self-engage tint; W-DARK-MATERIAL scope 7 recalibrated to 4% calm floor)

### D37 — totally overhaul/standardize tabs; no legacy; pill good, underline for paper; too many superfluous types; spring animations too slow/not smooth
- **gist:** Totally overhaul and standardize tabs — no legacy code; pill variants are good, underline variants for paper scenarios; there are too many superfluous types; the spring animations are not smooth enough / too slow.
- **quote:** "totally overhaul and standardize our tabs. No legacy code... pill variants are good... underline variants... too many types... superfluous. THe animations for springs suck and are not smooth enough/too slow"
- **date:** 2026-06-12 (R10)
- **category:** components-encapsulation
- **theme:** tabs-standardize / no-legacy / liquid-weight
- **status:** addressed (W-TABS: one engine, two materials, retired segmented/overflow/multi-select/ui-Tabs; calibrated indicator clock)

### D38 — carousel/pager dots encapsulated in a ring (like the other)
- **gist:** The carousel dots should be encapsulated in a ring like the other pager.
- **quote:** "The carouself dots should be encapsulated in a ring like the other"
- **date:** 2026-06-12 (R10)
- **category:** components-encapsulation
- **theme:** glass-standardize / KISS-encapsulation
- **status:** addressed (W-PAGER: unified PagerDots + glass-pager-ring; CarouselDots/DeckPager reconciled)

### D39 — first-class deck dots/slide support within reason; some facilities left to the slides repo
- **gist:** Provide first-class side-deck dots and slide-component support, but within reason — some facilities should stay in the slides repo.
- **quote:** "first class side deck dots, slide component, support, though within reason--some of those facilities should be left to slides repo"
- **date:** 2026-06-12 (R10)
- **category:** components-encapsulation
- **theme:** deck-boundary / KISS-encapsulation
- **status:** addressed (deck-boundary cut; dots first-class, engine stays slides-local)

### D40 — better-designed glass system for cards/buttons; No gray
- **gist:** Use a better-designed glass system for cards, buttons, etc. — no gray.
- **quote:** "a better designed glass system for cards, buttons, etc. No gray."
- **date:** 2026-06-12 (R10)
- **category:** color-identity
- **theme:** gray-cure / glass-standardize
- **status:** addressed (W-NO-GRAY: warm-chroma floor on the neutral ladder + glass plates)

### D41 — design fanout: Fable for design, opus for the 6-agent workflow
- **gist:** Use Fable for the design lanes and opus for a 6-agent workflow for the slides/tabs/component analysis.
- **quote:** "Use Fable for the design. Use opus for a 6 agent workflow for the slides, tabs, and other component analysis."
- **date:** 2026-06-12 (R10)
- **category:** gates-quality-process
- **theme:** model-discipline
- **status:** addressed (design lanes inherit fable; opus fanout)

### D42 — reconcile other branch items; ensure
- **gist:** Identify what other branch items need reconciling and ensure they are.
- **quote:** "What other branch items do we need to reconcile, too. Ensure."
- **date:** 2026-06-12 (R10)
- **category:** gates-quality-process
- **theme:** anti-amnesia
- **status:** addressed

### D43 — Connectivity Atlas asks: settle seam, /handmark home, flip-suppression+test, ground profile + route transition, amount→value
- **gist:** Cross-repo (Atlas, largest consumer) capabilities glass-ui must not lose: onFlipSettled post-theme-flip seam, the /handmark home, a flip suppression that doesn't gag its own toggle (port the icon-morph test), a named aurora ground profile + route-transition idiom, MetricBadge amount→value migration.
- **quote:** "capabilities we cannot lose (need-shaped, not name-shaped)... post-theme-flip SETTLE seam... The hand-mark family's home... A flip suppression that doesn't gag its own toggle"
- **date:** 2026-06-12 / 2026-06-15
- **category:** cross-repo
- **theme:** cross-repo-needs / no-legacy
- **status:** addressed (W-ATLAS-RECONCILE + W-HANDMARK)

### D44 — Atlas: the d6 fixes 3.13.0 dropped must be folded or provably subsumed BY NAME, never silently
- **gist:** The d6 fixes that 3.13.0 dropped (HandMark content-node anchors, toggleDark forced-reflow deletion, icon-morph carve) must be folded or provably subsumed by name in the cut notes, never silently.
- **quote:** "fold or provably subsume, by name in the cut notes, never silently"
- **date:** 2026-06-12 / 2026-06-15
- **category:** cross-repo
- **theme:** anti-amnesia / no-legacy
- **status:** addressed (W-ATLAS-RECONCILE cut notes; invariant 11 minted)

### D45 — Atlas: highlighter finish (4 field deltas), natural-underline morphology, silver structure quad
- **gist:** New cargo with design-grade specs: the highlighter finish (geometry low not middle, ribbon hull, non-zero taper, cap square reaches DOM, isolation must not trap the multiply), the natural-underline pencil-boil morphology, and the silver structure quad (gold shipped, structure metal never did).
- **quote:** "the highlighter finish... four field deltas... the natural-underline morphology at the pencil-boil root... the silver structure quad"
- **date:** 2026-06-12 / 2026-06-15
- **category:** cross-repo
- **theme:** metallic-cure / hand-voice
- **status:** addressed (W-HANDMARK five highlighter deltas + seeded morphology; silver quad)

### D46 — Atlas: semver honesty on the major breaks; the d6 fork closes; lineage map ships in the notes
- **gist:** Be semver-honest about the A-list (major-grade) breaks; after this cut the d6 lineage retires and the fork closes; the lineage map ships in the cut notes.
- **quote:** "semver honesty on the A-list breaks (they're major-grade); after this cut the d6 lineage retires and the fork closes"
- **date:** 2026-06-12 / 2026-06-15
- **category:** cross-repo
- **theme:** no-legacy / lineage-honesty
- **status:** addressed (4.0.0 cut; fork-close protocol; invariant 11 = no out-of-band lineage publish)

### D47 — gestalt bar binds every visual wave (the BA execution discipline)
- **gist:** Maximal parallelism + opus fanout, and the gestalt bar binds every visual wave (per-mechanism greens do not close; a whole-page both-modes verdict is owed).
- **quote:** "Maximal parallelism, opus fanout, the gestalt bar binds every visual wave."
- **date:** 2026-06-12 → 2026-06-15 (repeated)
- **category:** gates-quality-process
- **theme:** gestalt-not-patch / real-paint-verify
- **status:** addressed (proof:ba-gestalt; caught the dock/shell title-occlusion at W-REFLECT2)

### D48 — fully publish and merge 4.0.0
- **gist:** Publish greenlight — fully publish and merge glass-ui 4.0.0.
- **quote:** "Hereupon, too, fully publish and merge 4.0.0."
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** publish-deploy
- **status:** addressed (4.0.0 published with provenance; d6 fork closed)

### D49 — note the keyframes.js BB-asks file
- **gist:** Note the keyframes→glass-ui BB asks file (KF-TO-GLASSUI-BB-ASKS.md).
- **quote:** "note this, too: /Users/mkbabb/Programming/keyframes.js/docs/tranches/K/KF-TO-GLASSUI-BB-ASKS.md"
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** cross-repo-needs
- **status:** addressed (W-PEER-SPINE / W-EASING-PRIMITIVE boundary law affirmed)

### D50 — SOTA iOS-27 liquid animation audit; pull-tab morph/squish; increase button glass-morphism
- **gist:** Run a SOTA iOS-27 liquid-animation audit (liquid fade-ins for opening apps/control-centre); for tabs, a liquid-glass tab you can PULL so it morphs/squishes to the new location; for buttons, increase glass-morphism.
- **quote:** "for our tabs, to have the liquid-glass tab facility, such that you can pull an active tab and it'll morph, squish... For buttons, we should increase the glass morphism."
- **date:** 2026-06-16
- **category:** siri-new-capability / motion-animation
- **theme:** ios27-fidelity / liquid-weight
- **status:** addressed (W-DRAG-MORPH pull-tab; W-BUTTON-GLASS/W-DEEP-GLASS increased morphism)

### D51 — iOS-27 increases glass-morphism WHILE increasing legibility; suffuse both
- **gist:** iOS-27 introduces increased glass-morphism facilities while also increasing legibility — suffuse both here.
- **quote:** "IOS 27 introduces increased glass-morphism facilities whilst also increasing legibility: we should plan to suffuse these herein"
- **date:** 2026-06-16
- **category:** glass-material
- **theme:** ios27-fidelity / legibility
- **status:** addressed (W-LENSING refraction + W55 adaptive legibility + on-glass foreground family)

### D52 — ALL animations liquid-glass-like: squishy, springy, quick, coupled fade in/out; web-animation principles
- **gist:** All animations should be liquid-glass-like — squishy, springy, quick, with coupled fade in and out; adhere to the principles of web animation.
- **quote:** "All animations should be liquid-glass like. Squishy, springy, quick with fade in and out coupled therein. Adhere to the princples of web animation."
- **date:** 2026-06-16
- **category:** motion-animation
- **theme:** liquid-weight / web-animation-canon
- **status:** addressed (W-MOTION-CANON P1-P6; W-LIQUID-REVEAL; W-PRESS-UNIFY)

### D53 — SOTA research against awwwards.com; leverage keyframes.js + value.js
- **gist:** Deploy another SOTA research set against awwwards.com (with the frontend-design plugin, in a fleet), leveraging the rich keyframes.js/value.js animation facilities; be conscious of rate limiting.
- **quote:** "deploy another SOTA research set against the current: https://www.awwwards.com. Leverage our rich and sophisticated animation facilities within keyframes.js and value.js"
- **date:** 2026-06-16
- **category:** gates-quality-process
- **theme:** sota-research / design-audit
- **status:** addressed (SOTA liquid-glass audit fleet → BB liquid-glass band)

### D54 — full frontend-design plugin wave + awwwards audit via chrome-devtools-mcp + SOTA research of those pages
- **gist:** Execute a full frontend-design plugin wave plus a full awwwards.com audit using a Chrome instance with chrome-devtools-mcp and SOTA research of the pages — which animation principles and design elements are used. Mind rate limiting.
- **quote:** "A full frontend design plugin wave should be executed, too, alongside a full awwwards.com audit, using a chrome instance with the chrome dev tools mcp"
- **date:** 2026-06-16
- **category:** gates-quality-process
- **theme:** sota-research / design-audit
- **status:** addressed

### D55 — harden the BB specs with another workflow; cross-repo coherence/cogency; deft integration + cogent demos
- **gist:** Harden the specs with another workflow; look across the whole constellation of repos for cross-wave coherence/cogency and dissonance/friction; ensure new features have deft integration into the story with cogent demos.
- **quote:** "Look at overall cross wave coherence and cogency. Look for areas of dissonance or friction. For any new features, ensure deft integration into our story with cogent demos."
- **date:** 2026-06-16
- **category:** design-principles
- **theme:** cross-repo-coherence / gestalt-not-patch
- **status:** addressed (BB unified brief; hardening fleets)

### D56 — new viz #1: dot-matrix wave (Claude co-work-like); dots shrink/scale, ripple in waves; subtle, configurable, first-class configurator
- **gist:** Augment procedural backgrounds with a new dot-matrix wave viz like the Claude co-work app — a series of dots that shrink and scale and ripple in gorgeous waves; subtle and configurable with a first-class configurator.
- **quote:** "a dot-matrix wave like approach, similar to that seen in the claude co-work application: ...dots that shrink and scale, and ripple in gorgeous waves. Subtle and configruable, with a first class configurator"
- **date:** 2026-06-16
- **category:** viz-procedural
- **theme:** new-viz / wave-math
- **status:** addressed (W-VIZ-DOTMATRIX / dot-flow-field / goo-dot-matrix specs)

### D57 — new viz #2: concentric ellipsoids/circles moving in waves; SOTA wave research; 3D space rendered in 2D plane; for hero/landing
- **gist:** Add a second new viz — concentric ellipsoid/circles that move in waves, grounded in SOTA wave-generation research, in a 3D space rendered only on a 2D plane (2D background animations for hero/landing); water-like fourier-defined waves.
- **quote:** "a series of concentric ellipsoid/circles that also move in waves... grounded in SOTA research backed wave generation, within a 3d space that render only in a 2d plane"
- **date:** 2026-06-16
- **category:** viz-procedural
- **theme:** new-viz / wave-math
- **status:** addressed (W-VIZ-CONCENTRIC spec)

### D58 — define a first-class procedural-animation SUITE (with aurora/constellation/fourier); leverage WebGPU
- **gist:** Fully define a suite of first-class procedural background animations alongside fourier/aurora/constellation; research/define water-like fourier-defined waves; each generation should leverage the modern web-design MCP and the latest most-performant WebGPU APIs.
- **quote:** "fully define these as a suite of first-class procederaul background animations... leverage the modern web design MCP and the altest most performant WebGPU apis"
- **date:** 2026-06-16
- **category:** viz-procedural
- **theme:** new-viz / webgpu / suite-cohesion
- **status:** addressed (W-VIZ-SUITE; useGpuSubstrate WebGPU-first; PROCEDURAL-SUITE.md)

### D59 — the procedural-animation suite must cover extant items too (blob, aurora, constellation, fourier field)
- **gist:** The procedural-animation suite must also cover the extant items (blob, aurora, constellation, fourier field), not only the new ones.
- **quote:** "the procedural-animation should cover: the blob, aurora, consteallation, fourier field, etc, too--extant items, too"
- **date:** 2026-06-16
- **category:** viz-procedural
- **theme:** suite-cohesion / webgpu
- **status:** addressed (each extant viz booked its own WebGPU-first migration successor)

### D60 — every repo in the constellation on the latest version of all packages; no legacy; pre-BB waves or woven in
- **gist:** Ensure every repo in the constellation uses the latest version of all packages — no exceptions, no legacy; add these as pre-BB waves or weave them in deftly.
- **quote:** "every single repo in our constellation is using the latest version of all packages--no exceptions. No legacy."
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** no-legacy / constellation-modernize
- **status:** addressed (constellation-modernize band; coherent-spine manifest)

### D61 — retire colors; value.js → 1.0; vaul-vue@0.4.1 fully abrogated; reconcile words/atlas/bbnf
- **gist:** Retire @mkbabb/colors; value.js gets a 1.0; vaul-vue@0.4.1 is fully abrogated; reconcile the other repos too (words, atlas, bbnf-lang/bbnf-buddy).
- **quote:** "Retire colors. Value.js gets a 1.0. vaul-vue@0.4.1 is fully abrogated. What of our other repos, too, like words, atlas... bbnf-lang/bbnf-buddy"
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** no-legacy / constellation-modernize / metallic-cure
- **status:** addressed (W-DRAWER-ABROGATE kills vaul + @vueuse-10 dual; colors retired; value→1.0 decided)

### D62 — sci-report seven glass-ui needs fold idiomatically into BB (compose, not fork)
- **gist:** Fold the Atlas's seven needs idiomatically into BB: vertical-dock collapse↔expand height-morph (BB-1), dock deck-morph (BB-4), per-element --glass-accent data-hue seam (BB-3), metallic-shimmer family gold/silver/bronze (BB-5), live-behind drawer direction-ladder (BB-2) — each written to compose with the existing design, not fork it; the always-expanded vs collapsible rail reconciled via an opt-in flag.
- **quote:** "Each item below is written to compose with the BB-tranche's existing design, not fork it"
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** cross-repo-needs / metallic-cure / dock-rework
- **status:** addressed (W-DOCK-MORPH-FAMILY BB-1/BB-4, W-GLASS-ACCENT BB-3, W-METAL-SHIMMER BB-5, W-DRAWER-ABROGATE BB-2)

### D63 — value.js and keyframes.js have active tranches — reconcile them with BB
- **gist:** value.js and keyframes.js have active tranches — what of those projects now (reconcile them with BB)?
- **quote:** "value.js and keyframes.js have active tranches--what of those projects now?"
- **date:** 2026-06-16
- **category:** cross-repo
- **theme:** cross-repo-coherence
- **status:** addressed (value.js-N ↔ kf-K reconciled into BB constellation-modernize band)

### D64 — re-deploy as needed when agents die (transient server errors); batch in groups of three; no partial completions
- **gist:** When agents die on transient server errors, re-deploy all failed workflows; batch into groups of three to avoid rate-limit walls; no partial completions.
- **quote:** "Properly batch them into groups of three. Re-deploy ALL workflows. No partial completions."
- **date:** 2026-06-16
- **category:** gates-quality-process
- **theme:** orchestration-resilience
- **status:** addressed (batches-of-3 hard-barrier discipline) — *largely process, included for the no-partial-completions principle*

---

## Standing/process edicts (captured once, not re-counted per recurrence)

- **Stop-hook (every pause):** "complete the plan IN TOTALITY... NO quick solutions, NO workarounds: idiomatic, gestalt approaches. Execute with maximal parallelism... Full perfected CI, and FULL slides.friday.institute deployment is a requirement." — design-principles / gestalt-not-patch. ADDRESSED.
- **Wall-recovery cron prompt** (repeated ~6×): "Continue. Re-deploy all workflows... The limit has been fully reset. Pick up where they left off." — orchestration-continuity. PROCESS NOISE (the embedded reflection-bar D04 is the load-bearing part).
- **Model discipline:** core/Fable for orchestration+design+synthesis, Opus/Sonnet for fanout; design audits inherit Fable. ADDRESSED.
- **Phase fence:** "This is NOT an implementation phase. Tranche development only." (when authoring) — process gate. ADDRESSED.
- **Agent git clause:** agents NEVER stage/commit/stash/checkout/reset/tag/publish; orchestrator owns the index. ADDRESSED.
- **Foreign-tree fence:** :5210 is the user's audit instance (leave it); :5173 is sci-report (never default/touch); slides docs/tranches/M is foreign; ppmycota purple never enters library tokens. ADDRESSED.
- **Slides deploy-state:** slides.friday.institute taken DOWN 2026-06-12; redeploy held for the user's re-publication greenlight (round-15 + BA adopt together). HELD.
