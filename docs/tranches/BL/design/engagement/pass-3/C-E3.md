# D5 pass 3 · C-E3 · critique of route E (the engaged stage on F5′ + P-A3-light)

| field | value |
|---|---|
| seat | D5 pass 3, **C-E3**, the fresh adversarial critic of route E (`../REGISTRY.md` §P2-8.3 wave 3). I authored no D5 pass-2 or pass-3 seat |
| model | `claude-opus-5-5`, asserted from my own system identity |
| base | HEAD `fa62f6a5b` + `P-E3-veil.patch`. `git diff --stat 6fdcd6b28 HEAD -- src tests package.json demo vite.config.ts` is empty, so this is P-E3's source. The noveil arm is the one `KEYBOARD_VEIL` line, set by `sed` in the worktree for its builds (the line read back in `logs/build-noveil.log`, then reset to `true`). Worktree `.claude/worktrees/bl/D5/p3/C-E3/wt`, created fresh, then removed with `git worktree remove --force`. `…/C-E3/` is removed too |
| engines | Chromium 149 and Playwright WebKit 26.5, headless shell, no GPU args, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| harness | H3's, read from the checkout, unedited. Every battery ran on the harness's own app (scene app sha1 `3fb393c67b89` in every build log). The probe app (`E3/probe/App.vue`) is P-E3's fork; its cells are probes, not scoring reads of a witness |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). `../../../audit/INBOUND.md` (mtime 2026-10-16 06:40) holds no ruling on Q-1..Q-5 at this seat's start (read 2026-10-17 23:43). O-87 binds |
| run | 2026-10-17 23:43 → 2026-10-18 01:07. WebKit lock (`guarded --exclusive webkit`): part a queued 23:44:05, admitted 00:01:55 (18 min); part b queued 00:35:05, admitted 00:52:06 (17 min); part c queued 00:58:53, admitted 01:05:23 (7 min). No cell was left unread for want of the lock |
| prior instances | The first (20:34-21:29) and second (21:5x-22:10) instances' outputs are in `C-E3/prior-instance/` and `C-E3/prior-instance/second/`. I reused the second's scripts and probe and cite **none** of either instance's numbers. Every number below comes from a command this seat ran |
| records | `C-E3/run-ce3.sh` (stages; I added `builds2`, the `p-mod` plant), `chain-ce3.sh`, `ch-driver.sh` (Chromium queue), `wk-ce3.sh` + `wk-c.sh` (WebKit parts a, b, c), `ck22-greps.sh`, `tab.py` (tabulator), `probe/ce3-probe.mjs` (the second instance's adversarial cells), `probe/ce3-scroll.mjs` and `probe/ce3-rbutton.mjs` (new, this seat), `builds.out`, `builds2.out`, `logs/`, `json/{veil,noveil,…}/`, `shots/{veil,noveil}/`, `glance/` (sheets, 864 frames, three composite sheets of mine named `ce3-*.png`) |

## 0 · In brief

**Score: 13 of 27 rows closed by my own replay in both engines (48 %).** Closed: CK-03, CK-04, CK-08, CK-09, CK-11, CK-12, CK-13, CK-15, CK-20, CK-21, CK-23, CK-24, CK-26. Open: CK-01, 02, 05, 06, 07, 10, 14, 16, 17, 18, 19, 22, 25, 27. Of the open rows, five cannot close by building (CK-02 under Q-5 (a), CK-07, CK-17, and the Sheet cells of CK-05/CK-18). This is not a clean pass. **The gestalt is not iOS-27 grade** (§3).

1. **Route E's own centre holds, replayed in both engines and both keyboard arms.** E-10 grades position: on Tab A → B and Shift+Tab B → A the outgoing and incoming centre moves are 0.0 px, the veil holds 1.00 across the hand-off, and Escape and the re-render landing pass (Chromium 5/0 veil, 4/0 noveil; WebKit the same). My shared-anchor plant `p-anchor` fails both hand-off cells with **68.0 px** centre moves in both engines. My A → B → A cell, which re-engages A inside its own exit 50 and 120 ms after leaving it, reads 0.0 px moves and 0.0 px gaps and ends with one footprint in both engines. Twelve Tab/Tab/Escape cycles leave no footprint, promoted host, inline anchor or open veil.
2. **CK-04 closes in both engines on both arms.** E-3 is 22/22 in all four cells. My five plants bite in both engines, each failing exactly the cells it targets: `p-char` (a printable key engages), `p-script` (script focus engages), `p-tabhand` (keyboard writes `data-held`: `[data-held] 2`, `grabbing`), and **`p-mod`, which I added because no seat had planted it** (a modifier alone engages: Shift, Meta, Control and Alt each ×1.060).
3. **CK-22 stays open on two measured counterexamples.**
   - **E-M1 misstates the release path.** A consumer's own inline `position-anchor` on the Slider host is overwritten while engaged, as E-M1 says. It is also **removed after release** (`stage.ts` `hide`: `removeProperty("position-anchor")`). `consumer anchor restored` FAILs in both engines and both arms: "after release +1.2 s (removed)".
   - **A wheel over an engaged control scrolls the page, not the scroller it sits in** (`ce3-scroll`, both engines). In a 64 px `overflow: auto` box, a 30 px wheel with the pointer on the promoted control moves the box +0 and the page +30. Off the control it moves the box +30 and the page +0. No MIGRATION row names this. The control is `position: fixed` in the top layer, so the wheel chains to the viewport.
4. **CK-06 reproduces in Chromium (2 of 5 reads), not as a load artefact.** On E-5 `tabs` and `accordion sustain dark`, the light falls from 1.732 at +200 ms to 1.549 at +1200 ms (×0.89, bound ≥ ×0.95), with identical figures both times. The failing reads started at load 9.9 and **6.9**; the three passing reads at 8.6, 5.8 and 8.0. WebKit reads 56/56 once. This is §P2-7 class 14, still unresolved.
5. **§P2-7 class 12 is now measured: in Playwright WebKit a secondary-button press leaves the slider engaged (3 of 3).** WebKit delivers `pointerdown` (button 2) and `contextmenu` but no `pointerup`. `useHold` acquires on any button (`hold.ts` `onPress` has no button filter), so at +3 s the slider is promoted, `data-held` is on two elements and the veil is open at 1.00. It stays that way after a primary click elsewhere. Chromium delivers `pointerup` and releases 3 of 3. This fits no CK row cleanly, so it is a next-pass class (§4). Real Safari is UNMEASURED.
6. **The `scroll pin` counterexample the second instance's probe reads (30.0 px in Chromium) is a read-timing artefact, not a painted detachment.** `ce3-scroll` separates the reads: the 30 px gap appears in the synchronous read and in `requestAnimationFrame` callbacks before the frame's anchor update. Post-frame reads are 0.0 px in 2 of 4 Chromium runs. In the other 2, one post-frame read in four steps showed 30.0 px, a one-frame lag under a **script** scroll. The user's path, a wheel, reads 0.0 px at every point in both engines. WebKit reads 0.0 px post-frame on both drives. I record the one-frame script-scroll lag as a next-pass class (§4), not a CK-20 counterexample: a scroll is not an engagement transition.
7. **CK-14, CK-16, CK-19, CK-27 and the A-side rows are reproduced on the composition** (§2). CK-14: under forced colours the coarse dock trigger's `::after` slop computes `display: none`, 0 × 0, and a tap 8 px above the face misses (C-A3's `fcslop`, 6 FAIL per engine on my build). CK-16: Skeleton and StatusDot keep their one animation running 3000 px off-screen in both engines.
8. **Records defect, P-3: P-E3.md's header swaps the two patch hashes.** `shasum` gives `P-E3-veil.patch` `3d407e1c8…` (it carries `KEYBOARD_VEIL = true`, patch line 4196) and `P-E3-noveil.patch` `f7f16a447…`. The header gives them the other way round.

