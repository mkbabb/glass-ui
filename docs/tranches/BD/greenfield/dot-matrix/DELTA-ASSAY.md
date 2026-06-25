# DotMatrix — DELTA-ASSAY (golden vs current; the UNION path)

> Live-inspected `/substrates/dot-matrix` (Chrome, :5173, light), readback + screenshots
> (`delta-current-rest-light.png`, `delta-current-well-light.png`); source-verified at HEAD
> against `dot-matrix.{glsl,wgsl}.ts`, `uniformBridgeWGPU.ts`, `useDotMatrix.ts`,
> `constants.ts`, `demo/stories/substrates/dot-matrix.vue` + `presets.ts`; the GOLDEN +
> all three `challenge/{1,2,3}.md`. Verdict: **REFINE + GROUND-fold over the shipped engine —
> never a re-fork.** The challenges land; their hardenings are FOLDED into the union below.

---

## 0. The live DELTA (measured, this session)

| Probe | Reading | Verdict |
|---|---|---|
| **Resting field** | `litFrac 0.0191`, meanLit RGB [177,150,126] → OKLCh **L0.69 C0.047 h64** | **near-invisible** warm-on-cream whisper (G4 born-RED) |
| **Static-hold well eccentricity** | **1.003** (a perfect circle) | **symmetric pool** — directional warp ABSENT (G1 born-RED) |
| **Swept-well eccentricity** | 2.735, centroid-behind +0.196 | a **SWEEP-HISTORY ARTIFACT**, not a real warp — the *exact* G2 trap the challenges flagged (see §2) |
| **Near-cursor active chroma** | OKLCh **L0.90 C0.041 h72** | warm (purge holds) but **below the §3 ~0.045 floor** (G6 born-RED at lib floor) |
| **Page background behind canvas** | `bodyBg transparent`, `bodyBgImage none`, `canvasCount 1` | **no colourful ground** (G7 born-RED) |
| **Plane lattice geometry** | `r = sqrt((i+0.5)/N)` unit disc × `planeScale 1.18·aspect` | a **center-DENSE sunflower disc**, not viewport-filling — center cannot self-clear (challenge R4) |
| **Page intro blurb** | still reads "dot-SPHERE — a globe … on a sphere SURFACE" | **stale** — contradicts the plane-default story (challenge-3 note) |

The diagnosis the GOLDEN reaches is **live-true**: symmetric pool, invisible rest, flat ground.

---

## 1. The fit core — KEEP byte-for-byte (survival of the fittest)

Source-verified FIT; do **not** touch:
- The **WGSL↔GLSL twin** (`dot-matrix.{wgsl,glsl}.ts`) — line-for-line, the `isPlane`/`u6`
  branch, the instanced-billboard + `fwidth`-SDF fragment (the ONE AA canon).
- The **`createGpuSubstrate` lifecycle** (offscreen-park, PRM single-frame, `paused` seam),
  the **static phyllotaxis** instance buffer, the **`uniformBridgeWGPU` ONE-table** source
  of truth (std140≡WGSL by construction), the **shared `procedural-color`** OKLab seam.
- **`usePointerVelocityField`** (the shared pointer reader, `tick(delta)` from inside the
  renderer frame — no 2nd rAF) + the **`springStep` ζ=0.7** liquid-weight engage in
  `useDotMatrix.onFrame`.

These are 100% — the engine was never the problem.

---

## 2. The headline REFINE — reclaim the dead vectors → a directional liquid LENS

**The lever exists and is thrown away (live + source confirmed).** `useDotMatrix.onFrame`
reads only `pointer.speed.value` (L126); `pointer.velocity.value` /
`pointer.acceleration.value` are computed by the shared field and **never consumed**. The
plane shader is `lift = toCursor * well` — radially symmetric (static-hold eccentricity
**1.003**, a circle). This is a clean REFINE, not a fork: the union path is

1. **ONE new `u7` vec4 lane** `(velX, velY, twinkleRate, wakeStrength)` — a SINGLE
   `uniformBridgeWGPU` table edit (the deftest CORRECT path; lens-b's `uU2.z/.w` repurpose
   is REJECTED because those ARE the sphere DOF taper — would break the sphere lens).
   `DotPointerState`+`restingPointer` gain `velX/velY/accelMag`; `onFrame` writes them from
   the already-computed field; `packDotRenderUniforms` packs `u7 = (velX, velY,
   config.twinkle, push.active)` (wake = the spring-engaged `active`, so it LAGS+overshoots).
