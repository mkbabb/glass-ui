# Concentric — GOLDEN reference: the **living hypsometric survey** (level-set topography under warm light)

> The single canonical design, synthesized from lens-a (living topographic survey + index-contour
> hierarchy), lens-b (cross-engine perf + the OPAQUE hypsometric-fill root-fix), lens-c (1940s-
> technicolor punch: hillshade relief + cursor-heave). SOURCE-VERIFIED at HEAD; the boldest
> mechanism is PIXEL-PROVEN in a live spike (`golden/spike.html`, both modes).
>
> One line: **concentric is already a true curl-warped level-set FIELD — the work is not to build it
> but to FINISH it: paint an opaque warm hypsometric FILL (the §3 fix at the viz), lay a two-tier
> index/minor inked contour over it, lift it into 2.5-D relief with one analytic hillshade, and let
> the cursor HEAVE the sheet with real weight — a living USGS-survey carved in warm light, vivid in
> both modes, never gray, never teal — all inside the existing fragment shader, zero new fork.**

---

## 0. SOURCE-VERIFY — REAL vs STALE (grep + live, every claim grounded)

All three lenses independently converged on the same ground truth, re-confirmed here by grep at HEAD
and a live `/substrates/concentric` read.

### What is REAL and FIT — KEEP byte-untouched
- **True level-set topography, not circles.** `concentric.wgsl.ts:120 sampleHeight` + `.glsl.ts:101`
  evaluate `H(p,t)` = `heightField(valueNoise, waveFlow(...))` (3-octave value-noise terrain) + `waveSwell`
  + cursor Gaussian, warped by the SHARED `waveField` leaf + `curlFBM`. Live render shows genuine
  irregular nested loops that bend/merge/split — CONFIRMED, not ellipses.
- **The shared basis is single-source.** `waveFlow`/`cursorSwirl`/`heightField`/`waveSwell`/`cellTwist`
  live once in `src/composables/glass/wave/waveField.{ts,glsl.ts,wgsl.ts}`; the curl is the shared
  `curlFBM`/`CURL_FBM_{WGSL,GLSL}` from `flow.*`. NO second noise basis. This IS the paper-grid kinship.
- **`levelField.ts:93 sampleHeight`** — the JS oracle twin the two shaders transcribe line-for-line.
- **The IQ gradient-free `contourInk`** (`band=|fract(fN+0.5)−0.5|`, `aaW=fwidth(fN)`) — the perfect
  GPU AA, density auto-tracking `1/|∇H|`. KEEP byte-frozen.
- **The substrate + cursor physics** — `createGpuSubstrate` (WGPU primary / WebGL2 fallback),
  offscreen-pause, `content-visibility:auto`, live-PRM freeze, shared `usePointerVelocityField` fed via
  `onFrame` (no second rAF), velocity-led well (`useConcentric.ts:116`). KEEP.
- **Spare uniform lanes exist (verified `uniformBridgeWGPU.ts`):** `u0.w`, `norm.zw`, `line.w` are all
  `_pad`=0 today. The GOLDEN tunables ride these — NO new bind group, NO struct resize.

### What is STALE / BROKEN — the DELTA the build fixes
1. **The compositing is the root defect (verified `concentric.wgsl.ts:178-186` + `.glsl.ts:153-159`).**
   With the default `background:"transparent"`, the output is `vec4(rgb*ink, ink)` — **the warm `tone`
   ramp ONLY tints the LINES; between lines alpha=0 and the flat page plate shows through.** There is
   NO fill. The whole field reads anemic/gray-beige, lines dash at sub-pixel DPR. This is the §3
   systemic finding AT the viz. (lens-b §1.2/§1.3, lens-c §0.1, lens-a §0.2.4 all confirm.)
2. **No per-level distinctness.** One warm ramp keyed to height; `grep levelJitter|isIndex|hillshade`
   = 0 hits. 13 equal-weight lines read as noise, not a map.
3. **`proof-concentric.mjs` is FULLY RED against HEAD** — asserts `sampleRingField`/`ringField.ts`/
   `buildRingFamily`/`buildRingLadder`/`ringIsolineInk`/`axisRatio` (grep: **0 of these exist in live
   `src/`**). A false-FAIL gate guarding a retired surface. REWRITE.
4. **The teal-navy preset is RE-OPEN (verified literal).** `demo/stories/substrates/presets.ts:67-77`
   `CONCENTRIC_THEME_PALETTE` = h:250/210/190 + background h:255 — **all inside the binding purge band
   [180,270]**, comment says "aurora-teal rings over an indigo ground." PURGE to warm-divergent.
