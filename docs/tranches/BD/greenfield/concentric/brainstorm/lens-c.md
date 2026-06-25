# Concentric — GREENFIELD lens-c (AUDACIOUS 1940s-TECHNICOLOR FLOW & PUNCH)

> The level-set / gradient-topology contour viz, re-conceived from first principles through the
> cartoon-technicolor lens: a **living relief map cut into warm metal** — bold inked iso-lines
> that flow, bunch, split and merge like a topographic map, with a filled hypsometric tint
> between them, a moving cel-shadow on the ridgelines, and the cursor heaving the whole sheet
> like a hand pushing up under a drumhead. Punch, weight, arcs — not a faint gray scribble.

---

## 0. SOURCE-VERIFY — what is REAL vs spec'd (grepped + live-inspected at HEAD)

I read the source and inspected the live `/substrates/concentric` (Chrome, light mode) before
designing. The verdict overturns the brief's framing of "part of the machinery MAY exist": the
level-set engine is **fully built and twin-parity-structured**, not spec'd-only. Every symbol
below is grep-confirmed on disk.

| Claim | Reality (verified) |
|---|---|
| `levelField.ts` composable | **REAL.** `sampleHeight(p,t,q)` = `heightField(valueNoise, waveFlow(curlFBM,…))` + `waveSwell` + cursor Gaussian. The retired radial sum-of-sines moiré is GONE (clean break). |
| TRUE level-set contours (not naive circles)? | **YES.** `concentric.wgsl.ts:140 contourInk(fN)` = `1 − smoothstep(...|fract(fN+0.5)−0.5|/fwidth(fN))` — IQ gradient-free iso-line DE. The field source is a curl-warped low-octave value-noise terrain (`sampleHeight`), NOT perfect concentric ellipses. Live screenshot CONFIRMS: irregular, bending, splitting contours that warp — a real topographic map, not circles. |
| Field ALIVE (drift + cursor)? | **YES.** `waveFlow(curlFBM,p,t,…)` continuous traveling-wave warp + `waveSwell(t)` breathing + `cursorSwirl` + a cursor Gaussian peak (`useConcentric.ts:116 onFrame` feeds `usePointerVelocityField`, velocity-led well). |
| Cross-engine twin parity | **REAL + STRUCTURED.** WGSL primary (`concentric.wgsl.ts`) and GLSL fallback (`concentric.glsl` — `sampleHeight`/`contourInk`/`fN` byte-mirror, confirmed line-for-line), both splice the SHARED `waveField.wgsl`/`flow.wgsl` + `procedural-color` chunks. `uniformBridgeWGPU.ts` is the single typed-struct source. `CONCENTRIC_FIELD_NORM = 0.55`. |
| Teal-navy purge | **GREEN today** (`proof:teal-navy-purge` T1-T4 device-free pass; demo "Aurora-teal theme" toggle is OFF-by-default = warm-cream identity = preset-in-consumer, compliant). |
| `BD.W-CONCENTRIC-LEVELSET` wave | **REAL doc**, but DESCRIBES A DIFFERENT (older) WORLD: it specs an OPT-IN `field:"rings"|"levelset"` axis with `"rings"` default. The SHIPPED `constants.ts` has NO `field` axis — the level-set field is the SOLE, DEFAULT path and the ring engine is RETIRED. **The wave doc is STALE vs HEAD.** My delta-assay (§7) reconciles this. |
| `BD.W-PAPERGRID-WARP` | REAL — the shared `curlWarp` +1-octave deepen. Concentric RIDES the same warp (kinship); my design consumes it, does not duplicate. |
| `BD.W-CONCENTRIC-RADIUS` | REAL but ORTHOGONAL — a `--radius-concentric` CSS token (Apple containerConcentric). NO collision with the viz; the doc itself says so. Not touched here. |
| `BD.W-PAGE-BACKGROUND` | REAL — the SHARED warm-mesh/live-field demo-chassis fix. The §3 colorful-ground fix routes HERE, not a sibling. |

**THE LIVE FINDING (the binding painted-pixel verdict, Chrome light mode, screenshot captured).**
The contours render as TRUE warped level-sets — geometry is CORRECT and beautiful in structure.
BUT three defects are dispositive and they are ALL tonal/contrast/staging, not geometric:

