# W-E.10 · the demo remainder: a preview on every card, the configurator expression, OKLCH stills, per-page aurora, the shell at the phone cell · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, demo built there (`npm run demo:dist:build`) |
| ships in | 11.0.0 |
| families | F-34 (#18 W-DELETE's compositions prune, #52 W-CONFIG-EXPRESS, #56 W-DEMO-TRUTH, #58 W-PREVIEW-CARD); F-25 (W-STILL-OKLCH); F-20 (the demo shell at the phone cell). Folds: W-B.1 (L05a-03, L01a-18, the compositions prune), W-B.3 (L05b-19, "many more examples"), W-B.4 (R2-06-08: per-page aurora, and the header one √φ rung down). The latches W-A.2 retires here: `tests/demo/story-preview-card.test.ts:487,556` |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #58 / R2-08-16 | 10 of 80 story cards carry a preview (`demo/chassis/landing/storyTile.ts:35-39` resolves 70 to none) |
| latch `:487` | 10 story SFCs are globbed and bundled but have no manifest row: `data/avatar`, `display/dark-mode-toggle`, `display/separator`, `display/status-dot`, `feedback/toaster`, `forms/label`, `forms/select`, `foundations/paper-texture`, `motion/countup`, `motion/typewriter` |
| latch `:556` | one story restates its own title: `substrates/aurora` passes `heading="Aurora"` (`demo/stories/substrates/aurora.vue:136`) |
| #52 | the configurator expression's unbuilt list (BK census CEN:75): MOVE 1 (height overrides, L1 φ split, L2 368 floor, X6/X7), MOVE 2a detail region, MOVE 2c show-all, MOVE 3's six LabeledField props, MOVE 4 tier, the gallery split with the `PresetPickerRow` deletion, and the `#transport` slot |
| #56 | ShowcaseFrame's resting tier paints `opaque` (`demo/chassis/showcase/ShowcaseFrame.vue:45`); `plateField` is hand-copied into `demo/stories/forms/slider.vue:35` and `demo/stories/navigation/tabs.vue:35` |
| #18, L05a-03, L01a-18 | `demo/stories/compositions/` (5 stories: `auth-shell`, `chassis`, `empty-states`, `form-validation`, `settings`) and its category are live |
| L05b-19 | "many more examples": the preview specimens and size ladder are the examples, rebuilt on the shipped API |
| R2-06-08 | one aurora per category, not per page; the header rung never stepped down |
| F-25 | the preview stills feed OKLCH-scale hues to `hsla()` (`demo/chassis/landing/vizPreviewStill.ts:132`) |
| F-20 | the shell story strip is 6 px wide at the phone cell and never shows the current story (`demo/shell/BottomDock.vue:185-197`); at 320×256 the sticky chrome and the dock cover most of the viewport |
| W-A.2's hand-off (sender W-A.2, §3 item 7) | the `story-preview-card.test.ts:487` and `:556` latches' assertions, which W-A.2 moves to `tests/owed/story-preview-card.test.ts` with fences; this wave brings them home (§3 item 2) |

## 2 · The defect at HEAD

**The two latches, flipped** (scratch worktree, `it.fails` → `it`, `npx vitest run tests/demo/story-preview-card.test.ts`):

- `:487` fails with the 10 orphan SFCs listed in §1;
- `:556` fails with `substrates/aurora` restating "Aurora".

**G3, per-page aurora**, is a unit read over `CATEGORIES` (the production demo build exposes no component state to a browser probe). Among the stories whose background resolves to aurora, navigation has 4 stories and 1 distinct palette (the category's `heroPalette`, `demo/stories/manifest.ts:286-294`). Substrates and foundations each have 1 aurora story.

Measured with appendix A (`node e10.mjs`), Chromium: **9 rows, 8 FAIL**. Load was 71.8 → 64.2, from other seats; no row is timing-sensitive.

| gate | HEAD reading | source |
|---|---|---|
| G1 preview ladder | 10 of 80 cards over 11 category landings carry a preview | `storyTile.ts:35-39` |
| G2 stills in band, light | 5 of 6 stills have chromatic pixels outside [25°, 95°] OKLCH: aurora, glass-material, glass-panel 100 %; constellation 15.2 % | `vizPreviewStill.ts:132` `hsla(${h}, …)` fed the OKLCH band at `:38` |
| G2 stills in band, dark | 5 of 6; the same three at 100 %; constellation 23.7 % | same |
| G4 header one rung down | h1 23.67 px on `/forms/buttons`, 41.89 on `/forms/chip` and `/display/badge`, against ceilings 18.61 and 32.93 (HEAD / 1.272) | `heroScaleForDepth` (`manifest.ts:317-324`) |
| G5 opaque showcase frames | 86 of 153 frames on 19 routes paint `data-surface="opaque"` | `ShowcaseFrame.vue:45` |
| G6 shell strip at 390 | strip 6 px wide and the current story not shown, on 80 of 80 routes | `BottomDock.vue:185-197`: the strip takes the remainder after six fixed controls grow to the coarse floor, and never scrolls to `aria-current` |
| G7 320×256 after a scroll | chrome and dock cover `/forms/buttons` 0.25 (PASS), `/containers/dialog` 0.715, `/forms/slider` 0.645 | `demo/chassis/hero/story-hero.css:196` `position: sticky` with no block-size arm |

Static RED:

```
$ test -e demo/stories/substrates/aurora/PresetPickerRow.vue; echo $?
0          # present; the gallery split deletes it
$ grep -c 'name="transport"' src/components/configurator/Configurator.vue
0
$ test -d demo/stories/compositions; echo $?
0          # present: 5 stories
$ rg -c 'function plateField' demo | wc -l
2
```

## 3 · The cure

1. **A preview on every card.** The preview ladder has two steps. The first is a live CSS specimen: the story's component rendered small and static in the card through a `preview` slot the manifest row names. The second is a still, for the substrates. The "none" step is retired: a row without a preview is a manifest type error. The size ladder is fixed: the specimen scales by the card's container (W-E.9's cel), at three rungs.
2. **The orphans.** Each of the 10 SFCs is checked against the consolidated story that superseded it. The wave record names the successor route per file. A file whose successor renders its component is deleted. A file with no successor gets a manifest row, so its component keeps a story. `substrates/aurora`'s `heading="Aurora"` is deleted: the chassis prints the title once. Both latches become ordinary `it`s in `story-preview-card.test.ts`. On this wave's base both assertions are in `tests/owed/story-preview-card.test.ts`, with fences at the old sites; this wave moves them home and deletes the owed file, its `vitest.config.ts` exclusion and the fences (W-A.2 §3 item 7, the one record of the hand-off; fix-9, FH-01).
3. **The configurator expression (#52)** builds the unbuilt list from BJ `DESIGN-NOW.md` §3.8 and the W-CONFIG-EXPRESS ruling, with the census's words as the checklist:
   - MOVE 1: the height overrides, the L1 φ split, the L2 368 px aside floor, X6 and X7;
   - MOVE 2a: the detail region;
   - MOVE 2c: show-all;
   - MOVE 3: the six LabeledField props;
   - MOVE 4: the tier;
   - the gallery split, which deletes `PresetPickerRow.vue`;
   - the `#transport` slot in `Configurator.vue`, with its driving contract `{ paused, headT, setHeadT, flick, speed }`.
   - the row's inline mode (UIA-V-397, A2-VA-L3-3): `ConfiguratorRow` is `container: row / inline-size` and lays label and readout on one line with the readout in a right-aligned column when the row has the room; it drops the unconditional `flex flex-col` (`ConfiguratorRow.vue:119`).

   The rem-floored stage was W-E.9's.
4. **Demo truth (#56).** ShowcaseFrame's resting tier resolves `surface: "glass"`, not `"opaque"`. `plateField` is deleted from both stories, which render on the library's page substrate instead of a demo-painted field.
5. **The compositions prune (#18).** `demo/stories/compositions/` and its category rows (`manifest.ts:989-1062`) are deleted. R2-08-15 (the settings story) closes with it.
6. **OKLCH stills (F-25).** `vizPreviewStill.ts` paints with `oklch()` strings from the field palette (the substrate's own `heroPalette` stops), not `hsla()`. The band [25°, 95°] is read on the OKLCH hue it was authored on. The seed-ceiling pair (G-CHROMA and G-MOOD-STILL, TERMINAL-ROSTER:206) is not this wave's. It folds to W-G.5, which owns the seeded field.
7. **Per-page aurora (R2-06-08).** A story row may name its own aurora palette. Where it does not, the category's aurora stories take the category's palette list in order, so two aurora stories in one category resolve different palettes.
8. **The header one √φ rung down (R2-06-08).** `heroScaleForDepth` maps each depth one rung down the √φ ladder from HEAD. G4's ceilings are HEAD / 1.272.
9. **The shell at the phone cell (F-20).** The story strip is `flex: 1 1 0; min-inline-size: 7rem`. The fixed controls take the coarse hit area, not a larger box (W-E.2 §3.6), so the strip keeps its room. The strip scrolls its `aria-current` tab into view on every route change. Under a block size below 32 rem, the story chrome is not sticky and the shell dock takes its compact form.

## 4 · Files it touches

`demo/chassis/landing/storyTile.ts`, `demo/chassis/landing/vizPreviewStill.ts`, `demo/chassis/showcase/ShowcaseFrame.vue`, `demo/chassis/hero/story-hero.css`, `demo/stories/manifest.ts`, `demo/shell/BottomDock.vue`, `demo/stories/forms/slider.vue`, `demo/stories/navigation/tabs.vue`, `demo/stories/substrates/aurora.vue`, `demo/stories/substrates/aurora/PresetPickerRow.vue` (deleted), `demo/stories/compositions/` (deleted), the 10 orphan SFCs (deleted or routed), `src/components/configurator/Configurator.vue` and the configurator styles (MOVE 1-4, `#transport`), `tests/demo/story-preview-card.test.ts`, `tests/owed/story-preview-card.test.ts` (deleted), `vitest.config.ts` (its exclusion removed). New: `tests/demo/aurora-per-page.test.ts`; `tests-visual/wired/demo-remainder.spec.ts` (appendix A).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E10-G0 · the latches | `npx vitest run tests/demo/story-preview-card.test.ts` with `:487` and `:556` as `it` | 0 failures | **2 failures** (10 orphans; 1 restated title) |
| E10-G1 · preview ladder | appendix A G1 | 80 of 80 | **10 of 80** |
| E10-G2 · stills in band | appendix A G2, light and dark | 0 % outside [25°, 95°] for every still | **5 of 6** in both arms |
| E10-G3 · per-page aurora | `npx vitest run tests/demo/aurora-per-page.test.ts`: for each category, the aurora stories resolve as many distinct palettes as there are stories | pass | **fails**: navigation 4 stories, 1 palette |
| E10-G4 · header one rung down | appendix A G4 | each h1 ≤ HEAD / 1.272 | **23.67 > 18.61; 41.89 > 32.93 (×2)** |
| E10-G5 · no opaque frames | appendix A G5 | 0 | **86 of 153 on 19 routes** |
| E10-G6 · shell strip | appendix A G6 at coarse 390 | 0 bad routes (strip ≥ 88 px, current tab visible) | **80 of 80 bad** |
| E10-G7 · short viewport | appendix A G7 at 320×256 | ≤ 25 % covered on 3 routes | **2 of 3 FAIL** (0.715, 0.645) |
| E10-G8 · configurator and prune | `! test -e demo/stories/substrates/aurora/PresetPickerRow.vue && grep -q 'name="transport"' src/components/configurator/Configurator.vue && ! test -d demo/stories/compositions && test "$(rg -c 'function plateField' demo \| wc -l)" -eq 0` | exit 0 | **exit 1** (present; 0 slots; present; 2) |
| E10-G9 · the row's inline mode (static; UIA-V-397, A2-VA-L3-3) | `! grep -q "configurator-row flex flex-col" src/components/configurator/ConfiguratorRow.vue` | exit 0 | **exit 1** (`:119`) |

Can each fail and pass? Every browser row fails at HEAD except G7's `/forms/buttons` cell, the passing control. The unit rows fail when flipped. G8 and G9 are static and exit 1. The MOVE 1-4 acts have no single born-RED in this table. Their π is the configurator capture in §6, and their checklist is the census line quoted in §1.

## 6 · π and DELTA obligations

- **Surfaces:** the 11 category landings (G1); `/substrates` (G2); `/forms/buttons`, `/forms/chip`, `/display/badge` (G4); every story route (G5, G6); `/containers/dialog` and `/forms/slider` at 320×256 (G7); `/containers/configurator` and `/substrates/aurora` for #52.
- **Themes:** light and dark for every row. G2 runs both arms.
- **Engines:** Chromium measured. Playwright WebKit crashes on demo routes at HEAD, recorded as crashes; the wired spec runs it and records the crash rather than a result. Real Safari is UNMEASURED (OW-3).
- **Paired capture** at `<E10-base>` and at the wave:
  - a landing at 1440 (cards without previews, then with them);
  - the `/substrates` stills in both arms (yellow-green, then warm);
  - the phone-cell shell on `/forms/chip` at 390 (a 6 px strip, then the current tab shown);
  - `short-320x256-*` (appendix A writes them with `WAVE=W-E.10` into `.cache/evidence/W-E.10/e10/`, the before set at `<E10-base>`; formation's HEAD set sat in a session scratchpad and is not evidence);
  - the configurator at 1440 and 390 before and after MOVE 1-4.

## 7 · MIGRATION rows

The demo is not published API. `Configurator`'s `#transport` slot is additive: a new slot, no removal. No MIGRATION row.

## 8 · Ledger rows

Closes #18 (the compositions prune), #52, #56 and #58; F-25; F-20. Closes the F-34 mechanism rows UIA-V-397 and A2-VA-L3-3 (E10-G9). Also closes the W-B.1 folds L05a-03 and L01a-18, the W-B.3 fold L05b-19 and the W-B.4 fold R2-06-08. The two `story-preview-card` latches retire. R2-08-15 closes with the prune. The seed ceiling (G-CHROMA/G-MOOD-STILL) is recorded as folded to W-G.5.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the demo is the library's first consumer (E-5). Every card shows the component, every page shows the library's own substrate and no demo-painted field, and the shell obeys the same coarse model as the library (W-E.7).
- **Wave:** E10-G0..G8 green in one run.
- **Feature:** at 390, the forms landing shows a preview on every card. A tap lands on a story whose strip shows it as current under its own aurora palette, with the header one rung smaller. Captured as one frame strip.

## Appendix A · `e10.mjs` (lands as `tests-visual/wired/demo-remainder.spec.ts`)

```js
// W-E.10 born-RED probe: the demo remainder (preview ladder, OKLCH stills, per-page aurora, header rung, opaque frames, shell at the phone cell).
// node e10.mjs
import { sleep, load, CAP, DEMO, ENG } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
fs.mkdirSync(`${CAP}/e10`, { recursive: true });
const b = await ENG.chromium.launch();
const desk = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await desk.goto(DEMO + '/forms/chip', { waitUntil: 'networkidle' }); await sleep(800);
const all = await desk.evaluate(() => document.querySelector('#app').__vue_app__.config.globalProperties.$router.getRoutes().map((x) => x.path).filter((p) => !p.includes(':')));
const cats = all.filter((p) => p.split('/').length === 2 && p !== '/'), stories = all.filter((p) => p.split('/').length === 3);
// G1 · the preview ladder: every story card on the category landings carries a preview
{ let cards = 0, withPrev = 0; for (const c of cats) { await desk.goto(DEMO + c, { waitUntil: 'networkidle' }); await sleep(900); const m = await desk.evaluate(() => { const cs = [...document.querySelectorAll('.section-preview-card')]; return { n: cs.length, p: cs.filter((e) => e.querySelector('.section-preview-card-preview')).length }; }); cards += m.n; withPrev += m.p; }
  row('E10-G1 preview ladder', cards > 0 && withPrev === cards, { categories: cats.length, cards, withPreview: withPrev }); }
// G2 · stills in OKLCH off the field palette: 0 % of chromatic pixels outside [25°, 95°], both arms
for (const scheme of ['light', 'dark']) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme }); const p = await ctx.newPage();
  await p.goto(DEMO + '/substrates', { waitUntil: 'networkidle' }); await sleep(1500);
  const r = await p.evaluate(async () => { const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const hue = (R, G, B) => { const r = lin(R), g = lin(G), b = lin(B); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s; return [Math.hypot(A, Bb), (Math.atan2(Bb, A) * 180 / Math.PI + 360) % 360]; };
    const o = []; for (const img of document.querySelectorAll('img')) { if (!img.src.startsWith('data:image')) continue; const im = new Image(); im.src = img.src; await im.decode(); const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const x = c.getContext('2d'); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let ch = 0, outB = 0; for (let i = 0; i < d.length; i += 4) { const [C, H] = hue(d[i], d[i + 1], d[i + 2]); if (C < 0.02) continue; ch++; if (H < 25 || H > 95) outB++; } o.push({ label: (img.closest('a')?.getAttribute('href') || '').slice(0, 30), outside: +(outB / Math.max(ch, 1)).toFixed(3) }); } return o; });
  row(`E10-G2 stills in band ${scheme}`, r.length > 0 && r.every((x) => x.outside === 0), { stills: r.length, over0: r.filter((x) => x.outside > 0).length, worst: r.sort((a, b) => b.outside - a.outside).slice(0, 4) });
  await ctx.close(); }
// G3 · per-page aurora is a unit read over the manifest (tests/demo/aurora-per-page.test.ts); not measured here
// G4 · the story header one √φ rung down: each h1 ≤ its HEAD size / 1.272 (HEAD sizes measured at 4d2e3123)
{ const HEAD = { '/forms/buttons': 23.6694, '/forms/chip': 41.888, '/display/badge': 41.888 }; const sizes = {};
  for (const r of Object.keys(HEAD)) { await desk.goto(DEMO + r, { waitUntil: 'networkidle' }); await sleep(500); sizes[r] = await desk.evaluate(() => { const h = document.querySelector('main h1'); return h ? +parseFloat(getComputedStyle(h).fontSize).toFixed(2) : null; }); }
  row('E10-G4 header one rung down', Object.entries(HEAD).every(([r, v]) => sizes[r] != null && sizes[r] <= v / 1.272 + 0.1), { h1px: sizes, ceilings: Object.fromEntries(Object.entries(HEAD).map(([r, v]) => [r, +(v / 1.272).toFixed(2)])) }); }
// G5 · ShowcaseFrame paints no opaque resting plate: count opaque frames across story routes
{ let opaque = 0, frames = 0, routes = 0; for (const r of stories) { try { await desk.goto(DEMO + r, { waitUntil: 'networkidle', timeout: 20000 }); await sleep(300); const m = await desk.evaluate(() => { const f = [...document.querySelectorAll('main [data-surface]')].filter((e) => e.closest('main') && e.className && String(e.className).includes('rounded-card')); return { n: f.length, o: f.filter((e) => e.dataset.surface === 'opaque').length }; }); frames += m.n; opaque += m.o; if (m.o) routes++; } catch {} }
  row('E10-G5 no opaque showcase frames', opaque === 0, { framesSeen: frames, opaque, routesWithOpaque: routes }); }
// G6 · the shell at the phone cell: the story strip shows at least one tab and reveals the current story (390, coarse)
{ const ph = await (await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })).newPage(); let bad = 0, n = 0; const ex = [];
  for (const r of stories) { try { await ph.goto(DEMO + r, { waitUntil: 'networkidle', timeout: 20000 }); await sleep(400); const m = await ph.evaluate(() => { const s = document.querySelector('.demo-bottom-dock__tabs'); if (!s) return null; const sr = s.getBoundingClientRect(); const a = s.querySelector('[aria-current=page]'); const ar = a?.getBoundingClientRect(); return { w: +sr.width.toFixed(1), shown: !!ar && ar.left >= sr.left - 1 && ar.right <= sr.right + 1 }; }); if (!m) continue; n++; if (m.w < 88 || !m.shown) { bad++; if (ex.length < 5) ex.push([r, m]); } } catch {} }
  row('E10-G6 shell strip at 390', n > 0 && bad === 0, { routes: n, bad, examples: ex }); }
// G7 · the short viewport (320×256, 400 % reflow): after a scroll, the sticky story chrome and the shell dock cover ≤ 25 % of the viewport
for (const r of ['/forms/buttons', '/containers/dialog', '/forms/slider']) { const sp = await (await b.newContext({ viewport: { width: 320, height: 256 } })).newPage(); await sp.goto(DEMO + r, { waitUntil: 'networkidle' }); await sleep(800);
  await sp.evaluate(() => { const ports = [...document.querySelectorAll('*')].filter((e) => e.scrollHeight > e.clientHeight + 50 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)); (ports[0] || document.scrollingElement).scrollBy(0, 400); }); await sleep(700);
  const m = await sp.evaluate(() => { const vh = innerHeight; const rows = new Array(vh).fill(0); for (const e of document.querySelectorAll('.story-page-chrome, nav.demo-bottom-dock')) { const x = e.getBoundingClientRect(); for (let y = Math.max(0, Math.floor(x.top)); y < Math.min(vh, Math.ceil(x.bottom)); y++) rows[y] = 1; } return { covered: +(rows.reduce((a, v) => a + v, 0) / vh).toFixed(3) }; });
  await sp.screenshot({ path: `${CAP}/e10/short-320x256-${r.replace(/\//g, '_')}.png` });
  row(`E10-G7 short viewport chrome ≤ 25 % ${r}`, m.covered <= 0.25, m); await sp.close(); }
await b.close();
out.load2 = load(); fs.writeFileSync(`${CAP}/e10.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e10: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
```

## Appendix B · `tests/demo/aurora-per-page.test.ts` (the G3 born-RED)

```ts
import { describe, expect, it } from "vitest";
import { CATEGORIES } from "../../demo/stories/manifest";

// R2-06-08 (W-B.4 fold): two stories in one category resolve different aurora palettes.
describe("per-page aurora", () => {
    it("every aurora story in a category resolves its own palette", () => {
        const offenders = CATEGORIES.map((cat) => {
            const aurora = cat.stories.filter((s) => s.background?.kind === "aurora");
            const palettes = new Set(aurora.map((s) => s.background.palette));
            return { cat: cat.id, stories: aurora.length, palettes: palettes.size };
        }).filter((r) => r.stories > 1 && r.palettes < r.stories);
        expect(offenders).toEqual([]); // HEAD: [{ cat: "navigation", stories: 4, palettes: 1 }]
    });
});
```

The field names (`stories`, `background.kind`, `background.palette`) are the manifest's finalized rows (`manifest.ts:286-304`). If the finalizer names them differently at landing, the test reads the finalizer's names. The assertion does not change.
