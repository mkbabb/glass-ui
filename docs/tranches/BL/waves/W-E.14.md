# W-E.14 · the configurator envelope keeps its controls · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item, its gates and its cure move here from W-E.9 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | W-E.9's readings (scratch worktree, `src`/`demo` identical to `f3ad78d0`); appendix A is W-E.9's `e9.mjs`, cells G1 and G2 |
| ships in | 11.0.0 |
| families | F-33 split: C-13c, a disease row (BK FINAL §7 carry, open at two closes, LEDGER:237), with R11 and R4-02-07 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| C-13c / R11 | the studio configurator's controls region is starved to 0 px at 390×844 (`/substrates/aurora`): decided here, BUILD |
| R4-02-07 | the same envelope collapses at 640×400 and under a 24 px root |
| the `layout-canon.test.ts:390` latch | one width-keyed `matchMedia` in `demo/stories/containers/configurator.vue` (`matchMedia("(max-width: 720px)")`) |

## 2 · The defect at HEAD

`configurator/styles.css:317-321` lays the envelope out as rows `auto minmax(var(--configurator-stage-min, 18rem), auto) minmax(0, 1fr)`: the stage keeps 18 rem and the controls take the remainder. `demo/chassis/layout.css:59` caps the envelope at `--stage-block: min(62svh, 44rem)`. W-E.9's appendix A, Chromium:

| cell | controls region | verdict (≥ 44 px) |
|---|---|---|
| `/containers/configurator` 1440 | 8 px | FAIL |
| `/containers/configurator` 390 | 18 px | FAIL |
| `/substrates/aurora` 390 (C-13c) | 0 px | FAIL |
| `/substrates/blob` 390 | 160 px | PASS |
| 640×400 | 0 px | FAIL |
| 1440 with a 24 px root | 0 px | FAIL (18 rem grows with the root) |

The `:390` latch fails when run as `it` (W-E.9 §2).

## 3 · The ruling and the cure

**Ruling (C-13c): BUILD.** The controls are the configurator's point; the stage yields first.

1. The configurator host is a size container, `container: studio / size`. Its rows become `auto minmax(0, 1fr) minmax(min(3 * var(--control-h-md), 40cqb), auto)`: the controls region keeps at least three control rows or 40 % of the envelope, whichever is less, and scrolls inside that port.
2. `--configurator-stage-min` is deleted. `--stage-block` becomes a `min-block-size` for the envelope, not a cap on it.
3. The `matchMedia("(max-width: 720px)")` in `demo/stories/containers/configurator.vue` is deleted; the story reads the container. The `:390` latch becomes an ordinary `it`.

It builds on W-E.9's cel containers (PLAN §5).

## 4 · Files it touches

`src/components/configurator/styles.css:317-321`, `demo/chassis/layout.css:59`, `demo/stories/containers/configurator.vue`, `tests/styles/layout-canon.test.ts:390`, `tests-visual/wired/cel-container.spec.ts` (W-E.9's, cells G1 and G2).

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| E14-G1 · the envelope | W-E.9 appendix A cell G1, 4 cells | 4 of 4 ≥ 44 px | **3 of 4 FAIL** (8, 18, 0; blob 160 passes) |
| E14-G2 · rem growth | W-E.9 appendix A cell G2: 640×400 and a 24 px root | ≥ 44 px or a ≥ 44 px scroll port | **0, 0** |
| E14-G3 · the latch | `npx vitest run tests/styles/layout-canon.test.ts` with `:390` as `it` | 0 failures | **1 failure** (1 `matchMedia`) |
| E14-S (static) | `! grep -q 'configurator-stage-min' src/components/configurator/styles.css` | exit 0 | **exit 1** (`:317-321`) |

Can each fail and pass? The `/substrates/blob` cell of E14-G1 passes at HEAD: the control that shows a controls region can clear 44 px. The `PI_PLANT` bite is `[data-slot=configurator]{grid-template-rows:auto 18rem minmax(0,1fr) !important}` (from W-E.9).

## 6 · π and DELTA obligations

The aurora studio at 390×844 and 640×400, light and dark, Chromium (Playwright WebKit crashes on demo routes at HEAD, recorded; real Safari UNMEASURED, OW-3): HEAD with no controls, then the wave with a scrolling controls region. W-E.9 appendix A writes `envelope-*-{1440,390}.png`; captures under `.cache/evidence/W-E.14/`.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `--configurator-stage-min` | removed | the stage yields to the controls region |

## 8 · Ledger rows

Closes C-13c (BUILD, decided here), R11 (ledger #49c), R4-02-07 and the `:390` latch.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the envelope keys on its own container, like every other layout in W-E.9.
- **Wave:** E14-G1..G3 and E14-S green in one run.
- **Feature:** the aurora studio at 390×844 and 640×400: the stage shrinks and the controls scroll in their own port.
