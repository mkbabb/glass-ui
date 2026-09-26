# W-F.3 · offsets and releases from position: scroll chrome, the carousel lag, the worm's trail, the detent throw · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5961; the Sheet cells run on the harness `sheet.html` (W-F.2 appendix E) on :5964 |
| ships in | 11.0.0 |
| families | F-46 (members L03a-10, L03b-08, R2-02-14, R2-06-09, R3-01-02, R3-01-03, R10-01-04) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L03a-10, L03b-08, R2-02-14 | scroll chrome: the ramp anchors at the first observed position and advances only inside a `watch` on the reader's velocity, so a discrete jump or one large wheel leaves the chrome expanded over the content (`src/composables/motion/scroll/useScrollChrome.ts:198-225`, `:240-258`) |
| R2-06-09 | every story page mounts `useScrollChrome(…, { collapseOnScroll: true })` (`demo/chassis/page/StoryPage.vue:76`), so this defect is the owner's "hero shrinks on scroll": BC O8, H28; BDM A9; BDF B3-D2 become this wave's acceptance (G1) |
| R3-01-02 | the carousel member lag holds at rest: `useDeckSnap.ts:103-112` feeds `deck.feed(position, velocity)` on `scroll` events only, and nothing feeds zero at `scrollend`; `CarouselContent.vue:59-66` writes `--member-lag` from it |
| R3-01-03 | the pager worm's trail edge is `x − trailOffset(v, τ, ceil)` (`useLeadTrail.ts:176`), bounded by a ceiling, not by the distance travelled (`:73-76`), so the trailing body steps behind the origin at launch |
| R10-01-04 | the detent release velocity is sampled on `pointermove` only (`sheet/detents/use.ts:199`) and read at release with no regard to the sample's age (`:210-215`); a still finger flings the sheet |
| census | `#73` W-SCROLL-SHRINK (`census-register-b.md:60`), `#26` RT-26E (`census-register-a.md:38`), `#77`'s `useLeadTrail` law defect (`census-register-b.md:63`) |

The family law (`REG:1076-1078`): an offset or a release derived from an event-sampled velocity is a short windowed estimate that decays by the age of its last sample and reads 0 at rest; an offset is bounded by position. The round-4 correction makes the trail invariant direction-free: the trail lies between the origin and the lead (`REG:1077`).

## 2 · The defect at HEAD

`node f3.mjs` (appendix A), Chromium: **8 rows, 7 FAIL** (G1-G3 load 618.8 → 377.7; G2, G4 load 166.3 → 155.1). `node f3-static.mjs` (appendix B): **FAIL**, exit 1.

