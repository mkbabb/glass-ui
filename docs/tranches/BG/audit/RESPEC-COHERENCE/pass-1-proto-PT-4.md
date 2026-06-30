# PT-4 — Shader-fence reconciliation to the SHIP operator + F2 scalar mint + dual-stack parity (CORRECTED-APPROACH SPEC)

**Issue:** C4 [HIGH] — the C-SAFARI refraction fence is keyed to `uChromatic`, an operator that exists ONLY in a converge-prototype JSON; the genuinely-shipped Tier-2 WGSL is unreconciled + unfenced; the F2 token mapping is a type-collision.
**Mode:** spec (corrected approach; the binding Metal-Safari capture stays the build-owed C18 residual).
**Date:** 2026-06-30 · **HEAD:** `4c761b64` · **branch:** tranche/BG · **Rationale:** HIGH (the dominant C-SAFARI cut-risk ★★★, shaped exactly like the prior three wrong-uniform misses).
**Fence:** wrote ONLY under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; `verify-siblings-intact --quiet` exit 0 before+after.
**Inputs (read in full):** `glassShader.wgsl` (the SHIPPED Tier-2) · `glass-field-shaders.json` (the PROTOTYPE, mislabeled "the ship") · `glass-fx.css:295-307` + `surfaces.css:405-419` (the F2 token) · `resolve-G1-csafari.md` (the source of the wrong-anchor) · `bg-build-map.md` WS8 §1-4 + WS7 safari-parity · `property-regs.css §18` (the scalar precedent) · aurora `uniformBridge.ts`/`uniformBridgeWGPU.ts` + `gpu-parity-table.md` (the dual-stack precedent).

**feasible: TRUE** — the fix holds. Every correction re-points onto an artefact that EXISTS in `src/` (or mints one to the established convention) and is verified by a device-free gate transposed from a proven precedent. The residual is exactly the on-device Metal/WebKit leg (`buildPhaseDeferred = TRUE`), unchanged from G1.

---

## 0. The one-line correction

`resolve-G1-csafari.md` re-pointed the fence off the spike's invented `uDispersion` onto `uChromatic` — but `uChromatic` is **not in `src/`**; it is the camelCase uniform of the converge-PROTOTYPE `glass-field-shaders.json`, which the resolve doc mislabels "the ship shader, the source-of-truth" (lines 5, 21). The **genuinely-shipped** Tier-2 path is `src/composables/glass/webgpu/glassShader.wgsl`, whose operator is `chromatic_aberration` (snake_case), at a **different magnitude and a different rim metric**. So the G1 correction swapped one non-ship name for another — the SAME wrong-uniform friction (class U) it believed it had closed. The corrected approach (a) re-points the F3 source-scan onto operators that **exist in `src/` after the port**, (b) **mints the missing scalar token** the box-shadow `--glass-edge-dispersion` cannot be (the F2 type-collision), and (c) **fences BOTH stacks** for chromatic-channel parity via a uniform-name MAP + an OKLab-ΔE assert (the aurora `uniformBridge` + `gpu-parity-table` precedent) — so a WGSL Tier-2 that drifts off the GLSL Tier-1's chromatic split REDs before it ships to Safari.

This is NOT a new wave. It is a CORRECTION + HARDENING of `BG.W-GLASS-REFRACT-WEBGL` (WS8 §2), `BG.W-GLASS-BACKDROP-SAMPLE` (WS8 §3, the keystone), and `BG.W-SAFARI-PARITY-GATE` (WS7), plus the born-RED `proof:glass-refract-fence` they mint.

---

## 1. Ground-truth verified against `src/` (NOT the prose, NOT the prototype JSON)

