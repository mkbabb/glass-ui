# D5 · pass 6 · F5‴: the floor (REGISTRY §P5-8.2)

**STATUS: DONE.** `F5ppp.patch` is one patch at HEAD: F5″ unchanged, plus F-12 (the Sheet) and F-13 (the slider carry). `git apply --check` is clean at `e2d84052a`. Build, typecheck, `demo:dist:build` and vitest all exit 0. The H6 battery ran on HEAD's scene app in both engines, with every WebKit stage inside one `--exclusive webkit` acquisition.

- **F-13: cause found and cured.** Two engine-dependent one-frame steps back at the release made the carry bimodal. After the cure the edge carries 8.64-15.29 px on every read, in both engines and both reference positions. HEAD read 0 of 5.
- **F-12: landed.** The Sheet's E-4 cells are graded for the first time. They were UNMEASURED in flow on F5″ alone.
- **F-14: not cut against this base.** Master does not carry 10.1.1, so there is no shimmer at HEAD. F-14 is built and unit-proven as a merge-time hunk on `release/10.1.2` (`F5ppp-F14-on-10.1.x.patch`).
- **New counterexamples readable through F-12, both A's or the harness's, not the floor's:**
  - **The presented Sheet does not answer a press.** E-1 `runtime presented (sheet)` FAILs in both engines and reproduced 2/2 more in Chromium.
  - **The Sheet's `repeat landing` fails in Chromium under load** (3/3 at loads 28-38) and passes at load 17 and in WebKit (§2.2).

