# VERDICT-BOARD — the pause artefact (AY glass-ui + L slides; the greenlight read)

**Date** 2026-06-09 (23:xx) · **Branch** glass-ui `tranche/AY` (HEAD over `3622192`); slides
`main` (`3765d52`, NOT deployed) · **Author lane** WA-VERDICT-BOARD (serial; the authored specs are
on disk) · **Reads** the five corpora (`research-necessity/NECESSITY-MATRIX.md`, `hardening/hc2/*`,
`reality/RA-*`, `design/FD-*` + `PERF-*` + `SPEC-perf-author`, `design/FD-deferral-currency.md`) +
the just-authored specs (W-AUR-STUDIO, W-SB-STAGE, W-EGG, W-PRIM-POLISH, L.W-POSTER) +
`USER-DECISIONS-2026-06-09.md` + `USER-HINGE-REGISTER.md` + `PROGRESS.md` + `EXECUTION-DAG.md`.

**This is the artefact the user reads to greenlight the build.** Implementation is HALTED. The state
below is consolidated FROM the corpora (cited, not re-derived). The headline: the library underneath
is genuinely strong — typography graded TRULY-SOTA, the dock expand-morph and blob lean/drag are
excellent, the 13 aurora presets all bite — but the reality fleet (the binding "truly audit each
implementation" directive) found a band of **shipped-but-broken** surfaces whose gates are green, and
**the publish-blocking set grew from 2 to 5 outright** this evening (FD-deferral-currency §3). Every
finding is routed to an owning wave; nothing is unrouted.

---

## §1 — THE STATE (per component, one consolidated line each)

| component | verdict (the one-line read, from the five corpora) |
|---|---|
| **aurora** | Painterly van-Gogh/oil are TRULY-SOTA on real Metal GPU (C/A/β bands LANDED, W-AUR-PAINTERLY live-verified); the 13-preset roster + per-preset clone persistence is excellent (RA-aurora-config). BROKEN: all 5 studio dropdowns are dead chrome (`:is-open="false"` controlled-shut, RA-aurora-config §broken-1) — the headline medium picker + Texture atom UNREACHABLE; the gate built to catch it (`proof:aurora-painterly-statistics`) is itself `status:fail` against the reka re-skin (HC-aurora §3). OWED: the oil-pastel β=−2.53 residual (un-owned dead pointer at T5) + the −5/3 radii lever (un-pulled). → W-AUR-STUDIO / W-AUR-T5. |
| **blob** | Lean/drag interaction is "the best frames I captured anywhere" (RA-blob); the cream OKLCh default landed (W-BLOB2/3 live-verified, L 0.814/0.775). SEVERE: the WCAG-2.2.2 `paused`-prop resume DESTROYS the canvas — full-frame strobe → charcoal slab, the control breaks its own surface (RA-blob C1, reproduced twice). BROKEN config: `pointerAttraction` sign dropped (lunges TOWARD at −1), `stretch` no-op, the hero seed/harmony→color feed is DEAD (`paletteStops` non-reactive). → W-BLOB-CONFIG (render/config) + W-COHERE (mood/shadow cohesion) + W-BLOB-GLASS (the greenlit refraction). |
| **constellation** | SETTLED + corpus-complete + adversarially challenged twice; W-CON1/2/3 all live-verified (refit, warp, gravity-well, ?freeze seam). The DEMO-CONSUMPTION is broken: `compositions/hero` constellation renders 0px (scoped `.constellation{block-size:100%}` beats `.story-hero-bg` absolute → host h=0, RA-flow-fields §4) — a SHIPPED-component positioning bug. OWED: RG2 fabricated-mobile re-capture (the four "mobile" PNGs are 1280×721 desktop shots); RG3 shear arm. → W-SB1 §1.5.2 (paint fix) / W-CON1 (RG re-captures) / W-COHERE (recession parity). |
| **fourier-field** | Engine SOTA-adjacent + W43 intensity model SPECCED; the W43 born-RED spec rebased (W-FF1). Demo reads gate-green-but-visually-thin (the hero vs final preset, RA-flow-fields); auth-shell fourier paints 100% OCCLUDED behind the 0.8α card. OWED: W-FF2 BUILD (land the intensity model, 3-substrate parity, the time-vs-frame trail-prune D3, the non-reactive `intensityClamped` D7) — `planned`, not yet built. → W-FF2 / W-SB-STAGE (un-occlude) / W-COHERE (light floor). |
| **dock** | The expand-morph is EXCELLENT — 120Hz, real spring, lockstep, "the eye agrees with the instrument" (FD-deferral §0.5 calibration); the items-lag was VERIFIED-ABSENT (W-DOCK1, Δ=0ms × 12). BROKEN: `DockLayerGroup` switcher rail broken AT REST (bare A/L/L letters spilling the capsule) + the layer SWITCH blanks the dock ~650ms before popping in (RA-dock-anim §C); collapse has a one-frame hard cut-out + −53% pill undershoot squash (RA-dock-anim §B). OWED: W-DOCK2 RG1/RG2 captures (0 PNGs at HEAD, the live-truth slot holds a synthetic born-RED). → W-DOCK2 (+ RG extension for the layer-switch surface). |
| **slider** | Spectrum form ON-REGISTER vs value.js (it already embodies the containment law the standard wants). CONTRADICTION: the W-SLD1 (b) round-knob revert OVER-SHOT — the standard reads as a "detached floating knob ON a wire" (2.0–3.0× thumb÷track protrusion), NOT the user-clarified "continuous rounded cylinder, thumb integrated into a thick track as one piece" (USER-DECISIONS slider addendum, BINDING). The FD-slider-design lane produced its verdict but no source change (halted). REGRESSION shipped: Firefox `.slider-range` blur is webkit-prefixed-only in `dist` (no unprefixed sibling). → W-SLD1 (third restatement, cylinder build) + W-A11Y-PERF O-2a (the Firefox blur) + W-PRIM-POLISH (the 8% focus halo). |
| **tabs** | SETTLED — SegmentedTabs unified + gated + user-ratified (W53). The anchor-glide indicator's declared `--spring-snappy` never paints positional overshoot on adjacent hops (squish imperceptible, RA-anim-suite) — a doctrine-vs-render gap, not a break. Every squish refinement folds into the W-LIQUID inheritance set (pre-answered). → W-ANIM1 (the render gap) / W-LIQUID (the shared squish facility). |
| **glass-material** | The MAXIMAL glass-first default is the canon (W54); the typography + register are strong. BROKEN: the `--glass-level` OPAQUE ESCAPE is a DEAD PUBLIC API — `<Card tier="opaque">` / `.glass-opaque` / ancestor `--glass-level:0` are byte-identical to baseline; only `:root` works (the substitution-vs-inheritance trap, the exact one CLAUDE.md documents for `--glass-bg-dock`, shipped again — RA-glass-default §4, reproduced). W55 over-light legibility is DORMANT (specced, not engaged by default). → W-GLASS finisher (the escape no-op + capture arm) / W-A11Y-PERF (W55 engage) / W-LEG1. |
| **typography** | TRULY-SOTA — the one unqualified verdict in the whole fleet (RA-typography). Fonts verifiably load (PJS + Fira Code, the real face paints, fallback metrics calibrated), the √φ scale is real + measured, hierarchy reads in situ both modes. Blemishes are demo-page wrinkles only (off-token `text-xl` story headings, mobile clip on the type story) — not system defects. → W-SB1 (the demo-page wrinkles). |
| **motion** | The curve set is enumerable from pinned deps; CSS↔JS spring parity is solver-generated BY CONSTRUCTION; W-MOTION landed (off-doctrine survivors re-pointed, gate widened + CI-promoted). GAPS: overlay enters (Dialog/Popover/Dropdown) speak tw-animate `ease` not the §6 spring register, and `proof:animation-coherence` waves `animation:` shorthands through (the dialect gap is invisible to the gate); the keyframes pin is 2.2.0 (lacks the spec's named 4.1.0 `Sequence`/`stagger`/`flip`). → W-MOTION2 (the full suite + curve table) / W-ANIM1 (the conformance matrix + the gate widening). |
| **storybook** | The chassis SHAPE is right (every page a Card over a manifest backdrop) but it DELETES its own backdrops: the 0.8α floating hero card + 0×0 exposed margin erase 4-of-5 substrate kinds (only aurora's broad wash survives — FD-storybook §2); the front-door index is DEAD (8 hash-hrefs on a web-history router, FD-storybook §1); the egg shelf is bare (konami dispatched live → 298→298, FD §9.2.9); the cmd+K affordance is missing (the shipped Command component unused). → W-SB1 (front door + paints) / W-SB-STAGE (read-through staging) / W-EGG (the six eggs + cmd+K). |
| **deck (slides)** | A distinctive editorial identity (dark cover, redacted receipt, nutrition label, WOPR terminal) at full precision on 4-of-9 slides; S1 cover is "arguably the strongest single frame." BROKEN: the middle band (S2–S6) ships the DOCUMENT register the layout can't hold — export-frame overflow +277/+808/+94/+77/+99px, the load-bearing `A PERSON DECIDES` chip OFF-FRAME (two canvases down) on S4/S5, straight into the pptx leave-behind. → L.W-POSTER (the 9→13 recompose = the breakage fix) + L.W-MOB (portrait reflow) + L.W-ADOPT (constellation swap, publish-gated). |

---

## §2 — THE WAVE SET (every OPEN wave at HEAD, grouped by batch; one row each)

Closed/landed waves (NOT listed): W-DAG, W-CARDINAL-INFRA, W-W0-REGROUND, W-DOCK1, W-MOTION,
W-CON1, W-CON2, W-CON3, W-AUR2, W-AUR-PAINTERLY, W-AUR-WEBGPU-DECIDE, W-BLOB2, W-BLOB3, W-DOCK3,
W-SLD1, W-SLD2 (most carry an OWED capture/restamp residue tracked in §3's RG-debt rows).

### BATCH 1 — RESEARCH-CONSUME + COHESION-BLOCKER (the remaining open ones)
| wave | ships | gate | depends on |
|---|---|---|---|
| **W-AUR1** | aurora RESEARCH.md + the NUMERIC arresting metric (consume H-research-aurora) | RESEARCH.md + N-bound gate | — (briefs authored) |
| **W-BLOB1** | targeted blob open-items audit + default-identity decision | ranked path recorded | — |
| **W-FF1** | rebase the born-RED AX.W43 fourier spec to HEAD | the rebased spec + math-dup decision | — |
| **W-GLASS** | re-author .glass-drawer + Slider onto `--glass-level`; opt-in specular; + the `--glass-level` ESCAPE NO-OP fix (#42) + the owed 8-PNG capture arm | `proof:glass-cohesion` flattens at level:0 (π readback incl. the opaque escape behaving) | — (BLOCKER) |

### BATCH 2 — COMPONENT PERFECTION (the remaining open ones; each closes on a captured DELTA)
| wave | ships | gate | depends on |
|---|---|---|---|
| **W-FF2** | land the W43 intensity model; `intensity` prop; 3-substrate parity; D3 time-trail + D7 reactive-intensity | `final` preset reads + 3-substrate DELTA | W-FF1 |
| **W-DOCK2** | real entering-child onset gate; ONE DOCK_SPRING; rail; + the layer-switch FLIP (#45 RG-extension — the ~650ms blank-out) | dock-lockstep DELTA + RG1/RG2 real-surface GREEN | — |
| **W-AUR-STUDIO** | wire the 5 dead selects (`v-model:is-open`); re-skin the 2 RED gates off native onto reka; seed atoms FROM preset; the −5/3 radii arm; the served-app sentinel | `proof:aurora-studio` (5-deletion-proof + selects-open π + ledger fail→pass + atoms-seed π + sentinel canary) | W-AUR-PAINTERLY (landed) |
| **W-AUR-T5** | [USER-HINGE] multi-pass anisotropic-Kuwahara finish (greenfield; WebGPU-resurrect DEAD) for the oil/oil-pastel A + β residual | greenfield gate born-RED on the residual; gated on H8 | W-AUR-STUDIO §6 (mints it) |
| **W-BLOB-CONFIG** | the hand-rolled config strip → library Configurator; the `pointerAttraction` sign-drop; the stretch no-op; the dead hero color-feed; the SEVERE paused-prop resume-wreck | π readback on all 5 clauses (born-RED at HEAD; SEVERE D4) | — |
| **W-PRIM-POLISH** | gold-CTA light-hover 1.29:1; the lying buttons.vue:99 specimen; the dark cream-fog scrim (`--overlay-scrim` split); the dark destructive badge 3.07:1; the slider 8% focus halo; the CHECKS-BAND decision | `proof:affordance-contrast` painted-pixel + `proof:scrim-contract` + ledger (born-RED on all 6 painted clauses) | W-GLASS / W-LEG1 / W-SLD1 (slider focus after geometry) |

### BATCH 3 — LIBRARY SYSTEMS + STORYBOOK + A11Y/PERF + CONVERGE
| wave | ships | gate | depends on |
|---|---|---|---|
| **W-SCALE1/2** | extend `--ui-scale` to form-atom hit-area + the desktop-fluid ladder; the REAL axe target-size harness | axe target-size pass on coarse; fluid ladder grew | — |
| **W-A11Y-PERF** | engage W55 by default; the webkit prefix in dist (the Firefox blur regression #24); rAF-coalesce specular; the glass-aware contrast oracle | π contrast over the ACTUAL shipping glass-over-bright ≥4.5:1 (measured runtime baselines augmented) | W-GLASS |
| **W-LIGHTHOUSE** | mint `proof:lighthouse` score-floor + the production-preview protocol; split render-blocking CSS + defer value.js; aurora-dock a11y; slides LCP arm → L | `proof:lighthouse` score-floor green | — |
| **W-SB1** | per-route KEEP/FIX/RETIRE + §1.5 (the dead front-door nav, the constellation 0-paint SOURCE fix, the two leaking voices, the typewriter wrap) | extended `proof:no-orphan-demo-route` + G6 (nav/paints/no-leak/no-wrap) | — |
| **W-SB-STAGE** | the StoryHero glass-erasure read-through seam + the FD §6 occasional-usage backdrop map made REAL + `StoryBackgroundKind` gains `blob` | `proof:substrate-staging` (read-through π + map source-witness + restraint) + DELTA | W-SB1 G6b (paints) + W-COHERE E3 (recession prop) |
| **W-EGG** | the SIX divined eggs (ℱ-redraw / konami aurora / cmd+K / blob mascot + 404 / eclipse / shell toggle); the one new unit `dftFromPoints` | `proof:easter-eggs` (per-egg seam + PRM-fence) + DELTA | W-SB-STAGE blob seam (E4) + E6 toggle (E5) |
| **W-SB2** | storybook orphan component-retire (route-prune ≠ component-retire) | orphan-retire proofs | W-SB1 |
| **W-SB3** | storybook native-top-layer FOLD + the real language gate | extended language gate | W-SB1 |
| **W-DOC1** | quality-uplift the 4 existing READMEs (aurora ×6 / dock ×5 / constellation ×4 / CLAUDE.md ×4 / blob ×1 / ff ×1 stale rows) | each README cites its RESEARCH.md | — (reads W-AUR-STUDIO T5 re-route) |
| **W-IC1** | the instrument-chassis scope decision | decision recorded | — |
| **W-CONVERGE** | per-major-component glass-ui↔slides FIT audit (feeds L.W-ADOPT inventory) | per-component keep/extend/fix dispositions | — |
| **W-UNDERLINE** | GlassUnderline — the sci-report HandUnderline pen draw-on as a first-class `/underline` component | `proof:underline` (two clocks, PRM-fence, filter-free) + the ≥2-consumer (slides + sci-report) | — (SOTA answered; build refinements 1–10 pre-stated) |
| **W-MOTION2** | the FULL keyframes.js suite re-exported through /motion + the CSS↔JS curve table + the curve-gallery story | `proof:motion-suite` (4.1.0 pin-bump move-0; STATIC vs DYNAMIC parity) | — |
| **W-ANIM1** | the first-principles animation rubric + the element×principle conformance matrix + the routed fix list + the extended `proof:animation-coherence` (the `animation:`-shorthand blindness #50) | the conformance matrix green; an unrouted row REDs FIX-ROUTED | — (consumes RA-anim-suite §5) |
| **W-LIQUID** | the iOS-27 Siri liquid-glass facility — `useLiquidFlex` amorphous flex+squish (blob/dock/tabs-indicator consumers) | `proof:liquid-flex` + the tabs gate-coupling re-statement | the ONE research arm (Siri bands, time-boxed) + the 3-name substrate reconcile |
| **W-BLOB-GLASS** | [USER-GREENLIT CONDITIONAL] the uBackdrop Snell-refraction glass-not-enamel move | G-PERF (frame-budget unchanged mid-tier) + G-BROWSER (chromium π + webkit + firefox) — a failed condition closes CONDITIONS-UNMET | W-GOD1 (renderer carve) + W-COHERE (settled bead) + the aurora-FBO seam |

### BATCH 4 — STRUCTURE + LEGACY + CARRY + OWED-DELTA (pre-publish)
| wave | ships | gate | depends on |
|---|---|---|---|
| **W-GOD1** + **W-COLOCATE** | carve the 4 god-modules <500 (constellationField 959, Constellation 597, useMetaballRenderer 692, SegmentedTabs 689, GlassDock 624 — re-graded); the sub-component-dir colocation; the RATCHET (#4, CI-promote, RED-on-growth) | `proof:no-god-module` CI green + return-shapes machine-proven | W-CON1/W-BLOB2 landed (carve a settled target) |
| **W-CSS1** | CSS monolith carves cascade-order-safe; the .css-aware gate | gate green; bundle byte-equivalent | — |
| **W-LEG1** | author the legacy gates (~690 survivors never written); the W55 over-light reconcile; the `--overlay-scrim` coordination with W-PRIM-POLISH | no-retired-survivor + tag-parity + var-in-arbitrary green | — |
| **W-DELTA0** | the owed-DELTA sweep (W56 squircle + the 6 AX visual `complete`-exempt rows) | each owed row carries an own-surface DELTA | — |
| **W-CONSUMER** | the consumer-staleness ledger (`proof:consumer-staleness` born-RED on 12 stale imports) | green after consumer re-pins | — |
| **W-CARRY** | onboard the full AT BOOK backlog (register 3→~29); the completeness clause; the G-4/5/6 forks | register-row-count = ledger-BOOK-count (born-RED witness) | — |
| **W-COHERE** | the four substrates as ONE set (blob mood-register + ambient shadow, constellation `opacityCeiling` recession, the set-cohesion gate) | `proof:substrate-cohesion` (ONE accent/recession/shadow) + 4-substrate both-mode DELTA | runs LAST in substrate band, AFTER the carve (E16); binds W-FF2-RG3 + W-DOCK2-RG1 |
| **W-LIVE1** | the local-only live-gate CI decision; the cardinal-gate `complete`-coverage hardening | decision + (Branch B) lane green | — |
| **W-TRIAGE** | the residual-planned umbrella (W20/W21/W28-32/W35/W39/W41-43/W49); the W-DECK lift decision | each residual disposed | — |
| **W-NDA** | the native-drawer WATCH row — trigger re-eval | trigger re-eval green | — |

### BATCH 5 — AY TERMINAL CLOSE → PUBLISH [HINGE 1]
| wave | ships | gate | depends on |
|---|---|---|---|
| **W-CLOSE1** | overfitting audit (orphan-scan: `evalFourier` + library-orphans); FINAL.md; AUTHOR `proof:ay-final`; budget rebaseline; squircle panel reconcile | `proof:ay-final` green (requires AY-pathed cardinal gate + W-CARRY green) | ALL AY waves green (E15) |
| **W-PUB1** | [HINGE 1 — USER] master-merge + push the `v3.10.0` tag → release.yml gated provenance publish | tag + npm provenance; the published version is the slides re-pin target | W-CLOSE1 |

### BATCH 6 — SLIDES CONTENT (PARALLEL with AY; NOT AY-gated except L.W-ADOPT)
| wave | ships | gate | depends on |
|---|---|---|---|
| **L.W0-REGROUND** | reconcile L.md↔L-DRAFT↔waves; re-verify the stale 11-slide verdicts vs the live 7→9-slide manifest | the L set reconciled | — |
| **L.W-GATE** | port `proof:live-verified-ledger`; the manifest↔position contract; harden `proof:deck-copy-conformance` | the slides cardinal gate + position contract green | L.W0 |
| **L.W1-INTRO … L.W7-CLOSE** | the per-slide ground-up rebuild WITH the xray-redolent token/composition spec; the resolved-bookend fix; the P0s + P1 redundancy (deletion-proof) | machine gates per H-slides-567 | L.W-GATE |
| **L.W-POSTER** | the middle-band 9→13 poster recompose (= the breakage fix); the export-frame zero-clip sweep; the `A PERSON DECIDES` chips on every example frame; the shoot.mjs harness fix | HG-1…HG-8 (zero-clip + chips-visible + both-mode-portrait sweep + ledger) | L.W1…L.W7 (slides must EXIST) + L.W-GATE |
| **L.W-MOB** | the portrait-stack reflow rules (`.cadence`-below-stage, `.recon` clamp, `.xray__stage` height, the landscape short-viewport arm); per-slide portrait captures | per-slide portrait DELTA; real occlusion gate | L.W-POSTER (the new split SFCs) |
| **L.W-CHR** | the ONE live defect — the at-rest locked-blur INVERSION (modal + pptx popover already shipped); the 11→7 stale-count sweep | locked-blur captured; stale-count sweep | — |
| **L.W6/L.W7** (Track B) | feedback-coder metric-honesty (0.72 = L2 macro-F1 not "balanced accuracy"); the J-docs unexecuted-marker decision | corrected-metric grep gate; J decision recorded | L.W0 |

### BATCH 7 — SLIDES ADOPT + DEPLOY [HINGE 2] (gated on BATCH 5 HINGE 1)
| wave | ships | gate | depends on |
|---|---|---|---|
| **slides re-pin** | replace `"^3.9.0"` with the EXACT AY-published `"3.10.0"`; `npm ci` resolves from registry | the pin is exact (not a caret) | W-PUB1 (E7) |
| **L.W-ADOPT** | DELETE bespoke constellation.ts; consume `/constellation` (warp+eggs+alpha free); port the integration model + frame-budget DELTA; re-author drawAnomaly→drawOverlay; `proof:no-bespoke-constellation` RED→GREEN | deletion proof + import resolves + frame-budget DELTA + `?freeze` static-capture parity | slides re-pin |
| **L.W-DEPLOY** | [HINGE 2 — USER] forward-cut → merge-to-main → CF-Pages deploy; the gate DECOMPOSED (local green [agent] → user push [HINGE] → post-push live-200 + paired DELTA [agent]) | `slides.friday.institute/til-briefing` 200 + paired before/after DELTA | L.W-ADOPT |

---

## §3 — THE BUILD QUEUE (the ordered execution sequence to the two hinges)

From FD-deferral-currency §1 (the owed-ledger, ordered) + §3 (the fastest honest path). The two
hinges: **HINGE 1 = W-PUB1** (publish v3.10.0, USER) → **HINGE 2 = L.W-DEPLOY** (CF-Pages deploy,
USER). The critical path is the CONSTELLATION CONVERGENCE chain (W-CON1/2/3 → close → publish →
re-pin → adopt → deploy); every other band is parallel slack.

### The PUBLISH-BLOCKING set (must be GREEN/true before W-PUB1; FD-deferral §3 — grew 2→5 outright)

**Tier 1 — mechanisms first** (each ≤40 lines; the prose→machine-row conversion is the binding
constraint, thrice-proven):
1. **R1 IHDR dimension assert** in `proof-live-verified-ledger.mjs` (+ slides twin) — kills the
   fabricated-mobile vector mechanically. → W-CARDINAL-INFRA.
2. **Port-squat identity probe** before `reuseExistingServer` attach — the trap is STILL ARMED
   (PID 43028 on :5173, foreign sci-report vite). → W-CARDINAL-INFRA.
3. **W-CARRY as written** — manifest JSON (29 bookIds), completeness clause, register 3→~29 (E12).
4. **R4 god-module RATCHET** + CI promotion + the W-GOD1 step-0 tag flip (violators 4→6). → W-GOD1.
5. **R6 GREEN-on-real-surface clause** + artefact provenance stamp (live RED instances: #9, #10).
6. **R3 `user-hinge` register disposition** (until landed, W-CLOSE1 re-prints USER-HINGE-REGISTER §B
   verbatim — manual fallback acceptable).

**The 5 outright publish-blockers** (shipped defects in the artefact the tag would publish):
- **#24 — Firefox slider-blur regression** in `dist/glass-ui.css` (webkit-only decls, no unprefixed
  sibling). → W-A11Y-PERF O-2a. **BLOCKS OUTRIGHT.**
- **#42 — the `--glass-level` opaque escape no-op** (`<Card tier="opaque">` dead, only `:root`
  works). → W-GLASS finisher. **BLOCKS OUTRIGHT** (a documented public API that does nothing).
- **#43 — Toast dismissal dead** (`onOpenChange` vs `update:open`) + the fixed-in-glass containing-
  block trap (portal the ToastViewport + mint the precept line). → un-owned → route into W-ANIM1
  build phase / W-TRIAGE-adjacent. **BLOCKS OUTRIGHT.**
- **#44 — Blob pause→resume render destruction** (unclamped dt on the `paused`-prop resume; the
  WCAG-2.2.2 control breaks its own surface). → W-BLOB-CONFIG (D4 SEVERE) / W-COHERE. **BLOCKS.**
- **#15 — the W-SLD1 slider supersession** (the cylinder restatement supersedes the (b) knob revert;
  no live owner artefact yet). → W-SLD1 build phase. **BLOCKS** (user-decision class).

**Block-through-close-honesty** (the BINDING reality directive asked "ACTUALLY robust?"):
- **#45 — DockLayerGroup broken** (rail-at-rest + the ~650ms layer-switch blank-out + no gate covers
  the surface). → W-DOCK2 RG-extension. Rides the same component as the already-blocking #10.
- **#46 — Aurora studio dead selects ×5** + the stale `aurora-atoms-render` driver (the headline
  medium picker dead). → W-AUR-STUDIO.

**The Tier-1 rider — #42a ROUTE THE REALITY BAND:** a disposition row per FD-deferral §0.5 item
(owner wave named or minted). DONE in this verdict-board's §2 + the augmented PROGRESS rows — every
RA finding now names an owning wave (no unrouted row).

### The TRAILING items (can land after the tag without falsifying the close)
- `proof:no-bespoke-constellation.mjs` built in slides now, born-RED (flips post-publish). → L.W-ADOPT.
- Gate-truth additions (animation-shorthand blindness #50, glass-cohesion coverage hole). → W-ANIM1/W-GLASS.
- The stale gate/source headers (Tier 6 batch). → W-DOC1 / W-GOD1.
- FD-primitives orphan (65 captures, no findings doc — now W-PRIM-POLISH adopts the lane). → resolved.
- The user-hinge surfacings (H4/5/6, H7, H8, H9) — re-printed at close (W-CLOSE1).

### The RG CAPTURE DEBTS (placed — Tier 3, BLOCKING captures)
| debt | owner | what's owed |
|---|---|---|
| **W-DOCK2 RG1** | W-DOCK2 | own-surface light+dark frame-series on `/dock/overview` (0 PNGs at HEAD); W-COHERE G4 rides it (E16) |
| **W-DOCK2 RG2** | W-DOCK2 | persisted GREEN `proof:dock-animation-live` on the REAL surface (slot holds the synthetic born-RED) |
| **`proof:dock-rail-cohesion` re-run** | W-DOCK2 finisher | fix landed 16:40, artefact still `fail`; rides with #45 (same component) |
| **W-GLASS capture arm** | W-GLASS | the 8 named PNGs + a PERSISTED π PASS; rides with #42 (same close) |
| **W-CON1 RG2** | W-CON1 | the fabricated-mobile re-capture (the four "mobile" PNGs are 1280×721 desktop shots) |
| **W-CON1 RG3** | W-CON1 | the shear arm (portrait→landscape transpose, sx≠sy coverage ≥0.9) |
| **W-BLOB2 RG2/RG3** | W-BLOB2 / W-COHERE | demonstrative mood-lean series + cream-default mood frame (mood hero still seeds RED) |
| **W-BLOB3 two numbers** | W-BLOB3 finisher | centroid lines + frame-budget number into the DELTA; the false "no twin" sentence; allowlist line |
| **L.W-POSTER sweep** | L.W-POSTER | the export-frame both-mode-both-viewport capture sweep (the AFTER paired against the FD BEFORE captures) |

### The SERIALIZATION constraints (decided)
- **Slider.vue FIVE-writer ordering:** W-SLD1 (cylinder geometry) → W-GLASS (`--glass-level` legs) →
  W-SCALE2 (hit-area) → W-PRIM-POLISH (the focus halo, AFTER geometry) → W-DOCK3 (read-only). The
  focus edit (W-PRIM-POLISH E6) MUST land after W-SLD1's geometry (else it edits a thumb whose box
  is about to change). **DECIDED.**
- **The carve-before-COHERE edge (E13/E16):** W-GOD1 carves the blob+constellation SFCs AFTER
  W-CON1/W-BLOB2 land (or it carves a moving target); W-COHERE runs LAST in the substrate band,
  editing the CARVED SFCs, BEFORE W-CLOSE1 (the FINAL reads the converged set). **DECIDED — order is
  W-CON1/W-BLOB2 → W-GOD1 carve → W-COHERE → W-CLOSE1.**
- **W-SLD1-correction vs the carve — DECIDED: BEFORE the carve.** The W-SLD1 cylinder restatement
  (#15) is a `Slider.vue` geometry edit, NOT a god-module target (Slider.vue is not on the 4-carve
  list — the carve targets are constellationField/Constellation/useMetaballRenderer/SegmentedTabs/
  GlassDock). It is publish-blocking (#15) and gates the W-PRIM-POLISH focus edit on the SAME file,
  so it runs in BATCH 2 (its component band), well before the BATCH-4 carve. The carve never touches
  Slider.vue, so there is no carve↔SLD1 collision; the only Slider.vue serialization is the
  five-writer chain above, all within/before BATCH 3. **No cross-edge to the carve.**

### The fastest honest path to HINGE 1 (FD-deferral §3, the pairing rule)
Tier 1 (+#42a routing, DONE) → the Tier 2 breakage PAIRED into the Tier 3 capture sittings
(**#42+#11** = one W-GLASS close · **#45+#10+#8/#9** = one dock sitting · **#46+#20** = one
stale-driver re-drive = W-AUR-STUDIO · **#47+#13** = one blob sitting) → Tier 4 finisher amendments
→ Tier 5 (spec re-derivations FIRST: #25, #26) → Tier 6 restamp batch → the planned band per the DAG
(with W-SB1/W-ANIM1/W-DOC1 specs widened pre-dispatch) → W-CARRY/W-CLOSE1 with Tier 7 re-printed
verbatim → **[HINGE 1] W-PUB1**. The queue collapses to **~6 working sessions + the planned band**.

---

## §4 — OPEN USER ITEMS (still genuinely user-hinged)

The three 2026-06-09 hinges are DECIDED (H1 no-mag CUT, H2 uBackdrop CONDITIONAL-YES → W-BLOB-GLASS,
H3 poster no-cap → L.W-POSTER). The following remain OPEN (USER-HINGE-REGISTER §B; each carries a
default-if-silent so silence cannot stall a wave):

| # | hinge | the question | default-if-silent |
|---|---|---|---|
| **H4** | G-4 directional View-Transition helper | book (≥2-consumer trigger) or retire with successor? | BOOK with the trigger |
| **H5** | G-5 DrawerContent spring token | book or retire (vaul-vue owns the physics)? | BOOK (strongest retire candidate) |
| **H6** | G-6 cartoon×quiet preset | book or retire (presets-in-consumers)? | BOOK with the trigger |
| **H7** | W-SLD1 knob ratification | SUPERSEDED-IN-PART by the slider addendum (#15 cylinder restatement); the target is now the continuous-cylinder, not the (b) knob | per #15 — the cylinder build |
| **H8** | aurora oil/oil-pastel single-pass ceiling | accept the A/β ceiling as permanent register, OR greenlight the fresh multi-pass Kuwahara wave (W-AUR-T5)? | (c) pull the −5/3 radii lever first (W-AUR-STUDIO D5); if still out-of-band, (a) accept-as-register at close |
| **H9** | feedback-coder audience lock (L) | research/lab only, or policymaker/auditor included (the S2/S4 density trims fire on the policymaker answer)? | (a) research |

**The CHECKS-BAND decision (W-PRIM-POLISH D7) is CANON-DECIDED, NOT a user-hinge by default:** the
size-gated split is ARM B (allowlist) for the 16px Checkbox/Radio + ARM A (glass-wash + specular) for
the 28–32px Switch track. It becomes a user-hinge ONLY IF the live Switch-track-as-glass capture reads
WORSE than opaque — then surface the one-line ratification (glass track vs allowlist-opaque), NOT a
third engineering iteration.

**The two USER-DOMAIN actions (not questions — the irreversible legs only the user pushes):**
- **HINGE 1 — W-PUB1:** master-merge + push the `v3.10.0` tag (gated behind W-CLOSE1).
- **HINGE 2 — L.W-DEPLOY:** the CF-Pages deploy + post-push live-200 (gated behind HINGE 1 + L.W-ADOPT).

---

## §5 — THE NUMBERS

**Waves (glass-ui AY):**
- **Total wave specs on disk:** 54 (`waves/AY.W-*.md`).
- **PROGRESS rows:** 63 table rows (the 54 waves — some carrying multiple status/augment rows — plus the augment/cross-route addenda: W-CON2/W-SLD1/W-BLOB3/W-DOCK2/W-ANIM1/W-SB1 augments).
- **LANDED (closed GREEN at HEAD):** 16 — W-DAG, W-CARDINAL-INFRA, W0-REGROUND, W-DOCK1, W-MOTION,
  W-CON1, W-CON2, W-CON3, W-AUR2, W-AUR-PAINTERLY, W-AUR-WEBGPU-DECIDE, W-BLOB2, W-BLOB3, W-DOCK3,
  W-SLD1, W-SLD2 (most carry an OWED RG/restamp residue — see §3).
- **OPEN waves:** 38 (Batches 1–5).

**Live-verified count (visual waves with a fresh on-disk own-surface DELTA at HEAD):**
- **10** — W-DOCK1, W-CON1, W-CON2, W-CON3, W-AUR-PAINTERLY, W-BLOB2, W-BLOB3, W-DOCK3, W-SLD1
  (+ W-MOTION/W-SLD2/W-AUR2/W-AUR-WEBGPU-DECIDE closed `dev-complete`/`complete`, no-pixels).
- **CAVEAT (the RG re-capture debt):** 3 of these 10 carry a FABRICATED-MOBILE or non-demonstrative
  capture flag — W-CON1 (1280×721 desktop shots labeled mobile), W-BLOB2 (static-red mood frames),
  W-DOCK2 (0 PNGs — still `live-pending`, NOT in the 10). The R1 IHDR assert (publish-blocker #1)
  closes this fabrication vector mechanically.

**Capture-debt count (RG/owed captures placed in §3):** **9** distinct owed captures (W-DOCK2 RG1/RG2
+ rail-cohesion re-run, W-GLASS 8-PNG arm, W-CON1 RG2/RG3, W-BLOB2 RG2/RG3, W-BLOB3 two-numbers,
L.W-POSTER sweep) — plus the `VISUAL-ALLOWLIST.json` curation breach ×6 (the 6 pixel-changing closes
never self-added: W-CON2/CON3/AUR-PAINTERLY/BLOB3/DOCK3/SLD1).

**Publish-blocking count (must be GREEN before HINGE 1):** **6 mechanisms (Tier 1)** + **5 outright
shipped-defect blockers** (#24 Firefox blur, #42 glass-opaque no-op, #43 toast undismissable, #44 blob
resume-wreck, #15 slider supersession) + **2 close-honesty blockers** (#45 DockLayerGroup, #46 aurora
selects) + **9 BLOCKING captures (Tier 3)** + the Tier 4/5 finisher amendments. The shape: the library
underneath is strong; the close LAYER carries the debt, and it collapses to ~6 working sessions.

**Waves (slides L):** 16 specs on disk (`L.W-*.md`); the AY-gated one is **L.W-ADOPT** (the rest of L
is parallel, consuming the already-shipped 3.9.0). L is held at `main 3765d52`, NOT deployed.

---

## Appendix — verification note (this lane)

Every §2 wave was verified to carry a PROGRESS row (38 open + 16 landed + 6 augment rows = the full
table; `grep -c` per wave-id confirmed 1+ each). **No missing rows — no PROGRESS appends owed.** Every
FD-deferral §0.5 reality-band finding (items 1–13) names an owning wave in §2/§3 (the #42a routing
obligation discharged). No unrouted findings.
