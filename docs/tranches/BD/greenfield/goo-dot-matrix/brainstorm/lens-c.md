# GooDotMatrix — GREENFIELD BRAINSTORM · LENS-C (1940s-Technicolor FLOW & PUNCH)

> The boldest, most-alive variant of the goo+dot-matrix hybrid — the metaball SDF field
> rendered as a dot matrix, redesigned from first principles through the cartoon-animation
> lens (anticipation · exaggeration · follow-through · overlapping action · arcs · squash &
> stretch with real WEIGHT/INERTIA), while staying idiomatic + cross-engine + a UNION of the
> extant engine. Reference implementation target: this lens feeds the DELTA-ASSAY → the
> WAVE-AMENDMENT. Tranche-DEV only; implementation USER-gated.

---

## 0. THE LIVE INDICTMENT (born-RED, captured `/substrates/goo-dot`, both presets)

Live-judged in Chrome on the real route (screenshots banked in the orchestrator delta). The
status quo is not "weak" — it FAILS the four brief questions outright:

1. **Do the dots read as REAL metaballs?** NO. The warm-cream default paints a faint,
   evenly-spaced halftone **lozenge** of barely-distinguishable tan dots. The size/brightness
   *does* read `thickness(sceneDistG)`, but the dynamic range is so compressed (warm preset
   `dotMin 0.24 → dotMax 0.54`, `dotBrightFloor 0.52`) and the merge math so smoothed that you
   perceive **no necking, no threshold-snap, no bridge** between body and satellites. It reads
   as a static **gradient-stamped circle field**, exactly the failure mode the brief names.
2. **Morph/flow QUALITY — liquid, weighty, alive?** NO. The field occupies ~25% of the canvas
   as a small centered blob that barely moves. There is zero cartoon punch — no anticipation,
   no squash/stretch of the *dot grid itself*, no overlapping action, no arc. The satellites
   `merge→absorbed→emerge` underneath, but rendered as same-size dim dots the topology change
   is **invisible**. It looks frozen.
3. **PERFECT in Chrome AND Safari?** The twin (`goo-dot.wgsl.ts` ↔ `goo-dot.frag.ts`) is
   structurally sound (byte-spliced field, `fwidth` AA fenced to `fs_main`/`main`, sRGB OETF),
   so PARITY is close — but there is **nothing worth seeing on either engine** yet, and the
   per-cell `sceneDistG` resolve (1 field eval per fragment, gated to the cell center) is
   cheap. Parity is the one *strong* leg. (Note: backing-store sizes lazily to 300×150 until
   the IntersectionObserver fires a resize — a real first-paint defect to assert in the gate.)
4. **Vivid/warm not gray, over a colorful field?** NO — the **single worst** finding. The
   warm-cream dots sit over **flat cream** (default `background:"transparent"` → the page's
   flat `--background` shows through) = **cream-on-cream**, near-zero contrast, the dullest
   possible read. The §3 SYSTEMIC finding is literal here: there is **no colorful field behind
   the glass** — the demo route mounts NO `<Aurora>`, NO mesh, nothing. The dots float over a
   dead flat ground. (The reference near-dark preset inverts to dim-amber-on-pure-black: a tiny
   dim cluster in a vast void — equally dead, opposite cause.)

**The verdict:** the *plumbing* is excellent (the byte-spliced shared field, the one-GL
budget, the shared pointer-velocity field, the lifecycle inheritance). The **gestalt is
absent**: the field doesn't read as goo, doesn't punch, doesn't contrast, doesn't fill. This
is a CALIBRATION + a COLOR-GROUND + a CARTOON-PUNCH problem, not a re-fork. Survival of the
fittest: KEEP the entire engine spine; RE-INVENT what is broken — the *read*.

---

## 1. THE CORE IDEA — "the LIQUID HALFTONE that PUNCHES"

A dot matrix is the perfect medium for cartoon-technicolor metaballs, because **a dot grid
is a sampling lattice that can squash, swell, and snap as a SYSTEM** — a hundred dots moving
in concert read as one weighty liquid body in a way a smooth SDF blob never can. The lens:
**make the dot grid itself the animator.** Three compounding moves turn the dead halftone into
a living, punchy, vivid liquid-metaball field, all on the EXISTING spliced-field spine:

