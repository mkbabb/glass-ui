# W-K.9 · W-FINDABLE: closed is a platform state · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B, scene `s=find`) and the built demo on :6271 |
| ships in | 11.0.0 |
| families | F-83 (all members) |
| depends on | W-F.2 (the disclosure's size re-target lands on this wave's closed rung; the two waves rewrite `disclosure.css` together), W-F.4 (the Collapsible body wrapper's extent), W-I.1 (the dock's switcher faces, which this wave makes findable, are rebuilt there) |
| dependants | none in the DAG |

## 1 · What it closes

| id | what | row in §3 |
|---|---|---|
| R7-01-01 (HIGH) | closed Accordion and Collapsible content is not in the DOM; find and text fragments miss it | 1 |
| R7-01-02 (MED) | off-snap Carousel members are `inert`; find and fragments cannot reach slide 3 | 3 |
| R7-01-03 (HIGH) | a force-mounted closed Collapsible returns to full size at opacity 1, AX-exposed | 2 |
| R8-01-01 (MED) | ConfiguratorLayer's closed body is `inert` + `aria-hidden` | 1 |
| R8-01-02 (MED) | not-current deck slides are `inert` + `aria-hidden` | 3 |
| R8-01-03 (LOW) | inactive switcher faces are `inert` tabpanels | 3 |

## 2 · The defect at HEAD

Sources: `collapsible/Collapsible.vue:44-45`, `accordion/Accordion.vue:46-47`, `accordion/AccordionItem.vue:32-33` strip `unmountOnHide` and `unmount-on-hide` from the consumer's attrs (reka's CollapsibleContent renders `hidden="until-found"` with a `beforematch` listener only when `unmountOnHide` is false); `carousel/CarouselItem.vue:54-55` and `deck/DeckSlide.vue:52-53` (`aria-hidden` + `inert` off the current member); `dock/DockLayer.vue:85` (`inert` on an inactive face); `configurator/ConfiguratorLayer.vue:191-192` (`aria-hidden` + `inert` on the closed body); `_shared/disclosure/disclosure.css:13` (the close keyframes, no fill mode) and `:112` (`animation-name: disclosure-close` is the only closed rule). `src/components` holds 3 `_unmountOnHide` strip sites and 0 `until-found`.

Measured with appendix A (`k9.mjs`): **Chromium 6 rows, 6 FAIL; Playwright WebKit 6 rows, 6 FAIL** (G5 and G6 there are page crashes on demo routes that mount GlassDock, not readings).

| gate | Chromium | Playwright WebKit |
|---|---|---|
| K9-G1 `#:~:text=quartzite%20borealis` against a closed AccordionItem: model `b`, needle in view | **FAIL** model `a`, needle not in the DOM | **FAIL** same |
| K9-G2 `window.find` reaches a closed Accordion item and a closed ConfiguratorLayer; the layer opens | **FAIL** both false; `aria-expanded="false"` | **FAIL** same |
| K9-G3 force-mounted Collapsible after one open-close: 0 px, no AX text, findable | **FAIL** `data-state="closed"`, 22 px, opacity 1, AX holds the text (findable true) | **FAIL** 21 px, same |
| K9-G4 `#:~:text=walrus%20tangerine` against Carousel slide 4: `active 3` | **FAIL** active 0, off-snap members `inert` | **FAIL** same |
| K9-G5 `/motion/deck#:~:text=Digit%20jumps`: slide 4 current | **FAIL** live "Slide 1 of 6: Welcome" | crash |
| K9-G6 `/dock/layers#:~:text=z-ordered%20surface%20stack`: the Layers tab selected | **FAIL** selected stays `Assets, Assets, Assets` | crash |
| K9-S static (below) | exit 1 | |

