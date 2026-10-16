# C-CP: D5 pass 2, critic of CP (the commit-path bake-off)

| field | value |
|---|---|
| seat | C-CP, the fresh adversarial critic of `CP` (REGISTRY §P1-9.2 wave 3). Authored nothing in D5 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `373d073e2`. `git diff --stat v10.1.0 HEAD -- src` prints nothing. Patch hashes match CP's header: `F5.patch` `c557d6d50fe6`, `CP-css.patch` `1668c0b53911`, `CP-waapi.patch` `0d26fe033a30`; the side arm `CP/css-prm-over-css.patch` is `6c158b084dc8` |
| worktree | `.claude/worktrees/bl/D5/p2/C-CP/wt` (detached at HEAD, `node_modules` symlinked; `tests-visual/node_modules` does not exist in the main checkout, so nothing to link). Each patch was applied, built and reversed with `git apply` / `git apply -R` (`C-CP/logs/build.log`), so the tracked tree ended clean. The three scene-app builds (`css`, `waapi`, `css-prm`) live under `wt/.cpc-out`. Per-build `src` snapshots for E-7's static arm live under `wt/.trees/{css,waapi}`. Everything was removed with `git worktree remove --force` before return |
| engines | Chromium 149.0.7827.55 measured. **Playwright WebKit 26.5: UNMEASURED.** My WebKit chain (`C-CP/chain.sh webkit`, `chain2.sh webkit`) queued for the machine-wide `--exclusive webkit` slot from 14:04:51 and was never admitted (§6). Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| guard | every build, probe and battery ran through `~/.claude/guard/guarded --light`. Chromium runs were serialized by the harness lock. WebKit runs were queued with `--exclusive webkit` |
| load | 1-minute load 6-34 across the session. Every cell line in `C-CP/logs/` carries its own load |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). No owner ruling exists, so CK-02 admits arms i and iii. Both builds play a light commit (arm iii) |
| fences | no tracked-source edit and no git write in the main checkout. Writes only under `docs/tranches/BL/design/engagement/` (this file and `pass-2/C-CP/`). Sibling repositories were grepped read-only. No browser MCP |
| artifacts | `pass-2/C-CP/`: `chain.sh`, `chain2.sh`, `chain3.sh`; `probe/cc.mjs` (my independent re-read of cells 1, 3, 4 and an A→B→A cell, with two plants), `probe/arrival.mjs`, `probe/coarse-commit.mjs`, `probe/fc.mjs`, `probe/easing-click.mjs`; `logs/`, `json/`, `glance/` |

## 0 · In brief

**Score: 1 of 27 rows closed on each build (A · CSS 1/27, B · WAAPI 1/27). Closed: CK-23.** Three more rows are clean in Chromium on both builds (CK-09, CK-14, CK-15). They stay open because their WebKit cells are UNMEASURED: the machine-wide WebKit slot never admitted my runs. Every other row is open on a replayed counterexample, an unread surface, or the owner.

**The decision table holds, and on cell 1 it is sharper than CP reported. B is not RETIRED.** The charter retires B only if it loses all four cells. B loses cells 1 and 3, ties cell 2, and wins cell 4 as built. Cell 4 becomes a tie once A carries CP's 23-line authorization row.

1. **Cell 1, second commit during the light: A.** I re-read the cell on a channel CP did not use: the light seat's own computed alpha (opacity × background alpha, `probe/cc.mjs`), which also reads the accordion that CP could not.
   - **B:** the light cuts to rest at the second edge (cut 1.00) in 36 of 36 films, at both 45 and 100 ms, in both themes, on all three members. At 45 ms the one-frame drop is 0.073-0.091 against the lone commit's own 0.013-0.016, so 18/18 FAIL. At 100 ms it is 0.016-0.031, so 13/18 FAIL. The accordion fails 6/6 at 100 ms. CP called the 100 ms cell NOT-REPRODUCED; on this channel it reproduces.
   - **A:** 31/36 PASS, cut −0.50 to 0.38. The second commit is merged, not answered: its rise is 0.01-0.50 of a lone commit's at 45 ms. Each of A's five FAILs is a single cell that did not recur in the same cell on another rep. Each exceeds its bound by at most two quanta of the read's 1/255 alpha resolution, and two of them come from a smaller reference drop, not a larger one. That is NOT-REPRODUCED.
   - **The detector bites.** Plant `cut` cancels every animation at the second edge of the CSS build: FAIL 6/6, cut 1.00 (`logs/chain-chromium.log`, load 10-12).
