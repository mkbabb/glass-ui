# AY.W-AUR-WEBGPU-DECIDE — Aurora WebGPU twin: execute the retire-or-resurrect decision

**Tranche** AY (glass-ui) · **Wave** W-AUR-WEBGPU-DECIDE · **State** OPEN
**Repo** `/Users/mkbabb/Programming/glass-ui` · **Supersedes** the prior W-AUR3 "WebGPU path" impl gate
**Source** `docs/tranches/AY/audit/hardening/H-aurora.md` Findings 1, 2, 7 + chronic-miss 2

---

## Goal criterion

The Aurora WebGPU twin stops being a half-built, medium-less, consumer-less liability. The
wave reaches a state where EITHER the WGSL/WebGPU scaffold is gone entirely (the smooth-pole
twin, its runtime route, its uniform-pack half, its 5 gates, and the doc claims that point at
it) — OR it is resurrected behind a NAMED consumer route that actually renders the multi-pass
Kuwahara finish, with a written parity definition. No third state survives close: a
half-built medium-less twin with `WEBGPU_PARITY=false` and zero consumers is exactly the
dead-scaffold the no-overfitting precept (≥2-consumer bar) and AX.W14 §0 ("excise or fail
explicitly") forbid.

## Completion criterion

The Hard Gate (§"Hard Gate" below) verifies: the RETIRE branch closes on a deletion proof
(`grep -r aurora.wgsl src/ → 0 importers`, the 5 WebGPU gates removed from `gates.mjs` +
`package.json`, `npm run typecheck` + `npm run build` green) PLUS a doc-reconciliation proof
(`grep` for the stale-restoration phrases → 0 hits in README/DESIGN); OR the RESURRECT branch
closes on a captured Kuwahara-finish DELTA artefact under `AY/audit/visual/` + a named
consumer route + a written parity definition. The wave is single-disposition — it commits to
exactly ONE branch at execution and the other branch's gate is marked N/A with rationale.

---

## Defect — verified at HEAD (`at-dock-convergence`)

**The WGSL/WebGPU twin is a medium-LESS smooth-pole renderer, wired into the live runtime
behind a permanently-false lever, with 5 gates and ~556 lines of scaffold that no consumer
reaches.** (H-aurora Finding 1 + 2; chronic-miss 2.)

Concrete, file:line:

1. **The twin is medium-less.** `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts`
   (235 lines) renders ONLY `domainWarp → nucleiField → samplePalette → breath → aces →
   linearToSrgb`. Grep for any medium dispatch (`mediumOil|mediumVangogh|mediumOilPastel|
   mediumCrayon|mediumPastel|mediumWatercolor|uMedium|profileFor`) in the WGSL → **zero hits**.
   No brush engine (the 366-line `brush.glsl.ts` has no WGSL twin), no structure-tensor /
   flow / cursor-warp / impasto-relight / grain. The GLSL path is ~1000 lines of medium/brush;
   the WGSL twin is the smooth ATMOSPHERIC POLE ONLY.

2. **The twin's own comment narrates a self-acknowledged reduced-parity twin.**
   `aurora.wgsl.ts:7-9` says it draws "the SAME single-pass aurora" then immediately
   "the dead multi-pass painterly half … was excised (zero consumers)". `renderMode.ts:24-30`
   is candid: the twin is "reduced-parity by design even unblocked (isotropic-only nuclei,
   fbm-only warp, NO flow/cursor/lighting/mediums/strokes/grain, a straight-OKLab palette vs
   the GLSL OKLCh hue-arc)." So the twin paints the SAME nuclei/palette field, NOT the same
   painted image — the "SAME aurora" parity claim is a half-truth.

3. **The lever is permanently false; the route is dead-wired.** `renderMode.ts:39`
   `export const WEBGPU_PARITY = false`. `resolveRenderModeAsync` (`renderMode.ts:130-132`)
   short-circuits to `{ substrate: "webgl", device: null }` BEFORE the adapter probe whenever
   the lever is false. `useAurora.ts:342-358` probes for WebGPU past first paint and would
   swap to `runtime.ts:165-201`'s `createGPUCanvas` route — but the lever guarantees the swap
   never fires. So a WebGPU-capable machine is ALWAYS served the WebGL2 path; the WGSL twin
   is reachable only by the `proof:aurora-webgpu-render` gate forcing it internally.

4. **The only architectural reason for WebGPU was already EXCISED.** `gpuRuntime.ts:14-20`
   records: WebGPU's single justification is the multi-pass painterly half (Gaussian-smoothed
   structure tensor + anisotropic Kuwahara + stable-fluids wake), and that scaffold "was
   EXCISED — it shipped as substrate-without-consumer (zero importers)" at AX.W14. The
   `aurora.wgsl.ts:226`-class comment referencing the "W7c multi-pass passes" points at a
   DELETED path.

