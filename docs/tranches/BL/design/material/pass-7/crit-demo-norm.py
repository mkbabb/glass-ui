#!/usr/bin/env python3
# crit-demo-norm.py · D3 pass 7, the critic: floor v5's and floor v6's dist-demo compared after normalising (1) Vite's
# 8-character chunk hashes and (2) Vue's scoped ids (data-v-<8 hex>), and the files that differ printed with what moved.
#   python3 -I crit-demo-norm.py <demo a> <demo b>
import os, re, sys, hashlib
A, B = sys.argv[1:3]
HASH = rb'-[A-Za-z0-9_-]{8}\.(js|css|woff2?|svg|png|json|wasm|html)'
def load(root):
    out = {}
    for dp, _, fs in os.walk(root):
        for f in fs:
            if f == "build.json": continue
            p = os.path.join(dp, f)
            out.setdefault(re.sub(r'-[A-Za-z0-9_-]{8}\.', '-H.', os.path.relpath(p, root)), []).append(open(p, "rb").read())
    return out
a, b = load(A), load(B)
for scoped in (False, True):
    def n(x):
        x = re.sub(HASH, rb'-H.\1', x)
        return re.sub(rb'data-v-[0-9a-f]{8}', b'data-v-S', x) if scoped else x
    d = [k for k in sorted(set(a) | set(b)) if sorted(hashlib.sha256(n(x)).hexdigest() for x in a.get(k, [])) != sorted(hashlib.sha256(n(x)).hexdigest() for x in b.get(k, []))]
    print(f"demo, chunk hashes normalised{' + scoped ids' if scoped else ''}: {len(a)} · {len(b)} keys · differ {len(d)} {d}")
# what moved in the files that differ before scoped normalisation
for k in sorted(set(a) & set(b)):
    xa, xb = [re.sub(HASH, rb'-H.\1', x) for x in a[k]], [re.sub(HASH, rb'-H.\1', x) for x in b[k]]
    if sorted(xa) == sorted(xb): continue
    ids_a = sorted(set(re.findall(rb'data-v-[0-9a-f]{8}', b"".join(xa)))); ids_b = sorted(set(re.findall(rb'data-v-[0-9a-f]{8}', b"".join(xb))))
    print(f"  {k}: scoped ids {[i.decode() for i in ids_a if i not in ids_b]} → {[i.decode() for i in ids_b if i not in ids_a]}")
