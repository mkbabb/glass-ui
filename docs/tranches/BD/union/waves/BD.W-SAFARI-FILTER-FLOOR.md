# BD.W-SAFARI-FILTER-FLOOR — two Safari hardening floors in one wave: the sRGB-on-every-SVG-filter gate + the coarse-pointer fixed+backdrop scroll-jank fallback

**Band 8 · depends: W-SAFARI-CAPTURE (the webkit project + matrix) · W-DOCK-INTEGRATE (the shell docks the fallback hardens)**

## The defect / the ask

Two Safari floors the SEED names in Band 8 (`SEED-DRAFT.md` line 30): "**W-COARSE-BACKDROP-FALLBACK [NEW]** (iOS fixed+backdrop scroll-jank escape) · W-COLOR-INTERP-SRGB (gate: every SVG filter mints `color-interpolation-filters=sRGB`)." The birthdaycolor audit (`birthdaycolor-glass-audit.md` line 18, THE ABSOLUTE SAFARI FENCE): "Any SVG goo (the CSS metaball trick) MUST set `color-interpolation-filters=\"sRGB\"` (WebKit defaults linearRGB → the alpha-threshold goo breaks)." The charter §8 lists "the coarse-pointer fixed+backdrop fallback" as binding. Folded into ONE wave because both are Safari-FLOOR census/escape concerns over the same source surface.

### (a) The sRGB-on-every-SVG-filter census gap

WebKit DEFAULTS `<filter>` interpolation to `linearRGB`. An alpha-threshold goo (the `feColorMatrix` A-channel cut) computed in linearRGB reads the WRONG waist — the neck breaks at the wrong alpha, the metaball mush is wrong. Every glass-ui `<filter>` mint MUST explicitly set `color-interpolation-filters` (sRGB for the alpha-threshold/blend cases; linearRGB ONLY where recorded-rationale). The HEAD census (a real grep):

- **SET sRGB (correct):** `DockGooFilter.vue:77` (the fission goo — explicit sRGB), `handmark/texture.ts:46` (the L3 grain — sRGB), `useGlassRenderer.ts:188` (sRGB), `fission-bridge.css` (sRGB).
- **DELIBERATE linearRGB (recorded-rationale):** `WatercolorDot.vue:173` — `color-interpolation-filters="linearRGB"` with the recorded WebKit-limitation note at line 149 (a `feDisplacementMap`-displacement case where sRGB is wrong for THAT graph). This is the NAMED exception — the gate must ALLOW a recorded linearRGB, flag only the MISSING attribute.
- **MISSING the attribute (the gap — silent linearRGB):** `src/styles/paper.css:17` + `paper.css:39` (the paper-texture `feTurbulence`+`feColorMatrix`+`feBlend` grain — NO `color-interpolation-filters`), `src/styles/tokens/scale-paper.css:118` + `scale-paper.css:119` (the `--paper-clean-texture`/`--paper-aged-texture` data-URI `feTurbulence`+`feColorMatrix` grain — NO attribute). These four grain filters default to linearRGB on WebKit → the desaturate/blend reads off-WebKit. The union (goo, paper-grain, watercolor, handmark) must mint sRGB (or recorded-linearRGB) on EVERY filter — the census gate the SEED demands.

### (b) The coarse-pointer fixed+backdrop scroll-jank fallback gap

iOS Safari re-paints a `position: fixed` element's `backdrop-filter` EVERY scroll frame (it cannot composite a fixed backdrop-filter cheaply — the per-frame repaint janks the scroll). The shell docks are the load-bearing case:

- Read `demo/layout/dock-nav.css:149-150` — `.demo-bottom-dock { position: fixed; }` (the always-on shell dock).
- Read `src/styles/dock/shell.css:149` — `.glass-dock { backdrop-filter: var(--dock-surface-blur); }`. So the always-on shell dock is `position: fixed` + a live `backdrop-filter` over a LIVE aurora — the exact iOS Safari per-frame-repaint jank case.
- Read `src/styles/dock/overflow.css:209-239` — the `@media (pointer: coarse)` block exists but handles SCALE ONLY (the `--dock-scale`/touch-floor cascade). There is NO `@media (hover: none) and (pointer: coarse)` escape that drops the live backdrop-filter to an opaque/reduced-blur surface on the always-on fixed shell docks over a live field. The jank is un-addressed.

## The mechanism

Two thin, token-first floors — a census GATE (no paint, structural) + a coarse-pointer `@media` escape (token-first, the existing coarse-block precedent). Both Safari-safe by construction; neither re-forks an engine.

### (a) The sRGB census — `proof:color-interp-srgb`

