# W-B.9 · The constellation decided: BUILD, on the one engine, with two live consumers

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree; sibling trees grepped read-only. Amended 2026-11-11 by the records seat for the blob run, from `W-G.1.md` §0.4 (read on master `b5ac6c5b6`) |
| release | `waves/INDEX.md`, the one record |
| the run | the blob run, second of four: W-G.1, W-B.9, W-G.5, W-G.5b, on one branch cut from master after `v12.0.0` merges (`W-G.1.md` §0.1, §0.2) |
| families | F-13, the #45 split (`audit/REGISTRY.md:312-320`); R2-06-04's "constellation and fourier decided BUILD or RETIRE in the same row" (F-48, `REGISTRY.md:1177`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat, on consumer evidence |

## 0 · In the blob run

This wave runs second in the blob run, after W-G.1, and takes four amendments from `W-G.1.md` §0.4. They are written into the sections below:

1. It lands after W-G.1, on W-G.1's one `setup` seam, so it writes one WGSL `setup` and no refusing `setupGL` stub (§3 item 1).
2. It deletes `src/composables/glass/canvas2d/` whole, with `tests/composables/glass/canvas2d/`, the root exports `useCanvas2D`, `resolveCanvasColor` and the `Canvas2D*` types, and the `"canvas2d"` member of `RendererEngine`. Their MIGRATION rows are this wave's (§7).
3. It lands no probe library and no spec scaffold; both are W-G.1's (`tests-visual/blob-run/`, `W-G.1.md` §3 item 8), and this wave adds its rows to them. B9-G1 widens to the whole of `src` (§5).
4. Its captures run on the run's Metal leg, not on W-A.4's (§6).

The size, read on master: one WGSL renderer for four primitives (edges in three styles, nodes in two inks, the pointer disc, the ripple rings); the frame closure in `composables/useConstellation.ts` (`:287-450` of 497) and the four `draw*` functions in `constellationRender.ts` rewritten; `drawOverlay` (54 lines in 9 files), `useCanvas2D.ts` (259 lines), `resolveCanvasColor.ts` (95 lines) and their two test files removed; `Constellation.palette-lifecycle.test.ts` rewritten, since it mocks `useCanvas2D`. `kVisOf` and `readPalette` stay public; the palette's CSS colour strings gain one numeric resolve through the library's token-colour resolver (`src/composables/dom/useResolveTokenColor.ts`). It ports the constellation as it stands after the 11.2.0 u/dp intake, which adds `StillConstellation.vue` and `stillField.ts`.

After the port a host without WebGPU paints no constellation, where Canvas2D paints one on every host today; atlas's page background (`atlas/src/platform/chrome/background/Constellation.host.vue:64`) is the live case. That is the owner's question OQ-1 in `W-G.1.md`. Default: the port stands, the loss is a MIGRATION row, and atlas decides in its own tranche whether to mount `StillConstellation` under the live field. If the owner keeps Canvas2D, this wave leaves the run and `useCanvas2D` stays exported. atlas is told at the booking and at the publish.

## 1 · What it closes

#45 W-CONSTELLATION (`census-register-a.md:52`): UNSTARTED through BK; R2-06-04's decide row for the constellation and the fourier field. R2-06-10's constellation half (the constellation on `useCanvas2D`), handed from W-G.1 by fix-3 so the disease row's enactment is this wave's own (PLAN §1).

## 2 · The defect at HEAD

- **The census reading is refuted.** `census-register-a.md:52` records "0 `./constellation` consumers across siblings". At this seat, read-only: `atlas/src/platform/chrome/background/Constellation.host.vue:64-65` imports `Constellation` and `ConstellationField` from `@mkbabb/glass-ui/constellation`; `slides/src/decks/til-briefing/constellation.ts:31-40` imports `seedField`, `readPalette`, `kVisOf`, `BASE_WIDTH`, `warpStep`, `warpTo` and three types. atlas pins `^10.1.0`, slides `10.1.0`. The fourier field has one consumer: `fourier-analysis/web/src/components/equation/ConvergencePlot.vue`.
- **The engine is the one the owner asked removed.** `useConstellation.ts:11,153,287` import, type and call `useCanvas2D` (3 code lines; 12 lines in the directory with comments). R2-06-10 places this in F-47: the GPU-only asks (BC H40, H43; BD2 A10, A27-A30) reach the constellation.
- **An unfiled consumer ask.** `slides/src/decks/til-briefing/constellation.ts:13-27` lists what the engine "structurally cannot express today": a pinned node excluded from drift and bounce; a red anomaly edge skin on `drawEdges`; an edge floor term and an anomaly-alpha multiplier on the palette; node label text; an autonomous slow drift distinct from click-warp. `git grep -nE 'pinned|drift' -- src/components/constellation/types.ts` prints nothing.

