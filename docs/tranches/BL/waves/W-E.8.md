# W-E.8 · the off-role 12 px rung re-seated; a role invariant replaces the latch · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree, demo built there |
| ships in | 11.0.0 |
| families | F-30a (#23 W-RADIUS-ROLE; the latch W-A.2 retires to this wave: `tests/styles/radius-role-canon.test.ts:458`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #23 / F-30a | the role spine is floor 4, tick 6, control 10, card 16, room 24, pill 9999 (`radius-role-canon.test.ts:381-388`); three tokens sit on an off-role 12 px rung: `--radius-xl` (`theme/radius.css:111`), `--radius-panel` (`:124`, `var(--radius-xl)`), `--radius-strip` (`:156`, `0.75rem`) |
| the latch | `it.fails("has no off-role 12px rung left …")` at `radius-role-canon.test.ts:458` |
| UIA-KF-130, UIA-V-485 | the menu row's corner: the off-ladder half is cured at HEAD; the concentric half is answered here (§3.4) |
| W-A.2's hand-off (sender W-A.2, §3 item 7) | the `radius-role-canon.test.ts:458` latch's assertion, which W-A.2 moves to `tests/owed/radius-role-canon.test.ts` with a fence; this wave brings it home (§3 item 3) |

## 2 · The defect at HEAD

- **The latch, flipped.** Changing `it.fails` to `it` at `:458` and running `npx vitest run tests/styles/radius-role-canon.test.ts` in the scratch worktree fails with `expected [] to deeply equal ["--radius-xl","--radius-panel","--radius-strip"]` (`OFF_ROLE_12` at `:391`). As committed, the file reads 44 passed and 1 expected fail.
- **Readers.** `rg -c -- '--radius-(xl|panel|strip)\b|rounded-(xl|panel|strip)\b' src demo` gives **53 reads in 27 files**. In `src`:
  - `glass/overlay-plate.css:115`
  - `utilities/base.css:75`
  - `theme/radius.css:124`
  - `tabs/styles/segmented.css:94`
  - `music-staff/styles.css:64`
  - `configurator/Configurator.vue:235,333`

  The rest are demo `rounded-panel` and `rounded-xl` classes.
- **Paint census.** Appendix A G1 over the 80 story routes at 1440×900, Chromium: **23 distinct selectors on 14 of 80 routes paint a 12 px corner**. The registry's count was 21 on 14. Some examples:
  - `configurator-shell.glass-floating.rounded-panel` on 5 routes: `/substrates/aurora`, `/substrates/blob`, `/substrates/fourier-field`, `/containers/configurator`, `/motion/springs`;
  - `segmented-indicator` and `segmented-tab` on `/navigation/tabs`;
  - `music-staff__window` on `/display/music-staff`;
  - the TOC plates on `/navigation/toc-tracking`;
  - `glass-floating.glass-reveal.rounded-panel` on `/motion/curve-gallery`.

  The full census is in appendix A's output (`cap/e8.json`, key `census`). Load 35.4 → 34.9.
- **The menu row (not a gate, §3.4).** Appendix A G2 reads plate 16, row 10, inset 13. A concentric relay would want `max(4, 16 − 13) = 4`.

## 3 · The cure

1. **The re-seat, per the latch's own comment (`:452-455`).**
   - `--radius-strip` → control, 10: the vertical (column-stack) segmented track that reads it (`theme/radius.css:145-156`), its indicator and its tabs.
   - `--radius-panel` in its annotation use → control, 10: the TOC plates, tooltip panels and `music-staff__window`.
   - `--radius-panel` in its plate use → card, 16: `configurator-shell`, the curve-gallery reveal plate and `overlay-plate.css:115`.

   Each of the 53 reads is assigned one of the two by its role, the wave record lists the assignment, and the reader switches to the 10 px role token or to `--radius-card`/`rounded-card`. The 10 px role token is `--radius-button`, which W-C.4 §3.8 declares `0.625rem` directly. `--radius-control` is the stadium (`var(--radius-pill)`, `theme/radius.css:168`), not the 10 px rung, and is not a target.
2. **The tokens go.** `--radius-panel` and `--radius-strip` are deleted from `theme/radius.css`. The library's own `--radius-xl: 12px` declaration at `:111` is deleted, and no `src` rule reads `--radius-xl` or `rounded-xl`. A consumer's `rounded-xl` keeps Tailwind's own 0.75rem; the library does not use it.
3. **The role invariant replaces the latch.** On this wave's base the `:458` assertion is in `tests/owed/radius-role-canon.test.ts`, with a fence at the old site (W-A.2 §3 item 7, the one record of the hand-off; fix-9, FH-01). It is replaced by an `it` in `radius-role-canon.test.ts` that asserts two things, and the owed file, its `vitest.config.ts` exclusion and the fence are deleted. First, every radius a `src` rule reads resolves to a role value in `ROLE_PX` or to the relay. Second, `OFF_ROLE_12` names nothing `RADIUS_DECLS` holds. The test is G-RADIUS-ROLE's executable in the roster. The paint half is appendix A G1, wired.
4. **The menu row is answered, not gated.** A menu row is a control, not a nested plate, so its corner is the control role (10). That is the off-ladder half of UIA-KF-130, cured at HEAD (`row: 10`). The concentric relay (`r_inner = r_outer − inset`) applies to a plate nested in a plate, not to a control on a plate. Applying it here would take the row to the 4 px floor at the current 13 px inset. The row stays 10, and the inset stays the listbox pad.
5. **Metric reads the context radius (UIA-F-149).** `metric/styles.css:123,142` read `--radius-ctx` in place of `--radius-sm` and `--radius-card` (fix-14: E8-G4's cure, which §3 did not state). Every corner in that file reads `var(--radius-ctx)` and nothing else: no other rung, literal or fallback (fix-15, pass 14 FN-04). The file never declares `--radius-ctx`: the context sets it (fix-16, pass 15 FO-02).

## 4 · Files it touches

`src/styles/theme/radius.css`, `src/styles/glass/overlay-plate.css`, `src/styles/utilities/base.css`, `src/components/tabs/styles/segmented.css`, `src/components/music-staff/styles.css`, `src/components/metric/styles.css` (§3 item 5), `src/components/configurator/Configurator.vue`, the demo files carrying `rounded-panel`/`rounded-xl` (the 27-file list from the `rg` above), `tests/styles/radius-role-canon.test.ts`, `tests/owed/radius-role-canon.test.ts` (deleted), `vitest.config.ts` (its exclusion removed). New: `tests-visual/wired/radius-role.spec.ts` (appendix A G1), which imports the band-E `lib.mjs` W-E.1 lands (PLAN §5 notes).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E8-G1 · the role invariant | `npx vitest run tests/styles/radius-role-canon.test.ts` with `:458` as an ordinary `it` | passes | **fails**: `["--radius-xl","--radius-panel","--radius-strip"]` |
| E8-G2 · no off-role reads | `test "$(rg -c -- '--radius-(xl\|panel\|strip)\b\|rounded-(xl\|panel\|strip)\b' src demo \| awk -F: '{s+=$2} END{print s+0}')" -eq 0` | exit 0 | **exit 1** (53 in 27 files) |
| E8-G3 · paint census | appendix A G1 over the 80 story routes | 0 selectors paint 12 px | **23 selectors on 14 routes** |
| E8-G4 · Metric reads the context radius (static; UIA-F-149) | `! rg -niU --pcre2 '(?<![\w-])(?:border-radius\|border(?:-[a-z]+){1,2}-radius)\s*:(?!\s*var\(--radius-ctx\)\s*(?:!important\s*)?[;}])' src/components/metric/styles.css && ! rg -q -- '--radius-ctx\s*:' src/components/metric/styles.css && ! rg -n --pcre2 '(?<![\w-])(?:[\w@\[\]-]+:)*!?rounded(?!-\(--radius-ctx\)(?![\w-]))(?:-[\w\[\]()./%-]+)?(?![\w-])' src/components/metric -g '*.vue' -g '*.ts'` | exit 0: No template or script in `src/components/metric` writes a Tailwind corner utility (`rounded`, `rounded-card`, `rounded-(--radius-sm)`, any variant prefix), the form `src` writes at `select/SelectContent.vue:84`; `rounded-(--radius-ctx)` passes (fix-17, pass 16 FP-04). every `border-radius` and `border-*-radius` in `metric/styles.css` reads exactly `var(--radius-ctx)`, and the file declares no `--radius-ctx` of its own (fix-16, pass 15 FO-02: a rule that sets the token pins the context, the declaration `src` writes at `styles/glass/overlay-plate.css:64`); any other rung (`--radius-sm`, `--radius-card`, `--radius-panel`, `--radius-3xl`, …), a literal, a fallback or a longhand on another value fails (fix-15, pass 14 FN-04: the span forbade only the two HEAD tokens) | **exit 1** (fix-17, `a115850c`, the span as widened: `styles.css:123`, `:142`; the utility arm passes at HEAD). On the cured base, `cn('metric rounded-card', $props.class)` in `Metric.vue` and `rounded-(--radius-sm)` in `MetricRow.vue` each exit 1. Before fix-17: **exit 1** (fix-16, `b58c5357`: the corner arm on `styles.css:123`, `:142`; the declaration arm passes at HEAD). On the cured base, `--radius-ctx: var(--radius-card)` and `--radius-ctx: 16px` declared in the file each exit 1. Before fix-16: **exit 1** (fix-15, `2967ce43`, the span as widened: `styles.css:123`, `:142`). On the cured base (both read `var(--radius-ctx)`, exit 0), each of the 20 other `--radius-*` rungs `src` declares, `0.75rem`, and the four logical and one physical corner longhands exit 1, and `border-end-end-radius: var(--radius-ctx)` exits 0; the spellings are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry, whose SIBLING arm lists them from `src`. Before fix-15: **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `styles.css:123`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`:123` `--radius-sm`, `:142` `--radius-card`; the cure reads `--radius-ctx`) |

Can each fail and pass? All four fail at HEAD. UIA-V-194 (nested plates not concentric: 12 px inside a 16 px card) is an E8-G3 cell: the 12 px plates are among its 23 selectors. G1's bite is re-declaring `--radius-strip: 0.75rem`, and G3's is the style tag `.segmented-tab{border-radius:12px}`.

## 6 · π and DELTA obligations

- **Surfaces:** the 14 routes of the census, at 1440×900 and 390×844.
- **Themes:** light and dark.
- **Engines:** Chromium measured. Playwright WebKit crashes on demo routes at HEAD, recorded as crashes. The wired spec runs it and records the crash rather than a result. Real Safari is UNMEASURED (OW-3).
- **Metric (§3 item 5, UIA-F-149; fix-15, pass 14 FN-07):** `/data/metric` at 1440×900 and 390×844, light and dark, Chromium measured and Playwright WebKit as above, real Safari UNMEASURED (OW-3). Paired capture at `<E8-base>` and at the wave of the cell posture (`.metric[data-posture="cell"]`, `:142`) and the loading value bar (`.metric[data-loading] .metric__value`, `:123`). The DELTA is each corner's computed `border-top-left-radius`: at `2967ce43` (fix-15, Chromium, the demo dev server in a worktree) the cell reads 16px (`--radius-card`) and the loading bar 4px (`--radius-sm`); at the wave both read `--radius-ctx` resolved in their context, stated per cell in the wave record. The census does not carry Metric: neither corner is on the 12 px rung.
- **Paired capture:** at `<E8-base>` and at the wave, `/navigation/tabs`, `/containers/configurator`, `/display/music-staff` and `/navigation/toc-tracking`. The DELTA shows 12 → 10 on the strip and the annotation plates and 12 → 16 on the configurator shell, with the appendix A census JSON of both runs.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `--radius-panel`, `rounded-panel` | removed | read `--radius-card` for a plate or `--radius-button` (10 px) for an annotation panel |
| `--radius-strip` | removed | read `--radius-button` (10 px) |
| the library declared `--radius-xl: 12px` | not declared by the library | a consumer's `rounded-xl` is Tailwind's 0.75rem, unchanged in value |

## 8 · Ledger rows

Closes #23 (F-30a), UIA-F-149 (E8-G4) and UIA-V-194 (E8-G3). G-RADIUS-ROLE is bound. UIA-KF-130 and UIA-V-485 are closed: the off-ladder half is cured at HEAD (`row: 10`, the control role) and the concentric half is answered in §3.4.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one role table. Every corner in `src` names a role, and W-E.7's pads derive from it.
- **Wave:** E8-G1..G3 green in one run.
- **Feature:** `/navigation/tabs` and `/containers/configurator` side by side at 1440. The strip, its indicator and the tooltips share the control corner; the configurator shell shares the card corner with the cards beside it.

## Appendix A · `e8.mjs` (G1 lands as `tests-visual/wired/radius-role.spec.ts`)

```js
// W-E.8 probe: the off-role 12 px readers in paint, and the concentric relay at the menu row.
// node e8.mjs
import { open, sleep, load, CAP, DEMO, ENG, rectOf, cs } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
// G1 · paint census: elements whose painted corner resolves through --radius-xl / --radius-panel / --radius-strip
{ const b = await ENG.chromium.launch(); const page = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await page.goto(DEMO + '/forms/chip', { waitUntil: 'networkidle' }); await sleep(800);
  const routes = await page.evaluate(() => document.querySelector('#app').__vue_app__.config.globalProperties.$router.getRoutes().map((x) => x.path).filter((p) => !p.includes(':') && p.split('/').length === 3));
  const sigs = new Map();
  for (const r of routes) { try { await page.goto(DEMO + r, { waitUntil: 'networkidle', timeout: 20000 }); await sleep(500);
    const found = await page.evaluate(() => { const o = []; for (const e of document.querySelectorAll('body *')) { const c = getComputedStyle(e); if (c.borderTopLeftRadius !== '12px' && c.borderTopRightRadius !== '12px') continue; if (e.getBoundingClientRect().width === 0) continue; const cls = [...e.classList].filter((k) => !/^(v-|data-v)/.test(k)).slice(0, 3).join('.'); o.push((e.dataset.slot ? `[${e.dataset.slot}]` : e.tagName.toLowerCase()) + (cls ? '.' + cls : '')); } return [...new Set(o)]; });
    for (const s of found) { if (!sigs.has(s)) sigs.set(s, new Set()); sigs.get(s).add(r); } } catch {} }
  await b.close();
  const routesHit = new Set([...sigs.values()].flatMap((s) => [...s]));
  out.census = Object.fromEntries([...sigs].map(([k, v]) => [k, [...v]]));
  row('E8-G1 painted 12 px corners (census)', sigs.size === 0, { selectors: sigs.size, routes: routesHit.size, of: routes.length, sample: [...sigs.keys()].slice(0, 12) });
}
// G2 · concentric relay: a menu row's corner = the plate's corner − the listbox inset (UIA-KF-130, UIA-V-485); read, not gated (§3.4)
{ const { browser, page } = await open({ w: 1024, h: 768, qs: 's=menu&edge=mid&auto=menu' }); await sleep(600);
  const m = await page.evaluate(() => { const c = document.querySelector('[data-probe=menuc]'); const i = document.querySelector('[data-probe=mi1]'); const cr = c.getBoundingClientRect(), ir = i.getBoundingClientRect(); return { plate: parseFloat(getComputedStyle(c).borderTopLeftRadius), row: parseFloat(getComputedStyle(i).borderTopLeftRadius), inset: +(ir.left - cr.left).toFixed(1) }; });
  row('E8-G2 menu row concentric', Math.abs(m.row - Math.max(4, m.plate - m.inset)) <= 0.5, { ...m, want: Math.max(4, m.plate - m.inset) }); await browser.close(); }
out.load2 = load(); fs.writeFileSync(`${CAP}/e8.json`, JSON.stringify(out, null, 1));
```
