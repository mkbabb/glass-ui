# W-E.6 · W-CHIP: per-instance composites on their reading class, `cn()` resolves shorthands, the chip's X-gates · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree; probes drive the band-E fixture app scene `chips` (W-E.1 appendix B) |
| ships in | 11.0.0 |
| families | F-26, F-27, F-28 less X-G1's fill, which is W-H.1's (fix-5, FD-02) (#43 W-CHIP; the X-gate row at `BJ/addenda/2026-07-24-refinement/DESIGN-NOW.md:483-490`, X-G4 as amended there to admit 4) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| F-26 | a composite token that reads a per-instance input is declared at `:root`, so it resolves against the root's input: five toned chips paint one fill |
| F-27 | `cn()` keeps a longhand before a later shorthand (`cn("px-2 p-4")` returns `"px-2 p-4"`), so the longhand's stylesheet order decides |
| F-28 / #43 | the chip's X-gates: X-G1 selected photometry, X-G2 one scale writer, X-G3 the edge, X-G4 pad set, X-G5 one tinted gradient, X-G6 death register, X-G8 the `mode` enum. X-G7 is cured at HEAD (§2) |

## 2 · The defect at HEAD

Measured with appendix A (`node e6.mjs`). Chromium: **12 rows, 11 FAIL**, load 25.2 → 25.5. Playwright WebKit: **12 rows, 11 FAIL** with the same readings (fills 215,203,187 light and 179,171,160 dark, the same blend, scale, border, pads and removal), load 45.6 → 44.5.

| gate | HEAD reading | source |
|---|---|---|
| G1 F-26, five tones | 1 distinct painted fill of 5, light (215,203,185) and dark (179,171,159); 1 distinct computed `background-image` | `--glass-fill-tinted` declared only at `:root`, `tokens/glass.css:203-207`, where it resolves `--glass-fill-tint` and `--glass-fill-strength` against the root, not the chip; read by `glass-atom.css:81-83` and `glass-chip.css:13-15` |
| G2 X-G1 | `mix-blend-mode: plus-lighter` in the selected chip's subtree; selected `background-color` opaque (`oklab(0.807 …)` light, `oklab(0.406 …)` dark) | `glass-chip.css:36-41` `background-color: var(--accent-band)` and the `::after` flood |
| G3 X-G2 | selected chip at rest + 1.25 s: `scale: 1.07416` | the `--chip-flood-t` scale writer (`@property` at `glass-chip.css:1`, 4 reads in `src`) |
| G4 X-G3 | `border-top-width: 0px` at rest | the chip's border-color writes have no width to paint |
| G5 X-G4 | pad-inline 14 px and 10 px, not in {4, 8, 12, 20}; sizes 15.05 and 13.25 px. `font-style` is normal (the italic clause is stale, REG:611) | `glass-chip.css` size rules |
| G6 X-G7 | **PASS**: 44 × 44 box, 4 of 4 hits at 21 px from centre, name "Remove filter" | cured at HEAD; kept as a hold line |
| G7 X-G6 | no animation on removal; the node leaves 1 ms after the click | Chip emits `remove` synchronously; no leave register |

Static RED:

```
$ perl -0777 -ne '$c+=()=/linear-gradient\(\s*var\(--glass-fill-tinted\)/g; END{print $c}' $(git ls-files 'src/**/*.css')
2                    # X-G5: glass-atom.css:81-83 and glass-chip.css:13-15
$ rg -c -- '--chip-flood-t' src | awk -F: '{s+=$2} END{print s}'
4
$ rg -c '\bmode[=:]' src/components/chip demo | awk -F: '{s+=$2} END{print s}'
38                   # X-G8; ChipMode at src/components/chip/types.ts:5
$ node --experimental-strip-types -e 'import("./src/components/_shared/class-names.ts").then(m=>{const c=[["px-2 p-4","p-4"],["mx-1 m-2","m-2"],["top-0 inset-2","inset-2"],["py-1 p-0","p-0"]];let bad=0;for(const [i,w] of c){const g=m.cn(i);if(g!==w)bad++;console.log(JSON.stringify(i),"->",JSON.stringify(g))}process.exit(bad?1:0)})'; echo $?
"px-2 p-4" -> "px-2 p-4"
"mx-1 m-2" -> "mx-1 m-2"
"top-0 inset-2" -> "top-0 inset-2"
"py-1 p-0" -> "py-1 p-0"
1
```

`--accent-band` is written at `glass-chip.css:38` and read at `:51` (the `::after` flood).

**No sibling consumer imports `./chip`.** A read-only `rg` over `value.js`, `keyframes.js`, `fourier-analysis`, `sci-report`, `slides`, `speedtest`, `chicago`, `bbnf-buddy`, `scaena` and `atlas` under `~/Programming` found no `@mkbabb/glass-ui/chip` import. The API break in §7 has no consumer addendum to write.

## 3 · The cure

1. **Per-instance composites on the reading class (F-26).** `--glass-fill-tinted` is removed from `:root` and declared on the classes that read it (`.glass-atom[data-surface="glass"]` and `.glass-chip`), where the instance's own `--glass-fill-tint` and `--glass-fill-strength` (written per chip from its `tone`) resolve. The rule goes to `src/styles/README` next to the layer contract: a token whose value reads an input that a component sets per instance (`--glass-fill-tint`, `--glass-fill-strength`, `--tone`, `--accent-*`, `--chip-*`) is declared on the reading class, never at `:root`. The detector reads that rule (§5, E6-G9).
2. **`cn()` resolves shorthands (F-27).** The conflict table in `_shared/class-names.ts` gains shorthand groups: `p` covers `px py pt pr pb pl ps pe`; `m` likewise; `inset` covers `inset-x inset-y top right bottom left start end`; `gap` covers `gap-x gap-y`; `rounded` covers its corners and sides; `border` (width) covers its sides. A shorthand drops every earlier longhand in its group. A longhand after a shorthand keeps both, in order, as Tailwind emits them. The `*Variants` builders (`chip/chipVariants.ts`, `badge/index.ts`, `alert/index.ts`) are swept for classes that relied on the old keep-both result; each changed output is listed in the wave record.
3. **One tinted gradient (X-G5).** `glass-chip.css:13-15` is deleted; the chip composes the atom's `[data-surface="glass"]` layer. `@property --chip-flood-t` and its 4 reads are deleted.
4. **Selected photometry (X-G1): the blend goes.** The `::after` flood and `mix-blend-mode: plus-lighter` are deleted, so the selected chip paints no blend. The selected fill itself (its register, its α < 1, and the ink solved against it) is W-H.1's (§3.2 item 8), built from D3's converged spec on floor row FL-6: a state fill reads the one-ink fill register, never a plate token (`design/material/REGISTRY.md:318`). This wave writes no state-fill mechanism; until W-H.1 lands, the selected chip keeps HEAD's `background-color: var(--accent-band)` (fix-5, FD-02).
5. **One scale writer (X-G2).** The engage ladder's `scale` is the only writer. The selected state settles at `scale: 1`.
6. **The edge (X-G3).** `border: 1px solid var(--accent-edge)` at rest (the `border-color` writes now have a width). The selected edge reads `--accent-edge` at its selected strength.
7. **Pad set and rungs (X-G4).** md pads 12 px and sm pads 8 px. Font sizes sit on the type rungs (`--type-small` and one rung below).
8. **Death register (X-G6).** Chip owns its removal. The remove button plays a leave transition on the chip root: scale and opacity, ≤ 0.15 s and ≤ 0.7 × the entry, opacity only under reduced motion. It emits `remove` from `afterLeave`, so the consumer's `v-if` unmounts a chip that has already left.
9. **The API (X-G8).** `mode` and `ChipMode` are removed. A chip is static by default and takes the booleans `selectable`, `removable` and `action`. `selectable` and `removable` compose: one root control with a child remove button. `action` and `selectable` together are a type error, since the props are a discriminated union. `data-mode` becomes `data-selectable`, `data-removable` and `data-action`, and `glass-chip.css` keys on them.

## 4 · Files it touches

`src/styles/tokens/glass.css`, `src/styles/glass/glass-atom.css`, `src/styles/glass/glass-chip.css`, `src/components/chip/{Chip.vue,types.ts,index.ts,chipVariants.ts,README.md,accent-tone.css}`, `src/components/_shared/class-names.ts`, `src/components/badge/index.ts`, `src/components/alert/index.ts`, `src/styles/README`, `demo/stories/forms/chip.vue` and every demo chip call site (the 38 `mode` sites). New: `tests-visual/wired/chip.spec.ts` (appendix A); `tests/components/_shared/classNames.test.ts` gains the four shorthand cases; `tests/styles/per-instance-composite.test.ts` (E6-G9).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E6-G1 · F-26 | appendix A G1, light and dark | 5 distinct painted fills | **1 of 5** (both themes, both engines) |
| E6-G2 · X-G1, the blend | appendix A G2 | no blend mode in the selected chip's subtree | **`plus-lighter`** (the α < 1 clause is W-H.1's H1-G22, HEAD opaque; fix-5) |
| E6-G3 · X-G2 | appendix A G3 | `scale` `none` or `1` | **1.07416** |
| E6-G4 · X-G3 | appendix A G4 | `1px` | **0px** |
| E6-G5 · X-G4 | appendix A G5 | pads ⊂ {4, 8, 12, 20}; `font-style: normal` | **14, 10** |
| E6-G6 · X-G7 (hold line) | appendix A G6 | 44 × 44, 4 of 4 hits, name from `removeLabel` | **PASS**; bite: `[data-probe=remchip] button{width:20px;height:20px}` |
| E6-G7 · X-G6 | appendix A G7 | exit animation present; removal > 16 ms after click | **none; 1 ms** |
| E6-G8 · X-G5 | the `perl` count above | 1 | **2** |
| E6-G9 · per-instance rule | `tests/styles/per-instance-composite.test.ts`: no `:root`/`:host` declaration in `src/styles` whose value reads `--glass-fill-tint`, `--glass-fill-strength`, `--tone`, `--accent-*` or `--chip-*` | 0 | **1** (`--glass-fill-tinted` at `tokens/glass.css:203-207` reads `--glass-fill-tint` and `--glass-fill-strength`; a naive block scan of every `:root`/`:host` rule in tracked `src/styles` CSS, run at this seat) |
| E6-G10 · F-27 | the `node --experimental-strip-types` check above | exit 0 | **exit 1**, 4 of 4 unchanged |
| E6-G11 · X-G8 | `test "$(rg -c '\bmode[=:]' src/components/chip demo \| awk -F: '{s+=$2} END{print s+0}')" -eq 0 && ! rg -q ChipMode src` | exit 0 | **exit 1** (38 sites; `types.ts:5`) |

