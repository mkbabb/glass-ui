# AX.W11 — Aurora color seams: OKLCh catch-light + the shared palette-ramp twin

**Band** C · AURORA · **Severity** major · **dependsOn** AX.W07 (the aurora core unblock — a black canvas
has no color seam to perfect) · **Charter** AX.md §3 (the `### AX.W11` block, lines 706-736) + §4 note 7
(the OKLCh migration is GENUINELY LANDED — this is SEAM-level, NOT a redo) + §2b band-C precept row ·
**Audit** `deep-audit-corpus.json` slice `aurora-color-spaces` (index 7) findings **F1** (the sRGB-literal
catch-light), **F3** (the WGSL `samplePalette` incomplete twin + the gate hole), **F0** (the README
doc-lie planned→landed sweep) — F2/F4 (the two derive doors + the temperature-pole model) route to
**AX.W10**, NOT here · **Converge** `constellation-analysis-corpus.json` slice 29 harden:aurora-blob (the
`warmCatchLight`↔blob `warmCream` cross-band ordering — the load-bearing disjointness note), slice 4
hist:speedtest (the OKLab-LUT muddy-middle CPU-side re-spacing input), slice 5 hist:muster (the
`deriveAuroraFromColor` VAL-1 kill-gate flag — RATIFY), slice 27 precept-alignment (canonical-readme-shape
+ STYLE bind the README sweep), slice 6 hist:words (words is a prospective `<Aurora>`-backdrop README
beneficiary).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **backend palette-ramp equivalence** witness that does NOT exist at HEAD
`eaba94f`, plus two grep-falsifiable seam witnesses. The OKLCh migration itself is LANDED + machine-locked
(§4 note 7) — these are the two SEAM leaks the W5 migration missed plus the doc-lie, NOT a migration redo.

- **RED witness 1 (the headline — the WGSL `samplePalette` is an INCOMPLETE color twin; the gate has a
  hole).** The GLSL `samplePalette` (`composition.glsl.ts:14-29`) applies (a) a `smoothstep(0.0,1.0,t)`
  ease on the inter-stop parameter (`:20`) and (b) an OKLCh hue-arc branch `mixPaletteOklchArc(a,b,t,uHuePath)`
  when `uHuePath == 2 || == 3` (`:25-26`, the deliberate-rainbow-travel path). The WGSL twin
  (`aurora.wgsl.ts:113-123`) does a **plain `oklabToLinearSrgb(mix(labA,labB,f))`** (`:123`) with **NO
  smoothstep ease** and **NO huePath branch** — it has no `huePath` uniform at all. So on a WebGPU-capable
  browser the palette ramp eases differently AND a `huePath:'increasing'` rainbow config silently renders
  as a flat OKLab lerp — a visible divergence from the WebGL2 path the module header claims is byte-parity.
  The falsifiable RED assertion: *feed BOTH ports (the GLSL `samplePalette` oracle + the WGSL twin) a
  witness stop pair across a distant-hue arc + `huePath:'increasing'`, sample the ramp at t∈{0.25, 0.5,
  0.75}, and assert |Δ| < 1e-6 — at HEAD the WGSL twin is off the GLSL oracle by the smoothstep ease + the
  entire hue-arc (RED). After the wave both ports splice the SAME shared ramp chunk and the delta clears
  1e-6 (GREEN).* `proof:aurora-wgsl-equivalence` certifies ONLY the shared CHUNK (the OETF/matrices/FBM in
  `procedural-color.glsl.ts`) to 1e-6 against the GLSL oracle — it does **NOT** certify `samplePalette`, so
  this ramp divergence slips every gate today (the gate hole is the second half of the RED).

- **RED witness 2 (the catch-light is an undisciplined sRGB literal — grep-falsifiable).** Aurora's impasto
  relight tint defaults to a **raw RGB literal `[1.0, 0.95, 0.88]`** (`uniformBridge.ts:317`,
  `cfg.lightColor ?? [1.0, 0.95, 0.88]`), declared "warm-white tint (linear)" in the shader
  (`aurora.frag.ts:128`) and fed straight into `mediums.glsl.ts:191` (oil-pastel waxy sheen) +
  `brush.glsl.ts:211-212` (impasto diffuse+specular) as a LINEAR multiplier with NO OKLCh derivation. By
  contrast the blob's equivalent catch-light IS OKLCh-derived: `metaball.frag.ts:359` builds `warmCream`
  via `oklabToLinearSrgb(oklchToOklab(vec3(0.97, 0.03, radians(85.0))))` — a principled OKLCh white. RED
  (grep-falsifiable): `grep "1.0, 0.95, 0.88" src/components/custom/aurora/composables/uniformBridge.ts` =
  1 hit (the eyeballed literal); `grep "warmCatchLight" src/composables/color/index.ts` = 0 (no shared
  OKLCh catch-light helper exists). The "OKLCh everywhere" invariant is violated at exactly the catch-light
  seam — blob lights in OKLCh, aurora lights with an undisciplined sRGB-ish triple.

- **RED witness 3 (the README is a shipped doc-lie — grep-falsifiable).** `aurora/README.md` describes the
  DONE OKLCh migration as future work: `:312` "Palette interpolation is currently linear-sRGB; OKLCh is the
  next color step", `:314` "**(planned — AW.W5)** moves the interpolation...into OKLCh", and the proof-gate
  table marks `proof:aurora-oklch-interp`/`proof:aurora-derive-gamut` as "planned". The migration is
  genuinely LANDED + gated (`composition.glsl.ts:14-29` OKLab interp, `aurora.frag.ts` OKLCh
  saturate3/brokenColorJitter, YIQ deleted; all 22 color gates registered in `package.json`). RED:
  `grep -c "planned — AW" src/components/custom/aurora/README.md` = **8** stale tags (12 of ~14 across
  README+DESIGN+blob-README per the audit) over code that shipped — the doc-vs-reality face of the
  cardinal headless-green/visually-broken gap.

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

Close the two OKLCh seam leaks the W5 migration missed — derive aurora's default warm-white catch-light
from a shared OKLCh `warmCatchLight(L,C,h)` `/color` helper, and hoist the palette-ramp interpolation
(smoothstep ease + huePath hue-arc dispatch) into the shared `procedural-color` chunk as GLSL+WGSL twins so
the ramp can never drift between backends — then sweep the aurora/DESIGN/blob READMEs from "planned" to
"landed" keyed off the registered proof gates.

