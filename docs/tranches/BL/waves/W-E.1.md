# W-E.1 · W-SAFE-EDGE: every edge-anchored surface reads the safe-area insets through four root tokens · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src` and `demo` byte-identical to `f3ad78d0` and `8141658d`) in a scratch worktree, `npm run build` and `npm run demo:dist:build` both exit 0; the probe consumer app installs `npm pack` of that worktree (`mkbabb-glass-ui-10.1.0.tgz`) |
| ships in | 11.0.0 |
| families | F-85 (the O-74 F-85 rows) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

This spec also carries the band's probe kit (appendix B). Every band-E wave's appendix probe imports `lib.mjs` and drives the scenes in `P.vue`.

## 1 · What it closes

| id | what |
|---|---|
| F-85 | no library surface reads `env(safe-area-inset-*)` except the deck stage; the Sheet, the Toaster, ExpandableContainer's host and every popper sit inside a notch or home indicator on an edge-to-edge page |
| O-74 F-85 rows | the consumer report that the bottom Sheet's action and the toast sit under the home indicator on a `viewport-fit=cover` page |
| demo re-derivation | `demo/shell/dock-nav.css:34,173-174` re-derives the bottom inset the library should own |

## 2 · The defect at HEAD

Sources:

- `src` reads `env(safe-area-inset-*)` at `src/components/deck/styles/stage.css:33-34` and nowhere else. The demo shell re-derives the bottom inset at `demo/shell/dock-nav.css:34,173-174`.
- The Sheet anchors at `src/components/sheet/styles.css:456-479` and pads at `:558-559` with `var(--space-family)` only.
- `src/components/toast/Toaster.vue:72`: `VIEWPORT_BASE` is `"fixed top-0 …"` and `VIEWPORT_PAD` is `"p-4"`. The viewport goes to the bottom only under `sm:`.
- `src/components/expandable-container/styles.css:5-9` is `position: fixed; inset: 0`. The collapse trigger sits at `:55-58` with `inset-block-start: 0.5rem`.
- `collisionPadding` is passed at one site, `SelectContent.vue:56`. Popover and DropdownMenu content collide against the viewport edge.

Measured (appendix A, `node e1.mjs`, Chromium, CDP `Emulation.setSafeAreaInsetsOverride`, `viewport-fit=cover`): **24 rows, 22 FAIL**. The cells are a portrait phone at 390×844 with insets `{top 47, bottom 34}` and a landscape phone at 844×390 with insets `{left 47, right 47, bottom 21}`.

| gate | HEAD reading |
|---|---|
| G1 tokens | the four tokens are undeclared and compute `0px` |
| G2 Sheet content gap to its edge | 390×844: 13 px against a need of 34 at the bottom and 47 at the top. 844×390: 13 px against a need of 21 at the bottom; 21 px against a need of 47 at the left and right |
| G3 toast | 390×844, all six positions: the toast's top is 31 px inside the top inset and its close disc 41.4 px inside. 844×390: the left-anchored rows fail by 31 px; `top-center` passes |
| G4 ExpandableContainer trigger | 390×844: top 8, 39 px into the top inset. 844×390: 39 px into the right notch |
| G5 popper at 844×390 | Popover from a right-edge trigger spans 508..844 and from a left-edge trigger starts at 0; the menu from the right edge ends at 812. The menu from the left edge passes (47..175) |

The G2 reading is a content-in-plate distance: it is position-independent, so W-E.2's `position: fixed` cure does not move it (the probe injects `position: fixed` on the Sheet, `inj=fixed`, to read the cured anchoring).

**The plant.** Run with `--plant`, the cure-shaped CSS (appendix A, `PLANT`) is injected at page level. G1, G2 and G4 pass. G3 at 390×844 still fails: the toast body clears the inset but the close disc sits 10.4 px outside the toast's top edge, so it overhangs a plain `max(1rem, token)` pad. The cure pads the viewport by the token plus the disc outset (§3.3).

Static RED:

```
$ test "$(grep -rln 'env(safe-area-inset' src demo | grep -v '^src/styles/tokens/offsets.css$' | wc -l)" -eq 0; echo $?
1          # src/components/deck/styles/stage.css, demo/shell/dock-nav.css
$ grep -q -- '--safe-block-end' src/components/dock/README.md; echo $?
1
```

## 3 · The cure

1. **Four root tokens.** `src/styles/tokens/offsets.css` declares `--safe-block-start: env(safe-area-inset-top, 0px)`, `--safe-block-end: env(safe-area-inset-bottom, 0px)`, `--safe-inline-start: env(safe-area-inset-left, 0px)` and `--safe-inline-end: env(safe-area-inset-right, 0px)` on `:root`. This file is the only reader of `env(safe-area-inset-*)` in `src` and `demo`. The `0px` second argument of `env()` is the spec's undefined-variable value, not a masking fallback: the inset is absent on a device with no cutout.
2. **The Sheet** pads each edge by `max(var(--space-family), var(--safe-<edge>))`, replacing the plain `var(--space-family)` at `sheet/styles.css:558-559`. Every edge is padded, not only the anchored one: a bottom Sheet also meets both notches in landscape.
3. **The Toaster** viewport pads each edge by `max(1rem, calc(var(--safe-<edge>) + var(--toast-close-outset)))`. `--toast-close-outset` is declared next to the close disc's own offset in the toast styles, so the pad and the disc share one number. `VIEWPORT_PAD "p-4"` is deleted. W-E.5 owns the viewport's placement below `sm`; this wave only makes the pad inset-aware.
4. **ExpandableContainer's** collapse trigger sits at `inset-block-start: max(0.5rem, var(--safe-block-start))` and `inset-inline-end: max(0.5rem, var(--safe-inline-end))`.
5. **Popper content** passes `collisionPadding` per side, `{ top, right, bottom, left }`, each `max(clearance, token)` read from the root tokens at open time. It is passed once through the overlay content seam (`src/components/_shared/overlay/content.ts`), so Popover, DropdownMenu, Select and Tooltip read one value. The per-site `collisionPadding` at `SelectContent.vue:56` is deleted. The seam line is shared with W-E.4, which adds the z rung and ceilings to the same seam; W-E.1 lands the `collisionPadding` field.
6. **The deck** stage reads `var(--safe-block-*)` in place of its own `env()` at `stage.css:33-34`.
7. **The demo shell's** re-derivation at `demo/shell/dock-nav.css:34,173-174` is deleted; the shell reads the tokens.
8. **The dock placement is documented.** `src/components/dock/README.md` gains a placement section: a consumer that fixes the dock to an edge offsets it by the matching token (`bottom: max(12px, var(--safe-block-end))`). The dock's own seat geometry is D2's (W-I.1); this wave only documents the tokens.