5. **Stale doc claims describe a restoration that did NOT happen.** `README.md:432` says "the
   restoration wave is AX.W14 (band C · AURORA)" — but AX.W14 RAN and its verdict was the
   de-facto EXCISE (multi-pass scaffold deleted). `DESIGN.md:195-203` still describes the
   multi-pass Kuwahara/LIC/wake as a staged "AW.W7 WebGPU branch" as though pending, and
   `DESIGN.md:212` describes the `wake.wgsl.ts` stable-fluids splat as a live future branch.
   Forward-looking docs describing a deleted path (H-aurora Finding 7; "greenfield no meta" +
   the doc-currency precept).

**Why the prior W-AUR3 "WebGPU path" gate is wrong (the scope-confusion).** `AY.md:57` carried
"WebGPU path" as a live IMPL gate with no named consumer and no parity definition. That gate
is under-specced AND scope-confused: it either (a) means re-introduce the excised multi-pass
scaffold — violating the ≥2-consumer bar UNLESS a real hero route demands the Kuwahara finish,
named — or (b) means "ship the smooth single-pass WGSL twin by default" — which the AX.W14
verdict explicitly forbids (no capable machine silently downgrades to the reduced twin). The
AY plan named neither. This wave RETIRES that gate and replaces it with a binary
retire-or-resurrect decision.

---

## Objective

**Execute the W-AUR1 WebGPU decision as a single committed disposition.** The clean disposition
per H-aurora convergence criterion 2 is **RETIRE** (the default): no named hero route demands
the Kuwahara painterly finish at HEAD, the twin is reduced-parity-by-design, the lever is
permanently false, and the only architectural reason for WebGPU was already excised. RETIRE
deletes the scaffold and reconciles the docs. The RESURRECT branch is the conditional escape:
taken ONLY if W-AUR1's research brief (`AY.W-AUR1`) names a concrete ≥1 consumer route that
will render the Kuwahara finish AND states a parity definition — in which case this wave
delivers a captured Kuwahara-finish DELTA instead.

This honors:
- **the ≥2-consumer overfitting bar** — substrate without a consumer retires (the binary at
  every close; L invariant 8);
- **gestalt-over-patch** — the twin is removed root-and-branch (shader + runtime route + pack
  half + gates + docs), not papered with another disabling flag;
- **root-not-consumer** — the edit lands in the library (`src/`), not in any consumer;
- **greenfield-no-meta** — the reconciled README/DESIGN carry no "ported/restoration/staged"
  phrasing for a path that does not exist;
- **the cardinal DELTA** — the RESURRECT branch (if taken) closes on a captured render
  artefact, never a commit-message claim.

---

## Branch A — RETIRE (the default disposition)

Delete the WGSL/WebGPU twin root-and-branch. Edit-sites, in dependency order (delete consumers
before the symbols they import so `typecheck` stays green at each step):

### A.1 — delete the shader + runtime + uniform-pack files

| File | Action |
|---|---|
| `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` (235 lines) | **DELETE** the file |
| `src/components/custom/aurora/composables/gpuRuntime.ts` (181 lines) | **DELETE** the file |
| `src/composables/glass/createGPUCanvas.ts` (140 lines) | **DELETE** the file — verified consumed ONLY by `gpuRuntime.ts` (the `createCanvasLifecycle.ts` / `useWebGLCanvas.ts` references are sibling-relationship comments, not imports; `goo-blob` has zero WGSL/WebGPU code — its only match is a README mention) |

### A.2 — carve the WGSL splices out of the shared chunk

`src/composables/glass/webgl/shaders/procedural-color.glsl.ts` — remove the WGSL-twin export
block (lines ~297-end): the `// AW.W7a — the WGSL TWIN of the shared color/noise chunk` header
+ `OETF_WGSL` (:319), `FBM_ROT_WGSL` (:335), `OKLCH_MATRICES_WGSL` (:341), `PALETTE_RAMP_WGSL`
(:389), `PCG_HASH_WGSL` (:443). KEEP every `*_GLSL` export (the WebGL2 path consumes them).
Reconcile the cross-reference comments at :143-148, :202, :232-236, :297-318, :384-388 that
narrate the GLSL/WGSL twin pairing — strike the WGSL half of each (the GLSL leaf STAYS as the
single source; it simply no longer has a WGSL twin to single-source against).

### A.3 — carve the GPU-pack half out of the uniform bridge