| Claim (pass-1-spec C4) | Verified | Evidence |
|---|---|---|
| `uChromatic` absent from `src/` | **YES** | `grep -rn uChromatic src/` → 0 hits. It lives ONLY in `docs/tranches/BG/audit/glass-field-shaders.json` + planning docs. |
| Shipped Tier-2 WGSL uses `chromatic_aberration` | **YES** | `glassShader.wgsl:13` `chromatic_aberration: f32`; `:130` `if (u.chromatic_aberration > 0.0)`; `:132` `... * u.chromatic_aberration * 0.003`. |
| Shipped Tier-2 WGSL uses `refraction_strength` | **YES** | `glassShader.wgsl:12` `refraction_strength: f32`; `:106` `... * u.refraction_strength * 0.02`. |
| Magnitudes differ from the prototype | **YES** | chromatic: WGSL `*0.003` vs prototype `uChromatic*0.0045` (**1.5×**); refraction: WGSL `*0.02` vs prototype `uRefractionStrength*0.045` (**2.25×**). |
| **Rim metric ALSO differs** (un-recorded by C4) | **YES** | WGSL `:131` `edge_strength = 1 - smoothstep(0, max_edge_dist*0.15, edge_dist)` (absolute-UV `edge_dist`); prototype `rim = 1 - smoothstep(0, 0.16, edge)` (normalized `edge`∈[0,1]). DIFFERENT weighting, not just a scalar. |
| **R/B compositing ALSO differs** (un-recorded) | **YES** | WGSL `:136-137` `mix(blur_color.x, r, edge_strength*0.5)` (a partial blend); prototype `lensed.r = texture(...+ca).r` (a hard channel-swap). |
| `--glass-edge-dispersion` is a box-shadow value, NOT a scalar | **YES** | `glass-fx.css:305-307` `--glass-edge-dispersion: inset 0.75px 0 0 0 var(--glass-fringe-warm), inset -0.75px 0 0 0 var(--glass-fringe-cool);` — consumed at `surfaces.css:417` `box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim);`. `parseFloat(getPropertyValue('--glass-edge-dispersion'))` → `NaN`. |
| The WGSL Tier-2 is a consumer-less pilot today | **YES** | `grep -rn glassShader src/ --include=*.ts` → 0 importers (CLAUDE.md "the consumer-less glassShader.wgsl pilot is the WGSL seed"). WS8 §2 makes it the live Tier-2 — so the parity break is a PLAN-coherence defect, not a live-broken-paint defect, but it ships to Safari at the cut. |
| `useGlassRefraction.ts` / `createBackdropSource.ts` are NEW at WS8 | **YES** | absent from `src/` at HEAD. |

**The two "ship operators" the resolve doc conflated:**
- **Tier-1 GLSL** (`src/composables/glass/webgl/shaders/glass-refract.glsl.ts`, **NEW at WS8 §2**, ported FROM the prototype): operator `uChromatic`. This is the right name *for the file the fence scans once it lands* — but the source-of-truth is the **ported file**, never the prototype JSON.
- **Tier-2 WGSL** (`glassShader.wgsl`, **SHIPPED + reworked at WS8 §2**): operator `chromatic_aberration`. **Never scanned, never reconciled** by the G1 fence — the dual-stack hole.

---

## 2. The fix — three legs

### Leg A — Re-point the F3 source-scan onto operators that EXIST in `src/`, scan BOTH stacks, correct the provenance label

The fence's F3 clause (resolve-G1 §5, build-map:634) source-scans `glass-refract.glsl.ts` for `ca = inward·rim·uChromatic·…`. Two corrections:

1. **Correct the provenance prose** wherever `glass-field-shaders.json` is called "the ship shader / the source-of-truth" (resolve-G1:5,21; build-map:625,647): re-label it the **converge-PROTOTYPE** and name the **ported `src/composables/glass/webgl/shaders/glass-refract.glsl.ts`** as the Tier-1 source-of-truth (the file F3 actually scans). The fence keys to `uChromatic` in *that file* — valid, because WS8 §2 ports the prototype INTO it; the friction was the label, not the GLSL name. The anti-regression bite (a `(1±uDispersion)` UV-fraction re-roll REDs) stays.

2. **Add F3-WGSL — the Tier-2 operator scan.** The fence ALSO source-scans `glassShader.wgsl` for the WGSL chromatic operator (`chromatic_aberration`, read off the §2c name-MAP), and asserts BOTH stacks carry their declared operator. A WGSL rename/drop of `chromatic_aberration` (the silent dual-stack drift) REDs. This closes the "F3 scans only the new Tier-1 GLSL" hole verbatim.