## 4 · Files it touches

`src/styles/tokens/offsets.css`; `src/components/sheet/styles.css`; `src/components/toast/Toaster.vue` and the toast styles; `src/components/expandable-container/styles.css`; `src/components/_shared/overlay/content.ts`; `src/components/select/SelectContent.vue`; `src/components/deck/styles/stage.css`; `demo/shell/dock-nav.css`; `src/components/dock/README.md`. New: `tests-visual/wired/safe-edge.spec.ts` (appendix A ported), and the band's fixture app `tests-visual/fixtures/band-e/` (appendix B) that every band-E wired spec drives. Edited: `.github/workflows/visual.yml` gains the step that builds it against the packed library alongside `dist-demo/` (W-A.3's workflow; W-D.2 keeps the step where it stands, W-D.2 §3 item 6).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E1-G1 · tokens | `safe-edge.spec.ts -g G1` (appendix A G1): the four tokens compute the emulated insets | `47px` / `34px` at 390×844 | **FAIL**: all four `0px` |
| E1-G2 · Sheet | appendix A G2: gap from the Sheet's edge to its content ≥ the inset on the anchored edge and both inline edges, 5 cells | 5 of 5 | **5 of 5 FAIL** (13 against 34/47; 13 and 21 against 21/47) |
| E1-G3 · toast | appendix A G3: the toast and its close disc inside the safe rect, 6 positions × 2 cells | 12 of 12 | **8 of 12 FAIL**; under the plant, the 390×844 rows still fail on the disc (10.4 px) |
| E1-G4 · ExpandableContainer | appendix A G4: the collapse trigger inside the safe rect, 2 cells | 2 of 2 | **2 of 2 FAIL** (39 px into the top inset; 39 px into the right notch) |
| E1-G5 · popper | appendix A G5: Popover and menu from triggers flush with each safe inline edge at 844×390 | 4 of 4 | **3 of 4 FAIL** (Popover 508..844 and 0..336; menu ..812) |
| E1-G6 · one reader | `test "$(grep -rln 'env(safe-area-inset' src demo \| grep -v '^src/styles/tokens/offsets.css$' \| wc -l)" -eq 0` | exit 0 | **exit 1** (`stage.css`, `dock-nav.css`) |
| E1-G7 · dock placement documented | `grep -q -- '--safe-block-end' src/components/dock/README.md` | exit 0 | **exit 1** |

Can each fail and pass? G1-G5 fail at HEAD (22 of 24 rows), and the `--plant` run shows G1, G2 and G4 passing with the cure's CSS injected. G3's plant run stays red at 390×844, which is why §3.3 adds the disc outset to the pad. The `PI_PLANT` bite for the wired spec is the reverse: a style tag setting the four tokens to `0px` turns G1-G5 red on a cured tree.

## 6 · π and DELTA obligations