---

## Scope (the gestalt fix — no workaround, no legacy, no migration redo)

§4 note 7 is binding: the OKLCh migration is GENUINELY LANDED + machine-locked (the `/color` leaf, both
GLSL shaders, and the blob are value.js-Ottosson single-sourced; zero live HSL/YIQ/sRGB-luma paths). Do
**NOT** re-litigate the migration. The audit's four §2.3 findings are SEAM-level; this wave owns the two
seam leaks (F1, F3) + the doc-lie sweep (F0). Three cohesive parts:

1. **OKLCh-derive the catch-light — one shared `/color` helper for BOTH surfaces (slice 7 F1, minor root).**
   Add a `warmCatchLight(L, C, hDeg) → [number, number, number]` CPU helper to the `/color` leaf
   (`src/composables/color/index.ts`) that returns a LINEAR triple via the leaf's existing Ottosson
   primitives (`oklchToLinear` — the aurora linear-bake target already exported at `:54`). Re-point
   aurora's `lightColor` default at `uniformBridge.ts:317` from the eyeballed `[1.0, 0.95, 0.88]` literal
   to `warmCatchLight(L, C, h)` with the OKLCh anchor that reproduces the warm-white (the blob's
   `(0.97, 0.03, 85°)` anchor is the principled reference — pick the anchor that lands the same perceptual
   warm-white, ratified against the live aurora relight). Keep the uniform a linear `vec3` (correct for the
   in-linear add) — the derivation moves to OKLCh CPU-side, NOT into the shader. Expose `lightColor` so a
   consumer can author it as an `{L, C, h}` OKLCh anchor, not a raw triple, deleting the magic literal and
   unifying the two surfaces' light models on the OKLCh core.

   **RATIFY-BEFORE-IMPL — the cross-band `warmCream` re-route is W15's, NOT W11's (slice 29 harden, the
   load-bearing disjointness decision).** The helper is consumed by BOTH aurora's `lightColor` AND the
   blob's `warmCream` (`metaball.frag.ts:359`). But `metaball.frag.ts` is a BLOB file (band D · W15 "lit
   warm-cream default") with NO ordering relation to W11 (band C · dependsOn W07). To avoid two waves
   editing the same `warmCream` seam with no ordering: **W11 hoists `warmCatchLight` into `/color` and
   re-points ONLY aurora's `lightColor` default; W11 does NOT touch `metaball.frag.ts`. The blob `warmCream`
   re-route onto the shared helper is W15's (it owns the blob default identity), and W15's dependsOn gains
   `+= AX.W11`.** This is the recommended disposition (slice 29 action option (a)) — the orchestrator
   ratifies it before W11 impl so the `metaball.frag.ts` FileBounds collision is structurally impossible.
   (The CPU-side `warmCream` blob analog stays a blob shader constant until W15; W11 only proves the helper
   reproduces it perceptually so W15 inherits a drop-in.)

2. **Hoist the palette-ramp to the shared chunk as GLSL+WGSL twins (slice 7 F3, major root).** Move the
   palette-ramp interpolation — the `smoothstep(0,1,t)` t-ease AND the OKLab-rectangular-vs-OKLCh-hue-arc
   dispatch on `huePath` (the `mixPaletteOklab` vs `mixPaletteOklchArc` branch) — into the shared
   `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` chunk as **GLSL+WGSL twins, exactly as
   the OETF / OKLCh matrices / FBM_ROT already are** (the chunk already carries certified GLSL+WGSL twin
   sections — this follows the established AV.W1 two-copy-elimination convergence pattern). Both
   `samplePalette` implementations then SPLICE the shared ramp chunk — the GLSL `composition.glsl.ts:14-29`
   and the WGSL `aurora.wgsl.ts:113-123` — so the ramp can NEVER drift between backends. Carry the
   `huePath`/`stopCount` uniform into the WGSL struct (the twin has no `huePath` uniform today). Per the
   W07 disjointness, the WGSL `samplePalette` does not paint by default (`WEBGPU_PARITY === false`) — but
   the shared-chunk hoist + the gate extension are W11's so the twin is CORRECT-BY-CONSTRUCTION the moment
   W14 enables the opt-in path (W11 closes the seam W07 explicitly left to W11; W14 inherits a parity-true
   ramp). speedtest names the OKLab-LUT muddy-middle desaturation as a CPU-side LUT re-spacing (keep the
   shader linear mix) — that is INPUT for the catch-light/ramp seam shape (the re-spacing is a CPU bake
   concern, not a shader-ramp change), recorded but NOT a W11 shader edit.

3. **The README planned→landed sweep — keyed off the registered gates, canonical-readme-shape conformant
   (slice 7 F0, major root + slice 27).** Sweep `aurora/README.md` + `DESIGN.md` + the blob `README.md`
   from "planned" to "landed" as ONE editorial pass keyed off the registered proof gates: every
   `(planned — AW.Wn)` whose gate is in `package.json` becomes a "landed, gated by `proof:X`" line (the 12
   of ~14 stale tags; 8 in aurora/README alone at `:312/:314/:265/:153/:291/:337/:359/:385`). Re-point the
   stale source line refs (`aurora.frag.ts:276/:284/:339` are wrong post-splice — the OETF is now at the
   splice boundary). The sweep is keyed off the *currently-registered* gates per finding, NOT hand-edited
   from memory. **Per slice 27 the sweep CONFORMS to `canonical-readme-shape.md`** (the five canonical
   sections — Install/Usage/Documentation/Contributing/License — with the substantive product body BELOW
   them) **and `STYLE.md`** (no "ported from"/version-history/grandiloquence/marketing-voice; banned words
   "showcase/leverage/robust/tapestry"; unspaced em-dashes; no epanorthosis). The "research-backed" body
   sits in the sections BELOW the canonical five, never as a marketing preamble. Per slice 6, the aurora
   README's use-case list adds the "warm low-intensity page-backdrop" case (words is a prospective
   `<Aurora>`-backdrop consumer — a downstream beneficiary of the aurora band).

**Explicitly OUT of W11 scope (routes elsewhere):**
- The two seed→config derive doors (`deriveScene` dead substrate + `resolveAtoms` survivor) and the dead
  `deriveScene`/`AuroraMood` excision (slice 7 F2) → **AX.W10** (the derive-consolidate / atoms-door wave).
