# BG — FINAL (the binding lock document)

**Status: TRANCHE DEVELOPMENT COMPLETE — all 12 workstreams CONVERGED. This is the develop-ready
plan, NOT an implementation.** It agglomerates the 12 converged specs (`converge/BG-WS*/SPEC-pass*-converged.md`)
into ONE master roster + defect map + deferred-fold ledger + execution sequencing. NO `src/` lands
until the user greenlights the build phase.

**Base:** `tranche/BG`, off `master` (the 4.2.0 ship), v4.2.0-line. The 4.3.0 cut is PARKED on
`release/4.3.0` (the K-I-ROOT-AUTHOR Δ1+Δ2 set) and does NOT re-open here. The honest verdict from the
archaeology + audit: 4.2.0 is **assembly- and verification-bound, not primitive-bound** — almost every
engine exists; the failures are WIRING, OVER-CORRECTION (gray→metallic, the 20%-darken-as-grey origin),
and a release gate that never measures paint. BG is an INTEGRATION + VERIFICATION tranche.

**The cardinal bar (binding, every wave):** real-paint-verified on a REAL GPU, **Chrome AND real macOS
Safari/WebKit 26**, both modes, by a NON-AUTHORING agent on a fresh capture. The headless-green /
visually-broken gap shipped broken 3× (BB green-lie · BC never-built-cure · BD 77-gates-re-pointed-but-
live-π-never-blocks-the-tag); WS7's `BG.W-PAINT-IS-THE-GATE` + `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION`
exist to kill it a 4th time. **Convergence caps at the spec frontier by design** — every WS converges the
MECHANISM; the binding paint is the BUILD phase (no integration branch exists at HEAD).

---

## 1 · The 12 workstreams + convergence state

The convergence % is the spec's self-assessed mechanism-confidence; the residual to 100 is ALWAYS the
same shape — "nothing is landed on `tranche/BG` + zero real-paint captures taken." The number is a
mechanism-trust figure, not a done-ness figure.

| WS | Title | Passes | Conv. | Waves | Binding frontier (what caps it below 100) |
|----|-------|:------:|:-----:|:-----:|-------------------------------------------|
| **WS1** | Shell · Routing · Field | 4 | converged (mechanism) | 7 | Δ0 — nothing integrated; live monotonic-GL + Safari per-window-budget capture uncaptured |
| **WS3** | Glass standardization | 4 | converged (M4a build-proven 88%) | 11 | cross-engine PAINT unbound; M3 Safari-26 Job-B clip sign-off owed; WS1 field not on disk |
| **WS2** | Dock convergence | 2 | mechanism-settled | 11 | landing-semantics build-unproven; slow-Metal teardrop box UNMEASURED; C-SAFARI zero HEAD-verify |
| **WS5** | Viz refinement | 2 | 90% | 9 (+2 booked) | paired-engine paint-π build=FALSE (a sketch); aurora WGSL arm-probe outcome unknown |
| **WS6** | Siri capabilities | 1 | 70% | 4 | binding real-paint π unproduced; gated behind WS2's `useDockSpring` |
| **WS4** | Components · Demo · Encapsulation | 4 | 96% | 22 | nothing landed; WebKit captures untaken; WS3 cartoon-ink hostage; 3 open rulings |
| **WS7** | Quality · Coverage · Close | 4 | 72% (design ≈86% @pass3) | 19 | nothing on committed disk; non-self-authored Metal born-RED capture absent; ship-attestation unbuilt |
| **WS8** | Glass-deep (apotheosis) | 4 | 72% | 5 | C-SAFARI Metal capture absent; dark-mode AA-over-ridge LIVE open risk (committed evidence FAILS 4.5) |
| **WS9** | Paper-deep | 1 | 64% | 5 | lit-tooth cross-engine determinism unproven; Safari `lighting-color` colorspace risk; metallic-recurrence |
| **WS10** | De-shadcn / Tailwind v4 | 3 | 90% | 5 | edits not on tree; R2 grouped-Select WebKit-dark separation on REAL Safari is the load-bearing residual |
| **WS11** | Storybook facility | 4 | design-converged, exec-unconverged | 4 | WS1+WS4 integration branch does NOT exist; railHealth + frost capture untaken |
| **WS12** | Coherence · Congruence (capstone) | 4 (MAX) | 72% | 6 | 480-capture dual-engine verdict is STRUCTURALLY post-integration (rides WS1–WS11 landing) |

**Total: ≈110 distinct waves** across the 12 workstreams (+ ~6 booked successors). Build order:
core **WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7**, then deep-morphism **WS8 → WS9 → WS10 → WS11**,
then the **WS12** coherence capstone last.

---

## 2 · The full BG wave roster (the master build manifest)

Grouped by workstream in pipeline order. Each: `BG.W-<NAME> — what-it-does + machine-lock gate`.

### WS1 · Shell · Routing · Field (7) — D1·D2·D5·D9·D10
- **BG.W-ROUTE-TRANSITION** — the linchpin. Collapse the 4-mechanism route pile to a BARE KEYED ATOMIC SWAP (`<component :is :key="route.path" class="route-enter">`, NO `<Transition>`, NO Suspense); delete bloom-find-child + 2 no-op `startViewTransition` + skeleton/no-match branches; on-mount `@keyframes gl-route-enter`; plain-lazy. *Gate:* `proof:route-confounder` + `proof:route-single-root` (re-scoped hygiene) + the live 5-nav burst π.
- **BG.W-FIELD-AURORA** — retire `.paper-field` SURGICALLY (grain survives); ONE shell `<Aurora v-if="shellFieldActive">` `vividness:0` + explicit recessive C 0.05–0.09 palette; `background.kind`-derived `meta.focal` + `SELF_STAGES_GL`; never-2-GL-contexts boundary rule. *Gate:* `proof:no-paper-field` + `proof:focal-complete` + `proof:offscreen-pause` un-regressed + the live monotonic-GL===1 π.
- **BG.W-SCROLL-PROGRESS-RAIL** — D5. Hoist `transform-origin:0 50%; transform:scaleX(0)` UNCONDITIONAL; `scroll(nearest block)` on the sticky child; drop the invalid `scroll(var(...))` substitution. *Gate:* COMPUTED-`animationTimeline` read + global `scroll(\s*--` scan + `proof:ba-animate` re-point.
- **BG.W-FIELD-ACCENT-RECONCILE** — fold the duplicate warm-projection (`warm-field.ts` ≡ `aurora-hero.ts`); export `warmProjectHue`/`SECTION_COLOR_OKLCH`/`sectionHueDeg`; rewire `useGlassBackdropLuminance` to the shell canvas. *Gate:* `proof:field-accent-reconcile` (13-index hue parity ε0.5° + single-source + 2-consumer + AA).
- **BG.W-PAPER-GRAIN-OPTIN** — demote the universal 0.22 grain → per-surface opt-in; `PaperBackdrop` → pure grain register. *Gate:* `proof:no-paper-field` grain-survival arm.
- **BG.W-HERO-FIT** — D10. ONE chassis title path (hero+intro) + `#title-ornament` slot + MANDATORY short `displayTitle`; svh short-viewport guard; drop `max-w-5xl`; ≥display-4 floor @≥768. *Gate:* the 375/768/1440/1920 both-mode π (block ≤0.62svh, no hyphenation@375).
- **BG.W-VT-ROUTE-ENHANCE** — DEFERRED/OPTIONAL. Drive `router.push` through the shipped `navigate()` behind `supportsRouteTransitions()`; purely additive over the atomic floor.

