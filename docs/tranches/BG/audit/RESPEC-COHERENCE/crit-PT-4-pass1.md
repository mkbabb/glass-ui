# CRIT — PT-4 pass 1 (adversarial harden of `pass-1-proto-PT-4.md`)

**Issue:** Shader-fence reconciliation to the SHIP operator + F2 scalar mint + dual-stack parity (C4 [HIGH]).
**Verdict on the resolver:** the STRUCTURAL skeleton is sound and verified — the dual-stack hole is real (`glassShader.wgsl` unfenced), the F2 token-TYPE collision is real (`--glass-edge-dispersion` is a `box-shadow` → `parseFloat`→NaN), the scalar mint is the verbatim `--glass-accent-strength`/`--glass-level` §18 convention, the aurora `uniformBridge*`/`gpu-parity-table.md`/`aurora-wgpu-parity-capture.mjs` precedents exist and are GREEN. BUT the fix re-introduces the SAME wrong-anchor friction one layer down, under-specifies the load-bearing F6 parity, and leaves the authoritative plan docs un-amended. **convergencePct: 62.**

**Fence:** wrote ONLY here; `verify-siblings-intact --quiet` exit 0 before+after.

---

## Verified TRUE (the skeleton holds)

- `uChromatic` absent from `src/` (grep 0); lives only in `glass-field-shaders.json`. ✓
- `--glass-edge-dispersion` is a box-shadow value (glass-fx.css:305-307; consumed surfaces.css:417). `parseFloat`→NaN. ✓ — the type-collision is real, the mint is warranted.
- §18 carries `@property --glass-accent` / `--glass-accent-strength` (property-regs.css:267,273) — Leg B's mint convention is real. ✓
- The aurora dual-stack precedent files exist (`src/components/custom/aurora/composables/uniformBridge.ts` + `uniformBridgeWGPU.ts`, `scripts/aurora-wgpu-parity-capture.mjs`, `docs/tranches/BB/audit/gpu-parity-table.md`). ✓
- The build-map WS8 §2 carries the type-collision (`--glass-edge-dispersion maps DIRECTLY to uChromatic`) + the wrong path `src/glassShader.wgsl`. ✓ — the fix correctly catches both.

---

## OPEN 1 (DOMINANT) — the fix mis-anchored the WGSL reconciliation target: class-U recursion one layer down

The artifact's "Inputs (read in full)" + §1 delta table + §2c parity numbers analyze **`src/composables/glass/webgpu/glassShader.wgsl`** (the pre-WS8 pilot: `chromatic_aberration * 0.003`, absolute `edge_dist*0.15` rim, `mix(..., edge_strength*0.5)` 50%-blend, `refraction_strength * 0.02`).

But **that pilot is NOT what WS8 §2 ships.** The converged WS8 spec (`SPEC-pass4-converged.md:161,189`) and the build-map both instruct: *"apply `audit/glassShader-tier2.wgsl` to `src/glassShader.wgsl`"*. The file WS8 §2 actually lands is `docs/tranches/BG/audit/glassShader-tier2.wgsl`, whose chromatic/refraction operators are a **THIRD set**, divergent from BOTH the pilot AND the GLSL prototype:

| dimension | GLSL prototype (`glass-field-shaders.json`, → `glass-refract.glsl.ts`) | pre-WS8 src pilot (artifact analyzed THIS) | `audit/glassShader-tier2.wgsl` (WS8 §2 LANDS THIS) |
|---|---|---|---|
| chromatic magnitude | `uChromatic * 0.0045` | `chromatic_aberration * 0.003` | `chromatic_aberration * 0.004` (line 102) |
| chromatic rim metric | `rim = 1 - smoothstep(0, 0.16, edge)` (normalized) | `1 - smoothstep(0, max_edge_dist*0.15, edge_dist)` (absolute) | `edge = prof` (the **squircle bevel** profile, line 101) |
| R/B compositing | **hard channel-swap** (`lensed.r = tex(uv+disp+ca).r`) | `mix(..., edge_strength*0.5)` (50%) | `mix(col.x, cr, edge*0.6)` (60%, lines 105-106) |
| refraction magnitude | `uRefractionStrength * 0.045` | `refraction_strength * 0.02` | `refraction_strength * 0.04 / 1.5` ≈ 0.0267 (line 81) |

So the artifact corrected the GLSL anchor (prototype JSON → ported `glass-refract.glsl.ts`) — but on the WGSL side it anchored on the soon-to-be-overwritten pilot instead of `audit/glassShader-tier2.wgsl`, the file that actually ships to Safari at the cut. **This is the exact class-U wrong-anchor friction the PT exists to kill, recurring inside the fix.** Consequence: §1's recorded magnitude/rim/compositing deltas and §2c's parity-table constant (`chromatic_aberration × 0.0045†`) are computed against the wrong file and are wrong; the real reconciliation must be derived against `audit/glassShader-tier2.wgsl` (0.004 / squircle-prof rim / 60%-mix), which STILL diverges from the GLSL prototype's chromatic operator (normalized-smoothstep rim, hard-swap) — confirming the operator-shape gap below.

**Resolve:** re-anchor §1/§2c onto `audit/glassShader-tier2.wgsl` as the Tier-2 SHIP source (the file WS8 §2 applies), exactly as the GLSL anchor was re-pointed to `glass-refract.glsl.ts`. Read it in full before pinning any parity constant.