1. **WASHED-OUT, near-monochrome.** The contour lines are a faint dusty-coral, broken into a
   dotted/dashed stipple at this DPR (the `lineWidth:1.8 / lineSoftness:1.0` stroke is sub-pixel
   over a low-contrast ground), and the inter-contour fill is **flat gray-cream** — the
   hypsometric height ramp (`tone = 0.5 + H*0.55`) compresses to a tiny luminance band so the
   basins-cool / ridges-warm story is INVISIBLE. It reads gray, not vivid. (Canvas readback via
   2D `drawImage` returned 0 samples — expected for a WebGPU substrate; the screenshot is the
   binding truth.)
2. **FLAT GROUND (the systemic §3 finding, 7th confirmation).** The viz sits over a flat gray
   plate (`background:"transparent"` → demo card tier is not a live warm field). There is no
   colorful field behind, no defined edge — the exact "pages are FLAT" disease.
3. **NO PUNCH.** Zero cartoon register: no inked ridgeline, no cel-shadow, no squash on the
   cursor heave, no anticipation/follow-through. It is calm to the point of inert — the opposite
   of the 1940s-technicolor bar.

**Disposition: SURVIVAL OF THE FITTEST.** The field math, the IQ extraction, the twin parity, the
substrate lifecycle, the cursor physics — all FIT, all KEPT byte-untouched. What is BROKEN is the
**tone/ink/ground/punch finishing layer**: the hypsometric ramp, the line strength, the absent
cel-shadow, the absent live ground. That layer is what lens-c re-invents.

---

## 1. THE CORE IDEA — a relief map cut into warm metal, that breathes and heaves

