# BC — the WAVE-INDEX (the canonical wave registry — the single source of truth for wave names)

> **The allowlist.** Every disposition / cross-reference in `DEFERRAL-LEDGER.md`, `PROMPT-LEDGER.md`,
> `ORCHESTRATION.md`, `PLAN.md`, and the wave specs MUST name a wave that appears in this table.
> A reference to a name NOT in this index is **name-drift** — reconcile it to the canonical id (or, if
> it maps to NO authored wave, it is a genuine coverage gap for the CHALLENGE pass, never invented here).
>
> **70 wave specs on disk** (`ls docs/tranches/BC/waves/*.md`) — the iteration-2 PLAN fan-out's 66 +
> iteration-4 HARDEN's 4 (`BC.W-VISUAL-RECONCILE` + the Band-11 perf trio `BC.W-CSS-CRITICAL`/
> `BC.W-LIGHTHOUSE`/`BC.W-PERF-PRODUCER` — the CHALLENGE-1 BLOCKER 3/4/5/7 + the un-owned-perf-chronic
> + the buttons-interaction MAJOR closed).
> `proof:bc-fold-ledger` clause F2 (decided-destination soundness) REDs the close if any disposition
> names a wave absent from this index.
>
> Built by iteration-3 RECONCILE (2026-06-18) by reading each wave header (`# <id> — <title>` + the
> `**Band:**` / `**Sequence:**` line). The band membership is cross-checked against `ORCHESTRATION.md §1`
> (the convergence checklist — the authoritative band→wave mapping).

---

## The 70 canonical waves