5. **Stale docs/copy.** `README.md:30/31/55/85`, `useConcentric.ts:60`, `concentricWGPUSetup.ts`, the
   `concentric.vue` StoryHero, `levelField.ts:3` still say "radial Fourier ring-interference /
   `ringField.ts` / ellipsoid rings." Dead copy over the right viz. FIX.

**Disposition: SURVIVAL OF THE FITTEST.** Field math, IQ extraction, twin parity, substrate, cursor
physics = FIT, KEPT byte-untouched. The finishing layer (fill/ink/relief/ground), the gate, the preset,
the docs = WEAK/BROKEN, fixed. NOT a rebuild — a fragment-`main()` recomposition + tunables on spare
lanes + a gate rewrite + a preset purge + doc de-stale.

---

## 1. The GOLDEN design — reconciling the three lenses

The cross-lens tension is **restraint (a) vs root-fix (b) vs maximal punch (c)**. The resolution, in
priority order, takes the strongest move from each and stops where audacity would fight legibility or
cross-engine safety:

| Move | From | Verdict |
|---|---|---|
| **Opaque hypsometric FILL + ink-on-top** | lens-b §2A | **THE LOAD-BEARING FIX.** Deletes the "lines over nothing" bleed-through that makes it gray. Without this nothing else reads. ADOPT as the spine. |
| **Two-tier index/minor contour** (every 5th bold) | lens-a §2, lens-b §2C, lens-c §3.2 | **ADOPT** — all three converged. The grammar that makes it read as a MAP. Pure `f(level)`, stateless. |
| **`tanh` tone expansion** (fill the ramp ends) | lens-c §3.1, lens-b implied | **ADOPT** — `tone=0.5+0.5·tanh(H·gain)`. The compressed band is why basins/ridges were invisible. |
| **Analytic hillshade** (one ∇H, raking cel-light) | lens-c §3.3 | **ADOPT** — the single cheapest 2.5-D relief pop. PIXEL-PROVEN to lift lumVar above floor. |
| **Per-mode warm ground** (cream/ember, plain arms) | all three §3 | **ADOPT** — the BA.W-NO-GRAY warm floor, two plain arms (no `light-dark()` inset trap). |
| **Cursor-HEAVE: well depth ∝ pointer speed** (morph-more-on-move) | lens-b §2D, lens-c §2 | **ADOPT (measured form)** — scale the EXISTING `cursorWell` + the spring `amp` overshoot by velocity. Liquid-weight. |
| **Moving cel CAST-shadow on index lines** (2nd `contourInk` at offset `fN`) | lens-c §2/§3.4 | **DEFER to a tunable, default-LOW.** It is the most audacious + the most likely to read as visual noise on a dense contour field or diverge cross-engine. Ship the *hook* (`castLen` lane, default ~0) so the wave can dial it in under π once the index hierarchy is proven; do NOT make it load-bearing. KISS wins the GOLDEN cut. |
| Anticipation pre-dip / full 12-principle squash | lens-c §4 | **REDUCE to the spring envelope already shipped** (`getAmp` overshoot 1.06→1 + the velocity-scaled well). The pre-dip dimple is over-fit for a contour field; the kept spring + velocity heave already give anticipation→overshoot→follow-through with real weight. |

The GOLDEN is therefore **lens-b's opaque-fill spine + lens-a's structured index hierarchy + lens-c's
hillshade relief + cursor-heave**, with lens-c's cel-cast as a dialled-LOW hook and its full
12-principle motion folded into the kept spring. One coherent piece, not a union of three.

---

## 2. The boldest move (PIXEL-PROVEN) — the **opaque hypsometric relief**

The fragment composites in ONE pass (no extra target), replacing the broken lines-over-transparent path:

