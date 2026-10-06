"""Class sweep: an inbound or owner-ruled row the plan has not folded (pass 9, FI-01).

`audit/INBOUND.md:5-6` is the law: every row takes a terminal disposition in LEDGER.md at formation.
For every id in INBOUND's table this lists one row per defect:

  NO-LEDGER   no LEDGER row carries the id
  NO-PLAN     PLAN.md does not name the id
  NO-SPEC     a non-RETIRE ledger row names a wave whose spec does not name the id (or names no wave that exists)
  BAND        INBOUND's disposition cell lands the row in band 0 / the 10.x minor, and no ledger row for the id
              points at a band-0 wave
  FOLDED      INBOUND folds other ids into this row as one unit landing in band 0 ("Folds A, B, C into one
              witnessed unit"), and one of those ids has no ledger row at a band-0 wave
  CARRY       FORMATION-PROGRESS.md records a carry owed to formation ("Carried:", "at the next formation pass",
              "formation adds") for an id PLAN.md does not name

Exit 1 while any row is open. SWEEP_RAW=1 ignores the adjudicated readings. BL_ROOT reads another copy.
"""
import os
import re
import sys

from plan_dag import BL, WAVES, band, spec_ids

RAW = os.environ.get("SWEEP_RAW") == "1"
ID = r"(?:O-\d+[a-z]?|C-\d+)"

# row key -> reading. A reading is a reason the row is not a defect, checked by hand against the file it cites.
ADJUDICATED = {}


def cells(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def inbound():
    rows = {}
    for line in (BL / "audit/INBOUND.md").read_text().splitlines():
        m = re.match(rf"\| ({ID}) \|", line)
        if m:
            rows[m.group(1)] = cells(line)[-1]
    return rows


def ledger():
    """id prefix -> list of (row id, terminal, wave)."""
    out = []
    for line in (BL / "LEDGER.md").read_text().splitlines():
        c = cells(line)
        if len(c) >= 7 and c[3] in ("BUILD", "FOLD", "RETIRE", "BANKED"):
            out.append((c[0], c[3], c[4], line))
    return out


def rows_for(led, i):
    pat = re.compile(rf"(?<![\w-]){re.escape(i)}(?![\w-]|\d)")
    hit = [r for r in led if pat.match(r[0])]
    if not hit:  # an id the ledger carries only inside another row's source or rationale (a letter row, an appendix row)
        hit = [r for r in led if pat.search(r[3].split("|")[2]) ]
    return hit


def lands_band0(text):
    return bool(re.search(r"band[- ]0|10\.x (?:veil )?minor|IN 10\.2\.0|rides 10\.2\.0", text)) and not re.search(r"[Nn]ot 10\.2\.0", text)


def main():
    inb, led, specs = inbound(), ledger(), set(spec_ids())
    plan = (BL / "PLAN.md").read_text()
    open_rows, read_rows = [], []

    def emit(kind, i, detail):
        key = f"{kind} {i}"
        if not RAW and key in ADJUDICATED:
            read_rows.append(f"read {kind:<9} {i:<6} {detail}  [{ADJUDICATED[key]}]")
        else:
            open_rows.append(f"OPEN {kind:<9} {i:<6} {detail}")

    def named(text, i):
        if re.search(rf"(?<![\w-]){re.escape(i)}(?![\w-]|\d)", text):
            return True
        m = re.fullmatch(r"O-(\d+)", i)  # a plain id inside a written range, "O-53..O-68" or "O-53 to O-68"
        return bool(m) and any(int(a) <= int(m.group(1)) <= int(b) for a, b in re.findall(r"O-(\d+)(?:\.\.| to )O-(\d+)", text))

    for i, disp in inb.items():
        rows = rows_for(led, i)
        if not rows:
            emit("NO-LEDGER", i, "audit/INBOUND.md has the row; LEDGER.md has none")
        if not named(plan, i):
            emit("NO-PLAN", i, "PLAN.md does not name it")
        for rid, term, wave, _ in rows:
            if term == "RETIRE" and wave in ("—", "-", ""):
                continue
            if wave not in specs:
                emit("NO-SPEC", i, f"ledger row `{rid}` {term} names wave `{wave}`, which has no spec")
            elif not named((WAVES / f"{wave}.md").read_text(), i):
                emit("NO-SPEC", i, f"ledger row `{rid}` {term} → {wave}, whose spec does not name {i}")
        if lands_band0(disp) and rows and not any(w in specs and band(w) == "0" for _, _, w, _ in rows):
            emit("BAND", i, "INBOUND lands it in band 0 / the 10.x minor; no ledger row for it is at a band-0 wave: "
                 + ", ".join(sorted({w for _, _, w, _ in rows})))
        m = re.search(r"Folds ([^:]+?) into one witnessed unit", " ".join(cells_for(i)))
        if m and lands_band0(disp):
            for j in re.findall(ID, m.group(1)):
                jr = rows_for(led, j)
                if not any(w in specs and band(w) == "0" for _, _, w, _ in jr):
                    emit("FOLDED", i, f"folds {j} into its band-0 unit; {j}'s ledger rows are at "
                         + (", ".join(sorted({w for _, _, w, _ in jr})) or "no wave"))
    for n, line in enumerate((BL / "FORMATION-PROGRESS.md").read_text().splitlines(), 1):
        if re.search(r"Carried:|next formation pass|formation adds", line):
            for i in sorted(set(re.findall(ID, line))):
                if i in inb and not named(plan, i):
                    emit("CARRY", i, f"FORMATION-PROGRESS.md:{n} records a carry owed to formation; PLAN.md does not name {i}")
    stale = [k for k in ADJUDICATED if not any(r.split()[1:3] == k.split() for r in read_rows)] if not RAW else []
    for r in read_rows + open_rows:
        print(r)
    for k in stale:
        print(f"STALE reading `{k}` matches no row")
    print(f"ids {len(inb)}, open {len(open_rows)}, stale {len(stale)}")
    return 1 if open_rows or stale else 0


_ROWS = {}


def cells_for(i):
    if not _ROWS:
        for line in (BL / "audit/INBOUND.md").read_text().splitlines():
            m = re.match(rf"\| ({ID}) \|", line)
            if m:
                _ROWS[m.group(1)] = cells(line)
    return _ROWS[i]


if __name__ == "__main__":
    sys.exit(main())