### Leg B — Mint the F2 scalar (the box-shadow type-collision fix)

`--glass-edge-dispersion` CANNOT drive a float uniform — it is a CSS `box-shadow` string. The resolve doc's "`--glass-edge-dispersion` maps DIRECTLY to `uChromatic`" (resolve-G1:33-35, build-map:625,648) is a **token-TYPE collision**. The fix:

- **MINT `--glass-chromatic-strength`** — a typed registered `@property <number>` in `property-regs.css §18`, the `--glass-accent-strength`/`--glass-depth`/`--glass-level` scalar precedent (verbatim form below). It is the SINGLE scalar both stacks read; the JS (`useGlassRefraction.ts`) reads it via `parseFloat(getComputedStyle(el).getPropertyValue('--glass-chromatic-strength'))` and writes it to the GLSL `uChromatic` AND the WGSL `chromatic_aberration` uniforms (each through its `uniformBridge*`).

  ```css
  /* property-regs.css §18 — the refraction CHROMATIC-aberration strength scalar.
     Drives the rim R/B split in BOTH refraction stacks (GLSL uChromatic / WGSL
     chromatic_aberration). A typed INHERITING <number> so a host retunes the
     dispersion on any ancestor (the --glass-accent-strength / --glass-level
     precedent). DISTINCT-tier-from the CSS box-shadow rim fringe
     `--glass-edge-dispersion` (glass-fx.css) — that is the Tier-0 CSS-only
     garnish; THIS is the Tier-1/Tier-2 uniform driver. Initial 0 = the neutral
     no-op floor (a non-refracting surface paints no rim split); the refracting
     tier (.glass-deep / the 5 sites) sets the build-pinned default (≈0.25, K2). */
  @property --glass-chromatic-strength {
      syntax: "<number>";
      inherits: true;
      initial-value: 0;
  }
  ```

- **KEEP `--glass-edge-dispersion` UNTOUCHED** as the Tier-0 CSS `.glass-chromatic` rim-fringe box-shadow garnish (`glass-fx.css:305-307` + `surfaces.css:411-418`). It is a *legitimately-different-tier expression* of "chromatic dispersion at the rim" — the cheap CSS-only floor on engines below the GL/GPU tier — NOT a fork of the scalar and NOT a SUBSTITUTE for it. Record the two as distinct-tier siblings (the §F2 type record), the same way `--glass-level` (opacity) and `--glass-tint-strength` (darken) are coordinate-but-disjoint glass axes.

- **The anti-collision bite (F7 self-test):** a `getPropertyValue('--glass-edge-dispersion')` value fed to ANY uniform write REDs (it parses to `NaN` and silently zeroes the operator — the dead-knob no-op class). The fence asserts the uniform driver reads `--glass-chromatic-strength` (a `<number>`), never the box-shadow token.

### Leg C — The dual-stack uniform-name MAP + the OKLab-ΔE parity assert (the aurora precedent applied to refraction)

The two stacks use language-idiomatic names (`uChromatic` GLSL / `chromatic_aberration` WGSL) — KEEP both (a cross-language rename buys nothing; the aurora suite KEEPS `uniformBridge.ts` camelCase + `uniformBridgeWGPU.ts` snake-struct names and reconciles via the typed-struct bridge as the single source). The reconciliation is a **MAP + a render-parity assert**, mirroring `proof:gpu-substrate-single` clause F.

**§2c — `docs/tranches/BG/audit/glass-refract-parity-table.md`** (NEW, the machine-read source-of-truth, the `gpu-parity-table.md` shape):

| logical channel | GLSL Tier-1 (`glass-refract.glsl.ts`) | WGSL Tier-2 (`glassShader.wgsl`) | CSS scalar | parity |
|---|---|---|---|---|
| chromatic | `uChromatic` × `0.0045` | `chromatic_aberration` × `0.0045`† | `--glass-chromatic-strength` | ΔE-bound |
| refraction | `uRefractionStrength` × `0.045` | `refraction_strength` × `0.045`† | (press-coupled `--glass-btn-press-t`) | ΔE-bound |