## 3 · The cure

1. **BUILD, built here.** The ruling and its enactment are this wave's (PLAN §1, disease rows; fix-3, FB-18). The constellation stays and moves off `useCanvas2D` onto the shared WebGPU device (`src/composables/glass/webgpu/webgpuDevice.ts`), on the pattern the fourier field already uses (`fourier-field/renderer/wgpu.ts`): a WGSL renderer, nodes as instanced SDF discs, edges as instanced quads; the field simulation stays on the CPU (`seedField`, `warpStep`, `warpTo`) and W-0.6's draw order holds. No second engine is kept: the Canvas2D draw path is deleted in the same change, and a failed acquire draws no field and reports through `onInitError` and `rendererStatus`, as every substrate does after W-G.1. This wave then deletes `canvas2d/` whole, its last caller gone (§0 item 2). **The `drawOverlay` prop goes in the same change** (fix-4, FC-08): its signature hands the consumer the host's `CanvasRenderingContext2D` (`constellationTypes.ts:429-433`, called at `useConstellation.ts:426-436`), and after the port the host canvas holds a WebGPU context, so there is no 2D context to hand over. A library-made 2D overlay canvas would be a second engine and fail B9-G2 and W-G.1's G1-G3. The successor already ships: the exposed `field` (`useConstellation.ts:463`, README "the low-level imperative seam for a custom overlay") and `isFrozen` (`:464`). A consumer that paints a skin stacks its own layer over the host and reads `field` in its own frame; atlas's host already does this (`atlas/src/platform/chrome/background/Constellation.host.vue:11-19`, read only). The fourier field is BUILD on the same ground (one live consumer); both join W-G.4's VizStudio interaction contract.
2. **The slides list.** Three of its five items are CURED at HEAD, and the reply (W-B.2) says so with the props: a pinned node excluded from drift and bounce (`pinned`, `Constellation.vue:51`, `README.md:149`), the autonomous drift distinct from click-warp (`pinnedDrift`, `:53`, `README.md:151`), and the accent edge skin on the pinned node (`accentEdges`, `:52`, `README.md:150`). Two stay in the deck (E-5): label text over the field (the consumer's own layer reading the exposed `field`, item 1; `README.md:187-189` is rewritten to say so) and an edge floor with an anomaly-alpha multiplier (skin over `--constellation-edge-alpha`, `README.md:401`).
3. Record the census correction in the ledger row for #45.

## 4 · Files it touches

`src/components/constellation/` (new `renderer/wgpu.ts` and its WGSL; `Constellation.vue`, `composables/useConstellation.ts`, `constellationRender.ts`, `constellationTypes.ts` (the `drawOverlay` prop and its doc lines), `README.md`), `src/components/PROCEDURAL-SUITE.md` (its `drawOverlay` line), `demo/stories/substrates/constellation.vue` and `demo/stories/manifest.ts` (the story's overlay re-seated on its own layer), `tests/components/custom/constellation/Constellation.palette-lifecycle.test.ts` (its two `drawOverlay` lines), its rows in W-G.1's `tests-visual/blob-run/` (the `g1-contexts.mjs` tally's constellation route, and the harness page's `c=constellation`), which W-G.1 lands; this wave lands no probe library and no spec of its own. Deleted: `src/composables/glass/canvas2d/` and `tests/composables/glass/canvas2d/`; the `useCanvas2D`, `resolveCanvasColor` and `Canvas2D*` lines of `src/index.ts` and `src/composables/glass/index.ts`; the `"canvas2d"` member of `RendererEngine`. Records: `docs/tranches/BL/LEDGER.md`; `docs/tranches/BL/audit/INBOUND.md` (the slides list as a row, `sender-ref slides:unrowed:constellation.ts:13-27`).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B9-G1 · off Canvas2D, in all of `src` | `git grep -nE 'useCanvas2D\|getContext\( *.2d.' -- src` | prints nothing outside the two backdrop sampler files, which are W-G.3's (`W-G.1.md` §0.4 item 3). The aurora's half of that fact is W-G.1's G1-G3 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 4 lines in 2 files, first `useConstellation.ts:11`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: 3 code lines in `useConstellation.ts` (fix-3 re-ran it at `be1969ea`) |
| B9-G2 · the route asks for WebGPU only | W-G.1 appendix B's context tally on `/substrates/constellation`, the constellation's canvas | 0 `2d` requests from the constellation host | **FAIL**: the route tallies `{"2d":12,"webgl2":2,"webgpu":1}` (W-G.1 §2); the `2d` requests are the constellation's `useCanvas2D` |
| ~~B9-G2 (fix-2)~~ | struck (fix-3, FB-18): `git grep -qE 'pinned' -- src/components/constellation/types.ts` read a file that does not exist, so it was red by a wrong path; the subject is cured at HEAD (§3 item 2) | — | — |

| B9-G3 · no 2D skin seam (static) | `! git grep -nE 'drawOverlay\|draw-overlay' -- src demo tests` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 54 lines in 9 files, first `StoryHero.vue:126`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (fix-4, `715912fa`): 42 lines in 8 files (`constellationTypes.ts` 7, `useConstellation.ts` 2, `Constellation.vue` 1, `README.md` 22, `PROCEDURAL-SUITE.md` 1, the demo story 6, `manifest.ts` 1, the palette-lifecycle test 2) |

All three are this wave's own act. W-G.1's G1-G4 keeps the route in its no-WebGL tally for the aurora ground's `webgl2` requests.

## 6 · π and DELTA obligations

**π-CONSTELLATION** (moved here from W-G.1): `/substrates/constellation`, light and dark, before (Canvas2D) and after (WebGPU), plus one capture with a `pinned` node held while the field drifts, and the story's focal skin before (painted through `drawOverlay`) and after (its own layer over the exposed `field`), judged equal in place and phase; Chromium on the blob run's Metal leg, through `guarded`, one browser per probe (`W-G.1.md` §0.4 item 4); atlas's background and slides' deck constellation judged in their repin addenda (E-6). Captures are screenshots only (no `getContext()` on a page canvas). Under `.cache/evidence/W-B.9/`; real Safari UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed or changed | successor |
|---|---|
| `Constellation`'s `drawOverlay?: (ctx: CanvasRenderingContext2D, field, now) => void` prop (`constellationTypes.ts:429-433`) | none as a prop: the consumer stacks its own layer over the host and reads the exposed `field` (and `isFrozen` for the frozen frame) in its own frame. The host canvas is a WebGPU surface and hands out no 2D context |
| `useCanvas2D`, `resolveCanvasColor` and the `Canvas2D*` types (root exports) | none; the library has no 2D canvas engine. A host that drew on its own 2D canvas keeps its own code |
| `RendererEngine`'s `"canvas2d"` member | none; the union is `"webgpu" \| "css"` |
| the constellation paints on every host (Canvas2D) | it paints only where a WebGPU adapter is acquired; elsewhere it draws no field and reports through `onInitError`. `StillConstellation` (11.2.0) is the still a host can mount under it |

`ConstellationField`, the exposes and the other props keep their shape; the renderer is internal. No sibling calls the prop: `grep -rln drawOverlay ~/Programming/slides/src` prints nothing, and atlas names it only in comments (`Constellation.host.vue:11,15`, `Atmosphere.vue:47`) because its host already paints on its own layer (read only, fix-4). The row goes to W-B.2's reply letter and W-L.7's packets (fix-4, FC-08).

## 8 · Ledger rows

#45 (BUILD, built here; the VizStudio contract with W-G.4); R2-06-04's constellation and fourier halves; the slides list (three CURED at HEAD, two DECLINE).
