# PaperGrid greenfield — LENS-B (cross-engine / perf-first)

> Greenfield brainstorm for "the grid field that should warp its **CELLS** (the filled
> quad faces displacing in a traveling wave — a sheet of paper rippling), not merely bend
> the LINES (a wireframe wobble)." Designed from first principles through the Safari-perfect
> KISS lens; reconciled with the extant `PaperGrid` engine + `BD.W-PAPERGRID-WARP` as a
> **UNION** (extend, never re-fork). Every cited symbol is grep-verified at HEAD.

---

## 0. Live interrogation — the painted verdict (HEAD, Chrome, light mode, `/substrates/paper-grid`)

Navigated `http://localhost:5173/substrates/paper-grid`, scrolled the canvas to center, screenshotted (painted-truth — the WebGPU/WebGL canvas has no `preserveDrawingBuffer` so `drawImage` readback is all-zero; the **screenshot** is the reliable pixel oracle).

**(1) Cell-warp vs line-warp — the headline.** **It is LINE-warp.** The stage paints a faint warm-grey **hairline** grid. Near the major rules the lines visibly *kink and zig-zag* — that is the `cellTwist` rotating the sampling coordinate per cell — but **the cell interiors (the quad faces) are empty**. There is no filled face that inflates / shears / displaces; there is no sheet of paper rippling. It reads exactly as the defect names it: *a wireframe wobble, not a cell-warp*. The headline is unmet.

  Root cause, source-traced (`paperGrid.ts:220 samplePaperGrid`, `paper-grid.wgsl.ts:160-182`, `paper-grid.glsl.ts:127-147`): the kernel is `g = uv·gridScale; g = cellTwist(g,…); g = cursorSwirl(g,…); line = max(gridCoverage(g,minor), gridCoverage(g/me,major))`. The ONLY thing painted is `gridCoverage` — the Ben Golus derivative-AA **line** distance. `cellTwist` (`waveField.ts:106`) rotates the per-cell sample coordinate about its own center, so the *extracted lines* bend — but **nothing fills the quad**. A grid made of lines, warped in sample-space, is still a grid made of lines. The cells cannot "inflate" because they were never rendered as faces.

**(2) Alive / weighty / cursor-reactive.** The wave *is* present (the `amp` spring ramp `usePaperGrid.ts:99-103` + the traveling Gaussian crest `travelingEnvelope` `waveField.ts:53`), and `cursorSwirl` is wired — but because only hairlines carry it, the motion reads as a *subtle shimmer of the line network*, not a weighty sheet. Inertia exists in the math but is invisible in the paint. Falls short of "a sheet of paper rippling."