### MOVE A — the THRESHOLD-PUNCH read (make the dots read as REAL metaballs, with a snap)

The current radius/brightness ramp is a **linear** `smoothstep(fieldFloor,1,fCell)` — a soft
gradient that reads as a fade, never a merge. Replace the READ-OUT (not the field math) with a
**two-band threshold-punch** the metaball idiom demands:

- a **CORE band** (`fCell > coreThresh`): dots SNAP to full `dotMax` + full brightness — the
  bright cream membrane interior. This is the "inside the meatball" read.
- a **NECK band** (a narrow `fCell ∈ [neckLo, neckHi]` window straddling the smin merge value):
  dots get a **swell BONUS** (`dotMax · 1.18`) + a **specular lift** — so the bridge between
  two merging bodies is the *brightest, fattest* dots in the field. This is the single move
  that makes "necking" legible in a dot grid: the waist isn't thinner dots, it's **a ridge of
  the biggest dots**, exactly where the SDF says the membrane is welding. (Cartoon overlapping
  action: the neck "fills in" a beat before the bodies finish merging.)
- a **RIM band** (`fCell` just above `fieldFloor`): tiny dots that **scatter** — a sub-cell
  jitter (hash-offset) so the silhouette edge reads as a spattering of droplets flung off the
  liquid, not a clean stamped boundary. (Squash & stretch + follow-through at the rim.)

All three are a `mix`/`step` re-author of step 5–7 in the existing `fs_main`/`main` — ZERO new
uniforms beyond two threshold lanes; the field eval (`sceneDistG`) is UNTOUCHED. The neck-swell
reads the EXISTING gradient magnitude already returned by `sceneDistG` (`scene.yz` = ∂d, i.e.
`fieldGrad`) — where the gradient is shallow (a flat welding membrane) the neck-swell fires;
where steep (a free body's rim) it does not. **The metaball necks are drawn as a ridge of fat
bright dots** — the goo↔dot bridge the brief asks for, finally legible.

### MOVE B — the LIQUID-WEIGHT FLOW of the lattice (squash/stretch the GRID, not just the dots)

Today the cell grid is **rigid** — `cell = floor(fragCoord/pix)` is screen-locked, so the dots
never move; only their radius animates. That is why it looks frozen. The fix is the **liquid
lattice**: advect the *cell-center sample point* through a cheap field-coupled displacement so
the WHOLE grid breathes and leans as one weighty body:

- **field-flow advection** — the cell-center sample uv is nudged DOWN the field gradient toward
  the nearest core (`sampleUv -= normalize(scene.yz) · flowAmt · fCell`), so dots near a body
  visibly **migrate inward** as it forms and **fling outward** as a satellite peels off. This
  is the `flowAmt` lane the schema ALREADY declares (`config.flowAmt`, currently only the
  Register-B lattice consumes it) — promote it into the Register-A fragment read. The dots
  *flow into the goo*, the literal brief ask ("a field of dots that flow and merge").
- **squash & stretch** — couple a global lattice scale to the EXISTING `breath(uPulsePhase)`
  pulse + the `usePointerVelocityField` velocity: the grid squashes vertically + stretches
  horizontally (volume-preserving, the `useLiquidFlex` idiom — X·Y≈1) on the pulse beat and on
  a fast cursor drag (**morph-MORE-on-move**). The dots near a forming neck **lag** the bodies
  by a frame (overlapping action) via a per-band phase offset on `simTimeMs`.
- **the ARC** — a satellite peeling off doesn't travel straight; the EXISTING `pertX/pertY`
  satellite wobble already arcs it. The dot-flow advection makes that arc *visible as a comet
  of dots*, the freed bead trailing droplets (follow-through).

All CPU-side / per-fragment-cheap: the advection is one `normalize` + `mad` on the already-
computed `scene.yz`; the squash is a 2×2 scale on `cellCtrUv` before the field sample. ZERO new
field evals. The pulse + velocity are ALREADY fed into `resolveFrame`.

### MOVE C — the TECHNICOLOR GROUND + the BOLD DOT (kill cream-on-cream; make it VIVID)

The dots are invisible because they're warm-cream on flat cream with nothing behind. Three
fixes, the §3 colorful-field law made literal:

- **a colorful field BEHIND the dots, in the demo** (the §3 fix, consumer-side, presets-in-
  consumers): the `/substrates/goo-dot` showcase frame gets a **living warm-amber → coral →
  butter aurora-mesh ground** behind the canvas (a `<Aurora>` calm preset OR the compositor-
  only `auroraFallbackGround` static-mesh — the cheap path, one-GL-budget-safe). Now the dots
  read as a **bright liquid metaball glowing over a vivid warm field**, the iOS-27 "colorful
  field behind glass" register. The library DEFAULT stays `background:transparent` (so a
  consumer composes it over THEIR field); the *demo* is where the colorful ground lives.
