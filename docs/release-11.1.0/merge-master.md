# glass-ui 11.1.0 · the merge of master (11.0.1)

Done by fix 7 (claude-opus-5-5), by `orchestrator-note-merge-master.md` and
`orchestrator-note-mark-box.md`, from `a3d963af2` (critique 6) with master at `272608c40`
(11.0.1 merged at `f7705c0df`). `git merge --no-ff master`; every conflict read on both
sides, never one side of a source file wholesale. After it, `git merge-base --is-ancestor
v11.0.1 HEAD` exits 0. The version reads 11.0.1 (master's); the close bumps it to 11.1.0.

Commits, read from `git log`:

- `cee4c03eb` the merge, with the mark moved to its own element;
- `5d88be18e` `.published-roster` drops `theme --radius-stadium` (the build asked: a
  published name left the roster);
- `0bd7ed13d` the run's clip under reduced motion; the mark's class constant made
  module-private (the export-reach gate asked);
- `17dc90052` the ratchet rebind, 3015106 to 3030550 (+15444 B, the reason below);
- `ecefe3260` the mark mounts without a ResizeObserver (release-10-1-5 h4);
- `6dc977fe2` the owner's `--radius-dock` knob on 11.0.1's corner (below);
- `e086a8767` the ratchet rebind, 3030550 to 3030691 (+141 B).

The witnesses, their readings and the battery are in `fix-7.md`.

## The mark gets its own box (the mark-box ruling)

- `GlassDock.vue` renders `<span class="dock-run-mark" aria-hidden="true">` as the run's
  last child, only while `useDockRunMark` reports `marked`. The composable writes the same
  five lengths on the run as before (`--dock-run-mark-{x,y,w,h,r}`) and no longer sets
  `data-run-mark`; the element's presence is the one fact.
- `run.css` paints `.dock-run > .dock-run-mark` with exactly the declarations the run's
  `::before` had (absolute, logical insets, z-index −1, the active plate's background,
  `pointer-events: none`). The marked seat's clear rule reads
  `.dock-run:has(> .dock-run-mark) [aria-current]…`.
- **A mark is not a seat, said once per language.** CSS: the seat rule is
  `.dock-run > :not(.dock-run-mark)`, the two "every other seat" transition rules take the
  same `:not()`, and the reserve gate is `:has(> :not(.dock-run-mark))` (five sites). The
  layers' morph stagger (`layers.css`, `.dock-layer.is-active > *` and its
  `nth-child(… of :not(.dock-separator))` ladder) also enumerates the run's children, so it
  takes `:not(.dock-run-mark)` too: the mark has no reveal and no rung, as the pseudo-element
  had none. Script: `isRunSeat(el)` in `useDockRunMark.ts`, read by `useDockRun`'s seat list
  (roving order, toolbar role, reach) and by `dockMorphMeasure.ts`'s fit reading
  (`data-run-fits`) and its child observers.
- 11.0.1's reserve boxes keep the horizontal run's `::before` and `::after`, unchanged.

## Conflicts, read on both sides

