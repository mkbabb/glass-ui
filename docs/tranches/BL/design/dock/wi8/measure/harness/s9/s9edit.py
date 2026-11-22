# s9edit.py <worktree>: S9, the README (RU-111 as amended for C8-14; RU-114's rule 11). The matching-plate recipe on the
# token went in with S3. Here: `data-morphing` named as the public morph signal, and the `within` line: `viewport` is fixed
# under any scroll and is a page's top-right bar's, `parent` places a figure's or a pane's own controls and moves with
# them. RU-106's clause ("does not bound the width") is not written: S8's cure was not built (H8 read its figure false),
# and on this build a `parent` preset's open plate is bounded by a narrower parent (w-atlas-preset, 28 px).
import sys
W = sys.argv[1]
p = W + "/src/components/dock/README.md"
s = open(p).read()
pairs = [
 ("""`ControlsDock` is the corner preset for a few action seats: with one control it is that
control and never folds; with two or more it folds at every width. A row of controls
that must never fold stays a `GlassDock` with `:collapse="false"`.""",
  """`ControlsDock` is the corner preset for a few action seats: with one control it is that
control and never folds; with two or more it folds at every width. A row of controls
that must never fold stays a `GlassDock` with `:collapse="false"`. Its `corner` names the
corner it sits in, and `within` what that corner belongs to: `"viewport"` (the default)
is fixed to the window and never moves with a scroll, which is what a page's top-right
bar takes; `"parent"` sits in the corner of its containing block and moves with it, for a
figure's or a pane's own controls."""),
 ("""A run that exceeds its size cap scrolls natively,""", """While the dock travels (a fold, an open, a change of its seats) its root carries
`data-morphing`, and the attribute goes when it lands. That is the public signal for a
page that waits on the dock's motion; the classes `collapsed` and `expanded` name the
posture it is going to.

A run that exceeds its size cap scrolls natively,"""),
]
for old, new in pairs:
    assert s.count(old) == 1, old[:60]; s = s.replace(old, new)
open(p, "w").write(s)
print("s9 edits applied")
