# W-I.8: the ninth pass, verified

2026-11-24. Seat: adversarial verifier of MEASURE-9. Model: claude-opus-5-5 (asserted from its own system identity), in the seat written for Fable; the owner's order of 2026-11-19 puts every seat on Opus. I built nothing, changed no source and staged nothing.

I ran no browser cell. The 1-minute load stood at 44 to 76 while I worked, over the guard's heavy bound of 36, and no claim below needed a run to be judged. The readings come from:

- the pass's logs, rows and strips;
- `git` on `a5a4fe546`, `v11.1.0` (`d19e12559`), `v11.0.2` and `master`;
- the source at the tip;
- `npm view`;
- `~/.claude/guard/log/guarded.log`;
- two counts I ran myself:
  - my own code-line counter and `cloc`, over `git archive` copies in the session scratchpad;
  - `harness/m7/names.mjs` under `guarded --light`.

Paths starting `logs/` or `harness/` are under `.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/`. The strips are in `docs/tranches/BL/design/dock/wi8/fold/`.

## Verdict

**NOT READY holds.** Every red on MEASURE-9's top line matches its log. The budget recounts to the same figures, and G-16 compares like with like. What does not hold:

- One binding witness never ran: ORCH-LINES-7 line 5's WebKit leg.
- A restated published test is counted GREEN although the equal-force plant its ruling names bites in no project.
- G-11's after-frame layouts are put down to the wrong component.
- Four smaller misstatements:
  - one about master;
  - one strip label;
  - three lines on the owner's page;
  - one face missing from the face line.

## What stands

- **M0.** `git ls-remote --tags origin` ends at `v11.1.0`. `npm view @mkbabb/glass-ui` lists versions up to 11.1.0, with `latest` 11.1.0. `release/11.1.1` is a branch with no tag. Nothing is published to merge. Master's commits after the branch point touch no file under `src/`, `tests/` or `tests-visual/` (`git log a5a4fe546..master -- src tests tests-visual` is empty), and v11.1.0 and v11.0.2 are ancestors of the tip.
- **Code lines.** My own counter, run over `git show` of every `.ts`, `.vue` and `.css` under `src/components/dock` with tests left out:

  | ref | files | `wc -l` | code |
  |---|---|---|---|
  | `a5a4fe546` | 43 | 10,267 | **5,180** |
  | v11.1.0 | 44 | 11,081 | **4,741** |
  | v11.0.2 | 43 | 10,489 | 4,375 |

  `useDockBody.ts` has 1,045 code lines. `cloc` reads 5,182 against 4,743, the same difference of 439. Line 2's list sums to 283 plus 64, 347 in all, and 5,180 − 347 − 4,741 = 92.
- **Names.** `names.mjs` gives 78 against 80. `index.ts` and `trigger.ts` at the tip export nine components and one function (`useOptionalDockContext`). No `package.json` subpath exposes more of the dock.
- **G-16, both sides.** Both sides were read the same way:
  - The fixture is the same file on both sides: `harness/m8/g16fix/main.js`, unchanged since `89466c11f` (2026-11-17).
  - The script is the same: `pm/g16fix.sh`, from `15b76128b`, which predates H11.
  - The `node_modules` is the same: the main checkout's, its `vue`, `reka-ui` and `vite` untouched since August and its lock file since 2026-11-11.

  The readings: v11.1.0 104,297 B gzip (`logs/pm-g16-m9-v1110.json`), the tip 104,596 (`logs/pm-g16-m9m-cand.json`), +299. The tip is 1,108 B smaller raw (311,465 against 312,573) and larger gzipped. The unused plant leaves the fixture unchanged, and the used plant adds 2,610.
- **Loads.** `guarded.log` holds 408 starts of this measure's runs in its two windows. Eight started over 36:
  - the second WebKit probe batch at 37 (its rows were set aside and read again);
  - five light server or analysis starts;
  - the 23:57 light server;
  - the WebKit leg of the s1-facepad plant at 39 (printed with its load in M3).

  MEASURE-9 says the same, give or take the 23:57 server. The heavy runs and the browser legs were admitted at 36 or less.
- **The GREEN cells I read in their logs:**
  - g6d passes in both engines (`logs/m9m-g6d-*.txt`: six presses, largest change 0.01 px, no folded row);
  - g9 passes on `p3-swap-xf-fine` in both;
  - `r30m` finds no late turn in 20 runs per engine;
  - level8 reads 12 of 12 in Chromium;
  - G-12's archive lines all pass;
  - the units log ends rc 0, and the types log src rc 0 and test rc 0.
