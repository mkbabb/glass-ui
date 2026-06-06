# AV.W1 — AURORA-FIX (the OETF correctness fix + the un-converged-sibling close)

## 2. State

**Name**: W1 — AURORA-FIX (the user-mandated "fix aurora" headline)
**Opens after**: nothing — AT-disjoint, opens at HEAD. Lands BEFORE the 3.3.0 publish hinge (E1, USER-DOMAIN). No dependency on AV.W0 (doc-currency) or the cross-repo fan-out.
**Agents**: 3 — AV.W1.1 (OETF fix + gate), AV.W1.2 (fwidth-AA quality), AV.W1.3 (re-bake + DESIGN.md + re-bless). .1 and .2 BOTH modify `aurora.frag.ts` → they are NOT file-disjoint and serialize in one shader worktree (.1 → .2). .3 opens only after .1+.2 are committed (it re-renders the FIXED shader's output). See §4a.
**Hard gate**: ONE new born-RED gate greens (`proof:aurora-space-gamma` — widened from `proof:blob-space-gamma`, OR authored fresh); the aurora CPU color-equivalence vitest gains a linear→gamma OETF assertion; the existing gate matrix + `typecheck` + `build` stay green; the re-baked `W5-aurora-profile.json` + the 11 demo preset thumbnails are refreshed; manual browser verify (aurora paints ~2.2× brighter, strokes hold ~1px across zoom/DPR) recorded in `PROGRESS.md`.
**Status**: planned

**Type:** IMPL (CORRECTNESS — the user-mandated "fix aurora"). Publish-relevant: the fix SHOULD land before 3.3.0 so the npm-published aurora is not too-dark, but it does not BLOCK the publish mechanics (it is a shader/asset edit, not an API change).
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` Stream B (the conclusively-located aurora OETF defect + the quality gaps + the aurora↔blob convergence headline). The convergence-onto-a-shared-GLSL-chunk transposition (digest Stream B last ¶) is the SEPARATE **AV.W2 blob-converge wave** — W1 fixes the correctness defect idiomatically by MIRRORING the blob; W2 deletes the duplication. This file is the execute-without-re-deriving spec for W1.

**Precepts in force.** No legacy / no back-compat (clean break — the OETF is ADDED, no flag to keep the old too-dark path). Gestalt: mirror the blob's already-correct path verbatim, do not invent a new transfer. value.js-FREE: the shader is a GLSL string literal, no runtime-JS color path is touched; the value.js gamma-2.4 transfer constants are COPIED as GLSL (the same constants the blob already inlines). Presets-in-consumers (MEMORY): the 11 named presets stay OKLCh-authored in `demo/stories/aurora/presets.ts` — W1 does NOT edit a preset's OKLCh stops; "re-bake" means re-RENDER the thumbnail PNGs + re-run the profiler against the fixed shader (the OKLCh→linear LUT bake is unchanged). Overfitting: the gate widens an existing detector rather than minting a parallel one where possible.

## 2a. Goal criterion

This wave succeeds if `aurora.frag.ts` applies the sRGB OETF to its final color exactly as the blob does (`metaball.frag.ts:278`) so the painted aurora is no longer ~2.2× too dark, the stroke edges hold ~1px across zoom/DPR via `fwidth`-derived AA (mirroring `metaball.frag.ts:252-255`), and a born-RED gate forbids the too-dark state for BOTH shaders (the OETF can never again silently regress on aurora). The reader's test: a supporting engine paints aurora at the authored luminance (linear 0.5 → display ~0.735, not ~0.215); removing the `col = linearToSrgb(col);` line reddens the gate; the FBM rotation (`:124/:128`) is UNCHANGED (already correct) and the Gaussian softmax nuclei composition (`:206-234`) is deliberately KEPT (atmospheric aesthetic, not forced onto the blob's Quilez smin).

## 3. Scope

1. Add the `linearToSrgb()` GLSL helper to `aurora.frag.ts` — copy the exact value.js gamma-2.4 transfer (`linearToSrgbCh` + `linearToSrgb`) VERBATIM from `metaball.frag.ts:132-137` (slope 12.92, transition 0.0031308, offset 0.055, exponent 1.0/2.4).
2. Insert `col = linearToSrgb(col);` immediately before the `:817` `fragColor` assignment (after the `:816` `clamp`, so the OETF receives the tonemapped/grained/clamped linear color and the `* uAlpha` premultiply stays in DISPLAY space — matching the blob, which premultiplies after the OETF).
3. Replace the fixed-width smoothstep stroke/cap bands (`:494`, `:509-510`, and the impasto/shadow rim bands `:554`/`:557`) with `fwidth`-derived AA so the strokes hold ~1px regardless of zoom/DPR — mirror `metaball.frag.ts:252-255` (`float aa = max(fwidth(d), 1e-6); cov = 1.0 - smoothstep(-aa, aa, d);` adapted to the stroke's `cn`/cap-distance signed fields).
4. KEEP the Gaussian softmax nuclei composition (`:206-234`) — record the deliberate choice in DESIGN.md (atmospheric aesthetic; NOT converted to Quilez smin). KEEP the FBM rotated-octave matrix (`:124/:128`) — already correct, no edit.
5. Re-bake: re-run `npm run profile:aurora` against the fixed shader (refreshes `docs/tranches/F/audit/W5-aurora-profile.json`), and re-render the 11 demo preset thumbnails (`demo/stories/aurora/usePresetThumbnails.ts` capture path: Sky / Dawn / Meadow / Deliberative / Day9 / Oil-Impasto / Oil-Gestural / Oil-VanGogh / Crayon-Sunset / Crayon-Rainbow / Crayon-Ocean).
6. Update DESIGN.md §7 — document the MANDATORY OETF output path (linear pipeline → `linearToSrgb()` → display; the bug class named) and the deliberate Gaussian-softmax-KEEP note.
7. Add the born-RED gate (`proof:aurora-space-gamma` widened/authored) + a linear→gamma shader-equivalence assertion in the aurora color-equivalence vitest.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The OETF insertion point interacts with `uAlpha` premultiply.** If applying `linearToSrgb(col)` and THEN `* uAlpha` produces a visibly-wrong alpha-blend over the page (the digest assumes display-space premultiply matches the blob, but aurora composites over arbitrary page content via `useWebGLCanvas`, not a transparent blob over a card) — the fix is whether the OETF goes before or straddles the premultiply, which is a CORRECTNESS decision about the compositing model, not a local line move. Halt and triumvirate.
- **`fwidth(cn)` is degenerate for the stroke field.** The blob's `fwidth(d)` is on a clean SDF; aurora's `cn = abs(cross1)/halfWNow` is a normalized-coordinate ratio whose screen-space derivative may be ill-conditioned where `halfWNow → 0` (the `> 1e-6` guard at `:491`) or at cap seams. If the `fwidth`-AA visibly worsens the stroke edge (shimmer at cap joins) on a real preset, the redress is to compute AA on the underlying UNNORMALIZED distance, or to BOOK the §3 fwidth-AA quality lift (the OETF fix §1+§2 ships unchanged — it is the correctness headline; the AA is quality). This is not local-edit-recoverable.
- **The widened gate false-REDs the blob clause.** If widening `proof:blob-space-gamma` to also assert aurora's `hasOetf` cannot be authored manifest==ci without breaking the blob's own clauses (the two shaders have different INPUT-space contracts — blob input is GAMMA via the resolver, aurora input is a LINEAR LUT), author a SEPARATE `proof:aurora-space-gamma` instead of widening. A gate that reddens correct blob code is a plan defect.
- **Any diagnostic loop reaches its third iteration** on the manual browser luminance verify (the ~2.2× brightness confirmation) — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (the OETF helper + insertion + fwidth-AA bands) |
| `src/components/custom/aurora/DESIGN.md` | modify (§7 OETF note + softmax-KEEP note) |
| `src/components/custom/aurora/__tests__/color-equivalence.test.ts` | modify (add the linear→gamma OETF assertion) |
| `scripts/proof-aurora-space-gamma.mjs` | create (OR `scripts/proof-blob-space-gamma.mjs` modify if widened) |
| `scripts/gates.mjs` | modify (register the gate / update the widened note) |
| `package.json` | modify (scripts only — the gate entry) |
| `docs/tranches/F/audit/W5-aurora-profile.json` | regenerate (profiler re-bake output) |
| `demo/stories/aurora/usePresetThumbnails.ts` | READ-only (the re-bake harness; invoked, not edited) |
| the 11 baked thumbnail PNG assets (wherever `usePresetThumbnails`/the demo writes them) | regenerate |
| `docs/tranches/AV/PROGRESS.md` | modify (record green run + browser verify + the bake refresh) |

Do NOT touch: any runtime-JS color path (`src/composables/color/index.ts` — the LUT bake `oklchToLinear`/`flattenPalette` is CORRECT and UNCHANGED; the shader was the sole defect) · the blob shader `metaball.frag.ts` (READ-only — it is the reference pattern, already correct at W7 `eb3d994`) · the aurora vertex shader `aurora.vert.ts` · `aurora.frag.ts:124/:128` FBM rotation (already correct — verify, no edit) · `aurora.frag.ts:206-234` Gaussian softmax nuclei (deliberate KEEP) · the 11 presets' OKLCh stops in `demo/stories/aurora/presets.ts` (presets-in-consumers; the OKLCh authoring is unchanged — only the rendered thumbnails refresh) · `src/composables/glass/useWebGLCanvas.ts` (the substrate; W6-owned). **The aurora↔blob shared-GLSL-chunk convergence is AV.W2's scope, NOT W1 — W1 fixes by mirroring, W2 de-duplicates.**

## 4a. Disjointness

- **AV.W1.1** (OETF fix + gate) and **AV.W1.2** (fwidth-AA) BOTH modify `aurora.frag.ts`. They are NOT parallel-disjoint and MUST serialize in one shader worktree: order .1 (the OETF helper + the `:817` insert — the correctness headline) → .2 (the fwidth-AA bands — quality, layered on the same file). One diff pass per the original sequencing. Treat .1+.2 as a single serial shader lane.
- **AV.W1.3** (re-bake + DESIGN.md + re-bless) owns `DESIGN.md`, `color-equivalence.test.ts`, `W5-aurora-profile.json`, the thumbnail PNGs, and `PROGRESS.md`. It re-renders the FIXED shader's output → it opens ONLY after .1+.2 are committed. `color-equivalence.test.ts` is touched only by .3 (the OETF assertion) — `aurora.frag.ts` is touched only by .1/.2; disjoint.
- `scripts/gates.mjs` + `package.json` + the gate script are touched by AV.W1.1 (gate registration) ONLY. No other unit touches them. No append-merge race.

Net: two lanes — **(A) shader** (AV.W1.1+.2, serial within; owns `aurora.frag.ts` + the gate + `gates.mjs`/`package.json`), **(B) bake/docs** (AV.W1.3, opens after A commits; owns DESIGN.md + the test + the profiler artifact + thumbnails + PROGRESS).

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — shader (AV.W1.1, .2) | `/Users/mkbabb/Programming/glass-ui-w1-a` | serial within; owns `aurora.frag.ts`, `proof-aurora-space-gamma.mjs` (or the widened blob gate), `gates.mjs`, `package.json` |
| Lane B — bake/docs (AV.W1.3) | `/Users/mkbabb/Programming/glass-ui-w1-b` | opens after Lane A commits; owns `DESIGN.md`, `color-equivalence.test.ts`, `W5-aurora-profile.json`, the thumbnail PNGs, `PROGRESS.md` |

No `CARGO_TARGET_DIR` (Node/Vite repo). The profiler re-bake (`profile:aurora`) drives a headless Chrome against the dev server — Lane B runs it after Lane A's shader edit is on its branch (Lane B branches FROM Lane A's committed shader, not from clean HEAD, so it bakes the fixed output). The orchestrator runs `git worktree add` for the two siblings and owns the close integration.

## 5. Agent Units

### AV.W1.1 OETF fix + the born-RED gate

- **Goal**: `aurora.frag.ts` applies the sRGB OETF to its final color via a `linearToSrgb()` helper copied verbatim from the blob, so the painted aurora is no longer ~2.2× too dark; a born-RED gate forbids the linear-without-OETF state for aurora (and stays green for the blob).
- **Mechanism**:
  - **`aurora.frag.ts` — add the helper.** Copy `metaball.frag.ts:132-137` VERBATIM (the comment + `linearToSrgbCh` + `linearToSrgb`):
    ```glsl
    // sRGB OETF — linear-light channel → gamma sRGB (the mandatory close-the-seam).
    float linearToSrgbCh(float c) {
        return c <= 0.0031308 ? c * 12.92 : 1.055 * pow(c, 1.0 / 2.4) - 0.055;
    }
    vec3 linearToSrgb(vec3 c) {
        return vec3(linearToSrgbCh(c.r), linearToSrgbCh(c.g), linearToSrgbCh(c.b));
    }
    ```
    Place it in the shader's helper region (before `main()`). Do NOT alter the constants — they are the value.js gamma-2.4 transfer the blob already ships; copying byte-for-byte is what lets AV.W2 later hoist ONE shared copy.
  - **`aurora.frag.ts:816-817` — insert the OETF.** After `col = clamp(col * 0.985 + 0.008, 0.0, 1.0);` (`:816`) and BEFORE `fragColor = vec4(col * uAlpha, uAlpha);` (`:817`), insert `col = linearToSrgb(col); // MANDATORY OETF — closes the seam (mirrors metaball.frag.ts:278)`. The `* uAlpha` premultiply then operates on display-space color (matching the blob's order — OETF, then premultiply). VERIFY the premultiply-after-OETF compositing reads correct over page content (the §3a caveat); if not, triumvirate.
  - **The gate.** PREFER widening `proof:blob-space-gamma` → covers BOTH `metaball.frag.ts` AND `aurora.frag.ts`: for aurora, assert `flipsToLinear == yes` (the LINEAR LUT input — the palette is baked linear, so the shader operates in linear; the `flipsToLinear` clause for aurora is satisfied by the linear-LUT contract, NOT an in-shader `srgbToLinear`) AND `hasOetf == true` (the new `linearToSrgb`). If the blob's INPUT-space clause (resolver-is-gamma) cannot share the aurora row without false-RED (aurora has no resolver — its input is the LUT), author a SEPARATE `scripts/proof-aurora-space-gamma.mjs` on the house template instead (the §3a redress). The aurora gate asserts ONLY: (1) `aurora.frag.ts` exists; (2) `hasOetf` (a `linearToSrgb` / `pow(…, 1.0/2.4)` / `pow(…, 0.4545)` match) is TRUE; (3) the `fragColor` assignment is PRECEDED by a `linearToSrgb(col)` (the seam closes before output, not after a dead helper). Born-RED at HEAD (aurora currently has NO `linearToSrgb` — confirmed `:817` is the only `fragColor`, no OETF anywhere in the file). Greens on the fix.
- **Files**: `src/components/custom/aurora/constants/shaders/aurora.frag.ts` (modify), `scripts/proof-aurora-space-gamma.mjs` (create) OR `scripts/proof-blob-space-gamma.mjs` (widen), `scripts/gates.mjs` + `package.json` (register).
- **Sub-gate**: the gate GREEN + bite-verified — **remove the `col = linearToSrgb(col);` line → RED** (the named bite). Born-RED proof: run the gate at HEAD (pre-fix) and capture the RED artifact; the fix flips it green. Register `["local","ci"]` only after the fix lands (manifest==ci; `gates:verify-ci` passes). `npm run build` green (the GLSL string compiles in the test harness).

### AV.W1.2 fwidth-based stroke AA (quality lift)

- **Goal**: the aurora stroke/cap/impasto edges hold ~1px regardless of zoom/DPR by deriving the smoothstep half-width from the field's screen-space gradient (`fwidth`), mirroring the blob's `metaball.frag.ts:252-255`, replacing the fixed-unit smoothstep bands.
- **Mechanism** (mirror the blob; the verified aurora bands are `:494`, `:509-510`, `:554`, `:557`):
  - **`aurora.frag.ts:494`** — the inside-segment coverage `cov = 1.0 - smoothstep(0.88, 1.02, cn);` (fixed 0.88-1.02 unit band, does NOT scale with zoom). Replace with fwidth-derived AA centred on the edge `cn == 1.0`: `float aaC = max(fwidth(cn), 1e-6); cov = 1.0 - smoothstep(1.0 - aaC, 1.0 + aaC, cn);`. (Keep the `along1`/`halfWNow > 1e-6` guard at `:491` unchanged.)
  - **`aurora.frag.ts:509-510`** — the end-cap blobs `capA = 1.0 - smoothstep(rA * 0.85, rA * 1.05, dA);` (fixed ±0.1·r band on a length distance). Replace with fwidth on the cap distance: `float aaA = max(fwidth(dA), 1e-6); capA = 1.0 - smoothstep(rA - aaA, rA + aaA, dA);` (and symmetrically for `capB`/`dB`). `dA`/`dB` are `length(p - capCenter)` — clean Euclidean distances, well-conditioned for `fwidth`.
  - **`aurora.frag.ts:554`/`:557`** — the impasto rim `smoothstep(0.85, 1.0, 1.0 - s.edgeN)` and shadow `smoothstep(0.85, 1.0, 1.0 - s.edgeN)` are EDGE-DECORATION ramps on a normalized `edgeN`, NOT coverage edges. These are NOT 1px-hold AA candidates (they are an artistic falloff width, not an anti-aliased boundary). EVALUATE: if they visibly alias at high DPR, apply fwidth; if they read as intended painterly falloff, LEAVE them and record the decision (do not over-fit AA onto an aesthetic ramp). Default disposition: LEAVE (the digest names the coverage bands `:493-494/:509-510` as the AA target; `:554-558` is the impasto block, an aesthetic width).
  - **`fwidth` derivative-conditioning caveat (§3a).** `cn = abs(cross1) / halfWNow` is a normalized ratio — its `fwidth` is well-defined where `halfWNow` is smooth, but check the cap-seam (`:512-513` `along1` gate) does not produce a derivative discontinuity that shimmers. If it does, compute the AA on the unnormalized `abs(cross1)` against `halfWNow` instead, or BOOK the §3 AA lift per §3a (the OETF fix §1 stands alone).
- **Files**: `src/components/custom/aurora/constants/shaders/aurora.frag.ts` (modify — serial after AV.W1.1, same worktree).
- **Sub-gate**: no new gate. `npm run build` green (GLSL compiles — `fwidth` requires the WebGL2 / `GL_OES_standard_derivatives`-equivalent core, which the blob already uses, so it is available in the aurora context). Manual browser verify (zoom 1×→3× / DPR 1→2): strokes hold ~1px, no alias creep — recorded in `PROGRESS.md` by AV.W1.3.

### AV.W1.3 Re-bake presets + DESIGN.md + re-bless + the shader-equivalence assertion

- **Goal**: the profiler artifact + the 11 preset thumbnails are refreshed against the FIXED shader; DESIGN.md §7 documents the mandatory OETF output path + the deliberate Gaussian-softmax KEEP; the aurora CPU color-equivalence vitest gains a linear→gamma OETF assertion proving the GLSL transfer matches the expected sRGB within float tolerance.
- **Mechanism**:
  - **Re-bake the profiler.** Run `npm run profile:aurora` (drives headless Chrome against the dev server, per `scripts/profile-aurora.mjs` — writes `docs/tranches/F/audit/W5-aurora-profile.json`). The artifact's luminance/draw metrics change (output ~2.2× brighter) — commit the refreshed JSON. NOTE: the four profiler `liveCases` (`smooth-openai-sky`, `pastel-deliberative`, `watercolor-openai-meadow`, `oil-oil-gestural`) cover the four MEDIA, not all 11 presets — that coverage is unchanged; only the baked VALUES refresh.
  - **Re-render the 11 thumbnails.** The demo bakes preset thumbnails via `demo/stories/aurora/usePresetThumbnails.ts` (capture-mode `update(frozen) + renderAt(1.0) + toDataURL`, per DESIGN.md §7). Re-run the demo's thumbnail bake so the cached/committed thumbnail assets reflect the corrected luminance. (READ `usePresetThumbnails.ts`; invoke its bake path — do NOT edit the harness.) The 11: Sky / Dawn / Meadow / Deliberative / Day9 / Oil-Impasto / Oil-Gestural / Oil-VanGogh / Crayon-Sunset / Crayon-Rainbow / Crayon-Ocean.
  - **DESIGN.md §7 — the OETF note.** Add a load-bearing-note bullet adjacent to the existing "Palette is baked to LINEAR sRGB" bullet (`:150`): **"Shader output applies the sRGB OETF (`linearToSrgb()`) as its FINAL step before `fragColor` — the pipeline operates in linear (palette LUT, ACES tonemap, grain) and MUST close the seam with the OETF or it ships ~2.2× too dark. This is the exact A5/A2 trap the blob fixed at W7; aurora was the un-converged sibling. The transfer is the value.js gamma-2.4 (`metaball.frag.ts:132-137`)."** Add the Gaussian-softmax KEEP note: **"The nuclei field uses a Gaussian softmax (`aurora.frag.ts:206-234`), NOT the blob's Quilez `smin` — a deliberate choice for aurora's atmospheric blend; do not converge it onto the blob's SDF union."** Update the `:46` pipeline comment block to show the OETF as the final stage.
  - **The shader-equivalence assertion.** In `color-equivalence.test.ts`, add a test that ports the GLSL `linearToSrgb` transfer as a TS function and asserts it matches the expected sRGB-encoded output for a sample set of linear values within float tolerance (e.g. `1e-6`), AND asserts the round-trip `srgbToLinear(linearToSrgb(x)) ≈ x` — the named "linear→gamma output matches expected sRGB" check. Mirror the blob's `proof:blob-color-equivalence` discipline (the asymmetric-witness pattern). This is the CPU-side proof the GLSL OETF is the value.js transfer, not an ad-hoc `pow(2.2)`.
- **Files**: `src/components/custom/aurora/DESIGN.md` (modify), `src/components/custom/aurora/__tests__/color-equivalence.test.ts` (modify), `docs/tranches/F/audit/W5-aurora-profile.json` (regenerate), the thumbnail PNG assets (regenerate), `docs/tranches/AV/PROGRESS.md` (record).
- **Sub-gate**: the new equivalence assertion green under `vitest run` (the existing aurora `color-equivalence.test.ts` suite stays green); `W5-aurora-profile.json` regenerated with the brighter metrics; the 11 thumbnails refreshed; the manual browser luminance + 1px-stroke verifies recorded in `PROGRESS.md`.

## 6. Hard Gate

W1 closes when every condition below is evidence-backed:

1. **AV.W1.1** — `aurora.frag.ts` carries the `linearToSrgb()` helper (verbatim from `metaball.frag.ts:132-137`) and `col = linearToSrgb(col);` immediately before the `:817` `fragColor`; the OETF-before-premultiply order reads correct over page content (browser-verified). `proof:aurora-space-gamma` (widened-blob or fresh) GREEN + bite-verified (**remove `col = linearToSrgb(col);` → RED**). Born-RED proof captured (the gate is RED at HEAD pre-fix). Registered `["local","ci"]` after the fix (manifest==ci; `gates:verify-ci` passes).
2. **AV.W1.2** — the fixed-width smoothstep bands at `:494`/`:509-510` are replaced with `fwidth`-derived AA (mirroring `metaball.frag.ts:252-255`); `:554/:557` impasto disposition recorded (LEAVE default, or fwidth-applied with rationale). `npm run build` GREEN (GLSL compiles). Browser verify: strokes hold ~1px at zoom 1×→3× / DPR 1→2, recorded in `PROGRESS.md`. (If the AA shimmers at cap seams → §3 BOOKed per §3a, the OETF fix stands.)
3. **AV.W1.3** — DESIGN.md §7 documents the mandatory OETF output path (the A5/A2-trap / un-converged-sibling framing) + the Gaussian-softmax KEEP; the `:46` pipeline comment shows the OETF final stage. The linear→gamma shader-equivalence assertion is added to `color-equivalence.test.ts` and GREEN (matches expected sRGB within `1e-6` + round-trips with `srgbToLinear`). `W5-aurora-profile.json` regenerated; the 11 preset thumbnails refreshed; the browser luminance verify (~2.2× brighter) recorded.
4. **The FBM rotation is UNCHANGED** — `aurora.frag.ts:124/:128` `mat2(0.8, 0.6, -0.6, 0.8)` verified present and untouched (matches the blob's FBM_ROT; already correct, no edit).
5. **The Gaussian softmax nuclei is UNCHANGED** — `aurora.frag.ts:206-234` untouched (deliberate KEEP, recorded in DESIGN.md).
6. **No runtime-JS color path edited** — `src/composables/color/index.ts` byte-unchanged (`oklchToLinear`/`flattenPalette` were correct; the shader was the sole defect).
7. **No regression.** The existing gate matrix stays GREEN: `proof:blob-space-gamma` (its blob clauses unaffected by the widen, or untouched if a fresh aurora gate), `proof:blob-color-equivalence`, `proof:webgl-substrate-single`, `proof:single-color-core`, `npm run typecheck`, `npm run build`, the aurora + blob unit suites. `PROGRESS.md` records the wave with a green run id.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:aurora-space-gamma` (or widened `proof:blob-space-gamma`) | `scripts/proof-aurora-space-gamma.mjs` (or modified `proof-blob-space-gamma.mjs`) | `["local","ci"]` | remove `col = linearToSrgb(col);` from `aurora.frag.ts` → RED |

Follows the house gate template (`scripts/proof-blob-space-gamma.mjs`): a pure read-and-detect over the shader text, a byte-stable JSON artefact via `scripts/gate-output.mjs` (`gateArtifactPath`/`writeGateArtifact`/`snapshotStamp`), a human summary, `process.exit(1)` on violation. Register in `package.json` scripts + `gates.mjs` manifest ONLY after the fix lands (`gates:verify-ci` enforces manifest==ci; do not register a born-RED gate against an un-folded shader).

## SOTA crosswalk (folded)

Binding authority: `docs/tranches/AV/audit/SOTA-crosswalk.md` (the 14-agent Baseline-dated synthesis). The W1 folds below are the §2.A shader-quality + §2.G a11y-floor rows whose AV-wave seed is W1. Each is ADOPT (the crosswalk marks it ADOPT/GAP) — no speculative fold.

### A6 — IGN dither at 1/255 LSB, pre-quantization (the #1 banding fix; GAP confirmed)

The crosswalk's **#1 highest-value ADOPT** (§3.1) and the **#1 *visible* defect fix on exactly glass-ui's soft-gradient surfaces** (8-bit mid-tone banding). GAP confirmed against HEAD: the AV shaders carry only a hash-based film grain (`aurora.frag.ts:~813`), NOT Interleaved-Gradient-Noise at LSB strength. [SOTA §2.A A6, cit. B2 §7]

- **The fold (one line, texture-free):** after the OETF (`col = linearToSrgb(col);`) and BEFORE the `:817` `fragColor` write, add `col += (1.0/255.0) * ign(gl_FragCoord.xy) - 0.5/255.0;` where `ign(p) = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))))` (the canonical Jimenez IGN). The dither is applied in **DISPLAY (gamma) space, AFTER the OETF** — banding is a quantization artefact of the 8-bit framebuffer, so the dither belongs at the value being quantized (post-transfer), NOT in linear (a linear-space dither is re-shaped by the OETF and under-corrects the mid-tones). This is the crosswalk's named "dither BEFORE or AFTER the transfer" resolution: **AFTER**.
- **The token:** promote the dither amplitude to a `--av-dither` token (default `1.0` = 1 LSB; consumer-overridable to `0.0` to disable) so a high-bit-depth display path can null it. The amplitude multiplies the `(1.0/255.0)` step.
- **Where:** aurora's `aurora.frag.ts` (this wave) AND goo-blob's `metaball.frag.ts` (the same one-line fold — both soft-gradient surfaces band). The shared `ign()` helper is a candidate for the AV.W2 shared chunk (`procedural-color.glsl.ts`) — author it inline per-shader in W1 (mirroring the OETF discipline: copy-then-converge), and W2 hoists it to one source.
- **Scope note:** this EXTENDS the W1 file bounds with a one-line dither + the `--av-dither` token; it does not alter the OETF or the AA. The dither fold is gated by the SAME `proof:aurora-space-gamma` born-RED gate region (the gate asserts the OETF; a sibling assertion can confirm the dither sits AFTER the OETF, before `fragColor`).

### A4 — fwidth analytic-AA sweep, extended to watercolor-dot + dock-blob trio (GAP)

The §3 fwidth-derived stroke AA (AV.W1.2, mirroring `metaball.frag.ts:252-255`) is the §2.A A4 row: **✓ shipped goo-blob; GAP: extend to watercolor-dot + dock blob trio** if any iso-edge risks jaggies. [SOTA §2.A A4, cit. B2 §6 / B3 §2] W1 lands the aurora stroke AA. The watercolor-dot + dock-blob-trio AA sweep is a SMALL extension recorded here as the named follow: audit each remaining SDF/iso-edge surface for a fixed-unit smoothstep band and replace with `aa = max(fwidth(d), 1e-6); cov = 1.0 - smoothstep(-aa, aa, d)` IFF it visibly aliases at high DPR (else LEAVE + record — do not over-fit AA onto an aesthetic falloff, per the `:554/:557` impasto disposition). KISS: the aurora stroke AA is the W1 headline; the trio sweep rides the same idiom and is recorded as a §2.A A4 close-out item.

### G1 — the mandatory prefers-reduced-motion RAF gate (PARTIAL → substrate-lift)

The §2.G G1 a11y HARD floor: **`matchMedia('(prefers-reduced-motion: reduce)')` reactive seam → freeze the RAF loop, render ONE static frame.** A CSS reduced-motion reset CANNOT reach the WebGL RAF loop — it MUST be a JS matchMedia gate. [SOTA §2.G G1, cit. B1 §7 / B2 §8 / B12 §1,6] Status: **PARTIAL** — aurora's `runtime.ts:197-198` already reads the query + freezes; the GAP is that **goo-blob and the `useWebGLCanvas` substrate itself do not own the seam.** W1 confirms aurora's gate paints one static frame on the fixed (brighter, dithered) shader. The substrate-level lift (so goo-blob + any future AV surface inherit a frozen-frame guarantee) is the **AV.W7 perf wave's F4/G1 deliverable** (it lands at the substrate seam, not in this shader-only wave) — recorded here as the cross-wave handoff, NOT a W1 src edit. The W1 acceptance adds: a `prefers-reduced-motion: reduce` browser-verify (aurora paints one static frame at the corrected luminance, no perpetual RAF) to `PROGRESS.md`.

**Deferred against this wave:** A5 (curl/bitangent divergence-free flow field) stays DEFER — the double-warp reads as flowing; trigger is a design pass judging aurora flat (SOTA §2.A A5). A7 (shared snoise leaf) is AV.W2's deferral, not W1's.

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — at close (the shader is a string literal; the test is the typed surface).
- `npm run build` — after AV.W1.1 (the OETF + helper compiles) and AV.W1.2 (the fwidth bands compile), and at close.
- `proof:aurora-space-gamma` (or the widened gate) + the no-regression existing-gate matrix — after the fix lands and at close.
- `vitest run src/components/custom/aurora/__tests__/color-equivalence.test.ts` — after AV.W1.3 adds the OETF assertion.
- `npm run profile:aurora` — once, in AV.W1.3, to regenerate the profiler artifact against the fixed shader.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`DESIGN.md`, `PROGRESS.md`) at close.

No formatter is intentionally skipped; the gate + the equivalence test are the binding evidence for the shader fix; the browser luminance verify is the binding evidence for the perceptual correctness.

## 8. Verification Artefacts

- `proof:aurora-space-gamma` JSON artefact (byte-stable, via `scripts/gate-output.mjs`) — the gate output under the repo gate-artefact dir; the born-RED (pre-fix) AND green (post-fix) captures.
- The aurora `color-equivalence.test.ts` run output showing the new linear→gamma OETF assertion green.
- The regenerated `docs/tranches/F/audit/W5-aurora-profile.json` (brighter luminance metrics).
- The 11 refreshed preset thumbnail assets.
- Manual browser-verify notes (the ~2.2× brightness correction; the 1px-stroke-hold at zoom/DPR; the OETF-before-premultiply composite reads correct over page content) — `docs/tranches/AV/PROGRESS.md`.
- The `:554/:557` impasto-AA disposition (LEAVE or fwidth-applied) + the FBM/softmax KEEP confirmations — `PROGRESS.md`.
- The green CI run id for the wave + the integration commit hashes (per §9) — `PROGRESS.md`.

## 9. Commit Plan

- **Lane A (shader) implementation commits** — `fix(tranche-AV): W1 — aurora sRGB OETF (linearToSrgb before fragColor) + born-RED proof:aurora-space-gamma`; `feat(tranche-AV): W1 — aurora fwidth-based stroke AA (mirror metaball.frag.ts:252-255)`. (Body required for the OETF fix — names the ~2.2× too-dark defect, the verbatim copy from the blob, the bite-check.)
- **Orchestrator gate-registration commit (if separate)** — folded into the OETF fix commit (the gate is born with the fix); if the widen touches the blob gate, body names the manifest row + the dual-shader coverage.
- **Lane B (bake/docs) implementation commits** — `test(tranche-AV): W1 — aurora linear→gamma OETF shader-equivalence assertion`; `docs(tranche-AV): W1 — DESIGN.md §7 mandatory-OETF output path + Gaussian-softmax KEEP note`; `chore(tranche-AV): W1 — re-bake aurora profiler artifact + 11 preset thumbnails (corrected luminance)`.
- **Orchestrator integration + docs commit** — `docs(tranche-AV): W1 close — PROGRESS green run id + browser luminance/stroke verify + bake refresh`. (Body required — status/close.)

## 10. Dependencies

- **Depends on**: nothing. AT-disjoint — opens at HEAD. The blob's correct OETF path (`metaball.frag.ts:132-137,:278`) is the read-only reference, already landed at AU.W7 (`eb3d994`). The `/color` LUT bake (`oklchToLinear`) is correct and unchanged.
- **Blocks**: SHOULD land before the 3.3.0 publish hinge (E1, USER-DOMAIN) so the published aurora is not too-dark, but does not BLOCK the publish mechanics. **AV.W2 (the aurora↔blob shared-GLSL-chunk convergence)** consumes W1's verbatim-copied `linearToSrgb` (W1 copies the blob's transfer byte-for-byte SPECIFICALLY so W2 can hoist ONE shared copy and guarantee the OETF can never again diverge — the root of this very bug). W1 must land before W2.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The OETF defect is the **exact A5/A2 darkening trap the blob fixed at AU.W7 (`eb3d994` — "the OKLCh LINEAR shader-quality + the 8-assert CPU-equivalence")**: forcing the linear color path WITHOUT a `linearToSrgb()` OETF before output ships visibly ~2.2× too dark (linear 0.5 displays as ~0.215 instead of ~0.735). The blob converged onto the correct path at W7; AURORA WAS THE UN-CONVERGED SIBLING — it bakes the palette to linear (`color.ts:50-54` `oklchToLinear`, documented `DESIGN.md:150`), operates the whole pipeline in linear (palette interp, nuclei field, mediums, `saturate3`, ACES tonemap, grain — `:793-817`), but NEVER applied the OETF (`:817` outputs linear directly). The blob's gate (`proof:blob-space-gamma`, born at W7) names exactly this trap and forbids it for the blob; W1 EXTENDS that gate's reach to aurora so the same trap cannot recur on the sibling. The FBM rotated-octave matrix (`:124/:128`) was ALREADY correct (matches the blob's FBM_ROT) — no archaeology there. This wave + the follow-on AV.W2 (shared-GLSL-chunk convergence) close the divergence: W1 fixes by mirroring, W2 de-duplicates so divergence becomes structurally impossible.
