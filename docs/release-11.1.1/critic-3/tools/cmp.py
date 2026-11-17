import json, os, re, sys, hashlib
pub, tip = sys.argv[1], sys.argv[2]
def files(root, sub="dist"):
    out = {}
    for d, _, fs in os.walk(os.path.join(root, sub)):
        for f in fs:
            p = os.path.join(d, f); out[os.path.relpath(p, root)] = os.path.getsize(p)
    return out
norm = lambda n: re.sub(r"-[A-Za-z0-9_-]{8}(\.(?:js|css|d\.ts|mjs))$", r"-HASH\1", n)
a, b = files(pub), files(tip)
print("published dist files", len(a), "bytes", sum(a.values()), "| tip dist files", len(b), "bytes", sum(b.values()))
na, nb = {}, {}
for n in a: na.setdefault(norm(n), []).append(n)
for n in b: nb.setdefault(norm(n), []).append(n)
gone = sorted(k for k in na if k not in nb); new = sorted(k for k in nb if k not in na)
print("names (hash-normalised) in published and absent from tip:", len(gone)); [print("   -", g, na[g]) for g in gone[:60]]
print("names added on tip:", len(new)); [print("   +", g) for g in new[:60]]
dup = {k: v for k, v in na.items() if len(v) != len(nb.get(k, v))}
print("normalised names whose count differs:", len(dup)); [print("   ", k, len(v), len(nb.get(k, []))) for k, v in list(dup.items())[:40]]
pa, pb = json.load(open(os.path.join(pub, "package.json"))), json.load(open(os.path.join(tip, "package.json")))
for k in sorted(set(pa) | set(pb)):
    if pa.get(k) != pb.get(k) and k not in ("version",):
        print("package.json field differs:", k)
ea, eb = pa.get("exports", {}), pb.get("exports", {})
print("exports keys", len(ea), len(eb), "removed", sorted(set(ea) - set(eb)), "added", sorted(set(eb) - set(ea)), "changed", [k for k in ea if k in eb and ea[k] != eb[k]])