- **The plants on the GREEN gates** bite in both engines, as M3's table says: g1-linger, g1-afterseat, g1-presshold, g3-hold, g6-flow, s6-nogate, g7-provide, g8-hold, g8-exempt, g8-trigger, g8-nohold, g9-scope, g9-three, g13-shown, s5-tab38, s5-trigrun, s5-ctlglyph, s3-nodark, dark, s4-channel and g14-fitsibs.
- **`release-11-0-2.spec.ts:805`.** The contradiction is real. RU-95 as amended for R8-1 orders that "no capsule or track inside any dock carries a lens of its own" (RULINGS-8.md:182), and O-232's published test asserts the active control keeps one. The measure reports it as RED and builds nothing, which is right.
- **The atlas head row.** The reservation `calc(1rem + 3.25rem - 24px + 0.5rem)` is 52 px, and it clears a 52 px folded box by 8 px. A 74 px box overruns it by 22 px, which is 14 px past the 8 px clearance; 14 px across the 44 px folded height is 616 px², in every cell (`logs/m9m-atlashead.txt`). The tokens named (`--dock-corner-inset`, `--dock-control-size`, `--dock-padding-inline` on `[data-preset="controls"]` only) are the ones the sum uses.
- **The one-glyph faces** in face9 read as printed: 40 by 40 (44 at 390), plates 56 and 60, and figure-tools 102 by 56 (110 by 60) (`logs/m9m-cells-chromium.log:5-30`).
- **S6's change to g6d's window** (to the press's `pointerup`) is RU-89's own text: "reads the dock's box from the press to the lift … the fold after the lift is (k2)'s" (RULINGS-8.md:28-34).
- **The coarse skip of the idle fold** is ruled in RU-90's O-268 bullet ("If it is R-2's dock with nothing to tap … the cell skips coarse with that reason").

## Refutations

### 1. ORCH-LINES-7 line 5's WebKit witness never ran (major)

ORCH-LINES-8 keeps line 5 "as written". The line asks for two witnesses: "the O-418 trace cell on the branch shows no `useDockBody` frame forcing layout in the mount task, **and `audit/ro-loop/hold.sh` in WebKit raises no loop error from the dock**." S7 records the cure as built ("`sync("mount")` runs in a frame registered in `onMounted` … (ORCH line 5)", MEASURE-9.md:694), and M1's G-11 row reads "ORCH line 5's cell" from `m9/trace9.mjs` alone (MEASURE-9.md:811). That is the headless shell, Chromium, and the first frame after mount.

- `hold.sh` was not run on this branch. The newest output in `docs/tranches/BL/audit/ro-loop/out/` is `hold-20261116-173606`, six days before line 5 was written.
- No harness file or log of the ninth pass names `hold.sh`, `audit/ro-loop` or O-418 (`grep -rl` over `harness/` and `logs/`).
- G-14's `ro-loop.spec.ts` is O-360a's cell, a viewport resize across a breakpoint mid-morph. It is not the pending-stylesheet hold that line 5 names.
- M8's list of what was not read does not mention it.

The ready list's G-11 clause ("ORCH line 5's cell") is therefore half witnessed: the WebKit loop-error leg is unread and unreported.

### 2. `:1551`'s restatement is counted GREEN although its equal-force plant bites nowhere (major)

RU-90's O-288 bullet: "**Restated:** each item is cut by every ancestor's `clip-path` inset as well … **Equal force is read before the restatement counts**: a plant that removes the regions' lane clips through a fold (g2-nocut's form) turns the restated test RED in all three projects." MEASURE-9 names g2-nocut as that plant twice: "`:1501`, the equal-force plant" (the H table) and "`:1551`'s equal-force plant" (the G-14 plant table, line 968). Under it the restated test passes 8 of 8 in every project:

- `logs/m9m-g14plant-g2-nocut.log`: chromium-headless-new and coarse-touch, 8 passed;
- `.webkit.log`: webkit and webkit-touch, 8 passed.

So by RU-90 the restatement does not count. Two claims follow:

- H4's "`:1501`: GREEN on the tip in four projects" rests on another plant, g14-lane ("the restated item is bitten by the lane plant only").
- M2's "new failures against master: 2" per project leaves O-288 out.

