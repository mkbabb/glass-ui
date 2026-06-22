# BF.W-SAFARI-CAPTURE — validate every liquid surface on WebKit (the twice-asked Safari validation)

**Band 5 · Tier T8 · depends: W-DOCK-INTEGRATE (T4) · the fidelity/feel waves (T4-T7 — Safari validates the surfaces it follows)**

## The defect / the ask

The user asked TWICE — "validate that all morphing works on Safari" (R17, asked 2×). At BE close it is **NOT DONE** (R17 status verbatim, DEFERRED-CENSUS **D7** `chronic ✓`):

1. **WebKit only validates the BC set.** Read `tests-visual/playwright.config.ts:117-126` — the `webkit` project's `testMatch` is hardcoded to TWO specs: `["safari-webgl.spec.ts", "aurora-swraster.spec.ts"]` (the "narrow BC set" the SEED names). Every BE liquid surface — the fission goo neck, the bloom-up FLIP, the Now-Playing pill, the dock rail facets, the lensing — runs ONLY on `chromium-headless-new` + `coarse-touch` (the SwiftShader/Metal Chromium projects). The whole point of R17 (Safari has the SAME `backdrop-filter: url()` absence — WebKit bug 245510, OPEN — and the SAME context-eviction model that drove the §H flash) is un-exercised on the liquid surfaces.

2. **No liquid webkit specs exist; `proof:safari-liquid` is absent.** The 5 liquid surfaces have no WebKit-binding π. `ls tests-visual/{fission,nowplaying-pill,bloom-up,dock-rail-realize,lensing-safari}.spec.ts` → the chromium shells exist only where W-PI-AUTHOR authored them (`bloom-up.spec.ts`, `dock-rail-realize.spec.ts` born-RED), and `fission`/`nowplaying-pill`/`lensing-safari` are absent. There is no `proof:safari-liquid` gate (`ls scripts/proof-safari-liquid.mjs` → absent), no `safari-support-matrix.md` recording each liquid CSS primitive's Safari-26 status + degrade fall.

3. **The CRITICAL fence the matrix must record: lens vs goo diverge on WebKit.** The lensing/deep-glass refraction uses `backdrop-filter: url(#glass-refract)` (read `src/styles/glass-refract.css:61-63,101-106` — Chromium-only, `@supports`-gated, WebKit FAILS the `url()` and degrades to the un-gated blur base). The fission goo uses the REGULAR `filter: url(#dock-fission-goo)` (read `src/styles/dock/fission-bridge.css:26-32` + `DockGooFilter.vue:19-22` — WebKit-SUPPORTED, the neck PAINTS on Safari). These are OPPOSITE Safari fates — the matrix must record each per-surface so a future agent never assumes the lens paints on Safari (it doesn't — and that's CORRECT: the material is present, the enhancement absent) nor that the goo degrades (it doesn't — it's regular `filter`, it paints).

## The mechanism

Author the 5 liquid WebKit specs, widen the webkit `testMatch` computed-from-disk to enroll them, gate them with `proof:safari-liquid`, and record the per-surface support matrix. NO library `src/` paint (this wave validates the surfaces the integrate/fidelity/feel waves shipped); the binding truth is the WebKit paint + the matrix.

1. **Author the 5 liquid WebKit specs (`tests-visual/`).** Each is the BC `safari-webgl.spec.ts` cross-engine house shape (a frame-series region-readback over the demo route, the `meanLum`/`pngRegionStats` measured assertion, the no-flash floor, the console-silence bound), authored to run on the `webkit` project:
   | spec | the WebKit-binding readback | the Safari fate it asserts |
   |---|---|---|
   | `fission.spec.ts` | the goo neck PAINTS on Safari — drive `split()` over the fission surface, scan the mid-pinch throat for continuous warm-cream alpha (the sRGB-interpolated regular `filter: url()` reads right — NOT the linearRGB-wrong waist) | regular `filter: url()` — PAINTS |
   | `nowplaying-pill.spec.ts` | the `<DockNowPlaying>` pill reads as ONE seamless liquid-glass module at rest + carves on split — the glass blur+saturate+tint base paints (the material present), the rest pill no concave waist | `backdrop-filter: blur()` base PAINTS; lens absent-but-invisible |
   | `bloom-up.spec.ts` (webkit arm) | the pill→sheet bloom FLIP runs on WebKit (transform-matrix scale-from-source, no fly-in) — compositor transform, WebKit-supported | transform FLIP — PAINTS |
   | `dock-rail-realize.spec.ts` (webkit arm) | the expanded facet carousel fans with distinct per-facet `--glass-accent` hues, `deltaW=deltaH=0` box-inviolate — transform/opacity/color-mix, all WebKit-supported | transform + color-mix — PAINTS |
   | `lensing-safari.spec.ts` | the lens DEGRADES gracefully on WebKit — the `@supports (backdrop-filter: url())` block is false on WebKit, so the surface paints the CLEAN blur+tint base (NOT a broken `url()` artifact, NOT an un-styled box); the glass material is present, only the refraction enhancement absent | `backdrop-filter: url()` — FAILS WebKit (bug 245510) → blur base degrade |

   The `bloom-up`/`dock-rail-realize` specs already exist (W-PI-AUTHOR authored the chromium shells webkit-runnable); this wave authors `fission`/`nowplaying-pill`/`lensing-safari` and confirms the bloom/rail specs run on webkit. Each spec includes the **no-flash assert** (the §H storm killed — the frame-to-frame meanLum variance stays below the flash floor, the BC `FLASH_STD_FLOOR` precedent) + the **console-silence assert** (the `webglcontextlost` count over the window is bounded — a single GPU-TDR heal is fine, a storm is not). LIVE motion (never `reducedMotion` — the capture-hides-motion class the BC anti-disease law kills).