2. **Cell 2, script press composed with the commit: tie.** I replayed CP's own probe in Chromium: PASS 4/4 on each build. The re-press drop is within 0.0006 between builds.
3. **Cell 3, commit before hydration: A.**
   - A: PAINTS 18/18 at 0.97-1.03× the in-app light. B: SILENT 18/18 at 0.00×. This includes the light-theme accordion that CP's WebKit read could not grade.
   - The cell is not vacuous: plant `strip` removes the clone's `engage-*` classes, and A reads SILENT 6/6.
4. **Cell 4, reduce: B as built; a tie with A's authorization row.**
   - A: the seat's light stays at 0.0000 on 18/18. B: 0.090-0.093 on 18/18. `css-prm` (A plus the 23-line row): 0.090-0.093 on 12/12.
   - The cause is CP's: `a11y-overrides.css` zeroes every transition and reaches no Web Animation.
5. **Two defects the four cells do not name, one per path:**
   - **B lights a commit that never happened.** Write the state A→B→A in one task and B plays a full light (peak 0.090-0.093, two animations) in 12/12 cells. A stays QUIET in 12/12. The door's `MutationObserver` fires when *any* record's `oldValue` differs from the current value, and the second record's `oldValue` is B. Pass 1's door had 0 for A→B→A (§P1-2 D5-B, "What held"). This is a CK-02 counterexample: the precondition requires a commit that happened.
   - **A's mount safety breaks on one style read.** A model set in the mount's own task, after its render, lights the accordion in 6/6 reps across both themes, re-run twice (`logs/arrival-chromium.log`, load 8-16). The cause is confirmed by a control: one `getComputedStyle` read of the switch's seat before the write lights the switch in 2/2 cells, and without the read the switch is quiet in 2/2. B is quiet in 8/8, with or without the read, because it arms one frame after mount. This is a CK-03 counterexample: a model set in the mount's own task must give 0 commits. A's "inserted elements have no before-change style" holds only until something reads style during the mount. Reka's accordion, or any component that measures on mount, does exactly that.
6. **CK-21 replayed as CP found it.**
   - A is SILENT on 10 of 10 planted commit tokens (switch and Button, Chromium).
   - B is LOUD through `console.error` on 6 of 10. It is silent on `--rung-light` (2 of 10).
   - On the easing token (2 of 10), B throws a `TypeError`: a `pageerror` on the Switch's observer, and a console error on the Button. The Button's click still reaches the consumer (`logs/easing-click-chromium.log`: clicks 0→1, `data-commit` b).
7. **The gestalt is not iOS-27 grade, and the path does not change a single frame** (§5).

## 1 · What I ran (Chromium; WebKit queued and never admitted)