```
// 1. TONE — expand the compressed height band so basins+ridges hit the ramp ENDS
let tone = 0.5 + 0.5 * tanh(H * uToneGain);          // uToneGain ≈ 1.6  (norm.z lane)
var fill = samplePaletteLin(tone);                    // 4-stop warm ramp, OKLab-mixed (KEPT operator)

// 2. HILLSHADE — one ∇H finite-diff, dotted with a fixed cel light → 2.5-D relief pop
let e  = 0.012;
let hx = sampleHeight(p + vec2(e,0), t) - sampleHeight(p - vec2(e,0), t);
let hy = sampleHeight(p + vec2(0,e), t) - sampleHeight(p - vec2(0,e), t);
let grad  = vec2(hx, hy) / (2.0 * e);
let L     = normalize(vec2(-0.6, 0.8));               // fixed cartoon sun
let shade = 0.5 + 0.5 * clamp(dot(normalize(grad + 1e-5), L), -1.0, 1.0);
fill = fill * mix(1.0 - uShadeAmp, 1.0 + uShadeAmp, shade);   // uShadeAmp ≈ 0.18 (line.w lane)

// 3. TWO-TIER CONTOUR — pure f(level), stateless, no buffer (the map grammar)
let lvl     = floor(fN);
let isIndex = select(0.0, 1.0, fract(lvl / uIndexEvery) < (0.5/uIndexEvery));  // every 5th = index
let hw      = mix(u.line.x, u.line.x * uIndexMul, isIndex);    // index ~1.9× thick
let ink     = clamp(contourInk(fN, hw), 0.0, 1.0);             // KEPT operator, fed a per-level width

// 4. INK COLOR = a darker ember of the LOCAL fill (edge-of-its-own-band signature)
let inkCol  = mix(fill, fill * uInkDarken, 0.85);

// 5. PER-MODE ARM + OPAQUE OUT — the viz IS the colorful field, never lines-over-nothing
let col = mix(fill, inkCol, ink);
return vec4(clamp(linearToSrgb(col), vec3(0.0), vec3(1.0)), 1.0);
```

`contourInk` gains ONE parameter (the per-level half-width `hw`) — it is **fed, not re-derived** (the L3
byte-frozen fence holds). The per-mode arm (light=dark ink on bright cream fill; dark=luminous etch on
deep-ember fill) is selected by a `uMode` uniform lane, NOT CSS `light-dark()` (per the inset-shadow trap
lesson — plain per-mode arms only).

**Why this is THE move:** it deletes the broken premultiplied path, the fill carries the field even where
the line aliases (kills the dashing root cause), and the index hierarchy + hillshade convert "faint
contour soup" into a USGS survey you can read at a glance. Cross-engine trivial — `floor`/`fract`/
`tanh`/`select`↔`step`/`mix`, identical WGSL/GLSL semantics. **Output is OPAQUE → the compositor drops the
premultiply blend → CHEAPER than today.**

### 2.1 PIXEL PROOF (live, `golden/spike.html`, both modes — the born-RED→GREEN witness)
A standalone WebGL2 spike mirroring the shipped GLSL field + the GOLDEN finishing layer was rendered live
in Chrome. Screenshot (`golden/spike-shot.png`): both panels read as **vivid warm living relief maps** —
irregular nested level-sets, visible hillshade relief, bolder index lines, dark-ink-on-cream (light) and
luminous amber etch on deep ember (dark). Stride-sampled painted-pixel readback:

| metric | light | dark | GOLDEN floor | result |
|---|---|---|---|---|
| avgChroma | **0.494** | **0.419** | > 0.06 | PASS (vivid, not gray) |
| warmFrac (r≥g≥b, chroma>0.04) | **1.000** | **1.000** | > 0.40 | PASS (zero teal/navy) |
| grayFrac (chroma<0.02) | **0.000** | **0.000** | < 0.15 | PASS (never gray, both modes) |
| lumVar (relief structure) | **0.104** | **0.126** | > 0.02 | PASS (hillshade + bands read) |

The boldest mechanism is de-risked: fill+ink+hillshade composite to a confident map, not mud, in BOTH
modes. (The readback needed `preserveDrawingBuffer:true` — the same canvas-readback gotcha the lenses
flagged; the screenshot is the co-binding witness.)

---

## 3. Visual + motion + interaction spec

### 3.1 Light — ink survey on warm cream
Opaque hypsometric fill (cream basin → wheat → amber slope → ember ridge, all hue ∈ [40,90], purge-clean),
hillshaded into relief. Contour ink DARKENS (sepia-ember edge of its own band) so lines read against the
warm fill. Index contours bold; intermediate hairline. The §3 colorful field IS the viz — it no longer
depends on the page to read, AND the substrates-band page still routes the shared `BD.W-PAGE-BACKGROUND`
warm-mesh behind the glass demos (consume, do not dup; concentric now CONTRIBUTES a field rather than
revealing a flat plate).