Can each fail and pass? Every row except G6 fails at HEAD on both engines. G6 is cured at HEAD and stays as a hold line with its bite. The static rows are counts with a stated target.

## 6 · π and DELTA obligations

- **Surfaces:** the fixture scene `chips`; demo `/forms/chip`.
- **Themes:** light and dark, every paint row.
- **Engines:** Chromium and Playwright WebKit both measured, labelled. Real Safari is UNMEASURED (OW-3). DESIGN-NOW's X-G1 carries a WebKit desaturation note on the 0-alpha stop, so the real-Safari cell matters here.
- **Paired capture:** at `<E6-base>` and at the wave, a 900×400 frame of the `chips` scene in light and dark (five tones painting one fill, then five; the selected chip flooded and scaled, then unflooded at scale 1), and a frame strip of the removal (1 frame, then the leave). The DELTA is the pair plus appendix A's JSON.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `<Chip mode="selectable">` | `<Chip selectable>` | |
| `<Chip mode="removable">` | `<Chip removable>` | composes with `selectable` |
| `<Chip mode="action">` | `<Chip action>` | |
| `ChipMode` type | removed | |
| `data-mode` on the chip root | `data-selectable`, `data-removable`, `data-action` | consumer CSS keyed on `data-mode` re-keys |
| `@remove` emitted on click | emitted after the leave transition | the consumer's `v-if` still removes it; the removal is ≤ 0.15 s later |
| `cn("px-2 p-4")` → `"px-2 p-4"` | `"p-4"` | a consumer passing a shorthand after a longhand to a component's `class` now overrides it |
| `--glass-fill-tinted` at `:root` | declared on `.glass-atom[data-surface="glass"]` and `.glass-chip` | a consumer reading it outside those classes reads nothing; declare it on the reading class the same way |