- The temperature-pole magic-number model (`applyTemperature`'s `±22°` nudge vs the documented `70°/250°`
  poles, slice 7 F4) → **AX.W10** (folded into the single derive door).
- The blob `warmCream` re-route onto `warmCatchLight` (`metaball.frag.ts:359`) → **AX.W15** (the blob owns
  its default identity; W15 dependsOn `+= W11`; the RATIFY decision in scope item 1).
- The WGSL `samplePalette` does not PAINT by default until W14 flips `WEBGPU_PARITY` (W07/§4 note 14) — W11
  fixes the ramp CORRECTNESS + the gate hole; W14 enables the opt-in path that exercises it live.
- **The `deriveAuroraFromColor` PUBLIC derive-color door (the §2.3 "derive-color variant" = the AS-P2
  VAL-1 highest-stakes kill-gated chronic, slice 5).** W11 does OKLCh catch-light + ramp SEAM work; it does
  **NOT** ship the public `deriveAuroraFromColor` surface. **RATIFY (the orchestrator decision the charter
  flagged):** the public derive-color door ships ONLY when value.js K.W4 lands the 2nd live consumer, ELSE
  value.js executes the VAL-1 KILL. This wave does NOT pre-ship it (substrate-without-consumer trap) and
  does NOT pre-kill it — it RECORDS the kill-gate trigger + the "designed != adopted; speedtest hand-rolls
  the equivalent but is not the published 2nd consumer" caveat so AX neither silently ships nor silently
  drops it. The decision is carried to W10 (the derive-consolidate wave) / the W34 cross-repo annex, not
  resolved inside the W11 color-seam scope.

---

## SOTA deepening (aurora research)

The 32-facet corpus is emphatic on this wave: **the OKLCh color core is already at SOTA — eight things the
engine does are confirmed-correct by the literature** — so W11 stays SEAM-LEVEL (catch-light derive + ramp
twin hoist + doc sweep), NOT a color-core redo. Cited facets: **0** (OKLab/OKLCh interpolation), **1**
(gamut mapping), **2** (color harmony), **3** (seed→skyscape palette), **29** (tonemap/dither).

**CONFIRMED-CORRECT — the eight things the corpus says the engine already gets right (do NOT re-litigate):**

1. **Linear-light compositing + a single sRGB OETF close** — facet 0's "non-negotiable substrate"; the AV.W1
   "~2.2× too dark" defect was exactly the missing-OETF failure, now landed (`proof:aurora-space-gamma`).
2. **OKLab-rectangular interpolation for adjacent stops** — facet 0's "muddy-midpoint kill"; the engine's
   `mixPaletteOklab` is Aras' named guidance (rectangular for two-color pairs, NOT OKLCh-polar).
3. **The four CSS-Color-4 hue-arc methods** (shorter/longer/increasing/decreasing) — facet 0/2; the engine's
   `mixPaletteOklchArc` + the `HARMONY_METHOD` map (complementary/split→longer, analogous/mono→shorter,
   triad→increasing) is "the named CSS-gradient-era fix."
4. **Bell-curve chroma** (saturated body, calm edges via `sin(πt)`) — facet 0/28; the `bell()` helper matches
   the painterly "saturated body, calm edges" recommendation verbatim.
5. **Warm-light/cool-shadow temperature coupling** — facet 0/2/3/28's single most-cited painting rule; the
   engine ships `temperatureShift`/`applyTemperature` (the magic-number tightening is W10's, not a color-core
   defect).
6. **IGN dither in DISPLAY space after the OETF** — facet 0/3/29; Jimenez IGN at 1/255 is "the highest-ROI
   move for flat gradients" and the engine already lands it.
7. **The Ottosson cusp twins in value.js** — facet 1/2; `findCusp`/`findGamutIntersection`/
   `computeMaxSaturation`/`deltaEOK`/`DELTA_E_OK_JND` are ALREADY shipped (the gamut machinery exists, it is
   the SHADER-side call site that under-uses it).
8. **The column-major Ottosson matrices, single-sourced** — facet 21; the verbatim GLSL↔WGSL twin is
   byte-identical and sound.

**SEAM-LEVEL UPGRADES the corpus routes INTO W11 (the two seam leaks + the doc sweep, not a redo):**

- **The catch-light OKLCh derive (scope item 1) is the warm-light coupling rule applied to the light model
  [facets 0, 3, 28].** The eyeballed `[1.0, 0.95, 0.88]` literal is the unprincipled seam; deriving it from
  a shared `warmCatchLight(L,C,h)` OKLCh anchor (the blob's `(0.97, 0.03, 85°)` reference) is the warm-white
  the temperature-coupling literature prescribes — one OKLCh derive unifying both surfaces' light models.
- **The palette-ramp twin hoist (scope item 2) is the muddy-midpoint discipline made structural [facet 0,
  1].** Hoisting the `smoothstep` t-ease + the OKLab-rect-vs-OKLCh-arc dispatch into the shared chunk as
  GLSL+WGSL twins is the two-copy-elimination pattern; the corpus's MIDPOINT CHROMA BUMP (facet 1's
  `C += k·sin(πt)`, "already used in deriveBlobPalette") is the recorded refinement to counter the slight
  chroma sag a straight C-lerp leaves between unequal-chroma stops — INPUT for the ramp shape, not a new edit.

**THE FOUR UPGRADES — where they route (W11 owns one; the gamut/Oklch+ pair is W11-adjacent, P3 is W07/W14):**

- **Cusp adaptive-L0 gamut mapping → the gamut SEAM (W11-adjacent / value.js K.W4) [facets 0, 1, 2].** The
  current `gamutMapStop` 0.999 chroma-shrink loop under-shrinks saturated stops AND over-desaturates (facet
  1's witness: pure chroma reduction grays P3-yellow to chroma ~25 vs the hybrid's ~103). The SOTA is the
  CSS-Color-4 binary-search + deltaEOK-JND (0.02) channel-clip refinement, OR the analytic Ottosson cusp clip
  (project toward `L0=L_cusp` with adaptive α≈0.05 — branch-free, constant-cost, the gradient sweet spot,
  "mind the blue-hue precision dip" with one Halley + one Newton step). value.js ALREADY exposes every
  primitive. This is a CPU-bake upgrade with negligible cost; it is recorded here as the principled successor
  to the shrink loop, gated to the value.js color-leaf seam (W11 hoists the ramp twin; the gamut-map call-site
  swap rides the same `/color` leaf — coordinate with value.js K.W4).
