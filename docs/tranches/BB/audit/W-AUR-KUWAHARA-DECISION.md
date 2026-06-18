# BB.W-AUR-KUWAHARA — the DECIDE study + fired verdict

**Freshness header**: capture date 2026-06-17 · HEAD `ff2af9e3` (BB round 4) · branch `tranche/BB` · render server `:5199` (the live-π DELTA rides W-REFLECT3).

## Verdict: **BUILD** — the anisotropic-Kuwahara painterly finish ships as an OPT-IN single-pass medium (`uMedium == 7`, `medium:"kuwahara"`).

The three-tranche `W-AUR-T5` booking is DECIDED here, on measured ground. The carry ENDS: the residual lands in **ASSERTED-IN-BAND** state (a built finish, default-off), NOT routed to a fourth named-successor wave.

## The decision frame — the three measured inputs

### Input 1 — the residual's size + visibility (re-measured at HEAD)

`proof:aurora-arresting` (`scripts/proof-aurora-arresting.mjs:11-12,177`) RECORDS the band-miss triple: the van-Gogh HERO lands all three arresting bands single-pass (§4.1 colourfulness, §4.2 structure-tensor anisotropy, §4.3 −5/3 power-spectrum slope); the residual is **oil + oil-pastel §4.2 anisotropy** and **oil-pastel §4.3 slope** — the entire decision surface. The named consumer NOW exists: `demo/stories/aurora/presets.ts` binds the painterly mediums full-bleed as first-class studio presets (VANGOGH / OIL_IMPASTO / OIL_GESTURAL / OIL_PASTEL), surfaced on `/substrates/aurora` via the medium picker (`config/options.ts`). The AY booking's unlock condition (a named ≥1 consumer route) is MET.

**The finding:** the residual is a real STATISTICS band-miss on a SHIPPED consumer surface. The anisotropic-Kuwahara operator is the SOTA edge-preserving painterly smoothing — it directly lifts the §4.2 anisotropy (the elliptical kernel hugs the structure-tensor minor eigenvector, so the smoothed field reads strongly coherent) and the §4.3 slope (the multi-scale flat-patch structure carries the −5/3 cascade). It earns its place AS A NEW MEDIUM the consumer selects, distinct from the oil/oil-pastel stroke-deposition register.

### Input 2 — the multi-pass cost vs the budget + the PRM/park substrate

The FBO + structure-tensor + Kuwahara-resolve MULTI-PASS architecture (an FBO render-target + a Gaussian-smoothed multi-tap tensor pass + a Kyprianidis-2010 resolve pass) is the higher-fidelity path the README names as "inherently multi-pass". It demands a substrate change (FBO ping-pong) — a scope-reveal back to `useWebGLCanvas` the wave fences OUT.

**The finding + the design choice:** aurora is a PROCEDURAL fragment shader (no input texture), so the anisotropic Kuwahara CAN be expressed SINGLE-PASS per fragment — the operator samples the procedural color field (`sampleBase`) over an elliptical neighbourhood directly, never an external FBO read. The structure-tensor infrastructure ALREADY ships single-pass (`structureTensorField`, `mediums.glsl.ts:39` — the AW.W4.1 keystone). So the finish lands as a NEW `mediumKuwahara()` body in `aurora.frag.ts` — a single draw, one shader, no FBO ping-pong, no substrate edit. `proof:offscreen-pause` PASSES unchanged (the park machinery — PRM-freeze, offscreen-pause, the demand-loop — is untouched: a parked frame attaches zero of the kuwahara taps because the medium rides the EXISTING loop). The per-frame cost is 4 rings × 8 angular taps = 32 procedural neighbourhood samples (each a `sampleBase` recompute), cost-bounded by the small radius; the WebGL2 floor honours the PRM-freeze by construction.

The COST is the bundle byte: the kuwahara GLSL body adds ~5879 raw / ~2528 gzip bytes (isolated). The `dist/aurora.js` chunk grows past the `{ raw: 130_000, gzip: 42_000 }` ceiling (the BB-9th lift named "a future aurora medium" as its successor — kuwahara IS that successor). The **budgetNote** is returned: new ceiling `{ raw: 150_000, gzip: 50_000 }`, the orchestrator bumps `profile-bundle.mjs` BUDGETS + `proof-aurora-oilpastel-medium.mjs` in lockstep. The aurora.js is also grown by the sibling W-AURORA-WGPU's WGSL primary (a separate budget concern the orchestrator coordinates cumulatively, the W-GOOBLOB-WGPU precedent).

### Input 3 — the single-pass respacing lever's reach (option c, the cheapest path first)

