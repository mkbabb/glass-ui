# Orchestrator note (Fable second look, 2026-11-10): for fix seat 12, critic 13 and the close seat of 10.1.5

Reviewer: claude-fable-5-2, read-only. I read the precepts, INBOUND O-185 to O-222, every critique, fix record, inbound brief and orchestrator note here, the `src` diff over `v10.1.4`, and the critic-12 captures. Nothing below restates a record that is already right. Paths are relative to this worktree unless they start with `/`.

`critique-12.md` is still a draft: it carries the placeholders `WEBKIT-C12A` and `RUNS-SECTION`, and `critic-12/branch-wk.log` was still being written at 22:08. Fix seat 12 does not start from it until those are filled.

## 1. Why twelve rounds have not converged

There are two causes, and either alone would have prevented two clean rounds.

**The scope never froze.** About twenty inbound rows entered between rounds 2 and 11 (O-132, O-133, O-150, O-155, O-156/O-165, O-157, O-159 to O-162, O-166, O-167, O-176, O-177, O-182, O-186, O-187, O-193, O-201, O-205, O-207). Rounds 4, 7 and 11 each opened with inbound rows no fix seat had yet taken, and more rows landed mid-round in rounds 5, 7, 9 and 10, so those rounds could not have been clean whatever the code did.

**One root regenerates.** The r1 cure made the run's reserve scrollable content and later made a script-published flag (`data-run-fits`) switch that reserve between whole and yielded. From then on the run's scroll range, clip, snap, reach and fit depend on each other, and every round but round 6 found a defect that the previous round's cure of this same mechanism introduced. The critics say so in their own words ("introduced by the M2 cure", "introduced by fix 8", "introduced by fix 9", "a door fix 10's key leaves").