- **The optional Oklch+ path → a documented axis, flag-gated, default-unchanged [facet 0].** Oklch+ (arXiv
  2606.05255: `L'=L^0.73` + Naka-Rushton `C'=C^0.87/(C^0.87+0.34^0.87)`, hue unchanged) reaches STRESS 29
  (~CIEDE2000) vs native OKLab's 47, giving gradients whose perceived rate-of-change is even more uniform. It
  is an OPTIONAL perceptual-correction axis for WIDE-HUE presets only — gated behind a flag, MUST NOT move the
  wispy-sky default (`proof:aurora-atoms-roundtrip`). **OPEN: ratify whether to ship the Oklch+ path at all
  or document-only** (see orchestrator return) — it is all CPU-side and deterministic, but a second
  interpolation space is surface the default never needs.
- **Display-P3 swapchain + fp16 → W07/W14 [facets 0, 1, 11].** Out of W11's CPU-color seam scope — it is a
  swapchain-config decision (the higher P3 cusp `C_max` lets the bell-curve chroma peak actually paint).
  Routed to the WebGPU/canvas waves, flagged in W07's deepening.

**Reconciliation note (binding — no redo of landed work):** §4 note 7 + this corpus AGREE the OKLCh migration
is genuinely landed and machine-locked. W11 is SEAM-level: the catch-light derive, the ramp twin hoist, and
the planned→landed doc sweep. The corpus's confirmation is the citable basis for NOT re-opening the migration
— the eight confirmed-correct facets are the receipts.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/composables/color/index.ts` | ADD `warmCatchLight(L, C, hDeg) → [number, number, number]` — a DOM-free OKLCh→linear helper routing through the leaf's existing `oklchToLinear` Ottosson primitive (no re-implemented math; `proof:single-color-core` keeps the math on value.js). Co-export its type. |
| `src/components/custom/aurora/composables/uniformBridge.ts` | Re-point the `lightColor` default at `:317` from the `[1.0, 0.95, 0.88]` literal to `warmCatchLight(L, C, h)` with the ratified OKLCh anchor; accept an `{L,C,h}` OKLCh anchor form for a consumer-authored `lightColor` (still resolving to a linear `vec3` for `uniform3f` at `:319`). |
| `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` | ADD the palette-ramp interpolation as GLSL+WGSL twins (the `smoothstep` t-ease + the `mixPaletteOklab`/`mixPaletteOklchArc` huePath dispatch), alongside the existing OETF/matrices/FBM twin sections — the single-source ramp both `samplePalette` ports splice. |
| `src/components/custom/aurora/constants/shaders/composition.glsl.ts` | `samplePalette` (`:14-29`) SPLICES the shared ramp chunk instead of inlining the smoothstep + `mixPaletteOklchArc` dispatch (the GLSL stays the byte-identical oracle, now sourced from the chunk). |
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` | `samplePalette` (`:113-123`) SPLICES the shared WGSL ramp twin (gains the smoothstep ease + the huePath hue-arc branch); ADD the `huePath`/`stopCount` uniform carry into the WGSL struct so the branch has its input. (The f32-cast + storage-field struct shape are W07's — W11 edits ONLY the `samplePalette` body + the `huePath` uniform add, on the post-W07 struct.) |
| `scripts/proof-aurora-wgsl-equivalence.mjs` | EXTEND to cover `samplePalette` — feed both ports a witness stop pair + `huePath` and assert 1e-6 over t∈{0.25,0.5,0.75} (closing the gate hole the matrices-only certification leaves open). |
| `src/components/custom/aurora/README.md` | The planned→landed sweep (the 8 stale `(planned — AW)` tags → "landed, gated by `proof:X`"); re-point stale source line refs (`:276/:284/:339`); add the "warm low-intensity page-backdrop" use case; conform to canonical-readme-shape + STYLE. |
| `src/components/custom/aurora/DESIGN.md` | The planned→landed prose sweep (the color-migration invariants are landed; key off the registered gates). |
| `src/components/custom/goo-blob/README.md` | The planned→landed sweep for the blob's stale color-migration tags (READ-ONLY on `metaball.frag.ts` — the README sweep does NOT edit the blob shader; the `warmCream` re-route is W15). |
| `docs/tranches/AX/audit/W11-aurora-color-seams.json` | **NEW** — the wave's born-RED→GREEN audit artefact. |

**OUT of bounds:** `src/components/custom/goo-blob/shaders/metaball.frag.ts` (the `warmCream` re-route is
W15 — W11 only READS `:359` as the OKLCh anchor reference); `atoms.ts` / `presets.ts` / `color.ts`
(`deriveScene`/`resolveAtoms`/`applyTemperature` — W10); `aurora.wgsl.ts` struct shape / `uniformBridge.ts`
pack-split / `renderMode.ts` `WEBGPU_PARITY` (W07 — W11 edits only the `samplePalette` body + `huePath`
uniform on the post-W07 struct); `mediums.glsl.ts` / `brush.glsl.ts` (the catch-light CONSUMERS read the
re-derived uniform unchanged — no edit); `painterly.wgsl.ts` / `wake.wgsl.ts` + the `WEBGPU_PARITY` flip
(W14).

---

## Disjointness (sibling waves it must NOT overlap)

W11 is in band C (AURORA), running after the graphics blockers it depends on. The disjointness contract:

- **vs AX.W07 (aurora core unblock — `aurora.wgsl.ts` struct rewrite + `uniformBridge.ts` pack-split +
  `renderMode.ts` `WEBGPU_PARITY`).** W11 **dependsOn W07**. They SHARE `aurora.wgsl.ts` and
  `uniformBridge.ts` but are DISJOINT IN TIME and by REGION: W07 owns the WGSL STRUCT shape (the f32-cast
  of the five count/enum fields + the `var<storage,read> Field` transposition) and the `packGPUUniforms`
  scalar/array split; W11 edits ONLY the `samplePalette` BODY (splice the shared ramp) + adds the `huePath`
  uniform, on the post-W07 struct, and re-points ONLY the `lightColor` default in `uniformBridge.ts`. W07
  explicitly leaves the WGSL `samplePalette` as the straight-OKLab placeholder + routes "the aurora
  COLOR-SEAM hoist (samplePalette gate hole) → AX.W11" (W07 FileBounds OUT clause). Sequential after W07 —
  no concurrent edit of the same region.
- **vs AX.W10 (aurora options/derive doors — `atoms.ts` / `presets.ts` / `color.ts`).** Disjoint by file.
  W10 owns the seed→config derive doors (`deriveScene` excision + `resolveAtoms` survivor + the
  `applyTemperature` pole model); W11 owns the color SEAMS (catch-light + ramp + README). Both perfect the
  aurora surface; no shared file. Concurrent-eligible (both dependsOn W07).
- **vs AX.W14 (WebGPU painterly parity — `painterly.wgsl.ts`/`wake.wgsl.ts` + the `WEBGPU_PARITY` flip +
  `device.lost`).** W14 **dependsOn W07** (not W11), but INHERITS W11's parity-true `samplePalette`: W11
  closes the ramp drift + the gate hole so when W14 flips `WEBGPU_PARITY` for the opt-in Kuwahara path, the
  WGSL ramp already matches the GLSL oracle. W11 must NOT pre-author the W14 multi-pass / the `WEBGPU_PARITY`
  flip (W14's scope). Disjoint by file.
- **vs AX.W15 (blob contained-droplet + lit warm-cream default — `metaball.frag.ts` `warmCream`).** The
  CROSS-BAND coupling the charter flagged (slice 29). RESOLVED by the RATIFY decision: **W11 does NOT touch
  `metaball.frag.ts`** — it hoists `warmCatchLight` into `/color` and re-points ONLY aurora's `lightColor`.
  **W15 owns the blob `warmCream` re-route** onto the shared helper (it owns the blob default identity), and
  **W15's dependsOn gains `+= AX.W11`** so the helper exists before W15 consumes it. The shared `/color`
  helper is the ONLY surface both bands touch, and they touch it at DIFFERENT times (W11 authors it; W15
  consumes it) — never the same `metaball.frag.ts` seam, never concurrently. This is the explicit ordering
  note slice 29 demanded.
- **vs AX.W08 (blob core unblock — `useMetaballRenderer.ts` + `POS_SCALE`).** Disjoint by file entirely;
  W08 is the blob distance regime, W11 is aurora color seams. No overlap.
- **vs the W33 README live-currency sweep.** W33 captures π-lane README currency at CLOSE; W11 does the
  per-finding planned→landed content sweep for the aurora/DESIGN/blob color-migration tags NOW. W33 inherits
  the swept READMEs as already-landed; W11 does NOT pre-empt the close-time currency capture.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — one cohesive color-seam fold).** Lands the `/color` `warmCatchLight` helper, the
  `uniformBridge.ts` `lightColor` re-point + `{L,C,h}` author form, the `procedural-color.glsl.ts`
  palette-ramp GLSL+WGSL twin hoist, the two `samplePalette` splices (`composition.glsl.ts` +
  `aurora.wgsl.ts` + the `huePath`/`stopCount` WGSL uniform carry), and the three README/DESIGN
  planned→landed sweeps (canonical-readme-shape + STYLE conformant). Does NOT touch `metaball.frag.ts`
  (the blob `warmCream` re-route is W15). Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** (a) Confirms `warmCatchLight(L,C,h)` reproduces the prior
  `[1.0, 0.95, 0.88]` warm-white perceptually (the live aurora relight reads the SAME warm-white, no visible
  shift) AND matches the blob's `warmCream` anchor (so W15's drop-in re-route is a true equivalence).
  (b) Confirms the WGSL `samplePalette` twin now matches the GLSL oracle to 1e-6 over the witness stop pair
  ACROSS `huePath` modes (rectangular + increasing/decreasing hue-arc) at t∈{0.25,0.5,0.75}. ADVERSARIAL
  twists: (i) reverts ONLY the WGSL `huePath` uniform carry (keeps the smoothstep splice) and confirms the
  extended gate STILL goes RED on a `huePath:'increasing'` config (proves the huePath carry is load-bearing,
  not redundant with the ease); (ii) feeds a DISTANT-HUE stop pair (where the OKLab-rectangular midpoint
  desaturates toward grey but the OKLCh hue-arc stays saturated) and confirms the GLSL + WGSL ports now both
  take the arc and agree (the muddy-middle witness); (iii) greps the swept READMEs for any SURVIVING
  `(planned — AW)` tag whose gate IS registered (must be 0 — a survivor is a re-introduced doc-lie) and for
  any banned STYLE word (showcase/leverage/robust/tapestry) the sweep introduced.
