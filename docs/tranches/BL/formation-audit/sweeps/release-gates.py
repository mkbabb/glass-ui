"""Class sweep: two records of what a wave or a release waits on (pass 9, FI-02).

PLAN §5 is the one record of edges, loop gates and owner gates among them. Every other place that states what
gates a wave, a band or a release is a second record, and this lists each one that disagrees with §5:

  LOOP-§4     a wave §5 gives a loop gate is missing from that loop's row in PLAN §4, or §4 lists one §5 does not gate
  LOOP-§3     PLAN §3's "(loop Dn)" label on a wave row disagrees with §5
  LOOP-INDEX  waves/INDEX.md's loop column disagrees with §5
  LOOP-SPEC   a spec's title or header ("(loop Dn)", "| loop |", "| kind | LOOP WAVE … loop Dn") disagrees with §5
  NO-ROW      a spec with no §5 row, or a §5 row with no spec
  RELEASE     a sentence that says what gates 10.2.0 or what band 0's external edges are, and does not name every
              loop gate §5 puts on a band-0 wave (or names one §5 does not)
  EXCEPTION   a sentence that claims an owner-ratified exception to a loop's ownership for a wave §5 already
              gates on that loop (a loop wave is no exception), or "the one exception" while §5 shows none
  CHECKLIST-7 a band-0 wave whose loop gates differ from the owner-ruled set (D3 for W-0.1, W-0.2 and W-0.11 by O-87
              and the veil rulings; D2 for W-0.8 by O-88; checklist row 7 as amended, pass 10 FJ-01), or a band-0 wave
              with a §5 edge to a wave outside band 0; and PLAN §1's count of band-0 loop waves against that set
  INBOUND     audit/INBOUND.md or FORMATION-PROGRESS.md rules that 10.2.0 is gated on a loop that §5 puts on no
              band-0 wave

Exit 1 while any row is open. BL_ROOT reads another copy.
"""
import re
import sys

from plan_dag import BL, WAVES, band, edges, spec_ids

LOOP = re.compile(r"\bD([1-5])\b")


def plan_sections():
    t = (BL / "PLAN.md").read_text()
    return t, t.split("## 5 · The DAG", 1)[1].split("## 6 ·", 1)[0], t.split("## 4 · Loop waves", 1)[1].split("## 5 ·", 1)[0], t.split("## 3 · Waves", 1)[1].split("## 4 ·", 1)[0]


