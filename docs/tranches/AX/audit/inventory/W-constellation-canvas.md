# Inventory — W-constellation-canvas (W17 + W37 + W42 + W43)

**Lane:** the Canvas2D substrate + the constellation lattice + the two planned graphics-substrate waves.
**HEAD inventoried:** `b03246c` (NB: the dispatch header named `c72d2ac`; actual repo HEAD is `b03246c`, 3.8.0 line). Read-only inventory — NO edits.

Scope: **W17** constellation tokens+warp (charter: complete), **W37** canvas2d lifecycle + text-highlight (charter: complete), **W42** liquid-morph substrate (planned), **W43** fourier-field first-class (planned).

---

## W17 — Constellation: light/dark tokens + focal-warp seam + slides adopt — **DONE (library-side); slides-adopt DEFERRED to W30/W31**

**Status: DONE.** Audit `docs/tranches/AX/audit/W17-constellation-port.json` records `status: GREEN`; gates re-run GREEN at HEAD this pass.

Live-verified at source:
- `--constellation-*` token block present with **both arms** — `:root` (`tokens.css:495-512`) + `.dark` (`:1758-1771`). Six legibility tokens (`node`/`node-dim`/`line`/`edge-alpha`/`edge-focus-alpha`/`alpha`) + a neutral `--constellation-accent` consumer-preset default. PLAIN-hsl literals, Canvas2D-safe.
- `readPalette` reads the full set (6/6); the magic `0.17`/`0.24` paint literals are now `var(--constellation-edge-alpha)`/`var(--constellation-alpha)` reads.
- Focal-node seam is FIRST-CLASS: `field.focalIndex` + `field.warp` + `nearestNode` + `warpStep` (dt-clamped critically-damped integrator) + `warpTo` + `setWarpTarget` in `constellationField.ts`; `warpOnClick` prop + `warpTo` `defineExpose` + a SEPARATE warp `pointerdown` guard (hoisted `toLocal`) in `Constellation.vue`. `useSpring` FORBIDDEN — `warpStep` advances inside the substrate's single rAF (verified: no second rAF).
- Composes the W37 `useCanvas2D` substrate (`Constellation.vue:3,134`).
- README (`README.md`, 22 KB) + demo story (`demo/stories/substrates/constellation.vue`, with warp section) + `/constellation` subpath all present.

**Gates GREEN (re-run this pass):**
- `proof:constellation-tokens` → PASS (token-block-present both arms / readPalette 6/6 / no-light-dark + transitive-var).
- `proof:constellation-field` → PASS (11 tests; 4 original + 7 focal/warp).
- `proof:constellation-warp-live` → device-proven GREEN per audit (focal centroid migrates→converges-onto-node→chases-live-target→spring-eased; chromium-headless-new).
- `proof:constellation-substrate-single` → PASS.

**One ratified divergence (sound):** `--constellation-edge-anomaly-alpha` → renamed `--constellation-edge-focus-alpha` (the deck-domain word "anomaly" collided with the `proof:constellation-substrate-single` ANOMALY-IS-SKIN clause; the neutral name is MORE precept-correct — presets-in-consumers). README documents the canonical name.

**Deferred (correctly routed, NOT this lane):**
- slides `constellation.ts` deletion (510 lines) + anomaly drawOverlay skin → **W30/W31** (separate repo, gated on the AX publish per §4 note 12).
- slides `--constellation-alpha` override drop/retune-to-recessive-default → **W31 fold §E** (gated on AX publish).
- `--constellation-line` light-dark()→Canvas2D leak is ALREADY FIXED slides-side (I-session `constellation.ts:116`, deck `9f08ded`) — W30 satisfied-witness, do-not-re-fix.

**GAP (minor, downstream):** W57 (convergence-2) routes P7 "some heros should leverage a `<Constellation>`" — that demo-hero adoption is a NEW consumer of the W17 surface but lands in the W57 lane, not here. No action owed by W17.

---

## W37 — Canvas2D lifecycle substrate + text-highlight — **DONE (headless GREEN); π-lane live-verify PENDING (orchestrator-owned)**