A device-free census over `src/**/*.{vue,css,ts}`: every element/data-URI that MINTS a `<filter>` (a `<filter` literal carrying child `fe*` primitives — the MINT, not a `filter: url(#…)` REFERENCE) MUST carry `color-interpolation-filters="sRGB"` OR a recorded-rationale `linearRGB` (the WatercolorDot exception — a `color-interpolation-filters` attr that is PRESENT, with the recorded note). The four MISSING grain filters (`paper.css:17,39`, `scale-paper.css:118,119`) are the BUILD: add `color-interpolation-filters='sRGB'` to each (a desaturate/blend grain is correct in sRGB — the handmark/texture.ts grain precedent). Byte-near-identical paint on Chromium (which composites both spaces close for a saturate-0 grain); the FIX is the WebKit-correct grain. NO new filter, NO engine change — one attribute on four existing filters.

### (b) The coarse fixed+backdrop escape — `--dock-coarse-backdrop`

A token-first `@media (hover: none) and (pointer: coarse)` escape (the coarse-pointer-IS-touch idiom — `hover: none` excludes a coarse stylus on a desktop) on the always-on FIXED shell docks: re-point the dock's backdrop-filter to an OPAQUE/reduced-blur surface so the per-frame repaint is cheap. The mechanism rides the EXISTING `--glass-level` opaque-escape machinery (AX.W54) — NOT a new compositing path:

