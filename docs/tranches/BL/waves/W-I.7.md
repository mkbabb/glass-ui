# W-I.7 · the dock run's box (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item and its three gates move here from W-E.2 (§3 item 9, E2-G14..G16) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `183e021a` (fix-2 re-ran the three gates) |
| ships in | 11.0.0 |
| loop | D2 dock: `dock/styles/run.css` is D2's route's to own. This wave lands after D2's gate and before W-I.1 (PLAN §5, fix-3): the box fix goes on the run as it stands, and W-I.1's converged carrier keeps I7-G1..G3 true on its own rules (§3 item 3) |
| families | F-21 split: C-8, a disease row (BK FINAL §7 carry, open at two closes, LEDGER `C-8`), with R2-02-04 and R3-02-09, the same defect class in `run.css` |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| C-8 | the layer contract's one `content-box`: `box-sizing: content-box` at `dock/styles/run.css:250`, the only one in `src` CSS. Decided here, BUILD |
| R2-02-04 (HIGH) | the dock-run seat rules set `transition: inline-size …` (`run.css:353-367`, specificity ≥ (0,2,0)) over `.dock-icon-button`'s own list (`icon-button.css:60-71`), so hover and press snap (`audit/REGISTRY.md:462`) |
| R3-02-09 (MED) | the run's ring reserve pads its cross axis only (`run.css:250-252`, vertical arm `:310-311`), so the run, a scroll container on the other axis, clips the focus ring of its first and last seat (`REGISTRY.md:471`) |

## 2 · The defect at HEAD

Read at `183e021a`: `run.css:357` and `:366` are `transition: inline-size var(--spring-dock-duration) var(--spring-dock);`, and the vertical dock's two seat rules at `:376` and `:384` are the same with `block-size` (read at `2967ce43`, fix-15); `run.css:250` is `box-sizing: content-box;` (with `:302` a comment naming it); `run.css:251` pads the block axis with `var(--dock-ring-reserve)`.

## 3 · The ruling and the cure

**Ruling (C-8): BUILD.** The run's box is `border-box` like every other box in the layer contract.

1. The seat's size transition appends to the control's own list (`transition: var(--icon-button-transition), inline-size …`, and `block-size …` on a vertical dock), so hover and press keep their motion on both axes.
2. The ring reserve moves out of padding into `outline-offset` on the seats, so the run's box is `border-box` and the first and last seats' rings are whole on both axes.
3. Both land in the converged run's patch; if D2's carrier replaces the run's rules, the same three invariants hold on the new rules.

## 4 · Files it touches

`src/components/dock/styles/run.css:250-252`, `:302`, `:310-311`, `:353-385`; `src/components/dock/styles/controls/icon-button.css:60-71` (read, not changed).

## 5 · Acceptance gates

| id | gate | passes when | HEAD (fix-2, `183e021a`) |
|---|---|---|---|
| I7-G1 · seat transition | `! rg -niU --pcre2 '(?<![\w-])transition(?:-property)?\s*:(?!\s*var\(--icon-button-transition\))[^;{}]*?(?<![\w-])(?:(?:min-\|max-)?(?:inline-size\|width\|block-size\|height)\|flex(?:-basis)?)(?![\w-])' src/components/dock/styles/run.css` | exit 0: every `transition` or `transition-property` declaration in `run.css` that names a seat size anywhere in its list opens with `var(--icon-button-transition)`, read as a declaration (value on the next line, the size after another member), not a line (fix-16, pass 15 FO-01: `src` writes both forms, `dock/styles/layer-group.css:259-261,354-355`). As before, no `transition` or `transition-property` in `run.css` opens on a seat size, on either axis (`inline-size`, `width`, `block-size`, `height`, their `min-`/`max-` forms, `flex`, `flex-basis`); §3 item 1's appended form passes on both axes (fix-15, pass 14 FN-05: the vertical dock's seat transitions at `run.css:376,384` replace the control's list as `:357,366` do) | **exit 1** (fix-16, `b58c5357`, the span as re-written: 4 lines, `run.css:357,366,376,384`). On the cured base, a seat transition with its value on the next line, a list that opens on `background` and names `inline-size` second, and `transition-property: opacity, inline-size` each exit 1; §3 item 1's appended form exits 0. Before fix-16: **exit 1** (fix-15, `2967ce43`, the span as widened: 4 lines, `run.css:357,366,376,384`). On the cured base, each size property above exits 1, and `transition: var(--icon-button-transition), block-size …` exits 0; the spellings are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry, whose SIBLING arm lists them from `src`. Before fix-15: **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `run.css:357`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`run.css:357,366`) |
| I7-G2 · C-8 | `test "$(rg -c 'box-sizing:\s*content-box\|(^\|[^-\w])box-content([^-\w]\|$)' src \| wc -l)" -eq 0` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `run.css:250`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`run.css:250`) |
| I7-G3 · ring reserve | `! grep -qE 'padding[a-z-]*: *[^;]*--dock-ring-reserve' src/components/dock/styles/run.css` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `run.css:251`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`run.css:251`) |
| I7-G4 · the rings are whole | the D2 harness rows for the first and last seats' focus rings, D and DK (the rows W-I.1 G7 also reads), run by this wave on its own candidate (`$H` = `scripts/loops/dock/harness/`, PLAN §5 orders this wave after W-C.1), both engines | PASS | **FAIL**, inside W-I.1 G7's 6/18 Chromium at HEAD. W-I.1 lands after this wave, so its G7 holds these rows rather than building their cure |

## 6 · π and DELTA obligations

The first and last seats focused in an overflowing run, light and dark, Chromium (Playwright WebKit crashes on GlassDock, recorded; real Safari UNMEASURED, OW-3): HEAD with the outer ring columns cut, the wave with the rings whole. A hover on a run seat: HEAD snaps, the wave eases, on a horizontal GlassDock and on a vertical one (`run.css:376,384`, fix-15, pass 14 FN-05: the vertical seat's `block-size` transition replaced the control's list too). Captures under `.cache/evidence/W-I.7/`.

## 7 · MIGRATION rows

None: internal rules; no published name changes.

## 8 · Ledger rows

Closes C-8 (BUILD, decided here), R2-02-04 and R3-02-09.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** W-E.2's layer contract (a shared rule never overrides a component's own declaration) holds inside the dock.
- **Wave:** I7-G1..G4 green in one run.
- **Feature:** tab through an overflowing dock: every seat's ring is whole, and hover eases.