**Status: DONE / live-pending.** Audit `docs/tranches/AX/audit/W37-canvas2d-text-highlight.json` records `status: GREEN` (headless). A π-lane VISUAL-TRUTH audit (real Metal GPU, light+dark, ≥3 viewports) is the binding close criterion and is recorded as orchestrator-owned NOT-YET-EXECUTED.

**Honest framing (§4 note 12 correction, sound):** the charter's "two NET-NEW substrates" title is FALSIFIED — BOTH substrates already existed at HEAD. W37's real work was **publish / name / route + the one net-new helper (`resolveCanvasColor`)**, not from-scratch authoring. No landed substrate was re-implemented.

Live-verified at source:
- `src/composables/glass/canvas2d/useCanvas2D.ts` — renamed factory `createCanvas2D`→`useCanvas2D` + `useCanvasLifecycle` alias (`:347`). Three-reason park + PRM live-monitor + ResizeObserver DPR-fit.
- `src/composables/glass/canvas2d/resolveCanvasColor.ts` — NEW probe-span `light-dark()`→`rgb()` resolver (token READER, never mutates host inline style).
- `/canvas` subpath shipped (`src/subpaths/canvas.ts`; `package.json ./canvas` exports; `import('@mkbabb/glass-ui/canvas')` resolves).
- `useTextHighlight` re-homed `/dom`→`/motion-core` (`src/composables/motion/useTextHighlight.ts`; barrel export `composables/motion/core/index.ts:53`); root-barrel reach preserved via targeted re-export (`src/index.ts:177`).
- **FuzzySearch `<mark>` retirement VERIFIED-already-landed:** `FuzzySearch.vue:9,79` consumes `useTextHighlight("glass-search-mark")` + `setFromMatches`; zero `<mark>` DOM mutation.
- **Two REAL in-repo consumers** of `useCanvas2D` (clears ≥2-consumer bar against real consumers): `Constellation.vue:3` + `FourierField.vue:3` (the live re-diagnosis surfaced FourierField as the in-repo second consumer the spec assumed slides-side; re-pointed in the same wave — binding-verification strengthens the bar).
- api/index.ts seats the canvas + text-highlight public types.

**Gates GREEN (re-run this pass):**
- `proof:resolve-canvas-color` → PASS (8 tests).
- `proof:text-highlight` → PASS (13 tests across 2 files).
- Per audit: `proof:canvas2d-substrate`, `proof:constellation-substrate-single`, `proof:gate-script-parity`, `proof:subpath-enumeration` (73==73), `proof:vueuse-free-root` all GREEN.

**Deferred (correctly routed):**
- FourierField's bespoke `resolveColorString` probe (`FourierField.vue:117-126`) drop-onto-`resolveCanvasColor` → **W30/W31** slides-side adoption note (NOT executed here; FourierField's color path runs through the value.js `colorResolver` seam — a separate concern).
- fourier equation-var + words search-mark `useTextHighlight` adoptions + the fourier `^3.1.0`→published pin bump → **W34** idiom census.
- CLAUDE.md subpath census edit (add `/canvas`; the "70 flat JS subpaths" prose is pre-drifted to 73, un-gated) → orchestrator-owned (not in W37 FileBounds).

**GAP (the one open item):** the W37 π-lane live audit is recorded as PENDING. Three checks owed: (1) a `useCanvas2D` 2D surface PARKS offscreen + tab-hidden + PRM; (2) `resolveCanvasColor` paints the resolved hue in BOTH modes (the W30 cardinal-defect class proven fixed at the library layer); (3) FuzzySearch marks paint via `CSS.highlights` with zero `<mark>`. This is the standard "complete ≠ headless-green" carry — folds into the **W33 close** π-capture sweep (or whenever the orchestrator runs the live fleet). NOT a re-open of W37 dev work.

---

## W42 — The unified liquid-morph substrate (`useLiquidMorph`/`--morph-t`/`MorphGroup`) — **NOT-STARTED; one open RATIFY hinge**

**Status: NOT-STARTED (planned).** No general substrate exists in the tree.

