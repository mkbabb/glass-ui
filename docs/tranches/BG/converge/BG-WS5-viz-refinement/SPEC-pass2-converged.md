# BG-WS5 · Viz refinement (the substrate band) — SPEC pass 2 CONVERGED

> Verified against HEAD `tranche/BG @823b8c53` (glass-ui 4.2.0); the M6 + parity import-graph facts
> RE-confirmed at converge against live source (file:line below). This pass **advances** the
> pass-1 converged spec (`SPEC-pass1-converged.md`) — M1–M5 + M7 carry a build-true validated mechanism
> + a hardened real-paint-π bar from pass-1 and are unchanged except where a pass-2 finding sharpens
> them. This pass closes the two open frontiers and folds every pass-2 critique mustFix:
> **(A)** `BG.W-VIZ-SUBSTRATE-FACTOR` (M6) → re-chartered `BG.W-VIZ-SUBSTRATE-DELETE` (DELETE, not factor —
> validated build-true on concentric P2 + the atomic-gate co-revert P3); **(B)** the paired
> chromium+webkit real-paint-π — its form CORRECTED to the producible falsification (cross-engine
> WGSL-vs-WGSL is impossible) and SPECIFIED + seamed for execution (the `forceWebGL2` init-script seam,
> validated reachable P5).
>
> **Convergence state:** all 9 waves carry a validated mechanism + a real-paint-π bar; the SPEC is
> develop-ready. The single remaining frontier is **EXECUTION of the binding paired-engine paint-π** —
> the seam is validated-reachable but the arm-B capture build=FALSE (a sketch, never compiled/run), no
> real arm-A `meanByte` / arm-B ΔE numbers exist yet, and the **aurora arm-probe outcome is unknown**.
> Per the workstream's cardinal law (real-paint-verify is THE bar — the headless-green/visually-broken
> trap shipped 3×), that execution is named load-bearing per wave and is the nextPass frontier.

---

## SOURCE RE-CONFIRMED AT CONVERGE (the load-bearing facts the critiques disputed)

| fact | verdict | file:line |
|------|---------|-----------|
| `CURL_FBM_WGSL` consumers | **ONLY** `paper-grid.wgsl.ts:23` + `concentric.wgsl.ts:19` → **orphan after M6** | `flow.wgsl.ts` def; 2 importers |
| `WAVE_FIELD_WGSL` consumers | `paper-grid.wgsl.ts:24` + `concentric.wgsl.ts:20` + the `wave/index.ts:22` re-export → **orphan after M6** | `waveField.wgsl.ts` def |
| dot-flow uses `flow.wgsl`? | **NO** — it uses `flow-field.compute.wgsl.ts` (the pass-2 "stays alive via dot-flow" premise was WRONG) | `dot-flow-field/shaders/` |
| `procedural-color.wgsl` consumers | aurora · dot-matrix · goo-blob · dot-flow(render) · (+ the 3 deleted) → **STAYS** | 7 importers |
| `proof:aurora-curl-warp` couples `flow.wgsl`? | **NO** — W1 checks `flow.glsl.ts`/`CURL_FBM_GLSL` only; the WGSL arm is explicitly *booked* → **UNAFFECTED by the orphan delete** | `proof-aurora-curl-warp.mjs:125,160` |
| `CONCENTRIC_FIELD_NORM` | exported `concentric/uniformBridgeWGPU.ts:47`, **imported+used** `concentricGLSetup.ts:24,139` → **relocate before delete (TS2307)** | — |
| paper-grid GLSetup imports its WGPU bridge? | **NO** → paper-grid bridge **deletes clean** (the asymmetry is real) | `paperGridGLSetup.ts` |
| `NON_MIGRATING` set at HEAD | `new Set(["watercolor-dot"])` → must become **5 members** atomically | `proof-gpu-substrate-single.mjs:181` |
| `proof:viz-papergrid` / `proof:viz-constellation` / `proof:fourier-field` tags | **`["local","ci","release"]`** → block the RELEASE tag (teardown is release-gating) | `gates.mjs:1888/1875/1871` |
| `proof:concentric` tags | `["local","ci"]` (no release) | `gates.mjs:1358` |
| `webgpu-everywhere.spec.ts` arms | routes `constellation`(36)/`fourier-field`(37)/`concentric`(39); primaries map `concentric`(174); iterate `[aurora,concentric,flowRender,flowCompute]`(209) → **drop the 3 deleted arms** | — |
| `gpu-parity-table.md` concentric note | STALE — references `composables/ringField.ts sampleRingField` (retired); HEAD leaf is `levelField.ts` → **reconcile in-diff** | `gpu-parity-table.md:94` |

---

## BINDING CARDINAL LAWS (every wave)

liquid-weight/inertia/bounce on ALL motion+transitions+scrolling · gestalt-not-patch · NO legacy
(clean breaks, no aliases/shims/dual-paths) · KISS + DRY + DEFT (a union, never a bolt-on/fork) ·
colocate composables with components · break >500-line files into colocated sub-dirs without
contrivance · presets-in-consumers · warm/weighty iOS-27 identity (12 laws of animation,
cartoon-technicolor punch, aristotelian √φ, perfected glass+paper morphism) · **Chrome AND Safari** ·
**real-paint-verify is THE bar** (the headless-green/visually-broken trap shipped 3×) · foreign-tree
fence ABSOLUTE (edit ONLY glass-ui).

---

## GESTALT GOAL

The viz **runtimes** are sound and warm-by-default; "/substrates previews broken" is a
**substrate-plumbing** failure, not a shader-quality one. Pass-1 resolved the five matched defects
(the un-adopted leaf sizer, the `auto none` zero-collapse, the no-op reveal-bloom, the doc-defying
dual-stacks, the DRY duplication). Pass-2 adds the **substrate-identity resolution** + the
**verification cure**:

