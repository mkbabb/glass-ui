# D5 · pass 1 · C-E: the critique of family E's prototype

| field | value |
|---|---|
| seat | C-E, the adversarial critic for D5-E (`../REGISTRY.md` §3.1, "critique"). I wrote none of E's files |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `809f1b7c` for the prototype worktree `wt`, and `509f9ce8` for the `pb` control worktree `wtb` (P-E's banking commit landed between the two `worktree add` calls; `git diff --stat 809f1b7c 509f9ce8 -- src tests` prints nothing). `git diff --stat v10.1.0 HEAD -- src` prints nothing. `P-E.patch` applied clean (`--check`, then `apply`). Measured with `add -N`: **26 files +1099/−267; src 20 files +939/−221**, matching P-E's header. Both worktrees (`scratchpad/D5/p1/cE/{wt,wtb}`) were removed afterwards |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 35.8-68.1 over the session. Chromium battery 19:45-19:50 at 44-66, WebKit 19:50-19:57 at 42-68, my probe 19:57-19:59 at 50-65, plants 20:02 at 36-38. Every cell line in `C-E/logs/` carries its own load. Each counterexample in §2 reproduced on 3 of 3 runs in both engines (`ce-probe.log`, `ce-probe-rerun.log`). The two vitest failures seen under load did not reproduce (§1) |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds the paint |
| artefacts | `C-E/battery.sh` (P-E's sequence, outputs redirected to C-E), `C-E/ce-probe.mjs` (my probe: value-point carry both directions, Tab hand-off, re-grab, character key, programmatic focus, a slider in a Dialog), `C-E/plant-fallback.mjs` (unreadable-input plants), `C-E/scenes/App.vue` (P-B's scene fork plus two scenes, `slider2` and `sliderdlg`; every other byte is P-B's), `C-E/logs/`, `C-E/json/`, `C-E/shots/`, `C-E/glance/` |

## 0 · Verdict

**ADVANCE. Convergence 12 / 36 = 33 %.**

What P-E claims reproduced in both engines. The desk slider grows ×1.060 when pointer-held and when keyboard-focused, so E-3 is 10/12 per engine (the `pb` control is 6/12 at the same load). E-7 is 4/4, E-2 36/36, E-5 12/12, E-8 7/7 and E-9 24/24 per engine. P-E's probe scores 16/16 per engine and 5/16 on `pb`. The fling differential is **6.48 px in Chromium and 9.70 px in WebKit** (P-E read 8.13 and 10.69). After a drag the slider is ×1.000 by 600 ms. The phone block-axis read is 24 → 25.4 px (×1.058).

E-4's release carry is **not vacuous**, which was my first suspicion. P-E's probe reads the control's box edge, which a whole-control stretch moves by construction. So I read the value point instead: the range's leading edge, which is the slider's visible handle. Fling minus still, the value point travels **5.96 px right and 8.90 px left in Chromium, and 7.75 px right and 10.93 px left in WebKit**. The trailing edge holds within 1.04 px. B's thumb carry moved an invisible body (C-B §0 item 3). E's carry moves the visible one, in both directions.

E is alive and it is the only route that makes E-3's desk arm green. It advances. Four defects in E's own increment fail under measurement, in both engines, 3 of 3 runs:

1. **A hand-off snaps (D-1).** Tab from slider A to slider B and A drops from ×1.060 to ×1.000 **in one frame**, a 0.060 drop. The veil also falls to **0.00** between the two engagements and ramps back. Release A by pointer and press B 40 ms later, and A snaps **0.038-0.054** in one frame (from about ×1.04 to ×1.000). Cause: `engageStage` calls `hide(holder)` on the outgoing host (`engageStage.ts:93`). That removes `popover` and `data-engage-stage` synchronously, so the `scale` rule and its transition vanish, and the shared veil is hidden and re-shown from opacity 0.
2. **A key the slider does not act on engages it.** After a drag, pressing `k` promotes the slider and frosts the world (stage true, veil 1.00, ×1.06). `ACTING_KEY` begins with `.`, so it matches any single character (`useEngage.ts:108`), and its own comment says "a character".
3. **A programmatic `element.focus()` engages it.** Script focus with no hand and no key promotes the slider and frosts the world (stage true, veil 1.00). Any app that focuses a slider by script (validation, focus restore, a dialog's initial focus) now recedes the world. Not in the MIGRATION rows.
4. **The stage fails silently on unreadable inputs (E-2 masking).** With an invalid `--scale-engage`, the slider still promotes and veils but does not grow (`scale: none`). With an invalid `--space-section`, the registered `--stage-reach` falls back to its initial value `1` and the inline grow disappears (`scale: 1 1.06`). With an invalid `--spring-dock-settle`, the fling plays nothing: the leading edge reaches 9.81 px against the still 10.80 px. All three plants logged **0 console errors** in both engines. The door's commit path fails loud for the same class of defect (`fireCommit`, C-B row 29).

The route is P-B's tree plus E, so P-B's rows that E leaves untouched still fail here (rows 10, 11, 13, 17, 18, 25, 26). They are marked "inherited" so the agglomerator does not count them twice against E's increment.

## 1 · Re-run numbers (mine, against `P-E.md`)

| gate | mine | P-E | note |
|---|---|---|---|
| `npm run build` | PASS, exit 0 (load 41.3 → 45.0, `logs/build-typecheck.log`) | PASS | |
| `npm run typecheck` | PASS, exit 0 (load 53.8) | PASS | |
| targeted vitest (`engageStage.keyboard`, `orphan-css-partial`, `focus-veil`, `binary-triad`, `glass-subtlety`) | 5/5 files, 73/73 (load 59.9-60.8) | 4/4 new | |
| full vitest after `demo:dist:build` | 238/240 files; 2321 passed, **2 failed**, 10 expected fail, 1 skipped (load 59.8 → 67.1) | 1 failed | `menu/contract` "restores focus on execute" and `aurora/atoms` fuzz (5290 ms). Both alone, twice: 36/36 PASS (load 59-65, `vitest-rerun.log`). **NOT-REPRODUCED** |
| E-1 | FAIL 0/3 both | 0/3 | |
| E-2 (switch, accordion, button) | **PASS 36/36** both | 36/36 | Button pointer and tap settle on **1.015** (the capsule lift), both engines |
| E-3 | FAIL 10/12 both; `pb` 6/12 both | 10/12; 6/12 | desk pointer and keyboard ×1.060; phone touch-held ×1.000 inline |
| E-3 phone, beside the arm | rest 358 × 24 → held 358 × 25.4, **block ×1.058**, box 16..374 (Chromium; `glance-pe.log`) | same | WebKit's phone line fell outside my log filter; P-E's reading stands there, not re-read |
| E-4 slider (harness) | FAIL 0.00 px both; `pb` PASS 11.60 px (Chromium) | FAIL; `pb` PASS | `pb`'s PASS is C-B's invisible thumb |
| E-4 sortable | PASS 9.16 px (Chromium); the largest jump 70.1 px is the ghost teleport (X-9) | 7.92 / 9.07 | |
| P-E probe | **16/16** both; `pb` 5/16 both | 16/16; 5/16 | fling differential **6.48 px** (Chromium, load 60), **9.70 px** (WebKit, load 43) |
| value point (mine) | right 5.96 / 7.75 px, left 8.90 / 10.93 px (Chromium / WebKit); trailing edge −1.04..0.00 / −0.37..−0.44 px | — | §0 |
| E-5 | PASS 12/12 both | 12/12 | |
| E-6 | FAIL (present 0) both | same | |
| E-7 | PASS 4/4 both; 1 writer `engageStage.ts` | 4/4 | |
| E-8 | PASS 7/7 both | 7/7 | |
| E-9 | PASS 24/24 both | 24/24 | |
| after-drag | ×1.038 at 50 ms, **×1.000 at 600 and 1500 ms**, both engines | same | |
| passive (Q-1) | Separator, Skeleton `{engaged 0, stage 0}` (Chromium) | same | |
| Switch held / 90 ms tap | not promoted, veil 0 throughout (Chromium) | same | |

## 2 · The checklist

Rows 1-31 are C-B's rows: REGISTRY §2.1, §2.2, the family-facing §2.3 rows, §2.5, O-87, §3.3 items 2 and 4, and the charter's failure modes. I kept them so the agglomerator can compare the families row by row. Rows 32-36 are E's own claims (SPECS §5 charter, §6 "P-E" adds). The harness-owned rows (H-1, H-3..H-7, H-9) belong to R-H and are not scored here.

| # | row | verdict | counterexample or evidence |
|---|---|---|---|
| 1 | E-1 census | **FAIL** | no declaration, 0 of 55 directories, both engines. The census family's |
| 2 | E-2 commit bar | **FAIL** | 36/36 per engine on the three adopted scenes. Checkbox, radio, tabs, toggle and chip keep HEAD's RED (`../BASELINE.md` §2) |
| 3 | E-3 slider | **FAIL** | desk 4/4 and PRM 4/4 PASS per engine. Phone touch-held ×1.000 inline, because the bound is infeasible as written (X-2). Under X-2's restatement the block reads ×1.058 (Chromium). Unruled |
| 4 | E-4 momentum | **FAIL** | the slider's visible carry is real (row 34), but the harness cell reads FAIL until X-11 is ruled. The Sheet's carry needs P-B's local position fix, which is not in `P-E.patch`. Tabs drag and Carousel were not run |
| 5 | E-5 held touch | **FAIL** | adopted 12/12 per engine; tabs, toggle and chip keep HEAD's RED |
| 6 | E-6 idle or its RETIRE | **FAIL** | absent; the RETIRE needs the owner's words |
| 7 | E-7 one writer of `data-engaged` | PASS | 1 writer (`engage/engageStage.ts`); modal 0; held 2, PRM 2; both engines |
| 8 | E-8 one clock | PASS | 7/7 both engines; the stage's grow runs on `--spring-dock-duration`, the fling on `rowClockMs("dock")` |
| 9 | E-9 PRM | **FAIL** | adopted 24/24 and fling PRM 0.00 px. The unadopted members keep HEAD's RED |
| 10 | FL-1 clean break | **FAIL (inherited)** | E's own breaks are clean: `data-held="key"` and `engagedOn` are removed with no alias, and the teleports are gone. The Button keeps `.tap-squish` beside the door (C-B row 10 (a)), unchanged in this tree |
| 11 | FL-2 no minted figure | **FAIL** | (a) inherited: the crest's 1.02 is "the bar's analytic minimum … carries a margin" (`scale-paper.css`). (b) `--scale-engage: 1.06` is new in `scale-paper.css`. Its source is BI T1, but `ENGAGE_LADDER`'s engaged row carries no figure, so the token is not on the table it claims to read (P-E §9 says so) |
| 12 | FL-3 forced colors, reduced transparency | **FAIL** | the promoted host's grow and the stage's veil under forced colors and reduced transparency were not read in a browser (P-E: UNMEASURED); the `[data-press]` fill has no arm (inherited) |
| 13 | FL-4 coarse | **FAIL (inherited)** | Button `commit·tap(coarse)` peaks at 1.034 and **settles at 1.015**, both themes and both engines (my E-2 run). The stage itself engages on hold, not hover, and only grows |
| 14 | FL-5 singleton | PASS | one control on the stage; Q-5 with two fingers leaves `open 2` (one host and the veil) and `footprints 1`, then 0 after release (Chromium). The singleton's hand-off is row 32 |
| 15 | FL-6 rest-running bound | PASS | E-6 layouts/s 0.0 at rest, both engines; the stage adds no loop |
| 16 | FL-7 real Safari | **OPEN** | UNMEASURED (owner's safaridriver checkbox). Headless WebKit paints no `backdrop-filter`, so the veil's blur is unseen there |
| 17 | FL-8 velocity owners | **FAIL (inherited)** | the stage consumes B's rule (`impulseFrames`, `rowClockMs`). SegmentedTabs' drag fling is still not moved (C-B row 17) |
| 18 | H-2 an exemplar per class | **FAIL (inherited)** | no classes declared |
| 19 | H-8 mount case | PASS | E-2 `mount(committed)` 6/6 per engine; the stage watches the edge, never `immediate`. Row 33 covers a focus by script, which is a related path |
| 20 | §2.5 gestalt | **FAIL** | §4 |
| 21 | O-87 (adds no lighting layer) | PASS | no glow, gleam or shadow is added; the veil is the shipped recipe (`blur(20px) saturate(1.5)`). The route does add the veil to a new state, keyboard focus (row 27, §4) |
| 22 | Q-1 census-checkable | PASS | clients are the callers of `useEngageStage` (Slider only); Separator and Skeleton read 0/0 |
| 23 | cost and MIGRATION rows | **FAIL** | cost reproduced (+1099/−267). The MIGRATION rows say "Tab into a slider promotes it" but omit two consumer-visible paths: a programmatic `focus()` promotes and frosts the world, and any printable key engages it (row 33). Inside a Dialog, one Escape both releases the stage and closes the dialog (`sliderdlg`: dialog false and focus BODY at +700 ms, both engines). That may be right, but it is not stated |
| 24 | CF vacuous convergence | PASS | E-4's visible carry holds on the value point, an independent read: 5.96-10.93 px fling minus still, both directions, both engines. E-3's keyboard arm reads ×1.060 with `[data-engaged]` 2 and focus on the slider |
| 25 | CF self-citing spec | **FAIL (inherited)** | the crest's margin and the Switch's squish cut to fit the bar stand (C-B row 25). E's own increment is clean on this row: X-11's page-frame read is the author's, and I confirmed it with a different body |
| 26 | CF gates that cannot fail | **FAIL (inherited)** | E's new cells can fail: on `pb` the probe reads 5/16 and the fling differential 0.00 px. The census still takes parts from option keys (`useEngage.ts:184-187`), which is the mechanism C-B's plant broke. I did not re-run that plant; this row rests on the static read |
| 27 | CF elegant-reduction trap | **FAIL** | one engagement for two modalities: keyboard focus recedes the world exactly as a grasp does, at every Tab into a slider (stage true, veil 1.00, ×1.06; `pe-*-slider-keyboard-engaged.png`). P-E's own gap 2 names the split (veil for the hand, grow for both) and did not build it. The singleton's `hide()` is the second reduction: one call releases instantly instead of handing over (row 32) |
| 28 | CF aliases | PASS | no alias; `data-held="key"` removed outright |
| 29 | CF masked fallbacks | **FAIL** | `plant-fallback.log`, both engines, 0 console errors in all three: an invalid `--scale-engage` gives promoted and veiled with no grow; an invalid `--space-section` makes the registered `--stage-reach` fall back to `1` (inline grow gone); an invalid dock clock makes `flingStage` return without playing (`engageStage.ts:164`). The commit path is loud for the same class of defect |
| 30 | CF unverified gestalt | **FAIL** | P-E §8: "Fling +48 ms: the control stretched toward the fling". The Chromium frame's track is 365.0 CSS px against `pb`'s 363.5, **+1.5 px**, unreadable at a glance. WebKit's is 383.5 against 363.5, visible. The ladder's engaged row, which P-E cites as built, says "its rest footprint stays visible beneath". The footprint is an empty span, covered by the grown control |
| 31 | CF consumer-less substrate | **FAIL** | `/motion` exports `engageStage`, `flingStage`, `releaseStage` and `useEngageStage` with one client (the Slider; its spectrum variant is excluded). SPECS §5.1 names the clients the stage exists for: Slider, NumberField scrub, the colour spectrum, the dock grasp. Three of the four are not built, so "one facility" has one user |
| 32 | E's stage hands over with inertia (SPECS §5.1 singleton under D-1) | **FAIL** | Tab A → B: one-frame drop **0.060** on A, veil min **0.00**, 3/3 runs, both engines. Release A, +40 ms press B: one-frame drop **0.038-0.054** (Chromium) and **0.043-0.047** (WebKit) |
| 33 | E's keyboard engagement through B's signal (SPECS §6) | **FAIL** | kbd 10/10 and modifiers 4/4 PASS per engine, and C-B's two keyboard defects are cured. But `k` engages after a drag (both engines), and `element.focus()` by script engages (stage true, veil 1.00, both engines) |
| 34 | E's release carries the hand, visibly (SPECS §6) | PASS | value point fling minus still: right 5.96 / 7.75 px, left 8.90 / 10.93 px; trailing edge held; value unchanged (62 → 62, 17 → 17); PRM 0.00 px |
| 35 | the Switch is not a client (S-5) | PASS | Switch held 450 ms: not promoted, veil 0; 90 ms tap: veil max 0; E-2 switch 12/12 per engine |
| 36 | the area/block phone read beside E-3 (SPECS §6) | PASS | read and reported: block ×1.058, inline ×1.000, gutter 16..374 (Chromium). The adequacy of 1.4 px is §4's question, not this row's |

Rows passing: 7, 8, 14, 15, 19, 21, 22, 24, 28, 34, 35, 36 = **12 of 36**.

## 3 · Open gaps: the pass-2 work list for E

1. **Hand over, don't hide (rows 32, 27).** When a second engagement arrives, the outgoing host must leave on its own spring: keep it promoted, drop `data-engaged` and let `releaseStage` retire it. The veil stays up across the hand-off and recentres; it is not hidden and re-shown. Plant check: `ce-probe.mjs --only handoff,regrab`, with A's largest one-frame drop < 0.02 and veil min ≥ 0.5. This touches the singleton (FL-5): two hosts are in the top layer for the outgoing spring's duration, and only one is `[data-engaged]`.
2. **Key the engagement on what the control does (rows 33, 23).** Drop the `.` alternative from `ACTING_KEY` (a slider acts on arrows, Page, Home/End). Decide whether focus by script engages at all. My suggestion: only `:focus-visible` focus from a key event does. Add both paths to the MIGRATION rows. Plant check: `ce-probe.mjs --only charkey,progfocus`.
3. **Fail loud (row 29).** Every stage input the code reads (`--scale-engage`, `--stage-reach`'s inputs, the dock row's clock) gets the same one-time `console.error` as `fireCommit`. The registered `--stage-reach` initial value of 1 must not be the silent answer to an invalid calc. Plant check: `plant-fallback.mjs`.
4. **The keyboard veil (rows 20, 27; P-E gap 2).** Build the split P-E names, the grow for both modalities and the veil for the hand only, and capture it, or take the owner's ruling (Q-3 extended). Frosting the world at every Tab is the frame I would least defend (§4).
5. **Clients (row 31).** Adopt at least one more of SPECS §5.1's clients (the NumberField scrub or the dock grasp) on the stage, or narrow the exports to what the Slider needs.
6. **X-11 and X-2 (rows 3, 4).** For X-11 I recommend the value-point read (`ce-probe.mjs` valuept) over the box edge. It is the handle the eye tracks, and a whole-control stretch cannot pass it by construction. A visibility precondition on the body (opacity > 0, non-zero box) closes C-B's vacuity for every family. X-2 is unchanged.
7. **FL-2 and FL-3 (rows 11, 12).** Put `--scale-engage`'s figure on the ladder's engaged row or rule it out. Read the stage under `forced-colors: active` and reduced transparency in a browser.
8. **Footprint under a parent re-render** (P-E §10 item 4): the landing in one frame on release is a D-1 gap on a rare path. Unchanged.
9. **Inherited from P-B (rows 10, 11 (a), 13, 17, 18, 25, 26):** C-B §3's list. E's tree carries every one of them.

## 4 · Gestalt read (REGISTRY §2.5)

Frames: `P-E/glance/pe-*` against `R-E/shots/head-*`, plus my `C-E/shots/{pe,pb}-{chromium,webkit}-{light,dark}-slider-{keyboard-engaged,fling-48ms,fling-settled}.png` and `C-E/glance/`.

- **Slider held (desk).** Grown ×1.06 over the veil. The veil is HEAD's: a soft-edged smudge that frosts the text above and the second slider below while the Switch beside it stays sharp. The world does not recede; a patch of it blurs. The held frame and HEAD's differ by the grow and little else. Heavier than O-87's "slightly less blur" asks (the veil is still `blur(20px) saturate(1.5)`).
- **Slider keyboard-focused.** This is new, and it is the weakest frame. A Tab grows the track 6 % about its centre, so its start pushes 10.8 px out of the text column, and the same smudge greys "before" and "after". On a form with several sliders this repeats at each Tab, and per row 32 it snaps between them. iOS does not recede the world on a focus move.
- **Release and fling.** In WebKit the +48 ms frame shows the track 20 px longer than `pb`'s, readable as a carry. In Chromium it is 1.5 px, unreadable. Over the film the value point carries 6-11 px, which is real and modest.
- **Phone held (WebKit, no backdrop blur).** The held slider's fill reads **paler** than the idle slider beneath it (`pe-webkit-light-phone-slider-held.png`), so the engaged control looks recessed rather than lifted. The 1.4 px thickening is invisible, and the loupe's grey half sits over the paragraph above.
- **Switch, accordion.** Identical to P-B (C-B §4): a flat crest, no visible engagement on hold.

Read: **not iOS-27 grade.** E is the first route whose held slider visibly lifts, and its release visibly carries the hand. The keyboard frost, the hand-off snap and the phone's paler engaged fill are each something a viewer sees in the first second.

## 5 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; P=$E/pass-1; C=$P/C-E; S=<scratch>
git worktree add --detach $S/wt HEAD; git worktree add --detach $S/wtb HEAD
for w in wt wtb; do ln -s "$PWD/node_modules" $S/$w/node_modules; done
git -C $S/wt apply "$PWD/$P/P-E.patch"; git -C $S/wtb apply "$PWD/$P/P-B.patch"
(cd $S/wt && npm run build && npm run typecheck && npm run demo:dist:build && npx vitest run)
for l in pe:wt pb:wtb; do node $H/build.mjs $S/${l#*:} --label ${l%%:*} --app $P/P-B/scenes/App.vue --out $S/out; node $P/R-E/build-glance.mjs $S/${l#*:} --label ${l%%:*} --out $S/out; done
node $H/build.mjs $S/wt --label pec --app $C/scenes/App.vue --out $S/out
zsh $C/battery.sh $S chromium > $C/logs/battery-chromium.log; zsh $C/battery.sh $S webkit > $C/logs/battery-webkit.log
for e in chromium webkit; do node $C/ce-probe.mjs --build $S/out/builds/pec --engine $e; node $C/plant-fallback.mjs --build $S/out/builds/pe --engine $e; done
node $P/R-E/glance.mjs --build $S/out/glance/pe --label pe --shots $C/glance
git worktree remove --force $S/wt; git worktree remove --force $S/wtb
```
