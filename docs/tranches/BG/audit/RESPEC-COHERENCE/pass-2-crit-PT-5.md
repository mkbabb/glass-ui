# PT-5 PASS-1 ADVERSARIAL CRITIQUE — C-SAFARI `uChromatic` dual-stack reconcile

**Target:** `docs/tranches/BG/audit/RESPEC-COHERENCE/pass-1-proto-PT-5.md` (convergencePct claimed 80).
**Mode:** harden — does the fix resolve the issue across ALL waves it touches, and does it repeat the friction-class it fixes?
**Date:** 2026-06-30 · **HEAD:** `tranche/BG` · **Fence:** wrote ONLY under `RESPEC-COHERENCE/`; `verify-siblings-intact --quiet` exit 0 before + after; zero src/demo/scripts edits.
**Verdict:** convergencePct **74** — the substance is sound and every on-disk claim verifies, but the fix introduces ONE new cross-wave friction (the M6 panel-array conflict) of the SAME shape PT-5 fixes (a build agent mis-executing because the spec is silent on a shape the gate demands), plus two citation-locus + token-default opens.

---

## A. What I verified on disk (the artifact's claims hold)

Every load-bearing on-disk assertion in the proto is TRUE at HEAD:

| Claim | Verified |
|---|---|
| Shipped `src/composables/glass/webgpu/glassShader.wgsl:13` = `chromatic_aberration: f32`; `:130/132` split `· u.chromatic_aberration · 0.003` | ✅ exact |
| Shipped pilot is consumer-less (0 importers in src/demo) | ✅ grep 0 |
| GLSL source-of-truth `glass-field-shaders.json` = `uChromatic` @ `· 0.0045`, single `uGlassBounds vec4` | ✅ |
| Stray `glassShader-tier2.wgsl` = `chromatic_aberration` @ `· 0.004`, `array<vec4f, 8>` | ✅ |
| `--glass-edge-dispersion` (glass-fx.css:305) is a two-ring `box-shadow`, consumed AS box-shadow at surfaces.css:417 (`.glass-chromatic`) | ✅ |
| `--glass-chromatic-strength` does not yet exist in src/ | ✅ NONE |
| `property-regs.css` carries the `--glass-level`/`--glass-depth` `@property <number>` precedent the new token mirrors | ✅ §18 |
| `proof-safari-webgl.mjs` scans ZERO WGSL/chromatic operators (WGSL stack unfenced) | ✅ 0 hits |
| `proof-glass-refract-fence.mjs` / `glass-refract.glsl.ts` not yet on disk (born-RED build targets) | ✅ absent |
| Prior G1 (`resolve-G1-csafari.md:35/111/149`) carries "maps **directly to `uChromatic`**" + never examines shipped `0.003` | ✅ confirmed blind spot |
| Build-map `:625-626` "maps DIRECTLY to `uChromatic`" + `:649` Files names `src/glassShader.wgsl` | ✅ verbatim |

The §2.T2 (wrong-uniform recurring one level up) and §2.M4 (box-shadow→float type collision) corrections are **real defects, accurately diagnosed**. The name-map + named `CHROMATIC_SCALE = 0.0045` const + scalar-token-vs-box-shadow split + dual-stack F3a-d fence are each decidable NOW with zero Metal, exactly as claimed. The honest `buildPhaseDeferred` carry-over (value/ε + on-device parity) is preserved. This is genuinely +substance over the prior G1.

---

## B. mustResolve — the concrete opens (ranked)

### B1 (BLOCKING) — the §6 supersede CONTRADICTS the M6 `array<vec4f,8>` WGSL-shape gate the SAME wave mints. NEW friction of the fixed shape.

This is the load-bearing finding. The fix repeats the exact disease it cures.

- Build-map `:652-653`: `BG.W-GLASS-REFRACT-WEBGL`'s **M6 WGSL-shape gate requires `array<vec4f,8>`** (the multi-panel N≤8 glass struct). Prior G1 `:122` reaffirms it ("`array<vec4f,8>` + synthetic-reintro self-test").
- The GLSL source-of-truth (`glass-field-shaders.json`) is **single-panel** (`uGlassBounds vec4`, zero `array`).
- The artifact §6 instructs: author the WGSL twin **"fresh from the GLSL source-of-truth, not lifted from either prototype."**
- The ONLY artifact on disk carrying `array<vec4f, 8>` is `glassShader-tier2.wgsl` — the stray §6 explicitly says **NOT** to lift from.

