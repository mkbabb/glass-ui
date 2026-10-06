"""Shared reader for the BL plan folder: PLAN §5's edges, their transitive closure, and spec sections.

Used by the class sweeps in this folder. Reads only docs/tranches/BL/{PLAN.md,waves/*.md}.
"""
import os
import re
from functools import lru_cache
from pathlib import Path

# BL_ROOT points a sweep at another copy of the plan folder (a `git archive` of an earlier commit) for its before run.
BL = Path(os.environ["BL_ROOT"]).resolve() if os.environ.get("BL_ROOT") else Path(__file__).resolve().parents[2]
WAVES = BL / "waves"
WID = re.compile(r"W-[0-9A-L]\.\d+")


def spec_ids():
    return sorted(p.stem for p in WAVES.glob("W-*.md"))


def band(w):
    return w.split("-")[1].split(".")[0]


@lru_cache(None)
def edges():
    """wave -> set of waves it depends on (PLAN §5), W-L.6's 'every wave of bands C to K' expanded."""
    text = (BL / "PLAN.md").read_text()
    sec = text.split("## 5 · The DAG", 1)[1].split("## 6 ·", 1)[0]
    out = {}
    for line in sec.splitlines():
        m = re.match(r"\| (W-[0-9A-L]\.\d+) \| (.*) \|$", line)
        if not m:
            continue
        w, deps = m.group(1), m.group(2)
        if "every wave of bands C to K" in deps:
            out[w] = {x for x in spec_ids() if band(x) in "CDEFGHIJK"}
        else:
            out[w] = set(WID.findall(deps))
    return out


@lru_cache(None)
def ancestors(w):
    seen, todo = set(), list(edges().get(w, ()))
    while todo:
        x = todo.pop()
        if x in seen:
            continue
        seen.add(x)
        todo.extend(edges().get(x, ()))
    return frozenset(seen)


def before(a, b):
    """True when a lands before b (b reaches a through §5)."""
    return a in ancestors(b)


def ordered(a, b):
    return a == b or before(a, b) or before(b, a)


@lru_cache(None)
def text(w):
    return (WAVES / f"{w}.md").read_text()


def section(w, n):
    """The body of '## n · ...' up to the next '## ' heading."""
    m = re.search(rf"^## {n} · .*?$(.*?)(?=^## |\Z)", text(w), re.S | re.M)
    return m.group(1) if m else ""
