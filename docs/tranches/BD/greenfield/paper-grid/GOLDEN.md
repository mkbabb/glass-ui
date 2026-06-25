# PaperGrid — GOLDEN reference: the LIT RIPPLING PAPER SHEET

> The single synthesized variant. Three lenses converged on ONE diagnosis (the cells never
> warp because the shader paints only line ink over transparent — `vec4f(col*a, a)`, zero face
> fill) and ONE spine (the geometry is already right: `cellTwist` twists each cell about its own
> center, gated by a traveling Gaussian crest, directed by the shared curl — it is just
> INVISIBLE because there is no face to carry it). The GOLDEN move is the union of the best of
> each lens: **render the cell FACE, lit by the slope of the SAME traveling-wave height the twist
> already rides, with a volume-preserving squash so the face physically inflates at the crest —
> so the twist becomes a VISIBLE lit ripple.** Tranche-DEV spec; the `src/` identity stays
> byte-frozen (presets-in-consumers), the vivid lift is a DEMO preset. De-risked live —
> `golden/paper-sheet-spike.html`, Chrome, painted-pixel readback below.

---

## 0. The synthesis — what each lens contributed, and the reconciliation

| Move | Source | In GOLDEN |
|---|---|---|
| Consume the already-shipped **`heightField`/`travelingEnvelope`** as the sheet height; **slope-shade** (`∇H` → Lambert against a fixed warm cel key-light) so the FACE catches the crest | **Lens A** (the LIT sheet) | **CORE** — the rippling read is LIGHT, not more line-bending (legibility by construction) |
| The mechanism stays **one fragment term, no mesh, no second pass, no second noise basis** — a `facePlateau` soft inset-square inside the warped cell; **all math in the shared `waveField` leaf** so JS oracle + WGSL + GLSL stay one source and concentric inherits | **Lens B** (KISS / cross-engine) | **CORE** — the deft-integration spine; `faceAlpha:0` default = byte-identical |
| **Volume-preserving SQUASH** — the plateau inset retreats at the crest so the filled face physically INFLATES then deflates behind the front (squash & stretch, overlapping action) | **Lens B §2 + Lens C** | **CORE** — the literal "quads inflate in a traveling wave"; bounded by the kept CV<0.15 fence |
| The **1940s-technicolor punch** — a warm-DIVERGENT face ramp (rose-umber trough → ember → amber → warm-wheat crest), the crease catching light on the crest | **Lens C** (AUDACIOUS) | **ADOPTED into the DEMO preset** (`PAPER_GRID_PRESET_RIPPLE`) — the vivid register lives in the consumer |

**The reconciled tensions:**

1. **Audacity vs correctness (Lens C's in-shader cast-shadow vs legibility).** Lens C proposed a
   second offset face-sample as a hard cartoon cast shadow. It is the boldest but the riskiest:
   a second coverage sample doubles the gutter math and a wrong offset reads as a smear, not a
   shadow — and it competes with the Golus creases for the dark register. **GOLDEN drops the
   in-shader cast shadow from the core** and gets the cartoon-shadow punch instead from (a) the
   slope-shade's warm-umber trough (the face's OWN self-shadow, free) and (b) the EXISTING
   `--shadow-cartoon-md` token on the viz CARD (the macro cel register, compositor-only,
   already shipped). The per-tile cast shadow becomes an OPTIONAL demo-preset flag, never the
   core — the bar is met by light, not by a second draw.

2. **Cross-engine correctness (the `∇H` derivative).** The slope is a **central-difference of
   `cellHeight` at the cell center** (reusing the `CURL_EPS` idiom), NOT a `dFdx` on the height.
   Only the Golus AA uses `dFdx`/`fwidth` (and already works on both backends). So the face-shade
   is plain per-pixel ALU — Safari WebGL2-safe by construction, no derivative-of-a-derivative.

3. **One basis (no second wave).** The height, the twist, and the shade ALL read the SAME
   `travelingEnvelope` × `curlScalar` — the crest that twists a cell is the crest that lifts and
   lights it. `cellTwist` is refactored to call the new `cellHeight` so there is provably ONE
   envelope (a sign drift reds the numeric parity gate).

