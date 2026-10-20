#!/usr/bin/env python3
"""FV11-rekey.py · D3 pass 12, floor v11: FV11-rulings.json = pass-11/crit-fv10-rulings.json with every ruling in a file
R-32's hunks moved re-keyed to its new line. The offset of each line is MEASURED, not assumed: the ruling's `says`
text must occur on exactly the re-keyed line of floor v11's file and nowhere else at that offset. A ruling whose line
R-32 rewrote would fail here (none does: R-32 writes no line on the frozen list). Each re-keyed `why` gains one
bracketed note naming the move, so its own line citations, which are floor v11a's, read as such.
  python3 -I FV11-rekey.py <floor v11 tree> <floor v11a tree>"""
import json, sys, pathlib
M = pathlib.Path(__file__).resolve().parent.parent
v11, v11a = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
rul = json.load(open(M / "pass-11/crit-fv10-rulings.json"))
MOVED = {"src/styles/tokens/glass.css", "src/styles/tokens/dark-arm.css", "src/styles/glass/focus-veil.css", "tests/styles/focus-veil.test.ts"}
out, moved = [], 0
for r in rul:
    f, n = r["at"].rsplit(":", 1); n = int(n)
    if f not in MOVED: out.append(r); continue
    old = (v11a / f).read_text().split("\n"); new = (v11 / f).read_text().split("\n")
    assert r["says"] in old[n - 1], ("says not on the floor v11a line", r["at"])
    hits = [k + 1 for k, line in enumerate(new) if line == old[n - 1]]
    assert len(hits) == 1, ("the floor v11a line is not unique in floor v11", r["at"], hits)
    m = hits[0]
    if m != n:
        r = dict(r, at=f"{f}:{m}", why=r["why"] + f" [pass 12, floor v11: this line moved {m - n:+d} ({f}:{n} -> :{m}) under R-32's hunks, byte-identical; line numbers cited above in this file are floor v11a's]")
        moved += 1
    out.append(r)
json.dump(out, open(M / "pass-12/FV11-rulings.json", "w"), indent=1, ensure_ascii=False)
print(f"FV11-rulings.json: {len(out)} rulings, {moved} re-keyed by measured offset")