A typed Ctrl+F is not driven (headless has no find bar); text fragments and `window.find` run the same matcher and fire `beforematch` (the registry's control, a consumer `hidden="until-found"` panel, reveals under the same fragment).

## 3 · The cure

1. **Closed disclosures are `hidden="until-found"`.** The three roots stop stripping `unmountOnHide`; glass's default is `unmountOnHide: false`, and a consumer's `unmount-on-hide` is forwarded. reka's CollapsibleContent then renders `hidden="until-found"` and opens the root on `beforematch`; the root's `update:open` and `update:modelValue` carry it, so a controlled `v-model` sees the reveal. ConfiguratorLayer's closed body drops `inert` and `aria-hidden` and carries `hidden="until-found"` with a `beforematch` listener that sets `open`.
2. **Closed is a rest state, not a frame.** `disclosure.css`'s closed rung is `[data-state="closed"]:not([hidden])` at `block-size: 0; overflow: clip; visibility: hidden` after the exit, so a force-mounted body rests at 0 px, out of the AX tree, and findable once reka's `hidden="until-found"` is set on it (forceMount content gets the same attribute through the glass wrapper). W-F.2 re-targets the size motion onto this rung.
3. **Not-current members are findable.** Carousel and deck members drop `inert` and `aria-hidden` off the current index; their focusables take `tabindex="-1"` (the roving owner restores them on the current member). A deck slide and a switcher face that is not current carries `hidden="until-found"` only where it is not painted (deck pages are scroll-snap siblings and stay painted); `beforematch` writes through the owner's model: `deck.go(i)`, the Carousel's `scrollsnapchange` commit, the switcher tab's selection. Drill-in panes keep `inert` (chrome, not content).

## 4 · Files it touches

`src/components/collapsible/{Collapsible,CollapsibleContent}.vue`, `src/components/accordion/{Accordion,AccordionItem,AccordionContent}.vue`, `src/components/_shared/disclosure/disclosure.css`, `src/components/configurator/ConfiguratorLayer.vue`, `src/components/carousel/CarouselItem.vue`, `src/components/deck/DeckSlide.vue`, `src/components/dock/DockLayer.vue`. New `tests-visual/wired/findable.spec.ts` (appendix A).

## 5 · Acceptance gates

Every row in §2 is a gate; it passes at the inverted reading (model `b` with the needle in view; both found and the layer open; 0 px, no AX text, findable; `active 3`; "Slide 4 of 6"; `Layers` selected).

| id | gate | passes when | HEAD |
|---|---|---|---|
| K9-S | `! rg -q '_unmountOnHide' src/components && rg -q 'until-found' src/components` | exit 0 | **exit 1** (3 strip sites, 0 `until-found`) |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=find` (the force-mounted Collapsible after one cycle; the Carousel after the fragment); demo `/containers/accordion`, `/motion/deck` with the fragment, at 1440×900.
- **Themes:** light and dark.
- **Engines:** Chromium and Playwright WebKit (fixture rows); real Safari UNMEASURED (OW-3). Safari's `hidden="until-found"` support is itself unmeasured here; Playwright WebKit's reading after the cure is the only WebKit cell.
- **Paired capture:** HEAD shots `cap/head/k9-forcemount-closed-{light,dark}.png` (the closed Collapsible at 22 px, opacity 1). The wave records the same frame at 0 px; the π reading is G3's box height and opacity.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| Collapsible and Accordion ignore `unmount-on-hide` (always unmounted when closed) | default `unmountOnHide: false`; closed content stays mounted as `hidden="until-found"`; the consumer's value is honoured | a consumer relying on unmount for cost passes `unmount-on-hide` |
| a find or fragment inside closed content does nothing | it opens the disclosure through `update:open` / `update:modelValue` | a controlled consumer receives the event |
| off-snap Carousel and deck members are `inert` + `aria-hidden` | they are findable; their focusables are `tabindex="-1"` | |
| a force-mounted closed body returns to full size | it rests at 0 px, hidden | |

## 8 · Ledger rows

Closes F-83 (R7-01-01, R7-01-02, R7-01-03, R8-01-01, R8-01-02, R8-01-03).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** every closed or not-current surface is in the platform's own hidden state, and the platform's reveal writes through the owner's model.
- **Wave:** §2's rows and K9-S green in one run; WebKit fixture rows green.
- **Feature:** Ctrl+F on `/containers/accordion` for text in a closed item opens it; a shared `#:~:text=` link to a deck slide lands on that slide. One capture each.

## Appendix A · `k9.mjs` (lands as `tests-visual/wired/findable.spec.ts`)

Run against the W-K.1 appendix B harness (scene `s=find`: an Accordion with needle "quartzite borealis" in item `b`, a force-mounted Collapsible with "pelican marmalade", a Carousel with "walrus tangerine" on slide 4, a ConfiguratorLayer "Field" with "Diffusion radius").

```js
// W-K.9 born-RED probe: closed and not-current content is findable (F-83). node k9.mjs [--eng webkit]
import { open, sleep, runner, argEng, APP, DEMO } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k9');
// G1 · a text fragment against a closed AccordionItem opens it through the model, needle in the viewport
await safe('K9-G1 accordion fragment', async () => {
  const { browser, page } = await open({ eng, url: `${APP}?s=find&acc=a#:~:text=quartzite%20borealis`, waitReady: true, settle: 900 });
  const st = await page.evaluate(() => { const n = [...document.querySelectorAll('*')].find((e) => e.childElementCount === 0 && e.textContent.includes('quartzite borealis')); const r = n?.getBoundingClientRect(); return { acc: window.__state().acc, inDom: !!n, inView: !!r && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight }; });
  row('K9-G1 fragment opens the closed AccordionItem (model b), needle in view', st.acc === 'b' && st.inView, st);
  await browser.close();
});
// G2 · window.find reaches a closed Accordion item and a closed ConfiguratorLayer, and reveals the layer through its model
await safe('K9-G2 window.find', async () => {
  const { browser, page } = await open({ eng, qs: 's=find&acc=a', settle: 700 });
  const st = await page.evaluate(async () => { const a = window.find('quartzite borealis'); getSelection().removeAllRanges(); const c = window.find('Diffusion radius'); await new Promise((r) => setTimeout(r, 400)); return { accFound: a, cfgFound: c, cfgOpen: window.__state().cfg, expanded: document.querySelector('[data-probe=cfg] [aria-expanded]')?.getAttribute('aria-expanded') }; });
  row('K9-G2 find reaches closed Accordion and ConfiguratorLayer; layer opens', st.accFound && st.cfgFound && st.cfgOpen === true, st);
  await browser.close();
});
// G3 · a force-mounted closed Collapsible after one open-close cycle: box 0 tall, no AX region text, still findable
await safe('K9-G3 forcemount closed', async () => {
  const { browser, page } = await open({ eng, qs: 's=find', settle: 600 });
  await page.evaluate(async () => { window.__set; }); 
  await page.click('[data-probe=coll] button'); await sleep(700); await page.click('[data-probe=coll] button'); await sleep(1500);
  const st = await page.evaluate(() => { const c = document.querySelector('[data-probe=collc]'); const r = c.getBoundingClientRect(); return { state: c.getAttribute('data-state'), h: Math.round(r.height), opacity: getComputedStyle(c).opacity, hidden: c.getAttribute('hidden') }; });
  const ax = await page.locator('[data-probe=coll]').ariaSnapshot();
  const findable = await page.evaluate(() => { getSelection().removeAllRanges(); return window.find('pelican marmalade'); });
  row('K9-G3 closed force-mounted Collapsible: 0 px, no AX text, findable', st.h === 0 && !ax.includes('pelican') && findable, { ...st, axHasText: ax.includes('pelican'), findable });
  await browser.close();
});
// G4 · a text fragment against slide 4 of a Carousel makes it current
await safe('K9-G4 carousel fragment', async () => {
  const { browser, page } = await open({ eng, url: `${APP}?s=find#:~:text=walrus%20tangerine`, waitReady: true, settle: 1200 });
  const st = await page.evaluate(() => ({ car: window.__state().car, inert: !!document.querySelector('[data-probe=car] [inert]') }));
  row('K9-G4 fragment makes Carousel slide 4 current (active 3)', st.car === 3, st);
  await browser.close();
});
// G5 · demo deck: #:~:text=Digit%20jumps makes slide 4 current
await safe('K9-G5 deck fragment', async () => {
  const { browser, page } = await open({ eng, url: `${DEMO}/motion/deck#:~:text=Digit%20jumps`, w: 1440, h: 900, settle: 1800 });
  const live = await page.evaluate(() => [...document.querySelectorAll('[aria-live]')].map((e) => e.textContent.trim()).filter(Boolean)[0] || null);
  row('K9-G5 deck fragment makes the matching slide current', /^Slide 4 of/.test(live || ''), { live });
  await browser.close();
});
// G6 · demo switcher: a fragment in an inactive dock face selects its tab
await safe('K9-G6 switcher fragment', async () => {
  const { browser, page } = await open({ eng, url: `${DEMO}/dock/layers`, w: 1440, h: 900, settle: 1500 });
  const before = await page.evaluate(() => [...document.querySelectorAll('[role=tab][aria-selected=true]')].map((t) => t.getAttribute('aria-label') || t.textContent.trim()));
  await page.goto(`${DEMO}/dock/layers#:~:text=z-ordered%20surface%20stack`, { waitUntil: 'networkidle' }); await sleep(1500);
  const after = await page.evaluate(() => [...document.querySelectorAll('[role=tab][aria-selected=true]')].map((t) => t.getAttribute('aria-label') || t.textContent.trim()));
  row('K9-G6 switcher fragment selects the Layers tab', after.includes('Layers') && JSON.stringify(after) !== JSON.stringify(before), { before, after });
  await browser.close();
});
done(eng);
```
