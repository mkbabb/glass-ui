# PaperGrid greenfield — LENS C (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> Greenfield brainstorm. Designs the item ANEW through the 1940s-technicolor flow-&-punch lens, then unions back into the extant `paper-grid` engine (survival-of-the-fittest: keep the fit, refine the weak, RE-INVENT the broken). Every cited symbol grep-verified at HEAD. No magic constants smuggled, no teal/navy re-opened, no phantom waves, no geometric-proxy gate — the bar is **painted-pixel readback of CELL FACES warping in a traveling wave, both modes, default-to-broken.**

---

## 0. LIVE INTERROGATION (what actually paints — chrome-devtools, `/substrates/paper-grid`, painted-pixel + code-grounded)

Captured shots: `shots/pg-canvas-light.png`, `shots/pg-canvas-dark.png`. Canvas `1346×1254` (DPR 2), substrate ticking (`requestAnimationFrame` confirmed live, `ticking:true`).

The four interrogation questions, answered against the painted truth:

1. **Does it warp the CELLS or only the LINES? → It warps NEITHER, and that is the root cause.** The live grid reads as a near-static set of *faint hairlines*. There is no perceptible warp of any kind at the default register, and crucially **the cells (the quad faces) cannot warp because they are never drawn.** Source-verified: `fs_main` (`paper-grid.wgsl.ts:152-195`) computes `let line = max(minor * u.grid.z, major * u.grid.w)` and returns `vec4f(col * a, a)` where `a = line * u.field.x`. The fragment output is **line ink over transparent — the cell interiors carry ZERO alpha.** The "cell-twist" the shipped code does (`cellTwist`, `waveField.ts:106`) twists the *sampling coordinate* `g` before the Golus line-extraction; twisting `g` only re-locates where the *isolines* (the `fract(g)` ridges) land. With no face fill, the eye has nothing to read as an inflating/shearing quad — it can at best read a LINE that bends. This is *exactly* the user's verbatim defect: **"warps the CELLS not the lines."** The current engine is architecturally a line-warp dressed up as a cell-warp. (The `cellTwist` pivot-about-center math is genuinely correct and worth keeping — but it is invisible because there is no face to carry it.)

2. **Is the wave alive, weighty, beautiful? → No.** At `minorAlpha: 0.12` warm-amber ink (`constants.ts:80`) over flat cream, the field is so low-contrast the traveling crest is imperceptible at a glance (the shots show a flat grid). `twistMax: 0.62` / `shearMax: 0.26` (`constants.ts:83-84`) ARE a dramatic deformation in the math — but applied to invisible faces and barely-visible lines, the user sees nothing move. The motion is technically present (spring-eased `getAmp`) but visually dead.

3. **Vivid/warm, no teal/navy, over a colorful field? → Warm ✓ (no teal/navy — `WARM_IDENTITY_INK {L:0.62,C:0.05,h:62}`, `proof-teal-navy-purge.mjs` guards it). Colorful field ✗.** Live ancestor walk: `paper-grid-canvas` → `paper-grid-wrapper absolute inset-0` (transparent) → transparent → transparent → the glass configurator panel. **There is NO live field behind the grid** — it floats on flat cream. This is the systemic §3 finding, now confirmed for the 9th viz. The fix routes into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh (NOT a new sibling, NOT `auroraFallbackGround`).

4. **Cross-engine twin parity, lifecycle, performant? → Structurally clean.** `paper-grid.wgsl.ts` ↔ `paper-grid.glsl.ts` ↔ `paperGrid.ts` transcribe line-for-line; both splice the SHARED `WAVE_FIELD_WGSL`/`WAVE_FIELD_GLSL` chunk + the SHARED `CURL_FBM_*` curl operator (ONE curl source per backend). The substrate is the shared `createGpuSubstrate` picker (`usePaperGrid.ts:166`), no own rAF. This skeleton is FIT — the greenfield must extend it without re-forking.

**VERDICT: the headline ("CELLS warp in a traveling wave") is structurally UNMET. The cure is not more twist amplitude (already 36°) and not a math-class change (the curl + cellTwist are SOTA) — it is to actually DRAW THE CELL FACE and let the face carry the deformation the cell-twist already computes.**

