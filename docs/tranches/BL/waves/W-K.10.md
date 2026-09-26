# W-K.10 · W-TEXT-ONCE: what text is content · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B, scene `s=text`) |
| ships in | 11.0.0 |
| families | F-84 (all members) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what | row in §3 |
|---|---|---|
| R7-01-04 (MED) | the typewriter holds its phrase three times plus a `\|` text node; find first hits the clipped `sr-only` copy | 1 |
| R7-01-05 (MED) | after page translation the typewriter never paints its final glyph | 1 |
| R7-01-06 (MED) | SortableList rows and the static Chip label are unselectable | 3 |
| R8-01-06 (LOW) | an open tooltip holds its text twice | 2 |
| R8-01-07 (LOW) | `.interactive-item` rows select nothing | 3 |

## 2 · The defect at HEAD

Sources: `typewriter/TypewriterText.vue:4` (the `sr-only tw-accessible` copy), `:11` (the `tw-reserve` copy), `:17` (the `aria-hidden` `tw-visual` layer), `:29` and `:39` (a literal `|` text node for the cursor); `src` holds 0 `translate="no"`. `tooltip/TooltipContent.vue:67-72` (the comment "the rendered text is the announcement") and `:79` (the slot passed through reka's TooltipContent, whose `TooltipContentImpl` renders a second, `VisuallyHidden role="tooltip"` copy that `aria-describedby` resolves to). `sortable-list/styles.css:74-75` (`user-select: none` on the whole `.sortable-item`, while the default `handleSelector` is `[data-sortable-handle]`, `SortableList.vue:22`); `chip/chipVariants.ts:4` (`select-none` in the static base); `styles/utilities/base.css:204` (`user-select: none` on `.interactive-item`); `_shared/menu/rowClass.ts:28-29` (the menu rows state their own `select-none`).

Measured with appendix A (`k10.mjs`): **Chromium 6 rows, 6 FAIL; Playwright WebKit 6 rows, 6 FAIL**.

| gate | Chromium | Playwright WebKit |
|---|---|---|
| K10-G1 copy of the settled typewriter holds the phrase once, no `\|`; the first find hit is the painted layer | **FAIL** copy `"Typewriter says hello world\nTypewriter says hello world \|"` (2 copies); first hit an 88×22 rect in `sr-only tw-accessible` | **FAIL** same (88×21) |
| K10-G2 after a simulated translation (text nodes wrapped in `<font>`), the visual text settles to the phrase | **FAIL** `"Typewriter says hello worly  \| "` after 3.5 s | **FAIL** same |
| K10-G3 an open tooltip: select-all copy holds "Italic · ⌘I" once, `window.find` matches once | **FAIL** 2 copies, 2 matches | **FAIL** same |
| K10-G4 a handle-mode SortableList: 3 of 3 labels copied; a drag across a row body selects text, 0 reorders | **FAIL** 0 labels, selection `""`, order unchanged | **FAIL** same |
| K10-G5 a static Chip label is selectable by double-click | **FAIL** `""`, `user-select: none` | **FAIL** `""` |
| K10-G5 an `.interactive-item` title is selectable by double-click | **FAIL** `""`, `user-select: none` | **FAIL** `""` |
| K10-S static (below) | exit 1 | |

HEAD shots: `cap/head/k10-text-{light,dark}.png` (the fixture's text scene: typewriter, tooltip, SortableList, Chip, interactive row).

## 3 · The cure

1. **The typewriter has one text copy.** `.tw-visual` holds the phrase as its one text node, in flow, not `aria-hidden`; it is the reserve (so W-F.4's extent is its own box) and the find, copy and translation target. While typing, its own glyphs paint `color: transparent` and a `::before { content: attr(data-typed) }` overlay paints the typed prefix; the cursor is `::after { content: "|" }`. Generated content is not copied, found or translated. Once settled the overlay drops and the text node paints itself. The `sr-only tw-accessible` span and the `tw-reserve` copy are deleted. Translation replaces the phrase node inside `.tw-visual`; the overlay reads `data-typed`, which Vue writes as an attribute, so the typed paint never patches a detached node.
2. **The tooltip has one text copy.** Glass's TooltipContent (an unscoped rule on `[data-slot="tooltip-content"] [role="tooltip"]`) sets reka's `VisuallyHidden role="tooltip"` copy to `display: none`. `aria-describedby` still resolves to it (accname computes a referenced node's text even when hidden), so the trigger keeps its description, and the copy leaves copy, find and translation. The comment at `:67-72` is rewritten to say this: the painted plate is what the user sees and copies; the hidden node exists only as the description target.
3. **`user-select: none` only on controls and a lifted row.** `.sortable-item` drops it; `[data-sortable-handle]` and `.sortable-item[data-sortable-lifted]` carry it (when `handleSelector` is null the row is the handle and carries the attribute). The Chip's `select-none` moves from `BASE` to `INTERACTIVE` and the removable mode. `.interactive-item` drops it; the menu rows keep their own (`rowClass.ts:28-29`), and every control recipe that composes `.interactive-item` without stating it gains `select-none` in its own class list (`rg -l 'interactive-item' src` lists them).

## 4 · Files it touches

`src/components/typewriter/TypewriterText.vue` (its scoped style block), `src/components/tooltip/TooltipContent.vue` (the hidden-copy rule in an unscoped style block: the copy is reka's node, which a scoped selector does not reach), `src/components/sortable-list/{SortableList.vue,styles.css}`, `src/components/chip/chipVariants.ts`, `src/styles/utilities/base.css`, and the control recipes listed by `rg -l 'interactive-item' src`. New `tests-visual/wired/text-once.spec.ts` (appendix A).

## 5 · Acceptance gates

Each row is a gate on appendix A's cell of the same id. HEAD readings are §2's.

| id | passes when | HEAD |
|---|---|---|
| K10-G1 | a select-all copy of the settled typewriter holds "Typewriter says hello world" once and no `\|`; the first `window.find` hit is inside `tw-visual` | **FAIL** 2 copies; first hit in `sr-only tw-accessible`, both engines |
| K10-G2 | after the simulated translation, the visual text settles to the phrase within 3.5 s | **FAIL** "Typewriter says hello worly  \| ", both engines |
| K10-G3 | an open tooltip: select-all copy holds "Italic · ⌘I" once and `window.find` matches once | **FAIL** 2 copies, 2 matches, both engines |
| K10-G4 | a handle-mode SortableList: a copy holds 3 of 3 labels; a drag across a row body yields a non-empty selection and the order stays `row-t1,row-t2,row-t3` | **FAIL** 0 labels, selection `""`, both engines |
| K10-G5 (Chip, `.interactive-item`) | a double-click on a static Chip label and on an `.interactive-item` title each select non-empty text | **FAIL** `""` on both, both engines |
| K10-G6, hold line (added with the cure) | the tooltip trigger's AX description equals the phrase | holds at HEAD (`aria-describedby` resolves). Bite: remove the id from the hidden node |
| K10-S (static) | `! rg -q 'tw-accessible' src/components/typewriter && ! rg -q 'text-muted-foreground select-none' src/components/chip/chipVariants.ts` | **exit 1** (`TypewriterText.vue:4`; `chipVariants.ts:4`) |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=text` (typewriter mid-typing and settled, open tooltip, SortableList, Chip, interactive row); demo `/display/typewriter`, `/data/sortable-list`, `/forms/chip`, `/data/infinite-scroll`, at 1440×900 and 390×844.
- **Themes:** light and dark.
- **Engines:** Chromium and Playwright WebKit; real Safari UNMEASURED (OW-3).
- **Paired capture:** HEAD `cap/head/k10-text-{light,dark}.png`; the wave records the same frames. The π claim is that the typewriter paints identically (overlay glyphs where the text node was): the pair's pixel difference over the typewriter box at the settled frame is 0 px at 3:1, and a mid-typing frame shows the same prefix.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| TypewriterText renders `.tw-accessible`, `.tw-reserve` and an `aria-hidden` `.tw-visual` | one `.tw-visual` text node plus generated overlay and cursor | a consumer styling `.tw-accessible` or `.tw-reserve` re-targets `.tw-visual` |
| SortableList rows are unselectable | only the handle and the lifted row are | |
| the static Chip is unselectable | only interactive and removable Chips are | |
| `.interactive-item` sets `user-select: none` | it does not; controls state it | a consumer row using `.interactive-item` as a control adds `select-none` |

## 8 · Ledger rows

Closes F-84 (R7-01-04, R7-01-05, R7-01-06, R8-01-06, R8-01-07). R7-01-05's spill over the SortableList is F-76's absolute-layer clause, closed in W-F.4 (cross-cited, not counted here).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** each phrase is one DOM text node, and only a control or a lifted row refuses selection.
- **Wave:** §2's rows and K10-S green in one run, both engines.
- **Feature:** select-all and copy on `/display/typewriter` and `/data/sortable-list`, then translate the page in Chrome: each phrase copies once and the typewriter settles on its final glyph. One capture after translation.

## Appendix A · `k10.mjs` (lands as `tests-visual/wired/text-once.spec.ts`)

Run against the W-K.1 appendix B harness (scene `s=text`).

```js
// W-K.10 born-RED probe: one DOM text copy per phrase; no-select only on controls (F-84). node k10.mjs [--eng webkit]
import { open, sleep, rectOf, runner, argEng } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k10');
const PHRASE = 'Typewriter says hello world';
// G1 · copying the settled typewriter yields the phrase once, no cursor glyph; the first find hit is the painted glyphs
await safe('K10-G1 typewriter copy', async () => {
  const { browser, page } = await open({ eng, qs: 's=text', settle: 200 });
  await page.waitForFunction(() => (document.querySelector('[data-probe=tw] .tw-visual')?.textContent || '').replace(/\|/g, '').trim() === 'Typewriter says hello world', null, { timeout: 20000 });
  await sleep(300);
  const st = await page.evaluate(() => { const p = document.querySelector('[data-probe=tw]'); getSelection().selectAllChildren(p); const copy = getSelection().toString(); getSelection().removeAllRanges(); const f = window.find('hello world'); const rg = f ? getSelection().getRangeAt(0) : null; const r = rg?.getBoundingClientRect(); const host = rg ? (rg.startContainer.nodeType === 3 ? rg.startContainer.parentElement : rg.startContainer).closest('.tw-accessible, .tw-reserve, .tw-visual') : null; return { copy, found: f, hit: r ? [Math.round(r.width), Math.round(r.height)] : null, hitLayer: host?.className || null }; });
  const once = st.copy.split('hello world').length - 1;
  row('K10-G1 copy holds the phrase once, no |; first find hit is painted', once === 1 && !st.copy.includes('|') && st.hit && /tw-visual/.test(st.hitLayer || ''), { copy: JSON.stringify(st.copy), once, hit: st.hit, hitLayer: st.hitLayer });
  await browser.close();
});
// G2 · after a simulated page translation (text nodes wrapped in <font>) mid-typing, the settled visual text is the phrase
await safe('K10-G2 translate', async () => {
  const { browser, page } = await open({ eng, qs: 's=text', settle: 200 });
  await page.evaluate(() => { const root = document.querySelector('[data-probe=tw]'); const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const ns = []; let n; while ((n = w.nextNode())) ns.push(n); for (const t of ns) { if (!t.textContent) continue; const f = document.createElement('font'); f.textContent = t.textContent; t.replaceWith(f); } });
  await sleep(3500);
  const st = await page.evaluate(() => { const v = document.querySelector('[data-probe=tw] .tw-visual'); return { visual: v?.textContent ?? null }; });
  const vis = (st.visual || '').replace(/\|/g, '').trim();
  row('K10-G2 translated typewriter settles to the phrase', vis === 'Typewriter says hello world', st);
  await browser.close();
});
// G3 · an open tooltip holds its phrase once: select-all copy and window.find see one copy, inside the plate
await safe('K10-G3 tooltip once', async () => {
  const { browser, page } = await open({ eng, qs: 's=text', settle: 800 });
  const st = await page.evaluate(() => { getSelection().selectAllChildren(document.body); const copy = getSelection().toString(); getSelection().removeAllRanges(); let n = 0; const hits = []; while (window.find('Italic · ⌘I', false, false, false) && n < 5) { n++; const r = getSelection().getRangeAt(0).getBoundingClientRect(); hits.push([Math.round(r.width), Math.round(r.height)]); } return { copies: copy.split('Italic · ⌘I').length - 1, finds: n, hits }; });
  row('K10-G3 tooltip phrase: 1 copy, 1 find match', st.copies === 1 && st.finds === 1, st);
  await browser.close();
});
// G4 · a handle-mode SortableList: select-all copy holds every row label; a drag across a row body selects text, 0 reorders
await safe('K10-G4 sortable text', async () => {
  const { browser, page } = await open({ eng, qs: 's=text', settle: 800 });
  const copy = await page.evaluate(() => { getSelection().selectAllChildren(document.querySelector('[data-probe=sort]')); const c = getSelection().toString(); getSelection().removeAllRanges(); return c; });
  const labels = ['Write the brief', 'Review the gates', 'Ship the minor'].filter((l) => copy.includes(l)).length;
  const r = await rectOf(page, '[data-probe=row-t2]');
  await page.mouse.move(r.l + 2, r.y); await page.mouse.down(); await page.mouse.move(r.r - 2, r.y, { steps: 8 }); await page.mouse.up(); await sleep(300);
  const sel = await page.evaluate(() => getSelection().toString());
  const order = await page.evaluate(() => [...document.querySelectorAll('[data-probe^=row-]')].map((e) => e.dataset.probe).join(','));
  row('K10-G4 SortableList rows: 3 of 3 labels copied, drag selects text, 0 reorders', labels === 3 && sel.length > 3 && order === 'row-t1,row-t2,row-t3', { labels, selected: sel, order });
  await browser.close();
});
// G5 · the static Chip label and an .interactive-item title are selectable by a double-click
for (const [p, word] of [['chip', 'Static'], ['ii', 'Interactive']]) await safe(`K10-G5 ${p}`, async () => {
  const { browser, page } = await open({ eng, qs: 's=text', settle: 800 });
  const r = await rectOf(page, `[data-probe=${p}]`);
  await page.mouse.dblclick(r.l + 14, r.y); await sleep(200);
  const st = await page.evaluate((p) => ({ sel: getSelection().toString(), userSelect: getComputedStyle(document.querySelector(`[data-probe=${p}]`)).userSelect }), p);
  row(`K10-G5 ${p} text selectable by double-click`, st.sel.trim().length > 0, st);
  await browser.close();
});
done(eng);
```