O-288's own test, unrestated, failed on the eighth tip and was not run on this one. This is the eighth pass's fault in a new form: a published cure's test replaced by one whose ruled force is unmet, then counted GREEN. Item 11 of the top line names g2-nocut as a plant that does not bite, but not this consequence.

### 3. G-11's after-frame layouts are DockCrossfade's, not DockLayer's (minor)

The top line's item 7 and M1's G-11 row say the 3 forced layouts after the trigger frame are on w-flow at 4x, "each under `DockLayer` from its resize observer". The trace (`logs/m8-cost.m9m.chromium.json`, `g11.afterOver`) reads `E@DockLayer-ZtVUR0Ty.js:1:1272 < … < h@useResizeObserver-C71BNQ0c.js`. That is a minified chunk's name, not a file:

- `DockLayer.vue` at the tip imports no resize observer and reads no layout. Its imports are `vue` and two contexts.
- `DockCrossfade.vue:109` is `useResizeObserver(rootEl, () => measurePeak())`, and `measurePeak` reads `scrollWidth` or `scrollHeight` (`:91-94`).

S7's own reading on the source-mapped dev server named exactly this ("The 3 after are each DockCrossfade's `measurePeak` on w-flow at 4x", MEASURE-9.md:715). Item 7's wording points the next round at RU-103's DockLayer read, which would cure none of the three.

### 4. "Skipped … as on master" is false for the coarse idle fold (minor)

M2 says the idle fold (`release-11-0-2.spec.ts:727`) "passes in chromium-headless-new and is skipped in the other three projects, as on master" (MEASURE-9.md:883). On master it runs and passes in coarse-touch: `logs/pm-g14-master-chromium-release-11-0-2.log:77`, "✓ 74 [coarse-touch] … an idle fold lays out once per morph frame on a scrolling page (8.1s)". On the tip that leg is skipped (`logs/m9m-g14-tip-chromium-release-11-0-2.log:77`, "-"). The skip itself is ruled (RU-90). Even so, the line reads as parity with master, and it hides that v11.1.0's coarse dock folds on this page (H9: 79 layouts, pass) where the tip's never folds.

### 5. The names strip labels this build "11.1.0" (minor)

`strip-q12-names-9m.png`, second line: "11.1.0: 78 names (9 components, 1 function, 30 props, 16 slots, 11 exposed methods, 11 attributes)". These are the tip's figures. The cause is `harness/m9m/stripsm.py:135`, `who = "11.1.0" if m.group(1) != "HEAD" else "this build"`, while `logs/m9m-names.txt` names the tip `a5a4fe546:`. The owner's page embeds this strip under question 12.

### 6. Three lines on the owner's page misstate the reading (minor)

`OWNER-READ.md`, the 2026-11-22 and 2026-11-23 section:

- **Line 150:** "When a word button's label gets shorter, the button beside it jumps about 106 px in one frame." RU-101 as amended (C8-M2) read the rows: the neighbour glides (842.52, 842.09, 840.74 …), and it is the changed seat's own trailing edge that steps 106 px. The held clause's 105.86 is that seat, not its neighbour.
- **Line 149:** "Three more of the older releases' tests that 11.1.0 passes fail here", followed by two tests, `:849` and `:336`. M2 counts three new failures in all, `:805` among them, which line 148 already gives.
- **Line 154:** "Four are not [caught]" names g2-lane, g14-fitmemory, and g1-lift's and the mark's unit tests. M3's list also has:
  - g2-nocut in all four projects, the equal-force plant of a restated published test (refutation 2);
  - touchcure in Chromium;
  - g6-overflow's keyboard cell in Chromium;
  - g2-curve in both WebKit G-14 projects.

### 7. w-vert's folded face is missing from the face line (minor)

The ready list's G-13 names "the folded-face line on every face whose direct child is a glyph … each one-glyph face square with its folded plate's two extents equal", and RU-120 asks for every face outside the line to be listed with its reason. `w-vert`'s `#collapsed` holds one direct svg (`<Layers class="h-4 w-4" aria-hidden="true" />`, `harness/dock-wi8.vue:448-454`). It folds to 64 by 58 (`logs/m9m-corner9-chromium.txt`, `p3-fold-vert-fine`). face9 neither reads it nor lists it. The top line carries w-vert only as a corner 3 px short (item 9), while G-13 is read "GREEN by the ninth's judges" without it.

