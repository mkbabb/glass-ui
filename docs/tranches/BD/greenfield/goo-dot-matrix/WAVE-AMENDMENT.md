# GooDotMatrix — WAVE-AMENDMENT (the concrete tranche amendment)

> Reconciled against the extant 116-wave BD/union set + the BC engine wave. Reference
> implementation: `docs/tranches/BD/greenfield/goo-dot-matrix/GOLDEN.md` (+ the three challenge
> folds in `DELTA-ASSAY.md §2`). NO duplicative work — the engine is 100% fit; ONE new wave
> re-authors the READ + adds the ground pass. No existing wave is pruned or excised.

---

## SUMMARY OF DISPOSITION

| Wave | Action | Why |
|---|---|---|
| **`BD.W-GOODOT-LIQUID-FIELD`** | **NEW (author)** | the four-move read re-author + the warm-ground 2nd pass + the technicolor re-grade + the demo re-host + the paired-engine `proof:goodot-liquid` born-RED gate |
| `BC.W-VIZ-HYBRID` (the goo-dot engine) | **AUGMENT (base, byte-frozen)** | the new wave re-authors the READ on its byte-untouched field/splice/substrate/twin; the BC cage gate `proof:viz-hybrid` stays GREEN by construction (the field math + warm-identity fence untouched) |
| `union/waves/W-VIZ-BROKEN-FIX.md` | **DEPEND (orthogonal plumbing)** | fixes config-liveness (D2) + WebGPU-selection — the read re-author lands AFTER the config is live + the WGSL primary is exercised; no scope overlap |
| `union/waves/BD.W-DOT-UNIFY.md` | **COORDINATE (byte-frozen mechanism)** | unifies the dot-trio SHELL; it byte-freezes the three renderer shaders. The goo-dot read re-author edits the `goo-dot.*` mechanism → must land BEFORE DOT-UNIFY re-homes it (or DOT-UNIFY's B6 byte-identity baseline re-points to the re-authored surface). One-line edge, no dup |
| `waves/BD.W-VIZ-PARITY-METAL.md` | **DEPEND (the paired-engine net)** | G5 reads its WGSL-Metal×GLSL-ANGLE ΔE net; this wave BLOCKS on the LIVE readback (the proxy ΔE 0.0 is not acceptance — C2·R4 fold) |
| `waves/BD.W-BLOB-MOTION-TUNE.md` | **CONSUME (louder-arm finding)** | a backdrop dot-field wants MORE morph than the focal blob → apply its louder stretch/bloom register to the goo-dot DEFAULT |
| `union/waves/BD.W-DOTFLOW-REBUILD.md` | **ADJACENT (shared breathing register, no dup)** | dot-flow = radial density halftone (no metaball); goo-dot = metaball-driven density. Distinct register; the ONLY shared lever is the φ-twinkle breathing + the warm-ground floor (DRY — both fold a "colourful default backdrop" dependency, but each owns its own paint gate) |
| `union/waves/BD.W-VIZ-CONFIGURATOR.md` / `BD.W-VIZ-KEYBOARD.md` | **UNTOUCHED** | configurator wiring + keyboard a11y — orthogonal to the shader read; the new `presence-floor`/`fieldGround` controls ride the existing configurator schema |
| goo-blob sibling (`BD.W-GOOBLOB-MERCURY-COLONY`) | **COMPOUNDING, no edge** | when goo-blob's fission lands, the dots neck+split FOR FREE (the dots consume `sceneDistG` byte-untouched) — a free win, no dependency |

**No wave is PRUNED or EXCISED.** The engine is fit; the read is the genuine net-new. The only
EXCISION is in `src/` (the dead `config.flowAmt`/`cols`/Register-B vocabulary), owned by the new wave
as a no-legacy clean break.

---

## NEW WAVE — `BD.W-GOODOT-LIQUID-FIELD`

**Band A (procedural viz) · [REFINE-read + BUILD-ground] · AUGMENTS `BC.W-VIZ-HYBRID` (byte-frozen
field) · DEPENDS `BD.W-VIZ-PARITY-METAL` (live paired net), `union/W-VIZ-BROKEN-FIX` (config-live +
WGPU-selected) · CONSUMES `BD.W-BLOB-MOTION-TUNE` (louder backdrop register) · COORDINATE
`BD.W-DOT-UNIFY` (lands before the shell re-homes the mechanism, or re-points its B6 baseline) ·
ADJACENT `BD.W-DOTFLOW-REBUILD` (shared φ-twinkle + warm-ground, no dup).**

> **STATUS: IMPLEMENTATION-gated.** Tranche-DEV PLAN doc. Reference implementation:
> `docs/tranches/BD/greenfield/goo-dot-matrix/GOLDEN.md` + the seven+ challenge folds in
> `DELTA-ASSAY.md §2`. The build re-authors the dot READ on the byte-untouched goo-blob field + adds
> ONE dedicated warm-ground second pass; user-gated.

### The defect (live-confirmed, born-RED — `delta-current-canvas-light.jpeg`)

`/substrates/goo-dot` default story (mounts `GOO_DOT_PRESET_WARM`, already the louder read) renders a
~250px faint tan dot-clump floating in a ~1080px empty cream card: a getImageData readback returns
**`litFrac:0.0141`, `edgeLitFrac:0.0`** (zero dots in the outer border — dead corner-to-corner),
`meanLitRGB:[161,120,79]` (warm tan, near-zero contrast over flat cream), `pageBg:transparent` (no
colorful field behind). Five compounding defects (GOLDEN §0 D-table, corroborated frame-for-frame):
D1 the `step()` discard-void (`goo-dot.wgsl.ts:159-160`/`frag:110-111`); D2 cream-on-cream
(`constants.ts:100-105`, ΔL 0.08 ΔC 0.04); D3 no colorful ground (`constants.ts:127` + transparent
page); D4 the gradient-blind ramp → the neck reads as the THINNEST dots = vanishes (`:131`/`frag:89`);
D5 the screen-locked frozen lattice (`:107`/`frag:67`).

### The mechanism — four moves on the EXISTING field + dot lanes + twin (GOLDEN §2, challenge-hardened)

All four land in BOTH `goo-dot.wgsl.ts` and `goo-dot.frag.ts` LOCKSTEP; all new terms are
derivative-free (the `fwidth` AA stays in `fs_main`/`main` only — the dual-module fence). ZERO new field
eval, ZERO new distance fn, ZERO fork.

1. **MOVE 1 — the φ-banded PRESENCE FLOOR (the D1 structural fix).** Replace the `step()` gate
   (`wgsl:159`/`frag:110`) with `band = smoothstep(0, uFieldFloor, fCell)` (the meniscus the step
   deleted), `present = max(uPresenceFloor, band)`, `alpha = dot·present·twinkle`, `if (alpha < 0.002)
   discard`. `uPresenceFloor = 0` ⇒ byte-identical (the calm escape hatch). **Default `presenceFloor:
   0.20`** (raised from the golden's 0.12 per the C1·R4/C2·R3 ghost-lattice fold).

2. **MOVE 2 — the NECK-RIDGE read-out (the D4 metaball-legibility fix, the BOLDEST move,
   challenge-re-derived).** Re-author the read-out (`wgsl:131,151`/`frag:89,103`) into CORE/NECK/RIM
   bands. The weld is gated on a **rim/iso band** (`fCell` near the silhouette-cross value where two
   membranes meet), **NOT on `core`** (the C2·R1 fix — `core` is lower at the waist and suppresses the
   weld exactly where it must be loudest). The specular is a **multiplicative HDR pop**
   (`bright *= 1 + uWeldSpecular·weld`, can exceed the core ceiling), the swell **~1.35×** pinned so
   `dotMax·(1+weldSwell)·cellHalf < cellHalf` (the √φ cell-clip ceiling — the ridge is FAT ROUND dots,
   never clipped squares, per C3·R3). Reconcile the real `weldSwell` + any `*N` factor in the prose.
   Costs one `length(scene.yz)` + one `smoothstep` on a gradient the field already returns.

3. **MOVE 3 — the technicolor re-grade + the GATED cartoon shadow (the D2 vivid fix).** Re-grade the
   library's own `WARM_IDENTITY_PALETTE` to a 3-stop technicolor liquid ramp (CORE hot butter-gold
   `C≥0.13` / NECK molten coral / RIM deep amber — presets-in-consumers token evolution, the no-gray
   warm floor cleared with room). On light hosts drive the FLOOR dots toward the amber/coral stops (not
   the L0.96 core stop) so the resting lattice carries chroma (the G3b fix). The cartoon shadow (a
   larger, darker, offset disc under the bright dot) is **GATED on `fieldGround != "transparent"`** (it
   needs an opaque ground to cast onto, per C3·R4 — no dark halos on a light host) and the offset is
   **wired to the live `pointerField.burst`** (`useGooDotMatrix.ts:191`), NOT the static `uFlowAmt`
   (the velocity tell made real, per C3·R4). Prefer the rectangular oklab lerp over cylindrical OKLCh
   (C2·R6c, cross-engine hue safety).

4. **MOVE 4 — the warm GROUND + the liquid lattice (the D3 + D5 fix).**
   - **(4a) The warm ground (re-scoped per C1/C2/C3 — NOT Aurora).** A NEW dedicated warm-amber
     gradient fragment (≤ ~30 lines, its OWN minimal shader), a SECOND `createRenderPipeline` (WGPU) /
     SECOND `linkProgram` (GL) drawn pass-1 `loadOp:"clear"`, then the dot pipeline pass-2 `loadOp:"load"`
     over `blendFunc(ONE, ONE_MINUS_SRC_ALPHA)`. The WebGL2 tail degrades to a flat warm gradient quad.
     **Honestly named: +1 pipeline / +1 program / +1 BGL / +1 draw** (NOT "the splice idiom"). NOT
     `auroraFallbackGround` (a CPU data-URI for the capture substrate). Library default `fieldGround:
     "transparent"` (composability over a host); demo default `"warm"` + a defined card edge.
   - **(4b) The liquid lattice (D5).** Advect `sampleUv` down `normalize(scene.yz)·uFlowAmt·core` (the
     dots migrate INTO forming bodies) + the φ-`twinkle` DRYed off the field's already-spliced
     `breath`/`hash21` helpers (C2·R4b — inherits proven parity) + a volume-preserving lattice squash
     from `breath(uPulsePhase)` + the pointer burst (X·Y≈1). `uFlowAmt` is a **real net-new lane added
     from scratch** (the dead `config.flowAmt`/`cols`/Register-B vocabulary is EXCISED — clean break).

**Uniforms** (`uniformBridgeWGPU.ts` + both shader structs): extend binding1 `DotUniforms` 64→96 bytes
(4→6 lanes): `s12 (uPresenceFloor, uWeldLo, uWeldHi, uTime)` + `s13 (uWeldSwell, uWeldSpecular, uFlowAmt,
uLatticeSquash)`; field struct (binding0) byte-identical. The GLSL twin adds the matching N named
`gl.uniform1f(dU.*)` scalars; a unit asserts the GLSL `dU.*` count == the WGSL lane-field count (C2·R4
— a dropped uniform reds). `uTime = simTimeMs`.

**Config** (`constants.ts`): add `presenceFloor: 0.20`, `weldSwell` (the reconciled real value),
`weldSpecular: 0.25`, `fieldGround: "warm" | "transparent"` (default `"transparent"`). Re-grade
`WARM_IDENTITY_PALETTE`. EXCISE `flowAmt`/`cols`/`MAX_LATTICE_COLS`/the Register-B comments.

**The ground pass + PRM** (`useGooDotMatrix.ts` + `gooDotSetup.ts`): the 2nd pipeline/program; pin the
PRM freeze `t` to a deterministic **mid-merge** phase (CC-count 1, the neck band present — C2·R5/C3·R5);
assert `uTime`/`uFlowAmt`/twinkle-phase zeroed in the PRM pack; freeze BOTH passes to ONE composite.

**Demo** (`goo-dot.vue` + `presets.ts`): DEFAULT story `fieldGround:"warm"` (vivid out of the box, §3
demonstrated) + defined edge; `GOO_DOT_PRESET_REFERENCE` stays the near-dark homage (now FILLS via the
presence floor); a `presence-floor` control demonstrates the gate→field continuum.

### The gate — `proof:goodot-liquid` (born-RED on HEAD, paired-engine, both modes)

`scripts/proof-goodot-liquid.mjs`, `tags: ["local"]` (it samples PAINTED canvas pixels on a real
GPU/GL — the cardinal-lesson split; a source-presence regex is FORBIDDEN). A π/readback over the
rendered canvas, paired WGSL-on-Metal × GLSL-on-ANGLE, both light + near-dark presets.

- **G1 — FIELD FILLS (Move 1, born-RED).** The base-lattice region clears a min lit-area fraction
  (≥ 60% of cells carry a dot with α above a perceptual threshold, NOT α > 0.002 — the C2·R3 raised
  bar; the trivial "ratio > 0" is rejected). *Born-RED:* HEAD `litFrac:0.0141`, `edgeLitFrac:0.0` →
  the field is ~85% empty.
- **G2 — NECK-RIDGE (Move 2, born-RED).** Over a sampled merge cycle the dot field's CC-count goes
  2→1→2, WITH a peak-merge frame where **`max dotR in the NECK band > max dotR in EITHER core band` AND
  `max luminance in the NECK band > max luminance in either core band`** (the C2·R1 luminance
  inequality — the additive-specular mechanism FAILS even the radius-only bar), AND those neck dots are
  **sub-cell circles (radius < cellHalf)** (the C3·R3 cell-clip ceiling — the ridge is a swell, not a
  clipped square). *Born-RED:* the gradient-blind ramp → the neck is the THINNEST dots.
- **G3 — VIVID + COLORFUL (Moves 3+4a, split per C3·R2).**
  - **G3a:** core/neck/rim clear ΔL ≥ 0.18 and C_core ≥ 0.13 (no-gray).
  - **G3b:** the BASE-LATTICE dots clear ΔL ≥ 0.12 vs the ground in BOTH light-cream AND near-dark (the
    C1·R4 actual D2 cure — the floor dots read, not just the core).
  - **G3c (WGPU-only):** the warm ground's mean chroma centroid drifts ≥ ε over N frames (the LIVING
    ground; a static-only ground REDS G3c on WGPU). WebGL2/Safari passes on G3a/b (honest degrade).
  *Born-RED:* cream-on-cream over a flat transparent page.
