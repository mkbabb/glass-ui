# BD union — generative-viz REDEVELOPMENT coverage audit

**Question:** does the existing BD union (roster / DAG / waves) cover the new generative-viz REDEVELOPMENT mandate (blob first-principles, dot-matrix image-display, level-set concentric, perturbed paper-grid, per-viz configurator+interactivity, GPU-only no-Canvas2D)?

**Verdict: NO. The redevelopment mandate is ~90% ABSENT from the BD union.** The union's viz coverage is the *BC-baseline disposition* — narrow GL-fence/parity/tuning tails that PRESERVE the shipped suite as-is, plus an explicit "DO NOT MIGRATE / do NOT delete a fallback" stance. The new mandate inverts that disposition (GPU-only, no Canvas2D, no fallbacks, first-principles rebuilds). None of the redevelopment asks (blob FOUR-emotional-state/lava-lamp-satellites/multi-blob, dot-matrix arbitrary-image tessellation, concentric random-curve level-sets, deepened shared wave-perturbation, per-viz robust configurator+interactivity, the Canvas2D purge) has a wave that delivers it.

---

## Where the union touches the viz suite today

All viz scope lives in **TWO rows** of the UNIFIED-ROSTER, both Band-9 discharge / Band-3-tail:

- **`W-VIZ-TAILS`** (Band 9) — folds 8 narrow tail waves: `W-AURORA-WGSL-CURL`, `W-AURORA-WGSL-STROKES`, `W-AURORA-KUWAHARA-MULTIPASS`, `W-GOOBLOB-SAT-SHADE`, `W-GOOBLOB-SQUIRCLE-REFRACT`, `W-BLOB-MOTION-TUNE`, `W-VIZ-COMPUTE-DENSITY`, `W-VIZ-FALLBACK-RETIRE-WATCH`. "DEFER-with-trigger viz remainder — each fires on its real consumer/USER-HINGE; the watch re-affirms, never deletes a fallback."
- **`W-VIZ-PARITY-METAL`** (Band 8) — real-Metal cross-backend parity CAPTURES (validation, not redevelopment).

Band 6 (`W-AUR-SATIN/PRISM/AMBIENT-TINT/AUR-ALBUM/CONSUMER-BAND`) is **album-art-reactive aurora** for the dock/now-playing hallmark — adjacent but orthogonal to the generative-redevelopment asks. Band 7 `W-COLOR-PROTAGONIST/COLOR-CARD/SEED-MORPH` is the birthdaycolor "page-IS-this-color" facade over aurora — also dock/color-card scoped, not a viz rebuild.

**Each tail wave's actual goal (verified from `docs/tranches/BD/waves/*.md`):**

| Tail wave | What it does | Redevelopment-relevant? |
|---|---|---|
| `W-AURORA-WGSL-CURL` | mechanical splice: add `warpMode==3` curl branch to `aurora.wgsl.ts` (parity with `.frag`) | partial (GPU parity only) |
| `W-AURORA-WGSL-STROKES` | port the ~38KB Starry-Night oil STROKE cascade to WGSL | no (medium fidelity) |
| `W-AURORA-KUWAHARA-MULTIPASS` | USER-HINGE: re-surface FBO multi-pass Kuwahara, build only on greenlight | no |
| `W-GOOBLOB-SAT-SHADE` | per-satellite OKLCh-derived shade in both backends | partial (blob color only) |
| `W-GOOBLOB-SQUIRCLE-REFRACT` | squircle dome-Z + conditional Snell backdrop-refraction | partial (blob look only) |
| `W-BLOB-MOTION-TUNE` | tune `PULSE_ZETA`/flick-pseudopod on the live engine (either-or decision) | partial (blob motion polish) |
| `W-VIZ-COMPUTE-DENSITY` | GATED: GPU spatial-hash compute for constellation/fourier at counts ≫ default; "almost certainly HELD" | partial (the closest thing to a GPU-migration, but gated-off) |
| `W-VIZ-FALLBACK-RETIRE-WATCH` | WATCH-only: re-affirm the ~5-10% WebGL2-fallback tail; "do NOT delete a fallback this tranche" | **CONTRADICTS the GPU-only mandate** |

