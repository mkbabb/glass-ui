# W-K.5 · One current-row channel · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B), reka 2.10.5 and 2.10.1 builds, Chromium and Playwright WebKit |
| ships in | 11.0.0 |
| families | F-40 remainder and its inbound rows. The option focus model (C-9, L01a-42, L04-F09, L08-12) is W-K.11's, a disease row's own wave (fix-2, FA-21) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| R4-01-14 (MED) | a resting pointer's `:hover` fill and the keyboard highlight light two rows |
| #81 W-PICKER (the two-lit-rows part) | census-register-b.md:66 |
| inbound, two lit rows | UIA-V-222, UIA-V-271, UIA-F-126, UIA-KF-247 |
| inbound, pointer-origin focus paints the keyboard ring | UIA-F-58, UIA-V-221, UIA-KF-112, UIA-V-472, UIA-V-517, UIA-KF-253, A2-KE-L3-17 |

## 2 · The defect at HEAD

| site | HEAD |
|---|---|
| `src/components/card/Card.vue:57,66-67` | `v-bind="$attrs"` first, then `:tabindex="selectable ? 0 : undefined"`: a `selected` Card is an option with a tab stop, and a consumer's `tabindex` loses |
| `tests/composables/search/search-contracts.test.ts:186-188` | pins `tabindex "0"` on every option of the `/data/search` listbox, beside the field's `aria-activedescendant` |
| `src/components/_shared/menu/menu.css:44-54` and `:66-76` | the `[data-highlighted]` rung and the `:hover` rung paint the same `background: var(--menu-row-bg)`; reka moves the highlight with the pointer but not the `:hover` state |
| the Select trigger after a pointer pick | reka returns focus programmatically; the engine's focus-visible heuristic marks it, so the keyboard ring paints after a mouse action |

Measured with appendix A (`node k5.mjs`):

| gate | Chromium 2.10.5 | Chromium 2.10.1 | Playwright WebKit |
|---|---|---|---|
| K5-G1 tabbable options in an activedescendant listbox | **FAIL** 12 of 12; Tab walks `option, option, option` | **FAIL** 12 | **FAIL** 12 |
| K5-G2 painted rows after two ArrowDowns under a resting pointer | **FAIL** 2 (`mi1[hover]`, `mi3[highlighted]`, both `…/ 0.1`) | **FAIL** 2 | **FAIL** 2 |
| K5-G3 menu trigger after a mouse pick | PASS (control) | PASS | PASS |
| K5-G3 Select trigger after a mouse pick | **FAIL** `:focus-visible` true | **FAIL** | not measured: the Select trigger click times out in Playwright WebKit (recorded) |
| K5-G3 Dialog auto-focus after a pointer open | PASS (control) | PASS | PASS |

The menu trigger and the pointer-opened Dialog do not paint the ring at HEAD; UIA-KF-253 and A2-KE-L3-17 (the ring on Cancel/Close at a pointer open) are cured at HEAD in the fixture and stay as hold lines.

## 3 · The cure

