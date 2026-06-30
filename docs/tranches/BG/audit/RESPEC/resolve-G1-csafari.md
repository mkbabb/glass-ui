# RESOLVE — G1 C-SAFARI in-situ refraction (CORRECTED APPROACH SPEC)

**Gap:** G1 (P-CSAFARI) — the dominant cut-risk, the ★★★ 3-tranche chronic. **Mode:** spec (de-risk now; the binding Metal proof is a build-phase WS8 deliverable).
**Date:** 2026-06-30 · **HEAD:** `6369ad6e` · **branch:** tranche/BG · **Fence:** wrote ONLY here; `verify-siblings-intact --quiet` exit 0 before+after.
**Inputs:** `crit-P-CSAFARI-pass1.md` (the decisive refutation) · `glass-field-shaders.json` (the ship shader, the source-of-truth) · `bg-build-map.md` WS8 §1–5 + WS7 safari-parity · `scripts/aurora-wgpu-parity-capture.mjs` + `scripts/proof-safari-webgl.mjs` (the device-free-proxy + gate precedents) · `demo/main.ts` (the C18 `?capture=` harness, ALREADY shipped).

**convergencePct: 76** · **buildPhaseDeferred: TRUE** (the calibrated ε over the WS1 field, the WebKit compile-time, and the on-device dual-engine capture genuinely need the real build/Metal; the APPROACH, the gate shape, the operator, the consumers, and the π are de-risked and ready to develop into a final wave).

---

## 0. The one-line correction

The spike measured the fence on an **invented `uDispersion` UV-fraction**; the ship shader splits R/B by an **absolute `uChromatic` rim-offset** (`ca = inward·rim·uChromatic·0.0045`). The corrected approach re-points the entire C-SAFARI proof — fence + gate + token + π — onto **`uChromatic`**, renders the **FULL** ship pass (drapery + `uMetalStrength` + the K12 plate VALVE), **folds C12 dark-AA-over-bright-ridge INTO the same valve** (not orthogonal), re-watchdogs the FULL shader against the WebKit ~2s ceiling, and **calibrates the fence over the WS1 aurora+drapery field**, not the synthetic band-grid. Land as a committed C17 device-free structural proxy; the C16/C18 Safari.app on-device capture is the named build-owed residual.

This is NOT a new wave. It is a CORRECTION + HARDENING of two existing WS8 waves (`BG.W-GLASS-REFRACT-WEBGL` §2 and the keystone `BG.W-GLASS-BACKDROP-SAMPLE` §3) plus ONE new device-free gate they mint born-RED.

---

## 1. The fence operator — re-pointed onto `uChromatic` (the decisive correction)

### 1a. The ship operator (verbatim from `glass-field-shaders.json`, the artifact)

```glsl
float rim = 1.0 - smoothstep(0.0, 0.16, edge);        // 1 at the extreme rim → 0 by edge≥0.16
vec2  ca  = inward * rim * uChromatic * 0.0045;        // ABSOLUTE offset, scaled ONLY by uChromatic
lensed.r = texture(uField, uv + disp + ca).r;
lensed.g = texture(uField, uv + disp     ).g;
lensed.b = texture(uField, uv + disp - ca).b;
```

`ca` is an **absolute** rim-concentrated UV offset of magnitude `uChromatic·0.0045` — independent of the displacement `disp = inward·rimW·uRefractionStrength·0.045`. The binding K2 knob is **`uChromatic`** ("thin-rim R/B fringe strength"), full stop. The spike's `dispR = off·(1±uDispersion)·rim` is a multiplicative FRACTION of `disp` on a uniform the ship shader cannot express; the swept `0.025` and the proposed `dispΔC p99 ≤ 0.005` clause are on the WRONG variable and must be deleted.

### 1b. The token + the calibration mapping (derived, stated, re-swept at build)

