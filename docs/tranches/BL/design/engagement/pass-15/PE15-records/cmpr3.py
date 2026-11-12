# r3: grade flips between two logs of one witness, keyed by the cell text with every number masked (cmp15.py's keys carry live figures).
#   python3 -I cmpr3.py <old.log> <new.log>   prints the totals and only the keys present in both whose grade multiset differs
import re, sys, collections
def rd(f):
    d = collections.defaultdict(list); tot = collections.Counter()
    for l in open(f, encoding="utf8"):
        m = re.match(r"^\s+(PASS|FAIL|UNMEASURED|REPORT)\s+(.*?) · ", l)
        if not m: continue
        k = re.sub(r"-?\d+(\.\d+)?", "#", m.group(2)); d[k].append(m.group(1)[0]); tot[m.group(1)[0]] += 1
    return d, tot
a, ta = rd(sys.argv[1]); b, tb = rd(sys.argv[2])
print(f"old {dict(ta)} · new {dict(tb)}")
for k in a:
    if k in b and sorted(a[k]) != sorted(b[k]): print(f"  FLIP {''.join(sorted(a[k]))} → {''.join(sorted(b[k]))} · {k[:170]}")
miss = [k for k in a if k not in b] + [k for k in b if k not in a]
if miss: print(f"  {len(miss)} keys in one log only")
