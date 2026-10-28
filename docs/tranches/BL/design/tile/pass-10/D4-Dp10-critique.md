# D4 · pass 10 · D4-D′ v9 · critique: the build pass, read fresh

| field | value |
|---|---|
| seat | D4-D′ adversarial critic, pass 10 (REGISTRY §P9-6). It authored no D4 seat in any pass. It scores the fixed 40-row checklist (REGISTRY §P2-6.3, unchanged), adds no row and picks no route |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `ecd4232b8`. `git diff --stat fdea480e7 ecd4232b8 -- . ':!docs'` is empty, so this seat and the BUILD seat measured the same library. Detached worktree `.claude/worktrees/bl/D4/p10/crit10/wt`, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`) |
| hashes, checked before any measure | `floor-v6.patch` **`09e742439213dc15b4b05aba5de4508caba34427`**; `D4-Dp10.patch` **`538b034c754bce9263019b2ac1f4fba1852bd11a`** (8 files, +495 / −81), `git apply --check` clean on HEAD + floor v6; post-apply **`git diff HEAD --binary \| shasum` = `80ab066d67f89cca14b2eaeb901ac7871cb8f75d`**; `shape.ts` **`9455d073…`**, `_shared/guard.ts` **`53c233af…`**. All equal BUILD.md's. The `patch` stage reversed D′ v9 to a tree equal to HEAD + floor v6 in `src`, `tests`, `demo` and `MIGRATION.md`, and re-applied it (`D4-Dp10-crit/logs/patch-check.log`) |
| harness | **H9 `932637d53662`, 45 files**, committed at HEAD and byte-equal in the worktree; printed on every log line. Unedited by this seat |
| owner | O-103c (Q-10 (i): C1 is a cell in both states, selection changes no geometry) and **O-103e** (that condition binds any content C1 can hold; L-5 is a cell in T-4's fold; preferred cure: no weight change). Every other ruling stands as O-102b/O-103 record it. **Q-11 (a) is a DEFAULT and G (D4-G) stays BLOCK.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)**; E-4 is read against this seat's Playwright WebKit run (O-103) |
| engines | Chromium 149.0.7827.55, Playwright's default headless shell, no GPU arguments. Playwright WebKit (headless). Every WebKit number below is **Playwright WebKit**, which is not Safari |
| machine | Every build, unit run and browser run went through `guarded --rss-gb 8`; `--light` only for engine-free reads (SHEET, vue-tsc, bundle, XSCRIPT). Every Playwright WebKit read sat inside a `guarded --exclusive webkit` hold, queued on the one machine-wide lock and never cancelled. Serial: one heavy run at a time. Loads at stage boundaries ran 9.66-39.61 (`logs/chain.log`). Playwright WebKit hold waits: A 30 min 22 s, B 6 min 35 s, C 15 min 57 s, D 15 min 0 s, **E 2 h 8 min 39 s** (past 90 min; waited out, not cancelled), the plant hold 36 min 53 s |
| records | `D4-Dp10-crit/`: `run-crit10.sh` (every stage), `chain.sh` (the order run) and `chain2.sh` (the attack plants), `routes/A10/` (the attack route), `probes/` (`crit10-geom.mjs`, `crit10-c1.mjs`, `crit10-carrier.mjs`, `crit10-prt-tint.mjs`, `crit10-k2-diag.mjs`, `h8-sheet.mjs`), `logs/` (every log cited; `logs/smoke/` the probe smoke runs), `frames/` |

Citations: `B10` is `BUILD.md`, `H9` is `H9.md`, `R9` is REGISTRY's pass-9 part (§P9). "A · B" means Chromium · Playwright WebKit.

---

## 0 · In brief

1. **Every BUILD number reproduced, in both engines.** The migrated arm reads T-1 15/15 · 18/18, T-2 52/52 on `src`, `dist` and `dist-dev`, T-3 **43/43 · 43/43**, T-4 **42/42 · 42/42 on `src` and on `dist`** (24 + the 18 L-5 cells), T-5 38/38 on both builds, T-6 33/33, T-7 24/24 and T-8 27/27. FACT reads 92/92 on `src`, `src-dev` and `dist`, CANON 4/4 with every plant at its tally, ATTACK 5/5 and 3/3, CORNER 5/5 and 5/5, C1BOX 6/6, CRIT-C1 24/24 · 18/18 + 6 UNMEASURED, and XSCRIPT 19/19 ×3. SHEET's self-test is 14/14. Units: 68/68 clean, and every one of the 37 plants matches BUILD's count. The whole suite ran 2,357 cases with HEAD's 3 `boot-graph` failures. vue-tsc 0 · 0. The bundle is **2,935,947 B**, the same as the BUILD's.
2. **The L-5 cure holds by construction, past H9's one ladder** (§2). `crit10-geom` sweeps C1's anatomy over 47 labels of 14 to 60 characters, at 192 and 256 px and 12 viewports (320 to 1920), by click and by keys. It reads every option and child box scroll-free and diffs 53 layout-affecting computed properties at rest and selected.
   - D′ v9: **192/192 · 188/192** on `src`, 112/112 · 108/112 on `dist`, with 0.00 px everywhere. The 4 Playwright WebKit cells are K2's consumer `content-visibility` placeholder and are not selection's (§2.3).
   - The planted 600 fails it: **20/112 · 18/112**. The pass-9 critic's crit9-c1 (scroll fix applied) reads 96/96 · 78/78 + 18 UNMEASURED on the 47-label ladder.
3. **Re-read (a), G on a pill row, holds; the weight step is not shown load-bearing on pills in light or dark** (§3). The selected pill is the one on a darker (light) or lighter (dark) plate with full ink, in both engines, fine and coarse. On numbers it is thin, though. A dark pill's selected state changes **0.00-3.50 px² by ≥ 3:1** (the 600 changed 56-82). The plate separates at 1.19-1.21:1 and the ink at 2.06:1, both achromatic. That is evidence for the owner's pill question (§P9-5), not a reopened cell cure.
4. **One new finding, and one known measure that the cure exposes; neither opens a row** (§4):
   - **L-6: H9's SHEET reads a narrower CSS set than H8's.** The built sheet holds only the seven component families the harness app imports, and the unit twin dropped its CSS arm. A `--selection-tile: flush` writer in `Accordion.vue`'s `<style>`, or in `disclosure.css`, passes H9's SHEET 2/2 and the twin 68/68, where H8's source reader FAILs both. `src` holds no such writer, so R-10 stays met. H9's "one CSS reader of record" is a regression in coverage.
   - **PRT pills: the floor's level-0 plate paints over the tint.** Under reduced transparency, `.control-surface` becomes an opaque `background-image` that covers the selected `background-color`, so the selected pill's plate equals its neighbours' (1.00:1, both engines). The 1.00:1 is not new: REGISTRY:47 recorded it in pass 1. What is new is that, with the weight gone, the ink (3.23:1 against rest ink) is a PRT pill's only carrier.
5. **Score: 40 / 40. No row opened, added, struck or renamed.** Pass 10 is clean by §P9-6's definition. It is the build pass, so its clean is recorded and does not count. Passes 11 and 12 confirm.

---

## 1 · Re-run

`logs/chain.log` holds the order. Phase 1 ran from 23:38:53 to 23:47:06: state, patch, SHEET self-test, libbuild, vue-tsc, the builds (BUILD's seven plus `a10-src` and `a10-dist`), SHEET on the clean builds, plant builds, the lane plants, the suite, the unit plants, bundle and XSCRIPT. Then came the Chromium battery, reads, film and attack, and Playwright WebKit holds A to E. The chain ended `CHAIN-DONE` at 07:35:06. `chain2.sh` (§4) ran from 07:35:12 to `CHAIN2-DONE` at 09:11:00. A last `chain2.sh states-chromium states-webkit` (09:14:10-09:37:44, WebKit hold 11 min 51 s) ran the carried `states` probe for X-1 and R-4, which neither the BUILD order nor this seat's first chain carried: **states 54/54 · 54/54, hover 9/9 · 9/9, a11y 6/6 · 3/3** (`carried-states-*.log`), pass 9's tallies.

### 1.1 · The battery (`dp10-src`; `dist`, `dist-dev` where named)

| witness | migrated A · B | whole A · B | BUILD |
|---|---|---|---|
| T-1 | **15/15 · 18/18** | 20/42 · 23/45 | the same |
| T-2 `src` · `dist` · `dist-dev` | — | **52/52** each, both engines | the same |
| **T-3** | **43/43 · 43/43** | 45/85 · 45/85 | the same |
| **T-4** `src` · `dist` | **42/42 · 42/42** each | 54/72 | the same |
| T-5 `src` · `dist` | **38/38** each, both engines | 87/116 · `dist` 88/117 | the same |
| T-6 | **33/33 · 33/33** | 64/88 | the same |
| T-7 | **24/24 · 24/24** | 24/24 (unmigrated 4/33) | the same |
| T-8, one run | **27/27** | 27/39; 13 unmeasured, among them the real-Safari cell: safaridriver answered "You must enable 'Allow remote automation'" (`logs/src-T-8-both.log`) | the same |
| W-A · W-B · W-C · W-D · W-E | — | 5/9 · 9/25 · 0/8 · **8/8** · 1/3, both engines; W-E `dist`, `dist-dev` 1/6 | the same |

Logs: `battery-src-chromium.log` (23:47-00:05, loads 14.88-36.26), `src-*-webkit.log`, `src-T-8-both.log`, `dist-*`, `distdev-*`. Each WebKit witness printed H3-1's routine browser recycle at the 60-navigation cap once. Nothing stalled or disconnected, and no cell needed a re-run.

**T-4's L-5 cells, both engines, `src` and `dist`.** At 390×844 and 1440×900, in light, dark and PRT, by click and by keys, the ladder reads max **0.00 px** with no re-wrap. The falsifier «Awaiting a reply from the» reads 1 line, 184.00×56.00, weight 500 → 1 line, 184.00×56.00, weight 500, `on`. The `weight-step` plant reads **30/42 · 30/42**: the 12 cells at 390 fail, and the falsifier goes 1 → 2 lines, 184.00×56.00 → 184.00×77.00, weight 500 → 600 (`t4-weight-step-*.log`). So the falsifier keeps its edge in both engines (§P9-2).

**C1, T-3** (`T-3-chromium.json`): 933.50 / 946.50 / 937.75 px² (light / dark / PRT) against the bar 251.00. These are the pass-9 numbers to the hundredth, with C1 now read from `sites.mjs` (L-4).

### 1.2 · H9's, H8's and earlier cells

| cell | Chromium · Playwright WebKit | BUILD |
|---|---|---|
| **SHEET** self-test | **14/14 OK** | the same |
| SHEET on `dp10-src` · `dp10-atk-src` | **PASS 2/2** each: 1 write, the route's rule | the same |
| SHEET plants `foreign` · `var` · `esc` · `apply` · `static` · `ts` · `const` | **FAIL 1/2** each. `esc`, `apply` are read on the built sheet as `«.card>.toggle-group» flush`; `const` reads `shape.ts:8 «"--selection-tile"» (the name held)` (`plant-builds.log`) | the same |
| SHEET plants `concat` · `unpinned` | PASS 2/2 (no static reader resolves `concat`, by design; `unpinned` writes no tile) | the same |
| SHEET lane plants `crit-lg-plated` · `crit-strip-flush` · `fv6-second-lane-writer` | **FAIL 1/2** each (`sheet-lane-plants.log`) | the same |
| **FACT** `src` · `src-dev` · `dist` | **92/92** each, both engines | the same |
| FACT plants `foreign` · `var` · `esc` · `apply` · **`concat`** | **88/92** each, both engines: the four `foreign-ancestor` cells | the same |
| FACT `unpinned` · `--l3 on-item` | **90/92** (`paint-item-write`, light and dark) · **88/92** (`paint-bare-pill`, `paint-bare-tile`), both engines | the same |
| FACT fold, state cell | `b` checked, `on`, ink `oklch(0.216 …)`, **weight 500**; `a` unchecked, ink `rgb(124, 102, 80)`, **weight 500**; 1 tab stop (`h-fact-src-*.log`) | the same |
| **CANON** clean · `a` `s` `h` `layer` `foreign` `unlayered` `cq` `lowlayer` `cqoff` | **4 · 3 · 3 · 3 · 2 · 3 · 3 · 3 · 4 · 4 /4**, both engines | the same |
| **ATTACK** `src-dev` · `dist` | **5/5 · 3/3**, both engines | the same |
| **CORNER** `src` · `dist` | **5/5 · 5/5**, both engines | the same |
| **REPORT** | 3/4 + 1 unmeasured (the mark, Q-3), both engines; `name-ink` PASS light and dark; `kick-spring` PASS | the same |
| REPORT kick (B-5, reported, floor-owned) | **0.16 px · 0.14 px**, want ≤ 0.05 | 0.17 · 0.13 |
| T-4 / FACT fixture self-test | **20 runs OK**, both engines | the same |
| **C1BOX** `src` · `dist` | **6/6 · 6/6**, both engines | the same |
| **CRIT-C1** `src` · `dist` | **24/24** each · **18/18 + 6 UNMEASURED** each | the same |
| **XSCRIPT** self · pair p8 · pair p7 | **19/19 · 19/19 · 19/19** | the same |
| `states` states · hover · a11y (X-1, R-4) | **54/54 · 9/9 · 6/6** · **54/54 · 9/9 · 3/3** | not run by BUILD; pass 9: the same |
| X-7 tone (`crit.mjs --part tone`) | **12/12 · 12/12** (red `rgb(210 30 30)`: edge and ink → `oklch(0.42 0.211 27.8)` light, 2.11:1) | the same |
| carried ink (R-5, reported) | `preset` 2.66:1 light, **1.56:1 dark**, 2.66:1 PRT; `strip` 3.23 · 2.06 · 3.23, both engines | the same |

Only the kick moved, by 0.01 px, which is within the B-5 band every pass has read.

### 1.3 · Units, types, bundle (engine-free)

- **Units** (`unit-plant-*.log`, no `-t` filter, 68 cases each): `clean` and `ctl-reads` PASS 68/68. All 37 plants failed exactly as many cases as in BUILD's run. That includes `weight-step` (1, the weight case), `crit-const-name` (1, L-1a cured) and `crit-l3-third-rule` (2), with `crit-foreign-writer`, `crit-var-writer`, `crit9-css-escape`, `crit9-apply` and `crit9-concat` passing by design.
- **Whole suite** (`unit-all.log`): 2,357 ran, 2,354 passed, **3 failed** (`gate:boot-graph — build arm` ×3, HEAD's: no `dist-demo` in a worktree), 1 skipped.
- **vue-tsc**: app 0, test 0. **Library build**: exit 0.
- **Bundle** (`bundle.log`): **2,935,947 B** unpacked, 844 files; `dist` 2,542,341 B in 840 files; JS gzip-9 329,772 B; +16,890 over the datum 2,919,057 (Q-14).
- **State** (`state.log`): the lane sheet's one `font-weight` is `styles.css:132` (500). There is no `@apply` of the fact, no escaped or built name, and C1's `shape` lives in `sites.mjs:77`.

### 1.4 · The re-reads the cure owes (§P9-6)

| re-read | Chromium · Playwright WebKit |
|---|---|
| **(a)** G on a pill row | §3. Met in light and dark, fine and coarse; frames in `D4-Dp10-crit/frames/single-*`, `pill-badge-*` |
| **(b)** a pill's width, rest → selected (`pill-width.mjs`, info) | D′ v9: **0.00 px** own width and row move in every scene, light and dark, both engines. Planted 600: `single` +1.20, `pill-icon` +1.00, `pill-badge` +1.27 · +1.28, `vertical` 0.00. And on a pill row at its wrap edge (A10 `pillwrap`, 260 px, 7 pills): selecting «Board» under the 600 pushes «Drafts» onto the next line, **184.25 px**, at 390, in light, dark and PRT, both engines (`crit10-geom-a10-ws-src-*.log`). D′ v9 reads 0.00 there |
| **(c)** T-3 and E-2's C1 cells | T-3 43/43 · 43/43, C1 933.50 / 946.50 / 937.75 px²; C1BOX 6/6; CRIT-C1 24/24 · 18/18. The bare C1 keeps its perimeter: 881.50 / 891.50 / 883.00 px² against 240 (`crit10-c1-a10-src-chromium.log`) |
| **(d)** X-2 `name-ink`, X-7 tone | `name-ink` PASS light and dark; the selected name is its item's ink, `oklch(0.216114 …)` / `oklch(0.926146 …)`. Tone 12/12 |
| **(e)** T-7's non-gating content-ink cells | 9 cells, all on `unmigrated` (`T-7-chromium.json`). The library side reads weight 500 in every one. The 600s left are the consumers' own verbatim content (`strip-verbatim` on, `f1-verbatim` on). They gate nothing |

---

## 2 · The L-5 cure, attacked

### 2.1 · Records, aliases, opt-ins

- **No selected weight anywhere in the library.** There is no `[data-state="on"]` or `aria-checked` rule with a `font-*` anywhere in `src` (`rg`, §1.3 state). Segmented tabs set `font-weight: 500` and no selected weight.
- **No alias and no opt-in.** There is no `--selection-weight`, `data-weight` or `selected-weight` in `src`, `tests` or `demo`.
- **No record names weight as a carrier.** None in `src`, `demo`, `MIGRATION.md`, or `docs/` outside the tranches. `styles.css` says "THE ON-STATE CARRIES ON INK, AND ASSISTS WITH FILL" and "the 0.12 is licensed only because the ink co-carries (a tile's perimeter too)". The floor's tile comment says "a pill's carriers (the on-state, below) hold on a bare label". MIGRATION's `--selection-paint` bullet says "their selected ink".
- **One wording to tighten (E-3, info, not a row).** MIGRATION.md:136-142 joins the breaking clause to the tone sentence: "A selected `ToggleGroup` item keeps its rest weight (it was 600), and its label ink, tint and perimeter follow `--selection-tone` … Unset, every value is what it was." "Unset" means the tone, but "every value" now reads across the weight, which is not what it was. The cure is to give the weight clause its own sentence. No H9 cell reads MIGRATION prose beyond the `--selection-tile` bullet's wrap.

### 2.2 · Geometry by construction: `crit10-geom` on A10

The attack route `routes/A10` is H9's `MIGRATED("shape")` plus four compositions no consumer writes:
- `c1long`: C1's group at 192 px over **47 labels of 14 to 60 characters**, so labels sit at one-, two- and three-line boundaries;
- `c1wide`: the same ladder at 256 px;
- `c1bare`: C1 under `--selection-paint: bare`;
- `pillwrap`: a 260 px flex-wrap row of 7 pills.

The probe reads every option and every element child scroll-free (the offset chain, and the border box plus every scroller up to the group, since F1's row is its own scroller). It also reads every label's line count, and diffs 53 layout-affecting computed properties of the option and its subtree, rest against selected. It does this by click and by keys, on the ladders at 12 widths, on the rest at 390 and 1440, light, and dark and PRT at 390 on `c1long` and `pillwrap`.

| build | Chromium | Playwright WebKit |
|---|---|---|
| **D′ v9 `a10-src`** | **192/192**: every `geom` cell **0.00 px**, no re-wrap, every selection landed (47/47 on the ladders), **no layout property differs**. The `c1long` group is 192×3769 at 320-412, then grows to 192×3822.81 / 4051.33 / 4841.66 / 5010.00 / 5421.33 / 5764.45 as the type steps up, so the sweep reads seven type sizes. Hover and focus-visible info: 96/96, no layout property differs | **188/192**: the same, except 4 cells on `specimen-migrated` (§2.3) |
| D′ v9 `a10-dist` (`--quick`) | **112/112** | 108/112, the same 4 K2 cells |
| planted `weight-step` | **20/112**: `c1long` 390 +21.00 px ("Awaiting a reply from the87" 2 → 3 lines), 1440 +25.00 px (3 → 4 lines), `c1wide` 1440 +25.00 px, `pillwrap` 184.25 px; every style cell names `font-weight: 500 → 600` | **18/112**, the same |

So on D′ v9 no label length, column width or viewport the sweep reached moves geometry on selection, and nothing in the cascade that could move it changes. The plant shows the sweep has teeth well beyond the 25-character falsifier: re-wraps at 1440 that H9's ladder misses, and a pill row that wraps.

**`crit10-c1`** (pass 9's `crit9-c1`, copied with the one fix: the scroll walk stops before `document.scrollingElement`) on A10: **96/96 · 78/78 + 18 UNMEASURED** (WebKit has no Layout Instability API). `c1long` with 47 options, at 390 and 1440, light, dark and PRT, over 16 kinds of state (click on each option, hover, held press, Tab, ArrowDown through all) reads **0.000 px** for the box and the content, lines unchanged, ResizeObserver 0, layout-shift 0 entries. The pass-9 scroll artefacts are gone: no `info-fail` line remains.

### 2.3 · The 4 Playwright WebKit cells: not selection's

On `specimen-migrated` (K2), the click path read option 6 at 205×114 at rest and 205×84.42 once clicked (390), and 114 → 87.41 (1440). The keys path passed. `crit10-k2-diag` (two runs per viewport, both engines) separates the two:

| step (option 6, 390) | Playwright WebKit | Chromium |
|---|---|---|
| load, nothing selected | **114.00**, top 446.27 of 900 (on screen) | 84.42 |
| +1 s | 114.00 | 84.42 |
| scrolled into view, **nothing selected** | **84.42** | 84.42 |
| scrolled back, clicked, cleared, clicked again | 84.42 throughout | 84.42 throughout |

The 29.58 px is K2's own consumer CSS: `[data-item] { content-visibility: auto; contain-intrinsic-size: auto 104px }` (`harness/k2.mjs:33`). Playwright WebKit holds options 6 and 7 at the placeholder while they are on screen, until any scroll. Selection moves nothing (equal across select, clear and reselect, in both runs). **The cells are not L-5 and not the library.** They are a probe-order artefact (the rest read precedes the first scroll) on consumer CSS, and are recorded as info.

### 2.4 · The L-5 unit reads `font-weight` only

The unit "selection changes no weight" lists every `font-weight` declaration in the lane sheet. Two plants on `.toggle-group__item[data-state="on"]` (`chain2`, `crit-l5-plants.log`, `crit-plant-units.log`):

| plant | unit | T-4 L-5 cells A · B | CRIT10-GEOM A · B |
|---|---|---|---|
| `letter-spacing: 0.02em` | **PASS 68/68 (miss)** | **30/42 · 30/42**: falsifier 1 → 2 lines, 184×56 → 184×77, weight 500 | 18/112 · 16/112 |
| `font-variation-settings: "wght" 650` | **PASS 68/68 (miss)** | **30/42 · 30/42**, the same | 16/112 · 14/112 (`font-variation-settings: normal → "wght" 650`) |

T-4 is the gate, and it holds. The unit is a fast proxy that is narrower than its name. Info (§4).

---

## 3 · Re-read (a): G on a pill row

**Frames** (`D4-Dp10-crit/frames/`). In each pair, the top row is D′ v9 and the bottom the planted 600; the columns are selected and focused-selected. The sets are `single-{light,dark}-{fine,coarse}-{chromium,webkit}`, `pill-badge-{light,dark,prt}-fine-*` and `single-prt-fine-*`.
- **Light:** the selected «Power» sits on a darker plate (`#e7e4de → #d3d1cb`, 1.20:1) in near-black ink against brown rest ink (3.23:1 ink to ink). It is unmistakable without the weight, fine and coarse, in both engines.
- **Dark:** the selected pill is the one lighter plate (`#120e0b → #25221e`, 1.21:1; WebKit 1.19:1) with the brightest label (`#aca091 → #e9e6e2`, 2.06:1). It reads at a glance among four, fine and coarse. The 600 row is louder, but the D′ v9 row is not ambiguous. On `pill-badge` dark the ink step is 1.56:1, and the plate and the full-white label still single it out.
- **Focused-selected:** the ring stands a gap outside the plate in every frame. **G, re-read (a): met.** The weight step is **not shown load-bearing on pills** in the frames G names.

