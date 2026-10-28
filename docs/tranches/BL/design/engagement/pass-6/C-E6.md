# D5 · pass 6 · C-E6: the fresh critic of the candidate A+E

**Verdict: ADVANCE, not converged, not clean. 20 of 27 rows closed (74 %).** Open: CK-01, CK-05, CK-17, CK-19, CK-20, CK-22, CK-25. Building can still remove counterexamples from CK-01, CK-05, CK-19, CK-20, CK-22 and CK-25, so **this is not the fixed point**. Only CK-17 (the dock's `:active` presses) and CK-01's `dock` latch are D2-blocked. No row is owner-gated any more: O-103d answers Q-5, Q-2, the CK-17 scope and the engine-fact cells.

| field | value |
|---|---|
| seat | C-E6, the fresh adversarial critic of D5 pass 6 (`§P5-8.3` wave 3). I authored no D5 seat in passes 2-6 and was not a critic in passes 3-5 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `76404c935` (docs-only commits since P-E6's `fdea480e7`) |
| candidate | `P-E6-noveil-coarse.patch`, sha1 `8f952538771b3825d405dc4e87fab271939726ea` = F5‴ (`24cec509…`) + P-A6 (`2464bf18…`, Q-5 arm ii) + E's part. **Composition checked**: I archived HEAD's `src`, applied `P-A6.patch` and ran `diff -rq` against the candidate worktree. Exactly E's 16 `src` files differ, and they are the 16 that `E6/numstat-over-A6-v2.txt` lists. Cost reproduced: 191 files, +4879/−1561, of which `src` is 148 files, +3135/−1290 (CK-23) |
| other arms | veil-coarse `4b34d833…`, noveil-every `b1435421…`, veil-every `ae2a7e7f…`. Each was built from the same worktree with `stage.ts`'s two constants set (`build-*.log` prints them). After every build the source tree hashed back to `f245802ddaaa` |
| owner rulings | INBOUND re-read at seat start (mtime 2026-10-27 17:47; last D5 row O-103d; O-103e, O-108 and O-109 are not D5's). FORMATION-PROGRESS read to its 2026-10-28 RESTART line. Nothing newer than O-103d binds D5. O-103d applied: Q-5 arm (ii) with a PRM cell per face kind; Q-2 S6 RETIRE; CK-17 under the O-103 reading; CK-16 and CK-05's WebKit cells in the engine-fact form; Q-3 (c) with no veil |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, no GPU arguments. **Playwright WebKit is not Safari.** Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox) and is read against this seat's guarded WebKit run, per O-103d (3) |
| runs | Chromium chain 22:35:33 → 00:54:27 (`C-E6/logs/chain-phase-chromium.log`), extra chain 00:54:29 → 01:08:05 (`chain-phase-chromium-extra.log`), post chain → 02:37:41, after the WebKit release (`chain-phase-chromium-post.log`). **WebKit: one `guarded --exclusive webkit` acquisition**, queued 01:08:05, admitted 01:10:44, released 02:30:14 with guarded exit 0 (`chain-phase-webkit.log`). No WebKit stage was skipped, and no page closed outside the harness's NAV_CAP relaunch |
| load | 1-minute load ran 7.6-45 in Chromium and 10.2-86.8 in WebKit (a spike from another seat at 02:2x). Every log opens and closes with it, and each figure below gives its own |
| records | `C-E6/` holds `run-ce6.sh` (stages, plant builds), `chain-*.sh`, `phase-*.txt`, `probe/ce6-probe.mjs` (my probe), `logs/`, `json/`, `glance/` (sheets, 216+ frames per engine, `loupe/`, `clip/`), and `logs/ck22-greps.txt` |

## 0 · In brief

1. **E's place invariant holds on every path the pass-5 critics found, plus the one nobody could drive.** H6's E-10 place family (outward, inset, centred shrink, viewport resize, clipped reveal/conceal/control, layout-only landing) passes on all four arms in both engines. So do C-A5's `ca5-probe` place cells (7/7 per arm), C-E5's keyboard clipped cells (6/6) and E6's `e6-place` (4/4). The cell H6 left UNMEASURED, the **pointer hold inside a clipping scroller**, now has a driver in my probe. The driver never scrolls under the hold: the box is scrolled before the press, and a spacer then clips the held slider by a style write. The cell passes 6/6 per arm in both engines (largest one-frame move 0.0 px against ≤ 4). My deaf plant fails it 6/6 (`xp-ce6-probe-plant-x-chromium.log`), so the cell can fail.
2. **A new CK-20 counterexample, on every arm, in both engines: the promoted control escapes the card that clips its place, then vanishes in one step.** A keyboard engagement promotes the slider into the top layer. When its scroller clips the footprint, the control keeps painting whole over the card's edge: 14.6 px of a 21.2 px control sits outside the card at 70 % hidden (frame `C-E6/glance/clip/ce6-noveil-coarse-chromium-light-clip-overpaint-70.png`). When the last pixel of the footprint leaves, `position-visibility: anchors-visible` drops the whole control in one 1 px scroll step. The painted-outside area per 1 px step, at hidden 14..22 of 20 px:
   - Chromium: 3191 / 3348 / 3505 / 3663 / 3820 / 3976 / **0** / 0 / 0 px²;
   - WebKit: 2810 / … / 3589 / **0**.

   The bound is 3 rows × 358 px = 1074 px². It reproduced 2/2 in Chromium and 1/1 in WebKit, and it fails on all three other arms in Chromium (`xp-ce6-probe-*-chromium*.log`, `xp-ce6-probe-noveil-coarse-webkit.log`). The cause is geometric, not load.
3. **A's part cures what it was sent to cure.**
   - **Commit:** E-2 164/0 in both engines.
   - **PRM per face kind** (O-103d (1)): `a6-probe prm` 23/0 in Chromium and inside WebKit's 40/0.
   - **Clocks:** the E-11 census finds 4 clocks, each loud when planted; my silent-clock plant fails all 4 in both engines.
   - **Capsule:** E-12 finds 0 non-dock composers; my plant puts it back on the preset chip, and the chip fails hover ×1.0150, press ×0.9700 and coarse latch ×1.0150 in both engines.
   - **Presented fade under reduce:** 20-21 frames in Chromium and 17 in WebKit, against ≥ 2.
   - **Sheet press:** `runtime presented (sheet)` now PASSes in both engines.
   - **Coarse Switch press:** it now paints, faintly.
4. **The PRM pop is held instant by two independent mechanisms. Remove either one and nothing changes.** My plant P3 removes `engage.css`'s reduce `transform: none` block, and the PRM cells still pass 24/24 in both engines. Plant Y removes the global reduce `transition-duration: 0s` instead, and they still pass 24/24 in both engines. Plant Z removes both, and the cells fail: Chromium prints scale range 0.0566 with 50 frames in flight, and WebKit fails 13 cells. So the gate can fail, and CK-02 closes. The duplicated mechanism is a P-1 note (§5).
5. **CK-22 reopens on two counts.**
   - **No MIGRATION rows.** P-A6 changed consumer-visible paths and records no MIGRATION row for any of them: the commit-light tokens retired, `material.css` and the sortable and dialog-close presses moved from `:active` to `[data-press]`, the presented plate fading under reduce, and the Aurora root's new pointer leg. P-A5's row 4 still describes `--engage-commit-light-*`, which no longer exist.
   - **A second cursor writer in two consumers.** The Aurora root now calls `setCursor` on every `pointermove` (`Aurora.vue`, the candidate). Two consumers already drive it themselves: `keyframes.js/demo/app/hero/HeroAurora.vue:223` and `value.js/demo/app/composables/boot/useAtmosphere.ts:315`, which passes its own strength. value.js derives velocity from consecutive `setCursor` deltas, so every move now gives the field two writes. The grep was read-only, and I ran nothing in either repo.
6. **The hand-off in WebKit fails under load.** E-10's hand-off drop failed in the battery (0.0123 against a bound of 0.0111, load 21.3), passed on r1 (load 24.4), failed both cells on r2 (0.0116 and 0.0144 against 0.0105, load 38.9), and failed one cell on r3 (0.0124 against 0.0108, load 34.2). Chromium passed 8/8 over 4 reads at loads 9-16. The machine never fell below a load of 20 during my WebKit window, so I cannot read it off load. **Recorded as load-sensitive, not scored.** CK-20 is open on item 2 anyway.

## 1 · What I ran, both engines (candidate unless named)

| witness | Chromium P/F/U (load at start) | WebKit P/F/U (load) | failing or unmeasured cells, whose |
|---|---|---|---|
| E-1 | 93/1/2 (15.9) | 93/3/0 (24.5) | `dock` latch (D2). Ambient: Chromium UNMEASURED (the Aurora resolves its `css` substrate); WebKit FAIL, 1.77 against 1.24 drift (not ≥ 2×), and the PRM leg 0.00 |
| E-2 `--commit-arms i,ii` | **164/0/0** (15.7) | **164/0/0** (34.9) | — |
| E-3 | **22/0/0** (12.1) | **22/0/0** (30.0) | — |
| E-4 | 18/0/0 (21.2) | 15/0/4 (38.3) | WebKit Carousel ×4: engine fact (O-103d (4): "headless WebKit has no touch scrolling"), Chromium the gate. Slider carry 6.81-7.20 px (Chromium) and 6.99-7.32 px (WebKit), 5/5 each |
| E-5 | **56/0/0** (17.4) | **56/0/0** (26.7) | — |
| E-6 | 4/2/8 (9.6) | 2/2/8 (24.1) | `s6 present`: S6 RETIRED (O-103d (2)) |
| E-7 | 6/1/0 (8.2) | 6/1/0 (23.5) | `data-held` in `GlassDock.vue`: D2's named clause |
| E-8 | **19/0/0** (7.9) | **19/0/0** (23.0) | — |
| E-9 | 64/18/0 (8.5) | 64/18/0 (20.1) | the 18 `commit-light` cells read a retired form (O-103d (1)). The presented fade under reduce PASSes |
| E-10 | 22/0/17 (16.0) | 21/1/17 (21.3) | WebKit's hand-off drop (§0.6). The 16 rebound-reverse cells read a light that no longer exists. The pointer-in-scroller cell is UNMEASURED in E-10, and my probe drives it (§0.1) |
| E-11 | **7/0/1** (18.0) | **7/0/1** (23.4) | UNMEASURED: `--scale-commit-pop` is not read on the Switch path (it reads `-bit`) |
| E-12 | 100/2/0 (15.1) | 99/2/1 (10.8) | `capsule select press fine` ×2, explained in §3 CK-11. WebKit's `rest layouts` is the engine fact (O-103d (4)) |
| CAP (CK-25) | 18/0, 24 reported (17.4) | 18/0, 24 reported (45.4) | sheets `C-E6/glance/ce6-noveil-coarse-{chromium,webkit}-{fine,coarse}.png` |

**Other seats' probes, unedited, on the candidate.**
- `ca5-probe`: 7/2 in each engine. The 2 failures are the `--engage-commit-light-*` fail-loud cells, a stale expectation now that the tokens are retired.
- `ce5-probe`: 6/6 in each engine, with the 6 pointer cells NOT DRIVEN, its own driver's limit.
- `e6-place`: 4/0 in each engine.
- `a6-probe`: 40/0 in Chromium (load 9.4) and 40/0 in WebKit.
- E-10 hand-off with `slider,slider2`, Chromium: r1-r3 6/0, 6/0, 6/0 (loads 9.0-13.3).
- `slider-press`: Chromium 1/1 with the 1 fail `held false` at +28 ms, held by +53 ms; WebKit passes. P-E6's control (`E6/logs/xp-slider-press-ctl-*`) puts the Chromium lag in the gesture synthesizer. I did not re-run that control, so I do not score the probe. CK-06 rests on E-5 56/0.

**My plants** (`run-ce6.sh buildplant`, `buildplanty`, `buildplantz`; each restores the source byte-identical, sha `f245802ddaaa`):

| plant | row | must fail | Chromium | WebKit |
|---|---|---|---|---|
| P1: the preset chip composes `glass-capsule-hover` | CK-11/14/27 | the configurator's capsule cells | 6 fail (hover ×1.0150, press ×0.9700, latch ×1.0150) | 6 fail (`one-plant-x-webkit-e12-floor-plant.log`, 23/21) |
| P2: `readInputs` silent on clocks | CK-21 | the E-11 clock cells | 4/4 enumerated clocks FAIL "SILENT DEGRADATION" | 4/4 FAIL |
| P4: `stage.ts heard()` returns at once | CK-20 | E-10 place, my clip-pointer | E-10 4/12 · clip-pointer 0/6 | E-10 4/11 |
| P5: the Switch's `engage-chosen` deleted | CK-01 | adoption `switch`, the latch | `adoption switch` FAIL, latch 53/55 | FAIL, 92/4 |
| P3: `engage.css` reduce `transform: none` removed | CK-02 PRM | the PRM cells | **24/0 PASS** (did not fail) | 24/0 PASS |
| Y: global reduce `transition-duration: 0s` removed | CK-02 PRM | the PRM cells | 23/0 PASS (did not fail) | 24/0 PASS |
| Z: P3 + Y | CK-02 PRM | the PRM cells | FAIL, scale range 0.0566, 50 frames in flight | 11/13 FAIL |

## 2 · Every path the pass-5 critics found, driven

| path (§P5-7) | read | result |
|---|---|---|
| capsule composers (C-A5 §0.2) | E-12 `capsule`, both engines, plus plant P1 | 0 non-dock composers; plant fails 6/6 per engine |
| place: inward and centred shrink (C-A5) | E-10 inset/centred, `ca5-probe`, all 4 arms | PASS both engines, all arms; P4 fails |
| place: clipped reveal and conceal (C-E5), keyboard | E-10 `clipstale`, `ce5-probe` | PASS both engines, all arms |
| place: clipped, **pointer** (no driver before) | `ce6-probe clip-pointer` | 6/6 per arm, both engines; P4 0/6 |
| control-bit clocks (C-E5 §0.2) | E-11 census (4 clocks enumerated, no list) and P2 | PASS; P2 fails 4/4 per engine |
| hand-off drop (P-E5, C-E5) | E-10 battery plus 3 Chromium and 3 WebKit `handoff` reads | Chromium 8/8 (loads 9-16); WebKit 4 cells fail in 3 of 4 reads at 21-39 (§0.6) |
| +60 reverse (P-A5, C-A5, C-E5) | `a6-probe reverse`: Chromium r1-r4, WebKit r1 | 1 pop at +60 everywhere (the retarget); step read: Chromium 0/16 (load 9.4), 1/16 (11.9, excess 0.0001), 2/16 (33.9), 3/16 (39.3); WebKit 0/16 |

## 3 · Per CK row, on the candidate

| CK | Chromium | WebKit | ruling |
|---|---|---|---|
| CK-01 | latch 54/55 (`dock`); Sheet press PASS; P5 fails; ambient UNMEASURED (css substrate) | latch 54/55; Sheet press PASS; ambient FAIL 1.77 against 1.24 drift, PRM 0.00 | **OPEN.** `dock` is D2's. The ambient cell can still be built (D3's amplitude, A's PRM leg) |
| CK-02 | E-2 164/0; PRM per face 23/0 (load 9.4); Z fails | E-2 164/0; PRM per face inside 40/0; Z fails | **CLOSED** (arm ii, O-103d (1)) |
| CK-03 | E-2 mount and arrival cells inside 164/0 | same | **CLOSED** |
| CK-04 | E-3 22/0 | 22/0 | **CLOSED** |
| CK-05 | slider 5/5 at 6.81-7.20 px; Carousel PASS; **Sheet**: battery PASS (load 21), then post re-reads s1 FAIL (`sheet fling carries velocity` 0.00 px **and** repeat landing −285/−160/−160, load 34.9), s2 FAIL (−160/−35/−35, load 31.3), s3 same detent but −160 (load 28.3). The same Sheet bytes split on veil-coarse at load **17.4** and on veil-every at 31.0 | slider 5/5 at 6.99-7.32 px; Sheet PASS on the candidate (load 38.3), FAIL on noveil-every (33.4) and veil-every (31.3); Carousel engine fact | **OPEN.** The same drive does not land on the same detent, and on s1 the fling carried nothing. P-E6 saw the split at load 13.7, and I saw it at 17.4, so "NOT-REPRODUCED off load" (F5‴ §2.2) no longer holds. No read below 13 exists. The cell must print the release velocity before the drive's spread can be told from the rule's (F5‴'s H7 item) |
| CK-06 | E-5 56/0 | 56/0 | **CLOSED** |
| CK-07 | S6 RETIRE (O-103d (2)) | same | **CLOSED** |
| CK-08 | E-7 6/1, the D2 clause | same | **CLOSED** |
| CK-09 | E-8 19/0 | 19/0 | **CLOSED** |
| CK-10 | E-9 64/18: the 18 cells read the retired light; presented fade 20-21 frames under reduce, no scale or drift; PRM legibility per face 50-78 % | E-9 64/18 the same; fade 17 frames | **CLOSED** (O-103d (1) supersedes the 18 cells; H7 re-points them) |
| CK-11 | 0 non-dock composers; P1 fails; `select press fine` ×0.9978 | 0; P1 fails; `select press fine` NOT DRIVEN | **CLOSED.** My `select-press` film settles the select cell in both engines. With E-12's own drive, the select **opens on pointerdown and pops**: crest ×1.0199-1.0200 at +104..+165 ms, trough ×0.9974 (`xp-ce6-probe-noveil-coarse-{chromium,webkit}-sel.log`). The 0.0022 E-12 reads is the commit's rebound, not a press rung. The lift and snap live only on `DockControl` (D2), which composes no engagement class |
| CK-12 | no commit light, no figure sized by a witness; `--loupe-k-max: 1.6` carries a geometric reason (`slider/styles.css:391-402`) | same | **CLOSED** |
| CK-13 | E-12 fc-reach PASS | PASS; PRT the engine's limit | **CLOSED** |
| CK-14 | coarse tap ×1.0000 on every composer; E-3 phone held PASS | same | **CLOSED** |
| CK-15 | singleton cells PASS on every hand-off read | same | **CLOSED** |
| CK-16 | restloop PASS, 0.0 layouts/s; the stage loop stops after Escape (0.0 rAF/s) | restloop PASS; the layout counter is the engine-fact cell (O-103d (4)) | **CLOSED** |
| CK-17 | the D5 presses are on the mark. The only non-comment `:active` rules left are the dock's (`material.css:346-349`, `dock/styles/**`) and the dock-only capsule (`glass-capsule.css:128-135`) | the Safari cells read against this WebKit run (O-103d (3)) | **OPEN ON D2:** the dock's `:active` presses name no listener |
| CK-18 | `RELEASE_RULE` consumed by `sortable-list/drag.ts`, `sheet/detents/use.ts`, `useMotionAxis.ts` (tabs) and `useEngage.ts` (slider) | same bytes | **CLOSED** |
| CK-19 | UNMEASURED (css substrate) | FAIL 1.77 against 1.24, PRM 0.00 | **OPEN** (D3's amplitude, A's PRM leg) |
| CK-20 | place family all PASS; hand-off 8/8; **clip-vanish FAIL 2/2** | place all PASS; **clip-vanish FAIL**; hand-off 4 fail cells under load | **OPEN** on clip-vanish, on every arm |
| CK-21 | E-11 7/0 over 4 enumerated clocks; P2 fails | same | **CLOSED** |
| CK-22 | — | — | **OPEN** (§0.5). Static: `logs/ck22-greps.txt` |
| CK-23 | 191 files +4879/−1561 (`src` 148, +3135/−1290) | — | **CLOSED** |
| CK-24 | `static` stamped and read (E-1 passive cells PASS) | same | **CLOSED** |
| CK-25 | §4 | §4 | **OPEN** |
| CK-26 | no lighting layer; no veil element on the candidate (`STAGE_VEIL = false`) | same | **CLOSED** |
| CK-27 | every plant fails its cell except P3 and Y alone (the duplicate, §0.4); `engage.css:14-18`'s claim is now a passing cell | same | **CLOSED** |

## 4 · The gestalt (CK-25), from my own frames: **not iOS-27 grade**

The sheets are `C-E6/glance/ce6-noveil-coarse-{chromium,webkit}-{fine,coarse}.png`. Each claim below rests on the frame named beside it.

- **Reads well:**
  - The fine in-place slider grows ×1.060 with the world crisp and no veil (`frames/…-chromium-fine-light-slider-held.png`).
  - The touch hold is promoted with no veil (`…-coarse-light-slider-held.png`).
  - The sortable lifts with a shadow (`…-coarse-light-sortable-engaged.png`).
  - The accordion's ladder deepens and its region opens (`…-fine-light-accordion-{pressed,committed}.png`).
  - The Switch commit is legible through its fill (`…-fine-light-switch-committed.png`).
  - The WebKit sheets match (`ce6-noveil-coarse-webkit-coarse.png`).
- **The loupe still reads as a switch, not a lens.** In `loupe/ce6-noveil-coarse-{chromium,webkit}-coarse-light-loupe-held.png` the housing is an opaque grey capsule, the magnified fill is a rounded orange pill, and a hard 1 px mark divides it from a grey half. Nothing of the world shows through. In dark (`…-coarse-dark-loupe-sustained.png`) a muddy brown pill sits in a near-black capsule. The bead is smaller than pass 5's, but the toggle reading stands.
- **The committed Button cannot be told from rest.** ×1.021 at +90 ms in `…-fine-light-button-committed.png`, against `…-button-rest.png`.
- **The coarse Switch press barely shows.** In `…-coarse-light-switch-pressed.png` the thumb greys slightly, and in dark (`…-coarse-dark-switch-pressed.png`) no change can be seen.
- **The ambient exemplar is static.** All six columns are identical in both engines (`ambient` rows).
- **The promoted control paints over its card** (`clip/ce6-noveil-coarse-chromium-light-clip-overpaint-70.png`), then vanishes (`…-160.png`).
- **The dark Button's warm halo** is still HEAD's (`…-fine-dark-button-rest.png`). It belongs to the 10.2.0 token wave, not D5.

## 5 · Next-pass defect classes (no CK row added; the score is unchanged)

1. **A redundant PRM guarantee.** Two mechanisms hold the pop instant under reduce: `engage.css:237-241` and the global fallback (`a11y-overrides.css:46-52`). Either alone keeps every PRM cell green (P3 24/24, Y 24/24 per engine), and both are needed only for the gate to fail (Z). One of them is redundant (P-1). The owner of the fix is A's part.
2. **The harness reads the select's commit as its press.** E-12 `capsule select press fine` reads the open-on-pointerdown pop in Chromium (×0.9978) and is NOT DRIVEN in WebKit, while my film reads crest ×1.020 and trough ×0.9974 in both engines. Owner: H7.
3. **Stale instruments.** `ca5-probe`'s `--engage-commit-light-*` cells, E-9's 18 commit-light cells and E-10's 16 rebound-reverse cells all read the retired light. Owner: H7.
4. **The pointer-in-scroller cell now has a driver.** It is `ce6-probe clip-pointer`, which clips by a spacer after the press. It passes 6/6 per arm in both engines, and P4 fails it. Owner: H7, to bring it into E-10.
5. **The Sheet landing needs its velocity printed.** Without it, a spread from the drive cannot be told from one in the rule (CK-05). One read carried 0.00 px (s1). Owner: H7, then the floor.
6. **The engaged stage runs a frame loop while idle.** A keyboard-engaged slider left idle registers 98-128 rAF callbacks/s at 0.0 layouts/s and 0.0 style recalcs/s (Chromium and WebKit). The loop stops on release. REPORT only: the control is engaged, not at rest.
7. **One arm's carry dipped.** veil-every's slider carry fell to 3.85 px on 1 of 5 reads (load 33.4). The candidate and the other arms passed every read.
8. **Consumers outside the D5 bytes.**
   - `keyframes.js/demo/components/instrument/pane/channel-controls/EasingField.vue:40` composes `glass-capsule-hover` outside any dock, so the lift and snap are still live for that consumer. When D2 retires the rule, it owes a MIGRATION row.
   - `tap-squish` survives in chicago ×3 and speedtest ×4 (tracked). The PORTFOLIO placement still holds: each consumer updates in its own tranche.

## 6 · The other three E arms (Q-3), beside the candidate

| witness | veil-coarse C / W | noveil-every C / W | veil-every C / W |
|---|---|---|---|
| E-1 | 93/1/2 · 93/3/0 | 93/1/2 · 93/3/0 | 93/1/2 · 93/3/0 |
| E-3 | 22/0 · 22/0 | 22/0 · 22/0 | 22/0 · 22/0 |
| E-4 | 17/1 (Sheet split, load 17.4) · 15/0/4 | 18/0 · 14/1/4 (Sheet split, load 33.4) | 16/2 (carry 3.85, Sheet split; load 33.4) · 14/1/4 (Sheet split, load 31.3) |
| E-10 | 23/0/17 · 21/2/17 (load 41.7) | 22/0/17 · 22/0/17 | 23/0/17 · 23/0/17 |
| E-12 | 100/2 · 99/2/1 | 101/1 · 99/2/1 | 101/1 · 99/2/1 |
| ca5 / ce5 (Chromium) | 7/2 · 6/6 ND | 7/2 · 6/6 ND | 7/2 · 6/6 ND |
| ce6 clip-pointer and page-scroll | 7/0 · 7/0 | 7/0 · 7/0 | 7/0 · 7/0 |
| ce6 clip-vanish (Chromium) | FAIL | FAIL | FAIL |

The arms move no row's verdict. Every arm promotes the keyboard, so clip-vanish fails on all four. The candidate's noveil frames remain the deft ones under O-87.

## 7 · Process

- **Machine law.**
  - Every build, browser run and probe went through `~/.claude/guard/guarded`, never `--light`.
  - All WebKit ran in one `--exclusive webkit` acquisition (wait 2.7 min, 79.5 min held, exit 0).
  - One heavy run at a time. One browser per battery with a context per cell.
  - No GPU arguments. The films took no mid-film screenshot. `clip-vanish` takes one still per step, not a film.
  - The kernel zone never gated a run.
- **Fences.**
  - Writes in the checkout are only under `docs/tranches/BL/design/engagement/pass-6/C-E6*`.
  - The only git write in the checkout was `git worktree add` / `remove` for my worktree. Inside my own worktree I ran `git add -N` for the numstat.
  - Sibling repos were grepped read-only, and nothing was built or run there.
  - Nothing under `~/.claude` was read.
- **Slips, mine.**
  - I edited `phase-chromium.txt` with `sed -i` while the chain was reading it. The chain kept the old inode, so the edited line ran in its original form. The cells it dropped ran again in `phase-chromium-extra.txt` and `phase-chromium-post.txt`.
  - Four of my wait loops grepped for a string the chain log never prints. They idled until I killed them before return; they started no runs.
  - The first `select-press` film missed the trigger (no `scrollIntoView`) and read nothing. The fixed film is the one cited (`-sel` logs).
- **Cleanup.**
  - `git worktree remove --force .claude/worktrees/bl/D5/p6/C-E6/wt`, then `out/` and the seat directory removed. `.claude/worktrees/bl/D5/p6/C-E6/` no longer exists.
  - No C-E6 process is running (`pgrep -fl C-E6`: 0).