## OPEN 2 — F6 `mean≤2.0` presumes operator-SHAPE parity the reconciliation instruction does not mandate

The differential-isolation cancels the *surrounding* pass (drapery/metal/valve/refraction-disp) within each stack — correct. It does **not** cancel chromatic-OPERATOR-shape differences. After re-anchoring (Open 1), the GLSL chromatic operator (normalized-smoothstep rim, hard channel-swap, 0.0045) and the WGSL chromatic operator (squircle-prof rim, 60%-mix-into-blur, 0.004) differ in **rim falloff profile, blend law, AND base raster** — none of which a magnitude reconciliation ("align the constant", §2c †) touches. Two structurally-different chromatic splits will not hold `ΔE mean≤2.0` no matter how the scalar is tuned; F6 either FALSE-REDs a legitimately-magnitude-reconciled WGSL or (correctly) REDs because a divergent split genuinely ships to Safari — either way the reconciliation step is under-specified.

The aurora precedent the fix cites is `aurora.wgsl.ts` **transcribed line-for-line** from `aurora.frag.ts` ("ONE color math across both backends"). The fix applies that discipline only to the CPU-transcribe-for-CAPTURE producer, never to the SHADER. **Resolve:** WS8 §2 must mandate that `glassShader.wgsl`'s chromatic + refraction operators are line-for-line TRANSCRIBED from `glass-refract.glsl.ts` (rim metric + compositing + magnitude all matched by construction) — OR pick ONE source operator (prototype hard-swap vs audit-tier2 squircle-60%-mix) and conform BOTH stacks to it. Only then is F6 `mean≤2.0` a transcription-verification (feasible) rather than a cross-operator hope (infeasible). The parity-table † must say "operator transcribed", not "constant aligned".

## OPEN 3 — blast radius: the develop-ready SPINE + the converged WS8 spec are NOT on the edit list, and the converged spec is already internally stale

The fix's §3/§7 edit list touches only `bg-build-map.md` + `resolve-G1-csafari.md`. The SAME prototype-as-ship anchor + `--glass-edge-dispersion`→`uChromatic` type-collision live in:

- **`AMENDED-WAVE-PLAN.md`** (the develop-ready spine, 86% per the cursor) — lines 59,70,160,**163** (`--glass-edge-dispersion maps directly to uChromatic` + `ca = … uChromatic·0.0045 (glass-field-shaders.json)`),167,169,226. Un-amended, the authoritative wave plan keeps the type-collision + prototype anchor and drifts from the corrected build-map.
- **`converge/BG-WS8-glass-deep/SPEC-pass4-converged.md`** — STILL carries `uDispersion Δ5` (lines 139,161,189) with the multiplicative-fraction form `sampleBG(uv + off*(1±uDispersion))` that **resolve-G1 §1a already declared "must be deleted"**, PLUS the wrong path `src/glassShader.wgsl` (33,161,189,251). The converged spec is internally contradictory with resolve-G1 today, and the fix leaves it that way — a develop pass reading the "converged" authority re-mints `uDispersion`, the very wrong operator the PT chain has been killing since the spike.

**Resolve:** add AMENDED-WAVE-PLAN.md + SPEC-pass4-converged.md to the edit list (strike the type-collision mapping, re-label the prototype, delete the stale `uDispersion Δ5`, fix `src/glassShader.wgsl`→`src/composables/glass/webgpu/glassShader.wgsl`). Also sweep EXECUTION-PROGRESS.md / FINAL.md / FOLD-LEDGER.json for the same mapping. "Touches the named wave" ≠ "touches all waves it touches."

## OPEN 4 (minor) — a NEW token-conflation seed: `.glass-chromatic` class vs `--glass-chromatic-strength` scalar

`.glass-chromatic` already exists (surfaces.css:416, the box-shadow rim-fringe opt-in). The new scalar `--glass-chromatic-strength` name-collides with it: a future reader assumes the scalar is the strength knob for the `.glass-chromatic` CSS class, when it is the GL-uniform driver — the SAME conflation shape the fix exists to kill. The F2 sibling-record covers `--glass-edge-dispersion` vs the scalar but NOT `.glass-chromatic` (class) vs `--glass-chromatic-strength` (scalar). **Resolve:** either rename (e.g. `--glass-refract-chromatic`) or extend the F2 sibling-record + a bite to the `.glass-chromatic`-class disjointness.

## OPEN 5 (minor) — the dual-stack uniform-WRITE bridge location is unspecified

§7 item 4 says `useGlassRefraction.ts` writes "via `uniformBridge` … via `uniformBridgeWGPU`" — but those are aurora-PRIVATE (`src/components/custom/aurora/composables/`). The glass-refract stack has no bridge yet (`createBackdropSource.ts`/`useGlassRefraction.ts` are NEW). The fix names the aurora bridges as a PRECEDENT but reads as if they are the write path. **Resolve:** name where the glass-refract dual-stack uniform-write bridge lives (its own colocated leaf, the aurora per-viz precedent) so the develop pass does not reach into aurora's private bridge.

---

## Residual (agreed, unchanged from G1)

`buildPhaseDeferred = TRUE` — the pinned default + ε + the F6 on-device Metal/WebKit arm genuinely need the WS1 field + Safari.app, discharged by the keystone calibration + C18. Not contested.

**verify-siblings-intact --quiet exit 0 (before + after).**
