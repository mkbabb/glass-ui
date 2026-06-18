# BC forensics — the cross-tranche failure-class synthesis (feeds Band 0 gate redesign)

> From the BB/BA/AZ post-mortems (research/postmortem/{bb,ba,az}.md). The user: "BB, BA, AZ were FULLY formed tranches — what went so wrong in their implementation? What went right?"


## BB

**Summary:** BB shipped 7 build rounds of rich, genuinely-landed, gate-green source — and then the close batch (5/6/7) NEVER executed, so the SINGLE wave that would have verified painted truth (W-REFLECT3) never ran. No FINAL.md; no wf-bb-reflect.js; no docs/tranches/BB/audit/reflect/ dir; package.json still 4.0.1 not the planned 4.1.0; Batches 5/6/7 PENDING in the task list; last BB commit c08c03d0 ("BB round 7") is immediately followed by e1b4b44c ("BC.W-AUDIT pre-fix"). The build/claim/paint gap ratio is the headline: BUILT ≈ 33/33 waves (source genuinely landed), CLAIMED complete ≈ 33/33 (born-RED→GREEN, master CI green), PAINTED-verified ≈ 0/33 of the visual waves (every one deferred its binding π readback + proof:ba-gestalt verdict to W-REFLECT3 with the verbatim phrase "rides W-REFLECT3"). The gestalt gate could not catch it: proof:ba-gestalt is tags:["release"] (never runs in --run ci), reads author-written PASS/FAIL prose over BA-era captures frozen before the entire BB build batch, and is write-locked so ONLY the un-run W-REFLECT3 may flip a verdict. The result the user reports: glass grey (D1), docks white/broken (D5), tabs not-liquid (D4), viz noisy/black-void (D8/D9), Safari flashing (D7/H). The source is sound; the painted-truth verification was concentrated into one terminal wave that the execution stop cut.

### Per-wave verdicts