- **G4 — LIQUID LATTICE + CARTOON SHADOW (Moves 3+4b, born-RED).** The cell-center sample points
  measurably advect toward the core over N frames (the lattice flows, not frozen); the lattice squash
  X·Y≈1 fires on the pulse + a fast drag; the cartoon shadow's under-dot luminance delta is MEASURED
  (≥ a floor — not mere buffer presence, per C1·R5) AND its offset length measurably changes between a
  still frame and a fast-drag frame (the velocity tell, per C3·R4). *Born-RED:* the screen-locked grid.
- **G5 — PARITY + PRM (blocks on the LIVE net per C2·R4).** G1–G4 read identically on WGSL-Metal ×
  GLSL-ANGLE on the **live `BD.W-VIZ-PARITY-METAL` readback** (NOT the device-free proxy ΔE 0.0),
  INCLUDING a clause for the **two-pass blend-order** (the WGPU `load` blend vs the GL second-program
  blend, the WebKit premultiplied second-pass composite — the most Safari-fragile new surface). PRM →
  ONE static held **mid-merge** frame (CC-count 1, the neck band present, the field FILLED), zero
  advection. Single-engine green is NOT acceptance.

**Self-test bites:** a re-introduced `step()` gate REDS G1; an additive (non-multiplicative) or
`core`-gated weld REDS G2 (the cores stay brightest); a mono palette / cream-floor / flat ground REDS
G3a/b/c; a screen-locked grid or imperceptible/static-offset shadow REDS G4; a single-engine or
proxy-ΔE capture REDS G5.

