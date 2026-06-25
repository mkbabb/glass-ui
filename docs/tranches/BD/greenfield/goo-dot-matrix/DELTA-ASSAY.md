# GooDotMatrix — DELTA-ASSAY (golden vs current, the UNION path)

> The golden-vs-current delta + the deft UNION path. Live-inspected `/substrates/goo-dot`
> (Chrome, WebGPU, light mode, :5173) + grepped every cited line on HEAD. The golden SURVIVES
> all three adversarial challenges as DESIGN; the challenges KILLED two of its deftness claims
> (`flowAmt` is dead, the aurora-ground is a 2nd pipeline not a splice) + wounded its boldest
> move (the neck-ridge does not render bright in the spike) — all FOLDED below. Verdict:
> **REFINE the surface + RE-AUTHOR the read; the engine spine is 100% fit and KEPT byte-for-byte.**

---

## 0. LIVE GROUND TRUTH (the diagnosis is REAL — under-stated, if anything)

Captured `/substrates/goo-dot` default story (the demo mounts `GOO_DOT_PRESET_WARM` — already the
LOUDER read: `dotMax 0.54`/`dotMin 0.24`/`dotBrightFloor 0.52`, bumped past the library default by
`BD.W-VIZ-BROKEN-FIX`). A getImageData readback over the live-warmed canvas (2066×920):

| Metric | Value | Reading |
|---|---|---|
| `litFrac` | **0.0141** | ~1.4% of the canvas carries a dot — a speck in a void |
| `edgeLitFrac` | **0.0** | ZERO dots in the outer 15% border — the card is dead corner-to-corner |
| `ctrLitFrac` | 0.0345 | every lit dot is a tight central clump |
| `meanLitRGB` | `[161,120,79]` | warm tan, low-luma over flat cream `--card` ≈ `[242,238,232]` → near-zero contrast (D2) |
| `pageBg` | `rgba(0,0,0,0)` | the page body is TRANSPARENT → no colorful field behind (D3, the systemic flat-field root) |

Screenshot (`delta-current-canvas-light.jpeg`): a ~250px faint tan elliptical dot-clump floating in a
~1080px empty cream card. **Even with the demo's louder WARM preset already applied, it reads as a dead
speck** — proving the fix is the READ re-author, not preset/contrast tuning. The golden's §0 D-table
(D1 discard-void / D2 cream-on-cream / D3 no-ground / D4 neck-vanish / D5 screen-locked) is corroborated
frame-for-frame. This is the rare item where the diagnosis under-states nothing.

---

## 1. THE DELTA TABLE (KEEP / REFINE / RE-AUTHOR — survival of the fittest)

