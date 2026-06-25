# A-viz-census — the procedural-viz suite census + refinement spec

> BG forensic audit. Verified against HEAD (`998136bb`, glass-ui 4.2.0). Default-broken
> skepticism applied: every claim is grounded in real source at file:line. Scope: the user's
> "most of our procedural animations need to be refined" — the engines, the substrate, the
> WGSL/GLSL parity, the warmth/identity/motion quality, the canvas-resize status.
>
> **Boundary with sibling audits.** `D-field-aurora.md` owns the page-FIELD architecture
> (retire `.paper-field`, mount ONE shell aurora). `D-previews-dockscroll.md` owns the
> `/substrates` bento dispatch, the `auto none` intrinsic-size trap, the leaf-sizer ADOPTION
> gap, and the dock-scroll. This census owns the **per-viz engine quality + identity + motion
> + the substrate KISS/DRY/over-engineering verdict** — the layer underneath those. Where I
> re-confirm a sibling finding I CITE it and do not re-spec it.

---

## THE SUITE AT A GLANCE (HEAD-measured)

| viz | files | LOC | substrate (HEAD) | renders | identity ok? | resize status |
|---|---|---|---|---|---|---|
| **aurora** | 31 | 7384 | WebGPU `aurora.wgsl` + WebGL2 `aurora.frag` | multi-nuclei fbm/OKLCh painterly drift | warm-cream default ✓ | **own gBCR+double-rAF (the survivor)** |
| **goo-blob** | 22 | 5230 | WebGPU `metaball.wgsl` + WebGL2 `metaball.frag` | SDF `smin` metaball + satellites | warm ✓ | `clientWidth\|\|canvasSize` (naive) |
| **constellation** | 17 | 3467 | **WebGPU `*.wgsl` + GLSL** | node/edge proximity lattice | warm ✓ | `clientWidth\|\|320` (naive) |
| **dot-flow-field** | 14 | 3446 | WebGPU compute+instanced + GLSL | curl-noise advected dot streamlines | warm default ✓ | `clientWidth\|\|320` (naive) |
| **fourier-field** | 12 | 2592 | **WebGPU compute+fragment + GLSL** | inverse-DFT epicycle curve | warm ✓ | `clientWidth\|\|320` (naive) |
| **dot-matrix** | 9 | 1969 | WebGPU instanced-billboard + WebGL2 | Fibonacci phyllotaxis dot-sphere | warm-cream ✓ | `clientWidth\|\|320` (naive) |
| **goo-dot-matrix** | 9 | 1848 | WebGPU dot-stamp + WebGL2 | goo SDF field rendered AS dots | warm default ✓ | `clientWidth\|\|field` (naive) |
| **paper-grid** | 10 | 1827 | WebGPU fragment + GLSL | Golus AA grid on curl-warped UV | warm ✓ | `clientWidth\|\|320` (naive) |
| **concentric** | 10 | 1628 | WebGPU fragment + GLSL | level-set hypsometric survey | warm-amber ✓ | `clientWidth\|\|320` (naive) |
| **watercolor-dot** | 4 | 566 | **SVG/CSS only — no GL** | decorative seeded blob | warm ✓ | n/a |

**Totals:** 138 files, **~29,957 LOC** in the viz suite + **3,690 LOC** of substrate
(`webgl`/`webgpu`/`canvas2d`/`wave`). Nine of ten vizzes carry a full WebGPU-primary +
WebGL2/GLSL-fallback dual stack (a `*.wgsl.ts` + a `*.glsl.ts`/`*.frag.ts` + a
`*WGPUSetup.ts` + a `*GLSetup.ts` + a `uniformBridgeWGPU.ts` — **5+ files of substrate
plumbing PER viz**). There are **9 separate `uniformBridgeWGPU.ts` files** (one per viz).

---

## FINDINGS

### F1 — The viz RUNTIMES are sound; the SHADERS are high-quality and warm. The breakage is the substrate plumbing, not the engines

Default-broken skepticism, falsified by readback (corroborates `D-previews-dockscroll.md`
A2). On a hard-load above the fold, concentric paints opaque warm-amber `[238,196,138,255]`,
blob paints its silhouette, dot-flow paints 100% non-zero. Reading the shaders confirms
genuine quality:

