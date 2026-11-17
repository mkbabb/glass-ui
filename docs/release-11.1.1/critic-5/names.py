# Critic 5: the names a consumer can reach in a built package, published against the tip:
# custom properties declared in CSS, custom properties written from JS, @property and
# @keyframes names, @layer names, data- attributes in the built JS and CSS, and the
# emits/props named in declarations.   names.py <published package root> <tip root>
import os, re, sys
def walk(root, exts):
    for d, _, fs in os.walk(os.path.join(root, "dist")):
        for f in fs:
            if f.endswith(exts): yield os.path.join(d, f)
def collect(root):
    out = {k: set() for k in ("css-prop", "js-prop", "@property", "@keyframes", "@layer", "data-attr", "class")}
    for p in walk(root, (".css",)):
        s = open(p, errors="replace").read()
        out["css-prop"] |= set(re.findall(r"(?<![\w-])(--[A-Za-z0-9_-]+)\s*:", s))
        out["@property"] |= set(re.findall(r"@property\s+(--[A-Za-z0-9_-]+)", s))
        out["@keyframes"] |= set(re.findall(r"@keyframes\s+([A-Za-z0-9_-]+)", s))
        for m in re.findall(r"@layer\s+([^{;]+)[{;]", s):
            out["@layer"] |= {x.strip() for x in m.split(",")}
        out["data-attr"] |= set(re.findall(r"\[(data-[a-z0-9-]+)", s))
    for p in walk(root, (".js", ".mjs")):
        s = open(p, errors="replace").read()
        out["js-prop"] |= set(re.findall(r"setProperty\(\s*[\"'`](--[A-Za-z0-9_-]+)", s))
        out["data-attr"] |= set(re.findall(r"[\"'`](data-[a-z0-9-]+)[\"'`=]", s))
    return out
a, b = collect(sys.argv[1]), collect(sys.argv[2])
for k in a:
    gone, new = sorted(a[k] - b[k]), sorted(b[k] - a[k])
    print(f"{k}: published {len(a[k])}, tip {len(b[k])}, removed {len(gone)}, added {len(new)}")
    for g in gone: print("   -", g)
    for n in new[:40]: print("   +", n)
