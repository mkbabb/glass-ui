# PaperGrid — DELTA-ASSAY: golden-vs-current + the UNION path

> The golden ("render the cell FACE, lit by the slope of the SAME traveling-wave height the
> twist already rides, with a volume-preserving squash") vs the CURRENT line-only render,
> assayed against three adversarial challenges and a LIVE inspection of `/substrates/paper-grid`
> (Chrome :5173, both modes, painted-pixel + getComputedStyle). The verdict: **REFINE** — the
> spine is fit and the integration is genuinely deft; the headline (the filled lit face) is a
> structurally-absent RE-INVENT that lands as ONE fragment term on the KEPT geometry. No fork,
> no second pass, no second basis. Convergence ~80%.

---

## 0. The live DELTA (what I saw at HEAD, both modes)

Captured: `delta-head-light.png` (page header), `delta-canvas-light.png` + `delta-canvas-dark.png`
(the canvas + configurator), via chrome-devtools-mcp.

| Probe | HEAD reading | Verdict |
|---|---|---|
| Canvas backend | `webgl2` (the WebGPU picker FALLS despite `navigator.gpu` — same as fourier/dot-flow live) | the cross-engine WebGL2 path is the LIVE path, not a fallback-only theory |
| Cell render | a faint warm-grey grid of **LINES** over a flat plate; **cell interiors EMPTY** (transparent); no lit faces, no traveling lit crest visible | **born-RED VISUALLY TRUE** — the GOLDEN diagnosis confirmed |
| Twist | a subtle cell-lean reads near the lower band (the geometry IS firing) but carries NO fill, so it is nearly invisible | the twist is REAL but INVISIBLE — exactly "there is no face to carry it" |
| Field behind | entire canvas ancestor chain `rgba(0,0,0,0)` / `background-image:none`; nearest paint `.configurator.glass-floating` `oklab(0.793 … / .84)` → chroma ≈ **0.0128** (< the §3 0.045 floor) | the systemic flat-page root: gray-cream glass over nothing, NOT a colorful field |
| Warm identity | lines warm-grey, low chroma, NO teal/navy, both modes (dark = warm-grey on near-black, warm floor holds) | the warm-cream identity + teal-navy purge HOLD |
| Paint head (source) | `paper-grid.wgsl.ts:195` `return vec4f(col * a, a)` with `a = line * u.field.x` — line-only premultiplied, between-lines alpha 0 | `facePaintFrac ≈ 0`, `sdLuma ≈ 0` at HEAD — the gate is born-RED by construction |

**The single load-bearing fact:** the cells warp (geometry right) but paint only line ink over
transparent (`vec4f(col*a,a)`, zero face fill), so the warp is INVISIBLE. The golden's core
diagnosis is correct and live-confirmed.

---

## 1. The KEEP / REFINE / RE-INVENT census (survival of the fittest, grepped at HEAD)

| Asset | Verdict | Note |
|---|---|---|
| `cellTwist` (`waveField.ts:106`) — cell-local rotate/shear about own center | **KEEP** | the geometry is fit; refactor to RETURN its pivot `cc`/`env` (R1 fix below), not duplicate |
| `travelingEnvelope` (`:53`) / `curlScalar` (`:76`) shared director | **KEEP** | height + twist + shade share the ONE envelope |
| `directedTwist` + `TWIST_FLOOR=0.62` (`:38`,`:90`) | **REFINE** | the floor crinkles EVERY cell (challenge-3 R2: static "crinkled foil," no calm paper to ripple across) → crest-gate the floor so off-crest cells relax to near-flat |
| Golus `gridCoverage` (`paperGrid.ts:153`) crisp creases | **KEEP byte-frozen** | re-read as fold-lines; the `fwidth`/`dpdx` AA already crosses both backends |
| `cursorSwirl` (`waveField.ts:147`) pointer twist | **KEEP** | the cursor height-bump is a NET-NEW term (challenge-2 R4) — decorative-only, stays `aria-hidden`, NO keyboard owed; bill it RE-INVENT in its own gate clause, NOT "extend" |
| `samplePaperGrid` (`paperGrid.ts:220`) JS oracle | **REFINE** | extend to return the face-shade (numeric parity) |
| `getAmp` overshoot (`usePaperGrid.ts:101`, target 1.06→soft-cap) | **KEEP** | the inertia is already there — now PERCEPTIBLE via the face |
| `fieldAlpha` (`constants.ts`/`field.x`) GLOBAL line-alpha scalar | **KEEP + RECONCILE** | it is a LINE-alpha multiplier, NOT a field-behind blend (R2 below); the new `faceAlpha` composes UNDER the line, multiplied by the SAME `fieldAlpha` global subtlety |
| WGPU/GLSL twin + substrate + pointer + PRM (`amp=0`) | **KEEP** | the lifecycle, offscreen-pause, PRM freeze all inherited |
| the FILLED CELL FACE (height-lit plateau + squash) | **RE-INVENT** | the structurally-absent headline — ONE fragment term in the shared leaf |
| `--shadow-cartoon-md`/`--ease-cartoon-punch`/`--scale-press` | **REUSE** | the macro cel register on the viz card/configurator (grep-verified shipped) |
| `PAPER_GRID_PRESET_{WARM,SUFFUSE,BOLD}` (`presets.ts:98`) | **ADD** `PAPER_GRID_PRESET_RIPPLE` (vivid, demo-only); `faceAlpha:0` src default |
| `BD.W-PAGE-BACKGROUND` warm field | **DEPEND (real, on-disk)** | NOT a phantom — see §3 |

---

## 2. The challenge folds (each refutation reconciled into the UNION)

The three challenges agree on the spine and land FOUR hardenings that must enter the wave. Two
of their blocking claims are CORRECTED by the on-disk reality.

**FOLD A — R1/R2 (BOTH challenges 1+2, CORRECTNESS, TOP): the face lights the WRONG cell at the
crest.** `cellTwist` gates its twist on the PRE-twist cell center `cc=(floor(g/cs)+0.5)*cs`
(`waveField.ts:120-122`), then returns the TWISTED `g`. The golden §2c recomputes `cc=floor(g)+0.5`
on the ALREADY-twisted coord — at the crest the floored twist (≥0.62·twistMax) rotates the local
coord across the cell boundary, so `floor(twisted_g)` lands in a NEIGHBOUR cell. The height/shade
then desync from the twist exactly where the design promises they fuse → edge shimmer, not a
registered ridge. **Fold:** `cellTwist` RETURNS `{ g, cc, env }` (the pivot + envelope it rode);
the face samples `cellHeight`/`faceRelief` at THAT `cc` (the pre-twist driver), so "ONE envelope"
is true by construction and DRY is restored (one cell notion). The `facePlateau` COVERAGE still
uses `fract(twisted_g)` for the inset SHAPE inside the warped quad — only the height/slope SOURCE
moves to the driver `cc`. Gate G4b: the bright-face centroid must coincide (within ½ cell) with the
max-twist cell centroid over the crest band — a shifted pair REDS.

**FOLD B — challenge-3 R1 + challenge-2 R5 (DESIGN-FIDELITY, BLOCKING): the "warm-DIVERGENT
technicolor" ramp paints muddy brown-orange; the lit-CV is 4× weaker than the golden quoted.**
The live in-frame readback (challenge-3) shows EVERY face pixel in hue bins 10–40, ZERO in bins
50–90 (amber/wheat crest statistically absent), `sdLuma/meanLuma ≈ 0.20` not 0.80. Root: the
Lambert `shade` clusters near 0.5 (the slope term is small for most cells), parking a 2-point
`mix(lo,hi)` ramp at mid = orange-brown. **Fold:** re-author the ramp as a genuine MULTI-STOP
warm-divergent ramp keyed on `mix(shade, h)` (height directly drives the wheat crest, not just
the local slope); re-tune `faceRelief`/`lightDir` so `shade` traverses [0.15,0.95] across a cell;
widen the squash range so a crest face visibly INFLATES vs its trough neighbour. Gates G3b (crest
hue REACH: over the brightest face-decile, hue ≥ 55 for ≥ 0.3 of pixels) + G1b (lit-CV:
`sdLuma/meanLuma ≥ 0.35`) — a washed-out tan REDS.

**FOLD C — challenge-3 R2 (DESIGN, the traveling read): `TWIST_FLOOR=0.62` makes the whole field
read as static crinkled foil, not a TRAVELING ripple across calm paper.** The floor forces a
minimum twist on EVERY cell regardless of crest — there is no calm paper for the crest to ripple
across. **Fold:** crest-gate the floor (floor → 0 off-crest, only the crest band crinkles+inflates)
so cells away from the crest relax to near-flat. Gate G2b (off-crest calm): trough-band cell-twist
magnitude < 0.3× the crest band — a global crumple REDS. (Note: `directedTwist` re-imposes
`max(TWIST_FLOOR,|s|)`; the floor must be multiplied by `env` so it vanishes off-crest.)

**FOLD D — R3 (challenge-1, KISS): the squash brightness double-counts the crest.**
`faceA = face·faceAlpha·(0.45+0.55·h)` brightens face ALPHA by height while the slope-shade
already brightens INK and the squash already inflates — three crest-coupled terms. **Fold:** drop
the `h`-term on `faceA` (the SHADE carries brightness, the SQUASH carries inflation — one channel
each); justify any residual coupling against the CV<0.15 fence with a measured frame.

**CORRECTION 1 — R2 (challenges 1+2+3 ALL claim `BD.W-PAGE-BACKGROUND` is a PHANTOM): FALSE.**
The challenges grepped only `docs/tranches/BD/waves/` and concluded the wave does not exist.
`BD.W-PAGE-BACKGROUND.md` IS on disk in `docs/tranches/BD/union/waves/` (the 116-wave union set,
verified). It is a real, fully-specced Band-16 wave that ALREADY routes a contained `<PaperGrid
liquid-grid>` as the forms/feedback live field. So the "route into the shared warm-mesh" is a
genuine DEPEND edge, not a phantom. **BUT** a real residual: `BD.W-PAGE-BACKGROUND` enrolls
forms/containers/feedback — it does NOT enroll the `substrates` band (substrates already mount
their own GL, so the chassis does not double-stack a field behind them). So the `/substrates/
paper-grid` page's OWN backdrop stays flat. The §3 "colorful field behind the paper-grid
substrate page" is therefore the paper-grid amendment's OWN small backdrop add (one stage-paint
on the substrate route), cross-linked to — not subsumed by — `BD.W-PAGE-BACKGROUND`. The G3
field-chroma clause is DEPEND-gated on that stage-paint, and the FACE clauses (warm-hue, no
teal/navy, lit-CV) — which the viz fully OWNS — must measure over a NEUTRALIZED background so a
missing field REDS the gate instead of a vivid conic masking it (challenge-2 R1.3).