**(3) Vivid/warm + colorful field.** The ink is warm-amber (`WARM_IDENTITY_INK {L:0.62,C:0.05,h:62}`, hue 62 — OUTSIDE the `[180,270]` purge, clean) — good. BUT the stage sits on a **FLAT grey-beige plate** (`avgGround` reads as the configurator's resting card cream; no live field behind). This is the §3 systemic finding confirmed for an 9th viz: the page is flat. Route the warm-ground fix into the SHARED `BD.W-PAGE-BACKGROUND` map (the glass-band → live-field re-map), NOT a sibling, NOT `auroraFallbackGround`.

**(4) Cross-engine.** The WGSL primary (`paperGridWGPUSetup.ts`, premultiplied blend) + GLSL twin (`paperGridGLSetup.ts:122 gl.enable(BLEND); blendFunc(ONE, ONE_MINUS_SRC_ALPHA)`) transcribe `samplePaperGrid` line-for-line; both splice the shared `CURL_FBM_{WGSL,GLSL}` (grep-confirmed `flow.{wgsl,glsl}.ts`) + `WAVE_FIELD_{WGSL,GLSL}` + `OETF_GLSL`/`linearToSrgb`. The twin parity + premultiplied-over-transparent identity are sound and **must be preserved**.

**Verdict:** the engine is *plumbing-correct and SOTA on the line side* but the headline ask — **filled cells that warp in a traveling wave** — is structurally absent. This is the one piece that must be RE-INVENTED; everything else (the Golus AA, the shared curl, the twin parity, the warm ink, the substrate lifecycle, the cursor swirl) is FIT and is KEPT.

---

## 1. The core idea — render the FACE, not just the edge: a **height-shaded warped quad field**

The simplest mechanism that hits the bar (KISS) is to stop treating the grid as a set of lines and start treating it as a **tessellated sheet** — but *without* a vertex mesh (the substrate is a single fullscreen-triangle fragment pass; a real mesh would be a re-fork and a Safari risk). The whole effect stays in the **fragment shader**, layering ONE new term over the existing kernel:

> **A per-cell FILLED-FACE coverage, shaded by a scalar HEIGHT field `H(cell, t)` that is the traveling wave's local displacement — so each quad face brightens/darkens (a lit fold) and its filled extent breathes as the crest sweeps through. The faces are the paper; the height-shading is the ripple; the existing Golus lines become the *creases* on the sheet.**

Concretely the kernel gains a **face layer** beneath the (kept) line layer:

```
g    = uv * gridScale
g    = cellTwist(g, …)            // KEPT — the per-cell rotation/shear (now visible because the FACE carries it)
g    = cursorSwirl(g, …)          // KEPT
cell = floor(g)                   // the integer cell id (the quad)
cc   = cell + 0.5                 // cell center (already computed inside cellTwist; hoist to a shared helper)

// ── NEW: the FACE ──────────────────────────────────────────────
H    = faceHeight(cc, t)          // the traveling-wave displacement read at the cell center  ∈ [-1,1]
face = facePlateau(g)             // a soft inset plateau: 1 in the cell interior, 0 at the gutters (smoothstep off fract(g))
shade= 0.5 + H * faceRelief       // a lambert-ish fold shade from the height GRADIENT (∂H gives the lit/shadowed slope)
faceInk = mix(warmLo, warmHi, shade)   // warm ramp, NEVER grey — two warm OklchStops, hue 40-75
faceA   = face * faceAlpha * (0.5 + 0.5*env)   // the face is brighter where the crest passes (the ripple READS on the surface)

// ── KEPT: the lines as CREASES on the warped sheet ─────────────
line  = max(gridCoverage(g,minor)*minorA, gridCoverage(g/me,major)*majorA)

// composite: face UNDER the crease lines, both premultiplied over transparent
col = faceInk; a = faceA
a   = a + line*(1-a); col = mix(col, lineInk, line)
```

The face is a **soft inset plateau** (`smoothstep`-walled square inside each warped cell) whose interior is *shaded by the wave height + its gradient*. Because `cellTwist` already rotates/shears the sample coordinate per cell, the plateau the shader carves out is **already a warped quad** — but now you can SEE it, because it's filled. As the Gaussian crest travels, `H` and `env` ripple across the field → the faces light up and lean in sequence → **a sheet of paper rippling**, painted, not implied.

This is the survival-of-the-fittest move: it **keeps** `cellTwist` (the warp math is correct, it was just invisible), **keeps** the Golus lines (re-cast as creases), **keeps** the curl director, the cursor swirl, the twin parity, the premultiplied composite — and **adds exactly one new pure function** (`faceHeight` + the plateau coverage) to the shared `waveField` leaf so paper-grid AND concentric inherit it. No new engine, no mesh, no second noise basis.

---

## 2. The single boldest move — **the cell BREATHES its own area: a volume-preserving plateau inset driven by the wave (squash & stretch on the FACE)**

Beyond shading, the boldest, most ios27-cartoon move: **the filled plateau's inset width is modulated by the wave so each cell visibly SQUASHES and STRETCHES its filled area as the crest passes** — a real liquid-weight squash on the face, volume-roughly-preserved.

```
inset = baseInset * (1.0 - squashK * env * H)     // crest cells FATTEN their face (inset shrinks → face grows)
face  = facePlateau(g, inset)                       // the filled quad swells at the crest, relaxes behind
```

So a cell isn't merely *shaded* by the wave — its **filled face physically inflates** at the crest (the inset retreats, the plateau grows toward the gutters), then deflates behind the front, while the neighbour ahead begins to swell. That is the literal reading of the headline — *"the filled quads inflate/displace in a coherent traveling wave"* — rendered with squash-&-stretch weight. Combined with `cellTwist`'s rotation, each cell **rotates AND breathes** as the front sweeps: a windmill of inflating warm-paper tiles. This is the §L4 cartoon register (squash & stretch + overlapping action — neighbours peak out of phase) applied to a procedural field, and it is the single move that converts "wireframe wobble" into "rippling paper sheet."

Bounded for legibility by the **measured cell-pitch CV<0.15 fence** that `BD.W-PAPERGRID-WARP §2` already specifies (off `samplePaperGrid`): the inflation is whatever the CV allows, never a guessed amplitude — the faces breathe but the grid still reads as a grid.

---

## 3. Mechanism — the precise extension (UNION with the extant engine)

All math lands in the **shared `waveField` leaf** (`src/composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}`) so the JS oracle + both shader twins stay the ONE source, and concentric inherits the face for free. paper-grid's three files (`paperGrid.ts`, `paper-grid.wgsl.ts`, `paper-grid.glsl.ts`) only **call** the new leaf functions.

### 3a. New pure functions in `waveField.ts` (transcribed line-for-line into the two `.glsl/.wgsl` chunks)

- **`faceHeight(curlFn, cc, t, waveDir, waveK, waveOmega, waveSigma, amp) -> number`** — the traveling-wave displacement scalar at a cell center. Reuses the EXISTING `travelingEnvelope` (`waveField.ts:53`) × the EXISTING `curlScalar` (`waveField.ts:76`, the curl-x director) so the height SHARES the wave's phase + the curl flow — adjacent cells rise together (coherent), the front travels. `H = env * curlScalar(...) * amp`. **No new noise basis** (P5 of the WARP wave — composes the shared `curlFBM`).
- **`facePlateau(g, inset) -> number`** — the soft inset square coverage: `t = smoothstep(inset, inset+aa, d)` where `d = min over axes of (0.5 - |fract(g)-0.5|)` (distance into the cell from the nearest gutter). Pure, derivative-free in JS (the round-trip passes a fixed `aa`); the shaders use `fwidth(g)` for the AA edge (the Golus precedent — crisp at any DPR).
- **`faceRelief(curlFn, cc, t, …) -> number`** — the central-difference gradient of `faceHeight` across the cell (the lit-fold slope): `(faceHeight(cc+εx) - faceHeight(cc-εx))` etc., reusing `CURL_EPS` (`paperGrid.ts:39`). This is the Lambert-ish shade so the faces read as a *folded surface*, not a flat tint.

### 3b. `samplePaperGrid` (`paperGrid.ts:220`) gains the face composite

Extend the return to `{ line, alpha, faceShade, faceCov }` (or keep `{line, alpha}` and fold the face INTO `alpha`+`col` — TBD by the gate's premultiplied identity). The face composites UNDER the lines, both premultiplied over transparent (the existing `background:"transparent"` identity holds — the page still reads through the gutters; only the FACES gain opacity).

### 3c. New config fields (the deep register — OPT-IN, calm default byte-identical)

Per `BD.W-PAPERGRID-WARP §1` (the byte-frozen-default law) and **presets-in-consumers**:
- `faceAlpha: number` (default **0** → byte-identical to today's line-only grid; the face evaporates at 0, every existing `proof:viz-papergrid` cage clause stays GREEN). The **demo `PAPER_GRID_PRESET_*`** lift it (vivid → a DEMO preset; `src/` identity byte-frozen).
- `faceRelief: number`, `squashK: number`, `faceWarmLo/faceWarmHi: OklchStop` (two warm stops, hue ∈ [40,75], chroma ≤ 0.06 — the `proof-teal-navy-purge` `[180,270]` band stays clear by construction; the gate reds a teal literal in `constants.ts`).
- `--paper-grid-face-depth` registered `@property <number>` inheriting (the `--paper-grid-warp-depth`/`--glass-depth` precedent) so a host interpolates the face depth smoothly on any ancestor.

### 3d. Reconcile with `BD.W-PAPERGRID-WARP`

That wave (re-read at HEAD) is **stale** — it describes deepening the *retired* `curlWarp` LINE-warp with "+1 octave." The codebase has ALREADY moved to `cellTwist` (the C3 cure, `BD.W-VIZ-RESPEC`). The DELTA-ASSAY amendment: **re-point `BD.W-PAPERGRID-WARP` from "deepen the line-warp curl octave" to "render the FACE."** Keep its three genuinely-fit fences verbatim (they transfer cleanly): the **measured cell-pitch CV<0.15** legibility fence (now bounds the squash inflation), the **byte-identical default** (`faceAlpha:0`), the **NUMERIC twin parity** via `shader-eval-harness.assertParity` (the new `faceHeight`/`facePlateau` round-trip JS↔WGSL↔GLSL ≈0, not name-presence). The "+1 octave on the kept operator" clause is REPLACED by "+1 face layer on the kept cellTwist." No dup vs concentric (concentric extracts level-set CONTOURS of `heightField`; paper-grid fills CELL faces — distinct extractions of the shared field) or paper-morphism (that is CSS grain/grit on chrome, not a viz).

---

## 4. Cross-engine (Chrome + Safari) + perf — the §L7 arm

- **The whole effect is one extra fragment term — GPU-only, the lightest viz in the suite stays light.** No mesh, no compute, no second pass, no `backdrop-filter:url`. Safari's WebGL2 path (`paperGridGLSetup.ts`) gets the identical face math via the `WAVE_FIELD_GLSL` splice; the `fwidth`-based plateau AA is WebGL2-safe (already used for the Golus lines). sRGB output via `linearToSrgb`/`OETF_GLSL` (grep-confirmed) — color-interp correct on WebKit.
- **No naive ellipsoids / meatballs here** — paper-grid is not a goo viz; the cross-engine meatball law applies to the dock/blob, not this surface. The §L7 obligation it DOES carry: the **paired-engine π** (Chromium AND WebKit WebGL2 fallback) proving the faces paint + ripple in both.
- **Offscreen-pause + PRM**: inherited unchanged from `usePaperGrid` (`useIntersectionPause` + the `DockBackgroundToggle` WCAG-2.2.2 pause; PRM → `amp` snaps, one static frame — the faces seat at `env`'s frozen value, no animation). The face adds zero new RAF, zero new listeners.
- **Premultiplied-over-transparent identity preserved** (`blendFunc(ONE, ONE_MINUS_SRC_ALPHA)`): the face's `faceA` and the line's alpha composite in premultiplied space; the page reads through the gutters exactly as today.

## 5. The §3 colorful-field reconcile (binding)

paper-grid's warm faces are the FOREGROUND; the headline §3 fix (a colorful field BEHIND it) is **NOT** owned here. Route it into the SHARED `BD.W-PAGE-BACKGROUND` map (`manifest.ts` `CATEGORY_DEFAULT_BG` → the substrates band stages over a calm contained live field, offscreen-paused, one-GL-per-route). The face-warp even HELPS presence (a filled warm sheet over a live field reads as transmissive paper). NO sibling, NO `auroraFallbackGround`.

## 6. Gate / π (painted-pixel, not geometric-proxy)

- **The face PAINTS, ripples, BOTH modes + WebKit project** (`tests-visual/papergrid-face.spec.ts`): a `<PaperGrid :faceAlpha="…">` capture shows FILLED warm cells whose shade + filled extent travel as a band across the field (frame-series: the crest-row faces are brighter/fatter than the rows ahead/behind). A **painted-pixel readback** — sample a scanline, assert the ink-fraction (filled-face coverage) is HIGH inside the crest band and LOW ahead of it (the traveling ripple), NOT a geometric proxy on the uniform table. Born-RED on HEAD (no faces — ink-fraction ≈ 0 everywhere, only hairlines).
- **CV<0.15** measured off `samplePaperGrid` at the deep register (the kept WARP fence) — the squash inflation stays legible.
- **Numeric twin parity** `faceHeight`/`facePlateau`/`faceRelief` JS↔WGSL↔GLSL ≈0 via `shader-eval-harness.assertParity` (coefficient-flip bite).
- **Teal-navy purge**: `proof-teal-navy-purge.mjs` reds any `[180,270]` literal in `constants.ts` — the two warm face stops (hue 40-75) pass by construction.
- **Byte-identical default**: `faceAlpha:0` → the existing line-only `proof:viz-papergrid` cage stays GREEN.

---

## 7. What is KEPT / REFINED / RE-INVENTED (survival of the fittest)

| Piece | Verdict | Why |
|---|---|---|
| `cellTwist` per-cell rotation/shear | **KEPT** | The warp math is correct — it was just invisible. The face makes it SEEN. |
| Ben Golus derivative-AA lines | **KEPT, re-cast** | Become the *creases* on the warped paper sheet (crisp at any DPR). |
| shared `curlFBM` + `travelingEnvelope` + `curlScalar` | **KEPT** | The face's height SHARES the wave phase + curl flow (coherence, no second basis). |
| `cursorSwirl`, substrate lifecycle, offscreen-pause, PRM, twin parity | **KEPT** | Fit; the face inherits them. |
| warm-amber ink, premultiplied-over-transparent | **REFINED** | Add two warm FACE stops; same identity + composite. |
| the FILLED CELL FACE (height-shaded plateau + squash inflation) | **RE-INVENTED** | The structurally-absent headline — the one broken piece. |
| `BD.W-PAPERGRID-WARP` "+1 octave on retired curlWarp" | **RE-POINTED** | Stale (curlWarp retired); amendment swaps "+1 octave" → "+1 face layer," keeps the CV/byte-default/numeric-parity fences. |
