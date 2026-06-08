# AX — Master requirements ledger (full prompt recapitulation)

**Status**: SEED for the AX deep audit. Every line is a verbatim-faithful distillation of a user
directive across the AU→AV→AW arc and the AX-opening prompt. The AX audit fleet verifies each
against current code + the live demo, assigns a root cause + a gestalt fix, and routes it to an AX
wave. NOTHING here is "done" until audited GREEN against the live product (the headless-gate-green /
visually-broken gap is the cardinal lesson of AW).

## §0 Mandate (governs every wave)

- **Tranche development ONLY** — AX is plan/research/write, NOT implementation. No merges, no publish.
- **30+ waves.** Convergent-loop method per feature: research → plan → harden → synthesize → tranche
  writing, LOOPED until a convergent optimum, prototyping as needed.
- **NO quick solutions, NO workarounds, NO legacy code, NO fallbacks, NO special cases, no effusive
  dynamism, NO nested imports, NO test files in src.** Architectural transpositions for elegance,
  simplicity, performance are necessary and desirable. This is a development product.
- **Excise or fail explicitly** — every legacy/deprecated/temporary/fallback/fall-through path is
  either deleted or made to fail loudly. No silent/graceful handling unless befitting.
- **DRY. KISS.** No god modules (>500 lines split into cohesive sub-modules). Better encapsulation,
  service boundaries, DI, pipeline orchestration. Colocate components+composables; sub-component dirs
  (components/composables/constants/skeletons) where befitting. Logical grouping, no contrivance.
- **Idiomatic Tailwind** — localized design-idiom layer that still colocates; no non-idiomatic
  utility soup, no monolithic global stylesheets that should be scoped, no archaic CSS, no fragile
  magic-number/calc/min-max/viewport/z-index chains. Style changes isomorphic unless highly befitting.
- **Lint + typecheck at every interval.** Collaborate with the keyframes.js agent workflow.
- **VISUAL TRUTH** — a wave is not closed on a green headless gate; it closes on a live Playwright +
  frontend-design audit (affordance, hierarchy, spacing, padding, NO visual occlusion).

## §1 DOCK — top priority (move to the top of the tranche)

1. Animations COMPLETELY broken — not springy, not iOS-like. The box shrinks FIRST, then the inner
   items fade/shrink a few ms later (the float/lag defect). Items must fade/morph IN STEP with the
   box on one clock.
2. Fix from FIRST PRINCIPLES with the layering system. Reference: keyframes.js's FIRST dock
   implementation (perfected, many commits ago) + the perfected glass-ui dock (many commits ago).
   Audit the keyframes.js tranche + the current tranche for the regression.
3. Dock-with-slider is broken (the keepDockOpen contract).
4. Dock OVERFLOW/WRAP case: make it natural, idiomatic, properly WRAPPED + SHADOWED, handling edge
   cases. The current wrap is not correctly stylized.
5. Dock items appear in MANY different sidebar sections — consolidate.
6. Rail component refinement.
7. Remove the `/dock/icon-button-token-ladder` story (token-ladder debris).
8. The dock springiness must be perfected (iOS spring physics).

## §2 AURORA — perfection (32 research agents in a parallel workflow; research-backed README)

1. CORE BROKEN: the live aurora canvas renders dark; only the preset thumbnails bake. (Confirmed live.)
2. Simplify the options set. The wispy-sky default is a good starting point.
3. Derive-color variant. FULL + TOTAL migration to modern color spaces (OKLAB/OKLCH everywhere).
4. Modern WebGPU rendering techniques.
5. Oil-pastel mode: much more visually interesting, painterly, LESS uniform, depth — resemble actual
   oil-pastel works of art.
6. Van-Gogh variant: proper ATOMIC brush strokes with depth, variation, congruence to actual Van Gogh
   works (NO complex subject matter). Ultra-high-fidelity brush strokes.
7. Stunning, arresting gradient-art backdrops, procedurally generated from ATOMS (zones, noise,
   color, control elements). Reference landscape/skyscape photography + OpenAI gradient backdrops —
   and BETTER them programmatically.
8. Fully dynamic + interactive when requested.
9. Research-backed README: use cases, best practices, design considerations, examples, code snippets.

## §3 BLOB — perfection (32 research agents in a parallel workflow; research-backed README)

1. TOTALLY BROKEN (confirmed live).
2. Visual style, animation, interaction design — visually appealing + intuitive.
3. Seamless integration with the rest of glass-ui.
4. Performance — modern web tech, smooth without sacrificing visual quality.
5. Research-backed README (as §2.9).

## §4 CONSTELLATION

1. Abstract into a glass-ui component (if not already — it now ships as `/constellation`; verify the
   abstraction is complete + consumer-ready for slides).
