#!/usr/bin/env python3
"""compare.py — RED (v11.1.0) beside GREEN (the cure), per cell and gesture.

    python3 -I compare.py <red-dir> <green-dir> [--md]

Reads summary.json from each directory (analyze.mjs output) and prints, per gesture:
reversals (largest step px), abrupt speed changes, rest ms after the release or press,
the strip's rest offset against the snap (px), the content's lag at the end (% of the
member), the hand ratio on a carry, frames over 25 ms, and the page's scroll calls.
"""
import json
import sys


def load(d):
    return {c["id"] + "." + c["engine"]: c for c in json.load(open(f"{d}/summary.json"))["cells"]}


def row(g):
    m = g.get("motion") or {}
    u = m.get("uneven") or {}
    revs = u.get("reversals")
    big = max([abs(r["step"]) for r in u.get("revFrames", [])] or [0])
    up = g.get("upAt") or 0
    last = m.get("lastMoveMs")
    rest = None if last is None else round(last - up)
    sc = g.get("scroll") or {}
    pr = g.get("projection") or {}
    hand = (g.get("hand") or {}).get("ratio")
    return {
        "rev": f"{revs} ({big:.0f})" if revs is not None else "-",
        "abrupt": u.get("abrupt", "-"),
        "rest": rest if rest is not None else "-",
        "off": sc.get("snapError", "-"),
        "lag": pr.get("lagAtEnd", "-"),
        "hand": hand if hand is not None else "",
        "over25": (g.get("dt") or {}).get("over25", "-"),
        "calls": len(g.get("calls") or []),
        "travel": sc.get("travel", "-"),
    }


def main():
    red, green = load(sys.argv[1]), load(sys.argv[2])
    md = "--md" in sys.argv
    keys = ["rev", "abrupt", "rest", "off", "lag", "hand", "over25", "calls", "travel"]
    if md:
        print("| cell | gesture | " + " | ".join(f"{k} RED → GREEN" for k in keys) + " |")
        print("|" + "---|" * (2 + len(keys)))
    for cid in sorted(set(red) | set(green)):
        r, g = red.get(cid), green.get(cid)
        names = [x["name"] for x in ((r or g)["gestures"])]
        for n in names:
            a = row(next((x for x in r["gestures"] if x["name"] == n), {})) if r else {}
            b = row(next((x for x in g["gestures"] if x["name"] == n), {})) if g else {}
            cells = [f"{a.get(k, '·')} → {b.get(k, '·')}" for k in keys]
            if md:
                print(f"| {cid} | {n} | " + " | ".join(cells) + " |")
            else:
                print(f"{cid:34} {n:6} " + "  ".join(f"{k}={c}" for k, c in zip(keys, cells)))


if __name__ == "__main__":
    main()