- **Gate-author (≤1 agent — born-RED→GREEN).** Extends `scripts/proof-aurora-wgsl-equivalence.mjs` to
  certify `samplePalette` (the witness stop pair + huePath, 1e-6) — the gate-hole close. Confirms the
  extended gate FAILS at `eaba94f` (the WGSL twin's plain-mix diverges from the GLSL smoothstep+arc) and
  PASSES on the patched tree (both splice the shared chunk). Authors the π-lane WebGL2-vs-WebGPU palette-ramp
  parity assertion on a `huePath:'increasing'` config (the VISUAL-TRUTH instrument below).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template — devise an in-FileBounds idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY when genuinely user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated here. This wave's §3a triumvirate AUTO-TRIGGERS (Class-2 → research→plan-augment(Exact-Wave-Amendment-Text)→redress, caps 20/15/30):
- **Out-of-FileBounds reveal** — the color-seam work needs an edit to `metaball.frag.ts` (the `warmCream` re-route at `:359` is W15 — W11 only READS it as the OKLCh anchor reference), to `atoms.ts`/`presets.ts`/`color.ts` `deriveScene`/`resolveAtoms`/`applyTemperature` (W10), to the `aurora.wgsl.ts` STRUCT shape / `uniformBridge.ts` pack-split / `renderMode.ts` `WEBGPU_PARITY` (W07 — W11 edits ONLY the `samplePalette` body + the `huePath` uniform add on the post-W07 struct), or to `mediums.glsl.ts`/`brush.glsl.ts` / `painterly.wgsl.ts`/`wake.wgsl.ts` (the catch-light CONSUMERS read the re-derived uniform unchanged; the painterly path is W14) — NEVER absorbed in-line; HALT and triumvirate. The new OKLCh math MUST route through the `/color` leaf's `oklchToLinear` Ottosson primitive (no re-implemented math — `proof:single-color-core` keeps it on value.js); a reveal that the helper needs new math is a `/color`-leaf scope question → triumvirate.
- **`proof:aurora-wgsl-equivalence` (extended to `samplePalette`) fails non-locally** — the two `samplePalette` ports cannot hit |Δ| < 1e-6 at t∈{0.25,0.5,0.75} across BOTH `huePath:'flat'` (smoothstep-eased OKLab-rectangular) AND `huePath:'increasing'` (OKLCh hue-arc) after both splice the shared `procedural-color.glsl.ts` ramp chunk → triumvirate, never relax the 1e-6 tolerance or fork the twin.
- **The 3rd diagnostic-loop iteration** on the GLSL+WGSL single-source ramp splice (the GLSL stays the byte-identical oracle now sourced from the chunk; the WGSL twin gains the smoothstep + huePath hue-arc branch + the `huePath`/`stopCount` uniform carry) OR the `warmCatchLight(L,C,h)` derivation landing within tolerance of BOTH the prior `[1.0,0.95,0.88]` warm-white AND the blob's `warmCream` anchor (the cross-surface unification W15 inherits) — HALT and triumvirate rather than re-spin.
- **A §5.3 ratify reached un-ratified** (Class-3) — the OKLCh catch-light ANCHOR `{L,C,h}` reached without its ratified value, OR a README-currency `(planned — AW.Wn)` tag whose `proof:Wn` gate is NOT yet registered (a tag the sweep cannot truthfully flip to "landed") → surface to the orchestrator, never self-ratify the anchor or assert an unregistered-gate "landed" claim.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:aurora-wgsl-equivalence` EXTENDED to cover
`samplePalette` (the gate-hole close):

- The gate today certifies ONLY the shared color CHUNK (OETF/matrices/FBM in `procedural-color.glsl.ts`) to
  1e-6 against the GLSL oracle — it does NOT touch `samplePalette`. The extension feeds BOTH ports (the GLSL
  `samplePalette` oracle + the WGSL twin) a **witness stop pair + a `huePath` value** and asserts **|Δ| <
  1e-6** at t∈{0.25, 0.5, 0.75} across (a) `huePath:'flat'` (the smoothstep-eased OKLab-rectangular path)
  AND (b) `huePath:'increasing'` (the OKLCh hue-arc path). **Born-RED at HEAD** (the WGSL twin does a plain
  `mix` with no smoothstep + no huePath branch → the delta is far above 1e-6 on BOTH paths, and is a flat
  lerp on the arc path). GREEN after both `samplePalette` ports splice the shared ramp chunk. This is a
  **generated-code-diff + test-output** artefact (the precept-valid form per SPEC.md §Hard Gates — both
  ports derive from one spliced source, certified numerically), NOT a "grep-found-a-source-string-for-
  runtime-behaviour" invalid form.

- A **catch-light derivation assertion** (test-output): `warmCatchLight(L,C,h)` at the ratified anchor
  returns a linear triple within tolerance of the prior `[1.0, 0.95, 0.88]` warm-white AND of the blob's
  `warmCream` OKLCh anchor (the cross-surface unification witness — the value W15 inherits as a drop-in).

- A **README-currency assertion** (document-reconciliation artefact): 0 surviving `(planned — AW.Wn)` tags
  whose `proof:Wn` gate IS registered in `package.json`, across `aurora/README.md` + `DESIGN.md` + the blob
  `README.md` (the doc-lie close — a registered-gated "planned" tag is a falsified claim).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live aurora demo (`/substrates/aurora`), at **≥ 3 viewports** (375×667 /
1280×800 / 1440×900) in **light AND dark**:

- **WebGL2-vs-WebGPU palette-ramp parity on a `huePath:'increasing'` config** (the charter's named
  VISUAL-TRUTH gate): with `WEBGPU_PARITY` forced `true` for the audit only, render the SAME
  `huePath:'increasing'` rainbow-travel config on BOTH backends and confirm the palette ramp eases + arcs
  IDENTICALLY (the WebGPU twin no longer flat-lerps the rainbow). Sampled centre-band pixels across the ramp
  match the WebGL2 reference within the perceptual threshold. With `WEBGPU_PARITY === false` (the shipped
  state) the live `<Aurora>` paints the correct WebGL2 ramp — the shipped reality is unaffected.
- **The catch-light reads as the SAME warm-white** — the aurora impasto relight (the
  `mediums`/`brush.glsl` consumers of `uLightColor`) paints the warm-cream sheen unchanged from the prior
  literal (no perceptible color shift from the OKLCh re-derivation), confirming the seam fix is invisible to
  the eye (a true equivalence, not a re-tune).
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate — the aurora wash composites
  correctly under the demo chrome at every viewport.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`: the flat-lerp-rainbow WGSL BEFORE vs the
arc-eased AFTER, plus the catch-light same-warm-white confirmation) is the binding close criterion. The
WGSL ramp drift is invisible to every function-level matrices-only gate — only a backend-A/B live render of
a `huePath:'increasing'` config catches the class.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f`:
   (a) the WGSL `samplePalette` plain-mix vs the GLSL smoothstep+arc — render a `huePath:'increasing'`
   config on both backends and confirm the WGSL twin flat-lerps the rainbow (with `WEBGPU_PARITY` forced
   `true` for the diagnosis); (b) `grep "1.0, 0.95, 0.88"` = 1 + `grep "warmCatchLight"` = 0; (c)
   `grep -c "planned — AW"` over the three READMEs ≥ 12. Record in `audit/W11-aurora-color-seams.json` as
   the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate extension.** Extend `proof-aurora-wgsl-equivalence.mjs` to certify
   `samplePalette` (witness stop pair + huePath, 1e-6); confirm it FAILS at HEAD on BOTH huePath paths.
3. **The shared ramp hoist.** Add the palette-ramp GLSL+WGSL twins to `procedural-color.glsl.ts`; splice
   them into `composition.glsl.ts` `samplePalette` (GLSL oracle, byte-identical) + `aurora.wgsl.ts`
   `samplePalette` (WGSL twin) + carry the `huePath`/`stopCount` uniform into the WGSL struct. Lint +
   typecheck. Confirm the extended gate now passes 1e-6 on both paths.
4. **The OKLCh catch-light helper.** Add `warmCatchLight(L,C,h)` to `/color`; re-point `uniformBridge.ts`
   `lightColor` default to the ratified anchor + accept the `{L,C,h}` author form. Confirm the live aurora
   relight reads the SAME warm-white (no shift) and the helper matches the blob `warmCream` anchor. Lint +
   typecheck.
5. **The README planned→landed sweep.** Sweep `aurora/README.md` + `DESIGN.md` + the blob `README.md` keyed
   off the registered gates; re-point the stale source line refs; add the warm-backdrop use case; conform to
   canonical-readme-shape + STYLE. Confirm 0 surviving registered-gated "planned" tags + 0 banned words.
6. **Gate GREEN + VISUAL-TRUTH.** Confirm the extended `proof:aurora-wgsl-equivalence` + the catch-light +
   the README-currency assertions all GREEN; run the VISUAL-TRUTH live audit (the WebGL2-vs-WebGPU
   `huePath:'increasing'` parity + the catch-light same-warm-white, lever forced `true` for the parity
   confirmation then `false` for the shipped-default confirmation); capture the paired-π BEFORE/AFTER +
   DELTA; write `audit/W11-aurora-color-seams.json` to GREEN; record the RATIFY decisions (the W15 warmCream
   ordering + the VAL-1 derive-color carry).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W11-aurora-color-seams.json` — the born-RED→GREEN ledger: the three RED witnesses
  (the WGSL flat-lerp-rainbow A/B + the `[1.0,0.95,0.88]`/`warmCatchLight`=0 grep + the ≥12 "planned" tag
  count), the per-finding disposition (slice 7 F1/F3/F0 ADDRESSED; F2/F4 routed to W10; the VAL-1
  derive-color CARRIED with the kill-gate trigger; the W15 warmCream ordering RATIFIED), and the post-wave
  GREEN measurements (1e-6 samplePalette parity on both huePath paths, the catch-light same-warm-white delta,
  0 surviving registered-gated "planned" tags).