| Layer | Current (HEAD) | Verdict | The move |
|---|---|---|---|
| **Field math** `sceneDistG` smin metaball (spliced from goo-blob, byte-untouched) | SOTA, correct, real metaball merge | **KEEP byte-for-byte** | zero new field eval, zero new distance fn |
| **The field SPLICE** (`GOO_DOT_FIELD_WGSL`/`_GLSL`, `String.indexOf` slice of helpers into ONE program) | the genuine DRY win — one pipeline, one program, one draw | **KEEP** | the new read rides the SAME spliced field |
| **The dot-stamp OUTPUT idea** (`fCell = clamp(-scene.x/bodyR,0,1)`, fwidth-AA disc) | the honest goo↔dot bridge | **KEEP** | the new bands read the SAME `fCell` scalar |
| **The fwidth fence** (AA in `fs_main`/`main` only) | the dual-module trap held (gpuweb #1795) | **KEEP** | the new derivative-free terms preserve it |
| **The substrate** (`createGpuSubstrate`: offscreen-park, 1-frame PRM freeze, device-heal) | fit, inherited | **KEEP** | + pin the PRM freeze `t` to mid-merge |
| **The shared pointer field** (`usePointerVelocityField.burst` fed inside `resolveFrame`, no 2nd rAF) | fit, one-loop discipline | **KEEP** | wire the cartoon-shadow offset to `burst`, not a static scalar |
| **The WGSL⟷GLSL twin** | the line-for-line GLSL twin IS the Safari surface | **KEEP + extend lockstep** | every move lands in both, DRY off the field's `breath`/`hash` helpers |
| **The `step()` gate + discard** (`wgsl:159`/`frag:110`) | EVERY off-body dot discarded → the void | **RE-AUTHOR** (Move 1) | dissolve into a φ-banded PRESENCE FLOOR; `floor=0` ⇒ byte-identical escape hatch |
| **The read-out ramp** (`smoothstep(fieldFloor,1,fCell)`, gradient-blind) | the neck reads as THINNER dots = vanishes | **RE-AUTHOR** (Move 2) | CORE/NECK/RIM band read; weld = the FATTEST+BRIGHTEST dots |
| **`WARM_IDENTITY_PALETTE`** (`L0.92 C0.03` → `L0.84 C0.07`, ΔL 0.08 ΔC 0.04) | near-mono, cream-on-cream invisible | **REFINE the library identity** | a 3-stop technicolor liquid ramp (C_core ≥ 0.13) — presets-in-consumers token evolution |
| **The frozen lattice** (`cell = floor(fragCoord/pix)`, screen-locked) | the grid never moves, only radii animate | **REFINE** (Move 4b) | advect the cell sample down `normalize(scene.yz)` + φ-twinkle + vol-preserving squash |
| **The colorful ground** (`background:"transparent"`, demo near-black) | NO living field behind the dots (D3) | **BUILD** (Move 4a — re-scoped) | a SECOND-pass warm gradient ground (NOT the Aurora oil engine) |
| **The cartoon shadow** | absent | **BUILD, gated** (Move 3, re-scoped) | a layered-offset disc ONLY when an opaque ground is present + velocity-wired |
| **`config.flowAmt`/`cols`/Register-B vocab** | DEAD config — no shader/pipeline reads it | **EXCISE** (clean break, no-legacy) | delete the dead lanes; Move 4b adds a REAL `uFlowAmt` lane from scratch |

---

## 2. THE CHALLENGE FOLDS (what the golden over-claimed — corrected into the union path)

The three challenges all returned **SURVIVES**; none landed a fatal (no fork, no `backdrop-filter:url`,
no naive ellipsoid). But they killed several deftness/gate claims. The union path FOLDS each:

- **(C1·R1 / C3·intro) `flowAmt` is DEAD, not "an existing lane to promote."** Grepped HEAD: no
  `flowAmt`/`uFlowAmt` token in either shader, no Register-B uniform write anywhere, the dot buffer is
  exactly 4 lanes (s8–s11, 64 bytes). **Fold:** Move 4b ADDS a real `uFlowAmt` lane from scratch (the
  s13 lane the §6 byte-table already admits) — honest net-new plumbing, not a promotion. The dead
  `config.flowAmt`/`cols`/Register-B vocabulary is EXCISED (no-legacy clean break) in the same wave.

- **(C1·R2/R3 + C2·R2 + C3·R1, LOAD-BEARING) Move 4a (aurora ground) is a SECOND PIPELINE, not "the
  same splice idiom."** Verified: `useGooDotMatrix.frame()` issues exactly ONE pass / ONE draw;
  `gooDotSetup.ts` builds ONE pipeline / ONE BGL (2 entries). The goo-blob "splice" is a string-slice of
  helper fns into the SAME program — categorically NOT a second render pass. And `aurora/constants/shaders/`
  is a 798-line oil/van-Gogh engine, not a "warm mesh"; `auroraFallbackGround.ts` is a CPU data-URI raster
  for the capture substrate, NOT a GL quad. **Fold:** Move 4a is re-scoped to a tiny DEDICATED warm-amber
  gradient fragment (≤ ~30 lines, its OWN minimal shader, NOT Aurora) drawn pass-1 `clear`, dot-stamp
  pass-2 `load`-blend; the WebGL2 tail degrades to a flat warm gradient quad (NOT `auroraFallbackGround`).
  Named honestly as +1 pipeline / +1 program / +1 BGL / +1 draw, with a paired-engine blend-order proof.

- **(C1·R6 + C2·R1, the BOLDEST move) the neck-ridge does NOT render bright in the spike.** Live-tested
  across the merge cycle, the two cores stay brightest in every frame; the waist, when it forms, is a band
  of DIMMER coral dots. Cause: `weld = (1-smoothstep(...,gradMag)) * core` is gated on `core` (lower at the
  waist), and the specular is additive (+0.30), swamped by the cores' `(1-brightFloor)*core ≈ 0.58`. The
  spike only reads at all because of an UNDOCUMENTED `*4.0` swell the production prose drops. **Fold:**
  decouple the weld from `core` (gate on a rim/iso band where two membranes meet, not the body ramp); make
  the specular a MULTIPLICATIVE HDR pop (`bright *= 1 + uWeldSpecular*weld`, can exceed the core ceiling);
  bigger swell (~1.35×, pinned so `dotMax·(1+swell)·cellHalf < cellHalf` — the √φ cell-clip ceiling so the
  ridge is FAT ROUND dots, not clipped squares). Reconcile the constant + the `*N` factor in prose; the
  spike must WITNESS the bright waist before any convergence claim.

- **(C1·R4 + C2·R3) the presence-floor lattice is a GHOST on light; G1 is born-GREEN-trivial.** At
  `presenceFloor:0.12` the base lattice over flat cream `L0.96` is near-invisible grey-cream specks; G1
  ("edge-presence ratio > 0") passes on a single lit pixel. **Fold:** raise the default presence floor
  toward ~0.20; add a born-RED **G3b sub-gate** (base-lattice-vs-ground ΔL ≥ 0.12 in BOTH light-cream AND
  near-dark) so the FLOOR dots, not just the core, carry chroma; on light hosts drive the floor dots toward
  the amber/coral stops (not the L0.96 core stop).

- **(C1·R5 + C3·R4) the cartoon shadow is imperceptible + muddies the transparent default.** The spike
  shadow (`shadowRgb 0.10,0.06,0.03` at `*0.35`, sub-pixel offset) reads FLAT; on the transparent library
  default a dark disc paints dark halos onto a light host; the "velocity-coupled" offset is wired to the
  STATIC `uFlowAmt`, not a real velocity. **Fold:** gate the cartoon shadow on `fieldGround != "transparent"`
  (it needs an opaque ground to cast onto); wire the offset to the live `pointerField.burst`
  (`useGooDotMatrix.ts:191`); tie G4's shadow clause to a MEASURED luminance delta under the dot + a
  measured offset change between a still frame and a fast-drag frame — else cut it and defer to the
  cartoon-shadow greenfield.

- **(C2·R4 + C2·R6) the twin lane-extend lands DIFFERENTLY in each + the parity net owes a live number.**
  WGSL packs vec4 lanes (`packGooDotUniforms`); the GLSL twin uses N named `gl.uniform1f(dU.*)` scalars —
  not "ONE vec4 lane" symmetrically. The new `uTime` twinkle + hash terms can diverge Metal×ANGLE at the
  bit level, and `W-VIZ-PARITY-METAL` is still a device-free structural proxy (ΔE 0.0, byte-identical PNGs)
  — the live readback is OWED. **Fold:** state both mechanisms (a unit asserts the GLSL `dU.*` count == the
  WGSL lane-field count); DRY the twinkle/flow off the field's already-spliced `breath`/`hash21` helpers
  (inherits proven parity); make G5 BLOCK on the real live readback, not the proxy.

- **(C2·R5 + C3·R5) PRM "frozen mid-merge, FILLED" is unverified.** `tick(0)` freezes at `t=0` where
  `sep = 0.20 + 0.14·cos(0) = 0.34` — maximally SEPARATED, not mid-merge; the frozen frame could be the
  least-compelling state. **Fold:** pin the PRM freeze `t` to a deterministic mid-merge phase (CC-count 1,
  the neck band present); assert `uTime`/`uFlowAmt`/twinkle-phase are zeroed in the PRM uniform pack.

- **(C3·R2 / refutation 2) G3's "colorful ground" passes on the STATIC fallback.** A baked C-variance
  ≥ 0.05 fallback satisfies G3; "living" is unenforced prose. **Fold:** split G3 into G3a (vivid dots) +
  G3b (base-lattice ΔL, both modes) + G3c (LIVING ground, WGPU-only: the ground's chroma centroid drifts
  ≥ ε over N frames). G3c is the only clause forcing the live pass; WebGL2/Safari passes on G3a/b (honest
  about the degrade).

---

## 3. THE UNION PATH (deft, KISS, no fork, no dual-path)

ONE wave re-authors the READ on the EXISTING field + dot lanes + twin, and adds ONE genuinely-new
second-pass ground pipeline (honestly scoped). NO new component, NO new distance fn, NO new GL context
beyond the second pass in the ONE owned context, NO legacy.

**Shaders** (`goo-dot.wgsl.ts` + the GLSL twin `goo-dot.frag.ts`, LOCKSTEP — every move both files):
1. **Move 1** — replace the `step()` gate (`wgsl:159`/`frag:110`) with `present = max(uPresenceFloor, band)`
   where `band = smoothstep(0, uFieldFloor, fCell)` (the meniscus the step deleted), `alpha = dot·present·twinkle`,
   `if (alpha < 0.002) discard` (only sub-pixel discards). `uPresenceFloor=0` ⇒ byte-identical.
2. **Move 2** — re-author the read-out (`wgsl:131,151`/`frag:89,103`) into CORE/NECK/RIM bands: the weld
   gated on a rim/iso band (decoupled from `core`), multiplicative specular HDR pop, swell ~1.35× pinned
   under the cell-clip ceiling.
3. **Move 3** — re-grade the palette (in `constants.ts`); add the cartoon-shadow disc GATED on opaque ground,
   offset wired to `pointerField.burst`.
4. **Move 4b** — advect `sampleUv` down `normalize(scene.yz)·uFlowAmt·core` + the φ-twinkle (off the field's
   `breath`/`hash21`) + a vol-preserving lattice squash from `breath(uPulsePhase)` + pointer burst.

**Uniforms** (`uniformBridgeWGPU.ts` + both shader structs): extend binding1 `DotUniforms` 64→96 bytes
(4→6 lanes): `s12 (uPresenceFloor, uWeldLo, uWeldHi, uTime)` + `s13 (uWeldSwell, uWeldSpecular, uFlowAmt,
uLatticeSquash)`. The field struct (binding0) stays byte-identical. Mirror `OFF` + `packGooDotUniforms`
(`:29-32,77-108`) + the GLSL `dU.*` set in `useGooDotMatrix.ts` (the N-named-scalar twin; a unit asserts
count parity). `uTime` = the already-tracked `simTimeMs`.

**The ground pass** (`useGooDotMatrix.ts` + `gooDotSetup.ts`): a NEW dedicated warm-gradient fragment
(≤ ~30 lines), a SECOND `createRenderPipeline` (WGPU) / SECOND `linkProgram` (GL), drawn pass-1
`loadOp:"clear"`, then the dot pipeline pass-2 `loadOp:"load"` over `blendFunc(ONE, ONE_MINUS_SRC_ALPHA)`.
NOT Aurora, NOT `auroraFallbackGround`. The `shouldContinue` gate covers the ground drift.

**Config** (`constants.ts`): add `presenceFloor`, `weldSwell`, `weldSpecular`, `fieldGround: "warm" |
"transparent"`. Defaults `presenceFloor: 0.20` (raised per C1·R4), `weldSwell: ~0.5` (the reconciled real
swell), `weldSpecular: 0.25`, `fieldGround: "transparent"` (library composable default). Re-grade
`WARM_IDENTITY_PALETTE` to the 3-stop technicolor ramp. Re-proportion the field geometry toward the √φ
fill in the DEMO preset. EXCISE the dead `flowAmt`/`cols` Register-B vocabulary.

**Demo** (`goo-dot.vue` + `presets.ts`): DEFAULT story turns the warm ground ON (vivid out of the box,
§3 demonstrated) + a defined card edge; `GOO_DOT_PRESET_REFERENCE` stays the near-dark homage (now FILLS
+ necks vividly via the presence floor); add a `presence-floor` control demonstrating the gate→field
continuum.

---

## 4. CROSS-ENGINE + a11y/PRM (the §L7 viz path — KEPT + extended)

This is the §L7 *viz* path (GPU shader owns its canvas, the merge is the in-shader smin field, NOT a DOM
`filter:url()`). All §7-golden carves HELD on HEAD + extend: WGSL⟷GLSL twin parity (every move both files,
DRY off the field's shared helpers); sRGB-in-shader via the ONE `samplePaletteOklch → oklab → linearSrgb`
core (prefer the rectangular oklab lerp over cylindrical OKLCh per C2·R6c); NO `backdrop-filter:url`; fwidth
in `fs_main`/`main` only; NO naive ellipsoids (the real smin field + core-kiss + neck-ridge). NEW surfaces
to gate: the two-pass blend-order on WGSL-Metal × GLSL-ANGLE (the most Safari-fragile new surface); the
PRM-freeze of BOTH passes to ONE held mid-merge composite; the per-fragment perf of the now-FILLED field +
the shadow (gate the shadow to dots above a presence threshold; record frame-time at budget DPR on the
WebGL2 tail).

---

## 5. CONVERGENCE

**REFINE (surface + read re-author) + BUILD (ground pass), RE-INVENT nothing — engine 100% fit. ~55%.**

The engine spine (field math, splice, substrate, pointer field, twins, park/PRM) all ship + correct and
are KEPT byte-for-byte. The READ (presence floor + neck-ridge + technicolor + liquid lattice) + the GROUND
pass + the calibration are the genuine build, and they are the entire reason the live default reads as a
dead cream-on-cream speck. The remaining 45% is build-time de-risk that the challenges proved is NOT yet
done: re-deriving the neck-ridge so the bright waste actually renders (the boldest move is the LEAST
de-risked), the real second-pass ground pipeline + its paired blend-order proof, the raised presence floor
+ the G3b light-host lattice ΔL, the velocity-wired perceptible cartoon shadow, the pinned mid-merge PRM
frame, and the live Metal×ANGLE parity number the proxy net owes.