2. Visibility: not visible enough in dark mode, nor quite enough in light mode.
3. Fully dynamic + interactive.
4. Research-backed README.

## §5 SPECULAR

1. The specular hover effect is FAR too extreme (the W23/W24 moving-specular). Tune to subtle.

## §6 STORYBOOK STRUCTURE (128 agents across several workflows/waves/parallel)

1. Re-invent the storybook structure from the ground up.
2. Audit + restructure EVERY sidebar section. Where are the aurora + blob items? (mis-filed/missing)
3. PRUNE legacy + every pointed-out item (see §7).
4. Dock items scattered across sections — consolidate to one home.
5. Logical grouping without contrivance.
6. Perfect EVERY component in the storybook (animation/design/interaction language cohesion).

## §7 PRIMITIVES — audit / prune / fix (each is a "wtf / remove / broken / why")

- `header-ribbon` — REMOVE.
- `foundations/native-top-layer` — totally BROKEN.
- `primitives/glyph-face` — REMOVE.
- `primitives/disco-glyph` — wtf (justify or remove).
- `primitives/hover-popover` — why a primitive? (recategorize).
- `primitives/configurator` — why a primitive? (recategorize — it is a composition).
- `primitives/glass-panel` — all of them SUCK (redesign).
- `primitives/card` — none of the toggles work (broken).
- `primitives/metric-badge` vs `primitives/metric-pill` — disambiguate / collapse.
- `composables/use-token-color` — wtf (justify or restructure).
- `compositions/drawer-live-behind` — wtf.
- instrument-chassis items — REMOVE ALL.
- Fonts — none are correct.
- `/dock/icon-button-token-ladder` — wtf (remove).

## §8 SPEEDTEST OWNERSHIP

1. Speedtest primitives must be owned by speedtest TOTALLY, not glass-ui. Audit the speedtest repo +
   devise the repatriation (the W19/R0 native-first receive, completed for muster-blocking only).
   metric-cell, metric-stack, instrument-chassis/rail, metric-badge/pill — owner audit.

## §9 SLIDERS — consolidate

1. Too many kinds. Reduce to essentially TWO: standard (rename to `glass-scrubber`) + spectrum.
2. The standard `glass-scrubber` knob must be FULLY ROUNDED (iOS), NOT pill-shaped, NOT offset — the
   knob + track form ONE continuous track item.
3. ALL consumers port to this.
4. The carousel progress bar is broken (`navigation/carousel`).

## §10 SLIDES PRIMITIVE / DECK

1. A slides primitive with a slides bottom bar. The slides bottom progress bar must NOT be baked into
   the dock — it is a page-bottom element (as it was before, as on mobile). (`/deck` family.)

## §11 ENCAPSULATION / ARCHITECTURE (8 agents plan-mode; + 6 frontend-design; + 6 encapsulation)

1. Legacy excision sweep (per §0): no fallback/workaround/special-case/nested-import/test-in-src.
2. No god modules (>500 lines). Break + colocate + sub-component dirs.
3. Better composables/useX, state/store management, encapsulation, DI, service boundaries, pipeline
   orchestration.
4. Brittle/nested selector + reactivity audit. Non-idiomatic Tailwind + bespoke styling audit.
5. Converge on a LIBRARY OPTIMUM: every major component slides needs that's BEFITTING lives in
   glass-ui. Identify gaps in glass-ui vs gaps in slides.

## §12 SLIDES (slides repo — coordinated tranche, folded here for tracking)

