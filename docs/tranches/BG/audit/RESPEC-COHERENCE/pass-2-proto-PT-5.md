# PT-5 · [spec] — C-SAFARI `uChromatic` dual-stack reconcile (CORRECTED APPROACH)

**Coherence issue:** §2.T2 (HIGH) + §2.M4 (MEDIUM). **Mode:** spec (corrected approach; the binding on-device Metal/WebKit parity capture stays a build-owed WS8/WS7 deliverable — the prior G1's `buildPhaseDeferred` split is preserved, this spec adds only the NAME + MAGNITUDE + TYPE reconciles, which are decidable NOW with zero Metal).
**Date:** 2026-06-30 · **HEAD:** `tranche/BG` @ `6c1f5386` (pass-1 baseline) · **Fence:** wrote ONLY under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; `verify-siblings-intact --quiet` exit 0 before. READ-MOSTLY; zero src/demo/scripts edits.
**Inputs (read on disk this pass, not trusted from prose):** the SHIPPED Tier-2 WGSL `src/composables/glass/webgpu/glassShader.wgsl` · the converge-prototype Tier-1 GLSL `docs/tranches/BG/audit/glass-field-shaders.json` · the audit Tier-2 rewrite `docs/tranches/BG/audit/glassShader-tier2.wgsl` · `src/styles/tokens/glass-fx.css:303-307` + `src/styles/glass/surfaces.css:408-419` (`--glass-edge-dispersion`) · `src/composables/glass/useGlassRenderer.ts:147-204` (the SVG/CSS filter path) · the prior `docs/tranches/BG/audit/RESPEC/resolve-G1-csafari.md` (the pass it corrects) · `bg-build-map.md` WS8 §1–5 + WS7 §Band3 · `scripts/proof-safari-webgl.mjs`.

> **NOTE:** the prior file at this path covered the dead-knob/substitution discipline (§2.T1) — that is PT-4's territory (`crit-PT-4-pass1.md`/`pass-1-proto-PT-4.md`). The authoritative PT-5 row in `pass-1-spec.md` §4 is **"C-SAFARI `uChromatic` dual-stack reconcile" → §2.T2, §2.M4**. This file is rewritten to that mandate.

**convergencePct: 80** · **feasible: TRUE** (the fix holds — every leg is a decidable name/scale/type reconcile + a dual-arm source-scan; the only residual is the same build-phase value-calibration the prior G1 already deferred honestly).

---

## 0. The one-line correction

The prior G1 re-pointed the whole C-SAFARI proof onto `uChromatic` — a name present **only** in the converge-prototype `glass-field-shaders.json` — and never examined the genuinely-shipped uniform. The actual on-disk truth is a **three-way drift across two stacks**: the SHIPPED Tier-2 WGSL pilot splits R/B by `u.chromatic_aberration · 0.003`, the planned Tier-1 GLSL by `uChromatic · 0.0045`, and a stray audit Tier-2 rewrite by `chromatic_aberration · 0.004` — a **name split** (`uChromatic` vs `chromatic_aberration`) AND a **~1.5× magnitude split** (0.003 vs 0.0045). The fence's F3 clause scans only the Tier-1 GLSL, so the WGSL stack is **unreconciled and unfenced** on the ★★★ chronic. Separately (§2.M4), the wave spec asserts `--glass-edge-dispersion` "maps DIRECTLY to `uChromatic`" — a **type collision**: `--glass-edge-dispersion` is a CSS `box-shadow` value (two directional inset fringe rings), not a number; it cannot be assigned to a `float` uniform.

The correction: (1) define ONE canonical chromatic-dispersion **concept** with a documented per-language spelling map (you cannot byte-equalize a GLSL `u`-prefix identifier and a WGSL struct field); (2) pin ONE canonical **scale literal** (`0.0045`, the Tier-1 GLSL source-of-truth) shared across both stacks as a NAMED constant, re-pointing the WGSL `0.003`; (3) supersede the consumer-less, structurally-stale shipped pilot via WS8 §4 (clean break, no alias); (4) mint a scalar `--glass-chromatic-strength <number>` token that threads the uniform and keep `--glass-edge-dispersion` as the Tier-0 CSS box-shadow analogue (a SEPARATE type in the degrade ladder); (5) widen the F3 fence to a **dual-stack, per-language-spelling, shared-scale literal-equality** arm with per-stack synthetic-reintro bites.

This is NOT a new wave. It is a CORRECTION to two existing WS8 waves (`BG.W-GLASS-REFRACT-WEBGL` §2, `BG.W-GLASS-SOTA-LADDER` §4) + the keystone (`BG.W-GLASS-BACKDROP-SAMPLE` §3) + the F3 clause of the born-RED gate they mint.

---

## 1. The ACTUAL shipped uniform — examined (the artifact matrix)

Three artifacts carry a chromatic-dispersion uniform. Verified verbatim on disk @ `6c1f5386`:

| Artifact | Status | Uniform declaration | The R/B split operator | Scale literal | Struct/panel shape |
|---|---|---|---|---|---|
| `src/composables/glass/webgpu/glassShader.wgsl` | **SHIPPED** in `src/` (consumer-less pilot — `grep` finds 0 importers in src/demo; CLAUDE.md "the consumer-less glassShader.wgsl pilot is the WGSL seed") | `:13` `chromatic_aberration: f32` (WGSL struct field) | `:130-132` `if (u.chromatic_aberration > 0.0) { … aberration_dir = normalize(from_center) · edge_strength · u.chromatic_aberration · 0.003 }` | **`0.003`** | single `glass_bounds: vec4f`, `background_texture` input (flat `from_center · refraction_strength · 0.02`, no squircle, no drapery) |
| `docs/tranches/BG/audit/glass-field-shaders.json` (`.frag`) | **converge PROTOTYPE** (the planned Tier-1 GLSL ship body; absent from `src/`) | `uniform float uChromatic` (GLSL `u`-prefix) | `ca = inward · rim · uChromatic · 0.0045; lensed.r = texture(uField, uv+disp+ca).r; lensed.b = …-ca).b` | **`0.0045`** | squircle bevel + curlFBM drapery + K12 plate VALVE; the FBO `uField` first-pass |
| `docs/tranches/BG/audit/glassShader-tier2.wgsl` | **stray audit Tier-2 REWRITE (PT-C)** (a third prototype, NOT in `src/`) | `chromatic_aberration: f32` (WGSL) | `ab = dir · edge · (u.chromatic_aberration · 0.004)` | **`0.004`** | `array<vec4f, 8>` panels, squircle profile, `textureSampleLevel` everywhere, `background_texture` input |

**Findings:**
- **F-A (name split).** GLSL spells it `uChromatic`; WGSL spells it `chromatic_aberration`. The prior G1 chose the GLSL name as canonical and never noticed the shipped WGSL already uses a DIFFERENT name. The two CANNOT be the same string — GLSL uses bare `u`-prefix uniforms, WGSL uses `u.<field>` struct access. "Reconcile the name" must mean a **concept + per-language spelling map**, not string-identity.
- **F-B (~1.5× magnitude split).** Same uniform VALUE (say 0.25) renders peak offset `0.001125 UV` on GLSL but `0.00075 UV` on the WGSL pilot — a 1.5× under-fringe on Safari's `navigator.gpu` path. Plus the stray `0.004` rewrite is a third value. This is precisely a dual-stack parity break on the leg C-SAFARI is supposed to certify.
- **F-C (the WGSL stack is unfenced).** `scripts/proof-safari-webgl.mjs` does NOT scan WGSL operators at all (grep: 0 hits for `chromatic`/`wgsl`/`uChromatic`). The NEW `proof:glass-refract-fence` F3 clause (per the prior G1 §5 + build-map :634) source-scans only the Tier-1 GLSL `glass-refract.glsl.ts`. So no gate sees the shipped WGSL `0.003` — it can ship divergent silently. This IS the §2.T2 gap: the wrong-uniform class the RESPEC claimed FIXED, recurring one level up (a non-ship name swapped for another, never reconciled against the actual shipped uniform).
- **F-D (the shipped pilot is structurally stale + an overfit candidate).** `glassShader.wgsl` is NOT the WGSL twin of the planned Tier-1 GLSL — it is an older single-panel `background_texture`-input flat-refraction seed with no consumer and no gate. It is a §2.J capability-without-adoption candidate independent of this reconcile.
- **F-E (wrong path in the wave spec).** `bg-build-map.md:649` *Files* names `src/glassShader.wgsl` — the actual shipped path is `src/composables/glass/webgpu/glassShader.wgsl`. A build agent editing the named path would create a new file at the repo root and miss the real pilot.

---

## 2. Error A — the canonical concept name + per-language spelling map

**Decision: the canonical CONCEPT is "thin-rim chromatic dispersion (R/B edge split)."** It carries ONE documented per-surface spelling, recorded in the wave spec + asserted by the fence (the fence knows the per-stack idiom, never demands string-identity across languages):

| Surface | Canonical spelling | Type |
|---|---|---|
| WebGL2 GLSL (Tier-1, universal Safari floor) | `uChromatic` | `uniform float` |
| WebGPU WGSL (Tier-2, Safari 26+ `navigator.gpu`) | `chromatic_aberration` (struct field; read `u.chromatic_aberration`) | `f32` |
| TS renderer option | `chromaticAberration` | `number` (the existing `useGlassRenderer.ts:152` SVG-path option name, REUSED in `useGlassRefraction.ts` — no third name) |
| CSS scalar retune token (NEW — see §4) | `--glass-chromatic-strength` | `@property <number>` |
| CSS Tier-0 fringe (degrade analogue, KEPT) | `--glass-edge-dispersion` | `box-shadow` (a SEPARATE type — see §4) |

The map is the single source of truth; both shader bodies cite it in a header comment. There is no "rename one to match the other" — the WGSL keeps the WGSL idiom, the GLSL keeps the GLSL idiom, and the fence's two arms each assert their own spelling (§5).

---

## 3. Error B — the canonical scale literal, shared + named

**Decision: the canonical scale constant is `0.0045`** (the Tier-1 GLSL value — the GLSL is both the universal Safari floor AND the `glass-field-shaders.json` source-of-truth artifact, so it is the parity anchor). Express it as a **NAMED constant in each shader**, not a baked literal, so cross-stack equality is auditable and the three-way `0.003`/`0.004`/`0.0045` drift dies at its root:

- GLSL (`glass-refract.glsl.ts`, NEW): `const float CHROMATIC_SCALE = 0.0045; … ca = inward * rim * uChromatic * CHROMATIC_SCALE;`
- WGSL (the Tier-2 twin, see §6): `const CHROMATIC_SCALE: f32 = 0.0045; … aberration_dir = inward * rim * u.chromatic_aberration * CHROMATIC_SCALE;`

Each body carries `// PARITY: CHROMATIC_SCALE is shared across the GLSL/WGSL stack — keep equal (proof:glass-refract-fence F3).`

**Why the scale (not the value) is what this spec pins.** `ca` is an ABSOLUTE rim offset scaled only by `uChromatic`; `disp` scales with `uRefractionStrength` (press-driven), so the `|ca|/|disp|` ratio drifts under press — exactly the prior G1 §1b caveat. The CANONICAL UNIFORM VALUE + ε must be swept over the live WS1 field at the keystone (build-owed, unchanged from the prior G1). This spec pins the SCALE so that a single uniform value renders byte-near-equal peak offsets across both stacks; the keystone then calibrates that one value once for both. **Full pixel parity also depends on the rim/`edge_strength` weighting function matching** (the shipped pilot uses `edge_strength = 1 - smoothstep(0, max_edge_dist*0.15, edge_dist)`; the GLSL uses `rim = 1 - smoothstep(0, 0.16, edge)`); the §6 supersede makes the WGSL twin adopt the GLSL `rim` form verbatim, so the only free term left to calibrate is the shared uniform value — the §10 build residual.

---

## 4. Error C (§2.M4) — the box-shadow → float type collision

**The defect (verbatim).** `bg-build-map.md:625-626` + prior G1 §1b: "`--glass-edge-dispersion` maps DIRECTLY to `uChromatic` (no derived fraction)." On disk `--glass-edge-dispersion` is:

```
/* glass-fx.css:305-307 */
--glass-edge-dispersion:
    inset 0.75px 0 0 0 var(--glass-fringe-warm),
    inset -0.75px 0 0 0 var(--glass-fringe-cool);
/* surfaces.css:417 — consumed AS box-shadow under prefers-reduced-transparency: no-preference */
.glass-chromatic { box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim); }
```

It is a two-ring `box-shadow` value. `gl.uniform1f(loc, "inset 0.75px 0 0 0 oklch(…)")` → `NaN`. A box-shadow cannot thread a float uniform — a category error the spec asserts both as type-class ("a `<box-shadow>` and a `<number>` are not interchangeable") and visually (the CSS fringe is a STATIC directional inset pair; the shader dispersion is a per-pixel rim-weighted UV split — they share a concept, not a value).

**The fix — two siblings in the degrade ladder, never one token across two types:**

1. **Mint `--glass-chromatic-strength: <number>`** as a typed inheriting `@property` (initial-value `0.25` = the K2-centre derived in the prior G1 §1b algebra), registered in `src/styles/tokens/property-regs.css` beside `--glass-level`/`--glass-depth` (the EXACT precedent — a `<number>` knob a host sets on any ancestor to retune every descendant; `inherits: true`). The WS8 renderer (`useGlassRefraction.ts`) reads it via `getComputedStyle(el).getPropertyValue('--glass-chromatic-strength')` → `parseFloat` → `uniform1f` for the GLSL stack / the typed-struct write for the WGSL stack. This is the ONE token that "maps to `uChromatic`/`chromatic_aberration`" — a number to a float, type-correct.
2. **`--glass-edge-dispersion` STAYS the Tier-0 CSS box-shadow fringe**, byte-untouched. It is the no-GPU degrade analogue of the SAME visual concept (Tier-0 CSS ≈ Tier-1/2 GPU dispersion), recorded in the SOTA-LADDER as the bottom rung — NOT retired, NOT re-typed, NOT assigned to a uniform.

The wave-spec sentence "`--glass-edge-dispersion` maps DIRECTLY to `uChromatic`" is **rewritten** (§7) to: "the scalar `--glass-chromatic-strength` (`<number>`) threads the `uChromatic`/`chromatic_aberration` uniform; `--glass-edge-dispersion` is the Tier-0 CSS box-shadow analogue in the degrade ladder — a separate type, never assigned to the float."

---

## 5. The dual-stack F3 fence (the widening)

`proof:glass-refract-fence` F3 (born-RED in `BG.W-GLASS-REFRACT-WEBGL`, build-map :634) is the source-scan operator arm. Corrected from GLSL-only to **dual-stack**:

- **F3a — GLSL arm.** `glass-refract.glsl.ts` declares `uniform float uChromatic`; the split is `ca = inward * rim * uChromatic * CHROMATIC_SCALE`; `CHROMATIC_SCALE == 0.0045`. A re-roll onto a `(1 ± uDispersion)` UV-fraction REDs (the prior G1's anti-future-rainbow bite, KEPT).
- **F3b — WGSL arm (NEW).** The Tier-2 WGSL twin declares `chromatic_aberration: f32`; the split reads `u.chromatic_aberration * CHROMATIC_SCALE`; `CHROMATIC_SCALE == 0.0045`. If the §6 supersede has NOT landed yet (Tier-2 absent), the arm asserts the consumer-less pilot body is DEFINITION-ABSENT (the on-disk-resolves discipline — the fence never greens on an absent WGSL, never greens on the stale `0.003` pilot).
- **F3c — cross-stack scale equality (NEW).** `CHROMATIC_SCALE` literal in the GLSL == the WGSL `CHROMATIC_SCALE` literal == `0.0045`. The single assert that kills the 0.003/0.004/0.0045 three-way drift.
- **F3d — token-type guard (NEW, the §2.M4 lock).** `--glass-chromatic-strength` is registered `@property … syntax: "<number>"`; the renderer reads `--glass-chromatic-strength` (NOT `--glass-edge-dispersion`) into the uniform; `--glass-edge-dispersion` is consumed ONLY in a `box-shadow:` context. A renderer line reading `--glass-edge-dispersion` into a `uniform1f`/typed-struct write REDs.
- **Per-clause synthetic-reintro bites** (the false-witness discipline): a WGSL body with `· 0.003` REDs F3c; a WGSL `uChromatic`-spelled field (wrong idiom) or a GLSL `chromatic_aberration` REDs F3a/F3b; a renderer assigning `--glass-edge-dispersion` to a uniform REDs F3d; the stale pilot left on disk with `0.003` REDs F3b/F3c.

F1 (chroma fence `dispΔC_p99 ≤ ε`), F2 (dark-AA valve fold), F4 (op-budget proxy), F5 (on-disk-resolves) are unchanged from the prior G1 §5 and stay calibrated over the WS1 field at the keystone.

---

## 6. The shipped-pilot disposition — supersede (clean break)

**Decision: WS8 §4 `BG.W-GLASS-SOTA-LADDER` SUPERSEDES `src/composables/glass/webgpu/glassShader.wgsl`'s body** with the proper Tier-2 WGSL twin of `glass-refract.glsl.ts` (the FBO-first-pass squircle-bevel drapery, the `rim` form from §3, the canonical `chromatic_aberration` field + shared `CHROMATIC_SCALE = 0.0045`). Rationale, all on-disk-verified:

- The pilot is **consumer-less** (0 importers) and **structurally stale** (single-panel `background_texture`-input flat refraction — not the FBO field shader the dual-stack ships). Keeping its `0.003` body as a "reconcile-in-place" leaves a second, divergent, dead WGSL on disk — the dual-path the no-legacy / W-PRUNE-CONSOLIDATE discipline forbids.
- Clean break, no alias (the project's binding "no backwards compat" law) — the old single-panel body dies, the Tier-2 twin takes its path.
- The stray `docs/tranches/BG/audit/glassShader-tier2.wgsl` (`0.004`) is a converge-phase prototype, not in `src/`; it is NOT the ship target and needs no edit (it stays an audit artifact, like `glass-field-shaders.json`). The §6 twin is authored fresh from the GLSL source-of-truth, not lifted from either prototype.

If the build wants to keep `glassShader.wgsl` as a path (stable import target), §6 rewrites its BODY in place; if it prefers a new file, the old path is deleted (DEFINITION-ABSENT, grep-asserted). Either way F3b asserts the live WGSL carries the canonical name + scale and no `0.003` survives.

---

## 7. Exact waves to amend + the edits

| Wave (existing) | Amendment |
|---|---|
| **`BG.W-GLASS-REFRACT-WEBGL`** (WS8 §2, build-map :621-656) | (a) **Rewrite the §2.M4 sentence** (:625-626) from "`--glass-edge-dispersion` maps DIRECTLY to `uChromatic` (no derived fraction)" → "the scalar `--glass-chromatic-strength` (`<number>`, registered `@property` beside `--glass-level`) threads the `uChromatic`/`chromatic_aberration` uniform; `--glass-edge-dispersion` is the Tier-0 CSS box-shadow analogue — a separate type, never assigned to the float." (b) **Express `CHROMATIC_SCALE = 0.0045` as a named const** in `glass-refract.glsl.ts` (the Files line :647 already names the file). (c) **Widen F3** to F3a–F3d (§5). (d) **Fix the Files-line path** (:649) `src/glassShader.wgsl` → `src/composables/glass/webgpu/glassShader.wgsl` (the actual shipped path; F-E). (e) Add `src/styles/tokens/property-regs.css` (`--glass-chromatic-strength` registration) + `useGlassRefraction.ts` (the token→uniform read) to *Files*. |
| **`BG.W-GLASS-SOTA-LADDER`** (WS8 §4, build-map :678-681) | Add the **WGSL supersede** (§6): replace `glassShader.wgsl`'s pilot body with the Tier-2 twin (canonical `chromatic_aberration` field + shared `CHROMATIC_SCALE = 0.0045` + the `rim` weighting from §3). Record `--glass-edge-dispersion` (CSS box-shadow) as the **Tier-0 rung** of the formalized degrade ladder (the bottom of "Tier-0 CSS → Tier-1 WebGL2 → Tier-2 WGSL"), KEPT not retired. The M6 WGSL-shape gate (already in §2) gains the F3b/F3c assertions. |
| **`BG.W-GLASS-BACKDROP-SAMPLE`** (WS8 §3, the keystone) | Unchanged in shape; the build-owed calibration now pins ONE shared uniform value over the WS1 field for BOTH stacks (the shared scale guarantees both stacks consume the same value). Record that F3c's cross-stack equality is checkable NOW (source), the uniform VALUE + ε calibrate at the keystone (build-owed). |
| **`BG.W-SAFARI-PARITY-GATE`** (WS7, build-map :580-591) | The C18 on-device leg now captures BOTH stacks (Tier-1 WebGL2 on Safari ≤26 / the universal floor AND Tier-2 WGSL on Safari 26+ `navigator.gpu`) and asserts the rim-fringe matches across them (the dual-stack parity the shared scale makes possible). The NON-SKIPPABLE close precondition is unchanged. |

---

## 8. The verifying check

- **Device-free (lands with the wave, in `proof:glass-refract-fence`):** F3a (GLSL spelling + scale) GREEN · F3b (WGSL spelling + scale, or pilot-DEFINITION-ABSENT) GREEN · F3c (`CHROMATIC_SCALE` GLSL == WGSL == `0.0045`) GREEN · F3d (`--glass-chromatic-strength` is the `<number>` uniform feeder; `--glass-edge-dispersion` is box-shadow-only) GREEN · all per-clause synthetic-reintro bites RED-on-injection. Born-RED at HEAD (the shipped WGSL `0.003` + the GLSL-only F3 + the absent scalar token all fail) → GREEN at the WS8 §2/§4 landing.
- **The fast on-disk witness (provable in this audit, no Metal):** `grep -c '0.0045'` across `glass-refract.glsl.ts` + the Tier-2 WGSL == 2 (one named const each) AND `grep '0.003' src/composables/glass/webgpu/glassShader.wgsl` == 0 after the supersede. The cross-stack literal equality is a pure-text assert.
- **Live (LOCAL-only, rides W-REFLECT3):** `tests-visual/glass-refract.spec.ts` on real WebKit-2287 — `chromaticRim > 0` on BOTH the Tier-1 GLSL route AND the Tier-2 WGSL route, and the rim-fringe peak offset matches within tolerance across the two (the dual-stack parity π).
- **Close oracle:** the C18 non-authoring-agent Metal/WebKit dual-stack capture in `SHIP-ATTESTATION.json` + `proof:safari-parity` (WS7) + the `proof:ba-gestalt` glass/CTA verdict.

---

## 9. Coherence with the friction taxonomy + the prior G1

- **Closes §2.T2 (Class U, wrong-uniform).** The prior RESPEC G1 swapped one non-ship name (`uDispersion`) for another (`uChromatic`) absent from `src/` and never examined the shipped uniform — the class recurring one level up. This spec examines all three artifacts, reconciles name + magnitude across both stacks, and fences the WGSL. The "wrong-uniform" class is closed at the actual shipped uniform, not at a prototype.
- **Closes §2.M4 (box-shadow→float type collision).** The scalar `--glass-chromatic-strength` / box-shadow `--glass-edge-dispersion` split is the `--glass-level`/`--glass-depth` precedent applied; the type error is gone, the Tier-0 fringe survives as the degrade-ladder bottom rung.
- **Preserves the prior G1's honest `buildPhaseDeferred`.** The Metal compile-time, the per-pixel rasterizer drift, and the field-dependent uniform VALUE + ε stay build-owed (unchanged). This spec adds only what is decidable now: the canonical name map, the shared scale literal, the token-type fix, the pilot disposition, and the dual-stack fence shape.
- **Avoids §2.J (overfit) regrowth.** The consumer-less pilot is superseded (clean break), not preserved as a second dead WGSL — consistent with W-PRUNE-CONSOLIDATE / no-dual-path.

---

## 10. The honest residual behind the 80%

| Owed | Why not cheaply provable now | Discharged by |
|---|---|---|
| The pinned shared `uChromatic`/`chromatic_aberration` VALUE + ε | Field-content-dependent; needs the live WS1 aurora+drapery field (absent on disk at HEAD) | Keystone WS8 §3 calibration |
| The `rim`-form match guaranteeing full pixel parity beyond the scale | The WGSL twin is authored at build (§6); the spec specifies it adopt the GLSL `rim` verbatim, but the rendered match is a build artifact | WS8 §4 supersede + the §8 live dual-stack π |
| WebKit shader-COMPILE time of the ~3×-length full WGSL twin | No Safari.app / Metal on the audit machine | C18 on-device capture (WS7) |
| Per-pixel Metal-rasterizer drift across the two stacks | Real GPU only | C18 / W-REFLECT3 |

The +4 over the prior G1's 76: the operator is now reconciled against the ACTUAL shipped uniform (not a prototype), the magnitude drift is killed at the named-const root, the type collision is resolved, the pilot disposition is decided, and the fence is dual-stack — all decidable now. The 20% headroom is exactly the build-phase value-calibration + on-device parity capture the prior G1 already deferred honestly; this spec narrows the parity risk (the leg that missed 3×) by pinning the cross-stack scale a fresh WGSL twin can be born-correct against, rather than discovering the 0.003 divergence on-device.