1. **The suite speaks ONE honest substrate rule** — *WebGPU is kept IFF it earns a capability the
   WebGL2 path cannot express.* By that rule the suite collapses to **one WGPU-earning compute viz
   (dot-flow), one flagship WGSL primary carrying a register WebGL2 lacks (aurora — the `uMedium 0-7`
   painterly mediums), and a WebGL2-only fragment/render majority.** The "two languages, two paths,
   gated by a ΔE-0.0 tautology" carrying cost is **DELETED, not factored** (factoring a duplication you
   should delete is the KISS smell). M6 is a **NET DELETE** that builds zero leaves.

2. **The "zero visual change" claim becomes FALSIFIABLE.** Every parity row records `deltaE 0.0` from a
   CPU-evaluator-vs-itself proxy; the real Metal capture was deferred **four times**. The prerequisite
   excuse is dead (webkit installed, this is a Metal box). The deferred bar's FORM was unproducible
   (playwright-webkit exposes no WebGPU → no cross-ENGINE WGSL-vs-WGSL; the deleted viz have no second
   path). Pass-2 binds the **producible** falsification: the WGSL primary **arms + paints real
   meanByte>floor on chromium-Metal** (the structural-proxy-0.0 lie finally falsified — arm A), and the
   meaningful ΔE is the **same-engine WGSL-vs-`forceWebGL2`** readback on the kept primaries (arm B) —
   never the impossible cross-engine one. This IS real-paint-verify, not a dodge.

---

## M6 RESOLVED · `BG.W-VIZ-SUBSTRATE-FACTOR` → re-chartered `BG.W-VIZ-SUBSTRATE-DELETE`

> The pass-1 frontier (factor-vs-delete unmade, prototype build=false) is RESOLVED: **DELETE, do not
> factor.** Validated build-true: P2 (concentric WebGL2-only renders + builds green — `vue-tsc` 0,
> `npm run build` 0, `dist/concentric.js` 17.34kB, ZERO WGSL tokens) + P3 (the atomic-gate co-revert).
> The wave removes paths; it builds no new leaves.

### The decision, per viz (stated, with rationale)