1. **An option's focusability** is W-K.11's (Card's option contract and the search pin).
2. **The highlight is the only current-row paint.** The menu row's `:hover` rung (`menu.css:66-76`) keeps its lift (`translate`) and drops `background` and `color`. reka's `[data-highlighted]` already follows the pointer, so a pointer still lights the row it rests on until the keyboard moves the highlight.
3. **Pointer-origin focus paints no keyboard ring.** One input-modality stamp: a `pointerdown` in the capture phase sets `data-input-modality="pointer"` on the root element, a `keydown` sets `"keyboard"`. The house ring (W-K.4) paints on `:focus-visible` only under `:root:not([data-input-modality="pointer"])`. The stamp lives in `src/composables/dom/modality.ts` beside W-K.1's root module and is installed once by the layer stack. There is no second rule for engines that support `FocusOptions.focusVisible`; the stamp is the one mechanism.

## 4 · Files it touches

`src/components/_shared/menu/menu.css`, `src/composables/dom/modality.ts` (new), `src/components/_shared/overlay/layer.ts` (installs it), `src/styles/utilities/base.css` (the ring selector reads it; W-K.4 then points every register at that ring). `tests-visual/wired/current-row.spec.ts` gains appendix A's G2 and G3 cells; W-K.11 lands the spec with the G1 cell (PLAN §5 notes).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| K5-G2 | appendix A G2, both engines | exactly 1 painted row, the highlighted one | **FAIL** 2 |
| K5-G3 | appendix A G3, three cells | none of the three is `:focus-visible` after a pointer action | Select **FAIL** (Chromium); menu and Dialog PASS (controls; bite: removing the modality stamp from the ring selector turns the Select cell red after the cure) |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=menu` (two lit rows), `?s=listbox`; demo `/containers/dropdown-menu`, `/data/search`, `/forms/select` at 1440×900.
- **Themes:** light and dark.
- **Engines:** Chromium and Playwright WebKit; real Safari UNMEASURED (OW-3).
- **Paired capture:** HEAD shots `cap/head/k5-menu-two-rows-{light,dark}.png` (Item 1 under the pointer and Item 3 highlighted, both filled; π reading is G2's `lit` list). The wave records the same frame with one filled row.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| menu row `:hover` paints the row fill | `:hover` lifts only; the highlight paints | |
| the keyboard ring paints after a pointer pick | it paints only when the last input was a key | |

## 8 · Ledger rows

Closes F-40's remainder (R4-01-14), #81's two-lit-rows part, and the inbound rows UIA-V-222, -271, UIA-F-126, UIA-KF-247, UIA-F-58, UIA-V-221, UIA-KF-112, UIA-V-472, UIA-V-517, UIA-KF-253 (hold line), A2-KE-L3-17 (hold line).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one current item per widget: its focus model is the listbox's, its paint is the highlight, its ring follows the input that moved it.
- **Wave:** K5-G2 and K5-G3 green in one run, both engines.
- **Feature:** on `/data/search`, type, ArrowDown through results, Tab out in one press; in a menu, rest the pointer and use the keys: one lit row. One frame strip.

## Appendix A · `k5.mjs` (lands as `tests-visual/wired/current-row.spec.ts`)

```js
// W-K.5 born-RED probe: one current-row channel (F-40). node k5.mjs [--eng webkit]
import { open, sleep, rectOf, runner, argEng } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k5');
// G1 · inside an aria-activedescendant listbox, option Cards take no tab stop (C-9: HEAD 12 tabbable options)
await safe('K5-G1 listbox options', async () => {
  const { browser, page } = await open({ eng, qs: 's=listbox' });
  const m = await page.evaluate(() => { const o = [...document.querySelectorAll('[data-probe=lb] [role=option]')]; return { options: o.length, tabbable: o.filter((e) => e.tabIndex >= 0 && e.getAttribute('tabindex') !== null).length }; });
  const trail = []; await page.focus('[data-probe=lbin]'); for (let i = 0; i < 3; i++) { await page.keyboard.press('Tab'); trail.push(await page.evaluate(() => document.activeElement?.getAttribute('role') || document.activeElement?.tagName)); }
  row('K5-G1 0 tabbable options in an activedescendant listbox', m.tabbable === 0, { ...m, tabTrail: trail });
  await browser.close();
});
// G2 · a menu under a resting pointer: after two ArrowDowns exactly one row is painted as current
await safe('K5-G2 one lit row', async () => {
  const { browser, page } = await open({ eng, qs: 's=menu' });
  await page.focus('[data-probe=mtrig]'); await page.keyboard.press('Enter'); await sleep(600);
  const r = await rectOf(page, '[data-probe=mi1]'); await page.mouse.move(r.x, r.y); await sleep(250);
  await page.keyboard.press('ArrowDown'); await sleep(120); await page.keyboard.press('ArrowDown'); await sleep(350);
  const m = await page.evaluate(() => { const rows = [...document.querySelectorAll('[data-probe=menuc] [role=menuitem]')]; return rows.map((e) => ({ p: e.dataset.probe, bg: getComputedStyle(e).backgroundColor, hl: e.hasAttribute('data-highlighted'), hover: e.matches(':hover') })); });
  const lit = m.filter((x) => !/rgba\(0, 0, 0, 0\)|transparent/.test(x.bg));
  row('K5-G2 exactly one painted row after keyboard moves under a resting pointer', lit.length === 1, { lit: lit.map((x) => `${x.p}${x.hl ? '[hl]' : ''}${x.hover ? '[hover]' : ''} ${x.bg}`) });
  await browser.close();
});
// G3 · pointer-origin focus does not paint the keyboard ring: after a mouse pick in a menu and in a Select the trigger is
// not :focus-visible; after a pointer open of a Dialog the auto-focused control is not :focus-visible (UIA-KF-253)
for (const [scene, trig, item, label] of [['menu', 'mtrig', '[data-probe=mi2]', 'menu trigger after a mouse pick'], ['names', 'strig', '[data-probe=selc] [role=option]:nth-child(2)', 'Select trigger after a mouse pick'], ['dlgfocus', 'trig', null, 'Dialog auto-focus after a pointer open']]) await safe(`K5-G3 ${label}`, async () => {
  const { browser, page } = await open({ eng, qs: `s=${scene}` });
  await page.click(`[data-probe=${trig}]`); await sleep(700);
  if (item) { const r = await rectOf(page, item); await page.mouse.click(r.x, r.y); await sleep(600); }
  const m = await page.evaluate(() => { const a = document.activeElement; return { active: a?.dataset?.probe || a?.dataset?.slot || a?.tagName, focusVisible: a?.matches(':focus-visible') ?? null }; });
  row(`K5-G3 ${label}: not :focus-visible`, m.focusVisible === false, m);
  await browser.close();
});
done(eng);
```
