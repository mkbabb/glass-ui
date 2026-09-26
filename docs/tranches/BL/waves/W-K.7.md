# W-K.7 · W-ARRIVAL: one owner per arrival · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (`src` = `f3ad78d0` = published 10.1.0); the band-K fixture (W-K.1 appendix B) and the built demo on :6271 |
| ships in | 11.0.0 |
| families | F-43 (all members) and its inbound rows; #29's RT-29C and #32's capture clause (census) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what | row in §3 |
|---|---|---|
| L01a-29, L04-F19, L05a-07, R2-02-13 | popstate bypasses the route transition (Back and Forward swap in one frame) | 1 |
| R5-01-02 | a push waits on the network inside the frozen update; the substrate swallows a skipped or failed transition | 1, 2 |
| R7-01-09 | Back lands at scroll 0; a fresh `#hash` load never resolves | 3 |
| R3-01-09 | FamilyTabs swaps members through an unloaded async chunk (a 0-height panel) | 4 |
| R3-01-05 | HandMark draws twice when fonts land after mount | 5 |
| R3-01-04 | the Alerts' mount entrance plays inside the route view transition | 6 |
| R4-01-07, R4-01-08, R4-02-11 | the indicator travels its first placement; measures through a live ancestor transform; never re-measures on the selected button's own box | 7 |
| UIA-V-50 | the segmented indicator lands off its track on entry | 7 |
| O-64 R-5 | two animations own the dock select trigger's `::before` opacity on the first expand: NOT-REPRODUCED headless at `183e021a` (fix-2, 0 running); RETIRE with a re-trigger, and K7-G13 holds the one-owner invariant | 8 |
| #29 RT-29C (census-register-a.md:41) | the router seam, unclaimed | 1 |
| #32 captures (census-register-a.md:44) | the indicator captures at rest and moving; `/navigation/tabs` console-clean | §6 |
| N-8d (census-carries-recap.md:86) | "double animated" entrances and panes | 4, 6 |

## 2 · The defect at HEAD

Sources: `src/composables/motion/route/useRouteTransition.ts:120-121` (`update` is `await mutate()`, and the documented `mutate` is `await router.push(to)` at `:94`); `src/composables/motion/core/useViewTransition.ts:101-106` (`runInstant` maps a rejected `mutate` to `undefined`), `:168` (`vt.ready?.catch(() => {})`), `:169-173` (`finished` maps a rejection to `undefined`), `:60` (the type doc "Never rejects"); `demo/router.ts:100-105` (no `scrollBehavior`), `:108-121` (a `beforeResolve` chunk load, commented as running "before the View Transition update callback", which runs inside it because the push is the update); `demo/shell/AppShell.vue:135-144` (the `route.path` watch resets `<main>` to 0 on every arrival, popstate included); `src/composables/sidebar/useScrollTo.ts:18` (`scrollOffset ?? 16`, no hash read or write); `demo/chassis/family/FamilyTabs.vue:80` (keyed `<component :is>` over an async chunk); `src/components/handmark/HandMark.vue:263` (`run()` restarts the draw), `:331` and `:335` (two callers, `nextTick` and `document.fonts.ready`); `src/components/alert/index.ts:56` (`liquid-enter` on every Alert); `src/composables/motion/morph/useSelectionIndicator.ts:162-169` (pre-measure `width 0, opacity 0`), `:223-224` (`getBoundingClientRect()` measures), `:426-465` (re-measure on model, options, axis and a container ResizeObserver only); `src/components/tabs/styles/segmented.css:255` (`.segmented-indicator--js` transitions the first measure).

Measured with appendix A (`k7.mjs`, `k7c.mjs`). Chromium: **12 rows, 10 FAIL** (load 41.8 → 47.4). Playwright WebKit: the four fixture rows, 3 FAIL (the demo rows are Chromium-only; WebKit crashes on demo routes that mount GlassDock).

