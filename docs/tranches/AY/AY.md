# Tranche AY — glass-ui: SOTA component perfection + root-cause convergence + the AX close

AY is the corrective successor to AX. AX shipped 3.9.0 (glass-first, squircle, adaptive-glass,
dock-perfection, demo IA, aurora/blob core-unblock) with master CI green on the convergence
branch's gate fleet. The 30-lane AY+L hardening pass (`audit/hardening/*.md`) proved the
**PLAN is the defect, not the code**: the AUDIT-LEDGER was authored at a session limit and never
re-grounded to AX HEAD, so it marks ≥6 shipped+gated features UNADDRESSED/DEFERRED/CHRONIC, and
~10 of the prior wave set were aimed at re-building green code. This rewrite is the re-ground.

AY does three things:
1. **VERIFIES + perfects the SOTA visual components** — most of constellation (warp), slider
   (two-only), `--ui-scale`, fourier-export, aurora OKLCh/atoms, and the 4 READMEs already
   SHIPPED at AX; AY captures their owed DELTAs and closes the GENUINE OPEN artistic/identity
   residue (aurora painterly bar born-RED; blob dark-default; constellation re-fit/eggs; dock
   entering-child lockstep; fourier W43 intensity model; slider design-intent contradiction).
2. **Converges the root-cause divergences** so consumers (slides, fourier-analysis, speedtest)
   compose fully-abstracted glass-ui components with NO bespoke copies.
3. **Closes the AX deferral** (god-module carves, legacy gates, FINAL, budget rebaseline, publish)
   AND lands the BLOCKER-class cohesion gaps the hardening surfaced (the opaque Drawer, the RED
   motion gate, dormant W55).

**Headline:** every shared visual is a perfected, exported, research-backed glass-ui primitive its
consumers compose — no bespoke duplicates; the dock animates ios-lockstep on a CAPTURED DELTA;
aurora reads arresting against a measured bar; glass is cohesive INCLUDING the Drawer; motion rides
ONE doctrine; touch/type/a11y is a library-wide system with real gates; AX closes formally and
publishes.

**Plan basis:** `audit/PROMPT-CORPUS.md` (the standing-request recap) + the RE-GROUNDED
`audit/AUDIT-LEDGER.md` (re-stamped to HEAD per W0-REGROUND) + the 30 hardening findings
(`audit/hardening/*.md`) + the per-component research that ALREADY exists (`H-research-aurora.md`,
`H-research-blob.md`, `H-research-dock-anim.md`, `audit/inventory/W43-fourier-field-SOTA.md`).
The execution DAG is `audit/EXECUTION-DAG.md` (the single hardened roadmap — §3 points to it).

**Format.** `AY.md` charter + `PROGRESS.md` (NEW — minted at W-CARDINAL-INFRA) + per-wave specs
under `waves/AY.W#-*.md` (NONE authored yet — W-DAG authors them all) + `FINAL.md`. ONE numbering
scheme: the `W-*` named system (the dual `AY-DRAFT.md` W0-W8 scheme is RETIRED; its three unique
waves W0/W5/W8 are folded back as W-DELTA0/W-CONSUMER/W-TRIAGE).

**Agent-ceiling.** ≤6 implementation agents per wave, ≤7 read-only audit lanes (ORCHESTRATION.md
§Wave Model). The master-merge + publish hinge (W-PUB1) is USER-DOMAIN.

**Hardened agent git clause (K W0).** Agents NEVER stage / commit / stash / checkout / reset /
restore. Read-only git only; the orchestrator owns the index.

---

## §0 — directive → disposition (the corpus folds, RE-GROUNDED)

