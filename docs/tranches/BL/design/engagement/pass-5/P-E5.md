# D5 pass 5 · P-E5 · route E on F5″ + P-A5-light, four arm builds (§P4-8.1)

| field | value |
|---|---|
| seat | D5 pass 5, **P-E5 PROTOTYPE** (route E, the engaged stage; E's part of the candidate A+E), per `../REGISTRY.md` §P4-8.1 and §P4-8.3 wave 2→ |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD `64cfe94cc` + `P-A5-light.patch` (sha1 `b1e972b9…`). P-A5-light **contains F5″**: a three-way merge of `../pass-4/F5pp.patch` into it (base HEAD) conflicts only in the F5″ lines P-A5 rewrote, so F5pp.patch is not applied a second time; HEAD + F5″ + P-A5-light is HEAD + P-A5-light. E4's delta was carried by `git merge-tree --write-tree --merge-base=<HEAD+P-A4-light> <HEAD+P-A5-light> <HEAD+P-E4-noveil-coarse>` → tree `1ec76353…`, **clean, no conflict** (21 files, the same set as E4 over A4-light). HEAD moved during the seat (`76b08cc7f`, then `78fc8f3b8`, docs commits); `git diff --stat 64cfe94cc 78fc8f3b8 -- src tests package.json demo vite.config.ts` prints nothing |
| patches | four, each the whole tree against HEAD (F5″ + A5-light + E4 + E5), differing only in the two constants of `src/composables/motion/engage/stage.ts` and that file's blob index line. Each cut from the worktree on its own arm through a temporary index (§2) |
| worktree | `.claude/worktrees/bl/D5/p5/E5/wt`, detached at HEAD, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). Removed with `git worktree remove --force`, then `rm -rf …/p5/E5`; `git worktree list` has no `p5/E5` row and nothing is left under `…/p5/E5/` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**; O-103 records it not granted |
| harness | H5's, read from the checkout, unedited. Every battery ran on the harness's own app (scene app sha `7c8bcdaafb44` in every build log). The two pass-4 probes (`../pass-4/E4/probe/e4-probe.mjs`, `../pass-4/C-E4/probe/ce4-probe.mjs`) ran unedited on their own apps; my one probe is `E5/probe/slider-press.mjs`. Probes are not witness reads |
| owner state | `../../../audit/INBOUND.md` (mtime 2026-10-20 14:43 at the seat's start; 2026-10-21 00:01 at its end: O-104/O-104a added, value.js SS-8 rows, no D5 ruling) and `../../../FORMATION-PROGRESS.md` read at start and end. No ruling on Q-5, Q-2, Q-3, the engine-limit clauses, O-74c G-1 or the safaridriver checkbox. The 10.2.0 blur token has **not** landed (`--glass-focus-veil-blur` still reads `--glass-blur-floating-radius`). Every owner-gated row below is **OPEN ON ITS DEFAULT** (Q-1 (c), Q-2 (b), Q-3 (c) as built, Q-4 (b), Q-5 (a)) |
| dates | 2026-10-20 21:57 → 2026-10-21 02:00 |
| records | `E5/run-e5.sh` (stages: `arm`, `build`, `buildapp`, `buildplant`, `bat`, `xp`, `own`, `cap`), `E5/chain-e5.sh`, `E5/phase-*.txt` (every run, in order), `E5/gates.sh`, `E5/logs/` (each log opens and closes with the 1/5/15-min load; `chain-*.log` are the runs of record), `E5/json/<arm>[-rN|-pN|-vN]/`, `E5/glance/` (8 sheets, 1728 frames), `E5/numstat-*.txt`, `E5/E5-own.diff.txt`, `E5/probe/slider-press.mjs` |

## 0 · In brief

1. **CK-20's stale place is cured on all four arms in both engines.** `stage.ts` now observes each holder's rest box (its footprint, or an in-place host) with an IntersectionObserver whose root margin is cut to that box, so any layout move (a style write, a viewport resize, a font load) re-reads the place, the reach (`--stage-room`, `--stage-w`) and the veil centre. A layout move is not glided (it has painted); only a move the stage sees before paint (a re-render's mutation) is travelled. H5's E-10 `stale place` (keyboard, pointer), its control and its viewport-resize twin read **0.0 px** per frame on every arm in both engines (bound ≤ 4); C-E4's own `ce4-probe` reads **0.0 px** on its five stale cells, 9/0 per arm per engine (pass 4: 127.2 px, 124.7 px WebKit pointer, 21.9-25.0 px resize). The plant `nowatch` (the observer never armed) gives back **127.2 px** on both stale cells in 6/6 Chromium reads, so the cell bites the cure. The layout-only landing passes at 1.2-2.2 px against its 1+base bound on every arm and engine.
2. **The noveil arm is noveil on every promotion.** `KEYBOARD_VEIL` is replaced by `STAGE_VEIL` (a clean break, P-3: the constant no longer describes only the keyboard). On `false` no promotion shows the veil, a touch's hold included, and the veil element is never created; on `true` the hand's promotion and a keyboard engagement raise it, as the pass-4 veil arm did. The 10.2.0 blur token has not landed, so the touch hold on the candidate is built on the noveil plate: the world stays crisp (`E5/glance/frames/noveil-coarse-chromium-coarse-light-slider-held.png` against the milky `…/veil-coarse-chromium-coarse-light-slider-held.png`).
3. **The held loupe gets a glass rim and a fill tip.** The magnified track is now seen through a window inset from the housing by `--loupe-ring` (0.3 × the track height), so the plate's own material rims the lens on every side, and the magnified fill ends on its pill cap rather than a hard edge. The mark spans the window, not the rim. No lighting layer is added (O-87). Whether it now reads as glass is the critic's call (§5); my own reading is that the split block is gone but at `k` max the visible fill reads as a round bead.
4. **The slider's press leaves `:active`.** Every slider press leg (the weight-train squish, its reduce arm, the vertical arm, the follow-through, the `grabbing` cursor) now reads `[data-held]`, the door's hand mark, which `useHold` writes from its native `pointerdown` and `touchstart` listeners in the same task the pointer lands. No `data-press` was added for the slider: the hand mark already is that fact (P-3). Probe `slider-press` (Chromium touch): held by +26 ms, the fill's block scale 0.993 at +52 ms, 0.954 at +103 ms, 0.940 sustained at +1203 ms, both themes, load 10.8-11.9. Plant `activeonly` (the squish back on `:active` alone): scale 1.000 through +150 ms (light) and +200 ms (dark), FAIL 0/2.
5. **One E counterexample stays open, in Chromium only: the hand-off's scale-drop cell.** E-10 `hand-off drop|rev` failed **5 of 14** Chromium reads of the candidate (largest drop 0.0087-0.0125 per 16.7 ms against bounds 0.0084-0.0100, loads 11.9-23.5); WebKit passed 4/4 arms. Two controls on the same source with the observer changed passed every read: `nowatch` 0/6, `rafarm` (the first arm deferred one frame) 0/4, loads 6.8-23.8. The evidence points at the observer's arming in the engagement task, but rafarm was read in Chromium only, so it is **not** in the patches (§6 item 1).
6. **Inherited and owner rows are unchanged in kind:** A's commit-light rebound (+60 ms reverse, 1 pulse) fails 2-4 cells in 13 of 14 Chromium reads and 1 cell in WebKit; CK-02/CK-10's near-white faces; the Button gleam's sustain; the slider carry (F-5) failed 3 of 9 Chromium reads on the noveil arms at 1.87-2.80 px, at loads down to 11.4.

## 1 · What was built (E5's own work over the carried E4)

| item | CK | what | where |
|---|---|---|---|
| 1 · the place is observed | CK-20 | `watchPlace(h)`: an IntersectionObserver on the rest box (`h.footprint ?? h.host`), `root: document`, root margin `-floor(top) -floor(cw-right) -floor(ch-bottom) -floor(left)`, threshold 1. The first report only re-cuts the margin when a clipping scroller leaves the ratio off its threshold (0: wait for re-entry at 1e-7). Every later report calls `writeGeometry(h)` (place, reach, veil centre) and re-cuts. Armed when a host first takes the stage, disconnected in `hide`. No frame loop; nothing runs while the box stands still. The header gains "THE PLACE IS OBSERVED, NOT REMEMBERED" | `engage/stage.ts` |
| 2 · the veil arm | CK-25, CK-26 | `STAGE_VEIL` replaces `KEYBOARD_VEIL`. `promote` shows the veil, `setVeil` toggles it, `writeGeometry` centres it and `hide` settles it only on `STAGE_VEIL`. `useEngage` asks for the veil on the hand or the keyboard (a scrub never) and the stage decides | `engage/stage.ts`, `engage/useEngage.ts` |
| 3 · the loupe's window | CK-25, CK-26 | `.glass-loupe-window` (absolute, inset `--loupe-ring`, pill, clips the clone); the housing grows by 2 × ring; the clone's translate is `WINDOW/2 − k·x`; the fill ends on a pill cap; the mark spans the window. One template span added | `slider/Slider.vue`, `slider/styles.css` |
| 4 · the slider's press on the hand mark | CK-17, CK-06 | five `:active` legs removed: cursor, weight-train, its reduce arm, the vertical arm and its reduce arm; the follow-through is `:not([data-held])`. The comment names the listener the mark relies on (X-8) | `slider/styles.css` |
| 5 · tests | — | `engage-stage.test.ts`: the veil assertions read `STAGE_VEIL`; a touch's hold asserts the veil rises only on `STAGE_VEIL`; new "the place is observed, not remembered" pair (a reported layout move is not glided on the next unrelated mutation; the same move unreported is glided back, so the case is not vacuous). `focus-veil.test.ts`: both Slider render cases branch on `STAGE_VEIL`, each asserting its own plate. `slider-cursor-affordance.test.ts`: `grabbing` on `[data-held]` alone, and no `.glass-slider…:active` selector left. `glass-subtlety.test.ts`: the follow-through rule's new selector | `tests/` |

Unit plants (`E5/logs/unit-plants.log`, 00:13, load 13.1, source restored byte-identical, `99f681d1811d` before and after): **watch-dead** (`arm(1)` removed) fails the two observed-place cases; **veil-on-noveil** (the `STAGE_VEIL` guards removed in `promote` and `setVeil`) fails five veil cases across `engage-stage.test.ts` and `focus-veil.test.ts`.

## 2 · Patches and cost

Each patch passes `git apply --check` on the checkout at `78fc8f3b8` (and the candidate at `76b08cc7f`). 9745 lines each. `shasum` at return:

| patch | `STAGE_VEIL` | `POINTER_STAGE` | sha1 |
|---|---|---|---|
| **`P-E5-noveil-coarse.patch`** (the candidate) | `false` | `"coarse"` (Q-3 (c)) | **`bd973aebeb8394591df7aefc4832f8c782f22593`** |
| **`P-E5-veil-coarse.patch`** | `true` | `"coarse"` | **`add39aaf98835a7853f63f5414fbefebff2f6720`** |
| **`P-E5-noveil-every.patch`** | `false` | `"every"` | **`b061f5a0f144fff47fbfe1b26c1df4aaf691ec1f`** |
| **`P-E5-veil-every.patch`** | `true` | `"every"` | **`0edf628b25ce41f533244ce664e7c8196105a227`** |

| measure | files | + | − | record |
|---|---:|---:|---:|---|
| vs HEAD | 182 | 4616 | 1498 | `E5/numstat-vs-HEAD.txt` |
| over P-A5-light | 23 | 1636 | 317 | `E5/numstat-over-A5light.txt` |
| **E5's own, over the carried E4 (merge tree `1ec76353`)** | **8** | **246** | **69** | `E5/numstat-E5-own.txt`, `E5/E5-own.diff.txt`: `stage.ts` +88/−20, `useEngage.ts` +7/−5, `Slider.vue` +8/−4, `slider/styles.css` +36/−18, tests +107/−22 |
| pass 4: P-E4 vs HEAD | 178 | 4273 | 1464 | `../pass-4/P-E4.md` §2 |

Fixed cost of E: `stage.ts` 494 lines (426 at pass 4). Per client: nothing new; the Slider and NumberField compose the door as before. Each arm is two lines.

**Gates** (noveil-coarse source, `E5/logs/gates-dev1.log`, 22:16-22:18, load 24.4 → 18.9): build, typecheck (after the build), `demo:dist:build` exit 0; vitest **245 files, 2405 passed, 10 expected fail, 1 skipped** (`--maxWorkers=2`). The stage, veil and slider files on each arm (`E5/logs/unit-arms.log`, 00:12-00:13, load 12): **7 files, 98/98 on all four arms**.

## 3 · Runs

Every build, test and browser run went through `guarded`: Chromium one `guarded --timeout 90` per witness, probe or capture line, builds `--timeout 20`. Full battery E-1..E-12 on **noveil-coarse** in both engines; on **veil-every** every witness the stage can reach (E-1, 3, 4, 7, 8, 9, 10, 11, 12); on **veil-coarse** and **noveil-every** the cells the constants move (E-1, 3, 4, 10, 11, 12). Both pass-4 probes on all four arms in both engines. The CK-25 capture on all four arms in both engines. Chromium re-reads after the main chain: E-4 ×2 on the two noveil arms, E-10 ×12 more on the candidate, interleaved with the two observer controls (`nowatch` ×6, `rafarm` ×4) and `veil-coarse` ×2; the `slider-press` probe and its plant.

**WebKit: one `guarded --exclusive webkit --timeout 90` acquisition** for every WebKit stage: queued 00:12:30 (load 13.3), admitted 00:26:13 (a 14 min wait, load 20.3), released 01:16:27 (load 10.8), `guarded exit 0` (`E5/logs/chain-webkit.log`). No stage skipped, no cell UNMEASURED for want of the lock, no `ENGINE CLOSED`, no page close, no zone refusal. The `slider-press` probe was written after the acquisition and read in Chromium only (§6 item 4).

### 3.1 Witness totals, pass / fail / unmeasured (1-minute load at the witness's start)

| witness | noveil-coarse Chromium | noveil-coarse WebKit | veil-every C · W | veil-coarse C · W | noveil-every C · W |
|---|---|---|---|---|---|
| E-1 | 92/2/2U (22.4) | 92/4 (20.3) | 92/2/2U (32.4) · 92/4 (7.1) | 92/2/2U (20.5) · 92/4 (9.3) | 92/2/2U (33.3) · 92/4 (16.8) |
| E-2 | 132/32, 33 DISAGREES (25.7) | 137/27, 17 DISAGREES (18.5) | — | — | — |
| E-3 | 22/0 (34.7) | 22/0 (9.2) | 22/0 (31.4) · 22/0 (8.1) | 22/0 (20.6) · 22/0 (18.2) | 22/0 (30.7) · 22/0 (21.9) |
| E-4 | 12/2/4U (33.6); r2 13/1 (11.4); r3 14/0 (8.6) | 11/0/8U (8.4) | 14/0/4U (28.1) · 11/0/8U (8.0) | 14/0/4U (19.6) · 11/0/8U (14.3) | 13/1/4U (30.4); r2, r3 14/0 (9.0, 11.2) · 11/0/8U (19.8) |
| E-5 | 54/2 (29.1) | 54/2 (6.5) | — | — | — |
| E-6 | 4/2/8U (34.3) | 2/2/8U (5.9) | — | — | — |
| E-7 | 6/1 (33.0) | 6/1 (6.0) | 6/1 (27.5) · 6/1 (5.9) | — | — |
| E-8 | 19/0 (32.7) | 19/0 (6.1) | 19/0 (26.5) · 19/0 (6.2) | — | — |
| E-9 | 74/4 (33.7) | 76/2 (7.3) | 72/6 (25.1) · 77/1 (7.4) | — | — |
| E-10 | 28/0 (34.4); 13 re-reads 24-26 pass of 28 (6.8-25.2) | 27/1 (10.6) | 26/3 (27.3) · 29/0 (7.4) | 25/4 (22.1); r2 28/1, r3 27/2 (15.9, 13.4) · 29/0 (14.2) | 26/2 (27.7) · 28/0 (14.9) |
| E-11 | 3/0/1U (31.6) | 3/0/1U (7.2) | 3/0/1U (25.9) · 3/0/1U (9.1) | 3/0/1U (25.6) · 3/0/1U (11.6) | 3/0/1U (22.6) · 3/0/1U (15.3) |
| E-12 | 65/0 (30.8) | 64/0/1U (7.9) | 65/0 (22.9) · 64/0/1U (8.5) | 65/0 (27.7) · 64/0/1U (12.3) | 65/0 (22.8) · 64/0/1U (13.7) |
| CAP | 14/0 (23.0) | 14/0 (14.9) | 14/0 (13.8) · 14/0 (13.1) | 14/0 (23.9) · 14/0 (19.0) | 14/0 (18.1) · 14/0 (13.5) |

### 3.2 Probes (unedited pass-4 probes on their own apps; `E5/logs/xp-*.log`)

| probe | noveil-coarse | veil-coarse | noveil-every | veil-every |
|---|---|---|---|---|
| `ce4-probe` Chromium | 9/0/2R (23.1) | 9/0/2R (20.3) | 9/0/2R (22.3) | 9/0/2R (19.8) |
| `ce4-probe` WebKit | 9/0/2R (14.0) | 9/0/2R (12.1) | 9/0/2R (10.9) | 9/0/2R (10.9) |
| `e4-probe` Chromium | 22/1 (22.9) | 23/0 (20.7) | 20/3 (23.8) | 23/0 (22.0) |
| `e4-probe` WebKit | 20/1/1 (12.2) | 21/0/1 (12.1) | 20/1/1 (13.3) | 21/0/1 (14.9) |

The `e4-probe` FAILs are all the probe's pass-4 expectation of a veil element on the noveil arm: `keyboard veil` wants "no data-engaged and visibility hidden", and on this noveil arm there is no veil element at all (`open false, data-engaged false, visibility none`); `forced-colors held` and `reduced-transparency held` on noveil-every read `veil display undefined` for the same reason, with the control promoted ×1.060 and the media applied. None is a defect: the noveil arm now creates no plate to hide (item 2). The veil arms pass every veil cell.

## 4 · Per CK row (the candidate noveil-coarse, both engines; the other arms where they differ)

**CLOSED** = closed by this seat's own reads in both engines, or by source and unit plant for a row with no browser leg. **OPEN ON DEFAULT** = owner-gated. **INHERITED** = the open cells are A's, F5″'s, D2's or the owner's. The grade is the critics'.

| row | Chromium (load) | WebKit (load) | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/2/2U (22.4) | 92/4 (20.3) | latch 54/55 (`dock`, D2); the Sheet's PRM press-light has no target (O-74c G-1); Aurora: Chromium headless ENGINE LIMIT (UNMEASURED, never a pass); WebKit **FAIL 1.17 against 1.13** and its PRM press-light 0.00/0.00. Identical on every arm: the stage does not disturb the census | INHERITED |
| CK-02 | E-2 132/32, 33 DISAGREES (25.7) | 137/27, 17 DISAGREES (18.5) | A's light-arm faces (Q-5); P-A5 read 130/34 and 140/24 on the same bytes. E touches no commit member | OPEN ON DEFAULT (Q-5), A's |
| CK-03 | E-2 mount and arrival cells pass (in the counts) | same | A's door, unchanged | INHERITED, closed on A |
| **CK-04** | E-3 **22/0** on all four arms (20.6-34.7) | **22/0** on all four (8.1-21.9) | desk pointer-held ×1.060 (in place on coarse, promoted on every); keyboard ×1.060 with `[data-held] 0`, no `grabbing`; phone touch-held 358.0 × 25.4 px (block ×1.060) inside the 16..374 px gutter; PRM ×1.000 with the light leg; modifier, unacted key and script focus ×1.000. `e4-probe` `pointer arm fine hold` and `touch hold` PASS on every arm, both engines | **CLOSED** |
| CK-05 | E-4: slider carry **1.87 px FAIL** (33.6), r2 **2.80 px FAIL** (11.4), r3 6.63 (8.6); noveil-every 2.07 FAIL (30.4), 6.57, 6.72; veil-coarse 6.53; veil-every 6.05. The tabs drag failed once (1.64 px, load 33.6) and passed r2 and r3 | 11/0/8U on all four arms; carry 7.22-7.31 px (8.0-19.8) | the bimodal carry P-E4 saw and C-E4 did not reproduce is back: 3 of 9 Chromium reads under 4 px, one at load 11.4, so it is not a load artefact. It is F5″'s release rule (F-5, a ruling owed); the arm does not decide it (pass 4 failed a veil arm too). Sheet UNMEASURED (O-74c G-1); WebKit Carousel UNMEASURED (no touch scrolling) | OPEN (F-5; O-74c; engine limit) |
| CK-06 | E-5 54/2 (29.1) | 54/2 (6.5) | the two fails are the Button gleam's sustain (`::before` NOT LANDED by +200), P-A5 §open gap 3. The slider's press is not in E-5's set; probe `slider-press` reads it (item 4 of §0): held +26 ms, squish started +52 ms, landed 0.940 by +153 ms, sustained at +1203 ms | INHERITED (A's gleam) |
| CK-07 | E-6 4/2/8U (34.3) | 2/2/8U (5.9) | no idle rung (Q-2 (b)) | OPEN ON DEFAULT (Q-2) |
| CK-08 | E-7 6/1 (33.0) | 6/1 (6.0) | the fail is `data-held`'s second writer `GlassDock.vue` (D2's), named in the row's clause. `data-engaged` is written in `stage.ts` only. The observer writes no attribute | CLOSED (named clause) |
| CK-09 | E-8 19/0 (32.7) | 19/0 (6.1) | the glide still rides `rowClockMs("dock")`; the observer adds no clock and no figure | CLOSED |
| CK-10 | E-9 74/4 (33.7): Switch light 0.0071, toggle dark 0.0072, chipaction dark 0.0045, accordion light 0.0000 | 76/2 (7.3): chipaction dark 0.0099, accordion light 0.0000 | A's faces under reduce (Q-5 (2) for the accordion) | INHERITED (A, Q-5) |
| CK-11 | — | — | E adds no press recipe; the slider's `:active` legs are removed with no alias (`slider-cursor-affordance.test.ts` asserts none left) | CLOSED (source) |
| CK-12 | — | — | E5 mints no engagement figure. `--loupe-ring` (0.3 × the track height) is the loupe's geometry, not an engagement figure: it sizes a rim the housing already had (the clone covered it edge to edge). The observer's thresholds (1, 1e-7) are the IntersectionObserver API's own encoding of "any move" and "any re-entry", not tuned values. I rule both outside CK-12; a critic may read `--loupe-ring` as a figure to place | CLOSED for E's code (the critic's to confirm) |
| CK-13 | `e4-probe` forced colours and reduced transparency PASS on coarse arms (in place, ×1.060, no veil); on noveil-every the probe's veil-display expectation fails because no veil exists (§3.2) | forced colours 11/11 via `e4-probe`; PRT UNMEASURED (engine limit) | the loupe keeps its forced-colours arm (`Canvas`, `CanvasText` edge) | CLOSED (Chromium); WebKit PRT the engine's limit |
| CK-14 | E-12 65/0 incl. `fcslop`, `numfield coarse` PASS | 64/0/1U | the 44 px floor holds under grow and promotion | CLOSED |
| CK-15 | E-10 `hand-off singleton fwd|rev`: max 1 engaged root per frame, every read | same | | CLOSED |
| CK-16 | E-12 off-screen PASS, rest layouts 0.0/s | off-screen PASS; layouts UNMEASURED (no counter) | F-10 carried; the row has no engine-limit clause | OPEN ON DEFAULT (engine-limit clause) |
| CK-17 | — | — | **UNMEASURED (owner's safaridriver checkbox)**: the observer in real Safari, the wheel, the in-place grow, the loupe. The naming half for E: the slider's press legs now read `[data-held]`, and `slider/styles.css` names the listener it relies on (useHold's `touchstart`, X-8). The dock triggers' `:active` is D2's | OPEN ON DEFAULT (Safari); E's naming half closed |
| CK-18 | E-4 slider, sortable and tabs consume the release rule | same | Sheet UNMEASURED | INHERITED (O-74c) |
| CK-19 | E-1 ambient ENGINE LIMIT (headless) | FAIL 1.17 vs 1.13 | the Aurora's, unchanged | INHERITED |
| **CK-20** | **stale place 0.0 px** on every arm, keyboard and pointer, control and resize, in every Chromium E-10 read of the four arms (14 candidate, 3 veil-coarse, 1 each on the every arms) and of the `rafarm` variant (4); `ce4-probe` stale cells 0.0 px on all arms; layout-only landing 1.2-2.2 px; re-render landing 1.1-1.3 px. **Hand-off scale drop: 5 of 14 candidate reads FAIL** (0.0087 vs 0.0086, 0.0089 vs 0.0087, 0.0119 vs 0.0084, 0.0119 vs 0.0086, 0.0125 vs 0.0100; loads 11.9-23.5); veil-coarse 1 of 3 (0.0111 vs 0.0097). Controls: `nowatch` 0/6, `rafarm` 0/4. Rebound +60 (A's light): 2-4 cells in 13 of 14 reads | **stale place 0.0 px** on all four arms, both paths; layout-only landing 1.6-1.8 px; hand-off drop and rev PASS on all four arms (one read each, 7.4-14.9); rebound +60 `checkbox dark` FAIL once (A's) | E's own causes from C-E4 §4.1 are gone in both engines on every arm: the glide, the reach and the veil centre re-read on layout. The Chromium hand-off cell is a new counterexample on E's path (§0 item 5, §6 item 1). The rebound is A's (P-A5 open gap 2) | **OPEN** (the Chromium hand-off cell; A's rebound) |
| CK-21 | E-11 3/0/1U on every arm | 3/0/1U | `readBack` unchanged; the observer reads no token | CLOSED for E's inputs |
| CK-22 | E-12 wheel and both anchor cells PASS on every arm; `ce4-probe` wheel ×3 and `important anchor` PASS, clip REPORT as E-M7 | same | consumer greps re-run (`E5/logs/ck22-greps.txt`, 2026-10-21 00:1x, nine siblings, read only, value.js by grep only): no sibling selects `.glass-slider…:active`, `.glass-loupe*`, `glass-focus-veil` or the arm constants in a source file; value.js's `bench/paired/sheets/*.css` hits are copied glass bundles, not selectors. MIGRATION rows §4.1 | CLOSED |
| CK-23 | — | — | §2 | CLOSED |
| CK-24 | E-1 `static` cells pass | pass | | CLOSED (A's) |
| CK-25 | CAP 14/0, ladder 2/2 | CAP 14/0, ladder 2/2 | §5. The grade is a non-author's | for the critic |
| CK-26 | — | — | no `plus-lighter`, radial gradient, glow or new shadow layer in E5's `+` lines (`E5/E5-own.diff.txt`); the loupe's rim is the housing's existing `glass-plate` material, its shadow unchanged. On the noveil arm the veil (and its 20 px blur) is never shown. On the veil arm it still reads `blur(var(--glass-focus-veil-blur))` → `--glass-blur-floating-radius` until 10.2.0 | CLOSED (source) |
| CK-27 | every plant this seat wrote fails its cell: `nowatch` 127.2 px ×6 reads; `activeonly` 0/2; unit plants watch-dead 2 FAIL, veil-on-noveil 5 FAIL. H5's `e10-stale`, `e10-staleresize`, `e10-relayout` stand on H5's self-test. No film takes a mid-film screenshot. No alias: `KEYBOARD_VEIL` is gone, not kept beside `STAGE_VEIL`; the `:active` legs are removed, not overridden | same | the `e4-probe` noveil expectations (§3.2) are a stale probe, recorded, not counted green | CLOSED for E's cells |

### 4.1 MIGRATION rows (CK-22)

| # | consumer-visible path | row |
|---|---|---|
| **E-M8** | Q-3's veil arm (`STAGE_VEIL`, for the arm the owner rules) | on `false`: "No engaged control raises the focus veil: a touch's hold, a pointer's and a keyboard engagement promote (or grow in place) over the world as it is. The stage creates no `.glass-focus-veil` element." On `true`: "A hand's promotion and a keyboard engagement raise the stage's one veil; a scrub does not." `stage.ts` is not exported, so the constant has no consumer surface |
| **E-M9** | the slider's press | "The Slider's press (the fill's squish, the `grabbing` cursor) reads `[data-held]`, written on `pointerdown`/`touchstart`. A consumer rule keyed on `.glass-slider:active` no longer pairs with the library's press and should key on `[data-held]`." No sibling has one (greps) |
| **E-M10** | the loupe's DOM | "The loupe's clone sits inside `.glass-loupe-window`, inset from the housing; a selector `.glass-loupe > .glass-loupe-clone` no longer matches." No sibling has one |
| E-M1, E-M6, E-M7 | `../pass-4/P-E4.md` §4 | stand. E-M7 (`"coarse"`) gains: "on the noveil arm a touch's promoted hold raises no veil either" |
| E-M2..E-M5, P-E2 1-9, A's rows | earlier passes, P-A5 | stand under the composition |

## 5 · CK-25 · the owner-glance set

Captured by the harness's `capture.mjs` on each arm's app: 9 class exemplars × rest, pressed, held, engaged, committed, released × light and dark × fine and coarse × both engines × four arms = **1728 frames** under `E5/glance/frames/`, named `{arm}-{engine}-{pointer}-{theme}-{scene}-{state}.png` (288 per state). Sheets `E5/glance/{arm}-{engine}-{fine,coarse}.png`, indexes `E5/glance/{arm}-index.json`. CAP 14/0 on all eight runs, the ladder cell 2/2 on each.

The frames that answer this pass's CK-25 items, as this seat reads them (the grade is a non-author's):

| item | frame(s) | reading |
|---|---|---|
| the loupe, light | `glance/frames/noveil-coarse-chromium-fine-light-slider-held.png`; WebKit `…/noveil-coarse-webkit-fine-light-slider-held.png` | a pill lens with a quiet grey glass rim; inside it the fill ends on a round cap at the mark, the track to its right. Against pass 4's `../pass-4/C-E4/glance/frames/noveil-coarse-chromium-fine-light-slider-held.png` (edge-to-edge orange/grey block, hard seam). At `k` max the visible fill reads as a round bead, not as a length of fill |
| the loupe, dark | `…/noveil-coarse-chromium-fine-dark-slider-held.png`, `…/noveil-coarse-chromium-coarse-dark-slider-held.png` | the rim is a dark edge, the fill an amber bead; quieter than light |
| the touch hold, noveil (the candidate) | `…/noveil-coarse-chromium-coarse-light-slider-held.png`, `…-coarse-dark-slider-held.png`, WebKit `…/noveil-coarse-webkit-coarse-light-slider-held.png` | promoted, block ×1.060, the loupe up, the world crisp: "before"/"after" at full contrast |
| the touch hold, veil | `…/veil-coarse-chromium-coarse-light-slider-held.png`, `…/veil-coarse-chromium-coarse-dark-slider-held.png` | still the milky light / muddy dark field of pass 4: the 20 px blur stands until 10.2.0. This is the veil arm, kept for Q-3 |
| the keyboard engagement | `…/noveil-coarse-chromium-fine-dark-slider-engaged.png` against `…/veil-coarse-chromium-fine-dark-slider-engaged.png` | the noveil frame is the ringed ×1.060 track, the world crisp |
| the slider press | `…/noveil-coarse-chromium-coarse-light-slider-pressed.png` | the fill squished, the loupe rising: the press is visible at the capture's pressed instant |
| the stale-place jump | not a frame: films take no screenshot | 0.0 px per frame (§4 CK-20) |

Playwright WebKit paints no `backdrop-filter`, so its veil frames show the dim without the blur. Real Safari is UNMEASURED. A's frames in the set (the accordion commit, the Switch press, the dark Button's halo) are A's and D3's, as pass 4 read them.

## 6 · Open gaps

1. **CK-20, the Chromium hand-off scale drop (E's).** 5 of 14 candidate reads and 1 of 3 veil-coarse reads exceed the own-release + 0.002 bound, by 0.0001 to 0.0035 per 16.7 ms; WebKit passed on all four arms; centre moves are 0.0 px in every read (no place jump). The two controls that change only the observer's arming (`nowatch`, observer never armed: 0/6; `rafarm`, first arm one frame later: 0/4) passed every read at loads 6.8-23.8, so the likeliest cause is the observer armed inside the engagement task. **`rafarm` is not in the patches:** it was read in Chromium only after this seat's one WebKit acquisition, and it leaves a one-frame window in which a layout move is not observed (the arm reads the box but does not re-run `writeGeometry`). The next seat should build it with that `writeGeometry` call and read E-10 in both engines. The variant is the perl line in `E5/run-e5.sh` (`buildplant rafarm`); its reads are `E5/json/plant-rafarm-v{1..4}/`.
2. **CK-05, the slider carry (F-5).** Bimodal again: 1.87, 2.80 and 2.07 px against 4 on the noveil arms (3 of 9 Chromium reads, one at load 11.4); WebKit 7.22-7.31 px. F-5 is a ruling owed; no E code is on that path (the release rule is F5″'s).
3. **The loupe's read.** The rim and the tip are built and the hard seam is gone, but at `k` max the visible fill is a round bead. If the critic reads it as not yet glass, the next lever is the window's aspect (a wider window, or a lower `--loupe-k-max`), not a lighting layer.
4. **The slider-press probe in WebKit.** Read in Chromium only (written after the acquisition). The WebKit raw touch driver sets the hand's `touchstart` the same way, and E-3's phone and desk cells (WebKit 22/0) read the held state, but the press latency itself is not read there.
5. **The `e4-probe` noveil expectations** (§3.2) are pass 4's and now read a veil element that the noveil arm no longer creates. A critic replaying that probe should read those three cells as the arm's change.
6. **Inherited, not E's:** A's rebound (+60 reverse, 1 pulse; P-A5 open gap 2), the Button gleam's sustain (CK-06), the near-white faces (CK-02, CK-10; Q-5), the `dock` latch and `GlassDock.vue`'s `data-held` (D2), the Sheet (O-74c G-1), the Aurora (CK-19), Q-2 (CK-07), CK-16's WebKit counter.
7. **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox), including the IntersectionObserver with `root: document` on iOS, VoiceOver on a promoted control, and the touch pan over a promoted control (`../pass-4/P-E4.md` §6 item 4, still not driven).

## 7 · Fences and the machine

- No tracked source in the checkout changed and no git write ran there. `git merge-tree`, `read-tree -u --reset` (on the worktree's own index), and the patch cuts (`GIT_INDEX_FILE` temporary indexes in the seat's worktree directory) ran in the worktree; `git apply --check` was the only command run against the checkout's tree. Writes in the checkout: `pass-5/P-E5.md`, the four `pass-5/P-E5-*.patch`, and `pass-5/E5/`.
- Siblings were read by grep only; value.js was not built or run. No `~/.claude` file was read; the guard ran as a binary.
- Every build, test and browser run went through `guarded`; no browser run used `--light` (the `--light` calls were single vitest files, no browser). One heavy run at a time: the probe builds, the Chromium chain, the Chromium re-reads, then the one WebKit acquisition, then the Chromium-only controls, in sequence. Headless shell, no GPU arguments, one browser per run, a context per cell, closed in `finally` (the harness's `Engine`/`openPage`/`openTouchPage`), the WebKit relaunch every 60 navigations. vitest `--maxWorkers=2`. No zone refusal.
- **Process slips, mine.** (a) My first vitest call ran from the docs directory, so `process.cwd()`-relative reads failed and a test whose `mockRestore` was skipped cascaded into stack overflows; re-run from the worktree, and the observed-place helper now restores in `finally` (`E5/logs/unit-dev1.log` is the bad run). (b) The first patch cut tried `git add` with a pathspec excluding the ignored `node_modules` and errored; recut with a plain `git add -A` on the temporary index (ignored paths are not added). (c) The first three non-candidate patches were derived from the candidate by text substitution, which left the candidate's blob index line in them; all three were recut from the worktree on their own arms (the hashes in §2 are the recut ones; the candidate's hash did not change).
- Nothing is left running. The worktree and `…/p5/E5/` (builds, plant builds, dev frames, temporary indexes) are removed.