- **the BOLD two-tone dot palette** — re-author `WARM_IDENTITY_PALETTE` from the near-mono
  cream/amber (ΔL 0.08, ΔC 0.04 — invisible separation) to a **technicolor liquid ramp**:
  core = hot butter-gold (`L 0.95 C 0.13 h 85`), neck = molten coral (`L 0.82 C 0.18 h 45`),
  rim = deep amber (`L 0.70 C 0.16 h 62`). Real chroma (C ≥ 0.13, the no-gray warm floor
  cleared with room to spare) + real L-range so the core POPS off the neck POPS off the rim —
  the 1940s-technicolor saturation. The metaball reads as **molten liquid metal/candy**, not
  dishwater. (Both modes: dark mode lifts L by the W-DARK-MATERIAL luminosity arm; the chroma
  is mode-stable.)
- **the CARTOON SHADOW under the dots** — each dot stamps a **layered-offset drop** (a second,
  larger, darker, offset disc behind the bright dot — the bold 1940s technicolor shadowing) so
  the dot field reads as **lifted off the ground with weight**, not flush. One extra `smoothstep`
  per dot at `+offset`, premultiplied UNDER the bright dot — compositor-cheap, the `--shadow-*`
  layered-offset idiom transposed into the shader. (The shadow's offset couples to the velocity
  → the field casts a longer shadow as it lunges = the weight/inertia tell.)

---

## 2. THE FILL & PROPORTION (Aristotelian √φ — make the field BREATHE the whole card)

Today the field is a small lozenge dead-center. The lens fills the surface with golden-ratio
proportion:

- the body + satellites are scaled so the **resting silhouette fills ≈ 1/φ (61.8%)** of the
  shorter canvas axis (the `field.geometry` `bodyRadius`/`orbitRadius`/`canvasSize` atoms — the
  warm preset under-scales them; the demo preset re-proportions, NOT a library re-base unless
  the default itself is judged under-filled at gestalt).
- the **dot cell pitch** sits on the √φ ladder relative to the body radius (cell ≈ bodyR/φ³) so
  the dot density reads as "≈ φ² dots across the body" — a deliberate, legible halftone grain,
  neither too fine (mushes to a smooth blob, losing the dot-matrix identity) nor too coarse
  (loses the metaball read). The current `dotPixelSize 10` over a tiny body gives ~12 dots
  across — re-proportion to the φ grain.
- the satellites orbit at `orbitRadius = bodyR · φ⁻¹` so the merge/neck happens in the
  **visible mid-field**, not off-screen — the necking is the focal event, framed by √φ.

---

## 3. THE PRECISE MECHANISM (the UNION — what changes, citing only verified levers)

**The spine KEPT byte-for-byte (no re-fork, KISS):** the `createGpuSubstrate` picker over the
ONE `createCanvasLifecycle` leaf (offscreen-pause, live-PRM freeze, demand loop, device.lost
self-heal); the byte-spliced goo-blob field (`GOO_DOT_FIELD_WGSL`/`GOO_DOT_FIELD_GLSL` slicing
`sceneDistG`/`breath`/`samplePaletteOklch`/`sminG`/`fieldGrad`/`gamutClampOklch` from
`metaball.{wgsl,frag}.ts` — VERIFIED present); the shared field-sim
(`useBlobMood`/`useBlobPointer`/`useBlobSatellites` with its `orbiting→merging→absorbed→
emerging` phase machine — VERIFIED); `usePointerVelocityField` (`.burst` Readonly Ref, `.tick`,
`setPointer` — VERIFIED) fed from inside `resolveFrame` (no second rAF); the `fwidth` dot-AA
fenced to `fs_main`/`main`; the dot-grid lanes on the SEPARATE binding1/dot-uniform struct.

