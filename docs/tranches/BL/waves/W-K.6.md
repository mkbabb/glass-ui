# W-K.6 · The a11y sweep: names, one keystroke predicate, destinations, count 0 · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B) and the built demo on :6271 |
| ships in | 11.0.0 |
| families | F-42 (all members) and its inbound rows; #31's RT-31C (routed here by the census) |
| depends on | W-K.1 (the composed target the predicate reads), W-E.4 (the stack's Escape listener is a predicate seat) |
| dependants | W-L.1 (API asks that read names), W-L.3 (the Slider's DEV guard moves to `process.env.NODE_ENV` in F-67's row) |

## 1 · What it closes

| id | what | row in §3 |
|---|---|---|
| L08-14 | a context menu has no keyboard opener on macOS (Shift+F10) | 9 |
| L08-19, R7-01-10 | destinations built from buttons (ToC, shell rail, page strip) | 7 |
| L08-20 | `document.title` is the same on every route | 10 |
| L08-21 | naming misses: empty DataTable header, both range thumbs "Price range", unnamed ConfiguratorLayer region, a `role="slider"` holding buttons, a nameless typewriter slider (the Label-for case) | 1, 11 |
| L08-22 | horizontal RadioGroups ignore ArrowUp/ArrowDown | 12 |
| L08-23 | the Progress story's loop ignores reduced motion | 13 |
| R2-04-13 | all six L08 seams stand | — |
| R2-08-05 | carousel and deck paging animate under reduced motion (`useDeckSnap.ts:143`) | 13 |
| R3-01-13 | `.scroll-progress` rests at `scaleX(0)` under reduced motion | 13 |
| R3-02-15, R5-02-11 | Select's and the context menu's listbox/menu unnamed; 24 `role=tab` with 0 `aria-controls` on `/navigation/tabs`; a duplicated id; invalid Checkbox/Switch with no error description | 2, 11 |
| R4-01-16 | a held Enter activates the control focus moved to | 6 |
| R4-02-14, R7-02-07 | a zero-member collection computes as one | 8 |
| R5-02-06 | `<Label for>` + `<Slider id>` names nothing | 1 |
| R5-02-12 | a consumer `aria-label` on PopoverContent names nothing | 3 |
| R6-02-07 | keystrokes owned by an input method are acted on | 5 |
| R8-01-04 | the deck's key handler reads no modifier | 5 |
| RT-31C (#31) | one h1 per route | cured at HEAD (§2) |
| UIA-KF-073 | shortcut labels show `KeyX` | 4 |
| UIA-KF-145 | "⌫ or Backspace": the consumer's alias bypasses the formatter | 4 (ANSWER) |
| UIA-V-220, UIA-V-476 | a clipped Select list with no scroll affordance; the Select opens with the selected row on the scroll-button edge | FOLD → W-E.4 (§3) |
| UIA-F-128 | menu rows have no `aria-current` leg | FOLD → W-H.1 (§3) |
| UIA-KF-216, A2-KE-L2-7 | a sheet grab handle with no tap opener | FOLD → W-E.3 (§3) |

## 2 · The defect at HEAD

Sources: `search/useFuzzySearch.ts:101-130` switches on `e.key` alone; the registry's `allowInInput` path reads nothing else (`keyboard/useKeyboardShortcuts.ts:326-331`); `deck/composables/useDeckKeyboard.ts:73-96` pages on `e.key`, `preventDefault`s at `:96`, bound at `:122`; `src` and `demo` hold 0 `isComposing` and 0 `keyCode` reads. `formatComboParts` at `useKeyboardShortcuts.ts:205`. `radio-group/RadioGroup.vue:14,32` (one orientation axis). `menu/DropdownMenu.vue:63,77` routes `trigger="context"` to reka's ContextMenu, which opens only on a `contextmenu` event. `pager-dots/PagerDots.vue:88-95,324-328` (count 0 still reads "Slide 1 of 0"). `slider/Slider.vue` has no `id` prop, so `id` lands on the `SliderRoot` span; its nameless-thumb guard is `import.meta.env.DEV` (`:243`). `deck/composables/useDeckSnap.ts:143` defaults `behavior: ScrollBehavior = "smooth"`. `styles/scroll-driven.css:64-67` rests `.scroll-progress` at `scaleX(0)` and drives it only under `no-preference`. Demo: `shell/useShellNavDock.ts:77` (`pushRoute` on a button), `stories/navigation/toc-tracking.vue:131,143` (buttons), `shell/AppShell.vue:139` (announces the title, never sets `document.title`).

Measured with appendix A (`k6.mjs`, `k6b.mjs`, `k6c.mjs`), Chromium, **26 rows, 23 FAIL**; `k6.mjs` in Playwright WebKit, 14 rows, 12 FAIL (the two demo rows there crash the page, the known GlassDock crash):

| gate | HEAD reading |
|---|---|
| K6-G1 Label-for Slider | **FAIL** `- slider` (no name), both engines |
| K6-G2 Select listbox name (trigger `aria-label="Fruit"`) | **FAIL** `- listbox:`, both engines |
| K6-G3 PopoverContent `aria-label="Share settings"` | **FAIL** `dialog "Open popover"`, both engines |
| K6-G4 PagerDots count 0 | **FAIL** live text "Slide 1 of 0", 3 painted nodes in a 16×8 box, both engines |
| K6-G5 Select with 0 items and an `#empty` slot | **FAIL** slot not rendered, both engines |
| K6-G6 composing Escape in a Dialog | **FAIL** Dialog closed, both engines |
| K6-G6 composing Escape in an ExpandableContainer | PASS, both engines (control; its Escape is not `allowInInput`) |
| K6-G6 composing Escape in the inline Command | **FAIL** query wiped, `aria-expanded="false"`, both engines |
| K6-G6 composing `k` at the body | **FAIL** app `k` fired once, both engines |
| K6-G7 held Enter on a Dialog trigger | PASS (settles open), both engines |
| K6-G7 held Enter on a menu trigger | **FAIL** 7 item activations (Chromium), 8 (WebKit) |
| K6-G8 `formatComboParts('KeyX')` | **FAIL** `["KeyX"]`; `shift+Digit2` → `["⇧","Digit2"]` |
| K6-G9 destinations on `/navigation/toc-tracking` | **FAIL** 48 ToC buttons, 0 links; nav 0 links, 69 buttons |
| K6-G10 deck with a word selected: Shift+ArrowRight, Alt+ArrowRight, Meta+Digit2 | **FAIL** 3 of 3 page to slide 2 and are `preventDefault`ed |
| K6-G11 `document.title` on two routes | **FAIL** both "glass-ui Feature Demo" |
| K6-G12 horizontal RadioGroup "Plan", ArrowDown | **FAIL** focus stays on `plan-team` |
| K6-G13 one h1 per route (RT-31C) | PASS: 80 routes, each exactly one h1 (10 file-derived paths are not routes) |
| K6-G14 Shift+F10 on the focused context trigger | **FAIL** focused, menu not open |
| K6-G15 `/navigation/tabs` tab linkage | **FAIL** 24 tabs, 0 resolve to a `tabpanel`, 0 panels |
| K6-G16 `/forms/checks` invalid controls described | **FAIL** 3 of 3 (checkbox, radiogroup, switch) with no description |
| K6-G17 duplicate ids across 80 routes | **FAIL** `/substrates/aurora`: `v-15-control` twice |
| K6-G18 scroll readout under reduce on `/motion/scroll` | **FAIL** `matrix(0, 0, 0, 1, 0, 0)` after scrolling half the page |
| K6-G19 empty `<th>` on `/data/data-table` | **FAIL** 1 |
| K6-G20 range thumbs on `/forms/slider` | **FAIL** both "Price range" |
| K6-G21 ConfiguratorLayer region name | **FAIL** unnamed |
| K6-G22 `role=slider` holding a button on `/display/surface` | **FAIL** "Surface prominence" |
| K6-S static | exit 1 (0 `isComposing` under `src/composables/keyboard`; the smooth default at `useDeckSnap.ts:143`) |

**Cured at HEAD.** RT-31C: K6-G13 reads one h1 on each of the 80 demo routes; it stays as a hold line. The held-Enter Dialog case of R4-01-16 settles open at HEAD in both engines (hold line); the menu case stands.

## 3 · The cure

1. **Slider naming.** Slider declares `id` and forwards it, and `aria-labelledby`, to the thumb (`SliderThumb`), so `<Label for>` names it. A range names each thumb from `thumbLabels` or appends "minimum" and "maximum" to the root name. The nameless-thumb guard moves to W-L.3's `process.env.NODE_ENV` row.
2. **Popup names.** Select's listbox takes `aria-labelledby` = the trigger's id (the trigger carries the name). The context menu's content takes the trigger's name the same way. SegmentedTabs is a `tablist` only when it is given panel ids (`controls`); without them it renders `role="radiogroup"` with `role="radio"` items, so no tab exists without a panel. Invalid triad controls carry `aria-describedby` to their error slot (LabeledField's description seam).
3. **Consumer names win.** Every content part (Popover, Dialog, Sheet, menu) drops reka's `aria-labelledby` when the consumer passes `aria-label` or `aria-labelledby`.
4. **Key names.** `formatComboParts` maps event-code tokens (`KeyX` → `X`, `DigitN` → `N`) before formatting. UIA-KF-145 is ANSWERED to the consumer: route the alias through `formatCombo`, which names Backspace once.
5. **One keystroke predicate.** `src/composables/keyboard/keystroke.ts` exports `ownsKeystroke(e, { repeat, modifiers, editable })`. It returns false when `e.isComposing || e.keyCode === 229`; when `e.repeat` and the seat does not accept repeats; when the modifier set differs from the seat's (bare keys by default; Shift+Space where the platform means back); and, for editable-aware seats, when `composedTarget(e)` (W-K.1) is editable. The four seats call it first: `useFuzzySearch.onKeydown`, the registry's dispatch, the layer stack's Escape listener (W-E.4), and `handleDeckKey`.
6. **Held keys.** The menu content handles `keydown` in the capture phase: a repeated Enter or Space (`e.repeat`) is prevented and stopped before reka's item handler, so a held key activates at most once.
7. **Destinations are links.** The demo shell's rail and page strip seats render `RouterLink` (the dock seat already accepts one), with `pushRoute` hooked on the link's navigate. ToC entries are `<a href="#sec-…">`. The ToC is a list of links, not 48 buttons.
8. **Count 0 is a state.** PagerDots and Carousel with `count` 0, null, undefined or NaN render nothing and announce nothing; GlassDock with no seats renders nothing; SelectContent renders an `#empty` slot when it has no items (Command already has `CommandEmpty`).
9. **Context opener.** `DropdownMenu trigger="context"`'s trigger handles Shift+F10 (and the ContextMenu key) on `keydown` and opens at the trigger's rect.
10. **Titles (demo).** The shell's route watch sets `document.title` from `meta.title` beside `routeAnnounce`.
11. **Demo naming.** DataTable's actions column header gets a visually hidden label; the Surface prominence rail stops being a `role="slider"` holding buttons (it is a radiogroup of rungs); the aurora story's duplicated control id is made unique.
12. **Both axes.** RadioGroup maps ArrowDown/ArrowRight and ArrowUp/ArrowLeft to next and previous in either orientation.
13. **Reduced motion.** `useDeckSnap.scrollTo` takes its default behaviour from the motion preference (`resolveMotion`): `instant` under reduce. The scroll-position readout is kept under reduce: it follows the reader's own scroll, which is not motion the page initiates, so `.scroll-progress` is driven in both preferences (decided on merit, R3-01-13). The Progress story's demo loop reads the preference and has a pause control.

**Folds.** UIA-V-220 and UIA-V-476 go to W-E.4: its ceilings row puts every popper list in the one fading scroll port with the available height, which removes SelectScrollButton's edge and the item-aligned initial scroll. UIA-F-128 goes to W-H.1: a menu row's current state is a state paint, which W-H.1 separates from value and emphasis. UIA-KF-216 goes to W-E.3: what a sheet's handle does on tap is a detent transition, which the sheet's detent seam owns; W-E.3 takes the born-RED (a tap on the handle at the lowest rung moves one rung up).

## 4 · Files it touches

`src/composables/keyboard/{keystroke.ts (new),useKeyboardShortcuts.ts,index.ts}`, `src/composables/search/useFuzzySearch.ts`, `src/components/deck/composables/{useDeckKeyboard,useDeckSnap}.ts`, `src/components/slider/Slider.vue`, `src/components/select/{SelectContent,SelectTrigger}.vue`, `src/components/_shared/overlay/content.ts` (the consumer-name rule), `src/components/menu/{DropdownMenu,DropdownMenuContent}.vue`, `src/components/tabs/SegmentedTabs.vue`, `src/components/radio-group/RadioGroup.vue`, `src/components/pager-dots/PagerDots.vue`, `src/components/carousel/*`, `src/components/dock/GlassDock.vue`, `src/components/labeled-field/*` (the description seam), `src/styles/scroll-driven.css`; demo `shell/{AppShell.vue,useShellNavDock.ts}`, `stories/navigation/toc-tracking.vue`, `stories/data/data-table.vue`, `stories/display/surface.vue`, `stories/substrates/aurora*`, `stories/feedback/progress.vue`. New `tests-visual/wired/a11y-sweep.spec.ts` (appendix A).

## 5 · Acceptance gates

Every row in the §2 table is a gate; it passes when its reading inverts (named, 0 hidden, 0 activations, `["X"]`, links present, titles differ, focus moves, menu open, tabs resolve or no tabs, described, 0 duplicates, bar not `scaleX(0)`, 0 empty headers, distinct names, no slider with a button). Hold lines: K6-G6 ExpandableContainer, K6-G7 Dialog, K6-G13 (PASS at HEAD; bites: `registerShortcut("Escape", …, { allowInInput: true })` in ExpandableContainer turns G6-EC red; removing the StoryHero h1 turns G13 red). Static:

| id | gate | HEAD |
|---|---|---|
| K6-S | `rg -q 'isComposing' src/composables/keyboard && ! rg -q 'ScrollBehavior = "smooth"' src/components/deck/composables/useDeckSnap.ts` | **exit 1** |

## 6 · π and DELTA obligations

Paint claims: count 0 paints no worm (G4), the Surface rail and the DataTable header (no visual change intended; the pair shows no regression).
- **Surfaces:** fixture `k.html?s=empty&count=0`; demo `/navigation/pager-dots`, `/display/surface`, `/data/data-table`, `/navigation/toc-tracking` at 1440×900 and 390×844.
- **Themes:** light and dark.
- **Engines:** Chromium; Playwright WebKit for the fixture cells; real Safari UNMEASURED (OW-3).
- **Paired capture:** the executing seat takes each surface at HEAD (the before half is the HEAD tree, rebuildable from `9866d229`) and at the wave; G4's `painted` count is the π reading for the worm.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `Slider` `id` lands on the root span | `id` is the thumb's; `<Label for>` names it | |
| `SegmentedTabs` without panel ids renders `role="tab"` buttons | renders a `radiogroup` of `radio`s; with `controls` it renders `tablist`/`tab` with `aria-controls` | a consumer selecting `[role=tab]` without panels re-targets `[role=radio]` |
| content parts name themselves from the trigger even when given `aria-label` | the consumer's name wins | |
| `PagerDots`/`Carousel` at count 0 render a rail announcing "Slide 1 of 0" | render nothing | |
| `GlassDock` with no seats renders an empty plate | renders nothing | |
| deck and carousel paging smooth under reduced motion | instant under reduced motion | |
| `.scroll-progress` hidden under reduced motion | shown, following the reader's scroll | |
| the deck pages on modified arrows and digits | pages on bare keys only | Shift+Space still goes back |
| registry shortcuts, dock search and overlay Escape act during IME composition | they ignore composing keystrokes | |

## 8 · Ledger rows

Closes F-42 (L08-14, L08-19, L08-20, L08-21, L08-22, L08-23, R2-04-13, R2-08-05, R3-01-13, R3-02-15, R4-01-16, R4-02-14, R5-02-06, R5-02-11, R5-02-12, R6-02-07, R7-01-10, R7-02-07, R8-01-04), #31's RT-31C (cured at HEAD, hold line), UIA-KF-073, UIA-KF-145 (ANSWER), and records the folds UIA-V-220 and UIA-V-476 → W-E.4, UIA-F-128 → W-H.1, UIA-KF-216 and A2-KE-L2-7 → W-E.3.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one predicate decides whether a keystroke is the widget's, one rule decides whose name a popup carries, and a collection of zero is nothing.
- **Wave:** all §2 gates and K6-S green in one run.
- **Feature:** with a Japanese IME on, type in the dock search and a Dialog's field: composition Enter, Escape and arrows change nothing until the composition ends; a screen-reader pass over `/forms/checks` and `/navigation/tabs` hears a name and a description on every control. One capture of the AX snapshot per route.

## Appendix A · `k6.mjs`, `k6b.mjs`, `k6c.mjs` (land as `tests-visual/wired/a11y-sweep.spec.ts`)

Run against the W-K.1 appendix B harness. `routes.json` is the demo route list derived from `demo/stories/<category>/<story>.vue`, 90 paths, of which 10 render "Page not found" and are skipped. In Playwright WebKit, the G9 and G10 rows fail because the page crashes (GlassDock), not on the reading.

```js
// W-K.6 born-RED probe: naming seams, one keystroke predicate, links, count 0 (F-42). node k6.mjs [--eng webkit]
import { open, sleep, rectOf, runner, argEng, DEMO } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k6');
const snap = (page, sel) => page.locator(sel).first().ariaSnapshot().catch((e) => 'ERR ' + e.message.split('\n')[0]);
// G1 · <Label for> + <Slider id> names the thumb
await safe('K6-G1 label-for slider', async () => {
  const { browser, page } = await open({ eng, qs: 's=names' });
  const s = await snap(page, '[data-probe=lslider] [role=slider]');
  row('K6-G1 Label-for Slider: the thumb has a non-empty name', /slider "[^"]+"/.test(s), { ax: s });
  await browser.close();
});
// G2 · the Select listbox is named (trigger aria-label "Fruit")
await safe('K6-G2 select listbox name', async () => {
  const { browser, page } = await open({ eng, qs: 's=names&auto=sel', settle: 700 });
  const s = await snap(page, '[role=listbox]');
  row('K6-G2 Select listbox has a name', /^- listbox "[^"]+"/.test(s), { ax: s.split('\n')[0] });
  await browser.close();
});
// G3 · a consumer aria-label on PopoverContent names the dialog
await safe('K6-G3 popover content name', async () => {
  const { browser, page } = await open({ eng, qs: 's=names&auto=pop', settle: 700 });
  const s = await snap(page, '[data-probe=popc]');
  row('K6-G3 PopoverContent aria-label wins the name', s.split('\n')[0].includes('"Share settings"'), { ax: s.split('\n')[0] });
  await browser.close();
});
// G4 · count 0 is a state: PagerDots at count 0 announce nothing and paint no worm
await safe('K6-G4 pager count 0', async () => {
  const { browser, page } = await open({ eng, qs: 's=empty&count=0' });
  const m = await page.evaluate(() => { const d = document.querySelector('[data-probe=dots]'); const live = d ? [...d.querySelectorAll('[aria-live],[role=status]')].map((e) => e.textContent.trim()).join('|') : null; const r = d?.getBoundingClientRect(); return { mounted: !!d, live, box: r ? [Math.round(r.width), Math.round(r.height)] : null, painted: d ? [...d.querySelectorAll('*')].filter((e) => { const b = e.getBoundingClientRect(); const c = getComputedStyle(e); return b.width > 0 && b.height > 0 && c.backgroundColor !== 'rgba(0, 0, 0, 0)'; }).length : 0 }; });
  row('K6-G4 PagerDots count 0: no live text, no painted worm', !m.live && m.painted === 0, m);
  await browser.close();
});
// G5 · a Select with 0 items shows its empty slot
await safe('K6-G5 select empty slot', async () => {
  const { browser, page } = await open({ eng, qs: 's=empty&auto=sel', settle: 700 });
  const m = await page.evaluate(() => ({ empty: !!document.querySelector('[data-probe=selempty]'), text: document.querySelector('[role=listbox]')?.textContent.trim() ?? null }));
  row('K6-G5 Select with 0 items renders #empty', m.empty, m);
  await browser.close();
});
// G6 · a keydown owned by an input method (isComposing, keyCode 229) changes no state: Dialog, ExpandableContainer, inline Command, app shortcuts
const ime = (key) => { const t = document.activeElement?.shadowRoot?.activeElement || document.activeElement; t.dispatchEvent(new KeyboardEvent('keydown', { key, code: key === 'Escape' ? 'Escape' : 'Key' + key.toUpperCase(), keyCode: 229, which: 229, isComposing: true, bubbles: true, cancelable: true, composed: true })); };
for (const [cell, qs, focus, check] of [
  ['Dialog', 's=ime&auto=dlg', '[data-probe=din]', (s) => s.dlg === true],
  ['ExpandableContainer', 's=ime&auto=ec', '[data-probe=ecin]', (s) => s.ec === true],
]) await safe(`K6-G6 ${cell}`, async () => {
  const { browser, page } = await open({ eng, qs, settle: 800 });
  await page.focus(focus); await page.evaluate(ime, 'Escape'); await sleep(400);
  const st = await page.evaluate(() => ({ ...window.__state(), esc: window.__esc }));
  row(`K6-G6 composing Escape leaves the ${cell} open, app Escape 0`, check(st) && st.esc === 0, st);
  await browser.close();
});
await safe('K6-G6 inline Command', async () => {
  const { browser, page } = await open({ eng, qs: 's=ime' });
  await page.click('[data-probe=cin]'); await page.keyboard.type('pl'); await sleep(150);
  await page.evaluate(ime, 'Escape'); await sleep(300);
  const m = await page.evaluate(() => ({ query: document.querySelector('[data-probe=cin]')?.value, list: !!document.querySelector('[data-probe=cmd] [role=listbox]'), expanded: document.querySelector('[data-probe=cin]')?.getAttribute('aria-expanded') }));
  row('K6-G6 composing Escape keeps the inline Command query and list', m.query === 'pl' && m.expanded === 'true', m);
  await browser.close();
});
await safe('K6-G6 app shortcut', async () => {
  const { browser, page } = await open({ eng, qs: 's=ime' });
  await page.focus('[data-probe=ecin]').catch(() => {}); await page.evaluate(() => document.body.focus());
  await page.evaluate(() => { document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', code: 'KeyK', keyCode: 229, isComposing: true, bubbles: true, cancelable: true })); });
  await sleep(150);
  const k = await page.evaluate(() => window.__k);
  row('K6-G6 composing k fires no app shortcut', k === 0, { k });
  await browser.close();
});
// G7 · a held Enter: on a Dialog trigger the Dialog settles open; on a menu trigger 0 items fire
await safe('K6-G7 held enter dialog', async () => {
  const { browser, page } = await open({ eng, qs: 's=held' });
  await page.focus('[data-probe=trig]'); await page.keyboard.down('Enter'); for (let i = 0; i < 10; i++) { await sleep(35); await page.keyboard.down('Enter'); } await page.keyboard.up('Enter'); await sleep(700);
  const st = await page.evaluate(() => window.__state());
  row('K6-G7 held Enter on a Dialog trigger settles open', st.dlg === true, { dlg: st.dlg });
  await browser.close();
});
await safe('K6-G7 held enter menu', async () => {
  const { browser, page } = await open({ eng, qs: 's=held' });
  await page.focus('[data-probe=mtrig]'); await page.keyboard.down('Enter'); for (let i = 0; i < 10; i++) { await sleep(35); await page.keyboard.down('Enter'); } await page.keyboard.up('Enter'); await sleep(700);
  const st = await page.evaluate(() => ({ picked: window.__picked, menu: window.__state().menu }));
  row('K6-G7 held Enter on a menu trigger fires 0 items', !st.picked, st);
  await browser.close();
});
// G8 · shortcut labels are key names, never event-code tokens (UIA-KF-073)
await safe('K6-G8 key naming', async () => {
  const { browser, page } = await open({ eng, qs: 's=none' });
  const m = await page.evaluate(() => ({ x: window.__formatComboParts('KeyX'), shiftDigit: window.__formatComboParts('shift+Digit2') }));
  row('K6-G8 formatComboParts names KeyX as X', JSON.stringify(m.x) === '["X"]' && !JSON.stringify(m.shiftDigit).includes('Digit'), m);
  await browser.close();
});
// G9 · demo: destinations are links (the rail and page strip and the ToC entries carry href)
await safe('K6-G9 destinations', async () => {
  const { browser, page } = await open({ eng, url: `${DEMO}/navigation/toc-tracking`, w: 1440, h: 900, settle: 1200 });
  const m = await page.evaluate(() => ({ tocButtons: document.querySelectorAll('button[data-scroll-target]').length, tocLinks: document.querySelectorAll('a[href][data-scroll-target]').length, navLinks: document.querySelectorAll('nav a[href]').length, navButtons: document.querySelectorAll('nav button').length }));
  row('K6-G9 ToC and nav destinations carry href (0 destination buttons)', m.tocButtons === 0 && m.navLinks > 0, m);
  await browser.close();
});
// G10 · demo deck: a modified arrow with a selection pages nothing and is not prevented
await safe('K6-G10 deck modifiers', async () => {
  const { browser, page } = await open({ eng, url: `${DEMO}/motion/deck`, w: 1440, h: 900, settle: 1500 });
  const res = {};
  for (const combo of ['Shift+ArrowRight', 'Alt+ArrowRight', 'Meta+Digit2']) {
    await page.goto(`${DEMO}/motion/deck`, { waitUntil: 'networkidle' }); await sleep(1200);
    await page.evaluate(() => { const s = [...document.querySelectorAll('[data-slot=deck-slide], section')].find((e) => e.textContent.trim().length > 20 && e.getBoundingClientRect().width > 0); const w = document.createTreeWalker(s, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (n.textContent.trim().length > 4) break; const r = document.createRange(); r.setStart(n, 0); r.setEnd(n, 3); getSelection().removeAllRanges(); getSelection().addRange(r); window.__prevented = null; addEventListener('keydown', (e) => { setTimeout(() => { window.__prevented = e.defaultPrevented; }); }, { capture: true }); });
    const before = await page.evaluate(() => [...document.querySelectorAll('[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean).join('|'));
    await page.keyboard.press(combo); await sleep(700);
    res[combo] = await page.evaluate(() => ({ live: [...document.querySelectorAll('[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean).join('|'), prevented: window.__prevented, hash: location.hash }));
    res[combo].before = before;
  }
  const paged = Object.values(res).filter((r) => r.live !== r.before || r.prevented).length;
  row('K6-G10 deck: modified keys page 0 times and are not prevented', paged === 0, res);
  await browser.close();
});
if (eng === 'chromium') {
  // G11 · demo: document.title names the route (two routes, two titles)
  await safe('K6-G11 title', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/forms/checks`, w: 1440, h: 900, settle: 1200 });
    const a = await page.title(); await page.goto(`${DEMO}/data/table`, { waitUntil: 'networkidle' }); await sleep(1200); const b = await page.title();
    row('K6-G11 document.title differs per route', a !== b, { a, b });
    await browser.close();
  });
  // G12 · demo: a horizontal RadioGroup moves on ArrowDown as on ArrowRight
  await safe('K6-G12 radio arrows', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/forms/checks`, w: 1440, h: 900, settle: 1200 });
    const m = await page.evaluate(() => { const g = [...document.querySelectorAll('[role=radiogroup]')].find((x) => x.getAttribute('aria-orientation') === 'horizontal' || getComputedStyle(x).flexDirection === 'row' || x.getAttribute('aria-label') === 'Plan'); const r = g.querySelector('[role=radio][aria-checked=true]') || g.querySelector('[role=radio]'); r.focus(); return { label: g.getAttribute('aria-label'), start: r.id || r.getAttribute('value') }; });
    await page.keyboard.press('ArrowDown'); await sleep(200);
    const after = await page.evaluate(() => document.activeElement.id || document.activeElement.getAttribute('value'));
    row('K6-G12 horizontal RadioGroup: ArrowDown moves', after !== m.start, { ...m, after });
    await browser.close();
  });
  // G13 · one document heading per route (RT-31C): every demo route has exactly one h1
  await safe('K6-G13 one h1', async () => {
    const routes = JSON.parse((await import('node:fs')).readFileSync(new URL('./routes.json', import.meta.url)));
    const { browser, page } = await open({ eng, url: `${DEMO}/`, w: 1440, h: 900, settle: 500 });
    const bad = []; let notFound = 0;
    for (const r of routes) { await page.goto(`${DEMO}${r}`, { waitUntil: 'load' }); await sleep(700); const m = await page.evaluate(() => ({ n: document.querySelectorAll('h1').length, nf: /not found/i.test(document.querySelector('h1')?.textContent || '') })); if (m.nf) notFound++; else if (m.n !== 1) bad.push(`${r}:${m.n}`); }
    row('K6-G13 every route has exactly one h1', bad.length === 0, { routes: routes.length, notFound, bad });
    await browser.close();
  }, 400000);
  // G14 · demo: Shift+F10 on a focused context-menu trigger opens the menu
  await safe('K6-G14 shift f10', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/containers/context-menu`, w: 1440, h: 900, settle: 1200 });
    const focused = await page.evaluate(() => { const t = [...document.querySelectorAll('[data-slot*=trigger], [tabindex]')].find((e) => /Shift\+F10/.test(e.textContent)); t?.focus(); return !!t && document.activeElement === t; });
    await page.keyboard.press('Shift+F10'); await sleep(500);
    const isOpen = await page.evaluate(() => !!document.querySelector('[role=menu]'));
    row('K6-G14 Shift+F10 opens the context menu', focused && isOpen, { focused, isOpen });
    await browser.close();
  });
}
done(eng);
```

```js
// W-K.6 demo naming cells: tab linkage, invalid description, duplicate ids, the scroll-position readout under PRM. node k6b.mjs
import { open, sleep, runner, DEMO } from './lib.mjs';
import fs from 'node:fs';
const { row, safe, done } = runner('k6b');
await safe('K6-G15 tab linkage', async () => {
  const { browser, page } = await open({ url: `${DEMO}/navigation/tabs`, w: 1440, h: 900, settle: 1500 });
  const m = await page.evaluate(() => { const tabs = [...document.querySelectorAll('[role=tab]')]; return { tabs: tabs.length, resolved: tabs.filter((t) => document.getElementById(t.getAttribute('aria-controls') || '')?.getAttribute('role') === 'tabpanel').length, panels: document.querySelectorAll('[role=tabpanel]').length }; });
  row('K6-G15 every role=tab controls a role=tabpanel on /navigation/tabs', m.tabs > 0 && m.resolved === m.tabs, m);
  await browser.close();
});
await safe('K6-G16 invalid description', async () => {
  const { browser, page } = await open({ url: `${DEMO}/forms/checks`, w: 1440, h: 900, settle: 1200 });
  const m = await page.evaluate(() => [...document.querySelectorAll('[aria-invalid=true]')].map((e) => { const ids = (e.getAttribute('aria-describedby') || e.getAttribute('aria-errormessage') || '').split(/\s+/).filter(Boolean); return { role: e.getAttribute('role') || e.tagName, described: ids.some((id) => (document.getElementById(id)?.textContent || '').trim().length > 0) }; }));
  row('K6-G16 every invalid control on /forms/checks has an error description', m.length > 0 && m.every((x) => x.described), { controls: m });
  await browser.close();
});
await safe('K6-G17 duplicate ids', async () => {
  const routes = JSON.parse(fs.readFileSync(new URL('./routes.json', import.meta.url)));
  const { browser, page } = await open({ url: `${DEMO}/`, w: 1440, h: 900, settle: 300 });
  const bad = [];
  for (const r of routes) { await page.goto(`${DEMO}${r}`, { waitUntil: 'load' }); await sleep(600); const d = await page.evaluate(() => { if (/not found/i.test(document.querySelector('h1')?.textContent || '')) return null; const ids = [...document.querySelectorAll('[id]')].map((e) => e.id).filter(Boolean); return [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))]; }); if (d && d.length) bad.push(`${r}: ${d.slice(0, 3).join(',')}`); }
  row('K6-G17 no duplicate id on any demo route', bad.length === 0, { bad });
  await browser.close();
}, 400000);
await safe('K6-G18 scroll readout under PRM', async () => {
  const { browser, page } = await open({ url: `${DEMO}/motion/scroll`, w: 1440, h: 900, settle: 1500, reduce: true });
  const m = await page.evaluate(async () => { const bar = document.querySelector('.scroll-progress'); if (!bar) return { bar: false }; const sc = document.querySelector('main'); sc.scrollTo({ top: sc.scrollHeight / 2, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 400)); return { bar: true, transform: getComputedStyle(bar).transform, scale: getComputedStyle(bar).scale }; });
  row('K6-G18 under reduce, the scroll-position bar reads the reader scroll (not scaleX(0))', m.bar && !/matrix\(0, 0, 0/.test(m.transform) && m.scale !== '0 1', m);
  await browser.close();
});
done('chromium');
```

```js
// W-K.6 L08-21 naming cells (demo + fixture). node k6c.mjs
import { open, sleep, runner, DEMO, APP } from './lib.mjs';
const { row, safe, done } = runner('k6c');
const names = (page, sel) => page.evaluate(async (sel) => [...document.querySelectorAll(sel)].map((e) => e.getAttribute('aria-label') || (e.getAttribute('aria-labelledby') || '').split(' ').map((id) => document.getElementById(id)?.textContent.trim()).join(' ').trim() || ''), sel);
await safe('K6-G19 empty th', async () => {
  const { browser, page } = await open({ url: `${DEMO}/data/data-table`, w: 1440, h: 900, settle: 1200 });
  const m = await page.evaluate(() => [...document.querySelectorAll('th')].filter((t) => !t.textContent.trim() && !t.getAttribute('aria-label')).length);
  row('K6-G19 /data/data-table: 0 empty table headers', m === 0, { emptyTh: m });
  await browser.close();
});
await safe('K6-G20 range thumbs', async () => {
  const { browser, page } = await open({ url: `${DEMO}/forms/slider`, w: 1440, h: 900, settle: 1200 });
  const m = await page.evaluate(() => { const roots = [...document.querySelectorAll('[data-slot=slider], .glass-slider')].map((r) => [...r.querySelectorAll('[role=slider]')]).filter((t) => t.length > 1); return roots.map((ts) => ts.map((t) => t.getAttribute('aria-label') || t.getAttribute('aria-labelledby') || '')); });
  const dup = m.filter((names) => new Set(names).size < names.length).length;
  row('K6-G20 /forms/slider: each range thumb has its own name', m.length > 0 && dup === 0, { ranges: m });
  await browser.close();
});
await safe('K6-G21 configurator region', async () => {
  const { browser, page } = await open({ url: `${APP}?s=find`, waitReady: true, settle: 600 });
  const m = await page.evaluate(() => [...document.querySelectorAll('[data-probe=cfg] [role=region]')].map((r) => ({ label: r.getAttribute('aria-label'), labelledby: r.getAttribute('aria-labelledby') && document.getElementById(r.getAttribute('aria-labelledby'))?.textContent.trim() })));
  row('K6-G21 ConfiguratorLayer region is named', m.length > 0 && m.every((r) => r.label || r.labelledby), { regions: m });
  await browser.close();
});
await safe('K6-G22 slider holds no buttons', async () => {
  const bad = [];
  const { browser, page } = await open({ url: `${DEMO}/display/surface`, w: 1440, h: 900, settle: 1200 });
  bad.push(...(await page.evaluate(() => [...document.querySelectorAll('[role=slider]')].filter((s) => s.querySelector('button, [role=button]')).map((s) => s.getAttribute('aria-label') || s.className.toString().slice(0, 30)))));
  row('K6-G22 no role=slider contains a button (/display/surface)', bad.length === 0, { bad });
  await browser.close();
});
done('chromium');
```