**CORRECTION 2 — challenge-3 R5: "concentric inherits the face for free" is overstated → CUT.**
Concentric's height is `heightField` (FBM topography, `levelField.ts:101`), NOT `cellHeight`
(`travelingEnvelope*amp`). Verified: adding `cellHeight`/`faceRelief`/`facePlateau` to the shared
leaf gives concentric NOTHING automatically. The shared-leaf placement IS the right DRY home (they
are paper-grid-consumed leaf fns concentric MAY later reuse) — but the wave must NOT claim auto-
inheritance.

---

## 3. The UNION path (the deft integration — KISS, no fork, no legacy, no dual-path)

ONE evolution, all math in the SHARED `waveField` leaf (the ONE-source law) so JS oracle + WGSL +
GLSL stay one source:

1. **`waveField.ts` (+ `.glsl.ts` + `.wgsl.ts`) — refactor `cellTwist` to RETURN `{ g, cc, env }`**
   (FOLD A) and add THREE pure, derivative-free fns:
   - `cellHeight(cc, t, …wave, amp) -> number` = `travelingEnvelope(cc,…)*amp` (the exact scalar
     `cellTwist` already computes; `cellTwist` now CALLS it → provably ONE envelope).
   - `faceRelief(cc, cellSize, t, …wave, amp) -> Vec2` — central-difference slope of `cellHeight`
     (`ε=0.5·cellSize`, the `CURL_EPS` idiom; NO `dFdx` on the height → Safari-safe).
   - `facePlateau(g, inset, uvDeriv) -> number` — soft inset-square coverage; shaders pass
     `aa=fwidth(g)` (the Golus precedent), JS passes a fixed `uvDeriv` (reproducible, like
     `gridCoverage`).
