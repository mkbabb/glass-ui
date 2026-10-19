"""MS8-r26-proposed.py · D3 pass 10, the minor split v8: the comment-only rewrite of the four lines this seat read false
under R-26 (MINOR-SPLIT-v8.md §4.3). PROPOSED, not in minor-split-v8.patch: R-25 says the minor v8 is the minor v7 +
MS7-r21b-proposed.diff + the parenthesis, "Nothing else", and R-24's rule sends a further false line to the critic, not
into the build. Measured beside the patch (MS8-run.sh proposed, proposed-same) so the critic can take it without a rebuild.

  ladder.css:298   "the content tiers paint the cream pole at the bound" -> "at or above the bound"
                   (wash sits at the bound, quiet and resting one and two steps above, tokens/glass.css:51-55)
  sizing.css:258-259  "The press DARKEN … so a press lands a brief darken" -> "The press FILL … a brief fill"
                   (the dark arm steps the resting plate toward --foreground, which lifts it; MS8-press-dark.py)

Each edit keeps its comment's line count. Usage: python3 -I MS8-r26-proposed.py <worktree>. Each old string occurs once.
"""
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
EDITS = [
    (
        "src/styles/glass/ladder.css",
        "           LIGHT page the content tiers paint the cream pole at the bound, so flipping the\n",
        "           LIGHT page the content tiers paint the cream pole at or above the bound, so flipping the\n",
    ),
    (
        "src/styles/tokens/sizing.css",
        "    /* The press DARKEN, read on `:active` alongside the scale-press so a press lands a\n"
        "       brief darken rather than scaling alone. LIGHT: the one-ink SELECTED rung, ink over\n",
        "    /* The press FILL, read on `:active` alongside the scale-press so a press lands a\n"
        "       brief fill rather than scaling alone. LIGHT: the one-ink SELECTED rung, ink over\n",
    ),
]
for rel, old, new in EDITS:
    p = root / rel
    text = p.read_text()
    n = text.count(old)
    if n != 1:
        sys.exit(f"{rel}: expected the old string once, found {n}")
    p.write_text(text.replace(old, new))
    print(f"{rel}: 1 edit")