Confirmed at source (the three born-RED witnesses HOLD at HEAD):
- `find src/composables -name 'useLiquidMorph.ts' -o -name 'useMorph*.ts'` → NONE.
- `grep -rn 'MorphGroup\|provideMorphGroup\|--morph-t\b' src/` → ZERO general-substrate hits.
- The morph idiom is still per-component bespoke: the dock carries the FIRST-instance dock-flavored model only — `src/components/custom/dock/composables/dockMorphContext.ts` (W02) + `useLayerTransition` (W01). The file's OWN header states: *"This is the dock-flavored first instance of the general `MorphGroup` … AX.W42 generalizes it; W02 establishes the seam it builds on."* So `dockMorphContext`/`--dock-morph-t` is W01/W02 delivery — NOT partial W42.
- value.js STILL carries its own box-leads-content FLIP-width fork (the named W42/W34 cross-repo adoption target — not re-confirmed against the live pin this pass, but the barrel never re-exported the primitive so the fork is structurally still owed).

**Spec readiness: HIGH.** `waves/AX.W42-liquid-morph-substrate.md` is a complete bbnf spec (born-RED witnesses, the seven folds, the scalar-name bridge `--morph-t`↔`--dock-morph-t`, FileBounds, Triumvirate, HardGate). Research is in hand: `research/liquidglass-synthesis.md §1.4` + `liquidglass-research-corpus.json` (facets 1/3/12/26/27/28/29/30). The substrate is ~70% ASSEMBLY of in-tree primitives.

**THE ONE OPEN HINGE (must resolve before drive):** `PROTOTYPE-HARDEN.md §2A` records W42 as *"the one remaining open hinge"* — the **distinct-wave-vs-fold-into-W01 + second-consumer + axes-union RATIFY**. PoC #4 (PROTOTYPE-HARDEN row 4) must spike GO: prototype `useLiquidMorph(elRef)` driving ONE second consumer (UnderlineTabs indicator glide OR a card→detail expand) off the `--dock-morph-t` pattern; GO iff the second consumer reads BETTER (not just compiles) off the substrate AND the axes-union/second-consumer choices ratify against a real morph. dependsOn W01 (HARD — there is no single-scalar model to lift until W01 lands; W01 IS complete).

**Convergence interaction:** convergence-2 (W44-W59) does NOT re-activate W42 as its own wave. W56 (squircle, DEV-COMPLETE) notes "W42's dock-morph reads the same `--corner-k-*` band" and W52 (liquid-glass material, live-verified) is cross-referenced by D19 ("relates W42 liquid-morph"). So the convergence material LANDED the glass-material identity that W42 would morph, but W42's general substrate itself is unbuilt.

---

## W43 — Fourier-field first-class (per-variant intensity + citizenship + mid-tranche SOTA) — **NOT-STARTED; all five witnesses RED**

**Status: NOT-STARTED (planned).** Only the `/fourier-field` subpath leg is landed (partial citizenship).

Confirmed at source (all FIVE born-RED witnesses HOLD at HEAD):
- **W1:** `OUTLINE_PEAK_ALPHA = 0.24` still present at `FourierField.vue:103`, used at `:237/:242/:282/:294`. `grep -c "peakAlpha|headGlow|intensity"` = **0** — no per-variant intensity BUNDLE, no `intensity` prop. The `VariantPreset` interface (`:59-77`) carries NO `peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`.
- **W2:** the trail decay is still quadratic `OUTLINE_PEAK_ALPHA * age * age` (`:282`) — the comet body dies; no `trailFadeExp`/`trailFloor` knob.
- **W3:** `src/components/custom/fourier-field/README.md` → **ABSENT** (aurora/blob/constellation each ship one).
- **W4:** `grep -c "Fourier" src/api/index.ts` → the only hit is a COMMENT (`:299`, the W37 canvas note mentioning "Constellation/FourierField"); NO `FourierFieldProps`/`FourierFieldVariant`/intensity type seat. `demo/stories/substrates/fourier-field.vue` → **ABSENT** (verified: no FourierField mount anywhere in `demo/`). The `/fourier-field` subpath + `package.json ./fourier-field` export DO exist (partially-landed leg).
- **W5:** `tests/components/custom/fourier-field/` → **ABSENT** (no mount-smoke; the zero-allocation render-loop claim is unguarded).

The component dir is `FourierField.vue` + `index.ts` + `math.ts` only — already composes `useCanvas2D` (`:182`) + `useGlobalDark` (`:148`) + the bespoke `resolveColorString` probe.