The live retune token `--glass-edge-dispersion` maps **directly to `uChromatic`** (no derived fraction). The K2 "dispersion 0.02–0.03" visual range is a `|ca|/|disp|` RATIO; its `uChromatic` equivalent is derived (and numerically confirmed in this spec's spike):

```
|ca|peak / |disp|peak = (uChromatic·0.0045) / (uRefractionStrength·0.045) = 0.1·uChromatic / uRefractionStrength
⇒ uChromatic = 10 · uRefractionStrength · (target ratio)
@ uRefractionStrength = 1:  ratio 0.02 → uChromatic 0.20 ;  0.025 → 0.25 ;  0.03 → 0.30
```

So the ship default lands `uChromatic ≈ 0.25` (the K2-centre, `uRefractionStrength` 1). **CRITICAL — this mapping is valid ONLY at `uRefractionStrength = 1`**: `ca` is absolute, `disp` scales with `uRefractionStrength`, so the ratio drifts under press-driven refraction. That is exactly why the fence must be **swept directly on `uChromatic`** at the lived `uRefractionStrength` range, NOT ported as a ratio. The build-phase calibration sweep pins the default `uChromatic` and ε; this spec pins the OPERATOR and the SHAPE.

### 1c. The fence metric (the right SHAPE, re-pointed)

The spike's DIFFERENTIAL-vs-baseline metric is the correct shape and survives — re-pointed onto `uChromatic`. The fence is the **added OKLab chroma** the R/B split injects, isolated by differencing the FULL-pass render at `uChromatic = default` against `uChromatic = 0` (the baseline cancels the field's own chroma AND the drapery's warm-hue contribution, leaving only the dispersion):

```
dispΔC(px) = | C_oklab( render[uChromatic=default](px) ) − C_oklab( render[uChromatic=0](px) ) |
FENCE:  dispΔC_p99  ≤  ε        (ε pinned at build = measured_p99 × 1.5 headroom; expected ε ≈ 0.012–0.02)
```

Measured over the **panel region** (the lensed glass rect), on the **WS1 field**, K2 "refraction = DEPTH not hue" binding: a `uChromatic` bump that rainbows the rim REDs.

---

## 2. The FULL pass renders — drapery + uMetalStrength + the K12 valve (not the cheap squircle)

The spike rendered only `lensed = mix(lensed, soft, 0.35)` and stopped. The fence + perf numbers do not bind until the FULL source-of-truth pass runs every frame:

1. **The anisotropic-specular metal drapery** — `potentialFBM(fp)` + `curlFBM(fp)` (the SECOND fbm-curl evaluation, the 5×-ALU the cheap shader skipped) + the triangular fold coord + `pow(shade,3.5)` ridge + fold-normal light-align + low-freq run noise + the warm LUMINANCE ramp.
2. **The `uMetalStrength` composite** — `structured = mix(lensed, metal, uMetalStrength)`.
3. **The K12 plate VALVE** — `valve = smoothstep(uValveKnee, 1.0, structLuma); plateA = mix(plateA, max(plateA, uPlateAlphaMax), valve); outc = mix(structured, uPlateColor, plateA)`.

The fence (§1c) re-runs over THIS output, so the **drapery×dispersion interaction at the rim** is measured (the baseline carries the drapery too, so the differential isolates the dispersion's marginal chroma over the real warm ridge — the un-measured term the cheap fixture could not produce).

---

## 3. C12 dark-AA-over-bright-ridge — FOLDED IN via the SAME valve (NOT orthogonal)

The single likeliest 4th-time miss: a surface that refracts beautifully but drops content below 4.5:1 over its OWN bright drapery fold. The critique is correct — this is resolved by the SAME `uValveKnee`/`uPlateAlphaMax` valve in the SAME fragment shader, gated by the SAME `structLuma`. It is unexercisable on a fixture with no drapery. The corrected proof renders a content-bearing surface over a bright ridge and measures through the valve:

```
F2 (dark-AA fold):
  over the WS1 field + FULL glass pass, find the panel pixels where structLuma > uValveKnee (the bright-ridge cores);
  the valve firms plateA → uPlateAlphaMax there → outc lifts toward uPlateColor;
  assert contrast( content-ink-register , composite-luma-behind-text ) ≥ 4.5:1
    for BOTH the lifted-to-full --foreground ink (the W55 muted→full-ink lift) AND the worst-case,
    in BOTH modes;
  and assert the DIM valley (structLuma < knee) STAYS translucent (the metal still reads — the valve
    must not firm everywhere, or the glass dies to an opaque plate).
```

This is the keystone wave's `BG.W-GLASS-BACKDROP-SAMPLE` "live AA-over-bright-ridge ratify (FALLS to opaque plate where dark can't clear 4.5)" π made device-free-checkable via the same structural-proxy raster the chroma fence uses (ONE render, two assertions).

---

## 4. The watchdog — re-run on the FULL shader vs the WebKit ~2s ceiling

Two costs, two arms:

- **Per-frame ALU (device-free PROXY, in the gate).** The cheap-shader p50 2.8ms does not bound the ship cost. A static op-budget proxy in the gate counts the FULL shader's evaluator load — the fbm/curlFBM count (`potentialFBM` once + `curlFBM` = 2 more `potentialFBM` = 3 fbm-of-5-octaves), the `vnoise` tail (run + caustic), the texture-tap count (3 split + 9 box = 12) — and asserts each ≤ a named ceiling (the bound the shipped shader sets, a synthetic over-budget shader REDs). This is a cheap floor; it does NOT replace the device measure.
- **Shader-COMPILE time (the binding ~2s ceiling — ON-DEVICE, build-owed).** The FULL shader is ~3× the cheap shader's source length; the WebKit ceiling is on COMPILE, not steady-state. The binding measure is the on-device WebKit capture (§6): the harness records `gl.getShaderParameter`/wall-clock compile time for the full program at 2880×1800 / N≤8 panels and asserts it clears the ~2s ceiling with margin, plus 30s sustained-load with NO `webglcontextlost` (folds into the keystone's existing "ONE GL context per refracting route" π and the BC.W-SAFARI-WEBGL circuit-breaker).

