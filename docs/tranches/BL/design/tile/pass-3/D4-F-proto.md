# D4 · pass 3 · D4-F prototype: the anatomy declares the tile

| field | value |
|---|---|
| seat | D4 pass 3, PROTOTYPE seat for route D4-F (`#media` / `#meta` decide the tile). It implements `D4-F-spec.md` on the real source, on top of floor v2, closes the spec's §7 hand-offs, and reads every H3 witness in both engines with the unmigrated and migrated consumers side by side. Scored only against the fixed 40-row checklist (REGISTRY §P2-6.3). This is the seat's third sitting. Sitting 1 (2026-10-13) built at load 130-560 and its battery hung at 400-840 (`D4-F-proto/sitting-1/`). Sitting 2 (2026-10-14) wrote the patch and read most stages (`logs-r1/`, `runs-r1/`, partial `logs/`), then died before this document. **Sitting 3 (this one) re-read every stage on the same patch** at load 7-77, and every number below is its own |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | detached worktree at `a36fe2be` (the checkout's HEAD when the worktree was added). The task named `8d911018`; `git diff --stat 8d911018 a36fe2be -- src tests demo package.json MIGRATION.md` is empty. `floor-v2.patch` (sha1 `b04a83be`) applied first, `git apply --check` clean; then `D4-F-proto.patch`, `--check` clean |
| patch | **`pass-3/D4-F-proto.patch`**, sha1 `7313c674`, 757 lines, 8 files, +509 / −25 (`git apply --numstat`). It is the spec's `route.patch` (sha1 `b7fd4023`) plus the prototype's work in §1.2. `D4-F-proto/probes/mkpatch.sh` regenerates it from the worktree with no git write; regenerated in this sitting it is byte-identical (`cmp`) |
| defaults built | every unruled owner question at its P2-5 default, as in the spec: Q-1 (a) 16 px, Q-2 (b) flush (`plated` one value away), Q-3 the perimeter plus a mark, Q-4 (b), Q-5 (b)+(d), Q-6 (a), Q-7 (a), Q-8 (a), Q-9 (a), Q-10 (b), Q-12 (c). O-87 binds the paint: the route adds no lighting layer |
| harness | **H3 + the BL WebKit lock, hash `24182288e414`.** The checkout's `harness/lib.mjs` gained two lines in the orchestrator's commit `13975d8b` (2026-10-15 12:17): `holdWebkit()` before a WebKit launch, so one Playwright WebKit run holds the machine at a time. The other 26 files match `H3/harness-files-final.sha1` byte for byte, so no witness or judge changed. Every run JSON carries the new hash. This seat edited nothing under `../harness/` |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | Every heavy stage ran under `~/.claude/guard/guarded`, and the browser stages ran as one guarded run (queued 12:28:57, admitted 12:58:23, exit 0 at 14:13:24). 1-min load: **7-24 across the battery**, 77 at the start of the route probes (another seat's burst, falling to 11 within the stage), 7-15 for everything after. The commit cells' median frame was 8.30 ms (Chromium) and 17.00 ms (Playwright WebKit), so no cell needed a janky re-run. One Playwright WebKit page load stalled once (T-3, `__index`, light): the harness re-opened it on a new process and it read, so it is NOT-REPRODUCED (§2.2) |
| records | all under `pass-3/D4-F-proto/`: `run-proto.sh` (the driver; `SIT=s3` routes this sitting's records), `logs-s3/` (every log cited, first and last line carry the load), `runs-s3/` (battery JSON `f3p-src/` 27 files, `f3p-dist/` 6 files, the probe JSON), `shots-s3/` (40 PNG: selected and focused-selected on five sites, light and dark, two engines, plus `story/`), `glance-pair-s3/` (16 pairs, `pair.json`), `probes/` (`p3.mjs`, `story.mjs`, `story-webkit.mjs`, `unit-plants.sh`, `mkpatch.sh`, `gate-ratchet.mjs`, `vitest.wt.config.ts`). The route directory (`route.json`, `migrated.mjs`) is the spec's, `D4-F-spec/route/`, unchanged (P-3). Sitting 2's records stay in `logs/`, `logs-r1/`, `runs-r1/`, `shots/`, `glance-pair/` |

Short citations: `Fs` is `D4-F-spec.md`, `FV2` is `FLOOR-V2.md`, `H3` is `H3.md`, `L/` is `D4-F-proto/logs-s3/`, `R/` is `D4-F-proto/runs-s3/`.

---

## 0 · In brief

1. **The prototype implements the spec unchanged in mechanism**: one selector, `.toggle-group:has(.toggle-group__item > :is(.toggle-group__media, .toggle-group__meta))`, sets floor v2's `--selection-tile: flush`. The two slots are the whole public change (no prop, no value). On top of it, the prototype closes the spec's §7 hand-offs:
   - the R-13 development name, for text stacked inside the rung;
   - the forced-colours mark, which the spec painted Highlight on Highlight (1.04:1 in sitting 2's read);
   - a "Tiles" section in the toggle story;
   - the whole `vitest run`, G-BUNDLE-RATCHET, `:has()` cost (R-10) and the R-11 probe read.
2. **The migrated consumer passes every gating cell of T-1..T-8 in both engines except C1's one-row radio pills on T-3** (3 cells per engine, Q-10 at its default (b)). Migrated arm, Chromium · Playwright WebKit:

   | witness | migrated arm |
   |---|---|
   | T-1 | 15/15 · 18/18 |
   | T-3 | 40/43 · 40/43 |
   | T-4 | 24/24 · 24/24 |
   | T-5 | 38/38 · 38/38 (`dist` 38/38 · 38/38) |
   | T-6 | 33/33 · 33/33 |
   | T-7 | 24/24 · 24/24 |
   | T-8 | 27/27, one run covering both engines |

   On the library arm, T-2 reads 40/40 · 40/40 on `src` and on `dist`, and CANON 3/3 · 3/3. Every tally equals the spec's (`Fs` §2.2) and sitting 2's, at about a fifth of their load.
3. **Unit and build are clean apart from HEAD's own three failures.**
   - The whole `vitest run` (two workers) reads 2336 passed, 10 expected fail, 1 skipped, and 3 failed: the three `boot-graph` build-arm cases, which need a built `dist-demo` and fail on the floor too (`FV2` §3). The same in all 4 runs.
   - `vue-tsc` app and tests exit 0.
   - 7 of 8 unit plants bite. The eighth, the weak-observer helper, bites only under `--expose-gc` (3/3 there), as its header says (§2.1).
4. **Score: 34 rows green on their shared instrument, 6 open.** The six are T-3, E-2, R-1, R-8, G and E-4. Each waits on an owner input (Q-10, Q-5, Q-2/Q-3, the safaridriver checkbox) and is built at its default; none waits on a missing primitive. **The route is not CONVERGED** (P2-6.3: 0 open rows); it cannot be in pass 3 while E-4 waits on the owner.
5. **What this sitting found that the spec did not claim** (§6):
   - **R-13 is named, not refused.** The shared `late` probe still reads 2/6 on both development flavours. Each failing cell now carries one `[ToggleGroupItem] … asks for a second row` error, but the probe also wants the second row refused, and an inline `display: block` on a label child still paints two rows inside the pill. That half is the floor's (FV-2), and the pill-badge trade the spec named still stands. It is recorded for pass 4, not scored as a new row.
   - **Playwright WebKit closes the dev-served toggle story.** The story reads 14/14 in Chromium. In Playwright WebKit the page closes before it paints. The control probe that would separate route from demo was banked but never got a guard slot, so that is UNMEASURED (§2.6).
   - **`:has()` cost is unmeasurable in Playwright WebKit by this probe**: its timer reads 0.0 ms for both arms. Chromium reads a ratio of minima of 0.99.

---

## 1 · The mechanism

### 1.1 · What the spec built, unchanged

Line references are in the patched tree (HEAD + `floor-v2.patch` + `D4-F-proto.patch`). The spec describes each piece in `Fs` §1; the prototype changed none of these:
- **The anatomy** (`ToggleGroupItem.vue`): `defineSlots` gains `media` and `meta`. Each renders, only when filled, in a library-marked row (`<span class="toggle-group__media">`, `<span class="toggle-group__meta">`).
- **The tile rule** (`toggle-group/styles.css`):
  - the one selector sets `--selection-tile: flush` and `align-items: stretch` on the group;
  - on the item: `border-radius: var(--radius-field)`, a start-aligned column, `gap: 0.25rem`, body leading, `padding-block: 0.625rem`, and `--selection-mark` (1.125 rem, 0.875 rem at `sm`);
  - the mark on `::after`: a disc of `--selection-edge` with a check cut through it by `mask-composite: exclude`. It springs in on `--spring-press` (scale 0.4 → 1) and is sized by the room gate `min(var(--selection-mark), max(0px, (100% − 3.5 × var(--selection-mark)) × 9999))`.
- **The perimeter** (`styles.css`, the floor's `::before`) sits at inset 0, so paint containment cannot halve it (H3-7).
- **The engine's attributes are the last word**: `inheritAttrs: false`, and `bound` spreads the consumer's attributes before the roving `tabindex` and the engine's `role` / `aria-*` (H3-12).
- **FadingScroll** takes `tabindex="0"` only while it holds no tab stop. A `MutationObserver` re-reads `:is(a[href], button, input, select, textarea, [contenteditable], [tabindex]):not([disabled], [tabindex="-1"])`.
- **MIGRATION rows** as in `Fs` §5.

### 1.2 · What the prototype added (the diff between `route.patch` and `D4-F-proto.patch`)

| change | where | why | read |
|---|---|---|---|
| **R-13, the stacked-row name.** The development check counts the rows of text the item paints, as the longest chain of text boxes each with its midpoint below the last one's bottom (H3's own `rows()` rule, so a tall badge beside a label is one row). `textRows(b) > 1` joins `<br>` and "past the rung" as a reason to name. The observer also watches `class` and `style` attributes in the subtree, so a child that becomes a block after mount is re-checked | `ToggleGroupItem.vue`, the `process.env.NODE_ENV !== "production"` block | `Fs` §6 R-13 and §7 item 3: an inline `display: block` stacks a second row that fits inside the rung, so nothing is cut and nothing was named | `p3.mjs` `stack` 22/22 per flavour (§2.5); unit case and plant `stacked-rows-unnamed` |
| **The forced-colours mark**: `background: HighlightText` with `forced-color-adjust: none`, inside the tile rule | `styles.css`, tile rule | the spec painted `Highlight` in a rule outside the tile rule, and the tile rule's own `background` outranked it. Sitting 2 read the mark at 1.04:1 against the selected plate in Chromium (`logs-r1/probe-p3.log`). Under forced colours the selected plate is Highlight, so the mark must be the ink that reads on it | `p3.mjs` `forced` 4/4: 19.04:1 (Chromium), 10.54:1 (Playwright WebKit) |
| **"Tiles" in the toggle story**: a 2×2 spring-preset picker (glyph in `#media`, label, readout in `#meta`) and an `sm` `type="multiple"` set with one bare option beside two `#meta` options | `demo/stories/forms/toggle.vue` | `Fs` §7 item 4 | `story.mjs` Chromium 14/14 (§2.6) |
| **The late-content unit cases made deterministic**: `tests/utils/strongObservers.ts` makes a `MutationObserver` keep its delivery closure under a strong reference | the new test util and its three call sites (`ToggleGroup.test.ts` ×2, `fading-scroll.contract.test.ts` ×1) | happy-dom 20.10 holds an observer's callback only through a `WeakRef`. A scavenge between mount and the late mutation drops the mutation with no error, so these cases passed alone and failed in the full suite. A browser keeps the callback alive, so the components are not at fault. `letCollectorRun()` forces the collector's turn, so the plant bites | unit plants `weak-helper-gc` (3 cases fail) and `restored` (21/21) |
| MIGRATION, the silent-change row | `MIGRATION.md` | names the third reason: "…or stacks two rows of text inside the rung (a child that sets its own `display: block`)" | the `stack` probe |

No other file changed. The route still adds no prop and no value, so `refuseUnknown` (FV-10) has nothing of the route's to guard.

**The toggle-group README.** The spec owed "the toggle-group README's slots", but HEAD has no `src/components/toggle-group/README.md`. The slots are documented in their `defineSlots` doc comments, in `MIGRATION.md` and in the story. Starting a README is a library-documentation decision with no route content behind it, so the prototype did not create one.

---

## 2 · What was measured

### 2.1 · Typecheck, unit, build, bundle

| check | result | log, load (start → end) |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0, no output | `L/wt-tsc-app.log`, 12.8 → 13.4 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0, no output | `L/wt-tsc-test.log` |
| the seven lane suites (toggle-group, roving-grid, fading-scroll contract, radius-role-canon, segmented-tabs, tabs-seam, glass-subtlety) | 7 files, **151 passed, 1 expected fail** | `L/wt-unit-lanes.log` |
| the two route suites under `--expose-gc` | 2 files, **21 passed** | `L/wt-unit-route-gc.log` |
| **the whole `vitest run`** (`vitest.wt.config.ts`: the repo config, cache inside the worktree, two workers), 4 runs | each run: 240 files; **2336 passed, 10 expected fail, 1 skipped, 3 failed**. The 3 are `tests/gates/boot-graph.test.ts` "build arm" (the built demo has a `dist-demo` to measure; it is newer than its sources; the eager graph stays under the ceilings). They need a built demo the worktree does not have, and are HEAD's own (`FV2` §3) | `L/wt-unit-all.log`, `-repeat-{1,2,3}.log`, load 12.8-14 |
| **unit plants** (`probes/unit-plants.sh`), each fails exactly its own case and the tree is restored after | clean 21/21. `no-meta-row`, `consumer-attrs-last`, `second-spelling`, `port-always-a-stop`, `parked-counts-as-a-stop`, `stacked-rows-unnamed`: each **1 failed, 20 passed** on its own case. `weak-helper`: 21/21 (no bite without a forced collection at load 13). `weak-helper-gc` (`--expose-gc`): **3 failed** (the FadingScroll late stop and the two late-name cases). `restored` 21/21 | `L/wt-unit-plants.log`, 13.0 → 12.8 |
| library build (`harness/libbuild.mjs`) | exit 0, 6.7 s | `L/build-lib.log`, 13.4 |
| the four scene flavours `f3p-{src,src-dev,dist,dist-dev}` and the plated arm `f3pp-src` | built, migration D4-F `[preset, specimen, strip, f1, v2, c1]`; `dist` with 0 `development` conditions | `L/build-*.log`; source hashes at build in `L/src-at-build.sha1` |

**Bundle datum (R-9)**, by the ratchet's own measure (`floor-v2/probes/bundle.sh`, `L/bundle.log`, load 12.0):

| build | unpacked (files) | vs the datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD + floor v2 (`FV2` §5) | 2,929,522 B (843) | +10,465 | 2,541,208 B | 329,941 B |
| **HEAD + floor v2 + D4-F-proto** | **2,936,130 B (843)** | **+17,073** | **2,545,131 B, 839 files** | **330,540 B** |
| the route alone | **+6,608 B** | | **+3,923 B** | **+599 B** |

The route is 734 B larger than the spec's (`Fs` §2.1, +5,874). That is the R-13 row counter and the attribute watch, which are kept in `dist` behind `process.env.NODE_ENV` for the consumer's bundler to drop, plus one more `MIGRATION.md` clause. No file is added to the package (the new file is a test util).

**G-BUNDLE-RATCHET**, the gate's own `ratchetEvidence()` (`probes/gate-ratchet.mjs`, `L/gate-bundle-ratchet.log`, load 13.3):
- 2,919,057: `equal: true`.
- 2,929,522 (floor v2): throws `bundle ratchet increase forbidden`.
- 2,936,130 (the route): throws `bundle ratchet increase forbidden`.

The rebind is the owner's (Q-14); the floor alone already trips it.

### 2.2 · The H3 battery under `--route`

Build `f3p-src`, driver stage `battery`, 12:58:23 → 13:35:53 (`L/battery-src.log`). The cells are gating cells passed / measured, with each witness's own arm tallies. JSON: `R/f3p-src/` (27 files); `node ../harness/tally.mjs D4-F-proto/runs-s3/f3p-src [--scenes] [--fails]`.

| witness | Chromium [arms] | Playwright WebKit [arms] | load at start (C · W) | spec (`Fs` §2.2) |
|---|---|---|---|---|
| T-1 | 20/42, 12 UNMEASURED [**migrated 15/15** · library 5/27 · unmigrated 3/6] | 23/45, 12 UNMEASURED [**migrated 18/18** · library 5/27 · unmigrated 3/6] | 11.7 · 14.9 | same |
| T-2 | **40/40** | **40/40** | 20.7 · 20.6 | same |
| T-3 | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 12/48] | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 9/48] | 20.4 · 13.5 | same |
| T-4 | 36/54 [**migrated 24/24** · library 12/30 · unmigrated 3/24] | the same | 14.2 · 12.5 | same |
| T-5 | 87/116 [**migrated 38/38** · library 49/78 · unmigrated 20/37] | the same | 12.2 · 8.9 | same |
| T-6 | 64/88 [**migrated 33/33** · library 31/55 · unmigrated 34/48] | the same | 7.1 · 14.3 | same |
| T-7 | **24/24** [migrated 24/24 · unmigrated 4/32] | **24/24** [the same] | 21.8 · 21.6 | same |
| T-8 | 27/39, 13 UNMEASURED [**migrated 27/27** · library 0/12], both engines in one run; real Safari UNMEASURED (owner's safaridriver checkbox) | | 20.8 | same |
| CANON | **3/3** (48 twins, 139 corner rules) | **3/3** | 24.3 · 23.9 | same |
| W-A · W-B · W-C · W-D · W-E | 5/9 · 9/25 · 0/8 · 4/8 · 1/3 | the same | 18.5-41.1 | same |

**Stalls (E-1).** One, in T-3 Playwright WebKit (`R/f3p-src/T-3-webkit.json` `notes`): "page load stalled on __index (light): page.goto: Timeout 60000ms exceeded.; AppSSO answered (0/0 in 3 min): not the AppSSO stall; re-opened on a new browser process, NOT-REPRODUCED; load 11.50 / 13.72 / 16.06". The cell read on the new process. Playwright WebKit retired at the 60-navigation cap 1× in two runs and 2× in two runs (H3-1). No witness hung, and none printed HARNESS ERROR.

**Reading the cells.**
- **The only failing migrated cells** are `c1-migrated` on T-3: light, dark and PRT, in both engines. Each reads 0.00 px² against a 224 px² bar. Fill 1.16 / 1.22 / 1.00:1 in Chromium, 1.21 / 1.20 / 1.00:1 in Playwright WebKit. C1 is one-row radios, and under Q-10 (b) a pill carries its state on ink and weight.
- **The tiles clear the bar by 3.3-4.8×** (T-3, Chromium):
  - `preset-migrated` 1255.00 / 1269.00 / 1259.00 px² against 274, with a perimeter band of 966.00 px² in light and p95 13.86;
  - `specimen-migrated` 1272.25 / 1286.25 / 1280.25 against 303.
  The fill alone is 1.30-1.37:1; the edge carries.
- **H3-7, containment**: every migrated scene's selected edge reads 2.00 px on all four sides, uncontained and under `content-visibility: auto` (`preset-`, `specimen-`, `strip-migrated` quoted from `T-3-chromium.json`).
- **H3-8, the forced-colours ring**: 2.00 px top, right, bottom and left, unselected and selected, on `preset-`, `specimen-` and `f1-migrated` (`T-4-chromium.json`).
- **H3-9, the calm observer**: `preset-migrated` programmatic commit under `[data-reorder]` pops to 1.03 at 80 ms (Chromium) and at 78 ms (Playwright WebKit), with a bounce.
- **The commit sources** on `preset-migrated` (Chromium): keyboard 1.03 at 82 ms, programmatic 1.03 at 81 ms, pointer 1.04 at 129 ms. Each bounces, median frame 8.30 ms.
- **H3-5, hover**: `preset-migrated` ΔE 0.0947 (Chromium) and 0.0953 (Playwright WebKit) against 0.02. PRT 0.0309 in Playwright WebKit. A coarse tap leaves no hover behind (scale 1.00, 0.00 % moved).
- **H3-12**: `preset-consumer-aria` reads group `radiogroup`, items `radio`, **1 tab stop**, and ArrowRight moves and checks.
- **T-5**: `specimen-migrated` and `strip-migrated` read **1 tab stop each** (FadingScroll's port gives way).
- **The shipped K1** (`preset-verbatim`, the gating unmigrated arm) reads on T-3 0.00 / 233.00 / 0.00 px² against 248 (Chromium) and 0.00 / 217.00 / … (Playwright WebKit). That is R-1's.
- **The library and unmigrated arms** fail where they failed on the floor, for the floor's reasons (`FV2` §4.2, `Fs` §2.2).

### 2.3 · The `dist` cells

Build `f3p-dist`, stage `dist`, 13:35:53 → 13:40:54, load 24-77 (`L/battery-dist-*.log`, `R/f3p-dist/`).

| cell | Chromium | Playwright WebKit |
|---|---|---|
| T-5 on `dist` | 88/117 [library 50/79 · unmigrated 20/37 · **migrated 38/38**]. `tabs-retired` **refused** (`TypeError: [SegmentedTabs] semantics="toggle" is not one of …`). `preset-input` PASS (ArrowRight typed in the `<input>` stays there, selection unchanged) | the same |
| T-2 on `dist` (the one-row law in what a consumer installs) | **40/40** | **40/40** |
| W-E on `dist` (E's retired witness) | 1/6 | 1/6 |

### 2.4 · The development names, per flavour

`floor-v2/probes/tile-fact.mjs --part names`, 4/4 cells per flavour (`L/floor-names-*.log`, load 6.6-9.6):

| flavour | a late `<br>` | `preset-input`'s `<input>` |
|---|---|---|
| `src` (production) | silent | silent |
| `src-dev` | named | named, 1 error |
| `dist` | silent | silent |
| `dist-dev` | named | named, 1 error |

### 2.5 · The route's probes

**The spec's `f3.mjs`** (`L/probe-src.log`, load 77 → 18; gating **26/26**):

| section | reading, both engines unless split |
|---|---|
| flip 3/3 per engine | rest: pill 4/4, tile `none`, `::before` 0, no `::after`. A `#meta` row appended to item 0: tile 4/4 at 66.34 px, 16 px, tile `flush`, perimeter 1, `::before` 1, `::after` 1. Removed: pill 4/4 again |
| mark 10/10 per engine | `preset-migrated` md, padding box 202 px vs 3.5 marks 63 px: **18 px**, overlaps nothing. `specimen-migrated` sm 203 vs 49: **14 px**. `f1-migrated` md 72 vs 63: **18 px**. `v2-migrated` 450: **18 px**. `strip-migrated` sm, **38 < 49: 0 px, no mark**. Light and dark |
| occlude (reported) | the mark's disc over content ink, block-start / block-end corner: K1 0.0 / 0.0 %; F1 0.0 / 0.0 %; K2 10.8-11.4 / 8.3-9.0 %; V2 48.6-49.5 / 0.0 % |
| rest (reported) | flush: the unselected plate is the host's, ΔE 0.0000, blur `none`, light and dark, K1 and K2. Plated (`f3pp-src`, `L/probe-rest-plated.log`): ΔE 0.0478-0.0984 from the host in light and 0.0215-0.0239 in dark, `blur(14px) saturate(1.5)` on K1 |
| ring (reported) | focused-selected: ring `solid 2px`, offset 2 px, the foreground at 0.48 α; perimeter 2 px at inset 0, the foreground solid |
| nest (reported) | a tile group inside a wrapper inside a pill group: the outer group's items read tile 4/4 (`Fs` §6 R-4, unchanged) |
| unmig (reported), per flavour (`L/probe-unmig-*.log`) | `preset` 204×40 and `preset-verbatim` 208×40: one row, 0/4 past the plate, 3/4 and 2/4 rows clipped or ellipsized inline, 0 names in any flavour. **`specimen` and `specimen-verbatim` 207×36: 8/8 items with content past the plate, up to 50.92 px**; 8 names on `src-dev` and `dist-dev`, 0 on `src` and `dist` |

**The prototype's `p3.mjs`** (`L/probe-p3.log`, load 10.7-14.5; gating **26/26**; `stack` re-run per flavour, 22/22 each):

| section | reading |
|---|---|
| **stack** (R-13), Chromium and Playwright WebKit | `rest`: the five gating pill scenes (`single`, `vertical`, `pill-icon`, `pill-badge`, `family-d-undeclared`) as mounted carry **0 names** in every flavour, so a tall badge or an icon beside a label is one row and the name is not noise. `style` (a `<span style="display:block">` appended 1.1 s after mount) and `class` (an inline span made a block by a class 300 ms later): on `single` (36 px rung) and `pill-badge` (40 px), 3 text rows painted inside the plate. **Named exactly once** on `src-dev` and `dist-dev` (`[ToggleGroupItem] value="All" asks for a second row …`); **0 names on `src` and `dist`**. `inline` (control): 1 row, 0 names. 22/22 per flavour (`L/probe-p3-stack-{src-dev,dist,dist-dev}.log`) |
| **forced** | `preset-` and `specimen-migrated` under forced colours, the mark at its nominal size: Chromium `rgb(255 255 255)` on the selected plate `rgba(5 0 73 / 0.8)` (Highlight), **19.04:1**, `forced-color-adjust: none`. Playwright WebKit `rgb(0 0 0)` on `rgba(128 188 254 / 0.6)`, **10.54:1** (it reports `forced-color-adjust` as undefined and keeps the author fill, which reads) |
| **settle** (`Fs` R-11) | `specimen-migrated` selected plate sampled 2 frames, 700 ms and 1500 ms after load, 3 px and 8 px inside the border box. Chromium light: 3 px reads `177 174 171` and 8 px reads `198 195 192` at every time; Playwright WebKit reads `198 195 193` at both depths. **Not a settle effect.** The value is constant over 1.5 s, the 8 px sample matches Playwright WebKit, and the tile sits at a fractional y (118.53 in Chromium against 118.50), so the 3 px strip lands on the inner antialiased edge of the 2 px perimeter. T-3's fill read (1.30:1 in both engines) is the record. R-11 is closed as the probe's sample geometry |
| **cost** (`Fs` R-10) | 200 tiles, 40 forced style + layout passes per round, 9 rounds. Chromium: the `:has()` rule min 8.6 ms, median 8.7 ms, against the same rule keyed on a class min 8.7, median 9.2. **Ratio of minima 0.99** (load 10.7). Playwright WebKit: **0.0 ms on both arms**, so the probe's clock cannot see WebKit's forced style pass and the ratio is NaN. UNMEASURED in Playwright WebKit by this instrument |

**The pass-2 prototype probe, unchanged** (`../pass-2/D4-F-proto/probe.mjs --only q2,q3,q5,hover,ink,double,contrast`, `L/proto-probe-src.log`, load 6.6 → 8.4): **114/114**:
- q2 18, q3 10, q5 46, hover 16, ink 12, double 4, contrast 8.
- The selected tile against a **hovered** sibling: 1236.25 px² against 274 (K1 light), 1247.75 (K1 dark), 1258.25 and 1268.25 against 303 (K2).
- double: 2 kicks on the re-committed item (1.028 at 84 ms and at 384 ms), median frame 8.3 ms.
- contrast: under contrast-more and under forced colours the selected tile keeps a 1 px border, content level with its unselected sibling's (+13, +11), perimeter opacity 1.

**The shared critic probe** (`../pass-2/D4-F-crit/probes/crit.mjs`, unchanged; load 10.3-14.9):

| part | build | cells | log |
|---|---|---|---|
| plants (kick0, perim0, perim0mark0, pill: each fails the witness it aims at) | `src` | **76/76** | `L/shared-crit-plants.log` |
| tone (X-7: edge, label ink and painted interior each move, `preset-`, `specimen-`, `strip-migrated`, light and dark, two tones) | `src` | **24/24** | `L/shared-crit-tone.log` |
| desc (X-5) | `src-dev` | **2/2** | `L/shared-crit-desc.log` |
| x3 (X-3) | `src` | **4/4** | `L/shared-crit-x3.log` |
| x6 (X-6) | `src` | **2/2** | `L/shared-crit-x6.log` |
| br (a `<br>` in the label, one row shows) | `dist` | **8/8** | `L/shared-crit-br-dist.log` |
| **late** (a `<span style="display:block">` appended in the label: one row must show, and a development build must name it) | `src-dev`, `dist-dev` | **2/6 on each**. The four fails are `single` and `pill-badge` in both engines: label 30.91 / 35.13 px in a 36 / 40 px pill, 3 text rows painted inside the plate, `NOT refused`, **`[ToggleGroupItem] errors 1`** (the R-13 name). The two passes are the reported `preset-migrated` lines | `L/shared-crit-late-*.log` |

**CANON plants** (`harness/canon.mjs --plant`, `L/canon-plant-*.log`, load 10.0-10.3): **6/6 fail as planted**. A 2/3 and S 2/3 fail on the tile cell; H 1/3 fails on the tile and pill cells. Both engines, 48 twins, 139 corner rules, tile spelling read from `route.json` `canon.sel`.

**The glance pair** (`harness/film.mjs --pair`, H3-13; `L/film-pair*.log`, load 10.0-10.6): **16 pairs, exit 0**. `preset` and `specimen` × light, dark × fine, coarse × both engines, rows flush over plated, columns selected and focused-selected. Every frame passed its label check. In `glance-pair-s3/`, with `pair.json`.

### 2.6 · The story section, and Playwright WebKit on the demo

`probes/story.mjs` serves the worktree's own demo (vite dev, cache inside the worktree) and reads `/forms/toggle` (`L/story.log`, load 10.1 → 9.5).

**Chromium, light and dark: 14/14.**
- "Spring preset" (radiogroup, md): fact `flush`, 4 items 216×102.08, corner 16 px (= the field token); the selected item has perimeter 1 and an 18 px mark at opacity 1.
- "Mix sources" (group, sm): fact `flush`, 3 items 141.33×67 (the bare "Mono" option is one height with its `#meta` siblings), corner 16 px; selected, mark 14 px.
- "Text styles", "Text alignment", "Interface density", "Deployment region", "Frozen" stay pills: fact `none`, corner h/2.
- 0 console errors naming ToggleGroup.

**Playwright WebKit**: the page closed before the first `.toggle-group` painted (`page.waitForSelector: Target page, context or browser has been closed`). Sitting 2 read "Page crashed" at the same line (`logs-r1/story.log`).

**Route or demo? Unmeasured.** The control (`probes/story-webkit.mjs`) opens the route's page and two control pages the route does not touch (`/forms/inputs`, `/forms/slider`) in Playwright WebKit, twice each, under the BL WebKit lock. It queued in the guard at 14:14:49, was never admitted in 97 minutes while the load rose to 94-153, and was cancelled at 15:52:41 before any browser launched (`L/story-webkit.log`). So whether Playwright WebKit crashes the demo or the route's page is **UNMEASURED**. One fact bounds it: the H3 battery reads every route cell in Playwright WebKit on built scenes that carry the same markup as the story's tiles. The probe is banked for the critic to run.

---

## 3 · The work list: the spec's hand-offs (`Fs` §7) and pass 2's open rows

| item | answer | state |
|---|---|---|
| `Fs` §7.3, R-13: name two stacked rows inside the plate, re-read shared `late` | built (§1.2). Named once on `src-dev` and `dist-dev`, silent in production, 0 false names on the five gating pill scenes (`stack` 22/22 per flavour). Shared `late` 2/6: named, not refused | **name closed; refusal is the floor's (FV-2) and Q-5's** (§6 P-1) |
| `Fs` §7.4, "Tiles" in the toggle story | built; Chromium 14/14 | closed in Chromium; Playwright WebKit per §2.6 |
| `Fs` §7.4, the toggle-group README's slots | no README exists at HEAD; slots documented in `defineSlots`, `MIGRATION.md`, the story | not created (§1.2) |
| `Fs` §7.4, the whole `vitest run` | 2336 passed, 3 HEAD `boot-graph` failures, ×4 | closed |
| `Fs` §7.4, G-BUNDLE-RATCHET | throws on the floor and on the route | the owner's rebind (Q-14) |
| `Fs` R-10, `:has()` cost | Chromium ratio of minima 0.99; Playwright WebKit unmeasurable by this probe | closed in Chromium; WebKit UNMEASURED |
| `Fs` R-11, the probe's plate read | sample geometry on the perimeter's antialiased edge, not settle | closed |
| the forced-colours mark (found by this seat in sitting 2) | `HighlightText` on Highlight, 19.04:1 | closed |
| pass 2's twelve rows (`Fs` §3) | re-read here: unchanged from the spec's answers | as `Fs` §3: rows 2, 3, 4, 5, 7 (CX-1, late), 8, 10 closed; 1, 6, 9, 11, 12 open on Q-10, Q-5, Safari, Q-2/Q-3 |

---

## 4 · The fixed checklist (REGISTRY §P2-6.3), row by row

Every reading is this sitting's, on `f3p-*`, Chromium · Playwright WebKit. A row that waits on an owner ruling is built at its default and marked **OPEN**, never claimed passed.

### T (8)

| row | instrument | reading | status |
|---|---|---|---|
| T-1 | `t1-corner-stops.mjs`, migrated arm at fine, coarse, `--ui-scale 1.25` | 15/15 · 18/18 | **PASS** |
| T-2 | `t2-one-line-stadium.mjs` incl. H3-3, H3-6 | 40/40 · 40/40 on `src`; 40/40 · 40/40 on `dist` | **PASS** |
| T-3 | `t3-selected-separates.mjs` incl. H3-7, H3-11 | migrated 40/43 · 40/43; the 3 are `c1-migrated` (0.00 px² vs 224). Shipped `preset-verbatim` 0.00 / 233.00 / 0.00 vs 248 | **OPEN: Q-10 (C1), Q-5 (the shipped arm)** |
| T-4 | `t4-ring-whole.mjs` incl. H3-8 | migrated 24/24 · 24/24; forced ring 2.00 px every side | **PASS** |
| T-5 | `t5-one-of-n-keys.mjs` incl. H3-10, H3-12 | migrated 38/38 · 38/38 (`dist` 38/38 · 38/38); consumer-aria `radio`, 1 stop; `tabs-retired` refused on `dist` | **PASS** |
| T-6 | `t6-engagement.mjs` incl. H3-5, H3-9 | migrated 33/33 · 33/33 | **PASS** |
| T-7 | `t7-no-consumer-paint.mjs` | 24/24 · 24/24 | **PASS** |
| T-8 | `t8-both-engines.mjs` (H3-2) | migrated 27/27; Safari UNMEASURED (owner's safaridriver checkbox) | **PASS on two engines** (Safari is E-4) |

### X (7)

| row | instrument | reading | status |
|---|---|---|---|
| X-1 sibling state | T-3 `preset-sibling-migrated` (H3-11) | passes light, dark, PRT, both engines (migrated 40/43 holds only C1's three fails) | **PASS** |
| X-2 media ink | pass-2 probe `ink` | 12/12 (6 per engine); 0 consumer `[data-state]` rules | **PASS** |
| X-3 no slot re-render | shared `x3` | 4/4 | **PASS** |
| X-4 multi-select arm | T-1, T-3, T-7 on `v2-migrated` | in the migrated tallies above, all passing; the story's `type="multiple"` sm set tiles (§2.6) | **PASS** |
| X-5 interactive descendant named | shared `desc`; floor `names` | 2/2 on `src-dev`; `names` 1 error per engine on `src-dev` and `dist-dev`, silent on `src` and `dist` | **PASS** |
| X-6 deselectable single | shared `x6` | 2/2 | **PASS** |
| X-7 tone on edge, tint, label ink | shared `tone`, scored as written | 24/24 | **PASS** |

### FV (10), read under the route

| row | reading | status |
|---|---|---|
| FV-1 floor items 1-5 | T-6, T-7 pointer segments read in Playwright WebKit; perimeter plants fail (76/76); walk and reorder green on every migrated grid | **PASS** |
| FV-2 the pill's one row | T-2 40/40 · 40/40 on `src` and `dist` with the tile rule in the sheet; the no-anatomy scenes stay pills (q2, story). Residue outside H3-3's three cases: shared `late` 2/6 (§6 P-1) | **PASS on its H3 witness**; P-1 recorded for pass 4 |
| FV-3 one commit kick | T-6 keyboard, programmatic, calm-observer and pointer on every migrated scene; double commit 2 kicks; `kick0` plant fails | **PASS** |
| FV-4 X-7 whole | as X-7 | **PASS** |
| FV-5 the Q-9 (a) exemption | contrast 8/8; the route writes no exemption | **PASS** |
| FV-6 the row-clustering walk | q2's mixed 2×2 and the centred unequal row, inside 18/18 | **PASS** |
| FV-7 names and late content | `names` 16/16 over four flavours; late `<br>` named on both development flavours; R-13's stacked row now named too (`stack` 22/22 per flavour) | **PASS** |
| FV-8 the hover rung | ΔE 0.0947 · 0.0953 at rest, PRT 0.0309 (Playwright WebKit) | **PASS** |
| FV-9 the flush arm | flush ΔE 0.0000 from the host; plated 0.0215-0.0984; the pair filmed | **PASS as a mechanism** (which arm ships is Q-2's) |
| FV-10 one guard policy | the route adds no public value; `tabs-retired` refused on `dist`, both engines | **PASS** |

### R (10)

| row | reading | status |
|---|---|---|
| R-1 unmigrated consumer legible, its fault named under Q-5 on `dist` | K1: one row, nothing past the plate, 3/4 · 2/4 rows ellipsized inline, named in no flavour; shipped K1 0 / 233 / 0 px² on T-3. **K2: 8/8 clipped up to 50.92 px; 0 names on `dist`, 8 on `dist-dev`** | **OPEN: Q-5** |
| R-2 the H-2 pair | q3 10/10; flip 3/3 per engine; T-2 `family-d-undeclared` within 40/40 | **PASS** |
| R-3 the commit on H-4, three sources, Tab entry still, plant-checked | T-6 33/33 · 33/33; `kick0` fails | **PASS** |
| R-4 hover against selected, light, dark, PRT | 1236.25-1268.25 px² against 274 / 303 with the sibling hovered; PRT hover ΔE 0.0309 with T-3 PRT 1259.00 | **PASS** |
| R-5 X-2 with the dark stroke contrast | ink 12/12; the selected media stroke follows `--selection-ink` (the spec's 12.18:1 dark, 10.88:1 light, computed from the same tokens, unchanged by this patch) | **PASS** |
| R-6 the comfort axis | T-1 migrated; q5 46/46 | **PASS** |
| R-7 canon unit fails plants A, S, H | clean 3/3 · 3/3; A 2/3, S 2/3, H 1/3, both engines | **PASS** |
| R-8 refusal per Q-5 on `dist`, incl. CX-1 and late content | T-2 on `dist` 40/40 · 40/40; shared `br` on `dist` 8/8; shared `late` 2/6 on each development flavour (named, not refused) | **OPEN: Q-5** |
| R-9 the bundle datum | +6,608 B over floor v2, +17,073 over the datum; G-BUNDLE-RATCHET throws | **PASS as a stated datum** (rebind is Q-14's) |
| R-10 "is a tile" spelled once | unit "the sheet spells 'is a tile' once" passes and fails the `second-spelling` plant; CANON 3/3 reads one rule reaching a tile; the development check reads the computed `--selection-tile`, not the anatomy | **PASS** |

### E (4) and G (1)

| row | reading | status |
|---|---|---|
| E-1 every cell readable in both engines | 27 battery runs + 6 `dist` runs, 0 hangs, 0 HARNESS ERROR; one Playwright WebKit stall, NOT-REPRODUCED on a new process. The story's Playwright WebKit crash is a dev-served demo page, not an H3 cell (§2.6) | **PASS** |
| E-2 the H-10 scenes | F1: T-1, T-3, T-4, T-6, T-7 pass. V2: T-1, T-3, T-7 pass. Sibling state: X-1. Interactive descendant in production: `preset-input` PASS on `dist`. Keyed reorder: T-5 `preset`. Deselectable single: X-6. **C1: T-3 0/3** | **OPEN: Q-10** |
| E-3 MIGRATION rows with E-11 guards per Q-5 | every row names its witness (`Fs` §5, plus the R-13 clause, checked by `stack`) | **PASS for the claims** (the guard channel is Q-5's) |
| E-4 real Safari | UNMEASURED (owner's safaridriver checkbox), every cell | **OPEN: the owner's** |
| G the gestalt | frames: `shots-s3/` (40 PNG), `glance-pair-s3/` (16 pairs), `shots-s3/story/`. Card-like: 16 px at every size. Selection without colour: a 2 px edge, a plate where siblings have none, a check where there is room (none on V1's 40 px glyph tile), a full-contrast stroke. Apart from the ring: 3 px apart and different in weight, still two outlines when focused and selected. Uncluttered: flush. O-87: no lighting layer; the commit is a 2.8 % pop with a bounce, the mark springing in and the perimeter's attack | **OPEN: Q-2, Q-3** |

**Tally: 34 PASS on their shared instrument, 6 OPEN (T-3, E-2, R-1, R-8, G, E-4), each on an owner input.** Not CONVERGED.

---

## 5 · Unmigrated and migrated, side by side (the consumer's view)

| site | unmigrated (as shipped, on the route) | migrated (`route/migrated.mjs`) |
|---|---|---|
| K1 `preset` | 204×40 pill, one row, 3/4 rows ellipsized, T-3 shipped arm 0 / 233 / 0 px² vs 248, no name in any flavour | 204×70.58 tile, 16 px; T-3 1255 / 1269 / 1259 px² vs 274; mark 18 px, 0 % occlusion |
| K2 `specimen` | 207×36 pill, 8/8 items cut up to 50.92 px; named 8× in development, silent in production | 205×98.16 tile, 16 px; T-3 1272.25-1286.25 vs 303; 1 tab stop in its FadingScroll; mark 14 px |
| V1 `strip` | consumer Chips (the route migrates them) | 40×58.8 `sm` tile; 1 tab stop; no mark (38 < 49 px) |
| F1 | consumer Buttons | 74×118.42 tile; hover ΔE 0.09; mark 18 px, 0 % occlusion |
| V2 | consumer | 452×106.34 `multiple` tile; mark 18 px over the thumbnail (48.6-49.5 %) |
| C1 | consumer radios | one-row pills; T-3 0.00 px² (Q-10) |

---

## 6 · Risks and what this sitting found

| id | finding | measurement | owner |
|---|---|---|---|
| **P-1** | **R-13 is named but not refused.** A label child with its own `display: block` (inline style or a utility) stacks a second row that fits inside the rung. The route now names it on every development build, but the pill still paints two rows. The shared `late` cell wants both, so it stays 2/6. Refusing it means a label-level `1lh` clamp or `display: inline !important` on label children, and either one trades against Badge's own display inside a pill (`Fs` R-13). This is a new defect class against the shared probe: **recorded for pass 4**, not a new row | `L/shared-crit-late-*.log`: label 30.91 / 35.13 px, 3 rows inside, errors 1 | the floor (FV-2), Q-5 |
| **P-2** | **Playwright WebKit closes the dev-served toggle story** before it paints (sittings 2 and 3). Whether the route or the demo causes it is UNMEASURED: the control probe never got a guard slot (§2.6). The H3 battery's built scenes read every route cell in Playwright WebKit | `L/story.log`, `L/story-webkit.log` | the critic: run `probes/story-webkit.mjs` |
| **P-3** | **`:has()` cost is a Chromium-only number.** Playwright WebKit's forced style pass reads 0.0 ms on both arms | `L/probe-p3.log` `cost` | a later probe with a WebKit-visible clock |
| **P-4** | The unit drivers need a worktree-root `vitest.wt.config.ts` that the spec did not bank. It is banked now (`probes/vitest.wt.config.ts`) | | |
| R-1 (spec) | unmigrated K2 breaks silently in production | 8/8, up to 50.92 px, 0 lines on `dist` | Q-5 |
| R-2 (spec) | C1 has no passing answer under the anatomy at Q-10 (b) | 0.00 px² vs 224, 3 modes, both engines | Q-10 |
| R-3 (spec) | focused and selected still shows two outlines (3 px apart, different weight, plus the mark) | `shots-s3/*-focused-selected.png`, `glance-pair-s3/` | Q-3 |
| R-4 (spec) | a tile group nested in a pill group makes the outer group tiles | `nest` 4/4 | the critic |
| R-5 (spec) | on the flush arm the hover is a larger step than the selected tint | hover ΔE 0.0947 vs the selected plate's 0.0764 (`Fs`); selection still separates from a hovered sibling | Q-2 |
| R-6 (spec) | the mark sits on media (V2 thumbnail corner, K2 curve end) | occlude 48.6-49.5 % V2, 8.3-11.4 % K2 | the critic |
| R-7 (spec) | the room gate's 3.5 is a judgement | F1 72 px vs 63 | the critic |
| R-8 (spec) | the FadingScroll change reaches every FadingScroll | unit 1 case, 2 plants | FadingScroll's owner |
| R-9 (spec) | `inheritAttrs: false` overrides a consumer `aria-checked` / `aria-pressed` too | unit pins `data-*` and `title` landing | the critic |
| R-12 (spec) | real Safari | UNMEASURED (owner's safaridriver checkbox) | owner |

---

## 7 · Fence notes

- No tracked source in the checkout was edited, and no git write ran in the checkout beyond `git worktree add` and `git worktree remove --force`. The worktree is removed.
- Writes inside the checkout are all under `docs/tranches/BL/design/tile/pass-3/`:
  - this file and `D4-F-proto.patch`, unchanged from sitting 2 (byte-identical regeneration);
  - three new probe files (`probes/gate-ratchet.mjs`, `probes/story-webkit.mjs`, `probes/vitest.wt.config.ts`);
  - one edit to `D4-F-proto/run-proto.sh` (the `SIT` routing, made before any stage ran);
  - the driver's own outputs (`logs-s3/`, `runs-s3/`, `shots-s3/`, `glance-pair-s3/`).
- Every heavy run went through `~/.claude/guard/guarded`. One queued per-stage chain was cancelled while it waited for a slot (no stage had started) and was replaced by a single guarded run.
- Nothing under `../harness/` was touched. The harness hash changed under this seat because of the orchestrator's WebKit-lock commit (`13975d8b`), as recorded above.
- Real Safari: UNMEASURED (owner's safaridriver checkbox), every cell.
