# W-I.8, the eighth fold

2026-11-22. Seat: fold. Model: claude-opus-5-5, asserted from my own system identity, in the seat written for Fable; the owner's order of 2026-11-19 ("No fable usage for now") puts every seat on Opus.

This folds the three challenges to `RULINGS-8.md` into that file, in place: `challenge-8-restraint.md` (R8-1 to R8-12, in its own order 1 to 12), `challenge-8-measurement.md` (C8-M1 to C8-M20, its order 1 to 20) and `challenge-8-consumers.md` (C8-1 to C8-16). Every accepted objection is a paragraph in its ruling that begins *Amended (fold 8: id)*. The lists that close `RULINGS-8.md` are the fold's and the one source of record; the ruling seat's versions are struck to a pointer, so no seat reads two sets of drafts or two ready lists.

I read, reasoned and wrote. I ran no browser and no build, changed no source, and staged nothing. `OWNER-READ.md` is not edited; the folded question texts close `RULINGS-8.md` for the seat that owns that page.

## What was read

In full: `RULINGS-8.md`, the three challenge files, `fold-7.md`, `ORCH-LINES-7.md`. In part: `MEASURE-8.md:599-603`; `RULINGS-7.md`'s questions 19 to 21; `RULINGS-2.md`'s RU-14; `LEDGER.md:55`; `OWNER-READ.md:15-18`, `:104`; `audit/triage-1119/PLACED.md`'s atlas G9 and G12 rows; `audit/dock-usage/SURFACE.md`'s count method; `docs/precepts/restraint.md:15-70`, `:170-200`; the canon (`~/.dev-logs/feedback-canon/CANON.md`), searched for the ledger's three quotes, C-4, C-89 and C-97.

To check the evidence, on the worktree `.claude/worktrees/bl/dock/wi8` at `fa89416d6`:
- *Rows and logs*, tabulated by me: `rows/pm/p6-words-fine.wi8.{chromium,webkit}.1440-fine-light.rows.json.gz` (seat#0 to seat#2 and the plate, Chromium rows 43 to 49 and 150 to 156, WebKit rows 32 to 38 and 111 to 117); `rows/pm/p6-press-fine.wi8.chromium.1440-fine-light.rows.json.gz` (the dock's class at every mark); `logs/m8-plate-pm-q10grid.chromium.json` under `pm/rule67.py`'s filter (show-through per dock, posture, scheme and rung).
- *Harness:* `m6/read6.mjs:1-50`; `m8/judge8.mjs:1-40`, `:270-295`, and a grep for an outline clause; `m8/ink8.mjs:10-18`; `m8/cost8.mjs:1-12`; `pm/rule67.py:1-60`; `scenarios-m6/p6-press-fine.json`; `m8/comp/pill.stage.vue`.
- *Source at `575084358`* (by `git show`): `useDockBody.ts:1-4`, `:438-470`, `:755-770`, `:1285-1312`; `dock.css:250-285` and its `box-shadow`/`backdrop-filter` lines; `shell.css:50-60`, `:165-178`; `icon-button.css:205-222`, `:243-244`; `adaptive-legibility.css:100-116`; `glass/glass-capsule.css:50-90`; `glass/material.css:134-162`, `:276-302`; `glass/a11y-fallback.css:1-55`; `tokens/glass.css:55-92`, `:130-138`; `tokens/sizing.css`'s two fill lines on the tip and on `v11.1.0`; `dark-mode-toggle.css:1-75`; `styles/controls.css:54-72`; `DockControl.vue:84-95`.
- *Git on the main checkout:* `git merge-base --is-ancestor v11.0.2 99a1389e6` (false); `git diff --shortstat 99a1389e6 v11.0.2 -- src/components/dock` (15 files, +211 −71); `git diff --stat v11.1.0 release/11.1.1 -- src/components/dock` (6 files, +64 −14; `release/11.1.1` is `10c8e23c9` here, where the challenger read `ce5f320b7`); the tags (`v11.1.0` is the last 11.1.x).
- *Consumer trees, read only with `git show` and `git grep`:* fourier-analysis `origin/master` `266bd67` (`shape="card"`, `AnimationControls.vue:280-296`; the three `--dock-trigger-min-height` lines); daraksha `origin/master` `24a6dbd` (`package.json:32`; every "11.2.0" marker under `src`; `styles.css:58-61`); gaggle-site `898cea9` (`report/page/PageDock.vue:78-82`, `:184-190`; `dashboard/package.json:15`); value.js `d7df97f9e` (`demo/styles/foundation.css:975-986`); gregg's working tree (`src/style.css:1040-1048`); Home Assistant `apx/ui-r13` `ce9eddf6` (`--dock-tab-h`, `--dock-control-active-bg`, the open-seat tokens, `--dock-trigger-min-height`); atlas `u/o18-atlas` `f79d949` (`package.json:118`, `:147`; `PlateControls.vue:6-12`; SegmentedTabs imports); `sci-report/atlas/docs/tranches/U/design/OWNER-1117-GLASS-ROWS.md:5`, `:21-24` on disk; speedtest `glass-10.1` `4af04ba0` (`register.css`'s blur and level lines; `package.json:101`).