`src/components/custom/aurora/composables/uniformBridge.ts` — this file is MIXED (shared
`MEDIUM_ID`/`resolveMediumId`/etc. consumed by the GLSL path STAY). Remove ONLY the GPU-only
exports: `WGPU_UNIFORM_FLOATS` (:169), `WGPU_FIELD_FLOATS` (:170), `packGPUUniforms` (:180),
and the `:178` "MUST mirror aurora.wgsl.ts `struct Uniforms`" doc-comment. Verify no remaining
importer of these three symbols outside the deleted `gpuRuntime.ts` / the deleted gates / the
deleted spec.

### A.4 — remove the runtime route + the async probe webgpu arm

- `src/components/custom/aurora/composables/runtime.ts` — remove the `gpuDevice?` option
  (:98), the `createGPUCanvas` import (:27) + the `createGPUAuroraSetup` import (:33), and the
  `options.gpuDevice ? createGPUCanvas(…) : createWebGLCanvas(…)` ternary (the destructure assignment
  begins ~:170, the `? createGPUCanvas` arm at :177-189, the `: createWebGLCanvas` arm at :190+) —
  collapse to the unconditional `createWebGLCanvas` arm (the actual WebGL backend factory; NOT
  `useWebGLCanvas` — the spec's prior naming was imprecise).
- `src/components/custom/aurora/composables/useAurora.ts` — remove the `resolveRenderModeAsync`
  import (:17) and the past-first-paint WebGPU probe-and-swap block (:336-358). The sync
  `resolveRenderMode` (the `auto → webgl|css` low-power decision) STAYS — it is the live tier
  decision, unrelated to the WGSL twin.
- `src/components/custom/aurora/constants/renderMode.ts` — delete `WEBGPU_PARITY` (:39),
  `AuroraSubstrate` (:16 — the `"webgpu" | "webgl" | "css"` union), `isFallbackAdapter` (:112) +
  `resolveRenderModeAsync` (:118 onward, the async webgpu-probe function), and the `"webgpu"` member
  from any surviving union. KEEP `AuroraRenderMode` + `resolveRenderMode` (the `webgl|css|auto` sync
  tier — the live default path; verified `resolveRenderMode` stays the sync component-boundary decision).

### A.5 — remove the 5 WebGPU gates

Remove from `scripts/gates.mjs` (the gate registry — 4 of the 5 are registered) AND `package.json`
scripts (`:622-626`, re-verified at HEAD — the prior `:620-624` citation is stale, off by 2 since
`proof:aurora-arresting-ref` landed at `:620`), and delete the corresponding `scripts/proof-*.mjs` +
`tests-visual/*.spec.ts`:

| Gate id | gates.mjs | package.json | script / spec |
|---|---|---|---|
| `proof:aurora-wgsl-equivalence` | :337 | :622 | `scripts/proof-aurora-wgsl-equivalence.mjs` + `tests/composables/glass/backend-equivalence.test.ts` + `tests/components/custom/aurora/aurora-color.wgsl-port.ts` |
| `proof:aurora-noise-hash-equivalence` | :343 | :623 | `scripts/proof-aurora-noise-hash-equivalence.mjs` |
| `proof:aurora-backend-fallback` | :349 | :624 | `scripts/proof-aurora-backend-fallback.mjs` |
| `proof:webgpu-substrate-single` | :355 | :625 | `scripts/proof-webgpu-substrate-single.mjs` |
| `proof:aurora-webgpu-render` | **NOT in gates.mjs** (package.json-only — verified `grep "aurora-webgpu-render" gates.mjs` → 0) | :626 | `scripts/proof-aurora-webgpu-render.mjs` + `tests-visual/aurora-webgpu-render.spec.ts` |

Reconcile the surviving gates that name the deleted twin BY-IRRELEVANCE:
- `proof:aurora-noise-hash-equivalence`'s clauses asserting `aurora.wgsl.ts` splices `PCG_HASH_WGSL`
  (:107,:120) are deleted with the gate.
- `proof:offscreen-pause.mjs` (references `AuroraSubstrate`/the GPU compute park) — strike the
  WebGPU-dispatch clause; the WebGL2 offscreen-park contract STAYS.
- `proof:design-md-current.mjs` — re-point any assertion keyed on the WebGPU section (A.6 below).
- `tests-visual/pi-manifest.ts:145` + the `WEBGPU_PARITY=false` notes in
  `aurora-mediums-substrate.spec.ts:17`, `aurora-painterly-statistics.spec.ts:27`,
  `aurora-atoms-render.spec.ts:17` — strike the now-meaningless lever reference (the live
  aurora is WebGL2 unconditionally; no lever to disclose).

### A.6 — reconcile the docs (the doc-currency proof)

- `src/components/custom/aurora/README.md` — DELETE the `### WebGPU — gated OFF …` section
  (:395-444) and the two header WebGPU lines (:35-39); remove the `proof:aurora-webgpu-render`
  + `proof:aurora-wgsl-equivalence` + `proof:aurora-backend-fallback` rows from the gate table
  (:632-633, :356, :373). Replace with at most one honest sentence: Aurora renders on a
  single-pass WebGL2 fragment shader; WebGPU was investigated (AX.W14) and the multi-pass
  painterly half was excised as substrate-without-consumer — no WGSL twin ships. NO
  "restoration wave" / "until W14 finalize" / "staged" / "gated OFF until" phrasing.
- `src/components/custom/aurora/DESIGN.md` — strike :195 (the "WebGL2-now / WebGPU-later split"),
  the `### The substrate — WebGPU-first with the WebGL2 fallback` section (:197-203), the
  WebGPU interactivity arms (:212 wake), and reconcile :269/:296/:309/:332 (the Δ-ledger rows)
  to record the EXCISE as the terminal state, not a pending finalize. The `Δ09a — WebGPU
  painterly EXCISE (AX.W14, LANDED)` row (:309) is the truthful anchor; remove the rows that
  contradict it.
- `aurora.frag.ts:202,231` + `gpuRuntime.ts` references + `procedural-color.glsl.ts:148,311,388`
  comment cross-refs to `aurora.wgsl.ts` — strike (the GLSL is no longer "the SAME source the
  WGSL twin splices"; it is simply the single source).

---

## Branch B — RESURRECT (the conditional escape; taken ONLY with a named consumer)

Taken ONLY if `AY.W-AUR1`'s research brief names a concrete ≥1 consumer route (a hero page,
a demo composition, a documented consumer surface) that will render the multi-pass Kuwahara
painterly finish, AND states a parity definition (what "WebGPU = WebGL2 + the Kuwahara finish"
means measurably). Absent that named consumer at execution, Branch B is N/A and Branch A runs.

If taken, Branch B must:
- re-introduce the excised multi-pass scaffold (Gaussian-smoothed structure tensor +
  anisotropic Kuwahara) on the WebGPU path WIRED to the named consumer route (not gated OFF;
  the consumer actually mounts it);
- flip `WEBGPU_PARITY` semantics to a real opt-in the named route sets;
- carry the medium dispatch onto the WGSL path (the twin currently omits it — Finding 1) so
  the parity definition holds;
- reconcile README/DESIGN to describe the LIVE Kuwahara route (no stale-pending language).

Branch B does NOT close on a green statistics gate or a "WebGPU path exists" assertion — it
closes on a captured render DELTA (the cardinal lesson).

---

## Hard Gate

The wave commits to EXACTLY ONE branch; the other branch's clauses are marked N/A with a
one-line rationale in `PROGRESS.md`.

### Branch A (RETIRE) — the deletion + reconciliation proof

ALL of:

1. **Deletion proof (scoped to CODE, not the decision-record prose).** `grep -rn
   "aurora\.wgsl\|aurora\.wgsl\.ts" --include="*.ts" --include="*.vue" --include="*.mjs"
   src/ scripts/ tests/ tests-visual/` returns **0 hits** (the file is gone and no
   importer/code-comment references it). `find src -name "aurora.wgsl.ts" -o -name "gpuRuntime.ts"
   -o -name "createGPUCanvas.ts"` returns **0 files**. `grep -rn
   "WEBGPU_PARITY\|resolveRenderModeAsync\|AuroraSubstrate\|packGPUUniforms\|
   WGPU_UNIFORM_FLOATS\|WGPU_FIELD_FLOATS\|_WGSL" --include="*.ts" --include="*.vue" src/`
   returns **0 hits**. **`--include` scoping is load-bearing:** the W-AUR1 artefact
   `src/components/custom/aurora/RESEARCH.md` legitimately NAMES the retired symbols in its §6
   decision-row prose ("delete `aurora.wgsl.ts` … `WEBGPU_PARITY`"); a bare `grep -rn … src/` would
   false-RED on that decision RECORD. The deletion target is source SYMBOLS (`.ts`/`.vue`/`.mjs`),
   not the markdown decision narrative — the README/DESIGN doc-prose is handled separately by the
   SCOPED clause #4 pattern (which does not match `aurora.wgsl`/`WEBGPU_PARITY` outside the stale
   restoration phrasings). The `Δ09a … EXCISE` and the one honest single-pass sentence are the only
   surviving doc mentions; the `.md`-naming-the-symbol-it-retired is the decision artefact, not a
   dead reference.