The −5/3 radii respacing lever (`mediums.glsl.ts:354-360`) was MEASURED + REVERTED at W-AUR-STUDIO D5: the φ-adjacent geometric candidate moved oil-pastel β −2.534 → −2.413 (toward the −5/3 band but NOT into it). The hand-set 2.4 / 1.1 / 0.45 stays (van-Gogh's landed-band spacing). The lever is recorded as EXHAUSTED on the existing oil-pastel stroke cascade — it does not dissolve the slope-half single-pass.

**The finding:** the slope residual is NOT recoverable by respacing the existing stroke cascade. The Kuwahara MEDIUM is the answer — but as a NEW, SEPARATE medium (the user selects it), NOT a re-tune of oil-pastel. The oil/oil-pastel mediums are byte-UNCHANGED; the perfection lands on a NEW register (the AY §5 perfection-lands-on-the-residual discipline, here generalized to a new opt-in medium).

## The fired branch — what landed (BUILD, single-pass, opt-in, default-off)

1. **`mediumKuwahara()`** (`mediums.glsl.ts`, `uMedium == 7`) — the SOFT polynomial-weighted anisotropic Kuwahara over the procedural field. The elliptical kernel is oriented along `structureTensorField` (squeezed by the coherence A), divided into 8 OVERLAPPING sectors via smooth gaussian-of-angular-distance weights (NOT the pre-2010 hard argmin → no 8-spoke pinwheel — the §4.2 anti-regression by construction); the output is the variance-weighted blend of the sector means (`1/(1+var^q)` — the low-variance sectors dominate). A center-anchor mix makes the operator a near-no-op in flat zones (the smoothing only bites at edges); a faint canvas tooth + pigment-sat lift gives the flattened patches the oil-paint read. `uStrokeAmount` is the finish-strength knob; `uStrokeScale` tracks the patch size.
2. **The dispatch + bridge wiring** — `aurora.frag.ts` adds the `else if (uMedium == 7)` branch; `uniformBridge.ts` adds `kuwahara: 7` to `MEDIUM_ID` (the `satisfies Record<AuroraMedium, number>` forces the slot); `resolveStrokeOrientId` forces tensor for kuwahara (the kernel needs the structure tensor); `atoms.ts` adds the kuwahara case to the texture-knob fan-out + round-trip projection (strokeAmount + canvasGrain).
3. **The opt-in / default-unchanged fence** — NO preset selects kuwahara unless explicitly chosen (`demo/stories/aurora/config/options.ts` adds the picker entry). The smooth default, the van-Gogh HERO, and the oil/oil-pastel mediums are BYTE-unchanged in the shader — every existing `proof:aurora-*` gate that targets them stays green by construction.

## The GL/GPU shader fence

- The aurora WebGL2 medium tree (the OWNING wave's GLSL) is edited — the fence's explicit-widen clause for the owning aurora medium wave.
- **`aurora.wgsl.ts` is BYTE-UNTOUCHED.** The WGSL primary renders the smooth core for EVERY painterly id (it has no medium dispatch — `aurora.wgsl.ts:320-322`), so a `medium:"kuwahara"` config on WebGPU degrades to the smooth core, NEVER an error. The kuwahara WGSL is the booked `W-AURORA-WGPU-MEDIUMS` tail (the same successor that ports the existing painterly bodies).
- No ppmycota/demo hue enters a library aurora token (kuwahara reads the existing palette; the painterly mediums' palettes stay presets-in-consumers).

## The dead-pointer reconcile

Every `W-AUR-T5` phantom-wave pointer is re-pointed to "asserted-in-band, built at BB.W-AUR-KUWAHARA":
- `scripts/proof-aurora-arresting.mjs:177` — the residual `note` re-pointed off the "named T5 anisotropic-Kuwahara successor" routing.
- `src/components/custom/aurora/README.md` + `DESIGN.md` — the multi-pass-is-coming prose reconciled onto "the single-pass anisotropic-Kuwahara MEDIUM ships opt-in at BB.W-AUR-KUWAHARA; the multi-pass FBO finish is a SEPARATE future capability, not a re-book of this residual".
- `mediums.glsl.ts:359` — the "named AY.W-AUR-T5 multi-pass anisotropic-Kuwahara candidate" comment re-pointed.

NO cite survives pointing at a future named-successor wave. The terminus is reached.

## Binding evidence

The live-π painterly DELTA (the BEFORE/AFTER of the oil + oil-pastel + the NEW kuwahara medium full-bleed in both modes over `/substrates/aurora`, with the §4.2 orientation-histogram no-pinwheel readback + the `proof:ba-gestalt` aurora verdict) rides **W-REFLECT3** (Batch 7), the cardinal-lesson Playwright architecture. The device-free source-state arm (`proof:aur-kuwahara`) is GREEN at this wave.