- `concentric.wgsl.ts` (216L) is a level-set hypsometric SURVEY — tanh tone expansion,
  analytic hillshade, two-tier IQ gradient-free `contourInk`, OPAQUE warm fill. It shares the
  `waveField`, `CURL_FBM`, and `procedural-color` chunks faithfully (`concentric.wgsl.ts:15-20`).
  This is well-engineered. The cited-SOTA math is real (Bridson curl, IQ contour AA).
- The shared color chunk is ONE source per backend: `procedural-color.glsl.ts` (GLSL
  fallbacks) + `procedural-color.wgsl.ts` (WGSL primaries), byte-identical Ottosson OKLCh
  numerics (`PROCEDURAL-SUITE.md:85-94`). The `wave/waveField.{ts,glsl,wgsl}` math leaf is a
  legitimate DRY win, consumed by BOTH paper-grid AND concentric (2 consumers, the bar met).

So the user's "most procedural animations need refinement" is NOT a shader-quality problem.
The refinement need is in **(a) the substrate plumbing that fails to size them on
SPA-navigation, (b) the over-engineered dual-stack scale, and (c) the per-viz MOTION quality
+ entrance bloom that was specced but never shipped** (F5).

### F2 — THE CARDINAL DEFECT: BD.W-SUBSTRATE-SIZE-UNIFY built the canonical leaf sizer, and ZERO consumers adopted it

This is the root of defect #6 ("none of the /substrates previews work"). The BD greenfield
authored the fix (`docs/tranches/BD/greenfield/substrate/WAVE-AMENDMENT.md` §1, steps 1-8):
mint `sizeBacking()` + `presize()` + the leaf-owned RO + the leaf-composed IO in
`createCanvasLifecycle.ts`, change the consumer `resize()` signature to `resize(s?:
BackingSize)`, and **PRUNE every `clientWidth||320` / one-parent-gBCR closure across all 9
viz** (step 8). The leaf half SHIPPED — but the **consumer-adoption + prune half NEVER RAN**:

```
grep dprPolicy            src/components/custom/  →  ZERO hits
grep composeIntersectionPark  src/components/custom/  →  ZERO hits
```

The `s` arg was made OPTIONAL "so a legacy consumer keeps compiling during the cut-over"
(`createCanvasLifecycle.ts:155-157`) — which silently let the cut-over never happen. Every
viz still self-measures the condemned way:

- `concentric/composables/concentricGLSetup.ts:110` — `canvas.clientWidth || 320`. The leaf's
  OWN comment (`createCanvasLifecycle.ts:60-77`) says this exact form "reads 0 under a
  `content-visibility:auto` skip (the born-skipped trap)". It has the idempotent guard
  (`:114` `if (canvas.width !== w)`) but NO double-rAF, NO gBCR, NO leaf RO — the "naive sizer
  with no recovery" `D-previews-dockscroll` RC-2 names.
- WORSE: `concentricGLSetup.ts:125-127` re-reads `clientWidth || 320` **every frame** to
  derive `aspect`. If `clientWidth` is 0 mid-skip, `aspect = 0/320 = 0` → the field distorts.
- `goo-blob/composables/useMetaballRenderer.ts:314-329` — its OWN `resizeBacking` with
  `clientWidth || config.geometry.canvasSize`, AND its OWN `useIntersectionPause`
  (`:194`) — the leaf `composeIntersectionPark` it was meant to delegate to is unused.