2. **Gate-removal proof.** `grep -n "aurora-wgsl-equivalence\|aurora-noise-hash-equivalence\|
   aurora-backend-fallback\|webgpu-substrate-single\|aurora-webgpu-render" scripts/gates.mjs
   package.json` returns **0 hits**; the 5 `scripts/proof-*.mjs` + the 2 `tests-visual/*webgpu*`
   /`backend-equivalence`/`*.wgsl-port.ts` artefacts are deleted (`find` proof).
3. **Build/type green.** `npm run typecheck` exits 0 and `npm run build` exits 0 (the deletions
   leave no dangling import; the WebGL2 path renders unchanged).
4. **Doc-reconciliation proof.** `grep -rniE "restoration wave|until.{0,3}W14|WebGPU.{0,20}gated OFF|
   WEBGPU_PARITY|WebGPU-first|gated OFF by default|W14 (multi-pass )?finalize|wgsl twin"
   src/components/custom/aurora/README.md src/components/custom/aurora/DESIGN.md` returns
   **0 hits** (no stale restoration/parity/twin claim survives). At most one honest
   single-pass-WebGL2 sentence remains, and the `Δ09a … EXCISE (AX.W14, LANDED)` row is the
   terminal WebGPU statement.
5. **Runtime-render canary (no-regression of the WebGL2 path).** The retire must not move a
   rendered pixel — the WebGL2 path was ALWAYS the live path, so deleting the dead WGSL twin changes
   nothing the user sees. The canary is the set of GPU-free / GPU-present gates that are GREEN at HEAD
   and stay green: `npm run proof:aurora-atoms-roundtrip` (DEFAULT-PRESERVING — pure logic, GPU-free,
   GREEN now) + `npm run proof:aurora-oklch-interp` + `npm run proof:aurora-space-gamma` all exit 0,
   proving the WebGL2 color/atoms path is byte-identical post-deletion. **Do NOT gate on
   `proof:aurora-painterly-statistics`** — it is `status:fail` (born-RED) at HEAD and stays RED until
   `W-AUR-PAINTERLY` lands; asserting it "passes" here would couple this RETIRE wave to an unrelated
   open painterly gate. The no-pixel-change evidence is the EXISTING committed aurora screenshot set
   (`docs/tranches/AX/audit/visual/W18-aurora-*.png`) — unchanged; no NEW capture required (RETIRE
   removes a dead path off the live render, it does not change a rendered pixel; the live aurora was
   never served by the deleted twin since `WEBGPU_PARITY=false`).