- **Surface:** the band-E fixture app (appendix B), scenes `sheet`, `toast`, `ec`, `pop`, `menu`, at 390×844 and 844×390, with the emulated insets.
- **Themes:** light and dark (`&theme=dark`). The claim is geometric, so both themes must read the same rows.
- **Engines:** Chromium measured (CDP insets). Playwright WebKit has no safe-area emulation, so it has no cell for this wave, and that is labelled. Real Safari on an iPhone with a notch is UNMEASURED (OW-3, the owner's safaridriver checkbox): the claim that `env()` resolves on a real device is the owner's cell.
- **Paired capture:** `node e1.mjs --shots` at `<E1-base>` and at the wave writes `sheet-{P,L}-*.png`, `toast-{P,L}-top-right.png`, `ec-{P,L}.png`, `{pop,menu}-L-rs.png`. The DELTA is each pair side by side with the safe rect outlined, plus the appendix A JSON of both runs. The before set is taken at `<E1-base>` with `WAVE=W-E.1`, into `.cache/evidence/W-E.1/e1/`; formation's HEAD shots sat in a session scratchpad and are not evidence.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| Sheet, Toaster, ExpandableContainer ignore safe-area insets | they pad by `max(own gap, --safe-*)` | on a `viewport-fit=cover` page the content moves inward by the inset; on a page without a cutout nothing moves |
| `collisionPadding` set per Select | set once on the overlay content seam from the tokens | a consumer's own `collisionPadding` prop on `SelectContent` still wins (it is a prop on the content, not the seam default) |
| none | `--safe-block-start`, `--safe-block-end`, `--safe-inline-start`, `--safe-inline-end` | new public tokens; a consumer that fixes its own chrome to an edge reads them |

No alias: the demo's own inset variables are deleted, not re-pointed.

## 8 · Ledger rows

Closes O-74's F-85 rows. Carries the tokens W-E.3, W-E.4 and W-E.5 read.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one inset source, read by every edge-anchored surface. The dock reads it through the README placement and D2's seat.
- **Wave:** E1-G1..G7 green in one run.
- **Feature:** the 844×390 capture shows a bottom Sheet, an open toast and a right-edge Popover all clear of both notches and the home indicator in one frame.

## Appendix A · `e1.mjs` (the born-RED probe; lands as `tests-visual/wired/safe-edge.spec.ts`)

```js
// W-E.1 born-RED probe: every edge-anchored surface reads the safe-area insets.
// node e1.mjs [--shots] [--plant]  (Chromium only: CDP Emulation.setSafeAreaInsetsOverride; viewport-fit=cover is in e.html)
import { open, rectOf, sleep, load, CAP } from './lib.mjs';
import fs from 'node:fs';
const shots = process.argv.includes('--shots'); if (shots) fs.mkdirSync(`${CAP}/e1`, { recursive: true });
const PLANT = process.argv.includes('--plant') ? `addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(`:root{--safe-block-start:env(safe-area-inset-top,0px);--safe-block-end:env(safe-area-inset-bottom,0px);--safe-inline-start:env(safe-area-inset-left,0px);--safe-inline-end:env(safe-area-inset-right,0px)}
[data-slot=sheet-content]{padding-block:max(var(--space-family),var(--safe-block-start)) max(var(--space-family),var(--safe-block-end)) !important;padding-inline:max(var(--space-family),var(--safe-inline-start)) max(var(--space-family),var(--safe-inline-end)) !important}
ol[role=region],[role=region] > ol,ol[aria-live]{padding:max(1rem,var(--safe-block-start)) max(1rem,var(--safe-inline-end)) max(1rem,var(--safe-block-end)) max(1rem,var(--safe-inline-start)) !important}
.expandable-container [data-part=trigger]{inset-block-start:max(0.5rem,var(--safe-block-start)) !important;inset-inline-end:max(0.5rem,var(--safe-inline-end)) !important}`)};document.head.append(s)})` : null;
const P = { w: 390, h: 844, ins: { top: 47, bottom: 34, left: 0, right: 0 } };
const L = { w: 844, h: 390, ins: { top: 0, bottom: 21, left: 47, right: 47 } };
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const within = (r, s, tol = 0.5) => r && s && r.t >= s.t - tol && r.b <= s.b + tol && r.l >= s.l - tol && r.r <= s.r + tol;
const outBy = (r, s) => r && s ? { t: +(s.t - r.t).toFixed(1), b: +(r.b - s.b).toFixed(1), l: +(s.l - r.l).toFixed(1), r: +(r.r - s.r).toFixed(1) } : null;

// G1 · the four root tokens resolve to the insets
{ const { browser, page } = await open({ init: PLANT, ...P, touch: true, mobile: true, qs: 's=none' });
  const v = await page.evaluate(() => { const e = document.createElement('div'); document.body.append(e); const k = ['--safe-block-start', '--safe-block-end', '--safe-inline-start', '--safe-inline-end']; const r = {}; for (const t of k) { e.style.paddingTop = `var(${t})`; r[t] = getComputedStyle(e).paddingTop; } return r; });
  row('E1-G1 tokens', v['--safe-block-start'] === '47px' && v['--safe-block-end'] === '34px', v); await browser.close(); }

// G2 · the Sheet's content clears the inset on its anchored edge and both inline edges
for (const [cell, C, sides] of [['P', P, ['bottom', 'top']], ['L', L, ['bottom', 'left', 'right']]]) for (const side of sides) {
  const { browser, page } = await open({ init: PLANT, ...C, touch: true, mobile: true, qs: `s=sheet&side=${side}&det=none&auto=sheet&inj=fixed` });
  await sleep(900);
  const s = await rectOf(page, '[data-slot=sheet-content]'), sf = await rectOf(page, '[data-probe=safe]');
  const a = await rectOf(page, '[data-probe=action]'), t = await rectOf(page, '[data-probe=title]'), f = await rectOf(page, '[data-probe=body] input');
  // content-in-sheet distances: position-independent, so W-E.2's position cure does not move this reading
  const need = { bottom: C.ins.bottom, top: C.ins.top, left: C.ins.left, right: C.ins.right };
  const gap = { bottom: +(s.b - a.b).toFixed(1), top: +(t.t - s.t).toFixed(1), left: +(Math.min(t.l, f.l) - s.l).toFixed(1), right: +(s.r - Math.max(a.r, f.r)).toFixed(1) };
  const edges = side === 'bottom' ? ['bottom', 'left', 'right'] : side === 'top' ? ['top', 'left', 'right'] : [side, 'top', 'bottom'].filter((e) => e !== 'top' || C.ins.top);
  const ok = edges.filter((e) => e in gap && need[e]).every((e) => gap[e] >= need[e] - 0.5);
  row(`E1-G2 sheet ${cell} ${side}`, ok, { need, gap, action: a && [a.t, a.b], safe: sf && [sf.t, sf.b, sf.l, sf.r] });
  if (shots) await page.screenshot({ path: `${CAP}/e1/sheet-${cell}-${side}.png` });
  await browser.close();
}

// G3 · toasts and their close disc inside the safe rect, all six positions, both cells
for (const [cell, C] of [['P', P], ['L', L]]) for (const pos of ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']) {
  const { browser, page } = await open({ init: PLANT, ...C, touch: true, mobile: true, qs: `s=toast&pos=${pos}&inf=1` });
  await sleep(700);
  const sf = await rectOf(page, '[data-probe=safe]');
  const t = await rectOf(page, '[data-slot=toast]') || await rectOf(page, 'li[role=status], li');
  const x = await page.evaluate(() => { const e = document.querySelector('[data-slot=toast] button[aria-label=Dismiss]'); if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; });
  row(`E1-G3 toast ${cell} ${pos}`, within(t, sf) && (!x || within(x, sf)), { toastOut: outBy(t, sf), closeOut: x && outBy(x, sf) });
  if (shots && pos === 'top-right') await page.screenshot({ path: `${CAP}/e1/toast-${cell}-${pos}.png` });
  await browser.close();
}

// G4 · the expanded ExpandableContainer's collapse trigger inside the safe rect
for (const [cell, C] of [['P', P], ['L', L]]) {
  const { browser, page } = await open({ init: PLANT, ...C, touch: true, mobile: true, qs: 's=ec&auto=ec' });
  await sleep(700);
  const sf = await rectOf(page, '[data-probe=safe]');
  const tr = await rectOf(page, '.expandable-container__chrome:not([hidden]) [data-part=trigger]');
  row(`E1-G4 expandable trigger ${cell}`, within(tr, sf), { trig: tr && [tr.t, tr.l, tr.r], out: outBy(tr, sf) });
  if (shots) await page.screenshot({ path: `${CAP}/e1/ec-${cell}.png` });
  await browser.close();
}

// G5 · popper content opened from a trigger flush with the safe inline end keeps inside the safe rect
for (const [kind, sel] of [['pop', '[data-probe=popc]'], ['menu', '[data-probe=menuc]']]) for (const edge of ['rs', 'ls']) {
  const { browser, page } = await open({ init: PLANT, ...L, touch: true, mobile: true, qs: `s=${kind}&edge=${edge}&auto=${kind}` });
  await sleep(700);
  const sf = await rectOf(page, '[data-probe=safe]'); const c = await rectOf(page, sel);
  row(`E1-G5 ${kind} L ${edge}`, within(c, sf), { content: c && [c.l, c.r], safe: [sf.l, sf.r] });
  if (shots && edge === 'rs') await page.screenshot({ path: `${CAP}/e1/${kind}-L-${edge}.png` });
  await browser.close();
}
out.load2 = load();
fs.mkdirSync(CAP, { recursive: true }); fs.writeFileSync(`${CAP}/e1.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e1: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```

## Appendix B · the band-E probe kit

The consumer app installs the packed HEAD build (`npm pack` of the worktree, extracted into `app/node_modules/@mkbabb/glass-ui`) and is served by `vite preview --port 5874`. The built demo (`npm run demo:dist:build`) is served by `vite preview --config demo/vite.demo-dist.config.ts --port 5873`. Machine load at the runs was 21 to 88 (other seats); every timing-sensitive row names the load it ran under.

### `lib.mjs`

```js
// Band E probe library: one consumer app (the packed HEAD build) on :5874, the built demo on :5873.
import { chromium, webkit } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import os from 'node:os';
export const APP = 'http://localhost:5874/pages/e.html';
export const APP2 = 'http://localhost:5874/pages/f.html';
export const DEMO = 'http://localhost:5873';
const WAVE = process.env.WAVE; // the running wave's id: the one evidence root is .cache/evidence/<wave>/ (PLAN §1)
if (!/^W-[0-9A-L]\.[0-9]+$/.test(WAVE ?? '')) throw new Error('run as WAVE=<wave id> node <probe>');
export const CAP = `.cache/evidence/${WAVE}`;
export const load = () => os.loadavg().map((x) => x.toFixed(2)).join('/');
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const ENG = { chromium, webkit };
// o: { eng, w, h, touch, mobile, qs, url, ins, theme, media:[{name,value}], reduce, dsf }
export async function open(o) {
  const browser = await ENG[o.eng || 'chromium'].launch();
  const ctx = await browser.newContext({ viewport: { width: o.w, height: o.h }, hasTouch: !!o.touch, isMobile: !!o.mobile, deviceScaleFactor: o.dsf || 1, colorScheme: o.theme === 'dark' ? 'dark' : 'light', reducedMotion: o.reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  let cdp = null;
  if ((o.eng || 'chromium') === 'chromium') {
    cdp = await ctx.newCDPSession(page);
    if (o.ins) await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: o.ins });
    if (o.media) await cdp.send('Emulation.setEmulatedMedia', { features: o.media });
  }
  if (o.init) await page.addInitScript(o.init);
  const url = o.url || `${APP}?${o.qs || ''}${o.theme === 'dark' ? '&theme=dark' : ''}`;
  await page.goto(url, { waitUntil: o.url ? 'networkidle' : 'load' });
  if (!o.url) await page.waitForFunction(() => window.__ready, null, { timeout: 15000 });
  await sleep(o.settle ?? 500);
  return { browser, ctx, page, cdp };
}
export const rectOf = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { l: +r.left.toFixed(1), t: +r.top.toFixed(1), r: +r.right.toFixed(1), b: +r.bottom.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
export const cs = (page, sel, props, pseudo) => page.evaluate(([s, p, ps]) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e, ps || null); return Object.fromEntries(p.map((k) => [k, c.getPropertyValue(k)])); }, [sel, props, pseudo]);
export const hit = (page, x, y) => page.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); if (!e) return null; const p = e.closest('[data-probe]'); return (p ? p.dataset.probe : '') + '|' + (e.closest('[data-slot]')?.dataset.slot || e.tagName); }, [x, y]);
```

### App shell

`vite.config.js`: `plugins: [vue(), tailwindcss()]`, `build.rollupOptions.input` = `pages/e.html`, `pages/f.html`, `pages/g.html`, `minify: false`.

`src/app.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@source "../node_modules/@mkbabb/glass-ui/dist";
@source "./";
@variant dark (&:where(.dark, .dark *));
```

`pages/e.html` (`viewport-fit=cover`, mounts `src/e.js`); `pages/f.html` (two roots `#a1`, `#a2`, mounts `src/f.js`); `pages/g.html` (a parent page with `<button id="outside">` and an iframe of `/pages/e.html?s=pop&edge=mid&auto=pop`).