- A `--dock-coarse-backdrop` token (default: the touch escape engages `--glass-level: 0` → solid `--card` + `blur(0)`, OR a bounded reduced blur `--glass-blur-wash` → a cheaper small radius — the consumer-tunable knob; the library default is the opaque solid, the cheapest iOS path). The shell dock under `@media (hover: none) and (pointer: coarse)` reads `--dock-coarse-backdrop` so the live backdrop-filter is replaced by a static opaque/cheap-blur plate while the FIXED dock is scrolled — no per-frame backdrop repaint.
- The escape is PRESETS-IN-CONSUMERS: the LIBRARY ships the named `--dock-coarse-backdrop` escape + the always-on-fixed-shell-dock default; the CONSUMER app-shell opts ITS OWN fixed shell dock in (the BC.W-DROPDOWN-FIX `scrollbar-gutter: stable` precedent — the library ships the discipline, the consumer's `.demo-bottom-dock` adopts it in `demo/layout/dock-nav.css`). glass-ui does NOT force the opaque escape on every coarse dock (a non-fixed dock has no scroll-repaint jank).
- COMPOSITOR-SAFE: the escape is a STATIC token re-point (no animated property; the opaque plate is a frame-0 surface swap, not a `backdrop-filter` transition). The warm-cream identity holds (the opaque `--card` is the dock's own plate color, not a gray slab).
- The Safari fall is RECORDED in `safari-support-matrix`: "fixed shell dock over live field — coarse/touch drops the live backdrop-filter to `--dock-coarse-backdrop` (opaque/reduced-blur) to kill the iOS fixed+backdrop per-frame scroll-repaint; the fine-pointer path keeps the live glass (no jank on a non-scrolling-fixed compositor)."

## The gate — proof:safari-filter-floor (born-RED → GREEN; TWO INDEPENDENT ARMS)

Device-free SOURCE/census arm, `["local","ci"]`. The detector comment-strips first; exports a pure detector for the self-test bites. The gate is **TWO STRUCTURALLY-INDEPENDENT ARMS** (the two Safari floors are disjoint concerns over disjoint source surfaces) — **ARM A = the sRGB SVG-filter census** (C1-C3, over the `<filter>` mint corpus) and **ARM B = the coarse-pointer fixed+backdrop fallback** (C4-C6, over the dock shell + the `@media (hover:none) and (pointer:coarse)` escape). Each arm is **born-RED on its OWN HEAD-state and evaluated independently** — Arm A reds because the four grain filters carry no `color-interpolation-filters`; Arm B reds because no `--dock-coarse-backdrop` escape exists. The gate's verdict is the AND of both arms, and the detector evaluates each arm's clauses over its OWN corpus, so **one arm cannot vacuously green while the other is dead** (the binding requirement): fixing the sRGB census (Arm A GREEN) does NOT touch Arm B's clause inputs (the coarse escape must independently exist + read the token), and landing the coarse escape (Arm B GREEN) does NOT touch Arm A's filter-mint census. A self-test bite plants a defect in EACH arm independently (a missing `color-interpolation-filters` reds Arm A while Arm B is GREEN; a missing `--dock-coarse-backdrop` reds Arm B while Arm A is GREEN) — proving neither arm's GREEN can mask the other's RED.

### ARM A — sRGB census clauses (C1-C3, over the `<filter>` mint corpus)

- **C1 — every `<filter>` MINT carries `color-interpolation-filters`.** The census enumerates every `<filter` literal (in `.vue`/`.css`/`.ts`, incl. URL-encoded data-URI filters — the `%3Cfilter` form) that mints child `fe*` primitives, and asserts each carries a `color-interpolation-filters` attribute (`sRGB` OR a recorded-rationale `linearRGB`). A MINT with NO attribute REDS. (A `filter: url(#…)` REFERENCE is NOT a mint — the gate scopes to the `<filter>` element carrying `fe*` children.)
- **C2 — the four grain filters are FIXED to sRGB.** `paper.css` (both grain filters) + `scale-paper.css` (`--paper-clean-texture` + `--paper-aged-texture`) carry `color-interpolation-filters='sRGB'`. A surviving attribute-less grain filter REDS.
- **C3 — the recorded-linearRGB exception is ALLOWED (not over-flagged).** `WatercolorDot.vue`'s explicit `linearRGB` (line 173, with the recorded note line 149) is PASS (the attribute is present, the rationale recorded) — the gate flags MISSING, never a deliberate-and-recorded `linearRGB`. A self-test plants a linearRGB-with-no-note → that REDS (the un-recorded linearRGB bite), proving the gate distinguishes recorded from silent.

### ARM B — coarse fixed+backdrop clauses (C4-C6, over the dock shell + the coarse `@media` escape)

- **C4 — the `--dock-coarse-backdrop` escape token exists + the `@media (hover: none) and (pointer: coarse)` rule reads it on the fixed shell dock.** The escape rides `--glass-level`/the opaque machinery (NOT a new `backdrop-filter` recipe). A coarse escape that adds a parallel `backdrop-filter: none` outside the `--glass-level` path REDS (the no-second-recipe fence).
- **C5 — the escape is opt-in for the FIXED case, presets-in-consumers.** The library ships the named token + the discipline; the demo `.demo-bottom-dock` (the fixed shell dock) adopts it. The escape is NOT forced on every coarse dock (a non-fixed dock keeps the live glass). A library rule forcing `--glass-level: 0` on EVERY coarse `.glass-dock` REDS (the over-reach bite).
- **C6 — compositor-only + the matrix row.** The escape is a STATIC token re-point (no animated `backdrop-filter`/layout property — `proof:no-layout-animation` owns the corpus, this re-asserts the touched rules clean); the `safari-support-matrix` carries the fixed-shell-dock row. A missing matrix row REDS.

**Self-test bites (each planted defect MUST red — the per-arm-independence bites are load-bearing):** (a) a `<filter>` mint with no `color-interpolation-filters` → ARM A C1 RED (while ARM B stays GREEN — the independence proof); (b) a paper-grain filter reverted to attribute-less → C2 RED; (c) a `linearRGB` with no recorded rationale note → C3 RED; (d) a coarse escape spelling a raw `backdrop-filter: none` outside the `--glass-level` path → ARM B C4 RED (while ARM A stays GREEN — the independence proof); (e) a library rule forcing the opaque escape on every coarse dock → C5 RED; (f) an animated `backdrop-filter` in the coarse escape → C6 RED; (g) a missing matrix row → C6 RED. Bites (a)+(d) are the BINDING independence bites — each reds its OWN arm while the other arm is GREEN, proving neither arm's GREEN masks the other's RED.

**What reds on the pre-fix tree (each arm born-RED on its OWN HEAD state, independently):** ARM A — C1/C2 (the four grain filters carry no `color-interpolation-filters` — silent linearRGB on WebKit); ARM B — C4 (no `--dock-coarse-backdrop` escape exists — the fixed shell dock janks on iOS scroll), C6 (no matrix row). Neither arm's RED depends on the other — fixing the grain filters alone leaves ARM B red, and landing the coarse escape alone leaves ARM A red, until BOTH floors land.

## The binding π — tests-visual/safari-filter-floor.spec.ts

The painted-truth readback on the **webkit project** (Safari-first §6 — the WHOLE POINT is WebKit-correct filters + no iOS jank), co-validated BOTH modes:

- **THE sRGB GRAIN (webkit):** a route mounting a `.paper-texture` / `--paper-clean-texture` surface over a known backdrop, served at `:5199`. A getImageData readback over the grain region reads the CORRECT desaturated grain luminance on WebKit (the sRGB-computed saturate-0 grain) — a control captured with the linearRGB default reads a measurably different (off) grain luma. The grain reads identical on `webkit` AND `chromium-headless-new` (the cross-engine parity — the fix makes WebKit match, not a Chromium-only grain).
- **THE COARSE FIXED-DOCK NO-JANK (webkit, coarse viewport):** the `coarse-touch`/webkit-mobile project mounts the fixed shell dock over a live aurora; SCROLL the page and capture a frame-series — the dock plate is the OPAQUE/cheap-blur escape (a static plate, no per-frame backdrop sample), the scroll reads SMOOTH (the frame-to-frame plate-region variance stays below the jank floor — the BC `FLASH_STD_FLOOR`/no-flash precedent applied to scroll-repaint). A control with the live backdrop-filter pinned ON reads the repaint storm. The fine-pointer desktop run KEEPS the live glass (the escape is coarse-only).
- **PRM:** the coarse escape is a static surface swap (no motion) — unaffected by `prefers-reduced-motion`; the grain is static-seeded (rasters once) — one frame both arms.

## The gestalt row

**Union-roster surface: `safari-filter-floor` (the WebKit-correct-grain + no-iOS-jank verdict).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture — (1) a paper-grain surface captured on the **webkit project** (the grain reads correct, matching Chromium), and (2) a fixed shell dock over a live field on the **coarse webkit-mobile project** during a scroll (the dock plate reads smooth, no jank), surface-hash freshness floor. The gestalt judgement: the SVG-filter surfaces read IDENTICALLY on Safari and Chromium (the linearRGB-default off-grain is gone), AND the always-on fixed dock scrolls SMOOTH on iOS (no per-frame backdrop-repaint stutter) — the Safari-first floor the charter demands, NOT a Chromium-only-correct library. Born-FAIL on HEAD (the four grain filters read off on WebKit; the fixed dock janks on iOS scroll); GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels, never the first paint. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **No-legacy / clean break.** The four grain filters gain the attribute IN PLACE (no parallel sRGB-grain token — the existing data-URI/CSS filter is edited, not duplicated). The coarse escape rides the EXISTING `--glass-level` opaque machinery — no second `backdrop-filter` recipe, no dual-path fixed-dock surface.
- **Presets-in-consumers.** The library ships `--dock-coarse-backdrop` + the discipline + the always-on-fixed-shell default; the CONSUMER's fixed shell dock adopts it (the `.demo-bottom-dock` reference, the `scrollbar-gutter: stable` precedent). glass-ui does NOT force the opaque escape on every consumer's coarse dock. The grain hue is the warm-cream identity (untouched — the fix is the interpolation SPACE, not the color).
- **The Safari fall.** The sRGB attribute IS the Safari-correct path (no fall needed — the filter is the REGULAR `filter:` graph WebKit supports). The coarse opaque escape IS the iOS fall for the fixed+backdrop jank (the live glass is the fine-pointer path; the opaque plate is the touch path). Both recorded in the matrix.
- **The specific anti-pattern this must NOT become:** an sRGB census so broad it flags the deliberate-and-recorded `WatercolorDot` linearRGB (C3 ALLOWS a recorded linearRGB — the gate flags MISSING, not a recorded exception), OR a coarse escape that drops the live glass on EVERY coarse dock including the non-fixed ones that do not jank (C5 scopes the escape to the FIXED-shell case, opt-in).

## Disposition links

- **SEED Band 8 W-COLOR-INTERP-SRGB** — the gate: every SVG filter mints `color-interpolation-filters=sRGB` → BUILT (the census gate + the four grain-filter fixes + the recorded-linearRGB allowance). CLOSED.
- **SEED Band 8 W-COARSE-BACKDROP-FALLBACK [NEW]** — the iOS fixed+backdrop scroll-jank escape → BUILT (the `--dock-coarse-backdrop` token + the `@media (hover: none) and (pointer: coarse)` opaque escape on the fixed shell docks + the matrix row). CLOSED. (Folded into this wave per the SEED's two-floor pairing.)
- **birthdaycolor-glass-audit §"THE ABSOLUTE SAFARI FENCE"** (line 18) — "Any SVG goo MUST set color-interpolation-filters=sRGB" → the census discharges it across the WHOLE union (goo, paper-grain, watercolor, handmark), not just the goo.
- **Charter §8** (the coarse-pointer fixed+backdrop fallback) → discharged here (machine-locked, not prose).
- The **`--glass-level` opaque machinery (AX.W54)** + the **BC.W-DROPDOWN-FIX presets-in-consumers `scrollbar-gutter` precedent** — COMPOSED (the coarse escape rides the one opaque path + the consumer-adopts-the-discipline shape); neither re-authored.