Keep the level-set FIELD (the warped fbm topography + IQ iso-extraction). Re-conceive the RENDER
as a **hypsometric relief map in the 1940s WPA-poster / vintage-atlas register**: not faint lines
on gray, but **filled height bands** (saturated warm hypsometric tint — deep cool-cream basins
climbing through amber to a hot ember ridge), with **two tiers of inked contour line** (minor
hairlines every level, a BOLD index contour every 5th — the topographic-map convention), a
**directional relief shade** (a fake hillshade from a fixed cel light, the cartoon "solid
drawing" pop), and a **moving cel cast-shadow on the ridgelines** that slides as the wave passes.
The whole sheet has **weight**: it heaves on a slow swell, the cursor pushes a bulge up under it
with squash-and-stretch, and contours bunch where the ground is steep (`1/|∇H|`, already free
from the IQ DE). It must read like a living topographic map carved into warm light — vivid, bold,
alive — over a colorful warm field, both modes.

This is NOT a rebuild. It is a **finishing-layer re-invention** on the kept field: a richer
height→color mapping, a two-tier index/minor contour, an analytic hillshade (one extra gradient
of `H`, free), a ridgeline cel-cast, and the cursor-heave squash — all inside the existing
fragment shader, all transcribed identically to both twins.

---

## 2. THE BOLDEST MOVE — the **HEAVING RELIEF**: the cursor doesn't tint, it deforms the sheet with VOLUME-PRESERVING squash, and the index contours CARRY A MOVING CEL-CAST that flows downhill with the wave

Today the cursor adds a flat Gaussian peak to `H` (a bump). The boldest cartoon move: make the
cursor a **hand pushing up under a drumhead** — a volume-preserving heave where the bulge *rises*
(anticipation: a slight dimple-dip a frame before it lifts), *overshoots* its target height with
`--ease-cartoon-punch`-shaped easing (≈22% past, then settles), and the surrounding contours
**get PULLED toward the peak and SQUASHED** (their spacing compresses on the near side, stretches
on the far side — real squash & stretch on a contour map, which no calm topo viz does). On
release the bulge *follows through* — it sinks past rest and rebounds once (1/φ-damped).

And the **moving cel cast-shadow**: each BOLD index contour (every 5th level) is rendered TWICE —
the warm index line, plus a darker offset duplicate cast **downhill** (in the `−∇H` direction)
and **sliding opposite the wave-flow velocity**, scaled by `--motion-weight`. As the traveling
wave crosses, the ridgelines visibly throw their shadow ahead of the front — the relief map looks
**lit by a low fixed cel-sun while the terrain flows beneath it**. This is the §Shadows "moving
cel cast" made PROCEDURAL on a contour field — the single most technicolor, most alive gesture in
the piece, and it is pure fragment math (a second `contourInk` evaluation at an offset `fN`),
free of any new buffer or pass.

> One sentence: **the cursor heaves the relief with anticipation→overshoot→follow-through squash
> while the index contours throw a moving cel-shadow downhill of the traveling wave — a living
> topographic map carved in warm metal, lit by a fixed cartoon sun.**

---

## 3. THE VISUAL SPEC

### 3.1 Hypsometric relief tint (fix defect #1 — the vivid warm ramp)
Replace the compressed `tone = 0.5 + H*0.55` two-stop wash with a **saturated 4-stop hypsometric
ramp** sampled over a height that is first **normalized to fill [0,1]** (the current `H` only
spans a thin band — the fix is to map the actual `H` min/max envelope, via a soft `tanh`
expansion `tone = 0.5 + 0.5*tanh(H * GAIN)`, `GAIN ≈ 1.6`, so the basins and ridges hit the ramp
ENDS). The ramp (warm-cream identity, all hue ∈ [28,90] — purge-clean):
- **trough / basin** — soft warm cream `oklch(0.95 0.03 82)`
- **valley** — pale wheat `oklch(0.88 0.06 76)`
- **slope** — warm amber `oklch(0.80 0.11 60)`
- **ridge / peak** — hot ember `oklch(0.66 0.14 42)`

The fill is the FIELD now (not transparent-only) — the inter-contour bands carry saturated color,
so the map reads vivid at a glance. (Over transparent ground the fill alpha ramps with a low floor
so the live page field still bleeds through the basins — see §3.5.)

### 3.2 Two-tier contour ink (fix the faint/dotted stipple — the topographic convention)
- **Minor contours** — every level, a crisp warm hairline (`lineWidth` raised to a present
  ≥2.2px-equiv with `lineSoftness` tuned so it never stipples at any DPR — the IQ `contourInk`
  already gives DPR-stable AA via `fwidth`; the fix is the half-width floor + a slightly darker
  ink than the fill so the line reads as INK, not a tint seam).
- **Index contours** — every 5th level, a **BOLD doubled-width line in deep ember ink** (the
  topographic-map "every Nth line bolder" convention; a pure `f(level)` of `round(fN/5)`, the
  `levelJitter` discipline — stateless, no buffer). These are the lines that carry the cel-cast
  (§2). This makes the map *read as a map*, with structure and hierarchy, not a uniform scribble.

### 3.3 Analytic hillshade (the "solid drawing" cartoon pop — fix the flatness)
A fake directional relief: compute `∇H` (two extra `sampleHeight` taps, or reuse `fwidth`-cheap
finite differences) and dot it with a FIXED cel light direction `L = normalize(−0.6, 0.8)`. The
shade `s = 0.5 + 0.5·clamp(dot(normalize(∇H), L), −1, 1)` multiplies the fill luminance — slopes
facing the light brighten, slopes facing away deepen. This is the single cheapest way to make a 2D
contour map pop into 2.5-D relief (§L4 principle 11, solid drawing). It is the difference between
"lines on paper" and "a carved relief in raking light."

### 3.4 The moving cel cast-shadow on index contours (§2, the boldest visual)
Each index contour casts a second, darker, offset line: evaluate `contourInk` a second time at
`fN` shifted by `(−∇H_dir · castLen − vWave · castSlide)` where `vWave` is the wave-flow velocity
and `castLen/castSlide ∝ --motion-weight`. Composite the cast UNDER the index line (darker ember,
lower alpha). The cast slides as the wave crosses — the moving cel cast made procedural. PRM →
`--motion-weight: 0` → cast collapses to zero offset (a static stamped relief, no travel).

### 3.5 The colorful warm GROUND (fix defect #2 — route to the SHARED wave, NOT a sibling)
Per the brief's binding instruction: the warm-ground fix routes into **`BD.W-PAGE-BACKGROUND`**
(the shared demo-chassis warm-mesh / live-field map), NOT `auroraFallbackGround`, NOT a new
concentric sibling. Concrete: in `demo/stories/manifest.ts`, the `substrates` band's concentric
route stages over the shared contained warm field (the chassis already owns the `liquid-grid` /
warm-mesh mount + offscreen-pause). The viz keeps `background:"transparent"` so the warm field
bleeds through the basins (the hypsometric fill alpha floors low in troughs, opaque on ridges) —
glass-over-live-field, a defined edge, both modes. **Zero new src ground token.** This is the
single-writer §3 fix, 7th-confirmed, landing once.

### 3.6 Both modes
Light: the hypsometric ramp as above (cream→ember) over the warm field. Dark: the ramp lifts (the
`--glass-backdrop`-aware mode arm) to luminous warm-amber-on-deep-umber — basins deep warm-brown,
ridges glowing amber, the cel-cast a near-black ink (the `--shadow-color: var(--foreground)`
re-tint by construction). NEVER gray, NEVER teal/navy (hue ∈ [28,90] both modes — the BA.W-NO-GRAY
warm floor + the [180,270] purge hold).

---

## 4. THE MOTION SPEC (FLOW & PUNCH — the 12 principles, applied)

| Principle | Application |
|---|---|
| **Anticipation** | the cursor-heave dips a hair (dimple) before it lifts (`--ease-cartoon-punch` pre-dip, made procedural on the cursor-well amplitude envelope). |
| **Squash & stretch** | contour spacing COMPRESSES on the cursor-near side of the heave, STRETCHES on the far side — volume-preserving (the bulge integral conserved). |
| **Overshoot / exaggeration** | the heave amplitude overshoots ≈22% past target then settles (the existing `getAmp` spring already overshoots `1.06`→1; extend the cursor-well amplitude onto the same shaped envelope). |
| **Follow-through** | on cursor-leave the bulge sinks PAST rest and rebounds once (1/φ-damped), the contours rippling outward. |
| **Overlapping action** | the wave-flow swell, the cursor heave, and the cel-cast slide run on THREE different phases — they never tic in unison (the existing `waveSwell` + `waveFlow` + the new cast give this for free). |
| **Arcs** | the cursor well's center LEADS the pointer along a velocity arc (`useConcentric.ts:138 lead:0.1` already does this — keep, perhaps deepen to 0.14 under high velocity). |
| **Weight / inertia** | the whole sheet heaves on the slow `waveSwell` (ω=√(g·k) deep-water swell, real physical weight); `speed:0.6` keeps it ponderous, never manic. |
| **Solid drawing** | the analytic hillshade (§3.3) + the cel-cast (§3.4) give the 2.5-D relief pop. |
| **Slow in/out** | `--ease-cartoon-punch` shaping on the heave; the swell is sinusoidal (natural ease). |
| **Staging** | the index contours (bold) carry the eye; the hypsometric fill stages the basins-vs-ridges read. |
| **Secondary action** | per-contour wobble (`perturbAmp`, kept) ripples the minor lines as the wave flows. |
| **Appeal** | technicolor warm relief + moving cel-sun = the distinctive personality. |

`--motion-weight` is the ONE scalar scaling heave-overshoot share, squash depth, and cast travel
together (§L4). Rest `0.62 ≈ 1/φ`; the cursor-heave pushes toward `1` transiently.

---

## 5. THE MECHANISM (deft union — extend the kept engine, KISS/DRY)

All changes live in the EXISTING fragment shader + constants + uniform bridge. **No new pass, no
new buffer, no new composable, no re-fork.** The field, the IQ extraction, the substrate, the
cursor physics, the twin structure are byte-untouched.

1. **`constants.ts`** — extend `ConcentricConfig` + `DEFAULT_CONCENTRIC_CONFIG`:
   - `palette`: the 4-stop hypsometric ramp (§3.1), still warm-identity, still preset-themeable.
   - `lineWidth` floor raised + `indexEvery: 5`, `indexWidthMul: 2.0`, `indexInk` deeper ember.
   - `hillshadeAmp: ~0.35`, `lightDir: [-0.6, 0.8]`.
   - `castLen`, `castSlide`, `castInk` (the cel-cast), gated by `--motion-weight`.
   - `toneGain: 1.6` (the `tanh` envelope expansion — fixes the compressed band).
   - cursor-heave: extend `cursorWell` onto the shaped overshoot/follow-through envelope.
2. **`concentric.wgsl.ts` + `concentric.glsl`** — the finishing layer, transcribed IDENTICALLY:
   - `tone = 0.5 + 0.5*tanh(H * toneGain)` (the fill-the-ramp fix).
   - 4-stop `samplePaletteLin` (already multi-stop — just feed 4 stops).
   - `∇H` (2 finite-diff taps) → hillshade multiply on fill luminance.
   - two-tier `contourInk`: minor every level + bold index at `round(fN/indexEvery)` (pure
     `f(level)` — the `levelJitter` discipline, no buffer).
   - second `contourInk` at offset `fN` → the cel-cast, composited under the index line.
   - cursor-heave amplitude reads the shaped envelope (anticipation/overshoot/follow-through),
     fed via the existing `getAmp`/cursor uniform path.
3. **`uniformBridgeWGPU.ts`** — add the new scalars to the typed struct (the single source).
   Pack into existing/extended `vec4` lanes; bump the struct comment.
4. **`demo/manifest.ts` (BD.W-PAGE-BACKGROUND seam)** — stage concentric over the shared warm
   field. ZERO src ground token. Demo palette/preset stay in `presets.ts` (presets-in-consumers).

**Composition of existing primitives.** Reuses: `waveField` leaf (`waveFlow`/`cursorSwirl`/
`heightField`/`waveSwell`), `curlFBM` (paper-grid kin), `procedural-color` (OKLab mix + OETF),
the IQ `contourInk`, `usePointerVelocityField`, `createGpuSubstrate`, the `levelField.ts` JS
oracle. Nothing re-forked. The hillshade + cel-cast are the only NEW shader math, and they are a
handful of lines each, twin-identical.

---

## 6. CROSS-ENGINE (§L7) + A11Y / PRM

- **WGSL ↔ GLSL parity (the binding floor).** Every new finishing-layer line is transcribed
  byte-identical into both twins (the `sampleHeight`/`contourInk`/`fN` mirror already proves the
  discipline holds). The JS oracle (`levelField.ts`) extends to the same `tanh` envelope so the
  numeric round-trip (`shader-eval-harness.assertParity`, NOT name-presence) closes. A
  sign-flipped hillshade / a `tanh→tanh` gain drift in one backend REDs at ΔE > bar.
- **No `backdrop-filter:url`, compositor-only.** The viz is a pure fullscreen fragment pass on a
  GPU substrate — no DOM goo filter involved here (the meatball law is for the dock, not this
  viz). The relief is shaded entirely in-shader; the cel-cast is a second fragment eval, not a
  DOM shadow.
- **PRM (§L5).** `respectReducedMotion: true` → `--motion-weight: 0` → the cursor-heave envelope
  snaps to its static target, the cel-cast offset → 0, the swell freezes, the substrate seats ONE
  static frame and parks (the inherited substrate-PRM freeze). The map is still a vivid, hillshaded
  relief — just frozen. Legible, beautiful, still.
- **`prefers-reduced-transparency`** → the hypsometric fill alpha floors UP toward opaque (the
  warm relief becomes a solid warm map; the bold index contours stay — a legibility asset).
- **`prefers-contrast: more`** → index-contour ink opacity floors up; the minor/index hierarchy
  sharpens.
- **Offscreen-pause** inherited (`useIntersectionPause` + `content-visibility` via the substrate).

---

## 7. DELTA-ASSAY → the wave amendment (reconcile vs the union waves; NO dup)

The 116-wave union has THREE concentric-adjacent waves. My finding forces an amendment, not a new
wave:

- **`BD.W-CONCENTRIC-LEVELSET` is STALE and must be RE-GROUNDED.** It specs an OPT-IN
  `field:"rings"|"levelset"` axis with a `"rings"` byte-identical default — but HEAD has ALREADY
  retired the ring engine (clean break, no `field` axis, level-set is the sole default). The doc
  describes a world two refactors ago. **AMEND** it: the field-source swap is DONE; re-point the
  wave at the FINISHING LAYER (the hypsometric ramp + two-tier contour + hillshade + cel-cast +
  heave) on the already-shipped level-set field. Keep its real fences: IQ `contourInk` KEPT
  byte-untouched (still true — I add a SECOND eval for the cast, I do not re-derive the operator);
  numeric parity via the harness, not name-presence; no second noise basis; warm-cream identity.
- **`BD.W-PAPERGRID-WARP`** — UNCHANGED. Concentric rides the shared `curlWarp`; my design
  consumes it, adds nothing. The kinship (same wave twists both viz) is preserved and is, in fact,
  the reason the cel-cast slide reads coherent with paper-grid.
- **`BD.W-CONCENTRIC-RADIUS`** — UNCHANGED, ORTHOGONAL (CSS radius token, no viz collision).
- **`BD.W-PAGE-BACKGROUND`** — UNCHANGED; concentric's flat-ground fix routes into its existing
  substrates-band map (one new staged route, no new sibling).

**The amendment**: fold lens-c into a re-grounded `BD.W-CONCENTRIC-LEVELSET` whose ask is the
finishing-layer punch (vivid hypsometric ramp, two-tier index/minor contour, analytic hillshade,
moving cel-cast, cursor-heave squash) over the EXISTING level-set field, staged over the shared
warm ground. No new wave; the existing wave's stale "swap the field source" premise is replaced
by the live-verified "the field is fit — punch up the render."

---

## 8. THE BINDING GATE (painted-pixel, NOT geometric proxy — honoring the prior false-pass scars)

The verdict is a **painted-pixel readback**, both modes + webkit, NEVER a geometric/name-presence
proxy (the prior goldens' false-pass class):

1. **VIVID, not gray.** A `getImageData` sample over the viz region reads chromatic saturation
   above a floor AND a hue histogram entirely in [28,90] (warm) — a gray/desaturated frame REDs;
   any [180,270] pixel REDs (teal-navy purge).
2. **RELIEF READS.** Luminance variance across the fill clears a floor (the hillshade + height
   bands give real structure) — a flat single-tone fill REDs.
3. **TWO-TIER CONTOUR.** The bold index lines are detectably stronger than the minor hairlines
   (a line-strength bimodality in the readback) — a uniform single-weight scribble REDs.
4. **ALIVE.** Two frames Δt apart differ above a motion floor (the swell + cast move); under PRM
   they are IDENTICAL (the freeze).
5. **CURSOR HEAVE.** A synthetic pointer move produces a local contour-spacing compression on the
   near side (squash) detectable in the readback delta.
6. **LIVE WARM GROUND.** A live field exists behind the viz with non-uniform variance (the §3
   bar, inherited from `proof:page-background` W2-π) — a flat plate REDs.
7. **NUMERIC TWIN PARITY.** `sampleHeight` + the `tanh` envelope round-trip JS↔WGSL↔GLSL ≈0 at the
   calibrated bar (harness, not `/fn name/.test()`).

Born-FAIL on HEAD (gray/faint/flat-ground/no-punch — the live screenshot is the born-fail
witness). GREEN only when the relief is vivid, two-tiered, hillshaded, alive, heaving, and over a
warm field — judged on FRESH pixels in BOTH modes.

---

## 9. ONE-LINE SUMMARY

Keep the (already-shipped, twin-parity, IQ-extracted) curl-warped level-set FIELD; re-invent the
RENDER as a **vivid 1940s-technicolor hypsometric relief map** — saturated warm height bands,
two-tier minor/bold-index inked contours, an analytic cel-sun hillshade, a moving cel cast-shadow
that slides downhill with the traveling wave, and a cursor that HEAVES the sheet with
anticipation→overshoot→follow-through squash — staged over the SHARED warm field; the boldest
move is the heaving relief + the procedural moving cel-cast, the single most alive gesture, all
inside the existing fragment shader with zero new pass or fork.
