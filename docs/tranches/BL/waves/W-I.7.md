# W-I.7 · the dock run's box (loop D2) · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item and its three gates move here from W-E.2 (§3 item 9, E2-G14..G16) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `183e021a` (fix-2 re-ran the three gates) |
| ships in | 11.0.0 |
| loop | D2 dock: `dock/styles/run.css` is D2's route's to own; this wave lands the box fix in the converged run |
| families | F-21 split: C-8, a disease row (BK FINAL §7 carry, open at two closes, LEDGER:230), with R2-02-04 and R3-02-09, the same defect class in `run.css` |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| C-8 | the layer contract's one `content-box`: `box-sizing: content-box` at `dock/styles/run.css:250`, the only one in `src` CSS. Decided here, BUILD |
| R2-02-04 (HIGH) | the dock-run seat rules set `transition: inline-size …` (`run.css:353-367`, specificity ≥ (0,2,0)) over `.dock-icon-button`'s own list (`icon-button.css:60-71`), so hover and press snap (`audit/REGISTRY.md:462`) |
| R3-02-09 (MED) | the run's ring reserve pads its cross axis only (`run.css:250-252`, vertical arm `:310-311`), so the run, a scroll container on the other axis, clips the focus ring of its first and last seat (`REGISTRY.md:471`) |

## 2 · The defect at HEAD

Read at `183e021a`: `run.css:357` and `:366` are `transition: inline-size var(--spring-dock-duration) var(--spring-dock);`; `run.css:250` is `box-sizing: content-box;` (with `:302` a comment naming it); `run.css:251` pads the block axis with `var(--dock-ring-reserve)`.

## 3 · The ruling and the cure

**Ruling (C-8): BUILD.** The run's box is `border-box` like every other box in the layer contract.

1. The seat's width transition appends to the control's own list (`transition: var(--icon-button-transition), inline-size …`), so hover and press keep their motion.
2. The ring reserve moves out of padding into `outline-offset` on the seats, so the run's box is `border-box` and the first and last seats' rings are whole on both axes.
3. Both land in the converged run's patch; if D2's carrier replaces the run's rules, the same three invariants hold on the new rules.

## 4 · Files it touches

`src/components/dock/styles/run.css:250-252`, `:302`, `:310-311`, `:353-367`; `src/components/dock/styles/controls/icon-button.css:60-71` (read, not changed).

## 5 · Acceptance gates

| id | gate | passes when | HEAD (fix-2, `183e021a`) |
|---|---|---|---|
| I7-G1 · seat transition | `! grep -qnE '^\s*transition: inline-size' src/components/dock/styles/run.css` | exit 0 | **exit 1** (`run.css:357,366`) |
| I7-G2 · C-8 | `test "$(rg -c 'box-sizing:\s*content-box' src \| wc -l)" -eq 0` | exit 0 | **exit 1** (`run.css:250`) |
| I7-G3 · ring reserve | `! grep -q 'padding-block: var(--dock-ring-reserve)' src/components/dock/styles/run.css` | exit 0 | **exit 1** (`run.css:251`) |
| I7-G4 · the rings are whole | W-I.1 G7's edge rows (the first and last seats' focus rings, D and DK), both engines | PASS | inside W-I.1 G7's **FAIL** (6/18 Chromium) |

## 6 · π and DELTA obligations

The first and last seats focused in an overflowing run, light and dark, Chromium (Playwright WebKit crashes on GlassDock, recorded; real Safari UNMEASURED, OW-3): HEAD with the outer ring columns cut, the wave with the rings whole. A hover on a run seat: HEAD snaps, the wave eases. Captures under `.cache/evidence/W-I.7/`.

## 7 · MIGRATION rows

None: internal rules; no published name changes.

## 8 · Ledger rows

Closes C-8 (BUILD, decided here), R2-02-04 and R3-02-09.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** W-E.2's layer contract (a shared rule never overrides a component's own declaration) holds inside the dock.
- **Wave:** I7-G1..G4 green in one run.
- **Feature:** tab through an overflowing dock: every seat's ring is whole, and hover eases.
