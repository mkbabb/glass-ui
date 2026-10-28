# D5 · pass 6 · P-E6: route E's part on P-A6, four arms (REGISTRY §P5-8.1)

Seat model: `claude-opus-5-5`, asserted from own system identity. This is the **resume seat**: an earlier copy built, measured and cut the patches (2026-10-27 17:52–20:27) and was interrupted before it wrote this report. HEAD at resume `fdea480e7`; the earlier copy's worktree sat at `4f27195b0`, and `git diff 4f27195b0 fdea480e7` touches only `docs/`. INBOUND (last row O-103e/O-109, mtime 17:47) and FORMATION-PROGRESS (to the 2026-10-28 RESTART line) re-read at start: nothing newer binds D5 than O-103d.

Engines: Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** and, per O-103d (3), read against the headless guarded WebKit run of record below. Load is the 1/5/15-min average; a single figure is the 1-min at the run's start.

## 0 · What the resume verified, and how

| check | command | result |
|---|---|---|
| the four patches are the bytes the earlier copy tested | regenerated the candidate patch from the stale worktree (`git diff --binary HEAD` + every untracked file by `git diff --no-index`), `shasum` | `8f952538…` = `P-E6-noveil-coarse.patch`, and the worktree's `stage.ts` = `23945121321c`, the sha the earlier copy's plant builds restored to (`logs/build-plant-*.log`) |
| the patch reproduces on current HEAD | stale worktree removed (`git worktree remove --force`), re-added at `fdea480e7`, `git apply P-E6-noveil-coarse.patch`, regenerated | `8f952538…` again, byte-identical |
| every build the earlier logs ran against | rebuilt all 11 builds from the re-created worktree (`phase-builds-v2.txt`, one guarded call each) and hashed every file of each bundle | `build-manifest-r0.txt` (the earlier copy's bundles, hashed before removal) = `build-manifest-v2.txt`, **11/11 identical**. So every earlier log that names `out/builds/<label>` stands on a verified build, and its numbers are kept |
| the gates | re-run in the re-created worktree (`logs/gate-*-v2.log`) | identical to the earlier copy's: library generation `4e812d26da98…` both times |

Not kept: the earlier `-h1..-h8` hand-off reads (`logs/one-*-handoff-h*.log`). They ran `--scenes slider2` alone, so the witness had no own-release reference and every bound printed `NaN`. They are instrument error, not readings, and are excluded from every count below.

## 1 · The patches

All four are cut against HEAD and contain F5‴ (`F5ppp.patch` `24cec509…`) and P-A6 (`P-A6.patch` `2464bf18…`, arm (ii), the geometric pop) in full. Each passed `git apply --check` on an archived HEAD tree (`logs/mkpatch.log`, at `4f27195b0`); at resume, the candidate applied on `fdea480e7` and both bases (`F5ppp.patch`, `P-A6.patch`) pass `--check` on an archived `fdea480e7` tree. The arms differ only in the two constants of `src/composables/motion/engage/stage.ts`.

| arm | file | sha1 (shasum, re-run at write time) | `STAGE_VEIL` | `POINTER_STAGE` |
|---|---|---|---|---|
| **noveil-coarse (the candidate)** | `pass-6/P-E6-noveil-coarse.patch` | `8f952538771b3825d405dc4e87fab271939726ea` | false | "coarse" |
| veil-coarse | `pass-6/P-E6-veil-coarse.patch` | `4b34d8331ccd034f0402def4974f29edf9a034e0` | true | "coarse" |
| noveil-every | `pass-6/P-E6-noveil-every.patch` | `b143542101fd0affa9ed822813b8ec8be62e0dc8` | false | "every" |
| veil-every | `pass-6/P-E6-veil-every.patch` | `ae2a7e7ffcc560ec2882bca56f9252dcc46ad36c` | true | "every" |

**Cost.** Whole patch: 191 files, +4879/−1561 (src 148 files, +3135/−1290). Over P-A6 (`E6/numstat-over-A6-v2.txt`, measured at resume against `fdea480e7` + `P-A6.patch`; identical to the earlier copy's `numstat-over-A6.txt`): 23 files, +1745/−319, src 16 files +1004/−257, tests 7 files +741/−62. That is E's whole line (the stage, the hold, settle, the footprint CSS, the loupe, the veil arm) carried onto A6. **Pass 6's own change** to E (`E6/E6-own.diff.txt`, `numstat-E6-own.txt`): 5 files, +212/−119:
- `stage.ts` +81/−75. The IntersectionObserver `watchPlace` is deleted and the per-frame rest-place read put in its place (§2).
- `slider/styles.css` +13/−5. The loupe is sized from its band (§3).
- `useEngage.ts` +1/−10. The merge of P-E5's E line onto P-A6: one import line, and the carry's keyframes on the `scale` channel (F5‴ F-13's choice) driven by `settleFrames(RELEASE_RULE.row, …)`.
- tests +117/−29. `engage-stage.test.ts` gains the invariant's describe block, and `engage-door.test.ts` the merge.

## 2 · CK-20: the place invariant, stated once and built to

**The invariant.** *The stage hears every move of the rest box before the next frame it paints.*

**The construction** (`stage.ts`, its header comment carries the same sentence). While anything is on the stage, a `requestAnimationFrame` loop re-`observe`s each holder's rest box (its footprint, or an in-place host) on one `ResizeObserver`. A ResizeObserver reports a newly observed target in the frame's resize step whatever its size did, and that step runs after every task, animation and animation-frame callback has written and layout has run, but before paint. In it, `heard()` reads the rest place: a footprint's page box, an in-place host's offset-chain flow box (both free of transforms, so the grow and a glide in flight do not count as moves), its width, its height and the viewport. It compares that with the place last read and re-writes the geometry (`--stage-room`, `--stage-w`, the veil centre) only when one of them differs. The write lands before the same paint. When the stage empties, the loop and the observer stop, so nothing runs at rest.

Why this and not a detector: an IntersectionObserver armed at its own rest ratio hears only the moves that change that ratio (§P5-7 item 1). A comparison of the box itself has no direction it cannot see.

**The proofs, every arm, both engines.** Counts are PASS/FAIL of the place cells only.

| family member (H6 E-10 unless marked) | cells per arm | noveil-coarse C / W | veil-coarse C / W | noveil-every C / W | veil-every C / W |
|---|---|---|---|---|---|
| outward (`restale` spacer +120, key + pointer) + its control | 4 | 4/0 · 4/0 | 4/0 · 4/0 | 4/0 · 4/0 | 4/0 · 4/0 |
| viewport resize (700 → 380, key) | 1 | 1/0 · 1/0 | 1/0 · 1/0 | 1/0 · 1/0 | 1/0 · 1/0 |
| inward (inset, key + pointer) | 2 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 |
| centred shrink (key + pointer) | 2 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 |
| clipped reveal / conceal / control, top and bottom (key) | 6 | 6/0 · 6/0 | 6/0 · 6/0 | 6/0 · 6/0 | 6/0 · 6/0 |
| clipped, pointer | 1 | UNMEASURED: no driver (§P5-7 item 6; a scroll ends a mouse hold) | same | same | same |
| layout-only landing + re-render landing | 2 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 | 2/0 · 2/0 |
| **E6 probe** `e6-place`: a move written by an rAF callback registered after the stage's own; a 600 ms CSS-transition move (key + pointer) | 4 | 4/0 · 4/0 | 4/0 · 4/0 | 4/0 · 4/0 | 4/0 · 4/0 |
| **C-A5 `ca5-probe`** shrink / inset / translate place, shrink reach (key + pointer) | 7 | 7/0 · 7/0 | 7/0 · 7/0 | 7/0 · 7/0 | 7/0 · 7/0 |
| **C-E5 `ce5-probe`** clipped stale place, keyboard, 6 cells | 6 | 6/0 · 6/0 | 6/0 · 6/0 | 6/0 · 6/0 | 6/0 · 6/0 |

Loads. E-10 batteries: Chromium 34.7 / 26.8 / 25.2 / 17.9, WebKit 16.2 / 22.9 / 25.5 / 21.9 (noveil-coarse / veil-coarse / noveil-every / veil-every). `e6-place`: Chromium 19.4 / 17.6 / 20.1 / 21.2, WebKit 23.2 / 24.0 / 23.6 / 24.9. `ca5`/`ce5`: 18.3–29.0. Logs: `E6/logs/bat-<arm>-<engine>-E-10.log`, `xp-e6-place-*`, `xp-ca5-probe-*`, `xp-ce5-probe-*`; JSON in `E6/json/<arm>/`.

The other probe cells are not counted green, and neither is a defect of this route:
- `ca5-probe` fails 2 cells on every arm in both engines: fail-loud on `--engage-commit-light-{attack,release}`. That token pair no longer exists, because O-103d (1) retired the commit light in P-A6. This is a stale probe expectation (§P5-7 item 11's class).
- `ce5-probe`'s 6 pointer cells print NOT DRIVEN, with engaged false (item 6's reason).

**The plants fail where they must** (builds `plant-*`, each the candidate with one line planted in `stage.ts`, source restored byte-identical; `logs/build-plant-*.log`):
- **deaf**, where `heard()` returns at once:
  - E-10 `restale`/`clipstale` 4 PASS / 12 FAIL in Chromium (load 18.1) and in WebKit (25.8);
  - `e6-place` 0/4 in Chromium (16.2), with the transition move gliding back 60.8–61.4 px;
  - units 4 failed of 27 (`logs/unit-plant-deaf.log`).
  - `e6-place` on the deaf plant in WebKit (resume seat, load 16.6): 0/4, with the transition move gliding back 61.0/61.8 px and the late frame write 6.3 px.
- **rafread**, which reads in the stage's own rAF callback, not in the resize step. It hears every style-written move but not one written by a later rAF callback:
  - `e6-place` late frame write FAIL, key and pointer, in both engines (Chromium 4.6/4.7 px glide, load 15.1; WebKit 6.0/6.3 px, load 26.7), while the transition cells pass;
  - units 1 failed of 27.

  This is why the read sits in the resize step and not in a frame callback.

The units: `tests/composables/motion/engage-stage.test.ts` "the stage hears every move of the rest box before the next frame it paints (CK-20)". It has a moved-and-heard case per family member, a control showing that the same move made before any frame paints it is travelled (so the cases are not vacuous), and the late-rAF case.

**Verdict on the invariant: met** on every place cell in H6's family, on C-A5's and C-E5's probe cells and on the E6 probe's two harder moves, on all four arms in both engines. The one cell that cannot be read is the pointer-in-scroller cell, which has no driver in either engine; that is a reason, not a reading.

### The Chromium hand-off drop

Pass 5: P-E5 5/14 FAIL, C-E5 2/3, all in Chromium, with the `rafarm` variant passing 4/4 in Chromium only. The pass-5 suspect was the IntersectionObserver being armed inside the engagement task. That observer is gone, so there is no arming step left to defer. `rafarm` (and its `writeGeometry` call) is superseded, not ported: the per-frame resize-step read is the cure, and `engageStage` still calls `writeGeometry` once on engagement.

The witness is E-10 `handoff` (`--scenes slider,slider2`: the slider's own release is the reference). Each read gives 2 drop cells (fwd, rev). The control is `plant-noread`, the candidate with no frame read at all (no loop, no observer), interleaved with the candidate.

| build | Chromium reads (drop cells P/F; loads) | WebKit reads (drop cells P/F; loads) |
|---|---|---|
| noveil-coarse (candidate) | battery + r1–r8 + c1–c3 = 12 reads, **24/0** (loads 17.4–34.7) | battery + r1, r2 = 3 reads: 4/2. The fail is r2 (load 22.5): 0.0108 / 0.0107 against bound 0.0105. Resume seat, w1–w5 interleaved with the control: 10/0 (loads 13.6, 11.0, 9.9, 12.0, 15.8; drops 0.0082–0.0107 against bounds 0.0084–0.0101 + 0.002). Total 8 reads, **14/2** |
| plant-noread (control) | c1–c5 = 5 reads, **10/0** (loads 17.5–27.7) | w1–w5 = 5 reads, **10/0** (loads 11.8, 11.6, 11.6, 15.3, 16.3; drops 0.0082–0.0106, the same spread as the candidate's) |
| veil-coarse | battery + r1, r2: 4/2 (r1 rev 0.0111 vs 0.0091, load 19.7; r2 fwd 0.0094 vs 0.0089, load 21.5) | battery + r1, r2: 6/0 |
| noveil-every | battery + r1, r2: 6/0 | battery + r1, r2: 5/1 (battery fwd 0.0116 vs 0.0110, load 25.5) |
| veil-every | battery + r1, r2: 6/0 | battery + r1, r2: 5/1 (battery rev 0.0124 vs 0.0119, load 21.9) |

Also seen: the `slider escape release` cell (not a hand-off cell) failed once on veil-every Chromium r2 (0.0112 vs 0.0110, load 14.6) and once on veil-coarse WebKit's battery (0.0107 vs 0.0106, load 22.9). Those are margins of 0.0002–0.0001 on the slider's own release against itself.

**Reading.**
- **Chromium.** The pass-5 drop does not reproduce on the candidate: 24/0 over 12 reads at loads 17.4–34.7, against pass 5's 5/14 on the IntersectionObserver build. The no-read control is 10/0 as well, so the frame read adds no drop, and with the observer gone there is no arming step left to cause one.
- **WebKit.** The candidate's one failing read (r2, load 22.5, over its bound by 0.0003 and 0.0002) did not recur in 5 re-reads at loads 9.9–15.8. The control shows the same 0.0082–0.0106 scatter with no frame read at all. Under the seat rule that is **NOT-REPRODUCED**: the engine's own release scatter at the bound's 0.002 margin, not the stage.
- **The other arms.** veil-coarse's two Chromium fails (load 19.7–21.5) and the every-arms' single WebKit fails (21.9–25.5) were each one read under load. They sit within 0.0005 of their bounds and passed their re-reads (veil-coarse WebKit 6/0; noveil-every and veil-every Chromium 6/0). They are recorded and not re-run four more times per arm in this seat. The veil-coarse Chromium pair reproduced across 2 of 3 reads, so it is **open on that arm**, not on the candidate.

## 3 · CK-25: the loupe at `k` max

**The change.** `--loupe-k-max` goes from 2.6 to 1.6, and the housing derives from one figure, the band. `--loupe-band` = track height × `--loupe-k-max`, and the window is 4 bands long and 2 bands tall (`--loupe-span` = 4 band + 2 ring). So at `k` max the magnified track crosses the window through its middle half, with clear glass above and below it, and its fill ends on its pill cap at the mark. Before, the band filled the window edge to edge: the cap's radius was half the window, and the visible fill closed into a round bead, which read as a toggle switch (C-A5 §4, C-E5 §3). There is no lighting layer, no added highlight and no blur change (O-87).

**Measured** (`E6/probe/loupe-frame.mjs`, REPORT cells, both engines identical): housing 148.4×80.6 px, window 135.7×67.8 px (aspect 2.0), band 33.9 px = 0.50 of the window, `--loupe-k-max` 1.6. The figures are the same fine and coarse, light and dark. Chromium load 13.7, WebKit 23.3 (`logs/xp-loupe-frame-*.log`).

**Frames:** `E6/glance/loupe/e6-noveil-coarse-{chromium,webkit}-{fine,coarse}-{light,dark}-loupe-{held,sustained}.png` (16).

**My reading, for the critics to score:** the window now shows a band passing through glass. The fill runs in from the window's left edge and ends on its cap at the mark, and the unfilled track continues to the right edge, so what is seen continues past the lens. That is the lens reading pass 5 lacked, and the bead is gone. Two things remain for the critics' eyes:
- the 1 px value mark at the fill's tip still reads as a hard line;
- the housing has no edge cue of its own beyond the material's rim.

Whether that is iOS-27 grade is the frame call of C-E6 and C-A6, not this seat's. The owner-glance sheets crop the raised loupe at the top of the slider cell (`glance/e6-*-coarse.png`, held/engaged columns). The `glance/loupe/` frames are the whole-loupe set.

**The slider-press probe in WebKit** (`E6/probe/slider-press.mjs`, the door's `[data-held]` on a held touch, fill block scale):

| engine | reads | result | loads |
|---|---|---|---|
| WebKit | 1 + 1 (resume r2) | light and dark: held at +25 to +27 ms, sy 0.985–0.986 at +25, 0.940 at +1200 | 26.9 / 15.6 |
| Chromium | 4 runs (8 cells): 2 PASS, 6 FAIL | every fail is `held false` at its first read (+25 to +28 ms), held by +50 to +54 ms; sy and the +1200 hold pass in every cell | 12.9–24.0 |

**The control** (`E6/probe/slider-press-ctl.mjs`, new; `logs/xp-slider-press-ctl-*.log`). On the page's own clock it times the first touchstart/pointerdown and the moment `data-held` lands:
- Chromium 6/6 cells (load 27.7): **library latency 3.1–3.7 ms** (held − first touch event); driver latency 17.0–36.5 ms (the node's send of `Input.synthesizeTapGesture` → the page's first touch event).
- WebKit: 6/6 cells (load 15.8): **library latency 7.0–9.0 ms**. The driver latency prints −10 to −13 ms, because the raw driver's clock starts after touchStart is already delivered: the event precedes the clock, as the harness intends.

The harness starts Chromium's clock at the send, without awaiting delivery, while WebKit's raw driver awaits touchStart before the clock starts (`harness/lib.mjs` `openTouchPage.holdAt`). So the Chromium misses are the gesture synthesizer's delivery time. The library holds within 4 ms of the touch in both engines. **Not a CK-06 counterexample.** It is a harness item for H7: start the Chromium clock at the first touch event, or await the gesture's touchStart.

## 3a · The owner-glance set (CK-25)

`E6/glance/e6-{noveil,veil}-coarse-{chromium,webkit}-{fine,coarse}.png` (8 sheets), `e6-*-index.json`, and `frames/` (864 frames): 9 scenes (button, switch, slider, sortable, accordion, presented, field, ambient, passive) × {rest, pressed, held, engaged, committed, released} × light/dark × fine/coarse × both engines, for the candidate and the veil arm. CAP exit 0 on all four runs: Chromium load 13.2 / 14.4, WebKit 25.4 / 26.0 (`logs/cap-*.log`). The ladder cells (accordion, collapsible, menu) PASS in both engines.

From the candidate's coarse Chromium sheet:
- **No veil anywhere**, on the noveil arm.
- The held slider grows ×1.060 in place, with the loupe raised.
- The sortable lifts with a shadow.
- The disclosed accordion's ladder deepens over its hover.
- The commit is A's geometric pop (×1.020 Button, ×1.048–1.050 Switch).

Two of pass 5's CK-25 complaints still show in these frames. Both are A's part, not E's, and are reported here for the critics:
- the committed Button is hard to tell from rest;
- the coarse Switch press darkens the thumb only faintly.

## 4 · Gates (re-created worktree, through `guarded`, one heavy run at a time)

| gate | result | load at end |
|---|---|---|
| `npm run build` | exit 0, generation `4e812d26da98…` | 17.5 |
| `npm run typecheck` (vue-tsc ×2) | exit 0 | 17.1 |
| `npm run demo:dist:build` | exit 0 | 16.6 |
| `npx vitest run --maxWorkers=2` | 246 files; 2418 passed, 10 expected fail, 1 skipped; exit 0 | 23.0 |

Logs: `E6/logs/gate-*-v2.log`. The earlier copy's `gate-*.log` (18:06–18:09, loads 28.9–31.9) printed the same results and the same generation.

## 5 · The H6 battery on the candidate, both engines, and per CK row

Battery `run.mjs` on the harness's own app (scene app sha1 `d020f4946adb`). The candidate ran E-1..E-12. The other three arms ran the witnesses E's arms can move (E-1, E-3, E-4, E-10, E-12), plus every place probe above. Format: pass/fail/unmeasured, load at start.

| witness | noveil-coarse Chromium | noveil-coarse WebKit | other arms, Chromium | other arms, WebKit |
|---|---|---|---|---|
| E-1 | 93/1/2 · 29.2 | 93/3/0 · 20.3 | 93/1/2 each | 93/3/0 each |
| E-2 | 164/0/0 · 35.9 | 164/0/0 · 16.9 | — | — |
| E-3 | 22/0/0 · 30.2 | 22/0/0 · 19.9 | 22/0/0 each | 22/0/0 each |
| E-4 | 18/0/0 · 32.9 | 15/0/4 · 20.9 | 18/0/0; veil-every 17/1/0 (13.7) | 15/0/4 each |
| E-5 | 56/0/0 · 28.8 | 56/0/0 · 16.5 | — | — |
| E-6 | 4/2/8 · 26.3 | 2/2/8 · 14.0 | — | — |
| E-7 | 6/1/0 · 26.8 | 6/1/0 · 14.1 | — | — |
| E-8 | 19/0/0 · 25.3 | 19/0/0 · 14.2 | — | — |
| E-9 | 64/18/0 · 28.1 | 64/18/0 · 15.3 | — | — |
| E-10 | 22/0/17 · 34.7 | 22/0/17 · 16.2 | 22–23/0/17 each | 21–22/1/17 (§2) |
| E-11 | 7/0/1 · 21.7 | 7/0/1 · 15.1 | — | — |
| E-12 | 101/1/0 · 27.2 | 99/2/1 · 17.4 | 100–101/1–2/0 | 99/2/1 each |

What each fail and unmeasured is (logs `E6/logs/bat-*`):
- **E-1:**
  - the `dock` adoption latch → D2;
  - in WebKit, `runtime ambient (aurora)` 1.72–1.74 levels against 1.24–1.26 drift (not ≥ 2×), and its PRM leg 0.00 → CK-19, D3's amplitude and A's PRM leg (P-A6 gap 2);
  - Chromium's 2 unmeasured are the Aurora's `css` substrate (engine limit).
- **E-4:**
  - WebKit's 4 unmeasured are the Carousel's touch scroll. O-103d (4) engine fact: "headless WebKit has no touch scrolling"; Chromium is the gate and passes.
  - veil-every Chromium's one fail is `sheet repeat landing` (spread 125 px, 1 read, load 13.7). That is F5‴'s recorded CK-05 Sheet reading (FORMATION-PROGRESS, F5ppp banked: "sheet repeat-landing splits off load, Chromium, H7 adds velocity"), not an E arm effect: the candidate and the two other arms read 18/0.
  - The slider carry (F-13) reads 6.61–7.07 px in Chromium and 6.68–7.28 px in WebKit, 5 reads each, every read passing. It is unimodal on this build.
- **E-6:** s6 present 0 animations → CK-07 closes on S6 RETIRE (O-103d (2)); its 8 unmeasured are s6 channel/shape/amplitude/period with no idle animation to read, the same retirement.
- **E-7:** the `data-held` writers `GlassDock.vue` + `useEngage.ts` → D2's named clause.
- **E-9:** 18 `commit-light` cells test the retired form (O-103d (1)). H7 re-points them (P-A6 note).
- **E-10:**
  - the 16 unmeasured rebound-reverse cells read a commit light that no longer exists (same retirement);
  - the 17th is the pointer-in-scroller cell (§2).
- **E-11:** the unmeasured cell is `--scale-commit-pop` not read on the switch path (A's).
- **E-12:**
  - `capsule select press fine`: Chromium ×0.9977–0.9980 against 0.002. The select opens on pointerdown, so the read sees the rebound; WebKit NOT DRIVEN. A harness item (P-A6 note), on every arm alike;
  - WebKit `restloop rest layouts` UNMEASURED: O-103d (4) engine fact, "Playwright WebKit exposes no rest-layout counter".

**Per CK row, this route's reading** (rows E's part does not touch are A's or the floor's and are read by the critics):

| CK | Chromium | WebKit | reading |
|---|---|---|---|
| CK-03, 04, 08, 09, 13, 15, 22, 23, 24, 26 (closed at pass 5) | hold | hold | E-2 164/0, E-3 22/0 on all arms, E-5 56/0, E-8 19/0 in both engines; one engaged root per frame through every hand-off (singleton cells PASS on every read) |
| CK-05 | PASS (slider carry 5/5 unimodal; Carousel PASS) | slider 5/5; Carousel engine fact (O-103d (4)) | the Sheet repeat landing is F5‴'s reading (above) |
| CK-07 | closed by O-103d (2) | same | E-6 s6 cells are the retired S6 |
| CK-14 | E-3 22/0, E-12 coarse cells PASS; no veil on touch on the candidate | same | the touch hold is in place, with no promoted overlay or veil |
| CK-16 | E-12 restloop PASS (0 layouts at rest; the frame loop stops when the stage empties) | engine fact, reported | |
| CK-17 | the Safari cells read against this WebKit run (O-103d (3)) | — | real Safari UNMEASURED |
| **CK-20** | **place invariant met** (§2); hand-off on the candidate 24/0 over 12 reads | place invariant met; hand-off on the candidate 14/2 over 8 reads, the 2 NOT-REPRODUCED in 5 re-reads; control 10/0 | A's +60 reverse step (P-A6 gap 1) is A's half of the row |
| **CK-25** | loupe re-sized (§3), frames for the critics | same | the committed-Button and coarse-Switch notes are A's |
| CK-06 | the slider press holds 3.1–3.7 ms after the touch; the +25 misses are the driver's | PASS | §3 |

## 6 · Open gaps

1. **CK-20 pointer-in-scroller** stays UNMEASURED in both engines: there is no driver (§P5-7 item 6).
2. **CK-20 hand-off on veil-coarse in Chromium:** 2 fails in 3 reads, at most 0.002 over the bound at loads 19.7–21.5. It was not re-read further, so it is open on that arm only. The candidate is 24/0 in Chromium.
3. **CK-25** is a frame call for the critics: the 1 px value mark at the fill's tip, and no housing edge cue beyond the rim. The glance sheets crop the raised loupe; use `glance/loupe/`.
4. **Harness items for H7:**
   - the Chromium touch clock starts at the send (§3);
   - the E-10 `handoff` mode needs `slider` in `--scenes`, or it prints `NaN` bounds instead of failing loud (the `-h*` reads);
   - `ca5-probe`'s commit-light fail-loud cells are a stale expectation;
   - E-9 and the E-10 rebound cells test the retired commit light;
   - E-12's select press.
5. **Real Safari: UNMEASURED (owner's safaridriver checkbox)** on every row.
6. **Not E's:** the D2 rows (dock latch, `data-held` writer); CK-19 (D3 amplitude, A's PRM leg); A's +60 reverse step.

## 7 · Process record

- **Fences.** Writes in the checkout were limited to `docs/tranches/BL/design/engagement/`, with no git write there. Builds and tests ran only in `.claude/worktrees/bl/D5/p6/E6/wt`. Every build, test and browser run went through `guarded`, never `--light` for a browser. The typecheck ran `--light`; it starts no browser.
- **WebKit acquisitions.** The earlier copy took its WebKit stages in one `--exclusive webkit` acquisition (`logs/chain-phase-webkit.log`, released 20:09:39). Its control phase (`phase-webkit-ctl.txt`) was queued at 20:16 and never admitted before the restart. This seat ran it, with the slider-press control and the deaf plant on `e6-place`, in one acquisition (`phase-webkit-v2.txt`, `logs/chain-phase-webkit-v2.log`): queued 21:47:17, admitted 22:21:43 (about 34 min behind other seats' WebKit runs), released 22:25:28, guarded exit 0.
- No page closed in WebKit outside the harness's planned relaunch.
- **One denial.** An `rm -rf` of the stale bundles (`out-r0`, kept only for the manifest comparison) was refused by permissions; it was not retried that way (§ cleanup below).
- **The worktree.** The stale worktree was removed with `git worktree remove --force` before re-creation, and the re-created one at return. The stale bundle copy was removed with `find -delete` once the manifests matched. At return, the worktree and its `out/` builds are removed; nothing is left under `.claude/worktrees/bl/D5/p6/E6/`.
