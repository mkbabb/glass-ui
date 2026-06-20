# BD.W-GOOBLOB-SAT-SHADE

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails.**

Land the per-satellite derived-shade blob color — each orbiting satellite carries its OWN OKLCh-derived shade off the body color (not the flat `uBaseColor`), in BOTH backends. The GL color-seam fence is widened DELIBERATELY because **BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1 (the unconditional squircle dome-Z) re-touches the metaball shader on its own merits** — a DIRECTED sanction (this wave depends on SQUIRCLE arm 1's re-touch), so the conditional arm-B trigger FIRES non-circularly.

## (2) Starting state — the exact on-disk reality

No per-satellite color in either shader (VERIFIED by grep — `uSatColor`/`satColor`/`uSatShade` = 0 in `src/components/custom/goo-blob/shaders/`):
- `metaball.frag.ts:153-155` (VERIFIED): the satellite loop reads `uSatPos[i]` / `uSatRadius[i]` / `uSatOpacity[i]` — POSITION + radius + opacity per satellite, but NO per-satellite COLOR. All satellites paint the body color (`uBaseColor`) propagated through the smin field (`sminG`'s `mix(a.yz, b.yz, h)` carries the body color across the merge, :88).
- The per-pixel OKLCh perturb exists (`uHueRange`/`uSatShift` in `s5`, the existing color-noise field — `metaball.frag.ts:303` "body/satellites by the color noise field — or uBaseColor when single-stop") but it is a NOISE perturb across the whole creature, NOT a per-satellite derived shade.
- `src/components/custom/goo-blob/constants.ts:144` + `ORBIT_RANDOM_BASE 0.85` (VERIFIED via the BA.W-GOO-REDRESS block, :140-155) carry orbit GEOMETRY, no per-satellite color.

The uniform plumbing (VERIFIED via `uniformBridgeWGPU.ts`):
- WGSL `Uniforms` struct: `satPos : array<vec4<f32>, 4>` at off 288 `(pos.x, pos.y, radius, opacity)` (:30); `s5: (uSssPower, uCoreGlow, uHueRange, uSatShift)` off 80 (:20); `ints: (uStopCount, uSatCount, uTrailCount, _pad)` off 208 (:28). `packBlobWGPUUniforms` writes satellites at `OFF.satPos + i*4` (:262-265).
- WebGL2 `uploadBlobUniforms.ts`: `gl.uniform3f(U.uBaseColor, …)` (:93) + `gl.uniform2f(U.uPointer, …)`; satellites via the cached uniform-location set.
- The color SOURCE is the `/color` leaf: `useMetaballRenderer.ts:6,74-75` resolves `cssToOklch → oklchToGammaRgb` (ONE shared color core, J-inv-10, no parallel math). The leaf exports `deriveHue(anchorHue, harmony, hueSpread, t)` + `gamutMapStop` + `oklchToGammaRgb` (`composables/color/index.ts:191,223,103` — VERIFIED).

The decision: FOLD-LEDGER `ba-vjs5-satellite-color-4x` + `ay-blob-per-satellite-derived-shade` "GL fence NOT widened (arm B)" with the CONDITIONAL trigger "if a viz wave re-touches the metaball shader anyway, widen the fence + discharge the value.js block; else HOLD." **The trigger FIRES — the SOLE independent metaball-shader re-touch is BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1** (the unconditional squircle dome-Z at `metaball.wgsl.ts:222`/`metaball.frag.ts:180`, decided-BUILD on its OWN merits, a one-line pure-curve change that depends on no sibling). The sanction is DIRECTED: this wave's GL-color-seam widen rides SQUIRCLE arm 1's re-touch; SQUIRCLE does NOT depend on this wave (it re-touches regardless). **NOT BD.W-AURORA-WGSL-STROKES** — STROKES touches the *aurora* shader (`aurora-mediums.wgsl.ts`), NOT the metaball shader, so it cannot sanction a metaball-shader widen; it is dropped from the sanction chain (the loose-citation fix). PROCEDURAL-SUITE.md (the "per-satellite derived-shade blob color … booked to a 4.x point release; the GL color-seam fence is NOT widened" successor) — discharged here.

## (3) The build

Each satellite carries an OKLCh-DERIVED shade off the body anchor hue (analogous/derived, distinct-but-related), threaded through a new per-satellite color lane in BOTH backends:

1. **Derive the per-satellite shade (CPU, value.js).** In the satellite-color resolution (a new `useBlobSatellites` color step or in `useMetaballRenderer`'s color resolve), for each satellite `i` derive an OKLCh stop off the body's anchor hue via the `/color` leaf: `deriveHue(bodyHue, "analogous", hueSpread, satFraction(i))` → a per-satellite hue, the L/C re-stamped off the body stop (a SHADE — a small L/C step, not a new color), then `gamutMapStop → oklchToGammaRgb` → a GAMMA-sRGB triple per satellite. The math source stays value.js (`proof:single-color-core` GREEN — no re-implemented OKLCh).
2. **Widen the satellite uniform lane.** Add a per-satellite color uniform:
   - **WGSL**: extend the satellite struct from `vec4 (pos.x, pos.y, radius, opacity)` to ALSO carry color — either a parallel `satColor : array<vec4<f32>, 4>` lane (rgb + pad) appended to the `Uniforms` struct (the typed-struct EXTEND, never a re-fork — `uniformBridgeWGPU.ts` is the SoT) at a new offset, written by `packBlobWGPUUniforms` in LOCKSTEP. Update `BLOB_WGPU_UNIFORM_BYTES`.
   - **WebGL2**: add `uSatColor[4]` to the uniform-location set + `gl.uniform3f` writes in `uploadBlobUniforms.ts`, mirroring the WGSL offsets EXACTLY (the byte-identical twin discipline the bridge enforces).
3. **Read the per-satellite shade in the shaders.** In the satellite-color resolve (the field-color step where `uBaseColor` is read for satellites), each satellite's painted color is its `uSatColor[i]` shade instead of the flat body color. The smin field still MERGES the colors (the `sminG` color-mix gives the smooth blend between body + shade at the bridge — the relationship reads). When a satellite is fully MERGED into the body the shade blends toward the body (the field mix handles it). Single-stop falls back to the existing `uBaseColor` path (no shade when there's nothing to derive from).

Fences honored: **GL-fence widen SANCTIONED** (BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1 re-touches the metaball shader on its own merits; the directed conditional trigger fired — §3a) — BOTH `.frag` and `.wgsl` change in LOCKSTEP (this is the explicit arm-B widen, not a silent edit). The value.js math source is REUSED (`proof:single-color-core` stays green). Warm-cream identity held (the shades are DERIVED off the body warm-cream stop, an analogous step — never a cool library default; presets-in-consumers: a consumer's color prop drives the body, the shades derive off it). The typed-struct parity is the binding fence (a one-sided lane add blows the ΔE).

## (3a) Cross-gate coordination (the directed sanction + the M3 cross-check + the ONE re-touch + the canon-reconcile owner)

**(A) The directed sanction (non-circular).** This wave's GL-color-seam widen is sanctioned by **BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1** — the SOLE independent metaball-shader re-touch in the band-3 pair (decided-BUILD on its own merits, depends on no sibling). The dependency is DIRECTED: SAT-SHADE → SQUIRCLE arm 1 (SAT-SHADE rides SQUIRCLE's re-touch); SQUIRCLE does NOT cite SAT-SHADE as its anchor. BD.W-AURORA-WGSL-STROKES touches the aurora shader, NOT metaball — it is NOT a sanction for this wave.

**(B) The `proof:gooblob-meatball` M3 cross-check (the typed-struct lockstep).** This wave appends a per-satellite color lane and extends `BLOB_WGPU_UNIFORM_BYTES` (`uniformBridgeWGPU.ts:46`, currently `352 + TRAIL_N * 16 = 592`). `proof:gooblob-meatball` M3 (`clauseShadowAndHoist`, `scripts/proof-gooblob-meatball.mjs:227-241`) asserts the typed-struct SoT lockstep on the EXISTING shadow lanes (`res.z`/`res.w` reads + the `f32[OFF.res + 2]`/`f32[OFF.res + 3]` packer writes), by regex on the named lanes — it does NOT byte-assert `BLOB_WGPU_UNIFORM_BYTES` directly, so an ADDITIVE satColor lane appended at a NEW offset does not red M3's existing-lane asserts. The wave MUST cross-check: after the `BLOB_WGPU_UNIFORM_BYTES` extend, `proof:gooblob-meatball` M3 stays GREEN (the shadow lanes' offsets are unmoved — append the satColor lane at the END, never re-pack the existing struct). `proof:goo-sat-shade` G3 owns the NEW lane's own packer-parity assert (the SoT discipline for the added lane); M3 owns the pre-existing lanes — the two are disjoint, no collision, but the wave asserts M3-stays-GREEN as a coordination fact.

**(C) The ONE metaball re-touch (shared with SQUIRCLE).** The satColor lane add lands on the SAME `.frag`+`.wgsl`+`uniformBridgeWGPU.ts`(packer)+`uploadBlobUniforms.ts` lockstep change SQUIRCLE arm 1's dome-Z rides — ONE coordinated metaball re-touch carries the curve-change leg (SQUIRCLE) AND the lane-add leg (this wave), not two separate shader edits (§3a-D in SQUIRCLE). The goo-blob parity row is re-recorded ONCE, after both legs land.

**(D) The metaball.frag byte-untouched canon reconcile is OWNED BY SQUIRCLE §7 (not re-asserted here).** This wave's `uSatColor[i]` read edits `metaball.frag.ts` (the lockstep `.frag` arm of the satColor lane), which — like SQUIRCLE arm 1's dome-Z `.frag` edit — makes the `CLAUDE.md:745` "metaball.frag.ts stays the byte-untouched WebGL2 fallback" / `proof-perf-producer.mjs:256` "the GL fence is absolute" canon FALSE. Because both legs ride the ONE re-touch SQUIRCLE anchors, the canon reconcile is owned by **SQUIRCLE §7** (the single-home: the sole-independent re-touch wave owns the seam-widen + the doc reconcile). This wave does NOT re-assert the absolute "metaball.frag byte-untouched" canon anywhere (its only `byte-untouched` claim is the orbit-geometry constants, genuinely untouched — §6); it CONSUMES the LOCKSTEP-conditional canon SQUIRCLE §7 lands. A future reader of SAT-SHADE finds the canon reconcile at SQUIRCLE §7, never a gap.

## (4) The gate — born-RED → GREEN

**`proof:goo-sat-shade` (new):**
- **G1 uSatColor present in BOTH backends** — `metaball.wgsl.ts` carries the per-satellite color lane AND `metaball.frag.ts` reads `uSatColor[i]`; born-RED on HEAD (grep = 0 both).
- **G2 value.js OKLCh source** — the per-satellite shade is derived via the `/color` leaf (`deriveHue`/`gamutMapStop`/`oklchToGammaRgb`), NOT a re-implemented OKLCh; `proof:single-color-core` stays GREEN (a re-forked OKLCh body reds it).
- **G3 typed-struct packer parity** — `packBlobWGPUUniforms` writes the satellite color lane AND `uploadBlobUniforms.ts` writes `uSatColor[i]`; the WGSL struct offset matches `BLOB_WGPU_UNIFORM_BYTES`; a one-sided add (WGSL lane with no packer write, or `.frag` uniform with no upload) reds.
- **G4 derived-not-flat** — the satellite shade DIFFERS from `uBaseColor` (a derived analogous step), and falls back to `uBaseColor` on single-stop.
- **G5 the M3 cross-check (the lane-add does not disturb the shadow lanes)** — after the `BLOB_WGPU_UNIFORM_BYTES` extend, `proof:gooblob-meatball` M3 stays GREEN (the satColor lane is APPENDED at a new end offset; the `res.z`/`res.w` shadow-lane offsets + their packer writes are UNMOVED — §3a-B). A re-packed struct that shifts the shadow lanes reds M3.
- **Self-test bite** — a synthetic WGSL satColor lane with no `packBlobWGPUUniforms` write reds G3; a synthetic re-forked OKLCh in the shade derive reds G2; a synthetic struct that re-packs the satColor lane BEFORE the shadow lanes (shifting `res.z`/`res.w`) MUST red `proof:gooblob-meatball` M3 (the G5 cross-gate bite).

Born-RED on HEAD: G1 fails (no uSatColor). GREEN at the build.

## (5) Paint verification

The CHROMA-keyed satellite shades read DISTINCTLY-but-RELATED-to the body hue across an orbit sweep (a satellite is a derived shade of the body color, not a flat clone, not an unrelated disc), both modes × desktop. The cross-backend ΔE parity (the per-satellite shade must match across WGSL/WebGL2 — the typed-struct lane is the drift-prone seam) verified via **BD.W-VIZ-PARITY-METAL's** machinery on real GPU. `proof:ba-gestalt` goo verdict on the fresh sat-shade capture.

**Sequencing:** runs AFTER BD.W-VIZ-PARITY-METAL (the live-capture harness re-records the HEAD metaball baseline first) AND coordinated with BD.W-GOOBLOB-SQUIRCLE-REFRACT (both legs ride ONE metaball re-touch — SQUIRCLE arm 1 is the sanction anchor, this wave appends the satColor lane; the goo-blob parity row is re-recorded ONCE after both land — §3a-C).

## (6) Fences + risks

- **GL-fence widen is SANCTIONED, not silent (the directed anchor)** — the conditional arm-B trigger fired because **BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1** (the sole independent metaball-shader re-touch) re-touches the shader on its own merits; the dependency is DIRECTED (this wave → SQUIRCLE arm 1), NOT the circular "each wave cites the other." STROKES touches aurora, not metaball — not a sanction here. BOTH backends change in LOCKSTEP. This is the explicit discharge of the 5-tranche-carried book, NOT a 5th re-stamp.
- **Typed-struct parity is the cardinal risk** — a one-sided satellite-color lane add (WGSL struct without the packer write, or `.frag` uniform without the upload) blows the parity ΔE; `proof:goo-sat-shade` G3 + the cross-backend capture catch it. The lane is APPENDED at a new end offset so `proof:gooblob-meatball` M3's shadow lanes are undisturbed (G5 + §3a-B).
- **value.js math source** — the shade derive uses the `/color` leaf; `proof:single-color-core` stays green (no parallel OKLCh).
- **Warm-cream identity** — the shades are analogous DERIVED steps off the warm-cream body stop, never a cool default; presets-in-consumers (the body color is the consumer's prop).
- **The orbit envelope is untouched** — BA.W-GOO-REDRESS's smin-band/orbit-random geometry (`constants.ts:144`) is byte-untouched; this wave adds COLOR, not geometry. `proof:goo-redress` stays GREEN.
- **`uHueRange`/`uSatShift` noise perturb untouched** — the existing per-pixel color-noise field is orthogonal (a whole-creature perturb); the new per-satellite shade is the DERIVED anchor each satellite paints, the noise perturbs ON it.