| file | resolution |
| --- | --- |
| `run.css` (3 hunks) | 11.0.1's corner: `--dock-cross` with its token fallback, `--dock-cap-rest: calc(var(--dock-cross) / 2)`, cut `--radius-card`, and its counter-scaled morph corner. The branch's plate-cap gate under `prefers-reduced-motion: no-preference` kept, without its `:not(.collapsed)` (11.0.1's `:is([data-run-fits], .collapsed)` rule owns the collapsed dock, and the extra class outranked it on a vertical dock). Under reduced motion the run's clip, 11.0.1's, holds the plate's rest corner with no scroll-driven animation, so the clip and the still plate keep one corner. |
| `morph.css` | 11.0.1's collapsed corner rules for the finite shapes (`:not(.shape-pill)`, the two-cell one at `--radius-pill`), the branch's content-sized summary (`min-width: auto`). The branch's persistent face keeps its rules, with the gap model below. |
| `shell-regions.css` | 11.0.1's: the leading gap lives on the layers' margin in `run.css` (THE ROOM FOR THE RESERVE). |
| `icon-button.css` | 11.0.1's `@media (hover: hover)` around the branch's `background-color` hover fill. |
| `GlassDock.vue` (2) | The branch's persistent face with 11.0.1's `focusFirstSeat` and `onSummaryFocusIn`; the collapse's hand-off goes to the first persistent seat or the summary, under 11.0.1's `summaryFocusFromCollapse` flag. |
| `Slider.vue` | Both: the branch's rAF-coalesced `:model-value` / commit / grab handlers and 11.0.1's `@pointerdown="onPointerDown"` (reka's grab offset taken at the press). Capture and bubble, separate handlers. |
| dock `README.md` (2) | 11.0.1's prop text and slots, with the branch's collapsed-face and run-mark lines; the corner line says 11.0.1's contract. |
| `CHANGELOG.md` | The 11.1.0 entry above 11.0.1's. |
| `dock-hover-corner.test.ts`, `g-dock-lattice.test.ts` | 11.0.1's assertions (its corner), with the seat selector read as `:not(.dock-run-mark)`. |
| `.bundle-ratchet` | Rebound after the gates (below). |

`.github/workflows/release.yml` and `scripts/dist-tag.mjs` are master's bytes
(`git diff master HEAD` on both is empty).

## One mechanism where L6 and 11.0.1 said the same thing two ways

The stadium corner: **11.0.1's mechanism, with the owner's knob on it.** Lane L6 (O-199)
made `--radius-dock` the stadium and stated the rest as `--dock-corner`, with its own
counter-scaled morph corner in `shape.css`; 11.0.1 states the rest from the measured cross
extent and counter-scales in `run.css`. Every posture (open, collapsed square, two-cell,
wide, the persistent face, vertical open and collapsed, every morph frame) is half the cross
extent under 11.0.1's rules, so 11.0.1's is the one kept: `--dock-corner` and the `shape.css`
counter-scale are gone. One posture only L6's covered: **a host that sets
`--radius-dock: 1rem` gets the bar in every posture.** The owner's O-199 ruling names it ("A
host that sets `--radius-dock: 1rem` gets the bar corner back"), while 11.0.1's mechanism
ignores the token on the stadium. So the one rest length is bounded by the token:
`--dock-cap-rest: min(var(--radius-dock), calc(var(--dock-cross) / 2))`, and `--radius-dock`
is the stadium again (`--radius-stadium`, L1's rung). By default the bound is inert and the
paint is 11.0.1's; with the host's `1rem` the plate, the box, the cut cap's keyframe rest and
the morph's counter-scale all take 16 px from the same length. The finite shapes' two-cell
collapse rule (11.0.1's, `:not(.shape-pill)`) read `--radius-dock` for its 16 px bar, so it
now names that 16 px, `--radius-pill`, and paints as 11.0.1 did.

The first merge commit had dropped the knob (and `--radius-stadium`, `5d88be18e`); lane
L6's host-bar cells (22 red in round 1) and O-199's ruling sent it back in `6dc977fe2`. With the host's
`1rem` the cut cap still drops to `--radius-card`, 16 px, so a bar dock that hides seats shows
no cut: a reading, recorded in `fix-7.md`.

The trailing region's gap (O-197): folded into 11.0.1's rule set on the layers, the same
shape as the leading one (the gap, plus the reserve while open), on both axes. The persistent
face (O-194) zeroes the layers' margins on an empty-summary collapse and keeps one gap
between a leading and a trailing region.

## The ratchet

`3015106 → 3030550`, +15444 B: 11.0.1's own growth over 11.0.0 (the run's reserve boxes and
clip keyframes, the measured cross extent, the click-integrity and Slider grab cures), less
L6's retired corner rules, plus the mark element and `isRunSeat`. Rebound in `17dc90052`;
then `3030691` (+141 B, the ResizeObserver guard and the bounded rest) in `e086a8767`.
verify:package exits 0, CLEAN, at each.