Not read: the strips as images. Where an objection rests on a strip's label or pixels (R8-1's channel colour, R8-3's light readings, R8-9's flat hover row, C8-M5's dark hover readings), I took the challenger's reading as given and say so in the ruling.

## The count

Forty-eight objections: 2 blocking, 23 major, 23 minor. Forty-five accepted, two accepted in part (R8-4, C8-M4), one rejected (R8-11). Both blocking objections were checked against their rows, their harness lines and their source lines, and both hold.

## The blocking objections

**C8-M1, accepted.** read6's curve clause is the one reading of content against the plate's rounded outline (`m6/read6.mjs:22-24`). judge8 reads the plate's own corner (`:276-295`) and the lanes, and holds no outline clause. RU-91 changes the outline on every tall dock, so retiring the clause would remove the one reading that could show content past the new corners. The clause stays as "content inside the plate's outline"; only g2-curve retires, and RU-91's own plant (`--radius-dock` back on the root) becomes the clause's plant on w-tall and every cell taller than one row, RED in both engines.

**C8-M2, accepted.** The rows refute RU-101's cause. Chromium row 46: the changed seat goes from 179.09 to 284.95 px wide in one row while its neighbour stays at 789.31 (789.45 before) and the plate does not move; then the neighbour and the plate glide. Row 153 and WebKit's rows 35 and 114 read the same. The source already carries the neighbour: `onResize` calls `sync("ro")`, and `sync` calls `readSeats(!postureChanged && posture)`. So the cure RU-101 ordered already exists and could not turn its witness GREEN. What fails is the changed seat's own trailing edge, and on growth that seat lies about 98 px over its neighbour for the glide. RU-101 is re-ruled: a strip of w-words first; by default the changed seat's painted width glides with the carried edge; read6 keeps its held clause and gains a no-overlap clause, which the tip fails; the "about 10 lines" is struck.

## The one rejection