**The result:** geometry (`cellTwist`, KEPT) × height (`cellHeight`, the surfaced envelope) ×
slope-shade (`faceRelief` → Lambert, NEW ~8 lines) × squash (`facePlateau` inset, NEW) × creases
(Golus, KEPT) = a sheet of warm paper that visibly RIPPLES as a lit, inflating crest sweeps over
and through it.

---

## 1. The visual + motion + interaction design

**Visual.** Each grid cell is a filled warm-paper FACE with a soft inset (a tile inside the
warped quad). The face is lit by a fixed upper-right cel key-light against the local slope of the
traveling-wave height: crest-facing slopes brighten to warm-wheat, trough-facing slopes fall into
rose-umber. The Golus minor+major lines stay byte-frozen and now read as the fold-lines / creases
of the sheet. Behind the transmissive grid sits a **warm colorful field** (§3) with a defined
edge — the lit sheet is glass-over-painterly, the page reads through the gutters.

**Motion (liquid-weight universal).** ONE coherent traveling front, never a global pulse:
- The `travelingEnvelope` crest sweeps along `waveDir`; the height-lift + slope-shade + squash
  are ALL gated by it, so the crest is a VISIBLE raised, lit, inflating ridge.
- **Inertia** — the spring-eased `getAmp` overshoot (`usePaperGrid.ts:101`, target 1.06 → soft-cap
  to 1) drives the envelope amplitude; now PERCEPTIBLE because the face carries it. Never tight/
  springy — the calm shipped `waveOmega:1.05`.
- **Squash & stretch** — the crest cells fatten their filled face (inset retreats), then deflate
  behind the front while the neighbour ahead begins to swell (overlapping action).
- **Anticipation/follow-through** — the velocity-lead + burst-ripple already derived in
  `usePaperGrid.ts` feed the cursor transient; the crest's weighty ease is the follow-through.
- **Arcs** — the front follows the curl-flow director (`curlScalar`), so it curves and braids, a
  natural-variation read, not a straight bar.

**Interaction (morph-more-on-move).** `cursorSwirl` (KEPT) twists the cells about the finger; the
GOLDEN extends it with a **local height-bump** about the cursor (same Gaussian radius) so a
finger-press visibly DENTS/INFLATES the sheet — the slope-shade reveals the dent. A flick sends a
transient secondary ripple (the existing burst axis). PRM → `amp=0` → one flat static lit frame.

---

## 2. The exact mechanism — tokens / recipes / shaders / composables + files

**All new math lands in the SHARED `waveField` leaf** (the ONE-source law the file already
enforces) so the JS oracle + both shader twins stay one source and concentric inherits the face
for free. paper-grid's files only CALL the new leaf functions.

### 2a. `src/composables/glass/wave/waveField.ts` (+ `.glsl.ts` + `.wgsl.ts`) — three new pure fns

- **`cellHeight(cc, t, waveDir, waveK, waveOmega, waveSigma, amp) -> number`** — the sheet
  displacement at a cell center = `travelingEnvelope(cc, …) * amp`, the EXACT scalar `cellTwist`
  already computes internally (`waveField.ts:123`). **Refactor `cellTwist` to call `cellHeight`**
  so there is provably ONE envelope. Range [0,1]. NO new noise basis.
- **`faceRelief(cc, cellSize, t, …wave, amp) -> Vec2`** — the central-difference slope of
  `cellHeight` across the cell (`ε = 0.5·cellSize`), the lit-fold normal source. Pure,
  derivative-free (no `dFdx`) → Safari-safe.
- **`facePlateau(g, inset, uvDeriv) -> number`** — soft inset-square coverage: `d = min over axes
  of (dist into cell from nearest gutter)`, `smoothstep(inset, inset + 2·aa, d)`. The shaders pass
  `aa = fwidth(g)` (the Golus precedent — crisp at any DPR); the JS round-trip passes a fixed
  `uvDeriv` (reproducible, like `gridCoverage`).

### 2b. `src/components/custom/paper-grid/composables/paperGrid.ts` — `samplePaperGrid` extends

After the kept `cellTwist`+`cursorSwirl`, compute `cc = floor(g)+0.5`, then
`h = cellHeight(cc,…)`, `grad = faceRelief(cc,…)`, the Lambert `shade`, the squashed
`inset = baseInset·(1 − squashK·h)`, `face = facePlateau(g, inset, uvDeriv)`. Return
`{ line, alpha, faceCov, faceShade }` (or fold the face into `col`+`alpha` per the gate's
premultiplied identity). The face composites UNDER the lines, both premultiplied over transparent.

