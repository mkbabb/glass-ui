# D5 pass 3 · C-A3 · the critic of route A (`P-A3-light.patch`, with `P-A3-geom.patch` beside it)

| field | value |
|---|---|
| seat | D5 pass 3, **C-A3 CRITIC** of route A, per `../REGISTRY.md` §P2-8.3 wave 3. I authored no D5 pass-2 or pass-3 seat |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | worktrees `.claude/worktrees/bl/D5/p3/C-A3/{wt,wt-geom,wt-plant}` detached at `d3326e846`. HEAD is now `a11a6ed6a`; `git diff --stat d3326e846 HEAD -- src tests package.json demo vite.config.ts` is empty, so the source is the same. `P-A3-light.patch` sha1 `e980347c…`, `P-A3-geom.patch` sha1 `5a4d0353…`, the same bytes P-A3 names. `wt` carries light, `wt-geom` carries geom, `wt-plant` carries light plus my four plants |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). `../../../audit/INBOUND.md` holds no ruling on Q-1..Q-5 at this seat's start (read 2026-10-17 22:03). O-87 binds |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell, no GPU args, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H3's, read from the checkout, unedited. Every battery ran on the harness's own app (`scenes/App.vue`, sha1 `3fb393c67b89` in every build log), built per worktree by `harness/build.mjs` |
| run history | This seat ran twice. The first run (20:35-21:30) built `light`, `plant` and `geom`, ran the whole light battery in Chromium, the light WebKit stage E-1/2/3/8/9/10/11 (one `--exclusive webkit` acquisition, 21:00 → 21:40), the Chromium probes and capture, and plant E-1 in Chromium. The workflow redeployed the seat at 22:00 during plant E-2; the redeployed seat (this report) re-used the same worktrees, builds and scripts, read every log, and ran the rest (`C-A3/chain4.sh`): plant E-2, the plant CK-14 probe, geom E-2 (arms i,ii,iii) and E-9, CK-16, two E-5 re-reads (Chromium), and two WebKit acquisitions (light E-4..E-7 + probes + capture; plants + geom). Every number below is from a log under `C-A3/logs/` with its load beside it |
| records | `C-A3/run-ca3.sh`, `chain2.sh`, `chain3*.sh`, `chain4.sh` (stages), `plant.sh` (the four plants), `tab.mjs` (tabulator), `probe/ca3-probe.mjs` (CK-14 × forced colours; the Radio seat), `probe/radiopix.mjs` (the Radio's face in paint), `probe/ck16.mjs` (CK-16), P-A3's `A3/probe/a3-probe.mjs` (CK-13/14/20/21), `logs/`, `json/{light,light-r2,light-r3,plant,geom,geom-arms}/`, `glance/` (sheets, 432 frames) |

## 0 · In brief

**Score: 11/27 rows closed on the light build (the default), 41 %.** Closed: CK-03, CK-08, CK-09, CK-11, CK-13, CK-20, CK-21, CK-22, CK-23, CK-24, CK-26. Of the 16 open rows, four cannot close by building (CK-02 under Q-5 (a), CK-07, CK-17, and CK-05/CK-18 on the Sheet). Route A has no clean pass. **The gestalt is not iOS-27 grade** (§3).

1. **What holds, replayed in both engines.** The committed mount is quiet: 18/18 per engine. The in-task arrival is quiet, before paint, in the mount's own task and after a style read: 14/14 each per engine, the 4 stateless cells REPORT. My plant P3 (Checkbox without its door) fails `arrival·own` and `ownflush` (light 0.0249 and dark 0.0326 above the committed rest), so the cell can fail. Every planted envelope token and `--rung-light` raises `console.error` naming it on all eight members, 33/34 per engine. E-8 is 19/19 in both engines. E-10 holds position: centre moves 0.0 px on every hand-off, in both engines. The numstat reproduces to the line: light **165 files, +2542/−1280**; geom **166, +2515/−1281**.
2. **New counterexample, CK-14: under forced colours the coarse dock trigger loses its 44 px hit-slop.** This reproduces in both engines (`ca3-probe fcslop`). With forced colours off, the slop is 44 × 44 on a 32 × 24 face, and a tap 8 px above the face hits the trigger (6/6 PASS per engine). With `forcedColors: "active"` its `::after` computes `display: none`, the slop is 0 × 0, and the same tap misses (6/6 FAIL per engine; Chromium load 4.9, WebKit 11.8). The cause is in the source. P-A3's CK-14 cure excludes the three dock-trigger classes from the seat selectors. The forced-colours arm (`utilities/engage.css:225-230`) does not: `:where(.engage-chosen, .engage-pressed, .engage-disclosed)::after { display: none }` applies to every disclosure trigger, and D2's slop (`dock/styles/controls/touch-floor.css`) declares no `display` to win back. A dock trigger is an `engage-disclosed` element through `SelectTrigger`, `PopoverTrigger` and `DropdownMenuTrigger` (`DockTrigger.vue:53-77`). P-A3's own CK-13 cell passes because it reads only the member seats.
3. **CK-02 under the default fails exactly as P-A3 says, in both engines.** Light rise against 0.01:
   - Switch, light theme: Chromium 0.0057-0.0062; WebKit 0.0003-0.0033.
   - Radio, light theme: 0.0026-0.0027 and 0.0020-0.0027.
   - Radio, dark theme: 0.0000-0.0001 on four paths per engine. The exception is the Chromium coarse tap, which passes.
   - Accordion, light theme: Chromium 0.0031-0.0032, WebKit 0.0002-0.0005.
   - Accordion, dark theme: 0.0094-0.0099.

   **P-A3 §6 item 2 misreads the Radio.** The seat is not silent in the dark theme. Its `[data-engage-light]` reaches opacity 0.97 at 47 ms (Chromium) and 0.70 at 28 ms (WebKit) as an 18 × 18 px wash, `oklab(0.926 … / 0.114)`, about 11 % of `--foreground`. What it does to the paint is nil. The face's screenshot luminance runs 0.157 → 0.218 → 0.213 in Chromium and 0.141 → 0.215 → 0.2165 in WebKit (`radiopix`), which is the fill's own rise with at most 0.005 above it. The light peaks while the fill is still arriving, so the fill's transition absorbs it.

   The geom build passes **164/164 in Chromium** under arms i, ii and iii (load 15.4). The face excursions reproduce P-A3's: Chip 0.81-0.88 px against the 0.8 bound, Switch 2.19-2.20, accordion 6.38-6.40. WebKit reads **164/164** too (load 19.1).
4. **CK-10, CK-06 and CK-16 are reproduced, not load artefacts.**
   - **CK-10:** E-9 72/6 in both engines (Chromium load 5.0, WebKit 4.8). Switch and Radio (light theme), the accordion, and the tabs (0.0000, no light seat) lose the transient under reduce. Geom E-9 60/18 in both engines: no member keeps a light under reduce.
   - **CK-06:** E-5 fails in Chromium on **3 of 3 reads**, at load 5.1, 13.1 and 14.8. The first two fail the accordion and the toggle in the light theme, each ×0.73 (0.286 → 0.209). The third fails the toggle in the dark theme, ×0.89. WebKit is 56/56. The failing member moves between reads, but some member fails on every read. The low-load read fails as well, so it is not a load artefact.
   - **CK-16:** Skeleton and StatusDot under `static` hold 0.0 layouts/s at rest (Chromium CDP). Each keeps its one infinite animation (`skeleton-breathe`, `feedback-mark-pulse`) **running 4114 and 4346 px below a 500 px viewport**, in both engines. The row says it "stops off-screen".
5. **The plants bite** (CK-27). In Chromium:
   - P1, the Switch's class deleted: E-1 `adoption switch` NOT ADOPTED on 3 scenes; the latch falls 54 → 53/55.
   - P3, the Checkbox's door removed: `arrival·own` and `ownflush` FAIL in both themes.
   - P4, the seat reclaims the dock trigger's `::after`: CK-14 FAIL. The slop moves to −22, −22 against centred −6, −10, and paints `oklab(… / 0.062)` 60 ms after opening.
   - P6, the Button's `--rung-light` transparent: arm iii 0.0000 on all 8 Button cells.

   WebKit reads the same for all four plants (§1.3).

## 1 · What I ran

Load is the 1/5/15-minute average at the start of each run; the per-cell loads are in the logs.

### 1.1 · The light build (the default), battery on the harness app

| witness | Chromium (load at start) | WebKit (load at start) | log |
|---|---|---|---|
| E-1 | 92 P / 4 F (7.4) | 92 / 4 (6.1) | `light-chromium-E-1.log`, `light-webkit-stage.log` |
| E-2 | 144 P / 20 F / 16 R (7.5) | 141 / 23 / 16 R (4.7) | `light-chromium-E-2.log`, `light-webkit-stage.log` |
| E-3 | 20 / 2 (5.4) | 20 / 2 (4.9) | |
| E-4 | 14 / 0 / 4 U (5.8) | 11 / 0 / 8 U (15.1) | `light-chromium-E-4.log`, `wk-W1.log` |
| E-5 | 55 / 1 (5.1); r2 55 / 1 (13.1); r3 55 / 1 (14.8) | 56 / 0 (13.0) | `light-{,r2-,r3-}chromium-E-5.log`, `wk-W1.log` |
| E-6 | 4 / 2 / 8 U (4.5) | 2 / 2 / 8 U / 2 R (11.2) | |
| E-7 | 6 / 1 (4.3) | 6 / 1 (15.5) | |
| E-8 | 19 / 0 (5.0) | 19 / 0 (5.1) | |
| E-9 | 72 / 6 / 2 R (5.0) | 72 / 6 / 2 R (4.8) | |
| E-10 | 4 / 0 / 2 R (7.3) | 4 / 0 / 2 R (4.7) | |
| E-11 | 2 / 0 / 2 U (6.7) | 2 / 0 / 2 U (4.9) | |
| CAP (capture) | 12 / 0, 24 R (4.8) | 12 / 0, 24 R (12.2) | `cap-light-chromium.log`, `wk-W1.log` |

### 1.2 · Probes on the light build

| probe | Chromium (load) | WebKit (load) | reading |
|---|---|---|---|
| `a3-probe` (P-A3's) | 57 P / 1 F / 9 R (6.5) | 46 P / 1 F / 11 U / 9 R (11.3) | CK-21: 33 P per engine. The 1 FAIL is the tabs clock, whose single `console.error` names "the indicator's translate clock", not `--tab-indicator-duration`. CK-14: 2/2 per engine. CK-13 forced colours: 11/11 per engine. CK-13 reduced transparency: 11/11 in Chromium; 11 UNMEASURED in WebKit (the engine does not apply the query). CK-20: the lists are reported |
| `ca3-probe fcslop` | 6 P (off) / **6 F (forced)** (4.9) | 6 P / **6 F** (11.8) | §0 item 2 |
| `ca3-probe radio` | REPORT (4.9) | REPORT (12.0) | §0 item 3 |
| `radiopix` | REPORT (7.4) | REPORT (11.7) | Radio dark face L 0.157 → 0.218 → 0.213 (Chromium), 0.141 → 0.215 → 0.2165 (WebKit). Radio light 0.248 → 0.262 monotone (Chromium). Checkbox control: dark 0.203 → 0.263 → 0.258 |
| `ck16` | 2 P / **2 F** (12.3) | 0 P / **2 F** / 2 U (11.8) | §0 item 4. WebKit has no CDP, so its layout count is UNMEASURED |

### 1.3 · Plants (`plant.sh`, applied in `wt-plant` only)

| plant | row | must fail | Chromium (load) | WebKit (load) |
|---|---|---|---|---|
| P1 Switch root loses `engage-chosen` | CK-01 | E-1 adoption + latch | **FAIL**: switch NOT ADOPTED, 3 scenes; latch 53/55 (6.6) | **FAIL**, the same (6.8) |
| P3 Checkbox loses its door | CK-03 | `arrival·own`, `ownflush` | **FAIL** 4/4: light above rest 0.0249 (light), 0.0326 (dark) (17.0) | **FAIL** 4/4: 0.0246-0.0314 (14.6) |
| P4 seat reclaims the dock trigger `::after` | CK-14 | a3-probe ck14 | **FAIL** 2/2: slop at −22, −22 (centred −6, −10), lit `/ 0.062` at 60 ms (16.6) | **FAIL** 2/2, the same (18.6) |
| P6 Button `--rung-light: transparent` | CK-02 | Button arm iii | **FAIL** 8/8: rise 0.0000 (17.0) | **FAIL** 8/8 (14.6) |

Plant E-2 as a whole read 127 P / 37 F (Chromium, load 17.0): the 20 light-build fails plus 13 from P3/P6, plus 4 more that P1 forces (the Switch with no seat). The plant E-1 run reads 91/5.

### 1.4 · The geom build, and the WebKit plant reads

| run | Chromium (load) | WebKit (load) |
|---|---|---|
| geom E-2, arms i,ii,iii | **164 / 0 / 16 R** (15.4) | **164 / 0 / 16 R** (19.1) |
| geom E-9 | 60 / 18 / 2 R (14.3) | 60 / 18 / 2 R (14.9) |
| plant E-1 | 91 / 5 (6.6) | 91 / 5 (6.8): P1 switch NOT ADOPTED on 3 scenes, latch 53/55 |
| plant E-2 | 127 / 37 (17.0) | 122 / 42 (14.6): P3 checkbox `arrival·own`/`ownflush` FAIL 4/4 (0.0246-0.0314 above rest); P6 Button arm iii 0.0000 on 8/8 |
| plant a3-probe ck14 | 0 / 2 (16.6) | 0 / 2 (18.6): slop at −22, −22, lit 60 ms after opening |

The second WebKit acquisition queued at 22:22:34 and waited about 68 min for the `webkit` lock, which other seats held. It was admitted near 23:30 and ended at 23:40:01. No cell was skipped. **Every plant fails its cell in both engines**, and the geom build passes all 164 E-2 cells in both engines once arm ii is admitted. Its E-9 reads 60/18 in both: no member keeps a light transient under reduce (CK-10, a cost of arm ii).

## 2 · Per row (CK-01..CK-27), the light build

**CLOSED** means green by my own replay in both engines, or by a source or record reading for a row that has no engine cell. **OPEN** means a counterexample stands or a cell is unmeasured. **OWNER** means open under a standing default.

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/4 | 92/4 | Every rendered member root computes its declared class. Plant P1 fails it. **The latch reads 54/55 and stays RED**: `dock` is unproven (D2's fence; no H3 scene renders it). Also failing: the Aurora `ambient` runtime cell (Chromium 0.00 levels against 0.00 at rest; WebKit 1.16 against 1.11, under the 2× bound) and the Sheet's PRM press (no target: O-74c) | OPEN |
| CK-02 | E-2 144/20 | 141/23 | Three members fail arm iii (§0 item 3). Geom passes 164/164 in both engines but arm ii is not admitted under Q-5 (a). The Radio dark zero is the fill absorbing a seat that does paint, not an absent seat | **OWNER** (Q-5) |
| CK-03 | mount 18/18; pre, own, ownflush 14/14 each, 4 R | identical | Quiet in both engines. P3 fails the cell. The `late` failures (5 per engine) are CK-02's arm, not CK-03's | **CLOSED** |
| CK-04 | E-3 20/2 | 20/2 | Phone touch-held ×1.000 on both axes, both themes (358.0 × 24.0 at rest and held). A alone has no phone arm under Q-3 (c); E's composition carries it | OPEN on A |
| CK-05 | E-4 14/0/4 U | 11/0/8 U | The Sheet is UNMEASURED in both engines (in flow, O-74c G-1); the WebKit Carousel is UNMEASURED (no touch scrolling). Every measured cell passes | OPEN (UNMEASURED cells) |
| CK-06 | E-5 fails 3/3 reads | 56/56 | §0 item 4: sustain ×0.73 (accordion light, then toggle light) and ×0.89 (toggle dark), at load 5.1, 13.1 and 14.8 | OPEN |
| CK-07 | E-6 4/2/8 U | 2/2/8 U | No idle animation, as Q-2 (b) wants. The row closes only by the owner's words | OWNER |
| CK-08 | E-7 6/1 | 6/1 | `data-held` has two writers, `useEngage.ts` and `GlassDock.vue`. The dock's write is D2's, named in F5′ (F-4) and in the door's header. The row's named-attribute clause covers it | **CLOSED** (by the clause) |
| CK-09 | E-8 19/0 | 19/0 | One clock, no rung literal, PRM included | **CLOSED** |
| CK-10 | E-9 72/6 | 72/6 | Switch light, Radio light, tabs (both themes, 0.0000) and accordion (both themes) lose the transient under reduce. The Button does not squish under reduce, and the tabs indicator follows the finger, both among the passes | OPEN |
| CK-11 | — | — | Source: `.tap-squish` and `.interactive-item` have no rule in `src/` (`base.css:163` says retired, no alias). No `scale: none` override of them; the five `scale: none` hits are `animations.css` and `glass/reveal.css` reveal arms. The capsule's dock-tab press stays D2's | **CLOSED** (source) |
| CK-12 | — | — | **On A alone, `--scale-engage: 1.06` sits on the scale paper (`tokens/scale-paper.css:32`), not on the ladder's engaged row.** `engageLadder.ts:182-193` carries no scale; E adds it. That is the named instance, unchanged since C-A2. F-5 (the slider carry's margin) is "ruling owed, not widened" (`F5p.md`). The Switch thumb rides `--spring-dock` (`switch` styles :49), and the release rule has its own constant (`engage/release.ts`), both as the row asks | OPEN |
| CK-13 | forced 11/11, transparency 11/11 | forced 11/11, transparency 11 UNMEASURED (engine limit) | Each recipe, the veil-less held grow, and the pager's `[data-press]` state an arm and read it. The WebKit PRT cell is the engine's limit, as the row marks it. The dock-slop loss in §0 item 2 is scored at CK-14, the row it breaks | **CLOSED** (WebKit PRT marked as the engine's limit) |
| CK-14 | ck14 2/2; **fcslop 6 F** | ck14 2/2; **fcslop 6 F** | §0 item 2: the 44 px floor does not hold under forced colours on a coarse pointer. The coarse Button does not latch (capture: released ×1.000 in both engines, both themes) | **OPEN** |
| CK-15 | — | — | No cell on this build counts the engaged controls during a hand-off. E-10's hand-off films show the outgoing control falling to ×1.000 and the incoming one rising, in both engines, but not that only one is engaged at any frame. I do not close a row on that inference | OPEN (unread) |
| CK-16 | 0.0 layouts/s; off-screen **FAIL** ×2 | off-screen **FAIL** ×2; layouts UNMEASURED | §0 item 4 | OPEN |
| CK-17 | — | — | UNMEASURED (owner's safaridriver checkbox). Every visual claim here is Playwright WebKit, not Safari | OWNER |
| CK-18 | — | — | Slider, sortable and tabs drag consume the release rule (F5′; E-4 carry and continuity cells pass in both engines). The Sheet is UNMEASURED (O-74c G-1) | OPEN (Sheet) |
| CK-19 | — | — | The class exemplars render in both engines (CAP 12/0 each; E-1 `gallery rendered` passes). **The `ambient` exemplar does not do what the row defines it to do** ("a pointer move changes paint"): E-1 reads 0.00 levels in Chromium and 1.16 against 1.11 drift in WebKit, and the twelve ambient frames per theme and pointer are identical in my capture (`glance/frames/ca3-light-chromium-fine-light-ambient-{rest,…,released}.png`). H3's self-test green is H3's read; I did not replay it | OPEN |
| CK-20 | E-10 4/0; a3-probe lists | E-10 4/0; lists identical | The Escape release, hand-off drop and hand-off rev each move the centre 0.0 px, with the scale drop inside its own release + 0.002. The re-render landing moves 1.4 px (Chromium) and 1.6 px (WebKit) against the same without the insert. The sortable and tabs continuity cells pass (E-4). I did not re-read the geom lists; the geom build is not the default | **CLOSED** on A's paths |
| CK-21 | 33 P + tabs (1 error, names the clock) | same | One `console.error` per unreadable token on every member, 0 on a clean commit. The tabs clock fails loud too, but its message names the resolved `translate` clock rather than `--tab-indicator-duration`; the row asks for one error, which it gets | **CLOSED** |
| CK-22 | — | — | P-A3's M-1..M-6 with F5's list. I re-ran `A3/ck22-greps.sh` at 22:05 (`logs/ck22-greps.txt`). Every count reproduces; only three line numbers have moved in keyframes.js and fourier-analysis. The Escape row is E's: A's door clears its key state on Escape without `preventDefault` (`useEngage.ts:252`), so no consumer-visible Escape path changes on A | **CLOSED** |
| CK-23 | — | — | `git apply --numstat`: light 165 / +2542 / −1280; geom 166 / +2515 / −1281. Both match P-A3 §2 | **CLOSED** |
| CK-24 | E-1 static cells pass | pass | `static` stamped with its reason and read at runtime (Timeline's root, the passive scene) | **CLOSED** |
| CK-25 | §3 | §3 | Not iOS-27 grade | OPEN |
| CK-26 | — | — | A adds no lighting layer; the seat carries the commit's state. The selectable Chip's `plus-lighter` flood is gone (no `plus-lighter` under `src/components/chip*`; the hits are view-transition, track-flow and glass material). The dark Button's warm halo is HEAD's: the pixels sampled through it are identical at HEAD (`H3/capture/frames/head-chromium-coarse-dark-button-rest.png`) and on A. It is not added, though O-87 would strip it. The stage veil is E's | **CLOSED** for A |
| CK-27 | — | — | Each new cell I planted fails (§1.3). No alias. The Radio note in P-A3 §6 item 2 is a misread (§0 item 3), not a masked fallback. The tabs clock's masked fallback is cured. One gate shortfall: P-A3's CK-13 forced-colours cell reads only member seats, so it passed while the arm removed D2's slop. That defect is scored at CK-14, not here | **OPEN**: the forced-colours cell is a gate that cannot fail for the one pseudo-element the arm reaches beyond its members (§4 item 1) |

Closed: **11/27 = 41 %** (pass 2's C-A2: 6/27). Open on the owner alone: CK-02, CK-07, CK-17, and the Sheet halves of CK-05 and CK-18.

## 3 · CK-25 · the gestalt

These are my reads of the frames, not the seat's. The sheets are `glance/ca3-light-{chromium,webkit}-{fine,coarse}.png`; the frames are `glance/frames/ca3-light-<engine>-<pointer>-<theme>-<scene>-<state>.png`. Chromium and WebKit read alike in every row below, except where a row says otherwise.

**Verdict: not iOS-27 grade.** The press register is deft. The commit, the disclosure and the coarse hold are not.

1. **The commit cannot be seen.** In `…-chromium-fine-light-switch-committed.png` against `…-released.png` the only change is the thumb's travel, which is arm i's job. The light arm adds nothing a person can see in the light theme, and the meter agrees (0.006). Dark (`…-fine-dark-switch-committed.png`) is the same. The Button's committed frame (`…-fine-light-button-committed.png`, ×1.001) is indistinguishable from rest. Under Q-5 (a) the route has no visible "it happened" beat on the near-white members. That is the opposite of iOS 27's acknowledged commit.
2. **The disclosed press is a slab.** `…-chromium-coarse-light-accordion-held.png` and its WebKit twin paint an opaque `#dfdedc` pill across the whole 320 px row, from pressed through engaged. That is a heavy grey flood, not a deft wash, and it is still C-A2's CK-25 frame. Dark (`…-coarse-dark-accordion-held.png`) reads quieter but has the same shape.
3. **The coarse hold reads as a bug.** In `…-chromium-coarse-light-slider-held.png` the world frosts behind the slider while the slider stays ×1.000. The engaged column shows the same. The fine pointer grows ×1.060 (`…-fine-light-slider-held.png`). This is Q-3 (c) on A alone, unchanged since pass 2.
4. **The fine hold's veil blurs the words beside the slider.** In `…-fine-light-slider-held.png` the "before" and "after" labels go soft. Under O-87's "slightly less blur" that is heavy. Separately, the slider's loupe floats about 30 px above its track (`…-fine-light-slider-pressed.png`). HEAD paints it the same way (`../pass-2/H2/glance/frames/head-chromium-fine-light-slider-pressed.png`), so it is not A's.
5. **What is right.** The Button's press swells ×1.033 and returns: weighted, quiet, and the same in both engines. The keyboard-engaged slider (`…-fine-light-slider-engaged.png`) grows ×1.060 inside a crisp ring with no veil, the deft frame of the set. The Switch thumb travels cleanly in both themes.
6. **O-87 residue.** The dark Button carries a warm halo at rest (`…-coarse-dark-button-rest.png`). It is HEAD's and pixel-identical there, so A did not add it. It is still the "glow halo" O-87 names, and the glance shows it on every dark Button frame.
7. **D-2 is not shown on `ambient`.** The Aurora's six states are the same frame in each theme (`…-fine-light-ambient-*.png`).

## 4 · Next-pass defect classes (recorded; no row added)

1. **A pseudo-element arm whose selector is wider than the members it was read on.** The forced-colours seat removal reaches D2's hit-slop. The same shape as §P2-7 item 8, now on the FL-3 arm. Scored at CK-14; the gate gap is CK-27's.
2. **A light that peaks inside the fill's own transition is absorbed by it.** The Radio's dark seat reaches 0.97 opacity before the fill lands, and the paint shows ≤ 0.005. Read the light's envelope against the fill's clock before calling a face's ceiling.
3. **E-5 sustain moves between members across reads** (toggle, accordion; both use the same press wash, with identical figures 0.286 → 0.209). §P2-7 item 14, reproduced three times at low and high load. It reads as one defect of the shared wash's clock, not a flake.
4. **No cell counts engaged controls during a hand-off** (CK-15 cannot close on any build without it).
5. **Infinite `static` loops keep running off-screen** (CK-16). The census reads `static`; nothing pauses the loop when the element leaves the viewport.

## 5 · Fences and housekeeping

- No tracked source changed in the checkout, and no git write ran in it.
- Patches and plants were applied only in this seat's three worktrees.
- Every write in the checkout is under `docs/tranches/BL/design/engagement/pass-3/` (`C-A3.md`, `C-A3/`).
- Sibling repos were read only, by grep; value.js was not built or run.
- Every build and browser run went through `guarded`; every WebKit run went through `--exclusive webkit`, queued.
- One heavy run at a time, headless shell, no GPU args, one browser per run with a fresh context per cell.
- No zone-count refusal occurred.
- The three worktrees were removed with `git worktree remove --force`; nothing of this seat's is left running.
- The plant backup (`C-A3/plant-backup-scratch/`) was removed with the plant worktree.