† **The magnitudes are RECONCILED at WS8 §2** so the effective rim offset (`strength × const`) is parity-equivalent across stacks. The shipped WGSL's `*0.003`/`*0.02` were the simple-pilot's hand-picks; WS8 reworks the WGSL pass and aligns the constant (or folds it into the scalar) so the rendered chromatic split matches. **The binding reconciliation is the F6 ΔE clause, not the table number** — the table records the chosen per-stack constants; F6 proves they paint the same.

**F6 — the dual-stack chromatic-parity assert (NEW clause, the differential-isolation that survives the Safari fallback ladder):**

```
For each stack S in {GLSL-Tier1, WGSL-Tier2}, over the WS1 field at t=0, panel region:
   dispΔ_S(px) = | render_S[chromatic=default](px) − render_S[chromatic=0](px) |
                 (isolates S's chromatic operator; the surrounding pass — drapery,
                  uMetalStrength, the K12 valve, refraction displacement — is present
                  in BOTH the on AND off render of S, so it CANCELS in the differential)
F6:  OKLab-ΔE( dispΔ_GLSL , dispΔ_WGSL )  mean ≤ 2.0, p99 ≤ 5.0   over the panel region
```

The differential-isolation is **load-bearing**: WS8's Safari fallback ladder (full → drapery-dropped → flat-blur, build-map:587,638-641) means the WGSL Tier-2 may LEGITIMATELY drop the drapery on Safari. A whole-frame parity ΔE would FALSE-RED on that legitimate fidelity difference. By differencing each stack's chromatic-on vs chromatic-off, the drapery/metal/valve/refraction differences cancel within each stack, and F6 compares ONLY the chromatic-split rasters — so a parity-equivalent `chromatic_aberration` passes even on a drapery-dropped WGSL pass, while a drifted-magnitude `chromatic_aberration` (the `*0.003` un-reconciled) blows the ΔE bar. This is exactly the C-SAFARI cut-risk made device-free-catchable.

F6 is feasible device-free: the producer `glass-refract-fence-capture.mjs` CPU-transcribes BOTH the GLSL and the WGSL fragment bodies (the `aurora-wgpu-parity-capture.mjs` precedent — it already CPU-transcribes a `.frag` + a `.wgsl` and per-pixel Δs them) and emits the capture-quad (`{glsl,wgsl} × {chromatic-on,off}`) + the metrics JSON to `docs/tranches/BG/audit/visual/glass-refract-fence/` (the committed C17 artefact, on-disk-resolves anti-evasion floor).

---

## 3. The exact waves to amend

| Wave (existing) | Amendment |
|---|---|
| **`BG.W-GLASS-REFRACT-WEBGL`** (WS8 §2, build-map:621-656) | (1) Re-label `glass-field-shaders.json` the **converge-PROTOTYPE**; name `glass-refract.glsl.ts` the Tier-1 source-of-truth. (2) **Mint `--glass-chromatic-strength`** (Leg B) — the scalar token, NOT `--glass-edge-dispersion`. Strike the "`--glass-edge-dispersion`→`uChromatic`" mapping from the Files note (build-map:648) + resolve-G1:33-35. (3) **Reconcile the WGSL `chromatic_aberration`/`refraction_strength` magnitudes** to the GLSL constants (Leg C / the parity table). (4) **Extend `proof:glass-refract-fence`**: F3 keeps the GLSL `uChromatic` scan + ADD **F3-WGSL** (`glassShader.wgsl` `chromatic_aberration` scan); ADD **F6** (dual-stack ΔE parity); ADD **F7** (scalar-driver-is-`--glass-chromatic-strength`-not-box-shadow + the NaN bite). (5) **Author `glass-refract-parity-table.md`** (§2c). (6) **Fix the Files path:** build-map:649 `src/glassShader.wgsl` → `src/composables/glass/webgpu/glassShader.wgsl`. |
| **`BG.W-GLASS-BACKDROP-SAMPLE`** (WS8 §3, keystone, build-map:657-677) | Calibrate the build-pinned default `--glass-chromatic-strength` (≈0.25, K2) + pin the F1 ε **AND** the F6 ΔE over the REAL WS1 field; **promote `proof:glass-refract-fence` F1/F2/F6 `["local"]`→`ci` at this calibration** (F3/F3-WGSL/F4/F7 are checkable from WS8 §2). The F2 dark-AA fold (the K12 valve) is unchanged by this PT. |
| **`BG.W-SAFARI-PARITY-GATE`** (WS7, build-map:580-591) | The C18 on-device Metal/WebKit capture now has a CONCRETE parity TARGET: the Safari-rendered chromatic split (WGSL Tier-2 on `navigator.gpu`) must match the Chrome-rendered split within the F6 ΔE bar (the dual-ENGINE arm of the dual-STACK fence). The fallback-ladder trigger (compile > ~2s → drapery-dropped) is unchanged; F6's differential-isolation means a drapery-dropped Safari pass still passes the chromatic-parity arm. |
| **`resolve-G1-csafari.md`** | A reconcile note appended (or a superseding row) recording: the prototype-as-ship mislabel, the F2 scalar mint, the F3-WGSL + F6 + F7 clauses, the parity table. (Doc reconcile — the resolve doc is the G1 record the build-map cites.) |

