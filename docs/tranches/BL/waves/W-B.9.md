# W-B.9 · The constellation decided: BUILD, on the one engine, with two live consumers · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree; sibling trees grepped read-only |
| ships in | 11.0.0 |
| families | F-13, the #45 split (`audit/REGISTRY.md:312-320`); R2-06-04's "constellation and fourier decided BUILD or RETIRE in the same row" (F-48, `REGISTRY.md:1177`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat, on consumer evidence |

## 1 · What it closes

#45 W-CONSTELLATION (`census-register-a.md:52`): UNSTARTED through BK; R2-06-04's decide row for the constellation and the fourier field. R2-06-10's constellation half (the constellation on `useCanvas2D`), handed from W-G.1 by fix-3 so the disease row's enactment is this wave's own (PLAN §1).

## 2 · The defect at HEAD

- **The census reading is refuted.** `census-register-a.md:52` records "0 `./constellation` consumers across siblings". At this seat, read-only: `atlas/src/platform/chrome/background/Constellation.host.vue:64-65` imports `Constellation` and `ConstellationField` from `@mkbabb/glass-ui/constellation`; `slides/src/decks/til-briefing/constellation.ts:31-40` imports `seedField`, `readPalette`, `kVisOf`, `BASE_WIDTH`, `warpStep`, `warpTo` and three types. atlas pins `^10.1.0`, slides `10.1.0`. The fourier field has one consumer: `fourier-analysis/web/src/components/equation/ConvergencePlot.vue`.
- **The engine is the one the owner asked removed.** `useConstellation.ts:11,153,287` import, type and call `useCanvas2D` (3 code lines; 12 lines in the directory with comments). R2-06-10 places this in F-47: the GPU-only asks (BC H40, H43; BD2 A10, A27-A30) reach the constellation.
- **An unfiled consumer ask.** `slides/src/decks/til-briefing/constellation.ts:13-27` lists what the engine "structurally cannot express today": a pinned node excluded from drift and bounce; a red anomaly edge skin on `drawEdges`; an edge floor term and an anomaly-alpha multiplier on the palette; node label text; an autonomous slow drift distinct from click-warp. `git grep -nE 'pinned|drift' -- src/components/constellation/types.ts` prints nothing.

## 3 · The cure

1. **BUILD, built here.** The ruling and its enactment are this wave's (PLAN §1, disease rows; fix-3, FB-18). The constellation stays and moves off `useCanvas2D` onto the shared WebGPU device (`src/composables/glass/webgpu/webgpuDevice.ts`), on the pattern the fourier field already uses (`fourier-field/renderer/wgpu.ts`): a WGSL renderer, nodes as instanced SDF discs, edges as instanced quads; the field simulation stays on the CPU (`seedField`, `warpStep`, `warpTo`) and W-0.6's draw order holds. No second engine is kept: the Canvas2D draw path is deleted in the same change, and a failed acquire paints the component's CSS ground and reports through `rendererStatus`, as every substrate does after W-G.1. W-G.1 then deletes `canvas2d/` with no constellation caller left. The fourier field is BUILD on the same ground (one live consumer); both join W-G.4's VizStudio interaction contract.
2. **The slides list.** Three of its five items are CURED at HEAD, and the reply (W-B.2) says so with the props: a pinned node excluded from drift and bounce (`pinned`, `Constellation.vue:51`, `README.md:149`), the autonomous drift distinct from click-warp (`pinnedDrift`, `:53`, `README.md:151`), and the accent edge skin on the pinned node (`accentEdges`, `:52`, `README.md:150`). Two stay in the deck (E-5): label text over the field (the consumer's `drawOverlay`, `README.md:189`) and an edge floor with an anomaly-alpha multiplier (skin over `--constellation-edge-alpha`, `README.md:401`).
3. Record the census correction in the ledger row for #45.

## 4 · Files it touches

`src/components/constellation/` (new `renderer/wgpu.ts` and its WGSL; `Constellation.vue`, `composables/useConstellation.ts`, `constellationRender.ts`, `README.md`), `demo/stories/substrates/constellation.vue`, `tests-visual/wired/one-engine.spec.ts` (the constellation route row, W-G.1 appendix B's context tally), `docs/tranches/BL/LEDGER.md`; `docs/tranches/BL/audit/INBOUND.md` (the slides list as a row, `sender-ref slides:unrowed:constellation.ts:13-27`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B9-G1 · off Canvas2D | `test "$(git grep -c useCanvas2D -- 'src/components/constellation/*.ts' 'src/components/constellation/**/*.ts' \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 3 code lines in `useConstellation.ts` (fix-3 re-ran it at `be1969ea`) |
| B9-G2 · the route asks for WebGPU only | W-G.1 appendix B's context tally on `/substrates/constellation`, the constellation's canvas | 0 `2d` requests from the constellation host | **FAIL**: the route tallies `{"2d":12,"webgl2":2,"webgpu":1}` (W-G.1 §2); the `2d` requests are the constellation's `useCanvas2D` |
| ~~B9-G2 (fix-2)~~ | struck (fix-3, FB-18): `git grep -qE 'pinned' -- src/components/constellation/types.ts` read a file that does not exist, so it was red by a wrong path; the subject is cured at HEAD (§3 item 2) | — | — |

Both are this wave's own act. W-G.1's G1-G4 keeps the route in its no-WebGL tally for the aurora ground's `webgl2` requests.

## 6 · π and DELTA obligations

**π-CONSTELLATION** (moved here from W-G.1): `/substrates/constellation`, light and dark, before (Canvas2D) and after (WebGPU), plus one capture with a `pinned` node held while the field drifts; Chromium on W-A.4's GPU leg; atlas's background and slides' deck constellation judged in their repin addenda (E-6). Captures are screenshots only (no `getContext()` on a page canvas). Under `.cache/evidence/W-B.9/`; real Safari UNMEASURED (OW-3).

## 7 · MIGRATION rows

None: `ConstellationField` and the props keep their shape; the renderer is internal. If the port changes a published type, this wave writes the row.

## 8 · Ledger rows

#45 (BUILD, built here; the VizStudio contract with W-G.4); R2-06-04's constellation and fourier halves; the slides list (three CURED at HEAD, two DECLINE).