- The EXTENDED `scripts/proof-aurora-wgsl-equivalence.mjs` (the samplePalette gate-hole close — the
  generated-code-diff + numeric certification artefact).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the WGSL flat-lerp-rainbow BEFORE vs the
  arc-eased-parity AFTER on a `huePath:'increasing'` config, + the catch-light same-warm-white confirmation,
  at ≥ 3 viewports × light/dark.
- The swept `aurora/README.md` + `DESIGN.md` + blob `README.md` (planned→landed, canonical-readme-shape +
  STYLE conformant, the warm-backdrop use case added).
- The W00 `pi-manifest.ts` aurora-color-seam row recorded (the samplePalette backend-parity re-probe
  discharged).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): extend proof:aurora-wgsl-equivalence to certify samplePalette born-RED — witness stop pair + huePath, 1e-6 (AX.W11 slice7-F3)`
2. `fix(aurora): hoist the palette-ramp (smoothstep ease + huePath hue-arc) into the shared procedural-color chunk as GLSL+WGSL twins — both samplePalette ports splice one source (AX.W11 slice7-F3)`
3. `feat(color): warmCatchLight(L,C,h) OKLCh helper — derive aurora's lightColor default off the /color leaf, delete the [1.0,0.95,0.88] literal (AX.W11 slice7-F1)`
4. `docs(aurora): planned→landed sweep keyed off the registered gates — aurora/README + DESIGN + blob README, canonical-readme-shape + STYLE conformant (AX.W11 slice7-F0)`
5. `chore(AX.W11): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the W15-warmCream-ordering + VAL-1-derive-color RATIFY records`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W07 (aurora core unblock) — HARD (charter §3 dependsOn AX.W07).** A black canvas has no color seam to
  perfect — W07 must paint a non-black image (the f32-cast + storage-field fix) before W11 can verify the
  palette ramp + catch-light against live pixels. W07 also OWNS the WGSL struct shape W11's `samplePalette`
  splice edits on top of (the `huePath` uniform W11 adds rides the post-W07 struct), and W07 explicitly
  ROUTES "the aurora COLOR-SEAM hoist (samplePalette gate hole) → AX.W11" — W11 is the named owner of the
  seam W07 left as a placeholder.