---

## 5. The locking gate — `proof:glass-refract-fence` (NEW, device-free, born-RED)

The new device-free gate mints in `BG.W-GLASS-REFRACT-WEBGL` (WS8 §2). It is the EXACT transposition of the `aurora-wgpu-parity-capture.mjs` structural-proxy + `proof-safari-webgl.mjs` pure-detector precedents — the deterministic-field-at-t=0 CPU-transcribe → render → per-pixel Δ methodology, re-pointed from "WGSL↔GLSL parity" to "dispersion-on vs dispersion-off chroma + valve-AA."

**Producer — `scripts/glass-refract-fence-capture.mjs`** (mirrors `aurora-wgpu-parity-capture.mjs`):
- CPU-transcribes the FULL ship fragment shader from the live `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (the WS8 §2 port of `glass-field-shaders.json`). The structural shader body is identical TS applied to both renders, so it contributes 0 to the differential by construction (the §0-G4 parity-script discipline).
- FBO first pass = the **WS1 shell-aurora field** at t=0 (the `DEFAULT_AURORA_CONFIG`/the live WS1 config, deterministic — the drift terms vanish at t=0; calibrated over the REAL field per §1c, not the band-grid).
- Renders the panel-rect glass second pass twice: `uChromatic = default` and `uChromatic = 0`, FULL pass.
- Emits the on-disk capture PAIR + the metrics JSON to `docs/tranches/BG/audit/visual/glass-refract-fence/` — **this IS the committed C17 artifact** (the on-disk-resolves anti-evasion floor: a PASS with a missing capture is forbidden, the `proof:ba-gestalt`/`gpu-substrate-single` precedent).

**Gate — `scripts/proof-glass-refract-fence.mjs`** (`["local","ci"]`; pure detector + self-test bites, the `proof-safari-webgl.mjs` shape):
- **F1 — chroma fence.** `dispΔC_p99 ≤ ε` over the panel region (§1c).
- **F2 — dark-AA fold.** The valve fires where `structLuma > uValveKnee`; the firmed composite clears 4.5:1 for the lifted-to-full ink, both modes; the dim valley stays translucent (§3).
- **F3 — operator-is-`uChromatic`.** Source-scan `glass-refract.glsl.ts`: the split is `ca = inward·rim·uChromatic·…` and the `--glass-edge-dispersion` token threads `uChromatic` — NOT a `(1±uDispersion)` fraction. The anti-regression: a re-roll onto a UV-fraction REDs (the C-3 trap-one-level-up bite).
- **F4 — op-budget proxy.** The static fbm/vnoise/texture-tap ceilings (§4).
- **F5 — on-disk-resolves.** Every declared capture path RESOLVES (the missing-capture lie forbidden).
- **+ a self-test bite per clause** (the false-witness discipline): a `uChromatic`-rainbowed fixture REDs F1; an un-valved bright-ridge fixture REDs F2; a `uDispersion`-fraction operator REDs F3; an over-budget shader REDs F4; a deleted capture REDs F5.

---

## 6. The on-device residual — the C16/C18 Safari.app leg (build-owed, the actual chronic)

The structural proxy (C17) de-risks the leg that was LEAST at risk (the Tier-1 WebGL2 GPU-physics floor, already treated-proven). The leg that missed 3× is the **real Metal-Safari.app capture**. It is NAMED here as the build-owed residual, discharged at the close (not by the gate):

- **C16 — Safari.app `navigator.gpu` / WGSL Tier-2.** The `glassShader.wgsl` Tier-2 FBO-first-pass path (the prior `glassShader-tier2.wgsl` took `background_texture` as an INPUT uniform, never exercised the FBO first pass). Safari 26+/AS-Tahoe only; the universal floor is the Tier-1 WebGL2 `glass-refract.glsl.ts`. The WGSL-shape gate (1 `sampleBG` wrapper / 5 sites / 0 implicit / `array<vec4f,8>` + synthetic-reintro self-test) is WS8 §2's M6 gate.
- **C18 — the capture harness (ALREADY shipped at `demo/main.ts`).** `?capture=glass-suffuse&mode=<light|dark>` boots the settled-frame harness with the in-pixel engine badge. The binding leg: a **non-authoring agent** on the M5 Max captures the refracting route on **real Safari.app/WebKit 26 AND Chrome.app**, both modes, embeds the per-region pixel digest in `SHIP-ATTESTATION.json`, re-verified device-free at CI. The verdict feeds `proof:safari-parity` (WS7, the live arm) + the `proof:ba-gestalt` glass/CTA row.
- **Why deferred is honest.** The audit machine has no Metal device + no Safari.app `navigator.gpu`; the on-device compile-time and the per-pixel Metal-rasterizer drift CANNOT be cheaply proven now. The approach, the operator, the fence shape, the gate, the consumers, and the device-free proxy ARE proven now — `buildPhaseDeferred = TRUE`.

---

## 7. ≥2 consumers (the visual-load-bearing bar)

- **The refraction PRIMITIVE** (`glass-refract.glsl.ts` / the `sampleBG` wrapper): ≥2 by construction — the WS8 wave wraps it at **5 refracting sites** (`bg-build-map.md` WS8 §2: "ONE `sampleBG` wrapper @5 sites"). Named ≥2: the hero glass CTA + the dock plate + the `.glass-deep`/`--glass-depth` Card tier (the deep refractive register WS8 reads; `glass-deep` SURVIVES the WS3 3.6 blur-peer collapse — verified §D of RESPEC).
- **The FENCE gate's evidence set** (mirrors `proof:gpu-substrate-single`'s device-free-proxy + W-REFLECT3-live dual): arm A = the device-free structural-proxy C17 capture pair (the deterministic-field ΔC + valve-AA); arm B = the on-device C18 Metal/WebKit capture (§6). Two arms, one prove device-free + one prove on-device — the cardinal-lesson split.

---

## 8. The verifying π

- **Device-free (lands with the wave, `ci`):** `proof:glass-refract-fence` GREEN (F1–F5 + self-test bites) + the committed C17 capture pair on disk.
- **Live (LOCAL-only, webkit-testMatch, rides W-REFLECT3):** `tests-visual/glass-refract.spec.ts` — the fixture-field π on real WebKit-2287: `rimDelta > 0` (the lens displaces) + `chromaticRim > 0` (the `uChromatic` split paints) + the FULL-pass AA-over-bright-ridge ratify + the METAL-FLOW gestalt vs the `liquid-metal-…01.jpg` reference; both modes.
- **Close oracle:** the `proof:ba-gestalt` glass/CTA verdict (born-RED on the 4.2.0 Metal reproduction) + the C18 non-authoring-agent dual-engine capture in `SHIP-ATTESTATION.json` + `proof:safari-parity` (WS7).

---

## 9. The exact WS8 wave(s) that prove it during build (the deliverable)

No new wave. The corrected approach lands as amendments to the existing WS8 plan, in build order:

| Wave (existing) | Amendment this resolution adds |
|---|---|
| **`BG.W-GLASS-REFRACT-WEBGL`** (WS8 §2, build-INDEPENDENT, lands NOW) | Port `glass-field-shaders.json` → `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` with the `ca = inward·rim·uChromatic·0.0045` operator + `--glass-edge-dispersion`→`uChromatic` token (NOT a `uDispersion` fraction). **MINT `proof:glass-refract-fence` born-RED** (the §5 gate) + `scripts/glass-refract-fence-capture.mjs` (the §5 producer, commits the C17 pair). F3/F4 are checkable now (source + op-budget); F1/F2 calibrate over the field once the keystone wires it. |
| **`BG.W-GLASS-BACKDROP-SAMPLE`** (WS8 §3, THE KEYSTONE, WS1-shell-aurora gated) | Wire the FBO two-pass + the FULL pass (drapery + `uMetalStrength` + the K12 ridge-local plate-alpha valve) into WS1's ONE shell-aurora context. **The C12 dark-AA fold (§3) is THIS valve** — the "live AA-over-bright-ridge ratify (FALLS to opaque plate)" π is F2 of the new gate. Calibrate the default `uChromatic` + pin ε over the real WS1 field; re-watchdog the FULL shader (§4) at 2880×1800/N≤8 + 30s sustained. |
| **`BG.W-GLASS-SOTA-LADDER`** (WS8 §4) | The Tier-0 CSS → Tier-1 WebGL2 → Tier-2 WGSL degrade formalize; the M6 WGSL-shape gate is the C16 leg's structural floor. |
| **WS7 `BG.W-SAFARI-PARITY-GATE`** + **the close** | `proof:safari-parity` (the live arm) + the C18 non-authoring-agent Metal/WebKit capture discharge the ★★★ residual (§6). NON-SKIPPABLE close precondition. |

**Build-phase sequencing fence (HOLD):** the cut MUST NOT precede the keystone's calibration + the C18 on-device capture + W-REFLECT3. The dual-stack (WebGL2 Tier-1 universal floor + WGSL Tier-2) is binding — CSS-SVG `feDisplacementMap` is dead on Safari/Firefox 2026.

---

## 10. What still owes the build (the honest residual behind the 76%)

| Owed | Why it can't be cheaply proven now | Discharged by |
|---|---|---|
| The pinned default `uChromatic` + ε | Field-content-dependent; must sweep over the LIVE WS1 aurora+drapery, which doesn't exist on disk at HEAD | Keystone calibration (WS8 §3) |
| The WebKit shader-COMPILE time vs ~2s | No Safari.app / Metal on the audit machine; the FULL shader is ~3× the cheap one | C18 on-device capture |
| The per-pixel Metal-rasterizer drift | Real GPU only | C18 / W-REFLECT3 |
| The WGSL Tier-2 FBO-first-pass on Safari.app `navigator.gpu` | The leg that missed 3×; Safari 26+ device only | C16 + the M6 WGSL-shape gate + C18 |

The 76%: the operator is CORRECTED, the fence shape + gate + producer + token mapping + C12 fold + op-budget proxy + ≥2 consumers + the π set are all CONCRETE and develop-ready; the residual is exactly the set that requires the real build/Metal — which `buildPhaseDeferred = TRUE` records honestly. The +26 over the prior G1 ~50 is the operator re-point (the dominant refutation closed), the C12-into-the-valve fold (the likeliest-miss now in the gate, not beside it), and the structural-proxy gate transposed from a proven precedent.