### 8. The load rule is applied to the probes and not to the WebKit side cells (minor)

The measure set aside and re-read every probe whose load was over 36 "at their start or end". Four WebKit side cells started under 36 and ended over it, and they were not read again (`logs/m9m-q.log:1065-1099`):

| cell | load at start | load at end |
|---|---|---|
| face9 | 26.7 | 39.8 |
| corner8 | 35.9 | 37.6 |
| atlas9 | 35.9 | 39.6 |
| g7 | 30.1 | 42.7 |

G-7's WebKit GREEN rests on that g7 run. Read by start load, as the guard reads it, all four stand. The pass does not say which rule it used for side cells.

### 9. One item on the top line is not a failing line (minor)

Item 11 lists "the unit witness of G-1 (f) under g1-lift" among the plants that do not bite, and the GREEN line qualifies G-1 by it. RU-73 names the unit witness's plants: "the press hold removed … and the linger timed from the press" (RULINGS-7.md, RU-73). Both bite the unit (`logs/m9m-plant-g1-presshold.txt`, `m9m-plant-g1-frompress.txt`: 2 failed each). g1-lift models the early-scheduled linger, which RU-73 says "no longer exists". G-1 meets its ready-list clause outright.

### 10. G-9's Chromium rest is misquoted (minor)

M1's G-9 row reads "rest 0 and 1" for Chromium. The log reads "rest first 1 last 1" in both engines (`logs/m9m-g9-chromium.txt`).

## Dropped on the second reading

- **G-1 not GREEN in WebKit by RU-73.** RU-73's two named plants bite the unit, and g1-lift is an extra plant (now refutation 9, the other way round).
- **G-8 unwitnessed in Chromium because touchcure does not bite there.** RU-72's touch fault was WebKit's (RULINGS-7 C7-M13), so the plant claims WebKit, where it bites.
- **S6 moving g6d's window end.** RU-89 reads the press cell "to the lift", and the fold 1.4 ms after the `pointerup` is (k2)'s by the same text.
- **The light hover at 6.5 % reversing question 18's final text.** RU-94 as amended (R8-2, C8-M4) picks the step per scheme on the reading over four docks. S4's reading put light at 6.5 % (canvas-tools flat 1.098 at 5 %), and the owner's page and the strip say so.
- **The plate rule listed as failing though ORCH-LINES-8 line 3 confirmed 0.7.** RU-105 asks the top line for every failing line of every judge, and the rule's clause 1 does fail on the pill.
- **RU-90's coarse witness for O-262** (the rail cell at 390 with its plant). g2-touch removes the same RU-43 rule and bites (`logs/m9m-plant-g2-touch.txt`), and `rail9` read the rail's rest on the tip.
- **The WebKit `release-10-1-3` failures.** They came during the load-308 stall, the void rule applies, and the re-read at 31.6 passes.
- **O-386 with no plant.** RULINGS-7 C7-7 asks for a plant only if the extents differ and a cure is built.
- **G-16 RED being an artefact of the fixture.** The file, the script and the `node_modules` are the same on both sides.

## What the owner would see

The strips show a tidy dock:

- The card, rounded and pill docks fold to true 56 px discs.
- The controls dock rests as one round button and opens cleanly in both browsers.
- The dialog and menu frames are orderly.
- In dark, at the default third step, the plate still lets the page through: 1.44 to 1 off the warm page, and 0.10 of the near-black grid. It reads as tinted glass, blurring 11.2 px where every card blurs 16.

He would question three things:

- The icons at nine tenths of the button dwarf the tab words and outweigh everything else on the dock. In light the theme toggle is a solid black sun (questions 10, 18, 21 and 14).
- Question 5's folded rounded dock is an empty disc with nothing on it.
- In question 14 the legend is pushed 36 px aside when the figure dock opens.

Selection shows on every frame, but it is weaker than he has been told:

- At this build's light hover (6.5 %), a hovered Home stands 1.08 to 1 from the current Reports and nearly reads as a second current page. That is the eighth build's complaint, only slightly eased.
- In dark, dials's selected 5Y falls from today's 7.69 to 4.49 to 1, on a fainter highlight (1.29 against 1.53).
- The names strip calls this build's 78 names "11.1.0".