- **AX.W00 (π visual-runtime lane) — TRANSITIVE (via W07).** W11's VISUAL-TRUTH gate (the WebGL2-vs-WebGPU
  `huePath:'increasing'` palette-ramp parity) runs in the W00 `tests-visual/` workspace + composes W00's
  readback primitives. The only assertion that catches the ramp-drift class is a backend-A/B live render.
- **Downstream:** **AX.W15 (blob lit warm-cream default) dependsOn `+= AX.W11`** — W15 re-routes the blob
  `warmCream` onto W11's `warmCatchLight` `/color` helper (the helper must exist first). This is the
  RATIFIED cross-band ordering (slice 29). **AX.W14 (WebGPU painterly parity)** INHERITS W11's parity-true
  `samplePalette` (when W14 flips `WEBGPU_PARITY` for the opt-in path, the WGSL ramp already matches the GLSL
  oracle — W11 closes the seam W14 would otherwise have to). **AX.W33 (close)** inherits the swept
  planned→landed READMEs as already-landed.
- **Parallel-eligible (NOT a dependency):** W10 (aurora derive doors — disjoint files) and W11 both
  dependsOn W07 and may run concurrently (no shared file).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **AW.W5 (the OKLCh migration)** — moved aurora's interpolation + broken-color + saturation into OKLCh
  (`composition.glsl.ts:14-29` OKLab interp, `aurora.frag.ts` OKLCh saturate3/brokenColorJitter, the YIQ
  matrices deleted). The migration is GENUINELY LANDED + machine-locked (§4 note 7) — this wave is SEAM-level
  cleanup of the two leaks W5 missed, NOT a migration redo. The `uLightColor` `[1.0,0.95,0.88]` literal
  PREDATES W5 (it landed at **AW.W4.2** impasto-relight) and was never folded into the OKLCh discipline when
  W5 converted the rest of the pipeline — the F1 catch-light seam is born here.
