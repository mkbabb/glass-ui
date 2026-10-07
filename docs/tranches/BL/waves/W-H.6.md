# W-H.6 · the backdrop's edge sample (T-45), decided and built (loop D3) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 10 (`formation-audit/fix-10.md`, FI-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `31f3c5ea` in a scratch worktree; `git diff --stat v10.1.0 31f3c5ea -- src` prints nothing, so `src` is the published 10.1.0 |
| ships in | 11.0.0 |
| loop | D3 material. The ladder's two pseudo-elements are claimed (`.glass-resting::before` the specular catch-light, `::after` grain and rim, `styles/glass/material.css:135`), and which element carries the blur is D3's to converge with the ladder (W-H.2) and the O-87 constraint |
| families | F-13 split: L06-08, T-45, a disease row. DEFERRED at BI as an "architectural blocker" (`BI/audit/visual/W-XR-PRODUCER-REPAIRS-DELTA.md:21`), in no BJ, BK or BL register (`audit/round-1/L06.md:229-233`), so it rode the BJ and BK tranches and their closes undecided (CH:23) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| T-45, L06-08 | every ladder rung that pairs a `backdrop-filter` blur with a clip smears the ground about one blur radius inside its edge: the backdrop sample stops at the border box, so the kernel clamps to the edge pixel and a bright edge is pulled inward. Decided here: **BUILD** |
| value.js's interim | the pane-card oversampled seat (`value.js/demo/styles/shell.css:300-345`, "This whole block dies the day that lands"); W-L.7 names it for retirement (§3.1 item 6) |

## 2 · The defect at HEAD

Measured with fix-10's probe (`formation-audit/fix-10.md` appendix V, scene `edge`), Chromium 149 with `--force-color-profile=srgb`, DPR 1, at `31f3c5ea`. The ground is black with one 2 px white line that sits just inside the card's inline-start edge. A true blur spreads that line thinly. A sample clamped at the border box repeats the line outward and paints a bright band inward. Two boxes of 300 × 200 px, square corners, each over its own line:

- **card**: `.glass-resting` as shipped (`backdrop-filter: blur(16px) saturate(…)`, `styles/glass/ladder.css:110`), its border box starting on the line;
- **ref**: the same class on a child inset by −64 px (four radii) inside an `overflow: hidden` box of the same size, so the sample reaches real ground past every visible edge.

OKLab L of the mid-height row, at three depths inside the edge:

| theme | depth | card | ref | ΔL | verdict (\|ΔL\| ≤ 0.02) |
|---|---|---|---|---|---|
| light | 6 px | 0.2193 | 0.1700 | +0.0493 | FAIL |
| light | 10 px | 0.2062 | 0.1654 | +0.0408 | FAIL |
| light | 16 px | 0.1838 | 0.1560 | +0.0278 | FAIL |
| dark | 6 px | 0.2017 | 0.1560 | +0.0457 | FAIL |
| dark | 10 px | 0.1883 | 0.1513 | +0.0370 | FAIL |
| dark | 16 px | 0.1654 | 0.1415 | +0.0239 | FAIL |

6 of 6 FAIL in Chromium: the shipped rung is 0.024 to 0.049 L brighter than the oversampled one, out to a full radius. Playwright WebKit (headless) paints no `backdrop-filter`: card and ref read the same L at every depth (0.1173 light, 0.0889 dark, ΔL 0.0000), so its rows are recorded and not gated. Real Safari: UNMEASURED (OW-3).

Static: `git grep -c 'backdrop-filter:' -- src` sums to 56 lines in 34 files; the five ladder rungs are `styles/glass/ladder.css:68,94,110,138,157`. `git grep -nE 'T-45|oversampl' -- src` prints nothing: the library carries no cure and no note.

## 3 · The ruling and the cure

**Ruling (T-45): BUILD**, from D3's converged spec. Grounds: the defect is live and measured (§2); a consumer carries the cure locally and its owner named the artefact ("strange clipping artifacts on the borders of these cards", value.js `shell.css:300-345`); and O-87 lowers the blur slightly (W-0.11) without removing it, so the smear narrows and stays.