**Numbers for the owner's pill question** (`crit10-carrier`, info; the same pill at rest and selected, focus blurred):

| scene, fine | D′ v9: c3 (px² changing ≥ 3:1) A · B | planted 600: c3 A · B |
|---|---|---|
| `single` light | 95.25 · 99.25 | 139.25 · 143.75 |
| `single` **dark** | **0.00 · 3.50** | 68.25 · 75.00 |
| `pill-badge` **dark** | **40.00 · 0.00** | 56.75 · 81.50 |
| `single` PRT | 95.25 · 98.50 | 140.75 · 144.50 |

Every carrier is achromatic (selected fill chroma 0.008-0.015, ink 0.006), so "without colour" holds in the hue sense. In dark, though, no pixel of a selected pill changes by 3:1. Q-10 (b) sets pills no 3:1 bar, so nothing gates, but this is the thinnest a selected state in this library reads.

**PRT (outside G, reported).** Under `prefers-reduced-transparency`, `--glass-level: 0` turns `.control-surface`'s plate into an opaque `background-image` (`linear-gradient(#fdf5ec, #fdf5ec)`). That image paints over the selected tint, which is a `background-color` (`oklab(0.216 … / 0.12)`, computed and present) (`crit10-prt-tint-*.log`). The selected pill's plate equals its neighbours': **fill 1.00:1, both engines**. Its one carrier is the ink, 3.23:1 against rest ink (`single-prt-fine-*-pair.jpg`, top row). The weight was the second carrier until D′ v9. The masking is the floor's and was measured in pass 1 ("the 1.20:1 fill (1.00:1 under PRT)", REGISTRY:47). This seat names the mechanism, and tiles are unaffected because their perimeter carries. Routed in §4.