2. **Widen the webkit `testMatch` COMPUTED-FROM-DISK (the anti-hand-list discipline).** Read `playwright.config.ts:117-126` — the webkit `testMatch` is the hardcoded BC 2-spec array. Re-express it computed-from-disk: a small shared **`tests-visual/safari-enroll.mjs`** (the `pi-runner-manifest.mjs` precedent) enumerates the cross-engine + liquid-WebKit spec set from disk (a tagged-from-disk glob — the specs that declare a `@webkit`/cross-engine marker, OR a declared INCLUDE list with a one-line rationale per row that auto-picks up a new liquid spec the moment it lands), and the config imports it: `testMatch: safariEnroll()`. So a new liquid WebKit spec is enrolled the moment it lands — no config edit (the W-PI-AUTHOR computed-from-disk enrollment precedent). The BC 2 specs stay enrolled (the cross-engine union — `proof:safari-webgl` S4 stays GREEN by construction). The `webkit` project's `devices["Desktop Safari"]` + 1280×800 viewport are UNTOUCHED.

3. **`proof:safari-liquid` (the source gate).** A new device-free gate (the `proof:safari-webgl` / `proof:dock-rail-realize` house shape — comment-strip, pure detector, self-test bites, born-RED on the BC tree):
   - asserts the 5 liquid specs EXIST + are webkit-enrolled (the `testMatch`/`safari-enroll.mjs` reaches them);
   - asserts the testMatch is computed-from-disk (NOT a re-hand-listed array — the orphan bite);
   - asserts `safari-support-matrix.md` EXISTS with one row per liquid surface (the per-primitive Safari-26 status + degrade fall);
   - asserts the CRITICAL divergence: the matrix records the LENS (`backdrop-filter: url()`) as FAILS-WebKit-degrades-to-blur AND the GOO (regular `filter: url()`) as PAINTS-on-WebKit — a matrix that records the lens as PAINTS (the wrong-assumption class) REDS;
   - asserts every load-bearing `backdrop-filter: url()` in `src/styles` stays `@supports`-gated (re-asserts `proof:safari-webgl` S5 — the un-gated lens that breaks Safari glass to an un-styled box).
4. **`safari-support-matrix.md` (`docs/tranches/BF/audit/safari-support-matrix.md`).** ONE row per liquid surface: `surface · CSS primitive · Safari-26 status · degrade fall`. The binding rows:
   | surface | CSS primitive | Safari-26 status | degrade fall |
   |---|---|---|---|
   | fission goo neck | regular `filter: url(#dock-fission-goo)` | SUPPORTED (sRGB-interpolated, generous region) | none — PAINTS |
   | Now-Playing / dock glass | `backdrop-filter: blur() saturate()` | SUPPORTED (Safari 9+) | none — PAINTS the material |
   | lens / deep-glass refraction | `backdrop-filter: url(#glass-refract)` | FAILS (WebKit bug 245510, OPEN) | `@supports`-false → clean blur+tint base (material present, refraction absent) |
   | bloom-up FLIP | `transform` matrix FLIP | SUPPORTED | none — PAINTS |
   | rail facets | `transform`/`scale`/`opacity` + `color-mix(in oklab)` | SUPPORTED | none — PAINTS |
   | jubilance ripple/splash | `mix-blend-mode: plus-lighter` | SUPPORTED (Safari 16.4+) | pre-16.4 → plain warm overlay (no blowout) |
   The matrix is the recorded discipline a future agent reads BEFORE assuming a primitive paints on Safari.

