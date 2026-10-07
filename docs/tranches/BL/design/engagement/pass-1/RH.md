# D5 · pass 1 · R-H: the harness rows H-1..H-9

| field | value |
|---|---|
| seat | R-H, the harness seat of D5 pass 1 (`REGISTRY.md` §3.1) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5d078ca4`; `src/` byte-identical to `v10.1.0` (`git diff --stat v10.1.0 HEAD -- src` empty). All builds and runs in a scratch worktree, removed after |
| placement | `harness/` in place (W-C.1's move to `scripts/loops/engagement/` is W-C.1's) |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5 (Playwright 1.61.1), headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | this seat ran on a saturated machine: 1-minute load 17-35 at the start, **230-830 for most of the run** (other seats' browsers, a pytest suite, vitest, vue-tsc, builds). Every timing and cell carries its load. Two consequences, both handled by the rule (a defect seen only under load is NOT-REPRODUCED): two self-test runs broke under load and passed 2/2 on re-run; a handful of HEAD cells are marked load-suspect (`../BASELINE.md` §0.2) |
| verdict | **H-1, H-3..H-9 landed; H-2 open** (waits on a winning family). Self-test GREEN in both engines (`../harness/SELFTEST.md`). HEAD re-run: `../BASELINE.md` §0 |

## 1 · Row by row

| row | what landed | where | evidence |
|---|---|---|---|
| H-1 | the clean fixture passes every witness and every plant fails its planted cell, both engines, including every new cell below | `selftest.mjs`, `fixtures.mjs` (16 new plants, 2 new scenes) | `harness/SELFTEST.md`: 98 runs, 95 OK, 1 N/A (the strip plant in WebKit, no input), 2 load-broken and re-run OK 2/2 |
| H-2 | **open** | `scenes/App.vue` `INDEX` / `SCENE_OF_DIR` | needs a declared class table; no family has one yet |
| H-3 | per-cell segment isolation and relaunch (already built at round 0), hardened: page-ready and navigation timeouts and raw-WebKit transport errors count as an engine close; the engine kill is bounded (5 s, then SIGKILL) | `lib.mjs` `guard`, `Engine.kill`, `run.mjs` `runOne` | at HEAD the WebKit ToggleGroupItem cell reads `ENGINE CLOSED, REPRODUCED 2/2` and the run moves on; a hung `close()` stalled two witnesses for 1500 s each before the bound (`../baseline/p1/head.log:84,98`) |
| H-4 | **a held touch in WebKit.** Playwright's WebKit touchscreen sends only `Input.dispatchTapEvent`; the same WebKit build's protocol carries `Input.dispatchTouchEvent`. `wktouch.mjs` drives the build Playwright installs (`pw.webkit.executablePath()`) over its own `--inspector-pipe`. E-5 and E-3's phone arm now read in both engines | `wktouch.mjs`, `lib.mjs` `openTouchPage` | `rh/h4-probe.log`: Playwright's tap leaves `:active false`; `dispatchTouchEvent` held 300 ms reads `:active true`, `:hover true`, outline solid, events `pointerdown:touch touchstart`; after touchEnd `:active false`. Chromium's raw CDP touchStart reads `:active false`, its long-tap `:active true` (the round-0 reading) |
| H-4 (drag) | a touch DRAG reaches the DOM in WebKit but does not scroll (macOS WebKit has no touch scrolling); a wheel has no momentum phase in that protocol. E-4's touch surfaces are UNMEASURED in WebKit with that reason | `e4-momentum.mjs` | `rh/h4-probe.log`: WebKit strip scrollLeft 0 → 0 after both releases. Chromium carried 105 → 600 (fling) and 101 → 0 (still) at load 24 earlier this session; at load 760 in the banked probe both read 0, a load artefact (the witness's own fixture strip passed in the self-test) |
| H-5 | breathing defined so a trivial loop fails: **channel** narrowed to breathing channels (scale, a scale-only transform, opacity on a pseudo-element; rotate, translate, filter fail); new **shape** cell (continuous at the loop seam or alternating, and eased) | `e6-idle.mjs` | plants `e6-spin` (FAILs channel) and `e6-saw` (scale 1 → 1.012 sawtooth, legal channel, amplitude and period: FAILs shape), both engines; the round-0 plant `e6-dim` still FAILs channel |
| H-6 | E-1 reads the declaration from the build plus a runtime press per class; no source text (built at round 0; re-verified) | `e1-census.mjs` | `e1-*` plants, both engines |
| H-7 | E-4 over five surfaces: slider, tabs drag, **Sheet detents, sortable list, Carousel (scroll-snap)**. Generalized: axis, direction, mouse or touch input, a press point other than the thumb, a fallback read after a drag ghost retires; a press point off screen fails as unreadable, an undriven drag fails NOT DRIVEN (UNMEASURED for touch in WebKit) | `e4-momentum.mjs`, `scenes/App.vue`, fixture `vsheet`, `strip` | plants `e4-vdrop`, `e4-stripstop`; HEAD readings in `../BASELINE.md` §0.1 |
| H-8 | the mount case (built at round 0): mounted committed, nothing pops | `e2-commit.mjs` | `e2-mountpop`; SegmentedTabs FAILs it at HEAD (round 0) |
| H-9 | a PRM cell per witness: E-1 `runtime … PRM press-light`; E-2's PRM arm is E-9 (same scenes, not read twice); E-3 `keyboard-focused PRM`, `phone touch-held PRM`; E-4 `release PRM` (at rest, no overshoot past rest); E-5 `press-light(PRM)`; E-6 `PRM` (round 0); E-7 `held PRM`; E-8 `literal … PRM`; E-9 itself | each witness | plants `e9-dark` (E-1, E-5, E-9), `e3-prmgrow`, `e4-prmbounce`, `e7-prm`, `e8-prmliteral`, `e6-prm` |

## 2 · Corrections the work forced on the harness

1. **E-5's press-only set compared property names, not values.** A press that paints its own background on a property hover also paints was subtracted as hover. It now counts a property changed from rest to a value the hover state does not paint. Leaked sticky hover still fails (`e5-hover`, both engines).
2. **E-4's PRM overshoot** read a surface returning toward its start as an overshoot (the strip plant: 120 px). It now reads only travel past the rest in the direction of travel.
3. **E-8 called a 0 ms reduce-arm animation a minted figure** (the accordion's `disclosure-open`/`-close` under reduce, `../baseline/p1/head.log:83`). Durations ≤ 1 ms are instants. After the fix: PASS 5/5 on the scenes concerned (`../baseline/p1/head-final.log:17`).
4. **Two first-cut plants passed** and the witness was right both times (`harness/SELFTEST.md` §3): a detent sheet that drops position-projection but keeps a velocity-seeded spring does carry velocity; Chromium's fling survives an `overflow` toggle.

## 3 · What HEAD shows through the new rows (for the agglomerator)

The readings are `../BASELINE.md` §0; these are the rows they suggest, not decisions:

1. **Candidate row: the detented Sheet paints in flow.** `.glass-floating`'s `position: relative` (0,1,0) beats the sheet's `:where()` `position: fixed` (0,0,0) in the same layer; the sheet sits at the end of the document. Read in the harness build in both engines, four times; not checked in the shipped package or the demo (`rh/film.log`). It blocks E-4's Sheet cell independently of momentum.
2. **Candidate row: the sortable fling teleports.** After a fling the ghost flies back toward the original slot and the row appears at its new slot in one frame (74-84 px). Both engines, 3 readable flings of 4, and earlier at load 56 (`rh/film.log`). A D-1 defect on a shipped surface, the same class as the tabs drag's round-0 jump.
3. **SegmentedTabs' drag under reduce does nothing**: the indicator does not follow the finger (moved 0.0 px, both engines). Reduce removed the gesture, not only its spring.
4. **H-9 widens round 0's E-9 finding to the touch path**: SegmentedTabs, ToggleGroupItem, Chip and the accordion trigger keep no light answer under reduce for a held touch either (Chromium; Tabs and Chip also WebKit).
5. **The Carousel already passes E-4** in Chromium: the platform's momentum and snap carry the velocity. It is the one surface green at HEAD; its WebKit cell needs real Safari.
6. **REGISTRY §2.1 E-5's engines column** ("WebKit UNMEASURED") is superseded by H-4; the registry row is the agglomerator's to update, citing this file (P-3).

## 4 · Owed

- H-2 (exemplars per declared class).
- Re-reads at a sane load: E-2 under the landed harness (unchanged witness; round 0's reading stands), E-8 and E-9 in WebKit, and the load-suspect cells of `../BASELINE.md` §0.2.
- FL-6 (an idle rung stops off-screen), FL-7 (real Safari), a `dist` flavour of the build: unchanged, `harness/HARNESS.md` §3.

## 5 · Artefacts

| file | what |
|---|---|
| `../harness/wktouch.mjs` | the WebKit touch driver (new) |
| `../harness/{lib,run,selftest,fixtures,e1..e9}.mjs`, `scenes/App.vue` | the rows above |
| `../harness/SELFTEST.md`, `logs/selftest.log`, `logs/selftest-rerun.log`, `logs/selftest-cells.log`, `logs/selftest-post.log` | H-1's reading (round 0's logs are superseded and removed) |
| `../BASELINE.md` §0, `../baseline/p1/` | the HEAD re-run: `head.log`, `head-final.log`, `head-rerun.log` (the stalled queue), `head-cells.log`, `head-final-cells.log` |
| `rh/h4-probe.mjs`, `rh/h4-probe.log` | the H-4 measurement (Chromium and WebKit, held touch and touch drag) |
| `rh/film.mjs`, `rh/film.log` | the Sheet's computed position and the sortable list filmed per frame, two reads per engine |
| `rh/plants-first-cut.log`, `rh/plants-second-cut.log` | the plant iterations of §2 item 4 |

## 6 · Reproduce

```sh
H=docs/tranches/BL/design/engagement/harness; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
node $H/build.mjs $S/wt --label head --out $S/out
node $H/selftest.mjs --out $S/out/selftest
node $H/run.mjs --build $S/out/builds/head --wt $S/wt --out $S/out/runs/head --verbose
node docs/tranches/BL/design/engagement/pass-1/rh/h4-probe.mjs
node docs/tranches/BL/design/engagement/pass-1/rh/film.mjs $S/out/builds/head webkit
git worktree remove --force $S/wt
```