`src/e.js`:

```js
import "./app.css";
import { createApp } from "vue";
import P from "./P.vue";
const q = new URLSearchParams(location.search);
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
window.__warns = [];
const app = createApp(P);
app.config.errorHandler = (e) => window.__warns.push("ERR " + String(e).slice(0, 300));
app.config.warnHandler = (m) => window.__warns.push("WARN " + String(m).slice(0, 200));
app.mount("#app");
for (const inj of (q.get("inj") || "").split(",").filter(Boolean)) {
  const css = { fixed: '[data-slot="sheet-content"]{position:fixed !important}', bb: '*,*::before,*::after{box-sizing:border-box}' }[inj];
  if (css) { const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); }
}
```

`src/f.js`:

```js
import "./app.css";
import { createApp, h } from "vue";
import { Toaster, toast } from "@mkbabb/glass-ui/toast";
createApp({ render: () => h(Toaster) }).mount("#a1");
createApp({ render: () => h(Toaster) }).mount("#a2");
window.__toast = (o) => toast(o);
window.__ready = true;
```

### `src/P.vue` (one scene per `?s=`)

```vue
<script setup>
// Band E born-RED scenes. One page, one scene per `?s=`. Each scene exposes data-probe hooks.
import { ref, onMounted, nextTick } from "vue";
import { GlassDock, DockControl } from "@mkbabb/glass-ui/dock";
import { Button } from "@mkbabb/glass-ui/button";
import { Input } from "@mkbabb/glass-ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from "@mkbabb/glass-ui/dialog";
import { SheetContent } from "@mkbabb/glass-ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@mkbabb/glass-ui/menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@mkbabb/glass-ui/select";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@mkbabb/glass-ui/tooltip";
import { Toaster, toast } from "@mkbabb/glass-ui/toast";
import { ExpandableContainer } from "@mkbabb/glass-ui/expandable-container";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { PagerDots } from "@mkbabb/glass-ui/pager-dots";
import { Slider } from "@mkbabb/glass-ui/slider";
import { registerShortcut } from "@mkbabb/glass-ui/keyboard";
import { Chip } from "@mkbabb/glass-ui/chip";
import { Card } from "@mkbabb/glass-ui/card";
import { LabeledSwitch } from "@mkbabb/glass-ui/labeled-field";

const q = new URLSearchParams(location.search);
const s = q.get("s") || "none";
const side = q.get("side") || "bottom";
const det = q.get("det") === "none" || !q.get("det") ? undefined : q.get("det").split(",").map(Number);
const modal = q.get("modal") !== "0";
const dockAt = q.get("dock");
const rows = Number(q.get("rows") || 2);
const edge = q.get("edge") || "left";
const ov = q.get("ov") || "pop";
const tall = !!q.get("tall");
const pos = q.get("pos") || "bottom-right";

const open = ref(false); const sheet = ref(false); const pop = ref(false); const menu = ref(false); const sel = ref(false); const tip = ref(false); const dlg = ref(false); const ec = ref(false);
const dv = ref(q.get("d") ? Number(q.get("d")) : null);
const sw = ref([true, false]); const seg4 = [{label:'Overview',value:'a'},{label:'Members',value:'b'},{label:'Audit log',value:'c'},{label:'Settings',value:'d'}];
const chipSel = ref(true); const chipGone = ref(false);
const selv = ref("a"); const tg = ref("a"); const seg = ref("a"); const sv = ref([40]);
window.__dv = (v) => { dv.value = v; }; window.__getdv = () => dv.value;
const refs = { open, sheet, pop, menu, sel, tip, dlg, ec };
window.__set = (k, v = true) => { if (typeof k === "boolean") { sheet.value = k; return; } refs[k].value = v; };
window.__state = () => ({ open: sheet.value, dv: dv.value, pop: pop.value, menu: menu.value, sel: sel.value, dlg: dlg.value, ec: ec.value });
window.__log = []; window.__esc = 0; window.__clicks = 0;
const bump = () => { window.__clicks++; };
window.__toast = (o) => toast(o);
if (s === "esc" || s === "ecesc") registerShortcut("Escape", () => { window.__esc++; }, { label: "app escape" });
const long = "Supercalifragilisticexpialidocious".repeat(6).slice(0, 200);
const segOpts = [{ label: "Overview", value: "a" }, { label: "Members", value: "b" }];
const segLong = [{ label: long, value: "a" }, { label: "Two", value: "b" }];
const seg8 = Array.from({ length: 8 }, (_, i) => ({ label: "Section " + (i + 1), value: String.fromCharCode(97 + i) }));
const trigStyle = {
  left: "position:fixed;left:8px;top:120px", right: "position:fixed;right:8px;top:120px",
  rs: "position:fixed;right:env(safe-area-inset-right);top:50%", ls: "position:fixed;left:env(safe-area-inset-left);top:50%",
  bottom: "position:fixed;left:40%;bottom:24px", top: "position:fixed;left:40%;top:8px", mid: "position:fixed;left:40%;top:40%",
}[edge];
function showNative() { const d = document.querySelector("[data-probe=native]"); d?.showModal(); }
onMounted(async () => {
  await nextTick();
  if (s === "toast") { const n = Number(q.get("n") || 1); for (let i = 0; i < n; i++) toast({ title: q.get("title") || "Saved " + (i + 1), description: "Toast body", tone: q.get("tone") || undefined, duration: q.get("inf") ? Number.POSITIVE_INFINITY : undefined }); }
  if (q.get("auto")) { for (const k of q.get("auto").split(",")) refs[k].value = true; }
  if (s === "native" || s === "topdlg") showNative();
  await nextTick();
  window.__ready = true;
});
</script>
<template>
  <main style="min-height:100dvh;padding:16px;background:linear-gradient(135deg,#f6c28b,#9ec5f0 50%,#c9a3e8)">
    <div data-probe="safe" style="position:fixed;top:env(safe-area-inset-top);bottom:env(safe-area-inset-bottom);left:env(safe-area-inset-left);right:env(safe-area-inset-right);pointer-events:none"></div>

    <!-- dock at an edge (sheet reach, inert outside) -->
    <div v-if="dockAt" data-probe="dockwrap" :style="`position:fixed;left:0;right:0;${dockAt}:12px;display:flex;justify-content:center;pointer-events:none`" class="z-dock">
      <GlassDock :collapse="false" data-probe="dock">
        <DockControl aria-label="Home" data-probe="dc1" @click="bump">H</DockControl>
        <DockControl aria-label="Next" data-probe="dc2" @click="bump">N</DockControl>
        <DockControl aria-label="More" data-probe="dc3">M</DockControl>
      </GlassDock>
    </div>

    <!-- SHEET (W-E.1, W-E.2, W-E.3) -->
    <template v-if="s === 'sheet'">
      <p v-for="i in 30" :key="i" style="padding:4px 0">Page row {{ i }}</p>
      <Dialog v-model:open="sheet" :modal="modal">
        <SheetContent :side="side" :detents="det" v-model:detent="dv" data-probe="sheet">
          <DialogHeader data-probe="header"><DialogTitle data-probe="title">Controls</DialogTitle><DialogDescription>Scene controls</DialogDescription></DialogHeader>
          <div data-probe="body"><div v-for="i in rows" :key="i" style="padding:6px 0">Body row {{ i }} <Input :placeholder="'v'+i" /></div></div>
          <DialogFooter><Button data-probe="action">Done</Button></DialogFooter>
        </SheetContent>
      </Dialog>
    </template>

    <!-- TOAST (W-E.1, W-E.5) -->
    <template v-if="s === 'toast'">
      <Toaster :position="pos" />
      <Toaster v-if="q.get('two')" :position="pos" />
    </template>

    <!-- EXPANDABLE CONTAINER host (W-E.1 trigger inset; W-E.4 host-relative z) -->
    <ExpandableContainer v-if="s === 'ec' || s === 'ecesc'" v-model:open="ec" data-probe="ec">
      <div style="padding:24px;display:flex;gap:8px;flex-wrap:wrap">
        <Select v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick"><SelectValue /></SelectTrigger>
          <SelectContent data-probe="selc"><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select>
        <Popover v-model:open="pop"><PopoverTrigger as-child><Button data-probe="poptrig">Pop</Button></PopoverTrigger><PopoverContent data-probe="popc">Popover body</PopoverContent></Popover>
        <TooltipProvider :delay-duration="0"><Tooltip v-model:open="tip"><TooltipTrigger as-child><Button data-probe="tiptrig">Tip</Button></TooltipTrigger><TooltipContent data-probe="tipc">Tooltip body</TooltipContent></Tooltip></TooltipProvider>
      </div>
    </ExpandableContainer>

    <!-- POPPER at an edge; tall variants (W-E.1 collision; W-E.4 ceilings) -->
    <Popover v-if="s === 'pop'" v-model:open="pop">
      <PopoverTrigger as-child><Button data-probe="trig" :style="trigStyle">Filters</Button></PopoverTrigger>
      <PopoverContent data-probe="popc"><div v-for="i in (tall ? 14 : 2)" :key="i" style="padding:6px 0">Filter row {{ i }} <Input placeholder="value" /></div></PopoverContent>
    </Popover>
    <DropdownMenu v-if="s === 'menu'" v-model:open="menu">
      <DropdownMenuTrigger as-child><Button data-probe="trig" :style="trigStyle">Menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent data-probe="menuc"><DropdownMenuItem v-for="i in (tall ? 16 : 3)" :key="i" :data-probe="'mi'+i">Item {{ i }}</DropdownMenuItem></DropdownMenuContent>
    </DropdownMenu>
    <div v-if="s === 'dialog'" popover="manual" data-probe="npop" style="position:fixed;inset:auto;left:20px;top:20px;padding:12px"><button data-probe="npopbtn" @click="bump">Native popover button</button></div>
    <Dialog v-if="s === 'dialog'" v-model:open="dlg">
      <DialogContent data-probe="dialog" :dismiss="q.get('dismiss') || undefined"><DialogTitle data-probe="dtitle">Export frame</DialogTitle><DialogDescription>Options</DialogDescription>
        <div v-for="i in 8" :key="i" style="padding:4px 0"><Input :placeholder="'Field '+i" /></div>
        <DialogFooter><Button data-probe="action">Download</Button></DialogFooter></DialogContent>
    </Dialog>

    <!-- TOOLTIP inside a host (W-E.4 host-relative z) -->
    <template v-if="s === 'tip'">
      <Popover v-if="ov === 'pop'" v-model:open="pop"><PopoverTrigger as-child><Button data-probe="hosttrig">Host</Button></PopoverTrigger>
        <PopoverContent data-probe="host"><TooltipProvider :delay-duration="0"><Tooltip v-model:open="tip"><TooltipTrigger as-child><Button data-probe="tiptrig">Inner</Button></TooltipTrigger><TooltipContent data-probe="tipc" side="bottom">Tooltip over its host plate</TooltipContent></Tooltip></TooltipProvider><p style="height:80px">host body</p></PopoverContent></Popover>
      <Dialog v-if="ov === 'dialog'" v-model:open="dlg"><DialogContent data-probe="host"><DialogTitle>Host</DialogTitle><DialogDescription>d</DialogDescription>
        <TooltipProvider :delay-duration="0"><Tooltip v-model:open="tip"><TooltipTrigger as-child><Button data-probe="tiptrig">Inner</Button></TooltipTrigger><TooltipContent data-probe="tipc" side="bottom">Tooltip over its host plate</TooltipContent></Tooltip></TooltipProvider><p style="height:80px">host body</p></DialogContent></Dialog>
    </template>

    <!-- ESCAPE: an app-global Escape shortcut plus one overlay (W-E.4 dismissal) -->
    <template v-if="s === 'esc'">
      <Select v-if="ov === 'sel'" v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick"><SelectValue /></SelectTrigger><SelectContent data-probe="selc"><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select>
      <Popover v-if="ov === 'pop'" v-model:open="pop"><PopoverTrigger as-child><Button>Pop</Button></PopoverTrigger><PopoverContent data-probe="popc"><Button>inside</Button></PopoverContent></Popover>
      <DropdownMenu v-if="ov === 'menu'" v-model:open="menu"><DropdownMenuTrigger as-child><Button>Menu</Button></DropdownMenuTrigger><DropdownMenuContent data-probe="menuc"><DropdownMenuItem>One</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
      <Dialog v-if="ov === 'dialog' || ov === 'dsel'" v-model:open="dlg"><DialogContent data-probe="dialog"><DialogTitle>D</DialogTitle><DialogDescription>d</DialogDescription>
        <Select v-if="ov === 'dsel'" v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick"><SelectValue /></SelectTrigger><SelectContent data-probe="selc"><SelectItem value="a">Alpha</SelectItem></SelectContent></Select></DialogContent></Dialog>
    </template>

    <!-- NATIVE modal dialog host (W-E.4 host leg; W-E.2 top-layer rest state) -->
    <dialog v-if="s === 'native' || s === 'topdlg'" data-probe="native" :class="s === 'topdlg' ? 'glass-top-layer' : ''" style="width:320px;height:260px;padding:16px">
      <p>native host</p>
      <Select v-if="ov === 'sel'" v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick"><SelectValue /></SelectTrigger><SelectContent data-probe="ovc"><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select>
      <Popover v-if="ov === 'pop'" v-model:open="pop"><PopoverTrigger as-child><Button>Pop</Button></PopoverTrigger><PopoverContent data-probe="ovc">Popover body</PopoverContent></Popover>
      <DropdownMenu v-if="ov === 'menu'" v-model:open="menu"><DropdownMenuTrigger as-child><Button>Menu</Button></DropdownMenuTrigger><DropdownMenuContent data-probe="ovc"><DropdownMenuItem>One</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
      <TooltipProvider v-if="ov === 'tip'" :delay-duration="0"><Tooltip v-model:open="tip"><TooltipTrigger as-child><Button>Tip</Button></TooltipTrigger><TooltipContent data-probe="ovc">Tooltip body</TooltipContent></Tooltip></TooltipProvider>
      <Dialog v-if="ov === 'dialog'" v-model:open="dlg"><DialogContent data-probe="ovc"><DialogTitle>Inner</DialogTitle><DialogDescription>d</DialogDescription></DialogContent></Dialog>
    </dialog>

    <!-- OUTSIDE: an open Select beside a dock (W-E.4 inert leg) -->
    <template v-if="s === 'inert'">
      <Select v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick"><SelectValue /></SelectTrigger><SelectContent data-probe="selc"><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select>
    </template>

    <!-- SELECT slide (W-E.2) -->
    <Select v-if="s === 'selslide'" v-model="selv" v-model:open="sel"><SelectTrigger data-probe="seltrig" aria-label="Pick" style="margin-top:200px"><SelectValue /></SelectTrigger><SelectContent data-probe="selc"><SelectItem value="a">Alpha</SelectItem><SelectItem value="b">Beta</SelectItem></SelectContent></Select>

    <!-- TOGGLE on/off (W-E.2 paint layering) -->
    <div v-if="s === 'toggle'" style="padding:40px;background:#f4f1ec">
      <ToggleGroup v-model="tg" type="single" data-probe="tgroup"><ToggleGroupItem value="a" data-probe="on" aria-label="On">Bold</ToggleGroupItem><ToggleGroupItem value="b" data-probe="off" aria-label="Off">Italic</ToggleGroupItem></ToggleGroup>
    </div>

    <!-- HALO: a capsule 2 px inside each content rung (W-E.2 containment; D3 M-7) -->
    <div v-if="s === 'halo'" style="position:relative;height:820px;background:#f4f1ec">
      <section v-for="(c, i) in ['glass-wash','glass-quiet','glass-resting','glass-card']" :key="c" :class="c" :data-halo-host="c" :style="`position:absolute;left:120px;top:${40+i*150}px;width:300px;height:120px;box-sizing:border-box`">
        <button class="glass-capsule" data-halo-capsule style="position:absolute;left:2px;top:40px;padding:8px 16px">Pause</button>
      </section>
      <div data-halo-ref style="position:absolute;left:120px;top:640px;width:300px;height:120px"><button class="glass-capsule" data-halo-capsule style="position:absolute;left:2px;top:40px;padding:8px 16px">Pause</button></div>
    </div>

    <!-- DISCLOSURE at rest under 1.4.12 spacing (W-E.2 containment) -->
    <div v-if="s === 'disc'" style="width:85px" class="spacing-1412">
      <Collapsible :default-open="true" data-probe="coll"><CollapsibleTrigger as-child><Button size="sm">T</Button></CollapsibleTrigger>
        <CollapsibleContent data-probe="collc"><p data-probe="collp">Bookkeeping retrospectively</p></CollapsibleContent></Collapsible>
    </div>

    <!-- COARSE rung pair (W-E.2 second floor) -->
    <div v-if="s === 'rung'" style="display:flex;gap:8px;align-items:flex-start">
      <Button size="sm" data-probe="lbl">Label</Button>
      <Button size="sm" icon-only data-probe="icon" aria-label="Icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/></svg></Button>
    </div>

    <!-- TYPE ladder under coarse (W-E.7) -->
    <template v-if="s === 'type'">
      <h1 data-probe="t-display1" style="font-size:var(--type-display-1)">Nothing here</h1>
      <h2 class="text-heading" data-probe="t-heading">Pane title</h2>
      <h3 class="text-subheading" data-probe="t-subheading">Section</h3>
      <Button data-probe="t-button">Go home</Button>
      <Button size="sm" data-probe="t-button-sm">Small</Button>
      <Input data-probe="t-input" placeholder="Share URL" />
      <div style="margin-top:8px"><SegmentedTabs v-model="seg" :options="segOpts" data-probe="t-seg" aria-label="Curve" /></div>
    </template>

    <!-- LABEL slots: 200-char labels in a 384 px seat (W-E.7) -->
    <div v-if="s === 'lbl'" style="width:384px;display:flex;flex-direction:column;gap:12px" data-probe="seat">
      <SegmentedTabs v-model="seg" :options="segLong" aria-label="Long" data-probe="l-seg" />
      <ToggleGroup v-model="tg" type="single" data-probe="l-tg"><ToggleGroupItem value="a" :aria-label="long">{{ long }}</ToggleGroupItem><ToggleGroupItem value="b" aria-label="b">B</ToggleGroupItem></ToggleGroup>
      <Button data-probe="l-btn">{{ long }}</Button>
      <Select v-model="selv"><SelectTrigger data-probe="l-sel" aria-label="Long"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="a">{{ long }}</SelectItem></SelectContent></Select>
    </div>

    <!-- COUNT: rails and strips in a 384 px seat (W-E.7) -->
    <div v-if="s === 'count'" style="width:384px" data-probe="seat">
      <PagerDots :count="20" :model-value="0" aria-label="Pages" data-probe="c-dots" />
      <div style="margin-top:12px"><SegmentedTabs v-model="seg" :options="seg8" aria-label="Eight" data-probe="c-seg" /></div>
    </div>

    <!-- SLIDER coarse hit area (W-E.7, G-23) -->
    <div v-if="s === 'slider'" style="width:300px;padding:40px"><Slider v-model="sv" :min="0" :max="100" aria-label="Volume" data-probe="slider" /></div>

    <!-- COMPACT dock seats under coarse (W-E.7) -->
    <div v-if="s === 'dockc'" style="position:fixed;left:0;right:0;top:40px;display:flex;justify-content:center" class="z-dock">
      <GlassDock :collapse="false" data-probe="dock">
        <DockControl compact aria-label="Controls" data-probe="c1">C</DockControl>
        <DockControl compact aria-label="Keys" data-probe="c2">K</DockControl>
        <DockControl aria-label="Home" data-probe="r1">H</DockControl>
      </GlassDock>
    </div>
    <!-- CHIPS (W-E.6): five toned static chips, one selected, one removable -->
    <div v-if="s === 'chips'" style="display:flex;flex-wrap:wrap;gap:12px;padding:24px;background:#f4f1ec">
      <Chip v-for="t in ['oklch(0.6 0.2 25)','oklch(0.6 0.2 145)','oklch(0.6 0.2 260)','oklch(0.75 0.17 80)','oklch(0.55 0.2 310)']" :key="t" :tone="t" data-probe="tchip">Tone</Chip>
      <Chip mode="selectable" v-model="chipSel" data-probe="selchip">Selected</Chip>
      <Chip v-if="!chipGone" mode="removable" remove-label="Remove filter" data-probe="remchip" @remove="chipGone = true">Filter</Chip>
      <Chip size="sm" data-probe="smchip">Small</Chip>
    </div>
    <!-- PAIRING (W-E.7): plates whose pad must equal r − 4 -->
    <template v-if="s === 'pair'">
      <Card data-probe="p-card" style="max-width:320px"><p>Card body</p></Card>
    </template>
    <div v-if="s === 'xs'" style="padding:24px"><Button size="xs" data-probe="xsbtn">Save</Button></div>
    <!-- FOLD (W-E.9): a 4-tab strip in a 328 px container -->
    <div v-if="s === 'fold'" style="width:328px;margin-top:40px" data-probe="foldbox"><SegmentedTabs v-model="seg" :options="seg4" aria-label="Admin" data-probe="fold" /></div>
    <!-- LSW (W-E.9): horizontal LabeledSwitch rows in a Dialog -->
    <Dialog v-if="s === 'lsw'" v-model:open="dlg">
      <DialogContent data-probe="dialog"><DialogTitle>Export</DialogTitle><DialogDescription>Options</DialogDescription>
        <LabeledSwitch v-for="(v,i) in sw" :key="i" v-model="sw[i]" layout="horizontal" :label="['Transparent background','Include axes'][i]" description="Applies to the exported file" :data-probe="'lsw'+i" />
      </DialogContent>
    </Dialog>
  </main>
</template>
<style>
.spacing-1412, .spacing-1412 * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
</style>
```