| id | band | title (one-line owns) | sequence-after |
|---|---|---|---|
| **BC.W-PM-BB** | F | the BB post-mortem (source-green / paint-broken / never-closed) — the per-wave BUILT/CLAIMED/PAINTED verdict matrix | FIRST of Band F (no predecessor) |
| **BC.W-PM-BA** | F | the BA post-mortem (PUBLISHED 4.0.0 and still shipped grey) — the paint-blind gestalt-gate forensic | after BC.W-PM-BB (siblings) |
| **BC.W-PM-AZ** | F | the AZ post-mortem (the divergence point — the grey-glass ORIGIN, adaptive-auto/morph-showcase/rail3) | sibling of BC.W-PM-BB/BA |
| **BC.W-PM-SYNTHESIS** | F | the cross-tranche failure-class taxonomy (29 classes → 10 root mechanisms) → Band-0 gate-redesign requirements | after BC.W-PM-BB+BA+AZ; gates Band 0 |
| **BC.W-GESTALT-FIRST** | 0 | per-wave gestalt-first paint verification (the single-terminal-reflect deferral ABOLISHED) | after BC.W-PM-SYNTHESIS |
| **BC.W-PAINT-GATE** | 0 | gates MEASURE PAINT, not source-mechanism (the gate-paint-blindness closed) | after BC.W-PM-SYNTHESIS; with BC.W-GESTALT-FIRST |
| **BC.W-FOLD-LEDGER** | 0 | every chronic / prior-tranche deferral folded + DECIDED (the no-silent-drop floor; mints FOLD-LEDGER.json) | after the PM wrappers + the deferral sweep |
| **BC.W-GLASS-IDENTITY** | 1 | the warm-cream partial-transparency base, restored at root (the grey-slab killed) | FIRST of Band 1 (after BC.W-BLACK-BAR rim) |
| **BC.W-ADAPTIVE-RECONCILE** | 1 | close the observer loop (the luma is READ, not decorative) | after BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR |
| **BC.W-GLASS-LEGIBILITY-MEASURED** | 1 | more glass AND more legible at once (the iOS-27 dynamic-range shift, MEASURED) | after BC.W-ADAPTIVE-RECONCILE |
| **BC.W-GLASS-PRUNE** | 1 | prune the glass sprawl to TWO registers: Glass CARDS + Glass MATERIALS | after BC.W-GLASS-IDENTITY |
| **BC.W-DIALOG-GLASS** | 1 | the glass dialog reads as ACTUAL liquid glass (partially transparent, iOS-27) | after BC.W-GLASS-IDENTITY |
| **BC.W-BUTTON-GLASS-IOS** | 1 | increased button glass-morphism, the iOS-27 `.glass`/`.glassProminent` register | after BC.W-BLACK-BAR |
| **BC.W-BLACK-BAR** | 1 | the card/dock top-edge dark rim → a bright catch-light (the D2 root) | FIRST of Band 1 |
| **BC.W-DOCK-ENGINE** | 2 | the buttery-smooth springy COMPOSITOR-ONLY dock morph (the ONE engine; kill `transition:all`) | FIRST of Band 2 |
| **BC.W-DOCK-ARBITRARY** | 2 | the dock animates into arbitrary sizes + shapes (compositor clip-path/scale morph register) | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-VERTICAL-FIX** | 2 | the vertical dock works + is CLICKABLE | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-COLLAPSED-BOTH** | 2 | vertical AND bottom dock collapsed states + a few tab items + persistent core controls | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-STACK-RAIL** | 2 | the macOS hover-expand stack rail (the chronic AZ→BA→BB rail, finally to spec) | after BC.W-DOCK-ENGINE |
| **BC.W-DOCK-SHRINK-BLUR** | 2 | the shrunken dock is CRISP, not a blurry mess (gate the resting self-blur to the morph only) | after BC.W-DOCK-ENGINE |
| **BC.W-LIQUID-MORPH** | 2 | the arbitrary-shape dock morph that is NEVER white, NEVER invisible (the D5 root; AY box-morph re-opened) | after BC.W-DOCK-ENGINE |
| **BC.W-TABS-IOS** | 3 | proper small glass PILLS, the iOS-27 segmented-control material | after Band 1 glass |
| **BC.W-LIQUID-TAB** | 3 | the LIQUID TAB: pull the active pill → it morphs, squishes, flings to location | after BC.W-TABS-IOS |
| **BC.W-UNDERLINE-TUNE** | 3 | the underline material retuned + audacious type + the abrupt indicator spring EASED | after BC.W-TABS-IOS |
| **BC.W-WEBGPU-EVERYWHERE** | 4 (cross-cutting) | WebGPU-first substrate everywhere, the picker that never crashes to black; the WGSL-compile + real-GPU-parity floor | FIRST of Band 4 |
| **BC.W-VIZ-INTERACTION** | 4 (cross-cutting) | every procedural background reacts to cursor + touch with velocity AND acceleration | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CHOREOGRAPHY** | 4 (cross-cutting) | start · transition · end · restart on ONE keyframes.js clock | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-VIZ-CONFIGURATOR-SUITE** | 4 (cross-cutting) | the shared full-configurator + comprehensive-demo-suite discipline per viz | with the per-viz waves |
| **BC.W-TEAL-NAVY-PURGE** | 4 (cross-cutting) | remove the teal-on-navy reference entirely; warm-cream is the identity | cross-cutting |
| **BC.W-VIZ-AURORA** | 4 | aurora WGSL-primary painterly field, perf-restored, configurator-on-RIGHT, pointer-warps (incl. the kuwahara/medium WGSL bodies) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GOOBLOB-PLAIN** | 4 | goo-blob STAGE 1: just a clean blob, from first principles, Safari-OK | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GOOBLOB-MEATBALL** | 4 | goo-blob STAGE 2: + shadowing + meatball merge + lit-glass, hover-interactive, Safari-OK | after BC.W-GOOBLOB-PLAIN |
| **BC.W-VIZ-DOTFLOW** | 4 | the dot-flow field RETOPOLOGIZED: an anchored dot-matrix that LARGE sweeping waves move through | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CONCENTRIC** | 4 | concentric ELLIPSOID LINES that beat into distinct waves (isoline strokes, not a smooth-field blur) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-FOURIER** | 4 | collapse the duplicate fourier views to ONE; the reconstructing-epicycle curve on WGSL, scrub-to-rewind | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-CONSTELLATION** | 4 | the constellation lattice re-homed onto WebGPU: crisp SDF circles + instanced lines, in a card, pointer-attraction | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-WATERCOLOR** | 4 | the watercolor-dot mark: the ghost → a DASHED blob-silhouette outline, the SVG filter Safari-safe + per-instance unique | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-PAPERGRID** | 4 | the liquid paper-grid: evenly-spaced LARGER lines on a slowly breathing curl-flow sheet, suffusable site-wide | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-GRID-SIMPLE** | 4 | abrogate the blurry in-card grid → ONE crisp, evenly-spaced, LARGER, full-bleed page grid (pure CSS, no GL) | after BC.W-VIZ-PAPERGRID |
| **BC.W-VIZ-DOTMATRIX** | 4 | the dot-matrix SPHERE: a fine-dot phyllotaxis globe, depth-shaded, slowly rotating, pointer-aware (NEW) | after BC.W-WEBGPU-EVERYWHERE |
| **BC.W-VIZ-HYBRID** | 4 | the goo+dot-matrix HYBRID: a metaball SDF field sampled as a dot-matrix, dense+bright inside the merged blob (NEW) | after BC.W-GOOBLOB-MEATBALL + BC.W-VIZ-DOTMATRIX |
| **BC.W-VISUAL-RECONCILE** | 4 (cross-cutting) | the BB liquid-glass-band LIVE re-walk over the rebuilt floor (liquid-reveal/lensing/liquidhover/press-unify/card-composite/metal-shimmer re-verify) + the /display/buttons interaction diagnosis | after the Band-1 glass waves + BC.W-GESTALT-FIRST |
| **BC.W-PAGE-CHASSIS** | 5 | the ONE standardized page idiom: audacious hero + subpath + scroll-shrink + ONE glass card + procedural bg | after Band 1 glass |
| **BC.W-PAGE-HIERARCHY** | 5 | section delimiting (hr / sub-card) + design-hierarchy suffused, EVERY PAGE STANDARDIZED | after BC.W-PAGE-CHASSIS |
| **BC.W-CODE-BLOCKS** | 5 | component names + technical values → ONE Fira Code code-block register | after BC.W-PAGE-HIERARCHY |
| **BC.W-PAGE-PRUNE** | 5 | prune superfluity, kill "view source"/platitudes/out-of-date copy + the orphan routes | after BC.W-PAGE-HIERARCHY |
| **BC.W-HERO-AUDACIOUS** | 5 | the herostudios audacious-type heroes, per-category icons, each DISTINCT | after BC.W-PAGE-CHASSIS |
| **BC.W-COMPOSITIONS-HERO** | 5 | /compositions/hero made distinct from the homepage; /foundations/intro three-heroes → ONE | after BC.W-HERO-AUDACIOUS |
| **BC.W-PADDING-CANON** | 5 | the golden padding ladder MADE TO PAINT; /display/card every-card-right; dialog padding | after BC.W-PAGE-CHASSIS |
| **BC.W-GHOST-DASHED** | 5 | the ONE ghost/empty-slot dashed register + rounded-everywhere-it-should-be | after BC.W-PAGE-HIERARCHY |
| **BC.W-SEPARATOR-FIX** | 5 | the Separator label-centering rebuilt + the /display/separator page re-authored | after BC.W-PAGE-HIERARCHY |
| **BC.W-RADIO-FIX** | 6 | radios toggle on every input path + read a clear glass selected-state | after Band 1 glass |
| **BC.W-DROPDOWN-FIX** | 6 | the picker opens without shifting the trigger, aligns to it, and the selected dot reads | after Band 1 glass |
| **BC.W-CONTROL-SMOOTH** | 6 | kill the control lag (quick coupled response) + square borders → rounded | after BC.W-SPRING-EASE + BC.W-AFFORDANCE-MAP |
| **BC.W-CONFIG-RIGHT** | 6 | every configurator: stage left, controls RIGHT on desktop (standardized two-column) | after BC.W-RADIO-FIX + BC.W-DROPDOWN-FIX + BC.W-CONTROL-SMOOTH (the Band-4 viz studios are the consumers verified after this lands) |
| **BC.W-MOTION-ONE-CLOCK** | 7 | keyframes.js is the ONE source + clock for every sophisticated animation | FIRST of Band 7 |
| **BC.W-SPRING-EASE** | 7 | every spring squishy/quick/coupled-fade; the abrupt curves eased | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-AFFORDANCE-MAP** | 7 | interaction affordances baked into EVERY interactive element | after BC.W-SPRING-EASE + BC.W-MOTION-ONE-CLOCK |
| **BC.W-TUNABLE-ANIM** | 7 | the tunable-animation brainstorm + the live registry | after BC.W-MOTION-ONE-CLOCK |
| **BC.W-SAFARI-WEBGL** | 8 | the cross-engine WebGL/WebGPU context lifecycle: the Safari flash KILLED, the liquid morph stable on WebKit | after BC.W-WEBGPU-EVERYWHERE + Band 2 |
| **BC.W-STORYBOOK-META** | 9 | the frontend-design meta-pass over the storybook ITSELF (padding/usability/spacing/occlusion/fontsize/idiom) | after Bands 1-7 |
| **BC.W-SPEEDTEST-ADOPT** | 10 | the speedtest fleet adopt: ^4.x bump + the 5-interim consume-and-delete sweep + the AW v3 relay reconcile | EXECUTION-phase, after BC.W-CUT |
| **BC.W-FOURIER-ASK** | 10 | the fourier cross-repo reconcile: NO outbound ask + the fourier-analysis ^4.0.0 consumer bump + FourierField warm-lean pointer | EXECUTION-phase, after BC.W-CUT |
| **BC.W-ATLAS-ASK** | 10 | the sci-report Atlas adopt: the d6-lineage stranded consumer ^3.12.0(deprecated)→^4.x + the seven-needs consume-and-delete | EXECUTION-phase, after BC.W-CUT; ‖ BC.W-SPEEDTEST-ADOPT + BC.W-FOURIER-ASK |
| **BC.W-DECK** | 10 | BUILD the `@mkbabb/glass-ui/deck` sibling subpath: lift slides/src/deck/ (~1108 LoC headless core) into the full-viewport keyboard-paged aria-live PRESENTATION register (the single largest UNBUILT cross-repo ask) | BUILD-phase; after Band 0 + Band-2 dock + Band-3 PagerDots; BEFORE BC.W-CUT + BC.W-SPEEDTEST-ADOPT |
| **BC.W-DIST-COMMENT-FIX** | 10 | CONFIRM the 4.0.1 dist-CSS comment fix landed + harden the source-side comment-balance guard | EARLY (Band 5/10 convergence) |
| **BC.W-CUT** | 10 | the honest 4.x cut: `--run full` siblings-absent → gated-provenance tag → consumer adopt sweep + slides redeploy | EXECUTION-phase only, user-gated; LAST |
| **BC.W-CSS-CRITICAL** | 11 (PERFORMANCE) | the published `/styles` critical/deferred split (render-blocking-early subset) RE-MEASURED over the settled cascade + the FOUC-safe π RUN LIVE; discharges the `styles-critical-split` chronic | FIRST of Band 11; after the visual bands settle the cascade |
| **BC.W-LIGHTHOUSE** | 11 (PERFORMANCE) | the committed re-runnable production-preview Lighthouse score-floor (perf/a11y/CLS/TBT, :5388) RUN LIVE + re-pinned via `--rebaseline` + the bare-consumer first-paint harness | after BC.W-CSS-CRITICAL + BC.W-PERF-PRODUCER + the visual bands |
| **BC.W-PERF-PRODUCER** | 11 (PERFORMANCE) | lock the four producer fixes (dock contain/deferReposition, GooBlob one-canvas+dispose, aurora sub-2×-DPR cap, density glyph) + RUN the headed-GPU runtime π | after Band 2 dock + Band 4 aurora/blob rebuilds |

