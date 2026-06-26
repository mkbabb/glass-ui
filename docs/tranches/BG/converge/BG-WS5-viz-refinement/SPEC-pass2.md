# BG-WS5 · Viz refinement — SPEC pass 2 (the M6 frontier + the binding paired-engine paint-π)

> Verified against HEAD `tranche/BG @823b8c53` (glass-ui 4.2.0). This pass **advances** the
> converged pass-1 spec (`SPEC-pass1-converged.md`) — it does NOT restart. M1–M5 + M7 carry a
> build-true validated mechanism + a hardened bar from pass-1 and are unchanged here except where a
> pass-2 finding sharpens them (the PREVIEW-LIVE still decision, item 5). **This pass closes the two
> open frontiers:** (A) `BG.W-VIZ-SUBSTRATE-FACTOR` (M6) — the factor-vs-DELETE KISS question, RESOLVED;
> (B) the paired chromium+webkit real-paint-π — its form CORRECTED to the producible falsification and
> SPECIFIED for execution.
>
> **Source re-confirmed at pass-2 (file:line):** only `dot-flow-field` + `fourier-field` carry `@compute`
> (fourier demigrates → dot-flow is the SOLE survivor); concentric/paper-grid/aurora/goo-blob WGPU setups
> are single-uniform fullscreen-triangle `draw(3,1,0,0)`; goo-dot is two-buffer (binding 0 + binding 1 +
> `groundPipeline`); `useGpuSubstrate.ts:251` `attemptWebGPU = supportsWebGPU() && options.setupWGPU != null`
> (drop `setupWGPU` → transparent WebGL2 fall); `aurora-mediums.wgsl.ts` carries `uMedium 0-7`
> (kuwahara/oil/vangogh — the WGSL capability); every `gpu-parity-table.md` row is `deltaE 0.0` /
> "DEVICE-FREE STRUCTURAL PROXY" / "BINDING Metal-GPU capture rides W-REFLECT3" (the deferred-FOUR-times
> unfalsified claim); `webgpu-everywhere.spec.ts` exists (the proven real-GPU readback); `viz-parity-metal.spec.ts`
> ABSENT; webkit `testMatch` scoped to `[safari-webgl, aurora-swraster]`; chromium-headless-new arms
> `--enable-unsafe-webgpu --ignore-gpu-blocklist` + ANGLE=metal; webkit project carries NO ANGLE/WebGPU
> flags; `concentric/levelField.ts` + `paper-grid/paperGrid.ts` are pure CPU leaves; goo-blob has none.

---

## BINDING CARDINAL LAWS

Unchanged from pass-1 (liquid-weight on all motion · gestalt-not-patch · NO legacy/clean-breaks ·
KISS+DRY+DEFT · colocate · presets-in-consumers · iOS-27 warm/weighty identity · **Chrome AND Safari** ·
**real-paint-verify is THE bar** — the headless-green/visually-broken trap shipped 3× · foreign-tree fence).

---

## GESTALT GOAL (pass-2 sharpening)

The pass-1 destination stands: 11 distinct previews over ≤1 live context, the hover card materializes,
every viz sizes `round(gBCR×dpr)` on both engines, fourier+constellation on useCanvas2D. **Pass-2 adds
the substrate-identity resolution and the verification cure:**

1. **The viz suite speaks ONE honest substrate rule** — *WebGPU is kept IFF it earns a capability the
   WebGL2 path cannot express.* By that rule the suite collapses to **one WGPU-earning compute viz
   (dot-flow), one flagship WGSL primary that carries a register WebGL2 lacks (aurora — the painterly
   mediums), and a WebGL2-only fragment/render majority.** The "two languages, two paths, gated by a
   ΔE-0.0 tautology" carrying cost — the very thing the parity gate enshrines — is **deleted, not
   factored.** Factoring a duplication you should delete is the KISS smell; M6 is a NET DELETE.