**R8-11 (RU-102: offer to delete `shape`'s `card` and `rounded`).** Its count is wrong at the consumers' current refs: fourier passes `shape="card"` at `origin/master` `266bd67` (`web/src/components/visualization/AnimationControls.vue:289`), and atlas wrote that it "will not adopt either shape until it is cured" (`OWNER-1117-GLASS-ROWS.md:24`), so both values have a user and a stated next user. C8-3 decides RU-102 instead.

## Every objection

| id | ruling | severity | disposition | what changed in RULINGS-8, or why not |
|---|---|---|---|---|
| R8-1 | RU-95 | major | accepted | The track's lens and the indicator's capsule lens go with the channel: `adaptive-legibility.css:109` loses its static qualifier, so no capsule or track inside any dock carries a lens; the track and the indicator take `box-shadow: none` inside `.glass-dock`; an active icon seat's computed `box-shadow` is read and layers past one go. Checked: `glass-capsule.css:57`, `:66-69`, `:79-85`; `adaptive-legibility.css:105-112`; `icon-button.css:207-219` |
| R8-2 | RU-94 | major | accepted | Fold 7's order restored: the current step by the words and the mark bound alone, never raised for the hover; the hover per scheme the weaker of 5 and 6.5 % that reads 1.1 against the dock; hover against current printed on question 18 and never a bound. Merged with C8-M5 |
| R8-3 | RU-93, question 10 | major | accepted | Question 10 again states the light plate's cost with the three readings (1.30 against 1.20, 1.64 against 1.53, 1.31 against 1.21) and the greyer white page; "Light keeps the first step" struck. The readings are the challenger's from the strip labels; the daraksha draft's own figures agree |
| R8-4 | RU-109, question 22 | major | accepted in part | Ledger rows cite a canon id with its quote, a published cure's commit, or a consumer's file and line, never `OWNER-READ.md` (its three quotes are not in the canon, searched). The rows are re-sourced (C-97, the 2026-11-12 tween law, C-89, atlas's L-21, RU-43 from atlas, daraksha's and fourier's files). The pose and trace block cites none and goes, except the marks a ruled witness reads. Question 22 splits his asks from the sites'. Rejected: moving the block out of `src/components/dock` behind a hook, which moves lines out of the count instead of removing them, against ORCH line 2 ("A count that passes by deleting prose does not answer them") |
| R8-5 | RU-108, question 22 | major | accepted | Question 22 states the bound, not a result. Merged with C8-M10 |
| R8-6 | RU-93 | major | accepted | The level scales the dock's blur (`shell.css:54-58`, `:170-175`; radius 16 px, `tokens/glass.css:71`), so dark 0.7 blurs about 11.2 px against 16 elsewhere (arithmetic). The ninth measure reads the computed value beside a dark card's; question 10 and every draft that names the firmer dark plate say so |
| R8-7 | RU-93, RU-111 | minor | accepted | The level is a token, `--glass-level-dock` (1 at `:root`, 0.7 under `.dark`), read by `.glass-dock` and by the recipe; no site writes 0.7. It is a custom property, outside SURFACE.md's count (78 stands). Merged with C8-5 and C8-12 |
| R8-8 | RU-96 | minor | accepted | RU-96's rule is withdrawn: the toggle's 0.8, its transition leg and its two lifts to 1 are deleted at the root, and its hover reads `--dock-control-hover-bg`. The existing arm (`dark-mode-toggle.css:59-72`) already sizes it in a dock. About four lines out where five were to go in |
| R8-9 | RU-94, RU-92 | minor | accepted | The pointer-following catch-light leaves every dock control: the dock selectors out of `material.css` and `glass-specular-track.css`, two classes off `DockControl.vue`, the sizing block at `styles/controls.css:54-70` out. Restraint's text is explicit ("No specular highlight … cursor light"; the ceiling's gleams 0), and its rule 2 says it overrides earlier asks for specular |
| R8-10 | RU-100 | minor | accepted | Question 20 states the trade of rule 4's normal glyph against rule 8's "less padding" (22 px in a 44 px seat); no gate, no line; the default stands |
| R8-11 | RU-102 | minor | rejected | See above: fourier passes `shape="card"` (`AnimationControls.vue:289` at `266bd67`), and atlas will adopt both shapes once cured (`OWNER-1117-GLASS-ROWS.md:24`) |
| R8-12 | RU-104 | minor | accepted | One rule for the three plants that bite nothing: a clause stays only if its plant can bite something painted. g9-scope is read as a crop on slides's tiers and the edge, and G-9's clause is added only on a painted difference (with C8-M17's length form). g13-box retires if no form bites, with C8-15's exception for daraksha's reading |
| C8-M1 | RU-91 | blocking | accepted | See above |
| C8-M2 | RU-101 | blocking | accepted | See above |
| C8-M3 | RU-93 | major | accepted | The rule is printed per dock; floor docks (canvas-tools, chrome, the folded rail) leave it; each dock is compared with its own light reading. Read per dock, no rung meets both clauses everywhere: 0.7 meets clause 2 on all seven and clause 1 on five, failing on the pill (0.213 against 0.165 folded); 0.55 meets clause 1 on all and clause 2 only on the pill. 0.7 stays on clause 2's ground (the near-solid dock the owner turned down), the pill's figures go to question 10, and "the grid is gone at 0.55" is corrected. The challenger's figures match my tabulation exactly |
| C8-M4 | RU-94 | major | accepted in part | ink8 reads nav, action-row, canvas-tools and dials at 5, 6.5 and 8 % hover and 10, 12 and 14 % current before a step is fixed; questions 18 and 21 show the bounds on several docks; G-15 is scored at 1.2 and 1.1 labelled as those questions' defaults, with v11.0.2's floors printed beside. Rejected: "they do not call G-15 GREEN" until the owner answers, since every owner question carries a default and the work goes on with it (ORCH-LINES-7, "The owner's questions") |
| C8-M5 | RU-94 | major | accepted | With R8-2's order, hover against current is printed, not a bound, so the three bounds no longer need to compose (two 1.1 clauses would need 1.21). The order of precedence is ruled: words, then the mark bound, set the current step; the hover yields. Question 18's dark figure corrected to 1.08 |
| C8-M6 | RU-94, RU-97 | major | accepted | The fill is read from a twin shot with the seat's direct glyph `visibility: hidden`, as the content box's modal colour, crops saved; RU-97's question answered by the same reading. Checked: `icon-button.css:243-244`; `ink8.mjs:14-15` |
| C8-M7 | RU-89 | major | accepted | Home's press moves last; each press asserts the dock open, and a press on a folded dock voids the cell. Checked: every mark from `in-read` reads `collapsed` in the Chromium rows |
| C8-M8 | RU-104 | major | accepted | The plant is a fade of at least 66.7 ms with a one-frame step inside it (1 to 0.85 over 40 ms, a one-frame drop to 0.25, 40 ms to 0), RED in both engines; each engine's sample interval printed |
| C8-M9 | RU-103 | major | accepted | G-11 also reads the landing frame and the two after it, no Layout under a script stack, and the morphing-gate plant there |
| C8-M10 | RU-108 | major | accepted | The arithmetic is withdrawn (the base predates 11.0.2: `merge-base --is-ancestor` false, +211 −71 between them; the 1.6 KB is an entry figure line 1 set aside). v11.1.0's fixture is read before the orchestrator is asked, with tip minus v11.1.0 as the redesign's growth and the "net-negative" reason; the value.js draft drops the attribution. Merged with R8-5 and C8-4 |
| C8-M11 | RU-109 | major | accepted | The ceiling is 5,246 plus the code lines M0's merge carries, each named; every listed cure is projected, the omitted ones included; over means a named removal before the build. The budget table is rebuilt: about −75 and +23, projection about 5,194, about 52 under the ceiling before the read items |
| C8-M12 | RU-109 | major | accepted | The 4,741 reading is labelled a hypothesis (344 of 1,094 lines, `MEASURE-8.md:601`); H12 reads the 750 unlisted lines and the other files' growth for shorter forms, and the ask of the orchestrator goes with that count |
| C8-M13 | RU-103 | major | accepted | The O-418 cell also mounts a site's count of docks and counts forced layouts in the first frame; more than one is a fault, cured by one frame batch (reads, then writes); the atlas line states the reading. Merged with C8-16 |
| C8-M14 | RU-93 | minor | accepted | WebKit's agreement and "in both engines" struck; line 3's WebKit leg is owed to the owner's Safari look. Observation 6's row carries the same note |
| C8-M15 | RU-90 | minor | accepted | The rail's rest class under coarse touch on `rail-harness` is read before the skip; if it rests folded, the refused morph is a fault |
| C8-M16 | RU-92 | minor | accepted | The restated light-fill test compares literal colours mixed in the test from the dock's computed ink; plant, the hover token at 8 % |
| C8-M17 | RU-104 | minor | accepted | If G-9's root clause is added (R8-12), it carries RU-70's length form and a plant that compresses the progress to three frames |
| C8-M18 | RU-110 | minor | accepted | The failing frame is read for a cause first; any red frame in any run is a fault; the five runs are never a pass. The twenty-run option is not taken: a red frame already settles it |
| C8-M19 | ready list (G-15) | minor | accepted | A words cell under 4.5 on the warm figure ground in dark is named under question 21's default and not RED if it reads no lower than v11.0.2 on the same cell (3.26 shipped); any other is RED. The v11.0.2 floor is the fold's, so a regression there still fails |
| C8-M20 | RU-91 | minor | accepted | A cell `w-tallrow` (`--dock-tab-h` above the control size) reads its resting corner against half its painted cross extent; a one-row dock that is not a capsule fails RU-91's first sentence, and its cure is read and projected |
| C8-1 | RU-94, gaggle draft | major | accepted | RU-94 names the reach change and gaggle's report dock as its one site (`PageDock.vue:186-189` at `898cea9`, checked); the gaggle draft gives the move to `.r-dock-seat .glass-dock` |
| C8-2 | RU-98, RU-90, HA draft | major | accepted | Home Assistant struck from RU-98's list (no `--dock-tab-h` or fill override at `ce9eddf6`, checked); its draft is rewritten: tabs to 40 px, the open-seat tokens unread so the current tab hugs its word from 600 to 1023 px and LF-47 is answered, the LF-11 rule can go, the stale lines gone. Every site is grepped at its current ref before a draft goes |
| C8-3 | RU-102, atlas draft | major | accepted | RU-102 reversed: a folded card or rounded dock is a disc, as the eighth tip already paints it, which is atlas's expectation and the owner's "almost always rounded"; fourier's card never folds, so no shipped dock moves; no source line is added. Question 5 and the atlas draft say so |
| C8-4 | RU-108, question 22, drafts | major | accepted | Required before the tag: daraksha's heaviest page built against the ninth pack with its 11.2.0 deletions, in a worktree of its `origin/master` or by value.js on the tarball, read against 125 KB; the daraksha draft and question 22 carry the result. The split is stated as it was asked (preloaded on idle or first approach, so no fold waits), and "the first fold would wait on it" is struck from RU-108's reason |
| C8-5 | RU-111, RU-93 | major | accepted | Answered by R8-7's token: the brackets set the token, so a plate on the recipe takes them; `level8` gains the recipe's plate under reduced transparency and more contrast, and a `.glass-dock.dark` in a light document under reduced transparency |
| C8-6 | RU-111, daraksha draft | major | accepted | The daraksha draft says the fission seat is booked for 12.0.0, that the site keeps its seat, neck and `follow()`, that RU-35's three outputs stay through 11.2.0, and that `--radius-dock: 9999px` can go. Checked: `SiteDock.vue:70-80`; RULINGS-2 RU-14 |
| C8-7 | RU-96, drafts | minor | accepted | The keyframes, gaggle and slides drafts each carry the toggle's line; with R8-8 it also changes outside docks |
| C8-8 | RU-92, gregg draft | minor | accepted | The gregg draft says the `(hover: none)` reset can go and that keeping it leaves no press fill on touch (`style.css:1043-1047`, checked) |
| C8-9 | RU-98 | minor | accepted | The Count names atlas's three cockpit docks, none with a tab seat |
| C8-10 | RU-99, drafts | minor | accepted | The fourier draft names all three lines; the Home Assistant draft names `styles/scale.css:157` |
| C8-11 | RU-89, drafts | minor | accepted | RU-89's fact corrected (atlas pins 10.1.0, checked); the atlas, slides, speedtest and daraksha drafts each open with what reaches them from their own version |
| C8-12 | RU-93, value.js draft | minor | accepted | The value.js draft says to set `--glass-level-dock: 0.1` in its more-contrast block (`foundation.css:980-986`, checked) |
| C8-13 | RU-95 | minor | accepted | The witness moves to `w-segpair`; the dials cell is relabelled and attributed to no site; question 21 and the demo stop calling it atlas's; the atlas draft says its popover dials are unchanged |
| C8-14 | RU-111, question 12 | minor | accepted | The README names `data-morphing` as the public morph signal (the order's S9, the ready list and the atlas draft); question 12 says which release removes the search helper and why 11.2.0 is allowed |
| C8-15 | RU-104 | minor | accepted | daraksha's O-357 (3) reading (hidden seats of a folded ControlsDock report no rect outside the plate, on daraksha's composition, both engines) stays as a witness whatever g13-box does |
| C8-16 | RU-103, atlas draft | minor | accepted | Merged with C8-M13 |

## What changed beyond the objections

- The header names this fold; observation 6's WebKit figure carries C8-M14's note.
- "Asked of the orchestrator" now has a third item: line 3 read per dock, with the tie-break RU-93 uses, to be confirmed or restated.
- "What I did not decide" is replaced by "What is left open", which names the H item that answers each.
- The ninth-pass order gains H3 (the outline clause and `w-tallrow`), H6 (the plate per dock and the blur), H10 (the w-words strip), H11 (v11.1.0's fixture before the ask), H12 (the 750 lines and the projection) and H13 (the current-ref grep); S3 is the token; S5 no longer writes a folded finite corner; S9 is the README.
- The REMOVES list gains the pose and trace block, the catch-light, the toggle's dimming and the lens rows; "Not removed" gains `shape`'s two values and G-2's outline clause.
- The budget table is rebuilt from the struck and added estimates; question 22's figure moves from about 480 to about 450 lines.
- Every draft that names the dock's fills says the pointer-following highlight is gone and gives dark's hover as 5 to 6.5 %; every draft that names the firmer dark plate also names its blur.

## Found while reading, not ruled

- The plate's own `box-shadow` is three layers (`dock.css:96-98`), and restraint's ceiling allows one (the restraint challenger's finding, unchallenged and not this round's).
- The dock's press is a scale over the 2 % fill (`--scale-press-dock`), and restraint says "no press indent" (C-39). Not this round's.
- The pill's dark show-through falls more slowly with the level than any other dock's (0.242 to 0.213 from level 1 to 0.7, where nav goes 0.166 to 0.102). The tabulation does not say why; H6's per-dock print can show whether the pill's folded disc, its size or its place on the grid causes it.
- `release/11.1.1` reads `10c8e23c9` on this checkout, where the measurement challenger read `ce5f320b7`; the dock diff against `v11.1.0` is +64 −14 on both. M0 reads whatever is published by then.

## Second round (2026-11-22)

The same seat and model. A completeness check found eleven items `RULINGS-8.md` did not dispose of; they are K8-1 to K8-11 here, in its order. Each is ruled in `RULINGS-8.md`'s new section (k) as RU-112 to RU-122, with a one-line pointer in each earlier ruling it changes (RU-91, RU-102, RU-104, RU-105, RU-107, RU-109, RU-111). I ran no browser and no build, changed no source, and staged nothing.

### What was read

- *Git, on the main checkout:* `18f543021`'s message; `git diff aeb6f3ee7 575084358` on the tests S1 restated (`collapsed-face-content-sized.test.ts`, `dock-hover-corner.test.ts`, `GlassDock.idle-window.test.ts`, `GlassDock.persistent-face.test.ts`, `GlassDock.press-posture.test.ts`, `g-dock-lattice.test.ts`'s selection line, `tests-visual/release-10-1-2.spec.ts`, `tests-visual/release-11-0-2/hover-harness.ts`), and master's `dock-hover-corner.test.ts` head; `fca26fdbb`'s message and its place in `v11.1.0`.
- *Source at `575084358`* (by `git show`): `shape.css`; `run.css:620-660`, `:755-770`; master's `run.css` cross-extent lines; `morph.css:52-182`, `:236-250`, `:277-285`; `density.css:268-335`; `ControlsDock.vue`; `DockControl.vue:20-140`; `tokens/glass.css:70-95`, and a grep for blurs that compose `--glass-level`.
- *The worktree's logs:* `logs/s8-face-pm.{chromium,webkit}.json` (all 24 rows), `logs/m8-atlas-pm.chromium.json` (every plate box), `logs/m8-plate-pm-q10grid.chromium.json` (its keys), `logs/pm-units.log`'s failures.
- *Records:* `MEASURE-8.md` part S (S1, S5) and M1 to M3; `verify-8.md` §8 to §11; `ORCH-LINES-7.md`; `RULINGS-6.md`'s RU-52; `challenge-8-consumers.md:61` (LF-47); `audit/triage-1119/PLACED.md`; `~/.dev-logs/owner-1112/IDIOM-TOPBAR.md`; `sci-report/atlas/docs/tranches/U/design/OWNER-1117-GLASS-ROWS.md:15-30`; `driver/dock-rulings-8.js` for the orchestrator's observation 4 and the check's text.
- *A consumer tree, read only:* fourier `266bd6728`, `StageDock.vue`'s header.

### The count

Eleven items, all accepted. Two carry findings beyond the gap as stated: K8-1 found that `collapsed-face-content-sized.test.ts`'s restatement lost the clause that kept a one-glyph face square, and that the loss already shows on the tip (the folded one-glyph ControlsDock is 68 × 52 px in every atlas cell, both engines); and that `release-10-1-2.spec.ts`'s restated reservation reads the same expression as its rest size, so it cannot fail on the fault it was written for. K8-2 withdraws a ready bound instead of confirming it.

| id | the gap | ruling | disposition | what changed in RULINGS-8 |
|---|---|---|---|---|
| K8-1 | S1's restated tests carry no ruling or equal-force reading | RU-112 | accepted | The first-move restatements, the selection line and the hover harness stand (no expectation changed, or stricter). `dock-hover-corner`'s one-cell and two-cell finite cases stand (RU-102's disc is the one-cell face; the two-cell 16 px is atlas's F-20 cure); its pill case returns to master's `--dock-cap-rest` with RU-91. `release-10-1-2`'s O-101 and O-101a cells move to the painted plate, with a stale-target plant RED in three projects. `collapsed-face-content-sized` regains a padding clause, and the face's padding becomes the room its floor leaves the glyph (one value), with a box clause on G-13's face line and a plant. O-360a's `ro-loop.spec.ts` witness noted as passing. RU-91 and RU-102 carry pointers; question 5 and the atlas draft name the two-cell bar |
| K8-2 | the code-line budget restated to the tip's own count, with no completed reading | RU-113 | accepted | RU-109's clause (1) ceiling is withdrawn as the ready bound; ORCH line 2 binds as written (4,741). The ceiling stays as the ninth build's rule against growth. The ask waits on H12 and H13, and carries line 2's list of the code that could still go. A restated bound, if asked, is fixed before the ninth count; one form is offered, not ruled. The ready list, the budget table, the ask, question 22 and H12 change |
| K8-3 | O-415's rules 2, 4, 5, 8, 10, 11 and 12 not placed | RU-114 | accepted | Each clause given to glass, its demo or the sites, with its source. New: G-1 (f) and G-8's menu hold on `w-ctl`; the README's `within` line names the top bar's `viewport`; the fourier draft's `within` sentence; bl/demo's top-right bar by rules 2 to 4 before the tag |
| K8-4 | the study's 11.2.0 placements G2 and G3 not named | RU-115 | accepted | G2: G-2's fade clause, G-1 (i) and the overlay hold; the 4x-throttle cell is 11.1.2's and arrives through M0 or the merge before the tag. G3: G-4's seat-set clauses. Nothing added to the pass |
| K8-5 | the Home Assistant draft names LF-47 | RU-116 | accepted | The sentence names the ask in plain words. Every message checked for an id token after the round |
| K8-6 | the daraksha draft names the firmer dark plate without its blur, and the fill without the gone highlight | RU-117 | accepted | The neck bullet gives the blur (about 11 px against 16) and says the recipe lowers the neck's blur alike; the ornament bullet refers to it; the `active` bullet gives the hover step and the gone highlight |
| K8-7 | the fourier draft keeps "the eighteen reds booked" | RU-118 | accepted | Rewritten to what the site sees; the StageDock bullet gains the `within` line (RU-114) |
| K8-8 | g6-overflow bites WebKit only, and no rule covers its Chromium leg | RU-119 | accepted | Read again on the press cell once H1 makes it readable, biting only on the end seat's 4 px (RU-52's own Chromium record); otherwise the clause claims WebKit only. H2 and the G-6 ready line change |
| K8-9 | S5's unjudged faces have no disposition | RU-120 | accepted | From the face rows: four docks have no face, rail's is its persistent seats, two are composed (R7-8), chrome's is RU-105's. Each is listed with its reason; the ready list's "folded faces" defined |
| K8-10 | M1's four archive-tree unit failures not named | RU-121 | accepted | The four named with their missing inputs; the units run on a tree with `docs/`, a `dist/` and no measure page in `demo/__anim`, master's alike, and scored like any test |
| K8-11 | verify-8's Q14 ground point not ruled | RU-122 | accepted | Every Q14 row on the build page's ground, or the pair both on the dev page, named on the label |

### What changed beyond the items

- The header names the second round; the top-line, Part S and verify-8 tables cite the new rulings.
- "What is left open" gains the face's box, the stale-target bite and g6-overflow's Chromium bite, and line 2 leaves "whether the orchestrator confirms".
- The ninth pass's order changes in H1, H2, H4, H7, H12, H14, S1, S9 and M; the ready list in G-1, G-6, G-8, G-13, G-14, the code lines, the README, the units and the before-the-tag list. The budget table splits the bound from the build's own ceiling.
- Question 5 names the two-cell bar; question 22's default no longer reads as a ready bound.
- The atlas draft names the two-cell bar.

### Found while reading, not ruled

- The first-move restatements move the pointer to a random x (`1 + Math.random() * 999`), so each run differs. It cannot make a case fail in practice, and the cases are left as they are.
- `ControlsDock.vue`'s header lists "the theme seat" among its uses. That fits a corner dock; the top-bar idiom keeps the theme out of the page's top bar (rule 2), which binds the bar's contents, not the component.
