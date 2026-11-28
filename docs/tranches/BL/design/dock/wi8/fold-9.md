# W-I.8: fold 9, the three challenges to RULINGS-9

The fold seat, claude-opus-5-5 (asserted from its own system identity; the expected id), 2026-11-27, in a seat once written for Fable; the owner's order of 2026-11-19 puts every seat on Opus. I wrote none of the rulings, the challenges, the build or the measures. I ran no browser and no build, changed no source, and staged nothing. I read source and site files with `git show`, `sed` and `grep` only.

**Read in full.** `RULINGS-9.md`; `challenge-9-restraint.md`; `challenge-9-measurement.md`; `challenge-9-consumers.md`.

**Read to check the objections.**
- On `bl/dock/wi8` at `254b3f501` (src `a5a4fe546`):
  - `GlassDock.vue:60-80` and `useDockShellProps.ts:80-160`.
  - `useDockState.ts:70-145`, `:520-552`, `:815-845`.
  - `useDockBody.ts:266-282`, `:630-642`, `:895-905`, `:1045-1052`, `:1090-1097`, `:1234-1240`, and its `P0a` line (`:29`).
  - `run.css:541-575`, `:600-642`; `morph.css:82-101`; `shell.css:309-313`; `index.css` (the import order).
  - `density.css:75-84`, `:150-162`, `:215-265`, `:278-300`.
  - `README.md` (the anchor paragraph, `:60-80`; the slot list, `:106`).
  - The harness page's w-xf (`dock-wi8.vue:10-25`, `:159-164`, `:373-392`); `tests-visual/release-10-1-5.spec.ts:300-372` and its harness's input layer (`harness.ts:215-262`).
  - `git show 797a6de55`.
- On the main checkout:
  - `audit/INBOUND.md` O-376, O-384, O-386, O-391, O-427 and O-437.
  - `audit/ro-loop/hold.sh:20-26`.
  - BM `study/DESIGN.md` law 7 (`:27`) and `choices/CHOICES.md:670-682`.
  - `RULINGS-8.md:636-644`; `MEASURE-9.md:125-160`.
