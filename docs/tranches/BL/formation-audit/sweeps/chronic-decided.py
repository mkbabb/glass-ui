"""Class sweep: a chronic or deferred item with no decided row (pass 9, FI-03 and FI-04's first half).

CHARTER.md:23: every chronic and every deferred item is a DECIDED row (build, fold or retire); re-booking is
forbidden; a chronic that rode two or more closes undecided is a disease row decided by a wave of its own.
This lists every instance of the class it can read:

  MEMBER       a member of the chronic family F-13 (audit/REGISTRY.md), or an audit finding whose row says the
               item was deferred, dropped, never started, never decided or re-booked, that no LEDGER row and no
               wave spec names, and whose title names no id a decided LEDGER row carries. A member a BUILD or FOLD
               row names is held to that row's wave spec by `ledger-terminal.py` arm COVER (fix-12, FK-03)
  BANKED       a LEDGER row that is BANKED while its HEAD word is deferred, OPEN, BLOCKED, OWNER-GATED or PARTIAL,
               or while its rationale marks it DISEASE (a carry to an event, not a decision)
  NO-WAVE      a LEDGER row whose terminal is not RETIRE and whose wave cell is empty
  NO-RETRIGGER a BANKED row with no named re-trigger
  SHARED       a DISEASE row whose rationale says the deciding wave is shared
  NO-HOME      a BUILD or FOLD row marked DISEASE whose wave has no spec, or whose spec names neither the row nor
               the id its source cites
  L04-ROW      a row of L04's master ledger (`audit/round-1/L04.md`, "Master ledger", every carried item traced, keyed
               by number) that MAP below does not trace to a LEDGER row, whose traced id is not a LEDGER row with a
               terminal, whose item no traced row's wave spec names (an id named for a different item does not
               decide this one; the LEDGER row's own words are not coverage, pass 11 FK-03: a seat that writes the
               item's name into the folding row passes nothing), or, for a row marked **D** (rode two or more
               closes), whose traced rows all lack a wave (a disease row is decided by a wave, CHARTER.md:23). A
               traced row that is RETIRE with no wave is decided by the ledger itself and is read from its own text
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
# L04 master-ledger row -> (LEDGER row ids that decide it, a pattern naming the item in those rows or their waves' specs)
MAP = {
    1: (["#10c", "C-10", "#87"], r"Safari"), 2: (["N-1a"], r"net-indirection"),
    3: (["BG-ONWARD-1", "BG-ONWARD-2", "BG-ONWARD-3", "BG-ONWARD-4", "BG-ONWARD-8"], r"gyroscope|squircle|GU-1"),
    4: (["C-4", "#49d"], r"V-A95|non-reproduc"), 5: (["#43"], r"W-CHIP"), 6: (["#48"], r"Q-9"),
    7: (["#54a"], r"webgl2|W-ONE-ENGINE"), 8: (["#62"], r"loop D1"), 9: (["#63"], r"history rewrite"),
    10: (["#20"], r"fallback"), 11: (["#60a", "#69"], r"boot shell|low-power"), 12: (["#61"], r"W-DOC-TRUTH"),
    13: (["#67a"], r"hallmark"), 14: (["#90a", "#67d"], r"R-7"), 15: (["#34", "#45a", "#64b"], r"W-TOAST|one engine|IDIOM"),
    16: (["#44"], r"0 consumers|#44 W-TAGS-FIELD"), 17: (["#6"], r"Safari"), 18: (["#25"], r"well"), 19: (["#78"], r"canon"),
    20: (["#90a", "#90b", "#90c", "#90d"], r"R-7|canon|Safari"), 21: (["#29a"], r"popstate"), 22: (["#15"], r"hook"),
    23: (["#70"], r"archaeology"), 24: (["Q063"], r"exemplar|recording"), 25: (["#71a", "#32c"], r"RT-71A|RT-32A"),
    26: (["#17b", "#23", "#58b", "#47a"], r"latch"), 27: (["#51a", "C-7"], r"π-SCROLL"), 28: (["C-8"], r"content-box"),
    29: (["C-9"], r"focus model"), 30: (["C-5", "C-6"], r"window|chroma"), 31: (["C-11", "C-12", "#50b"], r"π-W1|W2-W6"),
    32: (["#49a", "#49b", "#49c", "#49g", "C-13a"], r"R9|R11|F3|π-FIELD"), 33: (["L04-M33"], r"layers\.css:34[4-9]"),
    34: (["C-16"], r"capture-death|captureScreenshot"), 35: (["C-1"], r"Trusted Publisher"), 36: (["C-14", "C-15"], r"smell|same law"),
    37: (["#76a", "L04-M37"], r"g10"), 38: (["L04-M38"], r"GREENFIELD-TERMINAL"), 39: (["C-17"], r"precepts"),
    40: (["L04-M40"], r"\./drawer"), 41: (["L04-M41"], r"W-ATLAS"), 42: (["C-2", "C-3"], r"rotation|NPM_TOKEN"),
    43: (["P-6b"], r"close"), 44: (["O-53 R-1", "O-53 R-2", "O-54 R-1"], r"O-5[34]"), 45: (["N-2"], r"DISEASE|every carried row terminal"),
}
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

    # L04-ROW
    rows = {}
    master = (BL / "audit/round-1/L04.md").read_text().split("## Master ledger", 1)[1].split("\n## ", 1)[0]
    for line in master.splitlines():
        c = cells(line)
        if len(c) >= 7 and c[0].isdigit():
            rows[int(c[0])] = c
    by_id = {c[0]: (n, c) for n, c in led}
    for k, c in sorted(rows.items()):
        item = c[1][:70]
        if k not in MAP:
            out.append(f"OPEN L04-ROW      L04 master row {k} ({item}): traced to no LEDGER row")
            continue
        ids, pat = MAP[k]
        missing = [i for i in ids if i not in by_id]
        if missing:
            out.append(f"OPEN L04-ROW      L04 master row {k} ({item}): {', '.join(missing)} is no LEDGER row with a terminal")
            continue
        texts = [spec_text[by_id[i][1][4]] if by_id[i][1][4] in spec_text else " ".join(by_id[i][1])
                 for i in ids if by_id[i][1][4] in spec_text or (by_id[i][1][3] == "RETIRE" and by_id[i][1][4] in ("—", "-", ""))]
        if not any(re.search(pat, t) for t in texts):
            out.append(f"OPEN L04-ROW      L04 master row {k} ({item}): no traced row's wave spec names the item (/{pat}/)")
        if "**D**" in " ".join(c) and not any(by_id[i][1][4] in spec_text for i in ids):
            out.append(f"OPEN L04-ROW      L04 master row {k} ({item}) is DISEASE; every traced row ({', '.join(ids)}) has no wave")
    if len(rows) != 45:
        out.append(f"OPEN L04-ROW      L04's master ledger reads {len(rows)} rows, not 45: the table changed shape")

    # CONDITIONAL
    for w in specs:
        for n, line in enumerate(spec_text[w].splitlines(), 1):
            for m in re.finditer(r"\bif (?:\*\*)?(W-[0-9A-L]\.\d+)(?:\*\*)? cures ((?:#\d+|[A-Z]+-[A-Z]?\d+[a-z]?))", line):
                tgt, key = m.groups()
                if tgt not in spec_text or not re.search(rf"(?<![\w-]){re.escape(key)}(?![\w-]|\d)", spec_text[tgt]):
                    out.append(f"OPEN CONDITIONAL  waves/{w}.md:{n} hangs {key} on \"if {tgt} cures {key}\"; {tgt}'s spec does not name {key}")
    for r in out:
        print(r)
    print(f"members {n_members}, ledger rows {len(led)}, L04 master rows {len(rows)}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