### Fences

- **The field math is byte-UNTOUCHED** (the `BC.W-VIZ-HYBRID` cage gate `proof:viz-hybrid` stays GREEN
  — the splice + `sceneDistG` + the warm-identity fence untouched; only the READ re-authors).
- **NO new component, NO new distance fn, NO new GL context** beyond the second ground pass in the ONE
  owned context (the one-GL-per-route budget holds — two passes, ONE context).
- **NO legacy.** The dead `flowAmt`/`cols`/Register-B vocabulary is EXCISED (clean break, no alias).
- **§L7 viz path, NOT the SVG-goo path** — the merge is the in-shader smin field; no `backdrop-filter:url`;
  fwidth in `fs_main`/`main` only; sRGB-in-shader via the ONE color core; NO naive ellipsoids.
- **Presets-in-consumers** — the technicolor re-grade is a LIBRARY-IDENTITY token evolution; the
  near-dark + warm-ground demo presets stay in `presets.ts`.

### Disposition links

- **GREENFIELD `GOLDEN.md`** (the four moves + the §8 acceptance bar) → BUILT (the spec); each move +
  gate clause traces to GOLDEN §2/§8 + the `DELTA-ASSAY.md §2` challenge folds.
- **`BC.W-VIZ-HYBRID`** → AUGMENTED (the engine base, byte-frozen; the cage gate stays GREEN).
- **`union/W-VIZ-BROKEN-FIX`** → DEPEND (config-live D2 + WGPU-selected D3; the read re-author lands on
  a live config + an exercised WGSL primary). No scope overlap.
- **`BD.W-DOT-UNIFY`** → COORDINATE (lands before the shell re-homes the `goo-dot.*` mechanism, or
  DOT-UNIFY B6 re-points its byte-identity baseline to the re-authored surface). One-line edge.
- **`BD.W-VIZ-PARITY-METAL`** → DEPEND (G5 blocks on its LIVE Metal×ANGLE readback, not the proxy).
- **`BD.W-BLOB-MOTION-TUNE`** → CONSUME (the louder backdrop register on the goo-dot default).
- **`BD.W-DOTFLOW-REBUILD`** → ADJACENT (shared φ-twinkle + warm-ground floor, distinct register, no
  dup; each owns its own paint gate).
- **The build IMPLEMENTATION is user-gated** (the spec names the moves, the byte-table, the born-RED
  gate clauses, the challenge folds).
