# W-F.5 · W-DIRECTION: direction and writing mode are inputs to every axis · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5961 |
| ships in | 11.0.0 |
| families | F-79 (the direction and writing-mode members; `REG` band F) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| member | what |
|---|---|
| the worm pitch | `worm.ts:128` computes the pitch as a signed physical `left` difference; under RTL the pitch is negative, the bodies rest 84 px from the active dot and the neck never fades |
| the deck extent guards | `useDeckSnap.ts:84`, `:104`, `:145` compare `scrollLeft` against `0..max`; in RTL `scrollLeft` runs `0..-max`, so every guard refuses the page turn |
| the dock run | `useDockRun.ts:149` clamps the port offset to `0..max` and `:251-253` maps ArrowLeft/ArrowRight to −1/+1 in DOM order |
| physical key tables and swipes | `PagerDots.vue:291-292`, `useDeckKeyboard.ts:70-71`, `useDeckSwipe.ts:56`, `Timeline.vue:214-215` |
| unmirrored glyphs | `CarouselPager.vue:29-32`: the previous/next chevrons are fixed `ChevronLeft`/`ChevronRight` |
| physical snap axis | `carousel/styles.css:23` (`scroll-snap-type: x mandatory`) and `:56` |
| reka roots stamping `dir="ltr"` | 16 files mount a reka root; only `DropdownMenu.vue` binds `dir`; the library has 0 `ConfigProvider` uses and 5 `:dir(rtl)` rules. Every other root defaults to `ltr` and writes `dir="ltr"` into an RTL page |
| the Sheet's `side` | physical `left`/`right` in an API that places a surface on the inline axis |

The library already holds the correct shapes: `useTabRovingFocus.ts:166-179` maps keys through direction, `useFadingScroll.ts:35-60` normalizes RTL `scrollLeft` (`normalizeHorizontalScrollLeft`), and `run.css:557-600` places the dock's edge caps logically. The cure lifts those, not a new approach.

## 2 · The defect at HEAD

`node f5.mjs` (appendix A), Chromium, the document served as a real `<html dir="rtl">` (the HTML response is rewritten; an init script that sets the attribute is overwritten by the parser). **7 rows, 7 FAIL** (load 121.4 → 207.1).

| gate | HEAD reading |
|---|---|
| G1 RTL pager at rest, `/navigation/pager-dots` | body offsets from the active dot **[0, 84]**; neck opacity **1**, scale **"112 1"** |
| G2 RTL CarouselPager Next, `/navigation/carousel` | pitch 145; `scrollLeft` **0 → 0** |
| G3 RTL dock, `/dock/overview` (the `.dock-run.is-active` run, 9 seats, port [532, 828]) | ArrowRight moves focus **788 → 740** (left); End focuses **[404, 444]**, outside the port; `scrollLeft` **0** |
| G4 RTL document, 5 battery routes | **25** `[dir="ltr"]` nodes (slider 18, checks 3, dock 3, command 1, select 0) |
| G5 RTL Slider with no `dir` prop | stamped `dir` **ltr**; track [927, 1310]; the fill is left-anchored |
| G6 RTL PagerDots ArrowRight; Next chevron | focus **1107 → 1079** (left); chevron not mirrored |
| G7 `writing-mode: vertical-rl`, `.carousel-strip` | `scroll-snap-type` **x mandatory** |

The gates pass when direction is honoured: with the document LTR the same probe code reads G1 bodies [0, 0] with neck 0 and G2 `scrollLeft` 145 = pitch.

## 3 · The cure