## 1 · What I ran

Loads are the 1/5/15-minute averages each witness or probe prints at its start, unless marked "end".

| run | Chromium (load) | WebKit (load) | record |
|---|---|---|---|
| builds: `veil`, `noveil`, `probe-veil`, `probe-noveil`, plants `p-anchor`, `p-char`, `p-script`, `p-tabhand`, `p-mod`, `probe-p-scrubveil`, `probe-p-vis` | every build exit 0; every plant applied and restored byte-identical | — | `builds.out`, `builds2.out`, `logs/build-*.log` |
| veil E-1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 | 92/4 (19.9) · 146/18 +16R (17.4) · 22/0 (14.4) · 14/0/4U (7.4) · 54/2 (9.9) · 4/2/8U (18.0) · 6/1 (15.4) · 19/0 (8.6) · 73/5 (8.0) · 5/0 +1R (13.2) · 3/0/1U (14.8) | 92/4 (17.4) · 143/21 +16R (15.1) · 22/0 (7.5) · 11/0/8U (6.8) · 56/0 (8.1) · 2/2/8U (7.5) · 6/1 (6.4) · 19/0 (7.4) · 72/6 (7.5) · 5/0 +1R (6.7) · 3/0/1U (7.6) | `logs/veil-<engine>-E-n.log`, `json/veil/` |
| noveil E-3, E-10, E-11 | 22/0 (13.2) · 4/0 +2R (10.9) · 3/0/1U (9.4) | 22/0 (7.7) · 4/0 +2R (6.4) · 3/0/1U (5.9) | `logs/noveil-*`, `json/noveil/` |
| E-5 Chromium re-reads | r2 56/0 (8.6), r3 56/0 (5.8), r4 **54/2 (6.9)**, r5 56/0 (8.0) | — | `logs/veil-chromium-E-5-r{1..5}.log` |
| plants on E-3 / E-10 | p-anchor E-10 3/2 (8.5); p-char 20/2 (8.2); p-script 20/2 (6.8); p-tabhand 20/2 (6.7); p-mod 18/4 (6.9) | p-anchor 3/2 (6.5); p-char 20/2 (9.1); p-script 20/2 (7.6); p-tabhand 20/2 (11.0); p-mod 18/4 (15.5) | `logs/p-*-<engine>-E-n.log` |
| P-E3's probe `e3-probe` on veil, noveil and the two plants | veil 19/0, noveil 19/0; p-scrubveil 18/1; p-vis 17/2 (end loads 5.9-9.1) | veil 17/0 +1U, noveil 17/0 +1U; p-scrubveil 16/1; p-vis 15/2 (end 7.4-19.9); veil with shots 15/2 (end 16.6) | `logs/probe-*.log`, `shots/` |
| `ce3-probe` (adversarial) veil, noveil | 8/4 +1R each (end 11.0, 15.5) | 7/3 +3 other each (end 9.9, 18.0) | `logs/ce3-probe-*.log` |
| `ce3-scroll` (new) | veil four runs, noveil one (7.1-8.2) | veil 5/0 +3R, noveil 5/0 +3R (end 16.5, 24.7) | `logs/ce3-scroll-*.log` |
| `ce3-rbutton` (new) | 0 of 3 stuck (7.0) | **3 of 3 stuck** (end 25.4) | `logs/ce3-rbutton-*.log` |
| P-A3's `a3-probe` and C-A3's `ca3-probe` replayed on my veil build | a3 57/1 +9R (end 12.3); fcslop 6 PASS (off), **6 FAIL (forced colours on)** | a3 46/1 +11U +9R (end 17.8); fcslop 6 / **6 FAIL** | `logs/a3probe-veil-*.log`, `logs/ca3probe-veil-*.log` |
| capture CK-25, veil and noveil | CAP 12/0 +24R each (7.2, 7.8) | CAP 12/0 +24R each (13.9, 18.0) | `glance/{veil,noveil}-{chromium,webkit}-{fine,coarse}.png`, `glance/frames/` |
| unit `engage-stage.test.ts` (vitest `--maxWorkers=2`) | clean 15/15; plant pitch-is-slop: 1 failed (the PITCH case); plant arm-on-host: 1 failed (the step-button surface case); source restored | — | `logs/unit-*.log` |
| CK-22 consumer greps, nine siblings, read only | 2026-10-17 23:45:16 | — | `logs/ck22-greps.txt` |
| cost | `git add -N` on the patch paths in the worktree: **175 files, +3599/−1458**; `stage.ts` 316, `settle.ts` 60, `engage-stage.css` 74 lines | — | session commands |

