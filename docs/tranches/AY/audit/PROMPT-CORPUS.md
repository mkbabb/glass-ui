# AY / slides-L — the prompt corpus (every standing request, to ledger and fold)

The verbatim-distilled set of the user's requests across this long-horizon engagement, to
be RECAPPED and checked one-by-one in the deep audit. Each must end DONE / PARTIAL /
DEFERRED / CHRONICALLY-DEFERRED / FOLDED-INTO-<wave>. NO ad-hoc patches — every fix lands at
the ROOT (glass-ui where the component is shared; slides only for slide-specific content).

## A. Governing precepts (apply to ALL waves)
- NO quick solutions, NO workarounds, NO legacy code, NO fallbacks/fall-through, NO special
  cases, NO silent/graceful handling unless befitting (else fail explicitly). Idiomatic,
  gestalt approaches. Architectural transpositions for elegance/simplicity/performance.
- NO god modules (>500 lines → cohesive sub-modules). NO nested imports. NO test files in src.
  DRY. KISS. Colocate components + composables + constants + skeletons in feature dirs.
- Idiomatic Tailwind (@apply/@utility/@theme for design idioms, colocated); no monolithic
  global stylesheets, no deprecated CSS, no fragile magic-number/calc/min-max/z-index/viewport
  traps. Isomorphic style changes unless highly befitting.
- Triumvirate per feature: research → plan → harden → synthesize, LOOPED to a convergent
  optimum, then tranche-write. THEN implement (this phase = tranche development only).
- Language: read en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing. Abrogate "not just X,
  it's Y" / "X, not Y" antithesis, "quietly driving", "And that's what matters", vacuous
  taglines, editorializing, unsubstantiated claims, grandiloquence. Em dashes sparing +
  UNSPACED (word—word). Don't over-punctuate. like. this. Keep the author's levity/register
  (begotten/thereof/…); don't insert dissonant flourishes (no gratuitous "en coulisses").
  Align to the Friday Institute value proposition.

## B. ROOT-CAUSE / glass-ui (the AY tranche)
1. **Constellation → first-class glass-ui, consumed by slides.** glass-ui ALREADY has
   `src/components/custom/constellation/` — slides ships a bespoke `constellation.ts` copy.
   Root-fix: perfect the glass-ui component, have slides consume it, DELETE the slides copy.
2. **Constellation click = WARP the anomaly/found dot to the nearest point to the cursor**
   (not just the expanding ring) + a few easter eggs of dynamism.
3. **Constellation translucency**: more translucent in BOTH light and dark mode.
4. **Touch-target + font-size general increase** on mobile AND desktop, idiomatic + modern +
   non-contrived, across components (NOT just the dock coarse-pointer floor). Did we do it?
5. **Dock**: ios-like springy animations; the inner items must fade/morph in-and-out IN
   LOCKSTEP with the shell (today the shell shrinks first, items lag a few ms). Layering +
   rail + animation/design/interaction language cohesion. The dock-with-a-slider is broken.
   Fix from first principles with the layering system; collaborate with the keyframes.js dock
   work (the original perfected implementation). The slides bottom progress bar must NOT be
   baked into the dock — it's a page-bottom element (as on mobile).
6. **Aurora SOTA** (deploy 32 research agents): perfect style/visual-detail; simplify the
   options set; FULL OKLAB/OKLCH migration + a derive-color variant; modern WebGPU rendering;
   oil-pastel mode = painterly van-Gogh-redolent atomic brush strokes, depth + variation;
   landscape/skyscape + OpenAI-gradient reference, bettered procedurally; stunning arresting
   gradient-art backdrops from atoms (zones/noise/color); fully dynamic/interactive optional.
   A research-backed README.
7. **Blob SOTA** (deploy 32 research agents): perfect visual style/animation/interaction;
   seamless glass-ui integration; performance-first. A research-backed README.
8. **Fourier-field**: the foundational SOTA workflow/wave set (AX W43) — fold its research
   into the path forward; ensure it's a perfected, abstracted glass-ui element.
9. **Sliders**: collapse the slider zoo → `glass-scrubber` (standard, a FULLY ROUNDED iOS
   knob continuous with the track, not pill/offset) + `spectrum`; migrate ALL consumers.
   RESOLVED (AY.W-SLD1, resolution (b) revert+invert-gate): the standard thumb IS the
   fully-rounded iOS knob — `Slider.vue` paints `border-radius: 50%` over a square
   `aspect-ratio: 1` footprint, riding the continuous glass fill; `proof:slider-two-only`
   now REQUIRES the 50% circle. The user's words above match the shipped shape.
10. **Slider keep-dock-open / dock-with-slider**: fix the broken integration.
11. **Storybook prune + restructure** (the "wtf is X" list): remove header-ribbon route;
    fix/remove native-top-layer; remove glyph-face, disco-glyph; reconcile metric-badge vs
    metric-pill; configurator is not a primitive; glass-panel quality; card toggles broken;
    icon-button-token-ladder; use-token-color; drawer-live-behind placement; carousel progress
    bar broken; dock items scattered across sections; sidebar sections audit + restructure
    (where are aurora/blob?); speedtest primitives do NOT belong in glass-ui (audit speedtest,
    move ownership). Consistent animation/design/interaction language across EVERY component.
12. **Instrument-chassis**: the user said "remove all instrument chassis items" (slides) —
    confirm scope (slides-side vs glass-ui component retention).