---

## 4 · For the registry (no row opened; no score changes)

| id | class | found by | placement | cure |
|---|---|---|---|---|
| **L-6** | **H9's SHEET is narrower than H8's.** It reads the harness app's built sheet, which holds only the seven families the app imports (`scenes.mjs:506-512`). The unit twin dropped its CSS arm. A writer in an unreached component's `<style>` (`Accordion.vue`) or `.css` (`_shared/disclosure/disclosure.css`, reached only by Accordion and Collapsible) passes H9 SHEET **2/2** and the twin **68/68**. H8's source reader (`probes/h8-sheet.mjs`, H8's file with its lib import re-pointed) FAILs both 1/2 (`crit-css-plants.log`). FACT cannot reach them, since no composition imports the component. A consumer who imports Accordion gets the write. `src` holds none, so R-10 stays met | §1, this seat | landing, H10, before or with the release cut | SHEET reads a built sheet that holds every component's CSS: the library's own `dist` stylesheet(s) (`libbuild.mjs` output), or an app that imports every family. Witness pair: the two plants FAIL; the clean library PASSes |
| L-6b | a JS-escaped held name (`"--selection-tile"` in `shape.ts`) passes H9 SHEET, H8 SHEET and the twin; unreached, FACT does not see it | §4 plant `js-escaped-name` | with L-6 | the held-name reader resolves JS string escapes, as SHEET resolves CSS ones |
| L-7 (info) | the L-5 unit reads `font-weight` only; `letter-spacing` and `font-variation-settings: "wght"` on the selected rule pass it (68/68). T-4's L-5 cells and CRIT10-GEOM catch both, in both engines | §2.4 | landing, optional | read every layout-affecting declaration on an on-state rule, or name the unit for what it reads; T-4 stays the gate |
| **PRT-tint** | under reduced transparency, the level-0 plate (`background-image`) paints over the selected tint; a selected pill's fill is 1.00:1 (as REGISTRY:47 read in pass 1), and since D′ v9 ink alone carries (3.23:1) | §3, `crit10-prt-tint` (the mechanism) | **owner, with the pill question** (§P9-5), then floor | the tint as a layer above the plate (e.g. the selected rule writes the plate image's colour, or a layer that composes over it) |
| pill question (§P9-5) | asked on numbers: the 600 cost a pill +1.00-1.28 px and a wrapped row 184.25 px; without it, dark c3 is 0-40 px² | §1.4, §3 | owner | — (no cure is implied; G holds) |
| info | MIGRATION.md:136-142, "Unset, every value is what it was" now reads across the weight clause | §2.1 | next MIGRATION edit | the weight clause its own sentence |
| info | K2's consumer `content-visibility: auto` placeholder (114 px) holds on screen in Playwright WebKit until a scroll | §2.3 | none (consumer CSS; the harness's) | a probe reads rest after a first scroll |
| reported | R-5: dark selected ink 1.56:1 on K2; the perimeter carries | every pass | — | — |
| reported | B-5: the kick, 0.16 · 0.14 px (want ≤ 0.05) | floor | — | — |