### 2c. The shaders — `paper-grid.{wgsl,glsl}.ts` `fs_main` gain the face composite

```
// after: g = cellTwist(...); g = cursorSwirl(...);
let cc    = floor(g) + 0.5;
let h     = cellHeight(cc, t, wave.xy, wave.z, wave.w, wave2.x, amp);
let grad  = faceRelief(cc, 1.0, t, wave.xy, wave.z, wave.w, wave2.x, amp);
let n     = normalize(vec3f(-grad * uFaceRelief, 1.0));
let shade = clamp(0.5 + dot(n, normalize(uLight)) * 0.5, 0.0, 1.0);
let inset = uBaseInset * (1.0 - uSquashK * h);          // squash & stretch
let face  = facePlateau(g, inset, dv);
let faceA = face * uFaceAlpha * (0.45 + 0.55 * h);      // the ripple READS on the surface
let faceInk = mix(uWarmLo, uWarmHi, shade);             // warm-divergent ramp, hue [20,90]
// KEPT creases over the face:
let line  = max(minor * minorA, major * majorA);
var col = faceInk; var a = faceA;
a = line + a * (1.0 - line);  col = mix(col, uLineInk, line);
return vec4f(col * a, a);     // premultiplied over transparent — page reads through gutters
```

### 2d. `constants.ts` — OPT-IN face config (calm default byte-identical)

Add to `PaperGridConfig`, all defaulting to the line-only shipped render:
- `faceAlpha: number` — **default `0`** → the face evaporates → byte-identical to HEAD (every
  existing `proof:viz-papergrid` cage clause + the warm-identity fence stay GREEN).
- `faceRelief: number` (slope gain), `squashK: number`, `baseInset: number`, `faceWarmLo`/
  `faceWarmHi: OklchStop` (hue ∈ [20,90], the teal-navy purge clear by construction),
  `lightDir: [number, number]`.
- `--paper-grid-face-depth` registered `@property <number>` inheriting (the
  `--glass-depth`/`--paper-grid-warp-depth` precedent) so a host interpolates the face depth.

### 2e. `demo/stories/substrates/presets.ts` — `PAPER_GRID_PRESET_RIPPLE` (vivid, demo-only)

A warm-DIVERGENT face palette (rose-umber trough → ember → amber → warm-wheat crest, hues
∈ [20,90]) + `faceAlpha ≈ 0.62`, `faceRelief ≈ 2.6`, `squashK ≈ 0.42`, `baseInset ≈ 0.14`,
`lightDir` upper-right. The `src/` default stays `faceAlpha:0` (the warm-cream identity byte-frozen).

### 2f. The §3 colorful field — route into the SHARED `BD.W-PAGE-BACKGROUND` warm-mesh

The flat-field cure is NOT this viz's job to re-invent. The paper-grid substrates route inherits
the SHARED `BD.W-PAGE-BACKGROUND` warm divergent mesh (the SAME map dot-matrix / fourier-field /
concentric route to) — **NOT a new sibling, NOT `auroraFallbackGround`** (aurora's static
blue-cyan raster — a teal-navy purge VIOLATION). The face is authored translucent (`faceAlpha`
< 1) so the warm field reads THROUGH the paper — the iOS-27 transmissive read.

### 2g. The cartoon macro register — reuse EXISTING tokens, no new motion engine

`--shadow-cartoon-md` on the viz card (`.cartoon-surface`), `--ease-cartoon-punch`/`--scale-press`
on the configurator controls (all grep-verified shipped). The viz's own weight is the spring-eased
`getAmp` already in `usePaperGrid`. `--motion-weight` (the Band-0 token) scales the crest's
leading-edge lead (anticipation). NO new spring, NO new directive.

---

## 3. The cross-engine plan (Chrome + Safari) + a11y/PRM + perf

- **Twin parity is NUMERIC.** The three new fns land in the shared leaf (JS + GLSL + WGSL one
  source); `samplePaperGrid` extends to return the face-shade. Parity closes against the REAL
  numeric net (the `shader-eval-harness.assertParity` round-trip), NOT a name-presence regex. A
  sign-flipped `∇H` / a `2.02→2.0` drift in one backend → ΔE > bar → RED.