| field | value |
|---|---|
| seat | F5‴, the floor of D5 pass 6 (`§P5-8.3` wave 1). Second attempt: the 2026-10-21 attempt died at the usage limit. This sitting (`r2`, 2026-10-27 13:15 → 15:45) kept the first attempt's worktree and its F-13 edits, rebuilt every reference tree, and re-measured everything cited here. The first attempt's records stay where it left them (`F5ppp/s1/`, `F5ppp/logs/`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `2cc55e9d2`. HEAD moved to `e2d84052a` during the sitting (docs-only commits). `git diff --stat 2cc55e9d2 HEAD -- src tests` prints nothing, and `git apply --check F5ppp.patch` is clean at `e2d84052a` |
| base | master does **not** carry `release/10.1.1` or `release/10.1.2` (`git merge-base --is-ancestor b17cc71af HEAD` is false; INBOUND O-103d), so F-12 carries `70d502ace`'s two `src` files unchanged. Its witness test `tests/components/sheet/sheet-position.test.ts` stays with 10.1.1 |
| owner rulings | INBOUND re-read at the seat's start (mtime 2026-10-21 06:31; last row O-107; the last D5 row is O-103d). FORMATION-PROGRESS read to its 2026-10-27 13:20 line. No newer D5 ruling. O-103d (4)'s engine-fact form is applied to the WebKit Carousel and WebKit `rest layouts` cells below |
| engines | the checkout's Playwright install, the same one H6 recorded (Chromium 149.0.7827.55, Playwright WebKit 26.5), headless shell, no GPU arguments. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** and is read against this run under O-103d (3) |
| builds (`out/builds/<label>`, scene app sha1 `d020f4946adb`) | `f5pp` = HEAD + F5″ (F-12's before); `f5pp12` = HEAD + F5″ + F-12 (F-13's before); `f5ppp` = the worktree, HEAD + this patch. Logs `F5ppp/r2/logs/build-*.log`, all exit 0. **Correction to the first attempt:** its 14:07 `src-f5pp*` trees were HEAD's bytes. `git apply` run inside the checkout's tree found the glass-ui repository and silently skipped every path outside its cwd (`F5ppp/logs/src-f5pp.log`: "useEngage.ts: No such file"). `run-f5ppp.sh` now sets `GIT_CEILING_DIRECTORIES`, the regenerated trees differ by exactly F-12 and F-13 (`diff -rq`), and nothing in this document cites the first attempt's builds |
| records | `F5ppp/run-f5ppp.sh` (stages), `F5ppp/r2/chain.sh` (the browser chain), `F5ppp/r2/reread.sh` (the Sheet re-reads), `F5ppp/probe/carry-probe.mjs` (F-13), `F5ppp/probe/sheet-probe.mjs` (the Sheet landing), `F5ppp/r2/logs/` (each opens and closes with the 1/5/15-min load), `F5ppp/r2/json/`, `F5ppp/r2/f12-70d502ace.diff` |

## 1 · The patch

`F5ppp.patch`, sha1 `24cec509c4af4426cbb9af439ef31e7242ed951d`: 63 files, +1909/−634 (`src`: 48 files, +1271/−564). F5″ (`pass-4/F5pp.patch`, sha1 `baa0f58d…`) is 59 files, +1811/−630, and is carried byte for byte (`diff -rq` of the regenerated `f5pp` tree against the worktree shows only F-12's and F-13's files). The four added files are F-12's `sheet/SheetContent.vue` and `sheet/styles.css` and F-13's `slider/styles.css` and `tests/components/ui/slider/release-carry.test.ts` (F-13's other hunk is in `useEngage.ts`, already an F5″ file).

**Gates** (worktree, `F5ppp/r2/logs/gates.log`): `npm run build` exit 0 (13:42 → 13:44, load 35.3 → 23.2); `typecheck` exit 0; `demo:dist:build` exit 0 (13:44 → 13:59); `vitest run --maxWorkers=2` exit 0, **243 files, 2349 passed, 10 expected fail, 1 skipped** (load 34.5 → 28.1).

## 2 · Per item

### F-12 · the Sheet (CK-01, CK-05, CK-18)

**Hunk.** `70d502ace`'s two `src` files, unchanged (`r2/f12-70d502ace.diff`): `SheetContent.vue` puts `"fixed"` first in the content's `cn(...)`, and `sheet/styles.css` drops `position: fixed` from the losing `:where([data-slot="sheet-content"])` rule. Cost: 2 files, +11/−2. It drops out of the patch when D5's base carries 10.1.1 (§3).

**Before and after** (`f5pp` against `f5ppp`, scene `sheet`):

| cell | Chromium before | Chromium after | WebKit before | WebKit after |
|---|---|---|---|---|
| E-4 `sheet fling carries velocity` | UNMEASURED, "the surface paints in flow ([role="dialog"] computes position: relative)" | PASS, carry 125.39 px (battery, load 37.8); PASS 250.00 px (re-read 3, load 17.5) | UNMEASURED (in flow) | PASS, carry 250.00 px |
| E-4 `sheet release continuity` | UNMEASURED | PASS, 17.2 px against a 62.0 px bound | UNMEASURED | PASS, 28.2 px |
| E-4 `sheet repeat landing` | UNMEASURED | **FAIL under load**: −160/−35/−35 (battery, 37.8), −160/−35/−35 (re-read 1, 28.3), −160/−160/−35 (re-read 2, 32.8); **PASS** −35/−35/−35 (re-read 3, 17.5) | UNMEASURED | PASS, −35/−35/−35 |
| E-4 `sheet release PRM` | UNMEASURED | PASS, at rest, overshoot 0.00 | UNMEASURED | PASS |
| E-1 `runtime presented (sheet)` | PASS (the press landed on the in-flow sheet) | **FAIL**, "press: Δscale 0.000 · press-only paint []", reproduced on re-reads 1 and 2 | PASS | **FAIL**, the same |
| E-1 `runtime presented (sheet) PRM press-light` | FAIL | FAIL, Δscale 0.000 | FAIL | FAIL |
| E-1 `adoption sheet` | FAIL, "div.fixed.inset-0.z-overlay computes [unclassed]" | the same | the same | the same |

Logs: `r2/logs/bat-f5pp*-{chromium,webkit}-E-{1,4}.log`, `r2/logs/reread{1,2,3}-*.log`. E-1 totals: Chromium 32/62/2 → 31/63/2, WebKit 32/64/0 → 31/65/0. The one cell that moves in each engine is `runtime presented (sheet)`.

**Rows.**
- **CK-05's Sheet half moves from UNMEASURED to graded.** It is a FAIL on `repeat landing` under load in Chromium (§2.2) and a PASS everywhere else.
- **CK-01's Sheet PRM press now has its target, and the target does not answer.** Neither the press nor the PRM press-light moves or paints on the presented sheet, in either engine. That is A's recipe (the presented rung's press), reproduced 3/3 in Chromium and 1/1 in WebKit. It is placed for P-A6 (§4). Without F-12 the cell's PASS came from pressing an in-flow sheet, which was not the surface the row names.
- **CK-18** is a critic's read. The Sheet consumes the release rule's `VelocitySampler` and seeds its leg's row with that velocity (`sheet/detents/use.ts:166-220`, F5″). F-12 makes that path reachable on a surface that paints where it should.

#### 2.2 · The Sheet's `repeat landing` under load

The same E-4 drive (three 40 px moves 16 ms apart) lands one or two detents up: −35 px with a 250 px carry, or −160 px with a 125 px carry. At 1-minute loads of 28.3-37.8 it split on 3 of 3 Chromium reads. At 17.5 it held −35 on all three runs, and WebKit held −35 at 23.2. `probe/sheet-probe.mjs` replays E-4's drive and replicates the release rule's chord from the pointer events the page saw. At load 19.9-21.5 it gave 8 of 8 runs the same landing, with release velocities of 1.81-2.03 fraction/s. The delivered move gaps were 22.2-32.9 ms against the nominal 16 ms, and the chord was 80 px over 78.7-88.2 ms (`r2/logs/sheet-probe-f5ppp-chromium.log`; it reads the dialog's top, not E-4's body).

**Reading.** The landing is a continuous function of the measured velocity (`projection.ts resolveRelease`, `projectRest` then `nearestRung`). Under load the drive's events arrive further apart, so the measured fling is slower and can fall one detent short. That is the input changing, not the rule. By the seat's rule the counterexample is **NOT-REPRODUCED off load** (one clean read at 17.5 and WebKit's), and it is **not cured here**. It is placed as a next-pass item (§4): E-4's `repeat landing` should print each run's release velocity, so that a critic can tell the drive's spread from the rule's. No release-rule change in this patch moves it.

### F-13 · the slider carry (CK-05, CK-20)

**Cause.** At the release the fill's leading edge steps **backward** for one frame before the carry moves it forward. E-4 takes its reference frame as the first frame at or after its release stamp, and that frame lands either before the step (the held frame) or after it (the stepped-back edge), depending on whether the pointerup's style has painted. The carry is measured against whichever frame that is. That is the bimodality. Two causes make the step:

1. **The origin.** `transform-origin: var(--slider-range-origin)` was declared only on the held rule (`[data-held]`/`:active`). On the release frame the origin snapped to the centre, and the leading edge stepped back by half the held stretch.
2. **The carry's channel** (Chromium only). F5″'s carry was a `composite: "add"` WAAPI animation on `transform`, the channel the held squish eases home on as a CSS transition. In Chromium the held transform dropped to rest in one frame under it, so the step was the whole stretch.

**Evidence** (`probe/carry-probe.mjs`: E-4's own drive and read, 8 reads per arm, fresh pages, 700×500, light). The arms:
- `default`: the build as it is.
- `preframe`, the control for the reference frame: one painted frame between E-4's release stamp and the pointerup, so the reference is always the held frame.
- `carry0`, the control for the carry: the door's carry animation cancelled the moment it starts.

| build · engine | default (sorted, px) | preframe (sorted, px) | carry0 (sorted, px) | load (1-min) |
|---|---|---|---|---|
| `f5pp12` · Chromium | 6.23, 6.23, 6.24, 6.26, 6.30, 6.42, 6.42, 6.81 | **0.29, 0.34, 0.35, 0.35, 0.35, 0.35, 0.49, 1.27** | 0.00, 0.00, 0.00, 0.01, 0.03, 0.03, 0.05, 0.05 | 25.8-28.6 |
| `f5ppp` · Chromium | 12.51, 12.74, 12.92, 13.03, 13.11, 13.14, 13.47, 13.79 | 8.64, 9.05, 9.26, 9.32, 9.42, 9.66, 12.01, 12.41 | −0.00, 0.04, 0.04, 0.05, 0.05, 0.06, 0.06, 0.06 | 26.4-36.2 |
| `f5pp12` · WebKit | 8.25, 8.29, 8.35, 11.51, 11.93, 11.99, 12.04, 12.22 | 7.26, 7.44, 7.50, 7.69, 7.74, 8.07, 8.26, 8.31 | 0.03, 0.03, 0.04, 0.04, 0.04, 0.04, 1.13, 1.17 | 16.4-25.3 |
| `f5ppp` · WebKit | 14.35, 14.56, 15.13, 15.14, 15.27, 15.27, 15.29, 15.29 | 13.65, 13.80, 14.31, 14.40, 14.50, 14.61, 14.64, 14.72 | 0.06, 0.06, 0.07, 0.07, 0.09, 0.09, 0.09, 0.10 | 22.9-30.0 |

The frame traces show the step (read 1 of each `preframe` arm; ms after the release stamp: the leading edge minus the held edge, px):
- **Before, Chromium:** `16: +0.3 → 25: −7.9`. That is an 8.2 px step against a held stretch of 8.29 px (`retract`), so the whole squish snapped. The carry then recovers only to −3.7 and never passes the held edge.
- **Before, WebKit:** `17: +0.8 → 27: −3.2`. That is a 4.0 px step, about half the stretch: the origin alone. The carry overcomes it (+7.5 at 97 ms).
- **After, both engines:** no backward frame. Chromium goes `26: +1.3 … 89: +9.8`, WebKit `28: +0.5 … 79: +14.8`.

The controls settle the reading:
- `preframe` puts every before-read on the low side in Chromium (8/8 under 4 px). The low mode is the held-frame reference, and the default arm's 8/8 high reads were the stepped-back reference that day; pass 5 saw both.
- `carry0` reads about 0 on every build, so what E-4 measures is the carry animation's travel, not the smear's retraction.
- WebKit before is two-moded too (8.25-8.35 against 11.51-12.22 px), with its smaller step. Both modes clear the bound, which is why only Chromium ever failed.
- After the cure, both reference positions read high in both engines: min 8.64 px (Chromium), 13.65 px (WebKit).

**Hunk** (cost: `slider/styles.css` +6/−2, `useEngage.ts` +7/−3, one new test file of 77 lines):
- `slider/styles.css`: `transform-origin: var(--slider-range-origin)` moves onto `.slider-range` itself, and `center bottom` moves onto the vertical `.slider-range` rule. The held rules no longer declare an origin, and the inverted vertical keeps its own `center top`.
- `useEngage.ts carry()`: the impulse animates the body's individual `scale` channel (`scale: "<s> 1"` or `"1 <s>"`) with the default composite, not `transform: scaleX()` with `composite: "add"`. Only the slider consumes `carry()`, and nothing else writes `scale` on `.slider-range`. The loupe's `scale` is on `.glass-loupe`.
- `tests/components/ui/slider/release-carry.test.ts` pins both: the origin on the fill's own rules and on no held rule, and the carry keyframes on `scale` with no `transform` and no `"add"`.

**Rows.** The CK-05 slider cell: E-4 `slider fling carries velocity` on `f5ppp` passes every one of its five reads in both engines, at 12.06-13.14 px in Chromium (load 32.4-34.3) and 14.36-15.44 px in WebKit (load 23.2-29.6). HEAD read 0 of 5 (H6 §3), and `f5pp` passed 5/5 on its battery read at 6.30-6.64 px (Chromium) and 8.42-12.16 px (WebKit), the bimodality's high side, which `preframe` shows is not what the engine always paints. `release continuity` passes on all five reads (Chromium 4.7-5.4 px against 63.6-65.1 px), and so does PRM. **CK-20**: the release no longer makes a backward one-frame move on the slider. **F-5's margin question is now askable:** the carry is unimodal, with minima of 8.64 px (Chromium) and 13.65 px (WebKit) against the 4 px bound, both on the held-frame reference.

### F-14 · the Skeleton shimmer under F-10's pause (CK-16)

**At this base: nothing to cut.** `b17cc71af` (the shimmer) is in `v10.1.1` and is not an ancestor of HEAD. HEAD's Skeleton has one rest loop, the breathe, which F-10 already pauses. E-12 on `f5ppp`, both engines:
- `restloop rest-running off-screen`: PASS. Both animations stop with their targets 4097/4137 px below a 500 px viewport (`div[skel].skeleton skeleton-breathe … paused`).
- `rest layouts`: PASS in Chromium (0.0 layouts/s). WebKit is the engine-fact cell (O-103d (4)): "Playwright WebKit exposes no rest-layout counter", Chromium is the gate.

**The merge form** (`F5ppp-F14-on-10.1.x.patch`, sha1 `40a8ea27…`, 2 files, +32/−35). When 10.1.x merges, F5‴'s Skeleton hunk meets 10.1.1's shimmer, which brings its own shimmer-only `useIntersectionPause` writer for the same `data-offscreen`. That would make two writers of one attribute (P-3). The hunk resolves it with one writer and one mark:
- `useRestLoop` observes every tile, because the breathe and the shimmer are both rest loops. The watch/`effectScope` block and its observer are deleted.
- `:data-offscreen="offscreen ? '' : undefined"` replaces `(shimmer && offscreen)`.
- `.skeleton[data-offscreen] { animation-play-state: paused }` pauses the breathe, beside 10.1.1's `::after` pause for the sheen.

A cell is added to `tests/components/rest-loop.test.ts`: a shimmer tile has one observer, writes and clears the mark, and its sheet pauses the `::after`.

**Proof (unit only).** The hunk was built in a rehearsal tree: `git archive release/10.1.2` (`abd829944`), then F5‴ applied except its five conflicting files (below), then the hunk. There, `vitest run --maxWorkers=2 tests/components/rest-loop.test.ts tests/components/ui/skeleton` gives 2 files and 11/11 passed (`r2/logs/f14-vitest-on-1012.log`). A first version that wrote `offscreen || undefined` failed the existing Skeleton cell (the attribute read `"true"`), so the form follows F-10's. **The browser cell is owed at the merge:** E-12 `rest-running off-screen` on a scene rendering `<Skeleton shimmer>`, which is H7's scene to add. The harness is H6's and was not edited.

**What the merge will meet.** `git apply --check F5ppp.patch` on `release/10.1.2`'s tree rejects five files:
- `sheet/SheetContent.vue` and `sheet/styles.css`: F-12, already there; drop.
- `skeleton/Skeleton.vue`: F-14, this hunk.
- `_shared/overlay/participation.ts` and `dock/composables/dockContext.ts`: F5″'s move of the hold token into `engage/hold.ts`, which 10.1.2's dock fixes also touch. These are D2's and D5's rebase after the merge (FORMATION-PROGRESS 2026-10-19 "D2/D5 rebase after").

### F-8 · not this patch

F-8 (the loud commit read) is A's bytes, and P-A6 carries it. On `f5ppp`, E-11's census finds the same two silent clocks H6 found on HEAD, `--engage-control-engage-attack` and `--engage-control-engage-release`, FAIL in both engines (1 pass, 2 fail, 3 UNMEASURED of 6).

## 3 · The battery on `f5ppp`, both engines

The H6 battery is E-1..E-12 on HEAD's scene app (`run.mjs --build out/builds/f5ppp --wt <worktree>`). Each Chromium witness took its own guarded call. The WebKit stages took **one** `guarded --exclusive webkit --timeout 90` acquisition: queued 14:44:08, admitted 14:51:52 (7.7 min wait), released 15:27:19, guarded exit 0. No page closed and no stage was skipped.

| witness | Chromium pass/fail/UNMEASURED of gating (load at start) | WebKit (load at start) | failing cells, whose |
|---|---|---|---|
| E-1 | 31/63/2 of 96 (25.8) | 31/65/0 of 96 (27.0) | adoption and runtime (A's declaration), the presented Sheet's press (§2, A's) |
| E-2 | 72/92/0 of 164 (24.7) | 72/92/0 of 164 (23.0) | A's commit (Q-5 now arm ii, P-A6) |
| E-3 | 16/6/0 of 22 (30.0) | 16/6/0 of 22 (19.7) | the slider's held and keyboard grow, light and dark: E's stage (P-E6) |
| E-4 | **17/1/0 of 18** (32.4) | **15/0/4 of 19** (23.2) | Chromium: the Sheet `repeat landing` under load (§2.2). WebKit: the four Carousel cells, the engine-fact form ("headless WebKit has no touch scrolling"; Chromium the gate) |
| E-5 | 28/28/0 of 56 (31.3) | 28/28/0 of 56 (29.6) | A's press and sustain |
| E-6 | 4/2/8 of 14 (33.4) | 2/2/8 of 12 (20.7) | `s6 present` light and dark: CK-07, which closes on O-103d (2)'s S6 RETIRE line |
| E-7 | 6/1/0 of 7 (36.3) | 6/1/0 of 7 (20.3) | `writers data-held`: `GlassDock.vue` beside `useEngage.ts`, D2's named clause |
| E-8 | **19/0/0 PASS** (35.3) | **19/0/0 PASS** (24.9) | — |
| E-9 | 50/32/0 of 82 (35.6) | 50/32/0 of 82 (22.1) | A's CK-10 faces and the presented fade under reduce (P-A6) |
| E-10 | 19/3/17 of 39 (33.9) | 19/3/17 of 39 (17.9) | `slider escape release`, `slider2 hand-off drop`, `hand-off rev`: E's stage. The 17 UNMEASURED are the engaged cells NOT DRIVEN on a build without E's stage, and the pointer-in-scroller cell |
| E-11 | 1/2/3 of 6 (35.6) | 1/2/3 of 6 | the two control-bit clocks (F-8, A's) |
| E-12 | 80/52/0 of 132 (32.0) | 79/52/1 of 132 (22.7) | the 52 capsule cells, the same 52 H6 read on HEAD (A's, CK-11/14/27). WebKit's one UNMEASURED is `rest layouts`, the engine-fact cell. Every floor cell passes: `restloop rest-running off-screen`, `rest layouts` (Chromium 0.0/s), `fcslop`, `fc-reach`, `wheel`, `consumer anchor` |

**The floor's own cells all pass in both engines.** They are the latch's and arrivals' cells inside E-1 and E-2, E-4's slider and the four surfaces it drives, E-7's one writer (except D2's clause), E-8, and E-12's rest, forced-colours, wheel and anchor cells. The one exception is the Sheet's `repeat landing` under load in Chromium (§2.2). Every other failing cell is identical in both engines and belongs to A's part, E's part, D2, or an owner line, as named.

## 4 · Placed for the next seats (no CK row added)

| item | row | evidence | owner |
|---|---|---|---|
| The presented Sheet does not answer a press: Δscale 0.000 and no press-only paint, normal and PRM, both engines | CK-01 (Sheet PRM press) | §2 F-12 table; `r2/logs/reread{1,2}-f5ppp-chromium-E-1.log` | P-A6 (A's presented rung) |
| E-4 `sheet repeat landing` splits a detent under load in Chromium; the cell prints no per-run velocity, so the drive's spread cannot be told from the rule's | CK-05 | §2.2; `r2/logs/sheet-probe-f5ppp-chromium.log` | H7 (print the release velocity per run); the critics re-read it off load |
| F-14's browser cell: E-12 `rest-running off-screen` on `<Skeleton shimmer>` | CK-16 | §2 F-14 | H7, at the 10.1.x merge |
| F5‴'s rebase onto 10.1.x: Sheet drops, Skeleton takes `F5ppp-F14-on-10.1.x.patch`, the hold-token pair (`participation.ts`, `dockContext.ts`) is rebased | — | §2 F-14 | formation (the merge), D2/D5 |
| F-5's margin, askable now: the carry is unimodal (minima 8.64 px Chromium, 13.65 px WebKit, held-frame reference) | CK-05 | §2 F-13 | the owner, through the agglomerate |

## 5 · Process and fences

- **Machine law.**
  - Every build, gate and browser run went through `~/.claude/guard/guarded`; vitest ran with `--maxWorkers=2`.
  - Browser runs were never `--light`. The two `--light` calls were F-14's two-file unit run, which was in-law.
  - WebKit ran only inside the one `--exclusive webkit` acquisition.
  - One heavy run at a time. The Sheet re-reads waited for the WebKit release.
  - No GPU arguments. Films took no mid-film screenshot. One browser per battery, a context per cell.
  - The 1-minute load ran 14.9-43.5 throughout, from other sessions. It is printed beside every figure.
  - The kernel zone never gated a run.
- **Fences.**
  - No edit to tracked source in the checkout. The checkout writes are this file, the two patches, and `pass-6/F5ppp/` (`run-f5ppp.sh`'s two fixes, `r2/`, `probe/sheet-probe.mjs`).
  - No git write in the checkout other than `git worktree remove`. `git apply --check` was the only other git call against it, a read.
  - Nothing under `~/.claude` was read. No sibling repository was touched.
  - Two shell removals were refused by the tool's safety check (a glob over old logs, and a move of the first attempt's logs). The first attempt's records stay as it left them, and this sitting wrote under `r2/`.
- **Cleanup.** The worktree `.claude/worktrees/bl/D5/p6/F5ppp/wt` was removed with `git worktree remove --force`, and no F5‴ process is left running. **Not removed:** the seat's `rm -rf` of `.claude/worktrees/bl/D5/p6/F5ppp/out` and of the first attempt's `f12.diff` was refused by the tool's permission check. They are scratch only: `out/` holds the harness builds, the reference `src` trees and the 10.1.2 rehearsal tree, and `f12.diff` is copied to `r2/f12-70d502ace.diff`. The owner or the driver deletes them, and nothing in this record depends on them.