2. **The "zero visual change" claim becomes FALSIFIABLE.** Every parity row records `deltaE 0.0` from a
   CPU-evaluator-vs-itself proxy; the real Metal capture was deferred **four times** (BB W-REFLECT3 →
   "rides this close" → BE.W-VIZ-PARITY-METAL → P-chronic D24). The prerequisite excuse is dead (webkit
   installed, this is a Metal box). **But the deferred bar's FORM is unproducible** — playwright-webkit
   exposes no WebGPU, so a cross-ENGINE WGSL-vs-WGSL capture has no WGSL on the webkit half, and the
   DELETED viz have no second path to diverge. Pass-2 replaces it with the producible falsification that
   already ships (`webgpu-everywhere.spec.ts`'s W4): the WGSL primary **arms + paints real meanByte>floor
   on chromium-Metal** (the structural-proxy-0.0 lie finally falsified), and the meaningful ΔE is the
   **same-engine WGSL-vs-forceWebGL2** readback on the kept primaries — never the impossible cross-engine
   one.

---

## M6 RESOLVED · `BG.W-VIZ-SUBSTRATE-FACTOR` re-chartered as `BG.W-VIZ-SUBSTRATE-DELETE`

> **The pass-1 frontier (prototype build=false, the factor-vs-delete question unmade) is RESOLVED:
> DELETE, do not factor. The wave builds zero new leaves; it removes paths.** 7 of 8 research lenses
> converge on DELETE; the lone FACTOR holdout (web-sota) concedes DELETE is "internally consistent with
> DEMIGRATE." The name change records the gestalt: this is not a scaffold-factor, it is a substrate
> consolidation onto the WebGL2 path.

### The decision, per viz (stated, with rationale)

| viz | WGPU primary at HEAD | earns WebGPU? | verdict |
|-----|---------------------|---------------|---------|
| **dot-flow-field** | `@compute` GPGPU lattice advection | YES (compute the .glsl net can't express well) | **KEEP WebGPU-first** (M7 DOTFLOW-REBUILD owns it) |
| **aurora** | fragment + `uMedium 0-7` painterly register | capability-bearing (kuwahara/oil/vangogh WGSL register + booked `W-AURORA-WGPU-MEDIUMS-STROKES`) | **KEEP WGSL primary** — but run the **arm-probe** (below) to FALSIFY it paints; do NOT fold an aurora-retire into M6 |
| **concentric** | single-uniform fullscreen-triangle fragment | NO (no compute, no capability, no flagship status) | **DELETE-WGPU → WebGL2-only** |
| **paper-grid** | single-uniform fullscreen-triangle fragment | NO (lightest viz, no compute) | **DELETE-WGPU → WebGL2-only** |

**Explicitly OUT of M6 scope (recorded, not silently dropped):** goo-blob (fragment lit-glass — `fwidth`
runs on WebGL2 ES3 too), dot-matrix (instanced billboards — WebGL2 has instancing), goo-dot (two-pass
fragment — WebGL2-FBO-expressible) are **DELETE-WGPU-ELIGIBLE by the same rule** but are NOT in the
brief's named M6 set (aurora/concentric/paper-grid). Widening M6 into a 6-viz reversal mid-flight risks
the unbounded spiral the risk lens warns of. **Book `BG.W-VIZ-SUBSTRATE-DELETE2`** (a named follow):
delete goo-blob/dot-matrix/goo-dot WGPU **gated on their arm-probes** — if a viz's WGSL primary provably
never arms on the dev-box (the structural-proxy-0.0 fingerprint made real), its WGPU path is dead code and
deletes; if it paints, it is re-decided against the capability rule. This keeps M6 scoped and the wider
consolidation honest + triggered, never speculative.

### What M6 does NOT build (the explicit anti-abstraction decision — state it so it is not re-minted)

- **`createFragmentFieldPass` — NOT BUILT.** After the delete, the M6-scope single-uniform fragment-WGPU
  set is `{aurora}` alone (goo-blob is out of scope; concentric/paper-grid are gone). A leaf factoring
  the ~55-line pipeline-build ceremony for **one** consumer is textbook premature abstraction — and the
  duplication that motivated it is being deleted, not shared. The pass-1 prototype's `build=false` was the
  symptom; the cure is to not build it.
- **`defineUniformLayout` — NOT BUILT.** The surviving WGPU bridges (aurora / dot-flow / goo-blob /
  dot-matrix / goo-dot) have genuinely different structs (single-uniform vec4-packed vs storage-particle
  vs two-pass); a descriptor leaf factors only a ~10-line `ArrayBuffer`+typed-view scratch across 5
  dissimilar shapes — and concentric's two bridges (the only ones it would have unified) are deleted. The
  color math is **already** single-source (`composables/color`, imported by 5 bridges — aurora NOT among
  them); the honest win was never "oklchToLinear once."
- **`createFragmentGLPass` (the GL2 twin) — NOT BUILT, BOOKED with a named trigger.** `webgl/compile.ts`
  already single-sources `compileShader`+`linkProgram` (every GLSetup consumes it). The residual
  `createProgram`/fullscreen-triangle-VBO/`getUniformLocation`/`drawArrays` boilerplate is ~15 lines at
  ~50% per-viz diff between `concentricGLSetup.ts`↔`paperGridGLSetup.ts` — below the factor bar.
  **Book `createFragmentGLPass` with trigger `≥3 GL fragment-pass consumers`** (concentric + paper-grid =
  2; the 3rd is goo-blob/dot-matrix if SUBSTRATE-DELETE2 lands). A 2-consumer ~50%-shared factor is the
  same KISS smell M6 just refused for the WGPU side — symmetry holds.

### The delete mechanism (clean break, atomic, co-reverting the gate triangle)

For concentric + paper-grid, in ONE wave:

1. **Drop `setupWGPU` from the `createGpuSubstrate` call** (`useConcentric.ts`, `usePaperGrid.ts`).
   `useGpuSubstrate.ts:251` gates WebGPU on `setupWGPU != null`, so the absence transparently falls to the
   WebGL2 net — `createGpuSubstrate` stays as a harmless WebGL2 pass-through, OR (cleaner, no-legacy)
   switch the call to `useWebGLCanvas` directly + the kept `createConcentricGLSetup`/`createPaperGridGLSetup`.
   Prefer the direct `useWebGLCanvas` bind (one substrate, no dead picker arm).
2. **Delete** `concentric.wgsl.ts`, `concentricWGPUSetup.ts`, `concentric/uniformBridgeWGPU.ts`;
   `paper-grid.wgsl.ts`, `paperGridWGPUSetup.ts`, `paper-grid/uniformBridgeWGPU.ts` (≈6 files / ~480 LOC).
   **Verify the orphaned shared WGSL chunks** (`procedural-color.wgsl.ts`, `flow.wgsl.ts`) stay alive via
   dot-flow's `flow-field.render.wgsl.ts` import before deleting any — delete only the genuinely orphaned.
3. **Co-revert the parity triangle in the SAME diff (binding both ways — a `verified` row pointing at a
   deleted `.wgsl` REDs `proof:gpu-substrate-single`'s on-disk-resolves anti-evasion floor):**
   - Add `concentric` + `paper-grid` to `proof-gpu-substrate-single.mjs:181` `NON_MIGRATING` (the set M4
     DEMIGRATE also edits — co-move with M4's fourier+constellation flip; a partial land RED-floors at
     `:177-179`).
   - Flip their `gpu-parity-table.md` rows `verified` → `no-migrate` (+ the WebGL2-only reason).
   - **Delete the now-dead capture PNG triples** (`docs/tranches/.../concentric-parity/`, `paper-grid-parity/`).
   - **Re-pin `profile-bundle.mjs` ceilings DOWN** (the `.wgsl` bytes leave the chunk).
   - Extend M4's net-new **`proof:proc-suite-substrate`** to assert each delisted dir carries **no `.wgsl`
     + no `createGpuSubstrate`** (so a 5th silent re-migration RED-floors).
4. The **deferred-forever Metal parity obligation is MOOT for these two** — there is no second backend to
   diverge. The strongest KISS argument: you cannot have a parity bug between two paths when there is one
   path. **Delete the obligation; do not chase a capture for it.**

### aurora — KEEP, but FALSIFY (quarantined out of M6's delete, the arm-probe is the honesty)

aurora's WGSL primary stays (flagship + the `uMedium` capability + booked successors + the WS5-13
"WebGPU-first" directive; deleting it is a multi-doc, multi-booked-wave reversal). **But its
structural-proxy-0.0 is the same unfalsified lie.** M6 runs the **aurora arm-probe** as part of the
binding π (below): on chromium-Metal the aurora WGSL primary must `requestAdapter` (not software-rejected),
its pipeline must validate (not the lying-adapter reject the `useWebGPUCanvas` guard catches), and it must
paint **meanByte > floor** — the first real proof in project history that aurora's WGSL path actually
arms. **If it provably never arms on the dev-box, that is a FINDING** (aurora has been silently falling to
WebGL2 forever), surfaced for a dedicated user-gated aurora-WGSL-retire — NOT auto-deleted inside M6.

---

## THE PAIRED PAINT-π · form CORRECTED + SPECIFIED for execution

> The brief asks for "the paired chromium-headless-new + webkit Metal cross-backend parity capture (ΔE
> mean≤2.0/p99≤5.0)." Pass-2 finding: **that exact form is unproducible** — playwright-webkit (webkit-2287)
> exposes no WebGPU (the webkit project carries no ANGLE/WebGPU flags and "drives its own WebGL/Metal
> path"), so it always paints the WebGL2 fallback; there is no WGSL primary on the webkit half to ΔE
> against, and the DELETED viz have no second path. The bar deferred four times because its form was
> impossible. Pass-2 binds the **producible** falsification instead — and is explicit that this IS
> "real-paint-verify," not a dodge.

### The reframed parity bar (`viz-parity-metal.spec.ts` — the BE deliverable, finally built)

Transpose the PROVEN readback in `webgpu-everywhere.spec.ts` (compositor `locator.screenshot` → pngjs
decode → byte-domain `meanByte`/`maxChannel`/`coverage` paint-existence floor — the constellation-dark
trap already solved there). Two arms, both producible on this Metal box:

- **A · The arm-and-paint falsification (the structural-proxy-0.0 cure).** For each KEPT WGPU primary
  (aurora, dot-flow, goo-blob): on **chromium-headless-new** (`--enable-unsafe-webgpu --ignore-gpu-blocklist`,
  ANGLE=metal), assert (1) the WGSL primary ARMS — `requestAdapter()` succeeds, not
  `isSoftwareWebGPUAdapter`, the pipeline validates with a clean `popErrorScope('validation')`; (2) it
  paints **meanByte > MEAN_BYTE_FLOOR** (a black void reads ≈0 → REDs by construction). This is the W4
  readback the ΔE-0.0 tautology never had — the FIRST falsification that the WGSL path actually paints.
- **B · The same-engine WGSL-vs-forceWebGL2 ΔE (the meaningful cross-BACKEND, never cross-ENGINE).** On
  chromium-Metal, capture the WGSL-primary frame and the `forceWebGL2` fallback frame of the SAME viz at
  the SAME `t`, decode both, assert **ΔE mean ≤ 2.0 / p99 ≤ 5.0** (CIEDE2000, NOT ΔE76 — the blue-violet
  hue-rotation correction matters for the legendre-violet `--motion-accent` palette). `mean > 0` is
  REQUIRED on goo-blob's `fwidth` row (a 0.0 there is the proxy fingerprint — real per-GPU derivative
  drift must register). This compares two BACKENDS on ONE real GPU — the only honest ΔE.

The DELETED viz (concentric/paper-grid) are OFF this spec entirely (no second path); their bar is "renders
WebGL2-only on BOTH chromium-Metal AND webkit, crisp, no `createGpuSubstrate`/no `.wgsl`" — and webkit
IS their Safari path now, so the webkit come-up proves Safari paints them.

### The 4 build-true waves' binding SPA-nav paint-π (the brief's item 4, executed)

Run at the **SPA-nav window** (route-nav, not hard-load — the regression only reproduces on nav), all
reads compositor `locator.screenshot`, on BOTH `chromium-headless-new` AND `webkit`:

| wave | binding paint-π assertion |
|------|---------------------------|
| **SIZER-ADOPT-HARD** | per-viz `canvas.width/height == round(gBCR × dpr)` AND aspect-matches-gBCR on BOTH engines; the F8 aspect read sourced from **`canvas.width/canvas.height`** (set by `sizeBacking`) — NOT a `BackingSize` plumbed into `frame()` (the contract can't carry it); goo-blob π reads the CANVAS gBCR (the 160% absolute canvas), not the wrapper's; `probePipeline` `popErrorScope` still surfaces draw-invalid pipelines on webkit after the `frameHooks?.resize()` removal |
| **DEMIGRATE** | `/substrates/constellation` + `/substrates/fourier-field` render with NO `createGpuSubstrate` + no `.wgsl` in either dir; crisp DPR arc (no low-res `arc()`); `source-over` edges (no `lighter` hue-blowout); non-zero pixels mounted-below-fold-then-scrolled-in; both modes |
| **REVEAL-BLOOM** | entrance field-luminance overshoot **≥12% then settle** via the **deterministic brightness-filter readback** (NOT raw 8-bit luma — it quantized webkit's pass to +12.5% against a 12% bar, 0.5% margin); canvas rect `scale(1)` every frame; scroll-off-and-back fires **zero** second bloom (`revealFired` guard); PRM → instant settled, zero ramp |
| **PREVIEW-LIVE** | 11 cards → **11 distinct per-card pixel-hashes** AND a per-viz recognizability assert for the field viz; ≤1 live GL/WGPU context on the landing; hovered card animates; both modes; PRM → stills only |

**Enrollment is the gating prerequisite, not availability:** webkit-2287 + the project EXIST; the gap is
that `playwright.config.ts:118` `testMatch` is scoped to 2 specs. **Widen the webkit `testMatch`** to
`viz-parity-metal.spec.ts` + the 4 build-true viz specs, in the SAME wave that authors each. **Rebuild
`dist` first** (`npm run build` — stale since the M1/M4 src edits land); specs that import `dist/*.js`
read the rebuilt bundle. The webkit binary install is already satisfied.

---

## ITEM 5 · PREVIEW-LIVE shader-resident still decision, PER VIZ (corrects pass-1)

The still mechanism is the shipped **Path A**: CPU-raster each viz's single frame off its **pure math
leaf** into a 2D-canvas `toDataURL` (the `auroraFallbackGround.ts` pure-CORE/canvas-SHELL pattern) — ZERO
GL/WGPU contexts, substrate-independent (so DELETE-WGPU does not change the still story). Module-memo per
`storyId` (one raster, not per card-mount). **Pass-2 corrects the pass-1 over-lumping** (it wrongly grouped
concentric+paper-grid with goo-blob as "shader-resident, no pure leaf"):

- **LEAF-BACKED — recognizable-by-construction, node-hashable (7 viz):** aurora (`sampleAuroraField`),
  fourier-field (`math.ts partialSumAt/positionsAt`), constellation (`constellationField.ts`), dot-flow
  (`flowField.ts`), dot-matrix (`dotMatrixField.ts`), **concentric (`levelField.ts` — CONFIRMED present,
  CPU-raster the hypsometric level-set at t=0)**, **paper-grid (`paperGrid.ts` — CONFIRMED present,
  CPU-raster the curl-warped grid coverage at t=0)**. CPU-raster each pure leaf at t=0; the still IS
  recognizable, not an approximation.
- **GATED RECOGNIZABLE APPROXIMATION — stated honestly, NOT presented as leaf-composed (2 viz):** goo-blob
  + goo-dot. The smin SDF lives only in `metaball.wgsl`/`metaball.frag` — `goo-blob/composables/` has NO
  field sampler (CONFIRMED: only `buildMetaballProgram`/`useMetaballRenderer`). Each gets a **net-new tiny
  merged-circle `blobField` CPU approximation**, gated + LABELED an approximation in the registry (not
  routed to varied-aurora — that re-skins the exact defect).
- **HONEST FIELD STILL — by decision (2 viz):** glass-material + glass-panel are glass-SURFACE demos, not
  procedural fields; a field backdrop is honest, a DECISION not a coincidence.

= 11 recognizable signatures (warm-nuclei / epicycle-curve / dot-edge-lattice / streamlines / dot-sphere /
hypsometric-rings / liquid-grid / gel-droplet / dot-blob / 2× glass-surface), hash-distinct per card.
**Sequence the fourier+constellation stills AFTER DEMIGRATE** — post-demigrate they render on useCanvas2D,
so their still IS their own Canvas2D render at t=0 (zero re-author, the cleanest path).

---

## FILES TOUCHED (pass-2 deltas over pass-1)

**`BG.W-VIZ-SUBSTRATE-DELETE` (was -FACTOR):** DELETE `concentric/{concentric.wgsl,concentricWGPUSetup,
uniformBridgeWGPU}.ts` + `paper-grid/{paper-grid.wgsl,paperGridWGPUSetup,uniformBridgeWGPU}.ts`; re-bind
`useConcentric.ts`/`usePaperGrid.ts` to `useWebGLCanvas` + the kept GLSetup; add both to
`proof-gpu-substrate-single.mjs:181 NON_MIGRATING` (co-move with M4); flip `gpu-parity-table.md` rows →
`no-migrate`; delete dead capture PNG triples; re-pin `profile-bundle.mjs` DOWN; extend
`proof:proc-suite-substrate`. **No new leaf files.** Verify orphaned shared WGSL chunks before deleting.

**The π specs:** NEW `tests-visual/viz-parity-metal.spec.ts` (transpose `webgpu-everywhere.spec.ts`'s
readback — arm-and-paint arm A + same-engine WGSL-vs-forceWebGL2 ΔE arm B on aurora/dot-flow/goo-blob);
widen `tests-visual/playwright.config.ts:118` webkit `testMatch` to `viz-parity-metal` + the 4 build-true
viz specs; `npm run build` (dist refresh).

All other files-touched are unchanged from pass-1 §FILES TOUCHED.

---

## WAVE BREAKDOWN (pass-2)

| # | Wave | Pass-2 status |
|---|------|---------------|
| 1 | **BG.W-VIZ-INTRINSIC-SIZE** | converged (pass-1) |
| 2 | **BG.W-VIZ-SIZER-ADOPT-HARD** | converged build-true; **+ binding SPA-nav paint-π executed** (item 4) |
| 3 | **BG.W-VIZ-DEMIGRATE** | converged build-true; **+ binding paint-π executed**; co-moves the NON_MIGRATING flip with M6 |
| 4 | **BG.W-VIZ-REVEAL-BLOOM** | converged build-true; **+ binding brightness-overshoot paint-π executed** |
| 5 | **BG.W-VIZ-PREVIEW-LIVE** | converged; **item-5 still decision finalized** (7 leaf / 2 gated-approx / 2 field) |
| 6 | **BG.W-DOTFLOW-REBUILD** | converged (compute STAYS WebGPU — the sole earner) |
| 7 | **BG.W-VIZ-SUBSTRATE-DELETE** | **RESOLVED (was the frontier)** — DELETE concentric+paper-grid WGPU, KEEP aurora (arm-probe), build no leaves, co-revert the gate triangle. Depends on M4 (shared NON_MIGRATING edit) + M2/M1 |
| 8 | **BG.W-GOODOT-SETUP-SPLIT** | converged (carve the M1-adopted shape) |
| 9 | **BG.W-BLOB-KINEMATICS-LEAF** | converged |
| — | **BG.W-VIZ-SUBSTRATE-DELETE2** (booked) | goo-blob/dot-matrix/goo-dot WGPU delete, GATED on per-viz arm-probe |
| — | **`createFragmentGLPass`** (booked) | GL2 fragment-pass factor, trigger `≥3 GL fragment consumers` |

Wave 7 co-edits `proof-gpu-substrate-single.mjs:177-181` with Wave 3 — **land them as one atomic gate edit**
(four rows — fourier/constellation/concentric/paper-grid — flip to `no-migrate` together, or it RED-floors).

---

## ACCEPTANCE / REAL-PAINT-π BAR

The convergence bar, with the M6 + parity corrections folded:

- **/substrates landing:** 11 visually-distinct previews (per-card pixel-hash differs) + per-viz
  recognizability; ≤1 live GL/WGPU context; hovered card animates; both modes. (PREVIEW-LIVE)
- **Sizer:** `grep "clientWidth ||" src/components/custom = 0`; `grep dprPolicy ≥ 9`; per-viz backing
  `== round(gBCR × dpr)` at the SPA-nav window on Chrome AND Safari; `probePipeline popErrorScope` clean on
  webkit; offscreen-park fires for the park-less viz; below-fold-then-scroll-in → backing ≠ 300×150 ≠ 1px +
  non-zero pixels. (SIZER-ADOPT-HARD)
- **Reveal:** entrance brightness-filter overshoot ≥12% then settle (deterministic readback); canvas rect
  `scale(1)`; scroll-off-and-back fires zero second bloom; PRM → instant; `useVizChoreography.ts`
  DEFINITION-ABSENT. (REVEAL-BLOOM)
- **Demigrate:** fourier-field + constellation render on `useCanvas2D` (no `createGpuSubstrate`, no
  `.wgsl`); ≥13 files + ≥2500 LOC deleted; crisp DPR arc, no `lighter`; budget re-pinned DOWN. (DEMIGRATE)
- **Substrate-delete:** concentric + paper-grid render WebGL2-only (no `createGpuSubstrate`/no `.wgsl`);
  `createFragmentFieldPass`/`defineUniformLayout` DEFINITION-ABSENT (the anti-abstraction decision holds);
  the gate triangle co-reverts GREEN (no `verified` row points at a deleted `.wgsl`); `proof:proc-suite-substrate`
  asserts the delisted dirs. (SUBSTRATE-DELETE)
- **Parity (reframed, producible):** `viz-parity-metal.spec.ts` GREEN — aurora/dot-flow/goo-blob WGSL
  primaries ARM + paint meanByte>floor on chromium-Metal (the structural-proxy-0.0 falsified); same-engine
  WGSL-vs-forceWebGL2 ΔE mean≤2.0/p99≤5.0 (CIEDE2000), `mean>0` on goo-blob's `fwidth` row; webkit proves
  the WebGL2 path (incl. concentric/paper-grid Safari) paints. Enrolled in the webkit `testMatch`; dist
  rebuilt.

---

## FOLDED DEFERRED ITEMS (pass-2 additions)

- **BE.W-VIZ-PARITY-METAL / P-chronic D24 (deferred 4×)** → **PRODUCED** as `viz-parity-metal.spec.ts`,
  form corrected to the producible arm-and-paint + same-engine ΔE (the cross-engine WGSL-vs-WGSL form was
  impossible — webkit has no WebGPU). NOT deferred a fifth time.
- **The M6 factor-vs-delete frontier** → RESOLVED DELETE; `createFragmentFieldPass`/`defineUniformLayout`/
  `createFragmentGLPass` decided NOT-BUILT (anti-abstraction) / BOOKED (GL twin, ≥3-consumer trigger).
- **goo-blob/dot-matrix/goo-dot WGPU** → BOOKED `BG.W-VIZ-SUBSTRATE-DELETE2`, gated on per-viz arm-probe.

---

## OPEN RISKS / RESIDUAL GAPS

- **The aurora arm-probe outcome is unknown at spec time.** If aurora's WGSL primary provably never arms
  on the dev-box (no realGpu meanByte record has EVER existed for any WGSL primary in project history —
  the structural-proxy-0.0 fingerprint), then KEEPING it is keeping dead code, and a user-gated aurora-WGSL
  retire is escalated OUT of M6. The arm-probe (prototype P1) settles it before the wave trusts the KEEP.
- **playwright-webkit WebGPU presence is the single empirical unknown** that decides whether ANY
  cross-engine WGSL capture is producible. The pass-2 finding (webkit project has no WebGPU flags, drives
  its own path) says NO — the prototype must confirm `navigator.gpu` is absent/non-arming on webkit-2287,
  which validates the same-engine-ΔE reframe. If it surprisingly arms, the cross-engine arm is added (a
  free upgrade), but the spec does not depend on it.
- **The same-engine WGSL-vs-forceWebGL2 ΔE requires a `forceWebGL2` capture seam** on each kept primary —
  `useGpuSubstrate` already supports the WebGL2 net (drop `setupWGPU` or a force flag); confirm the demo
  route exposes a `?backend=webgl2`-style override, or the spec adds one (demo-private, presets-in-consumers).
- **SIZER-ADOPT TS-bivariance residual** (a `resize` that ignores `s` still compiles) — enforced by
  `proof:viz-resize-upload-only` + the cross-engine paint π (recorded honestly, structural compile-forbid
  not achievable). Unchanged from pass-1.
- **REVEAL-BLOOM webkit overshoot margin** is +12.5% vs a 12% bar (0.5%) — the deterministic
  brightness-filter readback (not 8-bit luma) is mandatory; the bar is fragile on the very engine the trap
  is about.