- **Safari-safe by construction.** One extra fragment term, GPU-only — no mesh, no compute, no
  second pass, **no `backdrop-filter:url`, no goo filter** (paper-grid is not a metaball viz, so
  the MEATBALLING/Safari-goo carve is N/A). `faceRelief` is central-difference (explicit, no
  `dFdx` on the height); only the Golus AA uses `fwidth` (works both backends). sRGB output via
  the shared `linearToSrgb`/`OETF` — color-interp correct on WebKit. The paired-engine π
  (Chromium AND WebKit WebGL2 fallback) captures the lit ripple on both.
- **a11y / PRM carve.** PRM → `amp=0` → envelope collapses → height-lift + slope-shade + squash
  evaporate → ONE flat static lit-square-grid frame (the substrate freeze, inherited
  `usePaperGrid.ts:98`). `prefers-reduced-transparency` → the face wash floors toward warm-cream
  solid (legible), creases crisp. The WCAG-2.2.2 pause seam (`DockBackgroundToggle`) parks the loop.
- **Legibility BY CONSTRUCTION.** The ripple is expressed in LIGHT + a bounded squash, NOT in more
  line-bending. The height-lift is a SHADE that does NOT move the Golus crossings; the squash inset
  is bounded by the kept **cell-pitch CV < 0.15** fence (off `samplePaperGrid`). The grid stays a
  legible grid throughout.
- **Perf.** ~10 added ALU ops per pixel (one height eval reusing the curl basis already computed
  for the twist + two central-difference height evals for the gradient + one dot + one plateau).
  No new texture reads, no new pass. Parked-when-hidden + offscreen-pause + DPR budget inherited.
  60fps both backends.

---

## 4. Deft integration — the KEEP / REFINE / RE-INVENT census (a UNION, no fork)

| Asset (grepped at HEAD) | Verdict |
|---|---|
| `cellTwist` (`waveField.ts:106`) cell geometry | **KEEP** — refactor to call `cellHeight` (ONE envelope) |
| `travelingEnvelope` (`:53`) / `curlScalar` (`:76`) shared director | **KEEP** — height + twist + shade share it |
| `heightField`/`waveSwell`/`waveFlow` shared helpers | reuse register where fit; `cellHeight` surfaces the envelope |
| Golus `gridCoverage` (`paperGrid.ts:153`) crisp creases | **KEEP byte-frozen** — re-cast as fold-lines |
| `cursorSwirl` (`waveField.ts:147`) | **KEEP** + extend with a local height-bump (same radius) |
| `samplePaperGrid` (`:220`) JS oracle | **REFINE** — return face-shade (numeric parity) |
| `getAmp` overshoot (`usePaperGrid.ts:101`) | **KEEP** — now perceptible via the face |
| WGPU/GLSL twin + substrate + pointer field + PRM | **KEEP** |
| the FILLED CELL FACE (height-lit plateau + squash) | **RE-INVENT** — the structurally-absent headline |
| `--shadow-cartoon-md`, `--ease-cartoon-punch`, `--scale-press` | **REUSE** (the macro cel register) |
| `BD.W-PAGE-BACKGROUND` warm-mesh | **ROUTE INTO** (shared, not a sibling) |
| `demo/.../presets.ts` WARM/SUFFUSE/BOLD | **ADD** `PAPER_GRID_PRESET_RIPPLE` (vivid, demo-only) |

