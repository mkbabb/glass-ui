# GooDotMatrix — GOLDEN (the canonical synthesis)

> The single best variant: the strongest move from each of the three lenses, reconciled into ONE
> coherent design. Synthesized from `brainstorm/lens-a.md` (the presence-FLOOR field), `lens-b.md`
> (the CROSS-ENGINE / colorful-ground rebuild), `lens-c.md` (the 1940s-technicolor NECK-RIDGE
> punch). All three drove `/substrates/goo-dot` live BOTH modes and grepped HEAD; all three reach
> the SAME verdict — the engine is FIT, the *read* is BROKEN. This golden keeps the engine whole
> and rebuilds the read.
>
> **Component:** `src/components/custom/goo-dot-matrix/` (the extant one — NO new component, NO fork).
> **Field:** the byte-untouched goo-blob `sceneDistG` splice (`goo-dot.wgsl.ts:26-37`) — never re-derived.
> **Wave (proposed):** `BD.W-GOODOT-LIQUID-FIELD` — AUGMENTS `BC.W-VIZ-HYBRID`; DEPENDS
> `BD.W-DOTFLOW-REBUILD` (shares the breathing register) + `W-VIZ-PARITY-METAL` (the paired-engine net).

---

## 0. THE SHARED DIAGNOSIS (three lenses, one verdict — all live + grepped on HEAD)

The engine spine is SOTA and correct; keep it byte-for-byte:
- the real smin-merged metaball field `sceneDistG(uv) → vec3(d, ∂x, ∂y)` (spliced, `goo-dot.wgsl.ts:36`,
  the `sminG`/`breath`/`samplePaletteOklch` helpers byte-untouched),
- the dot-stamp OUTPUT idea (`fCell = clamp(-scene.x/bodyR,0,1)` at the cell center, `:126`; the
  `fwidth`-feathered AA dot fenced to `fs_main` only, `:143-145`),
- the WGSL ⟷ GLSL twin (`goo-dot.frag.ts` is a line-for-line GLSL twin; the `proof:viz-hybrid`
  round-trip keeps the dot constants byte-lockstep),
- the substrate (`createGpuSubstrate`: offscreen-park, one-frame PRM freeze, device-loss heal),
- the shared pointer-velocity field (`usePointerVelocityField.burst`, fed inside `resolveFrame`, no 2nd rAF).

What is BROKEN — the *read*, live-confirmed both modes by all three lenses:

| # | Defect (live, HEAD) | The cite |
|---|---|---|
| D1 | **A speck in a void.** `alpha = dot · step(uFieldFloor, fCell)` (`:159`) + `discard` (`:160`) → EVERY dot outside the small metaball body is discarded. Live: a ~20-25% clump floats in a vast empty card. There is **no base lattice**; the README's "a grid fills the card" is a lie. | `goo-dot.wgsl.ts:159-160`, `frag:110-111` |
| D2 | **Cream-on-cream invisible.** Warm-cream dots (`L0.92 C0.03`) over the page's flat cream `--card` (`L0.96`) = near-zero luminance contrast. The library default is **literally unseeable** (the §3 flat-field failure in its purest form). | `constants.ts:100-105` |
| D3 | **No colorful field behind (§3).** `background:"transparent"` default → dots float over flat cream; the demo paints flat near-black. NO living field behind the glass — the §3 systemic finding. | `constants.ts:127` |
| D4 | **The neck VANISHES.** The read-out is a linear `smoothstep(fieldFloor,1,fCell)` ramp (`:131`) → the merge waist reads as *thinner/dimmer dots* = indistinguishable from empty field. In a dot grid "thinner at the waist" = the neck disappears. No threshold-snap, no bridge. | `goo-dot.wgsl.ts:131`, `frag:89` |
| D5 | **Frozen lattice + no punch.** `cell = floor(fragCoord/pix)` is screen-locked → the grid never moves, only radii animate. The cursor swell/bloom exists but at the speck scale is imperceptible; no morph-more-on-move, no cartoon punch. | `goo-dot.wgsl.ts:107`, `frag:67` |

