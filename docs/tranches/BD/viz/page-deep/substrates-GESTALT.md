# Pass-E substrates GESTALT — the category challenger (all 11 syntheses folded)

**Supersedes** `substrates-GESTALT-orch-partial.md` (which folded only chunk-1: aurora·blob·constellation·fourier). This is the FULL 11-page fold: + glass-material·glass-panel·dot-flow-field·concentric (chunk-2) + paper-grid·dot-matrix·goo-dot (chunk-3).
**Pages synthesized (11):** aurora · blob · constellation · fourier-field · glass-material · glass-panel · dot-flow-field · concentric · paper-grid · dot-matrix · goo-dot.
**Note on "3 pages":** the live `substrates` storybook category nominally lists 3 marquee routes, but the Pass-E corpus audits all 11 substrate vizzes/surfaces. This gestalt binds the 11.

---

## 0. The one-breath category verdict (the ruthless read)

**The substrate COMPONENTS are sound — uniformly. The substrate DEMOS are broken spec-sheets, and a documented number of them DON'T PAINT.** Eleven pages, ONE shape: every component lens returns KEEP (aurora "excellent + essentially done", concentric "the cleanest member of the suite", fourier "healthy", blob/dot-flow/dot-matrix/goo-dot "architecturally exemplary", paper-grid "a BC exemplar"), while every demo+design lens returns the SAME systemic defect set — the viz doesn't paint at resolution, the page is a flat single-card configurator inspector, the glass floats over a dead near-white field, the giant sticky hero crashes through the stage, no dock APIs, over-written shouting copy.

The category is **NOT close** (weighted ~33%), but it is **fully mapped and bounded**: every structural defect FOLDS into a small set of Band-16/17 demo-chassis waves that are ALREADY NAMED, and the per-page redesign is mechanical chassis ADOPTION once those waves land. The risk is concentrated entirely in (a) authoring the FIVE prose-only chassis waves into real specs with real π gates, and (b) the ONE genuine substrate bug (the 300×150 canvas) — NOT in discovering new defects. All 11 syntheses converged cleanly; zero cross-lens contradictions survive.

---

## 1. BRAINSTORM — what was DONE vs what REMAINS

### DONE (landed / authored / proven — the foundation the category builds ON)
- **`<VizStudio>` exists** (`demo/stories/substrates/VizStudio.vue`) and aurora is migrated onto it (the reference shape: stage-LEFT / configurator-RIGHT / preset row / `<ColorSwatch>` / shrink-hero). It is the template the 10 laggards adopt.
- **The shared StoryPage chassis exists** (`StoryPage`/`StoryHeader`/`StoryHero`/`StorySection`/`ShowcaseFrame`) — the single-writer seam every fix lands ONCE in.
- **The 300×150 root cause is TRACED** (PROTOTYPE-FIXES FIX 5, live-confirmed `/substrates/blob`): `createCanvasLifecycle`'s caller-`resize()` reads the box at ARM-time (0/default under the StoryHero/demo-scroller deferred-arm-vs-zero-extent-flex race) with **no re-fire when the box later resolves**. aurora-on-VizStudio sizes; the hand-rolled blob/constellation/fourier/dot-flow/dot-matrix/goo-dot/paper-grid mounts do not. This is no longer a hypothesis — it is a confirmed, located defect.
- **The colorful-field precedent is PROVEN** (PROTOTYPE-FIXES FIX 4, live-verified `/dock/overview`): `DockStage` default flipped `DEFAULT_AURORA_CONFIG` → `PRESETS.OPENAI_SKY` + `opacityCeiling` 0.42→0.55 → the dock glass reads as liquid glass over a vibrant field. The substrates band inherits this exact move.
- **Most chassis waves EXIST as specs:** `W-CONFIG-GALLERY-DOCK`, `W-PAGE-BACKGROUND`, `W-PAGE-CHASSIS`, `W-PRESET-RENDER`, `W-DOTFLOW-REBUILD`, `W-VIZ-CONFIGURATOR`, `W-STICKY-TITLE-CONDENSE`, `W-HEADER-SCALE`, `W-PAPER-MORPHISM`, `W-DOT-UNIFY`, `W-CONSTELLATION-STUDIO`, `W-VIZ-PERF-BUDGET`, `W-VIZ-PARITY-METAL`, `W-VIZ-PRESENCE`, `W-MISSED-SLAB-CENSUS`, `W-PAGE-OFFTOKEN-SWEEP`, `W-CROSSREPO-ADOPT-SWEEP`, `W-BC-COMPONENT-CANON`, `W-DESIGN-LANGUAGE-CONGRUENCE`.