2. **`paperGrid.ts` `samplePaperGrid` (REFINE)** — after `cellTwist` (now returning `cc`,`env`) +
   `cursorSwirl`, compute `h=cellHeight(cc,…)`, `grad=faceRelief(cc,…)`, the multi-stop warm-
   divergent `faceInk=ramp(mix(shade,h))` (FOLD B), the crest-gated twist floor (FOLD C),
   `inset=baseInset·(1−squashK·h)`, `face=facePlateau(g,inset,uvDeriv)`. Return the face-shade for
   numeric parity. `faceA = face·faceAlpha·fieldAlpha` (ONE field-blend scalar — FOLD D drops the
   `h`-coupling; `fieldAlpha` stays the global subtlety, RECONCILED).
3. **`paper-grid.{wgsl,glsl}.ts` `fs_main`** — gain the face composite UNDER the kept creases,
   premultiplied over transparent (`a = line + faceA·(1−line)`; `col = mix(faceInk, lineInk, line)`;
   `return vec4f(col*a, a)`). The face ink routes the shared `linearToSrgb`/OETF (challenge-2 R3c:
   the spike must transcribe the production OETF on the face path before re-verifying hues).
4. **`constants.ts` (OPT-IN, calm default byte-identical)** — add `faceAlpha:number` (**default 0**
   → face evaporates → byte-identical to HEAD; every `proof:viz-papergrid` cage clause + the warm-
   identity fence stay GREEN), `faceRelief`, `squashK`, `baseInset`, `faceWarmLo/Hi:OklchStop`
   (hue∈[20,90]), `lightDir:[number,number]`. Register `--paper-grid-face-depth` `@property
   <number>` inheriting (the `--paper-grid-warp-depth` precedent).