- til-briefing#2: the ~$5M is cut off at the top; do NOT call out Pitt — say "a County" + frame as a
  hypothetical/what-if ("Frequently, agencies are billed for trivially small amounts, or outrageously
  large ones — before creating the waste, before the transaction, systems should catch, redress, and
  target anomalies to cut waste, fraud, errors, abuse").
- "AI handles the tedious, repeatable processing, at scale" sits partially under the "People and AI,
  each on the right task" headline (fix the overlap).
- The xray slide must be its OWN slide (not chopped into til-briefing#5).
- til-briefing#6 — wtf; build a proper CONCLUSION slide. Restructure 5+6 totally (add ONE slide if
  needed).
- Dock springiness on slides; the bottom progress bar at page-bottom (not in dock; §10).
- "few dollars" / "few dollars" language — not shoehorned; tune.
- Animation lag (the dock shrink-before-items defect on slides too).
- Download pptx should have icons + a popover for light/dark pptx download.
- Mobile: some slides squished (the "AI does the exhaustive cross-referencing…" bullet block).
- The AI XRAY page must take full height on mobile; REMOVE the "Open AI XRAY" button (the portal does
  it).
- Negative space (too much) on the xray/related slide.
- Constellation visibility (dark + light).
- Graph/node-flow charts: aspect ratio wrong on mobile; the graph is "not right".
- Access-key modal: make it glass-ui-styled (currently ugly).
- Locked slides on the homepage: slightly blurred + a lock symbol.

## §13 DEFERRED + CHRONICALLY-DEFERRED (fold ALL into AX)

- W19 orphan-prune / speedtest repatriation (muster-blocked; the dirty-sibling wall).
- band-G W29 (Aurora-Configurator restyle), W30 (Carousel redesign), W32 (Lighthouse) — never run.
- W33 close (gate-fleet registration, README "planned→landed" sweep, FINAL).
- The aurora/blob/dock README research deficit (§2/§3/§4 — no research-backed READMEs exist).
- The W24 `card-lift` `@utility` non-emit (Tailwind-v4 content-scan snag) — root-cause, not inline.
- Consumer adoptions: value.js / words / muster / fourier (dirty-tree blocked); speedtest E2
  (aurora-derive opt-in) + R0 (native repatriation).
- slides H W2-W11 (the real visual-refinement waves — never run; blocked behind the user's WIP).
- The headless-green / visually-broken GAP — a standing AX gate-philosophy wave (every visual wave
  closes on a live audit, not a headless proof).

## §14 ORIGINAL AW PLAN — audit against delivery

Audit the original AU/AV/AW plans + every wave vs what shipped (3.4.0→3.6.0 + the batch-1 merges).
Which waves are genuinely done (visually-true), which are headless-green-only, which regressed
(aurora core, blob, specular, dock). The batch-1 merges (aurora W4/6/7/8, blob W9-11, glass-atoms
W25-26, band-G W28/W31) are on `at-dock-convergence @ eaba94f`, NOT published — audit, do not trust
the green claims.

## §15 CONSTELLATION interactivity (new — AX directive 2026-06-07)

1. **Click-to-warp the focal anomaly.** On click, the CURRENT anomaly / focal node warps to the
   click point — specifically to the CLOSEST lattice point to the cursor — and SMOOTHLY INTERPOLATES
   there (spring/eased path, not a snap). First shipped in the slides constellation; **GENERALIZE it**
   as a reusable constellation-component interaction (a `warpTo(point)` / pointer-driven focal
   transition on the abstracted glass-ui `/constellation`, not a slides-local hack). Folds into the
   AX constellation wave (W17) + the slides constellation adoption.

## §16 CROSS-CONSTELLATION analysis + idiom maximization (new — AX directive 2026-06-07)

1. **Analyze the constellation tranches — the LAST 10 (waves/tranches) in EACH repo** (glass-ui,
   keyframes.js, value.js, fourier-analysis, slides, speedtest, muster, words, bbnf-buddy, bbnf-lang)
   — 32-agent parallel workflow. Fold the findings (deferred/dropped items, lessons, patterns,
   cross-repo debt) into ADDITIONAL AX waves.
2. **Where can we better LEVERAGE the constellation component?** Across value.js / keyframes.js /
   fourier / slides / the consumers — where would the abstracted `/constellation` (with §15 warp)
   serve a real surface?
3. **Where can we INCREASE + MAXIMIZE glass-ui idioms?** Per consumer — where is glass-ui hand-rolled
   / under-adopted / using a non-idiomatic pattern that a glass-ui idiom would replace? Maximize the
   library-optimum (§11.5).
4. **NOTHING DEFERRED OR DROPPED.** Recap the original EDICTS (every prompt across AU→AV→AW→AX) +
   analyze the LAST tranche (AW) exhaustively — every deferred / chronically-deferred / dropped /
   silently-skipped item is enumerated and folded into an AX wave. Zero loss.

## §17 SPEC-FORMATION + HARDENING discipline (governs the AX close-out this session)

1. **FULLY-FORMED wave specifications** — every AX wave gets a complete spec doc in
   `docs/tranches/AX/waves/AX.Wnn-*.md` (not just the charter row): State/Goal/Scope/FileBounds/
   Disjointness/Triumvirate/HardGate(incl. the VISUAL-TRUTH live-audit)/Cadence/Artefacts/
   CommitPlan/Dependencies/Archaeology — the bbnf tranche-format.
2. **ALL pursuant + ALIGNED TO precepts/** — every wave spec conforms to the `docs/precepts/`
   submodule invariants (read them; cite them; no wave violates a precept).
3. **CHALLENGE + HARDEN** — adversarial critique of every wave spec → converge. **Iterative loop
   until convergence.** The goal this session: a FULLY-HARDENED spec to DRIVE AX + the constellation
   NEXT session. NO development now.