| run | builds | what | result | load (1-min) | log / json |
|---|---|---|---|---|---|
| independent cells (`probe/cc.mjs`), 3 reps × 2 themes | css, waapi | c1 at Δ 45 and 100, c3, c4, A→B→A | §0 items 1, 3, 4, 5 | 10-34 | `logs/chain-chromium.log`, `json/cc/cc-{css,waapi}-chromium.json` (per-frame series in `series`) |
| side arm, 2 reps | css-prm | c4 | LIGHT 12/12, 0.090-0.093 | 10-11 | same |
| plants | css | `cut` on c1 (dark), `strip` on c3 | FAIL 6/6 (cut 1.00) · SILENT 6/6 | 10-12 | `json/cc/cc-css-chromium-{cut,strip}.json` |
| CP's probe, cell 2 | css, waapi | c2 | PASS 4/4 each | 9-11 | `json/cp-c2/` |
| CP's fail-loud probe | css, waapi | 5 tokens × switch, Button | A SILENT 10/10; B LOUD 8/10, SILENT 2/10 (`--rung-light`) | 9-10 | `json/failloud/` |
| easing plant on the Button's click | css, waapi | `--ease-standard: nonsense` | click delivered in both; B logs a TypeError | 7-8 | `logs/easing-click-chromium.log` |
| async arrival (`probe/arrival.mjs`) | css, waapi | pre, own, late, and ownflush as the cause control | §0 item 5 | 8-16 | `logs/arrival-chromium.log` |
| H2 battery, narrowed to CP's members (CP's `--scenes` map) | css, waapi | E-1..E-11 | identical to CP's Chromium cell for cell (§3 table) | 6-14 | `json/battery-{css,waapi}-chromium/` |
| E-4 and E-10 on every gated scene | css, waapi | slider, tabsdrag, sheet, sortable, carousel; slider, slider2 | E-4 12 P · 2 F · 4 U; E-10 3/3; identical between builds | 8-14 | `json/all-{css,waapi}-chromium/`, `logs/chain3-chromium.log` |
| E-1 on every scene | css, waapi | E-1 | 26/56 per build | 6-7 | `logs/e1-full-chromium.log` |
| forced colours / reduced transparency (`probe/fc.mjs`) | css, waapi | the seat, `[data-press]` fill and slider veil, held | §3 CK-13 | 8-9 | `logs/chain3-chromium.log` |
| CK-25 capture | css, waapi | `capture.mjs`, fine and coarse | `glance/{css,waapi}-chromium-{fine,coarse}.png`, 192 frames | 8-11 | `logs/chain3-chromium.log` |
| coarse-tap commit frames (`probe/coarse-commit.mjs`) | css, waapi | short tap; frames at +90 and +900 ms | LIT 12/12; `glance/coarse/`, `glance/css-chromium-coarse-tap-sheet.png` | 6-10 | `logs/chain2-chromium.log` |
| cost | all | `git apply --numstat`; `git diff --no-index --numstat` over the F5 / css / waapi trees | §3 CK-23 | — | inline |
| consumer greps (siblings, read-only) | — | `tap-squish`, `glass-capsule-hover`, `glass-btn-press-t`, `useDockHold`, `data-commit`, `interactive-item` | §3 CK-22 | — | inline |

## 2 · The four cells and B's status

| cell | A · CSS phase | B · WAAPI from the door | winner | my evidence |
|---|---|---|---|---|
| 1 · second commit during the light | merges; cut −0.50..0.38; 31/36 PASS, 5 single FAILs ≤ 2 quanta, NOT-REPRODUCED | cut 1.00 in 36/36; drop at 45 ms 0.073-0.091 vs 0.013-0.016 (18/18 FAIL); at 100 ms 13/18 FAIL | **A** | `json/cc`, plant `cut` FAIL 6/6 |
| 2 · script press composed with the commit | PASS 4/4 | PASS 4/4 | **tie** | `json/cp-c2` |
| 3 · commit before hydration | PAINTS 18/18, 0.97-1.03× | SILENT 18/18, 0.00× | **A** | `json/cc`, plant `strip` SILENT 6/6 |
| 4 · reduce | 0.0000 18/18 as built; 0.090-0.093 12/12 with the 23-line row | 0.090-0.093 18/18 | **B as built**; tie with the row | `json/cc` |

**B is NOT RETIRED** by the charter's rule (it must lose all four). On the record:

- B's one win is a cascade artifact. The library's PRM fallback cannot reach a Web Animation. A cures that with 23 lines through the library's own authorization mechanism.
- B carries two reproduced defects of its own: the cut (D-1, CK-20) and the A→B→A light (CK-02).
- B's only remaining merit is the fail-loud read (CK-21). That belongs to the door, not to the path. A can borrow it, because the door already reads tokens loudly.
- A carries one defect B does not: the in-task arrival after a style read (CK-03).

Nothing here was measured in WebKit by me. CP's WebKit rep 1 agrees in direction on cells 1, 3 and 4, but it is CP's reading, not mine.

## 3 · Per CK row

Columns: the row's state on A (CSS) and on B (WAAPI). The cells are mine, Chromium only. "WebKit UNMEASURED" means the slot was never admitted (§6).