2. **Replace `toCursor*well` in place** (no alias, no dual-path) with the anisotropic
   velocity-warped lens: squash/stretch the distance metric along `vdir` (eccentricity ∝
   `vmag`), an anticipation-LEAD, a comet-tail wake streamed BEHIND, lens magnify on
   `sizeTaper`, a faint chromatic rim — both twins, line-for-line.
3. **Re-aim the sphere `else` branch** to the same screen-space directional lens (ONE warp
   idiom, both registers — the `dim`-idiom, no 2nd mechanism), bounded by `facing` so the
   globe silhouette can't tear (challenge-2 R8).

### The G2 MEASUREMENT TRAP — corrected here, live-proven this session

The GOLDEN's spike already caught it; my live readback **independently reproduces it**: a
sustained sweep over the *current symmetric pool* reads eccentricity **2.735** and
centroid-behind **+0.196** — yet a STATIC hold of the SAME shader reads eccentricity
**1.003**. The swept number is a **history artifact** (the wide spring-lagged well smears a
horizontal band as it crosses), NOT directional anisotropy. **Therefore G2 must NOT be a
single-frame or naive swept-eccentricity check** — a symmetric pool passes it by accident.
The gate (§6) pins G2 to the **velocity-CONDITIONED** centroid-behind AVERAGE over the
high-`vmag` window AND a STATIC-hold control that asserts eccentricity ≈ 1.0 stays
symmetric only on HEAD (the warp must lift the *static-relative-to-travel* ellipse, measured
against a non-moving baseline). The luminance comet-tail (trailing dots glow ∝ `behind·vmag`)
is the PRIMARY, more-robust G2 witness (challenge-1 R3 / challenge-3 R3).

---

## 3. The challenge HARDENINGS folded into the union (the deltas that re-shape the spec)

The three challenges all returned **SURVIVES**; these load-bearing corrections are adopted:

1. **[C1·R2 / C2·R2 / C3·R2 — presets-in-consumers] The read-at-rest + chroma lift moves to
   the DEMO PRESET, NOT `src/`.** Confirmed live: `DOT_MATRIX_PRESET_WARM` is just
   `{...DEFAULT}` (C:0.03, baseOpacity 0.5) — the demo leads with the gray-warm floor. The
   union LEAVES `WARM_IDENTITY_PALETTE` (C:0.03/0.07) and `baseOpacity 0.5`
   **byte-for-byte** (the library identity; the `proof:viz-dotflow` F5 + `proof:teal-navy-purge`
   T1 fences). The vivid technicolor amber→gold ladder + the raised `baseOpacity`/`twinkle`
   live in a demo `DOT_MATRIX_PRESET_VIVID`. G4/G6 assert the floor **on the demo page**,
   exactly as `proof:dotflow-rebuild` R1/R4 do. (This drops the GOLDEN §2.4/§2.6 src-edit.)
2. **[C1·R1 — no cross-viz GLSL helper] DROP the "shared `presence`/`dotTwinkle` GLSL helper
   across dot-matrix and dotflow `mode=field`."** `BD.W-DOT-UNIFY` F1 proves the three dot
   vizzes are distinct render mechanisms (dot-matrix = VERTEX-stage phyllotaxis; dot-flow =
   FRAGMENT-stage cell-lattice) with **no shared fragment layer** — the genuine DRY is the
   shell/configurator, not the render. The vignette + twinkle stay **dot-matrix-LOCAL
   vertex-stage snippets** (~3 lines each). If shared at all, as a textual GLSL-string
   constant in the `procedural-color` seam, never a "one leaf." (Drops the GOLDEN §2.5/§7
   no-second-leaf claim.)
3. **[C2·R2 / C3·R2 — `auroraFallbackGround` is the WRONG primitive] The colourful ground is
   a small NEW warm-mesh CSS primitive, NOT `auroraFallbackGround` reuse.** Source-verified:
   `auroraFallbackGround(config: AuroraConfig)` is the BB.W-AURORA-SWRASTER **static**
   (paints-once-parks) raster of **aurora's blue-cyan nuclei palette** — dropping it behind
   the dots paints an aurora-blue field → a **`proof:teal-navy-purge` violation** for G7, AND
   it contradicts the "slow warm drift" the GOLDEN promises. The union authors a ~6-line warm
   `radial`/`conic-gradient` stack (the spike's own `#stage` block — what was actually
   validated) as a demo-chassis ground, sRGB-interp, compositor-only, **shared across the §3
   flat-page vizzes** via `BD.W-PAGE-BACKGROUND`. Dark mode → deep warm-brown (NOT navy).