---

## 1. THE CORE IDEA — *paper that buckles*: draw the cell FACE as a shaded technicolor tile, light it as a height-field, and let the traveling wave INFLATE the faces it crosses

The 1940s-technicolor register is about **mass that moves with weight.** A wireframe has no mass. So the gestalt move is: stop rendering a wireframe and start rendering **a sheet of square paper tiles** — each grid cell is a *filled quad face* with its own fill, its own rim, and its own cast shadow. The traveling wave then does to the FACES what it currently does to the lines: as the Gaussian crest sweeps the diagonal, the tiles it passes over **inflate (squash & stretch), tilt toward the light, brighten, and cast a longer cartoon shadow onto their neighbors** — a literal sheet of paper rippling, the crest a bulge travelling across it. Calm flat tiles ahead of the crest; a raised, lit, shadow-throwing bulge AT the crest; tiles settling back behind it (follow-through). That is the headline, and it is a **face-fill render change, not a warp-math change** — the `cellTwist`/`travelingEnvelope`/`curlScalar` machinery the engine already ships becomes the DRIVER of the face shading instead of an invisible coordinate twist.

Concretely, three composited reads per cell, all driven by the SAME `env`+director the engine already computes:

- **The FACE (new — the broken thing re-invented).** Each cell gets a filled interior: `faceCoverage(g) = (1 − minorCoverage)` masked to the cell, tinted by a **height-lit warm fill**. The crest envelope `env ∈ [0,1]` is the cell's height `h`. A cheap Lambert-ish shade `1 + h·dot(faceNormal, L)` brightens raised tiles and darkens the falling backs — the paper catches the light as the bulge passes. This is what makes a CELL visibly warp: the eye reads a lit, raised, breathing tile, not a bent line.
- **The CAST SHADOW (the cartoon punch).** A raised tile throws a hard-edged offset shadow onto the cell down-light of it (the `--shadow-cartoon` cel-shadow register, but evaluated *in-shader* as a second offset `faceCoverage` sample at `g + shadowOffset·h`, darkening the warm ground). The offset **travels opposite the crest motion** (the cel light stays fixed while the bulge moves — design.md §L4/§413 moving-cast law). This is the single read that screams "technicolor cartoon": tiles that lift off the page and drop a bold shadow as the wave rolls through.
- **The LINE (kept — the fit thing refined).** The Ben Golus crisp rule (`gridCoverage`) STAYS, brightest-wins over the face, as the tile's inked edge/rim. It now reads as the *crease* of the paper, not the whole viz. Refine: the line brightens on the lit crest (the rim catches light too) so the crease pops where the bulge is.

The **squash & stretch with real weight** is the existing spring-eased `getAmp` (the envelope amplitude inertia) PLUS a new **volume-preserving face inflate**: a crested tile scales its face up by `1 + k·h` while its neighbors compress slightly (anticipation/overlapping-action — the bulge borrows area from the cells ahead of it, gives it back behind). Arcs come for free from the curl director already steering the twist. Anticipation: a thin negative-`env` lip just AHEAD of the crest (the paper dips before it rises — a classic cartoon wind-up) via `env' = env − 0.15·env(ahead)`.

### THE SINGLE BOLDEST MOVE

**Render the grid as a LIT, SHADOW-CASTING HEIGHT-FIELD OF PAPER TILES — the traveling wave is a physical BULGE that inflates the cell FACES, tilts them to a fixed cel-light, and makes them throw hard cartoon shadows onto their neighbors.** The cell stops being the empty space between four lines and becomes a *shaded piece of paper that lifts off the page as the wave rolls under it.* One shader move — composite a height-lit face fill + an in-shader cast-shadow under the kept Golus crease, all driven by the `travelingEnvelope` the engine already computes — converts a wireframe-wobble into an unmistakable sheet-of-paper ripple. The cells warp because, for the first time, there are cells.

---

## 2. THE MECHANISM (precise, source-verified, UNION not fork)

