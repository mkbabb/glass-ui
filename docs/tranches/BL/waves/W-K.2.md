# W-K.2 · W-COMMAND: the Command is a non-modal listbox; the dialog palette owns focus · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); probes on the packed HEAD build in the band-K consumer fixture (W-K.1 appendix B), reka 2.10.5 and 2.10.1 builds, and Playwright WebKit |
| ships in | 11.0.0 |
| families | F-37 (all members) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L03b-07, L08-01, L08-03, L08-04 | the inline Command renders reka's Combobox content, which calls `useHideOthers` and the focus guards unconditionally |
| R3-02-07 (HIGH) | an inline Command held open from mount hides the rest of the page from the accessibility tree |
| R4-01-12 (HIGH) | an inline Command inside a Dialog swallows Escape (measured below: does not reproduce at HEAD; kept as a hold line) |
| R5-02-01 (HIGH) | a mouse click on a palette item closes the palette with nothing picked |
| UIA-F-60 (inbound, HIGH) | no anchored inline combobox: W-COMMAND decides the anchored-popper arm |
| #81 W-PICKER (BK register, the Command-composition part) | census-register-b.md:66: "the Command's composition is F-37's W-COMMAND" |
| R5-02-11 (the `aria-controls=""` leg) | CommandInput's `aria-controls` is empty |

## 2 · The defect at HEAD

| site | HEAD |
|---|---|
| `src/components/command/Command.vue` | the root is reka's `ComboboxRoot` with `defaultOpen: true` (`:36`) |
| `src/components/command/CommandList.vue:3,34-48` | the list is reka's `ComboboxContent` |
| reka 2.10.1 `dist/Combobox/ComboboxContentImpl.js:141,142,181` | `useFocusGuards()`, `useHideOthers(rootContext.parentElement)` and a `DismissableLayer` mount with the content, with no opt-out |
| reka `dist/Combobox/ComboboxInput.js:126` | `aria-controls` is `rootContext.contentId`, which the inline content never sets, so it renders `""` |
| `src/components/command/CommandDialog.vue` | the palette carries two open axes (the Dialog's and the Combobox's) and forwards the inner layer's dismissal to the Dialog |

Measured with appendix A (`node k2.mjs`):

| gate | Chromium reka 2.10.5 | Chromium reka 2.10.1 | Playwright WebKit |
|---|---|---|---|
| K2-G1 palette mouse pick | FAIL: `picked null`, `update:open(false)` 2 times | FAIL: null, 2 | FAIL: null, 1 |
| K2-G2 inline Command hides nothing | FAIL: both outside focusables (`outside`, `link`) under `aria-hidden`; 4 `data-aria-hidden` nodes; 2 focus guards | FAIL, same | FAIL, same |
| K2-G3 Escape closes a host Dialog | PASS | PASS | PASS |
| K2-G4 `aria-controls` names the listbox | FAIL: `aria-controls=""`, listbox `reka-combobox-content-v-0` | FAIL | FAIL |
| K2-S static | exit 1: `Command.vue` and `CommandList.vue` import `ComboboxRoot`/`ComboboxContent` | | |

R4-01-12 is not reproduced at HEAD: in three focus positions (the input, the title, a highlighted item) one Escape closes the Dialog on both reka builds (probe `x2.mjs`, 6 of 6). G3 stays as a hold line because the cure removes the DismissableLayer that path runs through.

## 3 · The cure

