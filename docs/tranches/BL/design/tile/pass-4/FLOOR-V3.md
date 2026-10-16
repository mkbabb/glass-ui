# D4 · pass 4 · FLOOR v3: the floor every pass-4 route applies

| field | value |
|---|---|
| seat | D4 pass 4, FLOOR-V3 seat. Builds REGISTRY §P3-6.2 FV3-1..FV3-5 once, on the real source, on top of `../pass-3/floor-v2.patch` (sha1 `b04a83be`), with the P3-5 defaults for every unruled owner question and O-87 on every paint value. FV3-6 (the mark) is not built: Q-3 has not ruled (b). Picks no route, adds no checklist row |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | built in a detached worktree at `e13f5272` (`.claude/worktrees/bl/D4/p4/floor3/wt`). The task named `9219651e`, and the checkout moved to `9144cbe1` and `45513b57` while the seat ran. `git diff --stat 9219651e 45513b57 -- src tests MIGRATION.md package.json demo` is empty, so this is the library source every pass-3 and H4 seat measured |
| patch | `floor-v3.patch`: floor v1 + floor v2 + floor v3, one patch relative to HEAD. 38 files, +1342 / −272 (`git apply --numstat`), 2,439 lines, sha1 `f8f5767703aa10bdc25ad8d1541b50ed0133e410`. `git apply --check` is clean on the checkout at `9144cbe1` and again at `45513b57`. Floor v3 alone, over floor v2: 10 files (§1) |
| harness | H4 `e40bfd8801ef` (39 files), unedited. Every battery, dist, attack and stub line in `floor-v3/logs/` prints it |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5** (Playwright 1.61.1), headless, from `glass-ui/node_modules/playwright`. Every WebKit number here is Playwright WebKit. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | every build, unit run, probe and browser run went through `~/.claude/guard/guarded --light --rss-gb 8` (the light path the H4 seat took after the heavy queue held it 30 min, `H4/logs/HELD`); every Playwright WebKit read ran inside ONE `--exclusive webkit` hold (`floor-v3/logs/webkit-all.log`). One heavy run at a time. 1-min load across the seat: 5.7-42.4 (Chromium 14.3-31.0; Playwright WebKit 5.7-32.4). **The WebKit lock held this seat 3 h 56 min** (queued 10:03:57, admitted 14:00, behind D3's H5 self-test and D2's batch, then a process-count headroom wait; `logs/webkit-all.log`). The run was already on the light path, and the exclusive WebKit lock has no bypass, so it waited; the whole WebKit stage then ran 14:00 → 14:25 |
| records | `floor-v3.patch`; `floor-v3/run-fv3.sh` (the driver: every stage below is one call); `floor-v3/logs/` (every log cited, wall clock and load on its first and last line; `superseded/` holds the reads of the first FV3-5 law, §1 FV3-5; `aborted/` two unit plants whose anchors were mis-spelled, re-run); `floor-v3/probes/` (`tile-geometry.mjs`, `pill-row.mjs`, `multi-role.mjs`, `route-multi/`); `floor-v3/stubs/` (each route's one-rule writer of the fact, measurement only, never in the patch) |
| fences | no tracked source edited in the checkout; the only git writes were `git worktree add` / `remove` of `floor3/wt` and `floor3/wt-f2`; the only checkout writes are under `docs/tranches/BL/design/tile/`. One slip, self-reported: a stray `cp` copied `toggle-group/styles.css` into an existing empty `/tmp/x/` directory for about one second; the copy was removed and the directory left as it was found |

Short citations as in REGISTRY §P3: `D′c`, `Fc`, `Fp`; `FV2` is `../pass-3/FLOOR-V2.md`; `H4` is `H4.md`.

---

## 0 · In brief

1. **All five FV3 rows are built, in one patch on HEAD** (§1). Typecheck is clean on both projects. The whole suite runs 2,349 cases through H4's `unit.mjs` and fails only HEAD's own three `boot-graph` cases. Each of the eight new unit plants fails its case. The library builds (§3).
2. **The tile's geometry now reads the one fact (FV3-4, M-11).** Whatever writes `--selection-tile`, the item gets the field corner, a column, body leading, the card pad on the spacing tokens, one height per row and its perimeter, all under `@container not style(--selection-tile: none)`. **One pad spelling, no `lg` trap:** a size rule writes pad values, never a `padding`. Measured, the naive M-11 form on floor v2 gives `lg` 20 px inline (`8px 20px`); floor v3 gives 12 px at every size (`tile-geometry` 30/30 in Chromium and in Playwright WebKit). **The layered `!important` corner is decided: on the floor, for both routes.** Under each route's one-rule writer (stubs), CORNER reads **5/5 on D′ and 5/5 on F** in Chromium and in Playwright WebKit, and FACT **12/12 on both**, both engines.
3. **FV3-5 makes the pill row true in production.** T-2 goes from 40/52 on floor v2 to **52/52**, in both engines and on `dist` (§4). The first candidate law left graphics out, and a probe found it stacking an `inline-flex` icon wrapper into two silent rows. The shipped law takes graphics in, and it leaves out the Badge and three hidden-element spellings. It costs a wrapper's flex `gap` inside a label (§1 FV3-5, `pill-row` 27/27). The MIGRATION pill row now states that cost.
4. **FV3-2 closes FV2-2.** ATTACK `attrs` passes. T-5 goes from 46/78 to **49/78** (`dist` 47/79 → **50/79**): `preset-consumer-aria` 6/6, and FadingScroll (FV3-3) leaves `specimen` one tab stop. **Measured on `type="multiple"`:** a consumer `role="option"` is dropped, so the item is a `button` with `aria-pressed` and one tab stop, in both engines. On floor v2 the same markup read `option` ×4 and 4 tab stops (§1 FV3-2).
5. **HEAD + floor v3 under H4** (§4), identical in Chromium and Playwright WebKit on every witness: T-2 52/52; T-5 49/78; FACT 10/12; ATTACK 3/3. Every other witness reads what `FV2` read, except **CANON, 2/3 → 1/3**. That is an instrument blind spot, not a defect: `canon.mjs` walks grouping rules without evaluating a `@container` condition, so M-11's field corner, which every route's tile corner must now use, reads as reaching every pill (§5, F3-1).
6. **Bundle** (§6): unpacked 2,934,126 B. That is +15,069 over the `.bundle-ratchet` datum 2,919,057 and +4,604 over floor v2. Q-14's rebind grows.

---

## 1 · The patch, row by row

Line numbers are in the patched tree. Floor v3 over floor v2 touches ten files: `toggle-group/styles.css`, `toggle-group/ToggleGroupItem.vue`, `fading-scroll/FadingScroll.vue`, `fading-scroll/README.md`, `styles/utilities/base.css`, `MIGRATION.md`, and the tests `ToggleGroup.test.ts`, `fading-scroll.contract.test.ts`, the new `item-attrs.test.ts` and the new `tests/utils/strongObservers.ts` (F's, `Fp` §1).

### FV3-1 · The perimeter at inset 0 (M-10)

`src/components/toggle-group/styles.css:163`: the selected perimeter `::before` fills the padding box (`inset: 0`) instead of straddling the 1 px border (`inset: -1px`). Paint containment (`content-visibility: auto` on a tile, the pill's own `overflow: clip` under contrast-more and forced colours) clips at the padding box. It used to halve the band.

- **Witness: D′p's `corner-gap.mjs`, run unchanged** on HEAD + floor v3 + the D′ writer stub with D′'s pass-3 migrated compositions (`logs/probe-corner-gap-dstub-chromium.log`, load 16.4-18.1). **10/10 in Chromium.** Every migrated tile reads `::before inset 0px radius 16px`. The side band is 2.00 css px and the diagonal 2.12 (radial). The edge inset at 45° is within Δ 0.06-0.36 css px of the side's: `preset` 0.19 / 0.06 (light / dark), `specimen` 0.24 / 0.21, `strip` 0.36 / 0.25, `f1` 0.21 / 0.06, `v2` 0.16 / 0.06. Playwright WebKit: **10/10**, Δ 0.05-0.18 (`preset` 0.15 / 0.05, `specimen` 0.16 / 0.05, `strip` 0.18 / 0.10, `f1` 0.18 / 0.05, `v2` 0.16 / 0.06; `logs/probe-corner-gap-dstub-webkit.log`). The plant (`--plant`: inset 2 px, corner 12 px) fails 7/10 in Chromium (`logs/probe-corner-gap-dstub-plant-chromium.log`), 10/10 in Playwright WebKit (`…-plant-webkit.log`).
- **H3-7 on the same build** (`logs/stub-dstub-dp-T-3-chromium.log`): every migrated `paint containment` cell reads the selected edge at **2.00 px on all four sides, uncontained and under `content-visibility: auto`**. That covers the five sites and the five H3-11 states, 10/10 in Chromium and 10/10 in Playwright WebKit (`logs/stub-dstub-dp-T-3-webkit.log`). The migrated arm reads T-3 40/43 in both engines, the pass-3 routes' number. The three are C1's one-row pills (22.50 px² against 224), Q-10's.

### FV3-2 · `inheritAttrs: false`, the engine's attributes last, and the development name (M-10)

`src/components/toggle-group/ToggleGroupItem.vue`:
- `:35` `defineOptions({ name: "ToggleGroupItem", inheritAttrs: false })`.
- `:82-88` `ENGINE_OWNED = ["role", "tabindex", "aria-checked", "aria-pressed", "aria-selected"]`. `bound` is the consumer's attributes less those five, then the roving `tabindex`, then the engine's `itemAttrs`. It is bound first on the button (`:200`), so the item's own bindings (`data-state`, `data-commit`, `disabled`, class, the click) follow it. Listeners merge, so a consumer `@click` still runs.
- **Why the five are dropped, not just outranked.** On a `type="multiple"` group the engine's `itemAttrs` returns only `aria-pressed` (`useSelectionGroup.ts:267-268`). A consumer `role="option"` would stand under "engine last". The item's role there is its button's own, so the engine owns `role` by leaving it unset.
- `:165-169` the development name, D′'s form (M-7): `[ToggleGroupItem] value=… sets role, tabindex, aria-checked, aria-pressed: the group's engine owns an option's role, state and tab stop, and its values stand.` It runs once per item, under the floor's `process.env.NODE_ENV` gate.

Measured (`probes/multi-role.mjs` on a probe route, `probes/route-multi/`: V2's set as `type="multiple"` and K1's as `type="single"`. Every item carries `role="option" tabindex="0" aria-checked="false" aria-pressed="false" data-consumer`):

| build | scene | Chromium | Playwright WebKit |
|---|---|---|---|
| HEAD + floor v2 (`logs/probe-multi-role-f2-*.log`) | `v2-migrated` (multiple) | **FAIL**: group `group`, items `option` ×4, `aria-checked` and `aria-pressed` the consumer's (all `false`), tabindex `0,0,0,0`, **4 tab stops** | **FAIL**, the same: `option` ×4, 4 tab stops |
| | `preset-migrated` (single) | **FAIL**: group `radiogroup`, items `option` ×4, `aria-checked` `false` ×4, 4 tab stops | **FAIL**, the same |
| HEAD + floor v3 (`logs/probe-multi-role-fv3-*.log`) | `v2-migrated` (multiple) | **PASS**: items `button` ×4 (CDP AX), DOM role unset, `aria-checked` unset, `aria-pressed` `false,true,false,false`, tabindex `-1,0,-1,-1`, **1 tab stop**, `data-consumer` 4/4 | **PASS**, the same (Playwright aria snapshot + DOM states) |
| | `preset-migrated` (single) | **PASS**: `radiogroup` / `radio` ×4, `aria-checked` `false,true,false,false`, `aria-pressed` unset, 1 tab stop, `data-consumer` 4/4 | **PASS**, the same |
| HEAD + floor v3, `src-dev` | both | **PASS**, and 4 console errors per scene, one per item: `[ToggleGroupItem] value="dusk" sets role, tabindex, aria-checked, aria-pressed: …` | **PASS**, 4 errors per scene, the same text |

ATTACK `attrs` (H4-1) passes on `src`, `dist` and `src-dev` (§4).

### FV3-3 · FadingScroll's tab-stop rule, F's form (M-10)

`src/components/fading-scroll/FadingScroll.vue:55-80, :95`: the port takes `tabindex="0"` only while nothing inside it is a tab stop. `TAB_STOP` (`:63-64`) is `:is(a[href], button, input, select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]):not([disabled], [tabindex="-1"])`, so a roving set's parked items, a script-focused heading and a disabled control are not stops. A `MutationObserver` re-reads on child, `tabindex`, `disabled`, `href` and `contenteditable` changes. `README.md` says so.

T-5 `specimen` (K2 in FadingScroll) now reads `tab stops · 1 stop(s) between the sentinels, 1 of them items [1]` (`logs/battery-src-chromium.log`). Floor v2 read 5/6 there. The unit pins both directions, and the `parked-counts-as-a-stop` plant (§3) fails it.

### FV3-4 · The tile's geometry reads the fact (M-11), one pad spelling, the layered `!important` corner

`src/components/toggle-group/styles.css`:
- `:79-81` the item declares `--toggle-group-item-pad: 0.75rem` and `--toggle-group-tile-pad: var(--space-atom) var(--space-body)`, and pads by `padding-inline: var(--toggle-group-item-pad)`.
- `:277-287` the size rules write values only: `sm` `--toggle-group-item-pad: 0.5rem; --toggle-group-tile-pad: var(--space-residue) var(--space-atom)`; `lg` `--toggle-group-item-pad: 1.25rem`. **No size rule writes a `padding`.** That is the `lg` trap's cure, not a specificity race.
- `:197-210` `@container not style(--selection-tile: none) { .toggle-group__item { border-radius: var(--radius-field) !important; flex-direction: column; align-items: stretch; justify-content: flex-start; align-self: stretch; gap: var(--space-residue); padding: var(--toggle-group-tile-pad); text-align: start; line-height: var(--type-leading-body); --selection-perimeter: 1 } }`. This is the form the floor already used for the perimeter, and the H4 attack fixture's M-11 shape.
- **The pad is D′'s token pair**, the one REGISTRY §P3-6.2 asks for. F's `padding-block: 0.625rem` and 0.25 rem gap leave. The gap is `--space-residue` (4 px, F's 0.25 rem by token).
- **`align-items: stretch` on a tile group is `align-self: stretch` on the tile.** A style query evaluates against an ancestor, so the group cannot read the fact it carries. The item reads it from the group and stretches itself. That is the same one-height-per-row result, and it holds in a consumer grid (CX-5), where `stretch` is the grid's own default.
- **The layered `!important` corner: on the floor, decided for both routes.** Q-1 (a) rules a multi-row holder onto the field rung, and N-9 / T-7 rule out consumer paint on the tile. The corner is the tile's identity, so the floor refuses a consumer corner in paint, in production, whichever route writes the fact (E-2: no masking fallback, refused not warned). Only an inline `border-radius: … !important` outranks it, which the MIGRATION row states.

**Measured, `probes/tile-geometry.mjs`** (scene `pill-icon`, the fact written by an unlayered consumer rule on the group, `data-size` set to sm, md and lg, light and dark):

| build · arm | Chromium | Playwright WebKit |
|---|---|---|
| HEAD + floor v3, `flush`, plus five consumer corner forms per size (`logs/probe-tile-geometry-fv3-*.log`) | **30/30**: every size `16px → used 16.00`, column, `align-self stretch`, `text-align start`, perimeter 1, line-height 1.5 × font (20.19 px at 13.46, 22.95 px at 15.3); pads `sm 4px 8px`, `md 8px 12px`, `lg 8px 12px`; the utility, scoped, unlayered `!important` and inline forms all keep 16px; inline `!important` (INFO) reads `9999px → used 22.49` (sm) | **30/30**, the same values |
| HEAD + floor v3, `plated` | 6/6 | 6/6 |
| HEAD + floor v2 + the naive M-11 rule (`logs/probe-tile-geometry-f2-naive-*.log`) | 0/6. **The trap, measured:** `lg` pad `8px 20px 8px 20px` (want `8px 12px`): the `(0,3,0)` size rule's `padding-inline: 1.25rem` outranks the bare `(0,1,0)` tile rule. `sm` `8px 8px` | 0/6, the same: `lg` pad `8px 20px 8px 20px` |
| HEAD + floor v3 + the same naive rule | `lg` `8px 12px` (the trap is gone with no size-rule pad); `sm` reads the naive rule's md literal, 4/6 | 4/6, the same |

**The attack set under each route's one-rule writer** (H4-1, measurement only; `stubs/dprime-writer.patch` is `.toggle-group[shape="cell"] { --selection-tile: flush }`, the attribute falling through a ToggleGroup with no `shape` prop. `stubs/f-writer.patch` is F's `#media` / `#meta` slots plus `.toggle-group:has(> .toggle-group__item > :is(.toggle-group__media, .toggle-group__meta):not(:empty)) { --selection-tile: flush }`. Each was applied for its build and reverted (`logs/build-stub-*.log`)):

| witness | D′ writer, Chromium · Playwright WebKit | F writer, Chromium · Playwright WebKit |
|---|---|---|
| FACT | **12/12** · **12/12** | **12/12** · **12/12** |
| ATTACK | 3/3 · 3/3 | 3/3 · 3/3 |
| CORNER | **5/5** · **5/5** | **5/5** · **5/5** |

`declared` reads `a tile on the field corner · fact flush · … 16px → used 16.00` in both (D′ 95.94×40.00, its tile has no `#meta` row; F 95.94×66.58, 2 rows). `fact-plated` and `fact-flush` read `a tile on the field corner`. `pill-in-tile` and `tile-in-pill` read `a pill at h/2 on one row`. Each route's whole tile rule is now one line that writes the fact. The F stub's direct-child `:has()` with `:not(:empty)` passes `empty` and `tile-in-pill`, the two pass-3 F defects, so those cures are F's to carry in its route.

### FV3-5 · FV-2's residue: a self-set block child stays on the row; the Badge trade; M-12's name

`src/styles/utilities/base.css:69-108`, inside `@container style(--selection-tile: none)`:

```css
:where(.pill-row *:not(svg *, .badge-atom, .badge-atom *, [hidden], .hidden,
                       [style*="display: none"], [style*="display:none"])) {
    display: inline !important;
}
:where(.pill-row br) { display: none !important; }
```

- **`!important` in `@layer components` is the refusal.** It outranks a utility in the later `utilities` layer and an inline style. That is H4-2's two cells, and `Fc`'s `late` class. An inline `display: … !important` is the one spelling above it.
- **Graphics are in the law.** The first candidate (REGISTRY's: "other than graphics and `.badge-atom`") was built and measured first (`logs/superseded/probe-pill-row-*-law-graphics-excluded.log`). An `inline-flex` icon wrapper inside a label read **2 rows, silent**, on all five gating scenes in Chromium, where floor v2 read 1. The wrapper ran inline while Tailwind's base layer kept its `svg` a block, so the block broke the row. With graphics in the law, an `svg` or `img` runs inline at its own size (a replaced box).
- **The probe also found a floor v2 hole that H4 does not read:** a 14 px `svg` appended to a label stacks two rows silently on floor v2, on all five scenes (`graphic`, `logs/probe-pill-row-f2-chromium.log`: `display: block … rows 2`). Floor v3 reads 1 row.
- **The Badge trade.** A Badge (`.badge-atom`, `inline-flex` by its recipe) keeps its display. As a flex item of the item, the `pill-badge` scene's own Badge computes `flex` and reads one row either way (`badge` / `badge-law`, 22.44×18.83). Moved inside the label, it is where the law bites. Excluded, it reads `inline-flex 22.80×22.80`, one row, nothing cut. Under the law (`badge-in-label-law`), it reads `inline 22.44×24.00`, **1 box cut** (Playwright WebKit: `inline-flex 22.80×22.78`, and under the law `inline 22.53×23.85`, 1 box cut). The exclusion stays.
- **Hidden stays hidden.** `display: none` is a display too, so `!important` would un-hide content. The `hidden` attribute, `v-show`'s inline `display: none` and the `hidden` utility are left out. A class of the consumer's own that sets `display: none` is not, and shows (F3-3).
- **The cost: a wrapper's flex `gap`.** An `inline-flex` wrapper inside a label runs inline, so its gap goes: `icon→text gap 0.00 px (authored 6)` on every scene. That is the price of refusing self-set displays in production (Q-5 (b)).
- **M-12, F's R-13 name** (`ToggleGroupItem.vue:124-145, :160`): text stacked inside the rung (`textRows(b) > 1`, the longest chain of text boxes under the midpoint test) is the third reason a pill is named. The observer also hears `class` and `style` changes (`:183-189`). On `src-dev` the inline `!important` block is named on the four ToggleGroup scenes (`logs/probe-pill-row-fv3dev-chromium.log`: `[ToggleGroupItem] value="All" asks for a second row …`). Playwright WebKit names the same four (`logs/probe-pill-row-fv3dev-webkit.log`). The `tabs` scene is SegmentedTabs, which has no name (F3-4).

**Measured, `probes/pill-row.mjs`** (item 0 of `single`, `vertical`, `pill-icon`, `pill-badge`, `tabs`; each case on a fresh page after mount):

| build | gating (hidden ×3, `iflex`, `graphic`, `badge`, `badge-in-label`) | Chromium | Playwright WebKit |
|---|---|---|---|
| HEAD + floor v3, `src` | | **27/27** | **27/27** |
| HEAD + floor v3, `src-dev` | | **27/27** | **27/27** |
| HEAD + floor v2, `src` | | 22/27: `graphic` stacks 2 rows on all five scenes | 22/27, the same five |

`iflex` on `vertical` reads `cut 1` on both floors. That is the 64 px column clipping a 44 px label at the plate (the pill's ellipsis), not a row, and the cell gates on rows and the rung only.

---

## 2 · The P3-5 defaults and O-87, applied

- **Q-5 (b)+(d):** production refuses structurally (the `!important` row law, the engine-owned attributes, the floor corner), and development names (`process.env.NODE_ENV`, the floor v2 channel). No new name ships in production.
- **Q-2 (b):** flush stays the default arm of the fact; `plated` is one value away (`tile-geometry --arm plated` 6/6).
- **Q-3 (a)/(default):** FV3-6 is not built; REPORT `mark` reads UNMEASURED, as it must (§4).
- **Q-1 (a):** 16 px at every rung (`tile-geometry`, sm / md / lg).
- **Q-9 (a):** unchanged from floor v2; contrast-more and forced colours keep the per-item perimeter, now uncut by the pill's clip (FV3-1).
- **Q-10, Q-11, Q-13, Q-14, Q-15:** untouched. Q-14's datum moves (§6).
- **O-87:** floor v3 adds no paint value: no colour, shadow, blur, glow or lighting layer. The perimeter's move inward is the one paint change, and it keeps the single quiet edge at its 2 px.

---

## 3 · Typecheck, unit, build

Worktree `e13f5272` + `floor-v3.patch`, `node_modules` symlinked, Vite and Vitest caches inside the worktree. Every unit run is H4's `unit.mjs` (config `vitest.wt.config.ts` `f70c44e4`, two workers).

| check | result | log |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0, 15 s | `logs/tsc-app.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` (with `dist/`) | exit 0, 16 s (before `dist/` existed it failed only on the two `@mkbabb/glass-ui/fourier-math` self-imports: `logs/superseded/tsc-test-before-dist-pre-final.log`) | `logs/tsc-test.log` |
| the whole suite | **2,349 ran: 2,346 passed, 3 failed** (`boot-graph` ×3, no `dist-demo`: HEAD's own, `FV2` §3), 1 skipped | `logs/unit-all.log`, load 20.9 → 30.0 |
| `unit.mjs --selftest` | 6/6 | `logs/unit-selftest.log` |
| the new cases, clean | 21/21 (`ToggleGroup.test.ts`, `item-attrs.test.ts`, `fading-scroll.contract.test.ts`) | `logs/unit-plant-clean-targets.log` |
| plants, each must FAIL | **8/8 fail**: `attrs-engine-first` (engine attrs dropped from `bound`: 2 of 3 fail); `attrs-owned-kept` (the owned five not filtered: 2 of 3); `attrs-unnamed` (no development name: 1 of 3); `stacked-unnamed` (no `textRows` reason); `geometry-off-fact` (the field corner out of the fact's query); `lg-trap` (a size rule writes `padding-inline` again); `port-always-stop`; `parked-counts-as-a-stop` | `logs/unit-plant-*.log` |
| library build (`harness/libbuild.mjs`) | exit 0, 9.1 s | `logs/libbuild.log` |

New and changed unit cases: `tests/components/ui/toggle-group/ToggleGroup.test.ts:494` (the stacked name) and `:527-576` (the sheet: the tile geometry in the fact's query exactly, one field-corner rule, no size rule writes a pad); `item-attrs.test.ts:23, :38, :49` (single, multiple, the name); `fading-scroll.contract.test.ts:25`; the floor v2 late-name case now runs under `withStrongObservers` and waits for the name (happy-dom's WeakRef observer, `Fp`).

---

## 4 · H4 on HEAD + floor v3

Builds `fv3-src`, `-src-dev`, `-dist`, `-dist-dev`, `fv3-atk-src`, `-atk-src-dev`, `-atk-dist` (`run-fv3.sh build`, 09:35-09:36). Chromium: `run.mjs` over the battery minus T-8 (`logs/battery-src-chromium.log`, 09:41 → 09:57), then the dist and attack-dist cells (`logs/dist-*`, `logs/atk*`). Playwright WebKit: every witness on its own inside one lock hold, then T-8 (both engines) (`logs/src-*-webkit.log`, `logs/webkit-all.log`). Before: `H4` §3, HEAD + floor v2 under the same hash.

| witness | build | HEAD + floor v2 (`H4` §3), Chromium · Playwright WebKit | **HEAD + floor v3**, Chromium | **HEAD + floor v3**, Playwright WebKit |
|---|---|---|---|---|
| T-1 | src | 5/27 (+12 unmeasured) · same | 5/27 (+12 unmeasured) @15.46 | 5/27 (+12 unmeasured) @13.32 |
| T-2 | src | 40/52 · 40/52 | **52/52** @14.62 | **52/52** @17.18 |
| T-3 | src | 2/42 (+12 unmeasured) · same | 2/42 (+12 unmeasured) @15.30 | 2/42 (+12 unmeasured) [unmigrated 9/48] @21.32 |
| T-4 | src | 12/30 · 12/30 | 12/30 @20.53 | 12/30 @32.39 |
| T-5 | src | 46/78 · 46/78 | **49/78** [unmigrated 20/37] @22.60 | **49/78** [unmigrated 20/37] @20.28 |
| T-6 | src | 31/55 · 31/55 | 31/55 [unmigrated 34/48] @27.65 | 31/55 [unmigrated 34/48] @13.98 |
| T-7 | src | 0/0 (+6 unmeasured), unmigrated 4/32 · same | the same @23.37 | the same @11.51 |
| T-8 | src | 0/12 (+13 unmeasured) | 0/12 (+13 unmeasured: 12 T-1 cells never past their rung, 1 real Safari) @9.07, one run, both engines | |
| W-A | src | 5/9 · 5/9 | 5/9 @21.41 | 5/9 @9.62 |
| W-B | src | 9/25 · 9/25 | 9/25 @22.02 | 9/25 @9.41 |
| W-C | src | 0/8 · 0/8 | 0/8 @20.08 | 0/8 @9.28 |
| W-D | src | 4/8 · 4/8 | 4/8 @20.23 | 4/8 @9.98 |
| W-E | src | 1/3 · 1/3 | 1/3 @19.42 | 1/3 @10.06 |
| CANON | src | 2/3 · 2/3 | **1/3** @19.47 (§5) | **1/3** @9.90 |
| FACT | attack src | 6/12 · 6/12 | **10/12** @19.47 | **10/12** @9.90 |
| ATTACK | attack src | 2/3 · 2/3 | **3/3** @18.57 | **3/3** @9.14 |
| CORNER | attack src | 1/5 · 1/5 | 1/5 @19.49 | 1/5 @10.17 |
| REPORT | src | 0/1 (+1 unmeasured) · same | 0/1 (+1 unmeasured) @18.65 | 0/1 (+1 unmeasured) @10.00 |
| T-2 | dist | 40/52 · 40/52 | **52/52** | **52/52** @8.19 |
| T-5 | dist | 47/79 · 47/79 | **50/79** | **50/79** @6.89 |
| W-E | dist | 1/6 · 1/6 | 1/6 | 1/6 @7.73 |
| FACT | attack dist | 6/12 · 6/12 | **10/12** | **10/12** @7.92 |
| ATTACK | attack dist | 2/3 · 2/3 | **3/3** | **3/3** @7.33 |
| CORNER | attack dist | 1/5 · 1/5 | 1/5 | 1/5 @7.11 |
| ATTACK | attack src-dev | 3/4 · 3/4 | **4/4** | **4/4** @6.86 |

`@` the 1-min load at the witness's start. No commit cell failed on janky frames, no PF-1 hang and no stall was printed, and no NOT-REPRODUCED line appeared, in either engine. **The two engines agree on every tally.** The Playwright WebKit unmigrated T-3 arm reads 9/48 where Chromium reads 12/48, as it did on HEAD and floor v2 (`H4` §3).

### 4.1 · What moved, and why

- **T-2 +12** (`src` and `dist`): H4-2's two late cells on all six gating pill scenes now read `the child computes display: inline · nothing cut; one row` (FV3-5).
- **T-5 +3** (`dist` +3): `preset-consumer-aria` ARIA and tab stops (`radiogroup` / `radio`, 1 stop) (FV3-2), and `specimen` tab stops (1, FadingScroll FV3-3).
- **FACT +4:** `fact-plated` and `fact-flush` in light and dark now read `the written fact and the geometry agree: a tile on the field corner · fact plated · 204.00×61.58 · 16px → used 16.00 (0.52×h/2) · 2 row(s) · column`. That is the cure of `D′c` §2's lozenge, which floor v2 read as `9999px → used 30.79`. The two cells left are `declared` (light, dark), and they need a writer: no route is on the floor (§1 FV3-4: 12/12 under either stub).
- **ATTACK +1** (`src-dev` +1): `attrs` (FV3-2).
- **CORNER 1/5** on the floor alone: the attack build's `preset-migrated` is not a tile without a writer (`computed 9999px · used 20.00 on 204.00×40.00`), so there is no tile corner to refuse. It reads 5/5 under each stub (§1).
- **CANON −1:** §5.
- **REPORT** `kick`: peak 1.0276, push 0.14 px at 300 px against a 4 px gap (Chromium); peak 1.0274, push 0.12 px (Playwright WebKit); reported. Floor v3 does not touch the kick. `mark`: UNMEASURED (no FV3-6).
- **Unchanged and still RED, owned elsewhere** (as `FV2` §4.2): T-1 / T-3 / T-8 / W-D read a tile, the routes'. T-4 and T-6 `card`, `chipcell` are retired bindings. T-4 `specimen` is FL-5 (K2's unlayered pad). T-5 `strip`, `f1`, `c1`, `card`, `chipcell` are consumer compositions. W-E `specimen` / `strip` are unmigrated tiles held to one row: R-1, Q-5 and Q-15's.

---

## 5 · Not built, carried, open

| id | what | why | owner |
|---|---|---|---|
| **F3-1** | **CANON cannot see a container condition.** `canon.mjs` walks every grouping rule (`r.cssRules`) and matches the rule's selector against the 48 twins, but never evaluates an ancestor `@container` condition. Floor v3's `@container not style(--selection-tile: none) { .toggle-group__item { border-radius: var(--radius-field) !important } }` therefore reads as `«.toggle-group__item» → var(--radius-field)` reaching all 48 pill twins (law 2 FAIL), and law 1 finds `0 rule(s): no rule declares the tile` (`fv3-src/CANON-chromium.json`). M-11 puts every route's tile corner in exactly this form, so CANON will fail every route on floor v3 for a reason no pixel shows: the pill corner reads `9999px → used h/2` on every T-2 scene (52/52) and the tile reads 16 px (`tile-geometry` 30/30) | a harness row, not floor work. The cure is for `canon.mjs` to carry each rule's container conditions and evaluate `style(--selection-tile: …)` against the twin's arm (the tile twin's fact non-`none`, the pill twin's `none`); the H4 attack fixture already uses this form. Not edited here: it moves the one hash every route reports (`HARNESS.md` §3) | the next harness revision (H5), before a critic scores R-7 on floor v3 |
| F3-2 | a wrapper's flex `gap` inside a pill label goes (`icon→text gap 0.00 px (authored 6)`) | the price of refusing self-set displays in production under Q-5 (b). Stated in MIGRATION. If the owner rules Q-5 (c) (development only), the law can return to floor v2's zero-specificity form and the name carries the rest | owner, Q-5 |
| F3-3 | a consumer class of its own that sets `display: none` on a pill's content is overridden and shows; three spellings are exempt (`hidden`, `v-show`, `.hidden`) | the law cannot read a display. MIGRATION names the three spellings it keeps, so the row is falsifiable | owner, Q-5 (with F3-2) |
| F3-4 | SegmentedTabs' tab carries the row law but no development name (the `tabs` inline `!important` case reads 2 rows, 0 errors on `src-dev`) | the names live in ToggleGroupItem (FV-7); the tab is a second composer of `.pill-row` with no name of its own | SegmentedTabs' owner; Q-5 |
| F3-5 | `lg` tiles take the md tile pad (8 / 12 px) | D′'s token pair names two rungs (sm, and md for both md and lg); a third would be a size value no route measured | the routes' critics, if the gestalt asks |
| FV2-1 | the unmigrated K2 stage is clipped, silent in production (W-E `specimen`, 3 rows inside a 36 px pill) | unchanged; Q-5 / Q-15 / R-1 | owner |
| FV2-3, FV2-4, FL-3, FL-5 | as `FV2` §7 | unchanged | as there |
| E-4 | real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell, including the WebKit pseudo-element style-query miss the perimeter switch works around | owner |

**For the route seats.**
- Apply `floor-v3.patch` on HEAD.
- A route's tile rule is now one rule that writes the fact (`--selection-tile: flush`) and nothing else. The floor supplies the corner (refused to a consumer), the column, the token pad pair, the leading, the row height, the perimeter, the flush plate, the pill law's absence, the Q-9 exemption and the names. A route that declares any of those again is a second spelling (R-10).
- D′: `[data-shape="cell"] { --selection-tile: flush }`. F: the writer must be the direct-child `:has()` with `:not(:empty)` (the stub's form), or `empty` and `tile-in-pill` fail as in pass 3.
- Remove D′'s and F's own copies of the three M-10 fixes and the tile geometry; they are the floor's now.
- Expect CANON to read 1/3 until F3-1 is fixed in the harness.

---

## 6 · The bundle datum (R-9, PF-4)

`../pass-3/floor-v2/probes/bundle.sh` (npm's `unpackedSize`, G-BUNDLE-RATCHET's measure; `--dry-run`, nothing written). Log `logs/bundle.log`, load 15.3-15.5 (the first read, one MIGRATION blank line earlier, was 2,934,127 B: `logs/superseded/bundle-pre-final.log`).

| build | unpacked (packed files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD (`FV2` §5) | 2,919,057 B (841) | 0 | 2,535,888 B, 837 files | 328,472 B |
| HEAD + floor v2 (`FV2` §5) | 2,929,522 B (843) | +10,465 | 2,541,208 B, 839 files | 329,941 B |
| **HEAD + floor v3** | **2,934,126 B (843)** | **+15,069** | 2,543,198 B, 839 files | 330,571 B |

Floor v3 over floor v2 is +4,604 B unpacked, of which `dist/` is +1,990 B and JS gzip-9 +630 B; the rest is `MIGRATION.md` and the FadingScroll README. No file and no export were added to the package. Q-14's rebind is the owner's.

---

## 7 · MIGRATION rows

All in `MIGRATION.md`'s `## Unreleased — the selectable tile's floor` section. Each states something a reader can check.

**Retired bindings, each with a detector** (now four):
- `<Card selected>`, `<Chip shape="cell">`, `<SegmentedTabs semantics="toggle">` (floor v1 and v2, unchanged).
- **new** (`MIGRATION.md:40-51`): *A `role`, `tabindex` or selection state on a `ToggleGroupItem` no longer replaces the group's.* The five owned attributes are dropped in production as in development. On `type="multiple"` the role is the button's own, and every other attribute lands. Detector: the development name, and `rg 'ToggleGroupItem[^>]*(role=|tabindex=|aria-(checked|pressed|selected)=)'`.

**Behaviour and paint, nothing to change:**
- **new** (`:55-59`) FadingScroll is a tab stop only while its content holds none (`-1` and disabled are not stops).
- **rewritten, now true** (`:66-83`) the pill row. Every element in a pill or tab runs inline whatever sets its display (UA, class, inline style), graphics included at their own size, and a flex wrapper's `gap` goes. Three things keep their display: a Badge, the three hidden spellings, and an inline `!important`. The development name covers a `<br>`, content past the rung, and text on two rows inside it, re-checked on content, class and style changes. Floor v2's row said "a class that sets a display keeps it", which H4-2 and `Fc`'s `late` falsified on `dist`.
- **extended** (`:84-94`) `--selection-tile`. Under either tile value the option is a card whatever wrote the value: 16 px (a consumer corner by utility, scoped rule or unlayered `!important` has no effect; an inline `!important` does), a column, start-aligned body leading, the token pad (sm its own), one height per row, and the perimeter. A nested group is pills again. "Nothing in the library sets it yet" stays true: the floor ships no writer.
- **new** (`:95-97`) the perimeter paints inside the 1 px border, so containment keeps its 2 px.
