import json, os, re, sys
a, b = sys.argv[1], sys.argv[2]   # published, tip
def files(root):
    out = []
    for d, _, fs in os.walk(root):
        for f in fs:
            out.append(os.path.relpath(os.path.join(d, f), root))
    return out
norm = lambda p: re.sub(r'-[A-Za-z0-9_-]{8}(?=\.(js|cjs|mjs|css|d\.ts)$)', '-HASH', p)
fa, fb = files(a), files(b)
na, nb = {norm(p) for p in fa}, {norm(p) for p in fb}
print('published files', len(fa), 'tip files', len(fb))
print('missing on tip (normalised):', sorted(na - nb))
print('added on tip (normalised):', sorted(nb - na))
pa = json.load(open(os.path.join(a, 'package.json'))); pb = json.load(open(os.path.join(b, 'package.json')))
ea, eb = pa['exports'], pb['exports']
print('exports keys', len(ea), len(eb), 'removed', sorted(set(ea) - set(eb)), 'added', sorted(set(eb) - set(ea)))
print('changed exports', [k for k in ea if k in eb and ea[k] != eb[k]])
print('package.json fields differing', [k for k in set(pa) | set(pb) if pa.get(k) != pb.get(k)])