- Even **aurora** (`runtime.ts:283-318`) keeps its OWN gBCR+double-rAF closure. The leaf
  `sizeBacking` is literally aurora's sizer "lifted into the leaf" — but aurora never adopted
  it back, so the canonical code exists **twice** (the leaf + aurora's copy), and the OTHER 8
  viz use neither.

**Net:** the library has TWO sizing realities — aurora's proven gBCR+double-rAF, and 8 naive
`clientWidth||N` closures with the idempotent guard reimplemented per-file (17 copies of
`if (canvas.width !== w)`). The canonical sizer, the leaf RO, the double-rAF defense, the
CV-host walk, and the leaf IO park are all built and **unused**. This is the textbook
half-shipped-wave + DRY disaster.

### F3 — Every non-aurora wrapper carries the `contain-intrinsic-size: auto none` zero-collapse trap

Verified (corroborates `D-previews-dockscroll.md` A3): aurora alone has the fix
(`Aurora.vue:245` `auto 600px`); the 8 others ship `auto none`
(`concentric:131`, `constellation:83`, `dot-matrix:103`, `dot-flow-field:103`,
`fourier-field:249`, `goo-dot-matrix:117`, `goo-blob:300`, `paper-grid:127`). A
content-skipped viz (below-fold, Safari's weaker CV, route-mount-offscreen) collapses its box
to 0 → a 1px backing the naive sizer (F2) cannot recover → the black band. The routing freeze
(D-routing) creates exactly the off-screen-mount regime that triggers it. This trap +
the naive sizer (F2) are the matched pair behind the "previews broken" gestalt.

> D-previews-dockscroll already specs `BG.W-VIZ-INTRINSIC-SIZE` (mint `--viz-intrinsic-block`,
> re-point the 8 wrappers) + `BG.W-VIZ-SIZER-ADOPT` (adopt the leaf sizer, delete the closures).
> This census ENDORSES both and does not duplicate them — but see F8 for why ADOPT must also
> retire the per-frame `clientWidth` aspect read, not just the `resize()` closure.

### F4 — OVER-ENGINEERING: fourier-field + constellation were migrated to the full WebGPU dual-stack against their OWN recorded "DO NOT MIGRATE" verdict

This is a clean KISS regression introduced by the BD greenfield. `PROCEDURAL-SUITE.md:75-76`
and `fourier-field/README.md:217-226` BOTH still say **"DO NOT MIGRATE (now)"** with the
reason: *"a few-to-dozens of phasors is the RIGHT tool for `ctx.stroke`"* / *"Canvas2D handles
the current node count fine."* The booked trigger was "thousands of phasors / a much denser
lattice." That trigger never fired. Yet the SHIPPED code migrated both:

- `fourier-field/composables/useFourierField.ts:8` — *"this composable carries NO `useCanvas2D`
  import and NO `getContext('2d')`"*; it now composes `createGpuSubstrate` (`:311`) with a
  **two-pass compute→fullscreen-fragment WGSL pipeline** (`fourierFieldWGPUSetup.ts:1-8`:
  "compute kernel writes the comet-curve sample table … the fullscreen-fragment render pass
  composites the SDF field"). A few-dozen `ctx.stroke` line segments became a compute shader
  writing storage buffers + an SDF fragment pass. The README it ships with still describes
  `ctx.stroke` and `lighter` 2D-context compositing (`README.md:3-8`, `:125-128`).
- `constellation/composables/useConstellation.ts:3` — *"The lattice re-homes off the Canvas2D
  substrate onto `createGpuSubstrate`"*; it now ships `constellation-points.wgsl` +
  `constellation-lines.wgsl` + GLSL twins (4 shaders for a node/edge graph).

So two vizzes that the architecture EXPLICITLY decided were the wrong tool for the GPU got the
full 12-17-file dual-substrate treatment (4 shaders + 2 setups + a uniform bridge each), and
the docs still say they're Canvas2D. This is doc↔code drift AND scope-creep AND the
opposite of KISS — a few-dozen-phasor curve does not need a compute pass.

### F5 — THE MOTION REFINEMENT THE USER ASKED FOR WAS SPECCED AND NEVER SHIPPED (the substrate reveal-bloom is a no-op)

The user's "refine the procedural animations" maps directly onto a BD wave that did NOT land.
`BD.W-SUBSTRATE-REVEAL-BLOOM` (`substrate/WAVE-AMENDMENT.md` §2) specced the signature
entrance: a one-shot `--substrate-reveal-t` 0→1 the SHADER reads to ramp luminance/saturation/
drift from WITHIN (a FIELD bloom — the canvas rect stays `scale(1)`, no box-zoom gutter), with
the overshoot in the KEYFRAME values on `--ease-cartoon-punch`. The leaf seam exists but is a
**documented no-op**: `createCanvasLifecycle.ts:194-203` says *"Gated on the Band-0
`--ease-cartoon-punch` + `--motion-weight` tokens (NOT shipped today); absent, this is a
no-op."* `revealBloom` defaults `false` (`:275`) and `grep revealBloom src/components/custom`
→ ZERO. So:

- The Band-0 cartoon tokens (`--ease-cartoon-punch`, `--motion-weight`) were never minted
  (`substrate/WAVE-AMENDMENT.md:24` flagged "0 hits in src/").
- The reveal-bloom seam never fires.
- The vizzes have NO entrance — they pop in via a mechanical `canvas.width=` (or blank→pop on
  a slow WebGPU acquire). The ONE moment the field is perceptible (cold first-paint) is silent
  and unweighted — the antithesis of the warm/weighty/liquid identity.

This is the concrete refinement the user names: the per-viz entrance has no liquid weight. The
substrate has the SEAM; the choreography + tokens were never built.

### F6 — `useVizChoreography.ts` (23KB, 542L) — a large motion orchestrator whose adoption is unclear

`src/composables/glass/useVizChoreography.ts` is a 542-line composable in the substrate dir.
It is NOT the lifecycle leaf and NOT a backend. Its size + position (a "choreography"
orchestrator beside the substrate) suggests it is the intended home of the per-viz
entrance/scroll-reveal motion — but with the reveal-bloom seam a no-op (F5) and the Band-0
tokens absent, its live wiring is suspect. (Flagged for the synthesis to verify adoption; if
it is the dead half of an unshipped motion layer it folds into the reveal-bloom wave or is
pruned.)

### F7 — The dual-substrate cost is structurally heavy; the WebGPU-primary value is unproven on the decorative-backdrop majority

Each of the 9 GL vizzes carries: a `*.wgsl.ts` primary, a `*.glsl.ts`/`*.frag.ts` fallback,
a `*WGPUSetup.ts`, a `*GLSetup.ts`, and a `uniformBridgeWGPU.ts` (the typed-struct std140↔WGSL
packer). That is **5 substrate-plumbing files per viz** before the math. The parity gate
(`proof:gpu-substrate-single`) then demands a capture-pair + OKLab ΔE per viz to prove the two
paths agree. For a **fullscreen-fragment decorative backdrop** (concentric, paper-grid, aurora
in its smooth core), the WebGPU primary buys essentially nothing over WebGL2 — the
`PROCEDURAL-SUITE.md:72-73` rows literally say "the fallback is the SAME pure fragment field →
parity verified." Two identical fragment paths maintained in two languages, gated by a ΔE
proof, is pure carrying cost. The WebGPU primary is only materially better where there is a
COMPUTE pass that WebGL2 cannot do (dot-flow-field's per-particle advection — `PROCEDURAL-
SUITE.md:71` "the compute-particle path is materially better on WebGPU"). For the
fragment-only majority, WebGPU-first is over-architecture: it doubles the shader surface,
doubles the setup files, and adds a parity gate, to render the same pixels.

### F8 — The per-frame `clientWidth` re-read is a SECOND sizing defect the SIZER-ADOPT wave must also kill

Beyond the `resize()` closures (F2), several vizzes re-read `clientWidth` INSIDE `frame()` to
recompute the aspect uniform EVERY frame: `concentricGLSetup.ts:125-127`,
`fourierFieldWGPUSetup.ts:262-266`, `flowSetupGL.ts:95`, `concentricWGPUSetup.ts:133`. This
is both a per-frame layout-read (forced reflow risk) AND the same CV-skip-zero hazard
(`aspect = 0` distorts the field). The leaf `BackingSize` should be the single aspect source
threaded into the frame, not a live DOM read per frame. `BG.W-VIZ-SIZER-ADOPT` must cover the
FRAME path, not only the `resize()` path.

### F9 — Identity/warmth is correct by default across the suite (NOT a finding against the vizzes)

Auditing the shader defaults + the demo manifest: the library defaults are warm-cream/
warm-identity everywhere (`PROCEDURAL-SUITE.md:44-47`), and the consumer presets (teal-on-navy,
ppmycota-purple, the goo-dot near-dark register) live in the demo, not in library tokens
(`manifest.ts:703` "The warm-cream identity is the library default; the near-dark dotted-tone
register is a non-default demo preset"). So the warm/weighty identity is NOT compromised at the
viz default level. The metallic-wash problem is the `.paper-field` CSS layer (D-field-aurora),
NOT the procedural engines. This is recorded so the synthesis does not mis-attribute the
metallic defect to the vizzes.

---

## ROOT CAUSES (gestalt, first-principles)

**RC1 — The substrate-size-unify wave was half-shipped: the leaf was built, the adoption was
optional, the cut-over never happened.** Making the `resize(s?)` arg OPTIONAL (to "keep legacy
compiling") removed the forcing function. The canonical sizer, leaf RO, double-rAF, CV-host
walk, and leaf IO all exist and are bypassed by every consumer. This is THE root of the broken
previews: a sound shader behind a naive sizer that fails on SPA-navigation. (First-principles:
a leaf that owns a contract MUST be the only implementation; an optional-adopt seam is a
guaranteed-drift seam.)

**RC2 — WebGPU-first was applied UNIFORMLY, including to vizzes that gain nothing from it (and
two the architecture explicitly excluded).** The "WebGPU-first where possible" latitude
collapsed into "WebGPU-first everywhere," migrating fourier-field + constellation against their
own recorded verdict and dual-stacking 7 fragment-only backdrops that render identically on
WebGL2. The result is ~30K LOC / 138 files where a fragment-only decorative-field suite needs a
fraction of that. (First-principles: a second backend is justified only by a capability the
first lacks — compute. A fragment that runs identically in both is one path written twice.)

**RC3 — The refinement the user wants (liquid-weight entrance) was specced as the signature
move and is a documented no-op.** The reveal-bloom seam ships disabled because its prerequisite
Band-0 cartoon-motion tokens were never minted. The vizzes therefore have no entrance — the one
perceptible moment of an invisible field is mechanical. The user's "refine the animations" is
literally this unshipped wave.

**RC4 — The dual-substrate plumbing is duplicated per-viz instead of factored.** 9 separate
`uniformBridgeWGPU.ts`, 9 `*WGPUSetup.ts`, 9 `*GLSetup.ts`, 17 reimplementations of the
idempotent resize guard. The shared chunks (`procedural-color`, `wave/waveField`, `flow`) prove
the factoring is possible and good; it just was not applied to the setup/bridge/sizing layer.

---

## PROPOSED WAVES

> Sequenced AFTER `D-previews-dockscroll`'s `BG.W-VIZ-INTRINSIC-SIZE` (the non-zero intrinsic
> block is the floor the sizer measures against). These deepen the per-viz ENGINE quality; the
> sibling owns the bento dispatch + the dock-scroll.

### BG.W-VIZ-SIZER-ADOPT-HARD — force every viz onto the leaf `sizeBacking`; delete all self-measure (incl. the per-frame aspect read)

- **Intent.** Close RC1 — make the canonical leaf sizer the ONE sizing reality across all 9 GL
  viz INCLUDING aurora, and delete the 8 naive closures + aurora's now-redundant copy + the
  per-frame `clientWidth` aspect reads (F2, F8). The "previews broken" root.
- **Idiomatic gestalt approach.** This is `D-previews-dockscroll`'s `BG.W-VIZ-SIZER-ADOPT` made
  NON-OPTIONAL: (a) thread `dprPolicy` (per-viz: aurora 1.5× wash, focal 2× `resolveBudgetDpr`)
  into every `createGpuSubstrate(canvas,{dprPolicy,…})`; (b) shrink each `setupGL`/`setupWGPU`
  `resize(s)` to upload-only (`gl.viewport(0,0,s.w,s.h)` + the aspect uniform read FROM `s`,
  never `clientWidth`); (c) opt the IO-park-less viz (concentric/fourier/dot-flow) into
  `composeIntersectionPark:true` and DELETE goo-blob/goo-dot's per-consumer
  `useIntersectionPause`; (d) make the `resize(s)` arg REQUIRED (clean break — remove the
  optional `?` so a non-adopting consumer cannot compile, the forcing function RC1 lacked); (e)
  delete aurora's `runtime.ts:283-318` gBCR closure + its double-rAF special-case — the leaf
  owns it for all. NO leaf edit (the seam exists; this is pure forced adoption).
- **Files.** Every `*GLSetup.ts` / `*WGPUSetup.ts` / `useMetaballRenderer.ts` / the
  `createGpuSubstrate` call sites (concentric/dot-flow/dot-matrix/goo-dot/paper-grid/
  constellation/fourier `use*.ts` + aurora `runtime.ts`); `createCanvasLifecycle.ts` +
  `useWebGLCanvas.ts` + `useWebGPUCanvas.ts` (drop the `?` on `resize`'s `s`).
- **Acceptance / π.** `grep "clientWidth ||" src/components/custom` → ZERO; `grep dprPolicy
  src/components/custom` → ≥9; per-viz backing == `round(gBCR×dpr)` at the SPA-nav arm window
  (not just hard-load) on Chrome AND Safari; the off-screen-park fires for concentric/fourier/
  dot-flow (rAF→0); no per-frame `clientWidth` read survives in any `frame()`. Folds #6's
  sizing root + the per-frame aspect hazard (F8). Sequence after `BG.W-VIZ-INTRINSIC-SIZE`.

### BG.W-VIZ-REVEAL-BLOOM — ship the liquid-weight field entrance (the user's "refine the animations")

- **Intent.** Close RC3 — give every substrate viz a warm/weighty entrance (the one perceptible
  moment). Build `BD.W-SUBSTRATE-REVEAL-BLOOM` for real (it shipped as a no-op).
- **Idiomatic gestalt approach.** (a) Mint the Band-0 motion tokens the seam is gated on
  (`--ease-cartoon-punch`, `--motion-weight`) in `src/styles/` — the missing prerequisite. (b)
  Enable `revealBloom:true` per viz; the leaf's `--substrate-reveal-t` 0→1 scalar
  (`createCanvasLifecycle.ts:526-553`, already wired) drives a SHADER luminance/saturation/
  drift ramp with the overshoot IN the keyframe values (0→1.12→1.0) on `--ease-cartoon-punch` —
  a FIELD bloom (canvas rect stays `scale(1)`, no box-zoom gutter, the spec's refuted-box-zoom
  lesson kept). (c) ONE-shot at cold first-paint only (an IO/CV re-reveal is silent — already
  guarded by `revealFired`). (d) PRM → instant settled `1` (already wired, `:537`). Each
  shader reads the scalar via a single uniform; no per-viz motion engine. Cites
  `W-LIQUID-ENTRANCE-GENERAL`; does NOT depend on `useLiquidReveal` (the wrong primitive for a
  field — that is a discrete-overlay morph).
- **Files.** `src/styles/tokens/*.css` (mint the 2 Band-0 tokens), each viz's `createGpuSubstrate`
  call (`revealBloom:true`), each WGSL+GLSL shader (read the `uRevealT` uniform for the
  luminance/saturation ramp — ONE uniform per shader, threaded through the existing
  uniformBridge), `useVizChoreography.ts` (verify it is the home or prune it, F6).
- **Acceptance / π.** A paired chromium+webkit compositor frame-series shows the entrance field
  luminance overshoot ≥12% then settle (sampled from the compositor, not the ease label); the
  canvas rect stays `scale(1)` (no bare gutter at the glass edge); scroll-off-and-back fires
  ZERO second bloom; PRM → instant fade, zero ramp. The literal "refine the procedural
  animations" deliverable. Folds the unshipped `BD.W-SUBSTRATE-REVEAL-BLOOM`.

### BG.W-VIZ-DEMIGRATE — return fourier-field + constellation to Canvas2D; honor their own verdict

- **Intent.** Close RC2's worst case (F4) — undo the over-engineered WebGPU migration of the
  two vizzes the architecture EXPLICITLY excluded, restoring KISS + doc↔code truth.
- **Idiomatic gestalt approach.** Clean break, no dual path: DELETE `fourier-field`'s
  `fourierFieldWGPUSetup.ts` + `fourierFieldGLSetup.ts` + the 3 fourier shaders + its
  `uniformBridgeWGPU.ts`, and re-home `useFourierField` onto `useCanvas2D` (the `math.ts` DFT +
  `ctx.stroke` epicycle path the README still describes — the RIGHT tool for a few-dozen
  phasors). Same for `constellation` (delete its 4 WGSL/GLSL shaders + WGPU/GL setups + bridge,
  re-home onto `useCanvas2D` node/edge `ctx` draw). This RESTORES the `PROCEDURAL-SUITE.md` /
  README verdict that shipped UN-honored — the docs become true, not the code over-built. The
  parity-table rows flip back to `no-migrate` with the (already-written) reason + booked
  trigger. NET: −~2000 LOC, −9 shader/setup files, −2 parity captures, and a faithful doc.
- **Files.** `fourier-field/composables/{useFourierField,fourierFieldWGPUSetup,fourierFieldGLSetup}.ts`
  + `fourier-field/shaders/*` + `uniformBridgeWGPU.ts` (delete the WGPU/GL, restore Canvas2D);
  same shape for `constellation/`; `gpu-parity-table.md` + `proof:gpu-substrate-single` (flip to
  `no-migrate`); `PROCEDURAL-SUITE.md` (already correct — verify).
- **Acceptance / π.** fourier + constellation render on `useCanvas2D` (no `createGpuSubstrate`,
  no `.wgsl`); the demo routes paint identical-or-better; `proof:gpu-substrate-single` shows
  them as `no-migrate`; ≥2000 LOC + ≥9 files deleted; the README and code agree. Folds the
  doc↔code drift + the KISS regression. (Presets-in-consumers + warm identity untouched —
  this is a substrate de-escalation, not a visual change.)

### BG.W-VIZ-SUBSTRATE-FACTOR — factor the per-viz WGPU plumbing; collapse the dual-stack carrying cost

- **Intent.** Close RC2/RC4 (F7) — stop maintaining 9 copies of the WGPU setup/uniform-bridge
  plumbing and reconsider the dual-stack for fragment-only backdrops, WITHOUT regressing the
  one viz that genuinely needs compute (dot-flow-field).
- **Idiomatic gestalt approach.** Two moves, both DRY-over-fork: (a) **factor the
  fullscreen-fragment WGPU setup** — concentric/paper-grid/aurora-core/fourier(if kept)/
  flow-field-render all build the SAME full-screen-triangle pipeline + the SAME std140↔WGSL
  uniform-pack ceremony; lift a `createFragmentWGPUSetup(canvas,{wgsl,uniformLayout})` +
  `packUniforms(layout, values)` leaf so each viz declares only its uniform LAYOUT + its WGSL
  body, not a full 200-line setup + a hand-rolled bridge (the `procedural-color`/`waveField`
  shared-chunk discipline applied to the SETUP layer). (b) **Record the dual-stack decision
  per viz HONESTLY** — for a fragment-only backdrop whose WGSL primary and GLSL fallback render
  identically (`parity:verified`, ΔE≈0), evaluate whether the WGSL primary EARNS its second-
  language cost or whether WebGL2-only is the simpler truth (the WebGPU win is real only for
  the COMPUTE viz). This is an audit-and-decide, not a blanket delete — dot-flow-field's compute
  pass STAYS WebGPU-first; the fragment-only majority is a candidate for WebGL2-only
  consolidation (clean break, the fallback becomes the path). KISS over a parity gate that
  proves two identical things equal.
- **Files.** A new `src/composables/glass/webgpu/createFragmentWGPUSetup.ts` + `packUniforms`
  leaf; the 9 `uniformBridgeWGPU.ts` collapse onto it; each fragment viz's `*WGPUSetup.ts`
  shrinks to a layout + WGSL declaration; a recorded per-viz dual-stack decision in
  `PROCEDURAL-SUITE.md` + `gpu-parity-table.md`.
- **Acceptance / π.** ≤1 shared WGPU-fragment-setup leaf (no 9 hand-rolled copies); each viz
  renders byte-identically (the parity captures still pass for the kept dual-stacks); a recorded
  decision per viz on dual-stack-vs-WebGL2-only; net LOC reduction with zero visual change.
  Folds the per-viz-plumbing duplication (RC4) + scopes the dual-stack reconsideration (RC2)
  without touching the compute viz. Sequence LAST (after the correctness + entrance waves).

---

## Cross-cuts / dependencies (named)

- **`BG.W-VIZ-INTRINSIC-SIZE` + `BG.W-VIZ-SIZER-ADOPT` (D-previews-dockscroll)** are the
  matched robustness pair; `BG.W-VIZ-SIZER-ADOPT-HARD` here is the HARDER version of the
  latter (required arg + per-frame aspect + aurora's own closure deleted). The synthesis should
  MERGE them into one wave, not ship both — this census's contribution is the additional
  required-arg + per-frame-read + aurora-dedup scope.
- **`BG.W-FIELD-AURORA` (D-field-aurora)** mounts ONE shell aurora as the page field; it shares
  the aurora ENGINE this census audits. The reveal-bloom (`BG.W-VIZ-REVEAL-BLOOM`) must NOT
  fire on the persistent shell field (it never cold-mounts per route — the `revealFired` guard
  already handles this; verify).
- **The Band-0 motion tokens** (`--ease-cartoon-punch`, `--motion-weight`) are a shared
  prerequisite of `BG.W-VIZ-REVEAL-BLOOM` AND the broader liquid-motion band — mint them once.
- **No chronic deferred items** beyond the half-shipped `BD.W-SUBSTRATE-SIZE-UNIFY` adoption
  (folded into SIZER-ADOPT-HARD), the unshipped `BD.W-SUBSTRATE-REVEAL-BLOOM` (folded into
  REVEAL-BLOOM), and the un-honored fourier/constellation no-migrate verdict (folded into
  DEMIGRATE). All three are made structural by the waves above.
