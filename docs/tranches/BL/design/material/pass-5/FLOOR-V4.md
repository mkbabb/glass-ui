# D3 · pass 5 · FLOOR V4: floor v3 + R-6, measured under H5

| field | value |
|---|---|
| seat | D3 pass 5, floor v4 (`REGISTRY.md` P4-6.2 step 2). Confirm `[data-highlighted]` coverage of every `.glass-menu-row` composer, build R-6 on `pass-4/floor-v3.patch`, run the full H5 battery once in both engines with R-6's plant, run the toolchain, and score the same 44 rows |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `789142bb7` at the patch check; the worktree was cut at `e848c2487`. `git diff --stat f6abfaab HEAD -- src demo tests package.json scripts` prints nothing, so this seat measures the source H5 measured (and pass 4's critic before it) |
| patch | `floor-v4.patch` (84 files, +928/−2263) = `pass-4/floor-v3.patch` + `floor-v4-R6.diff` (6 files, +57/−35). `git apply --check floor-v4.patch` is clean at `789142bb7` and again at `3a9fcc163` (the HEAD at teardown; its source diff from `f6abfaab` is empty too). Composition: HEAD + `floor-v3.patch` + `floor-v4-R6.diff` gives the worktree byte for byte (`git diff HEAD --binary --full-index`, `cmp`) |
| owner rulings | **None has arrived on Q-1, Q-3, Q-11 (chrome or content clause), Q-12 or Q-13.** `audit/INBOUND.md` still ends at O-98 (value.js contrast-floor producer rows; placement owed, no D3 ruling). `FORMATION-PROGRESS.md`'s last D3 line is the pass-4 close and the pass-5 launch. The defaults apply: Q-1 (a), Q-3 (a), Q-11 (a) chrome with content REPORTED, Q-12 (a), Q-13 (a). So no owner option is selected from the pass-4 variants (`fv3/q1c.*`, `fv3/q11b.*` stay unapplied) |
| R-8 | **Not known yet.** The minor split v3 seat (P4-6.2 step 3), which runs R-8's radius search, comes after this seat and has not run. Floor v4 keeps floor v3's blur ladder unchanged. If the search moves it, floor v4 takes the ladder and re-reads M-2, M-8 and T then |
| engines | Chromium 149 gated. **Playwright WebKit 26.5** informational (no `backdrop-filter`; dock rows `+shim`). **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| records | `FV4-records/` (every log with its load); `FV4-run.sh` (every phase's command); `FV4-wk-inner.sh` (the WebKit work under one exclusive admission); `FV4-hover-probe.mjs` (the coverage and paint probe); `FV4-glance-pair.mjs`; `glance-fv4/` |
| fences | No tracked source edited in the checkout, no git write in it beyond `git worktree add`/`remove` for `.claude/worktrees/bl/D3/p5/floor4/wt`. The worktree's `node_modules` was a real directory of per-entry symlinks into the checkout's (dot caches left out), so every vite and vitest cache, every build and every capture lived inside the worktree (`$W/.d3out`, `$W/dist`, `$W/dist-demo`). The only checkout writes are under `docs/tranches/BL/design/material/pass-5/`. Nothing ran in a sibling repo |
| machine law | Every build, probe, capture and test run went through `~/.claude/guard/guarded`, every Playwright WebKit run also through `--exclusive webkit`, one heavy run at a time, vitest `--maxWorkers=2`. The WebKit lock held the battery about 20 min (queued 15:52:58, its capture ended by about 16:31) and the WebKit re-runs 16 min (16:41:22 → 16:57:17). The heavy queue never held a run 30 min, so no `--light` fallback was used. The kernel zone refusal never fired. Nothing is left running |

---

## 1 · The precondition: `[data-highlighted]` on pointer movement, per composer

R-6 lets the menu row's fill reach paint only through `[data-highlighted]`, so before building, every composer of `.glass-menu-row` must be highlighted by pointer movement. `grep -rn glass-menu-row src demo` finds seven composers: six library rows and one demo story.

**Static evidence (reka-ui 2.10.1, `node_modules/reka-ui/dist`):**

| composer | reka primitive | how pointer movement highlights it |
|---|---|---|
| `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem` | `MenuItem` → `MenuItemImpl` | `Menu/MenuItemImpl.js:38-50`: `onPointermove` (mouse only, `Menu/utils.js:63`) sets `contentContext.highlightedElement` to the row and focuses it; `:70` `data-highlighted` = `isFocused` or the highlighted element; `handlePointerLeave` clears it |
| `DropdownMenuSubTrigger` | `MenuSubTrigger` → `MenuItemImpl` | the same `MenuItemImpl` handlers, merged with the sub-trigger's own open-timer handler (`Menu/MenuSubTrigger.js:53-64`, `:120-140`) |
| `SelectItem` (`rowClass()`) | `SelectItem` | `Select/SelectItem.js:70-75`: `onPointermove` focuses the row (after `nextTick`); `:109` `data-highlighted` = `isFocused` |
| `CommandItem` (`rowClass()`) | `ComboboxItem` → `ListboxItem` | `Listbox/ListboxItem.js:82-85`: `onPointermove` calls `changeHighlight` when the root's `highlightOnHover` is on; `Combobox/ComboboxRoot.js:73-77` defaults it to **true**, and glass-ui's `Command.vue` forwards it untouched |
| `demo/stories/dock/dock-search.vue:231-241` (`li.dock-search-result.glass-menu-row`) | **none** (hand-written listbox) | `:data-highlighted` follows `fuzzy.selectedIndex` (keyboard) only; no pointer handler. **This composer does not receive it** |

**Measured** (`FV4-hover-probe.mjs`: a built app with every library composer, the mouse moved onto each row in 6 steps, computed style read after 700 ms):

| tree | engine | pointer → `[data-highlighted]` | record |
|---|---|---|---|
| floor v4 | Chromium | **22/22** (5 menu rows, 3 Select, 3 Command; light and dark) | `hover-fv4-chromium.log`, 16:01, load 23.5 |
| floor v4 | Playwright WebKit | **22/22** | `hover-fv4-webkit.log`, 16:57, load 14.2 |
| R-4 as built, literal R-6 | Chromium (and WebKit for R-4) | 22/22 each | `hover-r4-*.log`, `hover-r6lit-chromium.log` |

So every library composer is covered. Two limits are recorded, not cured. (1) reka's menu highlight is mouse-only (`pointerType === "mouse"`), so a pen hovering a menu row gets the lift and not the fill; Select's handler is not gated by pointer type. (2) A consumer that passes `:highlight-on-hover="false"` to `Command` opts its rows out of pointer highlight; those rows then get the lift only. The one uncovered composer, the demo's dock-search row, gets the hover leg R-6 prescribes for it (§2).

---

## 2 · R-6 as built, and the one place it departs from the ruling's wording

### 2.1 · The hunk (`floor-v4-R6.diff`)

**`src/components/_shared/menu/menu.css`** (the rules; the comments are in the diff):

```css
@media (hover: hover) {
    .glass-menu-row:hover:not([data-disabled]) {
        background-color: transparent;          /* was: background: var(--menu-row-bg); */
        translate: 0 var(--menu-row-lift);      /* kept: the pointer lift */
        transition: /* the attack list, unchanged */;
    }                                            /* color: var(--accent-foreground) dropped */
}

/* moved from above the hover block to below it, unchanged */
.glass-menu-row:focus:not([data-disabled]),
.glass-menu-row[data-highlighted]:not([data-disabled]),
.glass-menu-row[data-state="open"]:not([data-disabled]) {
    background: var(--menu-row-bg);
    color: var(--accent-foreground);
    transition: /* the attack list, unchanged */;
}
```

R-4 is kept as built: `--menu-row-bg: oklch(from var(--section-color-5) l c h / var(--fill-selected))`.

**The register text, narrowed** (R-6 (i)):
- `src/styles/tokens/color-radius.css:161` `--fill-selected: 0.12; /* state: persistent selection, and the menu's one highlighted row (_shared/menu/menu.css, an accent tint at this alpha, not the ink) — a bare :hover cannot mint it */`
- `src/components/card/styles.css:164` `/* Persistent state. --fill-selected (0.12) is the state rung: a bare hover cannot mint it (its one other reader, the menu's highlighted row, is state too). */`
- `menu.css`: the row "carries a highlight FILL" (was "a hover FILL"); the fill "is STATE" and paints only through the engaged group; the G7 guard's comment states that hover carries only the lift.

**The prose sweep's other finds, cured in the same diff:**
- `src/components/dock/styles/search.css:11,58` read "the glass-quiet hover-lift". That was true at HEAD and false since R-4 (the row is no longer on `--glass-plate-quiet`). Now: "the highlight fill and hover lift".
- `tests/styles/engage-ladder.test.ts:446` said the menu row "paints the hover fill and lift". Now: it "decides the hover paint … the lift, with the fill held at rest". Comment only; every assertion in the file is unchanged and green.

**The uncovered composer** (`demo/stories/dock/dock-search.vue`, scoped style; R-6: "a composer that does not receive it keeps a hover leg on the `--fill-hover` alpha"):

```css
@media (hover: hover) {
    .dock-search-result:hover:not([data-highlighted]) {
        background: oklch(from var(--section-color-5) l c h / var(--fill-hover));
    }
}
```

That is demo CSS, with no token or published name added. Its paint is **not measured** by this seat (the probe builds library composers only), so it is owed to the critic.

### 2.2 · The departure: R-6's wording leaks a grey fill, so floor v4 holds it

R-6 says `:hover` "drops its `background` and `color` legs … The fill then reaches paint only through `[data-highlighted]`". Built literally, the second sentence is false. Every library row also composes `.interactive-item`, and `utilities/base.css`'s guarded `.interactive-item:hover` paints `background-color: color-mix(in srgb, var(--accent) 50%, transparent)` (`--accent` = `--neutral-3`) in the same layer. `menu.css`'s hover rule used to override it; with the legs dropped, it shows through on any row that is hovered and not highlighted. The common case is the pointer resting on one row while the keyboard moves the highlight to the next.

Measured with the probe's `parked` step (pointer on row 0, then ArrowDown) and its `bare` row (a lone `.interactive-item.glass-menu-row` that no reka primitive drives):

| tree | parked rows (hovered, not highlighted) painting a fill | the fill | bare hover | records |
|---|---|---|---|---|
| **R-4 as built** (floor v3) | **6/6** Chromium · **6/6** Playwright WebKit | the state rung: light `oklch(0.53 0.124 69.6 / 0.12)`, dark `oklch(0.813 0.109 78.2 / 0.12)`: two rows wear the selected fill | the state rung | `hover-r4-chromium.log` (16:00, load 20.1), `hover-r4-webkit.log` (16:58, load 15.3) |
| **R-6 literal** (legs dropped only) | **6/6** Chromium | `.interactive-item:hover`: light `color(srgb 0.875 0.824 0.765 / 0.5)`, dark `color(srgb 0.259 0.220 0.180 / 0.5)`, a beige-grey | the same grey | `hover-r6lit-chromium.log` (15:25 and 16:01, load 9.8 / 24.4) |
| **floor v4** (R-6 + the hold) | **0/6** Chromium · **0/6** Playwright WebKit | none (`rgba(0, 0, 0, 0)`); the row keeps its −1 px lift | none | `hover-fv4-chromium.log` (16:01, load 23.5), `hover-fv4-webkit.log` (16:57, load 14.2) |

On every pointer row in floor v4 (hovered and highlighted) the state fill paints: 11 × `oklch(0.53 0.124 69.6 / 0.12)` light and 11 × `oklch(0.813 0.109 78.2 / 0.12)` dark in Chromium, the same in Playwright WebKit. So D-2 is unchanged for the pointer.

**The hold** has two parts, with no new token or name. The hover rule declares `background-color: transparent` (the row's own resting value), and the hover block moves **before** the engaged group. Both selectors are 0-3-0, so on a row that is hovered and highlighted the later engaged rule paints the state fill. Without the move, the hold would erase the pointer's fill. This is what makes R-6's stated outcome true ("the fill reaches paint only through `[data-highlighted]`"). The literal wording would have replaced one hover-minted fill (the amber state rung) with another (the grey that O-62 rules out). The literal variant stays on the record as the hold's plant: `plant-r6-literal.diff` (over floor v4's `menu.css`; floor v4 + it is the plant tree's `menu.css` byte for byte). The critic should judge the departure; the agglomerate can ratify it or rule otherwise.

---

## 3 · R-6's plants: rows 20 and FL-12

| plant | HOV (H5-3, static) | the prose sweep (`grep "hover cannot mint\|rung hover cannot\|hover FILL\|glass-quiet hover-lift"`) | the probe (parked) |
|---|---|---|---|
| **R-4 as built** (floor v4 with `floor-v4-R6.diff` reversed) | **FAIL 1/58**: `menu.css:72 .glass-menu-row:hover:not([data-disabled]) { background: var(--menu-row-bg) } · --menu-row-bg (menu.css:15) ← --fill-selected` (`HOV-plant-r4.log`) | **5 false sentences**: `color-radius.css:161`, `card/styles.css:164`, `menu.css:3` ("a hover FILL"), `search.css:11`, `:58` | 6/6 rows paint the state rung |
| R-6 literal (`plant-r6-literal.diff` over floor v4) | PASS 58 (it no longer paints the rung on hover) | 0 false (the one hit is the narrowed text) | **6/6 rows paint the grey** (§2.2), the hold's plant |
| **floor v4** | **PASS 58** (`HOV-fv4.log`; built on `--fill-selected`: the same eight properties H5 read, no `:hover` paints one) | **0 false**. One hit, `color-radius.css:163` "a bare :hover cannot mint it", the narrowed text, which HOV now makes true | 0/6 |

Static checks read a tree, not paint, so they hold for every engine (`plants-static.log`). In the battery, `baseline.mjs` prints HOV PASS 58 in all four columns.

---

## 4 · The battery: floor v4 under H5, both engines

### 4.1 · Runs and loads

| run | when | capture | load (1-, 5-, 15-min) |
|---|---|---|---|
| build + Chromium half (`FV4-run.sh battery-cr`) | 15:34:04 → 15:52:36 | specimen CSS 391,121 B (floor v3: 391,167; −46 B). 70 cells, 4 live, 4 motion, 2 drift windows in 884.7 s; 3 retunes at 25.1-25.4 s; `noclaim` 80.4 s | 10.0 / 10.4 / 10.4 at start; 26.4 / 22.3 / 16.7 at the capture's end; 22.6 / 25.4 / 19.6 at the end |
| Playwright WebKit half (`battery-wk`) | queued 15:52:58, lock about 16:13, ended 16:34:35 | 70 cells, 4 live, 4 motion, 2 drift windows in 897.8 s; retunes 27.4-27.7 s; `noclaim` 83.1 s. Retired once at 60 page loads, 0 stalls, 0 crash cells. The unshimmed probe crashed on `GlassDock` in both themes (`page.goto: Page crashed`), as H-14 records | 22.9 / 20.0 / 18.2 at the capture's end; 25.8 / 24.8 / 21.0 at the end |
| witnesses, baseline, readings | 16:34:50 → 16:41:03 | — | 24.1 → 20.4 |
| Chromium re-runs (`rerun-cr`, twice) | 16:12:05 → 16:21:18 | held, ladder, dialog × black, white, aurora, paper | 13.3 and 11.0 at the reads |
| WebKit probe + WebKit re-runs (`FV4-wk-inner.sh`, twice) | queued 16:41:22, admitted 16:57:17, done 17:01:12 | ladder, dialog × checker, stripes, paper | 14.0 at admission; 20.0 and 20.6 at the reads |

### 4.2 · Per witness, engine and theme (`FV4-records/baseline-fv4.md`)

**`diff H5-records/baseline-fv3.md FV4-records/baseline-fv4.md` prints one row: HOV.** Every other row equals the pass-5 floor v3 baseline, which equals pass 4's.

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| RAW | PASS 24 | PASS 24 | PASS 24 | PASS 24 |
| M-1 | PASS 11 | — | PASS 11 | — |
| M-1x | REPORTED | REPORTED | REPORTED | REPORTED |
| M-2 | PASS 469 | PASS 469 | PASS 469 | PASS 469 |
| M-2m | PASS 215 | PASS 215 | PASS 215 | PASS 215 |
| M-2h | FAIL 1/34 (halo, N-3) | PASS 34 | PASS 34 | PASS 34 |
| M-3 | PASS 177 | PASS 177 | FAIL 2/177 (checker ring) | PASS 177 |
| M-4 | PASS 84 | PASS 84 | PASS 84 | PASS 84 |
| M-5 | PASS 10 | PASS 10 | PASS 10 | PASS 10 |
| M-6 (stepped text) | FAIL 16/16 | FAIL 11/104 | FAIL 16/16 | FAIL 11/104 |
| M-7 | PASS 4 | PASS 4 | PASS 4 | PASS 4 |
| M-8 | PASS 4 | PASS 4 | PASS 4 | FAIL 1/4 (stripes bleed 1.26) |
| M-9 | PASS 10 | PASS 10 | PASS 10 | PASS 10 |
| O-66 | PASS 3 | PASS 2 | PASS 3 | PASS 2 |
| STACK | PASS 12 | PASS 12 | PASS 12 | PASS 12 |
| W-A | PASS 108 | PASS 108 | PASS 108 | PASS 108 |
| W-S | PASS 12 | PASS 12 | PASS 12 | PASS 12 |
| T | reported | reported | reported | reported |
| LIT (H5-2) | REPORTED | REPORTED | REPORTED | REPORTED |
| **HOV (H5-3)** | **PASS 58** | **PASS 58** | **PASS 58** | **PASS 58** |
| W-C (C″'s, read only) | FAIL 2/181 | FAIL 2/181 | FAIL 2/181 | FAIL 2/181 |
| W-B, W-D, W-E, W-F, W-G (banked, retired, BLOCK) | as floor v3 | as floor v3 | as floor v3 | as floor v3 |

Whole run (`fv4-witnesses.log`, gate Chromium): RAW 48 · M-1 11 · M-1x REPORTED · M-2 938 · M-2m 430 · M-2h FAIL 1/68 · M-3 354 · M-4 168 · M-5 20 · M-6 FAIL 27/120 · M-7 8 · M-8 8 · M-9 20 · O-66 5 · STACK 24 · W-A 216 · W-S 24 · T PASS · LIT REPORTED · **HOV PASS 58**.

**R-6 leaves R-4's paint where it was.** O-66 G3, light, Chromium: row `#f2e6d5` L 0.930 C 0.0261, plate `#fef7f2`, ΔL −0.0503 (Playwright WebKit `#f2e5d5` C 0.0256); dark recorded `#453828` C 0.0319, ΔL +0.0735. `O-66.log`'s row lines equal floor v3's (`diff`). The battery reads the highlighted row at keyboard focus; the probe reads it under the pointer (§2.2).

**H5's instrument readings on floor v4** (equal to floor v3's): M-9's veil depth on the dark aurora `#e87237 → #993f09` ΔL −0.199 (8.9× the page's −0.022), REPORTED (`M-9.log` equals floor v3's after the path lines). LIT `halo=5 near=1 stacked=10 chain=3 open=19`, frames 0/20 halos (`LIT-static-fv4.log` equals H5's floor v3 log bar the tree path). Census `LIGHTING-CENSUS stacked=0 halo=0 blur=0 open=0`, exit 0 (`census-fv4.log`). M-2h's verdicts and its halo row equal floor v3's. Only its release-window frame counts and offsets differ, which is capture timing.

### 4.3 · Owner options read on the floor v4 capture (unruled; `readings`)

| reading | Chromium · Playwright WebKit | equal to H5 on floor v3 |
|---|---|---|
| M-6 `--q1 a` | PASS 88 · 88 | yes |
| M-6 `--q1 c` | FAIL 2/96 · 2/96 | yes |
| M-1x `--q11 b` | FAIL 12/21 · 12/21 (floor v4 builds (a)) | yes |
| W-A `--q11 b` (H5-4) | FAIL 1/216 · 1/216 (the light chrome band at the bound, as (a) builds it) | yes |
| M-9 | PASS 20 · 20 | yes |

### 4.4 · Re-runs (every red cell, twice)

| red | engine | re-run 1 | re-run 2 | reading |
|---|---|---|---|---|
| M-2h light halo | Chromium | FAIL 1/68, load 13.3 | FAIL 1/68, load 11.0 | resting dock α 0.890, held 0.814 (x 411) … 0.894, floor 0.870, the same digits as H5's re-runs: N-3's attributed veil frost |
| M-6 stepped text | Chromium | FAIL 7/30 (paper cells only) | FAIL 7/30 | the owner's row (Q-1); `--q1 a` is green |
| M-3 light checker ring | Playwright WebKit | `ring 2.83–3.31 (min floating·well) · 2/16 under 3.0`, load 20.0 | the same, load 20.6 | identical to the battery (load 22.9) and to H5 and pass 4. The re-run log's verdict reads FAIL 28/140 because 26 of its rows are MISSING (grounds this targeted re-capture does not take); the checker rows themselves are the two |
| M-8 dark stripes | Playwright WebKit | `floating bleed 1.26 C 0.0260 ✗` (with dock and popover info rows) | the same | identical to the battery |
| M-6 | Playwright WebKit | FAIL 7/30 | FAIL 7/30 | as Chromium |
| HOV | static | — | — | one reading per tree; reproduces |

**No red was seen only under load.** Every red reproduced at load 11-21, against the battery's 22-26. These WebKit re-runs also settle H5 §5's owed WebKit-red item, on the floor v4 build. R-6 does not touch those cells (static paint; the baseline rows are `diff`-equal to floor v3's).

---

## 5 · Toolchain (`FV4-records/toolchain.log`)

One guarded admission, queued 15:27:58 and admitted 15:31:19 (load 10.1):

| step | result | load |
|---|---|---|
| `vue-tsc --noEmit` (src) | exit 0 | 11.2 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 2 before the library build: `FourierField.smoke.test.ts` imports `@mkbabb/glass-ui/fourier-math`, a package self-reference whose types are `dist/fourier-math.d.ts`. **Exit 0** after the build (15:32:48) | 10.7 / 10.9 |
| `vite build` (library) | exit 0 | 10.5 |
| `vite build --config demo/vite.demo-dist.config.ts` (dist-demo, from this tree, before units: P4-5's ordering note) | exit 0 | 10.2 |
| `vitest run --maxWorkers=2` | exit 0: **237 files, 2318 passed, 0 failed**, 10 expected-fail, 1 skipped (pass 4: 2318 passed) | 10.1 |

---

## 6 · The 44 rows (floor v4; defaults applied)

| # | row | status | evidence | closes on |
|---|---|---|---|---|
| 1, 2, 4-8, 10-19, 21, 22, 24 | RAW, M-1, M-2, M-2m, M-3, M-4, M-5, M-7, M-8, M-9, T, release, O-66 G2, O-66 G3, W-A, engines, plants, FL-13, O-87, STACK | **PASS** (20) | §4.2, Chromium both themes, each equal to floor v3 under H5. Row 18: 70 cells, 12 retune and 6 `noclaim` per engine, 8 live, 8 motion and 4 drift windows, WebKit retired once, 0 stalls. Row 19: R-1..R-5 and the floor plants carried from pass 4 on the byte-identical floor-v3 part (R-6 touches none of their files' paint), plus R-6's own plants (§3). Row 22: census 0, LIT inherited 19 / frames 0 | — |
| 3 | M-1x | OPEN | REPORTED 48/66; content grey off paper | **owner, Q-11 chrome clause.** (a): closes by its text, with no build. (b): closes by selecting `fv3/q11b.*`, with W-A under `--q11 b` (H5-4). The `var-q11b` capture reading under H5-4 is still owed (H5 §5) |
| 9 | M-6 | OPEN | stepped 27/120; `--q1 a` 88/88 both engines | **owner, Q-1.** (a): closes by selection (88/88 measured). (c): needs a reading (room only) and a new room value that survives `retune-bg` (2/96 red), neither built |
| **20** | prose sweep | **PASS** (was OPEN) | HOV PASS 58 in every column; the sweep finds no false sentence (§3). Plant: R-4 as built reds HOV 1/58 and the sweep (5 sentences) | — |
| 23 | gestalt, O-62 frame | OPEN | pass 4's frames and H5-1's banked bruise frame; R-6 adds `glance-fv4/` (§7) | **owner, Q-11 content clause and Q-3,** plus the owner's eye on the frames (incl. `pass-5/frames-H5-1/chromium-dark-aurora-*`) |
| FL-1..FL-11, FL-13..FL-16 | the floor | **PASS 15** | witnesses as §4.2; carried plants | — |
| **FL-12** | prose sweep of every touched file | **PASS** (was OPEN) | as row 20; the six files R-6 touches swept, plus `index.css:168,226` and `base.css:197,224`, which still read true (the menu row's hover rule still wins over `.interactive-item:hover`, now by holding the fill at rest) | — |
| N-1 | Q-1's ruling built | OPEN | (a) built; (c) a variant | **owner, Q-1** (as row 9) |
| N-2 | Q-11's ruling built | OPEN | (a) built; (b) a variant | **owner, Q-11 chrome clause** (as row 3) |
| N-3 | held halo | **PASS (attributed)** | M-2h re-runs read 0.814, as floor v3 | — |
| N-4 | the minor split's W-0.1 reading | **PASS, carried** | P4-3; the minor v3 re-reads it in step 3 | — |

**Count: 39 PASS, 5 OPEN** (floor v3 under H5: 37 / 7). **Closed by this seat: 20 and FL-12, on R-6, each with R-4-as-built red under H5-3 and the prose sweep.** The five open rows wait only on the owner: 3, N-2 (Q-11 chrome), 9, N-1 (Q-1), 23 (Q-11 content and Q-3, and the frames). With Q-1 (a), Q-3 (a) and Q-11 (a) for chrome **and** content confirmed, floor v4 closes all five by selection and pass 5 can be clean on this build. Without the rulings it cannot, whatever the critic reads.

---

## 7 · Glance pairs (`glance-fv4/`)

`glance.mjs`'s pairs (the dock, the Dialog and the floating plate, at rest) cannot show R-6: it changes only what a menu row paints under a resting pointer, and the battery's baseline proves that every resting cell is unchanged. So the pair is the open menu in the `parked` state, pointer on "First item" and the keyboard's highlight on "Second item", banked by `FV4-hover-probe.mjs --shot` and composed by `FV4-glance-pair.mjs`. Base on the left, route on the right, Chromium unless named. `SHA256.txt` holds each file's hash.

| look at | file | shows |
|---|---|---|
| floor v3 → floor v4, light | `glance-chromium-light-menu-parked-fv3-vs-fv4.png` (paint delta 12.36 %) | left: two rows wear the amber state fill, the pointed-at one as if selected. Right: one amber row (the keyboard's), and the pointed-at row lifted with no fill |
| floor v3 → floor v4, dark | `glance-chromium-dark-menu-parked-fv3-vs-fv4.png` (12.24 %) | the same, in the dark arm's amber |
| R-6 literal → floor v4, light and dark | `glance-chromium-{light,dark}-menu-parked-r6literal-vs-fv4.png` (12.32 %, 11.48 %) | left: the pointed-at row in `.interactive-item`'s beige-grey (§2.2); right: no fill |
| floor v3 → floor v4, Playwright WebKit | `glance-webkit-{light,dark}-menu-parked-fv3-vs-fv4.png` (12.34 %, 11.72 %) | as Chromium |

By eye, under O-87: the row that answers the pointer moves and does not change colour, and the menu shows one current item, not two. That is flatter and carries state. The keyboard's row keeps reka's focus outline, which R-6 does not touch.

---

## 8 · Owed and handed on

| item | to | why |
|---|---|---|
| the §2.2 departure (the hold) | the pass-5 critic, then the agglomerate | it makes R-6's stated outcome true where the literal wording would not; the critic re-measures `parked` itself and may attack the move or the `transparent` |
| the demo dock-search hover leg in paint | the pass-5 critic | static only here (§2.1) |
| R-8's ladder | the minor split v3 seat (step 3) | unknown at this seat; floor v4 takes it if it moves, and re-reads M-2, M-8 and T |
| `var-q11b` under H5-4, and the GLANCE WebKit self-test row | H5 §5's owed list, unchanged | not this seat's task. Only the WebKit-red re-run item of that list is now done (§4.4) |
| pen hover on menu rows (fill only for mouse), `Command` with `highlight-on-hover="false"` | record (W-H.1's menu row family, if ever wanted) | outside D3's rows; neither existed as a hover fill before R-4 in any way the register allowed |
| the owner rulings Q-1, Q-11 (both clauses), Q-3 | the owner | the five open rows |

The worktree, its builds, captures and caches are removed (the fence). To reproduce: `bash FV4-run.sh setup`, then the phases in `FV4-records/phases.log` order, and the WebKit leg under `guarded --exclusive webkit -- bash FV4-wk-inner.sh`. The plant trees are copies of the worktree's `src` and `demo` (plus `vite.targets.ts`) under `$B/scratch/`: `plant-r4` with `floor-v4-R6.diff` reversed, `plant-r6lit` with `plant-r6-literal.diff` applied.
