# D7 — Performance from first principles (the real cost model, and where a transposition bends the curve)

**Lens:** D7 — "elegance, simplicity, and performance above all." · **Date:** 2026-07-01 · **Branch:** `tranche/BG` @ `976dc890` · **Base:** v4.2.0.
**Scope:** dist chunk cost, CSS payload, GL/GPU context budget, the demand-loop discipline, the reflow/compositor discipline, font/asset loading — verified on the BUILT `dist/` (built `Jun 30 17:54`).

## Verdict

The performance architecture is a study in contrast. The **JS cost model is genuinely excellent** — a 76-entry per-subpath split where a Button-only consumer pays 107 bytes (`dist/button.js` gz), an aurora consumer pulls a standalone `dist/aurora.js`, and the root barrel is 8.3 KB gz. The **demand-loop discipline is the one true architectural transposition in the whole system** — `createCanvasLifecycle.ts` centralizes offscreen-park + tab-hidden + content-visibility + IntersectionObserver-fallback + live-PRM into a single suspend-`Set`, and all three backends (WebGL/Canvas2D/WebGPU) compose it. The offscreen-pause claims **hold on disk**. Do not touch either.

Everything else in the perf story is **measuring theater layered over an un-addressed macro-waste**. The headline: the published `/styles` cascade ships **UNMINIFIED** — resolved critical CSS is `177 KB gz` with comments but only **`22 KB gz` minified** (an 8× bloat that is 100% doc-comments). BC.W-CSS-CRITICAL built a whole wave + a gate (`proof:css-critical`) + a manifest (`critical-partition.mjs`) + a `182 KB` gzip ceiling to shave a `~13 KB` critical/deferred split — a micro-opt aimed at the *exact same* direct-`<link>` consumer who is simultaneously eating `~165 KB` of un-stripped comments the mechanism never looks at. The `profile:budget` ledger is a monotonic ratchet of **ten-plus "conscious lifts"** that measures comment-bloated gzip, so it greenlights bloat and can only ever go up. `dist/aurora.js` sits at `53.2 KB gz` against a `54 KB` ceiling (98.5%) — the dominant single chunk, ratcheted to its limit, with the real transposition (a per-medium lazy shader boundary) perpetually booked-never-built. And the plan has ONE genuine perf transposition (`W-VIZ-DEMIGRATE`, deleting the WebGPU substrate ~37 KB gz) while WS6 *adds* a new Siri GL chunk under a "name-agnostic net re-pin." The perf plan is not wrong; it is aimed at the third decimal while the first digit is unaddressed.

---

## Findings (ranked by severity)

### F1 [MAJOR] — CSS ships unminified; the critical/deferred split optimizes the wrong axis by 12×

The published `/styles` partials are **not minified**. `dist/styles/dock.css` carries 173 newlines and full doc-comment blocks; `dist/glass-ui.css` (the SFC-scoped fold) carries 1 newline (minified). The build minifies the SFC bundle but **not** the token/recipe cascade it also publishes. Verified:

- Resolved **critical** subset (`tokens/*` + `typography` + `theme` + `glass/*` + specular + refract), as-shipped **with comments**: `177 KB gz` / `568 KB raw`. The gate (`proof:css-critical.mjs:224`) measures exactly this and compares to `CRITICAL_GZIP_CEILING = 182000` (`src/styles/critical-partition.mjs:195`) — a **PASS at 97% of ceiling**.
- The SAME critical subset, **comment-stripped + gzip**: `22.2 KB gz` / `132 KB raw`. The comments are **~87% of the shipped gzip weight.**
- The entire component-recipe deferred tail (instrument-chassis, drawer, segmented-tabs, select, configurator, icon-chip, menu, border-progress, completion-seal, feedback-tone, hover-popover), comment-stripped + gzip: **`7.2 KB gz` total.** The whole styles cascade minified is `~35 KB gz`.

So the critical/deferred split saves a direct-`<link>` consumer `~13 KB gz` (deferring the recipe tail past first paint) while that consumer is *concurrently* downloading `~155 KB gz` of comments the split never touches. The mechanism is a micro-opt (`13 KB`) built on top of an un-addressed macro-waste (`155 KB`), for the **exact same target consumer** (a bundling consumer inlines + minifies everything and never needs the split at all; only the raw-`<link>`/CDN consumer needs a critical split, and that consumer is precisely the one eating the comments). Evidence: `dist/styles/critical.css` (479 bytes of `@import` lines) → `critical-partition.mjs:184` `CRITICAL_PARTIALS`; `vite.style-assets.ts:255` strips comments only for the internal EMISSION token-scan, never for the published output.

