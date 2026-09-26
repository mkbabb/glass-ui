# W-K.3 · W-FOCUS-LIFECYCLE: focus moves on the logical open and close · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B), reka 2.10.5 and 2.10.1 builds, Chromium and Playwright WebKit |
| ships in | 11.0.0 |
| families | F-38 (all members) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L08-02 (HIGH) | the trapped FocusScope recaptures the close handoff; the unit test only checks the call |
| R2-04-01 (HIGH) | re-entrant focus in the trapped exit window lands a Tab on "Skip to content" |
| R4-01-09 (HIGH) | a menu or Popover reopened in its exit window never moves focus in |
| R4-01-10 (HIGH) | a double-click on a menu trigger leaves an open modal menu with focus on BODY |
| R4-01-11 (MED) | the Dialog's reopening Enter at +30..+120 ms is lost |
| R5-01-06 (MED) | a restored page keeps a modal layer open with focus on BODY |
| UIA-F-148 (inbound) | a controlled Dialog with no trigger does not restore focus |
| UIA-KF-239 (inbound) | a live-behind sheet takes focus on mount |
| UIA-KF-150 (inbound) | a pointer-opened Select leaves focus on the trigger |

## 2 · The defect at HEAD

Focus is placed as a mount side effect (reka's FocusScope auto-focus) and handed back by a watch on the root's `open` (`dialog/DialogContent.vue:133-141`, `sheet/SheetContent.vue:255-263`), while the library holds content mounted through its exit. reka's trapped scope exempts `relatedTarget === null` (`FocusScope.js:66`). `src` holds 0 `pageshow` or `persisted` reads.

Measured with appendix A (`node k3.mjs`), 16 rows per run:

| gate | Chromium 2.10.5 | Chromium 2.10.1 | Playwright WebKit |
|---|---|---|---|
| K3-G1 Dialog close: no BODY frame, ends on trigger | PASS (0 of 111 frames) | PASS | PASS |
| K3-G2 Tab 100 ms after Escape lands on the successor | PASS | PASS | **FAIL** (`BODY`) |
| K3-G3 Dialog reopen at +30 and +120 ms | PASS, PASS | PASS, PASS | PASS, PASS |
| K3-G4 menu double-click | **FAIL**: open, focus `BODY`, ArrowDown highlights nothing | **FAIL** | PASS (menu closed, focus on trigger) |
| K3-G5 controlled Dialog returns focus to its opener | PASS | PASS | PASS |
| K3-G6 restore with a menu open | **FAIL**: focus `BODY`, highlight stays `mi1` | **FAIL** | **FAIL** |
| K3-G7 menu and Popover reopen at +30 and +80 ms | **FAIL** 4 of 4: settles closed, focus on the trigger | **FAIL** 4 of 4 | **FAIL** 4 of 4 |
| K3-G8 four Sheet sides and a mouse-opened Dialog | PASS 5 of 5 | PASS 5 of 5 | PASS 5 of 5 |

**Cured at HEAD, with evidence.** The Dialog and Sheet close handoff no longer strands focus in Chromium: 0 BODY frames across the Dialog (keyboard and mouse opens) and all four Sheet sides on both reka builds, and the reopening Enter at +30 and +120 ms lands inside (G1, G3, G5, G8). R2-04-01 and R4-01-11 are therefore cured in Chromium; R2-04-01 stands in Playwright WebKit (G2). UIA-F-148 is cured at HEAD (G5). These rows stay as hold lines.

**bfcache.** Headless Chromium and Playwright WebKit never restore from the bfcache (measured with `xbf.mjs`: navigation type `back_forward`, page state reset, both engines). G6 therefore clears focus as the engine does on a restore (R5-01-06 measured it headed) and dispatches `pageshow` with `persisted: true`, which is the event the library must answer. A headed real-bfcache cell is owed to the executing seat (the W-A.4 GPU leg runs headed).

UIA-KF-239 and UIA-KF-150 were not driven here. KF-239 (the live-behind sheet) is a mount-time focus move, which the cure deletes; KF-150's pointer-open leg is K5-G3's Select cell (W-K.5).

## 3 · The cure

The focus lifecycle becomes a leg of the one layer stack (`_shared/overlay/layer.ts`, W-E.4):

1. **Open edge.** On every logical `false → true` edge of a layer, including one that arrives while the content is still mounted in its exit, the layer records `opener = deepActiveElement()` (W-K.1) and moves focus into the content (the `autofocus` target, else the first tabbable) once the content is interactive. reka's mount-time auto-focus is prevented (`@open-auto-focus.prevent` at every content seam), so there is one owner of the open move. A non-modal, live-behind layer (the detented Sheet at its lowest rung, KF-239) takes no focus on open.
2. **Close edge.** On the logical `true → false` edge the layer releases its trap first (the Tab handler from W-K.1 acts only for an open layer), then moves focus to `opener` if it is still connected, else to the trigger, else to the layer below. `DialogContent`'s and `SheetContent`'s `flush: "sync"` watches (`:133-141`, `:255-263`) are deleted. reka's close auto-focus is prevented at every seam.
3. **Blur guard.** While a modal layer is open, a `focusout` from its content with `relatedTarget === null` re-seats focus on the content's last focused descendant (the double-click case).
4. **Restore.** One `pageshow` listener in the stack: when `persisted` is true and a modal layer is open, focus is re-seated on that layer's last focused descendant.
5. **The unit pin.** `tests/components/dialog/dialog-focus-return.test.ts:9-13,87` checks that `focus()` was called; it is replaced by appendix A's timeline, which reads `activeElement` per frame.

## 4 · Files it touches

`src/components/_shared/overlay/layer.ts` (the focus leg), `_shared/overlay/content.ts` (the auto-focus prevention at the seam), `src/components/dialog/DialogContent.vue`, `src/components/sheet/SheetContent.vue`, `src/components/popover/PopoverContent.vue`, `src/components/menu/DropdownMenuContent.vue`, `src/components/select/SelectContent.vue`, `src/components/expandable-container/ExpandableContainer.vue`; `tests/components/dialog/dialog-focus-return.test.ts` (deleted, replaced by the wired spec). New `tests-visual/wired/focus-lifecycle.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| K3-G1, G3, G5, G8 (hold lines) | appendix A | as stated in each row | PASS at HEAD, both engines. Bite: a planted `setTimeout(() => document.body.focus(), 0)` in the stack's close edge turns G1 and G8 red |
| K3-G2 | appendix A G2, both engines | the Tab lands on `after` | Chromium PASS; **WebKit FAIL** (`BODY`) |
| K3-G4 | appendix A G4, both engines | menu closed, or open with focus inside and ArrowDown highlighting | **Chromium FAIL** (open, `BODY`); WebKit PASS |
| K3-G6 | appendix A G6, both engines | focus inside the open menu and ArrowDown moves the highlight | **FAIL** both engines |
| K3-G7 | appendix A G7, 4 cells, both engines | open with focus inside | **FAIL** 4 of 4, both engines |

## 6 · π and DELTA obligations

No paint claim. The feature capture below is a frame strip with the `activeElement` log; no π reading applies.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| overlay content takes focus when it mounts | it takes focus on the logical open, including a reopen during its exit | a consumer's `@open-auto-focus` handler still runs and may `preventDefault` |
| a detented Sheet at its lowest rung takes focus on mount | a live-behind layer takes no focus on open | |

No public API is removed.

## 8 · Ledger rows

Closes F-38 (L08-02, R2-04-01, R4-01-09, -10, -11, R5-01-06) and the inbound rows UIA-F-148 (cured at HEAD, hold line), UIA-KF-239, UIA-KF-150 (its pointer-open leg with W-K.5's K5-G3).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one owner for an overlay's focus, the layer stack, beside its z, host, dismissal and outside (W-E.4).
- **Wave:** K3-G1..G8 green in one run, both engines.
- **Feature:** open a menu, Escape, Enter at +30 ms, ArrowDown, Enter: the item fires and focus returns to the trigger; the same on a Popover and a Dialog. One frame strip with the `activeElement` log.

## Appendix A · `k3.mjs` (lands as `tests-visual/wired/focus-lifecycle.spec.ts`)

```js
// W-K.3 born-RED probe: focus follows the logical open and close (F-38). node k3.mjs [--eng webkit]
import { open, sleep, rectOf, runner, argEng } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k3');
const sampler = () => { window.__trail = []; const t0 = performance.now(); const tick = () => { const a = document.activeElement; window.__trail.push([Math.round(performance.now() - t0), a?.dataset?.probe || a?.dataset?.slot || a?.tagName]); if (performance.now() - t0 < 1200) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
// G1 · after Escape, activeElement is never BODY through the exit window, and it lands on the trigger
await safe('K3-G1 close handoff', async () => {
  const { browser, page } = await open({ eng, qs: 's=dlgfocus' });
  await page.focus('[data-probe=trig]'); await page.keyboard.press('Enter'); await sleep(700);
  await page.evaluate(sampler); await page.keyboard.press('Escape'); await sleep(1300);
  const trail = await page.evaluate(() => window.__trail);
  const body = trail.filter(([, a]) => a === 'BODY');
  row('K3-G1 no BODY frame after Escape; ends on trigger', body.length === 0 && trail.at(-1)[1] === 'trig', { frames: trail.length, bodyFrames: body.length, bodyWindow: body.length ? [body[0][0], body.at(-1)[0]] : null, last: trail.at(-1) });
  await browser.close();
});
// G2 · a Tab 100 ms after Escape lands on the trigger's successor
await safe('K3-G2 tab after close', async () => {
  const { browser, page } = await open({ eng, qs: 's=dlgfocus' });
  await page.focus('[data-probe=trig]'); await page.keyboard.press('Enter'); await sleep(700);
  await page.keyboard.press('Escape'); await sleep(100); await page.keyboard.press('Tab'); await sleep(100);
  const a = await page.evaluate(() => document.activeElement?.dataset?.probe || document.activeElement?.tagName);
  row('K3-G2 Tab at +100 ms lands on the successor', a === 'after', { active: a });
  await browser.close();
});
// G3 · open, Escape, Enter at +30 ms: the Dialog is open with focus inside its content
for (const d of [30, 120]) await safe(`K3-G3 reopen +${d}`, async () => {
  const { browser, page } = await open({ eng, qs: 's=dlgfocus' });
  await page.focus('[data-probe=trig]'); await page.keyboard.press('Enter'); await sleep(700);
  await page.keyboard.press('Escape'); await sleep(d); await page.keyboard.press('Enter'); await sleep(900);
  const st = await page.evaluate(() => ({ dlg: window.__state().dlg, inside: !!document.querySelector('[data-slot=dialog-content][data-state=open]')?.contains(document.activeElement), active: document.activeElement?.dataset?.probe || document.activeElement?.dataset?.slot || document.activeElement?.tagName }));
  row(`K3-G3 reopen at +${d} ms: open with focus inside`, st.dlg === true && st.inside, st);
  await browser.close();
});
// G4 · a double-click on a menu trigger leaves the menu closed, or open with focus inside it
await safe('K3-G4 menu dblclick', async () => {
  const { browser, page } = await open({ eng, qs: 's=menu' });
  const r = await rectOf(page, '[data-probe=mtrig]'); await page.mouse.dblclick(r.x, r.y); await sleep(700);
  const st = await page.evaluate(() => ({ menu: window.__state().menu, active: document.activeElement?.dataset?.probe || document.activeElement?.tagName, inside: !!document.querySelector('[data-probe=menuc]')?.contains(document.activeElement) }));
  await page.keyboard.press('ArrowDown'); await sleep(150);
  const hl = await page.evaluate(() => document.querySelector('[data-highlighted]')?.dataset?.probe || null);
  row('K3-G4 menu dblclick: closed, or open with focus inside', st.menu === false || st.inside, { ...st, highlightAfterArrow: hl });
  await browser.close();
});
// G5 · a controlled Dialog opened by a plain button returns focus to that opener
await safe('K3-G5 controlled dialog return', async () => {
  const { browser, page } = await open({ eng, qs: 's=ctldlg' });
  await page.focus('[data-probe=trig]'); await page.keyboard.press('Enter'); await sleep(700);
  await page.keyboard.press('Escape'); await sleep(900);
  const a = await page.evaluate(() => document.activeElement?.dataset?.probe || document.activeElement?.tagName);
  row('K3-G5 controlled Dialog returns focus to its opener', a === 'trig', { active: a });
  await browser.close();
});
// G6 · a restore (pageshow, persisted) with a menu open re-seats focus inside the menu. Headless Chromium and Playwright
// WebKit never restore from bfcache (measured: navigation type back_forward, page state reset), so the probe clears
// focus as the engine does on a restore (R5-01-06, headed) and dispatches the restore event the library must answer.
await safe('K3-G6 restore', async () => {
  const { browser, page } = await open({ eng, qs: 's=menu' });
  await page.focus('[data-probe=mtrig]'); await page.keyboard.press('Enter'); await sleep(600);
  await page.evaluate(() => { document.activeElement?.blur(); dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })); });
  await sleep(300);
  const st = await page.evaluate(() => ({ menu: window.__state().menu, active: document.activeElement?.dataset?.probe || document.activeElement?.tagName, inside: !!document.querySelector('[data-probe=menuc]')?.contains(document.activeElement) }));
  const h0 = await page.evaluate(() => document.querySelector('[data-highlighted]')?.dataset?.probe || null);
  await page.keyboard.press('ArrowDown'); await sleep(150);
  const h1 = await page.evaluate(() => document.querySelector('[data-highlighted]')?.dataset?.probe || null);
  row('K3-G6 restore: focus inside the open menu, ArrowDown moves', st.menu === true && st.inside && h1 !== h0, { ...st, h0, h1 });
  await browser.close();
});
// G7 · a menu and a Popover reopened 30 or 80 ms into their exit take focus inside the content
for (const [scene, trig, content, key] of [['menu', 'mtrig', 'menuc', 'menu'], ['popfocus', 'trig', 'popc', 'pop']]) for (const d of [30, 80]) await safe(`K3-G7 ${scene} reopen +${d}`, async () => {
  const { browser, page } = await open({ eng, qs: `s=${scene}` });
  await page.focus(`[data-probe=${trig}]`); await page.keyboard.press('Enter'); await sleep(600);
  await page.keyboard.press('Escape'); await sleep(d); await page.keyboard.press('Enter'); await sleep(700);
  const st = await page.evaluate(([c, k]) => ({ open: window.__state()[k], active: document.activeElement?.dataset?.probe || document.activeElement?.tagName, inside: !!document.querySelector(`[data-probe=${c}]`)?.contains(document.activeElement) }), [content, key]);
  row(`K3-G7 ${scene} reopen at +${d} ms: open with focus inside`, st.open === true && st.inside, st);
  await browser.close();
});
// G8 · the four Sheet sides and a mouse-opened Dialog: no BODY frame after Escape
for (const [scene, side, how] of [['sheetfocus', 'right', 'key'], ['sheetfocus', 'left', 'key'], ['sheetfocus', 'top', 'key'], ['sheetfocus', 'bottom', 'key'], ['dlgfocus', '', 'mouse']]) await safe(`K3-G8 ${scene} ${side} ${how}`, async () => {
  const { browser, page } = await open({ eng, qs: `s=${scene}&side=${side}` });
  if (how === 'key') { await page.focus('[data-probe=trig]'); await page.keyboard.press('Enter'); } else { await page.click('[data-probe=trig]'); }
  await sleep(800);
  await page.evaluate(sampler); await page.keyboard.press('Escape'); await sleep(1300);
  const trail = await page.evaluate(() => window.__trail);
  const body = trail.filter(([, a]) => a === 'BODY');
  row(`K3-G8 ${scene} ${side || ''} ${how}: no BODY frame after Escape, ends on trigger`, body.length === 0 && trail.at(-1)[1] === 'trig', { bodyFrames: body.length, bodyWindow: body.length ? [body[0][0], body.at(-1)[0]] : null, last: trail.at(-1) });
  await browser.close();
});
done(eng);
```
