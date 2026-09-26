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

#45 W-CONSTELLATION (`census-register-a.md:52`): UNSTARTED through BK; R2-06-04's decide row for the constellation and the fourier field.

## 2 · The defect at HEAD

- **The census reading is refuted.** `census-register-a.md:52` records "0 `./constellation` consumers across siblings". At this seat, read-only: `atlas/src/platform/chrome/background/Constellation.host.vue:64-65` imports `Constellation` and `ConstellationField` from `@mkbabb/glass-ui/constellation`; `slides/src/decks/til-briefing/constellation.ts:31-40` imports `seedField`, `readPalette`, `kVisOf`, `BASE_WIDTH`, `warpStep`, `warpTo` and three types. atlas pins `^10.1.0`, slides `10.1.0`. The fourier field has one consumer: `fourier-analysis/web/src/components/equation/ConvergencePlot.vue`.
- **The engine is the one the owner asked removed.** `useConstellation.ts:11,153,287` import, type and call `useCanvas2D` (3 code lines; 12 lines in the directory with comments). R2-06-10 places this in F-47: the GPU-only asks (BC H40, H43; BD2 A10, A27-A30) reach the constellation.
- **An unfiled consumer ask.** `slides/src/decks/til-briefing/constellation.ts:13-27` lists what the engine "structurally cannot express today": a pinned node excluded from drift and bounce; a red anomaly edge skin on `drawEdges`; an edge floor term and an anomaly-alpha multiplier on the palette; node label text; an autonomous slow drift distinct from click-warp. `git grep -nE 'pinned|drift' -- src/components/constellation/types.ts` prints nothing.

## 3 · The cure

1. **BUILD.** The constellation stays and moves to the one engine: W-G.1's acceptance carries it off `useCanvas2D` onto the shared WebGPU device, with the same seeded field contract (`seedField`'s draw order is W-0.6's gate). The fourier field is BUILD on the same ground (one live consumer) and already shares the device; both join W-G.4's VizStudio interaction contract.
2. **The slides list, ruled by W-B.2's rule.** Two items a consumer cannot add without re-implementing the loop are CURE in W-G.1: a `pinned` node flag (excluded from drift and bounce) and an autonomous drift term distinct from click-warp. Three are skin and stay in the deck (E-5): the red anomaly edge skin, the edge floor with an anomaly-alpha multiplier, and label text drawn over the field. The reply (W-B.2) tells slides which is which.
3. Record the census correction in the ledger row for #45.

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md`; `docs/tranches/BL/audit/INBOUND.md` (the slides list as a row, `sender-ref slides:unrowed:constellation.ts:13-27`). The code is W-G.1's.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B9-G1 · off Canvas2D (built in W-G.1) | `test "$(git grep -c useCanvas2D -- 'src/components/constellation/*.ts' 'src/components/constellation/**/*.ts' \| awk -F: '{s+=$2} END {print s+0}')" -eq 0` | exit 0 | **exit 1**: 3 code lines in `useConstellation.ts` |
| B9-G2 · the two engine primitives (built in W-G.1) | `git grep -qE 'pinned' -- src/components/constellation/types.ts && git grep -qE 'drift' -- src/components/constellation/types.ts` | exit 0 | **exit 1** |

B9-G1 and B9-G2 are born RED here and bound into W-G.1's acceptance; they are this wave's enactment. #45a/#45b's terminals are LEDGER:110-111 and R2-06-04's is :459 (PLAN §1, decide waves).

## 6 · π and DELTA obligations

The decision makes no visual claim; W-G.1 owns the engine's paired captures (atlas's background and slides' deck constellation before and after the engine move, light and dark, Chromium and the GPU leg of W-A.4).

## 7 · MIGRATION rows

None here. If W-G.1 changes `ConstellationField`'s shape, it writes the row.

## 8 · Ledger rows

#45 (BUILD → W-G.1, W-G.4); R2-06-04's constellation and fourier halves; the slides list (two CURE in W-G.1, three DECLINE).
