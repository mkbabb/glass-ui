# BD.W-AUR-METAL — the metal + metal-gradient aurora finishes (`uMedium==10/11`), the re-plumbed `N`, the cursor-as-light z-synthesis, and the `medium`/`finish` split

**Band 13 (V per-viz) · depends: W-AUR-SATIN (8) · W-AUR-PRISM (9) (the slot anchors) · W-GATE-TRUTH-AUDIT + W-WAVE-FIELD-HARNESS (the numeric parity net) · W-AUR-INTERACT-class cursor wiring (the cursor-as-light reuses the shipped `uCursor`).** METAL slots `uMedium==10` (metal) + `uMedium==11` (metal-gradient), monotonic above prism==9 (the `satisfies Record<AuroraMedium,number>` forces it; satin/prism MUST be landed or the 10/11 premise is phantom — the metallic-aurora §8.3 finding). Its parity gate COMPOSES `shader-eval-harness.mjs` with a NUMERIC ΔE + a coefficient-flip bite + splice-following (NO sparkle self-exempt, NO `.test(/fn name/)` — the aur-kuwahara false-green is the anti-pattern this wave explicitly retires).

> **Status:** SPEC (tranche-dev — this file is the PLAN; the `src/` edit is the gated build). Grounded against HEAD `mediums.glsl.ts:40-91` (the Sobel `N` computed-then-DISCARDED at `:89`), `aurora-mediums.wgsl.ts:76-107,300-312` (the WGSL structureTensorField + applyMedium), `uniformBridge.ts:42-56,283-291` (`MEDIUM_ID` stops at kuwahara:7; `uLightDir` WebGL2-only at :291), `uniformBridgeWGPU.ts:10-27,63-67` (the struct — NO `uLightDir` lane; cursor at off 64; the `kuwahara` vec4 off 560 carries free `.z`/`.w` pad slots), `presets.ts:61-76` (the `AuroraMedium` union, no satin/burst/metal), `critique/metallic-aurora.md` + `critique/passd-aurora.md §1-6` (the verified findings).

## The defect / the ask — and the FIVE substrate truths the metallic-aurora critique proved

The BD aurora band wants a **metal** finish (the field reads as folded liquid metal — anisotropic specular ridges with sharp catch-lights in the crests and deep dark valleys) + a **metal-gradient** variant (the metal over a smooth gradient base, the brushed-metal sheet read). The Pass-D first-principles re-audit (`critique/metallic-aurora.md` + `critique/passd-aurora.md`) proved, against HEAD source, that the prior spec rested on phantom claims. This wave is the HONEST re-scope, building on the verified truths:

1. **`N` (the height-normal) EXISTS but is THROWN AWAY (`mediums.glsl.ts:52-53,89`).** `structureTensorField` computes the Sobel luma gradient `Gx, Gy` (the screen-space height-field normal — the field's luma IS the apparent height, per the function's own comment `:32-35`) at lines 52-53, then `return vec3(dir, A)` at line 89 keeps ONLY the tangent + coherence and DISCARDS the gradient. The metal crest term `N·H` needs exactly this discarded gradient. The fix is to RE-PLUMB the existing `N`, not re-pay 8 luma taps (the metallic-aurora §1A load-bearing un-gated CORRECTNESS gap). The WGSL twin (`aurora-mediums.wgsl.ts:107`) has the identical `return vec3<f32>(dir, A)` discard.

2. **`uLightDir` does NOT exist on the WGSL path (`uniformBridgeWGPU.ts:10-27` — verified, no light lane).** The WebGL2 bridge writes it (`uniformBridge.ts:291`); the WGPU struct (off 0-576) has cursor (off 64) but NO light vector. A WGSL metal catch-light "riding `uLightDir`" has no substrate on Safari (the metallic-aurora §2 phantom). The honest fix: cursor-as-light with a SYNTHESIZED z (`uCursor` DOES cross to WGSL), which is NEW math the prior spec never specced (`passd-aurora.md §1b`).