**Spec readiness: HIGH for the CORE; research DEFERRED BY DESIGN.** `waves/AX.W43-fourier-field-first-class.md` is a complete spec for the intensity model (J.W1) + citizenship (J.W9), with the user-ratified §7.1 targets (hero peak ≈0.55/trail ≈0.35; final ≈0.45; distinct family members) and the `age^1.4` trail softening. The 32-facet SOTA research is INTENTIONALLY deferred to a mid-tranche orchestrator-driven drive-window hook (so it lands on the W07/W14-settled GPU substrate) — this is a sequenced workflow, NOT a punt; it deepens, does not gate the born-RED close.

**Dependency chain (HARD):** dependsOn W00 + **W07** (WebGPU dynamic-index unblock — complete) + **W14** (WebGPU painterly-parity disposition — PLANNED, not done) + **W18** (storybook IA, the Substrates seat — PLANNED, not done). So W43's full close is gated behind W14 + W18 landing.

**Consumer (the ≥2-external bar / slides-side):** the slides feedback-coder deck is the named J.W1/J.W2 consumer — `slides/src/decks/feedback-coder/{DESIGN-FOURIER.md,DESIGN-FOURIER-v2.md,Slide04.vue}` exist. That slides-side consume (deck-theme intensity token + J.W2 floor gate + bookend re-bless) rides **W32 / the J slides-leg, gated on the AX cut PUBLISHING**. W43 owns only the LIBRARY intensity model the floor gate measures.

---

## Cross-cutting observations + path forward

1. **The lane is bimodal: two DONE substrate waves (W17, W37) and two unbuilt graphics waves (W42, W43).** The DONE half is genuinely converged at source with re-run-GREEN gates; the only carry is the W37 π-lane live audit (a standard "headless-green ≠ done" item that folds into the W33 close π-capture, not a re-open).

2. **W42 has the one remaining open RATIFY hinge in the whole prototype-harden backlog.** It cannot drive until PoC #4 spikes GO (the distinct-wave-vs-fold + second-consumer + axes-union ratify, on a REAL browser — happy-dom cannot reproduce the mid-flight re-toggle the velocity-continuity contract needs). dependsOn W01 (complete), so the precondition is met; the blocker is the ratification spike, not a missing dependency. The substrate spec + research are fully in hand — this is a drive-ready-after-spike wave. Path forward: run PoC #4 against the live post-W01 dock, ratify the second consumer (tab-indicator glide is the lowest-risk candidate — it already exists as the SegmentedTabs `--spring-snappy` elastic indicator, W53), then drive the ≥2-consumer substrate build with `useLayerTransition` re-derived as a thin wrapper.

3. **W43's core is drive-ready; its full close is gated behind W14 + W18.** The intensity model + citizenship (README/api-seat/story/smoke) can land independently of the GPU-research fold (which is the deferred mid-tranche hook). But the wave's `dependsOn` chain (W14 painterly-parity disposition + W18 Substrates IA seat) means the SOTA-deepened + IA-seated close waits on those. Path forward: land the J.W1 intensity BUNDLE + `age^1.4` trail + zero-alloc render-loop hoist + the four citizenship legs (README/api-seat/story/smoke) as the born-RED→GREEN core; seat the Substrates story when W18 authors the tree; fold the orchestrator-driven SOTA research during the drive window after W07/W14 settle. The slides consume rides W32 gated on publish.

4. **No GESTALT divergence found in either DONE wave.** W17's focal-node-as-first-class-concept (over the rejected single-consumer `stepOverlay` hook) and W37's publish-name-route honesty (over re-authoring landed substrate) are both precept-clean: no-overfitting, one-path, substrate-with-consumer, no-legacy. The `useSpring`-FORBID + single-rAF discipline in W17's warp integrator is the correct substrate-respecting choice.

5. **DEFERRED items that must FOLD INTO this tranche (none are silent drops):** W37 π-lane live audit → W33 close; FourierField probe drop-onto-resolveCanvasColor + fourier/words text-highlight adoptions → W30/W31/W34; W42 PoC #4 ratify spike → W42 wave-open; W43 mid-tranche SOTA research → W43 drive window; W43 slides consume → W32. All are routed in the specs — the lane carries no orphaned deferral.
