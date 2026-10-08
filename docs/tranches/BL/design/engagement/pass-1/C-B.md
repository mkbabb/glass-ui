# D5 · pass 1 · C-B: the critique of family B's prototype

| field | value |
|---|---|
| seat | C-B, the adversarial critic for D5-B (`../REGISTRY.md` §3.1, "critique"). I wrote none of B's files |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `5631b287` (prototype worktree) and `b27e9547` (the HEAD-control worktrees; a docs-only commit landed between the two `worktree add` calls, `git diff --stat 5631b287 b27e9547 -- src tests` prints nothing). `git diff --stat v10.1.0 HEAD -- src` prints nothing. `P-B.patch` applied clean (`--check`, then `apply`) in my own worktree at `scratchpad/D5/p1/cB/wt`. Measured with `add -N`: 18 files, +579/−119; `src/` 15 files, +567/**−114** (P-B's header says −112; the total −119 agrees with −114). All three worktrees (`wt`, `wth`, `wts`) were removed after |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 15.7-55.2 over the session, 15-50 across the battery and probes. Every cell line in `C-B/logs/` carries its own load. No verdict below rests on a reading taken only under load. Every counterexample in §2 reproduced on smooth frames in both engines |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint |
| artefacts | `C-B/battery.sh` (P-B's sequence, unchanged witnesses, outputs redirected), `C-B/cb-probe.mjs` (my probe: keyboard paint, modifier keys, the unreadable crest, the visible carry, keyboard captures), `C-B/logs/` (build, typecheck, vitest, the menu re-runs, both batteries, `cb-probe.log`, `census-plant.log`, `sheet-rerun.log`), `C-B/json/` (the per-witness JSON), `C-B/captures/` (slider rest and keyboard-focused, both builds, engines and themes, 2×) |

## 0 · Verdict

**ADVANCE. Convergence 9 / 33 = 27 %.**

Every number in P-B that matters reproduced. E-2 is 36/36 per engine on Switch, accordion and Button, against HEAD's Button at 4/12. E-5 is 12/12, E-7 4/4, E-8 7/7 and E-9 24/24 per engine on the adopted scenes. The crest reads ×1.0198-1.0200 at 90-102 ms with a trough of ×0.9974. The stateless edge fires one commit per activation. The Sheet's still release is cured. B owns three things a composition needs: the release rule, the one writer of `data-engaged` and the stateless commit edge. Retiring the family would lose them, and the charter keeps incompatible routes alive past pass 1.

Three of the prototype's own claims fail under measurement, in both engines:

1. **The keyboard signal paints the hand's register.** B writes `data-held="key"` on the slider root and its range. The library already reads `[data-held]` as "a pointer hold, and only that" (`glass/grasp.css:9`), in five rules in `slider/styles.css`. On a keyboard Tab the range now reads **×1.020 × 0.940** with `cursor: grabbing`. HEAD reads ×1.000 × 1.000 with `grab` (`cb-probe.log`, kbdpaint). P-B says "B paints no look" (§3.2, §8). That holds only for the probe's injected rule. The library's own rules paint, and the range stretches 2 % past its value while focused.
2. **A modifier key alone engages.** After a pointer drag, Shift, Meta or Escape sets `data-held="key"` and squishes the range, and the state survives the key-up. HEAD reads null in every cell (`cb-probe.log`, modifier). The `keydown` listener keys on anything that isn't Tab (`useEngage.ts:192`).
3. **E-4's slider PASS measures an invisible body.** B's carry animates the reka thumb, which the slider declares invisible (`slider/styles.css:144-152`, "THE INVISIBLE THUMB … paints nothing": `width: 0; opacity: 0`). Thumb carry: 13.94 px (Chromium) and 14.96 px (WebKit), at opacity 0.00 and width 0.00 px. The visible handle is the range's leading edge. It carries 0.04 px on a fling and 0.11 px on a still release (Chromium), and 0.11 px and 0.12 px (WebKit). HEAD's edge reads 0.12 and 0.16 px (`cb-probe.log`, carryvis). Hallmark 6 on the slider is green in the witness and absent from the screen.

ADVANCE carries B into pass 2 with §3 as its work list. One thing changed since SPECS §6. The commit axis that separated A from B has closed in the paint: both ship `--scale-commit-pop: 1.02` on `panel` with the same `sin(π·c)` mapping, and the crests are identical to the 0.0001. What still separates them is the census (B's registry versus A's table) and script versus CSS. The agglomerator should rule on SPECS §6's question: is B a family, or A's script part?

## 1 · Re-run numbers (mine, against `P-B.md`)

| gate | mine | P-B | note |
|---|---|---|---|
| `npm run build` | PASS, exit 0 (load 44.2 → 42.2, `logs/build.log`) | PASS | |
| `npm run typecheck` | PASS, exit 0 (load 34.1) | PASS | |
| `vitest run` after `demo:dist:build` | 238/239 files; 2318 passed, **1 failed**, 10 expected fail, 1 skipped (load 34.2-43.5, `logs/vitest.log`) | 2319 passed | the failure is `menu/contract` "restores focus on execute", the case P-B saw once. Alone: 3/3 PASS on the prototype and 3/3 on HEAD, load 36-39 (`vitest-menu-rerun.log`). **NOT-REPRODUCED** |
| E-1 | FAIL 0/3 both engines | 0/3 | no declaration |
| E-2 (switch, accordion, button) | **PASS 36/36** both engines (Chromium load 23-29, WebKit 29-40) | 36/36 | accordion keyboard dark 1.017; every trough 0.997 |
| E-2 HEAD button | FAIL 4/12 both engines | 4/12 | keyboard and programmatic peak 1.000; pointer and tap sit at 1.015 |
| E-3 | FAIL 6/12 both | 6/12 | |
| X-1 afterdrag | ×1.000 at 50 and 600 ms, both engines | same | |
| E-4 slider | PASS; carry 9.23 px (Chromium), 15.04 px (WebKit) | 12.12, 14.96 | **vacuous**: §0 item 3 |
| E-4 sortable | PASS; carry 10.64 px, 8.33 px; largest jump 70.3 and 76.4 px | 10.74, 16.38 | the jump is the ghost's teleport (X-9) |
| E-4 Sheet, local fix (`pbs`) | PASS both engines. **Fling settles 130.00 px** in the battery (both engines), and **255.00 px** in two Chromium re-runs; still settles 5.00 px every time (`sheet-rerun.log`, load 26.6-29.5) | fling 255.00 | the same drive lands on either of two detents from run to run. It passes either way |
| E-4 Sheet, HEAD + fix (`heads`) | FAIL: fling and still both settle 255.00 px, both engines | same | the HEAD defect P-B names, reproduced |
| E-5 | PASS 12/12 both | 12/12 | |
| E-6 | FAIL (present 0) | same | |
| E-7 | PASS 4/4 both | 4/4 | |
| E-8 | PASS 7/7 both | 7/7 | |
| E-9 | PASS 24/24 both; Button press-spatial 0.000 under reduce | 24/24 | the door drops `scale` under reduce. C-A's Chromium Button squish (0.030) is gone here |
| pb-probe (census, commits, crest, modality) | 17/19 both; the two FAILs are skeleton and dialog with no row (as designed) | same | crest switch ×1.0199 at 102 ms (+0.87 px), accordion +6.37 px, button +1.49 px |
| H-8 mount | 6/6 per engine, scale range 0.000, body 0.00 px | 6/6 | |

## 2 · The checklist

Rows 1-31 are C-A's rows (REGISTRY §2.1, §2.2, the family-facing §2.3 rows, §2.5, O-87, §3.3 items 2 and 4, and the charter's failure modes), kept so the agglomerator can compare the two families row by row. Rows 32-33 are B's own charter claims (SPECS §4 charter and §4.1 "the keyboard engaged signal"). §3.3 item 1 asks each route for its row on its own mechanism. The harness-owned rows (H-1, H-3..H-7, H-9) belong to R-H and are not scored here.