3. **The §2 Kajiya-Kay form `pow(sinTH, s)` is purely `T·H` — it lacks the crest term entirely (the metallic-aurora §1A).** The metal read needs BOTH the anisotropic streak `f(T,H)` (WHERE the highlight runs, along the ridge) AND the height-normal specular `f(N,H)` (the CREST brightness, dark valleys → bright crests). One without the other reads as a tinted tensor-orientation MAP, not folded metal.

4. **kuwahara is mis-classed as a `medium` — it is a POST-FILTER (`passd-aurora.md §3`).** The `medium` enum is becoming a grab-bag (paint substances oil/satin/prism vs operators kuwahara). Adding metal as a second mis-file AMPLIFIES the disease. A coherent pool needs a `medium` (substance) vs `finish` (operator/shader-effect on the field) SPLIT. metal IS a finish (a relighting operator over the field, like kuwahara is a smoothing operator) — this wave MINTS the split.

5. **The ≥2-consumer bar's #2 was `W-AUR-ALBUM` — a D7 disease name (the metallic-aurora §7).** The honest 2nd consumer is a GENERALIZED `<Aurora medium="metal">` backdrop, named WITHOUT album/iOS-27/now-playing — ONE generic demo preset, never an app-name register.

## The mechanism

The metal finish re-plumbs the discarded `N`, adds the `N·H` crest term, synthesizes a 3D light from `uCursor` (crossing BOTH backends), mints the `medium`/`finish` split, and ports FULLY to WGSL with a NUMERIC-proven parity (no silent degrade, no sparkle self-exempt).

### 1. RE-PLUMB the discarded `N` (the §1A fix — no re-paid taps)

`structureTensorField` (`mediums.glsl.ts:40` + the WGSL twin `aurora-mediums.wgsl.ts:76`) is widened to RETURN the gradient it already computes. The change is the return type only: the function ALREADY has `Gx, Gy` in scope (lines 52-53). Two viable shapes (the build picks one):
- **(A) `vec4` return** — `return vec4(dir, A, packGradient(Gx, Gy))` where the gradient is packed into a single float (atan2 angle + magnitude), or a `vec4(dir.x, dir.y, A, gradMag)` + a separate angle read. The existing 2 callers (`mediums.glsl.ts` kuwahara `:402` `structureTensorField(...).xy`/`.z`, the WGSL `:182`) keep reading `.xy`/`.z` byte-unchanged (the `.xy`/`.z` swizzles are stable); ONLY the metal body reads the new `.w` gradient lane.
- **(B) a sibling `fieldNormal(p,t)` 2-tap helper** — a SEPARATE 2-tap central-difference luma gradient (the §3.3 form), reused by metal. This re-pays 2 taps (not 8) but keeps `structureTensorField`'s signature untouched (lower blast radius).

The spec PREFERS (A) — re-plumbing the EXISTING Sobel is zero extra taps (the §1A "or it re-pays 8 taps it already computes" waste-avoidance), and the `.xy`/`.z` callers are stable. The gate (M3) asserts the metal body reads the re-plumbed `N` from `structureTensorField`'s widened return, NOT a re-paid second Sobel.

`N` in metal = `normalize(vec3(Gx, Gy, METAL_HEIGHT_SCALE))` — the screen-space height-field normal: the luma gradient is the XY tilt, `METAL_HEIGHT_SCALE` the Z (how "tall" the apparent relief is; a tunable bounded constant). This is the surface normal the `N·H` crest term needs.

### 2. The metal BRDF — streak(WHERE) + `N·H`(CREST), BOTH terms (the §1A two-term fix)