**The targeted re-authors (the four moves):**

| Move | File(s) | Mechanism | New levers |
|------|---------|-----------|-----------|
| A · threshold-punch | `goo-dot.wgsl.ts` + `goo-dot.frag.ts` `fs_main`/`main` steps 5–7 | replace the linear `smoothstep` radius/brightness with the CORE/NECK/RIM band read; neck-swell gated on `length(scene.yz)` (shallow gradient = welding membrane); rim jitter via `hash21(cell)` (already in the spliced field helpers) | 2 threshold lanes (`uNeckLo/uNeckHi`) on the dot struct s12; reuse `scene.yz` |
| B · liquid lattice | same `fs_main`/`main` step 1–4 + `useGooDotMatrix.resolveFrame` | advect `cellCtrUv` down `normalize(scene.yz)·flowAmt·fCell`; volume-preserving lattice squash from `breath(uPulsePhase)` + `pointerField.burst`/velocity | promote EXISTING `config.flowAmt` into Register-A; `uLatticeSquash` lane s12 (derived in `resolveFrame` from `breath`+burst) |
| C · technicolor ground+dot | `constants.ts` `WARM_IDENTITY_PALETTE`; demo `presets.ts` + `goo-dot.vue` showcase frame | bold 3-stop technicolor ramp (C≥0.13); per-dot layered-offset cartoon shadow disc; demo mounts a warm-aurora/mesh ground behind the canvas | 1 shadow-offset/strength lane s13; demo aurora ground (consumer) |
| Proportion | demo `presets.ts` geometry + `dotPixelSize` | √φ fill (silhouette ≈ 1/φ of axis), φ-grain cell pitch, `orbitRadius = bodyR/φ` | tuning only |

**Uniform budget:** ≤ 2 new dot-struct vec4 lanes (s12 thresholds+squash, s13 shadow) on the
EXISTING binding1 `DotUniforms` — the field struct (binding0) stays byte-identical (the SoT
extend, never a re-fork). The `packGooDotUniforms` bridge (`uniformBridgeWGPU.ts`) extends in
lockstep with the GL `dU.*` sets — the round-trip parity gate keeps WGSL+GLSL constants locked.

**A11y / PRM carve (inherited, re-confirmed):** under `prefers-reduced-motion: reduce` the
substrate paints ONE static frame then parks (live-PRM freeze); the lattice advection + squash
+ shadow-velocity all read the `tempo===0` zero (`pointerField.tick(0)`, `breath` frozen) → a
held, legible mid-merge frame. WCAG-2.2.2 pause via the EXISTING `v-model:paused` seam. The
canvas is `aria-hidden` (decorative). The first-paint backing-store-resize-on-mount defect is
fixed (resize on `ensure()`, not only on IntersectionObserver).

---

## 4. CROSS-ENGINE (Chrome + Safari) — the parity discipline

This viz is GPU-shader (WGSL primary / GLSL-on-ANGLE-or-WebKit fallback), NOT a DOM `filter:url`
goo — so the §L7 "static SVG goo filter, no `backdrop-filter:url`" fence is about the goo-MORPH
and dock-fission engines, NOT this one. The cross-engine bar HERE is the **twin-shader numeric
parity** (the W-VIZ-PARITY-METAL / W-VIZ-TAILS discipline):

- the four moves are authored IDENTICALLY in `goo-dot.wgsl.ts` and `goo-dot.frag.ts` (the same
  band thresholds, the same advection math, the same shadow stamp) — the round-trip gate
  asserts the dot-grid constants are lockstep (NOT `.test(/fn/)` — a real ΔE net per W-VIZ-TAILS).