### Branch B (RESURRECT) — the captured Kuwahara DELTA + named consumer

ALL of (mutually exclusive with Branch A):

1. **Named consumer.** `AY.W-AUR1`'s research brief (or this wave's PROGRESS) names the
   concrete ≥1 consumer route, and that route MOUNTS the WebGPU Kuwahara finish (verified by a
   `grep` for the consumer's import of the live WebGPU path, NOT a gated-OFF flag).
2. **Captured render DELTA.** A committed BEFORE/AFTER pair under
   `docs/tranches/AY/audit/visual/` showing the Kuwahara painterly finish rendered by the
   named route on a real GPU device (the captured artefact, NOT a commit-message claim — the
   cardinal lesson). The twin renders a medium (the Finding-1 gap closed): grep for a medium
   dispatch in the WGSL → ≥1 hit.
3. **Written parity definition.** A stated, falsifiable parity definition lands in
   README/DESIGN (what WebGPU = WebGL2 + Kuwahara means measurably), and the WebGPU-render
   gate asserts it on a real device.

### The single binding condition

**No dead WGSL scaffold survives close.** Either `grep -r aurora.wgsl src/ → 0 importers`
(Branch A, the deletion proof + typecheck/build green + the doc-reconciliation grep → 0 stale
claims), OR the named consumer route renders the Kuwahara finish (Branch B, the captured DELTA
artefact + the medium-dispatch grep + the written parity definition). The wave cannot close on
the status quo (a half-built medium-less twin behind `WEBGPU_PARITY=false`).

---

## Named successor

If Branch A closes (the expected disposition): NONE — the twin is retired terminally; any
future WebGPU work opens fresh with a named consumer (no scaffold to resurrect, a clean
greenfield re-introduction). If Branch B is somehow taken without a fully captured Kuwahara
DELTA at the CI-low threshold, the miss names a successor impl wave that delivers the capture;
the wave does not close `complete` on a green-structure-over-unaudited-render.