### REMAINS (the gap surface — the actual work)
**A. Author FIVE prose-only waves into real specs (the binding gap — they have ZERO spec files at HEAD):**
1. **`W-STORY-PAGE-STANDARD`** — the standardized `<StoryPage>` chassis + the `<DemoStage>`/`<DemoSpecimen>`/`<DemoInteraction>`/`<DemoMatrix>`/`<DemoComposition>` sub-type taxonomy. **This is the spine of the entire category** — 9 of 11 pages fold the bulk of their defects into it. Named everywhere; authored nowhere. **The single highest-leverage authoring task.**
2. **`W-LIQUID-ENTRANCE-GENERAL`** (Band 17) — the iOS-27 squish/morph/fade generalized to every surface entrance + the pronounced ≈0.88 volume-preserving squish + Safari `filter` blur-settle. The aliveness binding for the glassy-sub-card entrances.
3. **`W-VIZ-WGPU-RESIZE`** (Band 3, the ONE genuine substrate src wave) — the dot-matrix-surfaced WebGPU `context.configure` swap-chain re-size on first-non-zero measure + the cross-engine `useIntersectionPause` offscreen-park rider. ≥2 consumers (dot-matrix + dot-flow-field). **The category's only net-new substrate gate.**
4. **`W-PRESET-THUMB-FALLBACK`** (Band 16, the ONE genuine demo src bug aurora surfaced) — the dead preset-thumbnail fallback (WebGPU `armAsync` async-throw uncatchable by sync `try` + released-swap-chain `toDataURL` → 13 dead Skeletons; fall back WebGL2 → `auroraFallbackGround` CSS raster). Composes `W-PRESET-RENDER`.
5. **`W-GLASS-MATTER-COMPOSE`** (Band 16, glass-material's lone net-new) — the demo-only dock/tabs/animation composition for the six-layer-composite gallery (`<SegmentedTabs>`/`<DockStack mode="facets">`/`.scroll-cascade`/`useLiquidPress`/the `--glass-depth` `@property` morph).

**B. Land the confirmed substrate fix:** the `createCanvasLifecycle`/`useWebGLCanvas`/`useGpuSubstrate` resize-re-fire (a ResizeObserver on the canvas BOX that re-sizes the buffer to `box*dpr` on every box change, not just at arm) — the WebGL2/Canvas2D half is the traced FIX 5; the WebGPU half is `W-VIZ-WGPU-RESIZE`. **Distinction (load-bearing):** for WebGL2 mounts the `<DemoStage>` resolved box is EXPECTED to fix it as a side effect (blob/fourier/constellation/dot-flow-WebGL2); for born-WebGPU mounts (dot-matrix) it stays blank even in a resolved box because `context.configure` never re-fires — so dot-matrix needs the real substrate wave, not just the chassis box.

**C. Execute the laggard migration roster (10 of 11 pages, loop 2):** every page except aurora ADOPTS `<VizStudio>`/`<DemoStage>` — glassy sub-cards, full configurator, colorful palette lead, demoted hero, tight copy, dock contextual-switch. paper-grid·dot-flow·dot-matrix·goo-dot are the four PRE-VizStudio orphans (still on the bare `ShowcaseFrame`/`<Switch>` shape); blob·concentric·fourier·glass-panel are the RAW-`<Configurator>`-fork twins; glass-material is the no-foreground-field special case.

**D. Two clean-break PRUNEs (the migration-zombie class):**
- **constellation `drawOverlay`** — a post-GPU-migration zombie (inert prop + full TS contract + ~10 doc paragraphs, ZERO call sites; the demo's focal/anomaly/warp marks paint into a retired 2D context). Clean-break retire under `proof:no-dual-path`; re-author the marks as REAL GPU/DOM siblings off the public `field.warp.{x,y}` seam.
- **glass-panel `<GlassPanel>` + `useGlassRenderer`/`createGlassFilter` cluster + `/glass-panel` subpath** — a dead component (zero in-repo consumers, a provably-false "live keyframes.js consumer" canon, a Chromium-only Canvas2D refraction DUPLICATE of `.glass-lens`). Co-prune behind the green-handshake + registry probe; the import-label re-flip (`/glass-panel`→`/styles`) MUST land in the SAME cut.

**E. goo-dot dead Register-B** — `dot-lattice`/`dot-sphere`/`gooDotLattice.ts`/`cols`/`flowAmt` are exported-but-dead (the no-dual-path violation). FOLDS into `W-DOT-UNIFY` (the unify deletes the dead path AND makes `cols`/`flowAmt` the REAL `projection="grid|sphere"` axis) — unify-not-hand-prune (hand-pruning first is wasted motion).

---

## 2. CROSS-PAGE PATTERNS — the shared-chassis fixes vs the per-page

### The SHARED-CHASSIS classes (one edit → N pages — the KISS/DRY lever)

| Class | Pages affected | Owner wave | Status |
|---|---|---|---|
| **[BROKEN] 300×150 canvas doesn't paint** | blob · constellation · fourier · dot-flow · dot-matrix · goo-dot · paper-grid · concentric (8/11) | `<DemoStage>` box (W-STORY-PAGE-STANDARD) for WebGL2; **`W-VIZ-WGPU-RESIZE`** for born-WebGPU | **AUTHOR + LAND** (FIX 5 traced) |
| **Flat single-card / raw-`<Configurator>` fork (no VizStudio)** | blob · concentric · fourier · paper-grid · dot-flow · dot-matrix · goo-dot · glass-panel (8/11) | `W-CONFIG-GALLERY-DOCK` + `W-STORY-PAGE-STANDARD` §DemoStage | AUTHOR (STANDARD) + MIGRATE |
| **No glassy sub-cards / main card not BIGGER** | all 11 | `W-STORY-PAGE-STANDARD` §glassy-sub-card + §stage-size | AUTHOR + ADOPT |
| **Glass over a dead/flat field (no colorful aurora)** | all 11 (glass-panel + blob self-stage but LOW-FI/monochrome) | `W-PAGE-BACKGROUND` (FIX-4 colorful precedent) | EXISTS — extend |
| **Giant sticky hero crashes through the stage / triple-name** | aurora · blob · concentric · fourier · dot-flow · dot-matrix · goo-dot · paper-grid · glass-material (9/11) | `W-HEADER-SCALE` + `W-STICKY-TITLE-CONDENSE` + `W-PAGE-CHASSIS`/`W-PAGE-HEADER-FOLD` | EXISTS — cite worst-cases |
| **Zero dock / contextual-switching APIs** | all 11 | `W-STORY-PAGE-STANDARD` §drive-the-APIs + `W-CONFIG-GALLERY-DOCK` (facet rail) | AUTHOR + ADOPT |
| **Static chrome entrance / hard-cut preset swap** | all 11 | `W-LIQUID-ENTRANCE-GENERAL` (Band 17) + `.scroll-cascade` | AUTHOR + ADOPT |
| **Superfluous shouting copy / dev-speak / leaked jargon** | all 11 (constellation `--ncsu-red`/`π`/`AY.W-CON*`; goo-dot the worst, 1182-char ALL-CAPS) | `W-STORY-PAGE-STANDARD` §copy-discipline + `W-PAGE-OFFTOKEN-SWEEP` | AUTHOR + SWEEP |
| **PAPER register absent** | aurora · concentric · fourier · glass-material · glass-panel · paper-grid (the math/paper-apt pages) | `W-PAPER-MORPHISM` (concentric + fourier the strongest GLASS+PAPER homes) | EXISTS — extend |

**The dominant insight:** 8 of the 9 cross-page classes are ONE-chassis-and-propagate. The substrates band is a textbook instance of the ADDENDUM's KISS/DRY mandate — per-page bespoke is the anti-pattern; the single-writer chassis is the fix. The category's defect surface is LARGE but its FIX surface is SMALL (≈5 authored waves + 10 mechanical adoptions + 2 prunes).

### The genuinely PER-PAGE arm (does NOT propagate)

| Page | Per-page item | Action |
|---|---|---|
| **aurora** | dead preset thumbnails (async-throw + released swap-chain) | **NEW `W-PRESET-THUMB-FALLBACK`** |
| **dot-matrix** | born-WebGPU canvas stays blank even in a resolved box (`context.configure` never re-fires) | **NEW `W-VIZ-WGPU-RESIZE`** |
| **glass-material** | the six-layer-composite gallery composes near-zero showcase components | **NEW `W-GLASS-MATTER-COMPOSE`** |
| **constellation** | `drawOverlay` migration-zombie + stale PROCEDURAL-SUITE row + 3 per-frame hot-loop defects | PRUNE (`W-MISSED-SLAB-CENSUS`) + doc-resync (`W-PRECEPT-CANON`) + `W-VIZ-PERF-BUDGET` |
| **glass-panel** | `<GlassPanel>` dead-component co-prune + false canon + `.glass-lens` per-rung blur-collapse regression | PRUNE (`W-CROSSREPO-ADOPT-SWEEP`) + `W-BC-COMPONENT-CANON` + AUGMENT `W-LENSING` |
| **goo-dot** | dead Register-B (`dot-lattice`/`dot-sphere`/`gooDotLattice.ts`) | FOLD → `W-DOT-UNIFY` (unify-not-hand-prune) |
| **fourier** | BUG-2 harmonics-N slider fill overflows track at low N; PROCEDURAL-SUITE stale row | MODIFY `W-CONFIG-GALLERY-DOCK` rider + `W-PRECEPT-CANON` |
| **dot-flow** | inert `coherence` config field (wire-or-prune); triple-wired `useDotFlowField` config | MODIFY `W-BC-COMPONENT-CANON` |
| **dot-matrix** | dead `FBM_ROT` GLSL const | PRUNE → `W-MISSED-SLAB-CENSUS` |

### Two NET-NEW cross-page sweeps surfaced by the gestalt (NOT in the per-page lists)
- **The migration-zombie CENSUS (constellation surfaced it; the gestalt generalizes it).** constellation's `drawOverlay` is a dead 2D-era seam left behind by a Canvas2D→GPU migration. The category challenger asks: do the OTHER migrated vizzes carry analogous dead 2D-era seams? → ENROLL a band-wide migration-zombie census row in `W-MISSED-SLAB-CENSUS` (sweep aurora/blob/dot-* for dead `drawOverlay`-class props + `proof:no-dual-path` SUPERSEDED_SET entries). goo-dot's dead Register-B is the second confirmed instance — the class is REAL, not a one-off.
- **The DOC-RESYNC co-land (constellation + fourier both surfaced it).** PROCEDURAL-SUITE.md still records constellation as "Canvas2D / DO NOT MIGRATE" and fourier as "Canvas2D / DO NOT MIGRATE / fourier-studio.vue" — BOTH false post-BC (both are WebGPU-first now), contradicting gpu-parity-table.md. → co-land BOTH stale rows in `W-PRECEPT-CANON` (one resync, not two).

---

## 3. THE TRANCHE FOLD — consolidated wave amendments + NEW waves

### NEW waves (5 — author into real specs with real π gates)
| Wave | Band | Surfaced by | Gate (sketch) |
|---|---|---|---|
| **`W-STORY-PAGE-STANDARD`** | 16 | 9/11 pages | every page composes `<StoryPage>` + a sub-type (no bespoke scaffold); conformity invariants hold (glassy sub-cards · header-rule · colorful background · bigger φ²-stage) WHILE sub-type content is free; **the `<DemoStage>` resize π — a 300×150-stuck canvas REDS**; the opaque/isolated paint-floor (no hero bleed-through) REDS. The SPINE wave. |
| **`W-LIQUID-ENTRANCE-GENERAL`** | 17 | all 11 (entrance) | π frame-series: squish (scale≠1 + volume-preserving ≈0.88) + fade (coupled) + settle (overshoot), BOTH engines (Chromium + Safari `filter` blur-settle). |
| **`W-VIZ-WGPU-RESIZE`** | 3 | dot-matrix (+ dot-flow) | `proof:wgpu-resize` — a born-WebGPU viz mounted offscreen-then-revealed ends with `backing.w == clientWidth*dpr` (a 300×150 buffer REDS); ≥2 consumers (dot-matrix + dot-flow-field); + the cross-engine `useIntersectionPause` `"off-screen-io"` offscreen-park rider (Safari/FF). |
| **`W-PRESET-THUMB-FALLBACK`** | 16 | aurora | `proof:preset-thumb-fallback` — every preset key resolves a NON-empty thumbnail (WebGPU OR WebGL2 OR the `auroraFallbackGround` CSS raster); the async-reject path is CAUGHT (self-test plants a forced-WebGPU-reject → a non-empty thumbnail still lands); `onInitError` wired. Composes `W-PRESET-RENDER`. |
| **`W-GLASS-MATTER-COMPOSE`** | 16 | glass-material | demo-only, ZERO src: contextual-switch facet count ≥5 · `.scroll-cascade` entrance on the matrix · `--glass-depth` animates on the deep toggle (π readback, not presence) · ≥1 dock-API consumed. |

### MODIFY (extend existing specs — enroll the substrate pages + their per-page riders)
- **`W-CONFIG-GALLERY-DOCK`** — enroll blob·concentric·fourier·paper-grid·dot-flow·dot-matrix·goo-dot as the "route all viz through VizStudio" roster (kill the raw-`<Configurator>`/`<Switch>` forks); + fourier BUG-2 (harmonics-N low-N fill clamp) + blob a11y-name riders.
- **`W-PAGE-BACKGROUND`** — extend with the substrates one-GL-per-route resolution: the viz IS the color event, so TINT the field's OWN lead palette to a loud warm-amber→violet `--section-color` demo preset (presets-in-consumers) rather than mount a second `<Aurora>`; for glass-material (no foreground field) + blob (`paper` manifest row), seat the `<DockStage>`-pattern contained colorful aurora. Enroll the studio frame in the background-reach π. (FIX-4 colorful precedent applies.)
- **`W-MISSED-SLAB-CENSUS`** — enroll (a) the constellation `drawOverlay` dead-prop row under `proof:no-dual-path`, (b) the band-wide migration-zombie census (sweep aurora/blob/dot-* for analogous dead 2D-era seams), (c) the dot-matrix `FBM_ROT` GLSL const delete.
- **`W-VIZ-PERF-BUDGET`** — enroll constellation's 3 per-frame defects (`getComputedStyle`-per-frame, `parseColorRGBA`×4, `edgeRows` realloc) + concentric's `contain-intrinsic-size: auto none`→`auto <reserve>` + the passive-pointer-listener riders.
- **`W-PAGE-OFFTOKEN-SWEEP`** — the import-label standardization + prose-tighten: glass-material/glass-panel chip → `@mkbabb/glass-ui/styles` (the honest material surface; glass-panel sequenced WITH the component retire); blob drop the `--motion-accent` violet masthead (suffusion-proportion restore); strip constellation's `--ncsu-red`/`π`/`AY.W-CON*` jargon.
- **`W-LENSING`** [AUGMENT] — glass-panel's `.glass-lens`-collapses-the-blur-ladder regression: the lens `backdrop-filter` must read the PER-RUNG `--glass-blur-{rung}` (not the hardcoded `--glass-blur-resting`), with an all-five-rungs-differentiated gate witness (born-RED on the live "all collapse to blur(10px)").
- **`W-BC-COMPONENT-CANON`** — glass-panel's false "live keyframes.js consumer" §Structure canon delete (at retire); dot-flow's triple-wired config collapse to ONE `getConfig` getter + the inert-`coherence` wire-or-prune decision.
- **`W-DOT-UNIFY`** — goo-dot `target="sdf"` folds onto `<DotMatrix projection×target>`; the dead Register-B EVAPORATES into the real `projection="grid|sphere"` axis (`cols`/`flowAmt` become live knobs); goo-dot is the EASIEST fold (already cross-imports `sceneDistG`+`fibonacciDot`); + the `pointerModeSign` void-call + double-DPR-read micro-fixes.
- **`W-PRECEPT-CANON`** (doc-resync) — co-land the constellation + fourier stale PROCEDURAL-SUITE rows (both WebGPU-first post-BC; the `W-CONSTELLATION-GPU`/`W-FOURIER-GPU` bookings FIRED).
- **`W-BLOB-MOTION-TUNE`** [AUGMENT] — blob's entrance bloom (third motion arm, reconciled with `W-LIQUID-ENTRANCE-GENERAL` so it rides the SAME generalized squish/settle, not a blob-local fork).
- **`W-CONSTELLATION-STUDIO`** — gate it on a live paint readback (non-zero `field.nodes`/backing-store + ≥1 non-blank px) BEFORE any chrome polish; the one-big-stage + dock-facet body.

### PRUNE (2 clean-break + 1 subsumed)
- **constellation `drawOverlay`** — clean-break retire (prop + TS contract + doc paragraphs), under `proof:no-dual-path` (`W-MISSED-SLAB-CENSUS`); re-author marks as REAL GPU/DOM.
- **glass-panel `<GlassPanel>` + `useGlassRenderer`/`createGlassFilter` + `/glass-panel` subpath** — co-prune on `W-CROSSREPO-ADOPT-SWEEP` (green-handshake + registry-probe-gated); the R8 re-label + R9 retire land in the SAME cut.
- **goo-dot Register-B** — SUBSUMED by `W-DOT-UNIFY` (not a standalone prune).

### KEEP (do not touch — unanimous across all 11 component lenses)
Every `src/` viz grammar: the six-layer glass composite + `createSpecularWriter` single-seam + `useGlassBackdropLuminance` observer budget (glass-material); the cited-SOTA math single-sources (aurora nuclei-field · concentric `ringField` · fourier epicycles · dot-flow Tessendorf/Bridson · dot-matrix Fibonacci phyllotaxis · paper-grid Golus/curlFBM · goo-dot HYBRID `sceneDistG`+`fibonacciDot`); the WGSL↔GLSL byte-parity off ONE buffer; offscreen-pause/PRM/DPR-clamp/warm-identity inherited from the ONE lifecycle leaf. **No `src/` paint on any of the 11 except the resize wave + the 2 prunes.**

---

## 4. CONVERGENCE ASSESSMENT — per page + category

| Page | Component | Demo/design | Overall | NEW wave | Loops left | Why |
|---|---|---|---|---|---|---|
| **aurora** | ~90% | ~30% | **~45%** | `W-PRESET-THUMB-FALLBACK` | 2-3 | the canonical studio exemplar; dead thumbnails + chassis adopt |
| **blob** | ~90% | ~30% | **~70%** | none | 1 redesign + 1 verify | un-converted twin of solved aurora; clean source; render hypothesis |
| **constellation** | ~90% | ~20% | **~25%** | none | 3 | 2 P0 blockers (dead paint + h1 clip) + `drawOverlay` zombie + spec-sheet |
| **fourier** | ~90% | ~45% | **~55%** | none | 1 + verify | label already compliant; healthy component; unverified paint |
| **glass-material** | ~95% (frozen) | ~20% | **~35%** | `W-GLASS-MATTER-COMPOSE` | 3 | the thesis page fails its own thesis on 3 layers; no foreground field |
| **glass-panel** | n/a (RETIRE) | ~30% | **~30%→90% after L1** | none | 1 redesign + 1 verify | field already paints (tune); + a real lens regression + a real PRUNE |
| **dot-flow-field** | ~90% | ~15% | **~25%** | (rides WGPU-RESIZE) | 3 | the band orphan; doesn't paint; never made VizStudio |
| **concentric** | ~92% | ~20% | **~30%** | none | 3 | 2 P0s (dead stage + hero bleed-through); cleanest component |
| **paper-grid** | ~85% (MED conf) | ~15% | **~20%** | none | 3 | near-invisible warm-ink over white; never made VizStudio |
| **dot-matrix** | ~90% | ~12% | **~22%** | `W-VIZ-WGPU-RESIZE` | 3 | born-WebGPU blank survives a resolved box; the substrate root cause |
| **goo-dot** | ~90% | ~15% | **~20%** | none | 3 | hybrid laggard; dead Register-B; never made VizStudio |

### Category convergence: **~33% weighted — NOT converged; needs 2-3 more loops.**

- **Component layer: CONVERGED (~90% category).** Every component lens returns KEEP; no bespoke component wave is owed across all 11. The only component-layer authoring is `W-VIZ-WGPU-RESIZE` (substrate, not a viz). This layer does NOT need another audit loop.
- **Demo/design layer: ~22% category.** The lowest-converged layer in the band — 8/11 pages are flat spec-sheets that don't paint at resolution. But ALL of it FOLDS into the systemic chassis; ZERO bespoke per-page redesign waves are owed (the 5 NEW waves are 1 spine + 1 entrance + 1 substrate + 2 narrow demo-bugs, not per-page redesigns). **ZERO-new-redesign-waves is the convergence proof** — the band is a textbook instance, not a special case.

### The pages needing MORE loops (and which KIND of loop)
- **Most loops (3): paper-grid · dot-matrix · goo-dot · dot-flow-field · concentric · constellation** — the laggards/P0-blocked. They CANNOT be re-audited meaningfully until the chassis lands AND the canvas paints (the BC anti-disease law: no source-green close, the viz must PAINT on a fresh capture). Loop kind: **DEPLOYMENT** (chassis adopt) → **HARDENING** (paint-verify on fresh capture).
- **Fewest loops (1 redesign + 1 verify): blob · glass-panel · fourier** — closest; their fields either already paint (glass-panel) or the source is clean and the chassis box is expected to fix the size (blob/fourier). Loop kind: **DEPLOYMENT** (execute the folds) → **VERIFY-ONLY** (live-confirm the bead/ladder/field paints, escalate to a renderer ResizeObserver arm ONLY on evidence).
- **The studio exemplar (aurora, 2-3): RESEARCH-light + DEPLOYMENT** — get the studio chassis RIGHT here (it is the reference all 10 inherit) + land `W-PRESET-THUMB-FALLBACK`.
- **glass-material (3): RESEARCH + DEPLOYMENT** — the thesis page; needs `W-GLASS-MATTER-COMPOSE` authored (the genuinely net-new dock/tabs/anim composition) + the foreground-field staging + the six-layer-over-color re-earn.

### The binding loop plan (category)
- **Loop 1 (AUTHOR + the substrate fix — unblocks everything):** author the 5 NEW waves into real specs with real π gates; land `W-VIZ-WGPU-RESIZE` + the traced `createCanvasLifecycle` resize-re-fire (the canvases must PAINT); land `W-PRESET-THUMB-FALLBACK`. **No visual re-audit is meaningful until the canvases paint** — the field is white/blank, the titles crash.
- **Loop 2 (DEPLOY — the laggard migration):** all 10 non-aurora pages ADOPT `<VizStudio>`/`<DemoStage>` — colorful palette lead, glassy sub-cards, full configurator, dock contextual-switch, demoted hero, tight copy; land `W-DOT-UNIFY` (goo-dot dead Register-B); land the 2 PRUNEs (constellation `drawOverlay`, glass-panel `<GlassPanel>` + re-label, green-handshake-gated); the `W-LIQUID-ENTRANCE-GENERAL` entrances; the doc-resync co-land.
- **Loop 3 (HARDEN — re-audit on FRESH captures):** the BC anti-disease law — every viz must PAINT crisp over a colorful ground, the page must read bespoke (not a spec-sheet), the dead registers must be GONE, both modes; re-earn the `proof:ba-gestalt` substrates-band verdict per page on a captured DELTA (not a commit claim). The 6 most-broken pages converge here; the 3 closest converge after their Loop-2 verify.

### The ruthless-challenger residuals (the things NOT to let slide)
1. **Do NOT close any substrate page source-green.** Every one of the 8 blank-canvas pages is the cardinal `[feedback_live_pi_oklab_paint_arm]` lesson made flesh — headless gate green, live route blank. The π MUST be a fresh live capture showing paint.
2. **The 5 prose-only waves are the real risk.** They are named across 11 syntheses but authored nowhere. If Loop 1 does not author them with REAL π gates (Pass-D bar: getComputedStyle/π-readback, runtime-render-not-blank, not presence), the whole category stalls. `W-STORY-PAGE-STANDARD` is the spine — author it FIRST.
3. **The WebGL2-vs-WebGPU resize split is NOT one fix.** `<DemoStage>` box fixes the WebGL2 mounts; dot-matrix proves born-WebGPU stays blank in a resolved box. Do not assume the chassis box closes both — `W-VIZ-WGPU-RESIZE` is a genuinely separate substrate gate.
4. **Unify goo-dot, don't hand-prune.** The dead Register-B's `cols`/`flowAmt` BECOME the unify's real lattice axis — hand-pruning then re-folding is wasted motion.
5. **The glass-panel re-label + retire MUST be atomic.** The chip is wrong BECAUSE the component is retiring; never advertise a dead subpath, never re-label before the registry probe = 0.
