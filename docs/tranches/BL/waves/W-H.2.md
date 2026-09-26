# W-H.2 · W-FROST-II: one frost detector, blur composed at the element, the F48 ladder (loop D3) · 11.0.0

| field | value |
|---|---|
| seat | band-H wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `80ebfd72` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading measures the published 10.1.0 bytes |
| kind | LOOP WAVE, owned by design loop D3 (`design/material/`). It lands only from D3's converged specification and never before D3 meets its gate |
| ships in | 11.0.0 |
| families | F-31 (remainder after W-0.1's veil-token and control-surface split), with its ledger members from census GAP-1 (#7's remainder, #39's RT-39G) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | the D3 battery (`$H` = `scripts/loops/material/harness/` at landing; W-C.1 §3 step 4 moves it from `docs/tranches/BL/design/material/harness/`, where the HEAD readings were taken; PLAN §5 orders this wave after W-C.1); the band-H paint probe (W-H.1 appendix A: the `lens` scene and the `H2/*` rows); the route frost detector (appendix A here); both land under `scripts/probes/band-H/` |
| engines | Chromium 149.0.7827.55 is the gate engine. Playwright WebKit 26.5 paints no `backdrop-filter` headless, so it cannot witness a lens in either direction; its rows are recorded as paint-only. Real-Safari cells are UNMEASURED (OW-3) |

## 1 · What it closes

| id | what | source |
|---|---|---|
| L01a-22 | #22 W-FROST sealed on a one-shot π; the transmissive cut never landed; no `FROST-TRANSMISSION` executable | `audit/round-1/L01a.md:46,84` |
| L01a-25 | #25 W-FIELD-WELL: W-H.5's | `L01a.md:56,224` |
| L05a-05 | F48 "glass blur slightly more subtle" inverted: the radius ladder rose 1/7/7/11/11 → 10/14/16/20/22 px with no owner reconciliation | `audit/round-1/L05a.md:19,212` |
| R10-02-06 | the opaque escape sets `--glass-level: 0` at the element while the blur rungs compose at `:root`, so descendants keep `blur(20px) saturate(1.5)` over an opaque plate | `REGISTRY.md:659` |
| R10-02-07 | `.fading-scroll` carries `mask-image` at rest; a mask is a backdrop root, so every lens inside is inert | `REGISTRY.md:660` |
| R10-02-08 | the nested-lens arm; `tests-visual/nested-backdrop-budget.spec.ts:39` sets `DEPTH_CEILING = 4`, passes a three-deep stack and runs in no CI job | `REGISTRY.md:661` |
| #7 remainder (GAP-1) | the press darken `filter: brightness()` on the dock lens carrier (`dock/styles/controls/icon-button.css:92`) | `ledger/census-register-a.md:28` |
| #39 RT-39G (GAP-1) | no child of a `.glass-*` plate can carry a working `backdrop-filter`; the library-wide sweep | `census-register-a.md:48`; `BK/EXECUTION-PROGRESS.md:1473` |
| #25, #82 G-F2 | the well: W-H.5's, a disease row's own wave (fix-2, FA-21). This wave's detector reads the well cells W-H.5 cures | `census-register-a.md:37`; `census-register-b.md:67` |
| #33 | π cells 5-7 and G-NO-WHITE-SPECULAR against `--glass-material-rim` (Alert moved into the rule) | `census-register-a.md:45` |
| #38 RT-38C | the Dialog veil blur reads the 20 px floating radius against MOTION-CANON's 11 px; the dark rim | `census-register-a.md:47` |
| inbound | UIA-KF-268, UIA-F-122, UIA-V-297, UIA-KF-252, UIA-KF-255 (chrome calm), UIA-F-230 (the loupe veil frosts its host row), UIA-V-198 (the dark card pole over a red ground); N-13's remainder (the dark dock plate within 0.015 of the page) | `INBOUND-MAP.md:215,265,285,299,301,350,358,376,437`; `census-carries-recap.md:96` |
| owner | OW-8, the W-FROST-II glance: the light frost at every level with F48's blur ladder, each with a paired π | `ledger/CENSUS.md:232` |

**Closed elsewhere.** O-62, O-66 §1, O-66a, UIA-F-216 and UIA-F-27's plate half close in W-0.1 (the light veil at the token and the one field surface). A2-KE-L3-4 cites O-66a and closes with it. The ink on every plate is W-H.1's. M-7's cure (`contain: paint` removed) is W-E.2's; this wave holds it.

## 2 · The defect at HEAD

- **The well is opaque.** `--input-on-glass: hsl(36 40% 92%)` light and `hsl(26 12% 22%)` dark (`tokens/on-glass-fg.css:37`, `tokens/dark-arm.css:303`), painted as `background-color: var(--control-surface-bg)` (`components/_shared/field/control.css:103`). The file says so: "OPAQUE at HEAD … so the `backdrop-filter` below is currently inert" (`:73-81`).
- **The blur rungs compose at `:root`.** `--glass-blur-{wash…overlay}: blur(calc(<radius> * var(--glass-level))) saturate(var(--glass-saturate))` (`tokens/glass.css:88-92`) resolve once where the level is 1. An element's own `--glass-level` (the opaque escape at `glass/surface-axis.css:82`, the PCM 0.3, a consumer's value) never reaches its blur.
- **Library-made backdrop roots.** `.fading-scroll` sets `mask-image` at rest (`styles/utilities/base-misc.css:52-75`). Every `.glass-*` plate carries a `backdrop-filter`, which in Chromium makes it the backdrop root for every lens inside it (D3 SPECS S-2).
- **The ladder rose against F48.** `tokens/glass.css:69-73`: 10/14/16/20/22 px; 7.0.0 had 1/7/7/11/11 (`L05a-05`). No owner ruling reconciles the two.
- **The dark ladder does not exist in paint, and chrome is not calm.** The dark veil ink `oklch(0.17 0.03 70)` at `dark-arm.css:278` sits at the page's lightness.

