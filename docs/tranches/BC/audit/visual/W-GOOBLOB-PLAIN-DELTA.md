# BC.W-GOOBLOB-PLAIN — STAGE-1 plain blob DELTA

The goo-blob STAGE-1 floor: re-written as JUST a blob, from first principles, Safari-OK.
The minimal verifiable floor that proves the field is alive (it renders, it meatballs)
before STAGE 2 (`BC.W-GOOBLOB-MEATBALL`) dresses it with the lit/shadow surface.

## What changed (architecture, NOT math)

The `fs_main`/`main()` is re-expressed as a `uStage`-gated kernel:

- `variant: "blob"` → `uStage = 1.0` → the STAGE-1 stripped path: SDF circle + smin
  satellites + fwidth-AA crisp edge + warm-cream gamma-corrected fill + IGN dither +
  premultiply. It returns BEFORE the surface-normal / Fresnel / lit-glint / iridescence
  / fake-SSS / shadow blocks are reached. Deliberately FLAT.
- `variant: "meatball"` (the default) → `uStage = 0.0` → the full lit pipeline,
  BYTE-IDENTICAL to HEAD (the `uStage > 0.5` branch is skipped entirely; no existing
  line changed — the diffs are purely additive).

The SOTA smin/normal/noise math (`sminQuadraticG`/`sminCircularG`/`sceneDistG`/
`surfaceNormalFromGrad`/`noised`/`fbmG`) is BYTE-PRESERVED (the rebuild is the gated
`fs_main`, not a math rewrite). The `uStage` flag rides the spare `s7.w` lane the
typed-struct SoT (`uniformBridgeWGPU.ts`) reserved — the bridge writes it off
`config.variant`; the WGSL `Uniforms` struct + the GLSL uniform mirror it. The WebGL2
fallback (`metaball.frag.ts`) transcribes the SAME branch.

Derivative-safety: the STAGE-1 path's only `fwidth` site is the fragment-stage `fwidth(d)`
AA-edge half-width INSIDE `fs_main` (no shared-helper / `vs_main`-reachable derivative —
the dual-module WGSL-validation trap avoided by construction). The STAGE-1 path therefore
arms on Metal where the STAGE-2 lit path's `fwidth(N)` in non-uniform flow falls to the
WebGL2 net (which DOES paint — the paint floor is met regardless).

## Captured paint (the BB gate-paint-blindness close)

`proof:gooblob-plain` S4/S5 read a REAL rendered-surface capture (`meanLum > 0`,
one-connected-component at the merge phase), NOT a file-presence proxy. The π readback
`tests-visual/gooblob-plain.spec.ts` painted the STAGE-1 `variant="blob"` story on the
real device, both modes, and emitted `W-GOOBLOB-PLAIN-paint.json`:

- **It paints** — `meanLum` well above 0 over the opaque silhouette (light ≈ 240.7,
  dark ≈ 48.6), opaque silhouette ≈ 318k px. NO black void (D9' closed).
- **The edge is crisp** — the alpha ramps over ≤ a couple source px at the boundary
  (fwidth-AA, not a blurry ring).
- **The floor is flat** — peak luma stays below a blown-white glint (no lit specular
  hotspot — the teaching contrast with STAGE 2).
- **The meatball merges** — across a 36-frame orbit sweep the body+satellite silhouette
  is ONE connected component (`mergeConnectedComponents: 1`) — a smooth liquid neck, not
  two unrelated discs. The BA.W-GOO-REDRESS worst-case smin band-widen verified PAINTING.

## Orchestrator handoff — the binding real-Metal capture

The paint record above was captured on the headless-GL local device (the source/
architecture proof). The BINDING gestalt paint is the ORCHESTRATOR's real-Metal capture:

- **Route:** `/substrates/blob` — the "STAGE 1 — the plain blob, from first principles"
  section.
- **Selector:** `[data-testid="goo-blob-plain"] canvas` (the STAGE-1 plain blob canvas;
  the canvas keeps the shared `data-testid="goo-blob-canvas"` too).
- **What the eye should see:** a single clean warm-cream blob sitting there, breathing
  softly, with a few satellite droplets orbiting it; as a satellite passes near the body
  they MERGE into one gooey amorphous shape (a smooth liquid neck), then separate again —
  one connected silhouette, never two unrelated discs. FLAT: no glassy specular, no
  shadow, no iridescence. The edge is crisp (fwidth-AA), and on Safari it does NOT flash.
- The orchestrator overwrites `W-GOOBLOB-PLAIN-paint.json` with the true per-backend
  capture (a WebGPU backend AND an adapter-less host) on real Metal; the FULL gate arm
  re-reads it.

## Fences held

- The smin/normal/noise math byte-preserved (`proof:blob-smin-normalized` GREEN).
- The substrate not forked (`proof:gpu-substrate-single` / `proof:webgl-substrate-single`
  / `proof:offscreen-pause` GREEN; the picker fix is `BC.W-WEBGPU-EVERYWHERE`).
- Compositor-only (`proof:no-layout-animation` GREEN).
- The WGSL reserved-keyword + brace-balance validator passes (`METABALL_WGSL:✓` in
  `proof:webgpu-everywhere` W7).
- ONE color source (the spliced `procedural-color.wgsl`/`.glsl` chunk).
- Warm-cream library default; teal-on-navy stays a demo preset.
- Clean break, no alias — the gated `fs_main`, no parallel `metaball-stage1.wgsl`, no
  `variant="legacy"`.