| round | this root (reserve, yield, flag) | other |
|---|---|---|
| 1 | D4 reserve too small | D1 to D3: first-build Slider and type regressions, closed and never seen again |
| 2 | E1, E2 reserve basis; E3 reserve widens the clip (from fix 1) | E4 g7 red (records) |
| 4 | H1, H2, H3, H5 (from fixes 2 and 3) | H4 latent; H6 comments; O-133, O-150 new inbound |
| 5 | K1, K2, K3 (from fixes 2 to 4) | |
| 6 | | L1: new ground, pre-existing (an inactive scroll timeline holds its last keyframe) |
| 7 | M2 vertical yield unbuilt; M4 reserve against snap | M1: L1's root again, under `.collapsed`; M3: eight new inbound rows |
| 8 | N1 (from fix 7's M2 cure); N3 yield against ring | N2 witness and records |
| 9 | P1 (from fix 8's N1 cure); P2 | P4: new ground, unattributed |
| 10 | Q1 (from fix 9's band): P1's ground, a narrower door | Q2: regression of the O-187 cure; Q3 pre-existing |
| 11 | R2: N3 reversed by the owner (O-201); R4 (from fix 10's key): P1's ground again, narrower still | R1: L1's root a third time (O-205), now cured at the root; R3 new inbound; R5, R6 load flakes |
| 12 (draft) | S2: the vertical half of R2, left open by fix 11 | S1: new ground, pre-existing; S3: O-207 G3 widened to the remaining readers |

Twenty-one findings sit in the left column. P2, Q1 and R4 are the one clear case of minting over the same ground: three successive, narrower ways for a host to move the dock's room during the 550 ms expand, each read against P1's 0.5 px gate, each cured by one more piece of state (`ENDPOINT_BAND_PX`, `constraintOf`, `hostMoved`, the root-style observer; `src/components/dock/composables/dockMorphMeasure.ts:146-165, 202-204, 510-516`). Each is correct by the gate's letter. The loop is the defect.

Instruction: the orchestrator freezes the scope at O-207 (no row dated after 2026-11-09 enters 10.1.5; later reports go to 11.0.1), and the remaining critics gate on the list in item 2 and nothing else.

## 2. The finite invariant list the remaining critics gate on

A round is clean when the release spec is GREEN in both engines on the tip, g6 and g7 are GREEN, and no invariant below is broken on the fixed matrix (390 coarse and 1440 fine, plus 320 and 844 where the named witness already reads them; LTR; light and dark only where the witness already does). Two clean rounds in a row close the loop. Anything a critic finds outside the list goes in a "for INBOUND" section, is routed to 11.0.1 or the dock redesign, and does not count against clean. A critic writes no new harness scene except for items 4 to 6 of this note.

1. **Rest corner.** A run whose every seat shows rests on four equal corners of half the plate's cross extent, a length, never `%`, in every posture (rest, hover, focus, focus plus hover, press). Witnesses g1, e1, e4, k3, l1, q1, m4.
2. **Collapsed.** A collapsed plate is a circle however it got there, and its hidden run has no scroll range and names no timeline. Witnesses g2, m1, s1.
3. **True overflow.** The cut fires only on the side that hides a seat and the rest returns at flush. Witnesses g1 (overflow), h1, k2.
4. **Ring.** A keyboard-focused seat's ring lies inside every clipping ancestor, at every cap of a sweep through the fit edge (read after reach, and not only on caps where the flag is set), on a plain run and in a layer group, horizontal and vertical. Witnesses c4, e2, e3, k1, s2 restated, plus the two new cells from items 4 and 6.
5. **Morph edges, static host.** No seat steps more than 0.5 px between the last morph frame and the first rest frame. Witness n1.
6. **Morph, host resize.** Closed at the cells p1, p2 and s4 already in the spec (item 3).
7. **Consumer markup.** A nested `.dock-run` is plain markup. Witnesses q1 to q3, r1.
8. **Slider, type, menu.** g3, c1, c3, m3 O-167; g4, c2; g5.
9. **One-row cures.** f1, f2, the m3 rows, m5, s3.
10. **Regression gates.** g6 (`release-10-1-2`, `release-10-1-3`, `release-10-1-4`) in both engines and g7. (`release-10-1-2` added by fix-close-1: the close found its O-101 reversal family red and unwitnessed, `fix-close-1.md`.) The D-1 and F-4 cells are read only at a 1-minute load under 10 and only as an A/B against v10.1.4's `src`; critique 11 showed v10.1.4 itself fails D-1 8 of 8 under load (`critique-11.md`, the resume table).
11. **Source and records.** No comment line the patch adds in `src` carries a row id, round id or seat vocabulary (item 8); no export removed or renamed; every moved token value named in the CHANGELOG.

## 3. The mid-morph host-resize class is closed where it stands

Judgment: the exposure is a host changing the dock's room, across the fit edge, inside one expand; the cost when it happens is a one-frame seat step that corrects itself. Three rounds and four state variables have gone to it, and the dock redesign (W-0.8, then W-I.8) rewrites this measure. Evidence: `critique-9.md` P1 and P2, `critique-10.md` Q1, `critique-11.md` R4; `fix-10.md` Q1; `dockMorphMeasure.ts:225-252`.

Instruction: critics re-run p1, p2, s4 and n1 and open no new door of this kind; a new one is recorded for W-0.8. The fix seat adds no further state to `capture` or `publishYield`.

One measurement is owed, once. The root-style observer (`dockMorphMeasure.ts:510-516`) watches the root's `style`, and the morph writes `--dock-morph-t` there on every frame (`useDockMorph.ts:97`), so after the morph's first capture the observer runs `constraintOf` (two `getComputedStyle` calls and a client-box read) on every frame of every expand and collapse of every dock. No record measures that cost. Critic 13 traces one expand of the house dock at 4x CPU throttle on the tip and on the tip with that observer removed. If the tip shows a longer frame the other does not, the fix seat deletes the observer, p2 keeps its shrink cells and drops its two growth cells, and the growth case is recorded as a bound.

## 4. Fix 11's ring-room trade paints a cut cap on a dock that hides nothing

Judgment: for the 8 px of caps under the old fit edge, the horizontal run now "does not fit", so the plate rests with its trailing corners cut while every seat shows. That is the lopsided end the owner has reported five times (O-155, O-166, O-193, O-205, and frame 1 of O-222), and a cut that signals hidden content where there is none is not honest paint. The cause is that one flag now carries two facts with different thresholds: "every seat shows" (which should take the cap off) and "the seats leave a ring's room" (which should let the reserve yield to nothing).

Evidence: `critic-12/probe/branch/chromium-headless-new/c12b-390-f-ltr-cap260.png` (four seats all showing, the right end tighter than the left); `critique-12.md` "The ring-room band at rest"; `dockMorphMeasure.ts:334-337`; `src/components/dock/styles/run.css:416-418, 441-445, 830-831`.

Instruction (derived from the CSS, not measured, so try it in a scratch build first): `data-run-fits` goes back to its one fact, the seats' span is no longer than the port, and the ring's room becomes the floor of the yield in CSS, the two reserve boxes' `min-inline-size: var(--dock-ring-reserve)` in place of `0`. Then a run whose seats show always has the cap off and rests round; with less than a ring's room it scrolls at most twice the ring reserve, which reach uses to show the focused end seat's ring. The `ring` read in `publishYield` and its horizontal-only branch go. Witness: c12b's sweep, every cap from natural width to 40 px under it, both engines: where no seat is hidden the four corners are equal, and the first and last seats' rings are whole after Tab focus. s2 is restated to read every cap. If the scratch build fails either engine, keep fix 11's form and put this band to the owner with the capture; do not build a third form.

## 5. The vertical run's separate mechanism rests on a measurement that is out of date

Judgment: the horizontal reserve is two boxes and the vertical one is padding with a script-written room (`--dock-run-room-block`). That second mechanism is the source of M2, N1, P2 and S2, and fix 11 left S2 open because "the vertical spacer was rejected in an earlier round". It was rejected in fix round 3 on D-1 steps of 2.38 and 2.59 px against a bound of 2, at a time when the cell already stepped 1.90 to 2.04 px from WebKit's zoom wobble alone. Fix 9's endpoint hold has since taken that wobble away (largest step 0.73 to 0.81 px). Nobody has tried the vertical spacer since.

Evidence: commit `082359cd1`; `fix-3/quick-d1-webkit.log:79, 99`; `fix-9.md` "D-1: the WebKit leaving-summary step"; `fix-11.md` "The vertical run keeps the old yield"; `run.css:420-433`.

Instruction: before any other S2 work, one scratch attempt: give the vertical run the same two reserve boxes as the horizontal run and delete the vertical padding rule, `--dock-run-room-block` and the `room` computation. Read the D-1 cell with fix 9's per-frame probe, 16 repeats per arm at load under 10, against the tip. If the largest step stays under 1.5 px, adopt it, apply item 4 to both axes through the one mechanism, and S2's witness is critic 12's c12a. If it does not, S2 goes to the owner as a bound (v10.1.4 cuts 4 px at every stage there); do not add a third mechanism.

## 6. S1 is real and in scope, but only its reach half

Judgment: S1 is the owner's own O-201 geometry (value's trigger inside a layer group), and the cause is as critic 12 reads it: reach takes the run's direct child, which in a layer group is the group frame. The arrow, Home and End keys not moving inside a layer group is a separate, older gap in the roving toolbar, and the one-dock-with-layers redesign (O-200, O-202) rebuilds that surface.

Evidence: `src/components/dock/composables/useDockRun.ts:63-67` (`seatsOf` reads `run.children`), `:374` (`onActivate`), `:329-332` (`onKeydown` returns when the run has no declared direct child); `critic-12/probe/branch/chromium-headless-new/c12b-390-f-ltr-cap260-endfocus.png`.

Instruction: fix seat 12 makes reach take the declared seat that holds the focus target, with its offset read against the run; witness c12b's Tab-focus cells, RED on the tip and on v10.1.4. The roving keys inside a layer group are recorded for W-I.8 and are not a 10.1.5 finding.

## 7. S3 is not cured reader by reader in this patch

Judgment: the defect O-207 G3 reported, the `.focus-ring` utility drawing nothing on a disclosure trigger, is cured and gated (s3). What S3 lists is every remaining reader of `--focus-ring-shadow`, which reads the same on v10.1.4 and which the library already marks as a per-lane retirement. Walking those readers one by one is the pattern that produced this loop, and moving the token's value changes every reader's paint in a patch.

Evidence: `src/styles/utilities/base.css:142-143` ("`--focus-ring-shadow` itself SURVIVES for its component-lane readers; retiring it is each lane's own act"); `src/styles/tokens/scale-paper.css:62`; `critique-12.md` S3 table (v10.1.4 column equal).

Instruction: the orchestrator books the remaining readers (Slider track and thumb, SortableList handle, popover content, `.input-bar`, timeline, data table) to W-R.1 in 12.0.0 with c12e as its RED witness, and amends the O-207 row to say so. Fix seat 12 does not touch them.

## 8. Two honesty corrections to the records

- **P4 is not shown to be a 10.1.5 regression.** The counts are 3 misses in about 300 layered first expands on 10.1.5 code (critiques 9 and 10; fix 10's 128 and critique 11's 32 had none) against 0 in 40 on v10.1.4. A 1 % rate gives no miss in 40 two times in three. Instruction: critic 13 runs c9f for 320 first expands per arm (tip and v10.1.4's `src`) in WebKit at low load. A miss on v10.1.4 makes it pre-existing and an INBOUND row for 11.0.1; misses on the tip only make it a blocker to attribute before the tag. Either way it is decided by that run, not carried as "open" again.
- **The comment rule H6 has regressed.** Fix 4 cleared it; `git diff -U0 v10.1.4..release/10.1.5 -- src` now adds 26 comment lines carrying row or round ids (for example `dockMorphMeasure.ts:160` "critique 11 R4", `:231` "fix 9's D-1", `run.css` "(O-201)", "(O-205)", `slider/styles.css` "(O-167)"). No round since 5 has re-read it, which is why it is now on the list in item 2. Instruction: the fix seat restates those lines as what the code does, and the close seat runs the grep.
