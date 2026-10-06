"""Class sweep: a chronic or deferred item with no decided row (pass 9, FI-03 and FI-04's first half).

CHARTER.md:23: every chronic and every deferred item is a DECIDED row (build, fold or retire); re-booking is
forbidden; a chronic that rode two or more closes undecided is a disease row decided by a wave of its own.
This lists every instance of the class it can read:

  MEMBER       a member of the chronic family F-13 (audit/REGISTRY.md), or an audit finding whose row says the
               item was deferred, dropped, never started, never decided or re-booked, that no LEDGER row and no
               wave spec names, and whose title names no id a decided LEDGER row carries
  BANKED       a LEDGER row that is BANKED while its HEAD word is deferred, OPEN, BLOCKED, OWNER-GATED or PARTIAL,
               or while its rationale marks it DISEASE (a carry to an event, not a decision)
  NO-WAVE      a LEDGER row whose terminal is not RETIRE and whose wave cell is empty
  NO-RETRIGGER a BANKED row with no named re-trigger
  SHARED       a DISEASE row whose rationale says the deciding wave is shared
  NO-HOME      a BUILD or FOLD row marked DISEASE whose wave has no spec, or whose spec names neither the row nor
               the id its source cites
  CONDITIONAL  a spec sentence "if W-x cures K" where W-x's spec does not name K (a cure hung on a wave that
               does not carry it)

Exit 1 while any row is open. BL_ROOT reads another copy.
"""
import glob
import re
import sys

from plan_dag import BL, WAVES, spec_ids

FIND = re.compile(r"\| ((?:L\d\d[ab]?-F?\d+[a-z]?)|(?:R\d+-\d+-\d+)) \|")
CHRONIC = re.compile(r"DEFERRED|deferred at|silent drop|dropped from|re-book|rebook|undecided|never (?:started|decided|executed|ran|fired)|"
                     r"disease row|(?<![\w-])N-2\b|owner-revivable|absent from (?:every|BJ|BK)", re.I)
KEY = re.compile(r"(?<![\w-])(#\d+[a-z]?|C-\d+|E-\d+|OW-\d+[a-d]?|T-\d+|V-A\d+)(?![\w-])")


def cells(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def main():
    specs = spec_ids()
    spec_text = {w: (WAVES / f"{w}.md").read_text() for w in specs}
    ledger_text = (BL / "LEDGER.md").read_text()
    named_in = ledger_text + "".join(spec_text.values())
    led = []
    for n, line in enumerate(ledger_text.splitlines(), 1):
        c = cells(line)
        if len(c) >= 7 and c[3] in ("BUILD", "FOLD", "RETIRE", "BANKED"):
            led.append((n, c))
    led_ids = {c[0] for _, c in led}
    out = []

    # MEMBER
    reg = (BL / "audit/REGISTRY.md").read_text()
    f13 = re.search(r"^#### F-13.*?(?=^#### )", reg, re.S | re.M).group(0)
    members = {m: "F-13 member" for m in re.findall(r"\b(?:L\d\d[ab]?-F?\d+[a-z]?|R\d+-\d+-\d+)\b", f13.split("- **Lenses", 1)[0])}
    titles = {}
    for f in sorted(glob.glob(str(BL / "audit/round-*/*.md"))):
        for line in open(f):
            m = FIND.match(line)
            if m:
                titles.setdefault(m.group(1), line)
                if CHRONIC.search(line):
                    members.setdefault(m.group(1), "chronic-flavoured finding")
    n_members = len(members)
    for mid, why in sorted(members.items()):
        if re.search(rf"(?<![\w-]){re.escape(mid)}(?![\w-])", named_in):
            continue
        title = cells(titles.get(mid, "| | | |"))[2] if mid in titles else ""
        keys = KEY.findall(title)
        if keys and all(any(i == k or i.startswith(k) and not i[len(k)].isdigit() for i in led_ids) for k in keys):
            continue
        out.append(f"OPEN MEMBER       {mid} ({why}): no LEDGER row or spec names it"
                   + (f", and its title's {', '.join(keys)} is no LEDGER row" if keys else "") + f": \"{title[:90]}\"")

    # LEDGER arms
    for n, c in led:
        rid, head, term, wave, why = c[0], c[2], c[3], c[4], c[6]
        if term == "BANKED" and (re.fullmatch(r"deferred|OPEN|BLOCKED|OWNER-GATED|PARTIAL", head) or why.startswith("DISEASE")):
            out.append(f"OPEN BANKED       LEDGER.md:{n} `{rid}` ({head}) is BANKED: a carry to an event, not a decision")
        if term != "RETIRE" and wave in ("—", "-", ""):
            out.append(f"OPEN NO-WAVE      LEDGER.md:{n} `{rid}` is {term} with no wave")
        if term == "BANKED" and not re.search(r"[Rr]e-trigger", why):
            out.append(f"OPEN NO-RETRIGGER LEDGER.md:{n} `{rid}` is BANKED with no named re-trigger")
        disease = why.startswith("DISEASE")
        if disease and re.search(r"\(shared\b|\bshared\)", why):
            out.append(f"OPEN SHARED       LEDGER.md:{n} `{rid}` is a DISEASE row decided in a shared wave")
        if disease and term in ("BUILD", "FOLD"):
            if wave not in spec_text:
                out.append(f"OPEN NO-HOME      LEDGER.md:{n} `{rid}` DISEASE names wave `{wave}`, which has no spec")
            else:
                base = re.sub(r"[a-z]$", "", rid) if rid.startswith("#") else rid
                src_ids = re.findall(r"\b(?:L\d\d[ab]?-F?\d+|R\d+-\d+-\d+|T-\d+)\b", c[1])
                if not any(re.search(rf"(?<![\w-]){re.escape(k)}(?![\w-]|\d)", spec_text[wave]) for k in [rid, base] + src_ids):
                    out.append(f"OPEN NO-HOME      LEDGER.md:{n} `{rid}` DISEASE → {wave}, whose spec names neither the row nor its source ids")

    # CONDITIONAL
    for w in specs:
        for n, line in enumerate(spec_text[w].splitlines(), 1):
            for m in re.finditer(r"\bif (?:\*\*)?(W-[0-9A-L]\.\d+)(?:\*\*)? cures ((?:#\d+|[A-Z]+-[A-Z]?\d+[a-z]?))", line):
                tgt, key = m.groups()
                if tgt not in spec_text or not re.search(rf"(?<![\w-]){re.escape(key)}(?![\w-]|\d)", spec_text[tgt]):
                    out.append(f"OPEN CONDITIONAL  waves/{w}.md:{n} hangs {key} on \"if {tgt} cures {key}\"; {tgt}'s spec does not name {key}")
    for r in out:
        print(r)
    print(f"members {n_members}, ledger rows {len(led)}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