No new wave; no new gate (the dual-stack lives in `proof:glass-refract-fence`, NOT a second gate, so there is no parity hole BETWEEN `proof:glass-refract-fence` and the M6 WGSL-shape gate — the M6 structural clauses stay, the OPERATOR parity is owned by F3-WGSL+F6).

---

## 4. The ordering fix

The defect is intra-wave + cross-wave; the ordering that makes the fix coherent:

1. **Within `BG.W-GLASS-REFRACT-WEBGL` (WS8 §2), the build order is:** mint `--glass-chromatic-strength` (property-regs.css) → author `glass-refract.glsl.ts` (GLSL, `uChromatic`) → rework `glassShader.wgsl` (WGSL, `chromatic_aberration` magnitude-reconciled) → author `useGlassRefraction.ts` (reads the scalar via `parseFloat`, writes BOTH uniforms via the respective `uniformBridge*`) → author `glass-refract-parity-table.md` → mint `proof:glass-refract-fence` born-RED with F3/F3-WGSL/F4/F7 active + F1/F2/F6 born-RED-pending-field. **Both stacks land in ONE wave** (build-map:621-623 already edits both files), so the dual-stack fence is born complete — no cross-wave gap where one stack is fenced and the other floats.
2. **`BG.W-GLASS-REFRACT-WEBGL` MUST precede `BG.W-GLASS-BACKDROP-SAMPLE`** (already true — §2 is build-independent, §3 is WS1-gated). The keystone calibrates F1/F6/ε over the field and promotes to `ci`.
3. **`BG.W-SAFARI-PARITY-GATE` (WS7) reads the keystone's pinned F6 target** for its on-device arm — so WS7's safari-parity precond on WS8 §2 (build-map:590) is widened to "WS8 §2 + the keystone's pinned F6 ΔE" (the on-device parity target does not exist until the default is calibrated). This is a precond-tightening, not a new edge.
4. **The cut (`BG.W-CUT`) HOLD:** unchanged from resolve-G1:154 — the tag MUST NOT precede the keystone calibration + the C18 on-device capture + W-REFLECT3. F6's on-device arm is part of the C18 discharge.

---

## 5. The verifying check (the amended `proof:glass-refract-fence` clause set)

`["local"]`→`ci` (born-RED, promoted at the keystone). Producer `scripts/glass-refract-fence-capture.mjs`; detector `scripts/proof-glass-refract-fence.mjs` (the `proof-safari-webgl.mjs` pure-detector + self-test-bite shape).

