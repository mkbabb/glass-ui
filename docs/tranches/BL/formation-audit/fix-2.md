# BL — formation fix, seat 2

| field | value |
|---|---|
| seat | formation fix seat 2, before audit pass 2. Answers `formation-audit/pass-1.md` (FA-01 to FA-21 and its four notes) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `183e021a` for every probe (a scratch worktree at `HEAD`, `node_modules` and `tests-visual/node_modules` symlinked; removed before return). `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0. The 10.1.0 tarball was packed from that tree for W-0.7's markers |
| engines | Chromium (Playwright's) and Playwright WebKit 26.5. Playwright WebKit is not Safari; every real-Safari cell is UNMEASURED (OW-3) |
| writes | `PLAN.md`, `waves/INDEX.md`, `LEDGER.md`, the wave specs named below, nine new specs, this file. Nothing under `design/`, no tracked source, no git write |
| probe | the fixture app in appendix P (`App.vue`, `build.mjs`, `measure.mjs`, `acc.mjs`). A spec row that says "fix-2's probe, scene `x`" means this app (PLAN §1) |

## Result

All 21 findings are cured in the plan folder; none is refuted. The shape of the cures:

- Nine new waves: W-0.8, W-0.9, W-0.10 (band 0, the owner-ratified inbound), W-E.14, W-H.5, W-I.5, W-I.6, W-I.7, W-K.11 (a wave of its own for each disease row). INDEX and PLAN count 99 waves.
- One DAG: PLAN §5 is the only record of edges. Every spec's `depends on` cites it; the table is generated and checked acyclic (99 waves, 0 cycles).
- Every LEDGER row is terminal. No row reads UNPLACED, no row reads `[M]`. OW-9 is split per deciding wave (OW-9a..d) and OW-12 is added.
- Decide-wave gates no longer re-read the ledger. Each is the enactment in the tree, or an owner docket gate that is RED while the docket row reads `pending`.

Docket gates run against the edited `LEDGER.md` (`grep -qE '^\| OW-n \|.*\| pending \|' LEDGER.md`, exit 0 means pending, so the `!` gate exits 1): OW-4, OW-5, OW-6, OW-7, OW-8, OW-9a, OW-9b, OW-9c, OW-9d and OW-12 all pending, all gates exit 1.

## Findings

### FA-01 · B1-G1 GREEN at HEAD (and the same premise in W-H.2 G10, W-L.8 G-L8-7)

Cured. B1-G1 and B1-G5 are struck with the note that the ledger exists at `ae8370e0` and its rows are at `LEDGER.md` §6.1 (`W-B.1.md:105`). W-H.2 G10 is now OW-8's docket gate, exit 1 (`W-H.2.md:123`). G-L8-7's premise is corrected: the ledger exists, the checker does not (`W-L.8.md:102`).

### FA-02 · Gates neither RED nor hold lines

Cured per gate.

- **K7-G13** is a hold line with a bite (`W-K.7.md:76`). The probe (scene `dtrig`, collapsing GlassDock with a `DockTrigger for="select"`, first expand, Chromium) reads 0 running animations on the trigger's `::before`. O-64 R-5 is RETIRE NOT-REPRODUCED with a re-trigger (a headed real-GPU reproduction; `W-K.7.md:25`, LEDGER).
- **G6-G4** is struck (`W-G.6.md:88`). R2-02-15 and KFA-164 are RETIRE NOT-REPRODUCED (one 55 ms frame in 8 opens), re-trigger 3 or more of 8 cold opens over 50 ms. Appendix C stays as the re-trigger's instrument.
- **W-I.1 G22** (hallmark witnesses) moved with the hallmarks to W-I.6. I6-G1 is `test -f tests-visual/wired/dock-hallmarks.spec.ts`, exit 1 (`W-I.6.md:44`).
- **W-J.1 G15** is struck (`W-J.1.md:192`).
- **W-J.2 G4, G5** are struck. The battery they named is the D5 gate's (PLAN §4, the W-J.2 row at `PLAN.md:251`).

### FA-03 · B6-G4 greps a plan file

Cured. B6-G4 is struck (`W-B.6.md:49`). The HandMark band is W-H.1 G18, a paint hold line (`W-H.1.md:160`). Probe scene `handmark`, ink against band: 10.86 light, 6.37 dark, the same in Chromium and Playwright WebKit. Passes at ≥ 4.5:1; the bite is a muted rung under 4.5. PNG sha256 prefixes: `e21c0da9c262`, `7ddbea0d9e73`, `23b6a9b44efe`, `146dfd738dd9`.

### FA-04 · Decide-wave gates the ledger already satisfies

Cured. PLAN §1 states the rule: a decide wave's gates are its enactment in the tree, plus an owner docket gate where the owner rules. Per gate:

| gate | now |
|---|---|
| B4-G3 | OW-7 docket, exit 1 (`W-B.4.md:28`) |
| B5-G3 | struck; C-4's terminal cited (`W-B.5.md:52`) |
| B6-G3 | OW-4 docket, exit 1 (`W-B.6.md:47`) |
| B7-G2 | struck; #44's terminal cited (`W-B.7.md:38`) |
| B9-G3 | struck; #45a/b and R2-06-04 cited (`W-B.9.md:41`) |
| B10-G2 | OW-6 docket, exit 1 |
| B11-G1 | struck; #78 cited (`W-B.11.md:41`) |
| B12-G1 | struck; #64b cited |
| B14-G1 | OW-9a docket, exit 1 (`W-B.14.md:37`); B14-G3 struck |
| B15-G2 | OW-9b docket, exit 1 (`W-B.15.md:41`) |
| W-H.2 G10 | OW-8 docket, exit 1 |
| W-H.3 G1 | OW-9c docket, exit 1 (`W-H.3.md:70`); G2 struck |
| W-H.4 G5 | struck; #60a and #69 cited (`W-H.4.md:79`) |
| W-I.4 G1 | OW-9d docket, exit 1 (`W-I.4.md:76`); G2 struck |
| G-L1-20 | struck with G-L1-6 (the anchor moved to W-0.10) |

The ledger line numbers cited in these notes were re-derived after the ledger edits (each cite mapped by row id from `git show HEAD:…/LEDGER.md` to the edited file).

### FA-05 · K-band gates with no pass bound

Cured. W-K.6, W-K.7, W-K.8, W-K.9 and W-K.10 §5 are per-id tables, each row with a numeric or boolean pass criterion (`W-K.6.md:52`, `W-K.7.md:38`, `W-K.8.md:32`, `W-K.9.md:32`, `W-K.10.md:31`). "Titles differ" became K6-G11: `document.title` starts with the route's h1 on `/forms/checks` and `/data/table`. "Focus moves" became K6-G12: ArrowDown moves focus to the next radio and checks it. The appendix code reads both. K6-G24 was measured: the menu link row is a `DIV` `menuitem` with a nested `<a>`, and keyboard select leaves the hash empty. FAIL in both engines.

### FA-06 · W-0.2's hold line misses the neutral edge

Cured (`W-0.2.md`). The cure template has `<edge>`, `<fill>`, `<ink>` and `<hover>` slots from D3. With no tint, the ring falls back to `var(--toggle-tint, transparent)` and the fill to `--foreground` at HEAD's 12 %/16 %. G2 (`:72`) is a neutral hold on four slots, read in both engines:

| slot | Chromium | Playwright WebKit |
|---|---|---|
| fill | `#d3d1cc` / `#25221d` | `#d2d0ca` / `#24201d` |
| ink | rgb(28,25,23) / rgb(233,230,226) | same |
| edge | `#bab7b0` / `#403e38` | `#bab7b3` / `#403d39` |
| ring slot | `rgba(0,0,0,0)` | same |

The bite is the old 40 % foreground ring. §6 gains the neutral π pair; sha256 prefixes are `47c706b167d0`, `d5145ed324be`, `712cfb78eb38` and `68b95e567bbb`.

### FA-07 · Band-0 gates certify the O-77 cure O-77a rejects

Cured. W-0.3 is rewritten to O-77a. G1 checks for no ellipsis at 600, 342 and 260 px (7 of 9 FAIL per engine). The other gates:

| gate | check | reading at HEAD |
|---|---|---|
| G2 | stacked, not squeezed | RED |
| G3 | chevron and actions on line 1 | hold: lineMid 52.4 = chevron mid = actions mid |
| G4 | `! grep -qE 'configurator-section-label truncate\|"truncate text-micro' …/ConfiguratorLayer.vue` | exit 1 |
| G5 | `flex-wrap: wrap` in `.configurator-layer-heading` | exit 1 |
| G6 | the O-68 test | hold |

Layer PNG sha256 prefixes: Chromium `5e8cd5201bd4`, `bdcdb8d7f948`, `27d55ad1f129`; WebKit `01ed8454e39a`, `93e4c5cafae9`, `dc8a274a0dcc`.

W-0.7 G5 (`:86`) is rewritten to the new markers, read from the 10.1.0 tarball packed here:

| marker | count |
|---|---|
| the `flex-wrap` marker | 0 |
| `dock-cap-rest: ?50%` | 1 |
| `min-inline-size: ?3ch` | 1 |
| `var(--type-body) * 1.272` | 2 |
| `reference` in the PopoverContent d.ts | 0 |
| `reference` in the TooltipContent d.ts | 0 |

### FA-08 · Capture roots split

Cured. There is one evidence root, `.cache/evidence/<wave>/` (`PLAN.md:31`). `<scratch>/BL/evidence/` was replaced in every spec, and D3_OUT, OUT and CAP moved under it. Band A's `.cache/visual/` output is cited from there by path and sha256. The relay paths in W-0.7 (`:37`), W-L.5 and W-L.7 (`:70`) now read `docs/tranches/BL/outbox/` (the audit's relay-path note).

### FA-09 · 19 rows not terminal; band 0 lacks the ratified waves

Cured.

- **O-83, O-84, O-84a** go to W-0.8 (band 0, the owner-ratified exception, `PLAN.md:37`).
  - Cap: 4 of 7 rows FAIL in Chromium. Playwright WebKit crashes on the dock scenes, recorded.
  - Summary: overrun 28 px.
  - Metric: gaps 30.83, 18.89 and 6.95 against 5.45, both engines.
  - Static gates G4, G5 and G6 exit 1.
  - It also closes UIA-F-105 and UIA-KF-215.
- **O-74b** goes to W-0.9. The size holds at body × 1.272: 20.352, 23.669 and 27.516 px, both engines. The ruled name collides with the display rung, so OW-12 carries it (see Open).
- **O-77a** goes to W-0.3 (FA-07).
- **O-82** goes to W-0.10. The `vue-tsc` probe exits 2 (two TS2353 on `reference`). #76's moving-anchor half stays in W-L.1.
- **O-85** goes to W-I.1 §3.1 item 6. G24 exits 1: 0 hits in D2's registry.
- **U-6 to U-12:**
  - #31f is RETIRE CURED: 10 of 10 tone plates ≥ 4.5:1, lowest 7.66. The E5-G15 hold covers it.
  - #33b is E5-G10, exit 1 (`W-E.5.md:75`).
  - #31g is W-H.1 G1 and G2.
  - #49e is K6-G23, exit 1.
  - #53c is RETIRE DECLINE in W-G.4. The studio contract carries live state, and no sibling imports FourierField (`census-register-b.md:43`).
  - #54b is RETIRE NOT-REPRODUCED in W-H.1 (`:201`). The sampler scales by the canvas's backing ratio (`backdropLuminanceSample.ts:145-150`), not a fixed 1.0×.
  - WEBKIT-ACCORDION-CRASH is W-A.1 A1-G13 (`:77`). On a Playwright WebKit tap the page crashed 3 of 3; click timed out 3 of 3; Chromium opens 6 of 6.
  - D5 is FOLD W-J.2, with opening D5 a formation act owed.
- PLAN §1, §2, §3 and §7 name them all. The ledger's §8 (`LEDGER.md:489`) is now a table of placements.

### FA-10 · Terminal vocabulary

Cured. W-B.1 §3.1 and §3.2 (`:46`) use the charter's four terminals. BANKED needs a re-trigger. CURED, ANSWERED, DECLINE and NOT-REPRODUCED are RETIRE classes, and `--rows` is a lookup only. G-L8-13 (`W-L.8.md:107`) uses the same four. LEDGER §0 (`:19`) drops the F-1 caveat.

### FA-11 · Mechanism-only placements

