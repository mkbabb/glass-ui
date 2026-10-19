"""MS8-r25-paren.py · D3 pass 10, the minor split v8 (R-25's third part): the closing parenthesis the minor v7's
surfaces-pager.css fold dropped.

The minor v6 closed "(darker in dark, a thicker cream pole in light; the clamp's two-step ceiling keeps it translucent)"
after "translucent". R-23's fold (MS7 §1.1) replaced "translucent); under `.dark` the tint arm LIFTS it …" with
"translucent, in both themes; one writer, …" and the ")" went with the struck text, so the pill comment opens 4 and
closes 3 (Crit9 §5.1). This puts the one ")" back where the minor v6 had it, after the translucency clause it closed,
and adds no word. Usage: python3 -I MS8-r25-paren.py <worktree>. Each old string must occur exactly once.
"""
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
EDITS = [
    (
        "src/styles/glass/surfaces-pager.css",
        "           clamp's two-step ceiling keeps it translucent, in both themes; one\n",
        "           clamp's two-step ceiling keeps it translucent, in both themes); one\n",
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