| Clause | Asserts | Self-test bite (born-RED witness) |
|---|---|---|
| **F1** chroma fence | `dispΔC_p99 ≤ ε` (the GLSL FULL render dispersion-on vs -off; anti-future-rainbow regression) | a `uChromatic`-rainbowed fixture REDs |
| **F2** dark-AA fold | the K12 valve fires where `structLuma > uValveKnee`; the firmed composite clears 4.5:1 (lifted-to-full ink, both modes); the dim valley stays translucent | an un-valved bright-ridge fixture REDs |
| **F3** GLSL operator | `glass-refract.glsl.ts` splits `ca = inward·rim·uChromatic·…` (the PORTED file, NOT the prototype JSON) | a `(1±uDispersion)` UV-fraction re-roll REDs |
| **F3-WGSL** Tier-2 operator (NEW) | `glassShader.wgsl` carries `chromatic_aberration` (off the §2c MAP) + `refraction_strength` | a WGSL rename/drop of `chromatic_aberration` (the silent dual-stack drift) REDs |
| **F4** op-budget proxy | the FULL-shader fbm/curlFBM=3 + vnoise tail + 12-tap ceilings (a no-regression op-COUNT floor) | an over-budget shader REDs |
| **F5** on-disk-resolves | every declared capture path RESOLVES on disk (the C17 quad) | a deleted capture REDs |
| **F6** dual-stack chromatic parity (NEW) | `OKLab-ΔE(dispΔ_GLSL, dispΔ_WGSL) mean≤2.0 / p99≤5.0` over the panel (the differential-isolation survives the Safari fallback ladder) | a WGSL `chromatic_aberration` at an un-reconciled magnitude (`*0.003` vs the GLSL `*0.0045` effective) blows the ΔE bar → REDs |
| **F7** scalar-driver (NEW) | the uniform driver reads `--glass-chromatic-strength` (a registered `@property <number>`); `--glass-edge-dispersion` (box-shadow) is fed to NO uniform write | a `getPropertyValue('--glass-edge-dispersion')`→uniform write (the `NaN` dead-knob) REDs |

**Live π (LOCAL-only, real WebKit-2287, rides per-wave self-close — see PT-1, NOT a terminal W-REFLECT3 funnel):** `tests-visual/glass-refract.spec.ts` — `rimDelta>0` + `chromaticRim>0` (the `--glass-chromatic-strength` split paints) + the FULL-pass AA-over-bright-ridge ratify + the METAL-FLOW gestalt vs the reference; both modes.

**Close oracle:** the C18 non-authoring-agent Metal/WebKit capture embeds the per-region pixel digest in `SHIP-ATTESTATION.json`, the Safari WGSL Tier-2 chromatic split re-verified within the F6 ΔE bar device-free at CI; feeds `proof:safari-parity` (WS7) + the `proof:ba-gestalt` glass/CTA row.

---

## 6. Feasibility verdict + the honest residual

**feasible = TRUE.** Every leg re-points onto an on-disk artefact or mints one to an established convention, and each is verified by a device-free clause transposed from a proven precedent:

- **Leg A** (re-point F3 + add F3-WGSL): a source-scan over files that EXIST after WS8 §2 (`glass-refract.glsl.ts` + `glassShader.wgsl`); the `proof-safari-webgl.mjs` source-detector shape is proven.
- **Leg B** (mint `--glass-chromatic-strength`): the `@property <number>` registration is the verbatim `--glass-accent-strength`/`--glass-depth`/`--glass-level` convention; `parseFloat(getPropertyValue(...))` of a `<number>` token is the standard JS-reads-token seam.
- **Leg C** (dual-stack MAP + F6 ΔE): the `gpu-parity-table.md` + `proof:gpu-substrate-single` clause F + `aurora-wgpu-parity-capture.mjs` CPU-transcribe-and-ΔE precedent is GREEN on the aurora/blob `verified` rows TODAY; the differential-isolation is a one-line extension of F1's own dispersion-on-vs-off methodology.

The fix holds because it removes the prototype-as-ship anchor (the root of the friction), gives the box-shadow type-collision a real scalar, and makes the dual-stack break — the actual C-SAFARI cut-risk — a single RED clause (F6) instead of an unfenced gap between two gates.

**The honest residual (unchanged from G1, `buildPhaseDeferred = TRUE`):**