### 3.2 Dark — luminous etch on deep warm slate
Per-mode arm: fill anchors to a deep warm-ember basin → glowing amber ridge ladder; ink LIGHTENS to a
warm luminous etch. Deep warm slate ground (NEVER gray — BA.W-NO-GRAY warm floor). Index lines glow a
touch brighter (the survey-at-night register).

### 3.3 Motion — the living survey (KEPT spring + GOLDEN heave, all liquid-weight)
- The traveling `waveFlow` + `travelingEnvelope` flow the whole sheet — contours bend/twist/merge as the
  crest sweeps. KEEP.
- Basins breathe on the ω=√(gk) `waveSwell` (`swellAmp 0.22`) — inflate/deflate with weight. KEEP.
- Spring-eased envelope `amp` 0→1.06 overshoot + 0.85 relax on mount (liquid-weight ease-in). KEEP.
- Per-contour wobble (`perturbAmp 0.06`). KEEP; index hierarchy rides on top.
- Three phases (swell / flow / wobble) never tic in unison — overlapping action for free.

### 3.4 Interaction — the cursor HEAVE (KEPT well, GOLDEN weight)
The cursor bulges the topography (`cursorWell 0.5` Gaussian + `cursorSwirl`), velocity-led by `0.1` so the
well trails the pointer (gravity has weight). GOLDEN elevation: **scale the well depth + radius by pointer
SPEED** (`usePointerVelocityField.velocity` magnitude, already fed) — a fast sweep heaves the terrain hard
and drags a wake; at rest it settles on the kept spring overshoot (anticipation→overshoot→follow-through
with real inertia — morph-more-on-move). As the well lifts the terrain the **index contours visibly pack
around it** (1/|∇H| bunching is automatic) — the gravity reads as a real elevation bulge, no new mechanism.

### 3.5 Aristotelian proportion
13 contour levels, index every 5 (Fibonacci neighbors 5/13); the spring overshoot 1.06 and the rest
`--motion-weight ≈ 0.62 ≈ 1/φ`; the 4-stop ramp spacing golden-related. √φ proportion expressed in the
field's own constants, not just type.

---

## 4. The precise mechanism — files + dispositions (DEFT UNION, KISS/DRY)

| layer | disposition | exact change |
|---|---|---|
| `waveField.{ts,glsl.ts,wgsl.ts}` shared leaf | **KEEP byte-untouched** | the basis is FIT. Zero edits. The kinship holds. |
| `levelField.ts` (JS oracle) | **REFINE** | extend `sampleHeight` consumers with the `tanh` tone + the ∇H finite-diff so the JS twin matches (numeric-parity source). NO field-math change. |
| `contourInk` IQ operator | **KEEP byte-frozen** | only the per-level `hw` it is FED changes (a parameter, not a re-derivation). |
| `sampleHeight` (both shaders) | **KEEP** | field source correct. The hillshade re-samples it ±e (read-only). |
| `fs_main`/`main()` (both shaders) | **REFINE** | opaque hypsometric fill + `tanh` tone + hillshade + two-tier index/minor + ink-of-own-band + per-mode arm + opaque out (§2). ~20 lines, byte-mirrored WGSL↔GLSL. |
| `constants.ts` `ConcentricConfig` + default | **REFINE** | add `toneGain`(1.6), `shadeAmp`(0.18), `lightDir`([-0.6,0.8]), `indexEvery`(5), `indexMul`(1.9), `inkDarken`(0.45), `castLen`(0, the dialled-LOW cel-cast hook), `velocityHeave`(0.4); flip `background` default off `"transparent"` to a per-mode warm-ground token resolved via `bgStyle`. Keep `WARM_IDENTITY_PALETTE` (extend to 4 stops). |
| `uniformBridgeWGPU.ts` + GL uniform pack | **REFINE** | pack the new scalars into the spare `u0.w`/`norm.zw`/`line.w` lanes + add a `uMode` lane; bump the struct comment. NO new bind group, NO resize. |
| ground (§3) | **CONSUME shared** | `BD.W-PAGE-BACKGROUND` warm-mesh for the page chassis; concentric's own default `background` flips to the per-mode warm floor so it reads standalone. NO sibling, NO `auroraFallbackGround`. |
| `presets.ts` `CONCENTRIC_*_THEME` | **PURGE** | re-theme h:250/210/190/255 → a warm-divergent alt (e.g. sunset-coral→magenta-ember over warm-plum, all hue ∉ [180,270]). Presets-in-consumers stays; teal-navy never. |
| `proof-concentric.mjs` | **REWRITE** | the stale ring-engine gate → the level-set + finishing-layer gate (§5). |
| `BD.W-CONCENTRIC-LEVELSET.md` | **AMEND** | re-state to HEAD: ring engine RETIRED, no `field` axis; the live work is this finishing layer. |
| stale docs/copy (README, 2 docstrings, StoryHero) | **FIX** | "ring-interference / `ringField.ts`" → "level-set hypsometric survey." |

