"""Class sweep: the ledger and the spec it cites as its source disagree on a row's terminal (pass 9, FI-04's
second half), and the ledger's own counts disagree with its rows.

PLAN §1 (decide waves): the formation LEDGER holds each decided row's terminal. A spec table that also carries
a terminal for a row the ledger sources from it is a second record. This lists:

  DISAGREE  a LEDGER row whose source cell cites `W-x.n §k`, where a table in that section has a `terminal`
            column and the matching table row (by the row id in its first cell, or by ordinal for ids of the
            form NAME-n) states a different terminal
  COUNT     LEDGER §9's count table disagrees with a count of the row tables (a derived copy that drifted)
  DOCKET    a docket row (§4) whose wave has no spec

Terminal words are folded to the charter's four: CURED, ANSWERED, DECLINE(D) and NOT-REPRODUCED are RETIRE classes
(LEDGER §0). Exit 1 while any row is open. BL_ROOT reads another copy.
"""
import re
import sys

from plan_dag import BL, WAVES, spec_ids

FOLD = {"BUILD": "BUILD", "FOLD": "FOLD", "RETIRE": "RETIRE", "BANKED": "BANKED", "CURED": "RETIRE", "ANSWERED": "RETIRE",
        "DECLINE": "RETIRE", "DECLINED": "RETIRE", "NOT-REPRODUCED": "RETIRE"}
WORD = re.compile(r"\b(BUILD|FOLD|RETIRE|BANKED|CURED|ANSWERED|DECLINED?|NOT-REPRODUCED)\b")


def cells(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def tables(text):
    """yield (header cells, [row cells]) for every Markdown table in text."""
    hdr, rows = None, []
    for line in text.splitlines() + [""]:
        s = line.strip()
        if s.startswith("|"):
            c = cells(s)
            if hdr is None:
                hdr = [x.lower() for x in c]
            elif not set(s) <= set("|-: "):
                rows.append(c)
        else:
            if hdr is not None:
                yield hdr, rows
            hdr, rows = None, []


def main():
    specs = set(spec_ids())
    text = (BL / "LEDGER.md").read_text()
    led, out = [], []
    sec = "?"
    counts = {}
    for n, line in enumerate(text.splitlines(), 1):
        m = re.match(r"## (\d+|Appendix A) · ", line)
        if m:
            sec = m.group(1)
        c = cells(line)
        if len(c) >= 7 and c[3] in FOLD and sec != "4" and sec != "9":
            led.append((n, c))
            counts.setdefault(sec, {}).setdefault(c[3], 0)
            counts[sec][c[3]] += 1
        if sec == "4" and len(c) == 6 and re.match(r"(OW|DOCKET)-", c[0]) and c[5] not in ("—", "-") and c[5] not in specs:
            out.append(f"OPEN DOCKET   LEDGER.md:{n} `{c[0]}` names wave `{c[5]}`, which has no spec")

    ids = {c[0] for _, c in led}
    for n, c in led:
        m = re.match(r"(W-[0-9A-L]\.\d+) §(\d+)", c[1])
        if not m or m.group(1) not in specs:
            continue
        w, k = m.groups()
        body = re.search(rf"^## {k} · .*?$(.*?)(?=^## |\Z)", (WAVES / f"{w}.md").read_text(), re.S | re.M)
        if not body:
            continue
        ordm = re.fullmatch(r"(.+)-(\d+)", c[0])
        tabs = [(h, r) for h, r in tables(body.group(1)) if "terminal" in h]
        by_id = lambda rows: [r for r in rows if re.search(rf"(?<![\w-]){re.escape(c[0])}(?![\w-])", r[0])]
        anywhere = any(by_id(rows) for _, rows in tabs)
        for hdr, rows in tabs:
            col = hdr.index("terminal")
            hit = by_id(rows)
            if not anywhere and ordm and not any(r[0] in ids for r in rows) and int(ordm.group(2)) <= len(rows):
                hit = [rows[int(ordm.group(2)) - 1]]
            for r in hit:
                t = WORD.search(r[col]) if col < len(r) else None
                if t and FOLD[t.group(1)] != c[3]:
                    out.append(f"OPEN DISAGREE LEDGER.md:{n} `{c[0]}` is {c[3]}; its source {w} §{k} says \"{r[col][:60]}\" for \"{r[0][:50]}\"")

    # §9's table against the rows
    name = {"1": "§1", "2": "§2", "3": "§3", "5": "§5", "6": "§6", "7": "§7", "Appendix A": "Appendix A"}
    s9 = text.split("## 9 · Counts", 1)[1].split("## Appendix A", 1)[0]
    for line in s9.splitlines():
        c = cells(line)
        if len(c) == 6 and c[1].isdigit():
            key = next((k for k, v in name.items() if c[0].startswith(v)), None)
            if key:
                got = counts.get(key, {})
                want = dict(zip(("BUILD", "FOLD", "BANKED", "RETIRE"), map(int, c[1:5])))
                have = {t: got.get(t, 0) for t in want}
                if want != have or int(c[5]) != sum(have.values()):
                    out.append(f"OPEN COUNT    LEDGER §9 row \"{c[0][:40]}\" says {want} rows {c[5]}; the tables hold {have} rows {sum(have.values())}")
            elif "total" in c[0]:
                tot = {t: sum(v.get(t, 0) for v in counts.values()) for t in ("BUILD", "FOLD", "BANKED", "RETIRE")}
                want = dict(zip(("BUILD", "FOLD", "BANKED", "RETIRE"), (int(x.strip("*")) for x in c[1:5])))
                if want != tot:
                    out.append(f"OPEN COUNT    LEDGER §9 total says {want}; the tables hold {tot} ({sum(tot.values())} rows)")
    for r in out:
        print(r)
    print(f"ledger rows {len(led)}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