4. **[C2·R3 / C3 note — re-calibrate at the SHIPPED radius] The spike de-risked
   `GRAV_RADIUS 0.30`; the lib ships `gravityRadius 0.7`** (`constants.ts:113`, confirmed). At
   0.7 the Gaussian covers the whole disc → the ellipse/wake collapse ("everything is near").
   The union **lowers the plane-register default toward ~0.34** (a demo/config value, not a
   √φ smuggle) so the warp READS, and re-anchors `LEAD = gravRadius/φ²·0.4`,
   `STRETCH_CAP = 1/√φ`, `WAKE_GAIN ≈ 12` at that radius — and the gate drives the radius it
   ships. The √φ ladder is re-anchored to the shipped radius.
5. **[C3·R1 — cartoon shadow is a BINDING precept, PROMOTE it into the headline] not a
   deferred stretch-gate.** The 1940s layered-offset cast is the §1 law. The union ships it
   as a **cheap per-instance offset-duplicate billboard** in the SAME instanced draw (a
   darkened, +offset, lower-α copy keyed off `nearness·pAct`, offset along a √φ light vector)
   — zero new pass, zero new buffer. Born-RED on the current shadowless field (a real gate
   clause). Survival-of-the-fittest: it must RUN in the spike, not be claimed.
6. **[C1·R4 / R4-geometry — the plane must self-clear its center] the center-dense sunflower
   disc cannot clear its own center** (live-confirmed: a tight center disc, not viewport-
   filling). The vignette as written (`presence` brightening edges) fights the lattice
   density. The union **re-lays the plane register as a viewport-filling jittered/rectangular
   phyllotaxis grid** (or inverts the radial density to edge-dense) so the `presence` vignette
   genuinely clears the center where the glass card/title sits. G5 (edge-density >
   center-density at rest) then reads honestly instead of staying RED on the disc geometry.