```glsl
// L: the cursor-as-light (3D, §3); V = (0,0,1) the fullscreen view; H = normalize(L + V).
vec3 H = normalize(lightDir3D + vec3(0.0, 0.0, 1.0));
// (a) the anisotropic streak — WHERE the highlight runs (along the ridge tangent T).
float TdotH = dot(normalize(vec3(T, 0.0)), H);
float sinTH = sqrt(max(1.0 - TdotH * TdotH, 0.0));
float streak = pow(sinTH, METAL_SHININESS_ANISO);     // sharp narrow lobe (the metal read)
// (b) the height-normal specular — the CREST brightness (dark valleys → bright crests).
float NdotH = max(dot(N, H), 0.0);
float crest = pow(NdotH, METAL_SHININESS_CREST);
// the metal highlight: the streak MASKS where, the crest sets brightness. Both required.
float metalSpec = streak * mix(METAL_VALLEY_FLOOR, 1.0, crest) * uMetalPolish;
// gate the anisotropic term on coherence A — NO phantom banding in flat zones (the §3 fix).
metalSpec *= smoothstep(0.0, METAL_COHERENCE_FLOOR, A);
```

- `METAL_SHININESS_ANISO` is HIGH (a sharp narrow lobe — the metal crest, NOT satin's broad sheen); `METAL_SHININESS_CREST` sets the valley→crest roll-off. `uMetalPolish` is the crest/valley contrast knob (the §3.6 "height-normal term in disguise", now with a REAL `N·H` for it to scale — the prior spec's defect closed).
- The coherence gate (`smoothstep(...,A)`) is MANDATORY — the metal critique §3 second concern: a streak-along-fallback-flow paints phantom banding in metal-gradient's smooth (structureless) zones. Gating on `A` fades the streak to ZERO as `A→0` (the smooth-gradient base reads as a smooth gradient, no banding). The metal-gradient variant (uMedium==11) RELIES on this (it is metal over a smooth base — its smooth zones MUST stay smooth).
- The lobe width uses the SHIPPED `mix(1.0, 0.34, A)` form (`mediums.glsl.ts:411`, the kuwahara precedent — NOT a `(1-A)` fork; the §3.4 first concern).
- The achromatic crest: the catch-light is a WHITE-toward-warm specular (`col += metalSpec * vec3(METAL_CATCH_WARM)`), NOT a hue (metal's read comes from the SHADING not the hue — the §1 finding; a colored crest would read as a tinted map, the warm-cream identity holds).

### 3. The cursor-as-light z-synthesis — the light that CROSSES to WGSL (the §1b NEW math)

`uLightDir` cannot cross to WGSL (truth #2). The honest fix: synthesize a 3D light from `uCursor` (which DOES exist on both backends — `uniformBridgeWGPU.ts:17` cursor off 64):

```
vec2 toLight = uCursor - p;                       // screen-space direction to the cursor
vec3 lightDir3D = normalize(vec3(toLight, METAL_LIGHT_Z));  // synthesize Z — the new math
```

`METAL_LIGHT_Z` (a bounded constant, ~0.6) lifts the light off the screen plane so `H = normalize(L + ẑ)` VARIES across the field (the §1A "a constant H degenerates the streak to a tinted tensor map" — synthesizing a per-fragment `L` from the cursor makes `H` spatially varying, so the highlight MOVES as the cursor rakes). When `uCursorStrength` is 0 (no pointer), the light falls back to a STATIC default axis (`METAL_LIGHT_DEFAULT = normalize(vec3(0.6, 0.8, METAL_LIGHT_Z))` — a from-upper-right rake) so a non-interactive metal backdrop still reads as lit metal. This light direction crosses to WGSL because `uCursor` does — the metallic-aurora §2 "you must port a light that has never crossed" closed by reusing a uniform that ALREADY crosses, synthesizing the missing dimension in-shader.

NO new struct lane is strictly needed for the light (cursor reuse). BUT `uMetalPolish` + `METAL_HEIGHT_SCALE` (the two authoring knobs) need a uniform home: they pack into the FREE `.z`/`.w` slots of the EXISTING `kuwahara` vec4 (`uniformBridgeWGPU.ts:67` off 560, slots 2/3 are `_` pad) — NO new struct lane, byte-offset-stable, the typed-struct lockstep preserved (a metal config writes the kuwahara lane's free slots; a kuwahara config leaves them 0). The WGSL struct `kuwahara: vec4<f32>` (`aurora.wgsl.ts:83`) reads `.z`/`.w` for metal — additive, byte-identical at the smooth default.

### 4. The `medium` / `finish` SPLIT axis (truth #4 — minted HERE)

This wave MINTS the classification the pool has needed since kuwahara (the §3 grab-bag fix). The split is a TAXONOMY + a recorded register, NOT a second runtime enum (the `uMedium` ladder stays ONE integer dispatch — re-numbering would break the bridges):

- **`medium`** = a paint SUBSTANCE the field is rendered AS (smooth/pastel/watercolor/oil/crayon/vangogh/oil-pastel/satin/prism — slots 0-9). The field's color IS the medium's color.
- **`finish`** = an OPERATOR applied OVER the rendered field (kuwahara==7 the smoothing operator, metal==10 the relighting operator, metal-gradient==11) — it re-samples or re-lights the SAME field. The field's color is TRANSFORMED by the finish.
- The split is recorded in `presets.ts` as a `MEDIUM_CLASS: Record<AuroraMedium, "medium" | "finish">` map (the documentary taxonomy) + the CLAUDE.md aurora-medium doc gains the split. kuwahara is RE-CLASSED `finish` (correcting its mis-file — a doc/taxonomy flip, the `uMedium==7` runtime dispatch byte-unchanged). metal/metal-gradient file as `finish` (correctly, the second + third finish members — so the split is non-vacuous, the metallic-aurora §3 "kuwahara is already the 1st mis-file, metal would be the 2nd" closed by NAMING the axis). satin/prism file as `medium` (their own specs record this; this wave's split map enrolls them).

The split is the SOTA "fewer-sharper-primitives" answer to the grab-bag: the pool now has an organizing principle (substance vs operator), and a future "cool fragment trick" must DECLARE which axis it joins — no more silent dumping into `medium`.

### 5. The dispatch — both backends, FULL lockstep, NO sparkle self-exempt

- **GLSL** (`mediums.glsl.ts` + `aurora.frag.ts`): append `mediumMetal()` + `mediumMetalGradient()` bodies + `else if (uMedium == 10) col = mediumMetal(col, pN, t); else if (uMedium == 11) col = mediumMetalGradient(col, pN, t);`. metal-gradient reuses `mediumMetal`'s BRDF over a smoothed/gradient base (a `mediumMetal` call with a pre-flattened `col` — the brushed-sheet read; NOT a separate BRDF).
- **WGSL** (`aurora-mediums.wgsl.ts:300`): append `fn mediumMetal(...)` + `fn mediumMetalGradient(...)` + `if (medium == 10) { return mediumMetal(col, p, t); }` + `if (medium == 11) { return mediumMetalGradient(col, p, t); }` arms to `applyMedium`. metal renders FULLY on WebGPU (the BRDF + cursor-light + N·H is transpilable arithmetic; it does NOT join the oil/vangogh kuwahara-degrade cohort — the §2b "is metal ACTUALLY ported or the 4th silent degrade" answered: ACTUALLY ported, the cursor-light reuse making the catch-light deliverable on Safari).
- **The sparkle (twinkle-in-place, fixed seed).** A metal surface twinkles (the §1c boil trap): the sparkle ADVANCES THE PHASE not the position (`hash21(floor(p * METAL_SPARKLE_DENSITY))` — a FIXED per-cell seed, the phase animated by `sin(t + seed*TAU)`), so the sparkles twinkle IN PLACE, never boil across the field. The hash is forced `highp` (the metallic-aurora §8 force-highp — a `mediump` hash boils across backends). NO sparkle self-exempt: the parity gate's coefficient-flip bite covers the sparkle determinism (a position-animated sparkle vs a phase-animated one produces a measurable temporal-divergence the harness's 2-frame sample catches — see M5).

### 6. ONE generalized demo preset (truth #5 — NO album/iOS-27)

A single `AURORA_METAL_PRESET` ("Metal") + `AURORA_METAL_GRADIENT_PRESET` ("Brushed Metal") in `presets.ts` — generic finish registers, NO app name, NO `album`/`iOS-27`/`now-playing`/`flow-field-background` identifier (the D7 fence; `generalize-no-hardcoded.md` rows A13-A16). The demo `substrates/aurora.vue` adds "Metal" + "Brushed Metal" to its medium selector. The ≥2-consumer bar is met by the finish being a first-class `<Aurora medium="metal">` register (any backdrop consumer reaches it) + the demo exerciser — the HONEST generalized 2nd consumer the metallic-aurora §7 demanded, NOT the D7 album register.

## The gate — proof:aur-metal (born-RED → GREEN) + the COMPOSED numeric parity

`scripts/proof-aur-metal.mjs`, `tags: ["local","ci"]`. EVERY parity clause COMPOSES `shader-eval-harness.mjs` (W-GATE-TRUTH-AUDIT) — this is the binding requirement, the explicit retirement of the aur-kuwahara false-green (NO `.test(/mediumMetal/)` name-presence as a parity proof; the sparkle is NOT self-exempt).

- **M1 — the finishes exist on BOTH backends + slot 10/11.** `MEDIUM_ID.metal === 10 && MEDIUM_ID["metal-gradient"] === 11` (off `uniformBridge.ts`), the `AuroraMedium` union carries both, `mediumMetal`/`mediumMetalGradient` DEFINED in BOTH `mediums.glsl.ts` AND the SPLICED `aurora-mediums.wgsl.ts` (via `resolveSplices(aurora.wgsl.ts)` — splice-following so the gate sees the spliced bodies, NOT the empty literal file; the direct fix of the aur-kuwahara G3 hole), AND `applyMedium`'s WGSL dispatch carries `if (medium == 10)` + `if (medium == 11)` arms. A missing WGSL body / dispatch arm REDs (the NO-silent-degrade assert).
- **M2 — the NUMERIC parity ΔE (the real lockstep number, no sparkle self-exempt).** Via `shader-eval-harness`: `sampleOracle` over a JS twin (`metalBrdf.ts` — the streak + `N·H` crest + cursor-light + coherence gate + the phase-sparkle, the SAME math), `sampleShader` over the transpiled GLSL `mediumMetal` AND the spliced WGSL `mediumMetal` at the SAME deterministic `(p,t)` lattice (incl. ≥2 distinct `t` samples for the twinkle determinism), `fieldDeltaE` → `≤ PER_VIZ_BARS.metal` (the recorded tight bar in `parity-bars.md`). GLSL twin ↔ WGSL twin ↔ oracle all within bar — the §2b/§4 "is it real lockstep" answered with a COMPUTED number. The sparkle is sampled at 2 frames so a position-animated boil (vs phase-animated twinkle) produces a temporal ΔE the harness catches — the §1c "no device-free gate sees the boil" gap closed at the JS-twin level (the JS oracle CAN distinguish phase-vs-position animation deterministically; the real-GPU per-rasterizer drift still rides W-REFLECT3, but the boil-vs-twinkle ALGORITHM is now device-free provable).
- **M3 — the re-plumbed `N`, NOT a re-paid Sobel.** The metal body reads `N` from `structureTensorField`'s WIDENED return (the `.w` gradient lane or the packed gradient), and the gate asserts there is NO SECOND 8-tap Sobel in the metal body (a `dot(sampleBase(p + vec2(...)), W_LUMA)` ×8 block in `mediumMetal` REDs — the §1A re-paid-taps waste). The widened `structureTensorField` keeps its `.xy`/`.z` callers byte-unchanged (the gate asserts the kuwahara/`:182` callers still read `.xy`/`.z`).
- **M4 — the BOTH-terms BRDF (streak AND `N·H`), the cursor-light crosses, the coherence gate.** The gate asserts the metal body computes BOTH `pow(sinTH, ...)` (streak) AND `pow(NdotH, ...)` (crest) — a body with ONLY the streak (the prior spec's tinted-tensor-map defect) REDs; the light direction derives from `uCursor` (the gate asserts `uCursor`-derived light in the WGSL body too — the §2 "the light must cross to WGSL" made structural; a WGSL metal body with NO cursor-light read REDs); the coherence `smoothstep(...,A)` gate is present (a metal body painting an un-gated streak REDs — the §3 phantom-banding fix). The lobe width uses `mix(1.0, 0.34, A)` not `(1-A)` (the §3.4 fork bite).
- **M5 — the twinkle-in-place determinism + force-highp.** The sparkle hash is per-CELL fixed-seed (`hash21(floor(p * ...))`) with the PHASE animated (`sin(t + ...)`), NOT the position (`hash21(p + t)` would boil) — the gate's coefficient-flip bite plants a position-animated sparkle and asserts the 2-frame ΔE (M2's temporal sample) > bar; the hash is `highp` (the gate scans for the highp qualifier — a `mediump` sparkle hash REDs).
- **M6 — the `medium`/`finish` split is minted + non-vacuous.** `MEDIUM_CLASS` map exists in `presets.ts`, classes kuwahara/metal/metal-gradient as `finish` (≥2 finish members → non-vacuous), satin/prism/oil/etc as `medium`; the CLAUDE.md aurora doc carries the split. A `MEDIUM_CLASS` missing / classing metal as `medium` (the 2nd mis-file) REDs.
- **M7 — the fences.** No D7 token in the preset identifiers (the album/iOS-27/now-playing raw-string scan); the crest is achromatic-warm (no hue in the catch-light — a `--section-color`/ppmycota literal in the metal body REDs); the uniform packing reuses the FREE kuwahara-vec4 slots (NO new struct lane — the gate asserts the WGPU struct word count is unchanged, the byte-offset-stable lockstep); the default byte-identical (a NON-metal config's assembled shader is byte-identical EXCEPT the appended bodies + the dispatch arms + the widened `structureTensorField` return — the `.xy`/`.z` callers proven stable).

**Self-test bites (each planted defect MUST red, harness coefficient-flip discipline — NO deletion bites):** (a) the `N·H` crest term DELETED (streak-only) → the metal-spec field distribution moves > bar AND M4 REDs → the tinted-tensor-map bite; (b) the cursor-light replaced with a CONSTANT `H` (the degenerate constant-half-vector) → the spatial distribution flattens > bar → M2/M4 RED; (c) a SECOND 8-tap Sobel in the metal body → M3 RED (the re-paid-taps bite); (d) a position-animated sparkle (`hash21(p + t)`) → the 2-frame temporal ΔE > bar → M5 RED (the boil bite, device-free at the JS-twin level); (e) `mediump` sparkle hash → M5 RED (the force-highp bite); (f) a `(1-A)` anisotropy fork → M4 RED; (g) the WGSL `applyMedium` arm routes `medium==10` into `mediumKuwahara` (a silent degrade) → the WGSL ΔE diverges → M1/M2 RED (the silent-degrade bite); (h) `MEDIUM_CLASS` classes metal as `medium` → M6 RED (the 2nd-mis-file bite); (i) a coefficient flip (`METAL_LIGHT_Z 0.6 → -0.6`, the light below the plane) → M2 RED; (j) a faithful re-transcription → ΔE ≈ 0, all GREEN (identical control); (k) a sub-threshold drift (`uMetalPolish 1.0 → 0.999`) → PASS (the bar is not a hair-trigger — each planted bite proven to clear its OWN calibrated bar, the D2 load-bearing-detector floor).

**What reds on the pre-wave tree:** M1 (no metal bodies, `MEDIUM_ID` stops at prism==9), M2/M4/M5 (no body to evaluate), M3 (`structureTensorField` still discards `N`), M6 (no `MEDIUM_CLASS` split) — born-RED by construction; GREEN only after the re-plumbed `N` + the both-terms BRDF + the cursor-light z-synthesis + the twinkle + the split + the bridges + the JS twin + the parity bar land.

## The binding "π" — the metal READS AS METAL (the binding gestalt), both backends, both modes

`tests-visual/aur-metal.spec.ts` (LOCAL-only real-GPU, rides W-REFLECT3). **The metal "reads-as-metal" is the binding π** (the prompt's explicit requirement). A `<Aurora medium="metal">` surface MUST read as **folded liquid metal** — anisotropic specular ridges with sharp catch-lights in the crests and deep dark valleys — NOT plastic (a round isotropic highlight), NOT a tinted tensor-orientation map (the §1A failure), NOT noise. The π asserts:

1. **Anisotropic directional banding** — the specular runs along the field's ridges (a measurable directional luminance structure aligned with the structure-tensor tangent, distinct from a round isotropic Blinn-Phong blob — the plastic anti-read). The `proof:aur-metal` anti-pattern bite (an isotropic-Blinn-Phong metal REDs) is the device-free half; the π is the visual confirmation.
2. **Crest/valley contrast** — a measurable dark→bright luminance roll-off over a SMALL spatial step (the `N·H` crest term's signature — sharp catch-lights in the crests, deep dark valleys; the §1A "the formula must consume N" made visual). A streak-only metal (no crest) FAILS this — the valleys are not dark.
3. **The catch-light MOVES with the cursor** — a 2-frame capture with the cursor at two positions shows the highlight shifting (the cursor-as-light's spatial variation — the §1A "a constant H degenerates" closed; the catch-light is movable, the §2 fix delivered on BOTH backends).
4. **Twinkle-in-place, no boil** — a multi-frame capture shows the sparkles twinkling at FIXED positions (the phase-animation; a boiling sparkle field FAILS — the §1c determinism made visual at the real-GPU tier, the orthogonal axis to M5's device-free JS-twin proof).
5. **metal-gradient: smooth base, no phantom banding** — the metal-gradient variant over a smooth base shows the gradient reading SMOOTH in its structureless zones (the coherence gate's visual confirmation — the §3 phantom-banding fix; a streak in the smooth zones FAILS).
6. **The WGSL and GLSL captures agree** — the real-Metal vs ANGLE capture-pair within the calibrated drift (the §2b/§4 "no silent degrade" — metal is the FIRST finish to deliver a real Safari catch-light, the lockstep PROVEN by the capture-pair, not an authored 0.0).
7. **Both modes** — the metal over the light register AND the luminous-dark transmissive base.

The `proof:ba-gestalt` aurora verdict gains the metal + metal-gradient rows; `docs/tranches/BD/audit/visual/W-AUR-METAL-DELTA.md` carries the binding capture.

## Fences

- **OPT-IN, default byte-identical.** metal/metal-gradient reached ONLY by `medium:"metal"`/`"metal-gradient"`; the atom fan-out never auto-selects them; every existing medium + the widened `structureTensorField`'s `.xy`/`.z` callers byte-unchanged (M7).
- **RE-PLUMB `N`, never re-pay the Sobel.** The metal body reads the EXISTING discarded gradient (M3) — no second 8-tap Sobel.
- **BOTH BRDF terms.** streak(WHERE) AND `N·H`(CREST) — a streak-only body is the tinted-tensor-map defect (M4).
- **The light CROSSES to WGSL via `uCursor` z-synthesis.** No phantom `uLightDir` lane; the cursor-as-light synthesizes the missing Z, and it crosses BOTH backends because `uCursor` does (M4 — the §2 fix). The struct gains NO new lane (the knobs pack into the free kuwahara-vec4 slots).
- **The coherence gate is mandatory.** No phantom banding in metal-gradient's smooth zones (M4 — the §3 fix); the shipped `mix(1.0, 0.34, A)` anisotropy form, no `(1-A)` fork.
- **Twinkle-in-place, force-highp.** The sparkle advances the PHASE not the position, a per-cell fixed seed, `highp` hash (M5 — the §1c/§8 boil traps closed; NO sparkle self-exempt from the numeric gate).
- **The `medium`/`finish` split is minted + non-vacuous.** metal/metal-gradient/kuwahara file as `finish`; the grab-bag gets an organizing principle (M6 — the §3 SOTA fix).
- **ONE generalized consumer, no D7.** ONE generic "Metal"/"Brushed Metal" preset, no app name (M7 — the §7 fix; W-AUR-ALBUM is NOT the 2nd consumer).
- **The warm-cream identity holds.** The metal read comes from the SHADING not the hue — an achromatic-warm catch-light, no hue injected (M7).
- **The gate COMPOSES the numeric net, NO false-green.** EVERY parity clause imports `shader-eval-harness.mjs` + splice-follows; a `.test(/mediumMetal/)` name-presence as the parity proof, OR a sparkle self-exempt, is the false-green this wave exists to retire — FORBIDDEN.

## Disposition links

- **`UNIFIED-ROSTER.md:169` (W-AUR-METAL — streak + N·H crest; catch-light from uCursor; twinkle-in-place; ONE generalized demo preset; numeric ΔE no sparkle self-exempt; force-highp hash; ← W-WAVE-FIELD-HARNESS)** → BUILT (the spec; the build user-gated).
- **`EXECUTION-DAG.md:151` (W-AUR-METAL — slots 10/11 monotonic above satin=8/prism=9; metal+metal-gradient DISTINCT; ← W-WAVE-FIELD-HARNESS parity)** → CLOSED.
- **`critique/metallic-aurora.md §1-9` (the THREE phantom claims + the §1A two-term BRDF gap + the §3 grab-bag + the §7 D7 consumer)** → each finding is a clause: §1A→M3+M4 (the re-plumbed N + both terms), §2→M4 (the cursor-light crosses to WGSL), §3→M6 (the medium/finish split), §3.4→M4 (the no-(1-A)-fork), §7→M7 (the generalized consumer), §8→M5 (force-highp). CLOSED.
- **`critique/passd-aurora.md §1-6` (the verified-and-sharpened findings + the FALSE-GREEN aur-kuwahara gate)** → M1's splice-following directly fixes the aur-kuwahara G3 hole the passd-aurora HARDEST-FINDING names; the metal parity gate is the anti-false-green template. CLOSED.
- **`PASSD-FOLD.md §Per-viz amendments (batch A) — W-AUR-METAL`** (re-plumb N, cursor-light z-synthesis, medium/finish split, ONE generalized preset) → each amendment is a clause (M3/M4/M6/M7). CLOSED.
- **DEPENDS: `W-AUR-SATIN` (8) + `W-AUR-PRISM` (9)** (the slot anchors — metal's 10/11 premise requires them landed); **`W-GATE-TRUTH-AUDIT` + `W-WAVE-FIELD-HARNESS`** (the `shader-eval-harness.mjs` numeric net + `PER_VIZ_BARS` — the metal parity gate is theater without the net, the Band-0 prerequisite); **the cursor wiring** (`W-AUR-INTERACT`-class — metal's cursor-as-light reuses the shipped `uCursor` the cursor-swirl already crosses).
