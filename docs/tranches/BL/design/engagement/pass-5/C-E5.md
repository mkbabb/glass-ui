# D5 pass 5 · C-E5 · critique of the composition A+E (F5″ + P-A5-light + P-E5-noveil-coarse)

| field | value |
|---|---|
| seat | D5 pass 5, **C-E5**, the fresh adversarial critic of the composition (`../REGISTRY.md` §P4-8.3 wave 3). I authored no D5 seat in passes 2-5 and was neither a pass-3 nor a pass-4 critic |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | Checkout HEAD `83241f9b8` (docs commits only since P-E5's `78fc8f3b8`: `git diff --stat 78fc8f3b8 HEAD -- src tests package.json demo vite.config.ts` prints nothing). Worktree `.claude/worktrees/bl/D5/p5/C-E5/wt` = HEAD + `P-E5-noveil-coarse.patch` (which carries F5″ and P-A5-light, P-E5 §0 base). The other three arms are the two constants in `stage.ts`: `diff` of the four patches shows only the `STAGE_VEIL`/`POINTER_STAGE` lines and the blob index line. Removed with `git worktree remove --force`, and `…/p5/C-E5/` is gone |
| patch hashes | `shasum` at this seat: noveil-coarse `bd973aeb…`, veil-coarse `add39aaf…`, noveil-every `b061f5a0…`, veil-every `0edf628b…`, P-A5-light `b1e972b9…`, P-A5-geom `181caeaf…`. All match their reports; all six pass `git apply --check` at HEAD |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell, from `glass-ui/node_modules/playwright`; one Chromium run under H5's named GPU arm (`--gpu metal`, CK-19 only). **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**; O-103 records it not granted |
| harness | H5's, read from the checkout, unedited. Every scoring battery ran on the harness's own app (scene app `7c8bcdaafb44` in every build log). Probes (P-E4's `e4-probe`, C-E4's `ce4-probe`, C-A4's `ca4-probe`, P-A3's `a3-probe`, P-A5's `a5-ladder`, P-E5's `slider-press`, and my `ce5-probe`) are probes, not witness reads |
| owner state | `../../../audit/INBOUND.md` (mtime 2026-10-21 01:50) and `../../../FORMATION-PROGRESS.md` read at the seat's start and re-read at its end: no ruling on Q-5, Q-2, Q-3, the engine-limit clauses, O-74c G-1 or the safaridriver checkbox. Every owner-gated row below is **OPEN ON ITS DEFAULT** (Q-1 (c), Q-2 (b), Q-3 (c) as built, Q-4 (b), Q-5 (a)) |
| run | 2026-10-21 02:04 → 05:40. Chromium chain 02:05-04:17 (it shared the D5 harness lock with C-A5, so witnesses waited). **WebKit: one `guarded --exclusive webkit --timeout 90` acquisition**: queued 04:17:26, admitted 04:23:56 (a 6.5 min wait, load 15.2), released 05:25:26 (load 9.1), `guarded exit 0` (`C-E5/logs/chain-webkit.log`). Every WebKit stage ran inside it; none skipped, no cell UNMEASURED for want of the lock, no `ENGINE CLOSED`, no page close, no zone refusal. Chromium re-reads 05:25-05:36; gates 05:36-05:38 |
| records | `C-E5/run-ce5.sh` (stages), `C-E5/plants-ce5.sh` (every plant, applied and restored byte-identical: `logs/stage-builds.txt`), `C-E5/chain-ce5.sh`, `C-E5/phase-{chromium,webkit,chromium-r}.txt` (order of record), `C-E5/probe/{ce5-App.vue,ce5-probe.mjs}`, `C-E5/cells.mjs` (JSON reader), `C-E5/logs/` (every build, witness, probe, plant, capture and gate log with its 1/5/15-min load at start and end; `chain-*.log` the runs of record), `C-E5/json/<build>[-rN]/`, `C-E5/glance/` (8 sheets, 1728 frames) |

## 0 · In brief

**Score: 14 of 27 rows closed by my own replay in both engines (52 %).** Closed: CK-03, 04, 08, 09, 11, 12, 13, 14, 15, 22, 23, 24, 26, 27. Open: CK-01, 02, 05, 06, 07, 10, 16, 17, 18, 19, **20**, **21**, 25. This is **not a clean pass**, and **the loop is not at its fixed point**: four rows still hold counterexamples that building can remove (CK-10, CK-20, CK-21, and CK-25's gestalt, plus CK-01's/CK-19's ambient and CK-06's gleam carried from pass 4). **The gestalt is not iOS-27 grade** (§3).

1. **CK-20 has a new counterexample in E's cure: the place observer goes blind inside a clipping scroller.** `stage.ts watchPlace` arms its IntersectionObserver at threshold 1, and when a scroller clips the rest box it re-arms at the box's own ratio. A layout move **toward the visible side** keeps the visible area, so the ratio does not change and no report fires. The place goes stale and the next unrelated mutation glides from the old place. My probe `ce5-probe` keyboard-engages a slider in a 120 px `overflow: auto` box (`overflow-anchor: none`), scrolls the box so 14 of the footprint's 20 px are clipped, moves the slider 12 px by a style write, then appends a node below the box:
   - **Chromium: largest one-frame move 12.7 px** (bound ≤ 4) on top and bottom clips, **on all four arms**, in v1 (load 5.9-13.9) and v2 (load 9.1-11.1). That is 2 of 2 reads per arm.
   - **WebKit: 12.7 px** reveal on all four arms. The conceal twin (moving away from the visible side) **also fails, at 12.4-12.7 px**. Chromium passes it (0.0 px), as the threshold reasoning predicts.
   - The control (no move) reads **0.0 px** in both engines on every arm.
   - H5's `restale` cells (no scroller) pass, 0.0 px in both engines, and the `nowatch` plant restores their fail. So P-E5's cure holds for the cell it was written for and is blind to this class.
2. **CK-21 is reopened on A's bytes: the control bit's own clocks degrade silently.** The control bit's state mark (`control-bit.css` `.control-bit__mark` opacity) and its face's colour transitions still run on `--engage-control-engage-{attack,release}`. P-A5 replaced `useEngage`'s `COMMIT_CLOCKS` with the commit-light pair, so those clocks are no longer read loudly. P-A3's `a3-probe ck21` plants `nonsense` on each and reads **0 `console.error` on 16 of 16 cells** (8 members × attack/release) in **both engines**. Pass 4 read the same probe 33/34 (C-E4 CK-21). E-11's three slider tokens still fail loud, and my `LOUD` plant silences all three in both engines, so E-11 bites. It just does not carry these two clocks.
3. **CK-10: A's "the same row answers the toggle dark's absorption" does not reproduce in Chromium.** E-9 `toggle commit-light dark` reads **0.0080, 0.0061 and 0.0069** in paint across three Chromium reads (bound 0.01; load 6.5-19.6), so it fails 3 of 3. WebKit passes. P-A5 read 0.0116-0.0117. Beside it in Chromium: Switch light 0.0049-0.0090, checkbox light 0.0087, toggle light 0.0073-0.0088 and chipaction dark 0.0067-0.0076, all under reduce. The accordion light is 0.0000 in both engines (Q-5 (2)).
4. **CK-20, the Chromium hand-off scale drop, reproduces.** `slider2 hand-off drop|rev` fails in 2 of 3 Chromium reads of the candidate: 0.0113 against 0.0084, then 0.0109 and 0.0122 against 0.0093. It also fails once on noveil-every (0.0124). Loads were 6.4-19.6, so this is not load. WebKit passes on all four arms. A's +60 rebound gives 1 pulse on 1-3 cells in every Chromium read of every arm (chip dark, accordion, switch on the coarse/every arms). WebKit passes on all arms.
5. **What P-E5 and P-A5 claimed that I reproduced:**
   - the stale place on H5's cells (0.0 px, both engines, all arms);
   - Q-3's arms;
   - E-3 22/0 everywhere;
   - the carry, now unimodal: 6.50-6.69 px over 3 Chromium reads, 7.35 px WebKit;
   - the wheel, the anchor, the ladder (CAP 14/0, accordion deepens 0.0875 light / 0.0064 dark);
   - the card press at +50 ms;
   - the rebound's onset inside 150 ms (+9..+21 ms);
   - the gates: build, typecheck, demo:dist:build exit 0; vitest 2402 + boot-graph 14/14 after the dist build = 2405 passed, as P-E5 §2;
   - the cost: 182 files +4616/−1498.

## 1 · What I ran

Counts are pass/fail(/unmeasured). The load is the 1-minute average at the witness's start unless marked; every log carries all three averages at both ends.

| run | Chromium | WebKit | record |
|---|---|---|---|
| builds: 4 arms × (harness app, `e4-probe` app, `ce4-probe` app, `ce5-probe` app); 10 plant builds; the P10 source tree | all exit 0; every plant applied (grep) and restored (`git diff --shortstat HEAD -- src` 143 files +3005/−1237 before and after each) | — | `logs/stage-builds.txt`, `logs/build-*.log` |
| **candidate E-1..E-12** | 92/2/2U (9.1) · 133/31, 21 DISAGREES (7.9) · 22/0 (13.1) · 14/0/4U (20.5) · 54/2 (20.5) · 4/2/8U (15.1) · 6/1 (13.4) · 19/0 (14.3) · 72/6 (10.9) · 26/2 (19.6) · 3/0/1U (15.0) · 65/0 (22.5) | 92/4 (15.2) · 138/26, 12 DISAGREES (16.7) · 22/0 (8.3) · 11/0/8U (7.5) · 54/2 (10.2) · 2/2/8U (8.0) · 6/1 (8.0) · 19/0 (9.7) · 77/1 (8.6) · 28/0 (11.2) · 3/0/1U (10.2) · 64/0/1U (9.9) | `logs/bat-noveil-coarse-<engine>-E-n.log`, `json/noveil-coarse/` |
| candidate re-reads r2, r3 | E-10 27/1, 23/5 · E-4 14/0/4U ×2 · E-9 73/5 ×2 (6.4-12) | — | `json/noveil-coarse-r{2,3}/` |
| CK-19 GPU arm (`--gpu metal`, "ANGLE Metal Renderer: Apple M5 Max") | ambient **FAIL 1.16 vs 1.14** (20.5) | (WebKit on hardware as is) **FAIL 1.18 vs 1.13** | `logs/one-noveil-coarse-chromium-e1-census-gpu.log` |
| veil-coarse / noveil-every / veil-every: E-1, 3, 4, 10, 11, 12 | E-1 92/2/2U ×3 · E-3 22/0 ×3 · E-4 14/0/4U ×3 · **E-10 25/4, 23/5, 28/1** · E-11 3/0/1U ×3 · E-12 65/0 ×3 (6.4-13.5) | E-1 92/4 ×3 · E-3 22/0 ×3 · E-4 11/0/8U ×3 · **E-10 29/0, 28/0, 29/0** · E-11 3/0/1U ×3 · E-12 64/0/1U ×3 | `json/<arm>/` |
| `ce4-probe` (C-E4's stale place, wheel, clip, anchor), 4 arms | 9/0/2R each | 9/0/2R each | `logs/xp-ce4-probe-*` |
| `e4-probe`, 4 arms | 22/1 · 23/0 · 20/3 · 23/0 | 20/1/1 · 21/0/1 · 20/1/1 · 21/0/1 | `logs/xp-e4-probe-*` |
| **`ce5-probe`** (mine), 4 arms | keyboard: reveal **FAIL 12.7 px** ×2 sides, conceal and control PASS, on every arm, v1 and v2; pointer cells NOT DRIVEN (§4.1) | keyboard: reveal **FAIL 12.7 px**, conceal **FAIL 12.4-12.7 px**, control PASS, every arm; pointer NOT DRIVEN | `logs/xp-ce5-probe-*` (`-v1` = first version) |
| `ca4-probe --only cardpress,rebound`, `a5-ladder`, `slider-press`, `a3-probe --only ck13,ck21` (candidate) | 11/0 · 6 P / 4 U (collapsible, menu: hit test misses) · 1/1 then 2/0, 2/0 · CK-13 22/22, **CK-21 17 FAIL** | 11/0 · as Chromium · 2/0 · CK-13 forced 11/11, PRT 11 U (engine limit), **CK-21 17 FAIL** | `logs/xb-*` |
| capture CK-25, 4 arms | CAP 14/0 each (ladder 2/2) | CAP 14/0 each (ladder 2/2) | `glance/` |
| plants (§2, CK-27) | every plant fails its cell | every plant fails its cell, except P7 and `act`: Playwright WebKit sets `:active` at touchStart, so the plants have no input there (H5 §2.2's N/A class) | `logs/bat-plant-*`, `json/plant-*` |
| gates (candidate) | build 0 · typecheck 0 · vitest 244/245 files (the boot-graph file needs dist-demo) → demo:dist:build 0, boot-graph 14/14 → **2405 passed, 10 expected fail, 1 skipped** | — | `logs/gates.log` |
| CK-22 consumer greps, nine siblings (read only; value.js by grep only) | 0 hits for `.glass-slider…:active`, `glass-loupe`, `glass-focus-veil`, the arm constants, `.card…:active`, quiet/text Button `:active`, the commit-light clocks or `control-bit__light` | — | `logs/ck22-greps.txt` |
| cost | `git diff --shortstat HEAD` in the worktree: **182 files, +4616/−1498** (src 143 files +3005/−1237) | — | `logs/stage-builds.txt` |

## 2 · Per CK row (the candidate noveil-coarse; the other arms where they differ)

**CLOSED** = closed by my own replay in both engines, or by source reading plus a plant for a row with no browser leg. **OPEN ON DEFAULT** = owner-gated, with the ruling that closes it named.

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/2/2U; the GPU arm ambient **FAIL 1.16 vs 1.14** | 92/4; ambient **FAIL 1.18 vs 1.13** | `dock` latch 54/55 (D2); Sheet PRM press has no target (O-74c G-1); the ambient exemplar does not answer the pointer on hardware in either engine. P1 (Switch loses `engage-chosen`) and P2 (Card focusable under static) fail adoption, static-inert and the latch in both engines | **OPEN** (D2 latch; O-74c; the ambient cell, buildable) |
| CK-02 | E-2 133/31, 21 DISAGREES; paint fails switch/checkbox/toggle/chip light, accordion both themes, chipaction dark, Button pointer dark (0.0087) | 138/26, 12 DISAGREES; switch/checkbox/toggle/radio/chip light, accordion | the early-onset light over a darkening fill (P-A5's ruled trade). P6 (Button `--rung-light: transparent`) fails 8/8 Button cells in both engines | **OPEN ON DEFAULT** (Q-5 (1), and (2) for the accordion) |
| CK-03 | mount and `arrival·pre/own/ownflush` pass; `arrival·late` fails only on CK-02's bound | same | P3 (Checkbox without its door) fails `arrival·own/ownflush` in both themes and both engines | **CLOSED** |
| CK-04 | E-3 22/0 on all four arms; `e4-probe` fine hold in place, touch hold promoted | same | `k-char` 20/2, `k-script` 20/2, `k-tabhand` 20/2, `k-mod` 18/4, each failing exactly its cells in both engines | **CLOSED** |
| CK-05 | E-4 14/0/4U ×3; slider carry 6.69, 6.55, 6.50 px | 11/0/8U; carry 7.35 px | Sheet UNMEASURED (in flow, O-74c); WebKit Carousel UNMEASURED (no touch scrolling). P-E5's bimodal carry is NOT-REPRODUCED here | **OPEN ON DEFAULT** (O-74c G-1; the engine-limit clause) |
| CK-06 | E-5 54/2: Button sustain `::before` NOT LANDED by +200 (light and dark) | 54/2, same cells | A's gleam stays on `:active` (P-A5 gap 3). The slider's press on `[data-held]`: `slider-press` 2/0 in WebKit, 2/0 on two of three Chromium reads; one read held at +28 ms against the probe's +25 (load 6.3), NOT-REPRODUCED in two re-reads. P7 fails E-5 toggle sustain in Chromium; `act` fails `slider-press` 0/2 in Chromium | **OPEN** (A's gleam, buildable) |
| CK-07 | E-6 4/2/8U | 2/2/8U | no idle rung | **OPEN ON DEFAULT** (Q-2) |
| CK-08 | E-7 6/1 | 6/1 | the fail is `GlassDock.vue`'s `data-held` (D2), the row's named clause. P10 (a second `data-press` writer) fails `writers data-press` in both engines | **CLOSED** (named clause) |
| CK-09 | E-8 19/0 | 19/0 | P11 (a 77 ms literal on the Chip's press) fails `literal chip` in both engines | **CLOSED** |
| CK-10 | E-9 72/6, 73/5, 73/5: **toggle dark 0.0080/0.0061/0.0069**, switch light 0.0049-0.0090, checkbox light 0.0087, toggle light 0.0073-0.0088, chipaction dark 0.0067-0.0076, accordion light 0.0000 | 77/1: accordion light 0.0007 | tabs under reduce pass in both themes and engines (A's item), and P8 fails them (0.0000) in both. The toggle-dark absorption A claimed does not reproduce in Chromium (§0 item 3) | **OPEN** (A's, buildable; accordion face Q-5 (2)) |
| CK-11 | — | — | `.tap-squish`/`.interactive-item` appear only in retirement comments; the slider's `:active` legs are gone (`grep`); `KEYBOARD_VEIL` has no reference left | **CLOSED** (source) |
| CK-12 | — | — | `commit-light` is an `ENGAGE_ENVELOPES` row (60/480, attack inside `ENGAGE_ATTACK_CLASS` 40-60) with a rider and a physical reason: it drains on four fill clocks so it holds about ¾ charge when the fill lands. Its comment also cites the 0.01 bound the three-clock trial missed. I read that as the effect's measurement, not the sampler's, so it is admissible, but it is the closest call on the row. The disclosed press `--fill-hover × 200 %` is two ladder rungs summed. `--loupe-ring` (0.3 × track height) is loupe geometry beside the existing `--loupe-k-max` and `--loupe-span` | **CLOSED** (source) |
| CK-13 | `a3-probe ck13` 22/22 (forced colours, reduced transparency); `e4-probe` FC/PRT holds pass | forced colours 11/11; PRT 11 UNMEASURED (the row's engine-limit clause) | | **CLOSED** |
| CK-14 | E-12 65/0 incl. `fcslop`, `fc-reach` | 64/0/1U (the U is CK-16's) | P4 (the forced-colours arm reaches the dock triggers' `::after`) fails `fcslop` and `fc-reach` in both engines | **CLOSED** |
| CK-15 | `hand-off singleton fwd|rev` max 1 engaged root per frame (117/115 frames) | same | | **CLOSED** |
| CK-16 | `rest layouts` 0.0/s; off-screen PASS | off-screen PASS; layouts UNMEASURED (no counter) | | **OPEN ON DEFAULT** (engine-limit clause) |
| CK-17 | — | — | **UNMEASURED (owner's safaridriver checkbox)**, now including the place observer inside a clipping scroller. The naming half still has the Button gleam on `:active` (P-A5 gap 4) | **OPEN ON DEFAULT** (Safari; gleam half buildable) |
| CK-18 | slider, sortable, tabs on the release rule | same | Sheet UNMEASURED | **OPEN ON DEFAULT** (O-74c G-1) |
| CK-19 | ambient ENGINE LIMIT under the default shell; **FAIL 1.16 vs 1.14** on the GPU arm | **FAIL 1.18 vs 1.13** | the six ambient frames are one frame in every sheet (`glance/noveil-coarse-*-fine.png`, ambient rows) | **OPEN** (buildable) |
| **CK-20** | H5 stale place 0.0 px (all arms); layout-only landing 1.2 px; **hand-off drop/rev FAIL in 2 of 3 reads** (0.0113; 0.0109, 0.0122); **+60 rebound 1 pulse** on 1-5 cells in every read of every arm; **`ce5-probe` clipped stale place 12.7 px** on all four arms | E-10 28/0 (all arms 28-29/0); **`ce5-probe` 12.7 px reveal and 12.4-12.7 px conceal** on all four arms | §0 items 1 and 4. Plants: `RBD` (the fill-clock delay restored) fails all 8 +60 rebound cells; `NOW` (no observer) fails H5's stale place and resize; `PAN` (a shared anchor) fails the hand-off, all in both engines | **OPEN** (E's clipped place; E's Chromium hand-off; A's rebound) |
| **CK-21** | E-11 3/0/1U; **`a3-probe` 17 FAIL** (16 control-bit clock cells, 0 errors; plus the tabs clock, as pass 4) | same, 17 FAIL | §0 item 2. `LOUD` (settle `loud` silenced) turns E-11 to 0/3 SILENT DEGRADATION in both engines | **OPEN** (A's, buildable) |
| CK-22 | E-12 wheel and both anchor cells PASS on every arm; `ce4-probe` wheel ×3, important anchor PASS | same | `ANC` and `WHL` fail their cells in both engines. Greps 0 hits (§1). E-M8, E-M9, E-M10 and P-A5's four MIGRATION rows cover every new consumer-visible path I found | **CLOSED** |
| CK-23 | — | — | 182 files +4616/−1498, as P-E5 §2 | **CLOSED** |
| CK-24 | E-1 `static` cells pass | pass | P2 fails `static-inert` in both engines | **CLOSED** |
| CK-25 | CAP 14/0, ladder 2/2 | CAP 14/0, ladder 2/2 | `LAD` (press at 30 % of the hover) fails the ladder in both engines. §3: **not iOS-27 grade** | **OPEN** |
| CK-26 | — | — | no `plus-lighter`, radial gradient, glow or new shadow layer in the patch's `+` lines (the one `plus-lighter` hit is the comment recording its removal); the candidate shows no veil. The veil arm still reads `--glass-focus-veil-blur` → `--glass-blur-floating-radius` until 10.2.0 | **CLOSED** (source) |
| CK-27 | every plant I wrote fails its cell (§1); no film takes a mid-film screenshot; no alias (`KEYBOARD_VEIL` removed, not kept); the `e4-probe` noveil veil expectation is a stale probe, recorded, not counted green | same; P7 and `act` N/A by engine | the two witness blind spots I found (CK-20's clipped place, CK-21's control-bit clocks) are scored at the rows they break | **CLOSED** |

### 2.1 Q-3: the other three arms beside the candidate (the rows the constants move)

| cell | noveil-coarse (candidate) | veil-coarse | noveil-every | veil-every |
|---|---|---|---|---|
| E-3 C · W | 22/0 · 22/0 | 22/0 · 22/0 | 22/0 · 22/0 | 22/0 · 22/0 |
| E-4 C · W | 14/0/4U · 11/0/8U | same | same | same |
| E-10 C · W | 26/2 · 28/0 | 25/4 · 29/0 | 23/5 (incl. hand-off rev 0.0124) · 28/0 | 28/1 · 29/0 |
| E-12 C · W | 65/0 · 64/0/1U | same | same | same |
| `ce5` clipped stale (keyboard) C · W | FAIL 12.7 · FAIL 12.7 | FAIL 12.7 · FAIL 12.7 | FAIL 12.7 · FAIL 12.7 | FAIL 12.7 · FAIL 12.7 |
| `e4-probe` C · W | 22/1 · 20/1/1 | 23/0 · 21/0/1 | 20/3 · 20/1/1 | 23/0 · 21/0/1 |
| CAP C · W | 14/0 · 14/0 | 14/0 · 14/0 | 14/0 · 14/0 | 14/0 · 14/0 |

The `e4-probe` fails on the noveil arms are its pass-4 expectation of a veil element that the noveil arm no longer creates (P-E5 §3.2). The arms differ only where the veil shows (§3). The clipped-place defect is in every arm.

## 3 · CK-25 · the gestalt, read from my frames

**Not iOS-27 grade.** The frames, all under `C-E5/glance/`:

- **The held loupe reads as a toggle switch, not a lens.** `frames/noveil-coarse-chromium-fine-light-slider-held.png`: a grey pill with a round orange bead in its left half and a hairline mark at the centre. Nothing in it reads as the track magnified. Dark (`…-fine-dark-slider-held.png`): an amber bead in a dark pill. WebKit is the same (`noveil-coarse-webkit-fine.png`, held row). The pass-4 seam is gone. At `k` max the visible fill is a bead, as P-E5 §0 item 3 says itself.
- **The candidate's touch hold keeps the world crisp; the veil arm still does not.** `frames/noveil-coarse-chromium-coarse-light-slider-held.png` keeps "before/after" at full contrast. `frames/veil-coarse-chromium-coarse-light-slider-held.png` turns the field milky and washes the text; `…-coarse-dark-slider-held.png` turns it muddy. The 20 px floating blur stands until 10.2.0. **On Q-3 the noveil frames are the deft ones** (O-87).
- **The commit cannot be seen on the near-white faces.** `frames/noveil-coarse-chromium-fine-light-accordion-committed.png`: the row shows the hover rung's grey slab, the chevron mid-turn, and no light (E-9/E-2 0.0000). The Switch light commit (`…-fine-light-switch-committed.png`) reads as the fill change alone.
- **The coarse press on the chosen controls is faint.** `frames/noveil-coarse-chromium-coarse-light-switch-pressed.png` is barely different from rest (sheet row "chosen switch", ×1.000).
- **The ambient exemplar is static.** It is one frame across all six states in every sheet (`noveil-coarse-chromium-fine.png`, `noveil-coarse-webkit-fine.png`), consistent with CK-19's hardware fail.
- **The dark Button's warm halo** is still in every dark Button frame (`frames/noveil-coarse-chromium-fine-dark-button-rest.png`). It is HEAD's, D3's or the 10.2.0 wave's, not D5's.
- **What reads well:** the fine-pointer disclosed ladder now deepens (hover → press darker, `noveil-coarse-chromium-fine.png` accordion row; CAP ladder 2/2 both engines); the keyboard-engaged slider is a ringed ×1.060 track over a crisp world (`…-fine-light-slider-engaged.png`); the sortable's held row lifts cleanly.

## 4 · Next-pass defect classes (recorded; no CK row added, score unchanged)

1. **An observer armed to the ratio it first sees.** `watchPlace` re-arms at the clipped ratio, so it only hears moves that change the visible fraction. Scored at CK-20. The general class is a change detector whose threshold equals its rest reading.
2. **A loud read that follows a rename of the clocks it guards, not the clocks the CSS still runs on.** `COMMIT_CLOCKS` moved to the commit-light pair while `control-bit.css` still transitions on `--engage-control-engage-*`. Scored at CK-21.
3. **A probe that cannot drive the pointer path in a scroller.** Scrolling the box while a mouse hold is down ends the hold in both engines (`ce5-probe` v2: engaged false), and clipping before the press lets the press scroll the box back (v1). The clipped-place class is driven on the promoted keyboard path only; the in-place pointer path stays undriven. Recorded, not scored.
4. **The class from P-E5 §6 item 1 recurs.** The Chromium hand-off drop fails 2 of 3 reads here as well. Scored at CK-20.

## 5 · What P-E5 and P-A5 claimed that I reproduced differently

| claim | theirs | mine |
|---|---|---|
| CK-20 "stale place cured on all four arms" | 0.0 px on H5's and C-E4's cells | reproduced on those cells; a clipped scroller defeats it at 12.7 px in both engines (§0 item 1) |
| CK-21 "CLOSED for E's inputs" (P-E5); not read by P-A5 | E-11 3/0/1U | E-11 holds, but A's control-bit clocks are silent, 16/16 cells in both engines |
| CK-10 / CK-12 toggle dark absorption | E-9 toggle 0.0116-0.0117 | Chromium 0.0080, 0.0061, 0.0069 (3/3 FAIL); WebKit PASS |
| CK-05 slider carry bimodal (P-E5) | 3 of 9 Chromium reads under 4 px | 6.50-6.69 px over 3 Chromium reads, 7.35 px WebKit: NOT-REPRODUCED |
| CK-20 hand-off drop (P-E5) | 5 of 14 Chromium reads | 2 of 3 Chromium reads (one on noveil-every too); WebKit PASS |

## 6 · The fixed point

**Not reached.** The owner- and D2-blocked cells are:

- CK-02 (Q-5);
- CK-07 (Q-2);
- CK-05/CK-18 and the Sheet half of CK-01 (O-74c G-1);
- CK-16 and CK-05's WebKit Carousel (the engine-limit clause);
- CK-17 (safaridriver);
- CK-01's `dock` latch (D2);
- CK-10's accordion face (Q-5 (2)).

Beside those, buildable counterexamples remain on six rows:

- CK-20: E's clipped place, E's Chromium hand-off drop, and A's +60 rebound.
- CK-21: A's control-bit clocks.
- CK-10: the toggle dark, switch, checkbox and chipaction lights under reduce in Chromium.
- CK-06/CK-17: the Button gleam on `:active`.
- CK-19 and CK-01's ambient cell: the Aurora on hardware.
- CK-25: the loupe, and the commit seen on near-white faces.

## 7 · Fences kept

- **No tracked source in the checkout changed.** No git write ran in the checkout. `git apply --check` was the only command run against its tree. `git apply`, `git add -N` and `git diff` ran on the worktree's own index, which was removed with it.
- **Writes in the checkout:** `pass-5/C-E5.md` and `pass-5/C-E5/` only.
- **Siblings were read by grep only.** value.js was neither built nor run.
- **Fence slip, mine.** Two of my early Bash calls printed more than the display limit, and the harness saved that output under `~/.claude/projects/…/tool-results/`. I read one of those saved files: the first 326 lines of H5.md, P-A5.md and P-E5.md, whose sources are all in this repo. I read nothing else under `~/.claude`, and from then on I read everything in smaller ranges straight from the repo. The guard ran as a binary.
- **Machine law.** Every build, test and browser run went through `guarded`, and no browser run used `--light`. There was one heavy run at a time: builds, then the Chromium chain, then one WebKit acquisition, then the Chromium re-reads, then the gates. Runs used the headless shell. GPU arguments appeared only on H5's named CK-19 arm. Each run used one browser with a context per cell, all closed in `finally` (the harness `Engine`/`openPage`). The WebKit relaunch came every 60 navigations. vitest ran with `--maxWorkers=2`. There was no zone refusal.
- **Teardown.** Nothing is left running. `git worktree remove --force` and `rm -rf …/p5/C-E5` ran, and `git worktree list` has no C-E5 row.