1. **The Command is a listbox, not a combobox.** `Command.vue` renders reka's `ListboxRoot`; `CommandList` renders `ListboxContent`; `CommandItem`, `CommandGroup` and the group label render `ListboxItem`, `ListboxGroup` and `ListboxGroupLabel`. reka's Listbox primitives mount no `useHideOthers`, no focus guards and no DismissableLayer (`dist/Listbox/*.js`, read at 2.10.1). The Command has no open state: the list is always rendered.
2. **The input drives the list.** `CommandInput` renders reka's `ListboxFilter` with `role="combobox"`, `aria-expanded="true"`, `aria-autocomplete="list"` and `aria-controls` set to the listbox's id. It carries `aria-activedescendant` (ListboxFilter's own). Filtering is the Command's `filter` over the items' `textValue`, one function, not reka's Combobox filter.
3. **The dialog palette owns focus.** `CommandDialog` is `Dialog` + `DialogContent` + `Command`. Focus, Escape and the outside press are the Dialog's layer (W-E.4). The palette's `open` is the Dialog's only; the Command's `open` and `defaultOpen` are deleted, and `CommandDialog` stops forwarding a second `update:open`. A pick (click, Enter) emits `update:modelValue` and then exactly one `update:open(false)`, the Dialog's: a palette closes on pick. That is the palette's contract, not a prop.
4. **The anchored popper arm (UIA-F-60) is RETIRED as a Command arm.** An anchored autocomplete is `Popover` + `Command` inside the one layer stack; no third Command host is added. The story shows that composition.
5. **The listbox is named.** `CommandList` takes the input's accessible name as its `aria-labelledby` unless the consumer names it (the naming half is closed by W-K.6's G2 row, which covers Select's listbox; this wave covers the Command's).

## 4 · Files it touches

`src/components/command/{Command,CommandList,CommandInput,CommandItem,CommandGroup,CommandEmpty,CommandDialog}.vue`, `src/components/command/types.ts`, `src/components/command/styles.css` (the list is no longer a popper content; its `fading-scroll` port stays); `demo/stories/containers/command.vue` (the `:open="!dialogOpen"` latch at `:118` goes; the anchored example composes Popover + Command). New wired spec `tests-visual/wired/command.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| K2-G1 | appendix A G1, consumer fixture, both engines | `picked === "apple"` and exactly 1 `update:open(false)` | **FAIL**: null; 2 (Chromium), 1 (WebKit) |
| K2-G2 | appendix A G2 | 0 outside focusables under `aria-hidden`, `data-aria-hidden` or `inert`; 0 `[data-reka-focus-guard]` | **FAIL**: 2 of 2 hidden, 2 guards |
| K2-G3 (hold line) | appendix A G3 | one Escape closes the host Dialog | PASS at HEAD; its bite is a planted `@keydown.escape.stop` on `CommandInput` |
| K2-G4 | appendix A G4 | `aria-controls` equals the listbox id | **FAIL** (`""`) |
| K2-S | `! rg -q 'ComboboxContent\|ComboboxRoot' src/components/command` | exit 0 | **exit 1** |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=inline` and `?s=cmd` (palette open), demo `/containers/command`, at 1024×768 and 390×844.
- **Themes:** light and dark. The list's paint must not change except that it is no longer a popper content (no z, no plate shift); the pair shows it.
- **Engines:** Chromium and Playwright WebKit measured; real Safari UNMEASURED (OW-3).
- **Paired capture:** `node k2.mjs --shots` writes `k2-palette-open-<eng>.png` at the palette's open frame; the before half is at HEAD, the after half at the wave, each with the G1/G2 JSON as its π reading. The demo pair is `/containers/command` at load (HEAD: the page under `aria-hidden`, which paints the same, so the π reading is G2's hidden count, 2 → 0).

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `Command` props `open`, `defaultOpen`, emit `update:open` | removed | the Command is always rendered; a host (Dialog, Popover) owns open |
| `CommandList` emits `escapeKeyDown`, `pointerDownOutside`, `focusOutside`, `interactOutside` | removed | the list is not a dismissable layer; the host layer's dismissal emits |
| `CommandDialog` forwards a second `update:open` from the Command | one `update:open`, the Dialog's | |
| an inline `Command` hides the rest of the page from assistive technology | it hides nothing | |
| an anchored combobox built from `Command`'s popper content | `Popover` + `Command` | the story shows the composition |

## 8 · Ledger rows

Closes F-37 (L03b-07, L08-01, L08-03, L08-04, R3-02-07, R4-01-12 as a hold line, R5-02-01), UIA-F-60 (RETIRE the Command popper arm, with the Popover composition as its answer), #81's Command-composition part, and R5-02-11's `aria-controls` leg.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the Command is one listbox with two hosts, inline and the Dialog; every open, dismissal and focus question is the layer stack's.
- **Wave:** K2-G1..G4 and K2-S green in one run, both reka builds and both engines.
- **Feature:** on `/containers/command` the page is readable by a screen reader at load; the palette opens from its button, a mouse click picks, Escape closes, focus returns. One frame strip with the AX snapshot beside it.