No sibling repo imports `./chip` (§2), so none of these rows needs a consumer addendum.

## 8 · Ledger rows

Closes #43 and F-26, F-27, F-28 (less X-G1's fill), and UIA-F-140 (the `:root` composite; E6-G1, its 1 of 5 fills). X-G7 is recorded as cured at HEAD, with the reading above as its evidence. X-G1's fill half (the selected fill on the one-ink register, α < 1) closes on W-H.1's H1-G22 (fix-5, FD-02).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** the per-instance rule is one rule for every tinted composite (atom, chip, and W-J.1's tile). `cn()` is the one class compositor.
- **Wave:** E6-G1..G11 green in one run.
- **Feature:** a row of five toned chips paints five fills. The selected chip paints no blend flood, carries an edge and settles at scale 1; its translucent fill is W-H.1's. A removed chip leaves in under 0.15 s. Shown in light and dark side by side.

## Appendix A · `e6.mjs` (lands as `tests-visual/wired/chip.spec.ts`)

```js
// W-E.6 born-RED probe: W-CHIP (F-26 per-instance composite, F-28 X-gates). F-27 is a node unit read (see spec).
// node e6.mjs [--eng webkit]
import { open, rectOf, sleep, load, CAP } from './lib.mjs';
import fs from 'node:fs';
const eng = process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium';
const out = { eng, load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
fs.mkdirSync(`${CAP}/e6`, { recursive: true });
for (const theme of ['light', 'dark']) {
  const { browser, page } = await open({ eng, w: 900, h: 400, qs: 's=chips', theme, settle: 1500 });
  // F-26 · five tones → five distinct painted fills
  const px = await page.evaluate(() => [...document.querySelectorAll('[data-probe=tchip]')].map((e) => getComputedStyle(e).backgroundImage));
  const shot = await page.screenshot();
  const fills = await page.evaluate(async ([b64, rects]) => { const im = new Image(); im.src = 'data:image/png;base64,' + b64; await im.decode(); const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d'); x.drawImage(im, 0, 0); return rects.map((r) => [...x.getImageData(Math.round(r.l + 6), Math.round(r.t + r.h / 2) - 1, 1, 1).data.slice(0, 3)].join(',')); }, [shot.toString('base64'), await page.evaluate(() => [...document.querySelectorAll('[data-probe=tchip]')].map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, h: r.height }; }))]);
  row(`E6-G1 F-26 per-instance tint ${theme}`, new Set(fills).size === 5, { distinctPainted: new Set(fills).size, distinctComputedImage: new Set(px).size, fills });
  // X-G1 · the blend: no mix-blend-mode in the chip subtree. The α < 1 clause (`alpha`) is W-H.1's H1-G22 and is only recorded here
  const g1 = await page.evaluate(() => { const e = document.querySelector('[data-probe=selchip]'); const blends = [e, ...e.querySelectorAll('*')].flatMap((n) => [getComputedStyle(n).mixBlendMode, getComputedStyle(n, '::before').mixBlendMode, getComputedStyle(n, '::after').mixBlendMode]).filter((m) => m && m !== 'normal'); return { blends, bg: getComputedStyle(e).backgroundColor, state: e.dataset.state }; });
  const alpha = /\/\s*([\d.]+)\)$/.exec(g1.bg)?.[1];
  row(`E6-G2 X-G1 no blend ${theme}`, g1.blends.length === 0, { ...g1, alpha });
  // X-G2 · the settled selected scale is 1
  await sleep(1250);
  const sc = await page.evaluate(() => getComputedStyle(document.querySelector('[data-probe=selchip]')).scale);
  row(`E6-G3 X-G2 settled scale ${theme}`, sc === 'none' || sc === '1', { scale: sc });
  // X-G3 · the edge exists: border-top-width 1px at rest
  const bw = await page.evaluate(() => getComputedStyle(document.querySelector('[data-probe=tchip]')).borderTopWidth);
  row(`E6-G4 X-G3 edge at rest ${theme}`, bw === '1px', { borderTopWidth: bw });
  // X-G4 (rung and pad clauses) · pad-inline ∈ {4,8,12,20}; font-style normal
  const g4 = await page.evaluate(() => [...document.querySelectorAll('.glass-chip')].map((e) => ({ pad: getComputedStyle(e).paddingInlineStart, fs: getComputedStyle(e).fontSize, style: getComputedStyle(e).fontStyle })));
  row(`E6-G5 X-G4 pad set ${theme}`, g4.every((c) => ['4px', '8px', '12px', '20px'].includes(c.pad) && c.style === 'normal'), { pads: [...new Set(g4.map((c) => c.pad))], sizes: [...new Set(g4.map((c) => c.fs))] });
  await browser.close();
}
// X-G7 · remove control: coarse hit ≥ 44×44 and the AX name from removeLabel
{ const { browser, page } = await open({ eng, w: 390, h: 844, touch: true, mobile: eng === 'chromium', qs: 's=chips' });
  const r = await page.evaluate(() => { const b = document.querySelector('[data-probe=remchip] button, [data-probe=remchip] [role=button]'); if (!b) return null; const x = b.getBoundingClientRect(); const a = getComputedStyle(b, '::after'); return { w: +x.width.toFixed(1), h: +x.height.toFixed(1), label: b.getAttribute('aria-label'), slop: a.content !== 'none' ? [a.width, a.height, a.inset] : null }; });
  // hit area: probe 21 px from the centre on four sides
  const c = await rectOf(page, '[data-probe=remchip] button');
  let hits = 0; for (const [dx, dy] of [[21, 0], [-21, 0], [0, 21], [0, -21]]) hits += await page.evaluate(([x, y]) => !!document.elementFromPoint(x, y)?.closest('[data-probe=remchip] button'), [c.x + dx, c.y + dy]) ? 1 : 0;
  row('E6-G6 X-G7 remove control coarse hit', r && hits === 4 && r.label === 'Remove filter', { ...r, hitsAt21px: hits });
  await browser.close(); }
// X-G6 · removal has a death register: removing the chip runs an exit animation before unmount
{ const { browser, page } = await open({ eng, w: 900, h: 400, qs: 's=chips' });
  await page.evaluate(() => { window.__exit = []; const e = document.querySelector('[data-probe=remchip]'); window.__rmAt = null; const mo = new MutationObserver((ms) => { for (const m of ms) for (const n of m.removedNodes) if (n.nodeType === 1 && n.matches?.('[data-probe=remchip]')) window.__rmAt = performance.now(); }); mo.observe(e.parentElement, { childList: true }); });
  const t0 = await page.evaluate(() => { const b = document.querySelector('[data-probe=remchip] button'); const t = performance.now(); b.click(); const e = document.querySelector('[data-probe=remchip]'); window.__exit = e ? e.getAnimations({ subtree: true }).map((a) => a.animationName || a.transitionProperty) : []; return t; });
  await sleep(800);
  const m = await page.evaluate((t0) => ({ exitAnims: window.__exit, removedAfterMs: window.__rmAt ? +(window.__rmAt - t0).toFixed(0) : null }), t0);
  row('E6-G7 X-G6 death register', m.exitAnims.length > 0 && m.removedAfterMs > 16, m);
  await browser.close(); }
out.load2 = load(); fs.writeFileSync(`${CAP}/e6-${eng}.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e6 ${eng}: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```

After the wave the fixture scene's chips use the new API (`selectable`, `removable`); the probe's selectors (`data-probe`) do not change.