## 2 · Per CK row

**CLOSED** means closed by my own replay in both engines, or by source reads and unit plants for a row that has no browser leg. A row's count is pass/fail(/unmeasured).

| row | Chromium | WebKit | reading | status |
|---|---|---|---|---|
| CK-01 | E-1 92/4 | 92/4 | latch 54/55, `dock` unproven (D2's); the Sheet's PRM press-light (in flow, O-74c G-1); the ambient (Aurora) pair. `gallery rendered` PASS in both | OPEN (inherited: D2, O-74c, ambient) |
| CK-02 | E-2 146/18 | 143/21 | Switch light rise 0.0060-0.0064, Radio light 0.0024-0.0026, Radio dark 0.0000, accordion light 0.0032-0.0034 (bound 0.01). WebKit adds accordion dark tap and `arrival·late` | OPEN (OWNER, Q-5) |
| CK-03 | mount 18/18; arrival `pre`, `own`, `ownflush` 14/0 +4R each | the same | committed mount quiet; no in-task arrival commits, the style-read control included. `arrival·late` fails only on the CK-02 light bound (switch, radio, accordion), so it is scored there | **CLOSED** |
| CK-04 | E-3 veil 22/0, noveil 22/0; the four plant classes FAIL their cells | the same | desk pointer and keyboard ×1.060 (360.0 → 381.6 px); `[data-held] 0`, no `grabbing`; afterdrag ×1.000; phone block 24.0 → 25.4 px inside 16..374; PRM ×1.000 with a light leg. Plants: §0 item 2 | **CLOSED** |
| CK-05 | E-4 14/0/4U | 11/0/8U | slider carry 6.73 px (Chromium) and 7.37 px (WebKit); sortable release 20.1 and 21.4 px against 62.0; tabs drag 14.6 and 18.4 px. The Sheet is UNMEASURED in both (O-74c G-1); the Carousel is UNMEASURED in WebKit (no touch scrolling) | OPEN (Sheet, O-74c) |
| CK-06 | E-5 2 of 5 reads FAIL (§0 item 4) | 56/0, one read | §P2-7 class 14 reproduces at load 6.9 | OPEN |
| CK-07 | E-6 4/2/8U | 2/2/8U | no idle animation (Q-2 (b)) | OPEN (OWNER, Q-2) |
| CK-08 | E-7 6/1 | 6/1 | `data-engaged`: `stage.ts` only; `data-press`: `press.ts`; `data-commit`: `useEngage.ts`; `data-held`: `useEngage.ts` and `GlassDock.vue:346,378`, which is D2's and named in P-E3's charter (the row's named-attribute clause). My static grep confirms the same writer set | **CLOSED** (named clause) |
| CK-09 | E-8 19/0 | 19/0 | | **CLOSED** |
| CK-10 | E-9 73/5 | 72/6 | `commit-light` under reduce: Switch light 0.0061/0.0018, Radio light 0.0033/0.0003, tabs 0.0000 (no light seat), accordion light 0.0034/0.0024 (+ dark 0.0092 in WebKit) | OPEN (A's) |
| CK-11 | — | — | `.tap-squish` and `.interactive-item` appear in `src` only in three retirement comments; no selector, alias or `scale: none` override | **CLOSED** (source) |
| CK-12 | — | — | `HOLD_SLOP_PX` (8) is the activation slop only (`useEngage.ts:281`); the pitch is `Math.trunc(dx / pitch)` on `--scrub-pitch`. **My ruling on the pitch: `1ch` is admissible.** It is a unit with its own reason (one glyph cell of the value), not a magnitude fitted to a sampler. The unit plant that sets the pitch to the slop fails the PITCH case, so the split is real. `RELEASE_RULE.windowMs` 100 is its own row with a cited reason (`release.ts:19-28`); the Switch thumb rides `--spring-dock` (`switch/styles.css:49`); `--scale-engage: 1.06` is the ladder's engaged row (`scale-paper.css:33`, `engageLadder.ts:200`). The geom crest is P-A3-geom's, not on this composition | **CLOSED** (source + unit plant) |
| CK-13 | a3-probe CK-13 22/22 (forced colours 11, reduced transparency 11); e3-probe: veil `display: none`, held slider promoted | forced colours 11/11; reduced transparency 11 UNMEASURED (the engine applies neither query, which the row marks as its limit) | each recipe, the stage, its veil and the `[data-press]` fill read under emulation. The forced-colours dock-slop loss is scored at CK-14, the row it breaks | **CLOSED** (WebKit PRT the engine's limit) |
| CK-14 | a3 `ck14` 2/2; **`fcslop` forced colours 6 FAIL** (control 6 PASS) | the same | under forced colours the coarse dock trigger's slop is `display: none`, 0.0 × 0.0 px, and a tap 8 px above the face misses. The NumberField coarse scrub passes (held, ×1.060, 50 → 57) | OPEN |
| CK-15 | E-10 one engaged at every hand-off end; A → B → A ends with A alone, one footprint | the same | | **CLOSED** |
| CK-16 | Skeleton rest 0.0 layouts/s, StatusDot 0.0 layouts/s (120.5 style recalcs/s); **off-screen both still running** (currentTime +1016 and +1008 ms over 1 s) | layouts/s UNMEASURED (no counter); **off-screen both running** (+1004, +1000 ms) | the row's "stops off-screen" fails in both engines | OPEN |
| CK-17 | — | — | every Safari cell UNMEASURED (owner's safaridriver checkbox) | OPEN (OWNER) |
| CK-18 | the slider, sortable and tabs consume `RELEASE_RULE` (E-4 above) | same | the Sheet UNMEASURED | OPEN (O-74c) |
| CK-19 | CAP 12/0 per arm; `gallery rendered` PASS | the same | **the `ambient` exemplar does not do what the row defines it to do**: E-1 reads a pointer move at 0.00 levels against 0.00 (Chromium) and 1.18 against 1.13 drift (WebKit), and its six frames per row are identical in my capture. H3's self-test green is H3's; I did not replay it | OPEN |
| CK-20 | E-10 veil 5/0, noveil 4/0; my A → B → A, cycle and wheel-scroll cells 0.0 px; E-4 continuity within its bounds | the same; e3-probe pin cells pass without the screenshot and fail only with it (fwd 7.5 px, rev 7.4 px), as P-E3 §3.2 said | the plant `p-anchor` fails both engines at 68.0 px, so the cell can fail. The script-scroll one-frame lag is §4's | **CLOSED** |
| CK-21 | E-11 3/0/1U both arms; a3 CK-21 33/34; `scrub bad pitch` 1 error, value unmoved | E-11 3/0/1U; a3 33/34; `scrub bad pitch` PASS | the one a3 FAIL is the tabs clock: it raises one `console.error`, but the error names the resolved `translate` clock rather than `--tab-indicator-duration`. The row asks for one error and gets it. The `--scale-commit-pop` plant is UNMEASURED because the light path never reads it | **CLOSED** |
| CK-22 | `consumer anchor restored` FAIL; wheel chains to the page | the same | §0 item 3. The greps reproduce P-E3's counts. No sibling names `--engage-footprint`, `--scrub-pitch`, `.glass-focus-veil` or `data-engaged`. keyframes.js's `anchor-name: --stage` is its own and does not collide. Every global `[popover]`/`:popover-open` hit is keyframes.js's scoped `.menu:popover-open` compiler test. sci-report's `number-field__input` hit is in a build artefact (`dist-ob11/`), not a source | OPEN |
| CK-23 | — | — | 175 files +3599/−1458, matching P-E3 §2 | **CLOSED** |
| CK-24 | E-1 `static-inert` 19/0 | 19/0 | `static` stamped and read at runtime under Q-1 (c) | **CLOSED** |
| CK-25 | CAP veil and noveil | the same | §3: **not iOS-27 grade** | OPEN |
| CK-26 | — | — | E adds no lighting layer; no `plus-lighter` in `chip/` or `utilities/engage.css`; the veil reads `var(--glass-focus-veil-blur)` → `var(--glass-blur-floating-radius)` (`tokens/glass.css:112`), a token, not a restated literal. The dark Button's warm halo is identical at HEAD (`glance/ce3-button-dark-head-vs-veil.png`), so the composition did not add it | **CLOSED** |
| CK-27 | — | — | every cell this seat planted fails (p-anchor, p-char, p-script, p-tabhand, p-mod, p-scrubveil, p-vis, both unit plants). **One gate still cannot fail for what it guards:** P-A3's CK-13 forced-colours cell passes 22/22 on this build while the same arm removes the dock trigger's slop (`fcslop` 6 FAIL). The second gate shortfall is P-E3's `consumer anchor` cell: it reads only capture during the hand-off, so it passed a MIGRATION row (E-M1) that misstates the release path | OPEN |

## 3 · CK-25 · the gestalt, read from my frames

**Not iOS-27 grade.** Route E's own increments are deft. The composition around them is not, and the veil arm fails O-87.

- **What is iOS-27 grade.** The noveil keyboard engagement is: the world stays crisp, and the control grows ×1.060 inside a thin ring (`glance/frames/noveil-chromium-fine-light-slider-engaged.png`; dark `noveil-chromium-fine-dark-slider-engaged.png`). The scrub is the same, with the field grown and ringed and the paragraph around it crisp (`shots/veil/veil-chromium-fine-light-numfield-held.png`, in `glance/ce3-scrub-handoff.png`). The hand-off frames keep each slider on its own footprint (`shots/veil/veil-chromium-light-keyboard-handoff-90ms.png`).
- **The veil arm fails O-87 ("slightly less blur").** On a pointer hold the whole world goes to a milky grey (`glance/frames/veil-chromium-fine-light-slider-held.png`). In dark it goes to a muddy brown in which the slider's own fill dulls (`veil-chromium-fine-dark-slider-held.png`). In the hand-off frames the pool reads as a grey smudge around the control rather than glass receding. The veil still computes `blur(20px) saturate(1.5)` (`ce3-probe` `modal veil` line, both engines), because the 10.2.0 token wave has not landed. Composite: `glance/ce3-held-set.png`.
- **The disclosed press is still an opaque grey slab across the 320 px row**, on fine and coarse, in both engines (`glance/frames/veil-chromium-fine-light-accordion-pressed.png`; `veil-webkit-coarse-light-accordion-{held,engaged}.png`). That is A's recipe, unchanged from pass 2.
- **The coarse Switch press shows nothing.** Pressed, held and engaged are pixel-identical to rest at ×1.000 in both engines (`veil-chromium-coarse-light-switch-pressed.png`, `veil-webkit-coarse-light-switch-pressed.png`). Only the commit's fill change is visible, and its light arm is below its bound (CK-02). D-2 ("every component always displays engagement") is not met on a touch press of the Switch.
- **The dark Button and the presented rows keep a warm coloured halo** (`veil-chromium-coarse-dark-button-rest.png`). It is identical at HEAD (`glance/ce3-button-dark-head-vs-veil.png`), so it is not this route's, but O-87 strips exactly this ("coloured drop-glow"), and the glance set shows it on every dark Button frame.
- Playwright WebKit paints no `backdrop-filter`, so its veil frames show the dim without the blur (`veil-webkit-coarse.png`). Real Safari UNMEASURED.

## 4 · Next-pass defect classes (recorded; no CK row added, score unchanged)

1. **§P2-7 class 12 measured: a secondary-button press sticks in Playwright WebKit** (3 of 3; §0 item 5). `useHold` acquires on any button while the scrub filters `button !== 0`. The cure is in the door's hand (a primary-button filter, or release on `contextmenu`), and real Safari's behaviour after a context menu is UNMEASURED.
2. **The promoted control's clip escape is engine-split.** With its footprint scrolled wholly out of a 64 px scroller, Chromium's `position-visibility: anchors-visible` takes the control out of hit-testing. Playwright WebKit leaves it hit-testable at y 24.7 px, outside the box's [170.7, 234.7]: an engaged control floats over its scroller's neighbours (`ce3-scroll` `footprint clipped`). P-E2's MIGRATION row 1 states that the control escapes ancestor clipping, but not that the footprint can leave the viewport while the control stays.
3. **A one-frame lag on a script scroll (Chromium).** 2 of 4 runs read one post-frame gap of 30.0 px across four `scrollBy` steps; the wheel path reads 0.0 px every time, and WebKit reads 0.0 px. Not an engagement transition (§0 item 6).
4. **A probe cell that cannot fail for its own MIGRATION claim** (`e3-probe` `consumer anchor`). It is scored at CK-27; the class covers probe cells whose name promises a path they do not drive to its end.
5. **The records hash swap** in P-E3.md's header (§0 item 8).

## 5 · What P-E3 claimed that I could not reproduce, or reproduced differently

- §3.2's NOT-REPRODUCED for the WebKit pin cells **holds**. Without the mid-film screenshot `handoff pin fwd/rev` pass in WebKit. With it they fail at 4.5-7.5 px with a 0.0 px gap.
- §3.3 CK-06 "read; INHERITED": I read 2 of 5 Chromium fails. P-E3 read one green.
- §4 E-M1 is wrong about the release path (§0 item 3).
- §3.1 CK-25 "the scrub raises no veil" **holds** in both engines; the `p-scrubveil` plant fails it.
- §0 item 6: the noveil plate is `visibility: hidden` on a noveil Tab in both engines; the `p-vis` plant fails it.

## 6 · Fences kept

- No tracked source changed in the checkout, and no git write ran there. `git apply`, `git add -N` and `git reset` ran only in my worktree's own index.
- Writes in the checkout went only to `docs/tranches/BL/design/engagement/pass-3/C-E3*`. The second instance's tracked outputs moved under `C-E3/prior-instance/second/`.
- Sibling repos were read only (grep), and value.js was not built or run.
- No `~/.claude` read; the guard ran as a binary only.
- Every build, test and browser run went through `guarded`. Every WebKit run was inside `guarded --exclusive webkit`, queued (three acquisitions), never skipped. Never `--light` for a browser run (only for vitest). One browser at a time under the D5 harness lock, headless shell, no GPU args, a context per cell, everything closed in `finally`.
- No zone refusal occurred.
- The worktree was removed with `git worktree remove --force`, and `…/C-E3/` is gone. Nothing is left running.
- One stray empty `/tmp/x` was created by a command of mine and removed at once.