## Appendix A · `k2.mjs` (lands as `tests-visual/wired/command.spec.ts`)

```js
// W-K.2 born-RED probe: the inline Command is a non-modal listbox (F-37). node k2.mjs [--eng webkit] [--shots]
import { open, sleep, rectOf, runner, argEng, CAP } from './lib.mjs';
const eng = argEng(); const shots = process.argv.includes('--shots'); const { row, safe, done } = runner('k2');
// G1 · consumer fixture: one Button and one CommandDialog; a mouse click on the first item picks it and closes once
await safe('K2-G1 palette mouse pick', async () => {
  const { browser, page } = await open({ eng, qs: 's=cmd' });
  await page.click('[data-probe=opencmd]'); await sleep(600);
  const r = await rectOf(page, '[data-probe=ci-apple]');
  if (shots) await page.screenshot({ path: `${CAP}/k2-palette-open-${eng}.png` });
  await page.mouse.click(r.x, r.y); await sleep(600);
  const st = await page.evaluate(() => window.__state());
  row('K2-G1 palette click picks the item, one update:open(false)', st.picked === 'apple' && st.closes === 1, { picked: st.picked, closes: st.closes, open: st.cmdOpen });
  await browser.close();
});
// G2 · an inline Command mounted open hides nothing outside itself
await safe('K2-G2 inline command hides nothing', async () => {
  const { browser, page } = await open({ eng, qs: 's=inline', settle: 600 });
  const m = await page.evaluate(() => { const cmd = document.querySelector('[data-probe=cmd]'); const outside = [...document.querySelectorAll('button, a[href], input')].filter((e) => !cmd.contains(e)); const hidden = outside.filter((e) => e.closest('[aria-hidden="true"]') || e.closest('[data-aria-hidden]') || e.closest('[inert]')); return { outside: outside.length, hidden: hidden.map((e) => e.dataset.probe || e.tagName), ariaHiddenNodes: document.querySelectorAll('[aria-hidden="true"][data-aria-hidden]').length, guards: document.querySelectorAll('[data-reka-focus-guard]').length }; });
  const ax = await page.locator('[data-probe=outside]').ariaSnapshot().catch((e) => 'ERR ' + e.message.split('\n')[0]);
  row('K2-G2 inline command: 0 hidden outside focusables, 0 focus guards', m.hidden.length === 0 && m.guards === 0, { ...m, outsideAx: ax });
  await browser.close();
});
// G3 · Escape inside a Dialog that hosts an inline Command closes the Dialog (hold line)
await safe('K2-G3 escape closes host dialog', async () => {
  const { browser, page } = await open({ eng, qs: 's=cmdindlg&auto=dlg', settle: 700 });
  await page.click('[data-probe=cin]'); await sleep(100);
  await page.keyboard.press('Escape'); await sleep(250); const one = await page.evaluate(() => window.__state().dlg);
  await page.keyboard.press('Escape'); await sleep(250); const two = await page.evaluate(() => window.__state().dlg);
  row('K2-G3 one Escape closes a Dialog hosting an inline Command', one === false, { afterOne: one, afterTwo: two });
  await browser.close();
});
// G4 · the listbox is named and CommandInput's aria-controls names it
await safe('K2-G4 listbox linkage', async () => {
  const { browser, page } = await open({ eng, qs: 's=inline', settle: 600 });
  const m = await page.evaluate(() => { const i = document.querySelector('[data-probe=cmd] input'); const lb = document.querySelector('[data-probe=cmd] [role=listbox]'); return { controls: i?.getAttribute('aria-controls'), listboxId: lb?.id || null, match: !!(lb && lb.id && i?.getAttribute('aria-controls') === lb.id) }; });
  row('K2-G4 CommandInput aria-controls = the listbox id', m.match, m);
  await browser.close();
});
done(eng);
```