### WS3 · Glass standardization (11) — D3
- **BG.W-CARTOON-INK-GAMUT** — kill the maroon: in-gamut warm-brown `--cartoon-ink` pin (R>G>B>0, hue∈[45,85] both modes). *Gate:* `proof:no-gray` NEW `cartoon-ink-warm-in-gamut` witness (born-RED) + real `box-shadow` getImageData π.
- **BG.W-DOCK-CAST-RETIRE** — delete the W3C-dead `.cartoon-cast` block + wedge + the `<span class="cartoon-cast">`; add the dock-scope PRM `--motion-weight:0` carve. *Gate:* atomic source-absent + `getComputedStyle`-in-bundle confirm.
- **BG.W-GLASS-CLIP-DISCIPLINE** — Job-B `contain:paint` on a NARROWED content+`.glass-card` selector (overlay band + 4 dock controls EXCLUDED); retire per-class `contain`/`isolation` dialects into ONE. *Gate:* `proof:glass-clip` (born-RED) + Safari-26 Job-B sign-off (the convergence CEILING).
- **BG.W-SAFARI-BLUR-LITERAL** — M4a, build-proven 88%. The `-webkit-backdrop-filter` arm emits a RESOLVED LITERAL (`var()` paints flat on Safari, MDN #25914). *Gate:* HARDENED — presence AND value-correctness (blur-px matches the unprefixed arm) + Safari-26 4-region differential.
- **BG.W-GLASS-BLUR-PEER** — 4-file token collapse: demote default Button off `glass-deep`, `.btn-glass`/dock → `--glass-blur-resting`; ONE 8px resting radius across dock·button·card·menu-row; saturate-revert WS1-gated. *Gate:* `proof:glass-cal` resolved-radius peer lock (8px leg, alias-following) + ~7-gate rebaseline in-diff.
- **BG.W-GLASS-TINT-UNIFY** — ≤2 chromatic SURFACE pairs (plate + rim) + ONE heavily-clamped INPUT bias (`--glass-tint-bias-*`); continuous-luma source rule; fold `--glass-fill-tint`; the `.liquid-pill` substitution close (M5a). *Gate:* `proof:glass-foundation` A1 (bias-write + composes-the-mix + getImageData bite); WS1-gated.
- **BG.W-GLASS-IDIOM-FACTOR** — DRY: `--glass-plate-tinted` declared ONCE; dead-token deletes (KEEP deep-ceiling, DROP phantom warm-zero); contrast arms collapsed to one comma-`@media`. *Gate:* reader-census-at-landing per delete.
- **BG.W-GLASS-CONSUMER-BAND** — fold the fill-tint consumers (Badge/SelectableChip/IconChip/glass-atom/glass-chip) onto the plate/rim pairs. *Gate:* the 3 design sign-offs + computed-style.
- **BG.W-DOCK-LEGIBILITY-RECAL** — re-anchor dock AA at saturate 1.2 once the unified plate tint is the primary anti-gray. *Gate:* `proof:no-gray` dock witnesses (WS1-gated).
- **BG.W-GLASS-DYNAMICS** — strengthen W-LENSING squircle refraction + NEUTRAL specular hairline as the read-carrier at the calmer blur; backdrop-HUE sample. *Gate:* read-carrier paint sign-off (the demoted dock/Button STILL reads as glass); REFERENCE FENCE (resting hairline neutral, prismatic reserved for WS6).
- **BG.W-DEMO-STYLE-REHOME** — WHOLE-rehome `glass/liquid-morph.css` (850L) to `demo/`; `liquid-enter.css` delete BLOCKED (live `@import`). *Gate:* net-neutral; WS1-gated.

### WS2 · Dock convergence (11) — D8·D12·D13
- **BG.W-DOCK-MORPH-UNIFY** — 5 `SpringProgress` sites → ONE `useDockSpring` factory; extract `dockLayerFlip.ts`; fold `useLayerTransition` → orchestrator (measure-free). *Gate:* exactly ONE `new SpringProgress` in the dock dir; `proof:dock-morph-family` F3 / `proof:dock-fission` F1 / `proof:dock-orchestrator-single` re-pointed born-RED→GREEN same-diff.
- **BG.W-DOCK-BUSY-SINGLE** — 4 busy-signals → 1 `morphing` ref; retire `useDockMorphWindow` + dead `@transitionend`.
- **BG.W-DOCK-CUT** — delete `useDockContextSilhouette` (551L, 0 consumers) + test + `proof:dock-context` (AFTER WS6 confirms unwanted — R7).
- **BG.W-DOCK-DECOMPOSE** — carve `GlassDock.vue` 711L → colocated fission-wiring + touch-gate; design out the `container-type` clamp; drain RATCHET rows.
- **BG.W-DOCK-FISSION-WIRE** — the DECIDE (wire ≥2 real or retire); floor `railProjection.fadeMinAlpha`; DRY the goo bridge onto ONE `GooFilter`. *Gate:* `proof:dock-fission` re-point + carousel/pager no-goo-regression PAINT-π.
- **BG.W-DOCK-PERSISTENT-CUT** — D8. Remove the useless persistent ℱ brand + the Fourier egg atop both docks; Foundations rejoins the nav loop.
- **BG.W-DOCK-CAP-SCROLLS** (folds **-UTILITY-REACH**) — a capped axis is ALWAYS a scroll axis; retire the vertical opt-in; lozenge = geometric inset guard. *Gate:* `proof:dock-plate-clearance` re-pointed onto the geometric-slack guard.
- **BG.W-DOCK-OVERFLOW-FADE** — `useFadingScroll` soft edge on the cap-scroll port.
- **BG.W-SHELL-DOCK-DRY** — collapse the two shell docks → ONE morphable nav-dock instance; PRESERVE the mobile Sheet trigger; responsive swap ⟂ morph axis. *Gate:* P1 landing-semantics build-proof (single-flip + leave-flow→bottom-bar + one CLS-bounded settle).
- **BG.W-DOCK-INPLACE-MORPH** — D13, the headline. Delete the modal + synthetic + VT-crossfade; an in-dock BUTTON flips the REAL dock V↔H in place via the liquid teardrop (compose `useDockSpring`; fixed-anchor `transform-origin`; surgical filter-budget fix; analytic-velocity 12-laws squish). *Gate:* `proof:dock-morph-insitu` M2/M4 flipped teardrop-only IN LOCKSTEP with the AppShell VT delete; live 12-laws weight frame-series.
- **BG.W-DOCK-STORY-MODULARIZE** — thin demo-side story carve; DEFERRABLE.

### WS5 · Viz refinement (9 active + 2 booked) — D6
- **BG.W-VIZ-INTRINSIC-SIZE** — fix the canvas intrinsic-size collapse (the 300×150 / 1px floor). *Gate:* backing == round(gBCR×dpr) + non-zero pixels.
- **BG.W-VIZ-SIZER-ADOPT-HARD** — adopt the shared sizer; `dprPolicy`-required is the last step. *Gate:* `proof:viz-resize-upload-only` (zero self-measuring `resize()`) + discriminating SPA-nav paint-π (meanByte>floor) + offscreen-park.
- **BG.W-VIZ-DEMIGRATE** — fourier-field + constellation DE-migrate off WebGPU onto `useCanvas2D` (their own DO-NOT verdict); ≥13 files + ≥2500 LOC deleted. *Gate:* no `createGpuSubstrate`/`.wgsl`; budget re-pinned DOWN; co-moves the 5-member NON_MIGRATING flip with substrate-delete.
- **BG.W-VIZ-REVEAL-BLOOM** — ship the entrance reveal-bloom (brightness overshoot ≥12% then settle). *Gate:* deterministic brightness-filter readback; `useVizChoreography.ts` DEFINITION-ABSENT.
- **BG.W-VIZ-PREVIEW-LIVE** — D6. 11 DISTINCT live previews (not 11 frozen aurora stills): 7 leaf / 2 gated-approx / 2 field. *Gate:* per-card pixel-hash differs + per-viz recognizability + ≤1 live GL context.
- **BG.W-DOTFLOW-REBUILD** — rebuild dot-flow (compute STAYS WebGPU — the sole earner); subtle larger sweeping waves.
- **BG.W-VIZ-SUBSTRATE-DELETE** — DELETE concentric + paper-grid WebGPU + orphaned `flow.wgsl`/`waveField.wgsl`; relocate `CONCENTRIC_FIELD_NORM`; KEEP aurora (arm-probe). *Gate:* the 4 per-viz gates REWRITTEN (not de-registered); `proof:gpu-substrate-single` co-revert atomic with DEMIGRATE.
- **BG.W-GOODOT-SETUP-SPLIT** — carve the goo-dot-matrix `setup` into the M1-adopted shape.
- **BG.W-BLOB-KINEMATICS-LEAF** — carve `useBlobSatellites` kinematics into a leaf.
- *(booked)* **BG.W-VIZ-SUBSTRATE-DELETE2** — goo-blob/dot-matrix/goo-dot WGPU delete, GATED on per-viz arm-probe. *(booked)* **createFragmentGLPass** — GL2 fragment-pass factor, trigger ≥3 consumers.

### WS6 · Siri capabilities (4) — NEW
- **BG.W-GLASS-BLUR-ENGAGE** — lands FIRST. The `--siri-island-t`-coupled descend scrim: `filter:blur()` on a wrapper of the REAL content's OWN pixels (Safari-safe), oversized + two dim modes (global `::backdrop` / local panel). *Gate:* `proof:glass-blur-engage` (E1–E5 + self-test bites).
- **BG.W-SIRI-ISLAND** — gated behind WS2's `useDockSpring`. The glass island: 4 forms on ONE `--siri-island-t` scalar (the √φ ladder, forms-are-DATA); clip-aperture + overlapping content crossfade; warm under-glow; `role=status`; box-inviolate beside the dock. *Gate:* `proof:siri-island` (S1–S7, ZERO `new SpringProgress`, composes `useLiquidReveal` ElementMorph) + `proof:bg-gestalt` island verdict.
- **BG.W-SIRI-WAVEFORM** — WebGL2-only. ONE GLSL pass on `useWebGLCanvas`; warm-dominant prismatic lens-flare; in-shader OKLab-rectangular ramp; push-API `level(0..1)`. *Gate:* `proof:siri-waveform` (W1–W5, NO `.wgsl.ts`, warm-identity in `proof:teal-navy-purge`) + arm-A real-GPU `meanLum>floor` + cross-engine capture artifact.
- **BG.W-SIRI-DOCK-INTEGRATION** — lands LAST. The "Search or Ask" pill composes the EXISTING `useDockSearch` (ONE pipeline); island off the `#rail`/`.glass-dock-frame` escape; retires the cloned "Dynamic Island Call" demo. *Gate:* `proof:siri-dock-integration` (D1–D5, box-inviolate, webkit testMatch carries both specs).

### WS4 · Components · Demo · Encapsulation (22) — D4·D6·D7·D11·D14
*Restore:*
- **BG.W-SCROLL-SHRINK-UNIFY** — D4+D14. Externalize card scroll-shrink to global `card-scroll.css` (SCALE-only `@keyframes title-collapse`, no-overshoot ease); page/hero share the scale leg; D14 `%`-off-`--col` fix. *Gate:* live MONOTONIC-SCRUB π (card AND hero non-increasing 0..120px) + CLS≈0; HARD-dep WS1.
- **BG.W-SHEET-INSET-ROOT** — D7. Fix the configurator drawer (gear→Sheet); the SFC `data-slot`+`data-side` mint; CVA geometry stripped to decoration. *Gate:* live `top===0`+`onScreen` all-4 + no transform/contain ancestor + `proof:emission` overlay-band inverse clause.
- **BG.W-SPECIMEN-PER-STORY** — D11. Per-story registry + `<StorySpecimen>` dispatcher; REAL Select/Slider per category card (12 distinct kinds, canvas=0). *Gate:* `proof:bento-specimen` (occupancy + zero-interactive-inside-link + 12-kinds-non-empty).
- **BG.W-BENTO-FRONTDOOR-UNFORK** — wire intro/hero onto the dispatcher; delete the 2 glyph forks.

*Motion collapse:*
- **BG.W-DEAD-COMPOSABLE-CUT** — `useLiquidMorph` + `useVizChoreography` + `useDockContextSilhouette` DEFINITION-ABSENT; gut `useMorphField()` → `morphSignatures.ts`; delete `morph-field.css`. *Gate:* grep-gated + MIGRATION row (no-touch `proof:liquid-morph`).
- **BG.W-FLIP-ONE** — ONE `useFlip` = the ElementMorph-inversion runner; reveal/cta/bloom = thin presets. *Gate:* `proof:flip-one` (composes-substrate + HOLLOW-useFlip falsifier; 3 import gates assert `useFlip` + FORBID `new ElementMorph`).
- **BG.W-PRESS-MOUNT-RECONCILE** — `useSpringMount` bloom-enter onto the shared runner (ONE Dialog/Sheet enter); `useLiquidPress` 2nd-consumer-or-fold.
- **BG.W-SPRING-REGISTER-TIDY** — move 3 timeline rows to a ScrubberTimeline-LOCAL map; drop dead `--spring-timeline-*` twins; table→6; regen + re-snap.
- **BG.W-SCROLL-READER-UNIFY** — fold `useScrollProgress` onto `scrollReader.ts`.
- **BG.W-LIQUID-ENTRANCE-GENERAL** — WIRE `liquid-enter.css` onto its named mount surfaces; PRM-carved; `linear()` fallback.

*Encapsulation (>500-line splits + colocation):*
- **BG.W-COLOCATION-GATE-STRUCTURAL** — structural colocation gate (widen enrollment + clause-a via `rootComposables()`); the 3 real dir moves + 3 genuine READMEs. *Gate:* enroll exactly 3, over-pull zero, full gate GREEN on the post-move tree.
- **BG.W-CANVAS-LIFECYCLE-LEAVES** — carve `createCanvasLifecycle` (695L) + `useWebGPUCanvas` (606L); re-measure POST-WS5 (sequence after WS5).
- **BG.W-AMBIENT-HISTOGRAM-LEAF** — carve `useGlassBackdropLuminance` (542L) → `ambientHueHistogram` + `wcagLuminance` (value.js moves with the leaf so `proof:single-color-core` follows).
- **BG.W-TABS-KEYBOARD-LEAF** — carve `SegmentedTabs` (512L) → `useTabRovingFocus` + `useTabResponsive` (44px floor preserved).
- **BG.W-GOO-BARBELL-CSS** — reconcile `goo-barbell.css` shared by Carousel≡Pager; Safari floors via `@supports not(filter:url())`; REGULAR `filter:url()`.
- **BG.W-TIMELINE-ENCAPSULATE** — `timeline/` into the colocation contract (add `composables/`) + `styles/timeline.css`; KEEP the allowlisted `transition:width/left` legs inline.
- **BG.W-SFC-CSS-PARTIAL-SWEEP** — Slider recessed-track + heavy-CSS SFC partials; KEEP `[data-size]` inline (the BA.W-EMISSION structural-precompile).
- **BG.W-UNIFORM-LAYOUT-BUILDER** — DEFER-coordinate-with-WS5; carve the std140-packing copies; re-measure POST-WS5.

*No-legacy + demo:*
- **BG.W-CHIP-ALIAS-KILL** — delete `selectableChipVariants.ts` + re-point (`SelectableChipVariants`→`ChipVariants`) + MIGRATION (ATOMIC).
- **BG.W-DEAD-TOKEN-SWEEP** — cut ONLY `--corner-shape-card`/`-pill` (PRESERVE live squircle tokens); re-point `proof:squircle-language` onto the negative guard (ATOMIC).
- **BG.W-DEMO-CHASSIS-CONSOLIDATE** — delete DemoFrame/StorySectionHeader (zero-importer); fold raw triplets onto ShowcaseFrame; CodeBlock→Code.
- **BG.W-MANIFEST-COLOCATE** — fold the 4 string-keyed maps onto the `s()` row; de-dup the StoryHero cluster; reconcile the 3 narratives.

*De-shadcn (WS4 owns the SWEEP; WS10 owns the deep census):*
- **BG.W-DESHADCN-SWEEP** — register `proof:de-shadcn` born-GREEN (atomic register+clear); the 7 clears (3 wells + stepper rung + Combobox/TagsInput/SearchIcon + forced-colors). *Gate:* `proof:de-shadcn` HEAD-mode + `tests-visual/de-shadcn.spec.ts`. **(This is WS10's W0 precondition.)**

*Cross-cutting law:*
- **BG.W-12-LAWS-UNIVERSAL** — liquid-weight/inertia/bounce on ALL restored motion (spatial-on-spring, enter-bouncy/exit-no-overshoot, scroll-scrub NO-overshoot); the Liquid-Glass content-fence (glass on chrome, paper on content); cartoon-technicolor on state-change beats only.

### WS7 · Quality · Coverage · Close (19) — the close machine
*Band 0 (the no-silent-drop machine, FIRST):*
- **BG.W-DEFERRED-LEDGER** — DRY `fold-ledger-core.mjs` over the DERIVED 136-item corpus; 3 teeth (charter-match / templated-evidence / concentration-ceiling). *Gate:* `proof:bg-deferred-ledger` born-RED on the un-DECIDED corpus; every derived id DECIDED with REAL evidence routed to a charter-matched wave.
- **BG.W-BE-BF-LEDGER** — 70-wave BE+BF parity (LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** — 31 BC→BG dispositions re-evaluated in place (n:2 re-eval; 2 pending flips); re-stamp-without-decide REDs.

*Band 1 (the no-legacy cuts):*
- **BG.W-SPIKE-DELETE** — `useLiquidMorph` (462L) delete + `useMorphField` gut-and-rehome + `selectableChipVariants` alias + `liquid-morph.css` (850L) demo-rehome; atomic file+gate+ratchet.
- **BG.W-JUBILANCE-DECIDE** — RETIRE `useHaptic` (real-grep adjudicated); KEEP `useCelebrationBurst` (2 consumers); record FLIP-ONE as a coordinated row.
- **BG.W-DEAD-GATE-SWEEP** — F6 gate→symbol map by IMPORT; a RETIRE/SWEEP charter (no BUILD row routes here).

*Band 2 (the paint-gates — the disease cure):*
- **BG.W-PAINT-IS-THE-GATE** — `proof:ba-gestalt` reads LIVE paint; the decoder extension (chroma-gate, per-surface field-probe regions, DEFECT-LOCALIZATION-MAP); persisted NON-self-authored real-GPU PNGs. *Gate:* born-REDs on a 4.2.0 Metal reproduction the agent did NOT author; the all-PASS-re-shot-broken regression bite still REDs.
- **BG.W-GESTALT-ROSTER-RE-POINT** (the WS1 `GESTALT-REPOINT` reference) — surface-paths DERIVED from route files; the roster `.md` shipped (10 surfaces, BG-dated); REQUIRED_SURFACES purge.
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** — `proof:ship-attestation` `["ci","release"]` — the tag-push bypass-closer (surfaceHash bound to REAL source bytes; fail-CLOSED `runShip()`; the GREEN ceremony run end-to-end in a fresh `/tmp` worktree). *Gate:* `--run full` REDs in CI-shape on absent/stale `SHIP-ATTESTATION.json`.
- **BG.W-GATE-ROUTING-LIVE** — `proof:route-navigates`: `main > article` single-child over ≥6 hops, N=20==100% on fixed. Band-2 `["ci","release"]`.
- **BG.W-GATE-FIELD-AURORA** — `proof:field-aurora` device-free SIMULTANEOUS-painter count (3-stack born-RED) + chroma-ceiling Metal symptom-π.
- **BG.W-GATE-PREVIEWS-RENDER** — the /substrates live-preview render gate.
- **BG.W-GATE-UNIFORM-BLUR** — the cross-surface uniform-blur peer gate.

*Band 3 (Safari + constraints):*
- **BG.W-SAFARI-PARITY-GATE** — `proof:safari-parity` Band-3 `["local","ci","release"]`; RED-on-broken `backdrop-filter:url()`, GREEN-on-clean against the live landmines + the 10 oklab single-mixes; regular `filter:url()` goo/fission must NOT RED.
- **BG.W-CONSTRAINT-MANIFEST** — `CONSTRAINTS.md` (six binding constraints + Safari version matrix + ≤18 trigger + Mac-only-release) + `proof:constraint-manifest`; lighthouse re-pin.

*Band 4 (census BUILDs, post-close coverage):*
- **BG.W-DATE-CALENDAR** (reka-ui BUILD) · **BG.W-CHART-FAMILY** (token-SVG BUILD) · **BG.W-DS-COMPLETE** — each a genuinely-adjudicated fold-ledger row with a build-or-defer verdict.

*Band 5 (the cut):*
- **BG.W-CUT** — the tag fires ONLY after `--run ship` passes over the served BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` + the user gate.

### WS8 · Glass-deep — the apotheosis (5)
- **BG.W-GLASS-SUFFUSE-UNIVERSAL** — field-INDEPENDENT, lands NOW. The Tier-0 iOS-27 bevel material floor (brighter edges, flatter visible radius, single outer ring, size-relative small-control set) + the atomic `useSpecularPointer` fold. *Gate:* `proof:glass-specular-angle` (`["local"]`) + the 3-gate retire matrix GREEN end-to-end + a COMMITTED real-Metal-Safari at-rest capture.
- **BG.W-GLASS-REFRACT-WEBGL** — build-INDEPENDENT, LANDS in `src/`. The dual-stack refraction shader: `glass-refract.glsl.ts` (Tier-1 WebGL2 floor) + `glassShader.wgsl` Tier-2 (ONE `sampleBG` wrapper @5 sites, anisotropic flow-aligned specular, rim chromatic dispersion 0.02–0.03). *Gate:* the M6 WGSL-shape gate (committed runnable) + the fixture-field π on real WebKit-2287 (rimDelta>0).
- **BG.W-GLASS-BACKDROP-SAMPLE** — the keystone (WS1-gated). Wire the backdrop-sampling FBO two-pass into WS1's ONE shell-aurora context: `createRenderTarget.ts`, the ridge-local plate-alpha valve, the muted→full-ink lift, the two fidelity rungs (chrome 1.0 / content ≤0.6). *Gate:* the live AA-over-bright-ridge ratify (FALLS to opaque plate where dark can't clear 4.5) + exactly ONE GL context per refracting route + 30s sustained-load no-`webglcontextlost`.
- **BG.W-GLASS-SOTA-LADDER** — formalize the Tier-0 CSS → Tier-1 WebGL2 → Tier-2 WGSL degrade; RETIRE the dead `.glass-lens`/`glass-refract.css`/`detectTier`; book the successors (BE.W-LENS-SAFARI, default-Safari WebGPU promote, gyroscope feed). *Gate:* the §3.1 retire matrix GREEN + retired-paths DEFINITION-ABSENT.
- **BG.W-GLASS-LIQUID-TRANSITION** — purely additive. Spring the refraction: displacement/specular magnitude → a SECOND reader of the existing `--glass-btn-press-t` spring `.value` (ZERO new springs); the press-swell returns. *Gate:* the displacement-swell frame-series + the GL uniform reads `press.value` not `getComputedStyle`.

### WS9 · Paper-deep (5)
- **BG.W-PAPER-GRAIN-REAL** — replace the grey feTurbulence speckle with a warm `feDiffuseLighting` LIT tooth (fine fiber band, sRGB/hex warm ecru, azimuth gate-locked to `--glass-key-direction`). *Gate:* `proof:paper-grain` (born-RED on the speckle; warm-hue floor ≥0.020; azimuth==token) + the warm-directional-relief JND π.
- **BG.W-PAPER-SUFFUSE** — ONE warm-lit source across ~12 surfaces; DELETE `--paper-clean-texture` (re-point the verified consumer map); KEEP `--paper-aged-texture` (atlas contract); grain-on-headline `@supports`. *Gate:* `proof:paper-grain` suffuse arm + `proof:suffuse` extend.
- **BG.W-HANDMARK-PERFECT** — perfect the HandMark: aspect-correct viewBox, hull se-guard, amplitude knob, draw-easing token; mint `proof:handmark-audit`. *Gate:* `proof:handmark` (+hull-guard) + `proof:handmark-audit` (NEW) + the px-aspect≈vb-aspect + spacing-CV≥0.30 π.
- **BG.W-PENCIL-BOIL-DEEPEN** — graphite-in-tooth + pencil pressure profile + boil LIVE (offscreen-park). *Gate:* `proof:handmark` boil-park arm + the pencil-graphite-on-tooth π.
- **BG.W-PAPER-CROSSREPO-ASKS** — land the GU-1 key spine + the azimuth-coupling lock; the 3 by-name contracts (pencil-boil / latex-paper / sci-report); drop the dead perfect-freehand peer. *Gate:* `proof:crossrepo-asks-paper` (NEW; foreign-tree fence by construction). *(The `--glass-key-direction` token lands FIRST — GRAIN-REAL's azimuth derives from it.)*

### WS10 · De-shadcn / idiomatic Tailwind v4 (5)
> **W0 precondition:** WS4's `BG.W-DESHADCN-SWEEP` registers `proof:de-shadcn` born-GREEN + clears the 9 form violations. WS10 sequences strictly AFTER W0.
- **BG.W-DESHADCN-CENSUS** — the complete census (EXTEND `proof:no-shadcn-default`): raw-tw-palette + opacity-NN-utility arms; DRY `shadcn-vocab.mjs`. *Gate:* the full 233-file sweep records ZERO false positives + reds every residual.
- **BG.W-DESHADCN-TOKEN-REPLACE** — the replacement sweep + dead-token deletes + the `--focus-ring-color` fix (ToastClose→destructive, ai-amber→`--accent-ai`, the opacity-NN sites). Clean break, no alias. *Gate:* the full affected-gate suite GREEN + π#1 (toggle dark fill) + π#3 (focus ring ≥3:1, REAL Safari).
- **BG.W-TAILWIND4-IDIOM** — mint `--text-control` `@theme` bridges + `@utility glass-blur-*`; idiomatic `@theme`/`@utility` (no `theme()` fn-syntax). *Gate:* `proof:tailwind-v4-idiom` clause-(d) completeness.
- **BG.W-DESHADCN-MATERIAL** — the grouped-inset Select elevation-INVERSION (3 separated correctly-elevated cards) + Switch material (STATIC `color-mix(in oklab)`, NOT a 5th backdrop-filter). *Gate:* the binding REAL-Safari WebKit-dark capture (card ΔL≥0.06) + `deshadcn-select-grouped.spec.ts`.
- **BG.W-DESHADCN-GATE** — the lock + paint + canon: lock `proof:no-shadcn-default`; wire the `webkit-deshadcn` Playwright project; run the 4 born-RED π (six-state matrix, both modes, Chrome AND real Safari); fold the de-shadcn CANON.

### WS11 · Storybook facility (4)
- **BG.W-SCROLL-PROGRESS-GLASSY** — the thick glassy integrated scroll-progress rail: `scroll(nearest block)` clip-revealed `@property --scroll-fill` + `--scroll-rail-blur` thicker frost + flat cap + SpringProgress glint + positional JS fallback. *Gate:* `railHealth()` (the `grew` killer tooth) GREEN chromium AND webkit + the VISUAL frost capture on real WebKit 26 (PT-A).
- **BG.W-SECTION-TYPEWRITER-FADEUP** — the typewriter + fade-up section-entrance (gl-char-rise heading + body cel `view()`-cascade); the `stagger` prop + `--char-stagger-step`; the demo-private `useSectionReveal` + the F5 mount re-sweep. *Gate:* `getAnimations()`-per-node congruence + the F5 adverse-order restoration strand-proof + FOUC-clean.
- **BG.W-STORY-PAGE-API** — the capstone page-API: `StoryPageShell` + `StoryPage`(stack)/`CategoryPage`(bento) + the single-root `StoryHeroBackdrop`; the AST-over-regex single-root oracle; the 15-gate SHARED-lib blast-radius. *Gate:* the built oracle GREEN over the migrated tree + the full battery ZERO unflagged red before deletes.
- **BG.W-STORYBOOK-SUFFUSE** — the mode-aware chrome-chroma lift (CHROME only) + the `--field-h` thread + the bg-gestalt-roster. *Gate:* per-category preview-card hue VARIANCE (not uniform amber 62) + `proof:suffuse` d1–d3 GREEN.

### WS12 · Coherence · Congruence — the capstone (6)
- **BG.W-COHERENCE-CENSUS** — author `WS12-CENSUS.md` (the audit-of-record): A1 technicolor gamut ceiling, A3b tier ladder (dock EXCLUDED), A6 glass-key spine read, A7 concentricity allowlist, the DRY fork-collapse map, the RATCHET ∅-drain close precondition. *Gate:* every arm re-validated against HEAD (no prose-only claim).
- **BG.W-COHERENCE-GATE** — PERSIST in dependency order: `hue-at-l.mjs` → `spring-table.mjs` → `proof-hue-at-l.mjs` + `proof-coherence-census.mjs` → the A9 ARM into `proof-motion-one-clock.mjs` (the ONE-clock lock, SUPERSEDES the inline `pairRe`). *Gate:* born-RED→GREEN→reverted via stash-toggle to 4.2.0; A9 BOTH source-form legs bite.
- **BG.W-DESIGN-LANGUAGE-UNIFY** — the A5 calm-light token-indirection seam (`--glass-capsule-blur`, no `!important`); measure the busy-aurora capsule `proof:nested-backdrop-budget` 2→1 win (NULL → DROPPED by KISS). *Gate:* the busy-aurora forward criterion + child-glyph un-tinted + standalone Button byte-untouched.
- **BG.W-ANIMATION-CONGRUENCE** — the A9 ONE-clock LOCK + the doc-rot fix; the `:pressable` story (a11y-fixed) is the Card-press π prerequisite. *Gate:* `press-unify.spec.ts` no longer skips; Card-press + deck-slide π RUN on a real GPU (FEEL read deferred).
- **BG.W-GLASS-PAPER-CONGRUENCE** — owns the WS8(bevel)+WS9(GU-1 tooth) `--glass-key-*` SPINE that A6 reads; the Regular/Clear tier map (dock-excluded). *Gate:* when the spine lands, A6 promotes born-RED + `ci`.
- **BG.W-PAGE-COMPONENT-AUDIT** — the §5 harmonized-whole instrument + the lens-exemption print; **the 480-capture dual-engine both-modes verdict post-integration**. *Gate:* the harmonized capture rides WS1→WS4→WS3/WS8→WS9 landing + the real-Safari.app/Chrome.app on-device device-paint.

---

## 3 · The defect → wave map (D1–D14)

| # | Confirmed live defect | Closing wave(s) | Paint-gated? |
|---|------------------------|------------------|:---:|
| **D1** | Routing freeze (URL changes, page doesn't) | WS1 `BG.W-ROUTE-TRANSITION` + WS7 `BG.W-GATE-ROUTING-LIVE` | ✅ |
| **D2** | Metallic background everywhere → wants AURORA per page | WS1 `BG.W-FIELD-AURORA` + WS7 `BG.W-GATE-FIELD-AURORA` | ✅ |
| **D3** | Red/maroon cast halo · corners don't clip · dock aliasing | WS3 `BG.W-CARTOON-INK-GAMUT` + `BG.W-DOCK-CAST-RETIRE` + `BG.W-GLASS-CLIP-DISCIPLINE` | ✅ |
| **D4** | Titles no longer scroll-and-shrink | WS4 `BG.W-SCROLL-SHRINK-UNIFY` | ✅ |
| **D5** | Full-width horizontal line / aberrant top bar | WS1 `BG.W-SCROLL-PROGRESS-RAIL` + WS7 `BG.W-PAINT-IS-THE-GATE` (topDelta) | ✅ |
| **D6** | /substrates previews broken | WS5 `BG.W-VIZ-PREVIEW-LIVE` + `-INTRINSIC-SIZE` + `-SIZER-ADOPT-HARD` + WS7 `BG.W-GATE-PREVIEWS-RENDER` | ✅ |
| **D7** | Configurator drawer broken | WS4 `BG.W-SHEET-INSET-ROOT` | ✅ |
| **D8** | Persistent ℱ brand section useless → REMOVE | WS2 `BG.W-DOCK-PERSISTENT-CUT` | — |
| **D9** | Page transitions broken (= D1) | WS1 `BG.W-ROUTE-TRANSITION` | ✅ |
| **D10** | /compositions/hero broken, headers WAY too large | WS1 `BG.W-HERO-FIT` | ✅ |
| **D11** | Category cards waste space → wants LIVE real-component previews | WS4 `BG.W-SPECIMEN-PER-STORY` + `BG.W-BENTO-FRONTDOOR-UNFORK` | ✅ |
| **D12** | Dock scrolling broken | WS2 `BG.W-DOCK-CAP-SCROLLS` + `BG.W-DOCK-OVERFLOW-FADE` | ✅ |
| **D13** | V↔H morph is a modal (esc broken) → wants an in-dock BUTTON | WS2 `BG.W-DOCK-INPLACE-MORPH` | ✅ |
| **D14** | /foundations/colors scroll cascade gone (`%`+`<time>` calc) | WS4 `BG.W-SCROLL-SHRINK-UNIFY` (`%`-off-`--col`) + WS7 cascade-animates gate | ✅ |

**13 of 14 defects are paint-gated** — they close ONLY against a fresh dual-engine capture, never a
source-green assert. D8 is the lone structural-only close (a slot deletion). The two close oracles are
`proof:ba-gestalt` (the per-surface gestalt verdict) + the `--run pi` visual-runner over the
webkit-enrolled spec set.

---

## 4 · The deep-morphism apotheosis (WS8–WS11)

The user's second-wave directive (2026-06-26): a DEEPER glass + paper interrogation via the same loop.
Four workstreams, each carrying a headline mechanism and a dual-engine (Chrome AND Safari) binding bar.

**WS8 — Glass apotheosis (the headline, 72%).** A Safari-SOTA tier ladder: **Tier-0 CSS** (the iOS-27
bevel material floor — `BG.W-GLASS-SUFFUSE-UNIVERSAL`, field-independent, lands now) → **Tier-1 WebGL2**
(`glass-refract.glsl.ts`, the universal Safari floor) → **Tier-2 WGSL** (`glassShader.wgsl`, Safari 26+/
AS-Tahoe). The headline is a **real backdrop-sampling refraction** (`BG.W-GLASS-BACKDROP-SAMPLE`): a
two-pass FBO that samples the painted backdrop behind a glass surface and DISPLACES it with anisotropic
flow-aligned structured light + a rim chromatic-dispersion fringe — the thing `backdrop-filter` cannot
do — wired into WS1's ONE shell-aurora context (no second GL allocation). The aesthetic target is the
`liquid-metal-...01.jpg` METAL-FLOW reference (long ridges, bright-ridge/dark-valley anisotropy, ZERO
chroma injection, rim-magnification). **Binding bar:** a COMMITTED real-Metal-Safari.app capture by a
non-authoring agent (the M5 Max, the C18 `?capture=glass-suffuse` harness) reads as liquid refractive
glass, NOT flat blur, on Chrome AND Safari; content AA-legible over the worst-case BRIGHT ridge in BOTH
modes (FALLS to the opaque plate where dark can't clear 4.5 — the LIVE open risk). C-SAFARI is the ★★★
3-wave chronic; its capture is the single likeliest item to miss a 4th time and is scheduled non-skippable.

**WS9 — Paper apotheosis (64%).** Replace the grey feTurbulence speckle (which reads metallic) with a
warm-lit `feDiffuseLighting` paper TOOTH (`BG.W-PAPER-GRAIN-REAL`) — directional relief leaning the key
hemisphere, fine fiber band, sRGB/hex warm ecru. Perfect the HandMark hand-voice (`BG.W-HANDMARK-PERFECT`:
aspect-correct viewBox + hull guard + amplitude knob, against the sci-report J/K intent) + deepen the
pencil-boil graphite-in-tooth + live boil (`BG.W-PENCIL-BOIL-DEEPEN`). One warm paper register suffused
across ~12 surfaces (`BG.W-PAPER-SUFFUSE`). **Folds GU-1** (`BG.W-PAPER-CROSSREPO-ASKS`: the
`--glass-key-direction` under-shadow key-light lean — value-only, lands FIRST because the grain azimuth
derives from it) + the 3 by-name cross-repo contracts (pencil-boil / latex-paper / sci-report),
foreign-tree fence by construction. **Binding bar:** the lit tooth reads as real paper (not metallic
speckle) on Chrome AND Safari both modes, calibrated vs a real render; the ultimate falsifier is the
user's eye (the mechanism BG re-opens was just user-rejected — the raster-asset fallback is the escape).

**WS10 — De-shadcn / idiomatic Tailwind v4 (90%).** COMPLETELY abrogate default shadcn/reka/tailwind
styling (function not form) while KEEPING the reka/shadcn behavior+a11y substrate: census every leaking
default (`BG.W-DESHADCN-CENSUS`), replace with the token-first register (`BG.W-DESHADCN-TOKEN-REPLACE`,
`BG.W-TAILWIND4-IDIOM`), the grouped-inset Select elevation-inversion + Switch material
(`BG.W-DESHADCN-MATERIAL`), lock + canon (`BG.W-DESHADCN-GATE`). **Binding bar:** zero default
shadcn/tailwind style survives (gate-asserted by `proof:de-shadcn`/`proof:no-shadcn-default`); the
LOAD-BEARING residual is the R2 grouped-Select WebKit-DARK separation on REAL Safari (escalates to the
deferred mono-caption header if it fails).

**WS11 — Storybook facility (design-converged).** The thick glassy integrated scroll-progress rail
(`BG.W-SCROLL-PROGRESS-GLASSY`, consuming WS8's glass + the D5-fixed scroll-timeline), the typewriter +
fade-up section entrance (`BG.W-SECTION-TYPEWRITER-FADEUP`, composing the shipped `useTypewriter`/
`SplitChars`/keyframes.js), and the STANDARDIZED page-API family (`BG.W-STORY-PAGE-API`:
`StoryPage`/`CategoryPage` + the AST single-root oracle, superseding the ad-hoc StoryHero/StorySection).
**Binding bar:** `railHealth()` GREEN + the VISUAL frost on real WebKit 26; the entrance reads liquid-
weighted both modes; ONE page-API every demo page composes; HARD-gated on the WS1+WS4 integration branch
(which does not exist at HEAD — the structural reason it caps).

---

## 5 · The WS12 coherence / congruence capstone

WS1–WS11 each converged a DOMAIN in isolation; **WS12 audits the WHOLE surface for CONGRUENCE** — that
every wave coheres into ONE iOS-27 warm/weighty/liquid system, with no per-component / per-page drift.
Three axes, every component AND page audited against each: (1) **design-language coherence** (one glass
register per role — chrome=glass, content=paper; one paper tooth + handmark voice; no stray blur radius /
off-identity hue); (2) **animation congruence** (the motion-canon P1 spring-iff-spatial; the 12 laws
universal; ONE spring family; enter-bouncy/exit-no-overshoot; PRM-carved); (3) **congruence** (the √φ
type ladder, the section/viz ramp, the φ padding ladder, the eyebrow/icon/one-color-event registers,
applied congruently).

The capstone PERSISTS its gates in dependency order: **`proof:hue-at-l`** (color-at-lightness drift) →
`spring-table.mjs` → **`proof:coherence-census`** (A1–A7) → **the A9 ONE-CLOCK lock** folded into
`proof:motion-one-clock` (a planted stale `[0.99,0.99]` literal AND a stale `?? 0.99` default BOTH bite,
SUPERSEDING the inline `pairRe`) → the `gatesFor()` rows. The **glass-key spine** (`BG.W-GLASS-PAPER-CONGRUENCE`,
owning the WS8-bevel + WS9-GU-1-tooth `--glass-key-*` source A6 reads) promotes A6 born-RED + `ci` when
the spine lands. The binding verdict is the **480-capture dual-engine both-modes** sweep over every page
+ component — STRUCTURALLY post-integration (it rides WS1–WS11 landing + the real-Safari.app/Chrome.app
on-device device-paint; lens-bearing surfaces exempt from the headless claim).

---

## 6 · The deferred-fold ledger (no silent drop)

**What BG FOLDS (the no-silent-drop machine is WS7 Band-0, built FIRST):**
- The **136-item DERIVED deferred corpus** (`BG.W-DEFERRED-LEDGER`) — every chronic/deferred item DECIDED
  (build/retire/meet, never re-book) with REAL row-specific evidence routed to a charter-matched wave.
- The **70-wave BE+BF set** (`BG.W-BE-BF-LEDGER`) — parity LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE.
- The **31 BC→BG dispositions** (`BG.W-DISPOSITION-RESTAMP`) — re-evaluated in place (the 2 pending flips
  resolved; the BC-phantom `styles-critical-split`→BB catch).
- **GU-1** (the under-shadow key-light lean) — folded into WS9 `BG.W-PAPER-CROSSREPO-ASKS`: the
  `--glass-key-direction` token + the 3 under-shadow tier leans + the overflow.css re-point land in the
  BG build (value-only/additive); GRAIN-REAL's azimuth derives from the token.
- The **dot-flow rebuild** (was DEFERRED `W-DOTFLOW-REBUILD` ~35%) → WS5 `BG.W-DOTFLOW-REBUILD` (built).
- The **dead-engine DECIDE** (`useLiquidMorph`/`useMorphField`/`useDockContextSilhouette`/`useHaptic`) →
  WS4 `BG.W-DEAD-COMPOSABLE-CUT` + WS7 `BG.W-SPIKE-DELETE`/`BG.W-JUBILANCE-DECIDE` (wire-≥2-or-retire,
  never blind-delete; `useCelebrationBurst` KEPT at 2 consumers).

**What BG DEFERS ONWARD (explicit + honest):**
- **GU-1 publish cadence** → the Δ-group `glass-key-fill` cuts on the **4.4.0-line AFTER 4.3.0 publishes**
  (does NOT re-open the parked `release/4.3.0` Δ1+Δ2). The GU-1 **DEFERRED holdout tier** (the `--shadow-sm…2xl`
  paper family + the SortableList:122 drag-lift) stays the chartered follow-on. **GU-2** (`defineExpose({pixels})`
  on VizTextOverlay) is ATLAS-side — foreign-tree, not ours.
- **The 4.3.0 parked Δ-set** — `release/4.3.0` (K-I-ROOT-AUTHOR Δ1+Δ2) stays parked pending an explicit
  "publish 4.3.0"; BG cuts onto the 4.2.0-line.
- **WS5 booked successors** — `BG.W-VIZ-SUBSTRATE-DELETE2` (goo-blob/dot-matrix/goo-dot WGPU delete, gated
  on per-viz arm-probe), `createFragmentGLPass` (≥3-consumer trigger), `metallic-aurora` (the IRONY —
  metallic wanted IN the aurora as an opt-in viz register, `BD.W-AUR-METAL-FINISH`), the **goo-blob→blob
  rename** (RETIRED — a breaking every-consumer-import change for zero functional gain; re-book only on user reaffirm).
- **WS8 booked successors** — `BE.W-LENS-SAFARI` (the `filter:url()`-on-the-element-over-cloned-DOM lens for
  non-field routes; webkit bug 245510 STILL-OPEN-2026), the default-Safari WebGPU promote, the in-shader
  squircle-corner, `flow.wgsl.ts` curl tail, the iOS-27 gyroscope specular feed (mobile).
- **WS9 booked** — the deckle torn-paper param (fenced, skeuomorphic-restraint), anisotropic crayon grain,
  the perfect-freehand consume-and-delete of `freehand.ts`, the raster paper-asset fallback (engaged only
  if the lit tooth diverges cross-engine or still reads metallic).
- **The W-REFLECT3-deferred human FEEL verdicts** — WS12 defers the *human read* (Card-press feel, deck-slide
  read, "one light reads coherent", the harmonized-whole 480-capture verdict) to a post-integration reflection
  pass. (NB: WS1 SCRUBBED the literal "W-REFLECT3" wave-label — there is no W-REFLECT3 wave in BG; it is the
  name for the deferred post-integration human-verdict step, not a build wave.)
- **WS7 DROP-WITH-TRIGGER register** — C-PAINT forgery-beyond-re-stamp (re-enable at capture-signing/OIDC),
  `authoredBy≠runnerIdentity` (re-enable Phase-2 OIDC), Safari PAINT certification (safaridriver-or-DROP),
  Safari ≤18 var()-bake (WS3 literal-bake trigger), Safari backdrop-refraction lens (Safari-IMPOSSIBLE via
  `backdrop-filter:url()`, the booked WS8 re-architecture is the path).

---

## 7 · Historical-coverage close

From `DIRECTIVE-LEDGER.md` (the 1517 raw utterances → **94 distinct canonical directives**):

- **87 directives are BG-carried**; **7 RETIRED with rationale** (R-01..R-07: foreign-tree slides/muster
  features, the MEMORY-standing writing-style edict, one-off ops, and the already-DONE prune-asks).
- **Status histogram @ live 4.2.0:** REGRESSED 19 · UNADDRESSED 8 · PARTIAL 38 · DEFERRED 3 · ADDRESSED 19
  (+ the binding-law/process edicts honored continuously). Every one of the 87 maps to exactly ONE
  workstream — no silent drop (the anti-amnesia bar).
- **Genuinely-open onward** (carried with an explicit reason, not dropped): `blurred-image-bg` (WS1-09,
  no historical carrier — the macro-flower zone-blur field, recorded UNADDRESSED), `metallic-aurora`
  (WS5-04, DEFERRED to the viz-register successor), `dock-drag` wiring (WS2-11, `useDockItemDrag` exists,
  DEFERRED), the `goo-blob→blob` rename (RETIRED). All four are recorded, none silent.

**The user's headline directives are each mapped to waves:**

| Headline directive | Owning wave(s) |
|---|---|
| The defect cascade (D1–D14) | the §3 map (WS1/WS2/WS3/WS4/WS5 + WS7 gates) |
| Siri waveform + glass dock-island | WS6 `BG.W-SIRI-WAVEFORM` · `BG.W-SIRI-ISLAND` · `BG.W-SIRI-DOCK-INTEGRATION` |
| KISS / DRY / no contrivance | WS2 (dock 33→24 files) · WS4 (motion dedup ~4000 LOC) · WS5 (substrate) · WS12 (DRY fork-collapse) |
| Encapsulation / colocation / >500-line splits | WS4 `BG.W-COLOCATION-GATE-STRUCTURAL` + the 7 leaf carves; WS2 `BG.W-DOCK-DECOMPOSE` |
| Deep glass morphism | WS8 (the Safari-SOTA tier ladder + backdrop-sampling FBO) |
| Deep paper morphism | WS9 (the warm-lit tooth + perfected HandMark + pencil-boil) |
| De-shadcn (function not form) | WS4 `BG.W-DESHADCN-SWEEP` + WS10 (the deep 5-wave census/material/gate) |
| Storybook facility (scroll/page anim + standardized API) | WS11 (4 waves) |
| The WS12 coherence pass (every component + page) | WS12 (6 waves, the 480-capture verdict) |
| Real-paint-verify as the GATE (the disease cure) | WS7 `BG.W-PAINT-IS-THE-GATE` + `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` |
| Safari parity (no fallbacks) | WS7 `BG.W-SAFARI-PARITY-GATE` + WS8 C-SAFARI captures + the webkit testMatch enrollment |

---

## 8 · Execution sequencing + the real-paint frontier

**Build order (dependency-aware):**

```
WS1 (routing+field — the precondition for ALL SPA paint-verify)
 └─ WS3 (owns the unified blur/cast/clip register; WS1 field gates the chromatic paint)
     └─ WS2 (consumes WS3's blur peer + WS1's route swap; the dock)
         └─ WS5 (viz; gates the CANVAS-LIFECYCLE carves in WS4)
             └─ WS6 (siri; gated behind WS2's useDockSpring)
                 └─ WS4 (components/demo; HARD-dep WS1 scroll-shrink; after WS5 for the canvas carves)
                     └─ WS7 (the close machine — but Band-0/Band-2 gates are built FIRST, see below)
   ── then the deep-morphism band ──
WS8 (W-SUFFUSE + W-REFRACT-WEBGL land NOW field-independent; W-BACKDROP-SAMPLE gates on WS1's shell aurora)
 └─ WS9 (GU-1 key token FIRST; GRAIN-REAL → SUFFUSE → HANDMARK → PENCIL-BOIL → CROSSREPO-ASKS)
     └─ WS10 (strictly AFTER WS4's BG.W-DESHADCN-SWEEP W0; rebases the --ring/--input renames onto WS3-M5)
         └─ WS11 (HARD-gates on the WS1+WS4 integration branch existing)
             └─ WS12 (LAST — the coherence capstone; the 480-capture verdict rides WS1–WS11 landing)
```

**Cross-WS preconditions the specs name (binding):**
- **WS7's `BG.W-PAINT-IS-THE-GATE` + `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` are built FIRST and BLOCK
  THE TAG** — the structural root the archaeology named (the verification axis and the release axis are
  decoupled; shipped broken 3×). `proof:ship-attestation` `["ci","release"]` is the tag-push bypass-closer.
- **WS1-routing gates ALL SPA-nav paint-verify** — no downstream workstream marks 100% on a hard-load-only π.
- **WS3 owns the blur seam; WS2 is a peer consumer** (no dock-special blur token survives).
- **WS4's `BG.W-DESHADCN-SWEEP` (W0) precedes WS10's ci arms.**
- **WS5 precedes WS4's `CANVAS-LIFECYCLE-LEAVES`/`UNIFORM-LAYOUT-BUILDER` carves** (re-measure POST-WS5).
- **WS8's `W-BACKDROP-SAMPLE` needs WS1 to expose the live `WebGL2RenderingContext` + the
  `[data-glass-field-canvas]` marker** without forking `createCanvasLifecycle` — a named cross-WS gap.
- **WS6's `SIRI-ISLAND` is born-RED until WS2 lands `useDockSpring` AND WS6 composes it.**
- **WS9's `--glass-key-direction` token lands FIRST** (WS8 bevel + WS12 A6 spine both read it).
- **WS3-M3's `contain` clip host + the saturate-revert are WS1-field-gated** (the iridescence is field × saturate).

**The binding close precondition (the real-paint frontier).** The headless-green / visually-broken gap is
the disease the BG method exists to kill. The binding close is the **real-GPU DUAL-ENGINE capture set —
Chrome.app AND Safari.app/WebKit 26, both modes — by a NON-AUTHORING agent on a fresh capture the building
agent did not author**, with the per-region pixel digest embedded in `SHIP-ATTESTATION.json` and re-verified
device-free at CI. The two close oracles: **`proof:ba-gestalt`** (the per-surface gestalt verdict, born-RED
on a real 4.2.0 Metal reproduction) + the **`--run pi` visual-runner** over the webkit-testMatch-enrolled
spec set. **C-SAFARI (WS8's Metal-Safari.app capture via the C18 harness) is the single likeliest item to
miss a 4th time** — it is scheduled as an explicit, non-skippable close precondition; nothing else discharges
the ★★★ 3-wave chronic. **NOTHING is on committed `tranche/BG` disk at HEAD** (`git diff master..HEAD -- src/`
is empty) — the literal frontier the build phase opens against.

---

## 9 · Constraints (carried, binding on the build phase)

- **Foreign-tree fence ABSOLUTE** — edit ONLY glass-ui; the constellation siblings are read IN PLACE,
  read-only. The cross-repo asks (WS9 pencil-boil/latex-paper/sci-report; the GU-1 atlas relay) are
  content-only by-name contracts.
- **NEVER move/place any package within `~/Programming`** (the catastrophic park-not-restored incident);
  **NEVER place packages/items in volatile `/tmp/`**. Prototype worktrees live in-repo at
  `.claude/worktrees/` (the engine's `isolation:'worktree'`), never `/tmp`. Run
  `scripts/verify-siblings-intact.mjs` before/after any close-battery.
- **Batches of 3** throughout (the rate-wall); Opus fanout; the core model orchestrates synthesis/design.
- **NO src landing until the build phase** — this is tranche-DEV; the deliverable is the converged spec. The
  build phase lands each PROVEN slice on `tranche/BG`, re-verifying the served branch every session,
  rebuilding dist, taking the WebKit-proxy + real-Safari captures on every visual wave.
- **4.3.0 stays PARKED** on `release/4.3.0` pending an explicit "publish 4.3.0"; BG cuts onto the 4.2.0-line;
  GU-1 rides the 4.4.0-line after 4.3.0 publishes.
- **The cardinal laws** (binding, re-asserted every round): NO quick solutions / NO workarounds (gestalt
  first-principles, fix at the ROOT); NO legacy code (clean breaks, no aliases/shims/dual-paths); KISS +
  DRY + DEFT integration; presets-in-consumers; warm/weighty/liquid iOS-27 identity (Chrome AND Safari).

---

## 10 · RE-SPEC RECONCILIATION (2026-06-30) — the develop-ready plan re-grounded on built state

This section APPENDS the re-spec outcome to the binding lock document — it does NOT supersede §1–9 (the
master roster, defect map, and sequencing all KEEP). The re-spec re-checked the AS-BUILT state on disk
(EXEC underway on `tranche/BG`, HEAD `6369ad6e`, pkg 4.2.0 → cut 5.0.0) rather than on report faith, and
DEVELOPED the close-machine gaps the running build surfaced into executable waves. The authoritative
source is `audit/RESPEC/AMENDED-WAVE-PLAN.md` (the executable plan); the living master is
`audit/RESPEC/RESPEC.md`. **Blended convergence 72% → 86% · readyToDevelop TRUE → EXECUTE THE AMENDED PLAN.**

### 10.1 · The verdict (the re-grounded conclusion)

- **~93% of built work is VERIFIED. ZERO restart candidates. The DAG + build order are KEEP** —
  `WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7 → WS8 → WS9 → WS10 → WS11 → WS12 → BH` (the §8 order
  unchanged, BH restructure tail appended, `BG.W-CUT` fires LAST). The cursor is honest at the row level;
  no wave clobbered an earlier deliverable; no gate was weakened to pass; 8 audit lenses concur.
- **The user's low confidence was the close machine, NOT the design** — the three doubt-targets are
  (1) the close battery (`--run full` never run siblings-absent at a real close), (2) the `proof:ba-gestalt`
  keystone (the cursor↔roster joinery never built), and (3) the field-aurora AA proof (device-free-green
  while live 1.04:1). All three are close-VERIFICATION gaps, not bad primitives. The honest verdict from
  §1 holds: 4.2.0 is **assembly- and verification-bound, not primitive-bound.**
- **The tag CANNOT fire as wired today** — `proof:ba-gestalt` is 0/10, four `[ci,release]` close-reds are
  live (R1–R4), and the §4 roster reconciliation has never run. The 7 gap waves below are exactly what
  unblocks the tag; nothing else does.

### 10.2 · The 4 close reds + the 7 gap waves that unblock the tag

**The 4 confirmed `--run full` close reds (R1–R4) — the SAME disease, NEW artifacts vs the cured 12**
(the SYNTH fix-wave `ea4682c0` cured 12 stale reds; WS3/WS4 re-seeded 4 of the same class):

| # | Gate | Evidence (re-verified on disk) | Root |
|---|------|--------------------------------|------|
| R1 | `proof:no-god-module` | `ladder.css`=**527L**, `shell.css`=**510L** (both >500; neither in the live **16**-entry RATCHET — `RATCHET==∅` is doctrine, not a live gate) | 6ec81de + cd9ce46 |
| R2 | `proof:no-dead-token` | `--glass-blur-dock` = **ZERO readers** (tip of a 2-level dead pair + an N+2 dead chain kept alive only by the `--blur-` exemption) | cd9ce46 |
| R3 | `proof:gen-ci-fresh` | `glass-idiom-factor` ci-tagged but `ci.yml` un-regenerated (drift) | 6ec81de |
| R4 | `proof:tag-parity` | `category-card-warm` registered `["local"]` — a static src-scan gate not promoted to `ci` | 9e13965d |

**The 7 close-machine gap fixes (each a concrete wave + locking gate + planning convergence).** Detail in
`AMENDED-WAVE-PLAN.md §2`; the open design questions are DECIDED (the develop pass's value-add):

| # | Gap | Conv | Wave(s) + locking gate (DECIDED) |
|---|-----|:----:|----------------------------------|
| **G4** | 9-SITE atomic close-fix — clears R1–R4 | **90** | `BG.W-CLOSEFIX-9SITE` (amendment 1, **lands FIRST**). FULL RETIREMENT of `--glass-blur-dock`; 2 carves (`ladder.css` 527→470 grain-tail → `glass/grain-overlay.css`, `shell.css` 510→459 persistent-tail → `dock/shell-regions.css`); **9 sites not 6** (+ `proof:dock-shrink-blur` S3 re-point + `proof:theme-style` + the `InstrumentChassis.spine-variant` unit test + `glass-cal.spec` EXPECT_RADII). The G4 spike ran `--run full` siblings-absent GREEN in a fresh `/tmp` worktree; dist `glass-ui.css` BYTE-IDENTICAL (the dead token was already tree-shaken). |
| **G3** | standing closeDisease sweep | **83** | `BG.W-CLOSE-SWEEP` (WS7) · `proof:close-sweep` born-RED `["local"]` (the THIRD born-RED gate beside ba-gestalt/ship-attestation). DECIDED: commit-hook **tranche-env-gated** (`GLASS_UI_ACTIVE_TRANCHE`, NOT hot-file-fires); **canon home PARENT-TRACKED, OUT of the `docs/precepts` submodule** (a fresh `/tmp` worktree does not recurse submodules → C3 would red); C5 hardens to PATH-MATCH; HARD P-CLOSE→P-SWEEP edge (land AT-OR-AFTER R1–R4 clear). Self-test 9/9. |
| **G2** | ba-gestalt cursor↔roster — **the keystone** | **80** | `BG.W-GESTALT-CURSOR-PARITY` (WS7) + amend STAGE-0 roster. `surfaceClosure(s) = collectPaintClosure(SHELL_SEED ∪ routeSeeds(s)) ∩ wave.Files` (SHELL_SEED-inclusive). HONEST re-price: 22/105 waves map all-10, 82 map NONE → **PARITY-C is the load-bearing net, PARITY-B DELETED** (unsat mid-tranche + redundant w/ G5 pixel-band/G7 freshness), PARITY-A weak-kept (the BB-lie catcher). SHELL_SEED += `demo/main.ts`; the SiriIsland orphan-decision (enroll a roster surface + a scoped accept-residual allowlist); `bg-paint.wf.js:22` fence-widen → `reflect/`; canonical-capture = first `/cat/story` token; Safari → separate `proof:safari-parity`; mobile rides the `coarse-touch` pi-runner. |
| **G6** | field-composited-AA gate | **78** | `BG.W-GATE-FIELD-AURORA` (WS7) + **`BG.W-EYEBROW-LIGHT-POLISH` (WS3, NEW — the phantom-coupling-now-real wave)**. Consumer #2 = `compositions/gate-pattern` (the unsound self-staging `/display/card` is ABSENT from the roster); **value.js floor `^1.1.1`** (not `^1.2.0`); F2 dark-AA demoted to a transcription-fidelity FLOOR bound to the dual-engine C18; verbatim recorded `pixel-analysis.json` fixtures. The light-arm `.section-label` is genuinely 4.15:1 over the recessive field → the eyebrow lift is a REAL WS3 wave (no threshold-dodge re-class). |
| **G1** | C-SAFARI in-situ refraction — **the dominant cut-risk ★★★** | **70** | WS8 `BG.W-GLASS-REFRACT-WEBGL` (`proof:glass-refract-fence` on the **`uChromatic`** operator, NOT the spike's invented `uDispersion`; `["local"]` → `ci` at calibration) + **`BG.W-GLASS-BACKDROP-SAMPLE` (WS8 keystone)** + WS7 `BG.W-SAFARI-PARITY-GATE`. DECIDED: the `uChromatic` operator + calibration algebra (ratio 0.02–0.03 → `uChromatic` 0.20–0.30 @ uRef=1); C12 dark-AA-over-bright-ridge folds IN as gate clause F2 (the likeliest 4th-time miss now IN the gate); **the named renderability fallback ladder `full → drapery-dropped → flat-blur`** (each gated, CSS-SVG `feDisplacementMap` dead on Safari so flat-blur is the recorded last resort); the CPU field-buffer raster spec; the 5 GL refraction sites enumerated. |
| **G5** | CLAUDE.md-delete safety | **78** | BH `B5c` (canon homes + reader re-point) → `B4f` (the `rm`, **absolute-last act**) · `proof:claude-deletable` born-RED→GREEN-at-delete. Census CORRECTED to **16 readers, not 12** (the G5 spike's grep missed 4 reading via a `read("CLAUDE.md")`/`strip(read(…))` helper: `proof:close-battery-parity`, `proof:doc-override-idiom` BYTE-PARITY, `proof:on-glass-fg`, `proof:readme-meta-clean`). C2 **DE-BLINDED** (flag ANY call receiving the CLAUDE.md literal, keep the `expandable-part:66` dead-constant exclusion); canon home OUT of the submodule (shared discipline with G3); legacy-accumulation widened BG/BH-only → ALL 76 contract-DEFINING anchors. |
| **G7** | viz-subpath cross-ownership seam | **80** | Lock-1 = `proof:crossrepo-asks` **`W5`-viz-disposition** (NOT W4 — the `W4-content-only-fence` inv-26 clause ALREADY exists on disk; a verbatim W4 would smother it) + Lock-2 = the **live-and-GREEN `proof:subpath-classify`** (`gates.mjs:377`, C1 EXACT_REPRODUCTION). A confirm-step, not a build: WS5 drops/renames ZERO consumed viz keys (DEMIGRATE is an internal WGSL→`useCanvas2D` swap; SUBSTRATE-DELETE keeps the GLSL fallback + dir + `index.ts`), so it owns a VISUAL re-baseline (slides `/fourier-field`×4 + `/constellation`×2; atlas `/constellation`×1 + `/dot-flow-field`×1), no by-name ask owed. |

### 10.3 · The corrections (binding — apply everywhere they appear)

The develop pass corrected six errors carried in the spec drafts; these are AUTHORITATIVE over any
earlier figure in §1–9 or the RESPEC drafts:

1. **value.js peer floor `^1.1.1`, NOT `^1.2.0`** — `wcagContrastRatio` first shipped in 1.1.1 = npm-latest;
   `^1.2.0` would EXCLUDE latest and RED `proof:peer-conformance`'s "admits latest" clause + require
   value.js to publish 1.2.0 first. `^1.1.1` admits latest AND keyframes' `^1.2.0 ⊆ ^1.1.1`. (Reconcile the
   5 stale `^1.2.0` strings in the G6 spike: gate:23,25,50,58 + leaf:346,348.)
2. **G4 is 9 sites, not 6** — the FULL RETIREMENT reds 3 more FROZEN-STRING identity readers the spec never
   enumerated (the dock-shrink-blur S3 re-point + theme-style probe + the InstrumentChassis unit test +
   the glass-cal.spec EXPECT_RADII), beyond the R1–R4 + glass-cal B3 + glass-depth D3 cascade.
3. **G3 canon-home is PARENT-TRACKED, NOT in the `docs/precepts` submodule** — a fresh `git worktree add /tmp`
   does not recurse submodules, so a submodule-homed canon is ABSENT at the exact siblings-absent close the
   gate locks. Home it in `docs/tranches/BG/canon/` (one home discipline, shared with G5).
4. **G2 PARITY-B is DELETED** — UNSAT mid-tranche AND redundant (proof:ba-gestalt's G5 pixel-band + G7
   freshness already auto-revert a faked roster PASS). The §3.3 "flips GREEN surface-by-surface per band"
   claim is RETRACTED — surfaces flip at the WS12 late sweep (Model-B).
5. **G5 CLAUDE-delete census is 16 readers, not 12** — see §10.2 G5 (the 4 missed `read(…)`-helper readers).
6. **G7 clause is `W5`, not `W4`** — `proof:crossrepo-asks` ALREADY owns a `W4-content-only-fence` (the
   inv-26 foreign-tree fence, confirmed on disk); the viz-subpath disposition lands as `W5`.

### 10.4 · The 3 live-interaction fixes — LANDED (D-1/D-2/D-3, dual-engine verified)

The `DEFECT-LEDGER.md` LIVE-INTERACTION defects (cursor/hover/scroll — uncatchable by device-free gates or
static captures) were root-caused live and FIXED on `tranche/BG` before the develop pass:

| # | Defect | Fix wave | Commit | Root cause + measure |
|---|--------|----------|--------|----------------------|
| **D-1** | Constellation — ALL dots track the cursor | `BG.W-CONSTELLATION-PARALLAX-OFF` | `07c6e6ec` | `DEFAULT_PARALLAX 0.08 → 0` (default-OFF / opt-in depth, clean break, ONE constant the 3 read-sites resolve to); `parallaxNodePos` early-returns unshifted. Chrome CDP center→corner slide **58.1px → 5.7px**; WebKit JS-level verified. |
| **D-2** | Paper grain — gray/metallic wash on story pages | `BG.W-PAPER-GRAIN-WARM-SUBSTRATE` | `e40e5095` | The saturate=0 gray grain tooth (warmth-from-substrate by library fence) lost its warm substrate when `PAPER-GRAIN-OPTIN`+`FIELD-AURORA` retired the universal `<PaperBackdrop>`. Demo-local fix (library utility BYTE-UNTOUCHED): paper-glass tiles **C 0.009–0.015 → C 0.02–0.045 warm (H67–78°)**; paper-texture full-page wash → per-panel grain; StoryHero light wash restored. |
| **D-3** | Dock — collapse morph flicker (440px balloon) | `BG.W-DOCK-COLLAPSE-DIR` (Phase-LX) | `8947288a` | The `--dock-live` convex-blend SIZE scalar read the raw progress `--dock-morph-t` (always 0→1) instead of the DIRECTIONAL `--dock-expand-t`, ballooning the box UP on collapse then snapping. Aligned SIZE with the chrome's already-directional scalar; E4 gate tightened to pin the clamp. Chrome CDP collapse **496→59 monotonic, ZERO reversal**; Playwright WebKit + real WKWebView corroborate. |

(The two recorded-not-fixed residuals stand: the first-collapse-only 15px end-snap on a start-EXPANDED dock,
and the WS2 dock-convergence rows 4.x — both out-of-scope of the discrete-regression repairs.)

### 10.5 · The 6 build-phase deferrals (de-risked + the exact proving wave)

Each proof below needs the REAL build (or a real GPU/Metal/Safari.app); each is de-risked at audit (approach
proven device-free or by code) and counts as converged-for-planning — none is a feasibility unknown or a
design restart. Full table in `AMENDED-WAVE-PLAN.md §3`.

| # | Deferral | De-risked because | Proven by (the exact wave) |
|---|----------|-------------------|----------------------------|
| 1 | **C-SAFARI Metal capture ★★★** (the 3-tranche chronic — the FULL refraction shader rendering + AA-over-composite + dock-blur sign-off on real macOS Safari/WebKit 26 + Metal; subsumes G1's pinned `uChromatic+ε`, the WebKit compile-time, the per-pixel Metal drift) | the GPU floor is REAL (FBO renders FRAMEBUFFER_COMPLETE on M5 Metal); the named fallback ladder bounds the worst case; the C18 `?capture=` harness ships in `demo/main.ts` | **`BG.W-GLASS-BACKDROP-SAMPLE`** (C17 calibration) + **`BG.W-SAFARI-PARITY-GATE`** + **`BG.W-CUT` `--run ship`** (the non-authoring dual-engine net) |
| 2 | The field-AA live re-shoot — F-AA-LIVE dual-engine `_anchor` at `ebf6e45b` (the verified pre-fix BROKEN state, Chrome 1.04 / Safari 1.91) + the light-eyebrow ≥4.5 lift | the device-free gate ran GREEN 3/3; the anchor is merge-base-verified | **`BG.W-GATE-FIELD-AURORA`** + **`BG.W-EYEBROW-LIGHT-POLISH`** + **W-REFLECT3** |
| 3 | The grain-tail paint π (`liquid-hover.spec.ts` — the moved `.glass-*::after` pop-kill) + the ba-gestalt dock/CTA verdict | the grain rules are byte-preserved in compiled dist — a confirmation ceremony, not a feasibility risk | **W-REFLECT3** (rides the WS12/close gestalt sweep) |
| 4 | The WS12 late capture sweep — all 10 roster surfaces over fresh paint (Model-B) | a cost (re-capture), not an unknown; the joinery proof is device-free | **WS12 `BG.W-PAGE-COMPONENT-AUDIT`** + the close |
| 5 | The CLAUDE-delete `--run full` `/tmp` siblings-absent dry-run (after all 15 homes authored + all 16 readers re-pointed) + the actual `rm CLAUDE.md` | mechanism sound; the corrected 16-site census + de-blinded C2 are specified; the dry-run is the backstop that surfaces any missed reader | **BH-B5c → B4f** (`proof:claude-deletable` born-RED→GREEN; the rm is the absolute-last act) |
| 6 | The post-WS12 export re-pin (`verify-export-types`/`proof:subpath-enumeration`) + the human `siri-waveform` PUBLISH-vs-INTERNAL confirm | regen proven (live C1 EXACT_REPRODUCTION=true); pre-derived INTERNAL grounded (no subpath file — a WebGL2 leaf composed by SiriIsland) | **BH-B2.1-swap** (gated STRICTLY AFTER WS5 ∧ WS6 ∧ WS12, STRICTLY BEFORE BG.W-CUT) |

### 10.6 · Convergence accounting + the develop-ready conclusion

| Axis | Pass-1 | This develop pass | Driver |
|------|:------:|:-----------------:|--------|
| WHAT-is-built triage | ~93% | **~93%** | Unchanged; ZERO restart, DAG+build-order KEEP, D-1/D-2/D-3 fixed |
| The 7 gaps (develop-to-executable) | ~60% | **~83%** | G4 90 · G3 83 · G2 80 · G7 80 · G5 78 · G6 78 · G1 70 (mean ~80; weighted up for the now-DECIDED design + the de-risked deferrals) |
| **Blended** | **72%** | **86%** | +14 — every gap has a named wave + locking gate + a de-risked build-phase approach; the open design decisions are RESOLVED; the residual is build-phase proof (de-risked) + execution-verify |

**The honest residuals (build-phase, de-risked, owned):** (1) **C-SAFARI ★★★** — the dominant cut-risk;
the GPU floor is REAL but the FULL-shader renderability + AA + dock-blur sign-off bind to the on-device
Metal/Safari leg by design; the named fallback ladder bounds the worst case. (2) **G2 SiriIsland roster
enrollment** — a new capture pair (owed for WS6 paint-verify regardless) + a scoped accept-residual
allowlist for the genuine no-route components. (3) **G5 16-reader re-home + the `/tmp` dry-run** — the
corrected census is specified; the dry-run surfaces any missed reader at build.

**developReady: TRUE → EXECUTE THE AMENDED PLAN.** The KEEP feature build is ~93% verified with the DAG
intact; every close-machine gap is approach-converged or a cleanly-de-risked build-phase deliverable with a
named proving wave. The execution kickoff order (unchanged from the cursor): STAGE-0 ground-freeze (built)
→ `BG.W-CLOSEFIX-9SITE` (clears R1–R4) → WS1 ROUTE-TRANSITION linchpin → WS3 (with EYEBROW-LIGHT-POLISH)
→ WS2 → WS5 → WS6 → WS4 → WS7 (close machine: close-sweep · gestalt-cursor-parity · field-aurora-aa ·
safari-parity) → WS8 (refract-fence on `uChromatic` · backdrop-sample keystone) → WS9 → WS10 → WS11
→ WS12 (late capture sweep) → BH[WS12] (16-reader re-home → CLAUDE delete) → BG.W-CUT.
