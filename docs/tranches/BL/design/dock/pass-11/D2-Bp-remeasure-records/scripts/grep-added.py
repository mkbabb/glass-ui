# grep-added.py <patch>: every ADDED line of the patch (B′'s lines on HEAD + floor v5) under src/components/dock (and, for the
# record, the rest of src/), searched for REGISTRY ids and harness ids. Patterns: REGISTRY, § sections, owner and family ids
# (O-nn, Q-nn, F-nn, S-nn, PF-n, P2-n, M-n, N-n, R-n), harness rows and witnesses (Hn-n, W1-W8 and their cells, `retarget·`,
# `ticking`, `film·`, `harness`). A reading; it edits nothing.
import re, sys
PAT = re.compile(r"REGISTRY|§|\b(?:O|Q|F|S|PF|P\d|M|N|R|CK|C|G|D|Z|B7|X\d)-\d+\b|\bH\d+-\d+\b|\bW[1-8]\b|retarget·|ticking|film·|harness|\bpass[- ]\d+\b")
cur = None; hits = []; n = 0
for l in open(sys.argv[1], encoding="utf8", errors="replace"):
    if l.startswith("+++ b/"): cur = l[6:].strip(); continue
    if l.startswith("+") and not l.startswith("+++") and cur and cur.startswith("src/"):
        n += 1
        for m in PAT.finditer(l):
            hits.append((cur, m.group(0), l[1:].strip()[:160])); break
print(f"added src/ lines read: {n}")
dock = [h for h in hits if h[0].startswith("src/components/dock")]
print(f"hits in src/components/dock: {len(dock)}")
for h in dock: print("  ", h[0], "|", h[1], "|", h[2])
rest = [h for h in hits if not h[0].startswith("src/components/dock")]
print(f"hits elsewhere in src/: {len(rest)}")
for h in rest: print("  ", h[0], "|", h[1], "|", h[2])