**The mandate-inversion, named:** the new edict says "ZERO Canvas2D, NO fallbacks, NO legacy, migrate fourier-field/constellation/dot-flow-field-fallback/aurora-raster-ground." The union's `PROCEDURAL-SUITE.md` disposition (the gate-locked source of truth) says the exact opposite: fourier-field + constellation are **"DO NOT MIGRATE (now)"**, the WebGL2/Canvas2D fallbacks are **KEPT** (`proof:gpu-substrate-single` clause B *machine-blocks* a premature retirement), and `W-VIZ-FALLBACK-RETIRE-WATCH` re-affirms that fence. No BD wave mentions "rename goo-blob→blob", "emotional states", "lava-lamp satellites", "multi-blob spawn", "tessellate arbitrary image", "level-set of a random curve", or "delete useCanvas2D" (verified: zero grep hits across `docs/tranches/BD/`).

---

## Per-viz coverage map (10 vizzes)

Legend: **COVERED** = a wave delivers the new ask · **PARTIAL** = a wave touches it but stops short / a facility partly exists on disk · **MISSING** = no wave, no facility.

### 1. aurora
- GPU status: WGSL primary MIGRATED; `.frag` WebGL2 fallback KEPT; **`auroraFallbackGround.ts` uses `getContext("2d")`** for the CSS-substrate raster ground (the named Canvas2D-purge target).
- **PARTIAL** — WGSL parity tails exist (`W-AURORA-WGSL-CURL/STROKES/KUWAHARA`). Album-reactivity (Band 6) is rich.
- **MISSING** — the Canvas2D raster-ground purge (no wave retires `auroraFallbackGround` getContext-2d); the per-viz robust configurator+birthdaycolor-interactivity uplift as a *redevelopment* (aurora's configurator exists but the "supersedes birthdaycolor" interactivity bar is owned by `W-COLOR-PROTAGONIST`, dock-scoped not viz-page-scoped).

### 2. goo-blob → "blob" (FIRST-PRINCIPLES REDEVELOPMENT)
- On disk TODAY: `useBlobMood` exists with **5 moods** (`idle|happy|curious|sleepy|excited`), `satelliteCount:3`, smin-bridge satellites, pointer-attraction. No rename, no cartoon-shadow toggle, no multi-blob spawn, no lava-lamp randomized morph-in/out, no configurator (`configurator-refs=0`).
- **PARTIAL** — the *tail* waves polish the SHIPPED blob: `W-GOOBLOB-SAT-SHADE` (sat color), `W-GOOBLOB-SQUIRCLE-REFRACT` (dome-Z + refraction), `W-BLOB-MOTION-TUNE` (motion honesty). A mood scaffold + satellites already exist.
- **MISSING** (the bulk of the ask):
  - **rename goo-blob → blob** (and `<GooBlob>`/`/goo-blob` subpath/`useGooBlob` → blob; clean break, no alias) — NO wave.
  - **cartoon-shadow style toggle** (an option for cartoon-shadow or not) — NO wave.
  - the mandated **FOUR "emotional" states controlling blob facilities + movement tendencies** — the live set is FIVE and the states drive timing, not the full "facilities + movement-tendency" axis the mandate names; a redevelopment to the canonical four is unspecced.
  - **configurable satellite COUNT morphing in/out lava-lamp-randomized** — count is fixed at 3, the morph is the orbit-bridge, not a randomized spawn/absorb lava-lamp register; NO wave.
  - **MULTIPLE blobs spawnable together interacting organically** (n-core multi-instance smin field) — NO wave (today is ONE core + N satellites).
  - **robust configurator + mouse/keyboard interactivity + birthdaycolor-like interactivity** — NO wave (no configurator at all today).
  - Note: `goo-dot-matrix` + `goo-blob` share `sceneDistG`; a blob first-principles rebuild has a **downstream blast radius** on `goo-dot-matrix` (byte-untouched field assumption) that no wave accounts for.

### 3. fourier-field
- GPU status: **Canvas2D** (`useCanvas2D`, `useFourierField.ts`). PROCEDURAL-SUITE marks it **"DO NOT MIGRATE (now)"**; the GPU port is the BOOKED `W-FOURIER-GPU` (trigger: thousands of phasors).
- **MISSING** — the GPU-only mandate requires migrating it off Canvas2D NOW; no BD wave does (the only candidate, `W-VIZ-COMPUTE-DENSITY`, is gated-off and about neighbor-binning, not the Canvas2D→GPU line-render). Configurator EXISTS (`refs=3`); interactivity uplift unspecced.

### 4. constellation
- GPU status: **Canvas2D** (`useCanvas2D`, `constellationRender.ts`/`constellationInteraction.ts`). PROCEDURAL-SUITE **"DO NOT MIGRATE (now)"**; booked `W-CONSTELLATION-GPU`.
- **MISSING** — same as fourier: the GPU-only mandate requires the migration NOW; `W-VIZ-COMPUTE-DENSITY` is the gated-off spatial-hash successor, not the mandated unconditional Canvas2D purge. Note constellation is ALSO consumed by the dock hallmark (`W-DOCK-CONSTELLATION` silhouette) — a render-engine swap has dock blast radius. Configurator absent (`refs=0`); interactivity uplift unspecced.

### 5. concentric (LEVEL-SET REDEVELOPMENT)
- On disk: a `static-contour` render mode + `contourLevels` exists, but it's a *concentric radial Fourier ring-interference* field, NOT level-sets of a randomly-generated curve; no per-level-set independent perturbation; does NOT import the shared `flow.*` wave-math.
- **MISSING** — no wave delivers: irregular level-set rings of arbitrary count drawn as **the level sets of a randomly-generated curve**; aggregate-moves-together with **random subtle per-level-set perturbation**; stretch/shrink; **warp with the SAME wave-math shared with grid + dot-matrix** (concentric does not import `flow.*` today). The `static-contour` partial is the nearest seed but is a different mathematical object.

### 6. dot-flow-field → "a dot-matrix facility" (IMAGE-TESSELLATION REDEVELOPMENT)
- On disk: a curl-noise flow field of advected particles; WebGPU compute primary + **Canvas2D point-cloud fallback** (`flow-field.glsl.ts` + getContext-2d); no image input, no tessellation, no halftone (`grep image/tessellat/halftone` = 0 hits).
- **MISSING** — no wave delivers: dots that **fade in/out + grow/shrink + TESSELLATE to display ARBITRARY IMAGES** in a dot-matrix (a blob/wave/cloud washing over naturally) leveraging aurora-like field logic. The Canvas2D fallback also violates the GPU-only mandate. This is a near-total redevelopment of the viz's purpose. (Note `goo-dot-matrix` register `dot-dither`/Bayer8 halftone is a *related* SDF-driven dot stamp but not arbitrary-image tessellation.)

### 7. dot-matrix
- GPU status: WebGPU instanced-billboard primary + WebGL2 instanced fallback (no Canvas2D). Fibonacci phyllotaxis dot-SPHERE. Configurator EXISTS (`refs=2`).
- **MISSING** — not named in the redevelopment asks directly, BUT: the mandate's "dot-matrix facility displaying arbitrary images" likely wants dot-matrix as the *shared rasterizer* for the dot-flow-field rebuild, and the "shared wave-math (concentric+dot-matrix+grid)" ask requires dot-matrix to warp/perturb with the shared field — dot-matrix does NOT import `flow.*` today. No wave covers either integration.

### 8. goo-dot-matrix
- GPU status: WebGPU dot-stamp primary + WebGL2 fallback (no Canvas2D). Composes the goo-blob field.
- **PARTIAL/AT-RISK** — not named in the asks, but it byte-splices the goo-blob `sceneDistG`; the blob first-principles rebuild will break that assumption. No wave tracks this dependency.

### 9. paper-grid (DEEPENED WARP/PERTURBATION + SHARED WAVE-MATH)
- On disk: WebGPU fragment primary + GLSL fallback (no Canvas2D); a Bridson curl-warped UV grid that ALREADY imports `flow.*` (the FIRST shared-chunk consumer).
- **PARTIAL** — the shared wave-math chunk exists and paper-grid consumes it. `W-AURORA-WGSL-CURL` extends the chunk's WGSL arm.
- **MISSING** — the mandate's "**deepen the warp/perturbation**" + make concentric+dot-matrix share the SAME wave-math is unspecced (paper-grid consumes flow.*; the other two do not, and no deepening wave exists).

### 10. watercolor-dot
- CSS/SVG blob (per-instance filter + seeded prng); not in the redevelopment asks; not Canvas2D. **N/A** (no new ask; out of scope unless folded into the dot-matrix/blob family).

---

## Cross-cutting MISSING items (no wave anywhere in the union)

1. **The Canvas2D PURGE / GPU-only mandate** — DIRECTLY CONTRADICTED by `W-VIZ-FALLBACK-RETIRE-WATCH` + `PROCEDURAL-SUITE`'s "DO NOT MIGRATE" + `proof:gpu-substrate-single` clause B (which machine-BLOCKS fallback retirement). Live Canvas2D users to purge: `useCanvas2D.ts` (+ `/canvas2d` barrel + `/canvas` subpath), `useFourierField.ts`, `constellationRender.ts`/`Interaction.ts`, `flow-field.glsl.ts`, `auroraFallbackGround.ts`. Deleting `useCanvas2D` cascades into `proof:webgl-substrate-single` clause e, `proof:constellation-substrate-single`, and `useGpuSubstrate`'s picker — a substantial gate-rewrite, completely unspecced.
2. **The blob rename (goo-blob → blob)** — clean break per no-legacy; touches subpath/api/barrel/structure-sync/colocation gates + `goo-dot-matrix`'s `goo-blob` import. No wave.
3. **A per-viz CONFIGURATOR + interactivity coverage law** — the mandate wants EACH viz to ship a robust configurator + mouse/keyboard + birthdaycolor-like interactivity. Today goo-blob + constellation have `configurator-refs=0`. There is no "viz coverage law" wave analogous to `W-GLASS-EVERY-ELEMENT`. MISSING.
4. **The shared wave-math UNIFICATION (concentric + dot-matrix + paper-grid)** — only paper-grid imports `flow.*`. No wave threads the shared perturbation across all three.
5. **goo-dot-matrix ↔ blob dependency tracking** under a first-principles blob rebuild. MISSING.

---

## Recommendation (for the planner — scope delta to add)

The BD union needs a **NEW Band (e.g. "Band 3' / VIZ-REDEVELOPMENT")** of first-principles waves, NOT more parity tails. Minimum new waves implied by the mandate:

- `W-VIZ-GPU-ONLY` — the Canvas2D purge + fallback-retirement (INVERTS `W-VIZ-FALLBACK-RETIRE-WATCH`; rewrites `proof:gpu-substrate-single` clause B; migrates fourier/constellation/dot-flow-fallback/aurora-ground). The keystone — everything else builds on the GPU-only substrate.
- `W-BLOB-FIRST-PRINCIPLES` (likely 2-3 waves) — rename → blob; cartoon-shadow toggle; FOUR emotional states (facilities + movement-tendencies); configurable lava-lamp satellite count (randomized morph-in/out); multi-blob spawn + organic n-core interaction; robust configurator + interactivity. Track the `goo-dot-matrix` blast radius.
- `W-DOTMATRIX-IMAGE` — the dot-flow-field → arbitrary-image tessellation rebuild (fade/grow/shrink dots tessellating a blob/wave/cloud, aurora-like field logic, sharing dot-matrix's rasterizer).
- `W-CONCENTRIC-LEVELSET` — irregular level-sets of a randomly-generated curve, aggregate-flow + per-level-set perturbation, shared wave-math.
- `W-VIZ-WAVE-MATH-SHARE` — deepen paper-grid warp + thread the shared `flow.*` perturbation into concentric + dot-matrix.
- `W-VIZ-CONFIGURATOR-LAW` — the per-viz configurator + mouse/keyboard + birthdaycolor-interactivity COVERAGE law (analogue of `W-GLASS-EVERY-ELEMENT`).

These must reconcile with the Band-6/7 aurora-reactivity + dock-hallmark waves (aurora and constellation are dock-consumed; an engine swap has dock blast radius) and with the Safari-floor band (GPU-only must still degrade-record on the ~5-10% WebGPU-gap tail — the mandate's "no fallbacks" needs squaring against Safari-absolute, a genuine tension to resolve in planning).
