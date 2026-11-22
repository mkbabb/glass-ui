import os, re, sys, collections
def css(root):
    t = ''
    for d, _, fs in sorted(os.walk(root)):
        for f in sorted(fs):
            if f.endswith('.css'):
                t += open(os.path.join(d, f), encoding='utf-8', errors='replace').read()
    return t
def decls(t):
    m = collections.defaultdict(set)
    for name, val in re.findall(r'(?<![\w-])(--[\w-]+)\s*:\s*([^;{}]+)', t):
        m[name].add(re.sub(r'\s+', ' ', val.strip()))
    return m
a, b = decls(css(sys.argv[1])), decls(css(sys.argv[2]))
for k in sorted(set(a) & set(b)):
    if a[k] != b[k]:
        print(k); print('   11.1.0:', sorted(a[k] - b[k])[:4]); print('   tip   :', sorted(b[k] - a[k])[:4])
