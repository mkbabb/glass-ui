# Input to the dock loop: daraksha's controls seat (O-357, 2026-11-15)

Binding input for any seat of the second loop that has not finished. A consumer built the per-page controls dock from today's GlassDock pieces. Reference frames: `~/.dev-logs/owner-1112/frames-pages-19/seat-*.png` (read them).

What it showed:
1. Escape on a dock control whose own popover is open also folds the dock.
2. A press-opened dock folds when focus moves into a dialog one of its controls opened, so the control leaves the page and focus cannot return to it. The site holds it by hand. The design needs a rule: a dock holds open while a surface one of its controls opened is open, and focus returns to that control on close.
3. A folded dock's hidden open face stays laid out beyond its folded box; hidden seats report rects outside the visible plate.

Default to design to unless the evidence says otherwise: a controls dock with one seat renders that control at rest and never folds (a fold that hides one control behind one press is a wasted press on a phone).
