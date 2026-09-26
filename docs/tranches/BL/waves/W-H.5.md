# W-H.5 · the transmissive well (loop D3) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item, its gates, its cure and its MIGRATION row move here from W-H.2 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | W-H.2's readings (the band-H probe, `W-H.2.md` §2) |
| ships in | 11.0.0 |
| loop | D3 material. The well rung, its α and its law come from D3's converged spec (D3 common floor row 5, `design/material/PORTFOLIO.md:237`) |
| families | F-31 split: #25 W-FIELD-WELL, a disease row (BLOCKED through BK on riders that had all landed, three closes, LEDGER:67), with #82's G-F2 and L01a-25 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #25 W-FIELD-WELL, L01a-25 | the well law unbuilt; the field fill opaque: decided here, BUILD from D3's converged rung |
| #82 G-F2 | the opaque fill leaves the field's own blur inert: cured by deleting that filter, since D3's floor gives the well no `backdrop-filter` of its own (FL-11, `design/material/REGISTRY.md:323`) |
| UIA-V-234, UIA-V-431 | the opaque wells consumers saw (`INBOUND-MAP.md:350,358`); this wave is their one owner |
| #56d | the σ admissibility of welled specimens under the frost detector (LEDGER:148, moved here from W-H.2's mechanism set) |

## 2 · The defect at HEAD

`--input-on-glass: hsl(36 40% 92%)` light and `hsl(26 12% 22%)` dark (`tokens/on-glass-fg.css:37`, `tokens/dark-arm.css:303`), painted as `background-color: var(--control-surface-bg)` (`components/_shared/field/control.css:103`). The file says so: "OPAQUE at HEAD … so the `backdrop-filter` below is currently inert" (`:73-81`). W-H.2's band-H probe:

| row | HEAD |
|---|---|
| H2/WELL-INERT | the Input's own `blur(14px) saturate(1.5)` moves **0.0000**, both themes; fill `rgb(243,236,226)` / `rgb(63,55,49)` |
| H2/WELL-TRANSMITS | the field interior reads `#f3ece2` over black and over white (light), `#3f3731` over both (dark): transmission **0.0000** |

## 3 · The ruling and the cure

**Ruling (#25): BUILD**, from D3's converged spec.

1. The well is a rung of the ladder, transmissive. `--input-on-glass` retires with no alias in both arms; the field paints the converged well rung (D3-A names it `--glass-well`, at the chrome α; the other routes name theirs in their API tables). The well has no `backdrop-filter` of its own: its backdrop is the rung's paint (D3 floor row FL-11, built by every route). `backdrop-filter: var(--control-surface-blur)` and its transition leg leave `_shared/field/control.css` (`:104`, `:138`).
2. The well law in `_shared/field/control.css:66-103` is rewritten to the converged spec's law, and the comment block that calls the fill "OPAQUE at HEAD … a seam" goes.

## 4 · Files it touches

`src/styles/tokens/on-glass-fg.css:37`, `src/styles/tokens/dark-arm.css:303`, `src/components/_shared/field/control.css:66-103` (and the `--input-on-glass` reads at `:74,83,242,262,282`), the band-H probe (`scripts/probes/band-H/`, which W-H.1 lands).

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| H5-G1 · the well transmits | rows `H2/WELL-TRANSMITS` | transmission ≥ 0.02, both themes | **FAIL 2 of 2**: 0.0000 |
| H5-G2 · the well has no filter of its own (static, D3 FL-11) | `! grep -nE 'backdrop-filter' src/components/_shared/field/control.css` | exit 0; the band-H probe's `H2/WELL-INERT` rows then read `missing` (no filtered element in the well) and pass, both themes | **exit 1** (fix-4, `715912fa`): `:76` (the "currently inert" comment), `:104` `backdrop-filter: var(--control-surface-blur);`, `:138` the transition leg. The same file with those lines removed reads exit 0. Rewritten by fix-4 (FC-06): the former G2 ("the well's own filter moves the stripes, ΔE > 0") required the filter FL-11 removes |
| H5-G3 · no `--input-on-glass` (static) | `! git grep -n -- '--input-on-glass' -- src` | exit 0 | **exit 1**: `on-glass-fg.css:37`, `dark-arm.css:303`, `_shared/field/control.css:74,83,242,262,282` |
| H5-G4 · the converged witness | the D3 family witness rows the converged split table gives this wave (as W-H.1 G6) | exit 0 | exit 1 (D3's witnesses are RED at HEAD, W-H.1 §2) |

The probe's `FIXTURE=1` plant (an 80 % well fill) reads 0 FAIL on H5-G1 (W-H.2 §5), so it can pass. H5-G2 can pass on the file with the filter lines removed and fails on HEAD's. If D3's converged spec overturns FL-11, the wave's entry re-writes G2 from that spec (PLAN §1, loop waves); the floor stands at this writing.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the field well over the stripes, and over black and white | light, dark | Chromium (Playwright WebKit labelled where the scene mounts; real Safari UNMEASURED, OW-3) | `lens-*-well-on.png` / `-off.png` (HEAD light on `f13361d25836…`, off `c378bd464c8b…`, W-H.2 §6), and the black/white pair | H5-G1 (transmission); `H2/WELL-INERT` reading `missing` after |

Captures under `.cache/evidence/W-H.5/`.

## 7 · MIGRATION rows

| removed or changed | successor |
|---|---|
| `--input-on-glass` (both arms) | the converged well rung (D3-A: `--glass-well`, `--glass-well-toward`). keyframes' `TimelineCaret.vue:106` re-points by addendum (SPECS A.2) |

## 8 · Ledger rows

Closes #25 (BUILD, decided here), L01a-25, #82's G-F2 (ledger #82a), #56d, UIA-V-234 and UIA-V-431.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the well is one rung of D3's ladder; W-H.2's frost detector reads it as one more lens.
- **Wave:** H5-G1..G4 green in one run.
- **Feature:** an Input on a glass card over the aurora: the field reads as a recess you can see through, in both themes.