| # | row | verdict | counterexample or evidence |
|---|---|---|---|
| 1 | E-1 census | **FAIL** | no `ENGAGE_DECLARATION`: 0 of 55 directories declared, both engines. The registry reads 5 of 7 probed directories. The registry credits a dead adopter (row 26) |
| 2 | E-2 commit bar | **FAIL** | 36/36 per engine on the three adopted scenes. Checkbox, radio, tabs, toggle and chip are not adopted, and their HEAD reading stands RED (`../BASELINE.md` §2: 58 of 64 commit cells per engine neither pop nor travel). Margins are thin: bounce clears by 0.001 and the accordion keyboard dark peak is 1.017. The Button's pointer and tap commits settle on the capsule lift at ×1.015 |
| 3 | E-3 slider | **FAIL** | ×1.000 pointer-held, keyboard-focused and touch-held, both engines. Worse: the keyboard signal B adds for this row's keyboard arm paints the hand's squish today (§0 item 1) |
| 4 | E-4 momentum | **FAIL** | the slider's PASS is vacuous (§0 item 3). The Sheet's PASS needs a position fix that is not in the patch. The fling lands on 130 or 255 px from run to run. Tabs drag and Carousel not run |
| 5 | E-5 held touch | **FAIL** | adopted scenes 12/12 per engine. Tabs, toggle and chip keep their HEAD RED (PRM press-light `[]`, `../BASELINE.md` §1 E-5) |
| 6 | E-6 idle or its RETIRE | **FAIL** | absent; the RETIRE needs the owner's words (W-J.2 §3.2 item 5) |
| 7 | E-7 one writer of `data-engaged` | PASS | 1 writer (`engage/useEngage.ts`); modal 0 nodes; held 2, PRM 2; both engines |
| 8 | E-8 one clock | PASS | 7/7 both engines (narrowed to the adopted scenes; the rest are HEAD's hold line) |
| 9 | E-9 PRM | **FAIL** | adopted 24/24 per engine, the Button's reduce squish cured. Four unadopted controls keep no press-only light under reduce (`../BASELINE.md` §1 E-9) |
| 10 | FL-1 clean break | **FAIL** | (a) `.tap-squish` stays on the Button (`hostClass` "button tap-squish focus-ring"), and `.glass-capsule-hover` stays on the Button too, so the commit settles on its 1.015 lift. (b) `data-held` changes meaning with no clean break: presence used to mean "a pointer hold", and now `""` means the hand and `"key"` the keyboard. Every existing `[data-held]` reader in the library (`slider/styles.css:48,190,219,241,312,334`; `glass/grasp.css`) now matches keyboard focus, and none was migrated (row 23) |
| 11 | FL-2 no minted figure; tables read | **FAIL** | (a) the crest token's own comment: "the bar's analytic minimum (1.0152) misses on frame sampling, so the crest carries a margin: 1.02" (`tokens/scale-paper.css`). (b) the commit runs a geometry bounce on `panel`, but the table says "Exactly one row rebounds and it is the fired deploy … a celebration's liveliness belongs to the LIGHT channel (engageEnvelopes), never to a geometry bounce" (`springPresets.ts:50-57`), and `panel`'s rider is "the fired deploy … the extent morph". C-A row 11 found the same on A. (c) `ACKNOWLEDGE_WINDOW_MS` (150 ms) is "the budget a press must be visibly answered within" (`engageEnvelopes.ts:47-51`). B reuses it as the velocity sampler's window on three surfaces, so one constant now has two jobs |
| 12 | FL-3 forced colors, reduced transparency | **FAIL** | the new press fill (`disclosure.css`, `[data-press]` on `--fill-selected`) has no stated arm. The file's `forced-colors` block (`:150-160`) covers the item border and the focus outline only, and there is no `prefers-reduced-transparency` arm |
| 13 | FL-4 coarse: no hover latch, 44 px | **FAIL** | the adopted Button, `commit·tap(coarse)`: peak 1.034, **settles 1.015** in both themes and both engines (the capsule's hover lift latched by a coarse tap). The same holds at HEAD, but B adopted the Button and left it |
| 14 | FL-5 singleton engaged rung | PASS | E-7 held: 2 nodes (veil, loupe) for the one held control, PRM too |
| 15 | FL-6 rest-running bound | PASS | B adds nothing that runs at rest: one arming frame per mount, finite crests, E-6 present 0 |
| 16 | FL-7 real Safari | **OPEN** | UNMEASURED (owner's safaridriver checkbox). The Switch's press is now a `:active` rule only (DV-1), which iOS Safari gates on a `touchstart` listener (`RW.md` §4 (b)) |
| 17 | FL-8 velocity owners on one rule | **FAIL** | Sheet and sortable consume the rule. SegmentedTabs' drag fling is one of the four owners `../PORTFOLIO.md` §1.3 item 1 names, and it is not moved. The stated reason ("keyframes.js `Draggable`") does not explain why: the fling is wired in glass-ui's own `useDragMorph` via `tabs/composables/useTabDragMorph.ts:24`. The slider's carry reaches no visible body (§0 item 3) |
| 18 | H-2 an exemplar per declared class | **FAIL** | B declares no classes; 4 of 55 directories adopt the door. A per-directory census needs 55 scenes (SPECS §4.7 item 4) |
| 19 | H-8 mount case | PASS | 6/6 per engine; a model set in the mount's own task gives 0 edges |
| 20 | §2.5 gestalt, "iOS-27 grade or not" | **FAIL** | §4 |
| 21 | O-87 (adds no lighting layer) | PASS | no glow, gleam, shadow or idle loop added. The dark Button's warm bloom is HEAD's (the token wave's) |
| 22 | Q-1 census-checkable | PASS | `exempt: "<reason>"` at the door; the probe reads it. The census's blindness to dead adopters is row 26 |
| 23 | cost and MIGRATION rows | **FAIL** | cost reproduced (+579/−119). M-B7 names value.js's `.channel-slider[data-held]` (confirmed read-only: `ComponentSliders.vue:391-394`) but not the library's own readers. Six `slider/styles.css` rules and `grasp.css` now fire on keyboard focus, which is §0 item 1, a shipped regression the MIGRATION table does not list |
| 24 | CF vacuous convergence | **FAIL** | E-4's slider cell credits 9-15 px of carry on an element with opacity 0.00 and width 0.00 px. The visible edge's fling-minus-still difference is ≤ 0.01 px in both engines, the same as HEAD |
| 25 | CF self-citing spec | **FAIL** | (a) the crest is the bar's minimum plus a margin for the witness's sampler (row 11 (a)). (b) DV-1 removed the Switch's squish because "the squish's release spring and the crest multiply and the pop vanishes". The control's press was cut to fit the bar. (c) the scene-app fork changes the instrument that scores the route: the Button's programmatic commit becomes `element.click()`. That is defensible for a command, but the author made the change, as P-A did (C-A row 25). The agglomerator should rule it into the shared app or out |
| 26 | CF gates that cannot fail | **FAIL** | plant: `AccordionTrigger`'s host getter replaced by `() => null`, rebuilt. The census reads **PASS `parts [press, commit]`** while E-2 programmatic reads peak 1.000, FAIL, both engines (`census-plant.log`, load 23-27). Parts are taken from option keys (`useEngage.ts:169-172`), not from a resolved host. The census also has no gate in the repository: no `src/` or `tests/` file reads `__glassEngageCensus` (grep: 0). Its only reader is a probe under `docs/` |
| 27 | CF elegant-reduction trap | **FAIL** | (a) one `sin(π·c)` crest at 1.02 for every control: the frames show it on none (§4). (b) one attribute for two meanings: folding "the keyboard drives it" into `data-held` makes every hand rule a keyboard rule (§0 item 1). That is the reduction this row names |
| 28 | CF aliases | PASS | no alias minted; `data-engaged` presence-only with its readers migrated (M-B1, M-B2) |
| 29 | CF masked fallbacks | PASS | the unreadable-token path is loud. Plant: `--scale-commit-pop: 1` on the Switch host, then two commits: 0 crest animations, no `data-commit`, exactly one `console.error`, both engines (`cb-probe.log`, unreadable). `.tap-squish` on the Button is the stated no-JS floor (`useLiquidPress.ts:191`), not a dead rule under a live one |
| 30 | CF unverified gestalt | **FAIL** | two visual claims in P-B are false when read: "the release-carry frame … shows the thumb ahead of its value" (§8; the thumb paints nothing, and the frame shows a faint stub *behind* the range's end, 400 px against 508 px at 2×, `pb-webkit-dark-slider-3-release-carry.png`), and "B paints no look" (§3.2, §8; §0 item 1) |
| 31 | CF consumer-less substrate | **FAIL** | (a) the census Map is written by shipped code and read only by a docs probe. (b) `data-commit` is written on every commit and read by nothing; P-B's own DV-2 says "No CSS reads `data-commit` (grep: 0)". (c) the `"key"` value has no designed reader. Its only readers are hand rules that misfire on it |
| 32 | B's charter: the one writer of `data-held`, `data-engaged`, `data-press`, `data-commit` (SPECS §4) | **FAIL** | `data-engaged` holds (row 7). `data-held` is also written by `dock/GlassDock.vue:346,378` (`graspHeld`), and `data-press` by `pager-dots/PagerDots.vue:361`. The door's header ("the ONLY writer of the engagement attributes", `useEngage.ts:4-5`) is false for two of four attributes |
| 33 | B's keyboard engaged signal (SPECS §4.1; S-8, X-1) | **FAIL** | the after-drag latch is cured (×1.000 and `data-held` absent at 50 and 600 ms, both engines). But a modifier alone engages after a drag (Shift, Meta, Escape → `"key"`, persisting after key-up, both engines), and the signal paints the hand's register (§0 items 1-2) |

Rows passing: 7, 8, 14, 15, 19, 21, 22, 28, 29 = **9 of 33**.

## 3 · Open gaps, the pass-2 work list for B

1. **Give the keyboard its own attribute (rows 3, 10, 23, 27, 33).** Keep `data-held` for the hand, as grasp.css's contract says, and write a separate signal for the keyboard (for example `data-engage="key"`). Key it on keys that act on the control (arrows, Home/End, PageUp/PageDown, Space/Enter), not on any non-Tab key. Plant check: Tab must leave the range at ×1.000 × 1.000 with `cursor: grab`, and Shift, Meta and Escape after a drag must leave it unengaged. `cb-probe.mjs` kbdpaint and modifier are those cells.
2. **Carry the visible body (rows 4, 17, 24).** The slider's handle is the range's leading edge. Either the release carries the range (its `scaleX` or its inline size) or the spectrum variant's visible thumb, or the slider's E-4 cell measures the leading edge. The witness needs a visibility precondition on the body it reads (opacity > 0 and a non-zero box), or it keeps crediting invisible motion. The same fix is a harness row for R-H.
3. **The census reads adoption (rows 1, 18, 26, 31).** Record a row only when the host resolved at mount and the parts actually bound. Add a repository gate that mounts each directory's exemplar and reads the census, or take A's table (SPECS §6) and stop shipping a debug global.
4. **The commit's form against the spring table (rows 11, 25, 27).** This is the same open question as C-A gap 2. A commit in light (the table's law, `RW.md` §4 (a)), or an owner ruling that amends `panel`'s rider. Name a velocity window of its own instead of `ACKNOWLEDGE_WINDOW_MS`.
5. **Retire, don't layer (rows 10, 13).** The Button's commit settles on `.glass-capsule-hover`'s lift, and a coarse tap latches it. That cure needs D1 (P-A DV-5), but the latch is an FL-4 defect on a member B adopted.
6. **One writer means one (row 32).** Route `GlassDock`'s `data-held` and `PagerDots`' `data-press` through the door, or narrow the charter to `data-engaged` and say so.
7. **Adopt the rest of the round-0 atoms (rows 2, 5, 9).** Checkbox, radio, tabs, toggle and chip.
8. **FL-3 (row 12).** A stated forced-colors and reduced-transparency arm for the `[data-press]` fill.
9. **The Sheet's detent choice (row 4).** Find out why the same drive lands on 130 or 255 px from run to run (the 150 ms window catching one or two samples is the obvious suspect). Pin it before any detent claim is scored.
10. **Carried, not B's:** E-3's look (A's recipe or E's stage, Q-3), E-6 (the owner, Q-2), FL-7 (the owner's checkbox), the Sheet's position defect and the sortable teleport (X-9 owners).

## 4 · Gestalt read (REGISTRY §2.5)

Frames: `P-B/captures/sheet-{pb,head}-{chromium,webkit}-{light,dark}.png` and the per-state PNGs, plus my keyboard frames `C-B/captures/{pb,head}-{chromium,webkit}-{light,dark}-slider-{1-rest,2-keyboard}.png`.

- **Switch.** At rest, committed and crest, HEAD and the prototype cannot be told apart at 2×. The crest is +0.87 px on a 44 px box. The prototype's pressed frame drops HEAD's slight squish and keeps the face greying. That is calmer, and still flat.
- **Accordion.** The pressed frame is a full-row stadium in both builds, the same slab HEAD paints. The commit's +6.4 px on a 320 px row is the only crest a viewer could catch, and the crest frame shows it only as a slightly shifted chevron.
- **Button.** Every state matches HEAD. The committed frame keeps the 1.015 hover lift. The dark Button's warm bloom is HEAD's.
- **Slider.** The held frame is the veil's heavy blur field, unchanged from HEAD and heavier than O-87's "slightly less blur" asks. The release-carry frame shows no handle moving: the thumb paints nothing, and the range's edge does not carry. Under keyboard focus the prototype's range is visibly stretched past its value and thinned (`pb-chromium-light-slider-2-keyboard.png` against `head-…`), with no hand on it.
- **Missing:** the coarse capture set and the held and released states for anything but the slider (P-B says so).

Read: **not iOS-27 grade.** B's mechanism is real in the traces: one edge per commit, a carry, a writer. The frames show none of it, and the one new visible change is a regression on keyboard focus. D-2 asks that every component display engagement, and here the engagement lives in the witnesses rather than on screen.

## 5 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1; C=$P/C-B; S=<scratch>
git worktree add --detach $S/wt HEAD; git worktree add --detach $S/wth HEAD; git worktree add --detach $S/wts HEAD
for w in wt wth wts; do ln -s "$PWD/node_modules" $S/$w/node_modules; done
git -C $S/wt apply "$PWD/$P/P-B.patch"; git -C $S/wts apply "$PWD/$P/P-B.patch"; git -C $S/wts apply "$PWD/$P/P-B/sheet-position-local.patch"
(cd $S/wt && npm run build && npm run typecheck && npm run demo:dist:build && npx vitest run)
node $H/build.mjs $S/wt --label pb --out $S/out --app $P/P-B/scenes/App.vue
node $H/build.mjs $S/wth --label head --out $S/out --app $P/P-B/scenes/App.vue
git -C $S/wth apply "$PWD/$P/P-B/sheet-position-local.patch"
node $H/build.mjs $S/wts --label pbs --out $S/out --app $P/P-B/scenes/App.vue
node $H/build.mjs $S/wth --label heads --out $S/out --app $P/P-B/scenes/App.vue
zsh $C/battery.sh $S chromium > $C/logs/battery-chromium.log; zsh $C/battery.sh $S webkit > $C/logs/battery-webkit.log
for e in chromium webkit; do for l in pb head; do node $C/cb-probe.mjs --build $S/out/builds/$l --engine $e --label $l --shots $C/captures; done; done
# census plant: in $S/wt, AccordionTrigger.vue `useEngage(() => trigger.value?.$el ?? null, {` → `useEngage(() => null, {`, then
node $H/build.mjs $S/wt --label plant --out $S/out --app $P/P-B/scenes/App.vue
node $P/P-B/pb-probe.mjs --build $S/out/builds/plant --only census [--engine webkit]     # census accordion PASS
node $H/e2-commit.mjs --build $S/out/builds/plant --scenes accordion --themes light [--engine webkit]   # FAIL
for w in wt wth wts; do git worktree remove --force $S/$w; done
```