- **sRGB throughout** — the bold palette resolves via the EXISTING `samplePaletteOklch` →
  `oklabToLinearSrgb` → `linearToSrgb` chain (the ONE color core), so the technicolor read is
  colorspace-identical on Metal × ANGLE; the new shadow disc composites in the SAME premultiplied
  sRGB space (no extra colorspace seam).
- the `fwidth` neck-band swell stays in `fs_main`/`main` ONLY (the gpuweb #1795 dual-module
  trap — already fenced; the new bands add no vs_main-reachable derivative).
- **the gate is PAIRED-ENGINE** — the metaball-read + the neck-ridge + the technicolor contrast
  captured on WGSL-on-Metal × GLSL-on-ANGLE, ΔE closed against the W-VIZ-PARITY-METAL numeric
  net (no authored 0.0).

---

## 5. THE BOLDEST MOVE (the one to lead with)

**MOVE A's NECK-RIDGE: render the metaball weld as a ridge of the FATTEST, BRIGHTEST dots —
not thinner ones.** Every prior dot-metaball read (and the status quo) draws the neck as a
*gradient thinning* between two bodies, which in a dot grid reads as "fewer/smaller dots" =
indistinguishable from empty field = the neck vanishes. The inversion — gating a **swell bonus
+ specular lift on the shallow-gradient welding band** (`length(scene.yz)` low ⇒ a flat membrane
⇒ the biggest brightest dots) — makes the bridge between merging bodies the **visual climax** of
the field: as a satellite necks in, a glowing ridge of molten dots *fills the waist a beat before
the bodies fuse* (overlapping action), then snaps. THIS is what makes a dot matrix read as a
real, alive, cartoon-punchy liquid metaball — the thing the status quo completely lacks — and it
costs one `step` on a gradient term the field ALREADY returns. Deft, KISS, zero new field eval.

---

## 6. DELTA-ASSAY hand-off (the reconcile + the born-RED gate to forge)

- **No dup vs siblings:** goo-blob owns the SDF-field metaball + the fission split engine
  (`BD.W-GOOBLOB-MERCURY-COLONY`); goo-morph owns the DOM-`filter:url` barbell
  (`BD.W-GOO-BARBELL-NECK`); dot-matrix/dot-flow own the halftone backdrop
  (`W-DOTFLOW-REBUILD`). This lens is **the dot-grid OUTPUT stage over the spliced goo field**
  — a distinct surface (the goo drawn AS a dot matrix). The amendment is a re-author of the
  EXISTING `goo-dot` read + a demo colorful-ground + a palette, NOT a new engine. It DEPENDS on
  goo-blob's `orbitWiden`/satellite phase (consumes, never re-forks) and on W-VIZ-PARITY-METAL.
- **The born-RED gate to forge (`proof:goo-dot-punch`, paired-engine, both modes):**
  (G1) **metaball read** — over a sampled merge cycle, the dot field's connected-component count
  goes 2→1→2 (satellite necks in then out) with a frame where the NECK band carries the field's
  LARGEST dots (neck-ridge witness); born-RED on HEAD (linear ramp = neck vanishes, no ridge).
  (G2) **liquid flow** — the cell-center sample points measurably advect toward the core over N
  frames (the lattice flows, not frozen); born-RED on the screen-locked grid.
  (G3) **vivid contrast** — the core/neck/rim dots clear ΔL ≥ 0.18 and ΔC where C_core ≥ 0.13
  (no-gray warm floor); the demo composites over a colorful (non-flat) ground (field behind the
  dots has C ≥ 0.05 variance); born-RED on cream-on-cream (live-captured: the dim invisible
  lozenge).
  (G4) **cartoon shadow + squash** — each dot carries a layered-offset shadow; the lattice
  squash X·Y≈1 (volume-preserving) fires on the pulse + on a fast drag (morph-more-on-move);
  born-RED on the flush, rigid grid.
  (G5) **PARITY** — G1–G4 read identically on WGSL-on-Metal × GLSL-on-ANGLE, ΔE on the
  W-VIZ-PARITY-METAL net; PRM → one static held mid-merge frame, zero advection.
- self-test bites: a re-introduced linear ramp REDS G1; a screen-locked grid REDS G2; a
  cream-on-cream ground or a mono palette REDS G3; a flush/rigid grid REDS G4.