## The gate — proof:safari-liquid (born-RED → GREEN)

Device-free SOURCE arm, `["local","ci"]` (the binding paint is the WebKit π; `release` re-earns once the π is GREEN — D32). The headless CI arm proves the WIRING (specs enrolled, matrix present, the divergence recorded); the LOCAL real-WebKit `--run pi` GREEN is the binding PAINT (the `proof:visual-runner` CI-proves-wiring/local-proves-paint split). Comment-strips first; exports a pure detector.

- **C1 — the 5 liquid WebKit specs EXIST + are webkit-enrolled.** `tests-visual/{fission,nowplaying-pill,lensing-safari}.spec.ts` exist (the 3 this wave authors); `bloom-up.spec.ts`/`dock-rail-realize.spec.ts` exist (W-PI-AUTHOR) + are webkit-runnable; the webkit `testMatch` (via `safari-enroll.mjs`) reaches all 5. A missing spec OR a spec not enrolled REDS.
- **C2 — the `testMatch` is COMPUTED-FROM-DISK, not a re-hand-listed array.** `playwright.config.ts` imports `safariEnroll()` (or equivalent disk-computed enrollment) for the webkit `testMatch`; a hardcoded literal array of spec names REDS (the re-hand-list orphan bite — a new liquid spec must auto-enroll). The BC 2 cross-engine specs stay in the union (`proof:safari-webgl` S4 GREEN).
- **C3 — `safari-support-matrix.md` EXISTS + records every liquid surface.** The matrix file exists with ≥6 rows (one per liquid surface), each carrying `CSS primitive · Safari-26 status · degrade fall`. A missing matrix OR a surface with no row REDS.
- **C4 — the CRITICAL lens-vs-goo divergence is RECORDED CORRECTLY.** The matrix records the LENS (`backdrop-filter: url()`) as FAILS/degrades-to-blur AND the GOO (regular `filter: url()`) as PAINTS. A matrix that records the lens as PAINTS (or omits the WebKit-bug-245510 degrade) REDS — the wrong-assumption class the matrix exists to fence.
- **C5 — no un-gated `backdrop-filter: url()` in `src/styles` (re-asserts `proof:safari-webgl` S5).** Every load-bearing SVG-lens `backdrop-filter: url()`/`-webkit-backdrop-filter: url()` lives inside an `@supports (backdrop-filter: url(...))` block (the Safari degrade floor). A load-bearing un-gated lens REDS (it would break Safari glass to an un-styled box).

**Self-test bites (each planted defect MUST red):** (a) a missing `fission.spec.ts` → C1 RED; (b) a liquid spec not reached by the webkit enrollment → C1 RED; (c) a hardcoded `testMatch: ["..."]` literal array → C2 RED; (d) a missing matrix row for a liquid surface → C3 RED; (e) a matrix recording the lens as PAINTS-on-WebKit → C4 RED; (f) a planted un-gated `backdrop-filter: var(--glass-refract-filter)` → C5 RED.

**What reds on the pre-fix tree (BC/BE):** C1 (3 of 5 liquid specs absent, none webkit-enrolled), C2 (the testMatch is the hardcoded BC 2-spec literal), C3 (no `safari-support-matrix.md`), C4 (the divergence un-recorded).

## The binding π — the 5 liquid WebKit specs (the meta-case)

This wave's deliverable IS the WebKit-binding π layer. Each spec runs on the `webkit` project (`devices["Desktop Safari"]`, the closest CI-runnable Safari proxy) AND the chromium project (the no-regression mirror — the breaker/degrade did not break the healthy Chrome path):