**No new composable. No new shader file. No re-fork. No second noise basis. No `field` axis.** The boldest
move is ~20 shader lines + tunables on spare lanes + a default flip. KISS / DRY.

### 4.1 Cross-engine (Chrome WGSL + Safari WebGL2 GLSL)
The two shaders are line-for-line twins today. The finishing layer uses only `tanh`/`floor`/`fract`/
`select`(WGSL)↔`step`(GLSL)/`mix`/`normalize` — primitives with identical semantics. Pure fullscreen
fragment, ONE draw, sRGB OETF + OKLab-in-linear palette mix (no CSS `color-mix(in oklch)` WebKit would
band; no `backdrop-filter:url`, no Houdini, no compute). WebKit runs the GLSL twin flawlessly today. The
numeric round-trip closes against the REAL `shader-eval-harness` net (not name-presence) — the §5 gate
samples `H`/`fN`/`lvl`/`isIndex`/`tone`/`shade` at a fixed `(p,t)` lattice and asserts JS-oracle ↔ WGSL ↔
GLSL ΔE ≈ 0. Per [live-pi-oklab-paint-arm]: the live-π arm parses `oklab()` from getComputedStyle and
separates warm ink by L (not chroma); run live-π per mode.

### 4.2 a11y / PRM carve
- `respectReducedMotion: true` (kept): under PRM, `onFrame` snaps `amp=0` + `velocityHeave→0` + `castLen→0`
  → ONE static survey frame, then park. The fill + hillshade + index hierarchy are STATIC-safe (functions
  of frozen `H`) — the still frame is a legible printed relief map, not a frozen scaffold of faint lines
  (BETTER than today under PRM).
- `prefers-reduced-transparency` → the fill is already opaque; no change needed (a legibility asset).
- `prefers-contrast: more` → `indexMul` + `inkDarken` floor up; the minor/index hierarchy sharpens.
- WCAG 2.2.2 pause via the existing `DockBackgroundToggle` → `handle.pause()/resume()` seam (kept).
- Canvas `aria-hidden` + `pointer-events:none`; the wrapper carries pointer listeners (kept).
- Offscreen-pause + `content-visibility:auto` inherited.

---

## 5. The gate — REWRITE `proof:concentric` (born-RED → GREEN)

The stale ring-engine gate is DELETED clause-by-clause and reborn against the level-set + finishing-layer
surface. `tags:["local","ci"]`. Painted-pixel readback, NOT geometric/name-presence proxy.

- **L1 — field source is the shared level-set topography.** `sampleHeight` reads `heightField(waveFlow(
  p,t))` over the SHARED `waveField` + `curlFBM` (no re-forked `valueNoise`/`curlFBM` outside the shared
  chunk). A re-forked basis reds.
- **L2 — the ring engine is GONE (clean-break assert).** NO `sampleRingField`/`buildRingFamily`/
  `ringField.ts`/`axisRatio`/`ringIsolineInk`/`buildRingLadder` anywhere in live `src/.../concentric/`
  (incl. README). A re-introduced ring symbol reds (no-legacy fence).
- **L3 — `contourInk` is byte-frozen.** Body (comment-stripped) identical WGSL↔GLSL, fed a per-level
  *width* parameter, not re-derived. A re-derived isoline operator reds.
- **L4 — the finishing layer is pure + opaque.** The fill is OPAQUE (the fragment returns `alpha=1` on the
  default `background`, NOT `rgb*ink`); `isIndex`/`lvl` read NO accumulation buffer; the hillshade is a
  read-only ∇H re-sample; the ramp composes the KEPT `samplePaletteLin` (no second color seam). A
  lines-over-transparent regression, a stateful index buffer, or a second palette reds.
- **L5 — warm identity, no teal/navy, both modes.** `constants.ts` carries NO hue ∈ [180,270]; the demo
  preset is warm-divergent (the purged `CONCENTRIC_THEME_PALETTE`). Inherits `proof:teal-navy-purge`. A
  cool hue in the library OR the un-purged demo preset reds.
