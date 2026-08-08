# CURE-ORDER #80 W-BUTTON — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet seat wf_52fcc8ff-8d2) ruled CURE-REQUIRED. The driver ratifies
the four cures verbatim, plus two cheap folds the adjudicator marked foldable. What
STANDS: the selection (#80 the next canonical unstarted Φ5 row; #54's §0 omission is a
record gap, not a wrong pick); the lane's substance in full — tsc 0, battery 11/1437/5
byte-match all-foreign, receipt byte-identical (violations:1 = #40's), button 24/24,
`el` threading real at Button.vue:105-116, the `.glass-deep` 20px-vs-16px blur inversion
real and rightly routed #69 (token home #68), live paint verified by Challenger A across
all 8 emphasis×tone cells.

## Cures

- **C1 (code, BLOCKING):** strike `outline-none` from `src/components/chip/chipVariants.ts:6`
  and `src/components/_shared/menu/menuRowClass.ts:6`. Ground (adjudicator-confirmed in the
  built sheet): `.focus-ring:focus-visible` sits in `@layer components` (offset 116253),
  `.outline-none { outline-style: none }` in `@layer utilities` (209175); layer order beats
  specificity, so post-cut the chip's interactive arm has NO focus indicator and menu rows
  lose the ring the C-7 inversion installed. The token's only job was killing the UA ring
  in the box-shadow era; author-origin outline supersedes it. 0 `outline-none` hits in
  tests/, so gate-safe. Re-run the FULL verify gate after.
- **C2 (record, BLOCKING):** RECORD §9 + PASTE-BLOCKS §A tail reclassify
  `tests/components/a11y/focus-visible.test.ts` as the THIRD shared-dirty file: hunk 1
  (line 30, `SLIDER` re-point `Slider.vue` → untracked `src/components/slider/styles.css`)
  is **#35 W-SLIDER's** (the twin re-point in unclaimed `coarse-target.test.ts:31` proves
  the class); only the DROPDOWN-comment hunk is #80's. Committing §9's fence as written
  REDs a clean checkout on `readFileSync`. Correct "two shared-dirty files" → three
  everywhere it appears.
- **C3 (record-truth, dated strike-in-place brackets):**
  (a) item 31's false ground — the `[data-dragging]::before` cohort cannot reach the
  `.glass-drag-lift` host (it carries `.glass-capsule`, no cohort class; the sole
  `data-dragging` writer is `SheetContent.vue:301`); the true ground: the host has no
  `::before` at all.
  (b) item 30 + the paste-cell blast radius — of the named composers only
  `.dock-icon-button` (`DockControl.vue:92`, a `::before` cohort member) changes paint,
  0.10→0.14 hover, on **#47 GF-DOCK's** surface; name the dock as the ONE live delta, and
  add an explicit notice row for #47's unpark (the C-8 pattern).
  (c) add **#54 DUAL-ENGINE** to §0's skip table with its gate (completion rides
  ASK-gated #50 W0 + #53; cursor:1698).
  (d) item 2's figure: `grep -c backdrop-filter` on the button styles = **1** (a prose
  comment), zero declarations — correct the "2 → 0" figure with the detector stated.
  (e) fold: caption the §6 diff-stat as FENCE-FILTERED (the real command emits 89 files
  +2881/−3685); note §9's splittability truthfully (the SegmentedTabs hunk is 4 lines;
  at default -U3 the scale-paper `--scale-press-btn` deletion merges with the foreign
  tab-indicator retune — the driver splits at -U0).
  (f) fold: add the undisclosed `@media (hover: hover)` fence on the quiet/text hover
  arms (~styles.css:171-185) to §3's DEVIATED table — correct on merit per the
  base.css:217 idiom, but it changes coarse-pointer behaviour for two arms and must be
  on the record. Also note R-C's Safari-nesting ground as decorative (var()-indirection
  already nests color-mix house-wide, glass-capsule.css:49-56); the deviation stands on
  its paint merit.
- **C4 (rides C1):** the §A paste cell's "chip cell arm fixed free" sentence and RECORD
  §7 item 4 become true only once C1 lands — amend both, and the ledger block, with the
  two strikes and the three-shared-dirty accounting.
- **FOLD-1 (doc-truth, this row's own text, files already open):**
  `src/components/tabs/styles/drag.css:29-34` dangling citation to the deleted
  `.glass-capsule-hover:hover, .glass-drag-lift { --glass-specular }` group — correct in
  place (the cut deleted that group; the citation is this row's own debris).
  `src/styles/utilities/a11y-overrides.css:90-92` false sentence (".button … carries a
  box-shadow focus ring") — the block was partially re-authored this cut; finish it.
- **REFUSED/ROUTED (not this cure's):** `SegmentedTabs.vue:280`'s `readToken` quiet-fail
  shape → #32 W-TABS (its file); `material.css:327` false leave comment → #61;
  the `.glass-deep` inversion + two stale 11px-floor prose sites → #69/#68; π P1-P9 →
  #10 (extend the tab-walk to the chip interactive arm + one menu row post-C1; the
  229/222 void baseline is superseded — #10 re-takes it).

## Driver duties at commit (not the cure seat's)

Split the THREE shared-dirty files at -U0 by index surgery (`SegmentedTabs.vue` hunk =
#80's 4-line readToken re-point; `scale-paper.css` = #80's two hunks incl. the
`--scale-press-btn` deletion, split from the foreign tab-indicator retune;
`focus-visible.test.ts` = ONLY the dropdown-comment hunk, hunk 1 stays #35's); re-run
demo:dist:build + receipt immediately before `git add`; leak-check; ⊕-index derived at
commit time from the cursor tail.