| viz | WGPU primary at HEAD | earns WebGPU? | verdict |
|-----|---------------------|---------------|---------|
| **dot-flow-field** | `@compute` GPGPU lattice advection | YES (compute the .glsl net can't express) | **KEEP WebGPU-first** (M7 DOTFLOW-REBUILD owns it) |
| **aurora** | fragment + `uMedium 0-7` painterly register | capability-bearing (kuwahara/oil/vangogh + booked `W-AURORA-WGPU-MEDIUMS-STROKES`) | **KEEP WGSL primary** — but run the **arm-probe** (below) to FALSIFY it paints; do NOT fold an aurora-retire into M6 |
| **concentric** | single-uniform fullscreen-triangle fragment | NO (no compute, no capability, no flagship status) | **DELETE-WGPU → WebGL2-only** |
| **paper-grid** | single-uniform fullscreen-triangle fragment | NO (lightest viz, no compute) | **DELETE-WGPU → WebGL2-only** |

**Explicitly OUT of M6 scope (recorded, not silently dropped):** goo-blob / dot-matrix / goo-dot are
**DELETE-WGPU-ELIGIBLE by the same rule** but are NOT the brief's M6 set; widening M6 into a 6-viz
reversal mid-flight risks the unbounded spiral. **Book `BG.W-VIZ-SUBSTRATE-DELETE2`** — delete their
WGPU paths **gated on their per-viz arm-probes** (a WGSL primary that provably never arms on the dev-box
is dead code and deletes; if it paints it is re-decided against the capability rule).

### What M6 does NOT build (the anti-abstraction decision — DEFINITION-ABSENT, stated so it is not re-minted)

- **`createFragmentFieldPass` — NOT BUILT.** Post-delete the single-uniform fragment-WGPU set is
  `{aurora}` alone — a leaf factoring ~55 lines of pipeline ceremony for ONE consumer is premature
  abstraction, and the duplication that motivated it is being deleted. (The pass-1 `build=false` was the
  symptom; the cure is to not build it.)
- **`defineUniformLayout` — NOT BUILT.** The surviving WGPU bridges (aurora / dot-flow / goo-blob /
  dot-matrix / goo-dot) have genuinely different structs; the color math is already single-source
  (`composables/color`). The honest win was never "oklchToLinear once."
- **`createFragmentGLPass` (the GL2 twin) — NOT BUILT, BOOKED with a named trigger `≥3 GL fragment-pass
  consumers`.** `webgl/compile.ts` already single-sources `compileShader`+`linkProgram`; the residual
  `createProgram`/triangle-VBO/`drawArrays` boilerplate is ~15 lines at ~50% diff between
  concentric↔paper-grid GLSetup — below the factor bar (2 consumers; a 2-consumer ~50%-shared factor is
  the SAME KISS smell M6 refused for the WGPU side — symmetry holds).

### The delete mechanism (clean break, atomic, co-reverting the gate triangle)

For concentric + paper-grid, in ONE wave (sequenced AFTER M2 + with M4's NON_MIGRATING flip — see
ATOMICITY below):

1. **Relocate `CONCENTRIC_FIELD_NORM` FIRST (the TS2307 trap — critique-confirmed):** move
   `export const CONCENTRIC_FIELD_NORM = 0.55` out of `concentric/uniformBridgeWGPU.ts:47` into
   `concentric/constants.ts` (beside `MAX_RING_STOPS` the GLSetup already imports) and re-point
   `concentricGLSetup.ts:24`. Paper-grid's bridge has NO GLSetup consumer → it deletes clean.
2. **Re-bind to `useWebGLCanvas` directly** (`useConcentric.ts`, `usePaperGrid.ts`) + the kept
   `createConcentricGLSetup` / `createPaperGridGLSetup` — one substrate, no dead picker arm (cleaner than
   leaving `createGpuSubstrate` as a `setupWGPU`-less WebGL2 pass-through; no-legacy law).
   **This rebind MUST compose with SIZER-ADOPT-HARD (M1)** — adopt `dprPolicy` on the GL setup and drop
   the `clientWidth || 320` self-measure (`concentricGLSetup.ts:110-111,125-126`, `useConcentric.ts:151`);
   the rebound GL path reads `BackingSize` upload-only. **The pass-1 P2 claim of `round(gBCR×dpr)` was
   FALSE on the un-adopted rebound path (it kept `clientWidth||320` = `round(clientWidth×dpr)`)** — M6 +
   M1 ship together on these two viz or the `grep "clientWidth ||" custom = 0` bar is unmet.
3. **Delete** `concentric/{concentric.wgsl,concentricWGPUSetup,uniformBridgeWGPU}.ts` +
   `paper-grid/{paper-grid.wgsl,paperGridWGPUSetup,uniformBridgeWGPU}.ts` (≈6 files / ~480 LOC).
4. **Delete the orphaned shared WGSL chunks (the +~150 LOC KISS win the pass-2 premise MISSED).** After
   step 3 (and M4's fourier/constellation .wgsl delete), `flow.wgsl.ts` (`CURL_FBM_WGSL`) and
   `waveField.wgsl.ts` (`WAVE_FIELD_WGSL`) have **ZERO WGSL consumers** (re-confirmed at converge).
   DELETE both + drop the `export { WAVE_FIELD_WGSL } from "./waveField.wgsl"` line at `wave/index.ts:22`.
   **KEEP** `procedural-color.wgsl.ts` (7 live importers), `flow.glsl.ts` (`CURL_FBM_GLSL` — the WebGL2
   path of concentric/paper-grid STAYS), `waveField.glsl.ts`, `waveField.ts` (CPU leaf, the still-source).
   **Gate cascade (co-revert in the SAME diff):** the `assertParity` JS↔GLSL↔WGSL round-trip that
   `proof:viz-papergrid` rides → drop its WGSL arm (JS↔GLSL only — there is no second WGSL path left to
   parity-against). `proof:aurora-curl-warp` is **UNAFFECTED** (it checks `flow.glsl.ts` only — confirmed).
5. **Co-revert the parity triangle ATOMICALLY (binding both ways — a `verified` row pointing at a
   deleted `.wgsl` REDs `proof:gpu-substrate-single` clause F's on-disk-resolves floor):**
   - `proof-gpu-substrate-single.mjs:181` `NON_MIGRATING` → **`new Set(["watercolor-dot","constellation",
     "fourier-field","concentric","paper-grid"])`** (the 5-member set — M4 adds constellation+fourier,
     M6 adds concentric+paper-grid; **land as ONE atomic gate edit** or `:177-179`/`:274` RED-floors).
   - Flip the `gpu-parity-table.md` concentric / paper-grid (+ M4's fourier / constellation) rows
     `verified` → `no-migrate` (+ the WebGL2-only reason). **Reconcile the STALE concentric note** (drop
     `ringField.ts sampleRingField`; the HEAD leaf is `levelField.ts` — the level-set survey, not the
     retired ring-interference engine).
   - **Delete the dead capture PNG triples** (`concentric-parity/`, `paper-grid-parity/`) **and the 2
     unregistered dead capture scripts** (`concentric-wgpu-parity-capture.mjs`,
     `paper-grid-wgpu-parity-capture.mjs`).
   - **REWRITE — do NOT de-register — the per-viz gates (the retire-dodge fence):**
     - **`proof:concentric`** — rewrite the WGSL-coupled clauses off the `.wgsl`: **L3** (byte-frozen
       `contourInk(fN,hw)`) → "lives in the GLSL alone, no second WGSL path to parity-against"; **L6**
       (JS↔WGSL↔GLSL transcription witness) → **JS↔GLSL** witness; relax the `createGpuSubstrate(`
       require to `useWebGLCanvas`; drop the `concentric.wgsl`/`concentricWGPUSetup`/`uniformBridgeWGPU`
       colocation must-list entries. **PRESERVE** L1 (level-set field `levelField.ts sampleHeight`), L2
       (ring-engine-gone), L4 (pure+OPAQUE finishing, tanh hypsometric, analytic hillshade), L5
       (warm-DIVERGENT identity, no hue ∈ [180,270]), colocation, the warm-leading-story clauses.
     - **`proof:viz-papergrid`** — same surgery: the JS↔WGSL↔GLSL round-trip (P3) → **JS↔GLSL**; drop the
       `paper-grid.wgsl`/WGPUSetup/bridge existence + the "FIRST WGSL curl consumer / mints flow.wgsl.ts"
       clause; relax to `useWebGLCanvas`. **PRESERVE** the **no-Canvas2D** fence (paper-grid stays a
       WebGL2 **fragment**, never Canvas2D), the liquid-grid / evenly-spaced-LARGE-cell / Ben-Golus-AA /
       `cellTwist` warp-from-`waveField` / no-`curlWarp`-`cursorBulge`-legacy clauses. ⚠ tagged
       `["local","ci","release"]` — the teardown is **release-gating**.
     - **`proof:fourier-field`** + **`proof:viz-constellation`** (M4's two, both `["local","ci",
       "release"]`) — rewrite their WGSL-primary clauses to the **useCanvas2D** reality (U2/C1 "WGSL
       primary, no Canvas2D" → "useCanvas2D, no `createGpuSubstrate`, no `.wgsl`"); preserve the
       one-merged-view / one-math-source / crisp-DPR-arc / no-point-list identity clauses.
   - **Drop the deleted viz from `webgpu-everywhere.spec.ts`** — the `constellation`(36) / `fourier-field`
     (37) / `concentric`(39) routes, the `concentric`(174) primaries-map entry, the `concentric` in the
     iterate list (209). (`proof:webgpu-everywhere`'s local arm REDs otherwise.)
   - **Re-pin `profile-bundle.mjs` DOWN** (the `.wgsl` bytes leave the chunks; per-viz ceiling re-pin is a
     verified no-op at HEAD, but the global budget reflects the byte drop).
   - **Extend M4's net-new `proof:proc-suite-substrate`** to assert each delisted dir (`concentric`,
     `paper-grid`, `fourier-field`, `constellation`) carries **no `.wgsl` + no `createGpuSubstrate`** (a
     5th silent re-migration RED-floors).
6. **Docs reconcile (no-legacy, in the SAME diff):** `concentric/README.md` + `paper-grid/README.md`
   header ("WebGPU-first") + the "Substrate (WebGPU-first with a WebGL2 fallback)" section +
   `PROCEDURAL-SUITE.md` per-viz verdicts → WebGL2-only; the same-engine stale comments
   (`concentric.spec.ts:19-20`, `paper-grid-viz.spec.ts:23`, `procedural-color.wgsl.ts:6`).
7. The **deferred-forever Metal parity obligation is MOOT for these two** — one path cannot have a
   parity bug with itself. **Delete the obligation; do not chase a capture.** Their reframed bar (below)
   is "renders WebGL2-only CRISP on BOTH chromium-Metal AND webkit, no `createGpuSubstrate`/no `.wgsl`."

### aurora — KEEP, but FALSIFY (quarantined out of M6's delete; the arm-probe is the honesty)

aurora's WGSL primary stays (flagship + the `uMedium` capability + booked successors + the WS5-13
"WebGPU-first" directive; deleting it is a multi-doc, multi-booked-wave reversal). **But its
structural-proxy-0.0 is the same unfalsified lie.** M6 runs the **aurora arm-probe** as part of the
binding π (below): on chromium-Metal the WGSL primary must `requestAdapter` (not software-rejected), its
pipeline must validate (clean `popErrorScope('validation')`), and it must paint **meanByte > floor** —
the first real proof aurora's WGSL path actually arms. **If it provably never arms on the dev-box, that
is a FINDING** (aurora has silently fallen to WebGL2 forever), surfaced for a dedicated **user-gated
aurora-WGSL-retire** — NOT auto-deleted inside M6. **Outcome UNKNOWN at spec time (residual gap).**

---

## THE PAIRED PAINT-π · form CORRECTED + SEAMED for execution

> The brief's "paired cross-backend ΔE capture" exact form is **unproducible** — playwright-webkit
> (webkit-2287) exposes no WebGPU (no ANGLE/WebGPU flags; it drives its own WebGL/Metal path), so it
> always paints the WebGL2 fallback; there is no WGSL on the webkit half to ΔE against, and the DELETED
> viz have no second path. The bar deferred four times because its form was impossible. Pass-2 binds the
> **producible** falsification — and is explicit that this IS real-paint-verify.

### The READBACK BINDING RULE (folded P1 mustFix — non-negotiable, the trap itself)

- **Pixel reads are compositor `locator.screenshot` → pngjs decode ONLY.** NEVER `drawImage` /
  `getImageData` / `readPixels` on a live WebGPU/WebGL canvas (the prototype reproduced
  `drawImage`-mirror → **BLACK** vs compositor → true paint — the exact headless-green/visually-broken
  trap; the `preserveDrawingBuffer:false` contract makes the live read all-zero).
- **Scope the canvas locator on multi-canvas routes.** On the 11-card `/substrates` landing
  `locator('canvas').first()` grabs the WRONG canvas — scope by the per-card/per-stage data attribute.

### `viz-parity-metal.spec.ts` — the BE deliverable, RE-AUTHORED INTO the repo + finally executed

The prototype's copy lives in a deleted throwaway worktree — **re-author it into `tests-visual/`**.
Transpose the PROVEN readback in `webgpu-everywhere.spec.ts` (compositor screenshot → pngjs → byte-domain
`meanByte`/`maxChannel`/`coverage` floor — the constellation-dark trap already solved there). Two arms,
both producible on this Metal box; **ship arm A first/independently** (it is t-pin-INDEPENDENT and the
higher-value structural-proxy-0.0 cure — do NOT let arm B's seam complexity gate it):

- **A · arm-and-paint (the structural-proxy-0.0 cure — the deferred obligation, finally discharged).**
  For each KEPT WGPU primary (aurora, dot-flow, goo-blob): on **chromium-headless-new**
  (`--enable-unsafe-webgpu --ignore-gpu-blocklist`, ANGLE=metal), assert (1) the WGSL primary ARMS —
  `requestAdapter()` succeeds, **not** `isSoftwareWebGPUAdapter` (the prototype confirmed a REAL hardware
  Apple Metal-3 adapter arms: vendor:apple, isFallbackAdapter unset → `isSoftwareWebGPUAdapter()` FALSE),
  the pipeline validates with a clean `popErrorScope('validation')`; (2) it paints **meanByte >
  MEAN_BYTE_FLOOR** (a black void reads ≈0 → REDs by construction). **This settles the aurora arm-probe
  KEEP decision** (§M6 aurora).
- **B · same-engine WGSL-vs-`forceWebGL2` ΔE (the meaningful cross-BACKEND, never cross-ENGINE).**
  - **The `forceWebGL2` seam (validated reachable P5 — ADOPT, zero library/shader edit):**
    `page.addInitScript` that nulls `navigator.gpu` → `supportsWebGPU()` returns false →
    `useGpuSubstrate.ts:251` `attemptWebGPU` false → the WebGL2 net builds on the **SAME** route/engine/GPU
    canvas (no clone-swap). This is strictly cleaner than threading a library `?backend=webgl2` option
    (presets-in-consumers / foreign-tree fence — the seam lives in the test, not the library).
  - **The deterministic t-pin (folded P5 mustFix — the honest mechanism, NOT a `t` the renderer ignores):**
    `renderAt(t)` is t-pure **ONLY for aurora**; goo-blob's `resolveFrame` hardcodes `dtMs=16` (ignores
    `t`) and dot-flow is a stateful delta-integrator. Parity therefore rests on **deterministic seeded
    init + EXACTLY ONE identical step + NO pointer events + constant tempo** — the capture seam enforces
    these per viz; it does not pass a `t` the renderer drops. The **armAsync mismatch** is handled
    per-SFC: `useAurora`'s exposed handle has **no `armAsync`** (aurora arms SYNC in `mode:'capture'`) —
    expose the capture handle per-SFC through `VizStudio`, branching on the aurora sync-arm path.
  - **The metric is the SINGLE existing `deltaEOKLab`** (folded P5 mustFix — kill the CIEDE2000
    dual-metric: a second metric is a DRY / no-dual-path violation, and the project's single-sourced
    `deltaEOKLab` is also better for the blue-violet legendre-violet `--motion-accent` palette). Assert
    **mean ≤ 2.0 / p99 ≤ 5.0**.
  - **Per-viz arm-B participation (folded P5 mustFix):** **aurora** — full arm B (t-pure). **goo-blob** —
    arm B, but its `mean > 0` "real per-GPU `fwidth` drift must register" is a **LOGGED DIAGNOSTIC, not a
    hard assert** (two shader compilers on one GPU can legitimately yield ~0 ΔE — a `mean>0` gate risks a
    false-RED on perfect parity). **dot-flow** — **arm-A-only (paint-existence)** OR a field-domain
    compare with justified thresholds: its WebGL2 (state-texture ping-pong) vs WGSL (`@compute`
    storage-buffer) differ in NUMERICAL MECHANISM, not just rasterizer — texture-encoding precision can
    blow past mean ≤ 2.0; do NOT inherit the spec's uncritical arm-B target on it.

The DELETED viz (concentric/paper-grid) are OFF this spec entirely (no second path); their bar is
"renders WebGL2-only CRISP on BOTH chromium-Metal AND webkit, no `createGpuSubstrate`/no `.wgsl`" — webkit
IS their Safari path now, so the webkit come-up proves Safari paints them.

### The 4 build-true waves' binding SPA-nav paint-π (the brief's item 4, executed)

Run at the **SPA-nav window** (route-nav via `history.pushState`+`popstate`, not hard-load — the
regression only reproduces on nav), all reads compositor `locator.screenshot`, on BOTH
`chromium-headless-new` AND `webkit`:

| wave | binding paint-π assertion |
|------|---------------------------|
| **SIZER-ADOPT-HARD** | per-viz `canvas.width/height == round(gBCR × min(dpr,2))` AND aspect-matches-gBCR on BOTH engines, at hard-load AND SPA-nav (P4 confirmed the dimension bar on chromium-Metal + webkit-2287); **PLUS a discriminating PAINT readback** — framebuffer-decode `meanByte > floor` (folded P4 mustFix — dimension-only is the headless-green trap: a correctly-sized BLACK canvas passes `canvas.width==round(gBCR×dpr)`); the F8 aspect read sourced from `canvas.width/canvas.height` (set by `sizeBacking`), with an explicit **`1.0` first-frame fallback** seeded (NOT the HTML `300×150` aspect-2.0 default — folded P4) confirmed to hold on webkit's CV/presize timing; the WGPU presize-before-acquire win validated on a **WGPU-KEEPING** viz (aurora/dot-flow/goo-blob), NOT on a delete target where `clientWidth==gBCR` makes the dimension assertion identical pre/post; `probePipeline popErrorScope` clean on webkit after the `frameHooks?.resize()` removal; the literal **below-fold-then-scroll-in** bar (backing ≠ 300×150 ≠ 1px + non-zero painted pixels) + **offscreen-park fires `suspend('off-screen-io')`** for a park-less viz |
| **DEMIGRATE** | `/substrates/constellation` + `/substrates/fourier-field` render with NO `createGpuSubstrate` + no `.wgsl`; crisp DPR `arc()` (no low-res); `source-over` edges (no `lighter` hue-blowout); non-zero pixels mounted-below-fold-then-scrolled-in; both modes |
| **REVEAL-BLOOM** | entrance field-luminance overshoot **≥12% then settle** via the **deterministic brightness-filter readback** (NOT raw 8-bit luma — it quantized webkit's pass to +12.5% against a 12% bar, 0.5% margin); canvas rect `scale(1)` every frame; scroll-off-and-back fires **zero** second bloom (`revealFired` guard); PRM → instant settled, zero ramp |
| **PREVIEW-LIVE** | 11 cards → **11 distinct per-card pixel-hashes** AND a per-viz recognizability assert for the field viz; ≤1 live GL/WGPU context on the landing; hovered card animates; both modes; PRM → stills only |

**Enrollment is the gating prerequisite, not availability:** webkit-2287 + the project EXIST; the gap is
`playwright.config.ts:118` `testMatch` scoped to `[safari-webgl, aurora-swraster]`. **Widen the webkit
`testMatch`** to `viz-parity-metal.spec.ts` + the 4 build-true viz specs, in the SAME wave that authors
each. **Rebuild `dist` first** (`npm run build` — specs that import `dist/*.js` read the rebuilt bundle;
stale since the M1/M4 src edits). The webkit binary install is already satisfied.

---

## ITEM 5 · PREVIEW-LIVE shader-resident still decision, PER VIZ (finalized)

The still mechanism is the shipped **Path A**: CPU-raster each viz's single frame off its **pure math
leaf** into a 2D-canvas `toDataURL` (the `auroraFallbackGround.ts` pure-CORE/canvas-SHELL pattern) — ZERO
GL/WGPU contexts, substrate-independent (so DELETE-WGPU does not change the still story). Module-memo per
`storyId` (one raster, not per card-mount — folded P2/proto2 #6). The pass-1 over-lumping is corrected:

- **LEAF-BACKED — recognizable-by-construction, node-hashable (7 viz):** aurora (`sampleAuroraField`),
  fourier-field (`math.ts partialSumAt/positionsAt`), constellation (`constellationField.ts`), dot-flow
  (`flowField.ts`), dot-matrix (`dotMatrixField.ts`), **concentric (`levelField.ts` — CONFIRMED present,
  CPU-raster the hypsometric level-set at t=0)**, **paper-grid (`paperGrid.ts` — CONFIRMED present,
  CPU-raster the curl-warped grid coverage at t=0)**. The still IS recognizable, not an approximation.
- **GATED RECOGNIZABLE APPROXIMATION — stated honestly, NOT presented as leaf-composed (2 viz):**
  goo-blob + goo-dot. The smin SDF lives only in `metaball.wgsl`/`metaball.frag` — `goo-blob/composables/`
  has NO field sampler. Each gets a **net-new tiny merged-circle `blobField` CPU approximation**, gated +
  **LABELED an approximation** in the registry (NOT routed to varied-aurora — that re-skins the defect).
- **HONEST FIELD STILL — by decision (2 viz):** glass-material + glass-panel are glass-SURFACE demos, not
  procedural fields; a field backdrop is honest, a DECISION not a coincidence.

= 11 recognizable signatures (warm-nuclei / epicycle-curve / dot-edge-lattice / streamlines / dot-sphere /
hypsometric-rings / liquid-grid / gel-droplet / dot-blob / 2× glass-surface), hash-distinct per card.
**Sequence the fourier+constellation stills AFTER DEMIGRATE** — post-demigrate they render on useCanvas2D,
so their still IS their own Canvas2D render at t=0 (zero re-author, the cleanest path).

---

## MECHANISM (M1–M5 + M7 — unchanged from pass-1 converged, build-true validated)

These carry their full validated mechanism + folded mustFixes from `SPEC-pass1-converged.md` §M1–M5/M7;
the pass-2 sharpenings above (the SIZER paint-readback + below-fold + offscreen-park bars, the SPA-nav
paint-π enrollment, the DEMIGRATE atomic-5-member co-revert, the item-5 still decision) fold IN. Summary:

- **M1 · BG.W-VIZ-SIZER-ADOPT-HARD** — drop the `resize: (s?: BackingSize)` `?`; `dprPolicy` REQUIRED at
  `createCanvasLifecycle`; delete the legacy self-measure `else`; thread each viz's `resolveBudgetDpr`
  budget as the policy; rewrite EVERY adopted viz `resize`/`render` **upload-only ATOMICALLY** (no
  pass-but-self-measure limbo); kill the F8 per-frame `clientWidth` aspect re-reads; delete the 3 rival
  sizers (aurora gBCR closure, goo-blob `resizeBacking`, constellation raw `devicePixelRatio`); 3
  park-less viz opt into `composeIntersectionPark:true`; mint **`proof:viz-resize-upload-only`** (verify
  zero self-measuring `resize()` survives — the TS-bivariance footgun the dropped `?` cannot
  structurally forbid). **The `dprPolicy`-required flag-day is the EXPLICIT LAST STEP** after all 9 viz +
  useCanvas2D adopt — enumerate the 10-consumer flag-day; never bundle it into a one-viz prototype
  (folded P4 mustFix). Widen `Canvas2DFrame.render(ctx,now,s)` (compile-only at this wave; paint-proven by
  DEMIGRATE).
- **M2 · BG.W-VIZ-INTRINSIC-SIZE** (the floor, sequenced FIRST) — mint `--viz-intrinsic-block` (per-host:
  full-bleed 600px / framed-small tighter override), re-point all 8 `auto none` wrappers, fold the
  `.viz-canvas-host` recipe, give each host a load-bearing `min-block-size`.
- **M3 · BG.W-VIZ-REVEAL-BLOOM** — `@keyframes substrate-reveal-bloom` animates `filter:
  brightness()/saturate()` past 1.0 on `var(--ease-cartoon-punch)` (opacity clamps at 1.0; only `filter:
  brightness` overshoots); target the **CANVAS** not the host (no resting canvas filter; goo-blob
  `drop-shadow` stays on its wrapper); fire-at-first-VISIBLE not at `arm()` (`revealFired` one-shot);
  mint `--substrate-reveal-duration`; PRM → instant settled; **delete `useVizChoreography.ts` + its spec
  + `proof:proof-viz-choreography.mjs` + the `proof:viz-choreography` registration in `package.json:1009`
  AND `gates.mjs:1839` + retire the evidence doc**; un-stale the leaf docs (193-203/526-531/629).
- **M4 · BG.W-VIZ-DEMIGRATE** — re-author crisp DPR-aware `useCanvas2D` for fourier-field
  (`math.ts` byte-untouched) + constellation (`constellationField.ts` byte-untouched +
  `constellationRender.ts` re-authored crisp, no low-res arc, no `lighter`); kill the `:222`
  `clientWidth` self-measure (receives CSS dims from the leaf `BackingSize` via M1's `render(s)` widen —
  **HARD precondition: M1 lands before M4**); delete 13 dual-stack files / 2511 LOC; **co-move the
  5-member NON_MIGRATING flip with M6** (one atomic gate edit); mint `proof:proc-suite-substrate`;
  reconcile `PROCEDURAL-SUITE.md`; re-pin `profile-bundle.mjs` DOWN.
- **M5 · BG.W-VIZ-PREVIEW-LIVE** — re-key `#preview` dispatch per-STORY (`story.id`) not per-category;
  CPU-raster stills per the item-5 decision (7 leaf / 2 gated-approx / 2 field); module-memo cache; ONE
  shared live hover-stage (sequenced after device-acquire, disposed between, compositor-read, PRM →
  stills only); `data-route-owns-gl` budget account (≤1 live context).
- **M7 · BG.W-DOTFLOW-REBUILD** — collapse the 8-file/~2700-LOC dot-flow surface to one advection model
  (one GL setup + one WGPU **compute** setup — the compute STAYS WebGPU, the SOLE earner; M6's
  factor-vs-delete does NOT touch it) + `flowField.ts`, routed through `sizeBacking`; fix faint-at-rest
  (subtle larger sweeping waves + stronger rest contrast on the liquid-weight spring); delete the
  `useFlowParticles.ts` re-export shim. **BG.W-GOODOT-SETUP-SPLIT** — carve `buildWGPUSetup`+`buildGLSetup`
  into the colocated `gooDotSetup.ts` (carve the M1-adopted shape; sequence after SIZER-ADOPT — DEFT).
  **BG.W-BLOB-KINEMATICS-LEAF** — carve `useBlobSatellites.ts` orbit/eccentricity/wobble math into a
  stateless `satelliteKinematics.ts` leaf (file-carve only, no `SpringProgress` fork).

---

## WAVE BREAKDOWN (pass-2)

| # | Wave | Pass-2 status |
|---|------|---------------|
| 1 | **BG.W-VIZ-INTRINSIC-SIZE** | converged (the floor) |
| 2 | **BG.W-VIZ-SIZER-ADOPT-HARD** | converged build-true; **+ discriminating SPA-nav paint-π (meanByte + below-fold + offscreen-park) executed**; dprPolicy-required is the LAST step |
| 3 | **BG.W-VIZ-DEMIGRATE** | converged build-true; **co-moves the 5-member NON_MIGRATING flip with M6** + the paint-π |
| 4 | **BG.W-VIZ-REVEAL-BLOOM** | converged build-true; **+ brightness-overshoot paint-π executed** |
| 5 | **BG.W-VIZ-PREVIEW-LIVE** | converged; **item-5 still decision finalized** (7 leaf / 2 gated-approx / 2 field) |
| 6 | **BG.W-DOTFLOW-REBUILD** | converged (compute STAYS WebGPU — the sole earner) |
| 7 | **BG.W-VIZ-SUBSTRATE-DELETE** | **RESOLVED (was the frontier)** — DELETE concentric+paper-grid WGPU + the orphaned flow.wgsl/waveField.wgsl, relocate `CONCENTRIC_FIELD_NORM`, KEEP aurora (arm-probe), build no leaves, REWRITE (not de-register) the 4 per-viz gates, co-revert the gate triangle atomically with M4. Depends on M4 (shared NON_MIGRATING) + M2/M1 |
| 8 | **BG.W-GOODOT-SETUP-SPLIT** | converged (carve the M1-adopted shape) |
| 9 | **BG.W-BLOB-KINEMATICS-LEAF** | converged |
| — | **BG.W-VIZ-SUBSTRATE-DELETE2** (booked) | goo-blob/dot-matrix/goo-dot WGPU delete, GATED on per-viz arm-probe |
| — | **`createFragmentGLPass`** (booked) | GL2 fragment-pass factor, trigger `≥3 GL fragment consumers` |

**Wave 7 co-edits `proof-gpu-substrate-single.mjs:177-181` with Wave 3 — land them as ONE atomic gate
edit** (four parity rows — fourier/constellation/concentric/paper-grid — flip to `no-migrate` together,
the 5-member NON_MIGRATING set, the 4 per-viz gate rewrites — or it RED-floors).

---

## ACCEPTANCE / REAL-PAINT-π BAR

- **/substrates landing:** 11 visually-distinct previews (per-card pixel-hash differs) + per-viz
  recognizability; ≤1 live GL/WGPU context; hovered card animates; both modes; PRM → stills.
- **Sizer:** `grep "clientWidth ||" src/components/custom = 0`; `grep dprPolicy ≥ 9`; per-viz backing
  `== round(gBCR × dpr)` AND **`meanByte > floor`** at the SPA-nav window on Chrome AND Safari;
  `probePipeline popErrorScope` clean on webkit; offscreen-park fires `suspend('off-screen-io')` for the
  park-less viz; below-fold-then-scroll-in → backing ≠ 300×150 ≠ 1px + non-zero pixels;
  `proof:viz-resize-upload-only` GREEN (zero self-measuring `resize()`).
- **Reveal:** entrance brightness-filter overshoot ≥12% then settle (deterministic readback); canvas rect
  `scale(1)`; scroll-off-and-back fires zero second bloom; PRM → instant; `useVizChoreography.ts`
  DEFINITION-ABSENT.
- **Demigrate:** fourier-field + constellation render on `useCanvas2D` (no `createGpuSubstrate`, no
  `.wgsl`); ≥13 files + ≥2500 LOC deleted; crisp DPR arc, no `lighter`; budget re-pinned DOWN.
- **Substrate-delete:** concentric + paper-grid render WebGL2-only (no `createGpuSubstrate`/no `.wgsl`);
  the orphaned `flow.wgsl.ts` + `waveField.wgsl.ts` DEFINITION-ABSENT (the `wave/index.ts:22` re-export
  dropped); `procedural-color.wgsl.ts` PRESENT; `createFragmentFieldPass`/`defineUniformLayout`
  DEFINITION-ABSENT (anti-abstraction holds); the gate triangle co-reverts GREEN (no `verified` row
  points at a deleted `.wgsl`; `proof:concentric`/`proof:viz-papergrid`/`proof:fourier-field`/
  `proof:viz-constellation` REWRITTEN not de-registered, identity clauses preserved);
  `proof:proc-suite-substrate` asserts the 4 delisted dirs; webkit proves the WebGL2 Safari path paints.
- **Parity (reframed, producible):** `viz-parity-metal.spec.ts` GREEN — aurora/dot-flow/goo-blob WGSL
  primaries ARM + paint `meanByte > floor` on chromium-Metal (the structural-proxy-0.0 falsified, arm A);
  same-engine WGSL-vs-`forceWebGL2` ΔE `mean ≤ 2.0 / p99 ≤ 5.0` (single `deltaEOKLab`, arm B) with
  goo-blob's `fwidth` `mean>0` a LOGGED DIAGNOSTIC + dot-flow arm-A-only-or-field-domain; reads compositor
  `locator.screenshot` (NEVER drawImage/getImageData), locator scoped on multi-canvas routes; enrolled in
  the webkit `testMatch`; dist rebuilt. **Arm A ships first/independently.**

---

## FOLDED DEFERRED / CRITIQUE MUSTFIX LEDGER

- **BE.W-VIZ-PARITY-METAL / P-chronic D24 (deferred 4×)** → re-authored INTO the repo as
  `viz-parity-metal.spec.ts`, form corrected (arm-and-paint A + same-engine `forceWebGL2` ΔE B); NOT
  deferred a fifth time IN SPEC — but its **EXECUTION is the nextPass frontier** (the seam build=false).
- **The orphan-WGSL delete (P2 mustFix)** → `flow.wgsl.ts` + `waveField.wgsl.ts` DELETE folded; the
  pass-2 "stays alive via dot-flow" premise corrected; `proof:aurora-curl-warp` confirmed unaffected.
- **The paper-grid symmetric delete + gate REWRITE (P2/P3 mustFix)** → folded; the prototype's
  concentric-only scope widened to both; gate de-registration (the retire-dodge) replaced with clause
  rewrite preserving identity coverage.
- **`CONCENTRIC_FIELD_NORM` relocate (P2/P3 mustFix)** → relocate to `concentric/constants.ts` before
  delete; paper-grid bridge confirmed clean-delete.
- **The atomic 5-member NON_MIGRATING co-revert + `webgpu-everywhere` arm-drop + parity-table
  reconcile + dead-script delete (P3 mustFix)** → folded.
- **The SIZER paint-readback + discriminating π + below-fold + offscreen-park + dprPolicy-flag-day-LAST +
  TS-bivariance-gate + F8 1.0-fallback (P4 mustFix)** → folded into the SIZER bar.
- **The `forceWebGL2` addInitScript seam + t-pin honesty + armAsync per-SFC + single-`deltaEOKLab` +
  dot-flow-arm-A-only + goo-blob-mean>0-diagnostic + arm-A-first + readback-binding-rule + locator-scope
  (P5/P1 mustFix)** → folded into the parity bar.
- **goo-blob → "blob" rename (WS5-02)** → RETIRED, kept as `goo-blob` (cosmetic; `/goo-blob` is a
  published subpath; a rename is a breaking every-consumer-import change for zero functional gain).
  Re-book to a dedicated clean-break rename tranche only if the user reaffirms.

---

## OPEN RISKS / RESIDUAL GAPS (the unconverged frontier — nextPass)

1. **The binding paired-engine paint-π is SPECIFIED + the seam validated-reachable but UNEXECUTED.** Arm
   B's capture seam build=FALSE (a sketch); no real arm-A `meanByte` / arm-B ΔE numbers exist. This is
   the C-PAINT cardinal law (the trap shipped 3×) and the brief's item-4 "PRODUCE" ask. It must be
   compiled + wired + run + recorded — the nextPass frontier.
2. **The aurora arm-probe outcome is UNKNOWN.** No realGpu `meanByte` record has EVER existed for any
   WGSL primary in project history (the structural-proxy-0.0 fingerprint). If aurora's WGSL primary
   provably never arms on the dev-box, KEEPING it is keeping dead code → a user-gated aurora-WGSL-retire
   escalates OUT of M6. The arm-probe settles it before the wave trusts the KEEP.
3. **playwright-webkit WebGPU-absence** is the empirical pin behind the same-engine-ΔE reframe. The
   pass-2 finding (webkit project has no WebGPU flags, drives its own path) says NO WebGPU — confirm
   `navigator.gpu` is absent/non-arming on webkit-2287 (if it surprisingly arms, the cross-engine arm is
   a free upgrade; the spec does not depend on it). The dist-rebuild + webkit `testMatch`-widen are
   build-time prerequisites not yet done.
4. **SIZER-ADOPT TS-bivariance residual** — a `resize` that ignores `s` still compiles; enforced by
   `proof:viz-resize-upload-only` + the cross-engine paint π (the structural compile-forbid is NOT
   achievable in TS — recorded honestly).
5. **REVEAL-BLOOM webkit overshoot margin** is +12.5% vs a 12% bar (0.5%) — the deterministic
   brightness-filter readback (not 8-bit luma) is mandatory; fragile on the very engine the trap is about.
