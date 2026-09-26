# W-K.11 · an option's focus model is its listbox's · 11.0.0

| field | value |
|---|---|
| seat | formation fix seat 2 (`formation-audit/fix-2.md`, FA-21); the item, its gate and its cure move here from W-K.5 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | W-K.5's readings at `9866d229` (`src` = published 10.1.0) and fix-2's at `183e021a` |
| ships in | 11.0.0 |
| families | F-40 split: C-9, a disease row (BK FINAL §7 carry; open at the 9.0.0 and 10.0.0 closes, LEDGER:231), with L01a-42, L04-F09 and L08-12 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| C-9 | the 12-tab-stop question at Card (`ledger/census-carries-recap.md:34`): decided here, BUILD |
| L01a-42, L04-F09, L08-12 (MED) | options take tab stops beside an `aria-activedescendant` listbox; a unit test pins the defect |
| UIA-F-43 | Card drops the consumer's `role` and `tabindex` (the same binding order; moved here from W-L.2's mechanism set) |

## 2 · The defect at HEAD

`src/components/card/Card.vue:57,66-67`: `v-bind="$attrs"` binds first, then `:role="selectable ? 'option' : undefined"` and `:tabindex="selectable ? 0 : undefined"`. A `selected` Card is an option with a tab stop, and a consumer's `role` and `tabindex` lose to the component's `undefined`. `tests/composables/search/search-contracts.test.ts:186-188` pins `tabindex "0"` on every option of the `/data/search` listbox.

| gate | Chromium | Playwright WebKit | source |
|---|---|---|---|
| K11-G1 tabbable options in an activedescendant listbox (W-K.5 appendix A, cell G1) | **FAIL** 12 of 12; Tab walks `option, option, option` (reka 2.10.5 and 2.10.1) | **FAIL** 12 | W-K.5 §2 |
| K11-G2 `<Card role="button" tabindex="0">` keeps both attributes | **FAIL** `role` null, `tabindex` null | **FAIL** same | fix-2's probe, scene `mcard`, `183e021a` |

## 3 · The ruling and the cure

**Ruling (C-9): BUILD.** An option's focusability belongs to the widget that owns the options, not to the option. In an `aria-activedescendant` listbox the options take no tab stop; in a roving list the list sets `tabindex` on the current option.

1. Card's option contract (`selected` present) sets `role="option"` and `aria-selected` and no `tabindex`. `$attrs` binds last, so a consumer's `role` and a roving list's `tabindex` land.
2. The pin at `search-contracts.test.ts:186-188` inverts: every option's `tabindex` is absent.

## 4 · Files it touches

`src/components/card/Card.vue:57-68`, `tests/composables/search/search-contracts.test.ts:186-188`, new `tests-visual/wired/current-row.spec.ts` with W-K.5 appendix A's G1 cell (this wave is the spec's lander; W-K.5 waits on it and adds its G2 and G3 cells, PLAN §5 notes), `src/components/card/README.md` (the option contract).

## 5 · Acceptance gates

| id | gate | passes when | HEAD |
|---|---|---|---|
| K11-G1 | W-K.5 appendix A, cell G1, both engines | 0 of 12 options tabbable; Tab leaves the listbox | **FAIL** 12 of 12 |
| K11-G2 | the `mcard` cell: `<Card role="button" tabindex="0">` | `role="button"`, `tabindex="0"`, both engines | **FAIL** null, null |
| K11-S | `! grep -q 'toBe("0")' tests/composables/search/search-contracts.test.ts` | exit 0 | **exit 1** (the pin at `:187`) |

## 6 · π and DELTA obligations

No paint changes. The wave record carries the Tab trail on `/data/search` before and after (three presses: `option, option, option` → out of the listbox in one), both engines; real Safari UNMEASURED (OW-3). Records under `.cache/evidence/W-K.11/`.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `<Card selected>` adds `tabindex="0"` | no `tabindex`; `$attrs` wins | a consumer that relied on the implicit tab stop in a roving list sets `tabindex` itself |
| `<Card selected role="…" tabindex="…">` dropped the consumer's values | the consumer's values land | |

## 8 · Ledger rows

Closes C-9 (BUILD, decided here), L01a-42, L04-F09, L08-12 and UIA-F-43.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** W-K.5's one current-row channel reads this focus model; W-K.4's ring follows it.
- **Wave:** K11-G1, K11-G2 and K11-S green in one run, both engines.
- **Feature:** on `/data/search`, type, ArrowDown through results, and Tab out in one press.
