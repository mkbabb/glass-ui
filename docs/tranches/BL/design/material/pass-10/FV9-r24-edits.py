# FV9-r24-edits.py · D3 pass 10, floor v9 (REGISTRY P9-2.2 R-24, P9-6.2 step 2): the three comment rewrites R-24 rules,
# in R-24's words and no others, written over a worktree that holds pass-9/floor-v8.patch. Each `old` must occur exactly
# once in its file; each edit keeps its comment's line count (the reflow R-24 allows), so no line below an edit moves.
#   (i)   surfaces-pager.css:33-34  strike "; only `--card` differs between them"; the sentence ends "…oklab mix."
#   (ii)  a11y-fallback.css:34      "and the level IS that α" -> "and the level scales its transmission:
#                                   1 − α = (1 − rung) · level"
#   (iii) dock/styles/dock.css:15   "The shell + adaptive-legibility partials re-point" -> "The shell partial re-points"
#   python3 -I FV9-r24-edits.py <worktree>
import sys

W = sys.argv[1]
EDITS = [
    ("src/styles/glass/surfaces-pager.css",
     "           with no ink, clamp or oklab mix; only `--card` differs between\n"
     "           them. `--glass-level` defaults to 1, so the pill paints the\n",
     "           with no ink, clamp or oklab mix.\n"
     "           `--glass-level` defaults to 1, so the pill paints the\n"),
    ("src/styles/glass/a11y-fallback.css",
     "   whole move, because the plate is `--card` at α and the level IS that α. The\n"
     "   separate tint-darken this bracket used to add was a second writer pushing the\n"
     "   same plate the same direction. */\n",
     "   whole move, because the plate is `--card` at α and the level scales its\n"
     "   transmission: 1 − α = (1 − rung) · level. The separate tint-darken this bracket\n"
     "   used to add was a second writer pushing the same plate the same direction. */\n"),
    ("src/components/dock/styles/dock.css",
     "no second tint layer. The shell + adaptive-legibility partials re-point\n",
     "no second tint layer. The shell partial re-points\n"),
]
for path, old, new in EDITS:
    p = f"{W}/{path}"
    s = open(p, encoding="utf-8").read()
    n = s.count(old)
    assert n == 1, (path, n)
    assert old.count("\n") == new.count("\n"), path
    open(p, "w", encoding="utf-8").write(s.replace(old, new))
    print(f"edited {path}: 1 match, {old.count(chr(10))} lines for {new.count(chr(10))}")
