# BD.W-AUR-SATIN — the silky light-bending aurora medium (`uMedium==8`, the satin fold)

**Band 6 (aurora) · depends: W-GATE-TRUTH-AUDIT (the numeric parity net — Band 0) · sequences FIRST of the post-kuwahara medium ladder (`EXECUTION-DAG.md:67`).** SATIN slots `uMedium==8` (the monotonic first free slot above kuwahara==7); W-AUR-PRISM (9) extends the ladder after it; W-AUR-METAL (10/11) extends after PRISM. The `satisfies Record<AuroraMedium,number>` total-map forces the slot coordination, so SATIN MUST land before PRISM/METAL or their `satin==8` premise is phantom (the metallic-aurora §8.3 phantom-slot finding made structural). Its parity gate COMPOSES `scripts/lib/shader-eval-harness.mjs` (W-GATE-TRUTH-AUDIT's numeric net) — a real oracle↔shader ΔE with a coefficient-flip bite, NOT the `.test(/fn name/)` regex the aur-kuwahara false-green taught us to never ship.

> **Status:** SPEC (tranche-dev — this file is the PLAN; the `src/` edit is the gated build). Grounded against HEAD `mediums.glsl.ts:40-91` (the discarded Sobel `N`), `aurora-mediums.wgsl.ts:300-312` (the WGSL `applyMedium` dispatch), `uniformBridge.ts:42-56` (`MEDIUM_ID` stops at `kuwahara:7`), `uniformBridgeWGPU.ts:24-26` (the scalar lanes end at the `kuwahara` vec4 off 560), `presets.ts:61-76` (the `AuroraMedium` union).

## The defect / the ask

The aurora medium pool ships 8 members stopping at `kuwahara:7` (`uniformBridge.ts:42-56`). The BD aurora band wants a **satin** medium — a silky, light-bending sheen (the soft anisotropic specular of brushed silk / a satin-finish surface: a broad, low-contrast directional gleam that follows the field's own flow, distinct from metal's sharp high-contrast crest). The PASSD-FOLD `Per-viz amendments (batch A)` names the metal wave's specifics but SATIN is the gentler sibling that lands FIRST and establishes the slot-8 anchor the whole ladder coordinates from.

The cardinal constraint (the kuwahara precedent's RIGHT half): **SATIN is OPT-IN, the default byte-identical.** A `medium:"satin"` config is reached ONLY by explicit selection; `MEDIUM_ID[cfg.medium]` (`uniformBridge.ts:135`) maps it, `mediumSatin()` is a new GLSL+WGSL body, and the smooth default + the van-Gogh HERO + every shipped medium render byte-unchanged (every existing `proof:aurora-*` gate + the W-AURORA-WGSL parity surface stay GREEN by construction — SATIN adds a new dispatch ARM, never touches an existing one).

## The mechanism

ONE new medium body, present on BOTH backends in lockstep (the "NO silent Safari degrade" mandate — SATIN is NOT an oil/vangogh-class WGSL-degrades-to-kuwahara medium; it ports FULLY to WGSL because its math is cheap single-pass arithmetic, fully transpilable). The satin look = a broad anisotropic sheen built from the SHIPPED structure-tensor + the field's own luma.

### 1. The satin BRDF — a BROAD anisotropic gleam (the silk read, NOT metal)

`mediumSatin(col, p, t)` reuses the ONE `structureTensorField(p, t, flowField(p,t))` call (`mediums.glsl.ts:40` — 8 `sampleBase` luma taps, ALREADY paid for the tensor; no new Sobel) to get the edge-tangent `T = stf.xy` + coherence `A = stf.z`. The sheen is a **broad** Kajiya-Kay streak — the DISTINGUISHING knob vs metal: satin uses a LOW specular exponent (`SATIN_SHININESS`, default `≈ 6.0`, a soft wide lobe) where metal uses a HIGH one (sharp narrow crest). The streak:

```
float TdotH = dot(T, normalize(lightDir2D));     // 2D proxy half-dir (see §2)
float sinTH = sqrt(max(1.0 - TdotH * TdotH, 0.0));
float sheen = pow(sinTH, SATIN_SHININESS);        // BROAD lobe — the silk gleam
```

- The sheen is **gated on coherence `A`** (the metallic-aurora §3 fix applied preemptively): `sheen *= smoothstep(0.0, SATIN_COHERENCE_FLOOR, A)` so flat zones (`A≈0`) carry NO phantom banding — a satin surface gleams along its ridges, the flat field stays the smooth base. This is the lesson the metal critique surfaced (§3.4 second concern): NEVER paint a streak along the arbitrary fallback flow in a structureless zone.
- The sheen tints toward a **warm-cream light-bend**, NOT a colored highlight: `col = mix(col, col * SATIN_GLEAM_GAIN + vec3(SATIN_WARMTH), sheen * uStrokeAmount)` — the warm-cream identity holds (the fence — no ppmycota hue, no album palette). `SATIN_GLEAM_GAIN ≈ 1.18` lifts the lit ridges; `SATIN_WARMTH ≈ 0.02` is a sub-perceptual warm-white floor so the sheen reads as light passing through silk, not a gray streak.
- The lobe WIDTH rides the SHIPPED anisotropy parameterization (the metallic-aurora §3.4 first concern — DO NOT introduce a `(1-A)` fork): `aniso = mix(1.0, 0.34, A)` exactly as `mediums.glsl.ts:411` (the kuwahara precedent). The satin body reuses that form verbatim; a `(1-A)` re-spelling is a gate-caught fork.

### 2. The light-direction proxy — `uCursor`-derived, NOT a new struct lane

SATIN needs a "light direction" for the half-vector. The WGPU struct has NO `uLightDir` lane (`uniformBridgeWGPU.ts:10-27` — confirmed: cursor at off 64, scalars end at kuwahara off 560; the metallic-aurora §2 phantom-substrate finding). Rather than add a struct lane (deferred to W-AUR-METAL where the crest term NEEDS a real 3D light), SATIN uses a **static screen-space anisotropy axis** the broad lobe tolerates: `lightDir2D = SATIN_LIGHT_AXIS` (a fixed `vec2(0.6, 0.8)` constant — a gentle from-upper-right gleam, the satin-fabric convention). A broad lobe is light-position-INSENSITIVE (the silk sheen barely moves as the light rakes), so a static axis is honest for satin — it is metal's sharp crest that demands a movable light (and W-AUR-METAL pays the struct-lane cost there). The fence: SATIN does NOT claim a "cursor-as-light" interaction it cannot deliver on WGSL; its gleam is a static-axis sheen, and the cursor swirl (the field warp, `aurora.frag.ts:300-318`) is the orthogonal interaction that already crosses both backends.

### 3. The dispatch — both backends, lockstep

- **GLSL** (`mediums.glsl.ts` POST_BRUSH block + `aurora.frag.ts:406`): append `mediumSatin()` body + `else if (uMedium == 8) col = mediumSatin(col, pN, t);`.
- **WGSL** (`aurora-mediums.wgsl.ts:300`): append `fn mediumSatin(...)` + an `if (medium == 8) { return mediumSatin(col, p, t); }` ARM to `applyMedium` — SATIN renders FULLY on WebGPU (the math is transpilable single-pass arithmetic; it does NOT join the oil/vangogh kuwahara-degrade cohort). This is the "NO silent Safari degrade" mandate the metal critique demanded — and because SATIN's body is the SAME math on both backends, its W-GATE-TRUTH parity ΔE is a REAL lockstep number, not a degrade-honest hedge.
- **Bridges:** `MEDIUM_ID.satin = 8` (`uniformBridge.ts:42-56`); the `AuroraMedium` union (`presets.ts:61`) gains `"satin"`; the `satisfies Record<AuroraMedium,number>` forces the slot. NO new uniform lane is needed (SATIN reads `uStrokeAmount`/`uStrokeScale` — the existing painterly scalars — for its intensity; the static light axis is a shader constant).

### 4. The medium-vs-finish classification (recorded, not built here)

SATIN is a genuine **medium** (a surface substance — a satin/silk material the field is rendered AS, like oil or watercolor), NOT a post-FILTER (kuwahara). It files correctly under `medium`. The `medium`/`finish` SPLIT axis (which kuwahara is mis-filed against) is MINTED by W-AUR-METAL (the wave that adds the second post-filter-class member and so MUST name the axis); SATIN records that it is medium-class and defers the axis mint downstream. (Why here: SATIN is the right place to RECORD the taxonomy because it is the first new medium since kuwahara; building the split here would be premature — the split needs ≥2 finish-class members to be non-vacuous, and metal supplies the second.)

### 5. ONE generalized demo preset (NOT album/iOS-27)

A single `AURORA_SATIN_PRESET` in `presets.ts` — a generic "Silk" register (warm-cream satin sheen over the smooth nuclei field), NO app name, NO `album`/`iOS-27`/`now-playing` in the identifier (the D7 fence — `generalize-no-hardcoded.md` rows). The demo `substrates/aurora.vue` adds "Satin" to its medium selector. Born with the demo exerciser; the ≥2-consumer bar is met by the medium being a first-class register on the published `<Aurora medium="satin">` surface (any backdrop consumer reaches it) — NOT a contrived second consumer.

## The gate — proof:aur-satin (born-RED → GREEN) + the COMPOSED numeric parity

`scripts/proof-aur-satin.mjs`, `tags: ["local","ci"]`. The parity clause COMPOSES `shader-eval-harness.mjs` (W-GATE-TRUTH-AUDIT) — this is the binding anti-false-green requirement (NO `.test(/mediumSatin/)` name-presence as the parity proof).

- **S1 — the medium exists on BOTH backends + slots 8.** `MEDIUM_ID.satin === 8` (read off `uniformBridge.ts`), the `AuroraMedium` union carries `"satin"`, `mediumSatin` is DEFINED in BOTH `mediums.glsl.ts` (GLSL) AND `aurora-mediums.wgsl.ts` (WGSL, read via `resolveSplices(aurora.wgsl.ts)` — the splice-following discipline so the gate sees the spliced body, NOT the empty literal file), AND `applyMedium`'s WGSL dispatch carries an `if (medium == 8)` arm. A WGSL body absent / a missing dispatch arm REDs (the "NO silent degrade" assert — SATIN must NOT fall through to kuwahara like oil/vangogh do).
- **S2 — the NUMERIC parity ΔE (the real number, no degrade).** Via `shader-eval-harness`: `sampleOracle` over a JS twin of the satin sheen math (a `satinSheen.ts` evaluator the gate imports — the streak `pow(sinTH, SATIN_SHININESS)` + the coherence gate + the warm-cream mix, the SAME math the shaders carry), `sampleShader` over BOTH the transpiled GLSL `mediumSatin` body AND the spliced WGSL `mediumSatin` body at the SAME deterministic `(p,t)` lattice, then `fieldDeltaE` → assert `≤ PER_VIZ_BARS.satin` (a recorded tight bar in `docs/tranches/BD/audit/parity-bars.md`, calibrated to catch the smallest meaningful sheen drift — the D2 calibration discipline). The GLSL twin and the WGSL twin MUST agree with the oracle AND each other within the bar — a real lockstep number, not an authored `0.0`.
- **S3 — the coherence gate is LIVE (no phantom banding).** The harness samples the sheen in a STRUCTURELESS lattice region (`A≈0`, a flat nuclei interior) and asserts the sheen contribution is `< SATIN_FLAT_FLOOR` (≈ 0.02) — the metallic-aurora §3 "fade the streak to zero as A→0" requirement made numeric. A satin body that paints a streak in flat zones (the `(1-A)` widen-without-gate failure) produces a non-trivial flat-zone sheen and REDs.
- **S4 — the default byte-identical fence.** A `medium:"smooth"` (and every NON-satin medium) config's assembled GLSL/WGSL is byte-identical to the pre-wave tree EXCEPT the appended `mediumSatin` body + the single dispatch arm (a structural diff assert — the new body is ADDITIVE, no existing arm edited). `warpModeFor`/the atom fan-out NEVER auto-selects satin.
- **S5 — the fences + the medium-class record.** No `(1-A)` anisotropy fork (the gate scans the satin body for `mix(1.0, 0.34, A)`, the shipped form; a `1.0 - A` re-spelling REDs); no album/iOS-27 token in the preset identifier (the D7 raw-string scan); the satin warmth stays warm-cream (`SATIN_WARMTH` is a warm-white floor, no hue injected — a `--section-color`/ppmycota literal in the satin body REDs); SATIN records `medium`-class in the taxonomy note (the split itself is W-AUR-METAL's).

**Self-test bites (each planted defect MUST red, via the harness coefficient-flip discipline):** (a) `SATIN_SHININESS 6.0 → 60.0` (a metal-sharp crest masquerading as satin) → the sheen-distribution moves > bar → S2 RED (a satin-is-actually-metal bite); (b) the coherence gate deleted (`sheen *= 1.0` instead of `smoothstep(...,A)`) → the flat-zone sheen clears `SATIN_FLAT_FLOOR` → S3 RED; (c) the WGSL `applyMedium` arm routes `medium==8` into `mediumKuwahara` (a silent degrade) → the WGSL ΔE diverges from the GLSL > bar → S1/S2 RED; (d) a `(1-A)` anisotropy fork → S5 RED; (e) a faithful re-transcription → ΔE ≈ 0, all GREEN (the identical control); (f) a sub-threshold sheen drift (`SATIN_GLEAM_GAIN 1.18 → 1.179`) → PASS (the bar is not a hair-trigger).

**What reds on the pre-wave tree:** S1 (no `mediumSatin`, `MEDIUM_ID` stops at 7), S2/S3/S5 (no body to evaluate) — born-RED by construction; GREEN only after the GLSL+WGSL bodies + the dispatch arms + the bridge slot + the JS twin + the parity bar land.

## The binding "π" — the satin SHEEN reads as silk, both backends, both modes

`tests-visual/aur-satin.spec.ts` (LOCAL-only real-GPU, rides W-REFLECT3). The binding gestalt: a `<Aurora medium="satin">` surface reads as a **silky, light-bending sheen** — a broad soft directional gleam along the field's flow, distinct from BOTH the flat smooth default (no gleam) AND metal's sharp crest (a narrow high-contrast catch-light). The π asserts: (1) the sheen is present (a measurable luminance lift along the coherent ridges vs the smooth-default ground); (2) the lobe is BROAD (a low spatial-frequency luminance variation — the silk read, not metal's sharp edge — measured as the ridge-gleam's spatial gradient being GENTLE); (3) the flat-zone is gleam-free (the S3 coherence gate's visual confirmation); (4) both modes (the dark register's satin reads over the luminous-dark transmissive base); (5) the WGSL and GLSL captures agree (the real-Metal lockstep — the W-REFLECT3 capture-pair). The `proof:ba-gestalt` aurora verdict gains a satin row.

## Fences

- **OPT-IN, default byte-identical.** SATIN is reached ONLY by `medium:"satin"`; `warpModeFor`/the atom fan-out never auto-selects it; every existing medium renders byte-unchanged (S4). The kuwahara precedent's RIGHT half.
- **FULL lockstep, NO silent Safari degrade.** SATIN ports FULLY to WGSL (cheap transpilable math); it does NOT join the oil/vangogh kuwahara-degrade cohort. Its parity is a REAL lockstep ΔE (S2), the honest answer to the metal critique's "is it ACTUALLY ported or the 4th silent degrade" question — for satin, ACTUALLY ported.
- **The warm-cream identity holds.** The sheen is a warm-white light-bend, no hue injected (S5). Presets-in-consumers: a colored-satin preset lives in a consumer, never the library satin body.
- **The shipped anisotropy form, no fork.** `mix(1.0, 0.34, A)` verbatim (the kuwahara precedent); no `(1-A)` re-spelling (S5).
- **The coherence gate is mandatory.** No phantom banding in flat zones (S3 — the metallic-aurora §3 fix applied preemptively).
- **medium-class, the split deferred.** SATIN records its `medium` classification; the `medium`/`finish` split axis is W-AUR-METAL's (it needs the 2nd finish-class member to be non-vacuous).
- **The gate COMPOSES the numeric net.** S2/S3 import `shader-eval-harness.mjs`; a `.test(/mediumSatin/)` name-presence as the parity proof is the false-green this whole tranche exists to kill — FORBIDDEN.

## Disposition links

- **`UNIFIED-ROSTER.md:77` (W-AUR-SATIN — `uMedium==8`, the silky light-bending fold)** → BUILT (the spec; the build user-gated).
- **`EXECUTION-DAG.md:67` (W-AUR-SATIN, the silky fold — FIRST of the post-kuwahara ladder)** → the slot-8 anchor PRISM(9)/METAL(10/11) coordinate from. CLOSED.
- **`critique/metallic-aurora.md §3.4` (the coherence-semantics / phantom-banding / anisotropy-fork findings)** → applied preemptively to SATIN (S3/S5) so the gentler sibling never ships the metal critique's bugs. CLOSED.
- **`PASSD-FOLD.md §Per-viz amendments (batch A) — W-AUR-METAL` (the slot-8/9 phantom)** → SATIN landing FIRST de-phantoms the `satin==8` premise the whole ladder assumes. CLOSED.
- **DEPENDS: `W-GATE-TRUTH-AUDIT`** (the `shader-eval-harness.mjs` numeric net + `PER_VIZ_BARS`) — SATIN's parity gate is theater without it. The Band-0 prerequisite edge.
- **PREREQUISITE FOR: `W-AUR-PRISM` (9) → `W-AUR-METAL` (10/11)** — the monotonic ladder; SATIN's slot-8 is the anchor.
