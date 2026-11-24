"""summarize.py: the probe JSON as one table per lane, plain against cured.

    python3 summarize.py [lane ...]

Each row is one cell (surface:rows). Columns: the page's scrollY before open, the change
at open, each swipe's change of the page during / after it (plate or list, finger down v,
finger up ^; "during" is read at 60% of the finger's travel, "after" 800 ms after lift) with
the list's own scroll in brackets when it moved, and the change across the close (from the
reading just before the close tap); then the root's overflow while open and after close.
A swipe that moved the page, or an open that moved it, is RED.
"""

import json
import sys
from pathlib import Path

HERE = Path(__file__).parent / "data"
LANES = sys.argv[1:] or ["chromium", "webkit-wheel", "webkit-touch"]


def cell_line(r):
    if "error" in r:
        return f"ERROR {r['error'][:100]}"
    b = r["before"]["scrollY"]
    o = r["afterOpen"]["scrollY"] - b
    parts = []
    red = False
    for w in r.get("swipes", []):
        if w.get("skipped"):
            continue
        d = w["post"]["scrollY"] - w["pre"]["scrollY"]
        dm = (w["mid"]["scrollY"] - w["pre"]["scrollY"]) if w.get("mid") else None
        lp = (w["pre"].get("list") or {}).get("scrollTop")
        lq = (w["post"].get("list") or {}).get("scrollTop")
        lm = f"[list {lq - lp:+d}]" if lp is not None and lq is not None and lq != lp else ""
        arrow = "v" if w["dy"] > 0 else "^"
        if (d != 0 or (dm or 0) != 0) and r["surface"] != "page":
            red = True
        during = f"{dm:+d}/" if dm is not None else ""
        parts.append(f"{w['where']}{arrow} {during}{d:+d}{lm}")
    ref = r.get("beforeClose") or r["afterOpen"]
    c = r["afterClose"]["scrollY"] - ref["scrollY"] if r.get("afterClose") else None
    root = r["afterOpen"]["rootOverflow"]
    rootClose = r["afterClose"]["rootOverflow"] if r.get("afterClose") else "?"
    driven = bool(parts)
    if r["surface"] in ("page", "ob-control"):
        verdict = ""
    elif not driven:
        verdict = "page held while open" if root == "hidden" else "no hold while open"
    else:
        verdict = "RED" if red or o != 0 else "green"
    swipes = "; ".join(parts) if parts else "(no swipe driven)"
    return f"open {o:+d} | {swipes} | close {c:+d} | root open={root} closed={rootClose} | {verdict}"


for lane in LANES:
    for tree in ("plain", "cure"):
        f = HERE / f"{tree}-{lane}.json"
        if not f.exists():
            continue
        d = json.loads(f.read_text())
        meta = d[0]["meta"]
        print(f"\n## {tree} / {lane} ({meta['browser']})")
        for r in d[1:]:
            print(f"  {r['surface']}:{r['n']:<3} before {r.get('before', {}).get('scrollY')} | {cell_line(r)}")