| gate | cell | HEAD reading | control that passes at HEAD |
|---|---|---|---|
| G1 scroll chrome, `/display/card` | 1440×900 light, dark | `scrollTo(832)` → **t 0**; `wheel(900)` → **t 0** (scrollTop 900) | 20 wheels of 40 px, 80 ms apart → t 1 (the writer is live when the velocity keeps changing) |
| G2 carousel lag, `/navigation/carousel`, one 260 px wheel, 100 ms after `scrollend` | light | max \|`--member-lag`\| **0.0173** (first run 0.033) over 22 members | — |
| | dark | **0.0381** (first run 0.0367) | — |
| G3 worm trail, `/navigation/pager-dots`, hop 0 → 1 (28 px), `--pager-dot-size: 12px` pinned | light, dark | a body centre **12.2 / 12.3 px outside** [origin, lead] | — |
| G4 detent throw, harness Sheet at d = 1, a 90 px pull in 4 moves, 600 ms still, release | 844×390 | t 0.769 (nearest rung 1) lands on **0.36** (twice) | 390×844: t 0.893 lands on 1 (PASS, both runs; R10-01 found 3 of 4 at this cell, by the last pair's timing) |
| G5 one windowed velocity | static | leaf **absent**; 4 consumers not importing it; **3 hand-rolled two-sample quotients** (`useDeckSnap.ts`, `sheet/detents/use.ts`, `useScrollTrigger.ts:203-204`) | — |

G3 pins `--pager-dot-size` to 12 px in the page (the value W-E.12's measured dot gives), because F-36's rem-as-px parse otherwise stretches the neck across the rail and masks the trail (R3-01-03). With the pin, the trailing body leaves the [origin, lead] interval by 12.2 px, the R3-01 reading (12.8 px on a 28 px hop).

## 3 · The cure

1. **One windowed velocity.** `src/composables/motion/core/windowedVelocity.ts`: `createWindowedVelocity({ windowMs = 100 })` with `sample(position, timeMs)` and `read(nowMs)`. `read` fits the samples inside the last `windowMs` by least squares and returns 0 when the newest sample is older than `windowMs`. `useDeckSnap`, the detent engine, `useScrollTrigger` and `useDragVelocity` sample into it and read it; their two-sample quotients are deleted. The window is 100 ms, the iOS-style throw window R10-01 names (`REG:1078`).
2. **Scroll chrome from position.** `useScrollChrome` computes `collapseT` from the live `scrollTop` on every reader tick and on `scrollend`, not inside a `watch` on velocity. The leg anchor is the position at the leg's start (0 at mount, the flip position after a committed direction flip), clamped so the ramp spans `[anchor, anchor + collapseRangePx]`; at `scrollTop ≤ 0` the chrome is expanded. A jump or a single wheel therefore lands the position's state. The `velocityGate` option (the flick short-circuit, `:205-211`) is deleted: the position law reaches the endpoint on a flick without it. The scroll-stop snap (`scheduleSnap`, `:172-181`) stays. The restated `readPos` is already gone with W-F.1 (L10-18).
3. **The carousel lag reads 0 at rest.** `useDeckSnap` feeds the deck from the windowed estimate each frame of a scroll and feeds `(position, 0)` on `scrollend` and `scrollsnapchange`. `memberLag` is bounded by the distance to the settling snap: `|lag| ≤ |position − round(position)|`.
4. **The trail lies between the origin and the lead.** `trailOffset(v, τ, bound)` takes `bound = min(ceil, |lead − origin|)`, the distance travelled since the hop began, so the trail edge never passes the origin; at rest `v = 0` and the trail is the lead. The same bounded law serves the worm and the carousel (`carousel/projection.ts:18`, "one law, two consumers"). The bound is a magnitude; W-F.5 applies the direction's sign.
5. **The detent release reads the windowed velocity at the release time.** `onPointerup` reads `velocity.read(event.timeStamp)`; after 100 ms without a move it is 0 and `resolveRelease` picks the rung nearest the position. W-F.2's fresh spring is seated with this velocity.

## 4 · Files it touches

`src/composables/motion/core/windowedVelocity.ts` (new), `src/composables/motion/scroll/{useScrollChrome.ts,useScrollTrigger.ts}`, `src/components/deck/composables/{useDeckSnap.ts,useDeck.ts}`, `src/components/carousel/{projection.ts,CarouselContent.vue}`, `src/composables/motion/morph/useLeadTrail.ts`, `src/components/pager-dots/worm.ts`, `src/components/sheet/detents/use.ts`, `src/composables/dom/useDragVelocity.ts`. New: `tests-visual/wired/position-offsets.spec.ts` (appendix A), `tests/gates/windowed-velocity.test.ts` (appendix B). `MIGRATION.md` (§7).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| F3-G1 · scroll chrome from position (the owner's hero-shrink asks) | appendix A `--only G1`, light and dark | `scrollTo(832)` → t 1; `scrollTo(0)` → t 0; one `wheel(900)` → t 1 | **0; 0 after the wheel** |
| F3-G2 · carousel lag 0 at rest | appendix A `--only G2` | 100 ms after `scrollend`, every `--member-lag` is 0 | **0.0173; 0.0381** |
| F3-G3 · trail between origin and lead | appendix A `--only G3`; after W-E.12 lands, the pin line is deleted and the gate runs on the cured page | every body centre within 0.5 px of [origin, lead] on every frame | **12.2; 12.3 px outside** |
| F3-G4 · the throw decays | appendix A `--only G4`, 844×390 and 390×844, Chromium touch | a release after 600 ms still lands on the rung nearest the position | **844×390: 0.769 → 0.36** |
| F3-G5 · one windowed velocity | appendix B from the repo root | the leaf exists, its four consumers import it, no two-sample quotient remains in them | **absent; 4; 3** |

G1's control (the slow wheel) and G4's 390×844 cell pass at HEAD, so both measures can pass. G2 and G3 pass when their quantity is bounded by position, which the cure makes exact (0 at rest; ≤ the interval). Planted bites for the wired twins (W-A.3): G2, an init script that feeds `deck.feed(position, 0.1)` on `scrollend`; G3, a style tag pinning `--pager-worm-max-stretch: 40`. Each must redden its gate on its own assertion.

## 6 · π and DELTA obligations

- **Scroll chrome (G1):** `/display/card` and `/containers/sheet` (the two pages L03a and R2-02 captured), 1440×900 and 390×844, light and dark. Paired capture at `<F3-base>` and at the wave: one still 500 ms after `scrollTo(832)` and one 1.5 s after one 900 px wheel. HEAD shows the h1 and blurb printing over the content under a transparent plate (`captures/L03a/probe-display--card-1440-light-jump-overprint.png`, `captures/R2-02/scroll-chrome/one-big-wheel-900.png`); the wave shows the collapsed plate.
- **Carousel (G2):** `/navigation/carousel`, light and dark, one still 1.5 s after a wheel, cropped to the strip, beside R3-01's `carousel-rest-after-wheel-dark.png`: HEAD's content sits 12.7-14.5 px off its item; the wave's sits on it.
- **Worm (G3):** `/navigation/pager-dots` and `/motion/deck`, a frame strip of one hop (every 16 ms for 400 ms), light and dark, after W-E.12.
- **Throw (G4):** the harness Sheet at 844×390, a strip from the release to +600 ms.
- **Engines:** Chromium measured. Playwright WebKit: the demo routes crash it (W-F.1 §2); the harness Sheet cell uses CDP touch (Chromium only), so its WebKit cell drives a mouse and is recorded as Playwright WebKit. Real Safari: UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed | replacement |
|---|---|
| `UseScrollChromeOptions.velocityGate` | none; collapse is a function of position |

## 8 · Dependencies

PLAN §5, the one record of edges, with the reason for the W-F.2 order in its notes. Direction (the sign of the bounded offsets, the RTL worm) is W-F.5's.

## 9 · Ledger rows it closes

F-46 (all seven members); census `#73` (the shrink now advances by position), `#26` RT-26E, `#77`'s `useLeadTrail` law clause; the owner asks BC O8, BC H28, BDM A9 and BDF B3-D2 (R2-06-09) by G1 and its π.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** one estimator and one bound serve every quantity the library derives from motion events. W-F.5 then only signs magnitudes.
- **Wave:** F3-G1..G5 green in one run.
- **Feature:** a story page scrolled by a jump, a wheel and a drag each shows the collapsed hero; the carousel rests square on its item; the worm's tail never kicks back; a held Sheet lands where it was held.

## Appendix A · `f3.mjs` (lands as `tests-visual/wired/position-offsets.spec.ts`; `lib.mjs` is W-F.2 appendix D, `sheetlib.mjs` W-F.2 appendix E)

```js
// W-F.3 born-RED probe: offsets and releases from position (F-46).
// node f3.mjs [--only G1,...] [--eng webkit]
import { open, reporter, sleep } from './lib.mjs';
import { openS, handle, tNow, driver, path } from './sheetlib.mjs';
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const want = (g) => !only || only.includes(g);
const R = reporter('f3');
const chromeT = (p) => p.evaluate(() => { const e = [...document.querySelectorAll('*')].find((x) => x.style && x.style.getPropertyValue('--chrome-collapse-t') !== ''); const sc = document.querySelector('main') ; return { t: e ? +e.style.getPropertyValue('--chrome-collapse-t') : null, scrollTop: Math.round((sc && sc.scrollTop) || scrollY) }; });
// G1 — scroll chrome t is a function of scrollTop: a discrete jump and one big wheel both land the collapsed state, and a jump home lands 0
if (want('G1')) for (const theme of ['light', 'dark']) {
  const { browser, page } = await open('/display/card', { theme });
  const scroller = await page.evaluate(() => { const m = document.querySelector('main'); return m && m.scrollHeight > m.clientHeight ? 'main' : 'window'; });
  const jump = (y) => page.evaluate(([y, s]) => (s === 'main' ? document.querySelector('main') : window).scrollTo({ top: y, behavior: 'instant' }), [y, scroller]);
  await jump(832); await sleep(700); const a = await chromeT(page);
  await jump(0); await sleep(700); const home = await chromeT(page);
  await page.mouse.move(700, 500); if (process.env.CONTROL) { for (let i = 0; i < 20; i++) { await page.mouse.wheel(0, 40); await sleep(80); } } else await page.mouse.wheel(0, 900); await sleep(1500); const w = await chromeT(page);
  R.row(`F3-G1 ${theme}: scrollTo(832) -> t=1; ${process.env.CONTROL ? 'CONTROL slow wheel 20x40 px' : 'wheel(900)'} -> t=1; scrollTo(0) -> t=0`, (process.env.CONTROL ? true : a.t === 1 && home.t === 0) && w.t === 1, { afterJump: a, afterWheel: w, afterHome: home, scroller });
  await browser.close();
}
// G2 — the carousel member lag reads 0 at rest: 100 ms after scrollend every --member-lag is 0
if (want('G2')) for (const theme of ['light', 'dark']) {
  const { browser, page } = await open('/navigation/carousel', { theme });
  const strip = await page.evaluate(() => { const s = document.querySelector('.carousel-strip'); s.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = s.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await sleep(500);
  await page.evaluate(() => { window.__se = 0; document.querySelector('.carousel-strip').addEventListener('scrollend', () => { window.__se = performance.now(); }); });
  await page.mouse.move(strip.x, strip.y); await page.mouse.wheel(260, 0); await sleep(1500);
  const r = await page.evaluate(async () => { await new Promise((r) => setTimeout(r, 100)); const lags = [...document.querySelectorAll('.carousel-strip [style*="--member-lag"]')].map((e) => +e.style.getPropertyValue('--member-lag')); return { scrollend: window.__se > 0, maxAbsLag: Math.max(0, ...lags.map(Math.abs)), n: lags.length }; });
  R.row(`F3-G2 ${theme}: 100 ms after scrollend every --member-lag is 0`, r.n > 0 && r.maxAbsLag === 0, r);
  await browser.close();
}
// G3 — the worm's trail lies between the origin and the lead on every frame of a hop. F-36 is cured in the
// page by pinning --pager-dot-size to 12px (the value W-E.12's measured dot gives), so this gate measures F-46 alone.
if (want('G3')) for (const theme of ['light', 'dark']) {
  const { browser, page } = await open('/navigation/pager-dots', { theme });
  await page.addStyleTag({ content: '.pager-dots{--pager-dot-size:12px !important}' }); await sleep(400);
  const r = await page.evaluate(async () => {
    const rail = [...document.querySelectorAll('.pager-dots')].find((e) => e.querySelectorAll('.pager-dot').length >= 3 && e.getBoundingClientRect().width > 0);
    const dots = [...rail.querySelectorAll('.pager-dot')]; const c = (e) => { const r = e.getBoundingClientRect(); return r.left + r.width / 2; };
    dots[0].click(); await new Promise((r) => setTimeout(r, 1000));
    const origin = c(dots[0]), lead = c(dots[1]); const lo = Math.min(origin, lead) - 0.5, hi = Math.max(origin, lead) + 0.5;
    let worst = 0, frames = 0; let on = true;
    (function f() { if (!on) return; for (const b of rail.querySelectorAll('.goo-body')) { const x = c(b); worst = Math.max(worst, lo - x, x - hi); } frames++; requestAnimationFrame(f); })();
    dots[1].click(); await new Promise((r) => setTimeout(r, 900)); on = false;
    return { origin: +origin.toFixed(1), lead: +lead.toFixed(1), worstOutsidePx: +Math.max(0, worst).toFixed(1), frames };
  });
  R.row(`F3-G3 ${theme}: every body centre stays between origin and lead (<= 0.5 px outside)`, r.worstOutsidePx === 0, r);
  await browser.close();
}
// G4 — the detent release velocity decays by the age of its last sample: a fast 90 px pull, a 600 ms hold, a release
// resolves to the rung nearest the position (R10-01-04). Chromium touch.
if (want('G4')) for (const [w, h] of [[844, 390], [390, 844]]) {
  const { browser, page, cdp } = await openS('chromium', { w, h, touch: true, qs: 'side=bottom&d=1' });
  const d = driver('touch', page, cdp); const g = await handle(page);
  await d.down(g.x, g.y); await sleep(30); await path(d, g.x, g.y, g.x, g.y + 90, 4, 16); await sleep(600);
  const at = await tNow(page); await d.up(); await sleep(1300); const s = await tNow(page);
  const rungs = [0.12, 0.36, 1]; const nearest = rungs.reduce((a, b) => (Math.abs(b - at.t) < Math.abs(a - at.t) ? b : a));
  R.row(`F3-G4 ${w}x${h}: held 600 ms at t=${at.t}, released: lands on the nearest rung ${nearest}`, s.dv === nearest, { tAtRelease: at.t, nearest, landed: s.dv, open: s.open });
  await browser.close();
}
R.done();
```

## Appendix B · `f3-static.mjs` (lands as `tests/gates/windowed-velocity.test.ts`)

```js
// W-F.3 static gate: one event-sampled velocity estimator (windowed, decaying by the age of its last sample),
// consumed by every site that derives a velocity from motion events. Run from the repo root.
import fs from 'node:fs';
const LEAF = 'src/composables/motion/core/windowedVelocity.ts';
const CONSUMERS = ['src/components/deck/composables/useDeckSnap.ts', 'src/components/sheet/detents/use.ts', 'src/composables/motion/scroll/useScrollTrigger.ts', 'src/composables/dom/useDragVelocity.ts'];
const leaf = fs.existsSync(LEAF);
const missing = CONSUMERS.filter((f) => !/from\s+["'][^"']*windowedVelocity["']/.test(fs.readFileSync(f, 'utf8')));
// the hand-rolled two-sample quotient the estimator replaces: (a - b) / dt
const quotient = CONSUMERS.filter((f) => /\(\s*\w+\s*-\s*last\w*\s*\)\s*\/\s*dt\b/.test(fs.readFileSync(f, 'utf8')));
const pass = leaf && missing.length === 0 && quotient.length === 0;
console.log(`${pass ? 'PASS' : 'FAIL'} F3-G5 one windowed velocity: leaf ${leaf ? 'present' : 'absent'}; not importing it: ${missing.length}; hand-rolled quotients: ${quotient.length}`);
[...missing.map((f) => '  no import: ' + f), ...quotient.map((f) => '  quotient: ' + f)].forEach((l) => console.log(l));
process.exitCode = pass ? 0 : 1;
```

When W-D.1 (loop D1) moves these files, the paths follow the converged placement; the assertion is unchanged.