### 2.1 Shader — extend `fs_main` with a face/shadow composite ABOVE the kept line read

The deformation driver is unchanged: `cellTwist` (`waveField.ts:106`) + `travelingEnvelope` (`:53`) + `curlScalar` (`:76`) stay byte-identical — they are SOTA and FIT. What changes is what `fs_main` *paints*. New composite, in `paper-grid.wgsl.ts` `fs_main` (and the GLSL twin + the `samplePaperGrid` JS oracle, all three line-for-line):

```
// h = the cell's height this frame = the crest envelope at the cell center, spring-eased.
//     (travelingEnvelope is ALREADY computed inside cellTwist; expose it via a sibling
//      `cellHeight(g, cellSize, t, wave...)` in waveField that returns env*amp — ONE math source.)
let h        = cellHeight(g, ...wave, amp);                 // [0,1]
// face mask: 1 inside the cell, 0 on the crease (the complement of the Golus line).
let face     = (1.0 - gridCoverage(g, u.grid.x, dv));      // reuses the SAME coverage fn
// height-lit warm fill: raised tiles brighten toward the warm-cream identity ceiling.
let lit      = 1.0 + h * dot(faceNormal(g, h), LIGHT_DIR); // cheap Lambert, LIGHT_DIR fixed
let faceCol  = u.faceTint.rgb * lit;                        // faceTint = a NEW preset uniform
// cast shadow: a second face sample offset opposite the crest, darkening the ground by h.
let shadow   = (1.0 - gridCoverage(g + SHADOW_OFFSET * h, u.grid.x, dv)) * h * SHADOW_DARK;
// composite: ground → minus cast shadow → plus lit face → plus the kept Golus crease (max).
```

- **`cellHeight`** is a thin new export in `waveField.ts`/`.glsl`/`.wgsl` that returns `travelingEnvelope(cc,…)·amp` — the EXACT scalar `cellTwist` already computes internally (`waveField.ts:123`). No new wave math; it surfaces an existing intermediate so the face shading and the twist read the SAME crest. (Refactor `cellTwist` to call `cellHeight` so there is provably ONE envelope.)
- **`faceNormal`** is the screen-space gradient of `h` across the cell (central-difference of `cellHeight`, reusing the curl-eps idiom `CURL_EPS = 0.012`, `paperGrid.ts:39`) — the tile tilts where the bulge slopes. No new constants.
- **`faceTint`, `SHADOW_DARK`, `SHADOW_OFFSET`, `LIGHT_DIR`** are NOT magic in src — `faceTint` defaults to **transparent (face alpha 0)** so the shipped library identity is byte-frozen (the face render is OPT-IN, presets-in-consumers). The DEMO preset in `demo/stories/substrates/presets.ts` lifts `faceTint` to a warm-cream fill + sets `faceAlpha`, `shadowDark`, `lightDir` — the vivid technicolor punch lives in the consumer, src/ identity unchanged (the [presets-in-consumers] law).
- The kept-line path (`max(minor, major)` → premultiplied over transparent) is the **default when `faceAlpha == 0`** — the existing `proof:viz-papergrid` cage + the warm-identity fence stay GREEN by construction.

### 2.2 Config — three OPT-IN face fields on `PaperGridConfig` (default = byte-identical line-only)

Add to `PaperGridConfig` (`constants.ts:21`), all defaulting to the line-only shipped render:
- `faceTint: OklchStop | "transparent"` (default `"transparent"` → no face → byte-identical).
- `faceLift: number` (default `0` → no inflate; the demo preset → ~0.18 vol-preserving).
- `shadowDark: number` (default `0` → no cast shadow; demo → ~0.22).

The DEMO preset sets these to the vivid register. `DEFAULT_PAPER_GRID_CONFIG` stays line-only (the src/ identity byte-frozen — the cage gate diffs it against HEAD).

### 2.3 Cartoon-shadow & motion vocabulary (the CSS register the page composes — design.md §L4/§L7)