Cured. Every row that carried `[M]` (105: the appendix's 87 and 18 in §1 to §7, the hand-table items among them) now names its gate or its RETIRE with a reading, and reads `[N]`. The appendix counts `[N]` 357, `[M]` 0 (LEDGER §9, recounted). The spec side:

- **W-E.7:** new E7-G10 to E7-G16 (`:76`), with a mechanism table (`:84`). New readings:
  - UIA-V-236: DockTrigger 35.3 vs DockControl 40.
  - UIA-KF-243: chevron 12 vs glyph 20.
  - UIA-F-107: Dialog grid overrun 316.7 at 390 and 269.3 at 1440, both engines.
  - UIA-F-229: ✕ mid 398.7 vs the title line's 392, and 416.3 vs 412.1.
  - UIA-V-523: the separator stops 8 px short on each side.
  - UIA-F-221: lg glyph 24 vs label 16 at coarse 390.
  - UIA-F-222: sm Button 44 vs NumberField 54 at coarse 390.
  - Retired:
    - UIA-KF-147 is NOT-REPRODUCED: the shortcut is 18.27 px under a 21 px label, and 14.38 under 16.4.
    - UIA-KF-304 is ANSWERED.
    - UIA-V-548, UIA-V-444 and UIA-V-636 are CURED at `dialog/styles.css:36-41` and `:90-95`.
  - UIA-F-41 is handed to E9-G5, and UIA-F-105 and UIA-KF-215 to W-0.8.
- **W-E.4:** new E4-G16 to E4-G19 (`:91`), with the Select cells added to G7 and G8 and a mechanism table (`:96`). Readings:
  - UIA-F-137, UIA-KF-131, UIA-V-293: the dock menu overlaps the dock by 4 px (Chromium).
  - UIA-V-113: the submenu overlaps its parent by 741 px², both engines.
  - UIA-F-44: the hit at the ✕ is `cover`.
  - UIA-V-676, UIA-F-219: `--z-toggle: 999`, and `sideOffset` literals 4, 4, 4, 0, 0; the static gate exits 1.
  - UIA-V-2, UIA-V-208, UIA-V-5: the Select's right edge is at 610.9 of 390.
  - UIA-V-220: 0 scroll cues, `mask: none`.
  - UIA-V-476 is RETIRE NOT-REPRODUCED. The duplicate terminal in W-K.6 is struck to a cite.
- **W-E.3:** E3-G10 (`:70`), with a cure item for the grip. A tap leaves the detent at 0.12 → 0.12 and the height at 171 → 171, both engines. Rows UIA-KF-216, A2-KE-L2-7, UIA-KF-005, A2-KE-L2-3.
- **W-E.9:** E9-G8 (`:69`) for the specimen captions: 11 = 11 in both engines. Rows UIA-F-136 and A2-FO-L3-7.
- **W-E.8:** E8-G4 (`:66`), static, exit 1 (UIA-F-149). UIA-V-194 is an E8-G3 cell.
- **W-E.10:** E10-G9 (`:101`), static, exit 1 (UIA-V-397, A2-VA-L3-3).
- **W-E.5:** E5-G10 to E5-G15. Readings:
  - UIA-KF-221: a replace by caller id renders 2 toasts; a success toast has 1 svg, the close only.
  - UIA-F-227: the `[&_svg]:text-(--tone)` and `flex-col-reverse` static gates exit 1.
- **W-E.2** (`:19`): the F-21 rows go on E2-G1, E2-G2, E2-G4, E2-G11 and E2-G12. **W-E.6:** UIA-F-140 on E6-G1.
- **W-L.2:** G-L2-11 (`:106`), static, exit 1 (UIA-V-149). UIA-V-165 and UIA-V-214 go on G-L2-1. UIA-F-146 is RETIRE NOT-REPRODUCED: `<Transition>` appears only in InfiniteScroll, Button and DotRing. UIA-F-43 goes to K11-G2, and UIA-V-456 to G-L7-5.
- **W-L.3:** G-L3-10 and G-L3-11 (`:89-90`) are new. Appendix D prints the quote-pairing probe. HEAD yields `["px-2 "]`, exit 1, and the cure's backreference regex yields `["px-2 'p-4"]`, exit 0, both run here. UIA-F-57 goes on G-L3-1.
- The remaining waves:
  - W-H.1: UIA-F-128 on G8; W-SLIDER-PROGRESS on G12. The Progress cell is a hold, 12.40 light and 8.22 dark in both engines.
  - W-H.2: #41c on G3 with `/data/sortable-list` added (not read here).
  - W-H.5: #56d.
  - W-A.5: CT-7 on A5-G2.
  - W-L.6: VREVEAL-HOOK on G-L6-1.
  - W-L.7: the packet and notice rows on G-L7-1 and G-L7-2.
  - W-J.1: CUR:49 on its §3.1 entry gate.
  - W-K.7: A2-FO-L1-18 on K7-G7.
  - W-I.1: UIA-F-132 on G25; UIA-KF-052 by D2's ruling.

### FA-12 · Hand-offs the target spec does not carry

Cured.

- **R56:** W-I.1 §1 and §3.1 item 7 (`W-I.1.md:24`).
- **The HandMark band:** W-H.1 G18.
- **value.js O-71:** legs 1 and 2 go to W-E.2. The drawer is Sheet side right, on E2-G1. The gutter is CURED at `dialog/styles.css:25` (350 wide at 390). Leg 3 (WatercolorDot) is ANSWERED: it moved to value.js at BK #55 (`blob/README.md:7`). Leg 4 goes to K6-G24. See `W-E.2.md:114` and `W-B.2.md:91`.
- **value.js O-73:** RETIRE CURED in W-K.4 §1 (`:30`). Evidence: `--dock-ring-color` at `dock/styles/index.css:229`, read at `:286` and `layer-group.css:321`; `glass-chip.css` imported at `styles/glass.css:123`.
- **value.js O-65 and O-67:** W-J.1 §1, on G1 and G9.
- **S1:** W-K.6 (`:40`).
- **S10:** W-B.3 §1 (`:25`), closing on B3-G4.
- **G-L8-11:** struck (`W-L.8.md:124`).
- **W-B.2's route line** (`:91`) names each landing.

### FA-13 · W-G.3 and W-G.1 build D3's live-veil input ahead of D3

Cured.

- W-G.1 item 6, G1-G9 and π-LUMA moved to W-H.1 §3.5 (`:111`). They apply on D3-B only, as H1-G19. The HEAD reading is absent: no `data-field-luma` on either canvas.
- W-G.3's G3-G2 moved to W-H.1 as H1-G20: 0 of 3 sampled (`source-unavailable` ×2, `sample-unavailable` ×1). π-DOCK-LUMA moved with it.
- W-G.3's cure keeps the idle-loop fix and removes the readback. Live mode reads `unavailable` until W-H.1 (`W-G.3.md:20`). Its appendix notes that its G3-G2 row is H1-G20's.
- The D3-B row of W-H.1's route table names W-H.1's own publisher.
- PLAN §1 states the rule: a loop's still-open mechanism is built by that loop's wave.

### FA-14 · W-0.2 designs a subject D3 owns

Cured. W-0.2 is a loop D3 wave (`W-0.2.md:1`, INDEX). Its mix values are template slots filled from D3's converged spec, and PLAN §4 lists the pressed-register values as a D3 obligation.

### FA-15 · Dock composition decided outside D2

Cured. W-I.4 is a loop D2 wave (`W-I.4.md:1,8`). Its subjects are D2 witnesses, and PLAN §4's D2 obligations list R2-06-01's subjects.

### FA-16 · The band-0 dock cures pre-empt D2 unrecorded

Cured. PLAN §1 "The one exception" (`PLAN.md:37`) records W-0.8 as the owner-ratified exception (`FORMATION-PROGRESS.md:79`, IN:37-39). W-I.1 depends on W-0.8 and carries its cures as D2 inputs (`W-I.1.md:26`), and DOCKET-Q-10 stays with D2.

### FA-17 · A loop wave for a loop that does not exist

Cured as far as this seat can go without writing under `design/`. PLAN §4 and §6 record that opening D5 is a formation act owed before W-J.2. The LEDGER row PLAN-§6-D5 is FOLD W-J.2. W-J.2's unexecutable G4 and G5 are struck. The act itself is listed under Open.

### FA-18 · A dangling edge

Cured. W-I.1 depends on W-0.8, a wave in INDEX (`waves/INDEX.md:15`).

### FA-19 · Two DAGs

Cured. PLAN §5 (`PLAN.md:263`) is the only edge table. Every spec's `depends on` reads "PLAN §5, the one record of edges", and every spec's `dependants` reads "PLAN §5 (its inverse)". INDEX's depends column is struck and its header cites §5. The table is generated by a scratch script from one edge map (99 waves, cycle `null`). W-L.6's "every wave of bands C to K" stays as written.

### FA-20 · W-G.7 publishes one symbol through two doors

Cured. `./aurora` stops exporting `deriveAurora` and `paletteToCssGradient` (`src/components/aurora/index.ts:78,81`). G7-G4 is the one-door check, `! grep -qwE 'deriveAurora\|paletteToCssGradient' src/components/aurora/index.ts`, exit 1 at HEAD (`W-G.7.md:64`). The MIGRATION row names one successor. O-53 R-1's re-export ask is DECLINED under E-1 in the reply.

### FA-21 · Disease rows decided inside shared waves

Cured: each has its own wave.

| row | wave | born-RED reading |
|---|---|---|
| #25 | W-H.5 (loop D3) | H5-G1 transmission 0.0000; H5-G3 exit 1 (`:47`) |
| #48 | W-I.5 (loop D2) | I5-G1, 130 lines, exit 1 (`:40`) |
| #67a, #67d, #90a, #90d | W-I.6 (loop D2) | I6-G1 exit 1; OW-5 docket |
| C-8 | W-I.7 (loop D2) | I7-G1 to G3 exit 1 (`:42`) |
| C-9 | W-K.11 | K11-G1 12 of 12; K11-G2 `role` and `tabindex` null in both engines (`:45`) |
| C-13c | W-E.14 | E14-G1 3 of 4 FAIL; E14-S exit 1 (`:54`) |

The shared waves (W-H.2, W-I.1, W-E.2, W-K.5, W-E.9) lost the items, their gates and their MIGRATION rows. W-E.9's passing control and its bite moved to W-E.14.

### Notes outside the checklist

- **P-1.** The nine new specs carry gestalt passes (W-0.9 and W-0.10 had none, now added). The 42 older specs the note lists are unchanged; that is an execution-time obligation of PLAN §1, not a formation defect this seat was asked to cure.
- **Critical path.** Unchanged: W-A.1 on W-0.7 is PLAN §5's edge, and nothing here needed it moved.
- **Stale loop state.** PLAN §4's table no longer records loop state; the registries are the record.
- **Relay path.** Cured under FA-08.

## Open

- **OW-12, the token's name.** The owner ruled `--type-title`, which is already the 2.058 rem display rung (32.928 px), read in the library at `scale.css:121`, `semantic.css:148`, `bridges.css:37`, `metric/styles.css:110` and `manifest.ts:27`, and by slides, speedtest and keyframes.js. Redefining it moves those readers to 23.669 px at 1440 in a minor. The seat default is `--type-card-title`. W-0.9 G4 is RED until the owner answers.
- **D5 is not open.** Opening it writes under `design/`, which this seat is fenced from. W-J.2 waits on it.
- **D2 and D3 checklist additions** (O-85, R56, the tone and loading seats, R2-06-01's subjects, the pressed-register values, D3-A against D3-B for the luma) are written as PLAN §4 obligations, not into the registries (`design/` is fenced). W-I.1 G24 stays RED until D2's registry names O-85.
- **OW-3.** Every real-Safari cell is UNMEASURED.
- **Playwright WebKit crashes on GlassDock** (every dock scene here) and on the Accordion tap (A1-G13). Dock rows in the new gates are Chromium-only and labelled so.
- **F-227's stack order** is gated statically (`flex-col-reverse`); no paint row measures the order flip.
- **Fence note.** One `grep` for `#53c` was run against this session's transcript under `~/.claude`, which the fence forbids. It returned nothing and nothing from it is used; #53c's and #54b's terminals rest on the reads cited above.

## Appendix P · the fixture probe

Built with `node build.mjs <worktree> head` (Vite over the worktree's `src`, `@glass` aliased to it) and run with `ENG=chromium|webkit node measure.mjs head <scene,…>`. Rows print as JSON and land in `caps/head/rows-<scenes>.json` (this seat renamed the file per engine between runs, e.g. `rows-mech-chromium.json`); captures go to `caps/head/`. `acc.mjs` is the Accordion crash reproduction.

### `App.vue`

```vue
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { GlassDock, DockControl, DockTrigger } from "@glass/components/dock";
import { Select, SelectValue, SelectContent, SelectItem } from "@glass/components/select";
import { Metric } from "@glass/components/metric";
import { Card, CardHeader, CardTitle, CardContent } from "@glass/components/card";
import { HandMark } from "@glass/components/handmark";
import { Toaster, toast } from "@glass/components/toast";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@glass/components/accordion";
import { ConfiguratorLayer } from "@glass/components/configurator";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@glass/components/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "@glass/components/menu";
import { Button } from "@glass/components/button";
import { SelectTrigger } from "@glass/components/select";
import { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@glass/components/menu";
import { SheetContent } from "@glass/components/sheet";
import { EasingCurve } from "@glass/components/easing";
import { NumberField, NumberFieldInput } from "@glass/components/number-field";
import { Progress } from "@glass/components/progress";
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "dock";
const colW = q.get("w") ?? "342";
const multi = ref(["neutral"]); const view = ref("a"); const tall = ref("45"); const det = ref(0.12); (window as any).__det = det;
onMounted(async () => { await nextTick(); if (scene === 'mtoast') { toast({ id: 'same', title: 'first', duration: 600000 } as any); toast({ id: 'same', title: 'second', duration: 600000 } as any); toast({ title: 'Saved', tone: 'success' as any, duration: 600000 }); } if (scene === 'toast') { for (const tone of ['neutral','success','warning','destructive','info']) toast({ title: `Title ${tone}`, description: `Description ${tone}`, tone: tone as any, duration: 600000 }); } setTimeout(() => ((window as any).__ready = true), 600); });
</script>
<template>
  <main style="padding:24px">
    <template v-if="scene === 'dock'">
      <div style="width:320px" data-probe="h-over"><GlassDock :collapse="false" backdrop-mode="static"><DockControl v-for="i in 14" :key="i" :aria-label="`c${i}`">{{ i }}</DockControl></GlassDock></div>
      <div style="width:320px;margin-top:40px" data-probe="h-fit"><GlassDock :collapse="false" backdrop-mode="static"><DockControl v-for="i in 3" :key="i" :aria-label="`f${i}`">{{ i }}</DockControl></GlassDock></div>
      <div style="height:260px;margin-top:40px" data-probe="v-over"><GlassDock :collapse="false" orientation="vertical" backdrop-mode="static" style="max-height:260px"><DockControl v-for="i in 14" :key="i" :aria-label="`v${i}`">{{ i }}</DockControl></GlassDock></div>
    </template>
    <template v-else-if="scene === 'summary'">
      <div data-probe="summary"><GlassDock collapse="closed" backdrop-mode="static"><DockControl aria-label="a">A</DockControl><DockControl aria-label="b">B</DockControl>
        <template #collapsed><span data-probe="sum-content" style="display:inline-flex;align-items:center;gap:8px"><span data-probe="track" style="display:inline-block;width:96px;height:6px;border-radius:3px;background:currentColor"></span><Metric :value="1" unit="×" /></span></template></GlassDock></div>
    </template>
    <template v-else-if="scene === 'metric'">
      <div style="display:grid;gap:12px"><Metric data-probe="m1" :value="1" unit="×" /><Metric data-probe="m2" :value="12" unit="×" /><Metric data-probe="m3" :value="123" unit="×" /></div>
    </template>
    <template v-else-if="scene === 'card'">
      <Card data-probe="card"><CardHeader><CardTitle>Decomposition</CardTitle></CardHeader></Card>
      <p data-probe="body">body</p>
    </template>
    <template v-else-if="scene === 'layer'">
      <div :style="{ width: '100%', maxWidth: colW + 'px' }">
        <ConfiguratorLayer label="Decomposition" sub="fourier · chebyshev · legendre" data-probe="layer-actions"><template #actions><button type="button" aria-label="Reset">↺</button></template><div>body</div></ConfiguratorLayer>
        <ConfiguratorLayer label="Decomposition" sub="fourier · chebyshev · legendre" data-probe="layer-bare"><div>body</div></ConfiguratorLayer>
        <ConfiguratorLayer label="Decomposition and reconstruction bases" sub="fourier · chebyshev · legendre" data-probe="layer-long"><div>body</div></ConfiguratorLayer>
      </div>
    </template>
    <template v-else-if="scene === 'dtrig'">
      <div data-probe="dtrig-collapsing" style="padding-top:40px"><GlassDock collapse="closed" backdrop-mode="static"><DockControl aria-label="home"><svg data-probe="glyph" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg></DockControl>
        <Select v-model="view"><DockTrigger for="select" aria-label="Dock view" data-probe="trig"><span>View</span><SelectValue class="sr-only" /></DockTrigger><SelectContent><SelectItem value="a">A</SelectItem><SelectItem value="b">B</SelectItem></SelectContent></Select>
        <template #collapsed><span>Dock</span></template></GlassDock></div>
      <div data-probe="dtrig-static" style="padding-top:80px"><GlassDock :collapse="false" fit-content backdrop-mode="static"><DockControl aria-label="home2" data-probe="ctl"><svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg></DockControl>
        <Select v-model="view"><DockTrigger for="select" aria-label="Dock view 2" data-probe="trig2"><span>View</span><SelectValue class="sr-only" /></DockTrigger><SelectContent><SelectItem value="a">A</SelectItem><SelectItem value="b">B</SelectItem></SelectContent></Select></GlassDock></div>
    </template>
    <template v-else-if="scene === 'progress'">
      <div style="width:400px;padding:40px"><Progress :model-value="50" data-probe="prog" /></div>
    </template>
    <template v-else-if="scene === 'handmark'">
      <Card style="width:520px"><CardContent><p style="font-size:24px;padding:16px 0">Who <HandMark shape="highlight" data-probe="hm">pays in</HandMark> gets connected</p></CardContent></Card>
      <p style="font-size:24px;padding:16px 24px">Who <HandMark shape="highlight" data-probe="hm-page">pays in</HandMark> gets connected</p>
    </template>
    <template v-else-if="scene === 'accordion'">
      <Accordion type="single" collapsible style="width:320px"><AccordionItem value="a"><AccordionTrigger data-probe="acc-trig">Section</AccordionTrigger><AccordionContent>Body text</AccordionContent></AccordionItem></Accordion>
    </template>
    <template v-else-if="scene === 'e7dialog'">
      <Dialog :open="true"><DialogContent data-probe="dlg"><DialogHeader><DialogTitle data-probe="dlg-title">Delete palette</DialogTitle><DialogDescription>Body</DialogDescription></DialogHeader><div data-probe="dlg-wide" style="white-space:nowrap">0123456789012345678901234567890123456789012345678901234567890123456789</div></DialogContent></Dialog>
    </template>
    <template v-else-if="scene === 'e7menu'">
      <DropdownMenu :open="true" :modal="false"><DropdownMenuTrigger as-child><button>menu</button></DropdownMenuTrigger><DropdownMenuContent data-probe="menu"><DropdownMenuItem data-probe="mi">Open file<DropdownMenuShortcut data-probe="kbd">⌘O</DropdownMenuShortcut></DropdownMenuItem><DropdownMenuSeparator data-probe="sep" /><DropdownMenuItem>Close</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    </template>
    <template v-else-if="scene === 'e7rung'">
      <div style="display:flex;gap:12px;align-items:center;padding:24px">
        <Button size="lg" data-probe="btn-lg"><svg data-probe="lg-glyph" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor"/></svg><span data-probe="lg-label">Save</span></Button>
        <Button size="sm" data-probe="btn-sm">Save</Button>
        <NumberField :model-value="3" size="sm" data-probe="nf-sm" style="width:120px"><NumberFieldInput /></NumberField>
      </div>
    </template>
    <template v-else-if="scene === 'msel'">
      <div style="position:absolute;right:8px;top:80px"><Select v-model="view" :default-open="true"><SelectTrigger data-probe="seltrig" style="width:120px"><SelectValue /></SelectTrigger><SelectContent data-probe="selc"><SelectItem value="a">A very long option caption that runs wide past the trigger</SelectItem><SelectItem value="b">Another long option caption for the row</SelectItem></SelectContent></Select></div>
    </template>
    <template v-else-if="scene === 'mseltall'">
      <div style="padding:40px"><Select v-model="tall" :default-open="true"><SelectTrigger style="width:200px"><SelectValue /></SelectTrigger><SelectContent data-probe="selt"><SelectItem v-for="i in 60" :key="i" :value="String(i)">Row {{ i }}</SelectItem></SelectContent></Select></div>
    </template>
    <template v-else-if="scene === 'msub'">
      <div style="padding:24px"><DropdownMenu :open="true" :modal="false"><DropdownMenuTrigger as-child><button>menu</button></DropdownMenuTrigger><DropdownMenuContent data-probe="parent"><DropdownMenuItem>Open</DropdownMenuItem><DropdownMenuSub :open="true"><DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger><DropdownMenuSubContent data-probe="sub"><DropdownMenuItem>PNG image</DropdownMenuItem><DropdownMenuItem>SVG vector</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu></div>
    </template>
    <template v-else-if="scene === 'mclose'">
      <Dialog :open="true"><DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader><div data-probe="cover" style="position:absolute;inset:0 0 auto auto;width:120px;height:120px;background:transparent">x</div></DialogContent></Dialog>
    </template>
    <template v-else-if="scene === 'mdockmenu'">
      <div style="position:fixed;left:0;right:0;bottom:12px;display:flex;justify-content:center" data-probe="dockwrap"><GlassDock :collapse="false" fit-content backdrop-mode="static"><DockControl aria-label="home">H</DockControl>
        <DropdownMenu :open="true" :modal="false"><DropdownMenuTrigger as-child><DockControl aria-label="more" data-probe="dmtrig">M</DockControl></DropdownMenuTrigger><DropdownMenuContent data-probe="dmc"><DropdownMenuItem v-for="i in 6" :key="i">Item {{ i }}</DropdownMenuItem></DropdownMenuContent></DropdownMenu></GlassDock></div>
    </template>
    <template v-else-if="scene === 'mlink'">
      <div style="padding:24px"><DropdownMenu :default-open="true" :modal="false"><DropdownMenuTrigger as-child><button>menu</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem as-child data-probe="linkrow"><a href="#k6-link">GitHub</a></DropdownMenuItem><DropdownMenuItem>Other</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div>
    </template>
    <template v-else-if="scene === 'mtoast'"><Toaster /></template>
    <template v-else-if="scene === 'mcard'">
      <Card data-probe="rolecard" role="button" tabindex="0"><CardContent>c</CardContent></Card>
    </template>
    <template v-else-if="scene === 'mgrip'">
      <Dialog :open="true" :modal="false"><SheetContent side="bottom" :detents="[0.12, 0.36, 1]" v-model:detent="det" data-probe="sheet"><div>body</div></SheetContent></Dialog>
    </template>
    <template v-else-if="scene === 'mease'">
      <div style="width:120px;height:120px;position:relative" data-probe="e120"><EasingCurve :strokes="[{ d: 'M0 1 L1 0' }]" /></div>
      <div style="width:480px;height:480px;position:relative" data-probe="e480"><EasingCurve :strokes="[{ d: 'M0 1 L1 0' }]" /></div>
    </template>
    <template v-else-if="scene === 'toast'"><Toaster /></template>
    <template v-else-if="scene === 'toggle'">
      <ToggleGroup type="multiple" v-model="multi" aria-label="bases" style="display:flex;gap:12px">
        <ToggleGroupItem value="neutral" data-probe="tint-none" style="min-width:160px">neutral</ToggleGroupItem>
        <ToggleGroupItem value="off" data-probe="off" style="min-width:160px">off</ToggleGroupItem>
      </ToggleGroup>
    </template>
  </main>
</template>
```

### `build.mjs`

```js
import fs from "node:fs"; import path from "node:path";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const [wtArg, label = "head"] = process.argv.slice(2);
const wt = path.resolve(wtArg);
const root = path.join(HERE, "builds", label), app = path.join(root, "app"), dist = path.join(root, "dist");
fs.rmSync(root, { recursive: true, force: true }); fs.mkdirSync(app, { recursive: true });
const nm = `${CHECKOUT}/node_modules`;
fs.writeFileSync(path.join(app, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>fix-2 probe</title>
<script>const q=new URLSearchParams(location.search); if(q.get('theme')==='dark'){document.documentElement.classList.add('dark');}</script></head><body><div id="app"></div><script type="module" src="./main.ts"></script></body></html>`);
fs.writeFileSync(path.join(app, "main.ts"), `import "./probe.css"; import { createApp } from "vue"; import App from "./App.vue"; createApp(App).mount("#app");`);
fs.writeFileSync(path.join(app, "probe.css"), `@import "${nm}/tailwindcss/index.css" source("./");
@source "${wt}/src/components/**/*.vue";
@source "${wt}/src/components/_shared/**/*.ts";
@source "${wt}/src/components/**/index.ts";
@import "${nm}/tw-animate-css/dist/tw-animate.css";
@import "${wt}/src/styles/index.css";
html,body{margin:0} body{background:var(--background);color:var(--foreground)}
`);
fs.copyFileSync(path.join(HERE, "App.vue"), path.join(app, "App.vue"));
process.env.NODE_ENV = "production";
const { build } = await import(`${nm}/vite/dist/node/index.js`);
const vue = (await import(`${nm}/@vitejs/plugin-vue/dist/index.mjs`)).default;
const tailwindcss = (await import(`${nm}/@tailwindcss/vite/dist/index.mjs`)).default;
const { glassCssTarget } = await import(path.join(wt, "vite.targets.ts"));
await build({ configFile: false, mode: "production", root: app, base: "./", cacheDir: path.join(root, ".vite"), logLevel: "warn", publicDir: false,
  plugins: [tailwindcss(), vue()],
  resolve: { alias: [{ find: "@glass", replacement: path.join(wt, "src") }, { find: /^vue$/, replacement: `${nm}/vue/dist/vue.runtime.esm-bundler.js` }] },
  build: { outDir: dist, emptyOutDir: true, cssTarget: glassCssTarget, target: "esnext", minify: false, reportCompressedSize: false, chunkSizeWarningLimit: 1e9 } });
console.log("built", label, "→", dist);
```

### `measure.mjs`

```js
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const require = createRequire(`${CHECKOUT}/package.json`);
const { PNG } = require("pngjs");
const { chromium, webkit } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const label = process.argv[2] ?? "head"; const only = process.argv[3];
const dist = path.join(HERE, "builds", label, "dist");
const out = path.join(HERE, "caps", label); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}/`;
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const oklab = ([r, g, b]) => { const [R, G, B] = [lin(r), lin(g), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (p, q) => { const [a, b] = [oklab(p), oklab(q)]; return +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(4); };
const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const px = (img, x, y) => { const i = (img.width * y + x) << 2; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
const mean = (img, r) => { let s = [0, 0, 0], n = 0; for (let y = Math.round(r.y); y < Math.round(r.y + r.h); y++) for (let x = Math.round(r.x); x < Math.round(r.x + r.w); x++) { const p = px(img, x, y); s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; n++; } return s.map((v) => v / n); };
const rows = []; const row = (o) => { rows.push(o); console.log(JSON.stringify(o)); };
async function open(bt, qs, ctxOpts = {}) {
  const b = await bt.launch(bt === chromium ? { args: ["--force-color-profile=srgb"] } : {});
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", ...ctxOpts });
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
  await page.goto(`${base}?${qs}`); await page.waitForFunction(() => (window).__ready === true, null, { timeout: 20000 }); await page.waitForTimeout(300);
  return { b, page, errs };
}
const engines = [["chromium", chromium], ["webkit", webkit]].filter(([e]) => !process.env.ENG || process.env.ENG === e);
const want = (s) => !only || only.split(",").includes(s);
for (const [eng, bt] of engines) {
  for (const cell of [["coarse390", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: bt === chromium }], ["fine1440", { viewport: { width: 1440, height: 900 } }]]) {
    const [cname, opts] = cell;
    if (want("e7dialog")) { const { b, page, errs } = await open(bt, "scene=e7dialog", opts);
      const m = await page.evaluate(() => { const c = document.querySelector('[data-slot="dialog-content"]'); const t = document.querySelector('[data-probe="dlg-title"]'); const x = document.querySelector('[data-slot="dialog-close"]'); const w = document.querySelector('[data-probe="dlg-wide"]');
        const lh = parseFloat(getComputedStyle(t).lineHeight); const tr = t.getBoundingClientRect(); const xr = x.getBoundingClientRect(); const cr = c.getBoundingClientRect(); const wr = w.getBoundingClientRect();
        return { gridCols: getComputedStyle(c).gridTemplateColumns, contentW: +cr.width.toFixed(1), wideRight: +wr.right.toFixed(1), contentRight: +cr.right.toFixed(1), wideOverrun: +Math.max(0, wr.right - cr.right).toFixed(1), titleLineMid: +(tr.top + lh / 2).toFixed(1), closeMid: +(xr.top + xr.height / 2).toFixed(1) }; });
      await page.screenshot({ path: path.join(out, `e7dialog-${eng}-${cname}.png`) });
      row({ gate: "W-E.7/F-107+F-229", eng, cell: cname, ...m, f107pass: m.wideOverrun <= 0.5, f229pass: Math.abs(m.titleLineMid - m.closeMid) <= 1, errs: errs.length }); await b.close(); }
    if (want("e7menu")) { const { b, page, errs } = await open(bt, "scene=e7menu", opts);
      const m = await page.evaluate(() => { const c = document.querySelector('[data-probe="menu"]'); const s = document.querySelector('[data-probe="sep"]'); const k = document.querySelector('[data-probe="kbd"]'); const i = document.querySelector('[data-probe="mi"]'); const cr = c.getBoundingClientRect(), sr = s.getBoundingClientRect(); const bl = parseFloat(getComputedStyle(c).borderLeftWidth), br = parseFloat(getComputedStyle(c).borderRightWidth);
        return { plateInnerL: +(cr.left + bl).toFixed(1), plateInnerR: +(cr.right - br).toFixed(1), sepL: +sr.left.toFixed(1), sepR: +sr.right.toFixed(1), gapL: +(sr.left - cr.left - bl).toFixed(1), gapR: +(cr.right - br - sr.right).toFixed(1), kbdPx: parseFloat(getComputedStyle(k).fontSize), labelPx: parseFloat(getComputedStyle(i).fontSize) }; });
      await page.screenshot({ path: path.join(out, `e7menu-${eng}-${cname}.png`) });
      row({ gate: "W-E.7/V-523+KF-147", eng, cell: cname, ...m, v523pass: m.gapL <= 0.5 && m.gapR <= 0.5, errs: errs.length }); await b.close(); }
    if (want("e7rung")) { const { b, page, errs } = await open(bt, "scene=e7rung", opts);
      const m = await page.evaluate(() => { const r = (s) => document.querySelector(`[data-probe="${s}"]`).getBoundingClientRect(); const lab = document.querySelector('[data-probe="lg-label"]'); const nf = document.querySelector('[data-probe="nf-sm"]');
        return { lgGlyph: +r("lg-glyph").width.toFixed(1), lgLabelPx: parseFloat(getComputedStyle(lab).fontSize), smButtonH: +r("btn-sm").height.toFixed(1), smNumberFieldH: +nf.getBoundingClientRect().height.toFixed(1) }; });
      await page.screenshot({ path: path.join(out, `e7rung-${eng}-${cname}.png`) });
      row({ gate: "W-E.7/F-221+F-222", eng, cell: cname, ...m, f222pass: Math.abs(m.smButtonH - m.smNumberFieldH) <= 0.5, errs: errs.length }); await b.close(); }
  }
  if (want("mech")) {
    const phone = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: bt === chromium };
    const run = async (scene, opts, fn) => { try { const { b, page, errs } = await open(bt, `scene=${scene}`, opts); await page.waitForTimeout(500); const m = await page.evaluate(fn); await page.screenshot({ path: path.join(out, `${scene}-${eng}.png`) }); row({ gate: `mech/${scene}`, eng, ...m, errs: errs.length }); await b.close(); } catch (e) { row({ gate: `mech/${scene}`, eng, crash: String(e).slice(0, 120) }); } };
    await run("msel", phone, () => { const c = document.querySelector('[data-probe="selc"]') ?? document.querySelector('[role="listbox"]'); const r = c.getBoundingClientRect(); return { l: +r.left.toFixed(1), r: +r.right.toFixed(1), vw: innerWidth, overRight: +Math.max(0, r.right - innerWidth).toFixed(1) }; });
    await run("mseltall", { viewport: { width: 1440, height: 900 } }, () => { const lb = document.querySelector('[role="listbox"]'); const c = lb.closest('[data-slot="select-content"]') ?? lb; const r = c.getBoundingClientRect(); const sel = lb.querySelector('[data-state="checked"]'); const sr = sel?.getBoundingClientRect(); const btns = document.querySelectorAll('[data-slot*="scroll"],[aria-hidden][data-reka-select-scroll-down-button],[class*="scroll-down"]').length; const cs = getComputedStyle(c); return { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), vh: innerHeight, selTop: sr ? +sr.top.toFixed(1) : null, selBottom: sr ? +sr.bottom.toFixed(1) : null, contentBottom: +r.bottom.toFixed(1), scrollCues: btns, mask: cs.maskImage || cs.webkitMaskImage }; });
    await run("msub", phone, () => { const p = document.querySelector('[data-probe="parent"]').getBoundingClientRect(); const s = document.querySelector('[data-probe="sub"]').getBoundingClientRect(); const ox = Math.max(0, Math.min(p.right, s.right) - Math.max(p.left, s.left)), oy = Math.max(0, Math.min(p.bottom, s.bottom) - Math.max(p.top, s.top)); return { parent: [p.left, p.top, p.right, p.bottom].map((v) => +v.toFixed(1)), sub: [s.left, s.top, s.right, s.bottom].map((v) => +v.toFixed(1)), overlapArea: +(ox * oy).toFixed(0), subArea: +(s.width * s.height).toFixed(0) }; });
    await run("mclose", { viewport: { width: 1440, height: 900 } }, () => { const x = document.querySelector('[data-slot="dialog-close"]'); const r = x.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { hitIsClose: !!hit && x.contains(hit), hit: hit ? (hit.getAttribute("data-probe") || hit.getAttribute("data-slot") || hit.tagName) : null }; });
    if (eng === "chromium") await run("mdockmenu", phone, () => { const plate = document.querySelector('[data-probe="dockwrap"] .dock-plate') ?? document.querySelector('[data-probe="dockwrap"] .glass-dock'); const d = plate.getBoundingClientRect(); const c = document.querySelector('[data-probe="dmc"]').getBoundingClientRect(); const oy = Math.max(0, Math.min(d.bottom, c.bottom) - Math.max(d.top, c.top)); const ox = Math.max(0, Math.min(d.right, c.right) - Math.max(d.left, c.left)); return { dock: [d.top, d.bottom].map((v) => +v.toFixed(1)), menu: [c.top, c.bottom].map((v) => +v.toFixed(1)), overlapPx: +(ox && oy ? oy : 0).toFixed(1), gap: +(d.top - c.bottom).toFixed(1) }; });
    await run("mtoast", { viewport: { width: 1440, height: 900 } }, () => { const items = [...document.querySelectorAll('[data-slot="toast"], li[role], ol > li')]; const titles = items.map((i) => i.textContent.trim().slice(0, 20)); const succ = items.find((i) => /Saved/.test(i.textContent)); return { count: items.length, titles, successGlyphs: succ ? succ.querySelectorAll("svg").length : null }; });
    await run("mcard", { viewport: { width: 1440, height: 900 } }, () => { const c = document.querySelector('[data-probe="rolecard"]'); return { role: c.getAttribute("role"), tabindex: c.getAttribute("tabindex") }; });
    await run("mease", { viewport: { width: 1440, height: 900 } }, () => { const f = (id) => parseFloat(getComputedStyle(document.querySelector(`[data-probe="${id}"] span[aria-hidden]`)).fontSize); return { cap120: f("e120"), cap480: f("e480") }; });
  }
  if (want("grip")) { try { const { b, page, errs } = await open(bt, "scene=mgrip", { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: bt === chromium }); await page.waitForTimeout(800);
    const g = page.locator('[data-slot="sheet-detent-grip"]'); const n = await g.count(); const before = await page.evaluate(() => window.__det.value); const h0 = await page.evaluate(() => document.querySelector('[data-probe="sheet"]').getBoundingClientRect().height);
    if (n) { const bb = await g.first().boundingBox(); await page.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.waitForTimeout(1200); }
    const after = await page.evaluate(() => window.__det.value); const h1 = await page.evaluate(() => document.querySelector('[data-probe="sheet"]').getBoundingClientRect().height);
    await page.screenshot({ path: path.join(out, `mgrip-${eng}.png`) }); row({ gate: "mech/mgrip", eng, grips: n, before, after, h0: +h0.toFixed(1), h1: +h1.toFixed(1), errs: errs.length }); await b.close(); } catch (e) { row({ gate: "mech/mgrip", eng, crash: String(e).slice(0, 160) }); } }
  if (want("link")) { try { const { b, page, errs } = await open(bt, "scene=mlink", { viewport: { width: 1280, height: 900 } }); await page.waitForTimeout(500);
    const info = await page.evaluate(() => { const r = document.querySelector('[data-probe="linkrow"]'); return { tag: r?.tagName ?? null, role: r?.getAttribute('role') ?? null, nestedA: r ? r.querySelectorAll('a').length : null, rowIsA: r?.tagName === 'A' }; });
    await page.focus('[data-probe="linkrow"]').catch(() => {}); await page.keyboard.press('Enter'); await page.waitForTimeout(400);
    const hash = await page.evaluate(() => location.hash); row({ gate: "mech/mlink", eng, ...info, hash, errs: errs.length }); await b.close(); } catch (e) { row({ gate: "mech/mlink", eng, crash: String(e).slice(0, 160) }); } }
  if (want("dock")) { const { b, page, errs } = await open(bt, "scene=dock");
    const radii = async (probe, pos) => page.evaluate(([probe, pos]) => { const root = document.querySelector(`[data-probe="${probe}"] .glass-dock`); const run = root.querySelector(".dock-run"); const plate = root.querySelector(".dock-plate");
      const vert = root.classList.contains("vertical"); const max = vert ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth;
      if (pos === "mid") { vert ? (run.scrollTop = max / 2) : (run.scrollLeft = max / 2); } else if (pos === "end") { vert ? (run.scrollTop = max) : (run.scrollLeft = max); } else { run.scrollTop = 0; run.scrollLeft = 0; }
      return new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => { const cs = getComputedStyle(plate); const r = plate.getBoundingClientRect();
        const res1 = (s, L) => { let pct = 0, px = 0; const m = s.match(/-?[0-9.]+%/g) || []; const n = s.replace(/-?[0-9.]+%/g, "").match(/-?[0-9.]+px/g) || []; m.forEach((x) => pct += parseFloat(x)); n.forEach((x) => px += parseFloat(x)); return pct / 100 * L + px; };
        const split = (v) => { const out = []; let d = 0, cur = ""; for (const ch of v) { if (ch === "(") d++; if (ch === ")") d--; if (ch === " " && d === 0) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.filter(Boolean); };
        const corner = (v) => { const parts = split(v); return { raw: v, rx: +res1(parts[0], r.width).toFixed(2), ry: +res1(parts[1] ?? parts[0], r.height).toFixed(2) }; };
        res({ overflow: max, w: +r.width.toFixed(1), h: +r.height.toFixed(1), ss: corner(cs.borderStartStartRadius), se: corner(cs.borderStartEndRadius), es: corner(cs.borderEndStartRadius), ee: corner(cs.borderEndEndRadius), capRest: getComputedStyle(root).getPropertyValue("--dock-cap-rest").trim() }); }))); }, [probe, pos]);
    await page.screenshot({ path: path.join(out, `dock-${eng}.png`) });
    for (const probe of ["h-over", "h-fit", "v-over"]) for (const pos of (probe === "h-fit" ? ["start"] : ["start", "mid", "end"])) {
      const m = await radii(probe, pos);
      // clamp per CSS: if adjacent radii sum exceeds side, scale all by f
      const cs = [m.ss, m.se, m.es, m.ee]; const f = Math.min(1, m.w / (m.ss.rx + m.se.rx), m.w / (m.es.rx + m.ee.rx), m.h / (m.ss.ry + m.es.ry), m.h / (m.se.ry + m.ee.ry));
      const circ = cs.every((c) => Math.abs(c.rx * f - c.ry * f) <= 0.5);
      row({ gate: "W-0.8/O83-CAP", eng, probe, pos, ...m, clampF: +f.toFixed(4), used: cs.map((c) => `${(c.rx * f).toFixed(1)}x${(c.ry * f).toFixed(1)}`), pass: circ, errs: errs.length });
      if (probe !== "h-fit") await page.screenshot({ path: path.join(out, `dock-${eng}-${probe}-${pos}.png`) });
    }
    await b.close(); }
  if (want("summary")) { const { b, page, errs } = await open(bt, "scene=summary");
    await page.screenshot({ path: path.join(out, `summary-${eng}.png`) });
    const m = await page.evaluate(() => { const root = document.querySelector('[data-probe="summary"] .glass-dock'); const sum = root.querySelector(".dock-layer--summary"); const plate = root.querySelector(".dock-plate"); const c = document.querySelector('[data-probe="sum-content"]'); const rs = sum.getBoundingClientRect(), rp = plate.getBoundingClientRect(), rc = c.getBoundingClientRect(); const cs = getComputedStyle(sum);
      return { state: root.getAttribute("data-dock-state") ?? root.className, summaryW: +rs.width.toFixed(1), summaryH: +rs.height.toFixed(1), aspect: cs.aspectRatio, contentW: +rc.width.toFixed(1), contentRight: +rc.right.toFixed(1), plateLeft: +rp.left.toFixed(1), plateRight: +rp.right.toFixed(1), contentLeft: +rc.left.toFixed(1), overrunPx: +Math.max(0, rc.right - rp.right, rp.left - rc.left).toFixed(1), minSize: cs.minWidth }; });
    row({ gate: "W-0.8/O84-SUMMARY", eng, ...m, pass: m.overrunPx <= 0.5, errs: errs.length });
    await b.close(); }
  if (want("metric")) { const { b, page, errs } = await open(bt, "scene=metric");
    for (const id of ["m1", "m2", "m3"]) { const m = await page.evaluate((id) => { const el = document.querySelector(`[data-probe="${id}"]`); const v = el.querySelector(".metric__value"), u = el.querySelector(".metric__unit"), rd = el.querySelector(".metric__reading");
        const tr = (n) => { const r = document.createRange(); r.selectNodeContents(n); return r.getBoundingClientRect(); }; const vr = tr(v), ur = tr(u); const fs = parseFloat(getComputedStyle(rd).fontSize); const gap = parseFloat(getComputedStyle(rd).columnGap);
        return { text: v.textContent.trim(), valueBoxW: +v.getBoundingClientRect().width.toFixed(2), valueInkW: +vr.width.toFixed(2), inkGap: +(ur.left - vr.right).toFixed(2), readingGap: +gap.toFixed(2), minInline: getComputedStyle(v).minInlineSize }; }, id);
      row({ gate: "W-0.8/O84a-JOIN", eng, id, ...m, pass: Math.abs(m.inkGap - m.readingGap) <= 1, errs: errs.length }); }
    await page.screenshot({ path: path.join(out, `metric-${eng}.png`) });
    await b.close(); }
  if (want("card")) for (const vw of [320, 1440, 2560]) { const { b, page, errs } = await open(bt, "scene=card", { viewport: { width: vw, height: 900 } });
    const m = await page.evaluate(() => { const t = document.querySelector('[data-slot="card-title"]'); const probe = document.createElement("div"); probe.style.fontSize = "var(--type-body)"; document.body.appendChild(probe); const body = parseFloat(getComputedStyle(probe).fontSize); probe.style.fontSize = "var(--type-title)"; const typeTitle = parseFloat(getComputedStyle(probe).fontSize); probe.remove(); return { title: parseFloat(getComputedStyle(t).fontSize), body, bodyX1272: +(body * 1.272).toFixed(3), typeTitleToken: typeTitle }; });
    row({ gate: "W-0.9/O74b-RUNG", eng, vw, ...m, holdSizeEqualsBodyRung: Math.abs(m.title - m.bodyX1272) <= 0.05, errs: errs.length });
    await b.close(); }
  if (want("layer")) for (const w of [600, 342, 260]) { const { b, page, errs } = await open(bt, `scene=layer&w=${w}`, { viewport: { width: 700, height: 900 } });
    await page.screenshot({ path: path.join(out, `layer-${eng}-${w}.png`) });
    const m = await page.evaluate(() => [...document.querySelectorAll(".configurator-layer")].map((l) => { const lab = l.querySelector(".configurator-section-label"); const sub = lab?.nextElementSibling; const chev = l.querySelector(".configurator-layer-chevron"); const act = l.querySelector(".configurator-layer-actions"); const lt = lab.getBoundingClientRect(); return { probe: l.getAttribute("data-probe"), labelEllipsis: lab.scrollWidth > lab.clientWidth, labelScroll: lab.scrollWidth, labelClient: lab.clientWidth, subEllipsis: sub ? sub.scrollWidth > sub.clientWidth : null, subScroll: sub?.scrollWidth ?? null, subClient: sub?.clientWidth ?? null, labelTop: +lt.top.toFixed(1), labelH: +lt.height.toFixed(1), subTop: sub ? +sub.getBoundingClientRect().top.toFixed(1) : null, chevronTop: chev ? +chev.getBoundingClientRect().top.toFixed(1) : null, actionsTop: act ? +act.getBoundingClientRect().top.toFixed(1) : null, lineMid: +(lt.top + parseFloat(getComputedStyle(lab).lineHeight) / 2).toFixed(1), chevMid: chev ? +((r) => r.top + r.height / 2)(chev.getBoundingClientRect()).toFixed(1) : null, actMid: act ? +((r) => r.top + r.height / 2)(act.getBoundingClientRect()).toFixed(1) : null }; }));
    for (const x of m) row({ gate: "W-0.3/O77a-NO-ELLIPSIS", eng, w, ...x, pass: !x.labelEllipsis && !x.subEllipsis, errs: errs.length });
    await b.close(); }
  if (want("dtrig")) { const { b, page, errs } = await open(bt, "scene=dtrig", { reducedMotion: "no-preference" });
    const st = await page.evaluate(() => { const c = document.querySelector('[data-probe="ctl"]').getBoundingClientRect(); const t = document.querySelector('[data-probe="trig2"]').getBoundingClientRect(); const svgs = [...document.querySelectorAll('[data-probe="trig2"] svg')].map((s) => { const r = s.getBoundingClientRect(); return [+r.width.toFixed(1), +r.height.toFixed(1)]; }); const g = document.querySelector('[data-probe="ctl"] svg').getBoundingClientRect(); return { controlH: +c.height.toFixed(1), triggerH: +t.height.toFixed(1), chevron: svgs, glyph: [+g.width.toFixed(1), +g.height.toFixed(1)] }; });
    row({ gate: "W-E.7/DOCK-TRIGGER-RUNG", eng, ...st, pass: Math.abs(st.controlH - st.triggerH) <= 0.5 && st.chevron.every(([w]) => Math.abs(w - st.glyph[0]) <= 0.5), errs: errs.length });
    const root = page.locator('[data-probe="dtrig-collapsing"] .glass-dock'); const before = await root.getAttribute("class");
    await page.evaluate(() => { window.__trigAnims = 0; window.__trigSeen = new Set(); const trig = document.querySelector('[data-probe="trig"]'); const tick = () => { const as = document.getAnimations().filter((a) => { const e = a.effect; if (!e || e.target !== trig || e.pseudoElement !== "::before") return false; try { return e.getKeyframes().some((k) => "opacity" in k); } catch { return false; } }); as.forEach((a) => window.__trigSeen.add((a.animationName || a.transitionProperty || "?") + ":" + a.constructor.name)); window.__trigAnims = Math.max(window.__trigAnims, as.filter((a) => a.playState === "running").length); if (performance.now() < window.__until) requestAnimationFrame(tick); }; window.__until = performance.now() + 2500; requestAnimationFrame(tick); });
    const box = await root.boundingBox(); await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(150); await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2); await page.waitForTimeout(2600);
    const after = await root.getAttribute("class"); const m = await page.evaluate(() => ({ maxRunning: window.__trigAnims, seen: [...window.__trigSeen] }));
    await page.screenshot({ path: path.join(out, `dtrig-${eng}.png`) });
    row({ gate: "W-K.7/K7-G13", eng, before, after, ...m, pass: m.maxRunning === 1, errs: errs.length });
    await b.close(); }
  if (want("progress")) for (const theme of ["light", "dark"]) { const { b, page, errs } = await open(bt, `scene=progress&theme=${theme}`); await page.waitForTimeout(800);
    const shot = await page.screenshot({ path: path.join(out, `progress-${eng}-${theme}.png`) }); const img = PNG.sync.read(shot);
    const r = await page.locator('[data-probe="prog"]').evaluate((el) => { const q = el.getBoundingClientRect(); const f = el.querySelector('.progress-value-fill').getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height, fx: f.left, fw: f.width, fill: getComputedStyle(el.querySelector('.progress-value-fill')).backgroundColor, track: getComputedStyle(el).backgroundColor }; });
    const cy = r.y + r.h / 2; const fillC = mean(img, { x: r.x + r.w * 0.15, y: cy - 1, w: r.w * 0.2, h: 2 }), trackC = mean(img, { x: r.x + r.w * 0.7, y: cy - 1, w: r.w * 0.2, h: 2 });
    const lin2 = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const Yv = ([a, b2, c]) => 0.2126 * lin2(a) + 0.7152 * lin2(b2) + 0.0722 * lin2(c); const ratio = (a, b2) => { const [x, y] = [Yv(a), Yv(b2)].sort((m, n2) => n2 - m); return (x + 0.05) / (y + 0.05); };
    row({ gate: "W-H.1/PROGRESS-VALUE", eng, theme, fill: hex(fillC), track: hex(trackC), fillW: +r.fw.toFixed(1), w: +r.w.toFixed(1), contrast: +ratio(fillC, trackC).toFixed(2), pass: ratio(fillC, trackC) >= 3, errs: errs.length }); await b.close(); }
  if (want("handmark")) for (const theme of ["light", "dark"]) { const { b, page, errs } = await open(bt, `scene=handmark&theme=${theme}`); await page.waitForTimeout(2500);
    const shot = await page.screenshot({ path: path.join(out, `handmark-${eng}-${theme}.png`) }); const img = PNG.sync.read(shot);
    for (const id of ["hm", "hm-page"]) { const r = await page.locator(`[data-probe="${id}"]`).evaluate((el) => { const rg = document.createRange(); rg.selectNodeContents(el); const q = rg.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; });
      const pts = []; for (let y = Math.round(r.y + r.h * 0.15); y < r.y + r.h * 0.85; y++) for (let x = Math.round(r.x); x < r.x + r.w; x++) pts.push(px(img, x, y));
      const Lof = (p) => oklab(p)[0]; const sorted = [...pts].sort((p, q) => Lof(p) - Lof(q)); const n = sorted.length; const k = Math.max(3, Math.round(n * 0.04));
      const dark = sorted.slice(0, k), light = sorted.slice(n - k); const avg = (a) => a.reduce((s, p) => s.map((v, i) => v + p[i] / a.length), [0, 0, 0]);
      const ink = theme === "light" ? avg(dark) : avg(light); const med = sorted[Math.floor(n * (theme === "light" ? 0.7 : 0.3))];
      const lin2 = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const Yv = ([a, b2, c]) => 0.2126 * lin2(a) + 0.7152 * lin2(b2) + 0.0722 * lin2(c); const ratio = (a, b2) => { const [x, y] = [Yv(a), Yv(b2)].sort((m, n2) => n2 - m); return (x + 0.05) / (y + 0.05); };
      row({ gate: "W-H.1/HANDMARK-BAND", eng, theme, id, ink: hex(ink), band: hex(med), bandL: +oklab(med)[0].toFixed(4), contrast: +ratio(ink, med).toFixed(2), pass: ratio(ink, med) >= 4.5, errs: errs.length }); }
    await b.close(); }
  if (want("toast")) for (const theme of ["light", "dark"]) { const { b, page, errs } = await open(bt, `scene=toast&theme=${theme}`); await page.waitForTimeout(1200);
    const shot = await page.screenshot({ path: path.join(out, `toast-${eng}-${theme}.png`) }); const img = PNG.sync.read(shot);
    const items = await page.evaluate(() => [...document.querySelectorAll('[data-slot="toast"], [data-slot=toast]')].map((t) => { const r = t.getBoundingClientRect(); const ti = t.querySelector('[data-slot="toast-title"]') || t.querySelector('div > div:first-child'); const titleEl = [...t.querySelectorAll('*')].find((e) => e.textContent.startsWith('Title') && e.children.length === 0); const descEl = [...t.querySelectorAll('*')].find((e) => e.textContent.startsWith('Description') && e.children.length === 0); const rr = (e) => { if (!e) return null; const g = document.createRange(); g.selectNodeContents(e); const q = g.getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }; return { text: titleEl?.textContent, box: { x: r.left, y: r.top, w: r.width, h: r.height }, title: rr(titleEl), desc: rr(descEl), titleWeight: titleEl ? getComputedStyle(titleEl).fontWeight : null, titleClass: titleEl?.className }; }));
    const lin2 = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const Yv = ([a, b2, c]) => 0.2126 * lin2(a) + 0.7152 * lin2(b2) + 0.0722 * lin2(c); const ratio = (a, b2) => { const [x, y] = [Yv(a), Yv(b2)].sort((m, n2) => n2 - m); return (x + 0.05) / (y + 0.05); };
    for (const it of items) { if (!it.title) continue; const plate = mean(img, { x: it.box.x + it.box.w - 40, y: it.box.y + it.box.h / 2 - 3, w: 12, h: 6 });
      const inkOf = (r) => { const pts = []; for (let y = Math.round(r.y); y < r.y + r.h; y++) for (let x = Math.round(r.x); x < r.x + r.w; x++) pts.push(px(img, x, y)); pts.sort((p, q) => dE(q, plate) - dE(p, plate)); const core = pts.slice(0, Math.max(3, Math.round(pts.length * 0.05))); return core.reduce((s2, p) => s2.map((v, k) => v + p[k] / core.length), [0, 0, 0]); };
      const ti = inkOf(it.title), de = it.desc ? inkOf(it.desc) : null;
      row({ gate: "W-E.5/TOAST-INK", eng, theme, text: it.text, plate: hex(plate), titleInk: hex(ti), titleContrast: +ratio(ti, plate).toFixed(2), descContrast: de ? +ratio(de, plate).toFixed(2) : null, titleWeight: it.titleWeight, titleClass: it.titleClass, pass: ratio(ti, plate) >= 4.5 && (!de || ratio(de, plate) >= 4.5), errs: errs.length }); }
    if (!items.length) row({ gate: "W-E.5/TOAST-INK", eng, theme, rendered: 0, pass: false, errs: errs.length });
    await b.close(); }
  if (want("toggle")) for (const theme of ["light", "dark"]) { const { b, page, errs } = await open(bt, `scene=toggle&theme=${theme}`);
    const shot = await page.screenshot({ path: path.join(out, `toggle-${eng}-${theme}.png`) }); const img = PNG.sync.read(shot);
    const r = await page.locator('[data-probe="tint-none"]').boundingBox();
    const cs = await page.locator('[data-probe="tint-none"]').evaluate((el) => ({ state: el.getAttribute("data-state"), boxShadow: getComputedStyle(el).boxShadow, color: getComputedStyle(el).color, bg: getComputedStyle(el).backgroundColor }));
    const fill = mean(img, { x: r.x + r.width * 0.82, y: r.y + r.height * 0.3, w: r.width * 0.1, h: r.height * 0.4 });
    const edge = mean(img, { x: r.x + r.width * 0.3, y: r.y, w: r.width * 0.4, h: 1 });
    row({ gate: "W-0.2/O76-NEUTRAL", eng, theme, ...cs, fill: hex(fill), edgeBand: hex(edge), errs: errs.length });
    await b.close(); }
}
srv.close(); fs.writeFileSync(path.join(out, `rows${only ? "-" + only.replace(/,/g, "_") : ""}.json`), JSON.stringify(rows, null, 1));
const fails = rows.filter((r) => r.pass === false).length; console.log(`VERDICT ${label}: ${fails} FAIL of ${rows.filter((r) => r.pass === true || r.pass === false).length} gated rows`); process.exit(fails ? 1 : 0);
```

### `acc.mjs`

```js
import fs from "node:fs"; import path from "node:path"; import http from "node:http";
const { chromium, webkit } = await import(`/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs`);
const dist = path.join(path.dirname(new URL(import.meta.url).pathname), "builds/head/dist");
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": f.endsWith(".js") ? "text/javascript" : f.endsWith(".css") ? "text/css" : "text/html" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r));
for (const [name, bt] of [["chromium", chromium], ["webkit", webkit]]) for (const how of ["click", "tap"]) for (let run = 1; run <= 3; run++) {
  const b = await bt.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true }); const page = await ctx.newPage(); let res;
  try { await page.goto(`http://127.0.0.1:${srv.address().port}/?scene=accordion`); await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
    if (how === "tap") await page.tap('[data-probe="acc-trig"]'); else await page.click('[data-probe="acc-trig"]');
    await page.waitForTimeout(1200); res = await page.evaluate(() => document.querySelector('[data-probe="acc-trig"]').getAttribute("data-state")); } catch (e) { res = "ERR " + String(e.message).split("\n")[0]; }
  console.log(name, how, run, res); await b.close(); }
srv.close();
```