**The contradiction:** executed literally, §6 produces a SINGLE-panel WGSL twin (transcribed from the single-panel GLSL) → which **fails M6's `array<vec4f,8>` assertion** that the same wave already mints. §7's amendment table even says "The M6 WGSL-shape gate (already in §2) gains the F3b/F3c assertions" — it acknowledges M6 exists but never reconciles M6's 8-panel shape against the single-panel GLSL the supersede transcribes. A build agent following §6 verbatim builds a WGSL that reds its own gate, or silently drops M6 — the precise "build agent mis-executes a wave because the spec is silent on a shape the gate demands" friction-class PT-5 was opened to kill.

**Resolve:** §6 must SPECIFY the panel-array reconcile explicitly — the WGSL twin is authored MULTI-panel (`glass_bounds: array<vec4f, 8>`, looping the per-panel rim/squircle/`chromatic_aberration·CHROMATIC_SCALE` math) while the GLSL stays single-panel-per-`sampleBG`-site (the WebGL2 universal floor renders one panel per pass). State that the panel-array shape divergence is INTENTIONAL (WGSL loops N panels in one pass; GLSL one-per-pass) and is NOT a parity break — the per-pixel rim-fringe math is identical, only the panel-iteration differs. AND amend §8's live-π parity claim ("rim-fringe peak offset matches within tolerance across the two") to account for the 8-panel-loop vs single-pass structural difference (the cross-stack pixel-parity is over the SAME single panel rendered both ways, not the whole-canvas composite). Without this, the supersede is under-specified on the exact axis (shape) PT-5 is supposed to make build-deterministic.

### B2 (HIGH) — citation locus: the artifact cites bare `bg-build-map.md` under an `audit/` Inputs list, but the file is at `docs/tranches/BG/execution/bg-build-map.md`.

- The artifact's Inputs line (`:5`) lists `bg-build-map.md` inline with other `docs/tranches/BG/audit/...` paths, implying `audit/bg-build-map.md` — which **does not exist** (`find` confirms the only build-map is under `execution/`).
- All line citations (`:625-626`, `:634`, `:647`, `:649`, `:678-681`, `:580-591`) resolve CORRECTLY against `execution/bg-build-map.md` (verified — `:625-626` is verbatim "maps DIRECTLY to `uChromatic`"; `:649` is verbatim `src/glassShader.wgsl`). So the line numbers are right; only the PATH is ambiguous.
- This is not cosmetic: §7's whole amendment table tells a build agent to edit `bg-build-map.md` at those lines. An agent resolving the wrong (audit/) path finds nothing, or worse — there is also a near-twin `docs/tranches/BG/audit/RESPEC/resolve-G1-csafari.md:35` carrying the SAME "maps directly to `uChromatic`" sentence (the prior G1 the supersede corrects). An agent could amend the G1 archive instead of the live build-map.