| gate | Chromium | Playwright WebKit |
|---|---|---|
| K7-G1 indicator at rest inside a Popover, within 0.5 px | PASS `dl −0.01, dw −0.34` | PASS `dw −0.33` |
| K7-G1 indicator at rest inside a Dialog, within 0.5 px | **FAIL** `dl −0.18, dw −7.06` | **FAIL** `dw −7.06` |
| K7-G2 1.4.12 spacing injected after mount, within 0.5 px | PASS `0, 0` | PASS |
| K7-G3 visible frames > 1 px off the active tab after mount | **FAIL** 24 of 193 (first `[83 ms, −3.2, −73.5, op 0.26]`) | **FAIL** 18 of 132 |
| K7-G4 a failing `mutate` rejects `finished` | **FAIL** `resolved` | **FAIL** `resolved` |
| K7-G5 slow push (1.5 s chunk): max frame gap ≤ 100 ms and the transition runs | **FAIL** max gap 1,560 ms | — |
| K7-G6 Back restores `<main>` scrollTop 700 | **FAIL** 700 → 0 | — |
| K7-G7 fresh load of `#sec-9-1`: `:target` and in view | **FAIL** target null, element absent | — |
| K7-G8 HandMark under a 450 ms font delay: each path draws once | **FAIL** 10 of 10 paths draw twice | — |
| K7-G9 family swap: 0 frames with a 0-height panel | **FAIL** 2 of 195 frames at 0 px (max 2,205) | — |
| K7-G10 0 `liquid-enter` frames inside the route view transition | **FAIL** 8 of 17 transition frames | — |
| K7-G11 push, Back and Forward each run one view transition | **FAIL** `push 1, back 0, fwd 0` | — |
| K7-G12 (`k7c.mjs`) `/navigation/tabs` console-clean | PASS, 0 errors and warnings | — |
| K7-S static (below) | exit 1 | |

**Cured or not reproduced at HEAD.** The Popover cell of R4-01-08 reads −0.34 px (the registry's −3.9 px does not reproduce in the fixture; the Dialog's −7.06 px does). R4-02-11's 1.4.12 leg reads 0 px after the injected spacing; its label-change leg stays in the cure (row 7) and K7-G2 stays as a hold line. #32's console clause passes. **Not measured:** O-64 R-5 was found on keyframes' page, headed on a real GPU, on a collapsing dock; the demo's select-trigger dock (`demo/stories/dock/overview.vue:214`) is `:collapse="false"`, so it has no first expand. K7-G13 (§5) is the one-owner hold line; fix-2's reading on a collapsing dock (0 running, §3 item 8) closes the gap: the defect does not reproduce headless.

## 3 · The cure

1. **The router resolves, then transitions.** `routeTransition` takes `prepare?: () => Promise<void>`, awaited before `startViewTransition`: the frame keeps drawing while the chunk loads. The demo's caller (`demo/chassis/routeTransition.ts:100-105`) passes `prepare: () => router.resolve(to).matched` loaded (the same loader as the `beforeResolve` guard, which is deleted), and `mutate` is the push over warm chunks. Popstate is an arrival too: the demo installs `router.beforeEach` for `history`-initiated navigations (vue-router's `NavigationType.pop` on the info of `router.options.history.listen`) and runs the same `routeTransition({ nav: "route", prepare, mutate })`, so Back and Forward each run one transition. The comment at `demo/router.ts:108-110` goes with the guard.
2. **The substrate reports.** `ViewTransitionResult.finished` becomes `Promise<"transitioned" | "skipped" | "instant">`: it rejects with the `mutate` error when the update fails (in both the native and the instant path), resolves `"skipped"` when `ready` rejects with a skip, and `"instant"` in the fallback. `vt.ready?.catch(() => {})` and both `() => undefined` maps go. `transitioned: boolean` goes with them (the resolved value carries it). `routeTransition` forwards the same promise.
3. **An arrival's scroll has one owner.** The AppShell watch reads the arrival kind. A push resets `<main>` to 0; a pop restores the position saved for that history entry (keyed by `history.state.position`, written on leave). After the route's content commits (`finished` settles), a `location.hash` resolves through the sidebar kit: `useScrollTo` reads the hash into `ensureTargetLoaded` and `scrollTo`, writes it on a ToC jump (`history.replaceState`), and offsets by the target's computed `scroll-margin-block-start` instead of the literal 16. The deck keeps `useDeckHashSync`, the model for this seam.
4. **The pane swap preloads.** FamilyTabs resolves the next member's loader before it moves `active`; the old member stays rendered until the new one is ready, so the panel never renders empty.
5. **One draw per mount.** HandMark keeps a `played` flag. The first `run(0)` sets it; `fonts.ready` re-measures the path lengths and, when the draw has started, rewrites the dash array at its current progress instead of calling `run(0)`.
6. **Mount entrances wait for the transition.** `styles/glass/liquid-enter.css` pauses the entrance while a view transition is active (`:root:active-view-transition .liquid-enter { animation-play-state: paused }`), so it plays once, after the transition, in the new page. The `--i` stagger line is struck from the header; the library writes no index.
7. **The indicator is seated, then travels.** `useSelectionIndicator` measures in layout space (`offsetLeft`, `offsetTop`, `offsetWidth`, `offsetHeight` against the strip, as `dock/composables/dockMorphMeasure.ts:3-6` does), so an ancestor's entrance transform does not enter the reading. The first measure writes position and size with the transition off (`.segmented-indicator--js` is applied from the second frame after the seat), and the ResizeObserver observes the selected button as well as the strip.
8. **One owner for the trigger's specular opacity.** The dock select trigger's `::before` opacity is the material's transition only (`src/styles/glass/material.css:282-289`). fix-2 built a collapsing `GlassDock` with a `DockTrigger for="select"` (Chromium, `reducedMotion: no-preference`), expanded it (class `collapsed` → `expanded`), and sampled `document.getAnimations()` every frame for 2.5 s: 0 animations ran on the trigger's `::before`, and none on the trigger's subtree; its computed transition is `--specular-x 0.2s, --specular-y 0.2s, opacity 0.3s`. The two-writer case does not reproduce headless. O-64 R-5 is RETIRE (NOT-REPRODUCED) with the re-trigger "a headed real-GPU reproduction on W-A.4's leg"; K7-G13 is the hold line that bites if a second writer appears.

