# D4 · pass 2 · D4-D′ · prototype: the declared cell, on the floor register

| field | value |
|---|---|
| seat | D4-D′ prototype. Implements `D4-Dp-spec.md` on the real source over the floor patch, re-measures every H2 witness in both engines with the unmigrated and migrated consumer side by side, and answers REGISTRY §7.3 D′ items 1-10 and "Every route". Picks no winner. Read no other route's pass-2 file (REGISTRY §7.4) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | the checkout's HEAD `a1732a48` in a clean detached worktree, `floor.patch` applied first (sha1 `f1476eba…`, clean). The task names `04929544`; `git diff --stat 04929544 a1732a48 -- src` touches only the Configurator (5 files) and `src/index.ts`, no tile file. The route patch applies clean on both bases (§1) |
| patch | `D4-Dp-proto.patch` (9 files, +304 / −19, sha1 `42382258…`), relative to HEAD+floor. `git apply --check` clean on `a1732a48`+floor and on `04929544`+floor |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell: **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared. Load 6.3-27.9 across every run; every log line and JSON carries its own. No T-6 cell failed on janky frames and no re-read fired (`grep -c "NOT-REPRODUCED\|reproduced in"` on both `T-6-*.json` = 0, 0). Chromium commit lines ran at a median frame interval of 8.30 ms, Playwright WebKit at 17.00 ms |
| records (P-3: every number below cites one of these) | `D4-Dp-proto/runs/dp-src/*.json` (the H2 battery), `runs/dp-dist/W-E-*.json`, `runs/build-dp-{src,src-dev,dist}.json`; `D4-Dp-proto/logs/*.log`; `D4-Dp-proto/route/` (`route.json`, `migrated.mjs`: the spec's six migrations, markup unchanged); `D4-Dp-proto/probes/` (`states.mjs` with a `--sites` argument added, `refusal.mjs` with the corner part added, `capture.mjs`, `load-scene.mjs`, `t3-seq.mjs`); `D4-Dp-proto/captures/*.png` (32) |

Tallies are read with `node ../harness/tally.mjs D4-Dp-proto/runs/dp-src [--scenes] [--fails]`.

---

## 0 · In brief

1. **The prototype is the spec's mechanism with four changes** (§1): the pill's one-row law is a `max-block-size` clamp, not a `block-size`; the E-11 corner guard the spec delegated is built; the canon test is re-pointed in place on the parsed selector, for the tile and the pill; and the MIGRATION rows are written.
2. **The clamp closes the spec's open half of item 9.** Shipped K2 (`height: auto`, unlayered) is held at its 36.00 px rung on `dist` in both engines, where the spec's `block-size` let it grow to 120.33 (`logs/refusal-dist.log`). Every undeclared multi-row pill is now held at its rung in production, and the DEV build names each one at mount, with 0 false positives on the five pill controls.
3. **The migrated consumer is green on every D′ cell except the three the spec named.** T-1 12/12 · 15/15, T-4 16/16 · 16/16, T-7 24/24 · 24/24, W-D 8/8 · 8/8, T-2 22/22 · 22/22 (Chromium · Playwright WebKit). The commit bar is green on keyboard, programmatic and pointer commits on all four migrated one-of-N scenes in both engines, with Tab entry still. The misses: C1's T-3 (a pill under Q-10 (b), R-2), FadingScroll's own tab stop (TF-6) and F1's light hover in Chromium (R-5, reproduced with ink hidden).
4. **T-3 now runs to completion in Playwright WebKit**: migrated 15/18 in both engines. The spec's HF-2 `page.goto` timeout did not recur at load 11.
5. **Bundle: +4,026 B unpacked over HEAD+floor** (2,926,750 against 2,922,724): `dist` +2,125 B and `MIGRATION.md` +1,901 B. JS gzip-9 rose by 245 B. The ratchet datum at `a1732a48` is 2,919,057, so the floor sits 3,667 B over it and D′ 7,693 B over it (§2 item 10).

---

## 1 · The mechanism, as built (line numbers in the patched tree)

| # | where | what | against the spec |
|---|---|---|---|
| M-1 | `toggle-group/ToggleGroup.vue:42-50, 61, 166`; `toggle-group/index.ts`; `src/index.ts:374` | `export type ToggleGroupShape = "pill" \| "cell"`; prop `shape`, default `"pill"`; `:data-shape` on the root. The context is untouched. Both barrels export the type | the root barrel export is added (E-7: exported) |
| M-2 | `toggle-group/styles.css:186-216` | **The one tile declaration.** `.toggle-group[data-shape="cell"] .toggle-group__item`: column, `align-items: stretch`, `gap: var(--space-residue)`, `padding: var(--space-atom) var(--space-body)` (`sm`: residue / atom), `text-align: start`, `line-height: var(--type-leading-body)`, `white-space: normal`, `overflow: visible`, `max-block-size: none`, `border-radius: var(--radius-field)`, `--selection-perimeter: 1`. The label rule is lifted. **No group layout** (CX-5) | as specified, releasing the clamp instead of a block size |
| M-3 | `styles.css:84-90` | **The pill holds one row, structurally** (Q-5 (b)): `max-block-size: var(--toggle-group-item-size)`. With the floor's `min-block-size` at the same rung, the pill's block is clamped from both sides. An unlayered consumer `height` outranks a layered `block-size` and does not reach a max | **changed.** The spec's `block-size` let shipped K2 balloon 102.17 → 120.33 on `dist` (spec R-1); the clamp holds it at 36.00 (§2 item 9) |
| M-4 | `styles.css:1-15, 99-106, 243` | `@property --selection-pop` (`<number>`) and `--selection-pop-duration` (`<time>`); on the item `--selection-pop: calc(0.06 * var(--motion-weight))` and `--selection-pop-duration: var(--spring-panel-duration)`. `--selection-ink`: `--muted-foreground` at rest, `var(--selection-edge)` on `[data-state="on"]`; the item's `color` reads it | as specified |
| M-5 | `ToggleGroupItem.vue:83-115` | **The commit, keyed on the model:** `watch(selected, …, { flush: "post" })` runs `node.animate` on `transform` (`scale(1)` → `scale(1 + pop)` at 0.4 → `scale(1)`, the punch curve, the panel clock). A zero amplitude (PRM) runs nothing. It never runs on mount, Tab entry or a keyed move | as specified, `flush: "post"` so the computed tokens are read after the DOM update |
| M-6 | `ToggleGroupItem.vue:117-165` | **The DEV names** (`import.meta.env.DEV`, absent from `dist` per Q-5 (b)). A **pill** names a second row once: a child whose box runs past the item's, or a label squeezed by the rung (`scrollHeight > clientHeight`). A **tile** names a consumer corner: its computed `border-top-left-radius` against `var(--radius-field)` resolved on a probe element under `body`, so the bound is the document's and a per-item re-binding cannot name itself (H-1's rule) | the pill's "grown past its rung" branch is dropped, since the clamp makes it unreachable; **the corner guard is new** (the spec's MIGRATION section left it to this seat) |
| M-7 | `src/styles/accessibility.css:7-10, 20, 41` | Q-9 (a): both `[data-state="on"]` arms gain `:not(.toggle-group[data-shape="cell"] .toggle-group__item)`, with the reason in the header comment | as specified |
| M-8 | `tests/styles/radius-role-canon.test.ts:555-641`; `tests/components/ui/toggle-group/ToggleGroup.test.ts:378-386` | The text pin `expect(item).toContain("border-radius: var(--radius-pill)")` is deleted. A new case parses every sheet under `src/` with postcss and matches each corner-declaring selector against a live `cell` item and a live `pill` item (happy-dom `Element.matches`). Exactly one rule may reach the tile and not the pill: `toggle-group/styles.css`, `var(--radius-field)`. The pill's own rules in that sheet must resolve to `{var(--radius-pill), inherit}`. The barrel list gains `ToggleGroupShape` | **in place** in the canon suite, not a separate probe, and it covers the pill side as well |
| M-9 | `MIGRATION.md` (Unreleased) | "One option shape arrives": the `shape="cell"` row with both DEV names as detectors, the `--selection-ink` row, and two behaviour rows (the pop and its `transform` collision; the a11y exemption) | written (the spec drafted them) |

Not built, on purpose: no grid on `cell` (CX-5); no flood (the pop clears H-4 alone); no `#title` / `#meta` / `#mark` (D4-F's question); no `development` export condition (floor FL-1, §2 item 9); no `MutationObserver` in the DEV arm (spec R-7: no consumer that mutates content without changing a box was found).

---

## 2 · §7.3 D′ items: status and evidence

| # | item | status | evidence |
|---|---|---|---|
| 1 | CX-1 closed on the floor register | **Met.** The perimeter is the item's own `::before`, which the invalid grammar's `border-color` does not reach | `logs/states.log`: **108/108** (3 migrated sites × valid, invalid, sibling, consumer border, translucent tone, unresolvable tone × light, dark, PRT × 2 engines). Invalid, ≥ 3:1 area against the bar: preset 820.00 / 267 light, 519.00 dark (Chromium); 910.50 / 518.00 (Playwright WebKit). Specimen 547.00 / 553.00 against 291. Strip 281.00 / 159.00 against 88 (Chromium). The fill stays 1.19-1.22:1: the edge carries |
| 2 | H-2's pair green; T-2 fails an item off its rung | **Met** | W-D **8/8 · 8/8** (`runs/dp-src/W-D-*.json`); T-2 **22/22 · 22/22**, `family-d-undeclared` 4/4 in both |
| 3 | The commit arm on H-4 (keyboard, pointer, programmatic) | **Met** on preset, specimen, f1 and strip (migrated), both engines | `runs/dp-src/T-6-*.json`. Chromium preset: keyboard peak 1.04 at 189 ms, trough 0.99, settle 1.00; programmatic 1.04 at 191 ms; pointer 1.05 at 208 ms, settle 1.01 (the hover lift). Playwright WebKit preset: 1.03 at 178 / 188 ms, pointer 1.05 at 197 ms. Tab entry: largest scale motion 0.00 on every scene in both engines. T-6 migrated 25/27 · **27/27** |
| 4 | Hover on the plate layer, measured against the selected state | **Met in light and dark on 4 of 5 migrated tiles; two carried defects, both the floor's** | `logs/hover.log` (12/18), `logs/hover-f1-v2.log` (7/12). Selected against a *hovered* sibling clears the bar in all 30 cells, 1.87-3.57×. Hover against rest moves 5.30-98.82 % of pixels in light and dark on preset, specimen, strip and V2. **F1 light, Chromium: 0.55 % with ink hidden** (R-5, reproduced; Playwright WebKit 74.66 %; no consumer rule reaches the migrated item, `harness/scenes.mjs:493-503`). **PRT: 0.00 % in 10/10 cells** (spec HF-4, the floor's `--control-surface-bg-hover` at `--glass-level` 0) |
| 5 | CX-5: does the grid belong to `cell` | **`cell` carries no grid.** K1 keeps its `grid grid-cols-2`, K2 its `.specimen-grid`, V1 its inline family rows, with no override | T-1 migrated 12/12 · 15/15; T-7 migrated 24/24 · 24/24; `captures/*-migrated-*.png` |
| 6 | X-2: a selected-ink token the stage's stroke reads | **Met: `--selection-ink`.** K2 and V1 each read it in one stateless rule (`route/migrated.mjs`) | `logs/ink.log`, both engines alike: the selected stroke is the edge ink. Selected against unselected stroke on the ground: K2 2.66:1 light, **1.56:1 dark**; V1 3.23:1 light, 2.06:1 dark. Decoration only, since the perimeter carries T-3 (R-4) |
| 7 | C-4: V1's 44 px tile at 16 px, against Q-1 | **Under Q-1 (a) it computes 16 px on a 44×44 tile and reads as a rounded square.** 44 px is V1's own layout (`.vj-tile` 2.75 rem) | `logs/corner-src-dev.log` control rows (`strip-migrated` corner 16px); `logs/states.log` (`items 1/0 44×44`); `captures/strip-migrated-{light,dark}-*.png`. The owner's glance is Q-1's |
| 8 | Canon test on the parsed selector; unit re-points pin paint, not text | **Met** | `logs/unit-canon-plants.log`: clean 45 passed; plant A (pass 1's unquoted `.toggle-group:is([data-shape=cell]) .toggle-group__item` in a second sheet) FAILS; plant B (the tile corner on `--radius-panel`) FAILS; plant C (the pill corner on `--radius-field`) FAILS; clean again after restore. The paint pins stay in T-1, T-2 and W-D, both engines |
| 9 | DEV refusal per Q-5, production arm on `dist` (H-9) | **Production arm met for every undeclared multi-row pill; DEV names met; Q-5 (d) unbuilt** | `logs/refusal-dist.log`: on `dist`, both engines, `preset`, `specimen`, `preset-verbatim` (shipped K1) and `specimen-verbatim` (shipped K2) hold at their rung through an appended line, with the extra row cut; 0 console errors. `logs/refusal-src-dev.log`: the row name at mount, 4 (K1) and 8 (K2) per arm, in both engines; 0 on `family-d-undeclared`, `single`, `vertical`, `pill-icon`, `pill-badge`, `c1-migrated`; 0 on the two declared tiles, which grow (63.58 → 83.75, 86.16 → 104.31). The corner guard: `logs/corner-src-dev.log` **24/24** (every planted 6 px item named, 0 on the controls) and `logs/corner-dist.log` 24/24 (0 named, as Q-5 (b) expects). W-E on `dist` reads 0/6 in both engines (`logs/we-dist-*.log`): D4-E's witness counts a refusal only as an error or a throw, and D′ refuses in paint. Q-5 (d) stays floor FL-1, so a consumer's dev server does not get either name |
| 10 | The bundle datum, as its own ruled row | **+4,026 B unpacked over HEAD+floor** | `logs/bundle-datum.log` at `a1732a48`: unpacked (`npm pack --ignore-scripts`, `tar -xOzf \| wc -c`) floor 2,922,724, D′ 2,926,750. Per file: `MIGRATION.md` +1,901, `dist/glass-ui.css` +937, `ToggleGroup.vue.d.ts` +379, `styles/accessibility.css` +116, two `index.d.ts` +47; the rest are hashed JS chunks. `dist`: 837 files, 2,537,228 → 2,539,353 B; JS gzip-9 280,790 → 281,035. Datum (`.bundle-ratchet`) 2,919,057. **Ruled row R-1:** landing D′ re-binds the datum to the measured unpacked total at the cut, together with the floor's +3,667. It is a deliberate rebind under G-BUNDLE-RATCHET, the owner's to rule, and not excused growth. The spec's +1,968 carried no MIGRATION rows |

### 2.1 · Every witness, both engines, unmigrated beside migrated (H-7, Q-12 (c))

Gating cells passed / measured, from `runs/dp-src/*.json`. Library = the consumer markup with its paint dropped (under D′ an undeclared group, so a pill); unmigrated = the shipped composition; migrated = this route's six migrations.

| witness | Chromium: migrated · unmigrated · library | Playwright WebKit: migrated · unmigrated · library | load at start (Chromium; WebKit) |
|---|---|---|---|
| T-1 | **12/12** · 3/6 · 5/27 (12 UNMEASURED) | **15/15** · 3/6 · 5/27 (12 UNMEASURED) | 14.17; 12.77 |
| T-2 | — · — · **22/22** | — · — · **22/22** | 13.18; 12.32 |
| T-3 | **15/18** · 12/48 · 2/39 | **15/18** · 9/48 · 2/39 | 11.89; 11.08 |
| T-4 | **16/16** · 3/24 · 8/20 | **16/16** · 3/24 · 8/20 | 10.05; 12.00 |
| T-5 | **30/32** · 19/37 · 42/72 | **30/32** · 19/37 · 42/72 | 9.80; 11.23 |
| T-6 | **25/27** · 32/40 · 27/45 | **27/27** · 32/40 · 27/45 | 13.83; 9.79 |
| T-7 | **24/24** · 4/32 | **24/24** · 4/32 | 7.90; 11.05 |
| T-8 | library 0/12, 13 UNMEASURED (one run, both engines) | | 7.41 |
| W-A | 5/9 | 5/9 | 6.42; 6.31 |
| W-B | 9/25 | 9/25 | 6.52; 7.70 |
| W-C | 0/8 | 0/8 | 7.76; 7.38 |
| W-D | **8/8** | **8/8** | 7.11; 7.02 |
| W-E | `src` 0/3; `dist` 0/6 | `src` 0/3; `dist` 0/6 | 7.02; 7.10 |

What the failing cells are (`tally.mjs --fails`):
- **Migrated, 2 of 3 classes the spec named.** T-3 `c1-migrated` 0/3 in both engines: a one-line pill row, 22.50 px² against a 224 bar, because Q-10 (b) keeps the perimeter off pills (R-2). T-5 `specimen-migrated` and `strip-migrated`: 2 stops, the second is `div.fading-scroll` (TF-6, FadingScroll's owner's). T-6 `f1-migrated` hover light 0.52 % and its PRM arm, Chromium only (R-5).
- **Unmigrated.** The shipped K1 and K2 compositions are held at their rung by M-3, so T-1 reads them "never past its rung" (UNMEASURED) and their content is cut: `captures/preset-verbatim-*.png` shows K1's names and readouts sheared at 40 px. This is R-1's cost, named at mount in DEV. `preset-verbatim` T-3 fails 3/4 on the consumer's dashed outline (light 0.00, dark 233.00, PRT 0.00 px² against 248). V2, C1 and F1's shipped compositions fail T-3 and T-1 as at HEAD.
- **Library.** `preset`, `specimen` and `preset-contents` are now held pills (UNMEASURED on T-1, see HF-5). `chipcell` 0/12 and `card` are the floor's retired bindings (FLOOR §3.2). `f1` and `v2` are not ToggleGroup sites in the library arm. T-8 reads library arms only (spec HF-3).
- **W-A, W-B, W-C, W-E** are the banked or retired families' own witnesses. W-B and W-C fail by absence of their primitives; W-E counts rows held inside the clamp and wants an error, not a cut.

### 2.2 · "Every route"

| obligation | status | evidence |
|---|---|---|
| every cell in both engines under H2, unmigrated beside migrated | done | §2.1; `logs/battery-dp-src.log` (12:00 → 12:20:59, load 14.17 → 7.09) |
| H-10 scenes | F1 migrated to `type="single" shape="cell" size="sm"`: T-1 3/3, T-3 3/3, T-4 4/4, commit green, hover R-5. V2 migrated to `type="multiple" shape="cell"` on the `<button>` host (X-4, Q-7 (a)): T-1 3/3, T-3 3/3, hover 92.25-97.14 % light/dark in both engines. C1 migrated to a vertical **pill** group: T-4 4/4, T-3 0/3 (R-2). Sibling state: item 1's `sibling` cells 18/18. Interactive descendant in production: the floor's walk, untouched by D′ (T-5 `preset-input` unchanged) | `runs/dp-src/*.json`; `logs/states.log`; `logs/hover-f1-v2.log` |
| gestalt inputs (light, dark, both engines) | 32 captures, every migrated arm beside K1's and V1's unmigrated arms. My read, for the critic to test: K1 reads as four option cards, and the selected card carries a dark (light mode) or pale (dark mode) 2 px edge, legible without colour. On V1 in dark the selected rounded square's pale edge reads close to a focus ring (Q-3, R-3). Unmigrated K1 under D′ is visibly cut (R-1). Coarse and `--ui-scale` cells are in T-1 (migrated 3/3 per scene: fine, coarse, `--ui-scale 1.25`) | `captures/*.png`; `runs/dp-src/T-1-*.json` |
| MIGRATION.md rows, with an E-11 guard for the silent bindings | written (M-9). The silent binding (a consumer corner on a tile) has a DEV guard, measured in item 9. The silent pill balloon is cut in production and named in DEV | `D4-Dp-proto.patch` (`MIGRATION.md`); `logs/corner-*.log`; `logs/refusal-*.log` |
| typecheck, unit, build | `vue-tsc --noEmit` exit 0 on both projects (`logs/typecheck-dp.log`). `vitest run` (cache pinned in scratch): 3 failed / **2327 passed** / 10 expected fail / 1 skipped; the 3 are `boot-graph`'s build arm (no built demo), the same set HEAD and the floor fail with `dist/` (FLOOR §4) (`logs/unit-dp.log`). Library build exit 0, 5.0 s (`logs/libbuild-dp.log`) | |
| real Safari | **UNMEASURED (owner's safaridriver checkbox)** in every cell. The driver's reason has changed since H2 §4.6: it now answers "You must enable 'Allow remote automation' in the Developer section of Safari Settings", not a session timeout | `runs/dp-src/T-8-both.json` |

---

## 3 · Risks and open items

| id | risk | measured | what would close it |
|---|---|---|---|
| R-1 | The unmigrated consumer pays for M-3. Shipped K1 and now also shipped K2 are cut at their rung, with names and readouts clipped | `logs/refusal-dist.log`; `captures/preset-verbatim-*.png` | the consumer migrations in their own tranches (E-6). The DEV name tells them, but only on a library `src` alias until Q-5 (d) ships |
| R-2 | C1 fails T-3 0/3 as a one-line pill row | `runs/dp-src/T-3-*.json` | an owner ruling on Q-10 |
| R-3 | The selected perimeter can read as the focus ring on small square tiles in dark | `captures/strip-migrated-dark-*.png` | Q-3 |
| R-4 | X-2's dark stroke contrast is low (K2 1.56:1) | `logs/ink.log` | decoration; the rest ink is `--muted-foreground` |
| R-5 | F1's light hover moves 0.55 % in Chromium with ink hidden; Playwright WebKit 74.66 % | `logs/hover-f1-v2.log`, `runs/dp-src/T-6-chromium.json` | the floor's hover rung on a thumbnail tile in a horizontal scroller; cause not isolated by this seat |
| R-6 | The corner guard reads at mount only: a corner class added after mount is not named | by construction (`ToggleGroupItem.vue:130-141`) | a re-read on class mutation, if a consumer is found that toggles a corner class on a tile |
| R-7 | Every DEV name is absent from what a consumer installs (TF-9, floor FL-1) | `logs/corner-dist.log`, `logs/refusal-dist.log` | Q-5 (d), a packaging wave |

**Harness findings (recorded for the next pass's checklist; REGISTRY §7.5 forbids minting them into this one):**
- **HF-5.** T-1 reads a clamped pill that holds a second row as "never past its rung" and marks it UNMEASURED. Under a route that clamps the pill, T-1 cannot see undeclared multi-row content. W-E counts the rows, and T-2 checks the corner, but no gating witness fails a held pill whose content is cut.
- **HF-6 (probe, cured in place).** `refusal.mjs --part corner` first planted the consumer corner at `DOMContentLoaded`, which fires after the module script has mounted the app, so the plant missed mount and the guard read nothing (`logs/corner-*-dcl.log`). A `<style>` appended under `<html>` at document start did not reach the cascade at all (`logs/corner-*-docstart.log`, corner 16px). The probe now plants at `readystatechange` → `interactive`, which runs before deferred and module scripts. The logs of all three runs are kept.
- **HF-2 not reproduced.** T-3 in Playwright WebKit finished the full scene list at load 11.08 (spec: 3/3 timeouts at load 28-63).
- HF-1, HF-3 and HF-4 stand as the spec records them.

**Real Safari:** UNMEASURED (owner's safaridriver checkbox), every cell.
