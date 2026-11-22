# Critic 6: the class names the built CSS of a package selects, published against the tip.
#   classes.py <published package root> <tip root>
import os, re, sys
def classes(root):
    out = set()
    for d, _, fs in os.walk(os.path.join(root, "dist")):
        for f in fs:
            if f.endswith(".css"):
                s = open(os.path.join(d, f), errors="replace").read()
                s = re.sub(r"url\([^)]*\)", "", s)
                out |= set(re.findall(r"\.(-?[A-Za-z_][A-Za-z0-9_-]*)(?=[^{}]*\{)", s))
    return out
a, b = classes(sys.argv[1]), classes(sys.argv[2])
print(f"classes: published {len(a)}, tip {len(b)}, removed {len(a - b)}, added {len(b - a)}")
for c in sorted(a - b): print("   -", c)
for c in sorted(b - a)[:40]: print("   +", c)