None of these names an H9 cell that fails on D′ v9, and none is a row. L-6 is a gap in an instrument's coverage over code `src` does not hold, ruled as pass 9 ruled L-1b.

---

## 5 · The checklist (REGISTRY §P2-6.3), row by row

| row | reading (Chromium · Playwright WebKit) | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 | met |
| T-2 | 52/52 on `src`, `dist`, `dist-dev`, both engines | met |
| T-3 | migrated 43/43 · 43/43; C1 933.50 / 946.50 / 937.75 px² against 251 | met |
| **T-4** | migrated **42/42 · 42/42** on `src` and `dist`, the 18 L-5 cells included; falsifier 1 → 1 line, 184×56 unchanged; `weight-step` 30/42 · 30/42 (the edge kept); CRIT10-GEOM 192/192 · 188/192 (the 4 not selection's, §2.3); CRIT10-C1 96/96 · 78/78; C1BOX 6/6; CRIT-C1 24/24 · 18/18 | met |
| T-5 | 38/38 · 38/38 on `src` and `dist` | met |
| T-6 | 33/33 · 33/33 | met |
| T-7 | 24/24 · 24/24; XSCRIPT 19/19 ×3 | met |
| T-8 | 27/27; real Safari UNMEASURED (owner's safaridriver checkbox) | met |
| X-1 | the carried `states` probe (sibling and the conditions) **54/54 · 54/54**; FACT's fold `paint-state` (1 tab stop, `aria-checked`), both engines | met |
| X-2 | REPORT `name-ink` PASS light and dark, both engines | met |
| X-3 · X-4 · X-6 | T-1 and T-3 green on the migrated V2; CANON and CORNER green | met |
| X-5 | ATTACK `src-dev` 5/5, `dist` 3/3, both engines | met |
| X-7 | tone 12/12 · 12/12: edge, tint and ink each move | met |
| FV-1 · FV-3 | T-5, T-6 migrated green | met |
| FV-2 | T-2 52/52 ×3; FACT 92/92 ×3 with the fold's 12 `paint-*` cells; plants `on-item` 88/92, `unpinned` 90/92; bare C1 keeps its perimeter (881.50-891.50 px² against 240) | met |
| FV-4 · FV-5 · FV-6 · FV-7 | tone 12/12; T-5 arrows; ATTACK 5/5, 3/3; both engines | met |
| FV-8 | T-6 migrated PRT hover cells green | met |
| FV-9 | FACT 92/92 per flavour | met |
| FV-10 | `guard-gone`, `stamp-gone` FAIL 1 each | met |
| R-1 | K2 on `dist` legible; T-2 52/52; CORNER 5/5; W-E `dist-dev` 1/6 = `dist` | met (O-103) |
| R-2 | FACT 92/92 per flavour; W-D 8/8 · 8/8 | met |
| R-3 | T-6 33/33 · 33/33 with the kick spring named (`kick-spring` PASS); the `pop0` plant was last read in pass 9 (21/33) and is not re-run here, since D′ v9 does not touch the commit | met |
| R-4 · R-6 · R-7 | `states` hover **9/9 · 9/9**, a11y **6/6 · 3/3 (Playwright WebKit has no forced-colours emulation, as in pass 9)**; 16 px tiles and pills at h/2 (CORNER, T-1); CANON 4/4 with every plant failing; the canon unit fails A, S, H, I | met |
| R-5 | K2 2.66:1 light, 1.56:1 dark (reported) | met, reported |
| R-8 | T-2 52/52 on `dist`, `dist-dev`; CORNER 5/5; ATTACK 3/3; FACT 92/92 `dist` | met (O-103) |
| R-9 | 2,935,947 B, +16,890 | met (the rebind is Q-14's) |
| R-10 | SHEET PASS 2/2 on the clean builds; SHEET FAILs `foreign`, `var`, `esc`, `apply`, `static`, `ts`, `const` and the three lane plants; FACT 88/92 on `foreign`, `var`, `esc`, `apply`, `concat` (reached), both engines; the twin FAILs `const`, `static`, `ts`; `src` holds no second writer. L-6 and L-6b are coverage over code `src` does not hold | met (L-6 routed) |
| E-1 | every witness and probe gave a verdict in both engines; WebKit's absent Layout Instability API reads UNMEASURED, and the box, child and ResizeObserver reads measure the same property | met |
| E-2 | F1, V2, the sibling state, the interactive descendant (ATTACK `dist` 3/3), the keyed reorder, the deselectable single green; C1 T-3 3/3 · 3/3 | met |
| E-3 | SHEET `wrap` PASS at `MIGRATION.md:94-116`; the breaking note is one clause, no alias; the tone-sentence wording is info (§2.1) | met |
| E-4 | read under O-103 against this seat's Playwright WebKit run; real Safari UNMEASURED (owner's safaridriver checkbox) | met (O-103) |
| G | §3: card-like tiles (C1, preset frames: 16 px cards, perimeter), the selected pill unmistakable in light and dark, fine and coarse, both engines, without the weight; the ring a gap outside; flush at rest; no lighting layer; the commit carries state | met |

| block | met | not met |
|---|---:|---|
| T (8) | 8 | — |
| X (7) | 7 | — |
| FV (10) | 10 | — |
| R (10) | 10 | — |
| E (4) | 4 | — |
| G (1) | 1 | — |
| **total** | **40 / 40 (100 %)** | 0 |

**Clean, by §P9-6:** 40/40 on this seat's own instrument, with T-4 including the L-5 cell. No row was opened, added, struck or renamed, and no row was ruled PASS against its own instrument. CRIT10-GEOM's 4 WebKit cells are this seat's probe, not a row's instrument, and its diagnostic shows they are not selection's. New items are routed to §4. **Pass 10 is the BUILD pass, so its clean is recorded and does not count toward convergence.** Passes 11 and 12, confirmations on D′ v9 (`538b034c`, post-apply `80ab066d`) and H9 (`932637d53662`), decide it. **Verdict: ADVANCE.**

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.

---

## 6 · Run hygiene

- `logs/chain.log` ends `CHAIN-DONE` (07:35:06), `CHAIN2-DONE` (09:11:00), and the `states` run's `CHAIN2-DONE` (09:37:44). Every Playwright WebKit hold exited 0, and none was cancelled. **Hold E queued 2 h 8 min 39 s** (05:04:06 → 07:12:45) behind other seats' WebKit runs and was waited out.
- Every plant was restored and checked by `plants.mjs state` (`git diff HEAD` `80ab066d67f8`, status `9a89e9747069`, `guard.ts` `53c233af`, `shape.ts` `9455d073`), and it read equal after every plant (`plant-builds.log`, `crit-css-plants.log`, `crit-l5-plants.log`). `unit.mjs` checked its own restores. The worktree read `80ab066d…`, `9455d073`, `53c233af` before removal.
- **`plant-builds` stage exit code.** The chain logged `exit 1` for it, while its log is complete, ends `exit 0`, and shows every plant restored equal. That stage ran while this seat rewrote `run-crit10.sh` in place, and zsh reads a script as it runs. Every later edit was swapped in as a new file.
- **Smoke runs** (`logs/smoke/`) preceded the chain: the A10 build, and two `crit10-geom --quick` runs. The first carried a probe fault: F1's row scrolls itself, and the read did not add the scroller's offset. It was fixed before the chain, and is cited by nothing. Also `crit10-carrier` and `crit10-prt-tint` in Chromium.
- **A fence slip, this seat's own:** while waiting on the WebKit lock, it ran `ls ~/.claude/guard/` and a failed glob there, listing only the directory. No file under `~/.claude` was read, and nothing was written there.
- `run-json.tgz` holds the run JSON (229 files).
- **Scratch removed:** the worktree read `git diff HEAD` `80ab066d67f8` just before `git worktree remove --force` (rc 0; `git worktree list` no longer shows it), and `rm -rf .claude/worktrees/bl/D4/p10/crit10/` succeeded (rc 0). The BUILD seat's `p10/build10/` remains; it is not this seat's to remove.
- Checkout writes: this file and `pass-10/D4-Dp10-crit/` only. No tracked source was edited, and the only git writes were `worktree add` and `worktree remove`.
- No browser, server or guard of this seat's is left running.
