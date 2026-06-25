# Pass-E — the FULL storybook + component audit (per-page multi-context, iterative-to-convergence)

User goal (2026-06-22, the refined directive): NOT just the meta storybook page — EACH page gets its OWN full opus context across THREE independent lenses, synthesized by a SEPARATE opus, with findings folded/modified/augmented/pruned from the tranche; iterate until HIGH convergence (some pages take several loops). North star: design.md + glass + PAPER morphism + the per-viz PROCEDURAL-SUITE specs + the dock system + iOS-27 + typography-forward. HIGH animation affordance every component. Performant. Safari. NO legacy, NO workarounds — idiomatic, gestalt, architectural-transposition. A gestalt wave+tranche analysis workflow per category, iterative hardening.

## The engine (`bd-passE-page-deep`, parameterized by args.category/args.pages)
Per page, THREE independent opus contexts (parallel) → ONE separate opus synthesizer (pipeline) → ONE category gestalt+tranche analysis:
1. **demo** — the meta-storybook page: demo congruence · component ability (deftly composes a SERIES of glass-ui components?) · glass suffusion (over a LIVE colorful aurora field?) · structure (each sub-section in its OWN glassy card? main card BIGGER?) · path-label standardization · superfluous language · bugs.
2. **design** — the frontend-design lens (the frontend-design skill's distinctive/production-grade/avoid-generic-AI bar applied to design.md): visual hierarchy · affordance · ANIMATION affordance (every element alive at the iOS-27 bar?) · polish/distinctiveness · the iOS-27/paper/glass fidelity · spacing/rhythm · color suffusion · the top design moves.
3. **component** — the underlying COMPONENT + animation + procedural-viz: high animation affordance (four-state + spring + entrance/exit) · the procedural-suite spec adherence + GPU-only/Safari · performance (compositor-only/offscreen-pause) · idiomatic/no-legacy · the glass six-layer composite. → FOLD/MODIFY/AUGMENT/PRUNE on the tranche.
→ **synthesize** — a DIFFERENT opus reconciles the 3 → the per-page binding verdict + the ranked tranche actions + the convergence call.
→ **gestalt** — the category challenger: what's DONE vs REMAINS · cross-page patterns · the consolidated tranche fold + NEW waves · the per-page + category convergence % + which need more loops.

Outputs: `page-deep/<cat>-<slug>-{demo,design,component,SYNTHESIS}.md` + `<cat>-GESTALT.md`.

## The 118-page set (`PAGES.json`) + the dispatch plan (intelligent, paced vs the rate-wall)
| Category | Pages | Status |
|---|---|---|
| dock (7) | overview·layers·rail·morph-showcase·sections·cta-receive·dock-search | **RUNNING** (the hallmark + the explicit brainstorm ask) |
| substrates (11) | aurora·blob·constellation·fourier-field·glass-material·glass-panel·dot-flow-field·concentric·paper-grid·dot-matrix·goo-dot | queued (the vizzes — high priority) |
| motion (12) | springs·curve-gallery·scroll-vt·scroll-system·scroll-choreography·countup·reveal·deck·typewriter·handmark·animated-digit·split-chars | queued (scroll-choreography BROKEN — keyframes.js?) |
| foundations (13) · forms (12) · display (11) · containers (14) · data (14) · feedback (8) · navigation (4) · compositions (12) | | queued |

Dispatch: the dock validates the engine; then pace 1-2 category-workflows at a time (each ~29 agents) vs the server throttle. After all 11 → a TRANCHE-level gestalt (cross-category) + the fold → iterate the sub-converged pages.

## Cross-cutting findings (already known, fed to the agents)
- **Path standardization:** 28 pages use a local `/cat/slug` label, 90 use `@mkbabb/glass-ui/<subpath>` — the inconsistency the user named (`/motion/scroll-choreography` vs `@mkbabb`). Standardize: a demo-only page (no public export) vs an exported component — one convention.
- **scroll-choreography BROKEN** + the keyframes.js question (the motion band).
- **Glass demos need colorful aurora backgrounds** (the W-PAGE-BACKGROUND systemic — reinforced).
- **Each sub-section → its own glassy card; the main card BIGGER; leverage the dock APIs (contextual switching/animating); each page deftly uses glass-ui components.**

## The 3 refined directives (2026-06-23)
1. **BATCHED-3 dispatch (the rate-wall fix).** The first dock run fired 21+ agents at once → the server throttle clamped ALL of them (0 synthesized). The engine is RE-STRUCTURED to strict batches of 3 (a sequential `for (i+=3) await parallel(slice(i,i+3))` over the context-tasks, then the synth-tasks, then the gestalt). At most 3 agents concurrent — across the WHOLE session (only ONE batched-3 workflow runs at a time; the orchestrator does the video/standalone work directly, no competing agents). Slower, reliable.
2. **`W-STORY-PAGE-STANDARD` [NEW] — the standardized storybook-page COMPONENT + demo SUB-TYPES.** The user: "a standardized storybook page component, with sub-types for the various demos, interactions, etc — guarantee standard and conformity (with natural variation, not surgical/mechanical banality)." → MINT a standardized `<StoryPage>` chassis + a DEMO SUB-TYPE taxonomy each page composes — `<DemoStage>` (full-bleed live-field viz/procedural) · `<DemoSpecimen>` (a component in a glassy card, multi-state) · `<DemoInteraction>` (manipulable) · `<DemoMatrix>` (variant/state grid) · `<DemoComposition>` (multi-component scene) — each guaranteeing the conformity (the glassy sub-cards, header+rule, background, the iOS-27/paper/glass language) while the demo CONTENT varies naturally. SUPERSEDES/EXTENDS W-PAGE-CHASSIS (the duplicate-header fold becomes the standardized chassis). The Pass-E per-page audits CLASSIFY each page's demo kind → the taxonomy is refined from the real corpus. Real gate: every page composes a StoryPage + a sub-type (no bespoke scaffold); the conformity invariants hold (header-rule, glassy-cards, background) WHILE the sub-type content is free.
3. **`W-LIQUID-ENTRANCE-GENERAL` [NEW] — the iOS-27 squish/morph/fade, generalized + Safari.** From the frame-by-frame (`liquid-video/ANALYSIS.md`): the Control-Center liquid entrance (scale-from-squished + fade + spring-overshoot + backdrop-engage). The primitives EXIST (`.glass-reveal`/`useLiquidReveal`/`useLiquidFlex`/the springs); the gap is GENERALIZATION (every surface entrance, not just top-layer overlays) + GRACE (a pronounced ≈0.88 volume-preserving squish, not a near-flat scale) + SAFARI (the `filter` blur-settle on WebKit). AUGMENTS W-LIQUID-REVEAL; binds the Band-16/W-STORY-PAGE-STANDARD glassy-sub-card entrance. Real gate: a π frame-series — squish (scale≠1 + volume-preserving) + fade (coupled) + settle (overshoot), both engines.

## Status (2026-06-23)
- Engine: batched-3 ✓. Dock Pass-E RE-DEPLOYED (batched-3) — running.
- Video: frame-by-frame DONE (orchestrator-direct) → `W-LIQUID-ENTRANCE-GENERAL` drafted.
- `W-STORY-PAGE-STANDARD` drafted (refined by the audits).
- Next: dock gestalt lands → fold → dispatch the next category (substrates/motion) batched-3 → ... → the tranche gestalt + the 2 new waves authored + enrolled (Band 17).

## Chunked-dispatch ledger (the rate-wall grind — ~4 pages/chunk ≈ 16 agents/invocation, runGestalt only on the category-final)
The engine is chunk-resilient: `args.pages` = a 3-4 page chunk, `args.runGestalt` = true only on the per-category gestalt pass. Each chunk re-invokes via scriptPath; a walled chunk resumes via `resumeFromRunId`.

| Category | Pages | Chunks | Status |
|---|---|---|---|
| dock (7) | overview·layers·rail·morph-showcase·sections·cta-receive·dock-search | done (6/7 contexts) | GESTALT synthesized orchestrator-direct (`dock-GESTALT.md`); 4 fixes applied (`PROTOTYPE-FIXES.md`); dock-search un-audited. ~partial (needs the systemic-chassis loop 2) |
| substrates (11) | aurora·blob·constellation·fourier-field \| glass-material·glass-panel·dot-flow-field·concentric \| paper-grid·dot-matrix·goo-dot | C1 RUNNING · C2·C3·gestalt queued | the vizzes |
| motion (12) | springs·curve-gallery·scroll-vt·scroll-system \| scroll-choreography·countup·reveal·deck \| typewriter·handmark·animated-digit·split-chars | queued | scroll-choreography BROKEN |
| foundations (13)·forms (12)·display (11)·containers (14)·data (14)·feedback (8)·navigation (4)·compositions (12) | | queued | |

Total: ~111 pages remaining × (3 contexts + 1 synth) + per-category gestalts. Paced batches-of-3, ~4 pages/chunk. The grind continues per-chunk until all 11 categories' gestalts land → the TRANCHE-level gestalt + the fold → iterate the sub-converged pages.

## Convergence
The bar: each page's 3-context synthesis CLEAN (the design + component + demo findings folded), the glass+paper+animation+iOS-27 north star MET, the tranche updated, and the category gestalt CONVERGED (no page needing another loop). Tracked per page + per category here as the gestalts land.