7. **[C1·R5 — G3 magnify is NOT cleanly born-RED] the shipped plane branch already swells
   `sizeTaper = 0.8 + 0.9·nearness`** (1.7× SIZE near cursor, source-confirmed). G3 must
   assert the **delta over the existing 0.9 swell** (`LENS_MAGNIFY` adds measurable footprint
   over HEAD's near-cursor footprint), not "footprint > rest" (already GREEN). Or fold magnify
   into G1.
8. **[C2·R1 / R6 — parity risk is OKLab-on-GPU, not "sRGB throughout"] correct §4 prose.** The
   palette mix IS OKLab-on-GPU (`samplePaletteLin` does `mix(labA,labB,f)` +
   `oklabToLinearSrgb`); the new rim-tone read WIDENS the parity surface and must be in the
   G8 PARITY-METAL capture (the rim-active frame, not just rest/sweep). The existing
   `out.tone = clamp(1.0 - facing)` (wgsl L199) must be **EXCISED in place** when the rim band
   replaces it (no double-write, no-legacy).
9. **[C2·R4 / C3·R4 — byte-offset arithmetic is fiction] the `u7` lane inserts AFTER `u6`**
   (vec4-index 28 / byte off 112), shifting spin0→128, spin1→144, spin2→160, ints→176,
   bg→192, pal→208; `DOT_RENDER_UNIFORM_BYTES = 208 + MAX_DOT_STOPS*16 = 272`; the `U_OFF`
   words all +4. (The GOLDEN's "off 112 is free" overwrites the spin matrix — corrected.)
10. **[C2·R5 / C3·R5 — three a11y carves are net-new, not "already wired"]
    `prefers-contrast`/`prefers-reduced-transparency` do NOT grep in the dot-matrix tree;
    demote from "already wired" to explicit work items (or cut from the bar).** PRM `tick(0)`
    freeze IS real (keep). Pin `uTime` to a FIXED constant under PRM/capture so the twinkle
    `sin` is bit-identical across runs (challenge-3 R5 — the deterministic-capture hole).
11. **[C2·R7 — perf] add a G11 frame-budget clause** (the per-dot `sin` twinkle + 3×`exp` +
    `smoothstep` rim ≈ triples vertex-stage transcendentals on the WebGL2/Safari fallback over
    a 2400-dot field). Assert frame time within X% of HEAD mid-sweep on the WebGL2 path.

---

## 4. The UNION path in one line

Add **ONE `u7` velocity lane** (one bridge-table edit) → **replace the symmetric `toCursor*well`
in place** with the directional liquid lens (squash/stretch + comet-tail + anticipation +
magnify + chromatic rim + a cheap offset-billboard cartoon cast), **both twins, both
registers**; **re-lay the plane as a viewport-filling edge-clearing grid** with a local
vertex-stage vignette + φ-twinkle; **raise the read-at-rest + vivid grade in a DEMO preset**
(library identity byte-frozen); **stage it over a small NEW warm-mesh CSS ground** shared via
`BD.W-PAGE-BACKGROUND`; **re-calibrate every √φ constant at the SHIPPED (lowered) radius**;
**correct the blurb** to the plane-default story. No re-fork, no dual-path, no legacy.

---

## 5. Files touched (the integration surface)

- `…/dot-matrix/composables/uniformBridgeWGPU.ts` — the `u7` lane (ONE table edit, offsets
  per §3.9), `DotPointerState`+`restingPointer` velocity fields, the `packDotRenderUniforms`
  write.
- `…/dot-matrix/shaders/dot-matrix.wgsl.ts` + `…/dot-matrix.glsl.ts` — the lens/warp/wake/
  magnify/rim/twinkle/vignette + the offset-billboard cast, line-for-line; EXCISE the old
  `toCursor*well` + the L199/L117 `out.tone` when the rim replaces it.
- `…/dot-matrix/composables/uniformBridgeWGPU.ts` `buildDotsBuffer` — the viewport-filling
  edge-clearing plane lattice (replaces the center-dense unit disc).
- `…/dot-matrix/composables/useDotMatrix.ts` — the `onFrame` velocity/accel write (consume
  the shipped field); the PRM `uTime`-pin for deterministic capture.
- `…/dot-matrix/constants.ts` — `twinkle` field, **lowered plane `gravityRadius`**; the
  `WARM_IDENTITY_PALETTE` + `baseOpacity 0.5` stay BYTE-FROZEN.
- `demo/stories/substrates/presets.ts` — a NEW `DOT_MATRIX_PRESET_VIVID` (loud amber→gold
  ladder + raised `baseOpacity`/`twinkle`); `dot-matrix.vue` leads with it; the warm ground
  `<div>` under `ShowcaseFrame tier="field"`; the corrected blurb.
- `demo/stories/…` ground primitive — the ~6-line warm `radial/conic-gradient` stack (shared
  via `BD.W-PAGE-BACKGROUND`), NOT `auroraFallbackGround`.

## 6. The gate — `proof:dotmatrix-golden` (paired-engine, both registers, born-RED on HEAD)

G1 directional ellipse (vs static-hold ecc≈1.0 baseline) · G2 velocity-CONDITIONED
centroid-behind AVG + luminance comet-tail (NOT swept-ecc; the trap) · G3 magnify DELTA over
HEAD's 0.9 swell · G4 read-at-rest on the DEMO page · G5 edge-density > center-density (the
viewport-filling grid) · G6 vivid-no-gray (≥0.045 lib floor / ≥0.10 demo) + hue∈[20,90]
purge bite · G7 colourful ground present both modes · G8 WGSL/GLSL parity incl. the rim-active
frame (OKLab-on-GPU) · G9 PRM symmetric calm + frozen twinkle + PINNED uTime · G10 lifecycle
regression · G11 frame-budget on the WebGL2/Safari path · **G12 cartoon offset-cast lobe**
(the promoted precept — a measurable dark offset-lobe under the lens). Each born-RED on HEAD.

---

## 7. Convergence

**Engine spine 100% (byte-frozen). The FELT viz ~0% built** (every visible deliverable —
the directional warp, the comet-tail, the magnify+rim, the read-at-rest, the vivid grade, the
vignette, the φ-twinkle, the cartoon cast, the ground — is net-new). Per challenge-3 R2, the
honest convergence for the ITEM (golden synthesized + challenge-hardened + delta-assayed +
amendment written + live-verified) is **~92%** of the greenfield-pass bar; the remaining ~8%
is build-time de-risk: re-run the spike at the SHIPPED lowered radius, the offset-cast spike
arm, the real WebKit paired-π, and the G2-trap-corrected gate calibration (user-gated).