## 4 · Files it touches

`src/composables/motion/core/useViewTransition.ts`, `src/composables/motion/route/useRouteTransition.ts`, `src/composables/sidebar/useScrollTo.ts`, `src/composables/motion/morph/useSelectionIndicator.ts`, `src/components/tabs/styles/segmented.css`, `src/components/handmark/HandMark.vue`, `src/styles/glass/liquid-enter.css`, and the second writer found by K7-G13 under `src/components/dock/`; every caller of `startViewTransition(...).finished` that reads `transitioned` (`rg -n 'transitioned' src demo`); demo `router.ts`, `chassis/routeTransition.ts`, `shell/AppShell.vue`, `chassis/family/FamilyTabs.vue`. New `tests-visual/wired/arrival.spec.ts` (appendix A).

## 5 · Acceptance gates

Every FAIL row in §2 is a gate; it passes at the inverted reading (within 0.5 px, 0 off frames, `rejected`, gap ≤ 100 ms with `ready`, 700 ± 1, `:target` `sec-9-1` in view, each path once, 0 zero-height frames, 0 overlap with `vtFrames > 0`, `1, 1, 1`). Hold lines: K7-G1 Popover, K7-G2, K7-G12 (bites: measuring with `getBoundingClientRect()` inside a scaled Popover entrance turns G1 Popover red after the cure; removing the button from the ResizeObserver turns a label-change variant of G2 red; any console error on `/navigation/tabs` turns G12 red).