The IN-SHADER cast shadow is the *micro* cartoon read (per-tile). The viz CARD composes the *macro* cartoon register from the EXISTING tokens (grep-verified): `--shadow-cartoon-md` (`tokens/shadow.css:95`) on the card via `.cartoon-surface` (`cards.css:178`), `--ease-cartoon-punch` on the configurator interactions, `--scale-press` (`tokens/scale-paper.css:26`) on the controls. The viz's own motion weight is the spring-eased `getAmp` already in `usePaperGrid` — no new motion engine. `--motion-weight` scales the in-shader `SHADOW_OFFSET` travel (heavier weight → longer cast-shadow throw), wired as a uniform from a CSS custom-prop read (the `--dock-scale` register precedent).

### 2.4 The colorful field — route into the SHARED `BD.W-PAGE-BACKGROUND` (NOT a sibling)

The §3 flat-field cure is NOT this viz's job to re-invent. `BD.W-PAGE-BACKGROUND` already maps `substrates → aurora` (the live contained field) — the paper-grid demo route must inherit that warm-mesh ground so the (now face-filled, semi-translucent) tiles refract a LIVE colorful field. The face fill is authored with a **partial alpha** (the demo preset's `faceAlpha ≈ 0.5`) precisely so the aurora ground reads THROUGH the paper — glass-over-painterly, the iOS-27 transmissive read. No `auroraFallbackGround`, no new background primitive: the shared page-background wave owns it; this design just declares the dependency and authors the face fill translucent enough to honor it.

---

## 3. CROSS-ENGINE (Chrome + Safari) & a11y/PRM

- **Twin parity (the binding fence).** The face/shadow/height composite transcribes into all THREE: `samplePaperGrid` (JS oracle, `paperGrid.ts:220`), `paper-grid.wgsl.ts` `fs_main`, `paper-grid.glsl.ts` `main`. `cellHeight`/`faceNormal` land as shared chunks in `waveField.{ts,glsl,wgsl}` (the ONE-math-source precedent the file already enforces). Parity closes against the REAL numeric round-trip (the W-WAVE-FIELD-HARNESS `assertParity` net), NOT a name-presence regex — a sign-flipped `faceNormal` or a `LIGHT_DIR` typo in one backend reds at ΔE > bar. The Golus crisp-line fence (`length(vec2(dpdx,dpdy))` per axis) is untouched — the face fill reads the SAME `dv` derivative, so the crease stays exactly-N-device-pixels crisp at any DPR.
- **Safari.** Paper-grid is a pure fragment pass on WebGL2 (`paperGridGLSetup.ts`) — no `backdrop-filter:url`, no compute, sRGB color-interp via the shared `OETF_GLSL`. The face fill + in-shader shadow are plain fragment math → identical on WebKit's WebGL2. The cartoon card shadow is the static `--shadow-cartoon-md` token (compositor-only box-shadow on the card, not animated). Honors the MEATBALLING/Safari floor: nothing here uses a goo filter (paper-grid is not a metaball viz) so the Safari-goo carve is N/A — but the @supports/PRM floors of the shared substrate apply.
- **PRM.** `respectReducedMotion: true` (`constants.ts:96`) → the substrate seats ONE static frame at `amp = 0`. At `amp = 0`, `cellHeight ≈ 0` → faces flat, NO cast shadow, NO inflate → the grid reads as a calm static lit sheet (a still photo of paper, legible, no motion). The PRM single-paint is inherited from the substrate; the face render degrades gracefully to flat tiles.
- **Legibility fence (the kept CV idea, re-pointed).** The face inflate (`faceLift`) is held under the same MEASURED cell-pitch CV<0.15 legibility floor from `BD.W-PAPERGRID-WARP` (off `samplePaperGrid`): the tiles bulge but the grid still reads AS a grid. A `faceLift` that smears the lattice illegible reds the measured-CV gate. The shadow/face are gated by the SAME `env`, so they never out-run the legibility fence.

---

## 4. UNION / DELTA-ASSAY (reconcile vs the 116 union waves — no dup, extend don't fork)

