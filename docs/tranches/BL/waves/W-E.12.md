# W-E.12 · the pager worm reads its dot as a measured length · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, demo built there |
| ships in | 11.0.0 |
| families | F-36 (G-33 GOO-MORPH-SIGNATURE from the W-A.2 roster) |
| depends on | W-A.3 (wired set) |
| dependants | W-F.3 (PLAN §5: offsets and releases from position read the same measured geometry) |

## 1 · What it closes

| id | what |
|---|---|
| F-36 | the worm's geometry reads `--pager-dot-size` with `parseFloat` on its computed string. The token is `var(--space-body)`, so the computed value is `.75rem` (or `.5rem` below 768 px) and `parseFloat` returns 0.75 (or 0.5), which the geometry treats as pixels. The neck is then sized off a sub-pixel dot and stretches across the rail. |
| G-33 | GOO-MORPH-SIGNATURE: a browser gate bounds the neck by the hop |

## 2 · The defect at HEAD

Source: `src/components/pager-dots/worm.ts:133-135`:

```ts
const style = getComputedStyle(rootEl.value ?? layer);
const dot = parseFloat(style.getPropertyValue("--pager-dot-size"));
if (Number.isFinite(dot) && dot > 0) geometry.dot = dot;
```

`--pager-dot-size: var(--space-body)` (`PagerDots.vue:439`) is an unregistered custom property, so the computed string is the token's own text, not a length in pixels.

Measured with appendix A (`node e12.mjs`), Chromium, `/navigation/pager-dots`, one step to the next dot, 1.2 s of frames. **2 rows, 2 FAIL**, load 51.3 → 52.9.

| cell | hop | measured pip (`.goo-dot`) | raw token | max neck width | bound (hop + 2 × pip) |
|---|---|---|---|---|---|
| 1440×900 | 28 | 24 | `.75rem` | **300.6** over 142 frames | 76 |
| 390×844 | 28 | 24 | `.5rem` | **300.4** over 145 frames | 76 |

With the 12 px dot the token intends, the bound would be 52. The gate uses the measured pip, the looser bound, so a pass cannot come from a smaller pip alone. Playwright WebKit crashed the page on `/navigation/pager-dots` ("Page crashed"), the known crash on demo routes, recorded as a crash.

## 3 · The cure

1. **The dot is measured.** `worm.ts` takes `geometry.dot` from the first bed dot's `getBoundingClientRect().width`, beside the `centreOf()` reads that already give `origin` and `pitch` (`worm.ts:125-128`). The `getPropertyValue("--pager-dot-size")` read and its `parseFloat` are deleted. The geometry is then all measured, in one pass, off the same elements.
2. **The cap stays a number.** `--pager-worm-max-stretch` is unitless, so its `parseFloat` is correct and stays.
3. **The sweep.** Every `parseFloat(…getPropertyValue("--…"))` in `src` that reads a length token is listed, and each is made a measurement or a registered `@property` with `syntax: "<length>"`. The static gate below counts them. At HEAD, `rg -n 'parseFloat\([^)]*getPropertyValue\("--' src` lists the sites. The wave record states which of them read lengths.

## 4 · Files it touches

`src/components/pager-dots/worm.ts`, and each length-reading site the §3.3 sweep finds. New: `tests-visual/wired/pager-worm.spec.ts` (appendix A), bound as G-33 in the roster.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E12-G1 · G-33 neck bounded | appendix A, 1440×900 and 390×844 | max neck ≤ hop + 2 × pip, both cells | **300.6 > 76; 300.4 > 76** |
| E12-G2 · no string-parsed dot | `! grep -q 'getPropertyValue("--pager-dot-size")' src/components/pager-dots/worm.ts` | exit 0 | **exit 1** (`worm.ts:134`) |

Can each fail and pass? Both fail at HEAD. The `PI_PLANT` bite for G1 is a style tag setting `--pager-worm-max-stretch: 40` on the rail. The stretch cap then lets the neck outgrow the hop on a cured tree, and G1 turns red on its own assertion.