**The greenfield bar is therefore: one structural re-think (gate→field) + one material re-think
(vivid + colorful ground) + one motion re-think (neck-ridge punch + liquid lattice) — all on the
EXISTING dot lanes + the EXISTING field + the EXISTING twin. NO new component, NO new distance fn,
NO fork.**

---

## 1. THE CORE IDEA — **the metaball SWELLS through an ever-present technicolor halftone FIELD, the WELD is a ridge of the FATTEST dots, over a living warm aurora ground**

Three reads on the ONE `fCell` thickness scalar the shader already computes, φ-banded:

- **FIELD** (`fCell ≈ 0`, far) — a calm warm halftone lattice, **ever-present**, dim, *breathing in
  place*. The card is alive corner-to-corner, never dead ground. (Lens-A's presence floor.)
- **MENISCUS → NECK** (the rim/weld band) — as the field thickens toward the body the dots ramp
  up; and where the SDF gradient goes *shallow* (a flat welding membrane between two merging
  bodies) the dots get a **swell BONUS + specular lift** → the bridge is the **brightest, fattest
  dots in the field**, not the thinnest. The weld is the visual climax. (Lens-C's neck-ridge — the
  single move that makes "necking" legible in a dot grid.)
- **BODY** (`fCell → 1`, core) — the dots are big, bright, hot-butter cream, their `fwidth` stamps
  **overlapping into continuous goo** (the pitch is tuned so core dots kiss → the halftone DISSOLVES
  into solid metaball at the core). The honest dot↔metaball bridge.

Under it all: a **living warm aurora ground** behind the dots in the SAME canvas budget — the dots
read as a hot technicolor halftone over a breathing amber→coral field with a defined edge.
(Lens-B's colorful-field surpass.)

This is a UNION: the field math, the OUTPUT stage, the cursor influence, the twin, the substrate —
all KEPT. The change is four moves, all riding the existing dot lanes (one new vec4 lane) + the
existing color ramp + the existing Aurora engine. ZERO new field eval, ZERO new GL context, ZERO fork.

---

## 2. THE FOUR MOVES (each = the strongest move of a lens, reconciled)

### MOVE 1 — **dissolve the discard into a φ-banded PRESENCE FLOOR** (Lens-A, the structural fix for D1)

Replace the binary gate (`goo-dot.wgsl.ts:159` / `frag:110`) so the dot is ALWAYS present and the
metaball *modulates* it instead of gating it:

```wgsl
let band     = smoothstep(0.0, uFieldFloor, fCell);   // the MENISCUS rise (was the hard cut)
let core     = smoothstep(uFieldFloor, 1.0, fCell);   // the BODY rise (kept)
let present  = max(uPresenceFloor, band);             // ← the dot NEVER vanishes: a living lattice
// ... radius/bright read uses `core` for the body ramp, `present` for the floor ...
let alpha    = dot * present * twinkle;               // present, not step()-gated
if (alpha < 0.002) { discard; }                       // ONLY sub-pixel dots discard now
```

- `uPresenceFloor` (new, ≈ `1/φ²` ≈ 0.382 of the rim opacity; default ≈ 0.12) — the base-lattice
  floor. At **0 it is byte-identical to today** (the gate restored — a calm escape hatch).
- `band` restores the **meniscus** band the old `step()` deleted (soft rim falloff → gooey, not stamped).
- **Born-RED:** today the card is ~85% empty → the edge-presence-vs-center ratio is 0/undefined → fails;
  GREEN when dots paint corner-to-corner.

### MOVE 2 — **the NECK-RIDGE read-out: the weld is the FATTEST, BRIGHTEST dots** (Lens-C, the metaball-legibility fix for D4)

Re-author the read-out (`:131`/`:151`, both twins) into a CORE/NECK/RIM band read, the neck-swell
gated on the gradient magnitude the field ALREADY returns (`scene.yz` = ∂d; shallow gradient = a
flat welding membrane):

```wgsl
let gradMag  = length(scene.yz);                              // ∂d — shallow at a weld
let weld     = (1.0 - smoothstep(uWeldLo, uWeldHi, gradMag)) * core;  // 1 on a flat membrane in-body
let coreR    = (uDotMin + (uDotMax - uDotMin) * core) * cellHalf;
let dotR     = mix(uDotMin * cellHalf, coreR, present)        // presence floor → base
             * (1.0 + uWeldSwell * weld)                       // ← NECK-RIDGE: weld dots swell ~1.18×
             * (1.0 + influence * 0.5 + uBloom * influence);   // cursor swell (kept)
let bright   = uDotBrightFloor + (1.0 - uDotBrightFloor) * core
             + uWeldSpecular * weld                            // ← weld specular lift (the climax)
             + uBloom * influence * 0.6;
```

This makes the bridge between merging bodies the **brightest, fattest dots** — a ridge of molten dots
fills the waist a beat before the bodies fuse (overlapping action), then snaps. Costs one `length`
+ one `smoothstep` on a term the field already returns. ZERO new field eval.
- **Born-RED:** over a sampled merge cycle the connected-component count goes 2→1→2 (satellite necks
  in then out) **with a frame where the NECK band carries the field's LARGEST dots**; born-RED on the
  linear ramp (the neck vanishes, no ridge).

### MOVE 3 — **the technicolor re-grade + the cartoon shadow** (Lens-C palette + Lens-A re-grade, the vivid fix for D2)

The default `WARM_IDENTITY_PALETTE` (`constants.ts:100-105`) is near-mono (ΔL 0.08, ΔC 0.04 —
invisible separation). Re-grade the **library's own identity** (presets-in-consumers: the default
tokens evolve as the lib's identity sharpens — MEMORY `feedback_presets_in_consumer`) to a 3-stop
technicolor liquid ramp with real chroma (C ≥ 0.13, the BA.W-NO-GRAY warm floor cleared with room):

```ts
export const WARM_IDENTITY_PALETTE: OklchStop[] = [
  { L: 0.96, C: 0.13, h: 85 },  // CORE — hot butter-gold (fCell→1, the bright cream membrane)
  { L: 0.82, C: 0.18, h: 45 },  // NECK — molten coral (the weld climax)
  { L: 0.72, C: 0.15, h: 62 },  // RIM  — deep amber (fCell≈floor, the base lattice)
];
```

The brightness term already multiplies L by the band (`:151-154`) → core POPS bright, weld glows
coral, base lattice sits dim-warm. Plus the **cartoon shadow** (Lens-C): each dot stamps a second,
larger, darker, offset disc UNDER the bright dot (the 1940s layered-offset shadowing → the field
lifts off the ground with weight); the offset couples to velocity (a longer shadow as the field
lunges = the inertia tell). One extra `smoothstep` per dot, premultiplied under, compositor-cheap.
- **Born-RED:** core/neck/rim clear ΔL ≥ 0.18 and C_core ≥ 0.13 (no-gray); born-RED on cream-on-cream.

### MOVE 4 — **the living warm AURORA ground, one canvas + the liquid lattice** (Lens-B ground + Lens-C lattice, the §3 fix for D3 + the motion fix for D5)

Two sub-moves:

**(4a) The colorful ground (§3 — the boldest material move).** The dots stop floating over flat
cream. The component composes the EXTANT warm `<Aurora>` (or the cheap `auroraFallbackGround` static
mesh) as a **living warm color field BEHIND the dot layer in the SAME GL context** — a two-PASS
frame in the ONE context the substrate already owns (pass 1: the warm aurora mesh, load `clear`;
pass 2: the dot-stamp, load `load`, blend over). The dots read as a hot halftone over a breathing
amber→coral aurora. This reuses the extant Aurora WGSL/GLSL — a SPLICE+compose, the SAME idiom the
hybrid already uses to splice the goo-blob field. The Aurora uniforms ride a THIRD binding; the
field (binding0) + dot (binding1) structs stay byte-identical (the SoT-extend, never a re-fork).
- **Library default keeps `background:"transparent"`** (composability — over a consumer's host); the
  **demo default turns the ground ON** + a defined card edge (presets-in-consumers).
- **Budget honesty:** TWO passes in ONE context (the one-GL-per-route budget holds). If the WebGL2
  tail can't afford the live mesh, the aurora pass degrades to the static `auroraFallbackGround`
  (one quad, near-free) — still colorful, still warm. PRM freezes BOTH passes to one composite.

**(4b) The liquid lattice (D5).** Today `cell = floor(fragCoord/pix)` is screen-locked (frozen).
Advect the cell-center sample down the field gradient toward the nearest core and squash the lattice
volume-preservingly on the pulse + a fast drag — so the WHOLE grid breathes and leans as one weighty
body (morph-MORE-on-move):

```wgsl
let flow      = normalize(scene.yz + vec2(1e-6)) * uFlowAmt * core;  // promote the EXISTING config.flowAmt
let twinkle   = 0.85 + 0.15 * sin(uTime*0.6 + hash21(cell)*6.283);   // calm in-place breathing
let sampleUv2 = sampleUv - flow;                                      // dots migrate INTO the goo
// (resolveFrame derives uLatticeSquash from breath(uPulsePhase)+pointer burst, vol-preserving X·Y≈1)
```

`uFlowAmt` is the lane the schema ALREADY declares (`config.flowAmt`, today only Register-B reads it
— promote it into the Register-A read). `twinkle` is the shared dot-flow breathing register (DRY,
in-place, zero net advection — `BD.W-DOTFLOW-REBUILD`). The flick `uBloom` already fires a one-shot
swell → calibrate to anticipation→overshoot→settle (the cartoon punch).
- **Born-RED:** the cell-center sample points measurably advect toward the core over N frames (the
  lattice flows, not frozen); the lattice squash X·Y≈1 fires on the pulse + a fast drag.

---

## 3. THE BOLDEST MOVE (the one to lead with)

**The NECK-RIDGE (Move 2) is the single boldest mechanism** — the inversion that makes a dot grid
read as a real liquid metaball. Every prior dot-metaball draws the weld as a *gradient thinning*,
which in a dot grid reads as fewer/smaller dots = indistinguishable from empty field = the neck
vanishes (the live D4 defect). Gating a swell-bonus + specular-lift on the **shallow-gradient welding
band** (`length(scene.yz)` low ⇒ a flat membrane ⇒ the biggest brightest dots) makes the bridge
between merging bodies the visual climax: as a satellite necks in, a glowing ridge of molten coral
dots *fills the waist a beat before the bodies fuse* (overlapping action), then snaps. It costs one
`length` + one `step` on a gradient the field ALREADY returns. Deft, KISS, zero new field eval.

It is **boldest** but not sufficient alone — Move 1 (presence floor) is what gives it a FIELD to be
the climax of; Move 3 (technicolor) is what makes the ridge VISIBLE; Move 4 (aurora ground + liquid
lattice) is what makes it ALIVE. The four compound: a dead speck → an iOS-27 liquid-glass field the
metaball swells through, the weld glowing as the fattest dots, over a living warm aurora.

---

## 4. PROPORTION (Aristotelian √φ — every atom golden)

- **dot radius band:** `dotMin : dotMax = 1 : φ` (≈ 0.28 : 0.45 of the cell).
- **band splits:** `fieldFloor`/`presenceFloor` at `1/φ²` (≈ 0.382); meniscus band width = `1/φ` of
  the floor→core span.
- **fill:** the resting silhouette fills ≈ `1/φ` (61.8%) of the shorter canvas axis (the body +
  satellite orbits re-proportioned in the demo preset; `orbitRadius = bodyR · φ⁻¹` so the merge/neck
  is the focal mid-field event).
- **cell pitch:** `cell ≈ bodyR/φ³` → ≈ φ² dots across the body (a legible halftone grain — neither
  mushed-smooth nor too-coarse). `dotPixelSize` sits on the √φ pixel ladder.

---

## 5. THE MOTION + INTERACTION SPEC (liquid weight, both modes alive)

- **Base lattice breathing** (always-on, calm): the φ-phase `twinkle` (Move 4b) — sub-perceptible,
  in-place, WCAG/PRM-frozen. The card is never static-dead.
- **Field-lean** (kept): the goo-blob `uPointer` deformation leans the whole metaball toward the
  cursor; the dot-cloud follows.
- **Liquid lattice flow** (Move 4b): the cell-center advects down the gradient → dots migrate INTO
  forming bodies, fling OUTWARD as a satellite peels off (a comet of dots, follow-through).
- **Dot swell + warm-flush near cursor** (kept, calibrated): `influence` swells + brightens + warms
  the near-cursor dots toward the coral stop → a warm wake.
- **Flick bloom** (kept, punched): `usePointerVelocityField.burst → uBloom` one-shot
  anticipation→overshoot→damp. Morph-MORE-on-move. The cartoon shadow lengthens with velocity.
- **Settle weight:** ζ ≈ 0.7 — a single decisive overshoot, never a tight/springy snap (liquid-weight law).
- **PRM:** `respectReducedMotion` → `tick(0)` freezes; the substrate paints ONE static composite
  (aurora + dots frozen mid-merge, the field FILLED + legible — strictly better than today's frozen speck).

---

## 6. THE PRECISE MECHANISM (union, KISS, no re-fork — every touch grepped on HEAD)

**Shaders** (`goo-dot.wgsl.ts` + the GLSL twin `goo-dot.frag.ts`, LOCKSTEP):
- Replace the `step()` gate (`wgsl:159` / `frag:110`) with the presence-floor + φ-band ramp (Move 1, ~6 lines both files).
- Re-author the read-out (`wgsl:131,151` / `frag:89,103`) into the CORE/NECK/RIM band read + neck-ridge swell/specular (Move 2, ~8 lines both files).
- Add the cartoon-shadow disc stamp under the dot (Move 3, ~3 lines both files).
- Advect `sampleUv` down `normalize(scene.yz)·flowAmt·core` + the φ-twinkle + lattice squash (Move 4b).
- All new derivative-free terms; the `fwidth` AA stays in `fs_main`/`main` only (the dual-module trap fence).

**Uniforms** (`uniformBridgeWGPU.ts` + both shader structs): ONE new vec4 lane `s12 (uPresenceFloor,
uWeldLo, uWeldHi, uTime)` + ONE `s13 (uWeldSwell, uWeldSpecular, uFlowAmt, uLatticeSquash)` on the
EXISTING binding1 `DotUniforms` (today 64 bytes / 4 lanes → 96 bytes / 6 lanes, 16-aligned). The
field struct (binding0) stays byte-identical. Mirror the offsets in `OFF` + `packGooDotUniforms`
(`uniformBridgeWGPU.ts:29-32,77-108`) + the GL `dU.*` set in `useGooDotMatrix.ts`. `uTime` = the
already-tracked `simTimeMs`.

**The aurora pass** (`useGooDotMatrix.ts`): a FIRST pass drawing the extant Aurora mesh shader to the
same canvas (load `clear`), then the dot-stamp pass (load `load`, blend over). Reuses
`src/components/custom/aurora/shaders/` via splice+compose (the same idiom the hybrid uses for the
goo-blob field). The Aurora uniforms ride a third binding; field + dot bindings untouched. The
`shouldContinue` gate already covers the aurora drift (breathes → loop alive; parks when both settle).

**Config** (`constants.ts`): add `presenceFloor:number`, `weldSwell:number`, `weldSpecular:number`,
`fieldGround: AuroraPreset | "transparent"` to `GooDotConfig`. Defaults: `presenceFloor: 0.12`,
`weldSwell: 0.18`, `weldSpecular: 0.25`, `fieldGround: "transparent"` (library composable default).
Re-grade `WARM_IDENTITY_PALETTE` to the 3-stop technicolor ramp (Move 3). Re-proportion the field
geometry toward the √φ fill in the DEMO preset (`field.bodyRadius`/`orbitRadius`/`smoothK`).

**Demo** (`demo/stories/substrates/goo-dot.vue` + `presets.ts`):
- DEFAULT story: vivid out of the box — technicolor dots over a warm aurora over a defined edge (§3 demonstrated).
- Named preset `near-dark-reference`: the iOS-27 dot-flow homage (near-black ground) — same presence
  field so it FILLS, vividly. A presence-floor slider demonstrates the gate→field continuum.
- Named preset `dots-over-light-host`: `transparent` ground + auto-contrast palette (the matrix over a colorful host).

---

## 7. CROSS-ENGINE (Chrome + Safari) + a11y/PRM CARVE — the hard gate

This is a **GPU-shader viz, owns its own canvas** → it is the §L7 *viz* path, NOT the SVG-goo path.
The merge is computed IN the shader (the smin field), NOT a DOM `filter:url()`. So:
- **WGSL ⟷ GLSL twin parity** — every move lands in BOTH `goo-dot.wgsl.ts` and `goo-dot.frag.ts`
  identically (same band thresholds, same advection, same shadow stamp, same neck-ridge). The
  `proof:viz-hybrid` round-trip keeps the dot constants byte-lockstep; the aurora pass extends the
  gate. **Safari overwhelmingly hits the WebGL2 path** (WebGPU still flagged in many WebKit builds)
  → the GLSL twin IS the Safari surface; paint-verify it as the LEAD, not an afterthought.
- **sRGB color-interp** — the dot-stamp + the cartoon shadow + the aurora pass all resolve via the
  ONE shared `samplePaletteOklch → oklabToLinearSrgb → linearToSrgb` core (colorspace-identical on
  Metal × ANGLE). No reliance on `color-interpolation-filters`.
- **NO `backdrop-filter:url()`** anywhere — the merge is in-shader; the §L7 forbidden list is untouched.
- **`fwidth` AA in `fs_main`/`main` ONLY** — the new bands/shadow/advection add no vs_main-reachable
  derivative (the gpuweb #1795 dual-module trap fence held).
- **NO naive ellipsoids** — the metaball `sceneDistG` smin field + the core-kiss + the neck-ridge is
  the real blob↔meatball merge.
- **@supports / PRM floors** — the substrate paints ONE static frame then parks (PRM); the field
  freezes mid-merge, FILLED + legible. Offscreen-park + content-visibility (kept). The twinkle is
  sub-perceptible AND PRM-frozen (no seizure surface). `aria-hidden` canvas (decorative). WCAG-2.2.2
  pause via `v-model:paused` (kept).
- **The paint-cost fence** — two GPU passes in one context is the cost to watch; the aurora pass runs
  at the budget DPR (`resolveBudgetDpr`); the WebGL2 tail degrades to the static mesh; never a
  per-frame backdrop re-blur.

---

## 8. THE ACCEPTANCE BAR + the BORN-RED GATE (`proof:goodot-liquid`, paired-engine, both modes)

A gate is born-RED on HEAD and goes GREEN only when the four moves land. It is a π/readback over the
rendered canvas, paired across WGSL-on-Metal × GLSL-on-ANGLE, both light + near-dark presets:

- **G1 — FIELD FILLS (Move 1):** the edge-presence-vs-center presence ratio is FINITE and > 0 over
  the whole card (dots paint corner-to-corner). *Born-RED:* HEAD's card is ~85% empty → ratio 0/undefined.
- **G2 — NECK-RIDGE (Move 2):** over a sampled merge cycle the dot field's connected-component count
  goes 2→1→2 (satellite necks in then out), WITH a frame where the NECK band carries the field's
  LARGEST dots (the neck-ridge witness — the waist radius > the two core radii at the weld). *Born-RED:*
  the linear ramp → the neck is the THINNEST dots → the ridge is absent.
- **G3 — VIVID + COLORFUL (Moves 3+4a):** core/neck/rim clear ΔL ≥ 0.18 and C_core ≥ 0.13 (the
  no-gray warm floor); AND the ground behind the dots has C-variance ≥ 0.05 (a colorful, non-flat
  field). *Born-RED:* cream-on-cream (the dim invisible lozenge over flat cream).
- **G4 — LIQUID LATTICE + CARTOON SHADOW (Moves 3+4b):** the cell-center sample points measurably
  advect toward the core over N frames (the lattice flows, not frozen); each dot carries a
  layered-offset shadow; the lattice squash X·Y ≈ 1 (volume-preserving) fires on the pulse + a fast
  drag. *Born-RED:* the screen-locked rigid flush grid.
- **G5 — PARITY + PRM:** G1–G4 read identically on WGSL-on-Metal × GLSL-on-ANGLE, ΔE on the
  `W-VIZ-PARITY-METAL` numeric net (no authored 0.0). PRM → ONE static held mid-merge frame, zero
  advection, the field FILLED. Single-engine green is NOT acceptance.

**Self-test bites:** a re-introduced `step()` gate REDS G1; a linear ramp REDS G2; a mono palette or
cream-on-cream ground REDS G3; a screen-locked/flush grid REDS G4; a single-engine capture REDS G5.

---

## 9. THE DELTA-ASSAY (reconcile vs the union waves — no dup)

| Sibling / wave | Relationship | This golden |
|---|---|---|
| `BC.W-VIZ-HYBRID` (the goo-dot engine) | UNION — the base | re-authors the READ (presence + neck-ridge + technicolor + lattice) + adds the aurora ground pass; ZERO new distance fn |
| goo-blob GOLDEN (sibling) | DISJOINT, shares the field | owns the SDF field + fission + mercury-lens. goo-dot CONSUMES `sceneDistG` byte-untouched. When goo-blob's fission lands, the dots neck+split FOR FREE — a compounding win |
| goo-morph GOLDEN (sibling) | DISJOINT | owns the DOM/SVG barbell-neck (dock fission). goo-dot = GPU dot field. No shared surface |
| `BD.W-DOTFLOW-REBUILD` (§3, dot-flow) | ADJACENT, shares the breathing register | dot-flow = radial density-gradient halftone (no metaball); goo-dot = metaball-driven density. Distinct register; shared lever = the φ-twinkle breathing + the warm-suffusion ground (DRY) |
| `BD.W-BLOB-MOTION-TUNE` | CONSUMES its louder-arm finding | applies the louder stretch/bloom register to the goo-dot DEFAULT (a backdrop field wants more morph than the focal blob) |

**Proposed wave: `BD.W-GOODOT-LIQUID-FIELD`** — NOT a rebuild (the engine is 100% fit). Scope: the
four-move read re-author (both shader twins lockstep) + the technicolor re-grade + the aurora ground
pass + the demo re-host (vivid default + the two named presets) + the paired-engine `proof:goodot-liquid`
acceptance. **CONVERGENCE: ~55%** — engine 100% (math, substrate, pointer field, twins, park/PRM all
ship + correct); the READ + GROUND + CALIBRATION are the genuine build, and they are the entire reason
the live default reads dull.

---

## 10. ONE-LINE GESTALT

GooDotMatrix today is a dead cream-on-cream speck in a void; the golden dissolves the `step()` discard
into a φ-banded **presence floor** (an ever-present breathing halftone fills the card), re-reads the
metaball weld as a **ridge of the fattest, brightest coral dots** (the neck the visual climax, not a
vanishing thinning), re-grades to a **technicolor liquid ramp with cartoon shadows**, and floats the
whole thing over a **living warm aurora ground** in one canvas — turning a procedural curiosity into
an iOS-27 liquid-glass field the metaball swells through, perfect in Chrome AND Safari, on the EXISTING
field + dot lanes + twin: a surgical UNION, no fork.