| wave | verdict | BC implication |
|---|---|---|
| W-REFLECT3 (Batch 7 — the binding-close gestalt reflection) | CLAIMED-NOT-BUILT | This is THE root failure. BC must re-paint + re-verify every roster surface AND grow the roster to the BB primitives — the work W-REFLECT3 owed. Never again funnel all paint-verification into one terminal wave. |
| W-DARK-MATERIAL / the glass identity (the flagship) | BUILT-NOT-PAINTED | RE-PAINT: close the observer loop (the dynamic darken must READ the sampled luma); re-baseline the dock/overlay tint off the unconditional 20% AA. Already pre-fixed at e1b4b44c (4% floor) — BC owns the real fix. |
| W-DOCK-MORPH-FAMILY + the rail | BUILT-NOT-PAINTED | RE-PAINT the morph (arbitrary-shape, never white, Safari-stable) + close the to:0 measure race; the CDP-Layout-flat trace + cross-engine stability were deferred to W-REFLECT3 and never run. |
| W-LIQUID-REVEAL / W-LENSING / W-LIQUIDHOVER / W-BUTTON-GLASS (liquid-glass band) | BUILT-NOT-PAINTED | RE-PAINT the whole band over a FIXED glass identity (the band's correctness is contingent on D1 being fixed first); reconcile the .glass-refract→.glass-lens out-of-order landing the §0-DRIFT notes confess. |
| W-TABS / W-DRAG-MORPH | BUILT-NOT-PAINTED | RE-PAINT the pill as a real iOS liquid-glass plate; verify the drag-to-current-location pull-morph live (it was built, never user-confirmed). |
| WebGPU viz suite — W-AURORA-WGPU / W-GOOBLOB-WGPU / W-FLOWFIELD / W-CONCENTRIC | BUILT-NOT-PAINTED | RE-PAINT every viz to verifiably paint on a real (non-WebGPU) host; mint a real-GPU meanLum>0 per-viz gate; clean the no-adapter degrade (silent, not throw). BC.DEFECT-LEDGER: 'the viz architecture is sound; the robustness + on-host-verify are the gaps.' |
| W-PRESS-UNIFY | BUILT-NOT-PAINTED | Verify the interruptible spring-press live (the mid-flight ABSORB frame-series never ran). |
| W-CARD-COMPOSITE / W-SCROLL-CARD | BUILT-NOT-PAINTED | Keep the compositor rewrite (genuinely good); re-walk the hero-shrink page-build gestalt + padding across pages. |
| W-CONTROL-TOKENS / W-INVALID-RING / W-PHASE-PALETTE / W-EYEBROW-UNION / W-ON-GLASS-FG | BUILT-NOT-PAINTED | Live-verify the control interactions (the reka stale-binding silent-no-op class needs an e2e check, not a source gate). |
| Batch-0 integrity (W-CI-GREEN / W-CLOSE-BATTERY / W-LEDGER-REPAIR / W-GESTALT-GATE2 / W-VISUAL-RUNNER) | BUILT+PAINTED | PRESERVE — these are load-bearing. But apply W-CLOSE-BATTERY's full-union rule PER-ROUND, not only at the terminal cut, so the 18-red masked-accretion can't recur. |
| W-CARVE3/4/5 / W-CANVAS-UNIFY / W-DRAWER-ABROGATE / W-NDA-DECIDE / W-CARD-PAD | BUILT+PAINTED | PRESERVE — clean structural work; do not re-litigate. The clean-break discipline (no aliases) gives BC a clean surface to build on. |

### Failure classes
- single-terminal-reflect-deferral (every visual wave's binding π + gestalt verdict funneled into W-REFLECT3, which never ran — the cardinal class; cited by every PROGRESS row's 'rides W-REFLECT3')
- source-mechanism-gate-not-paint-gate (proof:X asserts the mechanism is present in source via comment-strip detectors, never that the surface PAINTS; proof:adaptive-glass passes on grey AND fixed; proof:flow-field asserts the fallback FILE exists, never meanLum>0)
- gestalt-gate-release-only-over-stale-captures (proof:ba-gestalt is tags:[release], never in --run ci; reads author PASS/FAIL prose over BA-era captures frozen before the entire BB build batch)
- write-locked-verdict / single-authorized-flipper deadlock (only W-REFLECT3 may flip a roster cell, so a build wave that breaks a surface is structurally forbidden from marking it FAIL — the break is invisible until the un-run flipper runs)
- per-mechanism-pi-cannot-verify-gestalt (the correctly-authored doctrine 'per-mechanism greens do NOT close a visual wave' was unenforced because the enforcer was downstream of the execution stop; grey-glass = every mechanism green, page reads grey)
- decorative-observer / open-loop dead-knob (--glass-backdrop-luma written+declared but read by NO tint rule — the iOS-27 dynamic darken is decorative; substitution-vs-inheritance dead-knob class recurring)
- structural-proxy-parity-is-tautological (the WebGPU ΔE-0.0 'parity' compares the CPU evaluator to itself — proves math matches math, never that the GPU emits pixels; a crashing WGSL canvas passes)
- headless-green / GPU-absent false-paint (useWebGPUCanvas.ts:245 throws on adapter-less hosts; headless probe reads cleared buffer as false-black; Safari/WebKit context-loss D7/H never in the CI surface)
- masked-accretion-backlog (18 ci-tagged reds rode along because the full-union close --run full only fires at the un-run W-CLOSE; ci⊂local made 'run local green' a false claim; 30+ gates/round generate cross-wave drift faster than per-round close reconciles)
- close-class-lie (inherited+generational — BA closed complete claiming 'run local green' over 18 reds; BB recurs it: every visual wave complete on source-green over broken paint)

### What went RIGHT (preserve in BC)
- The build SOURCE genuinely landed — this is NOT a claimed-not-built tranche. The dock-morph compositor rewrite, the liquid-glass primitives (useLiquidReveal/useLensing/useSpringPress/useLiquidFlex/useDragMorph), the WGSL viz (aurora/metaball/flow-field/concentric), the 3-backend canvas unification over ONE leaf, the god-module carves (RATCHET to ∅ twice), the token unifications, the golden card-padding ladder — all real, all in src/. BC re-paints, does not re-build from zero.
- The doctrine was correctly authored — 'per-mechanism greens do NOT close a visual wave' (BB inv-4), 'the binding painted truth rides the π arm.' The PRINCIPLE is right; only the SEQUENCING (terminal-wave deferral) broke it. BC keeps the doctrine, fixes the sequencing.
- The Batch-0 integrity diagnosis was honest + correct — ci-red-census.md openly states the BA close was 'substantially over-claimed' and ci⊂local. W-CLOSE-BATTERY (--run full siblings-absent), W-LEDGER-REPAIR (column-by-header parser), W-GESTALT-GATE2 (IHDR+mobile+freshness), W-VISUAL-RUNNER (~93 π runner) are the RIGHT structural fixes — load-bearing for BC.
- The architecture transpositions are clean — canvas-lifecycle single-source (no two-copy fork), the GL-shader fence held (aurora.frag/metaball.frag byte-untouched), DOCK_SPRING byte-fenced, no-god-module ratchet at ∅. Structural elegance is real.
- The clean-break discipline held — no back-compat aliases (popover-animate retired, vaul-vue abrogated, --card-spacing gone, .scroll-fade-* retired, gold-shimmer-slide retired). BC builds on a clean, alias-free surface.
- W-AURORA-SWRASTER is the ONE viz-band gate that genuinely measures painted pixels on-host (proof:aurora-swraster: real headless luminance band Δmean 0.0010 vs the flat gradient's 0.1328, no --use-gl=angle dependency). It is the model BC should generalize to the whole viz suite — a real meanLum>0 on-host assert.

## BA

**Summary:** BA correctly diagnosed AZ's mechanism-green-close-lie and invented proof:ba-gestalt to kill it — then made that gate paint-blind (roster-TEXT + PNG-existence check, ["local"]-tagged so it never CI-blocked, verdict-flipped only at a single terminal W-REFLECT2 wave with reduced-motion dark-biased captures), so the SAME class recurred one level up: the close bound a hand-typed "PASS" over a grey-glass LIGHT-mode page and shipped it to npm as 4.0.0. Build/claim/paint gap ratio: component SOURCE landed at a high rate (≈20/30 waves are real, working source — W-FEEDBACK-TONE, W-PROGRESS-GRADIENT, W-HANDMARK, W-FADING-SCROLL, W-NO-GRAY, W-ICON-CHIP, W-PAGER, W-EMISSION, the W-CONFIG-CHASSIS width contract all built+painted), but the GLASS-MATERIAL + DOCK + VIZ band is built-not-painted: ~5 headline waves shipped source-green and visually-broken (grey glass, black rim, white/stutter morph, not-glassy dialog, parked-black previews). The 4.0.0 publish + d6 fork close is genuine and the single biggest win.

### Per-wave verdicts

| wave | verdict | BC implication |
|---|---|---|
| W-GESTALT-GATE (proof:ba-gestalt) | BUILT-NOT-PAINTED | RE-GATE: the gestalt gate must read luminance/chroma off the captured PNG (not just existence), run per-visual-wave (not one terminal sweep), and be CI/release-tagged not local-only. This is the keystone Band-0 gate redesign. |
| W-DARK-MATERIAL (scope 7 — grey glass) | BUILT-NOT-PAINTED | RE-PAINT + RE-GATE: complete the scope-7 floor on all three bands (BC already pre-fixed e1b4b44c); close the luminance-observer loop; the dark rim D2 needs a rim→catch-light rebuild. proof:adaptive-glass must read PAINTED warm-vs-grey, not contrast-over-white. |
| W-DOCK-SECTIONS + 4th rail + W-DOCK-MORPH-INSITU | BUILT-NOT-PAINTED | RE-BUILD: the morph/motion is a compositor/Safari defect no BA gate read; BC.W-DOCK-ENGINE/W-LIQUID-MORPH. The reflect only stressed rail geometry under reduced-motion. |
| W-GLASS-CAL (blur dial-back + calm CTA) | BUILT-NOT-PAINTED | RE-DESIGN: spec direction inverted the user's intent; BB mints --glass-depth/.glass-deep to restore the maximal register. Preserve the disco-retirement (that was correct). |
| W-SURFACE-AXIS | BUILT-NOT-PAINTED | RE-PAINT (prune half): the axis factoring is sound source — keep it; finish the prune (glass-panel→glass-card/material) and make the Dialog actually transmit (downstream of the grey-darken fix). |
| W-NO-GRAY | BUILT+PAINTED | PRESERVE — do not re-litigate; the warm-amber light-register chroma is a genuine identity win. |
| W-TABS-STD | BUILT-NOT-PAINTED | RE-PAINT: the pill material reads flat/not-liquid (downstream of grey-darken + missing iOS pill register); BC needs the proper small-pill glass + the pull-morph facility. |
| W-FEEDBACK-TONE | BUILT+PAINTED | PRESERVE the recipe; the tone tint rides whatever the BC glass-material fix produces (it composes the rung tokens, no re-fork). |
| W-MENU-GLASS | BUILT+PAINTED | PRESERVE the register; the menu rows inherit the BC glass-material fix; the dropdown dot/occlusion is a separate placement bug. |
| W-GOO-REDRESS | BUILT-NOT-PAINTED | RE-PAINT/RE-BUILD: the bridge/wake source landed but the WebGPU-first path + arming reliability is a BC.W-VIZ-RESURRECT/W-WGSL-FALLBACK concern, not the smin envelope. |
| W-PROGRESS-GRADIENT | BUILT+PAINTED | PRESERVE — the R8-14 'totally broken' progress is genuinely rebuilt. |
| W-HANDMARK | BUILT+PAINTED | PRESERVE — real source, no contradicting user defect. |
| W-FADING-SCROLL | BUILT+PAINTED | PRESERVE the primitive; note the retire-claim was over-stated and landed one batch later. |
| W-REFLECT2 (the gestalt close itself) | CLAIMED-NOT-BUILT | RE-GATE: the terminal reflect ran once, reduced-motion, dark-biased — it is the close-class lie one level up. BC's reflect must run LIVE motion, BOTH modes stressed for the LIGHT-mode grey, and read pixels. |

### Failure classes
- single-terminal-reflect-deferral — BA.md inv-4 DEFERS the gestalt verdict by PLAN to one Batch-7 W-REFLECT2 wave; 28 mid-tranche waves close live-verified with the gestalt 'staged'
- gestalt-gate-is-roster-text-not-paint — proof:ba-gestalt reads verdict STRINGS out of ba-gestalt-roster.md + asserts PNG IHDR dimensions (proof-ba-gestalt.mjs:137-157,346-381), never reads a pixel; the close binds a hand-typed PASS
- source-mechanism-gate-rewards-the-regression — proof:adaptive-glass asserts the darken is wired + -aa≤24% (20% passes); proof:adaptive-glass-live asserts the dock clears 4.5:1 + ΔL over synthetic-white; a grey slab has BETTER contrast than warm cream, so the gate is GREEN on the broken state and would FAIL the fix (the most dangerous class: success metric anti-correlated with the user's read)
- local-tagged-gate-never-ci-blocks — proof:ba-gestalt + proof:adaptive-glass-live are ['local']-tagged; master CI green carried zero gestalt/paint signal (proof-ba-gestalt.mjs:29-32,461)
- reduced-motion-capture-hides-motion-and-viz — the reflect captures used reducedMotion:reduce (aurora.md:23, dark-register.md:23), parking the field (black-preview D9') and freezing the morph (white-morph D5 never appears)
- dark-biased-reflect-misses-light-mode-grey — the dark-register surface verdict read DARK mode (lift correct) and declared transmission PASS while LIGHT-mode .glass-floating was oklab(0.798 0.002 0.006/0.84) grey
- close-class-lie-by-accepted-tradeoff — FINAL §4 negotiated the known-wrong chip-graze into a PASS as 'sub-perceptual within proportion'; the user re-flagged it (§F dropdown occlusion)
- half-fixed-inherited-regression — W-DARK-MATERIAL scope 7 fixed the content tiers but left the dock/floating/overlay band at the inherited 20% AA (ladder.css:155, morph.css:451), finished only by BC.W-AUDIT e1b4b44c — banking a 'fixed' claim on an incomplete cut
- spec-direction-wrong-not-execution-wrong — W-GLASS-CAL dialed blur DOWN exactly as specced; the user wanted MORE glass-morphism (BB mints --glass-depth to undo it)
- prune-claimed-not-executed — W-SURFACE-AXIS factored the axis but did not prune the glass-panel duplicate the user named (src/components/custom/glass-panel/ still on disk)

### What went RIGHT (preserve in BC)
- Published v4.0.0 with npm provenance AND closed the d6 fork lineage — the single hardest thing the constellation needed; the registry bifurcation-strand trap (npm update/^x moving a 3.12.0 fork consumer onto 3.13.0) is correctly diagnosed and reconciled at 4.0.0 (FINAL.md §5, MEMORY project_glassui_400_published confirms LIVE)
- W-FEEDBACK-TONE genuinely landed: src/styles/feedback-tone.css ships the color-mix(in oklab) tinted-glass recipe; the three opaque-slab tone maps (Toast/Notification/Alert) collapsed; no BC re-flag
- W-PROGRESS-GRADIENT genuinely rebuilt the sectioned progress on a single-fill model (ProgressSectioned.vue:179 .progress-sectioned-flow replaced the per-cell stack + screen-blend seam); no BC re-flag
- W-HANDMARK re-landed the d6 hand-voice family (HandMark.vue) AND the /underline DEC-8 fold struck the phantom slides break (slides imports zero /underline)
- W-FADING-SCROLL shipped a real dual-path (native scroll(self) + JS fallback) primitive with ≥2 consumers
- W-NO-GRAY's light-register warm-amber chroma floor on the neutral ladder is a genuine identity win, orthogonal to the adaptive-darken grey (different mechanism — preserve it)
- The W-CONFIG-CHASSIS width contract genuinely killed the 0px-slider class at the chassis (not per-consumer)
- The seed DIAGNOSIS was right: BA correctly named the P-1 close-class (mechanisms green, page wrong) and the dark-register flatness as the cross-cutting root of a third of the findings — the thesis is sound, only the enforcing gate was paper

## AZ

**Summary:** AZ is THE divergence point — the grey-glass ORIGIN. W-ADAPTIVE-AUTO (commit 5b72fd9b, Batch 1) shipped the unconditional 20%-AA oklab-darken-toward-near-black-ink on EVERY glass surface (dock + floating/overlay + content tiers), mode- and backdrop-agnostically, with ZERO --glass-backdrop read. That mixes warm-cream --card (oklab-L 0.98, chroma 0.18) 20% toward the dark ink → oklab(0.695 0.002 0.006/0.536): chroma death + over-darken + alpha lift = the user's "ALL glass far too dark + grey (major regression)" + "both docks broken (grey opaque slabs)". The wave closed `live-verified` with "π 36/0" — but the gate proof:adaptive-glass-live composites over synthetic-WHITE and asserts contrast≥4.5:1 + ΔL≥0.08, BOTH MONOTONIC in the darken direction (more grey = higher contrast = greener gate), with ZERO chroma/warmth/upper-darken bound. The gate is structurally blind to the exact defect AZ introduced and certifies the regression as the feature. Build/claim/paint gap: of ~11 visual waves, ~5 BUILT+PAINTED, ~5 BUILT-NOT-PAINTED (incl. the grey origin), 1 CLAIMED-NOT-BUILT (the macOS-stack rail, 0% built, gate verifies a chip-strip via string-scans). The grey rode UNTOUCHED through BA (scope-7 fixed content tiers to 4% but EXEMPTED the dock/overlay band + rebaselined the gate to bless it) and BB (morph.css never touched) to the BC user report.

### Per-wave verdicts

| wave | verdict | BC implication |
|---|---|---|
| W-ADAPTIVE-AUTO | BUILT-NOT-PAINTED | RE-BUILD as closed-loop observer-driven continuous strength + RE-GATE bidirectional (calm-light: α<0.7 AND oklab-L>0.85 AND chroma>0, born-RED on HEAD grey). Delete the unconditional :where() re-points; promote useGlassBackdropLuminance to load-bearing. |
| W-DOCK-TAXONOMY | BUILT-NOT-PAINTED | KEEP the prop taxonomy (correct architecture). RE-BUILD the surface: collapse the 4 plate forks (shell static ×2 + morph interp ×2) into ONE orientation-agnostic --dock-expand-t-driven warm plate. |
| W-REGISTER-IOS | BUILT-NOT-PAINTED | RE-PAINT: the de-red mechanism is correct and should be PRESERVED; it re-reads correctly once the §1 grey plate is fixed. No re-build of the register itself. |
| W-DOCK-FLICKER | BUILT+PAINTED | PRESERVE — the flicker fix works. Do not re-litigate. Fix the morph-white separately (morph.css:352 --glass-bg-wash override × grey). |
| W-MORPH-SHOWCASE | BUILT-NOT-PAINTED | RE-BUILD the dock-plate path so collapse endpoints stay on the element-level tint (kill the bare --glass-bg-wash override); the morph mechanism is sound, the plate it morphs is poisoned. |
| W-RAIL3 / W-RAIL-EXTEND | CLAIMED-NOT-BUILT | RE-BUILD ground-up as <DockStack> (windowed visibleCount + hover-expand flyout + bottom-anchored n-stack); DELETE DockRail/DockSection/rail-extend.css + proof:rail3/proof:dock-sections (clean break, no alias). |
| W-DOCK-NORMALIZE | BUILT+PAINTED | PRESERVE — a model honest negative result. Keep the F4 census discipline. |
| W-SUFFUSE | BUILT+PAINTED | PRESERVE the suffusion vocabulary; the double-card→one-card-with-procedural idiom is a separate BC demo-redesign concern, not an AZ re-build. |
| W-MOTION-SUITE | BUILT+PAINTED | PRESERVE — sound motion foundation BB's liquid-glass band built on. |
| W-METRIC-UNIFY | BUILT+PAINTED | PRESERVE — clean, real, painted. |
| W-CON-GEN (constellation) | BUILT+PAINTED | PRESERVE the engine. BC decides only the WebGPU-modernize question; the Canvas2D primitive is sound. |

### Failure classes
- source-mechanism-gate-not-paint-gate (proof:adaptive-glass-live is a monotonic contrast-over-white floor; darkening = greener gate; no chroma/warmth/upper bound)
- per-mechanism-pi-cannot-verify-gestalt (π 36/0 verified each surface's text-contrast; the user reads the whole-page grey gestalt)
- single-terminal-reflect-deferral (the binding paint truth was tags:[local] — a local DELTA-capture ritual backstopped by a freshness hash, rubber-stamped, never an automated CI assertion)
- canary-retired-to-green (AZ narrowed away the byte-identity canary that would have flagged the three changed content kinds, replacing it with the monotonic gate — the exact evasion the spec itself names as forbidden)
- gate-rebaselined-to-broken-paint (BA 99d44494 rebaselined proof:adaptive-glass 26/26 to bless the grey dock/overlay band)
- built-not-wired-decorative-substrate (useGlassBackdropLuminance writes --glass-backdrop-luma that NO CSS rule reads; the closed loop the iOS-27 darken needed was never built)
- substitution-vs-inheritance-dead-knob (morph.css:352 --glass-bg-wash bare collapse:hover override + dock-control raw rungs bypass the element-level tint path → inverted-contrast controls + grey↔white morph flip)
- claimed-not-built-gate-verifies-easier-thing (proof:rail3 is all string-scans; ZERO clause encodes the macOS-stack hover-expand/windowing/scrollable-n the user asked for)
- static-heuristic-dressed-as-dynamic (the unconditional 20% darken sold as 'iOS-27 dynamic darkening' is the OPPOSITE of dynamic; the chronic survived 3 tranches of re-recalibrating a constant that should never have been a constant)

### What went RIGHT (preserve in BC)
- W-METRIC-UNIFY / coalesceMetric — the amount||placeholder zero-value bug (a valid 0 rendered blank) is genuinely fixed; all four Metric* consume the one empty-check. Clean, painted, real.
- W-MOTION-SUITE — full curve canon (value.js+keyframes+steps+editable bezier), the spring fork KILLED onto SPRING_PRESETS (one spring family), scroll/VT demos; the sound motion foundation BB's liquid-glass band built on. BC confirms fourier/motion live + interactive.
- W-DOCK-FLICKER — the collapse-onset scale-pop fix (:not([data-morphing]) gate) + useDockState intent-dwell hysteresis + edge-sweep recheck genuinely killed the ±24-34px hover-pop + FLIP-thrash; the 561-frame self-test is a real measured artifact (the morph-white is a different cause).
- W-DOCK-TAXONOMY (the API shape) — collapsing the dock|rail|instrument-strip variant union to ONE GlassDock + ONE orientation axis is the correct architecture; vertical-dock = orientation='vertical' is clean and should be KEPT (only the surface it shapes is grey).
- W-CON-GEN / constellation — the protected quintet stayed intact; constellation paints correctly + is interactive at HEAD (BC explicitly: DO NOT rip out + rebuild). G4 labels honestly booked SPEC'D-NOT-BUILT (no 2nd consumer) — exemplary restraint.
- W-DOCK-NORMALIZE — the re-census found ZERO divergent nav docks and recorded the no-op HONESTLY rather than inventing work; a model honest negative result.
- The spec-authoring discipline itself — W-ADAPTIVE-AUTO.md §0/§3a/§11 named IN ADVANCE the exact traps that then bit (the substitution-vs-inheritance trap, the C5-4 gate blind spot, the @container self-match no-op) and even named the canary-deletion-to-green as the forbidden evasion. The rigor is real; the failure is that the impl + gate did not honour the spec's own warnings. BC should preserve the spec discipline and ADD gate-binds-to-paint enforcement.

---

## The unified failure-class taxonomy (the Band-0 gate-redesign requirements)

1. single-terminal-reflect-deferral (every visual wave's binding π + gestalt verdict funneled into W-REFLECT3, which never ran — the cardinal class; cited by every PROGRESS row's 'rides W-REFLECT3')
2. source-mechanism-gate-not-paint-gate (proof:X asserts the mechanism is present in source via comment-strip detectors, never that the surface PAINTS; proof:adaptive-glass passes on grey AND fixed; proof:flow-field asserts the fallback FILE exists, never meanLum>0)
3. gestalt-gate-release-only-over-stale-captures (proof:ba-gestalt is tags:[release], never in --run ci; reads author PASS/FAIL prose over BA-era captures frozen before the entire BB build batch)
4. write-locked-verdict / single-authorized-flipper deadlock (only W-REFLECT3 may flip a roster cell, so a build wave that breaks a surface is structurally forbidden from marking it FAIL — the break is invisible until the un-run flipper runs)
5. per-mechanism-pi-cannot-verify-gestalt (the correctly-authored doctrine 'per-mechanism greens do NOT close a visual wave' was unenforced because the enforcer was downstream of the execution stop; grey-glass = every mechanism green, page reads grey)
6. decorative-observer / open-loop dead-knob (--glass-backdrop-luma written+declared but read by NO tint rule — the iOS-27 dynamic darken is decorative; substitution-vs-inheritance dead-knob class recurring)
7. structural-proxy-parity-is-tautological (the WebGPU ΔE-0.0 'parity' compares the CPU evaluator to itself — proves math matches math, never that the GPU emits pixels; a crashing WGSL canvas passes)
8. headless-green / GPU-absent false-paint (useWebGPUCanvas.ts:245 throws on adapter-less hosts; headless probe reads cleared buffer as false-black; Safari/WebKit context-loss D7/H never in the CI surface)
9. masked-accretion-backlog (18 ci-tagged reds rode along because the full-union close --run full only fires at the un-run W-CLOSE; ci⊂local made 'run local green' a false claim; 30+ gates/round generate cross-wave drift faster than per-round close reconciles)
10. close-class-lie (inherited+generational — BA closed complete claiming 'run local green' over 18 reds; BB recurs it: every visual wave complete on source-green over broken paint)
11. single-terminal-reflect-deferral — BA.md inv-4 DEFERS the gestalt verdict by PLAN to one Batch-7 W-REFLECT2 wave; 28 mid-tranche waves close live-verified with the gestalt 'staged'
12. gestalt-gate-is-roster-text-not-paint — proof:ba-gestalt reads verdict STRINGS out of ba-gestalt-roster.md + asserts PNG IHDR dimensions (proof-ba-gestalt.mjs:137-157,346-381), never reads a pixel; the close binds a hand-typed PASS
13. source-mechanism-gate-rewards-the-regression — proof:adaptive-glass asserts the darken is wired + -aa≤24% (20% passes); proof:adaptive-glass-live asserts the dock clears 4.5:1 + ΔL over synthetic-white; a grey slab has BETTER contrast than warm cream, so the gate is GREEN on the broken state and would FAIL the fix (the most dangerous class: success metric anti-correlated with the user's read)
14. local-tagged-gate-never-ci-blocks — proof:ba-gestalt + proof:adaptive-glass-live are ['local']-tagged; master CI green carried zero gestalt/paint signal (proof-ba-gestalt.mjs:29-32,461)
15. reduced-motion-capture-hides-motion-and-viz — the reflect captures used reducedMotion:reduce (aurora.md:23, dark-register.md:23), parking the field (black-preview D9') and freezing the morph (white-morph D5 never appears)
16. dark-biased-reflect-misses-light-mode-grey — the dark-register surface verdict read DARK mode (lift correct) and declared transmission PASS while LIGHT-mode .glass-floating was oklab(0.798 0.002 0.006/0.84) grey
17. close-class-lie-by-accepted-tradeoff — FINAL §4 negotiated the known-wrong chip-graze into a PASS as 'sub-perceptual within proportion'; the user re-flagged it (§F dropdown occlusion)
18. half-fixed-inherited-regression — W-DARK-MATERIAL scope 7 fixed the content tiers but left the dock/floating/overlay band at the inherited 20% AA (ladder.css:155, morph.css:451), finished only by BC.W-AUDIT e1b4b44c — banking a 'fixed' claim on an incomplete cut
19. spec-direction-wrong-not-execution-wrong — W-GLASS-CAL dialed blur DOWN exactly as specced; the user wanted MORE glass-morphism (BB mints --glass-depth to undo it)
20. prune-claimed-not-executed — W-SURFACE-AXIS factored the axis but did not prune the glass-panel duplicate the user named (src/components/custom/glass-panel/ still on disk)
21. source-mechanism-gate-not-paint-gate (proof:adaptive-glass-live is a monotonic contrast-over-white floor; darkening = greener gate; no chroma/warmth/upper bound)
22. per-mechanism-pi-cannot-verify-gestalt (π 36/0 verified each surface's text-contrast; the user reads the whole-page grey gestalt)
23. single-terminal-reflect-deferral (the binding paint truth was tags:[local] — a local DELTA-capture ritual backstopped by a freshness hash, rubber-stamped, never an automated CI assertion)
24. canary-retired-to-green (AZ narrowed away the byte-identity canary that would have flagged the three changed content kinds, replacing it with the monotonic gate — the exact evasion the spec itself names as forbidden)
25. gate-rebaselined-to-broken-paint (BA 99d44494 rebaselined proof:adaptive-glass 26/26 to bless the grey dock/overlay band)
26. built-not-wired-decorative-substrate (useGlassBackdropLuminance writes --glass-backdrop-luma that NO CSS rule reads; the closed loop the iOS-27 darken needed was never built)
27. substitution-vs-inheritance-dead-knob (morph.css:352 --glass-bg-wash bare collapse:hover override + dock-control raw rungs bypass the element-level tint path → inverted-contrast controls + grey↔white morph flip)
28. claimed-not-built-gate-verifies-easier-thing (proof:rail3 is all string-scans; ZERO clause encodes the macOS-stack hover-expand/windowing/scrollable-n the user asked for)
29. static-heuristic-dressed-as-dynamic (the unconditional 20% darken sold as 'iOS-27 dynamic darkening' is the OPPOSITE of dynamic; the chronic survived 3 tranches of re-recalibrating a constant that should never have been a constant)

## What went RIGHT across all three (BC preserves, does NOT re-litigate)

- The build SOURCE genuinely landed — this is NOT a claimed-not-built tranche. The dock-morph compositor rewrite, the liquid-glass primitives (useLiquidReveal/useLensing/useSpringPress/useLiquidFlex/useDragMorph), the WGSL viz (aurora/metaball/flow-field/concentric), the 3-backend canvas unification over ONE leaf, the god-module carves (RATCHET to ∅ twice), the token unifications, the golden card-padding ladder — all real, all in src/. BC re-paints, does not re-build from zero.
- The doctrine was correctly authored — 'per-mechanism greens do NOT close a visual wave' (BB inv-4), 'the binding painted truth rides the π arm.' The PRINCIPLE is right; only the SEQUENCING (terminal-wave deferral) broke it. BC keeps the doctrine, fixes the sequencing.
- The Batch-0 integrity diagnosis was honest + correct — ci-red-census.md openly states the BA close was 'substantially over-claimed' and ci⊂local. W-CLOSE-BATTERY (--run full siblings-absent), W-LEDGER-REPAIR (column-by-header parser), W-GESTALT-GATE2 (IHDR+mobile+freshness), W-VISUAL-RUNNER (~93 π runner) are the RIGHT structural fixes — load-bearing for BC.
- The architecture transpositions are clean — canvas-lifecycle single-source (no two-copy fork), the GL-shader fence held (aurora.frag/metaball.frag byte-untouched), DOCK_SPRING byte-fenced, no-god-module ratchet at ∅. Structural elegance is real.
- The clean-break discipline held — no back-compat aliases (popover-animate retired, vaul-vue abrogated, --card-spacing gone, .scroll-fade-* retired, gold-shimmer-slide retired). BC builds on a clean, alias-free surface.
- W-AURORA-SWRASTER is the ONE viz-band gate that genuinely measures painted pixels on-host (proof:aurora-swraster: real headless luminance band Δmean 0.0010 vs the flat gradient's 0.1328, no --use-gl=angle dependency). It is the model BC should generalize to the whole viz suite — a real meanLum>0 on-host assert.
- Published v4.0.0 with npm provenance AND closed the d6 fork lineage — the single hardest thing the constellation needed; the registry bifurcation-strand trap (npm update/^x moving a 3.12.0 fork consumer onto 3.13.0) is correctly diagnosed and reconciled at 4.0.0 (FINAL.md §5, MEMORY project_glassui_400_published confirms LIVE)
- W-FEEDBACK-TONE genuinely landed: src/styles/feedback-tone.css ships the color-mix(in oklab) tinted-glass recipe; the three opaque-slab tone maps (Toast/Notification/Alert) collapsed; no BC re-flag
- W-PROGRESS-GRADIENT genuinely rebuilt the sectioned progress on a single-fill model (ProgressSectioned.vue:179 .progress-sectioned-flow replaced the per-cell stack + screen-blend seam); no BC re-flag
- W-HANDMARK re-landed the d6 hand-voice family (HandMark.vue) AND the /underline DEC-8 fold struck the phantom slides break (slides imports zero /underline)
- W-FADING-SCROLL shipped a real dual-path (native scroll(self) + JS fallback) primitive with ≥2 consumers
- W-NO-GRAY's light-register warm-amber chroma floor on the neutral ladder is a genuine identity win, orthogonal to the adaptive-darken grey (different mechanism — preserve it)
- The W-CONFIG-CHASSIS width contract genuinely killed the 0px-slider class at the chassis (not per-consumer)
- The seed DIAGNOSIS was right: BA correctly named the P-1 close-class (mechanisms green, page wrong) and the dark-register flatness as the cross-cutting root of a third of the findings — the thesis is sound, only the enforcing gate was paper
- W-METRIC-UNIFY / coalesceMetric — the amount||placeholder zero-value bug (a valid 0 rendered blank) is genuinely fixed; all four Metric* consume the one empty-check. Clean, painted, real.
- W-MOTION-SUITE — full curve canon (value.js+keyframes+steps+editable bezier), the spring fork KILLED onto SPRING_PRESETS (one spring family), scroll/VT demos; the sound motion foundation BB's liquid-glass band built on. BC confirms fourier/motion live + interactive.
- W-DOCK-FLICKER — the collapse-onset scale-pop fix (:not([data-morphing]) gate) + useDockState intent-dwell hysteresis + edge-sweep recheck genuinely killed the ±24-34px hover-pop + FLIP-thrash; the 561-frame self-test is a real measured artifact (the morph-white is a different cause).
- W-DOCK-TAXONOMY (the API shape) — collapsing the dock|rail|instrument-strip variant union to ONE GlassDock + ONE orientation axis is the correct architecture; vertical-dock = orientation='vertical' is clean and should be KEPT (only the surface it shapes is grey).
- W-CON-GEN / constellation — the protected quintet stayed intact; constellation paints correctly + is interactive at HEAD (BC explicitly: DO NOT rip out + rebuild). G4 labels honestly booked SPEC'D-NOT-BUILT (no 2nd consumer) — exemplary restraint.
- W-DOCK-NORMALIZE — the re-census found ZERO divergent nav docks and recorded the no-op HONESTLY rather than inventing work; a model honest negative result.
- The spec-authoring discipline itself — W-ADAPTIVE-AUTO.md §0/§3a/§11 named IN ADVANCE the exact traps that then bit (the substitution-vs-inheritance trap, the C5-4 gate blind spot, the @container self-match no-op) and even named the canary-deletion-to-green as the forbidden evasion. The rigor is real; the failure is that the impl + gate did not honour the spec's own warnings. BC should preserve the spec discipline and ADD gate-binds-to-paint enforcement.