**Resolve:** pin the amendment target path as `docs/tranches/BG/execution/bg-build-map.md` everywhere in §1 Inputs + §7. Note that the SAME defect sentence ALSO lives in `RESPEC/resolve-G1-csafari.md:35` (the prior-pass archive) — state whether that archived sentence is left as-is (recommended — it's an archived superseded pass, like `glass-field-shaders.json`) so an agent does not chase it.

### B3 (MEDIUM) — the `--glass-chromatic-strength` initial-value `0.25` is asserted as "the K2-centre" but the on-disk algebra it cites only validates at `uRefractionStrength=1`.

- §4 mints `--glass-chromatic-strength` `@property` with `initial-value: 0.25` = "the K2-centre derived in the prior G1 §1b algebra."
- Build-map `:626-628` (the algebra source): `uChromatic` 0.20–0.30 is valid **"ONLY at uRef=1 — `ca` absolute, `disp` scales"**, and the fence is swept DIRECTLY on `uChromatic` over the real field, "never ported as a ratio." §3 of the artifact itself restates this caveat (the `|ca|/|disp|` ratio drifts under press).
- So `0.25` is a reasonable PROVISIONAL default, but baking it as the registered `@property initial-value` (a shipped resting value a host inherits) commits a number the artifact's own §10 residual table says calibrates at the keystone over the WS1 field.

**Resolve:** either (a) mark the `0.25` initial-value explicitly PROVISIONAL/build-owed (the keystone re-pins it after the field sweep, same posture as the deferred uniform value), or (b) set the `@property initial-value: 0` (the no-fringe safe resting floor — the `--glass-edge-dispersion`/degrade-ladder analogue) and have the renderer write the calibrated `0.25` at arm. Option (b) is cleaner: it mirrors `--glass-level`'s registration discipline (a typed default that does not pre-commit a calibration-owed magnitude) and keeps the one build-owed number (the uniform value) in ONE place (the keystone), not split between the keystone and a baked `@property` default. As written, §4 quietly resolves a build-owed number the §10 table says is deferred — a small honesty seam in the 80%.

---

## C. Friction-class repeat audit (the explicit harden ask)

PT-5 fixes: a name/scale/type drift across two stacks that a single-arm gate cannot see, causing silent divergent ship.

- **§5 dual-stack F3a-d + per-clause synthetic bites + F3c cross-stack literal equality** — this DOES close the gate-blindness class correctly (the WGSL arm + the cross-stack scale-equality assert + the DEFINITION-ABSENT fallback for the not-yet-superseded pilot are all the right shape). ✅ no repeat here.
- **§6 supersede** — REPEATS the class (B1): it under-specifies the WGSL twin's PANEL-ARRAY shape, leaving a build agent to mis-execute against the M6 gate the same wave mints. The fix for a silent-shape-divergence introduces a silent-shape-divergence on a different axis (panel-array vs scale-literal). This is the one real friction-class repeat and it is BLOCKING for amend-readiness.
- **§4 token mint** — minor honesty seam (B3): resolves a calibration-owed number as a baked default, lightly contradicting the §10 deferred-residual posture. Not a friction repeat, but a 80%-confidence dent.

---

## D. Why 74 (not the proto's 80)

The substance, on-disk accuracy, and the two named coherence-issue corrections (§2.T2 + §2.M4) are all verified-correct and amend-ready — that earns the bulk of the score. The −6 from the proto's 80:
- −4: B1 is a genuine NEW cross-wave contradiction (supersede vs M6) that a build agent WILL hit; the proto claims the fix "holds across all waves it touches" but the M6 interaction is unhandled. This is exactly the harden mandate's first question and the answer is "not fully."
- −2: B2 (path-locus ambiguity that can mis-route the §7 amendments) + B3 (the `0.25` baked-default honesty seam).

None are fatal — all three are tightenings, not refutations. With B1's panel-array reconcile written into §6+§7, B2's path pinned, and B3's default marked provisional, this is straightforwardly amend-ready at ~85+. The residual 20% behind the corrected number remains the SAME build-phase value/ε calibration + on-device Metal parity the prior G1 honestly deferred — that floor is untouched and correct.

---

## mustResolve (concrete)

1. **§6/§7 supersede vs M6 `array<vec4f,8>`:** specify the WGSL twin is authored MULTI-panel (`glass_bounds: array<vec4f, 8>`, looping the single-panel GLSL rim/`chromatic_aberration·CHROMATIC_SCALE` math), declare the panel-iteration divergence INTENTIONAL (not a parity break), and scope §8's cross-stack rim-fringe π to a single panel rendered both ways — so the supersede does not red the M6 gate the same wave mints.
2. **§1/§7 build-map path:** pin the amendment target as `docs/tranches/BG/execution/bg-build-map.md` (NOT `audit/`); note the archived twin sentence at `RESPEC/resolve-G1-csafari.md:35` is left as-is so an agent does not amend the superseded pass.
3. **§4 `--glass-chromatic-strength` initial-value:** mark `0.25` PROVISIONAL/keystone-owned, or register `initial-value: 0` (the safe degrade floor) with the calibrated value written at arm — so §4 does not silently resolve the calibration-owed magnitude the §10 residual table defers.
