"""Shared reader: every gate row of every wave spec's §5 table, with its commands in rendered form.

A §5 row is a Markdown table row; its cells are split on unescaped pipes. A command is a backticked span of the
gate cell. The rendered form is what a seat runs: GitHub's table rule turns `\\|` into `|` before the code span
is read, so `\\|` in the file is a shell pipe and `\\\\|` is a regex's literal `\\|` (fix-4, FC-01).

Reads only docs/tranches/BL/waves/*.md (BL_ROOT reads another copy, as plan_dag does).
"""
import re
from dataclasses import dataclass, field

from plan_dag import WAVES, spec_ids, text


@dataclass
class Gate:
    wave: str
    line: int
    gid: str
    cell: str
    passes: str
    head: str
    spans: list = field(default_factory=list)

    @property
    def struck(self):
        return self.gid.startswith("~~") or "struck" in self.cell[:60].lower()

    @property
    def hold(self):
        """A labelled hold line: the row says so in its id or gate cell, or its HEAD cell opens by saying so.
        A row whose HEAD cell opens on a RED reading and calls one half a hold line is a born-RED row."""
        pat = r"hold line|\(hold\)|hold lines"
        return bool(re.search(pat, self.gid + " " + self.cell[:80], re.I) or re.search(pat, self.head[:40], re.I))


def split_cells(line):
    raw = line.strip().strip("|")
    return [c.strip() for c in re.split(r"(?<!\\)\|", raw)]


def render(span):
    return span.replace("\\|", "|")


def gates():
    out = []
    for w in spec_ids():
        t = text(w)
        m = re.search(r"^## 5 · [^\n]*\n", t, re.M)
        if not m:
            continue
        start = t[: m.end()].count("\n") + 1
        body = t[m.end():]
        end = re.search(r"^## (?:\d+ · |Appendix)", body, re.M)
        body = body[: end.start()] if end else body
        for k, line in enumerate(body.splitlines()):
            if not line.startswith("|") or line.startswith("|---"):
                continue
            c = split_cells(line)
            if len(c) < 3 or c[0].lower() in ("id", "gate", "#"):
                continue
            g = Gate(w, start + k, c[0], c[1], c[2] if len(c) > 3 else "", c[-1])
            g.spans = [render(s) for s in re.findall(r"`([^`]+)`", c[1])]
            out.append(g)
    return out