**No new component, no new pass, no second basis, no fork.** The wave-amendment RE-POINTS
`BD.W-PAPERGRID-WARP` (its stale "+1 line-octave on the retired `curlWarp`" → "+1 FACE layer on
the kept `cellTwist`"), keeping its three fit fences verbatim — the **CV < 0.15** legibility fence
(now bounds the squash), the **byte-identical default** (`faceAlpha:0`), the **NUMERIC twin
parity**. Distinct from concentric (level-set CONTOURS of `heightField`) and paper-morphism (CSS
grain on chrome) — both reuse the shared leaf, no dup.

---

## 5. The acceptance bar

1. The cells read as **LIT FACES** (filled, shaded interiors), not a wireframe — both modes.
2. The wave is a **coherent TRAVELING lit front** that translates along `waveDir` — not a
   stationary twinkle or a global pulse.
3. **Vivid + warm**, every face/ink/highlight hue ∈ [20,90], ZERO teal/navy, over a colorful
   field with a defined edge (§3).
4. The **squash & stretch** is visible (filled face inflates at the crest, deflates behind) with
   liquid weight; bounded so the grid stays legible (CV < 0.15).
5. **NUMERIC twin parity** JS↔WGSL↔GLSL ≈0; **PERFECT in Chrome AND Safari** (paired-engine π).
6. **PRM** → one flat static lit frame; **byte-identical default** (`faceAlpha:0`); the Golus
   creases stay crisp at any DPR.

---

## 6. The born-RED gate sketch (painted-pixel, not a geometric proxy)

Extend `scripts/proof-viz-papergrid.mjs` + `tests-visual/papergrid-face.spec.ts`. **CRITICAL
readback precondition:** the WebGPU/WebGL canvas has no `preserveDrawingBuffer`, so a `readPixels`
AFTER the rAF clear returns all-zero (the spike hit this — see §7). The gate MUST read the DRAWN
buffer (a `preserveDrawingBuffer:true` capture context, or a `take_screenshot` pixel oracle, or a
post-`drawArrays` in-frame hook); a black/all-zero readback FAILS LOUD (the concentric lesson).

- **G1 — cells read as LIT FACES.** Over the crest band, the painted-face luminance has a
  measurable spread across cell interiors (crest-bright → trough-dark): `sdLuma ≥ floor` AND
  `facePaintFrac ≥ 0.4` (fraction of sampled pixels carrying face alpha). **HEAD reds** (line-only
  `vec4f(col*a,a)` → face alpha 0 → `facePaintFrac ≈ 0`, `sdLuma ≈ 0`).
- **G2 — coherent TRAVELING front.** Over N frames the bright-face band translates along `waveDir`
  (cross-correlation peak shift), not a stationary twinkle. HEAD reds (no lit band to translate).
- **G3 — vivid + warm, NO teal/navy, over a colorful field.** `warmHueFrac ≥ 0.85` (hue ∈ [20,90])
  over painted faces, `tealNavyFrac = 0` (hue ∈ [180,270]); the stage field behind measures
  chroma ≥ 0.045 (§3). HEAD reds (flat plate ~0.0128).
- **G4 — NUMERIC twin parity.** `cellHeight`/`faceRelief`/`facePlateau` round-trip JS↔WGSL↔GLSL ≈0
  via `assertParity`. A coefficient flip in one backend reds.
- **G5 — legibility + PRM + byte-default.** The Golus crossings unmoved by the height-lift (a SHADE
  not a smear), CV < 0.15 under the squash; PRM seats ONE flat static lit frame; the bare
  `<PaperGrid>` (default `faceAlpha:0`) is byte-identical to the HEAD line-only capture. BOTH modes
  + the WebKit project.

Self-test bites: a flat-fill face (no slope-shade) → G1 RED (`sdLuma` collapses); a stationary
pulse → G2 RED; a cool [180,270] highlight → G3 RED; a sign-flipped `∇H` in one backend → G4 RED;
a face that defaults non-zero → G5 RED; a squash that moves the Golus crossings → G5 RED.

---

## 7. De-risk — the prototype (BUILT + live-verified)

`golden/paper-sheet-spike.html` — a throwaway self-contained WebGL2 fragment pass that reproduces
the GOLDEN kernel (the kept `cellTwist`/`gridCoverage` + the NEW `cellHeight`/`faceRelief`/
`facePlateau`/squash, transcribing the planned leaf math line-for-line) over a warm divergent
conic field (the §3 stand-in). Verified live in Chrome (`golden/shots/pg-golden-light.png`):

- **Screenshot:** filled warm cell FACES that twist about their own centers, lit so crest-facing
  faces brighten to warm-wheat and troughs fall into rose-umber — an unmistakable rippling sheet,
  with the Golus creases reading as fold-lines, over a warm colorful field. NOT a wireframe.
- **Painted-pixel readback** (in-frame, post-`drawArrays`, the preserved-buffer gotcha handled):
  `facePaintFrac = 0.679` (faces PAINT), `sdLuma = 41.3` over `meanLuma 51.8` (the slope-shade
  lit gradient — G1), `warmHueFrac ≈ 1.0`, `tealNavyFrac = 0` (G3). The first naive readback
  returned all-zero — the documented preserved-buffer trap, now baked into the §6 gate precondition.

The boldest mechanism (height-lit face + squash inflation) is proven to paint the rippling-sheet
read in painted pixels, on pure WebGL2 fragment math (Safari-parity by construction — no `dFdx`
on the height, no goo filter, sRGB output), BEFORE any `src/` change.

---

## 8. HARDENING — the challenge folds (binding amendments to §0-§7)

The three adversarial challenges + the live DELTA-ASSAY land these BINDING corrections. The spine
survives; these MUST enter the wave.

- **FOLD A (challenge-1+2 R1/R2, CORRECTNESS, TOP) — sample the face on the PRE-TWIST cell center.**
  `cellTwist` gates on `cc=(floor(g/cs)+0.5)*cs` then returns the twisted `g`; recomputing
  `cc=floor(g)+0.5` on the twisted coord lands in a NEIGHBOUR cell at the crest (floored twist
  ≥0.62·twistMax crosses the boundary). **Refactor `cellTwist` to RETURN `{ g, cc, env }`; sample
  `cellHeight`/`faceRelief` at that driver `cc`.** `facePlateau` coverage still uses `fract(twisted_g)`
  for the inset SHAPE; only the height/slope SOURCE moves. Gate G4b: bright-face centroid coincides
  with max-twist centroid within ½ cell.
- **FOLD B (challenge-3 R1 + challenge-2 R5, DESIGN) — multi-stop, HEIGHT-keyed ramp.** A 2-point
  `mix(lo,hi)` parks at mid (`shade≈0.5`) → muddy brown-orange, ZERO pixels in hue 50-90, lit-CV
  ≈0.20 (live readback). Re-author `faceInk=ramp(rose-umber, ember-amber, warm-wheat; mix(shade,h))`
  so HEIGHT drives the wheat crest; re-tune `faceRelief`/`lightDir` so `shade` traverses [0.15,0.95].
  Gates G3b (crest hue ≥55 for ≥0.3 of brightest-decile pixels) + G1b (`sdLuma/meanLuma ≥ 0.35`).
- **FOLD C (challenge-3 R2, DESIGN) — crest-GATE the `TWIST_FLOOR`.** `TWIST_FLOOR=0.62` crinkles
  EVERY cell (static foil, no calm paper to ripple across). Multiply the floor by `env` so off-crest
  cells relax to near-flat. Gate G2b: trough-band twist < 0.3× crest-band.
- **FOLD D (challenge-1 R3, KISS) — drop the `h`-term on `faceA`.** `faceA=face·faceAlpha·(0.45+0.55·h)`
  triple-couples the crest (alpha+ink+inset). Let the SHADE carry brightness, the SQUASH carry
  inflation — `faceA=face·faceAlpha·fieldAlpha` (ONE field-blend scalar; `fieldAlpha` is the
  existing GLOBAL line-subtlety, RECONCILED — the face composes UNDER the line, multiplied by it).
- **FOLD E (challenge-2 R3c) — transcribe the production OETF on the face path.** The spike fed RAW
  linear face ink (no `linearToSrgb`); production routes `faceInk` through the shared OETF. Re-verify
  `warmHueFrac`/`tealNavyFrac` AFTER the transfer (a warm linear triple can shift hue through it).

**CORRECTION 1 — §2f/§3: `BD.W-PAGE-BACKGROUND` is NOT a phantom.** It is on disk in
`docs/tranches/BD/union/waves/` (the challenges grepped the wrong dir). The route-into is a real
DEPEND edge. BUT it enrolls forms/containers/feedback — NOT the `substrates` band — so the
`/substrates/paper-grid` page's own backdrop stays flat; the §3 field is THIS amendment's own small
stage-paint, cross-linked. The FACE clauses (G1/G1b/G3/G3b) measure over a NEUTRALIZED field so a
missing field REDS the FACE gate, not a vivid conic masking it.

**CORRECTION 2 — §0/§2a: CUT "concentric inherits the face for free."** Concentric's height is
`heightField` (FBM), NOT `cellHeight`. The shared-leaf placement is the right DRY home (concentric
MAY later reuse), but it is not auto-inheritance.

**CORRECTION 3 — §1/§4: the cursor height-bump is DECORATIVE.** It is a NET-NEW term (not "extend
`cursorSwirl`"); bill it RE-INVENT in its own parity clause. It stays `aria-hidden` ambient art —
NO WCAG-2.1.1 keyboard equivalent owed (challenge-2 R4).