1. **One `useDirection(el)` composable** (`src/composables/dom/useDirection.ts`) returns `{ dir, inlineSign, blockAxis }` resolved from the element's computed `direction` and `writing-mode`, updated when either changes (read on mount and on a `dir`/`style` attribute mutation of the nearest ancestor that sets them). Every reka root the library mounts (the 16 files) receives `:dir="direction.dir"`; no root stamps a fixed value. `ConfigProvider` is not introduced: the library reads the page, the consumer sets `dir` on the page.
2. **Magnitudes with a separate sign.** Geometry that measures along the inline axis (the worm's pitch, the deck's page, the dock run's port offset) works in positive magnitudes from the inline start; the sign is applied only where a physical coordinate is written. `worm.ts:128` takes `abs` of the pitch and applies `inlineSign` to the translate.
3. **One logical-offset helper.** `normalizeHorizontalScrollLeft` moves out of `useFadingScroll.ts` into `src/composables/dom/logicalScroll.ts` as `readInlineOffset(el)` / `writeInlineOffset(el, v)` (0 at the inline start, positive toward the end, in every engine). `useDeckSnap`, `useDockRun`, the carousel, `useFadingScroll` and W-F.3's `useScrollChrome` read and write through it. The `0..max` guards and clamps then hold in both directions.
4. **Keys and swipes through direction.** One `inlineKeyStep(key, dir)` (from `useTabRovingFocus.ts:166-179`) maps ArrowLeft/ArrowRight to ±1 in reading order; PagerDots, the deck keyboard, the deck swipe, Timeline and the dock run use it. Home/End stay reading-order.
5. **Mirrored glyphs.** Directional glyphs (the carousel chevrons, the pager's arrows, the timeline's) carry `.glyph-inline` which applies `scale: -1 1` under `:dir(rtl)`; the component names stay previous/next, never left/right.
6. **Logical snap axis.** `.carousel-strip` snaps on `inline` (`scroll-snap-type: inline mandatory`), and its padding and gap rules use logical properties.
7. **The Sheet's `side` is logical.** `side: "top" | "bottom" | "start" | "end"`; `left`/`right` are removed (§7). The owner sees this rename in the W-B.2 letter before the wave lands.

## 4 · Files it touches

New: `src/composables/dom/useDirection.ts`, `src/composables/dom/logicalScroll.ts`, `tests-visual/wired/direction.spec.ts` (appendix A). Changed: `src/components/pager-dots/{worm.ts,PagerDots.vue}`, `src/components/deck/composables/{useDeckSnap.ts,useDeckKeyboard.ts,useDeckSwipe.ts}`, `src/components/dock/composables/useDockRun.ts`, `src/components/timeline/Timeline.vue`, `src/components/carousel/{CarouselPager.vue,styles.css}`, `src/components/fading-scroll/composables/useFadingScroll.ts`, `src/components/tabs/composables/useTabRovingFocus.ts` (its key map moves to the shared helper), the 16 reka-root files, `src/components/sheet/{SheetContent.vue,motion.ts,styles.css}` (`SidePlacement`, default `"right"` at `SheetContent.vue:53` becomes `"end"`; the `left`/`right` cases at `motion.ts:19-22` become `start`/`end` with `inlineSign`), `MIGRATION.md`.

## 5 · Acceptance gates

All seven are appendix A's rows; each FAILs at HEAD as recorded in §2 and passes after the wave.

| id | passes when |
|---|---|
| F5-G1 | RTL pager at rest: every body within 0.5 px of the active dot, neck opacity 0 |
| F5-G2 | RTL CarouselPager Next: the strip moves one pitch toward the inline end within 1 s (`scrollLeft = −pitch ± 2`) |
| F5-G3 | RTL dock: ArrowRight moves focus to the physically right neighbour, and End leaves the last seat inside the port |
| F5-G4 | 0 `[dir="ltr"]` nodes on `/forms/slider`, `/forms/select`, `/forms/checks`, `/dock/overview`, `/containers/command` in an RTL document |
| F5-G5 | an RTL Slider with no prop anchors its fill at the right edge (±1 px) |
| F5-G6 | RTL PagerDots ArrowRight moves the active dot right, and the Next chevron is mirrored |
| F5-G7 | under `writing-mode: vertical-rl`, `.carousel-strip` snaps on `inline` or `block` |

Static twin (lands with the wave, W-A.3 wiring): `scrollLeft` is read or written only in `logicalScroll.ts`; `ArrowLeft`/`ArrowRight` literals appear only in `inlineKeyStep`; no `.vue` file under `src/components` mounts a reka `*Root` without `:dir`. At HEAD the first two each list the sites in §1 and the third lists 15 files. Planted bites: a `dir="ltr"` literal on one Select root reddens G4; replacing `abs` in the worm pitch reddens G1.

## 6 · π and DELTA obligations

- `/navigation/pager-dots`, `/navigation/carousel`, `/dock/overview`, `/forms/slider`: RTL document, light and dark, 1440×900 and 390×844, one still each at rest plus a strip of one Next press and one ArrowRight. HEAD shows the stretched worm, the unmoved strip and the left-anchored fill; the wave shows each mirrored.
- The carousel under `writing-mode: vertical-rl`, one still.
- Paired with the LTR stills of the same routes to show nothing moved in LTR (the DELTA's null half).
- Engines: Chromium measured. Playwright WebKit crashes on the demo routes (W-F.1 §2); record each cell as a crash or a reading. Real Safari UNMEASURED (OW-3). Safari's RTL `scrollLeft` convention is the case `logicalScroll.ts` exists for, so the real-Safari cell is owed at the close.

## 7 · MIGRATION rows

| removed | replacement |
|---|---|
| Sheet `side: "left" \| "right"` | `side: "start" \| "end"` (`top`/`bottom` unchanged) |
| a reka root writing `dir="ltr"` by default | the root takes the page's resolved direction; a consumer that wants LTR inside an RTL page sets `dir="ltr"` on a wrapper |
| `normalizeHorizontalScrollLeft` (private to `useFadingScroll`) | `readInlineOffset` / `writeInlineOffset` from `composables/dom/logicalScroll` |
| `.carousel-strip` `scroll-snap-type: x mandatory` | `inline mandatory`; a consumer override on `x` restates it on `inline` |

No alias for `left`/`right`.

## 8 · Dependencies

PLAN §5, the one record of edges (this wave reads the position-derived scroll state through the logical helper and edits the Sheet). The owner glance on the Sheet rename rides the W-B.2 letter.

## 9 · Ledger rows it closes

F-79 in full.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** every inline-axis consumer reads one direction source and one offset helper; W-F.3's chrome and the dock run gain RTL for free.
- **Wave:** F5-G1..G7 green in one run, LTR controls unchanged.
- **Feature:** an Arabic-locale page pages, focuses and fills in reading order, captured.

## Appendix A · `f5.mjs` (lands as `tests-visual/wired/direction.spec.ts`; `lib.mjs` is W-F.2 appendix D, whose `htmlAttrs` option rewrites the HTML response)

```js
// W-F.5 born-RED probe: direction and writing mode are inputs to axis code (F-79). Served as a real
// <html dir="rtl"> document (the attribute set before the app mounts). node f5.mjs [--only G1,...] [--eng webkit]
import { open, reporter, sleep } from './lib.mjs';
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const want = (g) => !only || only.includes(g);
const R = reporter('f5');

// G1 — at rest in RTL the worm's neck is at opacity 0 and both bodies sit within 0.5 px of the active dot
if (want('G1')) {
  const { browser, page } = await open('/navigation/pager-dots', { htmlAttrs: ' dir="rtl"' });
  const r = await page.evaluate(() => { const rail = [...document.querySelectorAll('.pager-dots')].find((e) => e.querySelectorAll('.pager-dot').length >= 3 && e.getBoundingClientRect().width > 0); const c = (e) => { const r = e.getBoundingClientRect(); return r.left + r.width / 2; }; const act = rail.querySelector('.goo-dot[data-active]'); const ax = c(act); const off = [...rail.querySelectorAll('.goo-body')].map((b) => +Math.abs(c(b) - ax).toFixed(1)); const neck = rail.querySelector('.goo-neck'); return { bodyOffsets: off, neckOpacity: +getComputedStyle(neck).opacity, neckScale: neck.style.scale || getComputedStyle(neck).scale }; });
  R.row('F5-G1 RTL pager at rest: bodies within 0.5 px of the active dot, neck opacity 0', r.bodyOffsets.every((o) => o <= 0.5) && r.neckOpacity === 0, r);
  await browser.close();
}
// G2 — an RTL CarouselPager "Next" pages the strip: scrollLeft = -pitch within 1 s
if (want('G2')) {
  const { browser, page } = await open('/navigation/carousel', { htmlAttrs: ' dir="rtl"' });
  const r = await page.evaluate(async () => { const next = document.querySelector('main button[aria-label="Next slide"]'); let strip = null; for (let n = next; n && !strip; n = n.parentElement) strip = n.querySelector('.carousel-strip'); strip.scrollIntoView({ block: 'center', behavior: 'instant' }); await new Promise((r) => setTimeout(r, 400)); const items = [...strip.children]; const pitch = Math.abs(items[1].offsetLeft - items[0].offsetLeft); const s0 = strip.scrollLeft; next.click(); await new Promise((r) => setTimeout(r, 1000)); return { pitch, scrollLeftBefore: s0, scrollLeftAfter: Math.round(strip.scrollLeft) }; });
  R.row('F5-G2 RTL CarouselPager Next: scrollLeft = -pitch within 1 s (+-2 px)', Math.abs(r.scrollLeftAfter + r.pitch) <= 2, r);
  await browser.close();
}
// G3 — RTL dock: End puts the last seat inside the port; ArrowRight moves focus to the physically right neighbour
if (want('G3')) {
  const { browser, page } = await open('/dock/overview', { htmlAttrs: ' dir="rtl"' });
  const found = await page.evaluate(() => { const runs = [...document.querySelectorAll('.dock-run.is-active')].filter((r) => r.scrollWidth > r.clientWidth + 20 && r.getBoundingClientRect().width > 0); if (!runs.length) return null; const run = runs[0]; run.scrollIntoView({ block: 'center', behavior: 'instant' }); run.setAttribute('data-probe-run', ''); const seats = [...run.querySelectorAll('button, [role=button]')].filter((b) => b.getBoundingClientRect().width > 0); seats[0].setAttribute('data-probe-first', ''); return { seats: seats.length }; });
  if (!found) R.row('F5-G3 RTL dock End reaches the last seat', false, { error: 'no overflowing run' });
  else {
    await sleep(300); await page.focus('[data-probe-first]');
    const x0 = await page.evaluate(() => document.activeElement.getBoundingClientRect().left);
    await page.keyboard.press('ArrowRight'); await sleep(250);
    const x1 = await page.evaluate(() => document.activeElement.getBoundingClientRect().left);
    await page.keyboard.press('End'); await sleep(700);
    const r = await page.evaluate(() => { const run = document.querySelector('[data-probe-run]'); const a = document.activeElement.getBoundingClientRect(), p = run.getBoundingClientRect(); return { focused: [Math.round(a.left), Math.round(a.right)], port: [Math.round(p.left), Math.round(p.right)], scrollLeft: Math.round(run.scrollLeft) }; });
    const inside = r.focused[0] >= r.port[0] - 1 && r.focused[1] <= r.port[1] + 1;
    R.row('F5-G3 RTL dock: ArrowRight moves right; End puts the last seat inside the port', x1 > x0 && inside, { ...r, arrowRightFrom: Math.round(x0), arrowRightTo: Math.round(x1), seats: found.seats });
  }
  await browser.close();
}
// G4 — no reka root stamps dir="ltr" inside an RTL document (battery routes)
if (want('G4')) {
  const counts = {};
  for (const route of ['/forms/slider', '/forms/select', '/forms/checks', '/dock/overview', '/containers/command']) {
    const { browser, page } = await open(route, { htmlAttrs: ' dir="rtl"', settle: 900 });
    counts[route] = await page.evaluate(() => document.querySelectorAll('[dir="ltr"]').length);
    await browser.close();
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  R.row('F5-G4 RTL document: 0 [dir="ltr"] nodes on the battery routes', total === 0, { total, counts });
}
// G5 — a Slider inside dir="rtl" with no prop anchors its fill at the inline start (right)
if (want('G5')) {
  const { browser, page } = await open('/forms/slider', { htmlAttrs: ' dir="rtl"' });
  const r = await page.evaluate(() => { const s = [...document.querySelectorAll('.glass-slider')].find((e) => e.getBoundingClientRect().width > 80 && !e.closest('[dir="rtl"]:not(html)')); if (!s) return { error: 'no slider' }; const track = s.querySelector('.slider-track') || s; const range = s.querySelector('.slider-range'); const t = track.getBoundingClientRect(), g = range?.getBoundingClientRect(); return { stampedDir: s.getAttribute('dir'), trackLR: [Math.round(t.left), Math.round(t.right)], rangeLR: g ? [Math.round(g.left), Math.round(g.right)] : null }; });
  const ok = !r.error && r.rangeLR && Math.abs(r.rangeLR[1] - r.trackLR[1]) <= 1;
  R.row('F5-G5 RTL Slider without a dir prop: fill anchored at the right edge', ok, r);
  await browser.close();
}
// G6 — in RTL, ArrowRight on PagerDots moves the active dot to its physically right neighbour; the Next chevron mirrors
if (want('G6')) {
  const { browser, page } = await open('/navigation/carousel', { htmlAttrs: ' dir="rtl"' });
  const r = await page.evaluate(async () => { const rail = [...document.querySelectorAll('.pager-dots')].find((e) => e.getBoundingClientRect().width > 0); const btns = [...rail.querySelectorAll('button')]; btns[2].click(); btns[2].focus(); await new Promise((r) => setTimeout(r, 700)); const c = (e) => e.getBoundingClientRect().left; const x0 = c(document.activeElement); document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await new Promise((r) => setTimeout(r, 700)); const act = rail.querySelector('.goo-dot[data-active]'); const nextSvg = document.querySelector('main button[aria-label="Next slide"] svg'); const m = new DOMMatrix(getComputedStyle(nextSvg).transform === 'none' ? undefined : getComputedStyle(nextSvg).transform); const sc = getComputedStyle(nextSvg).scale; return { focusedX: Math.round(x0), activeAfterX: Math.round(c(act)), nextChevronMirrored: m.a < 0 || /^-1/.test(sc) }; });
  R.row('F5-G6 RTL: ArrowRight moves the pager right; the Next chevron is mirrored', r.activeAfterX > r.focusedX && r.nextChevronMirrored, r);
  await browser.close();
}
// G7 — under writing-mode: vertical-rl the carousel snaps on its inline axis
if (want('G7')) {
  const { browser, page } = await open('/navigation/carousel', { htmlAttrs: ' style="writing-mode: vertical-rl"' });
  const r = await page.evaluate(() => { const s = document.querySelector('.carousel-strip'); return { scrollSnapType: getComputedStyle(s).scrollSnapType }; });
  R.row('F5-G7 vertical-rl: .carousel-strip snaps on the inline or block axis, not physical x', /inline|block/.test(r.scrollSnapType), r);
  await browser.close();
}
R.done();
```
