#!/usr/bin/env python3
"""wheel.py — RECORD.md §6's wheel measures, from a probe cell file.

    python3 -I wheel.py <dir> [<dir> ...]

For each *.wheel.*.webkit.json (and chromium) in each directory: the strip's offset when
the last wheel event lands, the scrollend events between the first and the last wheel
event (snap-backs), when the strip first passes 20 px from where it started, where it
ends (px and slide), and the content's largest step against the strip.
"""
import glob
import json
import os
import sys


def col(c, n):
    if c is None:
        return [None] * n
    return c if isinstance(c, list) else [c["const"]] * n


def read(path):
    d = json.load(open(path))
    t = d["series"]["now"]
    n = len(t)
    ch = d["series"]["ch"]
    strip = ch.get("strip#0") or ch.get("strip")
    sl = col(strip.get("sl", {"const": 0}), n)
    marks = {m["name"]: m["t"] for m in d["marks"]}
    t0, t1 = marks.get("wheel"), marks.get("wheel-end")
    if t0 is None:
        return None
    pitch = d["meta"]["watch"].get("pitch")
    f0 = next(i for i, x in enumerate(t) if x >= t0)
    f1 = next((i for i, x in enumerate(t) if x >= t1), n - 1)
    start = sl[f0] or 0
    ends = [e for e in d["evs"] if e.get("type") == "scrollend"]
    during = [e for e in ends if t0 <= e["t"] <= t1]
    first20 = next((round(t[i] - t0) for i in range(f0, n) if abs((sl[i] or 0) - start) > 20), None)
    end = sl[-1] or 0
    return {
        "atLastWheel": round(sl[f1] or 0),
        "snapBacks": len(during),
        "first20ms": first20,
        "end": round(end),
        "slide": round(end / pitch, 2) if pitch else None,
        "wheelMs": round(t1 - t0),
    }


def main():
    for d in sys.argv[1:]:
        for p in sorted(glob.glob(os.path.join(d, "*.wheel.*.json"))):
            if p.endswith(".trace.json"):
                continue
            r = read(p)
            print(f"{os.path.basename(os.path.dirname(p)):22} {os.path.basename(p):36} {r}")


if __name__ == "__main__":
    main()