| directive | disposition |
|---|---|
| fix at the ROOT, not in slides; slides consume glass-ui | Band A perfects+exports → consumers adopt in slides-L (gated on W-PUB1) |
| Constellation first-class + click-warp + easter eggs + translucency | W-CON1 (re-fit + drift-source + alpha-tune, the lib LACKS the re-fit), W-CON2 (warp VERIFY + decided-scope eggs), W-CON3 (`?freeze` seam + anomaly props — slides pre-reqs) |
| touch-target + font-size general increase (mobile+desktop), idiomatic | W-SCALE1/W-SCALE2 (EXTEND `--ui-scale` to form-atoms + desktop-fluid ladder; `--ui-scale` system already SHIPPED AX.W51) |
| dock ios-springy shell↔items lockstep; rail/layering; dock-with-slider | W-DOCK1 (VERIFY-OR-FALSIFY the lag), W-DOCK2 (real entering-child gate), W-DOCK3 (dock+slider DELTA; progress-bar re-homed to L) |
| aurora SOTA (OKLAB/OKLCH; WebGPU; van-Gogh oil-pastel; simplify; derive-color) | the OKLAB/OKLCH in-shader migration + the atoms-door simplify + the `deriveAurora` composable are SHIPPED-DO-NOT-REBUILD (§0.1, gated); W-AUR1 (consume the authored brief + the arresting metric), W-AUR2 (the doc strike + the lone `<Aurora derive-color>` prop decision — NOT the migration), W-AUR-PAINTERLY (the born-RED stunning bar), W-AUR-WEBGPU-DECIDE (retire-or-resurrect) |
| blob SOTA (visual/anim/interaction; perf) | W-BLOB1 (TARGETED audit), W-BLOB2 (light default + atoms), W-BLOB3 (interaction + consumer-#2 decision) |
| fourier-field SOTA fold (AX W43) → abstracted glass-ui element | W-FF1 (rebase the born-RED W43 spec), W-FF2 (LAND the intensity model + 3-substrate parity + cross-repo math decision) |
| slider zoo → glass-scrubber(rounded iOS knob)+spectrum; migrate consumers | W-SLD1 (RECONCILE the rounded-knob-vs-cylinder design CONTRADICTION; collapse already SHIPPED AX.W59), W-SLD2 (consumer-boundary gate + verify) |
| storybook prune (the "wtf is X" routes) + restructure + consistent languages | W-SB1 (per-route KEEP/FIX/RETIRE + orphan component-retire), W-SB2 (scattered-dock + metric co-locate), W-SB3 (real language gate) |
| research-backed READMEs (dock/constellation/aurora/blob) | W-DOC1 (quality-uplift; the 4 READMEs already EXIST) |
| per-component frontend-design convergence (glass-ui↔slides FIT) | W-CONVERGE (net-new; un-homed transcript directive) |
| colocation / sub-component-dir / localized design-idiom | W-COLOCATE (net-new) + W-GOD1/W-CSS1 widen |
| TOTAL glass cohesion (the opaque Drawer BLOCKER; Slider off level) | W-GLASS (net-new BLOCKER) |
| ONE motion doctrine library-wide | W-MOTION (net-new; the RED `proof:animation-coherence`) |
| a11y/perf/Safari (W55 dormant; backdrop-filter prefix; specular thrash) | W-A11Y-PERF (net-new) |
| no god-modules; legacy excision; DI/boundaries | W-GOD1, W-CSS1, W-LEG1 |
| AX close: overfitting audit, FINAL, budget rebaseline, publish | W-DELTA0, W-LIVE1, W-CONSUMER, W-CARRY, W-CLOSE1, W-TRIAGE, W-PUB1, W-NDA |
| cardinal-lesson: every visual wave closes on a captured DELTA | W-CARDINAL-INFRA (net-new; AY-path + slides-port `proof:live-verified-ledger`) |
| the plan is the defect; re-ground before dispatch | W0-REGROUND + W-DAG (Batch 0, BLOCKS all) |

---

## §0.1 — SHIPPED, DO-NOT-REBUILD (verify-only) — the stale-ledger correction

These were marked UNADDRESSED/DEFERRED/CHRONIC in the session-limit ledger. They SHIPPED at AX with
green gates and (mostly) on-disk DELTAs. **W0-REGROUND re-stamps the ledger to this truth; no wave
re-builds them.** Each carries its HEAD evidence; the VERIFY-RESIDUE is the only AY work.

| shipped feature | landed | gate (green) | HEAD evidence | verify-only residue → wave |
|---|---|---|---|---|
| Constellation click-WARP (focal→nearest, critically-damped spring, PRM-gated) | AX.W17 (`45cfb79`) | `proof:constellation-warp-live` | `Constellation.vue:246-279` `warpOnClick`/`warpTo`; `constellationField.ts:337-355` (27 warp refs) | capture the warp DELTA → W-CON2 |
| Constellation FIRST-CLASS export + api types | AX.W17 | `proof:constellation-substrate-single` | `/constellation` subpath `package.json:316`; `api/index.ts:209-221` | export-ready VERIFY → W-CON3 |
| `--constellation-alpha` per-mode token (light+dark) | H.W4/AX.W17 | `proof:constellation-tokens` | `tokens.css:495-512` light / `:2058-2071` dark (0.80/0.88) | both-mode tune+capture → W-CON1 |
| `--ui-scale` master comfort scalar + `--control-floor`/WCAG-44 clamp + coarse 1.5× | AX.W51 (D18) | `proof:ui-scale` (green; DELTA `W51-DELTA.md`) | `tokens.css:1172,1184-1205,1785-1788` (37 refs); Button/Toggle/Tabs/… consume | EXTEND to form-atoms + desktop-fluid → W-SCALE1/2 (NOT re-build) |
| Slider zoo → EXACTLY `standard`+`spectrum` (integrated cylinder + squircle) | AX.W59 (`a730782`) | `proof:slider-two-only` (CI, green; DELTA `W59-DELTA.md`) | `slider/index.ts:42-45`; no GlassScrubber/ColorSlider survivor | RECONCILE design-intent + consumer-boundary → W-SLD1/2 (NOT re-collapse) |
| FourierField element exported + live-consumed | AX (pre-W43) | — | `fourier-field/{FourierField.vue,math.ts}`; `/fourier-field` subpath `package.json:296`; consumed by fourier-analysis + feedback-coder | LAND the W43 intensity model (the element is VISIBLY BROKEN) → W-FF2 |
| Aurora FULL OKLAB/OKLCH in-shader + atoms-door + derive-color | AX W07-W14 | `proof:aurora-oklch-interp`, `proof:aurora-space-gamma`, `proof:aurora-atoms-roundtrip` | `composition.glsl.ts:21`; `atoms.ts:89-127`; `aurora.frag.ts:308` (sRGB matrix DELETED) | STRIKE as done in W-AUR2; the residue is the ARTISTIC bar → W-AUR-PAINTERLY |
| 4 component READMEs (aurora/blob/dock/constellation) | AX | — | `aurora/README.md` 702, `goo-blob/` 422, `dock/` 299, `constellation/` 381 | quality-uplift to research-backed bar → W-DOC1 (NOT from-zero write) |
| `--touch-target`/`--dock-touch-target` 44px floor tokens | AX.W51 | `proof:ui-scale` | `tokens.css:1394,1403` | thread the SAME token in the form-atom hit-area → W-SCALE2 (NO 4th token) |
| dock shell↔items ONE-scalar morph (single clock by construction) | AU.W2/AW.W2 | `proof:dock-opacity-lockstep`, `proof:dock-animation-live` | `dockMorphContext.ts:121-239` ONE `--dock-morph-t` | the gate is TAUTOLOGICAL + samples LEAVING child only → re-gate at W-DOCK2 |
| storybook IA restructure; disco-glyph/glyph-face excised; blob consolidated; speedtest boundary | AX.W18/W19 | `proof:storybook-ia`, `proof:no-orphan-demo-route`, `proof:speedtest-boundary` (all green) | `manifest.ts` 124↔124; `509aed8` | per-route OPEN residue only → W-SB1/2 (NOT a structural cull) |
| DI/boundaries onto createStrictContext; PRNG single-source | AV.W14 | `proof:di-consistency` (CI) | `composables/context/createContext.ts` | none — DI is CLOSED (do not re-litigate) |
| access-key modal glass-ui-styled; pptx light/dark popover | AX (slides) | — | slides `DeckGate.vue`, `DeckSettings.vue:53-72` | verify-survive + the ONE locked-blur inversion → L.W-CHR |

The CSS-cascade house keeps stay UNDISTURBED (no wave touches them): in-srgb `--surface-tint-*`,
`cn()` hand-rolled deduplicator, `.focus-ring`, the cartoon-shadow `:root`-override contract, the §6
easing doctrine. Recorded so a later pass does not "fix" them (per H-precept-drift).

---

## §1 — re-ground

HEAD is `at-dock-convergence` (v3.9.0 + CI-fix commits; `master` is the merge-base `c6244e2`,
docs-only — the master-merge is itself an open close step, W-PUB1). The 30-lane hardening verdict:
22 GAPS-FOUND, 1 CHRONIC-MISS, 1 NEEDS-RESEARCH; TWO BLOCKER-class findings (the opaque `.glass-drawer`;
the constellation resize re-fit regression that adopting-the-lib would ship). The meta-disease is
stale-base drift + phantom waves/gates + zero authored specs + no DAG.

**The four meta-fixes Batch 0 carries (BLOCK all else):**
1. **W0-REGROUND** — re-derive every AUDIT-LEDGER row vs AX `PROGRESS.md` + the named gate + HEAD
   file:line (the AT W0-L4 format); re-stamp the ≥6 stale rows DONE/PARTIAL with the precise narrow
   residue. ZERO row may mark undone what ships live-verified.
2. **W-DAG** — author the single execution DAG (`audit/EXECUTION-DAG.md`), reconcile the dual
   numbering, and AUTHOR every `waves/AY.W#-*.md` spec + the 3 phantom `L/waves/L.W-{ADOPT,MOB,CHR}.md`.
3. **W-CARDINAL-INFRA** — mint `AY/PROGRESS.md` + `AY/audit/visual/`; tranche-parameterize
   `proof:live-verified-ledger` (cover `complete` + match-filename + protocol-depth) + PORT it to
   `slides/scripts/`. The DELTA-capture edge gates ~15 waves and is unenforced prose today.
4. The phantom gates (`proof:no-bespoke-constellation`, `proof:touch-target`, `proof:glass-cohesion`,
   the slides axe + capture gates) are AUTHORED in their owning waves; the RED-but-local ones
   (`proof:no-god-module`, `proof:animation-coherence`, `proof:no-orphan-demo-route`) are CI-promoted.

Every wave: lint + `vue-tsc --noEmit` + the relevant `proof:*` green before close; every
VISUAL-load-bearing wave NAMES `proof:live-verified-ledger` (not prose "capture") with an
own-surface DELTA at ≥2 viewports × {light,dark} (the cardinal lesson). Research waves CONSUME the
already-authored briefs (H-research-*); they are CONSUME-and-rank, NOT from-zero 32-agent re-runs.

---

## §2 — waves (ONE numbering scheme; ~34 waves across 6 bands)

### Band 0 — re-ground (net-new; BLOCKS everything; zero source risk)
| wave | type | scope | hard gate |
|---|---|---|---|
| **W0-REGROUND** | doc | Re-derive every AUDIT-LEDGER row vs AX `PROGRESS.md` + the named proof gate + HEAD file:line (the AT W0-L4 format); re-stamp warp/ui-scale/slider/fourier/READMEs/access-modal DONE-or-PARTIAL with the precise narrow residue. | a re-grounded ledger where every DONE/PARTIAL row cites a HEAD file:line + landed SHA; ZERO row marks undone what ships live-verified (cross-checked vs H-touch-scale/H-slider/H-overfitting refutations) |
| **W-DAG** | doc | Author the consolidated execution DAG (`audit/EXECUTION-DAG.md`); reconcile the dual numbering onto the `W-*` system; AUTHOR every `waves/AY.W#-*.md` spec + the 3 phantom `slides/.../waves/L.W-{ADOPT,MOB,CHR}.md`; reconcile `AY.md`↔(retired DRAFT)↔`waves/` and `L.md`↔`L-DRAFT.md`↔`waves/`. | `proof:wave-inventory-coherent`: every §2 wave-id has a spec file; every spec id is in §2; the L set reconciled; the DAG names the publish→re-pin→adopt→deploy edge with version arithmetic + the 2 user-domain hinges |
| **W-CARDINAL-INFRA** | gate | Mint `AY/PROGRESS.md` + `AY/audit/visual/`; tranche-parameterize `proof:live-verified-ledger` to cover `complete` rows (the 6 AX visual `complete`-exempt: W05/W08/W15/W16/W17/W23), match the PNG filename to the wave (`^W…`), and lint the protocol depth-header; PORT it to `slides/scripts/` + a slides `audit/visual/`. | the gate runs born-RED against the 6 `complete`-exempt rows + the W52 cross-referenced-PNG case; reads BOTH tranche paths; the slides port green; the self-test extended with a synthetic `complete`-visual-no-DELTA row |

### Band A — SOTA component perfection (re-cast to VERIFY+perfect; each visual wave names `proof:live-verified-ledger`)
| wave | track | type | scope | hard gate |
|---|---|---|---|---|
| **W-CON1** | constellation | impl | Transpose UP the resize RE-FIT (`refitField(field, prevW, prevH)` proportional node rescale — the lib LACKS it; the bespoke slides copy HAS it, so adopting REGRESSES it); build the auto-DRIFT target-source (the 2nd half of the warp "one mechanic" thesis the README asserts but never built); tune `--constellation-alpha` both modes. | π bbox-coverage readback: nodes fill the new canvas within ONE frame of an RO resize (no drift-out); auto-drift cadence π; `--constellation-alpha` π readback both modes; DELTA |
| **W-CON2** | constellation | verify+impl | VERIFY the SHIPPED warp live (capture, do NOT re-build — AX.W17); reconcile the `warpStep` ω-derivation with the keyframes.js `(response,ζ)` model BEFORE tokenizing the spring; ship the DECIDED-scope eggs (per H-proto-constellation-warp B.4: pointer-held gravity-well as the ONE engine prop; supernova demo-only; konami-flock CUT) with velocity-cooldown + no-slingshot clamps, PRM-listener-not-registered, tokenized tunings. | warp DELTA captured (not re-built); `proof:constellation-egg-live` (π velocity-delta readback: field perturbs THEN cools); a numeric settle-time unit assertion matching the keyframes.js model |
| **W-CON3** | constellation | impl | GROW the deterministic-capture `?freeze` URL seam (the slides pptx/shoot pipeline DEPENDS on it — adopting without it REGRESSES the deploy) + the `anomaly`/`resolved` prop set (or document the `drawOverlay` recipe) the slides decl-model needs; export-ready VERIFY. The `proof:no-bespoke-constellation` gate is AUTHORED IN SLIDES (wrong-repo in the prior plan). | `?freeze` produces a deterministic static frame (capture identical across runs); anomaly/resolved props or `drawOverlay` recipe shipped; the slides-side gate spec authored (its RED→GREEN is L.W-ADOPT) |
| **W-AUR1** | aurora | research-consume | CONSUME the authored `H-research-aurora.md` brief; produce `aurora/RESEARCH.md` in the `W43-fourier-field-SOTA.md` shape with the DEFINED falsifiable arresting metric (Hasler-Süsstrunk colorfulness band + structure-tensor coherence + −5/3 Kolmogorov spectrum slope ∈ [−1.85,−1.45] off `starry-night-crop.png`); rank the path-forward; carry the WebGPU decision row. | the committed `src/components/custom/aurora/RESEARCH.md` carries 14 cited techniques + a ranked path-forward table + a resolved WebGPU decision row (RETIRE) + the 3 NUMERIC arresting-metric bands (C ∈ [ref−15, ref+25], A ∈ [ref−band, ref+band], β ∈ [−1.85,−1.45]) — every threshold a concrete numeral, no unbound placeholder; AND `npm run proof:aurora-arresting-ref` runs `scripts/aurora-arresting-metric.mjs` against `starry-night-crop.png` and prints β ∈ [−1.85,−1.45] (the metric reproducible against the committed reference plates, not asserted in prose) |
| **W-AUR2** | aurora | doc-reconcile | The RESIDUE sliver ONLY. The FULL OKLAB/OKLCH in-shader migration (`composition.glsl.ts:21`, `aurora.frag.ts:308` — the sRGB YIQ matrix DELETED), the ≤7-atom door (`atoms.ts:89-127`), and the `deriveAurora` composable (`color.ts:169`) are SHIPPED-DO-NOT-REBUILD per §0.1 — NOT net-new AY work. The corpus's named `mood` atom was DELIBERATELY folded into `colorEnergy`'s `temperatureShift` (`atoms.ts:154`); there is no live `mood` atom. The lone OPEN question — a one-prop `<Aurora derive-color>` ergonomic — is **RETIRED**: zero named consumer at HEAD (`grep -rn deriveColor demo/ src/` → only the composable; the atoms COLOR door already gives the declarative seed→palette form), so a prop is substrate-without-consumer (L inv 8 / overfitting bar). The seed→palette ergonomic stays the `deriveAurora` composable + the atoms door. | `AY.md`/spec no longer claims the migration/atoms/composable as net-new (doc reconciliation); `proof:aurora-oklch-interp` + `proof:aurora-space-gamma` + `proof:aurora-atoms-roundtrip` cited as the EXISTING evidence the objective is met; the `<Aurora derive-color>` prop RETIRED (deletion-proof: `grep deriveColor Aurora.vue` → 0) with the recorded ≥2-consumer-bar rationale; `proof:ay-w0-reground` green over the reconciled row |
| **W-AUR-PAINTERLY** | aurora | impl | Tune van-Gogh / oil-pastel / oil-impasto mediums against the reference plates to MEET the W-AUR1 arresting metric (the born-RED bar — `proof:aurora-painterly-statistics` wrote `status:fail`, never passed live); capture the painterly-medium DELTA (NONE exists — every committed shot is the SMOOTH preset). | the arresting metric ≥ threshold against `starry-night-crop.png` on a REAL-GPU readback (NOT a SwiftShader skip) + a committed BEFORE/AFTER/DELTA of EACH painterly medium full-bleed light+dark under `AY/audit/visual/`; the 4 AX not-flat floors stay BELOW the new metric |
| **W-AUR-WEBGPU-DECIDE** | aurora | decision | Execute the W-AUR1 WebGPU decision: RETIRE the medium-less WGSL twin (delete `aurora.wgsl.ts`/`gpuRuntime.ts`/the WGSL splices/`WEBGPU_PARITY`/the WebGPU gates; reconcile README/DESIGN) OR resurrect WITH a named ≥1 consumer route demanding the Kuwahara finish + a stated parity definition. | no dead WGSL scaffold survives (deletion proof: `grep -r aurora.wgsl` → 0 importers) OR the named consumer renders the Kuwahara finish (captured) + a stated parity definition; README/DESIGN carry no stale W14-restoration claims |
| **W-BLOB1** | blob | research-consume | TARGETED audit of the OPEN blob items (NOT a 32-agent re-sweep — the AX synthesis already concluded "no algorithm changes needed"): consume `H-research-blob.md`; enumerate the default-identity defect, the 50-knob simplification, the missing consumer #2; record the default-identity decision. | `src/components/custom/goo-blob/RESEARCH.md` committed (§0 settled axis + §1 4-row OPEN-item table + §2 default-identity decision & ≤12 atom ceiling + §3 consumer-#2 branch + §4 WebGPU/particle-swarm non-goal); the born-RED `proof:blob-warm-default` harness (`scripts/proof-blob-warm-default.mjs` + `tests-visual/blob-warm-default.spec.ts`) exits NON-ZERO at HEAD on the π workspace (the dark default's body OKLCh-L < 0.30 fails the L ≥ 0.62 warm-bead band) — NOT a process-only "doc exists" gate; the 12 existing `proof:blob-*` stay green |
| **W-BLOB2** | blob | impl | Ship a LIGHT warm-cream OKLCh default base (the default renders a DARK coffee-bean, not the "warm-cream living bead" every doc claims — the headless-green/visually-broken trap); simplify the ~50-knob `BlobConfig` to atoms (the aurora "simplify to atoms" mandate, never applied to blob). | a born-RED-at-HEAD default-warmth π readback (resting body mean OKLCh L reads as a light bead, not L<0.3 charcoal) → GREEN; a config-atom-count ceiling; `proof:blob-*` green + own-surface DELTA over `/substrates/goo-blob` + `/substrates/blob-mood` light+dark |
| **W-BLOB3** | blob | impl | Interaction + frame-budget; BIND a real consumer #2 (value.js repatriation — the DI seam was built for it and it never arrived) OR formally book demo-only + STRIP the speculative ColorResolver DI ceremony. | hover-flick + dome-luma BAND DELTA; consumer #2 bound OR demo-only booked with the DI stripped (recorded in W-CLOSE1 overfitting audit) |
| **W-FF1** | fourier-field | research-rebase | Rebase the born-RED AX.W43 spec to HEAD (the path-forward exists TWICE — re-land, not re-research); decide the cross-repo math-leaf duplication (fourier-analysis carries a byte-equivalent copy of `evalFourier`/`positionsAt`). | the rebased material populates `waves/AY.W-FF2.md` + the decision record `audit/W-FF1-fourier-rebase.md` (the 5 born-RED witnesses re-confirmed at HEAD `fba6262`; the AX→AY dependency rebase; the PINNED single-number resting-paint alpha, 0.35-hedge retired; the cross-repo math-leaf DECISION — branch (a) PROMOTE: mint `/fourier-math` glass-ui-side at W-FF2, book the sibling re-point with the §4.4 dependency-bump trigger as the fallback) |
| **W-FF2** | fourier-field | impl | LAND the W43 intensity model (`OUTLINE_PEAK_ALPHA=0.24` → the per-variant bundle; quadratic decay → the 3-pass phosphor-comet; the `final` preset renders as a corner stub today); add the `intensity?` prop (Aurora `opacityCeiling` shape); thread `StoryHero :intensity` for 3-substrate parity; delete the dead `evalFourier` export. | `grep -c OUTLINE_PEAK_ALPHA src/` → 0; the `final` preset reads (not a corner stub) on a captured 3-substrate DELTA light+dark; `proof:fourier-field-intensity` (static) + `proof:fourier-field-visibility-live` (device) authored + green; `evalFourier` removed (deletion proof) |
| **W-DOCK1** | dock | verify | VERIFY-OR-FALSIFY the items-lag: capture the LIVE hover-expand frame-series (the lockstep is SOLVED by construction + live-gated; the user's lag perception may be a pre-AX build OR the deliberate entering-child stagger). Re-diagnose ONLY if the lag persists on the capture. | the live collapse captured (a `--dock-morph-t` + box-width + last-child-opacity frame-series, ≥2 viewports × light/dark) — the lag is captured-present or captured-absent |
| **W-DOCK2** | dock | impl | Author a REAL lockstep gate: rAF-sample the LAST entering `.dock-layer--full` child's opacity onset vs the box-width onset, assert trail ≤ a DECIDED budget (the tautological box-vs-its-own-scalar check is RETIRED/demoted); DECIDE the entering-child stagger reconciliation (tighten the 0.4 window OR document the cascade as deliberate); fold the 2nd live `DOCK_SPRING` copy + the 2nd FLIP engine (`useLayerTransition` ↔ `dockMorphContext`); rail one-clock + single-indicator + persistence. | the new gate REDs on a synthetic entering-child lag + GREENs at HEAD; the stagger decision recorded; ONE `DOCK_SPRING` authority gated directly; rail clock/indicator/persistence landed-or-booked; lockstep DELTA |
| **W-DOCK3** | dock | impl | Author the missing `demo/stories/compositions/dock-with-slider.vue` (CLAUDE.md cites a non-existent path); capture a live drag DELTA proving the dock holds + the slider `data-held` halo fires. The progress-bar-off-dock clause is RE-HOMED to L (NO glass-ui edit-site; already de-docked in slides H.W2). | dock+slider captured working (the keepDockOpen hold + thumb-halo); CLAUDE.md path fixed; the progress-bar clause moved to L as a verify-row |

### Band B — library-wide systems (re-cast to EXTEND, not build)
| wave | type | scope | hard gate |
|---|---|---|---|
| **W-SCALE1** | tokens | EXTEND `--ui-scale` (the system SHIPPED AX.W51 — do NOT fork a parallel `--touch-target` axis): land a fluid `clamp()` on the BODY/CONTROL type ladder (only the φ-display ladder is fluid today; 14px control font on a 27" display is the unmet desktop half), reconciled with the φ-display exclusion + no double-vw under coarse. | the control/body font grows on a wide desktop viewport (a measured font-grew DELTA vs the fixed-rem baseline); reconciliation with `--ui-scale` recorded (no `calc(clamp(…) * --ui-scale)` double-apply) |
| **W-SCALE2** | impl | A SHARED coarse-gated `@utility touch-hit-area` (`::before` overlay keyed off `--touch-target`, the timeline pattern generalized — hit-area decoupled from visual size, NOT min-h balloons) for the off-axis atoms (Switch 24px / Checkbox+Radio 16px / Slider thumb / TagsInput / MultiSelect-X 8-12px / picker menu rows); re-point the raw `text-sm`/`text-xs` literals to `--control-text`; AUTHOR the phantom `proof:touch-target` as a REAL axe-runtime gate. | `tests-visual/touch-target.spec.ts` injects axe-core at coarse/touch emulation + asserts ZERO `target-size` violations + getComputedStyle hit-rect ≥ 44px for every interactive atom; no 4th touch-floor token minted |
| **W-SLD1** | reconcile | RECONCILE the slider design CONTRADICTION (the collapse SHIPPED AX.W59 — do NOT re-collapse): the user asks "FULLY ROUNDED iOS knob continuous with the track"; AX.W59 shipped + GATE-LOCKED an integrated cylinder cap that REDDENS a circle. DECIDE supersede / revert+invert-gate / reconcile via a USER-JUDGED captured delta; correct PROMPT-CORPUS/ledger; fix the spectrum round-fallback fidelity. | the design intent RESOLVED on the record by a user-judged CAPTURED visual delta (NOT a doc edit alone); the spectrum squircle reads as a squircle on round-fallback engines (cross-engine capture); ledger row 9 reads DONE |
| **W-SLD2** | refactor | EXTEND `proof:slider-two-only` with a CONSUMER-BOUNDARY clause (no consumer passes a variant ∉ {standard,spectrum}; no removed-variant prop survives — the silent-no-op binding class); the speedtest version-bump is publish-gated (W-PUB1). | the fifth gate clause REDs on a consumer `variant="rounded"`; speedtest builds green against the AY publish (deferred to W-PUB1) |

### Band C — storybook + docs (re-cast to per-route verdict; the gates already pass)
| wave | type | scope | hard gate |
|---|---|---|---|
| **W-SB1** | prune | Per-route KEEP/FIX/RETIRE verdict (half the named routes don't exist — disco-glyph/glyph-face excised AX.W19): RETIRE the orphan COMPONENTS (header-ribbon, glass-panel, useTokenColor — route-prune ≠ component-retire; each 0 src + 0 external consumer) + subpath + api type, OR book with a 2nd-consumer trigger; FOLD native-top-layer into Dialog (its own manifest blurb says FIX-ROUTE); the `evalFourier` dead export (→ W-FF2). | `proof:no-orphan-demo-route` CI-wired + extended with a component-orphan check (every `custom/` component + subpath + root-barrel composable has ≥2 non-self consumers OR a `consumer-evidence` doc); deletion-proofs for the retired surfaces; `verify-export-types` green |
| **W-SB2** | restructure | Scattered-dock triage (8 stories host a GlassDock — keep the compositions, de-dock the staging chrome in dark-mode-toggle/metric-pill/chart-chassis-palette); metric-badge↔metric-pill co-location (one Display sub-section); carousel-pager vs deck-progress disambiguation; speedtest-boundary VERIFY (already gate-locked, do not re-open). | an enumerated keep/de-dock allowlist; the metric co-location landed; `proof:speedtest-boundary` green (verify-only) |
| **W-SB3** | polish | A REAL machine language-consistency gate (every story composes the shared `StoryPage`/`StorySection`/`ShowcaseFrame` chassis + the canonical spring tokens — NOT "an audit passes"); every FIX/VERIFY route (card toggles, glass-panel, carousel) closes on a captured live DELTA. | a machine-checkable language assertion green; the FIX routes carry captured DELTAs |
| **W-DOC1** | docs | QUALITY-UPLIFT the 4 EXISTING READMEs to the research-backed bar (NOT a from-zero write); strip the provenance/version-history meta-language (greenfield-no-meta) + the inline `AX.W17`/`AW.W17` tags from the shipped surfaces; each README CITES its W-*1 research. | each README cites its `RESEARCH.md`; zero provenance blockquote / inline wave tags on the public surface; zero `(planned — *)` prose for landed work |

### Band D — instrument-chassis scope
| wave | type | scope | hard gate |
|---|---|---|---|
| **W-IC1** | decision | Instrument-chassis family scope settled against the ≥2-consumer bar (`audit/W-IC1-scope-decision.md`): `InstrumentChassis` KEEP (speedtest binary + demo + tests); `InstrumentRail` RETIRE to demo-private (Disposition A — 0 binary, 1 demo, 0 tests); slides premise dismissed as moot (slides imports neither). Machine-locked by `proof:instrument-scope`. | DONE — decision recorded + rail retired from the public surface |

### Band E — the AX close (the DRAFT folded into named waves)
| wave | type | scope | hard gate |
|---|---|---|---|
| **W-DELTA0** | gate | The owed-DELTA backfill sweep (the folded DRAFT-W0): W56 squircle (the honest `live-pending (DELTA owed)` holdout) + the 6 AX visual `complete`-exempt rows; the W52 cross-referenced-PNG re-capture. | each owed row carries an own-surface DELTA; `proof:live-verified-ledger` (the W-CARDINAL-INFRA `complete`-covering arm) green over them |
| **W-GOD1** | refactor | Carve the 4 god-modules <500 (useMetaballRenderer 694, GlassDock 608, constellationField 510; SegmentedTabs is a FALSE logic-god-module — 267 of 689 lines are `<style>`, decide CSS-extract vs script-only-count); name a `Use<Name>Return` interface + WIRE the orphan `proof:composable-return-types` so byte-identity is MACHINE-proven; CI-promote `proof:no-god-module`. Runs AFTER W-CON/W-BLOB content (they move the line count). | `proof:no-god-module` CI-tagged + green over all four; the return shapes machine-proven byte-identical; `proof:blob-render`+`proof:blob-color-equivalence` stay green across the metaball carve |
| **W-CSS1** | refactor | A `.css`-aware god-module gate (tokens.css 2281 / utilities.css 1170 / glass.css 1071 are 2-4.5× over, ZERO coverage); carve into `@import` partials COHESION-aware (cascade-order-preserving, the dock.css precedent — NOT a naive 500-line chop); decide the var-in-arbitrary rule (the fallback-bearing `[var(--x,fb)]` cases are a legitimate keep). | the `.css`-aware gate CI-tagged + green; the `/styles` bundle byte-equivalent (cascade order preserved); the var-in-arbitrary rule encoded (no bare `[var(--x)]` where the shorthand applies) |
| **W-LEG1** | gate | Author the legacy gates (the AX W27a/b were "planned" + NEVER written): `proof:no-retired-survivor` (the MIGRATION.md `RETIRED`-claim → zero-survivor gate; corrects the AV.W10 metric-cell/metric-stack doc lie — un-retired, speedtest-consumed — to the truth), `proof:tag-parity` (NOT the file↔key bijection — that is `proof:gate-script-parity`; this is the manifest tags↔aggregate assert: every load-bearing STATIC src-scan gate carries `ci`, Playwright live gates exempt by detection, AY meta-gates by reasoned allowlist; promotes `proof:fail-explicit` local→ci; born-RED on `proof:no-legacy-commentary` until W-CSS1 promotes it), `proof:var-in-arbitrary-guard` (the F7 idiom rule — W-LEG1 owns the GATE, W-CSS1 §O6 owns the conversions; born-GREEN once W-CSS1 lands). **COMMENTARY DISPOSITION = option (c): banned-in-the-2-public-barrels (the existing `proof:no-legacy-commentary` TARGETS, kept) — NOT a full-tree retroactive sweep.** The ~690 src/ `[A-Z].W` refs are DECIDED dev-provenance (a kept changelog-substitute the next author reads; the public barrels `src/index.ts`/`src/api/index.ts` stay banned full-body, the demo is banned by `proof:story-language`, and the ≥2-consumer/overfitting audit at close catches dead provenance). The "full-tree commentary sweep" framing was a mis-scoped inheritance from the AX W27b table row; no `proof-no-legacy-commentary.mjs` TARGETS edit. | the 3 gates registered (correct local/ci/release tags) + `proof:gate-script-parity` NEW-orphan=0; `proof:no-retired-survivor` green (0 surviving retired artefacts); `proof:var-in-arbitrary-guard` green once W-CSS1 lands; `proof:tag-parity` green once W-CSS1 promotes `proof:no-legacy-commentary` (band-close holds the line; until then it names the one owed promotion); ci.yml re-emitted + byte-matched; commentary disposition decided + gated to the 2 barrels |
| **W-LIVE1** | decision | The local-only live-gate CI decision (keep-local+ledger vs a SwiftShader/Dawn headless lane); the cardinal-gate `complete`-coverage + filename-match + depth-header extension (folds the H-cardinal holes). | a DECISION doc + (Branch B) the lane green; the cardinal gate's `complete`/depth extension landed (the W-CARDINAL-INFRA core, hardened here) |
| **W-CONSUMER** | content | The consumer-staleness ledger (the folded DRAFT-W5): `proof:consumer-staleness` is born-RED on 12 real stale imports across 4 siblings; discharge each (consumer migrates OR carries an explicit `{receiver-wave, close-gate}`). | `proof:consumer-staleness` flips born-RED → GREEN; the ledger doc cited by `proof:ay-final` |
| **W-CARRY** | gate | Carry-closure register completeness (the register covers 3 of ~25 booked items): onboard the full AT BOOK backlog into DISPOSITION-REGISTER.json; encode the orphaned G-4/G-5/G-6 (AX PROGRESS:282 promise, never written) OR retire each with rationale; add a register-COMPLETENESS clause (FAILS if the deferred-ledger names a BOOK row absent from the register). | `proof:disposition-live` extended: register-row-count = ledger-BOOK-count (today 3 vs ~25 → RED until reconciled); G-items encoded-or-retired |
| **W-CLOSE1** | close | The terminal close: overfitting audit (the orphan-scan + the bespoke-copy CLASS); FINAL.md; AUTHOR `proof:ay-final` (FINAL presence + the inheritance cross-walk + the budget-rebaseline diff + the no-open-live-pending assert — the gate's CLAUSES specified, since "green" is undefined today); budget rebaseline; README currency; reconcile the squircle panel-membership contradiction (round-vs-squircle) + clean-break the new `--corner-shape-*` aliases. | `proof:ay-final` born-RED→GREEN aggregating every clause (requires the AY-pathed cardinal gate green + W-CARRY's register-completeness); FINAL written; budget rebaselined; the squircle panel-membership decided ONCE |
| **W-TRIAGE** | triage | The residual-planned umbrella (the folded DRAFT-W8): W20/W21/W28-32/W35/W39/W41-43/W49 — land / RETIRE-with-rationale / DEFER-with-`{trigger}`; the W-DECK deck-chassis lift decision (slides `src/deck/` is a wholesale bespoke chassis marked "consumer #1 of the eventual `/deck`"; glass-ui ships only `/deck-progress`). | every residual AX `planned` wave exits ADDRESSED/RETIRES/DEFERS-with-trigger; `proof:disposition-live` sees zero phantom-owner rows; the W-DECK lift-or-keep-bespoke decision recorded |
| **W-PUB1** | publish | The publish hinge (USER-DOMAIN): master-merge the AY line + push the `v3.10.0` (or next minor) tag → release.yml gated provenance publish. The published version is the slides re-pin target. | `master` contains the AY cut; `npm view @mkbabb/glass-ui version` == the AY cut; release.yml ran green with npm provenance. Agents do NOT execute this leg |
| **W-NDA** | watch | The native-drawer-as-asChild WATCH row (trigger un-MET — muster absent, speedtest does not import dialog-native); the 2 archived disposition rows stay archived. | trigger re-eval green (un-MET → stays booked) |

### Band F — cohesion + structure (net-new; the BLOCKER-class gaps the prior plan had no home for)
| wave | type | scope | hard gate |
|---|---|---|---|
| **W-GLASS** | impl | TOTAL glass cohesion (BLOCKER): re-author `.glass-drawer` (OPAQUE `background-color: var(--background)` today — the one "glass" surface that paints no glass) onto `glass-floating`/`glass-overlay` + ladder shadow + WHC skin (the W54 flip Dialog/Sheet got); route Slider onto `--glass-level` (literal `blur(2px)` defeats the level-0 flatten) + the shared edge-gleam; fix Notification's off-ladder tier+shadow; make the moving-specular `::before` transition OPT-IN (the keyframes-I.W6 19-track non-cohesion, MISDIAGNOSED to W54 — specular is the orthogonal W52 axis); document-or-fix the dock-shell edge-gleam exemption. | an inventory-complete `proof:glass-cohesion` (supersedes the 8-file `proof:glass-one-model` canary): every glass surface routes a `--glass-*` tier + flattens to solid at `--glass-level:0` (π readback incl. Drawer + Slider); the keyframes-I.W6 idle-track count → 0 (captured vs a keyframes.js consumer) |
| **W-MOTION** | impl | ONE motion doctrine: re-point the off-doctrine survivors (`--dock-press-spring` root = `--spring-bouncy`, shadowed by a local re-point — the exact fork the doctrine killed; `cartoon-surface` hover violates both legs; Aurora.vue:223/MetricRow hardcoded-ms; Toast on tw-animate-css); widen `proof:animation-coherence` to the full animated-surface file set + a REGISTER-ASSIGNMENT assertion (surface→bezier, hover/press→smooth/snappy, never bouncy); CI-promote it green; fix the speedtest `--ease-apple-spring` 3-site census (the gate is RED on it now); reconcile the `--scale-hover-btn` 1.05-vs-1.035 value/comment drift. | `proof:animation-coherence` GREEN + CI-tagged + register-asserting; speedtest re-pointed off the excised `--ease-apple-spring`; zero hardcoded-ms/bare-keyword survivors on surface transitions; `proof:dock-animation-live` asserts the entering-child onset (with W-DOCK2) |
| **W-A11Y-PERF** | impl | a11y/perf/Safari: ENGAGE W55 by default (DORMANT — 0 opt-in in slides + demo; the G2 legibility floor is decorative); ship the `-webkit-backdrop-filter` prefix in `dist/` itself (the Safari ≤17 transparent-text trap — 1 of 16 prefixed; correctness hostage to the consumer's autoprefixer); rAF-coalesce `useSpecularTracking` (getBoundingClientRect + fresh matchMedia per pointermove); a nested-backdrop frame-budget gate (maximal-glass glass-in-glass cost ungated); re-derive the dark-contrast oracle for the translucent glass plate (it computes vs solid `--card`, stale post-W54). | a π contrast readback over the ACTUAL shipping glass-over-bright surface clears 4.5:1; a gate asserts the webkit prefix present in shipped CSS; a bounded forced-layout count over a synthetic pointer sweep; a nested-backdrop-depth frame-budget gate |
| **W-CONVERGE** | audit | The per-major-component frontend-design FIT audit (the un-homed transcript directive — "6 frontend-design agents … converge on a library optimum for glass-ui, gaps in glass-ui vs slides"): per major component (dock, constellation, aurora, blob, slider, card, button, dialog, configurator) a glass-ui↔slides FIT disposition (keep/extend/fix) → the L-tranche adoption list. W-SB3's story-language is a thin proxy, not the component-vs-consumer FIT. | a per-component keep/extend/fix disposition table; the gaps feed the L.W-ADOPT inventory + the relevant Band-A/F waves |
| **W-COLOCATE** | refactor | The colocation / sub-component-dir restructure (the BIG reading of the directive — W-GOD1's line-count split is the SMALL reading): break >500 components into sub-component DIRS (components+composables+constants+skeletons colocated); a localized design-idiom HOME (`@apply`/`@utility`/`@theme` colocation, the un-addressed W-CSS1 axis). | the feature-dir colocation pattern landed for the carved god-modules; the design-idiom home documented + composed; no public-surface delta |

---

## §3 — execution DAG (the single hardened roadmap)

The ordering is NOT prose. The full DAG — the 8-batch order, the node→node edges, the cross-repo
`[X-REPO]` publish→re-pin→adopt→deploy chain (with the caret `^3.9.0` → exact `3.10.0` version
arithmetic), the per-batch DELTA-capture discipline, the critical path (the CONSTELLATION
convergence spine), the parallel slack (the entire L content body), and the TWO user-domain hinges
(W-PUB1 publish; L.W5 deploy) — lives at **`audit/EXECUTION-DAG.md`** (authored by W-DAG).

The shape: **Batch 0** (W0-REGROUND + W-DAG + W-CARDINAL-INFRA — BLOCKS everything, zero source
risk); **Batch 1** (research-consume + the BLOCKER cohesion fixes W-GLASS/W-MOTION); **Batch 2**
(component-perfection impl, each on a captured DELTA); **Batch 3** (library systems + storybook +
docs + a11y/perf + W-CONVERGE); **Batch 4** (structure + legacy + carry + W-DELTA0/W-CONSUMER, pre-publish);
**Batch 5** (W-CLOSE1 → W-PUB1 publish [HINGE 1]); **Batch 6** (slides content — PARALLEL with AY,
NOT gated); **Batch 7** (slides re-pin → L.W-ADOPT → L.W5 deploy [HINGE 2], gated on Batch 5).

The critical path: `W0-REGROUND → W-CON1 (refitField) → W-CON2 → W-CON3 (?freeze) → W-CARRY/W-CLOSE1
→ [HINGE 1] W-PUB1 → slides re-pin → L.W-ADOPT → [HINGE 2] L.W5`. Front-loading the constellation
chain compresses wall-clock to the slides headline soonest. Every other AY band is parallel slack.