---

## Name-drift map (the drifted names the iteration-2 fan-out referenced → the canonical on-disk wave)

The Band-0 / deferral-fold / PM-wrapper / PROMPT-LEDGER authoring referenced disposition names that
do NOT exist on disk. iteration-3 RECONCILE replaced each with the canonical wave(s) above. Recorded
here so a future reader knows the lineage (the drift was a naming slip, not a dropped wave — except
`BC.W-VISUAL-RECONCILE`, the one genuine gap).

| drifted name | reconciled → | rationale |
|---|---|---|
| `BC.W-VIZ-LIVE` (per-viz live-paint half) | the per-viz wave (`BC.W-VIZ-AURORA` / `BC.W-GOOBLOB-PLAIN`+`BC.W-GOOBLOB-MEATBALL` / `BC.W-VIZ-FOURIER` / `BC.W-VIZ-WATERCOLOR` / …) | "verify viz LIVE" was authored as one umbrella; the PLAN split the per-viz LIVE-PAINT verify into the 11 per-viz Band-4 waves (each captures its OWN paint per `BC.W-GESTALT-FIRST`) |
| `BC.W-VIZ-LIVE` (Safari context-lifecycle half) | `BC.W-SAFARI-WEBGL` | the iteration-2 viz bodies (GOOBLOB-PLAIN/MEATBALL line 3, VIZ-AURORA, VIZ-HYBRID) named `BC.W-VIZ-LIVE` specifically as the home of the Safari `webglcontextlost` lifecycle / the §H flash circuit-breaker (D7/§H) — that lifecycle is owned by Band-8 `BC.W-SAFARI-WEBGL`, NOT the per-viz waves and NOT `BC.W-WEBGPU-EVERYWHERE`. The HARDEN pass (iteration 4) renamed every `BC.W-VIZ-LIVE` Safari-lifecycle body reference to `BC.W-SAFARI-WEBGL` and made the Band-4-viz→Band-8-SAFARI cross-band Safari-π dependency explicit (the no-flash arm GATES on the breaker landing). |
| `BC.W-WGSL-FALLBACK` | `BC.W-WEBGPU-EVERYWHERE` | the async-adapter-real picker + try-then-rebuild WebGPU→WebGL2 graceful-degrade (the D8 "no GPU adapter" crash close) folded into the substrate-everywhere wave. The iteration-2 fan-out named the phantom `BC.W-WGSL-FALLBACK` as the Sequence-predecessor / fold / byte-fence home in 11 Band-4 viz bodies; the HARDEN pass (iteration 4) renamed every body reference to `BC.W-WEBGPU-EVERYWHERE` (collapsing the dual `WGSL-FALLBACK`+`WEBGPU-EVERYWHERE` Sequence mentions into ONE — the picker + the WGSL-primary mandate both live in WEBGPU-EVERYWHERE). |
| `BC.W-CROSSREPO-ADOPT` | `BC.W-SPEEDTEST-ADOPT` + `BC.W-FOURIER-ASK` + `BC.W-ATLAS-ASK` (+ `BC.W-CUT` for the slides leg) | the Band-10 cross-repo adopt is the THREE per-sibling waves + the cut, not one wave |
| `BC.W-CHRONIC-FOLD` | `BC.W-FOLD-LEDGER` | the chronic-fold machine arm IS the FOLD-LEDGER wave (mints FOLD-LEDGER.json) |
| `BC.W-DECK-BUILD` | `BC.W-DECK` | the /deck subpath build wave landed as `BC.W-DECK` |
| `BC.W-WGSL-COMPILE-GATE` | `BC.W-WEBGPU-EVERYWHERE` (+ `BC.W-SAFARI-WEBGL` for the cross-engine arm) | the headless WGSL-compile floor folded into the WebGPU-everywhere substrate wave |
| `BC.W-GPU-PARITY-REAL` | `BC.W-WEBGPU-EVERYWHERE` | the real-swap-chain readback (retire the ΔE-0.0 tautology) folded into the WebGPU-everywhere wave |
| `BC.W-CONSTELLATION` | `BC.W-VIZ-CONSTELLATION` | the constellation viz wave |
| `BC.W-FOURIER-ONE` | `BC.W-VIZ-FOURIER` | the "ONE fourier view" demo redesign IS the fourier viz wave |
| `BC.W-GOOBLOB-FIRSTPRINCIPLES` | `BC.W-GOOBLOB-PLAIN` + `BC.W-GOOBLOB-MEATBALL` | the goo-blob from-first-principles rebuild is the two-stage pair |
| `BC.W-SLIDES` | `BC.W-CUT` | the slides redeploy is an EXECUTION-phase clause of the cut wave |
| `BC.W-DECK-BUILD` (deck page-turn) | `BC.W-DECK` | the deck PAGE-TURN primitive lands inside the /deck build |
| `BC.W-LEAF-MODERNIZE` / `BC.W-CONSUMER-MODERNIZE` | `BC.W-SPEEDTEST-ADOPT` / `BC.W-FOURIER-ASK` / `BC.W-ATLAS-ASK` | the leaf/consumer modernization is driven by the three per-sibling adopt waves |
| `BC.W-DEPLOY` | `BC.W-CUT` | the deploy is an EXECUTION-phase clause of the cut wave |
| `BC.W-DEMO-DESIGN` | `BC.W-STORYBOOK-META` | the demo-design / storybook-meta pane work |
| `BC.W-CARD-PAD` (as a BC disposition) | `BC.W-PADDING-CANON` | `W-CARD-PAD` is the BB wave name; the BC padding-ladder wave is `BC.W-PADDING-CANON` |
| `BC.W-AUDIT` (PM-BA prose) | n/a (the iteration-0 audit commit `e1b4b44c`) | NOT a wave — a pre-fix commit label from the iteration-0 `bc-audit.mjs` run; reworded to name the commit, not a phantom wave |
| `BC.W-VISUAL-RECONCILE` | **`BC.W-VISUAL-RECONCILE` (AUTHORED — Band 4, iteration-4 HARDEN)** | the PLAN-§64 gap is CLOSED: iteration-4 authored the dedicated Band-4 wave (the BB liquid-glass-band live re-walk: liquid-reveal/lensing/liquidhover/press-unify/card-composite/metal-shimmer/on-glass-fg/invalid-ring/eyebrow-union re-verify over the rebuilt floor) + it owns the USER-DEFECTS §C buttons-INTERACTION diagnosis BC.W-BUTTON-GLASS-IOS line 6 punts + the re-open home BC.W-DIALOG-GLASS lines 60-61 name. The dispositions that map to a SPECIFIC band wave STAY re-pointed (menu-glass→Band 1 glass, easing→`BC.W-VIZ-FOURIER`/motion, demo-config→`BC.W-STORYBOOK-META`); the residual "BB visual-band reconcile" home is now this real wave (no longer a CHALLENGE gap — F2 resolves on it). |
| `BC.W-CSS-CRITICAL` / `BUILD (Band 8/perf)` / `Band 4 controls/reconcile` (the perf-chronic band-only dispositions) | **the Band-11 perf trio `BC.W-CSS-CRITICAL` + `BC.W-LIGHTHOUSE` + `BC.W-PERF-PRODUCER` (AUTHORED — iteration-4 HARDEN)** | the 3-4-tranche perf chronic (`w-lighthouse-perf` / `styles-critical-split` / the BB Batch-3 perf band) was disposed BUILD against the SAFARI band (Band 8) or a band-only "Band 8/perf" / "Band 4 controls/reconcile" with NO building wave (CHALLENGE-1 BLOCKER 4/5/7). iteration-4 authored Band 11 — PERFORMANCE: `BC.W-CSS-CRITICAL` (the `/styles` split, the `styles-critical-split` discharge — FOLD-LEDGER F7's destination is now real), `BC.W-LIGHTHOUSE` (the live score-floor + `--rebaseline`), `BC.W-PERF-PRODUCER` (the four producer fixes + the runtime π). Re-point every perf-chronic ledger BUILD row + the FOLD-LEDGER F7 `styles-critical-split` destination onto these three. (kf-G3 LabeledField action-slot + machined-groove stay their controls/storybook homes — see the FOLD-LEDGER reconcile, not a perf row.) |
| `BC.W-DOCK-EDGE` (PLAN §54 "rim/border as catch-light, not the black hairline") | `BC.W-BLACK-BAR` | the card/dock top-edge dark-rim → bright-catch-light D2-root fix landed as `BC.W-BLACK-BAR` (the PLAN working-name; the authored wave folds the glass-rim fix) |
| `BC.W-PROMPT-LEDGER` (PLAN §69/§95 "every user prompt mapped to delivered/undelivered") | the `PROMPT-LEDGER.md` doc + the Band-F PM wrappers (`BC.W-PM-BB`/`BA`/`AZ`/`SYNTHESIS`) | NOT a separate on-disk wave — the prompt-recap deliverable IS the `PROMPT-LEDGER.md` document, authored by the Band-F post-mortem work; the dropped-asks ownership routes through the PM wrappers + the per-defect band waves |

> Note on prior-tranche wave names: references like `W-DARK-MATERIAL`, `W-REFLECT3`, `W-CLOSE-BATTERY`,
> `W-VISUAL-RUNNER`, `W-CARD-PAD`, `W-AURORA-SWRASTER`, `W-MENU-GLASS`, `W-ON-GLASS-FG`, `W-CSS-CRITICAL`
> (NO `BC.` prefix, or with the `BC.` prefix only where they name a BC fold-SOURCE) are AX/AY/AZ/BA/BB
> tranche waves — they are the forensic SUBJECTS, not BC waves, and are correct as-is.