13. **Encapsulation/DI/boundaries**: better service boundaries, DI patterns, pipeline
    orchestration; break god-modules; colocation; no legacy codepaths; lint+typecheck at
    every interval.
14. **glass-ui storybook demo perfected** + EVERY component: dock animations/layering/rail;
    a cohesive animation + design + interaction language. Research-backed READMEs for the
    core components (dock, constellation, aurora, blob, …) with use-cases/best-practices/
    design-considerations + examples/code-snippets.

## C. slides (the L tranche) — til-briefing
15. **Slides 5/6/7 GROUND-UP cohesive rebuild** (the most critical slides). 5 currently reads
    like a finale (so does 7); 6 is xray. The arc: problem → method → scale → (5) the state
    runs it & you can watch it → (6) see it run in the open → (7) so let's start. ONE promise,
    one proof, one ask; each slide owns one beat; cohesive end-to-end reading. Add ONE more
    slide if needed to accommodate.
16. **Xray slide (6) redolent of the REAL xray.friday.institute** (dark, mono numbered nav,
    blue text-highlight headline, "nutrition facts for LLMs", blue accent); SHOW MORE of the
    site; proper two-column on desktop (portal on the RIGHT); real hyperlinks; xray-styled
    JUST for slide 6. Remove the duplicate "see the live portal" (was on both 5 and 6).
17. **Nutrition-label claim is UNTRUE** ("Each monitored feed will publish a nutrition label")
    — reword to a true statement (xray's labels are real + live; the state-feed label is a goal).
18. **~$5M cut off** at the top of slide 2 (the hero figure clip). [landed this session — verify]
19. **Slide renames to reflect position/function** [landed: SlideTitle/Problem/Loop/Monitoring/
    Handoff/Xray/Ask]. Verify cohesion.
20. **Don't name Pitt**: say "a county"; frame de-minimis + the large-charter as a hypothetical/
    what-if ("frequently agencies are billed trivially small or outrageously large amounts —
    systems should catch, redress, target anomalies to cut waste/fraud/errors/abuse").
21. **"People and AI, each on the right task"** — the "AI handles the tedious…" caption was
    partially UNDER the headline (overlap). Fix layout.
22. **Slide 2 ~$5M arithmetic** must be honest (what does ~$5M cover vs the single charter).
23. **Constellation on EVERY befitting slide** (7 was missing it); translucency tune.
24. **Mobile**: slides squished (icon+text overlap, e.g. the AI-does list); negative space on
    the xray slide; the AI XRAY page must take full height on mobile + REMOVE the "Open AI
    XRAY" button (the portal launches); the graph/flow-chart aspect ratio wrong on mobile;
    complex slides (graphs, node/flow charts) — no occlusion, proper hierarchy/spacing.
25. **Access-key modal**: glass-ui styled (it's ugly). Locked slides on the homepage: slightly
    blurred + a lock symbol.
26. **PPTX download**: an icon; a popover for light/dark pptx download variants.
27. **Language**: the named rewrites (the "—and the state runs it" → "—the state runs it";
    "We hand over … one that scales — itself" unspaced; "Let's scope the first feed together"
    → "Let's work together"; the "few dollars"/"a few %" shoe-horned language — tune naturally).
28. **Slides consume glass-ui components** for every BEFITTING major component; NO ad-hoc/
    bespoke unless slide-specific. Converge on a glass-ui library optimum.

## D. slides (the L tranche) — feedback-coder
29. **The ongoing feedback-coder session/tranche**: consider its tranche + progress items
    DEEPLY. The honesty pass: the "1,845 delivered = the under-segmented/broken number"
    contradiction; "about one human's level" tile vs floor-not-ceiling; the overloaded S5
    close; the 0.72 metric identity (balanced-accuracy vs κ); S2/S4 density; math-notation
    lay-audience; audience-lock (research vs policymaker). Un-strand the J tranche docs
    (branch-only on deck/feedback-coder).

## E. process
30. **Recap ALL prompts hitherto + ensure addressed** (this doc). **Augment, don't replace**
    the existing AX (glass-ui) + slides tranches. **Delineate chronically-deferred** items
    (carried across ≥2 tranches) and fold them. 30+ waves expected for the next glass-ui
    tranche. Multi-agent orchestration (up to 32/128 parallel) for research/plan/harden/
    synthesize loops until convergent optimum. Reference npx modern-web-guidance@latest +
    developer.chrome.com/docs/modern-web-guidance for the animation/web SOTA.

## F. original slides content notes (the source brief — ground every figure here)
- AI for state govmt ops (Darryl Black). DIT issues: billing errors (DIT internet billing out
  of step with the provider — firewall/internet/content-filter disjunction); student counts
  across EDDIE/NSLP/EDS/CEP; anomalies across taxes/income/benefits/property; medicaid fraud.
- ERP/anomaly detection (can Workday do some of this?).
- The charter: ~$618K/month vs a ~$600K contract, for months, uncaught at DPI — ~$5M total.
- De-minimis: a county billed $3.50 (don't name Pitt) — likely cost more in staff time to cut.
- NSLP free-lunch overpayment (enrollment vs membership, pre-K counts — corner cases).
- Erin's data: a 10-year, dozens-of-grad-students project taken to ~75% in several [weeks?]
  then ~95% in two weeks (the meta-process; the unverified PACE figure — cut or source).
- Hybrid AI+human: AI does the tedious repeatable churn, humans step in at key junctures.
- Continuous monitoring from aggregated sources; add/change sources + parameters ad hoc.