| id | gate | passes when | HEAD |
|---|---|---|---|
| K7-G13 (hold line) | on a collapsing GlassDock with a `DockTrigger for="select"`, first expand: `document.getAnimations()` filtered to the trigger's `::before` with `opacity` in its keyframes, sampled per frame for 2.5 s | at most 1 running in any frame (`maxRunning <= 1`; fix-2's probe prints `pass` on `=== 1` at `fix-2.md:557`, and the wave's wired spec takes this row's criterion) | holds at `be1969ea`: 0 running, nothing seen (Chromium, fix-3 re-run of fix-2's probe; Playwright WebKit crashes on GlassDock). The material's own transition is not observed running headless, so the bite plants two owners: `.dock-trigger::before { animation: k7-plant-a 1s linear infinite, k7-plant-b 1.3s linear infinite }` (two `opacity` keyframes) reads `maxRunning 2` → red (fix-3, run). One planted keyframe alone reads 1 and still passes, so it is not the bite |
| K7-S | `! rg -q 'ready\?\.catch\(\(\) => \{\}\)' src/composables/motion/core/useViewTransition.ts` | exit 0 | **exit 1** (`:168`) |

## 6 · π and DELTA obligations

- **Surfaces:** fixture `k.html?s=tabsin&auto=dlg` (the Dialog indicator); demo `/navigation/tabs` (the indicator strip "View mode"), `/forms/inputs` (the family swap), `/motion/handmark`, `/feedback/alert` (entrance after the transition), at 1440×900.
- **Themes:** light and dark.
- **Engines:** Chromium for every row; Playwright WebKit for the fixture rows; real Safari UNMEASURED (OW-3).
- **Paired capture (#32):** HEAD shots `cap/head/k7-dialog-indicator-{light,dark}.png` (the 7 px short indicator in a Dialog) and `cap/head/k7-indicator-{rest,moving}.png` (`/navigation/tabs`, at rest and 90 ms into a move). The wave records the same frames; the π reading for each is K7-G1's `dl`/`dw` and K7-G3's off-frame count. The frame strips for G9 and G10 (the panel heights and the overlap count per frame) are the arrival's π.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `startViewTransition(...).finished: Promise<void>`, never rejects; `transitioned: boolean` | `finished: Promise<"transitioned" \| "skipped" \| "instant">`, rejects with the update's error; `transitioned` removed | a consumer that awaited `finished` for focus keeps working on success and now sees failures |
| `routeTransition({ mutate })` with the chunk load inside `mutate` | `routeTransition({ prepare, mutate })`; `prepare` resolves the destination before the snapshot | |
| `useScrollTo({ scrollOffset: 16 })` default | the target's `scroll-margin-block-start`; `scrollOffset` removed | consumers set `scroll-margin` on the section |
| the sidebar kit ignores `location.hash` | it reads the hash on arrival and writes it on a jump | |
| the indicator glides in from the strip origin on mount | it is seated on mount and glides only between selections | |
| `.liquid-enter` plays during a route view transition | it plays after the transition ends | |

## 8 · Ledger rows

Closes F-43 (L01a-29, L04-F19, L05a-07, R2-02-13, R3-01-04, R3-01-05, R3-01-09, R4-01-07, R4-01-08, R4-02-11, R5-01-02, R7-01-09), #29 RT-29C, #32's capture clause (captures banked at HEAD; console clause PASS), N-8d, UIA-V-50 and O-64 R-5 (RETIRE, NOT-REPRODUCED; re-trigger a headed real-GPU reproduction; K7-G13 holds). A2-FO-L1-18 (estimate-then-teleport scroll) closes on K7-G7 (a fresh load of `#sec-9-1` lands on its target) with cure 3's one scroll owner.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** every arrival (push, pop, pane swap, mount) has one owner, which draws frames while the destination loads and reports what happened.
- **Wave:** §2's FAIL rows and K7-S green, and K7-G13 holding, in one run.
- **Feature:** throttle to slow-3G and push to an uncached route: the page keeps animating until the chunk lands and the transition runs; Back returns to the scrolled position; the indicator is seated on first paint inside a Dialog. One frame strip per arrival.

## Appendix A · `k7.mjs`, `k7c.mjs` (land as `tests-visual/wired/arrival.spec.ts`)

Run against the W-K.1 appendix B harness (the fixture exposes `window.__routeTransition`). Demo rows use the demo nav buttons by `aria-label` or text.

```js
// W-K.7 born-RED probe: one owner per arrival (F-43). node k7.mjs [--eng webkit]
import { open, sleep, runner, argEng, DEMO, APP } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k7');
const APP2 = APP;
const offset = (strip) => { const s = document.querySelector(strip); if (!s) return null; const ind = s.querySelector('.segmented-indicator') || s.parentElement.querySelector('.segmented-indicator'); const tab = s.querySelector('[aria-pressed="true"]'); if (!ind || !tab) return { missing: !ind ? 'indicator' : 'tab' }; const a = ind.getBoundingClientRect(), b = tab.getBoundingClientRect(); return { dl: +(a.left - b.left).toFixed(2), dw: +(a.width - b.width).toFixed(2), op: +getComputedStyle(ind).opacity }; };
// G1 · inside a Popover and a Dialog, the indicator sits within 0.5 px of the active tab at rest
for (const [ov, strip] of [['pop', '[data-probe=segp]'], ['dlg', '[data-probe=segd]']]) await safe(`K7-G1 ${ov}`, async () => {
  const { browser, page } = await open({ eng, url: `${APP2}?s=tabsin&auto=${ov}`, waitReady: true, settle: 1500 });
  const o = await page.evaluate(offset, strip);
  row(`K7-G1 indicator at rest in ${ov === 'pop' ? 'Popover' : 'Dialog'} within 0.5 px`, o && Math.abs(o.dl) <= 0.5 && Math.abs(o.dw) <= 0.5, o);
  await browser.close();
});
// G2 · after the selected tab's label changes, the indicator re-measures to it
await safe('K7-G2 relabel', async () => {
  const { browser, page } = await open({ eng, url: `${APP2}?s=tabsin`, waitReady: true, settle: 800 });
  await page.evaluate(() => { const st = document.createElement('style'); st.textContent = '[data-probe=segt] *{letter-spacing:0.12em !important;word-spacing:0.16em !important;line-height:1.5 !important}'; document.head.appendChild(st); }); await sleep(800);
  const o = await page.evaluate(offset, '[data-probe=segt]');
  row('K7-G2 indicator follows the selected tab own box (1.4.12 spacing after mount) within 0.5 px', o && Math.abs(o.dl) <= 0.5 && Math.abs(o.dw) <= 0.5, o);
  await browser.close();
});
// G3 · the first placement is seated, not travelled: 0 frames after mount with the indicator visible and > 1 px off the active tab
await safe('K7-G3 first placement', async () => {
  const init = () => { window.__frames = []; const t0 = performance.now(); const tick = () => { const s = document.querySelector('[data-probe=segt]'); if (s) { const ind = s.querySelector('.segmented-indicator') || s.parentElement.querySelector('.segmented-indicator'); const tab = s.querySelector('[aria-pressed="true"]'); if (ind && tab) { const a = ind.getBoundingClientRect(), b = tab.getBoundingClientRect(); window.__frames.push([Math.round(performance.now() - t0), +(a.left - b.left).toFixed(1), +(a.width - b.width).toFixed(1), +getComputedStyle(ind).opacity]); } } if (performance.now() - t0 < 1500) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const { browser, page } = await open({ eng, url: `${APP2}?s=tabsin`, waitReady: true, settle: 1600, init });
  const f = await page.evaluate(() => window.__frames);
  const bad = f.filter(([, dl, dw, op]) => op > 0.05 && (Math.abs(dl) > 1 || Math.abs(dw) > 1));
  row('K7-G3 0 visible frames off the active tab after mount', bad.length === 0, { frames: f.length, off: bad.length, first: bad.slice(0, 3) });
  await browser.close();
});
// G4 · the substrate reports a failed update to the caller
await safe('K7-G4 failure reported', async () => {
  const { browser, page } = await open({ eng, url: `${APP2}?s=none`, waitReady: true });
  const r = await page.evaluate(async () => { try { await window.__routeTransition({ nav: 'route', mutate: () => Promise.reject(new Error('offline')) }).finished; return 'resolved'; } catch (e) { return 'rejected: ' + e.message; } });
  row('K7-G4 a failing mutate rejects finished', r.startsWith('rejected'), { finished: r });
  await browser.close();
});
if (eng === 'chromium') {
  // G5 · demo: an uncached push under a slow chunk keeps drawing frames (no gap over 100 ms) and its transition runs
  await safe('K7-G5 push under slow chunk', async () => {
    const { browser, ctx, page } = await open({ eng, url: `${DEMO}/foundations/motion`, w: 1440, h: 900, settle: 1500 });
    await ctx.route('**/assets/*.js', async (route) => { await sleep(1500); await route.continue(); });
    await page.evaluate(() => { window.__gaps = []; let last = performance.now(); const t0 = last; const tick = (t) => { window.__gaps.push(t - last); last = t; if (t - t0 < 4000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); window.__vt = []; const o = document.startViewTransition?.bind(document); if (o) document.startViewTransition = (a) => { const v = o(a); v.finished.then(() => window.__vt.push('finished'), () => window.__vt.push('rejected')); v.ready.then(() => window.__vt.push('ready'), (e) => window.__vt.push('ready-rejected ' + e.name)); return v; }; });
    await page.evaluate(() => [...document.querySelectorAll('nav button')].find((b) => (b.getAttribute('aria-label') || b.textContent).trim() === 'Data').click()); await sleep(4200);
    const m = await page.evaluate(() => ({ maxGap: Math.round(Math.max(...window.__gaps)), vt: window.__vt, path: location.pathname }));
    row('K7-G5 slow push: max frame gap ≤ 100 ms, transition ready', m.maxGap <= 100 && m.vt.includes('ready'), m);
    await browser.close();
  }, 90000);
  // G6 · demo: Back restores the owning scroller's position
  await safe('K7-G6 back restores scroll', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/forms/inputs`, w: 1440, h: 700, settle: 1500 });
    await page.evaluate(() => document.querySelector('main').scrollTo({ top: 700, behavior: 'instant' })); await sleep(500);
    const sh = await page.evaluate(() => { const m = document.querySelector('main'); return { sh: m.scrollHeight, ch: m.clientHeight, top: Math.round(m.scrollTop) }; });
    await page.evaluate(() => [...document.querySelectorAll('nav button')].find((b) => (b.getAttribute('aria-label') || b.textContent).trim() === 'Feedback').click()); await sleep(1500);
    await page.goBack(); await sleep(1800);
    const top = await page.evaluate(() => ({ top: Math.round(document.querySelector('main').scrollTop), path: location.pathname }));
    row('K7-G6 Back restores main scrollTop 700 ± 1', Math.abs(top.top - sh.top) <= 1 && sh.top >= 699, { before: sh, after: top });
    await browser.close();
  });
  // G7 · demo: a fresh load of a section hash resolves after the content commits (:target set, target in the port)
  await safe('K7-G7 hash on arrival', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/navigation/toc-tracking#sec-9-1`, w: 1440, h: 900, settle: 2200 });
    const m = await page.evaluate(() => { const t = document.querySelector(':target'); const e = document.getElementById('sec-9-1'); const r = e?.getBoundingClientRect(); return { target: t?.id || null, exists: !!e, top: r ? Math.round(r.top) : null }; });
    row('K7-G7 #sec-9-1 is :target and in view on a fresh load', m.target === 'sec-9-1' && m.top !== null && m.top >= 0 && m.top < 900, m);
    await browser.close();
  });
  // G8 · demo: HandMark draws once per mount under a 450 ms font delay
  await safe('K7-G8 handmark once', async () => {
    const init = () => { window.__draws = new Map(); const o = Element.prototype.animate; Element.prototype.animate = function (k, t) { if (this instanceof SVGPathElement && JSON.stringify(k).includes('strokeDashoffset')) window.__draws.set(this, (window.__draws.get(this) || 0) + 1); return o.call(this, k, t); }; };
    const b = await (await import('./lib.mjs')).ENG.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.route(/\.(woff2?|ttf|otf)(\?|$)/, async (r) => { await sleep(450); await r.continue(); });
    const page = await ctx.newPage(); await page.addInitScript(init); await page.goto(`${DEMO}/motion/handmark`, { waitUntil: 'load' }); await sleep(3500);
    const m = await page.evaluate(() => { const c = [...window.__draws.values()]; return { paths: c.length, max: Math.max(0, ...c), twice: c.filter((n) => n > 1).length }; });
    row('K7-G8 each HandMark path draws once', m.paths > 0 && m.max === 1, m);
    await b.close();
  });
  // G9 · demo: a FamilyTabs member swap never paints a 0-height panel
  await safe('K7-G9 family swap', async () => {
    const { browser, page } = await open({ eng, url: `${DEMO}/forms/inputs`, w: 1440, h: 900, settle: 1500 });
    await page.evaluate(() => { window.__hs = []; const t0 = performance.now(); const tick = () => { const pn = document.querySelector('.story-family__panel'); window.__hs.push(pn ? Math.round(pn.getBoundingClientRect().height) : -1); if (performance.now() - t0 < 1500) requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
    await page.locator('[role=tab]', { hasText: 'Select' }).first().click(); await sleep(1600);
    const hs = await page.evaluate(() => window.__hs);
    const zero = hs.filter((h) => h === 0).length;
    row('K7-G9 family swap: 0 frames with a 0-height panel', zero === 0, { frames: hs.length, zeroFrames: zero, min: Math.min(...hs), max: Math.max(...hs) });
    await browser.close();
  });
  // G10 · demo: a mount entrance under a route change does not run inside the view transition
  await safe('K7-G10 entrance vs transition', async () => {
    const init = () => { window.__vtOn = false; window.__overlap = 0; window.__vtFrames = 0; const o = document.startViewTransition?.bind(document); if (o) document.startViewTransition = (a) => { const v = o(a); window.__vtOn = true; v.finished.finally(() => { window.__vtOn = false; }); return v; }; const tick = () => { if (window.__vtOn) { window.__vtFrames++; if (document.getAnimations().some((x) => /liquid-enter/.test(x.animationName || '') && x.playState === 'running')) window.__overlap++; } requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
    const { browser, page } = await open({ eng, url: `${DEMO}/containers/accordion`, w: 1440, h: 900, settle: 1500, init });
    await page.evaluate(() => [...document.querySelectorAll('nav button')].find((b) => (b.getAttribute('aria-label') || b.textContent).trim() === 'Feedback').click()); await sleep(2500);
    const m = await page.evaluate(() => ({ vtFrames: window.__vtFrames, overlap: window.__overlap, path: location.pathname, alerts: document.querySelectorAll('.liquid-enter').length }));
    row('K7-G10 0 liquid-enter frames inside the route view transition', m.vtFrames > 0 && m.overlap === 0, m);
    await browser.close();
  });
  // G11 · demo: Back and Forward are arrivals too: each runs through the one route transition
  await safe('K7-G11 popstate transition', async () => {
    const init = () => { window.__vtCalls = 0; const o = document.startViewTransition?.bind(document); if (o) document.startViewTransition = (a) => { window.__vtCalls++; return o(a); }; };
    const { browser, page } = await open({ eng, url: `${DEMO}/forms/inputs`, w: 1440, h: 900, settle: 1500, init });
    await page.evaluate(() => [...document.querySelectorAll('nav button')].find((b) => (b.getAttribute('aria-label') || b.textContent).trim() === 'Feedback').click()); await sleep(1500);
    const push = await page.evaluate(() => window.__vtCalls);
    await page.evaluate(() => history.back()); await sleep(1500); const back = await page.evaluate(() => window.__vtCalls) - push;
    await page.evaluate(() => history.forward()); await sleep(1500); const fwd = await page.evaluate(() => window.__vtCalls) - push - back;
    row('K7-G11 push, Back and Forward each run one view transition', push === 1 && back === 1 && fwd === 1, { push, back, fwd });
    await browser.close();
  });
}
done(eng);
```

```js
// W-K.7 G12 · console-clean on /navigation/tabs (#32's console clause) and the indicator fringe captures (at rest, moving)
import { ENG, sleep, DEMO, CAP } from './lib.mjs';
const b = await ENG.chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const msgs = []; p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) msgs.push(m.type() + ': ' + m.text().slice(0, 140)); }); p.on('pageerror', (e) => msgs.push('pageerror: ' + e.message.slice(0, 140)));
await p.goto(`${DEMO}/navigation/tabs`, { waitUntil: 'networkidle' }); await sleep(1500);
const strip = p.locator('[aria-label="View mode"]').first(); const box = await strip.boundingBox();
if (box) await p.screenshot({ path: `${CAP}/head/k7-indicator-rest.png`, clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } });
const btns = strip.locator('button'); if (await btns.count() > 1) { await btns.nth(1).click(); await sleep(90); if (box) await p.screenshot({ path: `${CAP}/head/k7-indicator-moving.png`, clip: { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 } }); }
await sleep(800);
console.log(`${msgs.length === 0 ? 'PASS' : 'FAIL'} K7-G12 /navigation/tabs console-clean ${JSON.stringify({ count: msgs.length, first: msgs.slice(0, 4) })}`);
await b.close(); process.exitCode = msgs.length ? 1 : 0;
```

