# sidediff.py <logs> <tagA> <tagB> <engine>: MEASURE-7 step 8. The side cells (clock2, cells6, g13, g7, g8, c2) of two
# passes, flattened, printing each leaf that differs (numbers by more than 25, the clock's tolerance, or a boolean or
# string that changed), so a clause that moved is found before the cells are read by hand.
import json, sys, os
L, A, B, E = sys.argv[1:5]
FILES = ["clock2.{t}.{e}.json", "m4-cells.{t}.{e}.json", "g13-{t}.{e}.json", "g7-{t}.{e}.json", "g8-{t}.{e}.json", "c2.{t}.{e}.json"]
def flat(x, p="", out=None):
    out = {} if out is None else out
    if isinstance(x, dict):
        for k, v in x.items(): flat(v, f"{p}.{k}", out)
    elif isinstance(x, list) and all(not isinstance(v, (dict, list)) for v in x) and len(x) < 12:
        out[p] = x
    elif isinstance(x, list):
        for i, v in enumerate(x): flat(v, f"{p}[{i}]", out)
    else:
        out[p] = x
    return out
for f in FILES:
    pa, pb = os.path.join(L, f.format(t=A, e=E)), os.path.join(L, f.format(t=B, e=E))
    if not (os.path.exists(pa) and os.path.exists(pb)):
        print(f"== {f.format(t='*', e=E)}: missing {'A' if not os.path.exists(pa) else 'B'}"); continue
    a, b = flat(json.load(open(pa))), flat(json.load(open(pb)))
    diffs = []
    for k in sorted(set(a) | set(b)):
        va, vb = a.get(k, "<none>"), b.get(k, "<none>")
        if isinstance(va, (int, float)) and isinstance(vb, (int, float)) and not isinstance(va, bool) and not isinstance(vb, bool):
            if abs(va - vb) > 25: diffs.append(f"  {k}: {va} -> {vb}")
        elif va != vb:
            diffs.append(f"  {k}: {json.dumps(va)[:120]} -> {json.dumps(vb)[:120]}")
    print(f"== {f.format(t='*', e=E)}: {len(diffs)} leaves differ"); print("\n".join(diffs[:80]))