## 6 · π and DELTA obligations

- **Surface:** demo `/navigation/pager-dots` and `/motion/deck` (the deck's PagerDots) at 1440×900 and 390×844.
- **Themes:** light and dark.
- **Engines:** Chromium measured. Playwright WebKit crashed the page, recorded as a crash. Real Safari is UNMEASURED (OW-3).
- **Paired capture:** at `<E12-base>` and at the wave, a frame strip of one step at 1440 (every 16 ms for 400 ms). HEAD shows the neck spanning the rail; the wave shows a neck no longer than the hop plus two pips. Appendix A's JSON for both runs is saved beside it.

## 7 · MIGRATION rows

None: no public name changes.

## 8 · Ledger rows

Closes F-36. G-33 GOO-MORPH-SIGNATURE is bound.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the worm's geometry is one measured pass, the same one W-F.3 reads for offsets and releases.
- **Wave:** E12-G1..G2 green in one run.
- **Feature:** the pager at 390 and at 1440 steps with a neck that joins adjacent dots and never spans the rail, in one capture per cell.

## Appendix A · `e12.mjs` (lands as `tests-visual/wired/pager-worm.spec.ts`)

```js
// W-E.12 born-RED probe: the pager worm's neck is bounded by the hop (G-33 GOO-MORPH-SIGNATURE).
// node e12.mjs [--eng webkit]
import { sleep, load, CAP, DEMO, ENG } from './lib.mjs';
import fs from 'node:fs';
const eng = process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium';
const out = { eng, load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
fs.mkdirSync(`${CAP}/e12`, { recursive: true });
const b = await ENG[eng].launch();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await page.goto(DEMO + '/navigation/pager-dots', { waitUntil: 'networkidle' }); await sleep(1200);
  const m = await page.evaluate(async () => {
    const rail = [...document.querySelectorAll('.pager-worm-layer')].map((l) => l.parentElement).find((r) => r.querySelectorAll('.pager-dot').length >= 3 && r.getBoundingClientRect().width > 0);
    if (!rail) return null;
    const dots = [...rail.querySelectorAll('.pager-dot')]; const cur = dots.findIndex((d) => d.getAttribute('aria-current') === 'true' || d.getAttribute('aria-selected') === 'true' || d.dataset.state === 'active');
    const from = cur < 0 ? 0 : cur, to = from + 1 < dots.length ? from + 1 : from - 1;
    const pip = rail.querySelectorAll('.goo-dot'); const c = (e) => { const r = e.getBoundingClientRect(); return r.left + r.width / 2; };
    const hop = Math.abs(c(pip[to] ?? dots[to]) - c(pip[from] ?? dots[from]));
    const dot = parseFloat(getComputedStyle(rail).getPropertyValue('--pager-dot-size')) || 12; const dotPx = rail.querySelector('.goo-dot')?.getBoundingClientRect().width || dot;
    const neck = rail.querySelector('.goo-neck'); const ws = [];
    const t0 = performance.now(); dots[to].click();
    await new Promise((res) => { const tick = () => { ws.push(neck.getBoundingClientRect().width); performance.now() - t0 < 1200 ? requestAnimationFrame(tick) : res(); }; requestAnimationFrame(tick); });
    return { hop: +hop.toFixed(1), dotPx: +dotPx.toFixed(1), rawDotToken: getComputedStyle(rail).getPropertyValue('--pager-dot-size').trim(), maxNeck: +Math.max(...ws).toFixed(1), frames: ws.length };
  });
  if (!m) { row(`E12-G1 worm neck ${w}`, false, { error: 'no rail' }); continue; }
  const bound = +(m.hop + 2 * m.dotPx).toFixed(1);
  row(`E12-G1 worm neck ≤ hop + 2·dot ${w}`, m.maxNeck <= bound, { ...m, bound });
  await page.close();
}
await b.close();
out.load2 = load(); fs.writeFileSync(`${CAP}/e12-${eng}.json`, JSON.stringify(out, null, 1));
```