- **Reconciles with `BD.W-PAPERGRID-WARP` (extends it, supersedes its line-only framing).** That wave deepens the *coordinate* warp (+1 octave on the kept curl operator under a CV<0.15 fence) — a LINE-warp deepen. The DELTA this lens adds: the deepen is invisible without a face to carry it, so the amendment is **"render the cell FACE (height-lit + cast-shadow, OPT-IN, src byte-frozen) so the existing twist/warp becomes VISIBLE as a cell-warp."** Keep that wave's MEASURED-CV fence + numeric-parity discipline verbatim; ADD the face-render arm. Same gate (`proof:viz-papergrid`), one new clause (P6: the face render is OPT-IN, default `faceAlpha:0` byte-identical, and the face/shadow transcribe numerically across backends).
- **No dup vs concentric / paper-morphism.** Concentric extracts level-set CONTOURS of a height field (`cellWarpBeforeHeight`, `waveField.ts:245`) — curved nested rings, a different render. Paper-morphism is the static paper-GRAIN texture (`paper-grain-spike.html`) — a surface noise, not a moving height-field. This lens is the SQUARE-TILE lit height-field — distinct from both, and it REUSES the shared `cellHeight`/`travelingEnvelope`/`curlScalar` leaf (no third basis).
- **Survival of the fittest.** KEEP: the substrate (`createGpuSubstrate`), the Golus crisp line (`gridCoverage`), the curl operator (`curlFBM`), the cell-twist pivot math (`cellTwist`), the warm-identity ink + teal-navy purge, the spring-eased `getAmp` inertia, the three-backend ONE-math-source discipline. REFINE: the line brightens on the crest (the crease catches light). RE-INVENT (the broken thing): the FACE — draw it, light it, shadow it, inflate it, so the traveling wave warps CELLS not lines.

---

## 5. GATE (painted-pixel, default-to-broken — no geometric-proxy, no false-pass)

Extend `scripts/proof-viz-papergrid.mjs` + `tests-visual/papergrid-*.spec.ts`, born-RED on HEAD:
- **P-FACE (the headline, painted-pixel):** at the DEMO preset (`faceAlpha>0`), a π readback at the crest band shows **filled cell interiors carrying alpha** (the face paints) that **brighten where `cellHeight` is high and darken in the cast-shadow offset** — a real lit, shadow-throwing tile, measured in painted pixels, NOT a geometric proxy on `g`. Born-RED on HEAD (HEAD outputs line-only `a = line·fieldAlpha` → cell interiors are alpha 0).
- **P-WAVE (alive):** a 3-frame π series shows the lit bulge + its cast shadow TRAVELLING along `waveDir` (the crest moves between frames; the brightened/shadowed band advances). A static face reds.
- **P-IDENTITY (src byte-frozen):** `DEFAULT_PAPER_GRID_CONFIG` stays `faceTint:"transparent"` / `faceLift:0` / `shadowDark:0` → the bare `<PaperGrid>` is byte-identical to the HEAD line-only capture. A default with a face reds (presets-in-consumers).
- **P-PARITY (numeric, not name-presence):** `cellHeight`/`faceNormal`/the face composite round-trip JS↔WGSL↔GLSL ≈0 via `assertParity` — a coefficient flip in one backend reds.
- **P-WARM (the binding purge holds):** `proof-teal-navy-purge.mjs` stays GREEN — `faceTint` defaults transparent, the demo lift is warm-cream (hue 62), no hue ∈ [180,270] anywhere.
- **P-FIELD (the §3 cure):** the demo route inherits the SHARED `BD.W-PAGE-BACKGROUND` aurora ground; a flat transparent ancestor stack (today's state) reds the field-presence π.

---

## 6. ONE-LINE SUMMARY

The grid never warped its cells because it never DREW any — `fs_main` paints line ink over transparent, so the (correct) cell-twist only re-locates invisible isolines (a wireframe wobble). The cure: render each cell as a **lit, cast-shadow-throwing paper TILE** and let the traveling Gaussian crest the engine already computes INFLATE, light, and shadow the faces it rolls over — a physical sheet of technicolor paper buckling — as an OPT-IN face render (src byte-frozen, vivid lift in the demo preset), gated by painted-pixel readback of the faces, not a geometric proxy.