| CK | A | B | evidence and counterexample |
|---|---|---|---|
| CK-01 | open | open | E-1 full 26/56 per build. The latch reads 4 of 55 members adopting. NOT ADOPTED: alert, badge, card, chip, progress, separator, skeleton, status-dot, surface. `disclosed (accordion)` press Δscale 0.000 with no press-only paint; `ambient (aurora)` mean pixel change 0.00; `presented (sheet) PRM` has no target while pressed. Identical on both builds |
| CK-02 | open | open | E-2 23/36 per build, cell for cell. Switch, light theme: no arm on any of 4 paths (rise 0.0060-0.0062 against 0.01). Accordion: no arm on 7 of 8 paths (rise 0.0000-0.0007; the `__light` composite saturates on a transparent face, CP §3.5). Button programmatic: not driven through the door (`clicks++`). **B only:** a light on a commit that did not happen (A→B→A, LIT 12/12) |
| CK-03 | open | open | Mount committed passes 6/6 per build (E-2). **A:** an in-task arrival after any style read lights the commit: accordion `own` FAIL 6/6; switch `ownflush` FAIL 2/2. **B:** pre, own and late all correct 12/12, ownflush 4/4. Open for B as well: SegmentedTabs, which the pass rule names, is not in this composition, and WebKit is UNMEASURED |
| CK-04 | open | open | E-3 20/22 per build. Phone touch-held ×1.000 × 1.000 at 358.0 × 24.0 px, both themes. The row's bound is ×1.03 on either axis. This composition carries no E stage. Every keyboard plant passes (register, modifier, `k`, script focus) |
| CK-05 | open | open | E-4 on every surface: sortable release continuity fling 74.1 px against 62.0; `tabsdrag release PRM` NOT DRIVEN (0.0 px); Sheet UNMEASURED (in flow). Slider carry 5.20-5.55 px |
| CK-06 | open | open | E-5 16/24 per build. The accordion has no press-only property, under reduce or not (8 FAIL). Switch and Button sustain |
| CK-07 | open | open | the owner's words (Q-2). E-6 4 PASS, 2 FAIL, 8 UNMEASURED |
| CK-08 | open | open | E-7 5/7. `data-held`: `GlassDock.vue` and the door. `data-press`: `PagerDots.vue` and the door. `data-commit` has one writer, the door, in both builds |
| CK-09 | clean in Chromium; open (WebKit UNMEASURED) | clean in Chromium on substance; open (WebKit UNMEASURED) | A: E-8 7/7. B: E-8 4/7. The three B FAILs read `script@60ms, script@180ms … against 0 clock tokens`: under reduce the witness resolves every token through a probe's `transition-duration`, and the PRM fallback zeroes it. Without reduce, B's same 60 and 180 ms durations resolve to tokens (`E-8 literal … minted []`, `E-8 mirror` drift `[]`). B mints no figure. The witness's PRM arm cannot pass any kept clock (§4 item 1) |
| CK-10 | open | open | **A:** the commit light under reduce is 0.0000 in 18/18 cells. E-9 passes A only because its light leg reads the committed state's fill (CK-27). **Both:** E-9 accordion `press-light` FAIL, no press-only paint |
| CK-11 | open | open | `.tap-squish` and `.interactive-item` are still defined (`utilities/base.css:200,300`). They are still composed by Checkbox, RadioGroupItem, the menu items, `rowClass.ts`, SelectTrigger and ConfiguratorRow/Layer in both builds. CP adopts four members, and the retirement is A2's |
| CK-12 | open | open | `--scale-engage: 1.06` sits in `scale-paper.css:32`. The ladder's engaged row (`engageLadder.ts:182-193`) carries no scale figure (C-E r11). B's commit clocks are envelope tokens read at runtime, not literals |
| CK-13 | open | open | Chromium, held, under forced colours: the commit seat computes `display: none` and the slider veil `display: none`. The Button's `[data-press]` fill computes `rgb(255, 255, 255)`: the UA forces it to Canvas and no arm states that, so the press keeps only its scale (1.0328). Under reduced transparency: the seat stays (stated), the press fill turns opaque, the veil computes `display: none`. WebKit UNMEASURED |
| CK-14 | clean in Chromium; open (WebKit UNMEASURED) | same | the coarse Button settles ×1.000 at committed and released in both themes and both builds (my capture). The coarse slider does not grow (Q-3 (c)), so the 44 px floor is not stressed |
| CK-15 | clean in Chromium; open (WebKit UNMEASURED) | same | E-10 slider2 hand-off: A ×1.060 → ×1.000, drop 0.0070 against bound 0.0088; B ×1.000 → ×1.060; one engaged control |
| CK-16 | open | open | not read: the composition's Skeleton and StatusDot loops are unmeasured here |
| CK-17 | open | open | **UNMEASURED (owner's safaridriver checkbox)**: `Element.animate({pseudoElement})` and the PRM fallback's reach both need the real-Safari cell |
| CK-18 | open | open | tabs and sortable consume the rule (carry 40.62 px and 13.06 px). The Sheet cell is UNMEASURED in flow, so the Sheet's consumption is unread |
| CK-19 | open | open | the exemplars exist, but this composition reads `ambient` at 0.00 levels and `presented` PRM finds no target. I did not replay the self-test |
| CK-20 | open | open | **B:** the restart cut, 31/36 films over the bound (§2 cell 1). **Both:** the sortable release jump of 74.1 px (CK-05). E-10 3/3 per build (Escape, re-render landing, hand-off) |
| CK-21 | open | open | A SILENT 10/10. B silent on `--rung-light` (2/10); the easing token raises a `pageerror` on the Switch rather than the row's one `console.error`. E-11 2 PASS, 2 UNMEASURED per build |
| CK-22 | open | open | CP has no MIGRATION table of its own. It cites `P-A2.md` §4, whose rows describe A2's retirement, which this composition does not carry. No row covers the Button's dropped `glass-capsule-hover` lift (every Button). Consumer greps at this HEAD: chicago `tap-squish` 1 file; speedtest `tap-squish` 5; keyframes.js `tap-squish`, `glass-capsule-hover`, `interactive-item` 1 each; value.js `tap-squish` 3, `glass-capsule-hover` 3, `glass-btn-press-t` 2 (bench sheets), `interactive-item` 3; fourier-analysis `interactive-item` 1. No consumer reads `data-commit`. B adds an unrecorded consumer-visible path: a `data-state` written outside the door gets no commit light (cell 3) |
| CK-23 | **closed** | **closed** | reproduced: F5 43 files +1175/−602; CP-css 53 +1377/−630; CP-waapi 53 +1446/−632; the side arm 1 +23/−0; over F5 (tree diff) A 15 files +202/−28, B 15 files +278/−37; B over A 4 files +102/−35 (`useEngage.ts` +79/−7, `Switch.vue` +9/−2, `AccordionTrigger.vue` +9/−1, `engage.css` +5/−25). Every figure matches CP §2 |
| CK-24 | open | open | `E-1 static-inert surface` FAIL: a Card root renders `role="option"` with `tabIndex 0` under `static`. Seven static members compute `unclassed` |
| CK-25 | open | open | not iOS-27 grade (§5). WebKit frames UNMEASURED. The stock coarse "committed" frame does not commit the Switch or the accordion (§4 item 3) |
| CK-26 | open | open | the one light seat carries the commit event, which O-87 admits. But the composition keeps the Chip's `plus-lighter` flood (`glass/glass-chip.css:54`), which the row names. The Button keeps its press-coupled gleam re-keyed on `::before` (`button/styles.css:288`). The veil reads `--glass-focus-veil-blur` (a token), computed `blur(20px) saturate(1.5)` before O-87's 10.2.0 wave |
| CK-27 | open | open | gates that cannot fail: E-9's light leg passes A with its commit light zeroed (it reads the committed fill); E-8's PRM arm fails every kept clock. CP's `probe/cp.mjs` carries no plant (CP §7 item 5). Mine does (`cut`, `strip`), and both bite |

## 4 · Next-pass defect classes (they fit no row and change no score)

1. **Harness: E-8's PRM arm cannot pass any kept clock.** It resolves every clock token through `transition-duration` on a probe element. The library's PRM fallback zeroes that property with `!important`, so the token set is empty under reduce (`… against 0 clock tokens`). Any light kept by E-9's law, including A's authorized rows, reads "minted". For the harness owner.
2. **Harness: the commit bound is finer than the light read.** The one-frame bound is the lone commit's drop + 0.002, but a light seat's alpha is quantized at 1/255 = 0.0039. On a smooth CSS transition a single 18-19 ms frame then reads as a FAIL. The bound should be stated in the read's own resolution. CP's `__light` composite has the related gap on a transparent face (CP §7 item 3).
3. **Harness: `capture.mjs`'s coarse "committed" is a 1200 ms long-tap's touch-up.** That commits neither the Switch nor the accordion: state unchanged in every coarse frame, both builds, CP's capture and mine. A short tap commits both (`probe/coarse-commit.mjs`, LIT 12/12). The CK-25 row is open for this as well. The class is the capture driver's.

## 5 · CK-25: the gestalt, read from the frames

Sheets: `C-CP/glance/{css,waapi}-chromium-{fine,coarse}.png` (my capture) and `C-CP/glance/css-chromium-coarse-tap-sheet.png` (short-tap commit at +90 and +900 ms). **Verdict: not iOS-27 grade.** Each claim below is tied to a frame:

1. **The Switch press reads as nothing.** In `css-chromium-fine.png`, row "chosen switch light", the `pressed` and `held` frames match `rest`: ×1.000, knob round, track a shade greyer. An iOS switch stretches its knob on touch-down. That is D-2's engagement, and here it is not legible.
2. **The commit is invisible on light faces.** Fine sheet, "committed" column, switch light and accordion light; and the `*-light-*-tap-committed.png` frames at +90 ms. Nothing brightens. The seat paints 0.09 alpha of `--neutral-0` over a face near L 0.92, a luminance rise of 0.006 (E-2). In dark, the accordion's pill is faintly visible at +90 ms in `css-chromium-coarse-dark-accordion-tap-committed.png`. That is Q-5's form failing, not the path.
3. **The accordion has no press of its own.** Fine `pressed`/`held` show the hover fill. The coarse sheet's accordion rows show nothing at all from rest through held, because the hover is correctly guarded under `(hover: hover)` and the press has no paint of its own (E-5).
4. **The slider's held state is heavy.** Fine `held`: an opaque two-tone capsule lifts off the track over the label line, and the whole field frosts behind it. The `committed` frame (+90 ms, ×1.009-1.013) still carries a fading halo. Against O-87's "flatter, slightly less blur", this frame reads as the slop the ruling names. It is the same in both builds.
5. **The Button is the one row that reads deft.** Pressed ×1.027-1.033 grows calmly, the engaged ring is a single quiet outline pair, and the coarse tap settles ×1.000 (no latch).
6. **The two builds cannot be told apart in any frame.** That is expected: the path differs only in the 45 ms interruption, the pre-hydration write and reduce. None of those is a glance state.

Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 6 · What I could not read, and why

- **Playwright WebKit, every cell.** `chain.sh webkit` queued at 14:04:51 behind the machine-wide `--exclusive webkit` slot. Ahead of it were the tile floor-v3 WebKit run, then other seats' heavy runs (D3 H5 GLANCE, value.js W12U), with the machine at 1,566-1,685 processes against the guard's 1,400 headroom cap at every check from 14:01 to 15:14. My runs were never admitted: `logs/chain-webkit.log` shows "waiting for the 'webkit' lock" through 15:14, when I stopped my own queued chain (the stop is recorded on its last line). Its drivers are ready for the next seat: `C-CP/chain.sh webkit` and `C-CP/chain2.sh webkit` (both builds, cells, battery, coarse frames, WebKit capture).
- The Sheet (in flow), the S6 idle rung (the owner), the Skeleton/StatusDot rest loops, and real Safari.

## 7 · Close

`git worktree remove --force` on `wt`; nothing is left under `.claude/worktrees/bl/D5/p2/C-CP/`. The main checkout's tracked tree is untouched (`git status` shows only paths under `docs/tranches/BL/design/engagement/`, plus the other seats' untracked work).