def main():
    plan, s5, s4, s3 = plan_sections()
    specs = set(spec_ids())
    gate = {}  # wave -> set of loops §5 gates it on
    rows5 = set()
    for line in s5.splitlines():
        m = re.match(r"\| (W-[0-9A-L]\.\d+) \| (.*) \|$", line)
        if m:
            rows5.add(m.group(1))
            gate[m.group(1)] = {f"D{x}" for x in re.findall(r"\bD([1-5]) gate\b", m.group(2))}
    out = []
    for w in sorted(specs ^ rows5):
        out.append(f"OPEN NO-ROW     {w}: " + ("a spec with no PLAN §5 row" if w in specs else "a PLAN §5 row with no spec"))

    # §4: one row per loop, first cell the waves
    in4 = {}
    for line in s4.splitlines():
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        if len(c) == 3 and re.match(r"W-", c[0]):
            loop = LOOP.search(c[1])
            for w in expand(c[0]):
                in4.setdefault(w, set()).add(f"D{loop.group(1)}")
    for w in sorted(rows5 | set(in4)):
        if gate.get(w, set()) != in4.get(w, set()):
            out.append(f"OPEN LOOP-§4    {w}: §5 gates it on {fmt(gate.get(w))}, §4 lists it under {fmt(in4.get(w))}")
    # §3 labels
    for line in s3.splitlines():
        m = re.match(r"\| \*\*(W-[0-9A-L]\.\d+)\*\*(?: \(loop (D\d)\))? \|", line)
        if m:
            lab = {m.group(2)} if m.group(2) else set()
            if lab != gate.get(m.group(1), set()):
                out.append(f"OPEN LOOP-§3    {m.group(1)}: §3 labels it {fmt(lab)}, §5 gates it on {fmt(gate.get(m.group(1)))}")
    # INDEX
    for line in (WAVES / "INDEX.md").read_text().splitlines():
        c = [x.strip() for x in line.strip().strip("|").split("|")]
        if len(c) == 5 and re.fullmatch(r"W-[0-9A-L]\.\d+", c[0]):
            lab = set(re.findall(r"D[1-5]", c[4]))
            if lab != gate.get(c[0], set()):
                out.append(f"OPEN LOOP-INDEX {c[0]}: INDEX says {fmt(lab)}, §5 gates it on {fmt(gate.get(c[0]))}")
    # specs
    for w in sorted(specs):
        head = (WAVES / f"{w}.md").read_text().split("\n## ", 1)[0]
        lab = set(re.findall(r"loop (D[1-5])", head.splitlines()[0]))
        for line in head.splitlines():
            if re.match(r"\| loop \|", line):
                lab |= set(re.findall(r"^\| loop \| (D[1-5])", line))
            if re.match(r"\| kind \|", line) and "Not a loop wave" not in line:
                lab |= set(re.findall(r"(?:design loop|a loop) (D[1-5])", line))
        if lab != gate.get(w, set()) and (lab or gate.get(w)):
            out.append(f"OPEN LOOP-SPEC  {w}: its title and header say {fmt(lab)}, §5 gates it on {fmt(gate.get(w))}")

    band0 = set().union(*[g for w, g in gate.items() if band(w) == "0"]) if gate else set()
    files = [BL / "PLAN.md", BL / "LEDGER.md", WAVES / "INDEX.md"] + [WAVES / f"{w}.md" for w in sorted(specs)]
    claim = re.compile(r"(D[1-5](?: and D[1-5])? gates? 10\.2\.0|10\.2\.0 (?:is )?(?:therefore )?(?:gated on|waits on)|"
                       r"only external edge|band 0's (?:only )?external|external edges? (?:are|is|stays?))")
    exc = re.compile(r"owner-ratified exception|[Tt]he one exception|only band-0 wave inside D[1-5]")
    for f in files:
        rel = f.relative_to(BL)
        for n, line in enumerate(f.read_text().splitlines(), 1):
            for sent in re.split(r"(?<=[.;]) |\| ", line):
                if claim.search(sent):
                    said = {f"D{x}" for x in LOOP.findall(sent)}
                    if said != band0:
                        out.append(f"OPEN RELEASE    {rel}:{n}: names {fmt(said)} as what 10.2.0 or band 0 waits on; §5's band-0 loop gates are {fmt(band0)}: \"{sent.strip()[:110]}\"")
                if exc.search(sent):
                    row = re.match(r"\| \**(W-[0-9A-L]\.\d+)\**[ (|]", line)  # a table row speaks for its own wave
                    ws = ([row.group(1)] if row else []) or re.findall(r"W-[0-9A-L]\.\d+", sent) or ([rel.stem] if rel.parts[0] == "waves" and rel.stem in specs else [])
                    bad = [w for w in ws if gate.get(w)]
                    if bad:
                        out.append(f"OPEN EXCEPTION  {rel}:{n}: claims an exception to a loop for {', '.join(bad)}, which §5 gates on {fmt(set().union(*[gate[w] for w in bad]))}: \"{sent.strip()[:110]}\"")
                    elif not ws:
                        out.append(f"OPEN EXCEPTION  {rel}:{n}: claims an exception and names no wave: \"{sent.strip()[:110]}\"")
    ruled = {"W-0.1": {"D3"}, "W-0.2": {"D3"}, "W-0.11": {"D3"}, "W-0.8": {"D2"}}
    for w in sorted(x for x in rows5 if band(x) == "0"):
        if gate.get(w, set()) != ruled.get(w, set()):
            out.append(f"OPEN CHECKLIST-7 {w}: §5 gates it on {fmt(gate.get(w))}; the owner-ruled set gives {fmt(ruled.get(w))}")
        outside = [d for d in edges().get(w, ()) if band(d) != "0"]
        if outside:
            out.append(f"OPEN CHECKLIST-7 {w}: §5 edge to {', '.join(sorted(outside))}, outside band 0")
    words = {"Two": 2, "Three": 3, "Four": 4, "Five": 5, "Six": 6}
    for m in re.finditer(r"(\w+) band-0 waves are loop waves", plan):
        if words.get(m.group(1)) != len(ruled):
            out.append(f"OPEN CHECKLIST-7 PLAN.md: \"{m.group(0)}\" against {len(ruled)} ruled band-0 loop waves")
    for name in ("audit/INBOUND.md", "FORMATION-PROGRESS.md"):
        for n, line in enumerate((BL / name).read_text().splitlines(), 1):
            for m in re.finditer(r"10\.2\.0 is (?:therefore )?gated on (D[1-5])(?: converging)?(?: as well as| AND| and) (D[1-5])", line):
                for d in m.groups():
                    if d not in band0:
                        out.append(f"OPEN INBOUND    {name}:{n} rules 10.2.0 gated on {d}; PLAN §5 puts a {d} gate on no band-0 wave")
    for r in out:
        print(r)
    print(f"waves {len(rows5)}, band-0 loop gates {fmt(band0)}, open {len(out)}")
    return 1 if out else 0


def expand(cell):
    out = []
    for part in cell.split(","):
        part = part.strip()
        m = re.fullmatch(r"(W-[0-9A-L])\.(\d+) \.\. W-[0-9A-L]\.(\d+)", part)
        if m:
            out += [f"{m.group(1)}.{k}" for k in range(int(m.group(2)), int(m.group(3)) + 1)]
        elif re.fullmatch(r"W-[0-9A-L]\.\d+", part):
            out.append(part)
    return out


def fmt(s):
    return "{" + ", ".join(sorted(s or [])) + "}" if s else "no loop"


if __name__ == "__main__":
    sys.exit(main())
