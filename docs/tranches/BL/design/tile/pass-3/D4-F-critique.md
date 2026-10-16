# D4 · pass 3 · D4-F · critique: the anatomy declares the tile, on floor v2

| field | value |
|---|---|
| seat | D4-F adversarial critic, pass 3. Did not author the route. Re-ran every number the prototype scores on, attacked the route's claims with consumer compositions the battery does not render, and scored the route on the fixed 40-row checklist (REGISTRY §P2-6.3) only. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | HEAD `349e1cdd`, detached worktree at `.claude/worktrees/bl/D4/p3/D4-F-crit/wt` (node_modules symlinked; removed with `git worktree remove --force` before return). `git diff --stat a36fe2be 349e1cdd -- src tests demo package.json MIGRATION.md` is empty, so this is the prototype's source. `floor-v2.patch` (sha1 `b04a83be`) applied, then `D4-F-proto.patch` (sha1 `7313c674`), both `--check` clean. Source hashes at build equal the prototype's `src-at-build.sha1` byte for byte (`logs/src-at-build.sha1`) |
| harness | H3 + the BL WebKit lock, **`24182288e414`**, in every run JSON. No MIXED flag. No file under `../harness/` was edited |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, playwright imported from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every heavy stage ran under `~/.claude/guard/guarded`. The build waited 1 h 50 min for headroom (load 60-125). The browser stages then ran as one guarded chain, 19:03 → 20:17, at 1-min load **9-47**. Commit cells' median frame 8.30 ms (Chromium) and 10.00 ms (Playwright WebKit). No cell was janky, so none needed a re-run. **0 stalls.** Playwright WebKit retired its browser at the 60-navigation cap 1-2× per witness (T-1, T-3, T-4, T-6 notes) |
| records | `pass-3/D4-F-crit/`: `run-crit.sh` (the prototype's driver with stages re-pointed here, labels `f3c-*`); `logs/` (every log; the first and last lines carry the load); `runs/f3c-src/` (27 battery JSON), `runs/f3c-dist/`, the probe JSON; `shots/` (40 PNG from `f3.mjs`); **this seat's attack**: `attack-route/` (`route.json`, `migrated.mjs`: four consumer compositions mounted as migrated arms) and `probes/attack.mjs` |

Citations: `Fs` / `Fp` are `D4-F-spec.md` / `D4-F-proto.md`; `K/` is `pass-3/D4-F-crit/`.

---

## 0 · In brief

1. **Every number the prototype scores on reproduced, cell for cell, at a lower load than the prototype's.** This covers the battery, the `dist` cells, the shared probes, the names, the route probes, the CANON plants and the bundle (§1). Migrated arm, Chromium · Playwright WebKit:

   | witness | migrated arm |
   |---|---|
   | T-1 | 15/15 · 18/18 |
   | T-3 | 40/43 · 40/43 |
   | T-4 | 24/24 · 24/24 |
   | T-5 | 38/38 · 38/38 (`dist` 38/38 · 38/38) |
   | T-6 | 33/33 · 33/33 |
   | T-7 | 24/24 · 24/24 |
   | T-8 | 27/27, one run |

   On the library arm: T-2 40/40 · 40/40 on `src` and on `dist`, CANON 3/3 · 3/3.
2. **Two rows the prototype scored PASS do not pass on the shared instruments.**
   - **FV-2, the pill's one-row law.** The row's own wording is "keeps line breaks and **block children** inside a pill's label on one row". The shared `late` probe appends a `<span style="display:block">` inside the label. On production **`dist`** it paints **3 text rows inside a 36.00 px stadium** (`single`) and a 40.00 px one (`pill-badge`), silent, in both engines: **2/6** (`K/logs/shared-crit-late-dist.log`). This is not a new defect class. It is REGISTRY §P2-0 finding 2's CX-1 class, "a block child inside the label", which FV-2 was written to close. The prototype ruled the row PASS on its H3 witness while the shared instrument read 2/6. P2-6.3 forbids exactly that.
   - **E-3, MIGRATION claims.** Two MIGRATION claims are falsified, both measured:
     - The route's claim: "A group whose items fill neither slot is pills". A composition whose `#meta` holds only an optional `v-if` row fills nothing, yet it turns the whole group into tiles: 5 empty, 0 px `.toggle-group__meta` rows, `--selection-tile: flush`, a 16.00 px corner on 48.94 px items, a column, and the perimeter and mark on. That is **4/4 cells**: light and dark, both engines, on `src` and `src-dev` (`K/logs/attack-src.log`).
     - The pill clause: "a pill is one row" is falsified by the `late` cell above.
3. **Score: 32 / 40 (80 %).**
   - Eight rows are open: T-3, E-2, R-1, R-8, G, E-4, FV-2 and E-3.
   - Six of them wait on an owner input and are built at their defaults: Q-10, Q-5, Q-2/Q-3 and the checkbox.
   - FV-2 is floor-owned, read under the route, and its cure belongs to the floor and Q-5.
   - E-3 is route-owned and has a small in-route cure (§4).
   - **Not CONVERGED.** E-4 alone forbids convergence in pass 3.
4. **The prototype's open question P-2 is answered: it is not the route.** The banked control (`story-webkit.mjs`) crashes Playwright WebKit on the two pages the route does not touch (`/forms/inputs`, `/forms/slider`) exactly as on `/forms/toggle`. That is 6/6 opens, each "Page crashed", at load 19 (`K/logs/story-webkit.log`). The crash belongs to the dev-served demo in Playwright WebKit, not to the tile. E-1 stands.
5. **Verdict: ADVANCE.** The route's own residue is one row with a small cure (E-3: render a row only when its slot yields content). The rest is the floor's (FV-2, shared with D′) or the owner's.

---

## 1 · Re-run: what reproduced

Battery `K/logs/battery-src.log`, 19:04:03 → 19:48:52. Tally: `node ../harness/tally.mjs D4-F-crit/runs/f3c-src`.

| witness | Chromium [arms] | Playwright WebKit [arms] | load at start (C · W) | equals `Fp` §2.2 |
|---|---|---|---|---|
| T-1 | 20/42, 12 UNMEASURED [**migrated 15/15** · library 5/27 · unmigrated 3/6] | 23/45, 12 UNMEASURED [**migrated 18/18** · …] | 24.24 · 15.46 | yes |
| T-2 | **40/40** | **40/40** | 14.38 · 13.89 | yes |
| T-3 | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 12/48] | 42/85 [**migrated 40/43** · unmigrated 9/48] | 12.83 · 11.77 | yes |
| T-4 | 36/54 [**migrated 24/24** · library 12/30 · unmigrated 3/24] | the same | 9.23 · 10.50 | yes |
| T-5 | 87/116 [**migrated 38/38** · library 49/78 · unmigrated 20/37] | the same | 10.85 · 11.97 | yes |
| T-6 | 64/88 [**migrated 33/33** · library 31/55 · unmigrated 34/48] | the same | 25.91 · 21.04 | yes |
| T-7 | **24/24** [migrated 24/24 · unmigrated 4/32] | **24/24** | 19.63 · 20.37 | yes |
| T-8 | 27/39, 13 UNMEASURED [**migrated 27/27** · library 0/12], one run; Safari UNMEASURED (owner's safaridriver checkbox) | | 26.10 | yes |
| W-A · W-B · W-C · W-D · W-E | 5/9 · 9/25 · 0/8 · 4/8 · 1/3 | the same | 25-46 | yes |
| CANON | **3/3** | **3/3** | 30.89 | yes |

The cells the score rests on, from `K/runs/f3c-src/`:

- **T-3 misses.** `c1-migrated` reads 0.00 px² against 224 in light, dark and PRT, in both engines (fill 1.16 / 1.22 / 1.00:1). Shipped K1 `preset-verbatim` reads 0.00 / 233.00 / 0.00 px² against 248 in Chromium and 0.00 / 217.00 / 0.00 in Playwright WebKit.
- **T-6 commits on `preset-migrated`, Chromium · Playwright WebKit:**
  - keyboard 1.03 at 88 / 77 ms;
  - programmatic 1.03 at 83 / 82 ms;
  - calm-observer programmatic 1.03 at 77 / 83 ms;
  - pointer 1.04 at 129 / 115 ms.

  Every one has a trough and a settle.
- **T-6 hover (H3-5)** on `preset-migrated`: ΔE 0.0947 · 0.0953, PRM the same, PRT 0.0332 · 0.0309, against 0.02.
- **`dist`** (`K/logs/battery-dist-*.log`):
  - T-5 88/117 [migrated 38/38] in both engines;
  - `tabs-retired` refused (`TypeError: [SegmentedTabs] semantics="toggle" is not one of …`);
  - `preset-input` keeps ArrowRight in the `<input>`;
  - `preset-consumer-aria` reads `radiogroup` / `radio` with 1 tab stop;
  - T-2 40/40 · 40/40.

**Probes**, all on this seat's builds:

| probe | reading | log, load |
|---|---|---|
| shared `tone` (X-7) | **24/24** | `shared-crit-tone.log`, 17.2 |
| shared `desc` (X-5), `src-dev` | **2/2** | `shared-crit-desc.log`, 16.8 |
| shared `x3` · `x6` | **4/4** · **2/2** | 16.5 · 17.2 |
| shared `plants` (kick0, perim0, perim0mark0, pill) | **76/76** fail as planted | `shared-crit-plants.log`, 21.0 |
| shared `br`, `dist` | **8/8** | `shared-crit-br-dist.log`, 18.1 |
| shared `late` | **2/6** on `src-dev`, `dist-dev` **and `dist`** (§2.1) | `shared-crit-late-*.log`, 14.2-16.8 |
| floor `names`, 4 flavours | **4/4** each: silent on `src` and `dist`, named on `src-dev` and `dist-dev` | `floor-names-*.log`, 19.4-26.7 |
| `f3.mjs` (flip, mark, occlude, rest, ring, nest) | **26/26**; occlusion K1 0.0 %, K2 8.3-11.4 %, V2 48.6-49.5 %; flush rest ΔE 0.0000 | `probe-src.log`, 15.0 |
| `f3.mjs --only unmig` on `dist` | K2 `specimen` and `specimen-verbatim`: **8/8 items past the plate, up to 50.92 px (Chromium) and 51.14 px (Playwright WebKit), 0 lines**; K1 one row, 3/4 · 2/4 ellipsized | `probe-unmig-dist.log`, 15.2 |
| `p3.mjs` (stack, forced, settle, cost) | **26/26**; forced mark 19.04:1 (Chromium) and 10.54:1 (Playwright WebKit); `:has()` cost ratio of minima 0.99 (Chromium; Playwright WebKit 0.0 ms on both arms, so UNMEASURED by this clock) | `probe-p3.log`, 14.3-16.1 |
| `p3.mjs --only stack`, `dist-dev` | **22/22** | `probe-p3-stack-dist-dev.log`, 10.6 |
| pass-2 `probe.mjs` (q2, q3, q5, hover, ink, double, contrast) | **114/114** | `proto-probe-src.log`, 17.0 |
| CANON plants | A 2/3, S 2/3, H 1/3, **both engines**: each fails as planted | `canon-plant-*.log`, 17.0-19.1 |
| `story-webkit.mjs` (P-2's control) | `/forms/inputs`, `/forms/slider` and `/forms/toggle`: **6/6 opens "Page crashed"** in Playwright WebKit | `story-webkit.log`, 19.1-19.2 |
| bundle (`floor-v2/probes/bundle.sh`) | **2,936,130 B** unpacked, 843 files; `dist` 2,545,131 B; JS gzip-9 330,540 B; +17,073 over the datum 2,919,057 | `bundle.log`, 21.6-23.8 |

---

## 2 · Attacks

### 2.1 · The pill's one-row law against a block child in the label (FV-2, E-3, R-8)

`K/logs/shared-crit-late-dist.log` (production `dist`, load 14.2-14.4):

```
FAIL chromium late single [dist] · rung 36.00 · item 98.63×36.00 9999px row · label 30.94 px tall, text rows 3, rows painted inside the plate 3 (NOT refused …) · [ToggleGroupItem] errors 0
FAIL webkit   late pill-badge [dist] · rung 40.00 · item 146.36×40.00 9999px row · label 35.13 px tall, text rows 3, rows painted inside the plate 3 (NOT refused …) · errors 0
```

The development flavours read the same paint, now with one name each (`errors 1`, R-13).

- **Why H3's T-2 passes and this does not.** T-2's block case is a UA `div`, which `.pill-row`'s zero-specificity `:where()` makes inline. A child that sets its own `display: block` (inline style or a utility class) outranks it. `FLOOR-V2.md` §1 FV-2 says so: "A class that sets a display … keeps it."
- **Why it is scored, not deferred.** The row's text is "keeps line breaks and block children inside a pill's label on one row". REGISTRY §P2-0 item 2 names this exact class: "a `<br>` or a block child inside the label". The prototype recorded it as a new class for pass 4 (`Fp` §6 P-1). It is the CX-1 class, and FV-2 is the row written to close it.

### 2.2 · Empty anatomy makes tiles (E-3)

`attack-route/migrated.mjs` `c1`, a generic option list whose `#meta` holds a hint only when one exists:

```vue
<ToggleGroupItem v-for="o in STATUSES" :key="o.value" :value="o.value">
  <span>{{ o.label }}</span>
  <template #meta><span v-if="o.hint" class="text-micro">{{ o.hint }}</span></template>
</ToggleGroupItem>
```

No status has a hint. `ToggleGroupItem.vue` renders the row on `v-if="$slots.meta"`, so it tests that the slot function exists, not that it yields content. Each item gets an empty `.toggle-group__meta`. `:has()` matches it, and the whole set becomes tiles.

`K/logs/attack-src.log`, `attack-src-dev.log`, load 21.5-26.4:

```
FAIL empty · c1-migrated light · 5 .toggle-group__meta rendered, 5 empty and 0 px tall · group --selection-tile flush · item 184.00×48.94, corner 16.00 px (h/2 24.47), flex-direction column · selected perimeter opacity 1, mark opacity 1
```

The result is **4/4** per build: light and dark × Chromium and Playwright WebKit, the same on `src-dev`. The text is one row, but the corner is 16 px at 0.65 of h/2, and the items carry a column, the perimeter and a check. Under F's own contract these options should be pills.

MIGRATION.md (patch line 642) says "A group in which any item **fills** either slot is a set of tiles … A group whose items fill neither slot is pills". The spec says "each slot renders only when filled" (`Fs` §1.1). Both are falsified.

The cure is in-route and small: render each row only when the slot's vnodes contain something other than comments or empty text. Vue's own pattern is to filter `Comment` and blank `Text`.

### 2.3 · Consumer attributes under `inheritAttrs: false` (R-9, H3-12): holds

`attack-route` `preset`: each tile carries a consumer `class`, `style`, `data-*`, `aria-label`, `role="option"`, `tabindex="0"` and `@click`. A pointer click on item 0:
- the consumer handler ran once;
- `aria-checked` is `true` and `role` stays `radio`;
- the class, style, `data-consumer` and `aria-label` all landed;
- there is 1 tab stop.

That is PASS in both engines on `src` and `src-dev` (4/4). `mergeProps` keeps the consumer listener beside the engine's, so the route's claim "every other attribute still lands on the button" holds.

### 2.4 · Reported, not scored

- **Nesting turns an outer pill group into tiles.** `attack-route` `v2`: a pill group with no anatomy whose children include a wrapper holding a one-item tile group. The outer items read `--selection-tile: flush`, a 16.00 px corner at h 79.88 and a column, in both engines (`attack-*.log`). `f3.mjs` `nest` reads the same, 4/4. The selector's descendant combinator, `.toggle-group:has(.toggle-group__item > …)`, reaches any nested item. No battery scene renders this. It is `Fs` R-4, and here it is measured: **recorded for pass 4.** Spelling the match as `:has(> .toggle-group__item > …)` would not cover K2's `<section>` wrappers, so the cure needs a scope boundary such as `@scope (.toggle-group) to (.toggle-group)`, and in turn a measurement.
- **A superscript in a pill is not a false name.** On `strip-migrated`, "m<sup>2</sup> …" gives 0 names on 6 items on `src-dev` in both engines. R-13's row counter does not misfire on a raised box (`attack-src-dev.log`).
- **The mark on light media in dark mode.** `K/shots/chromium-v2-migrated-dark-selected.png`: the disc of `--selection-edge`, near white in dark, sits on Moss's `#ecfccb` swatch, and the check nearly vanishes. `f3.mjs` measures V2 occlusion at 48.6-49.5 %. This is G-row evidence (§3 G), not a new row.

---

## 3 · The fixed checklist (REGISTRY §P2-6.3), row by row

Readings are this seat's, Chromium · Playwright WebKit. A row that waits on an owner ruling is built at its default and marked **OPEN**, never passed by ruling.

### T (8): 7 pass

| row | instrument · reading | status |
|---|---|---|
| T-1 | migrated 15/15 · 18/18 at fine, coarse and `--ui-scale 1.25` | PASS |
| T-2 | 40/40 · 40/40 on `src` and `dist` (H3-3, H3-6) | PASS |
| T-3 | migrated 40/43 · 40/43: `c1-migrated` 0.00 px² vs 224 in 3 modes; shipped K1 0 / 233 / 0 vs 248 | **OPEN** (Q-10; shipped arm Q-5) |
| T-4 | migrated 24/24 · 24/24; forced ring 2.00 px every side (H3-8) | PASS |
| T-5 | migrated 38/38 · 38/38 on `src` and `dist`; consumer-aria `radio`, 1 stop; `tabs-retired` refused | PASS |
| T-6 | migrated 33/33 · 33/33 (§1) | PASS |
| T-7 | 24/24 · 24/24 | PASS |
| T-8 | migrated 27/27 across both engines; Safari is E-4's | PASS on two engines |

### X (7): 7 pass

| row | reading | status |
|---|---|---|
| X-1 | `preset-sibling-migrated` inside T-3's migrated 40/43, which fails only C1 | PASS |
| X-2 | pass-2 probe `ink` inside 114/114 | PASS |
| X-3 | shared `x3` 4/4 | PASS |
| X-4 | `v2-migrated` passes T-1, T-3 and T-7 | PASS |
| X-5 | shared `desc` 2/2; `names` named on both development flavours, silent in production | PASS |
| X-6 | shared `x6` 2/2 | PASS |
| X-7 | shared `tone` 24/24 (edge, tint and label ink each move) | PASS |

### FV (10), read under the route: 9 pass

| row | reading | status |
|---|---|---|
| FV-1 | Playwright WebKit read every T-6 and T-7 pointer cell; perimeter plants 76/76 | PASS |
| **FV-2** | T-2 40/40, but shared `late` **2/6 on `dist`**: a block child in the label stacks 3 rows inside a 36.00 / 40.00 px stadium, silent, both engines (§2.1) | **FAIL** (floor; the refusal half is Q-5's) |
| FV-3 | T-6 keyboard, programmatic, calm-observer and pointer commits pop and bounce; `kick0` plant bites | PASS |
| FV-4 | as X-7 | PASS |
| FV-5 | `contrast` inside 114/114 (1 px border and perimeter under contrast-more and forced colours) | PASS |
| FV-6 | `q2` (mixed 2×2, centred unequal row) inside 114/114 | PASS |
| FV-7 | `names` 4/4 × 4 flavours; `stack` 22/22 on `dist-dev`; late content re-checked and named | PASS |
| FV-8 | hover ΔE 0.0947 · 0.0953, PRT 0.0332 · 0.0309 (bar 0.02) | PASS |
| FV-9 | flush rest ΔE 0.0000 from the host; `plated` one value away (built `f3cp-src`) | PASS as a mechanism (Q-2 picks the arm) |
| FV-10 | the route adds no public value; `tabs-retired` refused on `dist` | PASS |

### R (10): 8 pass

| row | reading | status |
|---|---|---|
| R-1 | K1: one row, nothing past the plate, no selection in light or PRT (T-3). **K2: 8/8 items cut up to 50.92 / 51.14 px, 0 lines on `dist`.** As the D′ critic ruled, the legibility half fails whatever Q-5 rules | **OPEN** (Q-5; K2 legibility) |
| R-2 | the flip in `f3.mjs` (pill ↔ tile on adding and removing a `#meta` row) and `q3` 10/10 | PASS |
| R-3 | T-6 33/33 · 33/33, three sources, Tab entry still; `kick0` bites | PASS |
| R-4 | selected against a hovered sibling, inside 114/114; PRT hover 0.0332 · 0.0309 with T-3 PRT green | PASS |
| R-5 | `ink` 12/12; the dark stroke contrast is the spec's token computation (12.18:1), unchanged by the patch | PASS |
| R-6 | T-1 migrated; `q5` 46/46 inside 114/114 | PASS |
| R-7 | CANON clean 3/3; plants A 2/3, S 2/3, H 1/3, both engines | PASS |
| R-8 | names on the development flavours only; `late` silent on `dist` | **OPEN** (Q-5) |
| R-9 | 2,936,130 B, +17,073 over the datum, re-measured | PASS as a stated datum (Q-14 rebinds) |
| R-10 | one selector sets the fact; the dev check reads the computed fact; CANON reads one tile rule. The §2.4 nesting reach is the one spelling reaching too far, not a second spelling | PASS |

### E (4) and G (1): 1 pass

| row | reading | status |
|---|---|---|
| E-1 | every battery and `dist` cell read in both engines, 0 stalls, 0 HARNESS ERROR; the story crash is demo-wide in Playwright WebKit (6/6 opens, controls included) | PASS |
| E-2 | F1, V2, sibling, interactive descendant on `dist`, keyed reorder and deselectable single pass; **C1 T-3 0/3** | **OPEN** (Q-10) |
| **E-3** | "A group whose items fill neither slot is pills": falsified 4/4 (§2.2). "A pill is one row": falsified by `late` on `dist` (§2.1) | **FAIL** (route; floor for the pill clause) |
| E-4 | UNMEASURED (owner's safaridriver checkbox) | **OPEN** |
| G | `K/shots/`. Card-like at 16 px. A focused selected tile shows two concentric outlines (`chromium-preset-migrated-light-focused-selected.png`: the 2 px perimeter, then the ring 2 px out). The check washes out on a pale swatch in dark (`chromium-v2-migrated-dark-selected.png`). The commit is a 3-4 % pop with no travel. No lighting layer is added (O-87 holds) | **OPEN** (Q-2, Q-3) |

**Tally: 7 + 7 + 9 + 8 + 1 = 32 / 40 (80 %).** The prototype claimed 34. The two rows struck are FV-2 and E-3.

---

## 4 · What separates F from CONVERGED

| row | owner | cure |
|---|---|---|
| E-3 (empty anatomy) | **route** | render `.toggle-group__media` / `__meta` only when the slot yields non-comment, non-blank vnodes; a unit case with `<template #meta><span v-if="false"/></template>` and a plant |
| FV-2 / E-3's pill clause | floor (D′ inherits it equally) | the label's children held inline against a self-set `display` (`display: inline !important` on `.pill-row` descendants other than graphics and Badge), or a structural `1lh` per label at the cost H3 records as CUT. Q-5 decides whether production refuses or only development names |
| T-3, E-2 | owner, Q-10 | — |
| R-1, R-8 | owner, Q-5 | K2's cut is legible only after migration |
| G | owner, Q-2 / Q-3 | the focused-selected double outline; the mark on light media in dark mode |
| E-4 | owner, the safaridriver checkbox | — |

**For pass 4** (new classes, not scored):
- Nesting reach: an outer pill group becomes tiles (§2.4).
- The mark's legibility over light media in dark mode: there is no witness, and occlusion is only reported.
- Playwright WebKit crashes the dev-served demo on every page tried. That is a harness or demo cell, not the route.

---

## 5 · Fence notes

- No tracked source in the checkout was edited, and no git write ran beyond `git worktree add` and `git worktree remove --force`. The worktree and the scratch out-root under `.claude/worktrees/bl/D4/p3/D4-F-crit/` are removed.
- Writes in the checkout are this file and `pass-3/D4-F-crit/` only.
- One slip, self-reported. The CANON plant runs were invoked without `--out`, so `canon.mjs` wrote its JSON to the OS temp dir (`$TMPDIR/tile-harness/runs/f3c-src/`). The logs carry the tallies, and the temp copy was deleted.
- Every heavy run went through `guarded`. Real Safari is UNMEASURED (owner's safaridriver checkbox) in every cell.