| Owed | Why uncheap now | Discharged by |
|---|---|---|
| The pinned default `--glass-chromatic-strength` + F1 ε + F6 on-device ΔE | field-content-dependent; the live WS1 aurora+drapery field does not exist on disk at HEAD | keystone calibration (WS8 §3) |
| The WGSL Tier-2 magnitude reconciliation's exact constant | depends on the WS8 WGSL pass rework (drapery-carrying vs drapery-dropped) | WS8 §2 build + the F6 ΔE bind |
| The Safari.app `navigator.gpu` WGSL Tier-2 render + the Metal-rasterizer chromatic drift | the leg that missed 3×; Safari 26+ Metal device only | C18 on-device capture + the F6 on-device arm |
| The WebKit shader-COMPILE time vs ~2s (FULL shader ~3×) | no Safari.app/Metal at audit | C18 + the fallback-ladder trigger (WS7) |

The device-free half is fully de-risked NOW: the operator anchor is corrected to `src/`, the scalar is minted, the dual-stack MAP + F6 + F3-WGSL + F7 clauses are concrete, and the producer/detector are transpositions of proven scripts. The +risk-removed over G1 is precisely the un-examined Tier-2 stack the G1 correction never looked at — the dominant cut-risk, now fenced.

---

## 7. The exact edits (file → change), for the develop pass

1. `src/styles/tokens/property-regs.css §18` — ADD the `@property --glass-chromatic-strength { syntax:"<number>"; inherits:true; initial-value:0; }` block (Leg B, verbatim §2).
2. `src/composables/glass/webgl/shaders/glass-refract.glsl.ts` (NEW, WS8 §2) — port the prototype's FULL pass with `ca = inward·rim·uChromatic·0.0045`; the camelCase `uChromatic`/`uRefractionStrength` GLSL convention.
3. `src/composables/glass/webgpu/glassShader.wgsl` (rework, WS8 §2) — magnitude-reconcile `chromatic_aberration`/`refraction_strength` to the GLSL effective offsets per `glass-refract-parity-table.md`; carry the FBO-first-pass two-pass shape (the WGSL Tier-2 the SOTA-LADDER formalizes).
4. `src/composables/glass/useGlassRefraction.ts` (NEW, WS8 §2) — `parseFloat(getComputedStyle(el).getPropertyValue('--glass-chromatic-strength'))` → write to the GLSL `uChromatic` (via `uniformBridge`) AND the WGSL `chromatic_aberration` (via `uniformBridgeWGPU`). NEVER read `--glass-edge-dispersion`.
5. `src/styles/tokens/glass-fx.css:305-307` + `src/styles/glass/surfaces.css:411-418` — UNTOUCHED (the Tier-0 CSS rim-fringe garnish keeps its box-shadow; record the distinct-tier sibling relationship in the F2 wave note).
6. `docs/tranches/BG/audit/glass-refract-parity-table.md` (NEW) — the §2c uniform-name MAP + the per-stack constants + the ΔE bar.
7. `scripts/proof-glass-refract-fence.mjs` (NEW) — F1/F2/F3/**F3-WGSL**/F4/F5/**F6**/**F7** + a self-test bite per clause.
8. `scripts/glass-refract-fence-capture.mjs` (NEW) — CPU-transcribe BOTH `.glsl.ts` + `.wgsl` bodies; emit the `{glsl,wgsl}×{chromatic-on,off}` capture-quad + metrics JSON to `docs/tranches/BG/audit/visual/glass-refract-fence/`.
9. `docs/tranches/BG/execution/bg-build-map.md` WS8 §2 (621-656) — strike the `--glass-edge-dispersion`→`uChromatic` mapping; add the scalar mint, F3-WGSL/F6/F7, the parity table, the `src/glassShader.wgsl`→`src/composables/glass/webgpu/glassShader.wgsl` path fix; re-label the prototype JSON.
10. `docs/tranches/BG/audit/RESPEC/resolve-G1-csafari.md` — the reconcile note (prototype-as-ship correction + the three legs).

**Fence honored:** all edits are under `/Users/mkbabb/Programming/glass-ui`; this SPEC wrote ONLY under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; `verify-siblings-intact --quiet` exit 0 before+after.