- **AV.W1 (the OETF two-copy elimination)** — created `procedural-color.glsl.ts` to delete the duplicated
  OETF the aurora + blob shaders each hand-maintained, single-sourcing the OETF/matrices/FBM_ROT as GLSL+WGSL
  twins both shaders splice. The palette-ramp hoist W11 does FOLLOWS this exact convergence pattern (the chunk
  already has the certified twin sections — W11 adds the ramp as one more twin). This is the architectural
  precedent the F3 fix extends.
- **AW.W7b (the WebGPU substrate swap — `aurora.wgsl.ts`)** — authored the hand-transcribed WGSL twin as a
  "single-pass parity floor", where the color INTERPOLATION nuance (the W5 smoothstep + huePath that landed
  in the GLSL composition stage) was NOT carried into the WGSL `samplePalette` (`:113-123`, the plain
  `mix(labA,labB,f)`). The "NEVER diverge" header claim is real for the matrices, FALSE for the palette ramp
  — the gate hole `proof:aurora-wgsl-equivalence` (matrices-only, `procedural-color.glsl.ts:142-155` note)
  leaves open. The F3 divergence is born here.
- **`eaba94f`** (AW batch-1 integration, UNPUBLISHED) — the audit baseline. The README still describes the
  DONE color migration as "planned" (`:312/:314`, 8 stale tags), the catch-light literal still ships, the
  WGSL twin still flat-lerps — all device-/grep-proven at this HEAD.
- **§4 note 7 (the migration-is-landed reconciliation).** The prompt's hypothesis that the W4/W5/W8 merges
  "regressed the live palette/color" is FALSE; the four §2.3 findings are SEAM-level (the doc-lie, the one
  sRGB-literal catch-light, the dead `deriveScene` door W10 handles, the WGSL palette-ramp gate hole W11
  handles). Do NOT re-litigate the migration.
- **slice 4 hist:speedtest (the OKLab-LUT muddy-middle input).** speedtest names the OKLab-LUT
  muddy-middle desaturation fix as a CPU-side LUT re-spacing (keep the shader linear mix) — INPUT for the
  catch-light/ramp seam shape, recorded; the re-spacing is a CPU bake concern, NOT a W11 shader edit.
- **slice 5 hist:muster + the AS-P2 VAL-1 chronic.** The public `deriveAuroraFromColor` door (the §2.3
  "derive-color variant") is the highest-stakes kill-gated chronic (carried AO→AS on glass-ui 3 tranches,
  G→J on value.js 4) — ships ONLY on value.js K.W4's 2nd live consumer, else the VAL-1 KILL. W11 carries the
  decision + the kill-gate trigger; it does NOT ship or kill the public door (RATIFY, OUT of scope).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-C (AURORA) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path (single-source shader twins).** The palette ramp becomes ONE spliced source (the
  `procedural-color.glsl.ts` GLSL+WGSL twin) both `samplePalette` ports consume — the ramp can NEVER drift
  between backends again, the exact two-copy-elimination the AV.W1 OETF convergence established. The
  catch-light becomes ONE OKLCh derivation (`warmCatchLight` in `/color`) both surfaces' light models share.
  Forbids leaving the WGSL twin as a second hand-maintained ramp copy. MUST NOT VIOLATE — no second
  divergent ramp, no second catch-light derivation.
- **substrate-with-consumer (the helper is consumed, the gate certifies it).** `warmCatchLight` lands WITH
  its consumer (aurora's `lightColor` default) in the SAME wave — never substrate-without-consumer. The
  shared ramp twin lands WITH the extended gate that certifies it (the gate-hole close) AND a second
  consumer in W15 (the blob `warmCream` re-route, RATIFIED ordering). The `deriveAuroraFromColor` PUBLIC door
  is the substrate-without-consumer trap W11 explicitly AVOIDS (carried gated on value.js K.W4's 2nd consumer,
  not pre-shipped) — the J-inv-10 visual-load-bearing-ness bar.
- **no-overfitting.** No speculative atoms / no dead derive door minted here (those are W10's `deriveScene`
  excision). The `warmCatchLight` helper has ≥ 2 named consumers (aurora `lightColor` now + blob `warmCream`
  W15) — it clears the ≥2-consumer bar by construction. MUST NOT VIOLATE — no helper with a single
  speculative future consumer.
- **canonical-readme-shape + STYLE (slice 27, the README authoring authority).** The planned→landed sweep
  CONFORMS to `canonical-readme-shape.md` (the five canonical sections — Install/Usage/Documentation/
  Contributing/License — with the research-backed product body BELOW them, never a marketing preamble) and
  `STYLE.md` (no "ported from"/version-history/grandiloquence; banned words showcase/leverage/robust/tapestry;
  unspaced em-dashes; no epanorthosis). The README is regenerated from CURRENT code + gate truth, not
  hand-edited from memory. MUST NOT VIOLATE — the sweep is keyed off the registered gates, conformant to the
  canonical shape.
- **Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate).** The headline gate is a
  generated-code-diff + numeric test-output (both `samplePalette` ports derive from one spliced source,
  certified to 1e-6) — the precept-valid form, NOT a grep for runtime behaviour. The README-currency
  assertion is a document-reconciliation artefact (an accepted form). The wave's CLOSE is the executed live
  Playwright + frontend-design audit (the WebGL2-vs-WebGPU `huePath:'increasing'` parity + the catch-light
  same-warm-white), never a headless proof alone — the cardinal AX precept (the π visual-runtime lane is the
  only instrument that catches the backend ramp-drift class).
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (NEVER
  collapsed).** The WGSL ramp divergence + the catch-light seam are library-internal contract violations —
  FIXED at the root (one spliced ramp source + one OKLCh derivation), not papered with a fallback. There is
  no browser-API degradation path in this wave's scope (the `device.lost` fallback is W14's), so the two are
  not in tension here — but the wave MUST NOT introduce a silent-return on a malformed `{L,C,h}` anchor: an
  invalid OKLCh anchor passed to `warmCatchLight` is a library-internal contract violation that throws, not a
  silent grey return.
- **binding-verification (glass-ui MEMORY — stale bindings silently no-op).** The catch-light re-derivation
  rides the CPU↔GPU `uniform3f` boundary (`uniformBridge.ts:319`) — a stale anchor that resolves to the wrong
  linear triple is a binding-verification-class break (vue-tsc + units pass; only a live render catches the
  wrong warm-white). The VISUAL-TRUTH same-warm-white confirmation is the e2e-class instrument the MEMORY
  precept prescribes for this silent class.
