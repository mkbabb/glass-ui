# D5: closed as a design loop

Written 2026-11-11 by the W-R.1 spec seat, on `review/fable-2026-11-10/design-D5.md`. Paths are under `docs/tranches/BL/` unless they start with `src/` or `docs/precepts/`.

**D5 is closed at pass 15.** No pass 16 is planned, whichever way pass 15 scores. The loop's critics were chartered to add members past each range, and the record names that as why convergence moved from pass 10 to pass 17 one pass at a time (`design/engagement/REGISTRY.md:2924`, `driver/bl-design-d5-pass15.js:56`). Two clean passes over that ground would be a streak. The gate is one battery read on the landed tree, red on its base and green on itself (`waves/W-R.1.md` §3).

**What D5 lands, in W-R.1 §2.3,** built on the 12.0.0 branch and not rebased from `pass-15/P-E15.patch` (the patch sits on `eb845639f`, 76 `src` commits behind master):

- the declaration: every component directory declares one of nine classes, read at runtime, with `static` for a component nobody presses;
- one writer for each of `data-engaged`, `data-held` and `data-press`;
- the press as tone: `data-press` deepens the hover wash, and nothing scales;
- the held grow, ×1.06 on the dock spring, on the block axis only, cut under reduced motion;
- the loupe, hung from its track by CSS anchor positioning;
- the release rule (one rule for the Slider, the sortable list, the Sheet detents and the tabs drag; settle, then stop, 0 frames a second after release);
- a mount that plays nothing, and the reduced-motion arm;
- the harness (`design/engagement/harness/`) with witnesses E-1, E-3's block read, E-4, E-5, E-7, E-8, E-9, E-12 and E-13, and E-2 re-cut: a commit is the state's own change, the face stays within 0.002 of rest, a travelling body does not pass its rest, and a planted pop fails.

**What is retired, and not built.**

- The commit pop on every control, with `--rung-commit`, `--rung-crest` and `--scale-commit-pop`, and E-2's arms (ii) and (iii). It is overshoot and an indent, which `docs/precepts/restraint.md` rules out; O-203 is later than O-103d (1).
- The Button's squish through the engagement door and the gleam re-keyed to the press mark. Both are W-R.1's deletions; O-118 (3) no longer stands.
- The stage's glide: the per-frame read, the frame loop, the carrier maps, the probes, the reach's script reads, thirteen private registered properties, witnesses E-14 and E-15, the stale-place cells of E-10 and their 25 plants, and the inline half of the grow with its gutter read. `stage.ts` had reached 1,285 lines to glide a held control when the page moves under it. That cured a defect of the promoted control, which O-103f retired at pass 9.

The deletions the patch shared with the restraint major (the press classes, the press tokens, the gleam) are W-R.1 §2.1's, written once.

**The one question for the owner** (W-R.1 OQ-1): when the page moves under a held control, should the control glide to its new place, or move with the page?

- **A, the glide (cand15).** `design/engagement/pass-15/PE15-records/frames/glance/cand15-chromium-anchor-page-insert-before.png` and `…/cand15-chromium-anchor-page-insert-act.png`: a held slider with its loupe, before content is inserted above it and on the frame the insert lands. The control is painted in the same place in both (0.00 px off, `pass-15/P-E15.md` B-8); it then glides to where the page put it. The WebKit twins are `…/cand15-webkit-anchor-page-insert-before.png` and `-act.png`.
- **B, it moves with the page.** No frame of it exists. The critics who were to shoot it (`design-D5.md` item 5 (b)) did not run. W-R.1's order step 1 shoots it: cand15 with the stage's frame read planted off, as pass 9's `noread` plant did (`design/engagement/pass-9/E9/plants.py:10`; the edit is re-written for pass 15's stage if it no longer applies), the same `anchor-page-insert` scene and the same two instants, Chromium, to `design/engagement/landing/plain-chromium-anchor-page-insert-before.png` and `-act.png`. In B the act frame shows the control lower by the insert's height, with its neighbours.

Beside them, one more pair for the same sitting: the held grow as cand15 has it, on both axes with the inline cap (`design/engagement/pass-15/PE15-records/frames/cap/cand15/frames-chromium/cand15-chromium-fine-light-slider-held.png`, against `…-slider-rest.png`), and the grow on the block axis only, which the same step shoots to `design/engagement/landing/block-chromium-fine-light-slider-held.png`.

The default, if no answer comes, is B and the block-only grow. If the owner picks A, the glide is specified as its own wave after the three rules whose plants are not red are struck, and W-R.1 lands without it.