5. **`demo/.../presets.ts` — `PAPER_GRID_PRESET_RIPPLE`** (vivid, demo-only): the warm-divergent
   face palette (rose-umber→ember→amber→warm-wheat, hue∈[20,90]) + `faceAlpha≈0.62`,
   `faceRelief≈2.6`, `squashK≈0.42`, `baseInset≈0.14`, `lightDir` upper-right. The src default
   stays `faceAlpha:0`. (Caught by `proof:teal-navy-purge` which scans this file — clear by
   construction.)
6. **The §3 field** — the substrate route adds ONE small warm stage-paint (DEPEND-cross-linked to
   `BD.W-PAGE-BACKGROUND`, NOT a re-fork, NOT `auroraFallbackGround`); the FACE clauses measure
   over a neutralized field so the face — not the field — carries the gate.

**No new component, no new pass, no second basis, no fork.** ~10 added ALU ops/pixel (one height
eval reusing the curl basis already computed for the twist + two central-difference evals + one
dot + one plateau); no new texture/pass; 60fps both backends; paired-engine π (Chromium + WebKit
WebGL2) the binding witness.

---

## 4. Convergence

**~80%.** The spine survives all three challenges; the diagnosis is live-confirmed born-RED; the
integration is genuinely deft (shared leaf, `faceAlpha:0` byte-default, central-difference not
`dFdx`, premultiplied-over-transparent). Remaining 20% = build-time de-risk: re-shoot the spike on
a NEUTRAL field with the production OETF on the face path (proving the face-slope-shade ALONE
carries the ripple, not the conic); the R1 pre-twist-pivot refactor; the multi-stop height-keyed
ramp clearing G3b/G1b; the crest-gated floor clearing G2b; a real WebKit-captured paired-π over
the face inset edge + low-alpha face-behind-the-front; the committed in-frame readback artifact
(self-test: RED on HEAD, GREEN on the spike). All user-gated.