- **L6 — transcription closes NUMERICALLY.** `shader-eval-harness.assertParity` for `sampleHeight` + the
  finishing read (`tone`/`fN`/`lvl`/`isIndex`/`shade`) JS↔WGSL↔GLSL ΔE ≤ bar. A `tanh`-gain drift, a
  sign-flipped hillshade, or a `0.618`/index-hash drift in ONE backend reds (NOT a `/fn name/.test()`).

**Self-test bites:** (a) re-forked `valueNoise` → L1 red; (b) re-introduced `sampleRingField` → L2 red;
(c) re-derived `contourInk` → L3 red; (d) `rgb*ink` transparent-output regression → L4 red; (e) `h:240` in
constants OR `h:210` left in the demo preset → L5 red; (f) `tanh`-gain drift in WGSL only → L6 red.

**The binding π (`tests-visual/concentric-golden.spec.ts`):** both modes + the **webkit project** (WebGL2
fallback paints on Safari), over the live `BD.W-PAGE-BACKGROUND` field, served `:5199`, NEVER `reducedMotion`
except the PRM arm. Painted-pixel asserts (the GOLDEN bar, witnessed by the spike):
1. **VIVID, not gray** — avgChroma > 0.06, grayFrac < 0.15, BOTH modes (spike: 0.49/0.42 chroma, 0 gray).
2. **WARM only** — warmFrac > 0.40, hue histogram entirely ∉ [180,270] (spike: 1.000 warm, 0 teal/navy).
3. **TRUE level-sets, NOT circles** — sample N points off-center-axis, assert non-constant inter-line
   spacing along a radius (a geometric circle-proxy would false-pass).
4. **TWO-TIER contour** — an index-line pixel is detectably bolder than an intermediate-line pixel.
5. **RELIEF reads** — luminance variance across the fill clears a floor (spike: lumVar 0.10/0.13 > 0.02).
6. **ALIVE** — two frames Δt apart differ above a motion floor; under PRM identical (the freeze).
7. **CURSOR HEAVE** — a synthetic pointer move produces local contour-spacing compression (squash).
8. **LIVE WARM GROUND** — a non-uniform live field behind the viz (inherits `proof:page-background` W2-π).

Born-FAIL on HEAD (the live screenshot of anemic dashed lines on a flat plate is the born-fail witness).
[live-verify-capture]: each verdict ships a captured DELTA artefact (screenshot + paired-π).

---

## 6. Reconcile with the union waves (NO dup)

- **`BD.W-CONCENTRIC-LEVELSET`** — AMEND to HEAD: the field-source swap is DONE + the ring engine RETIRED
  (the doc's `field:"rings"|"levelset"` opt-in axis is STALE — there is no rings mode). Re-point at THIS
  finishing layer (opaque fill + index hierarchy + hillshade + cursor-heave + per-mode ground) + the gate
  rewrite + the preset purge + the doc de-stale. Keep its real fences (shared basis, numeric parity). No
  new wave; this is the amendment body.
- **`BD.W-PAPERGRID-WARP`** — DISJOINT, kindred. Concentric reads the SAME `waveField`+`curlFBM` leaf;
  the +1 warp octave lands ONCE and concentric inherits it. Concentric does NOT re-deepen the warp.
- **`BD.W-CONCENTRIC-RADIUS`** — orthogonal namespace collision (the `--radius-concentric` CSS register,
  Apple `containerConcentric`), NOT the viz. No interaction.
- **`BD.W-PAGE-BACKGROUND`** — CONSUME, do not dup. Concentric's warm ground routes through this wave's
  per-category mesh; concentric is now self-sufficient (opaque) so it CONTRIBUTES a field.
- **`proof:teal-navy-purge`** — HARDEN. Add the demo `CONCENTRIC_THEME_PALETTE` (h:250/210/190/255) to the
  purge census; re-theme to warm-divergent.
- **W-FIELD-ENGINE / W-WAVE-FIELD-HARNESS** — predecessor edges (shared basis + numeric harness). Kept.

---

## 7. One-line essence

**Concentric is already a true living level-set survey — the GOLDEN work is to FINISH it: an opaque warm
hypsometric FILL (the §3 root-fix), a two-tier index/minor inked contour, an analytic hillshade for 2.5-D
relief, a velocity-scaled cursor HEAVE, and per-mode warm ground — a vivid USGS survey carved in warm
light, never gray, never teal, perfect in Chrome and Safari, all in the existing fragment shader with zero
new fork; plus the ring-engine gate rewrite, the teal-navy preset purge, and the stale-doc de-stale.**