- Sites, with `git show` at their refs:
  - atlas `62405c0`: `src/platform/chrome/dock/Dock.vue` (the rail's collapse and slots), `composables/coarse-reveal.ts`, `composables/useDockCollapse.ts:80-135`.
  - keyframes.js `e5c12919`: `TransportDock.vue`, and its `expand()` calls.
  - speedtest `glass-10.1`: `SurveyResultDock.vue:36-110`, `:222-256`.
  - value.js `561137225`: `ActionBarLayer.vue:125-142`, `:238-246`.
  - slides `npig`: `DeckView.vue:208-216`.
  - daraksha, value.js, fourier-analysis and gregg, grepped for `--dock-plate-cross-px` (no reader).

**Outcome.** 36 objections: 3 blocking, 18 major and 15 minor. All 36 are **accepted**, and none is rejected. Each blocking objection was checked against the source or the site it names, and each held: C9M-1 at `corner9.mjs:28` and the corner9 logs, C9-1 at `useDockState.ts:526-552` and atlas's `Dock.vue:538` and `useDockCollapse.ts:108-110`, and C9-2 at `SurveyResultDock.vue:252` and `useDockBody.ts:273-276`. In four cases (C9M-1, C9-2, C9-3, C9M-8) my own reading changed the remedy's form; the table marks them **form changed**, with the reading that changed it. Where a remedy offered two forms (C9-1, C9-4), the table names the one taken.

IDs: C9R is the restraint challenge, C9M measurement, C9 consumers (the consumer file's own numbering).

| id | ruling | severity | objection, short | disposition | amendment in RULINGS-9.md |
|---|---|---|---|---|---|
| C9M-1 | RU-126 | blocking | the one-row/taller split reverses corner9's record and has no predicate the carrier or judge can compute | **accepted, form changed.** The remedy's example predicate (the tallest seat or face) does not separate the cells: counting faces is H3's cross variant, which fails the outline by 8.14 on w-xf; counting declared seats alone leaves `:336` at 30, since its input layer holds a 44 px seat beside a 54 px input bar (`harness.ts:245-256`). The folded sentence takes the tallest box that is itself a capsule, plus twice the block padding, written in px, with no mode and no attribute. H classes every tall cell by it before S3; if it fails, the split goes to the owner with question 25 before the corner is built | RU-126 rewritten: record corrected, the sentence, the classing, the failure path; question 25; order H6, S3; ready list G-13 |
| C9R-1 | RU-126, Q25 | major | a mode with no stated test, a misquoted record, a strip that shows no tall dock; his "Rounded." | **accepted** | RU-126 (one value replaces the two rules; "corner9 classes it" struck); question 25 rewritten: no "as the strip shows", both forms on a strip, his "Rounded." named, default kept |
| C9-2 | RU-126 | blocking | speedtest's `--dock-layer-height: auto` voids the token cap; the strip squares | **accepted, form changed.** The remedy took the px from "a seat's measured height", but the strip holds badges and a progress row, no declared seat (`SurveyResultDock.vue:36-110`). The folded sentence writes the cap in px always, with the default row standing in where the host's token is not a length | RU-126 (the sentence, the strip as a corner cell); speedtest draft "The result strip" |
| C9-1 | RU-127, RU-135 | blocking | R-2 pins atlas's faceless `collapse="closed"` rail open on a touch tablet and voids its `collapse()` | **accepted; the first of the remedy's two forms.** R-2's rest stays (O-376 (b), keyframes). A host's `expand()` and `collapse()` cross it, as `useDockState.ts:139-140`'s own note and the README already say; only `collapse: false` voids them, as on v11.1.0. Naming the rail alone would leave atlas with no one-line fix | RU-127 (amended, with an atlas-form cell and plant); RU-135 (the README touch line); atlas and keyframes drafts; ready list |
| C9R-2 | RU-132, Q23 | major | the hover is defended by a mark that does not exist, and 1.002 is read backwards | **accepted** | RU-132's *Pixels* line struck and replaced with the source and strip reading; question 23 rewritten with 1.002 to about 1.2 and the 5 % row's 1.11 and 1.098; default kept |
| C9M-6 | RU-132, Q23 | major | the *Pixels* line is not in the strip | **accepted** (with C9R-2) | as C9R-2; witness per dock and ground |
| C9R-3 | RU-142 | major | three page tokens for a reservation a literal meets; one name a letter from an existing one | **accepted** | RU-142 rewritten: no token, the README's box sentence, atlas keeps its literal; ORCH line 33 answered "no token needed" (orchestrator item 5); atlas draft; REMOVES (struck before being built) |
| C9M-14 | RU-142 | minor | the witness cannot tell a 52 px reservation from a 68 px one | **accepted** (in the form that survives C9R-3) | RU-142's witness: 0 px² and a title-to-box gap of 0 to 8 px; the README sentence names the head row's padding term |
| C9-15 | RU-142 | minor | the preset sets five lines, the ruling wires three | **accepted, answered by C9R-3**: no token, so nothing is partly wired | RU-142 (the first form struck, its five-line fault recorded) |
| C9R-4 | RU-147 | minor | the reduced-motion dip depends on what read6 sees | **accepted** | RU-147: one reduced-motion form; if built, the dip applies to every moved seat (choice 8 A); else R-11 until BM-11 |
| C9M-4 | RU-147, RU-149 | major | two RED read6 clauses restated with no plant; w-words' "trade" is not built | **accepted** | RU-147's witness (g4-ghost RED on the ink-box clause, else layout boxes stay); RU-149 rewritten (a one-frame word swap, the Select's, BM §5.1's row; s6-words and a current-seat fill plant) |
| C9R-5 | RU-139, RU-140 | minor | vertical docks lose 8 px across; w-vert folds 56 by 56 | **accepted** | RU-139 (the vertical dock bullet); RU-140 (56 by 56); drafts carry the 8 px |
| C9M-12 | RU-139 vs RU-140 | minor | the two rulings expect different w-vert boxes | **accepted** (with C9R-5); the end-padding change reaches vertical docks through `morph.css:96-101` | RU-139, RU-140 |
| C9-3 | RU-139 | major | the form is unnamed; one-axis sites; the cockpit preset; the drafts promise concentric ends | **accepted, form changed.** The remedy's form (b) retires the inline knob. The folded form keeps it: the default inline token reads the block token, so block-only sites get concentric ends and a site's own inline still wins. The cockpit's inline line is deleted. The first form's `shell.css:311` reason is struck, since `morph.css:96-101` wins | RU-139 rewritten; REMOVES (cockpit line −3); atlas, fourier, HA, speedtest, gregg, value.js, daraksha, slides, keyframes and gaggle drafts |
| C9R-6 | RU-161 | minor | four site docks rebuilt to show a glide judge8 already reads | **accepted** | RU-161's witness: judge8 on the seat-set cells, one widened to 184 px; REMOVES (harness) |
| C9M-2 | RU-129 | major | the mount read cannot bite a morph's first three frames; s7-nogate missing; the 1x frames | **accepted** | RU-129: the pair is RU-128's plant and s7-nogate at 4x; the mount read goes to the trace cell; the script-stack clause and the 1x frames printed; order H3; ready list G-11 |
| C9M-3 | RU-123 | major | the baseline rows mask the dock; the plant is outside any delivery | **accepted** | RU-123 rewritten: `noop-barshape-card`, attribution by stack, the guard-removed control, the mount plant struck there; order H1; orchestrator item 2 |
| C9-8 | RU-130 | major | the guard's removal is read only by Chromium counts; the harm is WebKit's loop error | **accepted** (merged into RU-123's control) | RU-130 (the guard goes only if the WebKit control shows no dock error); RU-123; REMOVES condition |
| C9M-5 | RU-137 | major | "cannot reach 4.5" is unread | **accepted** | RU-137: nav and dials read at 8 and 9 %; a conflict goes into question 23; ready list G-15 |
| C9-12 | RU-137 | minor | the drafts do not name the docks under 4.5 | **accepted**: named only where the step-10 grep finds one | RU-137; the messages' preamble |
| C9M-7 | RU-152 | major | the crop measures sameness with the ninth tip, not square corners | **accepted** | RU-152: the computed `clip-path` radius is 0 at inner lane corners; the crop is the plant's paint check |
| C9M-8 | RU-144, RU-145 (5), RU-161 | major | "five frames, none over two fifths" is twice as loose as law 7 | **accepted, form changed.** Law 7 (BM `DESIGN.md:27`) also sets 167 ms for a leg on the page's thread, which the carrier is. So the duration floor is 167 ms, not the remedy's 83 | RU-144 (law 7's form, the spring's peak printed); RU-145 cell 5; RU-161 |
| C9M-9 | RU-145, RU-158 | minor | hard cells 1, 3, 5, 6 have no plant; two cells cannot fail | **accepted** | RU-145 (a plant per cell; cell 1's out-of-flow cells "cannot fail"); RU-158 (the touch-name cell "cannot fail") |
| C9M-10 | RU-138 | minor | the bound moves by under one 8-bit level, on the other polarity's evidence | **accepted; RU-138 reversed** | RU-138 rewritten: 1.2 kept, resolution printed, three-run median within a level |
| C9M-11 | RU-130 | minor | the no-condition removals were counted on an older tree | **accepted** | RU-130 (recount on `a5a4fe546`); budget |
| C9M-13 | RU-153 | minor | g2-curve's WebKit re-read cannot explain a computed corner | **accepted** | RU-153: g14-corner witnesses WebKit; the re-read struck; g2-curve claims Chromium |
| C9M-15 | RU-141 | minor | the cure rests on a cause H8 left unread | **accepted** | RU-141: the cause read first; the lines built only if it is theirs |
| C9-4 | RU-133 | major | the glyph keys to the row, not the seat; slides's glyph fills its button | **accepted**: the first form of the remedy (key to `--dock-control-size`), a value in two rules | RU-133 amended; slides draft (32 px); atlas draft (about 40 px in 2.75rem buttons); ready list G-13 |
| C9-5 | RU-165 | major | the cell does not build HA's tab-to-trigger swap | **accepted** | RU-165: an HA-form cell with its plant, the widths read in H, the cure on O-427's placed words; HA draft (expected result; its own `ChevronDown` takes width) |
| C9-6 | RU-144, keyframes draft | major | the draft defers to 12.0.0 what choice 39 ratified for this release | **accepted** | RU-144 (keyframes named; w-kf ride cell in the edge-wrapper form; the failure path to question 30); keyframes draft; question 30 |
| C9-7 | RU-128 | major | value.js's `reserve="inline"` and `:key="kept"` silently stop doing anything | **accepted** | RU-128 (value.js named; README reserve line); value.js draft; REMOVES (site row) |
| C9-9 | RU-159, Q27 | major | four sites asked, not "new, from atlas"; two workarounds wait | **accepted** | RU-159 rewritten; question 27 rewritten; value.js, fourier, HA and atlas drafts |
| C9-10 | RU-146 | major | O-437 (3): the carrier's cross-axis-zero seat cut clips daraksha's ring | **accepted** (hypothesis until its cell reads) | RU-146 (the ring, its candidate form, its cell); daraksha draft; ready list |
| C9-11 | gregg draft | minor | `reduceFold` stays through the release | **accepted** | gregg draft "Reduced motion" |
| C9-13 | README | minor | the README still lists the deleted `search` slot | **accepted** | S9 row; order S6; ready list (README) |
| C9-14 | RU-131 | minor | the orchestrator ask omits O-384's figures and BM-1's bytes | **accepted** | RU-131; orchestrator item 1; budget's G-16 line |

**Dropped by the challengers themselves.** These are not objections, and not ruled: restraint's seven, measurement's eight and consumers' five, each listed at the end of its file.

**What the fold changes in the tenth pass.**
- H gains the corner sentence's classing (H6) and the causes for RU-141, RU-165 and RU-146 (H7).
- ORCH line 5's leg moves to `noop-barshape-card` with attribution (H1).
- G-11's pair changes (H3).
- The plants are named per hard cell.
- Four harness rebuilds and a WebKit re-read go.
- S gains R-2's flag (S5) and the glyph key (S3), and loses the tokens.
- The code projection moves from about 5,153/5,116 to about 5,155/5,118, still 377 to 414 over 4,741.

## Second round: the completeness check

The same seat, claude-opus-5-5 (asserted from its own system identity), 2026-11-27. A completeness check listed 22 items that RULINGS-9 named without disposing of them. Each is ruled in `RULINGS-9.md` section (j), RU-167 to RU-188, with its reason and witness. I ran no browser and no build, changed no source, and staged nothing. I read logs, harness files and source with `sed`, `grep` and `git show` only; the files are listed at the head of section (j).

**Outcome.** 22 items, 22 ruled. Five changed form when read against the logs or the source:
- *Item 1.* The three webkit-touch failures are all Playwright test timeouts with no dock assertion reached (`release-10-1-3.log.stall:126-160`; `release-10-1-5.log:269`). So the clause is about timeouts, not stalls: a timeout is read once more and that reading counts. No run is voided by its load after it starts. Reading the logs also showed M2's reason for not counting `:2162` was backwards (a failing test master lacks is a failure master lacks); RU-167 strikes it.
- *Item 12.* The premise was wrong. v11.1.0 never gave a static dock 0.3 under more contrast: its bracket sets `:root` alone, and the static arm's 0 on the element wins. The 0.3 was the eighth tip's own `:root .glass-dock` selector, which S3 removed. RU-178 records the return to v11.1.0's 0 and gives level8 the cell.
- *Item 18.* Of master's three failures "with no test of the same title", two keep their titles on the tip and skip in webkit-touch for the reason they state. One is retitled by RU-92. Master's skips name `coarse-touch` alone because master has no webkit-touch project (RU-184).
- *Item 16.* G-3 is not counted GREEN until a plant turns r30m RED. A judge no plant can fail is cured, not counted (RU-182).
- *Item 22.* The demo rail's disc is the run mark, which glides on its own spring outside the carrier, so RU-143's landing does not reach it. The 11.1.2 form of the cure (end on the first reach) is applied to the mark only if hard cell 4 reads a backward last step (RU-188).

| # | the item, short | where | disposition | ruling | amended in place |
|---|---|---|---|---|---|
| 1 | `:305`, `:331`, `:2162` passed "under the void rule", which RU-151 does not have | top line row 3, RU-151, MEASURE-9:873 | a timeout clause: a test timeout is read once more and that reading counts; all three pass on their re-reads and are read again in the tenth; "under the void rule" struck; M2's "a test master does not have" struck | RU-167 | RU-151 (note); top line row 3; order H4, M; ready list G-14 |
| 2 | no coarse witness of `:727`'s published cure | RU-127, RU-143 | `:727`'s steps on a copy of its page with a one-glyph face, in coarse-touch; O-268's plant RED | RU-168 | order H2, M; ready list G-14 |
| 3 | code lines neither met nor restated | RU-130, budget | does not close this round by ORCH line 2's own condition (readings incomplete); closes in the tenth, met by count or restated by the owner's answer to question 26 | RU-169 | top line row 1; observations row 4; budget; orchestrator item 3; ready list |
| 4 | G-16: no waits clause, no path under v11.0.2's bound | RU-131, ready list | choice 1 A covers bytes: no behaviour goes, over the bound the release waits and the bytes go with question 26; v11.0.2's bound has no path read and is asked before the tenth measures | RU-170 | top line row 2; observations row 4; budget; question 26; orchestrator item 1; ready list G-16 |
| 5 | the 15 kept names uncited; "under 80" against "80 or under" | budget, RU-162 | "net public names down" (ORCH-LINES-6 line 3), fewer than 80; the 15 named and cited by RU-86's table; the orchestrator told | RU-171 | RU-162 (note); budget's names line; ready list; orchestrator item 6 |
| 6 | WebKit's held finger is a dispatched pointer | RU-158, ready list G-1 | an engine limit; the WebKit leg printed so; a held finger on an iPhone or iPad joins the owner's Safari look | RU-172 | RU-158 (note); parts H1 row; ready list G-1 and before the tag |
| 7 | H1's "(k2) under the press gate" | parts H1 row | closed on S6's (6 and 3 ms) and M1's (11.5 and 9 ms) readings, g1-afterseat biting | RU-173 | parts H1 row |
| 8 | H6's plate re-read dropped; RU-156's source unnamed | parts H6 row, RU-156 | RU-156 rests on M1's reading of the ninth build; H6's table is the eighth tip's; the tenth reads its own | RU-174 | parts H6 row; order M; ready list G-15 |
| 9 | RU-157's line 154 keeps a struck reason for g2-curve | RU-157 | amended to RU-153's reason | RU-175 | RU-157 |
| 10 | s1-facepad's WebKit leg started at 39 | RU-151, M3 | out by RU-151; RU-140's plant read in WebKit at 36 or under is the witness; g2-curve's 37 needs nothing (Chromium only) | RU-176 | parts M row; order H5; ready list G-13 |
| 11 | seg9's WebKit 1.145 and the dev and build gap | parts S4 row, ready list | the build's 1.253 decides; the gap read by computed values on both servers, a file-order rule cured if found; dev-server plants judged against the dev-server tip | RU-177 | parts S4 row; order H5, H7, S7; ready list G-15 |
| 12 | a static dock under more contrast now 0, unread | parts S3 row | the premise corrected (v11.1.0 gave 0; the 0.3 was the eighth tip's); intended; level8 reads it with the eighth tip's selector as plant | RU-178 | parts S3 row; order H5; ready list (level8) |
| 13 | a press on a segmented current seat reads 1.00 in WebKit, unread since S4 | parts H5 row, RU-132 | read again on the ninth build; bound within 0.01 of nav's press; cause and cure if still 1.00 | RU-179 | parts H5 row; order H7, S7; ready list G-15 |
| 14 | `p3-fold-wide-dark`'s 37 ms | top line row 5 | void at 17 ms by RU-150, GREEN at 10 ms; printed beside the wide coarse fold | RU-180 | top line row 5; order H7 |
| 15 | DockCrossfade's 63 and useDockBody's 31 unrun lines | RU-130, parts H12 row | every file's unrun lines read against sources on a fuller drive; an outside-dock crossfade cell with RU-128's guard as its plant | RU-181 | parts H12 row; order H8, H10; ready list |
| 16 | r30 to r30m with no plant | ready list G-3, parts M row | r30m accepted; g3-hold or its form on the return path must bite; G-3 not GREEN until it does | RU-182 | parts M row; order H5; REMOVES (r30); ready list G-3 |
| 17 | the folded cover in PlateDock's seat | RU-141 | printed, not judged; the 52 px box is wider than the 44 px seat by construction, and no site mounts it | RU-183 | parts M row; order M; ready list |
| 18 | master's three webkit-touch failures unmapped | parts M row, MEASURE-9:875 | named and mapped; skips extended to webkit-touch for their stated reasons; one retitled | RU-184 | parts M row; order M |
| 19 | the pack named 11.2.0 | RU-166, MEASURE-9:1068 | the tenth's pack named for its build, no release number | RU-185 | parts M row; order M |
| 20 | no witness for the 11.1.2 forms built before a tag | RU-146, order S1 | a cell and plant per cure named now; `release/11.1.2`'s tests a source once it exists; the tag's form wins at M0 | RU-186 | order H8, S1; ready list G-14 |
| 21 | the value.js draft misses item 3's terms | RU-161, value.js draft | the draft gains a bullet with all four sites' glides, the page's layout, the column and row cases and the 12.0.0 transform | RU-187 | value.js draft |
| 22 | O-428's motion half tied to no ruling | observations row 6, RU-139 | the 11.1.2 motion cure, carried by RU-146 and RU-143; the rail's disc is the run mark, read by mark8 and hard cell 4, its first-reach end built only on that reading | RU-188 | observations row 6; order H8, S7; budget (not in the projection); ready list |

**What the second round changes in the tenth pass.**
- H gains the faced idle-fold page (H2), the timeout clause (H4), r30m's plant, RU-140's WebKit plant and the static more-contrast cell (H5), w-segpair's computed values, the segment's press and the wide dark fold (H7), the outside crossfade, the 11.1.2 cells and the demo rail (H8), and a fuller coverage drive with a per-file table (H10).
- S gains, only on H's readings, the segment's press, a file-order rule and the run mark's first-reach end (S7). S1's 11.1.2 forms carry RU-186's cells.
- M prints timeouts with their re-reads, master's mapping, G-16 against both bounds, RU-86's lines at their refs, the plate rule from its own build and the pack under its build's name.
- The code projection is unchanged (about 5,155 and 5,118). The run mark's possible +1 is printed outside it.
