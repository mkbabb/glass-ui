# W-F.6 · W-IDLE-COMPOSITED: idle life runs on the compositor and stops off-screen · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5961 |
| ships in | 11.0.0 |
| families | F-45 (members L07-03, L05a-11, R2-09-07; L07-09 is the dock's, see below) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

L07-09 (the dock's layout-property transitions) is closed by W-I.1 (loop D2), which rebuilds the dock's motion; this wave does not edit the dock. Layout transitions where the layout itself is the thing that changes (the disclosure's grid rows, the Sheet's detents, the sortable list) are W-F.2's and are not this family's mechanism.

## 1 · What it closes

| member | what |
|---|---|
| L07-03, R2-09-07 | music-staff at rest runs 52 infinite animations on SVG `<g>` elements (`music-staff/styles.css:264` bead, `:272` reel, `:276` strike, `:215`/`:299` breath; keyframes `:347-379`). Chromium lays out the SVG subtree for a CSS transform on an SVG element every frame, and the strike's keyframes also animate `color`. At 6× CPU it takes 976 ms/s of main thread (R2-09-07) |
| L05a-11 | a spatial scale on a flat bezier (`card/scroll.css:133`, `:138`: `card-title-condense`/`-release` on `--ease-standard`); a `background-position` loop (`styles/glass/track-flow.css:70`, `:77`, `:84`, `:91`, `:111`); a keyword-eased infinite loop (`configurator/styles.css:490`, `ease-in-out infinite`) |
| census #3 W-CAPTURE-MOTION | the tab indicator transitions `width` and `height` (`tabs/styles/segmented.css:255-259`), so every tab switch lays out on every frame of the glide |

## 2 · The defect at HEAD

`node f6.mjs` (appendix A), Chromium, CDP `Performance.getMetrics` over 5 s with the pointer parked: **4 rows, 3 FAIL** (load 200.0 → 192.3).

| gate | HEAD reading |
|---|---|
| G1 `/display/music-staff` at rest | **111.2 layouts/s**, 111.2 style recalcs/s, 384.6 ms/s of task (a first run read 105.8). Running: strike 28, breath 20, reel 2, bead 2 |
| G1 control, `/navigation/tabs` at rest | 0 layouts/s, 23.8 ms/s: **PASS** (the gate reads 0 on a page with no idle loop, and the dock caps' own running animations do not lay out) |
| G2 music-staff scrolled off-screen (a 400vh spacer, `staffInView: false`) | **122.3 layouts/s** |
| G3 `/navigation/tabs`, four switches | layouts per switch **[1, 23, 22, 22]** |

`node f6-static.mjs` (appendix B), run in the worktree root: **FAIL F6-G4, 8 sites**: `card/scroll.css:133`, `:138` (spatial scale on a flat bezier); `track-flow.css:70`, `:77`, `:84`, `:91`, `:111` (`background-position` keyframes); `configurator/styles.css:490` (keyword-eased infinite loop).

## 3 · The cure

1. **music-staff's loop is transforms and opacity on HTML boxes.** The SVG draws; it does not animate.
   - The reel: `.music-staff__transport` gets an HTML wrapper (`div.music-staff__reel-port`) around its SVG, and the loop translates that wrapper (`translate` on `--_music-staff-period`, linear, infinite). The `music-staff-reel` keyframes on `<g>` are deleted.
   - The strike: the per-note scale and colour keyframes (28 animations) are deleted. The accent is a second copy of the note layer (`<use href="#inkId">` in a sibling SVG, filled with `--_music-staff-accent`) inside an HTML window (`div.music-staff__strike`, `overflow: clip`) that travels with the playhead by `translate` while its content counter-translates by the same amount. The struck note shows in accent under the window and in ink elsewhere, with transforms only. The strike's scale bump moves onto the window as a `scale` on the same keyframe clock.
   - The breath and the bead: `opacity` and `scale` on HTML wrappers (the furniture divs at `MusicStaff.vue:176-208` already are), never on `<g>` or `<circle>`.
   - Off-screen and hidden: one `IntersectionObserver` on the root sets `data-offscreen`, and `useDocumentVisibility` sets it when the document is hidden; `.music-staff[data-offscreen] *` has `animation-play-state: paused`. The existing `data-sealed` pause stays.
2. **The tab indicator stretches by transform.** The indicator becomes three boxes: a start cap, a middle and an end cap, each a fixed-size element. A switch writes `translate` to both caps and `translate` + `scale` (inline axis) to the middle; the corners keep their radius because only the unrounded middle scales. The block size is set once from the measured tab height, with no transition (it changes only when the row's height changes, never within a switch). `width` and `height` leave the transition list at `segmented.css:255-259`.
3. **The card title rides a spring.** `card-title-condense`/`-release` time on `--spring-present` (W-F.1's re-normalized token) instead of `--ease-standard`.
4. **The track flow is a translated layer.** The gradient moves to a `::before` twice the track's inline (or block, for `track-flow-block`) size, and the loop animates its `translate` from −50 % to 0, linear. The five `background-position` keyframe lines are deleted. The configurator's preset shimmer (`configurator/styles.css:488-490`) uses the same layer and keyframes with linear timing; `configurator-preset-shimmer` is deleted.

## 4 · Files it touches

`src/components/music-staff/{MusicStaff.vue,styles.css}`, `src/components/tabs/styles/segmented.css` and the indicator's measuring composable (the JS that writes `translate`/`width`), `src/components/card/scroll.css`, `src/styles/glass/track-flow.css`, `src/components/configurator/styles.css`. New: `tests-visual/wired/idle-composited.spec.ts` (appendix A), and appendix B joins the static gate set.

## 5 · Acceptance gates

| id | passes when | HEAD |
|---|---|---|
| F6-G1 | music-staff at rest: 0 layouts/s over 5 s (the tabs control stays at 0) | **111.2** |
| F6-G2 | music-staff scrolled off-screen: 0 layouts/s over 3 s | **122.3** |
| F6-G3 | a tab switch lays out ≤ 3 times | **[1, 23, 22, 22]** |
| F6-G4 | 0 sites: no spatial `animation` on a flat `--ease-*` in card/scroll.css, no `background-position` keyframes in track-flow.css, no keyword-eased infinite loop in configurator/styles.css | **8 sites** |

Planted bites for the wired twins: a style tag restoring `animation: music-staff-strike …` on `.music-staff__note` reddens G1; removing the `IntersectionObserver` pause reddens G2 alone; adding `width` back to the indicator's transition list reddens G3.

## 6 · π and DELTA obligations

- `/display/music-staff` in loading mode, light and dark, 1440×900: a 2 s frame strip at rest before and after, showing the strike, the breath and the reel read the same (the DELTA is in the numbers, the strip shows no loss of life), plus the Performance-panel trace pair (layouts/s) as the paired artefact.
- `/navigation/tabs`: a strip of one switch, light and dark, showing the pill's corners stay round across the stretch (the three-part indicator's risk).
- The card condense on `/display/card` scroll, and the track flow on the progress track, one strip each.
- Engines: Chromium measured. Playwright WebKit crashes on the demo routes (W-F.1 §2); record each cell as a crash or a reading. Real Safari UNMEASURED (OW-3). WebKit also lays out SVG on CSS transforms, so the real-Safari cell is owed at the close.
- R2-09-07's 6× CPU cell (976 ms/s) is re-read after the wave with the same throttle.

## 7 · MIGRATION rows

| removed | replacement |
|---|---|
| keyframes `music-staff-strike`, `music-staff-reel` on SVG groups | the strike window and the reel port (HTML); a consumer overriding those keyframe names re-targets `.music-staff__strike` / `.music-staff__reel-port` |
| `.segmented-indicator--js` as one element with `width`/`height` writes | three parts (`[data-part=start\|middle\|end]`); a consumer styling the indicator's background styles the parts through `--tab-indicator-fill` |
| `configurator-preset-shimmer` keyframes | the track-flow layer |
| `background-position` animation on `.track-flow` | a translated `::before`; a consumer setting `background` on `.track-flow` sets `--track-flow-fill` |

## 8 · Dependencies

W-A.3, W-F.1. The dock's transitions (L07-09) are W-I.1's.

## 9 · Ledger rows it closes

F-45: L07-03, L05a-11, R2-09-07; census #3 W-CAPTURE-MOTION's indicator clause. L07-09 is recorded as closed by W-I.1.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** idle life costs nothing off-screen and nothing in layout, so the breath-of-life edict holds without taxing the page.
- **Wave:** F6-G1..G4 green in one run.
- **Feature:** music-staff reads identically alive at 0 layouts/s, captured with the trace pair.

## Appendix A · `f6.mjs` (lands as `tests-visual/wired/idle-composited.spec.ts`; `lib.mjs` is W-F.2 appendix D)

```js
// W-F.6 born-RED probe: compositor-only idle life (F-45). Chromium CDP Performance.getMetrics over 5 s at rest.
// node f6.mjs
import { open, reporter, sleep } from './lib.mjs';
const R = reporter('f6');
const metrics = async (cdp) => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
for (const [route, label] of [['/display/music-staff', 'music-staff'], ['/navigation/tabs', 'tabs (control)']]) {
  const { browser, page, ctx } = await open(route, { settle: 2500 });
  const cdp = await ctx.newCDPSession(page); await cdp.send('Performance.enable');
  await page.mouse.move(2, 2);
  const a = await metrics(cdp); await sleep(5000); const b = await metrics(cdp);
  const s = 5;
  const r = { layoutsPerS: +((b.LayoutCount - a.LayoutCount) / s).toFixed(1), styleRecalcsPerS: +((b.RecalcStyleCount - a.RecalcStyleCount) / s).toFixed(1), taskMsPerS: +(((b.TaskDuration - a.TaskDuration) * 1000) / s).toFixed(1) };
  const running = await page.evaluate(() => { const out = {}; for (const an of document.getAnimations()) { if (an.playState !== 'running') continue; const k = (an.animationName || an.transitionProperty || '?'); out[k] = (out[k] || 0) + 1; } return out; });
  R.row(`F6-G1 ${label}: idle layouts/s = 0 over 5 s at rest`, r.layoutsPerS === 0, { ...r, running });
  if (label === 'music-staff') {
    await page.addStyleTag({ content: 'main::after{content:"";display:block;height:400vh}' }); await sleep(200);
    await page.evaluate(() => { const m = document.querySelector('main'); (m.scrollHeight > m.clientHeight ? m : document.scrollingElement).scrollTo({ top: 1e6, behavior: 'instant' }); });
    await sleep(800);
    const staff = await page.evaluate(() => { const e = document.querySelector('.music-staff'); if (!e) return null; const r = e.getBoundingClientRect(); return { inView: r.bottom > 0 && r.top < innerHeight }; });
    const c = await metrics(cdp); await sleep(3000); const d = await metrics(cdp);
    const off = { layoutsPerS: +((d.LayoutCount - c.LayoutCount) / 3).toFixed(1), staffInView: staff?.inView };
    R.row('F6-G2 music-staff scrolled off-screen: layouts/s = 0', off.layoutsPerS === 0, off);
  }
  await browser.close();
}
// G3 — a tab switch lays out at most 3 times (the indicator glides on transform and scale, not width/height)
{ const { browser, page, ctx } = await open('/navigation/tabs', { settle: 1500 });
  const cdp = await ctx.newCDPSession(page); await cdp.send('Performance.enable');
  const per = [];
  for (let k = 0; k < 4; k++) {
    const a = await metrics(cdp);
    await page.evaluate((k) => { const ind = [...document.querySelectorAll('.segmented-indicator--js')].find((e) => e.getBoundingClientRect().width > 0); const tabs = [...ind.closest('.segmented-tabs').querySelectorAll('.segmented-tab')]; tabs[(k % 3) + 1].click(); }, k);
    await sleep(700); const b = await metrics(cdp); per.push(b.LayoutCount - a.LayoutCount);
  }
  R.row('F6-G3 /navigation/tabs: layouts per tab switch <= 3', Math.max(...per) <= 3, { layoutsPerSwitch: per });
  await browser.close(); }
R.done();
```

After the wave the G3 selector moves to the three-part indicator's root (`.segmented-indicator--js` stays the root's class).

## Appendix B · `f6-static.mjs` (run from the repo root)

```js
// W-F.6 static gate (L05a-11): no spatial motion on a flat bezier, no background-position loop, no keyword-eased loop.
import fs from 'node:fs';
const hits = [];
const chk = (f, re, why) => fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => { if (re.test(l)) hits.push(`${f}:${i + 1} ${why}`); });
chk('src/components/card/scroll.css', /animation:\s*card-title-(condense|release)\s+\S+\s+var\(--ease-/, 'spatial scale on a flat bezier');
chk('src/styles/glass/track-flow.css', /^\s*background-position\s*:/, 'background-position keyframes (main-thread paint loop)');
chk('src/components/configurator/styles.css', /animation:[^;]*\b(ease-in-out|ease-in|ease-out)\b[^;]*infinite/, 'keyword-eased infinite loop');
console.log(hits.length ? `FAIL F6-G4 ${hits.length} sites\n` + hits.join('\n') : 'PASS F6-G4 0 sites'); process.exitCode = hits.length ? 1 : 0;
```

Note: the track-flow check also matches the reduced-motion arm's static `background-position: 50% 50%` (`:111`); after the wave that arm sets no `background-position`, since the gradient lives on the `::before`.
