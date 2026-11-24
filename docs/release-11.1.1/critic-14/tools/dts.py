import os, re, sys, difflib
pub, tip = sys.argv[1], sys.argv[2]
norm = lambda n: re.sub(r"-[A-Za-z0-9_-]{8}(\.d\.ts)$", r"-HASH\1", n)
def dts(root):
    out = {}
    for d, _, fs in os.walk(os.path.join(root, "dist")):
        for f in fs:
            if f.endswith(".d.ts"):
                p = os.path.join(d, f); out[norm(os.path.relpath(p, root))] = open(p).read()
    return out
a, b = dts(pub), dts(tip)
strip = lambda s: re.sub(r"-[A-Za-z0-9_-]{8}(?=['\"./])", "-HASH", s)
changed = 0
for n in sorted(a):
    if n in b and strip(a[n]) != strip(b[n]):
        changed += 1
        d = list(difflib.unified_diff(strip(a[n]).splitlines(), strip(b[n]).splitlines(), lineterm="", n=0))
        minus = [l for l in d if l.startswith("-") and not l.startswith("---")]
        plus = [l for l in d if l.startswith("+") and not l.startswith("+++")]
        print(f"== {n}: -{len(minus)} +{len(plus)}")
        for l in minus: print("   ", l[:230])
        if os.environ.get("PLUS"):
            for l in plus: print("   ", l[:230])
print("declaration files", len(a), len(b), "changed", changed)
