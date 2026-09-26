# W-E.9 · W-CEL-CONTAINER: specimens and components lay out by their container · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, library and demo built there; probes drive the built demo and the band-E fixture app (W-E.1 appendix B) |
| ships in | 11.0.0 |
| families | F-33 (#59 W-LAYOUT; the `layout-canon` latches W-A.2 retires to this wave at `tests/styles/layout-canon.test.ts:371,403`). The configurator envelope (C-13c, R11, R4-02-07, the `:390` latch) is W-E.14's |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #59 | the demo keys layout on the viewport: 32 story files carry `sm:`/`md:`/`lg:` variants, one `matchMedia` width query survives, one raw `vh` envelope survives |
| C-13c / R11, R4-02-07 | the configurator envelope: W-E.14's, a disease row's own wave (fix-2, FA-21). This wave's cel containers are its base |
| F-33 nested family | a nested family's body is `display: block` with no gap; two families render a one-tab tablist |
| F-33 SegmentedTabs | the fold is keyed on a `matchMedia` breakpoint and off by default, so a strip overflows its own container. With UIA-F-41 and A2-FO-L2-14 (SegmentedTabs has no overflow mode), handed from W-E.7's mechanism table: E9-G5 |
| F-33 LabeledField | the horizontal arm is keyed on the viewport (`@media (max-width: 36rem)`), and its switch does not reach the field's end |
| A2-FO-L3-7 (F-33 mechanism row) | LabeledSwitch's horizontal arm collapses on `@media (max-width: 36rem)` (`labeled-field/LabeledField.vue:127-133`): E9-G6 and E9-G7 |
| UIA-F-136 (F-33 mechanism row) | EasingCurve's axis captions are `text-micro` at every specimen size (`easing/EasingCurve.vue:186-187`); they do not follow the specimen's container |
| R2-08-15 | the compositions settings story: closed by W-E.10's compositions prune, not here |

## 2 · The defect at HEAD

**The three latches, flipped.** In the scratch worktree, changing `it.fails` to `it` at `:371`, `:390` and `:403` and running `npx vitest run tests/styles/layout-canon.test.ts` gives 3 failures:

- `:371`: 32 demo story files carry a viewport-keyed variant;
- `:390`: 1 width-keyed `matchMedia` (`demo/stories/containers/configurator.vue`, `matchMedia("(max-width: 720px)")`);
- `:403`: 1 raw `vh` envelope.

Measured with appendix A (`node e9.mjs`), Chromium: **9 rows, 8 FAIL**, load 34.7 → 35.7.

| gate | HEAD reading | source |
|---|---|---|
| G1 configurator controls region ≥ 44 px | `/containers/configurator` 1440: 8 px; 390: 18 px. `/substrates/aurora` 390: 0 px (C-13c). `/substrates/blob` 390: 160 px (PASS) | `configurator/styles.css:317-321`: rows `auto minmax(var(--configurator-stage-min, 18rem), auto) minmax(0, 1fr)`, so the stage keeps 18 rem and the controls take the remainder; `demo/chassis/layout.css:59` `--stage-block: min(62svh, 44rem)` caps the envelope |
| G2 rem growth | 640×400: 0 px; 1440 with a 24 px root: 0 px | the same rows; 18 rem grows with the root |
| G3 nested families | 5 families; every nested body `display: block`, `row-gap: normal`; one-tab tablists at `/foundations/paper-glass` and `/feedback/toast` | the chassis emits `.story-nested-body` with no layout, and a tablist for any family |
| G4 SegmentedTabs fold | a 4-tab strip in a 328 px container at 844×390: strip 352 px against a 328 px box | `tabs/composables/useTabResponsive.ts:105` keys the fold on `matchMedia((min-width: <breakpoint>))`; `SegmentedTabs.vue:47` defaults `responsive: false` |
| G5 LabeledSwitch, horizontal, in a Dialog at 844 | the switch ends at 371 against the field's end at 657 (field 470 px wide) | `labeled-field/LabeledField.vue:127` `@media (max-width: 36rem)`; the horizontal grid does not end-align the control |

Note on `--configurator-size`: the latch comment at `:390` says the container should set `--configurator-size` for a `@container style(--configurator-size)` contract. W-C.4 lists `--configurator-size` as dead (declared, never read) and deletes it. This wave does not revive it; the envelope is keyed on size queries (§3.3).

## 3 · The cure

1. **Cels are containers.** `StorySection`'s `container: cel / inline-size` is the key for every specimen. The 32 files' `sm:`/`md:`/`lg:` variants become Tailwind container variants on the cel (`@sm:`, `@md:`, `@lg:` against `@container/cel`). A deliberate arity (a two-column specimen) is written as explicit tracks under `@container cel (min-width: …)`, and the wave record lists each re-keyed site.
2. **The studio envelope** is W-E.14's (C-13c).
3. **The nested-family seam.** `.story-nested-body` is `display: grid; gap: var(--space-family)`. A family with one member renders its member without a tablist.
4. **SegmentedTabs folds on its own inline size.** `useTabResponsive` observes the strip's own box (ResizeObserver) and compares its `max-content` inline size with the box. It drops `matchMedia`. The fold is on by default (`responsive: true`). Its collapse mode is the existing Select fold: when the strip does not fit, it renders the Select. The `breakpoint` prop is deleted.
5. **LabeledField is container-keyed.** `.labeled-field` is `container: field / inline-size`. The horizontal arm's `@media (max-width: 36rem)` becomes `@container field (max-width: 36rem)`. The horizontal grid is `minmax(0, 1fr) auto` with the control `justify-self: end`, so the switch ends at the field's end.
6. **The latches become born-REDs.** `:371` and `:403` become ordinary `it`s, green when this wave lands. `:390` (the configurator story's `matchMedia`) is W-E.14's.
7. **Specimen captions follow the specimen.** `EasingCurve`'s root is `container: curve / size`; its axis captions size from the container (`clamp(var(--type-micro) * 0.8, 8cqi, var(--type-small))`), so a thumbnail's caption shrinks with it.

## 4 · Files it touches

`src/components/configurator/styles.css`, `src/components/tabs/SegmentedTabs.vue`, `src/components/tabs/types.ts` (the `breakpoint` prop at `:43-47`), `src/components/tabs/composables/useTabResponsive.ts`, `src/components/labeled-field/LabeledField.vue`, `demo/chassis/layout.css`, the demo chassis component that emits `.story-nested-body` and the family tablist, `demo/stories/containers/configurator.vue`, the 32 story files the latch at `:371` lists, `tests/styles/layout-canon.test.ts`. New: `tests-visual/wired/cel-container.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E9-G1 · the latches | `npx vitest run tests/styles/layout-canon.test.ts` with `:371` and `:403` as `it` | 0 failures | **2 failures** (32 files; 1 raw `vh`) |
| E9-G4 · nested families | appendix A G3 | every nested body grid or flex with a gap; no one-tab tablist | **5 of 5 families bad** |
| E9-G5 · fold | appendix A G4, plus the 8-tab strip in a 384 px seat that W-E.7 hands over (`s=count`, `[data-probe=c-seg]`) | strip ≤ box, both | **352 > 328**; **592 > 384** |
| E9-G6 · LabeledSwitch | appendix A G5 | switch end within 2 px of the field end | **371 vs 657** |
| E9-G7 · no viewport keys in the fold | `! grep -q 'matchMedia' src/components/tabs/composables/useTabResponsive.ts && ! grep -q '@media (max-width: 36rem)' src/components/labeled-field/LabeledField.vue` | exit 0 | **exit 1** |
| E9-G8 · captions follow the specimen (UIA-F-136) | fix-2's probe scene `mease`: the axis caption's computed font size in a 120 px and a 480 px `EasingCurve`, 1440×900 | the 120 px caption is smaller than the 480 px caption | **FAIL**, both engines: 11 = 11 |

Can each fail and pass? Every row fails at HEAD. G1 runs the latches and G7 is static. The envelope's passing control and its `PI_PLANT` bite moved with the envelope to W-E.14.

## 6 · π and DELTA obligations

- **Surfaces:** demo `/containers/configurator`, `/substrates/aurora`, `/substrates/blob` at 1440×900, 390×844, 640×400 and a 24 px root; the five nested families; the fixture scenes `fold`, `count` and `lsw`.
- **Themes:** light and dark for the paired captures.
- **Engines:** Chromium measured. Playwright WebKit crashes on demo routes at HEAD, recorded as crashes; the wired spec runs the fixture rows (G4, G5) on it. Real Safari is UNMEASURED (OW-3).
- **Paired capture:** appendix A writes `envelope-*-{1440,390}.png` and `lsw-844.png`. The DELTA pairs them at `<E9-base>` and at the wave: the aurora studio at 390 with no controls, then with a scrolling controls region. The before set is taken at `<E9-base>` with `WAVE=W-E.9`, into `.cache/evidence/W-E.9/e9/`; formation's HEAD set sat in a session scratchpad and is not evidence.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| SegmentedTabs `responsive` default `false`, fold at a viewport `breakpoint` | `responsive` default `true`, fold when the strip does not fit its own box | the `breakpoint` prop is removed; a strip in a narrow card folds to the Select at any viewport width |
| LabeledField's horizontal arm stacks below a 36 rem viewport | below a 36 rem field | a horizontal field in a wide Dialog on a phone-width viewport stays horizontal if the field is wide enough |

## 8 · Ledger rows

Closes #59, A2-FO-L3-7 (E9-G6, E9-G7) and UIA-F-136 (E9-G8). The `layout-canon` latches at `:371` and `:403` retire here; C-13c (R11), R4-02-07 and the `:390` latch are W-E.14's. R2-08-15 is recorded as closed by W-E.10's compositions prune.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** every layout decision in the demo and in the three components keys on a container. The only width media query left in `src/styles` is the gap step (W-E.7).
- **Wave:** E9-G1..G7 green in one run.
- **Feature:** the aurora studio at 390×844 and at 640×400: the stage shrinks and the controls scroll in their own port. A four-tab strip in a 328 px card folds to its Select while a sibling card at 600 px shows the strip. Both are in one frame.

## Appendix A · `e9.mjs` (lands as `tests-visual/wired/cel-container.spec.ts`)

```js
// W-E.9 born-RED probe: specimens and components lay out by their container.
// node e9.mjs   (the three layout-canon latches are read by vitest; see the spec)
import { open, rectOf, sleep, load, CAP, DEMO, ENG } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const safe = async (label, fn) => { try { await fn(); } catch (e) { row(label, false, { error: String(e.message).split('\n')[0] }); } };
fs.mkdirSync(`${CAP}/e9`, { recursive: true });
// the controls region is at least one control tall, or scrolls inside a port at least one control tall
const controls = (page) => page.evaluate(() => [...document.querySelectorAll('.configurator-controls')].map((e) => { const r = e.getBoundingClientRect(); const port = /(auto|scroll)/.test(getComputedStyle(e).overflowY) ? r.height : 0; return { h: +r.height.toFixed(0), port: +port.toFixed(0) }; }));
// G1 · the configurator envelope (C-13c, R2-08-06): the controls region is ≥ 44 px tall
for (const [route, w, h, t] of [['/containers/configurator', 1440, 900, 0], ['/containers/configurator', 390, 844, 1], ['/substrates/aurora', 390, 844, 1], ['/substrates/blob', 390, 844, 1]]) await safe(`E9-G1 ${route} ${w}`, async () => {
  const { browser, page } = await open({ w, h, touch: !!t, mobile: !!t, url: DEMO + route, settle: 2000 });
  const c = await controls(page);
  row(`E9-G1 envelope ${route} ${w}`, c.length > 0 && c.every((x) => x.h >= 44), c);
  await page.screenshot({ path: `${CAP}/e9/envelope-${route.replace(/\//g, '_')}-${w}.png` });
  await browser.close();
});
// G2 · rem growth: at 640×400 and at a 24 px root the controls stay reachable (R4-02-07)
for (const [label, w, h, root] of [['640x400', 640, 400, null], ['1440 root24', 1440, 900, '24px']]) await safe(`E9-G2 ${label}`, async () => {
  const { browser, page } = await open({ w, h, url: DEMO + '/containers/configurator', settle: 1500 });
  if (root) { await page.addStyleTag({ content: `html{font-size:${root} !important}` }); await sleep(800); }
  const c = await controls(page);
  row(`E9-G2 envelope ${label}`, c.length > 0 && c.every((x) => x.h >= 44 || x.port >= 44), c); await browser.close();
});
// G3 · the nested-family seam: a nested body is styled (gap > 0), and no family renders a one-tab tablist
await safe('E9-G3 nested families', async () => {
  const b = await ENG.chromium.launch(); const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(DEMO + '/forms/chip', { waitUntil: 'networkidle' }); await sleep(800);
  const routes = await page.evaluate(() => document.querySelector('#app').__vue_app__.config.globalProperties.$router.getRoutes().map((x) => x.path).filter((p) => !p.includes(':') && p.split('/').length === 3));
  const fam = [];
  for (const r of routes) { try { await page.goto(DEMO + r, { waitUntil: 'networkidle', timeout: 20000 }); await sleep(400);
    const m = await page.evaluate(() => { const n = [...document.querySelectorAll('.story-nested-body')]; if (!n.length) return null; const cs = getComputedStyle(n[0]); const tl = n[0].closest('main')?.querySelector('[role=tablist]'); return { nested: n.length, display: cs.display, gap: cs.rowGap, tabs: tl ? tl.querySelectorAll('[role=tab]').length : null }; });
    if (m) fam.push([r, m]); } catch {} }
  await b.close();
  const bad = fam.filter(([, m]) => m.display !== 'grid' && m.display !== 'flex' || m.gap === 'normal' || m.gap === '0px' || m.tabs === 1);
  row('E9-G3 nested family seam', fam.length > 0 && bad.length === 0, { families: fam.length, bad: bad.slice(0, 6) });
});
// G4 · SegmentedTabs folds on its own inline size: a 4-tab strip in a 328 px container at 844×390 does not overflow it
await safe('E9-G4 segmented fold', async () => {
  const { browser, page } = await open({ w: 844, h: 390, qs: 's=fold' });
  const m = await page.evaluate(() => { const box = document.querySelector('[data-probe=foldbox]'); const s = document.querySelector('[data-probe=fold]'); return { box: box.clientWidth, strip: s.scrollWidth, doc: document.documentElement.scrollWidth }; });
  row('E9-G4 segmented fold in a 328 container', m.strip <= m.box && m.doc <= 844, m); await browser.close();
});
// G5 · LabeledField's horizontal arm is container-keyed: in a Dialog at 844 the switch ends at the field's inline end
await safe('E9-G5 labeled switch', async () => {
  const { browser, page } = await open({ w: 844, h: 700, qs: 's=lsw&auto=dlg' }); await sleep(600);
  const m = await page.evaluate(() => { const f = document.querySelector('[data-probe=lsw0]'); const sw = f.querySelector('[role=switch]'); const fr = f.getBoundingClientRect(), sr = sw.getBoundingClientRect(); return { fieldEnd: +fr.right.toFixed(0), switchEnd: +sr.right.toFixed(0), fieldW: +fr.width.toFixed(0) }; });
  row('E9-G5 horizontal switch ends at the field end', Math.abs(m.fieldEnd - m.switchEnd) <= 2, m);
  await page.screenshot({ path: `${CAP}/e9/lsw-844.png` }); await browser.close();
});
out.load2 = load(); fs.writeFileSync(`${CAP}/e9.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e9: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
```

The 8-tab row of E9-G5 is appendix A of W-E.7, G4's `seg` field (592 px at HEAD). The wired spec asserts it against the 384 px seat.