Measured here. The D3 battery (`node $H/run.mjs <wt> --label hH`, load 181):

| witness (this wave's) | HEAD, Chromium gate |
|---|---|
| M-6 separable ladder | **FAIL 14 of 19**: dark page `#0b0a09`, adjacent ΔE_OK 0.004 / 0.004 / 0.006 / 0.006; plates 0.005-0.011 from the page; the Dialog 0.034. Light adjacent 0.025-0.027 pass. Playwright WebKit 13 of 18, informational |
| M-8 chrome calm | **FAIL 8 of 8**: over the violet/yellow stripes, light floating C 0.0912, overlay 0.0887, the Dialog 0.0743; dark 0.0713-0.0884; luminance bleed 1.01-1.07 (the green half) |
| M-7 halos whole | FAIL 8 of 8 (W-E.2 cures it before this wave; held here) |
| M-1 no grey | FAIL 11 of 11 (W-0.1 cures it; held here) |

The band-H probe (W-H.1 appendix A) over the stripes, Chromium, `H2/*` rows **12 FAIL of 16**:

| row | HEAD |
|---|---|
| H2/OPAQUE-HOST-LENS (computed) | a `.glass-capsule` inside `[data-surface="opaque"]` computes `blur(20px) saturate(1.5)`, both themes |
| H2/LENS-INERT, opaque host | inert: removing its `backdrop-filter` moves p99 ΔE_OK **0.0018** light, **0.0019** dark |
| H2/LENS-INERT, FadingScroll | inert: **0.0000**, both themes |
| H2/LENS-INERT, inside a `.glass-floating` plate | 0.040 / 0.056 (moves pixels: it blurs the plate's own paint; the page it cannot see) |
| H2/WELL-INERT | the Input's own `blur(14px) saturate(1.5)` moves **0.0000**, both themes; fill `rgb(243,236,226)` / `rgb(63,55,49)` |
| H2/WELL-TRANSMITS | the field interior reads `#f3ece2` over black and over white (light), `#3f3731` over both (dark): transmission **0.0000** |
| H2/BLUR-AT-ELEMENT | a `.glass-floating` with `--glass-level: 0.5` on the element computes `blur(20px)`, not 10 px, both themes |
| H2/LENS-REFERENCE (selftest) | a bare capsule on the stripes moves 0.264 / 0.255: the A/B test sees a working lens |

**The route frost detector** (appendix A; Chromium, 1440×900, demo production build, 6 route cells). A visible lens is dead when its own fill is opaque or a backdrop-root former stands between it and the page (a `backdrop-filter` ancestor, `mask-image`, `filter`, `opacity < 1`, a blend mode). The structure is theme-independent:

| route | dead of visible lenses | by cause |
|---|---|---|
| `/` | 4 of 13 | lens ancestor + opaque own fill 4 |
| `/motion/springs` | 9 of 18 | lens ancestor + `mask-image` + opaque fill 6, opaque fill 2, lens ancestor + opaque fill 1 |
| `/containers/dialog` | 0 of 2 | — |
| `/forms/inputs` | 14 of 16 | opaque own fill 14 (the wells) |
| `/containers/configurator` | 7 of 12 | lens ancestor + opaque fill 6, lens ancestor 1 |
| `/containers/sheet`, detented sheet open | 7 of 11 | opaque own fill 7 |
| **total** | **41 of 72** | |

The same run's paint A/B (a lens is inert when removing its `backdrop-filter` moves p99 ΔE_OK < 0.01 over a non-flat backdrop) reads 48 inert of 72 in light and 33 of 72 in dark. The paint count depends on how textured the route's backdrop is (a working lens over a smooth gradient also moves little), so the gate is the structural count, and the paint A/B stays on the probe's stripes, where it is decisive.

**Two items are cured at HEAD** (evidence, so they are hold lines, not born-RED gates):
- **#7's remainder.** The dock icon control carries `.glass-capsule` but computes `backdrop-filter: none`, at rest and pressed; the press darken is `filter: brightness(1)` → `brightness(0.96)` on the same button, and no descendant or pseudo-element carries a lens (the probe's `H2/PRESS-FILTER-ON-LENS(hold)` rows, 0 elements with both, both themes). The filter has no lens to silence.
- **#33's G-NO-WHITE-SPECULAR.** On `/feedback/alert`, the 3 px rim band of 8 Alerts has 0 pure-white pixels (all channels ≥ 250) of 9,480, light and dark (appendix B).
- **RT-39G's sheet instance.** BK moved the sheet's halo sampler to a portal sibling; on `/containers/sheet` with the detented sheet open, the sampler (`blur(34px) saturate(1.5)`) has no former above it. Its backdrop in that capture is flat, so the paint A/B cannot witness it; the structural row passes. The sweep RT-39G asked for is this wave's detector.

## 3 · The cure

The entry gate is W-H.1 §3.1's: D3's convergence and its battery on the converged prototype. At this seat it is not met.

### 3.1 · What lands, whatever route converges

1. **The well** is W-H.5's (D3 common floor row 5): `--input-on-glass` retires there.
2. **Blur rungs compose at the reading element** (F-26's cure form, `REGISTRY.md:506`). The `--glass-blur-*` composites are declared on the reading classes, not `:root`, so an element's own `--glass-level` reaches its radius, and the saturate term scales with the level the same way.
3. **One rule for library-made backdrop roots.** Under a surface that makes a backdrop root the library itself sets (the opaque escape `[data-surface="opaque"]`, `.fading-scroll`'s mask, any `.glass-*` plate), the blur rung variables resolve `none`. A descendant composes its host's frost and carries no lens of its own. A control that must sample the page mounts as a sibling of the plate, as the sheet's halo sampler already does (RT-39G's law). This is one mechanism, the rung variable, for R10-02-06, R10-02-07, R10-02-08 and RT-39G. FadingScroll keeps its mask: the mask is the correct fade over any ground, and a lens under it cannot see the page in any engine.
4. **The frost detector is the gate**, in two arms: the structural count over the demo routes (0 dead lenses) and the paint A/B on the probe's stripes. `tests-visual/nested-backdrop-budget.spec.ts` is deleted: its depth ceiling of 4 is a budget for lenses that cannot see the page. `tests/styles/glass-subtlety.test.ts`'s carrier arm widens from host formers to ancestor formers (`REGISTRY.md:660`, round 6 correction), or is replaced by the structural arm; W-A.2's roster records which.
5. **The blur ladder is the owner's ruling (OW-8).** The owner sees three paired captures: HEAD 10/14/16/20/22, 7.0.0's 1/7/7/11/11, and the converged spec's table (D3-A proposes 6/10/12/16/16; D3-D solves under F48's cap), each over paper, the aurora and the stripes with M-8's numbers beside it. The ruling is quoted into the ledger, and the rungs take the ruled table. The Dialog veil's blur reads the ruled overlay rung, which settles #38's RT-38C against MOTION-CANON's 11 px.
6. **The dark ladder separates and chrome is calm** (M-6, M-8), by the converged route's veil (the pole and α in A, the solver in D, the thin frost with `saturate ≤ 0.6` at blur ≥ 16 px in E, per SPECS S-15).

### 3.2 · What the converged route decides

The veil's pole, α per rung, saturate per rung and the dark arm are D3's. The route-dependent token changes this wave lands (`SPECS.md` A.2-F.2): A deletes `--glass-veil-ink` and `--glass-veil-base` and adds `--glass-veil-content/-chrome`; D generates `tokens/glass.solved.css` and deletes `--glass-veil-ink/-base/-step`; E and F rename `--glass-veil-ink` to `--glass-veil-pole`; C removes `--glass-veil-ink`. Whatever the route, `--glass-veil-ink` does not survive under its current name and meaning, so its removal and its MIGRATION row are this wave's. The converged split table names each row's wave; a row it leaves unassigned is this wave's by default (W-0.1 §3).

## 4 · Files it touches

- `src/styles/tokens/on-glass-fg.css:37`, `src/styles/tokens/dark-arm.css:278-279,303` (the well and the dark veil), `src/styles/tokens/glass.css:29-52,69-92,134-174` (the veil recipe, the radius ladder, the rung composites move off `:root`).
- `src/styles/glass/veil.css`, `src/styles/glass/ladder.css`, `src/styles/glass/surface-axis.css:80-90`, `src/styles/utilities/base-misc.css:44-80` (the FadingScroll rule gains the rung stand-down), `src/styles/glass/glass-capsule.css:57` (the capsule reads the element-composed rung).
- `src/components/dock/styles/shell.css:57,263` (the dock's private re-compositions read the one saturate the spec names).
- `tests-visual/nested-backdrop-budget.spec.ts` (deleted), `tests/styles/glass-subtlety.test.ts` (the carrier arm).
- `scripts/probes/band-H/frost-routes.mjs` and `alert-specular.mjs` (appendices A and B), with `npm run probe:band-H`.

## 5 · Acceptance gates

Setup as W-H.1 §5, plus a demo production build of the candidate: `npx vite build --config demo/vite.demo-dist.config.ts` in the worktree (5.4 s here).

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · M-6 | `node $H/m6-separable-ladder.mjs $D3_OUT/caps/h2` | exit 0 | **exit 1**, FAIL 14 of 19 |
| G2 · M-8 | `node $H/m8-chrome-calm.mjs $D3_OUT/caps/h2` | exit 0 | **exit 1**, FAIL 8 of 8 |
| G3 · the frost detector, routes | `node scripts/probes/band-H/frost-routes.mjs <dist-demo>` over `/`, `/motion/springs`, `/containers/dialog`, `/forms/inputs`, `/containers/configurator`, `/containers/sheet#Open detented sheet`, `/forms/slider`, `/data/sortable-list` (#41c's 20 px frost) | 0 dead visible lenses | **41 of 72 dead** (the six measured cells; `/forms/slider` and `/data/sortable-list` are added by the landed script, which can only add rows, and are not read here) |
| G4 · the frost detector, paint | band-H probe rows `H2/LENS-INERT` | no lens is inert on the stripes | **FAIL 4 of 6** (opaque host and fade in both themes: the recorded 6 of 8 less the two `H2/WELL-INERT` rows, which are W-H.5's G2) |
| G6 · blur at the element | rows `H2/BLUR-AT-ELEMENT` | `--glass-level: 0.5` on a floating plate computes half the floating radius (10 px at today's radius, or half the ruled one) | **FAIL 2 of 2**: 20 px |
| G7 · the opaque host stands down (computed) | rows `H2/OPAQUE-HOST-LENS(computed)` | `none` or `blur(0px)` | **FAIL 2 of 2**: `blur(20px) saturate(1.5)` |
| G9 · the depth budget is gone (static) | `test ! -e tests-visual/nested-backdrop-budget.spec.ts` | exit 0 | **exit 1** (194 lines; `DEPTH_CEILING = 4` at `:39`) |
| G10 · OW-8 ruled | `! grep -qE '^\\| OW-8 \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (LEDGER:328, OW-8 `pending`; fix-2) |
| G11 · the converged family's witness | as W-H.1 G6, on the rows the split table gives this wave | exit 0 | all six exit 1 |
| G12 · holds | M-1 and M-7 at `h2` (cured by W-0.1 and W-E.2); `H2/PRESS-FILTER-ON-LENS(hold)`; `alert-specular.mjs` | PASS, 0 elements with both a `filter` and a lens, 0 pure-white rim pixels | hold lines: HEAD M-1 11/11 and M-7 8/8 FAIL (cured upstream); press rows and the Alert rows pass at HEAD (§2) |

**The gates can pass.** The probe's `FIXTURE=1` plant (`backdrop-filter: none` on the opaque-host and fade lenses, an 80% well fill, a 10 px blur on the level-0.5 plate) reads 0 FAIL on every `H2/*` row. The structural detector goes to 0 when every lens it lists either loses its former or its opaque fill; its selftest is the probe's reference lens, which it must not count (a bare capsule on the page has no former and a translucent fill). The battery's selftest covers M-6 and M-8 (`HARNESS.md` §4).

## 6 · π and DELTA obligations

Before = the `hH`/`head` builds and the demo build of `80ebfd72`; after = `h2`. Captures under `.cache/evidence/W-H.2/`; the wave record inlines each PNG's path, sha256, command and paired π row.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| **OW-8, the owner glance**: the ladder (wash … overlay, the dock, the Dialog) at HEAD's radii, 7.0.0's and the converged table | light, dark | Chromium; Playwright WebKit cannot paint the blur | `$H/glance.mjs` extended to three columns over paper, aurora c1, aurora c0.5 and the stripes | M-8 bleed and chroma per column; M-2 muted per column |
| the dark ladder over the dark page | dark | Chromium, Playwright WebKit labelled | `$H/capture.mjs` ladder cells | G1 rows (HEAD adjacent 0.004-0.006) |
| chrome over the stripes | light, dark | Chromium | the `stripes` cells | G2 rows (HEAD C 0.0743-0.0912) |
| a capsule in an opaque host, in a FadingScroll, in a plate | light, dark | Chromium | `lens-*-{opaque,fade,plate}-{on,off}.png` | G4, G7 |
| `/motion/springs`, `/forms/inputs`, `/containers/configurator` | light, dark | Chromium | route screenshots before and after | G3 per route |
| real Safari | both | — | UNMEASURED (OW-3). The OW-8 glance names this: the owner sees Chromium's blur only | — |

## 7 · MIGRATION rows (clean break, no alias)

| removed or changed | successor | wave |
|---|---|---|
| `--glass-veil-ink` (and, by route, `--glass-veil-base`, `--glass-veil-step`, `--glass-saturate`) | the route's pole and rung tokens (SPECS A.2-F.2). Owed call sites: `sheet/styles.css:216,226`, `music-staff/styles.css:63`, `tokens/manifest.ts:22` | this |
| `--glass-blur-*` resolved at `:root` | the same names, resolved at the reading element; a consumer that sets `--glass-level` on an element now scales that element's blur | this |
| a `backdrop-filter` inside a `.glass-*` plate, a `[data-surface="opaque"]` host or a `.fading-scroll` (it painted nothing) | none; a lens that must see the page mounts as a sibling of the plate | this |
| the blur radius ladder 10/14/16/20/22 | the table the owner rules under OW-8 | this |

Consumer overrides retire by an addendum in each consumer's own tranche (E-6), named in W-L.7's packets: fourier's `.glass-opaque` Configurator escape (`VisualizationView.vue:302`), value.js's and fourier's opaque-well workarounds where they exist, and the GLASS-VEIL-GREY honest-RED rows W-0.1 did not already retire.

## 8 · Dependencies and ledger rows

Its edges are PLAN §5's. Closes F-31's remainder (L01a-22, L05a-05, R10-02-06..08) and its ledger members #7 (a hold: cured in paint at HEAD, §2) and #39's RT-39G; #33's specular row (a hold: cured at HEAD) and its π cells 5-7 (G3 over `/feedback/alert` in the landed route set); #38's RT-38C (G10); N-13's remainder (G1's dark dock row); OW-8 (G10); the inbound rows in §1 on G1, G2 and G4 (the opaque wells, UIA-V-234 and UIA-V-431, are W-H.5's). #41c closes on G3's `/data/sortable-list` cells.

## Appendix A · the route frost detector (`frost-routes.mjs`)

Scratch source as run here (`lens-census.mjs`). It serves a demo production build, visits each route in both themes at 1440×900 under reduced motion (a `#<name>` suffix clicks the button with that accessible name first), lists every visible element whose computed `backdrop-filter` is not `none`, records its own fill and every backdrop-root former among its ancestors, then A/B-toggles each lens's `backdrop-filter` for the paint arm. The structural verdict below it is the gate. The colour maths and static server are W-0.1 appendix A's.

```js
const ROUTES = (process.env.ROUTES ?? "/,/motion/springs,/containers/dialog,/forms/inputs,/containers/configurator").split(",");
const rowsOut = [];
const b = await chromium.launch({ args: ["--force-color-profile=srgb", "--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal"] });
for (const theme of ["light", "dark"]) for (const route of ROUTES) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", colorScheme: theme });
  const page = await ctx.newPage(); const [path0, action] = route.split("#"); await page.goto(base + path0, { waitUntil: "networkidle" }).catch(() => {}); await page.waitForTimeout(1500);
  if (action) { await page.getByRole("button", { name: action }).first().click(); await page.waitForTimeout(1500); }
  await page.evaluate((t) => { document.documentElement.classList.toggle("dark", t === "dark"); }, theme); await page.waitForTimeout(800);
  const lenses = await page.evaluate(() => { const L = []; let i = 0; for (const el of document.querySelectorAll("*")) { const cs = getComputedStyle(el); if (cs.backdropFilter === "none" || !cs.backdropFilter) continue; const r = el.getBoundingClientRect(); if (r.width < 12 || r.height < 12 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth || cs.visibility === "hidden" || +cs.opacity === 0) continue;
      const formers = []; let a = el.parentElement; let lensAnc = false; while (a && a !== document.documentElement) { const s = getComputedStyle(a); if (s.backdropFilter !== "none") lensAnc = true; if (s.filter !== "none") formers.push("filter"); if (s.maskImage && s.maskImage !== "none") formers.push("mask-image"); if (+s.opacity < 1) formers.push("opacity"); if (s.mixBlendMode !== "normal") formers.push("blend"); a = a.parentElement; }
      el.setAttribute("data-lens-i", String(i)); L.push({ i: i++, tag: el.tagName, cls: String(el.className).slice(0, 48), bf: cs.backdropFilter, bg: cs.backgroundColor, lensAncestor: lensAnc, formers: [...new Set(formers)], box: { x: Math.max(0, r.left), y: Math.max(0, r.top), w: Math.min(innerWidth, r.right) - Math.max(0, r.left), h: Math.min(innerHeight, r.bottom) - Math.max(0, r.top) } }); } return L; });
  const on = PNG.sync.read(await page.screenshot());
  let inertN = 0; const detail = [];
  for (const l of lenses) { await page.evaluate((i) => { const e = document.querySelector(`[data-lens-i="${i}"]`); e.style.setProperty("backdrop-filter", "none", "important"); e.style.setProperty("-webkit-backdrop-filter", "none", "important"); }, l.i); await page.waitForTimeout(80);
    const off = PNG.sync.read(await page.screenshot()); await page.evaluate((i) => { const e = document.querySelector(`[data-lens-i="${i}"]`); e.style.removeProperty("backdrop-filter"); e.style.removeProperty("-webkit-backdrop-filter"); }, l.i);
    const ds = []; const { x, y, w, h } = l.box; for (let yy = Math.round(y) + 2; yy < y + h - 2; yy += 2) for (let xx = Math.round(x) + 2; xx < x + w - 2; xx += 2) { const k = (on.width * yy + xx) << 2; ds.push(dE([on.data[k], on.data[k + 1], on.data[k + 2]], [off.data[k], off.data[k + 1], off.data[k + 2]])); }
    ds.sort((a, b) => a - b); const p99 = ds[Math.floor(0.99 * (ds.length - 1))] ?? 0;
    const pts = []; for (let yy = Math.round(y) + 2; yy < y + h - 2; yy += 3) for (let xx = Math.round(x) + 2; xx < x + w - 2; xx += 3) { const k = (off.width * yy + xx) << 2; pts.push([off.data[k], off.data[k + 1], off.data[k + 2]]); }
    const mu = pts.reduce((s, p) => s.map((v, j) => v + p[j] / pts.length), [0, 0, 0]); const sp = pts.map((p) => dE(p, mu)).sort((a, b) => a - b); const spread = sp[Math.floor(0.95 * (sp.length - 1))] ?? 0;
    const flat = spread < 0.01; const inert = !flat && p99 < 0.01; if (inert) inertN++;
    detail.push({ ...l, dEp99: +p99.toFixed(4), spread: +spread.toFixed(4), flat, inert }); }
  const r = { theme, route, lenses: lenses.length, flat: detail.filter((d) => d.flat).length, inert: inertN, inertUnderLensAncestor: detail.filter((d) => d.inert && d.lensAncestor).length, underLensAncestor: detail.filter((d) => d.lensAncestor).length, inertUnderMask: detail.filter((d) => d.inert && d.formers.includes("mask-image")).length, underMask: detail.filter((d) => d.formers.includes("mask-image")).length };
  console.log(JSON.stringify(r)); rowsOut.push({ ...r, detail }); await ctx.close(); }
await b.close(); srv.close(); fs.writeFileSync(path.join(out, process.env.OUTNAME ?? "lens-census.json"), JSON.stringify(rowsOut, null, 1));
```

The structural verdict (run here over the two output files, light rows; the dark rows give the same counts):

```js
const alpha = (bg) => { const m = bg.match(/rgba?\(([^)]+)\)/); if (!m) return bg.startsWith("color(") ? (bg.includes("/") ? +bg.split("/")[1].replace(")", "") : 1) : 1; const p = m[1].split(/[ ,\/]+/).filter(Boolean); return p.length > 3 ? +p[3] : 1; };
let T = 0, D = 0; for (const r of rows) { const dead = r.detail.filter((x) => x.lensAncestor || x.formers.length || alpha(x.bg) >= 0.999); T += r.lenses; D += dead.length; }
console.log("dead", D, "of", T); process.exit(D ? 1 : 0);   // HEAD: dead 41 of 72
```

## Appendix B · the Alert specular probe (`alert-specular.mjs`)

Run here as `node alert-spec.mjs <dist-demo>`: light and dark each `{"alerts":8,"rimBandPx":9480,"pureWhitePx":0,"pass":true}`.

```js
const b = await chromium.launch({ args: ["--force-color-profile=srgb"] });
for (const theme of ["light", "dark"]) {
  const page = await b.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: theme, reducedMotion: "reduce" }); await page.goto(`${base}/feedback/alert`, { waitUntil: "networkidle" }); await page.waitForTimeout(1200);
  await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme); await page.waitForTimeout(600);
  const img = PNG.sync.read(await page.screenshot({ path: path.join(out, `alert-${theme}.png`) }));
  const boxes = await page.evaluate(() => [...document.querySelectorAll('[role="alert"], [data-slot="alert"], .alert')].map((e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) }; }).filter((r) => r.w > 40 && r.h > 20 && r.y >= 0 && r.y + r.h <= innerHeight));
  let white = 0, band = 0; for (const r of boxes) for (let y = r.y; y < r.y + 3; y++) for (let x = r.x + 12; x < r.x + r.w - 12; x++) { const i = (img.width * y + x) << 2; band++; if (img.data[i] >= 250 && img.data[i + 1] >= 250 && img.data[i + 2] >= 250) white++; }
  console.log(JSON.stringify({ gate: "H2/NO-WHITE-SPECULAR", theme, alerts: boxes.length, rimBandPx: band, pureWhitePx: white, pass: white === 0 })); await page.close(); }
```