1. **Every ladder rung samples past its edge.** The blur is carried by a layer whose sample region overshoots the visible edge by two blur radii on every side, clipped back to the rung's own rounded box, so the clamped band falls outside the clip. The radius it reads is the rung's own token (`--glass-blur-<rung>-radius` at the element's `--glass-level`), never a second value.
2. **Which element carries it is the converged spec's.** Both ladder pseudo-elements are taken at HEAD. D3's converged ladder (W-H.2 composes the blur at the reading element) and its O-87 pass (which may retire the specular catch-light and free `::before`) decide the seat. This wave builds that seat and no other; it adds no wrapper element a consumer must author.
3. **Hit testing is unchanged.** The overshoot is clipped (`clip-path` or the rung's own `overflow: clip`), so the band outside the box takes no pointer.
4. **The rungs outside the ladder file** that pair a ladder blur with a clip (`glass-capsule.css:57,81`, `surfaces.css:26`, `surfaces-pager.css:44`, `utilities/components.css:23`) take the same seat, or are named in the wave record with the reason they do not need it (a capsule whose blur radius is smaller than its own edge ink).

## 4 · Files it touches

- `src/styles/glass/ladder.css` (the five rungs), `src/styles/glass/material.css` (the pseudo-element the seat uses), and the four files of §3 item 4: `src/styles/glass/glass-capsule.css`, `src/styles/glass/surfaces.css`, `src/styles/glass/surfaces-pager.css`, `src/styles/utilities/components.css`. H6-G3 reads all six.
- `scripts/probes/band-H/` (the probe W-H.1 lands): this wave adds the scene `edge` and its rows from `formation-audit/fix-10.md` appendix V.
- `MIGRATION.md` and `CHANGELOG.md` only if the seat changes a published class's box (§7).

## 5 · Acceptance gates

`node scripts/probes/band-H/build.mjs <wt> h6 && node scripts/probes/band-H/measure.mjs h6 --rows T45`.

| id | gate | passes when | HEAD reading (fix-10, `31f3c5ea`) |
|---|---|---|---|
| H6-G1 · the edge sample | rows `W-H.6/T45-EDGE`, Chromium, light and dark, depths 6, 10 and 16 px, for each of the five ladder rungs | \|ΔL\| ≤ 0.02 between the shipped rung and its oversampled reference at every depth | **FAIL 6 of 6** on `.glass-resting` (ΔL +0.0239 to +0.0493, §2). Playwright WebKit: ΔL 0.0000, recorded, not gated (it paints no `backdrop-filter`) |
| H6-G2 · the gate can pass | the same rows with `FIXTURE=1`, which builds the card as the reference is built | 0 FAIL | **0 FAIL of 6** in Chromium at `31f3c5ea` (fix-10): ΔL 0.0000 at every depth in both themes. The fixture is a gate plant, not a design |
| H6-G3 · no second radius (static) | `! git grep -nE '(^\|[^-a-z])(inset\|inset-block\|inset-inline\|top\|right\|bottom\|left)(-start\|-end)?:([^;]*[ (,])?-[0-9.]+[a-z%]' -- src/styles/glass/ladder.css src/styles/glass/material.css src/styles/glass/glass-capsule.css src/styles/glass/surfaces.css src/styles/glass/surfaces-pager.css src/styles/utilities/components.css`, and `test -z "$(git grep -nE '(^\|[^-a-z])(inset\|inset-block\|inset-inline\|top\|right\|bottom\|left)(-start\|-end)?:[^;]*calc\(' -- src/styles/glass/ladder.css src/styles/glass/material.css src/styles/glass/glass-capsule.css src/styles/glass/surfaces.css src/styles/glass/surfaces-pager.css src/styles/utilities/components.css \| grep -v 'var(')"` | both exit 0: the overshoot is computed from the rung's radius token in any of the six files §4 says the seat may write. The first span fails on a negative literal length in any unit and at any position of the value; the second on a `calc()` on those properties whose operands hold no `var(` | hold line: both exit 0 at HEAD (fix-12, at `ebcc691e`; no overshoot exists). Bite, by `formation-audit/sweeps/hold-line-claim.py` (each line appended to `material.css`, run under `bash -c`, the file restored): `inset: -32px`, `inset: -2rem`, `inset:-2rem`, `inset: 0 -32px`, `top: -10%` and `inset-inline-start: -8px` fail the first span; `inset: calc(-1 * 32px)` and `inset: calc(0px - 32px)` fail the second. The cure's form `inset: calc(var(--radius-ctx) * -1)` and a custom property `--plant-inset: -4px` pass both. Fix-11's form caught only `-<n>px` as the first value (pass 11, FK-01). The file axis (a plant in each of the six files, 6 of 6) is fix-11's reading and `hold-line-scope.py`'s |
| H6-G4 · the ladder still frosts | W-H.2's frost detector rows for the five rungs (`H2/*`, the band-H probe) | every row that passes on W-H.2's tree passes here | hold line on W-H.2's result |
| H6-G5 · the converged witness | the D3 family witness rows the converged split table gives this wave (as W-H.1 G6) | exit 0 | exit 1 (D3's witnesses are RED at HEAD, W-H.1 §2) |

H6-G1's HEAD reading is taken on `.glass-resting`; the wave's first act runs the scene on all five rungs at its base and records each (PLAN §1, the base re-run).

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the five ladder rungs over the line ground, shipped against oversampled | light, dark | Chromium (Playwright WebKit labelled: no `backdrop-filter` headless; real Safari UNMEASURED, OW-3) | `edge-chromium-{theme}.png`, before and after. HEAD at fix-10: light `4259af5e0ece`, dark `73991a2badb0` | H6-G1's rows |
| a `.glass-resting` card with a 16 px radius over the aurora at ceiling 1, corner crops | light, dark | Chromium | the corner crop pair (the uneven band at the arc, before; absent, after) | the corner's luma profile along the arc's normal against the straight edge's |
| value.js's pane cards after its repin, with its `shell.css` seat removed | both | Chromium | value.js's own capture in its addendum (E-6) | its t33 rim absent |

Captures under `.cache/evidence/W-H.6/`.

## 7 · MIGRATION rows

| removed or changed | successor |
|---|---|
| a ladder rung's own `backdrop-filter` on the class's box | the same blur on the converged seat. A consumer that set `backdrop-filter` on a `.glass-*` element to retune it sets the rung's radius token instead |

If the converged seat leaves the class's own `backdrop-filter` in place (an overshoot through a property that does not move the filter), this row is recorded "not needed" with the reading.

## 8 · Ledger rows

Closes T-45 (BUILD, decided here) and L06-08. W-L.7 carries the retirement of value.js's interim seat as a packet line.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the last unbuilt item of the ladder's sampling: W-H.2 composes the blur at the reading element, W-H.5 gives the well no filter of its own, and this wave makes the sample honest at the edge.
- **Wave:** H6-G1 to H6-G5 green in one run.
- **Feature:** a rounded glass card over a bright aurora: the frost is even to the edge and round the corner, with no lit rim.