**Gestalt reading:** this is exactly the "over-contrivance + missing the obvious" the user named. A designer/engineer glancing at `dist/styles/dock.css` sees 173 lines of prose comments shipping to consumers; the gate machine built an elaborate partition + ceiling + manifest and never noticed.

### F2 [MAJOR] — `profile:budget` is a monotonic "conscious lift" ratchet measuring comment-bloated gzip

`scripts/profile-bundle.mjs` (lines 68–213) is a ledger of the CSS ceiling being lifted **ten-plus times** ("the FIRST … the EIGHTH … the 10TH LIFT"), each rationalized as a "one-time conscious lift." Because the measured draw is the **unminified** `dist/styles/index.css` resolution (F1), every lift is measuring comment growth as much as feature growth, and the ceiling can only ratchet **up** — it is structurally incapable of catching a real regression or ever going down. The per-chunk ceilings (`profile-bundle.mjs:213`, `"dist/aurora.js": { raw: 162_000, gzip: 54_000 }`) are the honest part (F3); the CSS ceiling is theater. A gate that measures a number no real optimization moves is ceremony, not a floor.

### F3 [MAJOR] — `dist/aurora.js` is the dominant chunk at the knife's edge of a 10×-ratcheted ceiling; the real transposition is perpetually booked

`dist/aurora.js` = `161,583 raw` / `53,197 gz` against the `54,000 gz` ceiling (`profile-bundle.mjs:213`) — **98.5% utilized**, the single largest JS chunk by a wide margin (next: `dot-flow-field.js` 66 KB raw, `dock.js` 65 KB raw). The cost is the painterly-medium GLSL (van-Gogh, oil-pastel, kuwahara) template-spliced into ONE `FRAGMENT_SRC` with runtime `if(uMedium==N)` dispatch. CLAUDE.md itself records the real fix and defers it: *"The aurora-medium lazy-chunk split is BOOKED to a fence-widening successor (the medium GLSL is template-spliced into ONE `FRAGMENT_SRC` with runtime `if(uMedium==N)` dispatch — a module split needs a shader-content edit the GL fence forbids)."* So the elegant transposition (per-medium lazy boundary: a default-consumer pays the smooth core, a painterly consumer lazy-loads its medium's shader) is fenced out by the byte-identical-shader GL fence, and instead the budget gets lifted. Every aurora consumer downloads all four medium shaders to use one. This is the reverse of the 76-subpath JS discipline applied one level down (per-medium instead of per-component).

### F4 [MAJOR, mixed] — the WebGPU substrate is ~37 KB gz of cost being correctly deleted by ONE hand while WS6 adds a Siri GL chunk with the other

WebGPU-specific dist cost, verified: `uniformBridgeWGPU-*.js` `30.8 KB gz`, `useGpuSubstrate-*.js` `2.9 KB gz`, `procedural-color.wgsl-*.js` `4.0 KB gz` = **`~37.7 KB gz`** of substrate code, PLUS the doubled per-viz `.wgsl.ts` bodies inside `dot-flow-field.js` (66 KB raw), `dot-matrix.js`, `concentric.js`, `goo-dot-matrix.js`, `paper-grid.js`. `BG.W-VIZ-DEMIGRATE` (row 6.3, PENDING) + `BG.W-VIZ-SUBSTRATE-DELETE` (6.7, atomic) de-migrate fourier-field + constellation off WebGPU and delete the substrate — **≥13 files + ≥2500 LOC, budget re-pinned DOWN** (`bg-build-map.md:336`). This is a **genuine, large, correct transposition** — the BB WebGPU-first push was over-contrivance (a third backend for a design system that renders warm procedural fields at 60fps on WebGL2), and BG is un-doing it. Good.

The tension: WS6 (`bg-build-map.md:383`, "Siri capabilities (4) — NEW") *adds* `SIRI-WAVEFORM` (a new GL chunk) + `SIRI-ISLAND`, and L15 re-pins `profile:budget` as "ONE NAME-AGNOSTIC number across ALL chunks (incl. siri + refract)" (`bg-build-map.md:1204`). So the net budget movement is deliberately obscured — one wave deletes ~37 KB of GL, another adds a Siri GL surface, and the ledger is re-based to a "name-agnostic" number rather than proving the net went down. Whether the demigrate WIN survives the Siri ADD is not asserted anywhere.

### F5 [MINOR-POSITIVE] — the demand-loop leaf is the one real transposition; the offscreen-pause claims hold

`src/composables/glass/webgl/createCanvasLifecycle.ts` (695 lines) is genuinely elegant and the claims verify on disk: a single `suspended = new Set<CanvasSuspendReason>()` (line 294), `isRunning() === suspended.size === 0` (296), `suspend`/`resume` gate the rAF (336–348), `document.hidden → suspend("tab-hidden")` (364/368), `contentvisibilityautostatechange → "off-screen"` (24/375), the IntersectionObserver `rootMargin` fallback writes a **distinct** `"off-screen-io"` key so CV and IO don't collide (26/385), and live-PRM re-monitoring gates the *reschedule* not the suspend set (304–330) so an on-screen reduced surface paints one frame and parks. All three backends (`useWebGLCanvas`, `useCanvas2D`, `useWebGPUCanvas`) compose this ONE leaf. No viz forks a raw render rAF (the raw-`requestAnimationFrame` owners are scroll readers / one-shot springs / spec drivers, not GL render loops). **This is the model** — the fewer-sharper-primitives discipline actually realized. It should be the template for how the CSS + budget stories get re-shaped, not an exception.

### F6 [MINOR] — fonts base64-inlined at 103 KB gz — off the critical path (good) but uncacheable and +33% over linked woff2

`dist/styles/fonts.css` = `139 KB raw` / `103.8 KB gz`, 6 `@font-face` with base64 data-URIs inlining `98.6 KB` of woff2 (4 faces). It is correctly **off** the critical `@import` (its own `./styles/fonts` subpath, `fonts.css:12–20`) so first paint uses the Capsize-calibrated `local()` fallbacks — that part is right. But base64 inflates the binary ~33% over a linked woff2 AND makes the corpus **uncacheable independently** (it lives inside a CSS file, re-parsed per stylesheet, no separate HTTP cache entry, no cross-page reuse). For a multi-page consumer, linked `dist/fonts/*.woff2` assets (which already ship — `dist/fonts/fira-code`, `plus-jakarta-sans`) with `<link rel="preload" as="font">` would cache once and reuse. This is a real tradeoff (inline saves a round-trip on first visit), so it is a MINOR/note, not a defect — but it is un-examined in the plan.

### F7 [NOTE] — the ideal cost model, stated

- **Button-only consumer** SHOULD pay: `~8 KB gz` JS (root barrel or less via `/button` = 107 bytes + shared reka leaf) + `~22 KB gz` CSS (tokens + glass ladder + type, *minified*). Currently pays the correct JS but `~177 KB gz` CSS if raw-`<link>` (F1), or `~35 KB gz` if bundling.
- **Aurora consumer** SHOULD pay: `+54 KB gz` for the smooth core, `+medium` lazy on demand. Currently pays `+53 KB gz` for the core AND all four painterly mediums eagerly (F3).
- **Full demo** SHOULD pay: per-route GL budget of 1 context (verified held — `BG.W-FIELD-AURORA` proof: `glLive===1` on non-substrate routes, shell stands down). This part is *correct*.

The asymmetry is the whole finding: JS achieves the ideal curve, CSS+shaders do not, and the gate machine measures the CSS wrongly enough to never notice.

---

## Fold candidates for the BG/BH tranche plan

### FC1 [new-wave] `BG.W-CSS-MINIFY` — minify the published `/styles` cascade (the 6× payload transposition)
Extend the `dist/glass-ui.css` minification (already in the build) to the `vite.style-assets.ts` `publishStyleAssets` output: strip comments + collapse whitespace on every published `dist/styles/*.css` partial (a Lightning CSS / esbuild-css pass, the same one that already minifies the SFC fold). Result: `/styles` drops from `~200 KB gz` to `~35 KB gz` for direct consumers; the critical subset from `177 KB gz` to `22 KB gz`. **This is the single highest-leverage perf change in the tranche** and it is a build-plugin edit, not a source rewrite. Gestalt: the library stops shipping its own internal prose to consumers. (The source `src/styles/*.css` keeps its comments — this is publish-time only.)

### FC2 [prune-wave] Retire the BC.W-CSS-CRITICAL machinery once FC1 lands
Once `/styles` is `~35 KB gz` minified, the critical/deferred split saves `~13 KB` on a `35 KB` total — not worth a wave + a gate + a manifest + two package exports. **Prune** `src/styles/critical-partition.mjs`, `scripts/proof-css-critical.mjs`, and the `./styles/critical` + `./styles/deferred` exports (clean break, no alias — the standing directive). If a real raw-`<link>` first-paint consumer with the split is named on disk (none found), demote to `defer-honest` with that consumer as the trigger instead. This removes one of the clearest over-contrivance ceremonies (a whole wave for `13 KB`), *and* it is only unlockable BY doing the obvious thing (F1) the ceremony obscured.

### FC3 [amend-wave] `profile:budget` — measure MINIFIED bytes, allow the ceiling to go DOWN
Re-express `scripts/profile-bundle.mjs` to measure the **minified** resolved draw (post-FC1), retire the ten-lift "conscious lift" comment-ledger (lines 68–213), and set a real CSS ceiling that a future optimization can *lower* (the `--rebaseline` path already exists; make down-rebase the expected direction, not up). Keep the per-chunk JS ceilings (they are honest). The gate should catch a regression, not narrate a ratchet.

### FC4 [amend-wave] `BG.W-VIZ-DEMIGRATE` / `BG.W-VIZ-SUBSTRATE-DELETE` — assert the NET budget drop, not a name-agnostic re-pin
Amend L15 / the demigrate gate so it proves the **net** dist bytes went DOWN after both the WebGPU deletion (`~37.7 KB gz` substrate + doubled `.wgsl.ts` bodies) AND the WS6 Siri GL addition — a signed delta, not a "name-agnostic re-pin" that can absorb the Siri add silently. The demigrate is a real transposition (F4); don't let the Siri add launder its win.

### FC5 [defer-honest] The aurora per-medium lazy shader boundary — keep booked with a REAL trigger
The `54 KB gz` aurora ceiling (F3) is at 98.5%. The honest transposition (per-medium lazy shader chunk so a default consumer pays only the smooth core) is fenced by the byte-identical-GL discipline and correctly deferred. Keep it `KEEP-BOOKED` with the trigger **`dist/aurora.js gz > 54 KB`** (i.e. the next medium/feature that would force an 11th lift MUST instead build the split), not another silent ceiling lift. This makes the fence-widening the *forcing function*, converting the ratchet into a real architectural gate.

### FC6 [plan-doc-edit] Record the font-inline tradeoff (F6) as an examined decision
Add a one-line note to the fonts story: the base64 inline is a deliberate first-visit-round-trip-vs-cross-page-cache tradeoff, and the linked-woff2 alternative (assets already ship in `dist/fonts/`) is the fold if multi-page caching becomes the dominant consumer profile. Currently un-examined; making it an examined KEEP closes the gap without a build change.

### FC7 [plan-doc-edit / positive] Name `createCanvasLifecycle` as the perf-architecture reference
The demand-loop leaf (F5) is the one realized transposition. The AMENDED plan should cite it explicitly as the template the CSS/budget re-shapes (FC1–FC3) are modeled on — "fewer, sharper primitives, one loop, all backends compose" — so the gestalt lesson (centralize the mechanism, don't ceremony around the symptom) is carried forward, not re-derived.

---

## What NOT to touch (verified sound)
- The 76-entry per-subpath JS split (Button = 107 bytes, aurora standalone, root barrel 8.3 KB gz). Ideal JS curve.
- `createCanvasLifecycle.ts` offscreen-pause / suspend-Set / PRM discipline (F5). Do not fork, do not re-ceremony.
- The per-route 1-GL-context budget (`BG.W-FIELD-AURORA` proof, shell stands down). Correct.
- The font critical-path split (fallbacks paint, corpus deferred to `/styles/fonts`). The inline *format* is the only open note (F6), not the split.
