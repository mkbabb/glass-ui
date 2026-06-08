# AX.W43 — Fourier-field first-class: the per-variant intensity model + full citizenship + the mid-tranche SOTA research fold

**Band** B/E · GRAPHICS-SUBSTRATES (the first-class graphics set: aurora W07/W10-W14, blob W08/W15-W16,
constellation W17, **fourier-field W43**) · **Severity** major · **dependsOn** AX.W00 (the π visual-runtime
lane — the close-criterion machinery this primitive's visibility/intensity live audit runs inside) · AX.W07
(the WebGPU `var<storage,read>` dynamic-index + f32-cast unblock — the GPU substrate the mid-tranche research's
WebGPU-vs-Canvas2D decision lands ON, must settle first) · AX.W14 (the WebGPU painterly-parity / `WEBGPU_PARITY`
disposition — the GPU primitive band the fourier-field research reuses rather than guesses at) · AX.W18 (the
storybook IA — fourier-field gets its Substrates-band seat there) · **Charter** AX.md §1 (the `AX.W43` summary
row) + §3 (the `### AX.W43` block) + §2b band-B/E precept rows + §7 (the Slides Tranche J coordination — W43
absorbs J.W1 intensity + the J.W9 glass-ui-half citizenship) · **Plan basis** REQUIREMENTS §26 (fourier-field
FIRST-CLASS, research-DEFERRED-to-mid-tranche) + §25.1 (J.W1 intensity model + J.W9 citizenship + the J.W8
`/prng` decision) + §24 (the I-session lifted fourier-field into `src/components/custom/fourier-field/` on the
useCanvas2D substrate; AX owns + perfects it) · **Source corpus** slides `docs/tranches/J/J.md §2` (the J.W1
intensity spec + the §7.1 user-ratified targets) + `slides/docs/tranches/J/audit/DEEP-AUDIT-DIGEST.md` (the
176-finding J audit — the per-wave detail for the intensity model).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FIVE falsifiable witnesses against HEAD `cdcf331` (the AX line; the I-session lifted
fourier-field at the 3.7.0 source, present on this line). The primitive RENDERS but reads as a near-invisible
whisper, and it is a first-class component on PAPER only — no README, no api seat, no story, no smoke.

- **RED witness 1 (a single `OUTLINE_PEAK_ALPHA = 0.24` ceilings EVERY layer → the near-invisible comet — the
  headline visibility gap).** `FourierField.vue:103` declares `const OUTLINE_PEAK_ALPHA = 0.24;` and every
  paint pass multiplies through it: the epicycle arms paint at `OUTLINE_PEAK_ALPHA * 0.6 * 0.5 ≈ 0.072`
  (`:237`) and `OUTLINE_PEAK_ALPHA * 0.6 ≈ 0.144` (`:242`); the trail body decays QUADRATICALLY off this
  already-low ceiling so the median segment lands ≈0.06. The J audit confirms the rendered bookend PNGs show a
  near-invisible comet (J.md §1, `DEEP-AUDIT-DIGEST.md §0`). There is NO per-variant intensity field in
  `VariantPreset` (`:59-77` carries `harmonics`/`harmonicScale`/`epicycles`/`trailLength`/`epicycleHueShift`/
  `durationMs`/`frozenSeed`/`frozenT` — NO `peakAlpha`, NO `headGlow`, NO `trailFadeExp`) and NO `intensity`
  prop on the public surface (`:41-58` exposes `variant`/`color`/`colorResolver` only). The falsifiable
  assertion: *`grep -c "OUTLINE_PEAK_ALPHA" FourierField.vue ≥ 1` AND `grep -c "peakAlpha\|headGlow\|intensity"
  FourierField.vue = 0`* — the magic-number ceiling exists; the per-variant intensity bundle + prop do not.

- **RED witness 2 (the trail decays QUADRATICALLY → the comet body is gone, only a faint head survives).** The
  trail-fade is `age*age` (the quadratic decay J.md §1 names), so the comet body dies far too fast — the
  median trail segment is ≈0.06 and the body reads as nothing. There is NO per-variant `trailFadeExp` knob and
  NO per-variant trail-alpha floor; the head glow is NOT the strongest layer (it shares the `OUTLINE_PEAK_ALPHA`
  ceiling). The falsifiable assertion: *the trail-decay exponent is hardcoded `age*age` (≈2.0) with no
  per-variant override + no floor* — born-RED (a coverage-fraction π-gate on the rendered field measures below
  the J.W2 floor against the 0.24 build).

- **RED witness 3 (NO README — the first-class research-backed README does not exist).** `ls
  src/components/custom/fourier-field/README.md` → **ABSENT**. aurora/goo-blob/constellation each ship a
  research-backed canonical-readme-shape README at `src/components/custom/<name>/README.md`; fourier-field
  ships NONE. The falsifiable assertion: *`ls src/components/custom/fourier-field/README.md` = absent.* RED:
  the primitive has no documented variant taxonomy, no intensity-model doc, no math/use-cases — it cannot pass
  the W33 README-currency sweep, and it is not a first-class citizen by the canonical-readme-shape bar.

- **RED witness 4 (NO `api/index.ts` public-surface seat + NO demo story — first-class on PAPER only).** `grep
  -c "fourier\|Fourier" src/api/index.ts` → **0** (the discovery layer carries Aurora/GooBlob/Constellation
  type+constant blocks; fourier-field has NONE — no `FourierFieldProps`, no `FourierFieldVariant`, no intensity
  type exported through `@mkbabb/glass-ui/api`). `ls demo/stories/substrates/fourier*.vue` → **absent** (the
  Substrates band ships `aurora.vue`/`goo-blob.vue`/`blob-*.vue`/`constellation.vue`/`glass-material.vue` — no
  `fourier-field.vue` story). The `/fourier-field` flat subpath + the `package.json` `./fourier-field` export
  DO exist (`src/subpaths/fourier-field.ts` present; `package.json:299-302` + the `typesVersions:55-57` entry)
  — so the SUBPATH leg is partially landed, the API-seat + story legs are not. The falsifiable assertion:
  *`grep -c "Fourier" src/api/index.ts = 0` AND `ls demo/stories/substrates/fourier-field.vue` = absent.* RED:
  no discovery-layer type seat, no Substrates story.

- **RED witness 5 (NO mount-smoke test — sibling-parity with aurora/blob is unmet).** `ls
  tests/components/custom/fourier-field/` → **absent** (no mount-smoke under the mirrored `tests/` tree). The
  per-frame color/hue resolution rides the injected `colorResolver` + the `useGlobalDark` watch already
  (`FourierField.vue:2-4,:108-112` — the GooBlob-mirrored seam), so the dark/color watch infrastructure EXISTS;
  what is unverified is the zero-allocation render-loop claim (the per-frame hue resolution must be hoisted onto
  the existing color/dark watch, not re-resolved per frame). The falsifiable assertion: *no fourier-field
  mount-smoke spec exists under `tests/`.* RED: no smoke, the render-loop allocation is unguarded.

The wave is RED at HEAD on all five; the HardGate below drives each to GREEN (the per-variant intensity bundle
+ `intensity` prop landing + the trail-decay softening + the README/api-seat/story/smoke citizenship + the
zero-allocation render-loop assertion). The MID-TRANCHE SOTA research (§Cadence step 5) folds ON TOP of the
intensity model during the wave's drive window — it deepens, it does not gate the born-RED close.

---

## Goal

Raise the Fourier field from a near-invisible whisper to a SIGNATURE BRAND MARK and make it a FULL first-class
glass-ui citizen — perfect the per-variant intensity model (the Aurora `opacityCeiling`-shaped seam, threaded to
a token, NOT a magic-number bump), soften the quadratic trail so the comet body survives with the head glow as
the strongest layer, hoist the per-frame color resolution onto the existing dark/color watch (a zero-allocation
render loop), and ship the README/api-seat/story/smoke/subpath citizenship that makes fourier-field a sibling
peer of aurora/goo-blob/constellation — then fold the orchestrator-driven mid-tranche SOTA research (epicycle/DFT
viz + WebGPU + our GPU primitives + the fourier-analysis suite) on top during the drive window.

---

## Scope (the gestalt fix — the intensity is a per-variant BUNDLE + an `intensity` prop seam; NO magic-number bump; NO compat alias)

The J audit's findings converge on one architectural truth: the single `OUTLINE_PEAK_ALPHA = 0.24` constant was
the I-session's "subtle/background" directive MET-AND-OVERSHOT — it ceilings every layer to a whisper. The fix is
NOT bumping `0.24` to `0.30` (the precept-banned magic-number patch, J §6.2) — it is the per-variant intensity
BUNDLE + an `intensity` prop scaling the resolved peak, the Aurora `opacityCeiling` seam shape threaded to a
token. This wave ships that, the trail-decay softening, the render-loop hoist, AND the full citizenship.

### 1. The per-variant intensity BUNDLE in `VariantPreset` (J.W1; replaces `OUTLINE_PEAK_ALPHA`)

Add to the `VariantPreset` interface (`FourierField.vue:59-77`) a per-variant intensity sub-bundle — the
per-variant differences live in the preset bundle (J §6.3: "the variant IS the bundle"):

- **`peakAlpha`** — the per-variant outline/comet peak (replaces the global `OUTLINE_PEAK_ALPHA = 0.24`). The
  epicycle arms + trail body multiply through the RESOLVED per-variant peak, not the global constant.
- **`headGlowAlpha`** + **`headGlowBlur`** — the head-glow layer's alpha + blur. **The head glow is the STRONGEST
  layer** (J.W1 — it survives even where the trail body fades), authored per-variant.
- **`epicycleRatios`** — the per-variant epicycle arm/circle alpha ratios (replacing the hardcoded `*0.6*0.5`
  / `*0.6` at `:237`/`:242`): the epicycles stay a DISTINCT hue below the outline but VISIBLE (J §5).
- **`trailFadeExp`** + **`trailFloor`** — the per-variant trail-fade exponent (≈`age^1.4`, softened from the
  quadratic `age*age`, §2 below) + a per-variant minimum trail alpha so the comet body survives.

**DELETE `OUTLINE_PEAK_ALPHA`** (the global constant) — NO compat alias for the old constant (J §6.5; the
no-legacy mandate). The two PRESETS (`hero`/`final`, `:78-100`) gain the new fields with the **user-ratified
§7.1 targets** (REQUIREMENTS §25.1 + J §7.1):

- **`hero`** — head-glow peak ≈ **0.55**, trail head ≈ **0.35** (WARM, BRIGHT; fewer big phasors, epicycles ON).
- **`final`** — peak ≈ **0.45** (COOL, denser-but-quieter; more harmonics, epicycles OFF).
- hero + final are **visibly DISTINCT members of one family** (the J §7.1 ratify — not a recolour of one curve).

### 2. Soften the trail decay — the comet body survives, the head is the strongest layer (J.W1)

Replace the quadratic `age*age` trail decay (`FourierField.vue` trail-paint pass) with the softer ≈`age^1.4`
(the per-variant `trailFadeExp`) PLUS a per-variant `trailFloor` so the median trail segment no longer dies at
≈0.06. The head glow (the `headGlowAlpha`/`headGlowBlur` layer) is the strongest layer — authored above the
trail so the comet reads head-forward. The result: a comet body a stakeholder can SEE (the J.W2 floor gate
proves the lift — that gate is SLIDES-side, on the consumer; W43 ships the LIBRARY intensity model the floor
gate measures).

### 3. Hoist the per-frame color/hue resolution — a zero-allocation render loop (J.W1 elegance fold)

The hue/color resolution already rides the injected `colorResolver` + the `useGlobalDark` watch
(`FourierField.vue:2-4,:108-112` — the GooBlob-mirrored seam). HOIST any per-frame color/hue re-resolution
onto that EXISTING color/dark watch so the render loop allocates NO color per frame (J.W1: "hoist the per-frame
color/hue resolution onto the existing color/dark watch — zero-allocation render loop"). The resolved
`[r,g,b]` triple + the derived epicycle second-hue are computed ONCE per color/dark change (the watch), read by
the rAF loop. This is the substrate-discipline parity with GooBlob/Aurora (no per-frame token probe, no
per-frame allocation).

### 4. The `intensity` prop — the Aurora `opacityCeiling`-shaped scaling seam (J.W1)

Add an **`intensity?: number`** prop (default `1`) that SCALES the resolved per-variant `peakAlpha`/
`headGlowAlpha` — the Aurora `opacityCeiling` seam shape (`Aurora.vue:83-104` clamps `opacityCeiling` to
[0,1] as the outer compositing envelope; fourier-field's `intensity` is the same shape, threaded to the
intensity model). A consumer tunes the field's loudness from the deck/host via ONE prop or a token — the
loudness is a prop/token seam, NEVER a magic-number patch in the component (J §6.2). Clamp `intensity` to a
sane band (≥0; an upper soft-cap so a runaway value cannot over-saturate). The deck/host can wire `intensity`
off a token for the per-deck override (the J.W2 consume threads it through the deck theme token).

### 5. Full first-class CITIZENSHIP — README + api seat + story + smoke + subpath (J.W9 glass-ui half; REQUIREMENTS §26.3)

Bring fourier-field to sibling parity with aurora/goo-blob/constellation:

- **README** (`src/components/custom/fourier-field/README.md` — NEW, research-backed canonical-readme-shape):
  the use-cases, the variant taxonomy (hero/final as distinct family members), the intensity model (the
  per-variant bundle + the `intensity` prop + the `opacityCeiling` lineage), the MATH (the inverse-DFT
  epicycle/spectral-trace, the seeded-elliptic-spectrum model), examples + code snippets, design
  considerations. The mid-tranche SOTA research (§Cadence step 5) DEEPENS this README (the orchestrator folds
  the research findings into it during the drive window — the same research→fold pattern, time-shifted).
- **api seat** (`src/api/index.ts` — ADD): a `// ── Fourier-field ──` block exporting the canonical public
  types (`FourierFieldProps` / `FourierFieldVariant` / the intensity-bundle public type if it widens) +
  any intensity constant, sibling to the Aurora/GooBlob/Constellation blocks.
- **demo story** (`demo/stories/substrates/fourier-field.vue` — NEW): a Substrates-band story SIBLING to
  `aurora.vue`/`goo-blob.vue`/`constellation.vue` — both variants, the `intensity` knob, a token-ladder tour,
  on light + dark grounds (DEMO-private; not a library edit).
- **mount-smoke** (`tests/components/custom/fourier-field/fourier-field.smoke.test.ts` — NEW, under the
  MIRRORED `tests/` tree, NEVER under `src/` per `proof:no-test-in-src`): a `@vue/test-utils` + jsdom mount
  that the component mounts with both variants + the `intensity` prop + a stub `colorResolver`, sibling-parity
  with the aurora/blob mount-smokes.
- **subpath** (`src/subpaths/fourier-field.ts` + `package.json` `./fourier-field` export + `typesVersions`) —
  ALREADY landed at HEAD (RED witness 4); VERIFY it resolves (`node -e 'import("@mkbabb/glass-ui/fourier-field")'`)
  + the dts publishes (`verify-export-types`), do NOT re-author.

### 6. The GooBlob color seam — fold into the shared color core (REQUIREMENTS §26.6)

The I-session wired the GooBlob color seam onto fourier-field (the injected `colorResolver` + the throwaway
color-read `light-dark()` → `rgb()` resolve, NO probe-span, NO MutationObserver — `FourierField.vue:27-32,
:108-112`). VERIFY this rides the shared `/color` OKLCh seam aurora/blob already share (the
`defaultBlobColorResolver` from `@mkbabb/glass-ui/color`, `:11` import) — fold the color discipline into the
shared core (do NOT re-derive a parallel resolver). The W37 `resolveCanvasColor` is the LIBRARY-shipped
Canvas2D `light-dark()` resolver; coordinate — fourier-field's inline color-read pre-resolve IS the pattern
W37 generalizes (note it to W37 as a consumer; W43 does NOT author the resolver — W37 owns it).

### 7. The MID-TRANCHE SOTA research HOOK — orchestrator-driven, DEFERRED to W43's drive window (REQUIREMENTS §26.2)

**The fourier-field SOTA research is NOT a now/pre-drive task** (unlike liquid-glass/aurora/blob which ran
during spec formation). It is DEFERRED to run MID-TRANCHE — an ORCHESTRATOR-DRIVEN workflow launched during
W43's drive window (a §Cadence step), whose findings the orchestrator FOLDS into W43 (and the README) at that
point — the same research→fold pattern, time-shifted into execution. **RATIONALE (the deferral is principled,
not a punt):** the GPU-primitive substrate the research depends on (the WebGPU `createGPUCanvas` + the optimized
GPU primitives) is itself being built/perfected by the aurora band (W07/W14) EARLIER in the tranche — so
fourier-field's research lands on a KNOWN, SETTLED GPU substrate rather than guessing at it. This is why W43
dependsOn W07 + W14.

**The research SCOPE (mandatory axes, REQUIREMENTS §26.2):**
- **(a) Epicycle / DFT / Fourier-series visualization SOTA** — the rotating-vector "drawing with circles" canon,
  the spectral-trace aesthetic, Computer-Modern / mathematical-figure typography, the comet-trail / phosphor
  look, the seeded-elliptic-spectra generative model.
- **(b) WebGPU** — whether/how fourier-field should ride a WebGPU compute/render path (compute the harmonic sum
  on the GPU; the storage-buffer harmonic-coefficient array per the W07 lesson; the
  WebGPU-vs-Canvas2D-vs-WebGL2 decision for an animated harmonic trace).
- **(c) Our OPTIMIZED GPU PRIMITIVES** — reuse the AX-built substrate: the shared `createCanvasLifecycle` /
  `createGPUCanvas` / `useWebGLCanvas` / `useCanvas2D` park-freeze-dispose machinery, the shared OKLCh color
  core, the single-source procedural-color GLSL/WGSL twins — fourier-field composes the SAME optimized substrate
  the aurora/blob band perfected, NOT a parallel render path.
- **(d) Our fourier-analysis VISUALIZATION SUITE** — read `/Users/mkbabb/Programming/fourier-analysis` (the
  sibling repo's visualization components/techniques): what harmonic/spectral visualizations it ships, what
  fourier-field should ABSORB or align with, and the cross-repo idiom (fourier-analysis is the candidate ≥2nd
  EXTERNAL consumer of fourier-field — the substrate-with-consumer bar). The research deepens W43 + the README,
  folded by the orchestrator mid-tranche.

**The research is DEFERRED — it deepens, it does not gate the born-RED close.** The five born-RED witnesses
close on the intensity model + citizenship (the J.W1+J.W9 deliverables); the SOTA research folds ON TOP during
the drive window (a WebGPU compute-path adoption, if the research recommends it, is an additive enhancement
behind the parity-floor Canvas2D render the §24-shipped substrate already provides — NEVER a regression of the
shipped render). Mark the research-fold as orchestrator-driven mid-tranche in the audit JSON.

**Explicitly OUT of W43 scope (routes elsewhere):**
- The SLIDES-side consume (the deck theme intensity token, the J.W2 floor gate, the bookend re-bless) →
  **AX.W32 / the J slides-leg feedback-coder sub-arm** (the slides repo; gated on the AX cut PUBLISHING — slides
  pins a `main`-sourced publish per J §7.8). W43 OWNS the library intensity model; the slides consume is the J
  slides arm.
- The `resolveCanvasColor` Canvas2D `light-dark()` resolver authoring → **AX.W37** (W43 VERIFIES the color seam
  rides the existing pattern + notes fourier-field as a W37 consumer; it does not author the resolver).
- The `useCanvas2D` substrate certification (fourier-field + constellation = the ≥2 consumers) → **AX.W37** (W43
  COMPOSES the substrate; W37 certifies it).
- The Substrates-band IA seat (the category-tree placement) → **AX.W18** (W18 SEATS fourier-field in Substrates
  sibling to aurora/blob/constellation; W43 ships the story that lands in that seat).
- The `/prng` first-class subpath decision → the J.W8 / **AX.W29/W37** keep-book (if fourier-field makes prng a
  ≥2-EXTERNAL-consumer need outside watercolor-dot/fourier-field, the `/prng` subpath is justified; else
  keep-book — fourier-field imports the single-source `src/utils/prng.ts` regardless, NOT a private copy).
- The README "planned→landed" sweep + the W33 close currency → **AX.W33** (W33 sweeps the fourier-field README
  to currency against the live π-lane surface, sibling to dock/aurora/blob/constellation).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/fourier-field/FourierField.vue` | The CORE intensity-model edit: ADD the per-variant intensity sub-bundle to `VariantPreset` (`:59-77` — `peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`); author the two PRESETS' new fields with the §7.1 ratified targets (`:78-100` — hero peak≈0.55/trail≈0.35, final peak≈0.45); **DELETE `OUTLINE_PEAK_ALPHA`** (`:103`) + re-point its consumers (`:237`/`:242` epicycle ratios → `epicycleRatios`); soften the trail decay `age*age` → `≈age^trailFadeExp` (the per-variant exponent) + the `trailFloor`; author the head-glow layer as the strongest layer; ADD the `intensity?: number` prop (default `1`, clamped) scaling the resolved peak; HOIST the per-frame hue/color resolution onto the existing `useGlobalDark`/`colorResolver` watch (zero-allocation render loop). |
| `src/components/custom/fourier-field/index.ts` | Co-export any new public type (`FourierFieldVariant` / the intensity-bundle public type) if the public surface widens; the `/fourier-field` subpath mirror already re-exports `*` — verify the new symbols ride. |
| `src/components/custom/fourier-field/README.md` | **NEW** — research-backed canonical-readme-shape: use-cases, the variant taxonomy, the intensity model (the per-variant bundle + the `intensity` prop + the `opacityCeiling` lineage), the math (inverse-DFT epicycle/spectral-trace + the seeded-elliptic-spectrum model), examples + code snippets, design considerations. (The mid-tranche SOTA research DEEPENS this — the orchestrator folds the findings during the drive window.) |
| `src/api/index.ts` | **ADD** a `// ── Fourier-field ──` block exporting the canonical public types (`FourierFieldProps`/`FourierFieldVariant`/the intensity-bundle type if widened) + any intensity constant — sibling to the Aurora/GooBlob/Constellation blocks. APPEND-only, a self-contained block (no aurora/blob/constellation edit). |
| `demo/stories/substrates/fourier-field.vue` | **NEW** — the Substrates-band demo story SIBLING to `aurora.vue`/`goo-blob.vue`/`constellation.vue`: both variants, the `intensity` knob, a token-ladder tour, light + dark grounds. DEMO-private — not a library edit. |
| `demo/stories/manifest.ts` | ADD the fourier-field story ROW to the Substrates band (the W43 src+story change carries its own manifest row; W18 authors the CATEGORY TREE + re-baselines `EXPECTED_TREE` LAST — W43 NEVER edits the tree author's rows, only ADDS its own row, three-way-merge-safe). Coordinate the append point with W18. |
| `tests/components/custom/fourier-field/fourier-field.smoke.test.ts` | **NEW** — the mount-smoke (under the MIRRORED `tests/` tree, NEVER `src/` per `proof:no-test-in-src`): mount both variants + the `intensity` prop + a stub `colorResolver`, sibling-parity with the aurora/blob mount-smokes. |
| `scripts/proof-fourier-field-intensity.mjs` | **NEW** — the gate: (a) `OUTLINE_PEAK_ALPHA` is DELETED (`grep -c "OUTLINE_PEAK_ALPHA" src/` → 0, NO compat alias); (b) `VariantPreset` carries the intensity sub-bundle + the `intensity` prop is on the public surface; (c) the README + api-seat + story + smoke EXIST (the citizenship-presence assertion); (d) the render loop allocates no color per frame (the hoist — a static assertion that the per-frame paint reads a watch-cached triple, not a per-frame resolve). |
| `scripts/proof-fourier-field-visibility-live.mjs` | **NEW** — the π-lane render gate (runs in the W00 `tests-visual/` workspace): mount `<FourierField variant="hero">` + `variant="final">`, render N frames, sample a coverage-fraction + a peak-alpha readback over the field interior; assert (a) the hero head-glow + trail clear the visibility floor (NOT the 0.24-build whisper); (b) hero + final are MEASURABLY distinct (a per-variant alpha/coverage delta); (c) the `intensity` prop scales the measured peak (a low vs high `intensity` shows a coverage delta). |
| `docs/tranches/AX/audit/W43-fourier-field-first-class.json` | **NEW** — the wave's audit artefact: the five born-RED witnesses, the §7.1 ratified-target record, the J.W1+J.W9 disposition cross-walk, the mid-tranche SOTA research-fold record (orchestrator-driven, deferred), the OUT-of-scope routes (W32 slides-consume / W37 substrate+resolver / W18 IA seat / W33 currency / the prng keep-book), and the post-wave GREEN measurements. |
| `package.json` | (VERIFY only — the `/fourier-field` subpath + the `proof:fourier-field-intensity` + `proof:fourier-field-visibility-live` script-entry registration. The `./fourier-field` export + `typesVersions` already EXIST at HEAD — verify they resolve + publish, do NOT re-author the export shape.) |

**OUT of bounds:** any `slides/` repo file (the deck-theme intensity token + the J.W2 floor gate + the bookend
re-bless → **AX.W32 / the J slides-leg**, a separate TRACKED repo — glass-ui writes NO slides source);
`src/composables/glass/canvas2d/useCanvas2D.ts` + `resolveCanvasColor` (**AX.W37** — W43 COMPOSES the substrate,
notes the color-seam consumer); `src/utils/prng.ts` (W43 IMPORTS the single-source; the `/prng` subpath decision
is J.W8 / W29 keep-book); `src/components/custom/{aurora,goo-blob,constellation}/**` (sibling primitives — W43
touches NONE; the §7.1 family-parity is fourier-field-internal); `demo/stories/manifest.ts` `EXPECTED_TREE` /
the category-tree author rows (**W18** — W43 ADDS only its own story row); the W00 `pi-manifest.ts` /
`substrate-paints-color.spec.ts` members (W00 owns those — W43 ADDS sibling π-lane gates).

---

## Disjointness (sibling waves it must NOT overlap)

W43 is the SOLE wave on the fourier-field component subtree; it dependsOn W00 + W07 + W14 + W18, so it opens
AFTER the GPU substrate (aurora band) settles + the IA seat lands. The disjointness contract:

- **vs AX.W00 (the π lane).** W43 **dependsOn W00** — SEQUENTIAL. W43 ADDS two sibling π-lane gates
  (`proof:fourier-field-intensity` static + `proof:fourier-field-visibility-live` device) into the W00
  `tests-visual/` workspace; it does NOT edit W00's `pi-manifest.ts` / `substrate-paints-color.spec.ts`
  members. Disjoint by file within the shared workspace (W43 ADDS new spec files).

- **vs AX.W07 + AX.W14 (the aurora GPU band — the substrate the research depends on).** W43 **dependsOn both**
  — SEQUENTIAL on the GPU substrate settling. W07 fixes the WebGPU `var<storage,read>` dynamic-index + f32-cast
  (the GPU path the research's WebGPU-vs-Canvas2D decision lands on); W14 disposes the `WEBGPU_PARITY` lever
  (the GPU primitive band the research reuses). W43 touches NO aurora source — the dependency is the SETTLED
  GPU substrate the mid-tranche research lands on, NOT a shared file. DISJOINT by file.

- **vs AX.W18 (the storybook IA).** W43 **dependsOn W18** (the Substrates-band SEAT for fourier-field). W18
  authors the CATEGORY TREE + re-baselines `EXPECTED_TREE` LAST; W43 ADDS only its own story ROW to the
  manifest (the src+story change carries its row). The shared FILE is `demo/stories/manifest.ts` — DISJOINT by
  ROW (W18 owns the tree author + the `EXPECTED_TREE` fixture; W43 appends its self-contained Substrates row,
  three-way-merge-safe; W18's re-baseline runs LAST and INCLUDES the fourier-field row). Coordinate the append
  point.

- **vs AX.W37 (Canvas2D substrate + `resolveCanvasColor`).** Both compose `useCanvas2D`; **COORDINATE, not
  collide.** W37 CERTIFIES the `useCanvas2D` substrate (fourier-field + constellation = the ≥2 consumers) +
  ships `resolveCanvasColor`; W43 COMPOSES the substrate (the I-session-wired ride) + NOTES fourier-field as a
  W37 consumer of both. W43 does NOT edit `useCanvas2D.ts` (W37's file) nor author the resolver. If W37 lands a
  substrate refactor touching the fourier-field compose site, sequence W37-then-W43 or coordinate the
  `FourierField.vue` render-hook hunk. SHARED conceptual surface (Canvas2D substrate), DISJOINT files.

- **vs AX.W17 (constellation — the co-consumer of useCanvas2D + the §7 J coordination sibling).** DISJOINT by
  file entirely — different component subtrees. The ONE shared conceptual surface is the W37 useCanvas2D
  substrate (both compose it) + the §7 J coordination (W17's constellation swap + W43's fourier-field are both
  J glass-ui arms). The shared FILE is `src/api/index.ts` (W43 ADDS a fourier-field block; W17 may add a
  constellation type) — DISJOINT by BLOCK (each appends a self-contained, non-overlapping block;
  three-way-merge-safe). Concurrent-eligible once both their deps land.

- **vs AX.W32 (the slides motion-form-adoption leg — the J slides arm).** SEQUENTIAL + REPO-DISJOINT: W43 owns
  the LIBRARY intensity model (`glass-ui/src`); W32 / the J slides-leg owns the SLIDES-side deck-theme intensity
  token + the J.W2 floor gate + the bookend re-bless (`slides/src`). The shared SEMANTIC surface is the
  `intensity` prop (W43 SHIPS it library-side; the slides deck READS it). No shared FILE — different repos. The
  slides consume is gated on the AX cut PUBLISHING (slides pins a `main`-sourced publish, J §7.8). Coordinate
  via `coordination/CONSTELLATION.md`.

- **vs AX.W33 (close).** W33 sweeps the fourier-field README "planned→landed" against the live π-lane + folds
  fourier-field into the inheritance-ledger. W43 SHIPS the README; W33 sweeps it to currency. DISJOINT by
  timing (W43 authors, W33 currency-sweeps LAST). W43 hands the README + the mid-tranche research-fold record to
  W33's close.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (the intensity model — folds 1-4 + 6): edit
  `FourierField.vue` — the per-variant `VariantPreset` intensity bundle, the two PRESETS' §7.1 targets, DELETE
  `OUTLINE_PEAK_ALPHA` (no alias), soften the trail decay + the head-glow-strongest layer, the `intensity`
  prop, the render-loop color-hoist; verify the GooBlob color seam rides the shared `/color` core. Arm B (the
  citizenship — fold 5): author the README (research-backed canonical-readme-shape), the `api/index.ts`
  fourier-field block, the demo story + its manifest row, the mount-smoke under `tests/`; VERIFY the
  `/fourier-field` subpath resolves + publishes (do NOT re-author the export). `vue-tsc` + `npm run build` at
  every interval (a deleted `OUTLINE_PEAK_ALPHA` with a surviving reference reds vue-tsc immediately — the
  binding-verification canary). **The mid-tranche SOTA research (§Cadence step 5) is ORCHESTRATOR-DRIVEN, not an
  implement-arm task** — the orchestrator launches the deferred research workflow during the drive window + folds
  its findings into the README + (if it recommends a WebGPU compute path) a follow-on additive enhancement.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the five RED witnesses against the patched tree:
  `OUTLINE_PEAK_ALPHA` DELETED with NO compat alias (`grep -c "OUTLINE_PEAK_ALPHA" src/` → 0); the intensity
  bundle + `intensity` prop EXIST; the trail decay is softened (≈`age^1.4` + floor); the README + api-seat +
  story + smoke EXIST; the subpath resolves. ADVERSARIAL twists: (a) tries to "pass" by bumping `0.24`→`0.30`
  in place (confirms the fix is the per-variant BUNDLE + prop SEAM, NOT a magic-number patch — J §6.2); (b)
  tries to "pass" with a `@deprecated OUTLINE_PEAK_ALPHA` alias (confirms the CLEAN BREAK — no legacy alias, J
  §6.5); (c) confirms hero + final are MEASURABLY distinct family members (not a recolour of one curve — the
  §7.1 ratify); (d) confirms the render loop allocates no color per frame (the hoist is honest — the per-frame
  paint reads a watch-cached triple, not a per-frame `colorResolver` call); (e) confirms the GooBlob color seam
  rides the shared `/color` core (no parallel resolver re-derived); (f) confirms the mid-tranche research-fold
  is recorded as orchestrator-driven/deferred (not silently dropped, not run pre-drive).
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `proof:fourier-field-intensity` (the `OUTLINE_PEAK_ALPHA`
  deletion + the intensity-bundle/prop presence + the citizenship-presence + the render-loop-no-alloc static
  assertion) + `proof:fourier-field-visibility-live` (the π-lane render observation: hero/final clear the
  visibility floor + are measurably distinct + the `intensity` prop scales the measured peak). Confirms each
  clause FAILS at the pre-wave tree (the `0.24` whisper, no bundle, no README/api/story/smoke) and PASSES on the
  patched tree. Registers both `proof:*` package.json entries.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement + 1
verify + 1 gate; the mid-tranche research is an orchestrator-driven workflow on top, NOT a counted implement
arm.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — read it by reference, it is not restated here. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): the FileBounds whose expansion would invalidate the wave — any need to write a `slides/` repo file (the deck-theme intensity token + the J.W2 floor gate are W32 / the J slides-leg, a separate TRACKED repo — glass-ui writes NO slides source), to author `resolveCanvasColor` or rebuild `useCanvas2D` (W37 owns the substrate + resolver; W43 COMPOSES + notes the consumer), to edit a sibling primitive `aurora`/`goo-blob`/`constellation` source (the §7.1 family-parity is fourier-field-INTERNAL — touching a sibling is a scope-reveal), to re-author the `/fourier-field` export shape or the `/prng` subpath (the export EXISTS; the prng-subpath is J.W8 / W29 keep-book), or to edit W18's `EXPECTED_TREE` / the category-tree author rows (W43 ADDS only its own Substrates story row) — any of these is a scope-reveal → halt + triumvirate, NEVER absorb in-line. The hard-gate failures that are not local-edit-recoverable: if `proof:fourier-field-visibility-live` cannot show hero/final clearing the floor + measurably distinct on the DEFAULT engine (the morph not capturable, or the intensity-scaling delta not measurable) → non-local gate failure → triumvirate, NOT a hand-patched probe; if the render-loop-no-alloc static assertion cannot be made machine-checkable from the paint-pass shape, escalate the gate design rather than hand-curating it. The diagnostic loop whose third iteration halts: if the §7.1 hero≈0.55/final≈0.45 targets do NOT read as a legible-signature-distinct family on the live audit after three intensity-bundle retunes, dispatch research→plan→redress on the intensity model rather than re-tuning a fourth time (and do NOT reach for a magic-number bump as the fix — the per-variant bundle + prop is the hard contract). **The MID-TRANCHE SOTA research is the ONE deferred-by-design step** — it is NOT a stall: the orchestrator LAUNCHES it during W43's drive window (after the W07/W14 GPU band settles) + folds it; if the research recommends a WebGPU compute path, that is an ADDITIVE enhancement behind the parity-floor Canvas2D render, NEVER a regression of the §24-shipped substrate (a WebGPU regression of the shipped render is a scope-reveal → triumvirate, never absorbed). A §5.3 ratify reaching un-ratified — the §7.1 hero/final intensity targets (already user-ratified J §7.1 — take them as the recorded default) or the WebGPU-compute-path adoption the mid-tranche research surfaces — → §6.2 Class-3 HALT-AND-RATIFY (record the default — the §7.1 targets are ratified; the WebGPU path defaults to the additive-enhancement-behind-parity-floor disposition — do NOT self-ratify a render-path swap).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / static gate — born-RED→GREEN.**

- **`proof:fourier-field-intensity` (born-RED — the intensity-model + citizenship + render-loop static
  assertion).** Asserts (a) `OUTLINE_PEAK_ALPHA` is DELETED — `grep -c "OUTLINE_PEAK_ALPHA" src/` → 0, with NO
  `@deprecated`/compat alias (the clean break, J §6.5); (b) `VariantPreset` carries the intensity sub-bundle
  (`peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`) AND the `intensity`
  prop is on the public surface; (c) the citizenship artefacts EXIST — `README.md`, the `api/index.ts`
  fourier-field block, the `demo/stories/substrates/fourier-field.vue` story, the `tests/.../fourier-field.smoke.test.ts`
  smoke; (d) the render loop allocates no color per frame (a static assertion that the per-frame paint reads a
  watch-cached `[r,g,b]` triple, not a per-frame `colorResolver` call). **Born-RED at HEAD** (the `0.24`
  constant ships, no intensity bundle/prop, no README/api/story/smoke). A build-source-presence + static-deletion
  + static-assertion artefact (an accepted SPEC.md §Hard-Gates form — NOT a grep-for-runtime-behaviour).

- **`proof:fourier-field-visibility-live` (born-RED — the π-lane render observation, the VISIBILITY gate).**
  Runs in the W00 `tests-visual/` workspace on a real device: mount `<FourierField variant="hero">` +
  `variant="final">`, render N frames, sample a coverage-fraction + a peak-alpha readback over the field
  interior; assert (a) the hero head-glow + trail clear the VISIBILITY FLOOR (a coverage/peak above the
  0.24-build whisper — the legible-signature bar); (b) hero + final are MEASURABLY DISTINCT (a per-variant
  alpha/coverage delta — the §7.1 distinct-family ratify); (c) the `intensity` prop SCALES the measured peak (a
  low vs high `intensity` shows a coverage delta — the seam is honest). **Born-RED at HEAD** (the `0.24` build
  measures below the floor; no intensity prop to scale). A RUNTIME-OBSERVATION artefact (a real device render +
  per-frame coverage/peak readback, the precept-valid form — NOT a grep for a source string), mirroring the
  AX.W17 constellation + AX.W15 blob render gates.

This is a **build-source-presence + static-deletion/assertion + runtime-observation** gate pair (the
precept-valid artefact forms per SPEC.md §Hard Gates), NOT a "grep found a source string for runtime behaviour"
invalid form: the intensity/citizenship/no-alloc clauses are source-structure assertions; the visibility clause
is a real device render + coverage/peak readback.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the live fourier-field demo (`/substrates/fourier-field`), at **≥ 3 viewports**
(375×667 / 1280×800 / 1440×900) in **light AND dark** (the cream+ink ground — the fourier-field rides both):

- **The Fourier trace READS as a signature brand mark, NOT a near-invisible whisper:** the hero head glow is the
  strongest layer (warm, bright); the comet body survives (the softened trail); the epicycles are a distinct hue
  below the outline but VISIBLE. The `0.24`-whisper BEFORE vs the legible-signature AFTER.
- **hero + final read as DISTINCT family members:** hero warm/bright/fewer-phasors-with-epicycles; final
  cool/denser-but-quieter — visibly distinct, not a recolour (the §7.1 ratify, observed LIVE).
- **The `intensity` prop tunes the loudness LIVE:** a low `intensity` recedes the field to quiet chrome; a high
  `intensity` raises it — the seam reads as a real loudness knob (the Aurora `opacityCeiling` parity).
- **Affordance / hierarchy / NO visual occlusion** per the AX cardinal gate (the field sits BEHIND content as
  legible-but-recessive chrome).

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact per the W00 protocol: the `0.24`-whisper BEFORE vs the legible-signature-distinct
AFTER, at ≥3 viewports × light/dark) is the binding close criterion. A green intensity gate proves the bundle
exists; only the live audit proves the trace READS as a signature mark.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the five RED witnesses against HEAD `cdcf331`:
   `OUTLINE_PEAK_ALPHA = 0.24` at `FourierField.vue:103` ceilings every layer; no intensity bundle/prop;
   `age*age` trail decay; `ls README.md` absent; `grep "Fourier" api/index.ts` → 0; `ls
   demo/stories/substrates/fourier-field.vue` absent; no `tests/.../fourier-field` smoke; the `/fourier-field`
   subpath + `package.json` export PRESENT (verify they resolve). Record as the born-RED baseline. Do NOT
   proceed on the audit's word — re-prove.
2. **Confirm the §7.1 targets are RATIFIED (no re-ratify).** The hero≈0.55/final≈0.45 intensity targets are
   USER-RATIFIED (REQUIREMENTS §25.1 + J §7.1 decision 1) — take them as the recorded defaults; do NOT re-open
   the ratify. Record in `audit/W43-…json`.
3. **Author the born-RED gate clauses.** `proof:fourier-field-intensity` (the deletion + bundle/prop +
   citizenship-presence + no-alloc static assertion) + `proof:fourier-field-visibility-live` (the π-lane
   visibility observation); confirm each FAILS at the pre-wave tree.
4. **Ship the intensity model (Arm A).** ADD the `VariantPreset` intensity sub-bundle + the two PRESETS'
   §7.1 targets; DELETE `OUTLINE_PEAK_ALPHA` (no alias); soften the trail decay + head-glow-strongest; ADD the
   `intensity` prop; HOIST the color resolution onto the dark/color watch (zero-allocation loop); verify the
   GooBlob color seam rides the shared `/color` core. `vue-tsc` + `npm run build` + lint at every interval.
5. **MID-TRANCHE SOTA RESEARCH (orchestrator-driven, DEFERRED — launched HERE in the drive window).** AFTER the
   W07/W14 GPU band has settled (the dependsOn), the ORCHESTRATOR launches the deferred 32-facet fourier-field
   research workflow (one-at-a-time per the established cadence): (a) epicycle/DFT viz SOTA, (b) WebGPU
   compute/render path, (c) our optimized GPU primitives [`createGPUCanvas`/`useWebGLCanvas`/`useCanvas2D`/the
   shared OKLCh core], (d) the `/Users/mkbabb/Programming/fourier-analysis` visualization suite (the candidate
   ≥2nd-external consumer). The orchestrator FOLDS the findings into W43 (the intensity model refinement, if
   any) + the README (the research-backed deepening), the same research→fold pattern time-shifted into
   execution. A WebGPU compute path, if recommended, is an ADDITIVE enhancement behind the parity-floor Canvas2D
   render the §24-shipped substrate already provides — NEVER a regression. Record the research-fold as
   orchestrator-driven/mid-tranche in the audit JSON.
6. **Ship the citizenship (Arm B).** Author the README (research-backed canonical-readme-shape — the
   mid-tranche research from step 5 deepens it); the `api/index.ts` fourier-field block; the demo story + its
   manifest row; the mount-smoke under `tests/`; VERIFY the `/fourier-field` subpath resolves + publishes (do
   NOT re-author). `vue-tsc` + `npm run build`.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm both gates pass; run the live audit (the signature-mark trace +
   the distinct hero/final family + the `intensity` loudness knob) on cream + ink at ≥3 viewports; capture the
   paired-π BEFORE/AFTER + DELTA; write `audit/W43-fourier-field-first-class.json` to GREEN.
8. **Hand off to W18 (IA seat), W32/J-slides-leg (the consume), W33 (README currency).** Record in the audit
   JSON + `coordination/CONSTELLATION.md`: the Substrates story row W18 seats; the `intensity` prop the slides
   deck consumes (gated on the AX publish per J §7.8); the README W33 sweeps to currency; the fourier-analysis
   ≥2nd-external-consumer candidate the prng-subpath decision (J.W8) rides.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W43-fourier-field-first-class.json` — the born-RED→GREEN ledger: the five RED
  witnesses (the `OUTLINE_PEAK_ALPHA` ceiling, the quadratic trail, the absent README, the absent api-seat +
  story, the absent smoke), the §7.1 ratified-target record (hero≈0.55/final≈0.45 — taken as the recorded
  default, not re-ratified), the J.W1+J.W9 disposition cross-walk (the glass-ui arms AX absorbs), the
  mid-tranche SOTA research-fold record (orchestrator-driven, deferred to the drive window, the four mandatory
  axes), the OUT-of-scope routes (W32 slides-consume / W37 substrate+resolver / W18 IA seat / W33 currency / the
  J.W8 prng keep-book), and the post-wave GREEN measurements (the intensity-bundle presence, the
  citizenship-presence, the visibility-floor + distinct-family + intensity-scaling readback).
- The NEW `scripts/proof-fourier-field-intensity.mjs` (the deletion + bundle/prop + citizenship + no-alloc
  static assertion) + `scripts/proof-fourier-field-visibility-live.mjs` (the π-lane visibility observation) +
  their `proof:*` package.json registration.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the `0.24`-whisper BEFORE vs the
  legible-signature-distinct AFTER, at ≥3 viewports × light/dark, on cream + ink grounds.
- The research-backed README (canonical-readme-shape, deepened by the mid-tranche SOTA fold): the variant
  taxonomy, the intensity model, the math, examples, design considerations.
- The mid-tranche SOTA research workflow output (the four-axis corpus + the fold record) — the orchestrator's
  drive-window deliverable folded into W43 + the README.
- The `coordination/CONSTELLATION.md` entry: the intensity prop + the citizenship landed-at-HEAD, the slides
  consume gated on the AX publish (the W32 / J-slides-leg + W33 republish hinge), the fourier-analysis
  ≥2nd-external-consumer candidate (the J.W8 prng-subpath rider).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(fourier-field): proof:fourier-field-intensity + proof:fourier-field-visibility-live born-RED (AX.W43)`
2. `feat(fourier-field): per-variant intensity bundle + intensity prop — the Aurora opacityCeiling seam; DELETE OUTLINE_PEAK_ALPHA, no compat alias (AX.W43 J.W1)`
3. `feat(fourier-field): soften the quadratic trail to age^1.4 + per-variant floor; head glow the strongest layer; hero≈0.55/final≈0.45 §7.1 targets (AX.W43 J.W1)`
4. `perf(fourier-field): hoist the per-frame color/hue resolution onto the dark/color watch — zero-allocation render loop (AX.W43 J.W1)`
5. `docs(fourier-field): research-backed README — variant taxonomy + intensity model + math (canonical-readme-shape; deepened by the mid-tranche SOTA fold) (AX.W43 J.W9)`
6. `feat(fourier-field): full citizenship — api/index.ts seat + Substrates demo story + mount-smoke; verify /fourier-field subpath publishes (AX.W43 J.W9)`
7. `chore(AX.W43): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + the mid-tranche SOTA research-fold record + the W18/W32/W33 handoffs`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause, K W0. These are the messages the orchestrator authors. The slides-side deck-theme
intensity consume is AX.W32 / the J slides-leg commits in the SLIDES repo, gated on the AX publish.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (the π visual-runtime lane) — HARD.** W00 stands up the fail-CLOSED `tests-visual/` workspace
  (device render + coverage/peak readback) that W43's `proof:fourier-field-visibility-live` runs inside, +
  codifies the paired-π BEFORE/AFTER + DELTA close protocol + the live-re-diagnosis wave-open ritual. W43 is a
  VISIBILITY wave — the signature-mark legibility needs a live coverage/peak assertion, not a static screenshot.
- **AX.W07 (the WebGPU dynamic-index + f32-cast unblock) — HARD (the GPU substrate the research lands on).**
  The mid-tranche SOTA research's WebGPU-vs-Canvas2D-vs-WebGL2 decision (axis b) + the storage-buffer
  harmonic-coefficient model (the W07 lesson) land on the SETTLED WebGPU path W07 unblocks — the research lands
  on a KNOWN GPU substrate, not a guess (REQUIREMENTS §26.2 rationale).
- **AX.W14 (the WebGPU painterly-parity / `WEBGPU_PARITY` disposition) — HARD (the GPU primitive band the
  research reuses).** The research's "our optimized GPU primitives" axis (c) reuses the substrate the aurora
  band (W07/W14) perfected — `createGPUCanvas`/`useWebGLCanvas`/`useCanvas2D` + the shared OKLCh core + the
  single-source procedural-color twins — so fourier-field composes the SAME optimized substrate, not a parallel
  render path. W14 settles the GPU primitive band the research depends on.
- **AX.W18 (the storybook IA) — HARD (the Substrates-band seat).** W18 authors the category tree that SEATS
  fourier-field in Substrates sibling to aurora/blob/constellation (REQUIREMENTS §26.4); W43 ships the story
  that lands in that seat + adds its manifest row (W18 re-baselines `EXPECTED_TREE` LAST, including the
  fourier-field row).
- **Position:** W43 opens AFTER the GPU substrate (aurora band) settles + the IA seat lands — it is NOT an early
  dock/graphics-blocker wave; it is the first-class perfection of the fourth signature graphics primitive,
  sequenced after the GPU primitives it composes are perfected.
- **Downstream (NOT a W43 dependsOn — W43 is the predecessor):** **AX.W32 / the J slides-leg** consumes the
  `intensity` prop (the deck-theme token + the J.W2 floor gate, gated on the AX publish); **AX.W33** sweeps the
  README to currency + folds fourier-field into the inheritance-ledger.
- **Coordinate (NOT a hard dependency):** **AX.W37** certifies the `useCanvas2D` substrate (fourier-field +
  constellation = the ≥2 consumers) + ships `resolveCanvasColor` — W43 COMPOSES the substrate + notes the
  color-seam consumer; W37 is a coordinate, not a prerequisite. **AX.W17** is the §7 J-coordination sibling (the
  constellation swap) — repo-disjoint, api-block-disjoint.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **The I-session 3.7.0 lift (REQUIREMENTS §24).** The feedback-coder/slides Tranche-I session LIFTED
  `fourier-field` into glass-ui (`src/components/custom/fourier-field/`) on the shared `useCanvas2D` substrate +
  a GooBlob color seam (no probe-span, no MutationObserver), shipped at the 3.7.0 source (published from
  `at-dock-convergence` — a branch tip, NOT `main`; the J.W9 3.7.0→main reconciliation == W33's close, per §7).
  AX OWNS + PERFECTS it now (REQUIREMENTS §24/§26). This is present on the AX line `cdcf331`.
- **`OUTLINE_PEAK_ALPHA = 0.24` (`FourierField.vue:103`).** The I-session's "subtle/background" directive
  MET-AND-OVERSHOT — a single global ceiling on every layer → the near-invisible comet the J audit names (J.md
  §1, `DEEP-AUDIT-DIGEST.md §0`). The J-1 prompt re-opens it; W43 (== J.W1) ships the per-variant intensity
  model that resolves it (NOT a magic-number bump).
- **The Aurora `opacityCeiling` seam (`Aurora.vue:83-104`).** The architectural MODEL the `intensity` prop
  mirrors — the outer compositing envelope clamped to [0,1], threaded to a token. J.W1 names it explicitly
  ("mirroring Aurora's `opacityCeiling`").
- **The §7.1 user-ratified targets (J §7 decision 1, RATIFIED 2026-06-08).** hero head-glow peak ≈0.55 / trail
  head ≈0.35 (warm, bright); final ≈0.45 (cool, denser-but-quieter); hero + final visibly distinct family
  members. Taken as the recorded default — not re-ratified (REQUIREMENTS §25.1).
- **The deferred-to-mid-tranche research directive (REQUIREMENTS §26.2, 2026-06-08).** Unlike
  liquid-glass/aurora/blob (research ran during spec formation), the fourier-field 32-facet research is
  DEFERRED to run MID-TRANCHE on the settled GPU substrate (W07/W14) — an orchestrator-driven drive-window
  workflow whose findings fold into W43 + the README. The deferral is principled: the research lands on a known
  GPU substrate, not a guess.
- **HEAD `cdcf331`** (the AX line; the I-session 3.7.0 source present) — the audit baseline: the `0.24` ceiling,
  the quadratic trail, no README, no api-seat, no story, no smoke; the `/fourier-field` subpath + export
  present. The first-class-on-PAPER-only signature.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-B/E (GRAPHICS-SUBSTRATES) binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (the HEADLINE precept).** fourier-field is a first-class
  primitive whose intensity model serves its demo story + the slides deck (J.W2 consume) + the fourier-analysis
  ≥2nd-external-consumer candidate (axis d of the research). The `intensity` seam lands WITH the slides consume
  sequenced (W32 / the J slides-leg, gated on the AX publish). MUST NOT close the intensity model without the
  slides consume routed.
- **no-overfitting (a public surface needs a current consumer + evidence).** The per-variant intensity BUNDLE
  + the `intensity` prop serve ≥2 consumers (the demo + the slides deck); the `/fourier-field` subpath is the
  flat per-package mirror (substrate-isolation, not bloat). The `/prng` subpath stays keep-book until ≥2
  EXTERNAL consumers (J.W8) — fourier-field imports the single-source `src/utils/prng.ts`, NOT a private copy.
  MUST NOT ship a speculative options surface or a private prng fork.
- **one-path / no-legacy-code (DELETE `OUTLINE_PEAK_ALPHA`, no compat alias).** The single global ceiling is
  DELETED and replaced by the per-variant bundle + prop — NO `@deprecated` alias, NO magic-number bump (J §6.5
  + §6.2). The color resolution rides ONE seam (the injected `colorResolver` + the dark watch), no parallel
  resolver. MUST NOT leave a compat alias or a second color path.
- **DRY/KISS — the variant IS the bundle (J §6.3).** Per-variant differences (peak/head-glow/epicycle/trail)
  live in the preset bundle, not scattered constants. The `intensity` prop is ONE scaling seam (the
  `opacityCeiling` shape), not a per-layer knob soup. MUST NOT scatter the intensity across ad-hoc constants.
- **canonical-readme-shape (band precept; `docs/precepts/canonical-readme-shape.md`).** The README is authored
  research-backed to the canonical shape (use-cases, variant taxonomy, intensity model, math, examples, design
  considerations) — deepened by the mid-tranche SOTA fold. Documentation is part of the change; the README
  brings fourier-field to first-class-citizen parity with aurora/blob/constellation. MUST NOT ship the primitive
  first-class-on-PAPER-only (no README).
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates — no grep-only runtime gate).** The
  intensity/citizenship gate is a source-presence + static-deletion/assertion artefact; the visibility gate is a
  RUNTIME-OBSERVATION (a real device render + coverage/peak readback) — NOT a grep-for-runtime-string. The
  wave's close is the EXECUTED live Playwright + frontend-design audit (the signature-mark trace + the distinct
  hero/final family + the `intensity` loudness knob on cream + ink), never a headless proof alone (the cardinal
  AX precept; only the live audit proves the trace READS as a signature mark).
- **no-silent-deferrals (the mid-tranche research is SEQUENCED, not deferred-to-next-tranche).** The SOTA
  research is explicitly an ORCHESTRATOR-DRIVEN mid-tranche workflow (launched in W43's drive window, after the
  W07/W14 GPU band settles, folded by the orchestrator) — a sequenced, named, time-shifted research→fold, NOT a
  silent punt. The slides consume + the IA seat + the README currency are each ROUTED to a named successor wave
  (W32 / W18 / W33). MUST NOT close W43 leaving the research un-run or the consume/seat/currency un-routed.
- **presets-in-consumers (MEMORY feedback_presets_in_consumer).** The library's per-variant intensity model is
  its OWN identity (the hero/final family evolves in `src/`); the `color` + the `intensity` loudness are the
  consumer's per-deck overrides. MUST NOT bake a deck-specific intensity into the library default — the §7.1
  targets are the library's signature family, the deck tunes via the `intensity` prop/token.