- **`fission.spec.ts` (webkit):** over the fission surface (`DynamicIslandCall.vue`/`<DockNowPlaying>`), drive `split()` and scan the mid-pinch throat for continuous warm-cream alpha — the sRGB-interpolated regular `filter: url(#dock-fission-goo)` reads the goo neck RIGHT on Safari (NOT the linearRGB-wrong waist). The no-flash assert (no §H strobe across the split). Both modes.
- **`nowplaying-pill.spec.ts` (webkit):** the `<DockNowPlaying>` pill reads ONE seamless liquid-glass module at rest (the `backdrop-filter: blur() saturate()` material present), carves on split. The no-flash + console-silence asserts.
- **`bloom-up.spec.ts` (webkit arm):** the pill→sheet bloom FLIP runs on WebKit (a transform-matrix scale-from-source captured at t≈0.3, scale < 1, origin at the pill — no fly-in). Compositor transform, WebKit-supported.
- **`dock-rail-realize.spec.ts` (webkit arm):** the expanded facet carousel fans with distinct per-facet `--glass-accent` hues + `deltaW=deltaH=0` box-inviolate, both orientations. color-mix + transform, WebKit-supported.
- **`lensing-safari.spec.ts` (webkit):** the lens DEGRADES gracefully — with `@supports (backdrop-filter: url())` false on WebKit, the `.glass-lens` surface paints the CLEAN blur+tint base (NOT a broken `url()` artifact, NOT an un-styled box). The material is present, only the refraction enhancement absent — a control chromium run reads the refraction (the rim-bend), the webkit run reads the clean blur base (no broken-filter artifact). The §H no-flash floor.

CI proves the WIRING (the specs enrolled via the computed `testMatch`); the LOCAL real-WebKit `--run pi` GREEN is the binding PAINT.

## The gestalt row

**BF-roster surfaces: the liquid surfaces re-verified on WebKit (`dock-fission`/`dock-nowplaying`/`bloom-up`/`dock-rail-realize`/`lensing` — their Safari arms).** The verdict requirement: the SAME BF-roster surfaces' verdicts re-earned on a FRESH WebKit capture (the webkit project) — the goo necks, the bloom blooms, the facet carousel fans, the lens degrades clean, NONE flash. Born-FAIL on the BE tree (no WebKit validation at all); flips PASS at W-REFLECT on fresh WebKit pixels. (The chromium-project verdicts are the integrate/fidelity waves'; this wave adds the Safari verdict to each liquid roster row.) Wired into the BF roster by W-GESTALT-WIRE. **The MANUAL real-Safari-26-on-Metal goo p50 budget is W-GOO-SPLIT-PERF's (T9)** — this wave is the automatable WebKit-proxy validation; the real-device perf number is the next wave.

## Fences

- **No-legacy / no-workaround.** The lens degrade is the HONEST `@supports`-false fall to the blur base (the material present) — NOT a Safari-specific hack, NOT a JS polyfill of `backdrop-filter: url()`. The matrix records "lens absent on Safari" as the CORRECT outcome (the enhancement is progressive; the material is the floor on all engines). No second Safari-only code path.
- **No re-fork.** The 5 specs reuse the BC `safari-webgl.spec.ts` cross-engine house shape (the `meanLum`/no-flash/console-silence machinery); the `testMatch` widen reuses the `pi-runner-manifest.mjs` computed-from-disk enrollment discipline — no new test harness, no second enrollment source.
- **Presets-in-consumers.** The specs capture the demo surfaces (the demo hues/backdrops); the matrix records the LIBRARY primitives' Safari status (the warm-cream identity), never a consumer preset.
- **The specific anti-pattern this must NOT become:** a webkit `testMatch` that re-hardcodes the liquid spec names (the array drifts the moment a 6th liquid surface lands — the gate asserts computed-from-disk), OR a matrix that claims the lens "works on Safari" (the wrong-assumption that a future agent ships an un-gated lens on — the gate asserts the lens row records FAILS/degrades). CI proves the wiring; the LOCAL real-WebKit paint is the binding truth (never invert — a `ci`-tagged real-GPU WebKit morph spec is the flaky-CI class).

## Disposition links

- **D7** — Safari/WebKit ZERO real verification (asked 2×; Tier-5 absent; `proof:safari-liquid` absent; webkit `testMatch` = BC set) → BUILD: the 5 liquid WebKit specs + the computed-from-disk `testMatch` widen + `proof:safari-liquid` + the `safari-support-matrix.md`. CLOSED (the automatable WebKit-proxy validation).
- **D8 / D24** — the MANUAL real-Safari-26-on-Metal goo-fission p50 budget + the real-Metal cross-backend capture-pair → DEFER-with-trigger, re-enters with **W-GOO-SPLIT-PERF** (T9, the orchestrator's real-device-π — this wave's WebKit-proxy validation is the prerequisite that the surfaces PAINT before the perf number is measured).
- **R17** — validate that all morphing works on Safari (asked 2×) → the 5 liquid surfaces run on the webkit project + carry a matrix row + a recorded degrade fall (§6 Safari-first precept). CLOSED (the WebKit-proxy half; the real-device p50 is W-GOO-SPLIT-PERF's).
